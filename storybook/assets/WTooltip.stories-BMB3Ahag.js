import{r as a}from"./vue.esm-bundler-CTxwokHZ.js";import{p as s,c as u}from"./index-DfJKJ2pz.js";import"./WRoot-CWVU9Kei.js";import"./iframe-CDjnaJ6T.js";import"./twMerge-jiRaHU2K.js";const T={component:s,title:"Components/Tooltip",args:{content:"This is a tooltip"}},e={render:n=>{const r=n;return{components:u,setup(){return{showTooltip:a(!1),extraArgs:r,args:n}},template:`
            <div class="flex flex-col gap-3 items-center pt-10">
                <WTooltip v-bind="args">
                    ${r._testTrigger??""}
                    <template #content>
                    ${r._testContent??"This is a tooltip"}
                    </template>
                </WTooltip>
            </div>
        `}}},t={...e,args:{_testTrigger:"Custom Trigger"}},i={...e,args:{constrainWidthTo:"trigger",constrainHeightTo:"available",_testTrigger:"<button>Tiny Trigger</button>",_testContent:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".repeat(10)}},o={...e,args:{constrainHeightTo:50,_testContent:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".repeat(10)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => {
    const extraArgs = args as ExtraTestArgs;
    return {
      components,
      setup() {
        const showTooltip = ref(false);
        return {
          showTooltip,
          extraArgs,
          args
        };
      },
      template: \`
            <div class="flex flex-col gap-3 items-center pt-10">
                <WTooltip v-bind="args">
                    \${extraArgs._testTrigger ?? ""}
                    <template #content>
                    \${extraArgs._testContent ?? "This is a tooltip"}
                    </template>
                </WTooltip>
            </div>
        \`
    };
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    _testTrigger: "Custom Trigger"
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    constrainWidthTo: "trigger",
    constrainHeightTo: "available",
    _testTrigger: "<button>Tiny Trigger</button>",
    // should scroll
    _testContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".repeat(10)
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    constrainHeightTo: 50,
    // should scroll
    _testContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".repeat(10)
  }
}`,...o.parameters?.docs?.source}}};const x=["Primary","CustomTrigger","VeryLongContentConstrainedToTriggerWidth","VeryLongContentConstrainedToCustomPxHeight"];export{t as CustomTrigger,e as Primary,o as VeryLongContentConstrainedToCustomPxHeight,i as VeryLongContentConstrainedToTriggerWidth,x as __namedExportsOrder,T as default};
