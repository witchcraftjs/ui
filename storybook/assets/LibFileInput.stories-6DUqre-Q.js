import{r as c}from"./vue.esm-bundler-D34C2Wlw.js";import{c as d,j as p}from"./index-Cu-gwfJh.js";import"./LibRoot-CpCGCbRj.js";import"./iframe-Rr6GslXv.js";import"./twMerge-BZGhTDWl.js";const v={component:p,title:"Components/FileInput",args:{}},r={render:l=>({components:d,setup:()=>{const e=c([]);function i(n){console.log(n),e.value=n}return{args:l,errorHandler:i,errors:e}},template:`
            <lib-file-input v-bind="{...args}" @errors="errorHandler"></lib-file-input>
            <div
                v-if="errors.length > 0"
                class="border-2 border-red-500 rounded-lg p-2 mt-2 w-full"
            >
                <div v-for="err of errors" :key="err">
                    {{err}}
                </div>
            </div>
        `})},o={...r,args:{...r.args,multiple:!0}},s={...r,args:{...r.args,multiple:!0,formats:[]}},a={...r,args:{...r.args,compact:!0}},t={render:l=>({components:d,setup:()=>{const e=c([]);return{args:l,errors:e,errorHandler:n=>e.value=n}},template:`
            <lib-debug :title="'Errors'">{{errors}}</lib-debug>
            <lib-file-input v-bind="{...args}"  @errors="errorHandler"></lib-file-input>
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
            <lib-file-input v-bind="{...args}" @errors="errorHandler"></lib-file-input>
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
            <lib-debug :title="'Errors'">{{errors}}</lib-debug>
            <lib-file-input v-bind="{...args}"  @errors="errorHandler"></lib-file-input>
        \`
  })
}`,...t.parameters?.docs?.source}}};const F=["SingleFile","MultipleFile","AnyFormat","Compact","ErrorHandling"];export{s as AnyFormat,a as Compact,t as ErrorHandling,o as MultipleFile,r as SingleFile,F as __namedExportsOrder,v as default};
