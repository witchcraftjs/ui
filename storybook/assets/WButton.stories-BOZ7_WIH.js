import{m as d,g as p,j as m,k as g}from"./vue.esm-bundler-Cz0KJNfX.js";import{c as i}from"./index-ClhmqbYJ.js";import{g as u}from"./WRoot-BHhJ4_mq.js";import"./twMerge-CLwyhV7-.js";import"./iframe-CxoCKbua.js";function f(a){return a.charAt(0).toUpperCase()+a.slice(1)}const y={style:{"vertical-align":"-0.125em",height:"1em",display:"inline-block",width:"auto"},viewBox:"0 0 448 512"};function b(a,r){return p(),m("svg",y,[...r[0]||(r[0]=[g("path",{fill:"currentColor",d:"M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64m215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29c0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29c-6 6.45-8.66 14.16-8.61 21.71c.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32c.05-7.55-2.61-15.27-8.61-21.71"},null,-1)])])}const v=d({name:"fa-solid-bell",render:b}),P={component:u,title:"Components/Button",args:{label:"Label",_iconAfter:!0}},e={render:a=>{const r=a;return{components:{...i,IconFaSolidBell:v},setup:()=>({args:r,capitalize:f}),template:`
                <div class="flex gap-4 justify-center">
                    <template v-for="type of [false, 'ok', 'warning', 'danger', 'primary', 'secondary' ]">
                        <WButton v-bind="{...args, color: type, label: !args.label ? undefined : args.label + ' ' + capitalize(type || 'false')}">
                            <template #icon>
                                <WIcon class="w-[1em]"><icon-fa-solid-bell /></WIcon>
                            </template>
                        </WButton>
                    </template>
                </div>
                <div class="flex flex-col gap-4 pt-10">
                    <template v-for="type of [false, 'ok', 'warning', 'danger', 'primary', 'secondary']">
                        <WButton v-bind="{...args, color: type , label: !args.label ? undefined : args.label + ' ' + capitalize(type || 'false') }">
                            ${r._iconAfter?`
                                <template #icon-after>
                                    <WIcon class="w-[1em]"><icon-fa-solid-bell /></WIcon>
                                </template>
                            `:""}
                        </WButton>
                    </template>
                </div>
            `}}},s={...e,args:{...e.args,_iconAfter:!0}},t={...e,args:{...e.args,label:void 0}},n={...e,args:{...e.args,disabled:!0}},o={...e,args:{...e.args,border:!1}},l={...e,args:{...e.args,border:!1,disabled:!0}},c={render:a=>({components:i,setup:()=>({args:a}),template:`
        <div class="flex gap-4 justify-center">
            <WButton v-bind="{...args}">
                <div>Div inside button still has a pointer cursor.</div>
            </WButton>
        </div>
        `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: {
        ...(components as any),
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
                                <WIcon class="w-[1em]"><icon-fa-solid-bell /></WIcon>
                            </template>
                        </WButton>
                    </template>
                </div>
                <div class="flex flex-col gap-4 pt-10">
                    <template v-for="type of [false, 'ok', 'warning', 'danger', 'primary', 'secondary']">
                        <WButton v-bind="{...args, color: type , label: !args.label ? undefined : args.label + ' ' + capitalize(type || 'false') }">
                            \${args._iconAfter ? \`
                                <template #icon-after>
                                    <WIcon class="w-[1em]"><icon-fa-solid-bell /></WIcon>
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
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: components as any,
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
}`,...c.parameters?.docs?.source}}};const h=["Primary","IconAfter","OnlyIcon","Disabled","Borderless","BorderlessDisabled","WithDivInside"];export{o as Borderless,l as BorderlessDisabled,n as Disabled,s as IconAfter,t as OnlyIcon,e as Primary,c as WithDivInside,h as __namedExportsOrder,P as default};
