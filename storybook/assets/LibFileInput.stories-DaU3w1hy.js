import{r as c}from"./vue.esm-bundler-BHVC7zIi.js";import{j as u,c as i}from"./index-D2G9LM0b.js";import"./LibRoot-CoN-ifen.js";import"./iframe-BSTD6wzt.js";import"./twMerge-CudCRF6p.js";const F={component:u,title:"Components/FileInput",args:{}},r={render:t=>({components:i,setup:()=>{function e(l){console.log(l)}return{args:t,errorHandler:e}},template:`
            <lib-file-input v-bind="{...args}" @errors="errorHandler"></lib-file-input>
        `})},n={...r,args:{...r.args,multiple:!0}},o={...r,args:{...r.args,multiple:!0,formats:[]}},s={...r,args:{...r.args,compact:!0}},a={render:t=>({components:i,setup:()=>{const e=c([]);return{args:t,errors:e,errorHandler:p=>e.value=p}},template:`
            <lib-debug :title="'Errors'">{{errors}}</lib-debug>
            <lib-file-input v-bind="{...args}"  @errors="errorHandler"></lib-file-input>
        `})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => {
      function errorHandler(e: any): void {
        // eslint-disable-next-line no-console
        console.log(e);
      }
      return {
        args,
        errorHandler
      };
    },
    template: \`
            <lib-file-input v-bind="{...args}" @errors="errorHandler"></lib-file-input>
        \`
  })
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...SingleFile,
  args: {
    ...SingleFile.args,
    multiple: true
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...SingleFile,
  args: {
    ...SingleFile.args,
    multiple: true,
    formats: []
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...SingleFile,
  args: {
    ...SingleFile.args,
    compact: true
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const H=["SingleFile","MultipleFile","AnyFormat","Compact","ErrorHandling"];export{o as AnyFormat,s as Compact,a as ErrorHandling,n as MultipleFile,r as SingleFile,H as __namedExportsOrder,F as default};
