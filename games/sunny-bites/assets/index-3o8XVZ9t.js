(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Kl=300*1e3,Nh=Object.freeze([3,5,10].map(i=>Object.freeze({minutes:i,durationMs:i*60*1e3,label:`${i} minutes`}))),Xu=i=>Number.isSafeInteger(i)&&i>0?i:Kl;function Ip({durationMs:i=Kl,getState:e=()=>({phase:"unload"}),isPaused:t=()=>!1,onExpire:n=()=>{},onUpdate:s=()=>{},now:r=()=>performance.now()}={}){let a=Xu(i),o=0,l=!1,c=!1,d=!1,u=e().phase,h=0,f=null,g="",v=0,m=!!t();const p=()=>{const M=r();return Number.isFinite(M)?Math.max(h,M):h};h=p();function T(){const M=l&&!c&&!d&&u!=="finished",N=M&&!!t(),F=Math.max(0,a-o);return{durationMs:a,elapsedMs:o,remainingMs:F,remainingSeconds:Math.ceil(F/1e3),ratio:F/a,started:l,expired:c,paused:N,running:M&&!N,disposed:d}}function E(M=!1){const N=T(),F=`${N.remainingSeconds}:${N.started}:${N.expired}:${N.paused}:${N.running}`;(M||F!==g)&&(g=F,s(N))}function x(){clearInterval(f),f=null}function R(M=!1){if(d)return;const N=p(),F=!!t();if(l&&!c&&u!=="finished"&&!m&&(!F||M)&&(o=Math.min(a,o+N-h)),h=N,m=F,l&&!c&&o>=a){c=!0,x();const V=v,Z=T();E(!0),!d&&V===v&&n(Z)}else E()}function C(){return R(),T()}function L(M,N){if(d)return T();const F=v,V=c;return R(),d||v!==F||!V&&c||(u=(N==null?void 0:N.phase)??e().phase,!l&&u==="scan"&&(l=!0,h=p(),m=!!t(),f=setInterval(C,100)),u==="finished"&&x(),E(!0)),T()}function O(){return R(!0),T()}function b(M=a){return d||(v+=1,x(),a=Xu(M),o=0,l=!1,c=!1,u="unload",h=p(),m=!!t(),g="",E(!0)),T()}return{info:T,tick:C,sync:L,pauseChanged:O,reset:b,dispose(){d||(d=!0,v+=1,x())}}}const jl=Object.freeze({happy:[[72,0,.34,.034],[76,.17,.35,.036],[79,.34,.44,.036],[84,.58,.72,.029],[60,.58,.8,.015,"sine"]],restless:[[67,0,.36,.029],[72,.26,.39,.03],[69,.55,.44,.027],[67,.86,.62,.023]],impatient:[[74,0,.4,.03],[72,.29,.42,.029],[69,.58,.45,.027],[67,.9,.62,.023]],exhausted:[[67,0,.5,.025,"sine"],[64,.37,.54,.023,"sine"],[60,.78,.8,.02,"sine"]],relieved:[[64,0,.44,.026,"sine"],[67,.28,.47,.028],[72,.6,.82,.025],[60,.6,.82,.012,"sine"]],tired:[[64,0,.5,.022,"sine"],[62,.38,.54,.021,"sine"],[60,.8,.78,.019,"sine"]],"shift-end":[[72,0,.32,.032],[76,.17,.34,.034],[79,.34,.42,.034],[84,.61,.8,.03],[76,.61,.8,.015,"sine"],[60,.61,.92,.012,"sine"]]});Object.freeze(Object.keys(jl));const Uh=i=>typeof i=="string"&&Object.hasOwn(jl,i),Lp=i=>440*2**((i-69)/12);function Oh(i,e){i.oscillator.onended=null;try{i.gain.gain.cancelScheduledValues(e),i.gain.gain.setValueAtTime(0,e),i.oscillator.stop(e)}catch{}i.oscillator.disconnect(),i.gain.disconnect()}function Dp(i,e,t,n=i.currentTime,s=()=>{}){if(!Uh(t))return[];const r=[];try{for(const[a,o,l,c,d="triangle"]of jl[t]){const u=i.createOscillator(),h=i.createGain(),f={oscillator:u,gain:h};r.push(f);const g=n+o;u.type=d,u.frequency.value=Lp(a),h.gain.setValueAtTime(0,g),h.gain.linearRampToValueAtTime(c,g+.025),h.gain.exponentialRampToValueAtTime(1e-4,g+l),h.gain.linearRampToValueAtTime(0,g+l+.025),u.connect(h).connect(e),u.onended=()=>{u.disconnect(),h.disconnect(),s(f)},u.start(g),u.stop(g+l+.03)}return r}catch(a){for(const o of r)Oh(o,i.currentTime);throw a}}function Np({isEnabled:i=()=>!0,isPaused:e=()=>!1,onStateChange:t=()=>{}}={}){var N;const n=globalThis.AudioContext||globalThis.webkitAudioContext,s=globalThis.document;let r,a=!1,o=!1,l=0,c=null,d=null,u="idle",h=null,f=0,g=0,v=0;const m=new Set,p=()=>!a&&!!(typeof i=="function"?i():i),T=()=>!!(s!=null&&s.hidden||(typeof e=="function"?e():e)),E=()=>p()?T()?"paused":null:"muted",x=()=>({enabled:p(),paused:T(),disposed:a,unlocked:o,mood:c,pendingMood:d,status:u,playing:u==="playing"&&(r==null?void 0:r.state)==="running"&&m.size>0,activeVoices:m.size,playCount:f,scheduledCount:g,cancelCount:v,contextState:(r==null?void 0:r.state)??"not-started",error:h}),R=()=>t(x());function C(F="cancelled"){l++,(m.size||d||u==="resuming")&&v++,d=null;for(const V of m)Oh(V,r.currentTime);m.clear(),u=F}function L(){return n?((!r||r.state==="closed")&&(r=new n),r):(u="unavailable",R(),null)}async function O(F,V){try{const Z=L();if(!Z||(u="resuming",R(),await Z.resume(),a||V!==l))return;const ee=E();if(ee){C(ee),R();return}if(Z.state!=="running")throw new Error("Music cue could not start.");Dp(Z,Z.destination,F,Z.currentTime+.015,ie=>{m.delete(ie),!(a||V!==l)&&(m.size||(u="ended",R()))}).forEach(ie=>m.add(ie)),g++,u="playing",R()}catch(Z){if(a||V!==l)return;C("error"),h=(Z==null?void 0:Z.message)||"Music cues are unavailable.",R()}}async function b(F){try{const V=L();if(!V||(await V.resume(),a||F!==l))return;const Z=E();if(Z){C(Z),R();return}if(V.state!=="running")throw new Error("Music cue could not start.");u="idle",R()}catch(V){if(a||F!==l)return;u="error",h=(V==null?void 0:V.message)||"Music cues are unavailable.",R()}}function M(){s!=null&&s.hidden&&(C("paused"),R())}return(N=s==null?void 0:s.addEventListener)==null||N.call(s,"visibilitychange",M),{info:x,play(F){if(a||!Uh(F))return x();C("idle"),c=F,h=null;const V=E();return V?(u=V,R(),x()):(f++,o?(O(F,l),x()):(d=F,u="locked",R(),x()))},unlock(){if(a)return x();const F=E();if(F)return C(F),R(),x();if(o=!0,d){const V=d;d=null,O(V,++l)}else!["playing","resuming"].includes(u)&&(r==null?void 0:r.state)!=="running"&&(u="resuming",b(++l));return R(),x()},cancel(){return a||(C(E()||"cancelled"),R()),x()},dispose(){var F;a||(C("disposed"),a=!0,(F=s==null?void 0:s.removeEventListener)==null||F.call(s,"visibilitychange",M),r&&r.state!=="closed"&&r.close().catch(()=>{}),R())}}}const Up=60/108/2,Op=[[76,null,79,81,null,79,76,null],[74,null,76,79,null,76,72,null],[72,74,76,null,79,null,76,74],[71,null,74,76,null,74,71,null],[76,null,79,84,null,81,79,null],[77,null,76,74,null,72,74,null],[72,76,null,79,77,null,76,74],[71,null,74,null,72,null,null,null]],Fp=[[60,64,67,71],[57,60,64,67],[53,57,60,64],[55,59,62,65],[60,64,67,71],[53,57,60,64],[62,65,69,72],[55,59,62,65]],Bp=[36,33,29,31,36,29,38,31],kp=i=>440*2**((i-69)/12),qu=new WeakMap;function ka(i,e,t,n,s,r,a,o){const l=i.createOscillator(),c=i.createGain();l.type=a,l.frequency.value=kp(t),c.gain.setValueAtTime(0,n),c.gain.linearRampToValueAtTime(r,n+.012),c.gain.exponentialRampToValueAtTime(1e-4,n+s),l.connect(c).connect(e),l.onended=()=>{l.disconnect(),c.disconnect(),o==null||o(l,!1)},o==null||o(l,!0),l.start(n),l.stop(n+s+.02)}function zp(i,e,t,n){let s=qu.get(i);if(!s){s=i.createBuffer(1,Math.ceil(i.sampleRate*.055),i.sampleRate);const l=s.getChannelData(0);let c=87241;for(let d=0;d<l.length;d++)c=Math.imul(c,1664525)+1013904223>>>0,l[d]=(c/4294967296*2-1)*(1-d/l.length);qu.set(i,s)}const r=i.createBufferSource(),a=i.createBiquadFilter(),o=i.createGain();r.buffer=s,a.type="highpass",a.frequency.value=4200,o.gain.value=.016,r.connect(a).connect(o).connect(e),r.onended=()=>{r.disconnect(),a.disconnect(),o.disconnect(),n==null||n(r,!1)},n==null||n(r,!0),r.start(t)}function Hp(i,e,t,n,s){const r=Math.floor(t/8)%8,a=t%8,o=Op[r][a];o!==null&&(ka(i,e,o,n,.42,.14,"sine",s),ka(i,e,o+12,n,.13,.02,"sine",s)),(a===0||a===4)&&ka(i,e,Bp[r]+(a===4?7:0),n,.45,.07,"triangle",s),(a===2||a===6)&&Fp[r].forEach((l,c)=>ka(i,e,l,n+c*.012,.26,.022,"triangle",s)),a%2&&zp(i,e,n,s)}function Vp({enabled:i=!0,onStateChange:e=()=>{}}={}){let t,n,s,r,a=!1,o=!1,l=!1,c=0,d=0,u=0,h=0,f=null;const g=new Set,v=(C,L)=>L?g.add(C):g.delete(C),m=()=>({enabled:i,unlocked:a,playing:o&&(t==null?void 0:t.state)==="running",contextState:(t==null?void 0:t.state)??"not-started",scheduledSteps:h,activeVoices:g.size,error:f}),p=()=>e(m());function T(){if(!(!o||!t||document.hidden))for(d<t.currentTime-.1&&(d=t.currentTime+.035);d<t.currentTime+.16;)Hp(t,n,u++,d,v),d+=Up,h++}function E(){o=!1;const C=++c;if(clearInterval(s),clearTimeout(r),t&&t.state!=="closed"){n.gain.cancelScheduledValues(t.currentTime),n.gain.setTargetAtTime(0,t.currentTime,.015);for(const L of g)try{L.stop(t.currentTime+.05)}catch{}r=setTimeout(()=>{C===c&&!o&&t.state!=="closed"&&t.suspend().then(p).catch(()=>{})},70)}p()}async function x(){if(l||!i||!a||document.hidden||o)return;clearTimeout(r);const C=++c;try{if(!t){const L=window.AudioContext||window.webkitAudioContext;t=new L,n=t.createGain(),n.gain.value=0,n.connect(t.destination)}if(await t.resume(),l||C!==c||!i||document.hidden)return;f=null,o=!0,n.gain.cancelScheduledValues(t.currentTime),n.gain.setTargetAtTime(.28,t.currentTime,.07),d=t.currentTime+.035,T(),clearInterval(s),s=setInterval(T,90),p()}catch(L){f=L.message,o=!1,p()}}function R(){document.hidden?E():x()}return document.addEventListener("visibilitychange",R),{info:m,unlock(){l||(a=!0,x())},setEnabled(C){i=!!C,i?x():E(),p()},dispose(){l=!0,o=!1,c++,clearInterval(s),clearTimeout(r),document.removeEventListener("visibilitychange",R);for(const C of g)try{C.stop()}catch{}g.clear(),t&&t.state!=="closed"&&t.close().catch(()=>{})}}}const Fh=Object.freeze([{id:"burger",name:"Classic burger",emoji:"🍔",color:"#deaa64",category:"burgers"},{id:"icecream",name:"Ice cream",emoji:"🍦",color:"#f2b5c9",category:"treats"},{id:"smoothie",name:"Smoothie",emoji:"🥤",color:"#db87a4",category:"treats"},{id:"fries",name:"Fries",emoji:"🍟",color:"#eac151",category:"sides"},{id:"pizza",name:"Pizza",emoji:"🍕",color:"#eebd70",category:"sides"},{id:"donut",name:"Donut",emoji:"🍩",color:"#c98a64",category:"bakery"},{id:"doubleburger",name:"Double cheeseburger",emoji:"🍔",color:"#c88b43",category:"burgers"},{id:"chickenburger",name:"Chicken burger",emoji:"🍔",color:"#e8ba70",category:"burgers"},{id:"veggieburger",name:"Veggie burger",emoji:"🍔",color:"#86ae63",category:"burgers"},{id:"espresso",name:"Espresso",emoji:"☕",color:"#805643",category:"coffee"},{id:"latte",name:"Latte",emoji:"☕",color:"#c39b74",category:"coffee"},{id:"cappuccino",name:"Cappuccino",emoji:"☕",color:"#dac2a0",category:"coffee"},{id:"croissant",name:"Croissant",emoji:"🥐",color:"#dba252",category:"bakery"},{id:"muffin",name:"Blueberry muffin",emoji:"🧁",color:"#a38bac",category:"bakery"},{id:"cinnamonroll",name:"Cinnamon roll",emoji:"🥮",color:"#cc9167",category:"bakery"},{id:"spaghetti",name:"Spaghetti",emoji:"🍝",color:"#e1b953",category:"pasta"},{id:"penne",name:"Penne pasta",emoji:"🍝",color:"#e1a35c",category:"pasta"}].map(Object.freeze)),Gp=Object.freeze([["burgers"],["coffee"],["bakery"],["pasta"],["treats","sides"]].map(Object.freeze)),Jl=Object.freeze([{id:"starter",name:"Starter",description:"Add prices, multiply matching pairs, and count whole dollars with a full drawer.",itemsLabel:"2 items · pairs · full drawer"},{id:"shopkeeper",name:"Shopkeeper",description:"Multiply pairs and triples and give dollar change. Each customer has a new drawer with two or three money types missing.",itemsLabel:"3 items · pairs & triples · 2–3 missing"},{id:"expert",name:"Money master",description:"Multiply matching items and practise dollars and cents. Each customer has a new drawer with four or five money types missing.",itemsLabel:"3–4 items · multiplication & cents · 4–5 missing"}].map(Object.freeze)),Xn=Object.freeze([{cents:1e4,label:"$100",kind:"note",color:"#98cba7"},{cents:5e3,label:"$50",kind:"note",color:"#efce70"},{cents:2e3,label:"$20",kind:"note",color:"#eca878"},{cents:1e3,label:"$10",kind:"note",color:"#9bc5e6"},{cents:500,label:"$5",kind:"note",color:"#d5b0d6"},{cents:200,label:"$2",kind:"coin",color:"#e9c865"},{cents:100,label:"$1",kind:"coin",color:"#e9c865"},{cents:50,label:"50c",kind:"coin",color:"#cbd2d7"},{cents:20,label:"20c",kind:"coin",color:"#cbd2d7"},{cents:10,label:"10c",kind:"coin",color:"#cbd2d7"},{cents:5,label:"5c",kind:"coin",color:"#cbd2d7"}].map(Object.freeze)),Bh=5,Wp=1e3,Yu=30,$p=Object.freeze([{name:"Benny Bear",emoji:"🐻",kind:"bear",greeting:"Hello! My food smells delicious. Can you check my order?"},{name:"Poppy Bunny",emoji:"🐰",kind:"bunny",greeting:"I am ready for a tasty lunch. Thank you!"},{name:"Felix Fox",emoji:"🦊",kind:"fox",greeting:"Hello, cashier! Could you add up my food order?"},{name:"Pip Penguin",emoji:"🐧",kind:"penguin",greeting:"What a lovely place for a snack. Here is my order!"},{name:"Coco Cat",emoji:"🐱",kind:"cat",greeting:"My friends and I are sharing a meal. Can you help me pay?"}].map(Object.freeze)),Kc=Object.freeze([{id:"restaurant",name:"Sunny Bites",description:"Serve food to friendly animal customers.",catalog:Fh,customers:$p}].map(Object.freeze)),Xp=Object.freeze([]);function qp(i){const e=[];function t(n,s){if(s.length===i){const r=new Set(s);e.push({missing:s,available:Xn.map(({cents:a})=>a).filter(a=>!r.has(a))});return}for(let r=n;r<=Xn.length-(i-s.length);r+=1)t(r+1,[...s,Xn[r].cents])}return t(0,[]),e}const Yp=new Map([2,3,4,5].map(i=>[i,qp(i)]));function kh(i){return Jl.some(({id:e})=>e===i)?i:"starter"}function Zl(i){return Kc.find(({id:e})=>e===i)??Kc[0]}function ra(i){const e=(i==null?void 0:i.order)??i;if(!Array.isArray(e==null?void 0:e.drawerDenominations))return Xn;const t=new Set(e.drawerDenominations);return Object.freeze(Xn.filter(({cents:n})=>t.has(n)))}function ko(i){const e=(i==null?void 0:i.order)??i;if(!Array.isArray(e==null?void 0:e.drawerDenominations))return Xp;const t=new Set(e.drawerDenominations);return Object.freeze(Xn.filter(({cents:n})=>!t.has(n)))}function zh(i,e){return ra(i).some(t=>t.cents===e)}function Ii(i,e,t){const n=Number(t()),s=Number.isFinite(n)?Math.min(1-Number.EPSILON,Math.max(0,n)):0;return i+Math.floor(s*(e-i+1))}function Kp(i,e){if(i===0)return!0;const t=i/5,n=e.filter(r=>r<=i).map(r=>r/5),s=new Uint8Array(t+1).fill(Yu+1);s[0]=0;for(let r=1;r<=t;r+=1)for(const a of n)a<=r&&(s[r]=Math.min(s[r],s[r-a]+1));return s[t]<=Yu}function jp(i,e,t,n){if(i==="starter")return Object.freeze(Xn.map(({cents:u})=>u));const s=i==="expert"?Ii(4,5,n):Ii(2,3,n),r=Yp.get(s),a=e>0?Math.min(e,500):500,o=u=>u.missing.some(h=>h<=a),l=r.filter(o),c=new Set,d=u=>c.has(u)?!1:(c.add(u),Kp(e,u.available));for(let u=0;u<16&&l.length;u+=1){const h=l[(Ii(0,l.length-1,n)+t)%l.length];if(d(h))return Object.freeze([...h.available])}for(const u of[l,r])for(const h of u)if(d(h))return Object.freeze([...h.available]);throw new Error("No solvable drawer for this order.")}function bn(i,e){return{type:i,text:e}}function Jp(i){return i.selectedMoney.reduce((e,t)=>e+t,0)}function Hh(i){return i.order.items.every(({lineId:e})=>i.scanned.includes(e))}function Zp(i,e,t){const n=e%Bh;return i==="starter"?n%2===0?[2]:[1,1]:n===1?Array(t).fill(1):n===2||n===4?t===4?[3,1]:[3]:n===3&&t===4?[2,2]:t===4?[2,1,1]:[2,1]}function Ut(i){if(!Number.isSafeInteger(i))throw new TypeError("Money must be safe integer cents.");const e=Math.abs(i);return`${i<0?"-":""}$${Math.floor(e/100)}.${String(e%100).padStart(2,"0")}`}function Vh(i){if(typeof i!="string")return null;const e=/^\$?(\d+)(?:\.(\d{1,2}))?$/.exec(i.trim());if(!e)return null;const n=Number(e[1])*100+Number((e[2]||"").padEnd(2,"0"));return Number.isSafeInteger(n)?n:null}function Gh(i,e=0,t=Math.random,n="restaurant"){const s=kh(i),r=Zl(n),a=Number.isSafeInteger(e)&&e>=0?e:0,o=s==="starter"&&a===0,l=s==="starter"?2:s==="expert"?Ii(3,4,t):3,c=[...r.catalog],d=`${r.id}-${s}-${a}`,u=[];for(const p of Zp(s,a,l)){const T=Gp[a%Bh],E=c.filter(({category:O})=>u.length===0?T.includes(O):O!==u[0].category),x=E[Ii(0,E.length-1,t)],R=c.indexOf(x),C=c.splice(R,1)[0],L=o?200:s==="starter"?Ii(1,5,t)*100:s==="shopkeeper"?Ii(1,8,t)*100:Ii(20,160,t)*5;for(let O=0;O<p;O+=1)u.push({lineId:`${d}-${u.length}`,productId:C.id,name:C.name,emoji:C.emoji,color:C.color,...C.category?{category:C.category}:{},priceCents:L})}const h=u.reduce((p,T)=>p+T.priceCents,0),f=(s==="starter"?[500,1e3,2e3]:[500,1e3,2e3,5e3]).filter(p=>p>=h),g=Ii(0,Math.min(1,f.length-1),t),v=o?1e3:f[g],m=v-h;return{id:d,sceneId:r.id,customer:{...r.customers[a%r.customers.length]},items:u,totalCents:h,paidCents:v,changeCents:m,drawerDenominations:jp(s,m,a,t)}}function Ql(i="starter",e=Math.random,t="restaurant"){const n=kh(i),s=Zl(t);return{levelId:n,sceneId:s.id,round:0,phase:"unload",order:Gh(n,0,e,s.id),scanned:[],answer:"",selectedMoney:[],paymentAccepted:!1,drawerOpened:!1,feedback:null,completed:0,attempts:{total:0,change:0}}}function jc(i){return i.phase!=="unload"?i:{...i,phase:"scan",feedback:bn("info",`${i.order.customer.name}'s food is ready at the counter. Check each item to build the bill.`)}}function Qp(i,e){if(i.phase!=="scan"||i.scanned.includes(e))return i;const t=i.order.items.find(r=>r.lineId===e);if(!t)return i;const n=[...i.scanned,e],s=n.length===i.order.items.length;return{...i,scanned:n,phase:s?"total":"scan",feedback:s?bn("success","Everything is scanned! Multiply matching food items by their unit price, then add the groups."):bn("info",`${t.name} scanned for ${Ut(t.priceCents)}. Scan the next food item!`)}}function Wh(i,e){if(i.phase!=="total"||!Hh(i))return i;const t=typeof e=="string"?e:"",n=Vh(t),s={...i.attempts,total:i.attempts.total+1};if(n===null)return{...i,answer:t,attempts:s,feedback:bn("try","Type a money amount using digits, with up to two digits after a decimal point. You can try again!")};if(n!==i.order.totalCents){const r=n>i.order.totalCents?"too-high":"too-low";return{...i,answer:t,attempts:s,feedback:{...bn("try",`That total is ${r==="too-high"?"too high":"too low"}. Check each quantity × price, then add the groups and try again.`),totalDirection:r}}}return{...i,answer:t,attempts:s,phase:"payment",feedback:bn("success",`That is right! The total is ${Ut(n)}. ${i.order.customer.name} offers ${Ut(i.order.paidCents)}. Take the payment before choosing the change.`)}}function em(i){return i.phase!=="payment"||i.paymentAccepted||!Hh(i)||Vh(i.answer)!==i.order.totalCents?i:{...i,phase:"drawer",paymentAccepted:!0,drawerOpened:!1,feedback:bn("success",`You have taken ${Ut(i.order.paidCents)}. Open the cash drawer, then count out the change for ${i.order.customer.name}.`)}}function tm(i){return i.phase!=="drawer"||!i.paymentAccepted||i.drawerOpened?i:{...i,phase:"change",drawerOpened:!0,feedback:bn("info",`The cash drawer is open. Choose the notes and coins to give ${i.order.customer.name} the exact change.`)}}function nm(i,e){if(i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened||!zh(i,e))return i;if(i.selectedMoney.length>=Wp)return{...i,feedback:bn("info","Your change tray is full. Put some money back, or clear the tray and count again.")};const t=[...i.selectedMoney,e];return{...i,selectedMoney:t,feedback:bn("info","Money added. Count your notes and coins. Tap picked money to put one piece back.")}}function im(i,e){if(i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened||!Number.isInteger(e)||e<0||e>=i.selectedMoney.length)return i;const t=i.selectedMoney.filter((n,s)=>s!==e);return{...i,selectedMoney:t,feedback:bn("info","One piece put back. Count the notes and coins left in your tray.")}}function sm(i){return i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened?i:{...i,selectedMoney:[],feedback:bn("info","Your change tray is empty. Count up from the total to the amount paid.")}}function rm(i){if(i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened||!i.selectedMoney.every(n=>zh(i,n)))return i;const e=Jp(i),t={...i.attempts,change:i.attempts.change+1};if(e!==i.order.changeCents){const n=e<i.order.changeCents;return{...i,attempts:t,feedback:{...bn("try",`That is ${n?"a little short":"a little too much"}. Count up from ${Ut(i.order.totalCents)} to ${Ut(i.order.paidCents)}, then try again.`),changeDirection:n?"too-little":"too-much"}}}return{...i,attempts:t,phase:"success",drawerOpened:!1,completed:i.completed+1,feedback:bn("success",`Correct change! Thank you for helping ${i.order.customer.name}. You earned a service stamp!`)}}function $h(i,e=Math.random){if(i.phase!=="success")return i;const t=i.round+1,n=Zl(i.sceneId);return{...i,sceneId:n.id,round:t,phase:"unload",order:Gh(i.levelId,t,e,n.id),scanned:[],answer:"",selectedMoney:[],paymentAccepted:!1,drawerOpened:!1,feedback:null,attempts:{total:0,change:0}}}function am(i){return i.phase==="finished"?i:{...i,phase:"finished",drawerOpened:!1,feedback:bn("info","Time is up! Your shift is complete. See how many customers you served.")}}const om="Kokoro-82M",eu=Object.freeze({bear:Object.freeze({voice:"am_puck",lang:"a",speed:.94,pitch:1}),bunny:Object.freeze({voice:"af_bella",lang:"a",speed:1.02,pitch:1}),fox:Object.freeze({voice:"am_fenrir",lang:"a",speed:1,pitch:1}),penguin:Object.freeze({voice:"af_sarah",lang:"a",speed:.96,pitch:1}),cat:Object.freeze({voice:"af_nicole",lang:"a",speed:.98,pitch:1})}),Ku=Object.freeze({"too-little":"That is too little change. Please add some more.","too-much":"That is too much change. Please take some back."}),ju=Object.freeze({"too-low":"That total is too low. Please try again.","too-high":"That total is too high. Please try again."}),Jc=Object.freeze({bear:{restless:"My tummy is starting to rumble…",impatient:"Oh dear, my food is getting cold.",exhausted:"That was a very long wait for a hungry bear.",happy:"Wonderful! A big bear thank-you!",relieved:"Phew! Lunch at last. Thank you!",tired:"Thanks. This bear needs lunch and a rest."},bunny:{restless:"My paws are getting a little fidgety…",impatient:"Could we hop along a bit faster, please?",exhausted:"My ears have drooped. I’ve waited so long.",happy:"Hooray! A happy hop for you!",relieved:"Phew! Ready to hop home. Thank you!",tired:"Thank you. I’m too tired for a happy hop."},fox:{restless:"Hmm… are we nearly ready?",impatient:"My lunch break is slipping away!",exhausted:"I really wish that had been quicker.",happy:"Lovely work, clever cashier!",relieved:"All sorted at last. Thanks!",tired:"Thanks. I’d better hurry along now."},penguin:{restless:"Waddle, waddle… still waiting!",impatient:"My flippers are getting restless.",exhausted:"That was a long time standing on these feet.",happy:"Flippers up! Thank you so much!",relieved:"Phew! Time to waddle home. Thanks!",tired:"Thanks. A slow waddle home for me."},cat:{restless:"Mrr… is my order almost ready?",impatient:"My whiskers are twitching. Please hurry!",exhausted:"I’ve waited so long I need a catnap.",happy:"Purr-fect! Thank you, cashier!",relieved:"At last! A little purr of thanks.",tired:"Thank you. Now I need a catnap."}}),cm=Object.freeze({bear:"A big bear thank-you!",bunny:"Hooray! Kisses and happy hops!",fox:"Lovely work, clever cashier!",penguin:"Flippers up! Thank you!",cat:"Purr-fect! Kisses for you!"}),lm=Object.freeze({unload:"Hello! Here’s my takeaway order.",scan:"Hello! Here’s my takeaway order.",total:"How much do I owe you?",drawer:"My change, please!",change:"My change, please!",finished:"See you on your next shift!"});function lr(i){const e=typeof i=="string"?i.toLowerCase():"bear";return Object.hasOwn(eu,e)?e:"bear"}function Ju(i="bear",e="happy"){const t=lr(i),n=e==="tired"||e==="exhausted"?.96:e==="impatient"||e==="restless"?1.035:1;return{character:t,...eu[t],playbackRate:n,rate:n}}function ur(i){return typeof i=="string"&&Object.hasOwn(Ku,i)?Ku[i]:""}function dr(i){return typeof i=="string"&&Object.hasOwn(ju,i)?ju[i]:""}function um(i,e){return Jc[lr(i)][e]||Jc[lr(i)].happy}function Ss({phase:i,kind:e="bear",mood:t="calm",paidCents:n=1e3,emotion:s="happy",delivered:r=!1,changeCents:a=1,changeDirection:o=null,totalDirection:l=null}={}){const c=lr(e);return i==="total"&&dr(l)?dr(l):i==="change"&&ur(o)?ur(o):i==="success"?r?s==="tired"?"Thank you. Time for a rest!":s==="relieved"?"Phew! Thank you so much!":cm[c]:`My ${a===0?"bag and receipt":"bag, receipt, and change"}, please!`:["scan","total","payment","drawer","change"].includes(i)&&["restless","impatient","exhausted"].includes(t)?`${i==="payment"?`Here’s ${Ut(n)}. `:""}${um(c,t)}`:i==="payment"?`Here’s ${Ut(n)}. Thank you!`:lm[i]||""}function dm(i){let e=2166136261;for(let t=0;t<i.length;t+=1)e=Math.imul(e^i.charCodeAt(t),16777619);return(e>>>0).toString(16).padStart(8,"0")}function hm(i,e){return`audio/kokoro/${lr(i)}/${dm(e)}.mp3`}function fm(i,e,t="/"){return`${String(t||"/").replace(/\/?$/,"/")}${hm(i,e)}`}function pm(i="bear"){const e=lr(i),t=new Set(Object.values(Jc[e]));for(const n of["unload","scan","total","drawer","change","finished"])t.add(Ss({phase:n,kind:e}));for(const n of["calm","restless","impatient","exhausted"])for(const s of[500,1e3,2e3,5e3])t.add(Ss({phase:"payment",kind:e,mood:n,paidCents:s}));for(const n of["happy","relieved","tired"])t.add(Ss({phase:"success",kind:e,emotion:n,delivered:!0}));for(const n of[0,1])t.add(Ss({phase:"success",kind:e,changeCents:n}));for(const n of["too-little","too-much"])t.add(Ss({phase:"change",kind:e,changeDirection:n}));for(const n of["too-low","too-high"])t.add(Ss({phase:"total",kind:e,totalDirection:n}));return[...t]}const mm=Object.freeze({"too-little":[392,523.25,659.25],"too-much":[659.25,523.25,392]}),gm=Object.freeze([190,140]),_m=new Map(Object.keys(eu).map(i=>[i,new Set(pm(i))]));function vm({isEnabled:i=()=>!0,onStateChange:e=()=>{},baseURL:t="./"}={}){const n=globalThis.Audio,s=globalThis.AudioContext||globalThis.webkitAudioContext;let r,a,o,l=[],c=!1,d=0,u=null,h=null,f="",g=0,v=0,m=0,p=0,T=0,E=0,x=0,R="idle",C="idle",L=null,O=null,b=!1,M="bear",N="happy",F="dialogue",V=Ju(M,N),Z=null,ee=null;const ne=new Set,ie=()=>!c&&!!(typeof i=="function"?i():i),q=typeof n=="function",pe=()=>({enabled:ie(),disposed:c,direction:u,totalDirection:h,line:f,playCount:g,totalPlayCount:v,dialogueCount:m,audioPlayCount:p,speechRequestCount:T,speechStartCount:E,cancelCount:x,audioActive:ne.size>0&&(r==null?void 0:r.state)==="running",audioStatus:R,audioContextState:(r==null?void 0:r.state)??"not-started",speechStatus:C,speechAvailable:q,voiceName:L,audioError:Z,speechError:ee,speechActive:b&&ie(),speechBoundary:0,speechCharIndex:0,boundarySource:"none",character:M,mood:N,kind:F,rate:V.playbackRate,pitch:V.pitch,voiceSpeed:V.speed,engine:om,clipURL:O}),me=()=>e(pe());function Ve(){clearTimeout(o),o=void 0,b=!1;const K=a;if(K){a=void 0;for(const[_e,ye]of l)K.removeEventListener(_e,ye);l=[];try{K.pause()}catch{}try{K.currentTime=0}catch{}try{K.removeAttribute("src"),K.load()}catch{}}}function st(){for(const K of ne){K.oscillator.onended=null;try{K.gain.gain.cancelScheduledValues(r.currentTime),K.gain.gain.setValueAtTime(0,r.currentTime),K.oscillator.stop(r.currentTime)}catch{}K.oscillator.disconnect(),K.gain.disconnect()}ne.clear()}function _t(K="cancelled"){d+=1,(a||ne.size||R==="resuming")&&(x+=1),Ve(),st(),R=K,C=K}async function St(K,_e,ye=!1){if(!s){R="unavailable",me();return}try{if((!r||r.state==="closed")&&(r=new s),R="resuming",me(),await r.resume(),K!==d||c)return;if(!ie()){_t("muted"),me();return}if(r.state!=="running")throw new Error("Audio could not start.");const Ie=r.currentTime+.012;for(const[Ze,Mt]of(ye?gm:mm[_e]).entries()){const D=r.createOscillator(),lt=r.createGain(),je=Ie+Ze*(ye?.16:.13),Xe=ye?.105:Ze===2?.28:.2;D.type=ye?"square":"triangle",D.frequency.value=Mt,lt.gain.setValueAtTime(0,je),lt.gain.linearRampToValueAtTime(ye?.11:.16,je+.018),lt.gain.exponentialRampToValueAtTime(1e-4,je+Xe),D.connect(lt).connect(r.destination);const Te={oscillator:D,gain:lt};ne.add(Te),D.onended=()=>{ne.delete(Te),D.disconnect(),lt.disconnect(),K===d&&!ne.size&&(R="ended",me())},D.start(je),D.stop(je+Xe+.015)}p+=1,R="playing",me()}catch(Ie){if(K!==d||c)return;st(),R="error",Z=(Ie==null?void 0:Ie.message)||"Audio is unavailable.",me()}}function ft(K){var _e;if(!q){C="unavailable",ee="Kokoro recordings cannot play on this device.",me();return}if(!((_e=_m.get(M))!=null&&_e.has(f))){C="unavailable",ee="This line is not in the Kokoro dialogue catalog.",me();return}try{const ye=new n(O);let Ie=!1;a=ye,ye.preload="auto",ye.volume=1,ye.playbackRate=V.playbackRate,ye.preservesPitch=!0;const Ze=()=>K!==d||ye!==a||c?!1:ie()?!0:(_t("muted"),me(),!1),Mt=(Te,Qe)=>{Ze()&&(Ve(),C=Te,ee=Qe,me())},D=(Te,Qe,Ne)=>{clearTimeout(o),o=setTimeout(()=>{K!==d||ye!==a||C!==Te||Mt("unavailable",Ne)},Qe)},lt=(Te,Qe)=>{ye.addEventListener(Te,Qe),l.push([Te,Qe])};lt("playing",()=>{if(!Ze())return;Ie||(E+=1,Ie=!0),b=!0,C="speaking";const Te=Number.isFinite(ye.duration)?ye.duration*1e3/V.playbackRate+4e3:f.length*90/V.playbackRate+5e3;D("speaking",Math.min(2e4,Math.max(8e3,Math.ceil(Te))),"Kokoro playback did not finish on this device."),me()}),lt("pause",()=>{Ze()&&(clearTimeout(o),o=void 0,b=!1,C="paused",me())});const je=()=>{Ze()&&(b=!1,C="buffering",D("buffering",8e3,"Kokoro playback stopped loading."),me())};lt("waiting",je),lt("stalled",()=>{(ye.paused||ye.readyState<3)&&je()}),lt("ended",()=>{Ze()&&(Ve(),C="ended",me())}),lt("error",()=>{var Te;return Mt("error",`Kokoro recording could not play${(Te=ye.error)!=null&&Te.code?` (media error ${ye.error.code})`:""}.`)}),C="queued",D("queued",5e3,"Kokoro recording did not start on this device."),T+=1;const Xe=ye.play();Promise.resolve(Xe).then(()=>{if(K!==d||ye!==a||c){try{ye.pause()}catch{}return}ie()||(_t("muted"),me())},Te=>Mt("error",(Te==null?void 0:Te.message)||"Kokoro recording could not start.")),me()}catch(ye){if(K!==d||c)return;Ve(),C="error",ee=(ye==null?void 0:ye.message)||"Kokoro recording is unavailable.",me()}}function se(K,_e,ye=null,Ie=!1){_t(ie()?"idle":"muted"),u=Ie?null:ye,h=Ie?ye:null,f=K,N=typeof(_e==null?void 0:_e.mood)=="string"?_e.mood:"happy",F=Ie?"wrong-total":ye?"wrong-change":typeof(_e==null?void 0:_e.kind)=="string"?_e.kind:"dialogue",V=Ju(_e==null?void 0:_e.character,N),M=V.character,Z=ee=null,L=V.voice,O=fm(M,f,t)}return{info:pe,play(K,_e={}){if(c||!ur(K))return pe();if(se(ur(K),_e,K),!ie())return me(),pe();g+=1;const ye=d;return St(ye,K),ft(ye),pe()},playTotal(K,_e={}){if(c||!dr(K))return pe();if(se(dr(K),_e,K,!0),!ie())return me(),pe();v+=1;const ye=d;return St(ye,K,!0),ft(ye),pe()},speak(K,_e={}){return c||typeof K!="string"||!K.trim()?pe():(se(K.trim(),_e),ie()?(m+=1,ft(d),pe()):(me(),pe()))},cancel(){return c||(_t(ie()?"cancelled":"muted"),me()),pe()},dispose(){c||(_t("cancelled"),c=!0,r&&r.state!=="closed"&&r.close().catch(()=>{}),me())}}}const Zu=1550,tc=4200;function ym({getState:i,isPaused:e,onAdvance:t,onUpdate:n}){let s=null,r=0,a=performance.now(),o=!1,l=null,c=!1,d="";function u(){const p=!c&&s!==null&&i().phase==="success"&&i().order===s,T=p&&e(),E=p?r<650?"printing":r<Zu?"handing-over":"departing":"idle",x=p&&r>=Zu;return{active:p,paused:T,stage:E,elapsedMs:r,remainingMs:p?Math.max(0,tc-r):0,receiptDelivered:x,changeDelivered:x,bagDelivered:x,handoverDelivered:x}}function h(p=!1){const T=u(),E=`${T.stage}:${T.paused}:${Math.ceil(T.remainingMs/1e3)}`;(p||E!==d)&&(d=E,n==null||n(T))}function f(){clearInterval(l),l=null,s=null,r=0}function g(){if(c)return;if(!u().active){f(),h();return}const p=performance.now(),T=e();if(!T&&!o&&(r=Math.min(tc,r+Math.max(0,p-a))),a=p,o=T,r>=tc){f(),t();return}h()}function v(p,T){if(T.phase!=="success"){f();return}s!==T.order&&(f(),s=T.order,r=0,a=performance.now(),o=e(),d="",l=setInterval(g,50))}function m(){a=performance.now(),o=e(),h(!0)}return{info:u,sync:v,tick:g,pauseChanged:m,paint:h,dispose(){c=!0,f()}}}const xm=new Map([["Mia",15e4],["Leo",105e3],["Aunty Jo",18e4],["Sam",12e4],["Grandpa Ben",21e4],["Benny Bear",15e4],["Poppy Bunny",105e3],["Felix Fox",18e4],["Pip Penguin",12e4],["Coco Cat",21e4]]);function Qu(i,e="starter"){var s;const t=typeof((s=i==null?void 0:i.customer)==null?void 0:s.name)=="string"?i.customer.name.trim():"Customer",n=e==="expert"?6e4:e==="shopkeeper"?3e4:0;return{customerKey:`${(i==null?void 0:i.id)??"order"}:${t}`,budgetMs:(xm.get(t)??15e4)+n,elapsedMs:0}}function Mm(i,e){if(!Number.isFinite(e)||e<=0||i.elapsedMs>=i.budgetMs)return i;const t=i.budgetMs-i.elapsedMs;return{...i,elapsedMs:i.elapsedMs+Math.min(e,t)}}function Xh(i){const e=Math.max(0,i.budgetMs-i.elapsedMs),t=e/i.budgetMs,n=e===0?"exhausted":t<=.2?"impatient":t<=.5?"restless":"calm";return{remainingMs:e,remainingSeconds:Math.ceil(e/1e3),ratio:t,mood:n}}function qh(i,e=!0){if(!e)return{tier:"practice",delta:50,label:"Practice checkout"};const{ratio:t}=Xh(i);return t>.5?{tier:"fast",delta:100,label:"Speedy service"}:t>.2?{tier:"steady",delta:60,label:"Good pace"}:t>0?{tier:"close",delta:20,label:"Just in time"}:{tier:"late",delta:-25,label:"Long wait"}}function Yh(){return{points:0,results:[]}}function Sm(i,e,t){return i.results.some(n=>n.customerKey===e)?i:{points:i.points+t.delta,results:[...i.results,{customerKey:e,...t}]}}const tu=i=>`${i<0?"−":"+"}${Math.abs(i)}`,Kh=i=>String(i).replace("-","−");function jh(){return'<span class="service-preview" data-score-preview><span data-score-preview-label>Finish now</span><b data-score-preview-points></b></span>'}function bm(i){const e=qh(i,i.enabled),t=["success","finished"].includes(i.phase),n=i.enabled?i.phase==="unload"?"Fast service":e.tier==="late"?"Late service":"Finish now":"Each checkout";for(const s of document.querySelectorAll("[data-score-preview]"))s.hidden=t,s.dataset.scoreTier=e.tier,s.querySelector("[data-score-preview-label]").textContent=n,s.querySelector("[data-score-preview-points]").textContent=`${tu(e.delta)} pts`,s.setAttribute("aria-label",`${n}: ${e.delta<0?"lose":"earn"} ${Math.abs(e.delta)} points when this checkout is complete.`)}function Tm(i){if(!i)return"";const e=i.tier==="late"?"Time ran out. Serve the next customer sooner to earn points back.":i.tier==="practice"?"Relaxed practice · no time bonus or penalty.":"Correct change, delivered on time.";return`<div class="service-result" data-score-tier="${i.tier}" role="status"><span class="service-result-symbol" aria-hidden="true">${i.delta<0?"−":"★"}</span><div><span class="service-result-label">${i.label}</span><strong class="service-points">${tu(i.delta)} <small>points</small></strong></div><p>${e}</p></div>`}function Em(i){const e=i.results.filter(s=>s.tier==="fast").length,t=i.results.filter(s=>s.tier==="late").length,n=i.results.every(s=>s.tier==="practice");return`<div class="shift-result" data-shift-result><span>YOUR SHIFT SCORE</span><strong>${Kh(i.points)} <small>points</small></strong><p>${n?`${i.results.length} practice checkouts completed`:`${e} speedy ${e===1?"checkout":"checkouts"} · ${t} late ${t===1?"checkout":"checkouts"}`}</p></div>`}function wm(){var i,e;matchMedia("(prefers-reduced-motion: reduce)").matches||((i=document.querySelector(".service-result"))==null||i.animate([{opacity:0,transform:"translateY(6px) scale(.97)"},{opacity:1,transform:"translateY(0) scale(1)"}],{duration:340,easing:"ease-out"}),(e=document.getElementById("shift-score"))==null||e.animate([{transform:"scale(1)"},{transform:"scale(1.12)",offset:.4},{transform:"scale(1)"}],{duration:500,easing:"ease-out"}))}const ed=new Set(["scan","total","payment","drawer","change"]),Am={calm:"Patient",restless:"Getting restless",impatient:"Impatient",exhausted:"Very impatient"},Jh='<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 5.5V10l3 2"/></svg>',Rm=i=>`${Math.floor(i/60)}:${String(i%60).padStart(2,"0")}`;function Cm(){return`<div class="patience-widget" data-patience-widget><div class="patience-heading"><span data-patience-label>Patient</span><span class="patience-clock">${Jh}<b data-patience-time></b></span></div><div class="patience-meter" role="meter" aria-label="Customer patience" aria-valuemin="0"><i></i></div>${jh()}</div>`}function Zh(i=""){return`<span class="patience-badge ${i}" data-patience-badge>${Jh}<b data-patience-time></b><span data-patience-label>Patient</span>${jh()}</span>`}function Pm({getState:i,getView:e,isEnabled:t,onMoodChange:n}){let s=Qu(i().order,i().levelId),r=performance.now(),a="",o=!1;const l=()=>{var p;return document.hidden||!!((p=document.getElementById("settings"))!=null&&p.open)};let c=l();function d(){const p=i(),T=Xh(s),E=t(),x=ed.has(p.phase),R=E&&x&&l();return{...s,...T,enabled:E,paused:R,running:E&&x&&!R&&T.remainingMs>0,phase:p.phase}}function u(){const p=d();return p.enabled&&ed.has(p.phase)?p.mood:"calm"}function h(p=!1){if(o)return;const T=d(),E=["success","finished"].includes(T.phase),x=T.enabled?E?"served":T.paused?"paused":T.phase==="unload"?"ready":T.mood:"relaxed",R={relaxed:"Relaxed",served:"Served",paused:"Paused",ready:"Ready to serve"}[x]??Am[T.mood],C=T.enabled?E?"✓":Rm(T.remainingSeconds):"∞",L=`${T.customerKey}:${x}:${C}`;if(!(!p&&L===a)){a=L;for(const O of document.querySelectorAll("[data-patience-widget], [data-patience-badge]")){O.dataset.patienceMood=u(),O.dataset.patienceStatus=x,O.querySelector("[data-patience-time]").textContent=C,O.querySelector("[data-patience-label]").textContent=R,O.setAttribute("aria-label",`${i().order.customer.name}: ${R}${T.enabled&&!E?`, ${T.remainingSeconds} seconds of patience remaining`:""}`);const b=O.querySelector(".patience-meter");b&&(b.hidden=!T.enabled||E,b.setAttribute("aria-valuemax",String(T.budgetMs/1e3)),b.setAttribute("aria-valuenow",String(T.remainingSeconds)),b.setAttribute("aria-valuetext",`${R}, ${C} remaining`),b.querySelector("i").style.width=`${T.ratio*100}%`)}bm(T)}}function f(){var R,C;if(o)return;const p=performance.now(),T=Math.max(0,p-r);r=p;const E=d();E.running&&(s=Mm(s,T));const x=d();x.mood!==E.mood?((C=(R=e())==null?void 0:R.setPatience)==null||C.call(R,u()),n(x.mood),h(!0)):h()}function g(p,T){var E,x;p.order!==T.order&&(s=Qu(T.order,T.levelId),document.getElementById("patience-announcer").textContent=""),r=performance.now(),a="",(x=(E=e())==null?void 0:E.setPatience)==null||x.call(E,u())}function v(){const p=l();p!==c&&(r=performance.now()),c=p,h(!0)}const m=window.setInterval(f,250);return document.addEventListener("visibilitychange",v),document.getElementById("settings").addEventListener("close",v),{info:d,render:h,tick:f,sync:g,pauseChanged:v,dispose(){var p;o=!0,clearInterval(m),document.removeEventListener("visibilitychange",v),(p=document.getElementById("settings"))==null||p.removeEventListener("close",v)}}}const Im=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);let aa=[];function Lm(i){if(!["too-high","too-low"].includes(i)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".total-feedback-symbol");e!=null&&e.animate&&aa.push(e.animate([{transform:"scale(.7)"},{transform:"scale(1.2)",offset:.45},{transform:"scale(1)"}],{duration:360,easing:"ease-out"}));const t=document.querySelector(".total-entry .money-input");t!=null&&t.animate&&aa.push(t.animate([{transform:"translateX(0)"},{transform:"translateX(-3px)",offset:.2},{transform:"translateX(3px)",offset:.4},{transform:"translateX(-2px)",offset:.6},{transform:"translateX(2px)",offset:.8},{transform:"translateX(0)"}],{duration:320,easing:"ease-out"}))}function Dm(i){if(!["too-little","too-much"].includes(i)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.getElementById("pos-register"),t=(s,r,a)=>{s!=null&&s.animate&&aa.push(s.animate(r,{duration:a,easing:"ease-out"}))},n=e.querySelector(".change-feedback-symbol");if(i==="too-little")t(n,[{transform:"translateY(0)"},{transform:"translateY(-7px)",offset:.3},{transform:"translateY(2px)",offset:.6},{transform:"translateY(0)"}],620),t(e.querySelector(".cash-drawer"),[{boxShadow:"0 0 0 0 #e7b94b00"},{boxShadow:"0 0 0 4px #e7b94ba6, 0 0 22px #e7b94b65",offset:.35},{boxShadow:"0 0 0 0 #e7b94b00"}],820);else{t(e.querySelector("#change-preview"),[{transform:"translateX(0)"},{transform:"translateX(-5px)",offset:.2},{transform:"translateX(5px)",offset:.4},{transform:"translateX(-3px)",offset:.6},{transform:"translateX(3px)",offset:.8},{transform:"translateX(0)"}],460);for(const s of e.querySelectorAll(".piece-minus"))t(s,[{transform:"scale(1)"},{transform:"scale(1.28)",offset:.45},{transform:"scale(1)"}],660)}}function Nm(){return`<div class="pos-neck" aria-hidden="true"><i></i></div>
    <div class="pos-console">
      <div class="receipt-printer" aria-label="Receipt printer"><div class="printer-paper-window"><div id="printed-receipt" class="printed-receipt" aria-hidden="true"></div></div><div class="printer-slot" aria-hidden="true"></div><div class="printer-label"><span>THERMAL RECEIPT</span><i></i></div><div class="printer-vents" aria-hidden="true"></div></div>
      <div class="hardware-keypad" aria-label="Cash register number pad">${["7","8","9","4","5","6","1","2","3","⌫","0","."].map(i=>`<button data-key="${i}" aria-label="${i==="⌫"?"Delete last digit":i==="."?"Decimal point":i}" disabled>${i==="⌫"?"⌫":i}</button>`).join("")}</div>
      <div class="console-actions"><span class="hardware-label">CASH CONTROL</span><button id="hardware-total" data-action="total" disabled><span>↵</span>ENTER</button><div class="console-indicator"><i></i><span>POWER</span></div></div>
    </div>
    <section id="change-preview" class="change-preview" aria-label="Selected change tray" hidden></section>
    <div class="drawer-cabinet"><div class="drawer-cabinet-top" aria-hidden="true"><span>SUNNY POS · T-01</span><div class="cabinet-vents"></div></div><div id="cash-tray" class="drawer-slide" hidden></div><button class="register-base" id="drawer-open" disabled aria-label="Cash drawer is closed"><span class="drawer-lock" aria-hidden="true"><i></i></span><span class="drawer-front-handle"><span id="drawer-base-label">CASH DRAWER LOCKED</span></span><span class="drawer-open-light" aria-hidden="true"></span></button><div class="register-feet" aria-hidden="true"><i></i><i></i></div></div>`}function Qh(i){return`<span class="note-country">AUSTRALIA</span><span class="note-medallion" aria-hidden="true">✦</span><strong>${i.label}</strong><small>PLAY MONEY</small><span class="note-window" aria-hidden="true"></span>`}function Um(i){return`<div class="note-well"><button class="banknote physical-note" style="--money-color:${i.color}" data-money="${i.cents}" aria-label="Add ${i.label} note">${Qh(i)}</button><span class="note-clip" aria-hidden="true"></span><span class="well-label" aria-hidden="true">${i.label}</span></div>`}function td(i){return`<div class="${i.kind==="note"?"note":"coin"}-well empty-well" data-unavailable-money="${i.cents}" role="img" aria-label="${i.label} ${i.kind} unavailable for this customer"><span class="empty-slot-outline" aria-hidden="true"></span><span class="empty-slot-word" aria-hidden="true">EMPTY</span>${i.kind==="note"?'<span class="note-clip" aria-hidden="true"></span>':""}<span class="well-label" aria-hidden="true">${i.label}</span></div>`}function Om(i){const e=Math.min(i.count,5),t=i.kind==="note"?Qh(i):`<span class="coin-rim"></span><strong>${i.label}</strong><small>AUSTRALIA</small>`,n=i.kind==="note"?"banknote physical-note":`coin physical-coin ${i.cents>=100?"gold":"silver"} ${i.cents===50?"fifty-cent":""}`;return`<span class="selected-art money-stack" data-stack-layers="${e}" style="--stack-depth:${e}" aria-hidden="true">${Array.from({length:e},(s,r)=>`<span class="piece-layer ${n}" style="--money-color:${i.color};--layer:${r}">${t}</span>`).join("")}</span>`}function Fm(i,e){const t=i.selectedMoney,n=Xn.map(s=>({...s,count:t.filter(r=>r===s.cents).length,index:t.lastIndexOf(s.cents)})).filter(s=>s.count);return`<header class="change-preview-header"><div><span class="change-tray-eyebrow">COUNT, THEN HAND BACK</span><h2>Your change tray</h2><span id="selected-piece-count">${t.length} ${t.length===1?"piece":"pieces"} selected</span></div>${Zh()}</header>
    <div class="tray-calculation"><span>Cash <b>${Ut(i.order.paidCents)}</b></span><i>−</i><span>Bill <b>${Ut(i.order.totalCents)}</b></span><i>=</i><span class="tray-question">? change</span></div>
    <div class="selected-money" aria-label="Money selected for change">${n.length?n.map(s=>`<button class="change-piece ${s.kind}" data-remove="${s.index}" data-remove-value="${s.cents}" data-count="${s.count}" aria-label="Remove one ${s.label} ${s.kind}; ${s.count} selected"><span class="piece-minus" aria-hidden="true">−</span>${Om(s)}<span class="piece-count">${s.label} <b>× ${s.count}</b></span></button>`).join(""):'<div class="empty-change-tray"><span aria-hidden="true">＋</span><strong>Your tray is empty</strong><p>Pick notes and coins from the open drawer.</p></div>'}</div>
    <footer class="change-preview-footer">${e}<div class="change-tray-tools"><span>Tap a piece to put one back</span><button class="clear-tray" data-action="clear" ${t.length?"":"disabled"}>Clear tray</button></div><button class="primary-button" data-action="change">Give the change <span aria-hidden="true">→</span></button></footer>`}function Bm(i){return`<div class="coin-well"><button class="coin physical-coin ${i.cents>=100?"gold":"silver"} ${i.cents===50?"fifty-cent":""}" data-money="${i.cents}" aria-label="Add ${i.label} coin"><span class="coin-rim" aria-hidden="true"></span><strong>${i.label}</strong><small aria-hidden="true">AUSTRALIA</small></button><span class="well-label" aria-hidden="true">${i.label}</span></div>`}function km(i,e,t="",n=""){var g;for(const v of aa)v.cancel();aa=[];const s=i.phase==="change",r=new Set(ra(i).map(v=>v.cents)),a=ko(i),o=document.getElementById("cash-tray"),l=document.getElementById("pos-register");l.dataset.drawer=s?"open":"closed",l.dataset.phase=i.phase,s&&["too-little","too-much"].includes(n)?l.dataset.changeFeedback=n:delete l.dataset.changeFeedback,o.hidden=!s,o.classList.toggle("just-opened",s&&e),o.innerHTML=s?`<div class="cash-drawer" data-drawer-level="${i.levelId}"><div class="drawer-label"><span>CHOOSE THE EXACT CHANGE</span><span>${r.size} MONEY TYPES · AUD</span></div>${a.length?`<div class="drawer-challenge" data-drawer-challenge><span><b>EMPTY:</b> ${a.map(v=>v.label).join(" · ")}</span><strong>Find another combination</strong></div>`:""}<div class="banknotes">${Xn.filter(v=>v.kind==="note").map(v=>r.has(v.cents)?Um(v):td(v)).join("")}</div><div class="coins">${Xn.filter(v=>v.kind==="coin").map(v=>r.has(v.cents)?Bm(v):td(v)).join("")}</div></div>`:"";const c=document.getElementById("change-preview"),d=((g=c.querySelector(".selected-money"))==null?void 0:g.scrollTop)??0;c.hidden=!s,c.innerHTML=s?Fm(i,t):"",l.dataset.changeFeedback?c.dataset.feedbackAttempt=String(i.attempts.change):delete c.dataset.feedbackAttempt,s&&(c.querySelector(".selected-money").scrollTop=d);for(const v of l.querySelectorAll("[data-key]"))v.disabled=i.phase!=="total";document.getElementById("hardware-total").disabled=i.phase!=="total";const u=document.getElementById("printed-receipt"),h=i.phase==="success";u.classList.toggle("receipt-printed",h);const f="SUNNY BITES";u.innerHTML=h?`<strong>${f}</strong><span>CHECKOUT 01</span><hr>${i.order.items.map(v=>`<span>${Im(v.name)} <b>${Ut(v.priceCents)}</b></span>`).join("")}<hr><span>TOTAL <b>${Ut(i.order.totalCents)}</b></span><span>CASH <b>${Ut(i.order.paidCents)}</b></span><span>CHANGE <b>CHECKED ✓</b></span><div class="receipt-barcode"></div><em>Thank you. Come again!</em>`:`<strong>${f}</strong><span>YOUR RECEIPT</span><div class="receipt-barcode"></div>`}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const nu="180",zm=0,nd=1,Hm=2,ef=1,tf=2,Pi=3,Oi=0,Pn=1,Qn=2,rs=0,ar=1,id=2,sd=3,rd=4,Vm=5,Ts=100,Gm=101,Wm=102,$m=103,Xm=104,qm=200,Ym=201,Km=202,jm=203,Zc=204,Qc=205,Jm=206,Zm=207,Qm=208,eg=209,tg=210,ng=211,ig=212,sg=213,rg=214,el=0,tl=1,nl=2,hr=3,il=4,sl=5,rl=6,al=7,nf=0,ag=1,og=2,as=0,cg=1,lg=2,ug=3,sf=4,dg=5,hg=6,fg=7,ad="attached",pg="detached",rf=300,fr=301,pr=302,ol=303,cl=304,zo=306,mr=1e3,ss=1001,Ao=1002,Tn=1003,af=1004,Kr=1005,On=1006,vo=1007,Di=1008,pi=1009,of=1010,cf=1011,oa=1012,iu=1013,Rs=1014,ti=1015,va=1016,su=1017,ru=1018,ca=1020,lf=35902,uf=35899,df=1021,hf=1022,$n=1023,la=1026,ua=1027,au=1028,ou=1029,ff=1030,cu=1031,lu=1033,yo=33776,xo=33777,Mo=33778,So=33779,ll=35840,ul=35841,dl=35842,hl=35843,fl=36196,pl=37492,ml=37496,gl=37808,_l=37809,vl=37810,yl=37811,xl=37812,Ml=37813,Sl=37814,bl=37815,Tl=37816,El=37817,wl=37818,Al=37819,Rl=37820,Cl=37821,Pl=36492,Il=36494,Ll=36495,Dl=36283,Nl=36284,Ul=36285,Ol=36286,da=2300,ha=2301,nc=2302,od=2400,cd=2401,ld=2402,mg=2500,gg=0,pf=1,Fl=2,_g=3200,vg=3201,mf=0,yg=1,is="",Wt="srgb",wn="srgb-linear",Ro="linear",Nt="srgb",Fs=7680,ud=519,xg=512,Mg=513,Sg=514,gf=515,bg=516,Tg=517,Eg=518,wg=519,Bl=35044,dd="300 es",di=2e3,Co=2001;class Mr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let hd=1234567;const Zr=Math.PI/180,gr=180/Math.PI;function ii(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(gn[i&255]+gn[i>>8&255]+gn[i>>16&255]+gn[i>>24&255]+"-"+gn[e&255]+gn[e>>8&255]+"-"+gn[e>>16&15|64]+gn[e>>24&255]+"-"+gn[t&63|128]+gn[t>>8&255]+"-"+gn[t>>16&255]+gn[t>>24&255]+gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]).toLowerCase()}function mt(i,e,t){return Math.max(e,Math.min(t,i))}function uu(i,e){return(i%e+e)%e}function Ag(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Rg(i,e,t){return i!==e?(t-i)/(e-i):0}function Qr(i,e,t){return(1-t)*i+t*e}function Cg(i,e,t,n){return Qr(i,e,1-Math.exp(-t*n))}function Pg(i,e=1){return e-Math.abs(uu(i,e*2)-e)}function Ig(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Lg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Dg(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Ng(i,e){return i+Math.random()*(e-i)}function Ug(i){return i*(.5-Math.random())}function Og(i){i!==void 0&&(hd=i);let e=hd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Fg(i){return i*Zr}function Bg(i){return i*gr}function kg(i){return(i&i-1)===0&&i!==0}function zg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Hg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Vg(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),u=r((e-n)/2),h=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*d,l*u,l*h,o*c);break;case"YZY":i.set(l*h,o*d,l*u,o*c);break;case"ZXZ":i.set(l*u,l*h,o*d,o*c);break;case"XZX":i.set(o*d,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*d,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ei(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ts={DEG2RAD:Zr,RAD2DEG:gr,generateUUID:ii,clamp:mt,euclideanModulo:uu,mapLinear:Ag,inverseLerp:Rg,lerp:Qr,damp:Cg,pingpong:Pg,smoothstep:Ig,smootherstep:Lg,randInt:Dg,randFloat:Ng,randFloatSpread:Ug,seededRandom:Og,degToRad:Fg,radToDeg:Bg,isPowerOfTwo:kg,ceilPowerOfTwo:zg,floorPowerOfTwo:Hg,setQuaternionFromProperEuler:Vg,normalize:Pt,denormalize:ei};class He{constructor(e=0,t=0){He.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class tt{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],u=n[s+3];const h=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(u!==v||l!==h||c!==f||d!==g){let m=1-o;const p=l*h+c*f+d*g+u*v,T=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){const R=Math.sqrt(E),C=Math.atan2(R,p*T);m=Math.sin(m*C)/R,o=Math.sin(o*C)/R}const x=o*T;if(l=l*m+h*x,c=c*m+f*x,d=d*m+g*x,u=u*m+v*x,m===1-o){const R=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=R,c*=R,d*=R,u*=R}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],u=r[a],h=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+d*u+l*f-c*h,e[t+1]=l*g+d*h+c*u-o*f,e[t+2]=c*g+d*f+o*h-l*u,e[t+3]=d*g-o*u-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),u=o(r/2),h=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"YXZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"ZXY":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"ZYX":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"YZX":this._x=h*d*u+c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u-h*f*g;break;case"XZY":this._x=h*d*u-c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=n+o+u;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(d-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,h=Math.sin(t*d)/c;return this._w=a*u+this._w*h,this._x=n*u+this._x*h,this._y=s*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(e=0,t=0,n=0){A.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*d,this.y=n+l*d+o*c-r*u,this.z=s+l*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ic.copy(this).projectOnVector(e),this.sub(ic)}reflect(e){return this.sub(ic.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ic=new A,fd=new tt;class ut{constructor(e,t,n,s,r,a,o,l,c){ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],h=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],T=s[1],E=s[4],x=s[7],R=s[2],C=s[5],L=s[8];return r[0]=a*v+o*T+l*R,r[3]=a*m+o*E+l*C,r[6]=a*p+o*x+l*L,r[1]=c*v+d*T+u*R,r[4]=c*m+d*E+u*C,r[7]=c*p+d*x+u*L,r[2]=h*v+f*T+g*R,r[5]=h*m+f*E+g*C,r[8]=h*p+f*x+g*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,h=o*l-d*r,f=c*r-a*l,g=t*u+n*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(s*c-d*n)*v,e[2]=(o*n-s*a)*v,e[3]=h*v,e[4]=(d*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(sc.makeScale(e,t)),this}rotate(e){return this.premultiply(sc.makeRotation(-e)),this}translate(e,t){return this.premultiply(sc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const sc=new ut;function _f(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function fa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gg(){const i=fa("canvas");return i.style.display="block",i}const pd={};function pa(i){i in pd||(pd[i]=!0,console.warn(i))}function Wg(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const md=new ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gd=new ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $g(){const i={enabled:!0,workingColorSpace:wn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Nt&&(s.r=Ui(s.r),s.g=Ui(s.g),s.b=Ui(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Nt&&(s.r=or(s.r),s.g=or(s.g),s.b=or(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===is?Ro:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return pa("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return pa("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[wn]:{primaries:e,whitePoint:n,transfer:Ro,toXYZ:md,fromXYZ:gd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Wt},outputColorSpaceConfig:{drawingBufferColorSpace:Wt}},[Wt]:{primaries:e,whitePoint:n,transfer:Nt,toXYZ:md,fromXYZ:gd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Wt}}}),i}const xt=$g();function Ui(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function or(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Bs;class Xg{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Bs===void 0&&(Bs=fa("canvas")),Bs.width=e.width,Bs.height=e.height;const s=Bs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Bs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=fa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ui(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ui(t[n]/255)*255):t[n]=Ui(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qg=0;class du{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qg++}),this.uuid=ii(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(rc(s[a].image)):r.push(rc(s[a]))}else r=rc(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function rc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Xg.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Yg=0;const ac=new A;class tn extends Mr{constructor(e=tn.DEFAULT_IMAGE,t=tn.DEFAULT_MAPPING,n=ss,s=ss,r=On,a=Di,o=$n,l=pi,c=tn.DEFAULT_ANISOTROPY,d=is){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=ii(),this.name="",this.source=new du(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ac).x}get height(){return this.source.getSize(ac).y}get depth(){return this.source.getSize(ac).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==rf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case mr:e.x=e.x-Math.floor(e.x);break;case ss:e.x=e.x<0?0:1;break;case Ao:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case mr:e.y=e.y-Math.floor(e.y);break;case ss:e.y=e.y<0?0:1;break;case Ao:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=rf;tn.DEFAULT_ANISOTROPY=1;class wt{constructor(e=0,t=0,n=0,s=1){wt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,x=(f+1)/2,R=(p+1)/2,C=(d+h)/4,L=(u+v)/4,O=(g+m)/4;return E>x&&E>R?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=C/n,r=L/n):x>R?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=C/s,r=O/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=L/r,s=O/r),this.set(n,s,r,t),this}let T=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(h-d)*(h-d));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-v)/T,this.z=(h-d)/T,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this.w=mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this.w=mt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Kg extends Mr{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:On,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new wt(0,0,e,t),this.scissorTest=!1,this.viewport=new wt(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new tn(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:On,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new du(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Cs extends Kg{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class vf extends tn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jg extends tn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fn{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Kn):Kn.fromBufferAttribute(r,a),Kn.applyMatrix4(e.matrixWorld),this.expandByPoint(Kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),za.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),za.copy(n.boundingBox)),za.applyMatrix4(e.matrixWorld),this.union(za)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kn),Kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ur),Ha.subVectors(this.max,Ur),ks.subVectors(e.a,Ur),zs.subVectors(e.b,Ur),Hs.subVectors(e.c,Ur),Yi.subVectors(zs,ks),Ki.subVectors(Hs,zs),ms.subVectors(ks,Hs);let t=[0,-Yi.z,Yi.y,0,-Ki.z,Ki.y,0,-ms.z,ms.y,Yi.z,0,-Yi.x,Ki.z,0,-Ki.x,ms.z,0,-ms.x,-Yi.y,Yi.x,0,-Ki.y,Ki.x,0,-ms.y,ms.x,0];return!oc(t,ks,zs,Hs,Ha)||(t=[1,0,0,0,1,0,0,0,1],!oc(t,ks,zs,Hs,Ha))?!1:(Va.crossVectors(Yi,Ki),t=[Va.x,Va.y,Va.z],oc(t,ks,zs,Hs,Ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ti=[new A,new A,new A,new A,new A,new A,new A,new A],Kn=new A,za=new Fn,ks=new A,zs=new A,Hs=new A,Yi=new A,Ki=new A,ms=new A,Ur=new A,Ha=new A,Va=new A,gs=new A;function oc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){gs.fromArray(i,r);const o=s.x*Math.abs(gs.x)+s.y*Math.abs(gs.y)+s.z*Math.abs(gs.z),l=e.dot(gs),c=t.dot(gs),d=n.dot(gs);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Jg=new Fn,Or=new A,cc=new A;class gi{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Jg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Or.subVectors(e,this.center);const t=Or.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Or,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(cc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Or.copy(e.center).add(cc)),this.expandByPoint(Or.copy(e.center).sub(cc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Ei=new A,lc=new A,Ga=new A,ji=new A,uc=new A,Wa=new A,dc=new A;class ya{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ei.copy(this.origin).addScaledVector(this.direction,t),Ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){lc.copy(e).add(t).multiplyScalar(.5),Ga.copy(t).sub(e).normalize(),ji.copy(this.origin).sub(lc);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ga),o=ji.dot(this.direction),l=-ji.dot(Ga),c=ji.lengthSq(),d=Math.abs(1-a*a);let u,h,f,g;if(d>0)if(u=a*l-o,h=a*o-l,g=r*d,u>=0)if(h>=-g)if(h<=g){const v=1/d;u*=v,h*=v,f=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-a*r+o)),h=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(u=Math.max(0,-(a*r+o)),h=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c);else h=a>0?-r:r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(lc).addScaledVector(Ga,h),f}intersectSphere(e,t){Ei.subVectors(e.center,this.origin);const n=Ei.dot(this.direction),s=Ei.dot(Ei)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),d>=0?(r=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ei)!==null}intersectTriangle(e,t,n,s,r){uc.subVectors(t,e),Wa.subVectors(n,e),dc.crossVectors(uc,Wa);let a=this.direction.dot(dc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ji.subVectors(this.origin,e);const l=o*this.direction.dot(Wa.crossVectors(ji,Wa));if(l<0)return null;const c=o*this.direction.dot(uc.cross(ji));if(c<0||l+c>a)return null;const d=-o*ji.dot(dc);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,n,s,r,a,o,l,c,d,u,h,f,g,v,m){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,u,h,f,g,v,m)}set(e,t,n,s,r,a,o,l,c,d,u,h,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Vs.setFromMatrixColumn(e,0).length(),r=1/Vs.setFromMatrixColumn(e,1).length(),a=1/Vs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const h=a*d,f=a*u,g=o*d,v=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*d,f=l*u,g=c*d,v=c*u;t[0]=h+v*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=f*o-g,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*d,f=l*u,g=c*d,v=c*u;t[0]=h-v*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*d,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*d,f=a*u,g=o*d,v=o*u;t[0]=l*d,t[4]=g*c-f,t[8]=h*c+v,t[1]=l*u,t[5]=v*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*d,t[4]=v-h*u,t[8]=g*u+f,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*u+g,t[10]=h-v*u}else if(e.order==="XZY"){const h=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+v,t[5]=a*d,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*d,t[10]=v*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zg,e,Qg)}lookAt(e,t,n){const s=this.elements;return Nn.subVectors(e,t),Nn.lengthSq()===0&&(Nn.z=1),Nn.normalize(),Ji.crossVectors(n,Nn),Ji.lengthSq()===0&&(Math.abs(n.z)===1?Nn.x+=1e-4:Nn.z+=1e-4,Nn.normalize(),Ji.crossVectors(n,Nn)),Ji.normalize(),$a.crossVectors(Nn,Ji),s[0]=Ji.x,s[4]=$a.x,s[8]=Nn.x,s[1]=Ji.y,s[5]=$a.y,s[9]=Nn.y,s[2]=Ji.z,s[6]=$a.z,s[10]=Nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],h=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],T=n[3],E=n[7],x=n[11],R=n[15],C=s[0],L=s[4],O=s[8],b=s[12],M=s[1],N=s[5],F=s[9],V=s[13],Z=s[2],ee=s[6],ne=s[10],ie=s[14],q=s[3],pe=s[7],me=s[11],Ve=s[15];return r[0]=a*C+o*M+l*Z+c*q,r[4]=a*L+o*N+l*ee+c*pe,r[8]=a*O+o*F+l*ne+c*me,r[12]=a*b+o*V+l*ie+c*Ve,r[1]=d*C+u*M+h*Z+f*q,r[5]=d*L+u*N+h*ee+f*pe,r[9]=d*O+u*F+h*ne+f*me,r[13]=d*b+u*V+h*ie+f*Ve,r[2]=g*C+v*M+m*Z+p*q,r[6]=g*L+v*N+m*ee+p*pe,r[10]=g*O+v*F+m*ne+p*me,r[14]=g*b+v*V+m*ie+p*Ve,r[3]=T*C+E*M+x*Z+R*q,r[7]=T*L+E*N+x*ee+R*pe,r[11]=T*O+E*F+x*ne+R*me,r[15]=T*b+E*V+x*ie+R*Ve,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*o*h+n*c*h+s*o*f-n*l*f)+v*(+t*l*f-t*c*h+r*a*h-s*a*f+s*c*d-r*l*d)+m*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*d-n*c*d)+p*(-s*o*d-t*l*u+t*o*h+s*a*u-n*a*h+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],T=u*m*c-v*h*c+v*l*f-o*m*f-u*l*p+o*h*p,E=g*h*c-d*m*c-g*l*f+a*m*f+d*l*p-a*h*p,x=d*v*c-g*u*c+g*o*f-a*v*f-d*o*p+a*u*p,R=g*u*l-d*v*l-g*o*h+a*v*h+d*o*m-a*u*m,C=t*T+n*E+s*x+r*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/C;return e[0]=T*L,e[1]=(v*h*r-u*m*r-v*s*f+n*m*f+u*s*p-n*h*p)*L,e[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*p+n*l*p)*L,e[3]=(u*l*r-o*h*r-u*s*c+n*h*c+o*s*f-n*l*f)*L,e[4]=E*L,e[5]=(d*m*r-g*h*r+g*s*f-t*m*f-d*s*p+t*h*p)*L,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*p-t*l*p)*L,e[7]=(a*h*r-d*l*r+d*s*c-t*h*c-a*s*f+t*l*f)*L,e[8]=x*L,e[9]=(g*u*r-d*v*r-g*n*f+t*v*f+d*n*p-t*u*p)*L,e[10]=(a*v*r-g*o*r+g*n*c-t*v*c-a*n*p+t*o*p)*L,e[11]=(d*o*r-a*u*r-d*n*c+t*u*c+a*n*f-t*o*f)*L,e[12]=R*L,e[13]=(d*v*s-g*u*s+g*n*h-t*v*h-d*n*m+t*u*m)*L,e[14]=(g*o*s-a*v*s-g*n*l+t*v*l+a*n*m-t*o*m)*L,e[15]=(a*u*s-d*o*s+d*n*l-t*u*l-a*n*h+t*o*h)*L,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,u=o+o,h=r*c,f=r*d,g=r*u,v=a*d,m=a*u,p=o*u,T=l*c,E=l*d,x=l*u,R=n.x,C=n.y,L=n.z;return s[0]=(1-(v+p))*R,s[1]=(f+x)*R,s[2]=(g-E)*R,s[3]=0,s[4]=(f-x)*C,s[5]=(1-(h+p))*C,s[6]=(m+T)*C,s[7]=0,s[8]=(g+E)*L,s[9]=(m-T)*L,s[10]=(1-(h+v))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Vs.set(s[0],s[1],s[2]).length();const a=Vs.set(s[4],s[5],s[6]).length(),o=Vs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],jn.copy(this);const c=1/r,d=1/a,u=1/o;return jn.elements[0]*=c,jn.elements[1]*=c,jn.elements[2]*=c,jn.elements[4]*=d,jn.elements[5]*=d,jn.elements[6]*=d,jn.elements[8]*=u,jn.elements[9]*=u,jn.elements[10]*=u,t.setFromRotationMatrix(jn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=di,l=!1){const c=this.elements,d=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s);let g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===di)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Co)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=di,l=!1){const c=this.elements,d=2/(t-e),u=2/(n-s),h=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===di)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===Co)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Vs=new A,jn=new rt,Zg=new A(0,0,0),Qg=new A(1,1,1),Ji=new A,$a=new A,Nn=new A,_d=new rt,vd=new tt;class Xt{constructor(e=0,t=0,n=0,s=Xt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-mt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-mt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return _d.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_d,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vd.setFromEuler(this),this.setFromQuaternion(vd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Xt.DEFAULT_ORDER="XYZ";class hu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let e0=0;const yd=new A,Gs=new tt,wi=new rt,Xa=new A,Fr=new A,t0=new A,n0=new tt,xd=new A(1,0,0),Md=new A(0,1,0),Sd=new A(0,0,1),bd={type:"added"},i0={type:"removed"},Ws={type:"childadded",child:null},hc={type:"childremoved",child:null};class zt extends Mr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:e0++}),this.uuid=ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zt.DEFAULT_UP.clone();const e=new A,t=new Xt,n=new tt,s=new A(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new rt},normalMatrix:{value:new ut}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Gs.setFromAxisAngle(e,t),this.quaternion.multiply(Gs),this}rotateOnWorldAxis(e,t){return Gs.setFromAxisAngle(e,t),this.quaternion.premultiply(Gs),this}rotateX(e){return this.rotateOnAxis(xd,e)}rotateY(e){return this.rotateOnAxis(Md,e)}rotateZ(e){return this.rotateOnAxis(Sd,e)}translateOnAxis(e,t){return yd.copy(e).applyQuaternion(this.quaternion),this.position.add(yd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xd,e)}translateY(e){return this.translateOnAxis(Md,e)}translateZ(e){return this.translateOnAxis(Sd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(wi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Xa.copy(e):Xa.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wi.lookAt(Fr,Xa,this.up):wi.lookAt(Xa,Fr,this.up),this.quaternion.setFromRotationMatrix(wi),s&&(wi.extractRotation(s.matrixWorld),Gs.setFromRotationMatrix(wi),this.quaternion.premultiply(Gs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bd),Ws.child=e,this.dispatchEvent(Ws),Ws.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(i0),hc.child=e,this.dispatchEvent(hc),hc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),wi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),wi.multiply(e.parent.matrixWorld)),e.applyMatrix4(wi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bd),Ws.child=e,this.dispatchEvent(Ws),Ws.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,e,t0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,n0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}zt.DEFAULT_UP=new A(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Jn=new A,Ai=new A,fc=new A,Ri=new A,$s=new A,Xs=new A,Td=new A,pc=new A,mc=new A,gc=new A,_c=new wt,vc=new wt,yc=new wt;class Gn{constructor(e=new A,t=new A,n=new A){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Jn.subVectors(e,t),s.cross(Jn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Jn.subVectors(s,t),Ai.subVectors(n,t),fc.subVectors(e,t);const a=Jn.dot(Jn),o=Jn.dot(Ai),l=Jn.dot(fc),c=Ai.dot(Ai),d=Ai.dot(fc),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const h=1/u,f=(c*l-o*d)*h,g=(a*d-o*l)*h;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ri.x),l.addScaledVector(a,Ri.y),l.addScaledVector(o,Ri.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return _c.setScalar(0),vc.setScalar(0),yc.setScalar(0),_c.fromBufferAttribute(e,t),vc.fromBufferAttribute(e,n),yc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(_c,r.x),a.addScaledVector(vc,r.y),a.addScaledVector(yc,r.z),a}static isFrontFacing(e,t,n,s){return Jn.subVectors(n,t),Ai.subVectors(e,t),Jn.cross(Ai).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jn.subVectors(this.c,this.b),Ai.subVectors(this.a,this.b),Jn.cross(Ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Gn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Gn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;$s.subVectors(s,n),Xs.subVectors(r,n),pc.subVectors(e,n);const l=$s.dot(pc),c=Xs.dot(pc);if(l<=0&&c<=0)return t.copy(n);mc.subVectors(e,s);const d=$s.dot(mc),u=Xs.dot(mc);if(d>=0&&u<=d)return t.copy(s);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector($s,a);gc.subVectors(e,r);const f=$s.dot(gc),g=Xs.dot(gc);if(g>=0&&f<=g)return t.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Xs,o);const m=d*g-f*u;if(m<=0&&u-d>=0&&f-g>=0)return Td.subVectors(r,s),o=(u-d)/(u-d+(f-g)),t.copy(s).addScaledVector(Td,o);const p=1/(m+v+h);return a=v*p,o=h*p,t.copy(n).addScaledVector($s,a).addScaledVector(Xs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const yf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},qa={h:0,s:0,l:0};function xc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class nt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,xt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=xt.workingColorSpace){return this.r=e,this.g=t,this.b=n,xt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=xt.workingColorSpace){if(e=uu(e,1),t=mt(t,0,1),n=mt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=xc(a,r,e+1/3),this.g=xc(a,r,e),this.b=xc(a,r,e-1/3)}return xt.colorSpaceToWorking(this,s),this}setStyle(e,t=Wt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Wt){const n=yf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=or(e.r),this.g=or(e.g),this.b=or(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wt){return xt.workingToColorSpace(_n.copy(this),e),Math.round(mt(_n.r*255,0,255))*65536+Math.round(mt(_n.g*255,0,255))*256+Math.round(mt(_n.b*255,0,255))}getHexString(e=Wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=xt.workingColorSpace){xt.workingToColorSpace(_n.copy(this),t);const n=_n.r,s=_n.g,r=_n.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=xt.workingColorSpace){return xt.workingToColorSpace(_n.copy(this),t),e.r=_n.r,e.g=_n.g,e.b=_n.b,e}getStyle(e=Wt){xt.workingToColorSpace(_n.copy(this),e);const t=_n.r,n=_n.g,s=_n.b;return e!==Wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Zi),this.setHSL(Zi.h+e,Zi.s+t,Zi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Zi),e.getHSL(qa);const n=Qr(Zi.h,qa.h,t),s=Qr(Zi.s,qa.s,t),r=Qr(Zi.l,qa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _n=new nt;nt.NAMES=yf;let s0=0;class si extends Mr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:s0++}),this.uuid=ii(),this.name="",this.type="Material",this.blending=ar,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zc,this.blendDst=Qc,this.blendEquation=Ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=hr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ud,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fs,this.stencilZFail=Fs,this.stencilZPass=Fs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ar&&(n.blending=this.blending),this.side!==Oi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Zc&&(n.blendSrc=this.blendSrc),this.blendDst!==Qc&&(n.blendDst=this.blendDst),this.blendEquation!==Ts&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==hr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ud&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Fs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Fs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Wn extends si{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xt,this.combine=nf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Kt=new A,Ya=new He;let r0=0;class En{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:r0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Bl,this.updateRanges=[],this.gpuType=ti,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ya.fromBufferAttribute(this,t),Ya.applyMatrix3(e),this.setXY(t,Ya.x,Ya.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix3(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ei(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ei(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ei(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ei(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array),r=Pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Bl&&(e.usage=this.usage),e}}class xf extends En{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Mf extends En{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Bt extends En{constructor(e,t,n){super(new Float32Array(e),t,n)}}let a0=0;const zn=new rt,Mc=new zt,qs=new A,Un=new Fn,Br=new Fn,an=new A;class cn extends Mr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:a0++}),this.uuid=ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_f(e)?Mf:xf)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ut().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zn.makeRotationFromQuaternion(e),this.applyMatrix4(zn),this}rotateX(e){return zn.makeRotationX(e),this.applyMatrix4(zn),this}rotateY(e){return zn.makeRotationY(e),this.applyMatrix4(zn),this}rotateZ(e){return zn.makeRotationZ(e),this.applyMatrix4(zn),this}translate(e,t,n){return zn.makeTranslation(e,t,n),this.applyMatrix4(zn),this}scale(e,t,n){return zn.makeScale(e,t,n),this.applyMatrix4(zn),this}lookAt(e){return Mc.lookAt(e),Mc.updateMatrix(),this.applyMatrix4(Mc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qs).negate(),this.translate(qs.x,qs.y,qs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Bt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Un.setFromBufferAttribute(r),this.morphTargetsRelative?(an.addVectors(this.boundingBox.min,Un.min),this.boundingBox.expandByPoint(an),an.addVectors(this.boundingBox.max,Un.max),this.boundingBox.expandByPoint(an)):(this.boundingBox.expandByPoint(Un.min),this.boundingBox.expandByPoint(Un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(e){const n=this.boundingSphere.center;if(Un.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Br.setFromBufferAttribute(o),this.morphTargetsRelative?(an.addVectors(Un.min,Br.min),Un.expandByPoint(an),an.addVectors(Un.max,Br.max),Un.expandByPoint(an)):(Un.expandByPoint(Br.min),Un.expandByPoint(Br.max))}Un.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)an.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(an));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)an.fromBufferAttribute(o,c),l&&(qs.fromBufferAttribute(e,c),an.add(qs)),s=Math.max(s,n.distanceToSquared(an))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new En(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let O=0;O<n.count;O++)o[O]=new A,l[O]=new A;const c=new A,d=new A,u=new A,h=new He,f=new He,g=new He,v=new A,m=new A;function p(O,b,M){c.fromBufferAttribute(n,O),d.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),h.fromBufferAttribute(r,O),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),d.sub(c),u.sub(c),f.sub(h),g.sub(h);const N=1/(f.x*g.y-g.x*f.y);isFinite(N)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(N),m.copy(u).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(N),o[O].add(v),o[b].add(v),o[M].add(v),l[O].add(m),l[b].add(m),l[M].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let O=0,b=T.length;O<b;++O){const M=T[O],N=M.start,F=M.count;for(let V=N,Z=N+F;V<Z;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const E=new A,x=new A,R=new A,C=new A;function L(O){R.fromBufferAttribute(s,O),C.copy(R);const b=o[O];E.copy(b),E.sub(R.multiplyScalar(R.dot(b))).normalize(),x.crossVectors(C,b);const N=x.dot(l[O])<0?-1:1;a.setXYZW(O,E.x,E.y,E.z,N)}for(let O=0,b=T.length;O<b;++O){const M=T[O],N=M.start,F=M.count;for(let V=N,Z=N+F;V<Z;V+=3)L(e.getX(V+0)),L(e.getX(V+1)),L(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new En(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const s=new A,r=new A,a=new A,o=new A,l=new A,c=new A,d=new A,u=new A;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)an.fromBufferAttribute(e,t),an.normalize(),e.setXYZ(t,an.x,an.y,an.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*d;for(let p=0;p<d;p++)h[g++]=c[f++]}return new En(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new cn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const f=c[u];d.push(f.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],u=r[c];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ed=new rt,_s=new ya,Ka=new gi,wd=new A,ja=new A,Ja=new A,Za=new A,Sc=new A,Qa=new A,Ad=new A,eo=new A;class Ct extends zt{constructor(e=new cn,t=new Wn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Qa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],u=r[l];d!==0&&(Sc.fromBufferAttribute(u,e),a?Qa.addScaledVector(Sc,d):Qa.addScaledVector(Sc.sub(t),d))}t.add(Qa)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ka.copy(n.boundingSphere),Ka.applyMatrix4(r),_s.copy(e.ray).recast(e.near),!(Ka.containsPoint(_s.origin)===!1&&(_s.intersectSphere(Ka,wd)===null||_s.origin.distanceToSquared(wd)>(e.far-e.near)**2))&&(Ed.copy(r).invert(),_s.copy(e.ray).applyMatrix4(Ed),!(n.boundingBox!==null&&_s.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,_s)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=T,R=E;x<R;x+=3){const C=o.getX(x),L=o.getX(x+1),O=o.getX(x+2);s=to(this,p,e,n,c,d,u,C,L,O),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const T=o.getX(m),E=o.getX(m+1),x=o.getX(m+2);s=to(this,a,e,n,c,d,u,T,E,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=T,R=E;x<R;x+=3){const C=x,L=x+1,O=x+2;s=to(this,p,e,n,c,d,u,C,L,O),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const T=m,E=m+1,x=m+2;s=to(this,a,e,n,c,d,u,T,E,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function o0(i,e,t,n,s,r,a,o){let l;if(e.side===Pn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Oi,o),l===null)return null;eo.copy(o),eo.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(eo);return c<t.near||c>t.far?null:{distance:c,point:eo.clone(),object:i}}function to(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,ja),i.getVertexPosition(l,Ja),i.getVertexPosition(c,Za);const d=o0(i,e,t,n,ja,Ja,Za,Ad);if(d){const u=new A;Gn.getBarycoord(Ad,ja,Ja,Za,u),s&&(d.uv=Gn.getInterpolatedAttribute(s,o,l,c,u,new He)),r&&(d.uv1=Gn.getInterpolatedAttribute(r,o,l,c,u,new He)),a&&(d.normal=Gn.getInterpolatedAttribute(a,o,l,c,u,new A),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new A,materialIndex:0};Gn.getNormal(ja,Ja,Za,h.normal),d.face=h,d.barycoord=u}return d}class Vn extends cn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],u=[];let h=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Bt(c,3)),this.setAttribute("normal",new Bt(d,3)),this.setAttribute("uv",new Bt(u,2));function g(v,m,p,T,E,x,R,C,L,O,b){const M=x/L,N=R/O,F=x/2,V=R/2,Z=C/2,ee=L+1,ne=O+1;let ie=0,q=0;const pe=new A;for(let me=0;me<ne;me++){const Ve=me*N-V;for(let st=0;st<ee;st++){const _t=st*M-F;pe[v]=_t*T,pe[m]=Ve*E,pe[p]=Z,c.push(pe.x,pe.y,pe.z),pe[v]=0,pe[m]=0,pe[p]=C>0?1:-1,d.push(pe.x,pe.y,pe.z),u.push(st/L),u.push(1-me/O),ie+=1}}for(let me=0;me<O;me++)for(let Ve=0;Ve<L;Ve++){const st=h+Ve+ee*me,_t=h+Ve+ee*(me+1),St=h+(Ve+1)+ee*(me+1),ft=h+(Ve+1)+ee*me;l.push(st,_t,ft),l.push(_t,St,ft),q+=6}o.addGroup(f,q,b),f+=q,h+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function _r(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function xn(i){const e={};for(let t=0;t<i.length;t++){const n=_r(i[t]);for(const s in n)e[s]=n[s]}return e}function c0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Sf(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:xt.workingColorSpace}const l0={clone:_r,merge:xn};var u0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,d0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class cs extends si{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=u0,this.fragmentShader=d0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_r(e.uniforms),this.uniformsGroups=c0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class bf extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qi=new A,Rd=new He,Cd=new He;class Mn extends bf{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=gr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Zr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gr*2*Math.atan(Math.tan(Zr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z)}getViewSize(e,t){return this.getViewBounds(e,Rd,Cd),t.subVectors(Cd,Rd)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Zr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ys=-90,Ks=1;class h0 extends zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Mn(Ys,Ks,e,t);s.layers=this.layers,this.add(s);const r=new Mn(Ys,Ks,e,t);r.layers=this.layers,this.add(r);const a=new Mn(Ys,Ks,e,t);a.layers=this.layers,this.add(a);const o=new Mn(Ys,Ks,e,t);o.layers=this.layers,this.add(o);const l=new Mn(Ys,Ks,e,t);l.layers=this.layers,this.add(l);const c=new Mn(Ys,Ks,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===di)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Co)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(u,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Tf extends tn{constructor(e=[],t=fr,n,s,r,a,o,l,c,d){super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class f0 extends Cs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Tf(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Vn(5,5,5),r=new cs({name:"CubemapFromEquirect",uniforms:_r(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pn,blending:rs});r.uniforms.tEquirect.value=t;const a=new Ct(s,r),o=t.minFilter;return t.minFilter===Di&&(t.minFilter=On),new h0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class $t extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const p0={type:"move"};class bc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(p0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new $t;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class fu{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new nt(e),this.near=t,this.far=n}clone(){return new fu(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class m0 extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xt,this.environmentIntensity=1,this.environmentRotation=new Xt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Ef{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Bl,this.updateRanges=[],this.version=0,this.uuid=ii()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ii()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ii()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const yn=new A;class ma{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.applyMatrix4(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.applyNormalMatrix(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.transformDirection(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ei(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ei(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ei(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ei(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array),r=Pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new En(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ma(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class wf extends si{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let js;const kr=new A,Js=new A,Zs=new A,Qs=new He,zr=new He,Af=new rt,no=new A,Hr=new A,io=new A,Pd=new He,Tc=new He,Id=new He;class g0 extends zt{constructor(e=new wf){if(super(),this.isSprite=!0,this.type="Sprite",js===void 0){js=new cn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ef(t,5);js.setIndex([0,1,2,0,2,3]),js.setAttribute("position",new ma(n,3,0,!1)),js.setAttribute("uv",new ma(n,2,3,!1))}this.geometry=js,this.material=e,this.center=new He(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Js.setFromMatrixScale(this.matrixWorld),Af.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Zs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Js.multiplyScalar(-Zs.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;so(no.set(-.5,-.5,0),Zs,a,Js,s,r),so(Hr.set(.5,-.5,0),Zs,a,Js,s,r),so(io.set(.5,.5,0),Zs,a,Js,s,r),Pd.set(0,0),Tc.set(1,0),Id.set(1,1);let o=e.ray.intersectTriangle(no,Hr,io,!1,kr);if(o===null&&(so(Hr.set(-.5,.5,0),Zs,a,Js,s,r),Tc.set(0,1),o=e.ray.intersectTriangle(no,io,Hr,!1,kr),o===null))return;const l=e.ray.origin.distanceTo(kr);l<e.near||l>e.far||t.push({distance:l,point:kr.clone(),uv:Gn.getInterpolation(kr,no,Hr,io,Pd,Tc,Id,new He),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function so(i,e,t,n,s,r){Qs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(zr.x=r*Qs.x-s*Qs.y,zr.y=s*Qs.x+r*Qs.y):zr.copy(Qs),i.copy(e),i.x+=zr.x,i.y+=zr.y,i.applyMatrix4(Af)}const Ld=new A,Dd=new wt,Nd=new wt,_0=new A,Ud=new rt,ro=new A,Ec=new gi,Od=new rt,wc=new ya;class v0 extends Ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ad,this.bindMatrix=new rt,this.bindMatrixInverse=new rt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Fn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ro),this.boundingBox.expandByPoint(ro)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new gi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ro),this.boundingSphere.expandByPoint(ro)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ec.copy(this.boundingSphere),Ec.applyMatrix4(s),e.ray.intersectsSphere(Ec)!==!1&&(Od.copy(s).invert(),wc.copy(e.ray).applyMatrix4(Od),!(this.boundingBox!==null&&wc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,wc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new wt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ad?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===pg?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Dd.fromBufferAttribute(s.attributes.skinIndex,e),Nd.fromBufferAttribute(s.attributes.skinWeight,e),Ld.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Nd.getComponent(r);if(a!==0){const o=Dd.getComponent(r);Ud.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(_0.copy(Ld).applyMatrix4(Ud),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Rf extends zt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Cf extends tn{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Tn,d=Tn,u,h){super(null,a,o,l,c,d,s,r,u,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Fd=new rt,y0=new rt;class pu{constructor(e=[],t=[]){this.uuid=ii(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new rt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new rt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:y0;Fd.multiplyMatrices(o,t[r]),Fd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new pu(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Cf(t,e,e,$n,ti);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Rf),this.bones.push(a),this.boneInverses.push(new rt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class kl extends En{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const er=new rt,Bd=new rt,ao=[],kd=new Fn,x0=new rt,Vr=new Ct,Gr=new gi;class Pf extends Ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new kl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,x0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Fn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,er),kd.copy(e.boundingBox).applyMatrix4(er),this.boundingBox.union(kd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new gi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,er),Gr.copy(e.boundingSphere).applyMatrix4(er),this.boundingSphere.union(Gr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Vr.geometry=this.geometry,Vr.material=this.material,Vr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gr.copy(this.boundingSphere),Gr.applyMatrix4(n),e.ray.intersectsSphere(Gr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,er),Bd.multiplyMatrices(n,er),Vr.matrixWorld=Bd,Vr.raycast(e,ao);for(let a=0,o=ao.length;a<o;a++){const l=ao[a];l.instanceId=r,l.object=this,t.push(l)}ao.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new kl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Cf(new Float32Array(s*this.count),s,this.count,au,ti));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ac=new A,M0=new A,S0=new ut;class ns{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Ac.subVectors(n,t).cross(M0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ac),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||S0.getNormalMatrix(e),s=this.coplanarPoint(Ac).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vs=new gi,b0=new He(.5,.5),oo=new A;class mu{constructor(e=new ns,t=new ns,n=new ns,s=new ns,r=new ns,a=new ns){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=di,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],u=r[5],h=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],T=r[12],E=r[13],x=r[14],R=r[15];if(s[0].setComponents(c-a,f-d,p-g,R-T).normalize(),s[1].setComponents(c+a,f+d,p+g,R+T).normalize(),s[2].setComponents(c+o,f+u,p+v,R+E).normalize(),s[3].setComponents(c-o,f-u,p-v,R-E).normalize(),n)s[4].setComponents(l,h,m,x).normalize(),s[5].setComponents(c-l,f-h,p-m,R-x).normalize();else if(s[4].setComponents(c-l,f-h,p-m,R-x).normalize(),t===di)s[5].setComponents(c+l,f+h,p+m,R+x).normalize();else if(t===Co)s[5].setComponents(l,h,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),vs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vs)}intersectsSprite(e){vs.center.set(0,0,0);const t=b0.distanceTo(e.center);return vs.radius=.7071067811865476+t,vs.applyMatrix4(e.matrixWorld),this.intersectsSphere(vs)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(oo.x=s.normal.x>0?e.max.x:e.min.x,oo.y=s.normal.y>0?e.max.y:e.min.y,oo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(oo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class If extends si{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Po=new A,Io=new A,zd=new rt,Wr=new ya,co=new gi,Rc=new A,Hd=new A;class gu extends zt{constructor(e=new cn,t=new If){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Po.fromBufferAttribute(t,s-1),Io.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Po.distanceTo(Io);e.setAttribute("lineDistance",new Bt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),co.copy(n.boundingSphere),co.applyMatrix4(s),co.radius+=r,e.ray.intersectsSphere(co)===!1)return;zd.copy(s).invert(),Wr.copy(e.ray).applyMatrix4(zd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,h=n.attributes.position;if(d!==null){const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=c){const p=d.getX(v),T=d.getX(v+1),E=lo(this,e,Wr,l,p,T,v);E&&t.push(E)}if(this.isLineLoop){const v=d.getX(g-1),m=d.getX(f),p=lo(this,e,Wr,l,v,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=c){const p=lo(this,e,Wr,l,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=lo(this,e,Wr,l,g-1,f,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function lo(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Po.fromBufferAttribute(o,s),Io.fromBufferAttribute(o,r),t.distanceSqToSegment(Po,Io,Rc,Hd)>n)return;Rc.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Rc);if(!(c<e.near||c>e.far))return{distance:c,point:Hd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Vd=new A,Gd=new A;class T0 extends gu{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Vd.fromBufferAttribute(t,s),Gd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Vd.distanceTo(Gd);e.setAttribute("lineDistance",new Bt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class E0 extends gu{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Lf extends si{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Wd=new rt,zl=new ya,uo=new gi,ho=new A;class w0 extends zt{constructor(e=new cn,t=new Lf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),uo.copy(n.boundingSphere),uo.applyMatrix4(s),uo.radius+=r,e.ray.intersectsSphere(uo)===!1)return;Wd.copy(s).invert(),zl.copy(e.ray).applyMatrix4(Wd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=h,v=f;g<v;g++){const m=c.getX(g);ho.fromBufferAttribute(u,m),$d(ho,m,l,s,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=h,v=f;g<v;g++)ho.fromBufferAttribute(u,g),$d(ho,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function $d(i,e,t,n,s,r,a){const o=zl.distanceSqToPoint(i);if(o<t){const l=new A;zl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class tr extends tn{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Df extends tn{constructor(e,t,n=Rs,s,r,a,o=Tn,l=Tn,c,d=la,u=1){if(d!==la&&d!==ua)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:u};super(h,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new du(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Nf extends tn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class _u extends cn{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],d=t/2,u=Math.PI/2*e,h=t,f=2*u+h,g=n*2+r,v=s+1,m=new A,p=new A;for(let T=0;T<=g;T++){let E=0,x=0,R=0,C=0;if(T<=n){const b=T/n,M=b*Math.PI/2;x=-d-e*Math.cos(M),R=e*Math.sin(M),C=-e*Math.cos(M),E=b*u}else if(T<=n+r){const b=(T-n)/r;x=-d+b*t,R=e,C=0,E=u+b*h}else{const b=(T-n-r)/n,M=b*Math.PI/2;x=d+e*Math.sin(M),R=e*Math.cos(M),C=e*Math.sin(M),E=u+h+b*u}const L=Math.max(0,Math.min(1,E/f));let O=0;T===0?O=.5/s:T===g&&(O=-.5/s);for(let b=0;b<=s;b++){const M=b/s,N=M*Math.PI*2,F=Math.sin(N),V=Math.cos(N);p.x=-R*V,p.y=x,p.z=R*F,o.push(p.x,p.y,p.z),m.set(-R*V,C,R*F),m.normalize(),l.push(m.x,m.y,m.z),c.push(M+O,L)}if(T>0){const b=(T-1)*v;for(let M=0;M<s;M++){const N=b+M,F=b+M+1,V=T*v+M,Z=T*v+M+1;a.push(N,F,V),a.push(F,Z,V)}}}this.setIndex(a),this.setAttribute("position",new Bt(o,3)),this.setAttribute("normal",new Bt(l,3)),this.setAttribute("uv",new Bt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _u(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class vu extends cn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],u=[],h=[],f=[];let g=0;const v=[],m=n/2;let p=0;T(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(d),this.setAttribute("position",new Bt(u,3)),this.setAttribute("normal",new Bt(h,3)),this.setAttribute("uv",new Bt(f,2));function T(){const x=new A,R=new A;let C=0;const L=(t-e)/n;for(let O=0;O<=r;O++){const b=[],M=O/r,N=M*(t-e)+e;for(let F=0;F<=s;F++){const V=F/s,Z=V*l+o,ee=Math.sin(Z),ne=Math.cos(Z);R.x=N*ee,R.y=-M*n+m,R.z=N*ne,u.push(R.x,R.y,R.z),x.set(ee,L,ne).normalize(),h.push(x.x,x.y,x.z),f.push(V,1-M),b.push(g++)}v.push(b)}for(let O=0;O<s;O++)for(let b=0;b<r;b++){const M=v[b][O],N=v[b+1][O],F=v[b+1][O+1],V=v[b][O+1];(e>0||b!==0)&&(d.push(M,N,V),C+=3),(t>0||b!==r-1)&&(d.push(N,F,V),C+=3)}c.addGroup(p,C,0),p+=C}function E(x){const R=g,C=new He,L=new A;let O=0;const b=x===!0?e:t,M=x===!0?1:-1;for(let F=1;F<=s;F++)u.push(0,m*M,0),h.push(0,M,0),f.push(.5,.5),g++;const N=g;for(let F=0;F<=s;F++){const Z=F/s*l+o,ee=Math.cos(Z),ne=Math.sin(Z);L.x=b*ne,L.y=m*M,L.z=b*ee,u.push(L.x,L.y,L.z),h.push(0,M,0),C.x=ee*.5+.5,C.y=ne*.5*M+.5,f.push(C.x,C.y),g++}for(let F=0;F<s;F++){const V=R+F,Z=N+F;x===!0?d.push(Z,Z+1,V):d.push(Z+1,Z,V),O+=3}c.addGroup(p,O,x===!0?1:2),p+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vu(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Fi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const d=n[s],h=n[s+1]-d,f=(a-d)/h;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new He:new A);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new A,s=[],r=[],a=[],o=new A,l=new rt;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new A)}r[0]=new A,a[0]=new A;let c=Number.MAX_VALUE;const d=Math.abs(s[0].x),u=Math.abs(s[0].y),h=Math.abs(s[0].z);d<=c&&(c=d,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(mt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(mt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Uf extends Fi{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new He){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const d=Math.cos(this.aRotation),u=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*d-f*u+this.aX,c=h*u+f*d+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class A0 extends Uf{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function yu(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,d,u){let h=(a-r)/c-(o-r)/(c+d)+(o-a)/d,f=(o-a)/d-(l-a)/(d+u)+(l-o)/u;h*=d,f*=d,s(a,o,h,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const fo=new A,Cc=new yu,Pc=new yu,Ic=new yu;class Hl extends Fi{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new A){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,d;this.closed||o>0?c=s[(o-1)%r]:(fo.subVectors(s[0],s[1]).add(s[0]),c=fo);const u=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?d=s[(o+2)%r]:(fo.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=fo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(h),f),m=Math.pow(h.distanceToSquared(d),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Cc.initNonuniformCatmullRom(c.x,u.x,h.x,d.x,g,v,m),Pc.initNonuniformCatmullRom(c.y,u.y,h.y,d.y,g,v,m),Ic.initNonuniformCatmullRom(c.z,u.z,h.z,d.z,g,v,m)}else this.curveType==="catmullrom"&&(Cc.initCatmullRom(c.x,u.x,h.x,d.x,this.tension),Pc.initCatmullRom(c.y,u.y,h.y,d.y,this.tension),Ic.initCatmullRom(c.z,u.z,h.z,d.z,this.tension));return n.set(Cc.calc(l),Pc.calc(l),Ic.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new A().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Xd(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function R0(i,e){const t=1-i;return t*t*e}function C0(i,e){return 2*(1-i)*i*e}function P0(i,e){return i*i*e}function ea(i,e,t,n){return R0(i,e)+C0(i,t)+P0(i,n)}function I0(i,e){const t=1-i;return t*t*t*e}function L0(i,e){const t=1-i;return 3*t*t*i*e}function D0(i,e){return 3*(1-i)*i*i*e}function N0(i,e){return i*i*i*e}function ta(i,e,t,n,s){return I0(i,e)+L0(i,t)+D0(i,n)+N0(i,s)}class U0 extends Fi{constructor(e=new He,t=new He,n=new He,s=new He){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new He){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ta(e,s.x,r.x,a.x,o.x),ta(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class O0 extends Fi{constructor(e=new A,t=new A,n=new A,s=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new A){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ta(e,s.x,r.x,a.x,o.x),ta(e,s.y,r.y,a.y,o.y),ta(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class F0 extends Fi{constructor(e=new He,t=new He){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new He){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new He){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class B0 extends Fi{constructor(e=new A,t=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new A){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new A){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class k0 extends Fi{constructor(e=new He,t=new He,n=new He){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new He){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ea(e,s.x,r.x,a.x),ea(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Of extends Fi{constructor(e=new A,t=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new A){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ea(e,s.x,r.x,a.x),ea(e,s.y,r.y,a.y),ea(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class z0 extends Fi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new He){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],d=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(Xd(o,l.x,c.x,d.x,u.x),Xd(o,l.y,c.y,d.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new He().fromArray(s))}return this}}var H0=Object.freeze({__proto__:null,ArcCurve:A0,CatmullRomCurve3:Hl,CubicBezierCurve:U0,CubicBezierCurve3:O0,EllipseCurve:Uf,LineCurve:F0,LineCurve3:B0,QuadraticBezierCurve:k0,QuadraticBezierCurve3:Of,SplineCurve:z0});class xa extends cn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,u=e/o,h=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<d;p++){const T=p*h-a;for(let E=0;E<c;E++){const x=E*u-r;g.push(x,-T,0),v.push(0,0,1),m.push(E/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<o;T++){const E=T+c*p,x=T+c*(p+1),R=T+1+c*(p+1),C=T+1+c*p;f.push(E,x,C),f.push(x,R,C)}this.setIndex(f),this.setAttribute("position",new Bt(g,3)),this.setAttribute("normal",new Bt(v,3)),this.setAttribute("uv",new Bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xa(e.width,e.height,e.widthSegments,e.heightSegments)}}class xu extends cn{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],d=[];let u=e;const h=(t-e)/s,f=new A,g=new He;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,d.push(g.x,g.y)}u+=h}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const T=p+m,E=T,x=T+n+1,R=T+n+2,C=T+1;o.push(E,x,C),o.push(x,R,C)}}this.setIndex(o),this.setAttribute("position",new Bt(l,3)),this.setAttribute("normal",new Bt(c,3)),this.setAttribute("uv",new Bt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xu(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class na extends cn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],u=new A,h=new A,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const T=[],E=p/n;let x=0;p===0&&a===0?x=.5/t:p===n&&l===Math.PI&&(x=-.5/t);for(let R=0;R<=t;R++){const C=R/t;u.x=-e*Math.cos(s+C*r)*Math.sin(a+E*o),u.y=e*Math.cos(a+E*o),u.z=e*Math.sin(s+C*r)*Math.sin(a+E*o),g.push(u.x,u.y,u.z),h.copy(u).normalize(),v.push(h.x,h.y,h.z),m.push(C+x,1-E),T.push(c++)}d.push(T)}for(let p=0;p<n;p++)for(let T=0;T<t;T++){const E=d[p][T+1],x=d[p][T],R=d[p+1][T],C=d[p+1][T+1];(p!==0||a>0)&&f.push(E,x,C),(p!==n-1||l<Math.PI)&&f.push(x,R,C)}this.setIndex(f),this.setAttribute("position",new Bt(g,3)),this.setAttribute("normal",new Bt(v,3)),this.setAttribute("uv",new Bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new na(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Mu extends cn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],d=new A,u=new A,h=new A;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const v=g/s*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),d.x=e*Math.cos(v),d.y=e*Math.sin(v),h.subVectors(u,d).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const v=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,T=(s+1)*f+g;a.push(v,m,T),a.push(m,p,T)}this.setIndex(a),this.setAttribute("position",new Bt(o,3)),this.setAttribute("normal",new Bt(l,3)),this.setAttribute("uv",new Bt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mu(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Lo extends cn{constructor(e=new Of(new A(-1,-1,0),new A(-1,1,0),new A(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new A,l=new A,c=new He;let d=new A;const u=[],h=[],f=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new Bt(u,3)),this.setAttribute("normal",new Bt(h,3)),this.setAttribute("uv",new Bt(f,2));function v(){for(let E=0;E<t;E++)m(E);m(r===!1?t:0),T(),p()}function m(E){d=e.getPointAt(E/t,d);const x=a.normals[E],R=a.binormals[E];for(let C=0;C<=s;C++){const L=C/s*Math.PI*2,O=Math.sin(L),b=-Math.cos(L);l.x=b*x.x+O*R.x,l.y=b*x.y+O*R.y,l.z=b*x.z+O*R.z,l.normalize(),h.push(l.x,l.y,l.z),o.x=d.x+n*l.x,o.y=d.y+n*l.y,o.z=d.z+n*l.z,u.push(o.x,o.y,o.z)}}function p(){for(let E=1;E<=t;E++)for(let x=1;x<=s;x++){const R=(s+1)*(E-1)+(x-1),C=(s+1)*E+(x-1),L=(s+1)*E+x,O=(s+1)*(E-1)+x;g.push(R,C,O),g.push(C,L,O)}}function T(){for(let E=0;E<=t;E++)for(let x=0;x<=s;x++)c.x=E/t,c.y=x/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Lo(new H0[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class en extends si{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=mf,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _i extends en{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new He(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new nt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new nt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new nt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class V0 extends si{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_g,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class G0 extends si{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function po(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function W0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function $0(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function qd(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function Ff(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class Ma{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class X0 extends Ma{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:od,endingEnd:od}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case cd:r=e,o=2*t-n;break;case ld:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case cd:a=e,l=2*n-t;break;case ld:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}const c=(n-t)*.5,d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this._offsetPrev,u=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),v=g*g,m=v*g,p=-h*m+2*h*v-h*g,T=(1+h)*m+(-1.5-2*h)*v+(-.5+h)*g+1,E=(-1-f)*m+(1.5+f)*v+.5*g,x=f*m-f*v;for(let R=0;R!==o;++R)r[R]=p*a[d+R]+T*a[c+R]+E*a[l+R]+x*a[u+R];return r}}class q0 extends Ma{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=(n-t)/(s-t),u=1-d;for(let h=0;h!==o;++h)r[h]=a[c+h]*u+a[l+h]*d;return r}}class Y0 extends Ma{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class ai{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=po(t,this.TimeBufferType),this.values=po(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:po(e.times,Array),values:po(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Y0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new q0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new X0(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case da:t=this.InterpolantFactoryMethodDiscrete;break;case ha:t=this.InterpolantFactoryMethodLinear;break;case nc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return da;case this.InterpolantFactoryMethodLinear:return ha;case this.InterpolantFactoryMethodSmooth:return nc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&W0(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===nc,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],d=e[o+1];if(c!==d&&(o!==1||c!==e[0]))if(s)l=!0;else{const u=o*n,h=u-n,f=u+n;for(let g=0;g!==n;++g){const v=t[u+g];if(v!==t[h+g]||v!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}ai.prototype.ValueTypeName="";ai.prototype.TimeBufferType=Float32Array;ai.prototype.ValueBufferType=Float32Array;ai.prototype.DefaultInterpolation=ha;class Sr extends ai{constructor(e,t,n){super(e,t,n)}}Sr.prototype.ValueTypeName="bool";Sr.prototype.ValueBufferType=Array;Sr.prototype.DefaultInterpolation=da;Sr.prototype.InterpolantFactoryMethodLinear=void 0;Sr.prototype.InterpolantFactoryMethodSmooth=void 0;class Bf extends ai{constructor(e,t,n,s){super(e,t,n,s)}}Bf.prototype.ValueTypeName="color";class vr extends ai{constructor(e,t,n,s){super(e,t,n,s)}}vr.prototype.ValueTypeName="number";class K0 extends Ma{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t);let c=e*o;for(let d=c+o;c!==d;c+=4)tt.slerpFlat(r,0,a,c-o,a,c,l);return r}}class yr extends ai{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new K0(this.times,this.values,this.getValueSize(),e)}}yr.prototype.ValueTypeName="quaternion";yr.prototype.InterpolantFactoryMethodSmooth=void 0;class br extends ai{constructor(e,t,n){super(e,t,n)}}br.prototype.ValueTypeName="string";br.prototype.ValueBufferType=Array;br.prototype.DefaultInterpolation=da;br.prototype.InterpolantFactoryMethodLinear=void 0;br.prototype.InterpolantFactoryMethodSmooth=void 0;class xr extends ai{constructor(e,t,n,s){super(e,t,n,s)}}xr.prototype.ValueTypeName="vector";class j0{constructor(e="",t=-1,n=[],s=mg){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=ii(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Z0(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(ai.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const d=$0(l);l=qd(l,1,d),c=qd(c,1,d),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new vr(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],d=c.name.match(r);if(d&&d.length>1){const u=d[1];let h=s[u];h||(s[u]=h=[]),h.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,h,f,g,v){if(f.length!==0){const m=[],p=[];Ff(f,m,p,g),m.length!==0&&v.push(new u(h,m,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const h=c[u].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const f={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let v=0;v<h[g].morphTargets.length;v++)f[h[g].morphTargets[v]]=-1;for(const v in f){const m=[],p=[];for(let T=0;T!==h[g].morphTargets.length;++T){const E=h[g];m.push(E.time),p.push(E.morphTarget===v?1:0)}s.push(new vr(".morphTargetInfluence["+v+"]",m,p))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(xr,f+".position",h,"pos",s),n(yr,f+".quaternion",h,"rot",s),n(xr,f+".scale",h,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function J0(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return vr;case"vector":case"vector2":case"vector3":case"vector4":return xr;case"color":return Bf;case"quaternion":return yr;case"bool":case"boolean":return Sr;case"string":return br}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Z0(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=J0(i.type);if(i.times===void 0){const t=[],n=[];Ff(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Ni={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Q0{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){const u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=c.length;u<h;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(d))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const e_=new Q0;class Tr{constructor(e){this.manager=e!==void 0?e:e_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Tr.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ci={};class t_ extends Error{constructor(e,t){super(e),this.response=t}}class kf extends Tr{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ni.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Ci[e]!==void 0){Ci[e].push({onLoad:t,onProgress:n,onError:s});return}Ci[e]=[],Ci[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const d=Ci[e],u=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,g=f!==0;let v=0;const m=new ReadableStream({start(p){T();function T(){u.read().then(({done:E,value:x})=>{if(E)p.close();else{v+=x.byteLength;const R=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:f});for(let C=0,L=d.length;C<L;C++){const O=d[C];O.onProgress&&O.onProgress(R)}p.enqueue(x),T()}},E=>{p.error(E)})}}});return new Response(m)}else throw new t_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(d=>new DOMParser().parseFromString(d,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),h=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Ni.add(`file:${e}`,c);const d=Ci[e];delete Ci[e];for(let u=0,h=d.length;u<h;u++){const f=d[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const d=Ci[e];if(d===void 0)throw this.manager.itemError(e),c;delete Ci[e];for(let u=0,h=d.length;u<h;u++){const f=d[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const nr=new WeakMap;class n_ extends Tr{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ni.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=nr.get(a);u===void 0&&(u=[],nr.set(a,u)),u.push({onLoad:t,onError:s})}return a}const o=fa("img");function l(){d(),t&&t(this);const u=nr.get(this)||[];for(let h=0;h<u.length;h++){const f=u[h];f.onLoad&&f.onLoad(this)}nr.delete(this),r.manager.itemEnd(e)}function c(u){d(),s&&s(u),Ni.remove(`image:${e}`);const h=nr.get(this)||[];for(let f=0;f<h.length;f++){const g=h[f];g.onError&&g.onError(u)}nr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ni.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class i_ extends Tr{constructor(e){super(e)}load(e,t,n,s){const r=new tn,a=new n_(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class Ho extends zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new nt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class s_ extends Ho{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new nt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Lc=new rt,Yd=new A,Kd=new A;class Su{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new He(512,512),this.mapType=pi,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new mu,this._frameExtents=new He(1,1),this._viewportCount=1,this._viewports=[new wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Yd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yd),Kd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Kd),t.updateMatrixWorld(),Lc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Lc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class r_ extends Su{constructor(){super(new Mn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=gr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class a_ extends Ho{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new r_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const jd=new rt,$r=new A,Dc=new A;class o_ extends Su{constructor(){super(new Mn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new He(4,2),this._viewportCount=6,this._viewports=[new wt(2,1,1,1),new wt(0,1,1,1),new wt(3,1,1,1),new wt(1,1,1,1),new wt(3,0,1,1),new wt(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),$r.setFromMatrixPosition(e.matrixWorld),n.position.copy($r),Dc.copy(n.position),Dc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Dc),n.updateMatrixWorld(),s.makeTranslation(-$r.x,-$r.y,-$r.z),jd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jd,n.coordinateSystem,n.reversedDepth)}}class c_ extends Ho{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new o_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class bu extends bf{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class l_ extends Su{constructor(){super(new bu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Vl extends Ho{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new l_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ia{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Nc=new WeakMap;class u_ extends Tr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ni.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{if(Nc.has(a)===!0)s&&s(Nc.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Ni.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Nc.set(l,c),Ni.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Ni.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class d_ extends Mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Tu="\\[\\]\\.:\\/",h_=new RegExp("["+Tu+"]","g"),Eu="[^"+Tu+"]",f_="[^"+Tu.replace("\\.","")+"]",p_=/((?:WC+[\/:])*)/.source.replace("WC",Eu),m_=/(WCOD+)?/.source.replace("WCOD",f_),g_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Eu),__=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Eu),v_=new RegExp("^"+p_+m_+g_+__+"$"),y_=["material","materials","bones","map"];class x_{constructor(e,t,n){const s=n||It.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class It{constructor(e,t,n){this.path=t,this.parsedPath=n||It.parseTrackName(t),this.node=It.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new It.Composite(e,t,n):new It(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(h_,"")}static parseTrackName(e){const t=v_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);y_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=It.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}It.Composite=x_;It.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};It.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};It.prototype.GetterByBindingType=[It.prototype._getValue_direct,It.prototype._getValue_array,It.prototype._getValue_arrayElement,It.prototype._getValue_toArray];It.prototype.SetterByBindingTypeAndVersioning=[[It.prototype._setValue_direct,It.prototype._setValue_direct_setNeedsUpdate,It.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[It.prototype._setValue_array,It.prototype._setValue_array_setNeedsUpdate,It.prototype._setValue_array_setMatrixWorldNeedsUpdate],[It.prototype._setValue_arrayElement,It.prototype._setValue_arrayElement_setNeedsUpdate,It.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[It.prototype._setValue_fromArray,It.prototype._setValue_fromArray_setNeedsUpdate,It.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Jd=new rt;class M_{constructor(e,t,n=0,s=1/0){this.ray=new ya(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new hu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Jd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Jd),this}intersectObject(e,t=!0,n=[]){return Gl(e,this,n,t),n.sort(Zd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Gl(e[s],this,n,t);return n.sort(Zd),n}}function Zd(i,e){return i.distance-e.distance}function Gl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Gl(r[a],e,t,!0)}}function Qd(i,e,t,n){const s=S_(n);switch(t){case df:return i*e;case au:return i*e/s.components*s.byteLength;case ou:return i*e/s.components*s.byteLength;case ff:return i*e*2/s.components*s.byteLength;case cu:return i*e*2/s.components*s.byteLength;case hf:return i*e*3/s.components*s.byteLength;case $n:return i*e*4/s.components*s.byteLength;case lu:return i*e*4/s.components*s.byteLength;case yo:case xo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Mo:case So:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ul:case hl:return Math.max(i,16)*Math.max(e,8)/4;case ll:case dl:return Math.max(i,8)*Math.max(e,8)/2;case fl:case pl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ml:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case gl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case _l:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case vl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case yl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case xl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ml:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Sl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case bl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Tl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case El:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case wl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Al:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Rl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Cl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Pl:case Il:case Ll:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Dl:case Nl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ul:case Ol:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function S_(i){switch(i){case pi:case of:return{byteLength:1,components:1};case oa:case cf:case va:return{byteLength:2,components:1};case su:case ru:return{byteLength:2,components:4};case Rs:case iu:case ti:return{byteLength:4,components:1};case lf:case uf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nu);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function zf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function b_(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,d);else{u.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<u.length;f++){const g=u[h],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,u[h]=v)}u.length=h+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];i.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var T_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,E_=`#ifdef USE_ALPHAHASH
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
#endif`,w_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,A_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,R_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,C_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,P_=`#ifdef USE_AOMAP
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
#endif`,I_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,L_=`#ifdef USE_BATCHING
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
#endif`,D_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,N_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,U_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,O_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,F_=`#ifdef USE_IRIDESCENCE
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
#endif`,B_=`#ifdef USE_BUMPMAP
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
#endif`,k_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,z_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,H_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,V_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,G_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,W_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,X_=`#if defined( USE_COLOR_ALPHA )
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
#endif`,q_=`#define PI 3.141592653589793
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
} // validated`,Y_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,K_=`vec3 transformedNormal = objectNormal;
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
#endif`,j_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,J_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Z_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Q_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ev="gl_FragColor = linearToOutputTexel( gl_FragColor );",tv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nv=`#ifdef USE_ENVMAP
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
#endif`,iv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,sv=`#ifdef USE_ENVMAP
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
#endif`,rv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,av=`#ifdef USE_ENVMAP
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
#endif`,ov=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,uv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dv=`#ifdef USE_GRADIENTMAP
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
}`,hv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mv=`uniform bool receiveShadow;
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
#endif`,gv=`#ifdef USE_ENVMAP
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
#endif`,_v=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mv=`PhysicalMaterial material;
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
#endif`,Sv=`struct PhysicalMaterial {
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
}`,bv=`
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
#endif`,Tv=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ev=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Av=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Pv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Iv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Lv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Dv=`#if defined( USE_POINTS_UV )
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
#endif`,Nv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Uv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ov=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Fv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kv=`#ifdef USE_MORPHTARGETS
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
#endif`,zv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Vv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Gv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$v=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xv=`#ifdef USE_NORMALMAP
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
#endif`,qv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Kv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Jv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Qv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ey=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ty=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ny=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,iy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ry=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ay=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,oy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,cy=`float getShadowMask() {
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
}`,ly=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,uy=`#ifdef USE_SKINNING
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
#endif`,dy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hy=`#ifdef USE_SKINNING
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
#endif`,fy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,py=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,my=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,_y=`#ifdef USE_TRANSMISSION
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
#endif`,vy=`#ifdef USE_TRANSMISSION
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
#endif`,yy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,My=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const by=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ty=`uniform sampler2D t2D;
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
}`,Ey=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ay=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ry=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cy=`#include <common>
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
}`,Py=`#if DEPTH_PACKING == 3200
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
}`,Iy=`#define DISTANCE
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
}`,Ly=`#define DISTANCE
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
}`,Dy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ny=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uy=`uniform float scale;
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
}`,Oy=`uniform vec3 diffuse;
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
}`,Fy=`#include <common>
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
}`,By=`uniform vec3 diffuse;
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
}`,ky=`#define LAMBERT
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
}`,zy=`#define LAMBERT
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
}`,Hy=`#define MATCAP
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
}`,Vy=`#define MATCAP
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
}`,Gy=`#define NORMAL
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
}`,Wy=`#define NORMAL
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
}`,$y=`#define PHONG
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
}`,Xy=`#define PHONG
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
}`,qy=`#define STANDARD
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
}`,Yy=`#define STANDARD
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
}`,Ky=`#define TOON
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
}`,jy=`#define TOON
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
}`,Jy=`uniform float size;
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
}`,Zy=`uniform vec3 diffuse;
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
}`,Qy=`#include <common>
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
}`,ex=`uniform vec3 color;
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
}`,tx=`uniform float rotation;
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
}`,nx=`uniform vec3 diffuse;
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
}`,ht={alphahash_fragment:T_,alphahash_pars_fragment:E_,alphamap_fragment:w_,alphamap_pars_fragment:A_,alphatest_fragment:R_,alphatest_pars_fragment:C_,aomap_fragment:P_,aomap_pars_fragment:I_,batching_pars_vertex:L_,batching_vertex:D_,begin_vertex:N_,beginnormal_vertex:U_,bsdfs:O_,iridescence_fragment:F_,bumpmap_pars_fragment:B_,clipping_planes_fragment:k_,clipping_planes_pars_fragment:z_,clipping_planes_pars_vertex:H_,clipping_planes_vertex:V_,color_fragment:G_,color_pars_fragment:W_,color_pars_vertex:$_,color_vertex:X_,common:q_,cube_uv_reflection_fragment:Y_,defaultnormal_vertex:K_,displacementmap_pars_vertex:j_,displacementmap_vertex:J_,emissivemap_fragment:Z_,emissivemap_pars_fragment:Q_,colorspace_fragment:ev,colorspace_pars_fragment:tv,envmap_fragment:nv,envmap_common_pars_fragment:iv,envmap_pars_fragment:sv,envmap_pars_vertex:rv,envmap_physical_pars_fragment:gv,envmap_vertex:av,fog_vertex:ov,fog_pars_vertex:cv,fog_fragment:lv,fog_pars_fragment:uv,gradientmap_pars_fragment:dv,lightmap_pars_fragment:hv,lights_lambert_fragment:fv,lights_lambert_pars_fragment:pv,lights_pars_begin:mv,lights_toon_fragment:_v,lights_toon_pars_fragment:vv,lights_phong_fragment:yv,lights_phong_pars_fragment:xv,lights_physical_fragment:Mv,lights_physical_pars_fragment:Sv,lights_fragment_begin:bv,lights_fragment_maps:Tv,lights_fragment_end:Ev,logdepthbuf_fragment:wv,logdepthbuf_pars_fragment:Av,logdepthbuf_pars_vertex:Rv,logdepthbuf_vertex:Cv,map_fragment:Pv,map_pars_fragment:Iv,map_particle_fragment:Lv,map_particle_pars_fragment:Dv,metalnessmap_fragment:Nv,metalnessmap_pars_fragment:Uv,morphinstance_vertex:Ov,morphcolor_vertex:Fv,morphnormal_vertex:Bv,morphtarget_pars_vertex:kv,morphtarget_vertex:zv,normal_fragment_begin:Hv,normal_fragment_maps:Vv,normal_pars_fragment:Gv,normal_pars_vertex:Wv,normal_vertex:$v,normalmap_pars_fragment:Xv,clearcoat_normal_fragment_begin:qv,clearcoat_normal_fragment_maps:Yv,clearcoat_pars_fragment:Kv,iridescence_pars_fragment:jv,opaque_fragment:Jv,packing:Zv,premultiplied_alpha_fragment:Qv,project_vertex:ey,dithering_fragment:ty,dithering_pars_fragment:ny,roughnessmap_fragment:iy,roughnessmap_pars_fragment:sy,shadowmap_pars_fragment:ry,shadowmap_pars_vertex:ay,shadowmap_vertex:oy,shadowmask_pars_fragment:cy,skinbase_vertex:ly,skinning_pars_vertex:uy,skinning_vertex:dy,skinnormal_vertex:hy,specularmap_fragment:fy,specularmap_pars_fragment:py,tonemapping_fragment:my,tonemapping_pars_fragment:gy,transmission_fragment:_y,transmission_pars_fragment:vy,uv_pars_fragment:yy,uv_pars_vertex:xy,uv_vertex:My,worldpos_vertex:Sy,background_vert:by,background_frag:Ty,backgroundCube_vert:Ey,backgroundCube_frag:wy,cube_vert:Ay,cube_frag:Ry,depth_vert:Cy,depth_frag:Py,distanceRGBA_vert:Iy,distanceRGBA_frag:Ly,equirect_vert:Dy,equirect_frag:Ny,linedashed_vert:Uy,linedashed_frag:Oy,meshbasic_vert:Fy,meshbasic_frag:By,meshlambert_vert:ky,meshlambert_frag:zy,meshmatcap_vert:Hy,meshmatcap_frag:Vy,meshnormal_vert:Gy,meshnormal_frag:Wy,meshphong_vert:$y,meshphong_frag:Xy,meshphysical_vert:qy,meshphysical_frag:Yy,meshtoon_vert:Ky,meshtoon_frag:jy,points_vert:Jy,points_frag:Zy,shadow_vert:Qy,shadow_frag:ex,sprite_vert:tx,sprite_frag:nx},Pe={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ut}},envmap:{envMap:{value:null},envMapRotation:{value:new ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ut},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0},uvTransform:{value:new ut}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}}},ui={basic:{uniforms:xn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:xn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new nt(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:xn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:xn([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:xn([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new nt(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:xn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:xn([Pe.points,Pe.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:xn([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:xn([Pe.common,Pe.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:xn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:xn([Pe.sprite,Pe.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ut}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:xn([Pe.common,Pe.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:xn([Pe.lights,Pe.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};ui.physical={uniforms:xn([ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ut},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ut},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ut},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ut},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ut},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ut}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const mo={r:0,b:0,g:0},ys=new Xt,ix=new rt;function sx(i,e,t,n,s,r,a){const o=new nt(0);let l=r===!0?0:1,c,d,u=null,h=0,f=null;function g(E){let x=E.isScene===!0?E.background:null;return x&&x.isTexture&&(x=(E.backgroundBlurriness>0?t:e).get(x)),x}function v(E){let x=!1;const R=g(E);R===null?p(o,l):R&&R.isColor&&(p(R,1),x=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,x){const R=g(x);R&&(R.isCubeTexture||R.mapping===zo)?(d===void 0&&(d=new Ct(new Vn(1,1,1),new cs({name:"BackgroundCubeMaterial",uniforms:_r(ui.backgroundCube.uniforms),vertexShader:ui.backgroundCube.vertexShader,fragmentShader:ui.backgroundCube.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(C,L,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),ys.copy(x.backgroundRotation),ys.x*=-1,ys.y*=-1,ys.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),d.material.uniforms.envMap.value=R,d.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(ix.makeRotationFromEuler(ys)),d.material.toneMapped=xt.getTransfer(R.colorSpace)!==Nt,(u!==R||h!==R.version||f!==i.toneMapping)&&(d.material.needsUpdate=!0,u=R,h=R.version,f=i.toneMapping),d.layers.enableAll(),E.unshift(d,d.geometry,d.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new Ct(new xa(2,2),new cs({name:"BackgroundMaterial",uniforms:_r(ui.background.uniforms),vertexShader:ui.background.vertexShader,fragmentShader:ui.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=xt.getTransfer(R.colorSpace)!==Nt,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||h!==R.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=R,h=R.version,f=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,x){E.getRGB(mo,Sf(i)),n.buffers.color.setClear(mo.r,mo.g,mo.b,x,a)}function T(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,x=1){o.set(E),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,p(o,l)},render:v,addToRenderList:m,dispose:T}}function rx(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(M,N,F,V,Z){let ee=!1;const ne=u(V,F,N);r!==ne&&(r=ne,c(r.object)),ee=f(M,V,F,Z),ee&&g(M,V,F,Z),Z!==null&&e.update(Z,i.ELEMENT_ARRAY_BUFFER),(ee||a)&&(a=!1,x(M,N,F,V),Z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function d(M){return i.deleteVertexArray(M)}function u(M,N,F){const V=F.wireframe===!0;let Z=n[M.id];Z===void 0&&(Z={},n[M.id]=Z);let ee=Z[N.id];ee===void 0&&(ee={},Z[N.id]=ee);let ne=ee[V];return ne===void 0&&(ne=h(l()),ee[V]=ne),ne}function h(M){const N=[],F=[],V=[];for(let Z=0;Z<t;Z++)N[Z]=0,F[Z]=0,V[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:F,attributeDivisors:V,object:M,attributes:{},index:null}}function f(M,N,F,V){const Z=r.attributes,ee=N.attributes;let ne=0;const ie=F.getAttributes();for(const q in ie)if(ie[q].location>=0){const me=Z[q];let Ve=ee[q];if(Ve===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(Ve=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(Ve=M.instanceColor)),me===void 0||me.attribute!==Ve||Ve&&me.data!==Ve.data)return!0;ne++}return r.attributesNum!==ne||r.index!==V}function g(M,N,F,V){const Z={},ee=N.attributes;let ne=0;const ie=F.getAttributes();for(const q in ie)if(ie[q].location>=0){let me=ee[q];me===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(me=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(me=M.instanceColor));const Ve={};Ve.attribute=me,me&&me.data&&(Ve.data=me.data),Z[q]=Ve,ne++}r.attributes=Z,r.attributesNum=ne,r.index=V}function v(){const M=r.newAttributes;for(let N=0,F=M.length;N<F;N++)M[N]=0}function m(M){p(M,0)}function p(M,N){const F=r.newAttributes,V=r.enabledAttributes,Z=r.attributeDivisors;F[M]=1,V[M]===0&&(i.enableVertexAttribArray(M),V[M]=1),Z[M]!==N&&(i.vertexAttribDivisor(M,N),Z[M]=N)}function T(){const M=r.newAttributes,N=r.enabledAttributes;for(let F=0,V=N.length;F<V;F++)N[F]!==M[F]&&(i.disableVertexAttribArray(F),N[F]=0)}function E(M,N,F,V,Z,ee,ne){ne===!0?i.vertexAttribIPointer(M,N,F,Z,ee):i.vertexAttribPointer(M,N,F,V,Z,ee)}function x(M,N,F,V){v();const Z=V.attributes,ee=F.getAttributes(),ne=N.defaultAttributeValues;for(const ie in ee){const q=ee[ie];if(q.location>=0){let pe=Z[ie];if(pe===void 0&&(ie==="instanceMatrix"&&M.instanceMatrix&&(pe=M.instanceMatrix),ie==="instanceColor"&&M.instanceColor&&(pe=M.instanceColor)),pe!==void 0){const me=pe.normalized,Ve=pe.itemSize,st=e.get(pe);if(st===void 0)continue;const _t=st.buffer,St=st.type,ft=st.bytesPerElement,se=St===i.INT||St===i.UNSIGNED_INT||pe.gpuType===iu;if(pe.isInterleavedBufferAttribute){const K=pe.data,_e=K.stride,ye=pe.offset;if(K.isInstancedInterleavedBuffer){for(let Ie=0;Ie<q.locationSize;Ie++)p(q.location+Ie,K.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Ie=0;Ie<q.locationSize;Ie++)m(q.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,_t);for(let Ie=0;Ie<q.locationSize;Ie++)E(q.location+Ie,Ve/q.locationSize,St,me,_e*ft,(ye+Ve/q.locationSize*Ie)*ft,se)}else{if(pe.isInstancedBufferAttribute){for(let K=0;K<q.locationSize;K++)p(q.location+K,pe.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let K=0;K<q.locationSize;K++)m(q.location+K);i.bindBuffer(i.ARRAY_BUFFER,_t);for(let K=0;K<q.locationSize;K++)E(q.location+K,Ve/q.locationSize,St,me,Ve*ft,Ve/q.locationSize*K*ft,se)}}else if(ne!==void 0){const me=ne[ie];if(me!==void 0)switch(me.length){case 2:i.vertexAttrib2fv(q.location,me);break;case 3:i.vertexAttrib3fv(q.location,me);break;case 4:i.vertexAttrib4fv(q.location,me);break;default:i.vertexAttrib1fv(q.location,me)}}}}T()}function R(){O();for(const M in n){const N=n[M];for(const F in N){const V=N[F];for(const Z in V)d(V[Z].object),delete V[Z];delete N[F]}delete n[M]}}function C(M){if(n[M.id]===void 0)return;const N=n[M.id];for(const F in N){const V=N[F];for(const Z in V)d(V[Z].object),delete V[Z];delete N[F]}delete n[M.id]}function L(M){for(const N in n){const F=n[N];if(F[M.id]===void 0)continue;const V=F[M.id];for(const Z in V)d(V[Z].object),delete V[Z];delete F[M.id]}}function O(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:O,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:m,disableUnusedAttributes:T}}function ax(i,e,t){let n;function s(c){n=c}function r(c,d){i.drawArrays(n,c,d),t.update(d,n,1)}function a(c,d,u){u!==0&&(i.drawArraysInstanced(n,c,d,u),t.update(d,n,u))}function o(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,u);let f=0;for(let g=0;g<u;g++)f+=d[g];t.update(f,n,1)}function l(c,d,u,h){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],d[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,d,0,h,0,u);let g=0;for(let v=0;v<u;v++)g+=d[v]*h[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function ox(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==$n&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const O=L===va&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==pi&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==ti&&!O)}function l(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:x,vertexTextures:R,maxSamples:C}}function cx(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new ns,o=new ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const f=u.length!==0||h||n!==0||s;return s=h,n=u.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?d(null):c();else{const T=r?0:n,E=T*4;let x=p.clippingState||null;l.value=x,x=d(g,h,E,f);for(let R=0;R!==E;++R)x[R]=t[R];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,h,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,T=h.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,x=f;E!==v;++E,x+=4)a.copy(u[E]).applyMatrix4(T,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function lx(i){let e=new WeakMap;function t(a,o){return o===ol?a.mapping=fr:o===cl&&(a.mapping=pr),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ol||o===cl)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new f0(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const rr=4,eh=[.125,.215,.35,.446,.526,.582],Es=20,Uc=new bu,th=new nt;let Oc=null,Fc=0,Bc=0,kc=!1;const bs=(1+Math.sqrt(5))/2,ir=1/bs,nh=[new A(-bs,ir,0),new A(bs,ir,0),new A(-ir,0,bs),new A(ir,0,bs),new A(0,bs,-ir),new A(0,bs,ir),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],ux=new A;class ih{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=ux}=r;Oc=this._renderer.getRenderTarget(),Fc=this._renderer.getActiveCubeFace(),Bc=this._renderer.getActiveMipmapLevel(),kc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ah(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Oc,Fc,Bc),this._renderer.xr.enabled=kc,e.scissorTest=!1,go(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fr||e.mapping===pr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Oc=this._renderer.getRenderTarget(),Fc=this._renderer.getActiveCubeFace(),Bc=this._renderer.getActiveMipmapLevel(),kc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:On,minFilter:On,generateMipmaps:!1,type:va,format:$n,colorSpace:wn,depthBuffer:!1},s=sh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=dx(r)),this._blurMaterial=hx(r,e,t)}return s}_compileMaterial(e){const t=new Ct(this._lodPlanes[0],e);this._renderer.compile(t,Uc)}_sceneToCubeUV(e,t,n,s,r){const l=new Mn(90,1,t,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(th),u.toneMapping=as,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const v=new Wn({name:"PMREM.Background",side:Pn,depthWrite:!1,depthTest:!1}),m=new Ct(new Vn,v);let p=!1;const T=e.background;T?T.isColor&&(v.color.copy(T),e.background=null,p=!0):(v.color.copy(th),p=!0);for(let E=0;E<6;E++){const x=E%3;x===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[E],r.y,r.z)):x===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[E]));const R=this._cubeSize;go(s,x*R,E>2?R:0,R,R),u.setRenderTarget(s),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=T}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===fr||e.mapping===pr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ah()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ct(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;go(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Uc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=nh[(s-r-1)%nh.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new Ct(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Es-1),v=r/g,m=isFinite(r)?1+Math.floor(d*v):Es;m>Es&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Es}`);const p=[];let T=0;for(let L=0;L<Es;++L){const O=L/v,b=Math.exp(-O*O/2);p.push(b),L===0?T+=b:L<m&&(T+=2*b)}for(let L=0;L<p.length;L++)p[L]=p[L]/T;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:E}=this;h.dTheta.value=g,h.mipInt.value=E-n;const x=this._sizeLods[s],R=3*x*(s>E-rr?s-E+rr:0),C=4*(this._cubeSize-x);go(t,R,C,3*x,2*x),l.setRenderTarget(t),l.render(u,Uc)}}function dx(i){const e=[],t=[],n=[];let s=i;const r=i-rr+1+eh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-rr?l=eh[a-i+rr-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],f=6,g=6,v=3,m=2,p=1,T=new Float32Array(v*g*f),E=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let C=0;C<f;C++){const L=C%3*2/3-1,O=C>2?0:-1,b=[L,O,0,L+2/3,O,0,L+2/3,O+1,0,L,O,0,L+2/3,O+1,0,L,O+1,0];T.set(b,v*g*C),E.set(h,m*g*C);const M=[C,C,C,C,C,C];x.set(M,p*g*C)}const R=new cn;R.setAttribute("position",new En(T,v)),R.setAttribute("uv",new En(E,m)),R.setAttribute("faceIndex",new En(x,p)),e.push(R),s>rr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function sh(i,e,t){const n=new Cs(i,e,t);return n.texture.mapping=zo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function go(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function hx(i,e,t){const n=new Float32Array(Es),s=new A(0,1,0);return new cs({name:"SphericalGaussianBlur",defines:{n:Es,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:wu(),fragmentShader:`

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
		`,blending:rs,depthTest:!1,depthWrite:!1})}function rh(){return new cs({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wu(),fragmentShader:`

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
		`,blending:rs,depthTest:!1,depthWrite:!1})}function ah(){return new cs({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:rs,depthTest:!1,depthWrite:!1})}function wu(){return`

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
	`}function fx(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ol||l===cl,d=l===fr||l===pr;if(c||d){let u=e.get(o);const h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new ih(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||d&&f&&s(f)?(t===null&&(t=new ih(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function px(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&pa("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function mx(i,e,t,n){const s={},r=new WeakMap;function a(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(u){const h=u.attributes;for(const f in h)e.update(h[f],i.ARRAY_BUFFER)}function c(u){const h=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const T=f.array;v=f.version;for(let E=0,x=T.length;E<x;E+=3){const R=T[E+0],C=T[E+1],L=T[E+2];h.push(R,C,C,L,L,R)}}else if(g!==void 0){const T=g.array;v=g.version;for(let E=0,x=T.length/3-1;E<x;E+=3){const R=E+0,C=E+1,L=E+2;h.push(R,C,C,L,L,R)}}else return;const m=new(_f(h)?Mf:xf)(h,1);m.version=v;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function d(u){const h=r.get(u);if(h){const f=u.index;f!==null&&h.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function gx(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,f){i.drawElements(n,f,r,h*a),t.update(f,n,1)}function c(h,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,h*a,g),t.update(f,n,g))}function d(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(h,f,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,h,0,v,0,g);let p=0;for(let T=0;T<g;T++)p+=f[T]*v[T];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function _x(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function vx(i,e,t){const n=new WeakMap,s=new wt;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=n.get(o);if(h===void 0||h.count!==u){let M=function(){O.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var f=M;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let R=o.attributes.position.count*x,C=1;R>e.maxTextureSize&&(C=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const L=new Float32Array(R*C*4*u),O=new vf(L,R,C,u);O.type=ti,O.needsUpdate=!0;const b=x*4;for(let N=0;N<u;N++){const F=p[N],V=T[N],Z=E[N],ee=R*C*4*N;for(let ne=0;ne<F.count;ne++){const ie=ne*b;g===!0&&(s.fromBufferAttribute(F,ne),L[ee+ie+0]=s.x,L[ee+ie+1]=s.y,L[ee+ie+2]=s.z,L[ee+ie+3]=0),v===!0&&(s.fromBufferAttribute(V,ne),L[ee+ie+4]=s.x,L[ee+ie+5]=s.y,L[ee+ie+6]=s.z,L[ee+ie+7]=0),m===!0&&(s.fromBufferAttribute(Z,ne),L[ee+ie+8]=s.x,L[ee+ie+9]=s.y,L[ee+ie+10]=s.z,L[ee+ie+11]=Z.itemSize===4?s.w:1)}}h={count:u,texture:O,size:new He(R,C)},n.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function yx(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const Hf=new tn,oh=new Df(1,1),Vf=new vf,Gf=new jg,Wf=new Tf,ch=[],lh=[],uh=new Float32Array(16),dh=new Float32Array(9),hh=new Float32Array(4);function Er(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=ch[s];if(r===void 0&&(r=new Float32Array(s),ch[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function nn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function sn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Vo(i,e){let t=lh[e];t===void 0&&(t=new Int32Array(e),lh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function xx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Mx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;i.uniform2fv(this.addr,e),sn(t,e)}}function Sx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(nn(t,e))return;i.uniform3fv(this.addr,e),sn(t,e)}}function bx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;i.uniform4fv(this.addr,e),sn(t,e)}}function Tx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;hh.set(n),i.uniformMatrix2fv(this.addr,!1,hh),sn(t,n)}}function Ex(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;dh.set(n),i.uniformMatrix3fv(this.addr,!1,dh),sn(t,n)}}function wx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;uh.set(n),i.uniformMatrix4fv(this.addr,!1,uh),sn(t,n)}}function Ax(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Rx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;i.uniform2iv(this.addr,e),sn(t,e)}}function Cx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;i.uniform3iv(this.addr,e),sn(t,e)}}function Px(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;i.uniform4iv(this.addr,e),sn(t,e)}}function Ix(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Lx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;i.uniform2uiv(this.addr,e),sn(t,e)}}function Dx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;i.uniform3uiv(this.addr,e),sn(t,e)}}function Nx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;i.uniform4uiv(this.addr,e),sn(t,e)}}function Ux(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(oh.compareFunction=gf,r=oh):r=Hf,t.setTexture2D(e||r,s)}function Ox(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Gf,s)}function Fx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Wf,s)}function Bx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Vf,s)}function kx(i){switch(i){case 5126:return xx;case 35664:return Mx;case 35665:return Sx;case 35666:return bx;case 35674:return Tx;case 35675:return Ex;case 35676:return wx;case 5124:case 35670:return Ax;case 35667:case 35671:return Rx;case 35668:case 35672:return Cx;case 35669:case 35673:return Px;case 5125:return Ix;case 36294:return Lx;case 36295:return Dx;case 36296:return Nx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ux;case 35679:case 36299:case 36307:return Ox;case 35680:case 36300:case 36308:case 36293:return Fx;case 36289:case 36303:case 36311:case 36292:return Bx}}function zx(i,e){i.uniform1fv(this.addr,e)}function Hx(i,e){const t=Er(e,this.size,2);i.uniform2fv(this.addr,t)}function Vx(i,e){const t=Er(e,this.size,3);i.uniform3fv(this.addr,t)}function Gx(i,e){const t=Er(e,this.size,4);i.uniform4fv(this.addr,t)}function Wx(i,e){const t=Er(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function $x(i,e){const t=Er(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Xx(i,e){const t=Er(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function qx(i,e){i.uniform1iv(this.addr,e)}function Yx(i,e){i.uniform2iv(this.addr,e)}function Kx(i,e){i.uniform3iv(this.addr,e)}function jx(i,e){i.uniform4iv(this.addr,e)}function Jx(i,e){i.uniform1uiv(this.addr,e)}function Zx(i,e){i.uniform2uiv(this.addr,e)}function Qx(i,e){i.uniform3uiv(this.addr,e)}function eM(i,e){i.uniform4uiv(this.addr,e)}function tM(i,e,t){const n=this.cache,s=e.length,r=Vo(t,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Hf,r[a])}function nM(i,e,t){const n=this.cache,s=e.length,r=Vo(t,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Gf,r[a])}function iM(i,e,t){const n=this.cache,s=e.length,r=Vo(t,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Wf,r[a])}function sM(i,e,t){const n=this.cache,s=e.length,r=Vo(t,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Vf,r[a])}function rM(i){switch(i){case 5126:return zx;case 35664:return Hx;case 35665:return Vx;case 35666:return Gx;case 35674:return Wx;case 35675:return $x;case 35676:return Xx;case 5124:case 35670:return qx;case 35667:case 35671:return Yx;case 35668:case 35672:return Kx;case 35669:case 35673:return jx;case 5125:return Jx;case 36294:return Zx;case 36295:return Qx;case 36296:return eM;case 35678:case 36198:case 36298:case 36306:case 35682:return tM;case 35679:case 36299:case 36307:return nM;case 35680:case 36300:case 36308:case 36293:return iM;case 36289:case 36303:case 36311:case 36292:return sM}}class aM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=kx(t.type)}}class oM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rM(t.type)}}class cM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const zc=/(\w+)(\])?(\[|\.)?/g;function fh(i,e){i.seq.push(e),i.map[e.id]=e}function lM(i,e,t){const n=i.name,s=n.length;for(zc.lastIndex=0;;){const r=zc.exec(n),a=zc.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){fh(t,c===void 0?new aM(o,i,e):new oM(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new cM(o),fh(t,u)),t=u}}}class bo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);lM(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function ph(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const uM=37297;let dM=0;function hM(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const mh=new ut;function fM(i){xt._getMatrix(mh,xt.workingColorSpace,i);const e=`mat3( ${mh.elements.map(t=>t.toFixed(4))} )`;switch(xt.getTransfer(i)){case Ro:return[e,"LinearTransferOETF"];case Nt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function gh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+hM(i.getShaderSource(e),o)}else return r}function pM(i,e){const t=fM(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function mM(i,e){let t;switch(e){case cg:t="Linear";break;case lg:t="Reinhard";break;case ug:t="Cineon";break;case sf:t="ACESFilmic";break;case hg:t="AgX";break;case fg:t="Neutral";break;case dg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const _o=new A;function gM(){xt.getLuminanceCoefficients(_o);const i=_o.x.toFixed(4),e=_o.y.toFixed(4),t=_o.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _M(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(jr).join(`
`)}function vM(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function yM(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function jr(i){return i!==""}function _h(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wl(i){return i.replace(xM,SM)}const MM=new Map;function SM(i,e){let t=ht[e];if(t===void 0){const n=MM.get(e);if(n!==void 0)t=ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Wl(t)}const bM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yh(i){return i.replace(bM,TM)}function TM(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function xh(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function EM(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ef?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===tf?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Pi&&(e="SHADOWMAP_TYPE_VSM"),e}function wM(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case fr:case pr:e="ENVMAP_TYPE_CUBE";break;case zo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function AM(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case pr:e="ENVMAP_MODE_REFRACTION";break}return e}function RM(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case nf:e="ENVMAP_BLENDING_MULTIPLY";break;case ag:e="ENVMAP_BLENDING_MIX";break;case og:e="ENVMAP_BLENDING_ADD";break}return e}function CM(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function PM(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=EM(t),c=wM(t),d=AM(t),u=RM(t),h=CM(t),f=_M(t),g=vM(r),v=s.createProgram();let m,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(jr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(jr).join(`
`),p.length>0&&(p+=`
`)):(m=[xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(jr).join(`
`),p=[xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==as?"#define TONE_MAPPING":"",t.toneMapping!==as?ht.tonemapping_pars_fragment:"",t.toneMapping!==as?mM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,pM("linearToOutputTexel",t.outputColorSpace),gM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(jr).join(`
`)),a=Wl(a),a=_h(a,t),a=vh(a,t),o=Wl(o),o=_h(o,t),o=vh(o,t),a=yh(a),o=yh(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===dd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===dd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=T+m+a,x=T+p+o,R=ph(s,s.VERTEX_SHADER,E),C=ph(s,s.FRAGMENT_SHADER,x);s.attachShader(v,R),s.attachShader(v,C),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function L(N){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(v)||"",V=s.getShaderInfoLog(R)||"",Z=s.getShaderInfoLog(C)||"",ee=F.trim(),ne=V.trim(),ie=Z.trim();let q=!0,pe=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,R,C);else{const me=gh(s,R,"vertex"),Ve=gh(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+ee+`
`+me+`
`+Ve)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):(ne===""||ie==="")&&(pe=!1);pe&&(N.diagnostics={runnable:q,programLog:ee,vertexShader:{log:ne,prefix:m},fragmentShader:{log:ie,prefix:p}})}s.deleteShader(R),s.deleteShader(C),O=new bo(s,v),b=yM(s,v)}let O;this.getUniforms=function(){return O===void 0&&L(this),O};let b;this.getAttributes=function(){return b===void 0&&L(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,uM)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dM++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=C,this}let IM=0;class LM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new DM(e),t.set(e,n)),n}}class DM{constructor(e){this.id=IM++,this.code=e,this.usedTimes=0}}function NM(i,e,t,n,s,r,a){const o=new hu,l=new LM,c=new Set,d=[],u=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,M,N,F,V){const Z=F.fog,ee=V.geometry,ne=b.isMeshStandardMaterial?F.environment:null,ie=(b.isMeshStandardMaterial?t:e).get(b.envMap||ne),q=ie&&ie.mapping===zo?ie.image.height:null,pe=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const me=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,Ve=me!==void 0?me.length:0;let st=0;ee.morphAttributes.position!==void 0&&(st=1),ee.morphAttributes.normal!==void 0&&(st=2),ee.morphAttributes.color!==void 0&&(st=3);let _t,St,ft,se;if(pe){const Me=ui[pe];_t=Me.vertexShader,St=Me.fragmentShader}else _t=b.vertexShader,St=b.fragmentShader,l.update(b),ft=l.getVertexShaderID(b),se=l.getFragmentShaderID(b);const K=i.getRenderTarget(),_e=i.state.buffers.depth.getReversed(),ye=V.isInstancedMesh===!0,Ie=V.isBatchedMesh===!0,Ze=!!b.map,Mt=!!b.matcap,D=!!ie,lt=!!b.aoMap,je=!!b.lightMap,Xe=!!b.bumpMap,Te=!!b.normalMap,Qe=!!b.displacementMap,Ne=!!b.emissiveMap,at=!!b.metalnessMap,Yt=!!b.roughnessMap,Ht=b.anisotropy>0,I=b.clearcoat>0,S=b.dispersion>0,X=b.iridescence>0,re=b.sheen>0,fe=b.transmission>0,Y=Ht&&!!b.anisotropyMap,Ue=I&&!!b.clearcoatMap,Q=I&&!!b.clearcoatNormalMap,ce=I&&!!b.clearcoatRoughnessMap,Fe=X&&!!b.iridescenceMap,ue=X&&!!b.iridescenceThicknessMap,Ce=re&&!!b.sheenColorMap,qe=re&&!!b.sheenRoughnessMap,Be=!!b.specularMap,Re=!!b.specularColorMap,it=!!b.specularIntensityMap,k=fe&&!!b.transmissionMap,oe=fe&&!!b.thicknessMap,Ee=!!b.gradientMap,Oe=!!b.alphaMap,ve=b.alphaTest>0,te=!!b.alphaHash,ke=!!b.extensions;let be=as;b.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(be=i.toneMapping);const ot={shaderID:pe,shaderType:b.type,shaderName:b.name,vertexShader:_t,fragmentShader:St,defines:b.defines,customVertexShaderID:ft,customFragmentShaderID:se,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Ie,batchingColor:Ie&&V._colorsTexture!==null,instancing:ye,instancingColor:ye&&V.instanceColor!==null,instancingMorph:ye&&V.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:wn,alphaToCoverage:!!b.alphaToCoverage,map:Ze,matcap:Mt,envMap:D,envMapMode:D&&ie.mapping,envMapCubeUVHeight:q,aoMap:lt,lightMap:je,bumpMap:Xe,normalMap:Te,displacementMap:h&&Qe,emissiveMap:Ne,normalMapObjectSpace:Te&&b.normalMapType===yg,normalMapTangentSpace:Te&&b.normalMapType===mf,metalnessMap:at,roughnessMap:Yt,anisotropy:Ht,anisotropyMap:Y,clearcoat:I,clearcoatMap:Ue,clearcoatNormalMap:Q,clearcoatRoughnessMap:ce,dispersion:S,iridescence:X,iridescenceMap:Fe,iridescenceThicknessMap:ue,sheen:re,sheenColorMap:Ce,sheenRoughnessMap:qe,specularMap:Be,specularColorMap:Re,specularIntensityMap:it,transmission:fe,transmissionMap:k,thicknessMap:oe,gradientMap:Ee,opaque:b.transparent===!1&&b.blending===ar&&b.alphaToCoverage===!1,alphaMap:Oe,alphaTest:ve,alphaHash:te,combine:b.combine,mapUv:Ze&&v(b.map.channel),aoMapUv:lt&&v(b.aoMap.channel),lightMapUv:je&&v(b.lightMap.channel),bumpMapUv:Xe&&v(b.bumpMap.channel),normalMapUv:Te&&v(b.normalMap.channel),displacementMapUv:Qe&&v(b.displacementMap.channel),emissiveMapUv:Ne&&v(b.emissiveMap.channel),metalnessMapUv:at&&v(b.metalnessMap.channel),roughnessMapUv:Yt&&v(b.roughnessMap.channel),anisotropyMapUv:Y&&v(b.anisotropyMap.channel),clearcoatMapUv:Ue&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:Q&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Fe&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:qe&&v(b.sheenRoughnessMap.channel),specularMapUv:Be&&v(b.specularMap.channel),specularColorMapUv:Re&&v(b.specularColorMap.channel),specularIntensityMapUv:it&&v(b.specularIntensityMap.channel),transmissionMapUv:k&&v(b.transmissionMap.channel),thicknessMapUv:oe&&v(b.thicknessMap.channel),alphaMapUv:Oe&&v(b.alphaMap.channel),vertexTangents:!!ee.attributes.tangent&&(Te||Ht),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!ee.attributes.uv&&(Ze||Oe),fog:!!Z,useFog:b.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:_e,skinning:V.isSkinnedMesh===!0,morphTargets:ee.morphAttributes.position!==void 0,morphNormals:ee.morphAttributes.normal!==void 0,morphColors:ee.morphAttributes.color!==void 0,morphTargetsCount:Ve,morphTextureStride:st,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:be,decodeVideoTexture:Ze&&b.map.isVideoTexture===!0&&xt.getTransfer(b.map.colorSpace)===Nt,decodeVideoTextureEmissive:Ne&&b.emissiveMap.isVideoTexture===!0&&xt.getTransfer(b.emissiveMap.colorSpace)===Nt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Qn,flipSided:b.side===Pn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:ke&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&b.extensions.multiDraw===!0||Ie)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ot.vertexUv1s=c.has(1),ot.vertexUv2s=c.has(2),ot.vertexUv3s=c.has(3),c.clear(),ot}function p(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const N in b.defines)M.push(N),M.push(b.defines[N]);return b.isRawShaderMaterial===!1&&(T(M,b),E(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function T(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function E(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function x(b){const M=g[b.type];let N;if(M){const F=ui[M];N=l0.clone(F.uniforms)}else N=b.uniforms;return N}function R(b,M){let N;for(let F=0,V=d.length;F<V;F++){const Z=d[F];if(Z.cacheKey===M){N=Z,++N.usedTimes;break}}return N===void 0&&(N=new PM(i,M,b,r),d.push(N)),N}function C(b){if(--b.usedTimes===0){const M=d.indexOf(b);d[M]=d[d.length-1],d.pop(),b.destroy()}}function L(b){l.remove(b)}function O(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:R,releaseProgram:C,releaseShaderCache:L,programs:d,dispose:O}}function UM(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function OM(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Mh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Sh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,h,f,g,v,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:h,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),e++,p}function o(u,h,f,g,v,m){const p=a(u,h,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,h,f,g,v,m){const p=a(u,h,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,h){t.length>1&&t.sort(u||OM),n.length>1&&n.sort(h||Mh),s.length>1&&s.sort(h||Mh)}function d(){for(let u=e,h=i.length;u<h;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:d,sort:c}}function FM(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Sh,i.set(n,[a])):s>=r.length?(a=new Sh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function BM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new nt};break;case"SpotLight":t={position:new A,direction:new A,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new A,halfWidth:new A,halfHeight:new A};break}return i[e.id]=t,t}}}function kM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let zM=0;function HM(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function VM(i){const e=new BM,t=kM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);const s=new A,r=new rt,a=new rt;function o(c){let d=0,u=0,h=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,T=0,E=0,x=0,R=0,C=0,L=0;c.sort(HM);for(let b=0,M=c.length;b<M;b++){const N=c[b],F=N.color,V=N.intensity,Z=N.distance,ee=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)d+=F.r*V,u+=F.g*V,h+=F.b*V;else if(N.isLightProbe){for(let ne=0;ne<9;ne++)n.probe[ne].addScaledVector(N.sh.coefficients[ne],V);L++}else if(N.isDirectionalLight){const ne=e.get(N);if(ne.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const ie=N.shadow,q=t.get(N);q.shadowIntensity=ie.intensity,q.shadowBias=ie.bias,q.shadowNormalBias=ie.normalBias,q.shadowRadius=ie.radius,q.shadowMapSize=ie.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=ee,n.directionalShadowMatrix[f]=N.shadow.matrix,T++}n.directional[f]=ne,f++}else if(N.isSpotLight){const ne=e.get(N);ne.position.setFromMatrixPosition(N.matrixWorld),ne.color.copy(F).multiplyScalar(V),ne.distance=Z,ne.coneCos=Math.cos(N.angle),ne.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),ne.decay=N.decay,n.spot[v]=ne;const ie=N.shadow;if(N.map&&(n.spotLightMap[R]=N.map,R++,ie.updateMatrices(N),N.castShadow&&C++),n.spotLightMatrix[v]=ie.matrix,N.castShadow){const q=t.get(N);q.shadowIntensity=ie.intensity,q.shadowBias=ie.bias,q.shadowNormalBias=ie.normalBias,q.shadowRadius=ie.radius,q.shadowMapSize=ie.mapSize,n.spotShadow[v]=q,n.spotShadowMap[v]=ee,x++}v++}else if(N.isRectAreaLight){const ne=e.get(N);ne.color.copy(F).multiplyScalar(V),ne.halfWidth.set(N.width*.5,0,0),ne.halfHeight.set(0,N.height*.5,0),n.rectArea[m]=ne,m++}else if(N.isPointLight){const ne=e.get(N);if(ne.color.copy(N.color).multiplyScalar(N.intensity),ne.distance=N.distance,ne.decay=N.decay,N.castShadow){const ie=N.shadow,q=t.get(N);q.shadowIntensity=ie.intensity,q.shadowBias=ie.bias,q.shadowNormalBias=ie.normalBias,q.shadowRadius=ie.radius,q.shadowMapSize=ie.mapSize,q.shadowCameraNear=ie.camera.near,q.shadowCameraFar=ie.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=ee,n.pointShadowMatrix[g]=N.shadow.matrix,E++}n.point[g]=ne,g++}else if(N.isHemisphereLight){const ne=e.get(N);ne.skyColor.copy(N.color).multiplyScalar(V),ne.groundColor.copy(N.groundColor).multiplyScalar(V),n.hemi[p]=ne,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pe.LTC_FLOAT_1,n.rectAreaLTC2=Pe.LTC_FLOAT_2):(n.rectAreaLTC1=Pe.LTC_HALF_1,n.rectAreaLTC2=Pe.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;const O=n.hash;(O.directionalLength!==f||O.pointLength!==g||O.spotLength!==v||O.rectAreaLength!==m||O.hemiLength!==p||O.numDirectionalShadows!==T||O.numPointShadows!==E||O.numSpotShadows!==x||O.numSpotMaps!==R||O.numLightProbes!==L)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=x+R-C,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=L,O.directionalLength=f,O.pointLength=g,O.spotLength=v,O.rectAreaLength=m,O.hemiLength=p,O.numDirectionalShadows=T,O.numPointShadows=E,O.numSpotShadows=x,O.numSpotMaps=R,O.numLightProbes=L,n.version=zM++)}function l(c,d){let u=0,h=0,f=0,g=0,v=0;const m=d.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){const E=c[p];if(E.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(E.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(E.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(E.width*.5,0,0),x.halfHeight.set(0,E.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const x=n.point[h];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),h++}else if(E.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(E.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function bh(i){const e=new VM(i),t=[],n=[];function s(d){c.camera=d,t.length=0,n.length=0}function r(d){t.push(d)}function a(d){n.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function GM(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new bh(i),e.set(s,[o])):r>=a.length?(o=new bh(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const WM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$M=`uniform sampler2D shadow_pass;
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
}`;function XM(i,e,t){let n=new mu;const s=new He,r=new He,a=new wt,o=new V0({depthPacking:vg}),l=new G0,c={},d=t.maxTextureSize,u={[Oi]:Pn,[Pn]:Oi,[Qn]:Qn},h=new cs({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:WM,fragmentShader:$M}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new cn;g.setAttribute("position",new En(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ct(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ef;let p=this.type;this.render=function(C,L,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const b=i.getRenderTarget(),M=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),F=i.state;F.setBlending(rs),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const V=p!==Pi&&this.type===Pi,Z=p===Pi&&this.type!==Pi;for(let ee=0,ne=C.length;ee<ne;ee++){const ie=C[ee],q=ie.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const pe=q.getFrameExtents();if(s.multiply(pe),r.copy(q.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/pe.x),s.x=r.x*pe.x,q.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/pe.y),s.y=r.y*pe.y,q.mapSize.y=r.y)),q.map===null||V===!0||Z===!0){const Ve=this.type!==Pi?{minFilter:Tn,magFilter:Tn}:{};q.map!==null&&q.map.dispose(),q.map=new Cs(s.x,s.y,Ve),q.map.texture.name=ie.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();const me=q.getViewportCount();for(let Ve=0;Ve<me;Ve++){const st=q.getViewport(Ve);a.set(r.x*st.x,r.y*st.y,r.x*st.z,r.y*st.w),F.viewport(a),q.updateMatrices(ie,Ve),n=q.getFrustum(),x(L,O,q.camera,ie,this.type)}q.isPointLightShadow!==!0&&this.type===Pi&&T(q,O),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,N)};function T(C,L){const O=e.update(v);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Cs(s.x,s.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(L,null,O,h,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(L,null,O,f,v,null)}function E(C,L,O,b){let M=null;const N=O.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(N!==void 0)M=N;else if(M=O.isPointLight===!0?l:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const F=M.uuid,V=L.uuid;let Z=c[F];Z===void 0&&(Z={},c[F]=Z);let ee=Z[V];ee===void 0&&(ee=M.clone(),Z[V]=ee,L.addEventListener("dispose",R)),M=ee}if(M.visible=L.visible,M.wireframe=L.wireframe,b===Pi?M.side=L.shadowSide!==null?L.shadowSide:L.side:M.side=L.shadowSide!==null?L.shadowSide:u[L.side],M.alphaMap=L.alphaMap,M.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,M.map=L.map,M.clipShadows=L.clipShadows,M.clippingPlanes=L.clippingPlanes,M.clipIntersection=L.clipIntersection,M.displacementMap=L.displacementMap,M.displacementScale=L.displacementScale,M.displacementBias=L.displacementBias,M.wireframeLinewidth=L.wireframeLinewidth,M.linewidth=L.linewidth,O.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const F=i.properties.get(M);F.light=O}return M}function x(C,L,O,b,M){if(C.visible===!1)return;if(C.layers.test(L.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===Pi)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,C.matrixWorld);const V=e.update(C),Z=C.material;if(Array.isArray(Z)){const ee=V.groups;for(let ne=0,ie=ee.length;ne<ie;ne++){const q=ee[ne],pe=Z[q.materialIndex];if(pe&&pe.visible){const me=E(C,pe,b,M);C.onBeforeShadow(i,C,L,O,V,me,q),i.renderBufferDirect(O,null,V,me,C,q),C.onAfterShadow(i,C,L,O,V,me,q)}}}else if(Z.visible){const ee=E(C,Z,b,M);C.onBeforeShadow(i,C,L,O,V,ee,null),i.renderBufferDirect(O,null,V,ee,C,null),C.onAfterShadow(i,C,L,O,V,ee,null)}}const F=C.children;for(let V=0,Z=F.length;V<Z;V++)x(F[V],L,O,b,M)}function R(C){C.target.removeEventListener("dispose",R);for(const O in c){const b=c[O],M=C.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const qM={[el]:tl,[nl]:rl,[il]:al,[hr]:sl,[tl]:el,[rl]:nl,[al]:il,[sl]:hr};function YM(i,e){function t(){let k=!1;const oe=new wt;let Ee=null;const Oe=new wt(0,0,0,0);return{setMask:function(ve){Ee!==ve&&!k&&(i.colorMask(ve,ve,ve,ve),Ee=ve)},setLocked:function(ve){k=ve},setClear:function(ve,te,ke,be,ot){ot===!0&&(ve*=be,te*=be,ke*=be),oe.set(ve,te,ke,be),Oe.equals(oe)===!1&&(i.clearColor(ve,te,ke,be),Oe.copy(oe))},reset:function(){k=!1,Ee=null,Oe.set(-1,0,0,0)}}}function n(){let k=!1,oe=!1,Ee=null,Oe=null,ve=null;return{setReversed:function(te){if(oe!==te){const ke=e.get("EXT_clip_control");te?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),oe=te;const be=ve;ve=null,this.setClear(be)}},getReversed:function(){return oe},setTest:function(te){te?K(i.DEPTH_TEST):_e(i.DEPTH_TEST)},setMask:function(te){Ee!==te&&!k&&(i.depthMask(te),Ee=te)},setFunc:function(te){if(oe&&(te=qM[te]),Oe!==te){switch(te){case el:i.depthFunc(i.NEVER);break;case tl:i.depthFunc(i.ALWAYS);break;case nl:i.depthFunc(i.LESS);break;case hr:i.depthFunc(i.LEQUAL);break;case il:i.depthFunc(i.EQUAL);break;case sl:i.depthFunc(i.GEQUAL);break;case rl:i.depthFunc(i.GREATER);break;case al:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Oe=te}},setLocked:function(te){k=te},setClear:function(te){ve!==te&&(oe&&(te=1-te),i.clearDepth(te),ve=te)},reset:function(){k=!1,Ee=null,Oe=null,ve=null,oe=!1}}}function s(){let k=!1,oe=null,Ee=null,Oe=null,ve=null,te=null,ke=null,be=null,ot=null;return{setTest:function(Me){k||(Me?K(i.STENCIL_TEST):_e(i.STENCIL_TEST))},setMask:function(Me){oe!==Me&&!k&&(i.stencilMask(Me),oe=Me)},setFunc:function(Me,An,fn){(Ee!==Me||Oe!==An||ve!==fn)&&(i.stencilFunc(Me,An,fn),Ee=Me,Oe=An,ve=fn)},setOp:function(Me,An,fn){(te!==Me||ke!==An||be!==fn)&&(i.stencilOp(Me,An,fn),te=Me,ke=An,be=fn)},setLocked:function(Me){k=Me},setClear:function(Me){ot!==Me&&(i.clearStencil(Me),ot=Me)},reset:function(){k=!1,oe=null,Ee=null,Oe=null,ve=null,te=null,ke=null,be=null,ot=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let d={},u={},h=new WeakMap,f=[],g=null,v=!1,m=null,p=null,T=null,E=null,x=null,R=null,C=null,L=new nt(0,0,0),O=0,b=!1,M=null,N=null,F=null,V=null,Z=null;const ee=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ne=!1,ie=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(q)[1]),ne=ie>=1):q.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),ne=ie>=2);let pe=null,me={};const Ve=i.getParameter(i.SCISSOR_BOX),st=i.getParameter(i.VIEWPORT),_t=new wt().fromArray(Ve),St=new wt().fromArray(st);function ft(k,oe,Ee,Oe){const ve=new Uint8Array(4),te=i.createTexture();i.bindTexture(k,te),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ke=0;ke<Ee;ke++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,Oe,0,i.RGBA,i.UNSIGNED_BYTE,ve):i.texImage2D(oe+ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ve);return te}const se={};se[i.TEXTURE_2D]=ft(i.TEXTURE_2D,i.TEXTURE_2D,1),se[i.TEXTURE_CUBE_MAP]=ft(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[i.TEXTURE_2D_ARRAY]=ft(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),se[i.TEXTURE_3D]=ft(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(i.DEPTH_TEST),a.setFunc(hr),Xe(!1),Te(nd),K(i.CULL_FACE),lt(rs);function K(k){d[k]!==!0&&(i.enable(k),d[k]=!0)}function _e(k){d[k]!==!1&&(i.disable(k),d[k]=!1)}function ye(k,oe){return u[k]!==oe?(i.bindFramebuffer(k,oe),u[k]=oe,k===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=oe),k===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function Ie(k,oe){let Ee=f,Oe=!1;if(k){Ee=h.get(oe),Ee===void 0&&(Ee=[],h.set(oe,Ee));const ve=k.textures;if(Ee.length!==ve.length||Ee[0]!==i.COLOR_ATTACHMENT0){for(let te=0,ke=ve.length;te<ke;te++)Ee[te]=i.COLOR_ATTACHMENT0+te;Ee.length=ve.length,Oe=!0}}else Ee[0]!==i.BACK&&(Ee[0]=i.BACK,Oe=!0);Oe&&i.drawBuffers(Ee)}function Ze(k){return g!==k?(i.useProgram(k),g=k,!0):!1}const Mt={[Ts]:i.FUNC_ADD,[Gm]:i.FUNC_SUBTRACT,[Wm]:i.FUNC_REVERSE_SUBTRACT};Mt[$m]=i.MIN,Mt[Xm]=i.MAX;const D={[qm]:i.ZERO,[Ym]:i.ONE,[Km]:i.SRC_COLOR,[Zc]:i.SRC_ALPHA,[tg]:i.SRC_ALPHA_SATURATE,[Qm]:i.DST_COLOR,[Jm]:i.DST_ALPHA,[jm]:i.ONE_MINUS_SRC_COLOR,[Qc]:i.ONE_MINUS_SRC_ALPHA,[eg]:i.ONE_MINUS_DST_COLOR,[Zm]:i.ONE_MINUS_DST_ALPHA,[ng]:i.CONSTANT_COLOR,[ig]:i.ONE_MINUS_CONSTANT_COLOR,[sg]:i.CONSTANT_ALPHA,[rg]:i.ONE_MINUS_CONSTANT_ALPHA};function lt(k,oe,Ee,Oe,ve,te,ke,be,ot,Me){if(k===rs){v===!0&&(_e(i.BLEND),v=!1);return}if(v===!1&&(K(i.BLEND),v=!0),k!==Vm){if(k!==m||Me!==b){if((p!==Ts||x!==Ts)&&(i.blendEquation(i.FUNC_ADD),p=Ts,x=Ts),Me)switch(k){case ar:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case id:i.blendFunc(i.ONE,i.ONE);break;case sd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case rd:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case ar:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case id:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case sd:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rd:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}T=null,E=null,R=null,C=null,L.set(0,0,0),O=0,m=k,b=Me}return}ve=ve||oe,te=te||Ee,ke=ke||Oe,(oe!==p||ve!==x)&&(i.blendEquationSeparate(Mt[oe],Mt[ve]),p=oe,x=ve),(Ee!==T||Oe!==E||te!==R||ke!==C)&&(i.blendFuncSeparate(D[Ee],D[Oe],D[te],D[ke]),T=Ee,E=Oe,R=te,C=ke),(be.equals(L)===!1||ot!==O)&&(i.blendColor(be.r,be.g,be.b,ot),L.copy(be),O=ot),m=k,b=!1}function je(k,oe){k.side===Qn?_e(i.CULL_FACE):K(i.CULL_FACE);let Ee=k.side===Pn;oe&&(Ee=!Ee),Xe(Ee),k.blending===ar&&k.transparent===!1?lt(rs):lt(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);const Oe=k.stencilWrite;o.setTest(Oe),Oe&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ne(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):_e(i.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(k){M!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),M=k)}function Te(k){k!==zm?(K(i.CULL_FACE),k!==N&&(k===nd?i.cullFace(i.BACK):k===Hm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):_e(i.CULL_FACE),N=k}function Qe(k){k!==F&&(ne&&i.lineWidth(k),F=k)}function Ne(k,oe,Ee){k?(K(i.POLYGON_OFFSET_FILL),(V!==oe||Z!==Ee)&&(i.polygonOffset(oe,Ee),V=oe,Z=Ee)):_e(i.POLYGON_OFFSET_FILL)}function at(k){k?K(i.SCISSOR_TEST):_e(i.SCISSOR_TEST)}function Yt(k){k===void 0&&(k=i.TEXTURE0+ee-1),pe!==k&&(i.activeTexture(k),pe=k)}function Ht(k,oe,Ee){Ee===void 0&&(pe===null?Ee=i.TEXTURE0+ee-1:Ee=pe);let Oe=me[Ee];Oe===void 0&&(Oe={type:void 0,texture:void 0},me[Ee]=Oe),(Oe.type!==k||Oe.texture!==oe)&&(pe!==Ee&&(i.activeTexture(Ee),pe=Ee),i.bindTexture(k,oe||se[k]),Oe.type=k,Oe.texture=oe)}function I(){const k=me[pe];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function S(){try{i.compressedTexImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function X(){try{i.compressedTexImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function re(){try{i.texSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function fe(){try{i.texSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ue(){try{i.compressedTexSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Q(){try{i.texStorage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ce(){try{i.texStorage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Fe(){try{i.texImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ue(){try{i.texImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ce(k){_t.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),_t.copy(k))}function qe(k){St.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),St.copy(k))}function Be(k,oe){let Ee=c.get(oe);Ee===void 0&&(Ee=new WeakMap,c.set(oe,Ee));let Oe=Ee.get(k);Oe===void 0&&(Oe=i.getUniformBlockIndex(oe,k.name),Ee.set(k,Oe))}function Re(k,oe){const Oe=c.get(oe).get(k);l.get(oe)!==Oe&&(i.uniformBlockBinding(oe,Oe,k.__bindingPointIndex),l.set(oe,Oe))}function it(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},pe=null,me={},u={},h=new WeakMap,f=[],g=null,v=!1,m=null,p=null,T=null,E=null,x=null,R=null,C=null,L=new nt(0,0,0),O=0,b=!1,M=null,N=null,F=null,V=null,Z=null,_t.set(0,0,i.canvas.width,i.canvas.height),St.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:K,disable:_e,bindFramebuffer:ye,drawBuffers:Ie,useProgram:Ze,setBlending:lt,setMaterial:je,setFlipSided:Xe,setCullFace:Te,setLineWidth:Qe,setPolygonOffset:Ne,setScissorTest:at,activeTexture:Yt,bindTexture:Ht,unbindTexture:I,compressedTexImage2D:S,compressedTexImage3D:X,texImage2D:Fe,texImage3D:ue,updateUBOMapping:Be,uniformBlockBinding:Re,texStorage2D:Q,texStorage3D:ce,texSubImage2D:re,texSubImage3D:fe,compressedTexSubImage2D:Y,compressedTexSubImage3D:Ue,scissor:Ce,viewport:qe,reset:it}}function KM(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new He,d=new WeakMap;let u;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,S){return f?new OffscreenCanvas(I,S):fa("canvas")}function v(I,S,X){let re=1;const fe=Ht(I);if((fe.width>X||fe.height>X)&&(re=X/Math.max(fe.width,fe.height)),re<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const Y=Math.floor(re*fe.width),Ue=Math.floor(re*fe.height);u===void 0&&(u=g(Y,Ue));const Q=S?g(Y,Ue):u;return Q.width=Y,Q.height=Ue,Q.getContext("2d").drawImage(I,0,0,Y,Ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+fe.width+"x"+fe.height+") to ("+Y+"x"+Ue+")."),Q}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+fe.width+"x"+fe.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function T(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(I,S,X,re,fe=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Y=S;if(S===i.RED&&(X===i.FLOAT&&(Y=i.R32F),X===i.HALF_FLOAT&&(Y=i.R16F),X===i.UNSIGNED_BYTE&&(Y=i.R8)),S===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(Y=i.R8UI),X===i.UNSIGNED_SHORT&&(Y=i.R16UI),X===i.UNSIGNED_INT&&(Y=i.R32UI),X===i.BYTE&&(Y=i.R8I),X===i.SHORT&&(Y=i.R16I),X===i.INT&&(Y=i.R32I)),S===i.RG&&(X===i.FLOAT&&(Y=i.RG32F),X===i.HALF_FLOAT&&(Y=i.RG16F),X===i.UNSIGNED_BYTE&&(Y=i.RG8)),S===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(Y=i.RG8UI),X===i.UNSIGNED_SHORT&&(Y=i.RG16UI),X===i.UNSIGNED_INT&&(Y=i.RG32UI),X===i.BYTE&&(Y=i.RG8I),X===i.SHORT&&(Y=i.RG16I),X===i.INT&&(Y=i.RG32I)),S===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),X===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),X===i.UNSIGNED_INT&&(Y=i.RGB32UI),X===i.BYTE&&(Y=i.RGB8I),X===i.SHORT&&(Y=i.RGB16I),X===i.INT&&(Y=i.RGB32I)),S===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),X===i.UNSIGNED_INT&&(Y=i.RGBA32UI),X===i.BYTE&&(Y=i.RGBA8I),X===i.SHORT&&(Y=i.RGBA16I),X===i.INT&&(Y=i.RGBA32I)),S===i.RGB&&(X===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),S===i.RGBA){const Ue=fe?Ro:xt.getTransfer(re);X===i.FLOAT&&(Y=i.RGBA32F),X===i.HALF_FLOAT&&(Y=i.RGBA16F),X===i.UNSIGNED_BYTE&&(Y=Ue===Nt?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function x(I,S){let X;return I?S===null||S===Rs||S===ca?X=i.DEPTH24_STENCIL8:S===ti?X=i.DEPTH32F_STENCIL8:S===oa&&(X=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Rs||S===ca?X=i.DEPTH_COMPONENT24:S===ti?X=i.DEPTH_COMPONENT32F:S===oa&&(X=i.DEPTH_COMPONENT16),X}function R(I,S){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==Tn&&I.minFilter!==On?Math.log2(Math.max(S.width,S.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?S.mipmaps.length:1}function C(I){const S=I.target;S.removeEventListener("dispose",C),O(S),S.isVideoTexture&&d.delete(S)}function L(I){const S=I.target;S.removeEventListener("dispose",L),M(S)}function O(I){const S=n.get(I);if(S.__webglInit===void 0)return;const X=I.source,re=h.get(X);if(re){const fe=re[S.__cacheKey];fe.usedTimes--,fe.usedTimes===0&&b(I),Object.keys(re).length===0&&h.delete(X)}n.remove(I)}function b(I){const S=n.get(I);i.deleteTexture(S.__webglTexture);const X=I.source,re=h.get(X);delete re[S.__cacheKey],a.memory.textures--}function M(I){const S=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(S.__webglFramebuffer[re]))for(let fe=0;fe<S.__webglFramebuffer[re].length;fe++)i.deleteFramebuffer(S.__webglFramebuffer[re][fe]);else i.deleteFramebuffer(S.__webglFramebuffer[re]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[re])}else{if(Array.isArray(S.__webglFramebuffer))for(let re=0;re<S.__webglFramebuffer.length;re++)i.deleteFramebuffer(S.__webglFramebuffer[re]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let re=0;re<S.__webglColorRenderbuffer.length;re++)S.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[re]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const X=I.textures;for(let re=0,fe=X.length;re<fe;re++){const Y=n.get(X[re]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(X[re])}n.remove(I)}let N=0;function F(){N=0}function V(){const I=N;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),N+=1,I}function Z(I){const S=[];return S.push(I.wrapS),S.push(I.wrapT),S.push(I.wrapR||0),S.push(I.magFilter),S.push(I.minFilter),S.push(I.anisotropy),S.push(I.internalFormat),S.push(I.format),S.push(I.type),S.push(I.generateMipmaps),S.push(I.premultiplyAlpha),S.push(I.flipY),S.push(I.unpackAlignment),S.push(I.colorSpace),S.join()}function ee(I,S){const X=n.get(I);if(I.isVideoTexture&&at(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&X.__version!==I.version){const re=I.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{se(X,I,S);return}}else I.isExternalTexture&&(X.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+S)}function ne(I,S){const X=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&X.__version!==I.version){se(X,I,S);return}t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+S)}function ie(I,S){const X=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&X.__version!==I.version){se(X,I,S);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+S)}function q(I,S){const X=n.get(I);if(I.version>0&&X.__version!==I.version){K(X,I,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+S)}const pe={[mr]:i.REPEAT,[ss]:i.CLAMP_TO_EDGE,[Ao]:i.MIRRORED_REPEAT},me={[Tn]:i.NEAREST,[af]:i.NEAREST_MIPMAP_NEAREST,[Kr]:i.NEAREST_MIPMAP_LINEAR,[On]:i.LINEAR,[vo]:i.LINEAR_MIPMAP_NEAREST,[Di]:i.LINEAR_MIPMAP_LINEAR},Ve={[xg]:i.NEVER,[wg]:i.ALWAYS,[Mg]:i.LESS,[gf]:i.LEQUAL,[Sg]:i.EQUAL,[Eg]:i.GEQUAL,[bg]:i.GREATER,[Tg]:i.NOTEQUAL};function st(I,S){if(S.type===ti&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===On||S.magFilter===vo||S.magFilter===Kr||S.magFilter===Di||S.minFilter===On||S.minFilter===vo||S.minFilter===Kr||S.minFilter===Di)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,pe[S.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,pe[S.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,pe[S.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,me[S.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,me[S.minFilter]),S.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,Ve[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Tn||S.minFilter!==Kr&&S.minFilter!==Di||S.type===ti&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function _t(I,S){let X=!1;I.__webglInit===void 0&&(I.__webglInit=!0,S.addEventListener("dispose",C));const re=S.source;let fe=h.get(re);fe===void 0&&(fe={},h.set(re,fe));const Y=Z(S);if(Y!==I.__cacheKey){fe[Y]===void 0&&(fe[Y]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,X=!0),fe[Y].usedTimes++;const Ue=fe[I.__cacheKey];Ue!==void 0&&(fe[I.__cacheKey].usedTimes--,Ue.usedTimes===0&&b(S)),I.__cacheKey=Y,I.__webglTexture=fe[Y].texture}return X}function St(I,S,X){return Math.floor(Math.floor(I/X)/S)}function ft(I,S,X,re){const Y=I.updateRanges;if(Y.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,X,re,S.data);else{Y.sort((ue,Ce)=>ue.start-Ce.start);let Ue=0;for(let ue=1;ue<Y.length;ue++){const Ce=Y[Ue],qe=Y[ue],Be=Ce.start+Ce.count,Re=St(qe.start,S.width,4),it=St(Ce.start,S.width,4);qe.start<=Be+1&&Re===it&&St(qe.start+qe.count-1,S.width,4)===Re?Ce.count=Math.max(Ce.count,qe.start+qe.count-Ce.start):(++Ue,Y[Ue]=qe)}Y.length=Ue+1;const Q=i.getParameter(i.UNPACK_ROW_LENGTH),ce=i.getParameter(i.UNPACK_SKIP_PIXELS),Fe=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let ue=0,Ce=Y.length;ue<Ce;ue++){const qe=Y[ue],Be=Math.floor(qe.start/4),Re=Math.ceil(qe.count/4),it=Be%S.width,k=Math.floor(Be/S.width),oe=Re,Ee=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,it),i.pixelStorei(i.UNPACK_SKIP_ROWS,k),t.texSubImage2D(i.TEXTURE_2D,0,it,k,oe,Ee,X,re,S.data)}I.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,Q),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ce),i.pixelStorei(i.UNPACK_SKIP_ROWS,Fe)}}function se(I,S,X){let re=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(re=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(re=i.TEXTURE_3D);const fe=_t(I,S),Y=S.source;t.bindTexture(re,I.__webglTexture,i.TEXTURE0+X);const Ue=n.get(Y);if(Y.version!==Ue.__version||fe===!0){t.activeTexture(i.TEXTURE0+X);const Q=xt.getPrimaries(xt.workingColorSpace),ce=S.colorSpace===is?null:xt.getPrimaries(S.colorSpace),Fe=S.colorSpace===is||Q===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);let ue=v(S.image,!1,s.maxTextureSize);ue=Yt(S,ue);const Ce=r.convert(S.format,S.colorSpace),qe=r.convert(S.type);let Be=E(S.internalFormat,Ce,qe,S.colorSpace,S.isVideoTexture);st(re,S);let Re;const it=S.mipmaps,k=S.isVideoTexture!==!0,oe=Ue.__version===void 0||fe===!0,Ee=Y.dataReady,Oe=R(S,ue);if(S.isDepthTexture)Be=x(S.format===ua,S.type),oe&&(k?t.texStorage2D(i.TEXTURE_2D,1,Be,ue.width,ue.height):t.texImage2D(i.TEXTURE_2D,0,Be,ue.width,ue.height,0,Ce,qe,null));else if(S.isDataTexture)if(it.length>0){k&&oe&&t.texStorage2D(i.TEXTURE_2D,Oe,Be,it[0].width,it[0].height);for(let ve=0,te=it.length;ve<te;ve++)Re=it[ve],k?Ee&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,Re.width,Re.height,Ce,qe,Re.data):t.texImage2D(i.TEXTURE_2D,ve,Be,Re.width,Re.height,0,Ce,qe,Re.data);S.generateMipmaps=!1}else k?(oe&&t.texStorage2D(i.TEXTURE_2D,Oe,Be,ue.width,ue.height),Ee&&ft(S,ue,Ce,qe)):t.texImage2D(i.TEXTURE_2D,0,Be,ue.width,ue.height,0,Ce,qe,ue.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){k&&oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Oe,Be,it[0].width,it[0].height,ue.depth);for(let ve=0,te=it.length;ve<te;ve++)if(Re=it[ve],S.format!==$n)if(Ce!==null)if(k){if(Ee)if(S.layerUpdates.size>0){const ke=Qd(Re.width,Re.height,S.format,S.type);for(const be of S.layerUpdates){const ot=Re.data.subarray(be*ke/Re.data.BYTES_PER_ELEMENT,(be+1)*ke/Re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,be,Re.width,Re.height,1,Ce,ot)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,0,Re.width,Re.height,ue.depth,Ce,Re.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ve,Be,Re.width,Re.height,ue.depth,0,Re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else k?Ee&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,0,Re.width,Re.height,ue.depth,Ce,qe,Re.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ve,Be,Re.width,Re.height,ue.depth,0,Ce,qe,Re.data)}else{k&&oe&&t.texStorage2D(i.TEXTURE_2D,Oe,Be,it[0].width,it[0].height);for(let ve=0,te=it.length;ve<te;ve++)Re=it[ve],S.format!==$n?Ce!==null?k?Ee&&t.compressedTexSubImage2D(i.TEXTURE_2D,ve,0,0,Re.width,Re.height,Ce,Re.data):t.compressedTexImage2D(i.TEXTURE_2D,ve,Be,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?Ee&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,Re.width,Re.height,Ce,qe,Re.data):t.texImage2D(i.TEXTURE_2D,ve,Be,Re.width,Re.height,0,Ce,qe,Re.data)}else if(S.isDataArrayTexture)if(k){if(oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Oe,Be,ue.width,ue.height,ue.depth),Ee)if(S.layerUpdates.size>0){const ve=Qd(ue.width,ue.height,S.format,S.type);for(const te of S.layerUpdates){const ke=ue.data.subarray(te*ve/ue.data.BYTES_PER_ELEMENT,(te+1)*ve/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,te,ue.width,ue.height,1,Ce,qe,ke)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,Ce,qe,ue.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Be,ue.width,ue.height,ue.depth,0,Ce,qe,ue.data);else if(S.isData3DTexture)k?(oe&&t.texStorage3D(i.TEXTURE_3D,Oe,Be,ue.width,ue.height,ue.depth),Ee&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,Ce,qe,ue.data)):t.texImage3D(i.TEXTURE_3D,0,Be,ue.width,ue.height,ue.depth,0,Ce,qe,ue.data);else if(S.isFramebufferTexture){if(oe)if(k)t.texStorage2D(i.TEXTURE_2D,Oe,Be,ue.width,ue.height);else{let ve=ue.width,te=ue.height;for(let ke=0;ke<Oe;ke++)t.texImage2D(i.TEXTURE_2D,ke,Be,ve,te,0,Ce,qe,null),ve>>=1,te>>=1}}else if(it.length>0){if(k&&oe){const ve=Ht(it[0]);t.texStorage2D(i.TEXTURE_2D,Oe,Be,ve.width,ve.height)}for(let ve=0,te=it.length;ve<te;ve++)Re=it[ve],k?Ee&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,Ce,qe,Re):t.texImage2D(i.TEXTURE_2D,ve,Be,Ce,qe,Re);S.generateMipmaps=!1}else if(k){if(oe){const ve=Ht(ue);t.texStorage2D(i.TEXTURE_2D,Oe,Be,ve.width,ve.height)}Ee&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ce,qe,ue)}else t.texImage2D(i.TEXTURE_2D,0,Be,Ce,qe,ue);m(S)&&p(re),Ue.__version=Y.version,S.onUpdate&&S.onUpdate(S)}I.__version=S.version}function K(I,S,X){if(S.image.length!==6)return;const re=_t(I,S),fe=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+X);const Y=n.get(fe);if(fe.version!==Y.__version||re===!0){t.activeTexture(i.TEXTURE0+X);const Ue=xt.getPrimaries(xt.workingColorSpace),Q=S.colorSpace===is?null:xt.getPrimaries(S.colorSpace),ce=S.colorSpace===is||Ue===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const Fe=S.isCompressedTexture||S.image[0].isCompressedTexture,ue=S.image[0]&&S.image[0].isDataTexture,Ce=[];for(let te=0;te<6;te++)!Fe&&!ue?Ce[te]=v(S.image[te],!0,s.maxCubemapSize):Ce[te]=ue?S.image[te].image:S.image[te],Ce[te]=Yt(S,Ce[te]);const qe=Ce[0],Be=r.convert(S.format,S.colorSpace),Re=r.convert(S.type),it=E(S.internalFormat,Be,Re,S.colorSpace),k=S.isVideoTexture!==!0,oe=Y.__version===void 0||re===!0,Ee=fe.dataReady;let Oe=R(S,qe);st(i.TEXTURE_CUBE_MAP,S);let ve;if(Fe){k&&oe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Oe,it,qe.width,qe.height);for(let te=0;te<6;te++){ve=Ce[te].mipmaps;for(let ke=0;ke<ve.length;ke++){const be=ve[ke];S.format!==$n?Be!==null?k?Ee&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ke,0,0,be.width,be.height,Be,be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ke,it,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?Ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ke,0,0,be.width,be.height,Be,Re,be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ke,it,be.width,be.height,0,Be,Re,be.data)}}}else{if(ve=S.mipmaps,k&&oe){ve.length>0&&Oe++;const te=Ht(Ce[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Oe,it,te.width,te.height)}for(let te=0;te<6;te++)if(ue){k?Ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ce[te].width,Ce[te].height,Be,Re,Ce[te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,it,Ce[te].width,Ce[te].height,0,Be,Re,Ce[te].data);for(let ke=0;ke<ve.length;ke++){const ot=ve[ke].image[te].image;k?Ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ke+1,0,0,ot.width,ot.height,Be,Re,ot.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ke+1,it,ot.width,ot.height,0,Be,Re,ot.data)}}else{k?Ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Be,Re,Ce[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,it,Be,Re,Ce[te]);for(let ke=0;ke<ve.length;ke++){const be=ve[ke];k?Ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ke+1,0,0,Be,Re,be.image[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ke+1,it,Be,Re,be.image[te])}}}m(S)&&p(i.TEXTURE_CUBE_MAP),Y.__version=fe.version,S.onUpdate&&S.onUpdate(S)}I.__version=S.version}function _e(I,S,X,re,fe,Y){const Ue=r.convert(X.format,X.colorSpace),Q=r.convert(X.type),ce=E(X.internalFormat,Ue,Q,X.colorSpace),Fe=n.get(S),ue=n.get(X);if(ue.__renderTarget=S,!Fe.__hasExternalTextures){const Ce=Math.max(1,S.width>>Y),qe=Math.max(1,S.height>>Y);fe===i.TEXTURE_3D||fe===i.TEXTURE_2D_ARRAY?t.texImage3D(fe,Y,ce,Ce,qe,S.depth,0,Ue,Q,null):t.texImage2D(fe,Y,ce,Ce,qe,0,Ue,Q,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),Ne(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,fe,ue.__webglTexture,0,Qe(S)):(fe===i.TEXTURE_2D||fe>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&fe<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,re,fe,ue.__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ye(I,S,X){if(i.bindRenderbuffer(i.RENDERBUFFER,I),S.depthBuffer){const re=S.depthTexture,fe=re&&re.isDepthTexture?re.type:null,Y=x(S.stencilBuffer,fe),Ue=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=Qe(S);Ne(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,Y,S.width,S.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,Y,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Y,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ue,i.RENDERBUFFER,I)}else{const re=S.textures;for(let fe=0;fe<re.length;fe++){const Y=re[fe],Ue=r.convert(Y.format,Y.colorSpace),Q=r.convert(Y.type),ce=E(Y.internalFormat,Ue,Q,Y.colorSpace),Fe=Qe(S);X&&Ne(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Fe,ce,S.width,S.height):Ne(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Fe,ce,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ce,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ie(I,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const re=n.get(S.depthTexture);re.__renderTarget=S,(!re.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),ee(S.depthTexture,0);const fe=re.__webglTexture,Y=Qe(S);if(S.depthTexture.format===la)Ne(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,fe,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,fe,0);else if(S.depthTexture.format===ua)Ne(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,fe,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,fe,0);else throw new Error("Unknown depthTexture format")}function Ze(I){const S=n.get(I),X=I.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==I.depthTexture){const re=I.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),re){const fe=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,re.removeEventListener("dispose",fe)};re.addEventListener("dispose",fe),S.__depthDisposeCallback=fe}S.__boundDepthTexture=re}if(I.depthTexture&&!S.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");const re=I.texture.mipmaps;re&&re.length>0?Ie(S.__webglFramebuffer[0],I):Ie(S.__webglFramebuffer,I)}else if(X){S.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[re]),S.__webglDepthbuffer[re]===void 0)S.__webglDepthbuffer[re]=i.createRenderbuffer(),ye(S.__webglDepthbuffer[re],I,!1);else{const fe=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer[re];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,fe,i.RENDERBUFFER,Y)}}else{const re=I.texture.mipmaps;if(re&&re.length>0?t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),ye(S.__webglDepthbuffer,I,!1);else{const fe=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,fe,i.RENDERBUFFER,Y)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Mt(I,S,X){const re=n.get(I);S!==void 0&&_e(re.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&Ze(I)}function D(I){const S=I.texture,X=n.get(I),re=n.get(S);I.addEventListener("dispose",L);const fe=I.textures,Y=I.isWebGLCubeRenderTarget===!0,Ue=fe.length>1;if(Ue||(re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture()),re.__version=S.version,a.memory.textures++),Y){X.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(S.mipmaps&&S.mipmaps.length>0){X.__webglFramebuffer[Q]=[];for(let ce=0;ce<S.mipmaps.length;ce++)X.__webglFramebuffer[Q][ce]=i.createFramebuffer()}else X.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){X.__webglFramebuffer=[];for(let Q=0;Q<S.mipmaps.length;Q++)X.__webglFramebuffer[Q]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(Ue)for(let Q=0,ce=fe.length;Q<ce;Q++){const Fe=n.get(fe[Q]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=i.createTexture(),a.memory.textures++)}if(I.samples>0&&Ne(I)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let Q=0;Q<fe.length;Q++){const ce=fe[Q];X.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[Q]);const Fe=r.convert(ce.format,ce.colorSpace),ue=r.convert(ce.type),Ce=E(ce.internalFormat,Fe,ue,ce.colorSpace,I.isXRRenderTarget===!0),qe=Qe(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,qe,Ce,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,X.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),ye(X.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),st(i.TEXTURE_CUBE_MAP,S);for(let Q=0;Q<6;Q++)if(S.mipmaps&&S.mipmaps.length>0)for(let ce=0;ce<S.mipmaps.length;ce++)_e(X.__webglFramebuffer[Q][ce],I,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ce);else _e(X.__webglFramebuffer[Q],I,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);m(S)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ue){for(let Q=0,ce=fe.length;Q<ce;Q++){const Fe=fe[Q],ue=n.get(Fe);let Ce=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Ce=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ce,ue.__webglTexture),st(Ce,Fe),_e(X.__webglFramebuffer,I,Fe,i.COLOR_ATTACHMENT0+Q,Ce,0),m(Fe)&&p(Ce)}t.unbindTexture()}else{let Q=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Q=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Q,re.__webglTexture),st(Q,S),S.mipmaps&&S.mipmaps.length>0)for(let ce=0;ce<S.mipmaps.length;ce++)_e(X.__webglFramebuffer[ce],I,S,i.COLOR_ATTACHMENT0,Q,ce);else _e(X.__webglFramebuffer,I,S,i.COLOR_ATTACHMENT0,Q,0);m(S)&&p(Q),t.unbindTexture()}I.depthBuffer&&Ze(I)}function lt(I){const S=I.textures;for(let X=0,re=S.length;X<re;X++){const fe=S[X];if(m(fe)){const Y=T(I),Ue=n.get(fe).__webglTexture;t.bindTexture(Y,Ue),p(Y),t.unbindTexture()}}}const je=[],Xe=[];function Te(I){if(I.samples>0){if(Ne(I)===!1){const S=I.textures,X=I.width,re=I.height;let fe=i.COLOR_BUFFER_BIT;const Y=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ue=n.get(I),Q=S.length>1;if(Q)for(let Fe=0;Fe<S.length;Fe++)t.bindFramebuffer(i.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer);const ce=I.texture.mipmaps;ce&&ce.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer);for(let Fe=0;Fe<S.length;Fe++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(fe|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(fe|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ue.__webglColorRenderbuffer[Fe]);const ue=n.get(S[Fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ue,0)}i.blitFramebuffer(0,0,X,re,0,0,X,re,fe,i.NEAREST),l===!0&&(je.length=0,Xe.length=0,je.push(i.COLOR_ATTACHMENT0+Fe),I.depthBuffer&&I.resolveDepthBuffer===!1&&(je.push(Y),Xe.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Xe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,je))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let Fe=0;Fe<S.length;Fe++){t.bindFramebuffer(i.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.RENDERBUFFER,Ue.__webglColorRenderbuffer[Fe]);const ue=n.get(S[Fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.TEXTURE_2D,ue,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const S=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function Qe(I){return Math.min(s.maxSamples,I.samples)}function Ne(I){const S=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function at(I){const S=a.render.frame;d.get(I)!==S&&(d.set(I,S),I.update())}function Yt(I,S){const X=I.colorSpace,re=I.format,fe=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||X!==wn&&X!==is&&(xt.getTransfer(X)===Nt?(re!==$n||fe!==pi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),S}function Ht(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=F,this.setTexture2D=ee,this.setTexture2DArray=ne,this.setTexture3D=ie,this.setTextureCube=q,this.rebindTextures=Mt,this.setupRenderTarget=D,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=Ze,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Ne}function jM(i,e){function t(n,s=is){let r;const a=xt.getTransfer(s);if(n===pi)return i.UNSIGNED_BYTE;if(n===su)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ru)return i.UNSIGNED_SHORT_5_5_5_1;if(n===lf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===uf)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===of)return i.BYTE;if(n===cf)return i.SHORT;if(n===oa)return i.UNSIGNED_SHORT;if(n===iu)return i.INT;if(n===Rs)return i.UNSIGNED_INT;if(n===ti)return i.FLOAT;if(n===va)return i.HALF_FLOAT;if(n===df)return i.ALPHA;if(n===hf)return i.RGB;if(n===$n)return i.RGBA;if(n===la)return i.DEPTH_COMPONENT;if(n===ua)return i.DEPTH_STENCIL;if(n===au)return i.RED;if(n===ou)return i.RED_INTEGER;if(n===ff)return i.RG;if(n===cu)return i.RG_INTEGER;if(n===lu)return i.RGBA_INTEGER;if(n===yo||n===xo||n===Mo||n===So)if(a===Nt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===yo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===xo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===So)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===yo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===xo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Mo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===So)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ll||n===ul||n===dl||n===hl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ll)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ul)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===dl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===hl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===fl||n===pl||n===ml)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===fl||n===pl)return a===Nt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ml)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===gl||n===_l||n===vl||n===yl||n===xl||n===Ml||n===Sl||n===bl||n===Tl||n===El||n===wl||n===Al||n===Rl||n===Cl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===gl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===_l)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===vl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===yl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===xl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ml)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===bl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Tl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===El)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Al)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Rl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Cl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Pl||n===Il||n===Ll)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Pl)return a===Nt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Il)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ll)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Dl||n===Nl||n===Ul||n===Ol)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Dl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Nl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ul)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ol)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ca?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const JM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ZM=`
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

}`;class QM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Nf(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new cs({vertexShader:JM,fragmentShader:ZM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ct(new xa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class eS extends Mr{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",m=new QM,p={},T=t.getContextAttributes();let E=null,x=null;const R=[],C=[],L=new He;let O=null;const b=new Mn;b.viewport=new wt;const M=new Mn;M.viewport=new wt;const N=[b,M],F=new d_;let V=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(se){let K=R[se];return K===void 0&&(K=new bc,R[se]=K),K.getTargetRaySpace()},this.getControllerGrip=function(se){let K=R[se];return K===void 0&&(K=new bc,R[se]=K),K.getGripSpace()},this.getHand=function(se){let K=R[se];return K===void 0&&(K=new bc,R[se]=K),K.getHandSpace()};function ee(se){const K=C.indexOf(se.inputSource);if(K===-1)return;const _e=R[K];_e!==void 0&&(_e.update(se.inputSource,se.frame,c||a),_e.dispatchEvent({type:se.type,data:se.inputSource}))}function ne(){s.removeEventListener("select",ee),s.removeEventListener("selectstart",ee),s.removeEventListener("selectend",ee),s.removeEventListener("squeeze",ee),s.removeEventListener("squeezestart",ee),s.removeEventListener("squeezeend",ee),s.removeEventListener("end",ne),s.removeEventListener("inputsourceschange",ie);for(let se=0;se<R.length;se++){const K=C[se];K!==null&&(C[se]=null,R[se].disconnect(K))}V=null,Z=null,m.reset();for(const se in p)delete p[se];e.setRenderTarget(E),f=null,h=null,u=null,s=null,x=null,ft.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(se){r=se,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(se){o=se,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(se){c=se},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(se){if(s=se,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",ee),s.addEventListener("selectstart",ee),s.addEventListener("selectend",ee),s.addEventListener("squeeze",ee),s.addEventListener("squeezestart",ee),s.addEventListener("squeezeend",ee),s.addEventListener("end",ne),s.addEventListener("inputsourceschange",ie),T.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,ye=null,Ie=null;T.depth&&(Ie=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=T.stencil?ua:la,ye=T.stencil?ca:Rs);const Ze={colorFormat:t.RGBA8,depthFormat:Ie,scaleFactor:r};u=this.getBinding(),h=u.createProjectionLayer(Ze),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new Cs(h.textureWidth,h.textureHeight,{format:$n,type:pi,depthTexture:new Df(h.textureWidth,h.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const _e={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,_e),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Cs(f.framebufferWidth,f.framebufferHeight,{format:$n,type:pi,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ft.setContext(s),ft.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(se){for(let K=0;K<se.removed.length;K++){const _e=se.removed[K],ye=C.indexOf(_e);ye>=0&&(C[ye]=null,R[ye].disconnect(_e))}for(let K=0;K<se.added.length;K++){const _e=se.added[K];let ye=C.indexOf(_e);if(ye===-1){for(let Ze=0;Ze<R.length;Ze++)if(Ze>=C.length){C.push(_e),ye=Ze;break}else if(C[Ze]===null){C[Ze]=_e,ye=Ze;break}if(ye===-1)break}const Ie=R[ye];Ie&&Ie.connect(_e)}}const q=new A,pe=new A;function me(se,K,_e){q.setFromMatrixPosition(K.matrixWorld),pe.setFromMatrixPosition(_e.matrixWorld);const ye=q.distanceTo(pe),Ie=K.projectionMatrix.elements,Ze=_e.projectionMatrix.elements,Mt=Ie[14]/(Ie[10]-1),D=Ie[14]/(Ie[10]+1),lt=(Ie[9]+1)/Ie[5],je=(Ie[9]-1)/Ie[5],Xe=(Ie[8]-1)/Ie[0],Te=(Ze[8]+1)/Ze[0],Qe=Mt*Xe,Ne=Mt*Te,at=ye/(-Xe+Te),Yt=at*-Xe;if(K.matrixWorld.decompose(se.position,se.quaternion,se.scale),se.translateX(Yt),se.translateZ(at),se.matrixWorld.compose(se.position,se.quaternion,se.scale),se.matrixWorldInverse.copy(se.matrixWorld).invert(),Ie[10]===-1)se.projectionMatrix.copy(K.projectionMatrix),se.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const Ht=Mt+at,I=D+at,S=Qe-Yt,X=Ne+(ye-Yt),re=lt*D/I*Ht,fe=je*D/I*Ht;se.projectionMatrix.makePerspective(S,X,re,fe,Ht,I),se.projectionMatrixInverse.copy(se.projectionMatrix).invert()}}function Ve(se,K){K===null?se.matrixWorld.copy(se.matrix):se.matrixWorld.multiplyMatrices(K.matrixWorld,se.matrix),se.matrixWorldInverse.copy(se.matrixWorld).invert()}this.updateCamera=function(se){if(s===null)return;let K=se.near,_e=se.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(_e=m.depthFar)),F.near=M.near=b.near=K,F.far=M.far=b.far=_e,(V!==F.near||Z!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),V=F.near,Z=F.far),F.layers.mask=se.layers.mask|6,b.layers.mask=F.layers.mask&3,M.layers.mask=F.layers.mask&5;const ye=se.parent,Ie=F.cameras;Ve(F,ye);for(let Ze=0;Ze<Ie.length;Ze++)Ve(Ie[Ze],ye);Ie.length===2?me(F,b,M):F.projectionMatrix.copy(b.projectionMatrix),st(se,F,ye)};function st(se,K,_e){_e===null?se.matrix.copy(K.matrixWorld):(se.matrix.copy(_e.matrixWorld),se.matrix.invert(),se.matrix.multiply(K.matrixWorld)),se.matrix.decompose(se.position,se.quaternion,se.scale),se.updateMatrixWorld(!0),se.projectionMatrix.copy(K.projectionMatrix),se.projectionMatrixInverse.copy(K.projectionMatrixInverse),se.isPerspectiveCamera&&(se.fov=gr*2*Math.atan(1/se.projectionMatrix.elements[5]),se.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(se){l=se,h!==null&&(h.fixedFoveation=se),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=se)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(se){return p[se]};let _t=null;function St(se,K){if(d=K.getViewerPose(c||a),g=K,d!==null){const _e=d.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let ye=!1;_e.length!==F.cameras.length&&(F.cameras.length=0,ye=!0);for(let D=0;D<_e.length;D++){const lt=_e[D];let je=null;if(f!==null)je=f.getViewport(lt);else{const Te=u.getViewSubImage(h,lt);je=Te.viewport,D===0&&(e.setRenderTargetTextures(x,Te.colorTexture,Te.depthStencilTexture),e.setRenderTarget(x))}let Xe=N[D];Xe===void 0&&(Xe=new Mn,Xe.layers.enable(D),Xe.viewport=new wt,N[D]=Xe),Xe.matrix.fromArray(lt.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(lt.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(je.x,je.y,je.width,je.height),D===0&&(F.matrix.copy(Xe.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ye===!0&&F.cameras.push(Xe)}const Ie=s.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const D=u.getDepthInformation(_e[0]);D&&D.isValid&&D.texture&&m.init(D,s.renderState)}if(Ie&&Ie.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let D=0;D<_e.length;D++){const lt=_e[D].camera;if(lt){let je=p[lt];je||(je=new Nf,p[lt]=je);const Xe=u.getCameraImage(lt);je.sourceTexture=Xe}}}}for(let _e=0;_e<R.length;_e++){const ye=C[_e],Ie=R[_e];ye!==null&&Ie!==void 0&&Ie.update(ye,K,c||a)}_t&&_t(se,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}const ft=new zf;ft.setAnimationLoop(St),this.setAnimationLoop=function(se){_t=se},this.dispose=function(){}}}const xs=new Xt,tS=new rt;function nS(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Sf(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,T,E,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,T,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Pn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Pn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=e.get(p),E=T.envMap,x=T.envMapRotation;E&&(m.envMap.value=E,xs.copy(x),xs.x*=-1,xs.y*=-1,xs.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(xs.y*=-1,xs.z*=-1),m.envMapRotation.value.setFromMatrix4(tS.makeRotationFromEuler(xs)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=E*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Pn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const T=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function iS(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,E){const x=E.program;n.uniformBlockBinding(T,x)}function c(T,E){let x=s[T.id];x===void 0&&(g(T),x=d(T),s[T.id]=x,T.addEventListener("dispose",m));const R=E.program;n.updateUBOMapping(T,R);const C=e.render.frame;r[T.id]!==C&&(h(T),r[T.id]=C)}function d(T){const E=u();T.__bindingPointIndex=E;const x=i.createBuffer(),R=T.__size,C=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,R,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,x),x}function u(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(T){const E=s[T.id],x=T.uniforms,R=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let C=0,L=x.length;C<L;C++){const O=Array.isArray(x[C])?x[C]:[x[C]];for(let b=0,M=O.length;b<M;b++){const N=O[b];if(f(N,C,b,R)===!0){const F=N.__offset,V=Array.isArray(N.value)?N.value:[N.value];let Z=0;for(let ee=0;ee<V.length;ee++){const ne=V[ee],ie=v(ne);typeof ne=="number"||typeof ne=="boolean"?(N.__data[0]=ne,i.bufferSubData(i.UNIFORM_BUFFER,F+Z,N.__data)):ne.isMatrix3?(N.__data[0]=ne.elements[0],N.__data[1]=ne.elements[1],N.__data[2]=ne.elements[2],N.__data[3]=0,N.__data[4]=ne.elements[3],N.__data[5]=ne.elements[4],N.__data[6]=ne.elements[5],N.__data[7]=0,N.__data[8]=ne.elements[6],N.__data[9]=ne.elements[7],N.__data[10]=ne.elements[8],N.__data[11]=0):(ne.toArray(N.__data,Z),Z+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,N.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(T,E,x,R){const C=T.value,L=E+"_"+x;if(R[L]===void 0)return typeof C=="number"||typeof C=="boolean"?R[L]=C:R[L]=C.clone(),!0;{const O=R[L];if(typeof C=="number"||typeof C=="boolean"){if(O!==C)return R[L]=C,!0}else if(O.equals(C)===!1)return O.copy(C),!0}return!1}function g(T){const E=T.uniforms;let x=0;const R=16;for(let L=0,O=E.length;L<O;L++){const b=Array.isArray(E[L])?E[L]:[E[L]];for(let M=0,N=b.length;M<N;M++){const F=b[M],V=Array.isArray(F.value)?F.value:[F.value];for(let Z=0,ee=V.length;Z<ee;Z++){const ne=V[Z],ie=v(ne),q=x%R,pe=q%ie.boundary,me=q+pe;x+=pe,me!==0&&R-me<ie.storage&&(x+=R-me),F.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=x,x+=ie.storage}}}const C=x%R;return C>0&&(x+=R-C),T.__size=x,T.__cache={},this}function v(T){const E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),E}function m(T){const E=T.target;E.removeEventListener("dispose",m);const x=a.indexOf(E.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(const T in s)i.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class sS{constructor(e={}){const{canvas:t=Gg(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const T=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=as,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let R=!1;this._outputColorSpace=Wt;let C=0,L=0,O=null,b=-1,M=null;const N=new wt,F=new wt;let V=null;const Z=new nt(0);let ee=0,ne=t.width,ie=t.height,q=1,pe=null,me=null;const Ve=new wt(0,0,ne,ie),st=new wt(0,0,ne,ie);let _t=!1;const St=new mu;let ft=!1,se=!1;const K=new rt,_e=new A,ye=new wt,Ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ze=!1;function Mt(){return O===null?q:1}let D=n;function lt(w,z){return t.getContext(w,z)}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${nu}`),t.addEventListener("webglcontextlost",Ee,!1),t.addEventListener("webglcontextrestored",Oe,!1),t.addEventListener("webglcontextcreationerror",ve,!1),D===null){const z="webgl2";if(D=lt(z,w),D===null)throw lt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let je,Xe,Te,Qe,Ne,at,Yt,Ht,I,S,X,re,fe,Y,Ue,Q,ce,Fe,ue,Ce,qe,Be,Re,it;function k(){je=new px(D),je.init(),Be=new jM(D,je),Xe=new ox(D,je,e,Be),Te=new YM(D,je),Xe.reversedDepthBuffer&&h&&Te.buffers.depth.setReversed(!0),Qe=new _x(D),Ne=new UM,at=new KM(D,je,Te,Ne,Xe,Be,Qe),Yt=new lx(x),Ht=new fx(x),I=new b_(D),Re=new rx(D,I),S=new mx(D,I,Qe,Re),X=new yx(D,S,I,Qe),ue=new vx(D,Xe,at),Q=new cx(Ne),re=new NM(x,Yt,Ht,je,Xe,Re,Q),fe=new nS(x,Ne),Y=new FM,Ue=new GM(je),Fe=new sx(x,Yt,Ht,Te,X,f,l),ce=new XM(x,X,Xe),it=new iS(D,Qe,Xe,Te),Ce=new ax(D,je,Qe),qe=new gx(D,je,Qe),Qe.programs=re.programs,x.capabilities=Xe,x.extensions=je,x.properties=Ne,x.renderLists=Y,x.shadowMap=ce,x.state=Te,x.info=Qe}k();const oe=new eS(x,D);this.xr=oe,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const w=je.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=je.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(w){w!==void 0&&(q=w,this.setSize(ne,ie,!1))},this.getSize=function(w){return w.set(ne,ie)},this.setSize=function(w,z,j=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ne=w,ie=z,t.width=Math.floor(w*q),t.height=Math.floor(z*q),j===!0&&(t.style.width=w+"px",t.style.height=z+"px"),this.setViewport(0,0,w,z)},this.getDrawingBufferSize=function(w){return w.set(ne*q,ie*q).floor()},this.setDrawingBufferSize=function(w,z,j){ne=w,ie=z,q=j,t.width=Math.floor(w*j),t.height=Math.floor(z*j),this.setViewport(0,0,w,z)},this.getCurrentViewport=function(w){return w.copy(N)},this.getViewport=function(w){return w.copy(Ve)},this.setViewport=function(w,z,j,J){w.isVector4?Ve.set(w.x,w.y,w.z,w.w):Ve.set(w,z,j,J),Te.viewport(N.copy(Ve).multiplyScalar(q).round())},this.getScissor=function(w){return w.copy(st)},this.setScissor=function(w,z,j,J){w.isVector4?st.set(w.x,w.y,w.z,w.w):st.set(w,z,j,J),Te.scissor(F.copy(st).multiplyScalar(q).round())},this.getScissorTest=function(){return _t},this.setScissorTest=function(w){Te.setScissorTest(_t=w)},this.setOpaqueSort=function(w){pe=w},this.setTransparentSort=function(w){me=w},this.getClearColor=function(w){return w.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(w=!0,z=!0,j=!0){let J=0;if(w){let B=!1;if(O!==null){const de=O.texture.format;B=de===lu||de===cu||de===ou}if(B){const de=O.texture.type,we=de===pi||de===Rs||de===oa||de===ca||de===su||de===ru,Se=Fe.getClearColor(),De=Fe.getClearAlpha(),Ke=Se.r,et=Se.g,We=Se.b;we?(g[0]=Ke,g[1]=et,g[2]=We,g[3]=De,D.clearBufferuiv(D.COLOR,0,g)):(v[0]=Ke,v[1]=et,v[2]=We,v[3]=De,D.clearBufferiv(D.COLOR,0,v))}else J|=D.COLOR_BUFFER_BIT}z&&(J|=D.DEPTH_BUFFER_BIT),j&&(J|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ee,!1),t.removeEventListener("webglcontextrestored",Oe,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),Fe.dispose(),Y.dispose(),Ue.dispose(),Ne.dispose(),Yt.dispose(),Ht.dispose(),X.dispose(),Re.dispose(),it.dispose(),re.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",fn),oe.removeEventListener("sessionend",vi),yi.stop()};function Ee(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Oe(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const w=Qe.autoReset,z=ce.enabled,j=ce.autoUpdate,J=ce.needsUpdate,B=ce.type;k(),Qe.autoReset=w,ce.enabled=z,ce.autoUpdate=j,ce.needsUpdate=J,ce.type=B}function ve(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function te(w){const z=w.target;z.removeEventListener("dispose",te),ke(z)}function ke(w){be(w),Ne.remove(w)}function be(w){const z=Ne.get(w).programs;z!==void 0&&(z.forEach(function(j){re.releaseProgram(j)}),w.isShaderMaterial&&re.releaseShaderCache(w))}this.renderBufferDirect=function(w,z,j,J,B,de){z===null&&(z=Ie);const we=B.isMesh&&B.matrixWorld.determinant()<0,Se=gt(w,z,j,J,B);Te.setMaterial(J,we);let De=j.index,Ke=1;if(J.wireframe===!0){if(De=S.getWireframeAttribute(j),De===void 0)return;Ke=2}const et=j.drawRange,We=j.attributes.position;let pt=et.start*Ke,Ye=(et.start+et.count)*Ke;de!==null&&(pt=Math.max(pt,de.start*Ke),Ye=Math.min(Ye,(de.start+de.count)*Ke)),De!==null?(pt=Math.max(pt,0),Ye=Math.min(Ye,De.count)):We!=null&&(pt=Math.max(pt,0),Ye=Math.min(Ye,We.count));const Ot=Ye-pt;if(Ot<0||Ot===1/0)return;Re.setup(B,J,Se,j,De);let bt,Tt=Ce;if(De!==null&&(bt=I.get(De),Tt=qe,Tt.setIndex(bt)),B.isMesh)J.wireframe===!0?(Te.setLineWidth(J.wireframeLinewidth*Mt()),Tt.setMode(D.LINES)):Tt.setMode(D.TRIANGLES);else if(B.isLine){let Je=J.linewidth;Je===void 0&&(Je=1),Te.setLineWidth(Je*Mt()),B.isLineSegments?Tt.setMode(D.LINES):B.isLineLoop?Tt.setMode(D.LINE_LOOP):Tt.setMode(D.LINE_STRIP)}else B.isPoints?Tt.setMode(D.POINTS):B.isSprite&&Tt.setMode(D.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)pa("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Tt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(je.get("WEBGL_multi_draw"))Tt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Je=B._multiDrawStarts,Lt=B._multiDrawCounts,yt=B._multiDrawCount,mn=De?I.get(De).bytesPerElement:1,Mi=Ne.get(J).currentProgram.getUniforms();for(let ln=0;ln<yt;ln++)Mi.setValue(D,"_gl_DrawID",ln),Tt.render(Je[ln]/mn,Lt[ln])}else if(B.isInstancedMesh)Tt.renderInstances(pt,Ot,B.count);else if(j.isInstancedBufferGeometry){const Je=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Lt=Math.min(j.instanceCount,Je);Tt.renderInstances(pt,Ot,Lt)}else Tt.render(pt,Ot)};function ot(w,z,j){w.transparent===!0&&w.side===Qn&&w.forceSinglePass===!1?(w.side=Pn,w.needsUpdate=!0,pn(w,z,j),w.side=Oi,w.needsUpdate=!0,pn(w,z,j),w.side=Qn):pn(w,z,j)}this.compile=function(w,z,j=null){j===null&&(j=w),p=Ue.get(j),p.init(z),E.push(p),j.traverseVisible(function(B){B.isLight&&B.layers.test(z.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),w!==j&&w.traverseVisible(function(B){B.isLight&&B.layers.test(z.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const J=new Set;return w.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const de=B.material;if(de)if(Array.isArray(de))for(let we=0;we<de.length;we++){const Se=de[we];ot(Se,j,B),J.add(Se)}else ot(de,j,B),J.add(de)}),p=E.pop(),J},this.compileAsync=function(w,z,j=null){const J=this.compile(w,z,j);return new Promise(B=>{function de(){if(J.forEach(function(we){Ne.get(we).currentProgram.isReady()&&J.delete(we)}),J.size===0){B(w);return}setTimeout(de,10)}je.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Me=null;function An(w){Me&&Me(w)}function fn(){yi.stop()}function vi(){yi.start()}const yi=new zf;yi.setAnimationLoop(An),typeof self<"u"&&yi.setContext(self),this.setAnimationLoop=function(w){Me=w,oe.setAnimationLoop(w),w===null?yi.stop():yi.start()},oe.addEventListener("sessionstart",fn),oe.addEventListener("sessionend",vi),this.render=function(w,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(z),z=oe.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,z,O),p=Ue.get(w,E.length),p.init(z),E.push(p),K.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),St.setFromProjectionMatrix(K,di,z.reversedDepth),se=this.localClippingEnabled,ft=Q.init(this.clippingPlanes,se),m=Y.get(w,T.length),m.init(),T.push(m),oe.enabled===!0&&oe.isPresenting===!0){const de=x.xr.getDepthSensingMesh();de!==null&&Is(de,z,-1/0,x.sortObjects)}Is(w,z,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(pe,me),Ze=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,Ze&&Fe.addToRenderList(m,w),this.info.render.frame++,ft===!0&&Q.beginShadows();const j=p.state.shadowsArray;ce.render(j,w,z),ft===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=m.opaque,B=m.transmissive;if(p.setupLights(),z.isArrayCamera){const de=z.cameras;if(B.length>0)for(let we=0,Se=de.length;we<Se;we++){const De=de[we];us(J,B,w,De)}Ze&&Fe.render(w);for(let we=0,Se=de.length;we<Se;we++){const De=de[we];xi(m,w,De,De.viewport)}}else B.length>0&&us(J,B,w,z),Ze&&Fe.render(w),xi(m,w,z);O!==null&&L===0&&(at.updateMultisampleRenderTarget(O),at.updateRenderTargetMipmap(O)),w.isScene===!0&&w.onAfterRender(x,w,z),Re.resetDefaultState(),b=-1,M=null,E.pop(),E.length>0?(p=E[E.length-1],ft===!0&&Q.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Is(w,z,j,J){if(w.visible===!1)return;if(w.layers.test(z.layers)){if(w.isGroup)j=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(z);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||St.intersectsSprite(w)){J&&ye.setFromMatrixPosition(w.matrixWorld).applyMatrix4(K);const we=X.update(w),Se=w.material;Se.visible&&m.push(w,we,Se,j,ye.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||St.intersectsObject(w))){const we=X.update(w),Se=w.material;if(J&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ye.copy(w.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),ye.copy(we.boundingSphere.center)),ye.applyMatrix4(w.matrixWorld).applyMatrix4(K)),Array.isArray(Se)){const De=we.groups;for(let Ke=0,et=De.length;Ke<et;Ke++){const We=De[Ke],pt=Se[We.materialIndex];pt&&pt.visible&&m.push(w,we,pt,j,ye.z,We)}}else Se.visible&&m.push(w,we,Se,j,ye.z,null)}}const de=w.children;for(let we=0,Se=de.length;we<Se;we++)Is(de[we],z,j,J)}function xi(w,z,j,J){const B=w.opaque,de=w.transmissive,we=w.transparent;p.setupLightsView(j),ft===!0&&Q.setGlobalState(x.clippingPlanes,j),J&&Te.viewport(N.copy(J)),B.length>0&&zi(B,z,j),de.length>0&&zi(de,z,j),we.length>0&&zi(we,z,j),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function us(w,z,j,J){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new Cs(1,1,{generateMipmaps:!0,type:je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float")?va:pi,minFilter:Di,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:xt.workingColorSpace}));const de=p.state.transmissionRenderTarget[J.id],we=J.viewport||N;de.setSize(we.z*x.transmissionResolutionScale,we.w*x.transmissionResolutionScale);const Se=x.getRenderTarget(),De=x.getActiveCubeFace(),Ke=x.getActiveMipmapLevel();x.setRenderTarget(de),x.getClearColor(Z),ee=x.getClearAlpha(),ee<1&&x.setClearColor(16777215,.5),x.clear(),Ze&&Fe.render(j);const et=x.toneMapping;x.toneMapping=as;const We=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),ft===!0&&Q.setGlobalState(x.clippingPlanes,J),zi(w,j,J),at.updateMultisampleRenderTarget(de),at.updateRenderTargetMipmap(de),je.has("WEBGL_multisampled_render_to_texture")===!1){let pt=!1;for(let Ye=0,Ot=z.length;Ye<Ot;Ye++){const bt=z[Ye],Tt=bt.object,Je=bt.geometry,Lt=bt.material,yt=bt.group;if(Lt.side===Qn&&Tt.layers.test(J.layers)){const mn=Lt.side;Lt.side=Pn,Lt.needsUpdate=!0,In(Tt,j,J,Je,Lt,yt),Lt.side=mn,Lt.needsUpdate=!0,pt=!0}}pt===!0&&(at.updateMultisampleRenderTarget(de),at.updateRenderTargetMipmap(de))}x.setRenderTarget(Se,De,Ke),x.setClearColor(Z,ee),We!==void 0&&(J.viewport=We),x.toneMapping=et}function zi(w,z,j){const J=z.isScene===!0?z.overrideMaterial:null;for(let B=0,de=w.length;B<de;B++){const we=w[B],Se=we.object,De=we.geometry,Ke=we.group;let et=we.material;et.allowOverride===!0&&J!==null&&(et=J),Se.layers.test(j.layers)&&In(Se,z,j,De,et,Ke)}}function In(w,z,j,J,B,de){w.onBeforeRender(x,z,j,J,B,de),w.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),B.onBeforeRender(x,z,j,J,w,de),B.transparent===!0&&B.side===Qn&&B.forceSinglePass===!1?(B.side=Pn,B.needsUpdate=!0,x.renderBufferDirect(j,z,J,B,w,de),B.side=Oi,B.needsUpdate=!0,x.renderBufferDirect(j,z,J,B,w,de),B.side=Qn):x.renderBufferDirect(j,z,J,B,w,de),w.onAfterRender(x,z,j,J,B,de)}function pn(w,z,j){z.isScene!==!0&&(z=Ie);const J=Ne.get(w),B=p.state.lights,de=p.state.shadowsArray,we=B.state.version,Se=re.getParameters(w,B.state,de,z,j),De=re.getProgramCacheKey(Se);let Ke=J.programs;J.environment=w.isMeshStandardMaterial?z.environment:null,J.fog=z.fog,J.envMap=(w.isMeshStandardMaterial?Ht:Yt).get(w.envMap||J.environment),J.envMapRotation=J.environment!==null&&w.envMap===null?z.environmentRotation:w.envMapRotation,Ke===void 0&&(w.addEventListener("dispose",te),Ke=new Map,J.programs=Ke);let et=Ke.get(De);if(et!==void 0){if(J.currentProgram===et&&J.lightsStateVersion===we)return kt(w,Se),et}else Se.uniforms=re.getUniforms(w),w.onBeforeCompile(Se,x),et=re.acquireProgram(Se,De),Ke.set(De,et),J.uniforms=Se.uniforms;const We=J.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(We.clippingPlanes=Q.uniform),kt(w,Se),J.needsLights=qn(w),J.lightsStateVersion=we,J.needsLights&&(We.ambientLightColor.value=B.state.ambient,We.lightProbe.value=B.state.probe,We.directionalLights.value=B.state.directional,We.directionalLightShadows.value=B.state.directionalShadow,We.spotLights.value=B.state.spot,We.spotLightShadows.value=B.state.spotShadow,We.rectAreaLights.value=B.state.rectArea,We.ltc_1.value=B.state.rectAreaLTC1,We.ltc_2.value=B.state.rectAreaLTC2,We.pointLights.value=B.state.point,We.pointLightShadows.value=B.state.pointShadow,We.hemisphereLights.value=B.state.hemi,We.directionalShadowMap.value=B.state.directionalShadowMap,We.directionalShadowMatrix.value=B.state.directionalShadowMatrix,We.spotShadowMap.value=B.state.spotShadowMap,We.spotLightMatrix.value=B.state.spotLightMatrix,We.spotLightMap.value=B.state.spotLightMap,We.pointShadowMap.value=B.state.pointShadowMap,We.pointShadowMatrix.value=B.state.pointShadowMatrix),J.currentProgram=et,J.uniformsList=null,et}function ba(w){if(w.uniformsList===null){const z=w.currentProgram.getUniforms();w.uniformsList=bo.seqWithValue(z.seq,w.uniforms)}return w.uniformsList}function kt(w,z){const j=Ne.get(w);j.outputColorSpace=z.outputColorSpace,j.batching=z.batching,j.batchingColor=z.batchingColor,j.instancing=z.instancing,j.instancingColor=z.instancingColor,j.instancingMorph=z.instancingMorph,j.skinning=z.skinning,j.morphTargets=z.morphTargets,j.morphNormals=z.morphNormals,j.morphColors=z.morphColors,j.morphTargetsCount=z.morphTargetsCount,j.numClippingPlanes=z.numClippingPlanes,j.numIntersection=z.numClipIntersection,j.vertexAlphas=z.vertexAlphas,j.vertexTangents=z.vertexTangents,j.toneMapping=z.toneMapping}function gt(w,z,j,J,B){z.isScene!==!0&&(z=Ie),at.resetTextureUnits();const de=z.fog,we=J.isMeshStandardMaterial?z.environment:null,Se=O===null?x.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:wn,De=(J.isMeshStandardMaterial?Ht:Yt).get(J.envMap||we),Ke=J.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,et=!!j.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),We=!!j.morphAttributes.position,pt=!!j.morphAttributes.normal,Ye=!!j.morphAttributes.color;let Ot=as;J.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Ot=x.toneMapping);const bt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Tt=bt!==void 0?bt.length:0,Je=Ne.get(J),Lt=p.state.lights;if(ft===!0&&(se===!0||w!==M)){const rn=w===M&&J.id===b;Q.setState(J,w,rn)}let yt=!1;J.version===Je.__version?(Je.needsLights&&Je.lightsStateVersion!==Lt.state.version||Je.outputColorSpace!==Se||B.isBatchedMesh&&Je.batching===!1||!B.isBatchedMesh&&Je.batching===!0||B.isBatchedMesh&&Je.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Je.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Je.instancing===!1||!B.isInstancedMesh&&Je.instancing===!0||B.isSkinnedMesh&&Je.skinning===!1||!B.isSkinnedMesh&&Je.skinning===!0||B.isInstancedMesh&&Je.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Je.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Je.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Je.instancingMorph===!1&&B.morphTexture!==null||Je.envMap!==De||J.fog===!0&&Je.fog!==de||Je.numClippingPlanes!==void 0&&(Je.numClippingPlanes!==Q.numPlanes||Je.numIntersection!==Q.numIntersection)||Je.vertexAlphas!==Ke||Je.vertexTangents!==et||Je.morphTargets!==We||Je.morphNormals!==pt||Je.morphColors!==Ye||Je.toneMapping!==Ot||Je.morphTargetsCount!==Tt)&&(yt=!0):(yt=!0,Je.__version=J.version);let mn=Je.currentProgram;yt===!0&&(mn=pn(J,z,B));let Mi=!1,ln=!1,ds=!1;const Ft=mn.getUniforms(),un=Je.uniforms;if(Te.useProgram(mn.program)&&(Mi=!0,ln=!0,ds=!0),J.id!==b&&(b=J.id,ln=!0),Mi||M!==w){Te.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Ft.setValue(D,"projectionMatrix",w.projectionMatrix),Ft.setValue(D,"viewMatrix",w.matrixWorldInverse);const Zt=Ft.map.cameraPosition;Zt!==void 0&&Zt.setValue(D,_e.setFromMatrixPosition(w.matrixWorld)),Xe.logarithmicDepthBuffer&&Ft.setValue(D,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Ft.setValue(D,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,ln=!0,ds=!0)}if(B.isSkinnedMesh){Ft.setOptional(D,B,"bindMatrix"),Ft.setOptional(D,B,"bindMatrixInverse");const rn=B.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),Ft.setValue(D,"boneTexture",rn.boneTexture,at))}B.isBatchedMesh&&(Ft.setOptional(D,B,"batchingTexture"),Ft.setValue(D,"batchingTexture",B._matricesTexture,at),Ft.setOptional(D,B,"batchingIdTexture"),Ft.setValue(D,"batchingIdTexture",B._indirectTexture,at),Ft.setOptional(D,B,"batchingColorTexture"),B._colorsTexture!==null&&Ft.setValue(D,"batchingColorTexture",B._colorsTexture,at));const Rn=j.morphAttributes;if((Rn.position!==void 0||Rn.normal!==void 0||Rn.color!==void 0)&&ue.update(B,j,mn),(ln||Je.receiveShadow!==B.receiveShadow)&&(Je.receiveShadow=B.receiveShadow,Ft.setValue(D,"receiveShadow",B.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(un.envMap.value=De,un.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&z.environment!==null&&(un.envMapIntensity.value=z.environmentIntensity),ln&&(Ft.setValue(D,"toneMappingExposure",x.toneMappingExposure),Je.needsLights&&Jt(un,ds),de&&J.fog===!0&&fe.refreshFogUniforms(un,de),fe.refreshMaterialUniforms(un,J,q,ie,p.state.transmissionRenderTarget[w.id]),bo.upload(D,ba(Je),un,at)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(bo.upload(D,ba(Je),un,at),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Ft.setValue(D,"center",B.center),Ft.setValue(D,"modelViewMatrix",B.modelViewMatrix),Ft.setValue(D,"normalMatrix",B.normalMatrix),Ft.setValue(D,"modelMatrix",B.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const rn=J.uniformsGroups;for(let Zt=0,Gt=rn.length;Zt<Gt;Zt++){const oi=rn[Zt];it.update(oi,mn),it.bind(oi,mn)}}return mn}function Jt(w,z){w.ambientLightColor.needsUpdate=z,w.lightProbe.needsUpdate=z,w.directionalLights.needsUpdate=z,w.directionalLightShadows.needsUpdate=z,w.pointLights.needsUpdate=z,w.pointLightShadows.needsUpdate=z,w.spotLights.needsUpdate=z,w.spotLightShadows.needsUpdate=z,w.rectAreaLights.needsUpdate=z,w.hemisphereLights.needsUpdate=z}function qn(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(w,z,j){const J=Ne.get(w);J.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),Ne.get(w.texture).__webglTexture=z,Ne.get(w.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:j,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,z){const j=Ne.get(w);j.__webglFramebuffer=z,j.__useDefaultFramebuffer=z===void 0};const Ta=D.createFramebuffer();this.setRenderTarget=function(w,z=0,j=0){O=w,C=z,L=j;let J=!0,B=null,de=!1,we=!1;if(w){const De=Ne.get(w);if(De.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(D.FRAMEBUFFER,null),J=!1;else if(De.__webglFramebuffer===void 0)at.setupRenderTarget(w);else if(De.__hasExternalTextures)at.rebindTextures(w,Ne.get(w.texture).__webglTexture,Ne.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const We=w.depthTexture;if(De.__boundDepthTexture!==We){if(We!==null&&Ne.has(We)&&(w.width!==We.image.width||w.height!==We.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");at.setupDepthRenderbuffer(w)}}const Ke=w.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(we=!0);const et=Ne.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(et[z])?B=et[z][j]:B=et[z],de=!0):w.samples>0&&at.useMultisampledRTT(w)===!1?B=Ne.get(w).__webglMultisampledFramebuffer:Array.isArray(et)?B=et[j]:B=et,N.copy(w.viewport),F.copy(w.scissor),V=w.scissorTest}else N.copy(Ve).multiplyScalar(q).floor(),F.copy(st).multiplyScalar(q).floor(),V=_t;if(j!==0&&(B=Ta),Te.bindFramebuffer(D.FRAMEBUFFER,B)&&J&&Te.drawBuffers(w,B),Te.viewport(N),Te.scissor(F),Te.setScissorTest(V),de){const De=Ne.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+z,De.__webglTexture,j)}else if(we){const De=z;for(let Ke=0;Ke<w.textures.length;Ke++){const et=Ne.get(w.textures[Ke]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Ke,et.__webglTexture,j,De)}}else if(w!==null&&j!==0){const De=Ne.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,De.__webglTexture,j)}b=-1},this.readRenderTargetPixels=function(w,z,j,J,B,de,we,Se=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=Ne.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&we!==void 0&&(De=De[we]),De){Te.bindFramebuffer(D.FRAMEBUFFER,De);try{const Ke=w.textures[Se],et=Ke.format,We=Ke.type;if(!Xe.textureFormatReadable(et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xe.textureTypeReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=w.width-J&&j>=0&&j<=w.height-B&&(w.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Se),D.readPixels(z,j,J,B,Be.convert(et),Be.convert(We),de))}finally{const Ke=O!==null?Ne.get(O).__webglFramebuffer:null;Te.bindFramebuffer(D.FRAMEBUFFER,Ke)}}},this.readRenderTargetPixelsAsync=async function(w,z,j,J,B,de,we,Se=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=Ne.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&we!==void 0&&(De=De[we]),De)if(z>=0&&z<=w.width-J&&j>=0&&j<=w.height-B){Te.bindFramebuffer(D.FRAMEBUFFER,De);const Ke=w.textures[Se],et=Ke.format,We=Ke.type;if(!Xe.textureFormatReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xe.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const pt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,pt),D.bufferData(D.PIXEL_PACK_BUFFER,de.byteLength,D.STREAM_READ),w.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Se),D.readPixels(z,j,J,B,Be.convert(et),Be.convert(We),0);const Ye=O!==null?Ne.get(O).__webglFramebuffer:null;Te.bindFramebuffer(D.FRAMEBUFFER,Ye);const Ot=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Wg(D,Ot,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,pt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,de),D.deleteBuffer(pt),D.deleteSync(Ot),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,z=null,j=0){const J=Math.pow(2,-j),B=Math.floor(w.image.width*J),de=Math.floor(w.image.height*J),we=z!==null?z.x:0,Se=z!==null?z.y:0;at.setTexture2D(w,0),D.copyTexSubImage2D(D.TEXTURE_2D,j,0,0,we,Se,B,de),Te.unbindTexture()};const Ls=D.createFramebuffer(),Ds=D.createFramebuffer();this.copyTextureToTexture=function(w,z,j=null,J=null,B=0,de=null){de===null&&(B!==0?(pa("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),de=B,B=0):de=0);let we,Se,De,Ke,et,We,pt,Ye,Ot;const bt=w.isCompressedTexture?w.mipmaps[de]:w.image;if(j!==null)we=j.max.x-j.min.x,Se=j.max.y-j.min.y,De=j.isBox3?j.max.z-j.min.z:1,Ke=j.min.x,et=j.min.y,We=j.isBox3?j.min.z:0;else{const Rn=Math.pow(2,-B);we=Math.floor(bt.width*Rn),Se=Math.floor(bt.height*Rn),w.isDataArrayTexture?De=bt.depth:w.isData3DTexture?De=Math.floor(bt.depth*Rn):De=1,Ke=0,et=0,We=0}J!==null?(pt=J.x,Ye=J.y,Ot=J.z):(pt=0,Ye=0,Ot=0);const Tt=Be.convert(z.format),Je=Be.convert(z.type);let Lt;z.isData3DTexture?(at.setTexture3D(z,0),Lt=D.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(at.setTexture2DArray(z,0),Lt=D.TEXTURE_2D_ARRAY):(at.setTexture2D(z,0),Lt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,z.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,z.unpackAlignment);const yt=D.getParameter(D.UNPACK_ROW_LENGTH),mn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Mi=D.getParameter(D.UNPACK_SKIP_PIXELS),ln=D.getParameter(D.UNPACK_SKIP_ROWS),ds=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,bt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,bt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ke),D.pixelStorei(D.UNPACK_SKIP_ROWS,et),D.pixelStorei(D.UNPACK_SKIP_IMAGES,We);const Ft=w.isDataArrayTexture||w.isData3DTexture,un=z.isDataArrayTexture||z.isData3DTexture;if(w.isDepthTexture){const Rn=Ne.get(w),rn=Ne.get(z),Zt=Ne.get(Rn.__renderTarget),Gt=Ne.get(rn.__renderTarget);Te.bindFramebuffer(D.READ_FRAMEBUFFER,Zt.__webglFramebuffer),Te.bindFramebuffer(D.DRAW_FRAMEBUFFER,Gt.__webglFramebuffer);for(let oi=0;oi<De;oi++)Ft&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ne.get(w).__webglTexture,B,We+oi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ne.get(z).__webglTexture,de,Ot+oi)),D.blitFramebuffer(Ke,et,we,Se,pt,Ye,we,Se,D.DEPTH_BUFFER_BIT,D.NEAREST);Te.bindFramebuffer(D.READ_FRAMEBUFFER,null),Te.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(B!==0||w.isRenderTargetTexture||Ne.has(w)){const Rn=Ne.get(w),rn=Ne.get(z);Te.bindFramebuffer(D.READ_FRAMEBUFFER,Ls),Te.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ds);for(let Zt=0;Zt<De;Zt++)Ft?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Rn.__webglTexture,B,We+Zt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Rn.__webglTexture,B),un?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,rn.__webglTexture,de,Ot+Zt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,rn.__webglTexture,de),B!==0?D.blitFramebuffer(Ke,et,we,Se,pt,Ye,we,Se,D.COLOR_BUFFER_BIT,D.NEAREST):un?D.copyTexSubImage3D(Lt,de,pt,Ye,Ot+Zt,Ke,et,we,Se):D.copyTexSubImage2D(Lt,de,pt,Ye,Ke,et,we,Se);Te.bindFramebuffer(D.READ_FRAMEBUFFER,null),Te.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else un?w.isDataTexture||w.isData3DTexture?D.texSubImage3D(Lt,de,pt,Ye,Ot,we,Se,De,Tt,Je,bt.data):z.isCompressedArrayTexture?D.compressedTexSubImage3D(Lt,de,pt,Ye,Ot,we,Se,De,Tt,bt.data):D.texSubImage3D(Lt,de,pt,Ye,Ot,we,Se,De,Tt,Je,bt):w.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,de,pt,Ye,we,Se,Tt,Je,bt.data):w.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,de,pt,Ye,bt.width,bt.height,Tt,bt.data):D.texSubImage2D(D.TEXTURE_2D,de,pt,Ye,we,Se,Tt,Je,bt);D.pixelStorei(D.UNPACK_ROW_LENGTH,yt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,mn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Mi),D.pixelStorei(D.UNPACK_SKIP_ROWS,ln),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ds),de===0&&z.generateMipmaps&&D.generateMipmap(Lt),Te.unbindTexture()},this.initRenderTarget=function(w){Ne.get(w).__webglFramebuffer===void 0&&at.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?at.setTextureCube(w,0):w.isData3DTexture?at.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?at.setTexture2DArray(w,0):at.setTexture2D(w,0),Te.unbindTexture()},this.resetState=function(){C=0,L=0,O=null,Te.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=xt._getDrawingBufferColorSpace(e),t.unpackColorSpace=xt._getUnpackColorSpace()}}function Th(i,e){if(e===gg)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Fl||e===pf){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Fl)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class rS extends Tr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new uS(t)}),this.register(function(t){return new dS(t)}),this.register(function(t){return new xS(t)}),this.register(function(t){return new MS(t)}),this.register(function(t){return new SS(t)}),this.register(function(t){return new fS(t)}),this.register(function(t){return new pS(t)}),this.register(function(t){return new mS(t)}),this.register(function(t){return new gS(t)}),this.register(function(t){return new lS(t)}),this.register(function(t){return new _S(t)}),this.register(function(t){return new hS(t)}),this.register(function(t){return new yS(t)}),this.register(function(t){return new vS(t)}),this.register(function(t){return new oS(t)}),this.register(function(t){return new bS(t)}),this.register(function(t){return new TS(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=ia.extractUrlBase(e);a=ia.resolveURL(c,this.path)}else a=ia.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new kf(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(d){t(d),r.manager.itemEnd(e)},o)}catch(d){o(d)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===$f){try{a[vt.KHR_BINARY_GLTF]=new ES(e)}catch(u){s&&s(u);return}r=JSON.parse(a[vt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new BS(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const u=this.pluginCallbacks[d](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let d=0;d<r.extensionsUsed.length;++d){const u=r.extensionsUsed[d],h=r.extensionsRequired||[];switch(u){case vt.KHR_MATERIALS_UNLIT:a[u]=new cS;break;case vt.KHR_DRACO_MESH_COMPRESSION:a[u]=new wS(r,this.dracoLoader);break;case vt.KHR_TEXTURE_TRANSFORM:a[u]=new AS;break;case vt.KHR_MESH_QUANTIZATION:a[u]=new RS;break;default:h.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function aS(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const vt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class oS{constructor(e){this.parser=e,this.name=vt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const d=new nt(16777215);l.color!==void 0&&d.setRGB(l.color[0],l.color[1],l.color[2],wn);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Vl(d),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new c_(d),c.distance=u;break;case"spot":c=new a_(d),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),li(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class cS{constructor(){this.name=vt.KHR_MATERIALS_UNLIT}getMaterialType(){return Wn}extendParams(e,t,n){const s=[];e.color=new nt(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],wn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Wt))}return Promise.all(s)}}class lS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class uS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new He(o,o)}return Promise.all(r)}}class dS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class hS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class fS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new nt(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],wn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Wt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class pS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class mS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new nt().setRGB(o[0],o[1],o[2],wn),Promise.all(r)}}class gS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class _S{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new nt().setRGB(o[0],o[1],o[2],wn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Wt)),Promise.all(r)}}class vS{constructor(e){this.parser=e,this.name=vt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class yS{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class xS{constructor(e){this.parser=e,this.name=vt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class MS{constructor(e){this.parser=e,this.name=vt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class SS{constructor(e){this.parser=e,this.name=vt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class bS{constructor(e){this.name=vt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,d=s.count,u=s.byteStride,h=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(d,u,h,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(d*u);return a.decodeGltfBuffer(new Uint8Array(f),d,u,h,s.mode,s.filter),f})})}else return null}}class TS{constructor(e){this.name=vt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==Hn.TRIANGLES&&c.mode!==Hn.TRIANGLE_STRIP&&c.mode!==Hn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(d=>(l[c]=d,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const d=c.pop(),u=d.isGroup?d.children:[d],h=c[0].count,f=[];for(const g of u){const v=new rt,m=new A,p=new tt,T=new A(1,1,1),E=new Pf(g.geometry,g.material,h);for(let x=0;x<h;x++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,x),l.SCALE&&T.fromBufferAttribute(l.SCALE,x),E.setMatrixAt(x,v.compose(m,p,T));for(const x in l)if(x==="_COLOR_0"){const R=l[x];E.instanceColor=new kl(R.array,R.itemSize,R.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,l[x]);zt.prototype.copy.call(E,g),this.parser.assignFinalMaterial(E),f.push(E)}return d.isGroup?(d.clear(),d.add(...f),d):f[0]}))}}const $f="glTF",Xr=12,Eh={JSON:1313821514,BIN:5130562};class ES{constructor(e){this.name=vt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Xr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==$f)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Xr,r=new DataView(e,Xr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===Eh.JSON){const c=new Uint8Array(e,Xr+a,o);this.content=n.decode(c)}else if(l===Eh.BIN){const c=Xr+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class wS{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=vt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const d in a){const u=$l[d]||d.toLowerCase();o[u]=a[d]}for(const d in e.attributes){const u=$l[d]||d.toLowerCase();if(a[d]!==void 0){const h=n.accessors[e.attributes[d]],f=cr[h.componentType];c[u]=f.name,l[u]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(d){return new Promise(function(u,h){s.decodeDracoFile(d,function(f){for(const g in f.attributes){const v=f.attributes[g],m=l[g];m!==void 0&&(v.normalized=m)}u(f)},o,c,wn,h)})})}}class AS{constructor(){this.name=vt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class RS{constructor(){this.name=vt.KHR_MESH_QUANTIZATION}}class Xf extends Ma{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,d=s-t,u=(n-t)/d,h=u*u,f=h*u,g=e*c,v=g-c,m=-2*f+3*h,p=f-h,T=1-m,E=p-h+u;for(let x=0;x!==o;x++){const R=a[v+x+o],C=a[v+x+l]*d,L=a[g+x+o],O=a[g+x]*d;r[x]=T*R+E*C+m*L+p*O}return r}}const CS=new tt;class PS extends Xf{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return CS.fromArray(r).normalize().toArray(r),r}}const Hn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},cr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},wh={9728:Tn,9729:On,9984:af,9985:vo,9986:Kr,9987:Di},Ah={33071:ss,33648:Ao,10497:mr},Hc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},$l={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},es={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},IS={CUBICSPLINE:void 0,LINEAR:ha,STEP:da},Vc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function LS(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new en({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Oi})),i.DefaultMaterial}function Ms(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function li(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function DS(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,d=e.length;c<d;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],l=[];for(let c=0,d=e.length;c<d;c++){const u=e[c];if(n){const h=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(h)}if(s){const h=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(h)}if(r){const h=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(h)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const d=c[0],u=c[1],h=c[2];return n&&(i.morphAttributes.position=d),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function NS(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function US(i){let e;const t=i.extensions&&i.extensions[vt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Gc(t.attributes):e=i.indices+":"+Gc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Gc(i.targets[n]);return e}function Gc(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Xl(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function OS(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const FS=new rt;class BS{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new aS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new i_(this.options.manager):this.textureLoader=new u_(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new kf(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Ms(r,o,s),li(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,d]of a.children.entries())r(d,o.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[vt.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(ia.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=Hc[s.type],o=cr[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new En(c,a,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=Hc[s.type],c=cr[s.componentType],d=c.BYTES_PER_ELEMENT,u=d*l,h=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let v,m;if(f&&f!==u){const p=Math.floor(h/f),T="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let E=t.cache.get(T);E||(v=new c(o,p*f,s.count*f/d),E=new Ef(v,f/d),t.cache.add(T,E)),m=new ma(E,l,h%f/d,g)}else o===null?v=new c(s.count*l):v=new c(o,h,s.count*l),m=new En(v,l,g);if(s.sparse!==void 0){const p=Hc.SCALAR,T=cr[s.sparse.indices.componentType],E=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,R=new T(a[1],E,s.sparse.count*p),C=new c(a[2],x,s.sparse.count*l);o!==null&&(m=new En(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let L=0,O=R.length;L<O;L++){const b=R[L];if(m.setX(b,C[L*l]),l>=2&&m.setY(b,C[L*l+1]),l>=3&&m.setZ(b,C[L*l+2]),l>=4&&m.setW(b,C[L*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(d){d.flipY=!1,d.name=a.name||o.name||"",d.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(d.name=o.uri);const h=(r.samplers||{})[a.sampler]||{};return d.magFilter=wh[h.magFilter]||On,d.minFilter=wh[h.minFilter]||Di,d.wrapS=Ah[h.wrapS]||mr,d.wrapT=Ah[h.wrapT]||mr,d.generateMipmaps=!d.isCompressedTexture&&d.minFilter!==Tn&&d.minFilter!==On,s.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const h=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(h),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const d=Promise.resolve(l).then(function(u){return new Promise(function(h,f){let g=h;t.isImageBitmapLoader===!0&&(g=function(v){const m=new tn(v);m.needsUpdate=!0,h(m)}),t.load(ia.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),li(u,a),u.userData.mimeType=a.mimeType||OS(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=d,d}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[vt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[vt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[vt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Lf,si.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new If,si.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return en}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[vt.KHR_MATERIALS_UNLIT]){const u=s[vt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new nt(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const h=u.baseColorFactor;o.color.setRGB(h[0],h[1],h[2],wn),o.opacity=h[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,Wt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Qn);const d=r.alphaMode||Vc.OPAQUE;if(d===Vc.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,d===Vc.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Wn&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new He(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Wn&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Wn){const u=r.emissiveFactor;o.emissive=new nt().setRGB(u[0],u[1],u[2],wn)}return r.emissiveTexture!==void 0&&a!==Wn&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Wt)),Promise.all(c).then(function(){const u=new a(o);return r.name&&(u.name=r.name),li(u,r),t.associations.set(u,{materials:e}),r.extensions&&Ms(s,u,r),u})}createUniqueName(e){const t=It.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[vt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Rh(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],d=US(c),u=s[d];if(u)a.push(u.promise);else{let h;c.extensions&&c.extensions[vt.KHR_DRACO_MESH_COMPRESSION]?h=r(c):h=Rh(new cn,c,t),s[d]={primitive:c,promise:h},a.push(h)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const d=a[l].material===void 0?LS(this.cache):this.getDependency("material",a[l].material);o.push(d)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),d=l[l.length-1],u=[];for(let f=0,g=d.length;f<g;f++){const v=d[f],m=a[f];let p;const T=c[f];if(m.mode===Hn.TRIANGLES||m.mode===Hn.TRIANGLE_STRIP||m.mode===Hn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new v0(v,T):new Ct(v,T),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Hn.TRIANGLE_STRIP?p.geometry=Th(p.geometry,pf):m.mode===Hn.TRIANGLE_FAN&&(p.geometry=Th(p.geometry,Fl));else if(m.mode===Hn.LINES)p=new T0(v,T);else if(m.mode===Hn.LINE_STRIP)p=new gu(v,T);else if(m.mode===Hn.LINE_LOOP)p=new E0(v,T);else if(m.mode===Hn.POINTS)p=new w0(v,T);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&NS(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),li(p,r),m.extensions&&Ms(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Ms(s,u[0],r),u[0];const h=new $t;r.extensions&&Ms(s,h,r),t.associations.set(h,{meshes:e});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Mn(ts.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new bu(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),li(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],l=[];for(let c=0,d=a.length;c<d;c++){const u=a[c];if(u){o.push(u);const h=new rt;r!==null&&h.fromArray(r.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new pu(o,l)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],d=[];for(let u=0,h=s.channels.length;u<h;u++){const f=s.channels[u],g=s.samplers[f.sampler],v=f.target,m=v.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,T=s.parameters!==void 0?s.parameters[g.output]:g.output;v.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",T)),c.push(g),d.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(d)]).then(function(u){const h=u[0],f=u[1],g=u[2],v=u[3],m=u[4],p=[];for(let E=0,x=h.length;E<x;E++){const R=h[E],C=f[E],L=g[E],O=v[E],b=m[E];if(R===void 0)continue;R.updateMatrix&&R.updateMatrix();const M=n._createAnimationTracks(R,C,L,O,b);if(M)for(let N=0;N<M.length;N++)p.push(M[N])}const T=new j0(r,void 0,p);return li(T,s),T})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,d=o.length;c<d;c++)a.push(n.getDependency("node",o[c]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const d=c[0],u=c[1],h=c[2];h!==null&&d.traverse(function(f){f.isSkinnedMesh&&f.bind(h,FS)});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let d;if(r.isBone===!0?d=new Rf:c.length>1?d=new $t:c.length===1?d=c[0]:d=new zt,d!==c[0])for(let u=0,h=c.length;u<h;u++)d.add(c[u]);if(r.name&&(d.userData.name=r.name,d.name=a),li(d,r),r.extensions&&Ms(n,d,r),r.matrix!==void 0){const u=new rt;u.fromArray(r.matrix),d.applyMatrix4(u)}else r.translation!==void 0&&d.position.fromArray(r.translation),r.rotation!==void 0&&d.quaternion.fromArray(r.rotation),r.scale!==void 0&&d.scale.fromArray(r.scale);if(!s.associations.has(d))s.associations.set(d,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const u=s.associations.get(d);s.associations.set(d,{...u})}return s.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new $t;n.name&&(r.name=s.createUniqueName(n.name)),li(r,n),n.extensions&&Ms(t,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let d=0,u=l.length;d<u;d++)r.add(l[d]);const c=d=>{const u=new Map;for(const[h,f]of s.associations)(h instanceof si||h instanceof tn)&&u.set(h,f);return d.traverse(h=>{const f=s.associations.get(h);f!=null&&u.set(h,f)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,l=[];es[r.path]===es.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(o);let c;switch(es[r.path]){case es.weights:c=vr;break;case es.rotation:c=yr;break;case es.translation:case es.scale:c=xr;break;default:switch(n.itemSize){case 1:c=vr;break;case 2:case 3:default:c=xr;break}break}const d=s.interpolation!==void 0?IS[s.interpolation]:ha,u=this._getArrayFromAccessor(n);for(let h=0,f=l.length;h<f;h++){const g=new c(l[h]+"."+es[r.path],t.array,u,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Xl(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof yr?PS:Xf;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function kS(i,e,t){const n=e.attributes,s=new Fn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new A(l[0],l[1],l[2]),new A(c[0],c[1],c[2])),o.normalized){const d=Xl(cr[o.componentType]);s.min.multiplyScalar(d),s.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new A,l=new A;for(let c=0,d=r.length;c<d;c++){const u=r[c];if(u.POSITION!==void 0){const h=t.json.accessors[u.POSITION],f=h.min,g=h.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),h.normalized){const v=Xl(cr[h.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new gi;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function Rh(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(const a in n){const o=$l[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return xt.workingColorSpace!==wn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${xt.workingColorSpace}" not supported.`),li(i,e),kS(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?DS(i,e.targets,t):i})}const zS={restaurant:{theme:"cozy-cafe",products:Fh.map(i=>i.id),sources:["assets/restaurant-cozy-interior.glb","assets/restaurant-cozy-customers.glb","assets/restaurant-products.glb","assets/cash-register.glb"],customerKinds:["bear","bunny","fox","penguin","cat"],hasBelt:!1}},HS={"POS / Graphite powder coat":"#b17a55","POS / Injection molded ABS":"#f5dfbd","POS / Rubber":"#775543","POS / Brushed aluminium":"#d1aa76","POS / Stainless spring steel":"#d8c0a0","POS / Dark keycaps":"#9bae92","POS / Light keycaps":"#fff0d2","POS / Clear key":"#db927e","POS / Confirm key":"#8caa87","POS / Lettering":"#684b3c","POS / Key legend":"#5a4436","POS / Thermal paper":"#fff4da"},Wc=new A(.65,1.025,.3),VS=new A(-.045,.98,.58),qr=new A(-.2,1.052,-.1),$c=new A(.28,1.026,-.48),Xc=new A(3.2,0,-2),Yr=new A(-.3,1.3,-.74),GS=new A(0,0,-1.2),WS=[new A(-1.4,0,-2.5),new A(-2.7,0,-3.5)],$S=[[1e4,-.264],[5e3,-.132],[2e3,0],[1e3,.132],[500,.264]],XS=[[200,-.274],[100,-.165],[50,-.055],[20,.055],[10,.165],[5,.274]],qc={calm:{peak:[0,0,0],settled:[0,0,0],duration:300},restless:{peak:[-.14,.045,-.18],settled:[-.055,.015,-.06],duration:1100},impatient:{peak:[-.24,.075,-.65],settled:[-.1,.035,-.17],duration:1350},exhausted:{peak:[-.32,.1,-.92],settled:[-.15,.05,-.28],duration:1500}},Yc={calm:{smile:.02,brow:.08,lift:0,cheek:1},happy:{smile:.036,brow:.18,lift:.018,cheek:1.18},restless:{smile:.003,brow:.28,lift:.006,cheek:.92},impatient:{smile:-.022,brow:-.22,lift:-.006,cheek:.84},exhausted:{smile:-.014,brow:.32,lift:-.011,cheek:.76},relieved:{smile:.025,brow:.04,lift:.003,cheek:1.06},tired:{smile:.008,brow:.27,lift:-.01,cheek:.82}},qS={"too-high":{smile:-.008,brow:.36,lift:.042},"too-low":{smile:-.02,brow:.28,lift:.025}},YS=["bear-nod","bunny-ears","fox-tilt","penguin-flippers","cat-blink"],KS=["thumbs-up","kiss","hearts","thumbs-up","kiss"],To=i=>`./${i}`,dn=i=>i*i*(3-2*i),Ch=i=>`$${(i/100).toFixed(i%100?2:0)}`;function Ph(i,e=new Set){return i==null||i.traverse(t=>{t.geometry&&!e.has(t.geometry)&&(e.add(t.geometry),t.geometry.dispose());for(const n of Array.isArray(t.material)?t.material:[t.material])if(!(!n||e.has(n))){e.add(n);for(const s of Object.values(n))s!=null&&s.isTexture&&!e.has(s)&&(e.add(s),s.dispose());n.dispose()}}),e}function jS(i,e,t){let n=0,s=!1,r=null;return{setState(a){r=a;const o=++n;a.phase==="unload"&&queueMicrotask(()=>{!s&&o===n&&(i==null||i())})},setOrder(){},setScanned(){},setPatience(){},setEmotion(){},setSpeech(){},playReaction(){},reactToChange(){},reactToTotal(){},celebrate(){},resize(){},dispose(){s=!0,n++},info:()=>({status:"unavailable",loaded:!1,sceneId:e,theme:{id:t.theme},customerKinds:[...t.customerKinds],customerModels:0,humanModels:0,productModels:[],conveyorVisible:!1,greetingAnimation:{status:"unavailable",active:!1},thankYouAnimation:{status:"unavailable",active:!1},phase:r==null?void 0:r.phase,patienceMood:"calm",cameraType:"PerspectiveCamera",viewMode:"first-person",triangles:0,drawCalls:0,queueCount:0,unloading:!1,drawerOpen:!1,drawerTarget:null,availableDrawerDenominations:ra(r).map(a=>a.cents),missingDrawerDenominations:ko(r).map(a=>a.cents),activeAnimations:0,renderedFrames:0,renderLoopActive:!1,emotion:{mood:"happy",kind:t.customerKinds[0],expressionStyle:"unavailable",mouthOpenness:0,facialPose:"emotion"},speech:{active:!1,character:t.customerKinds[0],mouthOpenness:0,boundaryCount:0},reaction:{kind:null,status:"unavailable",active:!1,particleCount:0,symbolKinds:[]},changeHandover:{status:"none",holder:null,visible:!1,attachedToHand:!1,count:0,denominations:[]},takeawayBag:{status:"unavailable",holder:null,visible:!1,attachedToHand:!1,itemCount:0,lineIds:[],productIds:[],worldBounds:null},departure:{active:!1,walking:!1},customerMotion:{enabled:!1,active:!1,scheduled:!1,bursts:0,actorIndices:[],poses:[]},receipt:{status:"unavailable",holder:null,visible:!1,attachedToHand:!1,worldBounds:null,orderId:null},wrongChangeReaction:{direction:null,status:"unavailable",active:!1},wrongTotalReaction:{direction:null,status:"unavailable",active:!1,facialPose:null},items:[],modelSources:t.sources.map(To)})}}async function JS(i,{sceneId:e="restaurant",onScan:t,onReady:n,onError:s,onUnloadComplete:r,onAcceptPayment:a,onOpenDrawer:o}={}){e="restaurant";const l=zS[e],c=e==="restaurant",d=VS.clone();c&&(d.y=1.032);let u;try{u=new sS({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch(_){return s==null||s(new Error("The 3D checkout could not start. You can still use all cashier controls.",{cause:_})),jS(r,e,l)}let h=!1,f=!1,g=!1,v=!1,m=0,p=0,T=0,E=null,x=null,R=null,C=null,L=null,O=null,b=null,M=null,N=null,F="none",V=null,Z=0,ee=null,ne=null,ie={direction:null,status:"none",restore:null},q={direction:null,status:"none",restore:null},pe="happy",me=!1,Ve=0,st=0,_t=0,St=0,ft=null,se={kind:null,status:"none",symbolKinds:[]},K=null,_e="none",ye=null,Ie=[],Ze="counter";const Mt=new Map;let D=[],lt=0,je="";const Xe=new Set,Te=new Map;let Qe=null,Ne=null,at=!1,Yt=.45,Ht="",I=ra().map(_=>_.cents),S=[];const X=[],re=new Map,fe=new Map;let Y=null,Ue=null,Q=0,ce="scan",Fe="calm",ue=new Set,Ce="",qe=[],Be=null,Re=!1,it=!1,k=null,oe=null,Ee=null,Oe=!1;const ve=window.matchMedia("(prefers-reduced-motion: reduce)");let te=ve.matches;const ke=new Map,be=new Map,ot=new Map,Me=new Map,An=new Map,fn=new Map;let vi=null,yi=0,Is=0,xi=null,us=[];function zi(){return g&&!h&&!f&&!document.hidden&&!te&&Y&&!["unload","success","finished"].includes(ce)}function In(){clearTimeout(vi),vi=null,Me.delete("customers-idle"),xi==null||xi(),xi=null,us=[]}function pn(_=2200){!zi()||vi!==null||Me.has("customers-idle")||(vi=setTimeout(()=>{vi=null,zi()&&ba()},_))}function ba(){const _=[...be.values()].filter(U=>!U.group.visible||U.index===Q%5&&(Fe!=="calm"||ie.direction||q.direction||Me.has(`arm:${U.index}`))?!1:!["animal","patience","person","depart"].some(G=>Me.has(`${G}:${U.index}`))).map(U=>{var G,le,$,W;return{person:U,queued:U.index!==Q%5,rigPosition:U.rig.position.clone(),rigQuaternion:U.rig.quaternion.clone(),head:(G=U.head)==null?void 0:G.quaternion.clone(),headPosition:(le=U.head)==null?void 0:le.position.clone(),arm:($=U.freeArm)==null?void 0:$.quaternion.clone(),forearm:(W=U.freeForearm)==null?void 0:W.quaternion.clone(),ears:U.ears.map(he=>({object:he.object,quaternion:he.object.quaternion.clone()})),body:U.bodyParts.map(he=>({object:he,scale:he.scale.clone()}))}});if(!_.length){pn(1800);return}const P=yi++;Is++,us=_.map(({person:U})=>U.index);const y=()=>{var U;for(const{person:G,rigPosition:le,rigQuaternion:$,head:W,headPosition:he,arm:ge,forearm:ae,body:Ae,ears:Le}of _){G.rig.position.copy(le),G.rig.quaternion.copy($),W&&(G.head.quaternion.copy(W),G.head.position.copy(he)),ge&&G.freeArm.quaternion.copy(ge),ae&&G.freeForearm.quaternion.copy(ae);for(const ze of Ae)ze.object.scale.copy(ze.scale);for(const ze of Le)ze.object.quaternion.copy(ze.quaternion);Pr(G,((U=G.expression)==null?void 0:U.eyeClosure)??0)}};xi=y,vn("customers-idle",2800,U=>{for(const[G,le]of _.entries()){const{person:$,queued:W,rigPosition:he,rigQuaternion:ge,head:ae,headPosition:Ae,arm:Le,forearm:ze,body:At,ears:ct}=le,dt=ts.clamp((U*2800-G*170)/2380,0,1),Dt=Math.sin(dt*Math.PI)**2,Rt=Math.sin(dt*Math.PI*2)*Dt,Ln=($.index+P)%2?-1:1;for(const Dn of At)Dn.object.scale.copy(Dn.scale).multiply(new A(1+Dt*.004,1+Dt*.004,1+Dt*.01));W&&($.rig.position.copy(he).add(new A(Rt*.014,0,0)),$.rig.quaternion.copy(ge).multiply(new tt().setFromAxisAngle(new A(0,0,1),Rt*.01))),ae&&($.head.position.copy(Ae).add(new A(0,Dt*.005,0)),$.head.quaternion.copy(ae).multiply(new tt().setFromEuler(new Xt(Dt*($.index===0?.045:$.index===3?.065:.018),Dt*Ln*.085,Rt*($.index===2?.07:.018))))),c&&$.index===1&&ct.forEach((Dn,kn)=>Dn.object.quaternion.copy(Dn.quaternion).multiply(new tt().setFromAxisAngle(new A(0,0,1),Rt*(kn?-.085:.085)))),c&&$.index===4&&Pr($,Math.max($.expression.eyeClosure,dt>.3&&dt<.58?Math.sin((dt-.3)/.28*Math.PI)**2:0)),Le&&$.freeArm.quaternion.copy(Le).multiply(new tt().setFromEuler(new Xt(-Dt*.14,0,Dt*Ln*.035))),ze&&$.freeForearm.quaternion.copy(ze).multiply(new tt().setFromAxisAngle(new A(1,0,0),-Dt*.2))}},()=>{y(),xi=null,us=[],pn(4400)})}u.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),u.outputColorSpace=Wt,u.toneMapping=sf,u.toneMappingExposure=c?1:1.05,u.shadowMap.enabled=!0,u.shadowMap.type=tf;const kt=u.domElement;kt.className="market-canvas",kt.style.cssText="display:block;width:100%;height:100%;touch-action:pan-y;outline:none;",kt.setAttribute("role","img"),kt.setAttribute("aria-label",`First-person ${c?"restaurant counter. Tap food on the trays to ring it up":"supermarket checkout. Tap groceries to scan them"} and tap the customer’s offered money to accept payment. The same actions are available as buttons.`),i.append(kt);const gt=new m0;gt.background=new nt(c?16773081:14410719),gt.fog=new fu(c?16773081:14410719,13,34);const Jt=new Mn(60,1,.055,60);Jt.position.set(0,1.9,2.65),Jt.lookAt(-.15,1.1,-.55),gt.add(new s_(c?16777201:16775406,c?13017228:10135455,c?1.4:1.9));const qn=new Vl(c?16773081:16773850,c?1.9:2.4);qn.position.set(-3,7,4),qn.castShadow=!0,qn.shadow.mapSize.set(1024,1024),Object.assign(qn.shadow.camera,{left:-7,right:7,top:7,bottom:-7,near:.1,far:24}),qn.shadow.bias=-4e-4,qn.shadow.normalBias=.025,qn.target.position.set(0,0,-3),gt.add(qn,qn.target);const Ta=new Vl(c?16769476:15201023,c?.95:1.1);Ta.position.set(5,4,-4),gt.add(Ta);const Ls=new $t;Ls.name="order_items",gt.add(Ls);const Ds=new $t;Ds.name="customer_queue",gt.add(Ds);const w=new $t;w.name="customer_affection",gt.add(w);const z=new Map;function j(_){if(z.has(_))return z.get(_);const P=document.createElement("canvas");P.width=P.height=192;const y=P.getContext("2d");y.lineJoin="round",y.lineCap="round",_==="hearts"?(y.beginPath(),y.moveTo(96,160),y.bezierCurveTo(12,107,15,49,55,38),y.bezierCurveTo(74,31,89,41,96,57),y.bezierCurveTo(104,40,120,31,140,38),y.bezierCurveTo(180,50,178,110,96,160),y.fillStyle="#f48eac",y.strokeStyle="#fff8ee",y.lineWidth=10,y.fill(),y.stroke(),y.beginPath(),y.moveTo(51,57),y.quadraticCurveTo(39,68,43,85),y.strokeStyle="#ffd8e5",y.lineWidth=8,y.stroke()):(y.fillStyle="#eff5d6",y.strokeStyle="#fff8ee",y.lineWidth=8,y.beginPath(),y.arc(96,96,77,0,Math.PI*2),y.fill(),y.stroke(),y.beginPath(),y.moveTo(71,149),y.lineTo(71,84),y.quadraticCurveTo(87,74,92,52),y.quadraticCurveTo(95,35,107,42),y.quadraticCurveTo(120,51,108,78),y.lineTo(139,78),y.quadraticCurveTo(155,80,150,96),y.lineTo(140,137),y.quadraticCurveTo(137,149,121,149),y.closePath(),y.fillStyle="#f5ce9f",y.strokeStyle="#a57a52",y.lineWidth=5,y.fill(),y.stroke(),y.fillStyle="#99b894",y.fillRect(42,89,25,62),y.strokeStyle="#6d8c6c",y.strokeRect(42,89,25,62),y.beginPath(),y.moveTo(113,102),y.lineTo(147,102),y.moveTo(112,121),y.lineTo(142,121),y.strokeStyle="#c7996d",y.lineWidth=3,y.stroke());const U=new tr(P);return U.colorSpace=Wt,z.set(_,U),U}const J=Array.from({length:5},(_,P)=>{const y=new g0(new wf({map:j(P===4?"thumbs-up":"hearts"),transparent:!0,depthWrite:!1,toneMapped:!1}));return y.name=`customer_reaction_${P}`,y.visible=!1,w.add(y),y}),B=new $t;B.name="offered_payment",B.visible=!1,gt.add(B);const de=new $t;de.name="accepted_payment_handover",de.visible=!1,gt.add(de);const we=new $t;we.name="change_tray_money",we.position.copy(d).add(new A(0,.018,0)),gt.add(we);const Se=new $t;Se.name="customer_change",Se.visible=!1,gt.add(Se);const De=new A(.061,-.015,.044),Ke=new $t;Ke.name="cashier_change_tray",Ke.position.copy(d);const et=new Vn(1,1,1),We=new en({color:c?13209200:2381132,roughness:c?.9:.7}),pt=new en({color:c?15916218:1588534,roughness:.95});for(const[_,P,y]of[[[.44,.018,.21],[0,0,0],We],[[.418,.002,.188],[0,.01,0],pt],[[.44,.023,.011],[0,.018,-.0995],We],[[.44,.023,.011],[0,.018,.0995],We],[[.011,.023,.188],[-.2145,.018,0],We],[[.011,.023,.188],[.2145,.018,0],We]]){const U=new Ct(et,y);U.scale.set(..._),U.position.set(...P),U.castShadow=!0,U.receiveShadow=!0,Ke.add(U)}gt.add(Ke);const Ye=new $t;Ye.name="takeaway_bag",Ye.position.copy($c);const Ot=new $t;Ot.name="packed_food",Ye.add(Ot);const bt=new en({color:13211745,roughness:.97}),Tt=new en({color:10384204,roughness:.95}),Je=new Vn(1,1,1);for(const[_,P,y]of[[[.44,.014,.27],[0,.007,0],bt],[[.44,.3,.008],[0,.15,.135],bt],[[.44,.3,.008],[0,.15,-.135],bt],[[.008,.3,.27],[-.22,.15,0],bt],[[.008,.3,.27],[.22,.15,0],bt],[[.448,.016,.014],[0,.296,.135],Tt],[[.448,.016,.014],[0,.296,-.135],Tt]]){const U=new Ct(Je,y);U.scale.set(..._),U.position.set(...P),U.castShadow=!0,U.receiveShadow=!0,Ye.add(U)}for(const _ of[-.1,.1]){const P=new Hl([new A(-.09,.285,_),new A(-.065,.41,_),new A(.065,.41,_),new A(.09,.285,_)]),y=new Ct(new Lo(P,20,.009,6,!1),Tt);y.castShadow=!0,Ye.add(y)}const Lt=document.createElement("canvas");Lt.width=384,Lt.height=192;const yt=new tr(Lt);yt.colorSpace=Wt;const mn=new Ct(new xa(.285,.1425),new Wn({map:yt,toneMapped:!1}));mn.position.set(0,.16,.141),Ye.add(mn),gt.add(Ye);const Mi=new A(.08,-.38,-.125);function ln(){const _=Lt.getContext("2d");_.fillStyle="#f8e9ca",_.fillRect(0,0,384,192),_.fillStyle="#755239",_.textAlign="center",_.font="bold 40px Arial",_.fillText("SUNNY BITES",192,72),_.font="32px Arial",_.fillText(Mt.size?`${Mt.size} ${Mt.size===1?"item":"items"} packed`:"Made with care",192,130),yt.needsUpdate=!0}function ds(){Me.delete("bag-handover"),Mt.clear(),Ot.clear(),gt.add(Ye),Ye.position.copy($c),Ye.quaternion.identity(),Ye.visible=!0,Ze="counter",ln()}function Ft(_){if(!_||Mt.has(_.lineId))return;const P=Mt.size;Ot.add(_.visual),_.visual.position.set(P%2?.1:-.1,.18+Math.floor(P/2)*.035,P<2?.035:-.045),_.visual.scale.setScalar(.55),_.visual.rotation.y=P%2?.12:-.12,_.group.visible=!1,Mt.set(_.lineId,_.productId),ln()}function un(){const _=be.get(Q%5);_!=null&&_.hand&&(_.hand.add(Ye),Ye.position.copy(Mi),Ye.quaternion.identity()),Ye.visible=!0,Ze="held",Et()}function Rn(){for(const U of ot.values())ue.has(U.lineId)&&(Me.delete(`item:${U.lineId}`),Ft(U));Yn.material.opacity=0,Ze="handover";const _=be.get(Q%5),P=Ye.position.clone(),y=Ye.quaternion.clone();if(te||document.hidden||f){un();return}vn("bag-handover",1450,U=>{var $;const G=dn(Math.max(0,(U*1450-650)/800));gt.updateMatrixWorld(!0);const le=_!=null&&_.hand?_.hand.localToWorld(Mi.clone()):Yr;Ye.position.lerpVectors(P,le,G),Ye.position.y+=Math.sin(G*Math.PI)*.16,Ye.quaternion.slerpQuaternions(y,(($=_==null?void 0:_.hand)==null?void 0:$.getWorldQuaternion(new tt))??y,G)},un)}ln();const rn=new Vn(.36,.16,.008),Zt=document.createElement("canvas");Zt.width=384,Zt.height=576;const Gt=Zt.getContext("2d");Gt.fillStyle="#fff8e8",Gt.fillRect(0,0,384,576),Gt.fillStyle="#614b3b",Gt.textAlign="center",Gt.font="bold 36px Arial",Gt.fillText(c?"SUNNY BITES":"SUNNY MARKET",192,62),Gt.font="24px Arial",Gt.fillText("YOUR RECEIPT",192,102),Gt.strokeStyle="#c7b99e",Gt.lineWidth=3;for(const _ of[139,206,246,286,326])Gt.beginPath(),Gt.moveTo(37,_),Gt.lineTo(347,_),Gt.stroke();Gt.font="bold 31px Arial",Gt.fillText("ORDER COMPLETE",192,185),Gt.font="bold 47px Arial",Gt.fillText("THANK YOU!",192,411),Gt.font="25px Arial",Gt.fillText("Have a lovely day",192,457);const oi=new tr(Zt);oi.colorSpace=Wt;const Iu=new Wn({map:oi,toneMapped:!1}),Ea=new en({color:16775400,roughness:.95}),Vt=new Ct(new Vn(.19,.27,.001),[Ea,Ea,Ea,Ea,Iu,Iu]);Vt.name="customer_receipt",Vt.visible=!1,Vt.castShadow=!0,gt.add(Vt);const Lu=new A(-.059,-.075,.038),Wo=new Wn({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}),Hi=new Ct(new Vn(.9,.84,.88),Wo);Hi.name="cash_register_touch_target",Hi.position.copy(Wc).add(new A(0,.34,.03)),gt.add(Hi);const wr=new en({color:15196099,roughness:.75});function $o(_){return Xn.find(P=>P.cents===_)??{cents:_,label:Ch(_),kind:_>=500?"note":"coin",color:_>=1e4?"#9bb99a":_>=5e3?"#e7c969":"#cbd2d7"}}const wa=document.createElement("canvas");wa.width=1024,wa.height=600;const Ns=new tr(wa);Ns.colorSpace=Wt,Ns.flipY=!1;const Aa=new Wn({map:Ns,toneMapped:!1});function Ra(_=Ue){var Ae,Le;const P=ze=>`$${(ze/100).toFixed(2)}`,y=_==null?void 0:_.order,U=(_==null?void 0:_.phase)??ce,G=(_==null?void 0:_.scanned)??[...ue],le=(Ae=y==null?void 0:y.items)==null?void 0:Ae.find(ze=>ze.lineId===G.at(-1));let $="READY TO SERVE",W="WELCOME",he=c?"PLEASE PLACE FOOD ON THE TRAY":"PLEASE PLACE ITEMS ON THE BELT";U==="scan"?($=le?le.name.toUpperCase():"SCANNER READY",W=le?P(le.priceCents):"SCAN ITEM",he=`${G.length} / ${((Le=y==null?void 0:y.items)==null?void 0:Le.length)??0} ITEMS SCANNED`):U==="total"?($="ALL ITEMS SCANNED",W="ENTER TOTAL",he="ADD THE PRICES ON YOUR RECEIPT"):U==="payment"?($="AMOUNT DUE",W=P((y==null?void 0:y.totalCents)??0),he=`CASH OFFERED ${P((y==null?void 0:y.paidCents)??0)}`):U==="drawer"?($="CASH RECEIVED",W=P((y==null?void 0:y.paidCents)??0),he="PRESS OPEN TO RELEASE CASH DRAWER"):U==="change"?($="COUNT THE CHANGE",W="?",he="CHOOSE NOTES AND COINS"):U==="success"?($="TRANSACTION APPROVED",W="THANK YOU",he="CHANGE & RECEIPT • NEXT CUSTOMER"):U==="finished"&&($="SHIFT ENDED",W="TIME’S UP",he="THANK YOU FOR BEING OUR CASHIER");const ge=JSON.stringify([$,W,he,U]);if(ge===je)return;je=ge,D=[$,W,he];const ae=wa.getContext("2d");ae.fillStyle=c?"#fff7e8":"#122624",ae.fillRect(0,0,1024,600),ae.fillStyle=c?"#efd5b5":"#1c3936",ae.fillRect(0,0,1024,85),ae.fillStyle=c?"#74513d":"#8bc6aa",ae.font="600 31px Arial",ae.textAlign="left",ae.fillText(c?"SUNNY BITES  |  HELLO, FRIEND!":"SUNNY  |  CHECKOUT 01",44,54),ae.fillStyle=c?"#8b9f73":"#68d5ae",ae.beginPath(),ae.arc(957,43,9,0,Math.PI*2),ae.fill(),ae.fillStyle=c?"#94745b":"#98b8af",ae.font="600 36px Arial",ae.fillText($,45,160,934),ae.fillStyle=c?"#644938":"#effff4",ae.font=W.length>9?"600 106px Arial":"600 133px Arial",ae.fillText(W,40,327),ae.fillStyle=c?"#e4cbaa":"#28463e",ae.fillRect(44,376,936,2),ae.fillStyle=c?"#84664d":"#b9dace",ae.font="500 29px Arial",ae.fillText(he,45,447),ae.fillStyle=c?"#9b8367":"#85a798",ae.font="25px Arial",ae.fillText(c?"A LITTLE CAFE     AUD PLAY MONEY":"TRAINING MODE     AUD     SECURE TILL",45,554),Ns.needsUpdate=!0,lt++,Et()}Ra();function rp(_){if(An.has(_))return An.get(_);const P=document.createElement("canvas");P.width=768,P.height=336;const y=P.getContext("2d"),U=$o(_).color;y.fillStyle=U,y.fillRect(0,0,P.width,P.height),y.strokeStyle="rgba(255,255,255,.6)",y.lineWidth=8,y.strokeRect(18,18,732,300),y.fillStyle="rgba(255,255,255,.22)",y.beginPath(),y.ellipse(175,174,113,123,0,0,Math.PI*2),y.fill(),y.fillStyle="#254737",y.textAlign="left",y.font="bold 32px Arial",y.fillText("SUNNY MARKET",42,66),y.font="bold 138px Arial",y.fillText(Ch(_),42,235),y.font="bold 30px Arial",y.fillText("PLAY MONEY · AUD",42,292),y.textAlign="right",y.font="bold 52px Arial",y.fillText("AU",716,88),y.font="62px Arial",y.fillText("✦",713,243);const G=new tr(P);G.colorSpace=Wt;const le=new en({map:G,roughness:.77});return An.set(_,le),le}function Xo(_){const P=rp(_),y=new Ct(rn,[wr,wr,wr,wr,P,P]);return y.castShadow=!0,y.userData.cents=_,y}function ap(_){if(!fn.has(_)){const U=$o(_),G={200:.04,100:.049,50:.061,20:.056,10:.046,5:.038}[_]??.045,le=new vu(G,G,.008,_===50?12:40),$=document.createElement("canvas");$.width=$.height=256;const W=$.getContext("2d");W.fillStyle=U.color,W.fillRect(0,0,256,256),W.strokeStyle=_>=100?"#8c712b":"#7e8b90",W.lineWidth=7,W.beginPath(),W.arc(128,128,110,0,Math.PI*2),W.stroke(),W.beginPath(),W.arc(128,128,98,0,Math.PI*2),W.lineWidth=2,W.stroke(),W.fillStyle=_>=100?"#53431a":"#354449",W.textAlign="center",W.font="bold 82px Arial",W.fillText(U.label,128,150),W.font="bold 24px Arial",W.fillText("AU · PLAY",128,188);const he=new tr($);he.colorSpace=Wt;const ge=new en({map:he,roughness:.65,metalness:.12}),ae=new en({color:U.color,roughness:.42,metalness:.5});fn.set(_,{geometry:le,face:ge,edge:ae,radius:G})}const P=fn.get(_),y=new Ct(P.geometry,[P.edge,P.face,P.face]);return y.castShadow=!0,y.userData.cents=_,y}function Ca(){we.clear(),qe=[]}function qo(){Me.delete("change-handover"),gt.add(Se),Se.clear(),Se.visible=!1,Se.position.set(0,0,0),Se.quaternion.identity(),Se.scale.setScalar(1),_e="none",ye=null,Ie=[]}function Yo(){if(!Ie.length)return;const _=be.get(Q%5);_!=null&&_.freeHand&&(_.freeHand.add(Se),Se.position.copy(De),Se.quaternion.identity()),Se.visible=!0,_e="held",Et()}function Du(_=!1){if(qo(),!qe.length)return;ye=Y,_e="handover";const P=be.get(Q%5);lp(P,_||te||document.hidden||f),gt.add(Se),Se.position.copy(we.position),Se.visible=!0;const y=[],U=Se.position.clone();let G=0,le=0;for(const{group:W,...he}of qe){const ge=he.kind==="note",ae=ge?G++:le++;Ie.push(he),W.updateMatrix();for(const[Ae,Le]of[...W.children].entries()){const ze=Le.position.clone().applyMatrix4(W.matrix);Se.add(Le),Le.position.copy(ze),y.push({mesh:Le,fromPosition:ze,fromQuaternion:Le.quaternion.clone(),fromScale:Le.scale.clone(),position:ge?new A(-.005+ae*.011+Ae*.003,.025+ae*.006,ae*.003+Ae*.0015):new A(.004+ae%3*.039+Ae*.003,-.044+Math.floor(ae/3)*.043,.02+Ae*.005),quaternion:new tt().setFromEuler(new Xt(ge?0:Math.PI/2,0,ge?(ae-1)*.08:0)),scale:ge?new A(.64,.64,.12):new A(.45,.45,.45)})}}Ca();const $=W=>{var ae;const he=dn(W);gt.updateMatrixWorld(!0);const ge=P!=null&&P.freeHand?P.freeHand.localToWorld(De.clone()):Yr.clone().add(new A(.5,0,0));Se.position.lerpVectors(U,ge,he),Se.position.y+=Math.sin(he*Math.PI)*.22,Se.quaternion.slerpQuaternions(new tt,((ae=P==null?void 0:P.freeHand)==null?void 0:ae.getWorldQuaternion(new tt))??new tt,he);for(const Ae of y)Ae.mesh.position.lerpVectors(Ae.fromPosition,Ae.position,he),Ae.mesh.quaternion.slerpQuaternions(Ae.fromQuaternion,Ae.quaternion,he),Ae.mesh.scale.lerpVectors(Ae.fromScale,Ae.scale,he)};_||te||document.hidden||f?($(1),Yo()):vn("change-handover",1100,$,Yo)}const Yn=new Ct(new xu(.1,.15,32),new Wn({color:8711363,transparent:!0,opacity:0,depthWrite:!1,side:Qn}));Yn.rotation.x=-Math.PI/2,Yn.position.copy(qr).add(new A(0,.018,0)),gt.add(Yn);const Vi=new Pf(new Vn(.009,.004,.69),new en({color:6648947,roughness:.95}),17);Vi.name="moving_conveyor_seams";const Ar=new zt;Vi.receiveShadow=!0,Vi.visible=!1,gt.add(Vi);function Ko(_=0){for(let P=0;P<17;P++)Ar.position.set(-2.95+(P*.155+_*.15)%2.635,1.029,-.1),Ar.rotation.set(0,0,0),Ar.scale.setScalar(1),Ar.updateMatrix(),Vi.setMatrixAt(P,Ar.matrix);Vi.instanceMatrix.needsUpdate=!0}Ko();const Rr=new M_,Nu=new He,op=new ns(new A(0,1,0),-1.09),jo=new A;function Et(){!h&&!f&&!m&&(m=requestAnimationFrame(cp))}function vn(_,P,y,U,G=0){if(Me.delete(_),te||f){y(1),U==null||U();return}Me.set(_,{start:performance.now()+G,duration:P,update:y,complete:U}),Et()}function Pa(_,P,y,U=700,G=0,le){const $=P.position.clone();vn(_,U,W=>{P.position.lerpVectors($,y,dn(W)),P.position.y+=Math.sin(W*Math.PI)*G},le)}function cp(_){var G;if(m=0,h||f)return;const P=me&&!te&&!document.hidden;if(_-p<30&&(Me.size||P||l.hasBelt&&(ce==="scan"||ce==="unload")&&!te)){Et();return}p=_;for(const[le,$]of[...Me]){if(_<$.start)continue;const W=Math.min(1,(_-$.start)/$.duration);$.update(W),W===1&&Me.get(le)===$&&(Me.delete(le),(G=$.complete)==null||G.call($))}const y=l.hasBelt&&g&&!te&&(ce==="unload"||ce==="scan"&&[...ot.values()].some(le=>le.group.visible));y&&Ko(_/1e3);const U=be.get(Q%5);P&&Gi(U,Jo(_)),U!=null&&U.arm&&ce==="unload"&&!te&&U.arm.quaternion.copy(U.armRest).multiply(new tt().setFromAxisAngle(new A(1,0,0),-.5-Math.sin(_/220)*.38)),u.render(gt,Jt),T++,(Me.size||y||P)&&Et()}function hs(){if(h)return;const _=Math.max(1,i.clientWidth),P=Math.max(1,i.clientHeight),y=_/P;u.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),u.setSize(_,P,!1),Jt.aspect=y,y<.92?(Jt.fov=71,Jt.position.set(-.22,2,3.35),Jt.lookAt(-.6,1.05,-.7)):(Jt.fov=60,Jt.position.set(0,1.9,2.65),Jt.lookAt(-.15,1.1,-.55)),Jt.updateProjectionMatrix(),Jt.updateMatrixWorld(),Et()}function Cr(_,P,y=420,U=0){var he;if(!(_!=null&&_.arm))return;const G=_.arm.quaternion.clone(),le=_.armRest.clone().multiply(new tt().setFromAxisAngle(new A(1,0,0),P)),$=(he=_.hand)==null?void 0:he.quaternion.clone(),W=_.handRest.clone().multiply(new tt().setFromAxisAngle(new A(1,0,0),U));vn(`arm:${_.index}`,y,ge=>{const ae=dn(ge);_.arm.quaternion.slerpQuaternions(G,le,ae),_.hand&&_.hand.quaternion.slerpQuaternions($,W,ae)})}function lp(_,P=!1){var he;if(!(_!=null&&_.freeArm)||!_.freeHand)return;const y=_.freeArm.quaternion.clone(),U=_.freeHand.quaternion.clone(),G=(he=_.freeForearm)==null?void 0:he.quaternion.clone(),le=_.freeArmRest.clone().multiply(new tt().setFromAxisAngle(new A(1,0,0),-1.15)),$=_.freeHandRest.clone().multiply(new tt().setFromAxisAngle(new A(1,0,0),1.15)),W=ge=>{_.freeArm.quaternion.slerpQuaternions(y,le,dn(ge)),_.freeHand.quaternion.slerpQuaternions(U,$,dn(ge)),_.freeForearm&&_.freeForearm.quaternion.slerpQuaternions(G,_.freeForearmRest,dn(ge))};P?W(1):vn(`change-arm:${_.index}`,520,W)}function up(_){const P=_.head??_.rig,y=new $t;y.name=`expression_${_.index}`,_.head&&(y.position.y=-_.head.position.y),P.add(y);const U=new en({color:c?4796449:3419175,roughness:.9}),G=new _u(c?.007:.0035,c?.065:.027,3,8),le=[-1,1].map(ct=>{const dt=new Ct(G,U);return dt.position.set(ct*(c?.112:.043),c?1.786:1.681,c?_.index===3?.332:.3:.113),dt.rotation.z=Math.PI/2,y.add(dt),dt}),$=new Ct(new cn,U);y.add($);const W=_.index===3?1.596:1.563,he=_.index===3?.409:.376,ge=new $t;ge.name=`talking_mouth_${_.index}`,ge.position.set(0,W-.017,he),ge.visible=!1,y.add(ge);const ae=new Ct(new na(1,18,12),new en({color:5319466,roughness:.95}));ae.scale.set(_.index===3?.029:.043,.027,.006),ge.add(ae);const Ae=new Ct(new na(1,16,10),new en({color:15507362,roughness:.92}));Ae.position.set(0,-.015,.005),Ae.scale.set(_.index===3?.017:.026,.01,.003),ge.add(Ae);const Le=new Ct(new Mu(1,.28,8,18),new en({color:13862018,roughness:.9}));Le.name=`kiss_mouth_${_.index}`,Le.position.set(0,W-.009,he+.006),Le.scale.set(.015,.018,.006),Le.visible=!1,y.add(Le),_.rig.updateWorldMatrix(!0,!0);const ze=_.rig.matrixWorld.clone().invert();_.rig.traverse(ct=>{var Nr,Ge,Qt,ci;if(!ct.isMesh||ct===$||le.includes(ct)||ct===ae||ct===Ae||ct===Le)return;if(!c&&((Ge=(Nr=ct.material)==null?void 0:Nr.name)!=null&&Ge.includes("Produce pine"))){ct.visible=!1;return}if(!c||((Qt=ct.material)==null?void 0:Qt.name)!=="Cozy / ink")return;const dt=ct.geometry.clone(),Dt=dt.attributes.position,Rt=((ci=dt.index)==null?void 0:ci.array)??Array.from({length:Dt.count},(Cn,Os)=>Os),Ln=new rt().multiplyMatrices(ze,ct.matrixWorld),Dn=[],kn=new A,bi=new A,qi=new A;for(let Cn=0;Cn<Rt.length;Cn+=3)kn.fromBufferAttribute(Dt,Rt[Cn]),bi.fromBufferAttribute(Dt,Rt[Cn+1]),qi.fromBufferAttribute(Dt,Rt[Cn+2]),kn.add(bi).add(qi).multiplyScalar(1/3).applyMatrix4(Ln),(kn.y>=1.595||Math.abs(kn.x)>.07)&&Dn.push(Rt[Cn],Rt[Cn+1],Rt[Cn+2]);dt.setIndex(Dn),ct.geometry=dt});const At=[];if(c){let ct;const dt=`Cozy / fur_${l.customerKinds[_.index]}`;_.rig.traverse(Dt=>{var Rt;((Rt=Dt.material)==null?void 0:Rt.name)===dt&&(ct=Dt.material)}),(_.index===2||_.index===3)&&(ct=new en({color:_.index===2?16769463:16773855,roughness:.98}));for(const Dt of[-1,1]){const Rt=new Ct(new na(1,14,10),ct??new en({color:13283468}));Rt.position.set(Dt*.112,1.73,_.index===3?.351:.312),Rt.scale.set(.026,.035,.009),Rt.visible=!1,y.add(Rt),At.push(Rt)}}return{group:y,brows:le,mouth:$,talkingMouth:ge,pucker:Le,lids:At,mood:null,smile:0,eyeClosure:0,mouthOpenness:0,facialPose:"emotion",reactionPose:null}}function Pr(_,P){if(_.expression){_.expression.currentEyeClosure=P;for(const y of _.expression.lids)y.visible=P>.1,y.scale.y=.035*P,y.position.y=1.765-.035*P}}function Ir(_,P){if(!(_!=null&&_.expression))return;const y=_.index===Q%5?q.direction:null,U=y?y==="too-high"?"total-high":"total-low":P,G=_.expression,le=qS[y]??Yc[P]??Yc.happy;if(G.mood!==U){G.mood=U,G.smile=le.smile;const ge=c?_.index===3?.052:.073:.03,ae=c?_.index===3?1.596:1.563:1.566,Ae=c?_.index===3?.404:.37:.115,Le=Array.from({length:17},(At,ct)=>{const dt=ct/8-1;return new A(dt*ge,ae+le.smile*(dt*dt-1)*(_.index===3&&c?.46:c?1:.45),Ae-Math.abs(dt)*(c?.012:.003))}),ze=new Lo(new Hl(Le),24,c?.005:.0026,6,!1);G.mouth.geometry.dispose(),G.mouth.geometry=ze}G.brows.forEach((ge,ae)=>{const Ae=ae?1:-1;ge.position.y=(c?1.786:1.681)+le.lift*(c?1:.5)+(c&&_.index===2&&ae===0?.014:0),ge.rotation.z=Math.PI/2-Ae*le.brow*(c&&_.index===2&&ae===0?1.55:1)});const $={calm:0,happy:0,restless:.3,impatient:.65,exhausted:1,relieved:.12,tired:.8}[P]??0,W=P==="happy"||P==="relieved",he=c?[[$*.14-(W?.028:0),0,0],[$*.04,0,$*.04],[$*.035,$*.055,W?-.06:.06+$*.09],[$*.09-(W?.045:0),0,-$*.025],[$*.035,-$*.035,W?.045:-$*.08]][_.index]:[$*.07,0,0];_.headRest.copy(_.headNeutral).multiply(new tt().setFromEuler(new Xt(...he))),_.head&&!Me.has(`animal:${_.index}`)&&!Me.has("wrong-change")&&!Me.has("wrong-total")&&_.head.quaternion.copy(_.headRest),_.ears.forEach((ge,ae)=>{const Ae=ae?1:-1,Le=_.index===1?$*.74-(W?.07:0):_.index===4?$*.34:$*.1;ge.rest.copy(ge.neutral).multiply(new tt().setFromEuler(new Xt($*(_.index===1?.18:.06),0,Ae*Le))),Me.has(`animal:${_.index}`)||ge.object.quaternion.copy(ge.rest)}),G.eyeClosure=_.index===4&&c?$*.86:0,Pr(_,G.eyeClosure),y&&(G.reactionPose=y==="too-high"?"surprised":"concerned"),Gi(_,me&&_.index===Q%5?G.mouthOpenness||.45:0);for(const ge of _.bodyRestScales)ge.object.scale.copy(ge.scale).multiply(new A(1+$*.004,1-$*(_.index===0?.017:.01),1))}function Gi(_,P){if(!(_!=null&&_.expression))return;const y=_.expression,U=me&&_.index===Q%5;y.mouthOpenness=U?ts.clamp(P,.12,1):0,y.pucker.visible=y.reactionPose==="kiss"&&(!U||y.mouthOpenness<.3),y.talkingMouth.visible=U&&!y.pucker.visible,y.talkingMouth.scale.y=.3+y.mouthOpenness*.78,y.talkingMouth.scale.x=.85+y.mouthOpenness*.15,y.mouth.visible=!U&&!y.pucker.visible,y.facialPose=y.pucker.visible?"kiss":U?"talking":y.reactionPose??"emotion"}function Jo(_){const P=_-Ve,y=(Math.sin(P*.024)+Math.sin(P*.041+.7)*.35+1.35)/2.7,U=st?Math.max(0,1-(_-st)/150)*.22:0;return ts.clamp(.13+y*.72+U,.12,1)}function fs(_={}){if(h)return;const P=!!_.active&&!f&&!document.hidden&&Y&&ce!=="finished";if(!(P&&l.customerKinds.includes(_.character)&&_.character!==l.customerKinds[Q%5])){if(!P){me=!1,clearTimeout(ft),ft=null;for(const y of be.values())Gi(y,0);Et();return}me||(Ve=performance.now(),st=0,_t=0,St=0,clearTimeout(ft),ft=setTimeout(()=>fs({active:!1}),15e3)),me=!0,Number.isFinite(_.boundary)&&_.boundary>St&&(St=_.boundary,st=performance.now(),_t++),Gi(be.get(Q%5),te?.45:Jo(performance.now())),Et()}}function Si(_="none"){clearTimeout(K),K=null,Me.delete("customer-reaction");for(const P of J)P.visible=!1;for(const P of be.values())P.expression&&(P.expression.reactionPose=P.index===Q%5&&q.direction?q.direction==="too-high"?"surprised":"concerned":null,P.expression.mouth.scale.set(1,1,1),P.expression.mouth.position.set(0,0,0),Pr(P,P.expression.eyeClosure),Gi(P,P.expression.mouthOpenness));se.status=_,_==="none"&&(se={kind:null,status:_,symbolKinds:[],startedAt:0})}function Uu(_=pe==="tired"||pe==="exhausted"?"smile":KS[Q%5],P=0){if(h||!Y||!["smile","kiss","hearts","thumbs-up"].includes(_))return;Si();const y=be.get(Q%5);if(!(y!=null&&y.expression)||!y.group.visible)return;if(document.hidden||f){se.status="complete";return}const U=te,G=_==="kiss"||_==="hearts"?["hearts"]:_==="thumbs-up"?["thumbs-up"]:[];se={kind:_,status:U?"static":"playing",symbolKinds:G,startedAt:performance.now()};const le=G.length?J.filter((he,ge)=>G[0]==="thumbs-up"?ge===4:ge<3):[],$=new A;U?(y.expression.reactionPose=_==="kiss"?"kiss":"smile",Gi(y,y.expression.mouthOpenness),K=setTimeout(()=>{Si("complete"),Et()},1400),Et()):vn("customer-reaction",1400,he=>{const ge=Math.sin(Math.PI*he);if(y.expression.reactionPose=_==="kiss"&&he>.12&&he<.65?"kiss":"smile",y.expression.mouth.scale.x=1+ge*(y.index===0?.22:.12),y.expression.mouth.position.y=-ge*.005,!me){const ae=_==="kiss"?ge**2*.95:y.index===2?ge**2*.8:y.index===3?ge*.22:ge*.45;Pr(y,Math.max(y.expression.eyeClosure,ae)),y.index===2&&y.expression.lids[1]&&(y.expression.lids[1].visible=!1)}Gi(y,y.expression.mouthOpenness),y.group.updateWorldMatrix(!0,!1),y.group.localToWorld($.set(0,1.96,.36)),le.forEach((ae,Ae)=>{const Le=ts.clamp((he-Ae*.1)/.8,0,1);ae.visible=Le>0&&Le<1,ae.position.copy($).add(new A(G[0]==="thumbs-up"?.25:(Ae-1)*.17+Math.sin(Le*Math.PI)*(Ae%2?.045:-.045),Le*.34,0)),ae.material.opacity=Math.min(1,Le*5,(1-Le)*4),ae.material.rotation=Math.sin(Le*Math.PI*2+Ae)*.14,ae.scale.setScalar((G[0]==="thumbs-up"?.27:.15+Ae*.025)*(.75+Math.sin(Le*Math.PI)*.25))})},()=>Si("complete"),P),Et()}function Ia(_,P=!1){var U;if(h||!Object.hasOwn(Yc,_))return;const y=be.get(Q%5);pe===_&&((U=y==null?void 0:y.expression)==null?void 0:U.mood)===_||(In(),pe=_,Ir(y,_),!P&&!["success","finished"].includes(ce)&&Dr(Object.hasOwn(qc,_)?_:"calm"),pn(),Et())}function Us(_){var U;if(!_)return;const P=`animal:${_.index}`,y=Me.get(P);y&&(y.update(1),(U=y.complete)==null||U.call(y),Me.delete(P))}function Ou(_,P){if(!c||!_)return;In(),Us(_),Me.delete(`patience:${_.index}`);const y=P==="greeting"?"greetingStatus":"thanksStatus",U=te||document.hidden||f;_[y]=U?"static":"playing";const G=_.rigRestPosition.y,le=$=>{const W=Math.sin(Math.PI*$),he=Math.sin($*Math.PI*5)*W;_.rig.position.y=G+W*W*(P==="greeting"?.035:pe==="tired"?.012:pe==="relieved"?.035:.085),P==="greeting"&&_.freeArm&&_.freeArm.quaternion.copy(_.freeArmRest).multiply(new tt().setFromEuler(new Xt(-.95*W,0,.12*W+.1*he))),P==="greeting"&&_.freeForearm&&_.freeForearm.quaternion.copy(_.freeForearmRest).multiply(new tt().setFromAxisAngle(new A(1,0,0),-.85*W)),_.head&&_.head.quaternion.copy(_.headRest).multiply(new tt().setFromEuler(new Xt((P==="thanks"?.18:.05)*W,0,P==="greeting"?.05*he:0)));for(const[ge,ae]of _.ears.entries())ae.object.quaternion.copy(ae.rest).multiply(new tt().setFromAxisAngle(new A(0,0,1),he*(ge?-.16:.16)));if($===1){_.rig.position.copy(_.rigRestPosition),P==="greeting"&&_.freeArm&&_.freeArm.quaternion.copy(_.freeArmRest),P==="greeting"&&_.freeForearm&&_.freeForearm.quaternion.copy(_.freeForearmRest),_.head&&_.head.quaternion.copy(_.headRest);for(const ge of _.ears)ge.object.quaternion.copy(ge.rest)}};U?le(1):vn(`animal:${_.index}`,P==="greeting"?1e3:740,le,()=>{_[y]="complete"}),Et()}function La(_){var ae,Ae,Le,ze;if(h)return;if(In(),Me.delete("wrong-change"),(ae=ie.restore)==null||ae.call(ie),ie={direction:null,status:"none",restore:null},!_||ce!=="change"){pn(),Et();return}const P=["too-little","under","low"].includes(_)?"too-little":["too-much","over","high"].includes(_)?"too-much":null,y=be.get(Q%5);if(!P||!y)return;Us(y);const U=Me.get(`patience:${y.index}`);U==null||U.update(1),Me.delete(`patience:${y.index}`);const G=(Ae=y.head)==null?void 0:Ae.quaternion.clone(),le=(Le=y.freeArm)==null?void 0:Le.quaternion.clone(),$=(ze=y.freeForearm)==null?void 0:ze.quaternion.clone(),W=()=>{G&&y.head.quaternion.copy(G),le&&y.freeArm.quaternion.copy(le),$&&y.freeForearm.quaternion.copy($)},he=te||document.hidden||f;ie={direction:P,status:he?"static":"playing",restore:W};const ge=At=>{const ct=Math.sin(Math.PI*At);G&&y.head.quaternion.copy(G).multiply(new tt().setFromEuler(new Xt(0,Math.sin(At*Math.PI*6)*ct*.13,0))),le&&y.freeArm.quaternion.copy(le).multiply(new tt().setFromEuler(new Xt(-.34*ct,0,.12*ct))),$&&y.freeForearm.quaternion.copy($).multiply(new tt().setFromAxisAngle(new A(1,0,0),-.35*ct)),At===1&&W()};he?ge(.5):vn("wrong-change",1e3,ge,()=>{ie.status="complete"}),pn(),Et()}function Lr(_){var ae,Ae,Le,ze;if(h)return;const P=["too-high","too-low"].includes(_)?_:null;if(!q.direction&&(!P||ce!=="total"))return;In(),Me.delete("wrong-total"),(ae=q.restore)==null||ae.call(q),q={direction:null,status:"none",restore:null};const y=be.get(Q%5);if(y!=null&&y.expression&&(y.expression.reactionPose=null),Ir(y,pe),!P||ce!=="total"||!y){pn(),Et();return}Si(),Us(y);const U=Me.get(`patience:${y.index}`);U==null||U.update(1),Me.delete(`patience:${y.index}`),q.direction=P,Ir(y,pe);const G=(Ae=y.head)==null?void 0:Ae.quaternion.clone(),le=(Le=y.freeArm)==null?void 0:Le.quaternion.clone(),$=(ze=y.freeForearm)==null?void 0:ze.quaternion.clone(),W=()=>{G&&y.head.quaternion.copy(y.headRest),le&&y.freeArm.quaternion.copy(le),$&&y.freeForearm.quaternion.copy($)},he=te||document.hidden||f;q={direction:P,status:he?"static":"playing",restore:he?null:W},he||vn("wrong-total",1e3,At=>{const ct=Math.sin(Math.PI*At);G&&y.head.quaternion.copy(G).multiply(new tt().setFromEuler(new Xt(0,Math.sin(At*Math.PI*6)*ct*.13,(P==="too-low"?.055:-.035)*ct))),le&&y.freeArm.quaternion.copy(le).multiply(new tt().setFromEuler(new Xt(-.34*ct,0,.12*ct))),$&&y.freeForearm.quaternion.copy($).multiply(new tt().setFromAxisAngle(new A(1,0,0),-.35*ct)),At===1&&W()},()=>{q.status="complete",q.restore=null}),pn(),Et()}function Dr(_,P=!1){var Le;if(h)return;const y=Object.hasOwn(qc,_)&&!["success","finished"].includes(ce)?_:"calm";if(["success","finished"].includes(ce)||Ia(y==="calm"?"happy":y,!0),y===Fe)return;La(null);const U=Me.get("wrong-total");U==null||U.update(1),(Le=U==null?void 0:U.complete)==null||Le.call(U),Me.delete("wrong-total"),Fe=y;const G=be.get(Q%5);if(!(G!=null&&G.freeArm)||!G.freeForearm)return;Us(G);const le=qc[y],$=ze=>({arm:G.freeArmRest.clone().multiply(new tt().setFromEuler(new Xt(ze[0]*(c&&G.index===3?.72:1),0,ze[1]+(c&&G.index===3?Math.abs(ze[0])*.9:c&&G.index===2?ze[1]:0)))),forearm:G.freeForearmRest.clone().multiply(new tt().setFromAxisAngle(new A(1,0,0),ze[2]*(c&&G.index===4?.55:1)))}),W={arm:G.freeArm.quaternion.clone(),forearm:G.freeForearm.quaternion.clone()},he=$(le.peak),ge=$(le.settled),ae=`patience:${G.index}`,Ae=(ze,At,ct)=>{G.freeArm.quaternion.slerpQuaternions(ze.arm,At.arm,ct),G.freeForearm.quaternion.slerpQuaternions(ze.forearm,At.forearm,ct)};Me.delete(ae),P||te||document.hidden||f?Ae(ge,ge,1):vn(ae,le.duration,ze=>{y==="calm"?Ae(W,ge,dn(ze)):ze<.42?Ae(W,he,dn(ze/.42)):ze<.6?Ae(he,he,1):Ae(he,ge,dn((ze-.6)/.4))}),Et()}function Fu(){var _;if(!document.hidden){pn();return}fs({active:!1}),Si("complete"),In();for(const[P,y]of Me)!P.startsWith("patience:")&&!P.startsWith("animal:")&&P!=="wrong-change"&&P!=="wrong-total"||(y.update(1),(_=y.complete)==null||_.call(y),Me.delete(P))}function dp(_,P){In(),fs({active:!1}),Si(),Ee=null,Oe=!1;const y=new Map;y.set(_%5,GS);for(let U=1;U<=2;U++)y.set((_+U)%5,WS[U-1]);for(const[U,G]of be){Me.delete(`person:${U}`),Me.delete(`depart:${U}`),Me.delete(`patience:${U}`),Me.delete(`arm:${U}`),Me.delete(`change-arm:${U}`),Us(G),G.greetingStatus="none",G.thanksStatus="none",Ir(G,"happy"),G.rig.position.copy(G.rigRestPosition),G.freeArm&&G.freeArm.quaternion.copy(G.freeArmRest),G.freeForearm&&G.freeForearm.quaternion.copy(G.freeForearmRest),G.group.rotation.set(0,0,0);const le=y.get(U);if(!le){G.group.visible=!1;continue}const $=G.group.visible;G.group.visible=!0,P&&$?Pa(`person:${U}`,G.group,le,900,0):G.group.position.copy(le),G.arm&&G.arm.quaternion.copy(G.armRest),G.hand&&G.hand.quaternion.copy(G.handRest),G.freeHand&&G.freeHand.quaternion.copy(G.freeHandRest)}}function hp(_=1850){if(Ee===Q)return;Ee=Q;const P=be.get(Q%5);if(!P)return;if(te||document.hidden||f){P.group.visible=!1,F="departed",Ze="departed",ye&&(_e="departed");return}const y=P.group.position.clone(),U=P.group.rotation.y,G=Xc.clone().sub(y).setY(0).normalize(),le=Math.atan2(G.x,G.z);vn(`depart:${P.index}`,_,$=>{const W=Math.max(0,($-.2)/.8);Oe=W>0,P.group.rotation.y=ts.lerp(U,le,dn(Math.min(1,$/.2))),P.group.position.lerpVectors(y,Xc,dn(W)),W>0&&(P.group.position.y+=Math.sin(W*Math.PI*10)*.012)},()=>{P.group.visible=!1,F="departed",Ze="departed",ye&&(_e="departed")})}function Zo(){clearTimeout(ee),ee=null,Me.delete("receipt-handover"),gt.add(Vt),Vt.visible=!1,Vt.position.set(0,0,0),Vt.quaternion.identity(),M&&(M.visible=!1,M.position.copy(N)),F="none",V=null,ne=null,Z=0}function Da(){const _=be.get(Q%5);M&&(M.visible=!1),_!=null&&_.hand?(_.hand.add(Vt),Vt.position.copy(Lu),Vt.quaternion.identity(),V="customer"):(gt.add(Vt),Vt.position.copy(Yr),V="cashier"),Vt.visible=!0,F="held",Et()}function Bu(_=1550,P=1850){clearTimeout(ee);const y=Y;ee=setTimeout(()=>{var U;if(ee=null,!(h||ce!=="success"||Y!==y||ne!==y)){for(const G of["receipt-handover","change-handover","bag-handover"])(U=Me.get(G))==null||U.update(1),Me.delete(G);Da(),Yo(),un(),hp(P),Et()}},Math.max(0,_))}function fp(){Zo(),ne=Y,Z=performance.now(),F="printing",V="printer";const _=be.get(Q%5),P=te||document.hidden||f;Cr(_,-1.15,520,1.15),M&&(M.visible=!0,M.position.copy(N)),gt.updateMatrixWorld(!0);const y=M?new Fn().setFromObject(M).getCenter(new A):Wc.clone().add(new A(-.245,.34,.139)),U=new tt().setFromEuler(new Xt(-.16,0,-.07));P?Da():vn("receipt-handover",1450,G=>{const le=G*1450;if(le<650){M&&M.position.copy(N).add(new A(0,-.055*(1-le/650),0));return}M&&(M.visible=!1),Vt.visible=!0,F="handover",V="cashier";const $=dn((le-650)/800);gt.updateMatrixWorld(!0);const W=_!=null&&_.hand?_.hand.localToWorld(Lu.clone()):Yr,he=_!=null&&_.hand?_.hand.getWorldQuaternion(new tt):new tt;Vt.position.lerpVectors(y,W,$),Vt.position.y+=Math.sin($*Math.PI)*.2,Vt.quaternion.slerpQuaternions(U,he,$)},Da),Bu()}function ku(){for(const _ of ot.values())Ls.remove(_.group),_.hit.geometry.dispose();ot.clear();for(const _ of[...Me.keys()])(_.startsWith("item:")||_.startsWith("unload:"))&&Me.delete(_);k=null,oe=null,kt.style.cursor="default"}function Na(){if(!(Re||h||ce!=="unload")){Re=!0,it=!1,clearTimeout(Be),Be=null;for(const _ of ot.values())Me.delete(`unload:${_.lineId}`),_.group.position.copy(_.home),_.group.visible=!ue.has(_.lineId);Cr(be.get(Q%5),0),Et(),r==null||r()}}function pp(){clearTimeout(Be),Be=null,it=!1;for(const _ of ot.values())Me.delete(`unload:${_.lineId}`),_.group.position.copy(_.home),_.group.visible=!ue.has(_.lineId);Cr(be.get(Q%5),0)}function Ua(_,P,y,U,G,le=!0){clearTimeout(Be),Be=null,Zo(),qo(),ds(),La(null),Lr(null),Me.delete("change-handover"),Y=_,Fe="calm",pe="happy",Q=Number.isInteger(y)?y:0,ue=new Set(P),Re=!1,it=U,Ce="",B.visible=!1,gt.add(B),de.visible=!1,de.clear(),Me.delete("accepted-payment"),Ca(),ku(),dp(Q,G);const $=Array.isArray(_)?_:(_==null?void 0:_.items)??[];$.forEach((W,he)=>{const ge=ke.get(W.productId??W.product??W.type);if(!ge)return;const ae=W.lineId??W.id??String(he),Ae=ge.clone(!0);Ae.position.set(0,0,0),Ae.updateMatrixWorld(!0);const Le=new Fn().setFromObject(Ae),ze=Le.getCenter(new A);Ae.position.sub(new A(ze.x,Le.min.y,ze.z));const At=new $t;At.add(Ae);const ct={apple:.44,orange:.44,milk:.46,bread:.55,bananas:.55,eggs:.55};At.scale.setScalar(c?1:ct[W.productId]??.5);const dt=new $t;dt.name=`order_${ae}`,dt.userData.lineId=ae,dt.add(At);const Dt=Le.getSize(new A).multiplyScalar(At.scale.x),Rt=new Ct(new Vn(Dt.x+.055,Dt.y+.04,Dt.z+.055),Wo);Rt.position.y=Dt.y/2,Rt.name=`touch_target_${ae}`,dt.add(Rt);const Ln=new A(-.64-he*.5,1.038,-.08+he%2*.1);if(dt.rotation.y=he%2?.1:-.12,dt.position.copy(Ln),dt.visible=!ue.has(ae),Ls.add(dt),ot.set(ae,{lineId:ae,productId:W.productId,group:dt,visual:At,home:Ln,hit:Rt}),ue.has(ae)&&Ft(ot.get(ae)),U&&!ue.has(ae)&&!te&&!f&&g){dt.visible=!1;const Dn=new A(-.4,1.15,-.67),kn=c?Ln.clone():Ln.clone().add(new A(-.38,0,0));vn(`unload:${ae}`,1e3,bi=>{if(dt.visible=!0,bi<.56){const qi=dn(bi/.56);dt.position.lerpVectors(Dn,kn,qi),dt.position.y+=Math.sin(qi*Math.PI)*.38}else dt.position.lerpVectors(kn,Ln,dn((bi-.56)/.44))},void 0,he*220)}}),U&&(le&&Ou(be.get(Q%5),"greeting"),te||!g||f||v?queueMicrotask(Na):Be=setTimeout(Na,Math.max(0,$.length-1)*220+1080)),Et()}function mp(_,P=[],y=0){ce="scan",Ua(_,P,y,!1,Y!==null&&y>Q),Oa(_),Ra({order:_,scanned:P,phase:ce})}function zu(_=[]){const P=new Set(_);if([...ue].some(y=>!P.has(y))){Ua(Y,_,Q,!1,!1);return}for(const[y,U]of ot){if(!P.has(y)||ue.has(y))continue;k===y&&Ba(null),Me.delete(`unload:${y}`);const G=U.group.position.clone();U.group.scale.setScalar(1),vn(`item:${y}`,850,le=>{if(le<.52){const $=dn(le/.52);U.group.position.lerpVectors(G,qr,$),U.group.position.y+=Math.sin($*Math.PI)*.14,Yn.material.opacity=Math.sin($*Math.PI)*.85}else{const $=dn((le-.52)/.48);U.group.position.lerpVectors(qr,$c.clone().add(new A(0,.32,0)),$),U.group.position.y+=Math.sin($*Math.PI)*.38,U.group.scale.setScalar(1-$*.38),Yn.material.opacity=0}},()=>{Ft(U),Yn.material.opacity=0})}ue=P,Ra({...Ue,order:Y,scanned:_,phase:ce}),Et()}function gp(){if(!b)return;b.updateWorldMatrix(!0,!0);const _=b.matrixWorld.clone().invert(),P=new A,y=new A,U=new A;b.traverse(G=>{var ae;if(!G.isMesh||!((ae=G.geometry)!=null&&ae.attributes.position))return;const le=G.geometry,$=le.attributes.position;le.index||le.setIndex(Array.from({length:$.count},(Ae,Le)=>Le));const W=le.index.array.slice(),he=new Uint16Array(W.length/3),ge=new rt().multiplyMatrices(_,G.matrixWorld);for(let Ae=0;Ae<W.length;Ae+=3){P.fromBufferAttribute($,W[Ae]),y.fromBufferAttribute($,W[Ae+1]),U.fromBufferAttribute($,W[Ae+2]),P.add(y).add(U).multiplyScalar(1/3).applyMatrix4(ge);const Le=P.z<.04?$S:XS,[ze]=Le.reduce((At,ct)=>Math.abs(P.x-ct[1])<Math.abs(P.x-At[1])?ct:At);he[Ae/3]=ze,re.set(ze,(re.get(ze)??0)+1)}X.push({geometry:le,indices:W,triangleDenominations:he})}),Ht="",Oa()}function Oa(_=Ue??Y){I=ra(_).map(U=>U.cents),S=ko(_).map(U=>U.cents);const P=I.join(",");if(P===Ht)return;Ht=P;const y=new Set(I);fe.clear();for(const{geometry:U,indices:G,triangleDenominations:le}of X){const $=U.index.array;let W=0;for(let he=0;he<le.length;he++){if(!y.has(le[he]))continue;const ge=he*3;$[W++]=G[ge],$[W++]=G[ge+1],$[W++]=G[ge+2];const ae=le[he];fe.set(ae,(fe.get(ae)??0)+1)}U.index.needsUpdate=!0,U.setDrawRange(0,W)}}function ps(_){if(Oa(),at=_,b&&(b.visible=_),!Qe||!Ne)return;const P=Ne.clone().add(new A(0,0,_?Yt:0));if(Qe.position.distanceToSquared(P)<1e-6){Me.delete("drawer"),Qe.position.copy(P);return}Pa("drawer",Qe,P,470)}function Fa(_=[]){const P=new Map;for(const $ of _)P.set($,(P.get($)??0)+1);const y=[...P].sort(($,W)=>W[0]-$[0]),U=y.map(([$,W])=>`${$}:${W}`).join(",");if(Ce===U&&(!_.length||we.children.length))return;Ce=U,Ca(),we.position.copy(d).add(new A(0,.018,0)),we.scale.setScalar(1);let G=0,le=0;y.forEach(([$,W])=>{const he=$o($),ge=new $t;ge.name=`selected_${$}_x${W}`,he.kind==="note"?(ge.position.set(-.097+G*.009,G*.006,-.025+G*.013),G++):(ge.position.set(.061+le%3*.05,0,-.047+Math.floor(le/3)*.08),le++);const ae=Math.min(W,3);for(let Ae=0;Ae<ae;Ae++){const Le=he.kind==="note"?Xo($):ap($);he.kind==="note"?(Le.rotation.x=-Math.PI/2,Le.scale.set(.4,.4,.09),Le.position.set(Ae*.004,.001+Ae*.0018,Ae*-.004)):(Le.scale.setScalar(.34),Le.position.set(Ae*.002,.0015+Ae*.003,Ae*-.002)),ge.add(Le)}we.add(ge),qe.push({cents:$,count:W,totalCents:$*W,label:he.label,kind:he.kind,color:he.color,representativeCount:ae,group:ge})})}function Hu(){Us(be.get(Q%5)),B.clear();const _=Xo((Y==null?void 0:Y.paidCents)??1e3);_.userData.action="accept-payment",B.add(_),B.visible=!0,B.scale.set(.28/.36,.12/.16,.001/.008);const P=be.get(Q%5);P!=null&&P.hand?(P.hand.add(B),B.rotation.set(0,0,0),B.position.set(-.104,-.022,.038)):(gt.add(B),B.rotation.set(-.25,.1,-.1),B.position.copy(Yr)),Cr(P,-1.15,550,1.15)}function _p(){de.clear(),B.visible&&(de.add(Xo((Y==null?void 0:Y.paidCents)??1e3)),B.getWorldPosition(de.position),B.getWorldQuaternion(de.quaternion),B.getWorldScale(de.scale),de.visible=!0,Pa("accepted-payment",de,new A(.65,1.08,.65),550,.14,()=>{de.visible=!1})),B.visible=!1,Cr(be.get(Q%5),-.1)}function vp(_){var le;if(h||!_)return;Ue=_,Oa(_);const P=ce,y=Y!==_.order,U=y&&Y!==null&&_.round>Q;(y||P!==_.phase)&&In(),ce=_.phase,y?(Ua(_.order,_.scanned??[],_.round??0,ce==="unload",U),ps(ce==="change")):(P==="unload"&&ce!=="unload"&&pp(),zu(_.scanned??[])),ce==="payment"&&(P!=="payment"||y)&&Hu(),ce==="drawer"&&(P!=="drawer"||y)&&(ps(!1),_p()),ce==="change"&&(Fa(_.selectedMoney??[]),(P!=="change"||y)&&ps(!0)),ce!=="change"&&ie.direction&&La(null);const G=ce==="total"&&["too-high","too-low"].includes((le=_.feedback)==null?void 0:le.totalDirection)?_.feedback.totalDirection:null;if(G!==q.direction&&Lr(G),ce==="success"&&(P!=="success"||y)){const $=Fe==="exhausted"?"tired":Fe==="calm"?"happy":"relieved";Dr("calm"),Ia($),ps(!1),Ou(be.get(Q%5),"thanks"),Uu(void 0,650),Fa(_.selectedMoney??[]),Du(),fp(),Rn()}ce!=="payment"&&(B.visible=!1),["change","success"].includes(ce)||Ca(),!["change"].includes(ce)&&at&&ps(!1),ce==="finished"&&(fs({active:!1}),Si(),Dr("calm"),ps(!1),B.visible=!1,Zo(),qo(),Me.delete("bag-handover"),Ye.visible=!1),Ra(_),pn(),Et()}function yp(){Et()}function Vu(_){const P=kt.getBoundingClientRect();Nu.set((_.clientX-P.left)/P.width*2-1,-((_.clientY-P.top)/P.height)*2+1),Rr.setFromCamera(Nu,Jt),gt.updateMatrixWorld(!0)}function Qo(_){if(!g||f)return null;if(Vu(_),ce==="payment"&&B.visible&&Rr.intersectObject(B,!0).length)return{action:"payment"};if(ce==="drawer"&&Qe&&Rr.intersectObject(Hi,!1).length)return{action:"drawer"};if(ce!=="scan")return null;const P=[...ot.values()].filter(G=>G.group.visible&&!ue.has(G.lineId)).map(G=>G.group),y=Rr.intersectObjects(P,!0)[0];let U=y==null?void 0:y.object;for(;U&&U.userData.lineId===void 0;)U=U.parent;return U?{action:"scan",lineId:U.userData.lineId}:null}function Ba(_){if(k===_)return;const P=ot.get(k);P&&!Me.has(`item:${k}`)&&P.group.scale.setScalar(1),k=_,!te&&ot.has(_)&&ot.get(_).group.scale.setScalar(1.04),Et()}function xp(_){var y;const P=Qo(_);oe=P?{...P,x:_.clientX,y:_.clientY,dragging:!1}:null,(oe==null?void 0:oe.action)==="scan"&&((y=kt.setPointerCapture)==null||y.call(kt,_.pointerId))}function Mp(_){if((oe==null?void 0:oe.action)==="scan"&&ce==="scan"&&(Math.hypot(_.clientX-oe.x,_.clientY-oe.y)>8&&(oe.dragging=!0),oe.dragging)){Vu(_);const y=ot.get(oe.lineId);y&&Rr.ray.intersectPlane(op,jo)&&(y.group.position.set(ts.clamp(jo.x,-2.9,1.1),1.085,ts.clamp(jo.z,-.5,.6)),Yn.material.opacity=y.group.position.distanceTo(qr)<.43?.9:.28,Et());return}const P=Qo(_);Ba((P==null?void 0:P.lineId)??null),kt.style.cursor=P?"pointer":"default"}function Sp(_){var y;const P=oe;if(oe=null,!!P){if((y=kt.releasePointerCapture)==null||y.call(kt,_.pointerId),Yn.material.opacity=0,P.action==="scan"&&P.dragging){const U=ot.get(P.lineId);(U==null?void 0:U.group.position.distanceTo(qr))<.43?t==null||t(P.lineId):U&&Pa(`item:${P.lineId}`,U.group,U.home,270)}else if(Math.hypot(_.clientX-P.x,_.clientY-P.y)<10){const U=Qo(_);(U==null?void 0:U.action)==="payment"&&P.action==="payment"&&(a==null||a()),(U==null?void 0:U.action)==="drawer"&&P.action==="drawer"&&(o==null||o()),(U==null?void 0:U.action)==="scan"&&U.lineId===P.lineId&&(t==null||t(P.lineId))}Et()}}function bp(){if(oe!=null&&oe.lineId){const _=ot.get(oe.lineId);_&&!ue.has(_.lineId)&&_.group.position.copy(_.home)}oe=null,Yn.material.opacity=0,Et()}function Tp(){oe||Ba(null)}function Ep(_){_.preventDefault(),f=!0,fs({active:!1}),Si("complete"),In(),m&&cancelAnimationFrame(m),m=0,kt.dataset.ready="false",s==null||s(new Error("The 3D view paused. Cashier controls still work while it reconnects.")),ce==="unload"&&queueMicrotask(Na)}function wp(){if(h)return;f=!1,Me.clear();const _=Y,P=[...ue],y=Q,U=ce,G=Fe,le=pe,$=q.direction,W=be.get(y%5),he=W==null?void 0:W.greetingStatus,ge=W==null?void 0:W.thanksStatus,ae=Z?performance.now()-Z:0,Ae=W==null?void 0:W.group.position.clone(),Le=W==null?void 0:W.group.rotation.clone(),ze=W==null?void 0:W.group.visible,At=ne===Y&&F!=="none";_&&Ua(_,P,y,U==="unload",!1,!1),W&&(W.greetingStatus=he==="playing"?"complete":he,W.thanksStatus=ge==="playing"?"complete":ge),ce=U,Dr(G,!0),Ia(le,!0),ce==="total"&&$&&Lr($),ce==="payment"&&Hu(),ce==="change"&&Fa((Ue==null?void 0:Ue.selectedMoney)??[]),ps(ce==="change"),ce==="success"&&At&&(ne=_,Z=performance.now()-ae,W!=null&&W.arm&&W.arm.quaternion.copy(W.armRest).multiply(new tt().setFromAxisAngle(new A(1,0,0),-1.15)),W!=null&&W.hand&&W.hand.quaternion.copy(W.handRest).multiply(new tt().setFromAxisAngle(new A(1,0,0),1.15)),Da(),un(),Fa((Ue==null?void 0:Ue.selectedMoney)??[]),Du(!0),W&&Ae&&(W.group.position.copy(Ae),W.group.rotation.copy(Le),W.group.visible=ze&&ae<3400),!(W!=null&&W.group.visible)||ae>=3400?(F="departed",Ze="departed",ye&&(_e="departed")):Bu(Math.max(0,1550-ae),Math.max(1,3400-Math.max(1550,ae)))),Ns.needsUpdate=!0,hs(),kt.dataset.ready=String(g),g&&!v&&(n==null||n({recovered:!0,...ec()})),pn()}function Gu(_){var P;if(te=_.matches,In(),te){for(const y of Me.values())y.update(1),(P=y.complete)==null||P.call(y);Me.clear(),ce==="unload"&&queueMicrotask(Na),Ko(),Ba(null)}me&&Gi(be.get(Q%5),te?.45:Jo(performance.now())),Et(),pn()}function Wi(_){gt.updateMatrixWorld(!0);const P=new Fn().setFromObject(_).getCenter(new A).project(Jt),y=kt.getBoundingClientRect();return{screenX:y.left+(P.x+1)*y.width/2,screenY:y.top+(1-P.y)*y.height/2}}function $i(_){_.updateWorldMatrix(!0,!0);const P=new Fn().setFromObject(_);return{min:P.min.toArray(),max:P.max.toArray()}}function Ap(){if(!Qe||!L)return null;gt.updateMatrixWorld(!0);const _=kt.getBoundingClientRect(),P=[[-.38,.17,.12],[-.38,.46,-.1],[-.3,.1,.28],[0,.1,.29],[.3,.24,.15]];let y=null;for(const U of P){const G=L.localToWorld(new A(...U)).project(Jt),le=_.left+(G.x+1)*_.width/2,$=_.top+(1-G.y)*_.height/2,W=le>=_.left&&le<=_.right&&$>=_.top&&$<=_.bottom&&document.elementFromPoint(le,$)===kt,he={screenX:le,screenY:$,blockedByOverlay:!W};if(y??(y=he),W)return he}return y}function Rp(){c&&L.traverse(_=>{if(!_.isMesh)return;for(let y=_;y;y=y.parent)if(y===b)return;const P=y=>{const U=HS[y.name];if(!U)return y;if(!Te.has(y)){const G=y.clone();G.color.set(U),G.roughness=y.name.includes("spring steel")?.48:.78,G.metalness=y.name.includes("spring steel")?.22:.03,Te.set(y,G),Xe.add(y)}return Te.get(y)};_.material=Array.isArray(_.material)?_.material.map(P):P(_.material)})}function ec(){var $,W,he,ge,ae,Ae,Le,ze,At,ct,dt,Dt,Rt,Ln,Dn,kn,bi,qi,Nr;const _=Vt.visible&&(()=>{for(let Ge=Vt.parent;Ge;Ge=Ge.parent)if(!Ge.visible)return!1;return!0})(),P=Se.visible&&(()=>{for(let Ge=Se.parent;Ge;Ge=Ge.parent)if(!Ge.visible)return!1;return!0})(),y=be.get(Q%5),U=Ye.visible&&(()=>{for(let Ge=Ye.parent;Ge;Ge=Ge.parent)if(!Ge.visible)return!1;return!0})(),G=y?Xc.clone().sub(y.group.position).setY(0).normalize():new A,le=(y==null?void 0:y.group.getWorldDirection(new A))??new A(0,0,1);return{status:h?"disposed":f?"context-lost":v?"degraded":g?"ready":"loading",loaded:g,sceneId:e,phase:ce,patienceMood:Fe,viewMode:"first-person",cameraType:Jt.type,cameraPosition:Jt.position.toArray(),theme:{id:l.theme,lighting:c?"soft-golden":"daylight",lcdBackground:c?"#fff7e8":"#122624",registerPalette:Object.fromEntries([...Te].map(([Ge,Qt])=>[Ge.name,`#${Qt.color.getHexString()}`])),cashTrayPalette:[We,pt].map(Ge=>`#${Ge.color.getHexString()}`)},triangles:u.info.render.triangles,drawCalls:u.info.render.calls,geometries:u.info.memory.geometries,textures:u.info.memory.textures,renderedFrames:T,renderLoopActive:!!m&&!h&&!f&&!document.hidden,modelSources:l.sources.map(To),productModels:[...ke.keys()],humanModels:c?0:be.size,customerModels:be.size,customerKinds:[...l.customerKinds],currentCustomerKind:l.customerKinds[Q%5],conveyorVisible:Vi.visible,greetingAnimation:{status:(($=be.get(Q%5))==null?void 0:$.greetingStatus)??"none",active:((W=be.get(Q%5))==null?void 0:W.greetingStatus)==="playing"},thankYouAnimation:{status:((he=be.get(Q%5))==null?void 0:he.thanksStatus)??"none",active:((ge=be.get(Q%5))==null?void 0:ge.thanksStatus)==="playing"},register:{loaded:!!(L&&O&&Qe),modelSource:To(l.sources[3]),position:(L==null?void 0:L.position.toArray())??null,displayLines:[...D],displayRevision:lt,receiptVisible:!!(M!=null&&M.visible||_)},receipt:{status:F,holder:V,visible:!!(M!=null&&M.visible||_),orderId:(ne==null?void 0:ne.id)??null,attachedToHand:Vt.parent===((ae=be.get(Q%5))==null?void 0:ae.hand),handLocalPosition:Vt.parent===((Ae=be.get(Q%5))==null?void 0:Ae.hand)?Vt.position.toArray():null,worldBounds:_?$i(Vt):M!=null&&M.visible?$i(M):null,..._?Wi(Vt):M!=null&&M.visible?Wi(M):{}},takeawayBag:{status:Ze,holder:Ye.parent===(y==null?void 0:y.hand)?"customer":Ze==="handover"?"cashier":"counter",visible:U,attachedToHand:Ye.parent===(y==null?void 0:y.hand),itemCount:Mt.size,lineIds:[...Mt.keys()],productIds:[...Mt.values()],worldBounds:U?$i(Ye):null,...U?Wi(Ye):{}},departure:{active:Me.has(`depart:${Q%5}`),walking:Oe,position:(y==null?void 0:y.group.position.toArray())??null,facingDirection:le.toArray(),travelDirection:G.toArray(),forwardAlignment:G.lengthSq()?le.dot(G):1},wrongChangeReaction:{direction:ie.direction,status:ie.status,active:Me.has("wrong-change")},wrongTotalReaction:{direction:q.direction,status:q.status,active:Me.has("wrong-total"),facialPose:q.direction==="too-high"?"surprised":q.direction==="too-low"?"concerned":null},changeHandover:{status:_e,holder:_e==="none"?null:Se.parent===(y==null?void 0:y.freeHand)?"customer":"cashier",visible:P,attachedToHand:Se.parent===(y==null?void 0:y.freeHand),orderId:(ye==null?void 0:ye.id)??null,handLocalPosition:Se.parent===(y==null?void 0:y.freeHand)?Se.position.toArray():null,count:Ie.reduce((Ge,Qt)=>Ge+Qt.count,0),denominations:Ie.map(({cents:Ge,count:Qt,representativeCount:ci})=>({cents:Ge,count:Qt,representativeCount:ci})),worldBounds:P?$i(Se):null,...P?Wi(Se):{}},emotion:{mood:pe,kind:l.customerKinds[Q%5],expressionStyle:c?YS[Q%5]:"human-brows",mouthCurvature:((Le=y==null?void 0:y.expression)==null?void 0:Le.smile)??0,mouthOpenness:((ze=y==null?void 0:y.expression)==null?void 0:ze.mouthOpenness)??0,facialPose:((At=y==null?void 0:y.expression)==null?void 0:At.facialPose)??"emotion",eyebrowAngles:((ct=y==null?void 0:y.expression)==null?void 0:ct.brows.map(Ge=>Ge.rotation.z))??[],eyeClosure:((dt=y==null?void 0:y.expression)==null?void 0:dt.currentEyeClosure)??0,headQuaternion:((Dt=y==null?void 0:y.head)==null?void 0:Dt.quaternion.toArray())??null,earQuaternions:(y==null?void 0:y.ears.map(Ge=>Ge.object.quaternion.toArray()))??[],bodyScales:(y==null?void 0:y.bodyParts.map(Ge=>Ge.scale.toArray()))??[],leftArmQuaternion:((Rt=y==null?void 0:y.freeArm)==null?void 0:Rt.quaternion.toArray())??null},speech:{active:me,character:l.customerKinds[Q%5],mouthOpenness:((Ln=y==null?void 0:y.expression)==null?void 0:Ln.mouthOpenness)??0,boundaryCount:_t},reaction:{kind:se.kind,status:se.status,active:Me.has("customer-reaction"),particleCount:J.filter(Ge=>Ge.visible).length,symbolKinds:[...se.symbolKinds]},customerMotion:{enabled:!!zi(),active:Me.has("customers-idle"),scheduled:vi!==null,bursts:Is,actorIndices:[...us],poses:[...be.values()].filter(Ge=>Ge.group.visible).map(Ge=>{var Qt,ci,Cn,Os;return{index:Ge.index,rigPosition:Ge.rig.position.toArray(),headQuaternion:((Qt=Ge.head)==null?void 0:Qt.quaternion.toArray())??null,freeArmQuaternion:((ci=Ge.freeArm)==null?void 0:ci.quaternion.toArray())??null,bodyScale:((Cn=Ge.bodyParts[0])==null?void 0:Cn.scale.toArray())??null,rightHandWorld:((Os=Ge.hand)==null?void 0:Os.getWorldPosition(new A).toArray())??null}})},queueCount:[...be.values()].filter(Ge=>Ge.group.visible&&Ge.index!==Q%5).length,customerCount:[...be.values()].filter(Ge=>Ge.group.visible).length,availableDrawerDenominations:[...I],missingDrawerDenominations:[...S],drawerStock:Xn.map(({cents:Ge})=>({cents:Ge,triangles:fe.get(Ge)??0,fullTriangleCount:re.get(Ge)??0,visible:!!(b!=null&&b.visible&&I.includes(Ge))})),patienceGesture:{active:Me.has(`patience:${Q%5}`),leftArmQuaternion:((kn=(Dn=be.get(Q%5))==null?void 0:Dn.freeArm)==null?void 0:kn.quaternion.toArray())??null,leftForearmQuaternion:((qi=(bi=be.get(Q%5))==null?void 0:bi.freeForearm)==null?void 0:qi.quaternion.toArray())??null},unloading:it,drawerOpen:at,drawerOpenDistance:Yt,drawerTravel:Qe&&Ne?Qe.position.z-Ne.z:0,drawerContentsVisible:(b==null?void 0:b.visible)??!1,drawerTarget:Ap(),reducedMotion:te,activeAnimations:Me.size,offeredMoney:B.visible?{amountCents:Y==null?void 0:Y.paidCents,...Wi(B),attachedToHand:B.parent===((Nr=be.get(Q%5))==null?void 0:Nr.hand),handLocalPosition:B.position.toArray(),worldPosition:B.getWorldPosition(new A).toArray()}:null,selectedChange:{surface:"cashier-tray",trayBounds:$i(Ke),count:qe.reduce((Ge,Qt)=>Ge+Qt.count,0),totalCents:qe.reduce((Ge,Qt)=>Ge+Qt.totalCents,0),groups:qe.map(({group:Ge,...Qt})=>({...Qt,countLabelVisible:!1,worldBounds:$i(Ge),...Wi(Ge)}))},scanner:Wi(Yn),items:[...ot.values()].map(({lineId:Ge,productId:Qt,group:ci,visual:Cn,hit:Os})=>({lineId:Ge,productId:Qt,visible:ci.visible,scanned:ue.has(Ge),worldBounds:$i(Cn),hitBounds:$i(Os),...Wi(ci)}))}}const Wu=new ResizeObserver(hs);Wu.observe(i),window.addEventListener("resize",hs),document.addEventListener("visibilitychange",Fu);const $u={pointerdown:xp,pointermove:Mp,pointerup:Sp,pointercancel:bp,pointerleave:Tp,webglcontextlost:Ep,webglcontextrestored:wp};for(const[_,P]of Object.entries($u))kt.addEventListener(_,P);ve.addEventListener("change",Gu),hs();function Cp(){if(h)return;fs({active:!1}),Si(),Lr(null),h=!0,In(),clearTimeout(Be),clearTimeout(ee),ee=null,m&&cancelAnimationFrame(m),m=0,Me.clear(),Wu.disconnect(),window.removeEventListener("resize",hs),document.removeEventListener("visibilitychange",Fu);for(const[y,U]of Object.entries($u))kt.removeEventListener(y,U);ve.removeEventListener("change",Gu),ku();const _=Ph(gt);for(const y of[R,x])Ph(y,_);const P=[...An.values(),...[...fn.values()].flatMap(y=>[y.face,y.edge])];for(const y of P)y.map&&!_.has(y.map)&&(_.add(y.map),y.map.dispose()),_.has(y)||(_.add(y),y.dispose());for(const y of Xe){for(const U of Object.values(y))U!=null&&U.isTexture&&!_.has(U)&&(_.add(U),U.dispose());_.has(y)||(_.add(y),y.dispose())}for(const y of[rn,wr,...[...fn.values()].map(U=>U.geometry),Wo,Aa,Ns])_.has(y)||y.dispose();u.dispose(),kt.remove()}const Pp=new rS,Xi=await Promise.allSettled(l.sources.map(_=>Pp.loadAsync(To(_))));if(Xi[0].status==="fulfilled"&&(E=Xi[0].value.scene,E.name=`blender_${e}_interior`,gt.add(E)),Xi[1].status==="fulfilled"){x=Xi[1].value.scene;for(let _=0;_<5;_++){const P=x.getObjectByName(`customer_${_}`);if(!P)continue;const y=P.clone(!0);y.position.set(0,0,0);const U=new $t;U.name=`customer_actor_${_}`,U.add(y),U.visible=!1;const G=U.getObjectByName(`customer_${_}_arm_right`),le=U.getObjectByName(`customer_${_}_hand_right`),$=U.getObjectByName(`customer_${_}_arm_left`),W=U.getObjectByName(`customer_${_}_forearm_left`),he=U.getObjectByName(`customer_${_}_hand_left`),ge=U.getObjectByName(`customer_${_}_head`),ae=y.children.filter(ze=>ze.name===`customer_${_}_body`||ze.name.startsWith(`customer_${_}_body_`)),Ae=["left","right"].map(ze=>U.getObjectByName(`customer_${_}_ear_${ze}`)).filter(Boolean).map(ze=>({object:ze,rest:ze.quaternion.clone(),neutral:ze.quaternion.clone()})),Le={index:_,group:U,rig:y,arm:G,hand:le,freeArm:$,freeForearm:W,freeHand:he,head:ge,ears:Ae,bodyParts:ae,bodyRestScales:ae.map(ze=>({object:ze,scale:ze.scale.clone()})),headNeutral:(ge==null?void 0:ge.quaternion.clone())??new tt,rigRestPosition:y.position.clone(),headRest:(ge==null?void 0:ge.quaternion.clone())??new tt,greetingStatus:"none",thanksStatus:"none",armRest:(G==null?void 0:G.quaternion.clone())??new tt,handRest:(le==null?void 0:le.quaternion.clone())??new tt,freeArmRest:($==null?void 0:$.quaternion.clone())??new tt,freeForearmRest:(W==null?void 0:W.quaternion.clone())??new tt,freeHandRest:(he==null?void 0:he.quaternion.clone())??new tt};Le.expression=up(Le),Ir(Le,"happy"),be.set(_,Le),Ds.add(U)}}if(Xi[2].status==="fulfilled"){R=Xi[2].value.scene;for(const _ of l.products){const P=R.getObjectByName(`product_${_}`);P&&ke.set(_,P)}}Xi[3].status==="fulfilled"&&(C=Xi[3].value.scene,L=C.getObjectByName("register_root"),L&&(L.position.copy(Wc),gt.add(C),Qe=L.getObjectByName("cash_drawer"),Ne=(Qe==null?void 0:Qe.position.clone())??null,Number.isFinite(Qe==null?void 0:Qe.userData.open_distance)&&Qe.userData.open_distance>0&&(Yt=Qe.userData.open_distance),b=L.getObjectByName("cash_drawer_contents"),b&&(b.visible=!1,gp()),Rp(),O=L.getObjectByName("pos_display_surface"),O==null||O.traverse(_=>{if(_.isMesh){for(const P of Array.isArray(_.material)?_.material:[_.material])Xe.add(P);_.material=Aa,_.castShadow=!1,_.receiveShadow=!1}}),M=L.getObjectByName("receipt_paper"),M&&(N=M.position.clone(),M.visible=!1),L.add(Hi),Hi.position.set(0,.34,.03)));for(const _ of[E,x,R,Ds])_==null||_.traverse(P=>{if(P.isMesh){P.castShadow=!0,P.receiveShadow=!0;for(const y of Array.isArray(P.material)?P.material:[P.material])"roughness"in y&&(y.roughness=Math.max(y.roughness,.38))}});return C==null||C.traverse(_=>{_.isMesh&&(_.castShadow=_!==Hi&&_.material!==Aa,_.receiveShadow=_!==Hi&&_.material!==Aa)}),g=!!(E&&L&&O&&Qe&&be.size===5&&ke.size===l.products.length),v=!g,Vi.visible=l.hasBelt&&!!E,kt.dataset.ready=String(g),hs(),g?n==null||n(ec()):s==null||s(new Error("Some 3D checkout models could not load. Cashier controls still work.")),{setState:vp,setOrder:mp,setScanned:zu,setPatience:Dr,setEmotion:Ia,setSpeech:fs,playReaction:Uu,reactToChange:La,reactToTotal:Lr,celebrate:yp,resize:hs,dispose:Cp,info:ec}}const on={sun:'<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="7" fill="currentColor"/><path d="M20 3v5m0 24v5M3 20h5m24 0h5M8 8l4 4m16 16 4 4M8 32l4-4M28 12l4-4" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',bear:'<svg viewBox="0 0 48 48" aria-hidden="true"><g stroke="#734a34" stroke-width="2.2"><circle cx="11" cy="12" r="8" fill="#cf9966"/><circle cx="37" cy="12" r="8" fill="#cf9966"/><ellipse cx="24" cy="27" rx="21" ry="18" fill="#dfb27c"/></g><ellipse cx="24" cy="32" rx="10" ry="8" fill="#fff0d9"/><ellipse cx="16" cy="25" rx="2.2" ry="3" fill="#57372b"/><ellipse cx="32" cy="25" rx="2.2" ry="3" fill="#57372b"/><ellipse cx="24" cy="30" rx="3.5" ry="2.5" fill="#57372b"/><path d="M24 32v3m-4 0q4 4 8 0" fill="none" stroke="#57372b" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="9" cy="31" rx="4" ry="2.5" fill="#e89582"/><ellipse cx="39" cy="31" rx="4" ry="2.5" fill="#e89582"/></svg>',sound:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m11 5-5 4H3v6h3l5 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" stroke-linecap="round"/></svg>',music:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 17V5l11-2v12M9 9l11-2" stroke-linejoin="round"/><ellipse cx="6" cy="18" rx="3" ry="2.5"/><ellipse cx="17" cy="16" rx="3" ry="2.5"/></svg>',gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 3-1 3-3 1-2 5 2 5 3 1 1 3h6l1-3 3-1 2-5-2-5-3-1-1-3H9Z"/><circle cx="12" cy="12" r="3"/></svg>',cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 3h3l3 13h11l3-10H6M9 20h1m7 0h1" stroke-linecap="round" stroke-linejoin="round"/></svg>',arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-5-5 5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>',check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 12 4 4L19 6" stroke-linecap="round" stroke-linejoin="round"/></svg>'},xe=i=>document.getElementById(i),qt=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);function ZS(){try{return JSON.parse(localStorage.getItem("sunny-market-v1"))||{}}catch{return{}}}const ri=ZS();let H=Ql(Jl.some(i=>i.id===ri.levelId)?ri.levelId:"starter",Math.random,"restaurant"),ni=ri.sound!==!1,As=ri.music!==!1,ql=0,Bi=ri.patience!==!1,hi=Yh(),jt=null,Ps=Nh.some(i=>i.durationMs===ri.shiftDurationMs)?ri.shiftDurationMs:Kl;const Au=Object.fromEntries(Object.entries(ri.bestScores||{}).filter(([,i])=>Number.isSafeInteger(i)&&i>=0));let Do=!1;const qf=()=>`${H.sceneId}:${H.levelId}:${Ps}:${Bi?"timed":"relaxed"}`,No=()=>Au[qf()]||0;let Uo=Number.isInteger(ri.stamps)&&ri.stamps>=0?ri.stamps:0,Zn="",$e,Li,Eo=!1,Yf=!1,Oo=!1,Ih=null,wo="";function Sa(){try{localStorage.setItem("sunny-market-v1",JSON.stringify({levelId:H.levelId,sceneId:H.sceneId,sound:ni,music:As,stamps:Uo,patience:Bi,shiftDurationMs:Ps,bestScores:Au}))}catch{}}const QS={unload:["Welcome your customer","Their takeaway order is arriving on the counter."],scan:["Check the food order","Check each food item to pack it into the takeaway bag."],total:["Add up the prices","Enter the total on your cash register."],payment:["Take the payment","Take the customer’s money. Then open your register."],drawer:["Open your cash register","Press OPEN to find the notes and coins for their change."],change:["Count out the change","Choose notes and coins, then hand them back."],success:["Another happy customer","Give them their takeaway bag, receipt, and change."],finished:["Time’s up!","Your score is in. Play again to beat your best!"]},sa=()=>Kc[0].name,Yl=()=>QS[H.phase],Kf=()=>H.order.changeCents===0?"bag and receipt":"bag, receipt, and change";xe("app").innerHTML=`<main class="cashier-app">
  <div id="world" class="world" aria-label="First-person restaurant counter. Check food to pack it into a takeaway bag and take the customer’s money. Equivalent buttons are available on your register."><div id="world-loading" class="world-loading">${on.sun}<strong>Opening checkout 01…</strong><span>Warming up the kitchen</span></div></div>
  <div class="world-shade" aria-hidden="true"></div>
  <header class="hud"><a class="brand" href="#" aria-label="Sunny Bites game settings">${on.bear}<span id="scene-brand">sunny bites<small>TAKEAWAY CASHIER</small></span></a><div class="shift-status" id="progress"></div><div class="hud-tools"><span class="lane-tag"><i></i> LANE 01 OPEN</span><button class="icon-button" id="music" aria-label="Turn music off" title="Music">${on.music}</button><button class="icon-button" id="sound" aria-label="Turn sound off">${on.sound}</button><button class="icon-button" id="settings-open" aria-label="Open game settings">${on.gear}</button></div></header>
  <section class="mission" aria-label="Current task"><span class="mission-kicker">YOUR NEXT STEP</span><h1 id="objective-title"></h1><p id="objective-copy"></p><div class="mission-steps" id="steps"></div></section>
  <div class="customer-note" id="customer"></div>
  <div class="view-label"><span class="live-dot"></span> CASHIER VIEW <span id="scene-status">Loading your restaurant</span></div>
  <section id="pos-register" class="register" aria-label="Cash register"><div class="monitor-housing"><span class="bezel-screw screw-tl" aria-hidden="true"></span><span class="bezel-screw screw-tr" aria-hidden="true"></span><div class="register-bezel"><span class="register-brand">SUNNY <span>POINT OF SALE</span></span><div class="register-led"></div><span class="register-id">T-01</span></div><div class="register-screen"><div class="register-screen-header"><span id="terminal-status">READY</span>${Zh("register-patience")}<span class="register-currency">AUD · TRAINING TILL</span></div><div id="register-content" class="register-content"></div><div id="register-action" class="register-action" hidden></div></div><div class="monitor-chin" aria-hidden="true"><span>TOUCH TERMINAL</span><i>⏻</i></div></div>${Nm()}</section>
  <div id="announcer" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div><div id="patience-announcer" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div>
  <dialog id="settings" class="settings-dialog" aria-labelledby="settings-title"><form method="dialog"><button class="dialog-close" aria-label="Close settings">×</button></form><div class="eyebrow">MAKE YOURSELF AT HOME</div><h2 id="settings-title">Your cashier shift</h2><p>Pack each checked food item, take payment, and hand over the bag, receipt, and change. Serve as many customers as you can before the shift timer ends.</p><fieldset><legend>Learning level</legend><div id="level-options"></div></fieldset><fieldset class="shift-length-setting"><legend>Shift time</legend><select id="shift-duration" aria-label="Shift time">${Nh.map(i=>`<option value="${i.durationMs}">${i.label}</option>`).join("")}</select><p>An endless queue. Beat your best score before the buzzer!</p></fieldset><label class="patience-setting"><input type="checkbox" id="patience-enabled" checked/><span><strong>Customer patience</strong><small>Race the clock for more points. Turn off for patient customers: +50 points each. The shift time limit still applies.</small></span></label><section class="scoring-rules" aria-label="Service scoring rules"><h3>Serve quickly. Count carefully.</h3><dl><dt>More than half the time left</dt><dd>+100 pts</dd><dt>More than a fifth left</dt><dd>+60 pts</dd><dt>Before the timer reaches zero</dt><dd>+20 pts</dd><dt>After time runs out</dt><dd>−25 pts</dd></dl><p>Points apply once you finish a correct sale before the shift timer ends. Scores can go below zero. A fresh shift starts at 0.</p></section><div class="settings-note"><span>🇦🇺</span><div><strong>Australian dollars</strong><br>Play money · Timers pause in settings and hidden tabs<br>Music starts when you play. Use ♫ to switch it on or off.<br>Character voices are AI-generated with Kokoro.</div></div><button class="primary-button" id="apply-level">Start a fresh shift ${on.arrow}</button><p class="saved-note" id="saved-stamps"></p></dialog>
</main>`;function jf(i){const e=xe("music");e.classList.toggle("muted",!i.enabled),e.setAttribute("aria-pressed",String(i.enabled)),e.setAttribute("aria-label",i.enabled?"Turn music off":"Turn music on"),e.title=i.error?"Music unavailable on this device":i.enabled?"Music on · tap to mute":"Music off · tap to play",e.dataset.playing=String(!!i.playing)}const ga=Vp({enabled:As,onStateChange:jf}),mi=Np({isEnabled:()=>As,isPaused:()=>document.hidden||xe("settings").open});function Fo(i){var e,t,n,s;(t=(e=i.target).closest)!=null&&t.call(e,"#music")||ga.unlock(),mi.unlock(),!Oo&&!((s=(n=i.target).closest)!=null&&s.call(n,"#music, #sound, #settings-open, .brand, #settings"))&&(Oo=!0,queueMicrotask(()=>os()))}document.addEventListener("pointerdown",Fo);document.addEventListener("keydown",Fo);jf(ga.info());const Bn=Pm({getState:()=>H,getView:()=>$e,isEnabled:()=>Bi,onMoodChange:i=>{var t;tp(),(t=$e==null?void 0:$e.setEmotion)==null||t.call($e,ls()),mi.play(ls()),os();const e={restless:"is getting restless.",impatient:"is getting impatient.",exhausted:"has run out of patience. This checkout will cost 25 points. You can still finish and earn points back on the next customer."};e[i]&&(xe("patience-announcer").textContent=`${H.order.customer.name} ${e[i]}`)}}),fi=vm({isEnabled:()=>ni&&!document.hidden&&!xe("settings").open,onStateChange:i=>{var e;return(e=$e==null?void 0:$e.setSpeech)==null?void 0:e.call($e,{active:i.speechActive,boundary:i.speechBoundary,character:i.character,mood:i.mood})}}),ki=ym({getState:()=>H,isPaused:()=>document.hidden||xe("settings").open,onAdvance:()=>Sn.info().expired?Go():hn($h(H),"next"),onUpdate:Zf}),Sn=Ip({durationMs:Ps,getState:()=>H,isPaused:()=>document.hidden||xe("settings").open,onUpdate:Jf,onExpire:()=>{H.phase==="success"?(Zf(),Jr("Time’s up! Finishing this customer’s handover.")):Go()}});function ls(){return H.phase==="success"?(jt==null?void 0:jt.tier)==="late"?"tired":["close","steady"].includes(jt==null?void 0:jt.tier)?"relieved":"happy":Bi&&["scan","total","payment","drawer","change"].includes(H.phase)?Bn.info().mood==="calm"?"happy":Bn.info().mood:"happy"}function Ru(){var i,e;return Ss({phase:H.phase,kind:H.order.customer.kind,mood:Bi?Bn.info().mood:"calm",paidCents:H.order.paidCents,emotion:ls(),delivered:ki.info().handoverDelivered,changeCents:H.order.changeCents,changeDirection:(i=H.feedback)==null?void 0:i.changeDirection,totalDirection:(e=H.feedback)==null?void 0:e.totalDirection})}function os({force:i=!1,changeDirection:e=null,totalDirection:t=null}={}){var c,d;if(H.order!==Ih&&(Ih=H.order,wo="",fi.cancel()),H.phase==="finished"||(!Oo||!ni||document.hidden||xe("settings").open)&&!e&&!t||H.phase==="success"&&!ki.info().handoverDelivered)return;const n=ls(),s=["unload","scan"].includes(H.phase)?"welcome":["drawer","change"].includes(H.phase)?"change":H.phase,r=e||(H.phase==="change"?(c=H.feedback)==null?void 0:c.changeDirection:null),a=t||(H.phase==="total"?(d=H.feedback)==null?void 0:d.totalDirection:null),o=a?`total:${a}`:`${s}:${n}:${r||"dialogue"}`;if(!i&&wo===o)return;wo=o;const l={character:H.order.customer.kind,mood:n,kind:H.phase==="success"?"thanks":s};a?fi.playTotal(a,l):r?fi.play(r,l):fi.speak(Ru(),l)}function Jf(i=Sn.info()){const e=xe("shift-clock");if(!e)return;const t=i.remainingSeconds;e.querySelector("strong").textContent=`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`,e.querySelector("small").textContent=i.expired?"TIME’S UP":i.paused?"PAUSED":"SHIFT TIME",e.dataset.urgent=String(t<=30&&!i.expired),e.setAttribute("aria-label",`${i.paused?"Paused. ":""}${t} seconds left in your shift`)}function Go(){H.phase!=="finished"&&(Do=hi.points>No(),Au[qf()]=Math.max(No(),hi.points),Sa(),hn(am(H),"finish"),mi.play("shift-end"))}function Zf(i=ki.info()){const e=xe("checkout-status");if(e){const s=Kf(),r={printing:`Preparing your ${s}…`,"handing-over":`Giving ${s} to ${H.order.customer.name}…`,departing:Sn.info().expired?"Everything delivered. Finishing your shift…":"Handover complete. The next customer is coming…"};e.textContent=i.paused?"Checkout paused. We’ll continue when you return.":r[i.stage]||"",e.dataset.stage=i.stage}const t=xe("pos-register").querySelector("[data-action=next]");t&&(t.disabled=!i.handoverDelivered,t.innerHTML=`${Sn.info().expired?"See my score":"Next customer"} ${on.arrow}`);const n=xe("printed-receipt");if(n&&n.classList.toggle("receipt-given",i.receiptDelivered||H.phase==="finished"),H.phase==="success"){const s=xe("customer").querySelector("[data-customer-speech]");s&&(s.textContent=Ru()),i.handoverDelivered&&os()}}function Qf(){ki.pauseChanged(),Sn.pauseChanged(),document.hidden&&(fi.cancel(),mi.cancel())}document.addEventListener("visibilitychange",Qf);xe("settings").addEventListener("close",()=>{ki.pauseChanged(),Sn.pauseChanged(),os()});function ws(i){if(ni)try{Li||(Li=new(window.AudioContext||window.webkitAudioContext)),Li.resume(),(i==="success"?[523.25,659.25,783.99]:i==="scan"?[1100,1450]:i==="drawer"?[190,280]:i==="too-little"?[330,440]:i==="too-much"?[440,330]:[580]).forEach((t,n)=>{const s=Li.createOscillator(),r=Li.createGain();s.type=i==="drawer"?"triangle":"sine",s.frequency.value=t;const a=Li.currentTime+n*.1;r.gain.setValueAtTime(0,a),r.gain.linearRampToValueAtTime(.06,a+.01),r.gain.exponentialRampToValueAtTime(.001,a+.14),s.connect(r),r.connect(Li.destination),s.start(a),s.stop(a+.16)})}catch{}}function Jr(i){xe("announcer").textContent=i}function sr(){const i=H.feedback;if(!i||i.type!=="try")return"";if(H.phase==="total"&&["too-high","too-low"].includes(i.totalDirection))return`<div id="total-feedback" class="feedback try total-feedback" data-direction="${i.totalDirection}" role="status"><span class="total-feedback-symbol" aria-hidden="true">✕</span><div><strong>${i.totalDirection==="too-high"?"Total is too high":"Total is too low"}</strong><span><b>${qt(H.order.customer.name)}:</b> “${qt(dr(i.totalDirection))}”</span></div></div>`;if(H.phase==="change"&&["too-little","too-much"].includes(i.changeDirection)){const e=i.changeDirection==="too-little";return`<div class="feedback try change-feedback" data-direction="${i.changeDirection}" role="status"><span class="change-feedback-symbol" aria-hidden="true">${e?"+":"−"}</span><div><strong>${e?"Too little change":"Too much change"}</strong><span class="customer-verdict"><b>${qt(H.order.customer.name)}:</b> “${qt(ur(i.changeDirection))}”</span></div></div>`}return`<div class="feedback ${i.type}" role="status">${qt(i.text)}</div>`}function Bo(){const i=new Map;for(const e of H.order.items){const t=`${e.productId}:${e.priceCents}`;i.has(t)||i.set(t,{...e,quantity:0,lineIds:[]}),i.get(t).quantity++,i.get(t).lineIds.push(e.lineId)}return[...i.values()]}function ep(i,e=""){return`<img class="food-picture ${e}" src="./assets/food-icons/${qt(i.productId)}.png" alt="" width="48" height="48" draggable="false"/>`}function Lh(i,e=!1){return`<span class="food-receipt-art ${e?"checked":""}" aria-hidden="true">${ep(i)}${e?"<i>✓</i>":""}</span>`}function Dh({compact:i=!1}={}){const e=["payment","drawer","change","success","finished"].includes(H.phase),n=H.phase==="scan"?Bo().map(s=>{const r=s.lineIds.filter(l=>H.scanned.includes(l)).length,a=r===s.quantity,o=s.lineIds.find(l=>!H.scanned.includes(l))??s.lineIds.at(-1);return`<button class="receipt-item receipt-product-group receipt-scan-group ${a?"is-scanned":""}" data-product="${qt(s.productId)}" data-quantity="${s.quantity}" data-unit-price="${s.priceCents}" data-packed="${r}" data-scan-group="${qt(`${s.productId}:${s.priceCents}`)}" data-scan="${qt(o)}" aria-label="Check ${qt(s.name)}, ${r} of ${s.quantity} packed, ${Ut(s.priceCents)} each" ${a?"disabled":""}>${Lh(s,a)}<span class="product-description">${qt(s.name)}<small class="packing-progress">${a?"Packed ✓":`${r}/${s.quantity} packed`}</small></span><strong class="product-equation">${s.quantity} × ${Ut(s.priceCents)}</strong></button>`}).join(""):Bo().map(s=>`<div class="receipt-item receipt-product-group is-scanned" data-product="${qt(s.productId)}" data-quantity="${s.quantity}" data-unit-price="${s.priceCents}">${Lh(s,!0)}<span class="product-description">${qt(s.name)}<small>${Ut(s.priceCents)} each</small></span><strong class="product-equation">${s.quantity} × ${Ut(s.priceCents)}</strong></div>`).join("");return`<div class="receipt ${i?"compact":""}"><div class="receipt-head"><span>ITEM</span><span>QUANTITY × PRICE EACH</span></div><div class="receipt-items">${n}</div><div class="receipt-total"><span>${e?"TOTAL":"TOTAL TO CALCULATE"}</span><strong>${e?Ut(H.order.totalCents):"$ —.—"}</strong></div></div>`}function eb(){xe("progress").innerHTML=`<span class="shift-clock" id="shift-clock" role="timer"><small>SHIFT TIME</small><strong></strong></span><span class="shift-score" id="shift-score" data-negative="${hi.points<0}" aria-label="Shift score: ${hi.points} points"><span aria-hidden="true">★</span><strong>${Kh(hi.points)}</strong><small>PTS</small></span><span class="shift-best"><small>BEST</small><b>${No()}</b></span><span class="customer-counter">${on.cart}<strong>${H.phase==="finished"?`${H.completed} served`:`Customer ${H.round+1}`}</strong></span>`,Jf()}function tp(){var d,u;const i=H.order.customer,e=Ru(),t=Bn.info().mood,n=H.phase==="change"?(d=H.feedback)==null?void 0:d.changeDirection:null,s=H.phase==="total"?(u=H.feedback)==null?void 0:u.totalDirection:null,r=["unload","scan","total"].includes(H.phase)&&t==="calm"&&!s,a=r?`<div class="customer-order-pictures" aria-label="Customer’s order">${Bo().map(h=>`<span class="order-picture" aria-label="${h.quantity} ${qt(h.name)}">${ep(h)}<b aria-hidden="true">×${h.quantity}</b></span>`).join("")}</div>`:"";xe("customer").classList.toggle("pictured-order",r);const o=s?"confused":ls(),l={happy:"☺",restless:"◷",impatient:"☁",exhausted:"☁",relieved:"♡",tired:"☂",confused:"✕"},c={happy:H.phase==="success"?"Delighted!":"Happy to wait",restless:"Getting restless",impatient:"Losing patience",exhausted:"Very impatient",relieved:"Relieved",tired:"Tired of waiting",confused:"Let’s check the bill"};xe("customer").dataset.emotion=o,xe("customer").innerHTML=`<span class="speech-name">${qt(i.name)} <span>${H.phase==="success"?"CUSTOMER SERVED":"AT YOUR CHECKOUT"}</span></span><span class="customer-emotion"><i aria-hidden="true">${l[o]}</i>${c[o]}</span>${a}<p data-customer-speech class="${r?"order-caption":""}">${qt(e)}</p>${Cm()}`,xe("customer").classList.toggle("payment-speech",H.phase==="payment"),n?xe("customer").dataset.changeDirection=n:delete xe("customer").dataset.changeDirection,s?xe("customer").dataset.totalDirection=s:delete xe("customer").dataset.totalDirection}function _a(){var d,u,h,f,g;const i=document.activeElement,e=["data-money","data-remove-value","data-remove","data-action","data-scan-group","data-scan"].find(v=>i==null?void 0:i.hasAttribute(v)),t=e?i.getAttribute(e):null,n=(i==null?void 0:i.id)==="total-input"?{start:i.selectionStart,end:i.selectionEnd,direction:i.selectionDirection}:null;xe("app").dataset.phase=H.phase,xe("app").dataset.scene=H.sceneId,xe("scene-brand").innerHTML=`${sa().toLowerCase()}<small>TAKEAWAY CASHIER</small>`,document.querySelector(".brand > svg").outerHTML=on.bear,document.querySelector(".brand").setAttribute("aria-label",`${sa()} game settings`),xe("world").setAttribute("aria-label","First-person restaurant counter. Click takeaway food to pack it into a bag, or take the animal customer’s money. Equivalent controls are available on your register."),document.title=`${sa()} · Cashier game`,eb(),tp(),xe("objective-title").textContent=Yl()[0],xe("objective-copy").textContent=Eo&&["unload","scan","payment","drawer"].includes(H.phase)?"Use the item rows on your register to keep playing.":Yl()[1],H.phase==="success"&&(jt==null?void 0:jt.tier)==="late"&&(xe("objective-title").textContent="Customer served"),H.phase==="change"&&ko(H).length&&(xe("objective-title").textContent="Find another combination",xe("objective-copy").textContent="Some slots are empty. Use the notes and coins you have to make the exact change."),H.phase==="total"&&Bo().some(v=>v.quantity>1)&&(xe("objective-title").textContent="Multiply, then add",xe("objective-copy").textContent="Multiply each price by its quantity. Add the groups to find the bill.");const s=["unload","scan"].includes(H.phase)?0:H.phase==="total"?1:H.phase==="payment"?2:H.phase==="drawer"?3:4;xe("steps").innerHTML=["Scan","Total","Cash","Open","Change"].map((v,m)=>`<span class="${m===s?"active":m<s?"done":""}"><i>${m<s?"✓":m+1}</i>${v}</span>`).join(""),xe("terminal-status").textContent={unload:"CUSTOMER ARRIVING",scan:"SCANNER READY",total:"ENTER BILL TOTAL",payment:"AWAITING PAYMENT",drawer:"PAYMENT RECEIVED · DRAWER CLOSED",change:"CASH DRAWER OPEN",success:"TRANSACTION COMPLETE",finished:"SHIFT COMPLETE"}[H.phase],xe("drawer-open").disabled=H.phase!=="drawer",xe("drawer-open").dataset.open=String(H.phase==="change"),xe("drawer-open").setAttribute("aria-label",H.phase==="drawer"?"Open cash drawer using the register button":H.phase==="change"?"Cash drawer is open":"Cash drawer is closed"),xe("drawer-base-label").textContent=H.phase==="drawer"?"PRESS TO OPEN CASH DRAWER":H.phase==="change"?"CASH DRAWER OPEN":"CASH DRAWER LOCKED";let r="",a="";H.phase==="unload"?r=`<div class="task-heading"><span class="eyebrow">NEXT IN LINE</span><h2>Welcome, ${qt(H.order.customer.name)}.</h2><p>${H.order.items.length} takeaway items are arriving on the counter.</p></div><div class="unload-display">${on.cart}<span>Getting your order ready…</span><div class="unload-indicator"><i></i><i></i><i></i></div></div>${sr()}<button class="secondary-button" data-action="unload">Start scanning ${on.arrow}</button>`:H.phase==="scan"?r=`<div class="task-heading compact-heading"><h2>Check each food item</h2><span class="scan-count">${H.scanned.length}/${H.order.items.length}</span></div>${Dh()}<div class="scanner-status"><span class="scan-led"></span>${H.scanned.length?"Item checked and packed. Ready for the next one.":"Click a food item to pack it into the bag."}</div>${sr()}`:H.phase==="total"?(r=`<div class="task-heading compact-heading"><h2>What’s the total?</h2></div>${Dh({compact:!0})}`,a=`<div class="calculator total-entry"><label for="total-input">ENTER THE AMOUNT THE CUSTOMER OWES</label><div class="total-entry-controls"><div class="money-input"><span>$</span><input id="total-input" type="text" inputmode="decimal" autocomplete="off" maxlength="8" aria-label="Total amount in dollars" placeholder="0.00" value="${qt(Zn)}"/></div><button class="primary-button" data-action="total">Check my total ${on.arrow}</button></div>${sr()}</div>`):H.phase==="payment"?r=`<div class="task-heading"><span class="eyebrow">ACCEPT THE CUSTOMER’S CASH</span><h2>Take the payment</h2><p>${qt(H.order.customer.name)} is handing you money.</p></div><div class="payment-bill"><span>Bill total</span><strong>${Ut(H.order.totalCents)}</strong></div><button class="offered-note" data-action="accept" aria-label="Take ${Ut(H.order.paidCents)} payment"><span>AUSTRALIAN DOLLARS</span><strong>${Ut(H.order.paidCents)}</strong><small>PLAY MONEY · CLICK TO TAKE</small></button>${sr()}<button class="primary-button" data-action="accept">Take ${Ut(H.order.paidCents)} ${on.arrow}</button><p class="payment-help">You can also click the money in their hand.</p>`:H.phase==="drawer"?r=`<div class="task-heading"><span class="eyebrow">CUSTOMER’S MONEY RECEIVED ✓</span><h2>Open the cash register</h2><p>Find the exact change inside your drawer.</p></div><div class="payment-summary"><div><span>BILL TOTAL</span><strong>${Ut(H.order.totalCents)}</strong></div><div><span>CASH RECEIVED ✓</span><strong>${Ut(H.order.paidCents)}</strong></div></div><div class="drawer-instruction"><span aria-hidden="true">↓</span><p>Press OPEN to release the drawer below.<br>Count the notes and coins inside.</p></div>${sr()}<button class="primary-button open-drawer-button" data-action="open-drawer">Open cash drawer ${on.arrow}</button><p class="payment-help">Then choose notes and coins to make the right change.</p>`:H.phase==="change"?r=`<div class="task-heading compact-heading"><h2>Count their change</h2></div><div class="payment-summary"><div><span>BILL TOTAL</span><strong>${Ut(H.order.totalCents)}</strong></div><div><span>CASH RECEIVED ✓</span><strong>${Ut(H.order.paidCents)}</strong></div></div><div class="change-prompt">${Ut(H.order.paidCents)} − ${Ut(H.order.totalCents)} = <span>?</span></div><p class="count-change-instruction">Count the notes and coins in your tray. Give the change when you’re ready.</p>${sr()}`:H.phase==="success"?r=`<div class="success-panel"><span class="success-check">${on.check}</span><span class="eyebrow">TRANSACTION COMPLETE</span><h2>${(jt==null?void 0:jt.tier)==="late"?"Change checked!":"Right on the money!"}</h2><p>Handing ${qt(H.order.customer.name)} their ${Kf()}.</p>${Tm(jt)}<p class="checkout-status" id="checkout-status" role="status"></p><button class="primary-button" data-action="next" disabled>Next customer ${on.arrow}</button><small class="checkout-auto-note">The queue moves automatically after everything is delivered.</small></div>`:r=`<div class="success-panel"><span class="finish-stars">${Do?"★ ★ ★":"★"}</span><span class="eyebrow">${Do?"NEW PERSONAL BEST":"SHIFT COMPLETE"}</span><h2>Time’s up!</h2><p>${H.completed} ${H.completed===1?"customer":"customers"} served in ${Ps/6e4} minutes.</p>${Em(hi)}<p class="shift-record">Best score: <strong>${No()} points</strong></p><button class="primary-button" data-action="restart">Play again ${on.arrow}</button><button class="text-button" data-action="levels">Change level or time</button></div>`,xe("register-content").innerHTML=r,xe("register-content").dataset.phase=H.phase;const o=H.phase==="change"?xe("register-content").querySelector(".feedback"):null,l=(o==null?void 0:o.outerHTML)||"";o==null||o.remove(),xe("register-action").innerHTML=a,xe("register-action").hidden=!a,xe("register-action").dataset.phase=H.phase;const c=H.phase==="total"?(d=H.feedback)==null?void 0:d.totalDirection:null;if(c?xe("pos-register").dataset.totalFeedback=c:delete xe("pos-register").dataset.totalFeedback,H.phase==="total"&&(xe("total-input").setAttribute("aria-invalid",String(((u=H.feedback)==null?void 0:u.type)==="try")),c&&xe("total-input").setAttribute("aria-describedby","total-feedback")),H.phase==="success"&&(xe("register-action").append(xe("register-content").querySelector("[data-action=next]"),xe("register-content").querySelector(".checkout-auto-note")),xe("register-action").hidden=!1),km(H,Yf,l,(h=H.feedback)==null?void 0:h.changeDirection),n&&H.phase==="total"){const v=xe("total-input");v.focus({preventScroll:!0}),v.setSelectionRange(n.start,n.end,n.direction)}if(e){const v=[...xe("pos-register").querySelectorAll(`[${e}]`)].find(m=>m.getAttribute(e)===t);v&&!v.disabled?v.focus({preventScroll:!0}):e==="data-remove-value"?(f=xe("change-preview").querySelector("[data-remove-value], [data-action=change]"))==null||f.focus({preventScroll:!0}):e==="data-scan-group"&&((g=xe("pos-register").querySelector("[data-scan]:not(:disabled), #total-input"))==null||g.focus({preventScroll:!0}))}Bn.render(!0),ki.paint(!0),xe("sound").classList.toggle("muted",!ni),xe("sound").setAttribute("aria-label",ni?"Turn sound off":"Turn sound on"),xe("sound").setAttribute("aria-pressed",String(ni)),xe("sound").title="Kokoro character voices and sound effects"}function hn(i,e){var s,r,a,o,l,c,d,u,h,f;if(!["restart","finish"].includes(e)){if(Sn.tick(),H.phase==="finished")return;if(Sn.info().expired){e==="next"&&H.phase==="success"&&Go();return}}const t=H;if(i===t)return;Bn.tick(),e==="restart"?(hi=Yh(),jt=null,Do=!1,Sn.reset(Ps),mi.cancel()):i.order!==t.order&&(jt=null);const n=i.phase==="success"&&t.phase!=="success";if(n&&(jt=qh(Bn.info(),Bi),hi=Sm(hi,`${i.levelId}:${i.round}:${i.order.id}`,jt)),Yf=t.phase==="drawer"&&i.phase==="change",H=i,H.phase!==t.phase&&(Zn=""),n?(Uo++,Sa(),ws(jt.delta<0?"too-much":"success")):e==="scan"&&H.scanned.length>t.scanned.length?ws("scan"):e==="open-drawer"?ws("drawer"):(e==="accept"||e==="money")&&ws("key"),(H.order!==t.order||H.phase!==t.phase&&["success","finished"].includes(H.phase))&&fi.cancel(),(H.phase!=="change"||!((s=H.feedback)!=null&&s.changeDirection))&&((r=$e==null?void 0:$e.reactToChange)==null||r.call($e,null)),(H.phase!=="total"||!((a=H.feedback)!=null&&a.totalDirection))&&((o=$e==null?void 0:$e.reactToTotal)==null||o.call($e,null)),ki.sync(t,H),Sn.sync(t,H),t.sceneId!==H.sceneId?sp():$e==null||$e.setState(H),Bn.sync(t,H),(l=$e==null?void 0:$e.setEmotion)==null||l.call($e,ls()),_a(),Jr(((c=H.feedback)==null?void 0:c.text)||Yl()[1]),(n||t.phase==="unload"&&H.phase==="scan")&&mi.play(ls()),n&&(wm(),Jr(`${H.order.customer.name} served. ${jt.label}: ${tu(jt.delta)} points. Shift score: ${hi.points} points.`)),e==="total"&&H.phase==="total"&&((d=H.feedback)!=null&&d.totalDirection)?(Lm(H.feedback.totalDirection),os({force:!0,totalDirection:H.feedback.totalDirection}),(u=$e==null?void 0:$e.reactToTotal)==null||u.call($e,H.feedback.totalDirection),Jr(`${H.order.customer.name} says: ${dr(H.feedback.totalDirection)}`)):e==="change"&&H.phase==="change"&&((h=H.feedback)!=null&&h.changeDirection)?(Dm(H.feedback.changeDirection),os({force:!0,changeDirection:H.feedback.changeDirection}),(f=$e==null?void 0:$e.reactToChange)==null||f.call($e,H.feedback.changeDirection),Jr(`${H.order.customer.name} says: ${ur(H.feedback.changeDirection)}`)):os(),H.phase!==t.phase&&(matchMedia("(max-width: 700px)").matches&&(H.phase==="change"?xe("change-preview"):["unload","scan"].includes(H.phase)?document.querySelector(".cashier-app"):document.querySelector(".register")).scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"}),!["unload","scan"].includes(H.phase))){const g=xe("pos-register").querySelector("#total-input, #register-content .primary-button, #register-action .primary-button, #change-preview .primary-button");g&&e!=="scan"&&!g.disabled&&g.focus({preventScroll:!0})}}function np(i){hn(Qp(H,i),"scan")}function ip(){hn(em(H),"accept")}function Cu(){hn(tm(H),"open-drawer")}function Pu(){Bn.tick(),Sn.tick(),fi.cancel(),mi.cancel(),xe("shift-duration").value=String(Ps),xe("patience-enabled").checked=Bi,xe("level-options").innerHTML=Jl.map((i,e)=>`<label class="level-option"><input type="radio" name="level" value="${i.id}" ${H.levelId===i.id?"checked":""}/><span class="level-symbol">${e+1}</span><span><strong>${qt(i.name)}</strong><small>${qt(i.description)}</small><span class="level-drawer-detail">${["Full drawer · All 11 money types","Random drawer · 2–3 types missing each customer","Random drawer · 4–5 types missing each customer"][e]}</span></span></label>`).join(""),xe("saved-stamps").textContent=`${Uo} cashier ${Uo===1?"stamp":"stamps"} earned on this device.`,xe("settings").showModal(),Bn.pauseChanged(),ki.pauseChanged(),Sn.pauseChanged()}xe("pos-register").addEventListener("input",i=>{i.target.id==="total-input"&&(Zn=i.target.value)});xe("pos-register").addEventListener("keydown",i=>{i.target.id==="total-input"&&i.key==="Enter"&&H.phase==="total"&&(i.preventDefault(),hn(Wh(H,Zn),"total"))});xe("pos-register").addEventListener("click",i=>{const e=i.target.closest("button");if(!e||e.disabled)return;if(e.dataset.scan){np(e.dataset.scan);return}if(e.dataset.key!==void 0){if(H.phase!=="total")return;const n=e.dataset.key;Zn=n==="⌫"?Zn.slice(0,-1):Zn.length<8?Zn+n:Zn,xe("total-input").value=Zn,ws("key");return}if(e.dataset.money){hn(nm(H,Number(e.dataset.money)),"money");return}if(e.dataset.remove!==void 0){hn(im(H,Number(e.dataset.remove)),"remove");return}const t=e.dataset.action;t==="unload"&&hn(jc(H),"unload"),t==="total"&&hn(Wh(H,Zn),"total"),t==="accept"&&ip(),t==="open-drawer"&&Cu(),t==="change"&&hn(rm(H),"change"),t==="clear"&&hn(sm(H),"clear"),t==="next"&&(Sn.info().expired?Go():hn($h(H),"next")),t==="restart"&&hn(Ql(H.levelId,Math.random,H.sceneId),"restart"),t==="levels"&&Pu()});xe("drawer-open").addEventListener("click",Cu);xe("sound").addEventListener("click",()=>{ni=!ni,ni?(Oo=!0,wo=""):fi.cancel(),Sa(),_a(),ni&&(ws("key"),os())});xe("music").addEventListener("click",()=>{As=!As,ga.setEnabled(As),As?(ga.unlock(),mi.unlock()):mi.cancel(),Sa()});xe("settings-open").addEventListener("click",Pu);xe("apply-level").addEventListener("click",()=>{const i=xe("settings").querySelector("input[name=level]:checked").value;Bi=xe("patience-enabled").checked,Ps=Number(xe("shift-duration").value),hn(Ql(i,Math.random,"restaurant"),"restart"),Sa(),xe("settings").close(),Bn.pauseChanged(),Sn.pauseChanged()});document.querySelector(".brand").addEventListener("click",i=>{i.preventDefault(),Pu()});xe("settings").addEventListener("click",i=>{if(i.target===xe("settings")){const e=xe("settings").getBoundingClientRect();(i.clientX<e.left||i.clientX>e.right||i.clientY<e.top||i.clientY>e.bottom)&&xe("settings").close()}});_a();async function sp(){var a,o,l;const i=++ql,e=H.sceneId;$e==null||$e.dispose(),$e=void 0,Eo=!1;const t=document.createElement("div");t.className="scene-mount";const n=document.createElement("div");n.id="world-loading",n.className="world-loading",n.innerHTML=`${on.sun}<strong>Opening ${qt(sa())}…</strong><span>Warming up the kitchen</span>`,xe("world").replaceChildren(t,n),xe("world").classList.remove("scene-unavailable"),xe("scene-status").textContent=`Loading ${sa()}`;const s=()=>i===ql&&e===H.sceneId,r=c=>{s()&&(Eo=!0,n.remove(),xe("world").classList.add("scene-unavailable"),xe("scene-status").textContent="3D unavailable · register controls still work",console.warn("Cashier view:",c),H.phase==="unload"?hn(jc(H),"unload"):_a())};try{const c=await JS(t,{sceneId:e,onScan:u=>{s()&&np(u)},onUnloadComplete:()=>{s()&&hn(jc(H),"unload")},onAcceptPayment:()=>{s()&&ip()},onOpenDrawer:()=>{s()&&Cu()},onReady:()=>{s()&&(Eo=!1,xe("world").classList.remove("scene-unavailable"),n.remove(),xe("scene-status").textContent="Fresh food. Friendly faces.",_a())},onError:r});if(!s()){c.dispose();return}$e=c,$e.setState(H),(a=$e.setPatience)==null||a.call($e,Bi?Bn.info().mood:"calm"),(o=$e.setEmotion)==null||o.call($e,ls());const d=fi.info();(l=$e.setSpeech)==null||l.call($e,{active:d.speechActive,boundary:d.speechBoundary,character:d.character,mood:d.mood})}catch(c){r(c)}}sp();window.addEventListener("pagehide",()=>{ql++,Bn.dispose(),ki.dispose(),Sn.dispose(),fi.dispose(),mi.dispose(),$e==null||$e.dispose(),ga.dispose(),document.removeEventListener("visibilitychange",Qf),document.removeEventListener("pointerdown",Fo),document.removeEventListener("keydown",Fo),Li==null||Li.close()},{once:!0});
