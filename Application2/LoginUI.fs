namespace WebBlogApplication

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client


[<JavaScript>]
module LoginUI = 
    
    open WebSharper.Formlets
    open WebSharper.Formlets.Controls

    [<AutoOpen>]
    module private ``some namemed stuff`` = 
        type jQ = WebSharper.JQuery.JQuery

    let WithLoadingPane init (a: Async<'T>) (f: 'T -> Formlet<'U>) : Formlet<'U> =
        let loadingPane =
            Formlet.BuildFormlet <| fun _ ->
                let state = new Event<Result<'T>>()
                async {
                    let! x = a
                    do state.Trigger (Result.Success x)
                    return () }
                |> Async.Start
                init, ignore, state.Publish
        Formlet.Replace loadingPane f

    let WarningPanel label =
        Formlet.Do {
            let! _ =
                Formlet.OfElement <| fun _ ->
                    Div [Text label]
            return! Formlet.Never ()
        }

    let Login redirectUrl : Formlet<unit> =
        let localStorage = WebSharper.JavaScript.JS.Window.LocalStorage
        let key'user,key'pass = 
            let key = "4B929568-625C-4CD0-BED4-8EACC78D21E6-blog-"
            key + "user", key + "pass"

        let uName =
            Controls.Input (localStorage.GetItem key'user)
            |> Validator.IsNotEmpty "Введите имя пользователя"
            |> Enhance.WithValidationIcon  
            |> Enhance.WithValidationFrame            
            |> Enhance.WithTextLabel "Имя пользователя"
        let pw =
            Controls.Password (localStorage.GetItem key'pass)         
            
            |> Validator.Is (fun x -> x <> "") "введите пароль "
            |> Enhance.WithValidationFrame 
            |> Enhance.WithValidationIcon            
            |> Enhance.WithTextLabel "Пароль"
        let loginF =
            Formlet.Yield (fun n pw -> n,pw)
            <*> uName 
            <*> pw        
        Formlet.Do {
            
            let! uInfo =  
                loginF
                |> Enhance.WithLegend "Введите имя пользователя и пароль"
                |> Enhance.WithCustomSubmitButton {Enhance.FormButtonConfiguration.Default with Label = Some "Войти" }
                |> Enhance.WithCustomFormContainer { Enhance.FormContainerConfiguration.Default with CssClass = Some "formContainer" }
            let user,pass = uInfo
            localStorage.SetItem(key'user, user)
            localStorage.SetItem(key'pass, pass)
            return!
                WithLoadingPane 
                    (   Div [ Text "Выполняется авторизация..."  ] )
                    (   async{
                            jQ.Of("input").Attr("disabled", "disabled") |> ignore
                            jQ.Of(".submitButton").Hide() |> ignore
                            return! Protect.login uInfo } ) 
                    (   function
                        | true ->
                            ClientUtils.redirect redirectUrl
                            Formlet.Return ()
                        | false ->                     
                            jQ.Of("input").RemoveAttr("disabled") |> ignore
                            jQ.Of(".submitButton").Show() |> ignore
                            WarningPanel "недопустимое имя пользователя или пароль" ) }
        
