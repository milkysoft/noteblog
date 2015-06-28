#r @"C:\Users\User\Documents\Visual Studio 2013\Projects\Blog1\packages\FSharp.Data.SqlClient.1.7.0\lib\net40\FSharp.Data.SqlClient.dll"
#r @"C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.5\System.Transactions.dll"
#r @"C:\Users\User\Documents\Visual Studio 2013\Projects\Blog1\packages\FSharp.Data.SqlClient.1.7.0\lib\net40\FSharp.Data.SqlClient.dll"

open FSharp.Data
open System
open System.Data.SqlClient


module Sql = 

    [<Literal>]
    let connectionString = """Data Source=(LocalDB)\v11.0;AttachDbFilename="C:\Users\User\Documents\Visual Studio 2013\Projects\Blog1\ConsoleApplication1\DatabaseBlog.mdf";Integrated Security=True"""

    type GetAllPosts = SqlCommandProvider<"SELECT * FROM Post" , connectionString>

    type DeletePost = SqlCommandProvider<"DELETE FROM Post WHERE Id=@id" , connectionString>

    type SetPost = SqlCommandProvider<"""
UPDATE Post
SET EditDate = GETDATE(), Content = @content, Title = @title""" , connectionString>
    
    type CreateNewPost = SqlCommandProvider<"""
INSERT INTO Post(CreateDate, EditDate, Title, Content)
OUTPUT INSERTED.*
VALUES(GETDATE(), GETDATE(), @title, @content);""", connectionString>

    

    type GetAllIds = SqlCommandProvider<"SELECT DISTINCT Id FROM Post;", connectionString>

    type GetIds = SqlCommandProvider<"""
SELECT DISTINCT Id 
FROM Post 
WHERE (Title LIKE @titleContext) AND (Content LIKE @contentContext)""" , connectionString>

    type GetRowsBetween = SqlCommandProvider<"""
WITH NumberedPosts AS
(
    SELECT ROW_NUMBER() OVER(ORDER BY CreateDate) AS Rownum, Id, CreateDate, EditDate, Title, Content 
    FROM Post 
) 
SELECT Id, CreateDate, EditDate, Title, Content 
FROM NumberedPosts WHERE Rownum BETWEEN @n0 AND @n1""", connectionString>

    type Clear = SqlCommandProvider<"TRUNCATE TABLE Post", connectionString>
    
    let conn = new SqlConnection(connectionString)

    do
        conn.Open()

    let readPost<'a> (r:SqlDataReader) (readItem : unit -> 'a) = async{
        let result = new ResizeArray<'a>()
        let! x = r.ReadAsync() |> Async.AwaitTask
        let readed = ref x
        while !readed do
            let item = 
                try
                    readItem ()
                with x ->
                    printfn "%A" x
                    failwithf "%A" x 

            result.Add( item )
            let! x = r.ReadAsync() |> Async.AwaitTask
            readed := x                
        return result |> Seq.toList }

    let queryReader script = 
        let command = new SqlCommand(script, conn)
        command.ExecuteReaderAsync() |> Async.AwaitTask

let getPostsCount () = 
    async{
        use! r = Sql.queryReader "SELECT COUNT(DISTINCT Id) FROM Post;"
        let! x = r.ReadAsync() |> Async.AwaitTask
        return if x then r.GetInt32(0) else 0 }

let mock () = 
    let values = 
        [   for n in 0..100 -> n, sprintf "пост %d" n, sprintf "содержимое поста %d" n ]
        |> List.fold( fun acc (n,h,c) -> 
            let sDt = sprintf "DATEADD(day, -%d, @datenow)" n
            let sItem = sprintf "(%s, %s, N\'%s\', N\'%s\')" sDt sDt h c 
            if acc = "" then sItem else
            sprintf "%s, %s" acc sItem ) ""
        |> sprintf "
INSERT INTO Post (CreateDate, EditDate, Title, Content ) 
VALUES %s;" 

    printfn "\n%A\n" values


    let command = new SqlCommand(values, Sql.conn)
    command.Parameters.AddWithValue("datenow", DateTime.Now ) |> ignore
    async{
        let! _ = (new Sql.Clear()).AsyncExecute()
        let! _ = command.ExecuteReaderAsync() |> Async.AwaitTask        
        return () }


let getByRowNums n1 n2 =  (new Sql.GetRowsBetween()).AsyncExecute(n1,n2) 

let getPage nPage nPostsCountOnPage = 
    let n1 = nPage * nPostsCountOnPage + 1L
    let n2 = (nPage + 1L) * nPostsCountOnPage
    getByRowNums n1 n2



let getPostByIdsList ids = 
    async{
        use! r = 
            ids 
            |> Seq.fold( fun acc x -> 
                if acc = "" then sprintf "%d" x else
                sprintf "%s, %d" acc x ) ""
            |> sprintf "SELECT * FROM Post WHERE Id IN (%s)" 
            |> Sql.queryReader
        return! Sql.readPost r <| fun () ->            
            r.GetInt32(0), r.GetDateTime(1), r.GetDateTime(2), r.GetString(3), r.GetString(4) }

let getAllPosts() = 
    (new Sql.GetAllPosts()).AsyncExecute() 

let addNewPost title content = 
    (new Sql.CreateNewPost()).AsyncExecute(title = title, content = content ) 

let getPostsByContext context = 
    (new Sql.GetIds()).AsyncExecute(titleContext = context, contentContext = context ) 


    