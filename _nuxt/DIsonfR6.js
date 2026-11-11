import{bQ as w,cc as p,af as c,q as V,bq as B,a$ as $,bJ as n,ad as q,a_ as A,bc as f,cD as D,cF as M,b1 as C,ab as I,bz as K,an as v,cB as x,bm as g,a9 as F,b0 as R}from"./CX6LG9S9.js";import{c as j}from"./DW0dok2K.js";import{I as E}from"./cqY7kCAu.js";import{t as h}from"./CoTZLZSA.js";import{_ as L}from"./DsDNhY6s.js";import N from"./6DYtT0E1.js";function O(e,...d){for(const u of d){const r=e.indexOf(u);r>-1&&e.splice(r,1)}return e}const S=["data-disabled","data-read-only","aria-label"],W=["data-border","tabindex","onKeydown","onFocus"],z={class:"multivalues--label truncate"},G=Object.assign({name:"WMultiValues",inheritAttrs:!1},{__name:"WMultiValues",props:A({disabled:{type:Boolean,required:!1},readonly:{type:Boolean,required:!1},border:{type:Boolean,required:!1,default:!0},unstyle:{type:Boolean,required:!1},label:{type:String,required:!1},itemAttrs:{type:Object,required:!1}},{modelValue:{type:Array,default:()=>[]},modelModifiers:{}}),emits:["update:modelValue"],setup(e){const d=w(),u=e,r=F(()=>!u.disabled&&!u.readonly),t=p(e,"modelValue",{type:Array,default:()=>[]}),o=g([]),a=g(0);function b(l){r.value&&(O(t.value,l),t.value.length>0&&(a.value>=t.value.length&&(a.value=t.value.length-1),R(()=>{o.value[a.value]?.focus()})))}function k(l){if(u.disabled)return;const s=t.value.length;s!==0&&(l.key==="ArrowRight"?(a.value=(a.value+1)%s,o.value[a.value]?.focus(),l.preventDefault()):l.key==="ArrowLeft"?(a.value=(a.value-1+s)%s,o.value[a.value]?.focus(),l.preventDefault()):l.key==="Delete"||l.key==="Backspace"?r.value&&(b(t.value[a.value]),l.preventDefault()):l.key==="Home"?(a.value=0,o.value[a.value]?.focus(),l.preventDefault()):l.key==="End"&&(a.value=s-1,o.value[a.value]?.focus(),l.preventDefault()))}return(l,s)=>t.value&&t.value?.length>0?(f(),c("div",$({key:0,role:"list",class:n(h)(`
		multivalues
		group
		flex
		flex-initial
		items-center
		justify-center
		gap-1
		overflow-x-scroll
		scrollbar-hidden
	`,n(d)?.class),"data-disabled":e.disabled,"data-read-only":e.readonly,"aria-label":e.label?`Values for ${e.label}`:void 0},{...n(d),class:void 0},{onKeydown:k}),[(f(!0),c(V,null,B(t.value,(i,m)=>(f(),c("div",{role:"listitem","data-border":e.border,class:C(n(h)(`
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
			`,e.itemAttrs?.class)),tabindex:r.value?a.value===m?0:-1:void 0,key:i,ref_for:!0,ref_key:"itemRefs",ref:o,onKeydown:D(M(y=>n(j)(i.toString()),["ctrl","prevent"]),["c"]),onFocus:y=>a.value=m},[I("span",z,K(i),1),v(L,{class:"multivalues--remove-button !p-0 text-sm !leading-none","aria-label":`Remove ${i}`,border:!1,disabled:e.disabled||e.readonly,tabindex:"-1",onClick:y=>b(i)},{default:x(()=>[v(N,null,{default:x(()=>[v(n(E))]),_:1})]),_:1},8,["aria-label","disabled","onClick"])],42,W))),128))],16,S)):q("",!0)}});export{G as default};
