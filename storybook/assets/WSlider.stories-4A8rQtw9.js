import{r as l}from"./vue.esm-bundler-Cz0KJNfX.js";import{c as d,r as i}from"./index-ClhmqbYJ.js";import"./WRoot-BHhJ4_mq.js";import"./iframe-CxoCKbua.js";import"./twMerge-CLwyhV7-.js";const V={component:i,title:"Components/Slider",args:{min:0,max:100,step:1}},e={render:m=>({components:d,setup:()=>{const t=l(m.modelValue??[0]);return{args:m,modelValue:t}},template:`
            <div class="w-64 flex flex-col gap-4">
                <WSlider v-bind="args" v-model="modelValue" />
                <span class="text-sm text-neutral-500">Value: {{ modelValue }}</span>
            </div>
        `})},a={...e,args:{...e.args,min:0,max:200,step:5,modelValue:[10,100]}},r={...e,args:{...e.args,min:0,max:200,step:5,modelValue:[10,100,150]}},s={...e,args:{...e.args,min:0,max:200,step:5,modelValue:[10,100,150],highlightRange:!1}},n={...e,args:{...e.args,modelValue:[10,100,150],disabled:!0}},o={...e,args:{...e.args,modelValue:[10,100,150],readonly:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: components as any,
    setup: () => {
      const modelValue = ref(args.modelValue ?? [0]);
      return {
        args,
        modelValue
      };
    },
    template: \`
            <div class="w-64 flex flex-col gap-4">
                <WSlider v-bind="args" v-model="modelValue" />
                <span class="text-sm text-neutral-500">Value: {{ modelValue }}</span>
            </div>
        \`
  })
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    min: 0,
    max: 200,
    step: 5,
    modelValue: [10, 100]
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    min: 0,
    max: 200,
    step: 5,
    modelValue: [10, 100, 150]
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    min: 0,
    max: 200,
    step: 5,
    modelValue: [10, 100, 150],
    highlightRange: false
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    modelValue: [10, 100, 150],
    disabled: true
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    modelValue: [10, 100, 150],
    readonly: true
  }
}`,...o.parameters?.docs?.source}}};const x=["Primary","Ranged","RangedMany","RangedManyNoHighlight","Disabled","Readonly"];export{n as Disabled,e as Primary,a as Ranged,r as RangedMany,s as RangedManyNoHighlight,o as Readonly,x as __namedExportsOrder,V as default};
