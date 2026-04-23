import{r as c}from"./vue.esm-bundler-CTxwokHZ.js";import{c as p,j as u}from"./index-DfJKJ2pz.js";import"./WRoot-CWVU9Kei.js";import"./iframe-CDjnaJ6T.js";import"./twMerge-jiRaHU2K.js";const f={component:u,title:"Components/FileInput",args:{}},r={render:l=>({components:p,setup:()=>{const e=c([]);function i(n){console.log(n),e.value=n}return{args:l,errorHandler:i,errors:e}},template:`
            <WFileInput v-bind="{...args}" @errors="errorHandler"></WFileInput>
            <div
                v-if="errors.length > 0"
                class="border-2 border-red-500 rounded-lg p-2 mt-2 w-full"
            >
                <div v-for="err of errors" :key="err">
                    {{err}}
                </div>
            </div>
        `})},o={...r,args:{...r.args,multiple:!0}},s={...r,args:{...r.args,multiple:!0,formats:[]}},a={...r,args:{...r.args,compact:!0}},t={render:l=>({components:p,setup:()=>{const e=c([]);return{args:l,errors:e,errorHandler:n=>e.value=n}},template:`
            <WDebug :title="'Errors'">{{errors}}</WDebug>
            <WFileInput v-bind="{...args}"  @errors="errorHandler"></WFileInput>
        `})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => {
      const errors = ref([]);
      function errorHandler(errs: any) {
        // eslint-disable-next-line no-console
        console.log(errs);
        errors.value = errs;
      }
      return {
        args,
        errorHandler,
        errors
      };
    },
    template: \`
            <WFileInput v-bind="{...args}" @errors="errorHandler"></WFileInput>
            <div
                v-if="errors.length > 0"
                class="border-2 border-red-500 rounded-lg p-2 mt-2 w-full"
            >
                <div v-for="err of errors" :key="err">
                    {{err}}
                </div>
            </div>
        \`
  })
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...SingleFile,
  args: {
    ...SingleFile.args,
    multiple: true
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...SingleFile,
  args: {
    ...SingleFile.args,
    multiple: true,
    formats: []
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...SingleFile,
  args: {
    ...SingleFile.args,
    compact: true
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => {
      const errors = ref([]);
      const errorHandler = (e: any) => errors.value = e;
      return {
        args,
        errors,
        errorHandler
      };
    },
    template: \`
            <WDebug :title="'Errors'">{{errors}}</WDebug>
            <WFileInput v-bind="{...args}"  @errors="errorHandler"></WFileInput>
        \`
  })
}`,...t.parameters?.docs?.source}}};const b=["SingleFile","MultipleFile","AnyFormat","Compact","ErrorHandling"];export{s as AnyFormat,a as Compact,t as ErrorHandling,o as MultipleFile,r as SingleFile,b as __namedExportsOrder,f as default};
