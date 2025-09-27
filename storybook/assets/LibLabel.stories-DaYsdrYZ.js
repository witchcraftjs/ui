import{k as s,c as n}from"./index-CPjZL_cd.js";import"./vue.esm-bundler-B4I_ujvT.js";import"./LibRoot-WN0KOPQ5.js";import"./iframe-DFGok_fB.js";import"./twMerge-CudCRF6p.js";const p={component:s,title:"Components/Label",args:{slot:"label"}},l={render:e=>({components:n,setup:()=>({args:e}),template:`
                <lib-label v-bind="args">{{args.slot}}</lib-label>
                <br/>
                In flex col with input:
                <div class="flex flex-col">
                    <lib-label v-bind="args">{{args.slot}}</lib-label>
                    <lib-simple-input modelValue="some input"></lib-simple-input>
                </div>
        `})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const m=["Primary"];export{l as Primary,m as __namedExportsOrder,p as default};
