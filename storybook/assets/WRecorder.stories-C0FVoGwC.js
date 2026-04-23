import{r as i,d as f}from"./vue.esm-bundler-CTxwokHZ.js";import{v as y}from"./vExtractRootEl-DETW6UcW.js";import{r as p,c as v,s as b}from"./index-DfJKJ2pz.js";import"./WRoot-CWVU9Kei.js";import"./iframe-CDjnaJ6T.js";import"./twMerge-jiRaHU2K.js";const m=(r,o,t,a)=>({keydown(e){if(e.preventDefault(),!p(e)&&e.key==="Escape"){r.value=t.value,o.value=!1;return}if(!p(e)&&e.key==="Enter"){o.value=!1;return}r.value+=` ${e.key}`},mousedown(e){const l=e.target,u=a.value;l===u||u?.contains(l)||(r.value+=` ${e.button}`,e.preventDefault())},wheel(e){r.value+=` ${e.deltaY>0?"↓":"↑"}`,e.preventDefault()}}),g=(r,o,t,a)=>()=>{o.value||(r.value&&(a?.value?(a.value.push(r.value),t.value=""):t.value=r.value),r.value="")};m.__docgenInfo={exportName:"createRecorderHandler",displayName:"createRecorderHandler",type:2,props:[{name:"value",global:!1,description:"",tags:[],required:!0,type:"string",declarations:[],schema:"string"},{name:"__@RefSymbol@944",global:!1,description:`Type differentiator only.
We need this to be in public d.ts but don't want it to show up in IDE
autocomplete, so we use a private Symbol instead.`,tags:[],required:!0,type:"true",declarations:[],schema:"true"}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/ui/ui/src/runtime/helpers/storybook.ts"};g.__docgenInfo={exportName:"createRecorderWatchEffect",displayName:"createRecorderWatchEffect",type:2,props:[{name:"value",global:!1,description:"",tags:[],required:!0,type:"string",declarations:[],schema:"string"},{name:"__@RefSymbol@944",global:!1,description:`Type differentiator only.
We need this to be in public d.ts but don't want it to show up in IDE
autocomplete, so we use a private Symbol instead.`,tags:[],required:!0,type:"true",declarations:[],schema:"true"}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/ui/ui/src/runtime/helpers/storybook.ts"};const k={component:b,title:"Components/Recorder",args:{recordingTitle:"Recording. Press enter or click away to accept. Press escape to cancel.",modelValue:"K E Y S"},parameters:{docs:{description:{component:`This is a special input component designed to record any type of event.

It requires additional setup to actually work since what and how anything is recorded is up to the needs of the application.

This basic implementation just lists the keys. Enter accepts the recording, escape cancels back to the initial value.`}}}},n={render:r=>({components:v,directives:{vExtractRootEl:y},setup:()=>{const o=i(!1),t=i(""),a=i(r.modelValue),e=i(null),l=m(t,o,a,e);return f(g(t,o,a)),{args:r,modelValue:a,recorder:l,recording:o,recordingValue:t,recorderEl:e}},template:`
            <WRecorder
                v-bind="args"
                v-extract-root-el="_ => recorderEl = _"
                :recordingValue="recordingValue"
                :recorder="recorder"
                v-model:recording="recording"
                v-model="modelValue"
                @recorder:pointerdown="recording = !recording"
                @recorder:blur="recordingValue = modelValue; recording = false"
            />
        `})},s={...n,args:{disabled:!0}},c={...n,args:{readonly:!0}},d={...n,args:{modelValue:""}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    directives: {
      vExtractRootEl
    },
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
            <WRecorder
                v-bind="args"
                v-extract-root-el="_ => recorderEl = _"
                :recordingValue="recordingValue"
                :recorder="recorder"
                v-model:recording="recording"
                v-model="modelValue"
                @recorder:pointerdown="recording = !recording"
                @recorder:blur="recordingValue = modelValue; recording = false"
            />
        \`
  })
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    disabled: true
  }
}`,...s.parameters?.docs?.source},description:{story:"Should not be tabbable or recordable.",...s.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    readonly: true
  }
}`,...c.parameters?.docs?.source},description:{story:"*Should* be tabbable but not recordable.",...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    modelValue: ""
  }
}`,...d.parameters?.docs?.source},description:{story:"Height should not shrink.",...d.parameters?.docs?.description}}};const S=["Primary","Disabled","Readonly","EmptyInitialValue"];export{s as Disabled,d as EmptyInitialValue,n as Primary,c as Readonly,S as __namedExportsOrder,k as default};
