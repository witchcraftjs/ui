import{I as o,U as e,a as s}from"./WRoot-BHhJ4_mq.js";import{l as p,c}from"./index-ClhmqbYJ.js";import"./vue.esm-bundler-Cz0KJNfX.js";import"./iframe-CxoCKbua.js";import"./twMerge-CLwyhV7-.js";const S={component:p,title:"Components/MetamorphosisTheme/internal/MetamorphosisInterpolatedNumber",args:{},parameters:{argTypes:{_interpolatedVars:{table:{disable:!0}}}}},n={tags:["skip-smoke-test"],render:l=>{const m=l;return{components:{...c,WMetamorphosisInterpolatedNumber:p},setup(){return{args:m}},template:`
            <div class="flex flex-col gap-4">
                <WMetamorphosisInterpolatedNumber v-bind="{
                    interpolatedVars: args._interpolatedVars,
                    ...args,
                }" />
            </div>
        `}},args:{_interpolatedVars:new o("spacing",e.px,[new s(e.num,0),new s(e.num,100)],[0,1])}},t={tags:["skip-smoke-test"],...n,args:{_interpolatedVars:new o("spacing",e.px,[new s(e.num,0),new s(e.num,100)])}},r={tags:["skip-smoke-test"],...n,args:{allowSwitchingStopsMode:!1,_interpolatedVars:new o("spacing",e.px,[new s(e.num,0),new s(e.num,100),new s(e.num,30)],[0,.5,1])}},a={tags:["skip-smoke-test"],...n,args:{_interpolatedVars:new o("spacing",e.px,[new s(e.num,0),new s(e.num,100)]),allowModifyingSteps:!1}},i={tags:["skip-smoke-test"],...n,args:{_interpolatedVars:new o("spacing",e.px,[new s(e.num,0),new s(e.num,100)],[0,1]),forceDisplayStopHandles:!0}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  tags: ["skip-smoke-test"],
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: {
        ...(components as any),
        WMetamorphosisInterpolatedNumber
      },
      setup() {
        return {
          args
        };
      },
      template: \`
            <div class="flex flex-col gap-4">
                <WMetamorphosisInterpolatedNumber v-bind="{
                    interpolatedVars: args._interpolatedVars,
                    ...args,
                }" />
            </div>
        \`
    };
  },
  args: {
    _interpolatedVars: new InterpolatedVars("spacing", Units.px, [new ControlVar(Units.num, 0), new ControlVar(Units.num, 100)], [0, 1])
  }
}`,...n.parameters?.docs?.source},description:{story:"Two-stop numeric interpolation (0 to 100) with explicit stops [0, 1].",...n.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  tags: ["skip-smoke-test"],
  ...Primary,
  args: {
    _interpolatedVars: new InterpolatedVars("spacing", Units.px, [new ControlVar(Units.num, 0), new ControlVar(Units.num, 100)])
  }
}`,...t.parameters?.docs?.source},description:{story:"Two-stop numeric interpolation without explicit stops.",...t.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  tags: ["skip-smoke-test"],
  ...Primary,
  args: {
    allowSwitchingStopsMode: false,
    _interpolatedVars: new InterpolatedVars("spacing", Units.px, [new ControlVar(Units.num, 0), new ControlVar(Units.num, 100), new ControlVar(Units.num, 30)], [0, 0.5, 1])
  }
}`,...r.parameters?.docs?.source},description:{story:"Three-stop numeric interpolation with stop-switching disabled.",...r.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  tags: ["skip-smoke-test"],
  ...Primary,
  args: {
    _interpolatedVars: new InterpolatedVars("spacing", Units.px, [new ControlVar(Units.num, 0), new ControlVar(Units.num, 100)]),
    allowModifyingSteps: false
  }
}`,...a.parameters?.docs?.source},description:{story:"Numeric interpolation with step modification disabled.",...a.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  tags: ["skip-smoke-test"],
  ...Primary,
  args: {
    _interpolatedVars: new InterpolatedVars("spacing", Units.px, [new ControlVar(Units.num, 0), new ControlVar(Units.num, 100)], [0, 1]),
    forceDisplayStopHandles: true
  }
}`,...i.parameters?.docs?.source}}};const k=["Primary","Stopless","MultipleStoplessWithChangeDisallowed","StepsDisabled","ForceDisplayStopHandles"];export{i as ForceDisplayStopHandles,r as MultipleStoplessWithChangeDisallowed,n as Primary,a as StepsDisabled,t as Stopless,k as __namedExportsOrder,S as default};
