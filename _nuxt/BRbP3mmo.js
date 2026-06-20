import{B as y,c as n,w as a,m as c,a as t,bN as k,a1 as v,o as d,bP as D,r as s,f as u,M as r,bQ as P,cj as $,V as m,ch as V,S as w,ck as C,X as f,W as g,ci as S,cl as q}from"./CtFoL6Vg.js";import{t as b}from"./B5mFBRt-.js";import{_ as B}from"./zxp9nGjr.js";const x=Object.assign({name:"WPopup",inheritAttrs:!1},{__name:"WPopup",props:v({title:{type:String,required:!1},description:{type:String,required:!1},backdropClass:{type:String,required:!1},contentProps:{type:Object,required:!1},rootProps:{type:Object,required:!1},to:{type:String,required:!1,default:"#root"},unstyle:{type:Boolean,required:!1}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:["update:modelValue"],setup(e){const i=y(e,"modelValue",{type:Boolean,default:!1});return(l,o)=>(d(),n(t(k),c(e.rootProps,{open:i.value,"onUpdate:open":o[1]||(o[1]=p=>i.value=p)}),{default:a(()=>[l.$slots.button?(d(),n(t(D),{key:0,"as-child":""},{default:a(()=>[s(l.$slots,"button")]),_:3})):u("",!0),r(t(P),{to:e.to},{default:a(()=>[r(t($),{"as-child":""},{default:a(()=>[s(l.$slots,"backdrop",{class:"popup--backdrop absolute inset-0 bg-black/50"},()=>[o[2]||(o[2]=m("div",{class:"popup--backdrop absolute inset-0 bg-black/50"},null,-1))])]),_:3}),r(t(V),c({...e.contentProps,class:void 0},{class:t(b)(`
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
				`,e.contentProps?.class)}),{default:a(()=>[m("div",{class:w(t(b)(`
					popup--content-inner
					flex
					flex-col
					gap-3
				`))},[s(l.$slots,"popup",{},()=>[s(l.$slots,"title",{},()=>[e.title?(d(),n(t(C),{key:0,class:"text-lg font-bold"},{default:a(()=>[f(g(e.title),1)]),_:1})):u("",!0)]),s(l.$slots,"description",{},()=>[e.description?(d(),n(t(S),{key:0},{default:a(()=>[f(g(e.description),1)]),_:1})):u("",!0)]),s(l.$slots,"extra")]),r(t(q),{"as-child":""},{default:a(()=>[s(l.$slots,"close",{},()=>[r(B,{class:"justify-self-end",onClick:o[0]||(o[0]=p=>i.value=!1)},{default:a(()=>[...o[3]||(o[3]=[f(" Close ",-1)])]),_:1})])]),_:3})],2)]),_:3},16,["class"])]),_:3},8,["to"])]),_:3},16,["open"]))}});export{x as default};
