import{m as d,e as p,f as m,g}from"./vue.esm-bundler-CTxwokHZ.js";import{c}from"./index-DfJKJ2pz.js";import{d as u}from"./WRoot-CWVU9Kei.js";import"./twMerge-jiRaHU2K.js";import"./iframe-CDjnaJ6T.js";function f(r){return r.charAt(0).toUpperCase()+r.slice(1)}const b={style:{"vertical-align":"-0.125em",height:"1em",display:"inline-block",width:"auto"},viewBox:"0 0 448 512"};function y(r,a){return p(),m("svg",b,[...a[0]||(a[0]=[g("path",{fill:"currentColor",d:"M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64m215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29c0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29c-6 6.45-8.66 14.16-8.61 21.71c.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32c.05-7.55-2.61-15.27-8.61-21.71"},null,-1)])])}const v=d({name:"fa-solid-bell",render:y}),_={component:u,title:"Components/Button",args:{label:"Label",_iconAfter:!0}},e={render:r=>{const a=r;return{components:{...c,IconFaSolidBell:v},setup:()=>({args:r,capitalize:f}),template:`
                <div class="flex gap-4 justify-center">
                    <template v-for="type of [false, 'ok', 'warning', 'danger', 'primary', 'secondary' ]">
                        <WButton v-bind="{...args, color: type, label: !args.label ? undefined : args.label + ' ' + capitalize(type || 'false')}">
                            <template #icon>
                                <icon class="w-[1em]"><icon-fa-solid-bell /></icon>
                            </template>
                        </WButton>
                    </template>
                </div>
                <div class="flex flex-col gap-4 pt-10">
                    <template v-for="type of [false, 'ok', 'warning', 'danger', 'primary', 'secondary']">
                        <WButton v-bind="{...args, color: type , label: !args.label ? undefined : args.label + ' ' + capitalize(type || 'false') }">
                            ${a._iconAfter?`
                                <template #icon-after>
                                    <icon class="w-[1em]"><icon-fa-solid-bell /></icon>
                                </template>
                            `:""}
                        </WButton>
                    </template>
                </div>
            `}}},s={...e,args:{...e.args,_iconAfter:!0}},t={...e,args:{...e.args,label:void 0}},n={...e,args:{...e.args,disabled:!0}},o={...e,args:{...e.args,border:!1}},l={...e,args:{...e.args,border:!1,disabled:!0}},i={render:r=>({components:c,setup:()=>({args:r}),template:`
        <div class="flex gap-4 justify-center">
            <WButton v-bind="{...args}">
                <div>Div inside button still has a pointer cursor.</div>
            </WButton>
        </div>
        `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => {
    const extraArgs = args as ExtraTestArgs;
    return {
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
                        <WButton v-bind="{...args, color: type, label: !args.label ? undefined : args.label + ' ' + capitalize(type || 'false')}">
                            <template #icon>
                                <icon class="w-[1em]"><icon-fa-solid-bell /></icon>
                            </template>
                        </WButton>
                    </template>
                </div>
                <div class="flex flex-col gap-4 pt-10">
                    <template v-for="type of [false, 'ok', 'warning', 'danger', 'primary', 'secondary']">
                        <WButton v-bind="{...args, color: type , label: !args.label ? undefined : args.label + ' ' + capitalize(type || 'false') }">
                            \${extraArgs._iconAfter ? \`
                                <template #icon-after>
                                    <icon class="w-[1em]"><icon-fa-solid-bell /></icon>
                                </template>
                            \` : \`\`}
                        </WButton>
                    </template>
                </div>
            \`
    };
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    _iconAfter: true
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    label: undefined
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    disabled: true
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    border: false
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    border: false,
    disabled: true
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => ({
      args
    }),
    template: \`
        <div class="flex gap-4 justify-center">
            <WButton v-bind="{...args}">
                <div>Div inside button still has a pointer cursor.</div>
            </WButton>
        </div>
        \`
  })
}`,...i.parameters?.docs?.source}}};const h=["Primary","IconAfter","OnlyIcon","Disabled","Borderless","BorderlessDisabled","WithDivInside"];export{o as Borderless,l as BorderlessDisabled,n as Disabled,s as IconAfter,t as OnlyIcon,e as Primary,i as WithDivInside,h as __namedExportsOrder,_ as default};
