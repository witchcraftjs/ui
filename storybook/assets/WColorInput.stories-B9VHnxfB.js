import{r as s}from"./vue.esm-bundler-CTxwokHZ.js";import{c as t,a as p}from"./index-DfJKJ2pz.js";import"./WRoot-CWVU9Kei.js";import"./iframe-CDjnaJ6T.js";import"./twMerge-jiRaHU2K.js";const g={component:p,title:"Components/ColorInput",args:{}},a={render:o=>({components:t,setup:()=>{const e=s({r:0,g:0,b:0}),n=r=>{e.value={...r}};return{args:{outline:!1,color:e,allowAlpha:!0,...o},handleChange:n}},template:`
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
        `})},l={...a,args:{allowAlpha:!1}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
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
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    allowAlpha: false
  }
}`,...l.parameters?.docs?.source}}};const i=["Primary","DoesNotAllowAlpha"];export{l as DoesNotAllowAlpha,a as Primary,i as __namedExportsOrder,g as default};
