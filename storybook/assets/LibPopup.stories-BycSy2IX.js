import{w as b,r as c,c as h}from"./vue.esm-bundler-D34C2Wlw.js";import{c as x,n as v}from"./index-Cu-gwfJh.js";import{v as P}from"./LibRoot-CpCGCbRj.js";import"./twMerge-BZGhTDWl.js";import"./iframe-Rr6GslXv.js";const S={component:v,title:"Components/Popup",args:{}},e={render:g=>({components:x,directives:{extractRootEl:P},setup:()=>{const p=c(!1),u=["TL","TC","TR","BL","BC","BR"],t=c("TL"),d=c(!0),m=h(()=>{switch(t.value){case"TL":return"align-self: flex-start; justify-self: flex-start;";case"TC":return"align-self: flex-start; justify-self: center;";case"TR":return"align-self: flex-start; justify-self: flex-end;";case"BL":return"align-self: flex-end; justify-self: flex-start;";case"BC":return"align-self: flex-end; justify-self: center;";case"BR":return"align-self: flex-end; justify-self: flex-end;";default:return""}});return b(p,()=>{if(!p.value&&d.value){const f=u.indexOf(t.value);f<5?t.value=u[f+1]:t.value=u[0]}}),{args:g,buttonPos:t,autoRotatePos:d,buttonStyle:m,value:p}},template:`
            <lib-simple-input
                :suggestions="['TL', 'TR', 'BL', 'BR']"
                :restrict-to-suggestions="true"
                :suggestions-filter="(_, items) => items"
                :label="'Button Position'"
                v-model="buttonPos"
            >
            </lib-simple-input>
            <div>
                <label>Auto Rotate Position</label>
                <input type="checkbox" v-model="autoRotatePos">
            </div>
            <div class="test bg-transparency-squares" style="display:grid;height:80vh;padding:50px;border:1px solid black;">

            <lib-popup v-model="value" v-bind="{ ...args, width:undefined, }" >
            {{value}}
                <template #button="{extractEl}">
                    <lib-button :style="buttonStyle" @click="value = !value" v-extract-root-el="extractEl">Toggle Popup</lib-button>
                </template>
                <template #popup="{position, extractEl}">
                        <lib-debug
                            v-extract-root-el="extractEl"
                            :style="(args.width ? \`width: \${args.width};\` : '') + (args.height ? \`height: \${args.height};\` : '')"
                            class="bg-bg dark:bg-fg w-[500px]"
                        >
                            {{ position }}
                        </lib-debug>
                </template>
            </lib-popup>
            </div>
            `})},n={...e,args:{avoidRepositioning:!0}},r={...e,args:{width:"110vw"}},o={...e,args:{width:"500px",height:"500px",preferredHorizontal:["center-screen"],preferredVertical:["center-screen"]}},s={...e,args:{width:"500px",height:"500px",preferredHorizontal:["right-most"],preferredVertical:["bottom-most"]}},a={...e,args:{width:"500px",height:"500px",preferredHorizontal:["left-most"],preferredVertical:["top-most"]}},i={...e,args:{width:"500px",height:"500px",preferredHorizontal:["center-most"],preferredVertical:["center-most"]}},l={...e,args:{width:"300px",height:"500px",preferredHorizontal:["left-most"],preferredVertical:["center-most"],avoidRepositioning:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    directives: {
      extractRootEl: vExtractRootEl
    },
    setup: () => {
      const value = ref(false);
      const buttonPositions = ["TL", "TC", "TR", "BL", "BC", "BR"] as const;
      const buttonPos = ref<typeof buttonPositions[number]>("TL");
      const autoRotatePos = ref(true);
      const buttonStyle = computed(() => {
        switch (buttonPos.value) {
          case "TL":
            return \`align-self: flex-start; justify-self: flex-start;\`;
          case "TC":
            return \`align-self: flex-start; justify-self: center;\`;
          case "TR":
            return \`align-self: flex-start; justify-self: flex-end;\`;
          case "BL":
            return \`align-self: flex-end; justify-self: flex-start;\`;
          case "BC":
            return \`align-self: flex-end; justify-self: center;\`;
          case "BR":
            return \`align-self: flex-end; justify-self: flex-end;\`;
          default:
            return "";
        }
      });
      watch(value, () => {
        if (!value.value && autoRotatePos.value) {
          const buttonI = buttonPositions.indexOf(buttonPos.value);
          if (buttonI < 5) {
            buttonPos.value = buttonPositions[buttonI + 1];
          } else {
            buttonPos.value = buttonPositions[0];
          }
        }
      });
      return {
        args,
        buttonPos,
        autoRotatePos,
        buttonStyle,
        value
      };
    },
    template: \`
            <lib-simple-input
                :suggestions="['TL', 'TR', 'BL', 'BR']"
                :restrict-to-suggestions="true"
                :suggestions-filter="(_, items) => items"
                :label="'Button Position'"
                v-model="buttonPos"
            >
            </lib-simple-input>
            <div>
                <label>Auto Rotate Position</label>
                <input type="checkbox" v-model="autoRotatePos">
            </div>
            <div class="test bg-transparency-squares" style="display:grid;height:80vh;padding:50px;border:1px solid black;">

            <lib-popup v-model="value" v-bind="{ ...args, width:undefined, }" >
            {{value}}
                <template #button="{extractEl}">
                    <lib-button :style="buttonStyle" @click="value = !value" v-extract-root-el="extractEl">Toggle Popup</lib-button>
                </template>
                <template #popup="{position, extractEl}">
                        <lib-debug
                            v-extract-root-el="extractEl"
                            :style="(args.width ? \\\`width: \\\${args.width};\\\` : '') + (args.height ? \\\`height: \\\${args.height};\\\` : '')"
                            class="bg-bg dark:bg-fg w-[500px]"
                        >
                            {{ position }}
                        </lib-debug>
                </template>
            </lib-popup>
            </div>
            \`
  })
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    avoidRepositioning: true
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "110vw"
  }
}`,...r.parameters?.docs?.source},description:{story:"When the popup is too wide, it's positioned to the left and overflow scroll is set with an invisible scrollbar.",...r.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "500px",
    height: "500px",
    preferredHorizontal: ["center-screen"],
    preferredVertical: ["center-screen"]
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "500px",
    height: "500px",
    preferredHorizontal: ["right-most"],
    preferredVertical: ["bottom-most"]
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "500px",
    height: "500px",
    preferredHorizontal: ["left-most"],
    preferredVertical: ["top-most"]
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "500px",
    height: "500px",
    preferredHorizontal: ["center-most"],
    preferredVertical: ["center-most"]
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "300px",
    height: "500px",
    preferredHorizontal: ["left-most"],
    preferredVertical: ["center-most"],
    avoidRepositioning: true
  }
}`,...l.parameters?.docs?.source}}};const L=["Primary","PopupNoShift","PopupTooBig","PopupCenterScreen","PopupRightBottomMost","PopupLeftTopMost","PopupCenterMost","LeftMenuShapeExample"];export{l as LeftMenuShapeExample,i as PopupCenterMost,o as PopupCenterScreen,a as PopupLeftTopMost,n as PopupNoShift,s as PopupRightBottomMost,r as PopupTooBig,e as Primary,L as __namedExportsOrder,S as default};
