import{p as e}from"./parseColor.51caf39a.js";import{h as t,p as a,a as s,b as i,c as l,F as n,i as o,f as d,k as m,l as r,d as c}from"./vendor.0e163395.js";const p={props:{data:{type:Object,default:()=>({champion:{cn:{},en:{}},patches:{}})}},setup(){const a=[{name:"全新英雄",tag:"",sid:0,title:"英雄"},{name:"神秘皮肤",tag:"my",sid:1,title:"皮肤等级"},{name:"至臻皮肤",tag:"pt",sid:1},{name:"终极皮肤",tag:"ut",sid:1},{name:"传说皮肤",tag:"lg",sid:1},{name:"史诗皮肤",tag:"",sid:1},{name:"史诗以下皮肤",tag:"tw",sid:1},{name:"重做英雄",tag:"up",sid:0,title:"重做（字体颜色）"},{name:"重做皮肤",tag:"up",sid:1},{name:"重做传说皮肤",tag:"lg|up",sid:1},{name:"限定史诗皮肤",tag:"lm",sid:1,title:"限定（字体颜色）"},{name:"限定非史诗皮肤",tag:"lg|lm",sid:1},{name:"限定非史诗皮肤",tag:"tw|lm",sid:1}];return{examples:t((()=>a.map((t=>{var a;const s=(null!=(a=t.tag)?a:"").split("|");return e({name:t.name,title:t.title,sid:t.sid,isUltimate:Boolean(s.includes("ut")),isPrestige:Boolean(s.includes("pt")),isMythic:Boolean(s.includes("my")),isLegendary:Boolean(s.includes("lg")),isTimeworn:Boolean(s.includes("tw")),isLimit:Boolean(s.includes("lm")),isUpdate:Boolean(s.includes("up")),colors:{}})}))))}},mounted(){},methods:{}},u=d();a("data-v-411ef9bc");const g={class:"overflow-auto"},f={key:0,class:"px-4"};s();const v=u(((e,t,a,s,d,p)=>(i(),l("div",g,[(i(!0),l(n,null,o(s.examples,((e,t)=>(i(),l(n,null,[e.title?(i(),l("div",f,m(e.title),1)):r("",!0),c("div",{class:["Item inline-block relative m-4 px-4 py-0 w-56 h-14 leading-14 text-sm whitespace-pre text-center overflow-ellipsis filter hover:contrast-125 cursor-pointer",{_split:e.isSplit&&0!=t,_lineFirst:0==t}],style:{backgroundColor:e.colors.back,color:e.colors.font}},m(e.name),7)],64)))),256))]))));p.render=v,p.__scopeId="data-v-411ef9bc";export default p;