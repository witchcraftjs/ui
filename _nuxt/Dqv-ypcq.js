import{c6 as X,o as n,l as r,V as o,x as E,b4 as le,S as W,a as s,r as O,f as c,W as m,m as N,F as S,n as H,aN as ie,ce as P,s as I,a3 as b,M as g,w as L}from"./CtFoL6Vg.js";import{I as se}from"./dmPmFL9z.js";import{u as ae}from"./ZpmTehDD.js";import{u as ne}from"./XM9gT1RW.js";import{t as y}from"./B5mFBRt-.js";import{_ as re}from"./zxp9nGjr.js";import q from"./CgWBegSS.js";import"./bRZ-vnNX.js";const oe={style:{"vertical-align":"-0.125em",height:"1em",display:"inline-block",width:"auto"},viewBox:"0 0 24 24"};function ue(l,p){return n(),r("svg",oe,[...p[0]||(p[0]=[o("g",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2"},[o("path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}),o("path",{d:"M14 2v5a1 1 0 0 0 1 1h5"})],-1)])])}const ce=X({name:"lucide-file",render:ue}),fe={style:{"vertical-align":"-0.125em",height:"1em",display:"inline-block",width:"auto"},viewBox:"0 0 24 24"};function de(l,p){return n(),r("svg",fe,[...p[0]||(p[0]=[o("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 3v12m5-7l-5-5l-5 5m14 7v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"},null,-1)])])}const me=X({name:"lucide-upload",render:de}),pe=["for"],ve={class:"text-ellipsis overflow-hidden shrink-1 hidden @min-[15ch]:block"},he={key:1,class:"file-input--label-count"},ge={key:2,class:"file-input--label-name text-ellipsis overflow-hidden shrink-9999 hidden @3xs:block"},xe={key:3,class:"file-input--label-name text-ellipsis overflow-hidden shrink-9999 @3xs:hidden"},we={key:0,class:"file-input--formats-label flex-col items-center text-sm max-w-full hidden @min-[15ch]:flex"},be={class:"text-ellipsis overflow-hidden max-w-full"},ye={class:"file-input--formats-list overflow-hidden text-ellipsis max-w-full"},ke=["id","accept","multiple","aria-invalid","aria-errormessage"],je={class:"flex flex-initial basis-full justify-start items-center max-w-full gap-2 px-1"},Ue=["title"],$e={class:"file-input--preview flex flex-initial basis-full justify-center"},Ie={key:0,class:"file-input--preview-image bg-transparency-squares flex h-[80px] flex-wrap items-center justify-center"},Le=["src"],Fe={key:1,class:"file-input--preview-no-image flex h-[80px] flex-1 basis-full flex-wrap items-center justify-center"},Re={key:1,class:"file-input--errors flex flex-col gap-2 text-sm text-red-600 dark:text-red-400 items-center px-2"},Me=Object.assign({name:"WFileInput",inheritAttrs:!1},{__name:"WFileInput",props:{id:{type:String,required:!1},multiple:{type:Boolean,required:!1,default:!1},formats:{type:Array,required:!1,default:()=>["image/*",".jpeg",".jpg",".png"]},compact:{type:Boolean,required:!1,default:!1},schema:{type:Object,required:!1},inputAttrs:{type:Object,required:!1},wrapperAttrs:{type:Object,required:!1}},emits:["input","errors"],setup(l,{expose:p,emit:G}){const w=ne(),v=b(null),h=l,B=ae(h),C=G,i=P([]),k=b(!1),x=P([]),F=b(!1),f=b(!1),j=b([]);E(i,async()=>{if(f.value=!0,!h.schema||i.length===0){j.value=[],f.value=!1;return}const e=await h.schema["~standard"].validate(i.map(a=>a.file));if(e&&"issues"in e&&e.issues){f.value=!1,j.value=e.issues.map((a,t)=>({message:a.message,file:i[t]}));return}j.value=[],f.value=!1});const d=I(()=>[...x,...j.value.map(e=>new Error(e.message))]);function R(){v.value&&(v.value.value="");for(const e of i)e.previewUrl&&URL.revokeObjectURL(e.previewUrl);i.splice(0,i.length)}E([i,f],()=>{f.value||C("input",i.map(e=>e.file),R)}),E([d,f],()=>{f.value||d.value.length>0&&(F.value=!0,C("errors",[...d.value],V,R))});function V(){F.value=!1,x.splice(0,x.length)}const J=I(()=>h.formats?.filter(e=>!e.startsWith("."))??[]),A=I(()=>h.formats?.filter(e=>e.startsWith("."))??[]);le(()=>{for(const e of i)e.previewUrl&&URL.revokeObjectURL(e.previewUrl)});function K(e){e.previewUrl&&URL.revokeObjectURL(e.previewUrl);const a=i.indexOf(e);a>-1&&i.splice(a,1)}const Q=I(()=>A.value.join(", "));function Y(e){if("dataTransfer"in e&&e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files.length>0)return v.value.files=e.dataTransfer.files,e.preventDefault(),k.value=!1,M(v.value.files)}async function Z(e){if(e.preventDefault(),v.value.files)return M(v.value.files)}function M(e){const a=[];for(const t of e){const U=t.type.startsWith("image"),_=h.formats.length===0,T=J.value.find(u=>u.endsWith("/*")?t.type.startsWith(u.slice(0,-2)):u===t.type)!==void 0,D=A.value.find(u=>t.name.endsWith(u))!==void 0;if(!_&&(!T||!D)){const u=t.name.match(/.*(\..*)/)?.[1]??"Unknown",ee=t.type===""?"":` (${t.type})`,te=`File type ${u}${ee} is not allowed. Allowed file types are: ${Q.value}.`,$=new Error(te);$.file=t,$.isValidExtension=D,$.isValidMimeType=T,a.push($);continue}const z=U?URL.createObjectURL(t):void 0;a.length>0||i.find(u=>u.file===t)||(h.multiple||i.length<1?i.push({file:t,isImg:U,previewUrl:z}):i.splice(0,i.length,{file:t,isImg:U,previewUrl:z}))}if(a.length>0)return x.splice(0,x.length,...a),!1;x.length>0&&V()}return p({clearFiles:R,clearErrors:V}),(e,a)=>(n(),r("div",N({class:s(y)(`
		file-input
		justify-center
		border-2
		border-dashed
		border-accent-500/80
		focus-outline-within
		transition-[border-color,box-shadow]
		ease-out
		hover:bg-accent-500/10
		outlined-focus-within
	`,l.compact&&"rounded-sm",!l.compact&&`
			flex
			w-full
			flex-col
			items-stretch
			gap-2
			rounded-xl
			p-2
		`,k.value&&"bg-accent-500/10",d.value.length>0&&F.value&&"errored border-red-400 hover:border-red-500",l.wrapperAttrs?.class)},{...l.wrapperAttrs,class:void 0},{onDrop:Y,onDragover:a[1]||(a[1]=ie(t=>k.value=!0,["prevent"])),onDragleave:a[2]||(a[2]=t=>k.value=!1)}),[o("div",{class:W(s(y)(`
			file-input--wrapper
			relative
			justify-center
		`,l.compact&&"flex gap-2",!l.compact&&`
				file-input
				flex
				flex-col
				items-center
			`))},[o("label",{for:s(B),class:W(s(y)(`
				file-input--label
				pointer-events-none
				flex
				gap-1
				items-center
				justify-center
				whitespace-nowrap
				max-w-full
				px-1
			`))},[l.compact||l.multiple||s(i).length===0?O(e.$slots,"icon",{key:0},()=>[g(q,null,{default:L(()=>[g(s(me))]),_:1})]):c("",!0),O(e.$slots,"label",{},()=>[o("div",ve,m(l.compact?l.multiple?s(w)("file-input.compact-choose-file-plural"):s(w)("file-input.compact-choose-file"):l.multiple?s(w)("file-input.non-compact-choose-file-plural"):s(w)("file-input.non-compact-choose-file")),1)]),l.compact&&l.multiple?(n(),r("div",he,m(` (${s(i).length})`),1)):c("",!0),l.compact&&!l.multiple&&s(i).length>0?(n(),r("div",ge,m(` (${s(i)[0]?.file.name})`),1)):c("",!0),l.compact&&!l.multiple&&s(i).length>0?(n(),r("div",xe,m(" (...)"))):c("",!0)],10,pe),!l.compact&&l.formats?.length>0?(n(),r("label",we,[O(e.$slots,"formats",{},()=>[o("div",be,m(s(w)("file-input.accepted-formats"))+":",1)]),o("div",ye,m(A.value.join(", ")),1)])):c("",!0),o("input",N({id:s(B),class:s(y)(`
				file-input--input
				absolute
				inset-[calc(var(--spacing)*-2)]
				cursor-pointer
				z-0
				text-[0]
				opacity-0
			`,l.inputAttrs?.class),type:"file",accept:l.formats.join(", "),multiple:l.multiple},{...l.inputAttrs,class:void 0},{"aria-invalid":d.value.length>0,"aria-errormessage":d.value.map(t=>t.message).join(", "),ref_key:"el",ref:v,onInput:Z,onClick:a[0]||(a[0]=t=>t.target.value=null)}),null,16,ke)],2),!l.compact&&s(i).length>0?(n(),r("div",{key:0,class:W(s(y)(`file-input--previews
			flex items-stretch justify-center gap-4 flex-wrap
			`,l.multiple&&`
				w-full
			`))},[(n(!0),r(S,null,H(s(i),t=>(n(),r("div",{class:"file-input--preview-wrapper z-1 relative flex min-w-0 max-w-[150px] flex-initial flex-col items-center gap-1 p-1 rounded-sm border border-neutral-300 dark:border-neutral-800 shadow-md shadow-neutral-800/30 bg-neutral-100 dark:bg-neutral-900 [&:hover_.file-input--remove-button]:opacity-100",key:t.file.name},[o("div",je,[g(re,{border:!1,class:"file-input--remove-button rounded-full p-0","aria-label":`Remove file ${t.file.name}`,onClick:U=>K(t)},{default:L(()=>[g(q,null,{default:L(()=>[g(s(se))]),_:1})]),_:1},8,["aria-label","onClick"]),o("div",{class:"file-input--preview-filename min-w-0 flex-1 basis-0 truncate break-all rounded-sm text-sm",title:t.file.name},m(t.file.name),9,Ue)]),o("div",$e,[t.isImg?(n(),r("div",Ie,[o("img",{class:"max-h-full w-auto",src:t.previewUrl},null,8,Le)])):c("",!0),t.isImg?c("",!0):(n(),r("div",Fe,[g(q,null,{default:L(()=>[g(s(ce),{class:"text-4xl opacity-50"})]),_:1})]))])]))),128))],2)):c("",!0),!l.compact&&d.value.length>0?(n(),r("div",Re,[(n(!0),r(S,null,H(d.value,t=>(n(),r("div",{class:"file-input--error text-center",key:t.message},m(t.message),1))),128))])):c("",!0)],16))}});export{Me as default};
