import{bR as S,cd as B,bn as m,cx as E,cz as C,b7 as P,b9 as A,af as K,ab as g,bA as q,bK as t,cG as x,b2 as T,b0 as j,cE as z,a$ as V,a9 as W,bd as $}from"./BLgEiFdH.js";import{k as M}from"./B39yYSFt.js";import{u as D}from"./DT7yuVjT.js";import{t as R}from"./C7r8Fk7z.js";import"./CiPV8clP.js";const G=["aria-readonly","tabindex","title","aria-pressed","aria-disabled"],N={class:"sr-only","aria-live":"polite"},O={class:"recorder--value before:content-vertical-holder truncate"},X=Object.assign({name:"WRecorder",inheritAttrs:!1},{__name:"WRecorder",props:V({disabled:{type:Boolean,required:!1},readonly:{type:Boolean,required:!1},border:{type:Boolean,required:!1,default:!0},unstyle:{type:Boolean,required:!1},recordingValue:{type:String,required:!1},recordingTitle:{type:String,required:!1,default:""},recorder:{type:null,required:!1,default:void 0},binders:{type:null,required:!1,default:void 0}},{recording:{type:Boolean,required:!1,default:!1},recordingModifiers:{},modelValue:{type:String,required:!0},modelModifiers:{}}),emits:V(["recorder:blur","recorder:pointerdown","focus:parent"],["update:recording","update:modelValue"]),setup(r,{emit:I}){const y=D(),u=I,w=S(),e=r,d=B(r,"recording",{type:Boolean,required:!1,default:!1}),c=B(r,"modelValue",{type:String,required:!0}),o=m(null),p=m(null),f=W(()=>!e.disabled&&!e.readonly),b=m(c.value);E([()=>e.binders,()=>e.recorder],()=>{if(d.value)throw new Error("Component was not designed to allow swapping out of binders/recorders while recording")}),E(c,()=>{b.value=c.value});const l={};let s=!1;const v=()=>{if(s){if(s=!1,e.recorder)for(const a of M(l))o.value?.removeEventListener(a,l[a]),delete l[a];e.binders&&o.value&&e.binders.unbind(o.value)}},h=()=>{if(!e.recorder&&!e.binders)throw new Error("Recording is true but no recorder or binders props was passed");if(e.recorder&&e.binders)throw new Error("Recording is true and was passed both a recorder and a binders prop. Both cannot be used at the same time.");if(s=!0,e.recorder)for(const a of M(e.recorder))o.value?.addEventListener(a,e.recorder[a],{passive:!1}),l[a]=e.recorder[a];e.binders&&o.value&&e.binders.bind(o.value)};C(()=>{if(!f.value){v(),d.value=!1;return}d.value?h():(e.recorder||e.binders)&&s&&(v(),u("focus:parent"))}),P(()=>{v()}),A(()=>{d.value&&h()});const L=a=>{f.value&&(e.recorder||e.binders)&&u("recorder:blur",a)},k=(a,n=!1)=>{if(f.value&&(d.value||o.value?.focus(),e.recorder||e.binders)){if(n)return;u("recorder:pointerdown",{event:a,indicator:p.value,input:o.value})}};return(a,n)=>($(),K("div",j({class:t(R)(`
			recorder
			flex items-center
			gap-2
			px-2
			grow-[999999]
			focus-outline-no-offset
			rounded-sm
		`,r.border&&`
			border
			border-neutral-500
			focus:border-accent-500
		`,(r.disabled||r.readonly)&&`
			text-neutral-400
			dark:text-neutral-600
		`,(r.disabled||r.readonly)&&r.border&&`
			bg-neutral-50
			dark:bg-neutral-950
			border-neutral-400
			dark:border-neutral-600
		`,t(w).class),"aria-readonly":r.readonly,tabindex:r.disabled?-1:0,title:d.value?r.recordingTitle:b.value,contenteditable:"false"},{...t(w),class:void 0},{role:"button","aria-pressed":d.value,"aria-disabled":r.disabled,ref_key:"recorderEl",ref:o,onBlur:n[1]||(n[1]=i=>L(i)),onKeydownCapture:n[2]||(n[2]=z(x(i=>k(i,!0),["prevent"]),["space"]))}),[g("span",N,q(d.value?r.recordingTitle||t(y)("recorder.recording"):""),1),g("div",{class:T(t(R)(`
			recorder--indicator
			inline-block
			bg-red-700
			rounded-full
			w-[1em]
			h-[1em]
			shrink-0
		`,d.value&&`
				animate-blinkInf
				bg-red-500
			`,(r.disabled||r.readonly)&&`
				bg-neutral-500
			`,!(r.disabled||r.readonly)&&`
				hover:bg-red-500
			`)),ref_key:"recorderIndicatorEl",ref:p,onPointerdownCapture:n[0]||(n[0]=x(i=>k(i),["prevent"]))},null,34),g("div",O,q(d.value?r.recordingValue??t(y)("recorder.recording"):b.value),1)],16,G))}});export{X as default};
