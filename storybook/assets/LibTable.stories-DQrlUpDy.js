import{s as b,c as d}from"./index-B_igWmnV.js";import"./vue.esm-bundler-C1bW2l80.js";import"./LibRoot-D-jXU3dI.js";import"./iframe-l0xL2FWv.js";import"./twMerge-CudCRF6p.js";const z={component:b,title:"Components/Table"},r={render:e=>({components:d,setup:()=>({args:e}),template:`
                <div class="overflow-x-scroll scrollbar-hidden">
                    <lib-table
                        v-bind="args"
                    >
                    </lib-table>
                </div>
        `}),args:{cols:["prop1","prop2","prop3"],values:[{prop1:"Item1 Prop 1",prop2:"Item1 Prop 2",prop3:"Item1 Prop 3"},{prop1:"Item2 Prop 1",prop2:"Item2 Prop 2",prop3:"Item2 Prop 3"},{prop1:"Item3 Prop 1",prop2:"Item3 Prop 2",prop3:"Item3 Prop 3"}],colConfig:{prop1:{name:"Header 1"},prop2:{name:"Header 2"}},itemKey:"prop1"}},o={...r,args:{...r.args,cellBorder:!1}},a={...r,args:{...r.args,border:!1}},n={...r,args:{...r.args,cellBorder:!1,border:!1}},s={...r,args:{...r.args,rounded:!1}},p={...r,args:{...r.args,header:!1}},l={...r,args:{...r.args,header:!1,border:!1}},i={...r,args:{...r.args,header:!1,cellBorder:!1}},t={...r,args:{...r.args,resizable:{fitWidth:!1}}},c={render:e=>({components:d,setup:()=>({args:e}),template:`
            <lib-table
                v-bind="args"
            >
            </lib-table>
            <br>
            <lib-table
            v-bind="{...args, colConfig:args.colConfig2}"
            >
            </lib-table>
            <br>
            <lib-table
                v-bind="{...args, colConfig:args.colConfig3}"
            >
            </lib-table>
        `}),args:{cols:["prop1","prop2","prop3"],itemKey:"prop1",values:[{prop1:"Prop 1",prop2:"Prop 2",prop3:"Prop 3"}],colConfig:{prop1:{name:"No Resize",resizable:!1}},colConfig2:{prop2:{name:"No Resize",resizable:!1}},colConfig3:{prop3:{name:"No Resize",resizable:!1}}}},m={render:e=>({components:d,setup:()=>({args:e}),template:`
                <lib-table
                    v-bind="args"
                >
                </lib-table>
                <br>
                <lib-table
                v-bind="{...args, colConfig:args.colConfig2}"
                >
            </lib-table>
            <br>
                <lib-table
                    v-bind="{...args, colConfig:args.colConfig3}"
                >
                </lib-table>
        `}),args:{cols:["prop1","prop2","prop3","prop4"],values:[{prop1:"Prop 1",prop2:"Prop 2",prop3:"Prop 3",prop4:"Prop 4"}],itemKey:"prop1",colConfig:{prop1:{name:"No Resize",resizable:!1},prop3:{name:"No Resize",resizable:!1}},colConfig2:{prop2:{name:"No Resize",resizable:!1},prop3:{name:"No Resize",resizable:!1}},colConfig3:{prop1:{name:"No Resize",resizable:!1},prop4:{name:"No Resize",resizable:!1}}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => ({
      args
    }),
    template: \`
                <div class="overflow-x-scroll scrollbar-hidden">
                    <lib-table
                        v-bind="args"
                    >
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
    },
    itemKey: "prop1"
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    cellBorder: false
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    border: false
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    cellBorder: false,
    border: false
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    rounded: false
  }
}`,...s.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    header: false
  }
}`,...p.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    header: false,
    border: false
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    header: false,
    cellBorder: false
  }
}`,...i.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    resizable: {
      fitWidth: false
    }
  }
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => ({
      args
    }),
    template: \`
            <lib-table
                v-bind="args"
            >
            </lib-table>
            <br>
            <lib-table
            v-bind="{...args, colConfig:args.colConfig2}"
            >
            </lib-table>
            <br>
            <lib-table
                v-bind="{...args, colConfig:args.colConfig3}"
            >
            </lib-table>
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
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => ({
      args
    }),
    template: \`
                <lib-table
                    v-bind="args"
                >
                </lib-table>
                <br>
                <lib-table
                v-bind="{...args, colConfig:args.colConfig2}"
                >
            </lib-table>
            <br>
                <lib-table
                    v-bind="{...args, colConfig:args.colConfig3}"
                >
                </lib-table>
        \`
  }),
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
}`,...m.parameters?.docs?.source}}};const N=["Primary","NoCellBorders","NoBorders","NoCellBordersNoBorders","SquareBorders","NoHeader","NoHeaderNoBorders","NoHeaderNoCellBorders","FitWidthFalse","ThreeColSomeColsNotResizable","FourColSomeColsNotResizable"];export{t as FitWidthFalse,m as FourColSomeColsNotResizable,a as NoBorders,o as NoCellBorders,n as NoCellBordersNoBorders,p as NoHeader,l as NoHeaderNoBorders,i as NoHeaderNoCellBorders,r as Primary,s as SquareBorders,c as ThreeColSomeColsNotResizable,N as __namedExportsOrder,z as default};
