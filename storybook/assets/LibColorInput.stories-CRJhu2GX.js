import{r as s}from"./vue.esm-bundler-D34C2Wlw.js";import{c as t,a as p}from"./index-Cu-gwfJh.js";import"./LibRoot-CpCGCbRj.js";import"./iframe-Rr6GslXv.js";import"./twMerge-BZGhTDWl.js";const i={component:p,title:"Components/ColorInput",args:{}},l={render:o=>({components:t,setup:()=>{const e=s({r:0,g:0,b:0}),n=r=>{e.value={...r}};return{args:{outline:!1,color:e,allowAlpha:!0,...o},handleChange:n}},template:`
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
