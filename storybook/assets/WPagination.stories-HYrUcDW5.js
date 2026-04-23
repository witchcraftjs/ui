import{r}from"./vue.esm-bundler-CTxwokHZ.js";import{c,k as l}from"./index-DfJKJ2pz.js";import"./WRoot-CWVU9Kei.js";import"./iframe-CDjnaJ6T.js";import"./twMerge-jiRaHU2K.js";const d={component:l,title:"Components/Pagination",args:{total:10}},n={render:o=>({components:c,setup(){const e=r(1),a=r(!1);return{changePage:(i,t)=>{a.value&&i.preventDefault(),t>=10&&(e.value=10),t<=1&&(e.value=1),e.value=t},args:o,num:e,interceptClick:a}},template:`
            <WCheckbox v-model="interceptClick">Intercept Click (url should change when off)</WCheckbox>
            <WPagination v-bind="{...args, current: num, route:'#'}" @link-click="changePage($event, num)">
            </WPagination>
            <WSimpleInput class="mt-5" :label="'Change Page'" :modelValue="num.toString()" @update:modelValue="num = parseInt($event)" type="number" min="0" :max="args.total">

            </WSimpleInput>
        `})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup() {
      const num = ref(1);
      const interceptClick = ref(false);
      const changePage = ($event: any, i: any) => {
        if (interceptClick.value) {
          $event.preventDefault();
        }
        if (i >= 10) num.value = 10;
        if (i <= 1) num.value = 1;
        num.value = i;
      };
      return {
        changePage,
        args,
        num,
        interceptClick
      };
    },
    template: \`
            <WCheckbox v-model="interceptClick">Intercept Click (url should change when off)</WCheckbox>
            <WPagination v-bind="{...args, current: num, route:'#'}" @link-click="changePage($event, num)">
            </WPagination>
            <WSimpleInput class="mt-5" :label="'Change Page'" :modelValue="num.toString()" @update:modelValue="num = parseInt($event)" type="number" min="0" :max="args.total">

            </WSimpleInput>
        \`
  })
}`,...n.parameters?.docs?.source}}};const v=["Primary"];export{n as Primary,v as __namedExportsOrder,d as default};
