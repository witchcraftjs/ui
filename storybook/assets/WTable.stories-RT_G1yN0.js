import{f as l}from"./chunk-NAVWDHVN-4xFUB_is.js";import{S as s,ae as H,Q as T}from"./vue.esm-bundler-AO_tuUZ6.js";import{t as $}from"./twMerge-CaMoglCM.js";import{eK as k,dX as N}from"./index-DpJYLACx.js";import"./WRoot-BpJCm3EK.js";import"./iframe-D0W54ZZL.js";const W=Array.from({length:100}).fill(0).map(a=>l.lorem.sentence(l.number.int({min:1,max:50}))),F={component:N,title:"Components/Table"},e={render:a=>{const r=a;return{components:k,setup:()=>{const n=s(!0),p=s(!1);return{args:T({...r,resizable:{enabled:!0,...r.resizable}}),debugGrips:p,show:n}},template:`
                <div class="p-2 flex flex-col gap-2 border rounded-md mb-10">
                    Controls:
                    <WButton class="flex-1" @click="args.resizable.enabled = !args.resizable.enabled">Toggle Resizable (currently {{args.resizable.enabled}})</WButton>
                    <WButton @click="args.stickyHeader = !args.stickyHeader">Toggle Sticky Header (currently {{args.stickyHeader}})</WButton>
                    <WButton @click="show = !show">Toggle Table</WButton>
                    <WButton @click="debugGrips = !debugGrips">Toggle Debug Grips (currently {{debugGrips}})</WButton>
                </div>
                <div :class="debugGrips ? ' [&_.grip]:bg-red-500': ''">
                    <WTable
                        v-if="show"
                        v-bind="args"
                    >
                        ${r._slots}
                    </WTable>
                </div>
        `}},args:{cols:["prop1","prop2","prop3"],values:[{prop1:"Item1 Prop 1",prop2:"Item1 Prop 2",prop3:"Item1 Prop 3"},{prop1:"Item2 Prop 1",prop2:"Item2 Prop 2",prop3:"Item2 Prop 3"},{prop1:"Item3 Prop 1",prop2:"Item3 Prop 2",prop3:"Item3 Prop 3"}],colConfig:{prop1:{name:"Header 1"},prop2:{name:"Header 2"}}}},d={...e,args:{...e.args,cellBorder:!1}},u={...e,args:{...e.args,border:!1}},g={...e,args:{...e.args,cellBorder:!1,border:!1}},b={...e,args:{...e.args,rounded:!1}},f={...e,args:{...e.args,header:!1}},h={...e,args:{...e.args,header:!1,border:!1}},z={...e,args:{...e.args,header:!1,cellBorder:!1}},v={...e,args:{...e.args,colConfig:{prop1:{name:"Initially Flex 1",resizable:!0},prop2:{name:"Initially Flex 2",resizable:!0},prop3:{name:"Initially Size of Header",resizable:!0}},resizable:{enabled:!0},class:`
            [&:not(.resizable-cols-setup)]:w-full
            [&:not(.resizable-cols-setup)]:block
            [&:not(.resizable-cols-setup)_thead]:block
            [&:not(.resizable-cols-setup)_thead_tr]:w-full
            [&:not(.resizable-cols-setup)_thead_tr]:flex
            [&:not(.resizable-cols-setup)_thead_tr]:flex-nowrap
            [&:not(.resizable-cols-setup)_thead_th:not(.override-initial)]:flex-1
        `,_slots:`
            <template #header-prop3="colProps">
                <th
                    :class="\`\${colProps.class} [table:not(.resizable-cols-setup)_&]:w-[min-content] whitespace-nowrap override-initial\`"
                    :style="colProps.style"
                >
                    {{ colProps.config.name }}
                </th>
            </template>
        `}},y={...e,args:{...e.args,resizable:{fitWidth:!1}}},P={...e,args:{...e.args,resizable:{enabled:!0},stickyHeader:!0,wrapperAttrs:{class:`
                max-h-[50dvh]
            `},values:Array.from({length:200}).fill(0).map((a,r)=>({prop1:`Item${r+1} Prop 1`,prop2:`Item${r+1} Prop 2`,prop3:`Item${r+1} Prop 3`}))}},o={...e,args:{...e.args,resizable:{enabled:!0},virtualizerOptions:{enabled:!0},stickyHeader:!0,wrapperAttrs:{class:`
                max-h-[50dvh]
            `},values:Array.from({length:1e4}).fill(0).map((a,r)=>({prop1:`Item${r+1} Prop 1`,prop2:`Item${r+1} Prop 2`,prop3:`Item${r+1} Prop 3`}))}},I={...o,args:{...o.args,virtualizerOptions:{enabled:!0,method:"dynamic",overscan:5},class:`
            [&_td]:no-truncate!
            [&_th]:no-truncate!
        `,values:Array.from({length:1e4}).fill(0).map((a,r)=>({prop1:`Item${r+1} Prop 1: ${l.helpers.arrayElement(W)}`,prop2:`Item${r+1} Prop 2: ${l.helpers.arrayElement(W)}`,prop3:`Item${r+1} Prop 3: ${l.helpers.arrayElement(W)}`}))},parameters:{tags:["skip-smoke-test"]}},w={...o,args:{...o.args,resizable:{fitWidth:!1},class:`
            [&_th]:no-truncate!
            [&_th]:whitespace-nowrap!
            [&:not(.resizable-cols-setup)]:w-max
            [&:not(.resizable-cols-setup)_th]:w-max
        `,wrapperAttrs:{class:"max-h-[50dvh]"},values:Array.from({length:1e4}).fill(0).map((a,r)=>({prop1:`Item${r+1} Prop 1`,prop2:`Item${r+1} Prop 2`,prop3:`Item${r+1} Prop 3`}))}},t={render:a=>({components:k,setup:()=>{const r=s(!1);return{args:a,debugGrips:r}},template:`
        <div class="flex flex-col gap-2 w-full border rounded-md mb-10">
            <WButton @click="debugGrips = !debugGrips">Toggle Debug Grips (currently {{debugGrips}})</WButton>
        </div>
        <div :class="debugGrips ? ' [&_.grip]:bg-red-500': ''">
            <div class="flex flex-col gap-2 w-full">
                <WTable
                    v-bind="args"
                >
                </WTable>
                <WTable
                v-bind="{...args, colConfig:args.colConfig2}"
                >
                </WTable>
                <WTable
                    v-bind="{...args, colConfig:args.colConfig3}"
                >
                </WTable>
            </div>
        </div>
        `}),args:{cols:["prop1","prop2","prop3"],itemKey:"prop1",values:[{prop1:"Prop 1",prop2:"Prop 2",prop3:"Prop 3"}],colConfig:{prop1:{name:"No Resize",resizable:!1}},colConfig2:{prop2:{name:"No Resize",resizable:!1}},colConfig3:{prop3:{name:"No Resize",resizable:!1}}}},x={render:t.render,args:{cols:["prop1","prop2","prop3","prop4"],values:[{prop1:"Prop 1",prop2:"Prop 2",prop3:"Prop 3",prop4:"Prop 4"}],itemKey:"prop1",colConfig:{prop1:{name:"No Resize",resizable:!1},prop3:{name:"No Resize",resizable:!1}},colConfig2:{prop2:{name:"No Resize",resizable:!1},prop3:{name:"No Resize",resizable:!1}},colConfig3:{prop1:{name:"No Resize",resizable:!1},prop4:{name:"No Resize",resizable:!1}}}},_={args:{},render:()=>({components:k,setup:()=>{const a=s(!0),r=s("1000"),n=s(!1),p=s(Array.from({length:1e3}).fill(0).map((c,m)=>({prop1:`Item${m+1} Prop 1`,prop2:`Item${m+1} Prop 2`,prop3:`Item${m+1} Prop 3`})));let i=null;return H(r,()=>{i&&clearTimeout(i),i=setTimeout(()=>{const c=Math.max(1,Number.parseInt(r.value,10)||0);p.value=Array.from({length:c}).fill(0).map((m,C)=>({prop1:`Item${C+1} Prop 1`,prop2:`Item${C+1} Prop 2`,prop3:`Item${C+1} Prop 3`}))},300)}),H(a,c=>{c&&(n.value=!1)}),{isVirtualized:a,rowCountInput:r,useContentVisibility:n,values:p,twMerge:$}},template:`
            <div class="p-2 flex flex-col gap-2 border rounded-md mb-10">
                Controls:
                <div class="flex items-center gap-2">
                    <WCheckbox v-model="isVirtualized" label="Virtualized"/>
                </div>
                <div class="flex items-center gap-2">
                    <label>Row count:</label>
                    <input v-model="rowCountInput" type="number" min="1" class="border rounded px-2 py-1 w-24" />
                </div>
            </div>
            <WTable
                v-if="isVirtualized"
                :cols="['prop1', 'prop2', 'prop3']"
                :values="values"
                :colConfig="{ prop1: { name: 'Header 1' }, prop2: { name: 'Header 2' }, prop3: { name: 'Header 3' } }"
                :resizable="{ enabled: true }"
                :virtualizerOptions="{ enabled: true }"
                :stickyHeader="true"
                :wrapperAttrs="{ class: 'max-h-[50dvh]' }"
            ></WTable>
            <WTable
                v-else
                :cols="['prop1', 'prop2', 'prop3']"
                :values="values"
                :colConfig="{ prop1: { name: 'Header 1' }, prop2: { name: 'Header 2' }, prop3: { name: 'Header 3' } }"
                :resizable="{ enabled: true }"
                :stickyHeader="true"
                :wrapperAttrs="{ class: 'max-h-[50dvh]' }"
            >
                <!-- :class=" '[&_.table--row]:animate-[rainbowBg_3s_linear_infinite]'" -->
            </WTable>
            <!-- <component is="style"> -->
            <!-- @keyframes rainbowBg { -->
            <!-- 	0% { color: hsl(0, 70%, 85%); } -->
            <!-- 	14% { color: hsl(45, 70%, 85%); } -->
            <!-- 	28% { color: hsl(90, 70%, 85%); } -->
            <!-- 	42% { color: hsl(135, 70%, 85%); } -->
            <!-- 	57% { color: hsl(180, 70%, 85%); } -->
            <!-- 	71% { color: hsl(225, 70%, 85%); } -->
            <!-- 	85% { color: hsl(270, 70%, 85%); } -->
            <!-- 	100% { color: hsl(315, 70%, 85%); } -->
            <!-- } -->
            <!-- </component> -->
        `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: components as any,
      setup: () => {
        const show = ref(true);
        const debugGrips = ref(false);
        // careful, storybook passes refs as is causing issues
        const argsReactive = reactive({
          ...args,
          resizable: {
            enabled: true,
            ...args.resizable
          }
        });
        return {
          args: argsReactive,
          debugGrips,
          show
        };
      },
      template: \`
                <div class="p-2 flex flex-col gap-2 border rounded-md mb-10">
                    Controls:
                    <WButton class="flex-1" @click="args.resizable.enabled = !args.resizable.enabled">Toggle Resizable (currently {{args.resizable.enabled}})</WButton>
                    <WButton @click="args.stickyHeader = !args.stickyHeader">Toggle Sticky Header (currently {{args.stickyHeader}})</WButton>
                    <WButton @click="show = !show">Toggle Table</WButton>
                    <WButton @click="debugGrips = !debugGrips">Toggle Debug Grips (currently {{debugGrips}})</WButton>
                </div>
                <div :class="debugGrips ? ' [&_.grip]:bg-red-500': ''">
                    <WTable
                        v-if="show"
                        v-bind="args"
                    >
                        \${args._slots}
                    </WTable>
                </div>
        \`
    };
  },
  args: {
    cols: ["prop1", "prop2", "prop3"] as any,
    values: [{
      prop1: "Item1 Prop 1",
      prop2: "Item1 Prop 2",
      prop3: "Item1 Prop 3"
    }, {
      prop1: "Item2 Prop 1",
      prop2: "Item2 Prop 2",
      prop3: "Item2 Prop 3"
    }, {
      prop1: "Item3 Prop 1",
      prop2: "Item3 Prop 2",
      prop3: "Item3 Prop 3"
    }],
    colConfig: {
      prop1: {
        name: "Header 1"
      },
      prop2: {
        name: "Header 2"
      }
    }
  }
}`,...e.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    cellBorder: false
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    border: false
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    cellBorder: false,
    border: false
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    rounded: false
  }
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    header: false
  }
}`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    header: false,
    border: false
  }
}`,...h.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    header: false,
    cellBorder: false
  }
}`,...z.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    colConfig: {
      prop1: {
        name: "Initially Flex 1",
        resizable: true
      },
      prop2: {
        name: "Initially Flex 2",
        resizable: true
      },
      prop3: {
        name: "Initially Size of Header",
        resizable: true
      }
    },
    resizable: {
      enabled: true
    },
    class: \`
            [&:not(.resizable-cols-setup)]:w-full
            [&:not(.resizable-cols-setup)]:block
            [&:not(.resizable-cols-setup)_thead]:block
            [&:not(.resizable-cols-setup)_thead_tr]:w-full
            [&:not(.resizable-cols-setup)_thead_tr]:flex
            [&:not(.resizable-cols-setup)_thead_tr]:flex-nowrap
            [&:not(.resizable-cols-setup)_thead_th:not(.override-initial)]:flex-1
        \`,
    _slots: \`
            <template #header-prop3="colProps">
                <th
                    :class="\\\`\\\${colProps.class} [table:not(.resizable-cols-setup)_&]:w-[min-content] whitespace-nowrap override-initial\\\`"
                    :style="colProps.style"
                >
                    {{ colProps.config.name }}
                </th>
            </template>
        \`
  }
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    resizable: {
      fitWidth: false
    }
  }
}`,...y.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    resizable: {
      enabled: true
    },
    stickyHeader: true,
    // moving the border to the wrapper is to hide the little bits of border sticking out
    // added back the right straight border otherwise the scrollbar looks ass
    // this is ever so slightly visible if there is no scrollbar
    wrapperAttrs: {
      class: \`
                max-h-[50dvh]
            \`
    },
    values: Array.from({
      length: 200
    }).fill(0).map((_, i) => ({
      prop1: \`Item\${i + 1} Prop 1\`,
      prop2: \`Item\${i + 1} Prop 2\`,
      prop3: \`Item\${i + 1} Prop 3\`
    }))
  }
}`,...P.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    resizable: {
      enabled: true
    },
    virtualizerOptions: {
      enabled: true
    },
    stickyHeader: true,
    wrapperAttrs: {
      class: \`
                max-h-[50dvh]
            \`
    },
    values: Array.from({
      length: 10000
    }).fill(0).map((_, i) => ({
      prop1: \`Item\${i + 1} Prop 1\`,
      prop2: \`Item\${i + 1} Prop 2\`,
      prop3: \`Item\${i + 1} Prop 3\`
    }))
  }
}`,...o.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  ...VirtualizedFixedHeight,
  args: {
    ...VirtualizedFixedHeight.args,
    virtualizerOptions: {
      enabled: true,
      method: "dynamic",
      overscan: 5 // overscan is more expensive in dynamic mode
    },
    class: \`
            [&_td]:no-truncate!
            [&_th]:no-truncate!
        \`,
    values: Array.from({
      length: 10000
    }).fill(0).map((_, i) => ({
      prop1: \`Item\${i + 1} Prop 1: \${faker.helpers.arrayElement(fakerSentences)}\`,
      prop2: \`Item\${i + 1} Prop 2: \${faker.helpers.arrayElement(fakerSentences)}\`,
      prop3: \`Item\${i + 1} Prop 3: \${faker.helpers.arrayElement(fakerSentences)}\`
    }))
  },
  parameters: {
    tags: ["skip-smoke-test"]
  }
}`,...I.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  ...VirtualizedFixedHeight,
  args: {
    ...VirtualizedFixedHeight.args,
    resizable: {
      fitWidth: false
    },
    class: \`
            [&_th]:no-truncate!
            [&_th]:whitespace-nowrap!
            [&:not(.resizable-cols-setup)]:w-max
            [&:not(.resizable-cols-setup)_th]:w-max
        \`,
    wrapperAttrs: {
      class: \`max-h-[50dvh]\`
    },
    values: Array.from({
      length: 10000
    }).fill(0).map((_, i) => ({
      prop1: \`Item\${i + 1} Prop 1\`,
      prop2: \`Item\${i + 1} Prop 2\`,
      prop3: \`Item\${i + 1} Prop 3\`
    }))
  }
}`,...w.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: components as any,
    setup: () => {
      const debugGrips = ref(false);
      return {
        args,
        debugGrips
      };
    },
    template: \`
        <div class="flex flex-col gap-2 w-full border rounded-md mb-10">
            <WButton @click="debugGrips = !debugGrips">Toggle Debug Grips (currently {{debugGrips}})</WButton>
        </div>
        <div :class="debugGrips ? ' [&_.grip]:bg-red-500': ''">
            <div class="flex flex-col gap-2 w-full">
                <WTable
                    v-bind="args"
                >
                </WTable>
                <WTable
                v-bind="{...args, colConfig:args.colConfig2}"
                >
                </WTable>
                <WTable
                    v-bind="{...args, colConfig:args.colConfig3}"
                >
                </WTable>
            </div>
        </div>
        \`
  }),
  args: {
    cols: ["prop1", "prop2", "prop3"],
    itemKey: "prop1",
    values: [{
      prop1: "Prop 1",
      prop2: "Prop 2",
      prop3: "Prop 3"
    }],
    colConfig: {
      prop1: {
        name: "No Resize",
        resizable: false
      }
    },
    colConfig2: {
      prop2: {
        name: "No Resize",
        resizable: false
      }
    },
    colConfig3: {
      prop3: {
        name: "No Resize",
        resizable: false
      }
    }
  } as any
}`,...t.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: ThreeColSomeColsNotResizable.render,
  args: {
    cols: ["prop1", "prop2", "prop3", "prop4"],
    values: [{
      prop1: "Prop 1",
      prop2: "Prop 2",
      prop3: "Prop 3",
      prop4: "Prop 4"
    }],
    itemKey: "prop1",
    colConfig: {
      prop1: {
        name: "No Resize",
        resizable: false
      },
      prop3: {
        name: "No Resize",
        resizable: false
      }
    },
    colConfig2: {
      prop2: {
        name: "No Resize",
        resizable: false
      },
      prop3: {
        name: "No Resize",
        resizable: false
      }
    },
    colConfig3: {
      prop1: {
        name: "No Resize",
        resizable: false
      },
      prop4: {
        name: "No Resize",
        resizable: false
      }
    }
  } as any
}`,...x.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => ({
    components: components as any,
    setup: () => {
      const isVirtualized = ref(true);
      const rowCountInput = ref("1000");
      const useContentVisibility = ref(false);
      const values = ref(Array.from({
        length: 1000
      }).fill(0).map((_, i) => ({
        prop1: \`Item\${i + 1} Prop 1\`,
        prop2: \`Item\${i + 1} Prop 2\`,
        prop3: \`Item\${i + 1} Prop 3\`
      })));
      let timer: ReturnType<typeof setTimeout> | null = null;
      watch(rowCountInput, () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          const count = Math.max(1, Number.parseInt(rowCountInput.value, 10) || 0);
          values.value = Array.from({
            length: count
          }).fill(0).map((_, i) => ({
            prop1: \`Item\${i + 1} Prop 1\`,
            prop2: \`Item\${i + 1} Prop 2\`,
            prop3: \`Item\${i + 1} Prop 3\`
          }));
        }, 300);
      });
      watch(isVirtualized, v => {
        if (v) useContentVisibility.value = false;
      });
      return {
        isVirtualized,
        rowCountInput,
        useContentVisibility,
        values,
        twMerge
      };
    },
    template: \`
            <div class="p-2 flex flex-col gap-2 border rounded-md mb-10">
                Controls:
                <div class="flex items-center gap-2">
                    <WCheckbox v-model="isVirtualized" label="Virtualized"/>
                </div>
                <div class="flex items-center gap-2">
                    <label>Row count:</label>
                    <input v-model="rowCountInput" type="number" min="1" class="border rounded px-2 py-1 w-24" />
                </div>
            </div>
            <WTable
                v-if="isVirtualized"
                :cols="['prop1', 'prop2', 'prop3']"
                :values="values"
                :colConfig="{ prop1: { name: 'Header 1' }, prop2: { name: 'Header 2' }, prop3: { name: 'Header 3' } }"
                :resizable="{ enabled: true }"
                :virtualizerOptions="{ enabled: true }"
                :stickyHeader="true"
                :wrapperAttrs="{ class: 'max-h-[50dvh]' }"
            ></WTable>
            <WTable
                v-else
                :cols="['prop1', 'prop2', 'prop3']"
                :values="values"
                :colConfig="{ prop1: { name: 'Header 1' }, prop2: { name: 'Header 2' }, prop3: { name: 'Header 3' } }"
                :resizable="{ enabled: true }"
                :stickyHeader="true"
                :wrapperAttrs="{ class: 'max-h-[50dvh]' }"
            >
                <!-- :class=" '[&_.table--row]:animate-[rainbowBg_3s_linear_infinite]'" -->
            </WTable>
            <!-- <component is="style"> -->
            <!-- @keyframes rainbowBg { -->
            <!-- 	0% { color: hsl(0, 70%, 85%); } -->
            <!-- 	14% { color: hsl(45, 70%, 85%); } -->
            <!-- 	28% { color: hsl(90, 70%, 85%); } -->
            <!-- 	42% { color: hsl(135, 70%, 85%); } -->
            <!-- 	57% { color: hsl(180, 70%, 85%); } -->
            <!-- 	71% { color: hsl(225, 70%, 85%); } -->
            <!-- 	85% { color: hsl(270, 70%, 85%); } -->
            <!-- 	100% { color: hsl(315, 70%, 85%); } -->
            <!-- } -->
            <!-- </component> -->
        \`
  })
}`,..._.parameters?.docs?.source}}};const E=["Primary","NoCellBorders","NoBorders","NoCellBordersNoBorders","SquareBorders","NoHeader","NoHeaderNoBorders","NoHeaderNoCellBorders","InitialSize","FitWidthFalse","StickyHeader","VirtualizedFixedHeight","VirtualizedDynamicHeightExperimental","VirtualizedFitWidthFalse","ThreeColSomeColsNotResizable","FourColSomeColsNotResizable","ExperimentalVirtualizedComparison"];export{_ as ExperimentalVirtualizedComparison,y as FitWidthFalse,x as FourColSomeColsNotResizable,v as InitialSize,u as NoBorders,d as NoCellBorders,g as NoCellBordersNoBorders,f as NoHeader,h as NoHeaderNoBorders,z as NoHeaderNoCellBorders,e as Primary,b as SquareBorders,P as StickyHeader,t as ThreeColSomeColsNotResizable,I as VirtualizedDynamicHeightExperimental,w as VirtualizedFitWidthFalse,o as VirtualizedFixedHeight,E as __namedExportsOrder,F as default};
