import{r}from"./vue.esm-bundler-D34C2Wlw.js";import{l,c as p}from"./index-Cu-gwfJh.js";import"./LibRoot-CpCGCbRj.js";import"./iframe-Rr6GslXv.js";import"./twMerge-BZGhTDWl.js";const y={component:l,title:"Components/MultiValues",args:{modelValue:["A","B","C"],border:!0},tags:["!test"]},e={render:o=>({components:{...p,LibMultiValues:l},setup:()=>{const a=r("B"),s=r(null);return{args:o,inputValue:a,multiValueEl:s,onKeydownEnter:i=>{i.key==="Enter"&&o.modelValue.push(a.value)}}},template:`
            <p>Simple Input connected to multi-value.</p>
            <p>Note: You will be able to add values, including duplicates, even to the disabled/readonly version in this test, see the Input component for a properly connected approach.</p>
            <p> Press enter to add value :</p>
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
                    v-model="args.modelValue"
                />
            </div>
        `})},n={...e,args:{disabled:!0}},t={...e,args:{readonly:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      ...components,
      LibMultiValues
    },
    setup: () => {
      const inputValue = ref("B");
      const multiValueEl = ref<typeof LibMultiValues | null>(null);
      const onKeydownEnter = (e: KeyboardEvent): void => {
        if (e.key === "Enter") args.modelValue!.push(inputValue.value);
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
            <p>Note: You will be able to add values, including duplicates, even to the disabled/readonly version in this test, see the Input component for a properly connected approach.</p>
            <p> Press enter to add value :</p>
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
                    v-model="args.modelValue"
                />
            </div>
        \`
  })
}`,...e.parameters?.docs?.source},description:{story:"The multi-value component is just the values part beneath the input.\n\nThis is a simple example of how it can be combined with the simple-input component to create an input with multiple values.\n\nNote that setting the `disabled` or `readonly` props won't prevent the component from accepting an updated `values` prop. Disabling adding must be done separately from whatever is controlling the component (e.g. the input in this case).",...e.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    disabled: true
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    readonly: true
  }
}`,...t.parameters?.docs?.source}}};const h=["Primary","Disabled","Readonly"];export{n as Disabled,e as Primary,t as Readonly,h as __namedExportsOrder,y as default};
