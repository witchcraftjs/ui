import{r as n,d as H}from"./vue.esm-bundler-Cybg3BJD.js";import{c as I,a as T}from"./storybook-BfeLRtyP.js";import{s as D,c as W}from"./index-nZYlgcY9.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const Y={component:D,title:"Components/Recorder",args:{label:"Some Label",recordingTitle:"Recording. Press enter or click away to accept. Press escape to cancel.",modelValue:"K E Y S"},parameters:{docs:{description:{component:`This is a special input component designed to record any type of event.

It requires additional setup to actually work since what and how anything is recorded is up to the needs of the application.

This basic implementation just lists the keys. Enter accepts the recording, escape cancels back to the initial value.`}}}},e={render:d=>({components:W,setup:()=>{const c=n(!1),t=n(""),s=n(d.modelValue),i=n(null),x=I(t,c,s,i);return H(T(t,c,s)),{args:d,modelValue:s,recorder:x,recording:c,recordingValue:t,recorderEl:i}},template:`
            <lib-recorder
                v-bind="args"
                v-extract-root-el="_ => recorderEl = _"
                :recordingValue="recordingValue"
                :recorder="recorder"
                v-model:recording="recording"
                v-model="modelValue"
                @recorder:click="recording = !recording"
            />
        `})},r={...e,args:{disabled:!0}},o={...e,args:{readonly:!0}},a={...e,args:{modelValue:""}};var l,m,p;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(p=(m=e.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,g,b,V,f;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  ...Primary,
  args: {
    disabled: true
  }
}`,...(b=(g=r.parameters)==null?void 0:g.docs)==null?void 0:b.source},description:{story:"Should not be tabbable or recordable.",...(f=(V=r.parameters)==null?void 0:V.docs)==null?void 0:f.description}}};var y,h,E,v,R;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  ...Primary,
  args: {
    readonly: true
  }
}`,...(E=(h=o.parameters)==null?void 0:h.docs)==null?void 0:E.source},description:{story:"*Should* be tabbable but not recordable.",...(R=(v=o.parameters)==null?void 0:v.docs)==null?void 0:R.description}}};var S,_,k,P,w;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  ...Primary,
  args: {
    modelValue: ""
  }
}`,...(k=(_=a.parameters)==null?void 0:_.docs)==null?void 0:k.source},description:{story:"Height should not shrink.",...(w=(P=a.parameters)==null?void 0:P.docs)==null?void 0:w.description}}};const z=["Primary","Disabled","Readonly","EmptyInitialValue"];export{r as Disabled,a as EmptyInitialValue,e as Primary,o as Readonly,z as __namedExportsOrder,Y as default};
