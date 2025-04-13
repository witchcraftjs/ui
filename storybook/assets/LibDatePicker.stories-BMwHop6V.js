import{$ as S,d as _,c as w,e as B,f as F,g as W,h as E}from"./index-nZYlgcY9.js";import{r as u,c as O}from"./vue.esm-bundler-Cybg3BJD.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";function j(t,...n){return String.raw(t,...n)}const q={component:_,title:"Components/DatePicker",args:{slot:"",timeZone:S()}};function m(t,n){return W(E(t,n),"UTC").toAbsoluteString()}const e={render:t=>({components:{...w},setup:()=>{const n=u(t.modelValue),l=u(t.timeZone),x=O(()=>{const a=n.value,c=l.value;return a instanceof Date?m(a,c):typeof a=="object"?`Start: ${a.start?m(a.start,c):"undefined"}, End: ${a.end?m(a.end,c):"undefined"}`:"undefined"});return{args:t,getLocalTimeZone:S,modelValue:n,timeZone:l,debugUtcDate:x}},template:`
            <div>Date: {{modelValue ?? "undefined"}}</div>
            <div>Date UTC: {{debugUtcDate}}</div>
            <div>Detected timezone (via @internationalized/date): {{getLocalTimeZone()}}</div>
            <LibTimeZonePicker
                v-model="timeZone"
                label="Override Time Zone"
                wrapper-class="[&_.suggestions]:max-h-[200px] [&_.suggestions]:overflow-y-auto"
            /> 
            <div>
                This component has no border, added here to see it's size.
            </div>
            <div class="border border-neutral-500">
                <LibDatePicker v-bind="args" v-model="modelValue" :time-zone="timeZone">
                    ${t.slot}
                </LibDatePicker>
            </div>
        `})},r={...e,args:{modelValue:{start:void 0,end:void 0}}},o={...e,args:{...e.args,class:"[&_.trigger]:order-first"}},s={...e,args:{slot:j`
            <template #default="slotProps">
                <LibButton>Custom content can be added here.</LibButton>
                <p class="break-all">
                    Content has access to the internal temporary/suggested date value and can change it (e.g. set it to today).
                </p>	
                <p>Temp value:</p>
                {{ slotProps.tempValue }} 
            </template>
        `}},i={...e,args:{...e.args,showTime:!0}},d={...e,args:{...e.args,fallbackDate:B(new F(2e3,1,1)).toDate()}};var p,g,f;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      ...components
    },
    setup: () => {
      const modelValue = ref(args.modelValue);
      const timeZone = ref(args.timeZone);
      const debugUtcDate = computed(() => {
        const m = modelValue.value;
        const z = timeZone.value;
        return m instanceof Date ? toUTC(m, z) : typeof m === "object" ? \`Start: \${m.start ? toUTC(m.start, z) : "undefined"}, End: \${m.end ? toUTC(m.end, z) : "undefined"}\` : "undefined";
      });
      return {
        args,
        getLocalTimeZone,
        modelValue,
        timeZone,
        debugUtcDate
      };
    },
    template: \`
            <div>Date: {{modelValue ?? "undefined"}}</div>
            <div>Date UTC: {{debugUtcDate}}</div>
            <div>Detected timezone (via @internationalized/date): {{getLocalTimeZone()}}</div>
            <LibTimeZonePicker
                v-model="timeZone"
                label="Override Time Zone"
                wrapper-class="[&_.suggestions]:max-h-[200px] [&_.suggestions]:overflow-y-auto"
            /> 
            <div>
                This component has no border, added here to see it's size.
            </div>
            <div class="border border-neutral-500">
                <LibDatePicker v-bind="args" v-model="modelValue" :time-zone="timeZone">
                    \${args.slot}
                </LibDatePicker>
            </div>
        \`
  })
}`,...(f=(g=e.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var b,v,D;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  ...Primary,
  args: {
    modelValue: {
      start: undefined,
      end: undefined
    }
  }
}`,...(D=(v=r.parameters)==null?void 0:v.docs)==null?void 0:D.source}}};var h,T,P;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    class: "[&_.trigger]:order-first"
  }
}`,...(P=(T=o.parameters)==null?void 0:T.docs)==null?void 0:P.source}}};var y,Z,$;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  ...Primary,
  args: {
    // @ts-expect-error see above
    slot: html\`
            <template #default="slotProps">
                <LibButton>Custom content can be added here.</LibButton>
                <p class="break-all">
                    Content has access to the internal temporary/suggested date value and can change it (e.g. set it to today).
                </p>	
                <p>Temp value:</p>
                {{ slotProps.tempValue }} 
            </template>
        \`
  }
}`,...($=(Z=s.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var L,U,V;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    showTime: true
  }
}`,...(V=(U=i.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var k,z,C;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    fallbackDate: createNoonUtcDate(new CalendarDate(2000, 1, 1)).toDate()
  }
}`,...(C=(z=d.parameters)==null?void 0:z.docs)==null?void 0:C.source}}};const G=["Primary","DateRange","IconTriggerFirst","BottomSlot","DateWithTime","WithDifferentFallbackDate"];export{s as BottomSlot,r as DateRange,i as DateWithTime,o as IconTriggerFirst,e as Primary,d as WithDifferentFallbackDate,G as __namedExportsOrder,q as default};
