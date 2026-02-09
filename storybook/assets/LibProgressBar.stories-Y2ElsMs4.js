import{r as g,a as c}from"./vue.esm-bundler-D34C2Wlw.js";import{b as p}from"./LibRoot-CpCGCbRj.js";import{c as i}from"./index-Cu-gwfJh.js";import"./iframe-Rr6GslXv.js";import"./twMerge-BZGhTDWl.js";const L={component:p,title:"Components/ProgressBar",args:{label:"Label",_timeout:1e3,_add:10,_start:50}},e={render:r=>({components:i,setup:()=>{const a=g(r._start);if(r.progress)a.value=r.progress;else{const l=setInterval(()=>{a.value>=100?a.value=0:a.value+=r._add},r._timeout);c(()=>{clearInterval(l)})}return{args:{...r},progress:a}},template:`
            <lib-progress-bar class="flex-1" v-bind="args" :progress="progress"></lib-progress-bar>
            <br/>
            Stretched in flexbox:
            <div class="flex w-full">
                <lib-progress-bar class="flex-1" v-bind="args" :progress="progress"></lib-progress-bar>
            </div>
        `})},s={...e,args:{...e.args}},n={...e,args:{...e.args,label:"Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect"}},o={...e,args:{...e.args,progress:50}},t={...e,args:{...e.args,autohideOnComplete:500,clamp:[10,100],_start:0,_timeout:1e3,_add:10}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => {
      const progress = ref((args as any)._start as number);
      if (args.progress) {
        progress.value = args.progress;
      } else {
        const interval = setInterval(() => {
          if (progress.value >= 100) {
            progress.value = 0;
          } else {
            progress.value += (args as any)._add as number;
          }
        }, (args as any)._timeout as number);
        onUnmounted(() => {
          clearInterval(interval);
        });
      }
      return {
        args: {
          ...args
        },
        progress
      };
    },
    template: \`
            <lib-progress-bar class="flex-1" v-bind="args" :progress="progress"></lib-progress-bar>
            <br/>
            Stretched in flexbox:
            <div class="flex w-full">
                <lib-progress-bar class="flex-1" v-bind="args" :progress="progress"></lib-progress-bar>
            </div>
        \`
  })
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    label: "Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect"
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    progress: 50
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    autohideOnComplete: 500,
    clamp: [10, 100],
    _start: 0,
    // keepSpaceWhenHidden: true,
    _timeout: 1000,
    _add: 10
  }
}`,...t.parameters?.docs?.source}}};const y=["Primary","Secondary","ReallyLongLabel","Static","AutoHiding"];export{t as AutoHiding,e as Primary,n as ReallyLongLabel,s as Secondary,o as Static,y as __namedExportsOrder,L as default};
