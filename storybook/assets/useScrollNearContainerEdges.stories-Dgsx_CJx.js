import{r as M,b as Y,o as F}from"./vue.esm-bundler-Cz0KJNfX.js";import{t as W}from"./twMerge-CLwyhV7-.js";const R=({containerEl:h,scrollMargin:S=10,outerScrollMargin:d,fastPixelMultiplier:c=4,fastPixelAmount:p,useTimer:v=!0,timerInterval:y=1})=>{c=p!==void 0?p*2:c;const r=Y({left:!1,right:!1,down:!1,up:!1}),l=M(!1),u=()=>{r.right=!1,r.left=!1,r.up=!1,r.down=!1,l.value=!1};let m;const C=(n,o)=>{const t=h.value;if(!t)return;const s=t.scrollLeft,f=t.scrollTop;t.scroll(s+n,f+o)},e={x:0,y:0},D=()=>{e.x=0,e.y=0},a=S,g=d??0,T=(n,o)=>{const t=h.value;if(!t)return;const s=t.getBoundingClientRect(),f=s.x,E=s.x+s.width,w=s.y,L=s.y+s.height,_=f-g,q=f+a,k=E-g,B=E+a,H=w-g,O=w+a,$=L-a,X=L+g,b=a+g;if(u(),D(),n>_&&n<q){if(t.scrollLeft>0){const i=(f+a-n)/b;e.x=-i*c}}else if(n>k&&n<B&&t.scrollWidth-t.scrollLeft-Math.round(s.width)>0){const i=(n-(E-a))/b;e.x=i*c}if(o>H&&o<O){if(t.scrollTop>0){const i=(w+a-o)/b;e.y=-i*c}}else if(o>$&&o<X&&t.scrollHeight-t.scrollTop-Math.round(s.height)>0){const i=(o-(L-a))/b;e.y=i*c}(e.x!==0||e.y!==0)&&(l.value=!0,r.right=e.x>0,r.left=e.x<0,r.up=e.y<0,r.down=e.y>0,C(e.x,e.y))},N=()=>{clearInterval(m)};return{scrollEdges:(n,o,t)=>{clearInterval(m),T(n,o),(t||v)&&(m=setInterval(()=>{T(n,o)},y))},scrollIndicator:r,resetScrollIndicator:u,clearScrollInterval:N,isScrolling:l,endScroll:()=>{N(),u(),D()}}};R.__docgenInfo={exportName:"useScrollNearContainerEdges",displayName:"useScrollNearContainerEdges",type:2,props:[{name:"containerEl",global:!1,description:"",tags:[],required:!0,type:"Ref<HTMLElement | null, HTMLElement | null>",declarations:[],schema:"Ref<HTMLElement | null, HTMLElement | null>"},{name:"scrollMargin",global:!1,description:"Margin inside contianer that allows scrolling. 10 by default.",tags:[],required:!1,type:"number | undefined",declarations:[],schema:{kind:"enum",type:"number | undefined",schema:["undefined","number"]}},{name:"outerScrollMargin",global:!1,description:"Margin around container that still allows scrolling. 0 by defualt.",tags:[],required:!1,type:"number | undefined",declarations:[],schema:{kind:"enum",type:"number | undefined",schema:["undefined","number"]}},{name:"fastPixelMultiplier",global:!1,description:`Controls the scrolling speed.

 Scroll happens faster the nearer to the outer edge the cursor.

This is calculated as a percent (0 near the inner edge, and 1 near the outer edge), which is then multiplied by this multiplier, since moving by less than 1 pixel is quite slow. The default is 4.`,tags:[],required:!1,type:"number | undefined",declarations:[],schema:{kind:"enum",type:"number | undefined",schema:["undefined","number"]}},{name:"fastPixelAmount",global:!1,description:"",tags:[{name:"deprecated",text:"Use fastPixelMultiplier instead."}],required:!1,type:"number | undefined",declarations:[],schema:{kind:"enum",type:"number | undefined",schema:["undefined","number"]}},{name:"useTimer",global:!1,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"timerInterval",global:!1,description:"",tags:[],required:!1,type:"number | undefined",declarations:[],schema:{kind:"enum",type:"number | undefined",schema:["undefined","number"]}}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/ui/ui/src/runtime/composables/useScrollNearContainerEdges.ts"};const J={title:"Composables/ScrollNearContainerEdges"},x={render:h=>{const S=h;return{setup:()=>{const d=M(null),{resetScrollIndicator:c,scrollEdges:p,endScroll:v,scrollIndicator:y,isScrolling:r}=R({containerEl:d,scrollMargin:20,outerScrollMargin:20}),l=M({x:0,y:0});F(()=>{l.value.x=d.value.getBoundingClientRect().left,l.value.y=d.value.getBoundingClientRect().top});const u=e=>{l.value.x=e.clientX,l.value.y=e.clientY,p(e.clientX,e.clientY)},m=e=>{v(),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",m)};return{args:S,containerEl:d,resetScrollIndicator:c,scrollEdges:p,endScroll:v,startDrag:e=>{document.addEventListener("mousemove",u),document.addEventListener("mouseup",m)},scrollIndicator:y,isScrolling:r,twMerge:W,pos:l}},template:`
        <div>
            <p>Scroll the container by dragging the red box (which represents the dragging mouse position).</p>
            <p>It should drag slow, then faster as the mouse nears the edges and scroll indicators should appear on the scrolling edges.</p>
        </div>
        <div 
            :class="twMerge(
                'relative flex flex-col max-h-[300px] max-w-[300px] border-2 border-red-500',
                isScrolling && 'after:content-[\\'\\'] after:absolute after:inset-0 after:border-transparent after:border-[15px]', 
                scrollIndicator.right && 'after:border-r-accent-500/60',
                scrollIndicator.down && 'after:border-b-accent-500/60',
                scrollIndicator.left && 'after:border-l-accent-500/60',
                scrollIndicator.up && 'after:border-t-accent-500/60',
            )"
            
        >
            <div 
                class="overflow-auto"
                ref="containerEl"
            >
                <div class="h-[1000px] w-[1000px]"/>
                <div
                    @mousedown="startDrag" 
                    :style="\`top:\${pos.y}px; left:\${pos.x}px;\`"
                    class="h-[20px] w-[20px] -ml-[10px] -mt-[10px] bg-red-500 cursor-move fixed"
                ></div>
            </div>
        </div>
        `}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const args = _args as any as NonNullable<Story["args"]>;
    return {
      setup: () => {
        const containerEl = ref<HTMLElement | null>(null);
        const {
          resetScrollIndicator,
          scrollEdges,
          endScroll,
          scrollIndicator,
          isScrolling
        } = useScrollNearContainerEdges({
          containerEl,
          scrollMargin: 20,
          outerScrollMargin: 20
        });
        const pos = ref({
          x: 0,
          y: 0
        });
        onMounted(() => {
          pos.value.x = containerEl.value!.getBoundingClientRect().left;
          pos.value.y = containerEl.value!.getBoundingClientRect().top;
        });
        const moveDrag = (e: MouseEvent): void => {
          pos.value.x = e.clientX;
          pos.value.y = e.clientY;
          scrollEdges(e.clientX, e.clientY);
        };
        const endDrag = (_e: MouseEvent): void => {
          endScroll();
          document.removeEventListener("mousemove", moveDrag);
          document.removeEventListener("mouseup", endDrag);
        };
        const startDrag = (_e: MouseEvent): void => {
          document.addEventListener("mousemove", moveDrag);
          document.addEventListener("mouseup", endDrag);
        };
        return {
          args,
          containerEl,
          resetScrollIndicator,
          scrollEdges,
          endScroll,
          startDrag,
          scrollIndicator,
          isScrolling,
          twMerge,
          pos
        };
      },
      template: \`
        <div>
            <p>Scroll the container by dragging the red box (which represents the dragging mouse position).</p>
            <p>It should drag slow, then faster as the mouse nears the edges and scroll indicators should appear on the scrolling edges.</p>
        </div>
        <div 
            :class="twMerge(
                'relative flex flex-col max-h-[300px] max-w-[300px] border-2 border-red-500',
                isScrolling && 'after:content-[\\\\'\\\\'] after:absolute after:inset-0 after:border-transparent after:border-[15px]', 
                scrollIndicator.right && 'after:border-r-accent-500/60',
                scrollIndicator.down && 'after:border-b-accent-500/60',
                scrollIndicator.left && 'after:border-l-accent-500/60',
                scrollIndicator.up && 'after:border-t-accent-500/60',
            )"
            
        >
            <div 
                class="overflow-auto"
                ref="containerEl"
            >
                <div class="h-[1000px] w-[1000px]"/>
                <div
                    @mousedown="startDrag" 
                    :style="\\\`top:\\\${pos.y}px; left:\\\${pos.x}px;\\\`"
                    class="h-[20px] w-[20px] -ml-[10px] -mt-[10px] bg-red-500 cursor-move fixed"
                ></div>
            </div>
        </div>
        \`
    };
  }
}`,...x.parameters?.docs?.source}}};const K=["Primary"];export{x as Primary,K as __namedExportsOrder,J as default};
