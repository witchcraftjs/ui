import{c as t}from"./LibRoot-CoN-ifen.js";import{i as o,c as m}from"./index-D2G9LM0b.js";import"./vue.esm-bundler-BHVC7zIi.js";import"./iframe-BSTD6wzt.js";import"./twMerge-CudCRF6p.js";const g={component:o,title:"Components/Debug",args:{value:{any:["any",{value:"any"}]}}},a={render:s=>({components:m,setup:()=>({args:s}),template:`
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
