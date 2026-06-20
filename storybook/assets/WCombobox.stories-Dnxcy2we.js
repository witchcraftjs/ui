import{r as c,w as P}from"./vue.esm-bundler-Cz0KJNfX.js";import{w as i,u as s,a as w,e as r}from"./index-d5Mg2zPP.js";import{v as L,c as _}from"./index-ClhmqbYJ.js";import"./WRoot-BHhJ4_mq.js";import"./iframe-CxoCKbua.js";import"./twMerge-CLwyhV7-.js";const f=async({canvasElement:t})=>{const e=i(t),a=e.getByRole("combobox");await s.clear(a),await s.type(a,"A"),await r(e.getByTestId("model-value")).toHaveTextContent("A"),await s.clear(a),await s.type(a,"[Esc]"),await r(e.getByTestId("search-term")).toHaveTextContent(""),await r(e.getByTestId("model-value")).toHaveTextContent("A")},x=async({canvasElement:t})=>{const e=i(t),a=e.getByRole("combobox");await s.clear(a),await s.type(a,"A"),await r(e.getByRole("listbox")).toBeInTheDocument(),await s.keyboard("{ArrowDown}");const o=e.getAllByRole("option");await r(o[1]).toHaveAttribute("data-highlighted"),await s.keyboard("{Enter}"),await r(e.getByTestId("model-value")).toHaveTextContent(o[0].textContent?.trim()??"")},T=async({canvasElement:t})=>{const e=i(t),a=e.getByRole("combobox");await s.clear(a),await s.click(a);const o=e.getByRole("option",{name:"AB"});await s.click(o),await r(e.getByTestId("model-value")).toHaveTextContent("AB"),await w(()=>{r(e.queryByRole("listbox")).not.toBeInTheDocument()})},S=async({canvasElement:t})=>{const a=i(t).getByRole("combobox");await s.clear(a),await s.type(a,"Invalid"),await s.click(a);const o=i(document.body);await w(()=>{r(o.getByRole("alert")).toBeInTheDocument()})},V=async({canvasElement:t})=>{const e=i(t),a=e.getByRole("combobox");await s.clear(a);const o="New Custom Value";await s.type(a,o);const l=i(document.body);await w(()=>{r(l.getByText(/Press Enter to Add Value/i)).toBeInTheDocument()}),await s.keyboard("{Enter}"),await r(e.getByTestId("model-value")).toHaveTextContent(o),await s.clear(a),await s.type(a,o),r(l.queryByText(/Press Enter to Add Value/i)).not.toBeInTheDocument(),await s.clear(a),await s.type(a,"New"),await w(()=>{r(l.getByRole("option",{name:o})).toBeInTheDocument()})};f.__docgenInfo={exportName:"playBasic",displayName:"playBasic",type:2,props:[{name:"canvasElement",global:!1,description:"",tags:[],required:!0,type:"HTMLElement",declarations:[],schema:{kind:"object",type:"HTMLElement"}},{name:"args",global:!1,description:"",tags:[],required:!0,type:"any",declarations:[],schema:"any"}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/ui/ui/src/runtime/components/WCombobox/storyPlays.ts"};x.__docgenInfo={exportName:"playBasicKeyboardSelect",displayName:"playBasicKeyboardSelect",type:2,props:[{name:"canvasElement",global:!1,description:"",tags:[],required:!0,type:"HTMLElement",declarations:[],schema:{kind:"object",type:"HTMLElement"}},{name:"args",global:!1,description:"",tags:[],required:!0,type:"any",declarations:[],schema:"any"}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/ui/ui/src/runtime/components/WCombobox/storyPlays.ts"};T.__docgenInfo={exportName:"playBasicClickSelect",displayName:"playBasicClickSelect",type:2,props:[{name:"canvasElement",global:!1,description:"",tags:[],required:!0,type:"HTMLElement",declarations:[],schema:{kind:"object",type:"HTMLElement"}},{name:"args",global:!1,description:"",tags:[],required:!0,type:"any",declarations:[],schema:"any"}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/ui/ui/src/runtime/components/WCombobox/storyPlays.ts"};S.__docgenInfo={exportName:"playValidation",displayName:"playValidation",type:2,props:[{name:"canvasElement",global:!1,description:"",tags:[],required:!0,type:"HTMLElement",declarations:[],schema:{kind:"object",type:"HTMLElement"}}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/ui/ui/src/runtime/components/WCombobox/storyPlays.ts"};V.__docgenInfo={exportName:"playAllowNewValues",displayName:"playAllowNewValues",type:2,props:[{name:"canvasElement",global:!1,description:"",tags:[],required:!0,type:"HTMLElement",declarations:[],schema:{kind:"object",type:"HTMLElement"}}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/ui/ui/src/runtime/components/WCombobox/storyPlays.ts"};const M={component:L,title:"Components/Combobox",args:{modelValue:"",searchTerm:"",emptyLabel:"No matches found",suggestions:["A","AB","ABC","B","BC","C","ABCDEFGHIJKLMNOPQRSTUVWXYZ"]}},n={render:t=>{const e=t;return{components:_,setup(){const a=c(e.modelValue),o=c(e.searchTerm),l=c([...e.suggestions]),h=c(!1),C=c(e._simulateLoading);P(o,()=>{C.value&&(h.value=!0,setTimeout(()=>{h.value=!1},1))});function k(b){if(!e._allowSave)return;const B=typeof b=="string"&&typeof l.value[0]=="object"?{name:b,id:"new-id"}:b;l.value=[...l.value,B],a.value=B}return{args:e,modelValue:a,searchTerm:o,suggestions:l,loading:h,simulateLoading:C,save:k}},template:`
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
                        ${e._headerTemplate??""}
                    </WCombobox>
                </div>
            </div>
        `}},play:async(...t)=>{await T(...t),await x(...t),await f(...t)}},m={...n,args:{...n.args,restrictToSuggestions:!0},play:async(...t)=>{await T(...t),await x(...t),await f(...t)}},u={...n,play:void 0,args:{...n.args,suggestions:[{id:1,name:"Apple"},{id:2,name:"Banana"},{id:3,name:"Cherry"}],displayKey:"name"}},p={...n,args:{...n.args,_allowSave:!0,_headerTemplate:`
        <template #header="slotProps">
            <div v-if="slotProps.isShowingEmptyLabel" :class="slotProps.class">
                Press Enter to Add Value
            </div>
        </template>
        `},play:V},d={...n,play:void 0,args:{...n.args,_allowSave:!0,suggestions:[{id:1,name:"Apple"},{id:2,name:"Banana"},{id:3,name:"Cherry"}],displayEntry:t=>t.name?.toLowerCase()}},g={...n,play:void 0,args:{...n.args,loading:!0,_headerTemplate:"<template #header> Custom Header </template>"}},y={...n,args:{...n.args,loading:!0,isValid:t=>t==="Invalid"?"Error Message":!0,modelValue:"Invalid"},play:S},v={...n,play:void 0,args:{...n.args,_simulateLoading:!0}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: components as any,
      setup() {
        const modelValue = ref(args.modelValue);
        const searchTerm = ref(args.searchTerm);
        const suggestions = ref([...args.suggestions!]);
        const loading = ref(false);
        const simulateLoading = ref(args._simulateLoading);
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
          if (!args._allowSave) return;
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
          save
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
                        \${args._headerTemplate ?? ""}
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
