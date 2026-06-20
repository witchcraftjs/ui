import{f as d}from"./chunk-NAVWDHVN-4xFUB_is.js";import{r as a,c as b}from"./vue.esm-bundler-Cz0KJNfX.js";import{d as h,N as m}from"./WRoot-BHhJ4_mq.js";import{c as p}from"./index-ClhmqbYJ.js";import"./iframe-CxoCKbua.js";import"./twMerge-CLwyhV7-.js";const w={component:h,title:"Components/Notifications",args:{_withTitle:!0}},i={render:r=>{const l=r;return{components:p,setup(){const e=new m({});let n=0;const t=a(l._withTitle),s=a(!1),c=a(!1),u=`
 Simulating lots of text:
${d.lorem.paragraphs(20)}`,o=b(()=>c.value?u:"");return{notifyRequiresAction:f=>{n++,e.notify({title:t.value?`Notification(${n})`:void 0,message:`This is a cancellable notification that requires action. Pick an option:${o.value}`,requiresAction:!0,options:["Ok","Default Answer","Cancel"],default:"Default Answer",cancellable:!0,...f})},notifyTimeoutable:()=>{n++,e.notify({title:t.value?`Notification(${n})`:void 0,message:`This is a notification. No action required.${o.value}`,timeout:s.value?!1:5e3})},notifyNonCancellable:()=>{n++,e.notify({title:t.value?`Notification(${n})`:void 0,message:`This is a non-cancellable notification. Pick an option:${o.value}`,options:["Ok","Default Answer"],default:"Default Answer",cancellable:!1})},notifyWithDangerousOption:()=>{n++,e.notify({title:t.value?`Notification(${n})`:void 0,message:`This is a cancellable notification that has a dangerous option. Pick an option:${o.value}`,options:["Ok","Default Answer","Dangerous Option","Cancel"],cancellable:!0,default:"Default Answer",dangerous:["Dangerous Option"]})},notifyNonCancellableRequiresAction:()=>{n++,e.notify({title:t.value?`Notification(${n})`:void 0,message:`This is a non-cancellable notification. Pick an option:${o.value}`,requiresAction:!0,options:["Ok","Default Answer"],default:"Default Answer",cancellable:!1})},handler:e,withTitle:t,disableTimeout:s,lotsOfText:c,args:{outline:!1,...l}}},backgrounds:{disable:!0},template:`
    <WRoot :outline="args.outline" :notification-handler="handler">
        <div class="flex flex-col gap-1"> 
            <WButton :label="'Notify Timeoutable'" @click="notifyTimeoutable()"></WButton>
            <WButton :label="'Notify RequiresAction (Cancellable)'" @click="notifyRequiresAction()"></WButton>
            <WButton :label="'Notify RequiresAction (Cancellable) - Custom Width'" @click="notifyRequiresAction({cancellable:true,notificationProps: {class: 'sm:max-w-[90dvw]'}})"></WButton>
            <WButton :label="'Notify Non-Cancellable that RequiresAction'" @click="notifyNonCancellableRequiresAction()"></WButton>
            <WButton :label="'Notify With Dangerous Option (Cancellable)'" @click="notifyWithDangerousOption()"></WButton>
            <WButton :label="'Notify Non-Cancellable'" @click="notifyNonCancellable()"></WButton>
            <WCheckbox v-model="lotsOfText">Use lots of text</WCheckbox>
            <WCheckbox v-model="disableTimeout">Disable Timeout</WCheckbox>
            <WCheckbox v-model="withTitle">With Title</WCheckbox>
            <WNotifications :handler="handler" />
            History:
            <WDebug>
                <template v-for="entry in handler.history">
                    Message: {{entry.message}}
                    Resolution: {{entry.resolution}}
                    <br>
                </template>
            </WDebug>
        </div> 
    </WRoot>
    `}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      components: components as any,
      setup() {
        const handler = new NotificationHandler({});
        let count = 0;
        const withTitle = ref(args._withTitle);
        const disableTimeout = ref(false);
        const lotsOfText = ref(false);
        const paragraphs = \`\\n Simulating lots of text:\\n\${faker.lorem.paragraphs(20)}\`;
        const extraText = computed(() => lotsOfText.value ? paragraphs : "");
        const notifyRequiresAction = (options: any) => {
          count++;
          void handler.notify({
            title: withTitle.value ? \`Notification(\${count})\` : undefined,
            message: \`This is a cancellable notification that requires action. Pick an option:\${extraText.value}\`,
            requiresAction: true,
            options: ["Ok", "Default Answer", "Cancel"],
            default: "Default Answer",
            cancellable: true,
            ...options
          });
        };
        const notifyWithDangerousOption = () => {
          count++;
          void handler.notify({
            title: withTitle.value ? \`Notification(\${count})\` : undefined,
            message: \`This is a cancellable notification that has a dangerous option. Pick an option:\${extraText.value}\`,
            options: ["Ok", "Default Answer", "Dangerous Option", "Cancel"],
            cancellable: true,
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
      // <WDebug>{{args.handler}}</WDebug>
      template: \`
    <WRoot :outline="args.outline" :notification-handler="handler">
        <div class="flex flex-col gap-1"> 
            <WButton :label="'Notify Timeoutable'" @click="notifyTimeoutable()"></WButton>
            <WButton :label="'Notify RequiresAction (Cancellable)'" @click="notifyRequiresAction()"></WButton>
            <WButton :label="'Notify RequiresAction (Cancellable) - Custom Width'" @click="notifyRequiresAction({cancellable:true,notificationProps: {class: 'sm:max-w-[90dvw]'}})"></WButton>
            <WButton :label="'Notify Non-Cancellable that RequiresAction'" @click="notifyNonCancellableRequiresAction()"></WButton>
            <WButton :label="'Notify With Dangerous Option (Cancellable)'" @click="notifyWithDangerousOption()"></WButton>
            <WButton :label="'Notify Non-Cancellable'" @click="notifyNonCancellable()"></WButton>
            <WCheckbox v-model="lotsOfText">Use lots of text</WCheckbox>
            <WCheckbox v-model="disableTimeout">Disable Timeout</WCheckbox>
            <WCheckbox v-model="withTitle">With Title</WCheckbox>
            <WNotifications :handler="handler" />
            History:
            <WDebug>
                <template v-for="entry in handler.history">
                    Message: {{entry.message}}
                    Resolution: {{entry.resolution}}
                    <br>
                </template>
            </WDebug>
        </div> 
    </WRoot>
    \`
    };
  }
}`,...i.parameters?.docs?.source}}};const q=["Primary"];export{i as Primary,q as __namedExportsOrder,w as default};
