import{f as u}from"./chunk-MVUZLZE2-BVB7fs3M.js";import{r as l,c as f}from"./vue.esm-bundler-D34C2Wlw.js";import{a as b,N as d}from"./LibRoot-CpCGCbRj.js";import{c as h}from"./index-Cu-gwfJh.js";import"./iframe-Rr6GslXv.js";import"./twMerge-BZGhTDWl.js";const D={component:b,title:"Components/Notifications",args:{withTitle:!0}},o={render:a=>({components:h,setup(){const n=new d({});let t=0;const e=l(a.withTitle),s=l(!1),c=l(!1),r=`
 Simulating lots of text:
${u.lorem.paragraphs(20)}`,i=f(()=>c.value?r:"");return{notifyRequiresAction:()=>{t++,n.notify({title:e.value?`Notification(${t})`:void 0,message:`This is a notification that requires action. Pick an option:${i.value}`,requiresAction:!0,options:["Ok","Default Answer","Cancel"],default:"Default Answer"})},notifyTimeoutable:()=>{t++,n.notify({title:e.value?`Notification(${t})`:void 0,message:`This is a notification. No action required.${i.value}`,timeout:s.value?!1:5e3})},notifyNonCancellable:()=>{t++,n.notify({title:e.value?`Notification(${t})`:void 0,message:`This is a non-cancellable notification. Pick an option:${i.value}`,options:["Ok","Default Answer"],default:"Default Answer",cancellable:!1})},notifyWithDangerousOption:()=>{t++,n.notify({title:e.value?`Notification(${t})`:void 0,message:`This is a notification that has a dangerous option. Pick an option:${i.value}`,options:["Ok","Default Answer","Dangerous Option","Cancel"],default:"Default Answer",dangerous:["Dangerous Option"]})},notifyNonCancellableRequiresAction:()=>{t++,n.notify({title:e.value?`Notification(${t})`:void 0,message:`This is a non-cancellable notification. Pick an option:${i.value}`,requiresAction:!0,options:["Ok","Default Answer"],default:"Default Answer",cancellable:!1})},handler:n,withTitle:e,disableTimeout:s,lotsOfText:c,args:{outline:!1,...a}}},backgrounds:{disable:!0},template:`
    <lib-root :outline="args.outline" :notification-handler="handler">
        <lib-button :label="'Notify Timeoutable'" @click="notifyTimeoutable()"></lib-button>
        <lib-button :label="'Notify RequiresAction'" @click="notifyRequiresAction()"></lib-button>
        <lib-button :label="'Notify Non-Cancellable that RequiresAction'" @click="notifyNonCancellableRequiresAction()"></lib-button>
        <lib-button :label="'Notify With Dangerous Option'" @click="notifyWithDangerousOption()"></lib-button>
        <lib-button :label="'Notify Non-Cancellable'" @click="notifyNonCancellable()"></lib-button>
        <lib-checkbox v-model="lotsOfText">Use lots of text</lib-checkbox>
        <lib-checkbox v-model="disableTimeout">Disable Timeout</lib-checkbox>
        <lib-checkbox v-model="withTitle">With Title</lib-checkbox>
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
    `})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components,
    setup() {
      const handler = new NotificationHandler({});
      let count = 0;
      const withTitle = ref(args.withTitle);
      const disableTimeout = ref(false);
      const lotsOfText = ref(false);
      const paragraphs = \`\\n Simulating lots of text:\\n\${faker.lorem.paragraphs(20)}\`;
      const extraText = computed(() => lotsOfText.value ? paragraphs : "");
      const notifyRequiresAction = () => {
        count++;
        void handler.notify({
          title: withTitle.value ? \`Notification(\${count})\` : undefined,
          message: \`This is a notification that requires action. Pick an option:\${extraText.value}\`,
          requiresAction: true,
          options: ["Ok", "Default Answer", "Cancel"],
          default: "Default Answer"
        });
      };
      const notifyWithDangerousOption = () => {
        count++;
        void handler.notify({
          title: withTitle.value ? \`Notification(\${count})\` : undefined,
          message: \`This is a notification that has a dangerous option. Pick an option:\${extraText.value}\`,
          options: ["Ok", "Default Answer", "Dangerous Option", "Cancel"],
          default: "Default Answer",
          dangerous: ["Dangerous Option"]
        });
      };
      const notifyNonCancellable = () => {
        count++;
        void handler.notify({
          title: withTitle.value ? \`Notification(\${count})\` : undefined,
          message: \`This is a non-cancellable notification. Pick an option:\${extraText.value}\`,
          options: ["Ok", "Default Answer"],
          default: "Default Answer",
          cancellable: false
        });
      };
      const notifyNonCancellableRequiresAction = () => {
        count++;
        void handler.notify({
          title: withTitle.value ? \`Notification(\${count})\` : undefined,
          message: \`This is a non-cancellable notification. Pick an option:\${extraText.value}\`,
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
          message: \`This is a notification. No action required.\${extraText.value}\`,
          timeout: disableTimeout.value ? false : 5000
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
        lotsOfText,
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
    <lib-root :outline="args.outline" :notification-handler="handler">
        <lib-button :label="'Notify Timeoutable'" @click="notifyTimeoutable()"></lib-button>
        <lib-button :label="'Notify RequiresAction'" @click="notifyRequiresAction()"></lib-button>
        <lib-button :label="'Notify Non-Cancellable that RequiresAction'" @click="notifyNonCancellableRequiresAction()"></lib-button>
        <lib-button :label="'Notify With Dangerous Option'" @click="notifyWithDangerousOption()"></lib-button>
        <lib-button :label="'Notify Non-Cancellable'" @click="notifyNonCancellable()"></lib-button>
        <lib-checkbox v-model="lotsOfText">Use lots of text</lib-checkbox>
        <lib-checkbox v-model="disableTimeout">Disable Timeout</lib-checkbox>
        <lib-checkbox v-model="withTitle">With Title</lib-checkbox>
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
}`,...o.parameters?.docs?.source}}};const O=["Primary"];export{o as Primary,O as __namedExportsOrder,D as default};
