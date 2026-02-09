import{c as d,q as m}from"./index-Cu-gwfJh.js";import"./vue.esm-bundler-D34C2Wlw.js";import"./LibRoot-CpCGCbRj.js";import"./iframe-Rr6GslXv.js";import"./twMerge-BZGhTDWl.js";const x={component:m,title:"Components/Input",args:{modelValue:"Value",placeholder:"Placeholder"}},e={args:{modelValue:"some value"},render:i=>({components:d,setup:()=>({args:i,test:()=>console.log("Enter")}),template:`
                <lib-simple-input
                @keydown="test"
                class="m-2" v-bind="args" v-model="args.modelValue" ></lib-simple-input>
                <lib-simple-input class="m-2" v-bind="{...args, modelValue:''}" ></lib-simple-input>
                `})},r={render:i=>({components:d,setup:()=>({args:i}),template:`
                Inside a flexbox:
                <div class="flex flex-wrap">
                    <lib-simple-input v-bind="args" v-model="args.modelValue"></lib-simple-input>
                    <div class="border-1 border-danger-500 flex-1 whitespace-nowrap">Flex Grow: 1</div>
                </div>
        `}),args:{stretch:!0}},a={...e,args:{disabled:!0}},n={...e,args:{readonly:!0}},o={...e,args:{valid:!1}},s={...e,args:{border:!1}},t={...e,args:{type:"number"}},l={...r,args:{type:"number"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "some value"
  },
  render: args => ({
    components,
    // eslint-disable-next-line no-console
    setup: () => ({
      args,
      test: () => console.log("Enter")
    }),
    template: \`
                <lib-simple-input
                @keydown="test"
                class="m-2" v-bind="args" v-model="args.modelValue" ></lib-simple-input>
                <lib-simple-input class="m-2" v-bind="{...args, modelValue:''}" ></lib-simple-input>
                \`
  })
}`,...e.parameters?.docs?.source},description:{story:"Input",...e.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => ({
      args
    }),
    template: \`
                Inside a flexbox:
                <div class="flex flex-wrap">
                    <lib-simple-input v-bind="args" v-model="args.modelValue"></lib-simple-input>
                    <div class="border-1 border-danger-500 flex-1 whitespace-nowrap">Flex Grow: 1</div>
                </div>
        \`
  }),
  args: {
    stretch: true
  }
}`,...r.parameters?.docs?.source},description:{story:"Has more reasonable min-width inside a flexbox.",...r.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    disabled: true
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    readonly: true
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    valid: false
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    border: false
  }
}`,...s.parameters?.docs?.source},description:{story:`Intended for being wrapped.
Should not have any border or focus outline styles.`,...s.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    type: "number"
  }
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...InsideAFlexbox,
  args: {
    type: "number"
  }
}`,...l.parameters?.docs?.source}}};const v=["Primary","InsideAFlexbox","Disabled","Readonly","Invalid","Borderless","Numerical","NumericalInsideAFlexbox"];export{s as Borderless,a as Disabled,r as InsideAFlexbox,o as Invalid,t as Numerical,l as NumericalInsideAFlexbox,e as Primary,n as Readonly,v as __namedExportsOrder,x as default};
