namespace WebBlogApplication

[<AutoOpen>]
module Utils = 

    let (|IntDecimal|_|) (x:decimal) = 
        let n = int x
        if x = decimal n then Some n else None

    let (|ToLower|) (x:string) = 
        x.Trim().ToLower()