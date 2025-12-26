import{k as s,c as n}from"./index-DRBPq8mz.js";import"./vue.esm-bundler-D4Wb0Q-q.js";import"./LibRoot-DKpgBW2I.js";import"./iframe-B3RJqWWC.js";import"./twMerge-BZGhTDWl.js";const p={component:s,title:"Components/Label",args:{slot:"label"}},l={render:e=>({components:n,setup:()=>({args:e}),template:`
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
