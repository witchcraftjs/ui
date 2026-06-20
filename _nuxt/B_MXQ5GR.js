import{c as we}from"./DyCH_Usl.js";import{c as ke}from"./DW0dok2K.js";import{i as ye}from"./B9Vz3BzZ.js";import{u as X}from"./B8YfHvdD.js";import{C as q}from"./475SGCPX.js";import{c as w}from"./krPynjdP.js";import{I as $e}from"./DnKfAHy0.js";import{u as xe}from"./ZpmTehDD.js";import{u as Se}from"./XM9gT1RW.js";import{t as oe}from"./B5mFBRt-.js";import{_ as U}from"./zxp9nGjr.js";import Ce from"./CgWBegSS.js";import Ae from"./DQaorp-O.js";import{bJ as ze,B as ne,a3 as V,al as Ve,x as G,l as ie,V as m,q as L,S as y,a as u,f as qe,r as se,a1 as ce,s as M,a$ as Re,o as ue,M as S,w as P,X as de,W as ve}from"./CtFoL6Vg.js";import"./bRZ-vnNX.js";import"./BwDddpte.js";function pe(t,f){try{const p=typeof t=="string"?new q(t):new q("srgb",[t.r/255,t.g/255,t.b/255],f?t.a:1),l=p.hsv;return!l||l[1]===void 0||l[2]===void 0?void 0:{h:w(l[0]??0,0,Number.MAX_SAFE_INTEGER),s:w(l[1],0,100),v:w(l[2],0,100),a:w(f?p.alpha:1,0,1)}}catch{return}}function W(t,f){try{const p=typeof t=="string"?new q(t):new q("hsv",[t.h,t.s,t.v],f?t.a:1),l=p.srgb;return!l||l[0]===void 0||l[1]===void 0||l[2]===void 0?void 0:{r:w(l[0]/1*255,0,255),g:w(l[1]/1*255,0,255),b:w(l[2]/1*255,0,255),a:w(f?p.alpha:1,0,1)}}catch{return}}function B(t,f){const p=t.toFixed(f);return Number.parseFloat(p).toString()}function Ee(t,f,p){const l=B(t.r,p),$=B(t.g,p),s=B(t.b,p),C=t.a!==void 0?B(t.a,p):void 0;return f?`rgba(${l}, ${$}, ${s}, ${C})`:`rgb(${l}, ${$}, ${s})`}const Te=["id","aria-label"],_e=["aria-description","aria-valuetext"],Ke=["aria-valuenow","aria-label","aria-description"],De=["aria-label","aria-valuenow","aria-description"],Le={class:"color-picker--footer flex w-full flex-1 gap-2"},Me={class:"color-picker--preview-wrapper bg-transparency-squares relative aspect-square h-[calc(var(--slider-size,var(--_slider-size))*3)] rounded-full shadow-xs"},Pe={class:"color-picker--input-group flex flex-1 items-center gap-2"},Be={class:"color-picker--save-cancel-group flex w-full items-center justify-center gap-2"},fe=`
	slider
	no-touch-action
	h-4
	w-full
	relative
	flex
`,Y=`
	handle
	h-[var(--slider-size,var(--_slider-size))]
	w-[var(--slider-size,var(--_slider-size))]
	shadow-xs
	shadow-black/50
	border-2 border-neutral-700
	rounded-full
	absolute
	cursor-pointer
	outline-hidden
	focus:border-accent-500
	active:border-accent-500
	hover:border-accent-500
`,ar=Object.assign({name:"WColorPicker"},{__name:"WColorPicker",props:ce({id:{type:String,required:!1},label:{type:String,required:!1},allowAlpha:{type:Boolean,required:!1,default:!0},stringPrecision:{type:Number,required:!1,default:3},customRepresentation:{type:Object,required:!1,default:void 0},border:{type:Boolean,required:!1,default:!0},copyTransform:{type:Function,required:!1,default:(t,f)=>f},valid:{type:Boolean,required:!1,default:!0}},{modelValue:{type:Object,required:!1,default:()=>({r:0,g:0,b:0})},modelModifiers:{},tempValue:{type:null,required:!1,default:()=>{}},tempValueModifiers:{}}),emits:ce(["save","cancel"],["update:modelValue","update:tempValue"]),setup(t,{emit:f}){const p=ze(),l=Se(),$=f,s=t,C=xe(s),I=l("color-picker.aria.description"),R=ne(t,"modelValue",{type:Object,required:!1,default:()=>({r:0,g:0,b:0})}),k=ne(t,"tempValue",{type:null,required:!1,default:()=>{}}),E=V(null),T=V(null),A=V(null);let N=null,J=null,Q=null;const F={hue:{el:T,xKey:"h",xSteps:360},alpha:{el:A,xSteps:1,xKey:"a"},all:{el:E,xSteps:100,ySteps:100,xKey:"s",yKey:"v"}},o=Re({percent:{h:0,s:0,v:0,a:0},val:{h:0,s:0,v:0,a:0}}),Z=M(()=>{const e=W(o.val,s.allowAlpha);return e||X(),e}),ee=M(()=>{const e=Z.value;return e||X(),`rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`}),x=M(()=>s.customRepresentation?s.customRepresentation.fromHsvaToString({...o.val},s.allowAlpha):Ee(Z.value,s.allowAlpha,s.stringPrecision)),z=V(x.value);function ge(){z.value!==x.value&&(z.value=x.value)}function me(e,r){if(!N)return;const a=N,{height:n,width:g}=e;a.clearRect(0,0,g,n);const d=a.createLinearGradient(0,0,0,n);d.addColorStop(0,"white"),d.addColorStop(1,"black");const v=a.createLinearGradient(0,0,g,0);v.addColorStop(0,`hsla(${r} 100% 50% / 0)`),v.addColorStop(1,`hsla(${r} 100% 50% /1)`),a.fillStyle=d,a.fillRect(0,0,g,n),a.fillStyle=v,a.globalCompositeOperation="multiply",a.fillRect(0,0,g,n),a.globalCompositeOperation="source-over"}function re(e,r,a,n=360){if(!r)return;const{height:g,width:d}=e;r.clearRect(0,0,d,g);const v=ye(a)?a.length-1:n,c=r.createLinearGradient(0,0,d,0);for(let i=0;i<v+1;i++){const b=a instanceof Function?a(i):a[i];b===void 0&&X(),c.addColorStop(i/v,b)}r.fillStyle=c,r.fillRect(0,0,d,g)}function ae(e,r,a=100,n=100,g=!1){const d=e/r,v=d*a,c=Math.round(v*n)/n,i=a===n?c:Math.round(d*100*n)/n,b={val:c,percent:i};return g&&(b.val=a-c),b}const _=V("");let K=!1;function j(e,r){requestAnimationFrame(()=>{if(r==="")return;const a=F[r]?.el.value;if(!a||!F[r])return;const{x:n,y:g,width:d,height:v}=a.getBoundingClientRect(),c=F[r];if(c.xKey!==void 0){let i=e.clientX-n;i=i<0?0:i>d?d:i;const b=ae(i,d,c.xSteps??100);o.percent[c.xKey]=b.percent,o.val[c.xKey]=b.val}if(c.yKey!==void 0){let i=e.clientY-g;i=i<0?0:i>v?v:i;const b=ae(i,v,c.ySteps??100,100,!0);o.percent[c.yKey]=b.percent,o.val[c.yKey]=b.val}})}const h={keydown:(e,r)=>{if(we(e.target),e.target?.getBoundingClientRect){if(["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(e.key)){e.preventDefault();const{x:a,y:n,width:g,height:d}=e.target.getBoundingClientRect();let v=e.key==="ArrowRight"?1:e.key==="ArrowLeft"?-1:0,c=e.key==="ArrowUp"?-1:e.key==="ArrowDown"?1:0;e.shiftKey&&(v*=10),e.shiftKey&&(c*=10),j({clientX:a+g/2+v,clientY:n+d/2+c},r)}e.key==="Enter"&&(e.preventDefault(),le())}},pointerdown:(e,r)=>{const a=`#${C} .color-picker--${r}-handle`,n=document.querySelector(a);n instanceof HTMLElement&&n.focus(),!K&&(e.preventDefault(),_.value=r,K=!0,document.addEventListener("pointermove",h.pointermove),document.addEventListener("pointerup",h.pointerup),j(e,_.value))},pointerleave:e=>{K&&e.preventDefault()},pointermove:e=>{e.preventDefault(),j(e,_.value)},pointerup:e=>{e.preventDefault(),K=!1,_.value="",document.removeEventListener("pointermove",h.pointermove),document.removeEventListener("pointerup",h.pointerup)}};function H(e){if(A.value){const r=new q("hsv",[e.h,e.s,e.v],e.a).to("hsl"),a=r.clone();a.alpha=0;const n=r.clone();n.alpha=1,re(A.value,Q,[a.toString(),n.toString()])}re(T.value,J,r=>`hsl(${r} 100% 50%)`),me(E.value,e.h)}function te(e){o.percent.h=Math.round(e.h/360*1e4)/100,o.percent.s=e.s,o.percent.v=100-e.v,o.percent.a=s.allowAlpha&&e.a!==void 0?e.a*100:1,o.val={...e,a:s.allowAlpha?e.a:1}}function D(e){const r=pe(e,s.allowAlpha);r&&(H(r),te(r))}function le(){const e=W(o.val,s.allowAlpha);e&&(R.value=e,k.value=void 0,$("save",e))}function he(e){const r=e.target?.value,a=s.customRepresentation?.fromStringToHsva?s.customRepresentation.fromStringToHsva(r):pe(r,s.allowAlpha);a&&(H(a),te(a))}let O=!1;Ve(()=>{D(R.value),k.value!==void 0&&D(k.value);const e=document.querySelector(`#${C} .color-picker--all-handle`);e instanceof HTMLElement&&e.focus(),N=E.value?.getContext("2d")??null,J=T.value?.getContext("2d")??null,Q=A.value?.getContext("2d")??null}),G(R,()=>{D(R.value)}),G(k,()=>{k.value!==void 0&&(O=!0,D(k.value),setTimeout(()=>{O=!1},0))}),G(o,()=>{if(H(o.val),z.value=x.value,O)return;const e=W(o.val,s.allowAlpha);e&&(k.value=e)});const be=M(()=>o.percent.v<50||o.val.a===void 0||o.val.a<.5);return(e,r)=>(ue(),ie("div",{id:u(C),"aria-label":u(l)("color-picker.aria"),class:y(u(oe)(`color-picker
			[--_slider-size:calc(var(--spacing)_*_4)]
			[--_contrast-dark:var(--color-neutral-100)]
			[--_contrast-light:var(--color-neutral-800)]
			[--_fg:rgb(var(--_contrast-dark))]
			[--_bg:rgb(var(--_contrast-light))]
			[--slider-size:calc(var(--spacing)_*_4)]
			[--contrast-dark:var(--color-neutral-100)]
			[--contrast-light:var(--color-neutral-800)]
			[--fg:rgb(var(--contrast-dark,var(--_contrast-dark)))]
			[--bg:rgb(var(--contrast-light,var(--_contrast-light)))]
			max-w-[300px]
			flex flex-col items-center justify-center
			bg-neutral-50
			dark:bg-neutral-800
			gap-3
			p-3
		`,be.value&&`
			[--fg:rgb(var(--contrast-light,var(--_contrast-light)))]
			[--bg:rgb(var(--contrast-dark,var(--_contrast-dark)))]
			[--_fg:rgb(var(--_contrast-light))]
			[--_bg:rgb(var(--_contrast-dark))]
		`,t.border&&`
			border
			rounded-sm
			border-neutral-300
			dark:border-neutral-900
			shadow-md
			shadow-black/30
		`,u(p)?.class))},[m("div",{class:y(`color-picker--all-picker
			no-touch-action
			w-full
			aspect-square
			relative
			flex
			rounded-sm
			focus:border-accent-500
		`),onPointerdown:r[1]||(r[1]=a=>h.pointerdown(a,"all")),onPointerleave:r[2]||(r[2]=a=>h.pointerleave(a))},[m("canvas",{class:"size-full shadow-xs shadow-black/50 rounded-sm",ref_key:"pickerEl",ref:E},null,512),m("div",{role:"slider","aria-description":u(I),"aria-valuetext":`${u(l)("color-picker.aria.saturation")}: ${o.percent.s}, ${u(l)("color-picker.aria.value")}: ${o.percent.v}`,class:y(u(oe)(`
					color-picker--all-handle
					${Y}
					border-[var(--fg,var(--_fg))]
					hover:shadow-black
					active:shadow-black
				`)),tabindex:"0",style:L(`
					left: calc(${o.percent.s}% - var(--slider-size,var(--_slider-size))/2);
					top: calc(${o.percent.v}% - var(--slider-size,var(--_slider-size))/2);
					background: ${ee.value};
				`),onKeydown:r[0]||(r[0]=a=>h.keydown(a,"all"))},null,46,_e)],32),m("div",{class:y(`color-picker--hue-slider ${fe}`),onPointerdown:r[4]||(r[4]=a=>h.pointerdown(a,"hue"))},[m("canvas",{class:"size-full shadow-xs shadow-black/50 rounded-sm",ref_key:"hueSliderEl",ref:T},null,512),m("div",{role:"slider","aria-valuenow":`${o.percent.h}`,"aria-valuemin":0,"aria-valuemax":100,"aria-label":u(l)("color-picker.aria.hue"),"aria-description":u(I),tabindex:"0",class:y(`
				color-picker--hue-handle
				${Y}
			`),style:L(`left: calc(${o.percent.h}% - var(--slider-size,var(--_slider-size))/2)`),onKeydown:r[3]||(r[3]=a=>h.keydown(a,"hue"))},null,46,Ke)],34),t.allowAlpha?(ue(),ie("div",{key:0,class:y(`
			color-picker--alpha-slider
			${fe}
		`),onPointerdown:r[6]||(r[6]=a=>h.pointerdown(a,"alpha"))},[m("canvas",{class:"size-full shadow-xs shadow-black/50 rounded-sm bg-transparency-squares",ref_key:"alphaSliderEl",ref:A},null,512),m("div",{role:"slider","aria-label":u(l)("color-picker.aria.alpha-slider"),"aria-valuenow":`${o.percent.a}`,"aria-valuemin":0,"aria-valuemax":100,"aria-description":u(I),tabindex:"0",class:y(`color-picker--alpha-handle ${Y}`),style:L(`left: calc(${o.percent.a}% - var(--slider-size,var(--_slider-size))/2)`),onKeydown:r[5]||(r[5]=a=>h.keydown(a,"alpha"))},null,46,De)],34)):qe("",!0),m("div",Le,[m("div",Me,[m("div",{class:"color-picker--footer--preview size-full rounded-full border-2 border-neutral-600 dark:border-neutral-300",style:L(`background: ${ee.value}`)},null,4)]),m("div",Pe,[se(e.$slots,"input",{},()=>[S(Ae,{valid:t.valid,class:"color-picker--input w-full","aria-label":t.label,modelValue:z.value,"onUpdate:modelValue":r[7]||(r[7]=a=>z.value=a),onInput:he,onBlur:ge},null,8,["valid","aria-label","modelValue"]),S(U,{class:"color-picker--copy-button","aria-label":u(l)("copy"),onClick:r[8]||(r[8]=a=>u(ke)(t.copyTransform?.(o.val,x.value)??x.value))},{default:P(()=>[S(Ce,null,{default:P(()=>[S(u($e))]),_:1})]),_:1},8,["aria-label"])])])]),se(e.$slots,"buttons",{},()=>[m("div",Be,[S(U,{class:"color-picker--save-button",onClick:r[9]||(r[9]=a=>le())},{default:P(()=>[de(ve(u(l)("save")),1)]),_:1}),S(U,{class:"color-picker--cancel-button",onClick:r[10]||(r[10]=a=>$("cancel"))},{default:P(()=>[de(ve(u(l)("cancel")),1)]),_:1})])])],10,Te))}});export{ar as default};
