!function(){var e=document.createElement("style");e.innerHTML=".Header[data-v-8d0cea38]{float:left;height:calc(100% - 7px)}.Table[data-v-8d0cea38]{width:auto}.Header[data-v-8d0cea38]{scrollbar-width:none}.Header[data-v-8d0cea38]::-webkit-scrollbar{width:0}",document.head.appendChild(e),System.register(["./vendor-legacy.7876c88e.js","./parseColor-legacy.0d197a70.js"],(function(e){"use strict";var t,a,n,o,r,s,l,c,i,u,F,d,p,m,h,E,C,B;return{setters:[function(e){t=e.p,a=e.a,n=e.t,o=e.r,r=e.h,s=e.c,l=e.b,c=e.F,i=e.i,u=e.u,F=e.j,d=e.f,p=e.n,m=e.k,h=e.l,E=e.m,C=e.q},function(e){B=e.p}],execute:function(){const f=function(e){const t=(e.match(/^#?([0-9a-f]{8}|[0-9a-f]{6}||[0-9a-f]{3,4})$/i)||[])[1],a=~~(t.length/3);return t.padEnd(4*a,"F").match(RegExp(`[0-9a-f]{${a}}`,"ig")).map((e=>Number(`0x${e}`)))},g=f("#000000"),v=f("#FFFFFF"),D=[.2126,.7152,.0722,0],A=function(e){return e.map((e=>e/255)).map((e=>e<.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))).reduce(((e,t,a)=>e+D[a]*t),0)},y=function(e,t){const[a,n,o,r]=e,[s,l,c,i]=t;if(r>=255)return e;const u=r/255,F=i/255*(1-u);return[a*u+s*F,n*u+l*F,o*u+c*F,255*(u+F)]},b=function(e,t){const[,,,a]=e;let[,,,n]=t;if(a>=255){n<255&&(t=y(t,e));const a=A(e)+.05,o=A(t)+.05;let r=a/o;return o>a&&(r=1/r),r}{const a=y(e,g),n=y(e,v),o=b(a,t),r=b(n,t),s=Math.max(o,r);let l=1;return A(a)>A(t)?l=o:A(n)<A(t)&&(l=r),(l+s)/2}},w={};function $(e){if(!e)return!0;if(w[e])return e;const t=f(e),a=b(t,g),n=b(t,v);return w[e]=a<n}t("data-v-8d0cea38");const k={class:"overflow-hidden whitespace-nowrap w-full"},T=["onMouseenter"],S=["rowspan"],x=["onMouseenter"],M=["colspan","innerHTML"];a();e("default",{props:{data:{type:Object,default:()=>({champion:{cn:{},en:{}},patches:{}})}},setup(e){const t=e,{champion:a,patches:f}=n(t.data),{cn:g,en:v}=n(a.value),D={"#27211C#27211C":"Obsidian","#2756CE#2756CE":"Sapphire","#2DA130#2DA130":"Emerald","#54209B#54209B":"Tanzanite","#5F432B#5F432B":"Meteorite","#6ABBEE#6ABBEE":"Aquamarine","#73BFBE#73BFBE":"Turquoise","#85827F#85827F":"Granite","#9C68D7#9C68D7":"Amethyst","#9F4A25#9F4A25":"Jasper","#B6E084#B6E084":"Peridot","#C1F2FF#C1F2FF":"Rainbow","#D33528#D33528":"Ruby","#DED6B0#DED6B0":"Sandstone","#DF9117#DF9117":"Citrine","#E58BA5#E58BA5":"Rose Quartz","#ECF9F8#ECF9F8":"Pearl","#FFEE59#FFEE59":"Catseye","#FF2C25#FF2C25":"Amber","#FFC948#FFC948":"Golden","#2377FF#2377FF":"Sapphire","#88FF00#00B170":"Jadeclaw","#B2D1E4#3CABFF":"Hunter","#0C0C0F#B2D1E4":"Night","#162D57#A50031":"Chrono","#0C0C0F#9B1520":"Elite","#000000#A50031":"Antimatter","#0C0E15#611B9E":"Peacekeeper","#6FFDFF#2377FF":"Paragon","#C33C3E#0C0E15":"Pariah","#E58BA5#6FFDFF":"Sweet Tooth","#BD1357#19182A":"Freestyle","#95ECFF#C33C3E":"Nomad","#E0FFFF#C50041":"Heavenly Crane","#FF5500#162B30":"Reckoning","#611B9E#19E888":"Neon Noir","#A5FFF8#D87BFF":"K.O.","#D33528#2756CE":"Fan Pass","#DF6C0E#0DCADB":"LEC","#6ABBEE#FFEE59":"LCS","#D33528#ECF9F8":"LPL","#050B19#ECC124":"Cursed","#080808#8E0A38":"Resolute","#050B19#0055FF":"Elite","#9DFFEF#AA55FF":"Disco","#88FF00#9B1520":"Vitality","#0C0C0F#272A3F":"BADDEST","#FF80B1#9DFFEF":"Coronation","#27211C#971458":"Emberwood"},A={},y=o(!1),b=r((()=>Object.entries(f.value).reduce(((e,t)=>{const[a,n]=t;return e[a]=n.length?n.filter((e=>["ns","nh","uc"].includes(e.type))).map((e=>{const[t,a]=e.csid.split(/(?<=^(?:.{3})+)(?!$)/).map((e=>Number(e))),n=g.value[t],o=n.skins[a],r=v.value[t],s=r.skins[a],l=e.tag?e.tag.split("|"):[],c=e.chromasAppend?e.chromasAppend.split("|"):[];c.forEach((t=>(A[e.csid]??(A[e.csid]=[])).push(t)));const i={csid:e.csid,cid:t,sid:a,type:e.type,chromasAppend:c,isUltimate:Boolean(l.includes("ut")),isPrestige:Boolean(l.includes("pt")),isMythic:Boolean(l.includes("my")),isLegendary:Boolean(l.includes("lg")),isTimeworn:Boolean(l.includes("tw")),isLimit:Boolean(l.includes("lm")),isUpdate:Boolean(l.includes("up")),isSplit:Boolean(l.includes("sp")),colors:{},chromas:Object.values(o.chromas||{}).map((t=>{const[a,n]=t.colors??["#000000","#000000"],r=a+n;let l,i;y.value?(l=a,i=n):(l=(t.stage?s.chromas[t.id]?.name.replace(s.nameStage??s.name,"").trim():D[r])??"",i=t.name.replace(o.nameStage??o.name,"").trim()),l||(console||{}).log("炫彩英文名缺失",e.csid,o.name,s.name,a,n),l=`<span style="${$(a)?"":"color: #353637;"}">${l}</span>`,i=`<span style="${$(n)?"":"color: #353637;"}">${i}</span>`;const u=c.length&&!c.includes(r)||!c.length&&(A[e.csid]??[]).includes(r);return{name:`${l}\n${i}`,colorText:`${a}\n${n}`,colors:t.colors??["#000000","#000000"],isDark:u}})).sort(((e,t)=>e.isDark-t.isDark)),name:`${s.nameStage??s.name}\n${o.nameStage??o.name}`};return 0==a&&(i.name=`${r.name}, ${r.title}\n${n.title} ${n.name}`),B(i),i.chromas.length||(i.isPrestige?i.chromas.push({isColspan:!0,name:'<span style="color: #353637;">至臻</span>',colors:["#FFFF66","#FFFF66"]}):i.chromas.push({isColspan:!0,name:'<span style="color: #353637;">无</span>',colors:["snow","snow"]})),i})).filter((e=>e)):[{name:"",colors:{},chromas:[{name:"",colors:["transparent","transparent"]}]}],e}),{}))),w=o(1),H=o(null),L=o(null),P=e=>{w.value=e.target},N=e=>{let t=e.target;for(;t.parentNode;)t=t.parentNode,t!=H.value&&t!=L.value||(w.value=t)},j=e=>{if(w.value!==e.target)return;const t=e.target;(e.target===L.value?H.value:L.value).scrollTop=t.scrollTop/1};return(e,t)=>(d(),s("div",k,[l("div",{ref:H,class:"Header relative overflow-auto",onMouseenter:F(P,["self"]),onTouchstart:N,onScroll:j},[(d(!0),s(c,null,i(u(b),((e,a)=>(d(),s(c,null,[(d(!0),s(c,null,i(e,((n,o)=>(d(),s("div",{class:p(["Item relative bg-gray-600 h-14 px-4 leading-7 text-center whitespace-pre cursor-pointer select-none filter hover:contrast-125",0==o?"_first":""]),style:m({backgroundColor:n.colors.back,color:n.colors.font})},[0==o?(d(),s("div",{key:0,class:"absolute block top-0 left-0 text-sm text-gray-500",rowspan:e.length,onClick:t[0]||(t[0]=e=>y.value=!y.value)},h(a),9,S)):E("",!0),C(" "+h(n.name),1)],6)))),256))],64)))),256))],40,T),l("div",{ref:L,class:"Table relative h-full overflow-auto",onMouseenter:F(P,["self"]),onTouchstart:N,onScroll:j},[l("table",null,[(d(!0),s(c,null,i(u(b),(e=>(d(),s(c,null,[(d(!0),s(c,null,i(e,((e,t)=>(d(),s("tr",null,[(d(!0),s(c,null,i(e.chromas,(e=>(d(),s("td",{colspan:e.isColspan?14:1,class:p(["Item h-14 px-4 py-0 leading-7 text-sm text-center whitespace-pre overflow-ellipsis cursor-pointer filter hover:contrast-125",0==t?"_first":""]),style:m([{background:"rgb(255,255,255)"},{"--tw-contrast":e.isDark?"contrast(0.25)":null,background:`linear-gradient(180deg, ${e.colors[0]} 0%, ${e.colors[0]} 50%, ${e.colors[1]} 50%, ${e.colors[1]} 100%)`}]),innerHTML:e.name},null,14,M)))),256))])))),256))],64)))),256))])],40,x)]))}}).__scopeId="data-v-8d0cea38"}}}))}();
