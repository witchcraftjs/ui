import{m as j,e as C,f as O,g as E}from"./vue.esm-bundler-Cybg3BJD.js";import{c as z}from"./index-nZYlgcY9.js";import{a as F}from"./vExtractRootEl-BIGrVJN8.js";import"./twMerge-q1Cwbn18.js";import"./iframe-BGNykWbW.js";function V(r){return r.charAt(0).toUpperCase()+r.slice(1)}const W={style:{"vertical-align":"-0.125em",height:"1em",display:"inline-block",width:"auto"},viewBox:"0 0 448 512"};function $(r,i){return O(),C("svg",W,i[0]||(i[0]=[E("path",{fill:"currentColor",d:"M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64m215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29c0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29c-6 6.45-8.66 14.16-8.61 21.71c.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32c.05-7.55-2.61-15.27-8.61-21.71"},null,-1)]))}const H=j({name:"fa-solid-bell",render:$}),q={component:F,title:"Components/Button",args:{label:"Label",_iconAfter:!0}},e={render:r=>({components:{...z,IconFaSolidBell:H},setup:()=>({args:r,capitalize:V}),template:`
        <div class="flex gap-4 justify-center">
            <template v-for="type of [false, 'ok', 'warning', 'danger', 'primary', 'secondary' ]">
                <lib-button v-bind="{...args, color: type, label: !args.label ? undefined : args.label + ' ' + capitalize(type || 'false')}">
                    <template #icon>
                        <icon class="w-[1em]"><icon-fa-solid-bell /></icon>
                    </template>
                </lib-button>
            </template>
        </div>
        <div class="flex flex-col gap-4 pt-10">
            <template v-for="type of [false, 'ok', 'warning', 'danger', 'primary', 'secondary']">
                <lib-button v-bind="{...args, color: type , label: !args.label ? undefined : args.label + ' ' + capitalize(type || 'false') }">
                    ${r._iconAfter?`
                        <template #icon-after>
                            <icon class="w-[1em]"><icon-fa-solid-bell /></icon>
                        </template>
                    `:""}
                </lib-button>
            </template>
        </div>
        `})},a={...e,args:{...e.args,_iconAfter:!0}},s={...e,args:{...e.args,label:void 0}},t={...e,args:{...e.args,disabled:!0}},n={...e,args:{...e.args,border:!1}},o={...e,args:{...e.args,border:!1,disabled:!0}},l={render:r=>({components:z,setup:()=>({args:r}),template:`
        <div class="flex gap-4 justify-center">
            <lib-button v-bind="{...args}">
                <div>Div inside button still has a pointer cursor.</div>
            </lib-button>
        </div>
        `})};var c,d,p;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      ...components,
      IconFaSolidBell
    },
    setup: () => ({
      args,
      capitalize
    }),
    template: \`
        <div class="flex gap-4 justify-center">
            <template v-for="type of [false, 'ok', 'warning', 'danger', 'primary', 'secondary' ]">
                <lib-button v-bind="{...args, color: type, label: !args.label ? undefined : args.label + ' ' + capitalize(type || 'false')}">
                    <template #icon>
                        <icon class="w-[1em]"><icon-fa-solid-bell /></icon>
                    </template>
                </lib-button>
            </template>
        </div>
        <div class="flex flex-col gap-4 pt-10">
            <template v-for="type of [false, 'ok', 'warning', 'danger', 'primary', 'secondary']">
                <lib-button v-bind="{...args, color: type , label: !args.label ? undefined : args.label + ' ' + capitalize(type || 'false') }">
                    \${args._iconAfter ? \`
                        <template #icon-after>
                            <icon class="w-[1em]"><icon-fa-solid-bell /></icon>
                        </template>
                    \` : \`\`}
                </lib-button>
            </template>
        </div>
        \`
  })
}`,...(p=(d=e.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var m,b,u;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error - .
    _iconAfter: true
  }
}`,...(u=(b=a.parameters)==null?void 0:b.docs)==null?void 0:u.source}}};var g,f,y;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    label: undefined
  }
}`,...(y=(f=s.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var v,x,P;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    disabled: true
  }
}`,...(P=(x=t.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};var B,_,h;n.parameters={...n.parameters,docs:{...(B=n.parameters)==null?void 0:B.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    border: false
  }
}`,...(h=(_=n.parameters)==null?void 0:_.docs)==null?void 0:h.source}}};var w,S,k;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    border: false,
    disabled: true
  }
}`,...(k=(S=o.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var A,D,I;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: (args: any) => ({
    components,
    setup: () => ({
      args
    }),
    template: \`
        <div class="flex gap-4 justify-center">
            <lib-button v-bind="{...args}">
                <div>Div inside button still has a pointer cursor.</div>
            </lib-button>
        </div>
        \`
  })
}`,...(I=(D=l.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};const G=["Primary","IconAfter","OnlyIcon","Disabled","Borderless","BorderlessDisabled","WithDivInside"];export{n as Borderless,o as BorderlessDisabled,t as Disabled,a as IconAfter,s as OnlyIcon,e as Primary,l as WithDivInside,G as __namedExportsOrder,q as default};
