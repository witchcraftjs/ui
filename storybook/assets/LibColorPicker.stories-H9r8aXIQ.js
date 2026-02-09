import{C as c}from"./LibRoot-CpCGCbRj.js";import{r as i}from"./vue.esm-bundler-D34C2Wlw.js";import{c as m,b as p}from"./index-Cu-gwfJh.js";import"./iframe-Rr6GslXv.js";import"./twMerge-BZGhTDWl.js";const b={component:p,title:"Components/ColorPicker",args:{}},r={render:e=>({components:m,setup:()=>{const o=i({r:0,g:0,b:0,...e.modelValue});delete e.modelValue;const l=t=>{o.value={...t}};return{args:{outline:!1,color:o,allowAlpha:!0,...e},handleChange:l}},template:`
            <lib-root :outline="args.outline">
            {{args.color}}
            <lib-color-picker
                :modelValue="args.color.value"
                v-bind="args"
                @update:modelValue="handleChange"
            >
            </lib-color-picker>
            </lib-root>
        `})},a={...r,args:{allowAlpha:!1}},n={...r,args:{modelValue:{r:255,g:0,b:0}}},s={...r,args:{allowAlpha:!1,customRepresentation:{fromHsvaToString:(e,o)=>new c("hsv",[e.h,e.s,e.v],o?e.a:1).toString({format:"hex"})}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => {
      const color = ref({
        r: 0,
        g: 0,
        b: 0 /* , a: 0.5 */,
        ...args.modelValue
      });
      delete (args as any).modelValue;
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
            <lib-root :outline="args.outline">
            {{args.color}}
            <lib-color-picker
                :modelValue="args.color.value"
                v-bind="args"
                @update:modelValue="handleChange"
            >
            </lib-color-picker>
            </lib-root>
        \`
  })
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    allowAlpha: false
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    modelValue: {
      r: 255,
      g: 0,
      b: 0
    }
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    allowAlpha: false,
    customRepresentation: {
      fromHsvaToString: (hsva: any, includeAlpha: boolean) => new Color("hsv", [hsva.h, hsva.s, hsva.v], includeAlpha ? hsva.a : 1 // this takes care of the correct hex format
      ).toString({
        format: "hex"
      })
    }
  }
}`,...s.parameters?.docs?.source}}};const v=["Primary","DoesNotAllowAlpha","WithExistingValue","CustomStringRepresentation"];export{s as CustomStringRepresentation,a as DoesNotAllowAlpha,r as Primary,n as WithExistingValue,v as __namedExportsOrder,b as default};
