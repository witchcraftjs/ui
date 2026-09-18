import{ae as B,aq as R,c3 as I,cu as j,bd as v,ac as y,cC as i,bs as h,bK as e,ad as N,b0 as m,cE as P,cG as G,bv as K,x as A,a9 as p,aS as x,aV as w,aP as g,an as b,w as O,bR as W,cd as D,af as H,ab as L,am as T,bA as U,a$ as _}from"./BLgEiFdH.js";import{V as z,u as J}from"./CVPvS57r.js";import{R as Q}from"./ChfCWscP.js";import{I as X}from"./DLFujyv8.js";import{u as Y}from"./AyjoCVtw.js";import{u as Z}from"./k6JlyMyx.js";import{t as k}from"./C7r8Fk7z.js";import ee from"./DlzXvBgA.js";import"./BN-oUnVa.js";import"./BIGJnuHU.js";const[ae]=B("CheckboxGroupRoot");function V(t){return t==="indeterminate"}function S(t){return V(t)?"indeterminate":t?"checked":"unchecked"}const[te,le]=B("CheckboxRoot");var se=R({inheritAttrs:!1,__name:"CheckboxRoot",props:{defaultValue:{type:null,required:!1},modelValue:{type:null,required:!1,default:void 0},disabled:{type:Boolean,required:!1},value:{type:null,required:!1,default:"on"},id:{type:String,required:!1},trueValue:{type:null,required:!1,default:()=>!0},falseValue:{type:null,required:!1,default:()=>!1},asChild:{type:Boolean,required:!1},as:{type:null,required:!1,default:"button"},name:{type:String,required:!1},required:{type:Boolean,required:!1}},emits:["update:modelValue"],setup(t,{emit:o}){const a=t,r=o,{forwardRef:n,currentElement:c}=I(),s=ae(null),d=j(a,"modelValue",r,{defaultValue:a.defaultValue??a.falseValue,passive:a.modelValue===void 0}),f=p(()=>s?.disabled.value||a.disabled),q=p(()=>g(d.value,a.trueValue)),u=p(()=>x(s?.modelValue.value)?d.value==="indeterminate"?"indeterminate":q.value:w(s.modelValue.value,a.value));function $(){if(x(s?.modelValue.value))d.value==="indeterminate"?d.value=a.trueValue:d.value=q.value?a.falseValue:a.trueValue;else{const l=[...s.modelValue.value||[]];if(w(l,a.value)){const C=l.findIndex(F=>g(F,a.value));l.splice(C,1)}else l.push(a.value);s.modelValue.value=l}}const E=J(c),M=p(()=>a.id&&c.value?document.querySelector(`[for="${a.id}"]`)?.innerText:void 0);return le({disabled:f,state:u}),(l,C)=>(v(),y(K(e(s)?.rovingFocus.value?e(Q):e(A)),m(l.$attrs,{id:l.id,ref:e(n),role:"checkbox","as-child":l.asChild,as:l.as,type:l.as==="button"?"button":void 0,"aria-checked":e(V)(u.value)?"mixed":u.value,"aria-required":l.required,"aria-label":l.$attrs["aria-label"]||M.value,"data-state":e(S)(u.value),"data-disabled":f.value?"":void 0,disabled:f.value,focusable:e(s)?.rovingFocus.value?!f.value:void 0,onKeydown:P(G(()=>{},["prevent"]),["enter"]),onClick:$}),{default:i(()=>[h(l.$slots,"default",{modelValue:e(d),state:u.value}),e(E)&&l.name&&!e(s)?(v(),y(e(z),{key:0,type:"checkbox",checked:!!u.value,name:l.name,value:l.value,disabled:f.value,required:l.required},null,8,["checked","name","value","disabled","required"])):N("v-if",!0)]),_:3},16,["id","as-child","as","type","aria-checked","aria-required","aria-label","data-state","data-disabled","disabled","focusable","onKeydown"]))}}),re=se,de=R({__name:"CheckboxIndicator",props:{forceMount:{type:Boolean,required:!1},asChild:{type:Boolean,required:!1},as:{type:null,required:!1,default:"span"}},setup(t){const{forwardRef:o}=I(),a=te();return(r,n)=>(v(),y(e(O),{present:r.forceMount||e(V)(e(a).state.value)||e(a).state.value===!0},{default:i(()=>[b(e(A),m({ref:e(o),"data-state":e(S)(e(a).state.value),"data-disabled":e(a).disabled.value?"":void 0,style:{pointerEvents:"none"},"as-child":r.asChild,as:r.as},r.$attrs),{default:i(()=>[h(r.$slots,"default")]),_:3},16,["data-state","data-disabled","as-child","as"])]),_:3},8,["present"]))}}),oe=de;const ke=Object.assign({name:"WCheckbox",inheritAttrs:!1},{__name:"WCheckbox",props:_({disabled:{type:Boolean,required:!1},readonly:{type:Boolean,required:!1},border:{type:Boolean,required:!1,default:!0},unstyle:{type:Boolean,required:!1},id:{type:String,required:!1},label:{type:String,required:!1},labelAttrs:{type:Object,required:!1},wrapperAttrs:{type:Object,required:!1}},{modelValue:{type:null,default:!1},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const o=W(),a=t,r=D(t,"modelValue",{type:null,default:!1}),n=Y(a);return Z(n,r),(c,s)=>(v(),H("div",m({class:e(k)(`
		checkbox--wrapper
		flex
		items-center
		gap-1
	`,(t.disabled||t.readonly)&&`
			cursor-not-allowed
			text-neutral-500
		`,t.wrapperAttrs?.class)},{...t.wrapperAttrs,class:void 0},{ref:"el"}),[h(c.$slots,"left"),L("label",m({class:e(k)(`
			checkbox--label
			flex
			items-center
			gap-1
		`,t.labelAttrs?.class)},{...t.labelAttrs,class:void 0}),[b(e(re),m({id:e(n),disabled:t.disabled||t.readonly,class:!t.unstyle&&e(k)(`
				checkbox
				flex
				items-center
				justify-center
				focus-outline-no-offset
				m-0
				h-[1.2em]
				w-[1.2em]
				aspect-square
				bg-neutral-500/10
				text-white
				dark:text-white
				border
				border-neutral-500
				data-[state=checked]:border-accent-800/50
				data-[state=checked]:bg-accent-500
				data-[state=checked]:shadow-2xs
				data-[state=checked]:shadow-black/20
				data-[state=unchecked]:inset-shadow-2xs
				data-[state=unchecked]:inset-shadow-black/20
				focus:border-accent-600
				rounded-sm
				relative
				transition-colors
				dark:disabled:bg-neutral-800
				cursor-pointer
				disabled:text-neutral-500
				disabled:bg-neutral-500/50
				disabled:cursor-not-allowed
				disabled:data-[state=checked]:border-neutral-500
			`,e(o)?.class)},{...e(o),class:void 0},{modelValue:r.value,"onUpdate:modelValue":s[0]||(s[0]=d=>r.value=d)}),{default:i(()=>[b(e(oe),{class:"checkbox--indicator"},{default:i(()=>[b(ee,{class:"scale-110 mt-[2px] ml-[0.5px] [&_path]:stroke-3"},{default:i(()=>[b(e(X))]),_:1})]),_:1})]),_:1},16,["id","disabled","class","modelValue"]),h(c.$slots,"default"),T(" "+U(t.label),1)],16)],16))}});export{ke as default};
