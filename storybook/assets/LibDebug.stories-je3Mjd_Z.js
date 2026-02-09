import{c as t}from"./LibRoot-CpCGCbRj.js";import{c as o,i as m}from"./index-Cu-gwfJh.js";import"./vue.esm-bundler-D34C2Wlw.js";import"./iframe-Rr6GslXv.js";import"./twMerge-BZGhTDWl.js";const g={component:m,title:"Components/Debug",args:{value:{any:["any",{value:"any"}]}}},a={render:s=>({components:o,setup:()=>({args:s}),template:`
            <lib-debug v-bind="args" />
        `})},r={...a,args:{...a.args,value:{any:["any",{value:"any"}]},tab:2}},e={...a,args:{...a.args,value:void 0}},n={...a,args:{...a.args,value:t`
            Manually
                Indented
                    String
        `}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => ({
      args
    }),
    template: \`
            <lib-debug v-bind="args" />
        \`
  })
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    value: {
      any: ["any", {
        value: "any"
      }]
    },
    tab: 2
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    value: undefined
  }
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    value: crop\`
            Manually
                Indented
                    String
        \`
  }
}`,...n.parameters?.docs?.source}}};const l=["Primary","WithCustomTab","NoValue","StringWithWhitespace"];export{e as NoValue,a as Primary,n as StringWithWhitespace,r as WithCustomTab,l as __namedExportsOrder,g as default};
