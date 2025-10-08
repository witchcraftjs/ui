import{a as m,N as l}from"./LibRoot-CoN-ifen.js";import{c as u}from"./index-D2G9LM0b.js";import"./vue.esm-bundler-BHVC7zIi.js";import"./iframe-BSTD6wzt.js";import"./twMerge-CudCRF6p.js";const r=new l,P={component:m,title:"Components/Notification",args:{}},n={render:g=>({components:{...u,LibNotification:m},setup(){return{args:g}},backgrounds:{disable:!0},template:`
            <lib-notification v-bind="args"/>
        `}),args:{notification:{...r._createEntry({title:"Notification",message:"This is a notification. Pick an option:"}),resolve:()=>{}}}},a={...n,args:{...n.args,notification:r._createEntry({...n.args.notification,title:void 0})}},o={...n,args:{...n.args,notification:r._createEntry({...n.args.notification,code:"0001"})}},i={...n,args:{...n.args,notification:r._createEntry({...n.args.notification,requiresAction:!0})}},e={...n,args:{...n.args,notification:r._createEntry({...n.args.notification,options:["Ok"],cancellable:!1})}},t={...n,args:{...n.args,notification:r._createEntry({...n.args.notification,options:["Ok","Default Answer","Cancel"]})}},s={...n,args:{...n.args,notification:r._createEntry({...t.args.notification,default:"Default Answer"})}},c={...n,args:{...n.args,notification:r._createEntry({...t.args.notification,options:["Ok","Dangerous Option","Cancel"],dangerous:["Dangerous Option"]})}},p={...n,args:{...n.args,notification:r._createEntry({...t.args.notification,options:["Ok","Default Answer","Dangerous Option","Cancel"],default:"Default Answer",dangerous:["Dangerous Option"]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
      resolve: () => {}
    }
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error calling protected method
    notification: handler._createEntry({
      ...Primary.args!.notification,
      title: undefined
    })
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error calling protected method
    notification: handler._createEntry({
      ...Primary.args!.notification,
      code: "0001"
    })
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error calling protected method
    notification: handler._createEntry({
      ...Primary.args!.notification,
      requiresAction: true
    })
  }
}`,...i.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source},description:{story:"Should not have cancel cross in top corner.",...e.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error calling protected method
    notification: handler._createEntry({
      ...Primary.args!.notification,
      options: ["Ok", "Default Answer", "Cancel"]
    })
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error calling protected method
    notification: handler._createEntry({
      ...CustomOptions.args!.notification,
      default: "Default Answer"
    })
  }
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};const D=["Primary","WithoutTitle","WithCode","RequiresAction","Uncancellable","CustomOptions","CustomDefaultOption","CustomDangerousOption","CustomDefaultAndDangerousOption"];export{c as CustomDangerousOption,p as CustomDefaultAndDangerousOption,s as CustomDefaultOption,t as CustomOptions,n as Primary,i as RequiresAction,e as Uncancellable,o as WithCode,a as WithoutTitle,D as __namedExportsOrder,P as default};
