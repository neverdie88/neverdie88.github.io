(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const jh=Object.freeze([{id:"burger",name:"Classic burger",emoji:"🍔",color:"#deaa64",category:"burgers"},{id:"icecream",name:"Ice cream",emoji:"🍦",color:"#f2b5c9",category:"treats"},{id:"smoothie",name:"Smoothie",emoji:"🥤",color:"#db87a4",category:"treats"},{id:"fries",name:"Fries",emoji:"🍟",color:"#eac151",category:"sides"},{id:"pizza",name:"Pizza",emoji:"🍕",color:"#eebd70",category:"sides"},{id:"donut",name:"Donut",emoji:"🍩",color:"#c98a64",category:"bakery"},{id:"doubleburger",name:"Double cheeseburger",emoji:"🍔",color:"#c88b43",category:"burgers"},{id:"chickenburger",name:"Chicken burger",emoji:"🍔",color:"#e8ba70",category:"burgers"},{id:"veggieburger",name:"Veggie burger",emoji:"🍔",color:"#86ae63",category:"burgers"},{id:"espresso",name:"Espresso",emoji:"☕",color:"#805643",category:"coffee"},{id:"latte",name:"Latte",emoji:"☕",color:"#c39b74",category:"coffee"},{id:"cappuccino",name:"Cappuccino",emoji:"☕",color:"#dac2a0",category:"coffee"},{id:"croissant",name:"Croissant",emoji:"🥐",color:"#dba252",category:"bakery"},{id:"muffin",name:"Blueberry muffin",emoji:"🧁",color:"#a38bac",category:"bakery"},{id:"cinnamonroll",name:"Cinnamon roll",emoji:"🥮",color:"#cc9167",category:"bakery"},{id:"spaghetti",name:"Spaghetti",emoji:"🍝",color:"#e1b953",category:"pasta"},{id:"penne",name:"Penne pasta",emoji:"🍝",color:"#e1a35c",category:"pasta"}].map(Object.freeze)),nm=Object.freeze([["burgers"],["coffee"],["bakery"],["pasta"],["treats","sides"]].map(Object.freeze)),su=Object.freeze([{id:"starter",name:"Starter",description:"Add prices, multiply matching pairs, and count whole dollars with a full drawer.",itemsLabel:"2 items · pairs · full drawer"},{id:"shopkeeper",name:"Shopkeeper",description:"Multiply pairs and triples and give dollar change. Each customer has a new drawer with two or three money types missing.",itemsLabel:"3 items · pairs & triples · 2–3 missing"},{id:"expert",name:"Money master",description:"Multiply matching items and practise dollars and cents. Each customer has a new drawer with four or five money types missing.",itemsLabel:"3–4 items · multiplication & cents · 4–5 missing"}].map(Object.freeze)),Dn=Object.freeze([{cents:1e4,label:"$100",kind:"note",color:"#98cba7"},{cents:5e3,label:"$50",kind:"note",color:"#efce70"},{cents:2e3,label:"$20",kind:"note",color:"#eca878"},{cents:1e3,label:"$10",kind:"note",color:"#9bc5e6"},{cents:500,label:"$5",kind:"note",color:"#d5b0d6"},{cents:200,label:"$2",kind:"coin",color:"#e9c865"},{cents:100,label:"$1",kind:"coin",color:"#e9c865"},{cents:50,label:"50c",kind:"coin",color:"#cbd2d7"},{cents:20,label:"20c",kind:"coin",color:"#cbd2d7"},{cents:10,label:"10c",kind:"coin",color:"#cbd2d7"},{cents:5,label:"5c",kind:"coin",color:"#cbd2d7"}].map(Object.freeze)),Jh=5,im=1e3,id=30,sm=Object.freeze([{name:"Benny Bear",emoji:"🐻",kind:"bear",greeting:"Hello! My food smells delicious. Can you check my order?"},{name:"Poppy Bunny",emoji:"🐰",kind:"bunny",greeting:"I am ready for a tasty lunch. Thank you!"},{name:"Felix Fox",emoji:"🦊",kind:"fox",greeting:"Hello, cashier! Could you add up my food order?"},{name:"Pip Penguin",emoji:"🐧",kind:"penguin",greeting:"What a lovely place for a snack. Here is my order!"},{name:"Coco Cat",emoji:"🐱",kind:"cat",greeting:"My friends and I are sharing a meal. Can you help me pay?"}].map(Object.freeze)),sl=Object.freeze([{id:"restaurant",name:"Sunny Bites",description:"Serve food to friendly animal customers.",catalog:jh,customers:sm}].map(Object.freeze)),rm=Object.freeze([]);function am(i){const e=[];function t(n,s){if(s.length===i){const r=new Set(s);e.push({missing:s,available:Dn.map(({cents:a})=>a).filter(a=>!r.has(a))});return}for(let r=n;r<=Dn.length-(i-s.length);r+=1)t(r+1,[...s,Dn[r].cents])}return t(0,[]),e}const om=new Map([2,3,4,5].map(i=>[i,am(i)]));function Zh(i){return su.some(({id:e})=>e===i)?i:"starter"}function ru(i){return sl.find(({id:e})=>e===i)??sl[0]}function ha(i){const e=(i==null?void 0:i.order)??i;if(!Array.isArray(e==null?void 0:e.drawerDenominations))return Dn;const t=new Set(e.drawerDenominations);return Object.freeze(Dn.filter(({cents:n})=>t.has(n)))}function Yo(i){const e=(i==null?void 0:i.order)??i;if(!Array.isArray(e==null?void 0:e.drawerDenominations))return rm;const t=new Set(e.drawerDenominations);return Object.freeze(Dn.filter(({cents:n})=>!t.has(n)))}function Qh(i,e){return ha(i).some(t=>t.cents===e)}function Ni(i,e,t){const n=Number(t()),s=Number.isFinite(n)?Math.min(1-Number.EPSILON,Math.max(0,n)):0;return i+Math.floor(s*(e-i+1))}function cm(i,e){if(i===0)return!0;const t=i/5,n=e.filter(r=>r<=i).map(r=>r/5),s=new Uint8Array(t+1).fill(id+1);s[0]=0;for(let r=1;r<=t;r+=1)for(const a of n)a<=r&&(s[r]=Math.min(s[r],s[r-a]+1));return s[t]<=id}function lm(i,e,t,n){if(i==="starter")return Object.freeze(Dn.map(({cents:u})=>u));const s=i==="expert"?Ni(4,5,n):Ni(2,3,n),r=om.get(s),a=e>0?Math.min(e,500):500,o=u=>u.missing.some(h=>h<=a),l=r.filter(o),c=new Set,d=u=>c.has(u)?!1:(c.add(u),cm(e,u.available));for(let u=0;u<16&&l.length;u+=1){const h=l[(Ni(0,l.length-1,n)+t)%l.length];if(d(h))return Object.freeze([...h.available])}for(const u of[l,r])for(const h of u)if(d(h))return Object.freeze([...h.available]);throw new Error("No solvable drawer for this order.")}function wn(i,e){return{type:i,text:e}}function um(i){return i.selectedMoney.reduce((e,t)=>e+t,0)}function ef(i){return i.order.items.every(({lineId:e})=>i.scanned.includes(e))}function dm(i,e,t){const n=e%Jh;return i==="starter"?n%2===0?[2]:[1,1]:n===1?Array(t).fill(1):n===2||n===4?t===4?[3,1]:[3]:n===3&&t===4?[2,2]:t===4?[2,1,1]:[2,1]}function Lt(i){if(!Number.isSafeInteger(i))throw new TypeError("Money must be safe integer cents.");const e=Math.abs(i);return`${i<0?"-":""}$${Math.floor(e/100)}.${String(e%100).padStart(2,"0")}`}function au(i){if(typeof i!="string")return null;const e=/^\$?(\d+)(?:\.(\d{1,2}))?$/.exec(i.trim());if(!e)return null;const n=Number(e[1])*100+Number((e[2]||"").padEnd(2,"0"));return Number.isSafeInteger(n)?n:null}function tf(i,e=0,t=Math.random,n="restaurant"){const s=Zh(i),r=ru(n),a=Number.isSafeInteger(e)&&e>=0?e:0,o=s==="starter"&&a===0,l=s==="starter"?2:s==="expert"?Ni(3,4,t):3,c=[...r.catalog],d=`${r.id}-${s}-${a}`,u=[];for(const p of dm(s,a,l)){const E=nm[a%Jh],b=c.filter(({category:O})=>u.length===0?E.includes(O):O!==u[0].category),x=b[Ni(0,b.length-1,t)],A=c.indexOf(x),R=c.splice(A,1)[0],P=o?200:s==="starter"?Ni(1,5,t)*100:s==="shopkeeper"?Ni(1,8,t)*100:Ni(20,160,t)*5;for(let O=0;O<p;O+=1)u.push({lineId:`${d}-${u.length}`,productId:R.id,name:R.name,emoji:R.emoji,color:R.color,...R.category?{category:R.category}:{},priceCents:P})}const h=u.reduce((p,E)=>p+E.priceCents,0),f=(s==="starter"?[500,1e3,2e3]:[500,1e3,2e3,5e3]).filter(p=>p>=h),g=Ni(0,Math.min(1,f.length-1),t),v=o?1e3:f[g],m=v-h;return{id:d,sceneId:r.id,customer:{...r.customers[a%r.customers.length]},items:u,totalCents:h,paidCents:v,changeCents:m,drawerDenominations:lm(s,m,a,t)}}function ou(i="starter",e=Math.random,t="restaurant"){const n=Zh(i),s=ru(t);return{levelId:n,sceneId:s.id,round:0,phase:"unload",order:tf(n,0,e,s.id),scanned:[],answer:"",selectedMoney:[],paymentAccepted:!1,drawerOpened:!1,feedback:null,completed:0,attempts:{total:0,change:0}}}function rl(i){return i.phase!=="unload"?i:{...i,phase:"scan",feedback:wn("info",`${i.order.customer.name}'s food is ready at the counter. Check each item to build the bill.`)}}function hm(i,e){if(i.phase!=="scan"||i.scanned.includes(e))return i;const t=i.order.items.find(r=>r.lineId===e);if(!t)return i;const n=[...i.scanned,e],s=n.length===i.order.items.length;return{...i,scanned:n,phase:s?"total":"scan",feedback:s?wn("success","Everything is scanned! Multiply matching food items by their unit price, then add the groups."):wn("info",`${t.name} scanned for ${Lt(t.priceCents)}. Scan the next food item!`)}}function nf(i,e){if(i.phase!=="total"||!ef(i))return i;const t=typeof e=="string"?e:"",n=au(t),s={...i.attempts,total:i.attempts.total+1};if(n===null)return{...i,answer:t,attempts:s,feedback:wn("try","Type a money amount using digits, with up to two digits after a decimal point. You can try again!")};if(n!==i.order.totalCents){const r=n>i.order.totalCents?"too-high":"too-low";return{...i,answer:t,attempts:s,feedback:{...wn("try",`That total is ${r==="too-high"?"too high":"too low"}. Check each quantity × price, then add the groups and try again.`),totalDirection:r}}}return{...i,answer:t,attempts:s,phase:"payment",feedback:wn("success",`That is right! The total is ${Lt(n)}. ${i.order.customer.name} offers ${Lt(i.order.paidCents)}. Take the payment before choosing the change.`)}}function fm(i){return i.phase!=="payment"||i.paymentAccepted||!ef(i)||au(i.answer)!==i.order.totalCents?i:{...i,phase:"drawer",paymentAccepted:!0,drawerOpened:!1,feedback:wn("success",`You have taken ${Lt(i.order.paidCents)}. Open the cash drawer, then count out the change for ${i.order.customer.name}.`)}}function pm(i){return i.phase!=="drawer"||!i.paymentAccepted||i.drawerOpened?i:{...i,phase:"change",drawerOpened:!0,feedback:wn("info",`The cash drawer is open. Choose the notes and coins to give ${i.order.customer.name} the exact change.`)}}function mm(i,e){if(i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened||!Qh(i,e))return i;if(i.selectedMoney.length>=im)return{...i,feedback:wn("info","Your change tray is full. Put some money back, or clear the tray and count again.")};const t=[...i.selectedMoney,e];return{...i,selectedMoney:t,feedback:wn("info","Money added. Count your notes and coins. Tap picked money to put one piece back.")}}function gm(i,e){if(i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened||!Number.isInteger(e)||e<0||e>=i.selectedMoney.length)return i;const t=i.selectedMoney.filter((n,s)=>s!==e);return{...i,selectedMoney:t,feedback:wn("info","One piece put back. Count the notes and coins left in your tray.")}}function _m(i){return i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened?i:{...i,selectedMoney:[],feedback:wn("info","Your change tray is empty. Count up from the total to the amount paid.")}}function vm(i){if(i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened||!i.selectedMoney.every(n=>Qh(i,n)))return i;const e=um(i),t={...i.attempts,change:i.attempts.change+1};if(e!==i.order.changeCents){const n=e<i.order.changeCents;return{...i,attempts:t,feedback:{...wn("try",`That is ${n?"a little short":"a little too much"}. Count up from ${Lt(i.order.totalCents)} to ${Lt(i.order.paidCents)}, then try again.`),changeDirection:n?"too-little":"too-much"}}}return{...i,attempts:t,phase:"success",drawerOpened:!1,completed:i.completed+1,feedback:wn("success",`Correct change! Thank you for helping ${i.order.customer.name}. You earned a service stamp!`)}}function sf(i,e=Math.random){if(i.phase!=="success")return i;const t=i.round+1,n=ru(i.sceneId);return{...i,sceneId:n.id,round:t,phase:"unload",order:tf(i.levelId,t,e,n.id),scanned:[],answer:"",selectedMoney:[],paymentAccepted:!1,drawerOpened:!1,feedback:null,attempts:{total:0,change:0}}}function ym(i){return i.phase==="finished"?i:{...i,phase:"finished",drawerOpened:!1,feedback:wn("info","Time is up! Your shift is complete. See how many customers you served.")}}const sd="sunny-bites-learning-v1",rf=20,af=1,of=new Set(Dn.map(({cents:i})=>i)),xm=new Set(["active","completed","interrupted"]),Mm=()=>({all:0,total:0,change:0,invalid:0}),Kt=i=>Number.isSafeInteger(i)&&i>=0,ln=(i,e)=>typeof i=="string"?i.slice(0,e):"",hs=i=>i!==null&&typeof i=="object"&&!Array.isArray(i);function cf(i){if(hs(i)||Array.isArray(i)){for(const e of Object.values(i))cf(e);Object.freeze(i)}return i}function lf(i){if(!Array.isArray(i))return null;const e=[];for(const t of i.slice(0,64)){if(!hs(t)||!ln(t.productId,80)||!ln(t.name,100)||!Kt(t.quantity)||t.quantity<1||!Kt(t.priceCents))return null;e.push({productId:ln(t.productId,80),name:ln(t.name,100),quantity:t.quantity,priceCents:t.priceCents})}return e}function Sm(i){if(!Array.isArray(i))return null;const e=[],t=new Set;for(const n of i.slice(0,Dn.length)){if(!hs(n)||!of.has(n.cents)||!Kt(n.count)||n.count<1||n.count>1e3||t.has(n.cents))return null;t.add(n.cents),e.push({cents:n.cents,count:n.count})}return e}function uf(i){if(!hs(i)||!ln(i.id,512)||!["total","change"].includes(i.type)||!Kt(i.round)||i.round<1)return null;const e=i.type==="total";if(!(e?["too-high","too-low","invalid"]:["too-much","too-little"]).includes(i.direction)||!(Kt(i.enteredCents)||e&&i.direction==="invalid"&&i.enteredCents===null)||e&&i.direction==="invalid"&&i.enteredCents!==null)return null;const t=lf(i.items),n=e?[]:Sm(i.money);if(!t||!n)return null;const s={id:ln(i.id,512),type:i.type,round:i.round,customerName:ln(i.customerName,100),customerKind:ln(i.customerKind,40),direction:i.direction,enteredText:e?ln(i.enteredText,32):"",enteredCents:i.enteredCents,items:t,money:n};if(!e){if(!Kt(i.billCents)||!Kt(i.cashCents))return null;s.billCents=i.billCents,s.cashCents=i.cashCents}return s}function rd(i){if(!hs(i)||!ln(i.id,128)||!Kt(i.startedAt)||!xm.has(i.status)||(i.status==="active"?i.endedAt!==null:!Kt(i.endedAt)||i.endedAt<i.startedAt))return null;const e=i.counts;if(!hs(e)||!["all","total","change","invalid"].every(r=>Kt(e[r]))||e.all!==e.total+e.change||e.invalid>e.total||!Array.isArray(i.entries))return null;const t=i.entries.slice(-200).map(uf).filter(Boolean),n=[...new Map(t.map(r=>[r.id,r])).values()];if(n.length>e.all||n.filter(r=>r.type==="total").length>e.total||n.filter(r=>r.type==="change").length>e.change||n.filter(r=>r.direction==="invalid").length>e.invalid)return null;const s={id:ln(i.id,128),startedAt:i.startedAt,endedAt:i.endedAt,status:i.status,levelId:ln(i.levelId,40),sceneId:ln(i.sceneId,40),counts:{all:e.all,total:e.total,change:e.change,invalid:e.invalid},entries:n};return Number.isSafeInteger(i.score)&&(s.score=i.score),Kt(i.completed)&&(s.completed=i.completed),Kt(i.durationMs)&&(s.durationMs=i.durationMs),s}function bm(i){try{const e=typeof i=="string"?JSON.parse(i):null;return!hs(e)||e.version!==af||!Array.isArray(e.history)?{current:null,history:[]}:{current:rd(e.current),history:e.history.slice(0,rf*2).map(rd).filter(Boolean)}}catch{return{current:null,history:[]}}}function ad(i,e){if(!i)return e;if(!e)return i;const t={active:0,interrupted:1,completed:2},n=t[e.status]>t[i.status]||t[e.status]===t[i.status]&&e.counts.all>i.counts.all?e:i,s=[...new Map([...e.entries,...i.entries].map(l=>[l.id,l])).values()],r=Math.max(i.counts.total,e.counts.total,s.filter(l=>l.type==="total").length),a=Math.max(i.counts.change,e.counts.change,s.filter(l=>l.type==="change").length),o=Math.max(i.counts.invalid,e.counts.invalid,s.filter(l=>l.direction==="invalid").length);return{...n,counts:{all:r+a,total:r,change:a,invalid:o},entries:s.slice(-200)}}function Tm(i){if(!Array.isArray(i==null?void 0:i.items))return null;const e=new Map;for(const t of i.items){if(!hs(t)||!ln(t.productId,80)||!ln(t.name,100)||!Kt(t.priceCents))return null;const n=`${t.productId}:${t.priceCents}`,s=e.get(n)||{productId:t.productId,name:t.name,quantity:0,priceCents:t.priceCents};s.quantity+=1,e.set(n,s)}return lf([...e.values()])}function Em(i){if(!Array.isArray(i)||i.length>1e3||i.some(t=>!of.has(t)))return null;const e=new Map;for(const t of i)e.set(t,(e.get(t)||0)+1);return[...e].map(([t,n])=>({cents:t,count:n}))}function wm({storage:i,now:e=Date.now,idFactory:t}={}){let n=!0,s=0;if(i===void 0)try{i=globalThis.localStorage}catch{n=!1}(typeof(i==null?void 0:i.getItem)!="function"||typeof(i==null?void 0:i.setItem)!="function")&&(n=!1);const r=()=>{try{const v=e();return Kt(v)?v:Date.now()}catch{return Date.now()}},a=()=>{var v,m;s+=1;try{const p=t==null?void 0:t();if(typeof p=="string"&&p.trim())return p.slice(0,128)}catch{}return`shift-${r()}-${((m=(v=globalThis.crypto)==null?void 0:v.randomUUID)==null?void 0:m.call(v))||`${Math.random().toString(36).slice(2)}-${s}`}`},o=()=>{if(!i||typeof i.getItem!="function")return{current:null,history:[]};try{const v=bm(i.getItem(sd));return n=typeof i.setItem=="function",v}catch{return n=!1,{current:null,history:[]}}},l=o();let c=l.current,d=l.history;const u=new Set((c==null?void 0:c.entries.map(v=>v.id))||[]);function h(v){const m=new Map;for(const p of[...v.history,v.current,...d].filter(Boolean))m.set(p.id,ad(m.get(p.id),p));if(c){const{status:p,endedAt:E}=c;c={...ad(c,m.get(c.id)),status:p,endedAt:E},m.delete(c.id);for(const b of c.entries)u.add(b.id)}d=[...m.values()].sort((p,E)=>E.startedAt-p.startedAt||E.id.localeCompare(p.id)).slice(0,rf-(c?1:0))}h({current:null,history:[]});function f(){if(h(o()),!i||typeof i.setItem!="function"){n=!1;return}try{i.setItem(sd,JSON.stringify({version:af,current:c,history:d})),n=!0}catch{n=!1}}const g=()=>cf(JSON.parse(JSON.stringify({current:c,history:d,storageAvailable:n})));return{snapshot:g,startShift({levelId:v="starter",sceneId:m="restaurant"}={}){h(o()),c&&d.unshift(c.status==="active"?{...c,status:"interrupted",endedAt:Math.max(r(),c.startedAt)}:c);const p=new Set(d.map(b=>b.id));let E=a();for(;p.has(E);)E=`${E.slice(0,112)}-${++s}`;return c={id:E,startedAt:r(),endedAt:null,status:"active",levelId:ln(v,40),sceneId:ln(m,40),counts:Mm(),entries:[]},u.clear(),f(),g()},record(v,m,p){var F,H,K,Q,te,ie,q;if(!c||c.status!=="active"||v===m||!["total","change"].includes(p)||(v==null?void 0:v.phase)!==p||(m==null?void 0:m.phase)!==p||((F=m==null?void 0:m.feedback)==null?void 0:F.type)!=="try")return!1;const E=(H=m.attempts)==null?void 0:H[p];if(!Kt((K=v.attempts)==null?void 0:K[p])||!Kt(E)||E!==v.attempts[p]+1||!Kt(v.round)||!v.order||((Q=m.order)==null?void 0:Q.id)!==v.order.id||m.round!==v.round)return!1;const b=p==="total",x=b&&typeof m.answer=="string"?m.answer:"",A=b?au(x):(te=m.selectedMoney)==null?void 0:te.reduce((pe,me)=>pe+me,0),R=b?A===null?"invalid":m.feedback.totalDirection||(Kt(v.order.totalCents)&&A!==v.order.totalCents?A>v.order.totalCents?"too-high":"too-low":null):m.feedback.changeDirection;if(!(b?["too-high","too-low","invalid"]:["too-much","too-little"]).includes(R))return!1;const P=`${c.id}:${ln(v.order.id,256)}:${v.round}:${p}:${E}`;if(u.has(P))return!1;const O=Tm(v.order),T=b?[]:Em(m.selectedMoney);if(!O||!T||!b&&!Kt(A))return!1;const M=uf({id:P,type:p,round:v.round+1,customerName:(ie=v.order.customer)==null?void 0:ie.name,customerKind:(q=v.order.customer)==null?void 0:q.kind,direction:R,enteredText:x,enteredCents:A,items:O,money:T,...b?{}:{billCents:v.order.totalCents,cashCents:v.order.paidCents}});if(!M)return!1;u.add(P);const D={...c.counts,all:c.counts.all+1,[p]:c.counts[p]+1};return R==="invalid"&&(D.invalid+=1),c={...c,counts:D,entries:[...c.entries,M].slice(-200)},f(),!0},finishShift({score:v,completed:m,durationMs:p}={}){return!c||c.status!=="active"||(c={...c,status:"completed",endedAt:Math.max(r(),c.startedAt),...Number.isSafeInteger(v)?{score:v}:{},...Kt(m)?{completed:m}:{},...Kt(p)?{durationMs:p}:{}},f()),g()}}}const df={starter:"Starter",shopkeeper:"Shopkeeper",expert:"Money master"},od={"too-high":"Too high","too-low":"Too low","too-much":"Too much change","too-little":"Too little change",invalid:"Check the amount format"};function Fi(i){return String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function wo(i){return Number.isSafeInteger(i)&&i>=0?i:0}function Xa(i){return Number.isSafeInteger(i)&&i>=0?Lt(i):"—"}function cu(i){return Object.fromEntries(["all","total","change","invalid"].map(e=>{var t;return[e,wo((t=i==null?void 0:i.counts)==null?void 0:t[e])]}))}function hf(i){const e=cu(i);return`<dl class="learning-counts"><div><dt>Wrong answers</dt><dd data-learning-count="all">${e.all}</dd></div><div><dt>Bill totals</dt><dd data-learning-count="total">${e.total}</dd></div><div><dt>Change</dt><dd data-learning-count="change">${e.change}</dd></div><div><dt>Amount format</dt><dd data-learning-count="invalid">${e.invalid}</dd></div></dl>`}function ff(i){if(i==null||i==="")return"";const e=new Date(i);return Number.isFinite(e.getTime())?e.toLocaleString(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Am(i){const e=(i==null?void 0:i.type)==="change",t=e?"change":"total",n=od[i==null?void 0:i.direction]?i.direction:"",s=od[n]??"Try again",r=Fi((i==null?void 0:i.customerName)||"Customer"),a=wo(i==null?void 0:i.round),l=`<ul class="learning-food-list" data-learning-foods>${(Array.isArray(i==null?void 0:i.items)?i.items:[]).map(f=>`<li><span>${Fi((f==null?void 0:f.name)||"Food item")}</span><strong>${wo(f==null?void 0:f.quantity)} × ${Xa(f==null?void 0:f.priceCents)}</strong></li>`).join("")}</ul>`,c=String((i==null?void 0:i.enteredText)??"").trim()?String(i.enteredText):"(empty)",d=Array.isArray(i==null?void 0:i.money)?i.money:[],u=`<div class="learning-change-prompt" data-learning-change-prompt><span>Cash <strong>${Xa(i==null?void 0:i.cashCents)}</strong></span><span aria-hidden="true">−</span><span>Bill <strong>${Xa(i==null?void 0:i.billCents)}</strong></span><span>= <strong>?</strong> change</span></div><div class="learning-submission" data-learning-submission><span>You selected</span>${d.length?`<ul class="learning-money-list" data-learning-money>${d.map(f=>`<li>${Xa(f==null?void 0:f.cents)} × ${wo(f==null?void 0:f.count)}</li>`).join("")}</ul>`:"<p data-learning-money>No notes or coins selected.</p>"}</div>`,h=`${l}<div class="learning-submission" data-learning-submission><span>You entered</span><strong class="learning-entered-text">${Fi(c)}</strong></div>${n==="invalid"?'<p class="learning-format-help">Use a number in dollars and cents.</p>':""}`;return`<article class="learning-entry" data-learning-entry data-type="${t}" data-direction="${Fi(n)}"><header><div><h4>${e?"Change":"Bill total"}${a?` · Customer ${a}`:""}</h4><p>${r}</p></div><span class="learning-verdict"><span aria-hidden="true">✕</span>${Fi(s)}</span></header>${e?u:h}</article>`}function Rm(i){const e=Array.isArray(i==null?void 0:i.entries)?i.entries:[],t=cu(i).all;return!t&&!e.length?'<p class="learning-empty">No wrong answers here yet. Take your time and keep practising!</p>':`${t>e.length?`<p class="learning-limit-note">Showing the latest ${e.length} of ${t} wrong answers. Every try is still included in the counts.</p>`:""}<div class="learning-entries">${e.slice().reverse().map(Am).join("")}</div>`}function cd(i,e=!1){const t=Fi(df[i==null?void 0:i.levelId]??"Cashier practice"),n=Fi(ff(i==null?void 0:i.startedAt));return`<section class="learning-shift" ${e?"data-learning-current":""}><div class="learning-shift-title"><h3>${e?"This shift":"Previous shift"}</h3><p>${t}${n?` · ${n}`:""}</p></div>${hf(i)}${Rm(i)}</section>`}function Cm(){return'<dialog id="learning-review" class="learning-review-dialog" aria-labelledby="learning-review-title" aria-describedby="learning-review-intro"><header class="learning-review-header"><div><span class="learning-eyebrow">LEARNING NOTEBOOK</span><h2 id="learning-review-title">Wrong answer review</h2></div><button type="button" id="learning-review-close" aria-label="Close wrong answer review" autofocus>×</button></header><p id="learning-review-intro">Look back at your tries. Work out the answers yourself!</p><div id="learning-review-content" class="learning-review-content"></div></dialog>'}function Im(i={}){const e=i==null?void 0:i.current,t=Array.isArray(i==null?void 0:i.history)?i.history:[],n=t.map(s=>{const r=cu(s).all,a=Fi(df[s==null?void 0:s.levelId]??"Cashier practice"),o=Fi(ff(s==null?void 0:s.startedAt));return`<details class="learning-previous-shift"><summary><span>${a}${o?` · ${o}`:""}</span><strong>${r} wrong ${r===1?"answer":"answers"}</strong></summary>${cd(s)}</details>`}).join("");return`<p class="learning-storage-note" data-learning-storage>${(i==null?void 0:i.storageAvailable)===!1?"Memory only · This browser could not save your review. It will be lost when you reload.":"Saved in this browser · Your review stays on this device."}</p>${e?cd(e,!0):'<p class="learning-empty">Start a shift to collect your practice notes.</p>'}<p class="learning-count-note">Amount format tries are included in Bill totals.</p>${t.length?`<section class="learning-history"><h3>Previous shifts</h3><p class="learning-history-note">Up to 20 recent shifts are saved, with the latest 200 wrong answers from each.</p>${n}</section>`:""}`}function Pm(i){const e=document.getElementById("learning-review-content");e&&(e.innerHTML=Im(i))}function Lm(i){return`<section class="learning-summary" aria-label="Wrong answers this shift"><h3>Your practice notes</h3>${hf(i)}<p>Amount format tries are included in Bill totals.</p><button type="button" class="learning-review-button" data-action="review-mistakes">Review wrong answers</button></section>`}const lu=300*1e3,pf=Object.freeze([3,5,10].map(i=>Object.freeze({minutes:i,durationMs:i*60*1e3,label:`${i} minutes`}))),ld=i=>Number.isSafeInteger(i)&&i>0?i:lu;function Dm({durationMs:i=lu,getState:e=()=>({phase:"unload"}),isPaused:t=()=>!1,onExpire:n=()=>{},onUpdate:s=()=>{},now:r=()=>performance.now()}={}){let a=ld(i),o=0,l=!1,c=!1,d=!1,u=e().phase,h=0,f=null,g="",v=0,m=!!t();const p=()=>{const M=r();return Number.isFinite(M)?Math.max(h,M):h};h=p();function E(){const M=l&&!c&&!d&&u!=="finished",D=M&&!!t(),F=Math.max(0,a-o);return{durationMs:a,elapsedMs:o,remainingMs:F,remainingSeconds:Math.ceil(F/1e3),ratio:F/a,started:l,expired:c,paused:D,running:M&&!D,disposed:d}}function b(M=!1){const D=E(),F=`${D.remainingSeconds}:${D.started}:${D.expired}:${D.paused}:${D.running}`;(M||F!==g)&&(g=F,s(D))}function x(){clearInterval(f),f=null}function A(M=!1){if(d)return;const D=p(),F=!!t();if(l&&!c&&u!=="finished"&&!m&&(!F||M)&&(o=Math.min(a,o+D-h)),h=D,m=F,l&&!c&&o>=a){c=!0,x();const H=v,K=E();b(!0),!d&&H===v&&n(K)}else b()}function R(){return A(),E()}function P(M,D){if(d)return E();const F=v,H=c;return A(),d||v!==F||!H&&c||(u=(D==null?void 0:D.phase)??e().phase,!l&&u==="scan"&&(l=!0,h=p(),m=!!t(),f=setInterval(R,100)),u==="finished"&&x(),b(!0)),E()}function O(){return A(!0),E()}function T(M=a){return d||(v+=1,x(),a=ld(M),o=0,l=!1,c=!1,u="unload",h=p(),m=!!t(),g="",b(!0)),E()}return{info:E,tick:R,sync:P,pauseChanged:O,reset:T,dispose(){d||(d=!0,v+=1,x())}}}const uu=Object.freeze({happy:[[72,0,.34,.034],[76,.17,.35,.036],[79,.34,.44,.036],[84,.58,.72,.029],[60,.58,.8,.015,"sine"]],restless:[[67,0,.36,.029],[72,.26,.39,.03],[69,.55,.44,.027],[67,.86,.62,.023]],impatient:[[74,0,.4,.03],[72,.29,.42,.029],[69,.58,.45,.027],[67,.9,.62,.023]],exhausted:[[67,0,.5,.025,"sine"],[64,.37,.54,.023,"sine"],[60,.78,.8,.02,"sine"]],relieved:[[64,0,.44,.026,"sine"],[67,.28,.47,.028],[72,.6,.82,.025],[60,.6,.82,.012,"sine"]],tired:[[64,0,.5,.022,"sine"],[62,.38,.54,.021,"sine"],[60,.8,.78,.019,"sine"]],"shift-end":[[72,0,.32,.032],[76,.17,.34,.034],[79,.34,.42,.034],[84,.61,.8,.03],[76,.61,.8,.015,"sine"],[60,.61,.92,.012,"sine"]]});Object.freeze(Object.keys(uu));const mf=i=>typeof i=="string"&&Object.hasOwn(uu,i),Nm=i=>440*2**((i-69)/12);function gf(i,e){i.oscillator.onended=null;try{i.gain.gain.cancelScheduledValues(e),i.gain.gain.setValueAtTime(0,e),i.oscillator.stop(e)}catch{}i.oscillator.disconnect(),i.gain.disconnect()}function Um(i,e,t,n=i.currentTime,s=()=>{}){if(!mf(t))return[];const r=[];try{for(const[a,o,l,c,d="triangle"]of uu[t]){const u=i.createOscillator(),h=i.createGain(),f={oscillator:u,gain:h};r.push(f);const g=n+o;u.type=d,u.frequency.value=Nm(a),h.gain.setValueAtTime(0,g),h.gain.linearRampToValueAtTime(c,g+.025),h.gain.exponentialRampToValueAtTime(1e-4,g+l),h.gain.linearRampToValueAtTime(0,g+l+.025),u.connect(h).connect(e),u.onended=()=>{u.disconnect(),h.disconnect(),s(f)},u.start(g),u.stop(g+l+.03)}return r}catch(a){for(const o of r)gf(o,i.currentTime);throw a}}function Om({isEnabled:i=()=>!0,isPaused:e=()=>!1,onStateChange:t=()=>{}}={}){var D;const n=globalThis.AudioContext||globalThis.webkitAudioContext,s=globalThis.document;let r,a=!1,o=!1,l=0,c=null,d=null,u="idle",h=null,f=0,g=0,v=0;const m=new Set,p=()=>!a&&!!(typeof i=="function"?i():i),E=()=>!!(s!=null&&s.hidden||(typeof e=="function"?e():e)),b=()=>p()?E()?"paused":null:"muted",x=()=>({enabled:p(),paused:E(),disposed:a,unlocked:o,mood:c,pendingMood:d,status:u,playing:u==="playing"&&(r==null?void 0:r.state)==="running"&&m.size>0,activeVoices:m.size,playCount:f,scheduledCount:g,cancelCount:v,contextState:(r==null?void 0:r.state)??"not-started",error:h}),A=()=>t(x());function R(F="cancelled"){l++,(m.size||d||u==="resuming")&&v++,d=null;for(const H of m)gf(H,r.currentTime);m.clear(),u=F}function P(){return n?((!r||r.state==="closed")&&(r=new n),r):(u="unavailable",A(),null)}async function O(F,H){try{const K=P();if(!K||(u="resuming",A(),await K.resume(),a||H!==l))return;const Q=b();if(Q){R(Q),A();return}if(K.state!=="running")throw new Error("Music cue could not start.");Um(K,K.destination,F,K.currentTime+.015,ie=>{m.delete(ie),!(a||H!==l)&&(m.size||(u="ended",A()))}).forEach(ie=>m.add(ie)),g++,u="playing",A()}catch(K){if(a||H!==l)return;R("error"),h=(K==null?void 0:K.message)||"Music cues are unavailable.",A()}}async function T(F){try{const H=P();if(!H||(await H.resume(),a||F!==l))return;const K=b();if(K){R(K),A();return}if(H.state!=="running")throw new Error("Music cue could not start.");u="idle",A()}catch(H){if(a||F!==l)return;u="error",h=(H==null?void 0:H.message)||"Music cues are unavailable.",A()}}function M(){s!=null&&s.hidden&&(R("paused"),A())}return(D=s==null?void 0:s.addEventListener)==null||D.call(s,"visibilitychange",M),{info:x,play(F){if(a||!mf(F))return x();R("idle"),c=F,h=null;const H=b();return H?(u=H,A(),x()):(f++,o?(O(F,l),x()):(d=F,u="locked",A(),x()))},unlock(){if(a)return x();const F=b();if(F)return R(F),A(),x();if(o=!0,d){const H=d;d=null,O(H,++l)}else!["playing","resuming"].includes(u)&&(r==null?void 0:r.state)!=="running"&&(u="resuming",T(++l));return A(),x()},cancel(){return a||(R(b()||"cancelled"),A()),x()},dispose(){var F;a||(R("disposed"),a=!0,(F=s==null?void 0:s.removeEventListener)==null||F.call(s,"visibilitychange",M),r&&r.state!=="closed"&&r.close().catch(()=>{}),A())}}}const Fm=60/108/2,km=[[76,null,79,81,null,79,76,null],[74,null,76,79,null,76,72,null],[72,74,76,null,79,null,76,74],[71,null,74,76,null,74,71,null],[76,null,79,84,null,81,79,null],[77,null,76,74,null,72,74,null],[72,76,null,79,77,null,76,74],[71,null,74,null,72,null,null,null]],Bm=[[60,64,67,71],[57,60,64,67],[53,57,60,64],[55,59,62,65],[60,64,67,71],[53,57,60,64],[62,65,69,72],[55,59,62,65]],zm=[36,33,29,31,36,29,38,31],Hm=i=>440*2**((i-69)/12),ud=new WeakMap;function qa(i,e,t,n,s,r,a,o){const l=i.createOscillator(),c=i.createGain();l.type=a,l.frequency.value=Hm(t),c.gain.setValueAtTime(0,n),c.gain.linearRampToValueAtTime(r,n+.012),c.gain.exponentialRampToValueAtTime(1e-4,n+s),l.connect(c).connect(e),l.onended=()=>{l.disconnect(),c.disconnect(),o==null||o(l,!1)},o==null||o(l,!0),l.start(n),l.stop(n+s+.02)}function Vm(i,e,t,n){let s=ud.get(i);if(!s){s=i.createBuffer(1,Math.ceil(i.sampleRate*.055),i.sampleRate);const l=s.getChannelData(0);let c=87241;for(let d=0;d<l.length;d++)c=Math.imul(c,1664525)+1013904223>>>0,l[d]=(c/4294967296*2-1)*(1-d/l.length);ud.set(i,s)}const r=i.createBufferSource(),a=i.createBiquadFilter(),o=i.createGain();r.buffer=s,a.type="highpass",a.frequency.value=4200,o.gain.value=.016,r.connect(a).connect(o).connect(e),r.onended=()=>{r.disconnect(),a.disconnect(),o.disconnect(),n==null||n(r,!1)},n==null||n(r,!0),r.start(t)}function Gm(i,e,t,n,s){const r=Math.floor(t/8)%8,a=t%8,o=km[r][a];o!==null&&(qa(i,e,o,n,.42,.14,"sine",s),qa(i,e,o+12,n,.13,.02,"sine",s)),(a===0||a===4)&&qa(i,e,zm[r]+(a===4?7:0),n,.45,.07,"triangle",s),(a===2||a===6)&&Bm[r].forEach((l,c)=>qa(i,e,l,n+c*.012,.26,.022,"triangle",s)),a%2&&Vm(i,e,n,s)}function Wm({enabled:i=!0,onStateChange:e=()=>{}}={}){let t,n,s,r,a=!1,o=!1,l=!1,c=0,d=0,u=0,h=0,f=null;const g=new Set,v=(R,P)=>P?g.add(R):g.delete(R),m=()=>({enabled:i,unlocked:a,playing:o&&(t==null?void 0:t.state)==="running",contextState:(t==null?void 0:t.state)??"not-started",scheduledSteps:h,activeVoices:g.size,error:f}),p=()=>e(m());function E(){if(!(!o||!t||document.hidden))for(d<t.currentTime-.1&&(d=t.currentTime+.035);d<t.currentTime+.16;)Gm(t,n,u++,d,v),d+=Fm,h++}function b(){o=!1;const R=++c;if(clearInterval(s),clearTimeout(r),t&&t.state!=="closed"){n.gain.cancelScheduledValues(t.currentTime),n.gain.setTargetAtTime(0,t.currentTime,.015);for(const P of g)try{P.stop(t.currentTime+.05)}catch{}r=setTimeout(()=>{R===c&&!o&&t.state!=="closed"&&t.suspend().then(p).catch(()=>{})},70)}p()}async function x(){if(l||!i||!a||document.hidden||o)return;clearTimeout(r);const R=++c;try{if(!t){const P=window.AudioContext||window.webkitAudioContext;t=new P,n=t.createGain(),n.gain.value=0,n.connect(t.destination)}if(await t.resume(),l||R!==c||!i||document.hidden)return;f=null,o=!0,n.gain.cancelScheduledValues(t.currentTime),n.gain.setTargetAtTime(.28,t.currentTime,.07),d=t.currentTime+.035,E(),clearInterval(s),s=setInterval(E,90),p()}catch(P){f=P.message,o=!1,p()}}function A(){document.hidden?b():x()}return document.addEventListener("visibilitychange",A),{info:m,unlock(){l||(a=!0,x())},setEnabled(R){i=!!R,i?x():b(),p()},dispose(){l=!0,o=!1,c++,clearInterval(s),clearTimeout(r),document.removeEventListener("visibilitychange",A);for(const R of g)try{R.stop()}catch{}g.clear(),t&&t.state!=="closed"&&t.close().catch(()=>{})}}}const $m="Kokoro-82M",du=Object.freeze({bear:Object.freeze({voice:"am_puck",lang:"a",speed:.94,pitch:1}),bunny:Object.freeze({voice:"af_bella",lang:"a",speed:1.02,pitch:1}),fox:Object.freeze({voice:"am_fenrir",lang:"a",speed:1,pitch:1}),penguin:Object.freeze({voice:"af_sarah",lang:"a",speed:.96,pitch:1}),cat:Object.freeze({voice:"af_nicole",lang:"a",speed:.98,pitch:1})}),dd=Object.freeze({"too-little":"That is too little change. Please add some more.","too-much":"That is too much change. Please take some back."}),hd=Object.freeze({"too-low":"That total is too low. Please try again.","too-high":"That total is too high. Please try again."}),al=Object.freeze({bear:{restless:"My tummy is starting to rumble…",impatient:"Oh dear, my food is getting cold.",exhausted:"That was a very long wait for a hungry bear.",happy:"Wonderful! A big bear thank-you!",relieved:"Phew! Lunch at last. Thank you!",tired:"Thanks. This bear needs lunch and a rest."},bunny:{restless:"My paws are getting a little fidgety…",impatient:"Could we hop along a bit faster, please?",exhausted:"My ears have drooped. I’ve waited so long.",happy:"Hooray! A happy hop for you!",relieved:"Phew! Ready to hop home. Thank you!",tired:"Thank you. I’m too tired for a happy hop."},fox:{restless:"Hmm… are we nearly ready?",impatient:"My lunch break is slipping away!",exhausted:"I really wish that had been quicker.",happy:"Lovely work, clever cashier!",relieved:"All sorted at last. Thanks!",tired:"Thanks. I’d better hurry along now."},penguin:{restless:"Waddle, waddle… still waiting!",impatient:"My flippers are getting restless.",exhausted:"That was a long time standing on these feet.",happy:"Flippers up! Thank you so much!",relieved:"Phew! Time to waddle home. Thanks!",tired:"Thanks. A slow waddle home for me."},cat:{restless:"Mrr… is my order almost ready?",impatient:"My whiskers are twitching. Please hurry!",exhausted:"I’ve waited so long I need a catnap.",happy:"Purr-fect! Thank you, cashier!",relieved:"At last! A little purr of thanks.",tired:"Thank you. Now I need a catnap."}}),Xm=Object.freeze({bear:"A big bear thank-you!",bunny:"Hooray! Kisses and happy hops!",fox:"Lovely work, clever cashier!",penguin:"Flippers up! Thank you!",cat:"Purr-fect! Kisses for you!"}),qm=Object.freeze({unload:"Hello! Here’s my takeaway order.",scan:"Hello! Here’s my takeaway order.",total:"How much do I owe you?",drawer:"My change, please!",change:"My change, please!",finished:"See you on your next shift!"});function mr(i){const e=typeof i=="string"?i.toLowerCase():"bear";return Object.hasOwn(du,e)?e:"bear"}function fd(i="bear",e="happy"){const t=mr(i),n=e==="tired"||e==="exhausted"?.96:e==="impatient"||e==="restless"?1.035:1;return{character:t,...du[t],playbackRate:n,rate:n}}function gr(i){return typeof i=="string"&&Object.hasOwn(dd,i)?dd[i]:""}function _r(i){return typeof i=="string"&&Object.hasOwn(hd,i)?hd[i]:""}function Ym(i,e){return al[mr(i)][e]||al[mr(i)].happy}function Rs({phase:i,kind:e="bear",mood:t="calm",paidCents:n=1e3,emotion:s="happy",delivered:r=!1,changeCents:a=1,changeDirection:o=null,totalDirection:l=null}={}){const c=mr(e);return i==="total"&&_r(l)?_r(l):i==="change"&&gr(o)?gr(o):i==="success"?r?s==="tired"?"Thank you. Time for a rest!":s==="relieved"?"Phew! Thank you so much!":Xm[c]:`My ${a===0?"bag and receipt":"bag, receipt, and change"}, please!`:["scan","total","payment","drawer","change"].includes(i)&&["restless","impatient","exhausted"].includes(t)?`${i==="payment"?`Here’s ${Lt(n)}. `:""}${Ym(c,t)}`:i==="payment"?`Here’s ${Lt(n)}. Thank you!`:qm[i]||""}function Km(i){let e=2166136261;for(let t=0;t<i.length;t+=1)e=Math.imul(e^i.charCodeAt(t),16777619);return(e>>>0).toString(16).padStart(8,"0")}function jm(i,e){return`audio/kokoro/${mr(i)}/${Km(e)}.mp3`}function Jm(i,e,t="/"){return`${String(t||"/").replace(/\/?$/,"/")}${jm(i,e)}`}function Zm(i="bear"){const e=mr(i),t=new Set(Object.values(al[e]));for(const n of["unload","scan","total","drawer","change","finished"])t.add(Rs({phase:n,kind:e}));for(const n of["calm","restless","impatient","exhausted"])for(const s of[500,1e3,2e3,5e3])t.add(Rs({phase:"payment",kind:e,mood:n,paidCents:s}));for(const n of["happy","relieved","tired"])t.add(Rs({phase:"success",kind:e,emotion:n,delivered:!0}));for(const n of[0,1])t.add(Rs({phase:"success",kind:e,changeCents:n}));for(const n of["too-little","too-much"])t.add(Rs({phase:"change",kind:e,changeDirection:n}));for(const n of["too-low","too-high"])t.add(Rs({phase:"total",kind:e,totalDirection:n}));return[...t]}const Qm=Object.freeze({"too-little":[392,523.25,659.25],"too-much":[659.25,523.25,392]}),eg=Object.freeze([190,140]),tg=new Map(Object.keys(du).map(i=>[i,new Set(Zm(i))]));function ng({isEnabled:i=()=>!0,onStateChange:e=()=>{},baseURL:t="./"}={}){const n=globalThis.Audio,s=globalThis.AudioContext||globalThis.webkitAudioContext;let r,a,o,l=[],c=!1,d=0,u=null,h=null,f="",g=0,v=0,m=0,p=0,E=0,b=0,x=0,A="idle",R="idle",P=null,O=null,T=!1,M="bear",D="happy",F="dialogue",H=fd(M,D),K=null,Q=null;const te=new Set,ie=()=>!c&&!!(typeof i=="function"?i():i),q=typeof n=="function",pe=()=>({enabled:ie(),disposed:c,direction:u,totalDirection:h,line:f,playCount:g,totalPlayCount:v,dialogueCount:m,audioPlayCount:p,speechRequestCount:E,speechStartCount:b,cancelCount:x,audioActive:te.size>0&&(r==null?void 0:r.state)==="running",audioStatus:A,audioContextState:(r==null?void 0:r.state)??"not-started",speechStatus:R,speechAvailable:q,voiceName:P,audioError:K,speechError:Q,speechActive:T&&ie(),speechBoundary:0,speechCharIndex:0,boundarySource:"none",character:M,mood:D,kind:F,rate:H.playbackRate,pitch:H.pitch,voiceSpeed:H.speed,engine:$m,clipURL:O}),me=()=>e(pe());function Ve(){clearTimeout(o),o=void 0,T=!1;const j=a;if(j){a=void 0;for(const[ve,xe]of l)j.removeEventListener(ve,xe);l=[];try{j.pause()}catch{}try{j.currentTime=0}catch{}try{j.removeAttribute("src"),j.load()}catch{}}}function st(){for(const j of te){j.oscillator.onended=null;try{j.gain.gain.cancelScheduledValues(r.currentTime),j.gain.gain.setValueAtTime(0,r.currentTime),j.oscillator.stop(r.currentTime)}catch{}j.oscillator.disconnect(),j.gain.disconnect()}te.clear()}function _t(j="cancelled"){d+=1,(a||te.size||A==="resuming")&&(x+=1),Ve(),st(),A=j,R=j}async function St(j,ve,xe=!1){if(!s){A="unavailable",me();return}try{if((!r||r.state==="closed")&&(r=new s),A="resuming",me(),await r.resume(),j!==d||c)return;if(!ie()){_t("muted"),me();return}if(r.state!=="running")throw new Error("Audio could not start.");const Pe=r.currentTime+.012;for(const[Ze,Mt]of(xe?eg:Qm[ve]).entries()){const N=r.createOscillator(),lt=r.createGain(),je=Pe+Ze*(xe?.16:.13),Xe=xe?.105:Ze===2?.28:.2;N.type=xe?"square":"triangle",N.frequency.value=Mt,lt.gain.setValueAtTime(0,je),lt.gain.linearRampToValueAtTime(xe?.11:.16,je+.018),lt.gain.exponentialRampToValueAtTime(1e-4,je+Xe),N.connect(lt).connect(r.destination);const Te={oscillator:N,gain:lt};te.add(Te),N.onended=()=>{te.delete(Te),N.disconnect(),lt.disconnect(),j===d&&!te.size&&(A="ended",me())},N.start(je),N.stop(je+Xe+.015)}p+=1,A="playing",me()}catch(Pe){if(j!==d||c)return;st(),A="error",K=(Pe==null?void 0:Pe.message)||"Audio is unavailable.",me()}}function ft(j){var ve;if(!q){R="unavailable",Q="Kokoro recordings cannot play on this device.",me();return}if(!((ve=tg.get(M))!=null&&ve.has(f))){R="unavailable",Q="This line is not in the Kokoro dialogue catalog.",me();return}try{const xe=new n(O);let Pe=!1;a=xe,xe.preload="auto",xe.volume=1,xe.playbackRate=H.playbackRate,xe.preservesPitch=!0;const Ze=()=>j!==d||xe!==a||c?!1:ie()?!0:(_t("muted"),me(),!1),Mt=(Te,Qe)=>{Ze()&&(Ve(),R=Te,Q=Qe,me())},N=(Te,Qe,Ne)=>{clearTimeout(o),o=setTimeout(()=>{j!==d||xe!==a||R!==Te||Mt("unavailable",Ne)},Qe)},lt=(Te,Qe)=>{xe.addEventListener(Te,Qe),l.push([Te,Qe])};lt("playing",()=>{if(!Ze())return;Pe||(b+=1,Pe=!0),T=!0,R="speaking";const Te=Number.isFinite(xe.duration)?xe.duration*1e3/H.playbackRate+4e3:f.length*90/H.playbackRate+5e3;N("speaking",Math.min(2e4,Math.max(8e3,Math.ceil(Te))),"Kokoro playback did not finish on this device."),me()}),lt("pause",()=>{Ze()&&(clearTimeout(o),o=void 0,T=!1,R="paused",me())});const je=()=>{Ze()&&(T=!1,R="buffering",N("buffering",8e3,"Kokoro playback stopped loading."),me())};lt("waiting",je),lt("stalled",()=>{(xe.paused||xe.readyState<3)&&je()}),lt("ended",()=>{Ze()&&(Ve(),R="ended",me())}),lt("error",()=>{var Te;return Mt("error",`Kokoro recording could not play${(Te=xe.error)!=null&&Te.code?` (media error ${xe.error.code})`:""}.`)}),R="queued",N("queued",5e3,"Kokoro recording did not start on this device."),E+=1;const Xe=xe.play();Promise.resolve(Xe).then(()=>{if(j!==d||xe!==a||c){try{xe.pause()}catch{}return}ie()||(_t("muted"),me())},Te=>Mt("error",(Te==null?void 0:Te.message)||"Kokoro recording could not start.")),me()}catch(xe){if(j!==d||c)return;Ve(),R="error",Q=(xe==null?void 0:xe.message)||"Kokoro recording is unavailable.",me()}}function se(j,ve,xe=null,Pe=!1){_t(ie()?"idle":"muted"),u=Pe?null:xe,h=Pe?xe:null,f=j,D=typeof(ve==null?void 0:ve.mood)=="string"?ve.mood:"happy",F=Pe?"wrong-total":xe?"wrong-change":typeof(ve==null?void 0:ve.kind)=="string"?ve.kind:"dialogue",H=fd(ve==null?void 0:ve.character,D),M=H.character,K=Q=null,P=H.voice,O=Jm(M,f,t)}return{info:pe,play(j,ve={}){if(c||!gr(j))return pe();if(se(gr(j),ve,j),!ie())return me(),pe();g+=1;const xe=d;return St(xe,j),ft(xe),pe()},playTotal(j,ve={}){if(c||!_r(j))return pe();if(se(_r(j),ve,j,!0),!ie())return me(),pe();v+=1;const xe=d;return St(xe,j,!0),ft(xe),pe()},speak(j,ve={}){return c||typeof j!="string"||!j.trim()?pe():(se(j.trim(),ve),ie()?(m+=1,ft(d),pe()):(me(),pe()))},cancel(){return c||(_t(ie()?"cancelled":"muted"),me()),pe()},dispose(){c||(_t("cancelled"),c=!0,r&&r.state!=="closed"&&r.close().catch(()=>{}),me())}}}const pd=1550,uc=4200;function ig({getState:i,isPaused:e,onAdvance:t,onUpdate:n}){let s=null,r=0,a=performance.now(),o=!1,l=null,c=!1,d="";function u(){const p=!c&&s!==null&&i().phase==="success"&&i().order===s,E=p&&e(),b=p?r<650?"printing":r<pd?"handing-over":"departing":"idle",x=p&&r>=pd;return{active:p,paused:E,stage:b,elapsedMs:r,remainingMs:p?Math.max(0,uc-r):0,receiptDelivered:x,changeDelivered:x,bagDelivered:x,handoverDelivered:x}}function h(p=!1){const E=u(),b=`${E.stage}:${E.paused}:${Math.ceil(E.remainingMs/1e3)}`;(p||b!==d)&&(d=b,n==null||n(E))}function f(){clearInterval(l),l=null,s=null,r=0}function g(){if(c)return;if(!u().active){f(),h();return}const p=performance.now(),E=e();if(!E&&!o&&(r=Math.min(uc,r+Math.max(0,p-a))),a=p,o=E,r>=uc){f(),t();return}h()}function v(p,E){if(E.phase!=="success"){f();return}s!==E.order&&(f(),s=E.order,r=0,a=performance.now(),o=e(),d="",l=setInterval(g,50))}function m(){a=performance.now(),o=e(),h(!0)}return{info:u,sync:v,tick:g,pauseChanged:m,paint:h,dispose(){c=!0,f()}}}const sg=new Map([["Mia",15e4],["Leo",105e3],["Aunty Jo",18e4],["Sam",12e4],["Grandpa Ben",21e4],["Benny Bear",15e4],["Poppy Bunny",105e3],["Felix Fox",18e4],["Pip Penguin",12e4],["Coco Cat",21e4]]);function md(i,e="starter"){var s;const t=typeof((s=i==null?void 0:i.customer)==null?void 0:s.name)=="string"?i.customer.name.trim():"Customer",n=e==="expert"?6e4:e==="shopkeeper"?3e4:0;return{customerKey:`${(i==null?void 0:i.id)??"order"}:${t}`,budgetMs:(sg.get(t)??15e4)+n,elapsedMs:0}}function rg(i,e){if(!Number.isFinite(e)||e<=0||i.elapsedMs>=i.budgetMs)return i;const t=i.budgetMs-i.elapsedMs;return{...i,elapsedMs:i.elapsedMs+Math.min(e,t)}}function _f(i){const e=Math.max(0,i.budgetMs-i.elapsedMs),t=e/i.budgetMs,n=e===0?"exhausted":t<=.2?"impatient":t<=.5?"restless":"calm";return{remainingMs:e,remainingSeconds:Math.ceil(e/1e3),ratio:t,mood:n}}function vf(i,e=!0){if(!e)return{tier:"practice",delta:50,label:"Practice checkout"};const{ratio:t}=_f(i);return t>.5?{tier:"fast",delta:100,label:"Speedy service"}:t>.2?{tier:"steady",delta:60,label:"Good pace"}:t>0?{tier:"close",delta:20,label:"Just in time"}:{tier:"late",delta:-25,label:"Long wait"}}function yf(){return{points:0,results:[]}}function ag(i,e,t){return i.results.some(n=>n.customerKey===e)?i:{points:i.points+t.delta,results:[...i.results,{customerKey:e,...t}]}}const hu=i=>`${i<0?"−":"+"}${Math.abs(i)}`,xf=i=>String(i).replace("-","−");function Mf(){return'<span class="service-preview" data-score-preview><span data-score-preview-label>Finish now</span><b data-score-preview-points></b></span>'}function og(i){const e=vf(i,i.enabled),t=["success","finished"].includes(i.phase),n=i.enabled?i.phase==="unload"?"Fast service":e.tier==="late"?"Late service":"Finish now":"Each checkout";for(const s of document.querySelectorAll("[data-score-preview]"))s.hidden=t,s.dataset.scoreTier=e.tier,s.querySelector("[data-score-preview-label]").textContent=n,s.querySelector("[data-score-preview-points]").textContent=`${hu(e.delta)} pts`,s.setAttribute("aria-label",`${n}: ${e.delta<0?"lose":"earn"} ${Math.abs(e.delta)} points when this checkout is complete.`)}function cg(i){if(!i)return"";const e=i.tier==="late"?"Time ran out. Serve the next customer sooner to earn points back.":i.tier==="practice"?"Relaxed practice · no time bonus or penalty.":"Correct change, delivered on time.";return`<div class="service-result" data-score-tier="${i.tier}" role="status"><span class="service-result-symbol" aria-hidden="true">${i.delta<0?"−":"★"}</span><div><span class="service-result-label">${i.label}</span><strong class="service-points">${hu(i.delta)} <small>points</small></strong></div><p>${e}</p></div>`}function lg(i){const e=i.results.filter(s=>s.tier==="fast").length,t=i.results.filter(s=>s.tier==="late").length,n=i.results.every(s=>s.tier==="practice");return`<div class="shift-result" data-shift-result><span>YOUR SHIFT SCORE</span><strong>${xf(i.points)} <small>points</small></strong><p>${n?`${i.results.length} practice checkouts completed`:`${e} speedy ${e===1?"checkout":"checkouts"} · ${t} late ${t===1?"checkout":"checkouts"}`}</p></div>`}function ug(){var i,e;matchMedia("(prefers-reduced-motion: reduce)").matches||((i=document.querySelector(".service-result"))==null||i.animate([{opacity:0,transform:"translateY(6px) scale(.97)"},{opacity:1,transform:"translateY(0) scale(1)"}],{duration:340,easing:"ease-out"}),(e=document.getElementById("shift-score"))==null||e.animate([{transform:"scale(1)"},{transform:"scale(1.12)",offset:.4},{transform:"scale(1)"}],{duration:500,easing:"ease-out"}))}const gd=new Set(["scan","total","payment","drawer","change"]),dg={calm:"Patient",restless:"Getting restless",impatient:"Impatient",exhausted:"Very impatient"},Sf='<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 5.5V10l3 2"/></svg>',hg=i=>`${Math.floor(i/60)}:${String(i%60).padStart(2,"0")}`;function fg(){return`<div class="patience-widget" data-patience-widget><div class="patience-heading"><span data-patience-label>Patient</span><span class="patience-clock">${Sf}<b data-patience-time></b></span></div><div class="patience-meter" role="meter" aria-label="Customer patience" aria-valuemin="0"><i></i></div>${Mf()}</div>`}function bf(i=""){return`<span class="patience-badge ${i}" data-patience-badge>${Sf}<b data-patience-time></b><span data-patience-label>Patient</span>${Mf()}</span>`}function pg({getState:i,getView:e,isEnabled:t,onMoodChange:n,isPaused:s=()=>{var r;return document.hidden||!!((r=document.getElementById("settings"))!=null&&r.open)}}){let r=md(i().order,i().levelId),a=performance.now(),o="",l=!1;const c=()=>!!s();let d=c();function u(){const E=i(),b=_f(r),x=t(),A=gd.has(E.phase),R=x&&A&&c();return{...r,...b,enabled:x,paused:R,running:x&&A&&!R&&b.remainingMs>0,phase:E.phase}}function h(){const E=u();return E.enabled&&gd.has(E.phase)?E.mood:"calm"}function f(E=!1){if(l)return;const b=u(),x=["success","finished"].includes(b.phase),A=b.enabled?x?"served":b.paused?"paused":b.phase==="unload"?"ready":b.mood:"relaxed",R={relaxed:"Relaxed",served:"Served",paused:"Paused",ready:"Ready to serve"}[A]??dg[b.mood],P=b.enabled?x?"✓":hg(b.remainingSeconds):"∞",O=`${b.customerKey}:${A}:${P}`;if(!(!E&&O===o)){o=O;for(const T of document.querySelectorAll("[data-patience-widget], [data-patience-badge]")){T.dataset.patienceMood=h(),T.dataset.patienceStatus=A,T.querySelector("[data-patience-time]").textContent=P,T.querySelector("[data-patience-label]").textContent=R,T.setAttribute("aria-label",`${i().order.customer.name}: ${R}${b.enabled&&!x?`, ${b.remainingSeconds} seconds of patience remaining`:""}`);const M=T.querySelector(".patience-meter");M&&(M.hidden=!b.enabled||x,M.setAttribute("aria-valuemax",String(b.budgetMs/1e3)),M.setAttribute("aria-valuenow",String(b.remainingSeconds)),M.setAttribute("aria-valuetext",`${R}, ${P} remaining`),M.querySelector("i").style.width=`${b.ratio*100}%`)}og(b)}}function g(){var R,P;if(l)return;const E=performance.now(),b=Math.max(0,E-a);a=E;const x=u();x.running&&(r=rg(r,b));const A=u();A.mood!==x.mood?((P=(R=e())==null?void 0:R.setPatience)==null||P.call(R,h()),n(A.mood),f(!0)):f()}function v(E,b){var x,A;E.order!==b.order&&(r=md(b.order,b.levelId),document.getElementById("patience-announcer").textContent=""),a=performance.now(),o="",(A=(x=e())==null?void 0:x.setPatience)==null||A.call(x,h())}function m(){const E=c();E!==d&&(a=performance.now()),d=E,f(!0)}const p=window.setInterval(g,250);return document.addEventListener("visibilitychange",m),document.getElementById("settings").addEventListener("close",m),{info:u,render:f,tick:g,sync:v,pauseChanged:m,dispose(){var E;l=!0,clearInterval(p),document.removeEventListener("visibilitychange",m),(E=document.getElementById("settings"))==null||E.removeEventListener("close",m)}}}const mg=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);let fa=[];function gg(i){if(!["too-high","too-low"].includes(i)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".total-feedback-symbol");e!=null&&e.animate&&fa.push(e.animate([{transform:"scale(.7)"},{transform:"scale(1.2)",offset:.45},{transform:"scale(1)"}],{duration:360,easing:"ease-out"}));const t=document.querySelector(".total-entry .money-input");t!=null&&t.animate&&fa.push(t.animate([{transform:"translateX(0)"},{transform:"translateX(-3px)",offset:.2},{transform:"translateX(3px)",offset:.4},{transform:"translateX(-2px)",offset:.6},{transform:"translateX(2px)",offset:.8},{transform:"translateX(0)"}],{duration:320,easing:"ease-out"}))}function _g(i){if(!["too-little","too-much"].includes(i)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.getElementById("pos-register"),t=(s,r,a)=>{s!=null&&s.animate&&fa.push(s.animate(r,{duration:a,easing:"ease-out"}))},n=e.querySelector(".change-feedback-symbol");if(i==="too-little")t(n,[{transform:"translateY(0)"},{transform:"translateY(-7px)",offset:.3},{transform:"translateY(2px)",offset:.6},{transform:"translateY(0)"}],620),t(e.querySelector(".cash-drawer"),[{boxShadow:"0 0 0 0 #e7b94b00"},{boxShadow:"0 0 0 4px #e7b94ba6, 0 0 22px #e7b94b65",offset:.35},{boxShadow:"0 0 0 0 #e7b94b00"}],820);else{t(e.querySelector("#change-preview"),[{transform:"translateX(0)"},{transform:"translateX(-5px)",offset:.2},{transform:"translateX(5px)",offset:.4},{transform:"translateX(-3px)",offset:.6},{transform:"translateX(3px)",offset:.8},{transform:"translateX(0)"}],460);for(const s of e.querySelectorAll(".piece-minus"))t(s,[{transform:"scale(1)"},{transform:"scale(1.28)",offset:.45},{transform:"scale(1)"}],660)}}function vg(){return`<div class="pos-neck" aria-hidden="true"><i></i></div>
    <div class="pos-console">
      <div class="receipt-printer" aria-label="Receipt printer"><div class="printer-paper-window"><div id="printed-receipt" class="printed-receipt" aria-hidden="true"></div></div><div class="printer-slot" aria-hidden="true"></div><div class="printer-label"><span>THERMAL RECEIPT</span><i></i></div><div class="printer-vents" aria-hidden="true"></div></div>
      <div class="hardware-keypad" aria-label="Cash register number pad">${["7","8","9","4","5","6","1","2","3","⌫","0","."].map(i=>`<button data-key="${i}" aria-label="${i==="⌫"?"Delete last digit":i==="."?"Decimal point":i}" disabled>${i==="⌫"?"⌫":i}</button>`).join("")}</div>
      <div class="console-actions"><span class="hardware-label">CASH CONTROL</span><button id="hardware-total" data-action="total" disabled><span>↵</span>ENTER</button><div class="console-indicator"><i></i><span>POWER</span></div></div>
    </div>
    <section id="change-preview" class="change-preview" aria-label="Selected change tray" hidden></section>
    <div class="drawer-cabinet"><div class="drawer-cabinet-top" aria-hidden="true"><span>SUNNY POS · T-01</span><div class="cabinet-vents"></div></div><div id="cash-tray" class="drawer-slide" hidden></div><button class="register-base" id="drawer-open" disabled aria-label="Cash drawer is closed"><span class="drawer-lock" aria-hidden="true"><i></i></span><span class="drawer-front-handle"><span id="drawer-base-label">CASH DRAWER LOCKED</span></span><span class="drawer-open-light" aria-hidden="true"></span></button><div class="register-feet" aria-hidden="true"><i></i><i></i></div></div>`}function Tf(i){return`<span class="note-country">AUSTRALIA</span><span class="note-medallion" aria-hidden="true">✦</span><strong>${i.label}</strong><small>PLAY MONEY</small><span class="note-window" aria-hidden="true"></span>`}function yg(i){return`<div class="note-well"><button class="banknote physical-note" style="--money-color:${i.color}" data-money="${i.cents}" aria-label="Add ${i.label} note">${Tf(i)}</button><span class="note-clip" aria-hidden="true"></span><span class="well-label" aria-hidden="true">${i.label}</span></div>`}function _d(i){return`<div class="${i.kind==="note"?"note":"coin"}-well empty-well" data-unavailable-money="${i.cents}" role="img" aria-label="${i.label} ${i.kind} unavailable for this customer"><span class="empty-slot-outline" aria-hidden="true"></span><span class="empty-slot-word" aria-hidden="true">EMPTY</span>${i.kind==="note"?'<span class="note-clip" aria-hidden="true"></span>':""}<span class="well-label" aria-hidden="true">${i.label}</span></div>`}function xg(i){const e=Math.min(i.count,5),t=i.kind==="note"?Tf(i):`<span class="coin-rim"></span><strong>${i.label}</strong><small>AUSTRALIA</small>`,n=i.kind==="note"?"banknote physical-note":`coin physical-coin ${i.cents>=100?"gold":"silver"} ${i.cents===50?"fifty-cent":""}`;return`<span class="selected-art money-stack" data-stack-layers="${e}" style="--stack-depth:${e}" aria-hidden="true">${Array.from({length:e},(s,r)=>`<span class="piece-layer ${n}" style="--money-color:${i.color};--layer:${r}">${t}</span>`).join("")}</span>`}function Mg(i,e){const t=i.selectedMoney,n=Dn.map(s=>({...s,count:t.filter(r=>r===s.cents).length,index:t.lastIndexOf(s.cents)})).filter(s=>s.count);return`<header class="change-preview-header"><div><span class="change-tray-eyebrow">COUNT, THEN HAND BACK</span><h2>Your change tray</h2><span id="selected-piece-count">${t.length} ${t.length===1?"piece":"pieces"} selected</span></div>${bf()}</header>
    <div class="tray-calculation"><span>Cash <b>${Lt(i.order.paidCents)}</b></span><i>−</i><span>Bill <b>${Lt(i.order.totalCents)}</b></span><i>=</i><span class="tray-question">? change</span></div>
    <div class="selected-money" aria-label="Money selected for change">${n.length?n.map(s=>`<button class="change-piece ${s.kind}" data-remove="${s.index}" data-remove-value="${s.cents}" data-count="${s.count}" aria-label="Remove one ${s.label} ${s.kind}; ${s.count} selected"><span class="piece-minus" aria-hidden="true">−</span>${xg(s)}<span class="piece-count">${s.label} <b>× ${s.count}</b></span></button>`).join(""):'<div class="empty-change-tray"><span aria-hidden="true">＋</span><strong>Your tray is empty</strong><p>Pick notes and coins from the open drawer.</p></div>'}</div>
    <footer class="change-preview-footer">${e}<div class="change-tray-tools"><span>Tap a piece to put one back</span><button class="clear-tray" data-action="clear" ${t.length?"":"disabled"}>Clear tray</button></div><button class="primary-button" data-action="change">Give the change <span aria-hidden="true">→</span></button></footer>`}function Sg(i){return`<div class="coin-well"><button class="coin physical-coin ${i.cents>=100?"gold":"silver"} ${i.cents===50?"fifty-cent":""}" data-money="${i.cents}" aria-label="Add ${i.label} coin"><span class="coin-rim" aria-hidden="true"></span><strong>${i.label}</strong><small aria-hidden="true">AUSTRALIA</small></button><span class="well-label" aria-hidden="true">${i.label}</span></div>`}function bg(i,e,t="",n=""){var g;for(const v of fa)v.cancel();fa=[];const s=i.phase==="change",r=new Set(ha(i).map(v=>v.cents)),a=Yo(i),o=document.getElementById("cash-tray"),l=document.getElementById("pos-register");l.dataset.drawer=s?"open":"closed",l.dataset.phase=i.phase,s&&["too-little","too-much"].includes(n)?l.dataset.changeFeedback=n:delete l.dataset.changeFeedback,o.hidden=!s,o.classList.toggle("just-opened",s&&e),o.innerHTML=s?`<div class="cash-drawer" data-drawer-level="${i.levelId}"><div class="drawer-label"><span>CHOOSE THE EXACT CHANGE</span><span>${r.size} MONEY TYPES · AUD</span></div>${a.length?`<div class="drawer-challenge" data-drawer-challenge><span><b>EMPTY:</b> ${a.map(v=>v.label).join(" · ")}</span><strong>Find another combination</strong></div>`:""}<div class="banknotes">${Dn.filter(v=>v.kind==="note").map(v=>r.has(v.cents)?yg(v):_d(v)).join("")}</div><div class="coins">${Dn.filter(v=>v.kind==="coin").map(v=>r.has(v.cents)?Sg(v):_d(v)).join("")}</div></div>`:"";const c=document.getElementById("change-preview"),d=((g=c.querySelector(".selected-money"))==null?void 0:g.scrollTop)??0;c.hidden=!s,c.innerHTML=s?Mg(i,t):"",l.dataset.changeFeedback?c.dataset.feedbackAttempt=String(i.attempts.change):delete c.dataset.feedbackAttempt,s&&(c.querySelector(".selected-money").scrollTop=d);for(const v of l.querySelectorAll("[data-key]"))v.disabled=i.phase!=="total";document.getElementById("hardware-total").disabled=i.phase!=="total";const u=document.getElementById("printed-receipt"),h=i.phase==="success";u.classList.toggle("receipt-printed",h);const f="SUNNY BITES";u.innerHTML=h?`<strong>${f}</strong><span>CHECKOUT 01</span><hr>${i.order.items.map(v=>`<span>${mg(v.name)} <b>${Lt(v.priceCents)}</b></span>`).join("")}<hr><span>TOTAL <b>${Lt(i.order.totalCents)}</b></span><span>CASH <b>${Lt(i.order.paidCents)}</b></span><span>CHANGE <b>CHECKED ✓</b></span><div class="receipt-barcode"></div><em>Thank you. Come again!</em>`:`<strong>${f}</strong><span>YOUR RECEIPT</span><div class="receipt-barcode"></div>`}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const fu="180",Tg=0,vd=1,Eg=2,Ef=1,wf=2,Di=3,Vi=0,Nn=1,ti=2,us=0,hr=1,yd=2,xd=3,Md=4,wg=5,Is=100,Ag=101,Rg=102,Cg=103,Ig=104,Pg=200,Lg=201,Dg=202,Ng=203,ol=204,cl=205,Ug=206,Og=207,Fg=208,kg=209,Bg=210,zg=211,Hg=212,Vg=213,Gg=214,ll=0,ul=1,dl=2,vr=3,hl=4,fl=5,pl=6,ml=7,Af=0,Wg=1,$g=2,ds=0,Xg=1,qg=2,Yg=3,Rf=4,Kg=5,jg=6,Jg=7,Sd="attached",Zg="detached",Cf=300,yr=301,xr=302,gl=303,_l=304,Ko=306,Mr=1e3,ls=1001,Oo=1002,An=1003,If=1004,na=1005,zn=1006,Ao=1007,ki=1008,vi=1009,Pf=1010,Lf=1011,pa=1012,pu=1013,Us=1014,si=1015,Ea=1016,mu=1017,gu=1018,ma=1020,Df=35902,Nf=35899,Uf=1021,Of=1022,Yn=1023,ga=1026,_a=1027,_u=1028,vu=1029,Ff=1030,yu=1031,xu=1033,Ro=33776,Co=33777,Io=33778,Po=33779,vl=35840,yl=35841,xl=35842,Ml=35843,Sl=36196,bl=37492,Tl=37496,El=37808,wl=37809,Al=37810,Rl=37811,Cl=37812,Il=37813,Pl=37814,Ll=37815,Dl=37816,Nl=37817,Ul=37818,Ol=37819,Fl=37820,kl=37821,Bl=36492,zl=36494,Hl=36495,Vl=36283,Gl=36284,Wl=36285,$l=36286,va=2300,ya=2301,dc=2302,bd=2400,Td=2401,Ed=2402,Qg=2500,e0=0,kf=1,Xl=2,t0=3200,n0=3201,Bf=0,i0=1,cs="",Wt="srgb",Cn="srgb-linear",Fo="linear",Ut="srgb",Gs=7680,wd=519,s0=512,r0=513,a0=514,zf=515,o0=516,c0=517,l0=518,u0=519,ql=35044,Ad="300 es",_i=2e3,ko=2001;class Ar{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const yn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Rd=1234567;const ra=Math.PI/180,Sr=180/Math.PI;function oi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(yn[i&255]+yn[i>>8&255]+yn[i>>16&255]+yn[i>>24&255]+"-"+yn[e&255]+yn[e>>8&255]+"-"+yn[e>>16&15|64]+yn[e>>24&255]+"-"+yn[t&63|128]+yn[t>>8&255]+"-"+yn[t>>16&255]+yn[t>>24&255]+yn[n&255]+yn[n>>8&255]+yn[n>>16&255]+yn[n>>24&255]).toLowerCase()}function mt(i,e,t){return Math.max(e,Math.min(t,i))}function Mu(i,e){return(i%e+e)%e}function d0(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function h0(i,e,t){return i!==e?(t-i)/(e-i):0}function aa(i,e,t){return(1-t)*i+t*e}function f0(i,e,t,n){return aa(i,e,1-Math.exp(-t*n))}function p0(i,e=1){return e-Math.abs(Mu(i,e*2)-e)}function m0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function g0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function _0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function v0(i,e){return i+Math.random()*(e-i)}function y0(i){return i*(.5-Math.random())}function x0(i){i!==void 0&&(Rd=i);let e=Rd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function M0(i){return i*ra}function S0(i){return i*Sr}function b0(i){return(i&i-1)===0&&i!==0}function T0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function E0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function w0(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),u=r((e-n)/2),h=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*d,l*u,l*h,o*c);break;case"YZY":i.set(l*h,o*d,l*u,o*c);break;case"ZXZ":i.set(l*u,l*h,o*d,o*c);break;case"XZX":i.set(o*d,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*d,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ni(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function It(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const as={DEG2RAD:ra,RAD2DEG:Sr,generateUUID:oi,clamp:mt,euclideanModulo:Mu,mapLinear:d0,inverseLerp:h0,lerp:aa,damp:f0,pingpong:p0,smoothstep:m0,smootherstep:g0,randInt:_0,randFloat:v0,randFloatSpread:y0,seededRandom:x0,degToRad:M0,radToDeg:S0,isPowerOfTwo:b0,ceilPowerOfTwo:T0,floorPowerOfTwo:E0,setQuaternionFromProperEuler:w0,normalize:It,denormalize:ni};class He{constructor(e=0,t=0){He.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class tt{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],u=n[s+3];const h=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(u!==v||l!==h||c!==f||d!==g){let m=1-o;const p=l*h+c*f+d*g+u*v,E=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const A=Math.sqrt(b),R=Math.atan2(A,p*E);m=Math.sin(m*R)/A,o=Math.sin(o*R)/A}const x=o*E;if(l=l*m+h*x,c=c*m+f*x,d=d*m+g*x,u=u*m+v*x,m===1-o){const A=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=A,c*=A,d*=A,u*=A}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],u=r[a],h=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+d*u+l*f-c*h,e[t+1]=l*g+d*h+c*u-o*f,e[t+2]=c*g+d*f+o*h-l*u,e[t+3]=d*g-o*u-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),u=o(r/2),h=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"YXZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"ZXY":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"ZYX":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"YZX":this._x=h*d*u+c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u-h*f*g;break;case"XZY":this._x=h*d*u-c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=n+o+u;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(d-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,h=Math.sin(t*d)/c;return this._w=a*u+this._w*h,this._x=n*u+this._x*h,this._y=s*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*d,this.y=n+l*d+o*c-r*u,this.z=s+l*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return hc.copy(this).projectOnVector(e),this.sub(hc)}reflect(e){return this.sub(hc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const hc=new C,Cd=new tt;class ut{constructor(e,t,n,s,r,a,o,l,c){ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],h=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],E=s[1],b=s[4],x=s[7],A=s[2],R=s[5],P=s[8];return r[0]=a*v+o*E+l*A,r[3]=a*m+o*b+l*R,r[6]=a*p+o*x+l*P,r[1]=c*v+d*E+u*A,r[4]=c*m+d*b+u*R,r[7]=c*p+d*x+u*P,r[2]=h*v+f*E+g*A,r[5]=h*m+f*b+g*R,r[8]=h*p+f*x+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,h=o*l-d*r,f=c*r-a*l,g=t*u+n*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(s*c-d*n)*v,e[2]=(o*n-s*a)*v,e[3]=h*v,e[4]=(d*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(fc.makeScale(e,t)),this}rotate(e){return this.premultiply(fc.makeRotation(-e)),this}translate(e,t){return this.premultiply(fc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const fc=new ut;function Hf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function xa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function A0(){const i=xa("canvas");return i.style.display="block",i}const Id={};function Ma(i){i in Id||(Id[i]=!0,console.warn(i))}function R0(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Pd=new ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ld=new ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function C0(){const i={enabled:!0,workingColorSpace:Cn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ut&&(s.r=zi(s.r),s.g=zi(s.g),s.b=zi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ut&&(s.r=fr(s.r),s.g=fr(s.g),s.b=fr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===cs?Fo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ma("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ma("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Cn]:{primaries:e,whitePoint:n,transfer:Fo,toXYZ:Pd,fromXYZ:Ld,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Wt},outputColorSpaceConfig:{drawingBufferColorSpace:Wt}},[Wt]:{primaries:e,whitePoint:n,transfer:Ut,toXYZ:Pd,fromXYZ:Ld,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Wt}}}),i}const xt=C0();function zi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function fr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ws;class I0{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ws===void 0&&(Ws=xa("canvas")),Ws.width=e.width,Ws.height=e.height;const s=Ws.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ws}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=xa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=zi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(zi(t[n]/255)*255):t[n]=zi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let P0=0;class Su{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:P0++}),this.uuid=oi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(pc(s[a].image)):r.push(pc(s[a]))}else r=pc(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function pc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?I0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let L0=0;const mc=new C;class nn extends Ar{constructor(e=nn.DEFAULT_IMAGE,t=nn.DEFAULT_MAPPING,n=ls,s=ls,r=zn,a=ki,o=Yn,l=vi,c=nn.DEFAULT_ANISOTROPY,d=cs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:L0++}),this.uuid=oi(),this.name="",this.source=new Su(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(mc).x}get height(){return this.source.getSize(mc).y}get depth(){return this.source.getSize(mc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Cf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Mr:e.x=e.x-Math.floor(e.x);break;case ls:e.x=e.x<0?0:1;break;case Oo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Mr:e.y=e.y-Math.floor(e.y);break;case ls:e.y=e.y<0?0:1;break;case Oo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}nn.DEFAULT_IMAGE=null;nn.DEFAULT_MAPPING=Cf;nn.DEFAULT_ANISOTROPY=1;class wt{constructor(e=0,t=0,n=0,s=1){wt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,x=(f+1)/2,A=(p+1)/2,R=(d+h)/4,P=(u+v)/4,O=(g+m)/4;return b>x&&b>A?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=R/n,r=P/n):x>A?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=R/s,r=O/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=P/r,s=O/r),this.set(n,s,r,t),this}let E=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(h-d)*(h-d));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(u-v)/E,this.z=(h-d)/E,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this.w=mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this.w=mt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class D0 extends Ar{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new wt(0,0,e,t),this.scissorTest=!1,this.viewport=new wt(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new nn(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:zn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Su(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Os extends D0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Vf extends nn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=An,this.minFilter=An,this.wrapR=ls,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class N0 extends nn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=An,this.minFilter=An,this.wrapR=ls,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Hn{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Jn):Jn.fromBufferAttribute(r,a),Jn.applyMatrix4(e.matrixWorld),this.expandByPoint(Jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ya.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ya.copy(n.boundingBox)),Ya.applyMatrix4(e.matrixWorld),this.union(Ya)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jn),Jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vr),Ka.subVectors(this.max,Vr),$s.subVectors(e.a,Vr),Xs.subVectors(e.b,Vr),qs.subVectors(e.c,Vr),Qi.subVectors(Xs,$s),es.subVectors(qs,Xs),Ms.subVectors($s,qs);let t=[0,-Qi.z,Qi.y,0,-es.z,es.y,0,-Ms.z,Ms.y,Qi.z,0,-Qi.x,es.z,0,-es.x,Ms.z,0,-Ms.x,-Qi.y,Qi.x,0,-es.y,es.x,0,-Ms.y,Ms.x,0];return!gc(t,$s,Xs,qs,Ka)||(t=[1,0,0,0,1,0,0,0,1],!gc(t,$s,Xs,qs,Ka))?!1:(ja.crossVectors(Qi,es),t=[ja.x,ja.y,ja.z],gc(t,$s,Xs,qs,Ka))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ai),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ai=[new C,new C,new C,new C,new C,new C,new C,new C],Jn=new C,Ya=new Hn,$s=new C,Xs=new C,qs=new C,Qi=new C,es=new C,Ms=new C,Vr=new C,Ka=new C,ja=new C,Ss=new C;function gc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ss.fromArray(i,r);const o=s.x*Math.abs(Ss.x)+s.y*Math.abs(Ss.y)+s.z*Math.abs(Ss.z),l=e.dot(Ss),c=t.dot(Ss),d=n.dot(Ss);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const U0=new Hn,Gr=new C,_c=new C;class yi{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):U0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gr.subVectors(e,this.center);const t=Gr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Gr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_c.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gr.copy(e.center).add(_c)),this.expandByPoint(Gr.copy(e.center).sub(_c))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Ri=new C,vc=new C,Ja=new C,ts=new C,yc=new C,Za=new C,xc=new C;class wa{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ri.copy(this.origin).addScaledVector(this.direction,t),Ri.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){vc.copy(e).add(t).multiplyScalar(.5),Ja.copy(t).sub(e).normalize(),ts.copy(this.origin).sub(vc);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ja),o=ts.dot(this.direction),l=-ts.dot(Ja),c=ts.lengthSq(),d=Math.abs(1-a*a);let u,h,f,g;if(d>0)if(u=a*l-o,h=a*o-l,g=r*d,u>=0)if(h>=-g)if(h<=g){const v=1/d;u*=v,h*=v,f=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-a*r+o)),h=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(u=Math.max(0,-(a*r+o)),h=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c);else h=a>0?-r:r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(vc).addScaledVector(Ja,h),f}intersectSphere(e,t){Ri.subVectors(e.center,this.origin);const n=Ri.dot(this.direction),s=Ri.dot(Ri)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),d>=0?(r=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ri)!==null}intersectTriangle(e,t,n,s,r){yc.subVectors(t,e),Za.subVectors(n,e),xc.crossVectors(yc,Za);let a=this.direction.dot(xc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ts.subVectors(this.origin,e);const l=o*this.direction.dot(Za.crossVectors(ts,Za));if(l<0)return null;const c=o*this.direction.dot(yc.cross(ts));if(c<0||l+c>a)return null;const d=-o*ts.dot(xc);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,n,s,r,a,o,l,c,d,u,h,f,g,v,m){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,u,h,f,g,v,m)}set(e,t,n,s,r,a,o,l,c,d,u,h,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Ys.setFromMatrixColumn(e,0).length(),r=1/Ys.setFromMatrixColumn(e,1).length(),a=1/Ys.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const h=a*d,f=a*u,g=o*d,v=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*d,f=l*u,g=c*d,v=c*u;t[0]=h+v*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=f*o-g,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*d,f=l*u,g=c*d,v=c*u;t[0]=h-v*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*d,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*d,f=a*u,g=o*d,v=o*u;t[0]=l*d,t[4]=g*c-f,t[8]=h*c+v,t[1]=l*u,t[5]=v*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*d,t[4]=v-h*u,t[8]=g*u+f,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*u+g,t[10]=h-v*u}else if(e.order==="XZY"){const h=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+v,t[5]=a*d,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*d,t[10]=v*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(O0,e,F0)}lookAt(e,t,n){const s=this.elements;return kn.subVectors(e,t),kn.lengthSq()===0&&(kn.z=1),kn.normalize(),ns.crossVectors(n,kn),ns.lengthSq()===0&&(Math.abs(n.z)===1?kn.x+=1e-4:kn.z+=1e-4,kn.normalize(),ns.crossVectors(n,kn)),ns.normalize(),Qa.crossVectors(kn,ns),s[0]=ns.x,s[4]=Qa.x,s[8]=kn.x,s[1]=ns.y,s[5]=Qa.y,s[9]=kn.y,s[2]=ns.z,s[6]=Qa.z,s[10]=kn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],h=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],E=n[3],b=n[7],x=n[11],A=n[15],R=s[0],P=s[4],O=s[8],T=s[12],M=s[1],D=s[5],F=s[9],H=s[13],K=s[2],Q=s[6],te=s[10],ie=s[14],q=s[3],pe=s[7],me=s[11],Ve=s[15];return r[0]=a*R+o*M+l*K+c*q,r[4]=a*P+o*D+l*Q+c*pe,r[8]=a*O+o*F+l*te+c*me,r[12]=a*T+o*H+l*ie+c*Ve,r[1]=d*R+u*M+h*K+f*q,r[5]=d*P+u*D+h*Q+f*pe,r[9]=d*O+u*F+h*te+f*me,r[13]=d*T+u*H+h*ie+f*Ve,r[2]=g*R+v*M+m*K+p*q,r[6]=g*P+v*D+m*Q+p*pe,r[10]=g*O+v*F+m*te+p*me,r[14]=g*T+v*H+m*ie+p*Ve,r[3]=E*R+b*M+x*K+A*q,r[7]=E*P+b*D+x*Q+A*pe,r[11]=E*O+b*F+x*te+A*me,r[15]=E*T+b*H+x*ie+A*Ve,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*o*h+n*c*h+s*o*f-n*l*f)+v*(+t*l*f-t*c*h+r*a*h-s*a*f+s*c*d-r*l*d)+m*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*d-n*c*d)+p*(-s*o*d-t*l*u+t*o*h+s*a*u-n*a*h+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],E=u*m*c-v*h*c+v*l*f-o*m*f-u*l*p+o*h*p,b=g*h*c-d*m*c-g*l*f+a*m*f+d*l*p-a*h*p,x=d*v*c-g*u*c+g*o*f-a*v*f-d*o*p+a*u*p,A=g*u*l-d*v*l-g*o*h+a*v*h+d*o*m-a*u*m,R=t*E+n*b+s*x+r*A;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/R;return e[0]=E*P,e[1]=(v*h*r-u*m*r-v*s*f+n*m*f+u*s*p-n*h*p)*P,e[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*p+n*l*p)*P,e[3]=(u*l*r-o*h*r-u*s*c+n*h*c+o*s*f-n*l*f)*P,e[4]=b*P,e[5]=(d*m*r-g*h*r+g*s*f-t*m*f-d*s*p+t*h*p)*P,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*p-t*l*p)*P,e[7]=(a*h*r-d*l*r+d*s*c-t*h*c-a*s*f+t*l*f)*P,e[8]=x*P,e[9]=(g*u*r-d*v*r-g*n*f+t*v*f+d*n*p-t*u*p)*P,e[10]=(a*v*r-g*o*r+g*n*c-t*v*c-a*n*p+t*o*p)*P,e[11]=(d*o*r-a*u*r-d*n*c+t*u*c+a*n*f-t*o*f)*P,e[12]=A*P,e[13]=(d*v*s-g*u*s+g*n*h-t*v*h-d*n*m+t*u*m)*P,e[14]=(g*o*s-a*v*s-g*n*l+t*v*l+a*n*m-t*o*m)*P,e[15]=(a*u*s-d*o*s+d*n*l-t*u*l-a*n*h+t*o*h)*P,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,u=o+o,h=r*c,f=r*d,g=r*u,v=a*d,m=a*u,p=o*u,E=l*c,b=l*d,x=l*u,A=n.x,R=n.y,P=n.z;return s[0]=(1-(v+p))*A,s[1]=(f+x)*A,s[2]=(g-b)*A,s[3]=0,s[4]=(f-x)*R,s[5]=(1-(h+p))*R,s[6]=(m+E)*R,s[7]=0,s[8]=(g+b)*P,s[9]=(m-E)*P,s[10]=(1-(h+v))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Ys.set(s[0],s[1],s[2]).length();const a=Ys.set(s[4],s[5],s[6]).length(),o=Ys.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Zn.copy(this);const c=1/r,d=1/a,u=1/o;return Zn.elements[0]*=c,Zn.elements[1]*=c,Zn.elements[2]*=c,Zn.elements[4]*=d,Zn.elements[5]*=d,Zn.elements[6]*=d,Zn.elements[8]*=u,Zn.elements[9]*=u,Zn.elements[10]*=u,t.setFromRotationMatrix(Zn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=_i,l=!1){const c=this.elements,d=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s);let g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===_i)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===ko)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=_i,l=!1){const c=this.elements,d=2/(t-e),u=2/(n-s),h=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===_i)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===ko)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ys=new C,Zn=new rt,O0=new C(0,0,0),F0=new C(1,1,1),ns=new C,Qa=new C,kn=new C,Dd=new rt,Nd=new tt;class Xt{constructor(e=0,t=0,n=0,s=Xt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-mt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-mt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Dd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Dd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Nd.setFromEuler(this),this.setFromQuaternion(Nd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Xt.DEFAULT_ORDER="XYZ";class bu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let k0=0;const Ud=new C,Ks=new tt,Ci=new rt,eo=new C,Wr=new C,B0=new C,z0=new tt,Od=new C(1,0,0),Fd=new C(0,1,0),kd=new C(0,0,1),Bd={type:"added"},H0={type:"removed"},js={type:"childadded",child:null},Mc={type:"childremoved",child:null};class zt extends Ar{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:k0++}),this.uuid=oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zt.DEFAULT_UP.clone();const e=new C,t=new Xt,n=new tt,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new rt},normalMatrix:{value:new ut}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new bu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ks.setFromAxisAngle(e,t),this.quaternion.multiply(Ks),this}rotateOnWorldAxis(e,t){return Ks.setFromAxisAngle(e,t),this.quaternion.premultiply(Ks),this}rotateX(e){return this.rotateOnAxis(Od,e)}rotateY(e){return this.rotateOnAxis(Fd,e)}rotateZ(e){return this.rotateOnAxis(kd,e)}translateOnAxis(e,t){return Ud.copy(e).applyQuaternion(this.quaternion),this.position.add(Ud.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Od,e)}translateY(e){return this.translateOnAxis(Fd,e)}translateZ(e){return this.translateOnAxis(kd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ci.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?eo.copy(e):eo.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Wr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ci.lookAt(Wr,eo,this.up):Ci.lookAt(eo,Wr,this.up),this.quaternion.setFromRotationMatrix(Ci),s&&(Ci.extractRotation(s.matrixWorld),Ks.setFromRotationMatrix(Ci),this.quaternion.premultiply(Ks.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Bd),js.child=e,this.dispatchEvent(js),js.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(H0),Mc.child=e,this.dispatchEvent(Mc),Mc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ci),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Bd),js.child=e,this.dispatchEvent(js),js.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wr,e,B0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wr,z0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}zt.DEFAULT_UP=new C(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qn=new C,Ii=new C,Sc=new C,Pi=new C,Js=new C,Zs=new C,zd=new C,bc=new C,Tc=new C,Ec=new C,wc=new wt,Ac=new wt,Rc=new wt;class Xn{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Qn.subVectors(e,t),s.cross(Qn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Qn.subVectors(s,t),Ii.subVectors(n,t),Sc.subVectors(e,t);const a=Qn.dot(Qn),o=Qn.dot(Ii),l=Qn.dot(Sc),c=Ii.dot(Ii),d=Ii.dot(Sc),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const h=1/u,f=(c*l-o*d)*h,g=(a*d-o*l)*h;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Pi)===null?!1:Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Pi.x),l.addScaledVector(a,Pi.y),l.addScaledVector(o,Pi.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return wc.setScalar(0),Ac.setScalar(0),Rc.setScalar(0),wc.fromBufferAttribute(e,t),Ac.fromBufferAttribute(e,n),Rc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(wc,r.x),a.addScaledVector(Ac,r.y),a.addScaledVector(Rc,r.z),a}static isFrontFacing(e,t,n,s){return Qn.subVectors(n,t),Ii.subVectors(e,t),Qn.cross(Ii).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qn.subVectors(this.c,this.b),Ii.subVectors(this.a,this.b),Qn.cross(Ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Xn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Xn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Xn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Js.subVectors(s,n),Zs.subVectors(r,n),bc.subVectors(e,n);const l=Js.dot(bc),c=Zs.dot(bc);if(l<=0&&c<=0)return t.copy(n);Tc.subVectors(e,s);const d=Js.dot(Tc),u=Zs.dot(Tc);if(d>=0&&u<=d)return t.copy(s);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(Js,a);Ec.subVectors(e,r);const f=Js.dot(Ec),g=Zs.dot(Ec);if(g>=0&&f<=g)return t.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Zs,o);const m=d*g-f*u;if(m<=0&&u-d>=0&&f-g>=0)return zd.subVectors(r,s),o=(u-d)/(u-d+(f-g)),t.copy(s).addScaledVector(zd,o);const p=1/(m+v+h);return a=v*p,o=h*p,t.copy(n).addScaledVector(Js,a).addScaledVector(Zs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Gf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},is={h:0,s:0,l:0},to={h:0,s:0,l:0};function Cc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class nt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,xt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=xt.workingColorSpace){return this.r=e,this.g=t,this.b=n,xt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=xt.workingColorSpace){if(e=Mu(e,1),t=mt(t,0,1),n=mt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Cc(a,r,e+1/3),this.g=Cc(a,r,e),this.b=Cc(a,r,e-1/3)}return xt.colorSpaceToWorking(this,s),this}setStyle(e,t=Wt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Wt){const n=Gf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=zi(e.r),this.g=zi(e.g),this.b=zi(e.b),this}copyLinearToSRGB(e){return this.r=fr(e.r),this.g=fr(e.g),this.b=fr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wt){return xt.workingToColorSpace(xn.copy(this),e),Math.round(mt(xn.r*255,0,255))*65536+Math.round(mt(xn.g*255,0,255))*256+Math.round(mt(xn.b*255,0,255))}getHexString(e=Wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=xt.workingColorSpace){xt.workingToColorSpace(xn.copy(this),t);const n=xn.r,s=xn.g,r=xn.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=xt.workingColorSpace){return xt.workingToColorSpace(xn.copy(this),t),e.r=xn.r,e.g=xn.g,e.b=xn.b,e}getStyle(e=Wt){xt.workingToColorSpace(xn.copy(this),e);const t=xn.r,n=xn.g,s=xn.b;return e!==Wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(is),this.setHSL(is.h+e,is.s+t,is.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(is),e.getHSL(to);const n=aa(is.h,to.h,t),s=aa(is.s,to.s,t),r=aa(is.l,to.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xn=new nt;nt.NAMES=Gf;let V0=0;class ci extends Ar{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:V0++}),this.uuid=oi(),this.name="",this.type="Material",this.blending=hr,this.side=Vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ol,this.blendDst=cl,this.blendEquation=Is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gs,this.stencilZFail=Gs,this.stencilZPass=Gs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hr&&(n.blending=this.blending),this.side!==Vi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ol&&(n.blendSrc=this.blendSrc),this.blendDst!==cl&&(n.blendDst=this.blendDst),this.blendEquation!==Is&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Gs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Gs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class qn extends ci{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xt,this.combine=Af,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const jt=new C,no=new He;let G0=0;class Rn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:G0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ql,this.updateRanges=[],this.gpuType=si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)no.fromBufferAttribute(this,t),no.applyMatrix3(e),this.setXY(t,no.x,no.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=It(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ni(t,this.array)),t}setX(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ni(t,this.array)),t}setY(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ni(t,this.array)),t}setZ(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ni(t,this.array)),t}setW(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),s=It(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),s=It(s,this.array),r=It(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ql&&(e.usage=this.usage),e}}class Wf extends Rn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class $f extends Rn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class kt extends Rn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let W0=0;const Gn=new rt,Ic=new zt,Qs=new C,Bn=new Hn,$r=new Hn,on=new C;class dn extends Ar{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:W0++}),this.uuid=oi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hf(e)?$f:Wf)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ut().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gn.makeRotationFromQuaternion(e),this.applyMatrix4(Gn),this}rotateX(e){return Gn.makeRotationX(e),this.applyMatrix4(Gn),this}rotateY(e){return Gn.makeRotationY(e),this.applyMatrix4(Gn),this}rotateZ(e){return Gn.makeRotationZ(e),this.applyMatrix4(Gn),this}translate(e,t,n){return Gn.makeTranslation(e,t,n),this.applyMatrix4(Gn),this}scale(e,t,n){return Gn.makeScale(e,t,n),this.applyMatrix4(Gn),this}lookAt(e){return Ic.lookAt(e),Ic.updateMatrix(),this.applyMatrix4(Ic.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qs).negate(),this.translate(Qs.x,Qs.y,Qs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new kt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Bn.setFromBufferAttribute(r),this.morphTargetsRelative?(on.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(on),on.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(on)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(Bn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];$r.setFromBufferAttribute(o),this.morphTargetsRelative?(on.addVectors(Bn.min,$r.min),Bn.expandByPoint(on),on.addVectors(Bn.max,$r.max),Bn.expandByPoint(on)):(Bn.expandByPoint($r.min),Bn.expandByPoint($r.max))}Bn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)on.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(on));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)on.fromBufferAttribute(o,c),l&&(Qs.fromBufferAttribute(e,c),on.add(Qs)),s=Math.max(s,n.distanceToSquared(on))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Rn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let O=0;O<n.count;O++)o[O]=new C,l[O]=new C;const c=new C,d=new C,u=new C,h=new He,f=new He,g=new He,v=new C,m=new C;function p(O,T,M){c.fromBufferAttribute(n,O),d.fromBufferAttribute(n,T),u.fromBufferAttribute(n,M),h.fromBufferAttribute(r,O),f.fromBufferAttribute(r,T),g.fromBufferAttribute(r,M),d.sub(c),u.sub(c),f.sub(h),g.sub(h);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(D),m.copy(u).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(D),o[O].add(v),o[T].add(v),o[M].add(v),l[O].add(m),l[T].add(m),l[M].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let O=0,T=E.length;O<T;++O){const M=E[O],D=M.start,F=M.count;for(let H=D,K=D+F;H<K;H+=3)p(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const b=new C,x=new C,A=new C,R=new C;function P(O){A.fromBufferAttribute(s,O),R.copy(A);const T=o[O];b.copy(T),b.sub(A.multiplyScalar(A.dot(T))).normalize(),x.crossVectors(R,T);const D=x.dot(l[O])<0?-1:1;a.setXYZW(O,b.x,b.y,b.z,D)}for(let O=0,T=E.length;O<T;++O){const M=E[O],D=M.start,F=M.count;for(let H=D,K=D+F;H<K;H+=3)P(e.getX(H+0)),P(e.getX(H+1)),P(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Rn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const s=new C,r=new C,a=new C,o=new C,l=new C,c=new C,d=new C,u=new C;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)on.fromBufferAttribute(e,t),on.normalize(),e.setXYZ(t,on.x,on.y,on.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*d;for(let p=0;p<d;p++)h[g++]=c[f++]}return new Rn(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new dn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const f=c[u];d.push(f.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],u=r[c];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hd=new rt,bs=new wa,io=new yi,Vd=new C,so=new C,ro=new C,ao=new C,Pc=new C,oo=new C,Gd=new C,co=new C;class Ct extends zt{constructor(e=new dn,t=new qn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){oo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],u=r[l];d!==0&&(Pc.fromBufferAttribute(u,e),a?oo.addScaledVector(Pc,d):oo.addScaledVector(Pc.sub(t),d))}t.add(oo)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(r),bs.copy(e.ray).recast(e.near),!(io.containsPoint(bs.origin)===!1&&(bs.intersectSphere(io,Vd)===null||bs.origin.distanceToSquared(Vd)>(e.far-e.near)**2))&&(Hd.copy(r).invert(),bs.copy(e.ray).applyMatrix4(Hd),!(n.boundingBox!==null&&bs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,bs)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=a[m.materialIndex],E=Math.max(m.start,f.start),b=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=E,A=b;x<A;x+=3){const R=o.getX(x),P=o.getX(x+1),O=o.getX(x+2);s=lo(this,p,e,n,c,d,u,R,P,O),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const E=o.getX(m),b=o.getX(m+1),x=o.getX(m+2);s=lo(this,a,e,n,c,d,u,E,b,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=a[m.materialIndex],E=Math.max(m.start,f.start),b=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=E,A=b;x<A;x+=3){const R=x,P=x+1,O=x+2;s=lo(this,p,e,n,c,d,u,R,P,O),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const E=m,b=m+1,x=m+2;s=lo(this,a,e,n,c,d,u,E,b,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function $0(i,e,t,n,s,r,a,o){let l;if(e.side===Nn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Vi,o),l===null)return null;co.copy(o),co.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(co);return c<t.near||c>t.far?null:{distance:c,point:co.clone(),object:i}}function lo(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,so),i.getVertexPosition(l,ro),i.getVertexPosition(c,ao);const d=$0(i,e,t,n,so,ro,ao,Gd);if(d){const u=new C;Xn.getBarycoord(Gd,so,ro,ao,u),s&&(d.uv=Xn.getInterpolatedAttribute(s,o,l,c,u,new He)),r&&(d.uv1=Xn.getInterpolatedAttribute(r,o,l,c,u,new He)),a&&(d.normal=Xn.getInterpolatedAttribute(a,o,l,c,u,new C),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new C,materialIndex:0};Xn.getNormal(so,ro,ao,h.normal),d.face=h,d.barycoord=u}return d}class $n extends dn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],u=[];let h=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new kt(c,3)),this.setAttribute("normal",new kt(d,3)),this.setAttribute("uv",new kt(u,2));function g(v,m,p,E,b,x,A,R,P,O,T){const M=x/P,D=A/O,F=x/2,H=A/2,K=R/2,Q=P+1,te=O+1;let ie=0,q=0;const pe=new C;for(let me=0;me<te;me++){const Ve=me*D-H;for(let st=0;st<Q;st++){const _t=st*M-F;pe[v]=_t*E,pe[m]=Ve*b,pe[p]=K,c.push(pe.x,pe.y,pe.z),pe[v]=0,pe[m]=0,pe[p]=R>0?1:-1,d.push(pe.x,pe.y,pe.z),u.push(st/P),u.push(1-me/O),ie+=1}}for(let me=0;me<O;me++)for(let Ve=0;Ve<P;Ve++){const st=h+Ve+Q*me,_t=h+Ve+Q*(me+1),St=h+(Ve+1)+Q*(me+1),ft=h+(Ve+1)+Q*me;l.push(st,_t,ft),l.push(_t,St,ft),q+=6}o.addGroup(f,q,T),f+=q,h+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function br(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Tn(i){const e={};for(let t=0;t<i.length;t++){const n=br(i[t]);for(const s in n)e[s]=n[s]}return e}function X0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Xf(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:xt.workingColorSpace}const q0={clone:br,merge:Tn};var Y0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,K0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fs extends ci{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Y0,this.fragmentShader=K0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=br(e.uniforms),this.uniformsGroups=X0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class qf extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=_i,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ss=new C,Wd=new He,$d=new He;class En extends qf{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Sr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ra*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Sr*2*Math.atan(Math.tan(ra*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ss.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ss.x,ss.y).multiplyScalar(-e/ss.z),ss.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ss.x,ss.y).multiplyScalar(-e/ss.z)}getViewSize(e,t){return this.getViewBounds(e,Wd,$d),t.subVectors($d,Wd)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ra*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const er=-90,tr=1;class j0 extends zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new En(er,tr,e,t);s.layers=this.layers,this.add(s);const r=new En(er,tr,e,t);r.layers=this.layers,this.add(r);const a=new En(er,tr,e,t);a.layers=this.layers,this.add(a);const o=new En(er,tr,e,t);o.layers=this.layers,this.add(o);const l=new En(er,tr,e,t);l.layers=this.layers,this.add(l);const c=new En(er,tr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===_i)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ko)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(u,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Yf extends nn{constructor(e=[],t=yr,n,s,r,a,o,l,c,d){super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class J0 extends Os{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Yf(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new $n(5,5,5),r=new fs({name:"CubemapFromEquirect",uniforms:br(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Nn,blending:us});r.uniforms.tEquirect.value=t;const a=new Ct(s,r),o=t.minFilter;return t.minFilter===ki&&(t.minFilter=zn),new j0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class $t extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Z0={type:"move"};class Lc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Z0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new $t;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Tu{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new nt(e),this.near=t,this.far=n}clone(){return new Tu(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Q0 extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xt,this.environmentIntensity=1,this.environmentRotation=new Xt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Kf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ql,this.updateRanges=[],this.version=0,this.uuid=oi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=oi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=oi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const bn=new C;class Sa{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyMatrix4(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyNormalMatrix(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.transformDirection(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=It(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ni(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ni(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ni(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ni(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=It(t,this.array),n=It(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=It(t,this.array),n=It(n,this.array),s=It(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=It(t,this.array),n=It(n,this.array),s=It(s,this.array),r=It(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Rn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Sa(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class jf extends ci{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let nr;const Xr=new C,ir=new C,sr=new C,rr=new He,qr=new He,Jf=new rt,uo=new C,Yr=new C,ho=new C,Xd=new He,Dc=new He,qd=new He;class e_ extends zt{constructor(e=new jf){if(super(),this.isSprite=!0,this.type="Sprite",nr===void 0){nr=new dn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Kf(t,5);nr.setIndex([0,1,2,0,2,3]),nr.setAttribute("position",new Sa(n,3,0,!1)),nr.setAttribute("uv",new Sa(n,2,3,!1))}this.geometry=nr,this.material=e,this.center=new He(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ir.setFromMatrixScale(this.matrixWorld),Jf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),sr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ir.multiplyScalar(-sr.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;fo(uo.set(-.5,-.5,0),sr,a,ir,s,r),fo(Yr.set(.5,-.5,0),sr,a,ir,s,r),fo(ho.set(.5,.5,0),sr,a,ir,s,r),Xd.set(0,0),Dc.set(1,0),qd.set(1,1);let o=e.ray.intersectTriangle(uo,Yr,ho,!1,Xr);if(o===null&&(fo(Yr.set(-.5,.5,0),sr,a,ir,s,r),Dc.set(0,1),o=e.ray.intersectTriangle(uo,ho,Yr,!1,Xr),o===null))return;const l=e.ray.origin.distanceTo(Xr);l<e.near||l>e.far||t.push({distance:l,point:Xr.clone(),uv:Xn.getInterpolation(Xr,uo,Yr,ho,Xd,Dc,qd,new He),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function fo(i,e,t,n,s,r){rr.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(qr.x=r*rr.x-s*rr.y,qr.y=s*rr.x+r*rr.y):qr.copy(rr),i.copy(e),i.x+=qr.x,i.y+=qr.y,i.applyMatrix4(Jf)}const Yd=new C,Kd=new wt,jd=new wt,t_=new C,Jd=new rt,po=new C,Nc=new yi,Zd=new rt,Uc=new wa;class n_ extends Ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Sd,this.bindMatrix=new rt,this.bindMatrixInverse=new rt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Hn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,po),this.boundingBox.expandByPoint(po)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new yi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,po),this.boundingSphere.expandByPoint(po)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Nc.copy(this.boundingSphere),Nc.applyMatrix4(s),e.ray.intersectsSphere(Nc)!==!1&&(Zd.copy(s).invert(),Uc.copy(e.ray).applyMatrix4(Zd),!(this.boundingBox!==null&&Uc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Uc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new wt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Sd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Zg?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Kd.fromBufferAttribute(s.attributes.skinIndex,e),jd.fromBufferAttribute(s.attributes.skinWeight,e),Yd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=jd.getComponent(r);if(a!==0){const o=Kd.getComponent(r);Jd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(t_.copy(Yd).applyMatrix4(Jd),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Zf extends zt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Qf extends nn{constructor(e=null,t=1,n=1,s,r,a,o,l,c=An,d=An,u,h){super(null,a,o,l,c,d,s,r,u,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Qd=new rt,i_=new rt;class Eu{constructor(e=[],t=[]){this.uuid=oi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new rt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new rt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:i_;Qd.multiplyMatrices(o,t[r]),Qd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Eu(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Qf(t,e,e,Yn,si);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Zf),this.bones.push(a),this.boneInverses.push(new rt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class Yl extends Rn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ar=new rt,eh=new rt,mo=[],th=new Hn,s_=new rt,Kr=new Ct,jr=new yi;class ep extends Ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Yl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,s_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Hn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ar),th.copy(e.boundingBox).applyMatrix4(ar),this.boundingBox.union(th)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ar),jr.copy(e.boundingSphere).applyMatrix4(ar),this.boundingSphere.union(jr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Kr.geometry=this.geometry,Kr.material=this.material,Kr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),jr.copy(this.boundingSphere),jr.applyMatrix4(n),e.ray.intersectsSphere(jr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ar),eh.multiplyMatrices(n,ar),Kr.matrixWorld=eh,Kr.raycast(e,mo);for(let a=0,o=mo.length;a<o;a++){const l=mo[a];l.instanceId=r,l.object=this,t.push(l)}mo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Yl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Qf(new Float32Array(s*this.count),s,this.count,_u,si));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Oc=new C,r_=new C,a_=new ut;class os{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Oc.subVectors(n,t).cross(r_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Oc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||a_.getNormalMatrix(e),s=this.coplanarPoint(Oc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ts=new yi,o_=new He(.5,.5),go=new C;class wu{constructor(e=new os,t=new os,n=new os,s=new os,r=new os,a=new os){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=_i,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],u=r[5],h=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],E=r[12],b=r[13],x=r[14],A=r[15];if(s[0].setComponents(c-a,f-d,p-g,A-E).normalize(),s[1].setComponents(c+a,f+d,p+g,A+E).normalize(),s[2].setComponents(c+o,f+u,p+v,A+b).normalize(),s[3].setComponents(c-o,f-u,p-v,A-b).normalize(),n)s[4].setComponents(l,h,m,x).normalize(),s[5].setComponents(c-l,f-h,p-m,A-x).normalize();else if(s[4].setComponents(c-l,f-h,p-m,A-x).normalize(),t===_i)s[5].setComponents(c+l,f+h,p+m,A+x).normalize();else if(t===ko)s[5].setComponents(l,h,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ts.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ts.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ts)}intersectsSprite(e){Ts.center.set(0,0,0);const t=o_.distanceTo(e.center);return Ts.radius=.7071067811865476+t,Ts.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ts)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(go.x=s.normal.x>0?e.max.x:e.min.x,go.y=s.normal.y>0?e.max.y:e.min.y,go.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(go)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class tp extends ci{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Bo=new C,zo=new C,nh=new rt,Jr=new wa,_o=new yi,Fc=new C,ih=new C;class Au extends zt{constructor(e=new dn,t=new tp){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Bo.fromBufferAttribute(t,s-1),zo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Bo.distanceTo(zo);e.setAttribute("lineDistance",new kt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_o.copy(n.boundingSphere),_o.applyMatrix4(s),_o.radius+=r,e.ray.intersectsSphere(_o)===!1)return;nh.copy(s).invert(),Jr.copy(e.ray).applyMatrix4(nh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,h=n.attributes.position;if(d!==null){const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=c){const p=d.getX(v),E=d.getX(v+1),b=vo(this,e,Jr,l,p,E,v);b&&t.push(b)}if(this.isLineLoop){const v=d.getX(g-1),m=d.getX(f),p=vo(this,e,Jr,l,v,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=c){const p=vo(this,e,Jr,l,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=vo(this,e,Jr,l,g-1,f,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function vo(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Bo.fromBufferAttribute(o,s),zo.fromBufferAttribute(o,r),t.distanceSqToSegment(Bo,zo,Fc,ih)>n)return;Fc.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Fc);if(!(c<e.near||c>e.far))return{distance:c,point:ih.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const sh=new C,rh=new C;class c_ extends Au{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)sh.fromBufferAttribute(t,s),rh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+sh.distanceTo(rh);e.setAttribute("lineDistance",new kt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class l_ extends Au{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class np extends ci{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ah=new rt,Kl=new wa,yo=new yi,xo=new C;class u_ extends zt{constructor(e=new dn,t=new np){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),yo.copy(n.boundingSphere),yo.applyMatrix4(s),yo.radius+=r,e.ray.intersectsSphere(yo)===!1)return;ah.copy(s).invert(),Kl.copy(e.ray).applyMatrix4(ah);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=h,v=f;g<v;g++){const m=c.getX(g);xo.fromBufferAttribute(u,m),oh(xo,m,l,s,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=h,v=f;g<v;g++)xo.fromBufferAttribute(u,g),oh(xo,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function oh(i,e,t,n,s,r,a){const o=Kl.distanceSqToPoint(i);if(o<t){const l=new C;Kl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class or extends nn{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ip extends nn{constructor(e,t,n=Us,s,r,a,o=An,l=An,c,d=ga,u=1){if(d!==ga&&d!==_a)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:u};super(h,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Su(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class sp extends nn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ru extends dn{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],d=t/2,u=Math.PI/2*e,h=t,f=2*u+h,g=n*2+r,v=s+1,m=new C,p=new C;for(let E=0;E<=g;E++){let b=0,x=0,A=0,R=0;if(E<=n){const T=E/n,M=T*Math.PI/2;x=-d-e*Math.cos(M),A=e*Math.sin(M),R=-e*Math.cos(M),b=T*u}else if(E<=n+r){const T=(E-n)/r;x=-d+T*t,A=e,R=0,b=u+T*h}else{const T=(E-n-r)/n,M=T*Math.PI/2;x=d+e*Math.sin(M),A=e*Math.cos(M),R=e*Math.sin(M),b=u+h+T*u}const P=Math.max(0,Math.min(1,b/f));let O=0;E===0?O=.5/s:E===g&&(O=-.5/s);for(let T=0;T<=s;T++){const M=T/s,D=M*Math.PI*2,F=Math.sin(D),H=Math.cos(D);p.x=-A*H,p.y=x,p.z=A*F,o.push(p.x,p.y,p.z),m.set(-A*H,R,A*F),m.normalize(),l.push(m.x,m.y,m.z),c.push(M+O,P)}if(E>0){const T=(E-1)*v;for(let M=0;M<s;M++){const D=T+M,F=T+M+1,H=E*v+M,K=E*v+M+1;a.push(D,F,H),a.push(F,K,H)}}}this.setIndex(a),this.setAttribute("position",new kt(o,3)),this.setAttribute("normal",new kt(l,3)),this.setAttribute("uv",new kt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ru(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Cu extends dn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],u=[],h=[],f=[];let g=0;const v=[],m=n/2;let p=0;E(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(d),this.setAttribute("position",new kt(u,3)),this.setAttribute("normal",new kt(h,3)),this.setAttribute("uv",new kt(f,2));function E(){const x=new C,A=new C;let R=0;const P=(t-e)/n;for(let O=0;O<=r;O++){const T=[],M=O/r,D=M*(t-e)+e;for(let F=0;F<=s;F++){const H=F/s,K=H*l+o,Q=Math.sin(K),te=Math.cos(K);A.x=D*Q,A.y=-M*n+m,A.z=D*te,u.push(A.x,A.y,A.z),x.set(Q,P,te).normalize(),h.push(x.x,x.y,x.z),f.push(H,1-M),T.push(g++)}v.push(T)}for(let O=0;O<s;O++)for(let T=0;T<r;T++){const M=v[T][O],D=v[T+1][O],F=v[T+1][O+1],H=v[T][O+1];(e>0||T!==0)&&(d.push(M,D,H),R+=3),(t>0||T!==r-1)&&(d.push(D,F,H),R+=3)}c.addGroup(p,R,0),p+=R}function b(x){const A=g,R=new He,P=new C;let O=0;const T=x===!0?e:t,M=x===!0?1:-1;for(let F=1;F<=s;F++)u.push(0,m*M,0),h.push(0,M,0),f.push(.5,.5),g++;const D=g;for(let F=0;F<=s;F++){const K=F/s*l+o,Q=Math.cos(K),te=Math.sin(K);P.x=T*te,P.y=m*M,P.z=T*Q,u.push(P.x,P.y,P.z),h.push(0,M,0),R.x=Q*.5+.5,R.y=te*.5*M+.5,f.push(R.x,R.y),g++}for(let F=0;F<s;F++){const H=A+F,K=D+F;x===!0?d.push(K,K+1,H):d.push(K+1,K,H),O+=3}c.addGroup(p,O,x===!0?1:2),p+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cu(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Gi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const d=n[s],h=n[s+1]-d,f=(a-d)/h;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new He:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new C,s=[],r=[],a=[],o=new C,l=new rt;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new C)}r[0]=new C,a[0]=new C;let c=Number.MAX_VALUE;const d=Math.abs(s[0].x),u=Math.abs(s[0].y),h=Math.abs(s[0].z);d<=c&&(c=d,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(mt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(mt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class rp extends Gi{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new He){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const d=Math.cos(this.aRotation),u=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*d-f*u+this.aX,c=h*u+f*d+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class d_ extends rp{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Iu(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,d,u){let h=(a-r)/c-(o-r)/(c+d)+(o-a)/d,f=(o-a)/d-(l-a)/(d+u)+(l-o)/u;h*=d,f*=d,s(a,o,h,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const Mo=new C,kc=new Iu,Bc=new Iu,zc=new Iu;class jl extends Gi{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new C){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,d;this.closed||o>0?c=s[(o-1)%r]:(Mo.subVectors(s[0],s[1]).add(s[0]),c=Mo);const u=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?d=s[(o+2)%r]:(Mo.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=Mo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(h),f),m=Math.pow(h.distanceToSquared(d),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),kc.initNonuniformCatmullRom(c.x,u.x,h.x,d.x,g,v,m),Bc.initNonuniformCatmullRom(c.y,u.y,h.y,d.y,g,v,m),zc.initNonuniformCatmullRom(c.z,u.z,h.z,d.z,g,v,m)}else this.curveType==="catmullrom"&&(kc.initCatmullRom(c.x,u.x,h.x,d.x,this.tension),Bc.initCatmullRom(c.y,u.y,h.y,d.y,this.tension),zc.initCatmullRom(c.z,u.z,h.z,d.z,this.tension));return n.set(kc.calc(l),Bc.calc(l),zc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new C().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ch(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function h_(i,e){const t=1-i;return t*t*e}function f_(i,e){return 2*(1-i)*i*e}function p_(i,e){return i*i*e}function oa(i,e,t,n){return h_(i,e)+f_(i,t)+p_(i,n)}function m_(i,e){const t=1-i;return t*t*t*e}function g_(i,e){const t=1-i;return 3*t*t*i*e}function __(i,e){return 3*(1-i)*i*i*e}function v_(i,e){return i*i*i*e}function ca(i,e,t,n,s){return m_(i,e)+g_(i,t)+__(i,n)+v_(i,s)}class y_ extends Gi{constructor(e=new He,t=new He,n=new He,s=new He){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new He){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ca(e,s.x,r.x,a.x,o.x),ca(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class x_ extends Gi{constructor(e=new C,t=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new C){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ca(e,s.x,r.x,a.x,o.x),ca(e,s.y,r.y,a.y,o.y),ca(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class M_ extends Gi{constructor(e=new He,t=new He){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new He){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new He){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class S_ extends Gi{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class b_ extends Gi{constructor(e=new He,t=new He,n=new He){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new He){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(oa(e,s.x,r.x,a.x),oa(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ap extends Gi{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(oa(e,s.x,r.x,a.x),oa(e,s.y,r.y,a.y),oa(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class T_ extends Gi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new He){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],d=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(ch(o,l.x,c.x,d.x,u.x),ch(o,l.y,c.y,d.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new He().fromArray(s))}return this}}var E_=Object.freeze({__proto__:null,ArcCurve:d_,CatmullRomCurve3:jl,CubicBezierCurve:y_,CubicBezierCurve3:x_,EllipseCurve:rp,LineCurve:M_,LineCurve3:S_,QuadraticBezierCurve:b_,QuadraticBezierCurve3:ap,SplineCurve:T_});class Aa extends dn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,u=e/o,h=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<d;p++){const E=p*h-a;for(let b=0;b<c;b++){const x=b*u-r;g.push(x,-E,0),v.push(0,0,1),m.push(b/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<o;E++){const b=E+c*p,x=E+c*(p+1),A=E+1+c*(p+1),R=E+1+c*p;f.push(b,x,R),f.push(x,A,R)}this.setIndex(f),this.setAttribute("position",new kt(g,3)),this.setAttribute("normal",new kt(v,3)),this.setAttribute("uv",new kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Aa(e.width,e.height,e.widthSegments,e.heightSegments)}}class Pu extends dn{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],d=[];let u=e;const h=(t-e)/s,f=new C,g=new He;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,d.push(g.x,g.y)}u+=h}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const E=p+m,b=E,x=E+n+1,A=E+n+2,R=E+1;o.push(b,x,R),o.push(x,A,R)}}this.setIndex(o),this.setAttribute("position",new kt(l,3)),this.setAttribute("normal",new kt(c,3)),this.setAttribute("uv",new kt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pu(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class la extends dn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],u=new C,h=new C,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const E=[],b=p/n;let x=0;p===0&&a===0?x=.5/t:p===n&&l===Math.PI&&(x=-.5/t);for(let A=0;A<=t;A++){const R=A/t;u.x=-e*Math.cos(s+R*r)*Math.sin(a+b*o),u.y=e*Math.cos(a+b*o),u.z=e*Math.sin(s+R*r)*Math.sin(a+b*o),g.push(u.x,u.y,u.z),h.copy(u).normalize(),v.push(h.x,h.y,h.z),m.push(R+x,1-b),E.push(c++)}d.push(E)}for(let p=0;p<n;p++)for(let E=0;E<t;E++){const b=d[p][E+1],x=d[p][E],A=d[p+1][E],R=d[p+1][E+1];(p!==0||a>0)&&f.push(b,x,R),(p!==n-1||l<Math.PI)&&f.push(x,A,R)}this.setIndex(f),this.setAttribute("position",new kt(g,3)),this.setAttribute("normal",new kt(v,3)),this.setAttribute("uv",new kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new la(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Lu extends dn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],d=new C,u=new C,h=new C;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const v=g/s*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),d.x=e*Math.cos(v),d.y=e*Math.sin(v),h.subVectors(u,d).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const v=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,E=(s+1)*f+g;a.push(v,m,E),a.push(m,p,E)}this.setIndex(a),this.setAttribute("position",new kt(o,3)),this.setAttribute("normal",new kt(l,3)),this.setAttribute("uv",new kt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lu(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ho extends dn{constructor(e=new ap(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new C,l=new C,c=new He;let d=new C;const u=[],h=[],f=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new kt(u,3)),this.setAttribute("normal",new kt(h,3)),this.setAttribute("uv",new kt(f,2));function v(){for(let b=0;b<t;b++)m(b);m(r===!1?t:0),E(),p()}function m(b){d=e.getPointAt(b/t,d);const x=a.normals[b],A=a.binormals[b];for(let R=0;R<=s;R++){const P=R/s*Math.PI*2,O=Math.sin(P),T=-Math.cos(P);l.x=T*x.x+O*A.x,l.y=T*x.y+O*A.y,l.z=T*x.z+O*A.z,l.normalize(),h.push(l.x,l.y,l.z),o.x=d.x+n*l.x,o.y=d.y+n*l.y,o.z=d.z+n*l.z,u.push(o.x,o.y,o.z)}}function p(){for(let b=1;b<=t;b++)for(let x=1;x<=s;x++){const A=(s+1)*(b-1)+(x-1),R=(s+1)*b+(x-1),P=(s+1)*b+x,O=(s+1)*(b-1)+x;g.push(A,R,O),g.push(R,P,O)}}function E(){for(let b=0;b<=t;b++)for(let x=0;x<=s;x++)c.x=b/t,c.y=x/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Ho(new E_[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class tn extends ci{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bf,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class xi extends tn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new He(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new nt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new nt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new nt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class w_ extends ci{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=t0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class A_ extends ci{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function So(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function R_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function C_(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function lh(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function op(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class Ra{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class I_ extends Ra{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:bd,endingEnd:bd}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Td:r=e,o=2*t-n;break;case Ed:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Td:a=e,l=2*n-t;break;case Ed:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}const c=(n-t)*.5,d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this._offsetPrev,u=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),v=g*g,m=v*g,p=-h*m+2*h*v-h*g,E=(1+h)*m+(-1.5-2*h)*v+(-.5+h)*g+1,b=(-1-f)*m+(1.5+f)*v+.5*g,x=f*m-f*v;for(let A=0;A!==o;++A)r[A]=p*a[d+A]+E*a[c+A]+b*a[l+A]+x*a[u+A];return r}}class P_ extends Ra{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=(n-t)/(s-t),u=1-d;for(let h=0;h!==o;++h)r[h]=a[c+h]*u+a[l+h]*d;return r}}class L_ extends Ra{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class di{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=So(t,this.TimeBufferType),this.values=So(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:So(e.times,Array),values:So(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new L_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new P_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new I_(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case va:t=this.InterpolantFactoryMethodDiscrete;break;case ya:t=this.InterpolantFactoryMethodLinear;break;case dc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return va;case this.InterpolantFactoryMethodLinear:return ya;case this.InterpolantFactoryMethodSmooth:return dc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&R_(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===dc,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],d=e[o+1];if(c!==d&&(o!==1||c!==e[0]))if(s)l=!0;else{const u=o*n,h=u-n,f=u+n;for(let g=0;g!==n;++g){const v=t[u+g];if(v!==t[h+g]||v!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}di.prototype.ValueTypeName="";di.prototype.TimeBufferType=Float32Array;di.prototype.ValueBufferType=Float32Array;di.prototype.DefaultInterpolation=ya;class Rr extends di{constructor(e,t,n){super(e,t,n)}}Rr.prototype.ValueTypeName="bool";Rr.prototype.ValueBufferType=Array;Rr.prototype.DefaultInterpolation=va;Rr.prototype.InterpolantFactoryMethodLinear=void 0;Rr.prototype.InterpolantFactoryMethodSmooth=void 0;class cp extends di{constructor(e,t,n,s){super(e,t,n,s)}}cp.prototype.ValueTypeName="color";class Tr extends di{constructor(e,t,n,s){super(e,t,n,s)}}Tr.prototype.ValueTypeName="number";class D_ extends Ra{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t);let c=e*o;for(let d=c+o;c!==d;c+=4)tt.slerpFlat(r,0,a,c-o,a,c,l);return r}}class Er extends di{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new D_(this.times,this.values,this.getValueSize(),e)}}Er.prototype.ValueTypeName="quaternion";Er.prototype.InterpolantFactoryMethodSmooth=void 0;class Cr extends di{constructor(e,t,n){super(e,t,n)}}Cr.prototype.ValueTypeName="string";Cr.prototype.ValueBufferType=Array;Cr.prototype.DefaultInterpolation=va;Cr.prototype.InterpolantFactoryMethodLinear=void 0;Cr.prototype.InterpolantFactoryMethodSmooth=void 0;class wr extends di{constructor(e,t,n,s){super(e,t,n,s)}}wr.prototype.ValueTypeName="vector";class N_{constructor(e="",t=-1,n=[],s=Qg){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=oi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(O_(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(di.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const d=C_(l);l=lh(l,1,d),c=lh(c,1,d),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Tr(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],d=c.name.match(r);if(d&&d.length>1){const u=d[1];let h=s[u];h||(s[u]=h=[]),h.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,h,f,g,v){if(f.length!==0){const m=[],p=[];op(f,m,p,g),m.length!==0&&v.push(new u(h,m,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const h=c[u].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const f={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let v=0;v<h[g].morphTargets.length;v++)f[h[g].morphTargets[v]]=-1;for(const v in f){const m=[],p=[];for(let E=0;E!==h[g].morphTargets.length;++E){const b=h[g];m.push(b.time),p.push(b.morphTarget===v?1:0)}s.push(new Tr(".morphTargetInfluence["+v+"]",m,p))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(wr,f+".position",h,"pos",s),n(Er,f+".quaternion",h,"rot",s),n(wr,f+".scale",h,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function U_(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Tr;case"vector":case"vector2":case"vector3":case"vector4":return wr;case"color":return cp;case"quaternion":return Er;case"bool":case"boolean":return Rr;case"string":return Cr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function O_(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=U_(i.type);if(i.times===void 0){const t=[],n=[];op(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Bi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class F_{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){const u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=c.length;u<h;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(d))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const k_=new F_;class Ir{constructor(e){this.manager=e!==void 0?e:k_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ir.DEFAULT_MATERIAL_NAME="__DEFAULT";const Li={};class B_ extends Error{constructor(e,t){super(e),this.response=t}}class lp extends Ir{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Bi.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Li[e]!==void 0){Li[e].push({onLoad:t,onProgress:n,onError:s});return}Li[e]=[],Li[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const d=Li[e],u=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,g=f!==0;let v=0;const m=new ReadableStream({start(p){E();function E(){u.read().then(({done:b,value:x})=>{if(b)p.close();else{v+=x.byteLength;const A=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:f});for(let R=0,P=d.length;R<P;R++){const O=d[R];O.onProgress&&O.onProgress(A)}p.enqueue(x),E()}},b=>{p.error(b)})}}});return new Response(m)}else throw new B_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(d=>new DOMParser().parseFromString(d,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),h=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Bi.add(`file:${e}`,c);const d=Li[e];delete Li[e];for(let u=0,h=d.length;u<h;u++){const f=d[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const d=Li[e];if(d===void 0)throw this.manager.itemError(e),c;delete Li[e];for(let u=0,h=d.length;u<h;u++){const f=d[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const cr=new WeakMap;class z_ extends Ir{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Bi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=cr.get(a);u===void 0&&(u=[],cr.set(a,u)),u.push({onLoad:t,onError:s})}return a}const o=xa("img");function l(){d(),t&&t(this);const u=cr.get(this)||[];for(let h=0;h<u.length;h++){const f=u[h];f.onLoad&&f.onLoad(this)}cr.delete(this),r.manager.itemEnd(e)}function c(u){d(),s&&s(u),Bi.remove(`image:${e}`);const h=cr.get(this)||[];for(let f=0;f<h.length;f++){const g=h[f];g.onError&&g.onError(u)}cr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Bi.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class H_ extends Ir{constructor(e){super(e)}load(e,t,n,s){const r=new nn,a=new z_(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class jo extends zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new nt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class V_ extends jo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new nt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Hc=new rt,uh=new C,dh=new C;class Du{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new He(512,512),this.mapType=vi,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wu,this._frameExtents=new He(1,1),this._viewportCount=1,this._viewports=[new wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;uh.setFromMatrixPosition(e.matrixWorld),t.position.copy(uh),dh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(dh),t.updateMatrixWorld(),Hc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Hc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class G_ extends Du{constructor(){super(new En(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Sr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class W_ extends jo{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new G_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const hh=new rt,Zr=new C,Vc=new C;class $_ extends Du{constructor(){super(new En(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new He(4,2),this._viewportCount=6,this._viewports=[new wt(2,1,1,1),new wt(0,1,1,1),new wt(3,1,1,1),new wt(1,1,1,1),new wt(3,0,1,1),new wt(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Zr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Zr),Vc.copy(n.position),Vc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Vc),n.updateMatrixWorld(),s.makeTranslation(-Zr.x,-Zr.y,-Zr.z),hh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hh,n.coordinateSystem,n.reversedDepth)}}class X_ extends jo{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new $_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Nu extends qf{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class q_ extends Du{constructor(){super(new Nu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Jl extends jo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new q_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ua{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Gc=new WeakMap;class Y_ extends Ir{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Bi.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{if(Gc.has(a)===!0)s&&s(Gc.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Bi.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Gc.set(l,c),Bi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Bi.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class K_ extends En{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Uu="\\[\\]\\.:\\/",j_=new RegExp("["+Uu+"]","g"),Ou="[^"+Uu+"]",J_="[^"+Uu.replace("\\.","")+"]",Z_=/((?:WC+[\/:])*)/.source.replace("WC",Ou),Q_=/(WCOD+)?/.source.replace("WCOD",J_),ev=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ou),tv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ou),nv=new RegExp("^"+Z_+Q_+ev+tv+"$"),iv=["material","materials","bones","map"];class sv{constructor(e,t,n){const s=n||Pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Pt{constructor(e,t,n){this.path=t,this.parsedPath=n||Pt.parseTrackName(t),this.node=Pt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Pt.Composite(e,t,n):new Pt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(j_,"")}static parseTrackName(e){const t=nv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);iv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=Pt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Pt.Composite=sv;Pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Pt.prototype.GetterByBindingType=[Pt.prototype._getValue_direct,Pt.prototype._getValue_array,Pt.prototype._getValue_arrayElement,Pt.prototype._getValue_toArray];Pt.prototype.SetterByBindingTypeAndVersioning=[[Pt.prototype._setValue_direct,Pt.prototype._setValue_direct_setNeedsUpdate,Pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_array,Pt.prototype._setValue_array_setNeedsUpdate,Pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_arrayElement,Pt.prototype._setValue_arrayElement_setNeedsUpdate,Pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_fromArray,Pt.prototype._setValue_fromArray_setNeedsUpdate,Pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const fh=new rt;class rv{constructor(e,t,n=0,s=1/0){this.ray=new wa(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new bu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return fh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(fh),this}intersectObject(e,t=!0,n=[]){return Zl(e,this,n,t),n.sort(ph),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Zl(e[s],this,n,t);return n.sort(ph),n}}function ph(i,e){return i.distance-e.distance}function Zl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Zl(r[a],e,t,!0)}}function mh(i,e,t,n){const s=av(n);switch(t){case Uf:return i*e;case _u:return i*e/s.components*s.byteLength;case vu:return i*e/s.components*s.byteLength;case Ff:return i*e*2/s.components*s.byteLength;case yu:return i*e*2/s.components*s.byteLength;case Of:return i*e*3/s.components*s.byteLength;case Yn:return i*e*4/s.components*s.byteLength;case xu:return i*e*4/s.components*s.byteLength;case Ro:case Co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Io:case Po:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case yl:case Ml:return Math.max(i,16)*Math.max(e,8)/4;case vl:case xl:return Math.max(i,8)*Math.max(e,8)/2;case Sl:case bl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Tl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case El:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case wl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Al:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Rl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Il:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Pl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ll:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Dl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Nl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ul:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ol:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Fl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case kl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Bl:case zl:case Hl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Vl:case Gl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Wl:case $l:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function av(i){switch(i){case vi:case Pf:return{byteLength:1,components:1};case pa:case Lf:case Ea:return{byteLength:2,components:1};case mu:case gu:return{byteLength:2,components:4};case Us:case pu:case si:return{byteLength:4,components:1};case Df:case Nf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fu);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function up(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function ov(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,d);else{u.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<u.length;f++){const g=u[h],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,u[h]=v)}u.length=h+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];i.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var cv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lv=`#ifdef USE_ALPHAHASH
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
#endif`,uv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pv=`#ifdef USE_AOMAP
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
#endif`,mv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gv=`#ifdef USE_BATCHING
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
#endif`,_v=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Mv=`#ifdef USE_IRIDESCENCE
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
#endif`,Sv=`#ifdef USE_BUMPMAP
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
#endif`,bv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Tv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ev=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Av=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Rv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Iv=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Pv=`#define PI 3.141592653589793
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
} // validated`,Lv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Dv=`vec3 transformedNormal = objectNormal;
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
#endif`,Nv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Uv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ov=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zv=`#ifdef USE_ENVMAP
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
#endif`,Hv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vv=`#ifdef USE_ENVMAP
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
#endif`,Gv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wv=`#ifdef USE_ENVMAP
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
#endif`,$v=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Kv=`#ifdef USE_GRADIENTMAP
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
}`,jv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qv=`uniform bool receiveShadow;
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
#endif`,ey=`#ifdef USE_ENVMAP
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
#endif`,ty=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ny=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,iy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ry=`PhysicalMaterial material;
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
#endif`,ay=`struct PhysicalMaterial {
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
}`,oy=`
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
#endif`,cy=`#if defined( RE_IndirectDiffuse )
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
#endif`,ly=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,uy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,py=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,my=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_y=`#if defined( USE_POINTS_UV )
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
#endif`,vy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,My=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,by=`#ifdef USE_MORPHTARGETS
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
#endif`,Ty=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ey=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,wy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ay=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ry=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Iy=`#ifdef USE_NORMALMAP
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
#endif`,Py=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ly=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ny=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Uy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Oy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Fy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ky=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,By=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$y=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Xy=`float getShadowMask() {
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
}`,qy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yy=`#ifdef USE_SKINNING
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
#endif`,Ky=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jy=`#ifdef USE_SKINNING
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
#endif`,Jy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ex=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,tx=`#ifdef USE_TRANSMISSION
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
#endif`,nx=`#ifdef USE_TRANSMISSION
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
#endif`,ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ax=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ox=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cx=`uniform sampler2D t2D;
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
}`,lx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ux=`#ifdef ENVMAP_TYPE_CUBE
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
}`,dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fx=`#include <common>
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
}`,px=`#if DEPTH_PACKING == 3200
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
}`,mx=`#define DISTANCE
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
}`,gx=`#define DISTANCE
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
}`,_x=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yx=`uniform float scale;
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
}`,xx=`uniform vec3 diffuse;
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
}`,Mx=`#include <common>
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
}`,Sx=`uniform vec3 diffuse;
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
}`,bx=`#define LAMBERT
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
}`,Tx=`#define LAMBERT
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
}`,Ex=`#define MATCAP
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
}`,wx=`#define MATCAP
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
}`,Ax=`#define NORMAL
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
}`,Rx=`#define NORMAL
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
}`,Cx=`#define PHONG
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
}`,Ix=`#define PHONG
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
}`,Px=`#define STANDARD
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
}`,Lx=`#define STANDARD
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
}`,Dx=`#define TOON
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
}`,Nx=`#define TOON
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
}`,Ux=`uniform float size;
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
}`,Ox=`uniform vec3 diffuse;
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
}`,Fx=`#include <common>
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
}`,kx=`uniform vec3 color;
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
}`,Bx=`uniform float rotation;
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
}`,zx=`uniform vec3 diffuse;
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
}`,ht={alphahash_fragment:cv,alphahash_pars_fragment:lv,alphamap_fragment:uv,alphamap_pars_fragment:dv,alphatest_fragment:hv,alphatest_pars_fragment:fv,aomap_fragment:pv,aomap_pars_fragment:mv,batching_pars_vertex:gv,batching_vertex:_v,begin_vertex:vv,beginnormal_vertex:yv,bsdfs:xv,iridescence_fragment:Mv,bumpmap_pars_fragment:Sv,clipping_planes_fragment:bv,clipping_planes_pars_fragment:Tv,clipping_planes_pars_vertex:Ev,clipping_planes_vertex:wv,color_fragment:Av,color_pars_fragment:Rv,color_pars_vertex:Cv,color_vertex:Iv,common:Pv,cube_uv_reflection_fragment:Lv,defaultnormal_vertex:Dv,displacementmap_pars_vertex:Nv,displacementmap_vertex:Uv,emissivemap_fragment:Ov,emissivemap_pars_fragment:Fv,colorspace_fragment:kv,colorspace_pars_fragment:Bv,envmap_fragment:zv,envmap_common_pars_fragment:Hv,envmap_pars_fragment:Vv,envmap_pars_vertex:Gv,envmap_physical_pars_fragment:ey,envmap_vertex:Wv,fog_vertex:$v,fog_pars_vertex:Xv,fog_fragment:qv,fog_pars_fragment:Yv,gradientmap_pars_fragment:Kv,lightmap_pars_fragment:jv,lights_lambert_fragment:Jv,lights_lambert_pars_fragment:Zv,lights_pars_begin:Qv,lights_toon_fragment:ty,lights_toon_pars_fragment:ny,lights_phong_fragment:iy,lights_phong_pars_fragment:sy,lights_physical_fragment:ry,lights_physical_pars_fragment:ay,lights_fragment_begin:oy,lights_fragment_maps:cy,lights_fragment_end:ly,logdepthbuf_fragment:uy,logdepthbuf_pars_fragment:dy,logdepthbuf_pars_vertex:hy,logdepthbuf_vertex:fy,map_fragment:py,map_pars_fragment:my,map_particle_fragment:gy,map_particle_pars_fragment:_y,metalnessmap_fragment:vy,metalnessmap_pars_fragment:yy,morphinstance_vertex:xy,morphcolor_vertex:My,morphnormal_vertex:Sy,morphtarget_pars_vertex:by,morphtarget_vertex:Ty,normal_fragment_begin:Ey,normal_fragment_maps:wy,normal_pars_fragment:Ay,normal_pars_vertex:Ry,normal_vertex:Cy,normalmap_pars_fragment:Iy,clearcoat_normal_fragment_begin:Py,clearcoat_normal_fragment_maps:Ly,clearcoat_pars_fragment:Dy,iridescence_pars_fragment:Ny,opaque_fragment:Uy,packing:Oy,premultiplied_alpha_fragment:Fy,project_vertex:ky,dithering_fragment:By,dithering_pars_fragment:zy,roughnessmap_fragment:Hy,roughnessmap_pars_fragment:Vy,shadowmap_pars_fragment:Gy,shadowmap_pars_vertex:Wy,shadowmap_vertex:$y,shadowmask_pars_fragment:Xy,skinbase_vertex:qy,skinning_pars_vertex:Yy,skinning_vertex:Ky,skinnormal_vertex:jy,specularmap_fragment:Jy,specularmap_pars_fragment:Zy,tonemapping_fragment:Qy,tonemapping_pars_fragment:ex,transmission_fragment:tx,transmission_pars_fragment:nx,uv_pars_fragment:ix,uv_pars_vertex:sx,uv_vertex:rx,worldpos_vertex:ax,background_vert:ox,background_frag:cx,backgroundCube_vert:lx,backgroundCube_frag:ux,cube_vert:dx,cube_frag:hx,depth_vert:fx,depth_frag:px,distanceRGBA_vert:mx,distanceRGBA_frag:gx,equirect_vert:_x,equirect_frag:vx,linedashed_vert:yx,linedashed_frag:xx,meshbasic_vert:Mx,meshbasic_frag:Sx,meshlambert_vert:bx,meshlambert_frag:Tx,meshmatcap_vert:Ex,meshmatcap_frag:wx,meshnormal_vert:Ax,meshnormal_frag:Rx,meshphong_vert:Cx,meshphong_frag:Ix,meshphysical_vert:Px,meshphysical_frag:Lx,meshtoon_vert:Dx,meshtoon_frag:Nx,points_vert:Ux,points_frag:Ox,shadow_vert:Fx,shadow_frag:kx,sprite_vert:Bx,sprite_frag:zx},Ie={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ut}},envmap:{envMap:{value:null},envMapRotation:{value:new ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ut},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0},uvTransform:{value:new ut}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}}},gi={basic:{uniforms:Tn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:Tn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new nt(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:Tn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:Tn([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:Tn([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new nt(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:Tn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:Tn([Ie.points,Ie.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:Tn([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:Tn([Ie.common,Ie.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:Tn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:Tn([Ie.sprite,Ie.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ut}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:Tn([Ie.common,Ie.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:Tn([Ie.lights,Ie.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};gi.physical={uniforms:Tn([gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ut},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ut},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ut},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ut},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ut},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ut}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const bo={r:0,b:0,g:0},Es=new Xt,Hx=new rt;function Vx(i,e,t,n,s,r,a){const o=new nt(0);let l=r===!0?0:1,c,d,u=null,h=0,f=null;function g(b){let x=b.isScene===!0?b.background:null;return x&&x.isTexture&&(x=(b.backgroundBlurriness>0?t:e).get(x)),x}function v(b){let x=!1;const A=g(b);A===null?p(o,l):A&&A.isColor&&(p(A,1),x=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,x){const A=g(x);A&&(A.isCubeTexture||A.mapping===Ko)?(d===void 0&&(d=new Ct(new $n(1,1,1),new fs({name:"BackgroundCubeMaterial",uniforms:br(gi.backgroundCube.uniforms),vertexShader:gi.backgroundCube.vertexShader,fragmentShader:gi.backgroundCube.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(R,P,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Es.copy(x.backgroundRotation),Es.x*=-1,Es.y*=-1,Es.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Es.y*=-1,Es.z*=-1),d.material.uniforms.envMap.value=A,d.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Hx.makeRotationFromEuler(Es)),d.material.toneMapped=xt.getTransfer(A.colorSpace)!==Ut,(u!==A||h!==A.version||f!==i.toneMapping)&&(d.material.needsUpdate=!0,u=A,h=A.version,f=i.toneMapping),d.layers.enableAll(),b.unshift(d,d.geometry,d.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new Ct(new Aa(2,2),new fs({name:"BackgroundMaterial",uniforms:br(gi.background.uniforms),vertexShader:gi.background.vertexShader,fragmentShader:gi.background.fragmentShader,side:Vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=xt.getTransfer(A.colorSpace)!==Ut,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||h!==A.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=A,h=A.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,x){b.getRGB(bo,Xf(i)),n.buffers.color.setClear(bo.r,bo.g,bo.b,x,a)}function E(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,x=1){o.set(b),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(o,l)},render:v,addToRenderList:m,dispose:E}}function Gx(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(M,D,F,H,K){let Q=!1;const te=u(H,F,D);r!==te&&(r=te,c(r.object)),Q=f(M,H,F,K),Q&&g(M,H,F,K),K!==null&&e.update(K,i.ELEMENT_ARRAY_BUFFER),(Q||a)&&(a=!1,x(M,D,F,H),K!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function d(M){return i.deleteVertexArray(M)}function u(M,D,F){const H=F.wireframe===!0;let K=n[M.id];K===void 0&&(K={},n[M.id]=K);let Q=K[D.id];Q===void 0&&(Q={},K[D.id]=Q);let te=Q[H];return te===void 0&&(te=h(l()),Q[H]=te),te}function h(M){const D=[],F=[],H=[];for(let K=0;K<t;K++)D[K]=0,F[K]=0,H[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:F,attributeDivisors:H,object:M,attributes:{},index:null}}function f(M,D,F,H){const K=r.attributes,Q=D.attributes;let te=0;const ie=F.getAttributes();for(const q in ie)if(ie[q].location>=0){const me=K[q];let Ve=Q[q];if(Ve===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(Ve=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(Ve=M.instanceColor)),me===void 0||me.attribute!==Ve||Ve&&me.data!==Ve.data)return!0;te++}return r.attributesNum!==te||r.index!==H}function g(M,D,F,H){const K={},Q=D.attributes;let te=0;const ie=F.getAttributes();for(const q in ie)if(ie[q].location>=0){let me=Q[q];me===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(me=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(me=M.instanceColor));const Ve={};Ve.attribute=me,me&&me.data&&(Ve.data=me.data),K[q]=Ve,te++}r.attributes=K,r.attributesNum=te,r.index=H}function v(){const M=r.newAttributes;for(let D=0,F=M.length;D<F;D++)M[D]=0}function m(M){p(M,0)}function p(M,D){const F=r.newAttributes,H=r.enabledAttributes,K=r.attributeDivisors;F[M]=1,H[M]===0&&(i.enableVertexAttribArray(M),H[M]=1),K[M]!==D&&(i.vertexAttribDivisor(M,D),K[M]=D)}function E(){const M=r.newAttributes,D=r.enabledAttributes;for(let F=0,H=D.length;F<H;F++)D[F]!==M[F]&&(i.disableVertexAttribArray(F),D[F]=0)}function b(M,D,F,H,K,Q,te){te===!0?i.vertexAttribIPointer(M,D,F,K,Q):i.vertexAttribPointer(M,D,F,H,K,Q)}function x(M,D,F,H){v();const K=H.attributes,Q=F.getAttributes(),te=D.defaultAttributeValues;for(const ie in Q){const q=Q[ie];if(q.location>=0){let pe=K[ie];if(pe===void 0&&(ie==="instanceMatrix"&&M.instanceMatrix&&(pe=M.instanceMatrix),ie==="instanceColor"&&M.instanceColor&&(pe=M.instanceColor)),pe!==void 0){const me=pe.normalized,Ve=pe.itemSize,st=e.get(pe);if(st===void 0)continue;const _t=st.buffer,St=st.type,ft=st.bytesPerElement,se=St===i.INT||St===i.UNSIGNED_INT||pe.gpuType===pu;if(pe.isInterleavedBufferAttribute){const j=pe.data,ve=j.stride,xe=pe.offset;if(j.isInstancedInterleavedBuffer){for(let Pe=0;Pe<q.locationSize;Pe++)p(q.location+Pe,j.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Pe=0;Pe<q.locationSize;Pe++)m(q.location+Pe);i.bindBuffer(i.ARRAY_BUFFER,_t);for(let Pe=0;Pe<q.locationSize;Pe++)b(q.location+Pe,Ve/q.locationSize,St,me,ve*ft,(xe+Ve/q.locationSize*Pe)*ft,se)}else{if(pe.isInstancedBufferAttribute){for(let j=0;j<q.locationSize;j++)p(q.location+j,pe.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let j=0;j<q.locationSize;j++)m(q.location+j);i.bindBuffer(i.ARRAY_BUFFER,_t);for(let j=0;j<q.locationSize;j++)b(q.location+j,Ve/q.locationSize,St,me,Ve*ft,Ve/q.locationSize*j*ft,se)}}else if(te!==void 0){const me=te[ie];if(me!==void 0)switch(me.length){case 2:i.vertexAttrib2fv(q.location,me);break;case 3:i.vertexAttrib3fv(q.location,me);break;case 4:i.vertexAttrib4fv(q.location,me);break;default:i.vertexAttrib1fv(q.location,me)}}}}E()}function A(){O();for(const M in n){const D=n[M];for(const F in D){const H=D[F];for(const K in H)d(H[K].object),delete H[K];delete D[F]}delete n[M]}}function R(M){if(n[M.id]===void 0)return;const D=n[M.id];for(const F in D){const H=D[F];for(const K in H)d(H[K].object),delete H[K];delete D[F]}delete n[M.id]}function P(M){for(const D in n){const F=n[D];if(F[M.id]===void 0)continue;const H=F[M.id];for(const K in H)d(H[K].object),delete H[K];delete F[M.id]}}function O(){T(),a=!0,r!==s&&(r=s,c(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:O,resetDefaultState:T,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:m,disableUnusedAttributes:E}}function Wx(i,e,t){let n;function s(c){n=c}function r(c,d){i.drawArrays(n,c,d),t.update(d,n,1)}function a(c,d,u){u!==0&&(i.drawArraysInstanced(n,c,d,u),t.update(d,n,u))}function o(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,u);let f=0;for(let g=0;g<u;g++)f+=d[g];t.update(f,n,1)}function l(c,d,u,h){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],d[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,d,0,h,0,u);let g=0;for(let v=0;v<u;v++)g+=d[v]*h[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function $x(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==Yn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const O=P===Ea&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==vi&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==si&&!O)}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:b,maxFragmentUniforms:x,vertexTextures:A,maxSamples:R}}function Xx(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new os,o=new ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const f=u.length!==0||h||n!==0||s;return s=h,n=u.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?d(null):c();else{const E=r?0:n,b=E*4;let x=p.clippingState||null;l.value=x,x=d(g,h,b,f);for(let A=0;A!==b;++A)x[A]=t[A];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,h,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,E=h.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,x=f;b!==v;++b,x+=4)a.copy(u[b]).applyMatrix4(E,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function qx(i){let e=new WeakMap;function t(a,o){return o===gl?a.mapping=yr:o===_l&&(a.mapping=xr),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===gl||o===_l)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new J0(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const dr=4,gh=[.125,.215,.35,.446,.526,.582],Ps=20,Wc=new Nu,_h=new nt;let $c=null,Xc=0,qc=0,Yc=!1;const Cs=(1+Math.sqrt(5))/2,lr=1/Cs,vh=[new C(-Cs,lr,0),new C(Cs,lr,0),new C(-lr,0,Cs),new C(lr,0,Cs),new C(0,Cs,-lr),new C(0,Cs,lr),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)],Yx=new C;class yh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Yx}=r;$c=this._renderer.getRenderTarget(),Xc=this._renderer.getActiveCubeFace(),qc=this._renderer.getActiveMipmapLevel(),Yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget($c,Xc,qc),this._renderer.xr.enabled=Yc,e.scissorTest=!1,To(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===yr||e.mapping===xr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$c=this._renderer.getRenderTarget(),Xc=this._renderer.getActiveCubeFace(),qc=this._renderer.getActiveMipmapLevel(),Yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:zn,minFilter:zn,generateMipmaps:!1,type:Ea,format:Yn,colorSpace:Cn,depthBuffer:!1},s=xh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Kx(r)),this._blurMaterial=jx(r,e,t)}return s}_compileMaterial(e){const t=new Ct(this._lodPlanes[0],e);this._renderer.compile(t,Wc)}_sceneToCubeUV(e,t,n,s,r){const l=new En(90,1,t,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(_h),u.toneMapping=ds,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const v=new qn({name:"PMREM.Background",side:Nn,depthWrite:!1,depthTest:!1}),m=new Ct(new $n,v);let p=!1;const E=e.background;E?E.isColor&&(v.color.copy(E),e.background=null,p=!0):(v.color.copy(_h),p=!0);for(let b=0;b<6;b++){const x=b%3;x===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[b],r.y,r.z)):x===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[b]));const A=this._cubeSize;To(s,x*A,b>2?A:0,A,A),u.setRenderTarget(s),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=E}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===yr||e.mapping===xr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ct(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;To(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Wc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=vh[(s-r-1)%vh.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new Ct(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ps-1),v=r/g,m=isFinite(r)?1+Math.floor(d*v):Ps;m>Ps&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ps}`);const p=[];let E=0;for(let P=0;P<Ps;++P){const O=P/v,T=Math.exp(-O*O/2);p.push(T),P===0?E+=T:P<m&&(E+=2*T)}for(let P=0;P<p.length;P++)p[P]=p[P]/E;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:b}=this;h.dTheta.value=g,h.mipInt.value=b-n;const x=this._sizeLods[s],A=3*x*(s>b-dr?s-b+dr:0),R=4*(this._cubeSize-x);To(t,A,R,3*x,2*x),l.setRenderTarget(t),l.render(u,Wc)}}function Kx(i){const e=[],t=[],n=[];let s=i;const r=i-dr+1+gh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-dr?l=gh[a-i+dr-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],f=6,g=6,v=3,m=2,p=1,E=new Float32Array(v*g*f),b=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let R=0;R<f;R++){const P=R%3*2/3-1,O=R>2?0:-1,T=[P,O,0,P+2/3,O,0,P+2/3,O+1,0,P,O,0,P+2/3,O+1,0,P,O+1,0];E.set(T,v*g*R),b.set(h,m*g*R);const M=[R,R,R,R,R,R];x.set(M,p*g*R)}const A=new dn;A.setAttribute("position",new Rn(E,v)),A.setAttribute("uv",new Rn(b,m)),A.setAttribute("faceIndex",new Rn(x,p)),e.push(A),s>dr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function xh(i,e,t){const n=new Os(i,e,t);return n.texture.mapping=Ko,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function To(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function jx(i,e,t){const n=new Float32Array(Ps),s=new C(0,1,0);return new fs({name:"SphericalGaussianBlur",defines:{n:Ps,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fu(),fragmentShader:`

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
		`,blending:us,depthTest:!1,depthWrite:!1})}function Mh(){return new fs({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fu(),fragmentShader:`

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
		`,blending:us,depthTest:!1,depthWrite:!1})}function Sh(){return new fs({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:us,depthTest:!1,depthWrite:!1})}function Fu(){return`

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
	`}function Jx(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===gl||l===_l,d=l===yr||l===xr;if(c||d){let u=e.get(o);const h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new yh(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||d&&f&&s(f)?(t===null&&(t=new yh(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Zx(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Ma("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Qx(i,e,t,n){const s={},r=new WeakMap;function a(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(u){const h=u.attributes;for(const f in h)e.update(h[f],i.ARRAY_BUFFER)}function c(u){const h=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const E=f.array;v=f.version;for(let b=0,x=E.length;b<x;b+=3){const A=E[b+0],R=E[b+1],P=E[b+2];h.push(A,R,R,P,P,A)}}else if(g!==void 0){const E=g.array;v=g.version;for(let b=0,x=E.length/3-1;b<x;b+=3){const A=b+0,R=b+1,P=b+2;h.push(A,R,R,P,P,A)}}else return;const m=new(Hf(h)?$f:Wf)(h,1);m.version=v;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function d(u){const h=r.get(u);if(h){const f=u.index;f!==null&&h.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function eM(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,f){i.drawElements(n,f,r,h*a),t.update(f,n,1)}function c(h,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,h*a,g),t.update(f,n,g))}function d(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(h,f,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,h,0,v,0,g);let p=0;for(let E=0;E<g;E++)p+=f[E]*v[E];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function tM(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function nM(i,e,t){const n=new WeakMap,s=new wt;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=n.get(o);if(h===void 0||h.count!==u){let M=function(){O.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var f=M;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let A=o.attributes.position.count*x,R=1;A>e.maxTextureSize&&(R=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const P=new Float32Array(A*R*4*u),O=new Vf(P,A,R,u);O.type=si,O.needsUpdate=!0;const T=x*4;for(let D=0;D<u;D++){const F=p[D],H=E[D],K=b[D],Q=A*R*4*D;for(let te=0;te<F.count;te++){const ie=te*T;g===!0&&(s.fromBufferAttribute(F,te),P[Q+ie+0]=s.x,P[Q+ie+1]=s.y,P[Q+ie+2]=s.z,P[Q+ie+3]=0),v===!0&&(s.fromBufferAttribute(H,te),P[Q+ie+4]=s.x,P[Q+ie+5]=s.y,P[Q+ie+6]=s.z,P[Q+ie+7]=0),m===!0&&(s.fromBufferAttribute(K,te),P[Q+ie+8]=s.x,P[Q+ie+9]=s.y,P[Q+ie+10]=s.z,P[Q+ie+11]=K.itemSize===4?s.w:1)}}h={count:u,texture:O,size:new He(A,R)},n.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function iM(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const dp=new nn,bh=new ip(1,1),hp=new Vf,fp=new N0,pp=new Yf,Th=[],Eh=[],wh=new Float32Array(16),Ah=new Float32Array(9),Rh=new Float32Array(4);function Pr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Th[s];if(r===void 0&&(r=new Float32Array(s),Th[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function sn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function rn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Jo(i,e){let t=Eh[e];t===void 0&&(t=new Int32Array(e),Eh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function sM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function rM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;i.uniform2fv(this.addr,e),rn(t,e)}}function aM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(sn(t,e))return;i.uniform3fv(this.addr,e),rn(t,e)}}function oM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;i.uniform4fv(this.addr,e),rn(t,e)}}function cM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,n))return;Rh.set(n),i.uniformMatrix2fv(this.addr,!1,Rh),rn(t,n)}}function lM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,n))return;Ah.set(n),i.uniformMatrix3fv(this.addr,!1,Ah),rn(t,n)}}function uM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,n))return;wh.set(n),i.uniformMatrix4fv(this.addr,!1,wh),rn(t,n)}}function dM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function hM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;i.uniform2iv(this.addr,e),rn(t,e)}}function fM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;i.uniform3iv(this.addr,e),rn(t,e)}}function pM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;i.uniform4iv(this.addr,e),rn(t,e)}}function mM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function gM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;i.uniform2uiv(this.addr,e),rn(t,e)}}function _M(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;i.uniform3uiv(this.addr,e),rn(t,e)}}function vM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;i.uniform4uiv(this.addr,e),rn(t,e)}}function yM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(bh.compareFunction=zf,r=bh):r=dp,t.setTexture2D(e||r,s)}function xM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||fp,s)}function MM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||pp,s)}function SM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||hp,s)}function bM(i){switch(i){case 5126:return sM;case 35664:return rM;case 35665:return aM;case 35666:return oM;case 35674:return cM;case 35675:return lM;case 35676:return uM;case 5124:case 35670:return dM;case 35667:case 35671:return hM;case 35668:case 35672:return fM;case 35669:case 35673:return pM;case 5125:return mM;case 36294:return gM;case 36295:return _M;case 36296:return vM;case 35678:case 36198:case 36298:case 36306:case 35682:return yM;case 35679:case 36299:case 36307:return xM;case 35680:case 36300:case 36308:case 36293:return MM;case 36289:case 36303:case 36311:case 36292:return SM}}function TM(i,e){i.uniform1fv(this.addr,e)}function EM(i,e){const t=Pr(e,this.size,2);i.uniform2fv(this.addr,t)}function wM(i,e){const t=Pr(e,this.size,3);i.uniform3fv(this.addr,t)}function AM(i,e){const t=Pr(e,this.size,4);i.uniform4fv(this.addr,t)}function RM(i,e){const t=Pr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function CM(i,e){const t=Pr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function IM(i,e){const t=Pr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function PM(i,e){i.uniform1iv(this.addr,e)}function LM(i,e){i.uniform2iv(this.addr,e)}function DM(i,e){i.uniform3iv(this.addr,e)}function NM(i,e){i.uniform4iv(this.addr,e)}function UM(i,e){i.uniform1uiv(this.addr,e)}function OM(i,e){i.uniform2uiv(this.addr,e)}function FM(i,e){i.uniform3uiv(this.addr,e)}function kM(i,e){i.uniform4uiv(this.addr,e)}function BM(i,e,t){const n=this.cache,s=e.length,r=Jo(t,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||dp,r[a])}function zM(i,e,t){const n=this.cache,s=e.length,r=Jo(t,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||fp,r[a])}function HM(i,e,t){const n=this.cache,s=e.length,r=Jo(t,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||pp,r[a])}function VM(i,e,t){const n=this.cache,s=e.length,r=Jo(t,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||hp,r[a])}function GM(i){switch(i){case 5126:return TM;case 35664:return EM;case 35665:return wM;case 35666:return AM;case 35674:return RM;case 35675:return CM;case 35676:return IM;case 5124:case 35670:return PM;case 35667:case 35671:return LM;case 35668:case 35672:return DM;case 35669:case 35673:return NM;case 5125:return UM;case 36294:return OM;case 36295:return FM;case 36296:return kM;case 35678:case 36198:case 36298:case 36306:case 35682:return BM;case 35679:case 36299:case 36307:return zM;case 35680:case 36300:case 36308:case 36293:return HM;case 36289:case 36303:case 36311:case 36292:return VM}}class WM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=bM(t.type)}}class $M{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=GM(t.type)}}class XM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Kc=/(\w+)(\])?(\[|\.)?/g;function Ch(i,e){i.seq.push(e),i.map[e.id]=e}function qM(i,e,t){const n=i.name,s=n.length;for(Kc.lastIndex=0;;){const r=Kc.exec(n),a=Kc.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Ch(t,c===void 0?new WM(o,i,e):new $M(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new XM(o),Ch(t,u)),t=u}}}class Lo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);qM(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Ih(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const YM=37297;let KM=0;function jM(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Ph=new ut;function JM(i){xt._getMatrix(Ph,xt.workingColorSpace,i);const e=`mat3( ${Ph.elements.map(t=>t.toFixed(4))} )`;switch(xt.getTransfer(i)){case Fo:return[e,"LinearTransferOETF"];case Ut:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Lh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+jM(i.getShaderSource(e),o)}else return r}function ZM(i,e){const t=JM(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function QM(i,e){let t;switch(e){case Xg:t="Linear";break;case qg:t="Reinhard";break;case Yg:t="Cineon";break;case Rf:t="ACESFilmic";break;case jg:t="AgX";break;case Jg:t="Neutral";break;case Kg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Eo=new C;function eS(){xt.getLuminanceCoefficients(Eo);const i=Eo.x.toFixed(4),e=Eo.y.toFixed(4),t=Eo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tS(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ia).join(`
`)}function nS(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function iS(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ia(i){return i!==""}function Dh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Nh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ql(i){return i.replace(sS,aS)}const rS=new Map;function aS(i,e){let t=ht[e];if(t===void 0){const n=rS.get(e);if(n!==void 0)t=ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ql(t)}const oS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Uh(i){return i.replace(oS,cS)}function cS(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Oh(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function lS(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ef?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===wf?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Di&&(e="SHADOWMAP_TYPE_VSM"),e}function uS(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case yr:case xr:e="ENVMAP_TYPE_CUBE";break;case Ko:e="ENVMAP_TYPE_CUBE_UV";break}return e}function dS(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case xr:e="ENVMAP_MODE_REFRACTION";break}return e}function hS(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Af:e="ENVMAP_BLENDING_MULTIPLY";break;case Wg:e="ENVMAP_BLENDING_MIX";break;case $g:e="ENVMAP_BLENDING_ADD";break}return e}function fS(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function pS(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=lS(t),c=uS(t),d=dS(t),u=hS(t),h=fS(t),f=tS(t),g=nS(r),v=s.createProgram();let m,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ia).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ia).join(`
`),p.length>0&&(p+=`
`)):(m=[Oh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ia).join(`
`),p=[Oh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ds?"#define TONE_MAPPING":"",t.toneMapping!==ds?ht.tonemapping_pars_fragment:"",t.toneMapping!==ds?QM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,ZM("linearToOutputTexel",t.outputColorSpace),eS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ia).join(`
`)),a=Ql(a),a=Dh(a,t),a=Nh(a,t),o=Ql(o),o=Dh(o,t),o=Nh(o,t),a=Uh(a),o=Uh(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Ad?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ad?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=E+m+a,x=E+p+o,A=Ih(s,s.VERTEX_SHADER,b),R=Ih(s,s.FRAGMENT_SHADER,x);s.attachShader(v,A),s.attachShader(v,R),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(D){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(v)||"",H=s.getShaderInfoLog(A)||"",K=s.getShaderInfoLog(R)||"",Q=F.trim(),te=H.trim(),ie=K.trim();let q=!0,pe=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,A,R);else{const me=Lh(s,A,"vertex"),Ve=Lh(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+Q+`
`+me+`
`+Ve)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(te===""||ie==="")&&(pe=!1);pe&&(D.diagnostics={runnable:q,programLog:Q,vertexShader:{log:te,prefix:m},fragmentShader:{log:ie,prefix:p}})}s.deleteShader(A),s.deleteShader(R),O=new Lo(s,v),T=iS(s,v)}let O;this.getUniforms=function(){return O===void 0&&P(this),O};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,YM)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=KM++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=R,this}let mS=0;class gS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new _S(e),t.set(e,n)),n}}class _S{constructor(e){this.id=mS++,this.code=e,this.usedTimes=0}}function vS(i,e,t,n,s,r,a){const o=new bu,l=new gS,c=new Set,d=[],u=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,M,D,F,H){const K=F.fog,Q=H.geometry,te=T.isMeshStandardMaterial?F.environment:null,ie=(T.isMeshStandardMaterial?t:e).get(T.envMap||te),q=ie&&ie.mapping===Ko?ie.image.height:null,pe=g[T.type];T.precision!==null&&(f=s.getMaxPrecision(T.precision),f!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",f,"instead."));const me=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Ve=me!==void 0?me.length:0;let st=0;Q.morphAttributes.position!==void 0&&(st=1),Q.morphAttributes.normal!==void 0&&(st=2),Q.morphAttributes.color!==void 0&&(st=3);let _t,St,ft,se;if(pe){const Me=gi[pe];_t=Me.vertexShader,St=Me.fragmentShader}else _t=T.vertexShader,St=T.fragmentShader,l.update(T),ft=l.getVertexShaderID(T),se=l.getFragmentShaderID(T);const j=i.getRenderTarget(),ve=i.state.buffers.depth.getReversed(),xe=H.isInstancedMesh===!0,Pe=H.isBatchedMesh===!0,Ze=!!T.map,Mt=!!T.matcap,N=!!ie,lt=!!T.aoMap,je=!!T.lightMap,Xe=!!T.bumpMap,Te=!!T.normalMap,Qe=!!T.displacementMap,Ne=!!T.emissiveMap,at=!!T.metalnessMap,Yt=!!T.roughnessMap,Ht=T.anisotropy>0,L=T.clearcoat>0,S=T.dispersion>0,X=T.iridescence>0,re=T.sheen>0,fe=T.transmission>0,Y=Ht&&!!T.anisotropyMap,Ue=L&&!!T.clearcoatMap,ee=L&&!!T.clearcoatNormalMap,ce=L&&!!T.clearcoatRoughnessMap,Fe=X&&!!T.iridescenceMap,ue=X&&!!T.iridescenceThicknessMap,Ce=re&&!!T.sheenColorMap,qe=re&&!!T.sheenRoughnessMap,ke=!!T.specularMap,Re=!!T.specularColorMap,it=!!T.specularIntensityMap,B=fe&&!!T.transmissionMap,oe=fe&&!!T.thicknessMap,Ee=!!T.gradientMap,Oe=!!T.alphaMap,ye=T.alphaTest>0,ne=!!T.alphaHash,Be=!!T.extensions;let be=ds;T.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(be=i.toneMapping);const ot={shaderID:pe,shaderType:T.type,shaderName:T.name,vertexShader:_t,fragmentShader:St,defines:T.defines,customVertexShaderID:ft,customFragmentShaderID:se,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:f,batching:Pe,batchingColor:Pe&&H._colorsTexture!==null,instancing:xe,instancingColor:xe&&H.instanceColor!==null,instancingMorph:xe&&H.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:j===null?i.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Cn,alphaToCoverage:!!T.alphaToCoverage,map:Ze,matcap:Mt,envMap:N,envMapMode:N&&ie.mapping,envMapCubeUVHeight:q,aoMap:lt,lightMap:je,bumpMap:Xe,normalMap:Te,displacementMap:h&&Qe,emissiveMap:Ne,normalMapObjectSpace:Te&&T.normalMapType===i0,normalMapTangentSpace:Te&&T.normalMapType===Bf,metalnessMap:at,roughnessMap:Yt,anisotropy:Ht,anisotropyMap:Y,clearcoat:L,clearcoatMap:Ue,clearcoatNormalMap:ee,clearcoatRoughnessMap:ce,dispersion:S,iridescence:X,iridescenceMap:Fe,iridescenceThicknessMap:ue,sheen:re,sheenColorMap:Ce,sheenRoughnessMap:qe,specularMap:ke,specularColorMap:Re,specularIntensityMap:it,transmission:fe,transmissionMap:B,thicknessMap:oe,gradientMap:Ee,opaque:T.transparent===!1&&T.blending===hr&&T.alphaToCoverage===!1,alphaMap:Oe,alphaTest:ye,alphaHash:ne,combine:T.combine,mapUv:Ze&&v(T.map.channel),aoMapUv:lt&&v(T.aoMap.channel),lightMapUv:je&&v(T.lightMap.channel),bumpMapUv:Xe&&v(T.bumpMap.channel),normalMapUv:Te&&v(T.normalMap.channel),displacementMapUv:Qe&&v(T.displacementMap.channel),emissiveMapUv:Ne&&v(T.emissiveMap.channel),metalnessMapUv:at&&v(T.metalnessMap.channel),roughnessMapUv:Yt&&v(T.roughnessMap.channel),anisotropyMapUv:Y&&v(T.anisotropyMap.channel),clearcoatMapUv:Ue&&v(T.clearcoatMap.channel),clearcoatNormalMapUv:ee&&v(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&v(T.clearcoatRoughnessMap.channel),iridescenceMapUv:Fe&&v(T.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&v(T.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&v(T.sheenColorMap.channel),sheenRoughnessMapUv:qe&&v(T.sheenRoughnessMap.channel),specularMapUv:ke&&v(T.specularMap.channel),specularColorMapUv:Re&&v(T.specularColorMap.channel),specularIntensityMapUv:it&&v(T.specularIntensityMap.channel),transmissionMapUv:B&&v(T.transmissionMap.channel),thicknessMapUv:oe&&v(T.thicknessMap.channel),alphaMapUv:Oe&&v(T.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(Te||Ht),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!Q.attributes.uv&&(Ze||Oe),fog:!!K,useFog:T.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ve,skinning:H.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Ve,morphTextureStride:st,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:be,decodeVideoTexture:Ze&&T.map.isVideoTexture===!0&&xt.getTransfer(T.map.colorSpace)===Ut,decodeVideoTextureEmissive:Ne&&T.emissiveMap.isVideoTexture===!0&&xt.getTransfer(T.emissiveMap.colorSpace)===Ut,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===ti,flipSided:T.side===Nn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Be&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Be&&T.extensions.multiDraw===!0||Pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return ot.vertexUv1s=c.has(1),ot.vertexUv2s=c.has(2),ot.vertexUv3s=c.has(3),c.clear(),ot}function p(T){const M=[];if(T.shaderID?M.push(T.shaderID):(M.push(T.customVertexShaderID),M.push(T.customFragmentShaderID)),T.defines!==void 0)for(const D in T.defines)M.push(D),M.push(T.defines[D]);return T.isRawShaderMaterial===!1&&(E(M,T),b(M,T),M.push(i.outputColorSpace)),M.push(T.customProgramCacheKey),M.join()}function E(T,M){T.push(M.precision),T.push(M.outputColorSpace),T.push(M.envMapMode),T.push(M.envMapCubeUVHeight),T.push(M.mapUv),T.push(M.alphaMapUv),T.push(M.lightMapUv),T.push(M.aoMapUv),T.push(M.bumpMapUv),T.push(M.normalMapUv),T.push(M.displacementMapUv),T.push(M.emissiveMapUv),T.push(M.metalnessMapUv),T.push(M.roughnessMapUv),T.push(M.anisotropyMapUv),T.push(M.clearcoatMapUv),T.push(M.clearcoatNormalMapUv),T.push(M.clearcoatRoughnessMapUv),T.push(M.iridescenceMapUv),T.push(M.iridescenceThicknessMapUv),T.push(M.sheenColorMapUv),T.push(M.sheenRoughnessMapUv),T.push(M.specularMapUv),T.push(M.specularColorMapUv),T.push(M.specularIntensityMapUv),T.push(M.transmissionMapUv),T.push(M.thicknessMapUv),T.push(M.combine),T.push(M.fogExp2),T.push(M.sizeAttenuation),T.push(M.morphTargetsCount),T.push(M.morphAttributeCount),T.push(M.numDirLights),T.push(M.numPointLights),T.push(M.numSpotLights),T.push(M.numSpotLightMaps),T.push(M.numHemiLights),T.push(M.numRectAreaLights),T.push(M.numDirLightShadows),T.push(M.numPointLightShadows),T.push(M.numSpotLightShadows),T.push(M.numSpotLightShadowsWithMaps),T.push(M.numLightProbes),T.push(M.shadowMapType),T.push(M.toneMapping),T.push(M.numClippingPlanes),T.push(M.numClipIntersection),T.push(M.depthPacking)}function b(T,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),T.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),T.push(o.mask)}function x(T){const M=g[T.type];let D;if(M){const F=gi[M];D=q0.clone(F.uniforms)}else D=T.uniforms;return D}function A(T,M){let D;for(let F=0,H=d.length;F<H;F++){const K=d[F];if(K.cacheKey===M){D=K,++D.usedTimes;break}}return D===void 0&&(D=new pS(i,M,T,r),d.push(D)),D}function R(T){if(--T.usedTimes===0){const M=d.indexOf(T);d[M]=d[d.length-1],d.pop(),T.destroy()}}function P(T){l.remove(T)}function O(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:A,releaseProgram:R,releaseShaderCache:P,programs:d,dispose:O}}function yS(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function xS(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Fh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function kh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,h,f,g,v,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:h,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),e++,p}function o(u,h,f,g,v,m){const p=a(u,h,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,h,f,g,v,m){const p=a(u,h,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,h){t.length>1&&t.sort(u||xS),n.length>1&&n.sort(h||Fh),s.length>1&&s.sort(h||Fh)}function d(){for(let u=e,h=i.length;u<h;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:d,sort:c}}function MS(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new kh,i.set(n,[a])):s>=r.length?(a=new kh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function SS(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new nt};break;case"SpotLight":t={position:new C,direction:new C,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function bS(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let TS=0;function ES(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function wS(i){const e=new SS,t=bS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const s=new C,r=new rt,a=new rt;function o(c){let d=0,u=0,h=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,E=0,b=0,x=0,A=0,R=0,P=0;c.sort(ES);for(let T=0,M=c.length;T<M;T++){const D=c[T],F=D.color,H=D.intensity,K=D.distance,Q=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=F.r*H,u+=F.g*H,h+=F.b*H;else if(D.isLightProbe){for(let te=0;te<9;te++)n.probe[te].addScaledVector(D.sh.coefficients[te],H);P++}else if(D.isDirectionalLight){const te=e.get(D);if(te.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const ie=D.shadow,q=t.get(D);q.shadowIntensity=ie.intensity,q.shadowBias=ie.bias,q.shadowNormalBias=ie.normalBias,q.shadowRadius=ie.radius,q.shadowMapSize=ie.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=Q,n.directionalShadowMatrix[f]=D.shadow.matrix,E++}n.directional[f]=te,f++}else if(D.isSpotLight){const te=e.get(D);te.position.setFromMatrixPosition(D.matrixWorld),te.color.copy(F).multiplyScalar(H),te.distance=K,te.coneCos=Math.cos(D.angle),te.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),te.decay=D.decay,n.spot[v]=te;const ie=D.shadow;if(D.map&&(n.spotLightMap[A]=D.map,A++,ie.updateMatrices(D),D.castShadow&&R++),n.spotLightMatrix[v]=ie.matrix,D.castShadow){const q=t.get(D);q.shadowIntensity=ie.intensity,q.shadowBias=ie.bias,q.shadowNormalBias=ie.normalBias,q.shadowRadius=ie.radius,q.shadowMapSize=ie.mapSize,n.spotShadow[v]=q,n.spotShadowMap[v]=Q,x++}v++}else if(D.isRectAreaLight){const te=e.get(D);te.color.copy(F).multiplyScalar(H),te.halfWidth.set(D.width*.5,0,0),te.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=te,m++}else if(D.isPointLight){const te=e.get(D);if(te.color.copy(D.color).multiplyScalar(D.intensity),te.distance=D.distance,te.decay=D.decay,D.castShadow){const ie=D.shadow,q=t.get(D);q.shadowIntensity=ie.intensity,q.shadowBias=ie.bias,q.shadowNormalBias=ie.normalBias,q.shadowRadius=ie.radius,q.shadowMapSize=ie.mapSize,q.shadowCameraNear=ie.camera.near,q.shadowCameraFar=ie.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=Q,n.pointShadowMatrix[g]=D.shadow.matrix,b++}n.point[g]=te,g++}else if(D.isHemisphereLight){const te=e.get(D);te.skyColor.copy(D.color).multiplyScalar(H),te.groundColor.copy(D.groundColor).multiplyScalar(H),n.hemi[p]=te,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;const O=n.hash;(O.directionalLength!==f||O.pointLength!==g||O.spotLength!==v||O.rectAreaLength!==m||O.hemiLength!==p||O.numDirectionalShadows!==E||O.numPointShadows!==b||O.numSpotShadows!==x||O.numSpotMaps!==A||O.numLightProbes!==P)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=x+A-R,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=P,O.directionalLength=f,O.pointLength=g,O.spotLength=v,O.rectAreaLength=m,O.hemiLength=p,O.numDirectionalShadows=E,O.numPointShadows=b,O.numSpotShadows=x,O.numSpotMaps=A,O.numLightProbes=P,n.version=TS++)}function l(c,d){let u=0,h=0,f=0,g=0,v=0;const m=d.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){const b=c[p];if(b.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(b.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(b.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(b.width*.5,0,0),x.halfHeight.set(0,b.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const x=n.point[h];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),h++}else if(b.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Bh(i){const e=new wS(i),t=[],n=[];function s(d){c.camera=d,t.length=0,n.length=0}function r(d){t.push(d)}function a(d){n.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function AS(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Bh(i),e.set(s,[o])):r>=a.length?(o=new Bh(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const RS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,CS=`uniform sampler2D shadow_pass;
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
}`;function IS(i,e,t){let n=new wu;const s=new He,r=new He,a=new wt,o=new w_({depthPacking:n0}),l=new A_,c={},d=t.maxTextureSize,u={[Vi]:Nn,[Nn]:Vi,[ti]:ti},h=new fs({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:RS,fragmentShader:CS}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new dn;g.setAttribute("position",new Rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ct(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ef;let p=this.type;this.render=function(R,P,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const T=i.getRenderTarget(),M=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),F=i.state;F.setBlending(us),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const H=p!==Di&&this.type===Di,K=p===Di&&this.type!==Di;for(let Q=0,te=R.length;Q<te;Q++){const ie=R[Q],q=ie.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const pe=q.getFrameExtents();if(s.multiply(pe),r.copy(q.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/pe.x),s.x=r.x*pe.x,q.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/pe.y),s.y=r.y*pe.y,q.mapSize.y=r.y)),q.map===null||H===!0||K===!0){const Ve=this.type!==Di?{minFilter:An,magFilter:An}:{};q.map!==null&&q.map.dispose(),q.map=new Os(s.x,s.y,Ve),q.map.texture.name=ie.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();const me=q.getViewportCount();for(let Ve=0;Ve<me;Ve++){const st=q.getViewport(Ve);a.set(r.x*st.x,r.y*st.y,r.x*st.z,r.y*st.w),F.viewport(a),q.updateMatrices(ie,Ve),n=q.getFrustum(),x(P,O,q.camera,ie,this.type)}q.isPointLightShadow!==!0&&this.type===Di&&E(q,O),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,M,D)};function E(R,P){const O=e.update(v);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Os(s.x,s.y)),h.uniforms.shadow_pass.value=R.map.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(P,null,O,h,v,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(P,null,O,f,v,null)}function b(R,P,O,T){let M=null;const D=O.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(D!==void 0)M=D;else if(M=O.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const F=M.uuid,H=P.uuid;let K=c[F];K===void 0&&(K={},c[F]=K);let Q=K[H];Q===void 0&&(Q=M.clone(),K[H]=Q,P.addEventListener("dispose",A)),M=Q}if(M.visible=P.visible,M.wireframe=P.wireframe,T===Di?M.side=P.shadowSide!==null?P.shadowSide:P.side:M.side=P.shadowSide!==null?P.shadowSide:u[P.side],M.alphaMap=P.alphaMap,M.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,M.map=P.map,M.clipShadows=P.clipShadows,M.clippingPlanes=P.clippingPlanes,M.clipIntersection=P.clipIntersection,M.displacementMap=P.displacementMap,M.displacementScale=P.displacementScale,M.displacementBias=P.displacementBias,M.wireframeLinewidth=P.wireframeLinewidth,M.linewidth=P.linewidth,O.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const F=i.properties.get(M);F.light=O}return M}function x(R,P,O,T,M){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===Di)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,R.matrixWorld);const H=e.update(R),K=R.material;if(Array.isArray(K)){const Q=H.groups;for(let te=0,ie=Q.length;te<ie;te++){const q=Q[te],pe=K[q.materialIndex];if(pe&&pe.visible){const me=b(R,pe,T,M);R.onBeforeShadow(i,R,P,O,H,me,q),i.renderBufferDirect(O,null,H,me,R,q),R.onAfterShadow(i,R,P,O,H,me,q)}}}else if(K.visible){const Q=b(R,K,T,M);R.onBeforeShadow(i,R,P,O,H,Q,null),i.renderBufferDirect(O,null,H,Q,R,null),R.onAfterShadow(i,R,P,O,H,Q,null)}}const F=R.children;for(let H=0,K=F.length;H<K;H++)x(F[H],P,O,T,M)}function A(R){R.target.removeEventListener("dispose",A);for(const O in c){const T=c[O],M=R.target.uuid;M in T&&(T[M].dispose(),delete T[M])}}}const PS={[ll]:ul,[dl]:pl,[hl]:ml,[vr]:fl,[ul]:ll,[pl]:dl,[ml]:hl,[fl]:vr};function LS(i,e){function t(){let B=!1;const oe=new wt;let Ee=null;const Oe=new wt(0,0,0,0);return{setMask:function(ye){Ee!==ye&&!B&&(i.colorMask(ye,ye,ye,ye),Ee=ye)},setLocked:function(ye){B=ye},setClear:function(ye,ne,Be,be,ot){ot===!0&&(ye*=be,ne*=be,Be*=be),oe.set(ye,ne,Be,be),Oe.equals(oe)===!1&&(i.clearColor(ye,ne,Be,be),Oe.copy(oe))},reset:function(){B=!1,Ee=null,Oe.set(-1,0,0,0)}}}function n(){let B=!1,oe=!1,Ee=null,Oe=null,ye=null;return{setReversed:function(ne){if(oe!==ne){const Be=e.get("EXT_clip_control");ne?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT),oe=ne;const be=ye;ye=null,this.setClear(be)}},getReversed:function(){return oe},setTest:function(ne){ne?j(i.DEPTH_TEST):ve(i.DEPTH_TEST)},setMask:function(ne){Ee!==ne&&!B&&(i.depthMask(ne),Ee=ne)},setFunc:function(ne){if(oe&&(ne=PS[ne]),Oe!==ne){switch(ne){case ll:i.depthFunc(i.NEVER);break;case ul:i.depthFunc(i.ALWAYS);break;case dl:i.depthFunc(i.LESS);break;case vr:i.depthFunc(i.LEQUAL);break;case hl:i.depthFunc(i.EQUAL);break;case fl:i.depthFunc(i.GEQUAL);break;case pl:i.depthFunc(i.GREATER);break;case ml:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Oe=ne}},setLocked:function(ne){B=ne},setClear:function(ne){ye!==ne&&(oe&&(ne=1-ne),i.clearDepth(ne),ye=ne)},reset:function(){B=!1,Ee=null,Oe=null,ye=null,oe=!1}}}function s(){let B=!1,oe=null,Ee=null,Oe=null,ye=null,ne=null,Be=null,be=null,ot=null;return{setTest:function(Me){B||(Me?j(i.STENCIL_TEST):ve(i.STENCIL_TEST))},setMask:function(Me){oe!==Me&&!B&&(i.stencilMask(Me),oe=Me)},setFunc:function(Me,In,gn){(Ee!==Me||Oe!==In||ye!==gn)&&(i.stencilFunc(Me,In,gn),Ee=Me,Oe=In,ye=gn)},setOp:function(Me,In,gn){(ne!==Me||Be!==In||be!==gn)&&(i.stencilOp(Me,In,gn),ne=Me,Be=In,be=gn)},setLocked:function(Me){B=Me},setClear:function(Me){ot!==Me&&(i.clearStencil(Me),ot=Me)},reset:function(){B=!1,oe=null,Ee=null,Oe=null,ye=null,ne=null,Be=null,be=null,ot=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let d={},u={},h=new WeakMap,f=[],g=null,v=!1,m=null,p=null,E=null,b=null,x=null,A=null,R=null,P=new nt(0,0,0),O=0,T=!1,M=null,D=null,F=null,H=null,K=null;const Q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let te=!1,ie=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(q)[1]),te=ie>=1):q.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),te=ie>=2);let pe=null,me={};const Ve=i.getParameter(i.SCISSOR_BOX),st=i.getParameter(i.VIEWPORT),_t=new wt().fromArray(Ve),St=new wt().fromArray(st);function ft(B,oe,Ee,Oe){const ye=new Uint8Array(4),ne=i.createTexture();i.bindTexture(B,ne),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Be=0;Be<Ee;Be++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,Oe,0,i.RGBA,i.UNSIGNED_BYTE,ye):i.texImage2D(oe+Be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ye);return ne}const se={};se[i.TEXTURE_2D]=ft(i.TEXTURE_2D,i.TEXTURE_2D,1),se[i.TEXTURE_CUBE_MAP]=ft(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[i.TEXTURE_2D_ARRAY]=ft(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),se[i.TEXTURE_3D]=ft(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),j(i.DEPTH_TEST),a.setFunc(vr),Xe(!1),Te(vd),j(i.CULL_FACE),lt(us);function j(B){d[B]!==!0&&(i.enable(B),d[B]=!0)}function ve(B){d[B]!==!1&&(i.disable(B),d[B]=!1)}function xe(B,oe){return u[B]!==oe?(i.bindFramebuffer(B,oe),u[B]=oe,B===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=oe),B===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function Pe(B,oe){let Ee=f,Oe=!1;if(B){Ee=h.get(oe),Ee===void 0&&(Ee=[],h.set(oe,Ee));const ye=B.textures;if(Ee.length!==ye.length||Ee[0]!==i.COLOR_ATTACHMENT0){for(let ne=0,Be=ye.length;ne<Be;ne++)Ee[ne]=i.COLOR_ATTACHMENT0+ne;Ee.length=ye.length,Oe=!0}}else Ee[0]!==i.BACK&&(Ee[0]=i.BACK,Oe=!0);Oe&&i.drawBuffers(Ee)}function Ze(B){return g!==B?(i.useProgram(B),g=B,!0):!1}const Mt={[Is]:i.FUNC_ADD,[Ag]:i.FUNC_SUBTRACT,[Rg]:i.FUNC_REVERSE_SUBTRACT};Mt[Cg]=i.MIN,Mt[Ig]=i.MAX;const N={[Pg]:i.ZERO,[Lg]:i.ONE,[Dg]:i.SRC_COLOR,[ol]:i.SRC_ALPHA,[Bg]:i.SRC_ALPHA_SATURATE,[Fg]:i.DST_COLOR,[Ug]:i.DST_ALPHA,[Ng]:i.ONE_MINUS_SRC_COLOR,[cl]:i.ONE_MINUS_SRC_ALPHA,[kg]:i.ONE_MINUS_DST_COLOR,[Og]:i.ONE_MINUS_DST_ALPHA,[zg]:i.CONSTANT_COLOR,[Hg]:i.ONE_MINUS_CONSTANT_COLOR,[Vg]:i.CONSTANT_ALPHA,[Gg]:i.ONE_MINUS_CONSTANT_ALPHA};function lt(B,oe,Ee,Oe,ye,ne,Be,be,ot,Me){if(B===us){v===!0&&(ve(i.BLEND),v=!1);return}if(v===!1&&(j(i.BLEND),v=!0),B!==wg){if(B!==m||Me!==T){if((p!==Is||x!==Is)&&(i.blendEquation(i.FUNC_ADD),p=Is,x=Is),Me)switch(B){case hr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yd:i.blendFunc(i.ONE,i.ONE);break;case xd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Md:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case hr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yd:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case xd:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Md:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}E=null,b=null,A=null,R=null,P.set(0,0,0),O=0,m=B,T=Me}return}ye=ye||oe,ne=ne||Ee,Be=Be||Oe,(oe!==p||ye!==x)&&(i.blendEquationSeparate(Mt[oe],Mt[ye]),p=oe,x=ye),(Ee!==E||Oe!==b||ne!==A||Be!==R)&&(i.blendFuncSeparate(N[Ee],N[Oe],N[ne],N[Be]),E=Ee,b=Oe,A=ne,R=Be),(be.equals(P)===!1||ot!==O)&&(i.blendColor(be.r,be.g,be.b,ot),P.copy(be),O=ot),m=B,T=!1}function je(B,oe){B.side===ti?ve(i.CULL_FACE):j(i.CULL_FACE);let Ee=B.side===Nn;oe&&(Ee=!Ee),Xe(Ee),B.blending===hr&&B.transparent===!1?lt(us):lt(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),r.setMask(B.colorWrite);const Oe=B.stencilWrite;o.setTest(Oe),Oe&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Ne(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):ve(i.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(B){M!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),M=B)}function Te(B){B!==Tg?(j(i.CULL_FACE),B!==D&&(B===vd?i.cullFace(i.BACK):B===Eg?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ve(i.CULL_FACE),D=B}function Qe(B){B!==F&&(te&&i.lineWidth(B),F=B)}function Ne(B,oe,Ee){B?(j(i.POLYGON_OFFSET_FILL),(H!==oe||K!==Ee)&&(i.polygonOffset(oe,Ee),H=oe,K=Ee)):ve(i.POLYGON_OFFSET_FILL)}function at(B){B?j(i.SCISSOR_TEST):ve(i.SCISSOR_TEST)}function Yt(B){B===void 0&&(B=i.TEXTURE0+Q-1),pe!==B&&(i.activeTexture(B),pe=B)}function Ht(B,oe,Ee){Ee===void 0&&(pe===null?Ee=i.TEXTURE0+Q-1:Ee=pe);let Oe=me[Ee];Oe===void 0&&(Oe={type:void 0,texture:void 0},me[Ee]=Oe),(Oe.type!==B||Oe.texture!==oe)&&(pe!==Ee&&(i.activeTexture(Ee),pe=Ee),i.bindTexture(B,oe||se[B]),Oe.type=B,Oe.texture=oe)}function L(){const B=me[pe];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function S(){try{i.compressedTexImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function X(){try{i.compressedTexImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function re(){try{i.texSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function fe(){try{i.texSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ue(){try{i.compressedTexSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ee(){try{i.texStorage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ce(){try{i.texStorage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Fe(){try{i.texImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ue(){try{i.texImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ce(B){_t.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),_t.copy(B))}function qe(B){St.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),St.copy(B))}function ke(B,oe){let Ee=c.get(oe);Ee===void 0&&(Ee=new WeakMap,c.set(oe,Ee));let Oe=Ee.get(B);Oe===void 0&&(Oe=i.getUniformBlockIndex(oe,B.name),Ee.set(B,Oe))}function Re(B,oe){const Oe=c.get(oe).get(B);l.get(oe)!==Oe&&(i.uniformBlockBinding(oe,Oe,B.__bindingPointIndex),l.set(oe,Oe))}function it(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},pe=null,me={},u={},h=new WeakMap,f=[],g=null,v=!1,m=null,p=null,E=null,b=null,x=null,A=null,R=null,P=new nt(0,0,0),O=0,T=!1,M=null,D=null,F=null,H=null,K=null,_t.set(0,0,i.canvas.width,i.canvas.height),St.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:j,disable:ve,bindFramebuffer:xe,drawBuffers:Pe,useProgram:Ze,setBlending:lt,setMaterial:je,setFlipSided:Xe,setCullFace:Te,setLineWidth:Qe,setPolygonOffset:Ne,setScissorTest:at,activeTexture:Yt,bindTexture:Ht,unbindTexture:L,compressedTexImage2D:S,compressedTexImage3D:X,texImage2D:Fe,texImage3D:ue,updateUBOMapping:ke,uniformBlockBinding:Re,texStorage2D:ee,texStorage3D:ce,texSubImage2D:re,texSubImage3D:fe,compressedTexSubImage2D:Y,compressedTexSubImage3D:Ue,scissor:Ce,viewport:qe,reset:it}}function DS(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new He,d=new WeakMap;let u;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,S){return f?new OffscreenCanvas(L,S):xa("canvas")}function v(L,S,X){let re=1;const fe=Ht(L);if((fe.width>X||fe.height>X)&&(re=X/Math.max(fe.width,fe.height)),re<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const Y=Math.floor(re*fe.width),Ue=Math.floor(re*fe.height);u===void 0&&(u=g(Y,Ue));const ee=S?g(Y,Ue):u;return ee.width=Y,ee.height=Ue,ee.getContext("2d").drawImage(L,0,0,Y,Ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+fe.width+"x"+fe.height+") to ("+Y+"x"+Ue+")."),ee}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+fe.width+"x"+fe.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){i.generateMipmap(L)}function E(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(L,S,X,re,fe=!1){if(L!==null){if(i[L]!==void 0)return i[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Y=S;if(S===i.RED&&(X===i.FLOAT&&(Y=i.R32F),X===i.HALF_FLOAT&&(Y=i.R16F),X===i.UNSIGNED_BYTE&&(Y=i.R8)),S===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(Y=i.R8UI),X===i.UNSIGNED_SHORT&&(Y=i.R16UI),X===i.UNSIGNED_INT&&(Y=i.R32UI),X===i.BYTE&&(Y=i.R8I),X===i.SHORT&&(Y=i.R16I),X===i.INT&&(Y=i.R32I)),S===i.RG&&(X===i.FLOAT&&(Y=i.RG32F),X===i.HALF_FLOAT&&(Y=i.RG16F),X===i.UNSIGNED_BYTE&&(Y=i.RG8)),S===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(Y=i.RG8UI),X===i.UNSIGNED_SHORT&&(Y=i.RG16UI),X===i.UNSIGNED_INT&&(Y=i.RG32UI),X===i.BYTE&&(Y=i.RG8I),X===i.SHORT&&(Y=i.RG16I),X===i.INT&&(Y=i.RG32I)),S===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),X===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),X===i.UNSIGNED_INT&&(Y=i.RGB32UI),X===i.BYTE&&(Y=i.RGB8I),X===i.SHORT&&(Y=i.RGB16I),X===i.INT&&(Y=i.RGB32I)),S===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),X===i.UNSIGNED_INT&&(Y=i.RGBA32UI),X===i.BYTE&&(Y=i.RGBA8I),X===i.SHORT&&(Y=i.RGBA16I),X===i.INT&&(Y=i.RGBA32I)),S===i.RGB&&(X===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),S===i.RGBA){const Ue=fe?Fo:xt.getTransfer(re);X===i.FLOAT&&(Y=i.RGBA32F),X===i.HALF_FLOAT&&(Y=i.RGBA16F),X===i.UNSIGNED_BYTE&&(Y=Ue===Ut?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function x(L,S){let X;return L?S===null||S===Us||S===ma?X=i.DEPTH24_STENCIL8:S===si?X=i.DEPTH32F_STENCIL8:S===pa&&(X=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Us||S===ma?X=i.DEPTH_COMPONENT24:S===si?X=i.DEPTH_COMPONENT32F:S===pa&&(X=i.DEPTH_COMPONENT16),X}function A(L,S){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==An&&L.minFilter!==zn?Math.log2(Math.max(S.width,S.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?S.mipmaps.length:1}function R(L){const S=L.target;S.removeEventListener("dispose",R),O(S),S.isVideoTexture&&d.delete(S)}function P(L){const S=L.target;S.removeEventListener("dispose",P),M(S)}function O(L){const S=n.get(L);if(S.__webglInit===void 0)return;const X=L.source,re=h.get(X);if(re){const fe=re[S.__cacheKey];fe.usedTimes--,fe.usedTimes===0&&T(L),Object.keys(re).length===0&&h.delete(X)}n.remove(L)}function T(L){const S=n.get(L);i.deleteTexture(S.__webglTexture);const X=L.source,re=h.get(X);delete re[S.__cacheKey],a.memory.textures--}function M(L){const S=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(S.__webglFramebuffer[re]))for(let fe=0;fe<S.__webglFramebuffer[re].length;fe++)i.deleteFramebuffer(S.__webglFramebuffer[re][fe]);else i.deleteFramebuffer(S.__webglFramebuffer[re]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[re])}else{if(Array.isArray(S.__webglFramebuffer))for(let re=0;re<S.__webglFramebuffer.length;re++)i.deleteFramebuffer(S.__webglFramebuffer[re]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let re=0;re<S.__webglColorRenderbuffer.length;re++)S.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[re]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const X=L.textures;for(let re=0,fe=X.length;re<fe;re++){const Y=n.get(X[re]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(X[re])}n.remove(L)}let D=0;function F(){D=0}function H(){const L=D;return L>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),D+=1,L}function K(L){const S=[];return S.push(L.wrapS),S.push(L.wrapT),S.push(L.wrapR||0),S.push(L.magFilter),S.push(L.minFilter),S.push(L.anisotropy),S.push(L.internalFormat),S.push(L.format),S.push(L.type),S.push(L.generateMipmaps),S.push(L.premultiplyAlpha),S.push(L.flipY),S.push(L.unpackAlignment),S.push(L.colorSpace),S.join()}function Q(L,S){const X=n.get(L);if(L.isVideoTexture&&at(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&X.__version!==L.version){const re=L.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{se(X,L,S);return}}else L.isExternalTexture&&(X.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+S)}function te(L,S){const X=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&X.__version!==L.version){se(X,L,S);return}t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+S)}function ie(L,S){const X=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&X.__version!==L.version){se(X,L,S);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+S)}function q(L,S){const X=n.get(L);if(L.version>0&&X.__version!==L.version){j(X,L,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+S)}const pe={[Mr]:i.REPEAT,[ls]:i.CLAMP_TO_EDGE,[Oo]:i.MIRRORED_REPEAT},me={[An]:i.NEAREST,[If]:i.NEAREST_MIPMAP_NEAREST,[na]:i.NEAREST_MIPMAP_LINEAR,[zn]:i.LINEAR,[Ao]:i.LINEAR_MIPMAP_NEAREST,[ki]:i.LINEAR_MIPMAP_LINEAR},Ve={[s0]:i.NEVER,[u0]:i.ALWAYS,[r0]:i.LESS,[zf]:i.LEQUAL,[a0]:i.EQUAL,[l0]:i.GEQUAL,[o0]:i.GREATER,[c0]:i.NOTEQUAL};function st(L,S){if(S.type===si&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===zn||S.magFilter===Ao||S.magFilter===na||S.magFilter===ki||S.minFilter===zn||S.minFilter===Ao||S.minFilter===na||S.minFilter===ki)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,pe[S.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,pe[S.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,pe[S.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,me[S.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,me[S.minFilter]),S.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,Ve[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===An||S.minFilter!==na&&S.minFilter!==ki||S.type===si&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function _t(L,S){let X=!1;L.__webglInit===void 0&&(L.__webglInit=!0,S.addEventListener("dispose",R));const re=S.source;let fe=h.get(re);fe===void 0&&(fe={},h.set(re,fe));const Y=K(S);if(Y!==L.__cacheKey){fe[Y]===void 0&&(fe[Y]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,X=!0),fe[Y].usedTimes++;const Ue=fe[L.__cacheKey];Ue!==void 0&&(fe[L.__cacheKey].usedTimes--,Ue.usedTimes===0&&T(S)),L.__cacheKey=Y,L.__webglTexture=fe[Y].texture}return X}function St(L,S,X){return Math.floor(Math.floor(L/X)/S)}function ft(L,S,X,re){const Y=L.updateRanges;if(Y.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,X,re,S.data);else{Y.sort((ue,Ce)=>ue.start-Ce.start);let Ue=0;for(let ue=1;ue<Y.length;ue++){const Ce=Y[Ue],qe=Y[ue],ke=Ce.start+Ce.count,Re=St(qe.start,S.width,4),it=St(Ce.start,S.width,4);qe.start<=ke+1&&Re===it&&St(qe.start+qe.count-1,S.width,4)===Re?Ce.count=Math.max(Ce.count,qe.start+qe.count-Ce.start):(++Ue,Y[Ue]=qe)}Y.length=Ue+1;const ee=i.getParameter(i.UNPACK_ROW_LENGTH),ce=i.getParameter(i.UNPACK_SKIP_PIXELS),Fe=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let ue=0,Ce=Y.length;ue<Ce;ue++){const qe=Y[ue],ke=Math.floor(qe.start/4),Re=Math.ceil(qe.count/4),it=ke%S.width,B=Math.floor(ke/S.width),oe=Re,Ee=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,it),i.pixelStorei(i.UNPACK_SKIP_ROWS,B),t.texSubImage2D(i.TEXTURE_2D,0,it,B,oe,Ee,X,re,S.data)}L.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ee),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ce),i.pixelStorei(i.UNPACK_SKIP_ROWS,Fe)}}function se(L,S,X){let re=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(re=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(re=i.TEXTURE_3D);const fe=_t(L,S),Y=S.source;t.bindTexture(re,L.__webglTexture,i.TEXTURE0+X);const Ue=n.get(Y);if(Y.version!==Ue.__version||fe===!0){t.activeTexture(i.TEXTURE0+X);const ee=xt.getPrimaries(xt.workingColorSpace),ce=S.colorSpace===cs?null:xt.getPrimaries(S.colorSpace),Fe=S.colorSpace===cs||ee===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);let ue=v(S.image,!1,s.maxTextureSize);ue=Yt(S,ue);const Ce=r.convert(S.format,S.colorSpace),qe=r.convert(S.type);let ke=b(S.internalFormat,Ce,qe,S.colorSpace,S.isVideoTexture);st(re,S);let Re;const it=S.mipmaps,B=S.isVideoTexture!==!0,oe=Ue.__version===void 0||fe===!0,Ee=Y.dataReady,Oe=A(S,ue);if(S.isDepthTexture)ke=x(S.format===_a,S.type),oe&&(B?t.texStorage2D(i.TEXTURE_2D,1,ke,ue.width,ue.height):t.texImage2D(i.TEXTURE_2D,0,ke,ue.width,ue.height,0,Ce,qe,null));else if(S.isDataTexture)if(it.length>0){B&&oe&&t.texStorage2D(i.TEXTURE_2D,Oe,ke,it[0].width,it[0].height);for(let ye=0,ne=it.length;ye<ne;ye++)Re=it[ye],B?Ee&&t.texSubImage2D(i.TEXTURE_2D,ye,0,0,Re.width,Re.height,Ce,qe,Re.data):t.texImage2D(i.TEXTURE_2D,ye,ke,Re.width,Re.height,0,Ce,qe,Re.data);S.generateMipmaps=!1}else B?(oe&&t.texStorage2D(i.TEXTURE_2D,Oe,ke,ue.width,ue.height),Ee&&ft(S,ue,Ce,qe)):t.texImage2D(i.TEXTURE_2D,0,ke,ue.width,ue.height,0,Ce,qe,ue.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){B&&oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Oe,ke,it[0].width,it[0].height,ue.depth);for(let ye=0,ne=it.length;ye<ne;ye++)if(Re=it[ye],S.format!==Yn)if(Ce!==null)if(B){if(Ee)if(S.layerUpdates.size>0){const Be=mh(Re.width,Re.height,S.format,S.type);for(const be of S.layerUpdates){const ot=Re.data.subarray(be*Be/Re.data.BYTES_PER_ELEMENT,(be+1)*Be/Re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ye,0,0,be,Re.width,Re.height,1,Ce,ot)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ye,0,0,0,Re.width,Re.height,ue.depth,Ce,Re.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ye,ke,Re.width,Re.height,ue.depth,0,Re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else B?Ee&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ye,0,0,0,Re.width,Re.height,ue.depth,Ce,qe,Re.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ye,ke,Re.width,Re.height,ue.depth,0,Ce,qe,Re.data)}else{B&&oe&&t.texStorage2D(i.TEXTURE_2D,Oe,ke,it[0].width,it[0].height);for(let ye=0,ne=it.length;ye<ne;ye++)Re=it[ye],S.format!==Yn?Ce!==null?B?Ee&&t.compressedTexSubImage2D(i.TEXTURE_2D,ye,0,0,Re.width,Re.height,Ce,Re.data):t.compressedTexImage2D(i.TEXTURE_2D,ye,ke,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):B?Ee&&t.texSubImage2D(i.TEXTURE_2D,ye,0,0,Re.width,Re.height,Ce,qe,Re.data):t.texImage2D(i.TEXTURE_2D,ye,ke,Re.width,Re.height,0,Ce,qe,Re.data)}else if(S.isDataArrayTexture)if(B){if(oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Oe,ke,ue.width,ue.height,ue.depth),Ee)if(S.layerUpdates.size>0){const ye=mh(ue.width,ue.height,S.format,S.type);for(const ne of S.layerUpdates){const Be=ue.data.subarray(ne*ye/ue.data.BYTES_PER_ELEMENT,(ne+1)*ye/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ne,ue.width,ue.height,1,Ce,qe,Be)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,Ce,qe,ue.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ke,ue.width,ue.height,ue.depth,0,Ce,qe,ue.data);else if(S.isData3DTexture)B?(oe&&t.texStorage3D(i.TEXTURE_3D,Oe,ke,ue.width,ue.height,ue.depth),Ee&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,Ce,qe,ue.data)):t.texImage3D(i.TEXTURE_3D,0,ke,ue.width,ue.height,ue.depth,0,Ce,qe,ue.data);else if(S.isFramebufferTexture){if(oe)if(B)t.texStorage2D(i.TEXTURE_2D,Oe,ke,ue.width,ue.height);else{let ye=ue.width,ne=ue.height;for(let Be=0;Be<Oe;Be++)t.texImage2D(i.TEXTURE_2D,Be,ke,ye,ne,0,Ce,qe,null),ye>>=1,ne>>=1}}else if(it.length>0){if(B&&oe){const ye=Ht(it[0]);t.texStorage2D(i.TEXTURE_2D,Oe,ke,ye.width,ye.height)}for(let ye=0,ne=it.length;ye<ne;ye++)Re=it[ye],B?Ee&&t.texSubImage2D(i.TEXTURE_2D,ye,0,0,Ce,qe,Re):t.texImage2D(i.TEXTURE_2D,ye,ke,Ce,qe,Re);S.generateMipmaps=!1}else if(B){if(oe){const ye=Ht(ue);t.texStorage2D(i.TEXTURE_2D,Oe,ke,ye.width,ye.height)}Ee&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ce,qe,ue)}else t.texImage2D(i.TEXTURE_2D,0,ke,Ce,qe,ue);m(S)&&p(re),Ue.__version=Y.version,S.onUpdate&&S.onUpdate(S)}L.__version=S.version}function j(L,S,X){if(S.image.length!==6)return;const re=_t(L,S),fe=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+X);const Y=n.get(fe);if(fe.version!==Y.__version||re===!0){t.activeTexture(i.TEXTURE0+X);const Ue=xt.getPrimaries(xt.workingColorSpace),ee=S.colorSpace===cs?null:xt.getPrimaries(S.colorSpace),ce=S.colorSpace===cs||Ue===ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const Fe=S.isCompressedTexture||S.image[0].isCompressedTexture,ue=S.image[0]&&S.image[0].isDataTexture,Ce=[];for(let ne=0;ne<6;ne++)!Fe&&!ue?Ce[ne]=v(S.image[ne],!0,s.maxCubemapSize):Ce[ne]=ue?S.image[ne].image:S.image[ne],Ce[ne]=Yt(S,Ce[ne]);const qe=Ce[0],ke=r.convert(S.format,S.colorSpace),Re=r.convert(S.type),it=b(S.internalFormat,ke,Re,S.colorSpace),B=S.isVideoTexture!==!0,oe=Y.__version===void 0||re===!0,Ee=fe.dataReady;let Oe=A(S,qe);st(i.TEXTURE_CUBE_MAP,S);let ye;if(Fe){B&&oe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Oe,it,qe.width,qe.height);for(let ne=0;ne<6;ne++){ye=Ce[ne].mipmaps;for(let Be=0;Be<ye.length;Be++){const be=ye[Be];S.format!==Yn?ke!==null?B?Ee&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Be,0,0,be.width,be.height,ke,be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Be,it,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?Ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Be,0,0,be.width,be.height,ke,Re,be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Be,it,be.width,be.height,0,ke,Re,be.data)}}}else{if(ye=S.mipmaps,B&&oe){ye.length>0&&Oe++;const ne=Ht(Ce[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Oe,it,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(ue){B?Ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ce[ne].width,Ce[ne].height,ke,Re,Ce[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,it,Ce[ne].width,Ce[ne].height,0,ke,Re,Ce[ne].data);for(let Be=0;Be<ye.length;Be++){const ot=ye[Be].image[ne].image;B?Ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Be+1,0,0,ot.width,ot.height,ke,Re,ot.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Be+1,it,ot.width,ot.height,0,ke,Re,ot.data)}}else{B?Ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ke,Re,Ce[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,it,ke,Re,Ce[ne]);for(let Be=0;Be<ye.length;Be++){const be=ye[Be];B?Ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Be+1,0,0,ke,Re,be.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Be+1,it,ke,Re,be.image[ne])}}}m(S)&&p(i.TEXTURE_CUBE_MAP),Y.__version=fe.version,S.onUpdate&&S.onUpdate(S)}L.__version=S.version}function ve(L,S,X,re,fe,Y){const Ue=r.convert(X.format,X.colorSpace),ee=r.convert(X.type),ce=b(X.internalFormat,Ue,ee,X.colorSpace),Fe=n.get(S),ue=n.get(X);if(ue.__renderTarget=S,!Fe.__hasExternalTextures){const Ce=Math.max(1,S.width>>Y),qe=Math.max(1,S.height>>Y);fe===i.TEXTURE_3D||fe===i.TEXTURE_2D_ARRAY?t.texImage3D(fe,Y,ce,Ce,qe,S.depth,0,Ue,ee,null):t.texImage2D(fe,Y,ce,Ce,qe,0,Ue,ee,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),Ne(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,fe,ue.__webglTexture,0,Qe(S)):(fe===i.TEXTURE_2D||fe>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&fe<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,re,fe,ue.__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function xe(L,S,X){if(i.bindRenderbuffer(i.RENDERBUFFER,L),S.depthBuffer){const re=S.depthTexture,fe=re&&re.isDepthTexture?re.type:null,Y=x(S.stencilBuffer,fe),Ue=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=Qe(S);Ne(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,Y,S.width,S.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,Y,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Y,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ue,i.RENDERBUFFER,L)}else{const re=S.textures;for(let fe=0;fe<re.length;fe++){const Y=re[fe],Ue=r.convert(Y.format,Y.colorSpace),ee=r.convert(Y.type),ce=b(Y.internalFormat,Ue,ee,Y.colorSpace),Fe=Qe(S);X&&Ne(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Fe,ce,S.width,S.height):Ne(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Fe,ce,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ce,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Pe(L,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const re=n.get(S.depthTexture);re.__renderTarget=S,(!re.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Q(S.depthTexture,0);const fe=re.__webglTexture,Y=Qe(S);if(S.depthTexture.format===ga)Ne(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,fe,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,fe,0);else if(S.depthTexture.format===_a)Ne(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,fe,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,fe,0);else throw new Error("Unknown depthTexture format")}function Ze(L){const S=n.get(L),X=L.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==L.depthTexture){const re=L.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),re){const fe=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,re.removeEventListener("dispose",fe)};re.addEventListener("dispose",fe),S.__depthDisposeCallback=fe}S.__boundDepthTexture=re}if(L.depthTexture&&!S.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");const re=L.texture.mipmaps;re&&re.length>0?Pe(S.__webglFramebuffer[0],L):Pe(S.__webglFramebuffer,L)}else if(X){S.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[re]),S.__webglDepthbuffer[re]===void 0)S.__webglDepthbuffer[re]=i.createRenderbuffer(),xe(S.__webglDepthbuffer[re],L,!1);else{const fe=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer[re];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,fe,i.RENDERBUFFER,Y)}}else{const re=L.texture.mipmaps;if(re&&re.length>0?t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),xe(S.__webglDepthbuffer,L,!1);else{const fe=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,fe,i.RENDERBUFFER,Y)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Mt(L,S,X){const re=n.get(L);S!==void 0&&ve(re.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&Ze(L)}function N(L){const S=L.texture,X=n.get(L),re=n.get(S);L.addEventListener("dispose",P);const fe=L.textures,Y=L.isWebGLCubeRenderTarget===!0,Ue=fe.length>1;if(Ue||(re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture()),re.__version=S.version,a.memory.textures++),Y){X.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(S.mipmaps&&S.mipmaps.length>0){X.__webglFramebuffer[ee]=[];for(let ce=0;ce<S.mipmaps.length;ce++)X.__webglFramebuffer[ee][ce]=i.createFramebuffer()}else X.__webglFramebuffer[ee]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){X.__webglFramebuffer=[];for(let ee=0;ee<S.mipmaps.length;ee++)X.__webglFramebuffer[ee]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(Ue)for(let ee=0,ce=fe.length;ee<ce;ee++){const Fe=n.get(fe[ee]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=i.createTexture(),a.memory.textures++)}if(L.samples>0&&Ne(L)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ee=0;ee<fe.length;ee++){const ce=fe[ee];X.__webglColorRenderbuffer[ee]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[ee]);const Fe=r.convert(ce.format,ce.colorSpace),ue=r.convert(ce.type),Ce=b(ce.internalFormat,Fe,ue,ce.colorSpace,L.isXRRenderTarget===!0),qe=Qe(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,qe,Ce,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.RENDERBUFFER,X.__webglColorRenderbuffer[ee])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),xe(X.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),st(i.TEXTURE_CUBE_MAP,S);for(let ee=0;ee<6;ee++)if(S.mipmaps&&S.mipmaps.length>0)for(let ce=0;ce<S.mipmaps.length;ce++)ve(X.__webglFramebuffer[ee][ce],L,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ce);else ve(X.__webglFramebuffer[ee],L,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);m(S)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ue){for(let ee=0,ce=fe.length;ee<ce;ee++){const Fe=fe[ee],ue=n.get(Fe);let Ce=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Ce=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ce,ue.__webglTexture),st(Ce,Fe),ve(X.__webglFramebuffer,L,Fe,i.COLOR_ATTACHMENT0+ee,Ce,0),m(Fe)&&p(Ce)}t.unbindTexture()}else{let ee=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ee=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ee,re.__webglTexture),st(ee,S),S.mipmaps&&S.mipmaps.length>0)for(let ce=0;ce<S.mipmaps.length;ce++)ve(X.__webglFramebuffer[ce],L,S,i.COLOR_ATTACHMENT0,ee,ce);else ve(X.__webglFramebuffer,L,S,i.COLOR_ATTACHMENT0,ee,0);m(S)&&p(ee),t.unbindTexture()}L.depthBuffer&&Ze(L)}function lt(L){const S=L.textures;for(let X=0,re=S.length;X<re;X++){const fe=S[X];if(m(fe)){const Y=E(L),Ue=n.get(fe).__webglTexture;t.bindTexture(Y,Ue),p(Y),t.unbindTexture()}}}const je=[],Xe=[];function Te(L){if(L.samples>0){if(Ne(L)===!1){const S=L.textures,X=L.width,re=L.height;let fe=i.COLOR_BUFFER_BIT;const Y=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ue=n.get(L),ee=S.length>1;if(ee)for(let Fe=0;Fe<S.length;Fe++)t.bindFramebuffer(i.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer);const ce=L.texture.mipmaps;ce&&ce.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer);for(let Fe=0;Fe<S.length;Fe++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(fe|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(fe|=i.STENCIL_BUFFER_BIT)),ee){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ue.__webglColorRenderbuffer[Fe]);const ue=n.get(S[Fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ue,0)}i.blitFramebuffer(0,0,X,re,0,0,X,re,fe,i.NEAREST),l===!0&&(je.length=0,Xe.length=0,je.push(i.COLOR_ATTACHMENT0+Fe),L.depthBuffer&&L.resolveDepthBuffer===!1&&(je.push(Y),Xe.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Xe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,je))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ee)for(let Fe=0;Fe<S.length;Fe++){t.bindFramebuffer(i.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.RENDERBUFFER,Ue.__webglColorRenderbuffer[Fe]);const ue=n.get(S[Fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.TEXTURE_2D,ue,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const S=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function Qe(L){return Math.min(s.maxSamples,L.samples)}function Ne(L){const S=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function at(L){const S=a.render.frame;d.get(L)!==S&&(d.set(L,S),L.update())}function Yt(L,S){const X=L.colorSpace,re=L.format,fe=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||X!==Cn&&X!==cs&&(xt.getTransfer(X)===Ut?(re!==Yn||fe!==vi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),S}function Ht(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=F,this.setTexture2D=Q,this.setTexture2DArray=te,this.setTexture3D=ie,this.setTextureCube=q,this.rebindTextures=Mt,this.setupRenderTarget=N,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=Ze,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=Ne}function NS(i,e){function t(n,s=cs){let r;const a=xt.getTransfer(s);if(n===vi)return i.UNSIGNED_BYTE;if(n===mu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===gu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Df)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Nf)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Pf)return i.BYTE;if(n===Lf)return i.SHORT;if(n===pa)return i.UNSIGNED_SHORT;if(n===pu)return i.INT;if(n===Us)return i.UNSIGNED_INT;if(n===si)return i.FLOAT;if(n===Ea)return i.HALF_FLOAT;if(n===Uf)return i.ALPHA;if(n===Of)return i.RGB;if(n===Yn)return i.RGBA;if(n===ga)return i.DEPTH_COMPONENT;if(n===_a)return i.DEPTH_STENCIL;if(n===_u)return i.RED;if(n===vu)return i.RED_INTEGER;if(n===Ff)return i.RG;if(n===yu)return i.RG_INTEGER;if(n===xu)return i.RGBA_INTEGER;if(n===Ro||n===Co||n===Io||n===Po)if(a===Ut)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ro)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ro)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Co)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Io)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Po)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===vl||n===yl||n===xl||n===Ml)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===vl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===yl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ml)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Sl||n===bl||n===Tl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Sl||n===bl)return a===Ut?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Tl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===El||n===wl||n===Al||n===Rl||n===Cl||n===Il||n===Pl||n===Ll||n===Dl||n===Nl||n===Ul||n===Ol||n===Fl||n===kl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===El)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===wl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Al)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Rl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Cl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Il)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Pl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ll)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Dl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Nl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ul)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ol)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===kl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Bl||n===zl||n===Hl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Bl)return a===Ut?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===zl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Hl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vl||n===Gl||n===Wl||n===$l)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Vl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Gl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Wl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$l)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ma?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const US=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,OS=`
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

}`;class FS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new sp(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new fs({vertexShader:US,fragmentShader:OS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ct(new Aa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class kS extends Ar{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",m=new FS,p={},E=t.getContextAttributes();let b=null,x=null;const A=[],R=[],P=new He;let O=null;const T=new En;T.viewport=new wt;const M=new En;M.viewport=new wt;const D=[T,M],F=new K_;let H=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(se){let j=A[se];return j===void 0&&(j=new Lc,A[se]=j),j.getTargetRaySpace()},this.getControllerGrip=function(se){let j=A[se];return j===void 0&&(j=new Lc,A[se]=j),j.getGripSpace()},this.getHand=function(se){let j=A[se];return j===void 0&&(j=new Lc,A[se]=j),j.getHandSpace()};function Q(se){const j=R.indexOf(se.inputSource);if(j===-1)return;const ve=A[j];ve!==void 0&&(ve.update(se.inputSource,se.frame,c||a),ve.dispatchEvent({type:se.type,data:se.inputSource}))}function te(){s.removeEventListener("select",Q),s.removeEventListener("selectstart",Q),s.removeEventListener("selectend",Q),s.removeEventListener("squeeze",Q),s.removeEventListener("squeezestart",Q),s.removeEventListener("squeezeend",Q),s.removeEventListener("end",te),s.removeEventListener("inputsourceschange",ie);for(let se=0;se<A.length;se++){const j=R[se];j!==null&&(R[se]=null,A[se].disconnect(j))}H=null,K=null,m.reset();for(const se in p)delete p[se];e.setRenderTarget(b),f=null,h=null,u=null,s=null,x=null,ft.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(se){r=se,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(se){o=se,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(se){c=se},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(se){if(s=se,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",Q),s.addEventListener("selectstart",Q),s.addEventListener("selectend",Q),s.addEventListener("squeeze",Q),s.addEventListener("squeezestart",Q),s.addEventListener("squeezeend",Q),s.addEventListener("end",te),s.addEventListener("inputsourceschange",ie),E.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ve=null,xe=null,Pe=null;E.depth&&(Pe=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ve=E.stencil?_a:ga,xe=E.stencil?ma:Us);const Ze={colorFormat:t.RGBA8,depthFormat:Pe,scaleFactor:r};u=this.getBinding(),h=u.createProjectionLayer(Ze),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new Os(h.textureWidth,h.textureHeight,{format:Yn,type:vi,depthTexture:new ip(h.textureWidth,h.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,ve),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ve={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ve),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Os(f.framebufferWidth,f.framebufferHeight,{format:Yn,type:vi,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ft.setContext(s),ft.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(se){for(let j=0;j<se.removed.length;j++){const ve=se.removed[j],xe=R.indexOf(ve);xe>=0&&(R[xe]=null,A[xe].disconnect(ve))}for(let j=0;j<se.added.length;j++){const ve=se.added[j];let xe=R.indexOf(ve);if(xe===-1){for(let Ze=0;Ze<A.length;Ze++)if(Ze>=R.length){R.push(ve),xe=Ze;break}else if(R[Ze]===null){R[Ze]=ve,xe=Ze;break}if(xe===-1)break}const Pe=A[xe];Pe&&Pe.connect(ve)}}const q=new C,pe=new C;function me(se,j,ve){q.setFromMatrixPosition(j.matrixWorld),pe.setFromMatrixPosition(ve.matrixWorld);const xe=q.distanceTo(pe),Pe=j.projectionMatrix.elements,Ze=ve.projectionMatrix.elements,Mt=Pe[14]/(Pe[10]-1),N=Pe[14]/(Pe[10]+1),lt=(Pe[9]+1)/Pe[5],je=(Pe[9]-1)/Pe[5],Xe=(Pe[8]-1)/Pe[0],Te=(Ze[8]+1)/Ze[0],Qe=Mt*Xe,Ne=Mt*Te,at=xe/(-Xe+Te),Yt=at*-Xe;if(j.matrixWorld.decompose(se.position,se.quaternion,se.scale),se.translateX(Yt),se.translateZ(at),se.matrixWorld.compose(se.position,se.quaternion,se.scale),se.matrixWorldInverse.copy(se.matrixWorld).invert(),Pe[10]===-1)se.projectionMatrix.copy(j.projectionMatrix),se.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const Ht=Mt+at,L=N+at,S=Qe-Yt,X=Ne+(xe-Yt),re=lt*N/L*Ht,fe=je*N/L*Ht;se.projectionMatrix.makePerspective(S,X,re,fe,Ht,L),se.projectionMatrixInverse.copy(se.projectionMatrix).invert()}}function Ve(se,j){j===null?se.matrixWorld.copy(se.matrix):se.matrixWorld.multiplyMatrices(j.matrixWorld,se.matrix),se.matrixWorldInverse.copy(se.matrixWorld).invert()}this.updateCamera=function(se){if(s===null)return;let j=se.near,ve=se.far;m.texture!==null&&(m.depthNear>0&&(j=m.depthNear),m.depthFar>0&&(ve=m.depthFar)),F.near=M.near=T.near=j,F.far=M.far=T.far=ve,(H!==F.near||K!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),H=F.near,K=F.far),F.layers.mask=se.layers.mask|6,T.layers.mask=F.layers.mask&3,M.layers.mask=F.layers.mask&5;const xe=se.parent,Pe=F.cameras;Ve(F,xe);for(let Ze=0;Ze<Pe.length;Ze++)Ve(Pe[Ze],xe);Pe.length===2?me(F,T,M):F.projectionMatrix.copy(T.projectionMatrix),st(se,F,xe)};function st(se,j,ve){ve===null?se.matrix.copy(j.matrixWorld):(se.matrix.copy(ve.matrixWorld),se.matrix.invert(),se.matrix.multiply(j.matrixWorld)),se.matrix.decompose(se.position,se.quaternion,se.scale),se.updateMatrixWorld(!0),se.projectionMatrix.copy(j.projectionMatrix),se.projectionMatrixInverse.copy(j.projectionMatrixInverse),se.isPerspectiveCamera&&(se.fov=Sr*2*Math.atan(1/se.projectionMatrix.elements[5]),se.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(se){l=se,h!==null&&(h.fixedFoveation=se),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=se)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(se){return p[se]};let _t=null;function St(se,j){if(d=j.getViewerPose(c||a),g=j,d!==null){const ve=d.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let xe=!1;ve.length!==F.cameras.length&&(F.cameras.length=0,xe=!0);for(let N=0;N<ve.length;N++){const lt=ve[N];let je=null;if(f!==null)je=f.getViewport(lt);else{const Te=u.getViewSubImage(h,lt);je=Te.viewport,N===0&&(e.setRenderTargetTextures(x,Te.colorTexture,Te.depthStencilTexture),e.setRenderTarget(x))}let Xe=D[N];Xe===void 0&&(Xe=new En,Xe.layers.enable(N),Xe.viewport=new wt,D[N]=Xe),Xe.matrix.fromArray(lt.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(lt.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(je.x,je.y,je.width,je.height),N===0&&(F.matrix.copy(Xe.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),xe===!0&&F.cameras.push(Xe)}const Pe=s.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const N=u.getDepthInformation(ve[0]);N&&N.isValid&&N.texture&&m.init(N,s.renderState)}if(Pe&&Pe.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let N=0;N<ve.length;N++){const lt=ve[N].camera;if(lt){let je=p[lt];je||(je=new sp,p[lt]=je);const Xe=u.getCameraImage(lt);je.sourceTexture=Xe}}}}for(let ve=0;ve<A.length;ve++){const xe=R[ve],Pe=A[ve];xe!==null&&Pe!==void 0&&Pe.update(xe,j,c||a)}_t&&_t(se,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}const ft=new up;ft.setAnimationLoop(St),this.setAnimationLoop=function(se){_t=se},this.dispose=function(){}}}const ws=new Xt,BS=new rt;function zS(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Xf(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,b,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,E,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Nn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Nn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=e.get(p),b=E.envMap,x=E.envMapRotation;b&&(m.envMap.value=b,ws.copy(x),ws.x*=-1,ws.y*=-1,ws.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ws.y*=-1,ws.z*=-1),m.envMapRotation.value.setFromMatrix4(BS.makeRotationFromEuler(ws)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,E,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Nn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const E=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function HS(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,b){const x=b.program;n.uniformBlockBinding(E,x)}function c(E,b){let x=s[E.id];x===void 0&&(g(E),x=d(E),s[E.id]=x,E.addEventListener("dispose",m));const A=b.program;n.updateUBOMapping(E,A);const R=e.render.frame;r[E.id]!==R&&(h(E),r[E.id]=R)}function d(E){const b=u();E.__bindingPointIndex=b;const x=i.createBuffer(),A=E.__size,R=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,A,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,x),x}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(E){const b=s[E.id],x=E.uniforms,A=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let R=0,P=x.length;R<P;R++){const O=Array.isArray(x[R])?x[R]:[x[R]];for(let T=0,M=O.length;T<M;T++){const D=O[T];if(f(D,R,T,A)===!0){const F=D.__offset,H=Array.isArray(D.value)?D.value:[D.value];let K=0;for(let Q=0;Q<H.length;Q++){const te=H[Q],ie=v(te);typeof te=="number"||typeof te=="boolean"?(D.__data[0]=te,i.bufferSubData(i.UNIFORM_BUFFER,F+K,D.__data)):te.isMatrix3?(D.__data[0]=te.elements[0],D.__data[1]=te.elements[1],D.__data[2]=te.elements[2],D.__data[3]=0,D.__data[4]=te.elements[3],D.__data[5]=te.elements[4],D.__data[6]=te.elements[5],D.__data[7]=0,D.__data[8]=te.elements[6],D.__data[9]=te.elements[7],D.__data[10]=te.elements[8],D.__data[11]=0):(te.toArray(D.__data,K),K+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(E,b,x,A){const R=E.value,P=b+"_"+x;if(A[P]===void 0)return typeof R=="number"||typeof R=="boolean"?A[P]=R:A[P]=R.clone(),!0;{const O=A[P];if(typeof R=="number"||typeof R=="boolean"){if(O!==R)return A[P]=R,!0}else if(O.equals(R)===!1)return O.copy(R),!0}return!1}function g(E){const b=E.uniforms;let x=0;const A=16;for(let P=0,O=b.length;P<O;P++){const T=Array.isArray(b[P])?b[P]:[b[P]];for(let M=0,D=T.length;M<D;M++){const F=T[M],H=Array.isArray(F.value)?F.value:[F.value];for(let K=0,Q=H.length;K<Q;K++){const te=H[K],ie=v(te),q=x%A,pe=q%ie.boundary,me=q+pe;x+=pe,me!==0&&A-me<ie.storage&&(x+=A-me),F.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=x,x+=ie.storage}}}const R=x%A;return R>0&&(x+=A-R),E.__size=x,E.__cache={},this}function v(E){const b={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(b.boundary=4,b.storage=4):E.isVector2?(b.boundary=8,b.storage=8):E.isVector3||E.isColor?(b.boundary=16,b.storage=12):E.isVector4?(b.boundary=16,b.storage=16):E.isMatrix3?(b.boundary=48,b.storage=48):E.isMatrix4?(b.boundary=64,b.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),b}function m(E){const b=E.target;b.removeEventListener("dispose",m);const x=a.indexOf(b.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class VS{constructor(e={}){const{canvas:t=A0(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const E=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ds,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let A=!1;this._outputColorSpace=Wt;let R=0,P=0,O=null,T=-1,M=null;const D=new wt,F=new wt;let H=null;const K=new nt(0);let Q=0,te=t.width,ie=t.height,q=1,pe=null,me=null;const Ve=new wt(0,0,te,ie),st=new wt(0,0,te,ie);let _t=!1;const St=new wu;let ft=!1,se=!1;const j=new rt,ve=new C,xe=new wt,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ze=!1;function Mt(){return O===null?q:1}let N=n;function lt(w,V){return t.getContext(w,V)}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${fu}`),t.addEventListener("webglcontextlost",Ee,!1),t.addEventListener("webglcontextrestored",Oe,!1),t.addEventListener("webglcontextcreationerror",ye,!1),N===null){const V="webgl2";if(N=lt(V,w),N===null)throw lt(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let je,Xe,Te,Qe,Ne,at,Yt,Ht,L,S,X,re,fe,Y,Ue,ee,ce,Fe,ue,Ce,qe,ke,Re,it;function B(){je=new Zx(N),je.init(),ke=new NS(N,je),Xe=new $x(N,je,e,ke),Te=new LS(N,je),Xe.reversedDepthBuffer&&h&&Te.buffers.depth.setReversed(!0),Qe=new tM(N),Ne=new yS,at=new DS(N,je,Te,Ne,Xe,ke,Qe),Yt=new qx(x),Ht=new Jx(x),L=new ov(N),Re=new Gx(N,L),S=new Qx(N,L,Qe,Re),X=new iM(N,S,L,Qe),ue=new nM(N,Xe,at),ee=new Xx(Ne),re=new vS(x,Yt,Ht,je,Xe,Re,ee),fe=new zS(x,Ne),Y=new MS,Ue=new AS(je),Fe=new Vx(x,Yt,Ht,Te,X,f,l),ce=new IS(x,X,Xe),it=new HS(N,Qe,Xe,Te),Ce=new Wx(N,je,Qe),qe=new eM(N,je,Qe),Qe.programs=re.programs,x.capabilities=Xe,x.extensions=je,x.properties=Ne,x.renderLists=Y,x.shadowMap=ce,x.state=Te,x.info=Qe}B();const oe=new kS(x,N);this.xr=oe,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const w=je.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=je.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(w){w!==void 0&&(q=w,this.setSize(te,ie,!1))},this.getSize=function(w){return w.set(te,ie)},this.setSize=function(w,V,J=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}te=w,ie=V,t.width=Math.floor(w*q),t.height=Math.floor(V*q),J===!0&&(t.style.width=w+"px",t.style.height=V+"px"),this.setViewport(0,0,w,V)},this.getDrawingBufferSize=function(w){return w.set(te*q,ie*q).floor()},this.setDrawingBufferSize=function(w,V,J){te=w,ie=V,q=J,t.width=Math.floor(w*J),t.height=Math.floor(V*J),this.setViewport(0,0,w,V)},this.getCurrentViewport=function(w){return w.copy(D)},this.getViewport=function(w){return w.copy(Ve)},this.setViewport=function(w,V,J,Z){w.isVector4?Ve.set(w.x,w.y,w.z,w.w):Ve.set(w,V,J,Z),Te.viewport(D.copy(Ve).multiplyScalar(q).round())},this.getScissor=function(w){return w.copy(st)},this.setScissor=function(w,V,J,Z){w.isVector4?st.set(w.x,w.y,w.z,w.w):st.set(w,V,J,Z),Te.scissor(F.copy(st).multiplyScalar(q).round())},this.getScissorTest=function(){return _t},this.setScissorTest=function(w){Te.setScissorTest(_t=w)},this.setOpaqueSort=function(w){pe=w},this.setTransparentSort=function(w){me=w},this.getClearColor=function(w){return w.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(w=!0,V=!0,J=!0){let Z=0;if(w){let k=!1;if(O!==null){const de=O.texture.format;k=de===xu||de===yu||de===vu}if(k){const de=O.texture.type,we=de===vi||de===Us||de===pa||de===ma||de===mu||de===gu,Se=Fe.getClearColor(),De=Fe.getClearAlpha(),Ke=Se.r,et=Se.g,We=Se.b;we?(g[0]=Ke,g[1]=et,g[2]=We,g[3]=De,N.clearBufferuiv(N.COLOR,0,g)):(v[0]=Ke,v[1]=et,v[2]=We,v[3]=De,N.clearBufferiv(N.COLOR,0,v))}else Z|=N.COLOR_BUFFER_BIT}V&&(Z|=N.DEPTH_BUFFER_BIT),J&&(Z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ee,!1),t.removeEventListener("webglcontextrestored",Oe,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),Fe.dispose(),Y.dispose(),Ue.dispose(),Ne.dispose(),Yt.dispose(),Ht.dispose(),X.dispose(),Re.dispose(),it.dispose(),re.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",gn),oe.removeEventListener("sessionend",Mi),Si.stop()};function Ee(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Oe(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const w=Qe.autoReset,V=ce.enabled,J=ce.autoUpdate,Z=ce.needsUpdate,k=ce.type;B(),Qe.autoReset=w,ce.enabled=V,ce.autoUpdate=J,ce.needsUpdate=Z,ce.type=k}function ye(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ne(w){const V=w.target;V.removeEventListener("dispose",ne),Be(V)}function Be(w){be(w),Ne.remove(w)}function be(w){const V=Ne.get(w).programs;V!==void 0&&(V.forEach(function(J){re.releaseProgram(J)}),w.isShaderMaterial&&re.releaseShaderCache(w))}this.renderBufferDirect=function(w,V,J,Z,k,de){V===null&&(V=Pe);const we=k.isMesh&&k.matrixWorld.determinant()<0,Se=gt(w,V,J,Z,k);Te.setMaterial(Z,we);let De=J.index,Ke=1;if(Z.wireframe===!0){if(De=S.getWireframeAttribute(J),De===void 0)return;Ke=2}const et=J.drawRange,We=J.attributes.position;let pt=et.start*Ke,Ye=(et.start+et.count)*Ke;de!==null&&(pt=Math.max(pt,de.start*Ke),Ye=Math.min(Ye,(de.start+de.count)*Ke)),De!==null?(pt=Math.max(pt,0),Ye=Math.min(Ye,De.count)):We!=null&&(pt=Math.max(pt,0),Ye=Math.min(Ye,We.count));const Ot=Ye-pt;if(Ot<0||Ot===1/0)return;Re.setup(k,Z,Se,J,De);let bt,Tt=Ce;if(De!==null&&(bt=L.get(De),Tt=qe,Tt.setIndex(bt)),k.isMesh)Z.wireframe===!0?(Te.setLineWidth(Z.wireframeLinewidth*Mt()),Tt.setMode(N.LINES)):Tt.setMode(N.TRIANGLES);else if(k.isLine){let Je=Z.linewidth;Je===void 0&&(Je=1),Te.setLineWidth(Je*Mt()),k.isLineSegments?Tt.setMode(N.LINES):k.isLineLoop?Tt.setMode(N.LINE_LOOP):Tt.setMode(N.LINE_STRIP)}else k.isPoints?Tt.setMode(N.POINTS):k.isSprite&&Tt.setMode(N.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Ma("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Tt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(je.get("WEBGL_multi_draw"))Tt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Je=k._multiDrawStarts,Dt=k._multiDrawCounts,yt=k._multiDrawCount,vn=De?L.get(De).bytesPerElement:1,Ti=Ne.get(Z).currentProgram.getUniforms();for(let hn=0;hn<yt;hn++)Ti.setValue(N,"_gl_DrawID",hn),Tt.render(Je[hn]/vn,Dt[hn])}else if(k.isInstancedMesh)Tt.renderInstances(pt,Ot,k.count);else if(J.isInstancedBufferGeometry){const Je=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Dt=Math.min(J.instanceCount,Je);Tt.renderInstances(pt,Ot,Dt)}else Tt.render(pt,Ot)};function ot(w,V,J){w.transparent===!0&&w.side===ti&&w.forceSinglePass===!1?(w.side=Nn,w.needsUpdate=!0,_n(w,V,J),w.side=Vi,w.needsUpdate=!0,_n(w,V,J),w.side=ti):_n(w,V,J)}this.compile=function(w,V,J=null){J===null&&(J=w),p=Ue.get(J),p.init(V),b.push(p),J.traverseVisible(function(k){k.isLight&&k.layers.test(V.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),w!==J&&w.traverseVisible(function(k){k.isLight&&k.layers.test(V.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const Z=new Set;return w.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const de=k.material;if(de)if(Array.isArray(de))for(let we=0;we<de.length;we++){const Se=de[we];ot(Se,J,k),Z.add(Se)}else ot(de,J,k),Z.add(de)}),p=b.pop(),Z},this.compileAsync=function(w,V,J=null){const Z=this.compile(w,V,J);return new Promise(k=>{function de(){if(Z.forEach(function(we){Ne.get(we).currentProgram.isReady()&&Z.delete(we)}),Z.size===0){k(w);return}setTimeout(de,10)}je.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Me=null;function In(w){Me&&Me(w)}function gn(){Si.stop()}function Mi(){Si.start()}const Si=new up;Si.setAnimationLoop(In),typeof self<"u"&&Si.setContext(self),this.setAnimationLoop=function(w){Me=w,oe.setAnimationLoop(w),w===null?Si.stop():Si.start()},oe.addEventListener("sessionstart",gn),oe.addEventListener("sessionend",Mi),this.render=function(w,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(V),V=oe.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,V,O),p=Ue.get(w,b.length),p.init(V),b.push(p),j.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),St.setFromProjectionMatrix(j,_i,V.reversedDepth),se=this.localClippingEnabled,ft=ee.init(this.clippingPlanes,se),m=Y.get(w,E.length),m.init(),E.push(m),oe.enabled===!0&&oe.isPresenting===!0){const de=x.xr.getDepthSensingMesh();de!==null&&Fs(de,V,-1/0,x.sortObjects)}Fs(w,V,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(pe,me),Ze=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,Ze&&Fe.addToRenderList(m,w),this.info.render.frame++,ft===!0&&ee.beginShadows();const J=p.state.shadowsArray;ce.render(J,w,V),ft===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=m.opaque,k=m.transmissive;if(p.setupLights(),V.isArrayCamera){const de=V.cameras;if(k.length>0)for(let we=0,Se=de.length;we<Se;we++){const De=de[we];gs(Z,k,w,De)}Ze&&Fe.render(w);for(let we=0,Se=de.length;we<Se;we++){const De=de[we];bi(m,w,De,De.viewport)}}else k.length>0&&gs(Z,k,w,V),Ze&&Fe.render(w),bi(m,w,V);O!==null&&P===0&&(at.updateMultisampleRenderTarget(O),at.updateRenderTargetMipmap(O)),w.isScene===!0&&w.onAfterRender(x,w,V),Re.resetDefaultState(),T=-1,M=null,b.pop(),b.length>0?(p=b[b.length-1],ft===!0&&ee.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Fs(w,V,J,Z){if(w.visible===!1)return;if(w.layers.test(V.layers)){if(w.isGroup)J=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(V);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||St.intersectsSprite(w)){Z&&xe.setFromMatrixPosition(w.matrixWorld).applyMatrix4(j);const we=X.update(w),Se=w.material;Se.visible&&m.push(w,we,Se,J,xe.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||St.intersectsObject(w))){const we=X.update(w),Se=w.material;if(Z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),xe.copy(w.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),xe.copy(we.boundingSphere.center)),xe.applyMatrix4(w.matrixWorld).applyMatrix4(j)),Array.isArray(Se)){const De=we.groups;for(let Ke=0,et=De.length;Ke<et;Ke++){const We=De[Ke],pt=Se[We.materialIndex];pt&&pt.visible&&m.push(w,we,pt,J,xe.z,We)}}else Se.visible&&m.push(w,we,Se,J,xe.z,null)}}const de=w.children;for(let we=0,Se=de.length;we<Se;we++)Fs(de[we],V,J,Z)}function bi(w,V,J,Z){const k=w.opaque,de=w.transmissive,we=w.transparent;p.setupLightsView(J),ft===!0&&ee.setGlobalState(x.clippingPlanes,J),Z&&Te.viewport(D.copy(Z)),k.length>0&&$i(k,V,J),de.length>0&&$i(de,V,J),we.length>0&&$i(we,V,J),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function gs(w,V,J,Z){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Z.id]===void 0&&(p.state.transmissionRenderTarget[Z.id]=new Os(1,1,{generateMipmaps:!0,type:je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float")?Ea:vi,minFilter:ki,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:xt.workingColorSpace}));const de=p.state.transmissionRenderTarget[Z.id],we=Z.viewport||D;de.setSize(we.z*x.transmissionResolutionScale,we.w*x.transmissionResolutionScale);const Se=x.getRenderTarget(),De=x.getActiveCubeFace(),Ke=x.getActiveMipmapLevel();x.setRenderTarget(de),x.getClearColor(K),Q=x.getClearAlpha(),Q<1&&x.setClearColor(16777215,.5),x.clear(),Ze&&Fe.render(J);const et=x.toneMapping;x.toneMapping=ds;const We=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),p.setupLightsView(Z),ft===!0&&ee.setGlobalState(x.clippingPlanes,Z),$i(w,J,Z),at.updateMultisampleRenderTarget(de),at.updateRenderTargetMipmap(de),je.has("WEBGL_multisampled_render_to_texture")===!1){let pt=!1;for(let Ye=0,Ot=V.length;Ye<Ot;Ye++){const bt=V[Ye],Tt=bt.object,Je=bt.geometry,Dt=bt.material,yt=bt.group;if(Dt.side===ti&&Tt.layers.test(Z.layers)){const vn=Dt.side;Dt.side=Nn,Dt.needsUpdate=!0,Un(Tt,J,Z,Je,Dt,yt),Dt.side=vn,Dt.needsUpdate=!0,pt=!0}}pt===!0&&(at.updateMultisampleRenderTarget(de),at.updateRenderTargetMipmap(de))}x.setRenderTarget(Se,De,Ke),x.setClearColor(K,Q),We!==void 0&&(Z.viewport=We),x.toneMapping=et}function $i(w,V,J){const Z=V.isScene===!0?V.overrideMaterial:null;for(let k=0,de=w.length;k<de;k++){const we=w[k],Se=we.object,De=we.geometry,Ke=we.group;let et=we.material;et.allowOverride===!0&&Z!==null&&(et=Z),Se.layers.test(J.layers)&&Un(Se,V,J,De,et,Ke)}}function Un(w,V,J,Z,k,de){w.onBeforeRender(x,V,J,Z,k,de),w.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),k.onBeforeRender(x,V,J,Z,w,de),k.transparent===!0&&k.side===ti&&k.forceSinglePass===!1?(k.side=Nn,k.needsUpdate=!0,x.renderBufferDirect(J,V,Z,k,w,de),k.side=Vi,k.needsUpdate=!0,x.renderBufferDirect(J,V,Z,k,w,de),k.side=ti):x.renderBufferDirect(J,V,Z,k,w,de),w.onAfterRender(x,V,J,Z,k,de)}function _n(w,V,J){V.isScene!==!0&&(V=Pe);const Z=Ne.get(w),k=p.state.lights,de=p.state.shadowsArray,we=k.state.version,Se=re.getParameters(w,k.state,de,V,J),De=re.getProgramCacheKey(Se);let Ke=Z.programs;Z.environment=w.isMeshStandardMaterial?V.environment:null,Z.fog=V.fog,Z.envMap=(w.isMeshStandardMaterial?Ht:Yt).get(w.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&w.envMap===null?V.environmentRotation:w.envMapRotation,Ke===void 0&&(w.addEventListener("dispose",ne),Ke=new Map,Z.programs=Ke);let et=Ke.get(De);if(et!==void 0){if(Z.currentProgram===et&&Z.lightsStateVersion===we)return Bt(w,Se),et}else Se.uniforms=re.getUniforms(w),w.onBeforeCompile(Se,x),et=re.acquireProgram(Se,De),Ke.set(De,et),Z.uniforms=Se.uniforms;const We=Z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(We.clippingPlanes=ee.uniform),Bt(w,Se),Z.needsLights=Kn(w),Z.lightsStateVersion=we,Z.needsLights&&(We.ambientLightColor.value=k.state.ambient,We.lightProbe.value=k.state.probe,We.directionalLights.value=k.state.directional,We.directionalLightShadows.value=k.state.directionalShadow,We.spotLights.value=k.state.spot,We.spotLightShadows.value=k.state.spotShadow,We.rectAreaLights.value=k.state.rectArea,We.ltc_1.value=k.state.rectAreaLTC1,We.ltc_2.value=k.state.rectAreaLTC2,We.pointLights.value=k.state.point,We.pointLightShadows.value=k.state.pointShadow,We.hemisphereLights.value=k.state.hemi,We.directionalShadowMap.value=k.state.directionalShadowMap,We.directionalShadowMatrix.value=k.state.directionalShadowMatrix,We.spotShadowMap.value=k.state.spotShadowMap,We.spotLightMatrix.value=k.state.spotLightMatrix,We.spotLightMap.value=k.state.spotLightMap,We.pointShadowMap.value=k.state.pointShadowMap,We.pointShadowMatrix.value=k.state.pointShadowMatrix),Z.currentProgram=et,Z.uniformsList=null,et}function Ia(w){if(w.uniformsList===null){const V=w.currentProgram.getUniforms();w.uniformsList=Lo.seqWithValue(V.seq,w.uniforms)}return w.uniformsList}function Bt(w,V){const J=Ne.get(w);J.outputColorSpace=V.outputColorSpace,J.batching=V.batching,J.batchingColor=V.batchingColor,J.instancing=V.instancing,J.instancingColor=V.instancingColor,J.instancingMorph=V.instancingMorph,J.skinning=V.skinning,J.morphTargets=V.morphTargets,J.morphNormals=V.morphNormals,J.morphColors=V.morphColors,J.morphTargetsCount=V.morphTargetsCount,J.numClippingPlanes=V.numClippingPlanes,J.numIntersection=V.numClipIntersection,J.vertexAlphas=V.vertexAlphas,J.vertexTangents=V.vertexTangents,J.toneMapping=V.toneMapping}function gt(w,V,J,Z,k){V.isScene!==!0&&(V=Pe),at.resetTextureUnits();const de=V.fog,we=Z.isMeshStandardMaterial?V.environment:null,Se=O===null?x.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Cn,De=(Z.isMeshStandardMaterial?Ht:Yt).get(Z.envMap||we),Ke=Z.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,et=!!J.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),We=!!J.morphAttributes.position,pt=!!J.morphAttributes.normal,Ye=!!J.morphAttributes.color;let Ot=ds;Z.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Ot=x.toneMapping);const bt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Tt=bt!==void 0?bt.length:0,Je=Ne.get(Z),Dt=p.state.lights;if(ft===!0&&(se===!0||w!==M)){const an=w===M&&Z.id===T;ee.setState(Z,w,an)}let yt=!1;Z.version===Je.__version?(Je.needsLights&&Je.lightsStateVersion!==Dt.state.version||Je.outputColorSpace!==Se||k.isBatchedMesh&&Je.batching===!1||!k.isBatchedMesh&&Je.batching===!0||k.isBatchedMesh&&Je.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Je.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Je.instancing===!1||!k.isInstancedMesh&&Je.instancing===!0||k.isSkinnedMesh&&Je.skinning===!1||!k.isSkinnedMesh&&Je.skinning===!0||k.isInstancedMesh&&Je.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Je.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Je.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Je.instancingMorph===!1&&k.morphTexture!==null||Je.envMap!==De||Z.fog===!0&&Je.fog!==de||Je.numClippingPlanes!==void 0&&(Je.numClippingPlanes!==ee.numPlanes||Je.numIntersection!==ee.numIntersection)||Je.vertexAlphas!==Ke||Je.vertexTangents!==et||Je.morphTargets!==We||Je.morphNormals!==pt||Je.morphColors!==Ye||Je.toneMapping!==Ot||Je.morphTargetsCount!==Tt)&&(yt=!0):(yt=!0,Je.__version=Z.version);let vn=Je.currentProgram;yt===!0&&(vn=_n(Z,V,k));let Ti=!1,hn=!1,_s=!1;const Ft=vn.getUniforms(),fn=Je.uniforms;if(Te.useProgram(vn.program)&&(Ti=!0,hn=!0,_s=!0),Z.id!==T&&(T=Z.id,hn=!0),Ti||M!==w){Te.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Ft.setValue(N,"projectionMatrix",w.projectionMatrix),Ft.setValue(N,"viewMatrix",w.matrixWorldInverse);const Qt=Ft.map.cameraPosition;Qt!==void 0&&Qt.setValue(N,ve.setFromMatrixPosition(w.matrixWorld)),Xe.logarithmicDepthBuffer&&Ft.setValue(N,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Ft.setValue(N,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,hn=!0,_s=!0)}if(k.isSkinnedMesh){Ft.setOptional(N,k,"bindMatrix"),Ft.setOptional(N,k,"bindMatrixInverse");const an=k.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),Ft.setValue(N,"boneTexture",an.boneTexture,at))}k.isBatchedMesh&&(Ft.setOptional(N,k,"batchingTexture"),Ft.setValue(N,"batchingTexture",k._matricesTexture,at),Ft.setOptional(N,k,"batchingIdTexture"),Ft.setValue(N,"batchingIdTexture",k._indirectTexture,at),Ft.setOptional(N,k,"batchingColorTexture"),k._colorsTexture!==null&&Ft.setValue(N,"batchingColorTexture",k._colorsTexture,at));const Pn=J.morphAttributes;if((Pn.position!==void 0||Pn.normal!==void 0||Pn.color!==void 0)&&ue.update(k,J,vn),(hn||Je.receiveShadow!==k.receiveShadow)&&(Je.receiveShadow=k.receiveShadow,Ft.setValue(N,"receiveShadow",k.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(fn.envMap.value=De,fn.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&V.environment!==null&&(fn.envMapIntensity.value=V.environmentIntensity),hn&&(Ft.setValue(N,"toneMappingExposure",x.toneMappingExposure),Je.needsLights&&Zt(fn,_s),de&&Z.fog===!0&&fe.refreshFogUniforms(fn,de),fe.refreshMaterialUniforms(fn,Z,q,ie,p.state.transmissionRenderTarget[w.id]),Lo.upload(N,Ia(Je),fn,at)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Lo.upload(N,Ia(Je),fn,at),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Ft.setValue(N,"center",k.center),Ft.setValue(N,"modelViewMatrix",k.modelViewMatrix),Ft.setValue(N,"normalMatrix",k.normalMatrix),Ft.setValue(N,"modelMatrix",k.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const an=Z.uniformsGroups;for(let Qt=0,Gt=an.length;Qt<Gt;Qt++){const fi=an[Qt];it.update(fi,vn),it.bind(fi,vn)}}return vn}function Zt(w,V){w.ambientLightColor.needsUpdate=V,w.lightProbe.needsUpdate=V,w.directionalLights.needsUpdate=V,w.directionalLightShadows.needsUpdate=V,w.pointLights.needsUpdate=V,w.pointLightShadows.needsUpdate=V,w.spotLights.needsUpdate=V,w.spotLightShadows.needsUpdate=V,w.rectAreaLights.needsUpdate=V,w.hemisphereLights.needsUpdate=V}function Kn(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(w,V,J){const Z=Ne.get(w);Z.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),Ne.get(w.texture).__webglTexture=V,Ne.get(w.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:J,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,V){const J=Ne.get(w);J.__webglFramebuffer=V,J.__useDefaultFramebuffer=V===void 0};const Pa=N.createFramebuffer();this.setRenderTarget=function(w,V=0,J=0){O=w,R=V,P=J;let Z=!0,k=null,de=!1,we=!1;if(w){const De=Ne.get(w);if(De.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(N.FRAMEBUFFER,null),Z=!1;else if(De.__webglFramebuffer===void 0)at.setupRenderTarget(w);else if(De.__hasExternalTextures)at.rebindTextures(w,Ne.get(w.texture).__webglTexture,Ne.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const We=w.depthTexture;if(De.__boundDepthTexture!==We){if(We!==null&&Ne.has(We)&&(w.width!==We.image.width||w.height!==We.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");at.setupDepthRenderbuffer(w)}}const Ke=w.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(we=!0);const et=Ne.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(et[V])?k=et[V][J]:k=et[V],de=!0):w.samples>0&&at.useMultisampledRTT(w)===!1?k=Ne.get(w).__webglMultisampledFramebuffer:Array.isArray(et)?k=et[J]:k=et,D.copy(w.viewport),F.copy(w.scissor),H=w.scissorTest}else D.copy(Ve).multiplyScalar(q).floor(),F.copy(st).multiplyScalar(q).floor(),H=_t;if(J!==0&&(k=Pa),Te.bindFramebuffer(N.FRAMEBUFFER,k)&&Z&&Te.drawBuffers(w,k),Te.viewport(D),Te.scissor(F),Te.setScissorTest(H),de){const De=Ne.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+V,De.__webglTexture,J)}else if(we){const De=V;for(let Ke=0;Ke<w.textures.length;Ke++){const et=Ne.get(w.textures[Ke]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ke,et.__webglTexture,J,De)}}else if(w!==null&&J!==0){const De=Ne.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,De.__webglTexture,J)}T=-1},this.readRenderTargetPixels=function(w,V,J,Z,k,de,we,Se=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=Ne.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&we!==void 0&&(De=De[we]),De){Te.bindFramebuffer(N.FRAMEBUFFER,De);try{const Ke=w.textures[Se],et=Ke.format,We=Ke.type;if(!Xe.textureFormatReadable(et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xe.textureTypeReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=w.width-Z&&J>=0&&J<=w.height-k&&(w.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Se),N.readPixels(V,J,Z,k,ke.convert(et),ke.convert(We),de))}finally{const Ke=O!==null?Ne.get(O).__webglFramebuffer:null;Te.bindFramebuffer(N.FRAMEBUFFER,Ke)}}},this.readRenderTargetPixelsAsync=async function(w,V,J,Z,k,de,we,Se=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=Ne.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&we!==void 0&&(De=De[we]),De)if(V>=0&&V<=w.width-Z&&J>=0&&J<=w.height-k){Te.bindFramebuffer(N.FRAMEBUFFER,De);const Ke=w.textures[Se],et=Ke.format,We=Ke.type;if(!Xe.textureFormatReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xe.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const pt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,pt),N.bufferData(N.PIXEL_PACK_BUFFER,de.byteLength,N.STREAM_READ),w.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Se),N.readPixels(V,J,Z,k,ke.convert(et),ke.convert(We),0);const Ye=O!==null?Ne.get(O).__webglFramebuffer:null;Te.bindFramebuffer(N.FRAMEBUFFER,Ye);const Ot=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await R0(N,Ot,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,pt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,de),N.deleteBuffer(pt),N.deleteSync(Ot),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,V=null,J=0){const Z=Math.pow(2,-J),k=Math.floor(w.image.width*Z),de=Math.floor(w.image.height*Z),we=V!==null?V.x:0,Se=V!==null?V.y:0;at.setTexture2D(w,0),N.copyTexSubImage2D(N.TEXTURE_2D,J,0,0,we,Se,k,de),Te.unbindTexture()};const ks=N.createFramebuffer(),Bs=N.createFramebuffer();this.copyTextureToTexture=function(w,V,J=null,Z=null,k=0,de=null){de===null&&(k!==0?(Ma("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),de=k,k=0):de=0);let we,Se,De,Ke,et,We,pt,Ye,Ot;const bt=w.isCompressedTexture?w.mipmaps[de]:w.image;if(J!==null)we=J.max.x-J.min.x,Se=J.max.y-J.min.y,De=J.isBox3?J.max.z-J.min.z:1,Ke=J.min.x,et=J.min.y,We=J.isBox3?J.min.z:0;else{const Pn=Math.pow(2,-k);we=Math.floor(bt.width*Pn),Se=Math.floor(bt.height*Pn),w.isDataArrayTexture?De=bt.depth:w.isData3DTexture?De=Math.floor(bt.depth*Pn):De=1,Ke=0,et=0,We=0}Z!==null?(pt=Z.x,Ye=Z.y,Ot=Z.z):(pt=0,Ye=0,Ot=0);const Tt=ke.convert(V.format),Je=ke.convert(V.type);let Dt;V.isData3DTexture?(at.setTexture3D(V,0),Dt=N.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(at.setTexture2DArray(V,0),Dt=N.TEXTURE_2D_ARRAY):(at.setTexture2D(V,0),Dt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,V.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,V.unpackAlignment);const yt=N.getParameter(N.UNPACK_ROW_LENGTH),vn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Ti=N.getParameter(N.UNPACK_SKIP_PIXELS),hn=N.getParameter(N.UNPACK_SKIP_ROWS),_s=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,bt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,bt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ke),N.pixelStorei(N.UNPACK_SKIP_ROWS,et),N.pixelStorei(N.UNPACK_SKIP_IMAGES,We);const Ft=w.isDataArrayTexture||w.isData3DTexture,fn=V.isDataArrayTexture||V.isData3DTexture;if(w.isDepthTexture){const Pn=Ne.get(w),an=Ne.get(V),Qt=Ne.get(Pn.__renderTarget),Gt=Ne.get(an.__renderTarget);Te.bindFramebuffer(N.READ_FRAMEBUFFER,Qt.__webglFramebuffer),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,Gt.__webglFramebuffer);for(let fi=0;fi<De;fi++)Ft&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ne.get(w).__webglTexture,k,We+fi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ne.get(V).__webglTexture,de,Ot+fi)),N.blitFramebuffer(Ke,et,we,Se,pt,Ye,we,Se,N.DEPTH_BUFFER_BIT,N.NEAREST);Te.bindFramebuffer(N.READ_FRAMEBUFFER,null),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(k!==0||w.isRenderTargetTexture||Ne.has(w)){const Pn=Ne.get(w),an=Ne.get(V);Te.bindFramebuffer(N.READ_FRAMEBUFFER,ks),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,Bs);for(let Qt=0;Qt<De;Qt++)Ft?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pn.__webglTexture,k,We+Qt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Pn.__webglTexture,k),fn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,an.__webglTexture,de,Ot+Qt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,an.__webglTexture,de),k!==0?N.blitFramebuffer(Ke,et,we,Se,pt,Ye,we,Se,N.COLOR_BUFFER_BIT,N.NEAREST):fn?N.copyTexSubImage3D(Dt,de,pt,Ye,Ot+Qt,Ke,et,we,Se):N.copyTexSubImage2D(Dt,de,pt,Ye,Ke,et,we,Se);Te.bindFramebuffer(N.READ_FRAMEBUFFER,null),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else fn?w.isDataTexture||w.isData3DTexture?N.texSubImage3D(Dt,de,pt,Ye,Ot,we,Se,De,Tt,Je,bt.data):V.isCompressedArrayTexture?N.compressedTexSubImage3D(Dt,de,pt,Ye,Ot,we,Se,De,Tt,bt.data):N.texSubImage3D(Dt,de,pt,Ye,Ot,we,Se,De,Tt,Je,bt):w.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,de,pt,Ye,we,Se,Tt,Je,bt.data):w.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,de,pt,Ye,bt.width,bt.height,Tt,bt.data):N.texSubImage2D(N.TEXTURE_2D,de,pt,Ye,we,Se,Tt,Je,bt);N.pixelStorei(N.UNPACK_ROW_LENGTH,yt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,vn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ti),N.pixelStorei(N.UNPACK_SKIP_ROWS,hn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,_s),de===0&&V.generateMipmaps&&N.generateMipmap(Dt),Te.unbindTexture()},this.initRenderTarget=function(w){Ne.get(w).__webglFramebuffer===void 0&&at.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?at.setTextureCube(w,0):w.isData3DTexture?at.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?at.setTexture2DArray(w,0):at.setTexture2D(w,0),Te.unbindTexture()},this.resetState=function(){R=0,P=0,O=null,Te.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=xt._getDrawingBufferColorSpace(e),t.unpackColorSpace=xt._getUnpackColorSpace()}}function zh(i,e){if(e===e0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Xl||e===kf){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Xl)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class GS extends Ir{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new YS(t)}),this.register(function(t){return new KS(t)}),this.register(function(t){return new sb(t)}),this.register(function(t){return new rb(t)}),this.register(function(t){return new ab(t)}),this.register(function(t){return new JS(t)}),this.register(function(t){return new ZS(t)}),this.register(function(t){return new QS(t)}),this.register(function(t){return new eb(t)}),this.register(function(t){return new qS(t)}),this.register(function(t){return new tb(t)}),this.register(function(t){return new jS(t)}),this.register(function(t){return new ib(t)}),this.register(function(t){return new nb(t)}),this.register(function(t){return new $S(t)}),this.register(function(t){return new ob(t)}),this.register(function(t){return new cb(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=ua.extractUrlBase(e);a=ua.resolveURL(c,this.path)}else a=ua.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new lp(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(d){t(d),r.manager.itemEnd(e)},o)}catch(d){o(d)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===mp){try{a[vt.KHR_BINARY_GLTF]=new lb(e)}catch(u){s&&s(u);return}r=JSON.parse(a[vt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Sb(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const u=this.pluginCallbacks[d](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let d=0;d<r.extensionsUsed.length;++d){const u=r.extensionsUsed[d],h=r.extensionsRequired||[];switch(u){case vt.KHR_MATERIALS_UNLIT:a[u]=new XS;break;case vt.KHR_DRACO_MESH_COMPRESSION:a[u]=new ub(r,this.dracoLoader);break;case vt.KHR_TEXTURE_TRANSFORM:a[u]=new db;break;case vt.KHR_MESH_QUANTIZATION:a[u]=new hb;break;default:h.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function WS(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const vt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class $S{constructor(e){this.parser=e,this.name=vt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const d=new nt(16777215);l.color!==void 0&&d.setRGB(l.color[0],l.color[1],l.color[2],Cn);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Jl(d),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new X_(d),c.distance=u;break;case"spot":c=new W_(d),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),mi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class XS{constructor(){this.name=vt.KHR_MATERIALS_UNLIT}getMaterialType(){return qn}extendParams(e,t,n){const s=[];e.color=new nt(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Cn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Wt))}return Promise.all(s)}}class qS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class YS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new He(o,o)}return Promise.all(r)}}class KS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class jS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class JS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new nt(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Cn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Wt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class ZS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class QS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new nt().setRGB(o[0],o[1],o[2],Cn),Promise.all(r)}}class eb{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class tb{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new nt().setRGB(o[0],o[1],o[2],Cn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Wt)),Promise.all(r)}}class nb{constructor(e){this.parser=e,this.name=vt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class ib{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class sb{constructor(e){this.parser=e,this.name=vt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class rb{constructor(e){this.parser=e,this.name=vt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class ab{constructor(e){this.parser=e,this.name=vt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class ob{constructor(e){this.name=vt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,d=s.count,u=s.byteStride,h=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(d,u,h,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(d*u);return a.decodeGltfBuffer(new Uint8Array(f),d,u,h,s.mode,s.filter),f})})}else return null}}class cb{constructor(e){this.name=vt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==Wn.TRIANGLES&&c.mode!==Wn.TRIANGLE_STRIP&&c.mode!==Wn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(d=>(l[c]=d,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const d=c.pop(),u=d.isGroup?d.children:[d],h=c[0].count,f=[];for(const g of u){const v=new rt,m=new C,p=new tt,E=new C(1,1,1),b=new ep(g.geometry,g.material,h);for(let x=0;x<h;x++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,x),l.SCALE&&E.fromBufferAttribute(l.SCALE,x),b.setMatrixAt(x,v.compose(m,p,E));for(const x in l)if(x==="_COLOR_0"){const A=l[x];b.instanceColor=new Yl(A.array,A.itemSize,A.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,l[x]);zt.prototype.copy.call(b,g),this.parser.assignFinalMaterial(b),f.push(b)}return d.isGroup?(d.clear(),d.add(...f),d):f[0]}))}}const mp="glTF",Qr=12,Hh={JSON:1313821514,BIN:5130562};class lb{constructor(e){this.name=vt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Qr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==mp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Qr,r=new DataView(e,Qr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===Hh.JSON){const c=new Uint8Array(e,Qr+a,o);this.content=n.decode(c)}else if(l===Hh.BIN){const c=Qr+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class ub{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=vt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const d in a){const u=eu[d]||d.toLowerCase();o[u]=a[d]}for(const d in e.attributes){const u=eu[d]||d.toLowerCase();if(a[d]!==void 0){const h=n.accessors[e.attributes[d]],f=pr[h.componentType];c[u]=f.name,l[u]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(d){return new Promise(function(u,h){s.decodeDracoFile(d,function(f){for(const g in f.attributes){const v=f.attributes[g],m=l[g];m!==void 0&&(v.normalized=m)}u(f)},o,c,Cn,h)})})}}class db{constructor(){this.name=vt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class hb{constructor(){this.name=vt.KHR_MESH_QUANTIZATION}}class gp extends Ra{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,d=s-t,u=(n-t)/d,h=u*u,f=h*u,g=e*c,v=g-c,m=-2*f+3*h,p=f-h,E=1-m,b=p-h+u;for(let x=0;x!==o;x++){const A=a[v+x+o],R=a[v+x+l]*d,P=a[g+x+o],O=a[g+x]*d;r[x]=E*A+b*R+m*P+p*O}return r}}const fb=new tt;class pb extends gp{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return fb.fromArray(r).normalize().toArray(r),r}}const Wn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},pr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Vh={9728:An,9729:zn,9984:If,9985:Ao,9986:na,9987:ki},Gh={33071:ls,33648:Oo,10497:Mr},jc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},eu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},rs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},mb={CUBICSPLINE:void 0,LINEAR:ya,STEP:va},Jc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function gb(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new tn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Vi})),i.DefaultMaterial}function As(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function mi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function _b(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,d=e.length;c<d;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],l=[];for(let c=0,d=e.length;c<d;c++){const u=e[c];if(n){const h=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(h)}if(s){const h=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(h)}if(r){const h=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(h)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const d=c[0],u=c[1],h=c[2];return n&&(i.morphAttributes.position=d),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function vb(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function yb(i){let e;const t=i.extensions&&i.extensions[vt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Zc(t.attributes):e=i.indices+":"+Zc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Zc(i.targets[n]);return e}function Zc(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function tu(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function xb(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Mb=new rt;class Sb{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new WS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new H_(this.options.manager):this.textureLoader=new Y_(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new lp(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return As(r,o,s),mi(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,d]of a.children.entries())r(d,o.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[vt.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(ua.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=jc[s.type],o=pr[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new Rn(c,a,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=jc[s.type],c=pr[s.componentType],d=c.BYTES_PER_ELEMENT,u=d*l,h=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let v,m;if(f&&f!==u){const p=Math.floor(h/f),E="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let b=t.cache.get(E);b||(v=new c(o,p*f,s.count*f/d),b=new Kf(v,f/d),t.cache.add(E,b)),m=new Sa(b,l,h%f/d,g)}else o===null?v=new c(s.count*l):v=new c(o,h,s.count*l),m=new Rn(v,l,g);if(s.sparse!==void 0){const p=jc.SCALAR,E=pr[s.sparse.indices.componentType],b=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,A=new E(a[1],b,s.sparse.count*p),R=new c(a[2],x,s.sparse.count*l);o!==null&&(m=new Rn(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let P=0,O=A.length;P<O;P++){const T=A[P];if(m.setX(T,R[P*l]),l>=2&&m.setY(T,R[P*l+1]),l>=3&&m.setZ(T,R[P*l+2]),l>=4&&m.setW(T,R[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(d){d.flipY=!1,d.name=a.name||o.name||"",d.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(d.name=o.uri);const h=(r.samplers||{})[a.sampler]||{};return d.magFilter=Vh[h.magFilter]||zn,d.minFilter=Vh[h.minFilter]||ki,d.wrapS=Gh[h.wrapS]||Mr,d.wrapT=Gh[h.wrapT]||Mr,d.generateMipmaps=!d.isCompressedTexture&&d.minFilter!==An&&d.minFilter!==zn,s.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const h=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(h),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const d=Promise.resolve(l).then(function(u){return new Promise(function(h,f){let g=h;t.isImageBitmapLoader===!0&&(g=function(v){const m=new nn(v);m.needsUpdate=!0,h(m)}),t.load(ua.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),mi(u,a),u.userData.mimeType=a.mimeType||xb(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=d,d}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[vt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[vt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[vt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new np,ci.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new tp,ci.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return tn}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[vt.KHR_MATERIALS_UNLIT]){const u=s[vt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new nt(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const h=u.baseColorFactor;o.color.setRGB(h[0],h[1],h[2],Cn),o.opacity=h[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,Wt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=ti);const d=r.alphaMode||Jc.OPAQUE;if(d===Jc.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,d===Jc.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==qn&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new He(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==qn&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==qn){const u=r.emissiveFactor;o.emissive=new nt().setRGB(u[0],u[1],u[2],Cn)}return r.emissiveTexture!==void 0&&a!==qn&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Wt)),Promise.all(c).then(function(){const u=new a(o);return r.name&&(u.name=r.name),mi(u,r),t.associations.set(u,{materials:e}),r.extensions&&As(s,u,r),u})}createUniqueName(e){const t=Pt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[vt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Wh(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],d=yb(c),u=s[d];if(u)a.push(u.promise);else{let h;c.extensions&&c.extensions[vt.KHR_DRACO_MESH_COMPRESSION]?h=r(c):h=Wh(new dn,c,t),s[d]={primitive:c,promise:h},a.push(h)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const d=a[l].material===void 0?gb(this.cache):this.getDependency("material",a[l].material);o.push(d)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),d=l[l.length-1],u=[];for(let f=0,g=d.length;f<g;f++){const v=d[f],m=a[f];let p;const E=c[f];if(m.mode===Wn.TRIANGLES||m.mode===Wn.TRIANGLE_STRIP||m.mode===Wn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new n_(v,E):new Ct(v,E),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Wn.TRIANGLE_STRIP?p.geometry=zh(p.geometry,kf):m.mode===Wn.TRIANGLE_FAN&&(p.geometry=zh(p.geometry,Xl));else if(m.mode===Wn.LINES)p=new c_(v,E);else if(m.mode===Wn.LINE_STRIP)p=new Au(v,E);else if(m.mode===Wn.LINE_LOOP)p=new l_(v,E);else if(m.mode===Wn.POINTS)p=new u_(v,E);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&vb(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),mi(p,r),m.extensions&&As(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&As(s,u[0],r),u[0];const h=new $t;r.extensions&&As(s,h,r),t.associations.set(h,{meshes:e});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new En(as.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Nu(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),mi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],l=[];for(let c=0,d=a.length;c<d;c++){const u=a[c];if(u){o.push(u);const h=new rt;r!==null&&h.fromArray(r.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Eu(o,l)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],d=[];for(let u=0,h=s.channels.length;u<h;u++){const f=s.channels[u],g=s.samplers[f.sampler],v=f.target,m=v.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,E=s.parameters!==void 0?s.parameters[g.output]:g.output;v.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",E)),c.push(g),d.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(d)]).then(function(u){const h=u[0],f=u[1],g=u[2],v=u[3],m=u[4],p=[];for(let b=0,x=h.length;b<x;b++){const A=h[b],R=f[b],P=g[b],O=v[b],T=m[b];if(A===void 0)continue;A.updateMatrix&&A.updateMatrix();const M=n._createAnimationTracks(A,R,P,O,T);if(M)for(let D=0;D<M.length;D++)p.push(M[D])}const E=new N_(r,void 0,p);return mi(E,s),E})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,d=o.length;c<d;c++)a.push(n.getDependency("node",o[c]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const d=c[0],u=c[1],h=c[2];h!==null&&d.traverse(function(f){f.isSkinnedMesh&&f.bind(h,Mb)});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let d;if(r.isBone===!0?d=new Zf:c.length>1?d=new $t:c.length===1?d=c[0]:d=new zt,d!==c[0])for(let u=0,h=c.length;u<h;u++)d.add(c[u]);if(r.name&&(d.userData.name=r.name,d.name=a),mi(d,r),r.extensions&&As(n,d,r),r.matrix!==void 0){const u=new rt;u.fromArray(r.matrix),d.applyMatrix4(u)}else r.translation!==void 0&&d.position.fromArray(r.translation),r.rotation!==void 0&&d.quaternion.fromArray(r.rotation),r.scale!==void 0&&d.scale.fromArray(r.scale);if(!s.associations.has(d))s.associations.set(d,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const u=s.associations.get(d);s.associations.set(d,{...u})}return s.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new $t;n.name&&(r.name=s.createUniqueName(n.name)),mi(r,n),n.extensions&&As(t,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let d=0,u=l.length;d<u;d++)r.add(l[d]);const c=d=>{const u=new Map;for(const[h,f]of s.associations)(h instanceof ci||h instanceof nn)&&u.set(h,f);return d.traverse(h=>{const f=s.associations.get(h);f!=null&&u.set(h,f)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,l=[];rs[r.path]===rs.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(o);let c;switch(rs[r.path]){case rs.weights:c=Tr;break;case rs.rotation:c=Er;break;case rs.translation:case rs.scale:c=wr;break;default:switch(n.itemSize){case 1:c=Tr;break;case 2:case 3:default:c=wr;break}break}const d=s.interpolation!==void 0?mb[s.interpolation]:ya,u=this._getArrayFromAccessor(n);for(let h=0,f=l.length;h<f;h++){const g=new c(l[h]+"."+rs[r.path],t.array,u,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=tu(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Er?pb:gp;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function bb(i,e,t){const n=e.attributes,s=new Hn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),o.normalized){const d=tu(pr[o.componentType]);s.min.multiplyScalar(d),s.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new C,l=new C;for(let c=0,d=r.length;c<d;c++){const u=r[c];if(u.POSITION!==void 0){const h=t.json.accessors[u.POSITION],f=h.min,g=h.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),h.normalized){const v=tu(pr[h.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new yi;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function Wh(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(const a in n){const o=eu[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return xt.workingColorSpace!==Cn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${xt.workingColorSpace}" not supported.`),mi(i,e),bb(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?_b(i,e.targets,t):i})}const Tb={restaurant:{theme:"cozy-cafe",products:jh.map(i=>i.id),sources:["assets/restaurant-cozy-interior.glb","assets/restaurant-cozy-customers.glb","assets/restaurant-products.glb","assets/cash-register.glb"],customerKinds:["bear","bunny","fox","penguin","cat"],hasBelt:!1}},Eb={"POS / Graphite powder coat":"#b17a55","POS / Injection molded ABS":"#f5dfbd","POS / Rubber":"#775543","POS / Brushed aluminium":"#d1aa76","POS / Stainless spring steel":"#d8c0a0","POS / Dark keycaps":"#9bae92","POS / Light keycaps":"#fff0d2","POS / Clear key":"#db927e","POS / Confirm key":"#8caa87","POS / Lettering":"#684b3c","POS / Key legend":"#5a4436","POS / Thermal paper":"#fff4da"},Qc=new C(.65,1.025,.3),wb=new C(-.045,.98,.58),ea=new C(-.2,1.052,-.1),el=new C(.28,1.026,-.48),tl=new C(3.2,0,-2),ta=new C(-.3,1.3,-.74),Ab=new C(0,0,-1.2),Rb=[new C(-1.4,0,-2.5),new C(-2.7,0,-3.5)],Cb=[[1e4,-.264],[5e3,-.132],[2e3,0],[1e3,.132],[500,.264]],Ib=[[200,-.274],[100,-.165],[50,-.055],[20,.055],[10,.165],[5,.274]],nl={calm:{peak:[0,0,0],settled:[0,0,0],duration:300},restless:{peak:[-.14,.045,-.18],settled:[-.055,.015,-.06],duration:1100},impatient:{peak:[-.24,.075,-.65],settled:[-.1,.035,-.17],duration:1350},exhausted:{peak:[-.32,.1,-.92],settled:[-.15,.05,-.28],duration:1500}},il={calm:{smile:.02,brow:.08,lift:0,cheek:1},happy:{smile:.036,brow:.18,lift:.018,cheek:1.18},restless:{smile:.003,brow:.28,lift:.006,cheek:.92},impatient:{smile:-.022,brow:-.22,lift:-.006,cheek:.84},exhausted:{smile:-.014,brow:.32,lift:-.011,cheek:.76},relieved:{smile:.025,brow:.04,lift:.003,cheek:1.06},tired:{smile:.008,brow:.27,lift:-.01,cheek:.82}},Pb={"too-high":{smile:-.008,brow:.36,lift:.042},"too-low":{smile:-.02,brow:.28,lift:.025}},Lb=["bear-nod","bunny-ears","fox-tilt","penguin-flippers","cat-blink"],Db=["thumbs-up","kiss","hearts","thumbs-up","kiss"],Do=i=>`./${i}`,pn=i=>i*i*(3-2*i),$h=i=>`$${(i/100).toFixed(i%100?2:0)}`;function Xh(i,e=new Set){return i==null||i.traverse(t=>{t.geometry&&!e.has(t.geometry)&&(e.add(t.geometry),t.geometry.dispose());for(const n of Array.isArray(t.material)?t.material:[t.material])if(!(!n||e.has(n))){e.add(n);for(const s of Object.values(n))s!=null&&s.isTexture&&!e.has(s)&&(e.add(s),s.dispose());n.dispose()}}),e}function Nb(i,e,t){let n=0,s=!1,r=null;return{setState(a){r=a;const o=++n;a.phase==="unload"&&queueMicrotask(()=>{!s&&o===n&&(i==null||i())})},setOrder(){},setScanned(){},setPatience(){},setEmotion(){},setSpeech(){},playReaction(){},reactToChange(){},reactToTotal(){},celebrate(){},resize(){},dispose(){s=!0,n++},info:()=>({status:"unavailable",loaded:!1,sceneId:e,theme:{id:t.theme},customerKinds:[...t.customerKinds],customerModels:0,humanModels:0,productModels:[],conveyorVisible:!1,greetingAnimation:{status:"unavailable",active:!1},thankYouAnimation:{status:"unavailable",active:!1},phase:r==null?void 0:r.phase,patienceMood:"calm",cameraType:"PerspectiveCamera",viewMode:"first-person",triangles:0,drawCalls:0,queueCount:0,unloading:!1,drawerOpen:!1,drawerTarget:null,availableDrawerDenominations:ha(r).map(a=>a.cents),missingDrawerDenominations:Yo(r).map(a=>a.cents),activeAnimations:0,renderedFrames:0,renderLoopActive:!1,emotion:{mood:"happy",kind:t.customerKinds[0],expressionStyle:"unavailable",mouthOpenness:0,facialPose:"emotion"},speech:{active:!1,character:t.customerKinds[0],mouthOpenness:0,boundaryCount:0},reaction:{kind:null,status:"unavailable",active:!1,particleCount:0,symbolKinds:[]},changeHandover:{status:"none",holder:null,visible:!1,attachedToHand:!1,count:0,denominations:[]},takeawayBag:{status:"unavailable",holder:null,visible:!1,attachedToHand:!1,itemCount:0,lineIds:[],productIds:[],worldBounds:null},departure:{active:!1,walking:!1},customerMotion:{enabled:!1,active:!1,scheduled:!1,bursts:0,actorIndices:[],poses:[]},receipt:{status:"unavailable",holder:null,visible:!1,attachedToHand:!1,worldBounds:null,orderId:null},wrongChangeReaction:{direction:null,status:"unavailable",active:!1},wrongTotalReaction:{direction:null,status:"unavailable",active:!1,facialPose:null},items:[],modelSources:t.sources.map(Do)})}}async function Ub(i,{sceneId:e="restaurant",onScan:t,onReady:n,onError:s,onUnloadComplete:r,onAcceptPayment:a,onOpenDrawer:o}={}){e="restaurant";const l=Tb[e],c=e==="restaurant",d=wb.clone();c&&(d.y=1.032);let u;try{u=new VS({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch(_){return s==null||s(new Error("The 3D checkout could not start. You can still use all cashier controls.",{cause:_})),Nb(r,e,l)}let h=!1,f=!1,g=!1,v=!1,m=0,p=0,E=0,b=null,x=null,A=null,R=null,P=null,O=null,T=null,M=null,D=null,F="none",H=null,K=0,Q=null,te=null,ie={direction:null,status:"none",restore:null},q={direction:null,status:"none",restore:null},pe="happy",me=!1,Ve=0,st=0,_t=0,St=0,ft=null,se={kind:null,status:"none",symbolKinds:[]},j=null,ve="none",xe=null,Pe=[],Ze="counter";const Mt=new Map;let N=[],lt=0,je="";const Xe=new Set,Te=new Map;let Qe=null,Ne=null,at=!1,Yt=.45,Ht="",L=ha().map(_=>_.cents),S=[];const X=[],re=new Map,fe=new Map;let Y=null,Ue=null,ee=0,ce="scan",Fe="calm",ue=new Set,Ce="",qe=[],ke=null,Re=!1,it=!1,B=null,oe=null,Ee=null,Oe=!1;const ye=window.matchMedia("(prefers-reduced-motion: reduce)");let ne=ye.matches;const Be=new Map,be=new Map,ot=new Map,Me=new Map,In=new Map,gn=new Map;let Mi=null,Si=0,Fs=0,bi=null,gs=[];function $i(){return g&&!h&&!f&&!document.hidden&&!ne&&Y&&!["unload","success","finished"].includes(ce)}function Un(){clearTimeout(Mi),Mi=null,Me.delete("customers-idle"),bi==null||bi(),bi=null,gs=[]}function _n(_=2200){!$i()||Mi!==null||Me.has("customers-idle")||(Mi=setTimeout(()=>{Mi=null,$i()&&Ia()},_))}function Ia(){const _=[...be.values()].filter(U=>!U.group.visible||U.index===ee%5&&(Fe!=="calm"||ie.direction||q.direction||Me.has(`arm:${U.index}`))?!1:!["animal","patience","person","depart"].some(G=>Me.has(`${G}:${U.index}`))).map(U=>{var G,le,$,W;return{person:U,queued:U.index!==ee%5,rigPosition:U.rig.position.clone(),rigQuaternion:U.rig.quaternion.clone(),head:(G=U.head)==null?void 0:G.quaternion.clone(),headPosition:(le=U.head)==null?void 0:le.position.clone(),arm:($=U.freeArm)==null?void 0:$.quaternion.clone(),forearm:(W=U.freeForearm)==null?void 0:W.quaternion.clone(),ears:U.ears.map(he=>({object:he.object,quaternion:he.object.quaternion.clone()})),body:U.bodyParts.map(he=>({object:he,scale:he.scale.clone()}))}});if(!_.length){_n(1800);return}const I=Si++;Fs++,gs=_.map(({person:U})=>U.index);const y=()=>{var U;for(const{person:G,rigPosition:le,rigQuaternion:$,head:W,headPosition:he,arm:_e,forearm:ae,body:Ae,ears:Le}of _){G.rig.position.copy(le),G.rig.quaternion.copy($),W&&(G.head.quaternion.copy(W),G.head.position.copy(he)),_e&&G.freeArm.quaternion.copy(_e),ae&&G.freeForearm.quaternion.copy(ae);for(const ze of Ae)ze.object.scale.copy(ze.scale);for(const ze of Le)ze.object.quaternion.copy(ze.quaternion);Fr(G,((U=G.expression)==null?void 0:U.eyeClosure)??0)}};bi=y,Sn("customers-idle",2800,U=>{for(const[G,le]of _.entries()){const{person:$,queued:W,rigPosition:he,rigQuaternion:_e,head:ae,headPosition:Ae,arm:Le,forearm:ze,body:At,ears:ct}=le,dt=as.clamp((U*2800-G*170)/2380,0,1),Nt=Math.sin(dt*Math.PI)**2,Rt=Math.sin(dt*Math.PI*2)*Nt,On=($.index+I)%2?-1:1;for(const Fn of At)Fn.object.scale.copy(Fn.scale).multiply(new C(1+Nt*.004,1+Nt*.004,1+Nt*.01));W&&($.rig.position.copy(he).add(new C(Rt*.014,0,0)),$.rig.quaternion.copy(_e).multiply(new tt().setFromAxisAngle(new C(0,0,1),Rt*.01))),ae&&($.head.position.copy(Ae).add(new C(0,Nt*.005,0)),$.head.quaternion.copy(ae).multiply(new tt().setFromEuler(new Xt(Nt*($.index===0?.045:$.index===3?.065:.018),Nt*On*.085,Rt*($.index===2?.07:.018))))),c&&$.index===1&&ct.forEach((Fn,Vn)=>Fn.object.quaternion.copy(Fn.quaternion).multiply(new tt().setFromAxisAngle(new C(0,0,1),Rt*(Vn?-.085:.085)))),c&&$.index===4&&Fr($,Math.max($.expression.eyeClosure,dt>.3&&dt<.58?Math.sin((dt-.3)/.28*Math.PI)**2:0)),Le&&$.freeArm.quaternion.copy(Le).multiply(new tt().setFromEuler(new Xt(-Nt*.14,0,Nt*On*.035))),ze&&$.freeForearm.quaternion.copy(ze).multiply(new tt().setFromAxisAngle(new C(1,0,0),-Nt*.2))}},()=>{y(),bi=null,gs=[],_n(4400)})}u.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),u.outputColorSpace=Wt,u.toneMapping=Rf,u.toneMappingExposure=c?1:1.05,u.shadowMap.enabled=!0,u.shadowMap.type=wf;const Bt=u.domElement;Bt.className="market-canvas",Bt.style.cssText="display:block;width:100%;height:100%;touch-action:pan-y;outline:none;",Bt.setAttribute("role","img"),Bt.setAttribute("aria-label",`First-person ${c?"restaurant counter. Tap food on the trays to ring it up":"supermarket checkout. Tap groceries to scan them"} and tap the customer’s offered money to accept payment. The same actions are available as buttons.`),i.append(Bt);const gt=new Q0;gt.background=new nt(c?16773081:14410719),gt.fog=new Tu(c?16773081:14410719,13,34);const Zt=new En(60,1,.055,60);Zt.position.set(0,1.9,2.65),Zt.lookAt(-.15,1.1,-.55),gt.add(new V_(c?16777201:16775406,c?13017228:10135455,c?1.4:1.9));const Kn=new Jl(c?16773081:16773850,c?1.9:2.4);Kn.position.set(-3,7,4),Kn.castShadow=!0,Kn.shadow.mapSize.set(1024,1024),Object.assign(Kn.shadow.camera,{left:-7,right:7,top:7,bottom:-7,near:.1,far:24}),Kn.shadow.bias=-4e-4,Kn.shadow.normalBias=.025,Kn.target.position.set(0,0,-3),gt.add(Kn,Kn.target);const Pa=new Jl(c?16769476:15201023,c?.95:1.1);Pa.position.set(5,4,-4),gt.add(Pa);const ks=new $t;ks.name="order_items",gt.add(ks);const Bs=new $t;Bs.name="customer_queue",gt.add(Bs);const w=new $t;w.name="customer_affection",gt.add(w);const V=new Map;function J(_){if(V.has(_))return V.get(_);const I=document.createElement("canvas");I.width=I.height=192;const y=I.getContext("2d");y.lineJoin="round",y.lineCap="round",_==="hearts"?(y.beginPath(),y.moveTo(96,160),y.bezierCurveTo(12,107,15,49,55,38),y.bezierCurveTo(74,31,89,41,96,57),y.bezierCurveTo(104,40,120,31,140,38),y.bezierCurveTo(180,50,178,110,96,160),y.fillStyle="#f48eac",y.strokeStyle="#fff8ee",y.lineWidth=10,y.fill(),y.stroke(),y.beginPath(),y.moveTo(51,57),y.quadraticCurveTo(39,68,43,85),y.strokeStyle="#ffd8e5",y.lineWidth=8,y.stroke()):(y.fillStyle="#eff5d6",y.strokeStyle="#fff8ee",y.lineWidth=8,y.beginPath(),y.arc(96,96,77,0,Math.PI*2),y.fill(),y.stroke(),y.beginPath(),y.moveTo(71,149),y.lineTo(71,84),y.quadraticCurveTo(87,74,92,52),y.quadraticCurveTo(95,35,107,42),y.quadraticCurveTo(120,51,108,78),y.lineTo(139,78),y.quadraticCurveTo(155,80,150,96),y.lineTo(140,137),y.quadraticCurveTo(137,149,121,149),y.closePath(),y.fillStyle="#f5ce9f",y.strokeStyle="#a57a52",y.lineWidth=5,y.fill(),y.stroke(),y.fillStyle="#99b894",y.fillRect(42,89,25,62),y.strokeStyle="#6d8c6c",y.strokeRect(42,89,25,62),y.beginPath(),y.moveTo(113,102),y.lineTo(147,102),y.moveTo(112,121),y.lineTo(142,121),y.strokeStyle="#c7996d",y.lineWidth=3,y.stroke());const U=new or(I);return U.colorSpace=Wt,V.set(_,U),U}const Z=Array.from({length:5},(_,I)=>{const y=new e_(new jf({map:J(I===4?"thumbs-up":"hearts"),transparent:!0,depthWrite:!1,toneMapped:!1}));return y.name=`customer_reaction_${I}`,y.visible=!1,w.add(y),y}),k=new $t;k.name="offered_payment",k.visible=!1,gt.add(k);const de=new $t;de.name="accepted_payment_handover",de.visible=!1,gt.add(de);const we=new $t;we.name="change_tray_money",we.position.copy(d).add(new C(0,.018,0)),gt.add(we);const Se=new $t;Se.name="customer_change",Se.visible=!1,gt.add(Se);const De=new C(.061,-.015,.044),Ke=new $t;Ke.name="cashier_change_tray",Ke.position.copy(d);const et=new $n(1,1,1),We=new tn({color:c?13209200:2381132,roughness:c?.9:.7}),pt=new tn({color:c?15916218:1588534,roughness:.95});for(const[_,I,y]of[[[.44,.018,.21],[0,0,0],We],[[.418,.002,.188],[0,.01,0],pt],[[.44,.023,.011],[0,.018,-.0995],We],[[.44,.023,.011],[0,.018,.0995],We],[[.011,.023,.188],[-.2145,.018,0],We],[[.011,.023,.188],[.2145,.018,0],We]]){const U=new Ct(et,y);U.scale.set(..._),U.position.set(...I),U.castShadow=!0,U.receiveShadow=!0,Ke.add(U)}gt.add(Ke);const Ye=new $t;Ye.name="takeaway_bag",Ye.position.copy(el);const Ot=new $t;Ot.name="packed_food",Ye.add(Ot);const bt=new tn({color:13211745,roughness:.97}),Tt=new tn({color:10384204,roughness:.95}),Je=new $n(1,1,1);for(const[_,I,y]of[[[.44,.014,.27],[0,.007,0],bt],[[.44,.3,.008],[0,.15,.135],bt],[[.44,.3,.008],[0,.15,-.135],bt],[[.008,.3,.27],[-.22,.15,0],bt],[[.008,.3,.27],[.22,.15,0],bt],[[.448,.016,.014],[0,.296,.135],Tt],[[.448,.016,.014],[0,.296,-.135],Tt]]){const U=new Ct(Je,y);U.scale.set(..._),U.position.set(...I),U.castShadow=!0,U.receiveShadow=!0,Ye.add(U)}for(const _ of[-.1,.1]){const I=new jl([new C(-.09,.285,_),new C(-.065,.41,_),new C(.065,.41,_),new C(.09,.285,_)]),y=new Ct(new Ho(I,20,.009,6,!1),Tt);y.castShadow=!0,Ye.add(y)}const Dt=document.createElement("canvas");Dt.width=384,Dt.height=192;const yt=new or(Dt);yt.colorSpace=Wt;const vn=new Ct(new Aa(.285,.1425),new qn({map:yt,toneMapped:!1}));vn.position.set(0,.16,.141),Ye.add(vn),gt.add(Ye);const Ti=new C(.08,-.38,-.125);function hn(){const _=Dt.getContext("2d");_.fillStyle="#f8e9ca",_.fillRect(0,0,384,192),_.fillStyle="#755239",_.textAlign="center",_.font="bold 40px Arial",_.fillText("SUNNY BITES",192,72),_.font="32px Arial",_.fillText(Mt.size?`${Mt.size} ${Mt.size===1?"item":"items"} packed`:"Made with care",192,130),yt.needsUpdate=!0}function _s(){Me.delete("bag-handover"),Mt.clear(),Ot.clear(),gt.add(Ye),Ye.position.copy(el),Ye.quaternion.identity(),Ye.visible=!0,Ze="counter",hn()}function Ft(_){if(!_||Mt.has(_.lineId))return;const I=Mt.size;Ot.add(_.visual),_.visual.position.set(I%2?.1:-.1,.18+Math.floor(I/2)*.035,I<2?.035:-.045),_.visual.scale.setScalar(.55),_.visual.rotation.y=I%2?.12:-.12,_.group.visible=!1,Mt.set(_.lineId,_.productId),hn()}function fn(){const _=be.get(ee%5);_!=null&&_.hand&&(_.hand.add(Ye),Ye.position.copy(Ti),Ye.quaternion.identity()),Ye.visible=!0,Ze="held",Et()}function Pn(){for(const U of ot.values())ue.has(U.lineId)&&(Me.delete(`item:${U.lineId}`),Ft(U));jn.material.opacity=0,Ze="handover";const _=be.get(ee%5),I=Ye.position.clone(),y=Ye.quaternion.clone();if(ne||document.hidden||f){fn();return}Sn("bag-handover",1450,U=>{var $;const G=pn(Math.max(0,(U*1450-650)/800));gt.updateMatrixWorld(!0);const le=_!=null&&_.hand?_.hand.localToWorld(Ti.clone()):ta;Ye.position.lerpVectors(I,le,G),Ye.position.y+=Math.sin(G*Math.PI)*.16,Ye.quaternion.slerpQuaternions(y,(($=_==null?void 0:_.hand)==null?void 0:$.getWorldQuaternion(new tt))??y,G)},fn)}hn();const an=new $n(.36,.16,.008),Qt=document.createElement("canvas");Qt.width=384,Qt.height=576;const Gt=Qt.getContext("2d");Gt.fillStyle="#fff8e8",Gt.fillRect(0,0,384,576),Gt.fillStyle="#614b3b",Gt.textAlign="center",Gt.font="bold 36px Arial",Gt.fillText(c?"SUNNY BITES":"SUNNY MARKET",192,62),Gt.font="24px Arial",Gt.fillText("YOUR RECEIPT",192,102),Gt.strokeStyle="#c7b99e",Gt.lineWidth=3;for(const _ of[139,206,246,286,326])Gt.beginPath(),Gt.moveTo(37,_),Gt.lineTo(347,_),Gt.stroke();Gt.font="bold 31px Arial",Gt.fillText("ORDER COMPLETE",192,185),Gt.font="bold 47px Arial",Gt.fillText("THANK YOU!",192,411),Gt.font="25px Arial",Gt.fillText("Have a lovely day",192,457);const fi=new or(Qt);fi.colorSpace=Wt;const Vu=new qn({map:fi,toneMapped:!1}),La=new tn({color:16775400,roughness:.95}),Vt=new Ct(new $n(.19,.27,.001),[La,La,La,La,Vu,Vu]);Vt.name="customer_receipt",Vt.visible=!1,Vt.castShadow=!0,gt.add(Vt);const Gu=new C(-.059,-.075,.038),Qo=new qn({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}),Xi=new Ct(new $n(.9,.84,.88),Qo);Xi.name="cash_register_touch_target",Xi.position.copy(Qc).add(new C(0,.34,.03)),gt.add(Xi);const Dr=new tn({color:15196099,roughness:.75});function ec(_){return Dn.find(I=>I.cents===_)??{cents:_,label:$h(_),kind:_>=500?"note":"coin",color:_>=1e4?"#9bb99a":_>=5e3?"#e7c969":"#cbd2d7"}}const Da=document.createElement("canvas");Da.width=1024,Da.height=600;const zs=new or(Da);zs.colorSpace=Wt,zs.flipY=!1;const Na=new qn({map:zs,toneMapped:!1});function Ua(_=Ue){var Ae,Le;const I=ze=>`$${(ze/100).toFixed(2)}`,y=_==null?void 0:_.order,U=(_==null?void 0:_.phase)??ce,G=(_==null?void 0:_.scanned)??[...ue],le=(Ae=y==null?void 0:y.items)==null?void 0:Ae.find(ze=>ze.lineId===G.at(-1));let $="READY TO SERVE",W="WELCOME",he=c?"PLEASE PLACE FOOD ON THE TRAY":"PLEASE PLACE ITEMS ON THE BELT";U==="scan"?($=le?le.name.toUpperCase():"SCANNER READY",W=le?I(le.priceCents):"SCAN ITEM",he=`${G.length} / ${((Le=y==null?void 0:y.items)==null?void 0:Le.length)??0} ITEMS SCANNED`):U==="total"?($="ALL ITEMS SCANNED",W="ENTER TOTAL",he="ADD THE PRICES ON YOUR RECEIPT"):U==="payment"?($="AMOUNT DUE",W=I((y==null?void 0:y.totalCents)??0),he=`CASH OFFERED ${I((y==null?void 0:y.paidCents)??0)}`):U==="drawer"?($="CASH RECEIVED",W=I((y==null?void 0:y.paidCents)??0),he="PRESS OPEN TO RELEASE CASH DRAWER"):U==="change"?($="COUNT THE CHANGE",W="?",he="CHOOSE NOTES AND COINS"):U==="success"?($="TRANSACTION APPROVED",W="THANK YOU",he="CHANGE & RECEIPT • NEXT CUSTOMER"):U==="finished"&&($="SHIFT ENDED",W="TIME’S UP",he="THANK YOU FOR BEING OUR CASHIER");const _e=JSON.stringify([$,W,he,U]);if(_e===je)return;je=_e,N=[$,W,he];const ae=Da.getContext("2d");ae.fillStyle=c?"#fff7e8":"#122624",ae.fillRect(0,0,1024,600),ae.fillStyle=c?"#efd5b5":"#1c3936",ae.fillRect(0,0,1024,85),ae.fillStyle=c?"#74513d":"#8bc6aa",ae.font="600 31px Arial",ae.textAlign="left",ae.fillText(c?"SUNNY BITES  |  HELLO, FRIEND!":"SUNNY  |  CHECKOUT 01",44,54),ae.fillStyle=c?"#8b9f73":"#68d5ae",ae.beginPath(),ae.arc(957,43,9,0,Math.PI*2),ae.fill(),ae.fillStyle=c?"#94745b":"#98b8af",ae.font="600 36px Arial",ae.fillText($,45,160,934),ae.fillStyle=c?"#644938":"#effff4",ae.font=W.length>9?"600 106px Arial":"600 133px Arial",ae.fillText(W,40,327),ae.fillStyle=c?"#e4cbaa":"#28463e",ae.fillRect(44,376,936,2),ae.fillStyle=c?"#84664d":"#b9dace",ae.font="500 29px Arial",ae.fillText(he,45,447),ae.fillStyle=c?"#9b8367":"#85a798",ae.font="25px Arial",ae.fillText(c?"A LITTLE CAFE     AUD PLAY MONEY":"TRAINING MODE     AUD     SECURE TILL",45,554),zs.needsUpdate=!0,lt++,Et()}Ua();function Ip(_){if(In.has(_))return In.get(_);const I=document.createElement("canvas");I.width=768,I.height=336;const y=I.getContext("2d"),U=ec(_).color;y.fillStyle=U,y.fillRect(0,0,I.width,I.height),y.strokeStyle="rgba(255,255,255,.6)",y.lineWidth=8,y.strokeRect(18,18,732,300),y.fillStyle="rgba(255,255,255,.22)",y.beginPath(),y.ellipse(175,174,113,123,0,0,Math.PI*2),y.fill(),y.fillStyle="#254737",y.textAlign="left",y.font="bold 32px Arial",y.fillText("SUNNY MARKET",42,66),y.font="bold 138px Arial",y.fillText($h(_),42,235),y.font="bold 30px Arial",y.fillText("PLAY MONEY · AUD",42,292),y.textAlign="right",y.font="bold 52px Arial",y.fillText("AU",716,88),y.font="62px Arial",y.fillText("✦",713,243);const G=new or(I);G.colorSpace=Wt;const le=new tn({map:G,roughness:.77});return In.set(_,le),le}function tc(_){const I=Ip(_),y=new Ct(an,[Dr,Dr,Dr,Dr,I,I]);return y.castShadow=!0,y.userData.cents=_,y}function Pp(_){if(!gn.has(_)){const U=ec(_),G={200:.04,100:.049,50:.061,20:.056,10:.046,5:.038}[_]??.045,le=new Cu(G,G,.008,_===50?12:40),$=document.createElement("canvas");$.width=$.height=256;const W=$.getContext("2d");W.fillStyle=U.color,W.fillRect(0,0,256,256),W.strokeStyle=_>=100?"#8c712b":"#7e8b90",W.lineWidth=7,W.beginPath(),W.arc(128,128,110,0,Math.PI*2),W.stroke(),W.beginPath(),W.arc(128,128,98,0,Math.PI*2),W.lineWidth=2,W.stroke(),W.fillStyle=_>=100?"#53431a":"#354449",W.textAlign="center",W.font="bold 82px Arial",W.fillText(U.label,128,150),W.font="bold 24px Arial",W.fillText("AU · PLAY",128,188);const he=new or($);he.colorSpace=Wt;const _e=new tn({map:he,roughness:.65,metalness:.12}),ae=new tn({color:U.color,roughness:.42,metalness:.5});gn.set(_,{geometry:le,face:_e,edge:ae,radius:G})}const I=gn.get(_),y=new Ct(I.geometry,[I.edge,I.face,I.face]);return y.castShadow=!0,y.userData.cents=_,y}function Oa(){we.clear(),qe=[]}function nc(){Me.delete("change-handover"),gt.add(Se),Se.clear(),Se.visible=!1,Se.position.set(0,0,0),Se.quaternion.identity(),Se.scale.setScalar(1),ve="none",xe=null,Pe=[]}function ic(){if(!Pe.length)return;const _=be.get(ee%5);_!=null&&_.freeHand&&(_.freeHand.add(Se),Se.position.copy(De),Se.quaternion.identity()),Se.visible=!0,ve="held",Et()}function Wu(_=!1){if(nc(),!qe.length)return;xe=Y,ve="handover";const I=be.get(ee%5);Np(I,_||ne||document.hidden||f),gt.add(Se),Se.position.copy(we.position),Se.visible=!0;const y=[],U=Se.position.clone();let G=0,le=0;for(const{group:W,...he}of qe){const _e=he.kind==="note",ae=_e?G++:le++;Pe.push(he),W.updateMatrix();for(const[Ae,Le]of[...W.children].entries()){const ze=Le.position.clone().applyMatrix4(W.matrix);Se.add(Le),Le.position.copy(ze),y.push({mesh:Le,fromPosition:ze,fromQuaternion:Le.quaternion.clone(),fromScale:Le.scale.clone(),position:_e?new C(-.005+ae*.011+Ae*.003,.025+ae*.006,ae*.003+Ae*.0015):new C(.004+ae%3*.039+Ae*.003,-.044+Math.floor(ae/3)*.043,.02+Ae*.005),quaternion:new tt().setFromEuler(new Xt(_e?0:Math.PI/2,0,_e?(ae-1)*.08:0)),scale:_e?new C(.64,.64,.12):new C(.45,.45,.45)})}}Oa();const $=W=>{var ae;const he=pn(W);gt.updateMatrixWorld(!0);const _e=I!=null&&I.freeHand?I.freeHand.localToWorld(De.clone()):ta.clone().add(new C(.5,0,0));Se.position.lerpVectors(U,_e,he),Se.position.y+=Math.sin(he*Math.PI)*.22,Se.quaternion.slerpQuaternions(new tt,((ae=I==null?void 0:I.freeHand)==null?void 0:ae.getWorldQuaternion(new tt))??new tt,he);for(const Ae of y)Ae.mesh.position.lerpVectors(Ae.fromPosition,Ae.position,he),Ae.mesh.quaternion.slerpQuaternions(Ae.fromQuaternion,Ae.quaternion,he),Ae.mesh.scale.lerpVectors(Ae.fromScale,Ae.scale,he)};_||ne||document.hidden||f?($(1),ic()):Sn("change-handover",1100,$,ic)}const jn=new Ct(new Pu(.1,.15,32),new qn({color:8711363,transparent:!0,opacity:0,depthWrite:!1,side:ti}));jn.rotation.x=-Math.PI/2,jn.position.copy(ea).add(new C(0,.018,0)),gt.add(jn);const qi=new ep(new $n(.009,.004,.69),new tn({color:6648947,roughness:.95}),17);qi.name="moving_conveyor_seams";const Nr=new zt;qi.receiveShadow=!0,qi.visible=!1,gt.add(qi);function sc(_=0){for(let I=0;I<17;I++)Nr.position.set(-2.95+(I*.155+_*.15)%2.635,1.029,-.1),Nr.rotation.set(0,0,0),Nr.scale.setScalar(1),Nr.updateMatrix(),qi.setMatrixAt(I,Nr.matrix);qi.instanceMatrix.needsUpdate=!0}sc();const Ur=new rv,$u=new He,Lp=new os(new C(0,1,0),-1.09),rc=new C;function Et(){!h&&!f&&!m&&(m=requestAnimationFrame(Dp))}function Sn(_,I,y,U,G=0){if(Me.delete(_),ne||f){y(1),U==null||U();return}Me.set(_,{start:performance.now()+G,duration:I,update:y,complete:U}),Et()}function Fa(_,I,y,U=700,G=0,le){const $=I.position.clone();Sn(_,U,W=>{I.position.lerpVectors($,y,pn(W)),I.position.y+=Math.sin(W*Math.PI)*G},le)}function Dp(_){var G;if(m=0,h||f)return;const I=me&&!ne&&!document.hidden;if(_-p<30&&(Me.size||I||l.hasBelt&&(ce==="scan"||ce==="unload")&&!ne)){Et();return}p=_;for(const[le,$]of[...Me]){if(_<$.start)continue;const W=Math.min(1,(_-$.start)/$.duration);$.update(W),W===1&&Me.get(le)===$&&(Me.delete(le),(G=$.complete)==null||G.call($))}const y=l.hasBelt&&g&&!ne&&(ce==="unload"||ce==="scan"&&[...ot.values()].some(le=>le.group.visible));y&&sc(_/1e3);const U=be.get(ee%5);I&&Yi(U,ac(_)),U!=null&&U.arm&&ce==="unload"&&!ne&&U.arm.quaternion.copy(U.armRest).multiply(new tt().setFromAxisAngle(new C(1,0,0),-.5-Math.sin(_/220)*.38)),u.render(gt,Zt),E++,(Me.size||y||I)&&Et()}function vs(){if(h)return;const _=Math.max(1,i.clientWidth),I=Math.max(1,i.clientHeight),y=_/I;u.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),u.setSize(_,I,!1),Zt.aspect=y,y<.92?(Zt.fov=71,Zt.position.set(-.22,2,3.35),Zt.lookAt(-.6,1.05,-.7)):(Zt.fov=60,Zt.position.set(0,1.9,2.65),Zt.lookAt(-.15,1.1,-.55)),Zt.updateProjectionMatrix(),Zt.updateMatrixWorld(),Et()}function Or(_,I,y=420,U=0){var he;if(!(_!=null&&_.arm))return;const G=_.arm.quaternion.clone(),le=_.armRest.clone().multiply(new tt().setFromAxisAngle(new C(1,0,0),I)),$=(he=_.hand)==null?void 0:he.quaternion.clone(),W=_.handRest.clone().multiply(new tt().setFromAxisAngle(new C(1,0,0),U));Sn(`arm:${_.index}`,y,_e=>{const ae=pn(_e);_.arm.quaternion.slerpQuaternions(G,le,ae),_.hand&&_.hand.quaternion.slerpQuaternions($,W,ae)})}function Np(_,I=!1){var he;if(!(_!=null&&_.freeArm)||!_.freeHand)return;const y=_.freeArm.quaternion.clone(),U=_.freeHand.quaternion.clone(),G=(he=_.freeForearm)==null?void 0:he.quaternion.clone(),le=_.freeArmRest.clone().multiply(new tt().setFromAxisAngle(new C(1,0,0),-1.15)),$=_.freeHandRest.clone().multiply(new tt().setFromAxisAngle(new C(1,0,0),1.15)),W=_e=>{_.freeArm.quaternion.slerpQuaternions(y,le,pn(_e)),_.freeHand.quaternion.slerpQuaternions(U,$,pn(_e)),_.freeForearm&&_.freeForearm.quaternion.slerpQuaternions(G,_.freeForearmRest,pn(_e))};I?W(1):Sn(`change-arm:${_.index}`,520,W)}function Up(_){const I=_.head??_.rig,y=new $t;y.name=`expression_${_.index}`,_.head&&(y.position.y=-_.head.position.y),I.add(y);const U=new tn({color:c?4796449:3419175,roughness:.9}),G=new Ru(c?.007:.0035,c?.065:.027,3,8),le=[-1,1].map(ct=>{const dt=new Ct(G,U);return dt.position.set(ct*(c?.112:.043),c?1.786:1.681,c?_.index===3?.332:.3:.113),dt.rotation.z=Math.PI/2,y.add(dt),dt}),$=new Ct(new dn,U);y.add($);const W=_.index===3?1.596:1.563,he=_.index===3?.409:.376,_e=new $t;_e.name=`talking_mouth_${_.index}`,_e.position.set(0,W-.017,he),_e.visible=!1,y.add(_e);const ae=new Ct(new la(1,18,12),new tn({color:5319466,roughness:.95}));ae.scale.set(_.index===3?.029:.043,.027,.006),_e.add(ae);const Ae=new Ct(new la(1,16,10),new tn({color:15507362,roughness:.92}));Ae.position.set(0,-.015,.005),Ae.scale.set(_.index===3?.017:.026,.01,.003),_e.add(Ae);const Le=new Ct(new Lu(1,.28,8,18),new tn({color:13862018,roughness:.9}));Le.name=`kiss_mouth_${_.index}`,Le.position.set(0,W-.009,he+.006),Le.scale.set(.015,.018,.006),Le.visible=!1,y.add(Le),_.rig.updateWorldMatrix(!0,!0);const ze=_.rig.matrixWorld.clone().invert();_.rig.traverse(ct=>{var Hr,Ge,en,pi;if(!ct.isMesh||ct===$||le.includes(ct)||ct===ae||ct===Ae||ct===Le)return;if(!c&&((Ge=(Hr=ct.material)==null?void 0:Hr.name)!=null&&Ge.includes("Produce pine"))){ct.visible=!1;return}if(!c||((en=ct.material)==null?void 0:en.name)!=="Cozy / ink")return;const dt=ct.geometry.clone(),Nt=dt.attributes.position,Rt=((pi=dt.index)==null?void 0:pi.array)??Array.from({length:Nt.count},(Ln,Vs)=>Vs),On=new rt().multiplyMatrices(ze,ct.matrixWorld),Fn=[],Vn=new C,wi=new C,Zi=new C;for(let Ln=0;Ln<Rt.length;Ln+=3)Vn.fromBufferAttribute(Nt,Rt[Ln]),wi.fromBufferAttribute(Nt,Rt[Ln+1]),Zi.fromBufferAttribute(Nt,Rt[Ln+2]),Vn.add(wi).add(Zi).multiplyScalar(1/3).applyMatrix4(On),(Vn.y>=1.595||Math.abs(Vn.x)>.07)&&Fn.push(Rt[Ln],Rt[Ln+1],Rt[Ln+2]);dt.setIndex(Fn),ct.geometry=dt});const At=[];if(c){let ct;const dt=`Cozy / fur_${l.customerKinds[_.index]}`;_.rig.traverse(Nt=>{var Rt;((Rt=Nt.material)==null?void 0:Rt.name)===dt&&(ct=Nt.material)}),(_.index===2||_.index===3)&&(ct=new tn({color:_.index===2?16769463:16773855,roughness:.98}));for(const Nt of[-1,1]){const Rt=new Ct(new la(1,14,10),ct??new tn({color:13283468}));Rt.position.set(Nt*.112,1.73,_.index===3?.351:.312),Rt.scale.set(.026,.035,.009),Rt.visible=!1,y.add(Rt),At.push(Rt)}}return{group:y,brows:le,mouth:$,talkingMouth:_e,pucker:Le,lids:At,mood:null,smile:0,eyeClosure:0,mouthOpenness:0,facialPose:"emotion",reactionPose:null}}function Fr(_,I){if(_.expression){_.expression.currentEyeClosure=I;for(const y of _.expression.lids)y.visible=I>.1,y.scale.y=.035*I,y.position.y=1.765-.035*I}}function kr(_,I){if(!(_!=null&&_.expression))return;const y=_.index===ee%5?q.direction:null,U=y?y==="too-high"?"total-high":"total-low":I,G=_.expression,le=Pb[y]??il[I]??il.happy;if(G.mood!==U){G.mood=U,G.smile=le.smile;const _e=c?_.index===3?.052:.073:.03,ae=c?_.index===3?1.596:1.563:1.566,Ae=c?_.index===3?.404:.37:.115,Le=Array.from({length:17},(At,ct)=>{const dt=ct/8-1;return new C(dt*_e,ae+le.smile*(dt*dt-1)*(_.index===3&&c?.46:c?1:.45),Ae-Math.abs(dt)*(c?.012:.003))}),ze=new Ho(new jl(Le),24,c?.005:.0026,6,!1);G.mouth.geometry.dispose(),G.mouth.geometry=ze}G.brows.forEach((_e,ae)=>{const Ae=ae?1:-1;_e.position.y=(c?1.786:1.681)+le.lift*(c?1:.5)+(c&&_.index===2&&ae===0?.014:0),_e.rotation.z=Math.PI/2-Ae*le.brow*(c&&_.index===2&&ae===0?1.55:1)});const $={calm:0,happy:0,restless:.3,impatient:.65,exhausted:1,relieved:.12,tired:.8}[I]??0,W=I==="happy"||I==="relieved",he=c?[[$*.14-(W?.028:0),0,0],[$*.04,0,$*.04],[$*.035,$*.055,W?-.06:.06+$*.09],[$*.09-(W?.045:0),0,-$*.025],[$*.035,-$*.035,W?.045:-$*.08]][_.index]:[$*.07,0,0];_.headRest.copy(_.headNeutral).multiply(new tt().setFromEuler(new Xt(...he))),_.head&&!Me.has(`animal:${_.index}`)&&!Me.has("wrong-change")&&!Me.has("wrong-total")&&_.head.quaternion.copy(_.headRest),_.ears.forEach((_e,ae)=>{const Ae=ae?1:-1,Le=_.index===1?$*.74-(W?.07:0):_.index===4?$*.34:$*.1;_e.rest.copy(_e.neutral).multiply(new tt().setFromEuler(new Xt($*(_.index===1?.18:.06),0,Ae*Le))),Me.has(`animal:${_.index}`)||_e.object.quaternion.copy(_e.rest)}),G.eyeClosure=_.index===4&&c?$*.86:0,Fr(_,G.eyeClosure),y&&(G.reactionPose=y==="too-high"?"surprised":"concerned"),Yi(_,me&&_.index===ee%5?G.mouthOpenness||.45:0);for(const _e of _.bodyRestScales)_e.object.scale.copy(_e.scale).multiply(new C(1+$*.004,1-$*(_.index===0?.017:.01),1))}function Yi(_,I){if(!(_!=null&&_.expression))return;const y=_.expression,U=me&&_.index===ee%5;y.mouthOpenness=U?as.clamp(I,.12,1):0,y.pucker.visible=y.reactionPose==="kiss"&&(!U||y.mouthOpenness<.3),y.talkingMouth.visible=U&&!y.pucker.visible,y.talkingMouth.scale.y=.3+y.mouthOpenness*.78,y.talkingMouth.scale.x=.85+y.mouthOpenness*.15,y.mouth.visible=!U&&!y.pucker.visible,y.facialPose=y.pucker.visible?"kiss":U?"talking":y.reactionPose??"emotion"}function ac(_){const I=_-Ve,y=(Math.sin(I*.024)+Math.sin(I*.041+.7)*.35+1.35)/2.7,U=st?Math.max(0,1-(_-st)/150)*.22:0;return as.clamp(.13+y*.72+U,.12,1)}function ys(_={}){if(h)return;const I=!!_.active&&!f&&!document.hidden&&Y&&ce!=="finished";if(!(I&&l.customerKinds.includes(_.character)&&_.character!==l.customerKinds[ee%5])){if(!I){me=!1,clearTimeout(ft),ft=null;for(const y of be.values())Yi(y,0);Et();return}me||(Ve=performance.now(),st=0,_t=0,St=0,clearTimeout(ft),ft=setTimeout(()=>ys({active:!1}),15e3)),me=!0,Number.isFinite(_.boundary)&&_.boundary>St&&(St=_.boundary,st=performance.now(),_t++),Yi(be.get(ee%5),ne?.45:ac(performance.now())),Et()}}function Ei(_="none"){clearTimeout(j),j=null,Me.delete("customer-reaction");for(const I of Z)I.visible=!1;for(const I of be.values())I.expression&&(I.expression.reactionPose=I.index===ee%5&&q.direction?q.direction==="too-high"?"surprised":"concerned":null,I.expression.mouth.scale.set(1,1,1),I.expression.mouth.position.set(0,0,0),Fr(I,I.expression.eyeClosure),Yi(I,I.expression.mouthOpenness));se.status=_,_==="none"&&(se={kind:null,status:_,symbolKinds:[],startedAt:0})}function Xu(_=pe==="tired"||pe==="exhausted"?"smile":Db[ee%5],I=0){if(h||!Y||!["smile","kiss","hearts","thumbs-up"].includes(_))return;Ei();const y=be.get(ee%5);if(!(y!=null&&y.expression)||!y.group.visible)return;if(document.hidden||f){se.status="complete";return}const U=ne,G=_==="kiss"||_==="hearts"?["hearts"]:_==="thumbs-up"?["thumbs-up"]:[];se={kind:_,status:U?"static":"playing",symbolKinds:G,startedAt:performance.now()};const le=G.length?Z.filter((he,_e)=>G[0]==="thumbs-up"?_e===4:_e<3):[],$=new C;U?(y.expression.reactionPose=_==="kiss"?"kiss":"smile",Yi(y,y.expression.mouthOpenness),j=setTimeout(()=>{Ei("complete"),Et()},1400),Et()):Sn("customer-reaction",1400,he=>{const _e=Math.sin(Math.PI*he);if(y.expression.reactionPose=_==="kiss"&&he>.12&&he<.65?"kiss":"smile",y.expression.mouth.scale.x=1+_e*(y.index===0?.22:.12),y.expression.mouth.position.y=-_e*.005,!me){const ae=_==="kiss"?_e**2*.95:y.index===2?_e**2*.8:y.index===3?_e*.22:_e*.45;Fr(y,Math.max(y.expression.eyeClosure,ae)),y.index===2&&y.expression.lids[1]&&(y.expression.lids[1].visible=!1)}Yi(y,y.expression.mouthOpenness),y.group.updateWorldMatrix(!0,!1),y.group.localToWorld($.set(0,1.96,.36)),le.forEach((ae,Ae)=>{const Le=as.clamp((he-Ae*.1)/.8,0,1);ae.visible=Le>0&&Le<1,ae.position.copy($).add(new C(G[0]==="thumbs-up"?.25:(Ae-1)*.17+Math.sin(Le*Math.PI)*(Ae%2?.045:-.045),Le*.34,0)),ae.material.opacity=Math.min(1,Le*5,(1-Le)*4),ae.material.rotation=Math.sin(Le*Math.PI*2+Ae)*.14,ae.scale.setScalar((G[0]==="thumbs-up"?.27:.15+Ae*.025)*(.75+Math.sin(Le*Math.PI)*.25))})},()=>Ei("complete"),I),Et()}function ka(_,I=!1){var U;if(h||!Object.hasOwn(il,_))return;const y=be.get(ee%5);pe===_&&((U=y==null?void 0:y.expression)==null?void 0:U.mood)===_||(Un(),pe=_,kr(y,_),!I&&!["success","finished"].includes(ce)&&zr(Object.hasOwn(nl,_)?_:"calm"),_n(),Et())}function Hs(_){var U;if(!_)return;const I=`animal:${_.index}`,y=Me.get(I);y&&(y.update(1),(U=y.complete)==null||U.call(y),Me.delete(I))}function qu(_,I){if(!c||!_)return;Un(),Hs(_),Me.delete(`patience:${_.index}`);const y=I==="greeting"?"greetingStatus":"thanksStatus",U=ne||document.hidden||f;_[y]=U?"static":"playing";const G=_.rigRestPosition.y,le=$=>{const W=Math.sin(Math.PI*$),he=Math.sin($*Math.PI*5)*W;_.rig.position.y=G+W*W*(I==="greeting"?.035:pe==="tired"?.012:pe==="relieved"?.035:.085),I==="greeting"&&_.freeArm&&_.freeArm.quaternion.copy(_.freeArmRest).multiply(new tt().setFromEuler(new Xt(-.95*W,0,.12*W+.1*he))),I==="greeting"&&_.freeForearm&&_.freeForearm.quaternion.copy(_.freeForearmRest).multiply(new tt().setFromAxisAngle(new C(1,0,0),-.85*W)),_.head&&_.head.quaternion.copy(_.headRest).multiply(new tt().setFromEuler(new Xt((I==="thanks"?.18:.05)*W,0,I==="greeting"?.05*he:0)));for(const[_e,ae]of _.ears.entries())ae.object.quaternion.copy(ae.rest).multiply(new tt().setFromAxisAngle(new C(0,0,1),he*(_e?-.16:.16)));if($===1){_.rig.position.copy(_.rigRestPosition),I==="greeting"&&_.freeArm&&_.freeArm.quaternion.copy(_.freeArmRest),I==="greeting"&&_.freeForearm&&_.freeForearm.quaternion.copy(_.freeForearmRest),_.head&&_.head.quaternion.copy(_.headRest);for(const _e of _.ears)_e.object.quaternion.copy(_e.rest)}};U?le(1):Sn(`animal:${_.index}`,I==="greeting"?1e3:740,le,()=>{_[y]="complete"}),Et()}function Ba(_){var ae,Ae,Le,ze;if(h)return;if(Un(),Me.delete("wrong-change"),(ae=ie.restore)==null||ae.call(ie),ie={direction:null,status:"none",restore:null},!_||ce!=="change"){_n(),Et();return}const I=["too-little","under","low"].includes(_)?"too-little":["too-much","over","high"].includes(_)?"too-much":null,y=be.get(ee%5);if(!I||!y)return;Hs(y);const U=Me.get(`patience:${y.index}`);U==null||U.update(1),Me.delete(`patience:${y.index}`);const G=(Ae=y.head)==null?void 0:Ae.quaternion.clone(),le=(Le=y.freeArm)==null?void 0:Le.quaternion.clone(),$=(ze=y.freeForearm)==null?void 0:ze.quaternion.clone(),W=()=>{G&&y.head.quaternion.copy(G),le&&y.freeArm.quaternion.copy(le),$&&y.freeForearm.quaternion.copy($)},he=ne||document.hidden||f;ie={direction:I,status:he?"static":"playing",restore:W};const _e=At=>{const ct=Math.sin(Math.PI*At);G&&y.head.quaternion.copy(G).multiply(new tt().setFromEuler(new Xt(0,Math.sin(At*Math.PI*6)*ct*.13,0))),le&&y.freeArm.quaternion.copy(le).multiply(new tt().setFromEuler(new Xt(-.34*ct,0,.12*ct))),$&&y.freeForearm.quaternion.copy($).multiply(new tt().setFromAxisAngle(new C(1,0,0),-.35*ct)),At===1&&W()};he?_e(.5):Sn("wrong-change",1e3,_e,()=>{ie.status="complete"}),_n(),Et()}function Br(_){var ae,Ae,Le,ze;if(h)return;const I=["too-high","too-low"].includes(_)?_:null;if(!q.direction&&(!I||ce!=="total"))return;Un(),Me.delete("wrong-total"),(ae=q.restore)==null||ae.call(q),q={direction:null,status:"none",restore:null};const y=be.get(ee%5);if(y!=null&&y.expression&&(y.expression.reactionPose=null),kr(y,pe),!I||ce!=="total"||!y){_n(),Et();return}Ei(),Hs(y);const U=Me.get(`patience:${y.index}`);U==null||U.update(1),Me.delete(`patience:${y.index}`),q.direction=I,kr(y,pe);const G=(Ae=y.head)==null?void 0:Ae.quaternion.clone(),le=(Le=y.freeArm)==null?void 0:Le.quaternion.clone(),$=(ze=y.freeForearm)==null?void 0:ze.quaternion.clone(),W=()=>{G&&y.head.quaternion.copy(y.headRest),le&&y.freeArm.quaternion.copy(le),$&&y.freeForearm.quaternion.copy($)},he=ne||document.hidden||f;q={direction:I,status:he?"static":"playing",restore:he?null:W},he||Sn("wrong-total",1e3,At=>{const ct=Math.sin(Math.PI*At);G&&y.head.quaternion.copy(G).multiply(new tt().setFromEuler(new Xt(0,Math.sin(At*Math.PI*6)*ct*.13,(I==="too-low"?.055:-.035)*ct))),le&&y.freeArm.quaternion.copy(le).multiply(new tt().setFromEuler(new Xt(-.34*ct,0,.12*ct))),$&&y.freeForearm.quaternion.copy($).multiply(new tt().setFromAxisAngle(new C(1,0,0),-.35*ct)),At===1&&W()},()=>{q.status="complete",q.restore=null}),_n(),Et()}function zr(_,I=!1){var Le;if(h)return;const y=Object.hasOwn(nl,_)&&!["success","finished"].includes(ce)?_:"calm";if(["success","finished"].includes(ce)||ka(y==="calm"?"happy":y,!0),y===Fe)return;Ba(null);const U=Me.get("wrong-total");U==null||U.update(1),(Le=U==null?void 0:U.complete)==null||Le.call(U),Me.delete("wrong-total"),Fe=y;const G=be.get(ee%5);if(!(G!=null&&G.freeArm)||!G.freeForearm)return;Hs(G);const le=nl[y],$=ze=>({arm:G.freeArmRest.clone().multiply(new tt().setFromEuler(new Xt(ze[0]*(c&&G.index===3?.72:1),0,ze[1]+(c&&G.index===3?Math.abs(ze[0])*.9:c&&G.index===2?ze[1]:0)))),forearm:G.freeForearmRest.clone().multiply(new tt().setFromAxisAngle(new C(1,0,0),ze[2]*(c&&G.index===4?.55:1)))}),W={arm:G.freeArm.quaternion.clone(),forearm:G.freeForearm.quaternion.clone()},he=$(le.peak),_e=$(le.settled),ae=`patience:${G.index}`,Ae=(ze,At,ct)=>{G.freeArm.quaternion.slerpQuaternions(ze.arm,At.arm,ct),G.freeForearm.quaternion.slerpQuaternions(ze.forearm,At.forearm,ct)};Me.delete(ae),I||ne||document.hidden||f?Ae(_e,_e,1):Sn(ae,le.duration,ze=>{y==="calm"?Ae(W,_e,pn(ze)):ze<.42?Ae(W,he,pn(ze/.42)):ze<.6?Ae(he,he,1):Ae(he,_e,pn((ze-.6)/.4))}),Et()}function Yu(){var _;if(!document.hidden){_n();return}ys({active:!1}),Ei("complete"),Un();for(const[I,y]of Me)!I.startsWith("patience:")&&!I.startsWith("animal:")&&I!=="wrong-change"&&I!=="wrong-total"||(y.update(1),(_=y.complete)==null||_.call(y),Me.delete(I))}function Op(_,I){Un(),ys({active:!1}),Ei(),Ee=null,Oe=!1;const y=new Map;y.set(_%5,Ab);for(let U=1;U<=2;U++)y.set((_+U)%5,Rb[U-1]);for(const[U,G]of be){Me.delete(`person:${U}`),Me.delete(`depart:${U}`),Me.delete(`patience:${U}`),Me.delete(`arm:${U}`),Me.delete(`change-arm:${U}`),Hs(G),G.greetingStatus="none",G.thanksStatus="none",kr(G,"happy"),G.rig.position.copy(G.rigRestPosition),G.freeArm&&G.freeArm.quaternion.copy(G.freeArmRest),G.freeForearm&&G.freeForearm.quaternion.copy(G.freeForearmRest),G.group.rotation.set(0,0,0);const le=y.get(U);if(!le){G.group.visible=!1;continue}const $=G.group.visible;G.group.visible=!0,I&&$?Fa(`person:${U}`,G.group,le,900,0):G.group.position.copy(le),G.arm&&G.arm.quaternion.copy(G.armRest),G.hand&&G.hand.quaternion.copy(G.handRest),G.freeHand&&G.freeHand.quaternion.copy(G.freeHandRest)}}function Fp(_=1850){if(Ee===ee)return;Ee=ee;const I=be.get(ee%5);if(!I)return;if(ne||document.hidden||f){I.group.visible=!1,F="departed",Ze="departed",xe&&(ve="departed");return}const y=I.group.position.clone(),U=I.group.rotation.y,G=tl.clone().sub(y).setY(0).normalize(),le=Math.atan2(G.x,G.z);Sn(`depart:${I.index}`,_,$=>{const W=Math.max(0,($-.2)/.8);Oe=W>0,I.group.rotation.y=as.lerp(U,le,pn(Math.min(1,$/.2))),I.group.position.lerpVectors(y,tl,pn(W)),W>0&&(I.group.position.y+=Math.sin(W*Math.PI*10)*.012)},()=>{I.group.visible=!1,F="departed",Ze="departed",xe&&(ve="departed")})}function oc(){clearTimeout(Q),Q=null,Me.delete("receipt-handover"),gt.add(Vt),Vt.visible=!1,Vt.position.set(0,0,0),Vt.quaternion.identity(),M&&(M.visible=!1,M.position.copy(D)),F="none",H=null,te=null,K=0}function za(){const _=be.get(ee%5);M&&(M.visible=!1),_!=null&&_.hand?(_.hand.add(Vt),Vt.position.copy(Gu),Vt.quaternion.identity(),H="customer"):(gt.add(Vt),Vt.position.copy(ta),H="cashier"),Vt.visible=!0,F="held",Et()}function Ku(_=1550,I=1850){clearTimeout(Q);const y=Y;Q=setTimeout(()=>{var U;if(Q=null,!(h||ce!=="success"||Y!==y||te!==y)){for(const G of["receipt-handover","change-handover","bag-handover"])(U=Me.get(G))==null||U.update(1),Me.delete(G);za(),ic(),fn(),Fp(I),Et()}},Math.max(0,_))}function kp(){oc(),te=Y,K=performance.now(),F="printing",H="printer";const _=be.get(ee%5),I=ne||document.hidden||f;Or(_,-1.15,520,1.15),M&&(M.visible=!0,M.position.copy(D)),gt.updateMatrixWorld(!0);const y=M?new Hn().setFromObject(M).getCenter(new C):Qc.clone().add(new C(-.245,.34,.139)),U=new tt().setFromEuler(new Xt(-.16,0,-.07));I?za():Sn("receipt-handover",1450,G=>{const le=G*1450;if(le<650){M&&M.position.copy(D).add(new C(0,-.055*(1-le/650),0));return}M&&(M.visible=!1),Vt.visible=!0,F="handover",H="cashier";const $=pn((le-650)/800);gt.updateMatrixWorld(!0);const W=_!=null&&_.hand?_.hand.localToWorld(Gu.clone()):ta,he=_!=null&&_.hand?_.hand.getWorldQuaternion(new tt):new tt;Vt.position.lerpVectors(y,W,$),Vt.position.y+=Math.sin($*Math.PI)*.2,Vt.quaternion.slerpQuaternions(U,he,$)},za),Ku()}function ju(){for(const _ of ot.values())ks.remove(_.group),_.hit.geometry.dispose();ot.clear();for(const _ of[...Me.keys()])(_.startsWith("item:")||_.startsWith("unload:"))&&Me.delete(_);B=null,oe=null,Bt.style.cursor="default"}function Ha(){if(!(Re||h||ce!=="unload")){Re=!0,it=!1,clearTimeout(ke),ke=null;for(const _ of ot.values())Me.delete(`unload:${_.lineId}`),_.group.position.copy(_.home),_.group.visible=!ue.has(_.lineId);Or(be.get(ee%5),0),Et(),r==null||r()}}function Bp(){clearTimeout(ke),ke=null,it=!1;for(const _ of ot.values())Me.delete(`unload:${_.lineId}`),_.group.position.copy(_.home),_.group.visible=!ue.has(_.lineId);Or(be.get(ee%5),0)}function Va(_,I,y,U,G,le=!0){clearTimeout(ke),ke=null,oc(),nc(),_s(),Ba(null),Br(null),Me.delete("change-handover"),Y=_,Fe="calm",pe="happy",ee=Number.isInteger(y)?y:0,ue=new Set(I),Re=!1,it=U,Ce="",k.visible=!1,gt.add(k),de.visible=!1,de.clear(),Me.delete("accepted-payment"),Oa(),ju(),Op(ee,G);const $=Array.isArray(_)?_:(_==null?void 0:_.items)??[];$.forEach((W,he)=>{const _e=Be.get(W.productId??W.product??W.type);if(!_e)return;const ae=W.lineId??W.id??String(he),Ae=_e.clone(!0);Ae.position.set(0,0,0),Ae.updateMatrixWorld(!0);const Le=new Hn().setFromObject(Ae),ze=Le.getCenter(new C);Ae.position.sub(new C(ze.x,Le.min.y,ze.z));const At=new $t;At.add(Ae);const ct={apple:.44,orange:.44,milk:.46,bread:.55,bananas:.55,eggs:.55};At.scale.setScalar(c?1:ct[W.productId]??.5);const dt=new $t;dt.name=`order_${ae}`,dt.userData.lineId=ae,dt.add(At);const Nt=Le.getSize(new C).multiplyScalar(At.scale.x),Rt=new Ct(new $n(Nt.x+.055,Nt.y+.04,Nt.z+.055),Qo);Rt.position.y=Nt.y/2,Rt.name=`touch_target_${ae}`,dt.add(Rt);const On=new C(-.64-he*.5,1.038,-.08+he%2*.1);if(dt.rotation.y=he%2?.1:-.12,dt.position.copy(On),dt.visible=!ue.has(ae),ks.add(dt),ot.set(ae,{lineId:ae,productId:W.productId,group:dt,visual:At,home:On,hit:Rt}),ue.has(ae)&&Ft(ot.get(ae)),U&&!ue.has(ae)&&!ne&&!f&&g){dt.visible=!1;const Fn=new C(-.4,1.15,-.67),Vn=c?On.clone():On.clone().add(new C(-.38,0,0));Sn(`unload:${ae}`,1e3,wi=>{if(dt.visible=!0,wi<.56){const Zi=pn(wi/.56);dt.position.lerpVectors(Fn,Vn,Zi),dt.position.y+=Math.sin(Zi*Math.PI)*.38}else dt.position.lerpVectors(Vn,On,pn((wi-.56)/.44))},void 0,he*220)}}),U&&(le&&qu(be.get(ee%5),"greeting"),ne||!g||f||v?queueMicrotask(Ha):ke=setTimeout(Ha,Math.max(0,$.length-1)*220+1080)),Et()}function zp(_,I=[],y=0){ce="scan",Va(_,I,y,!1,Y!==null&&y>ee),Ga(_),Ua({order:_,scanned:I,phase:ce})}function Ju(_=[]){const I=new Set(_);if([...ue].some(y=>!I.has(y))){Va(Y,_,ee,!1,!1);return}for(const[y,U]of ot){if(!I.has(y)||ue.has(y))continue;B===y&&$a(null),Me.delete(`unload:${y}`);const G=U.group.position.clone();U.group.scale.setScalar(1),Sn(`item:${y}`,850,le=>{if(le<.52){const $=pn(le/.52);U.group.position.lerpVectors(G,ea,$),U.group.position.y+=Math.sin($*Math.PI)*.14,jn.material.opacity=Math.sin($*Math.PI)*.85}else{const $=pn((le-.52)/.48);U.group.position.lerpVectors(ea,el.clone().add(new C(0,.32,0)),$),U.group.position.y+=Math.sin($*Math.PI)*.38,U.group.scale.setScalar(1-$*.38),jn.material.opacity=0}},()=>{Ft(U),jn.material.opacity=0})}ue=I,Ua({...Ue,order:Y,scanned:_,phase:ce}),Et()}function Hp(){if(!T)return;T.updateWorldMatrix(!0,!0);const _=T.matrixWorld.clone().invert(),I=new C,y=new C,U=new C;T.traverse(G=>{var ae;if(!G.isMesh||!((ae=G.geometry)!=null&&ae.attributes.position))return;const le=G.geometry,$=le.attributes.position;le.index||le.setIndex(Array.from({length:$.count},(Ae,Le)=>Le));const W=le.index.array.slice(),he=new Uint16Array(W.length/3),_e=new rt().multiplyMatrices(_,G.matrixWorld);for(let Ae=0;Ae<W.length;Ae+=3){I.fromBufferAttribute($,W[Ae]),y.fromBufferAttribute($,W[Ae+1]),U.fromBufferAttribute($,W[Ae+2]),I.add(y).add(U).multiplyScalar(1/3).applyMatrix4(_e);const Le=I.z<.04?Cb:Ib,[ze]=Le.reduce((At,ct)=>Math.abs(I.x-ct[1])<Math.abs(I.x-At[1])?ct:At);he[Ae/3]=ze,re.set(ze,(re.get(ze)??0)+1)}X.push({geometry:le,indices:W,triangleDenominations:he})}),Ht="",Ga()}function Ga(_=Ue??Y){L=ha(_).map(U=>U.cents),S=Yo(_).map(U=>U.cents);const I=L.join(",");if(I===Ht)return;Ht=I;const y=new Set(L);fe.clear();for(const{geometry:U,indices:G,triangleDenominations:le}of X){const $=U.index.array;let W=0;for(let he=0;he<le.length;he++){if(!y.has(le[he]))continue;const _e=he*3;$[W++]=G[_e],$[W++]=G[_e+1],$[W++]=G[_e+2];const ae=le[he];fe.set(ae,(fe.get(ae)??0)+1)}U.index.needsUpdate=!0,U.setDrawRange(0,W)}}function xs(_){if(Ga(),at=_,T&&(T.visible=_),!Qe||!Ne)return;const I=Ne.clone().add(new C(0,0,_?Yt:0));if(Qe.position.distanceToSquared(I)<1e-6){Me.delete("drawer"),Qe.position.copy(I);return}Fa("drawer",Qe,I,470)}function Wa(_=[]){const I=new Map;for(const $ of _)I.set($,(I.get($)??0)+1);const y=[...I].sort(($,W)=>W[0]-$[0]),U=y.map(([$,W])=>`${$}:${W}`).join(",");if(Ce===U&&(!_.length||we.children.length))return;Ce=U,Oa(),we.position.copy(d).add(new C(0,.018,0)),we.scale.setScalar(1);let G=0,le=0;y.forEach(([$,W])=>{const he=ec($),_e=new $t;_e.name=`selected_${$}_x${W}`,he.kind==="note"?(_e.position.set(-.097+G*.009,G*.006,-.025+G*.013),G++):(_e.position.set(.061+le%3*.05,0,-.047+Math.floor(le/3)*.08),le++);const ae=Math.min(W,3);for(let Ae=0;Ae<ae;Ae++){const Le=he.kind==="note"?tc($):Pp($);he.kind==="note"?(Le.rotation.x=-Math.PI/2,Le.scale.set(.4,.4,.09),Le.position.set(Ae*.004,.001+Ae*.0018,Ae*-.004)):(Le.scale.setScalar(.34),Le.position.set(Ae*.002,.0015+Ae*.003,Ae*-.002)),_e.add(Le)}we.add(_e),qe.push({cents:$,count:W,totalCents:$*W,label:he.label,kind:he.kind,color:he.color,representativeCount:ae,group:_e})})}function Zu(){Hs(be.get(ee%5)),k.clear();const _=tc((Y==null?void 0:Y.paidCents)??1e3);_.userData.action="accept-payment",k.add(_),k.visible=!0,k.scale.set(.28/.36,.12/.16,.001/.008);const I=be.get(ee%5);I!=null&&I.hand?(I.hand.add(k),k.rotation.set(0,0,0),k.position.set(-.104,-.022,.038)):(gt.add(k),k.rotation.set(-.25,.1,-.1),k.position.copy(ta)),Or(I,-1.15,550,1.15)}function Vp(){de.clear(),k.visible&&(de.add(tc((Y==null?void 0:Y.paidCents)??1e3)),k.getWorldPosition(de.position),k.getWorldQuaternion(de.quaternion),k.getWorldScale(de.scale),de.visible=!0,Fa("accepted-payment",de,new C(.65,1.08,.65),550,.14,()=>{de.visible=!1})),k.visible=!1,Or(be.get(ee%5),-.1)}function Gp(_){var le;if(h||!_)return;Ue=_,Ga(_);const I=ce,y=Y!==_.order,U=y&&Y!==null&&_.round>ee;(y||I!==_.phase)&&Un(),ce=_.phase,y?(Va(_.order,_.scanned??[],_.round??0,ce==="unload",U),xs(ce==="change")):(I==="unload"&&ce!=="unload"&&Bp(),Ju(_.scanned??[])),ce==="payment"&&(I!=="payment"||y)&&Zu(),ce==="drawer"&&(I!=="drawer"||y)&&(xs(!1),Vp()),ce==="change"&&(Wa(_.selectedMoney??[]),(I!=="change"||y)&&xs(!0)),ce!=="change"&&ie.direction&&Ba(null);const G=ce==="total"&&["too-high","too-low"].includes((le=_.feedback)==null?void 0:le.totalDirection)?_.feedback.totalDirection:null;if(G!==q.direction&&Br(G),ce==="success"&&(I!=="success"||y)){const $=Fe==="exhausted"?"tired":Fe==="calm"?"happy":"relieved";zr("calm"),ka($),xs(!1),qu(be.get(ee%5),"thanks"),Xu(void 0,650),Wa(_.selectedMoney??[]),Wu(),kp(),Pn()}ce!=="payment"&&(k.visible=!1),["change","success"].includes(ce)||Oa(),!["change"].includes(ce)&&at&&xs(!1),ce==="finished"&&(ys({active:!1}),Ei(),zr("calm"),xs(!1),k.visible=!1,oc(),nc(),Me.delete("bag-handover"),Ye.visible=!1),Ua(_),_n(),Et()}function Wp(){Et()}function Qu(_){const I=Bt.getBoundingClientRect();$u.set((_.clientX-I.left)/I.width*2-1,-((_.clientY-I.top)/I.height)*2+1),Ur.setFromCamera($u,Zt),gt.updateMatrixWorld(!0)}function cc(_){if(!g||f)return null;if(Qu(_),ce==="payment"&&k.visible&&Ur.intersectObject(k,!0).length)return{action:"payment"};if(ce==="drawer"&&Qe&&Ur.intersectObject(Xi,!1).length)return{action:"drawer"};if(ce!=="scan")return null;const I=[...ot.values()].filter(G=>G.group.visible&&!ue.has(G.lineId)).map(G=>G.group),y=Ur.intersectObjects(I,!0)[0];let U=y==null?void 0:y.object;for(;U&&U.userData.lineId===void 0;)U=U.parent;return U?{action:"scan",lineId:U.userData.lineId}:null}function $a(_){if(B===_)return;const I=ot.get(B);I&&!Me.has(`item:${B}`)&&I.group.scale.setScalar(1),B=_,!ne&&ot.has(_)&&ot.get(_).group.scale.setScalar(1.04),Et()}function $p(_){var y;const I=cc(_);oe=I?{...I,x:_.clientX,y:_.clientY,dragging:!1}:null,(oe==null?void 0:oe.action)==="scan"&&((y=Bt.setPointerCapture)==null||y.call(Bt,_.pointerId))}function Xp(_){if((oe==null?void 0:oe.action)==="scan"&&ce==="scan"&&(Math.hypot(_.clientX-oe.x,_.clientY-oe.y)>8&&(oe.dragging=!0),oe.dragging)){Qu(_);const y=ot.get(oe.lineId);y&&Ur.ray.intersectPlane(Lp,rc)&&(y.group.position.set(as.clamp(rc.x,-2.9,1.1),1.085,as.clamp(rc.z,-.5,.6)),jn.material.opacity=y.group.position.distanceTo(ea)<.43?.9:.28,Et());return}const I=cc(_);$a((I==null?void 0:I.lineId)??null),Bt.style.cursor=I?"pointer":"default"}function qp(_){var y;const I=oe;if(oe=null,!!I){if((y=Bt.releasePointerCapture)==null||y.call(Bt,_.pointerId),jn.material.opacity=0,I.action==="scan"&&I.dragging){const U=ot.get(I.lineId);(U==null?void 0:U.group.position.distanceTo(ea))<.43?t==null||t(I.lineId):U&&Fa(`item:${I.lineId}`,U.group,U.home,270)}else if(Math.hypot(_.clientX-I.x,_.clientY-I.y)<10){const U=cc(_);(U==null?void 0:U.action)==="payment"&&I.action==="payment"&&(a==null||a()),(U==null?void 0:U.action)==="drawer"&&I.action==="drawer"&&(o==null||o()),(U==null?void 0:U.action)==="scan"&&U.lineId===I.lineId&&(t==null||t(I.lineId))}Et()}}function Yp(){if(oe!=null&&oe.lineId){const _=ot.get(oe.lineId);_&&!ue.has(_.lineId)&&_.group.position.copy(_.home)}oe=null,jn.material.opacity=0,Et()}function Kp(){oe||$a(null)}function jp(_){_.preventDefault(),f=!0,ys({active:!1}),Ei("complete"),Un(),m&&cancelAnimationFrame(m),m=0,Bt.dataset.ready="false",s==null||s(new Error("The 3D view paused. Cashier controls still work while it reconnects.")),ce==="unload"&&queueMicrotask(Ha)}function Jp(){if(h)return;f=!1,Me.clear();const _=Y,I=[...ue],y=ee,U=ce,G=Fe,le=pe,$=q.direction,W=be.get(y%5),he=W==null?void 0:W.greetingStatus,_e=W==null?void 0:W.thanksStatus,ae=K?performance.now()-K:0,Ae=W==null?void 0:W.group.position.clone(),Le=W==null?void 0:W.group.rotation.clone(),ze=W==null?void 0:W.group.visible,At=te===Y&&F!=="none";_&&Va(_,I,y,U==="unload",!1,!1),W&&(W.greetingStatus=he==="playing"?"complete":he,W.thanksStatus=_e==="playing"?"complete":_e),ce=U,zr(G,!0),ka(le,!0),ce==="total"&&$&&Br($),ce==="payment"&&Zu(),ce==="change"&&Wa((Ue==null?void 0:Ue.selectedMoney)??[]),xs(ce==="change"),ce==="success"&&At&&(te=_,K=performance.now()-ae,W!=null&&W.arm&&W.arm.quaternion.copy(W.armRest).multiply(new tt().setFromAxisAngle(new C(1,0,0),-1.15)),W!=null&&W.hand&&W.hand.quaternion.copy(W.handRest).multiply(new tt().setFromAxisAngle(new C(1,0,0),1.15)),za(),fn(),Wa((Ue==null?void 0:Ue.selectedMoney)??[]),Wu(!0),W&&Ae&&(W.group.position.copy(Ae),W.group.rotation.copy(Le),W.group.visible=ze&&ae<3400),!(W!=null&&W.group.visible)||ae>=3400?(F="departed",Ze="departed",xe&&(ve="departed")):Ku(Math.max(0,1550-ae),Math.max(1,3400-Math.max(1550,ae)))),zs.needsUpdate=!0,vs(),Bt.dataset.ready=String(g),g&&!v&&(n==null||n({recovered:!0,...lc()})),_n()}function ed(_){var I;if(ne=_.matches,Un(),ne){for(const y of Me.values())y.update(1),(I=y.complete)==null||I.call(y);Me.clear(),ce==="unload"&&queueMicrotask(Ha),sc(),$a(null)}me&&Yi(be.get(ee%5),ne?.45:ac(performance.now())),Et(),_n()}function Ki(_){gt.updateMatrixWorld(!0);const I=new Hn().setFromObject(_).getCenter(new C).project(Zt),y=Bt.getBoundingClientRect();return{screenX:y.left+(I.x+1)*y.width/2,screenY:y.top+(1-I.y)*y.height/2}}function ji(_){_.updateWorldMatrix(!0,!0);const I=new Hn().setFromObject(_);return{min:I.min.toArray(),max:I.max.toArray()}}function Zp(){if(!Qe||!P)return null;gt.updateMatrixWorld(!0);const _=Bt.getBoundingClientRect(),I=[[-.38,.17,.12],[-.38,.46,-.1],[-.3,.1,.28],[0,.1,.29],[.3,.24,.15]];let y=null;for(const U of I){const G=P.localToWorld(new C(...U)).project(Zt),le=_.left+(G.x+1)*_.width/2,$=_.top+(1-G.y)*_.height/2,W=le>=_.left&&le<=_.right&&$>=_.top&&$<=_.bottom&&document.elementFromPoint(le,$)===Bt,he={screenX:le,screenY:$,blockedByOverlay:!W};if(y??(y=he),W)return he}return y}function Qp(){c&&P.traverse(_=>{if(!_.isMesh)return;for(let y=_;y;y=y.parent)if(y===T)return;const I=y=>{const U=Eb[y.name];if(!U)return y;if(!Te.has(y)){const G=y.clone();G.color.set(U),G.roughness=y.name.includes("spring steel")?.48:.78,G.metalness=y.name.includes("spring steel")?.22:.03,Te.set(y,G),Xe.add(y)}return Te.get(y)};_.material=Array.isArray(_.material)?_.material.map(I):I(_.material)})}function lc(){var $,W,he,_e,ae,Ae,Le,ze,At,ct,dt,Nt,Rt,On,Fn,Vn,wi,Zi,Hr;const _=Vt.visible&&(()=>{for(let Ge=Vt.parent;Ge;Ge=Ge.parent)if(!Ge.visible)return!1;return!0})(),I=Se.visible&&(()=>{for(let Ge=Se.parent;Ge;Ge=Ge.parent)if(!Ge.visible)return!1;return!0})(),y=be.get(ee%5),U=Ye.visible&&(()=>{for(let Ge=Ye.parent;Ge;Ge=Ge.parent)if(!Ge.visible)return!1;return!0})(),G=y?tl.clone().sub(y.group.position).setY(0).normalize():new C,le=(y==null?void 0:y.group.getWorldDirection(new C))??new C(0,0,1);return{status:h?"disposed":f?"context-lost":v?"degraded":g?"ready":"loading",loaded:g,sceneId:e,phase:ce,patienceMood:Fe,viewMode:"first-person",cameraType:Zt.type,cameraPosition:Zt.position.toArray(),theme:{id:l.theme,lighting:c?"soft-golden":"daylight",lcdBackground:c?"#fff7e8":"#122624",registerPalette:Object.fromEntries([...Te].map(([Ge,en])=>[Ge.name,`#${en.color.getHexString()}`])),cashTrayPalette:[We,pt].map(Ge=>`#${Ge.color.getHexString()}`)},triangles:u.info.render.triangles,drawCalls:u.info.render.calls,geometries:u.info.memory.geometries,textures:u.info.memory.textures,renderedFrames:E,renderLoopActive:!!m&&!h&&!f&&!document.hidden,modelSources:l.sources.map(Do),productModels:[...Be.keys()],humanModels:c?0:be.size,customerModels:be.size,customerKinds:[...l.customerKinds],currentCustomerKind:l.customerKinds[ee%5],conveyorVisible:qi.visible,greetingAnimation:{status:(($=be.get(ee%5))==null?void 0:$.greetingStatus)??"none",active:((W=be.get(ee%5))==null?void 0:W.greetingStatus)==="playing"},thankYouAnimation:{status:((he=be.get(ee%5))==null?void 0:he.thanksStatus)??"none",active:((_e=be.get(ee%5))==null?void 0:_e.thanksStatus)==="playing"},register:{loaded:!!(P&&O&&Qe),modelSource:Do(l.sources[3]),position:(P==null?void 0:P.position.toArray())??null,displayLines:[...N],displayRevision:lt,receiptVisible:!!(M!=null&&M.visible||_)},receipt:{status:F,holder:H,visible:!!(M!=null&&M.visible||_),orderId:(te==null?void 0:te.id)??null,attachedToHand:Vt.parent===((ae=be.get(ee%5))==null?void 0:ae.hand),handLocalPosition:Vt.parent===((Ae=be.get(ee%5))==null?void 0:Ae.hand)?Vt.position.toArray():null,worldBounds:_?ji(Vt):M!=null&&M.visible?ji(M):null,..._?Ki(Vt):M!=null&&M.visible?Ki(M):{}},takeawayBag:{status:Ze,holder:Ye.parent===(y==null?void 0:y.hand)?"customer":Ze==="handover"?"cashier":"counter",visible:U,attachedToHand:Ye.parent===(y==null?void 0:y.hand),itemCount:Mt.size,lineIds:[...Mt.keys()],productIds:[...Mt.values()],worldBounds:U?ji(Ye):null,...U?Ki(Ye):{}},departure:{active:Me.has(`depart:${ee%5}`),walking:Oe,position:(y==null?void 0:y.group.position.toArray())??null,facingDirection:le.toArray(),travelDirection:G.toArray(),forwardAlignment:G.lengthSq()?le.dot(G):1},wrongChangeReaction:{direction:ie.direction,status:ie.status,active:Me.has("wrong-change")},wrongTotalReaction:{direction:q.direction,status:q.status,active:Me.has("wrong-total"),facialPose:q.direction==="too-high"?"surprised":q.direction==="too-low"?"concerned":null},changeHandover:{status:ve,holder:ve==="none"?null:Se.parent===(y==null?void 0:y.freeHand)?"customer":"cashier",visible:I,attachedToHand:Se.parent===(y==null?void 0:y.freeHand),orderId:(xe==null?void 0:xe.id)??null,handLocalPosition:Se.parent===(y==null?void 0:y.freeHand)?Se.position.toArray():null,count:Pe.reduce((Ge,en)=>Ge+en.count,0),denominations:Pe.map(({cents:Ge,count:en,representativeCount:pi})=>({cents:Ge,count:en,representativeCount:pi})),worldBounds:I?ji(Se):null,...I?Ki(Se):{}},emotion:{mood:pe,kind:l.customerKinds[ee%5],expressionStyle:c?Lb[ee%5]:"human-brows",mouthCurvature:((Le=y==null?void 0:y.expression)==null?void 0:Le.smile)??0,mouthOpenness:((ze=y==null?void 0:y.expression)==null?void 0:ze.mouthOpenness)??0,facialPose:((At=y==null?void 0:y.expression)==null?void 0:At.facialPose)??"emotion",eyebrowAngles:((ct=y==null?void 0:y.expression)==null?void 0:ct.brows.map(Ge=>Ge.rotation.z))??[],eyeClosure:((dt=y==null?void 0:y.expression)==null?void 0:dt.currentEyeClosure)??0,headQuaternion:((Nt=y==null?void 0:y.head)==null?void 0:Nt.quaternion.toArray())??null,earQuaternions:(y==null?void 0:y.ears.map(Ge=>Ge.object.quaternion.toArray()))??[],bodyScales:(y==null?void 0:y.bodyParts.map(Ge=>Ge.scale.toArray()))??[],leftArmQuaternion:((Rt=y==null?void 0:y.freeArm)==null?void 0:Rt.quaternion.toArray())??null},speech:{active:me,character:l.customerKinds[ee%5],mouthOpenness:((On=y==null?void 0:y.expression)==null?void 0:On.mouthOpenness)??0,boundaryCount:_t},reaction:{kind:se.kind,status:se.status,active:Me.has("customer-reaction"),particleCount:Z.filter(Ge=>Ge.visible).length,symbolKinds:[...se.symbolKinds]},customerMotion:{enabled:!!$i(),active:Me.has("customers-idle"),scheduled:Mi!==null,bursts:Fs,actorIndices:[...gs],poses:[...be.values()].filter(Ge=>Ge.group.visible).map(Ge=>{var en,pi,Ln,Vs;return{index:Ge.index,rigPosition:Ge.rig.position.toArray(),headQuaternion:((en=Ge.head)==null?void 0:en.quaternion.toArray())??null,freeArmQuaternion:((pi=Ge.freeArm)==null?void 0:pi.quaternion.toArray())??null,bodyScale:((Ln=Ge.bodyParts[0])==null?void 0:Ln.scale.toArray())??null,rightHandWorld:((Vs=Ge.hand)==null?void 0:Vs.getWorldPosition(new C).toArray())??null}})},queueCount:[...be.values()].filter(Ge=>Ge.group.visible&&Ge.index!==ee%5).length,customerCount:[...be.values()].filter(Ge=>Ge.group.visible).length,availableDrawerDenominations:[...L],missingDrawerDenominations:[...S],drawerStock:Dn.map(({cents:Ge})=>({cents:Ge,triangles:fe.get(Ge)??0,fullTriangleCount:re.get(Ge)??0,visible:!!(T!=null&&T.visible&&L.includes(Ge))})),patienceGesture:{active:Me.has(`patience:${ee%5}`),leftArmQuaternion:((Vn=(Fn=be.get(ee%5))==null?void 0:Fn.freeArm)==null?void 0:Vn.quaternion.toArray())??null,leftForearmQuaternion:((Zi=(wi=be.get(ee%5))==null?void 0:wi.freeForearm)==null?void 0:Zi.quaternion.toArray())??null},unloading:it,drawerOpen:at,drawerOpenDistance:Yt,drawerTravel:Qe&&Ne?Qe.position.z-Ne.z:0,drawerContentsVisible:(T==null?void 0:T.visible)??!1,drawerTarget:Zp(),reducedMotion:ne,activeAnimations:Me.size,offeredMoney:k.visible?{amountCents:Y==null?void 0:Y.paidCents,...Ki(k),attachedToHand:k.parent===((Hr=be.get(ee%5))==null?void 0:Hr.hand),handLocalPosition:k.position.toArray(),worldPosition:k.getWorldPosition(new C).toArray()}:null,selectedChange:{surface:"cashier-tray",trayBounds:ji(Ke),count:qe.reduce((Ge,en)=>Ge+en.count,0),totalCents:qe.reduce((Ge,en)=>Ge+en.totalCents,0),groups:qe.map(({group:Ge,...en})=>({...en,countLabelVisible:!1,worldBounds:ji(Ge),...Ki(Ge)}))},scanner:Ki(jn),items:[...ot.values()].map(({lineId:Ge,productId:en,group:pi,visual:Ln,hit:Vs})=>({lineId:Ge,productId:en,visible:pi.visible,scanned:ue.has(Ge),worldBounds:ji(Ln),hitBounds:ji(Vs),...Ki(pi)}))}}const td=new ResizeObserver(vs);td.observe(i),window.addEventListener("resize",vs),document.addEventListener("visibilitychange",Yu);const nd={pointerdown:$p,pointermove:Xp,pointerup:qp,pointercancel:Yp,pointerleave:Kp,webglcontextlost:jp,webglcontextrestored:Jp};for(const[_,I]of Object.entries(nd))Bt.addEventListener(_,I);ye.addEventListener("change",ed),vs();function em(){if(h)return;ys({active:!1}),Ei(),Br(null),h=!0,Un(),clearTimeout(ke),clearTimeout(Q),Q=null,m&&cancelAnimationFrame(m),m=0,Me.clear(),td.disconnect(),window.removeEventListener("resize",vs),document.removeEventListener("visibilitychange",Yu);for(const[y,U]of Object.entries(nd))Bt.removeEventListener(y,U);ye.removeEventListener("change",ed),ju();const _=Xh(gt);for(const y of[A,x])Xh(y,_);const I=[...In.values(),...[...gn.values()].flatMap(y=>[y.face,y.edge])];for(const y of I)y.map&&!_.has(y.map)&&(_.add(y.map),y.map.dispose()),_.has(y)||(_.add(y),y.dispose());for(const y of Xe){for(const U of Object.values(y))U!=null&&U.isTexture&&!_.has(U)&&(_.add(U),U.dispose());_.has(y)||(_.add(y),y.dispose())}for(const y of[an,Dr,...[...gn.values()].map(U=>U.geometry),Qo,Na,zs])_.has(y)||y.dispose();u.dispose(),Bt.remove()}const tm=new GS,Ji=await Promise.allSettled(l.sources.map(_=>tm.loadAsync(Do(_))));if(Ji[0].status==="fulfilled"&&(b=Ji[0].value.scene,b.name=`blender_${e}_interior`,gt.add(b)),Ji[1].status==="fulfilled"){x=Ji[1].value.scene;for(let _=0;_<5;_++){const I=x.getObjectByName(`customer_${_}`);if(!I)continue;const y=I.clone(!0);y.position.set(0,0,0);const U=new $t;U.name=`customer_actor_${_}`,U.add(y),U.visible=!1;const G=U.getObjectByName(`customer_${_}_arm_right`),le=U.getObjectByName(`customer_${_}_hand_right`),$=U.getObjectByName(`customer_${_}_arm_left`),W=U.getObjectByName(`customer_${_}_forearm_left`),he=U.getObjectByName(`customer_${_}_hand_left`),_e=U.getObjectByName(`customer_${_}_head`),ae=y.children.filter(ze=>ze.name===`customer_${_}_body`||ze.name.startsWith(`customer_${_}_body_`)),Ae=["left","right"].map(ze=>U.getObjectByName(`customer_${_}_ear_${ze}`)).filter(Boolean).map(ze=>({object:ze,rest:ze.quaternion.clone(),neutral:ze.quaternion.clone()})),Le={index:_,group:U,rig:y,arm:G,hand:le,freeArm:$,freeForearm:W,freeHand:he,head:_e,ears:Ae,bodyParts:ae,bodyRestScales:ae.map(ze=>({object:ze,scale:ze.scale.clone()})),headNeutral:(_e==null?void 0:_e.quaternion.clone())??new tt,rigRestPosition:y.position.clone(),headRest:(_e==null?void 0:_e.quaternion.clone())??new tt,greetingStatus:"none",thanksStatus:"none",armRest:(G==null?void 0:G.quaternion.clone())??new tt,handRest:(le==null?void 0:le.quaternion.clone())??new tt,freeArmRest:($==null?void 0:$.quaternion.clone())??new tt,freeForearmRest:(W==null?void 0:W.quaternion.clone())??new tt,freeHandRest:(he==null?void 0:he.quaternion.clone())??new tt};Le.expression=Up(Le),kr(Le,"happy"),be.set(_,Le),Bs.add(U)}}if(Ji[2].status==="fulfilled"){A=Ji[2].value.scene;for(const _ of l.products){const I=A.getObjectByName(`product_${_}`);I&&Be.set(_,I)}}Ji[3].status==="fulfilled"&&(R=Ji[3].value.scene,P=R.getObjectByName("register_root"),P&&(P.position.copy(Qc),gt.add(R),Qe=P.getObjectByName("cash_drawer"),Ne=(Qe==null?void 0:Qe.position.clone())??null,Number.isFinite(Qe==null?void 0:Qe.userData.open_distance)&&Qe.userData.open_distance>0&&(Yt=Qe.userData.open_distance),T=P.getObjectByName("cash_drawer_contents"),T&&(T.visible=!1,Hp()),Qp(),O=P.getObjectByName("pos_display_surface"),O==null||O.traverse(_=>{if(_.isMesh){for(const I of Array.isArray(_.material)?_.material:[_.material])Xe.add(I);_.material=Na,_.castShadow=!1,_.receiveShadow=!1}}),M=P.getObjectByName("receipt_paper"),M&&(D=M.position.clone(),M.visible=!1),P.add(Xi),Xi.position.set(0,.34,.03)));for(const _ of[b,x,A,Bs])_==null||_.traverse(I=>{if(I.isMesh){I.castShadow=!0,I.receiveShadow=!0;for(const y of Array.isArray(I.material)?I.material:[I.material])"roughness"in y&&(y.roughness=Math.max(y.roughness,.38))}});return R==null||R.traverse(_=>{_.isMesh&&(_.castShadow=_!==Xi&&_.material!==Na,_.receiveShadow=_!==Xi&&_.material!==Na)}),g=!!(b&&P&&O&&Qe&&be.size===5&&Be.size===l.products.length),v=!g,qi.visible=l.hasBelt&&!!b,Bt.dataset.ready=String(g),vs(),g?n==null||n(lc()):s==null||s(new Error("Some 3D checkout models could not load. Cashier controls still work.")),{setState:Gp,setOrder:zp,setScanned:Ju,setPatience:zr,setEmotion:ka,setSpeech:ys,playReaction:Xu,reactToChange:Ba,reactToTotal:Br,celebrate:Wp,resize:vs,dispose:em,info:lc}}const cn={sun:'<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="7" fill="currentColor"/><path d="M20 3v5m0 24v5M3 20h5m24 0h5M8 8l4 4m16 16 4 4M8 32l4-4M28 12l4-4" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',bear:'<svg viewBox="0 0 48 48" aria-hidden="true"><g stroke="#734a34" stroke-width="2.2"><circle cx="11" cy="12" r="8" fill="#cf9966"/><circle cx="37" cy="12" r="8" fill="#cf9966"/><ellipse cx="24" cy="27" rx="21" ry="18" fill="#dfb27c"/></g><ellipse cx="24" cy="32" rx="10" ry="8" fill="#fff0d9"/><ellipse cx="16" cy="25" rx="2.2" ry="3" fill="#57372b"/><ellipse cx="32" cy="25" rx="2.2" ry="3" fill="#57372b"/><ellipse cx="24" cy="30" rx="3.5" ry="2.5" fill="#57372b"/><path d="M24 32v3m-4 0q4 4 8 0" fill="none" stroke="#57372b" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="9" cy="31" rx="4" ry="2.5" fill="#e89582"/><ellipse cx="39" cy="31" rx="4" ry="2.5" fill="#e89582"/></svg>',sound:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m11 5-5 4H3v6h3l5 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" stroke-linecap="round"/></svg>',music:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 17V5l11-2v12M9 9l11-2" stroke-linejoin="round"/><ellipse cx="6" cy="18" rx="3" ry="2.5"/><ellipse cx="17" cy="16" rx="3" ry="2.5"/></svg>',gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 3-1 3-3 1-2 5 2 5 3 1 1 3h6l1-3 3-1 2-5-2-5-3-1-1-3H9Z"/><circle cx="12" cy="12" r="3"/></svg>',cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 3h3l3 13h11l3-10H6M9 20h1m7 0h1" stroke-linecap="round" stroke-linejoin="round"/></svg>',arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-5-5 5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>',check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 12 4 4L19 6" stroke-linecap="round" stroke-linejoin="round"/></svg>'},ge=i=>document.getElementById(i),qt=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);function Ob(){try{return JSON.parse(localStorage.getItem("sunny-market-v1"))||{}}catch{return{}}}const li=Ob();let z=ou(su.some(i=>i.id===li.levelId)?li.levelId:"starter",Math.random,"restaurant");const Ui=wm({storage:(()=>{try{return window.localStorage}catch{return null}})()});Ui.startShift({levelId:z.levelId,sceneId:z.sceneId});let Ns=Ui.snapshot(),ri=li.sound!==!1,Ds=li.music!==!1,nu=0,Wi=li.patience!==!1,ii=yf(),Jt=null,ps=pf.some(i=>i.durationMs===li.shiftDurationMs)?li.shiftDurationMs:lu;const ku=Object.fromEntries(Object.entries(li.bestScores||{}).filter(([,i])=>Number.isSafeInteger(i)&&i>=0));let Vo=!1;const _p=()=>`${z.sceneId}:${z.levelId}:${ps}:${Wi?"timed":"relaxed"}`,Go=()=>ku[_p()]||0;let Wo=Number.isInteger(li.stamps)&&li.stamps>=0?li.stamps:0,ei="",$e,Oi,No=!1,vp=!1,$o=!1,qh=null,Uo="";function Ca(){try{localStorage.setItem("sunny-market-v1",JSON.stringify({levelId:z.levelId,sceneId:z.sceneId,sound:ri,music:Ds,stamps:Wo,patience:Wi,shiftDurationMs:ps,bestScores:ku}))}catch{}}const Fb={unload:["Welcome your customer","Their takeaway order is arriving on the counter."],scan:["Check the food order","Check each food item to pack it into the takeaway bag."],total:["Add up the prices","Enter the total on your cash register."],payment:["Take the payment","Take the customer’s money. Then open your register."],drawer:["Open your cash register","Press OPEN to find the notes and coins for their change."],change:["Count out the change","Choose notes and coins, then hand them back."],success:["Another happy customer","Give them their takeaway bag, receipt, and change."],finished:["Time’s up!","Your score is in. Play again to beat your best!"]},da=()=>sl[0].name,iu=()=>Fb[z.phase],yp=()=>z.order.changeCents===0?"bag and receipt":"bag, receipt, and change";ge("app").innerHTML=`<main class="cashier-app">
  <div id="world" class="world" aria-label="First-person restaurant counter. Check food to pack it into a takeaway bag and take the customer’s money. Equivalent buttons are available on your register."><div id="world-loading" class="world-loading">${cn.sun}<strong>Opening checkout 01…</strong><span>Warming up the kitchen</span></div></div>
  <div class="world-shade" aria-hidden="true"></div>
  <header class="hud"><a class="brand" href="#" aria-label="Sunny Bites game settings">${cn.bear}<span id="scene-brand">sunny bites<small>TAKEAWAY CASHIER</small></span></a><div class="shift-status" id="progress"></div><div class="hud-tools"><span class="lane-tag"><i></i> LANE 01 OPEN</span><button class="icon-button" id="music" aria-label="Turn music off" title="Music">${cn.music}</button><button class="icon-button" id="sound" aria-label="Turn sound off">${cn.sound}</button><button class="icon-button" id="settings-open" aria-label="Open game settings">${cn.gear}</button></div></header>
  <section class="mission" aria-label="Current task"><span class="mission-kicker">YOUR NEXT STEP</span><h1 id="objective-title"></h1><p id="objective-copy"></p><div class="mission-steps" id="steps"></div></section>
  <div class="customer-note" id="customer"></div>
  <div class="view-label"><span class="live-dot"></span> CASHIER VIEW <span id="scene-status">Loading your restaurant</span></div>
  <section id="pos-register" class="register" aria-label="Cash register"><div class="monitor-housing"><span class="bezel-screw screw-tl" aria-hidden="true"></span><span class="bezel-screw screw-tr" aria-hidden="true"></span><div class="register-bezel"><span class="register-brand">SUNNY <span>POINT OF SALE</span></span><div class="register-led"></div><span class="register-id">T-01</span></div><div class="register-screen"><div class="register-screen-header"><span id="terminal-status">READY</span>${bf("register-patience")}<span class="register-currency">AUD · TRAINING TILL</span></div><div id="register-content" class="register-content"></div><div id="register-action" class="register-action" hidden></div></div><div class="monitor-chin" aria-hidden="true"><span>TOUCH TERMINAL</span><i>⏻</i></div></div>${vg()}</section>
  <div id="announcer" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div><div id="patience-announcer" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div>
  <dialog id="settings" class="settings-dialog" aria-labelledby="settings-title"><form method="dialog"><button class="dialog-close" aria-label="Close settings">×</button></form><div class="eyebrow">MAKE YOURSELF AT HOME</div><h2 id="settings-title">Your cashier shift</h2><p>Pack each checked food item, take payment, and hand over the bag, receipt, and change. Serve as many customers as you can before the shift timer ends.</p><fieldset><legend>Learning level</legend><div id="level-options"></div></fieldset><fieldset class="shift-length-setting"><legend>Shift time</legend><select id="shift-duration" aria-label="Shift time">${pf.map(i=>`<option value="${i.durationMs}">${i.label}</option>`).join("")}</select><p>An endless queue. Beat your best score before the buzzer!</p></fieldset><label class="patience-setting"><input type="checkbox" id="patience-enabled" checked/><span><strong>Customer patience</strong><small>Race the clock for more points. Turn off for patient customers: +50 points each. The shift time limit still applies.</small></span></label><section class="scoring-rules" aria-label="Service scoring rules"><h3>Serve quickly. Count carefully.</h3><dl><dt>More than half the time left</dt><dd>+100 pts</dd><dt>More than a fifth left</dt><dd>+60 pts</dd><dt>Before the timer reaches zero</dt><dd>+20 pts</dd><dt>After time runs out</dt><dd>−25 pts</dd></dl><p>Points apply once you finish a correct sale before the shift timer ends. Scores can go below zero. A fresh shift starts at 0.</p></section><div class="settings-note"><span>🇦🇺</span><div><strong>Australian dollars</strong><br>Play money · Timers pause in settings and hidden tabs<br>Music starts when you play. Use ♫ to switch it on or off.<br>Character voices are AI-generated with Kokoro.</div></div><button class="primary-button" id="apply-level">Start a fresh shift ${cn.arrow}</button><p class="saved-note" id="saved-stamps"></p></dialog>
${Cm()}
</main>`;const Lr=()=>document.hidden||ge("settings").open||ge("learning-review").open;function xp(i){const e=ge("music");e.classList.toggle("muted",!i.enabled),e.setAttribute("aria-pressed",String(i.enabled)),e.setAttribute("aria-label",i.enabled?"Turn music off":"Turn music on"),e.title=i.error?"Music unavailable on this device":i.enabled?"Music on · tap to mute":"Music off · tap to play",e.dataset.playing=String(!!i.playing)}const ba=Wm({enabled:Ds,onStateChange:xp}),ui=Om({isEnabled:()=>Ds,isPaused:Lr});function Xo(i){var e,t,n,s;(t=(e=i.target).closest)!=null&&t.call(e,"#music")||ba.unlock(),ui.unlock(),!$o&&!((s=(n=i.target).closest)!=null&&s.call(n,"#music, #sound, #settings-open, .brand, #settings, #mistakes-open, #learning-review, [data-action=review-mistakes]"))&&($o=!0,queueMicrotask(()=>Hi()))}document.addEventListener("pointerdown",Xo);document.addEventListener("keydown",Xo);xp(ba.info());const Mn=pg({getState:()=>z,getView:()=>$e,isEnabled:()=>Wi,isPaused:Lr,onMoodChange:i=>{var t;wp(),(t=$e==null?void 0:$e.setEmotion)==null||t.call($e,ms()),ui.play(ms()),Hi();const e={restless:"is getting restless.",impatient:"is getting impatient.",exhausted:"has run out of patience. This checkout will cost 25 points. You can still finish and earn points back on the next customer."};e[i]&&(ge("patience-announcer").textContent=`${z.order.customer.name} ${e[i]}`)}}),ai=ng({isEnabled:()=>ri&&!Lr(),onStateChange:i=>{var e;return(e=$e==null?void 0:$e.setSpeech)==null?void 0:e.call($e,{active:i.speechActive,boundary:i.speechBoundary,character:i.character,mood:i.mood})}}),hi=ig({getState:()=>z,isPaused:Lr,onAdvance:()=>un.info().expired?Zo():mn(sf(z),"next"),onUpdate:Sp}),un=Dm({durationMs:ps,getState:()=>z,isPaused:Lr,onUpdate:Mp,onExpire:()=>{z.phase==="success"?(Sp(),sa("Time’s up! Finishing this customer’s handover.")):Zo()}});function ms(){return z.phase==="success"?(Jt==null?void 0:Jt.tier)==="late"?"tired":["close","steady"].includes(Jt==null?void 0:Jt.tier)?"relieved":"happy":Wi&&["scan","total","payment","drawer","change"].includes(z.phase)?Mn.info().mood==="calm"?"happy":Mn.info().mood:"happy"}function Bu(){var i,e;return Rs({phase:z.phase,kind:z.order.customer.kind,mood:Wi?Mn.info().mood:"calm",paidCents:z.order.paidCents,emotion:ms(),delivered:hi.info().handoverDelivered,changeCents:z.order.changeCents,changeDirection:(i=z.feedback)==null?void 0:i.changeDirection,totalDirection:(e=z.feedback)==null?void 0:e.totalDirection})}function Hi({force:i=!1,changeDirection:e=null,totalDirection:t=null}={}){var c,d;if(z.order!==qh&&(qh=z.order,Uo="",ai.cancel()),z.phase==="finished"||(!$o||!ri||Lr())&&!e&&!t||z.phase==="success"&&!hi.info().handoverDelivered)return;const n=ms(),s=["unload","scan"].includes(z.phase)?"welcome":["drawer","change"].includes(z.phase)?"change":z.phase,r=e||(z.phase==="change"?(c=z.feedback)==null?void 0:c.changeDirection:null),a=t||(z.phase==="total"?(d=z.feedback)==null?void 0:d.totalDirection:null),o=a?`total:${a}`:`${s}:${n}:${r||"dialogue"}`;if(!i&&Uo===o)return;Uo=o;const l={character:z.order.customer.kind,mood:n,kind:z.phase==="success"?"thanks":s};a?ai.playTotal(a,l):r?ai.play(r,l):ai.speak(Bu(),l)}function Mp(i=un.info()){const e=ge("shift-clock");if(!e)return;const t=i.remainingSeconds;e.querySelector("strong").textContent=`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`,e.querySelector("small").textContent=i.expired?"TIME’S UP":i.paused?"PAUSED":"SHIFT TIME",e.dataset.urgent=String(t<=30&&!i.expired),e.setAttribute("aria-label",`${i.paused?"Paused. ":""}${t} seconds left in your shift`)}function Zo(){z.phase!=="finished"&&(Vo=ii.points>Go(),ku[_p()]=Math.max(Go(),ii.points),Ca(),mn(ym(z),"finish"),ui.play("shift-end"))}function Sp(i=hi.info()){const e=ge("checkout-status");if(e){const s=yp(),r={printing:`Preparing your ${s}…`,"handing-over":`Giving ${s} to ${z.order.customer.name}…`,departing:un.info().expired?"Everything delivered. Finishing your shift…":"Handover complete. The next customer is coming…"};e.textContent=i.paused?"Checkout paused. We’ll continue when you return.":r[i.stage]||"",e.dataset.stage=i.stage}const t=ge("pos-register").querySelector("[data-action=next]");t&&(t.disabled=!i.handoverDelivered,t.innerHTML=`${un.info().expired?"See my score":"Next customer"} ${cn.arrow}`);const n=ge("printed-receipt");if(n&&n.classList.toggle("receipt-given",i.receiptDelivered||z.phase==="finished"),z.phase==="success"){const s=ge("customer").querySelector("[data-customer-speech]");s&&(s.textContent=Bu()),i.handoverDelivered&&Hi()}}function bp(){hi.pauseChanged(),un.pauseChanged(),document.hidden&&(ai.cancel(),ui.cancel())}document.addEventListener("visibilitychange",bp);ge("settings").addEventListener("close",()=>{hi.pauseChanged(),un.pauseChanged(),Hi()});function Tp(){ge("learning-review").open||ge("settings").open||(Mn.tick(),un.tick(),ai.cancel(),ui.cancel(),Ns=Ui.snapshot(),Pm(Ns),ge("learning-review").showModal(),Mn.pauseChanged(),hi.pauseChanged(),un.pauseChanged())}ge("learning-review-close").addEventListener("click",()=>ge("learning-review").close());ge("learning-review").addEventListener("close",()=>{Mn.pauseChanged(),hi.pauseChanged(),un.pauseChanged(),Hi()});ge("progress").addEventListener("click",i=>{i.target.closest("#mistakes-open")&&Tp()});function Ls(i){if(ri)try{Oi||(Oi=new(window.AudioContext||window.webkitAudioContext)),Oi.resume(),(i==="success"?[523.25,659.25,783.99]:i==="scan"?[1100,1450]:i==="drawer"?[190,280]:i==="too-little"?[330,440]:i==="too-much"?[440,330]:[580]).forEach((t,n)=>{const s=Oi.createOscillator(),r=Oi.createGain();s.type=i==="drawer"?"triangle":"sine",s.frequency.value=t;const a=Oi.currentTime+n*.1;r.gain.setValueAtTime(0,a),r.gain.linearRampToValueAtTime(.06,a+.01),r.gain.exponentialRampToValueAtTime(.001,a+.14),s.connect(r),r.connect(Oi.destination),s.start(a),s.stop(a+.16)})}catch{}}function sa(i){ge("announcer").textContent=i}function ur(){const i=z.feedback;if(!i||i.type!=="try")return"";if(z.phase==="total"&&["too-high","too-low"].includes(i.totalDirection))return`<div id="total-feedback" class="feedback try total-feedback" data-direction="${i.totalDirection}" role="status"><span class="total-feedback-symbol" aria-hidden="true">✕</span><div><strong>${i.totalDirection==="too-high"?"Total is too high":"Total is too low"}</strong><span><b>${qt(z.order.customer.name)}:</b> “${qt(_r(i.totalDirection))}”</span></div></div>`;if(z.phase==="change"&&["too-little","too-much"].includes(i.changeDirection)){const e=i.changeDirection==="too-little";return`<div class="feedback try change-feedback" data-direction="${i.changeDirection}" role="status"><span class="change-feedback-symbol" aria-hidden="true">${e?"+":"−"}</span><div><strong>${e?"Too little change":"Too much change"}</strong><span class="customer-verdict"><b>${qt(z.order.customer.name)}:</b> “${qt(gr(i.changeDirection))}”</span></div></div>`}return`<div class="feedback ${i.type}" role="status">${qt(i.text)}</div>`}function qo(){const i=new Map;for(const e of z.order.items){const t=`${e.productId}:${e.priceCents}`;i.has(t)||i.set(t,{...e,quantity:0,lineIds:[]}),i.get(t).quantity++,i.get(t).lineIds.push(e.lineId)}return[...i.values()]}function Ep(i,e=""){return`<img class="food-picture ${e}" src="./assets/food-icons/${qt(i.productId)}.png" alt="" width="48" height="48" draggable="false"/>`}function Yh(i,e=!1){return`<span class="food-receipt-art ${e?"checked":""}" aria-hidden="true">${Ep(i)}${e?"<i>✓</i>":""}</span>`}function Kh({compact:i=!1}={}){const e=["payment","drawer","change","success","finished"].includes(z.phase),n=z.phase==="scan"?qo().map(s=>{const r=s.lineIds.filter(l=>z.scanned.includes(l)).length,a=r===s.quantity,o=s.lineIds.find(l=>!z.scanned.includes(l))??s.lineIds.at(-1);return`<button class="receipt-item receipt-product-group receipt-scan-group ${a?"is-scanned":""}" data-product="${qt(s.productId)}" data-quantity="${s.quantity}" data-unit-price="${s.priceCents}" data-packed="${r}" data-scan-group="${qt(`${s.productId}:${s.priceCents}`)}" data-scan="${qt(o)}" aria-label="Check ${qt(s.name)}, ${r} of ${s.quantity} packed, ${Lt(s.priceCents)} each" ${a?"disabled":""}>${Yh(s,a)}<span class="product-description">${qt(s.name)}<small class="packing-progress">${a?"Packed ✓":`${r}/${s.quantity} packed`}</small></span><strong class="product-equation">${s.quantity} × ${Lt(s.priceCents)}</strong></button>`}).join(""):qo().map(s=>`<div class="receipt-item receipt-product-group is-scanned" data-product="${qt(s.productId)}" data-quantity="${s.quantity}" data-unit-price="${s.priceCents}">${Yh(s,!0)}<span class="product-description">${qt(s.name)}<small>${Lt(s.priceCents)} each</small></span><strong class="product-equation">${s.quantity} × ${Lt(s.priceCents)}</strong></div>`).join("");return`<div class="receipt ${i?"compact":""}"><div class="receipt-head"><span>ITEM</span><span>QUANTITY × PRICE EACH</span></div><div class="receipt-items">${n}</div><div class="receipt-total"><span>${e?"TOTAL":"TOTAL TO CALCULATE"}</span><strong>${e?Lt(z.order.totalCents):"$ —.—"}</strong></div></div>`}function kb(){var i;ge("progress").innerHTML=`<span class="shift-clock" id="shift-clock" role="timer"><small>SHIFT TIME</small><strong></strong></span><span class="shift-score" id="shift-score" data-negative="${ii.points<0}" aria-label="Shift score: ${ii.points} points"><span aria-hidden="true">★</span><strong>${xf(ii.points)}</strong><small>PTS</small></span><span class="shift-best"><small>BEST</small><b>${Go()}</b></span><span class="customer-counter">${cn.cart}<strong>${z.phase==="finished"?`${z.completed} served`:`Customer ${z.round+1}`}</strong></span><button type="button" class="mistake-counter" id="mistakes-open" aria-label="Review wrong answers" title="Review wrong answers"><span aria-hidden="true">✕</span><strong id="wrong-answer-count">${((i=Ns.current)==null?void 0:i.counts.all)||0}</strong><small>WRONG</small></button>`,Mp()}function wp(){var d,u;const i=z.order.customer,e=Bu(),t=Mn.info().mood,n=z.phase==="change"?(d=z.feedback)==null?void 0:d.changeDirection:null,s=z.phase==="total"?(u=z.feedback)==null?void 0:u.totalDirection:null,r=["unload","scan","total"].includes(z.phase)&&t==="calm"&&!s,a=r?`<div class="customer-order-pictures" aria-label="Customer’s order">${qo().map(h=>`<span class="order-picture" aria-label="${h.quantity} ${qt(h.name)}">${Ep(h)}<b aria-hidden="true">×${h.quantity}</b></span>`).join("")}</div>`:"";ge("customer").classList.toggle("pictured-order",r);const o=s?"confused":ms(),l={happy:"☺",restless:"◷",impatient:"☁",exhausted:"☁",relieved:"♡",tired:"☂",confused:"✕"},c={happy:z.phase==="success"?"Delighted!":"Happy to wait",restless:"Getting restless",impatient:"Losing patience",exhausted:"Very impatient",relieved:"Relieved",tired:"Tired of waiting",confused:"Let’s check the bill"};ge("customer").dataset.emotion=o,ge("customer").innerHTML=`<span class="speech-name">${qt(i.name)} <span>${z.phase==="success"?"CUSTOMER SERVED":"AT YOUR CHECKOUT"}</span></span><span class="customer-emotion"><i aria-hidden="true">${l[o]}</i>${c[o]}</span>${a}<p data-customer-speech class="${r?"order-caption":""}">${qt(e)}</p>${fg()}`,ge("customer").classList.toggle("payment-speech",z.phase==="payment"),n?ge("customer").dataset.changeDirection=n:delete ge("customer").dataset.changeDirection,s?ge("customer").dataset.totalDirection=s:delete ge("customer").dataset.totalDirection}function Ta(){var d,u,h,f,g;const i=document.activeElement,e=["data-money","data-remove-value","data-remove","data-action","data-scan-group","data-scan"].find(v=>i==null?void 0:i.hasAttribute(v)),t=e?i.getAttribute(e):null,n=(i==null?void 0:i.id)==="total-input"?{start:i.selectionStart,end:i.selectionEnd,direction:i.selectionDirection}:null;ge("app").dataset.phase=z.phase,ge("app").dataset.scene=z.sceneId,ge("scene-brand").innerHTML=`${da().toLowerCase()}<small>TAKEAWAY CASHIER</small>`,document.querySelector(".brand > svg").outerHTML=cn.bear,document.querySelector(".brand").setAttribute("aria-label",`${da()} game settings`),ge("world").setAttribute("aria-label","First-person restaurant counter. Click takeaway food to pack it into a bag, or take the animal customer’s money. Equivalent controls are available on your register."),document.title=`${da()} · Cashier game`,kb(),wp(),ge("objective-title").textContent=iu()[0],ge("objective-copy").textContent=No&&["unload","scan","payment","drawer"].includes(z.phase)?"Use the item rows on your register to keep playing.":iu()[1],z.phase==="success"&&(Jt==null?void 0:Jt.tier)==="late"&&(ge("objective-title").textContent="Customer served"),z.phase==="change"&&Yo(z).length&&(ge("objective-title").textContent="Find another combination",ge("objective-copy").textContent="Some slots are empty. Use the notes and coins you have to make the exact change."),z.phase==="total"&&qo().some(v=>v.quantity>1)&&(ge("objective-title").textContent="Multiply, then add",ge("objective-copy").textContent="Multiply each price by its quantity. Add the groups to find the bill.");const s=["unload","scan"].includes(z.phase)?0:z.phase==="total"?1:z.phase==="payment"?2:z.phase==="drawer"?3:4;ge("steps").innerHTML=["Scan","Total","Cash","Open","Change"].map((v,m)=>`<span class="${m===s?"active":m<s?"done":""}"><i>${m<s?"✓":m+1}</i>${v}</span>`).join(""),ge("terminal-status").textContent={unload:"CUSTOMER ARRIVING",scan:"SCANNER READY",total:"ENTER BILL TOTAL",payment:"AWAITING PAYMENT",drawer:"PAYMENT RECEIVED · DRAWER CLOSED",change:"CASH DRAWER OPEN",success:"TRANSACTION COMPLETE",finished:"SHIFT COMPLETE"}[z.phase],ge("drawer-open").disabled=z.phase!=="drawer",ge("drawer-open").dataset.open=String(z.phase==="change"),ge("drawer-open").setAttribute("aria-label",z.phase==="drawer"?"Open cash drawer using the register button":z.phase==="change"?"Cash drawer is open":"Cash drawer is closed"),ge("drawer-base-label").textContent=z.phase==="drawer"?"PRESS TO OPEN CASH DRAWER":z.phase==="change"?"CASH DRAWER OPEN":"CASH DRAWER LOCKED";let r="",a="";z.phase==="unload"?r=`<div class="task-heading"><span class="eyebrow">NEXT IN LINE</span><h2>Welcome, ${qt(z.order.customer.name)}.</h2><p>${z.order.items.length} takeaway items are arriving on the counter.</p></div><div class="unload-display">${cn.cart}<span>Getting your order ready…</span><div class="unload-indicator"><i></i><i></i><i></i></div></div>${ur()}<button class="secondary-button" data-action="unload">Start scanning ${cn.arrow}</button>`:z.phase==="scan"?r=`<div class="task-heading compact-heading"><h2>Check each food item</h2><span class="scan-count">${z.scanned.length}/${z.order.items.length}</span></div>${Kh()}<div class="scanner-status"><span class="scan-led"></span>${z.scanned.length?"Item checked and packed. Ready for the next one.":"Click a food item to pack it into the bag."}</div>${ur()}`:z.phase==="total"?(r=`<div class="task-heading compact-heading"><h2>What’s the total?</h2></div>${Kh({compact:!0})}`,a=`<div class="calculator total-entry"><label for="total-input">ENTER THE AMOUNT THE CUSTOMER OWES</label><div class="total-entry-controls"><div class="money-input"><span>$</span><input id="total-input" type="text" inputmode="decimal" autocomplete="off" maxlength="8" aria-label="Total amount in dollars" placeholder="0.00" value="${qt(ei)}"/></div><button class="primary-button" data-action="total">Check my total ${cn.arrow}</button></div>${ur()}</div>`):z.phase==="payment"?r=`<div class="task-heading"><span class="eyebrow">ACCEPT THE CUSTOMER’S CASH</span><h2>Take the payment</h2><p>${qt(z.order.customer.name)} is handing you money.</p></div><div class="payment-bill"><span>Bill total</span><strong>${Lt(z.order.totalCents)}</strong></div><button class="offered-note" data-action="accept" aria-label="Take ${Lt(z.order.paidCents)} payment"><span>AUSTRALIAN DOLLARS</span><strong>${Lt(z.order.paidCents)}</strong><small>PLAY MONEY · CLICK TO TAKE</small></button>${ur()}<button class="primary-button" data-action="accept">Take ${Lt(z.order.paidCents)} ${cn.arrow}</button><p class="payment-help">You can also click the money in their hand.</p>`:z.phase==="drawer"?r=`<div class="task-heading"><span class="eyebrow">CUSTOMER’S MONEY RECEIVED ✓</span><h2>Open the cash register</h2><p>Find the exact change inside your drawer.</p></div><div class="payment-summary"><div><span>BILL TOTAL</span><strong>${Lt(z.order.totalCents)}</strong></div><div><span>CASH RECEIVED ✓</span><strong>${Lt(z.order.paidCents)}</strong></div></div><div class="drawer-instruction"><span aria-hidden="true">↓</span><p>Press OPEN to release the drawer below.<br>Count the notes and coins inside.</p></div>${ur()}<button class="primary-button open-drawer-button" data-action="open-drawer">Open cash drawer ${cn.arrow}</button><p class="payment-help">Then choose notes and coins to make the right change.</p>`:z.phase==="change"?r=`<div class="task-heading compact-heading"><h2>Count their change</h2></div><div class="payment-summary"><div><span>BILL TOTAL</span><strong>${Lt(z.order.totalCents)}</strong></div><div><span>CASH RECEIVED ✓</span><strong>${Lt(z.order.paidCents)}</strong></div></div><div class="change-prompt">${Lt(z.order.paidCents)} − ${Lt(z.order.totalCents)} = <span>?</span></div><p class="count-change-instruction">Count the notes and coins in your tray. Give the change when you’re ready.</p>${ur()}`:z.phase==="success"?r=`<div class="success-panel"><span class="success-check">${cn.check}</span><span class="eyebrow">TRANSACTION COMPLETE</span><h2>${(Jt==null?void 0:Jt.tier)==="late"?"Change checked!":"Right on the money!"}</h2><p>Handing ${qt(z.order.customer.name)} their ${yp()}.</p>${cg(Jt)}<p class="checkout-status" id="checkout-status" role="status"></p><button class="primary-button" data-action="next" disabled>Next customer ${cn.arrow}</button><small class="checkout-auto-note">The queue moves automatically after everything is delivered.</small></div>`:r=`<div class="success-panel"><span class="finish-stars">${Vo?"★ ★ ★":"★"}</span><span class="eyebrow">${Vo?"NEW PERSONAL BEST":"SHIFT COMPLETE"}</span><h2>Time’s up!</h2><p>${z.completed} ${z.completed===1?"customer":"customers"} served in ${ps/6e4} minutes.</p>${lg(ii)}<p class="shift-record">Best score: <strong>${Go()} points</strong></p>${Lm(Ns.current)}<button class="primary-button" data-action="restart">Play again ${cn.arrow}</button><button class="text-button" data-action="levels">Change level or time</button></div>`,ge("register-content").innerHTML=r,ge("register-content").dataset.phase=z.phase;const o=z.phase==="change"?ge("register-content").querySelector(".feedback"):null,l=(o==null?void 0:o.outerHTML)||"";o==null||o.remove(),ge("register-action").innerHTML=a,ge("register-action").hidden=!a,ge("register-action").dataset.phase=z.phase;const c=z.phase==="total"?(d=z.feedback)==null?void 0:d.totalDirection:null;if(c?ge("pos-register").dataset.totalFeedback=c:delete ge("pos-register").dataset.totalFeedback,z.phase==="total"&&(ge("total-input").setAttribute("aria-invalid",String(((u=z.feedback)==null?void 0:u.type)==="try")),c&&ge("total-input").setAttribute("aria-describedby","total-feedback")),z.phase==="success"&&(ge("register-action").append(ge("register-content").querySelector("[data-action=next]"),ge("register-content").querySelector(".checkout-auto-note")),ge("register-action").hidden=!1),bg(z,vp,l,(h=z.feedback)==null?void 0:h.changeDirection),n&&z.phase==="total"){const v=ge("total-input");v.focus({preventScroll:!0}),v.setSelectionRange(n.start,n.end,n.direction)}if(e){const v=[...ge("pos-register").querySelectorAll(`[${e}]`)].find(m=>m.getAttribute(e)===t);v&&!v.disabled?v.focus({preventScroll:!0}):e==="data-remove-value"?(f=ge("change-preview").querySelector("[data-remove-value], [data-action=change]"))==null||f.focus({preventScroll:!0}):e==="data-scan-group"&&((g=ge("pos-register").querySelector("[data-scan]:not(:disabled), #total-input"))==null||g.focus({preventScroll:!0}))}Mn.render(!0),hi.paint(!0),ge("sound").classList.toggle("muted",!ri),ge("sound").setAttribute("aria-label",ri?"Turn sound off":"Turn sound on"),ge("sound").setAttribute("aria-pressed",String(ri)),ge("sound").title="Kokoro character voices and sound effects"}function mn(i,e){var s,r,a,o,l,c,d,u,h,f;if(ge("learning-review").open)return;if(!["restart","finish"].includes(e)){if(un.tick(),z.phase==="finished")return;if(un.info().expired){e==="next"&&z.phase==="success"&&Zo();return}}const t=z;if(i===t)return;Mn.tick(),e==="restart"?(ii=yf(),Jt=null,Vo=!1,un.reset(ps),ui.cancel(),Ui.startShift({levelId:i.levelId,sceneId:i.sceneId}),Ns=Ui.snapshot()):i.order!==t.order&&(Jt=null),e!=="restart"&&Ui.record(t,i,e)&&(Ns=Ui.snapshot());const n=i.phase==="success"&&t.phase!=="success";if(n&&(Jt=vf(Mn.info(),Wi),ii=ag(ii,`${i.levelId}:${i.round}:${i.order.id}`,Jt)),vp=t.phase==="drawer"&&i.phase==="change",z=i,z.phase!==t.phase&&(ei=""),z.phase==="finished"&&(Ui.finishShift({score:ii.points,completed:z.completed,durationMs:ps}),Ns=Ui.snapshot()),n?(Wo++,Ca(),Ls(Jt.delta<0?"too-much":"success")):e==="scan"&&z.scanned.length>t.scanned.length?Ls("scan"):e==="open-drawer"?Ls("drawer"):(e==="accept"||e==="money")&&Ls("key"),(z.order!==t.order||z.phase!==t.phase&&["success","finished"].includes(z.phase))&&ai.cancel(),(z.phase!=="change"||!((s=z.feedback)!=null&&s.changeDirection))&&((r=$e==null?void 0:$e.reactToChange)==null||r.call($e,null)),(z.phase!=="total"||!((a=z.feedback)!=null&&a.totalDirection))&&((o=$e==null?void 0:$e.reactToTotal)==null||o.call($e,null)),hi.sync(t,z),un.sync(t,z),t.sceneId!==z.sceneId?Cp():$e==null||$e.setState(z),Mn.sync(t,z),(l=$e==null?void 0:$e.setEmotion)==null||l.call($e,ms()),Ta(),sa(((c=z.feedback)==null?void 0:c.text)||iu()[1]),(n||t.phase==="unload"&&z.phase==="scan")&&ui.play(ms()),n&&(ug(),sa(`${z.order.customer.name} served. ${Jt.label}: ${hu(Jt.delta)} points. Shift score: ${ii.points} points.`)),e==="total"&&z.phase==="total"&&((d=z.feedback)!=null&&d.totalDirection)?(gg(z.feedback.totalDirection),Hi({force:!0,totalDirection:z.feedback.totalDirection}),(u=$e==null?void 0:$e.reactToTotal)==null||u.call($e,z.feedback.totalDirection),sa(`${z.order.customer.name} says: ${_r(z.feedback.totalDirection)}`)):e==="change"&&z.phase==="change"&&((h=z.feedback)!=null&&h.changeDirection)?(_g(z.feedback.changeDirection),Hi({force:!0,changeDirection:z.feedback.changeDirection}),(f=$e==null?void 0:$e.reactToChange)==null||f.call($e,z.feedback.changeDirection),sa(`${z.order.customer.name} says: ${gr(z.feedback.changeDirection)}`)):Hi(),z.phase!==t.phase&&(matchMedia("(max-width: 700px)").matches&&(z.phase==="change"?ge("change-preview"):["unload","scan"].includes(z.phase)?document.querySelector(".cashier-app"):document.querySelector(".register")).scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"}),!["unload","scan"].includes(z.phase))){const g=ge("pos-register").querySelector("#total-input, #register-content .primary-button, #register-action .primary-button, #change-preview .primary-button");g&&e!=="scan"&&!g.disabled&&g.focus({preventScroll:!0})}}function Ap(i){mn(hm(z,i),"scan")}function Rp(){mn(fm(z),"accept")}function zu(){mn(pm(z),"open-drawer")}function Hu(){ge("learning-review").open||(Mn.tick(),un.tick(),ai.cancel(),ui.cancel(),ge("shift-duration").value=String(ps),ge("patience-enabled").checked=Wi,ge("level-options").innerHTML=su.map((i,e)=>`<label class="level-option"><input type="radio" name="level" value="${i.id}" ${z.levelId===i.id?"checked":""}/><span class="level-symbol">${e+1}</span><span><strong>${qt(i.name)}</strong><small>${qt(i.description)}</small><span class="level-drawer-detail">${["Full drawer · All 11 money types","Random drawer · 2–3 types missing each customer","Random drawer · 4–5 types missing each customer"][e]}</span></span></label>`).join(""),ge("saved-stamps").textContent=`${Wo} cashier ${Wo===1?"stamp":"stamps"} earned on this device.`,ge("settings").showModal(),Mn.pauseChanged(),hi.pauseChanged(),un.pauseChanged())}ge("pos-register").addEventListener("input",i=>{i.target.id==="total-input"&&(ei=i.target.value)});ge("pos-register").addEventListener("keydown",i=>{i.target.id==="total-input"&&i.key==="Enter"&&z.phase==="total"&&(i.preventDefault(),mn(nf(z,ei),"total"))});ge("pos-register").addEventListener("click",i=>{const e=i.target.closest("button");if(!e||e.disabled||ge("learning-review").open)return;if(e.dataset.scan){Ap(e.dataset.scan);return}if(e.dataset.key!==void 0){if(z.phase!=="total")return;const n=e.dataset.key;ei=n==="⌫"?ei.slice(0,-1):ei.length<8?ei+n:ei,ge("total-input").value=ei,Ls("key");return}if(e.dataset.money){mn(mm(z,Number(e.dataset.money)),"money");return}if(e.dataset.remove!==void 0){mn(gm(z,Number(e.dataset.remove)),"remove");return}const t=e.dataset.action;if(t==="review-mistakes"){Tp();return}t==="unload"&&mn(rl(z),"unload"),t==="total"&&mn(nf(z,ei),"total"),t==="accept"&&Rp(),t==="open-drawer"&&zu(),t==="change"&&mn(vm(z),"change"),t==="clear"&&mn(_m(z),"clear"),t==="next"&&(un.info().expired?Zo():mn(sf(z),"next")),t==="restart"&&mn(ou(z.levelId,Math.random,z.sceneId),"restart"),t==="levels"&&Hu()});ge("drawer-open").addEventListener("click",zu);ge("sound").addEventListener("click",()=>{ri=!ri,ri?($o=!0,Uo=""):ai.cancel(),Ca(),Ta(),ri&&(Ls("key"),Hi())});ge("music").addEventListener("click",()=>{Ds=!Ds,ba.setEnabled(Ds),Ds?(ba.unlock(),ui.unlock()):ui.cancel(),Ca()});ge("settings-open").addEventListener("click",Hu);ge("apply-level").addEventListener("click",()=>{const i=ge("settings").querySelector("input[name=level]:checked").value;Wi=ge("patience-enabled").checked,ps=Number(ge("shift-duration").value),mn(ou(i,Math.random,"restaurant"),"restart"),Ca(),ge("settings").close(),Mn.pauseChanged(),un.pauseChanged()});document.querySelector(".brand").addEventListener("click",i=>{i.preventDefault(),Hu()});ge("settings").addEventListener("click",i=>{if(i.target===ge("settings")){const e=ge("settings").getBoundingClientRect();(i.clientX<e.left||i.clientX>e.right||i.clientY<e.top||i.clientY>e.bottom)&&ge("settings").close()}});Ta();async function Cp(){var a,o,l;const i=++nu,e=z.sceneId;$e==null||$e.dispose(),$e=void 0,No=!1;const t=document.createElement("div");t.className="scene-mount";const n=document.createElement("div");n.id="world-loading",n.className="world-loading",n.innerHTML=`${cn.sun}<strong>Opening ${qt(da())}…</strong><span>Warming up the kitchen</span>`,ge("world").replaceChildren(t,n),ge("world").classList.remove("scene-unavailable"),ge("scene-status").textContent=`Loading ${da()}`;const s=()=>i===nu&&e===z.sceneId,r=c=>{s()&&(No=!0,n.remove(),ge("world").classList.add("scene-unavailable"),ge("scene-status").textContent="3D unavailable · register controls still work",console.warn("Cashier view:",c),z.phase==="unload"?mn(rl(z),"unload"):Ta())};try{const c=await Ub(t,{sceneId:e,onScan:u=>{s()&&Ap(u)},onUnloadComplete:()=>{s()&&mn(rl(z),"unload")},onAcceptPayment:()=>{s()&&Rp()},onOpenDrawer:()=>{s()&&zu()},onReady:()=>{s()&&(No=!1,ge("world").classList.remove("scene-unavailable"),n.remove(),ge("scene-status").textContent="Fresh food. Friendly faces.",Ta())},onError:r});if(!s()){c.dispose();return}$e=c,$e.setState(z),(a=$e.setPatience)==null||a.call($e,Wi?Mn.info().mood:"calm"),(o=$e.setEmotion)==null||o.call($e,ms());const d=ai.info();(l=$e.setSpeech)==null||l.call($e,{active:d.speechActive,boundary:d.speechBoundary,character:d.character,mood:d.mood})}catch(c){r(c)}}Cp();window.addEventListener("pagehide",()=>{nu++,Mn.dispose(),hi.dispose(),un.dispose(),ai.dispose(),ui.dispose(),$e==null||$e.dispose(),ba.dispose(),document.removeEventListener("visibilitychange",bp),document.removeEventListener("pointerdown",Xo),document.removeEventListener("keydown",Xo),Oi==null||Oi.close()},{once:!0});
