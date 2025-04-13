import{l as i,c as r}from"./index-nZYlgcY9.js";import"./vue.esm-bundler-Cybg3BJD.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const c={component:i,title:"Components/Label",args:{slot:"label"}},l={render:a=>({components:r,setup:()=>({args:a}),template:`
                <lib-label v-bind="args">{{args.slot}}</lib-label>
                <br/>
                In flex col with input:
                <div class="flex flex-col">
                    <lib-label v-bind="args">{{args.slot}}</lib-label>
                    <lib-simple-input modelValue="some input"></lib-simple-input>
                </div>
        `})};var e,s,n;l.parameters={...l.parameters,docs:{...(e=l.parameters)==null?void 0:e.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => ({
      args
    }),
    template: \`
                <lib-label v-bind="args">{{args.slot}}</lib-label>
                <br/>
                In flex col with input:
                <div class="flex flex-col">
                    <lib-label v-bind="args">{{args.slot}}</lib-label>
                    <lib-simple-input modelValue="some input"></lib-simple-input>
                </div>
        \`
  })
}`,...(n=(s=l.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const d=["Primary"];export{l as Primary,d as __namedExportsOrder,c as default};
