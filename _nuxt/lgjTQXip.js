import{u as d}from"./DT7yuVjT.js";import{t as r}from"./C7r8Fk7z.js";import{_ as g}from"./B7Bn-L-1.js";import p from"./DlzXvBgA.js";import{bR as h,af as l,q as o,br as k,bs as C,b2 as u,bK as a,bd as e,ac as n,cC as c,bv as S,ad as i,ab as $,bA as A}from"./BLgEiFdH.js";import"./CiPV8clP.js";const D=Object.assign({name:"WAuth",inheritAttrs:!1},{__name:"WAuth",props:{providers:{type:Array,required:!0},providerStyles:{type:Object,required:!1,default:()=>({})}},emits:["login"],setup(s,{emit:m}){const b=d(),f=h(),y=m;return(x,j)=>(e(),l("div",{class:u(a(r)(`
		auth
		flex
		flex-col
		items-stretch
		justify-center
		gap-2
	`,a(f)?.class))},[(e(!0),l(o,null,k(s.providers,t=>(e(),l(o,{key:t},[t?(e(),n(g,{type:"button",class:u(a(r)(`
				auth--button
				auth--button-${t}
				text-l p-2 px-4 [&_.button--label]:gap-3
				`,s.providerStyles?.[t]?.class)),key:t,onClick:B=>y("login",t)},{default:c(()=>[s.providerStyles?.[t]?.logo?(e(),n(p,{key:0,class:"text-xl"},{default:c(()=>[(e(),n(S(s.providerStyles?.[t]?.logo)))]),_:2},1024)):i("",!0),$("div",null,A(`${a(b)("auth.sign-in-register")} ${s.providerStyles?.[t]?.name??t}`),1)]),_:2},1032,["class","onClick"])):i("",!0)],64))),128)),C(x.$slots,"extra",{iconClass:"text-xl",class:"auth--button auth--button-extra text-l p-2 px-4 [&_.button--label]:gap-3"})],2))}});export{D as default};
