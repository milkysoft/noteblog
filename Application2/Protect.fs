namespace WebBlogApplication

open WebSharper


module Protect =

    let users = 
        [   "Zorchenkov", "Alex"
            "binf", "pawel" ]
            

    
    [<Rpc>]
    let login (ToLower user, ToLower pass) =
        let ctx = Web.Remoting.GetContext()
        async {
            if users |> List.exists( function (ToLower user', ToLower pass') -> user' = user && pass' = pass ) then
                do! ctx.UserSession.LoginUser user
                return true
            else
                return false }

    [<Rpc>]
    let logout()  =
        Web.Remoting.GetContext().UserSession.Logout()
        
