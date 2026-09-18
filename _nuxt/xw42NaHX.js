import{aZ as X,bd as n,af as r,ab as o,cx as E,b7 as ae,b2 as F,bK as a,bs as V,ad as u,bA as p,b0 as N,q as H,br as G,cG as se,bw as K,a9 as $,bn as b,an as g,cC as I}from"./BLgEiFdH.js";import{I as ne}from"./yv-f748q.js";import{u as re}from"./AyjoCVtw.js";import{u as oe}from"./DT7yuVjT.js";import{t as y}from"./C7r8Fk7z.js";import{_ as ce}from"./B7Bn-L-1.js";import M from"./DlzXvBgA.js";import"./CiPV8clP.js";const ue={style:{"vertical-align":"-0.125em",height:"1em",display:"inline-block",width:"auto"},viewBox:"0 0 24 24"};function fe(i,v){return n(),r("svg",ue,[...v[0]||(v[0]=[o("g",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2"},[o("path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}),o("path",{d:"M14 2v5a1 1 0 0 0 1 1h5"})],-1)])])}const de=X({name:"lucide-file",render:fe}),me={style:{"vertical-align":"-0.125em",height:"1em",display:"inline-block",width:"auto"},viewBox:"0 0 24 24"};function pe(i,v){return n(),r("svg",me,[...v[0]||(v[0]=[o("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 3v12m5-7l-5-5l-5 5m14 7v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"},null,-1)])])}const ve=X({name:"lucide-upload",render:pe}),he=["for"],ge={class:"text-ellipsis overflow-hidden shrink-1 hidden @min-[15ch]:block"},xe={key:1,class:"file-input--label-count"},we={key:2,class:"file-input--label-name text-ellipsis overflow-hidden shrink-9999 hidden @3xs:block"},be={key:3,class:"file-input--label-name text-ellipsis overflow-hidden shrink-9999 @3xs:hidden"},ye={key:0,class:"file-input--formats-label flex-col items-center text-sm max-w-full hidden @min-[15ch]:flex"},ke={class:"text-ellipsis overflow-hidden max-w-full"},je={class:"file-input--formats-list overflow-hidden text-ellipsis max-w-full"},Ue=["id","accept","multiple","aria-invalid","aria-errormessage"],$e={class:"flex flex-initial basis-full justify-start items-center max-w-full gap-2 px-1"},Ie=["title"],Le={class:"file-input--preview flex flex-initial basis-full justify-center"},Te={key:0,class:"file-input--preview-image bg-transparency-squares flex h-[80px] flex-wrap items-center justify-center"},Ae=["src"],Re={key:1,class:"file-input--preview-no-image flex h-[80px] flex-1 basis-full flex-wrap items-center justify-center"},qe={key:1,class:"file-input--errors flex flex-col gap-2 text-sm text-red-600 dark:text-red-400 items-center px-2"},De=Object.assign({name:"WFileInput",inheritAttrs:!1},{__name:"WFileInput",props:{id:{type:String,required:!1},multiple:{type:Boolean,required:!1,default:!1},formats:{type:Array,required:!1,default:()=>["image/*",".jpeg",".jpg",".png"]},compact:{type:Boolean,required:!1,default:!1},schema:{type:Object,required:!1},inputAttrs:{type:Object,required:!1},wrapperAttrs:{type:Object,required:!1},safeToPreviewMimeTypes:{type:Array,required:!1,default:()=>["image/jpeg","image/jpg","image/png","image/gif","image/webp","image/bmp","image/x-icon","image/vnd.microsoft.icon","image/apng","image/avif","image/jxl"]}},emits:["input","errors"],setup(i,{expose:v,emit:Z}){const w=oe(),h=b(null),f=i,O=re(f),W=Z,l=K([]),k=b(!1),x=K([]),L=b(!1),d=b(!1),j=b([]);E(l,async()=>{if(d.value=!0,!f.schema||l.length===0){j.value=[],d.value=!1;return}const e=await f.schema["~standard"].validate(l.map(s=>s.file));if(e&&"issues"in e&&e.issues){d.value=!1,j.value=e.issues.map((s,t)=>({message:s.message,file:l[t]}));return}j.value=[],d.value=!1});const m=$(()=>[...x,...j.value.map(e=>new Error(e.message))]);function T(){h.value&&(h.value.value="");for(const e of l)e.previewUrl&&URL.revokeObjectURL(e.previewUrl);l.splice(0,l.length)}E([l,d],()=>{d.value||W("input",l.map(e=>e.file),T)}),E([m,d],()=>{d.value||m.value.length>0&&(L.value=!0,W("errors",[...m.value],A,T))});function A(){L.value=!1,x.splice(0,x.length)}const J=$(()=>f.formats?.filter(e=>!e.startsWith("."))??[]),R=$(()=>f.formats?.filter(e=>e.startsWith("."))??[]);ae(()=>{for(const e of l)e.previewUrl&&URL.revokeObjectURL(e.previewUrl)});function Q(e){e.previewUrl&&URL.revokeObjectURL(e.previewUrl);const s=l.indexOf(e);s>-1&&l.splice(s,1)}const Y=$(()=>R.value.join(", "));function _(e){if("dataTransfer"in e&&e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files.length>0)return h.value.files=e.dataTransfer.files,e.preventDefault(),k.value=!1,B(h.value.files)}async function ee(e){if(e.preventDefault(),h.value.files)return B(h.value.files)}function B(e){const s=[];for(const t of e){const q=t.type.toLowerCase(),C=f.safeToPreviewMimeTypes.includes(q),D=q.startsWith("image/"),te=f.formats.length===0,P=J.value.find(c=>c.endsWith("/*")?t.type.startsWith(c.slice(0,-2)):c===t.type)!==void 0,z=R.value.find(c=>t.name.endsWith(c))!==void 0;if(!te&&(!P||!z)){const c=t.name.match(/.*(\..*)/)?.[1]??"Unknown",ie=t.type===""?"":` (${t.type})`,le=`File type ${c}${ie} is not allowed. Allowed file types are: ${Y.value}.`,U=new Error(le);U.file=t,U.isValidExtension=z,U.isValidMimeType=P,s.push(U);continue}const S=C?URL.createObjectURL(t):void 0;s.length>0||l.find(c=>c.file===t)||(f.multiple||l.length<1?l.push({file:t,isImg:D,isSafeToPreviewAsImg:C,previewUrl:S}):l.splice(0,l.length,{file:t,isImg:D,isSafeToPreviewAsImg:C,previewUrl:S}))}if(s.length>0)return x.splice(0,x.length,...s),!1;x.length>0&&A()}return v({clearFiles:T,clearErrors:A}),(e,s)=>(n(),r("div",N({class:a(y)(`
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
	`,i.compact&&"rounded-sm",!i.compact&&`
			flex
			w-full
			flex-col
			items-stretch
			gap-2
			rounded-xl
			p-2
		`,k.value&&"bg-accent-500/10",m.value.length>0&&L.value&&"errored border-red-400 hover:border-red-500",i.wrapperAttrs?.class)},{...i.wrapperAttrs,class:void 0},{onDrop:_,onDragover:s[1]||(s[1]=se(t=>k.value=!0,["prevent"])),onDragleave:s[2]||(s[2]=t=>k.value=!1)}),[o("div",{class:F(a(y)(`
			file-input--wrapper
			relative
			justify-center
		`,i.compact&&"flex gap-2",!i.compact&&`
				file-input
				flex
				flex-col
				items-center
			`))},[o("label",{for:a(O),class:F(a(y)(`
				file-input--label
				pointer-events-none
				flex
				gap-1
				items-center
				justify-center
				whitespace-nowrap
				max-w-full
				px-1
			`))},[i.compact||i.multiple||a(l).length===0?V(e.$slots,"icon",{key:0},()=>[g(M,null,{default:I(()=>[g(a(ve))]),_:1})]):u("",!0),V(e.$slots,"label",{},()=>[o("div",ge,p(i.compact?i.multiple?a(w)("file-input.compact-choose-file-plural"):a(w)("file-input.compact-choose-file"):i.multiple?a(w)("file-input.non-compact-choose-file-plural"):a(w)("file-input.non-compact-choose-file")),1)]),i.compact&&i.multiple?(n(),r("div",xe,p(` (${a(l).length})`),1)):u("",!0),i.compact&&!i.multiple&&a(l).length>0?(n(),r("div",we,p(` (${a(l)[0]?.file.name})`),1)):u("",!0),i.compact&&!i.multiple&&a(l).length>0?(n(),r("div",be,p(" (...)"))):u("",!0)],10,he),!i.compact&&i.formats?.length>0?(n(),r("label",ye,[V(e.$slots,"formats",{},()=>[o("div",ke,p(a(w)("file-input.accepted-formats"))+":",1)]),o("div",je,p(R.value.join(", ")),1)])):u("",!0),o("input",N({id:a(O),class:a(y)(`
				file-input--input
				absolute
				inset-[calc(var(--spacing)*-2)]
				cursor-pointer
				z-0
				text-[0]
				opacity-0
			`,i.inputAttrs?.class),type:"file",accept:i.formats.join(", "),multiple:i.multiple},{...i.inputAttrs,class:void 0},{"aria-invalid":m.value.length>0,"aria-errormessage":m.value.map(t=>t.message).join(", "),ref_key:"el",ref:h,onInput:ee,onClick:s[0]||(s[0]=t=>t.target.value=null)}),null,16,Ue)],2),!i.compact&&a(l).length>0?(n(),r("div",{key:0,class:F(a(y)(`file-input--previews
			flex items-stretch justify-center gap-4 flex-wrap
			`,i.multiple&&`
				w-full
			`))},[(n(!0),r(H,null,G(a(l),t=>(n(),r("div",{class:"file-input--preview-wrapper z-1 relative flex min-w-0 max-w-[150px] flex-initial flex-col items-center gap-1 p-1 rounded-sm border border-neutral-300 dark:border-neutral-800 shadow-md shadow-neutral-800/30 bg-neutral-100 dark:bg-neutral-900 [&:hover_.file-input--remove-button]:opacity-100",key:t.file.name},[o("div",$e,[g(ce,{border:!1,class:"file-input--remove-button rounded-full p-0","aria-label":`Remove file ${t.file.name}`,onClick:q=>Q(t)},{default:I(()=>[g(M,null,{default:I(()=>[g(a(ne))]),_:1})]),_:1},8,["aria-label","onClick"]),o("div",{class:"file-input--preview-filename min-w-0 flex-1 basis-0 truncate break-all rounded-sm text-sm",title:t.file.name},p(t.file.name),9,Ie)]),o("div",Le,[t.isImg?(n(),r("div",Te,[o("img",{class:"max-h-full w-auto",src:t.previewUrl},null,8,Ae)])):u("",!0),t.isImg?u("",!0):(n(),r("div",Re,[g(M,null,{default:I(()=>[g(a(de),{class:"text-4xl opacity-50"})]),_:1})]))])]))),128))],2)):u("",!0),!i.compact&&m.value.length>0?(n(),r("div",qe,[(n(!0),r(H,null,G(m.value,t=>(n(),r("div",{class:"file-input--error text-center",key:t.message},p(t.message),1))),128))])):u("",!0)],16))}});export{De as default};
