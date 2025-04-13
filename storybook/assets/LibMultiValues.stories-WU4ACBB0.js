import{r}from"./vue.esm-bundler-Cybg3BJD.js";import{m as g,c as E}from"./index-nZYlgcY9.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const S={component:g,title:"Components/MultiValues",args:{values:["A","B","C"],border:!0},tags:["!test"]},e={render:a=>({components:{...E,LibMultiValues:g},setup:()=>{const s=r("B"),f=r(null);return{args:a,inputValue:s,multiValueEl:f,onKeydownEnter:h=>{h.key==="Enter"&&a.values.push(s.value)}}},template:`
            <p>Simple Input connected to multi-value.</p>
            <p> Press enter to add value:</p>
            <lib-simple-input
                v-model="inputValue"
                @keydown="onKeydownEnter"
            >
            </lib-simple-input>
            <p>Multi-value component: </p>
            <div class="flex justify-start">
                <lib-multi-values
                    ref="multiValueEl"
                    v-bind="args"
                    v-model:values="args.values"
                />
            </div>
        `})},n={...e,args:{disabled:!0}},t={...e,args:{readonly:!0}};var o,l,i,u,p;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: args => ({
    components: {
      ...components,
      LibMultiValues
    },
    setup: () => {
      const inputValue = ref("B");
      const multiValueEl = ref<typeof LibMultiValues | null>(null);
      const onKeydownEnter = (e: KeyboardEvent): void => {
        if (e.key === "Enter") args.values!.push(inputValue.value);
      };
      return {
        args,
        inputValue,
        multiValueEl,
        onKeydownEnter
      };
    },
    template: \`
            <p>Simple Input connected to multi-value.</p>
            <p> Press enter to add value:</p>
            <lib-simple-input
                v-model="inputValue"
                @keydown="onKeydownEnter"
            >
            </lib-simple-input>
            <p>Multi-value component: </p>
            <div class="flex justify-start">
                <lib-multi-values
                    ref="multiValueEl"
                    v-bind="args"
                    v-model:values="args.values"
                />
            </div>
        \`
  })
}`,...(i=(l=e.parameters)==null?void 0:l.docs)==null?void 0:i.source},description:{story:"The multi-value component is just the values part beneath the input.\n\nThis is a simple example of how it can be combined with the simple-input component to create an input with multiple values.\n\nNote that setting the `disabled` or `readonly` props won't prevent the component from accepting an updated `values` prop. Disabling adding must be done separately from whatever is controlling the component (e.g. the input in this case).",...(p=(u=e.parameters)==null?void 0:u.docs)==null?void 0:p.description}}};var m,d,c;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  ...Primary,
  args: {
    disabled: true
  }
}`,...(c=(d=n.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var v,y,b;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  ...Primary,
  args: {
    readonly: true
  }
}`,...(b=(y=t.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};const k=["Primary","Disabled","Readonly"];export{n as Disabled,e as Primary,t as Readonly,k as __namedExportsOrder,S as default};
