import{f as n}from"./chunk-MVUZLZE2-BVB7fs3M.js";import{d as _,r as y}from"./vue.esm-bundler-D34C2Wlw.js";import{c as v,s as x}from"./index-Cu-gwfJh.js";import"./LibRoot-CpCGCbRj.js";import"./iframe-Rr6GslXv.js";import"./twMerge-BZGhTDWl.js";const P=Array.from({length:100}).fill(0).map(a=>n.lorem.sentence(n.number.int({min:1,max:50}))),$={component:x,title:"Components/Table"},e={render:a=>({components:v,setup:()=>{const r=y(!0),I=y(!1);return{args:_({...a,resizable:{enabled:!0,...a.resizable}}),debugGrips:I,show:r}},template:`
                <div class="p-2 flex flex-col gap-2 border rounded-md mb-10">
                    Controls:
                    <LibButton class="flex-1" @click="args.resizable.enabled = !args.resizable.enabled">Toggle Resizable (currently {{args.resizable.enabled}})</LibButton>
                    <LibButton @click="args.stickyHeader = !args.stickyHeader">Toggle Sticky Header (currently {{args.stickyHeader}})</LibButton>
                    <LibButton @click="show = !show">Toggle Table</LibButton>
                    <LibButton @click="debugGrips = !debugGrips">Toggle Debug Grips (currently {{debugGrips}})</LibButton>
                </div>
                <div :class="debugGrips ? ' [&_.grip]:bg-red-500': ''">
                    <lib-table
                        v-if="show"
                        v-bind="args"
                    >
                        ${a.slots}
                    </lib-table>
                </div>
        `}),args:{cols:["prop1","prop2","prop3"],values:[{prop1:"Item1 Prop 1",prop2:"Item1 Prop 2",prop3:"Item1 Prop 3"},{prop1:"Item2 Prop 1",prop2:"Item2 Prop 2",prop3:"Item2 Prop 3"},{prop1:"Item3 Prop 1",prop2:"Item3 Prop 2",prop3:"Item3 Prop 3"}],colConfig:{prop1:{name:"Header 1"},prop2:{name:"Header 2"}}}},l={...e,args:{...e.args,cellBorder:!1}},t={...e,args:{...e.args,border:!1}},p={...e,args:{...e.args,cellBorder:!1,border:!1}},i={...e,args:{...e.args,rounded:!1}},c={...e,args:{...e.args,header:!1}},d={...e,args:{...e.args,header:!1,border:!1}},m={...e,args:{...e.args,header:!1,cellBorder:!1}},g={...e,args:{...e.args,colConfig:{prop1:{name:"Initially Flex 1",resizable:!0},prop2:{name:"Initially Flex 2",resizable:!0},prop3:{name:"Initially Size of Header",resizable:!0}},resizable:{enabled:!0},class:`
            [&:not(.resizable-cols-setup)]:w-full
            [&:not(.resizable-cols-setup)]:block
            [&:not(.resizable-cols-setup)_thead]:block
            [&:not(.resizable-cols-setup)_thead_tr]:w-full
            [&:not(.resizable-cols-setup)_thead_tr]:flex
            [&:not(.resizable-cols-setup)_thead_tr]:flex-nowrap
            [&:not(.resizable-cols-setup)_thead_th:not(.override-initial)]:flex-1
        `,slots:`
            <template #header-prop3="colProps">
                <th
                    :class="\`\${colProps.class} [table:not(.resizable-cols-setup)_&]:w-[min-content] whitespace-nowrap override-initial\`"
                    :style="colProps.style"
                >
                    {{ colProps.config.name }}
                </th>
            </template>
        `}},u={...e,args:{...e.args,resizable:{fitWidth:!1}}},b={...e,args:{...e.args,resizable:{enabled:!0},stickyHeader:!0,"wrapper-class":`
            max-h-[50dvh]
        `,values:Array.from({length:200}).fill(0).map((a,r)=>({prop1:`Item${r+1} Prop 1`,prop2:`Item${r+1} Prop 2`,prop3:`Item${r+1} Prop 3`}))}},s={...e,args:{...e.args,resizable:{enabled:!0},virtualizerOptions:{enabled:!0},stickyHeader:!0,"wrapper-class":`
            max-h-[50dvh]
        `,values:Array.from({length:1e4}).fill(0).map((a,r)=>({prop1:`Item${r+1} Prop 1`,prop2:`Item${r+1} Prop 2`,prop3:`Item${r+1} Prop 3`}))}},f={...s,args:{...s.args,virtualizerOptions:{enabled:!0,method:"dynamic",overscan:5},class:`
            [&_td]:no-truncate!
            [&_th]:no-truncate!
        `,values:Array.from({length:1e4}).fill(0).map((a,r)=>({prop1:`Item${r+1} Prop 1: ${n.helpers.arrayElement(P)}`,prop2:`Item${r+1} Prop 2: ${n.helpers.arrayElement(P)}`,prop3:`Item${r+1} Prop 3: ${n.helpers.arrayElement(P)}`}))},parameters:{tags:["skip-smoke-test"]}},z={...s,args:{...s.args,resizable:{fitWidth:!1},class:`
            [&_th]:no-truncate!
            [&_th]:whitespace-nowrap!
            [&:not(.resizable-cols-setup)]:w-max
            [&:not(.resizable-cols-setup)_th]:w-max
        `,"wrapper-class":`
            max-h-[50dvh]
        `,values:Array.from({length:1e4}).fill(0).map((a,r)=>({prop1:`Item${r+1} Prop 1`,prop2:`Item${r+1} Prop 2`,prop3:`Item${r+1} Prop 3`}))}},o={render:a=>({components:v,setup:()=>{const r=y(!1);return{args:a,debugGrips:r}},template:`
        <div class="flex flex-col gap-2 w-full border rounded-md mb-10">
            <WButton @click="debugGrips = !debugGrips">Toggle Debug Grips (currently {{debugGrips}})</WButton>
        </div>
        <div :class="debugGrips ? ' [&_.grip]:bg-red-500': ''">
            <div class="flex flex-col gap-2 w-full">
                <lib-table
                    v-bind="args"
                >
                </lib-table>
                <lib-table
                v-bind="{...args, colConfig:args.colConfig2}"
                >
                </lib-table>
                <lib-table
                    v-bind="{...args, colConfig:args.colConfig3}"
                >
                </lib-table>
            </div>
        </div>
        `}),args:{cols:["prop1","prop2","prop3"],itemKey:"prop1",values:[{prop1:"Prop 1",prop2:"Prop 2",prop3:"Prop 3"}],colConfig:{prop1:{name:"No Resize",resizable:!1}},colConfig2:{prop2:{name:"No Resize",resizable:!1}},colConfig3:{prop3:{name:"No Resize",resizable:!1}}}},h={render:o.render,args:{cols:["prop1","prop2","prop3","prop4"],values:[{prop1:"Prop 1",prop2:"Prop 2",prop3:"Prop 3",prop4:"Prop 4"}],itemKey:"prop1",colConfig:{prop1:{name:"No Resize",resizable:!1},prop3:{name:"No Resize",resizable:!1}},colConfig2:{prop2:{name:"No Resize",resizable:!1},prop3:{name:"No Resize",resizable:!1}},colConfig3:{prop1:{name:"No Resize",resizable:!1},prop4:{name:"No Resize",resizable:!1}}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
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
                    <LibButton class="flex-1" @click="args.resizable.enabled = !args.resizable.enabled">Toggle Resizable (currently {{args.resizable.enabled}})</LibButton>
                    <LibButton @click="args.stickyHeader = !args.stickyHeader">Toggle Sticky Header (currently {{args.stickyHeader}})</LibButton>
                    <LibButton @click="show = !show">Toggle Table</LibButton>
                    <LibButton @click="debugGrips = !debugGrips">Toggle Debug Grips (currently {{debugGrips}})</LibButton>
                </div>
                <div :class="debugGrips ? ' [&_.grip]:bg-red-500': ''">
                    <lib-table
                        v-if="show"
                        v-bind="args"
                    >
                        \${(args as any).slots}
                    </lib-table>
                </div>
        \`
  }),
  args: {
    cols: ["prop1", "prop2", "prop3"],
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
}`,...e.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    cellBorder: false
  }
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    border: false
  }
}`,...t.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    cellBorder: false,
    border: false
  }
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    rounded: false
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    header: false
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    header: false,
    border: false
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    header: false,
    cellBorder: false
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
    slots: \`
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
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    resizable: {
      fitWidth: false
    }
  }
}`,...u.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
    ["wrapper-class"]: \`
            max-h-[50dvh]
        \`,
    values: Array.from({
      length: 200
    }).fill(0).map((_, i) => ({
      prop1: \`Item\${i + 1} Prop 1\`,
      prop2: \`Item\${i + 1} Prop 2\`,
      prop3: \`Item\${i + 1} Prop 3\`
    }))
  }
}`,...b.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
    ["wrapper-class"]: \`
            max-h-[50dvh]
        \`,
    values: Array.from({
      length: 10000
    }).fill(0).map((_, i) => ({
      prop1: \`Item\${i + 1} Prop 1\`,
      prop2: \`Item\${i + 1} Prop 2\`,
      prop3: \`Item\${i + 1} Prop 3\`
    }))
  }
}`,...s.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
    ["wrapper-class"]: \`
            max-h-[50dvh]
        \`,
    values: Array.from({
      length: 10000
    }).fill(0).map((_, i) => ({
      prop1: \`Item\${i + 1} Prop 1\`,
      prop2: \`Item\${i + 1} Prop 2\`,
      prop3: \`Item\${i + 1} Prop 3\`
    }))
  }
}`,...z.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
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
                <lib-table
                    v-bind="args"
                >
                </lib-table>
                <lib-table
                v-bind="{...args, colConfig:args.colConfig2}"
                >
                </lib-table>
                <lib-table
                    v-bind="{...args, colConfig:args.colConfig3}"
                >
                </lib-table>
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
}`,...o.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};const R=["Primary","NoCellBorders","NoBorders","NoCellBordersNoBorders","SquareBorders","NoHeader","NoHeaderNoBorders","NoHeaderNoCellBorders","InitialSize","FitWidthFalse","StickyHeader","VirtualizedFixedHeight","VirtualizedDynamicHeightExperimental","VirtualizedFitWidthFalse","ThreeColSomeColsNotResizable","FourColSomeColsNotResizable"];export{u as FitWidthFalse,h as FourColSomeColsNotResizable,g as InitialSize,t as NoBorders,l as NoCellBorders,p as NoCellBordersNoBorders,c as NoHeader,d as NoHeaderNoBorders,m as NoHeaderNoCellBorders,e as Primary,i as SquareBorders,b as StickyHeader,o as ThreeColSomeColsNotResizable,f as VirtualizedDynamicHeightExperimental,z as VirtualizedFitWidthFalse,s as VirtualizedFixedHeight,R as __namedExportsOrder,$ as default};
