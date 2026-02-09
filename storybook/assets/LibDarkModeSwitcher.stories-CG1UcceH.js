import{r as t}from"./vue.esm-bundler-D34C2Wlw.js";import{_ as s}from"./LibRoot-CpCGCbRj.js";import{c as i}from"./index-Cu-gwfJh.js";import"./iframe-Rr6GslXv.js";import"./twMerge-BZGhTDWl.js";const g={component:s,title:"Components/DarkModeSwitcher",args:{}},n={render:o=>({components:i,setup:()=>{const a=t(!1);return{args:o,darkMode:a}},template:`
            Value: {{darkMode}}
            <LibDarkModeSwitcher 
                @update:darkMode="darkMode = $event"
                v-bind="{...args}"
            ></LibDarkModeSwitcher>
            <!-- workaround for style tag not being allowed -->
            <component is="style">
                {{args.css}}
            </component>
            
        `})},e={...n,args:{...n.args,showLabel:!1}},r={...n,args:{...n.args,css:`
            :root {
                --story-anim-length: 1s; /* Shorter for testing */
            }

            #root {
                view-transition-name: wroot;
                height: 100dvh;
                padding: 0;

            }

            ::view-transition-new(wroot) {
                animation: grow var(--story-anim-length) ease-in-out;
                animation-fill-mode: both;
                z-index: 2;
                mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="white"/></svg>') center / 0 no-repeat;
                mask-size: 50dvw;
            }

            ::view-transition-old(wroot) {
                animation: none;
                animation-fill-mode: both;
                z-index: 1;
            }

            @keyframes grow {
                    from {
                        mask-size: 0dvw;
                    }
                    to {
                        mask-size: 300dvw;
                    }
            }
        `}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup: () => {
      const darkMode = ref(false);
      return {
        args,
        darkMode
      };
    },
    template: \`
            Value: {{darkMode}}
            <LibDarkModeSwitcher 
                @update:darkMode="darkMode = $event"
                v-bind="{...args}"
            ></LibDarkModeSwitcher>
            <!-- workaround for style tag not being allowed -->
            <component is="style">
                {{args.css}}
            </component>
            
        \`
  })
}`,...n.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    showLabel: false
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...Primary,
  args: {
    ...Primary.args,
    css: \`
            :root {
                --story-anim-length: 1s; /* Shorter for testing */
            }

            #root {
                view-transition-name: wroot;
                height: 100dvh;
                padding: 0;

            }

            ::view-transition-new(wroot) {
                animation: grow var(--story-anim-length) ease-in-out;
                animation-fill-mode: both;
                z-index: 2;
                mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="white"/></svg>') center / 0 no-repeat;
                mask-size: 50dvw;
            }

            ::view-transition-old(wroot) {
                animation: none;
                animation-fill-mode: both;
                z-index: 1;
            }

            @keyframes grow {
                    from {
                        mask-size: 0dvw;
                    }
                    to {
                        mask-size: 300dvw;
                    }
            }
        \`
  }
}`,...r.parameters?.docs?.source}}};const p=["Primary","WithoutLabel","WithViewTransitionApi"];export{n as Primary,r as WithViewTransitionApi,e as WithoutLabel,p as __namedExportsOrder,g as default};
