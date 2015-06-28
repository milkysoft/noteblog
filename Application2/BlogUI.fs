namespace WebBlogApplication

open WebSharper
open WebSharper.UI.Next
open WebSharper.UI.Next.Html

[<JavaScript>]
module BlogUI = 

    // Модель записи блога
    type PostModel =
        {   Id : int            
            Title : Var<string>
            Content : Var<string>
            CreateDate : string
            EditDate : Var<string> 
            Num : Var<int>
            EditedTitle : Var<string>
            EditedContent : Var<string>
            IsEditMode : Var<bool> }

    

    // Модель блога
    type BlogModel = 
        {   Posts : Var<PostModel list>
            IsAdmin : Var<bool> }

    [<AutoOpen>]
    module private Util =
                    
        /// Static attribute
        let ( ==> ) k v = Attr.Create k v

        /// Text node
        let txt t = Doc.TextNode t

        /// Input box backed by a variable x
        let input x = Doc.Input ["class" ==> "form-control"] x

        /// Button with a given caption and handler
        let button name handler = Doc.Button name ["class" ==> "btn btn-default"] handler

        /// Class attribute
        let cls n = Attr.Class n

        /// Div with single class
        let divc c docs = Doc.Element "div" [cls c] docs

        let log = JavaScript.Console.Log

        let br0 = Doc.Element "Br" [] []

        let addViewListener (view: View<'T>) (f: 'T -> unit) (doc: Doc) =
            view
            |> View.Map (fun x -> f x; Doc.Empty)
            |> Doc.EmbedView
            |> Doc.Append doc

        let Doc'Map<'A> (view:View<'A>) f = 
            View.Map f view |> Doc.EmbedView

        //let input'area'auto'grow'height () (handler: JavaScript.Dom.Element -> Unit) =
        //    JQuery.JQuery.Of(".edit-post-input-area").Each( fun x -> 
        //        x.SetAttribute( "style", "height:5px")                                    
        //        x.SetAttribute( "style", "height:" + (max x.ScrollHeight 300.).ToString() +  "px")) |> ignore    

        let var'str'to'int'view def =            
            Var.Create <| function
                | ClientUtils.Str'Int n -> n
                | _ -> def 
            

             

    [<AutoOpen>]
    module private ``ядро клиентской части веб приложения`` =
        
    
        let make'new'post'model (x:DataBaseAgents.Post) = 
            {   Id = x.Id
                Title = Var.Create x.Title
                Content = Var.Create x.Content
                CreateDate = x.CreateDate
                EditDate = Var.Create x.EditDate 
                Num = Var.Create x.Num
                

                EditedTitle = Var.Create x.Title
                EditedContent = Var.Create x.Content
                IsEditMode = Var.Create false }

        let update'post'model (m:PostModel) (x:DataBaseAgents.Post) =             
            m.Title.Value       <- x.Title
            m.Content.Value     <- x.Content
            m.EditDate.Value    <- x.EditDate 
            m.Num.Value         <- x.Num

        
        type CRUDBlogMessage = 
            | ReadBlog of  int * int *string * AsyncReplyChannel<DataBaseAgents.Post list>
            | UpdatePost of PostModel
            | DeletePost of BlogModel * int
            | AddPost of BlogModel * string * string  

        let crud = MailboxProcessor.Start(fun agent ->             
            let rec loop () : Async<unit> = async {
                let! msg = agent.Receive()
                match msg with 
                | ReadBlog ( page'number, page'post'count, context, reply ) ->                      
                    let! posts = DataBaseAgents.getPage page'number page'post'count context
                    reply.Reply posts
                        
                | UpdatePost post -> 
                    post.IsEditMode.Value <- false
                    let! x = DataBaseAgents.setPostContent post.Id post.EditedTitle.Value post.EditedContent.Value
                    post.Content.Value <- x.Content
                    post.Title.Value <- x.Title
                    post.EditDate.Value <- x.EditDate

                | DeletePost (blog,id) ->
                    DataBaseAgents.deletePost id
                    blog.Posts.Value <- blog.Posts.Value |> List.filter( function {Id=id'} -> id<>id' )
                | AddPost (blog, title, content) ->
                    let! x = DataBaseAgents.addNewPost title content
                    blog.Posts.Value <- (make'new'post'model x) :: blog.Posts.Value
                return! loop () }
            loop () )        

    // построение вьюшек из моделей
    module Render = 
           
        let render'post'date post = 
            Div[ Attr.Class "post-date-block" ] [   
                    txt "Дата создания:"
                    Doc.TextNode post.CreateDate
                    txt "Дата изменения:"
                    Doc.TextView post.EditDate.View]

        let render'post'crud'panel blog post =
            Span0[
                Doc'Map post.IsEditMode.View <| function
                | false -> 
                    Doc'Map blog.IsAdmin.View <| function
                    | false -> Doc.Empty 
                    | _ ->
                        Span0[   
                            button "Удалить" (fun () -> 
                                (blog, post.Id)
                                |> DeletePost
                                |> crud.Post) 
                            button "Изменить" (fun () ->   
                                post.IsEditMode.Value <- true ) ] 
                | _ -> 
                    Span0[
                        button "Применить" (fun () -> crud.Post( UpdatePost post) )
                        button "Отмена" (fun () -> post.IsEditMode.Value <- false ) ] ]


        let render'post blog post  =            
            Article [Attr.Create "id" ( sprintf "post-%d-article" post.Id) ] [
                Div[Attr.Class "post-header-block"] [ 
                    Div [ Attr.Class "post-title-text-block"] [ Doc.TextView post.Title.View ]                    
                    render'post'date post
                    render'post'crud'panel blog post ]
                Doc'Map post.IsEditMode.View <| function
                | false ->                
                    Div0 [   
                        Doc'Map post.Content.View <| fun content ->
                            let htmlElem = JQuery.JQuery.Of("<div class=\"post-content-block\">" + content + "</div>").Get(0)
                            try
                                Doc.Static (htmlElem :?> _) 
                            with _ -> Doc.TextNode content ]  
                | _ ->
                    Div0[
                        P0[ txt "Название статьи"
                            Div0[ Doc.Input [ Attr.Style "width" "100%" ] post.EditedTitle ] ]
                        P0[ txt "Текст статьи" ] ]]; 
                            //Div0[ Doc.InputArea 
                            //        [ Attr.Class "edit-post-input-area"] post.EditedContent
                            //        |> addViewListener post.EditedContent.View (fun x -> input'area'auto'grow'height() ) ]] ]]         

    let Blog is'admin =
        let var'page'number = Var.Create "0"
        let var'posts'count = Var.Create "20"
        let var'context = Var.Create ""
        
        let v'page'number = View.Apply ( var'str'to'int'view 0 ).View var'page'number.View
        let v'page'posts'count = View.Apply ( var'str'to'int'view 20 ).View var'posts'count.View
        //crud.Post( UpdateBlog(blog, 0, 20, "") )

        let v2 = View.Map2( fun page'number posts'count -> page'number, posts'count ) v'page'number v'page'posts'count
        Div0[  
            txt "Страница №"
            Doc.Input [] var'page'number
            txt "Колличесво статей на странице"
            Doc.Input [] var'posts'count
            txt "Поиск"
            Doc.Input [] var'context 
            View.Map2( fun (page'number,posts'count) context -> page'number, posts'count, context ) v2 var'context.View
            |> View.MapAsync ( fun (page'number, posts'count, context) -> async{
                let! posts = crud.PostAndAsyncReply( fun reply ->
                    ReadBlog(page'number, posts'count, context, reply) )
                let blog =
                    {   Posts = posts |> List.map make'new'post'model |> Var.Create 
                        IsAdmin = Var.Create is'admin }       
                        
                JavaScript.Console.Log ( sprintf "render'blog %d posts" posts.Length )
                return Doc'Map blog.Posts.View <| fun posts ->
                    Div0 ( posts |> List.map (Render.render'post blog )  ) } )
            |> Doc.EmbedView ]    
          
        