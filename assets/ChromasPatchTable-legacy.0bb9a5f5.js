!function(){var e=document.createElement("style");e.innerHTML=".Header[data-v-77918e89]{float:left;height:calc(100% - 7px)}.Table[data-v-77918e89]{width:auto}.Header[data-v-77918e89]{scrollbar-width:none}.Header[data-v-77918e89]::-webkit-scrollbar{width:0}",document.head.appendChild(e),System.register(["./vendor-legacy.76dc4352.js","./parseColor-legacy.0d197a70.js"],(function(e){"use strict";var t,a,n,o,r,s,l,c,i,F,u,d,p,h,m,E;return{setters:[function(e){t=e.t,a=e.r,n=e.h,o=e.p,r=e.a,s=e.b,l=e.c,c=e.d,i=e.F,F=e.i,u=e.j,d=e.f,p=e.k,h=e.l,m=e.m},function(e){E=e.p}],execute:function(){const C=function(e){const t=(e.match(/^#?([0-9a-f]{8}|[0-9a-f]{6}||[0-9a-f]{3,4})$/i)||[])[1],a=~~(t.length/3);return t.padEnd(4*a,"F").match(RegExp(`[0-9a-f]{${a}}`,"ig")).map((e=>Number(`0x${e}`)))},f=C("#000000"),B=C("#FFFFFF"),g=[.2126,.7152,.0722,0],v=function(e){return e.map((e=>e/255)).map((e=>e<.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))).reduce(((e,t,a)=>e+g[a]*t),0)},w=function(e,t){const[a,n,o,r]=e,[s,l,c,i]=t;if(r>=255)return e;const F=r/255,u=i/255*(1-F);return[a*F+s*u,n*F+l*u,o*F+c*u,255*(F+u)]},D=function(e,t){const[,,,a]=e;let[,,,n]=t;if(a>=255){n<255&&(t=w(t,e));const a=v(e)+.05,o=v(t)+.05;let r=a/o;return o>a&&(r=1/r),r}{const a=w(e,f),n=w(e,B),o=D(a,t),r=D(n,t),s=Math.max(o,r);let l=1;return v(a)>v(t)?l=o:v(n)<v(t)&&(l=r),(l+s)/2}},b={};function A(e){if(!e)return!0;if(b[e])return e;const t=C(e),a=D(t,f),n=D(t,B);return b[e]=a<n}const y=e("default",{props:{data:{type:Object,default:()=>({champion:{cn:{},en:{}},patches:{}})}},setup(e){const{champion:o,patches:r}=t(e.data),{cn:s,en:l}=t(o.value),c={"#27211C#27211C":"Obsidian","#2756CE#2756CE":"Sapphire","#2DA130#2DA130":"Emerald","#54209B#54209B":"Tanzanite","#5F432B#5F432B":"Meteorite","#6ABBEE#6ABBEE":"Aquamarine","#73BFBE#73BFBE":"Turquoise","#85827F#85827F":"Granite","#9C68D7#9C68D7":"Amethyst","#9F4A25#9F4A25":"Jasper","#B6E084#B6E084":"Peridot","#C1F2FF#C1F2FF":"Rainbow","#D33528#D33528":"Ruby","#DED6B0#DED6B0":"Sandstone","#DF9117#DF9117":"Citrine","#E58BA5#E58BA5":"Rose Quartz","#ECF9F8#ECF9F8":"Pearl","#FFEE59#FFEE59":"Catseye","#FF2C25#FF2C25":"Amber","#FFC948#FFC948":"Golden","#2377FF#2377FF":"Sapphire","#88FF00#00B170":"Jadeclaw","#B2D1E4#3CABFF":"Hunter","#0C0C0F#B2D1E4":"Night","#162D57#A50031":"Chrono","#0C0C0F#9B1520":"Elite","#000000#A50031":"Antimatter","#0C0E15#611B9E":"Peacekeeper","#6FFDFF#2377FF":"Paragon","#C33C3E#0C0E15":"Pariah","#E58BA5#6FFDFF":"Sweet Tooth","#BD1357#19182A":"Freestyle","#95ECFF#C33C3E":"Nomad","#E0FFFF#C50041":"Heavenly Crane","#FF5500#162B30":"Reckoning","#611B9E#19E888":"Neon Noir","#A5FFF8#D87BFF":"K.O.","#D33528#2756CE":"Fan Pass","#DF6C0E#0DCADB":"LEC","#6ABBEE#FFEE59":"LCS","#D33528#ECF9F8":"LPL","#050B19#ECC124":"Cursed","#080808#8E0A38":"Resolute","#050B19#0055FF":"Elite","#9DFFEF#AA55FF":"Disco","#88FF00#9B1520":"Vitality","#0C0C0F#272A3F":"BADDEST","#FF80B1#9DFFEF":"Coronation","#27211C#971458":"Emberwood"},i={},F=a(!1),u=n((()=>Object.entries(r.value).reduce(((e,t)=>{const[a,n]=t;return e[a]=n.length?n.filter((e=>["ns","nh","uc"].includes(e.type))).map((e=>{const[t,a]=e.csid.split(/(?<=^(?:.{3})+)(?!$)/).map((e=>Number(e))),n=s.value[t],o=n.skins[a],r=l.value[t],u=r.skins[a],d=e.tag?e.tag.split("|"):[],p=e.chromasAppend?e.chromasAppend.split("|"):[];p.forEach((t=>(i[e.csid]??(i[e.csid]=[])).push(t)));const h={csid:e.csid,cid:t,sid:a,type:e.type,chromasAppend:p,isUltimate:Boolean(d.includes("ut")),isPrestige:Boolean(d.includes("pt")),isMythic:Boolean(d.includes("my")),isLegendary:Boolean(d.includes("lg")),isTimeworn:Boolean(d.includes("tw")),isLimit:Boolean(d.includes("lm")),isUpdate:Boolean(d.includes("up")),isSplit:Boolean(d.includes("sp")),colors:{},chromas:Object.values(o.chromas||{}).map((t=>{const[a,n]=t.colors??["#000000","#000000"],r=a+n;let s,l;F.value?(s=a,l=n):(s=(t.stage?u.chromas[t.id]?.name.replace(u.nameStage??u.name,"").trim():c[r])??"",l=t.name.replace(o.nameStage??o.name,"").trim()),s||(console||{}).log("炫彩英文名缺失",e.csid,o.name,u.name,a,n),s=`<span style="${A(a)?"":"color: #353637;"}">${s}</span>`,l=`<span style="${A(n)?"":"color: #353637;"}">${l}</span>`;const d=p.length&&!p.includes(r)||!p.length&&(i[e.csid]??[]).includes(r);return{name:`${s}\n${l}`,colorText:`${a}\n${n}`,colors:t.colors??["#000000","#000000"],isDark:d}})).sort(((e,t)=>e.isDark-t.isDark)),name:`${u.nameStage??u.name}\n${o.nameStage??o.name}`};return 0==a&&(h.name=`${r.name}, ${r.title}\n${n.title} ${n.name}`),E(h),h.chromas.length||(h.isPrestige?h.chromas.push({isColspan:!0,name:'<span style="color: #353637;">至臻</span>',colors:["#FFFF66","#FFFF66"]}):h.chromas.push({isColspan:!0,name:'<span style="color: #353637;">无</span>',colors:["snow","snow"]})),h})).filter((e=>e)):[{name:"",colors:{},chromas:[{name:"",colors:["transparent","transparent"]}]}],e}),{})));return{showHex:F,patchesParsed:u,scrollNow:1,widthTable:"100% - 100px"}},methods:{atOver(e){this.scrollNow=e.target},atTouch(e){const t=this.$refs.Header,a=this.$refs.Table;let n=e.target;for(;n.parentNode;)n=n.parentNode,n!=t&&n!=a||(this.scrollNow=n)},atScroll(e){if(this.scrollNow!==e.target)return;const t=this.$refs.Header,a=this.$refs.Table,n=e.target;(e.target===a?t:a).scrollTop=n.scrollTop/1}}}),$=d();o("data-v-77918e89");const T={class:"overflow-hidden whitespace-nowrap w-full"};r();const S=$(((e,t,a,n,o,r)=>(s(),l("div",T,[c("div",{ref:"Header",class:"Header relative overflow-auto",onMouseenter:t[2]||(t[2]=u(((...e)=>r.atOver&&r.atOver(...e)),["self"])),onTouchstart:t[3]||(t[3]=(...e)=>r.atTouch&&r.atTouch(...e)),onScroll:t[4]||(t[4]=(...e)=>r.atScroll&&r.atScroll(...e))},[(s(!0),l(i,null,F(n.patchesParsed,((e,a)=>(s(),l(i,null,[(s(!0),l(i,null,F(e,((o,r)=>(s(),l("div",{class:["Item relative bg-gray-600 h-14 px-4 leading-7 text-center whitespace-pre cursor-pointer select-none filter hover:contrast-125",0==r?"_first":""],style:{backgroundColor:o.colors.back,color:o.colors.font}},[0==r?(s(),l("div",{key:0,class:"absolute block top-0 left-0 text-sm text-gray-500",rowspan:e.length,onClick:t[1]||(t[1]=e=>n.showHex=!n.showHex)},p(a),9,["rowspan"])):h("",!0),m(" "+p(o.name),1)],6)))),256))],64)))),256))],544),c("div",{ref:"Table",class:"Table relative h-full overflow-auto",onMouseenter:t[5]||(t[5]=u(((...e)=>r.atOver&&r.atOver(...e)),["self"])),onTouchstart:t[6]||(t[6]=(...e)=>r.atTouch&&r.atTouch(...e)),onScroll:t[7]||(t[7]=(...e)=>r.atScroll&&r.atScroll(...e))},[c("table",null,[(s(!0),l(i,null,F(n.patchesParsed,(e=>(s(),l(i,null,[(s(!0),l(i,null,F(e,((e,t)=>(s(),l("tr",null,[(s(!0),l(i,null,F(e.chromas,(e=>(s(),l("td",{colspan:e.isColspan?14:1,class:["Item h-14 px-4 py-0 leading-7 text-sm text-center whitespace-pre overflow-ellipsis cursor-pointer filter hover:contrast-125",0==t?"_first":""],style:[{background:"rgb(255,255,255)"},{"--tw-contrast":e.isDark?"contrast(0.25)":null,background:`linear-gradient(180deg, ${e.colors[0]} 0%, ${e.colors[0]} 50%, ${e.colors[1]} 50%, ${e.colors[1]} 100%)`}],innerHTML:e.name},null,14,["colspan","innerHTML"])))),256))])))),256))],64)))),256))])],544)]))));y.render=S,y.__scopeId="data-v-77918e89"}}}))}();