import{r as m}from"./vue.esm-bundler-Cybg3BJD.js";import{a as h,c as i}from"./index-nZYlgcY9.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const b={component:h,title:"Components/ColorInput",args:{}},l={render:c=>({components:i,setup:()=>{const e=m({r:0,g:0,b:0}),u=d=>{e.value={...d}};return{args:{outline:!1,color:e,allowAlpha:!0,...c},handleChange:u}},template:`
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
        `})},a={...l,args:{allowAlpha:!1}};var o,n,r;l.parameters={...l.parameters,docs:{...(o=l.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(r=(n=l.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};var s,t,p;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  ...Primary,
  args: {
    allowAlpha: false
  }
}`,...(p=(t=a.parameters)==null?void 0:t.docs)==null?void 0:p.source}}};const C=["Primary","DoesNotAllowAlpha"];export{a as DoesNotAllowAlpha,l as Primary,C as __namedExportsOrder,b as default};
