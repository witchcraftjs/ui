import{a$ as q,c6 as R,bJ as V,al as B,l as x,r as p,V as m,ad as w,m as $,a as u,f as h,M as k,w as C,c as S,p as I,W as P,F as M,n as W,Z as J,aN as K,a3 as L,o as g,ae as z,S as H,s as F}from"./CtFoL6Vg.js";import{c as X}from"./DW0dok2K.js";import{I as Y}from"./DnKfAHy0.js";import{I as Z}from"./dmPmFL9z.js";import{i as G,_ as O}from"./zxp9nGjr.js";import{k as Q}from"./B39yYSFt.js";import{t as N}from"./B5mFBRt-.js";import T from"./CgWBegSS.js";function U(){const t=q({});function e(i,n){return t[i]=n,t[i]}return{slotVars:t,setSlotVar:e}}function j(t,e){let i="";for(let n=0;n<t.length;n++){const o=t[n];i+=o+(n<e.length?e[n]:"")}return i}function _(t){return t!==void 0}function ee(t,{tabs:e=!0,count:i=void 0}={}){let n=i;if(!_(n)){const f=e?/^[\t]*(?=[^\t])/gm:/^[ ]*(?=[^ ])/gm,r=t.match(f);if(r===null)return t;n=r.reduce((l,a)=>Math.min(l,a.length),1/0)}const o=n===1/0?"":n,s=new RegExp(`^${e?"\\t":" "}{0,${o}}`,"gm");return t.replace(s,"")}function te(t){return t.replace(/(^\n*?(?=[^\n]|$))([\s\S]*?)(\n*?\s*?$)/,"$2")}function b(t,...e){return ee(te(j(t,e)))}function v(t,e=0,{first:i=!1}={}){const n=i?/(^|\n)/g:/\n/g,o="	".repeat(e),s=i?`$1${o}`:`
${o}`;return t.replace(n,s)}function A(t,e,i={}){const n=[...arguments[3]??[]];if(i.before){const s=e?e(t,n,"before"):t;i.save&&(t=s)}let o;if(Array.isArray(t)){const s=[];let f=0;for(const r of t){const l=[...n,f.toString()],a=typeof r=="object"&&r!==null?A(r,e,i,l):e?e(r,l):r;i.save&&a!==void 0&&s.push(a),f++}o=i.save?s:void 0}else if(t!==null){const s={};for(const f of Q(t)){const r=[...n,f.toString()],l=t[f],a=typeof l=="object"&&l!==null?A(l,e,i,r):e?e(l,r):l;i.save&&a!==void 0&&(s[f]=a)}o=i.save?s:void 0}else if(t===null){const s=e?e(t,n):t;o=i.save?s:void 0}if(i.after){const s=e?e(o,n,"after"):o;i.save&&(o=s)}return o}function y(t,{oneline:e=!1,stringify:i=!1}={}){let n=t;return i&&(i===!0&&(i=o=>typeof o=="function"||typeof o=="symbol"?o.toString():o),n=A(t,(o,s)=>s.length===0?o:i(o),{save:!0,after:!0})),e?JSON.stringify(n,null,"|").replace(/\n\|*/g," "):JSON.stringify(n,null,"	")}function ie(t,e,i){t[e]=i}class D{timeout=5e3;debug=!1;id=0;queue;history;maxHistory=100;listeners=[];stringifier;constructor({timeout:e,stringifier:i,maxHistory:n}={}){this.queue=q([]),this.history=q([]),e&&(this.timeout=e),n&&(this.maxHistory=n),i&&(this.stringifier=i)}_checkEntry(e){if(e.cancellable!==void 0&&G(e.cancellable))throw new Error(b`Cancellable cannot be a blank string:
					${v(y(e),5)}
				`);if(!e.options.includes(e.default))throw new Error(b`Entry options does not include default option "${e.default}":
					${v(y(e),5)}
				`);if(e.cancellable){if(typeof e.cancellable=="string"&&!e.options.includes(e.cancellable))throw new Error(b`Entry options does not include cancellable option "${e.cancellable}":
						${v(y(e),6)}
					`)}else if(e.options.includes("Cancel"))throw new Error(b`You specified that the entry should not be cancellable, but the options include the "Cancel" option:
						${v(y(e),6)}
					`);if(e.timeout!==void 0&&e.requiresAction)throw new Error(b`Cannot timeout notification that requires action:
					${v(y(e),5)}
					`);const i=e.dangerous.find(n=>!e.options.includes(n));if(e.dangerous!==void 0&&i)throw new Error(b`Dangerous options list contains an unknown option "${i}":
					${v(y(e),5)}
				`)}_createEntry(e){const i={requiresAction:!1,options:["Ok","Cancel"],default:"Ok",...e,component:e.component&&typeof e.component!="string"?R(e.component):void 0,dangerous:e.dangerous??[],timeout:e.timeout===!0?this.timeout:e.timeout!==void 0&&e.timeout!==!1?e.timeout:void 0};return(e.cancellable===!0||e.cancellable===void 0&&i.options?.includes("Cancel"))&&(i.cancellable="Cancel"),this._checkEntry(i),this.id++,i.id=this.id,i}async notify(e){const i=this._createEntry(e);i.promise=new Promise(n=>{i.resolve=n}),i.timeout!==void 0&&(i._timer={elapsedBeforePause:0},this.resume(i)),this.queue.push(i);for(const n of this.listeners)n(i,"added");return i.promise.then(n=>{i.resolution=n;for(const o of this.listeners)o(i,"resolved");if(this.history.push(i),this.history.length>this.maxHistory){this.history.splice(0,1);for(const o of this.listeners)o(i,"deleted")}return this.queue.splice(this.queue.indexOf(i),1),n})}pause(e){if(e.timeout===void 0)throw new Error(`Cannot pause notification with no timeout: ${e.id}`);if(e.isPaused)throw new Error(`Cannot pause notification that is already paused: ${e.id}`);e.isPaused=!0,clearTimeout(e._timer.id),e._timer.elapsedBeforePause+=Date.now()-e.startTime}resume(e){if(e.timeout===void 0)throw new Error(`Cannot resume notification with no timeout: ${e.id}`);e.isPaused=!1,e.startTime=Date.now();const i=e.timeout-e._timer.elapsedBeforePause;clearTimeout(e._timer.id),e._timer.id=setTimeout(()=>{e.cancellable?e.resolve(e.cancellable):e.resolve(e.default)},i)}static resolveToDefault(e){e.resolve(e.default)}static dismiss(e){e.cancellable&&e.resolve(e.cancellable)}stringify(e){if(this.stringifier)return this.stringifier(e);let i="";return e.title&&(i+=`${e.title}
`),i+=`${e.message}
`,e.code&&(i+=`code:${e.code}
`),i}clear(){ie(this,"history",[])}}const ne=["role","aria-labelledby","aria-describedby","data-id"],oe={class:"notification--header flex-reverse flex justify-between items-center"},se={class:"notification--actions flex"},ae=["id"],le={class:"notification--footer flex items-end justify-between"},re={key:0,class:"code text-xs text-neutral-700 dark:text-neutral-300"},ce={key:1,class:"notification--options flex flex-wrap justify-end gap-2"},ue=Object.assign({name:"WNotification",inheritAttrs:!1},{__name:"WNotification",props:{notification:{type:null,required:!0},handler:{type:Object,required:!1,default:void 0}},setup(t,{expose:e}){const i=V(),{setSlotVar:n,slotVars:o}=U(),s=t,f=(a,c)=>a.dangerous.includes(c)?"danger":a.default===c?"primary":"secondary",r=F(()=>s.notification.options.map(a=>f(s.notification,a))),l=L(null);return B(()=>{s.notification.requiresAction&&l.value?.focus()}),e({focus:()=>{l.value?.focus()}}),(a,c)=>t.notification?(g(),x("div",$({key:0,role:t.notification.requiresAction?"alertdialog":"status","aria-labelledby":t.notification.title?`title-${t.notification.id}`:void 0,"aria-describedby":t.notification.message?`msg-${t.notification.id}`:void 0,class:u(N)(`
		notification
		bg-neutral-50
		dark:bg-neutral-900
		text-fg
		dark:text-bg
		border
		border-neutral-400
		dark:border-neutral-700
		rounded-sm
		focus-outline
		flex
		flex-col
		gap-2
		p-1
		text-sm
		focus:border-accent-500
		focus-within:border-accent-500
	`,u(i).class,t.notification.notificationAttrs?.class)},{...u(i),...t.notification?.notificationAttrs??{},class:void 0},{tabindex:"0","data-id":t.notification.id,ref_key:"notificationEl",ref:l,onKeydown:c[2]||(c[2]=J(K(d=>u(D).resolveToDefault(t.notification),["self"]),["enter"]))}),[p(a.$slots,"top",{notification:t.notification}),m("div",oe,[t.notification.title?p(a.$slots,"title",w($({key:0},u(n)("title",{id:`title-${t.notification.id}`,title:t.notification.title,class:`
					notification--title
					focus-outline
					rounded-sm
					font-bold
				`}))),()=>[m("div",w(z(u(o).title)),P(t.notification.title),17)]):h("",!0),c[3]||(c[3]=m("div",{class:"notification--spacer flex-1"},null,-1)),m("div",se,[k(O,{border:!1,"aria-label":"Copy notification content",class:"notification--title-button notification--copy-button text-neutral-700 dark:text-neutral-300",onClick:c[0]||(c[0]=d=>u(X)(t.handler?t.handler.stringify(t.notification):JSON.stringify(t.notification)))},{default:C(()=>[k(T,null,{default:C(()=>[k(u(Y))]),_:1})]),_:1}),t.notification.cancellable?(g(),S(O,{key:0,"aria-label":"Dismiss notification",class:"notification--title-button notification--cancel-button",border:!1,onClick:c[1]||(c[1]=d=>u(D).dismiss(t.notification))},{default:C(()=>[k(T,null,{default:C(()=>[k(u(Z))]),_:1})]),_:1})):h("",!0)])]),t.notification.message&&!t.notification.component?p(a.$slots,"message",w($({key:0},u(n)("message",{class:`
				notification--message
				shrink-1
				overflow-auto
				whitespace-pre-wrap
				text-neutral-800
				dark:text-neutral-200
				mb-1
			`,message:t.notification.message}))),()=>[m("div",$(u(o).message,{id:`msg-${t.notification.id}`}),P(t.notification.message),17,ae)]):h("",!0),t.notification.component?(g(),S(I(t.notification.component),w($({key:1},{notification:t.notification,message:t.notification.message,messageClasses:`
					notification--message
					whitespace-pre-wrap
					text-neutral-800
					dark:text-neutral-200
					mb-1
				`,...t.notification.componentProps??{}})),null,16)):h("",!0),m("div",le,[t.notification.code?(g(),x("div",re," Code: "+P(t.notification.code),1)):h("",!0),c[4]||(c[4]=m("div",{class:"notification--footer-spacer flex-1 py-1"},null,-1)),t.notification.options?(g(),x("div",ce,[(g(!0),x(M,null,W(t.notification.options,(d,E)=>(g(),S(O,{label:d,class:H(u(N)(`
					notification--button
					notification--option-button
					px-2
				`,t.notification.default===d&&"notification--default")),color:r.value[E],key:d,onClick:fe=>t.notification.resolve(d)},null,8,["label","class","color","onClick"]))),128))])):h("",!0)])],16,ne)):h("",!0)}}),ke=Object.freeze(Object.defineProperty({__proto__:null,default:ue},Symbol.toStringTag,{value:"Module"}));export{D as N,ke as W,ue as _};
