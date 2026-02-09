import{r as C,d as Y,o as F}from"./vue.esm-bundler-D34C2Wlw.js";import{t as W}from"./twMerge-BZGhTDWl.js";const q=({containerEl:h,scrollMargin:d=10,outerScrollMargin:S,fastPixelMultiplier:l=4,fastPixelAmount:p,useTimer:y=!0,timerInterval:E=1})=>{l=p!==void 0?p*2:l;const t=Y({left:!1,right:!1,down:!1,up:!1}),u=C(!1),m=()=>{t.right=!1,t.left=!1,t.up=!1,t.down=!1,u.value=!1};let v;const c=(n,o)=>{const e=h.value;if(!e)return;const s=e.scrollLeft,g=e.scrollTop;e.scroll(s+n,g+o)},r={x:0,y:0},D=()=>{r.x=0,r.y=0},a=d,f=S??0,T=(n,o)=>{const e=h.value;if(!e)return;const s=e.getBoundingClientRect(),g=s.x,w=s.x+s.width,L=s.y,I=s.y+s.height,N=g-f,_=g+a,k=w-f,B=w+a,H=L-f,O=L+a,$=I-a,X=I+f,b=a+f;if(m(),D(),n>N&&n<_){if(e.scrollLeft>0){const i=(g+a-n)/b;r.x=-i*l}}else if(n>k&&n<B&&e.scrollWidth-e.scrollLeft-Math.round(s.width)>0){const i=(n-(w-a))/b;r.x=i*l}if(o>H&&o<O){if(e.scrollTop>0){const i=(L+a-o)/b;r.y=-i*l}}else if(o>$&&o<X&&e.scrollHeight-e.scrollTop-Math.round(s.height)>0){const i=(o-(I-a))/b;r.y=i*l}(r.x!==0||r.y!==0)&&(u.value=!0,t.right=r.x>0,t.left=r.x<0,t.up=r.y<0,t.down=r.y>0,c(r.x,r.y))},R=()=>{clearInterval(v)};return{scrollEdges:(n,o,e)=>{clearInterval(v),T(n,o),(e||y)&&(v=setInterval(()=>{T(n,o)},E))},scrollIndicator:t,resetScrollIndicator:m,clearScrollInterval:R,isScrolling:u,endScroll:()=>{R(),m(),D()}}};q.__docgenInfo={exportName:"useScrollNearContainerEdges",displayName:"useScrollNearContainerEdges",type:2,props:[{name:"containerEl",global:!1,description:"",tags:[],required:!0,type:"Ref<HTMLElement | null, HTMLElement | null>",declarations:[],schema:"Ref<HTMLElement | null, HTMLElement | null>"},{name:"scrollMargin",global:!1,description:"Margin inside contianer that allows scrolling. 10 by default.",tags:[],required:!1,type:"number | undefined",declarations:[],schema:{kind:"enum",type:"number | undefined",schema:["undefined","number"]}},{name:"outerScrollMargin",global:!1,description:"Margin around container that still allows scrolling. 0 by defualt.",tags:[],required:!1,type:"number | undefined",declarations:[],schema:{kind:"enum",type:"number | undefined",schema:["undefined","number"]}},{name:"fastPixelMultiplier",global:!1,description:`Controls the scrolling speed.

 Scroll happens faster the nearer to the outer edge the cursor.

This is calculated as a percent (0 near the inner edge, and 1 near the outer edge), which is then multiplied by this multiplier, since moving by less than 1 pixel is quite slow. The default is 4.`,tags:[],required:!1,type:"number | undefined",declarations:[],schema:{kind:"enum",type:"number | undefined",schema:["undefined","number"]}},{name:"fastPixelAmount",global:!1,description:"",tags:[{name:"deprecated",text:"Use fastPixelMultiplier instead."}],required:!1,type:"number | undefined",declarations:[],schema:{kind:"enum",type:"number | undefined",schema:["undefined","number"]}},{name:"useTimer",global:!1,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"timerInterval",global:!1,description:"",tags:[],required:!1,type:"number | undefined",declarations:[],schema:{kind:"enum",type:"number | undefined",schema:["undefined","number"]}}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/ui/ui/src/runtime/composables/useScrollNearContainerEdges.ts"};const J={title:"Composables/ScrollNearContainerEdges"},x={render:h=>({setup:()=>{const d=C(null),{resetScrollIndicator:S,scrollEdges:l,endScroll:p,scrollIndicator:y,isScrolling:E}=q({containerEl:d,scrollMargin:20,outerScrollMargin:20}),t=C({x:0,y:0});F(()=>{t.value.x=d.value.getBoundingClientRect().left,t.value.y=d.value.getBoundingClientRect().top});const u=c=>{t.value.x=c.clientX,t.value.y=c.clientY,l(c.clientX,c.clientY)},m=c=>{p(),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",m)};return{args:h,containerEl:d,resetScrollIndicator:S,scrollEdges:l,endScroll:p,startDrag:c=>{document.addEventListener("mousemove",u),document.addEventListener("mouseup",m)},scrollIndicator:y,isScrolling:E,twMerge:W,pos:t}},template:`
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
        `})};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => ({
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
  })
}`,...x.parameters?.docs?.source}}};const K=["Primary"];export{x as Primary,K as __namedExportsOrder,J as default};
