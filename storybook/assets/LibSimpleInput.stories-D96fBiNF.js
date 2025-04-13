import{u as q,c as j}from"./index-nZYlgcY9.js";import"./vue.esm-bundler-Cybg3BJD.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const Q={component:q,title:"Components/SimpleInput",args:{modelValue:"Value",placeholder:"Placeholder"}},e={args:{modelValue:"some value"},render:i=>({components:j,setup:()=>({args:i,test:()=>console.log("Enter")}),template:`
                <lib-simple-input
                @keydown="test"
                class="m-2" v-bind="args" v-model="args.modelValue" ></lib-simple-input>
                <lib-simple-input class="m-2" v-bind="{...args, modelValue:''}" ></lib-simple-input>
                `})},r={render:i=>({components:j,setup:()=>({args:i}),template:`
                Inside a flexbox:
                <div class="flex flex-wrap">
                    <lib-simple-input v-bind="args" v-model="args.modelValue"></lib-simple-input>
                    <div class="border-1 border-danger-500 flex-1 whitespace-nowrap">Flex Grow: 1</div>
                </div>
        `}),args:{stretch:!0}},a={...e,args:{disabled:!0}},n={...e,args:{readonly:!0}},o={...e,args:{valid:!1}},s={...e,args:{border:!1}},t={...e,args:{type:"number"}},l={...r,args:{type:"number"}};var d,m,p,c,u;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    modelValue: "some value"
  },
  render: args => ({
    components,
    // eslint-disable-next-line no-console
    setup: () => ({
      args,
      test: () => console.log("Enter")
    }),
    template: \`
                <lib-simple-input
                @keydown="test"
                class="m-2" v-bind="args" v-model="args.modelValue" ></lib-simple-input>
                <lib-simple-input class="m-2" v-bind="{...args, modelValue:''}" ></lib-simple-input>
                \`
  })
}`,...(p=(m=e.parameters)==null?void 0:m.docs)==null?void 0:p.source},description:{story:"Input",...(u=(c=e.parameters)==null?void 0:c.docs)==null?void 0:u.description}}};var b,g,x,v,y;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => ({
      args
    }),
    template: \`
                Inside a flexbox:
                <div class="flex flex-wrap">
                    <lib-simple-input v-bind="args" v-model="args.modelValue"></lib-simple-input>
                    <div class="border-1 border-danger-500 flex-1 whitespace-nowrap">Flex Grow: 1</div>
                </div>
        \`
  }),
  args: {
    stretch: true
  }
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source},description:{story:"Has more reasonable min-width inside a flexbox.",...(y=(v=r.parameters)==null?void 0:v.docs)==null?void 0:y.description}}};var f,w,I;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...Primary,
  args: {
    disabled: true
  }
}`,...(I=(w=a.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};var S,V,h;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  ...Primary,
  args: {
    readonly: true
  }
}`,...(h=(V=n.parameters)==null?void 0:V.docs)==null?void 0:h.source}}};var P,F,A;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
  ...Primary,
  args: {
    valid: false
  }
}`,...(A=(F=o.parameters)==null?void 0:F.docs)==null?void 0:A.source}}};var N,_,E,k,B;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
  ...Primary,
  args: {
    border: false
  }
}`,...(E=(_=s.parameters)==null?void 0:_.docs)==null?void 0:E.source},description:{story:`Intended for being wrapped.
Should not have any border or focus outline styles.`,...(B=(k=s.parameters)==null?void 0:k.docs)==null?void 0:B.description}}};var D,G,R;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  ...Primary,
  args: {
    type: "number"
  }
}`,...(R=(G=t.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};var C,H,O;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  ...InsideAFlexbox,
  args: {
    type: "number"
  }
}`,...(O=(H=l.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};const T=["Primary","InsideAFlexbox","Disabled","Readonly","Invalid","Borderless","Numerical","NumericalInsideAFlexbox"];export{s as Borderless,a as Disabled,r as InsideAFlexbox,o as Invalid,t as Numerical,l as NumericalInsideAFlexbox,e as Primary,n as Readonly,T as __namedExportsOrder,Q as default};
