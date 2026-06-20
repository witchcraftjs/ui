import{C as c}from"./WRoot-BHhJ4_mq.js";import{r as m}from"./vue.esm-bundler-Cz0KJNfX.js";import{c as i,b as u}from"./index-ClhmqbYJ.js";import"./iframe-CxoCKbua.js";import"./twMerge-CLwyhV7-.js";const C={component:u,title:"Components/ColorPicker",args:{}},o={render:e=>({components:i,setup:()=>{const a=m({r:0,g:0,b:0,...e.modelValue});delete e.modelValue;const t=l=>{a.value={...l}};return{args:{outline:!1,color:a,allowAlpha:!0,...e},handleChange:t}},template:`
            <WRoot :outline="args.outline">
            {{args.color}}
            <WColorPicker
                :modelValue="args.color.value"
                v-bind="args"
                @update:modelValue="handleChange"
            >
            </WColorPicker>
            </WRoot>
        `})},r={...o,args:{allowAlpha:!1}},n={...o,args:{modelValue:{r:255,g:0,b:0}}},s={...o,args:{allowAlpha:!1,customRepresentation:{fromHsvaToString:(e,a)=>new c("hsv",[e.h,e.s,e.v],a?e.a:1).toString({format:"hex"})}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: components as any,
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
            <WRoot :outline="args.outline">
            {{args.color}}
            <WColorPicker
                :modelValue="args.color.value"
                v-bind="args"
                @update:modelValue="handleChange"
            >
            </WColorPicker>
            </WRoot>
        \`
  })
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    allowAlpha: false
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const v=["Primary","DoesNotAllowAlpha","WithExistingValue","CustomStringRepresentation"];export{s as CustomStringRepresentation,r as DoesNotAllowAlpha,o as Primary,n as WithExistingValue,v as __namedExportsOrder,C as default};
