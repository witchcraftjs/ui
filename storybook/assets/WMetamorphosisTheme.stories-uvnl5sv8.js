import{a as n,U as e,I as d,T as w,b as v}from"./WRoot-BHhJ4_mq.js";import{m as p,w as f,r as m}from"./vue.esm-bundler-Cz0KJNfX.js";import{m as b,c}from"./index-ClhmqbYJ.js";import"./iframe-CxoCKbua.js";import"./twMerge-CLwyhV7-.js";const C={component:b,title:"Components/MetamorphosisTheme",args:{}},s={tags:["skip-smoke-test"],render:o=>{const i=o;return{components:c,setup(){return{args:i,theme:p(v)}},template:`
            <div class="flex flex-col gap-4 w-full max-w-xl">
                <WMetamorphosisTheme v-bind="{
                    ...args,
                    theme
                }" />
            </div>
        `}},args:{options:{forceDisplayStopHandles:!0}}},a={render:o=>{const i=o;return{components:c,setup(){const u=new n(e.px,20),g=new d("gradient",e.rgb,[new n(e.rgb,{r:255,g:50,b:50}),new n(e.rgb,{r:50,g:100,b:255}),new n(e.rgb,{r:50,g:255,b:100})],[0,.5,1]),h=new d("spacing",e.px,[new n(e.px,{_:0}),new n(e.px,{_:8}),new n(e.px,{_:16})],[0,.3,1]),r=p(new w({radius:u,gradient:g,spacing:h})),t=m(null);f(t,()=>{t.value?r.attach(t.value):r.detach()});const l=m(JSON.stringify(r.css,null,"	"));return r.on("change",()=>{l.value=JSON.stringify(r.css,null,"	")}),{args:i,css:l,dummyEl:t,theme:r}},template:`
            <div class="flex flex-col gap-4 w-full max-w-xl">
                <WMetamorphosisTheme v-bind="{
                    ...args,
                    theme
                }" />
                <div ref="dummyEl" class="border-2 border-neutral-500 rounded-lg flex flex-col gap-[5px] p-[10px]">
                    Theme is attached to this dummy element.

                    <div class="min-h-[1.5rem]">
                        <div class="rounded-full whitespace-nowrap w-[var(--radius)] h-[var(--radius)] border-2 border-neutral-500">--radius</div>
                    </div>
                    <div class="w-[var(--spacing-2)] h-[1.5rem] border border-neutral-500 whitespace-nowrap">--spacing-2</div>


                    <div class="w-full h-[20px] bg-[var(--gradient-2)]">--gradient-2</div>
                    </div>
                    <WDebug :value="css"></WDebug>
            </div>
        `}},args:{options:{forceDisplayStopHandles:!0}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  tags: ["skip-smoke-test"],
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: components as any,
      setup() {
        return {
          args,
          theme: markRaw(baseTheme)
        };
      },
      template: \`
            <div class="flex flex-col gap-4 w-full max-w-xl">
                <WMetamorphosisTheme v-bind="{
                    ...args,
                    theme
                }" />
            </div>
        \`
    };
  },
  args: {
    options: {
      forceDisplayStopHandles: true
    } satisfies Partial<MetamorphosisInterpolatedVarsProps>
  }
}`,...s.parameters?.docs?.source},description:{story:"The default baseTheme from metamorphosis (spacing, bg, fg, ok, warning, danger, accent).",...s.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: components as any,
      setup() {
        const radius = new ControlVar(Units.px, 20);
        const gradient = new InterpolatedVars("gradient", Units.rgb, [new ControlVar(Units.rgb, {
          r: 255,
          g: 50,
          b: 50
        }), new ControlVar(Units.rgb, {
          r: 50,
          g: 100,
          b: 255
        }), new ControlVar(Units.rgb, {
          r: 50,
          g: 255,
          b: 100
        })], [0, 0.5, 1]);
        const spacing = new InterpolatedVars("spacing", Units.px, [new ControlVar(Units.px, {
          _: 0
        }), new ControlVar(Units.px, {
          _: 8
        }), new ControlVar(Units.px, {
          _: 16
        })], [0, 0.3, 1]);
        const theme = markRaw(new Theme({
          radius,
          gradient,
          spacing
        }));
        const dummyEl = ref<HTMLElement | null>(null);
        watch(dummyEl, () => {
          if (dummyEl.value) {
            theme.attach(dummyEl.value);
          } else {
            theme.detach();
          }
        });
        const css = ref(JSON.stringify(theme.css, null, "\\t"));
        theme.on("change", () => {
          css.value = JSON.stringify(theme.css, null, "\\t");
        });
        return {
          args,
          css,
          dummyEl,
          theme
        };
      },
      template: \`
            <div class="flex flex-col gap-4 w-full max-w-xl">
                <WMetamorphosisTheme v-bind="{
                    ...args,
                    theme
                }" />
                <div ref="dummyEl" class="border-2 border-neutral-500 rounded-lg flex flex-col gap-[5px] p-[10px]">
                    Theme is attached to this dummy element.

                    <div class="min-h-[1.5rem]">
                        <div class="rounded-full whitespace-nowrap w-[var(--radius)] h-[var(--radius)] border-2 border-neutral-500">--radius</div>
                    </div>
                    <div class="w-[var(--spacing-2)] h-[1.5rem] border border-neutral-500 whitespace-nowrap">--spacing-2</div>


                    <div class="w-full h-[20px] bg-[var(--gradient-2)]">--gradient-2</div>
                    </div>
                    <WDebug :value="css"></WDebug>
            </div>
        \`
    };
  },
  args: {
    options: {
      forceDisplayStopHandles: true
    } satisfies Partial<MetamorphosisInterpolatedVarsProps>
  }
}`,...a.parameters?.docs?.source},description:{story:"A custom theme with all three supported variable types: a numeric ControlVar, a color InterpolatedVars, and a numeric InterpolatedVars.",...a.parameters?.docs?.description}}};const S=["Primary","CustomTheme"];export{a as CustomTheme,s as Primary,S as __namedExportsOrder,C as default};
