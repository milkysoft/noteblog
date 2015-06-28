(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,UI,Next,Var,WebBlogApplication,BlogUI,Util,View1,View,Html,List,Doc,T,Concurrency,_____________________________________,console,Render,Attr,jQuery,Operators,String,ClientUtils,Control,MailboxProcessor,Remoting,AjaxRemotingProvider,Number,window,Formlets,Controls,Enhance,Data,Formlet,FormButtonConfiguration,FormContainerConfiguration,LoginUI,Html1,Client,Tags,document,FSharpEvent,IntelliFactory,Formlets1,Base,Result;
 Runtime.Define(Global,{
  WebBlogApplication:{
   BlogUI:{
    Blog:function(_is_admin)
    {
     var _var_page_number,_var_posts_count,_var_context,arg00,arg10,_v_page_number,arg001,arg101,_v_page_posts_count,v2,arg002,arg20,x;
     _var_page_number=Var.Create("0");
     _var_posts_count=Var.Create("20");
     _var_context=Var.Create("");
     arg00=Util["var'str'to'int'view"](0).get_View();
     arg10=_var_page_number.get_View();
     _v_page_number=View1.Apply(arg00,arg10);
     arg001=Util["var'str'to'int'view"](20).get_View();
     arg101=_var_posts_count.get_View();
     _v_page_posts_count=View1.Apply(arg001,arg101);
     v2=View.Map2(function(_page_number)
     {
      return function(_posts_count)
      {
       return[_page_number,_posts_count];
      };
     },_v_page_number,_v_page_posts_count);
     arg002=function(tupledArg)
     {
      var _page_number,_posts_count;
      _page_number=tupledArg[0];
      _posts_count=tupledArg[1];
      return function(context)
      {
       return[_page_number,_posts_count,context];
      };
     };
     arg20=_var_context.get_View();
     x=View.Map2(arg002,v2,arg20);
     return Html.Div0(List.ofArray([Util.txt("\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u2116"),Doc.Input(Runtime.New(T,{
      $:0
     }),_var_page_number),Util.txt("\u041a\u043e\u043b\u043b\u0438\u0447\u0435\u0441\u0432\u043e \u0441\u0442\u0430\u0442\u0435\u0439 \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435"),Doc.Input(Runtime.New(T,{
      $:0
     }),_var_posts_count),Util.txt("\u041f\u043e\u0438\u0441\u043a"),Doc.Input(Runtime.New(T,{
      $:0
     }),_var_context),Doc.EmbedView(View.MapAsync(function(tupledArg)
     {
      var _page_number,_posts_count,context;
      _page_number=tupledArg[0];
      _posts_count=tupledArg[1];
      context=tupledArg[2];
      return Concurrency.Delay(function()
      {
       var x1;
       x1=_____________________________________.crud().PostAndAsyncReply(function(reply)
       {
        return{
         $:0,
         $0:_page_number,
         $1:_posts_count,
         $2:context,
         $3:reply
        };
       },{
        $:0
       });
       return Concurrency.Bind(x1,function(_arg1)
       {
        var blog,x3,f;
        blog={
         Posts:Var.Create(List.map(function(x2)
         {
          return _____________________________________["make'new'post'model"](x2);
         },_arg1)),
         IsAdmin:Var.Create(_is_admin)
        };
        x3="render'blog "+Global.String(_arg1.get_Length())+" posts";
        if(console)
         {
          console.log(x3);
         }
        f=function(posts)
        {
         return Html.Div0(List.map(function(post)
         {
          return Render["render'post"](blog,post);
         },posts));
        };
        return Concurrency.Return(Util["Doc'Map"](blog.Posts.get_View(),f));
       });
      });
     },x))]));
    },
    Render:{
     "render'post":function(blog,post)
     {
      var view;
      view=post.IsEditMode.get_View();
      return Html.Article(List.ofArray([Attr.Create("id","post-"+Global.String(post.Id)+"-article")]),List.ofArray([Html.Div(List.ofArray([Attr.Class("post-header-block")]),List.ofArray([Html.Div(List.ofArray([Attr.Class("post-title-text-block")]),List.ofArray([Doc.TextView(post.Title.get_View())])),Render["render'post'date"](post),Render["render'post'crud'panel"](blog,post)])),Util["Doc'Map"](view,function(_arg1)
      {
       var arg10,f;
       if(_arg1)
        {
         arg10=post.EditedTitle;
         return Html.Div0(List.ofArray([Html.P0(List.ofArray([Util.txt("\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0441\u0442\u0430\u0442\u044c\u0438"),Html.Div0(List.ofArray([Doc.Input(List.ofArray([Attr.Style("width","100%")]),arg10)]))])),Html.P0(List.ofArray([Util.txt("\u0422\u0435\u043a\u0441\u0442 \u0441\u0442\u0430\u0442\u044c\u0438")]))]));
        }
       else
        {
         f=function(content)
         {
          var htmlElem,matchValue;
          htmlElem=jQuery("<div class=\"post-content-block\">"+content+"</div>").get(0);
          try
          {
           return Doc.Static(htmlElem);
          }
          catch(matchValue)
          {
           return Doc.TextNode(content);
          }
         };
         return Html.Div0(List.ofArray([Util["Doc'Map"](post.Content.get_View(),f)]));
        }
      })]));
     },
     "render'post'crud'panel":function(blog,post)
     {
      var view;
      view=post.IsEditMode.get_View();
      return Html.Span0(List.ofArray([Util["Doc'Map"](view,function(_arg1)
      {
       return _arg1?Html.Span0(List.ofArray([Util.button("\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c",function()
       {
        var _this;
        _this=_____________________________________.crud();
        _this.mailbox.AddLast({
         $:1,
         $0:post
        });
        return _this.resume();
       }),Util.button("\u041e\u0442\u043c\u0435\u043d\u0430",function()
       {
        return post.IsEditMode.set_Value(false);
       })])):Util["Doc'Map"](blog.IsAdmin.get_View(),function(_arg2)
       {
        return _arg2?Html.Span0(List.ofArray([Util.button("\u0423\u0434\u0430\u043b\u0438\u0442\u044c",function()
        {
         var tupledArg,arg00,_this;
         tupledArg=[blog,post.Id];
         arg00={
          $:2,
          $0:tupledArg[0],
          $1:tupledArg[1]
         };
         _this=_____________________________________.crud();
         _this.mailbox.AddLast(arg00);
         return _this.resume();
        }),Util.button("\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c",function()
        {
         return post.IsEditMode.set_Value(true);
        })])):Doc.get_Empty();
       });
      })]));
     },
     "render'post'date":function(post)
     {
      return Html.Div(List.ofArray([Attr.Class("post-date-block")]),List.ofArray([Util.txt("\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f:"),Doc.TextNode(post.CreateDate),Util.txt("\u0414\u0430\u0442\u0430 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f:"),Doc.TextView(post.EditDate.get_View())]));
     }
    },
    Util:{
     "Doc'Map":function(view,f)
     {
      return Doc.EmbedView(View.Map(f,view));
     },
     addViewListener:function(view,f,doc)
     {
      return Doc.Append(doc,Doc.EmbedView(View.Map(function(x)
      {
       f(x);
       return Doc.get_Empty();
      },view)));
     },
     br0:Runtime.Field(function()
     {
      return Doc.Element("Br",Runtime.New(T,{
       $:0
      }),Runtime.New(T,{
       $:0
      }));
     }),
     button:function(name,handler)
     {
      return Doc.Button(name,List.ofArray([Util.op_EqualsEqualsGreater("class","btn btn-default")]),handler);
     },
     cls:function(n)
     {
      return Attr.Class(n);
     },
     divc:function(c,docs)
     {
      return Doc.Element("div",List.ofArray([Util.cls(c)]),docs);
     },
     input:function(x)
     {
      return Doc.Input(List.ofArray([Util.op_EqualsEqualsGreater("class","form-control")]),x);
     },
     "input'area'auto'grow'height":function()
     {
      jQuery(".edit-post-input-area").each(function()
      {
       var copyOfStruct;
       this.setAttribute("style","height:5px");
       copyOfStruct=Operators.Max(this.scrollHeight,300);
       return this.setAttribute("style","height:"+String(copyOfStruct)+"px");
      });
     },
     log:function(arg00)
     {
      return console?console.log(arg00):undefined;
     },
     op_EqualsEqualsGreater:function(k,v)
     {
      return Attr.Create(k,v);
     },
     txt:function(t)
     {
      return Doc.TextNode(t);
     },
     "var'str'to'int'view":function(def)
     {
      return Var.Create(function(_arg1)
      {
       var activePatternResult;
       activePatternResult=ClientUtils["|Str'Int|_|"](_arg1);
       return activePatternResult.$==1?activePatternResult.$0:def;
      });
     }
    },
    "\u044f\u0434\u0440\u043e \u043a\u043b\u0438\u0435\u043d\u0442\u0441\u043a\u043e\u0439 \u0447\u0430\u0441\u0442\u0438 \u0432\u0435\u0431 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f":{
     crud:Runtime.Field(function()
     {
      return MailboxProcessor.Start(function(agent)
      {
       var loop;
       loop=function()
       {
        return Concurrency.Delay(function()
        {
         var x;
         x=agent.Receive({
          $:0
         });
         return Concurrency.Bind(x,function(_arg1)
         {
          var _,post,id,blog,blog1,reply;
          if(_arg1.$==1)
           {
            post=_arg1.$0;
            post.IsEditMode.set_Value(false);
            _=Concurrency.Bind(AjaxRemotingProvider.Async("Application2:4",[post.Id,post.EditedTitle.get_Value(),post.EditedContent.get_Value()]),function(_arg3)
            {
             post.Content.set_Value(_arg3.Content);
             post.Title.set_Value(_arg3.Title);
             post.EditDate.set_Value(_arg3.EditDate);
             return Concurrency.Return(null);
            });
           }
          else
           {
            if(_arg1.$==2)
             {
              id=_arg1.$1;
              blog=_arg1.$0;
              AjaxRemotingProvider.Send("Application2:3",[id]);
              blog.Posts.set_Value(List.filter(function(_arg4)
              {
               return id!==_arg4.Id;
              },blog.Posts.get_Value()));
              _=Concurrency.Return(null);
             }
            else
             {
              if(_arg1.$==3)
               {
                blog1=_arg1.$0;
                _=Concurrency.Bind(AjaxRemotingProvider.Async("Application2:2",[_arg1.$1,_arg1.$2]),function(_arg5)
                {
                 blog1.Posts.set_Value(Runtime.New(T,{
                  $:1,
                  $0:_____________________________________["make'new'post'model"](_arg5),
                  $1:blog1.Posts.get_Value()
                 }));
                 return Concurrency.Return(null);
                });
               }
              else
               {
                reply=_arg1.$3;
                _=Concurrency.Bind(AjaxRemotingProvider.Async("Application2:5",[_arg1.$0,_arg1.$1,_arg1.$2]),function(_arg2)
                {
                 reply(_arg2);
                 return Concurrency.Return(null);
                });
               }
             }
           }
          return Concurrency.Combine(_,Concurrency.Delay(function()
          {
           return loop(null);
          }));
         });
        });
       };
       return loop(null);
      },{
       $:0
      });
     }),
     "make'new'post'model":function(x)
     {
      return{
       Id:x.Id,
       Title:Var.Create(x.Title),
       Content:Var.Create(x.Content),
       CreateDate:x.CreateDate,
       EditDate:Var.Create(x.EditDate),
       Num:Var.Create(x.Num),
       EditedTitle:Var.Create(x.Title),
       EditedContent:Var.Create(x.Content),
       IsEditMode:Var.Create(false)
      };
     },
     "update'post'model":function(m,x)
     {
      m.Title.set_Value(x.Title);
      m.Content.set_Value(x.Content);
      m.EditDate.set_Value(x.EditDate);
      return m.Num.set_Value(x.Num);
     }
    }
   },
   ClientUtils:{
    isNumber:function($n)
    {
     var $0=this,$this=this;
     return!Global.isNaN(Global.parseFloat($n))&&Global.isFinite($n);
    },
    "strToInt'or'zero":function($x)
    {
     var $0=this,$this=this;
     return Global.Math.abs(~(~$x));
    },
    "|Str'Int|_|":function(s)
    {
     return String(~(~Number(s)))===s?{
      $:1,
      $0:ClientUtils["strToInt'or'zero"](s)
     }:{
      $:0
     };
    }
   },
   LoginUI:{
    Login:function(redirectUrl)
    {
     var localStorage,patternInput,_key_user,_key_pass,arg10,formlet,x,uName,arg00,arg20,formlet1,x2,pw,loginF,_builder_;
     localStorage=window.localStorage;
     patternInput=["4B929568-625C-4CD0-BED4-8EACC78D21E6-blog-"+"user","4B929568-625C-4CD0-BED4-8EACC78D21E6-blog-"+"pass"];
     _key_user=patternInput[0];
     _key_pass=patternInput[1];
     arg10=Controls.Input(localStorage.getItem(_key_user));
     formlet=Enhance.WithValidationIcon(Data.Validator().IsNotEmpty("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f",arg10));
     x=Enhance.WithValidationFrame(formlet);
     uName=Enhance.WithTextLabel("\u0418\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f",x);
     arg00=function(x1)
     {
      return x1!=="";
     };
     arg20=Controls.Password(localStorage.getItem(_key_pass));
     formlet1=Data.Validator().Is(arg00,"\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c ",arg20);
     x2=Enhance.WithValidationIcon(Enhance.WithValidationFrame(formlet1));
     pw=Enhance.WithTextLabel("\u041f\u0430\u0440\u043e\u043b\u044c",x2);
     loginF=Data.$(Data.$(Formlet.Return(function(n)
     {
      return function(pw1)
      {
       return[n,pw1];
      };
     }),uName),pw);
     _builder_=Formlet.Do();
     return _builder_.Delay(function()
     {
      var x1,inputRecord,x3,inputRecord1;
      x1=Enhance.WithLegend("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f \u0438 \u043f\u0430\u0440\u043e\u043b\u044c",loginF);
      inputRecord=FormButtonConfiguration.get_Default();
      x3=Enhance.WithCustomSubmitButton(Runtime.New(FormButtonConfiguration,{
       Label:{
        $:1,
        $0:"\u0412\u043e\u0439\u0442\u0438"
       },
       Style:inputRecord.Style,
       Class:inputRecord.Class
      }),x1);
      inputRecord1=FormContainerConfiguration.get_Default();
      return _builder_.Bind(Enhance.WithCustomFormContainer(Runtime.New(FormContainerConfiguration,{
       Header:inputRecord1.Header,
       Padding:inputRecord1.Padding,
       Description:inputRecord1.Description,
       BackgroundColor:inputRecord1.BackgroundColor,
       BorderColor:inputRecord1.BorderColor,
       CssClass:{
        $:1,
        $0:"formContainer"
       },
       Style:inputRecord1.Style
      }),x3),function(_arg1)
      {
       var user,pass,arg101;
       user=_arg1[0];
       pass=_arg1[1];
       localStorage.setItem(_key_user,user);
       localStorage.setItem(_key_pass,pass);
       arg101=List.ofArray([Tags.Tags().text("\u0412\u044b\u043f\u043e\u043b\u043d\u044f\u0435\u0442\u0441\u044f \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u044f...")]);
       return _builder_.ReturnFrom(LoginUI.WithLoadingPane(Tags.Tags().NewTag("div",arg101),Concurrency.Delay(function()
       {
        jQuery("input").attr("disabled","disabled");
        jQuery(".submitButton").hide();
        return AjaxRemotingProvider.Async("Application2:0",[_arg1[0],_arg1[1]]);
       }),function(_arg2)
       {
        if(_arg2)
         {
          document.location=redirectUrl;
          return Formlet.Return(null);
         }
        else
         {
          jQuery("input").removeAttr("disabled");
          jQuery(".submitButton").show();
          return LoginUI.WarningPanel("\u043d\u0435\u0434\u043e\u043f\u0443\u0441\u0442\u0438\u043c\u043e\u0435 \u0438\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c");
         }
       }));
      });
     });
    },
    WarningPanel:function(label)
    {
     var _builder_;
     _builder_=Formlet.Do();
     return _builder_.Delay(function()
     {
      return _builder_.Bind(Formlet.OfElement(function()
      {
       var arg10;
       arg10=List.ofArray([Tags.Tags().text(label)]);
       return Tags.Tags().NewTag("div",arg10);
      }),function()
      {
       return _builder_.ReturnFrom(Formlet.Never());
      });
     });
    },
    WithLoadingPane:function(init,a,f)
    {
     return Formlet.Replace(Formlet.BuildFormlet(function()
     {
      var state;
      state=FSharpEvent.New();
      Concurrency.Start(Concurrency.Delay(function()
      {
       return Concurrency.Bind(a,function(_arg11)
       {
        state.event.Trigger(Runtime.New(Result,{
         $:0,
         $0:_arg11
        }));
        return Concurrency.Return(null);
       });
      }),{
       $:0
      });
      return[init,function()
      {
      },state.event];
     }),f);
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  UI=Runtime.Safe(Global.WebSharper.UI);
  Next=Runtime.Safe(UI.Next);
  Var=Runtime.Safe(Next.Var);
  WebBlogApplication=Runtime.Safe(Global.WebBlogApplication);
  BlogUI=Runtime.Safe(WebBlogApplication.BlogUI);
  Util=Runtime.Safe(BlogUI.Util);
  View1=Runtime.Safe(Next.View1);
  View=Runtime.Safe(Next.View);
  Html=Runtime.Safe(Next.Html);
  List=Runtime.Safe(Global.WebSharper.List);
  Doc=Runtime.Safe(Next.Doc);
  T=Runtime.Safe(List.T);
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  _____________________________________=Runtime.Safe(BlogUI["\u044f\u0434\u0440\u043e \u043a\u043b\u0438\u0435\u043d\u0442\u0441\u043a\u043e\u0439 \u0447\u0430\u0441\u0442\u0438 \u0432\u0435\u0431 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f"]);
  console=Runtime.Safe(Global.console);
  Render=Runtime.Safe(BlogUI.Render);
  Attr=Runtime.Safe(Next.Attr);
  jQuery=Runtime.Safe(Global.jQuery);
  Operators=Runtime.Safe(Global.WebSharper.Operators);
  String=Runtime.Safe(Global.String);
  ClientUtils=Runtime.Safe(WebBlogApplication.ClientUtils);
  Control=Runtime.Safe(Global.WebSharper.Control);
  MailboxProcessor=Runtime.Safe(Control.MailboxProcessor);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  Number=Runtime.Safe(Global.Number);
  window=Runtime.Safe(Global.window);
  Formlets=Runtime.Safe(Global.WebSharper.Formlets);
  Controls=Runtime.Safe(Formlets.Controls);
  Enhance=Runtime.Safe(Formlets.Enhance);
  Data=Runtime.Safe(Formlets.Data);
  Formlet=Runtime.Safe(Formlets.Formlet);
  FormButtonConfiguration=Runtime.Safe(Enhance.FormButtonConfiguration);
  FormContainerConfiguration=Runtime.Safe(Enhance.FormContainerConfiguration);
  LoginUI=Runtime.Safe(WebBlogApplication.LoginUI);
  Html1=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html1.Client);
  Tags=Runtime.Safe(Client.Tags);
  document=Runtime.Safe(Global.document);
  FSharpEvent=Runtime.Safe(Control.FSharpEvent);
  IntelliFactory=Runtime.Safe(Global.IntelliFactory);
  Formlets1=Runtime.Safe(IntelliFactory.Formlets);
  Base=Runtime.Safe(Formlets1.Base);
  return Result=Runtime.Safe(Base.Result);
 });
 Runtime.OnLoad(function()
 {
  _____________________________________.crud();
  Util.br0();
  return;
 });
}());
