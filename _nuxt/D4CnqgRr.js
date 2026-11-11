import{I as m}from"./BWNB9lrD.js";import{u as h}from"./PDgMlSbK.js";import{u as k}from"./C6W-Qvxn.js";import{t as l}from"./CoTZLZSA.js";import p from"./6DYtT0E1.js";import{bQ as x,cc as y,af as w,br as i,ab as s,a$ as r,bJ as t,an as u,cB as g,am as v,bz as q,a_ as A,bc as B}from"./CX6LG9S9.js";const V={class:"relative inline-flex"},j=["id","checked","indeterminate","data-state","data-disabled","disabled"],C={class:"checkbox--indicator absolute inset-0 hidden items-center justify-center text-white dark:text-white pointer-events-none peer-checked:flex peer-indeterminate:flex"},W=Object.assign({name:"WCheckbox",inheritAttrs:!1},{__name:"WCheckbox",props:A({disabled:{type:Boolean,required:!1},readonly:{type:Boolean,required:!1},border:{type:Boolean,required:!1,default:!0},unstyle:{type:Boolean,required:!1},id:{type:String,required:!1},label:{type:String,required:!1},labelAttrs:{type:Object,required:!1},wrapperAttrs:{type:Object,required:!1}},{modelValue:{type:null,default:!1},modelModifiers:{}}),emits:["update:modelValue"],setup(e){const d=x(),b=e,a=y(e,"modelValue",{type:null,default:!1}),c=h(b);return k(c,a),(n,o)=>(B(),w("div",r({class:t(l)(`
			checkbox--wrapper
			flex
			items-center
			gap-1
		`,(e.disabled||e.readonly)&&`
			cursor-not-allowed
			text-neutral-500
		`,e.wrapperAttrs?.class)},{...e.wrapperAttrs,class:void 0},{ref:"el"}),[i(n.$slots,"left"),s("label",r({class:t(l)(`
			checkbox--label
			flex
			items-center
			gap-1
		`,e.labelAttrs?.class)},{...e.labelAttrs,class:void 0}),[s("span",V,[s("input",r({id:t(c),type:"checkbox",checked:a.value===!0,indeterminate:a.value==="indeterminate","data-state":a.value==="indeterminate"?"indeterminate":a.value===!0?"checked":"unchecked","data-disabled":e.disabled||e.readonly?"":void 0,disabled:e.disabled||e.readonly,class:!e.unstyle&&t(l)(`
					checkbox
					appearance-none
					peer
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
					checked:border-accent-800/50
					checked:bg-accent-500
					checked:shadow-2xs
					checked:shadow-black/20
					[&:not(:checked)]:inset-shadow-2xs
					[&:not(:checked)]:inset-shadow-black/20
					focus:border-accent-600
					rounded-sm
					relative
					transition-colors
					dark:disabled:bg-neutral-800
					cursor-pointer
					disabled:text-neutral-500
					disabled:bg-neutral-500/50
					disabled:cursor-not-allowed
					disabled:checked:border-neutral-500
				`,t(d)?.class)},{...t(d),class:void 0},{onChange:o[0]||(o[0]=f=>a.value=f.target.checked)}),null,16,j),s("span",C,[u(p,{class:"scale-110 mt-[1px] ml-[0.5px] [&_path]:stroke-3"},{default:g(()=>[u(t(m))]),_:1})])]),i(n.$slots,"default"),v(" "+q(e.label),1)],16)],16))}});export{W as default};
