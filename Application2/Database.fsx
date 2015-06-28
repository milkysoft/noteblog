#r @"C:\Users\User\Documents\Visual Studio 2013\Projects\Blog1\packages\FSharp.Data.SqlClient.1.7.0\lib\net40\FSharp.Data.SqlClient.dll"
#r @"C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.5\System.Transactions.dll"
//#r @"D:\Документы\Visual Studio 2013\Projects\Blog1\packages\FSharp.Data.SqlClient.1.7.0\lib\net40\FSharp.Data.SqlClient.dll"

open FSharp.Data

open System
open System.Data.SqlClient
open System.IO

#load "Database.fs"

open WebBlogApplication.Database

let words = 
    //let path  = sprintf @"d:\Документы\Visual Studio 2013\Projects\Blog1\SelfHostedApplication1\book%d.txt" 
    let path  = sprintf @"C:\Users\User\Documents\Visual Studio 2013\Projects\Blog1\SelfHostedApplication1\book%d.txt" 
    let (~%%) n = File.ReadAllText(path n)

    let x = %% 1 + %% 2 + %% 3 + %% 4
    //let x = %% 5
    //let x = %% 1 
    //+ %% 2 + %% 3 + %% 4

    let punkt = 
        x 
        |> Seq.filter( fun c -> Char.IsPunctuation c || Char.IsWhiteSpace c)
        |> Seq.distinct
        |> Seq.toArray
    x.Split(punkt) |> Seq.distinct |> Seq.toArray

let rnd = new Random();
let rndWord() = words.[rnd.Next(0,  (Array.length words) - 1)] 
let gen'text n = String.Join(" ", [|for n in 0..n -> rndWord() |])
let random'title() = gen'text 10
let random'post'content() = gen'text 200


let mock'blog () = 
    async {    
        let values = 
            [   for n in 0..100 -> n, random'title(), random'post'content() ]
            |> List.fold( fun acc (n,h,c) -> 
                let sDt = sprintf "DATEADD(day, -%d, @datenow)" n
                let sItem = sprintf "(%s, %s, N\'%s\', N\'%s\')" sDt sDt h c 
                if acc = "" then sItem else
                sprintf "%s, %s" acc sItem ) ""
            |> sprintf "TRUNCATE TABLE Post;
                        INSERT INTO Post (CreateDate, EditDate, Title, Content ) VALUES %s;" 
        printfn "\n%A\n" values


        let command = new SqlCommand(values, Sql.conn)
        command.Parameters.AddWithValue("datenow", DateTime.Now ) |> ignore
    
        let! x = command.ExecuteReaderAsync() |> Async.AwaitTask        
        return x 
    } |> Async.RunSynchronously
