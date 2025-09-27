import{a as s,r as l}from"./vue.esm-bundler-B4I_ujvT.js";import{b as u,N as c}from"./LibRoot-WN0KOPQ5.js";import{c as r}from"./index-CPjZL_cd.js";import"./iframe-DFGok_fB.js";import"./twMerge-CudCRF6p.js";const A={component:u,title:"Components/Notifications",args:{withTitle:!0}},e={render:o=>({components:r,setup(){const t=s(new c);let n=0;const i=l(o.withTitle),a=l(!1);return{notifyRequiresAction:()=>{n++,t.notify({title:i.value?`Notification(${n})`:void 0,message:"This is a notification that requires action. Pick an option:",requiresAction:!0,options:["Ok","Default Answer","Cancel"],default:"Default Answer"})},notifyTimeoutable:()=>{n++,t.notify({title:i.value?`Notification(${n})`:void 0,message:"This is a notification. No action required.",timeout:a.value?!1:2e3})},notifyNonCancellable:()=>{n++,t.notify({title:i.value?`Notification(${n})`:void 0,message:"This is a non-cancellable notification. Pick an option:",options:["Ok","Default Answer"],default:"Default Answer",cancellable:!1})},notifyWithDangerousOption:()=>{n++,t.notify({title:i.value?`Notification(${n})`:void 0,message:"This is a notification that has a dangerous option. Pick an option:",options:["Ok","Default Answer","Dangerous Option","Cancel"],default:"Default Answer",dangerous:["Dangerous Option"]})},notifyNonCancellableRequiresAction:()=>{n++,t.notify({title:i.value?`Notification(${n})`:void 0,message:"This is a non-cancellable notification. Pick an option:",requiresAction:!0,options:["Ok","Default Answer"],default:"Default Answer",cancellable:!1})},handler:t,withTitle:i,disableTimeout:a,args:{outline:!1,...o}}},backgrounds:{disable:!0},template:`
    <lib-root :outline="args.outline">
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
    </lib-root>
    `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
    <lib-root :outline="args.outline">
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
    </lib-root>
    \`
  })
}`,...e.parameters?.docs?.source}}};const v=["Primary"];export{e as Primary,v as __namedExportsOrder,A as default};
