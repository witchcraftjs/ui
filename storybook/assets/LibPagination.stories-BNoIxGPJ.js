import{r as p}from"./vue.esm-bundler-Cybg3BJD.js";import{p as m,c as s}from"./index-nZYlgcY9.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const b={component:m,title:"Components/Pagination",args:{total:10}},n={render:o=>({components:s,setup(){const e=p(1);return{changePage:(l,a)=>{l.preventDefault(),a>=10&&(e.value=10),a<=1&&(e.value=1),e.value=a},args:o,num:e}},template:`
            <lib-pagination v-bind="{...args, current: num, route:'#'}">
                <template #link="linkProps">
                    <a v-bind="linkProps" @click="changePage($event, linkProps.i)">{{ linkProps.text ?? linkProps.i }}</a>
                </template>
            </lib-pagination>
            <lib-input :label="'Change Page'" :modelValue="num.toString()" @update:modelValue="num = parseInt($event)" type="number" min="0" :max="args.total">

            </lib-input>
        `})};var t,r,i;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup() {
      const num = ref(1);
      const changePage = ($event: any, i: any) => {
        $event.preventDefault();
        if (i >= 10) num.value = 10;
        if (i <= 1) num.value = 1;
        num.value = i;
      };
      return {
        changePage,
        args,
        num
      };
    },
    template: \`
            <lib-pagination v-bind="{...args, current: num, route:'#'}">
                <template #link="linkProps">
                    <a v-bind="linkProps" @click="changePage($event, linkProps.i)">{{ linkProps.text ?? linkProps.i }}</a>
                </template>
            </lib-pagination>
            <lib-input :label="'Change Page'" :modelValue="num.toString()" @update:modelValue="num = parseInt($event)" type="number" min="0" :max="args.total">

            </lib-input>
        \`
  })
}`,...(i=(r=n.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const k=["Primary"];export{n as Primary,k as __namedExportsOrder,b as default};
