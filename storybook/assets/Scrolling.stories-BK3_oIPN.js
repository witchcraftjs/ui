const n={title:"Other/Scrolling",args:{}},e={render:a=>({setup:()=>({args:a}),template:`
        <div 
            class="
                relative
                flex
                flex-col
                max-h-[300px]
                max-w-[300px]
                border-2
                border-neutral-500
            "
            
        >
            <div 
                class="overflow-auto"
            >
                <div class="h-[1000px] w-[1000px]"/>
            </div>
        </div>
        `})},r={render:a=>({setup:()=>({args:a}),template:`
            <textarea class="
                border-2
                border-neutral-500
                min-w-[200px]
                min-h-[200px]
                [resize:both]
            " />
        `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    setup: () => ({
      args
    }),
    template: \`
        <div 
            class="
                relative
                flex
                flex-col
                max-h-[300px]
                max-w-[300px]
                border-2
                border-neutral-500
            "
            
        >
            <div 
                class="overflow-auto"
            >
                <div class="h-[1000px] w-[1000px]"/>
            </div>
        </div>
        \`
  })
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => ({
    setup: () => ({
      args
    }),
    template: \`
            <textarea class="
                border-2
                border-neutral-500
                min-w-[200px]
                min-h-[200px]
                [resize:both]
            " />
        \`
  })
}`,...r.parameters?.docs?.source}}};const s=["Scrollbars","TextareaResizer"];export{e as Scrollbars,r as TextareaResizer,s as __namedExportsOrder,n as default};
