import{r as c,c as N,w as W}from"./vue.esm-bundler-Cybg3BJD.js";import{q as D,c as F}from"./index-nZYlgcY9.js";import{v as G}from"./vExtractRootEl-BIGrVJN8.js";import"./twMerge-q1Cwbn18.js";import"./iframe-BGNykWbW.js";const Y={component:D,title:"Components/Popup",args:{}},e={render:O=>({components:F,directives:{extractRootEl:G},setup:()=>{const p=c(!1),u=["TL","TC","TR","BL","BC","BR"],t=c("TL"),d=c(!0),A=N(()=>{switch(t.value){case"TL":return"align-self: flex-start; justify-self: flex-start;";case"TC":return"align-self: flex-start; justify-self: center;";case"TR":return"align-self: flex-start; justify-self: flex-end;";case"BL":return"align-self: flex-end; justify-self: flex-start;";case"BC":return"align-self: flex-end; justify-self: center;";case"BR":return"align-self: flex-end; justify-self: flex-end;";default:return""}});return W(p,()=>{if(!p.value&&d.value){const f=u.indexOf(t.value);f<5?t.value=u[f+1]:t.value=u[0]}}),{args:O,buttonPos:t,autoRotatePos:d,buttonStyle:A,value:p}},template:`
            <lib-input
                :suggestions="['TL', 'TR', 'BL', 'BR']"
                :restrict-to-suggestions="true"
                :suggestions-filter="(_, items) => items"
                :label="'Button Position'"
                v-model="buttonPos"
            >
            </lib-input>
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
            `})},n={...e,args:{avoidRepositioning:!0}},r={...e,args:{width:"110vw"}},o={...e,args:{width:"500px",height:"500px",preferredHorizontal:["center-screen"],preferredVertical:["center-screen"]}},s={...e,args:{width:"500px",height:"500px",preferredHorizontal:["right-most"],preferredVertical:["bottom-most"]}},a={...e,args:{width:"500px",height:"500px",preferredHorizontal:["left-most"],preferredVertical:["top-most"]}},i={...e,args:{width:"500px",height:"500px",preferredHorizontal:["center-most"],preferredVertical:["center-most"]}},l={...e,args:{width:"300px",height:"500px",preferredHorizontal:["left-most"],preferredVertical:["center-most"],avoidRepositioning:!0}};var g,m,b;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
            <lib-input
                :suggestions="['TL', 'TR', 'BL', 'BR']"
                :restrict-to-suggestions="true"
                :suggestions-filter="(_, items) => items"
                :label="'Button Position'"
                v-model="buttonPos"
            >
            </lib-input>
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
}`,...(b=(m=e.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var h,x,v;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  ...Primary,
  args: {
    avoidRepositioning: true
  }
}`,...(v=(x=n.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var P,y,w,R,T;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "110vw"
  }
}`,...(w=(y=r.parameters)==null?void 0:y.docs)==null?void 0:w.source},description:{story:"When the popup is too wide, it's positioned to the left and overflow scroll is set with an invisible scrollbar.",...(T=(R=r.parameters)==null?void 0:R.docs)==null?void 0:T.description}}};var B,S,L;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "500px",
    height: "500px",
    preferredHorizontal: ["center-screen"],
    preferredVertical: ["center-screen"]
  }
}`,...(L=(S=o.parameters)==null?void 0:S.docs)==null?void 0:L.source}}};var E,C,j;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "500px",
    height: "500px",
    preferredHorizontal: ["right-most"],
    preferredVertical: ["bottom-most"]
  }
}`,...(j=(C=s.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};var z,H,V;a.parameters={...a.parameters,docs:{...(z=a.parameters)==null?void 0:z.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "500px",
    height: "500px",
    preferredHorizontal: ["left-most"],
    preferredVertical: ["top-most"]
  }
}`,...(V=(H=a.parameters)==null?void 0:H.docs)==null?void 0:V.source}}};var k,M,_;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "500px",
    height: "500px",
    preferredHorizontal: ["center-most"],
    preferredVertical: ["center-most"]
  }
}`,...(_=(M=i.parameters)==null?void 0:M.docs)==null?void 0:_.source}}};var I,$,q;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  ...Primary,
  args: {
    width: "300px",
    height: "500px",
    preferredHorizontal: ["left-most"],
    preferredVertical: ["center-most"],
    avoidRepositioning: true
  }
}`,...(q=($=l.parameters)==null?void 0:$.docs)==null?void 0:q.source}}};const Z=["Primary","PopupNoShift","PopupTooBig","PopupCenterScreen","PopupRightBottomMost","PopupLeftTopMost","PopupCenterMost","LeftMenuShapeExample"];export{l as LeftMenuShapeExample,i as PopupCenterMost,o as PopupCenterScreen,a as PopupLeftTopMost,n as PopupNoShift,s as PopupRightBottomMost,r as PopupTooBig,e as Primary,Z as __namedExportsOrder,Y as default};
