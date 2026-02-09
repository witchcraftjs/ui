import{r as n,b as m}from"./vue.esm-bundler-D34C2Wlw.js";import{c as p,a as u}from"./storybook-Bw7eDEto.js";import{c as g,o as b}from"./index-Cu-gwfJh.js";import"./LibRoot-CpCGCbRj.js";import"./iframe-Rr6GslXv.js";import"./twMerge-BZGhTDWl.js";const R={component:b,title:"Components/Recorder",args:{label:"Some Label",recordingTitle:"Recording. Press enter or click away to accept. Press escape to cancel.",modelValue:"K E Y S"},parameters:{docs:{description:{component:`This is a special input component designed to record any type of event.

It requires additional setup to actually work since what and how anything is recorded is up to the needs of the application.

This basic implementation just lists the keys. Enter accepts the recording, escape cancels back to the initial value.`}}}},e={render:d=>({components:g,setup:()=>{const c=n(!1),t=n(""),s=n(d.modelValue),i=n(null),l=p(t,c,s,i);return m(u(t,c,s)),{args:d,modelValue:s,recorder:l,recording:c,recordingValue:t,recorderEl:i}},template:`
            <lib-recorder
                v-bind="args"
                v-extract-root-el="_ => recorderEl = _"
                :recordingValue="recordingValue"
                :recorder="recorder"
                v-model:recording="recording"
                v-model="modelValue"
                @recorder:click="recording = !recording"
            />
        `})},r={...e,args:{disabled:!0}},o={...e,args:{readonly:!0}},a={...e,args:{modelValue:""}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => {
      const recording = ref(false);
      const recordingValue = ref("");
      const modelValue = ref(args.modelValue);
      const recorderEl = ref(null);
      const recorder = createRecorderHandler(recordingValue, recording, modelValue, recorderEl);
      watchEffect(createRecorderWatchEffect(recordingValue, recording, modelValue));
      return {
        args,
        modelValue,
        recorder,
        recording,
        recordingValue,
        recorderEl
      };
    },
    template: \`
            <lib-recorder
                v-bind="args"
                v-extract-root-el="_ => recorderEl = _"
                :recordingValue="recordingValue"
                :recorder="recorder"
                v-model:recording="recording"
                v-model="modelValue"
                @recorder:click="recording = !recording"
            />
        \`
  })
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    disabled: true
  }
}`,...r.parameters?.docs?.source},description:{story:"Should not be tabbable or recordable.",...r.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    readonly: true
  }
}`,...o.parameters?.docs?.source},description:{story:"*Should* be tabbable but not recordable.",...o.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    modelValue: ""
  }
}`,...a.parameters?.docs?.source},description:{story:"Height should not shrink.",...a.parameters?.docs?.description}}};const S=["Primary","Disabled","Readonly","EmptyInitialValue"];export{r as Disabled,a as EmptyInitialValue,e as Primary,o as Readonly,S as __namedExportsOrder,R as default};
