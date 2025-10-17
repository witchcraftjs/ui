import{r}from"./vue.esm-bundler-C1bW2l80.js";import{m as l,c as o}from"./index-B_igWmnV.js";import"./LibRoot-D-jXU3dI.js";import"./iframe-l0xL2FWv.js";import"./twMerge-CudCRF6p.js";const P={component:l,title:"Components/Pagination",args:{total:10}},n={render:t=>({components:o,setup(){const e=r(1);return{changePage:(i,a)=>{i.preventDefault(),a>=10&&(e.value=10),a<=1&&(e.value=1),e.value=a},args:t,num:e}},template:`
            <lib-pagination v-bind="{...args, current: num, route:'#'}">
                <template #link="linkProps">
                    <a v-bind="linkProps" @click="changePage($event, linkProps.i)">{{ linkProps.text ?? linkProps.i }}</a>
                </template>
            </lib-pagination>
            <lib-simple-input :label="'Change Page'" :modelValue="num.toString()" @update:modelValue="num = parseInt($event)" type="number" min="0" :max="args.total">

            </lib-simple-input>
        `})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
            <lib-simple-input :label="'Change Page'" :modelValue="num.toString()" @update:modelValue="num = parseInt($event)" type="number" min="0" :max="args.total">

            </lib-simple-input>
        \`
  })
}`,...n.parameters?.docs?.source}}};const d=["Primary"];export{n as Primary,d as __namedExportsOrder,P as default};
