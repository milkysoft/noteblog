(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Formlets,Body,Controls,List,Html,Client,Tags,Data,IntelliFactory,Reactive,HotStream,Formlets1,Base,Result,Attr,T,Operators,jQuery,EventsPervasives,Formlet,Ref,CssConstants,Math,Seq,Utils,Tree,Edit,Form,Arrays,FormletProvider,Formlet1,Pagelet,Util,LayoutProvider,LayoutUtils,Reactive1,Validator,ValidatorProvidor,RegExp,Collections,Dictionary,ElementStore,Enhance,FormButtonConfiguration,FormContainerConfiguration,Padding,ManyConfiguration,ValidationFrameConfiguration,ValidationIconConfiguration,JSON,FormletBuilder,Layout,FormRowConfiguration,LabelConfiguration,Padding1,Enumerator;
 Runtime.Define(Global,{
  WebSharper:{
   Formlets:{
    Body:Runtime.Class({},{
     New:function(el,l)
     {
      return Runtime.New(Body,{
       Element:el,
       Label:l
      });
     }
    }),
    Controls:{
     Button:function(label)
     {
      return Controls.ElementButton(function()
      {
       var arg10;
       arg10=List.ofArray([Tags.Tags().text(label)]);
       return Tags.Tags().NewTag("button",arg10);
      });
     },
     Checkbox:function(def)
     {
      return Controls.CheckboxControl(false,def);
     },
     CheckboxControl:function(readOnly,def)
     {
      return Data.MkFormlet(function()
      {
       var state,readOnlyAtts,x,arg10,arg00,body,reset;
       state=HotStream.New(Runtime.New(Result,{
        $:0,
        $0:def
       }));
       readOnlyAtts=readOnly?List.ofArray([Attr.Attr().NewAttr("disabled","disabled")]):Runtime.New(T,{
        $:0
       });
       arg10=List.ofArray([Attr.Attr().NewAttr("type","checkbox"),Attr.Attr().NewAttr("class","inputCheckbox")]);
       x=Operators.add(Tags.Tags().NewTag("input",arg10),readOnlyAtts);
       arg00=function(cb)
       {
        return function()
        {
         return!readOnly?state.Trigger(Runtime.New(Result,{
          $:0,
          $0:jQuery(cb.get_Body()).prop("checked")
         })):null;
        };
       };
       EventsPervasives.Events().OnClick(arg00,x);
       body=x;
       if(def)
        {
         body["HtmlProvider@33"].SetAttribute(body.get_Body(),"defaultChecked","true");
        }
       else
        {
         body["HtmlProvider@33"].RemoveAttribute(body.get_Body(),"checked");
        }
       reset=function()
       {
        if(def)
         {
          body["HtmlProvider@33"].SetProperty(body.get_Body(),"checked",true);
         }
        else
         {
          body["HtmlProvider@33"].RemoveAttribute(body.get_Body(),"checked");
          body["HtmlProvider@33"].SetProperty(body.get_Body(),"checked",false);
         }
        return state.Trigger(Runtime.New(Result,{
         $:0,
         $0:def
        }));
       };
       reset(null);
       return[body,reset,state];
      });
     },
     CheckboxGroup:function(values)
     {
      return Controls.CheckboxGroupControl(false,values);
     },
     CheckboxGroupControl:function(readOnly,values)
     {
      var chooser;
      chooser=function(tupledArg)
      {
       var v;
       v=tupledArg[1];
       return tupledArg[0]?{
        $:1,
        $0:v
       }:{
        $:0
       };
      };
      return Formlet.Map(function(list)
      {
       return List.choose(chooser,list);
      },Formlet.Sequence(List.map(function(tupledArg)
      {
       var l,v,formlet;
       l=tupledArg[0];
       v=tupledArg[1];
       formlet=Controls.CheckboxControl(readOnly,tupledArg[2]);
       return Formlet.Map(function(b)
       {
        return[b,v];
       },Formlet.WithLabel({
        $:1,
        $0:function()
        {
         var arg10;
         arg10=List.ofArray([Tags.Tags().text(l)]);
         return Tags.Tags().NewTag("label",arg10);
        }
       },formlet));
      },values)));
     },
     ElementButton:function(genElem)
     {
      return Data.MkFormlet(function()
      {
       var state,count,x,arg00;
       state=HotStream.New(Runtime.New(Result,{
        $:1,
        $0:Runtime.New(T,{
         $:0
        })
       }));
       count=[0];
       x=genElem(null);
       arg00=function()
       {
        return function()
        {
         state.Trigger(Runtime.New(Result,{
          $:0,
          $0:count[0]
         }));
         return Ref.incr(count);
        };
       };
       EventsPervasives.Events().OnClick(arg00,x);
       return[x,function()
       {
        count[0]=0;
        return state.Trigger(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
       },state];
      });
     },
     Input:function(value)
     {
      return Controls.InputField(false,"text",CssConstants.InputTextClass(),value);
     },
     InputControl:function(value,f)
     {
      return Data.MkFormlet(function()
      {
       var state,body;
       state=HotStream.New(Runtime.New(Result,{
        $:0,
        $0:value
       }));
       body=f(state);
       body.set_Value(value);
       return[body,function()
       {
        body.set_Value(value);
        return state.Trigger(Runtime.New(Result,{
         $:0,
         $0:value
        }));
       },state];
      });
     },
     InputField:function(readOnly,typ,cls,value)
     {
      return Controls.InputControl(value,function(state)
      {
       var ro,arg10,input;
       ro=readOnly?List.ofArray([Attr.Attr().NewAttr("readonly","readonly")]):Runtime.New(T,{
        $:0
       });
       arg10=List.append(List.ofArray([Attr.Attr().NewAttr("type",typ),Attr.Attr().NewAttr("class",cls)]),ro);
       input=Tags.Tags().NewTag("input",arg10);
       Controls.OnTextChange(function()
       {
        return!readOnly?state.Trigger(Runtime.New(Result,{
         $:0,
         $0:input.get_Value()
        })):null;
       },input);
       return input;
      });
     },
     OnTextChange:function(f,control)
     {
      var value,up,arg00,arg001;
      value=[control.get_Value()];
      up=function()
      {
       if(control.get_Value()!==value[0])
        {
         value[0]=control.get_Value();
         return f(null);
        }
       else
        {
         return null;
        }
      };
      arg00=function()
      {
       return function()
       {
        return up(null);
       };
      };
      EventsPervasives.Events().OnChange(arg00,control);
      arg001=function()
      {
       return function()
       {
        return up(null);
       };
      };
      EventsPervasives.Events().OnKeyUp(arg001,control);
      control.Dom.oninput=up;
      return;
     },
     Password:function(value)
     {
      return Controls.InputField(false,"password","inputPassword",value);
     },
     RadioButtonGroup:function(def,values)
     {
      return Controls.RadioButtonGroupControl(false,def,values);
     },
     RadioButtonGroupControl:function(readOnly,def,values)
     {
      return Formlet.New(function()
      {
       var groupId,x,d,state,rbLbVls,resetRB,x1;
       groupId="id"+Math.round(Math.random()*100000000);
       x=def.$==0?{
        $:0
       }:Seq.tryPick(function(tupledArg)
       {
        var ix,value;
        ix=tupledArg[0];
        value=tupledArg[1];
        return def.$==0?{
         $:0
        }:def.$0===ix?{
         $:1,
         $0:Runtime.New(Result,{
          $:0,
          $0:value
         })
        }:{
         $:0
        };
       },List.mapi(function(ix)
       {
        return function(tupledArg)
        {
         return[ix,tupledArg[1]];
        };
       },values));
       d=HotStream.New(Runtime.New(Result,{
        $:1,
        $0:Runtime.New(T,{
         $:0
        })
       }));
       state=Utils.Maybe(d,function(arg00)
       {
        return HotStream.New(arg00);
       },x);
       rbLbVls=List.map(function(tupledArg)
       {
        var label,value,arg10;
        label=tupledArg[0];
        value=tupledArg[1];
        arg10=List.ofArray([Attr.Attr().NewAttr("class","inputRadio"),Attr.Attr().NewAttr("type","radio"),Attr.Attr().NewAttr("name",groupId)]);
        return[Operators.add(Tags.Tags().NewTag("input",arg10),readOnly?List.ofArray([Attr.Attr().NewAttr("disabled","disabled")]):Runtime.New(T,{
         $:0
        })),label,value];
       },values);
       resetRB=function(rb,value,ix)
       {
        if(def.$==0)
         {
          rb["HtmlProvider@33"].RemoveAttribute(rb.get_Body(),"checked");
          return state.Trigger(Runtime.New(Result,{
           $:1,
           $0:Runtime.New(T,{
            $:0
           })
          }));
         }
        else
         {
          if(def.$0===ix)
           {
            rb["HtmlProvider@33"].SetProperty(rb.get_Body(),"checked",true);
            return state.Trigger(Runtime.New(Result,{
             $:0,
             $0:value
            }));
           }
          else
           {
            return rb["HtmlProvider@33"].SetProperty(rb.get_Body(),"checked",false);
           }
         }
       };
       x1=Runtime.New(Edit,{
        $:0,
        $0:Tree.FromSequence(List.mapi(function(ix)
        {
         return function(tupledArg)
         {
          var rb,label,value,arg00;
          rb=tupledArg[0];
          label=tupledArg[1];
          value=tupledArg[2];
          resetRB(rb,value,ix);
          arg00=function()
          {
           return function()
           {
            return!readOnly?state.Trigger(Runtime.New(Result,{
             $:0,
             $0:value
            })):null;
           };
          };
          EventsPervasives.Events().OnClick(arg00,rb);
          return Runtime.New(Body,{
           Element:rb,
           Label:{
            $:1,
            $0:function()
            {
             var arg10;
             arg10=List.ofArray([Tags.Tags().text(label)]);
             return Tags.Tags().NewTag("label",arg10);
            }
           }
          });
         };
        },rbLbVls))
       });
       return Runtime.New(Form,{
        Body:Data.RX().Return(x1),
        Dispose1:function()
        {
        },
        Notify:function()
        {
         return Seq.iteri(function(ix)
         {
          return function(tupledArg)
          {
           return resetRB(tupledArg[0],tupledArg[2],ix);
          };
         },rbLbVls);
        },
        State:state
       });
      });
     },
     ReadOnlyCheckbox:function(def)
     {
      return Controls.CheckboxControl(true,def);
     },
     ReadOnlyInput:function(value)
     {
      return Controls.InputField(true,"text",CssConstants.InputTextClass(),value);
     },
     ReadOnlyRadioButtonGroup:function(def,values)
     {
      return Controls.RadioButtonGroupControl(true,def,values);
     },
     ReadOnlySelect:function(def,vls)
     {
      return Controls.SelectControl(true,def,vls);
     },
     ReadOnlyTextArea:function(value)
     {
      return Controls.TextAreaControl(true,value);
     },
     Select:function(def,vls)
     {
      return Controls.SelectControl(false,def,vls);
     },
     SelectControl:function(readOnly,def,vls)
     {
      return Data.MkFormlet(function()
      {
       var x,aVls,sIx,x1,select,body,sValue,state,reset,arg00;
       x=List.map(function(tuple)
       {
        return tuple[1];
       },vls);
       aVls=Arrays.ofSeq(x);
       sIx=(def>=0?def<vls.get_Length():false)?def:0;
       x1=List.mapi(function(i)
       {
        return function(tupledArg)
        {
         var nm;
         nm=tupledArg[0];
         return Tags.Tags().NewTag("option",List.ofArray([Tags.Tags().text(nm),Attr.Attr().NewAttr("value",Global.String(i))]));
        };
       },vls);
       select=Tags.Tags().NewTag("select",x1);
       body=readOnly?Operators.add(select,List.ofArray([Attr.Attr().NewAttr("disabled","disabled")])):select;
       sValue=Runtime.New(Result,{
        $:0,
        $0:Arrays.get(aVls,sIx)
       });
       state=HotStream.New(sValue);
       reset=function()
       {
        var arg20;
        arg20=Global.String(sIx);
        body["HtmlProvider@33"].SetProperty(body.get_Body(),"value",arg20);
        return state.Trigger(sValue);
       };
       reset(null);
       arg00=function()
       {
        return function()
        {
         return!readOnly?state.Trigger(Runtime.New(Result,{
          $:0,
          $0:Arrays.get(aVls,body.get_Value()<<0)
         })):null;
        };
       };
       EventsPervasives.Events().OnChange(arg00,body);
       reset(null);
       return[body,reset,state];
      });
     },
     TextArea:function(value)
     {
      return Controls.TextAreaControl(false,value);
     },
     TextAreaControl:function(readOnly,value)
     {
      return Controls.InputControl(value,function(state)
      {
       var x,input;
       x=readOnly?List.ofArray([Attr.Attr().NewAttr("readonly","readonly")]):Runtime.New(T,{
        $:0
       });
       input=Tags.Tags().NewTag("textarea",x);
       Controls.OnTextChange(function()
       {
        return!readOnly?state.Trigger(Runtime.New(Result,{
         $:0,
         $0:input.get_Value()
        })):null;
       },input);
       return input;
      });
     }
    },
    CssConstants:{
     InputTextClass:Runtime.Field(function()
     {
      return"inputText";
     })
    },
    Data:{
     $:function(f,x)
     {
      return Data.OfIFormlet(Data.BaseFormlet().Apply(f,x));
     },
     BaseFormlet:function()
     {
      return FormletProvider.New(Data.UtilsProvider());
     },
     DefaultLayout:Runtime.Field(function()
     {
      return Data.Layout().get_Vertical();
     }),
     Formlet:Runtime.Class({
      Build:function()
      {
       return this.buildInternal.call(null,null);
      },
      MapResult:function(f)
      {
       var _this=this;
       return Formlet1.New(function()
       {
        var form;
        form=_this.buildInternal.call(null,null);
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:_this.utils.Reactive.Select(form.State,function(x)
         {
          return f(x);
         })
        });
       },_this.layoutInternal,_this.formletBase,_this.utils);
      },
      Render:function()
      {
       return this.Run(function()
       {
       }).Render();
      },
      Run:function(f)
      {
       var matchValue,formlet,form,matchValue1,el;
       matchValue=this.get_ElementInternal();
       if(matchValue.$==0)
        {
         formlet=this.formletBase.ApplyLayout(this);
         form=formlet.Build();
         Util.subscribeTo(form.State,function(res)
         {
          Result.Map(f,res);
         });
         matchValue1=formlet.get_Layout().Apply.call(null,form.Body);
         el=matchValue1.$==0?Data.DefaultLayout().Apply.call(null,form.Body).$0[0].Element:matchValue1.$0[0].Element;
         this.set_ElementInternal({
          $:1,
          $0:el
         });
         return el;
        }
       else
        {
         return matchValue.$0;
        }
      },
      get_Body:function()
      {
       return this.Run(function()
       {
       }).get_Body();
      },
      get_ElementInternal:function()
      {
       return this["ElementInternal@"];
      },
      get_Layout:function()
      {
       return this.layoutInternal;
      },
      set_ElementInternal:function(v)
      {
       this["ElementInternal@"]=v;
       return;
      }
     },{
      New:function(buildInternal,layoutInternal,formletBase,utils)
      {
       var r;
       r=Runtime.New(this,Pagelet.New());
       r.buildInternal=buildInternal;
       r.layoutInternal=layoutInternal;
       r.formletBase=formletBase;
       r.utils=utils;
       r["ElementInternal@"]={
        $:0
       };
       return r;
      }
     }),
     Layout:Runtime.Field(function()
     {
      return LayoutProvider.New(LayoutUtils.New({
       Reactive:Reactive1.Default()
      }));
     }),
     MkFormlet:function(f)
     {
      var arg00;
      arg00=function()
      {
       var patternInput,state,reset,Notify,arg001;
       patternInput=f(null);
       state=patternInput[2];
       reset=patternInput[1];
       Notify=function()
       {
        return reset(null);
       };
       arg001=Tree.Set(Data.NewBody(patternInput[0],{
        $:0
       }));
       return Runtime.New(Form,{
        Body:Data.RX().Return(arg001),
        Dispose1:function()
        {
         return null;
        },
        Notify:Notify,
        State:state
       });
      };
      return Data.OfIFormlet(Data.BaseFormlet().New(arg00));
     },
     NewBody:function(arg00,arg10)
     {
      return Body.New(arg00,arg10);
     },
     OfIFormlet:function(formlet)
     {
      return Data.PropagateRenderFrom(formlet,Formlet1.New(function()
      {
       return formlet.Build();
      },formlet.get_Layout(),Data.BaseFormlet(),Data.UtilsProvider()));
     },
     PropagateRenderFrom:function(f1,f2)
     {
      if(f1.hasOwnProperty("Render"))
       {
        f2.Render=f1.Render;
       }
      return f2;
     },
     RX:Runtime.Field(function()
     {
      return Reactive1.Default();
     }),
     UtilsProvider:function()
     {
      return{
       Reactive:Data.RX(),
       DefaultLayout:Data.DefaultLayout()
      };
     },
     Validator:Runtime.Field(function()
     {
      return Validator.New(ValidatorProvidor.New());
     }),
     ValidatorProvidor:Runtime.Class({
      Matches:function(regex,text)
      {
       return text.match(new RegExp(regex));
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     })
    },
    ElementStore:Runtime.Class({
     Init:function()
     {
      this.store=Dictionary.New12();
      return;
     },
     RegisterElement:function(key,f)
     {
      return!this.store.ContainsKey(key)?this.store.set_Item(key,f):null;
     },
     Remove:function(key)
     {
      if(this.store.ContainsKey(key))
       {
        (this.store.get_Item(key))(null);
        this.store.Remove(key);
        return;
       }
      else
       {
        return null;
       }
     }
    },{
     New:function()
     {
      return Runtime.New(this,{});
     },
     NewElementStore:function()
     {
      var store;
      store=ElementStore.New();
      store.Init();
      return store;
     }
    }),
    Enhance:{
     Cancel:function(formlet,isCancel)
     {
      return Formlet.Replace(formlet,function(value)
      {
       return isCancel(value)?Formlet.Empty():Formlet.Return(value);
      });
     },
     CustomMany:function(config,formlet)
     {
      var x,addButton,f,formlet1,c,formlet2,x1,delF,resetS,resetF,reset,_builder_;
      x=Controls.ElementButton(function()
      {
       var arg10,arg101,arg102;
       arg101=config.AddIconClass;
       arg10=List.ofArray([Attr.Attr().NewAttr("class",arg101)]);
       arg102=Runtime.New(T,{
        $:0
       });
       return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Tags.Tags().NewTag("div",arg102)]));
      });
      addButton=Formlet.InitWith(1,x);
      f=function()
      {
      };
      formlet1=Controls.ElementButton(function()
      {
       var arg10,arg101,arg102;
       arg101=config.RemoveIconClass;
       arg10=List.ofArray([Attr.Attr().NewAttr("class",arg101)]);
       arg102=Runtime.New(T,{
        $:0
       });
       return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Tags.Tags().NewTag("div",arg102)]));
      });
      c=Formlet.Map(f,formlet1);
      formlet2=Formlet.WithCancelation(formlet,c);
      x1=Formlet.WithLayout(Data.Layout().get_Horizontal(),formlet2);
      delF=Enhance.Deletable(x1);
      resetS=HotStream.New(Runtime.New(Result,{
       $:0,
       $0:null
      }));
      resetF=Data.OfIFormlet(Data.BaseFormlet().FromState(resetS));
      reset=function()
      {
       return resetS.Trigger(Runtime.New(Result,{
        $:0,
        $0:null
       }));
      };
      _builder_=Formlet.Do();
      return Formlet.WithNotification(reset,_builder_.Delay(function()
      {
       return _builder_.Bind(resetF,function()
       {
        return _builder_.ReturnFrom(Formlet.ApplyLayout(Formlet.WithLayoutOrDefault(Formlet.Map(function(source)
        {
         return List.ofSeq(source);
        },Enhance.Many_(addButton,function()
        {
         return delF;
        })))));
       });
      }));
     },
     Deletable:function(formlet)
     {
      return Enhance.Replace(formlet,function(value)
      {
       return value.$==1?Formlet.Return({
        $:1,
        $0:value.$0
       }):Formlet.ReturnEmpty({
        $:0
       });
      });
     },
     FormButtonConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(FormButtonConfiguration,{
        Label:{
         $:0
        },
        Style:{
         $:0
        },
        Class:{
         $:0
        }
       });
      }
     }),
     FormContainerConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       var Description;
       Description={
        $:0
       };
       return Runtime.New(FormContainerConfiguration,{
        Header:{
         $:0
        },
        Padding:Padding.get_Default(),
        Description:Description,
        BackgroundColor:{
         $:0
        },
        BorderColor:{
         $:0
        },
        CssClass:{
         $:0
        },
        Style:{
         $:0
        }
       });
      }
     }),
     InputButton:function(conf,enabled)
     {
      return Data.MkFormlet(function()
      {
       var state,count,label,x1,arg10,arg00,submit,submit1,matchValue,arg101,matchValue1,arg102,reset;
       state=HotStream.New(Runtime.New(Result,{
        $:1,
        $0:Runtime.New(T,{
         $:0
        })
       }));
       count=[0];
       label=Utils.Maybe("Submit",function(x)
       {
        return x;
       },conf.Label);
       arg10=List.ofArray([Attr.Attr().NewAttr("type","button")]);
       x1=Operators.add(Tags.Tags().NewTag("input",arg10),List.ofArray([Attr.Attr().NewAttr("class","submitButton"),Attr.Attr().NewAttr("value",label)]));
       arg00=function()
       {
        return function()
        {
         Ref.incr(count);
         return state.Trigger(Runtime.New(Result,{
          $:0,
          $0:count[0]
         }));
        };
       };
       EventsPervasives.Events().OnClick(arg00,x1);
       submit=x1;
       if(!enabled)
        {
         submit["HtmlProvider@33"].AddClass(submit.get_Body(),"disabledButton");
        }
       matchValue=conf.Style;
       if(matchValue.$==1)
        {
         arg101=matchValue.$0;
         submit["HtmlProvider@33"].SetStyle(submit.get_Body(),arg101);
        }
       matchValue1=conf.Class;
       if(matchValue1.$==1)
        {
         arg102=matchValue1.$0;
         submit["HtmlProvider@33"].AddClass(submit.get_Body(),arg102);
        }
       submit1=submit;
       reset=function()
       {
        count[0]=0;
        return state.Trigger(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
       };
       state.Trigger(Runtime.New(Result,{
        $:1,
        $0:Runtime.New(T,{
         $:0
        })
       }));
       return[submit1,reset,state];
      });
     },
     Many:function(formlet)
     {
      return Enhance.CustomMany(ManyConfiguration.get_Default(),formlet);
     },
     ManyConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(ManyConfiguration,{
        AddIconClass:"addIcon",
        RemoveIconClass:"removeIcon"
       });
      }
     }),
     Many_:function(add,f)
     {
      var chooser;
      chooser=function(x)
      {
       return x;
      };
      return Formlet.Map(function(source)
      {
       return Seq.choose(chooser,source);
      },Formlet.FlipBody(Formlet.SelectMany(Formlet.Map(function(v)
      {
       return f(v);
      },add))));
     },
     Padding:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(Padding,{
        Left:{
         $:0
        },
        Right:{
         $:0
        },
        Top:{
         $:0
        },
        Bottom:{
         $:0
        }
       });
      }
     }),
     Replace:function(formlet,f)
     {
      return Formlet.Switch(Formlet.MapResult(function(res)
      {
       return res.$==1?Runtime.New(Result,{
        $:0,
        $0:Formlet.FailWith(res.$0)
       }):Runtime.New(Result,{
        $:0,
        $0:f(res.$0)
       });
      },formlet));
     },
     ValidationFrameConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(ValidationFrameConfiguration,{
        ValidClass:{
         $:1,
         $0:"successFormlet"
        },
        ValidStyle:{
         $:0
        },
        ErrorClass:{
         $:1,
         $0:"errorFormlet"
        },
        ErrorStyle:{
         $:0
        }
       });
      }
     }),
     ValidationIconConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(ValidationIconConfiguration,{
        ValidIconClass:"validIcon",
        ErrorIconClass:"errorIcon"
       });
      }
     }),
     WithCssClass:function(css,formlet)
     {
      return Formlet.MapElement(function(el)
      {
       el["HtmlProvider@33"].AddClass(el.get_Body(),css);
       return el;
      },formlet);
     },
     WithCustomFormContainer:function(fc,formlet)
     {
      var x;
      x=Formlet.ApplyLayout(formlet);
      return Formlet.MapElement(function(formEl)
      {
       var x1,d,description,x2,d1,arg101,tb,cell,arg103,matchValue,arg104,matchValue1,arg105,arg106,arg107,arg108;
       x1=fc.Description;
       d=Runtime.New(T,{
        $:0
       });
       description=Utils.Maybe(d,function(descr)
       {
        var text,arg10;
        if(descr.$==1)
         {
          return List.ofArray([descr.$0.call(null,null)]);
         }
        else
         {
          text=descr.$0;
          arg10=List.ofArray([Tags.Tags().text(text)]);
          return List.ofArray([Tags.Tags().NewTag("p",arg10)]);
         }
       },x1);
       x2=fc.Header;
       arg101=List.ofArray([Attr.Attr().NewAttr("class","headerPanel")]);
       d1=Utils.InTable(List.ofArray([List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg101),description)]),List.ofArray([formEl])]));
       tb=Utils.Maybe(d1,function(formElem)
       {
        var hdr,text,arg10,arg102;
        if(formElem.$==1)
         {
          hdr=formElem.$0.call(null,null);
         }
        else
         {
          text=formElem.$0;
          arg10=List.ofArray([Tags.Tags().text(text)]);
          hdr=Tags.Tags().NewTag("h1",arg10);
         }
        arg102=List.ofArray([Attr.Attr().NewAttr("class","headerPanel")]);
        return Utils.InTable(List.ofArray([List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg102),Runtime.New(T,{
         $:1,
         $0:hdr,
         $1:description
        }))]),List.ofArray([formEl])]));
       },x2);
       arg103=List.ofArray([Attr.Attr().NewAttr("class","formlet")]);
       cell=Operators.add(Tags.Tags().NewTag("td",arg103),List.ofArray([tb]));
       Utils.Maybe(null,function(color)
       {
        var arg10;
        arg10="border-color: "+color;
        return cell["HtmlProvider@33"].SetStyle(cell.get_Body(),arg10);
       },fc.BorderColor);
       Seq.iter(function(tupledArg)
       {
        var name,value,arg20;
        name=tupledArg[0];
        value=tupledArg[1];
        if(value.$==0)
         {
          return null;
         }
        else
         {
          arg20=value.$0;
          return cell["HtmlProvider@33"].SetCss(cell.get_Body(),name,arg20);
         }
       },List.ofArray([["background-color",Utils.MapOption(function(color)
       {
        return color;
       },fc.BackgroundColor)],["padding-left",Utils.MapOption(function(v)
       {
        return Global.String(v)+"px";
       },fc.Padding.Left)],["padding-right",Utils.MapOption(function(v)
       {
        return Global.String(v)+"px";
       },fc.Padding.Right)],["padding-top",Utils.MapOption(function(v)
       {
        return Global.String(v)+"px";
       },fc.Padding.Top)],["padding-bottom",Utils.MapOption(function(v)
       {
        return Global.String(v)+"px";
       },fc.Padding.Bottom)]]));
       matchValue=fc.Style;
       if(matchValue.$==0)
        {
        }
       else
        {
         arg104=matchValue.$0;
         cell["HtmlProvider@33"].SetStyle(cell.get_Body(),arg104);
        }
       matchValue1=fc.CssClass;
       if(matchValue1.$==0)
        {
        }
       else
        {
         arg105=matchValue1.$0;
         cell["HtmlProvider@33"].AddClass(cell.get_Body(),arg105);
        }
       arg108=List.ofArray([cell]);
       arg107=List.ofArray([Tags.Tags().NewTag("tr",arg108)]);
       arg106=List.ofArray([Tags.Tags().NewTag("tbody",arg107)]);
       return Tags.Tags().NewTag("table",arg106);
      },x);
     },
     WithCustomResetButton:function(buttonConf,formlet)
     {
      return Enhance.WithResetFormlet(formlet,Enhance.InputButton(buttonConf.Label.$==0?Runtime.New(FormButtonConfiguration,{
       Label:{
        $:1,
        $0:"Reset"
       },
       Style:buttonConf.Style,
       Class:buttonConf.Class
      }):buttonConf,true));
     },
     WithCustomSubmitAndResetButtons:function(submitConf,resetConf,formlet)
     {
      return Enhance.WithSubmitAndReset(formlet,function(reset)
      {
       return function(result)
       {
        var submit,fs,value,_builder_,reset1,formlet1;
        if(result.$==1)
         {
          fs=result.$0;
          submit=Formlet.MapResult(function()
          {
           return Runtime.New(Result,{
            $:1,
            $0:fs
           });
          },Enhance.InputButton(submitConf,false));
         }
        else
         {
          value=result.$0;
          submit=Formlet.Map(function()
          {
           return value;
          },Enhance.InputButton(submitConf,true));
         }
        _builder_=Formlet.Do();
        reset1=_builder_.Delay(function()
        {
         return _builder_.Bind(Formlet.LiftResult(Enhance.InputButton(resetConf,true)),function(_arg1)
         {
          if(_arg1.$==0)
           {
            reset(null);
           }
          return _builder_.Return(null);
         });
        });
        formlet1=Data.$(Data.$(Formlet.Return(function(v)
        {
         return function()
         {
          return v;
         };
        }),submit),reset1);
        return Formlet.WithLayout(Data.Layout().get_Horizontal(),formlet1);
       };
      });
     },
     WithCustomSubmitButton:function(buttonConf,formlet)
     {
      var buttonConf1;
      buttonConf1=buttonConf.Label.$==0?Runtime.New(FormButtonConfiguration,{
       Label:{
        $:1,
        $0:"Submit"
       },
       Style:buttonConf.Style,
       Class:buttonConf.Class
      }):buttonConf;
      return Enhance.WithSubmitFormlet(formlet,function(res)
      {
       return Formlet.Map(function()
       {
       },Enhance.InputButton(buttonConf1,res.$==0?true:false));
      });
     },
     WithCustomValidationFrame:function(vc,formlet)
     {
      return Enhance.WrapFormlet(function(state)
      {
       return function(body)
       {
        var arg10,x;
        arg10=List.ofArray([body.Element]);
        x=Tags.Tags().NewTag("div",arg10);
        Operators.OnAfterRender(function(panel)
        {
         Util.subscribeTo(state,function(res)
         {
          var msgs,matchValue,arg101,matchValue1,arg102,matchValue2,arg103,matchValue3,arg104,matchValue4,arg105,matchValue5,arg106;
          if(res.$==1)
           {
            msgs=res.$0;
            matchValue=vc.ValidClass;
            if(matchValue.$==1)
             {
              arg101=matchValue.$0;
              panel["HtmlProvider@33"].RemoveClass(panel.get_Body(),arg101);
             }
            matchValue1=vc.ErrorClass;
            if(matchValue1.$==1)
             {
              arg102=matchValue1.$0;
              panel["HtmlProvider@33"].AddClass(panel.get_Body(),arg102);
             }
            matchValue2=vc.ErrorStyle;
            if(matchValue2.$==1)
             {
              arg103=matchValue2.$0;
              return panel["HtmlProvider@33"].SetStyle(panel.get_Body(),arg103);
             }
            else
             {
              return panel["HtmlProvider@33"].SetStyle(panel.get_Body(),"");
             }
           }
          else
           {
            matchValue3=vc.ErrorClass;
            if(matchValue3.$==1)
             {
              arg104=matchValue3.$0;
              panel["HtmlProvider@33"].RemoveClass(panel.get_Body(),arg104);
             }
            matchValue4=vc.ValidClass;
            if(matchValue4.$==1)
             {
              arg105=matchValue4.$0;
              panel["HtmlProvider@33"].AddClass(panel.get_Body(),arg105);
             }
            matchValue5=vc.ValidStyle;
            if(matchValue5.$==1)
             {
              arg106=matchValue5.$0;
              return panel["HtmlProvider@33"].SetStyle(panel.get_Body(),arg106);
             }
            else
             {
              return panel["HtmlProvider@33"].SetStyle(panel.get_Body(),"");
             }
           }
         });
        },x);
        return x;
       };
      },formlet);
     },
     WithCustomValidationIcon:function(vic,formlet)
     {
      var formlet1,_builder_,x;
      formlet1=Formlet.WithLayoutOrDefault(formlet);
      _builder_=Formlet.Do();
      x=Formlet.MapResult(function(arg00)
      {
       return Result.Join(arg00);
      },_builder_.Delay(function()
      {
       return _builder_.Bind(Formlet.LiftResult(formlet1),function(_arg1)
       {
        return _builder_.Bind(Formlet.OfElement(function()
        {
         var title,arg10,arg101,arg102,arg103,arg104,arg105;
         if(_arg1.$==1)
          {
           title=Seq.fold(function(x1)
           {
            return function(y)
            {
             return x1+" "+y;
            };
           },"",_arg1.$0);
           arg101=vic.ErrorIconClass;
           arg10=List.ofArray([Attr.Attr().NewAttr("class",arg101),Attr.Attr().NewAttr("title",title)]);
           arg102=Runtime.New(T,{
            $:0
           });
           return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Tags.Tags().NewTag("div",arg102)]));
          }
         else
          {
           arg104=vic.ValidIconClass;
           arg103=List.ofArray([Attr.Attr().NewAttr("class",arg104),Attr.Attr().NewAttr("title","")]);
           arg105=Runtime.New(T,{
            $:0
           });
           return Operators.add(Tags.Tags().NewTag("div",arg103),List.ofArray([Tags.Tags().NewTag("div",arg105)]));
          }
        }),function()
        {
         return _builder_.Return(_arg1);
        });
       });
      }));
      return Formlet.WithLayout(Data.Layout().get_Horizontal(),x);
     },
     WithErrorFormlet:function(f,formlet)
     {
      var _builder_;
      _builder_=Formlet.Do();
      return Formlet.MapResult(function(arg00)
      {
       return Result.Join(arg00);
      },_builder_.Delay(function()
      {
       return _builder_.Bind(Formlet.LiftResult(formlet),function(_arg1)
       {
        var _,msgs,_builder_1;
        if(_arg1.$==1)
         {
          msgs=_arg1.$0;
          _builder_1=Formlet.Do();
          _=_builder_1.Delay(function()
          {
           return _builder_1.Bind(f(msgs),function()
           {
            return _builder_1.Return(_arg1);
           });
          });
         }
        else
         {
          _=Formlet.Return(_arg1);
         }
        return _builder_.ReturnFrom(_);
       });
      }));
     },
     WithErrorSummary:function(label,formlet)
     {
      var _builder_;
      _builder_=Formlet.Do();
      return Formlet.MapResult(function(arg00)
      {
       return Result.Join(arg00);
      },_builder_.Delay(function()
      {
       return _builder_.Bind(Formlet.LiftResult(formlet),function(_arg1)
       {
        var _,fs;
        if(_arg1.$==1)
         {
          fs=_arg1.$0;
          _=Formlet.Map(function()
          {
           return _arg1;
          },Formlet.OfElement(function()
          {
           var arg10,arg101,x;
           arg101=List.ofArray([Tags.Tags().text(label)]);
           x=List.map(function(f)
           {
            var arg102;
            arg102=List.ofArray([Tags.Tags().text(f)]);
            return Tags.Tags().NewTag("li",arg102);
           },fs);
           arg10=List.ofArray([Tags.Tags().NewTag("legend",arg101),Tags.Tags().NewTag("ul",x)]);
           return Tags.Tags().NewTag("fieldset",arg10);
          }));
         }
        else
         {
          _=Formlet.Return(_arg1);
         }
        return _builder_.ReturnFrom(_);
       });
      }));
     },
     WithFormContainer:function(formlet)
     {
      return Enhance.WithCustomFormContainer(FormContainerConfiguration.get_Default(),formlet);
     },
     WithJsonPost:function(conf,formlet)
     {
      var matchValue,postUrl,arg10,matchValue1,enc,arg101,_this,arg102,arg103,hiddenField,_this1,arg104,submitButton,formAttrs,x,arg105;
      matchValue=conf.PostUrl;
      if(matchValue.$==0)
       {
        postUrl=Runtime.New(T,{
         $:0
        });
       }
      else
       {
        arg10=matchValue.$0;
        postUrl=List.ofArray([Attr.Attr().NewAttr("action",arg10)]);
       }
      matchValue1=conf.EncodingType;
      if(matchValue1.$==0)
       {
        enc=Runtime.New(T,{
         $:0
        });
       }
      else
       {
        arg101=matchValue1.$0;
        enc=List.ofArray([Attr.Attr().NewAttr("enctype",arg101)]);
       }
      _this=Tags.Tags();
      arg103=conf.ParameterName;
      arg102=List.ofArray([Attr.Attr().NewAttr("type","hidden"),Attr.Attr().NewAttr("name",arg103)]);
      hiddenField=_this.NewTag("input",arg102);
      _this1=Tags.Tags();
      arg104=List.ofArray([Attr.Attr().NewAttr("type","submit"),Attr.Attr().NewAttr("value","Submit")]);
      submitButton=_this1.NewTag("input",arg104);
      formAttrs=List.append(Runtime.New(T,{
       $:1,
       $0:Attr.Attr().NewAttr("method","POST"),
       $1:Runtime.New(T,{
        $:1,
        $0:Attr.Attr().NewAttr("style","display:none"),
        $1:postUrl
       })
      }),enc);
      x=Operators.add(Tags.Tags().NewTag("form",formAttrs),List.ofArray([hiddenField,submitButton]));
      Operators.OnAfterRender(function(form)
      {
       var matchValue2;
       matchValue2=conf.EncodingType;
       return matchValue2.$==0?null:matchValue2.$0==="multipart/form-data"?void jQuery(form.get_Body()).attr("encoding","multipart/form-data"):null;
      },x);
      arg105=List.ofArray([x,Formlet.Map(function(value)
      {
       var data;
       data=JSON.stringify(value);
       jQuery(hiddenField.get_Body()).val(data);
       return jQuery(submitButton.get_Body()).click();
      },formlet)]);
      return Tags.Tags().NewTag("div",arg105);
     },
     WithLabel:function(labelGen,formlet)
     {
      return Formlet.WithLabel({
       $:1,
       $0:labelGen
      },formlet);
     },
     WithLabelAbove:function(formlet)
     {
      return Formlet.MapBody(function(body)
      {
       var matchValue,label,arg10,arg101,arg102,arg103,arg104,arg105,arg106;
       matchValue=body.Label;
       if(matchValue.$==0)
        {
         arg10=Runtime.New(T,{
          $:0
         });
         label=Tags.Tags().NewTag("span",arg10);
        }
       else
        {
         label=matchValue.$0.call(null,null);
        }
       arg104=List.ofArray([label]);
       arg103=List.ofArray([Tags.Tags().NewTag("td",arg104)]);
       arg106=List.ofArray([body.Element]);
       arg105=List.ofArray([Tags.Tags().NewTag("td",arg106)]);
       arg102=List.ofArray([Tags.Tags().NewTag("tr",arg103),Tags.Tags().NewTag("tr",arg105)]);
       arg101=List.ofArray([Tags.Tags().NewTag("tbody",arg102)]);
       return Runtime.New(Body,{
        Element:Tags.Tags().NewTag("table",arg101),
        Label:{
         $:0
        }
       });
      },formlet);
     },
     WithLabelAndInfo:function(label,info,formlet)
     {
      return Enhance.WithLabel(function()
      {
       var arg10,arg101;
       arg10=List.ofArray([Tags.Tags().text(label)]);
       arg101=List.ofArray([Attr.Attr().NewAttr("title",info),Attr.Attr().NewAttr("class","infoIcon")]);
       return Utils.InTable(List.ofArray([List.ofArray([Tags.Tags().NewTag("label",arg10),Tags.Tags().NewTag("span",arg101)])]));
      },formlet);
     },
     WithLabelConfiguration:function(lc,formlet)
     {
      var formlet1;
      formlet1=Formlet.ApplyLayout(formlet);
      return Formlet.WithLayout(Data.Layout().LabelLayout(lc),formlet1);
     },
     WithLabelLeft:function(formlet)
     {
      return Formlet.MapBody(function(body)
      {
       var matchValue,label,arg10,arg101,arg102,arg103,arg104,arg105;
       matchValue=body.Label;
       if(matchValue.$==0)
        {
         arg10=Runtime.New(T,{
          $:0
         });
         label=Tags.Tags().NewTag("span",arg10);
        }
       else
        {
         label=matchValue.$0.call(null,null);
        }
       arg104=List.ofArray([body.Element]);
       arg105=List.ofArray([label]);
       arg103=List.ofArray([Tags.Tags().NewTag("td",arg104),Tags.Tags().NewTag("td",arg105)]);
       arg102=List.ofArray([Tags.Tags().NewTag("tr",arg103)]);
       arg101=List.ofArray([Tags.Tags().NewTag("tbody",arg102)]);
       return Runtime.New(Body,{
        Element:Tags.Tags().NewTag("table",arg101),
        Label:{
         $:0
        }
       });
      },formlet);
     },
     WithLegend:function(label,formlet)
     {
      return Formlet.MapBody(function(body)
      {
       var arg10,arg101,matchValue;
       arg101=List.ofArray([Tags.Tags().text(label)]);
       matchValue=body.Label;
       arg10=List.ofArray([Tags.Tags().NewTag("legend",arg101),matchValue.$==0?body.Element:Utils.InTable(List.ofArray([List.ofArray([matchValue.$0.call(null,null),body.Element])]))]);
       return Runtime.New(Body,{
        Element:Tags.Tags().NewTag("fieldset",arg10),
        Label:{
         $:0
        }
       });
      },formlet);
     },
     WithResetAction:function(f,formlet)
     {
      var formlet1;
      formlet1=Formlet.New(function()
      {
       var form;
       form=formlet.Build();
       return Runtime.New(Form,{
        Body:form.Body,
        Dispose1:form.Dispose1,
        Notify:function(o)
        {
         return f(null)?form.Notify.call(null,o):null;
        },
        State:form.State
       });
      });
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Formlet.WithLayout(formlet.get_Layout(),formlet1)));
     },
     WithResetButton:function(formlet)
     {
      return Enhance.WithCustomResetButton(FormButtonConfiguration.get_Default(),formlet);
     },
     WithResetFormlet:function(formlet,reset)
     {
      var formlet1,x,formlet2,button,_builder_;
      formlet1=Formlet.InitWithFailure(Formlet.ApplyLayout(Formlet.WithLayoutOrDefault(formlet)));
      x=Formlet.LiftResult(formlet1);
      formlet2=Formlet.WithNotificationChannel(x);
      button=Formlet.LiftResult(reset);
      _builder_=Formlet.Do();
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet2,Formlet.MapResult(function(arg00)
      {
       return Result.Join(arg00);
      },_builder_.Delay(function()
      {
       return _builder_.Bind(formlet2,function(_arg1)
       {
        var v,notify;
        v=_arg1[0];
        notify=_arg1[1];
        return _builder_.Bind(button,function(_arg2)
        {
         if(_arg2.$==0)
          {
           notify(null);
          }
         return _builder_.Return(v);
        });
       });
      }))));
     },
     WithRowConfiguration:function(rc,formlet)
     {
      var formlet1;
      formlet1=Formlet.ApplyLayout(formlet);
      return Formlet.WithLayout(Data.Layout().RowLayout(rc),formlet1);
     },
     WithSubmitAndReset:function(formlet,submReset)
     {
      var _builder_;
      _builder_=Formlet.Do();
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,_builder_.Delay(function()
      {
       return _builder_.Bind(Formlet.WithNotificationChannel(Formlet.LiftResult(Formlet.InitWithFailure(formlet))),function(_arg1)
       {
        var res,notify;
        res=_arg1[0];
        notify=_arg1[1];
        return _builder_.ReturnFrom((submReset(function(arg00)
        {
         return notify(arg00);
        }))(res));
       });
      })));
     },
     WithSubmitAndResetButtons:function(formlet)
     {
      var inputRecord,submitConf,inputRecord1;
      inputRecord=FormButtonConfiguration.get_Default();
      submitConf=Runtime.New(FormButtonConfiguration,{
       Label:{
        $:1,
        $0:"Submit"
       },
       Style:inputRecord.Style,
       Class:inputRecord.Class
      });
      inputRecord1=FormButtonConfiguration.get_Default();
      return Enhance.WithCustomSubmitAndResetButtons(submitConf,Runtime.New(FormButtonConfiguration,{
       Label:{
        $:1,
        $0:"Reset"
       },
       Style:inputRecord1.Style,
       Class:inputRecord1.Class
      }),formlet);
     },
     WithSubmitButton:function(formlet)
     {
      return Enhance.WithCustomSubmitButton(FormButtonConfiguration.get_Default(),formlet);
     },
     WithSubmitFormlet:function(formlet,submit)
     {
      var _builder_;
      _builder_=Formlet.Do();
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Formlet.MapResult(function(arg00)
      {
       return Result.Join(arg00);
      },_builder_.Delay(function()
      {
       return _builder_.Bind(Formlet.LiftResult(Formlet.InitWithFailure(formlet)),function(_arg1)
       {
        return _builder_.Bind(submit(_arg1),function()
        {
         return _builder_.Return(_arg1);
        });
       });
      }))));
     },
     WithTextLabel:function(label,formlet)
     {
      return Enhance.WithLabel(function()
      {
       var arg10;
       arg10=List.ofArray([Tags.Tags().text(label)]);
       return Tags.Tags().NewTag("label",arg10);
      },formlet);
     },
     WithValidationFrame:function(formlet)
     {
      return Enhance.WithCustomValidationFrame(ValidationFrameConfiguration.get_Default(),formlet);
     },
     WithValidationIcon:function(formlet)
     {
      return Enhance.WithCustomValidationIcon(ValidationIconConfiguration.get_Default(),formlet);
     },
     WrapFormlet:function(wrapper,formlet)
     {
      return Data.MkFormlet(function()
      {
       var formlet1,form,body;
       formlet1=Formlet.WithLayoutOrDefault(formlet);
       form=Formlet.BuildForm(formlet1);
       body=formlet1.get_Layout().Apply.call(null,form.Body).$0[0];
       return[(wrapper(form.State))(body),function()
       {
        return form.Notify.call(null,null);
       },form.State];
      });
     }
    },
    Formlet:{
     ApplyLayout:function(formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().ApplyLayout(formlet)));
     },
     Bind:function(fl,f)
     {
      var arg10;
      arg10=function(x)
      {
       return f(x);
      };
      return Data.OfIFormlet(Data.PropagateRenderFrom(fl,Data.BaseFormlet().Bind(fl,arg10)));
     },
     BindWith:function(compose,formlet,f)
     {
      var arg20;
      arg20=function(x)
      {
       return f(x);
      };
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().BindWith(compose,formlet,arg20)));
     },
     BuildForm:function(f)
     {
      return Data.BaseFormlet().BuildForm(f);
     },
     BuildFormlet:function(f)
     {
      return Data.MkFormlet(f);
     },
     Choose:function(fs)
     {
      var count,fs1,formlet,x1,arg00;
      count=[0];
      fs1=Seq.map(function(f)
      {
       return Formlet.LiftResult(Formlet.InitWithFailure(Formlet.Map(function(x)
       {
        Ref.incr(count);
        return[x,count[0]];
       },f)));
      },fs);
      formlet=Formlet.Sequence(fs1);
      x1=Formlet.Map(function(xs)
      {
       return Seq.tryPick(function(tupledArg)
       {
        return{
         $:1,
         $0:tupledArg[0]
        };
       },List.rev(List.sortBy(function(tupledArg)
       {
        return tupledArg[1];
       },List.choose(function(x)
       {
        return x.$==0?{
         $:1,
         $0:x.$0
        }:{
         $:0
        };
       },xs))));
      },formlet);
      arg00=function(x)
      {
       return x.$==1;
      };
      return Formlet.Map(function(x)
      {
       return x.$0;
      },Data.Validator().Is(arg00,"",x1));
     },
     Delay:function(f)
     {
      return Data.OfIFormlet(Data.BaseFormlet().Delay(function()
      {
       return f(null);
      }));
     },
     Deletable:function(formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().Deletable(formlet)));
     },
     Do:Runtime.Field(function()
     {
      return FormletBuilder.New();
     }),
     Empty:function()
     {
      return Data.OfIFormlet(Data.BaseFormlet().Empty());
     },
     FailWith:function(fs)
     {
      return Data.OfIFormlet(Data.BaseFormlet().FailWith(fs));
     },
     FlipBody:function(formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().FlipBody(formlet)));
     },
     Flowlet:function(formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithLayout(Data.Layout().get_Flowlet(),formlet)));
     },
     Horizontal:function(formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithLayout(Data.Layout().get_Horizontal(),formlet)));
     },
     InitWith:function(value,formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().InitWith(value,formlet)));
     },
     InitWithFailure:function(formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().InitWithFailure(formlet)));
     },
     Join:function(formlet)
     {
      var x;
      x=Formlet.Map(function(f)
      {
       return f;
      },formlet);
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().Join(x)));
     },
     LiftResult:function(formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().LiftResult(formlet)));
     },
     Map:function(f,formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().Map(f,formlet)));
     },
     MapBody:function(f,formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().MapBody(f,formlet)));
     },
     MapElement:function(f,formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().MapBody(function(b)
      {
       return Runtime.New(Body,{
        Element:f(b.Element),
        Label:b.Label
       });
      },formlet)));
     },
     MapResult:function(f,formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().MapResult(f,formlet)));
     },
     Never:function()
     {
      return Data.OfIFormlet(Data.BaseFormlet().Never());
     },
     New:function(f)
     {
      return Data.OfIFormlet(Data.BaseFormlet().New(f));
     },
     OfElement:function(genElem)
     {
      return Data.MkFormlet(function()
      {
       return[genElem(null),function()
       {
       },Data.RX().Return(Runtime.New(Result,{
        $:0,
        $0:null
       }))];
      });
     },
     Render:function(formlet)
     {
      return Data.PropagateRenderFrom(formlet,formlet.Run(function()
      {
      }));
     },
     Replace:function(formlet,f)
     {
      var arg10;
      arg10=function(x)
      {
       return f(x);
      };
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().Replace(formlet,arg10)));
     },
     ReplaceFirstWithFailure:function(formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().ReplaceFirstWithFailure(formlet)));
     },
     Return:function(x)
     {
      return Data.OfIFormlet(Data.BaseFormlet().Return(x));
     },
     ReturnEmpty:function(x)
     {
      return Data.OfIFormlet(Data.BaseFormlet().ReturnEmpty(x));
     },
     Run:function(f,formlet)
     {
      return formlet.Run(f);
     },
     SelectMany:function(formlet)
     {
      var x;
      x=Formlet.Map(function(f)
      {
       return f;
      },formlet);
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().SelectMany(x)));
     },
     Sequence:function(fs)
     {
      var x;
      x=Seq.map(function(x1)
      {
       return x1;
      },fs);
      return Data.OfIFormlet(Data.BaseFormlet().Sequence(x));
     },
     Switch:function(formlet)
     {
      var x;
      x=Formlet.Map(function(f)
      {
       return f;
      },formlet);
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().Switch(x)));
     },
     Vertical:function(formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithLayout(Data.Layout().get_Vertical(),formlet)));
     },
     WithCancelation:function(formlet,c)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithCancelation(formlet,c)));
     },
     WithLabel:function(label,formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().MapBody(function(body)
      {
       return Runtime.New(Body,{
        Element:body.Element,
        Label:label
       });
      },formlet)));
     },
     WithLayout:function(l,formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithLayout(l,formlet)));
     },
     WithLayoutOrDefault:function(formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithLayoutOrDefault(formlet)));
     },
     WithNotification:function(c,formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithNotification(c,formlet)));
     },
     WithNotificationChannel:function(formlet)
     {
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithNotificationChannel(formlet)));
     }
    },
    FormletBuilder:Runtime.Class({
     Bind:function(formlet,f)
     {
      var arg10;
      arg10=function(x)
      {
       return f(x);
      };
      return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().Bind(formlet,arg10)));
     },
     Delay:function(f)
     {
      return Data.OfIFormlet(Data.BaseFormlet().Delay(function(x)
      {
       return f(x);
      }));
     },
     Return:function(x)
     {
      return Data.OfIFormlet(Data.BaseFormlet().Return(x));
     },
     ReturnFrom:function(f)
     {
      return Data.OfIFormlet(f);
     }
    },{
     New:function()
     {
      return Runtime.New(this,{});
     }
    }),
    Layout:{
     FormRowConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(FormRowConfiguration,{
        Padding:{
         $:0
        },
        Color:{
         $:0
        },
        Class:{
         $:0
        },
        Style:{
         $:0
        },
        LabelConfiguration:{
         $:0
        }
       });
      }
     }),
     LabelConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(LabelConfiguration,{
        Align:{
         $:0
        },
        VerticalAlign:{
         $:1
        },
        Placement:{
         $:0
        }
       });
      }
     }),
     Padding:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(Padding1,{
        Left:{
         $:0
        },
        Right:{
         $:0
        },
        Top:{
         $:0
        },
        Bottom:{
         $:0
        }
       });
      }
     })
    },
    LayoutProvider:Runtime.Class({
     ColumnLayout:function(rowConfig)
     {
      var objectArg,_this=this;
      objectArg=this.LayoutUtils;
      return objectArg.New(function()
      {
       var x,row,x1,arg10,container,store,insert,remove;
       x=Runtime.New(T,{
        $:0
       });
       row=Tags.Tags().NewTag("tr",x);
       arg10=List.ofArray([row]);
       x1=List.ofArray([Tags.Tags().NewTag("tbody",arg10)]);
       container=Tags.Tags().NewTag("table",x1);
       store=ElementStore.NewElementStore();
       insert=function(rowIx)
       {
        return function(body)
        {
         var elemId,x2,arg101,arg102,newCol,jqPanel,index,inserted;
         elemId=body.Element.get_Id();
         arg102=List.ofArray([_this.MakeRow(rowConfig,rowIx,body)]);
         arg101=List.ofArray([Tags.Tags().NewTag("tbody",arg102)]);
         x2=List.ofArray([Tags.Tags().NewTag("table",arg101)]);
         newCol=Tags.Tags().NewTag("td",x2);
         jqPanel=jQuery(row.get_Body());
         index=[0];
         inserted=[false];
         jqPanel.children().each(function()
         {
          var jqCol;
          jqCol=jQuery(this);
          if(rowIx===index[0])
           {
            jQuery(newCol.get_Body()).insertBefore(jqCol);
            newCol.Render();
            inserted[0]=true;
           }
          return Ref.incr(index);
         });
         if(!inserted[0])
          {
           row.AppendI(newCol);
          }
         return store.RegisterElement(elemId,function()
         {
          return newCol["HtmlProvider@33"].Remove(newCol.get_Body());
         });
        };
       };
       remove=function(elems)
       {
        var enumerator;
        enumerator=Enumerator.Get(elems);
        try
        {
         while(enumerator.MoveNext())
          {
           store.Remove(enumerator.get_Current().Element.get_Id());
          }
         return;
        }
        finally
        {
         if(enumerator.Dispose!=undefined)
          {
           enumerator.Dispose();
          }
        }
       };
       return{
        Body:Runtime.New(Body,{
         Element:container,
         Label:{
          $:0
         }
        }),
        SyncRoot:null,
        Insert:insert,
        Remove:remove
       };
      });
     },
     HorizontalAlignElem:function(align,el)
     {
      var arg10,arg101;
      arg101="float:"+(align.$==0?"left":"right")+";";
      arg10=List.ofArray([Attr.Attr().NewAttr("style",arg101)]);
      return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([el]));
     },
     LabelLayout:function(lc)
     {
      var inputRecord;
      inputRecord=FormRowConfiguration.get_Default();
      return this.RowLayout(Runtime.New(FormRowConfiguration,{
       Padding:inputRecord.Padding,
       Color:inputRecord.Color,
       Class:inputRecord.Class,
       Style:inputRecord.Style,
       LabelConfiguration:{
        $:1,
        $0:lc
       }
      }));
     },
     MakeLayout:function(lm)
     {
      var objectArg;
      objectArg=this.LayoutUtils;
      return objectArg.New(function()
      {
       var lm1,store,insert,remove;
       lm1=lm(null);
       store=ElementStore.NewElementStore();
       insert=function(ix)
       {
        return function(bd)
        {
         var elemId,newElems;
         elemId=bd.Element.get_Id();
         newElems=(lm1.Insert.call(null,ix))(bd);
         return store.RegisterElement(elemId,function()
         {
          var enumerator,e;
          enumerator=Enumerator.Get(newElems);
          try
          {
           while(enumerator.MoveNext())
            {
             e=enumerator.get_Current();
             e["HtmlProvider@33"].Remove(e.get_Body());
            }
           return;
          }
          finally
          {
           if(enumerator.Dispose!=undefined)
            {
             enumerator.Dispose();
            }
          }
         });
        };
       };
       remove=function(elems)
       {
        var enumerator;
        enumerator=Enumerator.Get(elems);
        try
        {
         while(enumerator.MoveNext())
          {
           store.Remove(enumerator.get_Current().Element.get_Id());
          }
         return;
        }
        finally
        {
         if(enumerator.Dispose!=undefined)
          {
           enumerator.Dispose();
          }
        }
       };
       return{
        Body:Runtime.New(Body,{
         Element:lm1.Panel,
         Label:{
          $:0
         }
        }),
        SyncRoot:null,
        Insert:insert,
        Remove:remove
       };
      });
     },
     MakeRow:function(rowConfig,rowIndex,body)
     {
      var x,d,padding,x2,paddingLeft,x3,paddingTop,x4,paddingRight,x5,paddingBottom,makeCell,elem1,matchValue,cells,labelGen,x7,d1,labelConf,x8,arg00,label,matchValue1,x9,xa,xb,d2,rowClass,xc,d3,rowColorStyleProp,xd,d4,matchValue2,rowStyle,arg001,arg102;
      x=rowConfig.Padding;
      d=Padding1.get_Default();
      padding=Utils.Maybe(d,function(x1)
      {
       return x1;
      },x);
      x2=padding.Left;
      paddingLeft=Utils.Maybe(0,function(x1)
      {
       return x1;
      },x2);
      x3=padding.Top;
      paddingTop=Utils.Maybe(0,function(x1)
      {
       return x1;
      },x3);
      x4=padding.Right;
      paddingRight=Utils.Maybe(0,function(x1)
      {
       return x1;
      },x4);
      x5=padding.Bottom;
      paddingBottom=Utils.Maybe(0,function(x1)
      {
       return x1;
      },x5);
      makeCell=function(l)
      {
       return function(t)
       {
        return function(r)
        {
         return function(b)
         {
          return function(csp)
          {
           return function(valign)
           {
            return function(elem)
            {
             var mapping,list,x1,paddingStyle,arg10,arg101;
             mapping=function(tupledArg)
             {
              return tupledArg[0]+Global.String(tupledArg[1])+"px;";
             };
             list=List.ofArray([["padding-left: ",l],["padding-top: ",t],["padding-right: ",r],["padding-bottom: ",b]]);
             x1=List.map(mapping,list);
             paddingStyle=Seq.reduce(function(x6)
             {
              return function(y)
              {
               return x6+y;
              };
             },x1);
             arg10=paddingStyle+";"+Utils.Maybe("",function(valign1)
             {
              return"vertical-align: "+(valign1.$==1?"middle":valign1.$==2?"bottom":"top")+";";
             },valign);
             arg101=List.append(Runtime.New(T,{
              $:1,
              $0:Attr.Attr().NewAttr("style",arg10),
              $1:csp?List.ofArray([Attr.Attr().NewAttr("colspan","2")]):Runtime.New(T,{
               $:0
              })
             }),List.ofArray([elem]));
             return Tags.Tags().NewTag("td",arg101);
            };
           };
          };
         };
        };
       };
      };
      elem1=body.Element;
      matchValue=body.Label;
      if(matchValue.$==1)
       {
        labelGen=matchValue.$0;
        x7=rowConfig.LabelConfiguration;
        d1=LabelConfiguration.get_Default();
        labelConf=Utils.Maybe(d1,function(x1)
        {
         return x1;
        },x7);
        x8=labelGen(null);
        arg00=labelConf.Align;
        label=this.HorizontalAlignElem(arg00,x8);
        matchValue1=labelConf.Placement;
        if(matchValue1.$==3)
         {
          x9=Utils.InTable(List.ofArray([List.ofArray([elem1]),List.ofArray([label])]));
          cells=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(paddingRight))(paddingBottom))(true))({
           $:0
          }))(x9)]);
         }
        else
         {
          if(matchValue1.$==0)
           {
            cells=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(0))(paddingBottom))(false))({
             $:1,
             $0:labelConf.VerticalAlign
            }))(label),((((((makeCell(0))(paddingTop))(paddingRight))(paddingBottom))(false))({
             $:0
            }))(elem1)]);
           }
          else
           {
            if(matchValue1.$==1)
             {
              cells=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(0))(paddingBottom))(false))({
               $:1,
               $0:labelConf.VerticalAlign
              }))(elem1),((((((makeCell(0))(paddingTop))(paddingRight))(paddingBottom))(false))({
               $:0
              }))(label)]);
             }
            else
             {
              xa=Utils.InTable(List.ofArray([List.ofArray([label]),List.ofArray([elem1])]));
              cells=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(paddingRight))(paddingBottom))(true))({
               $:0
              }))(xa)]);
             }
           }
         }
       }
      else
       {
        cells=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(paddingRight))(paddingBottom))(true))({
         $:0
        }))(elem1)]);
       }
      xb=rowConfig.Class;
      d2=Runtime.New(T,{
       $:0
      });
      rowClass=Utils.Maybe(d2,function(classGen)
      {
       var arg10;
       arg10=classGen(rowIndex);
       return List.ofArray([Attr.Attr().NewAttr("class",arg10)]);
      },xb);
      xc=rowConfig.Color;
      d3=Runtime.New(T,{
       $:0
      });
      rowColorStyleProp=Utils.Maybe(d3,function(colGen)
      {
       return List.ofArray(["background-color: "+colGen(rowIndex)]);
      },xc);
      xd=rowConfig.Style;
      d4=Runtime.New(T,{
       $:0
      });
      matchValue2=List.append(rowColorStyleProp,Utils.Maybe(d4,function(styleGen)
      {
       return List.ofArray([styleGen(rowIndex)]);
      },xd));
      if(matchValue2.$==0)
       {
        rowStyle=Runtime.New(T,{
         $:0
        });
       }
      else
       {
        arg001=Seq.reduce(function(x1)
        {
         return function(y)
         {
          return x1+";"+y;
         };
        },matchValue2);
        rowStyle=List.ofArray([Attr.Attr().NewAttr("style",arg001)]);
       }
      arg102=List.append(rowClass,List.append(rowStyle,List.append(rowStyle,cells)));
      return Tags.Tags().NewTag("tr",arg102);
     },
     RowLayout:function(rowConfig)
     {
      var objectArg,_this=this;
      objectArg=this.LayoutUtils;
      return objectArg.New(function()
      {
       var x,panel,x1,container,store,insert,remove;
       x=Runtime.New(T,{
        $:0
       });
       panel=Tags.Tags().NewTag("tbody",x);
       x1=List.ofArray([panel]);
       container=Tags.Tags().NewTag("table",x1);
       store=ElementStore.NewElementStore();
       insert=function(rowIx)
       {
        return function(body)
        {
         var elemId,row,jqPanel,index,inserted;
         elemId=body.Element.get_Id();
         row=_this.MakeRow(rowConfig,rowIx,body);
         jqPanel=jQuery(panel.get_Body());
         index=[0];
         inserted=[false];
         jqPanel.children().each(function()
         {
          var jqRow;
          jqRow=jQuery(this);
          if(rowIx===index[0])
           {
            jQuery(row.get_Body()).insertBefore(jqRow);
            row.Render();
            inserted[0]=true;
           }
          return Ref.incr(index);
         });
         if(!inserted[0])
          {
           panel.AppendI(row);
          }
         return store.RegisterElement(elemId,function()
         {
          return row["HtmlProvider@33"].Remove(row.get_Body());
         });
        };
       };
       remove=function(elems)
       {
        var enumerator;
        enumerator=Enumerator.Get(elems);
        try
        {
         while(enumerator.MoveNext())
          {
           store.Remove(enumerator.get_Current().Element.get_Id());
          }
         return;
        }
        finally
        {
         if(enumerator.Dispose!=undefined)
          {
           enumerator.Dispose();
          }
        }
       };
       return{
        Body:Runtime.New(Body,{
         Element:container,
         Label:{
          $:0
         }
        }),
        SyncRoot:null,
        Insert:insert,
        Remove:remove
       };
      });
     },
     VerticalAlignedTD:function(valign,elem)
     {
      var valign1,arg10,cell;
      valign1=valign.$==1?"middle":valign.$==2?"bottom":"top";
      arg10=List.ofArray([elem]);
      cell=Tags.Tags().NewTag("td",arg10);
      cell["HtmlProvider@33"].SetCss(cell.get_Body(),"vertical-align",valign1);
      return cell;
     },
     get_Flowlet:function()
     {
      return this.MakeLayout(function()
      {
       var x,panel;
       x=Runtime.New(T,{
        $:0
       });
       panel=Tags.Tags().NewTag("div",x);
       return{
        Insert:function()
        {
         return function(bd)
         {
          var nextScreen,_,arg10,arg101;
          if(bd.Label.$==1)
           {
            _=bd.Label.$0.call(null,null);
           }
          else
           {
            arg10=Runtime.New(T,{
             $:0
            });
            _=Tags.Tags().NewTag("span",arg10);
           }
          arg101=List.ofArray([bd.Element]);
          nextScreen=Utils.InTable(List.ofArray([List.ofArray([_,Tags.Tags().NewTag("div",arg101)])]));
          panel["HtmlProvider@33"].Clear(panel.get_Body());
          panel.AppendI(nextScreen);
          return List.ofArray([nextScreen]);
         };
        },
        Panel:panel
       };
      });
     },
     get_Horizontal:function()
     {
      return this.ColumnLayout(FormRowConfiguration.get_Default());
     },
     get_Vertical:function()
     {
      return this.RowLayout(FormRowConfiguration.get_Default());
     }
    },{
     New:function(LayoutUtils1)
     {
      var r;
      r=Runtime.New(this,{});
      r.LayoutUtils=LayoutUtils1;
      return r;
     }
    }),
    Utils:{
     InTable:function(rows)
     {
      var rs,arg101;
      rs=List.map(function(cols)
      {
       var xs;
       xs=List.map(function(c)
       {
        var arg10;
        arg10=List.ofArray([c]);
        return Tags.Tags().NewTag("td",arg10);
       },cols);
       return Tags.Tags().NewTag("tr",xs);
      },rows);
      arg101=List.ofArray([Tags.Tags().NewTag("tbody",rs)]);
      return Tags.Tags().NewTag("table",arg101);
     },
     MapOption:function(f,value)
     {
      return value.$==1?{
       $:1,
       $0:f(value.$0)
      }:{
       $:0
      };
     },
     Maybe:function(d,f,o)
     {
      return o.$==0?d:f(o.$0);
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Formlets=Runtime.Safe(Global.WebSharper.Formlets);
  Body=Runtime.Safe(Formlets.Body);
  Controls=Runtime.Safe(Formlets.Controls);
  List=Runtime.Safe(Global.WebSharper.List);
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Tags=Runtime.Safe(Client.Tags);
  Data=Runtime.Safe(Formlets.Data);
  IntelliFactory=Runtime.Safe(Global.IntelliFactory);
  Reactive=Runtime.Safe(IntelliFactory.Reactive);
  HotStream=Runtime.Safe(Reactive.HotStream);
  Formlets1=Runtime.Safe(IntelliFactory.Formlets);
  Base=Runtime.Safe(Formlets1.Base);
  Result=Runtime.Safe(Base.Result);
  Attr=Runtime.Safe(Client.Attr);
  T=Runtime.Safe(List.T);
  Operators=Runtime.Safe(Client.Operators);
  jQuery=Runtime.Safe(Global.jQuery);
  EventsPervasives=Runtime.Safe(Client.EventsPervasives);
  Formlet=Runtime.Safe(Formlets.Formlet);
  Ref=Runtime.Safe(Global.WebSharper.Ref);
  CssConstants=Runtime.Safe(Formlets.CssConstants);
  Math=Runtime.Safe(Global.Math);
  Seq=Runtime.Safe(Global.WebSharper.Seq);
  Utils=Runtime.Safe(Formlets.Utils);
  Tree=Runtime.Safe(Base.Tree);
  Edit=Runtime.Safe(Tree.Edit);
  Form=Runtime.Safe(Base.Form);
  Arrays=Runtime.Safe(Global.WebSharper.Arrays);
  FormletProvider=Runtime.Safe(Base.FormletProvider);
  Formlet1=Runtime.Safe(Data.Formlet);
  Pagelet=Runtime.Safe(Client.Pagelet);
  Util=Runtime.Safe(Global.WebSharper.Util);
  LayoutProvider=Runtime.Safe(Formlets.LayoutProvider);
  LayoutUtils=Runtime.Safe(Base.LayoutUtils);
  Reactive1=Runtime.Safe(Reactive.Reactive);
  Validator=Runtime.Safe(Base.Validator);
  ValidatorProvidor=Runtime.Safe(Data.ValidatorProvidor);
  RegExp=Runtime.Safe(Global.RegExp);
  Collections=Runtime.Safe(Global.WebSharper.Collections);
  Dictionary=Runtime.Safe(Collections.Dictionary);
  ElementStore=Runtime.Safe(Formlets.ElementStore);
  Enhance=Runtime.Safe(Formlets.Enhance);
  FormButtonConfiguration=Runtime.Safe(Enhance.FormButtonConfiguration);
  FormContainerConfiguration=Runtime.Safe(Enhance.FormContainerConfiguration);
  Padding=Runtime.Safe(Enhance.Padding);
  ManyConfiguration=Runtime.Safe(Enhance.ManyConfiguration);
  ValidationFrameConfiguration=Runtime.Safe(Enhance.ValidationFrameConfiguration);
  ValidationIconConfiguration=Runtime.Safe(Enhance.ValidationIconConfiguration);
  JSON=Runtime.Safe(Global.JSON);
  FormletBuilder=Runtime.Safe(Formlets.FormletBuilder);
  Layout=Runtime.Safe(Formlets.Layout);
  FormRowConfiguration=Runtime.Safe(Layout.FormRowConfiguration);
  LabelConfiguration=Runtime.Safe(Layout.LabelConfiguration);
  Padding1=Runtime.Safe(Layout.Padding);
  return Enumerator=Runtime.Safe(Global.WebSharper.Enumerator);
 });
 Runtime.OnLoad(function()
 {
  Runtime.Inherit(Formlet1,Pagelet);
  Formlet.Do();
  Data.Validator();
  Data.RX();
  Data.Layout();
  Data.DefaultLayout();
  CssConstants.InputTextClass();
  return;
 });
}());
