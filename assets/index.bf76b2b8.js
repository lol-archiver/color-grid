var e=(e,a,t)=>new Promise(((n,o)=>{var r=e=>{try{c(t.next(e))}catch(a){o(a)}},s=e=>{try{c(t.throw(e))}catch(a){o(a)}},c=e=>e.done?n(e.value):Promise.resolve(e.value).then(r,s);c((t=t.apply(e,a)).next())}));import("data:text/javascript;base64,Cg==");import{E as a,p as t,a as n,r as o,o as r,w as s,c,b as l,n as i,d as u,e as d,F as p,f as m,g as h}from"./vendor.9cafa8d9.js";let v;const f={},b=function(e,a){if(!a||0===a.length)return e();if(void 0===v){const e=document.createElement("link").relList;v=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(a.map((e=>{if((e=`./${e}`)in f)return;f[e]=!0;const a=e.endsWith(".css"),t=a?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${t}`))return;const n=document.createElement("link");return n.rel=a?"stylesheet":v,a||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),a?new Promise(((e,a)=>{n.addEventListener("load",e),n.addEventListener("error",a)})):void 0}))).then((()=>e()))},_={prefixDefault:".",parseURLAction:(e,a=_.prefixDefault)=>`${a}${a.endsWith("/")?"":"/"}${e}`,fetch(e,t={}){const n=_.parseURLAction(e,t.prefix);return a.get(n,t)}};t("data-v-8df8d7d0");const x={class:"mb-1"};n();const w={setup(a){const t=o({champion:{cn:{},en:{}},patches:{}}),n=o(null),h=o("");return r((()=>e(this,null,(function*(){t.value.champion.cn=(yield _.fetch("data/champion/zh_cn.json")).data,t.value.champion.en=(yield _.fetch("data/champion/en_us.json")).data;const e=(yield _.fetch("data/patch.json")).data;for(const a in e){const t=e[a];t.forEach(((e,a)=>{let[n,o,r,s]=e.split(".");t[a]={csid:n,type:o,tag:r,chromasAppend:s}}))}t.value.patches=e,h.value="PatchTable"})))),s(h,(a=>e(this,null,(function*(){yield app.loadComp(a),n.value=a})))),(e,a)=>(m(),c(p,null,[l("div",x,[l("div",{class:i(["TabButton inline-block box-border h-8 w-32 mx-4 text-center leading-8 cursor-pointer",{_now:"PatchTable"==n.value}]),onClick:a[0]||(a[0]=e=>h.value="PatchTable")},"主美更新表",2),l("div",{class:i(["TabButton inline-block box-border h-8 w-32 mx-4 text-center leading-8 cursor-pointer",{_now:"ChromasPatchTable"==n.value}]),onClick:a[1]||(a[1]=e=>h.value="ChromasPatchTable")},"炫彩更新表",2),l("div",{class:i(["TabButton inline-block box-border h-8 w-32 mx-4 text-center leading-8 cursor-pointer",{_now:"Example"==n.value}]),onClick:a[2]||(a[2]=e=>h.value="Example")},"图块示例",2),l("div",{class:i(["TabButton inline-block box-border h-8 w-32 mx-4 text-center leading-8 cursor-pointer",{_now:"Find"==n.value}]),onClick:a[3]||(a[3]=e=>h.value="Find")},"速查",2)]),(m(),u(d(n.value),{class:"CompNow",data:t.value},null,8,["data"]))],64))},__scopeId:"data-v-8df8d7d0"};window.app=h(w),app.mount("#app"),app.loadComp=a=>e(this,null,(function*(){if(!app.component(a)){const e=yield function(e){switch(e){case"./comps/ChromasPatchTable.vue":return b((()=>import("./ChromasPatchTable.6b927457.js")),["assets/ChromasPatchTable.6b927457.js","assets/ChromasPatchTable.d6e0017f.css","assets/vendor.9cafa8d9.js","assets/parseColor.51caf39a.js"]);case"./comps/Example.vue":return b((()=>import("./Example.7f6cd9a8.js")),["assets/Example.7f6cd9a8.js","assets/Example.55de3fb4.css","assets/parseColor.51caf39a.js","assets/vendor.9cafa8d9.js"]);case"./comps/Find.vue":return b((()=>import("./Find.8c65f1b9.js")),["assets/Find.8c65f1b9.js","assets/Find.69e9c05a.css","assets/vendor.9cafa8d9.js"]);case"./comps/PatchTable.vue":return b((()=>import("./PatchTable.0e58d4e1.js")),["assets/PatchTable.0e58d4e1.js","assets/PatchTable.8b99e667.css","assets/vendor.9cafa8d9.js","assets/parseColor.51caf39a.js"]);default:return new Promise((function(a,t){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`./comps/${a.replace(/-/g,"/")}.vue`);app.component(a,e.default)}}));
