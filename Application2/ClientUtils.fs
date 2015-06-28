namespace WebBlogApplication

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client


[<JavaScript>]
module ClientUtils =
    type jQ = WebSharper.JQuery.JQuery

    [<Inline "document.location = $url">]
    let redirect (url : string) = ()

    [<Direct "!isNaN(parseFloat($n)) && isFinite($n)" >]
    let isNumber (n:string) = X<bool>

    [<Direct "Math.abs(~~$x)" >]
    let strToInt'or'zero (x:string) = X<int>

    [<Inline "Date().toLocaleString()">]
    let now() = failwith "N/A"


    [<Inline "String( ~~Number($x) ) === $x">]
    let is'integer(x:string) = X<bool>

    
    let (|Str'Int|_|) s =         
        if is'integer s then Some <| strToInt'or'zero s else None

    
//    /// Convert a .NET date object to a JavaScript standard date object.
//    [<JavaScript>]
//    let dateToEcma (d: System.DateTime) =
//        new JavaScript.Date(
//            // January is 1 on .NET and 0 in JavaScript, hence `.Month - 1`
//            d.Year, d.Month - 1, d.Day,
//            d.Hour, d.Minute, d.Second, d.Millisecond)
//
//    /// Convert a JavaScript standard date object to a .NET date object.
//    [<JavaScript>]
//    let ecmaToDate (d: JavaScript.Date) =
//        new System.DateTime(
//            // January is 1 on .NET and 0 in JavaScript, hence `.Month + 1`
//            d.GetFullYear(), d.GetMonth() + 1, d.GetDay(),
//            d.GetHours(), d.GetMinutes(), d.GetSeconds(), d.GetMilliseconds())

