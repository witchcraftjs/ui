import{r as P,b as R}from"./vue.esm-bundler-Cybg3BJD.js";import{r as E,c as h}from"./index-nZYlgcY9.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const A={component:E,title:"Components/ProgressBar",args:{label:"Label",_timeout:1e3,_add:10,_start:50}},e={render:r=>({components:h,setup:()=>{const a=P(r._start);if(r.progress)a.value=r.progress;else{const x=setInterval(()=>{a.value>=100?a.value=0:a.value+=r._add},r._timeout);R(()=>{clearInterval(x)})}return{args:{...r},progress:a}},template:`
            <lib-progress-bar class="flex-1" v-bind="args" :progress="progress"></lib-progress-bar>
            <br/>
            Stretched in flexbox:
            <div class="flex w-full">
                <lib-progress-bar class="flex-1" v-bind="args" :progress="progress"></lib-progress-bar>
            </div>
        `})},s={...e,args:{...e.args}},n={...e,args:{...e.args,label:"Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect"}},o={...e,args:{...e.args,progress:50}},t={...e,args:{...e.args,autohideOnComplete:500,clamp:[10,100],_start:0,_timeout:1e3,_add:10}};var l,g,c;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(c=(g=e.parameters)==null?void 0:g.docs)==null?void 0:c.source}}};var p,i,m;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args
  }
}`,...(m=(i=s.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var b,d,u;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    label: "Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect"
  }
}`,...(u=(d=n.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var f,L,y;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    progress: 50
  }
}`,...(y=(L=o.parameters)==null?void 0:L.docs)==null?void 0:y.source}}};var v,S,_;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(_=(S=t.parameters)==null?void 0:S.docs)==null?void 0:_.source}}};const U=["Primary","Secondary","ReallyLongLabel","Static","AutoHiding"];export{t as AutoHiding,e as Primary,n as ReallyLongLabel,s as Secondary,o as Static,U as __namedExportsOrder,A as default};
