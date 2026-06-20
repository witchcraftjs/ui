import{I as a,U as r,a as e}from"./WRoot-BHhJ4_mq.js";import{k as i,c as g}from"./index-ClhmqbYJ.js";import"./vue.esm-bundler-Cz0KJNfX.js";import"./iframe-CxoCKbua.js";import"./twMerge-CLwyhV7-.js";const V={component:i,title:"Components/MetamorphosisTheme/internal/MetamorphosisInterpolatedColors",args:{},parameters:{argTypes:{_interpolatedVars:{table:{disable:!0}}}}},s={tags:["skip-smoke-test"],render:p=>{const l=p;return{components:{...g,WMetamorphosisInterpolatedColors:i},setup(){return{args:l}},template:`
            <div class="flex flex-col gap-4">
                <WMetamorphosisInterpolatedColors v-bind="{
                    interpolatedVars: args._interpolatedVars,
                    ...args,
                }" />
            </div>
        `}},args:{_interpolatedVars:new a("color",r.rgb,[new e(r.rgb,{r:255,g:0,b:0}),new e(r.rgb,{r:0,g:0,b:255})],[0,1])}},n={tags:["skip-smoke-test"],...s,args:{_interpolatedVars:new a("color",r.rgb,[new e(r.rgb,{r:255,g:0,b:0}),new e(r.rgb,{r:0,g:0,b:255})])}},t={tags:["skip-smoke-test"],...s,args:{allowSwitchingStopsMode:!1,_interpolatedVars:new a("color",r.rgb,[new e(r.rgb,{r:255,g:0,b:0}),new e(r.rgb,{r:0,g:0,b:255}),new e(r.rgb,{r:0,g:255,b:0})],[0,.5,1])}},o={tags:["skip-smoke-test"],...s,args:{_interpolatedVars:new a("color",r.rgb,[new e(r.rgb,{r:255,g:0,b:0}),new e(r.rgb,{r:0,g:0,b:255})]),allowModifyingSteps:!1}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  tags: ["skip-smoke-test"],
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: {
        ...(components as any),
        WMetamorphosisInterpolatedColors
      },
      setup() {
        return {
          args
        };
      },
      template: \`
            <div class="flex flex-col gap-4">
                <WMetamorphosisInterpolatedColors v-bind="{
                    interpolatedVars: args._interpolatedVars,
                    ...args,
                }" />
            </div>
        \`
    };
  },
  args: {
    _interpolatedVars: new InterpolatedVars("color", Units.rgb, [new ControlVar(Units.rgb, {
      r: 255,
      g: 0,
      b: 0
    }), new ControlVar(Units.rgb, {
      r: 0,
      g: 0,
      b: 255
    })], [0, 1])
  }
}`,...s.parameters?.docs?.source},description:{story:"Two-stop RGB color interpolation with explicit stops [0, 1].",...s.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  tags: ["skip-smoke-test"],
  ...Primary,
  args: {
    _interpolatedVars: new InterpolatedVars("color", Units.rgb, [new ControlVar(Units.rgb, {
      r: 255,
      g: 0,
      b: 0
    }), new ControlVar(Units.rgb, {
      r: 0,
      g: 0,
      b: 255
    })])
  }
}`,...n.parameters?.docs?.source},description:{story:"Two-stop RGB color interpolation without explicit stops.",...n.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  tags: ["skip-smoke-test"],
  ...Primary,
  args: {
    allowSwitchingStopsMode: false,
    _interpolatedVars: new InterpolatedVars("color", Units.rgb, [new ControlVar(Units.rgb, {
      r: 255,
      g: 0,
      b: 0
    }), new ControlVar(Units.rgb, {
      r: 0,
      g: 0,
      b: 255
    }), new ControlVar(Units.rgb, {
      r: 0,
      g: 255,
      b: 0
    })], [0, 0.5, 1])
  }
}`,...t.parameters?.docs?.source},description:{story:"Three-stop RGB interpolation with stop-switching disabled.",...t.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  tags: ["skip-smoke-test"],
  ...Primary,
  args: {
    _interpolatedVars: new InterpolatedVars("color", Units.rgb, [new ControlVar(Units.rgb, {
      r: 255,
      g: 0,
      b: 0
    }), new ControlVar(Units.rgb, {
      r: 0,
      g: 0,
      b: 255
    })]),
    allowModifyingSteps: false
  }
}`,...o.parameters?.docs?.source},description:{story:"RGB color interpolation with step modification disabled.",...o.parameters?.docs?.description}}};const u=["Primary","Stopless","MultipleStoplessWithChangeDisallowed","StepsDisabled"];export{t as MultipleStoplessWithChangeDisallowed,s as Primary,o as StepsDisabled,n as Stopless,u as __namedExportsOrder,V as default};
