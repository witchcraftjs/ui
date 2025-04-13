import{r as u}from"./vue.esm-bundler-Cybg3BJD.js";import{b as g,c as d}from"./index-nZYlgcY9.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const C={component:g,title:"Components/ColorPicker",args:{}},e={render:c=>({components:d,setup:()=>{const a=u({r:0,g:0,b:0}),m=i=>{a.value={...i}};return{args:{outline:!1,color:a,allowAlpha:!0,...c},handleChange:m}},template:`
            <test-wrapper :outline="args.outline">
            {{args.color}}
            <lib-color-picker
                :allowAlpha="args.allowAlpha"
                :modelValue="args.color.value"
                @update:modelValue="handleChange"
            >
            </lib-color-picker>
            </test-wrapper>
        `})},r={...e,args:{allowAlpha:!1}};var o,n,l;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => {
      const color = ref({
        r: 0,
        g: 0,
        b: 0 /* , a: 0.5 */
      });
      const handleChange = (e: any) => {
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
            <test-wrapper :outline="args.outline">
            {{args.color}}
            <lib-color-picker
                :allowAlpha="args.allowAlpha"
                :modelValue="args.color.value"
                @update:modelValue="handleChange"
            >
            </lib-color-picker>
            </test-wrapper>
        \`
  })
}`,...(l=(n=e.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var s,t,p;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  ...Primary,
  args: {
    allowAlpha: false
  }
}`,...(p=(t=r.parameters)==null?void 0:t.docs)==null?void 0:p.source}}};const k=["Primary","DoesNotAllowAlpha"];export{r as DoesNotAllowAlpha,e as Primary,k as __namedExportsOrder,C as default};
