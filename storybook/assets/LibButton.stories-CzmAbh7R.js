import{m as d,e as p,f as m,g as b}from"./vue.esm-bundler-D34C2Wlw.js";import{c}from"./index-Cu-gwfJh.js";import{d as u}from"./LibRoot-CpCGCbRj.js";import"./twMerge-BZGhTDWl.js";import"./iframe-Rr6GslXv.js";function g(r){return r.charAt(0).toUpperCase()+r.slice(1)}const f={style:{"vertical-align":"-0.125em",height:"1em",display:"inline-block",width:"auto"},viewBox:"0 0 448 512"};function y(r,i){return p(),m("svg",f,[...i[0]||(i[0]=[b("path",{fill:"currentColor",d:"M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64m215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29c0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29c-6 6.45-8.66 14.16-8.61 21.71c.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32c.05-7.55-2.61-15.27-8.61-21.71"},null,-1)])])}const v=d({name:"fa-solid-bell",render:y}),w={component:u,title:"Components/Button",args:{label:"Label",_iconAfter:!0}},e={render:r=>({components:{...c,IconFaSolidBell:v},setup:()=>({args:r,capitalize:g}),template:`
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
        `})},a={...e,args:{...e.args,_iconAfter:!0}},s={...e,args:{...e.args,label:void 0}},t={...e,args:{...e.args,disabled:!0}},n={...e,args:{...e.args,border:!1}},o={...e,args:{...e.args,border:!1,disabled:!0}},l={render:r=>({components:c,setup:()=>({args:r}),template:`
        <div class="flex gap-4 justify-center">
            <lib-button v-bind="{...args}">
                <div>Div inside button still has a pointer cursor.</div>
            </lib-button>
        </div>
        `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    // @ts-expect-error - .
    _iconAfter: true
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    label: undefined
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    disabled: true
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    border: false
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    border: false,
    disabled: true
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const S=["Primary","IconAfter","OnlyIcon","Disabled","Borderless","BorderlessDisabled","WithDivInside"];export{n as Borderless,o as BorderlessDisabled,t as Disabled,a as IconAfter,s as OnlyIcon,e as Primary,l as WithDivInside,S as __namedExportsOrder,w as default};
