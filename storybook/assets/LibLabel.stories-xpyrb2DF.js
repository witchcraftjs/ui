import{c as s,k as n}from"./index-Cu-gwfJh.js";import"./vue.esm-bundler-D34C2Wlw.js";import"./LibRoot-CpCGCbRj.js";import"./iframe-Rr6GslXv.js";import"./twMerge-BZGhTDWl.js";const p={component:n,title:"Components/Label",args:{slot:"label"}},l={render:e=>({components:s,setup:()=>({args:e}),template:`
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
