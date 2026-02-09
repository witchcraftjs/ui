import{c as f,d as b,$ as p,e as v,f as D,g as h,h as T}from"./index-Cu-gwfJh.js";import{r as u,c as P}from"./vue.esm-bundler-D34C2Wlw.js";import"./LibRoot-CpCGCbRj.js";import"./iframe-Rr6GslXv.js";import"./twMerge-BZGhTDWl.js";function y(t,...n){return String.raw(t,...n)}const k={component:b,title:"Components/DatePicker",args:{slot:"",timeZone:p()}};function m(t,n){return h(T(t,n),"UTC").toAbsoluteString()}const e={render:t=>({components:{...f},setup:()=>{const n=u(t.modelValue),l=u(t.timeZone),g=P(()=>{const a=n.value,c=l.value;return a instanceof Date?m(a,c):typeof a=="object"?`Start: ${a.start?m(a.start,c):"undefined"}, End: ${a.end?m(a.end,c):"undefined"}`:"undefined"});return{args:t,getLocalTimeZone:p,modelValue:n,timeZone:l,debugUtcDate:g}},template:`
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
        `})},r={...e,args:{modelValue:{start:void 0,end:void 0}}},o={...e,args:{...e.args,class:"[&_.trigger]:order-first"}},s={...e,args:{slot:y`
            <template #default="slotProps">
                <LibButton>Custom content can be added here.</LibButton>
                <p class="break-all">
                    Content has access to the internal temporary/suggested date value and can change it (e.g. set it to today).
                </p>	
                <p>Temp value:</p>
                {{ slotProps.tempValue }} 
            </template>
        `}},i={...e,args:{...e.args,showTime:!0}},d={...e,args:{...e.args,fallbackDate:v(new D(2e3,1,1)).toDate()}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
    class: "[&_.trigger]:order-first"
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    showTime: true
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    fallbackDate: createNoonUtcDate(new CalendarDate(2000, 1, 1)).toDate()
  }
}`,...d.parameters?.docs?.source}}};const z=["Primary","DateRange","IconTriggerFirst","BottomSlot","DateWithTime","WithDifferentFallbackDate"];export{s as BottomSlot,r as DateRange,i as DateWithTime,o as IconTriggerFirst,e as Primary,d as WithDifferentFallbackDate,z as __namedExportsOrder,k as default};
