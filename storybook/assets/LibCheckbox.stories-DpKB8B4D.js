import{_ as o,c as s}from"./index-CPjZL_cd.js";import"./vue.esm-bundler-B4I_ujvT.js";import"./LibRoot-WN0KOPQ5.js";import"./iframe-DFGok_fB.js";import"./twMerge-CudCRF6p.js";const d={component:o,title:"Components/Checkbox",args:{modelValue:!0,label:"Label"}},e={render:r=>({components:s,setup:()=>({args:r}),template:`
            <lib-checkbox v-bind="args" v-model="args.modelValue"></lib-checkbox>
            <br>
            Opposite State:
            <br>
            <lib-checkbox v-bind="args" :modelValue="!args.modelValue" @update:modelValue="args.modelValue = !$event"></lib-checkbox>
        `})},a={...e,args:{disabled:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => ({
      args
    }),
    template: \`
            <lib-checkbox v-bind="args" v-model="args.modelValue"></lib-checkbox>
            <br>
            Opposite State:
            <br>
            <lib-checkbox v-bind="args" :modelValue="!args.modelValue" @update:modelValue="args.modelValue = !$event"></lib-checkbox>
        \`
  })
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    disabled: true
  }
}`,...a.parameters?.docs?.source}}};const i=["Primary","Disabled"];export{a as Disabled,e as Primary,i as __namedExportsOrder,d as default};
