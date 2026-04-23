import{d as v,c as D,$ as g,e as b,f as T,g as h,h as P}from"./index-DfJKJ2pz.js";import{r as p,c as Z}from"./vue.esm-bundler-CTxwokHZ.js";import"./WRoot-CWVU9Kei.js";import"./iframe-CDjnaJ6T.js";import"./twMerge-jiRaHU2K.js";function $(t,...n){return String.raw(t,...n)}const V={component:v,title:"Components/DatePicker",args:{_slot:"",_timeZone:g()}};function m(t,n){return h(P(t,n),"UTC").toAbsoluteString()}const e={render:t=>{const n=t;return{components:{...D},setup:()=>{const l=p(t.modelValue),u=p(n._timeZone),f=Z(()=>{const a=l.value,c=u.value;return a instanceof Date?m(a,c):typeof a=="object"?`Start: ${a.start?m(a.start,c):"undefined"}, End: ${a.end?m(a.end,c):"undefined"}`:"undefined"});return{args:t,getLocalTimeZone:g,modelValue:l,timeZone:u,debugUtcDate:f}},template:`
            <div>Date: {{modelValue ?? "undefined"}}</div>
            <div>Date UTC: {{debugUtcDate}}</div>
            <div>Detected timezone (via @internationalized/date): {{getLocalTimeZone()}}</div>
            <WTimeZonePicker
                v-model="timeZone"
                label="Override Time Zone"
                wrapper-class="[&_.suggestions]:max-h-[200px] [&_.suggestions]:overflow-y-auto"
            /> 
            <div>
                This component has no border, added here to see it's size.
            </div>
            <div class="border border-neutral-500">
                <WDatePicker v-bind="args" v-model="modelValue" :time-zone="timeZone">
                    ${n._slot}
                </WDatePicker>
            </div>
        `}}},r={...e,args:{modelValue:{start:void 0,end:void 0}}},o={...e,args:{...e.args,class:"[&_.date-picker--trigger]:order-first"}},s={...e,args:{_slot:$`
            <template #default="slotProps">
                <WButton>Custom content can be added here.</WButton>
                <p class="break-all">
                    Content has access to the internal temporary/suggested date value and can change it (e.g. set it to today).
                </p>	
                <p>Temp value:</p>
                {{ slotProps.tempValue }} 
            </template>
        `}},d={...e,args:{...e.args,showTime:!0}},i={...e,args:{...e.args,fallbackDate:b(new T(2e3,1,1)).toDate()}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => {
    const extraArgs = args as ExtraTestArgs;
    return {
      components: {
        ...components
      },
      setup: () => {
        const modelValue = ref(args.modelValue);
        const timeZone = ref(extraArgs._timeZone);
        const debugUtcDate = computed(() => {
          const m = modelValue.value;
          const z = timeZone.value!;
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
            <WTimeZonePicker
                v-model="timeZone"
                label="Override Time Zone"
                wrapper-class="[&_.suggestions]:max-h-[200px] [&_.suggestions]:overflow-y-auto"
            /> 
            <div>
                This component has no border, added here to see it's size.
            </div>
            <div class="border border-neutral-500">
                <WDatePicker v-bind="args" v-model="modelValue" :time-zone="timeZone">
                    \${extraArgs._slot}
                </WDatePicker>
            </div>
        \`
    };
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    modelValue: {
      start: undefined,
      end: undefined
    }
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    class: "[&_.date-picker--trigger]:order-first"
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    _slot: html\`
            <template #default="slotProps">
                <WButton>Custom content can be added here.</WButton>
                <p class="break-all">
                    Content has access to the internal temporary/suggested date value and can change it (e.g. set it to today).
                </p>	
                <p>Temp value:</p>
                {{ slotProps.tempValue }} 
            </template>
        \`
  }
}`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    showTime: true
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    fallbackDate: createNoonUtcDate(new CalendarDate(2000, 1, 1)).toDate()
  }
}`,...i.parameters?.docs?.source}}};const W=["Primary","DateRange","IconTriggerFirst","BottomSlot","DateWithTime","WithDifferentFallbackDate"];export{s as BottomSlot,r as DateRange,d as DateWithTime,o as IconTriggerFirst,e as Primary,i as WithDifferentFallbackDate,W as __namedExportsOrder,V as default};
