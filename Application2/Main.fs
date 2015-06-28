namespace WebBlogApplication

open WebSharper.Html.Server
open WebSharper
open WebSharper.Sitelets

type Action =
    | Home
    | Login of Action
    | CreateNewPost
     
module Skin =
    open System.Web

    type Page =
        {   Title : string
            Content : Element list }

    let mainTemplate =
        Content.Template<Page>("~/Main.html")
            .With("title", fun x -> x.Title)
            .With("content", fun x -> x.Content)

    let withTemplate title content =
        Content.WithTemplate mainTemplate <| fun context ->
            {   Title = title
                Content = content context }

    let withTemplateAsync title content : Content<Action>  =
        Content.WithTemplateAsync mainTemplate <| fun context ->
            async{
                let! content = content context
                return 
                    {   Title = title
                        Content = content }  }
            

module Site =
    let HomePage = Skin.withTemplateAsync "HomePage" <| fun context -> async {
        
        //let! blog = DataBaseAgents.getPage 0 20 None
        
        let! user = context.UserSession.GetLoggedInUser()
        let is'admin = user.IsSome
        

        return 
            [   if user.IsNone then
                    yield P [ A [ Home |> Login |> context.Link |> Attr.HRef  ] -< [ Text "Войти на сайт" ] ] 
                yield P [ClientSide <@ BlogUI.Blog(is'admin) @>] ] }

    
    let LoginPage redirectAction = 
        Skin.withTemplate "Авторизация" <| fun ctx ->     
            let url = ctx.Link redirectAction
            [   H1 [Text "Авторизация"]
                P [
                    Text "Войти на сайт под любым именем пользователя с паролем "
                    I [Text "'password'"]
                    Text "'." ]                
                Div [ ClientSide <@ LoginUI.Login url @> ] ] 

       
    let MainSitelet =
        Sitelet.InferPartial id 
            (function 
                | Login _ | CreateNewPost  -> None
                | x -> Some x)
            (function
                | Home -> HomePage
                | _ -> Content.NotFound ) <|> 
        Sitelet.InferPartial id 
            (function 
                | Login x -> Login x |> Some
                | _ -> None)
            (function
                | Login x -> LoginPage x
                | _ -> Content.NotFound )
        

module SelfHostedServer =
    open System
    open System.Net
    open global.Owin
    open Microsoft.Owin.Hosting
    open Microsoft.Owin.StaticFiles
    open Microsoft.Owin.FileSystems
    open WebSharper.Owin

    let getLocalHostIp() = 
        Dns.GetHostEntry(Dns.GetHostName()).AddressList 
        |> Array.tryFind( fun ip ->
            ip.AddressFamily = Sockets.AddressFamily.InterNetwork )

    let serve host port =
        let options = new StartOptions()
        let (~%%) host = options.Urls.Add (sprintf "http://%s:%d" host port)
        //%% "localhost"
        //%% "127.0.0.1"
        //%% Environment.MachineName
        %% host
        let rootDirectory = ".."
        options.Urls 
        |> Seq.fold (fun xs x ->
            sprintf "%s\n\t%s" xs x) "Serving:"
        |> printfn "%s"
        WebApp.Start(options, fun appB ->
            appB.UseStaticFiles(
                    StaticFileOptions(
                        FileSystem = PhysicalFileSystem(rootDirectory)))
                .UseSitelet(rootDirectory, Site.MainSitelet)
                .UseErrorPage(Microsoft.Owin.Diagnostics.ErrorPageOptions.ShowAll)
            |> ignore)
    let (|Int_|_|) s = 
        let b,x = Int32.TryParse s
        if b then Some x else None        
    
    [<EntryPoint>]
    let Main _ =
        
        use server = serve "localhost" 9000
        stdin.ReadLine() |> ignore        
        0
        
