import{a as r,r as l}from"./vue.esm-bundler-Cybg3BJD.js";import{o as f,c as b,N as d}from"./index-nZYlgcY9.js";import"./vExtractRootEl-BIGrVJN8.js";import"./iframe-BGNykWbW.js";import"./twMerge-q1Cwbn18.js";const k={component:f,title:"Components/Notifications",args:{withTitle:!0}},i={render:o=>({components:b,setup(){const t=r(new d);let n=0;const e=l(o.withTitle),a=l(!1);return{notifyRequiresAction:()=>{n++,t.notify({title:e.value?`Notification(${n})`:void 0,message:"This is a notification that requires action. Pick an option:",requiresAction:!0,options:["Ok","Default Answer","Cancel"],default:"Default Answer"})},notifyTimeoutable:()=>{n++,t.notify({title:e.value?`Notification(${n})`:void 0,message:"This is a notification. No action required.",timeout:a.value?!1:2e3})},notifyNonCancellable:()=>{n++,t.notify({title:e.value?`Notification(${n})`:void 0,message:"This is a non-cancellable notification. Pick an option:",options:["Ok","Default Answer"],default:"Default Answer",cancellable:!1})},notifyWithDangerousOption:()=>{n++,t.notify({title:e.value?`Notification(${n})`:void 0,message:"This is a notification that has a dangerous option. Pick an option:",options:["Ok","Default Answer","Dangerous Option","Cancel"],default:"Default Answer",dangerous:["Dangerous Option"]})},notifyNonCancellableRequiresAction:()=>{n++,t.notify({title:e.value?`Notification(${n})`:void 0,message:"This is a non-cancellable notification. Pick an option:",requiresAction:!0,options:["Ok","Default Answer"],default:"Default Answer",cancellable:!1})},handler:t,withTitle:e,disableTimeout:a,args:{outline:!1,...o}}},backgrounds:{disable:!0},template:`
    <test-wrapper :outline="args.outline">
        <lib-button :label="'Notify Timeoutable'" @click="notifyTimeoutable()"></lib-button>
        <lib-button :label="'Notify RequiresAction'" @click="notifyRequiresAction()"></lib-button>
        <lib-button :label="'Notify Non-Cancellable that RequiresAction'" @click="notifyNonCancellableRequiresAction()"></lib-button>
        <lib-button :label="'Notify With Dangerous Option'" @click="notifyWithDangerousOption()"></lib-button>
        <lib-button :label="'Notify Non-Cancellable'" @click="notifyNonCancellable()"></lib-button>
        <input type="checkbox" v-model="withTitle"/> With Title
        <input type="checkbox" v-model="disableTimeout"/> Disable Timeout
            <lib-notifications :handler="handler" />
        History:
        <lib-debug>
            <template v-for="entry in handler.history">
                Message: {{entry.message}}
                Resolution: {{entry.resolution}}
                <br>
            </template>
        </lib-debug>
    </test-wrapper>
    `})};var s,u,c;i.parameters={...i.parameters,docs:{...(s=i.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup() {
      const handler = reactive(new NotificationHandler());
      let count = 0;
      const withTitle = ref(args.withTitle);
      const disableTimeout = ref(false);
      const notifyRequiresAction = () => {
        count++;
        void handler.notify({
          title: withTitle.value ? \`Notification(\${count})\` : undefined,
          message: \`This is a notification that requires action. Pick an option:\`,
          requiresAction: true,
          options: ["Ok", "Default Answer", "Cancel"],
          default: "Default Answer"
        });
      };
      const notifyWithDangerousOption = () => {
        count++;
        void handler.notify({
          title: withTitle.value ? \`Notification(\${count})\` : undefined,
          message: \`This is a notification that has a dangerous option. Pick an option:\`,
          options: ["Ok", "Default Answer", "Dangerous Option", "Cancel"],
          default: "Default Answer",
          dangerous: ["Dangerous Option"]
        });
      };
      const notifyNonCancellable = () => {
        count++;
        void handler.notify({
          title: withTitle.value ? \`Notification(\${count})\` : undefined,
          message: \`This is a non-cancellable notification. Pick an option:\`,
          options: ["Ok", "Default Answer"],
          default: "Default Answer",
          cancellable: false
        });
      };
      const notifyNonCancellableRequiresAction = () => {
        count++;
        void handler.notify({
          title: withTitle.value ? \`Notification(\${count})\` : undefined,
          message: \`This is a non-cancellable notification. Pick an option:\`,
          requiresAction: true,
          options: ["Ok", "Default Answer"],
          default: "Default Answer",
          cancellable: false
        });
      };
      const notifyTimeoutable = () => {
        count++;
        void handler.notify({
          title: withTitle.value ? \`Notification(\${count})\` : undefined,
          message: \`This is a notification. No action required.\`,
          timeout: disableTimeout.value ? false : 2000
        });
      };
      return {
        notifyRequiresAction,
        notifyTimeoutable,
        notifyNonCancellable,
        notifyWithDangerousOption,
        notifyNonCancellableRequiresAction,
        handler,
        withTitle,
        disableTimeout,
        args: {
          outline: false,
          ...args
        }
      };
    },
    backgrounds: {
      disable: true
    },
    // <lib-debug>{{args.handler}}</lib-debug>
    template: \`
    <test-wrapper :outline="args.outline">
        <lib-button :label="'Notify Timeoutable'" @click="notifyTimeoutable()"></lib-button>
        <lib-button :label="'Notify RequiresAction'" @click="notifyRequiresAction()"></lib-button>
        <lib-button :label="'Notify Non-Cancellable that RequiresAction'" @click="notifyNonCancellableRequiresAction()"></lib-button>
        <lib-button :label="'Notify With Dangerous Option'" @click="notifyWithDangerousOption()"></lib-button>
        <lib-button :label="'Notify Non-Cancellable'" @click="notifyNonCancellable()"></lib-button>
        <input type="checkbox" v-model="withTitle"/> With Title
        <input type="checkbox" v-model="disableTimeout"/> Disable Timeout
            <lib-notifications :handler="handler" />
        History:
        <lib-debug>
            <template v-for="entry in handler.history">
                Message: {{entry.message}}
                Resolution: {{entry.resolution}}
                <br>
            </template>
        </lib-debug>
    </test-wrapper>
    \`
  })
}`,...(c=(u=i.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};const D=["Primary"];export{i as Primary,D as __namedExportsOrder,k as default};
