import{r as s}from"./vue.esm-bundler-Cz0KJNfX.js";import{t as u,c as l}from"./index-ClhmqbYJ.js";import"./WRoot-BHhJ4_mq.js";import"./iframe-CxoCKbua.js";import"./twMerge-CLwyhV7-.js";const f={component:u,title:"Components/Tooltip",args:{content:"This is a tooltip"}},e={render:a=>{const n=a;return{components:l,setup(){return{showTooltip:s(!1),args:n}},template:`
            <div class="flex flex-col gap-3 items-center pt-10">
                <WTooltip v-bind="args">
                    ${n._testTrigger??""}
                    <template #content>
                    ${n._testContent??"This is a tooltip"}
                    </template>
                </WTooltip>
            </div>
        `}}},t={...e,args:{_testTrigger:"Custom Trigger"}},o={...e,args:{constrainWidthTo:"trigger",constrainHeightTo:"available",_testTrigger:"<button>Tiny Trigger</button>",_testContent:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".repeat(10)}},r={...e,args:{constrainHeightTo:50,_testContent:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".repeat(10)}},i={...e,args:{unstyle:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: components as any,
      setup() {
        const showTooltip = ref(false);
        return {
          showTooltip,
          args
        };
      },
      template: \`
            <div class="flex flex-col gap-3 items-center pt-10">
                <WTooltip v-bind="args">
                    \${args._testTrigger ?? ""}
                    <template #content>
                    \${args._testContent ?? "This is a tooltip"}
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
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    constrainWidthTo: "trigger",
    constrainHeightTo: "available",
    _testTrigger: "<button>Tiny Trigger</button>",
    // should scroll
    _testContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".repeat(10)
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    constrainHeightTo: 50,
    // should scroll
    _testContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".repeat(10)
  }
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    unstyle: true
  }
}`,...i.parameters?.docs?.source}}};const h=["Primary","CustomTrigger","VeryLongContentConstrainedToTriggerWidth","VeryLongContentConstrainedToCustomPxHeight","Unstyled"];export{t as CustomTrigger,e as Primary,i as Unstyled,r as VeryLongContentConstrainedToCustomPxHeight,o as VeryLongContentConstrainedToTriggerWidth,h as __namedExportsOrder,f as default};
