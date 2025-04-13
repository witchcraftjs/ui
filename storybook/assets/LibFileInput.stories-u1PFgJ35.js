import{r as C}from"./vue.esm-bundler-Cybg3BJD.js";import{k as A,c as _}from"./index-nZYlgcY9.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const j={component:A,title:"Components/FileInput",args:{}},r={render:t=>({components:_,setup:()=>{function e(l){console.log(l)}return{args:t,errorHandler:e}},template:`
            <lib-file-input v-bind="{...args}" @errors="errorHandler"></lib-file-input>
        `})},n={...r,args:{...r.args,multiple:!0}},o={...r,args:{...r.args,multiple:!0,formats:[]}},s={...r,args:{...r.args,compact:!0}},a={render:t=>({components:_,setup:()=>{const e=C([]);return{args:t,errors:e,errorHandler:x=>e.value=x}},template:`
            <lib-debug :title="'Errors'">{{errors}}</lib-debug>
            <lib-file-input v-bind="{...args}"  @errors="errorHandler"></lib-file-input>
        `})};var i,p,c;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(c=(p=r.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var u,m,d;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  ...SingleFile,
  args: {
    ...SingleFile.args,
    multiple: true
  }
}`,...(d=(m=n.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var g,b,f;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  ...SingleFile,
  args: {
    ...SingleFile.args,
    multiple: true,
    formats: []
  }
}`,...(f=(b=o.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var F,H,S;s.parameters={...s.parameters,docs:{...(F=s.parameters)==null?void 0:F.docs,source:{originalSource:`{
  ...SingleFile,
  args: {
    ...SingleFile.args,
    compact: true
  }
}`,...(S=(H=s.parameters)==null?void 0:H.docs)==null?void 0:S.source}}};var v,E,y;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(y=(E=a.parameters)==null?void 0:E.docs)==null?void 0:y.source}}};const q=["SingleFile","MultipleFile","AnyFormat","Compact","ErrorHandling"];export{o as AnyFormat,s as Compact,a as ErrorHandling,n as MultipleFile,r as SingleFile,q as __namedExportsOrder,j as default};
