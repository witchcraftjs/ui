import{w as M,c as d}from"./index-nZYlgcY9.js";import"./vue.esm-bundler-Cybg3BJD.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const Z={component:M,title:"Components/Table"},r={render:e=>({components:d,setup:()=>({args:e}),template:`
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
        `}),args:{cols:["prop1","prop2","prop3","prop4"],values:[{prop1:"Prop 1",prop2:"Prop 2",prop3:"Prop 3",prop4:"Prop 4"}],itemKey:"prop1",colConfig:{prop1:{name:"No Resize",resizable:!1},prop3:{name:"No Resize",resizable:!1}},colConfig2:{prop2:{name:"No Resize",resizable:!1},prop3:{name:"No Resize",resizable:!1}},colConfig3:{prop1:{name:"No Resize",resizable:!1},prop4:{name:"No Resize",resizable:!1}}}};var b,g,f;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(f=(g=r.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var u,P,C;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    cellBorder: false
  }
}`,...(C=(P=o.parameters)==null?void 0:P.docs)==null?void 0:C.source}}};var z,N,v;a.parameters={...a.parameters,docs:{...(z=a.parameters)==null?void 0:z.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    border: false
  }
}`,...(v=(N=a.parameters)==null?void 0:N.docs)==null?void 0:v.source}}};var y,R,B;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    cellBorder: false,
    border: false
  }
}`,...(B=(R=n.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var I,S,h;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    rounded: false
  }
}`,...(h=(S=s.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};var H,F,K;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    header: false
  }
}`,...(K=(F=p.parameters)==null?void 0:F.docs)==null?void 0:K.source}}};var x,W,_;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    header: false,
    border: false
  }
}`,...(_=(W=l.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var w,T,q;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    header: false,
    cellBorder: false
  }
}`,...(q=(T=i.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};var E,O,j;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    resizable: {
      fitWidth: false
    }
  }
}`,...(j=(O=t.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};var k,A,D;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(D=(A=c.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var G,J,L;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(L=(J=m.parameters)==null?void 0:J.docs)==null?void 0:L.source}}};const $=["Primary","NoCellBorders","NoBorders","NoCellBordersNoBorders","SquareBorders","NoHeader","NoHeaderNoBorders","NoHeaderNoCellBorders","FitWidthFalse","ThreeColSomeColsNotResizable","FourColSomeColsNotResizable"];export{t as FitWidthFalse,m as FourColSomeColsNotResizable,a as NoBorders,o as NoCellBorders,n as NoCellBordersNoBorders,p as NoHeader,l as NoHeaderNoBorders,i as NoHeaderNoCellBorders,r as Primary,s as SquareBorders,c as ThreeColSomeColsNotResizable,$ as __namedExportsOrder,Z as default};
