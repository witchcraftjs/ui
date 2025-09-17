import{r as n}from"./vue.esm-bundler-Cma5tyk0.js";import{_ as s}from"./LibRoot-DSIPGJTr.js";import{c as t}from"./index-DLnQEDO-.js";import"./iframe-DJ8xJpys.js";import"./twMerge-CudCRF6p.js";const u={component:s,title:"Components/DarkModeSwitcher",args:{}},r={render:a=>({components:t,setup:()=>{const o=n(!1);return{args:a,darkMode:o}},template:`
            Value: {{darkMode}}
            <LibDarkModeSwitcher 
                @update:darkMode="darkMode = $event"
                v-bind="{...args}"
            ></LibDarkModeSwitcher>
            
        `})},e={...r,args:{...r.args,showLabel:!1}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => {
      const darkMode = ref(false);
      return {
        args,
        darkMode
      };
    },
    template: \`
            Value: {{darkMode}}
            <LibDarkModeSwitcher 
                @update:darkMode="darkMode = $event"
                v-bind="{...args}"
            ></LibDarkModeSwitcher>
            
        \`
  })
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    showLabel: false
  }
}`,...e.parameters?.docs?.source}}};const l=["Primary","WithoutLabel"];export{r as Primary,e as WithoutLabel,l as __namedExportsOrder,u as default};
