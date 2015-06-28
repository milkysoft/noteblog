namespace WebBlogApplication
open System
open Database
open WebSharper


module DataBaseAgents = 
    type Post = 
        {   Id : int
            Num : int
            Title : string
            Content : string
            CreateDate : string
            EditDate : string }

    let s'dttm (x:DateTime) = x.ToString()

    let postOf n (id,cd, ed, ttl, cntnt ) = 
        {   Id = id
            Num = n
            Title = ttl
            Content = cntnt
            CreateDate = s'dttm cd
            EditDate = s'dttm ed  }

    
    
    type Blog = Map<int, DateTime * DateTime * string * string>

    type Message = 
        | AddNewPost of string * string * AsyncReplyChannel< Post >
        | DeletePost of  int
        | SetPostContent of int * string * string * AsyncReplyChannel< Post >
        | GetPage of int * int * string * AsyncReplyChannel< Post list >
        | GetTotalCount of AsyncReplyChannel< int >

    

    let inbox = MailboxProcessor.Start(fun agent -> 
        let rec getBlog blog = async{
            match blog with
            | Some blog -> return blog
            | None -> 
                let! blog = Database.getBlog()
                return
                    blog
                    |> Seq.map(fun x ->
                        x.Id, ( x.CreateDate, x.EditDate, x.Title, x.Content) ) 
                    |> Map.ofSeq } 
        and loop blog = async {
            let! blog = getBlog blog
            let loop = Some >> loop
            let! msg = agent.Receive()
            match msg with
            | AddNewPost (title,content,replyChannel) -> 
                let count1 = Seq.length blog
                let! x = addNewPost title content
                let count2 = Seq.length blog
                match Seq.toList x with
                | [ x ] ->
                    assert (title = x.Title && content = x.Content)     
                    replyChannel.Reply 
                        {   Id = x.Id
                            Num = blog.Count
                            Title = x.Title
                            Content = x.Content
                            CreateDate = s'dttm x.CreateDate
                            EditDate = s'dttm x.EditDate  }
                    return! 
                        blog 
                        |> Map.add x.Id (x.CreateDate, x.EditDate, x.Title, x.Content) 
                        |> loop  
                | x -> failwithf "AddNewPost -> %A" x  
            | DeletePost id ->
                let! n = (new Sql.DeletePost()).AsyncExecute(id)
                assert (n=1)
                return! 
                    blog 
                    |> Map.remove id
                    |> loop
            | SetPostContent(id,title,content,replyChannel) ->
                match blog.TryFind id with
                | None -> return! loop blog
                | Some(createDate,_,_,_) ->
                    let! x = Database.setPost id title content
                    match Seq.toList x with
                    | [x] when  x.Id = id && x.CreateDate = createDate && x.Title = title && x.Content = content  -> 
                        replyChannel.Reply 
                            {   Id = x.Id
                                Num = blog.Count
                                Title = x.Title
                                Content = x.Content
                                CreateDate = s'dttm x.CreateDate
                                EditDate = s'dttm x.EditDate  }
                        return! blog |> Map.add id ( createDate, x.EditDate, title, content) |> loop 
                    | _ -> assert false 
            | GetPage (pageNum, postsCountOnPage, context, replyChannel) ->
                blog
                |> Map.toList                
                |> List.filter( fun (_,(_,_, ToLower title, ToLower content)) -> 
                    match context with
                    | "" -> true
                    | ToLower context ->   
                        title.Contains(context) || content.Contains (context) )
                |> List.sortBy ( fun (_,(dt,_,_,_)) -> DateTime.MaxValue - dt)
                |> List.mapi( fun n (id,(cd, ed, ttl, cntnt)) -> 
                    {   Id = id
                        Num = n
                        Title = ttl
                        Content = cntnt
                        CreateDate = s'dttm cd
                        EditDate = s'dttm ed  } )
                |> List.filter( function {Num=n} -> n >= pageNum * postsCountOnPage && n <= (pageNum + 1) * postsCountOnPage )                
                |> replyChannel.Reply
                return! loop blog 
            | GetTotalCount replyChannel ->
                replyChannel.Reply blog.Count
                return! loop blog  }
        loop None)

    [<Rpc>]
    let addNewPost title content = inbox.PostAndAsyncReply( fun reply -> AddNewPost(title,content,reply) )

    [<Rpc>]
    let deletePost id = DeletePost id |> inbox.Post

    [<Rpc>]
    let setPostContent id title content  = inbox.PostAndAsyncReply( fun reply -> 
        SetPostContent (id,title,content,reply)  )

    [<Rpc>]
    let getPage pageNum postsCountOnPage context = inbox.PostAndAsyncReply( fun reply ->
        let x = GetPage (pageNum, postsCountOnPage, context, reply) 
        x
        )

    [<Rpc>]
    let getTotalCount () = inbox.PostAndAsyncReply( fun reply ->
        GetTotalCount reply )

