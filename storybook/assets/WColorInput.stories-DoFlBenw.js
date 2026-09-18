import{S as s}from"./vue.esm-bundler-AO_tuUZ6.js";import{eK as t,dK as p}from"./index-DpJYLACx.js";import"./WRoot-BpJCm3EK.js";import"./iframe-D0W54ZZL.js";import"./twMerge-CaMoglCM.js";const g={component:p,title:"Components/ColorInput",args:{}},a={render:o=>({components:t,setup:()=>{const l=s({r:0,g:0,b:0}),n=r=>{l.value={...r}};return{args:{outline:!1,color:l,allowAlpha:!0,...o},handleChange:n}},template:`
            <WColorInput
                :allowAlpha="args.allowAlpha"
                :modelValue="args.color.value"
                @update:modelValue="handleChange"
            >
            </WColorInput>
            Stretched:
            <div class="flex-1 flex">
                <WColorInput
                    class="flex-1"
                    :allowAlpha="args.allowAlpha"
                    :modelValue="args.color.value"
                    @update:modelValue="handleChange"
                >
                </WColorInput>
            </div>
        `})},e={...a,args:{allowAlpha:!1}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: components as any,
    setup: () => {
      const color = ref({
        r: 0,
        g: 0,
        b: 0 /* , a: 0.5 */
      });
      const handleChange = (e: any): void => {
        color.value = {
          ...e
        };
      };
      return {
        args: {
          outline: false,
          color,
          allowAlpha: true,
          ...args
        },
        handleChange
      };
    },
    template: \`
            <WColorInput
                :allowAlpha="args.allowAlpha"
                :modelValue="args.color.value"
                @update:modelValue="handleChange"
            >
            </WColorInput>
            Stretched:
            <div class="flex-1 flex">
                <WColorInput
                    class="flex-1"
                    :allowAlpha="args.allowAlpha"
                    :modelValue="args.color.value"
                    @update:modelValue="handleChange"
                >
                </WColorInput>
            </div>
        \`
  })
}`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    allowAlpha: false
  }
}`,...e.parameters?.docs?.source}}};const i=["Primary","DoesNotAllowAlpha"];export{e as DoesNotAllowAlpha,a as Primary,i as __namedExportsOrder,g as default};
