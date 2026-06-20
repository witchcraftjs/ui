import{r as l}from"./vue.esm-bundler-Cz0KJNfX.js";import{p as d,c}from"./index-ClhmqbYJ.js";import"./WRoot-BHhJ4_mq.js";import"./iframe-CxoCKbua.js";import"./twMerge-CLwyhV7-.js";const S={component:d,title:"Components/Popup",args:{title:"Popup Title",description:"Popup Description"}},e={render:p=>{const n=p;return{components:c,setup:()=>{const i=l(!1);return{args:n,value:i}},template:`
            <div class="test bg-transparency-squares flex items-center justify-center" style="height:80vh;border:1px solid black;">
                <WPopup
                    :title="args.title"
                    :description="args.description"
                    v-model="value"
                    v-bind="args"
                >
                    ${n._slots}
                    <template #button>
                        <WButton>Open Modal Popup</WButton>
                    </template>
                    <template #extra>
                        <div
                            :style="{width: args.width, height: args.height}"
                        >
                            <div>Extra Slot</div>
                        </div>
                    </template>
                </WPopup>
            </div>
        `}}},t={...e,args:{_slots:`
            <template #title>
                <div>Title Slot</div>
            </template>
            <template #description>
                <div>Description Slot</div>
            </template>
            <template #close>
                <div>Close Slot</div>
            </template>
            <template #backdrop>
                <div>Backdrop Slot</div>
            </template>
        `}},r={...e,args:{_slots:`
            <template #popup>
                <div>Popup Slot - Replaces Other Slots except Close (note, you must provide reka's DialogTitle and DialogDescription to avoid it's warnings</div>
            </template>
        `}},s={...e,args:{width:"80vw",height:"80vh"}},a={...e,args:{width:"110vw",height:"110vh"}},o={...e,args:{unstyle:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: components as any,
      setup: () => {
        const value = ref(false);
        return {
          args,
          value
        };
      },
      template: \`
            <div class="test bg-transparency-squares flex items-center justify-center" style="height:80vh;border:1px solid black;">
                <WPopup
                    :title="args.title"
                    :description="args.description"
                    v-model="value"
                    v-bind="args"
                >
                    \${args._slots}
                    <template #button>
                        <WButton>Open Modal Popup</WButton>
                    </template>
                    <template #extra>
                        <div
                            :style="{width: args.width, height: args.height}"
                        >
                            <div>Extra Slot</div>
                        </div>
                    </template>
                </WPopup>
            </div>
        \`
    };
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    _slots: \`
            <template #title>
                <div>Title Slot</div>
            </template>
            <template #description>
                <div>Description Slot</div>
            </template>
            <template #close>
                <div>Close Slot</div>
            </template>
            <template #backdrop>
                <div>Backdrop Slot</div>
            </template>
        \`
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    _slots: \`
            <template #popup>
                <div>Popup Slot - Replaces Other Slots except Close (note, you must provide reka's DialogTitle and DialogDescription to avoid it's warnings</div>
            </template>
        \`
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "80vw",
    height: "80vh"
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "110vw",
    height: "110vh"
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    unstyle: true
  }
}`,...o.parameters?.docs?.source}}};const y=["Primary","OtherSlots","PopupSlots","PopupLarge","PopupTooBig","Unstyled"];export{t as OtherSlots,s as PopupLarge,r as PopupSlots,a as PopupTooBig,e as Primary,o as Unstyled,y as __namedExportsOrder,S as default};
