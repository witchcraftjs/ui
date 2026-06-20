import{C as c}from"./475SGCPX.js";import{u as g}from"./XM9gT1RW.js";import{t as w}from"./B5mFBRt-.js";import{_ as h}from"./zxp9nGjr.js";import{bJ as C,c as V,w as S,m as p,a as t,s as m,o as y,V as l,r as d,ad as f,ae as _,q as b,S as v,f as x}from"./CtFoL6Vg.js";import"./bRZ-vnNX.js";const $={class:"color-input--swatch-wrapper flex w-full"},r=`
	color-input--swatch
	after:content-vertical-holder
	min-w-4
	flex-1
	relative
	before:content-['']
	before:absolute
	before:inset-0
	before:bg-transparency-squares
	before:z-[-1]
`,N={__name:"WColorSwatchButton",props:{id:{type:String,required:!1},tempValue:{type:null,required:!0},value:{type:Object,required:!0}},setup(s){const o=C(),n=g(),e=s,a=m(()=>new c("srgb",[e.value.r/255,e.value.g/255,e.value.b/255],e.value.a??1).toString()),i=m(()=>e.tempValue?new c("srgb",[e.tempValue.r/255,e.tempValue.g/255,e.tempValue.b/255],e.tempValue.a??1).toString():"");return(u,k)=>(y(),V(h,p({id:s.id,class:t(w)(`
		color-input--button
		p-0
		flex
		flex-nowrap
		min-w-4
		overflow-hidden
		[&_.button--label]:items-stretch
		[&_.button--label]:gap-0
		after:hidden
	`,t(o).class),"aria-label":t(n)("color-input.aria-and-title-prefix")+a.value,title:t(n)("color-input.aria-and-title-prefix")+a.value},{...t(o),class:void 0}),{label:S(()=>[l("div",$,[d(u.$slots,"default",f(_({stringColor:a.value,classes:r})),()=>[l("div",{class:v(r),style:b(`background:${a.value}`)},null,4)]),s.tempValue?d(u.$slots,"temp",f(p({key:0},{tempStringColor:i.value,classes:r})),()=>[l("div",{class:v(r),style:b(`background:${i.value}`)},null,4)]):x("",!0)])]),_:3},16,["id","class","aria-label","title"]))}};export{N as default};
