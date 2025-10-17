import{k as s,c as n}from"./index-B_igWmnV.js";import"./vue.esm-bundler-C1bW2l80.js";import"./LibRoot-D-jXU3dI.js";import"./iframe-l0xL2FWv.js";import"./twMerge-CudCRF6p.js";const p={component:s,title:"Components/Label",args:{slot:"label"}},l={render:e=>({components:n,setup:()=>({args:e}),template:`
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
