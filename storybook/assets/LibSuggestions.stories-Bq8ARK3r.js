import{r as a,c as k,o as E}from"./vue.esm-bundler-Cybg3BJD.js";import{v as O,c as R}from"./index-nZYlgcY9.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const G={component:O,title:"Components/Suggestions",args:{id:"some-id",modelValue:"",label:"Some Label",border:!0,suggestions:["A","AB","ABC","B","BC","C","ABCDEFGHIJKLMNOPQRSTUVWXYZ"]}},e={render:t=>({components:{...R,LibSuggestions:O},setup:()=>{const n=a(t.modelValue),P=a(t.modelValue),o=a(null),L=s=>{var r;(r=o.value)==null||r.inputKeydownHandler(s)},F=k(()=>{var s;return(s=o.value)==null?void 0:s.suggestions}),M=s=>{var r;(r=o.value)==null||r.inputBlurHandler(s)};return E(()=>{var s;(s=o.value)==null||s.suggestions.open()}),{args:t,inputValue:n,modelValue:P,isOpen:a(!1),suggestions:F,drawer:o,keydownHandler:L,blurHandler:M}},template:`
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
        `})},l={...e,args:{...e.args,restrictToSuggestions:!0}},i={...e,args:{...e.args,restrictToSuggestions:!0,suggestionsFilter:(t,n)=>n}},u={...e,args:{...e.args,restrictToSuggestions:!1,suggestionsFilter:(t,n)=>n}},g={...e,args:{...e.args,restrictToSuggestions:!0,suggestions:[{label:"A",other:"some data A"},{label:"AB",other:"some data AB"},{label:"ABC",other:"some data ABC"},{label:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",other:"some data ABCDEFGHIJKLMNOPQRSTUVWXYZ"}],suggestionLabel:t=>t.label}};var d,m,p,c,b;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(p=(m=e.parameters)==null?void 0:m.docs)==null?void 0:p.source},description:{story:`The suggestions component is just the dropdown part.

Here it is decoupled from the input.

More examples can be found in the input component.`,...(b=(c=e.parameters)==null?void 0:c.docs)==null?void 0:b.description}}};var S,V,v;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    restrictToSuggestions: true
  }
}`,...(v=(V=l.parameters)==null?void 0:V.docs)==null?void 0:v.source}}};var A,y,w;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    restrictToSuggestions: true,
    suggestionsFilter: (_input: string, items: string[]) => items
  }
}`,...(w=(y=i.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var f,H,T;u.parameters={...u.parameters,docs:{...(f=u.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    restrictToSuggestions: false,
    suggestionsFilter: (_input: string, items: string[]) => items
  }
}`,...(T=(H=u.parameters)==null?void 0:H.docs)==null?void 0:T.source}}};var B,h,C;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(C=(h=g.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const I=["Primary","RestrictToSuggestions","AlwaysShowAllSuggestions","AlwaysShowAllSuggestionsAndNoRestrictToSuggestions","CustomSuggestionsObject"];export{i as AlwaysShowAllSuggestions,u as AlwaysShowAllSuggestionsAndNoRestrictToSuggestions,g as CustomSuggestionsObject,e as Primary,l as RestrictToSuggestions,I as __namedExportsOrder,G as default};
