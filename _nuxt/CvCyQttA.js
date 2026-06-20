import{bJ as w,B as p,l as f,F as V,n as B,m as A,a as n,f as M,a1 as $,o as c,Z as D,aN as q,S as C,V as I,W as K,M as v,w as x,a3 as g,s as F,L}from"./CtFoL6Vg.js";import{c as N}from"./DW0dok2K.js";import{I as R}from"./dmPmFL9z.js";import{t as h}from"./B5mFBRt-.js";import{_ as S}from"./zxp9nGjr.js";import W from"./CgWBegSS.js";function j(e,...d){for(const u of d){const r=e.indexOf(u);r>-1&&e.splice(r,1)}return e}const E=["data-disabled","data-read-only","aria-label"],O=["data-border","tabindex","onKeydown","onFocus"],T={class:"multivalues--label truncate"},G=Object.assign({name:"WMultiValues",inheritAttrs:!1},{__name:"WMultiValues",props:$({disabled:{type:Boolean,required:!1},readonly:{type:Boolean,required:!1},border:{type:Boolean,required:!1,default:!0},unstyle:{type:Boolean,required:!1},label:{type:String,required:!1},itemAttrs:{type:Object,required:!1}},{modelValue:{type:Array,default:()=>[]},modelModifiers:{}}),emits:["update:modelValue"],setup(e){const d=w(),u=e,r=F(()=>!u.disabled&&!u.readonly),t=p(e,"modelValue",{type:Array,default:()=>[]}),o=g([]),a=g(0);function m(l){r.value&&(j(t.value,l),t.value.length>0&&(a.value>=t.value.length&&(a.value=t.value.length-1),L(()=>{o.value[a.value]?.focus()})))}function k(l){if(u.disabled)return;const s=t.value.length;s!==0&&(l.key==="ArrowRight"?(a.value=(a.value+1)%s,o.value[a.value]?.focus(),l.preventDefault()):l.key==="ArrowLeft"?(a.value=(a.value-1+s)%s,o.value[a.value]?.focus(),l.preventDefault()):l.key==="Delete"||l.key==="Backspace"?r.value&&(m(t.value[a.value]),l.preventDefault()):l.key==="Home"?(a.value=0,o.value[a.value]?.focus(),l.preventDefault()):l.key==="End"&&(a.value=s-1,o.value[a.value]?.focus(),l.preventDefault()))}return(l,s)=>t.value&&t.value?.length>0?(c(),f("div",A({key:0,role:"list",class:n(h)(`
		multivalues
		group
		flex
		flex-initial
		items-center
		justify-center
		gap-1
		overflow-x-scroll
		scrollbar-hidden
	`,n(d)?.class),"data-disabled":e.disabled,"data-read-only":e.readonly,"aria-label":e.label?`Values for ${e.label}`:void 0},{...n(d),class:void 0},{onKeydown:k}),[(c(!0),f(V,null,B(t.value,(i,b)=>(c(),f("div",{role:"listitem","data-border":e.border,class:C(n(h)(`
				multivalues--item
				flex-basis-0
				min-w-2
				flex
				max-w-fit
				flex-1
				items-center
				gap-0.5
				overflow-hidden
				px-1
				text-xs
				leading-none
				focus-outline
				outlined:outline-offset-0
			`,!(e.disabled||e.readonly)&&`
				group-focus:text-accent-500
				focus:text-accent-500`,e.border&&`
				rounded-sm
				border-neutral-400
				border
				focus:border-accent-400
			`,e.border&&(e.disabled||e.readonly)&&`
				border-neutral-200
				focus:border-neutral-200
				dark:border-neutral-800
				dark:focus:border-neutral-800
			`,e.itemAttrs?.class)),tabindex:r.value?a.value===b?0:-1:void 0,key:i,ref_for:!0,ref_key:"itemRefs",ref:o,onKeydown:D(q(y=>n(N)(i.toString()),["ctrl","prevent"]),["c"]),onFocus:y=>a.value=b},[I("span",T,K(i),1),v(S,{class:"multivalues--remove-button !p-0 text-sm !leading-none","aria-label":`Remove ${i}`,border:!1,disabled:e.disabled||e.readonly,tabindex:"-1",onClick:y=>m(i)},{default:x(()=>[v(W,null,{default:x(()=>[v(n(R))]),_:1})]),_:1},8,["aria-label","disabled","onClick"])],42,O))),128))],16,E)):M("",!0)}});export{G as default};
