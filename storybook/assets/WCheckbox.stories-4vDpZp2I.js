import{dJ as s,eK as n}from"./index-DpJYLACx.js";import"./vue.esm-bundler-AO_tuUZ6.js";import"./WRoot-BpJCm3EK.js";import"./iframe-D0W54ZZL.js";import"./twMerge-CaMoglCM.js";const p={component:s,title:"Components/Checkbox",args:{modelValue:!0,label:"Label"}},e={render:r=>{const o=r;return{components:n,setup:()=>({args:o}),template:`
                <WCheckbox v-bind="args" v-model="args.modelValue"></WCheckbox>
                <br>
                Opposite State:
                <br>
                <WCheckbox v-bind="args" :modelValue="!args.modelValue" @update:modelValue="args.modelValue = !$event"></WCheckbox>
            `}}},a={...e,args:{disabled:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: components as any,
      setup: () => ({
        args
      }),
      template: \`
                <WCheckbox v-bind="args" v-model="args.modelValue"></WCheckbox>
                <br>
                Opposite State:
                <br>
                <WCheckbox v-bind="args" :modelValue="!args.modelValue" @update:modelValue="args.modelValue = !$event"></WCheckbox>
            \`
    };
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    disabled: true
  }
}`,...a.parameters?.docs?.source}}};const u=["Primary","Disabled"];export{a as Disabled,e as Primary,u as __namedExportsOrder,p as default};
