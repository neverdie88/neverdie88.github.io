(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Mm=i=>String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Mc=i=>Number.isSafeInteger(i)&&i>=0?i:0,Sm=i=>Number.isSafeInteger(i)?i:0,_d=i=>String(Sm(i)).replace("-","−");function bm(i){if(!Number.isSafeInteger(i)||i<=0)return"Shift complete";const e=i/6e4;return Number.isInteger(e)?`${e}-minute shift`:`${Math.round(i/1e3)}-second shift`}function Tm(){return'<dialog id="shift-summary" class="shift-summary-dialog" aria-labelledby="shift-summary-title" aria-describedby="shift-summary-description"><div id="shift-summary-content" class="shift-summary-content"></div></dialog>'}function Em({scorecard:i={},completed:e,durationMs:t,bestScore:n=0,newBest:s=!1,learning:r={},levelName:a=""}={}){var _;const o=Array.isArray(i==null?void 0:i.results)?i.results:[],l=Number.isSafeInteger(e)&&e>=0?e:o.length,c=o.filter(v=>(v==null?void 0:v.tier)==="fast").length,d=o.filter(v=>(v==null?void 0:v.tier)==="late").length,u=((_=r==null?void 0:r.current)==null?void 0:_.counts)??(r==null?void 0:r.counts)??{},h=_d(i==null?void 0:i.points),f=`${bm(t)}${a?` · ${String(a)}`:""}`;return`<header class="shift-summary-header"><span class="shift-summary-eyebrow">SUNNY BITES · SHIFT COMPLETE</span><h2 id="shift-summary-title">Time’s up!</h2><p id="shift-summary-description">${Mm(f)}</p></header>
    <section class="shift-summary-score" aria-label="Your shift score"><span>Your score</span><strong id="shift-summary-points" data-long-score="${h.length>5}">${h}</strong><small>points</small><p class="shift-summary-best">Personal best <b data-summary-best>${_d(n)}</b>${s?'<span class="shift-summary-record">★ New best!</span>':""}</p></section>
    <dl class="shift-summary-service"><div><dt>Customers served</dt><dd data-summary-served>${l}</dd></div><div><dt>Speedy checkouts</dt><dd data-summary-fast>${c}</dd></div><div><dt>Late checkouts</dt><dd data-summary-late>${d}</dd></div></dl>
    <section class="shift-summary-practice" aria-label="Wrong answers this shift"><h3>Wrong answers <strong data-summary-wrong>${Mc(u.all)}</strong></h3><p><span>Bill totals <b data-summary-wrong-total>${Mc(u.total)}</b></span><span>Change <b data-summary-wrong-change>${Mc(u.change)}</b></span></p></section>
    <footer class="shift-summary-actions"><button type="button" class="shift-summary-play" data-summary-action="restart" data-action="restart" autofocus>Play again <span aria-hidden="true">↻</span></button><div class="shift-summary-secondary"><button type="button" data-summary-action="review" data-action="review-mistakes">Review wrong answers</button><button type="button" data-summary-action="settings" data-action="levels">Change level or time</button></div></footer>`}function wm(i){const e=document.getElementById("shift-summary-content");e&&(e.innerHTML=Em(i))}const gf=Object.freeze([{id:"burger",name:"Classic burger",emoji:"🍔",color:"#deaa64",category:"burgers"},{id:"icecream",name:"Ice cream",emoji:"🍦",color:"#f2b5c9",category:"treats"},{id:"smoothie",name:"Smoothie",emoji:"🥤",color:"#db87a4",category:"treats"},{id:"fries",name:"Fries",emoji:"🍟",color:"#eac151",category:"sides"},{id:"pizza",name:"Pizza",emoji:"🍕",color:"#eebd70",category:"sides"},{id:"donut",name:"Donut",emoji:"🍩",color:"#c98a64",category:"bakery"},{id:"doubleburger",name:"Double cheeseburger",emoji:"🍔",color:"#c88b43",category:"burgers"},{id:"chickenburger",name:"Chicken burger",emoji:"🍔",color:"#e8ba70",category:"burgers"},{id:"veggieburger",name:"Veggie burger",emoji:"🍔",color:"#86ae63",category:"burgers"},{id:"espresso",name:"Espresso",emoji:"☕",color:"#805643",category:"coffee"},{id:"latte",name:"Latte",emoji:"☕",color:"#c39b74",category:"coffee"},{id:"cappuccino",name:"Cappuccino",emoji:"☕",color:"#dac2a0",category:"coffee"},{id:"croissant",name:"Croissant",emoji:"🥐",color:"#dba252",category:"bakery"},{id:"muffin",name:"Blueberry muffin",emoji:"🧁",color:"#a38bac",category:"bakery"},{id:"cinnamonroll",name:"Cinnamon roll",emoji:"🥮",color:"#cc9167",category:"bakery"},{id:"spaghetti",name:"Spaghetti",emoji:"🍝",color:"#e1b953",category:"pasta"},{id:"penne",name:"Penne pasta",emoji:"🍝",color:"#e1a35c",category:"pasta"}].map(Object.freeze)),Am=Object.freeze([["burgers"],["coffee"],["bakery"],["pasta"],["treats","sides"]].map(Object.freeze)),nc=Object.freeze([{id:"starter",name:"Starter",description:"Add prices, multiply matching pairs, and count whole dollars with a full drawer.",itemsLabel:"2 items · pairs · full drawer"},{id:"shopkeeper",name:"Shopkeeper",description:"Multiply pairs and triples and give dollar change. Each customer has a new drawer with two or three money types missing.",itemsLabel:"3 items · pairs & triples · 2–3 missing"},{id:"expert",name:"Money master",description:"Multiply quantities of four to eight matching food items and practise dollars and cents, sometimes with one or two extras. Each customer has a new drawer with four or five money types missing.",itemsLabel:"4–8 matching items · cents · 4–5 missing"},{id:"cash-challenge",name:"Cash challenge",description:"Multiply quantities of six to twelve matching food items, sometimes with one or two extras, and practise dollars and cents with limited notes and coins. Find another combination when a stack runs out.",itemsLabel:"6–12 matching items · cents · limited pieces"}].map(Object.freeze)),Nt=Object.freeze([{cents:1e4,label:"$100",kind:"note",color:"#98cba7"},{cents:5e3,label:"$50",kind:"note",color:"#efce70"},{cents:2e3,label:"$20",kind:"note",color:"#eca878"},{cents:1e3,label:"$10",kind:"note",color:"#9bc5e6"},{cents:500,label:"$5",kind:"note",color:"#d5b0d6"},{cents:200,label:"$2",kind:"coin",color:"#e9c865"},{cents:100,label:"$1",kind:"coin",color:"#e9c865"},{cents:50,label:"50c",kind:"coin",color:"#cbd2d7"},{cents:20,label:"20c",kind:"coin",color:"#cbd2d7"},{cents:10,label:"10c",kind:"coin",color:"#cbd2d7"},{cents:5,label:"5c",kind:"coin",color:"#cbd2d7"}].map(Object.freeze)),_f=5,Rm=1e3,Go=30,Cm=Object.freeze([{name:"Benny Bear",emoji:"🐻",kind:"bear",greeting:"Hello! My food smells delicious. Can you check my order?"},{name:"Poppy Bunny",emoji:"🐰",kind:"bunny",greeting:"I am ready for a tasty lunch. Thank you!"},{name:"Felix Fox",emoji:"🦊",kind:"fox",greeting:"Hello, cashier! Could you add up my food order?"},{name:"Pip Penguin",emoji:"🐧",kind:"penguin",greeting:"What a lovely place for a snack. Here is my order!"},{name:"Coco Cat",emoji:"🐱",kind:"cat",greeting:"My friends and I are sharing a meal. Can you help me pay?"}].map(Object.freeze)),gl=Object.freeze([{id:"restaurant",name:"Sunny Bites",description:"Serve food to friendly animal customers.",catalog:gf,customers:Cm}].map(Object.freeze)),Im=Object.freeze([]);function Pm(i){const e=[];function t(n,s){if(s.length===i){const r=new Set(s);e.push({missing:s,available:Nt.map(({cents:a})=>a).filter(a=>!r.has(a))});return}for(let r=n;r<=Nt.length-(i-s.length);r+=1)t(r+1,[...s,Nt[r].cents])}return t(0,[]),e}const Lm=new Map([2,3,4,5].map(i=>[i,Pm(i)]));function vf(i){return nc.some(({id:e})=>e===i)?i:"starter"}function mu(i){return gl.find(({id:e})=>e===i)??gl[0]}function _a(i){const e=(i==null?void 0:i.order)??i;if(e!=null&&e.drawerStock&&typeof e.drawerStock=="object")return Object.freeze(Nt.filter(({cents:n})=>ms(e,n)>0));if(!Array.isArray(e==null?void 0:e.drawerDenominations))return Nt;const t=new Set(e.drawerDenominations);return Object.freeze(Nt.filter(({cents:n})=>t.has(n)))}function ic(i){const e=(i==null?void 0:i.order)??i;if(e!=null&&e.drawerStock&&typeof e.drawerStock=="object")return Object.freeze(Nt.filter(({cents:n})=>ms(e,n)===0));if(!Array.isArray(e==null?void 0:e.drawerDenominations))return Im;const t=new Set(e.drawerDenominations);return Object.freeze(Nt.filter(({cents:n})=>!t.has(n)))}function ms(i,e){if(!Nt.some(n=>n.cents===e))return 0;const t=(i==null?void 0:i.order)??i;if(t!=null&&t.drawerStock&&typeof t.drawerStock=="object"){const n=t.drawerStock[e];return Number.isSafeInteger(n)&&n>=0?n:0}return Array.isArray(t==null?void 0:t.drawerDenominations)&&!t.drawerDenominations.includes(e)?0:null}function _r(i,e){const t=ms(i,e);if(t===null)return null;const n=Array.isArray(i==null?void 0:i.selectedMoney)?i.selectedMoney.reduce((s,r)=>s+ +(r===e),0):0;return Math.max(0,t-n)}function yf(i,e){return _a(i).some(t=>t.cents===e)}function Kn(i,e,t){const n=Number(t()),s=Number.isFinite(n)?Math.min(1-Number.EPSILON,Math.max(0,n)):0;return i+Math.floor(s*(e-i+1))}function Dm(i,e){if(i===0)return!0;const t=i/5,n=e.filter(r=>r<=i).map(r=>r/5),s=new Uint8Array(t+1).fill(Go+1);s[0]=0;for(let r=1;r<=t;r+=1)for(const a of n)a<=r&&(s[r]=Math.min(s[r],s[r-a]+1));return s[t]<=Go}function Nm(i,e){const t=i/5,n=new Uint8Array(t+1).fill(Go+1);n[0]=0;for(const{cents:s}of Nt){const r=s/5;if(!(r>t))for(let a=0;a<e[s];a+=1)for(let o=t;o>=r;o-=1)n[o]=Math.min(n[o],n[o-r]+1)}return n[t]<=Go}function Um(i,e,t){const n=Object.fromEntries(Nt.map(({cents:l,kind:c})=>[l,Kn(1,c==="note"?2:5,t)]));let s=i;const r=Object.fromEntries(Nt.map(({cents:l})=>{const c=Math.floor(s/l);return s-=c*l,[l,c]})),a=Nt.filter(({cents:l})=>r[l]>1&&Nt.some(c=>c.cents===l/2)),o=a.length?a[(Kn(0,a.length-1,t)+e)%a.length].cents:null;if(o!==null&&(n[o]=1),Nm(i,n))return Object.freeze(n);o!==null&&(r[o/2]+=(r[o]-1)*2,r[o]=1);for(const{cents:l}of Nt)n[l]=Math.max(n[l],r[l]);return Object.freeze(n)}function Om(i,e,t,n){if(i==="starter")return Object.freeze(Nt.map(({cents:u})=>u));const s=i==="expert"?Kn(4,5,n):Kn(2,3,n),r=Lm.get(s),a=e>0?Math.min(e,500):500,o=u=>u.missing.some(h=>h<=a),l=r.filter(o),c=new Set,d=u=>c.has(u)?!1:(c.add(u),Dm(e,u.available));for(let u=0;u<16&&l.length;u+=1){const h=l[(Kn(0,l.length-1,n)+t)%l.length];if(d(h))return Object.freeze([...h.available])}for(const u of[l,r])for(const h of u)if(d(h))return Object.freeze([...h.available]);throw new Error("No solvable drawer for this order.")}function In(i,e){return{type:i,text:e}}function Fm(i){return i.selectedMoney.reduce((e,t)=>e+t,0)}function xf(i){return i.order.items.every(({lineId:e})=>i.scanned.includes(e))}function km(i,e,t,n){if(i==="expert"||i==="cash-challenge"){const r=i==="expert"?Kn(4,8,n):Kn(6,12,n),a=e%3;return a===0?[r]:[r,a]}const s=e%_f;return i==="starter"?s%2===0?[2]:[1,1]:s===1?Array(t).fill(1):s===2||s===4?t===4?[3,1]:[3]:s===3&&t===4?[2,2]:t===4?[2,1,1]:[2,1]}function Dt(i){if(!Number.isSafeInteger(i))throw new TypeError("Money must be safe integer cents.");const e=Math.abs(i);return`${i<0?"-":""}$${Math.floor(e/100)}.${String(e%100).padStart(2,"0")}`}function gu(i){if(typeof i!="string")return null;const e=/^\$?(\d+)(?:\.(\d{1,2}))?$/.exec(i.trim());if(!e)return null;const n=Number(e[1])*100+Number((e[2]||"").padEnd(2,"0"));return Number.isSafeInteger(n)?n:null}function Mf(i,e=0,t=Math.random,n="restaurant"){const s=vf(i),r=mu(n),a=Number.isSafeInteger(e)&&e>=0?e:0,o=s==="starter"&&a===0,l=km(s,a,s==="starter"?2:3,t),c=l.reduce((x,A)=>x+A,0),d=Math.min(800,Math.floor(4800/(c*5))*5),u=[...r.catalog],h=`${r.id}-${s}-${a}`,f=[];for(const x of l){const A=Am[a%_f],C=u.filter(({category:D})=>f.length===0?A.includes(D):D!==f[0].category),P=C[Kn(0,C.length-1,t)],O=u.indexOf(P),b=u.splice(O,1)[0],M=o?200:s==="starter"?Kn(1,5,t)*100:s==="shopkeeper"?Kn(1,8,t)*100:Kn(20,d/5,t)*5;for(let D=0;D<x;D+=1)f.push({lineId:`${h}-${f.length}`,productId:b.id,name:b.name,emoji:b.emoji,color:b.color,...b.category?{category:b.category}:{},priceCents:M})}const _=f.reduce((x,A)=>x+A.priceCents,0),v=(s==="starter"?[500,1e3,2e3]:[500,1e3,2e3,5e3]).filter(x=>x>=_),m=Kn(0,Math.min(1,v.length-1),t),p=o?1e3:v[m],S=p-_,E=s==="cash-challenge"?Um(S,a,t):null;return{id:h,sceneId:r.id,customer:{...r.customers[a%r.customers.length]},items:f,totalCents:_,paidCents:p,changeCents:S,drawerDenominations:E?Object.freeze(Nt.map(({cents:x})=>x)):Om(s,S,a,t),...E?{drawerStock:E}:{}}}function sc(i="starter",e=Math.random,t="restaurant"){const n=vf(i),s=mu(t);return{levelId:n,sceneId:s.id,round:0,phase:"unload",order:Mf(n,0,e,s.id),scanned:[],answer:"",selectedMoney:[],paymentAccepted:!1,drawerOpened:!1,feedback:null,completed:0,attempts:{total:0,change:0}}}function _u(i){return i.phase!=="unload"?i:{...i,phase:"scan",feedback:In("info",`${i.order.customer.name}'s food is ready at the counter. Check each item to build the bill.`)}}function Bm(i,e){if(i.phase!=="scan"||i.scanned.includes(e))return i;const t=i.order.items.find(r=>r.lineId===e);if(!t)return i;const n=[...i.scanned,e],s=n.length===i.order.items.length;return{...i,scanned:n,phase:s?"total":"scan",feedback:s?In("success","Everything is scanned! Multiply matching food items by their unit price, then add the groups."):In("info",`${t.name} scanned for ${Dt(t.priceCents)}. Scan the next food item!`)}}function Sf(i,e){if(i.phase!=="total"||!xf(i))return i;const t=typeof e=="string"?e:"",n=gu(t),s={...i.attempts,total:i.attempts.total+1};if(n===null)return{...i,answer:t,attempts:s,feedback:In("try","Type a money amount using digits, with up to two digits after a decimal point. You can try again!")};if(n!==i.order.totalCents){const r=n>i.order.totalCents?"too-high":"too-low";return{...i,answer:t,attempts:s,feedback:{...In("try",`That total is ${r==="too-high"?"too high":"too low"}. Check each quantity × price, then add the groups and try again.`),totalDirection:r}}}return{...i,answer:t,attempts:s,phase:"payment",feedback:In("success",`That is right! The total is ${Dt(n)}. ${i.order.customer.name} offers ${Dt(i.order.paidCents)}. Take the payment before choosing the change.`)}}function zm(i){return i.phase!=="payment"||i.paymentAccepted||!xf(i)||gu(i.answer)!==i.order.totalCents?i:{...i,phase:"drawer",paymentAccepted:!0,drawerOpened:!1,feedback:In("success",`You have taken ${Dt(i.order.paidCents)}. Open the cash drawer, then count out the change for ${i.order.customer.name}.`)}}function Hm(i){return i.phase!=="drawer"||!i.paymentAccepted||i.drawerOpened?i:{...i,phase:"change",drawerOpened:!0,feedback:In("info",`The cash drawer is open. Choose the notes and coins to give ${i.order.customer.name} the exact change.`)}}function Vm(i,e){if(i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened||!yf(i,e)||_r(i,e)===0)return i;if(i.selectedMoney.length>=Rm)return{...i,feedback:In("info","Your change tray is full. Put some money back, or clear the tray and count again.")};const t=[...i.selectedMoney,e];return{...i,selectedMoney:t,feedback:In("info","Money added. Count your notes and coins. Tap picked money to put one piece back.")}}function Gm(i,e){if(i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened||!Number.isInteger(e)||e<0||e>=i.selectedMoney.length)return i;const t=i.selectedMoney.filter((n,s)=>s!==e);return{...i,selectedMoney:t,feedback:In("info","One piece put back. Count the notes and coins left in your tray.")}}function Wm(i){return i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened?i:{...i,selectedMoney:[],feedback:In("info","Your change tray is empty. Count up from the total to the amount paid.")}}function $m(i){if(i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened||!i.selectedMoney.every(s=>yf(i,s)))return i;const e=new Map;for(const s of i.selectedMoney){const r=(e.get(s)??0)+1;e.set(s,r);const a=ms(i,s);if(a!==null&&r>a)return i}const t=Fm(i),n={...i.attempts,change:i.attempts.change+1};if(t!==i.order.changeCents){const s=t<i.order.changeCents;return{...i,attempts:n,feedback:{...In("try",`That is ${s?"a little short":"a little too much"}. Count up from ${Dt(i.order.totalCents)} to ${Dt(i.order.paidCents)}, then try again.`),changeDirection:s?"too-little":"too-much"}}}return{...i,attempts:n,phase:"success",drawerOpened:!1,completed:i.completed+1,feedback:In("success",`Correct change! Thank you for helping ${i.order.customer.name}. You earned a service stamp!`)}}function bf(i,e=Math.random){if(i.phase!=="success")return i;const t=i.round+1,n=mu(i.sceneId);return{...i,sceneId:n.id,round:t,phase:"unload",order:Mf(i.levelId,t,e,n.id),scanned:[],answer:"",selectedMoney:[],paymentAccepted:!1,drawerOpened:!1,feedback:null,attempts:{total:0,change:0}}}function Xm(i){return i.phase==="finished"?i:{...i,phase:"finished",drawerOpened:!1,feedback:In("info","Time is up! Your shift is complete. See how many customers you served.")}}const vd="sunny-bites-learning-v1",Tf=20,Ef=1,wf=new Set(Nt.map(({cents:i})=>i)),qm=new Set(["active","completed","interrupted"]),Ym=()=>({all:0,total:0,change:0,invalid:0}),Zt=i=>Number.isSafeInteger(i)&&i>=0,hn=(i,e)=>typeof i=="string"?i.slice(0,e):"",gs=i=>i!==null&&typeof i=="object"&&!Array.isArray(i);function Af(i){if(gs(i)||Array.isArray(i)){for(const e of Object.values(i))Af(e);Object.freeze(i)}return i}function Rf(i){if(!Array.isArray(i))return null;const e=[];for(const t of i.slice(0,64)){if(!gs(t)||!hn(t.productId,80)||!hn(t.name,100)||!Zt(t.quantity)||t.quantity<1||!Zt(t.priceCents))return null;e.push({productId:hn(t.productId,80),name:hn(t.name,100),quantity:t.quantity,priceCents:t.priceCents})}return e}function Km(i){if(!Array.isArray(i))return null;const e=[],t=new Set;for(const n of i.slice(0,Nt.length)){if(!gs(n)||!wf.has(n.cents)||!Zt(n.count)||n.count<1||n.count>1e3||t.has(n.cents))return null;t.add(n.cents),e.push({cents:n.cents,count:n.count})}return e}function Cf(i){if(!gs(i)||!hn(i.id,512)||!["total","change"].includes(i.type)||!Zt(i.round)||i.round<1)return null;const e=i.type==="total";if(!(e?["too-high","too-low","invalid"]:["too-much","too-little"]).includes(i.direction)||!(Zt(i.enteredCents)||e&&i.direction==="invalid"&&i.enteredCents===null)||e&&i.direction==="invalid"&&i.enteredCents!==null)return null;const t=Rf(i.items),n=e?[]:Km(i.money);if(!t||!n)return null;const s={id:hn(i.id,512),type:i.type,round:i.round,customerName:hn(i.customerName,100),customerKind:hn(i.customerKind,40),direction:i.direction,enteredText:e?hn(i.enteredText,32):"",enteredCents:i.enteredCents,items:t,money:n};if(!e){if(!Zt(i.billCents)||!Zt(i.cashCents))return null;s.billCents=i.billCents,s.cashCents=i.cashCents}return s}function yd(i){if(!gs(i)||!hn(i.id,128)||!Zt(i.startedAt)||!qm.has(i.status)||(i.status==="active"?i.endedAt!==null:!Zt(i.endedAt)||i.endedAt<i.startedAt))return null;const e=i.counts;if(!gs(e)||!["all","total","change","invalid"].every(r=>Zt(e[r]))||e.all!==e.total+e.change||e.invalid>e.total||!Array.isArray(i.entries))return null;const t=i.entries.slice(-200).map(Cf).filter(Boolean),n=[...new Map(t.map(r=>[r.id,r])).values()];if(n.length>e.all||n.filter(r=>r.type==="total").length>e.total||n.filter(r=>r.type==="change").length>e.change||n.filter(r=>r.direction==="invalid").length>e.invalid)return null;const s={id:hn(i.id,128),startedAt:i.startedAt,endedAt:i.endedAt,status:i.status,levelId:hn(i.levelId,40),sceneId:hn(i.sceneId,40),counts:{all:e.all,total:e.total,change:e.change,invalid:e.invalid},entries:n};return Number.isSafeInteger(i.score)&&(s.score=i.score),Zt(i.completed)&&(s.completed=i.completed),Zt(i.durationMs)&&(s.durationMs=i.durationMs),s}function jm(i){try{const e=typeof i=="string"?JSON.parse(i):null;return!gs(e)||e.version!==Ef||!Array.isArray(e.history)?{current:null,history:[]}:{current:yd(e.current),history:e.history.slice(0,Tf*2).map(yd).filter(Boolean)}}catch{return{current:null,history:[]}}}function xd(i,e){if(!i)return e;if(!e)return i;const t={active:0,interrupted:1,completed:2},n=t[e.status]>t[i.status]||t[e.status]===t[i.status]&&e.counts.all>i.counts.all?e:i,s=[...new Map([...e.entries,...i.entries].map(l=>[l.id,l])).values()],r=Math.max(i.counts.total,e.counts.total,s.filter(l=>l.type==="total").length),a=Math.max(i.counts.change,e.counts.change,s.filter(l=>l.type==="change").length),o=Math.max(i.counts.invalid,e.counts.invalid,s.filter(l=>l.direction==="invalid").length);return{...n,counts:{all:r+a,total:r,change:a,invalid:o},entries:s.slice(-200)}}function Jm(i){if(!Array.isArray(i==null?void 0:i.items))return null;const e=new Map;for(const t of i.items){if(!gs(t)||!hn(t.productId,80)||!hn(t.name,100)||!Zt(t.priceCents))return null;const n=`${t.productId}:${t.priceCents}`,s=e.get(n)||{productId:t.productId,name:t.name,quantity:0,priceCents:t.priceCents};s.quantity+=1,e.set(n,s)}return Rf([...e.values()])}function Zm(i){if(!Array.isArray(i)||i.length>1e3||i.some(t=>!wf.has(t)))return null;const e=new Map;for(const t of i)e.set(t,(e.get(t)||0)+1);return[...e].map(([t,n])=>({cents:t,count:n}))}function Qm({storage:i,now:e=Date.now,idFactory:t}={}){let n=!0,s=0;if(i===void 0)try{i=globalThis.localStorage}catch{n=!1}(typeof(i==null?void 0:i.getItem)!="function"||typeof(i==null?void 0:i.setItem)!="function")&&(n=!1);const r=()=>{try{const v=e();return Zt(v)?v:Date.now()}catch{return Date.now()}},a=()=>{var v,m;s+=1;try{const p=t==null?void 0:t();if(typeof p=="string"&&p.trim())return p.slice(0,128)}catch{}return`shift-${r()}-${((m=(v=globalThis.crypto)==null?void 0:v.randomUUID)==null?void 0:m.call(v))||`${Math.random().toString(36).slice(2)}-${s}`}`},o=()=>{if(!i||typeof i.getItem!="function")return{current:null,history:[]};try{const v=jm(i.getItem(vd));return n=typeof i.setItem=="function",v}catch{return n=!1,{current:null,history:[]}}},l=o();let c=l.current,d=l.history;const u=new Set((c==null?void 0:c.entries.map(v=>v.id))||[]);function h(v){const m=new Map;for(const p of[...v.history,v.current,...d].filter(Boolean))m.set(p.id,xd(m.get(p.id),p));if(c){const{status:p,endedAt:S}=c;c={...xd(c,m.get(c.id)),status:p,endedAt:S},m.delete(c.id);for(const E of c.entries)u.add(E.id)}d=[...m.values()].sort((p,S)=>S.startedAt-p.startedAt||S.id.localeCompare(p.id)).slice(0,Tf-(c?1:0))}h({current:null,history:[]});function f(){if(h(o()),!i||typeof i.setItem!="function"){n=!1;return}try{i.setItem(vd,JSON.stringify({version:Ef,current:c,history:d})),n=!0}catch{n=!1}}const _=()=>Af(JSON.parse(JSON.stringify({current:c,history:d,storageAvailable:n})));return{snapshot:_,startShift({levelId:v="starter",sceneId:m="restaurant"}={}){h(o()),c&&d.unshift(c.status==="active"?{...c,status:"interrupted",endedAt:Math.max(r(),c.startedAt)}:c);const p=new Set(d.map(E=>E.id));let S=a();for(;p.has(S);)S=`${S.slice(0,112)}-${++s}`;return c={id:S,startedAt:r(),endedAt:null,status:"active",levelId:hn(v,40),sceneId:hn(m,40),counts:Ym(),entries:[]},u.clear(),f(),_()},record(v,m,p){var F,H,K,Z,ee,ie,q;if(!c||c.status!=="active"||v===m||!["total","change"].includes(p)||(v==null?void 0:v.phase)!==p||(m==null?void 0:m.phase)!==p||((F=m==null?void 0:m.feedback)==null?void 0:F.type)!=="try")return!1;const S=(H=m.attempts)==null?void 0:H[p];if(!Zt((K=v.attempts)==null?void 0:K[p])||!Zt(S)||S!==v.attempts[p]+1||!Zt(v.round)||!v.order||((Z=m.order)==null?void 0:Z.id)!==v.order.id||m.round!==v.round)return!1;const E=p==="total",x=E&&typeof m.answer=="string"?m.answer:"",A=E?gu(x):(ee=m.selectedMoney)==null?void 0:ee.reduce((pe,ge)=>pe+ge,0),C=E?A===null?"invalid":m.feedback.totalDirection||(Zt(v.order.totalCents)&&A!==v.order.totalCents?A>v.order.totalCents?"too-high":"too-low":null):m.feedback.changeDirection;if(!(E?["too-high","too-low","invalid"]:["too-much","too-little"]).includes(C))return!1;const P=`${c.id}:${hn(v.order.id,256)}:${v.round}:${p}:${S}`;if(u.has(P))return!1;const O=Jm(v.order),b=E?[]:Zm(m.selectedMoney);if(!O||!b||!E&&!Zt(A))return!1;const M=Cf({id:P,type:p,round:v.round+1,customerName:(ie=v.order.customer)==null?void 0:ie.name,customerKind:(q=v.order.customer)==null?void 0:q.kind,direction:C,enteredText:x,enteredCents:A,items:O,money:b,...E?{}:{billCents:v.order.totalCents,cashCents:v.order.paidCents}});if(!M)return!1;u.add(P);const D={...c.counts,all:c.counts.all+1,[p]:c.counts[p]+1};return C==="invalid"&&(D.invalid+=1),c={...c,counts:D,entries:[...c.entries,M].slice(-200)},f(),!0},finishShift({score:v,completed:m,durationMs:p}={}){return!c||c.status!=="active"||(c={...c,status:"completed",endedAt:Math.max(r(),c.startedAt),...Number.isSafeInteger(v)?{score:v}:{},...Zt(m)?{completed:m}:{},...Zt(p)?{durationMs:p}:{}},f()),_()}}}const If={starter:"Starter",shopkeeper:"Shopkeeper",expert:"Money master","cash-challenge":"Cash challenge"},Md={"too-high":"Too high","too-low":"Too low","too-much":"Too much change","too-little":"Too little change",invalid:"Check the amount format"};function Bi(i){return String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Lo(i){return Number.isSafeInteger(i)&&i>=0?i:0}function Ja(i){return Number.isSafeInteger(i)&&i>=0?Dt(i):"—"}function vu(i){return Object.fromEntries(["all","total","change","invalid"].map(e=>{var t;return[e,Lo((t=i==null?void 0:i.counts)==null?void 0:t[e])]}))}function eg(i){const e=vu(i);return`<dl class="learning-counts"><div><dt>Wrong answers</dt><dd data-learning-count="all">${e.all}</dd></div><div><dt>Bill totals</dt><dd data-learning-count="total">${e.total}</dd></div><div><dt>Change</dt><dd data-learning-count="change">${e.change}</dd></div><div><dt>Amount format</dt><dd data-learning-count="invalid">${e.invalid}</dd></div></dl>`}function Pf(i){if(i==null||i==="")return"";const e=new Date(i);return Number.isFinite(e.getTime())?e.toLocaleString(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function tg(i){const e=(i==null?void 0:i.type)==="change",t=e?"change":"total",n=Md[i==null?void 0:i.direction]?i.direction:"",s=Md[n]??"Try again",r=Bi((i==null?void 0:i.customerName)||"Customer"),a=Lo(i==null?void 0:i.round),l=`<ul class="learning-food-list" data-learning-foods>${(Array.isArray(i==null?void 0:i.items)?i.items:[]).map(f=>`<li><span>${Bi((f==null?void 0:f.name)||"Food item")}</span><strong>${Lo(f==null?void 0:f.quantity)} × ${Ja(f==null?void 0:f.priceCents)}</strong></li>`).join("")}</ul>`,c=String((i==null?void 0:i.enteredText)??"").trim()?String(i.enteredText):"(empty)",d=Array.isArray(i==null?void 0:i.money)?i.money:[],u=`<div class="learning-change-prompt" data-learning-change-prompt><span>Cash <strong>${Ja(i==null?void 0:i.cashCents)}</strong></span><span aria-hidden="true">−</span><span>Bill <strong>${Ja(i==null?void 0:i.billCents)}</strong></span><span>= <strong>?</strong> change</span></div><div class="learning-submission" data-learning-submission><span>You selected</span>${d.length?`<ul class="learning-money-list" data-learning-money>${d.map(f=>`<li>${Ja(f==null?void 0:f.cents)} × ${Lo(f==null?void 0:f.count)}</li>`).join("")}</ul>`:"<p data-learning-money>No notes or coins selected.</p>"}</div>`,h=`${l}<div class="learning-submission" data-learning-submission><span>You entered</span><strong class="learning-entered-text">${Bi(c)}</strong></div>${n==="invalid"?'<p class="learning-format-help">Use a number in dollars and cents.</p>':""}`;return`<article class="learning-entry" data-learning-entry data-type="${t}" data-direction="${Bi(n)}"><header><div><h4>${e?"Change":"Bill total"}${a?` · Customer ${a}`:""}</h4><p>${r}</p></div><span class="learning-verdict"><span aria-hidden="true">✕</span>${Bi(s)}</span></header>${e?u:h}</article>`}function ng(i){const e=Array.isArray(i==null?void 0:i.entries)?i.entries:[],t=vu(i).all;return!t&&!e.length?'<p class="learning-empty">No wrong answers here yet. Take your time and keep practising!</p>':`${t>e.length?`<p class="learning-limit-note">Showing the latest ${e.length} of ${t} wrong answers. Every try is still included in the counts.</p>`:""}<div class="learning-entries">${e.slice().reverse().map(tg).join("")}</div>`}function Sd(i,e=!1){const t=Bi(If[i==null?void 0:i.levelId]??"Cashier practice"),n=Bi(Pf(i==null?void 0:i.startedAt));return`<section class="learning-shift" ${e?"data-learning-current":""}><div class="learning-shift-title"><h3>${e?"This shift":"Previous shift"}</h3><p>${t}${n?` · ${n}`:""}</p></div>${eg(i)}${ng(i)}</section>`}function ig(){return'<dialog id="learning-review" class="learning-review-dialog" aria-labelledby="learning-review-title" aria-describedby="learning-review-intro"><header class="learning-review-header"><div><span class="learning-eyebrow">LEARNING NOTEBOOK</span><h2 id="learning-review-title">Wrong answer review</h2></div><button type="button" id="learning-review-close" aria-label="Close wrong answer review" autofocus>×</button></header><p id="learning-review-intro">Look back at your tries. Work out the answers yourself!</p><div id="learning-review-content" class="learning-review-content"></div></dialog>'}function sg(i={}){const e=i==null?void 0:i.current,t=Array.isArray(i==null?void 0:i.history)?i.history:[],n=t.map(s=>{const r=vu(s).all,a=Bi(If[s==null?void 0:s.levelId]??"Cashier practice"),o=Bi(Pf(s==null?void 0:s.startedAt));return`<details class="learning-previous-shift"><summary><span>${a}${o?` · ${o}`:""}</span><strong>${r} wrong ${r===1?"answer":"answers"}</strong></summary>${Sd(s)}</details>`}).join("");return`<p class="learning-storage-note" data-learning-storage>${(i==null?void 0:i.storageAvailable)===!1?"Memory only · This browser could not save your review. It will be lost when you reload.":"Saved in this browser · Your review stays on this device."}</p>${e?Sd(e,!0):'<p class="learning-empty">Start a shift to collect your practice notes.</p>'}<p class="learning-count-note">Amount format tries are included in Bill totals.</p>${t.length?`<section class="learning-history"><h3>Previous shifts</h3><p class="learning-history-note">Up to 20 recent shifts are saved, with the latest 200 wrong answers from each.</p>${n}</section>`:""}`}function rg(i){const e=document.getElementById("learning-review-content");e&&(e.innerHTML=sg(i))}const yu=300*1e3,Lf=Object.freeze([3,5,10].map(i=>Object.freeze({minutes:i,durationMs:i*60*1e3,label:`${i} minutes`}))),bd=i=>Number.isSafeInteger(i)&&i>0?i:yu;function ag({durationMs:i=yu,getState:e=()=>({phase:"unload"}),isPaused:t=()=>!1,onExpire:n=()=>{},onUpdate:s=()=>{},now:r=()=>performance.now()}={}){let a=bd(i),o=0,l=!1,c=!1,d=!1,u=e().phase,h=0,f=null,_="",v=0,m=!!t();const p=()=>{const M=r();return Number.isFinite(M)?Math.max(h,M):h};h=p();function S(){const M=l&&!c&&!d&&u!=="finished",D=M&&!!t(),F=Math.max(0,a-o);return{durationMs:a,elapsedMs:o,remainingMs:F,remainingSeconds:Math.ceil(F/1e3),ratio:F/a,started:l,expired:c,paused:D,running:M&&!D,disposed:d}}function E(M=!1){const D=S(),F=`${D.remainingSeconds}:${D.started}:${D.expired}:${D.paused}:${D.running}`;(M||F!==_)&&(_=F,s(D))}function x(){clearInterval(f),f=null}function A(M=!1){if(d)return;const D=p(),F=!!t();if(l&&!c&&u!=="finished"&&!m&&(!F||M)&&(o=Math.min(a,o+D-h)),h=D,m=F,l&&!c&&o>=a){c=!0,x();const H=v,K=S();E(!0),!d&&H===v&&n(K)}else E()}function C(){return A(),S()}function P(M,D){if(d)return S();const F=v,H=c;return A(),d||v!==F||!H&&c||(u=(D==null?void 0:D.phase)??e().phase,!l&&u==="scan"&&(l=!0,h=p(),m=!!t(),f=setInterval(C,100)),u==="finished"&&x(),E(!0)),S()}function O(){return A(!0),S()}function b(M=a){return d||(v+=1,x(),a=bd(M),o=0,l=!1,c=!1,u="unload",h=p(),m=!!t(),_="",E(!0)),S()}return{info:S,tick:C,sync:P,pauseChanged:O,reset:b,dispose(){d||(d=!0,v+=1,x())}}}const xu=Object.freeze({happy:[[72,0,.34,.034],[76,.17,.35,.036],[79,.34,.44,.036],[84,.58,.72,.029],[60,.58,.8,.015,"sine"]],restless:[[67,0,.36,.029],[72,.26,.39,.03],[69,.55,.44,.027],[67,.86,.62,.023]],impatient:[[74,0,.4,.03],[72,.29,.42,.029],[69,.58,.45,.027],[67,.9,.62,.023]],exhausted:[[67,0,.5,.025,"sine"],[64,.37,.54,.023,"sine"],[60,.78,.8,.02,"sine"]],relieved:[[64,0,.44,.026,"sine"],[67,.28,.47,.028],[72,.6,.82,.025],[60,.6,.82,.012,"sine"]],tired:[[64,0,.5,.022,"sine"],[62,.38,.54,.021,"sine"],[60,.8,.78,.019,"sine"]],"shift-end":[[72,0,.32,.032],[76,.17,.34,.034],[79,.34,.42,.034],[84,.61,.8,.03],[76,.61,.8,.015,"sine"],[60,.61,.92,.012,"sine"]]});Object.freeze(Object.keys(xu));const Df=i=>typeof i=="string"&&Object.hasOwn(xu,i),og=i=>440*2**((i-69)/12);function Nf(i,e){i.oscillator.onended=null;try{i.gain.gain.cancelScheduledValues(e),i.gain.gain.setValueAtTime(0,e),i.oscillator.stop(e)}catch{}i.oscillator.disconnect(),i.gain.disconnect()}function cg(i,e,t,n=i.currentTime,s=()=>{}){if(!Df(t))return[];const r=[];try{for(const[a,o,l,c,d="triangle"]of xu[t]){const u=i.createOscillator(),h=i.createGain(),f={oscillator:u,gain:h};r.push(f);const _=n+o;u.type=d,u.frequency.value=og(a),h.gain.setValueAtTime(0,_),h.gain.linearRampToValueAtTime(c,_+.025),h.gain.exponentialRampToValueAtTime(1e-4,_+l),h.gain.linearRampToValueAtTime(0,_+l+.025),u.connect(h).connect(e),u.onended=()=>{u.disconnect(),h.disconnect(),s(f)},u.start(_),u.stop(_+l+.03)}return r}catch(a){for(const o of r)Nf(o,i.currentTime);throw a}}function lg({isEnabled:i=()=>!0,isPaused:e=()=>!1,onStateChange:t=()=>{}}={}){var D;const n=globalThis.AudioContext||globalThis.webkitAudioContext,s=globalThis.document;let r,a=!1,o=!1,l=0,c=null,d=null,u="idle",h=null,f=0,_=0,v=0;const m=new Set,p=()=>!a&&!!(typeof i=="function"?i():i),S=()=>!!(s!=null&&s.hidden||(typeof e=="function"?e():e)),E=()=>p()?S()?"paused":null:"muted",x=()=>({enabled:p(),paused:S(),disposed:a,unlocked:o,mood:c,pendingMood:d,status:u,playing:u==="playing"&&(r==null?void 0:r.state)==="running"&&m.size>0,activeVoices:m.size,playCount:f,scheduledCount:_,cancelCount:v,contextState:(r==null?void 0:r.state)??"not-started",error:h}),A=()=>t(x());function C(F="cancelled"){l++,(m.size||d||u==="resuming")&&v++,d=null;for(const H of m)Nf(H,r.currentTime);m.clear(),u=F}function P(){return n?((!r||r.state==="closed")&&(r=new n),r):(u="unavailable",A(),null)}async function O(F,H){try{const K=P();if(!K||(u="resuming",A(),await K.resume(),a||H!==l))return;const Z=E();if(Z){C(Z),A();return}if(K.state!=="running")throw new Error("Music cue could not start.");cg(K,K.destination,F,K.currentTime+.015,ie=>{m.delete(ie),!(a||H!==l)&&(m.size||(u="ended",A()))}).forEach(ie=>m.add(ie)),_++,u="playing",A()}catch(K){if(a||H!==l)return;C("error"),h=(K==null?void 0:K.message)||"Music cues are unavailable.",A()}}async function b(F){try{const H=P();if(!H||(await H.resume(),a||F!==l))return;const K=E();if(K){C(K),A();return}if(H.state!=="running")throw new Error("Music cue could not start.");u="idle",A()}catch(H){if(a||F!==l)return;u="error",h=(H==null?void 0:H.message)||"Music cues are unavailable.",A()}}function M(){s!=null&&s.hidden&&(C("paused"),A())}return(D=s==null?void 0:s.addEventListener)==null||D.call(s,"visibilitychange",M),{info:x,play(F){if(a||!Df(F))return x();C("idle"),c=F,h=null;const H=E();return H?(u=H,A(),x()):(f++,o?(O(F,l),x()):(d=F,u="locked",A(),x()))},unlock(){if(a)return x();const F=E();if(F)return C(F),A(),x();if(o=!0,d){const H=d;d=null,O(H,++l)}else!["playing","resuming"].includes(u)&&(r==null?void 0:r.state)!=="running"&&(u="resuming",b(++l));return A(),x()},cancel(){return a||(C(E()||"cancelled"),A()),x()},dispose(){var F;a||(C("disposed"),a=!0,(F=s==null?void 0:s.removeEventListener)==null||F.call(s,"visibilitychange",M),r&&r.state!=="closed"&&r.close().catch(()=>{}),A())}}}const ug=60/108/2,dg=[[76,null,79,81,null,79,76,null],[74,null,76,79,null,76,72,null],[72,74,76,null,79,null,76,74],[71,null,74,76,null,74,71,null],[76,null,79,84,null,81,79,null],[77,null,76,74,null,72,74,null],[72,76,null,79,77,null,76,74],[71,null,74,null,72,null,null,null]],hg=[[60,64,67,71],[57,60,64,67],[53,57,60,64],[55,59,62,65],[60,64,67,71],[53,57,60,64],[62,65,69,72],[55,59,62,65]],fg=[36,33,29,31,36,29,38,31],pg=i=>440*2**((i-69)/12),Td=new WeakMap;function Za(i,e,t,n,s,r,a,o){const l=i.createOscillator(),c=i.createGain();l.type=a,l.frequency.value=pg(t),c.gain.setValueAtTime(0,n),c.gain.linearRampToValueAtTime(r,n+.012),c.gain.exponentialRampToValueAtTime(1e-4,n+s),l.connect(c).connect(e),l.onended=()=>{l.disconnect(),c.disconnect(),o==null||o(l,!1)},o==null||o(l,!0),l.start(n),l.stop(n+s+.02)}function mg(i,e,t,n){let s=Td.get(i);if(!s){s=i.createBuffer(1,Math.ceil(i.sampleRate*.055),i.sampleRate);const l=s.getChannelData(0);let c=87241;for(let d=0;d<l.length;d++)c=Math.imul(c,1664525)+1013904223>>>0,l[d]=(c/4294967296*2-1)*(1-d/l.length);Td.set(i,s)}const r=i.createBufferSource(),a=i.createBiquadFilter(),o=i.createGain();r.buffer=s,a.type="highpass",a.frequency.value=4200,o.gain.value=.016,r.connect(a).connect(o).connect(e),r.onended=()=>{r.disconnect(),a.disconnect(),o.disconnect(),n==null||n(r,!1)},n==null||n(r,!0),r.start(t)}function gg(i,e,t,n,s){const r=Math.floor(t/8)%8,a=t%8,o=dg[r][a];o!==null&&(Za(i,e,o,n,.42,.14,"sine",s),Za(i,e,o+12,n,.13,.02,"sine",s)),(a===0||a===4)&&Za(i,e,fg[r]+(a===4?7:0),n,.45,.07,"triangle",s),(a===2||a===6)&&hg[r].forEach((l,c)=>Za(i,e,l,n+c*.012,.26,.022,"triangle",s)),a%2&&mg(i,e,n,s)}function _g({enabled:i=!0,onStateChange:e=()=>{}}={}){let t,n,s,r,a=!1,o=!1,l=!1,c=0,d=0,u=0,h=0,f=null;const _=new Set,v=(C,P)=>P?_.add(C):_.delete(C),m=()=>({enabled:i,unlocked:a,playing:o&&(t==null?void 0:t.state)==="running",contextState:(t==null?void 0:t.state)??"not-started",scheduledSteps:h,activeVoices:_.size,error:f}),p=()=>e(m());function S(){if(!(!o||!t||document.hidden))for(d<t.currentTime-.1&&(d=t.currentTime+.035);d<t.currentTime+.16;)gg(t,n,u++,d,v),d+=ug,h++}function E(){o=!1;const C=++c;if(clearInterval(s),clearTimeout(r),t&&t.state!=="closed"){n.gain.cancelScheduledValues(t.currentTime),n.gain.setTargetAtTime(0,t.currentTime,.015);for(const P of _)try{P.stop(t.currentTime+.05)}catch{}r=setTimeout(()=>{C===c&&!o&&t.state!=="closed"&&t.suspend().then(p).catch(()=>{})},70)}p()}async function x(){if(l||!i||!a||document.hidden||o)return;clearTimeout(r);const C=++c;try{if(!t){const P=window.AudioContext||window.webkitAudioContext;t=new P,n=t.createGain(),n.gain.value=0,n.connect(t.destination)}if(await t.resume(),l||C!==c||!i||document.hidden)return;f=null,o=!0,n.gain.cancelScheduledValues(t.currentTime),n.gain.setTargetAtTime(.28,t.currentTime,.07),d=t.currentTime+.035,S(),clearInterval(s),s=setInterval(S,90),p()}catch(P){f=P.message,o=!1,p()}}function A(){document.hidden?E():x()}return document.addEventListener("visibilitychange",A),{info:m,unlock(){l||(a=!0,x())},setEnabled(C){i=!!C,i?x():E(),p()},dispose(){l=!0,o=!1,c++,clearInterval(s),clearTimeout(r),document.removeEventListener("visibilitychange",A);for(const C of _)try{C.stop()}catch{}_.clear(),t&&t.state!=="closed"&&t.close().catch(()=>{})}}}const vg="Kokoro-82M",Mu=Object.freeze({bear:Object.freeze({voice:"am_puck",lang:"a",speed:.94,pitch:1}),bunny:Object.freeze({voice:"af_bella",lang:"a",speed:1.02,pitch:1}),fox:Object.freeze({voice:"am_fenrir",lang:"a",speed:1,pitch:1}),penguin:Object.freeze({voice:"af_sarah",lang:"a",speed:.96,pitch:1}),cat:Object.freeze({voice:"af_nicole",lang:"a",speed:.98,pitch:1})}),Ed=Object.freeze({"too-little":"That is too little change. Please add some more.","too-much":"That is too much change. Please take some back."}),wd=Object.freeze({"too-low":"That total is too low. Please try again.","too-high":"That total is too high. Please try again."}),_l=Object.freeze({bear:{restless:"My tummy is starting to rumble…",impatient:"Oh dear, my food is getting cold.",exhausted:"That was a very long wait for a hungry bear.",happy:"Wonderful! A big bear thank-you!",relieved:"Phew! Lunch at last. Thank you!",tired:"Thanks. This bear needs lunch and a rest."},bunny:{restless:"My paws are getting a little fidgety…",impatient:"Could we hop along a bit faster, please?",exhausted:"My ears have drooped. I’ve waited so long.",happy:"Hooray! A happy hop for you!",relieved:"Phew! Ready to hop home. Thank you!",tired:"Thank you. I’m too tired for a happy hop."},fox:{restless:"Hmm… are we nearly ready?",impatient:"My lunch break is slipping away!",exhausted:"I really wish that had been quicker.",happy:"Lovely work, clever cashier!",relieved:"All sorted at last. Thanks!",tired:"Thanks. I’d better hurry along now."},penguin:{restless:"Waddle, waddle… still waiting!",impatient:"My flippers are getting restless.",exhausted:"That was a long time standing on these feet.",happy:"Flippers up! Thank you so much!",relieved:"Phew! Time to waddle home. Thanks!",tired:"Thanks. A slow waddle home for me."},cat:{restless:"Mrr… is my order almost ready?",impatient:"My whiskers are twitching. Please hurry!",exhausted:"I’ve waited so long I need a catnap.",happy:"Purr-fect! Thank you, cashier!",relieved:"At last! A little purr of thanks.",tired:"Thank you. Now I need a catnap."}}),yg=Object.freeze({bear:"A big bear thank-you!",bunny:"Hooray! Kisses and happy hops!",fox:"Lovely work, clever cashier!",penguin:"Flippers up! Thank you!",cat:"Purr-fect! Kisses for you!"}),xg=Object.freeze({unload:"Hello! Here’s my takeaway order.",scan:"Hello! Here’s my takeaway order.",total:"How much do I owe you?",drawer:"My change, please!",change:"My change, please!",finished:"See you on your next shift!"});function vr(i){const e=typeof i=="string"?i.toLowerCase():"bear";return Object.hasOwn(Mu,e)?e:"bear"}function Ad(i="bear",e="happy"){const t=vr(i),n=e==="tired"||e==="exhausted"?.96:e==="impatient"||e==="restless"?1.035:1;return{character:t,...Mu[t],playbackRate:n,rate:n}}function yr(i){return typeof i=="string"&&Object.hasOwn(Ed,i)?Ed[i]:""}function xr(i){return typeof i=="string"&&Object.hasOwn(wd,i)?wd[i]:""}function Mg(i,e){return _l[vr(i)][e]||_l[vr(i)].happy}function Ls({phase:i,kind:e="bear",mood:t="calm",paidCents:n=1e3,emotion:s="happy",delivered:r=!1,changeCents:a=1,changeDirection:o=null,totalDirection:l=null}={}){const c=vr(e);return i==="total"&&xr(l)?xr(l):i==="change"&&yr(o)?yr(o):i==="success"?r?s==="tired"?"Thank you. Time for a rest!":s==="relieved"?"Phew! Thank you so much!":yg[c]:`My ${a===0?"bag and receipt":"bag, receipt, and change"}, please!`:["scan","total","payment","drawer","change"].includes(i)&&["restless","impatient","exhausted"].includes(t)?`${i==="payment"?`Here’s ${Dt(n)}. `:""}${Mg(c,t)}`:i==="payment"?`Here’s ${Dt(n)}. Thank you!`:xg[i]||""}function Sg(i){let e=2166136261;for(let t=0;t<i.length;t+=1)e=Math.imul(e^i.charCodeAt(t),16777619);return(e>>>0).toString(16).padStart(8,"0")}function bg(i,e){return`audio/kokoro/${vr(i)}/${Sg(e)}.mp3`}function Tg(i,e,t="/"){return`${String(t||"/").replace(/\/?$/,"/")}${bg(i,e)}`}function Eg(i="bear"){const e=vr(i),t=new Set(Object.values(_l[e]));for(const n of["unload","scan","total","drawer","change","finished"])t.add(Ls({phase:n,kind:e}));for(const n of["calm","restless","impatient","exhausted"])for(const s of[500,1e3,2e3,5e3])t.add(Ls({phase:"payment",kind:e,mood:n,paidCents:s}));for(const n of["happy","relieved","tired"])t.add(Ls({phase:"success",kind:e,emotion:n,delivered:!0}));for(const n of[0,1])t.add(Ls({phase:"success",kind:e,changeCents:n}));for(const n of["too-little","too-much"])t.add(Ls({phase:"change",kind:e,changeDirection:n}));for(const n of["too-low","too-high"])t.add(Ls({phase:"total",kind:e,totalDirection:n}));return[...t]}const wg=Object.freeze({"too-little":[392,523.25,659.25],"too-much":[659.25,523.25,392]}),Ag=Object.freeze([190,140]),Rg=new Map(Object.keys(Mu).map(i=>[i,new Set(Eg(i))]));function Cg({isEnabled:i=()=>!0,onStateChange:e=()=>{},baseURL:t="./"}={}){const n=globalThis.Audio,s=globalThis.AudioContext||globalThis.webkitAudioContext;let r,a,o,l=[],c=!1,d=0,u=null,h=null,f="",_=0,v=0,m=0,p=0,S=0,E=0,x=0,A="idle",C="idle",P=null,O=null,b=!1,M="bear",D="happy",F="dialogue",H=Ad(M,D),K=null,Z=null;const ee=new Set,ie=()=>!c&&!!(typeof i=="function"?i():i),q=typeof n=="function",pe=()=>({enabled:ie(),disposed:c,direction:u,totalDirection:h,line:f,playCount:_,totalPlayCount:v,dialogueCount:m,audioPlayCount:p,speechRequestCount:S,speechStartCount:E,cancelCount:x,audioActive:ee.size>0&&(r==null?void 0:r.state)==="running",audioStatus:A,audioContextState:(r==null?void 0:r.state)??"not-started",speechStatus:C,speechAvailable:q,voiceName:P,audioError:K,speechError:Z,speechActive:b&&ie(),speechBoundary:0,speechCharIndex:0,boundarySource:"none",character:M,mood:D,kind:F,rate:H.playbackRate,pitch:H.pitch,voiceSpeed:H.speed,engine:vg,clipURL:O}),ge=()=>e(pe());function $e(){clearTimeout(o),o=void 0,b=!1;const j=a;if(j){a=void 0;for(const[_e,ye]of l)j.removeEventListener(_e,ye);l=[];try{j.pause()}catch{}try{j.currentTime=0}catch{}try{j.removeAttribute("src"),j.load()}catch{}}}function rt(){for(const j of ee){j.oscillator.onended=null;try{j.gain.gain.cancelScheduledValues(r.currentTime),j.gain.gain.setValueAtTime(0,r.currentTime),j.oscillator.stop(r.currentTime)}catch{}j.oscillator.disconnect(),j.gain.disconnect()}ee.clear()}function _t(j="cancelled"){d+=1,(a||ee.size||A==="resuming")&&(x+=1),$e(),rt(),A=j,C=j}async function Et(j,_e,ye=!1){if(!s){A="unavailable",ge();return}try{if((!r||r.state==="closed")&&(r=new s),A="resuming",ge(),await r.resume(),j!==d||c)return;if(!ie()){_t("muted"),ge();return}if(r.state!=="running")throw new Error("Audio could not start.");const Oe=r.currentTime+.012;for(const[Qe,xt]of(ye?Ag:wg[_e]).entries()){const U=r.createOscillator(),lt=r.createGain(),Je=Oe+Qe*(ye?.16:.13),je=ye?.105:Qe===2?.28:.2;U.type=ye?"square":"triangle",U.frequency.value=xt,lt.gain.setValueAtTime(0,Je),lt.gain.linearRampToValueAtTime(ye?.11:.16,Je+.018),lt.gain.exponentialRampToValueAtTime(1e-4,Je+je),U.connect(lt).connect(r.destination);const Ee={oscillator:U,gain:lt};ee.add(Ee),U.onended=()=>{ee.delete(Ee),U.disconnect(),lt.disconnect(),j===d&&!ee.size&&(A="ended",ge())},U.start(Je),U.stop(Je+je+.015)}p+=1,A="playing",ge()}catch(Oe){if(j!==d||c)return;rt(),A="error",K=(Oe==null?void 0:Oe.message)||"Audio is unavailable.",ge()}}function ht(j){var _e;if(!q){C="unavailable",Z="Kokoro recordings cannot play on this device.",ge();return}if(!((_e=Rg.get(M))!=null&&_e.has(f))){C="unavailable",Z="This line is not in the Kokoro dialogue catalog.",ge();return}try{const ye=new n(O);let Oe=!1;a=ye,ye.preload="auto",ye.volume=1,ye.playbackRate=H.playbackRate,ye.preservesPitch=!0;const Qe=()=>j!==d||ye!==a||c?!1:ie()?!0:(_t("muted"),ge(),!1),xt=(Ee,et)=>{Qe()&&($e(),C=Ee,Z=et,ge())},U=(Ee,et,ze)=>{clearTimeout(o),o=setTimeout(()=>{j!==d||ye!==a||C!==Ee||xt("unavailable",ze)},et)},lt=(Ee,et)=>{ye.addEventListener(Ee,et),l.push([Ee,et])};lt("playing",()=>{if(!Qe())return;Oe||(E+=1,Oe=!0),b=!0,C="speaking";const Ee=Number.isFinite(ye.duration)?ye.duration*1e3/H.playbackRate+4e3:f.length*90/H.playbackRate+5e3;U("speaking",Math.min(2e4,Math.max(8e3,Math.ceil(Ee))),"Kokoro playback did not finish on this device."),ge()}),lt("pause",()=>{Qe()&&(clearTimeout(o),o=void 0,b=!1,C="paused",ge())});const Je=()=>{Qe()&&(b=!1,C="buffering",U("buffering",8e3,"Kokoro playback stopped loading."),ge())};lt("waiting",Je),lt("stalled",()=>{(ye.paused||ye.readyState<3)&&Je()}),lt("ended",()=>{Qe()&&($e(),C="ended",ge())}),lt("error",()=>{var Ee;return xt("error",`Kokoro recording could not play${(Ee=ye.error)!=null&&Ee.code?` (media error ${ye.error.code})`:""}.`)}),C="queued",U("queued",5e3,"Kokoro recording did not start on this device."),S+=1;const je=ye.play();Promise.resolve(je).then(()=>{if(j!==d||ye!==a||c){try{ye.pause()}catch{}return}ie()||(_t("muted"),ge())},Ee=>xt("error",(Ee==null?void 0:Ee.message)||"Kokoro recording could not start.")),ge()}catch(ye){if(j!==d||c)return;$e(),C="error",Z=(ye==null?void 0:ye.message)||"Kokoro recording is unavailable.",ge()}}function se(j,_e,ye=null,Oe=!1){_t(ie()?"idle":"muted"),u=Oe?null:ye,h=Oe?ye:null,f=j,D=typeof(_e==null?void 0:_e.mood)=="string"?_e.mood:"happy",F=Oe?"wrong-total":ye?"wrong-change":typeof(_e==null?void 0:_e.kind)=="string"?_e.kind:"dialogue",H=Ad(_e==null?void 0:_e.character,D),M=H.character,K=Z=null,P=H.voice,O=Tg(M,f,t)}return{info:pe,play(j,_e={}){if(c||!yr(j))return pe();if(se(yr(j),_e,j),!ie())return ge(),pe();_+=1;const ye=d;return Et(ye,j),ht(ye),pe()},playTotal(j,_e={}){if(c||!xr(j))return pe();if(se(xr(j),_e,j,!0),!ie())return ge(),pe();v+=1;const ye=d;return Et(ye,j,!0),ht(ye),pe()},speak(j,_e={}){return c||typeof j!="string"||!j.trim()?pe():(se(j.trim(),_e),ie()?(m+=1,ht(d),pe()):(ge(),pe()))},cancel(){return c||(_t(ie()?"cancelled":"muted"),ge()),pe()},dispose(){c||(_t("cancelled"),c=!0,r&&r.state!=="closed"&&r.close().catch(()=>{}),ge())}}}const Rd=1550,Sc=4200;function Ig({getState:i,isPaused:e,onAdvance:t,onUpdate:n}){let s=null,r=0,a=performance.now(),o=!1,l=null,c=!1,d="";function u(){const p=!c&&s!==null&&i().phase==="success"&&i().order===s,S=p&&e(),E=p?r<650?"printing":r<Rd?"handing-over":"departing":"idle",x=p&&r>=Rd;return{active:p,paused:S,stage:E,elapsedMs:r,remainingMs:p?Math.max(0,Sc-r):0,receiptDelivered:x,changeDelivered:x,bagDelivered:x,handoverDelivered:x}}function h(p=!1){const S=u(),E=`${S.stage}:${S.paused}:${Math.ceil(S.remainingMs/1e3)}`;(p||E!==d)&&(d=E,n==null||n(S))}function f(){clearInterval(l),l=null,s=null,r=0}function _(){if(c)return;if(!u().active){f(),h();return}const p=performance.now(),S=e();if(!S&&!o&&(r=Math.min(Sc,r+Math.max(0,p-a))),a=p,o=S,r>=Sc){f(),t();return}h()}function v(p,S){if(S.phase!=="success"){f();return}s!==S.order&&(f(),s=S.order,r=0,a=performance.now(),o=e(),d="",l=setInterval(_,50))}function m(){a=performance.now(),o=e(),h(!0)}return{info:u,sync:v,tick:_,pauseChanged:m,paint:h,dispose(){c=!0,f()}}}const Pg=new Map([["Mia",15e4],["Leo",105e3],["Aunty Jo",18e4],["Sam",12e4],["Grandpa Ben",21e4],["Benny Bear",15e4],["Poppy Bunny",105e3],["Felix Fox",18e4],["Pip Penguin",12e4],["Coco Cat",21e4]]);function Cd(i,e="starter"){var s;const t=typeof((s=i==null?void 0:i.customer)==null?void 0:s.name)=="string"?i.customer.name.trim():"Customer",n=e==="expert"||e==="cash-challenge"?6e4:e==="shopkeeper"?3e4:0;return{customerKey:`${(i==null?void 0:i.id)??"order"}:${t}`,budgetMs:(Pg.get(t)??15e4)+n,elapsedMs:0}}function Lg(i,e){if(!Number.isFinite(e)||e<=0||i.elapsedMs>=i.budgetMs)return i;const t=i.budgetMs-i.elapsedMs;return{...i,elapsedMs:i.elapsedMs+Math.min(e,t)}}function Uf(i){const e=Math.max(0,i.budgetMs-i.elapsedMs),t=e/i.budgetMs,n=e===0?"exhausted":t<=.2?"impatient":t<=.5?"restless":"calm";return{remainingMs:e,remainingSeconds:Math.ceil(e/1e3),ratio:t,mood:n}}function Of(i,e=!0){if(!e)return{tier:"practice",delta:50,label:"Practice checkout"};const{ratio:t}=Uf(i);return t>.5?{tier:"fast",delta:100,label:"Speedy service"}:t>.2?{tier:"steady",delta:60,label:"Good pace"}:t>0?{tier:"close",delta:20,label:"Just in time"}:{tier:"late",delta:-25,label:"Long wait"}}function Ff(){return{points:0,results:[]}}function Dg(i,e,t){return i.results.some(n=>n.customerKey===e)?i:{points:i.points+t.delta,results:[...i.results,{customerKey:e,...t}]}}const Su=i=>`${i<0?"−":"+"}${Math.abs(i)}`,Ng=i=>String(i).replace("-","−");function kf(){return'<span class="service-preview" data-score-preview><span data-score-preview-label>Finish now</span><b data-score-preview-points></b></span>'}function Ug(i){const e=Of(i,i.enabled),t=["success","finished"].includes(i.phase),n=i.enabled?i.phase==="unload"?"Fast service":e.tier==="late"?"Late service":"Finish now":"Each checkout";for(const s of document.querySelectorAll("[data-score-preview]"))s.hidden=t,s.dataset.scoreTier=e.tier,s.querySelector("[data-score-preview-label]").textContent=n,s.querySelector("[data-score-preview-points]").textContent=`${Su(e.delta)} pts`,s.setAttribute("aria-label",`${n}: ${e.delta<0?"lose":"earn"} ${Math.abs(e.delta)} points when this checkout is complete.`)}function Og(i){if(!i)return"";const e=i.tier==="late"?"Time ran out. Serve the next customer sooner to earn points back.":i.tier==="practice"?"Relaxed practice · no time bonus or penalty.":"Correct change, delivered on time.";return`<div class="service-result" data-score-tier="${i.tier}" role="status"><span class="service-result-symbol" aria-hidden="true">${i.delta<0?"−":"★"}</span><div><span class="service-result-label">${i.label}</span><strong class="service-points">${Su(i.delta)} <small>points</small></strong></div><p>${e}</p></div>`}function Fg(){var i,e;matchMedia("(prefers-reduced-motion: reduce)").matches||((i=document.querySelector(".service-result"))==null||i.animate([{opacity:0,transform:"translateY(6px) scale(.97)"},{opacity:1,transform:"translateY(0) scale(1)"}],{duration:340,easing:"ease-out"}),(e=document.getElementById("shift-score"))==null||e.animate([{transform:"scale(1)"},{transform:"scale(1.12)",offset:.4},{transform:"scale(1)"}],{duration:500,easing:"ease-out"}))}const Id=new Set(["scan","total","payment","drawer","change"]),kg={calm:"Patient",restless:"Getting restless",impatient:"Impatient",exhausted:"Very impatient"},Bf='<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 5.5V10l3 2"/></svg>',Bg=i=>`${Math.floor(i/60)}:${String(i%60).padStart(2,"0")}`;function zg(){return`<div class="patience-widget" data-patience-widget><div class="patience-heading"><span data-patience-label>Patient</span><span class="patience-clock">${Bf}<b data-patience-time></b></span></div><div class="patience-meter" role="meter" aria-label="Customer patience" aria-valuemin="0"><i></i></div>${kf()}</div>`}function zf(i=""){return`<span class="patience-badge ${i}" data-patience-badge>${Bf}<b data-patience-time></b><span data-patience-label>Patient</span>${kf()}</span>`}function Hg({getState:i,getView:e,isEnabled:t,onMoodChange:n,isPaused:s=()=>{var r;return document.hidden||!!((r=document.getElementById("settings"))!=null&&r.open)}}){let r=Cd(i().order,i().levelId),a=performance.now(),o="",l=!1;const c=()=>!!s();let d=c();function u(){const S=i(),E=Uf(r),x=t(),A=Id.has(S.phase),C=x&&A&&c();return{...r,...E,enabled:x,paused:C,running:x&&A&&!C&&E.remainingMs>0,phase:S.phase}}function h(){const S=u();return S.enabled&&Id.has(S.phase)?S.mood:"calm"}function f(S=!1){if(l)return;const E=u(),x=["success","finished"].includes(E.phase),A=E.enabled?x?"served":E.paused?"paused":E.phase==="unload"?"ready":E.mood:"relaxed",C={relaxed:"Relaxed",served:"Served",paused:"Paused",ready:"Ready to serve"}[A]??kg[E.mood],P=E.enabled?x?"✓":Bg(E.remainingSeconds):"∞",O=`${E.customerKey}:${A}:${P}`;if(!(!S&&O===o)){o=O;for(const b of document.querySelectorAll("[data-patience-widget], [data-patience-badge]")){b.dataset.patienceMood=h(),b.dataset.patienceStatus=A,b.querySelector("[data-patience-time]").textContent=P,b.querySelector("[data-patience-label]").textContent=C,b.setAttribute("aria-label",`${i().order.customer.name}: ${C}${E.enabled&&!x?`, ${E.remainingSeconds} seconds of patience remaining`:""}`);const M=b.querySelector(".patience-meter");M&&(M.hidden=!E.enabled||x,M.setAttribute("aria-valuemax",String(E.budgetMs/1e3)),M.setAttribute("aria-valuenow",String(E.remainingSeconds)),M.setAttribute("aria-valuetext",`${C}, ${P} remaining`),M.querySelector("i").style.width=`${E.ratio*100}%`)}Ug(E)}}function _(){var C,P;if(l)return;const S=performance.now(),E=Math.max(0,S-a);a=S;const x=u();x.running&&(r=Lg(r,E));const A=u();A.mood!==x.mood?((P=(C=e())==null?void 0:C.setPatience)==null||P.call(C,h()),n(A.mood),f(!0)):f()}function v(S,E){var x,A;S.order!==E.order&&(r=Cd(E.order,E.levelId),document.getElementById("patience-announcer").textContent=""),a=performance.now(),o="",(A=(x=e())==null?void 0:x.setPatience)==null||A.call(x,h())}function m(){const S=c();S!==d&&(a=performance.now()),d=S,f(!0)}const p=window.setInterval(_,250);return document.addEventListener("visibilitychange",m),document.getElementById("settings").addEventListener("close",m),{info:u,render:f,tick:_,sync:v,pauseChanged:m,dispose(){var S;l=!0,clearInterval(p),document.removeEventListener("visibilitychange",m),(S=document.getElementById("settings"))==null||S.removeEventListener("close",m)}}}const Pd=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);let va=[];function Vg(i){if(!["too-high","too-low"].includes(i)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".total-feedback-symbol");e!=null&&e.animate&&va.push(e.animate([{transform:"scale(.7)"},{transform:"scale(1.2)",offset:.45},{transform:"scale(1)"}],{duration:360,easing:"ease-out"}));const t=document.querySelector(".total-entry .money-input");t!=null&&t.animate&&va.push(t.animate([{transform:"translateX(0)"},{transform:"translateX(-3px)",offset:.2},{transform:"translateX(3px)",offset:.4},{transform:"translateX(-2px)",offset:.6},{transform:"translateX(2px)",offset:.8},{transform:"translateX(0)"}],{duration:320,easing:"ease-out"}))}function Gg(i){if(!["too-little","too-much"].includes(i)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.getElementById("pos-register"),t=(s,r,a)=>{s!=null&&s.animate&&va.push(s.animate(r,{duration:a,easing:"ease-out"}))},n=e.querySelector(".change-feedback-symbol");if(i==="too-little")t(n,[{transform:"translateY(0)"},{transform:"translateY(-7px)",offset:.3},{transform:"translateY(2px)",offset:.6},{transform:"translateY(0)"}],620),t(e.querySelector(".cash-drawer"),[{boxShadow:"0 0 0 0 #e7b94b00"},{boxShadow:"0 0 0 4px #e7b94ba6, 0 0 22px #e7b94b65",offset:.35},{boxShadow:"0 0 0 0 #e7b94b00"}],820);else{t(e.querySelector("#change-preview"),[{transform:"translateX(0)"},{transform:"translateX(-5px)",offset:.2},{transform:"translateX(5px)",offset:.4},{transform:"translateX(-3px)",offset:.6},{transform:"translateX(3px)",offset:.8},{transform:"translateX(0)"}],460);for(const s of e.querySelectorAll(".piece-minus"))t(s,[{transform:"scale(1)"},{transform:"scale(1.28)",offset:.45},{transform:"scale(1)"}],660)}}function Wg(){return`<div class="pos-neck" aria-hidden="true"><i></i></div>
    <div class="pos-console">
      <div class="receipt-printer" aria-label="Receipt printer"><div class="printer-paper-window"><div id="printed-receipt" class="printed-receipt" aria-hidden="true"></div></div><div class="printer-slot" aria-hidden="true"></div><div class="printer-label"><span>THERMAL RECEIPT</span><i></i></div><div class="printer-vents" aria-hidden="true"></div></div>
      <div class="hardware-keypad" aria-label="Cash register number pad">${["7","8","9","4","5","6","1","2","3","⌫","0","."].map(i=>`<button data-key="${i}" aria-label="${i==="⌫"?"Delete last digit":i==="."?"Decimal point":i}" disabled>${i==="⌫"?"⌫":i}</button>`).join("")}</div>
      <div class="console-actions"><span class="hardware-label">CASH CONTROL</span><button id="hardware-total" data-action="total" disabled><span>↵</span>ENTER</button><div class="console-indicator"><i></i><span>POWER</span></div></div>
    </div>
    <section id="change-preview" class="change-preview" aria-label="Selected change tray" hidden></section>
    <div class="drawer-cabinet"><div class="drawer-cabinet-top" aria-hidden="true"><span>SUNNY POS · T-01</span><div class="cabinet-vents"></div></div><div id="cash-tray" class="drawer-slide" hidden></div><button class="register-base" id="drawer-open" disabled aria-label="Cash drawer is closed"><span class="drawer-lock" aria-hidden="true"><i></i></span><span class="drawer-front-handle"><span id="drawer-base-label">CASH DRAWER LOCKED</span></span><span class="drawer-open-light" aria-hidden="true"></span></button><div class="register-feet" aria-hidden="true"><i></i><i></i></div></div>`}function Hf(i){return`<span class="note-country">AUSTRALIA</span><span class="note-medallion" aria-hidden="true">✦</span><strong>${i.label}</strong><small>PLAY MONEY</small><span class="note-window" aria-hidden="true"></span>`}function Vf(i,e){return e===null?`<span class="well-label" aria-hidden="true">${i.label}</span>`:`<span class="well-label stock-well-label" aria-hidden="true"><span>${i.label}</span><span class="stock-count">${e} left</span></span>`}function Gf(i,e){return e===null?`aria-label="Add ${i.label} ${i.kind}"`:`data-remaining-stock="${e}" aria-label="Add ${i.label} ${i.kind}, ${e} left${e===0?"; all selected. Put one back to use it again":""}" ${e===0?"disabled":""}`}function $g(i,e=null){return`<div class="note-well${e===0?" depleted-well":""}"><button class="banknote physical-note" style="--money-color:${i.color}" data-money="${i.cents}" ${Gf(i,e)}>${Hf(i)}</button><span class="note-clip" aria-hidden="true"></span>${Vf(i,e)}</div>`}function Ld(i){return`<div class="${i.kind==="note"?"note":"coin"}-well empty-well" data-unavailable-money="${i.cents}" role="img" aria-label="${i.label} ${i.kind} unavailable for this customer"><span class="empty-slot-outline" aria-hidden="true"></span><span class="empty-slot-word" aria-hidden="true">EMPTY</span>${i.kind==="note"?'<span class="note-clip" aria-hidden="true"></span>':""}<span class="well-label" aria-hidden="true">${i.label}</span></div>`}function Xg(i){const e=Math.min(i.count,5),t=i.kind==="note"?Hf(i):`<span class="coin-rim"></span><strong>${i.label}</strong><small>AUSTRALIA</small>`,n=i.kind==="note"?"banknote physical-note":`coin physical-coin ${i.cents>=100?"gold":"silver"} ${i.cents===50?"fifty-cent":""}`;return`<span class="selected-art money-stack" data-stack-layers="${e}" style="--stack-depth:${e}" aria-hidden="true">${Array.from({length:e},(s,r)=>`<span class="piece-layer ${n}" style="--money-color:${i.color};--layer:${r}">${t}</span>`).join("")}</span>`}function qg(i,e){const t=i.selectedMoney,n=Nt.map(s=>({...s,count:t.filter(r=>r===s.cents).length,index:t.lastIndexOf(s.cents)})).filter(s=>s.count);return`<header class="change-preview-header"><div><span class="change-tray-eyebrow">COUNT, THEN HAND BACK</span><h2>Your change tray</h2><span id="selected-piece-count">${t.length} ${t.length===1?"piece":"pieces"} selected</span></div>${zf()}</header>
    <div class="tray-calculation"><span>Cash <b>${Dt(i.order.paidCents)}</b></span><i>−</i><span>Bill <b>${Dt(i.order.totalCents)}</b></span><i>=</i><span class="tray-question">? change</span></div>
    <div class="selected-money" aria-label="Money selected for change">${n.length?n.map(s=>`<button class="change-piece ${s.kind}" data-remove="${s.index}" data-remove-value="${s.cents}" data-count="${s.count}" aria-label="Remove one ${s.label} ${s.kind}; ${s.count} selected"><span class="piece-minus" aria-hidden="true">−</span>${Xg(s)}<span class="piece-count">${s.label} <b>× ${s.count}</b></span></button>`).join(""):'<div class="empty-change-tray"><span aria-hidden="true">＋</span><strong>Your tray is empty</strong><p>Pick notes and coins from the open drawer.</p></div>'}</div>
    <footer class="change-preview-footer">${e}<div class="change-tray-tools"><span>Tap a piece to put one back</span><button class="clear-tray" data-action="clear" ${t.length?"":"disabled"}>Clear tray</button></div><button class="primary-button" data-action="change">Give the change <span aria-hidden="true">→</span></button></footer>`}function Yg(i,e=null){return`<div class="coin-well${e===0?" depleted-well":""}"><button class="coin physical-coin ${i.cents>=100?"gold":"silver"} ${i.cents===50?"fifty-cent":""}" data-money="${i.cents}" ${Gf(i,e)}><span class="coin-rim" aria-hidden="true"></span><strong>${i.label}</strong><small aria-hidden="true">AUSTRALIA</small></button>${Vf(i,e)}</div>`}function Kg(i,e,t="",n=""){var p;for(const S of va)S.cancel();va=[];const s=i.phase==="change",r=new Set(_a(i).map(S=>S.cents)),a=ic(i),o=Nt.some(({cents:S})=>ms(i,S)>0),l=o?'<div class="drawer-challenge finite-drawer-challenge" data-drawer-challenge><span><b>LIMITED STOCK</b> Each pick uses one piece.</span><strong>Put pieces back to try another combination.</strong></div>':a.length?`<div class="drawer-challenge" data-drawer-challenge><span><b>EMPTY:</b> ${a.map(S=>S.label).join(" · ")}</span><strong>Find another combination</strong></div>`:"",c=document.getElementById("cash-tray"),d=document.getElementById("pos-register");d.dataset.drawer=s?"open":"closed",d.dataset.phase=i.phase,s&&["too-little","too-much"].includes(n)?d.dataset.changeFeedback=n:delete d.dataset.changeFeedback,c.hidden=!s,c.classList.toggle("just-opened",s&&e),c.innerHTML=s?`<div class="cash-drawer" data-drawer-level="${i.levelId}"${o?" data-finite-stock":""}><div class="drawer-label"><span>CHOOSE THE EXACT CHANGE</span><span>${r.size} MONEY TYPES · AUD</span></div>${l}<div class="banknotes">${Nt.filter(S=>S.kind==="note").map(S=>r.has(S.cents)?$g(S,_r(i,S.cents)):Ld(S)).join("")}</div><div class="coins">${Nt.filter(S=>S.kind==="coin").map(S=>r.has(S.cents)?Yg(S,_r(i,S.cents)):Ld(S)).join("")}</div></div>`:"";const u=document.getElementById("change-preview"),h=((p=u.querySelector(".selected-money"))==null?void 0:p.scrollTop)??0;u.hidden=!s,u.innerHTML=s?qg(i,t):"",d.dataset.changeFeedback?u.dataset.feedbackAttempt=String(i.attempts.change):delete u.dataset.feedbackAttempt,s&&(u.querySelector(".selected-money").scrollTop=h);for(const S of d.querySelectorAll("[data-key]"))S.disabled=i.phase!=="total";document.getElementById("hardware-total").disabled=i.phase!=="total";const f=document.getElementById("printed-receipt"),_=i.phase==="success";f.classList.toggle("receipt-printed",_);const v="SUNNY BITES",m=new Map;for(const S of i.order.items){const E=`${S.productId}:${S.priceCents}`;m.has(E)||m.set(E,{...S,quantity:0}),m.get(E).quantity+=1}f.innerHTML=_?`<strong>${v}</strong><span>CHECKOUT 01</span><hr>${[...m.values()].map(S=>`<span data-receipt-product="${Pd(S.productId)}" data-quantity="${S.quantity}">${S.quantity} × ${Pd(S.name)} <b>${Dt(S.priceCents)} each</b></span>`).join("")}<hr><span>TOTAL <b>${Dt(i.order.totalCents)}</b></span><span>CASH <b>${Dt(i.order.paidCents)}</b></span><span>CHANGE <b>CHECKED ✓</b></span><div class="receipt-barcode"></div><em>Thank you. Come again!</em>`:`<strong>${v}</strong><span>YOUR RECEIPT</span><div class="receipt-barcode"></div>`}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const bu="180",jg=0,Dd=1,Jg=2,Wf=1,$f=2,Oi=3,Wi=0,Fn=1,ci=2,fs=0,pr=1,Nd=2,Ud=3,Od=4,Zg=5,Ns=100,Qg=101,e0=102,t0=103,n0=104,i0=200,s0=201,r0=202,a0=203,vl=204,yl=205,o0=206,c0=207,l0=208,u0=209,d0=210,h0=211,f0=212,p0=213,m0=214,xl=0,Ml=1,Sl=2,Mr=3,bl=4,Tl=5,El=6,wl=7,Xf=0,g0=1,_0=2,ps=0,v0=1,y0=2,x0=3,qf=4,M0=5,S0=6,b0=7,Fd="attached",T0="detached",Yf=300,Sr=301,br=302,Al=303,Rl=304,rc=306,Tr=1e3,hs=1001,Wo=1002,Pn=1003,Kf=1004,oa=1005,Hn=1006,Do=1007,zi=1008,Ei=1009,jf=1010,Jf=1011,ya=1012,Tu=1013,Bs=1014,di=1015,Ia=1016,Eu=1017,wu=1018,xa=1020,Zf=35902,Qf=35899,ep=1021,tp=1022,Zn=1023,Ma=1026,Sa=1027,Au=1028,Ru=1029,np=1030,Cu=1031,Iu=1033,No=33776,Uo=33777,Oo=33778,Fo=33779,Cl=35840,Il=35841,Pl=35842,Ll=35843,Dl=36196,Nl=37492,Ul=37496,Ol=37808,Fl=37809,kl=37810,Bl=37811,zl=37812,Hl=37813,Vl=37814,Gl=37815,Wl=37816,$l=37817,Xl=37818,ql=37819,Yl=37820,Kl=37821,jl=36492,Jl=36494,Zl=36495,Ql=36283,eu=36284,tu=36285,nu=36286,ba=2300,Ta=2301,bc=2302,kd=2400,Bd=2401,zd=2402,E0=2500,w0=0,ip=1,iu=2,A0=3200,R0=3201,sp=0,C0=1,ds="",Yt="srgb",Dn="srgb-linear",$o="linear",Ot="srgb",$s=7680,Hd=519,I0=512,P0=513,L0=514,rp=515,D0=516,N0=517,U0=518,O0=519,su=35044,Vd="300 es",Ti=2e3,Xo=2001;class Ir{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Gd=1234567;const ua=Math.PI/180,Er=180/Math.PI;function pi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bn[i&255]+bn[i>>8&255]+bn[i>>16&255]+bn[i>>24&255]+"-"+bn[e&255]+bn[e>>8&255]+"-"+bn[e>>16&15|64]+bn[e>>24&255]+"-"+bn[t&63|128]+bn[t>>8&255]+"-"+bn[t>>16&255]+bn[t>>24&255]+bn[n&255]+bn[n>>8&255]+bn[n>>16&255]+bn[n>>24&255]).toLowerCase()}function pt(i,e,t){return Math.max(e,Math.min(t,i))}function Pu(i,e){return(i%e+e)%e}function F0(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function k0(i,e,t){return i!==e?(t-i)/(e-i):0}function da(i,e,t){return(1-t)*i+t*e}function B0(i,e,t,n){return da(i,e,1-Math.exp(-t*n))}function z0(i,e=1){return e-Math.abs(Pu(i,e*2)-e)}function H0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function V0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function G0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function W0(i,e){return i+Math.random()*(e-i)}function $0(i){return i*(.5-Math.random())}function X0(i){i!==void 0&&(Gd=i);let e=Gd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function q0(i){return i*ua}function Y0(i){return i*Er}function K0(i){return(i&i-1)===0&&i!==0}function j0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function J0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Z0(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),u=r((e-n)/2),h=a((e-n)/2),f=r((n-e)/2),_=a((n-e)/2);switch(s){case"XYX":i.set(o*d,l*u,l*h,o*c);break;case"YZY":i.set(l*h,o*d,l*u,o*c);break;case"ZXZ":i.set(l*u,l*h,o*d,o*c);break;case"XZX":i.set(o*d,l*_,l*f,o*c);break;case"YXY":i.set(l*f,o*d,l*_,o*c);break;case"ZYZ":i.set(l*_,l*f,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function li(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ls={DEG2RAD:ua,RAD2DEG:Er,generateUUID:pi,clamp:pt,euclideanModulo:Pu,mapLinear:F0,inverseLerp:k0,lerp:da,damp:B0,pingpong:z0,smoothstep:H0,smootherstep:V0,randInt:G0,randFloat:W0,randFloatSpread:$0,seededRandom:X0,degToRad:q0,radToDeg:Y0,isPowerOfTwo:K0,ceilPowerOfTwo:j0,floorPowerOfTwo:J0,setQuaternionFromProperEuler:Z0,normalize:Pt,denormalize:li};class We{constructor(e=0,t=0){We.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class it{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],u=n[s+3];const h=r[a+0],f=r[a+1],_=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=_,e[t+3]=v;return}if(u!==v||l!==h||c!==f||d!==_){let m=1-o;const p=l*h+c*f+d*_+u*v,S=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){const A=Math.sqrt(E),C=Math.atan2(A,p*S);m=Math.sin(m*C)/A,o=Math.sin(o*C)/A}const x=o*S;if(l=l*m+h*x,c=c*m+f*x,d=d*m+_*x,u=u*m+v*x,m===1-o){const A=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=A,c*=A,d*=A,u*=A}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],u=r[a],h=r[a+1],f=r[a+2],_=r[a+3];return e[t]=o*_+d*u+l*f-c*h,e[t+1]=l*_+d*h+c*u-o*f,e[t+2]=c*_+d*f+o*h-l*u,e[t+3]=d*_-o*u-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),u=o(r/2),h=l(n/2),f=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=h*d*u+c*f*_,this._y=c*f*u-h*d*_,this._z=c*d*_+h*f*u,this._w=c*d*u-h*f*_;break;case"YXZ":this._x=h*d*u+c*f*_,this._y=c*f*u-h*d*_,this._z=c*d*_-h*f*u,this._w=c*d*u+h*f*_;break;case"ZXY":this._x=h*d*u-c*f*_,this._y=c*f*u+h*d*_,this._z=c*d*_+h*f*u,this._w=c*d*u-h*f*_;break;case"ZYX":this._x=h*d*u-c*f*_,this._y=c*f*u+h*d*_,this._z=c*d*_-h*f*u,this._w=c*d*u+h*f*_;break;case"YZX":this._x=h*d*u+c*f*_,this._y=c*f*u+h*d*_,this._z=c*d*_-h*f*u,this._w=c*d*u-h*f*_;break;case"XZY":this._x=h*d*u-c*f*_,this._y=c*f*u-h*d*_,this._z=c*d*_+h*f*u,this._w=c*d*u+h*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=n+o+u;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(d-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,h=Math.sin(t*d)/c;return this._w=a*u+this._w*h,this._x=n*u+this._x*h,this._y=s*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*d,this.y=n+l*d+o*c-r*u,this.z=s+l*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Tc.copy(this).projectOnVector(e),this.sub(Tc)}reflect(e){return this.sub(Tc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Tc=new R,Wd=new it;class ut{constructor(e,t,n,s,r,a,o,l,c){ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],h=n[2],f=n[5],_=n[8],v=s[0],m=s[3],p=s[6],S=s[1],E=s[4],x=s[7],A=s[2],C=s[5],P=s[8];return r[0]=a*v+o*S+l*A,r[3]=a*m+o*E+l*C,r[6]=a*p+o*x+l*P,r[1]=c*v+d*S+u*A,r[4]=c*m+d*E+u*C,r[7]=c*p+d*x+u*P,r[2]=h*v+f*S+_*A,r[5]=h*m+f*E+_*C,r[8]=h*p+f*x+_*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,h=o*l-d*r,f=c*r-a*l,_=t*u+n*h+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=u*v,e[1]=(s*c-d*n)*v,e[2]=(o*n-s*a)*v,e[3]=h*v,e[4]=(d*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ec.makeScale(e,t)),this}rotate(e){return this.premultiply(Ec.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ec.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ec=new ut;function ap(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ea(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Q0(){const i=Ea("canvas");return i.style.display="block",i}const $d={};function wa(i){i in $d||($d[i]=!0,console.warn(i))}function e_(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Xd=new ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qd=new ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function t_(){const i={enabled:!0,workingColorSpace:Dn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ot&&(s.r=Vi(s.r),s.g=Vi(s.g),s.b=Vi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ot&&(s.r=mr(s.r),s.g=mr(s.g),s.b=mr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ds?$o:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return wa("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return wa("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Dn]:{primaries:e,whitePoint:n,transfer:$o,toXYZ:Xd,fromXYZ:qd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:e,whitePoint:n,transfer:Ot,toXYZ:Xd,fromXYZ:qd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}}),i}const bt=t_();function Vi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function mr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Xs;class n_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Xs===void 0&&(Xs=Ea("canvas")),Xs.width=e.width,Xs.height=e.height;const s=Xs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Xs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ea("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Vi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Vi(t[n]/255)*255):t[n]=Vi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let i_=0;class Lu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:i_++}),this.uuid=pi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(wc(s[a].image)):r.push(wc(s[a]))}else r=wc(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function wc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?n_.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let s_=0;const Ac=new R;class an extends Ir{constructor(e=an.DEFAULT_IMAGE,t=an.DEFAULT_MAPPING,n=hs,s=hs,r=Hn,a=zi,o=Zn,l=Ei,c=an.DEFAULT_ANISOTROPY,d=ds){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:s_++}),this.uuid=pi(),this.name="",this.source=new Lu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ac).x}get height(){return this.source.getSize(Ac).y}get depth(){return this.source.getSize(Ac).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Yf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Tr:e.x=e.x-Math.floor(e.x);break;case hs:e.x=e.x<0?0:1;break;case Wo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Tr:e.y=e.y-Math.floor(e.y);break;case hs:e.y=e.y<0?0:1;break;case Wo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=Yf;an.DEFAULT_ANISOTROPY=1;class Ct{constructor(e=0,t=0,n=0,s=1){Ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],f=l[5],_=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+v)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,x=(f+1)/2,A=(p+1)/2,C=(d+h)/4,P=(u+v)/4,O=(_+m)/4;return E>x&&E>A?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=C/n,r=P/n):x>A?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=C/s,r=O/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=P/r,s=O/r),this.set(n,s,r,t),this}let S=Math.sqrt((m-_)*(m-_)+(u-v)*(u-v)+(h-d)*(h-d));return Math.abs(S)<.001&&(S=1),this.x=(m-_)/S,this.y=(u-v)/S,this.z=(h-d)/S,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this.w=pt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this.w=pt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class r_ extends Ir{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new an(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Hn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Lu(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zs extends r_{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class op extends an{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class a_ extends an{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(si.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(si.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=si.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,si):si.fromBufferAttribute(r,a),si.applyMatrix4(e.matrixWorld),this.expandByPoint(si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qa.copy(n.boundingBox)),Qa.applyMatrix4(e.matrixWorld),this.union(Qa)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,si),si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qr),eo.subVectors(this.max,qr),qs.subVectors(e.a,qr),Ys.subVectors(e.b,qr),Ks.subVectors(e.c,qr),ts.subVectors(Ys,qs),ns.subVectors(Ks,Ys),Es.subVectors(qs,Ks);let t=[0,-ts.z,ts.y,0,-ns.z,ns.y,0,-Es.z,Es.y,ts.z,0,-ts.x,ns.z,0,-ns.x,Es.z,0,-Es.x,-ts.y,ts.x,0,-ns.y,ns.x,0,-Es.y,Es.x,0];return!Rc(t,qs,Ys,Ks,eo)||(t=[1,0,0,0,1,0,0,0,1],!Rc(t,qs,Ys,Ks,eo))?!1:(to.crossVectors(ts,ns),t=[to.x,to.y,to.z],Rc(t,qs,Ys,Ks,eo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ii=[new R,new R,new R,new R,new R,new R,new R,new R],si=new R,Qa=new Vn,qs=new R,Ys=new R,Ks=new R,ts=new R,ns=new R,Es=new R,qr=new R,eo=new R,to=new R,ws=new R;function Rc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ws.fromArray(i,r);const o=s.x*Math.abs(ws.x)+s.y*Math.abs(ws.y)+s.z*Math.abs(ws.z),l=e.dot(ws),c=t.dot(ws),d=n.dot(ws);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const o_=new Vn,Yr=new R,Cc=new R;class wi{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):o_.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Yr.subVectors(e,this.center);const t=Yr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Yr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Yr.copy(e.center).add(Cc)),this.expandByPoint(Yr.copy(e.center).sub(Cc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Pi=new R,Ic=new R,no=new R,is=new R,Pc=new R,io=new R,Lc=new R;class Pa{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pi.copy(this.origin).addScaledVector(this.direction,t),Pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ic.copy(e).add(t).multiplyScalar(.5),no.copy(t).sub(e).normalize(),is.copy(this.origin).sub(Ic);const r=e.distanceTo(t)*.5,a=-this.direction.dot(no),o=is.dot(this.direction),l=-is.dot(no),c=is.lengthSq(),d=Math.abs(1-a*a);let u,h,f,_;if(d>0)if(u=a*l-o,h=a*o-l,_=r*d,u>=0)if(h>=-_)if(h<=_){const v=1/d;u*=v,h*=v,f=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h<=-_?(u=Math.max(0,-(-a*r+o)),h=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c):h<=_?(u=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(u=Math.max(0,-(a*r+o)),h=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c);else h=a>0?-r:r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ic).addScaledVector(no,h),f}intersectSphere(e,t){Pi.subVectors(e.center,this.origin);const n=Pi.dot(this.direction),s=Pi.dot(Pi)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),d>=0?(r=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Pi)!==null}intersectTriangle(e,t,n,s,r){Pc.subVectors(t,e),io.subVectors(n,e),Lc.crossVectors(Pc,io);let a=this.direction.dot(Lc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;is.subVectors(this.origin,e);const l=o*this.direction.dot(io.crossVectors(is,io));if(l<0)return null;const c=o*this.direction.dot(Pc.cross(is));if(c<0||l+c>a)return null;const d=-o*is.dot(Lc);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot{constructor(e,t,n,s,r,a,o,l,c,d,u,h,f,_,v,m){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,u,h,f,_,v,m)}set(e,t,n,s,r,a,o,l,c,d,u,h,f,_,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=f,p[7]=_,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/js.setFromMatrixColumn(e,0).length(),r=1/js.setFromMatrixColumn(e,1).length(),a=1/js.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const h=a*d,f=a*u,_=o*d,v=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=f+_*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=_+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*d,f=l*u,_=c*d,v=c*u;t[0]=h+v*o,t[4]=_*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=f*o-_,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*d,f=l*u,_=c*d,v=c*u;t[0]=h-v*o,t[4]=-a*u,t[8]=_+f*o,t[1]=f+_*o,t[5]=a*d,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*d,f=a*u,_=o*d,v=o*u;t[0]=l*d,t[4]=_*c-f,t[8]=h*c+v,t[1]=l*u,t[5]=v*c+h,t[9]=f*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,_=o*l,v=o*c;t[0]=l*d,t[4]=v-h*u,t[8]=_*u+f,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*u+_,t[10]=h-v*u}else if(e.order==="XZY"){const h=a*l,f=a*c,_=o*l,v=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+v,t[5]=a*d,t[9]=f*u-_,t[2]=_*u-f,t[6]=o*d,t[10]=v*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(c_,e,l_)}lookAt(e,t,n){const s=this.elements;return Bn.subVectors(e,t),Bn.lengthSq()===0&&(Bn.z=1),Bn.normalize(),ss.crossVectors(n,Bn),ss.lengthSq()===0&&(Math.abs(n.z)===1?Bn.x+=1e-4:Bn.z+=1e-4,Bn.normalize(),ss.crossVectors(n,Bn)),ss.normalize(),so.crossVectors(Bn,ss),s[0]=ss.x,s[4]=so.x,s[8]=Bn.x,s[1]=ss.y,s[5]=so.y,s[9]=Bn.y,s[2]=ss.z,s[6]=so.z,s[10]=Bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],h=n[9],f=n[13],_=n[2],v=n[6],m=n[10],p=n[14],S=n[3],E=n[7],x=n[11],A=n[15],C=s[0],P=s[4],O=s[8],b=s[12],M=s[1],D=s[5],F=s[9],H=s[13],K=s[2],Z=s[6],ee=s[10],ie=s[14],q=s[3],pe=s[7],ge=s[11],$e=s[15];return r[0]=a*C+o*M+l*K+c*q,r[4]=a*P+o*D+l*Z+c*pe,r[8]=a*O+o*F+l*ee+c*ge,r[12]=a*b+o*H+l*ie+c*$e,r[1]=d*C+u*M+h*K+f*q,r[5]=d*P+u*D+h*Z+f*pe,r[9]=d*O+u*F+h*ee+f*ge,r[13]=d*b+u*H+h*ie+f*$e,r[2]=_*C+v*M+m*K+p*q,r[6]=_*P+v*D+m*Z+p*pe,r[10]=_*O+v*F+m*ee+p*ge,r[14]=_*b+v*H+m*ie+p*$e,r[3]=S*C+E*M+x*K+A*q,r[7]=S*P+E*D+x*Z+A*pe,r[11]=S*O+E*F+x*ee+A*ge,r[15]=S*b+E*H+x*ie+A*$e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],f=e[14],_=e[3],v=e[7],m=e[11],p=e[15];return _*(+r*l*u-s*c*u-r*o*h+n*c*h+s*o*f-n*l*f)+v*(+t*l*f-t*c*h+r*a*h-s*a*f+s*c*d-r*l*d)+m*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*d-n*c*d)+p*(-s*o*d-t*l*u+t*o*h+s*a*u-n*a*h+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],f=e[11],_=e[12],v=e[13],m=e[14],p=e[15],S=u*m*c-v*h*c+v*l*f-o*m*f-u*l*p+o*h*p,E=_*h*c-d*m*c-_*l*f+a*m*f+d*l*p-a*h*p,x=d*v*c-_*u*c+_*o*f-a*v*f-d*o*p+a*u*p,A=_*u*l-d*v*l-_*o*h+a*v*h+d*o*m-a*u*m,C=t*S+n*E+s*x+r*A;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/C;return e[0]=S*P,e[1]=(v*h*r-u*m*r-v*s*f+n*m*f+u*s*p-n*h*p)*P,e[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*p+n*l*p)*P,e[3]=(u*l*r-o*h*r-u*s*c+n*h*c+o*s*f-n*l*f)*P,e[4]=E*P,e[5]=(d*m*r-_*h*r+_*s*f-t*m*f-d*s*p+t*h*p)*P,e[6]=(_*l*r-a*m*r-_*s*c+t*m*c+a*s*p-t*l*p)*P,e[7]=(a*h*r-d*l*r+d*s*c-t*h*c-a*s*f+t*l*f)*P,e[8]=x*P,e[9]=(_*u*r-d*v*r-_*n*f+t*v*f+d*n*p-t*u*p)*P,e[10]=(a*v*r-_*o*r+_*n*c-t*v*c-a*n*p+t*o*p)*P,e[11]=(d*o*r-a*u*r-d*n*c+t*u*c+a*n*f-t*o*f)*P,e[12]=A*P,e[13]=(d*v*s-_*u*s+_*n*h-t*v*h-d*n*m+t*u*m)*P,e[14]=(_*o*s-a*v*s-_*n*l+t*v*l+a*n*m-t*o*m)*P,e[15]=(a*u*s-d*o*s+d*n*l-t*u*l-a*n*h+t*o*h)*P,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,u=o+o,h=r*c,f=r*d,_=r*u,v=a*d,m=a*u,p=o*u,S=l*c,E=l*d,x=l*u,A=n.x,C=n.y,P=n.z;return s[0]=(1-(v+p))*A,s[1]=(f+x)*A,s[2]=(_-E)*A,s[3]=0,s[4]=(f-x)*C,s[5]=(1-(h+p))*C,s[6]=(m+S)*C,s[7]=0,s[8]=(_+E)*P,s[9]=(m-S)*P,s[10]=(1-(h+v))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=js.set(s[0],s[1],s[2]).length();const a=js.set(s[4],s[5],s[6]).length(),o=js.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],ri.copy(this);const c=1/r,d=1/a,u=1/o;return ri.elements[0]*=c,ri.elements[1]*=c,ri.elements[2]*=c,ri.elements[4]*=d,ri.elements[5]*=d,ri.elements[6]*=d,ri.elements[8]*=u,ri.elements[9]*=u,ri.elements[10]*=u,t.setFromRotationMatrix(ri),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Ti,l=!1){const c=this.elements,d=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s);let _,v;if(l)_=r/(a-r),v=a*r/(a-r);else if(o===Ti)_=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Xo)_=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Ti,l=!1){const c=this.elements,d=2/(t-e),u=2/(n-s),h=-(t+e)/(t-e),f=-(n+s)/(n-s);let _,v;if(l)_=1/(a-r),v=a/(a-r);else if(o===Ti)_=-2/(a-r),v=-(a+r)/(a-r);else if(o===Xo)_=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=_,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const js=new R,ri=new ot,c_=new R(0,0,0),l_=new R(1,1,1),ss=new R,so=new R,Bn=new R,Yd=new ot,Kd=new it;class Kt{constructor(e=0,t=0,n=0,s=Kt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-pt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(pt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-pt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(pt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Kd.setFromEuler(this),this.setFromQuaternion(Kd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Kt.DEFAULT_ORDER="XYZ";class Du{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let u_=0;const jd=new R,Js=new it,Li=new ot,ro=new R,Kr=new R,d_=new R,h_=new it,Jd=new R(1,0,0),Zd=new R(0,1,0),Qd=new R(0,0,1),eh={type:"added"},f_={type:"removed"},Zs={type:"childadded",child:null},Dc={type:"childremoved",child:null};class zt extends Ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:u_++}),this.uuid=pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zt.DEFAULT_UP.clone();const e=new R,t=new Kt,n=new it,s=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ot},normalMatrix:{value:new ut}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Du,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Js.setFromAxisAngle(e,t),this.quaternion.multiply(Js),this}rotateOnWorldAxis(e,t){return Js.setFromAxisAngle(e,t),this.quaternion.premultiply(Js),this}rotateX(e){return this.rotateOnAxis(Jd,e)}rotateY(e){return this.rotateOnAxis(Zd,e)}rotateZ(e){return this.rotateOnAxis(Qd,e)}translateOnAxis(e,t){return jd.copy(e).applyQuaternion(this.quaternion),this.position.add(jd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jd,e)}translateY(e){return this.translateOnAxis(Zd,e)}translateZ(e){return this.translateOnAxis(Qd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ro.copy(e):ro.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Kr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(Kr,ro,this.up):Li.lookAt(ro,Kr,this.up),this.quaternion.setFromRotationMatrix(Li),s&&(Li.extractRotation(s.matrixWorld),Js.setFromRotationMatrix(Li),this.quaternion.premultiply(Js.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(eh),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(f_),Dc.child=e,this.dispatchEvent(Dc),Dc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Li.multiply(e.parent.matrixWorld)),e.applyMatrix4(Li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(eh),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Kr,e,d_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Kr,h_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),h=a(e.skeletons),f=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}zt.DEFAULT_UP=new R(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ai=new R,Di=new R,Nc=new R,Ni=new R,Qs=new R,er=new R,th=new R,Uc=new R,Oc=new R,Fc=new R,kc=new Ct,Bc=new Ct,zc=new Ct;class jn{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ai.subVectors(e,t),s.cross(ai);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ai.subVectors(s,t),Di.subVectors(n,t),Nc.subVectors(e,t);const a=ai.dot(ai),o=ai.dot(Di),l=ai.dot(Nc),c=Di.dot(Di),d=Di.dot(Nc),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const h=1/u,f=(c*l-o*d)*h,_=(a*d-o*l)*h;return r.set(1-f-_,_,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ni)===null?!1:Ni.x>=0&&Ni.y>=0&&Ni.x+Ni.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Ni)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ni.x),l.addScaledVector(a,Ni.y),l.addScaledVector(o,Ni.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return kc.setScalar(0),Bc.setScalar(0),zc.setScalar(0),kc.fromBufferAttribute(e,t),Bc.fromBufferAttribute(e,n),zc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(kc,r.x),a.addScaledVector(Bc,r.y),a.addScaledVector(zc,r.z),a}static isFrontFacing(e,t,n,s){return ai.subVectors(n,t),Di.subVectors(e,t),ai.cross(Di).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ai.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),ai.cross(Di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return jn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return jn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return jn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return jn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return jn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Qs.subVectors(s,n),er.subVectors(r,n),Uc.subVectors(e,n);const l=Qs.dot(Uc),c=er.dot(Uc);if(l<=0&&c<=0)return t.copy(n);Oc.subVectors(e,s);const d=Qs.dot(Oc),u=er.dot(Oc);if(d>=0&&u<=d)return t.copy(s);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(Qs,a);Fc.subVectors(e,r);const f=Qs.dot(Fc),_=er.dot(Fc);if(_>=0&&f<=_)return t.copy(r);const v=f*c-l*_;if(v<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(er,o);const m=d*_-f*u;if(m<=0&&u-d>=0&&f-_>=0)return th.subVectors(r,s),o=(u-d)/(u-d+(f-_)),t.copy(s).addScaledVector(th,o);const p=1/(m+v+h);return a=v*p,o=h*p,t.copy(n).addScaledVector(Qs,a).addScaledVector(er,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const cp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rs={h:0,s:0,l:0},ao={h:0,s:0,l:0};function Hc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class st{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,bt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=bt.workingColorSpace){return this.r=e,this.g=t,this.b=n,bt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=bt.workingColorSpace){if(e=Pu(e,1),t=pt(t,0,1),n=pt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Hc(a,r,e+1/3),this.g=Hc(a,r,e),this.b=Hc(a,r,e-1/3)}return bt.colorSpaceToWorking(this,s),this}setStyle(e,t=Yt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yt){const n=cp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vi(e.r),this.g=Vi(e.g),this.b=Vi(e.b),this}copyLinearToSRGB(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return bt.workingToColorSpace(Tn.copy(this),e),Math.round(pt(Tn.r*255,0,255))*65536+Math.round(pt(Tn.g*255,0,255))*256+Math.round(pt(Tn.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=bt.workingColorSpace){bt.workingToColorSpace(Tn.copy(this),t);const n=Tn.r,s=Tn.g,r=Tn.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=bt.workingColorSpace){return bt.workingToColorSpace(Tn.copy(this),t),e.r=Tn.r,e.g=Tn.g,e.b=Tn.b,e}getStyle(e=Yt){bt.workingToColorSpace(Tn.copy(this),e);const t=Tn.r,n=Tn.g,s=Tn.b;return e!==Yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(rs),this.setHSL(rs.h+e,rs.s+t,rs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(rs),e.getHSL(ao);const n=da(rs.h,ao.h,t),s=da(rs.s,ao.s,t),r=da(rs.l,ao.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tn=new st;st.NAMES=cp;let p_=0;class mi extends Ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:p_++}),this.uuid=pi(),this.name="",this.type="Material",this.blending=pr,this.side=Wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vl,this.blendDst=yl,this.blendEquation=Ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=Mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$s,this.stencilZFail=$s,this.stencilZPass=$s,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==pr&&(n.blending=this.blending),this.side!==Wi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==vl&&(n.blendSrc=this.blendSrc),this.blendDst!==yl&&(n.blendDst=this.blendDst),this.blendEquation!==Ns&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Mr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$s&&(n.stencilFail=this.stencilFail),this.stencilZFail!==$s&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==$s&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Jn extends mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.combine=Xf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const tn=new R,oo=new We;let m_=0;class Ln{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:m_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=su,this.updateRanges=[],this.gpuType=di,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)oo.fromBufferAttribute(this,t),oo.applyMatrix3(e),this.setXY(t,oo.x,oo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix3(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=li(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=li(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=li(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=li(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=li(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array),r=Pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==su&&(e.usage=this.usage),e}}class lp extends Ln{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class up extends Ln{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Bt extends Ln{constructor(e,t,n){super(new Float32Array(e),t,n)}}let g_=0;const Xn=new ot,Vc=new zt,tr=new R,zn=new Vn,jr=new Vn,un=new R;class pn extends Ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:g_++}),this.uuid=pi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ap(e)?up:lp)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ut().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Xn.makeRotationFromQuaternion(e),this.applyMatrix4(Xn),this}rotateX(e){return Xn.makeRotationX(e),this.applyMatrix4(Xn),this}rotateY(e){return Xn.makeRotationY(e),this.applyMatrix4(Xn),this}rotateZ(e){return Xn.makeRotationZ(e),this.applyMatrix4(Xn),this}translate(e,t,n){return Xn.makeTranslation(e,t,n),this.applyMatrix4(Xn),this}scale(e,t,n){return Xn.makeScale(e,t,n),this.applyMatrix4(Xn),this}lookAt(e){return Vc.lookAt(e),Vc.updateMatrix(),this.applyMatrix4(Vc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(tr).negate(),this.translate(tr.x,tr.y,tr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Bt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];zn.setFromBufferAttribute(r),this.morphTargetsRelative?(un.addVectors(this.boundingBox.min,zn.min),this.boundingBox.expandByPoint(un),un.addVectors(this.boundingBox.max,zn.max),this.boundingBox.expandByPoint(un)):(this.boundingBox.expandByPoint(zn.min),this.boundingBox.expandByPoint(zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(zn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];jr.setFromBufferAttribute(o),this.morphTargetsRelative?(un.addVectors(zn.min,jr.min),zn.expandByPoint(un),un.addVectors(zn.max,jr.max),zn.expandByPoint(un)):(zn.expandByPoint(jr.min),zn.expandByPoint(jr.max))}zn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)un.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(un));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)un.fromBufferAttribute(o,c),l&&(tr.fromBufferAttribute(e,c),un.add(tr)),s=Math.max(s,n.distanceToSquared(un))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ln(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let O=0;O<n.count;O++)o[O]=new R,l[O]=new R;const c=new R,d=new R,u=new R,h=new We,f=new We,_=new We,v=new R,m=new R;function p(O,b,M){c.fromBufferAttribute(n,O),d.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),h.fromBufferAttribute(r,O),f.fromBufferAttribute(r,b),_.fromBufferAttribute(r,M),d.sub(c),u.sub(c),f.sub(h),_.sub(h);const D=1/(f.x*_.y-_.x*f.y);isFinite(D)&&(v.copy(d).multiplyScalar(_.y).addScaledVector(u,-f.y).multiplyScalar(D),m.copy(u).multiplyScalar(f.x).addScaledVector(d,-_.x).multiplyScalar(D),o[O].add(v),o[b].add(v),o[M].add(v),l[O].add(m),l[b].add(m),l[M].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let O=0,b=S.length;O<b;++O){const M=S[O],D=M.start,F=M.count;for(let H=D,K=D+F;H<K;H+=3)p(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const E=new R,x=new R,A=new R,C=new R;function P(O){A.fromBufferAttribute(s,O),C.copy(A);const b=o[O];E.copy(b),E.sub(A.multiplyScalar(A.dot(b))).normalize(),x.crossVectors(C,b);const D=x.dot(l[O])<0?-1:1;a.setXYZW(O,E.x,E.y,E.z,D)}for(let O=0,b=S.length;O<b;++O){const M=S[O],D=M.start,F=M.count;for(let H=D,K=D+F;H<K;H+=3)P(e.getX(H+0)),P(e.getX(H+1)),P(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ln(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const s=new R,r=new R,a=new R,o=new R,l=new R,c=new R,d=new R,u=new R;if(e)for(let h=0,f=e.count;h<f;h+=3){const _=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)un.fromBufferAttribute(e,t),un.normalize(),e.setXYZ(t,un.x,un.y,un.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let f=0,_=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*d;for(let p=0;p<d;p++)h[_++]=c[f++]}return new Ln(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new pn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const f=c[u];d.push(f.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],u=r[c];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nh=new ot,As=new Pa,co=new wi,ih=new R,lo=new R,uo=new R,ho=new R,Gc=new R,fo=new R,sh=new R,po=new R;class It extends zt{constructor(e=new pn,t=new Jn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){fo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],u=r[l];d!==0&&(Gc.fromBufferAttribute(u,e),a?fo.addScaledVector(Gc,d):fo.addScaledVector(Gc.sub(t),d))}t.add(fo)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),co.copy(n.boundingSphere),co.applyMatrix4(r),As.copy(e.ray).recast(e.near),!(co.containsPoint(As.origin)===!1&&(As.intersectSphere(co,ih)===null||As.origin.distanceToSquared(ih)>(e.far-e.near)**2))&&(nh.copy(r).invert(),As.copy(e.ray).applyMatrix4(nh),!(n.boundingBox!==null&&As.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,As)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,v=h.length;_<v;_++){const m=h[_],p=a[m.materialIndex],S=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=S,A=E;x<A;x+=3){const C=o.getX(x),P=o.getX(x+1),O=o.getX(x+2);s=mo(this,p,e,n,c,d,u,C,P,O),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=_,p=v;m<p;m+=3){const S=o.getX(m),E=o.getX(m+1),x=o.getX(m+2);s=mo(this,a,e,n,c,d,u,S,E,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,v=h.length;_<v;_++){const m=h[_],p=a[m.materialIndex],S=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=S,A=E;x<A;x+=3){const C=x,P=x+1,O=x+2;s=mo(this,p,e,n,c,d,u,C,P,O),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=_,p=v;m<p;m+=3){const S=m,E=m+1,x=m+2;s=mo(this,a,e,n,c,d,u,S,E,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function __(i,e,t,n,s,r,a,o){let l;if(e.side===Fn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Wi,o),l===null)return null;po.copy(o),po.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(po);return c<t.near||c>t.far?null:{distance:c,point:po.clone(),object:i}}function mo(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,lo),i.getVertexPosition(l,uo),i.getVertexPosition(c,ho);const d=__(i,e,t,n,lo,uo,ho,sh);if(d){const u=new R;jn.getBarycoord(sh,lo,uo,ho,u),s&&(d.uv=jn.getInterpolatedAttribute(s,o,l,c,u,new We)),r&&(d.uv1=jn.getInterpolatedAttribute(r,o,l,c,u,new We)),a&&(d.normal=jn.getInterpolatedAttribute(a,o,l,c,u,new R),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new R,materialIndex:0};jn.getNormal(lo,uo,ho,h.normal),d.face=h,d.barycoord=u}return d}class Yn extends pn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],u=[];let h=0,f=0;_("z","y","x",-1,-1,n,t,e,a,r,0),_("z","y","x",1,-1,n,t,-e,a,r,1),_("x","z","y",1,1,e,n,t,s,a,2),_("x","z","y",1,-1,e,n,-t,s,a,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Bt(c,3)),this.setAttribute("normal",new Bt(d,3)),this.setAttribute("uv",new Bt(u,2));function _(v,m,p,S,E,x,A,C,P,O,b){const M=x/P,D=A/O,F=x/2,H=A/2,K=C/2,Z=P+1,ee=O+1;let ie=0,q=0;const pe=new R;for(let ge=0;ge<ee;ge++){const $e=ge*D-H;for(let rt=0;rt<Z;rt++){const _t=rt*M-F;pe[v]=_t*S,pe[m]=$e*E,pe[p]=K,c.push(pe.x,pe.y,pe.z),pe[v]=0,pe[m]=0,pe[p]=C>0?1:-1,d.push(pe.x,pe.y,pe.z),u.push(rt/P),u.push(1-ge/O),ie+=1}}for(let ge=0;ge<O;ge++)for(let $e=0;$e<P;$e++){const rt=h+$e+Z*ge,_t=h+$e+Z*(ge+1),Et=h+($e+1)+Z*(ge+1),ht=h+($e+1)+Z*ge;l.push(rt,_t,ht),l.push(_t,Et,ht),q+=6}o.addGroup(f,q,b),f+=q,h+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function wr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Rn(i){const e={};for(let t=0;t<i.length;t++){const n=wr(i[t]);for(const s in n)e[s]=n[s]}return e}function v_(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function dp(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:bt.workingColorSpace}const y_={clone:wr,merge:Rn};var x_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,M_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _s extends mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=x_,this.fragmentShader=M_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wr(e.uniforms),this.uniformsGroups=v_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class hp extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=Ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const as=new R,rh=new We,ah=new We;class Cn extends hp{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Er*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ua*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Er*2*Math.atan(Math.tan(ua*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){as.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(as.x,as.y).multiplyScalar(-e/as.z),as.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(as.x,as.y).multiplyScalar(-e/as.z)}getViewSize(e,t){return this.getViewBounds(e,rh,ah),t.subVectors(ah,rh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ua*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const nr=-90,ir=1;class S_ extends zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Cn(nr,ir,e,t);s.layers=this.layers,this.add(s);const r=new Cn(nr,ir,e,t);r.layers=this.layers,this.add(r);const a=new Cn(nr,ir,e,t);a.layers=this.layers,this.add(a);const o=new Cn(nr,ir,e,t);o.layers=this.layers,this.add(o);const l=new Cn(nr,ir,e,t);l.layers=this.layers,this.add(l);const c=new Cn(nr,ir,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Ti)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Xo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(u,h,f),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class fp extends an{constructor(e=[],t=Sr,n,s,r,a,o,l,c,d){super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class b_ extends zs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new fp(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Yn(5,5,5),r=new _s({name:"CubemapFromEquirect",uniforms:wr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fn,blending:fs});r.uniforms.tEquirect.value=t;const a=new It(s,r),o=t.minFilter;return t.minFilter===zi&&(t.minFilter=Hn),new S_(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class qt extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const T_={type:"move"};class Wc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,_=.005;c.inputState.pinching&&h>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(T_)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new qt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Nu{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new st(e),this.near=t,this.far=n}clone(){return new Nu(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class E_ extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kt,this.environmentIntensity=1,this.environmentRotation=new Kt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class pp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=su,this.updateRanges=[],this.version=0,this.uuid=pi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const An=new R;class Aa{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyMatrix4(e),this.setXYZ(t,An.x,An.y,An.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyNormalMatrix(e),this.setXYZ(t,An.x,An.y,An.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.transformDirection(e),this.setXYZ(t,An.x,An.y,An.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=li(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=li(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=li(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=li(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=li(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array),r=Pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ln(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Aa(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class mp extends mi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let sr;const Jr=new R,rr=new R,ar=new R,or=new We,Zr=new We,gp=new ot,go=new R,Qr=new R,_o=new R,oh=new We,$c=new We,ch=new We;class w_ extends zt{constructor(e=new mp){if(super(),this.isSprite=!0,this.type="Sprite",sr===void 0){sr=new pn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new pp(t,5);sr.setIndex([0,1,2,0,2,3]),sr.setAttribute("position",new Aa(n,3,0,!1)),sr.setAttribute("uv",new Aa(n,2,3,!1))}this.geometry=sr,this.material=e,this.center=new We(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),rr.setFromMatrixScale(this.matrixWorld),gp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ar.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&rr.multiplyScalar(-ar.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;vo(go.set(-.5,-.5,0),ar,a,rr,s,r),vo(Qr.set(.5,-.5,0),ar,a,rr,s,r),vo(_o.set(.5,.5,0),ar,a,rr,s,r),oh.set(0,0),$c.set(1,0),ch.set(1,1);let o=e.ray.intersectTriangle(go,Qr,_o,!1,Jr);if(o===null&&(vo(Qr.set(-.5,.5,0),ar,a,rr,s,r),$c.set(0,1),o=e.ray.intersectTriangle(go,_o,Qr,!1,Jr),o===null))return;const l=e.ray.origin.distanceTo(Jr);l<e.near||l>e.far||t.push({distance:l,point:Jr.clone(),uv:jn.getInterpolation(Jr,go,Qr,_o,oh,$c,ch,new We),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function vo(i,e,t,n,s,r){or.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Zr.x=r*or.x-s*or.y,Zr.y=s*or.x+r*or.y):Zr.copy(or),i.copy(e),i.x+=Zr.x,i.y+=Zr.y,i.applyMatrix4(gp)}const lh=new R,uh=new Ct,dh=new Ct,A_=new R,hh=new ot,yo=new R,Xc=new wi,fh=new ot,qc=new Pa;class R_ extends It{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Fd,this.bindMatrix=new ot,this.bindMatrixInverse=new ot,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Vn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,yo),this.boundingBox.expandByPoint(yo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new wi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,yo),this.boundingSphere.expandByPoint(yo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xc.copy(this.boundingSphere),Xc.applyMatrix4(s),e.ray.intersectsSphere(Xc)!==!1&&(fh.copy(s).invert(),qc.copy(e.ray).applyMatrix4(fh),!(this.boundingBox!==null&&qc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,qc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ct,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Fd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===T0?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;uh.fromBufferAttribute(s.attributes.skinIndex,e),dh.fromBufferAttribute(s.attributes.skinWeight,e),lh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=dh.getComponent(r);if(a!==0){const o=uh.getComponent(r);hh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(A_.copy(lh).applyMatrix4(hh),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class _p extends zt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class vp extends an{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Pn,d=Pn,u,h){super(null,a,o,l,c,d,s,r,u,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ph=new ot,C_=new ot;class Uu{constructor(e=[],t=[]){this.uuid=pi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ot)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ot;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:C_;ph.multiplyMatrices(o,t[r]),ph.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Uu(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new vp(t,e,e,Zn,di);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new _p),this.bones.push(a),this.boneInverses.push(new ot().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class ru extends Ln{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const cr=new ot,mh=new ot,xo=[],gh=new Vn,I_=new ot,ea=new It,ta=new wi;class yp extends It{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ru(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,I_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Vn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,cr),gh.copy(e.boundingBox).applyMatrix4(cr),this.boundingBox.union(gh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new wi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,cr),ta.copy(e.boundingSphere).applyMatrix4(cr),this.boundingSphere.union(ta)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(ea.geometry=this.geometry,ea.material=this.material,ea.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ta.copy(this.boundingSphere),ta.applyMatrix4(n),e.ray.intersectsSphere(ta)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,cr),mh.multiplyMatrices(n,cr),ea.matrixWorld=mh,ea.raycast(e,xo);for(let a=0,o=xo.length;a<o;a++){const l=xo[a];l.instanceId=r,l.object=this,t.push(l)}xo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ru(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new vp(new Float32Array(s*this.count),s,this.count,Au,di));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Yc=new R,P_=new R,L_=new ut;class us{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Yc.subVectors(n,t).cross(P_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Yc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||L_.getNormalMatrix(e),s=this.coplanarPoint(Yc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Rs=new wi,D_=new We(.5,.5),Mo=new R;class Ou{constructor(e=new us,t=new us,n=new us,s=new us,r=new us,a=new us){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ti,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],u=r[5],h=r[6],f=r[7],_=r[8],v=r[9],m=r[10],p=r[11],S=r[12],E=r[13],x=r[14],A=r[15];if(s[0].setComponents(c-a,f-d,p-_,A-S).normalize(),s[1].setComponents(c+a,f+d,p+_,A+S).normalize(),s[2].setComponents(c+o,f+u,p+v,A+E).normalize(),s[3].setComponents(c-o,f-u,p-v,A-E).normalize(),n)s[4].setComponents(l,h,m,x).normalize(),s[5].setComponents(c-l,f-h,p-m,A-x).normalize();else if(s[4].setComponents(c-l,f-h,p-m,A-x).normalize(),t===Ti)s[5].setComponents(c+l,f+h,p+m,A+x).normalize();else if(t===Xo)s[5].setComponents(l,h,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Rs)}intersectsSprite(e){Rs.center.set(0,0,0);const t=D_.distanceTo(e.center);return Rs.radius=.7071067811865476+t,Rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Rs)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Mo.x=s.normal.x>0?e.max.x:e.min.x,Mo.y=s.normal.y>0?e.max.y:e.min.y,Mo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Mo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class xp extends mi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new st(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const qo=new R,Yo=new R,_h=new ot,na=new Pa,So=new wi,Kc=new R,vh=new R;class Fu extends zt{constructor(e=new pn,t=new xp){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)qo.fromBufferAttribute(t,s-1),Yo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=qo.distanceTo(Yo);e.setAttribute("lineDistance",new Bt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),So.copy(n.boundingSphere),So.applyMatrix4(s),So.radius+=r,e.ray.intersectsSphere(So)===!1)return;_h.copy(s).invert(),na.copy(e.ray).applyMatrix4(_h);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,h=n.attributes.position;if(d!==null){const f=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let v=f,m=_-1;v<m;v+=c){const p=d.getX(v),S=d.getX(v+1),E=bo(this,e,na,l,p,S,v);E&&t.push(E)}if(this.isLineLoop){const v=d.getX(_-1),m=d.getX(f),p=bo(this,e,na,l,v,m,_-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let v=f,m=_-1;v<m;v+=c){const p=bo(this,e,na,l,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=bo(this,e,na,l,_-1,f,_-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function bo(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(qo.fromBufferAttribute(o,s),Yo.fromBufferAttribute(o,r),t.distanceSqToSegment(qo,Yo,Kc,vh)>n)return;Kc.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Kc);if(!(c<e.near||c>e.far))return{distance:c,point:vh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const yh=new R,xh=new R;class N_ extends Fu{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)yh.fromBufferAttribute(t,s),xh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+yh.distanceTo(xh);e.setAttribute("lineDistance",new Bt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class U_ extends Fu{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Mp extends mi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Mh=new ot,au=new Pa,To=new wi,Eo=new R;class O_ extends zt{constructor(e=new pn,t=new Mp){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),To.copy(n.boundingSphere),To.applyMatrix4(s),To.radius+=r,e.ray.intersectsSphere(To)===!1)return;Mh.copy(s).invert(),au.copy(e.ray).applyMatrix4(Mh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let _=h,v=f;_<v;_++){const m=c.getX(_);Eo.fromBufferAttribute(u,m),Sh(Eo,m,l,s,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let _=h,v=f;_<v;_++)Eo.fromBufferAttribute(u,_),Sh(Eo,_,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Sh(i,e,t,n,s,r,a){const o=au.distanceSqToPoint(i);if(o<t){const l=new R;au.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class lr extends an{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Sp extends an{constructor(e,t,n=Bs,s,r,a,o=Pn,l=Pn,c,d=Ma,u=1){if(d!==Ma&&d!==Sa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:u};super(h,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Lu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class bp extends an{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ku extends pn{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],d=t/2,u=Math.PI/2*e,h=t,f=2*u+h,_=n*2+r,v=s+1,m=new R,p=new R;for(let S=0;S<=_;S++){let E=0,x=0,A=0,C=0;if(S<=n){const b=S/n,M=b*Math.PI/2;x=-d-e*Math.cos(M),A=e*Math.sin(M),C=-e*Math.cos(M),E=b*u}else if(S<=n+r){const b=(S-n)/r;x=-d+b*t,A=e,C=0,E=u+b*h}else{const b=(S-n-r)/n,M=b*Math.PI/2;x=d+e*Math.sin(M),A=e*Math.cos(M),C=e*Math.sin(M),E=u+h+b*u}const P=Math.max(0,Math.min(1,E/f));let O=0;S===0?O=.5/s:S===_&&(O=-.5/s);for(let b=0;b<=s;b++){const M=b/s,D=M*Math.PI*2,F=Math.sin(D),H=Math.cos(D);p.x=-A*H,p.y=x,p.z=A*F,o.push(p.x,p.y,p.z),m.set(-A*H,C,A*F),m.normalize(),l.push(m.x,m.y,m.z),c.push(M+O,P)}if(S>0){const b=(S-1)*v;for(let M=0;M<s;M++){const D=b+M,F=b+M+1,H=S*v+M,K=S*v+M+1;a.push(D,F,H),a.push(F,K,H)}}}this.setIndex(a),this.setAttribute("position",new Bt(o,3)),this.setAttribute("normal",new Bt(l,3)),this.setAttribute("uv",new Bt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ku(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Bu extends pn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],u=[],h=[],f=[];let _=0;const v=[],m=n/2;let p=0;S(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(d),this.setAttribute("position",new Bt(u,3)),this.setAttribute("normal",new Bt(h,3)),this.setAttribute("uv",new Bt(f,2));function S(){const x=new R,A=new R;let C=0;const P=(t-e)/n;for(let O=0;O<=r;O++){const b=[],M=O/r,D=M*(t-e)+e;for(let F=0;F<=s;F++){const H=F/s,K=H*l+o,Z=Math.sin(K),ee=Math.cos(K);A.x=D*Z,A.y=-M*n+m,A.z=D*ee,u.push(A.x,A.y,A.z),x.set(Z,P,ee).normalize(),h.push(x.x,x.y,x.z),f.push(H,1-M),b.push(_++)}v.push(b)}for(let O=0;O<s;O++)for(let b=0;b<r;b++){const M=v[b][O],D=v[b+1][O],F=v[b+1][O+1],H=v[b][O+1];(e>0||b!==0)&&(d.push(M,D,H),C+=3),(t>0||b!==r-1)&&(d.push(D,F,H),C+=3)}c.addGroup(p,C,0),p+=C}function E(x){const A=_,C=new We,P=new R;let O=0;const b=x===!0?e:t,M=x===!0?1:-1;for(let F=1;F<=s;F++)u.push(0,m*M,0),h.push(0,M,0),f.push(.5,.5),_++;const D=_;for(let F=0;F<=s;F++){const K=F/s*l+o,Z=Math.cos(K),ee=Math.sin(K);P.x=b*ee,P.y=m*M,P.z=b*Z,u.push(P.x,P.y,P.z),h.push(0,M,0),C.x=Z*.5+.5,C.y=ee*.5*M+.5,f.push(C.x,C.y),_++}for(let F=0;F<s;F++){const H=A+F,K=D+F;x===!0?d.push(K,K+1,H):d.push(K+1,K,H),O+=3}c.addGroup(p,O,x===!0?1:2),p+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bu(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $i{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const d=n[s],h=n[s+1]-d,f=(a-d)/h;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new We:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new R,s=[],r=[],a=[],o=new R,l=new ot;for(let f=0;f<=e;f++){const _=f/e;s[f]=this.getTangentAt(_,new R)}r[0]=new R,a[0]=new R;let c=Number.MAX_VALUE;const d=Math.abs(s[0].x),u=Math.abs(s[0].y),h=Math.abs(s[0].z);d<=c&&(c=d,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(pt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,_))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(pt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let _=1;_<=e;_++)r[_].applyMatrix4(l.makeRotationAxis(s[_],f*_)),a[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Tp extends $i{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new We){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const d=Math.cos(this.aRotation),u=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*d-f*u+this.aX,c=h*u+f*d+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class F_ extends Tp{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function zu(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,d,u){let h=(a-r)/c-(o-r)/(c+d)+(o-a)/d,f=(o-a)/d-(l-a)/(d+u)+(l-o)/u;h*=d,f*=d,s(a,o,h,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const wo=new R,jc=new zu,Jc=new zu,Zc=new zu;class ou extends $i{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new R){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,d;this.closed||o>0?c=s[(o-1)%r]:(wo.subVectors(s[0],s[1]).add(s[0]),c=wo);const u=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?d=s[(o+2)%r]:(wo.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=wo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(h),f),m=Math.pow(h.distanceToSquared(d),f);v<1e-4&&(v=1),_<1e-4&&(_=v),m<1e-4&&(m=v),jc.initNonuniformCatmullRom(c.x,u.x,h.x,d.x,_,v,m),Jc.initNonuniformCatmullRom(c.y,u.y,h.y,d.y,_,v,m),Zc.initNonuniformCatmullRom(c.z,u.z,h.z,d.z,_,v,m)}else this.curveType==="catmullrom"&&(jc.initCatmullRom(c.x,u.x,h.x,d.x,this.tension),Jc.initCatmullRom(c.y,u.y,h.y,d.y,this.tension),Zc.initCatmullRom(c.z,u.z,h.z,d.z,this.tension));return n.set(jc.calc(l),Jc.calc(l),Zc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new R().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function bh(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function k_(i,e){const t=1-i;return t*t*e}function B_(i,e){return 2*(1-i)*i*e}function z_(i,e){return i*i*e}function ha(i,e,t,n){return k_(i,e)+B_(i,t)+z_(i,n)}function H_(i,e){const t=1-i;return t*t*t*e}function V_(i,e){const t=1-i;return 3*t*t*i*e}function G_(i,e){return 3*(1-i)*i*i*e}function W_(i,e){return i*i*i*e}function fa(i,e,t,n,s){return H_(i,e)+V_(i,t)+G_(i,n)+W_(i,s)}class $_ extends $i{constructor(e=new We,t=new We,n=new We,s=new We){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new We){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(fa(e,s.x,r.x,a.x,o.x),fa(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class X_ extends $i{constructor(e=new R,t=new R,n=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new R){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(fa(e,s.x,r.x,a.x,o.x),fa(e,s.y,r.y,a.y,o.y),fa(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class q_ extends $i{constructor(e=new We,t=new We){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new We){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new We){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Y_ extends $i{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class K_ extends $i{constructor(e=new We,t=new We,n=new We){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new We){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ha(e,s.x,r.x,a.x),ha(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ep extends $i{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ha(e,s.x,r.x,a.x),ha(e,s.y,r.y,a.y),ha(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class j_ extends $i{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new We){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],d=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(bh(o,l.x,c.x,d.x,u.x),bh(o,l.y,c.y,d.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new We().fromArray(s))}return this}}var J_=Object.freeze({__proto__:null,ArcCurve:F_,CatmullRomCurve3:ou,CubicBezierCurve:$_,CubicBezierCurve3:X_,EllipseCurve:Tp,LineCurve:q_,LineCurve3:Y_,QuadraticBezierCurve:K_,QuadraticBezierCurve3:Ep,SplineCurve:j_});class La extends pn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,u=e/o,h=t/l,f=[],_=[],v=[],m=[];for(let p=0;p<d;p++){const S=p*h-a;for(let E=0;E<c;E++){const x=E*u-r;_.push(x,-S,0),v.push(0,0,1),m.push(E/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<o;S++){const E=S+c*p,x=S+c*(p+1),A=S+1+c*(p+1),C=S+1+c*p;f.push(E,x,C),f.push(x,A,C)}this.setIndex(f),this.setAttribute("position",new Bt(_,3)),this.setAttribute("normal",new Bt(v,3)),this.setAttribute("uv",new Bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new La(e.width,e.height,e.widthSegments,e.heightSegments)}}class Hu extends pn{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],d=[];let u=e;const h=(t-e)/s,f=new R,_=new We;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),_.x=(f.x/t+1)/2,_.y=(f.y/t+1)/2,d.push(_.x,_.y)}u+=h}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const S=p+m,E=S,x=S+n+1,A=S+n+2,C=S+1;o.push(E,x,C),o.push(x,A,C)}}this.setIndex(o),this.setAttribute("position",new Bt(l,3)),this.setAttribute("normal",new Bt(c,3)),this.setAttribute("uv",new Bt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hu(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class pa extends pn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],u=new R,h=new R,f=[],_=[],v=[],m=[];for(let p=0;p<=n;p++){const S=[],E=p/n;let x=0;p===0&&a===0?x=.5/t:p===n&&l===Math.PI&&(x=-.5/t);for(let A=0;A<=t;A++){const C=A/t;u.x=-e*Math.cos(s+C*r)*Math.sin(a+E*o),u.y=e*Math.cos(a+E*o),u.z=e*Math.sin(s+C*r)*Math.sin(a+E*o),_.push(u.x,u.y,u.z),h.copy(u).normalize(),v.push(h.x,h.y,h.z),m.push(C+x,1-E),S.push(c++)}d.push(S)}for(let p=0;p<n;p++)for(let S=0;S<t;S++){const E=d[p][S+1],x=d[p][S],A=d[p+1][S],C=d[p+1][S+1];(p!==0||a>0)&&f.push(E,x,C),(p!==n-1||l<Math.PI)&&f.push(x,A,C)}this.setIndex(f),this.setAttribute("position",new Bt(_,3)),this.setAttribute("normal",new Bt(v,3)),this.setAttribute("uv",new Bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pa(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Vu extends pn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],d=new R,u=new R,h=new R;for(let f=0;f<=n;f++)for(let _=0;_<=s;_++){const v=_/s*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),d.x=e*Math.cos(v),d.y=e*Math.sin(v),h.subVectors(u,d).normalize(),l.push(h.x,h.y,h.z),c.push(_/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let _=1;_<=s;_++){const v=(s+1)*f+_-1,m=(s+1)*(f-1)+_-1,p=(s+1)*(f-1)+_,S=(s+1)*f+_;a.push(v,m,S),a.push(m,p,S)}this.setIndex(a),this.setAttribute("position",new Bt(o,3)),this.setAttribute("normal",new Bt(l,3)),this.setAttribute("uv",new Bt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vu(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ko extends pn{constructor(e=new Ep(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new R,l=new R,c=new We;let d=new R;const u=[],h=[],f=[],_=[];v(),this.setIndex(_),this.setAttribute("position",new Bt(u,3)),this.setAttribute("normal",new Bt(h,3)),this.setAttribute("uv",new Bt(f,2));function v(){for(let E=0;E<t;E++)m(E);m(r===!1?t:0),S(),p()}function m(E){d=e.getPointAt(E/t,d);const x=a.normals[E],A=a.binormals[E];for(let C=0;C<=s;C++){const P=C/s*Math.PI*2,O=Math.sin(P),b=-Math.cos(P);l.x=b*x.x+O*A.x,l.y=b*x.y+O*A.y,l.z=b*x.z+O*A.z,l.normalize(),h.push(l.x,l.y,l.z),o.x=d.x+n*l.x,o.y=d.y+n*l.y,o.z=d.z+n*l.z,u.push(o.x,o.y,o.z)}}function p(){for(let E=1;E<=t;E++)for(let x=1;x<=s;x++){const A=(s+1)*(E-1)+(x-1),C=(s+1)*E+(x-1),P=(s+1)*E+x,O=(s+1)*(E-1)+x;_.push(A,C,O),_.push(C,P,O)}}function S(){for(let E=0;E<=t;E++)for(let x=0;x<=s;x++)c.x=E/t,c.y=x/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Ko(new J_[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class rn extends mi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new st(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sp,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ai extends rn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new We(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return pt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new st(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new st(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new st(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Z_ extends mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=A0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Q_ extends mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Ao(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ev(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function tv(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Th(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function wp(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class Da{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class nv extends Da{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:kd,endingEnd:kd}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Bd:r=e,o=2*t-n;break;case zd:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Bd:a=e,l=2*n-t;break;case zd:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}const c=(n-t)*.5,d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this._offsetPrev,u=this._offsetNext,h=this._weightPrev,f=this._weightNext,_=(n-t)/(s-t),v=_*_,m=v*_,p=-h*m+2*h*v-h*_,S=(1+h)*m+(-1.5-2*h)*v+(-.5+h)*_+1,E=(-1-f)*m+(1.5+f)*v+.5*_,x=f*m-f*v;for(let A=0;A!==o;++A)r[A]=p*a[d+A]+S*a[c+A]+E*a[l+A]+x*a[u+A];return r}}class iv extends Da{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=(n-t)/(s-t),u=1-d;for(let h=0;h!==o;++h)r[h]=a[c+h]*u+a[l+h]*d;return r}}class sv extends Da{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class vi{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ao(t,this.TimeBufferType),this.values=Ao(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ao(e.times,Array),values:Ao(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new sv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new iv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new nv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ba:t=this.InterpolantFactoryMethodDiscrete;break;case Ta:t=this.InterpolantFactoryMethodLinear;break;case bc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ba;case this.InterpolantFactoryMethodLinear:return Ta;case this.InterpolantFactoryMethodSmooth:return bc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&ev(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===bc,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],d=e[o+1];if(c!==d&&(o!==1||c!==e[0]))if(s)l=!0;else{const u=o*n,h=u-n,f=u+n;for(let _=0;_!==n;++_){const v=t[u+_];if(v!==t[h+_]||v!==t[f+_]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}vi.prototype.ValueTypeName="";vi.prototype.TimeBufferType=Float32Array;vi.prototype.ValueBufferType=Float32Array;vi.prototype.DefaultInterpolation=Ta;class Pr extends vi{constructor(e,t,n){super(e,t,n)}}Pr.prototype.ValueTypeName="bool";Pr.prototype.ValueBufferType=Array;Pr.prototype.DefaultInterpolation=ba;Pr.prototype.InterpolantFactoryMethodLinear=void 0;Pr.prototype.InterpolantFactoryMethodSmooth=void 0;class Ap extends vi{constructor(e,t,n,s){super(e,t,n,s)}}Ap.prototype.ValueTypeName="color";class Ar extends vi{constructor(e,t,n,s){super(e,t,n,s)}}Ar.prototype.ValueTypeName="number";class rv extends Da{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t);let c=e*o;for(let d=c+o;c!==d;c+=4)it.slerpFlat(r,0,a,c-o,a,c,l);return r}}class Rr extends vi{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new rv(this.times,this.values,this.getValueSize(),e)}}Rr.prototype.ValueTypeName="quaternion";Rr.prototype.InterpolantFactoryMethodSmooth=void 0;class Lr extends vi{constructor(e,t,n){super(e,t,n)}}Lr.prototype.ValueTypeName="string";Lr.prototype.ValueBufferType=Array;Lr.prototype.DefaultInterpolation=ba;Lr.prototype.InterpolantFactoryMethodLinear=void 0;Lr.prototype.InterpolantFactoryMethodSmooth=void 0;class Cr extends vi{constructor(e,t,n,s){super(e,t,n,s)}}Cr.prototype.ValueTypeName="vector";class av{constructor(e="",t=-1,n=[],s=E0){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=pi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(cv(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(vi.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const d=tv(l);l=Th(l,1,d),c=Th(c,1,d),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Ar(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],d=c.name.match(r);if(d&&d.length>1){const u=d[1];let h=s[u];h||(s[u]=h=[]),h.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,h,f,_,v){if(f.length!==0){const m=[],p=[];wp(f,m,p,_),m.length!==0&&v.push(new u(h,m,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const h=c[u].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const f={};let _;for(_=0;_<h.length;_++)if(h[_].morphTargets)for(let v=0;v<h[_].morphTargets.length;v++)f[h[_].morphTargets[v]]=-1;for(const v in f){const m=[],p=[];for(let S=0;S!==h[_].morphTargets.length;++S){const E=h[_];m.push(E.time),p.push(E.morphTarget===v?1:0)}s.push(new Ar(".morphTargetInfluence["+v+"]",m,p))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(Cr,f+".position",h,"pos",s),n(Rr,f+".quaternion",h,"rot",s),n(Cr,f+".scale",h,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function ov(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ar;case"vector":case"vector2":case"vector3":case"vector4":return Cr;case"color":return Ap;case"quaternion":return Rr;case"bool":case"boolean":return Pr;case"string":return Lr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function cv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=ov(i.type);if(i.times===void 0){const t=[],n=[];wp(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Hi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class lv{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){const u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=c.length;u<h;u+=2){const f=c[u],_=c[u+1];if(f.global&&(f.lastIndex=0),f.test(d))return _}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const uv=new lv;class Dr{constructor(e){this.manager=e!==void 0?e:uv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Dr.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ui={};class dv extends Error{constructor(e,t){super(e),this.response=t}}class Rp extends Dr{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Hi.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Ui[e]!==void 0){Ui[e].push({onLoad:t,onProgress:n,onError:s});return}Ui[e]=[],Ui[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const d=Ui[e],u=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,_=f!==0;let v=0;const m=new ReadableStream({start(p){S();function S(){u.read().then(({done:E,value:x})=>{if(E)p.close();else{v+=x.byteLength;const A=new ProgressEvent("progress",{lengthComputable:_,loaded:v,total:f});for(let C=0,P=d.length;C<P;C++){const O=d[C];O.onProgress&&O.onProgress(A)}p.enqueue(x),S()}},E=>{p.error(E)})}}});return new Response(m)}else throw new dv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(d=>new DOMParser().parseFromString(d,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),h=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(_=>f.decode(_))}}}).then(c=>{Hi.add(`file:${e}`,c);const d=Ui[e];delete Ui[e];for(let u=0,h=d.length;u<h;u++){const f=d[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const d=Ui[e];if(d===void 0)throw this.manager.itemError(e),c;delete Ui[e];for(let u=0,h=d.length;u<h;u++){const f=d[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const ur=new WeakMap;class hv extends Dr{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Hi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=ur.get(a);u===void 0&&(u=[],ur.set(a,u)),u.push({onLoad:t,onError:s})}return a}const o=Ea("img");function l(){d(),t&&t(this);const u=ur.get(this)||[];for(let h=0;h<u.length;h++){const f=u[h];f.onLoad&&f.onLoad(this)}ur.delete(this),r.manager.itemEnd(e)}function c(u){d(),s&&s(u),Hi.remove(`image:${e}`);const h=ur.get(this)||[];for(let f=0;f<h.length;f++){const _=h[f];_.onError&&_.onError(u)}ur.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Hi.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class fv extends Dr{constructor(e){super(e)}load(e,t,n,s){const r=new an,a=new hv(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class ac extends zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new st(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class pv extends ac{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new st(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Qc=new ot,Eh=new R,wh=new R;class Gu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.mapType=Ei,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ou,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Eh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Eh),wh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wh),t.updateMatrixWorld(),Qc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Qc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class mv extends Gu{constructor(){super(new Cn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Er*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class gv extends ac{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new mv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Ah=new ot,ia=new R,el=new R;class _v extends Gu{constructor(){super(new Cn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new We(4,2),this._viewportCount=6,this._viewports=[new Ct(2,1,1,1),new Ct(0,1,1,1),new Ct(3,1,1,1),new Ct(1,1,1,1),new Ct(3,0,1,1),new Ct(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ia.setFromMatrixPosition(e.matrixWorld),n.position.copy(ia),el.copy(n.position),el.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(el),n.updateMatrixWorld(),s.makeTranslation(-ia.x,-ia.y,-ia.z),Ah.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ah,n.coordinateSystem,n.reversedDepth)}}class vv extends ac{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new _v}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Wu extends hp{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class yv extends Gu{constructor(){super(new Wu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class cu extends ac{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new yv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ma{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const tl=new WeakMap;class xv extends Dr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Hi.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{if(tl.has(a)===!0)s&&s(tl.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Hi.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),tl.set(l,c),Hi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Hi.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Mv extends Cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const $u="\\[\\]\\.:\\/",Sv=new RegExp("["+$u+"]","g"),Xu="[^"+$u+"]",bv="[^"+$u.replace("\\.","")+"]",Tv=/((?:WC+[\/:])*)/.source.replace("WC",Xu),Ev=/(WCOD+)?/.source.replace("WCOD",bv),wv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xu),Av=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xu),Rv=new RegExp("^"+Tv+Ev+wv+Av+"$"),Cv=["material","materials","bones","map"];class Iv{constructor(e,t,n){const s=n||Lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Lt{constructor(e,t,n){this.path=t,this.parsedPath=n||Lt.parseTrackName(t),this.node=Lt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Lt.Composite(e,t,n):new Lt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Sv,"")}static parseTrackName(e){const t=Rv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Cv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=Lt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Lt.Composite=Iv;Lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Lt.prototype.GetterByBindingType=[Lt.prototype._getValue_direct,Lt.prototype._getValue_array,Lt.prototype._getValue_arrayElement,Lt.prototype._getValue_toArray];Lt.prototype.SetterByBindingTypeAndVersioning=[[Lt.prototype._setValue_direct,Lt.prototype._setValue_direct_setNeedsUpdate,Lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_array,Lt.prototype._setValue_array_setNeedsUpdate,Lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_arrayElement,Lt.prototype._setValue_arrayElement_setNeedsUpdate,Lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_fromArray,Lt.prototype._setValue_fromArray_setNeedsUpdate,Lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Rh=new ot;class Pv{constructor(e,t,n=0,s=1/0){this.ray=new Pa(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Du,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Rh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Rh),this}intersectObject(e,t=!0,n=[]){return lu(e,this,n,t),n.sort(Ch),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)lu(e[s],this,n,t);return n.sort(Ch),n}}function Ch(i,e){return i.distance-e.distance}function lu(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)lu(r[a],e,t,!0)}}function Ih(i,e,t,n){const s=Lv(n);switch(t){case ep:return i*e;case Au:return i*e/s.components*s.byteLength;case Ru:return i*e/s.components*s.byteLength;case np:return i*e*2/s.components*s.byteLength;case Cu:return i*e*2/s.components*s.byteLength;case tp:return i*e*3/s.components*s.byteLength;case Zn:return i*e*4/s.components*s.byteLength;case Iu:return i*e*4/s.components*s.byteLength;case No:case Uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Oo:case Fo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Il:case Ll:return Math.max(i,16)*Math.max(e,8)/4;case Cl:case Pl:return Math.max(i,8)*Math.max(e,8)/2;case Dl:case Nl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ul:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ol:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Fl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case kl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Bl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case zl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Hl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Vl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Gl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Wl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case $l:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Xl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ql:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Yl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Kl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case jl:case Jl:case Zl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ql:case eu:return Math.ceil(i/4)*Math.ceil(e/4)*8;case tu:case nu:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Lv(i){switch(i){case Ei:case jf:return{byteLength:1,components:1};case ya:case Jf:case Ia:return{byteLength:2,components:1};case Eu:case wu:return{byteLength:2,components:4};case Bs:case Tu:case di:return{byteLength:4,components:1};case Zf:case Qf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bu);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Cp(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Dv(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,d);else{u.sort((f,_)=>f.start-_.start);let h=0;for(let f=1;f<u.length;f++){const _=u[h],v=u[f];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++h,u[h]=v)}u.length=h+1;for(let f=0,_=u.length;f<_;f++){const v=u[f];i.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Nv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Uv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ov=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Gv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$v=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,qv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Yv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Kv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,jv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ey=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ty=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ny=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,iy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,sy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ry=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ay=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,oy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ly=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uy="gl_FragColor = linearToOutputTexel( gl_FragColor );",dy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,fy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,py=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,my=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_y=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,My=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Sy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,by=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ty=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ey=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,wy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ay=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ry=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Iy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Py=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ly=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Dy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ny=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Uy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Oy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Fy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ky=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,By=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Gy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$y=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ky=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,jy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Zy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ex=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ix=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ax=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ox=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,lx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ux=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,px=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,gx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_x=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,yx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Mx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,bx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ex=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ax=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Rx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Cx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Lx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Dx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ox=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Hx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Vx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$x=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Yx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Zx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,eM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,cM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,dM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,hM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,dt={alphahash_fragment:Nv,alphahash_pars_fragment:Uv,alphamap_fragment:Ov,alphamap_pars_fragment:Fv,alphatest_fragment:kv,alphatest_pars_fragment:Bv,aomap_fragment:zv,aomap_pars_fragment:Hv,batching_pars_vertex:Vv,batching_vertex:Gv,begin_vertex:Wv,beginnormal_vertex:$v,bsdfs:Xv,iridescence_fragment:qv,bumpmap_pars_fragment:Yv,clipping_planes_fragment:Kv,clipping_planes_pars_fragment:jv,clipping_planes_pars_vertex:Jv,clipping_planes_vertex:Zv,color_fragment:Qv,color_pars_fragment:ey,color_pars_vertex:ty,color_vertex:ny,common:iy,cube_uv_reflection_fragment:sy,defaultnormal_vertex:ry,displacementmap_pars_vertex:ay,displacementmap_vertex:oy,emissivemap_fragment:cy,emissivemap_pars_fragment:ly,colorspace_fragment:uy,colorspace_pars_fragment:dy,envmap_fragment:hy,envmap_common_pars_fragment:fy,envmap_pars_fragment:py,envmap_pars_vertex:my,envmap_physical_pars_fragment:wy,envmap_vertex:gy,fog_vertex:_y,fog_pars_vertex:vy,fog_fragment:yy,fog_pars_fragment:xy,gradientmap_pars_fragment:My,lightmap_pars_fragment:Sy,lights_lambert_fragment:by,lights_lambert_pars_fragment:Ty,lights_pars_begin:Ey,lights_toon_fragment:Ay,lights_toon_pars_fragment:Ry,lights_phong_fragment:Cy,lights_phong_pars_fragment:Iy,lights_physical_fragment:Py,lights_physical_pars_fragment:Ly,lights_fragment_begin:Dy,lights_fragment_maps:Ny,lights_fragment_end:Uy,logdepthbuf_fragment:Oy,logdepthbuf_pars_fragment:Fy,logdepthbuf_pars_vertex:ky,logdepthbuf_vertex:By,map_fragment:zy,map_pars_fragment:Hy,map_particle_fragment:Vy,map_particle_pars_fragment:Gy,metalnessmap_fragment:Wy,metalnessmap_pars_fragment:$y,morphinstance_vertex:Xy,morphcolor_vertex:qy,morphnormal_vertex:Yy,morphtarget_pars_vertex:Ky,morphtarget_vertex:jy,normal_fragment_begin:Jy,normal_fragment_maps:Zy,normal_pars_fragment:Qy,normal_pars_vertex:ex,normal_vertex:tx,normalmap_pars_fragment:nx,clearcoat_normal_fragment_begin:ix,clearcoat_normal_fragment_maps:sx,clearcoat_pars_fragment:rx,iridescence_pars_fragment:ax,opaque_fragment:ox,packing:cx,premultiplied_alpha_fragment:lx,project_vertex:ux,dithering_fragment:dx,dithering_pars_fragment:hx,roughnessmap_fragment:fx,roughnessmap_pars_fragment:px,shadowmap_pars_fragment:mx,shadowmap_pars_vertex:gx,shadowmap_vertex:_x,shadowmask_pars_fragment:vx,skinbase_vertex:yx,skinning_pars_vertex:xx,skinning_vertex:Mx,skinnormal_vertex:Sx,specularmap_fragment:bx,specularmap_pars_fragment:Tx,tonemapping_fragment:Ex,tonemapping_pars_fragment:wx,transmission_fragment:Ax,transmission_pars_fragment:Rx,uv_pars_fragment:Cx,uv_pars_vertex:Ix,uv_vertex:Px,worldpos_vertex:Lx,background_vert:Dx,background_frag:Nx,backgroundCube_vert:Ux,backgroundCube_frag:Ox,cube_vert:Fx,cube_frag:kx,depth_vert:Bx,depth_frag:zx,distanceRGBA_vert:Hx,distanceRGBA_frag:Vx,equirect_vert:Gx,equirect_frag:Wx,linedashed_vert:$x,linedashed_frag:Xx,meshbasic_vert:qx,meshbasic_frag:Yx,meshlambert_vert:Kx,meshlambert_frag:jx,meshmatcap_vert:Jx,meshmatcap_frag:Zx,meshnormal_vert:Qx,meshnormal_frag:eM,meshphong_vert:tM,meshphong_frag:nM,meshphysical_vert:iM,meshphysical_frag:sM,meshtoon_vert:rM,meshtoon_frag:aM,points_vert:oM,points_frag:cM,shadow_vert:lM,shadow_frag:uM,sprite_vert:dM,sprite_frag:hM},Ue={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ut}},envmap:{envMap:{value:null},envMapRotation:{value:new ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ut},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0},uvTransform:{value:new ut}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}}},bi={basic:{uniforms:Rn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.fog]),vertexShader:dt.meshbasic_vert,fragmentShader:dt.meshbasic_frag},lambert:{uniforms:Rn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new st(0)}}]),vertexShader:dt.meshlambert_vert,fragmentShader:dt.meshlambert_frag},phong:{uniforms:Rn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30}}]),vertexShader:dt.meshphong_vert,fragmentShader:dt.meshphong_frag},standard:{uniforms:Rn([Ue.common,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.roughnessmap,Ue.metalnessmap,Ue.fog,Ue.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag},toon:{uniforms:Rn([Ue.common,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.gradientmap,Ue.fog,Ue.lights,{emissive:{value:new st(0)}}]),vertexShader:dt.meshtoon_vert,fragmentShader:dt.meshtoon_frag},matcap:{uniforms:Rn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,{matcap:{value:null}}]),vertexShader:dt.meshmatcap_vert,fragmentShader:dt.meshmatcap_frag},points:{uniforms:Rn([Ue.points,Ue.fog]),vertexShader:dt.points_vert,fragmentShader:dt.points_frag},dashed:{uniforms:Rn([Ue.common,Ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:dt.linedashed_vert,fragmentShader:dt.linedashed_frag},depth:{uniforms:Rn([Ue.common,Ue.displacementmap]),vertexShader:dt.depth_vert,fragmentShader:dt.depth_frag},normal:{uniforms:Rn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,{opacity:{value:1}}]),vertexShader:dt.meshnormal_vert,fragmentShader:dt.meshnormal_frag},sprite:{uniforms:Rn([Ue.sprite,Ue.fog]),vertexShader:dt.sprite_vert,fragmentShader:dt.sprite_frag},background:{uniforms:{uvTransform:{value:new ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:dt.background_vert,fragmentShader:dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ut}},vertexShader:dt.backgroundCube_vert,fragmentShader:dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:dt.cube_vert,fragmentShader:dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:dt.equirect_vert,fragmentShader:dt.equirect_frag},distanceRGBA:{uniforms:Rn([Ue.common,Ue.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:dt.distanceRGBA_vert,fragmentShader:dt.distanceRGBA_frag},shadow:{uniforms:Rn([Ue.lights,Ue.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:dt.shadow_vert,fragmentShader:dt.shadow_frag}};bi.physical={uniforms:Rn([bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ut},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ut},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ut},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ut},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ut},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ut}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag};const Ro={r:0,b:0,g:0},Cs=new Kt,fM=new ot;function pM(i,e,t,n,s,r,a){const o=new st(0);let l=r===!0?0:1,c,d,u=null,h=0,f=null;function _(E){let x=E.isScene===!0?E.background:null;return x&&x.isTexture&&(x=(E.backgroundBlurriness>0?t:e).get(x)),x}function v(E){let x=!1;const A=_(E);A===null?p(o,l):A&&A.isColor&&(p(A,1),x=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,x){const A=_(x);A&&(A.isCubeTexture||A.mapping===rc)?(d===void 0&&(d=new It(new Yn(1,1,1),new _s({name:"BackgroundCubeMaterial",uniforms:wr(bi.backgroundCube.uniforms),vertexShader:bi.backgroundCube.vertexShader,fragmentShader:bi.backgroundCube.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(C,P,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Cs.copy(x.backgroundRotation),Cs.x*=-1,Cs.y*=-1,Cs.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Cs.y*=-1,Cs.z*=-1),d.material.uniforms.envMap.value=A,d.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(fM.makeRotationFromEuler(Cs)),d.material.toneMapped=bt.getTransfer(A.colorSpace)!==Ot,(u!==A||h!==A.version||f!==i.toneMapping)&&(d.material.needsUpdate=!0,u=A,h=A.version,f=i.toneMapping),d.layers.enableAll(),E.unshift(d,d.geometry,d.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new It(new La(2,2),new _s({name:"BackgroundMaterial",uniforms:wr(bi.background.uniforms),vertexShader:bi.background.vertexShader,fragmentShader:bi.background.fragmentShader,side:Wi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=bt.getTransfer(A.colorSpace)!==Ot,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||h!==A.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=A,h=A.version,f=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,x){E.getRGB(Ro,dp(i)),n.buffers.color.setClear(Ro.r,Ro.g,Ro.b,x,a)}function S(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,x=1){o.set(E),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,p(o,l)},render:v,addToRenderList:m,dispose:S}}function mM(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(M,D,F,H,K){let Z=!1;const ee=u(H,F,D);r!==ee&&(r=ee,c(r.object)),Z=f(M,H,F,K),Z&&_(M,H,F,K),K!==null&&e.update(K,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,x(M,D,F,H),K!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function d(M){return i.deleteVertexArray(M)}function u(M,D,F){const H=F.wireframe===!0;let K=n[M.id];K===void 0&&(K={},n[M.id]=K);let Z=K[D.id];Z===void 0&&(Z={},K[D.id]=Z);let ee=Z[H];return ee===void 0&&(ee=h(l()),Z[H]=ee),ee}function h(M){const D=[],F=[],H=[];for(let K=0;K<t;K++)D[K]=0,F[K]=0,H[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:F,attributeDivisors:H,object:M,attributes:{},index:null}}function f(M,D,F,H){const K=r.attributes,Z=D.attributes;let ee=0;const ie=F.getAttributes();for(const q in ie)if(ie[q].location>=0){const ge=K[q];let $e=Z[q];if($e===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&($e=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&($e=M.instanceColor)),ge===void 0||ge.attribute!==$e||$e&&ge.data!==$e.data)return!0;ee++}return r.attributesNum!==ee||r.index!==H}function _(M,D,F,H){const K={},Z=D.attributes;let ee=0;const ie=F.getAttributes();for(const q in ie)if(ie[q].location>=0){let ge=Z[q];ge===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(ge=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(ge=M.instanceColor));const $e={};$e.attribute=ge,ge&&ge.data&&($e.data=ge.data),K[q]=$e,ee++}r.attributes=K,r.attributesNum=ee,r.index=H}function v(){const M=r.newAttributes;for(let D=0,F=M.length;D<F;D++)M[D]=0}function m(M){p(M,0)}function p(M,D){const F=r.newAttributes,H=r.enabledAttributes,K=r.attributeDivisors;F[M]=1,H[M]===0&&(i.enableVertexAttribArray(M),H[M]=1),K[M]!==D&&(i.vertexAttribDivisor(M,D),K[M]=D)}function S(){const M=r.newAttributes,D=r.enabledAttributes;for(let F=0,H=D.length;F<H;F++)D[F]!==M[F]&&(i.disableVertexAttribArray(F),D[F]=0)}function E(M,D,F,H,K,Z,ee){ee===!0?i.vertexAttribIPointer(M,D,F,K,Z):i.vertexAttribPointer(M,D,F,H,K,Z)}function x(M,D,F,H){v();const K=H.attributes,Z=F.getAttributes(),ee=D.defaultAttributeValues;for(const ie in Z){const q=Z[ie];if(q.location>=0){let pe=K[ie];if(pe===void 0&&(ie==="instanceMatrix"&&M.instanceMatrix&&(pe=M.instanceMatrix),ie==="instanceColor"&&M.instanceColor&&(pe=M.instanceColor)),pe!==void 0){const ge=pe.normalized,$e=pe.itemSize,rt=e.get(pe);if(rt===void 0)continue;const _t=rt.buffer,Et=rt.type,ht=rt.bytesPerElement,se=Et===i.INT||Et===i.UNSIGNED_INT||pe.gpuType===Tu;if(pe.isInterleavedBufferAttribute){const j=pe.data,_e=j.stride,ye=pe.offset;if(j.isInstancedInterleavedBuffer){for(let Oe=0;Oe<q.locationSize;Oe++)p(q.location+Oe,j.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Oe=0;Oe<q.locationSize;Oe++)m(q.location+Oe);i.bindBuffer(i.ARRAY_BUFFER,_t);for(let Oe=0;Oe<q.locationSize;Oe++)E(q.location+Oe,$e/q.locationSize,Et,ge,_e*ht,(ye+$e/q.locationSize*Oe)*ht,se)}else{if(pe.isInstancedBufferAttribute){for(let j=0;j<q.locationSize;j++)p(q.location+j,pe.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let j=0;j<q.locationSize;j++)m(q.location+j);i.bindBuffer(i.ARRAY_BUFFER,_t);for(let j=0;j<q.locationSize;j++)E(q.location+j,$e/q.locationSize,Et,ge,$e*ht,$e/q.locationSize*j*ht,se)}}else if(ee!==void 0){const ge=ee[ie];if(ge!==void 0)switch(ge.length){case 2:i.vertexAttrib2fv(q.location,ge);break;case 3:i.vertexAttrib3fv(q.location,ge);break;case 4:i.vertexAttrib4fv(q.location,ge);break;default:i.vertexAttrib1fv(q.location,ge)}}}}S()}function A(){O();for(const M in n){const D=n[M];for(const F in D){const H=D[F];for(const K in H)d(H[K].object),delete H[K];delete D[F]}delete n[M]}}function C(M){if(n[M.id]===void 0)return;const D=n[M.id];for(const F in D){const H=D[F];for(const K in H)d(H[K].object),delete H[K];delete D[F]}delete n[M.id]}function P(M){for(const D in n){const F=n[D];if(F[M.id]===void 0)continue;const H=F[M.id];for(const K in H)d(H[K].object),delete H[K];delete F[M.id]}}function O(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:O,resetDefaultState:b,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:m,disableUnusedAttributes:S}}function gM(i,e,t){let n;function s(c){n=c}function r(c,d){i.drawArrays(n,c,d),t.update(d,n,1)}function a(c,d,u){u!==0&&(i.drawArraysInstanced(n,c,d,u),t.update(d,n,u))}function o(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,u);let f=0;for(let _=0;_<u;_++)f+=d[_];t.update(f,n,1)}function l(c,d,u,h){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<c.length;_++)a(c[_],d[_],h[_]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,d,0,h,0,u);let _=0;for(let v=0;v<u;v++)_+=d[v]*h[v];t.update(_,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function _M(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==Zn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const O=P===Ia&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Ei&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==di&&!O)}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=_>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:x,vertexTextures:A,maxSamples:C}}function vM(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new us,o=new ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const f=u.length!==0||h||n!==0||s;return s=h,n=u.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,f){const _=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||_===null||_.length===0||r&&!m)r?d(null):c();else{const S=r?0:n,E=S*4;let x=p.clippingState||null;l.value=x,x=d(_,h,E,f);for(let A=0;A!==E;++A)x[A]=t[A];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,h,f,_){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,_!==!0||m===null){const p=f+v*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,x=f;E!==v;++E,x+=4)a.copy(u[E]).applyMatrix4(S,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function yM(i){let e=new WeakMap;function t(a,o){return o===Al?a.mapping=Sr:o===Rl&&(a.mapping=br),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Al||o===Rl)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new b_(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const fr=4,Ph=[.125,.215,.35,.446,.526,.582],Us=20,nl=new Wu,Lh=new st;let il=null,sl=0,rl=0,al=!1;const Ds=(1+Math.sqrt(5))/2,dr=1/Ds,Dh=[new R(-Ds,dr,0),new R(Ds,dr,0),new R(-dr,0,Ds),new R(dr,0,Ds),new R(0,Ds,-dr),new R(0,Ds,dr),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],xM=new R;class Nh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=xM}=r;il=this._renderer.getRenderTarget(),sl=this._renderer.getActiveCubeFace(),rl=this._renderer.getActiveMipmapLevel(),al=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(il,sl,rl),this._renderer.xr.enabled=al,e.scissorTest=!1,Co(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Sr||e.mapping===br?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),il=this._renderer.getRenderTarget(),sl=this._renderer.getActiveCubeFace(),rl=this._renderer.getActiveMipmapLevel(),al=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Hn,minFilter:Hn,generateMipmaps:!1,type:Ia,format:Zn,colorSpace:Dn,depthBuffer:!1},s=Uh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=MM(r)),this._blurMaterial=SM(r,e,t)}return s}_compileMaterial(e){const t=new It(this._lodPlanes[0],e);this._renderer.compile(t,nl)}_sceneToCubeUV(e,t,n,s,r){const l=new Cn(90,1,t,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Lh),u.toneMapping=ps,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const v=new Jn({name:"PMREM.Background",side:Fn,depthWrite:!1,depthTest:!1}),m=new It(new Yn,v);let p=!1;const S=e.background;S?S.isColor&&(v.color.copy(S),e.background=null,p=!0):(v.color.copy(Lh),p=!0);for(let E=0;E<6;E++){const x=E%3;x===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[E],r.y,r.z)):x===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[E]));const A=this._cubeSize;Co(s,x*A,E>2?A:0,A,A),u.setRenderTarget(s),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Sr||e.mapping===br;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new It(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Co(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,nl)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Dh[(s-r-1)%Dh.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new It(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Us-1),v=r/_,m=isFinite(r)?1+Math.floor(d*v):Us;m>Us&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Us}`);const p=[];let S=0;for(let P=0;P<Us;++P){const O=P/v,b=Math.exp(-O*O/2);p.push(b),P===0?S+=b:P<m&&(S+=2*b)}for(let P=0;P<p.length;P++)p[P]=p[P]/S;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:E}=this;h.dTheta.value=_,h.mipInt.value=E-n;const x=this._sizeLods[s],A=3*x*(s>E-fr?s-E+fr:0),C=4*(this._cubeSize-x);Co(t,A,C,3*x,2*x),l.setRenderTarget(t),l.render(u,nl)}}function MM(i){const e=[],t=[],n=[];let s=i;const r=i-fr+1+Ph.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-fr?l=Ph[a-i+fr-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],f=6,_=6,v=3,m=2,p=1,S=new Float32Array(v*_*f),E=new Float32Array(m*_*f),x=new Float32Array(p*_*f);for(let C=0;C<f;C++){const P=C%3*2/3-1,O=C>2?0:-1,b=[P,O,0,P+2/3,O,0,P+2/3,O+1,0,P,O,0,P+2/3,O+1,0,P,O+1,0];S.set(b,v*_*C),E.set(h,m*_*C);const M=[C,C,C,C,C,C];x.set(M,p*_*C)}const A=new pn;A.setAttribute("position",new Ln(S,v)),A.setAttribute("uv",new Ln(E,m)),A.setAttribute("faceIndex",new Ln(x,p)),e.push(A),s>fr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Uh(i,e,t){const n=new zs(i,e,t);return n.texture.mapping=rc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Co(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function SM(i,e,t){const n=new Float32Array(Us),s=new R(0,1,0);return new _s({name:"SphericalGaussianBlur",defines:{n:Us,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:qu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:fs,depthTest:!1,depthWrite:!1})}function Oh(){return new _s({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:fs,depthTest:!1,depthWrite:!1})}function Fh(){return new _s({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fs,depthTest:!1,depthWrite:!1})}function qu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function bM(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Al||l===Rl,d=l===Sr||l===br;if(c||d){let u=e.get(o);const h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Nh(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||d&&f&&s(f)?(t===null&&(t=new Nh(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function TM(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&wa("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function EM(i,e,t,n){const s={},r=new WeakMap;function a(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(u){const h=u.attributes;for(const f in h)e.update(h[f],i.ARRAY_BUFFER)}function c(u){const h=[],f=u.index,_=u.attributes.position;let v=0;if(f!==null){const S=f.array;v=f.version;for(let E=0,x=S.length;E<x;E+=3){const A=S[E+0],C=S[E+1],P=S[E+2];h.push(A,C,C,P,P,A)}}else if(_!==void 0){const S=_.array;v=_.version;for(let E=0,x=S.length/3-1;E<x;E+=3){const A=E+0,C=E+1,P=E+2;h.push(A,C,C,P,P,A)}}else return;const m=new(ap(h)?up:lp)(h,1);m.version=v;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function d(u){const h=r.get(u);if(h){const f=u.index;f!==null&&h.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function wM(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,f){i.drawElements(n,f,r,h*a),t.update(f,n,1)}function c(h,f,_){_!==0&&(i.drawElementsInstanced(n,f,r,h*a,_),t.update(f,n,_))}function d(h,f,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,_);let m=0;for(let p=0;p<_;p++)m+=f[p];t.update(m,n,1)}function u(h,f,_,v){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,h,0,v,0,_);let p=0;for(let S=0;S<_;S++)p+=f[S]*v[S];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function AM(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function RM(i,e,t){const n=new WeakMap,s=new Ct;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=n.get(o);if(h===void 0||h.count!==u){let M=function(){O.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var f=M;h!==void 0&&h.texture.dispose();const _=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let x=0;_===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let A=o.attributes.position.count*x,C=1;A>e.maxTextureSize&&(C=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const P=new Float32Array(A*C*4*u),O=new op(P,A,C,u);O.type=di,O.needsUpdate=!0;const b=x*4;for(let D=0;D<u;D++){const F=p[D],H=S[D],K=E[D],Z=A*C*4*D;for(let ee=0;ee<F.count;ee++){const ie=ee*b;_===!0&&(s.fromBufferAttribute(F,ee),P[Z+ie+0]=s.x,P[Z+ie+1]=s.y,P[Z+ie+2]=s.z,P[Z+ie+3]=0),v===!0&&(s.fromBufferAttribute(H,ee),P[Z+ie+4]=s.x,P[Z+ie+5]=s.y,P[Z+ie+6]=s.z,P[Z+ie+7]=0),m===!0&&(s.fromBufferAttribute(K,ee),P[Z+ie+8]=s.x,P[Z+ie+9]=s.y,P[Z+ie+10]=s.z,P[Z+ie+11]=K.itemSize===4?s.w:1)}}h={count:u,texture:O,size:new We(A,C)},n.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const v=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function CM(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const Ip=new an,kh=new Sp(1,1),Pp=new op,Lp=new a_,Dp=new fp,Bh=[],zh=[],Hh=new Float32Array(16),Vh=new Float32Array(9),Gh=new Float32Array(4);function Nr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Bh[s];if(r===void 0&&(r=new Float32Array(s),Bh[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function on(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function cn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function oc(i,e){let t=zh[e];t===void 0&&(t=new Int32Array(e),zh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function IM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function PM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2fv(this.addr,e),cn(t,e)}}function LM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;i.uniform3fv(this.addr,e),cn(t,e)}}function DM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4fv(this.addr,e),cn(t,e)}}function NM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),cn(t,e)}else{if(on(t,n))return;Gh.set(n),i.uniformMatrix2fv(this.addr,!1,Gh),cn(t,n)}}function UM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),cn(t,e)}else{if(on(t,n))return;Vh.set(n),i.uniformMatrix3fv(this.addr,!1,Vh),cn(t,n)}}function OM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),cn(t,e)}else{if(on(t,n))return;Hh.set(n),i.uniformMatrix4fv(this.addr,!1,Hh),cn(t,n)}}function FM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function kM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2iv(this.addr,e),cn(t,e)}}function BM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;i.uniform3iv(this.addr,e),cn(t,e)}}function zM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4iv(this.addr,e),cn(t,e)}}function HM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function VM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2uiv(this.addr,e),cn(t,e)}}function GM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;i.uniform3uiv(this.addr,e),cn(t,e)}}function WM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4uiv(this.addr,e),cn(t,e)}}function $M(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(kh.compareFunction=rp,r=kh):r=Ip,t.setTexture2D(e||r,s)}function XM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Lp,s)}function qM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Dp,s)}function YM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Pp,s)}function KM(i){switch(i){case 5126:return IM;case 35664:return PM;case 35665:return LM;case 35666:return DM;case 35674:return NM;case 35675:return UM;case 35676:return OM;case 5124:case 35670:return FM;case 35667:case 35671:return kM;case 35668:case 35672:return BM;case 35669:case 35673:return zM;case 5125:return HM;case 36294:return VM;case 36295:return GM;case 36296:return WM;case 35678:case 36198:case 36298:case 36306:case 35682:return $M;case 35679:case 36299:case 36307:return XM;case 35680:case 36300:case 36308:case 36293:return qM;case 36289:case 36303:case 36311:case 36292:return YM}}function jM(i,e){i.uniform1fv(this.addr,e)}function JM(i,e){const t=Nr(e,this.size,2);i.uniform2fv(this.addr,t)}function ZM(i,e){const t=Nr(e,this.size,3);i.uniform3fv(this.addr,t)}function QM(i,e){const t=Nr(e,this.size,4);i.uniform4fv(this.addr,t)}function eS(i,e){const t=Nr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function tS(i,e){const t=Nr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function nS(i,e){const t=Nr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function iS(i,e){i.uniform1iv(this.addr,e)}function sS(i,e){i.uniform2iv(this.addr,e)}function rS(i,e){i.uniform3iv(this.addr,e)}function aS(i,e){i.uniform4iv(this.addr,e)}function oS(i,e){i.uniform1uiv(this.addr,e)}function cS(i,e){i.uniform2uiv(this.addr,e)}function lS(i,e){i.uniform3uiv(this.addr,e)}function uS(i,e){i.uniform4uiv(this.addr,e)}function dS(i,e,t){const n=this.cache,s=e.length,r=oc(t,s);on(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Ip,r[a])}function hS(i,e,t){const n=this.cache,s=e.length,r=oc(t,s);on(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Lp,r[a])}function fS(i,e,t){const n=this.cache,s=e.length,r=oc(t,s);on(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Dp,r[a])}function pS(i,e,t){const n=this.cache,s=e.length,r=oc(t,s);on(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Pp,r[a])}function mS(i){switch(i){case 5126:return jM;case 35664:return JM;case 35665:return ZM;case 35666:return QM;case 35674:return eS;case 35675:return tS;case 35676:return nS;case 5124:case 35670:return iS;case 35667:case 35671:return sS;case 35668:case 35672:return rS;case 35669:case 35673:return aS;case 5125:return oS;case 36294:return cS;case 36295:return lS;case 36296:return uS;case 35678:case 36198:case 36298:case 36306:case 35682:return dS;case 35679:case 36299:case 36307:return hS;case 35680:case 36300:case 36308:case 36293:return fS;case 36289:case 36303:case 36311:case 36292:return pS}}class gS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=KM(t.type)}}class _S{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mS(t.type)}}class vS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const ol=/(\w+)(\])?(\[|\.)?/g;function Wh(i,e){i.seq.push(e),i.map[e.id]=e}function yS(i,e,t){const n=i.name,s=n.length;for(ol.lastIndex=0;;){const r=ol.exec(n),a=ol.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Wh(t,c===void 0?new gS(o,i,e):new _S(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new vS(o),Wh(t,u)),t=u}}}class ko{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);yS(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function $h(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const xS=37297;let MS=0;function SS(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Xh=new ut;function bS(i){bt._getMatrix(Xh,bt.workingColorSpace,i);const e=`mat3( ${Xh.elements.map(t=>t.toFixed(4))} )`;switch(bt.getTransfer(i)){case $o:return[e,"LinearTransferOETF"];case Ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function qh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+SS(i.getShaderSource(e),o)}else return r}function TS(i,e){const t=bS(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function ES(i,e){let t;switch(e){case v0:t="Linear";break;case y0:t="Reinhard";break;case x0:t="Cineon";break;case qf:t="ACESFilmic";break;case S0:t="AgX";break;case b0:t="Neutral";break;case M0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Io=new R;function wS(){bt.getLuminanceCoefficients(Io);const i=Io.x.toFixed(4),e=Io.y.toFixed(4),t=Io.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function AS(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ca).join(`
`)}function RS(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function CS(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ca(i){return i!==""}function Yh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Kh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const IS=/^[ \t]*#include +<([\w\d./]+)>/gm;function uu(i){return i.replace(IS,LS)}const PS=new Map;function LS(i,e){let t=dt[e];if(t===void 0){const n=PS.get(e);if(n!==void 0)t=dt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return uu(t)}const DS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jh(i){return i.replace(DS,NS)}function NS(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Jh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function US(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Wf?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===$f?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Oi&&(e="SHADOWMAP_TYPE_VSM"),e}function OS(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Sr:case br:e="ENVMAP_TYPE_CUBE";break;case rc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function FS(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case br:e="ENVMAP_MODE_REFRACTION";break}return e}function kS(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Xf:e="ENVMAP_BLENDING_MULTIPLY";break;case g0:e="ENVMAP_BLENDING_MIX";break;case _0:e="ENVMAP_BLENDING_ADD";break}return e}function BS(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function zS(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=US(t),c=OS(t),d=FS(t),u=kS(t),h=BS(t),f=AS(t),_=RS(r),v=s.createProgram();let m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ca).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ca).join(`
`),p.length>0&&(p+=`
`)):(m=[Jh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ca).join(`
`),p=[Jh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ps?"#define TONE_MAPPING":"",t.toneMapping!==ps?dt.tonemapping_pars_fragment:"",t.toneMapping!==ps?ES("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",dt.colorspace_pars_fragment,TS("linearToOutputTexel",t.outputColorSpace),wS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ca).join(`
`)),a=uu(a),a=Yh(a,t),a=Kh(a,t),o=uu(o),o=Yh(o,t),o=Kh(o,t),a=jh(a),o=jh(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Vd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=S+m+a,x=S+p+o,A=$h(s,s.VERTEX_SHADER,E),C=$h(s,s.FRAGMENT_SHADER,x);s.attachShader(v,A),s.attachShader(v,C),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(D){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(v)||"",H=s.getShaderInfoLog(A)||"",K=s.getShaderInfoLog(C)||"",Z=F.trim(),ee=H.trim(),ie=K.trim();let q=!0,pe=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,A,C);else{const ge=qh(s,A,"vertex"),$e=qh(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+Z+`
`+ge+`
`+$e)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(ee===""||ie==="")&&(pe=!1);pe&&(D.diagnostics={runnable:q,programLog:Z,vertexShader:{log:ee,prefix:m},fragmentShader:{log:ie,prefix:p}})}s.deleteShader(A),s.deleteShader(C),O=new ko(s,v),b=CS(s,v)}let O;this.getUniforms=function(){return O===void 0&&P(this),O};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,xS)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=MS++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=C,this}let HS=0;class VS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new GS(e),t.set(e,n)),n}}class GS{constructor(e){this.id=HS++,this.code=e,this.usedTimes=0}}function WS(i,e,t,n,s,r,a){const o=new Du,l=new VS,c=new Set,d=[],u=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,M,D,F,H){const K=F.fog,Z=H.geometry,ee=b.isMeshStandardMaterial?F.environment:null,ie=(b.isMeshStandardMaterial?t:e).get(b.envMap||ee),q=ie&&ie.mapping===rc?ie.image.height:null,pe=_[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const ge=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,$e=ge!==void 0?ge.length:0;let rt=0;Z.morphAttributes.position!==void 0&&(rt=1),Z.morphAttributes.normal!==void 0&&(rt=2),Z.morphAttributes.color!==void 0&&(rt=3);let _t,Et,ht,se;if(pe){const Le=bi[pe];_t=Le.vertexShader,Et=Le.fragmentShader}else _t=b.vertexShader,Et=b.fragmentShader,l.update(b),ht=l.getVertexShaderID(b),se=l.getFragmentShaderID(b);const j=i.getRenderTarget(),_e=i.state.buffers.depth.getReversed(),ye=H.isInstancedMesh===!0,Oe=H.isBatchedMesh===!0,Qe=!!b.map,xt=!!b.matcap,U=!!ie,lt=!!b.aoMap,Je=!!b.lightMap,je=!!b.bumpMap,Ee=!!b.normalMap,et=!!b.displacementMap,ze=!!b.emissiveMap,ct=!!b.metalnessMap,Jt=!!b.roughnessMap,Ht=b.anisotropy>0,L=b.clearcoat>0,T=b.dispersion>0,X=b.iridescence>0,re=b.sheen>0,fe=b.transmission>0,ne=Ht&&!!b.anisotropyMap,ke=L&&!!b.clearcoatMap,le=L&&!!b.clearcoatNormalMap,Fe=L&&!!b.clearcoatRoughnessMap,oe=X&&!!b.iridescenceMap,Q=X&&!!b.iridescenceThicknessMap,Re=re&&!!b.sheenColorMap,He=re&&!!b.sheenRoughnessMap,Xe=!!b.specularMap,Ae=!!b.specularColorMap,tt=!!b.specularIntensityMap,k=fe&&!!b.transmissionMap,Me=fe&&!!b.thicknessMap,Se=!!b.gradientMap,be=!!b.alphaMap,ve=b.alphaTest>0,ce=!!b.alphaHash,Ge=!!b.extensions;let Be=ps;b.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Be=i.toneMapping);const wt={shaderID:pe,shaderType:b.type,shaderName:b.name,vertexShader:_t,fragmentShader:Et,defines:b.defines,customVertexShaderID:ht,customFragmentShaderID:se,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Oe,batchingColor:Oe&&H._colorsTexture!==null,instancing:ye,instancingColor:ye&&H.instanceColor!==null,instancingMorph:ye&&H.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:j===null?i.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Dn,alphaToCoverage:!!b.alphaToCoverage,map:Qe,matcap:xt,envMap:U,envMapMode:U&&ie.mapping,envMapCubeUVHeight:q,aoMap:lt,lightMap:Je,bumpMap:je,normalMap:Ee,displacementMap:h&&et,emissiveMap:ze,normalMapObjectSpace:Ee&&b.normalMapType===C0,normalMapTangentSpace:Ee&&b.normalMapType===sp,metalnessMap:ct,roughnessMap:Jt,anisotropy:Ht,anisotropyMap:ne,clearcoat:L,clearcoatMap:ke,clearcoatNormalMap:le,clearcoatRoughnessMap:Fe,dispersion:T,iridescence:X,iridescenceMap:oe,iridescenceThicknessMap:Q,sheen:re,sheenColorMap:Re,sheenRoughnessMap:He,specularMap:Xe,specularColorMap:Ae,specularIntensityMap:tt,transmission:fe,transmissionMap:k,thicknessMap:Me,gradientMap:Se,opaque:b.transparent===!1&&b.blending===pr&&b.alphaToCoverage===!1,alphaMap:be,alphaTest:ve,alphaHash:ce,combine:b.combine,mapUv:Qe&&v(b.map.channel),aoMapUv:lt&&v(b.aoMap.channel),lightMapUv:Je&&v(b.lightMap.channel),bumpMapUv:je&&v(b.bumpMap.channel),normalMapUv:Ee&&v(b.normalMap.channel),displacementMapUv:et&&v(b.displacementMap.channel),emissiveMapUv:ze&&v(b.emissiveMap.channel),metalnessMapUv:ct&&v(b.metalnessMap.channel),roughnessMapUv:Jt&&v(b.roughnessMap.channel),anisotropyMapUv:ne&&v(b.anisotropyMap.channel),clearcoatMapUv:ke&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:le&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:He&&v(b.sheenRoughnessMap.channel),specularMapUv:Xe&&v(b.specularMap.channel),specularColorMapUv:Ae&&v(b.specularColorMap.channel),specularIntensityMapUv:tt&&v(b.specularIntensityMap.channel),transmissionMapUv:k&&v(b.transmissionMap.channel),thicknessMapUv:Me&&v(b.thicknessMap.channel),alphaMapUv:be&&v(b.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Ee||Ht),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!Z.attributes.uv&&(Qe||be),fog:!!K,useFog:b.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:_e,skinning:H.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:$e,morphTextureStride:rt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Be,decodeVideoTexture:Qe&&b.map.isVideoTexture===!0&&bt.getTransfer(b.map.colorSpace)===Ot,decodeVideoTextureEmissive:ze&&b.emissiveMap.isVideoTexture===!0&&bt.getTransfer(b.emissiveMap.colorSpace)===Ot,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ci,flipSided:b.side===Fn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ge&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&b.extensions.multiDraw===!0||Oe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return wt.vertexUv1s=c.has(1),wt.vertexUv2s=c.has(2),wt.vertexUv3s=c.has(3),c.clear(),wt}function p(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const D in b.defines)M.push(D),M.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(S(M,b),E(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function S(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function E(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function x(b){const M=_[b.type];let D;if(M){const F=bi[M];D=y_.clone(F.uniforms)}else D=b.uniforms;return D}function A(b,M){let D;for(let F=0,H=d.length;F<H;F++){const K=d[F];if(K.cacheKey===M){D=K,++D.usedTimes;break}}return D===void 0&&(D=new zS(i,M,b,r),d.push(D)),D}function C(b){if(--b.usedTimes===0){const M=d.indexOf(b);d[M]=d[d.length-1],d.pop(),b.destroy()}}function P(b){l.remove(b)}function O(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:A,releaseProgram:C,releaseShaderCache:P,programs:d,dispose:O}}function $S(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function XS(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Zh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Qh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,h,f,_,v,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:h,material:f,groupOrder:_,renderOrder:u.renderOrder,z:v,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=h,p.material=f,p.groupOrder=_,p.renderOrder=u.renderOrder,p.z=v,p.group=m),e++,p}function o(u,h,f,_,v,m){const p=a(u,h,f,_,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,h,f,_,v,m){const p=a(u,h,f,_,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,h){t.length>1&&t.sort(u||XS),n.length>1&&n.sort(h||Zh),s.length>1&&s.sort(h||Zh)}function d(){for(let u=e,h=i.length;u<h;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:d,sort:c}}function qS(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Qh,i.set(n,[a])):s>=r.length?(a=new Qh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function YS(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new st};break;case"SpotLight":t={position:new R,direction:new R,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new st,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new st,groundColor:new st};break;case"RectAreaLight":t={color:new st,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function KS(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let jS=0;function JS(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ZS(i){const e=new YS,t=KS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const s=new R,r=new ot,a=new ot;function o(c){let d=0,u=0,h=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,_=0,v=0,m=0,p=0,S=0,E=0,x=0,A=0,C=0,P=0;c.sort(JS);for(let b=0,M=c.length;b<M;b++){const D=c[b],F=D.color,H=D.intensity,K=D.distance,Z=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=F.r*H,u+=F.g*H,h+=F.b*H;else if(D.isLightProbe){for(let ee=0;ee<9;ee++)n.probe[ee].addScaledVector(D.sh.coefficients[ee],H);P++}else if(D.isDirectionalLight){const ee=e.get(D);if(ee.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const ie=D.shadow,q=t.get(D);q.shadowIntensity=ie.intensity,q.shadowBias=ie.bias,q.shadowNormalBias=ie.normalBias,q.shadowRadius=ie.radius,q.shadowMapSize=ie.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=Z,n.directionalShadowMatrix[f]=D.shadow.matrix,S++}n.directional[f]=ee,f++}else if(D.isSpotLight){const ee=e.get(D);ee.position.setFromMatrixPosition(D.matrixWorld),ee.color.copy(F).multiplyScalar(H),ee.distance=K,ee.coneCos=Math.cos(D.angle),ee.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),ee.decay=D.decay,n.spot[v]=ee;const ie=D.shadow;if(D.map&&(n.spotLightMap[A]=D.map,A++,ie.updateMatrices(D),D.castShadow&&C++),n.spotLightMatrix[v]=ie.matrix,D.castShadow){const q=t.get(D);q.shadowIntensity=ie.intensity,q.shadowBias=ie.bias,q.shadowNormalBias=ie.normalBias,q.shadowRadius=ie.radius,q.shadowMapSize=ie.mapSize,n.spotShadow[v]=q,n.spotShadowMap[v]=Z,x++}v++}else if(D.isRectAreaLight){const ee=e.get(D);ee.color.copy(F).multiplyScalar(H),ee.halfWidth.set(D.width*.5,0,0),ee.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=ee,m++}else if(D.isPointLight){const ee=e.get(D);if(ee.color.copy(D.color).multiplyScalar(D.intensity),ee.distance=D.distance,ee.decay=D.decay,D.castShadow){const ie=D.shadow,q=t.get(D);q.shadowIntensity=ie.intensity,q.shadowBias=ie.bias,q.shadowNormalBias=ie.normalBias,q.shadowRadius=ie.radius,q.shadowMapSize=ie.mapSize,q.shadowCameraNear=ie.camera.near,q.shadowCameraFar=ie.camera.far,n.pointShadow[_]=q,n.pointShadowMap[_]=Z,n.pointShadowMatrix[_]=D.shadow.matrix,E++}n.point[_]=ee,_++}else if(D.isHemisphereLight){const ee=e.get(D);ee.skyColor.copy(D.color).multiplyScalar(H),ee.groundColor.copy(D.groundColor).multiplyScalar(H),n.hemi[p]=ee,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ue.LTC_FLOAT_1,n.rectAreaLTC2=Ue.LTC_FLOAT_2):(n.rectAreaLTC1=Ue.LTC_HALF_1,n.rectAreaLTC2=Ue.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;const O=n.hash;(O.directionalLength!==f||O.pointLength!==_||O.spotLength!==v||O.rectAreaLength!==m||O.hemiLength!==p||O.numDirectionalShadows!==S||O.numPointShadows!==E||O.numSpotShadows!==x||O.numSpotMaps!==A||O.numLightProbes!==P)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=x+A-C,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=P,O.directionalLength=f,O.pointLength=_,O.spotLength=v,O.rectAreaLength=m,O.hemiLength=p,O.numDirectionalShadows=S,O.numPointShadows=E,O.numSpotShadows=x,O.numSpotMaps=A,O.numLightProbes=P,n.version=jS++)}function l(c,d){let u=0,h=0,f=0,_=0,v=0;const m=d.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const E=c[p];if(E.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(E.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(E.isRectAreaLight){const x=n.rectArea[_];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(E.width*.5,0,0),x.halfHeight.set(0,E.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),_++}else if(E.isPointLight){const x=n.point[h];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),h++}else if(E.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(E.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function ef(i){const e=new ZS(i),t=[],n=[];function s(d){c.camera=d,t.length=0,n.length=0}function r(d){t.push(d)}function a(d){n.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function QS(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new ef(i),e.set(s,[o])):r>=a.length?(o=new ef(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const eb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function nb(i,e,t){let n=new Ou;const s=new We,r=new We,a=new Ct,o=new Z_({depthPacking:R0}),l=new Q_,c={},d=t.maxTextureSize,u={[Wi]:Fn,[Fn]:Wi,[ci]:ci},h=new _s({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:eb,fragmentShader:tb}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const _=new pn;_.setAttribute("position",new Ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new It(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wf;let p=this.type;this.render=function(C,P,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const b=i.getRenderTarget(),M=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),F=i.state;F.setBlending(fs),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const H=p!==Oi&&this.type===Oi,K=p===Oi&&this.type!==Oi;for(let Z=0,ee=C.length;Z<ee;Z++){const ie=C[Z],q=ie.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const pe=q.getFrameExtents();if(s.multiply(pe),r.copy(q.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/pe.x),s.x=r.x*pe.x,q.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/pe.y),s.y=r.y*pe.y,q.mapSize.y=r.y)),q.map===null||H===!0||K===!0){const $e=this.type!==Oi?{minFilter:Pn,magFilter:Pn}:{};q.map!==null&&q.map.dispose(),q.map=new zs(s.x,s.y,$e),q.map.texture.name=ie.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();const ge=q.getViewportCount();for(let $e=0;$e<ge;$e++){const rt=q.getViewport($e);a.set(r.x*rt.x,r.y*rt.y,r.x*rt.z,r.y*rt.w),F.viewport(a),q.updateMatrices(ie,$e),n=q.getFrustum(),x(P,O,q.camera,ie,this.type)}q.isPointLightShadow!==!0&&this.type===Oi&&S(q,O),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,D)};function S(C,P){const O=e.update(v);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new zs(s.x,s.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(P,null,O,h,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(P,null,O,f,v,null)}function E(C,P,O,b){let M=null;const D=O.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)M=D;else if(M=O.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const F=M.uuid,H=P.uuid;let K=c[F];K===void 0&&(K={},c[F]=K);let Z=K[H];Z===void 0&&(Z=M.clone(),K[H]=Z,P.addEventListener("dispose",A)),M=Z}if(M.visible=P.visible,M.wireframe=P.wireframe,b===Oi?M.side=P.shadowSide!==null?P.shadowSide:P.side:M.side=P.shadowSide!==null?P.shadowSide:u[P.side],M.alphaMap=P.alphaMap,M.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,M.map=P.map,M.clipShadows=P.clipShadows,M.clippingPlanes=P.clippingPlanes,M.clipIntersection=P.clipIntersection,M.displacementMap=P.displacementMap,M.displacementScale=P.displacementScale,M.displacementBias=P.displacementBias,M.wireframeLinewidth=P.wireframeLinewidth,M.linewidth=P.linewidth,O.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const F=i.properties.get(M);F.light=O}return M}function x(C,P,O,b,M){if(C.visible===!1)return;if(C.layers.test(P.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===Oi)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,C.matrixWorld);const H=e.update(C),K=C.material;if(Array.isArray(K)){const Z=H.groups;for(let ee=0,ie=Z.length;ee<ie;ee++){const q=Z[ee],pe=K[q.materialIndex];if(pe&&pe.visible){const ge=E(C,pe,b,M);C.onBeforeShadow(i,C,P,O,H,ge,q),i.renderBufferDirect(O,null,H,ge,C,q),C.onAfterShadow(i,C,P,O,H,ge,q)}}}else if(K.visible){const Z=E(C,K,b,M);C.onBeforeShadow(i,C,P,O,H,Z,null),i.renderBufferDirect(O,null,H,Z,C,null),C.onAfterShadow(i,C,P,O,H,Z,null)}}const F=C.children;for(let H=0,K=F.length;H<K;H++)x(F[H],P,O,b,M)}function A(C){C.target.removeEventListener("dispose",A);for(const O in c){const b=c[O],M=C.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const ib={[xl]:Ml,[Sl]:El,[bl]:wl,[Mr]:Tl,[Ml]:xl,[El]:Sl,[wl]:bl,[Tl]:Mr};function sb(i,e){function t(){let k=!1;const Me=new Ct;let Se=null;const be=new Ct(0,0,0,0);return{setMask:function(ve){Se!==ve&&!k&&(i.colorMask(ve,ve,ve,ve),Se=ve)},setLocked:function(ve){k=ve},setClear:function(ve,ce,Ge,Be,wt){wt===!0&&(ve*=Be,ce*=Be,Ge*=Be),Me.set(ve,ce,Ge,Be),be.equals(Me)===!1&&(i.clearColor(ve,ce,Ge,Be),be.copy(Me))},reset:function(){k=!1,Se=null,be.set(-1,0,0,0)}}}function n(){let k=!1,Me=!1,Se=null,be=null,ve=null;return{setReversed:function(ce){if(Me!==ce){const Ge=e.get("EXT_clip_control");ce?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT),Me=ce;const Be=ve;ve=null,this.setClear(Be)}},getReversed:function(){return Me},setTest:function(ce){ce?j(i.DEPTH_TEST):_e(i.DEPTH_TEST)},setMask:function(ce){Se!==ce&&!k&&(i.depthMask(ce),Se=ce)},setFunc:function(ce){if(Me&&(ce=ib[ce]),be!==ce){switch(ce){case xl:i.depthFunc(i.NEVER);break;case Ml:i.depthFunc(i.ALWAYS);break;case Sl:i.depthFunc(i.LESS);break;case Mr:i.depthFunc(i.LEQUAL);break;case bl:i.depthFunc(i.EQUAL);break;case Tl:i.depthFunc(i.GEQUAL);break;case El:i.depthFunc(i.GREATER);break;case wl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}be=ce}},setLocked:function(ce){k=ce},setClear:function(ce){ve!==ce&&(Me&&(ce=1-ce),i.clearDepth(ce),ve=ce)},reset:function(){k=!1,Se=null,be=null,ve=null,Me=!1}}}function s(){let k=!1,Me=null,Se=null,be=null,ve=null,ce=null,Ge=null,Be=null,wt=null;return{setTest:function(Le){k||(Le?j(i.STENCIL_TEST):_e(i.STENCIL_TEST))},setMask:function(Le){Me!==Le&&!k&&(i.stencilMask(Le),Me=Le)},setFunc:function(Le,Mt,Pe){(Se!==Le||be!==Mt||ve!==Pe)&&(i.stencilFunc(Le,Mt,Pe),Se=Le,be=Mt,ve=Pe)},setOp:function(Le,Mt,Pe){(ce!==Le||Ge!==Mt||Be!==Pe)&&(i.stencilOp(Le,Mt,Pe),ce=Le,Ge=Mt,Be=Pe)},setLocked:function(Le){k=Le},setClear:function(Le){wt!==Le&&(i.clearStencil(Le),wt=Le)},reset:function(){k=!1,Me=null,Se=null,be=null,ve=null,ce=null,Ge=null,Be=null,wt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let d={},u={},h=new WeakMap,f=[],_=null,v=!1,m=null,p=null,S=null,E=null,x=null,A=null,C=null,P=new st(0,0,0),O=0,b=!1,M=null,D=null,F=null,H=null,K=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ee=!1,ie=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(q)[1]),ee=ie>=1):q.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),ee=ie>=2);let pe=null,ge={};const $e=i.getParameter(i.SCISSOR_BOX),rt=i.getParameter(i.VIEWPORT),_t=new Ct().fromArray($e),Et=new Ct().fromArray(rt);function ht(k,Me,Se,be){const ve=new Uint8Array(4),ce=i.createTexture();i.bindTexture(k,ce),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ge=0;Ge<Se;Ge++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(Me,0,i.RGBA,1,1,be,0,i.RGBA,i.UNSIGNED_BYTE,ve):i.texImage2D(Me+Ge,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ve);return ce}const se={};se[i.TEXTURE_2D]=ht(i.TEXTURE_2D,i.TEXTURE_2D,1),se[i.TEXTURE_CUBE_MAP]=ht(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[i.TEXTURE_2D_ARRAY]=ht(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),se[i.TEXTURE_3D]=ht(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),j(i.DEPTH_TEST),a.setFunc(Mr),je(!1),Ee(Dd),j(i.CULL_FACE),lt(fs);function j(k){d[k]!==!0&&(i.enable(k),d[k]=!0)}function _e(k){d[k]!==!1&&(i.disable(k),d[k]=!1)}function ye(k,Me){return u[k]!==Me?(i.bindFramebuffer(k,Me),u[k]=Me,k===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Me),k===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Me),!0):!1}function Oe(k,Me){let Se=f,be=!1;if(k){Se=h.get(Me),Se===void 0&&(Se=[],h.set(Me,Se));const ve=k.textures;if(Se.length!==ve.length||Se[0]!==i.COLOR_ATTACHMENT0){for(let ce=0,Ge=ve.length;ce<Ge;ce++)Se[ce]=i.COLOR_ATTACHMENT0+ce;Se.length=ve.length,be=!0}}else Se[0]!==i.BACK&&(Se[0]=i.BACK,be=!0);be&&i.drawBuffers(Se)}function Qe(k){return _!==k?(i.useProgram(k),_=k,!0):!1}const xt={[Ns]:i.FUNC_ADD,[Qg]:i.FUNC_SUBTRACT,[e0]:i.FUNC_REVERSE_SUBTRACT};xt[t0]=i.MIN,xt[n0]=i.MAX;const U={[i0]:i.ZERO,[s0]:i.ONE,[r0]:i.SRC_COLOR,[vl]:i.SRC_ALPHA,[d0]:i.SRC_ALPHA_SATURATE,[l0]:i.DST_COLOR,[o0]:i.DST_ALPHA,[a0]:i.ONE_MINUS_SRC_COLOR,[yl]:i.ONE_MINUS_SRC_ALPHA,[u0]:i.ONE_MINUS_DST_COLOR,[c0]:i.ONE_MINUS_DST_ALPHA,[h0]:i.CONSTANT_COLOR,[f0]:i.ONE_MINUS_CONSTANT_COLOR,[p0]:i.CONSTANT_ALPHA,[m0]:i.ONE_MINUS_CONSTANT_ALPHA};function lt(k,Me,Se,be,ve,ce,Ge,Be,wt,Le){if(k===fs){v===!0&&(_e(i.BLEND),v=!1);return}if(v===!1&&(j(i.BLEND),v=!0),k!==Zg){if(k!==m||Le!==b){if((p!==Ns||x!==Ns)&&(i.blendEquation(i.FUNC_ADD),p=Ns,x=Ns),Le)switch(k){case pr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Nd:i.blendFunc(i.ONE,i.ONE);break;case Ud:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Od:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case pr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Nd:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ud:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Od:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}S=null,E=null,A=null,C=null,P.set(0,0,0),O=0,m=k,b=Le}return}ve=ve||Me,ce=ce||Se,Ge=Ge||be,(Me!==p||ve!==x)&&(i.blendEquationSeparate(xt[Me],xt[ve]),p=Me,x=ve),(Se!==S||be!==E||ce!==A||Ge!==C)&&(i.blendFuncSeparate(U[Se],U[be],U[ce],U[Ge]),S=Se,E=be,A=ce,C=Ge),(Be.equals(P)===!1||wt!==O)&&(i.blendColor(Be.r,Be.g,Be.b,wt),P.copy(Be),O=wt),m=k,b=!1}function Je(k,Me){k.side===ci?_e(i.CULL_FACE):j(i.CULL_FACE);let Se=k.side===Fn;Me&&(Se=!Se),je(Se),k.blending===pr&&k.transparent===!1?lt(fs):lt(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);const be=k.stencilWrite;o.setTest(be),be&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),ze(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):_e(i.SAMPLE_ALPHA_TO_COVERAGE)}function je(k){M!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),M=k)}function Ee(k){k!==jg?(j(i.CULL_FACE),k!==D&&(k===Dd?i.cullFace(i.BACK):k===Jg?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):_e(i.CULL_FACE),D=k}function et(k){k!==F&&(ee&&i.lineWidth(k),F=k)}function ze(k,Me,Se){k?(j(i.POLYGON_OFFSET_FILL),(H!==Me||K!==Se)&&(i.polygonOffset(Me,Se),H=Me,K=Se)):_e(i.POLYGON_OFFSET_FILL)}function ct(k){k?j(i.SCISSOR_TEST):_e(i.SCISSOR_TEST)}function Jt(k){k===void 0&&(k=i.TEXTURE0+Z-1),pe!==k&&(i.activeTexture(k),pe=k)}function Ht(k,Me,Se){Se===void 0&&(pe===null?Se=i.TEXTURE0+Z-1:Se=pe);let be=ge[Se];be===void 0&&(be={type:void 0,texture:void 0},ge[Se]=be),(be.type!==k||be.texture!==Me)&&(pe!==Se&&(i.activeTexture(Se),pe=Se),i.bindTexture(k,Me||se[k]),be.type=k,be.texture=Me)}function L(){const k=ge[pe];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function T(){try{i.compressedTexImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function X(){try{i.compressedTexImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function re(){try{i.texSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function fe(){try{i.texSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ne(){try{i.compressedTexSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ke(){try{i.compressedTexSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function le(){try{i.texStorage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Fe(){try{i.texStorage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function oe(){try{i.texImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Q(){try{i.texImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Re(k){_t.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),_t.copy(k))}function He(k){Et.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),Et.copy(k))}function Xe(k,Me){let Se=c.get(Me);Se===void 0&&(Se=new WeakMap,c.set(Me,Se));let be=Se.get(k);be===void 0&&(be=i.getUniformBlockIndex(Me,k.name),Se.set(k,be))}function Ae(k,Me){const be=c.get(Me).get(k);l.get(Me)!==be&&(i.uniformBlockBinding(Me,be,k.__bindingPointIndex),l.set(Me,be))}function tt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},pe=null,ge={},u={},h=new WeakMap,f=[],_=null,v=!1,m=null,p=null,S=null,E=null,x=null,A=null,C=null,P=new st(0,0,0),O=0,b=!1,M=null,D=null,F=null,H=null,K=null,_t.set(0,0,i.canvas.width,i.canvas.height),Et.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:j,disable:_e,bindFramebuffer:ye,drawBuffers:Oe,useProgram:Qe,setBlending:lt,setMaterial:Je,setFlipSided:je,setCullFace:Ee,setLineWidth:et,setPolygonOffset:ze,setScissorTest:ct,activeTexture:Jt,bindTexture:Ht,unbindTexture:L,compressedTexImage2D:T,compressedTexImage3D:X,texImage2D:oe,texImage3D:Q,updateUBOMapping:Xe,uniformBlockBinding:Ae,texStorage2D:le,texStorage3D:Fe,texSubImage2D:re,texSubImage3D:fe,compressedTexSubImage2D:ne,compressedTexSubImage3D:ke,scissor:Re,viewport:He,reset:tt}}function rb(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new We,d=new WeakMap;let u;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(L,T){return f?new OffscreenCanvas(L,T):Ea("canvas")}function v(L,T,X){let re=1;const fe=Ht(L);if((fe.width>X||fe.height>X)&&(re=X/Math.max(fe.width,fe.height)),re<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const ne=Math.floor(re*fe.width),ke=Math.floor(re*fe.height);u===void 0&&(u=_(ne,ke));const le=T?_(ne,ke):u;return le.width=ne,le.height=ke,le.getContext("2d").drawImage(L,0,0,ne,ke),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+fe.width+"x"+fe.height+") to ("+ne+"x"+ke+")."),le}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+fe.width+"x"+fe.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){i.generateMipmap(L)}function S(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(L,T,X,re,fe=!1){if(L!==null){if(i[L]!==void 0)return i[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let ne=T;if(T===i.RED&&(X===i.FLOAT&&(ne=i.R32F),X===i.HALF_FLOAT&&(ne=i.R16F),X===i.UNSIGNED_BYTE&&(ne=i.R8)),T===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(ne=i.R8UI),X===i.UNSIGNED_SHORT&&(ne=i.R16UI),X===i.UNSIGNED_INT&&(ne=i.R32UI),X===i.BYTE&&(ne=i.R8I),X===i.SHORT&&(ne=i.R16I),X===i.INT&&(ne=i.R32I)),T===i.RG&&(X===i.FLOAT&&(ne=i.RG32F),X===i.HALF_FLOAT&&(ne=i.RG16F),X===i.UNSIGNED_BYTE&&(ne=i.RG8)),T===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(ne=i.RG8UI),X===i.UNSIGNED_SHORT&&(ne=i.RG16UI),X===i.UNSIGNED_INT&&(ne=i.RG32UI),X===i.BYTE&&(ne=i.RG8I),X===i.SHORT&&(ne=i.RG16I),X===i.INT&&(ne=i.RG32I)),T===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(ne=i.RGB8UI),X===i.UNSIGNED_SHORT&&(ne=i.RGB16UI),X===i.UNSIGNED_INT&&(ne=i.RGB32UI),X===i.BYTE&&(ne=i.RGB8I),X===i.SHORT&&(ne=i.RGB16I),X===i.INT&&(ne=i.RGB32I)),T===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(ne=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(ne=i.RGBA16UI),X===i.UNSIGNED_INT&&(ne=i.RGBA32UI),X===i.BYTE&&(ne=i.RGBA8I),X===i.SHORT&&(ne=i.RGBA16I),X===i.INT&&(ne=i.RGBA32I)),T===i.RGB&&(X===i.UNSIGNED_INT_5_9_9_9_REV&&(ne=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(ne=i.R11F_G11F_B10F)),T===i.RGBA){const ke=fe?$o:bt.getTransfer(re);X===i.FLOAT&&(ne=i.RGBA32F),X===i.HALF_FLOAT&&(ne=i.RGBA16F),X===i.UNSIGNED_BYTE&&(ne=ke===Ot?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT_4_4_4_4&&(ne=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(ne=i.RGB5_A1)}return(ne===i.R16F||ne===i.R32F||ne===i.RG16F||ne===i.RG32F||ne===i.RGBA16F||ne===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function x(L,T){let X;return L?T===null||T===Bs||T===xa?X=i.DEPTH24_STENCIL8:T===di?X=i.DEPTH32F_STENCIL8:T===ya&&(X=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Bs||T===xa?X=i.DEPTH_COMPONENT24:T===di?X=i.DEPTH_COMPONENT32F:T===ya&&(X=i.DEPTH_COMPONENT16),X}function A(L,T){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Pn&&L.minFilter!==Hn?Math.log2(Math.max(T.width,T.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?T.mipmaps.length:1}function C(L){const T=L.target;T.removeEventListener("dispose",C),O(T),T.isVideoTexture&&d.delete(T)}function P(L){const T=L.target;T.removeEventListener("dispose",P),M(T)}function O(L){const T=n.get(L);if(T.__webglInit===void 0)return;const X=L.source,re=h.get(X);if(re){const fe=re[T.__cacheKey];fe.usedTimes--,fe.usedTimes===0&&b(L),Object.keys(re).length===0&&h.delete(X)}n.remove(L)}function b(L){const T=n.get(L);i.deleteTexture(T.__webglTexture);const X=L.source,re=h.get(X);delete re[T.__cacheKey],a.memory.textures--}function M(L){const T=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(T.__webglFramebuffer[re]))for(let fe=0;fe<T.__webglFramebuffer[re].length;fe++)i.deleteFramebuffer(T.__webglFramebuffer[re][fe]);else i.deleteFramebuffer(T.__webglFramebuffer[re]);T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer[re])}else{if(Array.isArray(T.__webglFramebuffer))for(let re=0;re<T.__webglFramebuffer.length;re++)i.deleteFramebuffer(T.__webglFramebuffer[re]);else i.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&i.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let re=0;re<T.__webglColorRenderbuffer.length;re++)T.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(T.__webglColorRenderbuffer[re]);T.__webglDepthRenderbuffer&&i.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const X=L.textures;for(let re=0,fe=X.length;re<fe;re++){const ne=n.get(X[re]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(X[re])}n.remove(L)}let D=0;function F(){D=0}function H(){const L=D;return L>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),D+=1,L}function K(L){const T=[];return T.push(L.wrapS),T.push(L.wrapT),T.push(L.wrapR||0),T.push(L.magFilter),T.push(L.minFilter),T.push(L.anisotropy),T.push(L.internalFormat),T.push(L.format),T.push(L.type),T.push(L.generateMipmaps),T.push(L.premultiplyAlpha),T.push(L.flipY),T.push(L.unpackAlignment),T.push(L.colorSpace),T.join()}function Z(L,T){const X=n.get(L);if(L.isVideoTexture&&ct(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&X.__version!==L.version){const re=L.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{se(X,L,T);return}}else L.isExternalTexture&&(X.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+T)}function ee(L,T){const X=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&X.__version!==L.version){se(X,L,T);return}t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+T)}function ie(L,T){const X=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&X.__version!==L.version){se(X,L,T);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+T)}function q(L,T){const X=n.get(L);if(L.version>0&&X.__version!==L.version){j(X,L,T);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+T)}const pe={[Tr]:i.REPEAT,[hs]:i.CLAMP_TO_EDGE,[Wo]:i.MIRRORED_REPEAT},ge={[Pn]:i.NEAREST,[Kf]:i.NEAREST_MIPMAP_NEAREST,[oa]:i.NEAREST_MIPMAP_LINEAR,[Hn]:i.LINEAR,[Do]:i.LINEAR_MIPMAP_NEAREST,[zi]:i.LINEAR_MIPMAP_LINEAR},$e={[I0]:i.NEVER,[O0]:i.ALWAYS,[P0]:i.LESS,[rp]:i.LEQUAL,[L0]:i.EQUAL,[U0]:i.GEQUAL,[D0]:i.GREATER,[N0]:i.NOTEQUAL};function rt(L,T){if(T.type===di&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Hn||T.magFilter===Do||T.magFilter===oa||T.magFilter===zi||T.minFilter===Hn||T.minFilter===Do||T.minFilter===oa||T.minFilter===zi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,pe[T.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,pe[T.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,pe[T.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,ge[T.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,ge[T.minFilter]),T.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,$e[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Pn||T.minFilter!==oa&&T.minFilter!==zi||T.type===di&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function _t(L,T){let X=!1;L.__webglInit===void 0&&(L.__webglInit=!0,T.addEventListener("dispose",C));const re=T.source;let fe=h.get(re);fe===void 0&&(fe={},h.set(re,fe));const ne=K(T);if(ne!==L.__cacheKey){fe[ne]===void 0&&(fe[ne]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,X=!0),fe[ne].usedTimes++;const ke=fe[L.__cacheKey];ke!==void 0&&(fe[L.__cacheKey].usedTimes--,ke.usedTimes===0&&b(T)),L.__cacheKey=ne,L.__webglTexture=fe[ne].texture}return X}function Et(L,T,X){return Math.floor(Math.floor(L/X)/T)}function ht(L,T,X,re){const ne=L.updateRanges;if(ne.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,T.width,T.height,X,re,T.data);else{ne.sort((Q,Re)=>Q.start-Re.start);let ke=0;for(let Q=1;Q<ne.length;Q++){const Re=ne[ke],He=ne[Q],Xe=Re.start+Re.count,Ae=Et(He.start,T.width,4),tt=Et(Re.start,T.width,4);He.start<=Xe+1&&Ae===tt&&Et(He.start+He.count-1,T.width,4)===Ae?Re.count=Math.max(Re.count,He.start+He.count-Re.start):(++ke,ne[ke]=He)}ne.length=ke+1;const le=i.getParameter(i.UNPACK_ROW_LENGTH),Fe=i.getParameter(i.UNPACK_SKIP_PIXELS),oe=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,T.width);for(let Q=0,Re=ne.length;Q<Re;Q++){const He=ne[Q],Xe=Math.floor(He.start/4),Ae=Math.ceil(He.count/4),tt=Xe%T.width,k=Math.floor(Xe/T.width),Me=Ae,Se=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,tt),i.pixelStorei(i.UNPACK_SKIP_ROWS,k),t.texSubImage2D(i.TEXTURE_2D,0,tt,k,Me,Se,X,re,T.data)}L.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,le),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Fe),i.pixelStorei(i.UNPACK_SKIP_ROWS,oe)}}function se(L,T,X){let re=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(re=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(re=i.TEXTURE_3D);const fe=_t(L,T),ne=T.source;t.bindTexture(re,L.__webglTexture,i.TEXTURE0+X);const ke=n.get(ne);if(ne.version!==ke.__version||fe===!0){t.activeTexture(i.TEXTURE0+X);const le=bt.getPrimaries(bt.workingColorSpace),Fe=T.colorSpace===ds?null:bt.getPrimaries(T.colorSpace),oe=T.colorSpace===ds||le===Fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);let Q=v(T.image,!1,s.maxTextureSize);Q=Jt(T,Q);const Re=r.convert(T.format,T.colorSpace),He=r.convert(T.type);let Xe=E(T.internalFormat,Re,He,T.colorSpace,T.isVideoTexture);rt(re,T);let Ae;const tt=T.mipmaps,k=T.isVideoTexture!==!0,Me=ke.__version===void 0||fe===!0,Se=ne.dataReady,be=A(T,Q);if(T.isDepthTexture)Xe=x(T.format===Sa,T.type),Me&&(k?t.texStorage2D(i.TEXTURE_2D,1,Xe,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,Xe,Q.width,Q.height,0,Re,He,null));else if(T.isDataTexture)if(tt.length>0){k&&Me&&t.texStorage2D(i.TEXTURE_2D,be,Xe,tt[0].width,tt[0].height);for(let ve=0,ce=tt.length;ve<ce;ve++)Ae=tt[ve],k?Se&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,Ae.width,Ae.height,Re,He,Ae.data):t.texImage2D(i.TEXTURE_2D,ve,Xe,Ae.width,Ae.height,0,Re,He,Ae.data);T.generateMipmaps=!1}else k?(Me&&t.texStorage2D(i.TEXTURE_2D,be,Xe,Q.width,Q.height),Se&&ht(T,Q,Re,He)):t.texImage2D(i.TEXTURE_2D,0,Xe,Q.width,Q.height,0,Re,He,Q.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){k&&Me&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,Xe,tt[0].width,tt[0].height,Q.depth);for(let ve=0,ce=tt.length;ve<ce;ve++)if(Ae=tt[ve],T.format!==Zn)if(Re!==null)if(k){if(Se)if(T.layerUpdates.size>0){const Ge=Ih(Ae.width,Ae.height,T.format,T.type);for(const Be of T.layerUpdates){const wt=Ae.data.subarray(Be*Ge/Ae.data.BYTES_PER_ELEMENT,(Be+1)*Ge/Ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,Be,Ae.width,Ae.height,1,Re,wt)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,0,Ae.width,Ae.height,Q.depth,Re,Ae.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ve,Xe,Ae.width,Ae.height,Q.depth,0,Ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else k?Se&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,0,Ae.width,Ae.height,Q.depth,Re,He,Ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ve,Xe,Ae.width,Ae.height,Q.depth,0,Re,He,Ae.data)}else{k&&Me&&t.texStorage2D(i.TEXTURE_2D,be,Xe,tt[0].width,tt[0].height);for(let ve=0,ce=tt.length;ve<ce;ve++)Ae=tt[ve],T.format!==Zn?Re!==null?k?Se&&t.compressedTexSubImage2D(i.TEXTURE_2D,ve,0,0,Ae.width,Ae.height,Re,Ae.data):t.compressedTexImage2D(i.TEXTURE_2D,ve,Xe,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?Se&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,Ae.width,Ae.height,Re,He,Ae.data):t.texImage2D(i.TEXTURE_2D,ve,Xe,Ae.width,Ae.height,0,Re,He,Ae.data)}else if(T.isDataArrayTexture)if(k){if(Me&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,Xe,Q.width,Q.height,Q.depth),Se)if(T.layerUpdates.size>0){const ve=Ih(Q.width,Q.height,T.format,T.type);for(const ce of T.layerUpdates){const Ge=Q.data.subarray(ce*ve/Q.data.BYTES_PER_ELEMENT,(ce+1)*ve/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ce,Q.width,Q.height,1,Re,He,Ge)}T.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,Re,He,Q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Xe,Q.width,Q.height,Q.depth,0,Re,He,Q.data);else if(T.isData3DTexture)k?(Me&&t.texStorage3D(i.TEXTURE_3D,be,Xe,Q.width,Q.height,Q.depth),Se&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,Re,He,Q.data)):t.texImage3D(i.TEXTURE_3D,0,Xe,Q.width,Q.height,Q.depth,0,Re,He,Q.data);else if(T.isFramebufferTexture){if(Me)if(k)t.texStorage2D(i.TEXTURE_2D,be,Xe,Q.width,Q.height);else{let ve=Q.width,ce=Q.height;for(let Ge=0;Ge<be;Ge++)t.texImage2D(i.TEXTURE_2D,Ge,Xe,ve,ce,0,Re,He,null),ve>>=1,ce>>=1}}else if(tt.length>0){if(k&&Me){const ve=Ht(tt[0]);t.texStorage2D(i.TEXTURE_2D,be,Xe,ve.width,ve.height)}for(let ve=0,ce=tt.length;ve<ce;ve++)Ae=tt[ve],k?Se&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,Re,He,Ae):t.texImage2D(i.TEXTURE_2D,ve,Xe,Re,He,Ae);T.generateMipmaps=!1}else if(k){if(Me){const ve=Ht(Q);t.texStorage2D(i.TEXTURE_2D,be,Xe,ve.width,ve.height)}Se&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Re,He,Q)}else t.texImage2D(i.TEXTURE_2D,0,Xe,Re,He,Q);m(T)&&p(re),ke.__version=ne.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function j(L,T,X){if(T.image.length!==6)return;const re=_t(L,T),fe=T.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+X);const ne=n.get(fe);if(fe.version!==ne.__version||re===!0){t.activeTexture(i.TEXTURE0+X);const ke=bt.getPrimaries(bt.workingColorSpace),le=T.colorSpace===ds?null:bt.getPrimaries(T.colorSpace),Fe=T.colorSpace===ds||ke===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);const oe=T.isCompressedTexture||T.image[0].isCompressedTexture,Q=T.image[0]&&T.image[0].isDataTexture,Re=[];for(let ce=0;ce<6;ce++)!oe&&!Q?Re[ce]=v(T.image[ce],!0,s.maxCubemapSize):Re[ce]=Q?T.image[ce].image:T.image[ce],Re[ce]=Jt(T,Re[ce]);const He=Re[0],Xe=r.convert(T.format,T.colorSpace),Ae=r.convert(T.type),tt=E(T.internalFormat,Xe,Ae,T.colorSpace),k=T.isVideoTexture!==!0,Me=ne.__version===void 0||re===!0,Se=fe.dataReady;let be=A(T,He);rt(i.TEXTURE_CUBE_MAP,T);let ve;if(oe){k&&Me&&t.texStorage2D(i.TEXTURE_CUBE_MAP,be,tt,He.width,He.height);for(let ce=0;ce<6;ce++){ve=Re[ce].mipmaps;for(let Ge=0;Ge<ve.length;Ge++){const Be=ve[Ge];T.format!==Zn?Xe!==null?k?Se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ge,0,0,Be.width,Be.height,Xe,Be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ge,tt,Be.width,Be.height,0,Be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?Se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ge,0,0,Be.width,Be.height,Xe,Ae,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ge,tt,Be.width,Be.height,0,Xe,Ae,Be.data)}}}else{if(ve=T.mipmaps,k&&Me){ve.length>0&&be++;const ce=Ht(Re[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,be,tt,ce.width,ce.height)}for(let ce=0;ce<6;ce++)if(Q){k?Se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Re[ce].width,Re[ce].height,Xe,Ae,Re[ce].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,tt,Re[ce].width,Re[ce].height,0,Xe,Ae,Re[ce].data);for(let Ge=0;Ge<ve.length;Ge++){const wt=ve[Ge].image[ce].image;k?Se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ge+1,0,0,wt.width,wt.height,Xe,Ae,wt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ge+1,tt,wt.width,wt.height,0,Xe,Ae,wt.data)}}else{k?Se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Xe,Ae,Re[ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,tt,Xe,Ae,Re[ce]);for(let Ge=0;Ge<ve.length;Ge++){const Be=ve[Ge];k?Se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ge+1,0,0,Xe,Ae,Be.image[ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ge+1,tt,Xe,Ae,Be.image[ce])}}}m(T)&&p(i.TEXTURE_CUBE_MAP),ne.__version=fe.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function _e(L,T,X,re,fe,ne){const ke=r.convert(X.format,X.colorSpace),le=r.convert(X.type),Fe=E(X.internalFormat,ke,le,X.colorSpace),oe=n.get(T),Q=n.get(X);if(Q.__renderTarget=T,!oe.__hasExternalTextures){const Re=Math.max(1,T.width>>ne),He=Math.max(1,T.height>>ne);fe===i.TEXTURE_3D||fe===i.TEXTURE_2D_ARRAY?t.texImage3D(fe,ne,Fe,Re,He,T.depth,0,ke,le,null):t.texImage2D(fe,ne,Fe,Re,He,0,ke,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),ze(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,fe,Q.__webglTexture,0,et(T)):(fe===i.TEXTURE_2D||fe>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&fe<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,re,fe,Q.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ye(L,T,X){if(i.bindRenderbuffer(i.RENDERBUFFER,L),T.depthBuffer){const re=T.depthTexture,fe=re&&re.isDepthTexture?re.type:null,ne=x(T.stencilBuffer,fe),ke=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=et(T);ze(T)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le,ne,T.width,T.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,le,ne,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,ne,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ke,i.RENDERBUFFER,L)}else{const re=T.textures;for(let fe=0;fe<re.length;fe++){const ne=re[fe],ke=r.convert(ne.format,ne.colorSpace),le=r.convert(ne.type),Fe=E(ne.internalFormat,ke,le,ne.colorSpace),oe=et(T);X&&ze(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,Fe,T.width,T.height):ze(T)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,oe,Fe,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,Fe,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Oe(L,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const re=n.get(T.depthTexture);re.__renderTarget=T,(!re.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),Z(T.depthTexture,0);const fe=re.__webglTexture,ne=et(T);if(T.depthTexture.format===Ma)ze(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,fe,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,fe,0);else if(T.depthTexture.format===Sa)ze(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,fe,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,fe,0);else throw new Error("Unknown depthTexture format")}function Qe(L){const T=n.get(L),X=L.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==L.depthTexture){const re=L.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),re){const fe=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,re.removeEventListener("dispose",fe)};re.addEventListener("dispose",fe),T.__depthDisposeCallback=fe}T.__boundDepthTexture=re}if(L.depthTexture&&!T.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");const re=L.texture.mipmaps;re&&re.length>0?Oe(T.__webglFramebuffer[0],L):Oe(T.__webglFramebuffer,L)}else if(X){T.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[re]),T.__webglDepthbuffer[re]===void 0)T.__webglDepthbuffer[re]=i.createRenderbuffer(),ye(T.__webglDepthbuffer[re],L,!1);else{const fe=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=T.__webglDepthbuffer[re];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,fe,i.RENDERBUFFER,ne)}}else{const re=L.texture.mipmaps;if(re&&re.length>0?t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=i.createRenderbuffer(),ye(T.__webglDepthbuffer,L,!1);else{const fe=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=T.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,fe,i.RENDERBUFFER,ne)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function xt(L,T,X){const re=n.get(L);T!==void 0&&_e(re.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&Qe(L)}function U(L){const T=L.texture,X=n.get(L),re=n.get(T);L.addEventListener("dispose",P);const fe=L.textures,ne=L.isWebGLCubeRenderTarget===!0,ke=fe.length>1;if(ke||(re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture()),re.__version=T.version,a.memory.textures++),ne){X.__webglFramebuffer=[];for(let le=0;le<6;le++)if(T.mipmaps&&T.mipmaps.length>0){X.__webglFramebuffer[le]=[];for(let Fe=0;Fe<T.mipmaps.length;Fe++)X.__webglFramebuffer[le][Fe]=i.createFramebuffer()}else X.__webglFramebuffer[le]=i.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){X.__webglFramebuffer=[];for(let le=0;le<T.mipmaps.length;le++)X.__webglFramebuffer[le]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(ke)for(let le=0,Fe=fe.length;le<Fe;le++){const oe=n.get(fe[le]);oe.__webglTexture===void 0&&(oe.__webglTexture=i.createTexture(),a.memory.textures++)}if(L.samples>0&&ze(L)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let le=0;le<fe.length;le++){const Fe=fe[le];X.__webglColorRenderbuffer[le]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[le]);const oe=r.convert(Fe.format,Fe.colorSpace),Q=r.convert(Fe.type),Re=E(Fe.internalFormat,oe,Q,Fe.colorSpace,L.isXRRenderTarget===!0),He=et(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,He,Re,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,X.__webglColorRenderbuffer[le])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),ye(X.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),rt(i.TEXTURE_CUBE_MAP,T);for(let le=0;le<6;le++)if(T.mipmaps&&T.mipmaps.length>0)for(let Fe=0;Fe<T.mipmaps.length;Fe++)_e(X.__webglFramebuffer[le][Fe],L,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Fe);else _e(X.__webglFramebuffer[le],L,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(T)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ke){for(let le=0,Fe=fe.length;le<Fe;le++){const oe=fe[le],Q=n.get(oe);let Re=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Re=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Re,Q.__webglTexture),rt(Re,oe),_e(X.__webglFramebuffer,L,oe,i.COLOR_ATTACHMENT0+le,Re,0),m(oe)&&p(Re)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(le=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,re.__webglTexture),rt(le,T),T.mipmaps&&T.mipmaps.length>0)for(let Fe=0;Fe<T.mipmaps.length;Fe++)_e(X.__webglFramebuffer[Fe],L,T,i.COLOR_ATTACHMENT0,le,Fe);else _e(X.__webglFramebuffer,L,T,i.COLOR_ATTACHMENT0,le,0);m(T)&&p(le),t.unbindTexture()}L.depthBuffer&&Qe(L)}function lt(L){const T=L.textures;for(let X=0,re=T.length;X<re;X++){const fe=T[X];if(m(fe)){const ne=S(L),ke=n.get(fe).__webglTexture;t.bindTexture(ne,ke),p(ne),t.unbindTexture()}}}const Je=[],je=[];function Ee(L){if(L.samples>0){if(ze(L)===!1){const T=L.textures,X=L.width,re=L.height;let fe=i.COLOR_BUFFER_BIT;const ne=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ke=n.get(L),le=T.length>1;if(le)for(let oe=0;oe<T.length;oe++)t.bindFramebuffer(i.FRAMEBUFFER,ke.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ke.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ke.__webglMultisampledFramebuffer);const Fe=L.texture.mipmaps;Fe&&Fe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ke.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ke.__webglFramebuffer);for(let oe=0;oe<T.length;oe++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(fe|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(fe|=i.STENCIL_BUFFER_BIT)),le){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ke.__webglColorRenderbuffer[oe]);const Q=n.get(T[oe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Q,0)}i.blitFramebuffer(0,0,X,re,0,0,X,re,fe,i.NEAREST),l===!0&&(Je.length=0,je.length=0,Je.push(i.COLOR_ATTACHMENT0+oe),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Je.push(ne),je.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,je)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Je))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),le)for(let oe=0;oe<T.length;oe++){t.bindFramebuffer(i.FRAMEBUFFER,ke.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,ke.__webglColorRenderbuffer[oe]);const Q=n.get(T[oe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ke.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,Q,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ke.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const T=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[T])}}}function et(L){return Math.min(s.maxSamples,L.samples)}function ze(L){const T=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function ct(L){const T=a.render.frame;d.get(L)!==T&&(d.set(L,T),L.update())}function Jt(L,T){const X=L.colorSpace,re=L.format,fe=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||X!==Dn&&X!==ds&&(bt.getTransfer(X)===Ot?(re!==Zn||fe!==Ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),T}function Ht(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=F,this.setTexture2D=Z,this.setTexture2DArray=ee,this.setTexture3D=ie,this.setTextureCube=q,this.rebindTextures=xt,this.setupRenderTarget=U,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=Qe,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=ze}function ab(i,e){function t(n,s=ds){let r;const a=bt.getTransfer(s);if(n===Ei)return i.UNSIGNED_BYTE;if(n===Eu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===wu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Zf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Qf)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===jf)return i.BYTE;if(n===Jf)return i.SHORT;if(n===ya)return i.UNSIGNED_SHORT;if(n===Tu)return i.INT;if(n===Bs)return i.UNSIGNED_INT;if(n===di)return i.FLOAT;if(n===Ia)return i.HALF_FLOAT;if(n===ep)return i.ALPHA;if(n===tp)return i.RGB;if(n===Zn)return i.RGBA;if(n===Ma)return i.DEPTH_COMPONENT;if(n===Sa)return i.DEPTH_STENCIL;if(n===Au)return i.RED;if(n===Ru)return i.RED_INTEGER;if(n===np)return i.RG;if(n===Cu)return i.RG_INTEGER;if(n===Iu)return i.RGBA_INTEGER;if(n===No||n===Uo||n===Oo||n===Fo)if(a===Ot)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===No)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===No)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Uo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Oo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Cl||n===Il||n===Pl||n===Ll)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Cl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Il)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Pl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ll)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Dl||n===Nl||n===Ul)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Dl||n===Nl)return a===Ot?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ul)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ol||n===Fl||n===kl||n===Bl||n===zl||n===Hl||n===Vl||n===Gl||n===Wl||n===$l||n===Xl||n===ql||n===Yl||n===Kl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ol)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Fl)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===kl)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Bl)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===zl)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Hl)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Vl)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Gl)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Wl)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$l)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Xl)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ql)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Yl)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Kl)return a===Ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===jl||n===Jl||n===Zl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===jl)return a===Ot?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Jl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Zl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ql||n===eu||n===tu||n===nu)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ql)return r.COMPRESSED_RED_RGTC1_EXT;if(n===eu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===tu)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===nu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xa?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const ob=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class lb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new bp(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new _s({vertexShader:ob,fragmentShader:cb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new It(new La(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ub extends Ir{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,f=null,_=null;const v=typeof XRWebGLBinding<"u",m=new lb,p={},S=t.getContextAttributes();let E=null,x=null;const A=[],C=[],P=new We;let O=null;const b=new Cn;b.viewport=new Ct;const M=new Cn;M.viewport=new Ct;const D=[b,M],F=new Mv;let H=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(se){let j=A[se];return j===void 0&&(j=new Wc,A[se]=j),j.getTargetRaySpace()},this.getControllerGrip=function(se){let j=A[se];return j===void 0&&(j=new Wc,A[se]=j),j.getGripSpace()},this.getHand=function(se){let j=A[se];return j===void 0&&(j=new Wc,A[se]=j),j.getHandSpace()};function Z(se){const j=C.indexOf(se.inputSource);if(j===-1)return;const _e=A[j];_e!==void 0&&(_e.update(se.inputSource,se.frame,c||a),_e.dispatchEvent({type:se.type,data:se.inputSource}))}function ee(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",ee),s.removeEventListener("inputsourceschange",ie);for(let se=0;se<A.length;se++){const j=C[se];j!==null&&(C[se]=null,A[se].disconnect(j))}H=null,K=null,m.reset();for(const se in p)delete p[se];e.setRenderTarget(E),f=null,h=null,u=null,s=null,x=null,ht.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(se){r=se,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(se){o=se,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(se){c=se},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(se){if(s=se,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",ee),s.addEventListener("inputsourceschange",ie),S.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,ye=null,Oe=null;S.depth&&(Oe=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=S.stencil?Sa:Ma,ye=S.stencil?xa:Bs);const Qe={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:r};u=this.getBinding(),h=u.createProjectionLayer(Qe),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new zs(h.textureWidth,h.textureHeight,{format:Zn,type:Ei,depthTexture:new Sp(h.textureWidth,h.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const _e={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,_e),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new zs(f.framebufferWidth,f.framebufferHeight,{format:Zn,type:Ei,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ht.setContext(s),ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(se){for(let j=0;j<se.removed.length;j++){const _e=se.removed[j],ye=C.indexOf(_e);ye>=0&&(C[ye]=null,A[ye].disconnect(_e))}for(let j=0;j<se.added.length;j++){const _e=se.added[j];let ye=C.indexOf(_e);if(ye===-1){for(let Qe=0;Qe<A.length;Qe++)if(Qe>=C.length){C.push(_e),ye=Qe;break}else if(C[Qe]===null){C[Qe]=_e,ye=Qe;break}if(ye===-1)break}const Oe=A[ye];Oe&&Oe.connect(_e)}}const q=new R,pe=new R;function ge(se,j,_e){q.setFromMatrixPosition(j.matrixWorld),pe.setFromMatrixPosition(_e.matrixWorld);const ye=q.distanceTo(pe),Oe=j.projectionMatrix.elements,Qe=_e.projectionMatrix.elements,xt=Oe[14]/(Oe[10]-1),U=Oe[14]/(Oe[10]+1),lt=(Oe[9]+1)/Oe[5],Je=(Oe[9]-1)/Oe[5],je=(Oe[8]-1)/Oe[0],Ee=(Qe[8]+1)/Qe[0],et=xt*je,ze=xt*Ee,ct=ye/(-je+Ee),Jt=ct*-je;if(j.matrixWorld.decompose(se.position,se.quaternion,se.scale),se.translateX(Jt),se.translateZ(ct),se.matrixWorld.compose(se.position,se.quaternion,se.scale),se.matrixWorldInverse.copy(se.matrixWorld).invert(),Oe[10]===-1)se.projectionMatrix.copy(j.projectionMatrix),se.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const Ht=xt+ct,L=U+ct,T=et-Jt,X=ze+(ye-Jt),re=lt*U/L*Ht,fe=Je*U/L*Ht;se.projectionMatrix.makePerspective(T,X,re,fe,Ht,L),se.projectionMatrixInverse.copy(se.projectionMatrix).invert()}}function $e(se,j){j===null?se.matrixWorld.copy(se.matrix):se.matrixWorld.multiplyMatrices(j.matrixWorld,se.matrix),se.matrixWorldInverse.copy(se.matrixWorld).invert()}this.updateCamera=function(se){if(s===null)return;let j=se.near,_e=se.far;m.texture!==null&&(m.depthNear>0&&(j=m.depthNear),m.depthFar>0&&(_e=m.depthFar)),F.near=M.near=b.near=j,F.far=M.far=b.far=_e,(H!==F.near||K!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),H=F.near,K=F.far),F.layers.mask=se.layers.mask|6,b.layers.mask=F.layers.mask&3,M.layers.mask=F.layers.mask&5;const ye=se.parent,Oe=F.cameras;$e(F,ye);for(let Qe=0;Qe<Oe.length;Qe++)$e(Oe[Qe],ye);Oe.length===2?ge(F,b,M):F.projectionMatrix.copy(b.projectionMatrix),rt(se,F,ye)};function rt(se,j,_e){_e===null?se.matrix.copy(j.matrixWorld):(se.matrix.copy(_e.matrixWorld),se.matrix.invert(),se.matrix.multiply(j.matrixWorld)),se.matrix.decompose(se.position,se.quaternion,se.scale),se.updateMatrixWorld(!0),se.projectionMatrix.copy(j.projectionMatrix),se.projectionMatrixInverse.copy(j.projectionMatrixInverse),se.isPerspectiveCamera&&(se.fov=Er*2*Math.atan(1/se.projectionMatrix.elements[5]),se.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(se){l=se,h!==null&&(h.fixedFoveation=se),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=se)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(se){return p[se]};let _t=null;function Et(se,j){if(d=j.getViewerPose(c||a),_=j,d!==null){const _e=d.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let ye=!1;_e.length!==F.cameras.length&&(F.cameras.length=0,ye=!0);for(let U=0;U<_e.length;U++){const lt=_e[U];let Je=null;if(f!==null)Je=f.getViewport(lt);else{const Ee=u.getViewSubImage(h,lt);Je=Ee.viewport,U===0&&(e.setRenderTargetTextures(x,Ee.colorTexture,Ee.depthStencilTexture),e.setRenderTarget(x))}let je=D[U];je===void 0&&(je=new Cn,je.layers.enable(U),je.viewport=new Ct,D[U]=je),je.matrix.fromArray(lt.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(lt.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(Je.x,Je.y,Je.width,Je.height),U===0&&(F.matrix.copy(je.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ye===!0&&F.cameras.push(je)}const Oe=s.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const U=u.getDepthInformation(_e[0]);U&&U.isValid&&U.texture&&m.init(U,s.renderState)}if(Oe&&Oe.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let U=0;U<_e.length;U++){const lt=_e[U].camera;if(lt){let Je=p[lt];Je||(Je=new bp,p[lt]=Je);const je=u.getCameraImage(lt);Je.sourceTexture=je}}}}for(let _e=0;_e<A.length;_e++){const ye=C[_e],Oe=A[_e];ye!==null&&Oe!==void 0&&Oe.update(ye,j,c||a)}_t&&_t(se,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),_=null}const ht=new Cp;ht.setAnimationLoop(Et),this.setAnimationLoop=function(se){_t=se},this.dispose=function(){}}}const Is=new Kt,db=new ot;function hb(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,dp(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,E,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),_(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,S,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Fn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Fn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=e.get(p),E=S.envMap,x=S.envMapRotation;E&&(m.envMap.value=E,Is.copy(x),Is.x*=-1,Is.y*=-1,Is.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Is.y*=-1,Is.z*=-1),m.envMapRotation.value.setFromMatrix4(db.makeRotationFromEuler(Is)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=E*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Fn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function fb(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,E){const x=E.program;n.uniformBlockBinding(S,x)}function c(S,E){let x=s[S.id];x===void 0&&(_(S),x=d(S),s[S.id]=x,S.addEventListener("dispose",m));const A=E.program;n.updateUBOMapping(S,A);const C=e.render.frame;r[S.id]!==C&&(h(S),r[S.id]=C)}function d(S){const E=u();S.__bindingPointIndex=E;const x=i.createBuffer(),A=S.__size,C=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,A,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,x),x}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const E=s[S.id],x=S.uniforms,A=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let C=0,P=x.length;C<P;C++){const O=Array.isArray(x[C])?x[C]:[x[C]];for(let b=0,M=O.length;b<M;b++){const D=O[b];if(f(D,C,b,A)===!0){const F=D.__offset,H=Array.isArray(D.value)?D.value:[D.value];let K=0;for(let Z=0;Z<H.length;Z++){const ee=H[Z],ie=v(ee);typeof ee=="number"||typeof ee=="boolean"?(D.__data[0]=ee,i.bufferSubData(i.UNIFORM_BUFFER,F+K,D.__data)):ee.isMatrix3?(D.__data[0]=ee.elements[0],D.__data[1]=ee.elements[1],D.__data[2]=ee.elements[2],D.__data[3]=0,D.__data[4]=ee.elements[3],D.__data[5]=ee.elements[4],D.__data[6]=ee.elements[5],D.__data[7]=0,D.__data[8]=ee.elements[6],D.__data[9]=ee.elements[7],D.__data[10]=ee.elements[8],D.__data[11]=0):(ee.toArray(D.__data,K),K+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,E,x,A){const C=S.value,P=E+"_"+x;if(A[P]===void 0)return typeof C=="number"||typeof C=="boolean"?A[P]=C:A[P]=C.clone(),!0;{const O=A[P];if(typeof C=="number"||typeof C=="boolean"){if(O!==C)return A[P]=C,!0}else if(O.equals(C)===!1)return O.copy(C),!0}return!1}function _(S){const E=S.uniforms;let x=0;const A=16;for(let P=0,O=E.length;P<O;P++){const b=Array.isArray(E[P])?E[P]:[E[P]];for(let M=0,D=b.length;M<D;M++){const F=b[M],H=Array.isArray(F.value)?F.value:[F.value];for(let K=0,Z=H.length;K<Z;K++){const ee=H[K],ie=v(ee),q=x%A,pe=q%ie.boundary,ge=q+pe;x+=pe,ge!==0&&A-ge<ie.storage&&(x+=A-ge),F.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=x,x+=ie.storage}}}const C=x%A;return C>0&&(x+=A-C),S.__size=x,S.__cache={},this}function v(S){const E={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(E.boundary=4,E.storage=4):S.isVector2?(E.boundary=8,E.storage=8):S.isVector3||S.isColor?(E.boundary=16,E.storage=12):S.isVector4?(E.boundary=16,E.storage=16):S.isMatrix3?(E.boundary=48,E.storage=48):S.isMatrix4?(E.boundary=64,E.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),E}function m(S){const E=S.target;E.removeEventListener("dispose",m);const x=a.indexOf(E.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(const S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class pb{constructor(e={}){const{canvas:t=Q0(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const _=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const S=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ps,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let A=!1;this._outputColorSpace=Yt;let C=0,P=0,O=null,b=-1,M=null;const D=new Ct,F=new Ct;let H=null;const K=new st(0);let Z=0,ee=t.width,ie=t.height,q=1,pe=null,ge=null;const $e=new Ct(0,0,ee,ie),rt=new Ct(0,0,ee,ie);let _t=!1;const Et=new Ou;let ht=!1,se=!1;const j=new ot,_e=new R,ye=new Ct,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qe=!1;function xt(){return O===null?q:1}let U=n;function lt(w,V){return t.getContext(w,V)}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${bu}`),t.addEventListener("webglcontextlost",Se,!1),t.addEventListener("webglcontextrestored",be,!1),t.addEventListener("webglcontextcreationerror",ve,!1),U===null){const V="webgl2";if(U=lt(V,w),U===null)throw lt(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Je,je,Ee,et,ze,ct,Jt,Ht,L,T,X,re,fe,ne,ke,le,Fe,oe,Q,Re,He,Xe,Ae,tt;function k(){Je=new TM(U),Je.init(),Xe=new ab(U,Je),je=new _M(U,Je,e,Xe),Ee=new sb(U,Je),je.reversedDepthBuffer&&h&&Ee.buffers.depth.setReversed(!0),et=new AM(U),ze=new $S,ct=new rb(U,Je,Ee,ze,je,Xe,et),Jt=new yM(x),Ht=new bM(x),L=new Dv(U),Ae=new mM(U,L),T=new EM(U,L,et,Ae),X=new CM(U,T,L,et),Q=new RM(U,je,ct),le=new vM(ze),re=new WS(x,Jt,Ht,Je,je,Ae,le),fe=new hb(x,ze),ne=new qS,ke=new QS(Je),oe=new pM(x,Jt,Ht,Ee,X,f,l),Fe=new nb(x,X,je),tt=new fb(U,et,je,Ee),Re=new gM(U,Je,et),He=new wM(U,Je,et),et.programs=re.programs,x.capabilities=je,x.extensions=Je,x.properties=ze,x.renderLists=ne,x.shadowMap=Fe,x.state=Ee,x.info=et}k();const Me=new ub(x,U);this.xr=Me,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const w=Je.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Je.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(w){w!==void 0&&(q=w,this.setSize(ee,ie,!1))},this.getSize=function(w){return w.set(ee,ie)},this.setSize=function(w,V,Y=!0){if(Me.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ee=w,ie=V,t.width=Math.floor(w*q),t.height=Math.floor(V*q),Y===!0&&(t.style.width=w+"px",t.style.height=V+"px"),this.setViewport(0,0,w,V)},this.getDrawingBufferSize=function(w){return w.set(ee*q,ie*q).floor()},this.setDrawingBufferSize=function(w,V,Y){ee=w,ie=V,q=Y,t.width=Math.floor(w*Y),t.height=Math.floor(V*Y),this.setViewport(0,0,w,V)},this.getCurrentViewport=function(w){return w.copy(D)},this.getViewport=function(w){return w.copy($e)},this.setViewport=function(w,V,Y,J){w.isVector4?$e.set(w.x,w.y,w.z,w.w):$e.set(w,V,Y,J),Ee.viewport(D.copy($e).multiplyScalar(q).round())},this.getScissor=function(w){return w.copy(rt)},this.setScissor=function(w,V,Y,J){w.isVector4?rt.set(w.x,w.y,w.z,w.w):rt.set(w,V,Y,J),Ee.scissor(F.copy(rt).multiplyScalar(q).round())},this.getScissorTest=function(){return _t},this.setScissorTest=function(w){Ee.setScissorTest(_t=w)},this.setOpaqueSort=function(w){pe=w},this.setTransparentSort=function(w){ge=w},this.getClearColor=function(w){return w.copy(oe.getClearColor())},this.setClearColor=function(){oe.setClearColor(...arguments)},this.getClearAlpha=function(){return oe.getClearAlpha()},this.setClearAlpha=function(){oe.setClearAlpha(...arguments)},this.clear=function(w=!0,V=!0,Y=!0){let J=0;if(w){let G=!1;if(O!==null){const xe=O.texture.format;G=xe===Iu||xe===Cu||xe===Ru}if(G){const xe=O.texture.type,me=xe===Ei||xe===Bs||xe===ya||xe===xa||xe===Eu||xe===wu,De=oe.getClearColor(),Ne=oe.getClearAlpha(),Ce=De.r,nt=De.g,qe=De.b;me?(_[0]=Ce,_[1]=nt,_[2]=qe,_[3]=Ne,U.clearBufferuiv(U.COLOR,0,_)):(v[0]=Ce,v[1]=nt,v[2]=qe,v[3]=Ne,U.clearBufferiv(U.COLOR,0,v))}else J|=U.COLOR_BUFFER_BIT}V&&(J|=U.DEPTH_BUFFER_BIT),Y&&(J|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Se,!1),t.removeEventListener("webglcontextrestored",be,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),oe.dispose(),ne.dispose(),ke.dispose(),ze.dispose(),Jt.dispose(),Ht.dispose(),X.dispose(),Ae.dispose(),tt.dispose(),re.dispose(),Me.dispose(),Me.removeEventListener("sessionstart",Pe),Me.removeEventListener("sessionend",xs),Nn.stop()};function Se(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function be(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const w=et.autoReset,V=Fe.enabled,Y=Fe.autoUpdate,J=Fe.needsUpdate,G=Fe.type;k(),et.autoReset=w,Fe.enabled=V,Fe.autoUpdate=Y,Fe.needsUpdate=J,Fe.type=G}function ve(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ce(w){const V=w.target;V.removeEventListener("dispose",ce),Ge(V)}function Ge(w){Be(w),ze.remove(w)}function Be(w){const V=ze.get(w).programs;V!==void 0&&(V.forEach(function(Y){re.releaseProgram(Y)}),w.isShaderMaterial&&re.releaseShaderCache(w))}this.renderBufferDirect=function(w,V,Y,J,G,xe){V===null&&(V=Oe);const me=G.isMesh&&G.matrixWorld.determinant()<0,De=uc(w,V,Y,J,G);Ee.setMaterial(J,me);let Ne=Y.index,Ce=1;if(J.wireframe===!0){if(Ne=T.getWireframeAttribute(Y),Ne===void 0)return;Ce=2}const nt=Y.drawRange,qe=Y.attributes.position;let gt=nt.start*Ce,yt=(nt.start+nt.count)*Ce;xe!==null&&(gt=Math.max(gt,xe.start*Ce),yt=Math.min(yt,(xe.start+xe.count)*Ce)),Ne!==null?(gt=Math.max(gt,0),yt=Math.min(yt,Ne.count)):qe!=null&&(gt=Math.max(gt,0),yt=Math.min(yt,qe.count));const Gt=yt-gt;if(Gt<0||Gt===1/0)return;Ae.setup(G,J,De,Y,Ne);let Ze,Tt=Re;if(Ne!==null&&(Ze=L.get(Ne),Tt=He,Tt.setIndex(Ze)),G.isMesh)J.wireframe===!0?(Ee.setLineWidth(J.wireframeLinewidth*xt()),Tt.setMode(U.LINES)):Tt.setMode(U.TRIANGLES);else if(G.isLine){let Ye=J.linewidth;Ye===void 0&&(Ye=1),Ee.setLineWidth(Ye*xt()),G.isLineSegments?Tt.setMode(U.LINES):G.isLineLoop?Tt.setMode(U.LINE_LOOP):Tt.setMode(U.LINE_STRIP)}else G.isPoints?Tt.setMode(U.POINTS):G.isSprite&&Tt.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)wa("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Tt.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(Je.get("WEBGL_multi_draw"))Tt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Ye=G._multiDrawStarts,Ft=G._multiDrawCounts,St=G._multiDrawCount,ln=Ne?L.get(Ne).bytesPerElement:1,Mi=ze.get(J).currentProgram.getUniforms();for(let vn=0;vn<St;vn++)Mi.setValue(U,"_gl_DrawID",vn),Tt.render(Ye[vn]/ln,Ft[vn])}else if(G.isInstancedMesh)Tt.renderInstances(gt,Gt,G.count);else if(Y.isInstancedBufferGeometry){const Ye=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ft=Math.min(Y.instanceCount,Ye);Tt.renderInstances(gt,Gt,Ft)}else Tt.render(gt,Gt)};function wt(w,V,Y){w.transparent===!0&&w.side===ci&&w.forceSinglePass===!1?(w.side=Fn,w.needsUpdate=!0,qi(w,V,Y),w.side=Wi,w.needsUpdate=!0,qi(w,V,Y),w.side=ci):qi(w,V,Y)}this.compile=function(w,V,Y=null){Y===null&&(Y=w),p=ke.get(Y),p.init(V),E.push(p),Y.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),w!==Y&&w.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),p.setupLights();const J=new Set;return w.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const xe=G.material;if(xe)if(Array.isArray(xe))for(let me=0;me<xe.length;me++){const De=xe[me];wt(De,Y,G),J.add(De)}else wt(xe,Y,G),J.add(xe)}),p=E.pop(),J},this.compileAsync=function(w,V,Y=null){const J=this.compile(w,V,Y);return new Promise(G=>{function xe(){if(J.forEach(function(me){ze.get(me).currentProgram.isReady()&&J.delete(me)}),J.size===0){G(w);return}setTimeout(xe,10)}Je.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Le=null;function Mt(w){Le&&Le(w)}function Pe(){Nn.stop()}function xs(){Nn.start()}const Nn=new Cp;Nn.setAnimationLoop(Mt),typeof self<"u"&&Nn.setContext(self),this.setAnimationLoop=function(w){Le=w,Me.setAnimationLoop(w),w===null?Nn.stop():Nn.start()},Me.addEventListener("sessionstart",Pe),Me.addEventListener("sessionend",xs),this.render=function(w,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Me.enabled===!0&&Me.isPresenting===!0&&(Me.cameraAutoUpdate===!0&&Me.updateCamera(V),V=Me.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,V,O),p=ke.get(w,E.length),p.init(V),E.push(p),j.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),Et.setFromProjectionMatrix(j,Ti,V.reversedDepth),se=this.localClippingEnabled,ht=le.init(this.clippingPlanes,se),m=ne.get(w,S.length),m.init(),S.push(m),Me.enabled===!0&&Me.isPresenting===!0){const xe=x.xr.getDepthSensingMesh();xe!==null&&xi(xe,V,-1/0,x.sortObjects)}xi(w,V,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(pe,ge),Qe=Me.enabled===!1||Me.isPresenting===!1||Me.hasDepthSensing()===!1,Qe&&oe.addToRenderList(m,w),this.info.render.frame++,ht===!0&&le.beginShadows();const Y=p.state.shadowsArray;Fe.render(Y,w,V),ht===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=m.opaque,G=m.transmissive;if(p.setupLights(),V.isArrayCamera){const xe=V.cameras;if(G.length>0)for(let me=0,De=xe.length;me<De;me++){const Ne=xe[me];Or(J,G,w,Ne)}Qe&&oe.render(w);for(let me=0,De=xe.length;me<De;me++){const Ne=xe[me];Ua(m,w,Ne,Ne.viewport)}}else G.length>0&&Or(J,G,w,V),Qe&&oe.render(w),Ua(m,w,V);O!==null&&P===0&&(ct.updateMultisampleRenderTarget(O),ct.updateRenderTargetMipmap(O)),w.isScene===!0&&w.onAfterRender(x,w,V),Ae.resetDefaultState(),b=-1,M=null,E.pop(),E.length>0?(p=E[E.length-1],ht===!0&&le.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function xi(w,V,Y,J){if(w.visible===!1)return;if(w.layers.test(V.layers)){if(w.isGroup)Y=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(V);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Et.intersectsSprite(w)){J&&ye.setFromMatrixPosition(w.matrixWorld).applyMatrix4(j);const me=X.update(w),De=w.material;De.visible&&m.push(w,me,De,Y,ye.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Et.intersectsObject(w))){const me=X.update(w),De=w.material;if(J&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ye.copy(w.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),ye.copy(me.boundingSphere.center)),ye.applyMatrix4(w.matrixWorld).applyMatrix4(j)),Array.isArray(De)){const Ne=me.groups;for(let Ce=0,nt=Ne.length;Ce<nt;Ce++){const qe=Ne[Ce],gt=De[qe.materialIndex];gt&&gt.visible&&m.push(w,me,gt,Y,ye.z,qe)}}else De.visible&&m.push(w,me,De,Y,ye.z,null)}}const xe=w.children;for(let me=0,De=xe.length;me<De;me++)xi(xe[me],V,Y,J)}function Ua(w,V,Y,J){const G=w.opaque,xe=w.transmissive,me=w.transparent;p.setupLightsView(Y),ht===!0&&le.setGlobalState(x.clippingPlanes,Y),J&&Ee.viewport(D.copy(J)),G.length>0&&Qn(G,V,Y),xe.length>0&&Qn(xe,V,Y),me.length>0&&Qn(me,V,Y),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function Or(w,V,Y,J){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new zs(1,1,{generateMipmaps:!0,type:Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float")?Ia:Ei,minFilter:zi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:bt.workingColorSpace}));const xe=p.state.transmissionRenderTarget[J.id],me=J.viewport||D;xe.setSize(me.z*x.transmissionResolutionScale,me.w*x.transmissionResolutionScale);const De=x.getRenderTarget(),Ne=x.getActiveCubeFace(),Ce=x.getActiveMipmapLevel();x.setRenderTarget(xe),x.getClearColor(K),Z=x.getClearAlpha(),Z<1&&x.setClearColor(16777215,.5),x.clear(),Qe&&oe.render(Y);const nt=x.toneMapping;x.toneMapping=ps;const qe=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),ht===!0&&le.setGlobalState(x.clippingPlanes,J),Qn(w,Y,J),ct.updateMultisampleRenderTarget(xe),ct.updateRenderTargetMipmap(xe),Je.has("WEBGL_multisampled_render_to_texture")===!1){let gt=!1;for(let yt=0,Gt=V.length;yt<Gt;yt++){const Ze=V[yt],Tt=Ze.object,Ye=Ze.geometry,Ft=Ze.material,St=Ze.group;if(Ft.side===ci&&Tt.layers.test(J.layers)){const ln=Ft.side;Ft.side=Fn,Ft.needsUpdate=!0,Ms(Tt,Y,J,Ye,Ft,St),Ft.side=ln,Ft.needsUpdate=!0,gt=!0}}gt===!0&&(ct.updateMultisampleRenderTarget(xe),ct.updateRenderTargetMipmap(xe))}x.setRenderTarget(De,Ne,Ce),x.setClearColor(K,Z),qe!==void 0&&(J.viewport=qe),x.toneMapping=nt}function Qn(w,V,Y){const J=V.isScene===!0?V.overrideMaterial:null;for(let G=0,xe=w.length;G<xe;G++){const me=w[G],De=me.object,Ne=me.geometry,Ce=me.group;let nt=me.material;nt.allowOverride===!0&&J!==null&&(nt=J),De.layers.test(Y.layers)&&Ms(De,V,Y,Ne,nt,Ce)}}function Ms(w,V,Y,J,G,xe){w.onBeforeRender(x,V,Y,J,G,xe),w.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),G.onBeforeRender(x,V,Y,J,w,xe),G.transparent===!0&&G.side===ci&&G.forceSinglePass===!1?(G.side=Fn,G.needsUpdate=!0,x.renderBufferDirect(Y,V,J,G,w,xe),G.side=Wi,G.needsUpdate=!0,x.renderBufferDirect(Y,V,J,G,w,xe),G.side=ci):x.renderBufferDirect(Y,V,J,G,w,xe),w.onAfterRender(x,V,Y,J,G,xe)}function qi(w,V,Y){V.isScene!==!0&&(V=Oe);const J=ze.get(w),G=p.state.lights,xe=p.state.shadowsArray,me=G.state.version,De=re.getParameters(w,G.state,xe,V,Y),Ne=re.getProgramCacheKey(De);let Ce=J.programs;J.environment=w.isMeshStandardMaterial?V.environment:null,J.fog=V.fog,J.envMap=(w.isMeshStandardMaterial?Ht:Jt).get(w.envMap||J.environment),J.envMapRotation=J.environment!==null&&w.envMap===null?V.environmentRotation:w.envMapRotation,Ce===void 0&&(w.addEventListener("dispose",ce),Ce=new Map,J.programs=Ce);let nt=Ce.get(Ne);if(nt!==void 0){if(J.currentProgram===nt&&J.lightsStateVersion===me)return Un(w,De),nt}else De.uniforms=re.getUniforms(w),w.onBeforeCompile(De,x),nt=re.acquireProgram(De,Ne),Ce.set(Ne,nt),J.uniforms=De.uniforms;const qe=J.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(qe.clippingPlanes=le.uniform),Un(w,De),J.needsLights=mt(w),J.lightsStateVersion=me,J.needsLights&&(qe.ambientLightColor.value=G.state.ambient,qe.lightProbe.value=G.state.probe,qe.directionalLights.value=G.state.directional,qe.directionalLightShadows.value=G.state.directionalShadow,qe.spotLights.value=G.state.spot,qe.spotLightShadows.value=G.state.spotShadow,qe.rectAreaLights.value=G.state.rectArea,qe.ltc_1.value=G.state.rectAreaLTC1,qe.ltc_2.value=G.state.rectAreaLTC2,qe.pointLights.value=G.state.point,qe.pointLightShadows.value=G.state.pointShadow,qe.hemisphereLights.value=G.state.hemi,qe.directionalShadowMap.value=G.state.directionalShadowMap,qe.directionalShadowMatrix.value=G.state.directionalShadowMatrix,qe.spotShadowMap.value=G.state.spotShadowMap,qe.spotLightMatrix.value=G.state.spotLightMatrix,qe.spotLightMap.value=G.state.spotLightMap,qe.pointShadowMap.value=G.state.pointShadowMap,qe.pointShadowMatrix.value=G.state.pointShadowMatrix),J.currentProgram=nt,J.uniformsList=null,nt}function kn(w){if(w.uniformsList===null){const V=w.currentProgram.getUniforms();w.uniformsList=ko.seqWithValue(V.seq,w.uniforms)}return w.uniformsList}function Un(w,V){const Y=ze.get(w);Y.outputColorSpace=V.outputColorSpace,Y.batching=V.batching,Y.batchingColor=V.batchingColor,Y.instancing=V.instancing,Y.instancingColor=V.instancingColor,Y.instancingMorph=V.instancingMorph,Y.skinning=V.skinning,Y.morphTargets=V.morphTargets,Y.morphNormals=V.morphNormals,Y.morphColors=V.morphColors,Y.morphTargetsCount=V.morphTargetsCount,Y.numClippingPlanes=V.numClippingPlanes,Y.numIntersection=V.numClipIntersection,Y.vertexAlphas=V.vertexAlphas,Y.vertexTangents=V.vertexTangents,Y.toneMapping=V.toneMapping}function uc(w,V,Y,J,G){V.isScene!==!0&&(V=Oe),ct.resetTextureUnits();const xe=V.fog,me=J.isMeshStandardMaterial?V.environment:null,De=O===null?x.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Dn,Ne=(J.isMeshStandardMaterial?Ht:Jt).get(J.envMap||me),Ce=J.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,nt=!!Y.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),qe=!!Y.morphAttributes.position,gt=!!Y.morphAttributes.normal,yt=!!Y.morphAttributes.color;let Gt=ps;J.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Gt=x.toneMapping);const Ze=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Tt=Ze!==void 0?Ze.length:0,Ye=ze.get(J),Ft=p.state.lights;if(ht===!0&&(se===!0||w!==M)){const Qt=w===M&&J.id===b;le.setState(J,w,Qt)}let St=!1;J.version===Ye.__version?(Ye.needsLights&&Ye.lightsStateVersion!==Ft.state.version||Ye.outputColorSpace!==De||G.isBatchedMesh&&Ye.batching===!1||!G.isBatchedMesh&&Ye.batching===!0||G.isBatchedMesh&&Ye.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Ye.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Ye.instancing===!1||!G.isInstancedMesh&&Ye.instancing===!0||G.isSkinnedMesh&&Ye.skinning===!1||!G.isSkinnedMesh&&Ye.skinning===!0||G.isInstancedMesh&&Ye.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ye.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ye.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ye.instancingMorph===!1&&G.morphTexture!==null||Ye.envMap!==Ne||J.fog===!0&&Ye.fog!==xe||Ye.numClippingPlanes!==void 0&&(Ye.numClippingPlanes!==le.numPlanes||Ye.numIntersection!==le.numIntersection)||Ye.vertexAlphas!==Ce||Ye.vertexTangents!==nt||Ye.morphTargets!==qe||Ye.morphNormals!==gt||Ye.morphColors!==yt||Ye.toneMapping!==Gt||Ye.morphTargetsCount!==Tt)&&(St=!0):(St=!0,Ye.__version=J.version);let ln=Ye.currentProgram;St===!0&&(ln=qi(J,V,G));let Mi=!1,vn=!1,Yi=!1;const kt=ln.getUniforms(),On=Ye.uniforms;if(Ee.useProgram(ln.program)&&(Mi=!0,vn=!0,Yi=!0),J.id!==b&&(b=J.id,vn=!0),Mi||M!==w){Ee.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),kt.setValue(U,"projectionMatrix",w.projectionMatrix),kt.setValue(U,"viewMatrix",w.matrixWorldInverse);const xn=kt.map.cameraPosition;xn!==void 0&&xn.setValue(U,_e.setFromMatrixPosition(w.matrixWorld)),je.logarithmicDepthBuffer&&kt.setValue(U,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&kt.setValue(U,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,vn=!0,Yi=!0)}if(G.isSkinnedMesh){kt.setOptional(U,G,"bindMatrix"),kt.setOptional(U,G,"bindMatrixInverse");const Qt=G.skeleton;Qt&&(Qt.boneTexture===null&&Qt.computeBoneTexture(),kt.setValue(U,"boneTexture",Qt.boneTexture,ct))}G.isBatchedMesh&&(kt.setOptional(U,G,"batchingTexture"),kt.setValue(U,"batchingTexture",G._matricesTexture,ct),kt.setOptional(U,G,"batchingIdTexture"),kt.setValue(U,"batchingIdTexture",G._indirectTexture,ct),kt.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&kt.setValue(U,"batchingColorTexture",G._colorsTexture,ct));const yn=Y.morphAttributes;if((yn.position!==void 0||yn.normal!==void 0||yn.color!==void 0)&&Q.update(G,Y,ln),(vn||Ye.receiveShadow!==G.receiveShadow)&&(Ye.receiveShadow=G.receiveShadow,kt.setValue(U,"receiveShadow",G.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(On.envMap.value=Ne,On.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&V.environment!==null&&(On.envMapIntensity.value=V.environmentIntensity),vn&&(kt.setValue(U,"toneMappingExposure",x.toneMappingExposure),Ye.needsLights&&Vt(On,Yi),xe&&J.fog===!0&&fe.refreshFogUniforms(On,xe),fe.refreshMaterialUniforms(On,J,q,ie,p.state.transmissionRenderTarget[w.id]),ko.upload(U,kn(Ye),On,ct)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(ko.upload(U,kn(Ye),On,ct),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&kt.setValue(U,"center",G.center),kt.setValue(U,"modelViewMatrix",G.modelViewMatrix),kt.setValue(U,"normalMatrix",G.normalMatrix),kt.setValue(U,"modelMatrix",G.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Qt=J.uniformsGroups;for(let xn=0,Hs=Qt.length;xn<Hs;xn++){const Gn=Qt[xn];tt.update(Gn,ln),tt.bind(Gn,ln)}}return ln}function Vt(w,V){w.ambientLightColor.needsUpdate=V,w.lightProbe.needsUpdate=V,w.directionalLights.needsUpdate=V,w.directionalLightShadows.needsUpdate=V,w.pointLights.needsUpdate=V,w.pointLightShadows.needsUpdate=V,w.spotLights.needsUpdate=V,w.spotLightShadows.needsUpdate=V,w.rectAreaLights.needsUpdate=V,w.hemisphereLights.needsUpdate=V}function mt(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(w,V,Y){const J=ze.get(w);J.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),ze.get(w.texture).__webglTexture=V,ze.get(w.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:Y,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,V){const Y=ze.get(w);Y.__webglFramebuffer=V,Y.__useDefaultFramebuffer=V===void 0};const sn=U.createFramebuffer();this.setRenderTarget=function(w,V=0,Y=0){O=w,C=V,P=Y;let J=!0,G=null,xe=!1,me=!1;if(w){const Ne=ze.get(w);if(Ne.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(U.FRAMEBUFFER,null),J=!1;else if(Ne.__webglFramebuffer===void 0)ct.setupRenderTarget(w);else if(Ne.__hasExternalTextures)ct.rebindTextures(w,ze.get(w.texture).__webglTexture,ze.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const qe=w.depthTexture;if(Ne.__boundDepthTexture!==qe){if(qe!==null&&ze.has(qe)&&(w.width!==qe.image.width||w.height!==qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ct.setupDepthRenderbuffer(w)}}const Ce=w.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(me=!0);const nt=ze.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(nt[V])?G=nt[V][Y]:G=nt[V],xe=!0):w.samples>0&&ct.useMultisampledRTT(w)===!1?G=ze.get(w).__webglMultisampledFramebuffer:Array.isArray(nt)?G=nt[Y]:G=nt,D.copy(w.viewport),F.copy(w.scissor),H=w.scissorTest}else D.copy($e).multiplyScalar(q).floor(),F.copy(rt).multiplyScalar(q).floor(),H=_t;if(Y!==0&&(G=sn),Ee.bindFramebuffer(U.FRAMEBUFFER,G)&&J&&Ee.drawBuffers(w,G),Ee.viewport(D),Ee.scissor(F),Ee.setScissorTest(H),xe){const Ne=ze.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+V,Ne.__webglTexture,Y)}else if(me){const Ne=V;for(let Ce=0;Ce<w.textures.length;Ce++){const nt=ze.get(w.textures[Ce]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ce,nt.__webglTexture,Y,Ne)}}else if(w!==null&&Y!==0){const Ne=ze.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ne.__webglTexture,Y)}b=-1},this.readRenderTargetPixels=function(w,V,Y,J,G,xe,me,De=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=ze.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&me!==void 0&&(Ne=Ne[me]),Ne){Ee.bindFramebuffer(U.FRAMEBUFFER,Ne);try{const Ce=w.textures[De],nt=Ce.format,qe=Ce.type;if(!je.textureFormatReadable(nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!je.textureTypeReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=w.width-J&&Y>=0&&Y<=w.height-G&&(w.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+De),U.readPixels(V,Y,J,G,Xe.convert(nt),Xe.convert(qe),xe))}finally{const Ce=O!==null?ze.get(O).__webglFramebuffer:null;Ee.bindFramebuffer(U.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(w,V,Y,J,G,xe,me,De=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=ze.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&me!==void 0&&(Ne=Ne[me]),Ne)if(V>=0&&V<=w.width-J&&Y>=0&&Y<=w.height-G){Ee.bindFramebuffer(U.FRAMEBUFFER,Ne);const Ce=w.textures[De],nt=Ce.format,qe=Ce.type;if(!je.textureFormatReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!je.textureTypeReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const gt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,gt),U.bufferData(U.PIXEL_PACK_BUFFER,xe.byteLength,U.STREAM_READ),w.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+De),U.readPixels(V,Y,J,G,Xe.convert(nt),Xe.convert(qe),0);const yt=O!==null?ze.get(O).__webglFramebuffer:null;Ee.bindFramebuffer(U.FRAMEBUFFER,yt);const Gt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await e_(U,Gt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,gt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,xe),U.deleteBuffer(gt),U.deleteSync(Gt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,V=null,Y=0){const J=Math.pow(2,-Y),G=Math.floor(w.image.width*J),xe=Math.floor(w.image.height*J),me=V!==null?V.x:0,De=V!==null?V.y:0;ct.setTexture2D(w,0),U.copyTexSubImage2D(U.TEXTURE_2D,Y,0,0,me,De,G,xe),Ee.unbindTexture()};const ei=U.createFramebuffer(),Oa=U.createFramebuffer();this.copyTextureToTexture=function(w,V,Y=null,J=null,G=0,xe=null){xe===null&&(G!==0?(wa("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),xe=G,G=0):xe=0);let me,De,Ne,Ce,nt,qe,gt,yt,Gt;const Ze=w.isCompressedTexture?w.mipmaps[xe]:w.image;if(Y!==null)me=Y.max.x-Y.min.x,De=Y.max.y-Y.min.y,Ne=Y.isBox3?Y.max.z-Y.min.z:1,Ce=Y.min.x,nt=Y.min.y,qe=Y.isBox3?Y.min.z:0;else{const yn=Math.pow(2,-G);me=Math.floor(Ze.width*yn),De=Math.floor(Ze.height*yn),w.isDataArrayTexture?Ne=Ze.depth:w.isData3DTexture?Ne=Math.floor(Ze.depth*yn):Ne=1,Ce=0,nt=0,qe=0}J!==null?(gt=J.x,yt=J.y,Gt=J.z):(gt=0,yt=0,Gt=0);const Tt=Xe.convert(V.format),Ye=Xe.convert(V.type);let Ft;V.isData3DTexture?(ct.setTexture3D(V,0),Ft=U.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(ct.setTexture2DArray(V,0),Ft=U.TEXTURE_2D_ARRAY):(ct.setTexture2D(V,0),Ft=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,V.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,V.unpackAlignment);const St=U.getParameter(U.UNPACK_ROW_LENGTH),ln=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Mi=U.getParameter(U.UNPACK_SKIP_PIXELS),vn=U.getParameter(U.UNPACK_SKIP_ROWS),Yi=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,Ze.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ze.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ce),U.pixelStorei(U.UNPACK_SKIP_ROWS,nt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,qe);const kt=w.isDataArrayTexture||w.isData3DTexture,On=V.isDataArrayTexture||V.isData3DTexture;if(w.isDepthTexture){const yn=ze.get(w),Qt=ze.get(V),xn=ze.get(yn.__renderTarget),Hs=ze.get(Qt.__renderTarget);Ee.bindFramebuffer(U.READ_FRAMEBUFFER,xn.__webglFramebuffer),Ee.bindFramebuffer(U.DRAW_FRAMEBUFFER,Hs.__webglFramebuffer);for(let Gn=0;Gn<Ne;Gn++)kt&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ze.get(w).__webglTexture,G,qe+Gn),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ze.get(V).__webglTexture,xe,Gt+Gn)),U.blitFramebuffer(Ce,nt,me,De,gt,yt,me,De,U.DEPTH_BUFFER_BIT,U.NEAREST);Ee.bindFramebuffer(U.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(G!==0||w.isRenderTargetTexture||ze.has(w)){const yn=ze.get(w),Qt=ze.get(V);Ee.bindFramebuffer(U.READ_FRAMEBUFFER,ei),Ee.bindFramebuffer(U.DRAW_FRAMEBUFFER,Oa);for(let xn=0;xn<Ne;xn++)kt?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,yn.__webglTexture,G,qe+xn):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,yn.__webglTexture,G),On?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Qt.__webglTexture,xe,Gt+xn):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Qt.__webglTexture,xe),G!==0?U.blitFramebuffer(Ce,nt,me,De,gt,yt,me,De,U.COLOR_BUFFER_BIT,U.NEAREST):On?U.copyTexSubImage3D(Ft,xe,gt,yt,Gt+xn,Ce,nt,me,De):U.copyTexSubImage2D(Ft,xe,gt,yt,Ce,nt,me,De);Ee.bindFramebuffer(U.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else On?w.isDataTexture||w.isData3DTexture?U.texSubImage3D(Ft,xe,gt,yt,Gt,me,De,Ne,Tt,Ye,Ze.data):V.isCompressedArrayTexture?U.compressedTexSubImage3D(Ft,xe,gt,yt,Gt,me,De,Ne,Tt,Ze.data):U.texSubImage3D(Ft,xe,gt,yt,Gt,me,De,Ne,Tt,Ye,Ze):w.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,xe,gt,yt,me,De,Tt,Ye,Ze.data):w.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,xe,gt,yt,Ze.width,Ze.height,Tt,Ze.data):U.texSubImage2D(U.TEXTURE_2D,xe,gt,yt,me,De,Tt,Ye,Ze);U.pixelStorei(U.UNPACK_ROW_LENGTH,St),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ln),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Mi),U.pixelStorei(U.UNPACK_SKIP_ROWS,vn),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Yi),xe===0&&V.generateMipmaps&&U.generateMipmap(Ft),Ee.unbindTexture()},this.initRenderTarget=function(w){ze.get(w).__webglFramebuffer===void 0&&ct.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?ct.setTextureCube(w,0):w.isData3DTexture?ct.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?ct.setTexture2DArray(w,0):ct.setTexture2D(w,0),Ee.unbindTexture()},this.resetState=function(){C=0,P=0,O=null,Ee.reset(),Ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=bt._getDrawingBufferColorSpace(e),t.unpackColorSpace=bt._getUnpackColorSpace()}}function tf(i,e){if(e===w0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===iu||e===ip){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===iu)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class mb extends Dr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new xb(t)}),this.register(function(t){return new Mb(t)}),this.register(function(t){return new Ib(t)}),this.register(function(t){return new Pb(t)}),this.register(function(t){return new Lb(t)}),this.register(function(t){return new bb(t)}),this.register(function(t){return new Tb(t)}),this.register(function(t){return new Eb(t)}),this.register(function(t){return new wb(t)}),this.register(function(t){return new yb(t)}),this.register(function(t){return new Ab(t)}),this.register(function(t){return new Sb(t)}),this.register(function(t){return new Cb(t)}),this.register(function(t){return new Rb(t)}),this.register(function(t){return new _b(t)}),this.register(function(t){return new Db(t)}),this.register(function(t){return new Nb(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=ma.extractUrlBase(e);a=ma.resolveURL(c,this.path)}else a=ma.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Rp(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(d){t(d),r.manager.itemEnd(e)},o)}catch(d){o(d)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Np){try{a[vt.KHR_BINARY_GLTF]=new Ub(e)}catch(u){s&&s(u);return}r=JSON.parse(a[vt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Yb(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const u=this.pluginCallbacks[d](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let d=0;d<r.extensionsUsed.length;++d){const u=r.extensionsUsed[d],h=r.extensionsRequired||[];switch(u){case vt.KHR_MATERIALS_UNLIT:a[u]=new vb;break;case vt.KHR_DRACO_MESH_COMPRESSION:a[u]=new Ob(r,this.dracoLoader);break;case vt.KHR_TEXTURE_TRANSFORM:a[u]=new Fb;break;case vt.KHR_MESH_QUANTIZATION:a[u]=new kb;break;default:h.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function gb(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const vt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class _b{constructor(e){this.parser=e,this.name=vt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const d=new st(16777215);l.color!==void 0&&d.setRGB(l.color[0],l.color[1],l.color[2],Dn);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new cu(d),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new vv(d),c.distance=u;break;case"spot":c=new gv(d),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Si(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class vb{constructor(){this.name=vt.KHR_MATERIALS_UNLIT}getMaterialType(){return Jn}extendParams(e,t,n){const s=[];e.color=new st(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Dn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Yt))}return Promise.all(s)}}class yb{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class xb{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new We(o,o)}return Promise.all(r)}}class Mb{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ai}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Sb{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class bb{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new st(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Dn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Yt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class Tb{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class Eb{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new st().setRGB(o[0],o[1],o[2],Dn),Promise.all(r)}}class wb{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ai}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Ab{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new st().setRGB(o[0],o[1],o[2],Dn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Yt)),Promise.all(r)}}class Rb{constructor(e){this.parser=e,this.name=vt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class Cb{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class Ib{constructor(e){this.parser=e,this.name=vt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class Pb{constructor(e){this.parser=e,this.name=vt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class Lb{constructor(e){this.parser=e,this.name=vt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class Db{constructor(e){this.name=vt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,d=s.count,u=s.byteStride,h=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(d,u,h,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(d*u);return a.decodeGltfBuffer(new Uint8Array(f),d,u,h,s.mode,s.filter),f})})}else return null}}class Nb{constructor(e){this.name=vt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==qn.TRIANGLES&&c.mode!==qn.TRIANGLE_STRIP&&c.mode!==qn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(d=>(l[c]=d,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const d=c.pop(),u=d.isGroup?d.children:[d],h=c[0].count,f=[];for(const _ of u){const v=new ot,m=new R,p=new it,S=new R(1,1,1),E=new yp(_.geometry,_.material,h);for(let x=0;x<h;x++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,x),l.SCALE&&S.fromBufferAttribute(l.SCALE,x),E.setMatrixAt(x,v.compose(m,p,S));for(const x in l)if(x==="_COLOR_0"){const A=l[x];E.instanceColor=new ru(A.array,A.itemSize,A.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&_.geometry.setAttribute(x,l[x]);zt.prototype.copy.call(E,_),this.parser.assignFinalMaterial(E),f.push(E)}return d.isGroup?(d.clear(),d.add(...f),d):f[0]}))}}const Np="glTF",sa=12,nf={JSON:1313821514,BIN:5130562};class Ub{constructor(e){this.name=vt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,sa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Np)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-sa,r=new DataView(e,sa);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===nf.JSON){const c=new Uint8Array(e,sa+a,o);this.content=n.decode(c)}else if(l===nf.BIN){const c=sa+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Ob{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=vt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const d in a){const u=du[d]||d.toLowerCase();o[u]=a[d]}for(const d in e.attributes){const u=du[d]||d.toLowerCase();if(a[d]!==void 0){const h=n.accessors[e.attributes[d]],f=gr[h.componentType];c[u]=f.name,l[u]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(d){return new Promise(function(u,h){s.decodeDracoFile(d,function(f){for(const _ in f.attributes){const v=f.attributes[_],m=l[_];m!==void 0&&(v.normalized=m)}u(f)},o,c,Dn,h)})})}}class Fb{constructor(){this.name=vt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class kb{constructor(){this.name=vt.KHR_MESH_QUANTIZATION}}class Up extends Da{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,d=s-t,u=(n-t)/d,h=u*u,f=h*u,_=e*c,v=_-c,m=-2*f+3*h,p=f-h,S=1-m,E=p-h+u;for(let x=0;x!==o;x++){const A=a[v+x+o],C=a[v+x+l]*d,P=a[_+x+o],O=a[_+x]*d;r[x]=S*A+E*C+m*P+p*O}return r}}const Bb=new it;class zb extends Up{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return Bb.fromArray(r).normalize().toArray(r),r}}const qn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},gr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},sf={9728:Pn,9729:Hn,9984:Kf,9985:Do,9986:oa,9987:zi},rf={33071:hs,33648:Wo,10497:Tr},cl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},du={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},os={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Hb={CUBICSPLINE:void 0,LINEAR:Ta,STEP:ba},ll={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Vb(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new rn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Wi})),i.DefaultMaterial}function Ps(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Si(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Gb(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,d=e.length;c<d;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],l=[];for(let c=0,d=e.length;c<d;c++){const u=e[c];if(n){const h=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(h)}if(s){const h=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(h)}if(r){const h=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(h)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const d=c[0],u=c[1],h=c[2];return n&&(i.morphAttributes.position=d),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function Wb(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function $b(i){let e;const t=i.extensions&&i.extensions[vt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ul(t.attributes):e=i.indices+":"+ul(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+ul(i.targets[n]);return e}function ul(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function hu(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Xb(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const qb=new ot;class Yb{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new gb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new fv(this.options.manager):this.textureLoader=new xv(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Rp(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Ps(r,o,s),Si(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,d]of a.children.entries())r(d,o.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[vt.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(ma.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=cl[s.type],o=gr[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new Ln(c,a,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=cl[s.type],c=gr[s.componentType],d=c.BYTES_PER_ELEMENT,u=d*l,h=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,_=s.normalized===!0;let v,m;if(f&&f!==u){const p=Math.floor(h/f),S="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let E=t.cache.get(S);E||(v=new c(o,p*f,s.count*f/d),E=new pp(v,f/d),t.cache.add(S,E)),m=new Aa(E,l,h%f/d,_)}else o===null?v=new c(s.count*l):v=new c(o,h,s.count*l),m=new Ln(v,l,_);if(s.sparse!==void 0){const p=cl.SCALAR,S=gr[s.sparse.indices.componentType],E=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,A=new S(a[1],E,s.sparse.count*p),C=new c(a[2],x,s.sparse.count*l);o!==null&&(m=new Ln(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let P=0,O=A.length;P<O;P++){const b=A[P];if(m.setX(b,C[P*l]),l>=2&&m.setY(b,C[P*l+1]),l>=3&&m.setZ(b,C[P*l+2]),l>=4&&m.setW(b,C[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(d){d.flipY=!1,d.name=a.name||o.name||"",d.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(d.name=o.uri);const h=(r.samplers||{})[a.sampler]||{};return d.magFilter=sf[h.magFilter]||Hn,d.minFilter=sf[h.minFilter]||zi,d.wrapS=rf[h.wrapS]||Tr,d.wrapT=rf[h.wrapT]||Tr,d.generateMipmaps=!d.isCompressedTexture&&d.minFilter!==Pn&&d.minFilter!==Hn,s.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const h=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(h),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const d=Promise.resolve(l).then(function(u){return new Promise(function(h,f){let _=h;t.isImageBitmapLoader===!0&&(_=function(v){const m=new an(v);m.needsUpdate=!0,h(m)}),t.load(ma.resolveURL(u,r.path),_,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Si(u,a),u.userData.mimeType=a.mimeType||Xb(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=d,d}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[vt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[vt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[vt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Mp,mi.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new xp,mi.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return rn}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[vt.KHR_MATERIALS_UNLIT]){const u=s[vt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new st(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const h=u.baseColorFactor;o.color.setRGB(h[0],h[1],h[2],Dn),o.opacity=h[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,Yt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=ci);const d=r.alphaMode||ll.OPAQUE;if(d===ll.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,d===ll.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Jn&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new We(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Jn&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Jn){const u=r.emissiveFactor;o.emissive=new st().setRGB(u[0],u[1],u[2],Dn)}return r.emissiveTexture!==void 0&&a!==Jn&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Yt)),Promise.all(c).then(function(){const u=new a(o);return r.name&&(u.name=r.name),Si(u,r),t.associations.set(u,{materials:e}),r.extensions&&Ps(s,u,r),u})}createUniqueName(e){const t=Lt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[vt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return af(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],d=$b(c),u=s[d];if(u)a.push(u.promise);else{let h;c.extensions&&c.extensions[vt.KHR_DRACO_MESH_COMPRESSION]?h=r(c):h=af(new pn,c,t),s[d]={primitive:c,promise:h},a.push(h)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const d=a[l].material===void 0?Vb(this.cache):this.getDependency("material",a[l].material);o.push(d)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),d=l[l.length-1],u=[];for(let f=0,_=d.length;f<_;f++){const v=d[f],m=a[f];let p;const S=c[f];if(m.mode===qn.TRIANGLES||m.mode===qn.TRIANGLE_STRIP||m.mode===qn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new R_(v,S):new It(v,S),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===qn.TRIANGLE_STRIP?p.geometry=tf(p.geometry,ip):m.mode===qn.TRIANGLE_FAN&&(p.geometry=tf(p.geometry,iu));else if(m.mode===qn.LINES)p=new N_(v,S);else if(m.mode===qn.LINE_STRIP)p=new Fu(v,S);else if(m.mode===qn.LINE_LOOP)p=new U_(v,S);else if(m.mode===qn.POINTS)p=new O_(v,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Wb(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Si(p,r),m.extensions&&Ps(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,_=u.length;f<_;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Ps(s,u[0],r),u[0];const h=new qt;r.extensions&&Ps(s,h,r),t.associations.set(h,{meshes:e});for(let f=0,_=u.length;f<_;f++)h.add(u[f]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Cn(ls.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Wu(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Si(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],l=[];for(let c=0,d=a.length;c<d;c++){const u=a[c];if(u){o.push(u);const h=new ot;r!==null&&h.fromArray(r.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Uu(o,l)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],d=[];for(let u=0,h=s.channels.length;u<h;u++){const f=s.channels[u],_=s.samplers[f.sampler],v=f.target,m=v.node,p=s.parameters!==void 0?s.parameters[_.input]:_.input,S=s.parameters!==void 0?s.parameters[_.output]:_.output;v.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",S)),c.push(_),d.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(d)]).then(function(u){const h=u[0],f=u[1],_=u[2],v=u[3],m=u[4],p=[];for(let E=0,x=h.length;E<x;E++){const A=h[E],C=f[E],P=_[E],O=v[E],b=m[E];if(A===void 0)continue;A.updateMatrix&&A.updateMatrix();const M=n._createAnimationTracks(A,C,P,O,b);if(M)for(let D=0;D<M.length;D++)p.push(M[D])}const S=new av(r,void 0,p);return Si(S,s),S})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,d=o.length;c<d;c++)a.push(n.getDependency("node",o[c]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const d=c[0],u=c[1],h=c[2];h!==null&&d.traverse(function(f){f.isSkinnedMesh&&f.bind(h,qb)});for(let f=0,_=u.length;f<_;f++)d.add(u[f]);return d})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let d;if(r.isBone===!0?d=new _p:c.length>1?d=new qt:c.length===1?d=c[0]:d=new zt,d!==c[0])for(let u=0,h=c.length;u<h;u++)d.add(c[u]);if(r.name&&(d.userData.name=r.name,d.name=a),Si(d,r),r.extensions&&Ps(n,d,r),r.matrix!==void 0){const u=new ot;u.fromArray(r.matrix),d.applyMatrix4(u)}else r.translation!==void 0&&d.position.fromArray(r.translation),r.rotation!==void 0&&d.quaternion.fromArray(r.rotation),r.scale!==void 0&&d.scale.fromArray(r.scale);if(!s.associations.has(d))s.associations.set(d,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const u=s.associations.get(d);s.associations.set(d,{...u})}return s.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new qt;n.name&&(r.name=s.createUniqueName(n.name)),Si(r,n),n.extensions&&Ps(t,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let d=0,u=l.length;d<u;d++)r.add(l[d]);const c=d=>{const u=new Map;for(const[h,f]of s.associations)(h instanceof mi||h instanceof an)&&u.set(h,f);return d.traverse(h=>{const f=s.associations.get(h);f!=null&&u.set(h,f)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,l=[];os[r.path]===os.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(o);let c;switch(os[r.path]){case os.weights:c=Ar;break;case os.rotation:c=Rr;break;case os.translation:case os.scale:c=Cr;break;default:switch(n.itemSize){case 1:c=Ar;break;case 2:case 3:default:c=Cr;break}break}const d=s.interpolation!==void 0?Hb[s.interpolation]:Ta,u=this._getArrayFromAccessor(n);for(let h=0,f=l.length;h<f;h++){const _=new c(l[h]+"."+os[r.path],t.array,u,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),a.push(_)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=hu(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Rr?zb:Up;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Kb(i,e,t){const n=e.attributes,s=new Vn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new R(l[0],l[1],l[2]),new R(c[0],c[1],c[2])),o.normalized){const d=hu(gr[o.componentType]);s.min.multiplyScalar(d),s.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new R,l=new R;for(let c=0,d=r.length;c<d;c++){const u=r[c];if(u.POSITION!==void 0){const h=t.json.accessors[u.POSITION],f=h.min,_=h.max;if(f!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(_[2]))),h.normalized){const v=hu(gr[h.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new wi;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function af(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(const a in n){const o=du[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return bt.workingColorSpace!==Dn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${bt.workingColorSpace}" not supported.`),Si(i,e),Kb(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Gb(i,e.targets,t):i})}const jb={restaurant:{theme:"cozy-cafe",products:gf.map(i=>i.id),sources:["assets/restaurant-cozy-interior.glb","assets/restaurant-cozy-customers.glb","assets/restaurant-products.glb","assets/cash-register.glb"],customerKinds:["bear","bunny","fox","penguin","cat"],hasBelt:!1}},Jb={"POS / Graphite powder coat":"#b17a55","POS / Injection molded ABS":"#f5dfbd","POS / Rubber":"#775543","POS / Brushed aluminium":"#d1aa76","POS / Stainless spring steel":"#d8c0a0","POS / Dark keycaps":"#9bae92","POS / Light keycaps":"#fff0d2","POS / Clear key":"#db927e","POS / Confirm key":"#8caa87","POS / Lettering":"#684b3c","POS / Key legend":"#5a4436","POS / Thermal paper":"#fff4da"},dl=new R(.65,1.025,.3),Zb=new R(-.045,.98,.58),ra=new R(-.2,1.052,-.1),hl=new R(.28,1.026,-.48),fl=new R(3.2,0,-2),aa=new R(-.3,1.3,-.74),Qb=new R(0,0,-1.2),eT=[new R(-1.4,0,-2.5),new R(-2.7,0,-3.5)],of=[[1e4,-.264],[5e3,-.132],[2e3,0],[1e3,.132],[500,.264]],cf=[[200,-.274],[100,-.165],[50,-.055],[20,.055],[10,.165],[5,.274]],Bo={note:4,coin:7},cs=4,Po=6,lf=i=>new R(-.64-i*.5,1.038,-.08+i%2*.1),pl={calm:{peak:[0,0,0],settled:[0,0,0],duration:300},restless:{peak:[-.14,.045,-.18],settled:[-.055,.015,-.06],duration:1100},impatient:{peak:[-.24,.075,-.65],settled:[-.1,.035,-.17],duration:1350},exhausted:{peak:[-.32,.1,-.92],settled:[-.15,.05,-.28],duration:1500}},ml={calm:{smile:.02,brow:.08,lift:0,cheek:1},happy:{smile:.036,brow:.18,lift:.018,cheek:1.18},restless:{smile:.003,brow:.28,lift:.006,cheek:.92},impatient:{smile:-.022,brow:-.22,lift:-.006,cheek:.84},exhausted:{smile:-.014,brow:.32,lift:-.011,cheek:.76},relieved:{smile:.025,brow:.04,lift:.003,cheek:1.06},tired:{smile:.008,brow:.27,lift:-.01,cheek:.82}},tT={"too-high":{smile:-.008,brow:.36,lift:.042},"too-low":{smile:-.02,brow:.28,lift:.025}},nT=["bear-nod","bunny-ears","fox-tilt","penguin-flippers","cat-blink"],iT=["thumbs-up","kiss","hearts","thumbs-up","kiss"],zo=i=>`./${i}`,gn=i=>i*i*(3-2*i),uf=i=>`$${(i/100).toFixed(i%100?2:0)}`;function df(i,e=new Set){return i==null||i.traverse(t=>{t.geometry&&!e.has(t.geometry)&&(e.add(t.geometry),t.geometry.dispose());for(const n of Array.isArray(t.material)?t.material:[t.material])if(!(!n||e.has(n))){e.add(n);for(const s of Object.values(n))s!=null&&s.isTexture&&!e.has(s)&&(e.add(s),s.dispose());n.dispose()}}),e}function sT(i,e,t){let n=0,s=!1,r=null;return{setState(a){r=a;const o=++n;a.phase==="unload"&&queueMicrotask(()=>{!s&&o===n&&(i==null||i())})},setOrder(){},setScanned(){},setPatience(){},setEmotion(){},setSpeech(){},playReaction(){},reactToChange(){},reactToTotal(){},celebrate(){},resize(){},dispose(){s=!0,n++},info:()=>({status:"unavailable",loaded:!1,sceneId:e,theme:{id:t.theme},customerKinds:[...t.customerKinds],customerModels:0,humanModels:0,productModels:[],conveyorVisible:!1,greetingAnimation:{status:"unavailable",active:!1},thankYouAnimation:{status:"unavailable",active:!1},phase:r==null?void 0:r.phase,patienceMood:"calm",cameraType:"PerspectiveCamera",viewMode:"first-person",triangles:0,drawCalls:0,queueCount:0,unloading:!1,drawerOpen:!1,drawerTarget:null,availableDrawerDenominations:_a(r).map(a=>a.cents),missingDrawerDenominations:ic(r).map(a=>a.cents),drawerStock:Nt.map(({cents:a,kind:o})=>({cents:a,stock:ms(r,a),remaining:_r(r,a),visibleLayerCount:0,maxVisibleLayers:Bo[o],triangles:0,fullTriangleCount:0,visible:!1})),activeAnimations:0,renderedFrames:0,renderLoopActive:!1,emotion:{mood:"happy",kind:t.customerKinds[0],expressionStyle:"unavailable",mouthOpenness:0,facialPose:"emotion"},speech:{active:!1,character:t.customerKinds[0],mouthOpenness:0,boundaryCount:0},reaction:{kind:null,status:"unavailable",active:!1,particleCount:0,symbolKinds:[]},changeHandover:{status:"none",holder:null,visible:!1,attachedToHand:!1,count:0,denominations:[]},takeawayBag:{status:"unavailable",holder:null,visible:!1,attachedToHand:!1,itemCount:0,lineIds:[],productIds:[],worldBounds:null},departure:{active:!1,walking:!1},customerMotion:{enabled:!1,active:!1,scheduled:!1,bursts:0,actorIndices:[],poses:[]},receipt:{status:"unavailable",holder:null,visible:!1,attachedToHand:!1,worldBounds:null,orderId:null},wrongChangeReaction:{direction:null,status:"unavailable",active:!1},wrongTotalReaction:{direction:null,status:"unavailable",active:!1,facialPose:null},items:[],modelSources:t.sources.map(zo)})}}async function rT(i,{sceneId:e="restaurant",onScan:t,onReady:n,onError:s,onUnloadComplete:r,onAcceptPayment:a,onOpenDrawer:o}={}){e="restaurant";const l=jb[e],c=e==="restaurant",d=Zb.clone();c&&(d.y=1.032);let u;try{u=new pb({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch(g){return s==null||s(new Error("The 3D checkout could not start. You can still use all cashier controls.",{cause:g})),sT(r,e,l)}let h=!1,f=!1,_=!1,v=!1,m=0,p=0,S=0,E=null,x=null,A=null,C=null,P=null,O=null,b=null,M=null,D=null,F="none",H=null,K=0,Z=null,ee=null,ie={direction:null,status:"none",restore:null},q={direction:null,status:"none",restore:null},pe="happy",ge=!1,$e=0,rt=0,_t=0,Et=0,ht=null,se={kind:null,status:"none",symbolKinds:[]},j=null,_e="none",ye=null,Oe=[],Qe="counter";const xt=new Map;let U=[],lt=0,Je="";const je=new Set,Ee=new Map;let et=null,ze=null,ct=!1,Jt=.45,Ht="",L=_a().map(g=>g.cents),T=[];const X=[],re=new Map,fe=new Map,ne=new Map;let ke=null,le=null,Fe=null,oe=0,Q="scan",Re="calm",He=new Set,Xe="",Ae=[],tt=null,k=!1,Me=!1,Se=null,be=null,ve=null,ce=!1;const Ge=window.matchMedia("(prefers-reduced-motion: reduce)");let Be=Ge.matches;const wt=new Map,Le=new Map,Mt=new Map,Pe=new Map,xs=new Map,Nn=new Map;let xi=null,Ua=0,Or=0,Qn=null,Ms=[];function qi(){return _&&!h&&!f&&!document.hidden&&!Be&&le&&!["unload","success","finished"].includes(Q)}function kn(){clearTimeout(xi),xi=null,Pe.delete("customers-idle"),Qn==null||Qn(),Qn=null,Ms=[]}function Un(g=2200){!qi()||xi!==null||Pe.has("customers-idle")||(xi=setTimeout(()=>{xi=null,qi()&&uc()},g))}function uc(){const g=[...Le.values()].filter(N=>!N.group.visible||N.index===oe%5&&(Re!=="calm"||ie.direction||q.direction||Pe.has(`arm:${N.index}`))?!1:!["animal","patience","person","depart"].some(z=>Pe.has(`${z}:${N.index}`))).map(N=>{var z,te,W,$;return{person:N,queued:N.index!==oe%5,rigPosition:N.rig.position.clone(),rigQuaternion:N.rig.quaternion.clone(),head:(z=N.head)==null?void 0:z.quaternion.clone(),headPosition:(te=N.head)==null?void 0:te.position.clone(),arm:(W=N.freeArm)==null?void 0:W.quaternion.clone(),forearm:($=N.freeForearm)==null?void 0:$.quaternion.clone(),ears:N.ears.map(he=>({object:he.object,quaternion:he.object.quaternion.clone()})),body:N.bodyParts.map(he=>({object:he,scale:he.scale.clone()}))}});if(!g.length){Un(1800);return}const I=Ua++;Or++,Ms=g.map(({person:N})=>N.index);const y=()=>{var N;for(const{person:z,rigPosition:te,rigQuaternion:W,head:$,headPosition:he,arm:de,forearm:ue,body:we,ears:Ie}of g){z.rig.position.copy(te),z.rig.quaternion.copy(W),$&&(z.head.quaternion.copy($),z.head.position.copy(he)),de&&z.freeArm.quaternion.copy(de),ue&&z.freeForearm.quaternion.copy(ue);for(const Ve of we)Ve.object.scale.copy(Ve.scale);for(const Ve of Ie)Ve.object.quaternion.copy(Ve.quaternion);Gr(z,((N=z.expression)==null?void 0:N.eyeClosure)??0)}};Qn=y,wn("customers-idle",2800,N=>{for(const[z,te]of g.entries()){const{person:W,queued:$,rigPosition:he,rigQuaternion:de,head:ue,headPosition:we,arm:Ie,forearm:Ve,body:Ut,ears:at}=te,Rt=ls.clamp((N*2800-z*170)/2380,0,1),$t=Math.sin(Rt*Math.PI)**2,ft=Math.sin(Rt*Math.PI*2)*$t,Wn=(W.index+I)%2?-1:1;for(const Mn of Ut)Mn.object.scale.copy(Mn.scale).multiply(new R(1+$t*.004,1+$t*.004,1+$t*.01));$&&(W.rig.position.copy(he).add(new R(ft*.014,0,0)),W.rig.quaternion.copy(de).multiply(new it().setFromAxisAngle(new R(0,0,1),ft*.01))),ue&&(W.head.position.copy(we).add(new R(0,$t*.005,0)),W.head.quaternion.copy(ue).multiply(new it().setFromEuler(new Kt($t*(W.index===0?.045:W.index===3?.065:.018),$t*Wn*.085,ft*(W.index===2?.07:.018))))),c&&W.index===1&&at.forEach((Mn,$n)=>Mn.object.quaternion.copy(Mn.quaternion).multiply(new it().setFromAxisAngle(new R(0,0,1),ft*($n?-.085:.085)))),c&&W.index===4&&Gr(W,Math.max(W.expression.eyeClosure,Rt>.3&&Rt<.58?Math.sin((Rt-.3)/.28*Math.PI)**2:0)),Ie&&W.freeArm.quaternion.copy(Ie).multiply(new it().setFromEuler(new Kt(-$t*.14,0,$t*Wn*.035))),Ve&&W.freeForearm.quaternion.copy(Ve).multiply(new it().setFromAxisAngle(new R(1,0,0),-$t*.2))}},()=>{y(),Qn=null,Ms=[],Un(4400)})}u.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),u.outputColorSpace=Yt,u.toneMapping=qf,u.toneMappingExposure=c?1:1.05,u.shadowMap.enabled=!0,u.shadowMap.type=$f;const Vt=u.domElement;Vt.className="market-canvas",Vt.style.cssText="display:block;width:100%;height:100%;touch-action:pan-y;outline:none;",Vt.setAttribute("role","img"),Vt.setAttribute("aria-label",`First-person ${c?"restaurant counter. Tap food on the trays to ring it up":"supermarket checkout. Tap groceries to scan them"} and tap the customer’s offered money to accept payment. The same actions are available as buttons.`),i.append(Vt);const mt=new E_;mt.background=new st(c?16773081:14410719),mt.fog=new Nu(c?16773081:14410719,13,34);const sn=new Cn(60,1,.055,60);sn.position.set(0,1.9,2.65),sn.lookAt(-.15,1.1,-.55),mt.add(new pv(c?16777201:16775406,c?13017228:10135455,c?1.4:1.9));const ei=new cu(c?16773081:16773850,c?1.9:2.4);ei.position.set(-3,7,4),ei.castShadow=!0,ei.shadow.mapSize.set(1024,1024),Object.assign(ei.shadow.camera,{left:-7,right:7,top:7,bottom:-7,near:.1,far:24}),ei.shadow.bias=-4e-4,ei.shadow.normalBias=.025,ei.target.position.set(0,0,-3),mt.add(ei,ei.target);const Oa=new cu(c?16769476:15201023,c?.95:1.1);Oa.position.set(5,4,-4),mt.add(Oa);const w=new qt;w.name="order_items",mt.add(w);const V=new qt;V.name="customer_queue",mt.add(V);const Y=new qt;Y.name="customer_affection",mt.add(Y);const J=new Map;function G(g){if(J.has(g))return J.get(g);const I=document.createElement("canvas");I.width=I.height=192;const y=I.getContext("2d");y.lineJoin="round",y.lineCap="round",g==="hearts"?(y.beginPath(),y.moveTo(96,160),y.bezierCurveTo(12,107,15,49,55,38),y.bezierCurveTo(74,31,89,41,96,57),y.bezierCurveTo(104,40,120,31,140,38),y.bezierCurveTo(180,50,178,110,96,160),y.fillStyle="#f48eac",y.strokeStyle="#fff8ee",y.lineWidth=10,y.fill(),y.stroke(),y.beginPath(),y.moveTo(51,57),y.quadraticCurveTo(39,68,43,85),y.strokeStyle="#ffd8e5",y.lineWidth=8,y.stroke()):(y.fillStyle="#eff5d6",y.strokeStyle="#fff8ee",y.lineWidth=8,y.beginPath(),y.arc(96,96,77,0,Math.PI*2),y.fill(),y.stroke(),y.beginPath(),y.moveTo(71,149),y.lineTo(71,84),y.quadraticCurveTo(87,74,92,52),y.quadraticCurveTo(95,35,107,42),y.quadraticCurveTo(120,51,108,78),y.lineTo(139,78),y.quadraticCurveTo(155,80,150,96),y.lineTo(140,137),y.quadraticCurveTo(137,149,121,149),y.closePath(),y.fillStyle="#f5ce9f",y.strokeStyle="#a57a52",y.lineWidth=5,y.fill(),y.stroke(),y.fillStyle="#99b894",y.fillRect(42,89,25,62),y.strokeStyle="#6d8c6c",y.strokeRect(42,89,25,62),y.beginPath(),y.moveTo(113,102),y.lineTo(147,102),y.moveTo(112,121),y.lineTo(142,121),y.strokeStyle="#c7996d",y.lineWidth=3,y.stroke());const N=new lr(I);return N.colorSpace=Yt,J.set(g,N),N}const xe=Array.from({length:5},(g,I)=>{const y=new w_(new mp({map:G(I===4?"thumbs-up":"hearts"),transparent:!0,depthWrite:!1,toneMapped:!1}));return y.name=`customer_reaction_${I}`,y.visible=!1,Y.add(y),y}),me=new qt;me.name="offered_payment",me.visible=!1,mt.add(me);const De=new qt;De.name="accepted_payment_handover",De.visible=!1,mt.add(De);const Ne=new qt;Ne.name="change_tray_money",Ne.position.copy(d).add(new R(0,.018,0)),mt.add(Ne);const Ce=new qt;Ce.name="customer_change",Ce.visible=!1,mt.add(Ce);const nt=new R(.061,-.015,.044),qe=new qt;qe.name="cashier_change_tray",qe.position.copy(d);const gt=new Yn(1,1,1),yt=new rn({color:c?13209200:2381132,roughness:c?.9:.7}),Gt=new rn({color:c?15916218:1588534,roughness:.95});for(const[g,I,y]of[[[.44,.018,.21],[0,0,0],yt],[[.418,.002,.188],[0,.01,0],Gt],[[.44,.023,.011],[0,.018,-.0995],yt],[[.44,.023,.011],[0,.018,.0995],yt],[[.011,.023,.188],[-.2145,.018,0],yt],[[.011,.023,.188],[.2145,.018,0],yt]]){const N=new It(gt,y);N.scale.set(...g),N.position.set(...I),N.castShadow=!0,N.receiveShadow=!0,qe.add(N)}mt.add(qe);const Ze=new qt;Ze.name="takeaway_bag",Ze.position.copy(hl);const Tt=new qt;Tt.name="packed_food",Ze.add(Tt);const Ye=new rn({color:13211745,roughness:.97}),Ft=new rn({color:10384204,roughness:.95}),St=new Yn(1,1,1);for(const[g,I,y]of[[[.44,.014,.27],[0,.007,0],Ye],[[.44,.3,.008],[0,.15,.135],Ye],[[.44,.3,.008],[0,.15,-.135],Ye],[[.008,.3,.27],[-.22,.15,0],Ye],[[.008,.3,.27],[.22,.15,0],Ye],[[.448,.016,.014],[0,.296,.135],Ft],[[.448,.016,.014],[0,.296,-.135],Ft]]){const N=new It(St,y);N.scale.set(...g),N.position.set(...I),N.castShadow=!0,N.receiveShadow=!0,Ze.add(N)}for(const g of[-.1,.1]){const I=new ou([new R(-.09,.285,g),new R(-.065,.41,g),new R(.065,.41,g),new R(.09,.285,g)]),y=new It(new Ko(I,20,.009,6,!1),Ft);y.castShadow=!0,Ze.add(y)}const ln=document.createElement("canvas");ln.width=384,ln.height=192;const Mi=new lr(ln);Mi.colorSpace=Yt;const vn=new It(new La(.285,.1425),new Jn({map:Mi,toneMapped:!1}));vn.position.set(0,.16,.141),Ze.add(vn),mt.add(Ze);const Yi=new R(.08,-.38,-.125);function kt(){const g=ln.getContext("2d");g.fillStyle="#f8e9ca",g.fillRect(0,0,384,192),g.fillStyle="#755239",g.textAlign="center",g.font="bold 40px Arial",g.fillText("SUNNY BITES",192,72),g.font="32px Arial",g.fillText(xt.size?`${xt.size} ${xt.size===1?"item":"items"} packed`:"Made with care",192,130),Mi.needsUpdate=!0}function On(){Pe.delete("bag-handover"),xt.clear(),Tt.clear(),mt.add(Ze),Ze.position.copy(hl),Ze.quaternion.identity(),Ze.visible=!0,Qe="counter",kt()}function yn(g){if(!g||xt.has(g.lineId))return;const I=xt.size,y=I%Po;Tt.add(g.visual),g.visual.position.set(y%2?.1:-.1,.18+Math.floor(y/2)*.035,y<2?.035:-.045),g.visual.scale.setScalar(.55),g.visual.rotation.y=y%2?.12:-.12,g.visual.visible=I<Po,g.group.visible=!1,xt.set(g.lineId,g.productId),kt()}function Qt(){const g=Le.get(oe%5);g!=null&&g.hand&&(g.hand.add(Ze),Ze.position.copy(Yi),Ze.quaternion.identity()),Ze.visible=!0,Qe="held",At()}function xn(){for(const N of Mt.values())He.has(N.lineId)&&(Pe.delete(`item:${N.lineId}`),yn(N));ti.material.opacity=0,Qe="handover";const g=Le.get(oe%5),I=Ze.position.clone(),y=Ze.quaternion.clone();if(Be||document.hidden||f){Qt();return}wn("bag-handover",1450,N=>{var W;const z=gn(Math.max(0,(N*1450-650)/800));mt.updateMatrixWorld(!0);const te=g!=null&&g.hand?g.hand.localToWorld(Yi.clone()):aa;Ze.position.lerpVectors(I,te,z),Ze.position.y+=Math.sin(z*Math.PI)*.16,Ze.quaternion.slerpQuaternions(y,((W=g==null?void 0:g.hand)==null?void 0:W.getWorldQuaternion(new it))??y,z)},Qt)}kt();const Hs=new Yn(.36,.16,.008),Gn=document.createElement("canvas");Gn.width=384,Gn.height=576;const en=Gn.getContext("2d");en.fillStyle="#fff8e8",en.fillRect(0,0,384,576),en.fillStyle="#614b3b",en.textAlign="center",en.font="bold 36px Arial",en.fillText(c?"SUNNY BITES":"SUNNY MARKET",192,62),en.font="24px Arial",en.fillText("YOUR RECEIPT",192,102),en.strokeStyle="#c7b99e",en.lineWidth=3;for(const g of[139,206,246,286,326])en.beginPath(),en.moveTo(37,g),en.lineTo(347,g),en.stroke();en.font="bold 31px Arial",en.fillText("ORDER COMPLETE",192,185),en.font="bold 47px Arial",en.fillText("THANK YOU!",192,411),en.font="25px Arial",en.fillText("Have a lovely day",192,457);const ed=new lr(Gn);ed.colorSpace=Yt;const td=new Jn({map:ed,toneMapped:!1}),Fa=new rn({color:16775400,roughness:.95}),Wt=new It(new Yn(.19,.27,.001),[Fa,Fa,Fa,Fa,td,td]);Wt.name="customer_receipt",Wt.visible=!1,Wt.castShadow=!0,mt.add(Wt);const nd=new R(-.059,-.075,.038),dc=new Jn({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}),Ki=new It(new Yn(.9,.84,.88),dc);Ki.name="cash_register_touch_target",Ki.position.copy(dl).add(new R(0,.34,.03)),mt.add(Ki);const Fr=new rn({color:15196099,roughness:.75});function kr(g){return Nt.find(I=>I.cents===g)??{cents:g,label:uf(g),kind:g>=500?"note":"coin",color:g>=1e4?"#9bb99a":g>=5e3?"#e7c969":"#cbd2d7"}}const ka=document.createElement("canvas");ka.width=1024,ka.height=600;const Vs=new lr(ka);Vs.colorSpace=Yt,Vs.flipY=!1;const Ba=new Jn({map:Vs,toneMapped:!1});function za(g=Fe){var we,Ie;const I=Ve=>`$${(Ve/100).toFixed(2)}`,y=g==null?void 0:g.order,N=(g==null?void 0:g.phase)??Q,z=(g==null?void 0:g.scanned)??[...He],te=(we=y==null?void 0:y.items)==null?void 0:we.find(Ve=>Ve.lineId===z.at(-1));let W="READY TO SERVE",$="WELCOME",he=c?"PLEASE PLACE FOOD ON THE TRAY":"PLEASE PLACE ITEMS ON THE BELT";N==="scan"?(W=te?te.name.toUpperCase():"SCANNER READY",$=te?I(te.priceCents):"SCAN ITEM",he=`${z.length} / ${((Ie=y==null?void 0:y.items)==null?void 0:Ie.length)??0} ITEMS SCANNED`):N==="total"?(W="ALL ITEMS SCANNED",$="ENTER TOTAL",he="ADD THE PRICES ON YOUR RECEIPT"):N==="payment"?(W="AMOUNT DUE",$=I((y==null?void 0:y.totalCents)??0),he=`CASH OFFERED ${I((y==null?void 0:y.paidCents)??0)}`):N==="drawer"?(W="CASH RECEIVED",$=I((y==null?void 0:y.paidCents)??0),he="PRESS OPEN TO RELEASE CASH DRAWER"):N==="change"?(W="COUNT THE CHANGE",$="?",he="CHOOSE NOTES AND COINS"):N==="success"?(W="TRANSACTION APPROVED",$="THANK YOU",he="CHANGE & RECEIPT • NEXT CUSTOMER"):N==="finished"&&(W="SHIFT ENDED",$="TIME’S UP",he="THANK YOU FOR BEING OUR CASHIER");const de=JSON.stringify([W,$,he,N]);if(de===Je)return;Je=de,U=[W,$,he];const ue=ka.getContext("2d");ue.fillStyle=c?"#fff7e8":"#122624",ue.fillRect(0,0,1024,600),ue.fillStyle=c?"#efd5b5":"#1c3936",ue.fillRect(0,0,1024,85),ue.fillStyle=c?"#74513d":"#8bc6aa",ue.font="600 31px Arial",ue.textAlign="left",ue.fillText(c?"SUNNY BITES  |  HELLO, FRIEND!":"SUNNY  |  CHECKOUT 01",44,54),ue.fillStyle=c?"#8b9f73":"#68d5ae",ue.beginPath(),ue.arc(957,43,9,0,Math.PI*2),ue.fill(),ue.fillStyle=c?"#94745b":"#98b8af",ue.font="600 36px Arial",ue.fillText(W,45,160,934),ue.fillStyle=c?"#644938":"#effff4",ue.font=$.length>9?"600 106px Arial":"600 133px Arial",ue.fillText($,40,327),ue.fillStyle=c?"#e4cbaa":"#28463e",ue.fillRect(44,376,936,2),ue.fillStyle=c?"#84664d":"#b9dace",ue.font="500 29px Arial",ue.fillText(he,45,447),ue.fillStyle=c?"#9b8367":"#85a798",ue.font="25px Arial",ue.fillText(c?"A LITTLE CAFE     AUD PLAY MONEY":"TRAINING MODE     AUD     SECURE TILL",45,554),Vs.needsUpdate=!0,lt++,At()}za();function Yp(g){if(xs.has(g))return xs.get(g);const I=document.createElement("canvas");I.width=768,I.height=336;const y=I.getContext("2d"),N=kr(g).color;y.fillStyle=N,y.fillRect(0,0,I.width,I.height),y.strokeStyle="rgba(255,255,255,.6)",y.lineWidth=8,y.strokeRect(18,18,732,300),y.fillStyle="rgba(255,255,255,.22)",y.beginPath(),y.ellipse(175,174,113,123,0,0,Math.PI*2),y.fill(),y.fillStyle="#254737",y.textAlign="left",y.font="bold 32px Arial",y.fillText("SUNNY MARKET",42,66),y.font="bold 138px Arial",y.fillText(uf(g),42,235),y.font="bold 30px Arial",y.fillText("PLAY MONEY · AUD",42,292),y.textAlign="right",y.font="bold 52px Arial",y.fillText("AU",716,88),y.font="62px Arial",y.fillText("✦",713,243);const z=new lr(I);z.colorSpace=Yt;const te=new rn({map:z,roughness:.77});return xs.set(g,te),te}function Ha(g){const I=Yp(g),y=new It(Hs,[Fr,Fr,Fr,Fr,I,I]);return y.castShadow=!0,y.userData.cents=g,y}function id(g){if(!Nn.has(g)){const N=kr(g),z={200:.04,100:.049,50:.061,20:.056,10:.046,5:.038}[g]??.045,te=new Bu(z,z,.008,g===50?12:40),W=document.createElement("canvas");W.width=W.height=256;const $=W.getContext("2d");$.fillStyle=N.color,$.fillRect(0,0,256,256),$.strokeStyle=g>=100?"#8c712b":"#7e8b90",$.lineWidth=7,$.beginPath(),$.arc(128,128,110,0,Math.PI*2),$.stroke(),$.beginPath(),$.arc(128,128,98,0,Math.PI*2),$.lineWidth=2,$.stroke(),$.fillStyle=g>=100?"#53431a":"#354449",$.textAlign="center",$.font="bold 82px Arial",$.fillText(N.label,128,150),$.font="bold 24px Arial",$.fillText("AU · PLAY",128,188);const he=new lr(W);he.colorSpace=Yt;const de=new rn({map:he,roughness:.65,metalness:.12}),ue=new rn({color:N.color,roughness:.42,metalness:.5});Nn.set(g,{geometry:te,face:de,edge:ue,radius:z})}const I=Nn.get(g),y=new It(I.geometry,[I.edge,I.face,I.face]);return y.castShadow=!0,y.userData.cents=g,y}function Va(){Ne.clear(),Ae=[]}function hc(){Pe.delete("change-handover"),mt.add(Ce),Ce.clear(),Ce.visible=!1,Ce.position.set(0,0,0),Ce.quaternion.identity(),Ce.scale.setScalar(1),_e="none",ye=null,Oe=[]}function fc(){if(!Oe.length)return;const g=Le.get(oe%5);g!=null&&g.freeHand&&(g.freeHand.add(Ce),Ce.position.copy(nt),Ce.quaternion.identity()),Ce.visible=!0,_e="held",At()}function sd(g=!1){if(hc(),!Ae.length)return;ye=le,_e="handover";const I=Le.get(oe%5);Jp(I,g||Be||document.hidden||f),mt.add(Ce),Ce.position.copy(Ne.position),Ce.visible=!0;const y=[],N=Ce.position.clone();let z=0,te=0;for(const{group:$,...he}of Ae){const de=he.kind==="note",ue=de?z++:te++;Oe.push(he),$.updateMatrix();for(const[we,Ie]of[...$.children].entries()){const Ve=Ie.position.clone().applyMatrix4($.matrix);Ce.add(Ie),Ie.position.copy(Ve),y.push({mesh:Ie,fromPosition:Ve,fromQuaternion:Ie.quaternion.clone(),fromScale:Ie.scale.clone(),position:de?new R(-.005+ue*.011+we*.003,.025+ue*.006,ue*.003+we*.0015):new R(.004+ue%3*.039+we*.003,-.044+Math.floor(ue/3)*.043,.02+we*.005),quaternion:new it().setFromEuler(new Kt(de?0:Math.PI/2,0,de?(ue-1)*.08:0)),scale:de?new R(.64,.64,.12):new R(.45,.45,.45)})}}Va();const W=$=>{var ue;const he=gn($);mt.updateMatrixWorld(!0);const de=I!=null&&I.freeHand?I.freeHand.localToWorld(nt.clone()):aa.clone().add(new R(.5,0,0));Ce.position.lerpVectors(N,de,he),Ce.position.y+=Math.sin(he*Math.PI)*.22,Ce.quaternion.slerpQuaternions(new it,((ue=I==null?void 0:I.freeHand)==null?void 0:ue.getWorldQuaternion(new it))??new it,he);for(const we of y)we.mesh.position.lerpVectors(we.fromPosition,we.position,he),we.mesh.quaternion.slerpQuaternions(we.fromQuaternion,we.quaternion,he),we.mesh.scale.lerpVectors(we.fromScale,we.scale,he)};g||Be||document.hidden||f?(W(1),fc()):wn("change-handover",1100,W,fc)}const ti=new It(new Hu(.1,.15,32),new Jn({color:8711363,transparent:!0,opacity:0,depthWrite:!1,side:ci}));ti.rotation.x=-Math.PI/2,ti.position.copy(ra).add(new R(0,.018,0)),mt.add(ti);const ji=new yp(new Yn(.009,.004,.69),new rn({color:6648947,roughness:.95}),17);ji.name="moving_conveyor_seams";const Br=new zt;ji.receiveShadow=!0,ji.visible=!1,mt.add(ji);function pc(g=0){for(let I=0;I<17;I++)Br.position.set(-2.95+(I*.155+g*.15)%2.635,1.029,-.1),Br.rotation.set(0,0,0),Br.scale.setScalar(1),Br.updateMatrix(),ji.setMatrixAt(I,Br.matrix);ji.instanceMatrix.needsUpdate=!0}pc();const zr=new Pv,rd=new We,Kp=new us(new R(0,1,0),-1.09),mc=new R;function At(){!h&&!f&&!m&&(m=requestAnimationFrame(jp))}function wn(g,I,y,N,z=0){if(Pe.delete(g),Be||f){y(1),N==null||N();return}Pe.set(g,{start:performance.now()+z,duration:I,update:y,complete:N}),At()}function Hr(g,I,y,N=700,z=0,te){const W=I.position.clone();wn(g,N,$=>{I.position.lerpVectors(W,y,gn($)),I.position.y+=Math.sin($*Math.PI)*z},te)}function jp(g){var z;if(m=0,h||f)return;const I=ge&&!Be&&!document.hidden;if(g-p<30&&(Pe.size||I||l.hasBelt&&(Q==="scan"||Q==="unload")&&!Be)){At();return}p=g;for(const[te,W]of[...Pe]){if(g<W.start)continue;const $=Math.min(1,(g-W.start)/W.duration);W.update($),$===1&&Pe.get(te)===W&&(Pe.delete(te),(z=W.complete)==null||z.call(W))}const y=l.hasBelt&&_&&!Be&&(Q==="unload"||Q==="scan"&&[...Mt.values()].some(te=>te.group.visible));y&&pc(g/1e3);const N=Le.get(oe%5);I&&Ji(N,gc(g)),N!=null&&N.arm&&Q==="unload"&&!Be&&N.arm.quaternion.copy(N.armRest).multiply(new it().setFromAxisAngle(new R(1,0,0),-.5-Math.sin(g/220)*.38)),u.render(mt,sn),S++,(Pe.size||y||I)&&At()}function Ss(){if(h)return;const g=Math.max(1,i.clientWidth),I=Math.max(1,i.clientHeight),y=g/I;u.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),u.setSize(g,I,!1),sn.aspect=y,y<.92?(sn.fov=71,sn.position.set(-.22,2,3.35),sn.lookAt(-.6,1.05,-.7)):(sn.fov=60,sn.position.set(0,1.9,2.65),sn.lookAt(-.15,1.1,-.55)),sn.updateProjectionMatrix(),sn.updateMatrixWorld(),At()}function Vr(g,I,y=420,N=0){var he;if(!(g!=null&&g.arm))return;const z=g.arm.quaternion.clone(),te=g.armRest.clone().multiply(new it().setFromAxisAngle(new R(1,0,0),I)),W=(he=g.hand)==null?void 0:he.quaternion.clone(),$=g.handRest.clone().multiply(new it().setFromAxisAngle(new R(1,0,0),N));wn(`arm:${g.index}`,y,de=>{const ue=gn(de);g.arm.quaternion.slerpQuaternions(z,te,ue),g.hand&&g.hand.quaternion.slerpQuaternions(W,$,ue)})}function Jp(g,I=!1){var he;if(!(g!=null&&g.freeArm)||!g.freeHand)return;const y=g.freeArm.quaternion.clone(),N=g.freeHand.quaternion.clone(),z=(he=g.freeForearm)==null?void 0:he.quaternion.clone(),te=g.freeArmRest.clone().multiply(new it().setFromAxisAngle(new R(1,0,0),-1.15)),W=g.freeHandRest.clone().multiply(new it().setFromAxisAngle(new R(1,0,0),1.15)),$=de=>{g.freeArm.quaternion.slerpQuaternions(y,te,gn(de)),g.freeHand.quaternion.slerpQuaternions(N,W,gn(de)),g.freeForearm&&g.freeForearm.quaternion.slerpQuaternions(z,g.freeForearmRest,gn(de))};I?$(1):wn(`change-arm:${g.index}`,520,$)}function Zp(g){const I=g.head??g.rig,y=new qt;y.name=`expression_${g.index}`,g.head&&(y.position.y=-g.head.position.y),I.add(y);const N=new rn({color:c?4796449:3419175,roughness:.9}),z=new ku(c?.007:.0035,c?.065:.027,3,8),te=[-1,1].map(at=>{const Rt=new It(z,N);return Rt.position.set(at*(c?.112:.043),c?1.786:1.681,c?g.index===3?.332:.3:.113),Rt.rotation.z=Math.PI/2,y.add(Rt),Rt}),W=new It(new pn,N);y.add(W);const $=g.index===3?1.596:1.563,he=g.index===3?.409:.376,de=new qt;de.name=`talking_mouth_${g.index}`,de.position.set(0,$-.017,he),de.visible=!1,y.add(de);const ue=new It(new pa(1,18,12),new rn({color:5319466,roughness:.95}));ue.scale.set(g.index===3?.029:.043,.027,.006),de.add(ue);const we=new It(new pa(1,16,10),new rn({color:15507362,roughness:.92}));we.position.set(0,-.015,.005),we.scale.set(g.index===3?.017:.026,.01,.003),de.add(we);const Ie=new It(new Vu(1,.28,8,18),new rn({color:13862018,roughness:.9}));Ie.name=`kiss_mouth_${g.index}`,Ie.position.set(0,$-.009,he+.006),Ie.scale.set(.015,.018,.006),Ie.visible=!1,y.add(Ie),g.rig.updateWorldMatrix(!0,!0);const Ve=g.rig.matrixWorld.clone().invert();g.rig.traverse(at=>{var ii,Te,Xt,Sn;if(!at.isMesh||at===W||te.includes(at)||at===ue||at===we||at===Ie)return;if(!c&&((Te=(ii=at.material)==null?void 0:ii.name)!=null&&Te.includes("Produce pine"))){at.visible=!1;return}if(!c||((Xt=at.material)==null?void 0:Xt.name)!=="Cozy / ink")return;const Rt=at.geometry.clone(),$t=Rt.attributes.position,ft=((Sn=Rt.index)==null?void 0:Sn.array)??Array.from({length:$t.count},(mn,Ws)=>Ws),Wn=new ot().multiplyMatrices(Ve,at.matrixWorld),Mn=[],$n=new R,ni=new R,Ci=new R;for(let mn=0;mn<ft.length;mn+=3)$n.fromBufferAttribute($t,ft[mn]),ni.fromBufferAttribute($t,ft[mn+1]),Ci.fromBufferAttribute($t,ft[mn+2]),$n.add(ni).add(Ci).multiplyScalar(1/3).applyMatrix4(Wn),($n.y>=1.595||Math.abs($n.x)>.07)&&Mn.push(ft[mn],ft[mn+1],ft[mn+2]);Rt.setIndex(Mn),at.geometry=Rt});const Ut=[];if(c){let at;const Rt=`Cozy / fur_${l.customerKinds[g.index]}`;g.rig.traverse($t=>{var ft;((ft=$t.material)==null?void 0:ft.name)===Rt&&(at=$t.material)}),(g.index===2||g.index===3)&&(at=new rn({color:g.index===2?16769463:16773855,roughness:.98}));for(const $t of[-1,1]){const ft=new It(new pa(1,14,10),at??new rn({color:13283468}));ft.position.set($t*.112,1.73,g.index===3?.351:.312),ft.scale.set(.026,.035,.009),ft.visible=!1,y.add(ft),Ut.push(ft)}}return{group:y,brows:te,mouth:W,talkingMouth:de,pucker:Ie,lids:Ut,mood:null,smile:0,eyeClosure:0,mouthOpenness:0,facialPose:"emotion",reactionPose:null}}function Gr(g,I){if(g.expression){g.expression.currentEyeClosure=I;for(const y of g.expression.lids)y.visible=I>.1,y.scale.y=.035*I,y.position.y=1.765-.035*I}}function Wr(g,I){if(!(g!=null&&g.expression))return;const y=g.index===oe%5?q.direction:null,N=y?y==="too-high"?"total-high":"total-low":I,z=g.expression,te=tT[y]??ml[I]??ml.happy;if(z.mood!==N){z.mood=N,z.smile=te.smile;const de=c?g.index===3?.052:.073:.03,ue=c?g.index===3?1.596:1.563:1.566,we=c?g.index===3?.404:.37:.115,Ie=Array.from({length:17},(Ut,at)=>{const Rt=at/8-1;return new R(Rt*de,ue+te.smile*(Rt*Rt-1)*(g.index===3&&c?.46:c?1:.45),we-Math.abs(Rt)*(c?.012:.003))}),Ve=new Ko(new ou(Ie),24,c?.005:.0026,6,!1);z.mouth.geometry.dispose(),z.mouth.geometry=Ve}z.brows.forEach((de,ue)=>{const we=ue?1:-1;de.position.y=(c?1.786:1.681)+te.lift*(c?1:.5)+(c&&g.index===2&&ue===0?.014:0),de.rotation.z=Math.PI/2-we*te.brow*(c&&g.index===2&&ue===0?1.55:1)});const W={calm:0,happy:0,restless:.3,impatient:.65,exhausted:1,relieved:.12,tired:.8}[I]??0,$=I==="happy"||I==="relieved",he=c?[[W*.14-($?.028:0),0,0],[W*.04,0,W*.04],[W*.035,W*.055,$?-.06:.06+W*.09],[W*.09-($?.045:0),0,-W*.025],[W*.035,-W*.035,$?.045:-W*.08]][g.index]:[W*.07,0,0];g.headRest.copy(g.headNeutral).multiply(new it().setFromEuler(new Kt(...he))),g.head&&!Pe.has(`animal:${g.index}`)&&!Pe.has("wrong-change")&&!Pe.has("wrong-total")&&g.head.quaternion.copy(g.headRest),g.ears.forEach((de,ue)=>{const we=ue?1:-1,Ie=g.index===1?W*.74-($?.07:0):g.index===4?W*.34:W*.1;de.rest.copy(de.neutral).multiply(new it().setFromEuler(new Kt(W*(g.index===1?.18:.06),0,we*Ie))),Pe.has(`animal:${g.index}`)||de.object.quaternion.copy(de.rest)}),z.eyeClosure=g.index===4&&c?W*.86:0,Gr(g,z.eyeClosure),y&&(z.reactionPose=y==="too-high"?"surprised":"concerned"),Ji(g,ge&&g.index===oe%5?z.mouthOpenness||.45:0);for(const de of g.bodyRestScales)de.object.scale.copy(de.scale).multiply(new R(1+W*.004,1-W*(g.index===0?.017:.01),1))}function Ji(g,I){if(!(g!=null&&g.expression))return;const y=g.expression,N=ge&&g.index===oe%5;y.mouthOpenness=N?ls.clamp(I,.12,1):0,y.pucker.visible=y.reactionPose==="kiss"&&(!N||y.mouthOpenness<.3),y.talkingMouth.visible=N&&!y.pucker.visible,y.talkingMouth.scale.y=.3+y.mouthOpenness*.78,y.talkingMouth.scale.x=.85+y.mouthOpenness*.15,y.mouth.visible=!N&&!y.pucker.visible,y.facialPose=y.pucker.visible?"kiss":N?"talking":y.reactionPose??"emotion"}function gc(g){const I=g-$e,y=(Math.sin(I*.024)+Math.sin(I*.041+.7)*.35+1.35)/2.7,N=rt?Math.max(0,1-(g-rt)/150)*.22:0;return ls.clamp(.13+y*.72+N,.12,1)}function bs(g={}){if(h)return;const I=!!g.active&&!f&&!document.hidden&&le&&Q!=="finished";if(!(I&&l.customerKinds.includes(g.character)&&g.character!==l.customerKinds[oe%5])){if(!I){ge=!1,clearTimeout(ht),ht=null;for(const y of Le.values())Ji(y,0);At();return}ge||($e=performance.now(),rt=0,_t=0,Et=0,clearTimeout(ht),ht=setTimeout(()=>bs({active:!1}),15e3)),ge=!0,Number.isFinite(g.boundary)&&g.boundary>Et&&(Et=g.boundary,rt=performance.now(),_t++),Ji(Le.get(oe%5),Be?.45:gc(performance.now())),At()}}function Ri(g="none"){clearTimeout(j),j=null,Pe.delete("customer-reaction");for(const I of xe)I.visible=!1;for(const I of Le.values())I.expression&&(I.expression.reactionPose=I.index===oe%5&&q.direction?q.direction==="too-high"?"surprised":"concerned":null,I.expression.mouth.scale.set(1,1,1),I.expression.mouth.position.set(0,0,0),Gr(I,I.expression.eyeClosure),Ji(I,I.expression.mouthOpenness));se.status=g,g==="none"&&(se={kind:null,status:g,symbolKinds:[],startedAt:0})}function ad(g=pe==="tired"||pe==="exhausted"?"smile":iT[oe%5],I=0){if(h||!le||!["smile","kiss","hearts","thumbs-up"].includes(g))return;Ri();const y=Le.get(oe%5);if(!(y!=null&&y.expression)||!y.group.visible)return;if(document.hidden||f){se.status="complete";return}const N=Be,z=g==="kiss"||g==="hearts"?["hearts"]:g==="thumbs-up"?["thumbs-up"]:[];se={kind:g,status:N?"static":"playing",symbolKinds:z,startedAt:performance.now()};const te=z.length?xe.filter((he,de)=>z[0]==="thumbs-up"?de===4:de<3):[],W=new R;N?(y.expression.reactionPose=g==="kiss"?"kiss":"smile",Ji(y,y.expression.mouthOpenness),j=setTimeout(()=>{Ri("complete"),At()},1400),At()):wn("customer-reaction",1400,he=>{const de=Math.sin(Math.PI*he);if(y.expression.reactionPose=g==="kiss"&&he>.12&&he<.65?"kiss":"smile",y.expression.mouth.scale.x=1+de*(y.index===0?.22:.12),y.expression.mouth.position.y=-de*.005,!ge){const ue=g==="kiss"?de**2*.95:y.index===2?de**2*.8:y.index===3?de*.22:de*.45;Gr(y,Math.max(y.expression.eyeClosure,ue)),y.index===2&&y.expression.lids[1]&&(y.expression.lids[1].visible=!1)}Ji(y,y.expression.mouthOpenness),y.group.updateWorldMatrix(!0,!1),y.group.localToWorld(W.set(0,1.96,.36)),te.forEach((ue,we)=>{const Ie=ls.clamp((he-we*.1)/.8,0,1);ue.visible=Ie>0&&Ie<1,ue.position.copy(W).add(new R(z[0]==="thumbs-up"?.25:(we-1)*.17+Math.sin(Ie*Math.PI)*(we%2?.045:-.045),Ie*.34,0)),ue.material.opacity=Math.min(1,Ie*5,(1-Ie)*4),ue.material.rotation=Math.sin(Ie*Math.PI*2+we)*.14,ue.scale.setScalar((z[0]==="thumbs-up"?.27:.15+we*.025)*(.75+Math.sin(Ie*Math.PI)*.25))})},()=>Ri("complete"),I),At()}function Ga(g,I=!1){var N;if(h||!Object.hasOwn(ml,g))return;const y=Le.get(oe%5);pe===g&&((N=y==null?void 0:y.expression)==null?void 0:N.mood)===g||(kn(),pe=g,Wr(y,g),!I&&!["success","finished"].includes(Q)&&Xr(Object.hasOwn(pl,g)?g:"calm"),Un(),At())}function Gs(g){var N;if(!g)return;const I=`animal:${g.index}`,y=Pe.get(I);y&&(y.update(1),(N=y.complete)==null||N.call(y),Pe.delete(I))}function od(g,I){if(!c||!g)return;kn(),Gs(g),Pe.delete(`patience:${g.index}`);const y=I==="greeting"?"greetingStatus":"thanksStatus",N=Be||document.hidden||f;g[y]=N?"static":"playing";const z=g.rigRestPosition.y,te=W=>{const $=Math.sin(Math.PI*W),he=Math.sin(W*Math.PI*5)*$;g.rig.position.y=z+$*$*(I==="greeting"?.035:pe==="tired"?.012:pe==="relieved"?.035:.085),I==="greeting"&&g.freeArm&&g.freeArm.quaternion.copy(g.freeArmRest).multiply(new it().setFromEuler(new Kt(-.95*$,0,.12*$+.1*he))),I==="greeting"&&g.freeForearm&&g.freeForearm.quaternion.copy(g.freeForearmRest).multiply(new it().setFromAxisAngle(new R(1,0,0),-.85*$)),g.head&&g.head.quaternion.copy(g.headRest).multiply(new it().setFromEuler(new Kt((I==="thanks"?.18:.05)*$,0,I==="greeting"?.05*he:0)));for(const[de,ue]of g.ears.entries())ue.object.quaternion.copy(ue.rest).multiply(new it().setFromAxisAngle(new R(0,0,1),he*(de?-.16:.16)));if(W===1){g.rig.position.copy(g.rigRestPosition),I==="greeting"&&g.freeArm&&g.freeArm.quaternion.copy(g.freeArmRest),I==="greeting"&&g.freeForearm&&g.freeForearm.quaternion.copy(g.freeForearmRest),g.head&&g.head.quaternion.copy(g.headRest);for(const de of g.ears)de.object.quaternion.copy(de.rest)}};N?te(1):wn(`animal:${g.index}`,I==="greeting"?1e3:740,te,()=>{g[y]="complete"}),At()}function Wa(g){var ue,we,Ie,Ve;if(h)return;if(kn(),Pe.delete("wrong-change"),(ue=ie.restore)==null||ue.call(ie),ie={direction:null,status:"none",restore:null},!g||Q!=="change"){Un(),At();return}const I=["too-little","under","low"].includes(g)?"too-little":["too-much","over","high"].includes(g)?"too-much":null,y=Le.get(oe%5);if(!I||!y)return;Gs(y);const N=Pe.get(`patience:${y.index}`);N==null||N.update(1),Pe.delete(`patience:${y.index}`);const z=(we=y.head)==null?void 0:we.quaternion.clone(),te=(Ie=y.freeArm)==null?void 0:Ie.quaternion.clone(),W=(Ve=y.freeForearm)==null?void 0:Ve.quaternion.clone(),$=()=>{z&&y.head.quaternion.copy(z),te&&y.freeArm.quaternion.copy(te),W&&y.freeForearm.quaternion.copy(W)},he=Be||document.hidden||f;ie={direction:I,status:he?"static":"playing",restore:$};const de=Ut=>{const at=Math.sin(Math.PI*Ut);z&&y.head.quaternion.copy(z).multiply(new it().setFromEuler(new Kt(0,Math.sin(Ut*Math.PI*6)*at*.13,0))),te&&y.freeArm.quaternion.copy(te).multiply(new it().setFromEuler(new Kt(-.34*at,0,.12*at))),W&&y.freeForearm.quaternion.copy(W).multiply(new it().setFromAxisAngle(new R(1,0,0),-.35*at)),Ut===1&&$()};he?de(.5):wn("wrong-change",1e3,de,()=>{ie.status="complete"}),Un(),At()}function $r(g){var ue,we,Ie,Ve;if(h)return;const I=["too-high","too-low"].includes(g)?g:null;if(!q.direction&&(!I||Q!=="total"))return;kn(),Pe.delete("wrong-total"),(ue=q.restore)==null||ue.call(q),q={direction:null,status:"none",restore:null};const y=Le.get(oe%5);if(y!=null&&y.expression&&(y.expression.reactionPose=null),Wr(y,pe),!I||Q!=="total"||!y){Un(),At();return}Ri(),Gs(y);const N=Pe.get(`patience:${y.index}`);N==null||N.update(1),Pe.delete(`patience:${y.index}`),q.direction=I,Wr(y,pe);const z=(we=y.head)==null?void 0:we.quaternion.clone(),te=(Ie=y.freeArm)==null?void 0:Ie.quaternion.clone(),W=(Ve=y.freeForearm)==null?void 0:Ve.quaternion.clone(),$=()=>{z&&y.head.quaternion.copy(y.headRest),te&&y.freeArm.quaternion.copy(te),W&&y.freeForearm.quaternion.copy(W)},he=Be||document.hidden||f;q={direction:I,status:he?"static":"playing",restore:he?null:$},he||wn("wrong-total",1e3,Ut=>{const at=Math.sin(Math.PI*Ut);z&&y.head.quaternion.copy(z).multiply(new it().setFromEuler(new Kt(0,Math.sin(Ut*Math.PI*6)*at*.13,(I==="too-low"?.055:-.035)*at))),te&&y.freeArm.quaternion.copy(te).multiply(new it().setFromEuler(new Kt(-.34*at,0,.12*at))),W&&y.freeForearm.quaternion.copy(W).multiply(new it().setFromAxisAngle(new R(1,0,0),-.35*at)),Ut===1&&$()},()=>{q.status="complete",q.restore=null}),Un(),At()}function Xr(g,I=!1){var Ie;if(h)return;const y=Object.hasOwn(pl,g)&&!["success","finished"].includes(Q)?g:"calm";if(["success","finished"].includes(Q)||Ga(y==="calm"?"happy":y,!0),y===Re)return;Wa(null);const N=Pe.get("wrong-total");N==null||N.update(1),(Ie=N==null?void 0:N.complete)==null||Ie.call(N),Pe.delete("wrong-total"),Re=y;const z=Le.get(oe%5);if(!(z!=null&&z.freeArm)||!z.freeForearm)return;Gs(z);const te=pl[y],W=Ve=>({arm:z.freeArmRest.clone().multiply(new it().setFromEuler(new Kt(Ve[0]*(c&&z.index===3?.72:1),0,Ve[1]+(c&&z.index===3?Math.abs(Ve[0])*.9:c&&z.index===2?Ve[1]:0)))),forearm:z.freeForearmRest.clone().multiply(new it().setFromAxisAngle(new R(1,0,0),Ve[2]*(c&&z.index===4?.55:1)))}),$={arm:z.freeArm.quaternion.clone(),forearm:z.freeForearm.quaternion.clone()},he=W(te.peak),de=W(te.settled),ue=`patience:${z.index}`,we=(Ve,Ut,at)=>{z.freeArm.quaternion.slerpQuaternions(Ve.arm,Ut.arm,at),z.freeForearm.quaternion.slerpQuaternions(Ve.forearm,Ut.forearm,at)};Pe.delete(ue),I||Be||document.hidden||f?we(de,de,1):wn(ue,te.duration,Ve=>{y==="calm"?we($,de,gn(Ve)):Ve<.42?we($,he,gn(Ve/.42)):Ve<.6?we(he,he,1):we(he,de,gn((Ve-.6)/.4))}),At()}function cd(){var g;if(!document.hidden){Un();return}bs({active:!1}),Ri("complete"),kn();for(const[I,y]of Pe)!I.startsWith("patience:")&&!I.startsWith("animal:")&&I!=="wrong-change"&&I!=="wrong-total"||(y.update(1),(g=y.complete)==null||g.call(y),Pe.delete(I))}function Qp(g,I){kn(),bs({active:!1}),Ri(),ve=null,ce=!1;const y=new Map;y.set(g%5,Qb);for(let N=1;N<=2;N++)y.set((g+N)%5,eT[N-1]);for(const[N,z]of Le){Pe.delete(`person:${N}`),Pe.delete(`depart:${N}`),Pe.delete(`patience:${N}`),Pe.delete(`arm:${N}`),Pe.delete(`change-arm:${N}`),Gs(z),z.greetingStatus="none",z.thanksStatus="none",Wr(z,"happy"),z.rig.position.copy(z.rigRestPosition),z.freeArm&&z.freeArm.quaternion.copy(z.freeArmRest),z.freeForearm&&z.freeForearm.quaternion.copy(z.freeForearmRest),z.group.rotation.set(0,0,0);const te=y.get(N);if(!te){z.group.visible=!1;continue}const W=z.group.visible;z.group.visible=!0,I&&W?Hr(`person:${N}`,z.group,te,900,0):z.group.position.copy(te),z.arm&&z.arm.quaternion.copy(z.armRest),z.hand&&z.hand.quaternion.copy(z.handRest),z.freeHand&&z.freeHand.quaternion.copy(z.freeHandRest)}}function em(g=1850){if(ve===oe)return;ve=oe;const I=Le.get(oe%5);if(!I)return;if(Be||document.hidden||f){I.group.visible=!1,F="departed",Qe="departed",ye&&(_e="departed");return}const y=I.group.position.clone(),N=I.group.rotation.y,z=fl.clone().sub(y).setY(0).normalize(),te=Math.atan2(z.x,z.z);wn(`depart:${I.index}`,g,W=>{const $=Math.max(0,(W-.2)/.8);ce=$>0,I.group.rotation.y=ls.lerp(N,te,gn(Math.min(1,W/.2))),I.group.position.lerpVectors(y,fl,gn($)),$>0&&(I.group.position.y+=Math.sin($*Math.PI*10)*.012)},()=>{I.group.visible=!1,F="departed",Qe="departed",ye&&(_e="departed")})}function _c(){clearTimeout(Z),Z=null,Pe.delete("receipt-handover"),mt.add(Wt),Wt.visible=!1,Wt.position.set(0,0,0),Wt.quaternion.identity(),M&&(M.visible=!1,M.position.copy(D)),F="none",H=null,ee=null,K=0}function $a(){const g=Le.get(oe%5);M&&(M.visible=!1),g!=null&&g.hand?(g.hand.add(Wt),Wt.position.copy(nd),Wt.quaternion.identity(),H="customer"):(mt.add(Wt),Wt.position.copy(aa),H="cashier"),Wt.visible=!0,F="held",At()}function ld(g=1550,I=1850){clearTimeout(Z);const y=le;Z=setTimeout(()=>{var N;if(Z=null,!(h||Q!=="success"||le!==y||ee!==y)){for(const z of["receipt-handover","change-handover","bag-handover"])(N=Pe.get(z))==null||N.update(1),Pe.delete(z);$a(),fc(),Qt(),em(I),At()}},Math.max(0,g))}function tm(){_c(),ee=le,K=performance.now(),F="printing",H="printer";const g=Le.get(oe%5),I=Be||document.hidden||f;Vr(g,-1.15,520,1.15),M&&(M.visible=!0,M.position.copy(D)),mt.updateMatrixWorld(!0);const y=M?new Vn().setFromObject(M).getCenter(new R):dl.clone().add(new R(-.245,.34,.139)),N=new it().setFromEuler(new Kt(-.16,0,-.07));I?$a():wn("receipt-handover",1450,z=>{const te=z*1450;if(te<650){M&&M.position.copy(D).add(new R(0,-.055*(1-te/650),0));return}M&&(M.visible=!1),Wt.visible=!0,F="handover",H="cashier";const W=gn((te-650)/800);mt.updateMatrixWorld(!0);const $=g!=null&&g.hand?g.hand.localToWorld(nd.clone()):aa,he=g!=null&&g.hand?g.hand.getWorldQuaternion(new it):new it;Wt.position.lerpVectors(y,$,W),Wt.position.y+=Math.sin(W*Math.PI)*.2,Wt.quaternion.slerpQuaternions(N,he,W)},$a),ld()}function ud(){for(const g of Mt.values())w.remove(g.group),g.hit.geometry.dispose();Mt.clear();for(const g of[...Pe.keys()])(g.startsWith("item:")||g.startsWith("unload:")||g.startsWith("feed:"))&&Pe.delete(g);Se=null,be=null,Vt.style.cursor="default"}function vc(g=!1){if(Mt.size<=cs)return;let I=0;for(const y of Mt.values()){if(He.has(y.lineId)){y.feedSlot=null;continue}const N=I++;if(N>=cs){y.feedSlot=null,y.group.visible=!1,Pe.delete(`feed:${y.lineId}`);continue}const z=y.group.visible,te=y.feedSlot!==N;y.feedSlot=N,y.home.copy(lf(N)),y.group.rotation.y=N%2?.1:-.12,y.group.visible=!0,g&&te&&z?Hr(`feed:${y.lineId}`,y.group,y.home,260):(te||!g)&&y.group.position.copy(y.home)}}function Xa(){if(!(k||h||Q!=="unload")){k=!0,Me=!1,clearTimeout(tt),tt=null;for(const g of Mt.values())Pe.delete(`unload:${g.lineId}`),g.group.position.copy(g.home),g.group.visible=!He.has(g.lineId);vc(),Vr(Le.get(oe%5),0),At(),r==null||r()}}function nm(){clearTimeout(tt),tt=null,Me=!1;for(const g of Mt.values())Pe.delete(`unload:${g.lineId}`),g.group.position.copy(g.home),g.group.visible=!He.has(g.lineId);vc(),Vr(Le.get(oe%5),0)}function qa(g,I,y,N,z,te=!0){clearTimeout(tt),tt=null,_c(),hc(),On(),Wa(null),$r(null),Pe.delete("change-handover"),le=g,Re="calm",pe="happy",oe=Number.isInteger(y)?y:0,He=new Set(I),k=!1,Me=N,Xe="",me.visible=!1,mt.add(me),De.visible=!1,De.clear(),Pe.delete("accepted-payment"),Va(),ud(),Qp(oe,z);const W=Array.isArray(g)?g:(g==null?void 0:g.items)??[],$=W.length>cs;let he=0;W.forEach((de,ue)=>{const we=wt.get(de.productId??de.product??de.type);if(!we)return;const Ie=de.lineId??de.id??String(ue),Ve=we.clone(!0);Ve.position.set(0,0,0),Ve.updateMatrixWorld(!0);const Ut=new Vn().setFromObject(Ve),at=Ut.getCenter(new R);Ve.position.sub(new R(at.x,Ut.min.y,at.z));const Rt=new qt;Rt.add(Ve);const $t={apple:.44,orange:.44,milk:.46,bread:.55,bananas:.55,eggs:.55};Rt.scale.setScalar(c?1:$t[de.productId]??.5);const ft=new qt;ft.name=`order_${Ie}`,ft.userData.lineId=Ie,ft.add(Rt);const Wn=Ut.getSize(new R).multiplyScalar(Rt.scale.x),Mn=new It(new Yn(Wn.x+.055,Wn.y+.04,Wn.z+.055),dc);Mn.position.y=Wn.y/2,Mn.name=`touch_target_${Ie}`,ft.add(Mn);const $n=!He.has(Ie),ni=$?$n?he++:null:ue,Ci=$n&&(!$||ni<cs),ii=lf($?Math.min(ni??0,cs-1):ue);if(ft.rotation.y=(ni??ue)%2?.1:-.12,ft.position.copy(ii),ft.visible=Ci,w.add(ft),Mt.set(Ie,{lineId:Ie,productId:de.productId,group:ft,visual:Rt,home:ii,hit:Mn,feedSlot:Ci?ni:null}),He.has(Ie)&&yn(Mt.get(Ie)),N&&Ci&&!Be&&!f&&_){ft.visible=!1;const Te=new R(-.4,1.15,-.67),Xt=c?ii.clone():ii.clone().add(new R(-.38,0,0));wn(`unload:${Ie}`,1e3,Sn=>{if(ft.visible=!0,Sn<.56){const mn=gn(Sn/.56);ft.position.lerpVectors(Te,Xt,mn),ft.position.y+=Math.sin(mn*Math.PI)*.38}else ft.position.lerpVectors(Xt,ii,gn((Sn-.56)/.44))},void 0,($?ni:ue)*220)}}),N&&(te&&od(Le.get(oe%5),"greeting"),Be||!_||f||v?queueMicrotask(Xa):tt=setTimeout(Xa,Math.max(0,Math.min(W.length,cs)-1)*220+1080)),At()}function im(g,I=[],y=0){Q="scan",qa(g,I,y,!1,le!==null&&y>oe),Ya(g),za({order:g,scanned:I,phase:Q})}function dd(g=[]){const I=new Set(g);if([...He].some(y=>!I.has(y))){qa(le,g,oe,!1,!1);return}for(const[y,N]of Mt){if(!I.has(y)||He.has(y))continue;Se===y&&ja(null),Pe.delete(`unload:${y}`),Pe.delete(`feed:${y}`),N.group.visible=!0;const z=N.group.position.clone();N.group.scale.setScalar(1),wn(`item:${y}`,850,te=>{if(te<.52){const W=gn(te/.52);N.group.position.lerpVectors(z,ra,W),N.group.position.y+=Math.sin(W*Math.PI)*.14,ti.material.opacity=Math.sin(W*Math.PI)*.85}else{const W=gn((te-.52)/.48);N.group.position.lerpVectors(ra,hl.clone().add(new R(0,.32,0)),W),N.group.position.y+=Math.sin(W*Math.PI)*.38,N.group.scale.setScalar(1-W*.38),ti.material.opacity=0}},()=>{yn(N),ti.material.opacity=0})}He=I,vc(!0),za({...Fe,order:le,scanned:g,phase:Q}),At()}function sm(){if(!b)return;b.updateWorldMatrix(!0,!0);const g=b.matrixWorld.clone().invert(),I=new R,y=new R,N=new R;b.traverse(z=>{var ue;if(!z.isMesh||!((ue=z.geometry)!=null&&ue.attributes.position))return;const te=z.geometry,W=te.attributes.position;te.index||te.setIndex(Array.from({length:W.count},(we,Ie)=>Ie));const $=te.index.array.slice(),he=new Uint16Array($.length/3),de=new ot().multiplyMatrices(g,z.matrixWorld);for(let we=0;we<$.length;we+=3){I.fromBufferAttribute(W,$[we]),y.fromBufferAttribute(W,$[we+1]),N.fromBufferAttribute(W,$[we+2]),I.add(y).add(N).multiplyScalar(1/3).applyMatrix4(de);const Ie=I.z<.04?of:cf,[Ve]=Ie.reduce((Ut,at)=>Math.abs(I.x-at[1])<Math.abs(I.x-Ut[1])?at:Ut);he[we/3]=Ve,re.set(Ve,(re.get(Ve)??0)+1)}X.push({geometry:te,indices:$,triangleDenominations:he})}),rm(),Ht="",Ya()}function rm(){if(!(!b||ke)){ke=new qt,ke.name="finite_cash_drawer_stock",ke.visible=!1,b.add(ke);for(const g of Nt){const I=[],N=(g.kind==="note"?of:cf).find(([z])=>z===g.cents)[1];for(let z=0;z<Bo[g.kind];z++){const te=g.kind==="note"?Ha(g.cents):id(g.cents);if(te.name=`drawer_${g.cents}_piece_${z+1}`,g.kind==="note")te.scale.set(.195/.36,.115/.16,.0016/.008),te.rotation.set(-Math.PI/2,0,Math.PI/2),te.position.set(N+z%2*.001,.075+z*.0018,-.115);else{const $={200:.013,100:.012,50:.014,20:.013,10:.011,5:.009}[g.cents]/Nn.get(g.cents).radius;if(te.scale.set($,.0024/.008,$),z<3)te.position.set(N,.077+z*.0025,.2);else{const he=z-3;te.position.set(N+(he%2?-.013:.013),.078+he%2*.002,.115+Math.floor(he/2)*.045)}}te.visible=!1,ke.add(te),I.push(te)}ne.set(g.cents,I)}}}function Ya(g=Fe??le){L=_a(g).map(te=>te.cents),T=ic(g).map(te=>te.cents);const I=Nt.some(({cents:te})=>ms(g,te)>0),y=new Map(Nt.map(({cents:te})=>[te,_r(g,te)])),N=JSON.stringify([L,I,[...y]]);if(N===Ht)return;Ht=N;const z=new Set(L);fe.clear();for(const{geometry:te,indices:W,triangleDenominations:$}of X){const he=te.index.array;let de=0;for(let ue=0;ue<$.length;ue++){if(I||!z.has($[ue]))continue;const we=ue*3;he[de++]=W[we],he[de++]=W[we+1],he[de++]=W[we+2];const Ie=$[ue];fe.set(Ie,(fe.get(Ie)??0)+1)}te.index.needsUpdate=!0,te.setDrawRange(0,de)}ke&&(ke.visible=I);for(const[te,W]of ne){let $=0;for(let he=0;he<W.length;he++){const de=W[he];de.visible=I&&he<y.get(te),de.visible&&($+=de.geometry.index.count/3)}I&&fe.set(te,$)}}function Ts(g){if(Ya(),ct=g,b&&(b.visible=g),!et||!ze)return;const I=ze.clone().add(new R(0,0,g?Jt:0));if(et.position.distanceToSquared(I)<1e-6){Pe.delete("drawer"),et.position.copy(I);return}Hr("drawer",et,I,470)}function Ka(g=[]){const I=new Map;for(const W of g)I.set(W,(I.get(W)??0)+1);const y=[...I].sort((W,$)=>$[0]-W[0]),N=y.map(([W,$])=>`${W}:${$}`).join(",");if(Xe===N&&(!g.length||Ne.children.length))return;Xe=N,Va(),Ne.position.copy(d).add(new R(0,.018,0)),Ne.scale.setScalar(1);let z=0,te=0;y.forEach(([W,$])=>{const he=kr(W),de=new qt;de.name=`selected_${W}_x${$}`,he.kind==="note"?(de.position.set(-.097+z*.009,z*.006,-.025+z*.013),z++):(de.position.set(.061+te%3*.05,0,-.047+Math.floor(te/3)*.08),te++);const ue=Math.min($,3);for(let we=0;we<ue;we++){const Ie=he.kind==="note"?Ha(W):id(W);he.kind==="note"?(Ie.rotation.x=-Math.PI/2,Ie.scale.set(.4,.4,.09),Ie.position.set(we*.004,.001+we*.0018,we*-.004)):(Ie.scale.setScalar(.34),Ie.position.set(we*.002,.0015+we*.003,we*-.002)),de.add(Ie)}Ne.add(de),Ae.push({cents:W,count:$,totalCents:W*$,label:he.label,kind:he.kind,color:he.color,representativeCount:ue,group:de})})}function hd(){Gs(Le.get(oe%5)),me.clear();const g=Ha((le==null?void 0:le.paidCents)??1e3);g.userData.action="accept-payment",me.add(g),me.visible=!0,me.scale.set(.28/.36,.12/.16,.001/.008);const I=Le.get(oe%5);I!=null&&I.hand?(I.hand.add(me),me.rotation.set(0,0,0),me.position.set(-.104,-.022,.038)):(mt.add(me),me.rotation.set(-.25,.1,-.1),me.position.copy(aa)),Vr(I,-1.15,550,1.15)}function am(){De.clear(),me.visible&&(De.add(Ha((le==null?void 0:le.paidCents)??1e3)),me.getWorldPosition(De.position),me.getWorldQuaternion(De.quaternion),me.getWorldScale(De.scale),De.visible=!0,Hr("accepted-payment",De,new R(.65,1.08,.65),550,.14,()=>{De.visible=!1})),me.visible=!1,Vr(Le.get(oe%5),-.1)}function om(g){var te;if(h||!g)return;Fe=g,Ya(g);const I=Q,y=le!==g.order,N=y&&le!==null&&g.round>oe;(y||I!==g.phase)&&kn(),Q=g.phase,y?(qa(g.order,g.scanned??[],g.round??0,Q==="unload",N),Ts(Q==="change")):(I==="unload"&&Q!=="unload"&&nm(),dd(g.scanned??[])),Q==="payment"&&(I!=="payment"||y)&&hd(),Q==="drawer"&&(I!=="drawer"||y)&&(Ts(!1),am()),Q==="change"&&(Ka(g.selectedMoney??[]),(I!=="change"||y)&&Ts(!0)),Q!=="change"&&ie.direction&&Wa(null);const z=Q==="total"&&["too-high","too-low"].includes((te=g.feedback)==null?void 0:te.totalDirection)?g.feedback.totalDirection:null;if(z!==q.direction&&$r(z),Q==="success"&&(I!=="success"||y)){const W=Re==="exhausted"?"tired":Re==="calm"?"happy":"relieved";Xr("calm"),Ga(W),Ts(!1),od(Le.get(oe%5),"thanks"),ad(void 0,650),Ka(g.selectedMoney??[]),sd(),tm(),xn()}Q!=="payment"&&(me.visible=!1),["change","success"].includes(Q)||Va(),!["change"].includes(Q)&&ct&&Ts(!1),Q==="finished"&&(bs({active:!1}),Ri(),Xr("calm"),Ts(!1),me.visible=!1,_c(),hc(),Pe.delete("bag-handover"),Ze.visible=!1),za(g),Un(),At()}function cm(){At()}function fd(g){const I=Vt.getBoundingClientRect();rd.set((g.clientX-I.left)/I.width*2-1,-((g.clientY-I.top)/I.height)*2+1),zr.setFromCamera(rd,sn),mt.updateMatrixWorld(!0)}function yc(g){if(!_||f)return null;if(fd(g),Q==="payment"&&me.visible&&zr.intersectObject(me,!0).length)return{action:"payment"};if(Q==="drawer"&&et&&zr.intersectObject(Ki,!1).length)return{action:"drawer"};if(Q!=="scan")return null;const I=[...Mt.values()].filter(z=>z.group.visible&&!He.has(z.lineId)).map(z=>z.group),y=zr.intersectObjects(I,!0)[0];let N=y==null?void 0:y.object;for(;N&&N.userData.lineId===void 0;)N=N.parent;return N?{action:"scan",lineId:N.userData.lineId}:null}function ja(g){if(Se===g)return;const I=Mt.get(Se);I&&!Pe.has(`item:${Se}`)&&I.group.scale.setScalar(1),Se=g,!Be&&Mt.has(g)&&Mt.get(g).group.scale.setScalar(1.04),At()}function lm(g){var y;const I=yc(g);be=I?{...I,x:g.clientX,y:g.clientY,dragging:!1}:null,(be==null?void 0:be.action)==="scan"&&((y=Vt.setPointerCapture)==null||y.call(Vt,g.pointerId))}function um(g){if((be==null?void 0:be.action)==="scan"&&Q==="scan"&&(Math.hypot(g.clientX-be.x,g.clientY-be.y)>8&&(be.dragging=!0),be.dragging)){fd(g);const y=Mt.get(be.lineId);y&&zr.ray.intersectPlane(Kp,mc)&&(y.group.position.set(ls.clamp(mc.x,-2.9,1.1),1.085,ls.clamp(mc.z,-.5,.6)),ti.material.opacity=y.group.position.distanceTo(ra)<.43?.9:.28,At());return}const I=yc(g);ja((I==null?void 0:I.lineId)??null),Vt.style.cursor=I?"pointer":"default"}function dm(g){var y;const I=be;if(be=null,!!I){if((y=Vt.releasePointerCapture)==null||y.call(Vt,g.pointerId),ti.material.opacity=0,I.action==="scan"&&I.dragging){const N=Mt.get(I.lineId);(N==null?void 0:N.group.position.distanceTo(ra))<.43?t==null||t(I.lineId):N&&Hr(`item:${I.lineId}`,N.group,N.home,270)}else if(Math.hypot(g.clientX-I.x,g.clientY-I.y)<10){const N=yc(g);(N==null?void 0:N.action)==="payment"&&I.action==="payment"&&(a==null||a()),(N==null?void 0:N.action)==="drawer"&&I.action==="drawer"&&(o==null||o()),(N==null?void 0:N.action)==="scan"&&N.lineId===I.lineId&&(t==null||t(I.lineId))}At()}}function hm(){if(be!=null&&be.lineId){const g=Mt.get(be.lineId);g&&!He.has(g.lineId)&&g.group.position.copy(g.home)}be=null,ti.material.opacity=0,At()}function fm(){be||ja(null)}function pm(g){g.preventDefault(),f=!0,bs({active:!1}),Ri("complete"),kn(),m&&cancelAnimationFrame(m),m=0,Vt.dataset.ready="false",s==null||s(new Error("The 3D view paused. Cashier controls still work while it reconnects.")),Q==="unload"&&queueMicrotask(Xa)}function mm(){if(h)return;f=!1,Pe.clear();const g=le,I=[...He],y=oe,N=Q,z=Re,te=pe,W=q.direction,$=Le.get(y%5),he=$==null?void 0:$.greetingStatus,de=$==null?void 0:$.thanksStatus,ue=K?performance.now()-K:0,we=$==null?void 0:$.group.position.clone(),Ie=$==null?void 0:$.group.rotation.clone(),Ve=$==null?void 0:$.group.visible,Ut=ee===le&&F!=="none";g&&qa(g,I,y,N==="unload",!1,!1),$&&($.greetingStatus=he==="playing"?"complete":he,$.thanksStatus=de==="playing"?"complete":de),Q=N,Xr(z,!0),Ga(te,!0),Q==="total"&&W&&$r(W),Q==="payment"&&hd(),Q==="change"&&Ka((Fe==null?void 0:Fe.selectedMoney)??[]),Ts(Q==="change"),Q==="success"&&Ut&&(ee=g,K=performance.now()-ue,$!=null&&$.arm&&$.arm.quaternion.copy($.armRest).multiply(new it().setFromAxisAngle(new R(1,0,0),-1.15)),$!=null&&$.hand&&$.hand.quaternion.copy($.handRest).multiply(new it().setFromAxisAngle(new R(1,0,0),1.15)),$a(),Qt(),Ka((Fe==null?void 0:Fe.selectedMoney)??[]),sd(!0),$&&we&&($.group.position.copy(we),$.group.rotation.copy(Ie),$.group.visible=Ve&&ue<3400),!($!=null&&$.group.visible)||ue>=3400?(F="departed",Qe="departed",ye&&(_e="departed")):ld(Math.max(0,1550-ue),Math.max(1,3400-Math.max(1550,ue)))),Vs.needsUpdate=!0,Ss(),Vt.dataset.ready=String(_),_&&!v&&(n==null||n({recovered:!0,...xc()})),Un()}function pd(g){var I;if(Be=g.matches,kn(),Be){for(const y of Pe.values())y.update(1),(I=y.complete)==null||I.call(y);Pe.clear(),Q==="unload"&&queueMicrotask(Xa),pc(),ja(null)}ge&&Ji(Le.get(oe%5),Be?.45:gc(performance.now())),At(),Un()}function Zi(g){mt.updateMatrixWorld(!0);const I=new Vn().setFromObject(g).getCenter(new R).project(sn),y=Vt.getBoundingClientRect();return{screenX:y.left+(I.x+1)*y.width/2,screenY:y.top+(1-I.y)*y.height/2}}function Qi(g){g.updateWorldMatrix(!0,!0);const I=new Vn().setFromObject(g);return{min:I.min.toArray(),max:I.max.toArray()}}function gm(){if(!et||!P)return null;mt.updateMatrixWorld(!0);const g=Vt.getBoundingClientRect(),I=[[-.38,.17,.12],[-.38,.46,-.1],[-.3,.1,.28],[0,.1,.29],[.3,.24,.15]];let y=null;for(const N of I){const z=P.localToWorld(new R(...N)).project(sn),te=g.left+(z.x+1)*g.width/2,W=g.top+(1-z.y)*g.height/2,$=te>=g.left&&te<=g.right&&W>=g.top&&W<=g.bottom&&document.elementFromPoint(te,W)===Vt,he={screenX:te,screenY:W,blockedByOverlay:!$};if(y??(y=he),$)return he}return y}function _m(){c&&P.traverse(g=>{if(!g.isMesh)return;for(let y=g;y;y=y.parent)if(y===b)return;const I=y=>{const N=Jb[y.name];if(!N)return y;if(!Ee.has(y)){const z=y.clone();z.color.set(N),z.roughness=y.name.includes("spring steel")?.48:.78,z.metalness=y.name.includes("spring steel")?.22:.03,Ee.set(y,z),je.add(y)}return Ee.get(y)};g.material=Array.isArray(g.material)?g.material.map(I):I(g.material)})}function xc(){var W,$,he,de,ue,we,Ie,Ve,Ut,at,Rt,$t,ft,Wn,Mn,$n,ni,Ci,ii;const g=Wt.visible&&(()=>{for(let Te=Wt.parent;Te;Te=Te.parent)if(!Te.visible)return!1;return!0})(),I=Ce.visible&&(()=>{for(let Te=Ce.parent;Te;Te=Te.parent)if(!Te.visible)return!1;return!0})(),y=Le.get(oe%5),N=Ze.visible&&(()=>{for(let Te=Ze.parent;Te;Te=Te.parent)if(!Te.visible)return!1;return!0})(),z=y?fl.clone().sub(y.group.position).setY(0).normalize():new R,te=(y==null?void 0:y.group.getWorldDirection(new R))??new R(0,0,1);return{status:h?"disposed":f?"context-lost":v?"degraded":_?"ready":"loading",loaded:_,sceneId:e,phase:Q,patienceMood:Re,viewMode:"first-person",cameraType:sn.type,cameraPosition:sn.position.toArray(),theme:{id:l.theme,lighting:c?"soft-golden":"daylight",lcdBackground:c?"#fff7e8":"#122624",registerPalette:Object.fromEntries([...Ee].map(([Te,Xt])=>[Te.name,`#${Xt.color.getHexString()}`])),cashTrayPalette:[yt,Gt].map(Te=>`#${Te.color.getHexString()}`)},triangles:u.info.render.triangles,drawCalls:u.info.render.calls,geometries:u.info.memory.geometries,textures:u.info.memory.textures,renderedFrames:S,renderLoopActive:!!m&&!h&&!f&&!document.hidden,modelSources:l.sources.map(zo),productModels:[...wt.keys()],humanModels:c?0:Le.size,customerModels:Le.size,customerKinds:[...l.customerKinds],currentCustomerKind:l.customerKinds[oe%5],conveyorVisible:ji.visible,greetingAnimation:{status:((W=Le.get(oe%5))==null?void 0:W.greetingStatus)??"none",active:(($=Le.get(oe%5))==null?void 0:$.greetingStatus)==="playing"},thankYouAnimation:{status:((he=Le.get(oe%5))==null?void 0:he.thanksStatus)??"none",active:((de=Le.get(oe%5))==null?void 0:de.thanksStatus)==="playing"},register:{loaded:!!(P&&O&&et),modelSource:zo(l.sources[3]),position:(P==null?void 0:P.position.toArray())??null,displayLines:[...U],displayRevision:lt,receiptVisible:!!(M!=null&&M.visible||g)},receipt:{status:F,holder:H,visible:!!(M!=null&&M.visible||g),orderId:(ee==null?void 0:ee.id)??null,attachedToHand:Wt.parent===((ue=Le.get(oe%5))==null?void 0:ue.hand),handLocalPosition:Wt.parent===((we=Le.get(oe%5))==null?void 0:we.hand)?Wt.position.toArray():null,worldBounds:g?Qi(Wt):M!=null&&M.visible?Qi(M):null,...g?Zi(Wt):M!=null&&M.visible?Zi(M):{}},takeawayBag:{status:Qe,holder:Ze.parent===(y==null?void 0:y.hand)?"customer":Qe==="handover"?"cashier":"counter",visible:N,attachedToHand:Ze.parent===(y==null?void 0:y.hand),itemCount:xt.size,lineIds:[...xt.keys()],productIds:[...xt.values()],visibleItemCount:Math.min(xt.size,Po),visualCapacity:Po,worldBounds:N?Qi(Ze):null,...N?Zi(Ze):{}},departure:{active:Pe.has(`depart:${oe%5}`),walking:ce,position:(y==null?void 0:y.group.position.toArray())??null,facingDirection:te.toArray(),travelDirection:z.toArray(),forwardAlignment:z.lengthSq()?te.dot(z):1},wrongChangeReaction:{direction:ie.direction,status:ie.status,active:Pe.has("wrong-change")},wrongTotalReaction:{direction:q.direction,status:q.status,active:Pe.has("wrong-total"),facialPose:q.direction==="too-high"?"surprised":q.direction==="too-low"?"concerned":null},changeHandover:{status:_e,holder:_e==="none"?null:Ce.parent===(y==null?void 0:y.freeHand)?"customer":"cashier",visible:I,attachedToHand:Ce.parent===(y==null?void 0:y.freeHand),orderId:(ye==null?void 0:ye.id)??null,handLocalPosition:Ce.parent===(y==null?void 0:y.freeHand)?Ce.position.toArray():null,count:Oe.reduce((Te,Xt)=>Te+Xt.count,0),denominations:Oe.map(({cents:Te,count:Xt,representativeCount:Sn})=>({cents:Te,count:Xt,representativeCount:Sn})),worldBounds:I?Qi(Ce):null,...I?Zi(Ce):{}},emotion:{mood:pe,kind:l.customerKinds[oe%5],expressionStyle:c?nT[oe%5]:"human-brows",mouthCurvature:((Ie=y==null?void 0:y.expression)==null?void 0:Ie.smile)??0,mouthOpenness:((Ve=y==null?void 0:y.expression)==null?void 0:Ve.mouthOpenness)??0,facialPose:((Ut=y==null?void 0:y.expression)==null?void 0:Ut.facialPose)??"emotion",eyebrowAngles:((at=y==null?void 0:y.expression)==null?void 0:at.brows.map(Te=>Te.rotation.z))??[],eyeClosure:((Rt=y==null?void 0:y.expression)==null?void 0:Rt.currentEyeClosure)??0,headQuaternion:(($t=y==null?void 0:y.head)==null?void 0:$t.quaternion.toArray())??null,earQuaternions:(y==null?void 0:y.ears.map(Te=>Te.object.quaternion.toArray()))??[],bodyScales:(y==null?void 0:y.bodyParts.map(Te=>Te.scale.toArray()))??[],leftArmQuaternion:((ft=y==null?void 0:y.freeArm)==null?void 0:ft.quaternion.toArray())??null},speech:{active:ge,character:l.customerKinds[oe%5],mouthOpenness:((Wn=y==null?void 0:y.expression)==null?void 0:Wn.mouthOpenness)??0,boundaryCount:_t},reaction:{kind:se.kind,status:se.status,active:Pe.has("customer-reaction"),particleCount:xe.filter(Te=>Te.visible).length,symbolKinds:[...se.symbolKinds]},customerMotion:{enabled:!!qi(),active:Pe.has("customers-idle"),scheduled:xi!==null,bursts:Or,actorIndices:[...Ms],poses:[...Le.values()].filter(Te=>Te.group.visible).map(Te=>{var Xt,Sn,mn,Ws;return{index:Te.index,rigPosition:Te.rig.position.toArray(),headQuaternion:((Xt=Te.head)==null?void 0:Xt.quaternion.toArray())??null,freeArmQuaternion:((Sn=Te.freeArm)==null?void 0:Sn.quaternion.toArray())??null,bodyScale:((mn=Te.bodyParts[0])==null?void 0:mn.scale.toArray())??null,rightHandWorld:((Ws=Te.hand)==null?void 0:Ws.getWorldPosition(new R).toArray())??null}})},queueCount:[...Le.values()].filter(Te=>Te.group.visible&&Te.index!==oe%5).length,customerCount:[...Le.values()].filter(Te=>Te.group.visible).length,availableDrawerDenominations:[...L],missingDrawerDenominations:[...T],drawerStock:Nt.map(({cents:Te})=>{var Xt;return{cents:Te,stock:ms(Fe??le,Te),remaining:_r(Fe??le,Te),visibleLayerCount:ke!=null&&ke.visible?((Xt=ne.get(Te))==null?void 0:Xt.filter(Sn=>Sn.visible).length)??0:L.includes(Te)?Bo[kr(Te).kind]:0,maxVisibleLayers:Bo[kr(Te).kind],triangles:fe.get(Te)??0,fullTriangleCount:re.get(Te)??0,visible:!!(b!=null&&b.visible&&(fe.get(Te)??0)>0)}}),patienceGesture:{active:Pe.has(`patience:${oe%5}`),leftArmQuaternion:(($n=(Mn=Le.get(oe%5))==null?void 0:Mn.freeArm)==null?void 0:$n.quaternion.toArray())??null,leftForearmQuaternion:((Ci=(ni=Le.get(oe%5))==null?void 0:ni.freeForearm)==null?void 0:Ci.quaternion.toArray())??null},unloading:Me,drawerOpen:ct,drawerOpenDistance:Jt,drawerTravel:et&&ze?et.position.z-ze.z:0,drawerContentsVisible:(b==null?void 0:b.visible)??!1,drawerTarget:gm(),reducedMotion:Be,activeAnimations:Pe.size,offeredMoney:me.visible?{amountCents:le==null?void 0:le.paidCents,...Zi(me),attachedToHand:me.parent===((ii=Le.get(oe%5))==null?void 0:ii.hand),handLocalPosition:me.position.toArray(),worldPosition:me.getWorldPosition(new R).toArray()}:null,selectedChange:{surface:"cashier-tray",trayBounds:Qi(qe),count:Ae.reduce((Te,Xt)=>Te+Xt.count,0),totalCents:Ae.reduce((Te,Xt)=>Te+Xt.totalCents,0),groups:Ae.map(({group:Te,...Xt})=>({...Xt,countLabelVisible:!1,worldBounds:Qi(Te),...Zi(Te)}))},scanner:Zi(ti),foodFeed:{enabled:Mt.size>cs,capacity:cs,totalCount:Mt.size,remainingCount:[...Mt.values()].filter(Te=>!He.has(Te.lineId)).length,visibleLineIds:[...Mt.values()].filter(Te=>!He.has(Te.lineId)&&Te.group.visible).map(Te=>Te.lineId),queuedLineIds:[...Mt.values()].filter(Te=>!He.has(Te.lineId)&&!Te.group.visible).map(Te=>Te.lineId),unloadingAnimationCount:[...Pe.keys()].filter(Te=>Te.startsWith("unload:")).length},items:[...Mt.values()].map(({lineId:Te,productId:Xt,group:Sn,visual:mn,hit:Ws,feedSlot:xm})=>({lineId:Te,productId:Xt,visible:Sn.visible,scanned:He.has(Te),feedSlot:xm,worldBounds:Qi(mn),hitBounds:Qi(Ws),...Zi(Sn)}))}}const md=new ResizeObserver(Ss);md.observe(i),window.addEventListener("resize",Ss),document.addEventListener("visibilitychange",cd);const gd={pointerdown:lm,pointermove:um,pointerup:dm,pointercancel:hm,pointerleave:fm,webglcontextlost:pm,webglcontextrestored:mm};for(const[g,I]of Object.entries(gd))Vt.addEventListener(g,I);Ge.addEventListener("change",pd),Ss();function vm(){if(h)return;bs({active:!1}),Ri(),$r(null),h=!0,kn(),clearTimeout(tt),clearTimeout(Z),Z=null,m&&cancelAnimationFrame(m),m=0,Pe.clear(),md.disconnect(),window.removeEventListener("resize",Ss),document.removeEventListener("visibilitychange",cd);for(const[y,N]of Object.entries(gd))Vt.removeEventListener(y,N);Ge.removeEventListener("change",pd),ud();const g=df(mt);for(const y of[A,x])df(y,g);const I=[...xs.values(),...[...Nn.values()].flatMap(y=>[y.face,y.edge])];for(const y of I)y.map&&!g.has(y.map)&&(g.add(y.map),y.map.dispose()),g.has(y)||(g.add(y),y.dispose());for(const y of je){for(const N of Object.values(y))N!=null&&N.isTexture&&!g.has(N)&&(g.add(N),N.dispose());g.has(y)||(g.add(y),y.dispose())}for(const y of[Hs,Fr,...[...Nn.values()].map(N=>N.geometry),dc,Ba,Vs])g.has(y)||y.dispose();u.dispose(),Vt.remove()}const ym=new mb,es=await Promise.allSettled(l.sources.map(g=>ym.loadAsync(zo(g))));if(es[0].status==="fulfilled"&&(E=es[0].value.scene,E.name=`blender_${e}_interior`,mt.add(E)),es[1].status==="fulfilled"){x=es[1].value.scene;for(let g=0;g<5;g++){const I=x.getObjectByName(`customer_${g}`);if(!I)continue;const y=I.clone(!0);y.position.set(0,0,0);const N=new qt;N.name=`customer_actor_${g}`,N.add(y),N.visible=!1;const z=N.getObjectByName(`customer_${g}_arm_right`),te=N.getObjectByName(`customer_${g}_hand_right`),W=N.getObjectByName(`customer_${g}_arm_left`),$=N.getObjectByName(`customer_${g}_forearm_left`),he=N.getObjectByName(`customer_${g}_hand_left`),de=N.getObjectByName(`customer_${g}_head`),ue=y.children.filter(Ve=>Ve.name===`customer_${g}_body`||Ve.name.startsWith(`customer_${g}_body_`)),we=["left","right"].map(Ve=>N.getObjectByName(`customer_${g}_ear_${Ve}`)).filter(Boolean).map(Ve=>({object:Ve,rest:Ve.quaternion.clone(),neutral:Ve.quaternion.clone()})),Ie={index:g,group:N,rig:y,arm:z,hand:te,freeArm:W,freeForearm:$,freeHand:he,head:de,ears:we,bodyParts:ue,bodyRestScales:ue.map(Ve=>({object:Ve,scale:Ve.scale.clone()})),headNeutral:(de==null?void 0:de.quaternion.clone())??new it,rigRestPosition:y.position.clone(),headRest:(de==null?void 0:de.quaternion.clone())??new it,greetingStatus:"none",thanksStatus:"none",armRest:(z==null?void 0:z.quaternion.clone())??new it,handRest:(te==null?void 0:te.quaternion.clone())??new it,freeArmRest:(W==null?void 0:W.quaternion.clone())??new it,freeForearmRest:($==null?void 0:$.quaternion.clone())??new it,freeHandRest:(he==null?void 0:he.quaternion.clone())??new it};Ie.expression=Zp(Ie),Wr(Ie,"happy"),Le.set(g,Ie),V.add(N)}}if(es[2].status==="fulfilled"){A=es[2].value.scene;for(const g of l.products){const I=A.getObjectByName(`product_${g}`);I&&wt.set(g,I)}}es[3].status==="fulfilled"&&(C=es[3].value.scene,P=C.getObjectByName("register_root"),P&&(P.position.copy(dl),mt.add(C),et=P.getObjectByName("cash_drawer"),ze=(et==null?void 0:et.position.clone())??null,Number.isFinite(et==null?void 0:et.userData.open_distance)&&et.userData.open_distance>0&&(Jt=et.userData.open_distance),b=P.getObjectByName("cash_drawer_contents"),b&&(b.visible=!1,sm()),_m(),O=P.getObjectByName("pos_display_surface"),O==null||O.traverse(g=>{if(g.isMesh){for(const I of Array.isArray(g.material)?g.material:[g.material])je.add(I);g.material=Ba,g.castShadow=!1,g.receiveShadow=!1}}),M=P.getObjectByName("receipt_paper"),M&&(D=M.position.clone(),M.visible=!1),P.add(Ki),Ki.position.set(0,.34,.03)));for(const g of[E,x,A,V])g==null||g.traverse(I=>{if(I.isMesh){I.castShadow=!0,I.receiveShadow=!0;for(const y of Array.isArray(I.material)?I.material:[I.material])"roughness"in y&&(y.roughness=Math.max(y.roughness,.38))}});return C==null||C.traverse(g=>{g.isMesh&&(g.castShadow=g!==Ki&&g.material!==Ba,g.receiveShadow=g!==Ki&&g.material!==Ba)}),_=!!(E&&P&&O&&et&&Le.size===5&&wt.size===l.products.length),v=!_,ji.visible=l.hasBelt&&!!E,Vt.dataset.ready=String(_),Ss(),_?n==null||n(xc()):s==null||s(new Error("Some 3D checkout models could not load. Cashier controls still work.")),{setState:om,setOrder:im,setScanned:dd,setPatience:Xr,setEmotion:Ga,setSpeech:bs,playReaction:ad,reactToChange:Wa,reactToTotal:$r,celebrate:cm,resize:Ss,dispose:vm,info:xc}}const _n={sun:'<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="7" fill="currentColor"/><path d="M20 3v5m0 24v5M3 20h5m24 0h5M8 8l4 4m16 16 4 4M8 32l4-4M28 12l4-4" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',bear:'<svg viewBox="0 0 48 48" aria-hidden="true"><g stroke="#734a34" stroke-width="2.2"><circle cx="11" cy="12" r="8" fill="#cf9966"/><circle cx="37" cy="12" r="8" fill="#cf9966"/><ellipse cx="24" cy="27" rx="21" ry="18" fill="#dfb27c"/></g><ellipse cx="24" cy="32" rx="10" ry="8" fill="#fff0d9"/><ellipse cx="16" cy="25" rx="2.2" ry="3" fill="#57372b"/><ellipse cx="32" cy="25" rx="2.2" ry="3" fill="#57372b"/><ellipse cx="24" cy="30" rx="3.5" ry="2.5" fill="#57372b"/><path d="M24 32v3m-4 0q4 4 8 0" fill="none" stroke="#57372b" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="9" cy="31" rx="4" ry="2.5" fill="#e89582"/><ellipse cx="39" cy="31" rx="4" ry="2.5" fill="#e89582"/></svg>',sound:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m11 5-5 4H3v6h3l5 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" stroke-linecap="round"/></svg>',music:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 17V5l11-2v12M9 9l11-2" stroke-linejoin="round"/><ellipse cx="6" cy="18" rx="3" ry="2.5"/><ellipse cx="17" cy="16" rx="3" ry="2.5"/></svg>',gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 3-1 3-3 1-2 5 2 5 3 1 1 3h6l1-3 3-1 2-5-2-5-3-1-1-3H9Z"/><circle cx="12" cy="12" r="3"/></svg>',cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 3h3l3 13h11l3-10H6M9 20h1m7 0h1" stroke-linecap="round" stroke-linejoin="round"/></svg>',arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-5-5 5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>',check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 12 4 4L19 6" stroke-linecap="round" stroke-linejoin="round"/></svg>'},ae=i=>document.getElementById(i),jt=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);function aT(){try{return JSON.parse(localStorage.getItem("sunny-market-v1"))||{}}catch{return{}}}const gi=aT();let B=sc(nc.some(i=>i.id===gi.levelId)?gi.levelId:"starter",Math.random,"restaurant");const Fi=Qm({storage:(()=>{try{return window.localStorage}catch{return null}})()});Fi.startShift({levelId:B.levelId,sceneId:B.sceneId});let ks=Fi.snapshot(),hi=gi.sound!==!1,Fs=gi.music!==!1,fu=0,Xi=gi.patience!==!1,ui=Ff(),nn=null,vs=Lf.some(i=>i.durationMs===gi.shiftDurationMs)?gi.shiftDurationMs:yu;const Yu=Object.fromEntries(Object.entries(gi.bestScores||{}).filter(([,i])=>Number.isSafeInteger(i)&&i>=0));let Ku=!1;const Op=()=>`${B.sceneId}:${B.levelId}:${vs}:${Xi?"timed":"relaxed"}`,jo=()=>Yu[Op()]||0;let Jo=Number.isInteger(gi.stamps)&&gi.stamps>=0?gi.stamps:0,oi="",Ke,ki,Ho=!1,Fp=!1,Zo=null,Qo=!1,hf=null,Vo="";function Na(){try{localStorage.setItem("sunny-market-v1",JSON.stringify({levelId:B.levelId,sceneId:B.sceneId,sound:hi,music:Fs,stamps:Jo,patience:Xi,shiftDurationMs:vs,bestScores:Yu}))}catch{}}const oT={unload:["Welcome your customer","Their takeaway order is arriving on the counter."],scan:["Check the food order","Check each food item to pack it into the takeaway bag."],total:["Add up the prices","Enter the total on your cash register."],payment:["Take the payment","Take the customer’s money. Then open your register."],drawer:["Open your cash register","Press OPEN to find the notes and coins for their change."],change:["Count out the change","Choose notes and coins, then hand them back."],success:["Another happy customer","Give them their takeaway bag, receipt, and change."],finished:["Time’s up!","Your score is in. Play again to beat your best!"]},ga=()=>gl[0].name,pu=()=>oT[B.phase],kp=()=>B.order.changeCents===0?"bag and receipt":"bag, receipt, and change";ae("app").innerHTML=`<main class="cashier-app">
  <div id="world" class="world" aria-label="First-person restaurant counter. Check food to pack it into a takeaway bag and take the customer’s money. Equivalent buttons are available on your register."><div id="world-loading" class="world-loading">${_n.sun}<strong>Opening checkout 01…</strong><span>Warming up the kitchen</span></div></div>
  <div class="world-shade" aria-hidden="true"></div>
  <header class="hud"><a class="brand" href="#" aria-label="Sunny Bites game settings">${_n.bear}<span id="scene-brand">sunny bites<small>TAKEAWAY CASHIER</small></span></a><div class="shift-status" id="progress"></div><div class="hud-tools"><span class="lane-tag"><i></i> LANE 01 OPEN</span><button class="icon-button" id="music" aria-label="Turn music off" title="Music">${_n.music}</button><button class="icon-button" id="sound" aria-label="Turn sound off">${_n.sound}</button><button class="icon-button" id="settings-open" aria-label="Open game settings">${_n.gear}</button></div></header>
  <section class="mission" aria-label="Current task"><span class="mission-kicker">YOUR NEXT STEP</span><h1 id="objective-title"></h1><p id="objective-copy"></p><div class="mission-steps" id="steps"></div></section>
  <div class="customer-note" id="customer"></div>
  <div class="view-label"><span class="live-dot"></span> CASHIER VIEW <span id="scene-status">Loading your restaurant</span></div>
  <section id="pos-register" class="register" aria-label="Cash register"><div class="monitor-housing"><span class="bezel-screw screw-tl" aria-hidden="true"></span><span class="bezel-screw screw-tr" aria-hidden="true"></span><div class="register-bezel"><span class="register-brand">SUNNY <span>POINT OF SALE</span></span><div class="register-led"></div><span class="register-id">T-01</span></div><div class="register-screen"><div class="register-screen-header"><span id="terminal-status">READY</span>${zf("register-patience")}<span class="register-currency">AUD · TRAINING TILL</span></div><div id="register-content" class="register-content"></div><div id="register-action" class="register-action" hidden></div></div><div class="monitor-chin" aria-hidden="true"><span>TOUCH TERMINAL</span><i>⏻</i></div></div>${Wg()}</section>
  <div id="announcer" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div><div id="patience-announcer" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div>
  <dialog id="settings" class="settings-dialog" aria-labelledby="settings-title"><form method="dialog"><button class="dialog-close" aria-label="Close settings">×</button></form><div class="eyebrow">MAKE YOURSELF AT HOME</div><h2 id="settings-title">Your cashier shift</h2><p>Pack each checked food item, take payment, and hand over the bag, receipt, and change. Serve as many customers as you can before the shift timer ends.</p><fieldset><legend>Learning level</legend><div id="level-options"></div></fieldset><fieldset class="shift-length-setting"><legend>Shift time</legend><select id="shift-duration" aria-label="Shift time">${Lf.map(i=>`<option value="${i.durationMs}">${i.label}</option>`).join("")}</select><p>An endless queue. Beat your best score before the buzzer!</p></fieldset><label class="patience-setting"><input type="checkbox" id="patience-enabled" checked/><span><strong>Customer patience</strong><small>Race the clock for more points. Turn off for patient customers: +50 points each. The shift time limit still applies.</small></span></label><section class="scoring-rules" aria-label="Service scoring rules"><h3>Serve quickly. Count carefully.</h3><dl><dt>More than half the time left</dt><dd>+100 pts</dd><dt>More than a fifth left</dt><dd>+60 pts</dd><dt>Before the timer reaches zero</dt><dd>+20 pts</dd><dt>After time runs out</dt><dd>−25 pts</dd></dl><p>Points apply once you finish a correct sale before the shift timer ends. Scores can go below zero. A fresh shift starts at 0.</p></section><div class="settings-note"><span>🇦🇺</span><div><strong>Australian dollars</strong><br>Play money · Timers pause in settings and hidden tabs<br>Music starts when you play. Use ♫ to switch it on or off.<br>Character voices are AI-generated with Kokoro.</div></div><button class="primary-button" id="apply-level">Start a fresh shift ${_n.arrow}</button><p class="saved-note" id="saved-stamps"></p></dialog>
${ig()}
${Tm()}
</main>`;const Ur=()=>document.hidden||ae("settings").open||ae("learning-review").open;function Bp(i){const e=ae("music");e.classList.toggle("muted",!i.enabled),e.setAttribute("aria-pressed",String(i.enabled)),e.setAttribute("aria-label",i.enabled?"Turn music off":"Turn music on"),e.title=i.error?"Music unavailable on this device":i.enabled?"Music on · tap to mute":"Music off · tap to play",e.dataset.playing=String(!!i.playing)}const Ra=_g({enabled:Fs,onStateChange:Bp}),_i=lg({isEnabled:()=>Fs,isPaused:Ur});function ec(i){var e,t,n,s;(t=(e=i.target).closest)!=null&&t.call(e,"#music")||Ra.unlock(),_i.unlock(),!Qo&&!((s=(n=i.target).closest)!=null&&s.call(n,"#music, #sound, #settings-open, .brand, #settings, #mistakes-open, #learning-review, #shift-summary, [data-action=review-mistakes]"))&&(Qo=!0,queueMicrotask(()=>Gi()))}document.addEventListener("pointerdown",ec);document.addEventListener("keydown",ec);Bp(Ra.info());const En=Hg({getState:()=>B,getView:()=>Ke,isEnabled:()=>Xi,isPaused:Ur,onMoodChange:i=>{var t;Wp(),(t=Ke==null?void 0:Ke.setEmotion)==null||t.call(Ke,ys()),_i.play(ys()),Gi();const e={restless:"is getting restless.",impatient:"is getting impatient.",exhausted:"has run out of patience. This checkout will cost 25 points. You can still finish and earn points back on the next customer."};e[i]&&(ae("patience-announcer").textContent=`${B.order.customer.name} ${e[i]}`)}}),fi=Cg({isEnabled:()=>hi&&!Ur(),onStateChange:i=>{var e;return(e=Ke==null?void 0:Ke.setSpeech)==null?void 0:e.call(Ke,{active:i.speechActive,boundary:i.speechBoundary,character:i.character,mood:i.mood})}}),yi=Ig({getState:()=>B,isPaused:Ur,onAdvance:()=>fn.info().expired?cc():dn(bf(B),"next"),onUpdate:Hp}),fn=ag({durationMs:vs,getState:()=>B,isPaused:Ur,onUpdate:zp,onExpire:()=>{B.phase==="success"?(Hp(),la("Time’s up! Finishing this customer’s handover.")):cc()}});function ys(){return B.phase==="success"?(nn==null?void 0:nn.tier)==="late"?"tired":["close","steady"].includes(nn==null?void 0:nn.tier)?"relieved":"happy":Xi&&["scan","total","payment","drawer","change"].includes(B.phase)?En.info().mood==="calm"?"happy":En.info().mood:"happy"}function ju(){var i,e;return Ls({phase:B.phase,kind:B.order.customer.kind,mood:Xi?En.info().mood:"calm",paidCents:B.order.paidCents,emotion:ys(),delivered:yi.info().handoverDelivered,changeCents:B.order.changeCents,changeDirection:(i=B.feedback)==null?void 0:i.changeDirection,totalDirection:(e=B.feedback)==null?void 0:e.totalDirection})}function Gi({force:i=!1,changeDirection:e=null,totalDirection:t=null}={}){var c,d;if(B.order!==hf&&(hf=B.order,Vo="",fi.cancel()),B.phase==="finished"||(!Qo||!hi||Ur())&&!e&&!t||B.phase==="success"&&!yi.info().handoverDelivered)return;const n=ys(),s=["unload","scan"].includes(B.phase)?"welcome":["drawer","change"].includes(B.phase)?"change":B.phase,r=e||(B.phase==="change"?(c=B.feedback)==null?void 0:c.changeDirection:null),a=t||(B.phase==="total"?(d=B.feedback)==null?void 0:d.totalDirection:null),o=a?`total:${a}`:`${s}:${n}:${r||"dialogue"}`;if(!i&&Vo===o)return;Vo=o;const l={character:B.order.customer.kind,mood:n,kind:B.phase==="success"?"thanks":s};a?fi.playTotal(a,l):r?fi.play(r,l):fi.speak(ju(),l)}function zp(i=fn.info()){const e=ae("shift-clock");if(!e)return;const t=i.remainingSeconds;e.querySelector("strong").textContent=`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`,e.querySelector("small").textContent=i.expired?"TIME’S UP":i.paused?"PAUSED":"SHIFT TIME",e.dataset.urgent=String(t<=30&&!i.expired),e.setAttribute("aria-label",`${i.paused?"Paused. ":""}${t} seconds left in your shift`)}function cc(){B.phase!=="finished"&&(Ku=ui.points>jo(),Yu[Op()]=Math.max(jo(),ui.points),Na(),dn(Xm(B),"finish"),_i.play("shift-end"))}function Hp(i=yi.info()){const e=ae("checkout-status");if(e){const s=kp(),r={printing:`Preparing your ${s}…`,"handing-over":`Giving ${s} to ${B.order.customer.name}…`,departing:fn.info().expired?"Everything delivered. Finishing your shift…":"Handover complete. The next customer is coming…"};e.textContent=i.paused?"Checkout paused. We’ll continue when you return.":r[i.stage]||"",e.dataset.stage=i.stage}const t=ae("pos-register").querySelector("[data-action=next]");t&&(t.disabled=!i.handoverDelivered,t.innerHTML=`${fn.info().expired?"See my score":"Next customer"} ${_n.arrow}`);const n=ae("printed-receipt");if(n&&n.classList.toggle("receipt-given",i.receiptDelivered||B.phase==="finished"),B.phase==="success"){const s=ae("customer").querySelector("[data-customer-speech]");s&&(s.textContent=ju()),i.handoverDelivered&&Gi()}}function Vp(){yi.pauseChanged(),fn.pauseChanged(),document.hidden&&(fi.cancel(),_i.cancel())}document.addEventListener("visibilitychange",Vp);ae("settings").addEventListener("close",()=>{yi.pauseChanged(),fn.pauseChanged(),Gi(),Ju()});function Ju(){var i;B.phase!=="finished"||ae("settings").open||ae("learning-review").open||(wm({scorecard:ui,completed:B.completed,durationMs:vs,bestScore:jo(),newBest:Ku,learning:ks.current,levelName:((i=nc.find(e=>e.id===B.levelId))==null?void 0:i.name)||"Cashier practice"}),ae("shift-summary").open||ae("shift-summary").showModal())}ae("shift-summary").addEventListener("cancel",i=>i.preventDefault());ae("shift-summary").addEventListener("click",i=>{var t;const e=(t=i.target.closest("[data-summary-action]"))==null?void 0:t.dataset.summaryAction;e==="restart"?dn(sc(B.levelId,Math.random,B.sceneId),"restart"):e==="review"?Zu():e==="settings"&&lc()});function Zu(){ae("learning-review").open||ae("settings").open||(En.tick(),fn.tick(),fi.cancel(),_i.cancel(),ks=Fi.snapshot(),rg(ks),ae("shift-summary").open&&ae("shift-summary").close(),ae("learning-review").showModal(),En.pauseChanged(),yi.pauseChanged(),fn.pauseChanged())}ae("learning-review-close").addEventListener("click",()=>ae("learning-review").close());ae("learning-review").addEventListener("close",()=>{En.pauseChanged(),yi.pauseChanged(),fn.pauseChanged();const i=Zo;Zo=null,i===B.order&&B.phase==="unload"&&dn(_u(B),"unload"),Gi(),Ju()});ae("progress").addEventListener("click",i=>{i.target.closest("#mistakes-open")&&Zu()});function Os(i){if(hi)try{ki||(ki=new(window.AudioContext||window.webkitAudioContext)),ki.resume(),(i==="success"?[523.25,659.25,783.99]:i==="scan"?[1100,1450]:i==="drawer"?[190,280]:i==="too-little"?[330,440]:i==="too-much"?[440,330]:[580]).forEach((t,n)=>{const s=ki.createOscillator(),r=ki.createGain();s.type=i==="drawer"?"triangle":"sine",s.frequency.value=t;const a=ki.currentTime+n*.1;r.gain.setValueAtTime(0,a),r.gain.linearRampToValueAtTime(.06,a+.01),r.gain.exponentialRampToValueAtTime(.001,a+.14),s.connect(r),r.connect(ki.destination),s.start(a),s.stop(a+.16)})}catch{}}function la(i){ae("announcer").textContent=i}function hr(){const i=B.feedback;if(!i||i.type!=="try")return"";if(B.phase==="total"&&["too-high","too-low"].includes(i.totalDirection))return`<div id="total-feedback" class="feedback try total-feedback" data-direction="${i.totalDirection}" role="status"><span class="total-feedback-symbol" aria-hidden="true">✕</span><div><strong>${i.totalDirection==="too-high"?"Total is too high":"Total is too low"}</strong><span><b>${jt(B.order.customer.name)}:</b> “${jt(xr(i.totalDirection))}”</span></div></div>`;if(B.phase==="change"&&["too-little","too-much"].includes(i.changeDirection)){const e=i.changeDirection==="too-little";return`<div class="feedback try change-feedback" data-direction="${i.changeDirection}" role="status"><span class="change-feedback-symbol" aria-hidden="true">${e?"+":"−"}</span><div><strong>${e?"Too little change":"Too much change"}</strong><span class="customer-verdict"><b>${jt(B.order.customer.name)}:</b> “${jt(yr(i.changeDirection))}”</span></div></div>`}return`<div class="feedback ${i.type}" role="status">${jt(i.text)}</div>`}function tc(){const i=new Map;for(const e of B.order.items){const t=`${e.productId}:${e.priceCents}`;i.has(t)||i.set(t,{...e,quantity:0,lineIds:[]}),i.get(t).quantity++,i.get(t).lineIds.push(e.lineId)}return[...i.values()]}function Gp(i,e=""){return`<img class="food-picture ${e}" src="./assets/food-icons/${jt(i.productId)}.png" alt="" width="48" height="48" draggable="false"/>`}function ff(i,e=!1){return`<span class="food-receipt-art ${e?"checked":""}" aria-hidden="true">${Gp(i)}${e?"<i>✓</i>":""}</span>`}function pf({compact:i=!1}={}){const e=["payment","drawer","change","success","finished"].includes(B.phase),n=B.phase==="scan"?tc().map(s=>{const r=s.lineIds.filter(l=>B.scanned.includes(l)).length,a=r===s.quantity,o=s.lineIds.find(l=>!B.scanned.includes(l))??s.lineIds.at(-1);return`<button class="receipt-item receipt-product-group receipt-scan-group ${a?"is-scanned":""}" data-product="${jt(s.productId)}" data-quantity="${s.quantity}" data-unit-price="${s.priceCents}" data-packed="${r}" data-scan-group="${jt(`${s.productId}:${s.priceCents}`)}" data-scan="${jt(o)}" aria-label="Check ${jt(s.name)}, ${r} of ${s.quantity} packed, ${Dt(s.priceCents)} each" ${a?"disabled":""}>${ff(s,a)}<span class="product-description">${jt(s.name)}<small class="packing-progress">${a?"Packed ✓":`${r}/${s.quantity} packed`}</small></span><strong class="product-equation">${s.quantity} × ${Dt(s.priceCents)}</strong></button>`}).join(""):tc().map(s=>`<div class="receipt-item receipt-product-group is-scanned" data-product="${jt(s.productId)}" data-quantity="${s.quantity}" data-unit-price="${s.priceCents}">${ff(s,!0)}<span class="product-description">${jt(s.name)}<small>${Dt(s.priceCents)} each</small></span><strong class="product-equation">${s.quantity} × ${Dt(s.priceCents)}</strong></div>`).join("");return`<div class="receipt ${i?"compact":""}"><div class="receipt-head"><span>ITEM</span><span>QUANTITY × PRICE EACH</span></div><div class="receipt-items">${n}</div><div class="receipt-total"><span>${e?"TOTAL":"TOTAL TO CALCULATE"}</span><strong>${e?Dt(B.order.totalCents):"$ —.—"}</strong></div></div>`}function cT(){var i;ae("progress").innerHTML=`<span class="shift-clock" id="shift-clock" role="timer"><small>SHIFT TIME</small><strong></strong></span><span class="shift-score" id="shift-score" data-negative="${ui.points<0}" aria-label="Shift score: ${ui.points} points"><span aria-hidden="true">★</span><strong>${Ng(ui.points)}</strong><small>PTS</small></span><span class="shift-best"><small>BEST</small><b>${jo()}</b></span><span class="customer-counter">${_n.cart}<strong>${B.phase==="finished"?`${B.completed} served`:`Customer ${B.round+1}`}</strong></span><button type="button" class="mistake-counter" id="mistakes-open" aria-label="Review wrong answers" title="Review wrong answers"><span aria-hidden="true">✕</span><strong id="wrong-answer-count">${((i=ks.current)==null?void 0:i.counts.all)||0}</strong><small>WRONG</small></button>`,zp()}function Wp(){var d,u;const i=B.order.customer,e=ju(),t=En.info().mood,n=B.phase==="change"?(d=B.feedback)==null?void 0:d.changeDirection:null,s=B.phase==="total"?(u=B.feedback)==null?void 0:u.totalDirection:null,r=["unload","scan","total"].includes(B.phase)&&t==="calm"&&!s,a=r?`<div class="customer-order-pictures" aria-label="Customer’s order">${tc().map(h=>`<span class="order-picture" aria-label="${h.quantity} ${jt(h.name)}">${Gp(h)}<b aria-hidden="true">×${h.quantity}</b></span>`).join("")}</div>`:"";ae("customer").classList.toggle("pictured-order",r);const o=s?"confused":ys(),l={happy:"☺",restless:"◷",impatient:"☁",exhausted:"☁",relieved:"♡",tired:"☂",confused:"✕"},c={happy:B.phase==="success"?"Delighted!":"Happy to wait",restless:"Getting restless",impatient:"Losing patience",exhausted:"Very impatient",relieved:"Relieved",tired:"Tired of waiting",confused:"Let’s check the bill"};ae("customer").dataset.emotion=o,ae("customer").innerHTML=`<span class="speech-name">${jt(i.name)} <span>${B.phase==="success"?"CUSTOMER SERVED":"AT YOUR CHECKOUT"}</span></span><span class="customer-emotion"><i aria-hidden="true">${l[o]}</i>${c[o]}</span>${a}<p data-customer-speech class="${r?"order-caption":""}">${jt(e)}</p>${zg()}`,ae("customer").classList.toggle("payment-speech",B.phase==="payment"),n?ae("customer").dataset.changeDirection=n:delete ae("customer").dataset.changeDirection,s?ae("customer").dataset.totalDirection=s:delete ae("customer").dataset.totalDirection}function Ca(){var d,u,h,f,_;const i=document.activeElement,e=["data-money","data-remove-value","data-remove","data-action","data-scan-group","data-scan"].find(v=>i==null?void 0:i.hasAttribute(v)),t=e?i.getAttribute(e):null,n=(i==null?void 0:i.id)==="total-input"?{start:i.selectionStart,end:i.selectionEnd,direction:i.selectionDirection}:null;ae("app").dataset.phase=B.phase,ae("app").dataset.scene=B.sceneId,ae("scene-brand").innerHTML=`${ga().toLowerCase()}<small>TAKEAWAY CASHIER</small>`,document.querySelector(".brand > svg").outerHTML=_n.bear,document.querySelector(".brand").setAttribute("aria-label",`${ga()} game settings`),ae("world").setAttribute("aria-label","First-person restaurant counter. Click takeaway food to pack it into a bag, or take the animal customer’s money. Equivalent controls are available on your register."),document.title=`${ga()} · Cashier game`,cT(),Wp(),ae("objective-title").textContent=pu()[0],ae("objective-copy").textContent=Ho&&["unload","scan","payment","drawer"].includes(B.phase)?"Use the item rows on your register to keep playing.":pu()[1],B.phase==="success"&&(nn==null?void 0:nn.tier)==="late"&&(ae("objective-title").textContent="Customer served"),B.phase==="change"&&ic(B).length&&(ae("objective-title").textContent="Find another combination",ae("objective-copy").textContent="Some slots are empty. Use the notes and coins you have to make the exact change."),B.phase==="change"&&B.levelId==="cash-challenge"&&(ae("objective-title").textContent="Make the stock count",ae("objective-copy").textContent="Each slot has only a few pieces. Find exact change using the money left."),B.phase==="total"&&tc().some(v=>v.quantity>1)&&(ae("objective-title").textContent="Multiply, then add",ae("objective-copy").textContent="Multiply each price by its quantity. Add the groups to find the bill.");const s=["unload","scan"].includes(B.phase)?0:B.phase==="total"?1:B.phase==="payment"?2:B.phase==="drawer"?3:4;ae("steps").innerHTML=["Scan","Total","Cash","Open","Change"].map((v,m)=>`<span class="${m===s?"active":m<s?"done":""}"><i>${m<s?"✓":m+1}</i>${v}</span>`).join(""),ae("terminal-status").textContent={unload:"CUSTOMER ARRIVING",scan:"SCANNER READY",total:"ENTER BILL TOTAL",payment:"AWAITING PAYMENT",drawer:"PAYMENT RECEIVED · DRAWER CLOSED",change:"CASH DRAWER OPEN",success:"TRANSACTION COMPLETE",finished:"SHIFT COMPLETE"}[B.phase],ae("drawer-open").disabled=B.phase!=="drawer",ae("drawer-open").dataset.open=String(B.phase==="change"),ae("drawer-open").setAttribute("aria-label",B.phase==="drawer"?"Open cash drawer using the register button":B.phase==="change"?"Cash drawer is open":"Cash drawer is closed"),ae("drawer-base-label").textContent=B.phase==="drawer"?"PRESS TO OPEN CASH DRAWER":B.phase==="change"?"CASH DRAWER OPEN":"CASH DRAWER LOCKED";let r="",a="";B.phase==="unload"?r=`<div class="task-heading"><span class="eyebrow">NEXT IN LINE</span><h2>Welcome, ${jt(B.order.customer.name)}.</h2><p>${B.order.items.length} takeaway items are arriving on the counter.</p></div><div class="unload-display">${_n.cart}<span>Getting your order ready…</span><div class="unload-indicator"><i></i><i></i><i></i></div></div>${hr()}<button class="secondary-button" data-action="unload">Start scanning ${_n.arrow}</button>`:B.phase==="scan"?r=`<div class="task-heading compact-heading"><h2>Check each food item</h2><span class="scan-count">${B.scanned.length}/${B.order.items.length}</span></div>${pf()}<div class="scanner-status"><span class="scan-led"></span>${B.scanned.length?"Item checked and packed. Ready for the next one.":"Click a food item to pack it into the bag."}</div>${hr()}`:B.phase==="total"?(r=`<div class="task-heading compact-heading"><h2>What’s the total?</h2></div>${pf({compact:!0})}`,a=`<div class="calculator total-entry"><label for="total-input">ENTER THE AMOUNT THE CUSTOMER OWES</label><div class="total-entry-controls"><div class="money-input"><span>$</span><input id="total-input" type="text" inputmode="decimal" autocomplete="off" maxlength="8" aria-label="Total amount in dollars" placeholder="0.00" value="${jt(oi)}"/></div><button class="primary-button" data-action="total">Check my total ${_n.arrow}</button></div>${hr()}</div>`):B.phase==="payment"?r=`<div class="task-heading"><span class="eyebrow">ACCEPT THE CUSTOMER’S CASH</span><h2>Take the payment</h2><p>${jt(B.order.customer.name)} is handing you money.</p></div><div class="payment-bill"><span>Bill total</span><strong>${Dt(B.order.totalCents)}</strong></div><button class="offered-note" data-action="accept" aria-label="Take ${Dt(B.order.paidCents)} payment"><span>AUSTRALIAN DOLLARS</span><strong>${Dt(B.order.paidCents)}</strong><small>PLAY MONEY · CLICK TO TAKE</small></button>${hr()}<button class="primary-button" data-action="accept">Take ${Dt(B.order.paidCents)} ${_n.arrow}</button><p class="payment-help">You can also click the money in their hand.</p>`:B.phase==="drawer"?r=`<div class="task-heading"><span class="eyebrow">CUSTOMER’S MONEY RECEIVED ✓</span><h2>Open the cash register</h2><p>Find the exact change inside your drawer.</p></div><div class="payment-summary"><div><span>BILL TOTAL</span><strong>${Dt(B.order.totalCents)}</strong></div><div><span>CASH RECEIVED ✓</span><strong>${Dt(B.order.paidCents)}</strong></div></div><div class="drawer-instruction"><span aria-hidden="true">↓</span><p>Press OPEN to release the drawer below.<br>Count the notes and coins inside.</p></div>${hr()}<button class="primary-button open-drawer-button" data-action="open-drawer">Open cash drawer ${_n.arrow}</button><p class="payment-help">Then choose notes and coins to make the right change.</p>`:B.phase==="change"?r=`<div class="task-heading compact-heading"><h2>Count their change</h2></div><div class="payment-summary"><div><span>BILL TOTAL</span><strong>${Dt(B.order.totalCents)}</strong></div><div><span>CASH RECEIVED ✓</span><strong>${Dt(B.order.paidCents)}</strong></div></div><div class="change-prompt">${Dt(B.order.paidCents)} − ${Dt(B.order.totalCents)} = <span>?</span></div><p class="count-change-instruction">Count the notes and coins in your tray. Give the change when you’re ready.</p>${hr()}`:B.phase==="success"?r=`<div class="success-panel"><span class="success-check">${_n.check}</span><span class="eyebrow">TRANSACTION COMPLETE</span><h2>${(nn==null?void 0:nn.tier)==="late"?"Change checked!":"Right on the money!"}</h2><p>Handing ${jt(B.order.customer.name)} their ${kp()}.</p>${Og(nn)}<p class="checkout-status" id="checkout-status" role="status"></p><button class="primary-button" data-action="next" disabled>Next customer ${_n.arrow}</button><small class="checkout-auto-note">The queue moves automatically after everything is delivered.</small></div>`:r='<div class="success-panel"><span class="finish-stars">★</span><span class="eyebrow">SHIFT COMPLETE</span><h2>Your shift is finished.</h2><p>Your score and Play again button are on the summary panel.</p></div>',ae("register-content").innerHTML=r,ae("register-content").dataset.phase=B.phase;const o=B.phase==="change"?ae("register-content").querySelector(".feedback"):null,l=(o==null?void 0:o.outerHTML)||"";o==null||o.remove(),ae("register-action").innerHTML=a,ae("register-action").hidden=!a,ae("register-action").dataset.phase=B.phase;const c=B.phase==="total"?(d=B.feedback)==null?void 0:d.totalDirection:null;if(c?ae("pos-register").dataset.totalFeedback=c:delete ae("pos-register").dataset.totalFeedback,B.phase==="total"&&(ae("total-input").setAttribute("aria-invalid",String(((u=B.feedback)==null?void 0:u.type)==="try")),c&&ae("total-input").setAttribute("aria-describedby","total-feedback")),B.phase==="success"&&(ae("register-action").append(ae("register-content").querySelector("[data-action=next]"),ae("register-content").querySelector(".checkout-auto-note")),ae("register-action").hidden=!1),Kg(B,Fp,l,(h=B.feedback)==null?void 0:h.changeDirection),n&&B.phase==="total"){const v=ae("total-input");v.focus({preventScroll:!0}),v.setSelectionRange(n.start,n.end,n.direction)}if(e){const v=[...ae("pos-register").querySelectorAll(`[${e}]`)].find(m=>m.getAttribute(e)===t);v&&!v.disabled?v.focus({preventScroll:!0}):e==="data-remove-value"?(f=ae("change-preview").querySelector("[data-remove-value], [data-action=change]"))==null||f.focus({preventScroll:!0}):e==="data-scan-group"&&((_=ae("pos-register").querySelector("[data-scan]:not(:disabled), #total-input"))==null||_.focus({preventScroll:!0}))}En.render(!0),yi.paint(!0),ae("sound").classList.toggle("muted",!hi),ae("sound").setAttribute("aria-label",hi?"Turn sound off":"Turn sound on"),ae("sound").setAttribute("aria-pressed",String(hi)),ae("sound").title="Kokoro character voices and sound effects",B.phase==="finished"?Ju():ae("shift-summary").open&&ae("shift-summary").close()}function dn(i,e){var s,r,a,o,l,c,d,u,h,f;if(ae("learning-review").open)return;if(!["restart","finish"].includes(e)){if(fn.tick(),B.phase==="finished")return;if(fn.info().expired){e==="next"&&B.phase==="success"&&cc();return}}const t=B;if(i===t)return;En.tick(),e==="restart"?(Zo=null,ui=Ff(),nn=null,Ku=!1,fn.reset(vs),_i.cancel(),Fi.startShift({levelId:i.levelId,sceneId:i.sceneId}),ks=Fi.snapshot()):i.order!==t.order&&(nn=null),e!=="restart"&&Fi.record(t,i,e)&&(ks=Fi.snapshot());const n=i.phase==="success"&&t.phase!=="success";if(n&&(nn=Of(En.info(),Xi),ui=Dg(ui,`${i.levelId}:${i.round}:${i.order.id}`,nn)),Fp=t.phase==="drawer"&&i.phase==="change",B=i,B.phase!==t.phase&&(oi=""),B.phase==="finished"&&(Fi.finishShift({score:ui.points,completed:B.completed,durationMs:vs}),ks=Fi.snapshot()),n?(Jo++,Na(),Os(nn.delta<0?"too-much":"success")):e==="scan"&&B.scanned.length>t.scanned.length?Os("scan"):e==="open-drawer"?Os("drawer"):(e==="accept"||e==="money")&&Os("key"),(B.order!==t.order||B.phase!==t.phase&&["success","finished"].includes(B.phase))&&fi.cancel(),(B.phase!=="change"||!((s=B.feedback)!=null&&s.changeDirection))&&((r=Ke==null?void 0:Ke.reactToChange)==null||r.call(Ke,null)),(B.phase!=="total"||!((a=B.feedback)!=null&&a.totalDirection))&&((o=Ke==null?void 0:Ke.reactToTotal)==null||o.call(Ke,null)),yi.sync(t,B),fn.sync(t,B),t.sceneId!==B.sceneId?qp():Ke==null||Ke.setState(B),En.sync(t,B),(l=Ke==null?void 0:Ke.setEmotion)==null||l.call(Ke,ys()),Ca(),la(((c=B.feedback)==null?void 0:c.text)||pu()[1]),(n||t.phase==="unload"&&B.phase==="scan")&&_i.play(ys()),n&&(Fg(),la(`${B.order.customer.name} served. ${nn.label}: ${Su(nn.delta)} points. Shift score: ${ui.points} points.`)),e==="total"&&B.phase==="total"&&((d=B.feedback)!=null&&d.totalDirection)?(Vg(B.feedback.totalDirection),Gi({force:!0,totalDirection:B.feedback.totalDirection}),(u=Ke==null?void 0:Ke.reactToTotal)==null||u.call(Ke,B.feedback.totalDirection),la(`${B.order.customer.name} says: ${xr(B.feedback.totalDirection)}`)):e==="change"&&B.phase==="change"&&((h=B.feedback)!=null&&h.changeDirection)?(Gg(B.feedback.changeDirection),Gi({force:!0,changeDirection:B.feedback.changeDirection}),(f=Ke==null?void 0:Ke.reactToChange)==null||f.call(Ke,B.feedback.changeDirection),la(`${B.order.customer.name} says: ${yr(B.feedback.changeDirection)}`)):Gi(),B.phase!==t.phase&&(B.phase!=="finished"&&matchMedia("(max-width: 700px)").matches&&(B.phase==="change"?ae("change-preview"):["unload","scan"].includes(B.phase)?document.querySelector(".cashier-app"):document.querySelector(".register")).scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"}),!["unload","scan","finished"].includes(B.phase))){const _=ae("pos-register").querySelector("#total-input, #register-content .primary-button, #register-action .primary-button, #change-preview .primary-button");_&&e!=="scan"&&!_.disabled&&_.focus({preventScroll:!0})}}function $p(i){dn(Bm(B,i),"scan")}function mf(){if(B.phase==="unload"){if(ae("learning-review").open){Zo=B.order;return}dn(_u(B),"unload")}}function Xp(){dn(zm(B),"accept")}function Qu(){dn(Hm(B),"open-drawer")}function lc(){ae("learning-review").open||(En.tick(),fn.tick(),fi.cancel(),_i.cancel(),ae("shift-duration").value=String(vs),ae("patience-enabled").checked=Xi,ae("level-options").innerHTML=nc.map((i,e)=>`<label class="level-option"><input type="radio" name="level" value="${i.id}" ${B.levelId===i.id?"checked":""}/><span class="level-symbol">${e+1}</span><span><strong>${jt(i.name)}</strong><small>${jt(i.description)}</small><span class="level-drawer-detail">${["Full drawer · All 11 money types","Random drawer · 2–3 types missing each customer","Random drawer · 4–5 types missing each customer","Limited drawer · Random quantities of notes and coins"][e]}</span></span></label>`).join(""),ae("saved-stamps").textContent=`${Jo} cashier ${Jo===1?"stamp":"stamps"} earned on this device.`,ae("shift-summary").open&&ae("shift-summary").close(),ae("settings").showModal(),En.pauseChanged(),yi.pauseChanged(),fn.pauseChanged())}ae("pos-register").addEventListener("input",i=>{i.target.id==="total-input"&&(oi=i.target.value)});ae("pos-register").addEventListener("keydown",i=>{i.target.id==="total-input"&&i.key==="Enter"&&B.phase==="total"&&(i.preventDefault(),dn(Sf(B,oi),"total"))});ae("pos-register").addEventListener("click",i=>{const e=i.target.closest("button");if(!e||e.disabled||ae("learning-review").open)return;if(e.dataset.scan){$p(e.dataset.scan);return}if(e.dataset.key!==void 0){if(B.phase!=="total")return;const n=e.dataset.key;oi=n==="⌫"?oi.slice(0,-1):oi.length<8?oi+n:oi,ae("total-input").value=oi,Os("key");return}if(e.dataset.money){dn(Vm(B,Number(e.dataset.money)),"money");return}if(e.dataset.remove!==void 0){dn(Gm(B,Number(e.dataset.remove)),"remove");return}const t=e.dataset.action;if(t==="review-mistakes"){Zu();return}t==="unload"&&dn(_u(B),"unload"),t==="total"&&dn(Sf(B,oi),"total"),t==="accept"&&Xp(),t==="open-drawer"&&Qu(),t==="change"&&dn($m(B),"change"),t==="clear"&&dn(Wm(B),"clear"),t==="next"&&(fn.info().expired?cc():dn(bf(B),"next")),t==="restart"&&dn(sc(B.levelId,Math.random,B.sceneId),"restart"),t==="levels"&&lc()});ae("drawer-open").addEventListener("click",Qu);ae("sound").addEventListener("click",()=>{hi=!hi,hi?(Qo=!0,Vo=""):fi.cancel(),Na(),Ca(),hi&&(Os("key"),Gi())});ae("music").addEventListener("click",()=>{Fs=!Fs,Ra.setEnabled(Fs),Fs?(Ra.unlock(),_i.unlock()):_i.cancel(),Na()});ae("settings-open").addEventListener("click",lc);ae("apply-level").addEventListener("click",()=>{const i=ae("settings").querySelector("input[name=level]:checked").value;Xi=ae("patience-enabled").checked,vs=Number(ae("shift-duration").value),dn(sc(i,Math.random,"restaurant"),"restart"),Na(),ae("settings").close(),En.pauseChanged(),fn.pauseChanged()});document.querySelector(".brand").addEventListener("click",i=>{i.preventDefault(),lc()});ae("settings").addEventListener("click",i=>{if(i.target===ae("settings")){const e=ae("settings").getBoundingClientRect();(i.clientX<e.left||i.clientX>e.right||i.clientY<e.top||i.clientY>e.bottom)&&ae("settings").close()}});Ca();async function qp(){var a,o,l;const i=++fu,e=B.sceneId;Ke==null||Ke.dispose(),Ke=void 0,Ho=!1;const t=document.createElement("div");t.className="scene-mount";const n=document.createElement("div");n.id="world-loading",n.className="world-loading",n.innerHTML=`${_n.sun}<strong>Opening ${jt(ga())}…</strong><span>Warming up the kitchen</span>`,ae("world").replaceChildren(t,n),ae("world").classList.remove("scene-unavailable"),ae("scene-status").textContent=`Loading ${ga()}`;const s=()=>i===fu&&e===B.sceneId,r=c=>{s()&&(Ho=!0,n.remove(),ae("world").classList.add("scene-unavailable"),ae("scene-status").textContent="3D unavailable · register controls still work",console.warn("Cashier view:",c),B.phase==="unload"?mf():Ca())};try{const c=await rT(t,{sceneId:e,onScan:u=>{s()&&$p(u)},onUnloadComplete:()=>{s()&&mf()},onAcceptPayment:()=>{s()&&Xp()},onOpenDrawer:()=>{s()&&Qu()},onReady:()=>{s()&&(Ho=!1,ae("world").classList.remove("scene-unavailable"),n.remove(),ae("scene-status").textContent="Fresh food. Friendly faces.",Ca())},onError:r});if(!s()){c.dispose();return}Ke=c,Ke.setState(B),(a=Ke.setPatience)==null||a.call(Ke,Xi?En.info().mood:"calm"),(o=Ke.setEmotion)==null||o.call(Ke,ys());const d=fi.info();(l=Ke.setSpeech)==null||l.call(Ke,{active:d.speechActive,boundary:d.speechBoundary,character:d.character,mood:d.mood})}catch(c){r(c)}}qp();window.addEventListener("pagehide",()=>{fu++,En.dispose(),yi.dispose(),fn.dispose(),fi.dispose(),_i.dispose(),Ke==null||Ke.dispose(),Ra.dispose(),document.removeEventListener("visibilitychange",Vp),document.removeEventListener("pointerdown",ec),document.removeEventListener("keydown",ec),ki==null||ki.close()},{once:!0});
