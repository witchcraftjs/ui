import{u as g}from"./XM9gT1RW.js";import{t as r}from"./B5mFBRt-.js";import{_ as b}from"./zxp9nGjr.js";import h from"./CgWBegSS.js";import{bJ as d,l,F as o,n as k,r as S,S as u,a,o as e,c as n,w as c,p as C,f as i,V as $,W as A}from"./CtFoL6Vg.js";import"./bRZ-vnNX.js";const v=Object.assign({name:"WAuth",inheritAttrs:!1},{__name:"WAuth",props:{providers:{type:Array,required:!0},providerStyles:{type:Object,required:!1,default:()=>({})}},emits:["login"],setup(s,{emit:m}){const f=g(),y=d(),p=m;return(x,j)=>(e(),l("div",{class:u(a(r)(`
		auth
		flex
		flex-col
		items-stretch
		justify-center
		gap-2
	`,a(y)?.class))},[(e(!0),l(o,null,k(s.providers,t=>(e(),l(o,{key:t},[t?(e(),n(b,{type:"button",class:u(a(r)(`
				auth--button
				auth--button-${t}
				text-l p-2 px-4 [&_.button--label]:gap-3
				`,s.providerStyles?.[t]?.class)),key:t,onClick:B=>p("login",t)},{default:c(()=>[s.providerStyles?.[t]?.logo?(e(),n(h,{key:0,class:"text-xl"},{default:c(()=>[(e(),n(C(s.providerStyles?.[t]?.logo)))]),_:2},1024)):i("",!0),$("div",null,A(`${a(f)("auth.sign-in-register")} ${s.providerStyles?.[t]?.name??t}`),1)]),_:2},1032,["class","onClick"])):i("",!0)],64))),128)),S(x.$slots,"extra",{iconClass:"text-xl",class:"auth--button auth--button-extra text-l p-2 px-4 [&_.button--label]:gap-3"})],2))}});export{v as default};
