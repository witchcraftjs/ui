import{r}from"./vue.esm-bundler-D4Wb0Q-q.js";import{m as l,c as o}from"./index-CMh-ID7M.js";import"./LibRoot-No97l-TP.js";import"./iframe-Bax6Xuk4.js";import"./twMerge-BZGhTDWl.js";const P={component:l,title:"Components/Pagination",args:{total:10}},n={render:t=>({components:o,setup(){const e=r(1);return{changePage:(i,a)=>{i.preventDefault(),a>=10&&(e.value=10),a<=1&&(e.value=1),e.value=a},args:t,num:e}},template:`
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
