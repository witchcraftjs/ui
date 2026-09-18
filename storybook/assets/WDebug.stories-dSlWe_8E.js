import{x as o}from"./WRoot-BpJCm3EK.js";import{eK as t,dN as m}from"./index-DpJYLACx.js";import"./vue.esm-bundler-AO_tuUZ6.js";import"./iframe-D0W54ZZL.js";import"./twMerge-CaMoglCM.js";const d={component:m,title:"Components/Debug",args:{value:{any:["any",{value:"any"}]}}},a={render:s=>({components:t,setup:()=>({args:s}),template:`
            <WDebug v-bind="args" />
        `})},r={...a,args:{...a.args,value:{any:["any",{value:"any"}]},tab:2}},e={...a,args:{...a.args,value:void 0}},n={...a,args:{...a.args,value:o`
            Manually
                Indented
                    String
        `}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: components as any,
    setup: () => ({
      args
    }),
    template: \`
            <WDebug v-bind="args" />
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
}`,...n.parameters?.docs?.source}}};const l=["Primary","WithCustomTab","NoValue","StringWithWhitespace"];export{e as NoValue,a as Primary,n as StringWithWhitespace,r as WithCustomTab,l as __namedExportsOrder,d as default};
