import{r as o,o as b,c as S}from"./vue.esm-bundler-D34C2Wlw.js";import{r as g,c as V}from"./index-Cu-gwfJh.js";import"./LibRoot-CpCGCbRj.js";import"./iframe-Rr6GslXv.js";import"./twMerge-BZGhTDWl.js";const H={component:g,title:"Components/Suggestions",args:{id:"some-id",modelValue:"",label:"Some Label",border:!0,suggestions:["A","AB","ABC","B","BC","C","ABCDEFGHIJKLMNOPQRSTUVWXYZ"]}},e={render:s=>({components:{...V,LibSuggestions:g},setup:()=>{const t=o(s.modelValue),d=o(s.modelValue),n=o(null),m=u=>{n.value?.inputKeydownHandler(u)},p=S(()=>n.value?.suggestions),c=u=>{n.value?.inputBlurHandler(u)};return b(()=>{n.value?.suggestions.open()}),{args:s,inputValue:t,modelValue:d,isOpen:o(!1),suggestions:p,drawer:n,keydownHandler:m,blurHandler:c}},template:`
            <div class="flex flex-col gap-3">
            Temporary Value: {{inputValue}}
            <br/>
            Model Value (Final Value): <span class="inline-block" data-testid="model-value">{{modelValue}}</span>

            
<br/>
            Selected: {{suggestions?.filtered[suggestions.active]}}
            <label>Some Label</label>
                <lib-simple-input
                    :class="isOpen ? 'open' : ''"
                    v-model="inputValue"
                    @focus="suggestions.open()"
                    @blur="blurHandler"
                    @keydown="keydownHandler"
                ></lib-simple-input>
                <lib-suggestions
                    ref="drawer"
                    v-bind="{...args}"
                    @update:isOpen="isOpen = $event"
                    v-model="modelValue"
                    v-model:inputValue="inputValue"
                >
                    <template #item={item}>
                        {{item}}
                    </template>
                </lib-suggestions>
            </div>
        `})},r={...e,args:{...e.args,restrictToSuggestions:!0}},a={...e,args:{...e.args,restrictToSuggestions:!0,suggestionsFilter:(s,t)=>t}},l={...e,args:{...e.args,restrictToSuggestions:!1,suggestionsFilter:(s,t)=>t}},i={...e,args:{...e.args,restrictToSuggestions:!0,suggestions:[{label:"A",other:"some data A"},{label:"AB",other:"some data AB"},{label:"ABC",other:"some data ABC"},{label:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",other:"some data ABCDEFGHIJKLMNOPQRSTUVWXYZ"}],suggestionLabel:s=>s.label}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      ...components,
      LibSuggestions
    },
    setup: () => {
      const inputValue = ref(args.modelValue);
      const modelValue = ref(args.modelValue);
      const drawer = ref<ComponentExposed<typeof LibSuggestions> | null>(null);
      const keydownHandler = (e: KeyboardEvent): void => {
        drawer.value?.inputKeydownHandler(e);
      };
      const suggestions = computed(() => drawer.value?.suggestions);
      const blurHandler = (e: MouseEvent) => {
        drawer.value?.inputBlurHandler(e);
      };
      onMounted(() => {
        drawer.value?.suggestions.open();
      });
      return {
        args,
        inputValue,
        modelValue,
        isOpen: ref(false),
        suggestions,
        drawer,
        keydownHandler,
        blurHandler
      };
    },
    template: \`
            <div class="flex flex-col gap-3">
            Temporary Value: {{inputValue}}
            <br/>
            Model Value (Final Value): <span class="inline-block" data-testid="model-value">{{modelValue}}</span>\\n
            
<br/>
            Selected: {{suggestions?.filtered[suggestions.active]}}
            <label>Some Label</label>
                <lib-simple-input
                    :class="isOpen ? 'open' : ''"
                    v-model="inputValue"
                    @focus="suggestions.open()"
                    @blur="blurHandler"
                    @keydown="keydownHandler"
                ></lib-simple-input>
                <lib-suggestions
                    ref="drawer"
                    v-bind="{...args}"
                    @update:isOpen="isOpen = $event"
                    v-model="modelValue"
                    v-model:inputValue="inputValue"
                >
                    <template #item={item}>
                        {{item}}
                    </template>
                </lib-suggestions>
            </div>
        \`
  })
}`,...e.parameters?.docs?.source},description:{story:`The suggestions component is just the dropdown part.

Here it is decoupled from the input.

More examples can be found in the input component.`,...e.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    restrictToSuggestions: true
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    restrictToSuggestions: true,
    suggestionsFilter: (_input: string, items: string[]) => items
  }
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    restrictToSuggestions: false,
    suggestionsFilter: (_input: string, items: string[]) => items
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    restrictToSuggestions: true,
    suggestions: [{
      label: "A",
      other: "some data A"
    }, {
      label: "AB",
      other: "some data AB"
    }, {
      label: "ABC",
      other: "some data ABC"
    }, {
      label: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      other: "some data ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }],
    suggestionLabel: (item: any) => item.label
  }
}`,...i.parameters?.docs?.source}}};const T=["Primary","RestrictToSuggestions","AlwaysShowAllSuggestions","AlwaysShowAllSuggestionsAndNoRestrictToSuggestions","CustomSuggestionsObject"];export{a as AlwaysShowAllSuggestions,l as AlwaysShowAllSuggestionsAndNoRestrictToSuggestions,i as CustomSuggestionsObject,e as Primary,r as RestrictToSuggestions,T as __namedExportsOrder,H as default};
