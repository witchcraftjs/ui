import{r as i}from"./vue.esm-bundler-CTxwokHZ.js";import{m as p,c as l}from"./index-DfJKJ2pz.js";import"./WRoot-CWVU9Kei.js";import"./iframe-CDjnaJ6T.js";import"./twMerge-jiRaHU2K.js";const h={component:p,title:"Components/Popup",args:{title:"Popup Title",description:"Popup Description"}},e={render:a=>({components:l,setup:()=>{const n=i(!1);return{args:a,value:n}},template:`
            <div class="test bg-transparency-squares flex items-center justify-center" style="height:80vh;border:1px solid black;">
                <WPopup
                    :title="args.title"
                    :description="args.description"
                    v-model="value"
                    v-bind="args"
                >
                    ${a._slots}
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
        `})},t={...e,args:{_slots:`
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
        `}},s={...e,args:{width:"80vw",height:"80vh"}},o={...e,args:{width:"110vw",height:"110vh"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => {
    const extraArgs = args as ExtraTestArgs;
    return {
      components,
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
                    \${extraArgs._slots}
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
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "110vw",
    height: "110vh"
  }
}`,...o.parameters?.docs?.source}}};const P=["Primary","OtherSlots","PopupSlots","PopupLarge","PopupTooBig"];export{t as OtherSlots,s as PopupLarge,r as PopupSlots,o as PopupTooBig,e as Primary,P as __namedExportsOrder,h as default};
