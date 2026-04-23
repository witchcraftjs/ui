import{r as g,a as m}from"./vue.esm-bundler-CTxwokHZ.js";import{b as p}from"./WRoot-CWVU9Kei.js";import{c as d}from"./index-DfJKJ2pz.js";import"./iframe-CDjnaJ6T.js";import"./twMerge-jiRaHU2K.js";const x={component:p,title:"Components/ProgressBar",args:{label:"Label",_timeout:1e3,_add:10,_start:50}},e={render:s=>{const l=s;return{components:d,setup:()=>{const i=g(!1),r=g(l._start);if(s.progress)r.value=s.progress;else{let c=!1;const u=setInterval(()=>{c||(r.value>=100?(c=!0,setTimeout(()=>{r.value=0,c=!1},2e3)):r.value+=l._add)},l._timeout);m(()=>{clearInterval(u)})}return{args:{...s},forceFull:i,progress:r}},template:`
            <WCheckbox v-model="forceFull">Force 100%</WCheckbox>
            <WProgressBar class="flex-1" v-bind="args" :progress="forceFull ? 100 : progress"></WProgressBar>
            <br/>
            Stretched in flexbox:
            <div class="flex w-full">
                <WProgressBar class="flex-1" v-bind="args" :progress="forceFull ? 100 : progress"></WProgressBar>
            </div>
            <hr class="mt-2"/>
        `}}},a={...e,args:{...e.args,label:"Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect"}},t={...e,args:{...e.args,progress:50}},n={...e,args:{...e.args,autohideOnComplete:500,clamp:[10,100],_start:0,_timeout:1e3,_add:10}},o={...e,args:{...e.args,autohideOnComplete:500,keepSpaceWhenHidden:!1,clamp:[10,100],_start:0,_timeout:1e3,_add:10}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => {
    const extraArgs = args as ExtraTestArgs;
    return {
      components,
      setup: () => {
        const forceFull = ref(false);
        const progress = ref(extraArgs._start as number);
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
              progress.value += extraArgs._add as number;
            }
          }, extraArgs._timeout as number);
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
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    progress: 50
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const S=["Primary","ReallyLongLabel","Static","AutoHiding","AutoHidingNoKeepSpace"];export{n as AutoHiding,o as AutoHidingNoKeepSpace,e as Primary,a as ReallyLongLabel,t as Static,S as __namedExportsOrder,x as default};
