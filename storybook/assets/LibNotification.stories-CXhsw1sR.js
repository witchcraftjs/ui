import{n as j,N as B,c as F}from"./index-nZYlgcY9.js";import"./vue.esm-bundler-Cybg3BJD.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const r=new B,Q={component:j,title:"Components/Notification",args:{}},n={render:z=>({components:{...F,LibNotification:j},setup(){return{args:z}},backgrounds:{disable:!0},template:`
            <lib-notification v-bind="args"/>
        `}),args:{notification:{...r._createEntry({title:"Notification",message:"This is a notification. Pick an option:"}),resolve:()=>{}}}},a={...n,args:{...n.args,notification:r._createEntry({...n.args.notification,title:void 0})}},o={...n,args:{...n.args,notification:r._createEntry({...n.args.notification,code:"0001"})}},i={...n,args:{...n.args,notification:r._createEntry({...n.args.notification,requiresAction:!0})}},e={...n,args:{...n.args,notification:r._createEntry({...n.args.notification,options:["Ok"],cancellable:!1})}},t={...n,args:{...n.args,notification:r._createEntry({...n.args.notification,options:["Ok","Default Answer","Cancel"]})}},s={...n,args:{...n.args,notification:r._createEntry({...t.args.notification,default:"Default Answer"})}},c={...n,args:{...n.args,notification:r._createEntry({...t.args.notification,options:["Ok","Dangerous Option","Cancel"],dangerous:["Dangerous Option"]})}},p={...n,args:{...n.args,notification:r._createEntry({...t.args.notification,options:["Ok","Default Answer","Dangerous Option","Cancel"],default:"Default Answer",dangerous:["Dangerous Option"]})}};var m,l,g;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => ({
    components: {
      ...components,
      LibNotification
    },
    setup() {
      return {
        args
      };
    },
    backgrounds: {
      disable: true
    },
    template: \`
            <lib-notification v-bind="args"/>
        \`
  }),
  args: {
    // @ts-expect-error calling protected method
    notification: {
      ...handler._createEntry({
        title: \`Notification\`,
        message: \`This is a notification. Pick an option:\`
      }),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      resolve: () => {}
    }
  }
}`,...(g=(l=n.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var u,d,f;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error calling protected method
    notification: handler._createEntry({
      ...Primary.args!.notification,
      title: undefined
    })
  }
}`,...(f=(d=a.parameters)==null?void 0:d.docs)==null?void 0:f.source}}};var y,O,h;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error calling protected method
    notification: handler._createEntry({
      ...Primary.args!.notification,
      code: "0001"
    })
  }
}`,...(h=(O=o.parameters)==null?void 0:O.docs)==null?void 0:h.source}}};var P,D,_;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error calling protected method
    notification: handler._createEntry({
      ...Primary.args!.notification,
      requiresAction: true
    })
  }
}`,...(_=(D=i.parameters)==null?void 0:D.docs)==null?void 0:_.source}}};var C,E,b,A,k;e.parameters={...e.parameters,docs:{...(C=e.parameters)==null?void 0:C.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error calling protected method
    notification: handler._createEntry({
      ...Primary.args!.notification,
      options: ["Ok"],
      cancellable: false
    })
  }
}`,...(b=(E=e.parameters)==null?void 0:E.docs)==null?void 0:b.source},description:{story:"Should not have cancel cross in top corner.",...(k=(A=e.parameters)==null?void 0:A.docs)==null?void 0:k.description}}};var x,S,w;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error calling protected method
    notification: handler._createEntry({
      ...Primary.args!.notification,
      options: ["Ok", "Default Answer", "Cancel"]
    })
  }
}`,...(w=(S=t.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var N,v,q;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error calling protected method
    notification: handler._createEntry({
      ...CustomOptions.args!.notification,
      default: "Default Answer"
    })
  }
}`,...(q=(v=s.parameters)==null?void 0:v.docs)==null?void 0:q.source}}};var T,W,L;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error calling protected method
    notification: handler._createEntry({
      ...CustomOptions.args!.notification,
      options: ["Ok", "Dangerous Option", "Cancel"],
      dangerous: ["Dangerous Option"]
    })
  }
}`,...(L=(W=c.parameters)==null?void 0:W.docs)==null?void 0:L.source}}};var R,U,H;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error calling protected method
    notification: handler._createEntry({
      ...CustomOptions.args!.notification,
      options: ["Ok", "Default Answer", "Dangerous Option", "Cancel"],
      default: "Default Answer",
      dangerous: ["Dangerous Option"]
    })
  }
}`,...(H=(U=p.parameters)==null?void 0:U.docs)==null?void 0:H.source}}};const V=["Primary","WithoutTitle","WithCode","RequiresAction","Uncancellable","CustomOptions","CustomDefaultOption","CustomDangerousOption","CustomDefaultAndDangerousOption"];export{c as CustomDangerousOption,p as CustomDefaultAndDangerousOption,s as CustomDefaultOption,t as CustomOptions,n as Primary,i as RequiresAction,e as Uncancellable,o as WithCode,a as WithoutTitle,V as __namedExportsOrder,Q as default};
