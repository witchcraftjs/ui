import{r as s}from"./vue.esm-bundler-C1bW2l80.js";import{a as t,c as p}from"./index-B_igWmnV.js";import"./LibRoot-D-jXU3dI.js";import"./iframe-l0xL2FWv.js";import"./twMerge-CudCRF6p.js";const i={component:t,title:"Components/ColorInput",args:{}},l={render:o=>({components:p,setup:()=>{const e=s({r:0,g:0,b:0}),n=r=>{e.value={...r}};return{args:{outline:!1,color:e,allowAlpha:!0,...o},handleChange:n}},template:`
            <lib-color-Input
                :allowAlpha="args.allowAlpha"
                :modelValue="args.color.value"
                @update:modelValue="handleChange"
            >
            </lib-color-Input>
            Stretched:
            <div class="flex-1 flex">
                <lib-color-Input
                    class="flex-1"
                    :allowAlpha="args.allowAlpha"
                    :modelValue="args.color.value"
                    @update:modelValue="handleChange"
                >
                </lib-color-Input>
            </div>
        `})},a={...l,args:{allowAlpha:!1}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
            <lib-color-Input
                :allowAlpha="args.allowAlpha"
                :modelValue="args.color.value"
                @update:modelValue="handleChange"
            >
            </lib-color-Input>
            Stretched:
            <div class="flex-1 flex">
                <lib-color-Input
                    class="flex-1"
                    :allowAlpha="args.allowAlpha"
                    :modelValue="args.color.value"
                    @update:modelValue="handleChange"
                >
                </lib-color-Input>
            </div>
        \`
  })
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    allowAlpha: false
  }
}`,...a.parameters?.docs?.source}}};const g=["Primary","DoesNotAllowAlpha"];export{a as DoesNotAllowAlpha,l as Primary,g as __namedExportsOrder,i as default};
