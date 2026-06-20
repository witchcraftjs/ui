import{r as c,a as m}from"./vue.esm-bundler-Cz0KJNfX.js";import{c as p}from"./index-ClhmqbYJ.js";import{e as d}from"./WRoot-BHhJ4_mq.js";import"./twMerge-CLwyhV7-.js";import"./iframe-CxoCKbua.js";const y={component:d,title:"Components/ProgressBar",args:{label:"Label",_timeout:1e3,_add:10,_start:50}},e={render:g=>{const r=g;return{components:p,setup:()=>{const i=c(!1),s=c(r._start);if(r.progress)s.value=r.progress;else{let l=!1;const u=setInterval(()=>{l||(s.value>=100?(l=!0,setTimeout(()=>{s.value=0,l=!1},2e3)):s.value+=r._add)},r._timeout);m(()=>{clearInterval(u)})}return{args:{...r},forceFull:i,progress:s}},template:`
            <WCheckbox v-model="forceFull">Force 100%</WCheckbox>
            <WProgressBar class="flex-1" v-bind="args" :progress="forceFull ? 100 : progress"></WProgressBar>
            <br/>
            Stretched in flexbox:
            <div class="flex w-full">
                <WProgressBar class="flex-1" v-bind="args" :progress="forceFull ? 100 : progress"></WProgressBar>
            </div>
            <hr class="mt-2"/>
        `}}},a={...e,args:{...e.args,label:"Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect"}},n={...e,args:{...e.args,progress:50}},o={...e,args:{...e.args,autohideOnComplete:500,clamp:[10,100],_start:0,_timeout:1e3,_add:10}},t={...e,args:{...e.args,autohideOnComplete:500,keepSpaceWhenHidden:!1,clamp:[10,100],_start:0,_timeout:1e3,_add:10}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: components as any,
      setup: () => {
        const forceFull = ref(false);
        const progress = ref(args._start as number);
        if (args.progress) {
          progress.value = args.progress;
        } else {
          let justHitFull = false;
          const interval = setInterval(() => {
            if (justHitFull) return;
            if (progress.value >= 100) {
              justHitFull = true;
              // give it time to hide
              setTimeout(() => {
                progress.value = 0;
                justHitFull = false;
              }, 2000);
            } else {
              progress.value += args._add as number;
            }
          }, args._timeout as number);
          onUnmounted(() => {
            clearInterval(interval);
          });
        }
        return {
          args: {
            ...args
          },
          forceFull,
          progress
        };
      },
      template: \`
            <WCheckbox v-model="forceFull">Force 100%</WCheckbox>
            <WProgressBar class="flex-1" v-bind="args" :progress="forceFull ? 100 : progress"></WProgressBar>
            <br/>
            Stretched in flexbox:
            <div class="flex w-full">
                <WProgressBar class="flex-1" v-bind="args" :progress="forceFull ? 100 : progress"></WProgressBar>
            </div>
            <hr class="mt-2"/>
        \`
    };
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    label: "Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect"
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    progress: 50
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    autohideOnComplete: 500,
    clamp: [10, 100],
    // keepSpaceWhenHidden: true,
    _start: 0,
    _timeout: 1000,
    _add: 10
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    autohideOnComplete: 500,
    keepSpaceWhenHidden: false,
    clamp: [10, 100],
    _start: 0,
    _timeout: 1000,
    _add: 10
  }
}`,...t.parameters?.docs?.source}}};const S=["Primary","ReallyLongLabel","Static","AutoHiding","AutoHidingNoKeepSpace"];export{o as AutoHiding,t as AutoHidingNoKeepSpace,e as Primary,a as ReallyLongLabel,n as Static,S as __namedExportsOrder,y as default};
