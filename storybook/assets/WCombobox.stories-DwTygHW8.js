import{r as c,w as k}from"./vue.esm-bundler-CTxwokHZ.js";import{w as l,u as s,a as w,e as r}from"./index-CuTPwqe7.js";import{q as P,c as E}from"./index-DfJKJ2pz.js";import"./WRoot-CWVU9Kei.js";import"./iframe-CDjnaJ6T.js";import"./twMerge-jiRaHU2K.js";const x=async({canvasElement:e})=>{const t=l(e),a=t.getByRole("combobox");await s.clear(a),await s.type(a,"A"),await r(t.getByTestId("model-value")).toHaveTextContent("A"),await s.clear(a),await s.type(a,"[Esc]"),await r(t.getByTestId("search-term")).toHaveTextContent(""),await r(t.getByTestId("model-value")).toHaveTextContent("A")},f=async({canvasElement:e})=>{const t=l(e),a=t.getByRole("combobox");await s.clear(a),await s.type(a,"A"),await r(t.getByRole("listbox")).toBeInTheDocument(),await s.keyboard("{ArrowDown}");const o=t.getAllByRole("option");await r(o[1]).toHaveAttribute("data-highlighted"),await s.keyboard("{Enter}"),await r(t.getByTestId("model-value")).toHaveTextContent(o[0].textContent?.trim()??"")},T=async({canvasElement:e})=>{const t=l(e),a=t.getByRole("combobox");await s.clear(a),await s.click(a);const o=t.getByRole("option",{name:"AB"});await s.click(o),await r(t.getByTestId("model-value")).toHaveTextContent("AB"),await w(()=>{r(t.queryByRole("listbox")).not.toBeInTheDocument()})},S=async({canvasElement:e})=>{const a=l(e).getByRole("combobox");await s.clear(a),await s.type(a,"Invalid"),await s.click(a);const o=l(document.body);await w(()=>{r(o.getByRole("alert")).toBeInTheDocument()})},V=async({canvasElement:e})=>{const t=l(e),a=t.getByRole("combobox");await s.clear(a);const o="New Custom Value";await s.type(a,o);const i=l(document.body);await w(()=>{r(i.getByText(/Press Enter to Add Value/i)).toBeInTheDocument()}),await s.keyboard("{Enter}"),await r(t.getByTestId("model-value")).toHaveTextContent(o),await s.clear(a),await s.type(a,o),r(i.queryByText(/Press Enter to Add Value/i)).not.toBeInTheDocument(),await s.clear(a),await s.type(a,"New"),await w(()=>{r(i.getByRole("option",{name:o})).toBeInTheDocument()})};x.__docgenInfo={exportName:"playBasic",displayName:"playBasic",type:2,props:[{name:"canvasElement",global:!1,description:"",tags:[],required:!0,type:"HTMLElement",declarations:[],schema:{kind:"object",type:"HTMLElement"}},{name:"args",global:!1,description:"",tags:[],required:!0,type:"any",declarations:[],schema:"any"}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/ui/ui/src/runtime/components/WCombobox/storyPlays.ts"};f.__docgenInfo={exportName:"playBasicKeyboardSelect",displayName:"playBasicKeyboardSelect",type:2,props:[{name:"canvasElement",global:!1,description:"",tags:[],required:!0,type:"HTMLElement",declarations:[],schema:{kind:"object",type:"HTMLElement"}},{name:"args",global:!1,description:"",tags:[],required:!0,type:"any",declarations:[],schema:"any"}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/ui/ui/src/runtime/components/WCombobox/storyPlays.ts"};T.__docgenInfo={exportName:"playBasicClickSelect",displayName:"playBasicClickSelect",type:2,props:[{name:"canvasElement",global:!1,description:"",tags:[],required:!0,type:"HTMLElement",declarations:[],schema:{kind:"object",type:"HTMLElement"}},{name:"args",global:!1,description:"",tags:[],required:!0,type:"any",declarations:[],schema:"any"}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/ui/ui/src/runtime/components/WCombobox/storyPlays.ts"};S.__docgenInfo={exportName:"playValidation",displayName:"playValidation",type:2,props:[{name:"canvasElement",global:!1,description:"",tags:[],required:!0,type:"HTMLElement",declarations:[],schema:{kind:"object",type:"HTMLElement"}}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/ui/ui/src/runtime/components/WCombobox/storyPlays.ts"};V.__docgenInfo={exportName:"playAllowNewValues",displayName:"playAllowNewValues",type:2,props:[{name:"canvasElement",global:!1,description:"",tags:[],required:!0,type:"HTMLElement",declarations:[],schema:{kind:"object",type:"HTMLElement"}}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/ui/ui/src/runtime/components/WCombobox/storyPlays.ts"};const M={component:P,title:"Components/Combobox",args:{modelValue:"",searchTerm:"",emptyLabel:"No matches found",suggestions:["A","AB","ABC","B","BC","C","ABCDEFGHIJKLMNOPQRSTUVWXYZ"]}},n={render:e=>{const t=e;return{components:E,setup(){const a=c(e.modelValue),o=c(e.searchTerm),i=c([...e.suggestions]),h=c(!1),C=c(t._simulateLoading);k(o,()=>{C.value&&(h.value=!0,setTimeout(()=>{h.value=!1},1))});function A(b){if(!t._allowSave)return;const B=typeof b=="string"&&typeof i.value[0]=="object"?{name:b,id:"new-id"}:b;i.value=[...i.value,B],a.value=B}return{args:e,modelValue:a,searchTerm:o,suggestions:i,loading:h,simulateLoading:C,save:A,extraArgs:t}},template:`
            <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                    <WCheckbox v-model="simulateLoading">Simulate Loading</WCheckbox>
                    <WCheckbox v-model="loading">Loading (Force State)</WCheckbox>
                </div>
                <div class="text-xs text-neutral-500">
                    <div>
                        Current Model Value: 
                        <span class="font-mono" data-testid="model-value">{{ modelValue }}</span>
                    </div>
                    <div>
                        Current Search Term: 
                        <span class="font-mono" data-testid="search-term">{{ searchTerm }}</span>
                    </div>
                </div>

                <div class="flex flex-col gap-1">
                    <WCombobox
                        @save="save"
                        v-bind="args"
                        v-model="modelValue"
                        v-model:searchTerm="searchTerm"
                        :suggestions="suggestions"
                        :loading="loading"
                    >
                        ${t._headerTemplate??""}
                    </WCombobox>
                </div>
            </div>
        `}},play:async(...e)=>{await T(...e),await f(...e),await x(...e)}},m={...n,args:{...n.args,restrictToSuggestions:!0},play:async(...e)=>{await T(...e),await f(...e),await x(...e)}},u={...n,play:void 0,args:{...n.args,suggestions:[{id:1,name:"Apple"},{id:2,name:"Banana"},{id:3,name:"Cherry"}],displayKey:"name"}},p={...n,args:{...n.args,_allowSave:!0,_headerTemplate:`
        <template #header="slotProps">
            <div v-if="slotProps.isShowingEmptyLabel" :class="slotProps.class">
                Press Enter to Add Value
            </div>
        </template>
        `},play:V},d={...n,play:void 0,args:{...n.args,_allowSave:!0,suggestions:[{id:1,name:"Apple"},{id:2,name:"Banana"},{id:3,name:"Cherry"}],displayEntry:e=>e.name?.toLowerCase()}},g={...n,play:void 0,args:{...n.args,loading:!0,_headerTemplate:"<template #header> Custom Header </template>"}},y={...n,args:{...n.args,loading:!0,isValid:e=>e==="Invalid"?"Error Message":!0,modelValue:"Invalid"},play:S},v={...n,play:void 0,args:{...n.args,_simulateLoading:!0}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => {
    const extraArgs = args as ExtraTestArgs;
    return {
      components,
      setup() {
        const modelValue = ref(args.modelValue);
        const searchTerm = ref(args.searchTerm);
        const suggestions = ref([...args.suggestions!]);
        const loading = ref(false);
        const simulateLoading = ref(extraArgs._simulateLoading);
        // the component takes care of extending this so we can actually see the icon on quick loads like this
        watch(searchTerm, () => {
          if (simulateLoading.value) {
            loading.value = true;
            setTimeout(() => {
              loading.value = false;
            }, 1);
          }
        });
        function save(value: string) {
          if (!extraArgs._allowSave) return;
          const newValue: any = typeof value === "string" && typeof suggestions.value[0] === "object" ? {
            name: value,
            id: "new-id"
          } : value;
          suggestions.value = [...suggestions.value, newValue];
          modelValue.value = newValue;
        }
        return {
          args,
          modelValue,
          searchTerm,
          suggestions,
          loading,
          simulateLoading,
          save,
          extraArgs
        };
      },
      template: \`
            <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                    <WCheckbox v-model="simulateLoading">Simulate Loading</WCheckbox>
                    <WCheckbox v-model="loading">Loading (Force State)</WCheckbox>
                </div>
                <div class="text-xs text-neutral-500">
                    <div>
                        Current Model Value: 
                        <span class="font-mono" data-testid="model-value">{{ modelValue }}</span>
                    </div>
                    <div>
                        Current Search Term: 
                        <span class="font-mono" data-testid="search-term">{{ searchTerm }}</span>
                    </div>
                </div>

                <div class="flex flex-col gap-1">
                    <WCombobox
                        @save="save"
                        v-bind="args"
                        v-model="modelValue"
                        v-model:searchTerm="searchTerm"
                        :suggestions="suggestions"
                        :loading="loading"
                    >
                        \${extraArgs._headerTemplate ?? ""}
                    </WCombobox>
                </div>
            </div>
        \`
    };
  },
  play: async (...args) => {
    await playBasicClickSelect(...args);
    await playBasicKeyboardSelect(...args);
    await playBasic(...args);
  }
}`,...n.parameters?.docs?.source},description:{story:`Primary story setup to match the DOM structure expected by the
migrated play functions (specifically looking for data-testid="model-value").`,...n.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    restrictToSuggestions: true
  },
  play: async (...args) => {
    await playBasicClickSelect(...args);
    await playBasicKeyboardSelect(...args);
    await playBasic(...args);
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...Primary,
  play: undefined,
  args: {
    ...Primary.args,
    suggestions: [{
      id: 1,
      name: "Apple"
    }, {
      id: 2,
      name: "Banana"
    }, {
      id: 3,
      name: "Cherry"
    }] as any[],
    displayKey: "name"
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    _allowSave: true,
    _headerTemplate: \`
        <template #header="slotProps">
            <div v-if="slotProps.isShowingEmptyLabel" :class="slotProps.class">
                Press Enter to Add Value
            </div>
        </template>
        \`
  },
  play: playAllowNewValues
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...Primary,
  play: undefined,
  args: {
    ...Primary.args,
    _allowSave: true,
    suggestions: [{
      id: 1,
      name: "Apple"
    }, {
      id: 2,
      name: "Banana"
    }, {
      id: 3,
      name: "Cherry"
    }] as any[],
    displayEntry: (value: any) => {
      return value.name?.toLowerCase();
    }
  }
}`,...d.parameters?.docs?.source},description:{story:"Note that when allowing new values to be added, if the input is v-modeling objects, you have to transform the object before adding it to the suggestions array.",...d.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  ...Primary,
  play: undefined,
  args: {
    ...Primary.args,
    loading: true,
    _headerTemplate: \`<template #header> Custom Header </template>\`
  }
}`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    loading: true,
    isValid: (searchTerm: string) => searchTerm === "Invalid" ? "Error Message" : true,
    modelValue: "Invalid"
  },
  play: playValidation
}`,...y.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  ...Primary,
  play: undefined,
  args: {
    ...Primary.args,
    _simulateLoading: true
  }
}`,...v.parameters?.docs?.source}}};const R=["Primary","RestrictToSuggestions","ObjectSuggestions","AllowNewValues","ObjectSuggestionsCustomDisplay","CustomHeader","WithValidation","LoadingIndicator"];export{p as AllowNewValues,g as CustomHeader,v as LoadingIndicator,u as ObjectSuggestions,d as ObjectSuggestionsCustomDisplay,n as Primary,m as RestrictToSuggestions,y as WithValidation,R as __namedExportsOrder,M as default};
