import{cc as y,ac as n,cB as a,a$ as c,bJ as t,k,a_ as v,bc as d,m as D,br as s,ad as u,an as r,j as $,i as P,ab as m,g as C,b1 as V,l as q,am as f,bz as g,h as w,D as B}from"./CX6LG9S9.js";import{t as b}from"./CoTZLZSA.js";import{_ as S}from"./DsDNhY6s.js";const N=Object.assign({name:"WPopup",inheritAttrs:!1},{__name:"WPopup",props:v({title:{type:String,required:!1},description:{type:String,required:!1},backdropClass:{type:String,required:!1},contentProps:{type:Object,required:!1},rootProps:{type:Object,required:!1},to:{type:String,required:!1,default:"#root"},unstyle:{type:Boolean,required:!1}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:["update:modelValue"],setup(e){const i=y(e,"modelValue",{type:Boolean,default:!1});return(l,o)=>(d(),n(t(k),c(e.rootProps,{open:i.value,"onUpdate:open":o[1]||(o[1]=p=>i.value=p)}),{default:a(()=>[l.$slots.button?(d(),n(t(D),{key:0,"as-child":""},{default:a(()=>[s(l.$slots,"button")]),_:3})):u("",!0),r(t($),{to:e.to},{default:a(()=>[r(t(P),{"as-child":""},{default:a(()=>[s(l.$slots,"backdrop",{class:"popup--backdrop absolute inset-0 bg-black/50"},()=>[o[2]||(o[2]=m("div",{class:"popup--backdrop absolute inset-0 bg-black/50"},null,-1))])]),_:3}),r(t(C),c({...e.contentProps,class:void 0},{class:t(b)(`
					popup--content-wrapper
					z-100
					focus:outline-none
					fixed
					top-1/2
					left-1/2
					-translate-x-1/2
					-translate-y-1/2
					animate-contentShow
					max-w-[100dvw]
					max-h-[100dvh]
					overflow-auto
					scrollbar-hidden
				`,!e.unstyle&&`
					p-5
					bg-neutral-100
					dark:bg-neutral-800
					rounded-md
				`,e.contentProps?.class)}),{default:a(()=>[m("div",{class:V(t(b)(`
					popup--content-inner
					flex
					flex-col
					gap-3
				`))},[s(l.$slots,"popup",{},()=>[s(l.$slots,"title",{},()=>[e.title?(d(),n(t(q),{key:0,class:"text-lg font-bold"},{default:a(()=>[f(g(e.title),1)]),_:1})):u("",!0)]),s(l.$slots,"description",{},()=>[e.description?(d(),n(t(w),{key:0},{default:a(()=>[f(g(e.description),1)]),_:1})):u("",!0)]),s(l.$slots,"extra")]),r(t(B),{"as-child":""},{default:a(()=>[s(l.$slots,"close",{},()=>[r(S,{class:"justify-self-end",onClick:o[0]||(o[0]=p=>i.value=!1)},{default:a(()=>[...o[3]||(o[3]=[f(" Close ",-1)])]),_:1})])]),_:3})],2)]),_:3},16,["class"])]),_:3},8,["to"])]),_:3},16,["open"]))}});export{N as default};
