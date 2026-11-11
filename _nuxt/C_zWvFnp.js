import{u as g}from"./B8cC-1O1.js";import{t as r}from"./CoTZLZSA.js";import{_ as p}from"./DsDNhY6s.js";import d from"./6DYtT0E1.js";import{bQ as h,af as l,q as o,bq as k,br as C,b1 as u,bJ as s,bc as e,ac as n,cB as c,bu as S,ad as i,ab as $,bz as A}from"./CX6LG9S9.js";import"./CiPV8clP.js";const z=Object.assign({name:"WAuth",inheritAttrs:!1},{__name:"WAuth",props:{providers:{type:Array,required:!0},providerStyles:{type:Object,required:!1,default:()=>({})}},emits:["login"],setup(a,{emit:m}){const b=g(),f=h(),y=m;return(x,B)=>(e(),l("div",{class:u(s(r)(`
		auth
		flex
		flex-col
		items-stretch
		justify-center
		gap-2
	`,s(f)?.class))},[(e(!0),l(o,null,k(a.providers,t=>(e(),l(o,{key:t},[t?(e(),n(p,{type:"button",class:u(s(r)(`
				auth--button
				auth--button-${t}
				text-l p-2 px-4 [&_.button--label]:gap-3
				`,a.providerStyles?.[t]?.class)),key:t,onClick:j=>y("login",t)},{default:c(()=>[a.providerStyles?.[t]?.logo?(e(),n(d,{key:0,class:"text-xl"},{default:c(()=>[(e(),n(S(a.providerStyles?.[t]?.logo)))]),_:2},1024)):i("",!0),$("div",null,A(`${s(b)("auth.sign-in-register")} ${a.providerStyles?.[t]?.name??t}`),1)]),_:2},1032,["class","onClick"])):i("",!0)],64))),128)),C(x.$slots,"extra",{iconClass:"text-xl",class:"auth--button auth--button-extra text-l p-2 px-4 [&_.button--label]:gap-3"})],2))}});export{z as default};
