import{_ as c,c as d}from"./index-nZYlgcY9.js";import"./vue.esm-bundler-Cybg3BJD.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const x={component:c,title:"Components/Checkbox",args:{modelValue:!0,label:"Label"}},e={render:m=>({components:d,setup:()=>({args:m}),template:`
            <lib-checkbox v-bind="args" v-model="args.modelValue"></lib-checkbox>
            <br>
            Opposite State:
            <br>
            <lib-checkbox v-bind="args" :modelValue="!args.modelValue" @update:modelValue="args.modelValue = !$event"></lib-checkbox>
        `})},a={...e,args:{disabled:!0}};var r,o,s;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var t,l,n;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  ...Primary,
  args: {
    disabled: true
  }
}`,...(n=(l=a.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};const V=["Primary","Disabled"];export{a as Disabled,e as Primary,V as __namedExportsOrder,x as default};
