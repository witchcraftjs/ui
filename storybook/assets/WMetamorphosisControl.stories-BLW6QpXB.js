import{a as r,U as n}from"./WRoot-BHhJ4_mq.js";import{m as o}from"./vue.esm-bundler-Cz0KJNfX.js";import{j as g,c as p}from"./index-ClhmqbYJ.js";import"./iframe-CxoCKbua.js";import"./twMerge-CLwyhV7-.js";const v={component:g,title:"Components/MetamorphosisTheme/internal/MetamorphosisControl",args:{},parameters:{docs:{description:{component:"Note that unlike all other components the sub-components cannot v-model."}}}},e={tags:["skip-smoke-test"],render:s=>{const a=s;return{components:{...p,WMetamorphosisControl:g},setup(){const t=o(new r(n.rgb,{r:204,g:51,b:51})),c=o(new r(n.hsl,{h:200,s:70,l:50})),m=o(new r(n.oklch,{l:70,c:.1,h:80})),d=o(new r(n.oklab,{l:.9,a:0,b:.01}));return{args:a,rgbVar:t,hslVar:c,oklchVar:m,oklabVar:d}},template:`
            <div class="flex flex-col gap-2 items-start">
                <WMetamorphosisControl v-bind="{...args,  controlVar: rgbVar}" />
                <WMetamorphosisControl v-bind="{...args,  controlVar: hslVar}" />
                <WMetamorphosisControl v-bind="{...args,  controlVar: oklchVar}" />
                <WMetamorphosisControl v-bind="{...args,  controlVar: oklabVar}" />
            </div>
        `}}},l={render:s=>{const a=s;return{components:p,setup(){const t=o(new r(n.px,16)),c=o(new r(n.num,.5)),m=o(new r(n.deg,45));return{args:a,pyVar:t,numVar:c,degVar:m}},template:`
            <div class="grid grid-cols-2 gap-2 items-start">
                <WMetamorphosisControl v-bind="{...args, controlVar: pyVar}" />

                <WMetamorphosisControl v-bind="{...args, controlVar: numVar}" />

                <WMetamorphosisControl v-bind="{...args, controlVar: degVar}" />
            </div>
        `}}},i={tags:["skip-smoke-test"],render:s=>{const a=s;return{components:p,setup(){const t=o(new r(n.str,"some string"));return{args:a,strVar:t}},template:`
            <div class="grid grid-cols-2 gap-2 items-start">
                <WMetamorphosisControl v-bind="{...args, controlVar: strVar}" />
            </div>
        `}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  tags: ["skip-smoke-test"],
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: {
        ...(components as any),
        WMetamorphosisControl
      },
      setup() {
        const rgbVar = markRaw(new ControlVar(Units.rgb, {
          r: 204,
          g: 51,
          b: 51
        }));
        const hslVar = markRaw(new ControlVar(Units.hsl, {
          h: 200,
          s: 70,
          l: 50
        }));
        const oklchVar = markRaw(new ControlVar(Units.oklch, {
          l: 70,
          c: 0.1,
          h: 80
        }));
        const oklabVar = markRaw(new ControlVar(Units.oklab, {
          l: 0.9,
          a: 0,
          b: 0.01
        }));
        return {
          args,
          rgbVar,
          hslVar,
          oklchVar,
          oklabVar
        };
      },
      template: \`
            <div class="flex flex-col gap-2 items-start">
                <WMetamorphosisControl v-bind="{...args,  controlVar: rgbVar}" />
                <WMetamorphosisControl v-bind="{...args,  controlVar: hslVar}" />
                <WMetamorphosisControl v-bind="{...args,  controlVar: oklchVar}" />
                <WMetamorphosisControl v-bind="{...args,  controlVar: oklabVar}" />
            </div>
        \`
    };
  }
}`,...e.parameters?.docs?.source},description:{story:"Color space control variants (rgb, hsl, oklch, oklab).",...e.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: components as any,
      setup() {
        const pyVar = markRaw(new ControlVar(Units.px, 16));
        const numVar = markRaw(new ControlVar(Units.num, 0.5));
        const degVar = markRaw(new ControlVar(Units.deg, 45));
        return {
          args,
          pyVar,
          numVar,
          degVar
        };
      },
      template: \`
            <div class="grid grid-cols-2 gap-2 items-start">
                <WMetamorphosisControl v-bind="{...args, controlVar: pyVar}" />

                <WMetamorphosisControl v-bind="{...args, controlVar: numVar}" />

                <WMetamorphosisControl v-bind="{...args, controlVar: degVar}" />
            </div>
        \`
    };
  }
}`,...l.parameters?.docs?.source},description:{story:"Numeric unit control variants (px, num, deg).",...l.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  tags: ["skip-smoke-test"],
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: components as any,
      setup() {
        const strVar = markRaw(new ControlVar(Units.str, "some string"));
        return {
          args,
          strVar
        };
      },
      template: \`
            <div class="grid grid-cols-2 gap-2 items-start">
                <WMetamorphosisControl v-bind="{...args, controlVar: strVar}" />
            </div>
        \`
    };
  }
}`,...i.parameters?.docs?.source},description:{story:"String unit control variant.",...i.parameters?.docs?.description}}};const C=["ColorSpaces","NumericUnits","StringValue"];export{e as ColorSpaces,l as NumericUnits,i as StringValue,C as __namedExportsOrder,v as default};
