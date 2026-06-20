import{c6 as b,o,l as f,V as s,c as n,w as l,a as t,co as h,M as a,cp as k,m as g,cq as p,r as d,cr as w,cs as P,ad as v,ae as q,X as x,W as T,ct as B,S}from"./CtFoL6Vg.js";import{u as C}from"./D-IhKWrW.js";import{t as y}from"./B5mFBRt-.js";import u from"./CgWBegSS.js";const A={style:{"vertical-align":"-0.125em",height:"1em",display:"inline-block",width:"auto"},viewBox:"0 0 24 24"};function D(e,r){return o(),f("svg",A,[...r[0]||(r[0]=[s("g",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2"},[s("circle",{cx:"12",cy:"12",r:"10"}),s("path",{d:"M12 16v-4m0-4h.01"})],-1)])])}const c=b({name:"lucide-info",render:D}),W={key:0,class:"tooltip--trigger"},N={key:1,class:"tooltip--trigger"},F={class:"tooltip--content-inner flex flex-col justify-center"},M={__name:"WTooltip",props:{constrainWidthTo:{type:[Number,String,null],required:!1,default:"available"},constrainHeightTo:{type:[Number,String,null],required:!1,default:"available"},delayDuration:{type:Number,required:!1,default:200},disabled:{type:Boolean,required:!1,default:!1},triggerWhileDisabled:{type:Boolean,required:!1,default:!1},triggerAsChild:{type:Boolean,required:!1},content:{type:String,required:!1,default:""},collisionBoundary:{type:null,required:!1},to:{type:String,required:!1,default:"#root"},rootProps:{type:null,required:!1},contentProps:{type:null,required:!1},unstyle:{type:Boolean,required:!1}},setup(e){const r=e,m=C("tooltip",r,[r?.contentProps?.style]);return(i,R)=>(o(),n(t(h),{disabled:e.disabled},{default:l(()=>[a(t(k),g({"delay-duration":e.rootProps?.delayDuration??200,"disable-closing-trigger":e.rootProps?.disableClosingTrigger??!1},e.rootProps),{default:l(()=>[e.triggerWhileDisabled||e.triggerAsChild?(o(),n(t(p),{key:0,"as-child":""},{default:l(()=>[d(i.$slots,"default",{},()=>[e.triggerWhileDisabled?(o(),f("span",W,[a(u,{class:"text-neutral-500"},{default:l(()=>[a(t(c))]),_:1})])):(o(),f("button",N,[a(u,{class:"text-neutral-500"},{default:l(()=>[a(t(c))]),_:1})]))])]),_:3})):(o(),n(t(p),{key:1,class:"tooltip--trigger"},{default:l(()=>[d(i.$slots,"default",{},()=>[a(u,{class:"text-neutral-500"},{default:l(()=>[a(t(c))]),_:1})])]),_:3})),a(t(w),{to:e.to},{default:l(()=>[a(t(P),g({style:t(m),class:t(y)(`
					z-100
					tooltip--content-wrapper
					origin-[var(--reka-tooltip-content-transform-origin)]
					data-[side=top]:animate-slideDownAndFade
					data-[side=right]:animate-slideLeftAndFade
					data-[side=bottom]:animate-slideUpAndFade
					data-[side=left]:animate-slideRightAndFade
					overflow-auto
				`,!e.unstyle&&`
						bg-neutral-50
						dark:bg-neutral-800
						rounded-sm
						shadow-sm
						shadow-black/30
						border
						border-black/30
						p-2
						whitespace-pre-wrap
						text-sm
					`,e.contentProps?.class)},{collisionPadding:20,side:"top",...e.contentProps,class:void 0,style:void 0}),{default:l(()=>[s("div",F,[d(i.$slots,"content",v(q({content:e.content})),()=>[x(T(e.content),1)])]),a(t(B),{class:S(t(y)(`
							tooltip--arrow
							-mt-px
							relative
						`,e.unstyle&&"fill-none",!e.unstyle&&`
							fill-neutral-50
							dark:fill-neutral-800
							drop-shadow-[0_2px_1px_rgba(0,0,0,0.3)]
						`))},null,8,["class"])]),_:3},16,["style","class"])]),_:3},8,["to"])]),_:3},16,["delay-duration","disable-closing-trigger"])]),_:3},8,["disabled"]))}};export{M as default};
