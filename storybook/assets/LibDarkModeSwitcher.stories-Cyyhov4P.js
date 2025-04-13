import{r as i}from"./vue.esm-bundler-Cybg3BJD.js";import{_ as p}from"./vExtractRootEl-BIGrVJN8.js";import{c as u}from"./index-nZYlgcY9.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const b={component:p,title:"Components/DarkModeSwitcher",args:{}},r={render:m=>({components:u,setup:()=>{const c=i(!1);return{args:m,darkMode:c}},template:`
            Value: {{darkMode}}
            <LibDarkModeSwitcher 
                @update:darkMode="darkMode = $event"
                v-bind="{...args}"
            ></LibDarkModeSwitcher>
            
        `})},e={...r,args:{...r.args,autoLabel:!1}};var a,o,t;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(t=(o=r.parameters)==null?void 0:o.docs)==null?void 0:t.source}}};var n,s,d;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    autoLabel: false
  }
}`,...(d=(s=e.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};const L=["Primary","WithoutLabel"];export{r as Primary,e as WithoutLabel,L as __namedExportsOrder,b as default};
