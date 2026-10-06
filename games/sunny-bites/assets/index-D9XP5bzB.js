(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const ql=300*1e3,Ph=Object.freeze([3,5,10].map(i=>Object.freeze({minutes:i,durationMs:i*60*1e3,label:`${i} minutes`}))),Gu=i=>Number.isSafeInteger(i)&&i>0?i:ql;function wp({durationMs:i=ql,getState:e=()=>({phase:"unload"}),isPaused:t=()=>!1,onExpire:n=()=>{},onUpdate:s=()=>{},now:r=()=>performance.now()}={}){let a=Gu(i),o=0,l=!1,c=!1,u=!1,d=e().phase,h=0,f=null,g="",v=0,m=!!t();const p=()=>{const M=r();return Number.isFinite(M)?Math.max(h,M):h};h=p();function E(){const M=l&&!c&&!u&&d!=="finished",N=M&&!!t(),B=Math.max(0,a-o);return{durationMs:a,elapsedMs:o,remainingMs:B,remainingSeconds:Math.ceil(B/1e3),ratio:B/a,started:l,expired:c,paused:N,running:M&&!N,disposed:u}}function T(M=!1){const N=E(),B=`${N.remainingSeconds}:${N.started}:${N.expired}:${N.paused}:${N.running}`;(M||B!==g)&&(g=B,s(N))}function x(){clearInterval(f),f=null}function R(M=!1){if(u)return;const N=p(),B=!!t();if(l&&!c&&d!=="finished"&&!m&&(!B||M)&&(o=Math.min(a,o+N-h)),h=N,m=B,l&&!c&&o>=a){c=!0,x();const H=v,Y=E();T(!0),!u&&H===v&&n(Y)}else T()}function C(){return R(),E()}function L(M,N){if(u)return E();const B=v,H=c;return R(),u||v!==B||!H&&c||(d=(N==null?void 0:N.phase)??e().phase,!l&&d==="scan"&&(l=!0,h=p(),m=!!t(),f=setInterval(C,100)),d==="finished"&&x(),T(!0)),E()}function O(){return R(!0),E()}function b(M=a){return u||(v+=1,x(),a=Gu(M),o=0,l=!1,c=!1,d="unload",h=p(),m=!!t(),g="",T(!0)),E()}return{info:E,tick:C,sync:L,pauseChanged:O,reset:b,dispose(){u||(u=!0,v+=1,x())}}}const Yl=Object.freeze({happy:[[72,0,.34,.034],[76,.17,.35,.036],[79,.34,.44,.036],[84,.58,.72,.029],[60,.58,.8,.015,"sine"]],restless:[[67,0,.36,.029],[72,.26,.39,.03],[69,.55,.44,.027],[67,.86,.62,.023]],impatient:[[74,0,.4,.03],[72,.29,.42,.029],[69,.58,.45,.027],[67,.9,.62,.023]],exhausted:[[67,0,.5,.025,"sine"],[64,.37,.54,.023,"sine"],[60,.78,.8,.02,"sine"]],relieved:[[64,0,.44,.026,"sine"],[67,.28,.47,.028],[72,.6,.82,.025],[60,.6,.82,.012,"sine"]],tired:[[64,0,.5,.022,"sine"],[62,.38,.54,.021,"sine"],[60,.8,.78,.019,"sine"]],"shift-end":[[72,0,.32,.032],[76,.17,.34,.034],[79,.34,.42,.034],[84,.61,.8,.03],[76,.61,.8,.015,"sine"],[60,.61,.92,.012,"sine"]]});Object.freeze(Object.keys(Yl));const Ih=i=>typeof i=="string"&&Object.hasOwn(Yl,i),Rp=i=>440*2**((i-69)/12);function Lh(i,e){i.oscillator.onended=null;try{i.gain.gain.cancelScheduledValues(e),i.gain.gain.setValueAtTime(0,e),i.oscillator.stop(e)}catch{}i.oscillator.disconnect(),i.gain.disconnect()}function Cp(i,e,t,n=i.currentTime,s=()=>{}){if(!Ih(t))return[];const r=[];try{for(const[a,o,l,c,u="triangle"]of Yl[t]){const d=i.createOscillator(),h=i.createGain(),f={oscillator:d,gain:h};r.push(f);const g=n+o;d.type=u,d.frequency.value=Rp(a),h.gain.setValueAtTime(0,g),h.gain.linearRampToValueAtTime(c,g+.025),h.gain.exponentialRampToValueAtTime(1e-4,g+l),h.gain.linearRampToValueAtTime(0,g+l+.025),d.connect(h).connect(e),d.onended=()=>{d.disconnect(),h.disconnect(),s(f)},d.start(g),d.stop(g+l+.03)}return r}catch(a){for(const o of r)Lh(o,i.currentTime);throw a}}function Pp({isEnabled:i=()=>!0,isPaused:e=()=>!1,onStateChange:t=()=>{}}={}){var N;const n=globalThis.AudioContext||globalThis.webkitAudioContext,s=globalThis.document;let r,a=!1,o=!1,l=0,c=null,u=null,d="idle",h=null,f=0,g=0,v=0;const m=new Set,p=()=>!a&&!!(typeof i=="function"?i():i),E=()=>!!(s!=null&&s.hidden||(typeof e=="function"?e():e)),T=()=>p()?E()?"paused":null:"muted",x=()=>({enabled:p(),paused:E(),disposed:a,unlocked:o,mood:c,pendingMood:u,status:d,playing:d==="playing"&&(r==null?void 0:r.state)==="running"&&m.size>0,activeVoices:m.size,playCount:f,scheduledCount:g,cancelCount:v,contextState:(r==null?void 0:r.state)??"not-started",error:h}),R=()=>t(x());function C(B="cancelled"){l++,(m.size||u||d==="resuming")&&v++,u=null;for(const H of m)Lh(H,r.currentTime);m.clear(),d=B}function L(){return n?((!r||r.state==="closed")&&(r=new n),r):(d="unavailable",R(),null)}async function O(B,H){try{const Y=L();if(!Y||(d="resuming",R(),await Y.resume(),a||H!==l))return;const J=T();if(J){C(J),R();return}if(Y.state!=="running")throw new Error("Music cue could not start.");Cp(Y,Y.destination,B,Y.currentTime+.015,se=>{m.delete(se),!(a||H!==l)&&(m.size||(d="ended",R()))}).forEach(se=>m.add(se)),g++,d="playing",R()}catch(Y){if(a||H!==l)return;C("error"),h=(Y==null?void 0:Y.message)||"Music cues are unavailable.",R()}}async function b(B){try{const H=L();if(!H||(await H.resume(),a||B!==l))return;const Y=T();if(Y){C(Y),R();return}if(H.state!=="running")throw new Error("Music cue could not start.");d="idle",R()}catch(H){if(a||B!==l)return;d="error",h=(H==null?void 0:H.message)||"Music cues are unavailable.",R()}}function M(){s!=null&&s.hidden&&(C("paused"),R())}return(N=s==null?void 0:s.addEventListener)==null||N.call(s,"visibilitychange",M),{info:x,play(B){if(a||!Ih(B))return x();C("idle"),c=B,h=null;const H=T();return H?(d=H,R(),x()):(f++,o?(O(B,l),x()):(u=B,d="locked",R(),x()))},unlock(){if(a)return x();const B=T();if(B)return C(B),R(),x();if(o=!0,u){const H=u;u=null,O(H,++l)}else!["playing","resuming"].includes(d)&&(r==null?void 0:r.state)!=="running"&&(d="resuming",b(++l));return R(),x()},cancel(){return a||(C(T()||"cancelled"),R()),x()},dispose(){var B;a||(C("disposed"),a=!0,(B=s==null?void 0:s.removeEventListener)==null||B.call(s,"visibilitychange",M),r&&r.state!=="closed"&&r.close().catch(()=>{}),R())}}}const Ip=60/108/2,Lp=[[76,null,79,81,null,79,76,null],[74,null,76,79,null,76,72,null],[72,74,76,null,79,null,76,74],[71,null,74,76,null,74,71,null],[76,null,79,84,null,81,79,null],[77,null,76,74,null,72,74,null],[72,76,null,79,77,null,76,74],[71,null,74,null,72,null,null,null]],Dp=[[60,64,67,71],[57,60,64,67],[53,57,60,64],[55,59,62,65],[60,64,67,71],[53,57,60,64],[62,65,69,72],[55,59,62,65]],Np=[36,33,29,31,36,29,38,31],Up=i=>440*2**((i-69)/12),Wu=new WeakMap;function Na(i,e,t,n,s,r,a,o){const l=i.createOscillator(),c=i.createGain();l.type=a,l.frequency.value=Up(t),c.gain.setValueAtTime(0,n),c.gain.linearRampToValueAtTime(r,n+.012),c.gain.exponentialRampToValueAtTime(1e-4,n+s),l.connect(c).connect(e),l.onended=()=>{l.disconnect(),c.disconnect(),o==null||o(l,!1)},o==null||o(l,!0),l.start(n),l.stop(n+s+.02)}function Op(i,e,t,n){let s=Wu.get(i);if(!s){s=i.createBuffer(1,Math.ceil(i.sampleRate*.055),i.sampleRate);const l=s.getChannelData(0);let c=87241;for(let u=0;u<l.length;u++)c=Math.imul(c,1664525)+1013904223>>>0,l[u]=(c/4294967296*2-1)*(1-u/l.length);Wu.set(i,s)}const r=i.createBufferSource(),a=i.createBiquadFilter(),o=i.createGain();r.buffer=s,a.type="highpass",a.frequency.value=4200,o.gain.value=.016,r.connect(a).connect(o).connect(e),r.onended=()=>{r.disconnect(),a.disconnect(),o.disconnect(),n==null||n(r,!1)},n==null||n(r,!0),r.start(t)}function Fp(i,e,t,n,s){const r=Math.floor(t/8)%8,a=t%8,o=Lp[r][a];o!==null&&(Na(i,e,o,n,.42,.14,"sine",s),Na(i,e,o+12,n,.13,.02,"sine",s)),(a===0||a===4)&&Na(i,e,Np[r]+(a===4?7:0),n,.45,.07,"triangle",s),(a===2||a===6)&&Dp[r].forEach((l,c)=>Na(i,e,l,n+c*.012,.26,.022,"triangle",s)),a%2&&Op(i,e,n,s)}function Bp({enabled:i=!0,onStateChange:e=()=>{}}={}){let t,n,s,r,a=!1,o=!1,l=!1,c=0,u=0,d=0,h=0,f=null;const g=new Set,v=(C,L)=>L?g.add(C):g.delete(C),m=()=>({enabled:i,unlocked:a,playing:o&&(t==null?void 0:t.state)==="running",contextState:(t==null?void 0:t.state)??"not-started",scheduledSteps:h,activeVoices:g.size,error:f}),p=()=>e(m());function E(){if(!(!o||!t||document.hidden))for(u<t.currentTime-.1&&(u=t.currentTime+.035);u<t.currentTime+.16;)Fp(t,n,d++,u,v),u+=Ip,h++}function T(){o=!1;const C=++c;if(clearInterval(s),clearTimeout(r),t&&t.state!=="closed"){n.gain.cancelScheduledValues(t.currentTime),n.gain.setTargetAtTime(0,t.currentTime,.015);for(const L of g)try{L.stop(t.currentTime+.05)}catch{}r=setTimeout(()=>{C===c&&!o&&t.state!=="closed"&&t.suspend().then(p).catch(()=>{})},70)}p()}async function x(){if(l||!i||!a||document.hidden||o)return;clearTimeout(r);const C=++c;try{if(!t){const L=window.AudioContext||window.webkitAudioContext;t=new L,n=t.createGain(),n.gain.value=0,n.connect(t.destination)}if(await t.resume(),l||C!==c||!i||document.hidden)return;f=null,o=!0,n.gain.cancelScheduledValues(t.currentTime),n.gain.setTargetAtTime(.28,t.currentTime,.07),u=t.currentTime+.035,E(),clearInterval(s),s=setInterval(E,90),p()}catch(L){f=L.message,o=!1,p()}}function R(){document.hidden?T():x()}return document.addEventListener("visibilitychange",R),{info:m,unlock(){l||(a=!0,x())},setEnabled(C){i=!!C,i?x():T(),p()},dispose(){l=!0,o=!1,c++,clearInterval(s),clearTimeout(r),document.removeEventListener("visibilitychange",R);for(const C of g)try{C.stop()}catch{}g.clear(),t&&t.state!=="closed"&&t.close().catch(()=>{})}}}const Dh=Object.freeze([{id:"burger",name:"Classic burger",emoji:"🍔",color:"#deaa64",category:"burgers"},{id:"icecream",name:"Ice cream",emoji:"🍦",color:"#f2b5c9",category:"treats"},{id:"smoothie",name:"Smoothie",emoji:"🥤",color:"#db87a4",category:"treats"},{id:"fries",name:"Fries",emoji:"🍟",color:"#eac151",category:"sides"},{id:"pizza",name:"Pizza",emoji:"🍕",color:"#eebd70",category:"sides"},{id:"donut",name:"Donut",emoji:"🍩",color:"#c98a64",category:"bakery"},{id:"doubleburger",name:"Double cheeseburger",emoji:"🍔",color:"#c88b43",category:"burgers"},{id:"chickenburger",name:"Chicken burger",emoji:"🍔",color:"#e8ba70",category:"burgers"},{id:"veggieburger",name:"Veggie burger",emoji:"🍔",color:"#86ae63",category:"burgers"},{id:"espresso",name:"Espresso",emoji:"☕",color:"#805643",category:"coffee"},{id:"latte",name:"Latte",emoji:"☕",color:"#c39b74",category:"coffee"},{id:"cappuccino",name:"Cappuccino",emoji:"☕",color:"#dac2a0",category:"coffee"},{id:"croissant",name:"Croissant",emoji:"🥐",color:"#dba252",category:"bakery"},{id:"muffin",name:"Blueberry muffin",emoji:"🧁",color:"#a38bac",category:"bakery"},{id:"cinnamonroll",name:"Cinnamon roll",emoji:"🥮",color:"#cc9167",category:"bakery"},{id:"spaghetti",name:"Spaghetti",emoji:"🍝",color:"#e1b953",category:"pasta"},{id:"penne",name:"Penne pasta",emoji:"🍝",color:"#e1a35c",category:"pasta"}].map(Object.freeze)),kp=Object.freeze([["burgers"],["coffee"],["bakery"],["pasta"],["treats","sides"]].map(Object.freeze)),Kl=Object.freeze([{id:"starter",name:"Starter",description:"Add prices, multiply matching pairs, and count whole dollars with a full drawer.",itemsLabel:"2 items · pairs · full drawer"},{id:"shopkeeper",name:"Shopkeeper",description:"Multiply pairs and triples and give dollar change. Each customer has a new drawer with two or three money types missing.",itemsLabel:"3 items · pairs & triples · 2–3 missing"},{id:"expert",name:"Money master",description:"Multiply matching items and practise dollars and cents. Each customer has a new drawer with four or five money types missing.",itemsLabel:"3–4 items · multiplication & cents · 4–5 missing"}].map(Object.freeze)),Xn=Object.freeze([{cents:1e4,label:"$100",kind:"note",color:"#98cba7"},{cents:5e3,label:"$50",kind:"note",color:"#efce70"},{cents:2e3,label:"$20",kind:"note",color:"#eca878"},{cents:1e3,label:"$10",kind:"note",color:"#9bc5e6"},{cents:500,label:"$5",kind:"note",color:"#d5b0d6"},{cents:200,label:"$2",kind:"coin",color:"#e9c865"},{cents:100,label:"$1",kind:"coin",color:"#e9c865"},{cents:50,label:"50c",kind:"coin",color:"#cbd2d7"},{cents:20,label:"20c",kind:"coin",color:"#cbd2d7"},{cents:10,label:"10c",kind:"coin",color:"#cbd2d7"},{cents:5,label:"5c",kind:"coin",color:"#cbd2d7"}].map(Object.freeze)),Nh=5,zp=1e3,Xu=30,Hp=Object.freeze([{name:"Benny Bear",emoji:"🐻",kind:"bear",greeting:"Hello! My food smells delicious. Can you check my order?"},{name:"Poppy Bunny",emoji:"🐰",kind:"bunny",greeting:"I am ready for a tasty lunch. Thank you!"},{name:"Felix Fox",emoji:"🦊",kind:"fox",greeting:"Hello, cashier! Could you add up my food order?"},{name:"Pip Penguin",emoji:"🐧",kind:"penguin",greeting:"What a lovely place for a snack. Here is my order!"},{name:"Coco Cat",emoji:"🐱",kind:"cat",greeting:"My friends and I are sharing a meal. Can you help me pay?"}].map(Object.freeze)),$c=Object.freeze([{id:"restaurant",name:"Sunny Bites",description:"Serve food to friendly animal customers.",catalog:Dh,customers:Hp}].map(Object.freeze)),Vp=Object.freeze([]);function Gp(i){const e=[];function t(n,s){if(s.length===i){const r=new Set(s);e.push({missing:s,available:Xn.map(({cents:a})=>a).filter(a=>!r.has(a))});return}for(let r=n;r<=Xn.length-(i-s.length);r+=1)t(r+1,[...s,Xn[r].cents])}return t(0,[]),e}const Wp=new Map([2,3,4,5].map(i=>[i,Gp(i)]));function Uh(i){return Kl.some(({id:e})=>e===i)?i:"starter"}function jl(i){return $c.find(({id:e})=>e===i)??$c[0]}function ta(i){const e=(i==null?void 0:i.order)??i;if(!Array.isArray(e==null?void 0:e.drawerDenominations))return Xn;const t=new Set(e.drawerDenominations);return Object.freeze(Xn.filter(({cents:n})=>t.has(n)))}function Uo(i){const e=(i==null?void 0:i.order)??i;if(!Array.isArray(e==null?void 0:e.drawerDenominations))return Vp;const t=new Set(e.drawerDenominations);return Object.freeze(Xn.filter(({cents:n})=>!t.has(n)))}function Oh(i,e){return ta(i).some(t=>t.cents===e)}function Ri(i,e,t){const n=Number(t()),s=Number.isFinite(n)?Math.min(1-Number.EPSILON,Math.max(0,n)):0;return i+Math.floor(s*(e-i+1))}function Xp(i,e){if(i===0)return!0;const t=i/5,n=e.filter(r=>r<=i).map(r=>r/5),s=new Uint8Array(t+1).fill(Xu+1);s[0]=0;for(let r=1;r<=t;r+=1)for(const a of n)a<=r&&(s[r]=Math.min(s[r],s[r-a]+1));return s[t]<=Xu}function $p(i,e,t,n){if(i==="starter")return Object.freeze(Xn.map(({cents:d})=>d));const s=i==="expert"?Ri(4,5,n):Ri(2,3,n),r=Wp.get(s),a=e>0?Math.min(e,500):500,o=d=>d.missing.some(h=>h<=a),l=r.filter(o),c=new Set,u=d=>c.has(d)?!1:(c.add(d),Xp(e,d.available));for(let d=0;d<16&&l.length;d+=1){const h=l[(Ri(0,l.length-1,n)+t)%l.length];if(u(h))return Object.freeze([...h.available])}for(const d of[l,r])for(const h of d)if(u(h))return Object.freeze([...h.available]);throw new Error("No solvable drawer for this order.")}function Mn(i,e){return{type:i,text:e}}function qp(i){return i.selectedMoney.reduce((e,t)=>e+t,0)}function Fh(i){return i.order.items.every(({lineId:e})=>i.scanned.includes(e))}function Yp(i,e,t){const n=e%Nh;return i==="starter"?n%2===0?[2]:[1,1]:n===1?Array(t).fill(1):n===2||n===4?t===4?[3,1]:[3]:n===3&&t===4?[2,2]:t===4?[2,1,1]:[2,1]}function Ot(i){if(!Number.isSafeInteger(i))throw new TypeError("Money must be safe integer cents.");const e=Math.abs(i);return`${i<0?"-":""}$${Math.floor(e/100)}.${String(e%100).padStart(2,"0")}`}function Bh(i){if(typeof i!="string")return null;const e=/^\$?(\d+)(?:\.(\d{1,2}))?$/.exec(i.trim());if(!e)return null;const n=Number(e[1])*100+Number((e[2]||"").padEnd(2,"0"));return Number.isSafeInteger(n)?n:null}function kh(i,e=0,t=Math.random,n="restaurant"){const s=Uh(i),r=jl(n),a=Number.isSafeInteger(e)&&e>=0?e:0,o=s==="starter"&&a===0,l=s==="starter"?2:s==="expert"?Ri(3,4,t):3,c=[...r.catalog],u=`${r.id}-${s}-${a}`,d=[];for(const p of Yp(s,a,l)){const E=kp[a%Nh],T=c.filter(({category:O})=>d.length===0?E.includes(O):O!==d[0].category),x=T[Ri(0,T.length-1,t)],R=c.indexOf(x),C=c.splice(R,1)[0],L=o?200:s==="starter"?Ri(1,5,t)*100:s==="shopkeeper"?Ri(1,8,t)*100:Ri(20,160,t)*5;for(let O=0;O<p;O+=1)d.push({lineId:`${u}-${d.length}`,productId:C.id,name:C.name,emoji:C.emoji,color:C.color,...C.category?{category:C.category}:{},priceCents:L})}const h=d.reduce((p,E)=>p+E.priceCents,0),f=(s==="starter"?[500,1e3,2e3]:[500,1e3,2e3,5e3]).filter(p=>p>=h),g=Ri(0,Math.min(1,f.length-1),t),v=o?1e3:f[g],m=v-h;return{id:u,sceneId:r.id,customer:{...r.customers[a%r.customers.length]},items:d,totalCents:h,paidCents:v,changeCents:m,drawerDenominations:$p(s,m,a,t)}}function Jl(i="starter",e=Math.random,t="restaurant"){const n=Uh(i),s=jl(t);return{levelId:n,sceneId:s.id,round:0,phase:"unload",order:kh(n,0,e,s.id),scanned:[],answer:"",selectedMoney:[],paymentAccepted:!1,drawerOpened:!1,feedback:null,completed:0,attempts:{total:0,change:0}}}function qc(i){return i.phase!=="unload"?i:{...i,phase:"scan",feedback:Mn("info",`${i.order.customer.name}'s food is ready at the counter. Check each item to build the bill.`)}}function Kp(i,e){if(i.phase!=="scan"||i.scanned.includes(e))return i;const t=i.order.items.find(r=>r.lineId===e);if(!t)return i;const n=[...i.scanned,e],s=n.length===i.order.items.length;return{...i,scanned:n,phase:s?"total":"scan",feedback:s?Mn("success","Everything is scanned! Multiply matching food items by their unit price, then add the groups."):Mn("info",`${t.name} scanned for ${Ot(t.priceCents)}. Scan the next food item!`)}}function zh(i,e){if(i.phase!=="total"||!Fh(i))return i;const t=typeof e=="string"?e:"",n=Bh(t),s={...i.attempts,total:i.attempts.total+1};return n===null?{...i,answer:t,attempts:s,feedback:Mn("try","Type a money amount using digits, with up to two digits after a decimal point. You can try again!")}:n!==i.order.totalCents?{...i,answer:t,attempts:s,feedback:Mn("try","Check each quantity × price, then add the groups and try again.")}:{...i,answer:t,attempts:s,phase:"payment",feedback:Mn("success",`That is right! The total is ${Ot(n)}. ${i.order.customer.name} offers ${Ot(i.order.paidCents)}. Take the payment before choosing the change.`)}}function jp(i){return i.phase!=="payment"||i.paymentAccepted||!Fh(i)||Bh(i.answer)!==i.order.totalCents?i:{...i,phase:"drawer",paymentAccepted:!0,drawerOpened:!1,feedback:Mn("success",`You have taken ${Ot(i.order.paidCents)}. Open the cash drawer, then count out the change for ${i.order.customer.name}.`)}}function Jp(i){return i.phase!=="drawer"||!i.paymentAccepted||i.drawerOpened?i:{...i,phase:"change",drawerOpened:!0,feedback:Mn("info",`The cash drawer is open. Choose the notes and coins to give ${i.order.customer.name} the exact change.`)}}function Zp(i,e){if(i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened||!Oh(i,e))return i;if(i.selectedMoney.length>=zp)return{...i,feedback:Mn("info","Your change tray is full. Put some money back, or clear the tray and count again.")};const t=[...i.selectedMoney,e];return{...i,selectedMoney:t,feedback:Mn("info","Money added. Count your notes and coins. Tap picked money to put one piece back.")}}function Qp(i,e){if(i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened||!Number.isInteger(e)||e<0||e>=i.selectedMoney.length)return i;const t=i.selectedMoney.filter((n,s)=>s!==e);return{...i,selectedMoney:t,feedback:Mn("info","One piece put back. Count the notes and coins left in your tray.")}}function em(i){return i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened?i:{...i,selectedMoney:[],feedback:Mn("info","Your change tray is empty. Count up from the total to the amount paid.")}}function tm(i){if(i.phase!=="change"||!i.paymentAccepted||!i.drawerOpened||!i.selectedMoney.every(n=>Oh(i,n)))return i;const e=qp(i),t={...i.attempts,change:i.attempts.change+1};if(e!==i.order.changeCents){const n=e<i.order.changeCents;return{...i,attempts:t,feedback:{...Mn("try",`That is ${n?"a little short":"a little too much"}. Count up from ${Ot(i.order.totalCents)} to ${Ot(i.order.paidCents)}, then try again.`),changeDirection:n?"too-little":"too-much"}}}return{...i,attempts:t,phase:"success",drawerOpened:!1,completed:i.completed+1,feedback:Mn("success",`Correct change! Thank you for helping ${i.order.customer.name}. You earned a service stamp!`)}}function Hh(i,e=Math.random){if(i.phase!=="success")return i;const t=i.round+1,n=jl(i.sceneId);return{...i,sceneId:n.id,round:t,phase:"unload",order:kh(i.levelId,t,e,n.id),scanned:[],answer:"",selectedMoney:[],paymentAccepted:!1,drawerOpened:!1,feedback:null,attempts:{total:0,change:0}}}function nm(i){return i.phase==="finished"?i:{...i,phase:"finished",drawerOpened:!1,feedback:Mn("info","Time is up! Your shift is complete. See how many customers you served.")}}const im="Kokoro-82M",Zl=Object.freeze({bear:Object.freeze({voice:"am_puck",lang:"a",speed:.94,pitch:1}),bunny:Object.freeze({voice:"af_bella",lang:"a",speed:1.02,pitch:1}),fox:Object.freeze({voice:"am_fenrir",lang:"a",speed:1,pitch:1}),penguin:Object.freeze({voice:"af_sarah",lang:"a",speed:.96,pitch:1}),cat:Object.freeze({voice:"af_nicole",lang:"a",speed:.98,pitch:1})}),$u=Object.freeze({"too-little":"That is too little change. Please add some more.","too-much":"That is too much change. Please take some back."}),Yc=Object.freeze({bear:{restless:"My tummy is starting to rumble…",impatient:"Oh dear, my food is getting cold.",exhausted:"That was a very long wait for a hungry bear.",happy:"Wonderful! A big bear thank-you!",relieved:"Phew! Lunch at last. Thank you!",tired:"Thanks. This bear needs lunch and a rest."},bunny:{restless:"My paws are getting a little fidgety…",impatient:"Could we hop along a bit faster, please?",exhausted:"My ears have drooped. I’ve waited so long.",happy:"Hooray! A happy hop for you!",relieved:"Phew! Ready to hop home. Thank you!",tired:"Thank you. I’m too tired for a happy hop."},fox:{restless:"Hmm… are we nearly ready?",impatient:"My lunch break is slipping away!",exhausted:"I really wish that had been quicker.",happy:"Lovely work, clever cashier!",relieved:"All sorted at last. Thanks!",tired:"Thanks. I’d better hurry along now."},penguin:{restless:"Waddle, waddle… still waiting!",impatient:"My flippers are getting restless.",exhausted:"That was a long time standing on these feet.",happy:"Flippers up! Thank you so much!",relieved:"Phew! Time to waddle home. Thanks!",tired:"Thanks. A slow waddle home for me."},cat:{restless:"Mrr… is my order almost ready?",impatient:"My whiskers are twitching. Please hurry!",exhausted:"I’ve waited so long I need a catnap.",happy:"Purr-fect! Thank you, cashier!",relieved:"At last! A little purr of thanks.",tired:"Thank you. Now I need a catnap."}}),sm=Object.freeze({bear:"A big bear thank-you!",bunny:"Hooray! Kisses and happy hops!",fox:"Lovely work, clever cashier!",penguin:"Flippers up! Thank you!",cat:"Purr-fect! Kisses for you!"}),rm=Object.freeze({unload:"Hello! Here’s my takeaway order.",scan:"Hello! Here’s my takeaway order.",total:"How much do I owe you?",drawer:"My change, please!",change:"My change, please!",finished:"See you on your next shift!"});function or(i){const e=typeof i=="string"?i.toLowerCase():"bear";return Object.hasOwn(Zl,e)?e:"bear"}function qu(i="bear",e="happy"){const t=or(i),n=e==="tired"||e==="exhausted"?.96:e==="impatient"||e==="restless"?1.035:1;return{character:t,...Zl[t],playbackRate:n,rate:n}}function cr(i){return typeof i=="string"&&Object.hasOwn($u,i)?$u[i]:""}function am(i,e){return Yc[or(i)][e]||Yc[or(i)].happy}function nr({phase:i,kind:e="bear",mood:t="calm",paidCents:n=1e3,emotion:s="happy",delivered:r=!1,changeCents:a=1,changeDirection:o=null}={}){const l=or(e);return i==="change"&&cr(o)?cr(o):i==="success"?r?s==="tired"?"Thank you. Time for a rest!":s==="relieved"?"Phew! Thank you so much!":sm[l]:`My ${a===0?"bag and receipt":"bag, receipt, and change"}, please!`:["scan","total","payment","drawer","change"].includes(i)&&["restless","impatient","exhausted"].includes(t)?`${i==="payment"?`Here’s ${Ot(n)}. `:""}${am(l,t)}`:i==="payment"?`Here’s ${Ot(n)}. Thank you!`:rm[i]||""}function om(i){let e=2166136261;for(let t=0;t<i.length;t+=1)e=Math.imul(e^i.charCodeAt(t),16777619);return(e>>>0).toString(16).padStart(8,"0")}function cm(i,e){return`audio/kokoro/${or(i)}/${om(e)}.mp3`}function lm(i,e,t="/"){return`${String(t||"/").replace(/\/?$/,"/")}${cm(i,e)}`}function um(i="bear"){const e=or(i),t=new Set(Object.values(Yc[e]));for(const n of["unload","scan","total","drawer","change","finished"])t.add(nr({phase:n,kind:e}));for(const n of["calm","restless","impatient","exhausted"])for(const s of[500,1e3,2e3,5e3])t.add(nr({phase:"payment",kind:e,mood:n,paidCents:s}));for(const n of["happy","relieved","tired"])t.add(nr({phase:"success",kind:e,emotion:n,delivered:!0}));for(const n of[0,1])t.add(nr({phase:"success",kind:e,changeCents:n}));for(const n of["too-little","too-much"])t.add(nr({phase:"change",kind:e,changeDirection:n}));return[...t]}const dm=Object.freeze({"too-little":[392,523.25,659.25],"too-much":[659.25,523.25,392]}),hm=new Map(Object.keys(Zl).map(i=>[i,new Set(um(i))]));function fm({isEnabled:i=()=>!0,onStateChange:e=()=>{},baseURL:t="./"}={}){const n=globalThis.Audio,s=globalThis.AudioContext||globalThis.webkitAudioContext;let r,a,o,l=[],c=!1,u=0,d=null,h="",f=0,g=0,v=0,m=0,p=0,E=0,T="idle",x="idle",R=null,C=null,L=!1,O="bear",b="happy",M="dialogue",N=qu(O,b),B=null,H=null;const Y=new Set,J=()=>!c&&!!(typeof i=="function"?i():i),te=typeof n=="function",se=()=>({enabled:J(),disposed:c,direction:d,line:h,playCount:f,dialogueCount:g,audioPlayCount:v,speechRequestCount:m,speechStartCount:p,cancelCount:E,audioActive:Y.size>0&&(r==null?void 0:r.state)==="running",audioStatus:T,audioContextState:(r==null?void 0:r.state)??"not-started",speechStatus:x,speechAvailable:te,voiceName:R,audioError:B,speechError:H,speechActive:L&&J(),speechBoundary:0,speechCharIndex:0,boundarySource:"none",character:O,mood:b,kind:M,rate:N.playbackRate,pitch:N.pitch,voiceSpeed:N.speed,engine:im,clipURL:C}),$=()=>e(se());function ve(){clearTimeout(o),o=void 0,L=!1;const Re=a;if(Re){a=void 0;for(const[Z,j]of l)Re.removeEventListener(Z,j);l=[];try{Re.pause()}catch{}try{Re.currentTime=0}catch{}try{Re.removeAttribute("src"),Re.load()}catch{}}}function Ie(){for(const Re of Y){Re.oscillator.onended=null;try{Re.gain.gain.cancelScheduledValues(r.currentTime),Re.gain.gain.setValueAtTime(0,r.currentTime),Re.oscillator.stop(r.currentTime)}catch{}Re.oscillator.disconnect(),Re.gain.disconnect()}Y.clear()}function Ue(Re="cancelled"){u+=1,(a||Y.size||T==="resuming")&&(E+=1),ve(),Ie(),T=Re,x=Re}async function at(Re,Z){if(!s){T="unavailable",$();return}try{if((!r||r.state==="closed")&&(r=new s),T="resuming",$(),await r.resume(),Re!==u||c)return;if(!J()){Ue("muted"),$();return}if(r.state!=="running")throw new Error("Audio could not start.");const j=r.currentTime+.012;for(const[we,Xe]of dm[Z].entries()){const Ae=r.createOscillator(),Ye=r.createGain(),Mt=j+we*.13,U=we===2?.28:.2;Ae.type="triangle",Ae.frequency.value=Xe,Ye.gain.setValueAtTime(0,Mt),Ye.gain.linearRampToValueAtTime(.16,Mt+.018),Ye.gain.exponentialRampToValueAtTime(1e-4,Mt+U),Ae.connect(Ye).connect(r.destination);const St={oscillator:Ae,gain:Ye};Y.add(St),Ae.onended=()=>{Y.delete(St),Ae.disconnect(),Ye.disconnect(),Re===u&&!Y.size&&(T="ended",$())},Ae.start(Mt),Ae.stop(Mt+U+.015)}v+=1,T="playing",$()}catch(j){if(Re!==u||c)return;Ie(),T="error",B=(j==null?void 0:j.message)||"Audio is unavailable.",$()}}function _t(Re){var Z;if(!te){x="unavailable",H="Kokoro recordings cannot play on this device.",$();return}if(!((Z=hm.get(O))!=null&&Z.has(h))){x="unavailable",H="This line is not in the Kokoro dialogue catalog.",$();return}try{const j=new n(C);let we=!1;a=j,j.preload="auto",j.volume=1,j.playbackRate=N.playbackRate,j.preservesPitch=!0;const Xe=()=>Re!==u||j!==a||c?!1:J()?!0:(Ue("muted"),$(),!1),Ae=(He,$e)=>{Xe()&&(ve(),x=He,H=$e,$())},Ye=(He,$e,be)=>{clearTimeout(o),o=setTimeout(()=>{Re!==u||j!==a||x!==He||Ae("unavailable",be)},$e)},Mt=(He,$e)=>{j.addEventListener(He,$e),l.push([He,$e])};Mt("playing",()=>{if(!Xe())return;we||(p+=1,we=!0),L=!0,x="speaking";const He=Number.isFinite(j.duration)?j.duration*1e3/N.playbackRate+4e3:h.length*90/N.playbackRate+5e3;Ye("speaking",Math.min(2e4,Math.max(8e3,Math.ceil(He))),"Kokoro playback did not finish on this device."),$()}),Mt("pause",()=>{Xe()&&(clearTimeout(o),o=void 0,L=!1,x="paused",$())});const U=()=>{Xe()&&(L=!1,x="buffering",Ye("buffering",8e3,"Kokoro playback stopped loading."),$())};Mt("waiting",U),Mt("stalled",()=>{(j.paused||j.readyState<3)&&U()}),Mt("ended",()=>{Xe()&&(ve(),x="ended",$())}),Mt("error",()=>{var He;return Ae("error",`Kokoro recording could not play${(He=j.error)!=null&&He.code?` (media error ${j.error.code})`:""}.`)}),x="queued",Ye("queued",5e3,"Kokoro recording did not start on this device."),m+=1;const St=j.play();Promise.resolve(St).then(()=>{if(Re!==u||j!==a||c){try{j.pause()}catch{}return}J()||(Ue("muted"),$())},He=>Ae("error",(He==null?void 0:He.message)||"Kokoro recording could not start.")),$()}catch(j){if(Re!==u||c)return;ve(),x="error",H=(j==null?void 0:j.message)||"Kokoro recording is unavailable.",$()}}function xt(Re,Z,j=null){Ue(J()?"idle":"muted"),d=j,h=Re,b=typeof(Z==null?void 0:Z.mood)=="string"?Z.mood:"happy",M=j?"wrong-change":typeof(Z==null?void 0:Z.kind)=="string"?Z.kind:"dialogue",N=qu(Z==null?void 0:Z.character,b),O=N.character,B=H=null,R=N.voice,C=lm(O,h,t)}return{info:se,play(Re,Z={}){if(c||!cr(Re))return se();if(xt(cr(Re),Z,Re),!J())return $(),se();f+=1;const j=u;return at(j,Re),_t(j),se()},speak(Re,Z={}){return c||typeof Re!="string"||!Re.trim()?se():(xt(Re.trim(),Z),J()?(g+=1,_t(u),se()):($(),se()))},cancel(){return c||(Ue(J()?"cancelled":"muted"),$()),se()},dispose(){c||(Ue("cancelled"),c=!0,r&&r.state!=="closed"&&r.close().catch(()=>{}),$())}}}const Yu=1550,Zo=4200;function pm({getState:i,isPaused:e,onAdvance:t,onUpdate:n}){let s=null,r=0,a=performance.now(),o=!1,l=null,c=!1,u="";function d(){const p=!c&&s!==null&&i().phase==="success"&&i().order===s,E=p&&e(),T=p?r<650?"printing":r<Yu?"handing-over":"departing":"idle",x=p&&r>=Yu;return{active:p,paused:E,stage:T,elapsedMs:r,remainingMs:p?Math.max(0,Zo-r):0,receiptDelivered:x,changeDelivered:x,bagDelivered:x,handoverDelivered:x}}function h(p=!1){const E=d(),T=`${E.stage}:${E.paused}:${Math.ceil(E.remainingMs/1e3)}`;(p||T!==u)&&(u=T,n==null||n(E))}function f(){clearInterval(l),l=null,s=null,r=0}function g(){if(c)return;if(!d().active){f(),h();return}const p=performance.now(),E=e();if(!E&&!o&&(r=Math.min(Zo,r+Math.max(0,p-a))),a=p,o=E,r>=Zo){f(),t();return}h()}function v(p,E){if(E.phase!=="success"){f();return}s!==E.order&&(f(),s=E.order,r=0,a=performance.now(),o=e(),u="",l=setInterval(g,50))}function m(){a=performance.now(),o=e(),h(!0)}return{info:d,sync:v,tick:g,pauseChanged:m,paint:h,dispose(){c=!0,f()}}}const mm=new Map([["Mia",15e4],["Leo",105e3],["Aunty Jo",18e4],["Sam",12e4],["Grandpa Ben",21e4],["Benny Bear",15e4],["Poppy Bunny",105e3],["Felix Fox",18e4],["Pip Penguin",12e4],["Coco Cat",21e4]]);function Ku(i,e="starter"){var s;const t=typeof((s=i==null?void 0:i.customer)==null?void 0:s.name)=="string"?i.customer.name.trim():"Customer",n=e==="expert"?6e4:e==="shopkeeper"?3e4:0;return{customerKey:`${(i==null?void 0:i.id)??"order"}:${t}`,budgetMs:(mm.get(t)??15e4)+n,elapsedMs:0}}function gm(i,e){if(!Number.isFinite(e)||e<=0||i.elapsedMs>=i.budgetMs)return i;const t=i.budgetMs-i.elapsedMs;return{...i,elapsedMs:i.elapsedMs+Math.min(e,t)}}function Vh(i){const e=Math.max(0,i.budgetMs-i.elapsedMs),t=e/i.budgetMs,n=e===0?"exhausted":t<=.2?"impatient":t<=.5?"restless":"calm";return{remainingMs:e,remainingSeconds:Math.ceil(e/1e3),ratio:t,mood:n}}function Gh(i,e=!0){if(!e)return{tier:"practice",delta:50,label:"Practice checkout"};const{ratio:t}=Vh(i);return t>.5?{tier:"fast",delta:100,label:"Speedy service"}:t>.2?{tier:"steady",delta:60,label:"Good pace"}:t>0?{tier:"close",delta:20,label:"Just in time"}:{tier:"late",delta:-25,label:"Long wait"}}function Wh(){return{points:0,results:[]}}function _m(i,e,t){return i.results.some(n=>n.customerKey===e)?i:{points:i.points+t.delta,results:[...i.results,{customerKey:e,...t}]}}const Ql=i=>`${i<0?"−":"+"}${Math.abs(i)}`,Xh=i=>String(i).replace("-","−");function $h(){return'<span class="service-preview" data-score-preview><span data-score-preview-label>Finish now</span><b data-score-preview-points></b></span>'}function vm(i){const e=Gh(i,i.enabled),t=["success","finished"].includes(i.phase),n=i.enabled?i.phase==="unload"?"Fast service":e.tier==="late"?"Late service":"Finish now":"Each checkout";for(const s of document.querySelectorAll("[data-score-preview]"))s.hidden=t,s.dataset.scoreTier=e.tier,s.querySelector("[data-score-preview-label]").textContent=n,s.querySelector("[data-score-preview-points]").textContent=`${Ql(e.delta)} pts`,s.setAttribute("aria-label",`${n}: ${e.delta<0?"lose":"earn"} ${Math.abs(e.delta)} points when this checkout is complete.`)}function ym(i){if(!i)return"";const e=i.tier==="late"?"Time ran out. Serve the next customer sooner to earn points back.":i.tier==="practice"?"Relaxed practice · no time bonus or penalty.":"Correct change, delivered on time.";return`<div class="service-result" data-score-tier="${i.tier}" role="status"><span class="service-result-symbol" aria-hidden="true">${i.delta<0?"−":"★"}</span><div><span class="service-result-label">${i.label}</span><strong class="service-points">${Ql(i.delta)} <small>points</small></strong></div><p>${e}</p></div>`}function xm(i){const e=i.results.filter(s=>s.tier==="fast").length,t=i.results.filter(s=>s.tier==="late").length,n=i.results.every(s=>s.tier==="practice");return`<div class="shift-result" data-shift-result><span>YOUR SHIFT SCORE</span><strong>${Xh(i.points)} <small>points</small></strong><p>${n?`${i.results.length} practice checkouts completed`:`${e} speedy ${e===1?"checkout":"checkouts"} · ${t} late ${t===1?"checkout":"checkouts"}`}</p></div>`}function Mm(){var i,e;matchMedia("(prefers-reduced-motion: reduce)").matches||((i=document.querySelector(".service-result"))==null||i.animate([{opacity:0,transform:"translateY(6px) scale(.97)"},{opacity:1,transform:"translateY(0) scale(1)"}],{duration:340,easing:"ease-out"}),(e=document.getElementById("shift-score"))==null||e.animate([{transform:"scale(1)"},{transform:"scale(1.12)",offset:.4},{transform:"scale(1)"}],{duration:500,easing:"ease-out"}))}const ju=new Set(["scan","total","payment","drawer","change"]),Sm={calm:"Patient",restless:"Getting restless",impatient:"Impatient",exhausted:"Very impatient"},qh='<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 5.5V10l3 2"/></svg>',bm=i=>`${Math.floor(i/60)}:${String(i%60).padStart(2,"0")}`;function Tm(){return`<div class="patience-widget" data-patience-widget><div class="patience-heading"><span data-patience-label>Patient</span><span class="patience-clock">${qh}<b data-patience-time></b></span></div><div class="patience-meter" role="meter" aria-label="Customer patience" aria-valuemin="0"><i></i></div>${$h()}</div>`}function Yh(i=""){return`<span class="patience-badge ${i}" data-patience-badge>${qh}<b data-patience-time></b><span data-patience-label>Patient</span>${$h()}</span>`}function Em({getState:i,getView:e,isEnabled:t,onMoodChange:n}){let s=Ku(i().order,i().levelId),r=performance.now(),a="",o=!1;const l=()=>{var p;return document.hidden||!!((p=document.getElementById("settings"))!=null&&p.open)};let c=l();function u(){const p=i(),E=Vh(s),T=t(),x=ju.has(p.phase),R=T&&x&&l();return{...s,...E,enabled:T,paused:R,running:T&&x&&!R&&E.remainingMs>0,phase:p.phase}}function d(){const p=u();return p.enabled&&ju.has(p.phase)?p.mood:"calm"}function h(p=!1){if(o)return;const E=u(),T=["success","finished"].includes(E.phase),x=E.enabled?T?"served":E.paused?"paused":E.phase==="unload"?"ready":E.mood:"relaxed",R={relaxed:"Relaxed",served:"Served",paused:"Paused",ready:"Ready to serve"}[x]??Sm[E.mood],C=E.enabled?T?"✓":bm(E.remainingSeconds):"∞",L=`${E.customerKey}:${x}:${C}`;if(!(!p&&L===a)){a=L;for(const O of document.querySelectorAll("[data-patience-widget], [data-patience-badge]")){O.dataset.patienceMood=d(),O.dataset.patienceStatus=x,O.querySelector("[data-patience-time]").textContent=C,O.querySelector("[data-patience-label]").textContent=R,O.setAttribute("aria-label",`${i().order.customer.name}: ${R}${E.enabled&&!T?`, ${E.remainingSeconds} seconds of patience remaining`:""}`);const b=O.querySelector(".patience-meter");b&&(b.hidden=!E.enabled||T,b.setAttribute("aria-valuemax",String(E.budgetMs/1e3)),b.setAttribute("aria-valuenow",String(E.remainingSeconds)),b.setAttribute("aria-valuetext",`${R}, ${C} remaining`),b.querySelector("i").style.width=`${E.ratio*100}%`)}vm(E)}}function f(){var R,C;if(o)return;const p=performance.now(),E=Math.max(0,p-r);r=p;const T=u();T.running&&(s=gm(s,E));const x=u();x.mood!==T.mood?((C=(R=e())==null?void 0:R.setPatience)==null||C.call(R,d()),n(x.mood),h(!0)):h()}function g(p,E){var T,x;p.order!==E.order&&(s=Ku(E.order,E.levelId),document.getElementById("patience-announcer").textContent=""),r=performance.now(),a="",(x=(T=e())==null?void 0:T.setPatience)==null||x.call(T,d())}function v(){const p=l();p!==c&&(r=performance.now()),c=p,h(!0)}const m=window.setInterval(f,250);return document.addEventListener("visibilitychange",v),document.getElementById("settings").addEventListener("close",v),{info:u,render:h,tick:f,sync:g,pauseChanged:v,dispose(){var p;o=!0,clearInterval(m),document.removeEventListener("visibilitychange",v),(p=document.getElementById("settings"))==null||p.removeEventListener("close",v)}}}const Am=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);let Kc=[];function wm(i){if(!["too-little","too-much"].includes(i)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.getElementById("pos-register"),t=(s,r,a)=>{s!=null&&s.animate&&Kc.push(s.animate(r,{duration:a,easing:"ease-out"}))},n=e.querySelector(".change-feedback-symbol");if(i==="too-little")t(n,[{transform:"translateY(0)"},{transform:"translateY(-7px)",offset:.3},{transform:"translateY(2px)",offset:.6},{transform:"translateY(0)"}],620),t(e.querySelector(".cash-drawer"),[{boxShadow:"0 0 0 0 #e7b94b00"},{boxShadow:"0 0 0 4px #e7b94ba6, 0 0 22px #e7b94b65",offset:.35},{boxShadow:"0 0 0 0 #e7b94b00"}],820);else{t(e.querySelector("#change-preview"),[{transform:"translateX(0)"},{transform:"translateX(-5px)",offset:.2},{transform:"translateX(5px)",offset:.4},{transform:"translateX(-3px)",offset:.6},{transform:"translateX(3px)",offset:.8},{transform:"translateX(0)"}],460);for(const s of e.querySelectorAll(".piece-minus"))t(s,[{transform:"scale(1)"},{transform:"scale(1.28)",offset:.45},{transform:"scale(1)"}],660)}}function Rm(){return`<div class="pos-neck" aria-hidden="true"><i></i></div>
    <div class="pos-console">
      <div class="receipt-printer" aria-label="Receipt printer"><div class="printer-paper-window"><div id="printed-receipt" class="printed-receipt" aria-hidden="true"></div></div><div class="printer-slot" aria-hidden="true"></div><div class="printer-label"><span>THERMAL RECEIPT</span><i></i></div><div class="printer-vents" aria-hidden="true"></div></div>
      <div class="hardware-keypad" aria-label="Cash register number pad">${["7","8","9","4","5","6","1","2","3","⌫","0","."].map(i=>`<button data-key="${i}" aria-label="${i==="⌫"?"Delete last digit":i==="."?"Decimal point":i}" disabled>${i==="⌫"?"⌫":i}</button>`).join("")}</div>
      <div class="console-actions"><span class="hardware-label">CASH CONTROL</span><button id="hardware-total" data-action="total" disabled><span>↵</span>ENTER</button><div class="console-indicator"><i></i><span>POWER</span></div></div>
    </div>
    <section id="change-preview" class="change-preview" aria-label="Selected change tray" hidden></section>
    <div class="drawer-cabinet"><div class="drawer-cabinet-top" aria-hidden="true"><span>SUNNY POS · T-01</span><div class="cabinet-vents"></div></div><div id="cash-tray" class="drawer-slide" hidden></div><button class="register-base" id="drawer-open" disabled aria-label="Cash drawer is closed"><span class="drawer-lock" aria-hidden="true"><i></i></span><span class="drawer-front-handle"><span id="drawer-base-label">CASH DRAWER LOCKED</span></span><span class="drawer-open-light" aria-hidden="true"></span></button><div class="register-feet" aria-hidden="true"><i></i><i></i></div></div>`}function Kh(i){return`<span class="note-country">AUSTRALIA</span><span class="note-medallion" aria-hidden="true">✦</span><strong>${i.label}</strong><small>PLAY MONEY</small><span class="note-window" aria-hidden="true"></span>`}function Cm(i){return`<div class="note-well"><button class="banknote physical-note" style="--money-color:${i.color}" data-money="${i.cents}" aria-label="Add ${i.label} note">${Kh(i)}</button><span class="note-clip" aria-hidden="true"></span><span class="well-label" aria-hidden="true">${i.label}</span></div>`}function Ju(i){return`<div class="${i.kind==="note"?"note":"coin"}-well empty-well" data-unavailable-money="${i.cents}" role="img" aria-label="${i.label} ${i.kind} unavailable for this customer"><span class="empty-slot-outline" aria-hidden="true"></span><span class="empty-slot-word" aria-hidden="true">EMPTY</span>${i.kind==="note"?'<span class="note-clip" aria-hidden="true"></span>':""}<span class="well-label" aria-hidden="true">${i.label}</span></div>`}function Pm(i){const e=Math.min(i.count,5),t=i.kind==="note"?Kh(i):`<span class="coin-rim"></span><strong>${i.label}</strong><small>AUSTRALIA</small>`,n=i.kind==="note"?"banknote physical-note":`coin physical-coin ${i.cents>=100?"gold":"silver"} ${i.cents===50?"fifty-cent":""}`;return`<span class="selected-art money-stack" data-stack-layers="${e}" style="--stack-depth:${e}" aria-hidden="true">${Array.from({length:e},(s,r)=>`<span class="piece-layer ${n}" style="--money-color:${i.color};--layer:${r}">${t}</span>`).join("")}</span>`}function Im(i,e){const t=i.selectedMoney,n=Xn.map(s=>({...s,count:t.filter(r=>r===s.cents).length,index:t.lastIndexOf(s.cents)})).filter(s=>s.count);return`<header class="change-preview-header"><div><span class="change-tray-eyebrow">COUNT, THEN HAND BACK</span><h2>Your change tray</h2><span id="selected-piece-count">${t.length} ${t.length===1?"piece":"pieces"} selected</span></div>${Yh()}</header>
    <div class="tray-calculation"><span>Cash <b>${Ot(i.order.paidCents)}</b></span><i>−</i><span>Bill <b>${Ot(i.order.totalCents)}</b></span><i>=</i><span class="tray-question">? change</span></div>
    <div class="selected-money" aria-label="Money selected for change">${n.length?n.map(s=>`<button class="change-piece ${s.kind}" data-remove="${s.index}" data-remove-value="${s.cents}" data-count="${s.count}" aria-label="Remove one ${s.label} ${s.kind}; ${s.count} selected"><span class="piece-minus" aria-hidden="true">−</span>${Pm(s)}<span class="piece-count">${s.label} <b>× ${s.count}</b></span></button>`).join(""):'<div class="empty-change-tray"><span aria-hidden="true">＋</span><strong>Your tray is empty</strong><p>Pick notes and coins from the open drawer.</p></div>'}</div>
    <footer class="change-preview-footer">${e}<div class="change-tray-tools"><span>Tap a piece to put one back</span><button class="clear-tray" data-action="clear" ${t.length?"":"disabled"}>Clear tray</button></div><button class="primary-button" data-action="change">Give the change <span aria-hidden="true">→</span></button></footer>`}function Lm(i){return`<div class="coin-well"><button class="coin physical-coin ${i.cents>=100?"gold":"silver"} ${i.cents===50?"fifty-cent":""}" data-money="${i.cents}" aria-label="Add ${i.label} coin"><span class="coin-rim" aria-hidden="true"></span><strong>${i.label}</strong><small aria-hidden="true">AUSTRALIA</small></button><span class="well-label" aria-hidden="true">${i.label}</span></div>`}function Dm(i,e,t="",n=""){var g;for(const v of Kc)v.cancel();Kc=[];const s=i.phase==="change",r=new Set(ta(i).map(v=>v.cents)),a=Uo(i),o=document.getElementById("cash-tray"),l=document.getElementById("pos-register");l.dataset.drawer=s?"open":"closed",l.dataset.phase=i.phase,s&&["too-little","too-much"].includes(n)?l.dataset.changeFeedback=n:delete l.dataset.changeFeedback,o.hidden=!s,o.classList.toggle("just-opened",s&&e),o.innerHTML=s?`<div class="cash-drawer" data-drawer-level="${i.levelId}"><div class="drawer-label"><span>CHOOSE THE EXACT CHANGE</span><span>${r.size} MONEY TYPES · AUD</span></div>${a.length?`<div class="drawer-challenge" data-drawer-challenge><span><b>EMPTY:</b> ${a.map(v=>v.label).join(" · ")}</span><strong>Find another combination</strong></div>`:""}<div class="banknotes">${Xn.filter(v=>v.kind==="note").map(v=>r.has(v.cents)?Cm(v):Ju(v)).join("")}</div><div class="coins">${Xn.filter(v=>v.kind==="coin").map(v=>r.has(v.cents)?Lm(v):Ju(v)).join("")}</div></div>`:"";const c=document.getElementById("change-preview"),u=((g=c.querySelector(".selected-money"))==null?void 0:g.scrollTop)??0;c.hidden=!s,c.innerHTML=s?Im(i,t):"",l.dataset.changeFeedback?c.dataset.feedbackAttempt=String(i.attempts.change):delete c.dataset.feedbackAttempt,s&&(c.querySelector(".selected-money").scrollTop=u);for(const v of l.querySelectorAll("[data-key]"))v.disabled=i.phase!=="total";document.getElementById("hardware-total").disabled=i.phase!=="total";const d=document.getElementById("printed-receipt"),h=i.phase==="success";d.classList.toggle("receipt-printed",h);const f="SUNNY BITES";d.innerHTML=h?`<strong>${f}</strong><span>CHECKOUT 01</span><hr>${i.order.items.map(v=>`<span>${Am(v.name)} <b>${Ot(v.priceCents)}</b></span>`).join("")}<hr><span>TOTAL <b>${Ot(i.order.totalCents)}</b></span><span>CASH <b>${Ot(i.order.paidCents)}</b></span><span>CHANGE <b>CHECKED ✓</b></span><div class="receipt-barcode"></div><em>Thank you. Come again!</em>`:`<strong>${f}</strong><span>YOUR RECEIPT</span><div class="receipt-barcode"></div>`}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const eu="180",Nm=0,Zu=1,Um=2,jh=1,Jh=2,wi=3,Ni=0,Cn=1,Zn=2,is=0,sr=1,Qu=2,ed=3,td=4,Om=5,ys=100,Fm=101,Bm=102,km=103,zm=104,Hm=200,Vm=201,Gm=202,Wm=203,jc=204,Jc=205,Xm=206,$m=207,qm=208,Ym=209,Km=210,jm=211,Jm=212,Zm=213,Qm=214,Zc=0,Qc=1,el=2,lr=3,tl=4,nl=5,il=6,sl=7,Zh=0,eg=1,tg=2,ss=0,ng=1,ig=2,sg=3,Qh=4,rg=5,ag=6,og=7,nd="attached",cg="detached",ef=300,ur=301,dr=302,rl=303,al=304,Oo=306,hr=1e3,ns=1001,bo=1002,Sn=1003,tf=1004,$r=1005,Nn=1006,fo=1007,Pi=1008,mi=1009,nf=1010,sf=1011,na=1012,tu=1013,bs=1014,ei=1015,fa=1016,nu=1017,iu=1018,ia=1020,rf=35902,af=35899,of=1021,cf=1022,Wn=1023,sa=1026,ra=1027,su=1028,ru=1029,lf=1030,au=1031,ou=1033,po=33776,mo=33777,go=33778,_o=33779,ol=35840,cl=35841,ll=35842,ul=35843,dl=36196,hl=37492,fl=37496,pl=37808,ml=37809,gl=37810,_l=37811,vl=37812,yl=37813,xl=37814,Ml=37815,Sl=37816,bl=37817,Tl=37818,El=37819,Al=37820,wl=37821,Rl=36492,Cl=36494,Pl=36495,Il=36283,Ll=36284,Dl=36285,Nl=36286,aa=2300,oa=2301,Qo=2302,id=2400,sd=2401,rd=2402,lg=2500,ug=0,uf=1,Ul=2,dg=3200,hg=3201,df=0,fg=1,ts="",Wt="srgb",Tn="srgb-linear",To="linear",Ut="srgb",Ns=7680,ad=519,pg=512,mg=513,gg=514,hf=515,_g=516,vg=517,yg=518,xg=519,Ol=35044,od="300 es",fi=2e3,Eo=2001;class vr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let cd=1234567;const Yr=Math.PI/180,fr=180/Math.PI;function ni(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(hn[i&255]+hn[i>>8&255]+hn[i>>16&255]+hn[i>>24&255]+"-"+hn[e&255]+hn[e>>8&255]+"-"+hn[e>>16&15|64]+hn[e>>24&255]+"-"+hn[t&63|128]+hn[t>>8&255]+"-"+hn[t>>16&255]+hn[t>>24&255]+hn[n&255]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]).toLowerCase()}function ut(i,e,t){return Math.max(e,Math.min(t,i))}function cu(i,e){return(i%e+e)%e}function Mg(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Sg(i,e,t){return i!==e?(t-i)/(e-i):0}function Kr(i,e,t){return(1-t)*i+t*e}function bg(i,e,t,n){return Kr(i,e,1-Math.exp(-t*n))}function Tg(i,e=1){return e-Math.abs(cu(i,e*2)-e)}function Eg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Ag(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function wg(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Rg(i,e){return i+Math.random()*(e-i)}function Cg(i){return i*(.5-Math.random())}function Pg(i){i!==void 0&&(cd=i);let e=cd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ig(i){return i*Yr}function Lg(i){return i*fr}function Dg(i){return(i&i-1)===0&&i!==0}function Ng(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ug(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Og(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),d=r((e-n)/2),h=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*d,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*d,o*c);break;case"ZXZ":i.set(l*d,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Qn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Qi={DEG2RAD:Yr,RAD2DEG:fr,generateUUID:ni,clamp:ut,euclideanModulo:cu,mapLinear:Mg,inverseLerp:Sg,lerp:Kr,damp:bg,pingpong:Tg,smoothstep:Eg,smootherstep:Ag,randInt:wg,randFloat:Rg,randFloatSpread:Cg,seededRandom:Pg,degToRad:Ig,radToDeg:Lg,isPowerOfTwo:Dg,ceilPowerOfTwo:Ng,floorPowerOfTwo:Ug,setQuaternionFromProperEuler:Og,normalize:Pt,denormalize:Qn};class ze{constructor(e=0,t=0){ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class it{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3];const h=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(d!==v||l!==h||c!==f||u!==g){let m=1-o;const p=l*h+c*f+u*g+d*v,E=p>=0?1:-1,T=1-p*p;if(T>Number.EPSILON){const R=Math.sqrt(T),C=Math.atan2(R,p*E);m=Math.sin(m*C)/R,o=Math.sin(o*C)/R}const x=o*E;if(l=l*m+h*x,c=c*m+f*x,u=u*m+g*x,d=d*m+v*x,m===1-o){const R=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=R,c*=R,u*=R,d*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[a],h=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+u*d+l*f-c*h,e[t+1]=l*g+u*h+c*d-o*f,e[t+2]=c*g+u*f+o*h-l*d,e[t+3]=u*g-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),d=o(r/2),h=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"YZX":this._x=h*u*d+c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d-h*f*g;break;case"XZY":this._x=h*u*d-c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=a*d+this._w*h,this._x=n*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(e=0,t=0,n=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ld.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ld.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ec.copy(this).projectOnVector(e),this.sub(ec)}reflect(e){return this.sub(ec.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ec=new w,ld=new it;class ot{constructor(e,t,n,s,r,a,o,l,c){ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],E=s[1],T=s[4],x=s[7],R=s[2],C=s[5],L=s[8];return r[0]=a*v+o*E+l*R,r[3]=a*m+o*T+l*C,r[6]=a*p+o*x+l*L,r[1]=c*v+u*E+d*R,r[4]=c*m+u*T+d*C,r[7]=c*p+u*x+d*L,r[2]=h*v+f*E+g*R,r[5]=h*m+f*T+g*C,r[8]=h*p+f*x+g*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*r,f=c*r-a*l,g=t*d+n*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(s*c-u*n)*v,e[2]=(o*n-s*a)*v,e[3]=h*v,e[4]=(u*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(tc.makeScale(e,t)),this}rotate(e){return this.premultiply(tc.makeRotation(-e)),this}translate(e,t){return this.premultiply(tc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const tc=new ot;function ff(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ca(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Fg(){const i=ca("canvas");return i.style.display="block",i}const ud={};function la(i){i in ud||(ud[i]=!0,console.warn(i))}function Bg(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const dd=new ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hd=new ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function kg(){const i={enabled:!0,workingColorSpace:Tn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ut&&(s.r=Li(s.r),s.g=Li(s.g),s.b=Li(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ut&&(s.r=rr(s.r),s.g=rr(s.g),s.b=rr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ts?To:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return la("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return la("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Tn]:{primaries:e,whitePoint:n,transfer:To,toXYZ:dd,fromXYZ:hd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Wt},outputColorSpaceConfig:{drawingBufferColorSpace:Wt}},[Wt]:{primaries:e,whitePoint:n,transfer:Ut,toXYZ:dd,fromXYZ:hd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Wt}}}),i}const gt=kg();function Li(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function rr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Us;class zg{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Us===void 0&&(Us=ca("canvas")),Us.width=e.width,Us.height=e.height;const s=Us.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Us}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ca("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Li(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Li(t[n]/255)*255):t[n]=Li(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hg=0;class lu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hg++}),this.uuid=ni(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(nc(s[a].image)):r.push(nc(s[a]))}else r=nc(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function nc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?zg.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vg=0;const ic=new w;class tn extends vr{constructor(e=tn.DEFAULT_IMAGE,t=tn.DEFAULT_MAPPING,n=ns,s=ns,r=Nn,a=Pi,o=Wn,l=mi,c=tn.DEFAULT_ANISOTROPY,u=ts){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vg++}),this.uuid=ni(),this.name="",this.source=new lu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ic).x}get height(){return this.source.getSize(ic).y}get depth(){return this.source.getSize(ic).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ef)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hr:e.x=e.x-Math.floor(e.x);break;case ns:e.x=e.x<0?0:1;break;case bo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case hr:e.y=e.y-Math.floor(e.y);break;case ns:e.y=e.y<0?0:1;break;case bo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=ef;tn.DEFAULT_ANISOTROPY=1;class bt{constructor(e=0,t=0,n=0,s=1){bt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(c+1)/2,x=(f+1)/2,R=(p+1)/2,C=(u+h)/4,L=(d+v)/4,O=(g+m)/4;return T>x&&T>R?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=C/n,r=L/n):x>R?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=C/s,r=O/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=L/r,s=O/r),this.set(n,s,r,t),this}let E=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(d-v)/E,this.z=(h-u)/E,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this.w=ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this.w=ut(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Gg extends vr{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new tn(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Nn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new lu(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ts extends Gg{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class pf extends tn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Sn,this.minFilter=Sn,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Wg extends tn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Sn,this.minFilter=Sn,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Un{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Yn):Yn.fromBufferAttribute(r,a),Yn.applyMatrix4(e.matrixWorld),this.expandByPoint(Yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ua.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ua.copy(n.boundingBox)),Ua.applyMatrix4(e.matrixWorld),this.union(Ua)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yn),Yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Lr),Oa.subVectors(this.max,Lr),Os.subVectors(e.a,Lr),Fs.subVectors(e.b,Lr),Bs.subVectors(e.c,Lr),$i.subVectors(Fs,Os),qi.subVectors(Bs,Fs),ds.subVectors(Os,Bs);let t=[0,-$i.z,$i.y,0,-qi.z,qi.y,0,-ds.z,ds.y,$i.z,0,-$i.x,qi.z,0,-qi.x,ds.z,0,-ds.x,-$i.y,$i.x,0,-qi.y,qi.x,0,-ds.y,ds.x,0];return!sc(t,Os,Fs,Bs,Oa)||(t=[1,0,0,0,1,0,0,0,1],!sc(t,Os,Fs,Bs,Oa))?!1:(Fa.crossVectors($i,qi),t=[Fa.x,Fa.y,Fa.z],sc(t,Os,Fs,Bs,Oa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Mi=[new w,new w,new w,new w,new w,new w,new w,new w],Yn=new w,Ua=new Un,Os=new w,Fs=new w,Bs=new w,$i=new w,qi=new w,ds=new w,Lr=new w,Oa=new w,Fa=new w,hs=new w;function sc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){hs.fromArray(i,r);const o=s.x*Math.abs(hs.x)+s.y*Math.abs(hs.y)+s.z*Math.abs(hs.z),l=e.dot(hs),c=t.dot(hs),u=n.dot(hs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Xg=new Un,Dr=new w,rc=new w;class _i{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Xg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Dr.subVectors(e,this.center);const t=Dr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Dr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(rc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Dr.copy(e.center).add(rc)),this.expandByPoint(Dr.copy(e.center).sub(rc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Si=new w,ac=new w,Ba=new w,Yi=new w,oc=new w,ka=new w,cc=new w;class pa{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Si)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Si.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Si.copy(this.origin).addScaledVector(this.direction,t),Si.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ac.copy(e).add(t).multiplyScalar(.5),Ba.copy(t).sub(e).normalize(),Yi.copy(this.origin).sub(ac);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ba),o=Yi.dot(this.direction),l=-Yi.dot(Ba),c=Yi.lengthSq(),u=Math.abs(1-a*a);let d,h,f,g;if(u>0)if(d=a*l-o,h=a*o-l,g=r*u,d>=0)if(h>=-g)if(h<=g){const v=1/u;d*=v,h*=v,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ac).addScaledVector(Ba,h),f}intersectSphere(e,t){Si.subVectors(e.center,this.origin);const n=Si.dot(this.direction),s=Si.dot(Si)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Si)!==null}intersectTriangle(e,t,n,s,r){oc.subVectors(t,e),ka.subVectors(n,e),cc.crossVectors(oc,ka);let a=this.direction.dot(cc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Yi.subVectors(this.origin,e);const l=o*this.direction.dot(ka.crossVectors(Yi,ka));if(l<0)return null;const c=o*this.direction.dot(oc.cross(Yi));if(c<0||l+c>a)return null;const u=-o*Yi.dot(cc);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(e,t,n,s,r,a,o,l,c,u,d,h,f,g,v,m){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,d,h,f,g,v,m)}set(e,t,n,s,r,a,o,l,c,u,d,h,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/ks.setFromMatrixColumn(e,0).length(),r=1/ks.setFromMatrixColumn(e,1).length(),a=1/ks.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const h=a*u,f=a*d,g=o*u,v=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,g=c*u,v=c*d;t[0]=h+v*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,g=c*u,v=c*d;t[0]=h-v*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,f=a*d,g=o*u,v=o*d;t[0]=l*u,t[4]=g*c-f,t[8]=h*c+v,t[1]=l*d,t[5]=v*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*u,t[4]=v-h*d,t[8]=g*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+g,t[10]=h-v*d}else if(e.order==="XZY"){const h=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+v,t[5]=a*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($g,e,qg)}lookAt(e,t,n){const s=this.elements;return Ln.subVectors(e,t),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),Ki.crossVectors(n,Ln),Ki.lengthSq()===0&&(Math.abs(n.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),Ki.crossVectors(n,Ln)),Ki.normalize(),za.crossVectors(Ln,Ki),s[0]=Ki.x,s[4]=za.x,s[8]=Ln.x,s[1]=Ki.y,s[5]=za.y,s[9]=Ln.y,s[2]=Ki.z,s[6]=za.z,s[10]=Ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],E=n[3],T=n[7],x=n[11],R=n[15],C=s[0],L=s[4],O=s[8],b=s[12],M=s[1],N=s[5],B=s[9],H=s[13],Y=s[2],J=s[6],te=s[10],se=s[14],$=s[3],ve=s[7],Ie=s[11],Ue=s[15];return r[0]=a*C+o*M+l*Y+c*$,r[4]=a*L+o*N+l*J+c*ve,r[8]=a*O+o*B+l*te+c*Ie,r[12]=a*b+o*H+l*se+c*Ue,r[1]=u*C+d*M+h*Y+f*$,r[5]=u*L+d*N+h*J+f*ve,r[9]=u*O+d*B+h*te+f*Ie,r[13]=u*b+d*H+h*se+f*Ue,r[2]=g*C+v*M+m*Y+p*$,r[6]=g*L+v*N+m*J+p*ve,r[10]=g*O+v*B+m*te+p*Ie,r[14]=g*b+v*H+m*se+p*Ue,r[3]=E*C+T*M+x*Y+R*$,r[7]=E*L+T*N+x*J+R*ve,r[11]=E*O+T*B+x*te+R*Ie,r[15]=E*b+T*H+x*se+R*Ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*l*d-s*c*d-r*o*h+n*c*h+s*o*f-n*l*f)+v*(+t*l*f-t*c*h+r*a*h-s*a*f+s*c*u-r*l*u)+m*(+t*c*d-t*o*f-r*a*d+n*a*f+r*o*u-n*c*u)+p*(-s*o*u-t*l*d+t*o*h+s*a*d-n*a*h+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],E=d*m*c-v*h*c+v*l*f-o*m*f-d*l*p+o*h*p,T=g*h*c-u*m*c-g*l*f+a*m*f+u*l*p-a*h*p,x=u*v*c-g*d*c+g*o*f-a*v*f-u*o*p+a*d*p,R=g*d*l-u*v*l-g*o*h+a*v*h+u*o*m-a*d*m,C=t*E+n*T+s*x+r*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/C;return e[0]=E*L,e[1]=(v*h*r-d*m*r-v*s*f+n*m*f+d*s*p-n*h*p)*L,e[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*p+n*l*p)*L,e[3]=(d*l*r-o*h*r-d*s*c+n*h*c+o*s*f-n*l*f)*L,e[4]=T*L,e[5]=(u*m*r-g*h*r+g*s*f-t*m*f-u*s*p+t*h*p)*L,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*p-t*l*p)*L,e[7]=(a*h*r-u*l*r+u*s*c-t*h*c-a*s*f+t*l*f)*L,e[8]=x*L,e[9]=(g*d*r-u*v*r-g*n*f+t*v*f+u*n*p-t*d*p)*L,e[10]=(a*v*r-g*o*r+g*n*c-t*v*c-a*n*p+t*o*p)*L,e[11]=(u*o*r-a*d*r-u*n*c+t*d*c+a*n*f-t*o*f)*L,e[12]=R*L,e[13]=(u*v*s-g*d*s+g*n*h-t*v*h-u*n*m+t*d*m)*L,e[14]=(g*o*s-a*v*s-g*n*l+t*v*l+a*n*m-t*o*m)*L,e[15]=(a*d*s-u*o*s+u*n*l-t*d*l-a*n*h+t*o*h)*L,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,h=r*c,f=r*u,g=r*d,v=a*u,m=a*d,p=o*d,E=l*c,T=l*u,x=l*d,R=n.x,C=n.y,L=n.z;return s[0]=(1-(v+p))*R,s[1]=(f+x)*R,s[2]=(g-T)*R,s[3]=0,s[4]=(f-x)*C,s[5]=(1-(h+p))*C,s[6]=(m+E)*C,s[7]=0,s[8]=(g+T)*L,s[9]=(m-E)*L,s[10]=(1-(h+v))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=ks.set(s[0],s[1],s[2]).length();const a=ks.set(s[4],s[5],s[6]).length(),o=ks.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Kn.copy(this);const c=1/r,u=1/a,d=1/o;return Kn.elements[0]*=c,Kn.elements[1]*=c,Kn.elements[2]*=c,Kn.elements[4]*=u,Kn.elements[5]*=u,Kn.elements[6]*=u,Kn.elements[8]*=d,Kn.elements[9]*=d,Kn.elements[10]*=d,t.setFromRotationMatrix(Kn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=fi,l=!1){const c=this.elements,u=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s);let g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===fi)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Eo)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=fi,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-s),h=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===fi)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===Eo)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ks=new w,Kn=new st,$g=new w(0,0,0),qg=new w(1,1,1),Ki=new w,za=new w,Ln=new w,fd=new st,pd=new it;class qt{constructor(e=0,t=0,n=0,s=qt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ut(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return fd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return pd.setFromEuler(this),this.setFromQuaternion(pd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qt.DEFAULT_ORDER="XYZ";class uu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Yg=0;const md=new w,zs=new it,bi=new st,Ha=new w,Nr=new w,Kg=new w,jg=new it,gd=new w(1,0,0),_d=new w(0,1,0),vd=new w(0,0,1),yd={type:"added"},Jg={type:"removed"},Hs={type:"childadded",child:null},lc={type:"childremoved",child:null};class Ht extends vr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ht.DEFAULT_UP.clone();const e=new w,t=new qt,n=new it,s=new w(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new st},normalMatrix:{value:new ot}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=Ht.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new uu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zs.setFromAxisAngle(e,t),this.quaternion.multiply(zs),this}rotateOnWorldAxis(e,t){return zs.setFromAxisAngle(e,t),this.quaternion.premultiply(zs),this}rotateX(e){return this.rotateOnAxis(gd,e)}rotateY(e){return this.rotateOnAxis(_d,e)}rotateZ(e){return this.rotateOnAxis(vd,e)}translateOnAxis(e,t){return md.copy(e).applyQuaternion(this.quaternion),this.position.add(md.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gd,e)}translateY(e){return this.translateOnAxis(_d,e)}translateZ(e){return this.translateOnAxis(vd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ha.copy(e):Ha.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(Nr,Ha,this.up):bi.lookAt(Ha,Nr,this.up),this.quaternion.setFromRotationMatrix(bi),s&&(bi.extractRotation(s.matrixWorld),zs.setFromRotationMatrix(bi),this.quaternion.premultiply(zs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yd),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Jg),lc.child=e,this.dispatchEvent(lc),lc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yd),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,e,Kg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,jg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Ht.DEFAULT_UP=new w(0,1,0);Ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jn=new w,Ti=new w,uc=new w,Ei=new w,Vs=new w,Gs=new w,xd=new w,dc=new w,hc=new w,fc=new w,pc=new bt,mc=new bt,gc=new bt;class Vn{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),jn.subVectors(e,t),s.cross(jn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){jn.subVectors(s,t),Ti.subVectors(n,t),uc.subVectors(e,t);const a=jn.dot(jn),o=jn.dot(Ti),l=jn.dot(uc),c=Ti.dot(Ti),u=Ti.dot(uc),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const h=1/d,f=(c*l-o*u)*h,g=(a*u-o*l)*h;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ei)===null?!1:Ei.x>=0&&Ei.y>=0&&Ei.x+Ei.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Ei)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ei.x),l.addScaledVector(a,Ei.y),l.addScaledVector(o,Ei.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return pc.setScalar(0),mc.setScalar(0),gc.setScalar(0),pc.fromBufferAttribute(e,t),mc.fromBufferAttribute(e,n),gc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(pc,r.x),a.addScaledVector(mc,r.y),a.addScaledVector(gc,r.z),a}static isFrontFacing(e,t,n,s){return jn.subVectors(n,t),Ti.subVectors(e,t),jn.cross(Ti).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),Ti.subVectors(this.a,this.b),jn.cross(Ti).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Vn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Vn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Vs.subVectors(s,n),Gs.subVectors(r,n),dc.subVectors(e,n);const l=Vs.dot(dc),c=Gs.dot(dc);if(l<=0&&c<=0)return t.copy(n);hc.subVectors(e,s);const u=Vs.dot(hc),d=Gs.dot(hc);if(u>=0&&d<=u)return t.copy(s);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Vs,a);fc.subVectors(e,r);const f=Vs.dot(fc),g=Gs.dot(fc);if(g>=0&&f<=g)return t.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Gs,o);const m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return xd.subVectors(r,s),o=(d-u)/(d-u+(f-g)),t.copy(s).addScaledVector(xd,o);const p=1/(m+v+h);return a=v*p,o=h*p,t.copy(n).addScaledVector(Vs,a).addScaledVector(Gs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const mf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ji={h:0,s:0,l:0},Va={h:0,s:0,l:0};function _c(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class nt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,gt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=gt.workingColorSpace){return this.r=e,this.g=t,this.b=n,gt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=gt.workingColorSpace){if(e=cu(e,1),t=ut(t,0,1),n=ut(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=_c(a,r,e+1/3),this.g=_c(a,r,e),this.b=_c(a,r,e-1/3)}return gt.colorSpaceToWorking(this,s),this}setStyle(e,t=Wt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Wt){const n=mf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}copyLinearToSRGB(e){return this.r=rr(e.r),this.g=rr(e.g),this.b=rr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wt){return gt.workingToColorSpace(fn.copy(this),e),Math.round(ut(fn.r*255,0,255))*65536+Math.round(ut(fn.g*255,0,255))*256+Math.round(ut(fn.b*255,0,255))}getHexString(e=Wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=gt.workingColorSpace){gt.workingToColorSpace(fn.copy(this),t);const n=fn.r,s=fn.g,r=fn.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=gt.workingColorSpace){return gt.workingToColorSpace(fn.copy(this),t),e.r=fn.r,e.g=fn.g,e.b=fn.b,e}getStyle(e=Wt){gt.workingToColorSpace(fn.copy(this),e);const t=fn.r,n=fn.g,s=fn.b;return e!==Wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ji),this.setHSL(ji.h+e,ji.s+t,ji.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ji),e.getHSL(Va);const n=Kr(ji.h,Va.h,t),s=Kr(ji.s,Va.s,t),r=Kr(ji.l,Va.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const fn=new nt;nt.NAMES=mf;let Zg=0;class ii extends vr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zg++}),this.uuid=ni(),this.name="",this.type="Material",this.blending=sr,this.side=Ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jc,this.blendDst=Jc,this.blendEquation=ys,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ad,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ns,this.stencilZFail=Ns,this.stencilZPass=Ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==sr&&(n.blending=this.blending),this.side!==Ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==jc&&(n.blendSrc=this.blendSrc),this.blendDst!==Jc&&(n.blendDst=this.blendDst),this.blendEquation!==ys&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==lr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ad&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ns&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ns&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ns&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Gn extends ii{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qt,this.combine=Zh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const jt=new w,Ga=new ze;let Qg=0;class bn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ol,this.updateRanges=[],this.gpuType=ei,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ga.fromBufferAttribute(this,t),Ga.applyMatrix3(e),this.setXY(t,Ga.x,Ga.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Qn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array),r=Pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ol&&(e.usage=this.usage),e}}class gf extends bn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class _f extends bn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class kt extends bn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let e0=0;const kn=new st,vc=new Ht,Ws=new w,Dn=new Un,Ur=new Un,rn=new w;class on extends vr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:e0++}),this.uuid=ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ff(e)?_f:gf)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ot().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return kn.makeRotationFromQuaternion(e),this.applyMatrix4(kn),this}rotateX(e){return kn.makeRotationX(e),this.applyMatrix4(kn),this}rotateY(e){return kn.makeRotationY(e),this.applyMatrix4(kn),this}rotateZ(e){return kn.makeRotationZ(e),this.applyMatrix4(kn),this}translate(e,t,n){return kn.makeTranslation(e,t,n),this.applyMatrix4(kn),this}scale(e,t,n){return kn.makeScale(e,t,n),this.applyMatrix4(kn),this}lookAt(e){return vc.lookAt(e),vc.updateMatrix(),this.applyMatrix4(vc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ws).negate(),this.translate(Ws.x,Ws.y,Ws.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new kt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Un);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Dn.setFromBufferAttribute(r),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _i);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){const n=this.boundingSphere.center;if(Dn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Ur.setFromBufferAttribute(o),this.morphTargetsRelative?(rn.addVectors(Dn.min,Ur.min),Dn.expandByPoint(rn),rn.addVectors(Dn.max,Ur.max),Dn.expandByPoint(rn)):(Dn.expandByPoint(Ur.min),Dn.expandByPoint(Ur.max))}Dn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)rn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(rn));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)rn.fromBufferAttribute(o,c),l&&(Ws.fromBufferAttribute(e,c),rn.add(Ws)),s=Math.max(s,n.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let O=0;O<n.count;O++)o[O]=new w,l[O]=new w;const c=new w,u=new w,d=new w,h=new ze,f=new ze,g=new ze,v=new w,m=new w;function p(O,b,M){c.fromBufferAttribute(n,O),u.fromBufferAttribute(n,b),d.fromBufferAttribute(n,M),h.fromBufferAttribute(r,O),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),u.sub(c),d.sub(c),f.sub(h),g.sub(h);const N=1/(f.x*g.y-g.x*f.y);isFinite(N)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(N),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(N),o[O].add(v),o[b].add(v),o[M].add(v),l[O].add(m),l[b].add(m),l[M].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let O=0,b=E.length;O<b;++O){const M=E[O],N=M.start,B=M.count;for(let H=N,Y=N+B;H<Y;H+=3)p(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const T=new w,x=new w,R=new w,C=new w;function L(O){R.fromBufferAttribute(s,O),C.copy(R);const b=o[O];T.copy(b),T.sub(R.multiplyScalar(R.dot(b))).normalize(),x.crossVectors(C,b);const N=x.dot(l[O])<0?-1:1;a.setXYZW(O,T.x,T.y,T.z,N)}for(let O=0,b=E.length;O<b;++O){const M=E[O],N=M.start,B=M.count;for(let H=N,Y=N+B;H<Y;H+=3)L(e.getX(H+0)),L(e.getX(H+1)),L(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new bn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const s=new w,r=new w,a=new w,o=new w,l=new w,c=new w,u=new w,d=new w;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*u;for(let p=0;p<u;p++)h[g++]=c[f++]}return new bn(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new on,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Md=new st,fs=new pa,Wa=new _i,Sd=new w,Xa=new w,$a=new w,qa=new w,yc=new w,Ya=new w,bd=new w,Ka=new w;class Ct extends Ht{constructor(e=new on,t=new Gn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ya.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],d=r[l];u!==0&&(yc.fromBufferAttribute(d,e),a?Ya.addScaledVector(yc,u):Ya.addScaledVector(yc.sub(t),u))}t.add(Ya)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Wa.copy(n.boundingSphere),Wa.applyMatrix4(r),fs.copy(e.ray).recast(e.near),!(Wa.containsPoint(fs.origin)===!1&&(fs.intersectSphere(Wa,Sd)===null||fs.origin.distanceToSquared(Sd)>(e.far-e.near)**2))&&(Md.copy(r).invert(),fs.copy(e.ray).applyMatrix4(Md),!(n.boundingBox!==null&&fs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,fs)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=a[m.materialIndex],E=Math.max(m.start,f.start),T=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=E,R=T;x<R;x+=3){const C=o.getX(x),L=o.getX(x+1),O=o.getX(x+2);s=ja(this,p,e,n,c,u,d,C,L,O),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const E=o.getX(m),T=o.getX(m+1),x=o.getX(m+2);s=ja(this,a,e,n,c,u,d,E,T,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=a[m.materialIndex],E=Math.max(m.start,f.start),T=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=E,R=T;x<R;x+=3){const C=x,L=x+1,O=x+2;s=ja(this,p,e,n,c,u,d,C,L,O),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const E=m,T=m+1,x=m+2;s=ja(this,a,e,n,c,u,d,E,T,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function t0(i,e,t,n,s,r,a,o){let l;if(e.side===Cn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Ni,o),l===null)return null;Ka.copy(o),Ka.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ka);return c<t.near||c>t.far?null:{distance:c,point:Ka.clone(),object:i}}function ja(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Xa),i.getVertexPosition(l,$a),i.getVertexPosition(c,qa);const u=t0(i,e,t,n,Xa,$a,qa,bd);if(u){const d=new w;Vn.getBarycoord(bd,Xa,$a,qa,d),s&&(u.uv=Vn.getInterpolatedAttribute(s,o,l,c,d,new ze)),r&&(u.uv1=Vn.getInterpolatedAttribute(r,o,l,c,d,new ze)),a&&(u.normal=Vn.getInterpolatedAttribute(a,o,l,c,d,new w),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new w,materialIndex:0};Vn.getNormal(Xa,$a,qa,h.normal),u.face=h,u.barycoord=d}return u}class Hn extends on{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],d=[];let h=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new kt(c,3)),this.setAttribute("normal",new kt(u,3)),this.setAttribute("uv",new kt(d,2));function g(v,m,p,E,T,x,R,C,L,O,b){const M=x/L,N=R/O,B=x/2,H=R/2,Y=C/2,J=L+1,te=O+1;let se=0,$=0;const ve=new w;for(let Ie=0;Ie<te;Ie++){const Ue=Ie*N-H;for(let at=0;at<J;at++){const _t=at*M-B;ve[v]=_t*E,ve[m]=Ue*T,ve[p]=Y,c.push(ve.x,ve.y,ve.z),ve[v]=0,ve[m]=0,ve[p]=C>0?1:-1,u.push(ve.x,ve.y,ve.z),d.push(at/L),d.push(1-Ie/O),se+=1}}for(let Ie=0;Ie<O;Ie++)for(let Ue=0;Ue<L;Ue++){const at=h+Ue+J*Ie,_t=h+Ue+J*(Ie+1),xt=h+(Ue+1)+J*(Ie+1),Re=h+(Ue+1)+J*Ie;l.push(at,_t,Re),l.push(_t,xt,Re),$+=6}o.addGroup(f,$,b),f+=$,h+=se}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function pr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function vn(i){const e={};for(let t=0;t<i.length;t++){const n=pr(i[t]);for(const s in n)e[s]=n[s]}return e}function n0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function vf(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:gt.workingColorSpace}const i0={clone:pr,merge:vn};var s0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,r0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class rs extends ii{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=s0,this.fragmentShader=r0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=pr(e.uniforms),this.uniformsGroups=n0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class yf extends Ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=fi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new w,Td=new ze,Ed=new ze;class yn extends yf{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=fr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Yr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fr*2*Math.atan(Math.tan(Yr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z)}getViewSize(e,t){return this.getViewBounds(e,Td,Ed),t.subVectors(Ed,Td)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Yr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Xs=-90,$s=1;class a0 extends Ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new yn(Xs,$s,e,t);s.layers=this.layers,this.add(s);const r=new yn(Xs,$s,e,t);r.layers=this.layers,this.add(r);const a=new yn(Xs,$s,e,t);a.layers=this.layers,this.add(a);const o=new yn(Xs,$s,e,t);o.layers=this.layers,this.add(o);const l=new yn(Xs,$s,e,t);l.layers=this.layers,this.add(l);const c=new yn(Xs,$s,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===fi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Eo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class xf extends tn{constructor(e=[],t=ur,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class o0 extends Ts{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new xf(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Hn(5,5,5),r=new rs({name:"CubemapFromEquirect",uniforms:pr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Cn,blending:is});r.uniforms.tEquirect.value=t;const a=new Ct(s,r),o=t.minFilter;return t.minFilter===Pi&&(t.minFilter=Nn),new a0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class Xt extends Ht{constructor(){super(),this.isGroup=!0,this.type="Group"}}const c0={type:"move"};class xc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(c0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Xt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class du{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new nt(e),this.near=t,this.far=n}clone(){return new du(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class l0 extends Ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qt,this.environmentIntensity=1,this.environmentRotation=new qt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Mf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ol,this.updateRanges=[],this.version=0,this.uuid=ni()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const _n=new w;class ua{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyMatrix4(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyNormalMatrix(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.transformDirection(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Qn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Qn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Qn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Qn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Qn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array),r=Pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new bn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ua(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Sf extends ii{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let qs;const Or=new w,Ys=new w,Ks=new w,js=new ze,Fr=new ze,bf=new st,Ja=new w,Br=new w,Za=new w,Ad=new ze,Mc=new ze,wd=new ze;class u0 extends Ht{constructor(e=new Sf){if(super(),this.isSprite=!0,this.type="Sprite",qs===void 0){qs=new on;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Mf(t,5);qs.setIndex([0,1,2,0,2,3]),qs.setAttribute("position",new ua(n,3,0,!1)),qs.setAttribute("uv",new ua(n,2,3,!1))}this.geometry=qs,this.material=e,this.center=new ze(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ys.setFromMatrixScale(this.matrixWorld),bf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ks.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ys.multiplyScalar(-Ks.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Qa(Ja.set(-.5,-.5,0),Ks,a,Ys,s,r),Qa(Br.set(.5,-.5,0),Ks,a,Ys,s,r),Qa(Za.set(.5,.5,0),Ks,a,Ys,s,r),Ad.set(0,0),Mc.set(1,0),wd.set(1,1);let o=e.ray.intersectTriangle(Ja,Br,Za,!1,Or);if(o===null&&(Qa(Br.set(-.5,.5,0),Ks,a,Ys,s,r),Mc.set(0,1),o=e.ray.intersectTriangle(Ja,Za,Br,!1,Or),o===null))return;const l=e.ray.origin.distanceTo(Or);l<e.near||l>e.far||t.push({distance:l,point:Or.clone(),uv:Vn.getInterpolation(Or,Ja,Br,Za,Ad,Mc,wd,new ze),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Qa(i,e,t,n,s,r){js.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Fr.x=r*js.x-s*js.y,Fr.y=s*js.x+r*js.y):Fr.copy(js),i.copy(e),i.x+=Fr.x,i.y+=Fr.y,i.applyMatrix4(bf)}const Rd=new w,Cd=new bt,Pd=new bt,d0=new w,Id=new st,eo=new w,Sc=new _i,Ld=new st,bc=new pa;class h0 extends Ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=nd,this.bindMatrix=new st,this.bindMatrixInverse=new st,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Un),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,eo),this.boundingBox.expandByPoint(eo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new _i),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,eo),this.boundingSphere.expandByPoint(eo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Sc.copy(this.boundingSphere),Sc.applyMatrix4(s),e.ray.intersectsSphere(Sc)!==!1&&(Ld.copy(s).invert(),bc.copy(e.ray).applyMatrix4(Ld),!(this.boundingBox!==null&&bc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,bc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new bt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===nd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===cg?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Cd.fromBufferAttribute(s.attributes.skinIndex,e),Pd.fromBufferAttribute(s.attributes.skinWeight,e),Rd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Pd.getComponent(r);if(a!==0){const o=Cd.getComponent(r);Id.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(d0.copy(Rd).applyMatrix4(Id),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Tf extends Ht{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Ef extends tn{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Sn,u=Sn,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Dd=new st,f0=new st;class hu{constructor(e=[],t=[]){this.uuid=ni(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new st)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new st;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:f0;Dd.multiplyMatrices(o,t[r]),Dd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new hu(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Ef(t,e,e,Wn,ei);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Tf),this.bones.push(a),this.boneInverses.push(new st().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class Fl extends bn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Js=new st,Nd=new st,to=[],Ud=new Un,p0=new st,kr=new Ct,zr=new _i;class Af extends Ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Fl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,p0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Un),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Js),Ud.copy(e.boundingBox).applyMatrix4(Js),this.boundingBox.union(Ud)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new _i),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Js),zr.copy(e.boundingSphere).applyMatrix4(Js),this.boundingSphere.union(zr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(kr.geometry=this.geometry,kr.material=this.material,kr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zr.copy(this.boundingSphere),zr.applyMatrix4(n),e.ray.intersectsSphere(zr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Js),Nd.multiplyMatrices(n,Js),kr.matrixWorld=Nd,kr.raycast(e,to);for(let a=0,o=to.length;a<o;a++){const l=to[a];l.instanceId=r,l.object=this,t.push(l)}to.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Fl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ef(new Float32Array(s*this.count),s,this.count,su,ei));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Tc=new w,m0=new w,g0=new ot;class es{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Tc.subVectors(n,t).cross(m0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Tc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||g0.getNormalMatrix(e),s=this.coplanarPoint(Tc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ps=new _i,_0=new ze(.5,.5),no=new w;class fu{constructor(e=new es,t=new es,n=new es,s=new es,r=new es,a=new es){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=fi,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],E=r[12],T=r[13],x=r[14],R=r[15];if(s[0].setComponents(c-a,f-u,p-g,R-E).normalize(),s[1].setComponents(c+a,f+u,p+g,R+E).normalize(),s[2].setComponents(c+o,f+d,p+v,R+T).normalize(),s[3].setComponents(c-o,f-d,p-v,R-T).normalize(),n)s[4].setComponents(l,h,m,x).normalize(),s[5].setComponents(c-l,f-h,p-m,R-x).normalize();else if(s[4].setComponents(c-l,f-h,p-m,R-x).normalize(),t===fi)s[5].setComponents(c+l,f+h,p+m,R+x).normalize();else if(t===Eo)s[5].setComponents(l,h,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ps.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ps.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ps)}intersectsSprite(e){ps.center.set(0,0,0);const t=_0.distanceTo(e.center);return ps.radius=.7071067811865476+t,ps.applyMatrix4(e.matrixWorld),this.intersectsSphere(ps)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(no.x=s.normal.x>0?e.max.x:e.min.x,no.y=s.normal.y>0?e.max.y:e.min.y,no.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(no)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class wf extends ii{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ao=new w,wo=new w,Od=new st,Hr=new pa,io=new _i,Ec=new w,Fd=new w;class pu extends Ht{constructor(e=new on,t=new wf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ao.fromBufferAttribute(t,s-1),wo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ao.distanceTo(wo);e.setAttribute("lineDistance",new kt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(s),io.radius+=r,e.ray.intersectsSphere(io)===!1)return;Od.copy(s).invert(),Hr.copy(e.ray).applyMatrix4(Od);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=c){const p=u.getX(v),E=u.getX(v+1),T=so(this,e,Hr,l,p,E,v);T&&t.push(T)}if(this.isLineLoop){const v=u.getX(g-1),m=u.getX(f),p=so(this,e,Hr,l,v,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=c){const p=so(this,e,Hr,l,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=so(this,e,Hr,l,g-1,f,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function so(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Ao.fromBufferAttribute(o,s),wo.fromBufferAttribute(o,r),t.distanceSqToSegment(Ao,wo,Ec,Fd)>n)return;Ec.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ec);if(!(c<e.near||c>e.far))return{distance:c,point:Fd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Bd=new w,kd=new w;class v0 extends pu{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Bd.fromBufferAttribute(t,s),kd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Bd.distanceTo(kd);e.setAttribute("lineDistance",new kt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class y0 extends pu{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Rf extends ii{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const zd=new st,Bl=new pa,ro=new _i,ao=new w;class x0 extends Ht{constructor(e=new on,t=new Rf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ro.copy(n.boundingSphere),ro.applyMatrix4(s),ro.radius+=r,e.ray.intersectsSphere(ro)===!1)return;zd.copy(s).invert(),Bl.copy(e.ray).applyMatrix4(zd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=h,v=f;g<v;g++){const m=c.getX(g);ao.fromBufferAttribute(d,m),Hd(ao,m,l,s,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=h,v=f;g<v;g++)ao.fromBufferAttribute(d,g),Hd(ao,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Hd(i,e,t,n,s,r,a){const o=Bl.distanceSqToPoint(i);if(o<t){const l=new w;Bl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Zs extends tn{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Cf extends tn{constructor(e,t,n=bs,s,r,a,o=Sn,l=Sn,c,u=sa,d=1){if(u!==sa&&u!==ra)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new lu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Pf extends tn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class mu extends on{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],u=t/2,d=Math.PI/2*e,h=t,f=2*d+h,g=n*2+r,v=s+1,m=new w,p=new w;for(let E=0;E<=g;E++){let T=0,x=0,R=0,C=0;if(E<=n){const b=E/n,M=b*Math.PI/2;x=-u-e*Math.cos(M),R=e*Math.sin(M),C=-e*Math.cos(M),T=b*d}else if(E<=n+r){const b=(E-n)/r;x=-u+b*t,R=e,C=0,T=d+b*h}else{const b=(E-n-r)/n,M=b*Math.PI/2;x=u+e*Math.sin(M),R=e*Math.cos(M),C=e*Math.sin(M),T=d+h+b*d}const L=Math.max(0,Math.min(1,T/f));let O=0;E===0?O=.5/s:E===g&&(O=-.5/s);for(let b=0;b<=s;b++){const M=b/s,N=M*Math.PI*2,B=Math.sin(N),H=Math.cos(N);p.x=-R*H,p.y=x,p.z=R*B,o.push(p.x,p.y,p.z),m.set(-R*H,C,R*B),m.normalize(),l.push(m.x,m.y,m.z),c.push(M+O,L)}if(E>0){const b=(E-1)*v;for(let M=0;M<s;M++){const N=b+M,B=b+M+1,H=E*v+M,Y=E*v+M+1;a.push(N,B,H),a.push(B,Y,H)}}}this.setIndex(a),this.setAttribute("position",new kt(o,3)),this.setAttribute("normal",new kt(l,3)),this.setAttribute("uv",new kt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mu(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class gu extends on{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],h=[],f=[];let g=0;const v=[],m=n/2;let p=0;E(),a===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(u),this.setAttribute("position",new kt(d,3)),this.setAttribute("normal",new kt(h,3)),this.setAttribute("uv",new kt(f,2));function E(){const x=new w,R=new w;let C=0;const L=(t-e)/n;for(let O=0;O<=r;O++){const b=[],M=O/r,N=M*(t-e)+e;for(let B=0;B<=s;B++){const H=B/s,Y=H*l+o,J=Math.sin(Y),te=Math.cos(Y);R.x=N*J,R.y=-M*n+m,R.z=N*te,d.push(R.x,R.y,R.z),x.set(J,L,te).normalize(),h.push(x.x,x.y,x.z),f.push(H,1-M),b.push(g++)}v.push(b)}for(let O=0;O<s;O++)for(let b=0;b<r;b++){const M=v[b][O],N=v[b+1][O],B=v[b+1][O+1],H=v[b][O+1];(e>0||b!==0)&&(u.push(M,N,H),C+=3),(t>0||b!==r-1)&&(u.push(N,B,H),C+=3)}c.addGroup(p,C,0),p+=C}function T(x){const R=g,C=new ze,L=new w;let O=0;const b=x===!0?e:t,M=x===!0?1:-1;for(let B=1;B<=s;B++)d.push(0,m*M,0),h.push(0,M,0),f.push(.5,.5),g++;const N=g;for(let B=0;B<=s;B++){const Y=B/s*l+o,J=Math.cos(Y),te=Math.sin(Y);L.x=b*te,L.y=m*M,L.z=b*J,d.push(L.x,L.y,L.z),h.push(0,M,0),C.x=J*.5+.5,C.y=te*.5*M+.5,f.push(C.x,C.y),g++}for(let B=0;B<s;B++){const H=R+B,Y=N+B;x===!0?u.push(Y,Y+1,H):u.push(Y+1,Y,H),O+=3}c.addGroup(p,O,x===!0?1:2),p+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gu(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ui{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const u=n[s],h=n[s+1]-u,f=(a-u)/h;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new ze:new w);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new w,s=[],r=[],a=[],o=new w,l=new st;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new w)}r[0]=new w,a[0]=new w;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ut(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(ut(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class If extends Ui{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ze){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class M0 extends If{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function _u(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,d){let h=(a-r)/c-(o-r)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;h*=u,f*=u,s(a,o,h,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const oo=new w,Ac=new _u,wc=new _u,Rc=new _u;class kl extends Ui{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new w){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(oo.subVectors(s[0],s[1]).add(s[0]),c=oo);const d=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(oo.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=oo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(h),f),m=Math.pow(h.distanceToSquared(u),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Ac.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,g,v,m),wc.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,g,v,m),Rc.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,g,v,m)}else this.curveType==="catmullrom"&&(Ac.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),wc.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),Rc.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return n.set(Ac.calc(l),wc.calc(l),Rc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new w().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Vd(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function S0(i,e){const t=1-i;return t*t*e}function b0(i,e){return 2*(1-i)*i*e}function T0(i,e){return i*i*e}function jr(i,e,t,n){return S0(i,e)+b0(i,t)+T0(i,n)}function E0(i,e){const t=1-i;return t*t*t*e}function A0(i,e){const t=1-i;return 3*t*t*i*e}function w0(i,e){return 3*(1-i)*i*i*e}function R0(i,e){return i*i*i*e}function Jr(i,e,t,n,s){return E0(i,e)+A0(i,t)+w0(i,n)+R0(i,s)}class C0 extends Ui{constructor(e=new ze,t=new ze,n=new ze,s=new ze){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ze){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Jr(e,s.x,r.x,a.x,o.x),Jr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class P0 extends Ui{constructor(e=new w,t=new w,n=new w,s=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new w){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Jr(e,s.x,r.x,a.x,o.x),Jr(e,s.y,r.y,a.y,o.y),Jr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class I0 extends Ui{constructor(e=new ze,t=new ze){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ze){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ze){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class L0 extends Ui{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class D0 extends Ui{constructor(e=new ze,t=new ze,n=new ze){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ze){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(jr(e,s.x,r.x,a.x),jr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Lf extends Ui{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(jr(e,s.x,r.x,a.x),jr(e,s.y,r.y,a.y),jr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class N0 extends Ui{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ze){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(Vd(o,l.x,c.x,u.x,d.x),Vd(o,l.y,c.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ze().fromArray(s))}return this}}var U0=Object.freeze({__proto__:null,ArcCurve:M0,CatmullRomCurve3:kl,CubicBezierCurve:C0,CubicBezierCurve3:P0,EllipseCurve:If,LineCurve:I0,LineCurve3:L0,QuadraticBezierCurve:D0,QuadraticBezierCurve3:Lf,SplineCurve:N0});class ma extends on{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,d=e/o,h=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<u;p++){const E=p*h-a;for(let T=0;T<c;T++){const x=T*d-r;g.push(x,-E,0),v.push(0,0,1),m.push(T/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<o;E++){const T=E+c*p,x=E+c*(p+1),R=E+1+c*(p+1),C=E+1+c*p;f.push(T,x,C),f.push(x,R,C)}this.setIndex(f),this.setAttribute("position",new kt(g,3)),this.setAttribute("normal",new kt(v,3)),this.setAttribute("uv",new kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ma(e.width,e.height,e.widthSegments,e.heightSegments)}}class vu extends on{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let d=e;const h=(t-e)/s,f=new w,g=new ze;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const E=p+m,T=E,x=E+n+1,R=E+n+2,C=E+1;o.push(T,x,C),o.push(x,R,C)}}this.setIndex(o),this.setAttribute("position",new kt(l,3)),this.setAttribute("normal",new kt(c,3)),this.setAttribute("uv",new kt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vu(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Zr extends on{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new w,h=new w,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const E=[],T=p/n;let x=0;p===0&&a===0?x=.5/t:p===n&&l===Math.PI&&(x=-.5/t);for(let R=0;R<=t;R++){const C=R/t;d.x=-e*Math.cos(s+C*r)*Math.sin(a+T*o),d.y=e*Math.cos(a+T*o),d.z=e*Math.sin(s+C*r)*Math.sin(a+T*o),g.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),m.push(C+x,1-T),E.push(c++)}u.push(E)}for(let p=0;p<n;p++)for(let E=0;E<t;E++){const T=u[p][E+1],x=u[p][E],R=u[p+1][E],C=u[p+1][E+1];(p!==0||a>0)&&f.push(T,x,C),(p!==n-1||l<Math.PI)&&f.push(x,R,C)}this.setIndex(f),this.setAttribute("position",new kt(g,3)),this.setAttribute("normal",new kt(v,3)),this.setAttribute("uv",new kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class yu extends on{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],u=new w,d=new w,h=new w;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const v=g/s*r,m=f/n*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(v),d.y=(e+t*Math.cos(m))*Math.sin(v),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const v=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,E=(s+1)*f+g;a.push(v,m,E),a.push(m,p,E)}this.setIndex(a),this.setAttribute("position",new kt(o,3)),this.setAttribute("normal",new kt(l,3)),this.setAttribute("uv",new kt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yu(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ro extends on{constructor(e=new Lf(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new w,l=new w,c=new ze;let u=new w;const d=[],h=[],f=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new kt(d,3)),this.setAttribute("normal",new kt(h,3)),this.setAttribute("uv",new kt(f,2));function v(){for(let T=0;T<t;T++)m(T);m(r===!1?t:0),E(),p()}function m(T){u=e.getPointAt(T/t,u);const x=a.normals[T],R=a.binormals[T];for(let C=0;C<=s;C++){const L=C/s*Math.PI*2,O=Math.sin(L),b=-Math.cos(L);l.x=b*x.x+O*R.x,l.y=b*x.y+O*R.y,l.z=b*x.z+O*R.z,l.normalize(),h.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,d.push(o.x,o.y,o.z)}}function p(){for(let T=1;T<=t;T++)for(let x=1;x<=s;x++){const R=(s+1)*(T-1)+(x-1),C=(s+1)*T+(x-1),L=(s+1)*T+x,O=(s+1)*(T-1)+x;g.push(R,C,O),g.push(C,L,O)}}function E(){for(let T=0;T<=t;T++)for(let x=0;x<=s;x++)c.x=T/t,c.y=x/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Ro(new U0[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class en extends ii{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=df,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class vi extends en{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ze(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new nt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new nt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new nt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class O0 extends ii{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class F0 extends ii{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function co(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function B0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function k0(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Gd(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function Df(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class ga{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class z0 extends ga{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:id,endingEnd:id}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case sd:r=e,o=2*t-n;break;case rd:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case sd:a=e,l=2*n-t;break;case rd:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),v=g*g,m=v*g,p=-h*m+2*h*v-h*g,E=(1+h)*m+(-1.5-2*h)*v+(-.5+h)*g+1,T=(-1-f)*m+(1.5+f)*v+.5*g,x=f*m-f*v;for(let R=0;R!==o;++R)r[R]=p*a[u+R]+E*a[c+R]+T*a[l+R]+x*a[d+R];return r}}class H0 extends ga{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(s-t),d=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*d+a[l+h]*u;return r}}class V0 extends ga{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class ri{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=co(t,this.TimeBufferType),this.values=co(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:co(e.times,Array),values:co(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new V0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new H0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new z0(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case aa:t=this.InterpolantFactoryMethodDiscrete;break;case oa:t=this.InterpolantFactoryMethodLinear;break;case Qo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return aa;case this.InterpolantFactoryMethodLinear:return oa;case this.InterpolantFactoryMethodSmooth:return Qo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&B0(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Qo,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{const d=o*n,h=d-n,f=d+n;for(let g=0;g!==n;++g){const v=t[d+g];if(v!==t[h+g]||v!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const d=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}ri.prototype.ValueTypeName="";ri.prototype.TimeBufferType=Float32Array;ri.prototype.ValueBufferType=Float32Array;ri.prototype.DefaultInterpolation=oa;class yr extends ri{constructor(e,t,n){super(e,t,n)}}yr.prototype.ValueTypeName="bool";yr.prototype.ValueBufferType=Array;yr.prototype.DefaultInterpolation=aa;yr.prototype.InterpolantFactoryMethodLinear=void 0;yr.prototype.InterpolantFactoryMethodSmooth=void 0;class Nf extends ri{constructor(e,t,n,s){super(e,t,n,s)}}Nf.prototype.ValueTypeName="color";class mr extends ri{constructor(e,t,n,s){super(e,t,n,s)}}mr.prototype.ValueTypeName="number";class G0 extends ga{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t);let c=e*o;for(let u=c+o;c!==u;c+=4)it.slerpFlat(r,0,a,c-o,a,c,l);return r}}class gr extends ri{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new G0(this.times,this.values,this.getValueSize(),e)}}gr.prototype.ValueTypeName="quaternion";gr.prototype.InterpolantFactoryMethodSmooth=void 0;class xr extends ri{constructor(e,t,n){super(e,t,n)}}xr.prototype.ValueTypeName="string";xr.prototype.ValueBufferType=Array;xr.prototype.DefaultInterpolation=aa;xr.prototype.InterpolantFactoryMethodLinear=void 0;xr.prototype.InterpolantFactoryMethodSmooth=void 0;class _r extends ri{constructor(e,t,n,s){super(e,t,n,s)}}_r.prototype.ValueTypeName="vector";class W0{constructor(e="",t=-1,n=[],s=lg){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=ni(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push($0(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(ri.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const u=k0(l);l=Gd(l,1,u),c=Gd(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new mr(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(r);if(u&&u.length>1){const d=u[1];let h=s[d];h||(s[d]=h=[]),h.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,h,f,g,v){if(f.length!==0){const m=[],p=[];Df(f,m,p,g),m.length!==0&&v.push(new d(h,m,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const h=c[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const f={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let v=0;v<h[g].morphTargets.length;v++)f[h[g].morphTargets[v]]=-1;for(const v in f){const m=[],p=[];for(let E=0;E!==h[g].morphTargets.length;++E){const T=h[g];m.push(T.time),p.push(T.morphTarget===v?1:0)}s.push(new mr(".morphTargetInfluence["+v+"]",m,p))}l=f.length*a}else{const f=".bones["+t[d].name+"]";n(_r,f+".position",h,"pos",s),n(gr,f+".quaternion",h,"rot",s),n(_r,f+".scale",h,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function X0(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return mr;case"vector":case"vector2":case"vector3":case"vector4":return _r;case"color":return Nf;case"quaternion":return gr;case"bool":case"boolean":return yr;case"string":return xr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function $0(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=X0(i.type);if(i.times===void 0){const t=[],n=[];Df(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Ii={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class q0{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){const f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Y0=new q0;class Mr{constructor(e){this.manager=e!==void 0?e:Y0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Mr.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ai={};class K0 extends Error{constructor(e,t){super(e),this.response=t}}class Uf extends Mr{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ii.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Ai[e]!==void 0){Ai[e].push({onLoad:t,onProgress:n,onError:s});return}Ai[e]=[],Ai[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Ai[e],d=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,g=f!==0;let v=0;const m=new ReadableStream({start(p){E();function E(){d.read().then(({done:T,value:x})=>{if(T)p.close();else{v+=x.byteLength;const R=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:f});for(let C=0,L=u.length;C<L;C++){const O=u[C];O.onProgress&&O.onProgress(R)}p.enqueue(x),E()}},T=>{p.error(T)})}}});return new Response(m)}else throw new K0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Ii.add(`file:${e}`,c);const u=Ai[e];delete Ai[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=Ai[e];if(u===void 0)throw this.manager.itemError(e),c;delete Ai[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Qs=new WeakMap;class j0 extends Mr{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ii.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=Qs.get(a);d===void 0&&(d=[],Qs.set(a,d)),d.push({onLoad:t,onError:s})}return a}const o=ca("img");function l(){u(),t&&t(this);const d=Qs.get(this)||[];for(let h=0;h<d.length;h++){const f=d[h];f.onLoad&&f.onLoad(this)}Qs.delete(this),r.manager.itemEnd(e)}function c(d){u(),s&&s(d),Ii.remove(`image:${e}`);const h=Qs.get(this)||[];for(let f=0;f<h.length;f++){const g=h[f];g.onError&&g.onError(d)}Qs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ii.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class J0 extends Mr{constructor(e){super(e)}load(e,t,n,s){const r=new tn,a=new j0(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class Fo extends Ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new nt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Z0 extends Fo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new nt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Cc=new st,Wd=new w,Xd=new w;class xu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.mapType=mi,this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fu,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Wd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Wd),Xd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Xd),t.updateMatrixWorld(),Cc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Cc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Q0 extends xu{constructor(){super(new yn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=fr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class e_ extends Fo{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Q0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const $d=new st,Vr=new w,Pc=new w;class t_ extends xu{constructor(){super(new yn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ze(4,2),this._viewportCount=6,this._viewports=[new bt(2,1,1,1),new bt(0,1,1,1),new bt(3,1,1,1),new bt(1,1,1,1),new bt(3,0,1,1),new bt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Vr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Vr),Pc.copy(n.position),Pc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Pc),n.updateMatrixWorld(),s.makeTranslation(-Vr.x,-Vr.y,-Vr.z),$d.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix($d,n.coordinateSystem,n.reversedDepth)}}class n_ extends Fo{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new t_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Mu extends yf{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class i_ extends xu{constructor(){super(new Mu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class zl extends Fo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.shadow=new i_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Qr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Ic=new WeakMap;class s_ extends Mr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ii.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{if(Ic.has(a)===!0)s&&s(Ic.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Ii.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Ic.set(l,c),Ii.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Ii.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class r_ extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Su="\\[\\]\\.:\\/",a_=new RegExp("["+Su+"]","g"),bu="[^"+Su+"]",o_="[^"+Su.replace("\\.","")+"]",c_=/((?:WC+[\/:])*)/.source.replace("WC",bu),l_=/(WCOD+)?/.source.replace("WCOD",o_),u_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",bu),d_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",bu),h_=new RegExp("^"+c_+l_+u_+d_+"$"),f_=["material","materials","bones","map"];class p_{constructor(e,t,n){const s=n||It.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class It{constructor(e,t,n){this.path=t,this.parsedPath=n||It.parseTrackName(t),this.node=It.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new It.Composite(e,t,n):new It(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(a_,"")}static parseTrackName(e){const t=h_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);f_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=It.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}It.Composite=p_;It.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};It.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};It.prototype.GetterByBindingType=[It.prototype._getValue_direct,It.prototype._getValue_array,It.prototype._getValue_arrayElement,It.prototype._getValue_toArray];It.prototype.SetterByBindingTypeAndVersioning=[[It.prototype._setValue_direct,It.prototype._setValue_direct_setNeedsUpdate,It.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[It.prototype._setValue_array,It.prototype._setValue_array_setNeedsUpdate,It.prototype._setValue_array_setMatrixWorldNeedsUpdate],[It.prototype._setValue_arrayElement,It.prototype._setValue_arrayElement_setNeedsUpdate,It.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[It.prototype._setValue_fromArray,It.prototype._setValue_fromArray_setNeedsUpdate,It.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const qd=new st;class m_{constructor(e,t,n=0,s=1/0){this.ray=new pa(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new uu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return qd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(qd),this}intersectObject(e,t=!0,n=[]){return Hl(e,this,n,t),n.sort(Yd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Hl(e[s],this,n,t);return n.sort(Yd),n}}function Yd(i,e){return i.distance-e.distance}function Hl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Hl(r[a],e,t,!0)}}function Kd(i,e,t,n){const s=g_(n);switch(t){case of:return i*e;case su:return i*e/s.components*s.byteLength;case ru:return i*e/s.components*s.byteLength;case lf:return i*e*2/s.components*s.byteLength;case au:return i*e*2/s.components*s.byteLength;case cf:return i*e*3/s.components*s.byteLength;case Wn:return i*e*4/s.components*s.byteLength;case ou:return i*e*4/s.components*s.byteLength;case po:case mo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case go:case _o:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case cl:case ul:return Math.max(i,16)*Math.max(e,8)/4;case ol:case ll:return Math.max(i,8)*Math.max(e,8)/2;case dl:case hl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case fl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ml:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case gl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case _l:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case vl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case yl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case xl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ml:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Sl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case bl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Tl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case El:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Al:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case wl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Rl:case Cl:case Pl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Il:case Ll:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Dl:case Nl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function g_(i){switch(i){case mi:case nf:return{byteLength:1,components:1};case na:case sf:case fa:return{byteLength:2,components:1};case nu:case iu:return{byteLength:2,components:4};case bs:case tu:case ei:return{byteLength:4,components:1};case rf:case af:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:eu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=eu);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Of(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function __(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,u);else{d.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<d.length;f++){const g=d[h],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,d[h]=v)}d.length=h+1;for(let f=0,g=d.length;f<g;f++){const v=d[f];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var v_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,y_=`#ifdef USE_ALPHAHASH
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
#endif`,x_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,M_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,S_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,b_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,T_=`#ifdef USE_AOMAP
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
#endif`,E_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,A_=`#ifdef USE_BATCHING
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
#endif`,w_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,R_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,C_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,P_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,I_=`#ifdef USE_IRIDESCENCE
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
#endif`,L_=`#ifdef USE_BUMPMAP
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
#endif`,D_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,N_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,U_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,O_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,F_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,B_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,k_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,z_=`#if defined( USE_COLOR_ALPHA )
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
#endif`,H_=`#define PI 3.141592653589793
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
} // validated`,V_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,G_=`vec3 transformedNormal = objectNormal;
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
#endif`,W_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,X_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,q_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Y_="gl_FragColor = linearToOutputTexel( gl_FragColor );",K_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,j_=`#ifdef USE_ENVMAP
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
#endif`,J_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Z_=`#ifdef USE_ENVMAP
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
#endif`,Q_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ev=`#ifdef USE_ENVMAP
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
#endif`,tv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,iv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rv=`#ifdef USE_GRADIENTMAP
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
}`,av=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ov=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lv=`uniform bool receiveShadow;
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
#endif`,uv=`#ifdef USE_ENVMAP
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
#endif`,dv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mv=`PhysicalMaterial material;
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
#endif`,gv=`struct PhysicalMaterial {
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
}`,_v=`
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
#endif`,vv=`#if defined( RE_IndirectDiffuse )
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
#endif`,yv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ev=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Av=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wv=`#if defined( USE_POINTS_UV )
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
#endif`,Rv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Iv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dv=`#ifdef USE_MORPHTARGETS
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
#endif`,Nv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ov=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Fv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zv=`#ifdef USE_NORMALMAP
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
#endif`,Hv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$v=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,qv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ey=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ty=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ny=`float getShadowMask() {
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
}`,iy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sy=`#ifdef USE_SKINNING
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
#endif`,ry=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ay=`#ifdef USE_SKINNING
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
#endif`,oy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ly=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,uy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,dy=`#ifdef USE_TRANSMISSION
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
#endif`,hy=`#ifdef USE_TRANSMISSION
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
#endif`,fy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,py=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,my=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _y=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vy=`uniform sampler2D t2D;
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
}`,yy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,My=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,by=`#include <common>
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
}`,Ty=`#if DEPTH_PACKING == 3200
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
}`,Ey=`#define DISTANCE
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
}`,Ay=`#define DISTANCE
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
}`,wy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ry=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cy=`uniform float scale;
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
}`,Py=`uniform vec3 diffuse;
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
}`,Iy=`#include <common>
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
}`,Ly=`uniform vec3 diffuse;
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
}`,Dy=`#define LAMBERT
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
}`,Ny=`#define LAMBERT
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
}`,Uy=`#define MATCAP
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
}`,Oy=`#define MATCAP
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
}`,Fy=`#define NORMAL
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
}`,By=`#define NORMAL
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
}`,ky=`#define PHONG
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
}`,zy=`#define PHONG
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
}`,Hy=`#define STANDARD
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
}`,Vy=`#define STANDARD
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
}`,Gy=`#define TOON
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
}`,Wy=`#define TOON
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
}`,Xy=`uniform float size;
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
}`,$y=`uniform vec3 diffuse;
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
}`,qy=`#include <common>
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
}`,Yy=`uniform vec3 color;
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
}`,Ky=`uniform float rotation;
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
}`,jy=`uniform vec3 diffuse;
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
}`,ct={alphahash_fragment:v_,alphahash_pars_fragment:y_,alphamap_fragment:x_,alphamap_pars_fragment:M_,alphatest_fragment:S_,alphatest_pars_fragment:b_,aomap_fragment:T_,aomap_pars_fragment:E_,batching_pars_vertex:A_,batching_vertex:w_,begin_vertex:R_,beginnormal_vertex:C_,bsdfs:P_,iridescence_fragment:I_,bumpmap_pars_fragment:L_,clipping_planes_fragment:D_,clipping_planes_pars_fragment:N_,clipping_planes_pars_vertex:U_,clipping_planes_vertex:O_,color_fragment:F_,color_pars_fragment:B_,color_pars_vertex:k_,color_vertex:z_,common:H_,cube_uv_reflection_fragment:V_,defaultnormal_vertex:G_,displacementmap_pars_vertex:W_,displacementmap_vertex:X_,emissivemap_fragment:$_,emissivemap_pars_fragment:q_,colorspace_fragment:Y_,colorspace_pars_fragment:K_,envmap_fragment:j_,envmap_common_pars_fragment:J_,envmap_pars_fragment:Z_,envmap_pars_vertex:Q_,envmap_physical_pars_fragment:uv,envmap_vertex:ev,fog_vertex:tv,fog_pars_vertex:nv,fog_fragment:iv,fog_pars_fragment:sv,gradientmap_pars_fragment:rv,lightmap_pars_fragment:av,lights_lambert_fragment:ov,lights_lambert_pars_fragment:cv,lights_pars_begin:lv,lights_toon_fragment:dv,lights_toon_pars_fragment:hv,lights_phong_fragment:fv,lights_phong_pars_fragment:pv,lights_physical_fragment:mv,lights_physical_pars_fragment:gv,lights_fragment_begin:_v,lights_fragment_maps:vv,lights_fragment_end:yv,logdepthbuf_fragment:xv,logdepthbuf_pars_fragment:Mv,logdepthbuf_pars_vertex:Sv,logdepthbuf_vertex:bv,map_fragment:Tv,map_pars_fragment:Ev,map_particle_fragment:Av,map_particle_pars_fragment:wv,metalnessmap_fragment:Rv,metalnessmap_pars_fragment:Cv,morphinstance_vertex:Pv,morphcolor_vertex:Iv,morphnormal_vertex:Lv,morphtarget_pars_vertex:Dv,morphtarget_vertex:Nv,normal_fragment_begin:Uv,normal_fragment_maps:Ov,normal_pars_fragment:Fv,normal_pars_vertex:Bv,normal_vertex:kv,normalmap_pars_fragment:zv,clearcoat_normal_fragment_begin:Hv,clearcoat_normal_fragment_maps:Vv,clearcoat_pars_fragment:Gv,iridescence_pars_fragment:Wv,opaque_fragment:Xv,packing:$v,premultiplied_alpha_fragment:qv,project_vertex:Yv,dithering_fragment:Kv,dithering_pars_fragment:jv,roughnessmap_fragment:Jv,roughnessmap_pars_fragment:Zv,shadowmap_pars_fragment:Qv,shadowmap_pars_vertex:ey,shadowmap_vertex:ty,shadowmask_pars_fragment:ny,skinbase_vertex:iy,skinning_pars_vertex:sy,skinning_vertex:ry,skinnormal_vertex:ay,specularmap_fragment:oy,specularmap_pars_fragment:cy,tonemapping_fragment:ly,tonemapping_pars_fragment:uy,transmission_fragment:dy,transmission_pars_fragment:hy,uv_pars_fragment:fy,uv_pars_vertex:py,uv_vertex:my,worldpos_vertex:gy,background_vert:_y,background_frag:vy,backgroundCube_vert:yy,backgroundCube_frag:xy,cube_vert:My,cube_frag:Sy,depth_vert:by,depth_frag:Ty,distanceRGBA_vert:Ey,distanceRGBA_frag:Ay,equirect_vert:wy,equirect_frag:Ry,linedashed_vert:Cy,linedashed_frag:Py,meshbasic_vert:Iy,meshbasic_frag:Ly,meshlambert_vert:Dy,meshlambert_frag:Ny,meshmatcap_vert:Uy,meshmatcap_frag:Oy,meshnormal_vert:Fy,meshnormal_frag:By,meshphong_vert:ky,meshphong_frag:zy,meshphysical_vert:Hy,meshphysical_frag:Vy,meshtoon_vert:Gy,meshtoon_frag:Wy,points_vert:Xy,points_frag:$y,shadow_vert:qy,shadow_frag:Yy,sprite_vert:Ky,sprite_frag:jy},Ce={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},hi={basic:{uniforms:vn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:ct.meshbasic_vert,fragmentShader:ct.meshbasic_frag},lambert:{uniforms:vn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new nt(0)}}]),vertexShader:ct.meshlambert_vert,fragmentShader:ct.meshlambert_frag},phong:{uniforms:vn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:ct.meshphong_vert,fragmentShader:ct.meshphong_frag},standard:{uniforms:vn([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag},toon:{uniforms:vn([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new nt(0)}}]),vertexShader:ct.meshtoon_vert,fragmentShader:ct.meshtoon_frag},matcap:{uniforms:vn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:ct.meshmatcap_vert,fragmentShader:ct.meshmatcap_frag},points:{uniforms:vn([Ce.points,Ce.fog]),vertexShader:ct.points_vert,fragmentShader:ct.points_frag},dashed:{uniforms:vn([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ct.linedashed_vert,fragmentShader:ct.linedashed_frag},depth:{uniforms:vn([Ce.common,Ce.displacementmap]),vertexShader:ct.depth_vert,fragmentShader:ct.depth_frag},normal:{uniforms:vn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:ct.meshnormal_vert,fragmentShader:ct.meshnormal_frag},sprite:{uniforms:vn([Ce.sprite,Ce.fog]),vertexShader:ct.sprite_vert,fragmentShader:ct.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ct.background_vert,fragmentShader:ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:ct.backgroundCube_vert,fragmentShader:ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ct.cube_vert,fragmentShader:ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ct.equirect_vert,fragmentShader:ct.equirect_frag},distanceRGBA:{uniforms:vn([Ce.common,Ce.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ct.distanceRGBA_vert,fragmentShader:ct.distanceRGBA_frag},shadow:{uniforms:vn([Ce.lights,Ce.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:ct.shadow_vert,fragmentShader:ct.shadow_frag}};hi.physical={uniforms:vn([hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag};const lo={r:0,b:0,g:0},ms=new qt,Jy=new st;function Zy(i,e,t,n,s,r,a){const o=new nt(0);let l=r===!0?0:1,c,u,d=null,h=0,f=null;function g(T){let x=T.isScene===!0?T.background:null;return x&&x.isTexture&&(x=(T.backgroundBlurriness>0?t:e).get(x)),x}function v(T){let x=!1;const R=g(T);R===null?p(o,l):R&&R.isColor&&(p(R,1),x=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(T,x){const R=g(x);R&&(R.isCubeTexture||R.mapping===Oo)?(u===void 0&&(u=new Ct(new Hn(1,1,1),new rs({name:"BackgroundCubeMaterial",uniforms:pr(hi.backgroundCube.uniforms),vertexShader:hi.backgroundCube.vertexShader,fragmentShader:hi.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,L,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),ms.copy(x.backgroundRotation),ms.x*=-1,ms.y*=-1,ms.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(ms.y*=-1,ms.z*=-1),u.material.uniforms.envMap.value=R,u.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Jy.makeRotationFromEuler(ms)),u.material.toneMapped=gt.getTransfer(R.colorSpace)!==Ut,(d!==R||h!==R.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,d=R,h=R.version,f=i.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new Ct(new ma(2,2),new rs({name:"BackgroundMaterial",uniforms:pr(hi.background.uniforms),vertexShader:hi.background.vertexShader,fragmentShader:hi.background.fragmentShader,side:Ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=gt.getTransfer(R.colorSpace)!==Ut,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(d!==R||h!==R.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=R,h=R.version,f=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function p(T,x){T.getRGB(lo,vf(i)),n.buffers.color.setClear(lo.r,lo.g,lo.b,x,a)}function E(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(T,x=1){o.set(T),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,p(o,l)},render:v,addToRenderList:m,dispose:E}}function Qy(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(M,N,B,H,Y){let J=!1;const te=d(H,B,N);r!==te&&(r=te,c(r.object)),J=f(M,H,B,Y),J&&g(M,H,B,Y),Y!==null&&e.update(Y,i.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,x(M,N,B,H),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function u(M){return i.deleteVertexArray(M)}function d(M,N,B){const H=B.wireframe===!0;let Y=n[M.id];Y===void 0&&(Y={},n[M.id]=Y);let J=Y[N.id];J===void 0&&(J={},Y[N.id]=J);let te=J[H];return te===void 0&&(te=h(l()),J[H]=te),te}function h(M){const N=[],B=[],H=[];for(let Y=0;Y<t;Y++)N[Y]=0,B[Y]=0,H[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:B,attributeDivisors:H,object:M,attributes:{},index:null}}function f(M,N,B,H){const Y=r.attributes,J=N.attributes;let te=0;const se=B.getAttributes();for(const $ in se)if(se[$].location>=0){const Ie=Y[$];let Ue=J[$];if(Ue===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(Ue=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(Ue=M.instanceColor)),Ie===void 0||Ie.attribute!==Ue||Ue&&Ie.data!==Ue.data)return!0;te++}return r.attributesNum!==te||r.index!==H}function g(M,N,B,H){const Y={},J=N.attributes;let te=0;const se=B.getAttributes();for(const $ in se)if(se[$].location>=0){let Ie=J[$];Ie===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(Ie=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(Ie=M.instanceColor));const Ue={};Ue.attribute=Ie,Ie&&Ie.data&&(Ue.data=Ie.data),Y[$]=Ue,te++}r.attributes=Y,r.attributesNum=te,r.index=H}function v(){const M=r.newAttributes;for(let N=0,B=M.length;N<B;N++)M[N]=0}function m(M){p(M,0)}function p(M,N){const B=r.newAttributes,H=r.enabledAttributes,Y=r.attributeDivisors;B[M]=1,H[M]===0&&(i.enableVertexAttribArray(M),H[M]=1),Y[M]!==N&&(i.vertexAttribDivisor(M,N),Y[M]=N)}function E(){const M=r.newAttributes,N=r.enabledAttributes;for(let B=0,H=N.length;B<H;B++)N[B]!==M[B]&&(i.disableVertexAttribArray(B),N[B]=0)}function T(M,N,B,H,Y,J,te){te===!0?i.vertexAttribIPointer(M,N,B,Y,J):i.vertexAttribPointer(M,N,B,H,Y,J)}function x(M,N,B,H){v();const Y=H.attributes,J=B.getAttributes(),te=N.defaultAttributeValues;for(const se in J){const $=J[se];if($.location>=0){let ve=Y[se];if(ve===void 0&&(se==="instanceMatrix"&&M.instanceMatrix&&(ve=M.instanceMatrix),se==="instanceColor"&&M.instanceColor&&(ve=M.instanceColor)),ve!==void 0){const Ie=ve.normalized,Ue=ve.itemSize,at=e.get(ve);if(at===void 0)continue;const _t=at.buffer,xt=at.type,Re=at.bytesPerElement,Z=xt===i.INT||xt===i.UNSIGNED_INT||ve.gpuType===tu;if(ve.isInterleavedBufferAttribute){const j=ve.data,we=j.stride,Xe=ve.offset;if(j.isInstancedInterleavedBuffer){for(let Ae=0;Ae<$.locationSize;Ae++)p($.location+Ae,j.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Ae=0;Ae<$.locationSize;Ae++)m($.location+Ae);i.bindBuffer(i.ARRAY_BUFFER,_t);for(let Ae=0;Ae<$.locationSize;Ae++)T($.location+Ae,Ue/$.locationSize,xt,Ie,we*Re,(Xe+Ue/$.locationSize*Ae)*Re,Z)}else{if(ve.isInstancedBufferAttribute){for(let j=0;j<$.locationSize;j++)p($.location+j,ve.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let j=0;j<$.locationSize;j++)m($.location+j);i.bindBuffer(i.ARRAY_BUFFER,_t);for(let j=0;j<$.locationSize;j++)T($.location+j,Ue/$.locationSize,xt,Ie,Ue*Re,Ue/$.locationSize*j*Re,Z)}}else if(te!==void 0){const Ie=te[se];if(Ie!==void 0)switch(Ie.length){case 2:i.vertexAttrib2fv($.location,Ie);break;case 3:i.vertexAttrib3fv($.location,Ie);break;case 4:i.vertexAttrib4fv($.location,Ie);break;default:i.vertexAttrib1fv($.location,Ie)}}}}E()}function R(){O();for(const M in n){const N=n[M];for(const B in N){const H=N[B];for(const Y in H)u(H[Y].object),delete H[Y];delete N[B]}delete n[M]}}function C(M){if(n[M.id]===void 0)return;const N=n[M.id];for(const B in N){const H=N[B];for(const Y in H)u(H[Y].object),delete H[Y];delete N[B]}delete n[M.id]}function L(M){for(const N in n){const B=n[N];if(B[M.id]===void 0)continue;const H=B[M.id];for(const Y in H)u(H[Y].object),delete H[Y];delete B[M.id]}}function O(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:O,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:m,disableUnusedAttributes:E}}function ex(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let f=0;for(let g=0;g<d;g++)f+=u[g];t.update(f,n,1)}function l(c,u,d,h){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],u[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,d);let g=0;for(let v=0;v<d;v++)g+=u[v]*h[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function tx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==Wn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const O=L===fa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==mi&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==ei&&!O)}function l(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:T,maxFragmentUniforms:x,vertexTextures:R,maxSamples:C}}function nx(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new es,o=new ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||s;return s=h,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const E=r?0:n,T=E*4;let x=p.clippingState||null;l.value=x,x=u(g,h,T,f);for(let R=0;R!==T;++R)x[R]=t[R];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,E=h.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let T=0,x=f;T!==v;++T,x+=4)a.copy(d[T]).applyMatrix4(E,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function ix(i){let e=new WeakMap;function t(a,o){return o===rl?a.mapping=ur:o===al&&(a.mapping=dr),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===rl||o===al)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new o0(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const ir=4,jd=[.125,.215,.35,.446,.526,.582],xs=20,Lc=new Mu,Jd=new nt;let Dc=null,Nc=0,Uc=0,Oc=!1;const vs=(1+Math.sqrt(5))/2,er=1/vs,Zd=[new w(-vs,er,0),new w(vs,er,0),new w(-er,0,vs),new w(er,0,vs),new w(0,vs,-er),new w(0,vs,er),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],sx=new w;class Qd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=sx}=r;Dc=this._renderer.getRenderTarget(),Nc=this._renderer.getActiveCubeFace(),Uc=this._renderer.getActiveMipmapLevel(),Oc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=th(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Dc,Nc,Uc),this._renderer.xr.enabled=Oc,e.scissorTest=!1,uo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ur||e.mapping===dr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Dc=this._renderer.getRenderTarget(),Nc=this._renderer.getActiveCubeFace(),Uc=this._renderer.getActiveMipmapLevel(),Oc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Nn,minFilter:Nn,generateMipmaps:!1,type:fa,format:Wn,colorSpace:Tn,depthBuffer:!1},s=eh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=eh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=rx(r)),this._blurMaterial=ax(r,e,t)}return s}_compileMaterial(e){const t=new Ct(this._lodPlanes[0],e);this._renderer.compile(t,Lc)}_sceneToCubeUV(e,t,n,s,r){const l=new yn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Jd),d.toneMapping=ss,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));const v=new Gn({name:"PMREM.Background",side:Cn,depthWrite:!1,depthTest:!1}),m=new Ct(new Hn,v);let p=!1;const E=e.background;E?E.isColor&&(v.color.copy(E),e.background=null,p=!0):(v.color.copy(Jd),p=!0);for(let T=0;T<6;T++){const x=T%3;x===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[T],r.y,r.z)):x===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[T]));const R=this._cubeSize;uo(s,x*R,T>2?R:0,R,R),d.setRenderTarget(s),p&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=f,d.autoClear=h,e.background=E}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ur||e.mapping===dr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=nh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=th());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ct(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;uo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Lc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Zd[(s-r-1)%Zd.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Ct(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*xs-1),v=r/g,m=isFinite(r)?1+Math.floor(u*v):xs;m>xs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${xs}`);const p=[];let E=0;for(let L=0;L<xs;++L){const O=L/v,b=Math.exp(-O*O/2);p.push(b),L===0?E+=b:L<m&&(E+=2*b)}for(let L=0;L<p.length;L++)p[L]=p[L]/E;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:T}=this;h.dTheta.value=g,h.mipInt.value=T-n;const x=this._sizeLods[s],R=3*x*(s>T-ir?s-T+ir:0),C=4*(this._cubeSize-x);uo(t,R,C,3*x,2*x),l.setRenderTarget(t),l.render(d,Lc)}}function rx(i){const e=[],t=[],n=[];let s=i;const r=i-ir+1+jd.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-ir?l=jd[a-i+ir-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,v=3,m=2,p=1,E=new Float32Array(v*g*f),T=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let C=0;C<f;C++){const L=C%3*2/3-1,O=C>2?0:-1,b=[L,O,0,L+2/3,O,0,L+2/3,O+1,0,L,O,0,L+2/3,O+1,0,L,O+1,0];E.set(b,v*g*C),T.set(h,m*g*C);const M=[C,C,C,C,C,C];x.set(M,p*g*C)}const R=new on;R.setAttribute("position",new bn(E,v)),R.setAttribute("uv",new bn(T,m)),R.setAttribute("faceIndex",new bn(x,p)),e.push(R),s>ir&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function eh(i,e,t){const n=new Ts(i,e,t);return n.texture.mapping=Oo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function uo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function ax(i,e,t){const n=new Float32Array(xs),s=new w(0,1,0);return new rs({name:"SphericalGaussianBlur",defines:{n:xs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Tu(),fragmentShader:`

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
		`,blending:is,depthTest:!1,depthWrite:!1})}function th(){return new rs({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tu(),fragmentShader:`

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
		`,blending:is,depthTest:!1,depthWrite:!1})}function nh(){return new rs({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:is,depthTest:!1,depthWrite:!1})}function Tu(){return`

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
	`}function ox(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===rl||l===al,u=l===ur||l===dr;if(c||u){let d=e.get(o);const h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Qd(i)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new Qd(i)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function cx(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&la("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function lx(i,e,t,n){const s={},r=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const f in h)e.update(h[f],i.ARRAY_BUFFER)}function c(d){const h=[],f=d.index,g=d.attributes.position;let v=0;if(f!==null){const E=f.array;v=f.version;for(let T=0,x=E.length;T<x;T+=3){const R=E[T+0],C=E[T+1],L=E[T+2];h.push(R,C,C,L,L,R)}}else if(g!==void 0){const E=g.array;v=g.version;for(let T=0,x=E.length/3-1;T<x;T+=3){const R=T+0,C=T+1,L=T+2;h.push(R,C,C,L,L,R)}}else return;const m=new(ff(h)?_f:gf)(h,1);m.version=v;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function u(d){const h=r.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function ux(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,f){i.drawElements(n,f,r,h*a),t.update(f,n,1)}function c(h,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,h*a,g),t.update(f,n,g))}function u(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function d(h,f,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,h,0,v,0,g);let p=0;for(let E=0;E<g;E++)p+=f[E]*v[E];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function dx(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function hx(i,e,t){const n=new WeakMap,s=new bt;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let M=function(){O.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var f=M;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let R=o.attributes.position.count*x,C=1;R>e.maxTextureSize&&(C=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const L=new Float32Array(R*C*4*d),O=new pf(L,R,C,d);O.type=ei,O.needsUpdate=!0;const b=x*4;for(let N=0;N<d;N++){const B=p[N],H=E[N],Y=T[N],J=R*C*4*N;for(let te=0;te<B.count;te++){const se=te*b;g===!0&&(s.fromBufferAttribute(B,te),L[J+se+0]=s.x,L[J+se+1]=s.y,L[J+se+2]=s.z,L[J+se+3]=0),v===!0&&(s.fromBufferAttribute(H,te),L[J+se+4]=s.x,L[J+se+5]=s.y,L[J+se+6]=s.z,L[J+se+7]=0),m===!0&&(s.fromBufferAttribute(Y,te),L[J+se+8]=s.x,L[J+se+9]=s.y,L[J+se+10]=s.z,L[J+se+11]=Y.itemSize===4?s.w:1)}}h={count:d,texture:O,size:new ze(R,C)},n.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function fx(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const Ff=new tn,ih=new Cf(1,1),Bf=new pf,kf=new Wg,zf=new xf,sh=[],rh=[],ah=new Float32Array(16),oh=new Float32Array(9),ch=new Float32Array(4);function Sr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=sh[s];if(r===void 0&&(r=new Float32Array(s),sh[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function nn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function sn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Bo(i,e){let t=rh[e];t===void 0&&(t=new Int32Array(e),rh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function px(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function mx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;i.uniform2fv(this.addr,e),sn(t,e)}}function gx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(nn(t,e))return;i.uniform3fv(this.addr,e),sn(t,e)}}function _x(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;i.uniform4fv(this.addr,e),sn(t,e)}}function vx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;ch.set(n),i.uniformMatrix2fv(this.addr,!1,ch),sn(t,n)}}function yx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;oh.set(n),i.uniformMatrix3fv(this.addr,!1,oh),sn(t,n)}}function xx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;ah.set(n),i.uniformMatrix4fv(this.addr,!1,ah),sn(t,n)}}function Mx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Sx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;i.uniform2iv(this.addr,e),sn(t,e)}}function bx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;i.uniform3iv(this.addr,e),sn(t,e)}}function Tx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;i.uniform4iv(this.addr,e),sn(t,e)}}function Ex(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ax(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;i.uniform2uiv(this.addr,e),sn(t,e)}}function wx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;i.uniform3uiv(this.addr,e),sn(t,e)}}function Rx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;i.uniform4uiv(this.addr,e),sn(t,e)}}function Cx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ih.compareFunction=hf,r=ih):r=Ff,t.setTexture2D(e||r,s)}function Px(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||kf,s)}function Ix(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||zf,s)}function Lx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Bf,s)}function Dx(i){switch(i){case 5126:return px;case 35664:return mx;case 35665:return gx;case 35666:return _x;case 35674:return vx;case 35675:return yx;case 35676:return xx;case 5124:case 35670:return Mx;case 35667:case 35671:return Sx;case 35668:case 35672:return bx;case 35669:case 35673:return Tx;case 5125:return Ex;case 36294:return Ax;case 36295:return wx;case 36296:return Rx;case 35678:case 36198:case 36298:case 36306:case 35682:return Cx;case 35679:case 36299:case 36307:return Px;case 35680:case 36300:case 36308:case 36293:return Ix;case 36289:case 36303:case 36311:case 36292:return Lx}}function Nx(i,e){i.uniform1fv(this.addr,e)}function Ux(i,e){const t=Sr(e,this.size,2);i.uniform2fv(this.addr,t)}function Ox(i,e){const t=Sr(e,this.size,3);i.uniform3fv(this.addr,t)}function Fx(i,e){const t=Sr(e,this.size,4);i.uniform4fv(this.addr,t)}function Bx(i,e){const t=Sr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function kx(i,e){const t=Sr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function zx(i,e){const t=Sr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Hx(i,e){i.uniform1iv(this.addr,e)}function Vx(i,e){i.uniform2iv(this.addr,e)}function Gx(i,e){i.uniform3iv(this.addr,e)}function Wx(i,e){i.uniform4iv(this.addr,e)}function Xx(i,e){i.uniform1uiv(this.addr,e)}function $x(i,e){i.uniform2uiv(this.addr,e)}function qx(i,e){i.uniform3uiv(this.addr,e)}function Yx(i,e){i.uniform4uiv(this.addr,e)}function Kx(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Ff,r[a])}function jx(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||kf,r[a])}function Jx(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||zf,r[a])}function Zx(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Bf,r[a])}function Qx(i){switch(i){case 5126:return Nx;case 35664:return Ux;case 35665:return Ox;case 35666:return Fx;case 35674:return Bx;case 35675:return kx;case 35676:return zx;case 5124:case 35670:return Hx;case 35667:case 35671:return Vx;case 35668:case 35672:return Gx;case 35669:case 35673:return Wx;case 5125:return Xx;case 36294:return $x;case 36295:return qx;case 36296:return Yx;case 35678:case 36198:case 36298:case 36306:case 35682:return Kx;case 35679:case 36299:case 36307:return jx;case 35680:case 36300:case 36308:case 36293:return Jx;case 36289:case 36303:case 36311:case 36292:return Zx}}class eM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Dx(t.type)}}class tM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Qx(t.type)}}class nM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Fc=/(\w+)(\])?(\[|\.)?/g;function lh(i,e){i.seq.push(e),i.map[e.id]=e}function iM(i,e,t){const n=i.name,s=n.length;for(Fc.lastIndex=0;;){const r=Fc.exec(n),a=Fc.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){lh(t,c===void 0?new eM(o,i,e):new tM(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new nM(o),lh(t,d)),t=d}}}class vo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);iM(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function uh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const sM=37297;let rM=0;function aM(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const dh=new ot;function oM(i){gt._getMatrix(dh,gt.workingColorSpace,i);const e=`mat3( ${dh.elements.map(t=>t.toFixed(4))} )`;switch(gt.getTransfer(i)){case To:return[e,"LinearTransferOETF"];case Ut:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function hh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+aM(i.getShaderSource(e),o)}else return r}function cM(i,e){const t=oM(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function lM(i,e){let t;switch(e){case ng:t="Linear";break;case ig:t="Reinhard";break;case sg:t="Cineon";break;case Qh:t="ACESFilmic";break;case ag:t="AgX";break;case og:t="Neutral";break;case rg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ho=new w;function uM(){gt.getLuminanceCoefficients(ho);const i=ho.x.toFixed(4),e=ho.y.toFixed(4),t=ho.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qr).join(`
`)}function hM(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function fM(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function qr(i){return i!==""}function fh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ph(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const pM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vl(i){return i.replace(pM,gM)}const mM=new Map;function gM(i,e){let t=ct[e];if(t===void 0){const n=mM.get(e);if(n!==void 0)t=ct[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Vl(t)}const _M=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mh(i){return i.replace(_M,vM)}function vM(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function gh(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function yM(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===jh?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Jh?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===wi&&(e="SHADOWMAP_TYPE_VSM"),e}function xM(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ur:case dr:e="ENVMAP_TYPE_CUBE";break;case Oo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function MM(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case dr:e="ENVMAP_MODE_REFRACTION";break}return e}function SM(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Zh:e="ENVMAP_BLENDING_MULTIPLY";break;case eg:e="ENVMAP_BLENDING_MIX";break;case tg:e="ENVMAP_BLENDING_ADD";break}return e}function bM(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function TM(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=yM(t),c=xM(t),u=MM(t),d=SM(t),h=bM(t),f=dM(t),g=hM(r),v=s.createProgram();let m,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(qr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(qr).join(`
`),p.length>0&&(p+=`
`)):(m=[gh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qr).join(`
`),p=[gh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ss?"#define TONE_MAPPING":"",t.toneMapping!==ss?ct.tonemapping_pars_fragment:"",t.toneMapping!==ss?lM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ct.colorspace_pars_fragment,cM("linearToOutputTexel",t.outputColorSpace),uM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qr).join(`
`)),a=Vl(a),a=fh(a,t),a=ph(a,t),o=Vl(o),o=fh(o,t),o=ph(o,t),a=mh(a),o=mh(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===od?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===od?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=E+m+a,x=E+p+o,R=uh(s,s.VERTEX_SHADER,T),C=uh(s,s.FRAGMENT_SHADER,x);s.attachShader(v,R),s.attachShader(v,C),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function L(N){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(v)||"",H=s.getShaderInfoLog(R)||"",Y=s.getShaderInfoLog(C)||"",J=B.trim(),te=H.trim(),se=Y.trim();let $=!0,ve=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,R,C);else{const Ie=hh(s,R,"vertex"),Ue=hh(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+J+`
`+Ie+`
`+Ue)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(te===""||se==="")&&(ve=!1);ve&&(N.diagnostics={runnable:$,programLog:J,vertexShader:{log:te,prefix:m},fragmentShader:{log:se,prefix:p}})}s.deleteShader(R),s.deleteShader(C),O=new vo(s,v),b=fM(s,v)}let O;this.getUniforms=function(){return O===void 0&&L(this),O};let b;this.getAttributes=function(){return b===void 0&&L(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,sM)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rM++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=C,this}let EM=0;class AM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new wM(e),t.set(e,n)),n}}class wM{constructor(e){this.id=EM++,this.code=e,this.usedTimes=0}}function RM(i,e,t,n,s,r,a){const o=new uu,l=new AM,c=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,M,N,B,H){const Y=B.fog,J=H.geometry,te=b.isMeshStandardMaterial?B.environment:null,se=(b.isMeshStandardMaterial?t:e).get(b.envMap||te),$=se&&se.mapping===Oo?se.image.height:null,ve=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const Ie=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Ue=Ie!==void 0?Ie.length:0;let at=0;J.morphAttributes.position!==void 0&&(at=1),J.morphAttributes.normal!==void 0&&(at=2),J.morphAttributes.color!==void 0&&(at=3);let _t,xt,Re,Z;if(ve){const ht=hi[ve];_t=ht.vertexShader,xt=ht.fragmentShader}else _t=b.vertexShader,xt=b.fragmentShader,l.update(b),Re=l.getVertexShaderID(b),Z=l.getFragmentShaderID(b);const j=i.getRenderTarget(),we=i.state.buffers.depth.getReversed(),Xe=H.isInstancedMesh===!0,Ae=H.isBatchedMesh===!0,Ye=!!b.map,Mt=!!b.matcap,U=!!se,St=!!b.aoMap,He=!!b.lightMap,$e=!!b.bumpMap,be=!!b.normalMap,Tt=!!b.displacementMap,Be=!!b.emissiveMap,rt=!!b.metalnessMap,$t=!!b.roughnessMap,Ft=b.anisotropy>0,P=b.clearcoat>0,S=b.dispersion>0,X=b.iridescence>0,re=b.sheen>0,ie=b.transmission>0,ee=Ft&&!!b.anisotropyMap,ce=P&&!!b.clearcoatMap,ne=P&&!!b.clearcoatNormalMap,De=P&&!!b.clearcoatRoughnessMap,Pe=X&&!!b.iridescenceMap,me=X&&!!b.iridescenceThicknessMap,Te=re&&!!b.sheenColorMap,qe=re&&!!b.sheenRoughnessMap,Ge=!!b.specularMap,Ee=!!b.specularColorMap,et=!!b.specularIntensityMap,F=ie&&!!b.transmissionMap,ge=ie&&!!b.thicknessMap,xe=!!b.gradientMap,Ne=!!b.alphaMap,ae=b.alphaTest>0,oe=!!b.alphaHash,ue=!!b.extensions;let We=ss;b.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(We=i.toneMapping);const Me={shaderID:ve,shaderType:b.type,shaderName:b.name,vertexShader:_t,fragmentShader:xt,defines:b.defines,customVertexShaderID:Re,customFragmentShaderID:Z,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Ae,batchingColor:Ae&&H._colorsTexture!==null,instancing:Xe,instancingColor:Xe&&H.instanceColor!==null,instancingMorph:Xe&&H.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:j===null?i.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Tn,alphaToCoverage:!!b.alphaToCoverage,map:Ye,matcap:Mt,envMap:U,envMapMode:U&&se.mapping,envMapCubeUVHeight:$,aoMap:St,lightMap:He,bumpMap:$e,normalMap:be,displacementMap:h&&Tt,emissiveMap:Be,normalMapObjectSpace:be&&b.normalMapType===fg,normalMapTangentSpace:be&&b.normalMapType===df,metalnessMap:rt,roughnessMap:$t,anisotropy:Ft,anisotropyMap:ee,clearcoat:P,clearcoatMap:ce,clearcoatNormalMap:ne,clearcoatRoughnessMap:De,dispersion:S,iridescence:X,iridescenceMap:Pe,iridescenceThicknessMap:me,sheen:re,sheenColorMap:Te,sheenRoughnessMap:qe,specularMap:Ge,specularColorMap:Ee,specularIntensityMap:et,transmission:ie,transmissionMap:F,thicknessMap:ge,gradientMap:xe,opaque:b.transparent===!1&&b.blending===sr&&b.alphaToCoverage===!1,alphaMap:Ne,alphaTest:ae,alphaHash:oe,combine:b.combine,mapUv:Ye&&v(b.map.channel),aoMapUv:St&&v(b.aoMap.channel),lightMapUv:He&&v(b.lightMap.channel),bumpMapUv:$e&&v(b.bumpMap.channel),normalMapUv:be&&v(b.normalMap.channel),displacementMapUv:Tt&&v(b.displacementMap.channel),emissiveMapUv:Be&&v(b.emissiveMap.channel),metalnessMapUv:rt&&v(b.metalnessMap.channel),roughnessMapUv:$t&&v(b.roughnessMap.channel),anisotropyMapUv:ee&&v(b.anisotropyMap.channel),clearcoatMapUv:ce&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:ne&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:De&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Pe&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:me&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:qe&&v(b.sheenRoughnessMap.channel),specularMapUv:Ge&&v(b.specularMap.channel),specularColorMapUv:Ee&&v(b.specularColorMap.channel),specularIntensityMapUv:et&&v(b.specularIntensityMap.channel),transmissionMapUv:F&&v(b.transmissionMap.channel),thicknessMapUv:ge&&v(b.thicknessMap.channel),alphaMapUv:Ne&&v(b.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(be||Ft),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!J.attributes.uv&&(Ye||Ne),fog:!!Y,useFog:b.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:we,skinning:H.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:Ue,morphTextureStride:at,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:We,decodeVideoTexture:Ye&&b.map.isVideoTexture===!0&&gt.getTransfer(b.map.colorSpace)===Ut,decodeVideoTextureEmissive:Be&&b.emissiveMap.isVideoTexture===!0&&gt.getTransfer(b.emissiveMap.colorSpace)===Ut,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Zn,flipSided:b.side===Cn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:ue&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ue&&b.extensions.multiDraw===!0||Ae)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function p(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const N in b.defines)M.push(N),M.push(b.defines[N]);return b.isRawShaderMaterial===!1&&(E(M,b),T(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function E(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function T(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function x(b){const M=g[b.type];let N;if(M){const B=hi[M];N=i0.clone(B.uniforms)}else N=b.uniforms;return N}function R(b,M){let N;for(let B=0,H=u.length;B<H;B++){const Y=u[B];if(Y.cacheKey===M){N=Y,++N.usedTimes;break}}return N===void 0&&(N=new TM(i,M,b,r),u.push(N)),N}function C(b){if(--b.usedTimes===0){const M=u.indexOf(b);u[M]=u[u.length-1],u.pop(),b.destroy()}}function L(b){l.remove(b)}function O(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:R,releaseProgram:C,releaseShaderCache:L,programs:u,dispose:O}}function CM(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function PM(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function _h(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function vh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d,h,f,g,v,m){let p=i[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},i[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=v,p.group=m),e++,p}function o(d,h,f,g,v,m){const p=a(d,h,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(d,h,f,g,v,m){const p=a(d,h,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(d,h){t.length>1&&t.sort(d||PM),n.length>1&&n.sort(h||_h),s.length>1&&s.sort(h||_h)}function u(){for(let d=e,h=i.length;d<h;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function IM(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new vh,i.set(n,[a])):s>=r.length?(a=new vh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function LM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new nt};break;case"SpotLight":t={position:new w,direction:new w,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new w,halfWidth:new w,halfHeight:new w};break}return i[e.id]=t,t}}}function DM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let NM=0;function UM(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function OM(i){const e=new LM,t=DM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new w);const s=new w,r=new st,a=new st;function o(c){let u=0,d=0,h=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,E=0,T=0,x=0,R=0,C=0,L=0;c.sort(UM);for(let b=0,M=c.length;b<M;b++){const N=c[b],B=N.color,H=N.intensity,Y=N.distance,J=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)u+=B.r*H,d+=B.g*H,h+=B.b*H;else if(N.isLightProbe){for(let te=0;te<9;te++)n.probe[te].addScaledVector(N.sh.coefficients[te],H);L++}else if(N.isDirectionalLight){const te=e.get(N);if(te.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const se=N.shadow,$=t.get(N);$.shadowIntensity=se.intensity,$.shadowBias=se.bias,$.shadowNormalBias=se.normalBias,$.shadowRadius=se.radius,$.shadowMapSize=se.mapSize,n.directionalShadow[f]=$,n.directionalShadowMap[f]=J,n.directionalShadowMatrix[f]=N.shadow.matrix,E++}n.directional[f]=te,f++}else if(N.isSpotLight){const te=e.get(N);te.position.setFromMatrixPosition(N.matrixWorld),te.color.copy(B).multiplyScalar(H),te.distance=Y,te.coneCos=Math.cos(N.angle),te.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),te.decay=N.decay,n.spot[v]=te;const se=N.shadow;if(N.map&&(n.spotLightMap[R]=N.map,R++,se.updateMatrices(N),N.castShadow&&C++),n.spotLightMatrix[v]=se.matrix,N.castShadow){const $=t.get(N);$.shadowIntensity=se.intensity,$.shadowBias=se.bias,$.shadowNormalBias=se.normalBias,$.shadowRadius=se.radius,$.shadowMapSize=se.mapSize,n.spotShadow[v]=$,n.spotShadowMap[v]=J,x++}v++}else if(N.isRectAreaLight){const te=e.get(N);te.color.copy(B).multiplyScalar(H),te.halfWidth.set(N.width*.5,0,0),te.halfHeight.set(0,N.height*.5,0),n.rectArea[m]=te,m++}else if(N.isPointLight){const te=e.get(N);if(te.color.copy(N.color).multiplyScalar(N.intensity),te.distance=N.distance,te.decay=N.decay,N.castShadow){const se=N.shadow,$=t.get(N);$.shadowIntensity=se.intensity,$.shadowBias=se.bias,$.shadowNormalBias=se.normalBias,$.shadowRadius=se.radius,$.shadowMapSize=se.mapSize,$.shadowCameraNear=se.camera.near,$.shadowCameraFar=se.camera.far,n.pointShadow[g]=$,n.pointShadowMap[g]=J,n.pointShadowMatrix[g]=N.shadow.matrix,T++}n.point[g]=te,g++}else if(N.isHemisphereLight){const te=e.get(N);te.skyColor.copy(N.color).multiplyScalar(H),te.groundColor.copy(N.groundColor).multiplyScalar(H),n.hemi[p]=te,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ce.LTC_FLOAT_1,n.rectAreaLTC2=Ce.LTC_FLOAT_2):(n.rectAreaLTC1=Ce.LTC_HALF_1,n.rectAreaLTC2=Ce.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const O=n.hash;(O.directionalLength!==f||O.pointLength!==g||O.spotLength!==v||O.rectAreaLength!==m||O.hemiLength!==p||O.numDirectionalShadows!==E||O.numPointShadows!==T||O.numSpotShadows!==x||O.numSpotMaps!==R||O.numLightProbes!==L)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=x+R-C,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=L,O.directionalLength=f,O.pointLength=g,O.spotLength=v,O.rectAreaLength=m,O.hemiLength=p,O.numDirectionalShadows=E,O.numPointShadows=T,O.numSpotShadows=x,O.numSpotMaps=R,O.numLightProbes=L,n.version=NM++)}function l(c,u){let d=0,h=0,f=0,g=0,v=0;const m=u.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){const T=c[p];if(T.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(T.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(T.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(T.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(T.width*.5,0,0),x.halfHeight.set(0,T.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(T.isPointLight){const x=n.point[h];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),h++}else if(T.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(T.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function yh(i){const e=new OM(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function FM(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new yh(i),e.set(s,[o])):r>=a.length?(o=new yh(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const BM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kM=`uniform sampler2D shadow_pass;
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
}`;function zM(i,e,t){let n=new fu;const s=new ze,r=new ze,a=new bt,o=new O0({depthPacking:hg}),l=new F0,c={},u=t.maxTextureSize,d={[Ni]:Cn,[Cn]:Ni,[Zn]:Zn},h=new rs({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:BM,fragmentShader:kM}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new on;g.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ct(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jh;let p=this.type;this.render=function(C,L,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const b=i.getRenderTarget(),M=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),B=i.state;B.setBlending(is),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const H=p!==wi&&this.type===wi,Y=p===wi&&this.type!==wi;for(let J=0,te=C.length;J<te;J++){const se=C[J],$=se.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",se,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const ve=$.getFrameExtents();if(s.multiply(ve),r.copy($.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ve.x),s.x=r.x*ve.x,$.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ve.y),s.y=r.y*ve.y,$.mapSize.y=r.y)),$.map===null||H===!0||Y===!0){const Ue=this.type!==wi?{minFilter:Sn,magFilter:Sn}:{};$.map!==null&&$.map.dispose(),$.map=new Ts(s.x,s.y,Ue),$.map.texture.name=se.name+".shadowMap",$.camera.updateProjectionMatrix()}i.setRenderTarget($.map),i.clear();const Ie=$.getViewportCount();for(let Ue=0;Ue<Ie;Ue++){const at=$.getViewport(Ue);a.set(r.x*at.x,r.y*at.y,r.x*at.z,r.y*at.w),B.viewport(a),$.updateMatrices(se,Ue),n=$.getFrustum(),x(L,O,$.camera,se,this.type)}$.isPointLightShadow!==!0&&this.type===wi&&E($,O),$.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,N)};function E(C,L){const O=e.update(v);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Ts(s.x,s.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(L,null,O,h,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(L,null,O,f,v,null)}function T(C,L,O,b){let M=null;const N=O.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(N!==void 0)M=N;else if(M=O.isPointLight===!0?l:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const B=M.uuid,H=L.uuid;let Y=c[B];Y===void 0&&(Y={},c[B]=Y);let J=Y[H];J===void 0&&(J=M.clone(),Y[H]=J,L.addEventListener("dispose",R)),M=J}if(M.visible=L.visible,M.wireframe=L.wireframe,b===wi?M.side=L.shadowSide!==null?L.shadowSide:L.side:M.side=L.shadowSide!==null?L.shadowSide:d[L.side],M.alphaMap=L.alphaMap,M.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,M.map=L.map,M.clipShadows=L.clipShadows,M.clippingPlanes=L.clippingPlanes,M.clipIntersection=L.clipIntersection,M.displacementMap=L.displacementMap,M.displacementScale=L.displacementScale,M.displacementBias=L.displacementBias,M.wireframeLinewidth=L.wireframeLinewidth,M.linewidth=L.linewidth,O.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const B=i.properties.get(M);B.light=O}return M}function x(C,L,O,b,M){if(C.visible===!1)return;if(C.layers.test(L.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===wi)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,C.matrixWorld);const H=e.update(C),Y=C.material;if(Array.isArray(Y)){const J=H.groups;for(let te=0,se=J.length;te<se;te++){const $=J[te],ve=Y[$.materialIndex];if(ve&&ve.visible){const Ie=T(C,ve,b,M);C.onBeforeShadow(i,C,L,O,H,Ie,$),i.renderBufferDirect(O,null,H,Ie,C,$),C.onAfterShadow(i,C,L,O,H,Ie,$)}}}else if(Y.visible){const J=T(C,Y,b,M);C.onBeforeShadow(i,C,L,O,H,J,null),i.renderBufferDirect(O,null,H,J,C,null),C.onAfterShadow(i,C,L,O,H,J,null)}}const B=C.children;for(let H=0,Y=B.length;H<Y;H++)x(B[H],L,O,b,M)}function R(C){C.target.removeEventListener("dispose",R);for(const O in c){const b=c[O],M=C.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const HM={[Zc]:Qc,[el]:il,[tl]:sl,[lr]:nl,[Qc]:Zc,[il]:el,[sl]:tl,[nl]:lr};function VM(i,e){function t(){let F=!1;const ge=new bt;let xe=null;const Ne=new bt(0,0,0,0);return{setMask:function(ae){xe!==ae&&!F&&(i.colorMask(ae,ae,ae,ae),xe=ae)},setLocked:function(ae){F=ae},setClear:function(ae,oe,ue,We,Me){Me===!0&&(ae*=We,oe*=We,ue*=We),ge.set(ae,oe,ue,We),Ne.equals(ge)===!1&&(i.clearColor(ae,oe,ue,We),Ne.copy(ge))},reset:function(){F=!1,xe=null,Ne.set(-1,0,0,0)}}}function n(){let F=!1,ge=!1,xe=null,Ne=null,ae=null;return{setReversed:function(oe){if(ge!==oe){const ue=e.get("EXT_clip_control");oe?ue.clipControlEXT(ue.LOWER_LEFT_EXT,ue.ZERO_TO_ONE_EXT):ue.clipControlEXT(ue.LOWER_LEFT_EXT,ue.NEGATIVE_ONE_TO_ONE_EXT),ge=oe;const We=ae;ae=null,this.setClear(We)}},getReversed:function(){return ge},setTest:function(oe){oe?j(i.DEPTH_TEST):we(i.DEPTH_TEST)},setMask:function(oe){xe!==oe&&!F&&(i.depthMask(oe),xe=oe)},setFunc:function(oe){if(ge&&(oe=HM[oe]),Ne!==oe){switch(oe){case Zc:i.depthFunc(i.NEVER);break;case Qc:i.depthFunc(i.ALWAYS);break;case el:i.depthFunc(i.LESS);break;case lr:i.depthFunc(i.LEQUAL);break;case tl:i.depthFunc(i.EQUAL);break;case nl:i.depthFunc(i.GEQUAL);break;case il:i.depthFunc(i.GREATER);break;case sl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ne=oe}},setLocked:function(oe){F=oe},setClear:function(oe){ae!==oe&&(ge&&(oe=1-oe),i.clearDepth(oe),ae=oe)},reset:function(){F=!1,xe=null,Ne=null,ae=null,ge=!1}}}function s(){let F=!1,ge=null,xe=null,Ne=null,ae=null,oe=null,ue=null,We=null,Me=null;return{setTest:function(ht){F||(ht?j(i.STENCIL_TEST):we(i.STENCIL_TEST))},setMask:function(ht){ge!==ht&&!F&&(i.stencilMask(ht),ge=ht)},setFunc:function(ht,pn,cn){(xe!==ht||Ne!==pn||ae!==cn)&&(i.stencilFunc(ht,pn,cn),xe=ht,Ne=pn,ae=cn)},setOp:function(ht,pn,cn){(oe!==ht||ue!==pn||We!==cn)&&(i.stencilOp(ht,pn,cn),oe=ht,ue=pn,We=cn)},setLocked:function(ht){F=ht},setClear:function(ht){Me!==ht&&(i.clearStencil(ht),Me=ht)},reset:function(){F=!1,ge=null,xe=null,Ne=null,ae=null,oe=null,ue=null,We=null,Me=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,f=[],g=null,v=!1,m=null,p=null,E=null,T=null,x=null,R=null,C=null,L=new nt(0,0,0),O=0,b=!1,M=null,N=null,B=null,H=null,Y=null;const J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let te=!1,se=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec($)[1]),te=se>=1):$.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),te=se>=2);let ve=null,Ie={};const Ue=i.getParameter(i.SCISSOR_BOX),at=i.getParameter(i.VIEWPORT),_t=new bt().fromArray(Ue),xt=new bt().fromArray(at);function Re(F,ge,xe,Ne){const ae=new Uint8Array(4),oe=i.createTexture();i.bindTexture(F,oe),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ue=0;ue<xe;ue++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(ge,0,i.RGBA,1,1,Ne,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(ge+ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return oe}const Z={};Z[i.TEXTURE_2D]=Re(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=Re(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=Re(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=Re(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),j(i.DEPTH_TEST),a.setFunc(lr),$e(!1),be(Zu),j(i.CULL_FACE),St(is);function j(F){u[F]!==!0&&(i.enable(F),u[F]=!0)}function we(F){u[F]!==!1&&(i.disable(F),u[F]=!1)}function Xe(F,ge){return d[F]!==ge?(i.bindFramebuffer(F,ge),d[F]=ge,F===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ge),F===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ge),!0):!1}function Ae(F,ge){let xe=f,Ne=!1;if(F){xe=h.get(ge),xe===void 0&&(xe=[],h.set(ge,xe));const ae=F.textures;if(xe.length!==ae.length||xe[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,ue=ae.length;oe<ue;oe++)xe[oe]=i.COLOR_ATTACHMENT0+oe;xe.length=ae.length,Ne=!0}}else xe[0]!==i.BACK&&(xe[0]=i.BACK,Ne=!0);Ne&&i.drawBuffers(xe)}function Ye(F){return g!==F?(i.useProgram(F),g=F,!0):!1}const Mt={[ys]:i.FUNC_ADD,[Fm]:i.FUNC_SUBTRACT,[Bm]:i.FUNC_REVERSE_SUBTRACT};Mt[km]=i.MIN,Mt[zm]=i.MAX;const U={[Hm]:i.ZERO,[Vm]:i.ONE,[Gm]:i.SRC_COLOR,[jc]:i.SRC_ALPHA,[Km]:i.SRC_ALPHA_SATURATE,[qm]:i.DST_COLOR,[Xm]:i.DST_ALPHA,[Wm]:i.ONE_MINUS_SRC_COLOR,[Jc]:i.ONE_MINUS_SRC_ALPHA,[Ym]:i.ONE_MINUS_DST_COLOR,[$m]:i.ONE_MINUS_DST_ALPHA,[jm]:i.CONSTANT_COLOR,[Jm]:i.ONE_MINUS_CONSTANT_COLOR,[Zm]:i.CONSTANT_ALPHA,[Qm]:i.ONE_MINUS_CONSTANT_ALPHA};function St(F,ge,xe,Ne,ae,oe,ue,We,Me,ht){if(F===is){v===!0&&(we(i.BLEND),v=!1);return}if(v===!1&&(j(i.BLEND),v=!0),F!==Om){if(F!==m||ht!==b){if((p!==ys||x!==ys)&&(i.blendEquation(i.FUNC_ADD),p=ys,x=ys),ht)switch(F){case sr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qu:i.blendFunc(i.ONE,i.ONE);break;case ed:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case td:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case sr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qu:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ed:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case td:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}E=null,T=null,R=null,C=null,L.set(0,0,0),O=0,m=F,b=ht}return}ae=ae||ge,oe=oe||xe,ue=ue||Ne,(ge!==p||ae!==x)&&(i.blendEquationSeparate(Mt[ge],Mt[ae]),p=ge,x=ae),(xe!==E||Ne!==T||oe!==R||ue!==C)&&(i.blendFuncSeparate(U[xe],U[Ne],U[oe],U[ue]),E=xe,T=Ne,R=oe,C=ue),(We.equals(L)===!1||Me!==O)&&(i.blendColor(We.r,We.g,We.b,Me),L.copy(We),O=Me),m=F,b=!1}function He(F,ge){F.side===Zn?we(i.CULL_FACE):j(i.CULL_FACE);let xe=F.side===Cn;ge&&(xe=!xe),$e(xe),F.blending===sr&&F.transparent===!1?St(is):St(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);const Ne=F.stencilWrite;o.setTest(Ne),Ne&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Be(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):we(i.SAMPLE_ALPHA_TO_COVERAGE)}function $e(F){M!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),M=F)}function be(F){F!==Nm?(j(i.CULL_FACE),F!==N&&(F===Zu?i.cullFace(i.BACK):F===Um?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):we(i.CULL_FACE),N=F}function Tt(F){F!==B&&(te&&i.lineWidth(F),B=F)}function Be(F,ge,xe){F?(j(i.POLYGON_OFFSET_FILL),(H!==ge||Y!==xe)&&(i.polygonOffset(ge,xe),H=ge,Y=xe)):we(i.POLYGON_OFFSET_FILL)}function rt(F){F?j(i.SCISSOR_TEST):we(i.SCISSOR_TEST)}function $t(F){F===void 0&&(F=i.TEXTURE0+J-1),ve!==F&&(i.activeTexture(F),ve=F)}function Ft(F,ge,xe){xe===void 0&&(ve===null?xe=i.TEXTURE0+J-1:xe=ve);let Ne=Ie[xe];Ne===void 0&&(Ne={type:void 0,texture:void 0},Ie[xe]=Ne),(Ne.type!==F||Ne.texture!==ge)&&(ve!==xe&&(i.activeTexture(xe),ve=xe),i.bindTexture(F,ge||Z[F]),Ne.type=F,Ne.texture=ge)}function P(){const F=Ie[ve];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function S(){try{i.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function X(){try{i.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function re(){try{i.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ie(){try{i.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ee(){try{i.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ce(){try{i.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ne(){try{i.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function De(){try{i.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pe(){try{i.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function me(){try{i.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Te(F){_t.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),_t.copy(F))}function qe(F){xt.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),xt.copy(F))}function Ge(F,ge){let xe=c.get(ge);xe===void 0&&(xe=new WeakMap,c.set(ge,xe));let Ne=xe.get(F);Ne===void 0&&(Ne=i.getUniformBlockIndex(ge,F.name),xe.set(F,Ne))}function Ee(F,ge){const Ne=c.get(ge).get(F);l.get(ge)!==Ne&&(i.uniformBlockBinding(ge,Ne,F.__bindingPointIndex),l.set(ge,Ne))}function et(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ve=null,Ie={},d={},h=new WeakMap,f=[],g=null,v=!1,m=null,p=null,E=null,T=null,x=null,R=null,C=null,L=new nt(0,0,0),O=0,b=!1,M=null,N=null,B=null,H=null,Y=null,_t.set(0,0,i.canvas.width,i.canvas.height),xt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:j,disable:we,bindFramebuffer:Xe,drawBuffers:Ae,useProgram:Ye,setBlending:St,setMaterial:He,setFlipSided:$e,setCullFace:be,setLineWidth:Tt,setPolygonOffset:Be,setScissorTest:rt,activeTexture:$t,bindTexture:Ft,unbindTexture:P,compressedTexImage2D:S,compressedTexImage3D:X,texImage2D:Pe,texImage3D:me,updateUBOMapping:Ge,uniformBlockBinding:Ee,texStorage2D:ne,texStorage3D:De,texSubImage2D:re,texSubImage3D:ie,compressedTexSubImage2D:ee,compressedTexSubImage3D:ce,scissor:Te,viewport:qe,reset:et}}function GM(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ze,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,S){return f?new OffscreenCanvas(P,S):ca("canvas")}function v(P,S,X){let re=1;const ie=Ft(P);if((ie.width>X||ie.height>X)&&(re=X/Math.max(ie.width,ie.height)),re<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ee=Math.floor(re*ie.width),ce=Math.floor(re*ie.height);d===void 0&&(d=g(ee,ce));const ne=S?g(ee,ce):d;return ne.width=ee,ne.height=ce,ne.getContext("2d").drawImage(P,0,0,ee,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+ee+"x"+ce+")."),ne}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){i.generateMipmap(P)}function E(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(P,S,X,re,ie=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ee=S;if(S===i.RED&&(X===i.FLOAT&&(ee=i.R32F),X===i.HALF_FLOAT&&(ee=i.R16F),X===i.UNSIGNED_BYTE&&(ee=i.R8)),S===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(ee=i.R8UI),X===i.UNSIGNED_SHORT&&(ee=i.R16UI),X===i.UNSIGNED_INT&&(ee=i.R32UI),X===i.BYTE&&(ee=i.R8I),X===i.SHORT&&(ee=i.R16I),X===i.INT&&(ee=i.R32I)),S===i.RG&&(X===i.FLOAT&&(ee=i.RG32F),X===i.HALF_FLOAT&&(ee=i.RG16F),X===i.UNSIGNED_BYTE&&(ee=i.RG8)),S===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(ee=i.RG8UI),X===i.UNSIGNED_SHORT&&(ee=i.RG16UI),X===i.UNSIGNED_INT&&(ee=i.RG32UI),X===i.BYTE&&(ee=i.RG8I),X===i.SHORT&&(ee=i.RG16I),X===i.INT&&(ee=i.RG32I)),S===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(ee=i.RGB8UI),X===i.UNSIGNED_SHORT&&(ee=i.RGB16UI),X===i.UNSIGNED_INT&&(ee=i.RGB32UI),X===i.BYTE&&(ee=i.RGB8I),X===i.SHORT&&(ee=i.RGB16I),X===i.INT&&(ee=i.RGB32I)),S===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(ee=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(ee=i.RGBA16UI),X===i.UNSIGNED_INT&&(ee=i.RGBA32UI),X===i.BYTE&&(ee=i.RGBA8I),X===i.SHORT&&(ee=i.RGBA16I),X===i.INT&&(ee=i.RGBA32I)),S===i.RGB&&(X===i.UNSIGNED_INT_5_9_9_9_REV&&(ee=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(ee=i.R11F_G11F_B10F)),S===i.RGBA){const ce=ie?To:gt.getTransfer(re);X===i.FLOAT&&(ee=i.RGBA32F),X===i.HALF_FLOAT&&(ee=i.RGBA16F),X===i.UNSIGNED_BYTE&&(ee=ce===Ut?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function x(P,S){let X;return P?S===null||S===bs||S===ia?X=i.DEPTH24_STENCIL8:S===ei?X=i.DEPTH32F_STENCIL8:S===na&&(X=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===bs||S===ia?X=i.DEPTH_COMPONENT24:S===ei?X=i.DEPTH_COMPONENT32F:S===na&&(X=i.DEPTH_COMPONENT16),X}function R(P,S){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Sn&&P.minFilter!==Nn?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function C(P){const S=P.target;S.removeEventListener("dispose",C),O(S),S.isVideoTexture&&u.delete(S)}function L(P){const S=P.target;S.removeEventListener("dispose",L),M(S)}function O(P){const S=n.get(P);if(S.__webglInit===void 0)return;const X=P.source,re=h.get(X);if(re){const ie=re[S.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&b(P),Object.keys(re).length===0&&h.delete(X)}n.remove(P)}function b(P){const S=n.get(P);i.deleteTexture(S.__webglTexture);const X=P.source,re=h.get(X);delete re[S.__cacheKey],a.memory.textures--}function M(P){const S=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(S.__webglFramebuffer[re]))for(let ie=0;ie<S.__webglFramebuffer[re].length;ie++)i.deleteFramebuffer(S.__webglFramebuffer[re][ie]);else i.deleteFramebuffer(S.__webglFramebuffer[re]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[re])}else{if(Array.isArray(S.__webglFramebuffer))for(let re=0;re<S.__webglFramebuffer.length;re++)i.deleteFramebuffer(S.__webglFramebuffer[re]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let re=0;re<S.__webglColorRenderbuffer.length;re++)S.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[re]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const X=P.textures;for(let re=0,ie=X.length;re<ie;re++){const ee=n.get(X[re]);ee.__webglTexture&&(i.deleteTexture(ee.__webglTexture),a.memory.textures--),n.remove(X[re])}n.remove(P)}let N=0;function B(){N=0}function H(){const P=N;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),N+=1,P}function Y(P){const S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function J(P,S){const X=n.get(P);if(P.isVideoTexture&&rt(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&X.__version!==P.version){const re=P.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(X,P,S);return}}else P.isExternalTexture&&(X.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+S)}function te(P,S){const X=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version){Z(X,P,S);return}t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+S)}function se(P,S){const X=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version){Z(X,P,S);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+S)}function $(P,S){const X=n.get(P);if(P.version>0&&X.__version!==P.version){j(X,P,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+S)}const ve={[hr]:i.REPEAT,[ns]:i.CLAMP_TO_EDGE,[bo]:i.MIRRORED_REPEAT},Ie={[Sn]:i.NEAREST,[tf]:i.NEAREST_MIPMAP_NEAREST,[$r]:i.NEAREST_MIPMAP_LINEAR,[Nn]:i.LINEAR,[fo]:i.LINEAR_MIPMAP_NEAREST,[Pi]:i.LINEAR_MIPMAP_LINEAR},Ue={[pg]:i.NEVER,[xg]:i.ALWAYS,[mg]:i.LESS,[hf]:i.LEQUAL,[gg]:i.EQUAL,[yg]:i.GEQUAL,[_g]:i.GREATER,[vg]:i.NOTEQUAL};function at(P,S){if(S.type===ei&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Nn||S.magFilter===fo||S.magFilter===$r||S.magFilter===Pi||S.minFilter===Nn||S.minFilter===fo||S.minFilter===$r||S.minFilter===Pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,ve[S.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,ve[S.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,ve[S.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,Ie[S.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,Ie[S.minFilter]),S.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,Ue[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Sn||S.minFilter!==$r&&S.minFilter!==Pi||S.type===ei&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function _t(P,S){let X=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",C));const re=S.source;let ie=h.get(re);ie===void 0&&(ie={},h.set(re,ie));const ee=Y(S);if(ee!==P.__cacheKey){ie[ee]===void 0&&(ie[ee]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,X=!0),ie[ee].usedTimes++;const ce=ie[P.__cacheKey];ce!==void 0&&(ie[P.__cacheKey].usedTimes--,ce.usedTimes===0&&b(S)),P.__cacheKey=ee,P.__webglTexture=ie[ee].texture}return X}function xt(P,S,X){return Math.floor(Math.floor(P/X)/S)}function Re(P,S,X,re){const ee=P.updateRanges;if(ee.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,X,re,S.data);else{ee.sort((me,Te)=>me.start-Te.start);let ce=0;for(let me=1;me<ee.length;me++){const Te=ee[ce],qe=ee[me],Ge=Te.start+Te.count,Ee=xt(qe.start,S.width,4),et=xt(Te.start,S.width,4);qe.start<=Ge+1&&Ee===et&&xt(qe.start+qe.count-1,S.width,4)===Ee?Te.count=Math.max(Te.count,qe.start+qe.count-Te.start):(++ce,ee[ce]=qe)}ee.length=ce+1;const ne=i.getParameter(i.UNPACK_ROW_LENGTH),De=i.getParameter(i.UNPACK_SKIP_PIXELS),Pe=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let me=0,Te=ee.length;me<Te;me++){const qe=ee[me],Ge=Math.floor(qe.start/4),Ee=Math.ceil(qe.count/4),et=Ge%S.width,F=Math.floor(Ge/S.width),ge=Ee,xe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,et),i.pixelStorei(i.UNPACK_SKIP_ROWS,F),t.texSubImage2D(i.TEXTURE_2D,0,et,F,ge,xe,X,re,S.data)}P.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ne),i.pixelStorei(i.UNPACK_SKIP_PIXELS,De),i.pixelStorei(i.UNPACK_SKIP_ROWS,Pe)}}function Z(P,S,X){let re=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(re=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(re=i.TEXTURE_3D);const ie=_t(P,S),ee=S.source;t.bindTexture(re,P.__webglTexture,i.TEXTURE0+X);const ce=n.get(ee);if(ee.version!==ce.__version||ie===!0){t.activeTexture(i.TEXTURE0+X);const ne=gt.getPrimaries(gt.workingColorSpace),De=S.colorSpace===ts?null:gt.getPrimaries(S.colorSpace),Pe=S.colorSpace===ts||ne===De?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let me=v(S.image,!1,s.maxTextureSize);me=$t(S,me);const Te=r.convert(S.format,S.colorSpace),qe=r.convert(S.type);let Ge=T(S.internalFormat,Te,qe,S.colorSpace,S.isVideoTexture);at(re,S);let Ee;const et=S.mipmaps,F=S.isVideoTexture!==!0,ge=ce.__version===void 0||ie===!0,xe=ee.dataReady,Ne=R(S,me);if(S.isDepthTexture)Ge=x(S.format===ra,S.type),ge&&(F?t.texStorage2D(i.TEXTURE_2D,1,Ge,me.width,me.height):t.texImage2D(i.TEXTURE_2D,0,Ge,me.width,me.height,0,Te,qe,null));else if(S.isDataTexture)if(et.length>0){F&&ge&&t.texStorage2D(i.TEXTURE_2D,Ne,Ge,et[0].width,et[0].height);for(let ae=0,oe=et.length;ae<oe;ae++)Ee=et[ae],F?xe&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Ee.width,Ee.height,Te,qe,Ee.data):t.texImage2D(i.TEXTURE_2D,ae,Ge,Ee.width,Ee.height,0,Te,qe,Ee.data);S.generateMipmaps=!1}else F?(ge&&t.texStorage2D(i.TEXTURE_2D,Ne,Ge,me.width,me.height),xe&&Re(S,me,Te,qe)):t.texImage2D(i.TEXTURE_2D,0,Ge,me.width,me.height,0,Te,qe,me.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){F&&ge&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ne,Ge,et[0].width,et[0].height,me.depth);for(let ae=0,oe=et.length;ae<oe;ae++)if(Ee=et[ae],S.format!==Wn)if(Te!==null)if(F){if(xe)if(S.layerUpdates.size>0){const ue=Kd(Ee.width,Ee.height,S.format,S.type);for(const We of S.layerUpdates){const Me=Ee.data.subarray(We*ue/Ee.data.BYTES_PER_ELEMENT,(We+1)*ue/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,We,Ee.width,Ee.height,1,Te,Me)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,Ee.width,Ee.height,me.depth,Te,Ee.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ae,Ge,Ee.width,Ee.height,me.depth,0,Ee.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?xe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,Ee.width,Ee.height,me.depth,Te,qe,Ee.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ae,Ge,Ee.width,Ee.height,me.depth,0,Te,qe,Ee.data)}else{F&&ge&&t.texStorage2D(i.TEXTURE_2D,Ne,Ge,et[0].width,et[0].height);for(let ae=0,oe=et.length;ae<oe;ae++)Ee=et[ae],S.format!==Wn?Te!==null?F?xe&&t.compressedTexSubImage2D(i.TEXTURE_2D,ae,0,0,Ee.width,Ee.height,Te,Ee.data):t.compressedTexImage2D(i.TEXTURE_2D,ae,Ge,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?xe&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Ee.width,Ee.height,Te,qe,Ee.data):t.texImage2D(i.TEXTURE_2D,ae,Ge,Ee.width,Ee.height,0,Te,qe,Ee.data)}else if(S.isDataArrayTexture)if(F){if(ge&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ne,Ge,me.width,me.height,me.depth),xe)if(S.layerUpdates.size>0){const ae=Kd(me.width,me.height,S.format,S.type);for(const oe of S.layerUpdates){const ue=me.data.subarray(oe*ae/me.data.BYTES_PER_ELEMENT,(oe+1)*ae/me.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,oe,me.width,me.height,1,Te,qe,ue)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,Te,qe,me.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ge,me.width,me.height,me.depth,0,Te,qe,me.data);else if(S.isData3DTexture)F?(ge&&t.texStorage3D(i.TEXTURE_3D,Ne,Ge,me.width,me.height,me.depth),xe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,Te,qe,me.data)):t.texImage3D(i.TEXTURE_3D,0,Ge,me.width,me.height,me.depth,0,Te,qe,me.data);else if(S.isFramebufferTexture){if(ge)if(F)t.texStorage2D(i.TEXTURE_2D,Ne,Ge,me.width,me.height);else{let ae=me.width,oe=me.height;for(let ue=0;ue<Ne;ue++)t.texImage2D(i.TEXTURE_2D,ue,Ge,ae,oe,0,Te,qe,null),ae>>=1,oe>>=1}}else if(et.length>0){if(F&&ge){const ae=Ft(et[0]);t.texStorage2D(i.TEXTURE_2D,Ne,Ge,ae.width,ae.height)}for(let ae=0,oe=et.length;ae<oe;ae++)Ee=et[ae],F?xe&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Te,qe,Ee):t.texImage2D(i.TEXTURE_2D,ae,Ge,Te,qe,Ee);S.generateMipmaps=!1}else if(F){if(ge){const ae=Ft(me);t.texStorage2D(i.TEXTURE_2D,Ne,Ge,ae.width,ae.height)}xe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Te,qe,me)}else t.texImage2D(i.TEXTURE_2D,0,Ge,Te,qe,me);m(S)&&p(re),ce.__version=ee.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function j(P,S,X){if(S.image.length!==6)return;const re=_t(P,S),ie=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+X);const ee=n.get(ie);if(ie.version!==ee.__version||re===!0){t.activeTexture(i.TEXTURE0+X);const ce=gt.getPrimaries(gt.workingColorSpace),ne=S.colorSpace===ts?null:gt.getPrimaries(S.colorSpace),De=S.colorSpace===ts||ce===ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);const Pe=S.isCompressedTexture||S.image[0].isCompressedTexture,me=S.image[0]&&S.image[0].isDataTexture,Te=[];for(let oe=0;oe<6;oe++)!Pe&&!me?Te[oe]=v(S.image[oe],!0,s.maxCubemapSize):Te[oe]=me?S.image[oe].image:S.image[oe],Te[oe]=$t(S,Te[oe]);const qe=Te[0],Ge=r.convert(S.format,S.colorSpace),Ee=r.convert(S.type),et=T(S.internalFormat,Ge,Ee,S.colorSpace),F=S.isVideoTexture!==!0,ge=ee.__version===void 0||re===!0,xe=ie.dataReady;let Ne=R(S,qe);at(i.TEXTURE_CUBE_MAP,S);let ae;if(Pe){F&&ge&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ne,et,qe.width,qe.height);for(let oe=0;oe<6;oe++){ae=Te[oe].mipmaps;for(let ue=0;ue<ae.length;ue++){const We=ae[ue];S.format!==Wn?Ge!==null?F?xe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ue,0,0,We.width,We.height,Ge,We.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ue,et,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ue,0,0,We.width,We.height,Ge,Ee,We.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ue,et,We.width,We.height,0,Ge,Ee,We.data)}}}else{if(ae=S.mipmaps,F&&ge){ae.length>0&&Ne++;const oe=Ft(Te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ne,et,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(me){F?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Te[oe].width,Te[oe].height,Ge,Ee,Te[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,et,Te[oe].width,Te[oe].height,0,Ge,Ee,Te[oe].data);for(let ue=0;ue<ae.length;ue++){const Me=ae[ue].image[oe].image;F?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ue+1,0,0,Me.width,Me.height,Ge,Ee,Me.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ue+1,et,Me.width,Me.height,0,Ge,Ee,Me.data)}}else{F?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ge,Ee,Te[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,et,Ge,Ee,Te[oe]);for(let ue=0;ue<ae.length;ue++){const We=ae[ue];F?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ue+1,0,0,Ge,Ee,We.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ue+1,et,Ge,Ee,We.image[oe])}}}m(S)&&p(i.TEXTURE_CUBE_MAP),ee.__version=ie.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function we(P,S,X,re,ie,ee){const ce=r.convert(X.format,X.colorSpace),ne=r.convert(X.type),De=T(X.internalFormat,ce,ne,X.colorSpace),Pe=n.get(S),me=n.get(X);if(me.__renderTarget=S,!Pe.__hasExternalTextures){const Te=Math.max(1,S.width>>ee),qe=Math.max(1,S.height>>ee);ie===i.TEXTURE_3D||ie===i.TEXTURE_2D_ARRAY?t.texImage3D(ie,ee,De,Te,qe,S.depth,0,ce,ne,null):t.texImage2D(ie,ee,De,Te,qe,0,ce,ne,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),Be(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,ie,me.__webglTexture,0,Tt(S)):(ie===i.TEXTURE_2D||ie>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,re,ie,me.__webglTexture,ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Xe(P,S,X){if(i.bindRenderbuffer(i.RENDERBUFFER,P),S.depthBuffer){const re=S.depthTexture,ie=re&&re.isDepthTexture?re.type:null,ee=x(S.stencilBuffer,ie),ce=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=Tt(S);Be(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ne,ee,S.width,S.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,ee,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ee,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,P)}else{const re=S.textures;for(let ie=0;ie<re.length;ie++){const ee=re[ie],ce=r.convert(ee.format,ee.colorSpace),ne=r.convert(ee.type),De=T(ee.internalFormat,ce,ne,ee.colorSpace),Pe=Tt(S);X&&Be(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,De,S.width,S.height):Be(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pe,De,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,De,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ae(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const re=n.get(S.depthTexture);re.__renderTarget=S,(!re.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),J(S.depthTexture,0);const ie=re.__webglTexture,ee=Tt(S);if(S.depthTexture.format===sa)Be(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0,ee):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0);else if(S.depthTexture.format===ra)Be(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0,ee):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function Ye(P){const S=n.get(P),X=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){const re=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),re){const ie=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,re.removeEventListener("dispose",ie)};re.addEventListener("dispose",ie),S.__depthDisposeCallback=ie}S.__boundDepthTexture=re}if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");const re=P.texture.mipmaps;re&&re.length>0?Ae(S.__webglFramebuffer[0],P):Ae(S.__webglFramebuffer,P)}else if(X){S.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[re]),S.__webglDepthbuffer[re]===void 0)S.__webglDepthbuffer[re]=i.createRenderbuffer(),Xe(S.__webglDepthbuffer[re],P,!1);else{const ie=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=S.__webglDepthbuffer[re];i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,ee)}}else{const re=P.texture.mipmaps;if(re&&re.length>0?t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),Xe(S.__webglDepthbuffer,P,!1);else{const ie=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,ee)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Mt(P,S,X){const re=n.get(P);S!==void 0&&we(re.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&Ye(P)}function U(P){const S=P.texture,X=n.get(P),re=n.get(S);P.addEventListener("dispose",L);const ie=P.textures,ee=P.isWebGLCubeRenderTarget===!0,ce=ie.length>1;if(ce||(re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture()),re.__version=S.version,a.memory.textures++),ee){X.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(S.mipmaps&&S.mipmaps.length>0){X.__webglFramebuffer[ne]=[];for(let De=0;De<S.mipmaps.length;De++)X.__webglFramebuffer[ne][De]=i.createFramebuffer()}else X.__webglFramebuffer[ne]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){X.__webglFramebuffer=[];for(let ne=0;ne<S.mipmaps.length;ne++)X.__webglFramebuffer[ne]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(ce)for(let ne=0,De=ie.length;ne<De;ne++){const Pe=n.get(ie[ne]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&Be(P)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ne=0;ne<ie.length;ne++){const De=ie[ne];X.__webglColorRenderbuffer[ne]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[ne]);const Pe=r.convert(De.format,De.colorSpace),me=r.convert(De.type),Te=T(De.internalFormat,Pe,me,De.colorSpace,P.isXRRenderTarget===!0),qe=Tt(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,qe,Te,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,X.__webglColorRenderbuffer[ne])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),Xe(X.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ee){t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),at(i.TEXTURE_CUBE_MAP,S);for(let ne=0;ne<6;ne++)if(S.mipmaps&&S.mipmaps.length>0)for(let De=0;De<S.mipmaps.length;De++)we(X.__webglFramebuffer[ne][De],P,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De);else we(X.__webglFramebuffer[ne],P,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);m(S)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let ne=0,De=ie.length;ne<De;ne++){const Pe=ie[ne],me=n.get(Pe);let Te=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Te=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Te,me.__webglTexture),at(Te,Pe),we(X.__webglFramebuffer,P,Pe,i.COLOR_ATTACHMENT0+ne,Te,0),m(Pe)&&p(Te)}t.unbindTexture()}else{let ne=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ne=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,re.__webglTexture),at(ne,S),S.mipmaps&&S.mipmaps.length>0)for(let De=0;De<S.mipmaps.length;De++)we(X.__webglFramebuffer[De],P,S,i.COLOR_ATTACHMENT0,ne,De);else we(X.__webglFramebuffer,P,S,i.COLOR_ATTACHMENT0,ne,0);m(S)&&p(ne),t.unbindTexture()}P.depthBuffer&&Ye(P)}function St(P){const S=P.textures;for(let X=0,re=S.length;X<re;X++){const ie=S[X];if(m(ie)){const ee=E(P),ce=n.get(ie).__webglTexture;t.bindTexture(ee,ce),p(ee),t.unbindTexture()}}}const He=[],$e=[];function be(P){if(P.samples>0){if(Be(P)===!1){const S=P.textures,X=P.width,re=P.height;let ie=i.COLOR_BUFFER_BIT;const ee=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=n.get(P),ne=S.length>1;if(ne)for(let Pe=0;Pe<S.length;Pe++)t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const De=P.texture.mipmaps;De&&De.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let Pe=0;Pe<S.length;Pe++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ie|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ie|=i.STENCIL_BUFFER_BIT)),ne){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ce.__webglColorRenderbuffer[Pe]);const me=n.get(S[Pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,me,0)}i.blitFramebuffer(0,0,X,re,0,0,X,re,ie,i.NEAREST),l===!0&&(He.length=0,$e.length=0,He.push(i.COLOR_ATTACHMENT0+Pe),P.depthBuffer&&P.resolveDepthBuffer===!1&&(He.push(ee),$e.push(ee),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,$e)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,He))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ne)for(let Pe=0;Pe<S.length;Pe++){t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.RENDERBUFFER,ce.__webglColorRenderbuffer[Pe]);const me=n.get(S[Pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.TEXTURE_2D,me,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const S=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function Tt(P){return Math.min(s.maxSamples,P.samples)}function Be(P){const S=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function rt(P){const S=a.render.frame;u.get(P)!==S&&(u.set(P,S),P.update())}function $t(P,S){const X=P.colorSpace,re=P.format,ie=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||X!==Tn&&X!==ts&&(gt.getTransfer(X)===Ut?(re!==Wn||ie!==mi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),S}function Ft(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=B,this.setTexture2D=J,this.setTexture2DArray=te,this.setTexture3D=se,this.setTextureCube=$,this.rebindTextures=Mt,this.setupRenderTarget=U,this.updateRenderTargetMipmap=St,this.updateMultisampleRenderTarget=be,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Be}function WM(i,e){function t(n,s=ts){let r;const a=gt.getTransfer(s);if(n===mi)return i.UNSIGNED_BYTE;if(n===nu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===iu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===rf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===af)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===nf)return i.BYTE;if(n===sf)return i.SHORT;if(n===na)return i.UNSIGNED_SHORT;if(n===tu)return i.INT;if(n===bs)return i.UNSIGNED_INT;if(n===ei)return i.FLOAT;if(n===fa)return i.HALF_FLOAT;if(n===of)return i.ALPHA;if(n===cf)return i.RGB;if(n===Wn)return i.RGBA;if(n===sa)return i.DEPTH_COMPONENT;if(n===ra)return i.DEPTH_STENCIL;if(n===su)return i.RED;if(n===ru)return i.RED_INTEGER;if(n===lf)return i.RG;if(n===au)return i.RG_INTEGER;if(n===ou)return i.RGBA_INTEGER;if(n===po||n===mo||n===go||n===_o)if(a===Ut)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===po)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===go)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_o)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===po)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===go)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_o)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ol||n===cl||n===ll||n===ul)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ol)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===cl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ll)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ul)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===dl||n===hl||n===fl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===dl||n===hl)return a===Ut?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===fl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===pl||n===ml||n===gl||n===_l||n===vl||n===yl||n===xl||n===Ml||n===Sl||n===bl||n===Tl||n===El||n===Al||n===wl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===pl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ml)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===gl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_l)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===yl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===xl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ml)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Sl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===bl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Tl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===El)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Al)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Rl||n===Cl||n===Pl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Rl)return a===Ut?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Cl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Il||n===Ll||n===Dl||n===Nl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Il)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ll)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Dl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Nl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ia?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const XM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$M=`
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

}`;class qM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Pf(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new rs({vertexShader:XM,fragmentShader:$M,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ct(new ma(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class YM extends vr{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",m=new qM,p={},E=t.getContextAttributes();let T=null,x=null;const R=[],C=[],L=new ze;let O=null;const b=new yn;b.viewport=new bt;const M=new yn;M.viewport=new bt;const N=[b,M],B=new r_;let H=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let j=R[Z];return j===void 0&&(j=new xc,R[Z]=j),j.getTargetRaySpace()},this.getControllerGrip=function(Z){let j=R[Z];return j===void 0&&(j=new xc,R[Z]=j),j.getGripSpace()},this.getHand=function(Z){let j=R[Z];return j===void 0&&(j=new xc,R[Z]=j),j.getHandSpace()};function J(Z){const j=C.indexOf(Z.inputSource);if(j===-1)return;const we=R[j];we!==void 0&&(we.update(Z.inputSource,Z.frame,c||a),we.dispatchEvent({type:Z.type,data:Z.inputSource}))}function te(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",te),s.removeEventListener("inputsourceschange",se);for(let Z=0;Z<R.length;Z++){const j=C[Z];j!==null&&(C[Z]=null,R[Z].disconnect(j))}H=null,Y=null,m.reset();for(const Z in p)delete p[Z];e.setRenderTarget(T),f=null,h=null,d=null,s=null,x=null,Re.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",te),s.addEventListener("inputsourceschange",se),E.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let we=null,Xe=null,Ae=null;E.depth&&(Ae=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,we=E.stencil?ra:sa,Xe=E.stencil?ia:bs);const Ye={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Ye),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new Ts(h.textureWidth,h.textureHeight,{format:Wn,type:mi,depthTexture:new Cf(h.textureWidth,h.textureHeight,Xe,void 0,void 0,void 0,void 0,void 0,void 0,we),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const we={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,we),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Ts(f.framebufferWidth,f.framebufferHeight,{format:Wn,type:mi,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Re.setContext(s),Re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function se(Z){for(let j=0;j<Z.removed.length;j++){const we=Z.removed[j],Xe=C.indexOf(we);Xe>=0&&(C[Xe]=null,R[Xe].disconnect(we))}for(let j=0;j<Z.added.length;j++){const we=Z.added[j];let Xe=C.indexOf(we);if(Xe===-1){for(let Ye=0;Ye<R.length;Ye++)if(Ye>=C.length){C.push(we),Xe=Ye;break}else if(C[Ye]===null){C[Ye]=we,Xe=Ye;break}if(Xe===-1)break}const Ae=R[Xe];Ae&&Ae.connect(we)}}const $=new w,ve=new w;function Ie(Z,j,we){$.setFromMatrixPosition(j.matrixWorld),ve.setFromMatrixPosition(we.matrixWorld);const Xe=$.distanceTo(ve),Ae=j.projectionMatrix.elements,Ye=we.projectionMatrix.elements,Mt=Ae[14]/(Ae[10]-1),U=Ae[14]/(Ae[10]+1),St=(Ae[9]+1)/Ae[5],He=(Ae[9]-1)/Ae[5],$e=(Ae[8]-1)/Ae[0],be=(Ye[8]+1)/Ye[0],Tt=Mt*$e,Be=Mt*be,rt=Xe/(-$e+be),$t=rt*-$e;if(j.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX($t),Z.translateZ(rt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ae[10]===-1)Z.projectionMatrix.copy(j.projectionMatrix),Z.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const Ft=Mt+rt,P=U+rt,S=Tt-$t,X=Be+(Xe-$t),re=St*U/P*Ft,ie=He*U/P*Ft;Z.projectionMatrix.makePerspective(S,X,re,ie,Ft,P),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Ue(Z,j){j===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(j.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let j=Z.near,we=Z.far;m.texture!==null&&(m.depthNear>0&&(j=m.depthNear),m.depthFar>0&&(we=m.depthFar)),B.near=M.near=b.near=j,B.far=M.far=b.far=we,(H!==B.near||Y!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),H=B.near,Y=B.far),B.layers.mask=Z.layers.mask|6,b.layers.mask=B.layers.mask&3,M.layers.mask=B.layers.mask&5;const Xe=Z.parent,Ae=B.cameras;Ue(B,Xe);for(let Ye=0;Ye<Ae.length;Ye++)Ue(Ae[Ye],Xe);Ae.length===2?Ie(B,b,M):B.projectionMatrix.copy(b.projectionMatrix),at(Z,B,Xe)};function at(Z,j,we){we===null?Z.matrix.copy(j.matrixWorld):(Z.matrix.copy(we.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(j.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(j.projectionMatrix),Z.projectionMatrixInverse.copy(j.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=fr*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(Z){l=Z,h!==null&&(h.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(Z){return p[Z]};let _t=null;function xt(Z,j){if(u=j.getViewerPose(c||a),g=j,u!==null){const we=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let Xe=!1;we.length!==B.cameras.length&&(B.cameras.length=0,Xe=!0);for(let U=0;U<we.length;U++){const St=we[U];let He=null;if(f!==null)He=f.getViewport(St);else{const be=d.getViewSubImage(h,St);He=be.viewport,U===0&&(e.setRenderTargetTextures(x,be.colorTexture,be.depthStencilTexture),e.setRenderTarget(x))}let $e=N[U];$e===void 0&&($e=new yn,$e.layers.enable(U),$e.viewport=new bt,N[U]=$e),$e.matrix.fromArray(St.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(St.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(He.x,He.y,He.width,He.height),U===0&&(B.matrix.copy($e.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Xe===!0&&B.cameras.push($e)}const Ae=s.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const U=d.getDepthInformation(we[0]);U&&U.isValid&&U.texture&&m.init(U,s.renderState)}if(Ae&&Ae.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let U=0;U<we.length;U++){const St=we[U].camera;if(St){let He=p[St];He||(He=new Pf,p[St]=He);const $e=d.getCameraImage(St);He.sourceTexture=$e}}}}for(let we=0;we<R.length;we++){const Xe=C[we],Ae=R[we];Xe!==null&&Ae!==void 0&&Ae.update(Xe,j,c||a)}_t&&_t(Z,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}const Re=new Of;Re.setAnimationLoop(xt),this.setAnimationLoop=function(Z){_t=Z},this.dispose=function(){}}}const gs=new qt,KM=new st;function jM(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,vf(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,T,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,E,T):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Cn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Cn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=e.get(p),T=E.envMap,x=E.envMapRotation;T&&(m.envMap.value=T,gs.copy(x),gs.x*=-1,gs.y*=-1,gs.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(gs.y*=-1,gs.z*=-1),m.envMapRotation.value.setFromMatrix4(KM.makeRotationFromEuler(gs)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,E,T){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=T*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Cn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const E=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function JM(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,T){const x=T.program;n.uniformBlockBinding(E,x)}function c(E,T){let x=s[E.id];x===void 0&&(g(E),x=u(E),s[E.id]=x,E.addEventListener("dispose",m));const R=T.program;n.updateUBOMapping(E,R);const C=e.render.frame;r[E.id]!==C&&(h(E),r[E.id]=C)}function u(E){const T=d();E.__bindingPointIndex=T;const x=i.createBuffer(),R=E.__size,C=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,R,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,x),x}function d(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(E){const T=s[E.id],x=E.uniforms,R=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let C=0,L=x.length;C<L;C++){const O=Array.isArray(x[C])?x[C]:[x[C]];for(let b=0,M=O.length;b<M;b++){const N=O[b];if(f(N,C,b,R)===!0){const B=N.__offset,H=Array.isArray(N.value)?N.value:[N.value];let Y=0;for(let J=0;J<H.length;J++){const te=H[J],se=v(te);typeof te=="number"||typeof te=="boolean"?(N.__data[0]=te,i.bufferSubData(i.UNIFORM_BUFFER,B+Y,N.__data)):te.isMatrix3?(N.__data[0]=te.elements[0],N.__data[1]=te.elements[1],N.__data[2]=te.elements[2],N.__data[3]=0,N.__data[4]=te.elements[3],N.__data[5]=te.elements[4],N.__data[6]=te.elements[5],N.__data[7]=0,N.__data[8]=te.elements[6],N.__data[9]=te.elements[7],N.__data[10]=te.elements[8],N.__data[11]=0):(te.toArray(N.__data,Y),Y+=se.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,N.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(E,T,x,R){const C=E.value,L=T+"_"+x;if(R[L]===void 0)return typeof C=="number"||typeof C=="boolean"?R[L]=C:R[L]=C.clone(),!0;{const O=R[L];if(typeof C=="number"||typeof C=="boolean"){if(O!==C)return R[L]=C,!0}else if(O.equals(C)===!1)return O.copy(C),!0}return!1}function g(E){const T=E.uniforms;let x=0;const R=16;for(let L=0,O=T.length;L<O;L++){const b=Array.isArray(T[L])?T[L]:[T[L]];for(let M=0,N=b.length;M<N;M++){const B=b[M],H=Array.isArray(B.value)?B.value:[B.value];for(let Y=0,J=H.length;Y<J;Y++){const te=H[Y],se=v(te),$=x%R,ve=$%se.boundary,Ie=$+ve;x+=ve,Ie!==0&&R-Ie<se.storage&&(x+=R-Ie),B.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=x,x+=se.storage}}}const C=x%R;return C>0&&(x+=R-C),E.__size=x,E.__cache={},this}function v(E){const T={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(T.boundary=4,T.storage=4):E.isVector2?(T.boundary=8,T.storage=8):E.isVector3||E.isColor?(T.boundary=16,T.storage=12):E.isVector4?(T.boundary=16,T.storage=16):E.isMatrix3?(T.boundary=48,T.storage=48):E.isMatrix4?(T.boundary=64,T.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),T}function m(E){const T=E.target;T.removeEventListener("dispose",m);const x=a.indexOf(T.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function p(){for(const E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class ZM{constructor(e={}){const{canvas:t=Fg(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const E=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ss,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let R=!1;this._outputColorSpace=Wt;let C=0,L=0,O=null,b=-1,M=null;const N=new bt,B=new bt;let H=null;const Y=new nt(0);let J=0,te=t.width,se=t.height,$=1,ve=null,Ie=null;const Ue=new bt(0,0,te,se),at=new bt(0,0,te,se);let _t=!1;const xt=new fu;let Re=!1,Z=!1;const j=new st,we=new w,Xe=new bt,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ye=!1;function Mt(){return O===null?$:1}let U=n;function St(A,z){return t.getContext(A,z)}try{const A={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${eu}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",Ne,!1),t.addEventListener("webglcontextcreationerror",ae,!1),U===null){const z="webgl2";if(U=St(z,A),U===null)throw St(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let He,$e,be,Tt,Be,rt,$t,Ft,P,S,X,re,ie,ee,ce,ne,De,Pe,me,Te,qe,Ge,Ee,et;function F(){He=new cx(U),He.init(),Ge=new WM(U,He),$e=new tx(U,He,e,Ge),be=new VM(U,He),$e.reversedDepthBuffer&&h&&be.buffers.depth.setReversed(!0),Tt=new dx(U),Be=new CM,rt=new GM(U,He,be,Be,$e,Ge,Tt),$t=new ix(x),Ft=new ox(x),P=new __(U),Ee=new Qy(U,P),S=new lx(U,P,Tt,Ee),X=new fx(U,S,P,Tt),me=new hx(U,$e,rt),ne=new nx(Be),re=new RM(x,$t,Ft,He,$e,Ee,ne),ie=new jM(x,Be),ee=new IM,ce=new FM(He),Pe=new Zy(x,$t,Ft,be,X,f,l),De=new zM(x,X,$e),et=new JM(U,Tt,$e,be),Te=new ex(U,He,Tt),qe=new ux(U,He,Tt),Tt.programs=re.programs,x.capabilities=$e,x.extensions=He,x.properties=Be,x.renderLists=ee,x.shadowMap=De,x.state=be,x.info=Tt}F();const ge=new YM(x,U);this.xr=ge,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const A=He.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=He.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(A){A!==void 0&&($=A,this.setSize(te,se,!1))},this.getSize=function(A){return A.set(te,se)},this.setSize=function(A,z,K=!0){if(ge.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}te=A,se=z,t.width=Math.floor(A*$),t.height=Math.floor(z*$),K===!0&&(t.style.width=A+"px",t.style.height=z+"px"),this.setViewport(0,0,A,z)},this.getDrawingBufferSize=function(A){return A.set(te*$,se*$).floor()},this.setDrawingBufferSize=function(A,z,K){te=A,se=z,$=K,t.width=Math.floor(A*K),t.height=Math.floor(z*K),this.setViewport(0,0,A,z)},this.getCurrentViewport=function(A){return A.copy(N)},this.getViewport=function(A){return A.copy(Ue)},this.setViewport=function(A,z,K,G){A.isVector4?Ue.set(A.x,A.y,A.z,A.w):Ue.set(A,z,K,G),be.viewport(N.copy(Ue).multiplyScalar($).round())},this.getScissor=function(A){return A.copy(at)},this.setScissor=function(A,z,K,G){A.isVector4?at.set(A.x,A.y,A.z,A.w):at.set(A,z,K,G),be.scissor(B.copy(at).multiplyScalar($).round())},this.getScissorTest=function(){return _t},this.setScissorTest=function(A){be.setScissorTest(_t=A)},this.setOpaqueSort=function(A){ve=A},this.setTransparentSort=function(A){Ie=A},this.getClearColor=function(A){return A.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(A=!0,z=!0,K=!0){let G=0;if(A){let k=!1;if(O!==null){const fe=O.texture.format;k=fe===ou||fe===au||fe===ru}if(k){const fe=O.texture.type,he=fe===mi||fe===bs||fe===na||fe===ia||fe===nu||fe===iu,Oe=Pe.getClearColor(),Le=Pe.getClearAlpha(),Ze=Oe.r,Je=Oe.g,Ke=Oe.b;he?(g[0]=Ze,g[1]=Je,g[2]=Ke,g[3]=Le,U.clearBufferuiv(U.COLOR,0,g)):(v[0]=Ze,v[1]=Je,v[2]=Ke,v[3]=Le,U.clearBufferiv(U.COLOR,0,v))}else G|=U.COLOR_BUFFER_BIT}z&&(G|=U.DEPTH_BUFFER_BIT),K&&(G|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",Ne,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),Pe.dispose(),ee.dispose(),ce.dispose(),Be.dispose(),$t.dispose(),Ft.dispose(),X.dispose(),Ee.dispose(),et.dispose(),re.dispose(),ge.dispose(),ge.removeEventListener("sessionstart",cn),ge.removeEventListener("sessionend",va),ai.stop()};function xe(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Ne(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const A=Tt.autoReset,z=De.enabled,K=De.autoUpdate,G=De.needsUpdate,k=De.type;F(),Tt.autoReset=A,De.enabled=z,De.autoUpdate=K,De.needsUpdate=G,De.type=k}function ae(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function oe(A){const z=A.target;z.removeEventListener("dispose",oe),ue(z)}function ue(A){We(A),Be.remove(A)}function We(A){const z=Be.get(A).programs;z!==void 0&&(z.forEach(function(K){re.releaseProgram(K)}),A.isShaderMaterial&&re.releaseShaderCache(A))}this.renderBufferDirect=function(A,z,K,G,k,fe){z===null&&(z=Ae);const he=k.isMesh&&k.matrixWorld.determinant()<0,Oe=Zt(A,z,K,G,k);be.setMaterial(G,he);let Le=K.index,Ze=1;if(G.wireframe===!0){if(Le=S.getWireframeAttribute(K),Le===void 0)return;Ze=2}const Je=K.drawRange,Ke=K.attributes.position;let Fe=Je.start*Ze,vt=(Je.start+Je.count)*Ze;fe!==null&&(Fe=Math.max(Fe,fe.start*Ze),vt=Math.min(vt,(fe.start+fe.count)*Ze)),Le!==null?(Fe=Math.max(Fe,0),vt=Math.min(vt,Le.count)):Ke!=null&&(Fe=Math.max(Fe,0),vt=Math.min(vt,Ke.count));const Lt=vt-Fe;if(Lt<0||Lt===1/0)return;Ee.setup(k,G,Oe,K,Le);let Et,At=Te;if(Le!==null&&(Et=P.get(Le),At=qe,At.setIndex(Et)),k.isMesh)G.wireframe===!0?(be.setLineWidth(G.wireframeLinewidth*Mt()),At.setMode(U.LINES)):At.setMode(U.TRIANGLES);else if(k.isLine){let je=G.linewidth;je===void 0&&(je=1),be.setLineWidth(je*Mt()),k.isLineSegments?At.setMode(U.LINES):k.isLineLoop?At.setMode(U.LINE_LOOP):At.setMode(U.LINE_STRIP)}else k.isPoints?At.setMode(U.POINTS):k.isSprite&&At.setMode(U.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)la("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),At.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(He.get("WEBGL_multi_draw"))At.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const je=k._multiDrawStarts,Bt=k._multiDrawCounts,ft=k._multiDrawCount,dn=Le?P.get(Le).bytesPerElement:1,ci=Be.get(G).currentProgram.getUniforms();for(let mn=0;mn<ft;mn++)ci.setValue(U,"_gl_DrawID",mn),At.render(je[mn]/dn,Bt[mn])}else if(k.isInstancedMesh)At.renderInstances(Fe,Lt,k.count);else if(K.isInstancedBufferGeometry){const je=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Bt=Math.min(K.instanceCount,je);At.renderInstances(Fe,Lt,Bt)}else At.render(Fe,Lt)};function Me(A,z,K){A.transparent===!0&&A.side===Zn&&A.forceSinglePass===!1?(A.side=Cn,A.needsUpdate=!0,Rs(A,z,K),A.side=Ni,A.needsUpdate=!0,Rs(A,z,K),A.side=Zn):Rs(A,z,K)}this.compile=function(A,z,K=null){K===null&&(K=A),p=ce.get(K),p.init(z),T.push(p),K.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),A!==K&&A.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const G=new Set;return A.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const fe=k.material;if(fe)if(Array.isArray(fe))for(let he=0;he<fe.length;he++){const Oe=fe[he];Me(Oe,K,k),G.add(Oe)}else Me(fe,K,k),G.add(fe)}),p=T.pop(),G},this.compileAsync=function(A,z,K=null){const G=this.compile(A,z,K);return new Promise(k=>{function fe(){if(G.forEach(function(he){Be.get(he).currentProgram.isReady()&&G.delete(he)}),G.size===0){k(A);return}setTimeout(fe,10)}He.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let ht=null;function pn(A){ht&&ht(A)}function cn(){ai.stop()}function va(){ai.start()}const ai=new Of;ai.setAnimationLoop(pn),typeof self<"u"&&ai.setContext(self),this.setAnimationLoop=function(A){ht=A,ge.setAnimationLoop(A),A===null?ai.stop():ai.start()},ge.addEventListener("sessionstart",cn),ge.addEventListener("sessionend",va),this.render=function(A,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ge.enabled===!0&&ge.isPresenting===!0&&(ge.cameraAutoUpdate===!0&&ge.updateCamera(z),z=ge.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,z,O),p=ce.get(A,T.length),p.init(z),T.push(p),j.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),xt.setFromProjectionMatrix(j,fi,z.reversedDepth),Z=this.localClippingEnabled,Re=ne.init(this.clippingPlanes,Z),m=ee.get(A,E.length),m.init(),E.push(m),ge.enabled===!0&&ge.isPresenting===!0){const fe=x.xr.getDepthSensingMesh();fe!==null&&oi(fe,z,-1/0,x.sortObjects)}oi(A,z,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(ve,Ie),Ye=ge.enabled===!1||ge.isPresenting===!1||ge.hasDepthSensing()===!1,Ye&&Pe.addToRenderList(m,A),this.info.render.frame++,Re===!0&&ne.beginShadows();const K=p.state.shadowsArray;De.render(K,A,z),Re===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,k=m.transmissive;if(p.setupLights(),z.isArrayCamera){const fe=z.cameras;if(k.length>0)for(let he=0,Oe=fe.length;he<Oe;he++){const Le=fe[he];ws(G,k,A,Le)}Ye&&Pe.render(A);for(let he=0,Oe=fe.length;he<Oe;he++){const Le=fe[he];os(m,A,Le,Le.viewport)}}else k.length>0&&ws(G,k,A,z),Ye&&Pe.render(A),os(m,A,z);O!==null&&L===0&&(rt.updateMultisampleRenderTarget(O),rt.updateRenderTargetMipmap(O)),A.isScene===!0&&A.onAfterRender(x,A,z),Ee.resetDefaultState(),b=-1,M=null,T.pop(),T.length>0?(p=T[T.length-1],Re===!0&&ne.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function oi(A,z,K,G){if(A.visible===!1)return;if(A.layers.test(z.layers)){if(A.isGroup)K=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(z);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||xt.intersectsSprite(A)){G&&Xe.setFromMatrixPosition(A.matrixWorld).applyMatrix4(j);const he=X.update(A),Oe=A.material;Oe.visible&&m.push(A,he,Oe,K,Xe.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||xt.intersectsObject(A))){const he=X.update(A),Oe=A.material;if(G&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Xe.copy(A.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),Xe.copy(he.boundingSphere.center)),Xe.applyMatrix4(A.matrixWorld).applyMatrix4(j)),Array.isArray(Oe)){const Le=he.groups;for(let Ze=0,Je=Le.length;Ze<Je;Ze++){const Ke=Le[Ze],Fe=Oe[Ke.materialIndex];Fe&&Fe.visible&&m.push(A,he,Fe,K,Xe.z,Ke)}}else Oe.visible&&m.push(A,he,Oe,K,Xe.z,null)}}const fe=A.children;for(let he=0,Oe=fe.length;he<Oe;he++)oi(fe[he],z,K,G)}function os(A,z,K,G){const k=A.opaque,fe=A.transmissive,he=A.transparent;p.setupLightsView(K),Re===!0&&ne.setGlobalState(x.clippingPlanes,K),G&&be.viewport(N.copy(G)),k.length>0&&En(k,z,K),fe.length>0&&En(fe,z,K),he.length>0&&En(he,z,K),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function ws(A,z,K,G){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new Ts(1,1,{generateMipmaps:!0,type:He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float")?fa:mi,minFilter:Pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:gt.workingColorSpace}));const fe=p.state.transmissionRenderTarget[G.id],he=G.viewport||N;fe.setSize(he.z*x.transmissionResolutionScale,he.w*x.transmissionResolutionScale);const Oe=x.getRenderTarget(),Le=x.getActiveCubeFace(),Ze=x.getActiveMipmapLevel();x.setRenderTarget(fe),x.getClearColor(Y),J=x.getClearAlpha(),J<1&&x.setClearColor(16777215,.5),x.clear(),Ye&&Pe.render(K);const Je=x.toneMapping;x.toneMapping=ss;const Ke=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),Re===!0&&ne.setGlobalState(x.clippingPlanes,G),En(A,K,G),rt.updateMultisampleRenderTarget(fe),rt.updateRenderTargetMipmap(fe),He.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let vt=0,Lt=z.length;vt<Lt;vt++){const Et=z[vt],At=Et.object,je=Et.geometry,Bt=Et.material,ft=Et.group;if(Bt.side===Zn&&At.layers.test(G.layers)){const dn=Bt.side;Bt.side=Cn,Bt.needsUpdate=!0,Fn(At,K,G,je,Bt,ft),Bt.side=dn,Bt.needsUpdate=!0,Fe=!0}}Fe===!0&&(rt.updateMultisampleRenderTarget(fe),rt.updateRenderTargetMipmap(fe))}x.setRenderTarget(Oe,Le,Ze),x.setClearColor(Y,J),Ke!==void 0&&(G.viewport=Ke),x.toneMapping=Je}function En(A,z,K){const G=z.isScene===!0?z.overrideMaterial:null;for(let k=0,fe=A.length;k<fe;k++){const he=A[k],Oe=he.object,Le=he.geometry,Ze=he.group;let Je=he.material;Je.allowOverride===!0&&G!==null&&(Je=G),Oe.layers.test(K.layers)&&Fn(Oe,z,K,Le,Je,Ze)}}function Fn(A,z,K,G,k,fe){A.onBeforeRender(x,z,K,G,k,fe),A.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),k.onBeforeRender(x,z,K,G,A,fe),k.transparent===!0&&k.side===Zn&&k.forceSinglePass===!1?(k.side=Cn,k.needsUpdate=!0,x.renderBufferDirect(K,z,G,k,A,fe),k.side=Ni,k.needsUpdate=!0,x.renderBufferDirect(K,z,G,k,A,fe),k.side=Zn):x.renderBufferDirect(K,z,G,k,A,fe),A.onAfterRender(x,z,K,G,k,fe)}function Rs(A,z,K){z.isScene!==!0&&(z=Ae);const G=Be.get(A),k=p.state.lights,fe=p.state.shadowsArray,he=k.state.version,Oe=re.getParameters(A,k.state,fe,z,K),Le=re.getProgramCacheKey(Oe);let Ze=G.programs;G.environment=A.isMeshStandardMaterial?z.environment:null,G.fog=z.fog,G.envMap=(A.isMeshStandardMaterial?Ft:$t).get(A.envMap||G.environment),G.envMapRotation=G.environment!==null&&A.envMap===null?z.environmentRotation:A.envMapRotation,Ze===void 0&&(A.addEventListener("dispose",oe),Ze=new Map,G.programs=Ze);let Je=Ze.get(Le);if(Je!==void 0){if(G.currentProgram===Je&&G.lightsStateVersion===he)return lt(A,Oe),Je}else Oe.uniforms=re.getUniforms(A),A.onBeforeCompile(Oe,x),Je=re.acquireProgram(Oe,Le),Ze.set(Le,Je),G.uniforms=Oe.uniforms;const Ke=G.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ke.clippingPlanes=ne.uniform),lt(A,Oe),G.needsLights=ya(A),G.lightsStateVersion=he,G.needsLights&&(Ke.ambientLightColor.value=k.state.ambient,Ke.lightProbe.value=k.state.probe,Ke.directionalLights.value=k.state.directional,Ke.directionalLightShadows.value=k.state.directionalShadow,Ke.spotLights.value=k.state.spot,Ke.spotLightShadows.value=k.state.spotShadow,Ke.rectAreaLights.value=k.state.rectArea,Ke.ltc_1.value=k.state.rectAreaLTC1,Ke.ltc_2.value=k.state.rectAreaLTC2,Ke.pointLights.value=k.state.point,Ke.pointLightShadows.value=k.state.pointShadow,Ke.hemisphereLights.value=k.state.hemi,Ke.directionalShadowMap.value=k.state.directionalShadowMap,Ke.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ke.spotShadowMap.value=k.state.spotShadowMap,Ke.spotLightMatrix.value=k.state.spotLightMatrix,Ke.spotLightMap.value=k.state.spotLightMap,Ke.pointShadowMap.value=k.state.pointShadowMap,Ke.pointShadowMatrix.value=k.state.pointShadowMatrix),G.currentProgram=Je,G.uniformsList=null,Je}function zt(A){if(A.uniformsList===null){const z=A.currentProgram.getUniforms();A.uniformsList=vo.seqWithValue(z.seq,A.uniforms)}return A.uniformsList}function lt(A,z){const K=Be.get(A);K.outputColorSpace=z.outputColorSpace,K.batching=z.batching,K.batchingColor=z.batchingColor,K.instancing=z.instancing,K.instancingColor=z.instancingColor,K.instancingMorph=z.instancingMorph,K.skinning=z.skinning,K.morphTargets=z.morphTargets,K.morphNormals=z.morphNormals,K.morphColors=z.morphColors,K.morphTargetsCount=z.morphTargetsCount,K.numClippingPlanes=z.numClippingPlanes,K.numIntersection=z.numClipIntersection,K.vertexAlphas=z.vertexAlphas,K.vertexTangents=z.vertexTangents,K.toneMapping=z.toneMapping}function Zt(A,z,K,G,k){z.isScene!==!0&&(z=Ae),rt.resetTextureUnits();const fe=z.fog,he=G.isMeshStandardMaterial?z.environment:null,Oe=O===null?x.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Tn,Le=(G.isMeshStandardMaterial?Ft:$t).get(G.envMap||he),Ze=G.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Je=!!K.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ke=!!K.morphAttributes.position,Fe=!!K.morphAttributes.normal,vt=!!K.morphAttributes.color;let Lt=ss;G.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Lt=x.toneMapping);const Et=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,At=Et!==void 0?Et.length:0,je=Be.get(G),Bt=p.state.lights;if(Re===!0&&(Z===!0||A!==M)){const Kt=A===M&&G.id===b;ne.setState(G,A,Kt)}let ft=!1;G.version===je.__version?(je.needsLights&&je.lightsStateVersion!==Bt.state.version||je.outputColorSpace!==Oe||k.isBatchedMesh&&je.batching===!1||!k.isBatchedMesh&&je.batching===!0||k.isBatchedMesh&&je.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&je.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&je.instancing===!1||!k.isInstancedMesh&&je.instancing===!0||k.isSkinnedMesh&&je.skinning===!1||!k.isSkinnedMesh&&je.skinning===!0||k.isInstancedMesh&&je.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&je.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&je.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&je.instancingMorph===!1&&k.morphTexture!==null||je.envMap!==Le||G.fog===!0&&je.fog!==fe||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==ne.numPlanes||je.numIntersection!==ne.numIntersection)||je.vertexAlphas!==Ze||je.vertexTangents!==Je||je.morphTargets!==Ke||je.morphNormals!==Fe||je.morphColors!==vt||je.toneMapping!==Lt||je.morphTargetsCount!==At)&&(ft=!0):(ft=!0,je.__version=G.version);let dn=je.currentProgram;ft===!0&&(dn=Rs(G,z,k));let ci=!1,mn=!1,yi=!1;const Dt=dn.getUniforms(),An=je.uniforms;if(be.useProgram(dn.program)&&(ci=!0,mn=!0,yi=!0),G.id!==b&&(b=G.id,mn=!0),ci||M!==A){be.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Dt.setValue(U,"projectionMatrix",A.projectionMatrix),Dt.setValue(U,"viewMatrix",A.matrixWorldInverse);const pt=Dt.map.cameraPosition;pt!==void 0&&pt.setValue(U,we.setFromMatrixPosition(A.matrixWorld)),$e.logarithmicDepthBuffer&&Dt.setValue(U,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Dt.setValue(U,"isOrthographic",A.isOrthographicCamera===!0),M!==A&&(M=A,mn=!0,yi=!0)}if(k.isSkinnedMesh){Dt.setOptional(U,k,"bindMatrix"),Dt.setOptional(U,k,"bindMatrixInverse");const Kt=k.skeleton;Kt&&(Kt.boneTexture===null&&Kt.computeBoneTexture(),Dt.setValue(U,"boneTexture",Kt.boneTexture,rt))}k.isBatchedMesh&&(Dt.setOptional(U,k,"batchingTexture"),Dt.setValue(U,"batchingTexture",k._matricesTexture,rt),Dt.setOptional(U,k,"batchingIdTexture"),Dt.setValue(U,"batchingIdTexture",k._indirectTexture,rt),Dt.setOptional(U,k,"batchingColorTexture"),k._colorsTexture!==null&&Dt.setValue(U,"batchingColorTexture",k._colorsTexture,rt));const gn=K.morphAttributes;if((gn.position!==void 0||gn.normal!==void 0||gn.color!==void 0)&&me.update(k,K,dn),(mn||je.receiveShadow!==k.receiveShadow)&&(je.receiveShadow=k.receiveShadow,Dt.setValue(U,"receiveShadow",k.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(An.envMap.value=Le,An.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&z.environment!==null&&(An.envMapIntensity.value=z.environmentIntensity),mn&&(Dt.setValue(U,"toneMappingExposure",x.toneMappingExposure),je.needsLights&&$n(An,yi),fe&&G.fog===!0&&ie.refreshFogUniforms(An,fe),ie.refreshMaterialUniforms(An,G,$,se,p.state.transmissionRenderTarget[A.id]),vo.upload(U,zt(je),An,rt)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(vo.upload(U,zt(je),An,rt),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Dt.setValue(U,"center",k.center),Dt.setValue(U,"modelViewMatrix",k.modelViewMatrix),Dt.setValue(U,"normalMatrix",k.normalMatrix),Dt.setValue(U,"modelMatrix",k.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Kt=G.uniformsGroups;for(let pt=0,Is=Kt.length;pt<Is;pt++){const li=Kt[pt];et.update(li,dn),et.bind(li,dn)}}return dn}function $n(A,z){A.ambientLightColor.needsUpdate=z,A.lightProbe.needsUpdate=z,A.directionalLights.needsUpdate=z,A.directionalLightShadows.needsUpdate=z,A.pointLights.needsUpdate=z,A.pointLightShadows.needsUpdate=z,A.spotLights.needsUpdate=z,A.spotLightShadows.needsUpdate=z,A.rectAreaLights.needsUpdate=z,A.hemisphereLights.needsUpdate=z}function ya(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(A,z,K){const G=Be.get(A);G.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),Be.get(A.texture).__webglTexture=z,Be.get(A.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:K,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,z){const K=Be.get(A);K.__webglFramebuffer=z,K.__useDefaultFramebuffer=z===void 0};const Cs=U.createFramebuffer();this.setRenderTarget=function(A,z=0,K=0){O=A,C=z,L=K;let G=!0,k=null,fe=!1,he=!1;if(A){const Le=Be.get(A);if(Le.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(U.FRAMEBUFFER,null),G=!1;else if(Le.__webglFramebuffer===void 0)rt.setupRenderTarget(A);else if(Le.__hasExternalTextures)rt.rebindTextures(A,Be.get(A.texture).__webglTexture,Be.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ke=A.depthTexture;if(Le.__boundDepthTexture!==Ke){if(Ke!==null&&Be.has(Ke)&&(A.width!==Ke.image.width||A.height!==Ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");rt.setupDepthRenderbuffer(A)}}const Ze=A.texture;(Ze.isData3DTexture||Ze.isDataArrayTexture||Ze.isCompressedArrayTexture)&&(he=!0);const Je=Be.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Je[z])?k=Je[z][K]:k=Je[z],fe=!0):A.samples>0&&rt.useMultisampledRTT(A)===!1?k=Be.get(A).__webglMultisampledFramebuffer:Array.isArray(Je)?k=Je[K]:k=Je,N.copy(A.viewport),B.copy(A.scissor),H=A.scissorTest}else N.copy(Ue).multiplyScalar($).floor(),B.copy(at).multiplyScalar($).floor(),H=_t;if(K!==0&&(k=Cs),be.bindFramebuffer(U.FRAMEBUFFER,k)&&G&&be.drawBuffers(A,k),be.viewport(N),be.scissor(B),be.setScissorTest(H),fe){const Le=Be.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+z,Le.__webglTexture,K)}else if(he){const Le=z;for(let Ze=0;Ze<A.textures.length;Ze++){const Je=Be.get(A.textures[Ze]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ze,Je.__webglTexture,K,Le)}}else if(A!==null&&K!==0){const Le=Be.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Le.__webglTexture,K)}b=-1},this.readRenderTargetPixels=function(A,z,K,G,k,fe,he,Oe=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=Be.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&he!==void 0&&(Le=Le[he]),Le){be.bindFramebuffer(U.FRAMEBUFFER,Le);try{const Ze=A.textures[Oe],Je=Ze.format,Ke=Ze.type;if(!$e.textureFormatReadable(Je)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$e.textureTypeReadable(Ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=A.width-G&&K>=0&&K<=A.height-k&&(A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Oe),U.readPixels(z,K,G,k,Ge.convert(Je),Ge.convert(Ke),fe))}finally{const Ze=O!==null?Be.get(O).__webglFramebuffer:null;be.bindFramebuffer(U.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(A,z,K,G,k,fe,he,Oe=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=Be.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&he!==void 0&&(Le=Le[he]),Le)if(z>=0&&z<=A.width-G&&K>=0&&K<=A.height-k){be.bindFramebuffer(U.FRAMEBUFFER,Le);const Ze=A.textures[Oe],Je=Ze.format,Ke=Ze.type;if(!$e.textureFormatReadable(Je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$e.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Fe=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Fe),U.bufferData(U.PIXEL_PACK_BUFFER,fe.byteLength,U.STREAM_READ),A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Oe),U.readPixels(z,K,G,k,Ge.convert(Je),Ge.convert(Ke),0);const vt=O!==null?Be.get(O).__webglFramebuffer:null;be.bindFramebuffer(U.FRAMEBUFFER,vt);const Lt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Bg(U,Lt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Fe),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,fe),U.deleteBuffer(Fe),U.deleteSync(Lt),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,z=null,K=0){const G=Math.pow(2,-K),k=Math.floor(A.image.width*G),fe=Math.floor(A.image.height*G),he=z!==null?z.x:0,Oe=z!==null?z.y:0;rt.setTexture2D(A,0),U.copyTexSubImage2D(U.TEXTURE_2D,K,0,0,he,Oe,k,fe),be.unbindTexture()};const Ps=U.createFramebuffer(),br=U.createFramebuffer();this.copyTextureToTexture=function(A,z,K=null,G=null,k=0,fe=null){fe===null&&(k!==0?(la("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),fe=k,k=0):fe=0);let he,Oe,Le,Ze,Je,Ke,Fe,vt,Lt;const Et=A.isCompressedTexture?A.mipmaps[fe]:A.image;if(K!==null)he=K.max.x-K.min.x,Oe=K.max.y-K.min.y,Le=K.isBox3?K.max.z-K.min.z:1,Ze=K.min.x,Je=K.min.y,Ke=K.isBox3?K.min.z:0;else{const gn=Math.pow(2,-k);he=Math.floor(Et.width*gn),Oe=Math.floor(Et.height*gn),A.isDataArrayTexture?Le=Et.depth:A.isData3DTexture?Le=Math.floor(Et.depth*gn):Le=1,Ze=0,Je=0,Ke=0}G!==null?(Fe=G.x,vt=G.y,Lt=G.z):(Fe=0,vt=0,Lt=0);const At=Ge.convert(z.format),je=Ge.convert(z.type);let Bt;z.isData3DTexture?(rt.setTexture3D(z,0),Bt=U.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(rt.setTexture2DArray(z,0),Bt=U.TEXTURE_2D_ARRAY):(rt.setTexture2D(z,0),Bt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,z.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,z.unpackAlignment);const ft=U.getParameter(U.UNPACK_ROW_LENGTH),dn=U.getParameter(U.UNPACK_IMAGE_HEIGHT),ci=U.getParameter(U.UNPACK_SKIP_PIXELS),mn=U.getParameter(U.UNPACK_SKIP_ROWS),yi=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,Et.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Et.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ze),U.pixelStorei(U.UNPACK_SKIP_ROWS,Je),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ke);const Dt=A.isDataArrayTexture||A.isData3DTexture,An=z.isDataArrayTexture||z.isData3DTexture;if(A.isDepthTexture){const gn=Be.get(A),Kt=Be.get(z),pt=Be.get(gn.__renderTarget),Is=Be.get(Kt.__renderTarget);be.bindFramebuffer(U.READ_FRAMEBUFFER,pt.__webglFramebuffer),be.bindFramebuffer(U.DRAW_FRAMEBUFFER,Is.__webglFramebuffer);for(let li=0;li<Le;li++)Dt&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Be.get(A).__webglTexture,k,Ke+li),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Be.get(z).__webglTexture,fe,Lt+li)),U.blitFramebuffer(Ze,Je,he,Oe,Fe,vt,he,Oe,U.DEPTH_BUFFER_BIT,U.NEAREST);be.bindFramebuffer(U.READ_FRAMEBUFFER,null),be.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(k!==0||A.isRenderTargetTexture||Be.has(A)){const gn=Be.get(A),Kt=Be.get(z);be.bindFramebuffer(U.READ_FRAMEBUFFER,Ps),be.bindFramebuffer(U.DRAW_FRAMEBUFFER,br);for(let pt=0;pt<Le;pt++)Dt?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,gn.__webglTexture,k,Ke+pt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,gn.__webglTexture,k),An?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Kt.__webglTexture,fe,Lt+pt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Kt.__webglTexture,fe),k!==0?U.blitFramebuffer(Ze,Je,he,Oe,Fe,vt,he,Oe,U.COLOR_BUFFER_BIT,U.NEAREST):An?U.copyTexSubImage3D(Bt,fe,Fe,vt,Lt+pt,Ze,Je,he,Oe):U.copyTexSubImage2D(Bt,fe,Fe,vt,Ze,Je,he,Oe);be.bindFramebuffer(U.READ_FRAMEBUFFER,null),be.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else An?A.isDataTexture||A.isData3DTexture?U.texSubImage3D(Bt,fe,Fe,vt,Lt,he,Oe,Le,At,je,Et.data):z.isCompressedArrayTexture?U.compressedTexSubImage3D(Bt,fe,Fe,vt,Lt,he,Oe,Le,At,Et.data):U.texSubImage3D(Bt,fe,Fe,vt,Lt,he,Oe,Le,At,je,Et):A.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,fe,Fe,vt,he,Oe,At,je,Et.data):A.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,fe,Fe,vt,Et.width,Et.height,At,Et.data):U.texSubImage2D(U.TEXTURE_2D,fe,Fe,vt,he,Oe,At,je,Et);U.pixelStorei(U.UNPACK_ROW_LENGTH,ft),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,dn),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ci),U.pixelStorei(U.UNPACK_SKIP_ROWS,mn),U.pixelStorei(U.UNPACK_SKIP_IMAGES,yi),fe===0&&z.generateMipmaps&&U.generateMipmap(Bt),be.unbindTexture()},this.initRenderTarget=function(A){Be.get(A).__webglFramebuffer===void 0&&rt.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?rt.setTextureCube(A,0):A.isData3DTexture?rt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?rt.setTexture2DArray(A,0):rt.setTexture2D(A,0),be.unbindTexture()},this.resetState=function(){C=0,L=0,O=null,be.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=gt._getUnpackColorSpace()}}function xh(i,e){if(e===ug)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Ul||e===uf){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Ul)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class QM extends Mr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new sS(t)}),this.register(function(t){return new rS(t)}),this.register(function(t){return new pS(t)}),this.register(function(t){return new mS(t)}),this.register(function(t){return new gS(t)}),this.register(function(t){return new oS(t)}),this.register(function(t){return new cS(t)}),this.register(function(t){return new lS(t)}),this.register(function(t){return new uS(t)}),this.register(function(t){return new iS(t)}),this.register(function(t){return new dS(t)}),this.register(function(t){return new aS(t)}),this.register(function(t){return new fS(t)}),this.register(function(t){return new hS(t)}),this.register(function(t){return new tS(t)}),this.register(function(t){return new _S(t)}),this.register(function(t){return new vS(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=Qr.extractUrlBase(e);a=Qr.resolveURL(c,this.path)}else a=Qr.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Uf(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Hf){try{a[dt.KHR_BINARY_GLTF]=new yS(e)}catch(d){s&&s(d);return}r=JSON.parse(a[dt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new LS(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const d=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(d){case dt.KHR_MATERIALS_UNLIT:a[d]=new nS;break;case dt.KHR_DRACO_MESH_COMPRESSION:a[d]=new xS(r,this.dracoLoader);break;case dt.KHR_TEXTURE_TRANSFORM:a[d]=new MS;break;case dt.KHR_MESH_QUANTIZATION:a[d]=new SS;break;default:h.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function eS(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const dt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class tS{constructor(e){this.parser=e,this.name=dt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const u=new nt(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Tn);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new zl(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new n_(u),c.distance=d;break;case"spot":c=new e_(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),di(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class nS{constructor(){this.name=dt.KHR_MATERIALS_UNLIT}getMaterialType(){return Gn}extendParams(e,t,n){const s=[];e.color=new nt(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Tn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Wt))}return Promise.all(s)}}class iS{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class sS{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ze(o,o)}return Promise.all(r)}}class rS{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class aS{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class oS{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new nt(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Tn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Wt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class cS{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class lS{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new nt().setRGB(o[0],o[1],o[2],Tn),Promise.all(r)}}class uS{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class dS{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new nt().setRGB(o[0],o[1],o[2],Tn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Wt)),Promise.all(r)}}class hS{constructor(e){this.parser=e,this.name=dt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class fS{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class pS{constructor(e){this.parser=e,this.name=dt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class mS{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class gS{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class _S{constructor(e){this.name=dt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,u=s.count,d=s.byteStride,h=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,d,h,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(u*d);return a.decodeGltfBuffer(new Uint8Array(f),u,d,h,s.mode,s.filter),f})})}else return null}}class vS{constructor(e){this.name=dt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==zn.TRIANGLES&&c.mode!==zn.TRIANGLE_STRIP&&c.mode!==zn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],h=c[0].count,f=[];for(const g of d){const v=new st,m=new w,p=new it,E=new w(1,1,1),T=new Af(g.geometry,g.material,h);for(let x=0;x<h;x++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,x),l.SCALE&&E.fromBufferAttribute(l.SCALE,x),T.setMatrixAt(x,v.compose(m,p,E));for(const x in l)if(x==="_COLOR_0"){const R=l[x];T.instanceColor=new Fl(R.array,R.itemSize,R.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,l[x]);Ht.prototype.copy.call(T,g),this.parser.assignFinalMaterial(T),f.push(T)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const Hf="glTF",Gr=12,Mh={JSON:1313821514,BIN:5130562};class yS{constructor(e){this.name=dt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Gr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Hf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Gr,r=new DataView(e,Gr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===Mh.JSON){const c=new Uint8Array(e,Gr+a,o);this.content=n.decode(c)}else if(l===Mh.BIN){const c=Gr+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class xS{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=dt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const u in a){const d=Gl[u]||u.toLowerCase();o[d]=a[u]}for(const u in e.attributes){const d=Gl[u]||u.toLowerCase();if(a[u]!==void 0){const h=n.accessors[e.attributes[u]],f=ar[h.componentType];c[d]=f.name,l[d]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,h){s.decodeDracoFile(u,function(f){for(const g in f.attributes){const v=f.attributes[g],m=l[g];m!==void 0&&(v.normalized=m)}d(f)},o,c,Tn,h)})})}}class MS{constructor(){this.name=dt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class SS{constructor(){this.name=dt.KHR_MESH_QUANTIZATION}}class Vf extends ga{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=s-t,d=(n-t)/u,h=d*d,f=h*d,g=e*c,v=g-c,m=-2*f+3*h,p=f-h,E=1-m,T=p-h+d;for(let x=0;x!==o;x++){const R=a[v+x+o],C=a[v+x+l]*u,L=a[g+x+o],O=a[g+x]*u;r[x]=E*R+T*C+m*L+p*O}return r}}const bS=new it;class TS extends Vf{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return bS.fromArray(r).normalize().toArray(r),r}}const zn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ar={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Sh={9728:Sn,9729:Nn,9984:tf,9985:fo,9986:$r,9987:Pi},bh={33071:ns,33648:bo,10497:hr},Bc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Gl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Zi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},ES={CUBICSPLINE:void 0,LINEAR:oa,STEP:aa},kc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function AS(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new en({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ni})),i.DefaultMaterial}function _s(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function di(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function wS(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;a.push(h)}if(s){const h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;o.push(h)}if(r){const h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;l.push(h)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],h=c[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function RS(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function CS(i){let e;const t=i.extensions&&i.extensions[dt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+zc(t.attributes):e=i.indices+":"+zc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+zc(i.targets[n]);return e}function zc(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Wl(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function PS(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const IS=new st;class LS{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new eS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new J0(this.options.manager):this.textureLoader=new s_(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Uf(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return _s(r,o,s),di(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,u]of a.children.entries())r(u,o.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[dt.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(Qr.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=Bc[s.type],o=ar[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new bn(c,a,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=Bc[s.type],c=ar[s.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,h=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let v,m;if(f&&f!==d){const p=Math.floor(h/f),E="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let T=t.cache.get(E);T||(v=new c(o,p*f,s.count*f/u),T=new Mf(v,f/u),t.cache.add(E,T)),m=new ua(T,l,h%f/u,g)}else o===null?v=new c(s.count*l):v=new c(o,h,s.count*l),m=new bn(v,l,g);if(s.sparse!==void 0){const p=Bc.SCALAR,E=ar[s.sparse.indices.componentType],T=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,R=new E(a[1],T,s.sparse.count*p),C=new c(a[2],x,s.sparse.count*l);o!==null&&(m=new bn(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let L=0,O=R.length;L<O;L++){const b=R[L];if(m.setX(b,C[L*l]),l>=2&&m.setY(b,C[L*l+1]),l>=3&&m.setZ(b,C[L*l+2]),l>=4&&m.setW(b,C[L*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const h=(r.samplers||{})[a.sampler]||{};return u.magFilter=Sh[h.magFilter]||Nn,u.minFilter=Sh[h.minFilter]||Pi,u.wrapS=bh[h.wrapS]||hr,u.wrapT=bh[h.wrapT]||hr,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Sn&&u.minFilter!==Nn,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(d){c=!0;const h=new Blob([d],{type:a.mimeType});return l=o.createObjectURL(h),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(h,f){let g=h;t.isImageBitmapLoader===!0&&(g=function(v){const m=new tn(v);m.needsUpdate=!0,h(m)}),t.load(Qr.resolveURL(d,r.path),g,void 0,f)})}).then(function(d){return c===!0&&o.revokeObjectURL(l),di(d,a),d.userData.mimeType=a.mimeType||PS(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[dt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[dt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[dt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Rf,ii.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new wf,ii.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return en}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[dt.KHR_MATERIALS_UNLIT]){const d=s[dt.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),c.push(d.extendParams(o,r,t))}else{const d=r.pbrMetallicRoughness||{};if(o.color=new nt(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){const h=d.baseColorFactor;o.color.setRGB(h[0],h[1],h[2],Tn),o.opacity=h[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",d.baseColorTexture,Wt)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Zn);const u=r.alphaMode||kc.OPAQUE;if(u===kc.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===kc.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Gn&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ze(1,1),r.normalTexture.scale!==void 0)){const d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==Gn&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Gn){const d=r.emissiveFactor;o.emissive=new nt().setRGB(d[0],d[1],d[2],Tn)}return r.emissiveTexture!==void 0&&a!==Gn&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Wt)),Promise.all(c).then(function(){const d=new a(o);return r.name&&(d.name=r.name),di(d,r),t.associations.set(d,{materials:e}),r.extensions&&_s(s,d,r),d})}createUniqueName(e){const t=It.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[dt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Th(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],u=CS(c),d=s[u];if(d)a.push(d.promise);else{let h;c.extensions&&c.extensions[dt.KHR_DRACO_MESH_COMPRESSION]?h=r(c):h=Th(new on,c,t),s[u]={primitive:c,promise:h},a.push(h)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const u=a[l].material===void 0?AS(this.cache):this.getDependency("material",a[l].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let f=0,g=u.length;f<g;f++){const v=u[f],m=a[f];let p;const E=c[f];if(m.mode===zn.TRIANGLES||m.mode===zn.TRIANGLE_STRIP||m.mode===zn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new h0(v,E):new Ct(v,E),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===zn.TRIANGLE_STRIP?p.geometry=xh(p.geometry,uf):m.mode===zn.TRIANGLE_FAN&&(p.geometry=xh(p.geometry,Ul));else if(m.mode===zn.LINES)p=new v0(v,E);else if(m.mode===zn.LINE_STRIP)p=new pu(v,E);else if(m.mode===zn.LINE_LOOP)p=new y0(v,E);else if(m.mode===zn.POINTS)p=new x0(v,E);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&RS(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),di(p,r),m.extensions&&_s(s,p,m),t.assignFinalMaterial(p),d.push(p)}for(let f=0,g=d.length;f<g;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&_s(s,d[0],r),d[0];const h=new Xt;r.extensions&&_s(s,h,r),t.associations.set(h,{meshes:e});for(let f=0,g=d.length;f<g;f++)h.add(d[f]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new yn(Qi.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Mu(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),di(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],l=[];for(let c=0,u=a.length;c<u;c++){const d=a[c];if(d){o.push(d);const h=new st;r!==null&&h.fromArray(r.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new hu(o,l)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],u=[];for(let d=0,h=s.channels.length;d<h;d++){const f=s.channels[d],g=s.samplers[f.sampler],v=f.target,m=v.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,E=s.parameters!==void 0?s.parameters[g.output]:g.output;v.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",E)),c.push(g),u.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const h=d[0],f=d[1],g=d[2],v=d[3],m=d[4],p=[];for(let T=0,x=h.length;T<x;T++){const R=h[T],C=f[T],L=g[T],O=v[T],b=m[T];if(R===void 0)continue;R.updateMatrix&&R.updateMatrix();const M=n._createAnimationTracks(R,C,L,O,b);if(M)for(let N=0;N<M.length;N++)p.push(M[N])}const E=new W0(r,void 0,p);return di(E,s),E})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,u=o.length;c<u;c++)a.push(n.getDependency("node",o[c]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const u=c[0],d=c[1],h=c[2];h!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(h,IS)});for(let f=0,g=d.length;f<g;f++)u.add(d[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(r.isBone===!0?u=new Tf:c.length>1?u=new Xt:c.length===1?u=c[0]:u=new Ht,u!==c[0])for(let d=0,h=c.length;d<h;d++)u.add(c[d]);if(r.name&&(u.userData.name=r.name,u.name=a),di(u,r),r.extensions&&_s(n,u,r),r.matrix!==void 0){const d=new st;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const d=s.associations.get(u);s.associations.set(u,{...d})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new Xt;n.name&&(r.name=s.createUniqueName(n.name)),di(r,n),n.extensions&&_s(t,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let u=0,d=l.length;u<d;u++)r.add(l[u]);const c=u=>{const d=new Map;for(const[h,f]of s.associations)(h instanceof ii||h instanceof tn)&&d.set(h,f);return u.traverse(h=>{const f=s.associations.get(h);f!=null&&d.set(h,f)}),d};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,l=[];Zi[r.path]===Zi.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(o);let c;switch(Zi[r.path]){case Zi.weights:c=mr;break;case Zi.rotation:c=gr;break;case Zi.translation:case Zi.scale:c=_r;break;default:switch(n.itemSize){case 1:c=mr;break;case 2:case 3:default:c=_r;break}break}const u=s.interpolation!==void 0?ES[s.interpolation]:oa,d=this._getArrayFromAccessor(n);for(let h=0,f=l.length;h<f;h++){const g=new c(l[h]+"."+Zi[r.path],t.array,d,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Wl(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof gr?TS:Vf;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function DS(i,e,t){const n=e.attributes,s=new Un;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new w(l[0],l[1],l[2]),new w(c[0],c[1],c[2])),o.normalized){const u=Wl(ar[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new w,l=new w;for(let c=0,u=r.length;c<u;c++){const d=r[c];if(d.POSITION!==void 0){const h=t.json.accessors[d.POSITION],f=h.min,g=h.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),h.normalized){const v=Wl(ar[h.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new _i;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function Th(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(const a in n){const o=Gl[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return gt.workingColorSpace!==Tn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${gt.workingColorSpace}" not supported.`),di(i,e),DS(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?wS(i,e.targets,t):i})}const NS={restaurant:{theme:"cozy-cafe",products:Dh.map(i=>i.id),sources:["assets/restaurant-cozy-interior.glb","assets/restaurant-cozy-customers.glb","assets/restaurant-products.glb","assets/cash-register.glb"],customerKinds:["bear","bunny","fox","penguin","cat"],hasBelt:!1}},US={"POS / Graphite powder coat":"#b17a55","POS / Injection molded ABS":"#f5dfbd","POS / Rubber":"#775543","POS / Brushed aluminium":"#d1aa76","POS / Stainless spring steel":"#d8c0a0","POS / Dark keycaps":"#9bae92","POS / Light keycaps":"#fff0d2","POS / Clear key":"#db927e","POS / Confirm key":"#8caa87","POS / Lettering":"#684b3c","POS / Key legend":"#5a4436","POS / Thermal paper":"#fff4da"},Hc=new w(.65,1.025,.3),OS=new w(-.045,.98,.58),Wr=new w(-.2,1.052,-.1),Vc=new w(.28,1.026,-.48),Gc=new w(3.2,0,-2),Xr=new w(-.3,1.3,-.74),FS=new w(0,0,-1.2),BS=[new w(-1.4,0,-2.5),new w(-2.7,0,-3.5)],kS=[[1e4,-.264],[5e3,-.132],[2e3,0],[1e3,.132],[500,.264]],zS=[[200,-.274],[100,-.165],[50,-.055],[20,.055],[10,.165],[5,.274]],Wc={calm:{peak:[0,0,0],settled:[0,0,0],duration:300},restless:{peak:[-.14,.045,-.18],settled:[-.055,.015,-.06],duration:1100},impatient:{peak:[-.24,.075,-.65],settled:[-.1,.035,-.17],duration:1350},exhausted:{peak:[-.32,.1,-.92],settled:[-.15,.05,-.28],duration:1500}},Xc={calm:{smile:.02,brow:.08,lift:0,cheek:1},happy:{smile:.036,brow:.18,lift:.018,cheek:1.18},restless:{smile:.003,brow:.28,lift:.006,cheek:.92},impatient:{smile:-.022,brow:-.22,lift:-.006,cheek:.84},exhausted:{smile:-.014,brow:.32,lift:-.011,cheek:.76},relieved:{smile:.025,brow:.04,lift:.003,cheek:1.06},tired:{smile:.008,brow:.27,lift:-.01,cheek:.82}},HS=["bear-nod","bunny-ears","fox-tilt","penguin-flippers","cat-blink"],VS=["thumbs-up","kiss","hearts","thumbs-up","kiss"],yo=i=>`./${i}`,ln=i=>i*i*(3-2*i),Eh=i=>`$${(i/100).toFixed(i%100?2:0)}`;function Ah(i,e=new Set){return i==null||i.traverse(t=>{t.geometry&&!e.has(t.geometry)&&(e.add(t.geometry),t.geometry.dispose());for(const n of Array.isArray(t.material)?t.material:[t.material])if(!(!n||e.has(n))){e.add(n);for(const s of Object.values(n))s!=null&&s.isTexture&&!e.has(s)&&(e.add(s),s.dispose());n.dispose()}}),e}function GS(i,e,t){let n=0,s=!1,r=null;return{setState(a){r=a;const o=++n;a.phase==="unload"&&queueMicrotask(()=>{!s&&o===n&&(i==null||i())})},setOrder(){},setScanned(){},setPatience(){},setEmotion(){},setSpeech(){},playReaction(){},reactToChange(){},celebrate(){},resize(){},dispose(){s=!0,n++},info:()=>({status:"unavailable",loaded:!1,sceneId:e,theme:{id:t.theme},customerKinds:[...t.customerKinds],customerModels:0,humanModels:0,productModels:[],conveyorVisible:!1,greetingAnimation:{status:"unavailable",active:!1},thankYouAnimation:{status:"unavailable",active:!1},phase:r==null?void 0:r.phase,patienceMood:"calm",cameraType:"PerspectiveCamera",viewMode:"first-person",triangles:0,drawCalls:0,queueCount:0,unloading:!1,drawerOpen:!1,drawerTarget:null,availableDrawerDenominations:ta(r).map(a=>a.cents),missingDrawerDenominations:Uo(r).map(a=>a.cents),activeAnimations:0,renderedFrames:0,renderLoopActive:!1,emotion:{mood:"happy",kind:t.customerKinds[0],expressionStyle:"unavailable",mouthOpenness:0,facialPose:"emotion"},speech:{active:!1,character:t.customerKinds[0],mouthOpenness:0,boundaryCount:0},reaction:{kind:null,status:"unavailable",active:!1,particleCount:0,symbolKinds:[]},changeHandover:{status:"none",holder:null,visible:!1,attachedToHand:!1,count:0,denominations:[]},takeawayBag:{status:"unavailable",holder:null,visible:!1,attachedToHand:!1,itemCount:0,lineIds:[],productIds:[],worldBounds:null},departure:{active:!1,walking:!1},customerMotion:{enabled:!1,active:!1,scheduled:!1,bursts:0,actorIndices:[],poses:[]},receipt:{status:"unavailable",holder:null,visible:!1,attachedToHand:!1,worldBounds:null,orderId:null},wrongChangeReaction:{direction:null,status:"unavailable",active:!1},items:[],modelSources:t.sources.map(yo)})}}async function WS(i,{sceneId:e="restaurant",onScan:t,onReady:n,onError:s,onUnloadComplete:r,onAcceptPayment:a,onOpenDrawer:o}={}){e="restaurant";const l=NS[e],c=e==="restaurant",u=OS.clone();c&&(u.y=1.032);let d;try{d=new ZM({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch(_){return s==null||s(new Error("The 3D checkout could not start. You can still use all cashier controls.",{cause:_})),GS(r,e,l)}let h=!1,f=!1,g=!1,v=!1,m=0,p=0,E=0,T=null,x=null,R=null,C=null,L=null,O=null,b=null,M=null,N=null,B="none",H=null,Y=0,J=null,te=null,se={direction:null,status:"none",restore:null},$="happy",ve=!1,Ie=0,Ue=0,at=0,_t=0,xt=null,Re={kind:null,status:"none",symbolKinds:[]},Z=null,j="none",we=null,Xe=[],Ae="counter";const Ye=new Map;let Mt=[],U=0,St="";const He=new Set,$e=new Map;let be=null,Tt=null,Be=!1,rt=.45,$t="",Ft=ta().map(_=>_.cents),P=[];const S=[],X=new Map,re=new Map;let ie=null,ee=null,ce=0,ne="scan",De="calm",Pe=new Set,me="",Te=[],qe=null,Ge=!1,Ee=!1,et=null,F=null,ge=null,xe=!1;const Ne=window.matchMedia("(prefers-reduced-motion: reduce)");let ae=Ne.matches;const oe=new Map,ue=new Map,We=new Map,Me=new Map,ht=new Map,pn=new Map;let cn=null,va=0,ai=0,oi=null,os=[];function ws(){return g&&!h&&!f&&!document.hidden&&!ae&&ie&&!["unload","success","finished"].includes(ne)}function En(){clearTimeout(cn),cn=null,Me.delete("customers-idle"),oi==null||oi(),oi=null,os=[]}function Fn(_=2200){!ws()||cn!==null||Me.has("customers-idle")||(cn=setTimeout(()=>{cn=null,ws()&&Rs()},_))}function Rs(){const _=[...ue.values()].filter(D=>!D.group.visible||D.index===ce%5&&(De!=="calm"||se.direction||Me.has(`arm:${D.index}`))?!1:!["animal","patience","person","depart"].some(W=>Me.has(`${W}:${D.index}`))).map(D=>{var W,pe,V,Q;return{person:D,queued:D.index!==ce%5,rigPosition:D.rig.position.clone(),rigQuaternion:D.rig.quaternion.clone(),head:(W=D.head)==null?void 0:W.quaternion.clone(),headPosition:(pe=D.head)==null?void 0:pe.position.clone(),arm:(V=D.freeArm)==null?void 0:V.quaternion.clone(),forearm:(Q=D.freeForearm)==null?void 0:Q.quaternion.clone(),ears:D.ears.map(le=>({object:le.object,quaternion:le.object.quaternion.clone()})),body:D.bodyParts.map(le=>({object:le,scale:le.scale.clone()}))}});if(!_.length){Fn(1800);return}const I=va++;ai++,os=_.map(({person:D})=>D.index);const y=()=>{var D;for(const{person:W,rigPosition:pe,rigQuaternion:V,head:Q,headPosition:le,arm:_e,forearm:de,body:Se,ears:ke}of _){W.rig.position.copy(pe),W.rig.quaternion.copy(V),Q&&(W.head.quaternion.copy(Q),W.head.position.copy(le)),_e&&W.freeArm.quaternion.copy(_e),de&&W.freeForearm.quaternion.copy(de);for(const Qe of Se)Qe.object.scale.copy(Qe.scale);for(const Qe of ke)Qe.object.quaternion.copy(Qe.quaternion);Rr(W,((D=W.expression)==null?void 0:D.eyeClosure)??0)}};oi=y,wn("customers-idle",2800,D=>{for(const[W,pe]of _.entries()){const{person:V,queued:Q,rigPosition:le,rigQuaternion:_e,head:de,headPosition:Se,arm:ke,forearm:Qe,body:Gt,ears:yt}=pe,mt=Qi.clamp((D*2800-W*170)/2380,0,1),Nt=Math.sin(mt*Math.PI)**2,Rt=Math.sin(mt*Math.PI*2)*Nt,Pn=(V.index+I)%2?-1:1;for(const In of Gt)In.object.scale.copy(In.scale).multiply(new w(1+Nt*.004,1+Nt*.004,1+Nt*.01));Q&&(V.rig.position.copy(le).add(new w(Rt*.014,0,0)),V.rig.quaternion.copy(_e).multiply(new it().setFromAxisAngle(new w(0,0,1),Rt*.01))),de&&(V.head.position.copy(Se).add(new w(0,Nt*.005,0)),V.head.quaternion.copy(de).multiply(new it().setFromEuler(new qt(Nt*(V.index===0?.045:V.index===3?.065:.018),Nt*Pn*.085,Rt*(V.index===2?.07:.018))))),c&&V.index===1&&yt.forEach((In,Bn)=>In.object.quaternion.copy(In.quaternion).multiply(new it().setFromAxisAngle(new w(0,0,1),Rt*(Bn?-.085:.085)))),c&&V.index===4&&Rr(V,Math.max(V.expression.eyeClosure,mt>.3&&mt<.58?Math.sin((mt-.3)/.28*Math.PI)**2:0)),ke&&V.freeArm.quaternion.copy(ke).multiply(new it().setFromEuler(new qt(-Nt*.14,0,Nt*Pn*.035))),Qe&&V.freeForearm.quaternion.copy(Qe).multiply(new it().setFromAxisAngle(new w(1,0,0),-Nt*.2))}},()=>{y(),oi=null,os=[],Fn(4400)})}d.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),d.outputColorSpace=Wt,d.toneMapping=Qh,d.toneMappingExposure=c?1:1.05,d.shadowMap.enabled=!0,d.shadowMap.type=Jh;const zt=d.domElement;zt.className="market-canvas",zt.style.cssText="display:block;width:100%;height:100%;touch-action:pan-y;outline:none;",zt.setAttribute("role","img"),zt.setAttribute("aria-label",`First-person ${c?"restaurant counter. Tap food on the trays to ring it up":"supermarket checkout. Tap groceries to scan them"} and tap the customer’s offered money to accept payment. The same actions are available as buttons.`),i.append(zt);const lt=new l0;lt.background=new nt(c?16773081:14410719),lt.fog=new du(c?16773081:14410719,13,34);const Zt=new yn(60,1,.055,60);Zt.position.set(0,1.9,2.65),Zt.lookAt(-.15,1.1,-.55),lt.add(new Z0(c?16777201:16775406,c?13017228:10135455,c?1.4:1.9));const $n=new zl(c?16773081:16773850,c?1.9:2.4);$n.position.set(-3,7,4),$n.castShadow=!0,$n.shadow.mapSize.set(1024,1024),Object.assign($n.shadow.camera,{left:-7,right:7,top:7,bottom:-7,near:.1,far:24}),$n.shadow.bias=-4e-4,$n.shadow.normalBias=.025,$n.target.position.set(0,0,-3),lt.add($n,$n.target);const ya=new zl(c?16769476:15201023,c?.95:1.1);ya.position.set(5,4,-4),lt.add(ya);const Cs=new Xt;Cs.name="order_items",lt.add(Cs);const Ps=new Xt;Ps.name="customer_queue",lt.add(Ps);const br=new Xt;br.name="customer_affection",lt.add(br);const A=new Map;function z(_){if(A.has(_))return A.get(_);const I=document.createElement("canvas");I.width=I.height=192;const y=I.getContext("2d");y.lineJoin="round",y.lineCap="round",_==="hearts"?(y.beginPath(),y.moveTo(96,160),y.bezierCurveTo(12,107,15,49,55,38),y.bezierCurveTo(74,31,89,41,96,57),y.bezierCurveTo(104,40,120,31,140,38),y.bezierCurveTo(180,50,178,110,96,160),y.fillStyle="#f48eac",y.strokeStyle="#fff8ee",y.lineWidth=10,y.fill(),y.stroke(),y.beginPath(),y.moveTo(51,57),y.quadraticCurveTo(39,68,43,85),y.strokeStyle="#ffd8e5",y.lineWidth=8,y.stroke()):(y.fillStyle="#eff5d6",y.strokeStyle="#fff8ee",y.lineWidth=8,y.beginPath(),y.arc(96,96,77,0,Math.PI*2),y.fill(),y.stroke(),y.beginPath(),y.moveTo(71,149),y.lineTo(71,84),y.quadraticCurveTo(87,74,92,52),y.quadraticCurveTo(95,35,107,42),y.quadraticCurveTo(120,51,108,78),y.lineTo(139,78),y.quadraticCurveTo(155,80,150,96),y.lineTo(140,137),y.quadraticCurveTo(137,149,121,149),y.closePath(),y.fillStyle="#f5ce9f",y.strokeStyle="#a57a52",y.lineWidth=5,y.fill(),y.stroke(),y.fillStyle="#99b894",y.fillRect(42,89,25,62),y.strokeStyle="#6d8c6c",y.strokeRect(42,89,25,62),y.beginPath(),y.moveTo(113,102),y.lineTo(147,102),y.moveTo(112,121),y.lineTo(142,121),y.strokeStyle="#c7996d",y.lineWidth=3,y.stroke());const D=new Zs(I);return D.colorSpace=Wt,A.set(_,D),D}const K=Array.from({length:5},(_,I)=>{const y=new u0(new Sf({map:z(I===4?"thumbs-up":"hearts"),transparent:!0,depthWrite:!1,toneMapped:!1}));return y.name=`customer_reaction_${I}`,y.visible=!1,br.add(y),y}),G=new Xt;G.name="offered_payment",G.visible=!1,lt.add(G);const k=new Xt;k.name="accepted_payment_handover",k.visible=!1,lt.add(k);const fe=new Xt;fe.name="change_tray_money",fe.position.copy(u).add(new w(0,.018,0)),lt.add(fe);const he=new Xt;he.name="customer_change",he.visible=!1,lt.add(he);const Oe=new w(.061,-.015,.044),Le=new Xt;Le.name="cashier_change_tray",Le.position.copy(u);const Ze=new Hn(1,1,1),Je=new en({color:c?13209200:2381132,roughness:c?.9:.7}),Ke=new en({color:c?15916218:1588534,roughness:.95});for(const[_,I,y]of[[[.44,.018,.21],[0,0,0],Je],[[.418,.002,.188],[0,.01,0],Ke],[[.44,.023,.011],[0,.018,-.0995],Je],[[.44,.023,.011],[0,.018,.0995],Je],[[.011,.023,.188],[-.2145,.018,0],Je],[[.011,.023,.188],[.2145,.018,0],Je]]){const D=new Ct(Ze,y);D.scale.set(..._),D.position.set(...I),D.castShadow=!0,D.receiveShadow=!0,Le.add(D)}lt.add(Le);const Fe=new Xt;Fe.name="takeaway_bag",Fe.position.copy(Vc);const vt=new Xt;vt.name="packed_food",Fe.add(vt);const Lt=new en({color:13211745,roughness:.97}),Et=new en({color:10384204,roughness:.95}),At=new Hn(1,1,1);for(const[_,I,y]of[[[.44,.014,.27],[0,.007,0],Lt],[[.44,.3,.008],[0,.15,.135],Lt],[[.44,.3,.008],[0,.15,-.135],Lt],[[.008,.3,.27],[-.22,.15,0],Lt],[[.008,.3,.27],[.22,.15,0],Lt],[[.448,.016,.014],[0,.296,.135],Et],[[.448,.016,.014],[0,.296,-.135],Et]]){const D=new Ct(At,y);D.scale.set(..._),D.position.set(...I),D.castShadow=!0,D.receiveShadow=!0,Fe.add(D)}for(const _ of[-.1,.1]){const I=new kl([new w(-.09,.285,_),new w(-.065,.41,_),new w(.065,.41,_),new w(.09,.285,_)]),y=new Ct(new Ro(I,20,.009,6,!1),Et);y.castShadow=!0,Fe.add(y)}const je=document.createElement("canvas");je.width=384,je.height=192;const Bt=new Zs(je);Bt.colorSpace=Wt;const ft=new Ct(new ma(.285,.1425),new Gn({map:Bt,toneMapped:!1}));ft.position.set(0,.16,.141),Fe.add(ft),lt.add(Fe);const dn=new w(.08,-.38,-.125);function ci(){const _=je.getContext("2d");_.fillStyle="#f8e9ca",_.fillRect(0,0,384,192),_.fillStyle="#755239",_.textAlign="center",_.font="bold 40px Arial",_.fillText("SUNNY BITES",192,72),_.font="32px Arial",_.fillText(Ye.size?`${Ye.size} ${Ye.size===1?"item":"items"} packed`:"Made with care",192,130),Bt.needsUpdate=!0}function mn(){Me.delete("bag-handover"),Ye.clear(),vt.clear(),lt.add(Fe),Fe.position.copy(Vc),Fe.quaternion.identity(),Fe.visible=!0,Ae="counter",ci()}function yi(_){if(!_||Ye.has(_.lineId))return;const I=Ye.size;vt.add(_.visual),_.visual.position.set(I%2?.1:-.1,.18+Math.floor(I/2)*.035,I<2?.035:-.045),_.visual.scale.setScalar(.55),_.visual.rotation.y=I%2?.12:-.12,_.group.visible=!1,Ye.set(_.lineId,_.productId),ci()}function Dt(){const _=ue.get(ce%5);_!=null&&_.hand&&(_.hand.add(Fe),Fe.position.copy(dn),Fe.quaternion.identity()),Fe.visible=!0,Ae="held",wt()}function An(){for(const D of We.values())Pe.has(D.lineId)&&(Me.delete(`item:${D.lineId}`),yi(D));qn.material.opacity=0,Ae="handover";const _=ue.get(ce%5),I=Fe.position.clone(),y=Fe.quaternion.clone();if(ae||document.hidden||f){Dt();return}wn("bag-handover",1450,D=>{var V;const W=ln(Math.max(0,(D*1450-650)/800));lt.updateMatrixWorld(!0);const pe=_!=null&&_.hand?_.hand.localToWorld(dn.clone()):Xr;Fe.position.lerpVectors(I,pe,W),Fe.position.y+=Math.sin(W*Math.PI)*.16,Fe.quaternion.slerpQuaternions(y,((V=_==null?void 0:_.hand)==null?void 0:V.getWorldQuaternion(new it))??y,W)},Dt)}ci();const gn=new Hn(.36,.16,.008),Kt=document.createElement("canvas");Kt.width=384,Kt.height=576;const pt=Kt.getContext("2d");pt.fillStyle="#fff8e8",pt.fillRect(0,0,384,576),pt.fillStyle="#614b3b",pt.textAlign="center",pt.font="bold 36px Arial",pt.fillText(c?"SUNNY BITES":"SUNNY MARKET",192,62),pt.font="24px Arial",pt.fillText("YOUR RECEIPT",192,102),pt.strokeStyle="#c7b99e",pt.lineWidth=3;for(const _ of[139,206,246,286,326])pt.beginPath(),pt.moveTo(37,_),pt.lineTo(347,_),pt.stroke();pt.font="bold 31px Arial",pt.fillText("ORDER COMPLETE",192,185),pt.font="bold 47px Arial",pt.fillText("THANK YOU!",192,411),pt.font="25px Arial",pt.fillText("Have a lovely day",192,457);const Is=new Zs(Kt);Is.colorSpace=Wt;const li=new Gn({map:Is,toneMapped:!1}),xa=new en({color:16775400,roughness:.95}),Vt=new Ct(new Hn(.19,.27,.001),[xa,xa,xa,xa,li,li]);Vt.name="customer_receipt",Vt.visible=!1,Vt.castShadow=!0,lt.add(Vt);const Cu=new w(-.059,-.075,.038),zo=new Gn({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}),Bi=new Ct(new Hn(.9,.84,.88),zo);Bi.name="cash_register_touch_target",Bi.position.copy(Hc).add(new w(0,.34,.03)),lt.add(Bi);const Tr=new en({color:15196099,roughness:.75});function Ho(_){return Xn.find(I=>I.cents===_)??{cents:_,label:Eh(_),kind:_>=500?"note":"coin",color:_>=1e4?"#9bb99a":_>=5e3?"#e7c969":"#cbd2d7"}}const Ma=document.createElement("canvas");Ma.width=1024,Ma.height=600;const Ls=new Zs(Ma);Ls.colorSpace=Wt,Ls.flipY=!1;const Sa=new Gn({map:Ls,toneMapped:!1});function ba(_=ee){var Se,ke;const I=Qe=>`$${(Qe/100).toFixed(2)}`,y=_==null?void 0:_.order,D=(_==null?void 0:_.phase)??ne,W=(_==null?void 0:_.scanned)??[...Pe],pe=(Se=y==null?void 0:y.items)==null?void 0:Se.find(Qe=>Qe.lineId===W.at(-1));let V="READY TO SERVE",Q="WELCOME",le=c?"PLEASE PLACE FOOD ON THE TRAY":"PLEASE PLACE ITEMS ON THE BELT";D==="scan"?(V=pe?pe.name.toUpperCase():"SCANNER READY",Q=pe?I(pe.priceCents):"SCAN ITEM",le=`${W.length} / ${((ke=y==null?void 0:y.items)==null?void 0:ke.length)??0} ITEMS SCANNED`):D==="total"?(V="ALL ITEMS SCANNED",Q="ENTER TOTAL",le="ADD THE PRICES ON YOUR RECEIPT"):D==="payment"?(V="AMOUNT DUE",Q=I((y==null?void 0:y.totalCents)??0),le=`CASH OFFERED ${I((y==null?void 0:y.paidCents)??0)}`):D==="drawer"?(V="CASH RECEIVED",Q=I((y==null?void 0:y.paidCents)??0),le="PRESS OPEN TO RELEASE CASH DRAWER"):D==="change"?(V="COUNT THE CHANGE",Q="?",le="CHOOSE NOTES AND COINS"):D==="success"?(V="TRANSACTION APPROVED",Q="THANK YOU",le="CHANGE & RECEIPT • NEXT CUSTOMER"):D==="finished"&&(V="SHIFT ENDED",Q="TIME’S UP",le="THANK YOU FOR BEING OUR CASHIER");const _e=JSON.stringify([V,Q,le,D]);if(_e===St)return;St=_e,Mt=[V,Q,le];const de=Ma.getContext("2d");de.fillStyle=c?"#fff7e8":"#122624",de.fillRect(0,0,1024,600),de.fillStyle=c?"#efd5b5":"#1c3936",de.fillRect(0,0,1024,85),de.fillStyle=c?"#74513d":"#8bc6aa",de.font="600 31px Arial",de.textAlign="left",de.fillText(c?"SUNNY BITES  |  HELLO, FRIEND!":"SUNNY  |  CHECKOUT 01",44,54),de.fillStyle=c?"#8b9f73":"#68d5ae",de.beginPath(),de.arc(957,43,9,0,Math.PI*2),de.fill(),de.fillStyle=c?"#94745b":"#98b8af",de.font="600 36px Arial",de.fillText(V,45,160,934),de.fillStyle=c?"#644938":"#effff4",de.font=Q.length>9?"600 106px Arial":"600 133px Arial",de.fillText(Q,40,327),de.fillStyle=c?"#e4cbaa":"#28463e",de.fillRect(44,376,936,2),de.fillStyle=c?"#84664d":"#b9dace",de.font="500 29px Arial",de.fillText(le,45,447),de.fillStyle=c?"#9b8367":"#85a798",de.font="25px Arial",de.fillText(c?"A LITTLE CAFE     AUD PLAY MONEY":"TRAINING MODE     AUD     SECURE TILL",45,554),Ls.needsUpdate=!0,U++,wt()}ba();function tp(_){if(ht.has(_))return ht.get(_);const I=document.createElement("canvas");I.width=768,I.height=336;const y=I.getContext("2d"),D=Ho(_).color;y.fillStyle=D,y.fillRect(0,0,I.width,I.height),y.strokeStyle="rgba(255,255,255,.6)",y.lineWidth=8,y.strokeRect(18,18,732,300),y.fillStyle="rgba(255,255,255,.22)",y.beginPath(),y.ellipse(175,174,113,123,0,0,Math.PI*2),y.fill(),y.fillStyle="#254737",y.textAlign="left",y.font="bold 32px Arial",y.fillText("SUNNY MARKET",42,66),y.font="bold 138px Arial",y.fillText(Eh(_),42,235),y.font="bold 30px Arial",y.fillText("PLAY MONEY · AUD",42,292),y.textAlign="right",y.font="bold 52px Arial",y.fillText("AU",716,88),y.font="62px Arial",y.fillText("✦",713,243);const W=new Zs(I);W.colorSpace=Wt;const pe=new en({map:W,roughness:.77});return ht.set(_,pe),pe}function Vo(_){const I=tp(_),y=new Ct(gn,[Tr,Tr,Tr,Tr,I,I]);return y.castShadow=!0,y.userData.cents=_,y}function np(_){if(!pn.has(_)){const D=Ho(_),W={200:.04,100:.049,50:.061,20:.056,10:.046,5:.038}[_]??.045,pe=new gu(W,W,.008,_===50?12:40),V=document.createElement("canvas");V.width=V.height=256;const Q=V.getContext("2d");Q.fillStyle=D.color,Q.fillRect(0,0,256,256),Q.strokeStyle=_>=100?"#8c712b":"#7e8b90",Q.lineWidth=7,Q.beginPath(),Q.arc(128,128,110,0,Math.PI*2),Q.stroke(),Q.beginPath(),Q.arc(128,128,98,0,Math.PI*2),Q.lineWidth=2,Q.stroke(),Q.fillStyle=_>=100?"#53431a":"#354449",Q.textAlign="center",Q.font="bold 82px Arial",Q.fillText(D.label,128,150),Q.font="bold 24px Arial",Q.fillText("AU · PLAY",128,188);const le=new Zs(V);le.colorSpace=Wt;const _e=new en({map:le,roughness:.65,metalness:.12}),de=new en({color:D.color,roughness:.42,metalness:.5});pn.set(_,{geometry:pe,face:_e,edge:de,radius:W})}const I=pn.get(_),y=new Ct(I.geometry,[I.edge,I.face,I.face]);return y.castShadow=!0,y.userData.cents=_,y}function Ta(){fe.clear(),Te=[]}function Go(){Me.delete("change-handover"),lt.add(he),he.clear(),he.visible=!1,he.position.set(0,0,0),he.quaternion.identity(),he.scale.setScalar(1),j="none",we=null,Xe=[]}function Wo(){if(!Xe.length)return;const _=ue.get(ce%5);_!=null&&_.freeHand&&(_.freeHand.add(he),he.position.copy(Oe),he.quaternion.identity()),he.visible=!0,j="held",wt()}function Pu(_=!1){if(Go(),!Te.length)return;we=ie,j="handover";const I=ue.get(ce%5);rp(I,_||ae||document.hidden||f),lt.add(he),he.position.copy(fe.position),he.visible=!0;const y=[],D=he.position.clone();let W=0,pe=0;for(const{group:Q,...le}of Te){const _e=le.kind==="note",de=_e?W++:pe++;Xe.push(le),Q.updateMatrix();for(const[Se,ke]of[...Q.children].entries()){const Qe=ke.position.clone().applyMatrix4(Q.matrix);he.add(ke),ke.position.copy(Qe),y.push({mesh:ke,fromPosition:Qe,fromQuaternion:ke.quaternion.clone(),fromScale:ke.scale.clone(),position:_e?new w(-.005+de*.011+Se*.003,.025+de*.006,de*.003+Se*.0015):new w(.004+de%3*.039+Se*.003,-.044+Math.floor(de/3)*.043,.02+Se*.005),quaternion:new it().setFromEuler(new qt(_e?0:Math.PI/2,0,_e?(de-1)*.08:0)),scale:_e?new w(.64,.64,.12):new w(.45,.45,.45)})}}Ta();const V=Q=>{var de;const le=ln(Q);lt.updateMatrixWorld(!0);const _e=I!=null&&I.freeHand?I.freeHand.localToWorld(Oe.clone()):Xr.clone().add(new w(.5,0,0));he.position.lerpVectors(D,_e,le),he.position.y+=Math.sin(le*Math.PI)*.22,he.quaternion.slerpQuaternions(new it,((de=I==null?void 0:I.freeHand)==null?void 0:de.getWorldQuaternion(new it))??new it,le);for(const Se of y)Se.mesh.position.lerpVectors(Se.fromPosition,Se.position,le),Se.mesh.quaternion.slerpQuaternions(Se.fromQuaternion,Se.quaternion,le),Se.mesh.scale.lerpVectors(Se.fromScale,Se.scale,le)};_||ae||document.hidden||f?(V(1),Wo()):wn("change-handover",1100,V,Wo)}const qn=new Ct(new vu(.1,.15,32),new Gn({color:8711363,transparent:!0,opacity:0,depthWrite:!1,side:Zn}));qn.rotation.x=-Math.PI/2,qn.position.copy(Wr).add(new w(0,.018,0)),lt.add(qn);const ki=new Af(new Hn(.009,.004,.69),new en({color:6648947,roughness:.95}),17);ki.name="moving_conveyor_seams";const Er=new Ht;ki.receiveShadow=!0,ki.visible=!1,lt.add(ki);function Xo(_=0){for(let I=0;I<17;I++)Er.position.set(-2.95+(I*.155+_*.15)%2.635,1.029,-.1),Er.rotation.set(0,0,0),Er.scale.setScalar(1),Er.updateMatrix(),ki.setMatrixAt(I,Er.matrix);ki.instanceMatrix.needsUpdate=!0}Xo();const Ar=new m_,Iu=new ze,ip=new es(new w(0,1,0),-1.09),$o=new w;function wt(){!h&&!f&&!m&&(m=requestAnimationFrame(sp))}function wn(_,I,y,D,W=0){if(Me.delete(_),ae||f){y(1),D==null||D();return}Me.set(_,{start:performance.now()+W,duration:I,update:y,complete:D}),wt()}function Ea(_,I,y,D=700,W=0,pe){const V=I.position.clone();wn(_,D,Q=>{I.position.lerpVectors(V,y,ln(Q)),I.position.y+=Math.sin(Q*Math.PI)*W},pe)}function sp(_){var W;if(m=0,h||f)return;const I=ve&&!ae&&!document.hidden;if(_-p<30&&(Me.size||I||l.hasBelt&&(ne==="scan"||ne==="unload")&&!ae)){wt();return}p=_;for(const[pe,V]of[...Me]){if(_<V.start)continue;const Q=Math.min(1,(_-V.start)/V.duration);V.update(Q),Q===1&&Me.get(pe)===V&&(Me.delete(pe),(W=V.complete)==null||W.call(V))}const y=l.hasBelt&&g&&!ae&&(ne==="unload"||ne==="scan"&&[...We.values()].some(pe=>pe.group.visible));y&&Xo(_/1e3);const D=ue.get(ce%5);I&&zi(D,Yo(_)),D!=null&&D.arm&&ne==="unload"&&!ae&&D.arm.quaternion.copy(D.armRest).multiply(new it().setFromAxisAngle(new w(1,0,0),-.5-Math.sin(_/220)*.38)),d.render(lt,Zt),E++,(Me.size||y||I)&&wt()}function cs(){if(h)return;const _=Math.max(1,i.clientWidth),I=Math.max(1,i.clientHeight),y=_/I;d.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),d.setSize(_,I,!1),Zt.aspect=y,y<.92?(Zt.fov=71,Zt.position.set(-.22,2,3.35),Zt.lookAt(-.6,1.05,-.7)):(Zt.fov=60,Zt.position.set(0,1.9,2.65),Zt.lookAt(-.15,1.1,-.55)),Zt.updateProjectionMatrix(),Zt.updateMatrixWorld(),wt()}function wr(_,I,y=420,D=0){var le;if(!(_!=null&&_.arm))return;const W=_.arm.quaternion.clone(),pe=_.armRest.clone().multiply(new it().setFromAxisAngle(new w(1,0,0),I)),V=(le=_.hand)==null?void 0:le.quaternion.clone(),Q=_.handRest.clone().multiply(new it().setFromAxisAngle(new w(1,0,0),D));wn(`arm:${_.index}`,y,_e=>{const de=ln(_e);_.arm.quaternion.slerpQuaternions(W,pe,de),_.hand&&_.hand.quaternion.slerpQuaternions(V,Q,de)})}function rp(_,I=!1){var le;if(!(_!=null&&_.freeArm)||!_.freeHand)return;const y=_.freeArm.quaternion.clone(),D=_.freeHand.quaternion.clone(),W=(le=_.freeForearm)==null?void 0:le.quaternion.clone(),pe=_.freeArmRest.clone().multiply(new it().setFromAxisAngle(new w(1,0,0),-1.15)),V=_.freeHandRest.clone().multiply(new it().setFromAxisAngle(new w(1,0,0),1.15)),Q=_e=>{_.freeArm.quaternion.slerpQuaternions(y,pe,ln(_e)),_.freeHand.quaternion.slerpQuaternions(D,V,ln(_e)),_.freeForearm&&_.freeForearm.quaternion.slerpQuaternions(W,_.freeForearmRest,ln(_e))};I?Q(1):wn(`change-arm:${_.index}`,520,Q)}function ap(_){const I=_.head??_.rig,y=new Xt;y.name=`expression_${_.index}`,_.head&&(y.position.y=-_.head.position.y),I.add(y);const D=new en({color:c?4796449:3419175,roughness:.9}),W=new mu(c?.007:.0035,c?.065:.027,3,8),pe=[-1,1].map(yt=>{const mt=new Ct(W,D);return mt.position.set(yt*(c?.112:.043),c?1.786:1.681,c?_.index===3?.332:.3:.113),mt.rotation.z=Math.PI/2,y.add(mt),mt}),V=new Ct(new on,D);y.add(V);const Q=_.index===3?1.596:1.563,le=_.index===3?.409:.376,_e=new Xt;_e.name=`talking_mouth_${_.index}`,_e.position.set(0,Q-.017,le),_e.visible=!1,y.add(_e);const de=new Ct(new Zr(1,18,12),new en({color:5319466,roughness:.95}));de.scale.set(_.index===3?.029:.043,.027,.006),_e.add(de);const Se=new Ct(new Zr(1,16,10),new en({color:15507362,roughness:.92}));Se.position.set(0,-.015,.005),Se.scale.set(_.index===3?.017:.026,.01,.003),_e.add(Se);const ke=new Ct(new yu(1,.28,8,18),new en({color:13862018,roughness:.9}));ke.name=`kiss_mouth_${_.index}`,ke.position.set(0,Q-.009,le+.006),ke.scale.set(.015,.018,.006),ke.visible=!1,y.add(ke),_.rig.updateWorldMatrix(!0,!0);const Qe=_.rig.matrixWorld.clone().invert();_.rig.traverse(yt=>{var Ir,Ve,Qt,ui;if(!yt.isMesh||yt===V||pe.includes(yt)||yt===de||yt===Se||yt===ke)return;if(!c&&((Ve=(Ir=yt.material)==null?void 0:Ir.name)!=null&&Ve.includes("Produce pine"))){yt.visible=!1;return}if(!c||((Qt=yt.material)==null?void 0:Qt.name)!=="Cozy / ink")return;const mt=yt.geometry.clone(),Nt=mt.attributes.position,Rt=((ui=mt.index)==null?void 0:ui.array)??Array.from({length:Nt.count},(Rn,Ds)=>Ds),Pn=new st().multiplyMatrices(Qe,yt.matrixWorld),In=[],Bn=new w,xi=new w,Xi=new w;for(let Rn=0;Rn<Rt.length;Rn+=3)Bn.fromBufferAttribute(Nt,Rt[Rn]),xi.fromBufferAttribute(Nt,Rt[Rn+1]),Xi.fromBufferAttribute(Nt,Rt[Rn+2]),Bn.add(xi).add(Xi).multiplyScalar(1/3).applyMatrix4(Pn),(Bn.y>=1.595||Math.abs(Bn.x)>.07)&&In.push(Rt[Rn],Rt[Rn+1],Rt[Rn+2]);mt.setIndex(In),yt.geometry=mt});const Gt=[];if(c){let yt;const mt=`Cozy / fur_${l.customerKinds[_.index]}`;_.rig.traverse(Nt=>{var Rt;((Rt=Nt.material)==null?void 0:Rt.name)===mt&&(yt=Nt.material)}),(_.index===2||_.index===3)&&(yt=new en({color:_.index===2?16769463:16773855,roughness:.98}));for(const Nt of[-1,1]){const Rt=new Ct(new Zr(1,14,10),yt??new en({color:13283468}));Rt.position.set(Nt*.112,1.73,_.index===3?.351:.312),Rt.scale.set(.026,.035,.009),Rt.visible=!1,y.add(Rt),Gt.push(Rt)}}return{group:y,brows:pe,mouth:V,talkingMouth:_e,pucker:ke,lids:Gt,mood:null,smile:0,eyeClosure:0,mouthOpenness:0,facialPose:"emotion",reactionPose:null}}function Rr(_,I){if(_.expression){_.expression.currentEyeClosure=I;for(const y of _.expression.lids)y.visible=I>.1,y.scale.y=.035*I,y.position.y=1.765-.035*I}}function qo(_,I){if(!(_!=null&&_.expression))return;const y=_.expression,D=Xc[I]??Xc.happy;if(y.mood!==I){y.mood=I,y.smile=D.smile;const Q=c?_.index===3?.052:.073:.03,le=c?_.index===3?1.596:1.563:1.566,_e=c?_.index===3?.404:.37:.115,de=Array.from({length:17},(ke,Qe)=>{const Gt=Qe/8-1;return new w(Gt*Q,le+D.smile*(Gt*Gt-1)*(_.index===3&&c?.46:c?1:.45),_e-Math.abs(Gt)*(c?.012:.003))}),Se=new Ro(new kl(de),24,c?.005:.0026,6,!1);y.mouth.geometry.dispose(),y.mouth.geometry=Se}y.brows.forEach((Q,le)=>{const _e=le?1:-1;Q.position.y=(c?1.786:1.681)+D.lift*(c?1:.5)+(c&&_.index===2&&le===0?.014:0),Q.rotation.z=Math.PI/2-_e*D.brow*(c&&_.index===2&&le===0?1.55:1)});const W={calm:0,happy:0,restless:.3,impatient:.65,exhausted:1,relieved:.12,tired:.8}[I]??0,pe=I==="happy"||I==="relieved",V=c?[[W*.14-(pe?.028:0),0,0],[W*.04,0,W*.04],[W*.035,W*.055,pe?-.06:.06+W*.09],[W*.09-(pe?.045:0),0,-W*.025],[W*.035,-W*.035,pe?.045:-W*.08]][_.index]:[W*.07,0,0];_.headRest.copy(_.headNeutral).multiply(new it().setFromEuler(new qt(...V))),_.head&&!Me.has(`animal:${_.index}`)&&!Me.has("wrong-change")&&_.head.quaternion.copy(_.headRest),_.ears.forEach((Q,le)=>{const _e=le?1:-1,de=_.index===1?W*.74-(pe?.07:0):_.index===4?W*.34:W*.1;Q.rest.copy(Q.neutral).multiply(new it().setFromEuler(new qt(W*(_.index===1?.18:.06),0,_e*de))),Me.has(`animal:${_.index}`)||Q.object.quaternion.copy(Q.rest)}),y.eyeClosure=_.index===4&&c?W*.86:0,Rr(_,y.eyeClosure),zi(_,ve&&_.index===ce%5?y.mouthOpenness||.45:0);for(const Q of _.bodyRestScales)Q.object.scale.copy(Q.scale).multiply(new w(1+W*.004,1-W*(_.index===0?.017:.01),1))}function zi(_,I){if(!(_!=null&&_.expression))return;const y=_.expression,D=ve&&_.index===ce%5;y.mouthOpenness=D?Qi.clamp(I,.12,1):0,y.pucker.visible=y.reactionPose==="kiss"&&(!D||y.mouthOpenness<.3),y.talkingMouth.visible=D&&!y.pucker.visible,y.talkingMouth.scale.y=.3+y.mouthOpenness*.78,y.talkingMouth.scale.x=.85+y.mouthOpenness*.15,y.mouth.visible=!D&&!y.pucker.visible,y.facialPose=y.pucker.visible?"kiss":D?"talking":y.reactionPose??"emotion"}function Yo(_){const I=_-Ie,y=(Math.sin(I*.024)+Math.sin(I*.041+.7)*.35+1.35)/2.7,D=Ue?Math.max(0,1-(_-Ue)/150)*.22:0;return Qi.clamp(.13+y*.72+D,.12,1)}function ls(_={}){if(h)return;const I=!!_.active&&!f&&!document.hidden&&ie&&ne!=="finished";if(!(I&&l.customerKinds.includes(_.character)&&_.character!==l.customerKinds[ce%5])){if(!I){ve=!1,clearTimeout(xt),xt=null;for(const y of ue.values())zi(y,0);wt();return}ve||(Ie=performance.now(),Ue=0,at=0,_t=0,clearTimeout(xt),xt=setTimeout(()=>ls({active:!1}),15e3)),ve=!0,Number.isFinite(_.boundary)&&_.boundary>_t&&(_t=_.boundary,Ue=performance.now(),at++),zi(ue.get(ce%5),ae?.45:Yo(performance.now())),wt()}}function Hi(_="none"){clearTimeout(Z),Z=null,Me.delete("customer-reaction");for(const I of K)I.visible=!1;for(const I of ue.values())I.expression&&(I.expression.reactionPose=null,I.expression.mouth.scale.set(1,1,1),I.expression.mouth.position.set(0,0,0),Rr(I,I.expression.eyeClosure),zi(I,I.expression.mouthOpenness));Re.status=_,_==="none"&&(Re={kind:null,status:_,symbolKinds:[],startedAt:0})}function Lu(_=$==="tired"||$==="exhausted"?"smile":VS[ce%5],I=0){if(h||!ie||!["smile","kiss","hearts","thumbs-up"].includes(_))return;Hi();const y=ue.get(ce%5);if(!(y!=null&&y.expression)||!y.group.visible)return;if(document.hidden||f){Re.status="complete";return}const D=ae,W=_==="kiss"||_==="hearts"?["hearts"]:_==="thumbs-up"?["thumbs-up"]:[];Re={kind:_,status:D?"static":"playing",symbolKinds:W,startedAt:performance.now()};const pe=W.length?K.filter((le,_e)=>W[0]==="thumbs-up"?_e===4:_e<3):[],V=new w;D?(y.expression.reactionPose=_==="kiss"?"kiss":"smile",zi(y,y.expression.mouthOpenness),Z=setTimeout(()=>{Hi("complete"),wt()},1400),wt()):wn("customer-reaction",1400,le=>{const _e=Math.sin(Math.PI*le);if(y.expression.reactionPose=_==="kiss"&&le>.12&&le<.65?"kiss":"smile",y.expression.mouth.scale.x=1+_e*(y.index===0?.22:.12),y.expression.mouth.position.y=-_e*.005,!ve){const de=_==="kiss"?_e**2*.95:y.index===2?_e**2*.8:y.index===3?_e*.22:_e*.45;Rr(y,Math.max(y.expression.eyeClosure,de)),y.index===2&&y.expression.lids[1]&&(y.expression.lids[1].visible=!1)}zi(y,y.expression.mouthOpenness),y.group.updateWorldMatrix(!0,!1),y.group.localToWorld(V.set(0,1.96,.36)),pe.forEach((de,Se)=>{const ke=Qi.clamp((le-Se*.1)/.8,0,1);de.visible=ke>0&&ke<1,de.position.copy(V).add(new w(W[0]==="thumbs-up"?.25:(Se-1)*.17+Math.sin(ke*Math.PI)*(Se%2?.045:-.045),ke*.34,0)),de.material.opacity=Math.min(1,ke*5,(1-ke)*4),de.material.rotation=Math.sin(ke*Math.PI*2+Se)*.14,de.scale.setScalar((W[0]==="thumbs-up"?.27:.15+Se*.025)*(.75+Math.sin(ke*Math.PI)*.25))})},()=>Hi("complete"),I),wt()}function Aa(_,I=!1){var D;if(h||!Object.hasOwn(Xc,_))return;const y=ue.get(ce%5);$===_&&((D=y==null?void 0:y.expression)==null?void 0:D.mood)===_||(En(),$=_,qo(y,_),!I&&!["success","finished"].includes(ne)&&Pr(Object.hasOwn(Wc,_)?_:"calm"),Fn(),wt())}function Cr(_){var D;if(!_)return;const I=`animal:${_.index}`,y=Me.get(I);y&&(y.update(1),(D=y.complete)==null||D.call(y),Me.delete(I))}function Du(_,I){if(!c||!_)return;En(),Cr(_),Me.delete(`patience:${_.index}`);const y=I==="greeting"?"greetingStatus":"thanksStatus",D=ae||document.hidden||f;_[y]=D?"static":"playing";const W=_.rigRestPosition.y,pe=V=>{const Q=Math.sin(Math.PI*V),le=Math.sin(V*Math.PI*5)*Q;_.rig.position.y=W+Q*Q*(I==="greeting"?.035:$==="tired"?.012:$==="relieved"?.035:.085),I==="greeting"&&_.freeArm&&_.freeArm.quaternion.copy(_.freeArmRest).multiply(new it().setFromEuler(new qt(-.95*Q,0,.12*Q+.1*le))),I==="greeting"&&_.freeForearm&&_.freeForearm.quaternion.copy(_.freeForearmRest).multiply(new it().setFromAxisAngle(new w(1,0,0),-.85*Q)),_.head&&_.head.quaternion.copy(_.headRest).multiply(new it().setFromEuler(new qt((I==="thanks"?.18:.05)*Q,0,I==="greeting"?.05*le:0)));for(const[_e,de]of _.ears.entries())de.object.quaternion.copy(de.rest).multiply(new it().setFromAxisAngle(new w(0,0,1),le*(_e?-.16:.16)));if(V===1){_.rig.position.copy(_.rigRestPosition),I==="greeting"&&_.freeArm&&_.freeArm.quaternion.copy(_.freeArmRest),I==="greeting"&&_.freeForearm&&_.freeForearm.quaternion.copy(_.freeForearmRest),_.head&&_.head.quaternion.copy(_.headRest);for(const _e of _.ears)_e.object.quaternion.copy(_e.rest)}};D?pe(1):wn(`animal:${_.index}`,I==="greeting"?1e3:740,pe,()=>{_[y]="complete"}),wt()}function wa(_){var de,Se,ke,Qe;if(h)return;if(En(),Me.delete("wrong-change"),(de=se.restore)==null||de.call(se),se={direction:null,status:"none",restore:null},!_||ne!=="change"){Fn(),wt();return}const I=["too-little","under","low"].includes(_)?"too-little":["too-much","over","high"].includes(_)?"too-much":null,y=ue.get(ce%5);if(!I||!y)return;Cr(y);const D=Me.get(`patience:${y.index}`);D==null||D.update(1),Me.delete(`patience:${y.index}`);const W=(Se=y.head)==null?void 0:Se.quaternion.clone(),pe=(ke=y.freeArm)==null?void 0:ke.quaternion.clone(),V=(Qe=y.freeForearm)==null?void 0:Qe.quaternion.clone(),Q=()=>{W&&y.head.quaternion.copy(W),pe&&y.freeArm.quaternion.copy(pe),V&&y.freeForearm.quaternion.copy(V)},le=ae||document.hidden||f;se={direction:I,status:le?"static":"playing",restore:Q};const _e=Gt=>{const yt=Math.sin(Math.PI*Gt);W&&y.head.quaternion.copy(W).multiply(new it().setFromEuler(new qt(0,Math.sin(Gt*Math.PI*6)*yt*.13,0))),pe&&y.freeArm.quaternion.copy(pe).multiply(new it().setFromEuler(new qt(-.34*yt,0,.12*yt))),V&&y.freeForearm.quaternion.copy(V).multiply(new it().setFromAxisAngle(new w(1,0,0),-.35*yt)),Gt===1&&Q()};le?_e(.5):wn("wrong-change",1e3,_e,()=>{se.status="complete"}),Fn(),wt()}function Pr(_,I=!1){if(h)return;const y=Object.hasOwn(Wc,_)&&!["success","finished"].includes(ne)?_:"calm";if(["success","finished"].includes(ne)||Aa(y==="calm"?"happy":y,!0),y===De)return;wa(null),De=y;const D=ue.get(ce%5);if(!(D!=null&&D.freeArm)||!D.freeForearm)return;Cr(D);const W=Wc[y],pe=Se=>({arm:D.freeArmRest.clone().multiply(new it().setFromEuler(new qt(Se[0]*(c&&D.index===3?.72:1),0,Se[1]+(c&&D.index===3?Math.abs(Se[0])*.9:c&&D.index===2?Se[1]:0)))),forearm:D.freeForearmRest.clone().multiply(new it().setFromAxisAngle(new w(1,0,0),Se[2]*(c&&D.index===4?.55:1)))}),V={arm:D.freeArm.quaternion.clone(),forearm:D.freeForearm.quaternion.clone()},Q=pe(W.peak),le=pe(W.settled),_e=`patience:${D.index}`,de=(Se,ke,Qe)=>{D.freeArm.quaternion.slerpQuaternions(Se.arm,ke.arm,Qe),D.freeForearm.quaternion.slerpQuaternions(Se.forearm,ke.forearm,Qe)};Me.delete(_e),I||ae||document.hidden||f?de(le,le,1):wn(_e,W.duration,Se=>{y==="calm"?de(V,le,ln(Se)):Se<.42?de(V,Q,ln(Se/.42)):Se<.6?de(Q,Q,1):de(Q,le,ln((Se-.6)/.4))}),wt()}function Nu(){var _;if(!document.hidden){Fn();return}ls({active:!1}),Hi("complete"),En();for(const[I,y]of Me)!I.startsWith("patience:")&&!I.startsWith("animal:")&&I!=="wrong-change"||(y.update(1),(_=y.complete)==null||_.call(y),Me.delete(I))}function op(_,I){En(),ls({active:!1}),Hi(),ge=null,xe=!1;const y=new Map;y.set(_%5,FS);for(let D=1;D<=2;D++)y.set((_+D)%5,BS[D-1]);for(const[D,W]of ue){Me.delete(`person:${D}`),Me.delete(`depart:${D}`),Me.delete(`patience:${D}`),Me.delete(`arm:${D}`),Me.delete(`change-arm:${D}`),Cr(W),W.greetingStatus="none",W.thanksStatus="none",qo(W,"happy"),W.rig.position.copy(W.rigRestPosition),W.freeArm&&W.freeArm.quaternion.copy(W.freeArmRest),W.freeForearm&&W.freeForearm.quaternion.copy(W.freeForearmRest),W.group.rotation.set(0,0,0);const pe=y.get(D);if(!pe){W.group.visible=!1;continue}const V=W.group.visible;W.group.visible=!0,I&&V?Ea(`person:${D}`,W.group,pe,900,0):W.group.position.copy(pe),W.arm&&W.arm.quaternion.copy(W.armRest),W.hand&&W.hand.quaternion.copy(W.handRest),W.freeHand&&W.freeHand.quaternion.copy(W.freeHandRest)}}function cp(_=1850){if(ge===ce)return;ge=ce;const I=ue.get(ce%5);if(!I)return;if(ae||document.hidden||f){I.group.visible=!1,B="departed",Ae="departed",we&&(j="departed");return}const y=I.group.position.clone(),D=I.group.rotation.y,W=Gc.clone().sub(y).setY(0).normalize(),pe=Math.atan2(W.x,W.z);wn(`depart:${I.index}`,_,V=>{const Q=Math.max(0,(V-.2)/.8);xe=Q>0,I.group.rotation.y=Qi.lerp(D,pe,ln(Math.min(1,V/.2))),I.group.position.lerpVectors(y,Gc,ln(Q)),Q>0&&(I.group.position.y+=Math.sin(Q*Math.PI*10)*.012)},()=>{I.group.visible=!1,B="departed",Ae="departed",we&&(j="departed")})}function Ko(){clearTimeout(J),J=null,Me.delete("receipt-handover"),lt.add(Vt),Vt.visible=!1,Vt.position.set(0,0,0),Vt.quaternion.identity(),M&&(M.visible=!1,M.position.copy(N)),B="none",H=null,te=null,Y=0}function Ra(){const _=ue.get(ce%5);M&&(M.visible=!1),_!=null&&_.hand?(_.hand.add(Vt),Vt.position.copy(Cu),Vt.quaternion.identity(),H="customer"):(lt.add(Vt),Vt.position.copy(Xr),H="cashier"),Vt.visible=!0,B="held",wt()}function Uu(_=1550,I=1850){clearTimeout(J);const y=ie;J=setTimeout(()=>{var D;if(J=null,!(h||ne!=="success"||ie!==y||te!==y)){for(const W of["receipt-handover","change-handover","bag-handover"])(D=Me.get(W))==null||D.update(1),Me.delete(W);Ra(),Wo(),Dt(),cp(I),wt()}},Math.max(0,_))}function lp(){Ko(),te=ie,Y=performance.now(),B="printing",H="printer";const _=ue.get(ce%5),I=ae||document.hidden||f;wr(_,-1.15,520,1.15),M&&(M.visible=!0,M.position.copy(N)),lt.updateMatrixWorld(!0);const y=M?new Un().setFromObject(M).getCenter(new w):Hc.clone().add(new w(-.245,.34,.139)),D=new it().setFromEuler(new qt(-.16,0,-.07));I?Ra():wn("receipt-handover",1450,W=>{const pe=W*1450;if(pe<650){M&&M.position.copy(N).add(new w(0,-.055*(1-pe/650),0));return}M&&(M.visible=!1),Vt.visible=!0,B="handover",H="cashier";const V=ln((pe-650)/800);lt.updateMatrixWorld(!0);const Q=_!=null&&_.hand?_.hand.localToWorld(Cu.clone()):Xr,le=_!=null&&_.hand?_.hand.getWorldQuaternion(new it):new it;Vt.position.lerpVectors(y,Q,V),Vt.position.y+=Math.sin(V*Math.PI)*.2,Vt.quaternion.slerpQuaternions(D,le,V)},Ra),Uu()}function Ou(){for(const _ of We.values())Cs.remove(_.group),_.hit.geometry.dispose();We.clear();for(const _ of[...Me.keys()])(_.startsWith("item:")||_.startsWith("unload:"))&&Me.delete(_);et=null,F=null,zt.style.cursor="default"}function Ca(){if(!(Ge||h||ne!=="unload")){Ge=!0,Ee=!1,clearTimeout(qe),qe=null;for(const _ of We.values())Me.delete(`unload:${_.lineId}`),_.group.position.copy(_.home),_.group.visible=!Pe.has(_.lineId);wr(ue.get(ce%5),0),wt(),r==null||r()}}function up(){clearTimeout(qe),qe=null,Ee=!1;for(const _ of We.values())Me.delete(`unload:${_.lineId}`),_.group.position.copy(_.home),_.group.visible=!Pe.has(_.lineId);wr(ue.get(ce%5),0)}function Pa(_,I,y,D,W,pe=!0){clearTimeout(qe),qe=null,Ko(),Go(),mn(),wa(null),Me.delete("change-handover"),ie=_,De="calm",$="happy",ce=Number.isInteger(y)?y:0,Pe=new Set(I),Ge=!1,Ee=D,me="",G.visible=!1,lt.add(G),k.visible=!1,k.clear(),Me.delete("accepted-payment"),Ta(),Ou(),op(ce,W);const V=Array.isArray(_)?_:(_==null?void 0:_.items)??[];V.forEach((Q,le)=>{const _e=oe.get(Q.productId??Q.product??Q.type);if(!_e)return;const de=Q.lineId??Q.id??String(le),Se=_e.clone(!0);Se.position.set(0,0,0),Se.updateMatrixWorld(!0);const ke=new Un().setFromObject(Se),Qe=ke.getCenter(new w);Se.position.sub(new w(Qe.x,ke.min.y,Qe.z));const Gt=new Xt;Gt.add(Se);const yt={apple:.44,orange:.44,milk:.46,bread:.55,bananas:.55,eggs:.55};Gt.scale.setScalar(c?1:yt[Q.productId]??.5);const mt=new Xt;mt.name=`order_${de}`,mt.userData.lineId=de,mt.add(Gt);const Nt=ke.getSize(new w).multiplyScalar(Gt.scale.x),Rt=new Ct(new Hn(Nt.x+.055,Nt.y+.04,Nt.z+.055),zo);Rt.position.y=Nt.y/2,Rt.name=`touch_target_${de}`,mt.add(Rt);const Pn=new w(-.64-le*.5,1.038,-.08+le%2*.1);if(mt.rotation.y=le%2?.1:-.12,mt.position.copy(Pn),mt.visible=!Pe.has(de),Cs.add(mt),We.set(de,{lineId:de,productId:Q.productId,group:mt,visual:Gt,home:Pn,hit:Rt}),Pe.has(de)&&yi(We.get(de)),D&&!Pe.has(de)&&!ae&&!f&&g){mt.visible=!1;const In=new w(-.4,1.15,-.67),Bn=c?Pn.clone():Pn.clone().add(new w(-.38,0,0));wn(`unload:${de}`,1e3,xi=>{if(mt.visible=!0,xi<.56){const Xi=ln(xi/.56);mt.position.lerpVectors(In,Bn,Xi),mt.position.y+=Math.sin(Xi*Math.PI)*.38}else mt.position.lerpVectors(Bn,Pn,ln((xi-.56)/.44))},void 0,le*220)}}),D&&(pe&&Du(ue.get(ce%5),"greeting"),ae||!g||f||v?queueMicrotask(Ca):qe=setTimeout(Ca,Math.max(0,V.length-1)*220+1080)),wt()}function dp(_,I=[],y=0){ne="scan",Pa(_,I,y,!1,ie!==null&&y>ce),Ia(_),ba({order:_,scanned:I,phase:ne})}function Fu(_=[]){const I=new Set(_);if([...Pe].some(y=>!I.has(y))){Pa(ie,_,ce,!1,!1);return}for(const[y,D]of We){if(!I.has(y)||Pe.has(y))continue;et===y&&Da(null),Me.delete(`unload:${y}`);const W=D.group.position.clone();D.group.scale.setScalar(1),wn(`item:${y}`,850,pe=>{if(pe<.52){const V=ln(pe/.52);D.group.position.lerpVectors(W,Wr,V),D.group.position.y+=Math.sin(V*Math.PI)*.14,qn.material.opacity=Math.sin(V*Math.PI)*.85}else{const V=ln((pe-.52)/.48);D.group.position.lerpVectors(Wr,Vc.clone().add(new w(0,.32,0)),V),D.group.position.y+=Math.sin(V*Math.PI)*.38,D.group.scale.setScalar(1-V*.38),qn.material.opacity=0}},()=>{yi(D),qn.material.opacity=0})}Pe=I,ba({...ee,order:ie,scanned:_,phase:ne}),wt()}function hp(){if(!b)return;b.updateWorldMatrix(!0,!0);const _=b.matrixWorld.clone().invert(),I=new w,y=new w,D=new w;b.traverse(W=>{var de;if(!W.isMesh||!((de=W.geometry)!=null&&de.attributes.position))return;const pe=W.geometry,V=pe.attributes.position;pe.index||pe.setIndex(Array.from({length:V.count},(Se,ke)=>ke));const Q=pe.index.array.slice(),le=new Uint16Array(Q.length/3),_e=new st().multiplyMatrices(_,W.matrixWorld);for(let Se=0;Se<Q.length;Se+=3){I.fromBufferAttribute(V,Q[Se]),y.fromBufferAttribute(V,Q[Se+1]),D.fromBufferAttribute(V,Q[Se+2]),I.add(y).add(D).multiplyScalar(1/3).applyMatrix4(_e);const ke=I.z<.04?kS:zS,[Qe]=ke.reduce((Gt,yt)=>Math.abs(I.x-yt[1])<Math.abs(I.x-Gt[1])?yt:Gt);le[Se/3]=Qe,X.set(Qe,(X.get(Qe)??0)+1)}S.push({geometry:pe,indices:Q,triangleDenominations:le})}),$t="",Ia()}function Ia(_=ee??ie){Ft=ta(_).map(D=>D.cents),P=Uo(_).map(D=>D.cents);const I=Ft.join(",");if(I===$t)return;$t=I;const y=new Set(Ft);re.clear();for(const{geometry:D,indices:W,triangleDenominations:pe}of S){const V=D.index.array;let Q=0;for(let le=0;le<pe.length;le++){if(!y.has(pe[le]))continue;const _e=le*3;V[Q++]=W[_e],V[Q++]=W[_e+1],V[Q++]=W[_e+2];const de=pe[le];re.set(de,(re.get(de)??0)+1)}D.index.needsUpdate=!0,D.setDrawRange(0,Q)}}function us(_){if(Ia(),Be=_,b&&(b.visible=_),!be||!Tt)return;const I=Tt.clone().add(new w(0,0,_?rt:0));if(be.position.distanceToSquared(I)<1e-6){Me.delete("drawer"),be.position.copy(I);return}Ea("drawer",be,I,470)}function La(_=[]){const I=new Map;for(const V of _)I.set(V,(I.get(V)??0)+1);const y=[...I].sort((V,Q)=>Q[0]-V[0]),D=y.map(([V,Q])=>`${V}:${Q}`).join(",");if(me===D&&(!_.length||fe.children.length))return;me=D,Ta(),fe.position.copy(u).add(new w(0,.018,0)),fe.scale.setScalar(1);let W=0,pe=0;y.forEach(([V,Q])=>{const le=Ho(V),_e=new Xt;_e.name=`selected_${V}_x${Q}`,le.kind==="note"?(_e.position.set(-.097+W*.009,W*.006,-.025+W*.013),W++):(_e.position.set(.061+pe%3*.05,0,-.047+Math.floor(pe/3)*.08),pe++);const de=Math.min(Q,3);for(let Se=0;Se<de;Se++){const ke=le.kind==="note"?Vo(V):np(V);le.kind==="note"?(ke.rotation.x=-Math.PI/2,ke.scale.set(.4,.4,.09),ke.position.set(Se*.004,.001+Se*.0018,Se*-.004)):(ke.scale.setScalar(.34),ke.position.set(Se*.002,.0015+Se*.003,Se*-.002)),_e.add(ke)}fe.add(_e),Te.push({cents:V,count:Q,totalCents:V*Q,label:le.label,kind:le.kind,color:le.color,representativeCount:de,group:_e})})}function Bu(){Cr(ue.get(ce%5)),G.clear();const _=Vo((ie==null?void 0:ie.paidCents)??1e3);_.userData.action="accept-payment",G.add(_),G.visible=!0,G.scale.set(.28/.36,.12/.16,.001/.008);const I=ue.get(ce%5);I!=null&&I.hand?(I.hand.add(G),G.rotation.set(0,0,0),G.position.set(-.104,-.022,.038)):(lt.add(G),G.rotation.set(-.25,.1,-.1),G.position.copy(Xr)),wr(I,-1.15,550,1.15)}function fp(){k.clear(),G.visible&&(k.add(Vo((ie==null?void 0:ie.paidCents)??1e3)),G.getWorldPosition(k.position),G.getWorldQuaternion(k.quaternion),G.getWorldScale(k.scale),k.visible=!0,Ea("accepted-payment",k,new w(.65,1.08,.65),550,.14,()=>{k.visible=!1})),G.visible=!1,wr(ue.get(ce%5),-.1)}function pp(_){if(h||!_)return;ee=_,Ia(_);const I=ne,y=ie!==_.order,D=y&&ie!==null&&_.round>ce;if((y||I!==_.phase)&&En(),ne=_.phase,y?(Pa(_.order,_.scanned??[],_.round??0,ne==="unload",D),us(ne==="change")):(I==="unload"&&ne!=="unload"&&up(),Fu(_.scanned??[])),ne==="payment"&&(I!=="payment"||y)&&Bu(),ne==="drawer"&&(I!=="drawer"||y)&&(us(!1),fp()),ne==="change"&&(La(_.selectedMoney??[]),(I!=="change"||y)&&us(!0)),ne!=="change"&&se.direction&&wa(null),ne==="success"&&(I!=="success"||y)){const W=De==="exhausted"?"tired":De==="calm"?"happy":"relieved";Pr("calm"),Aa(W),us(!1),Du(ue.get(ce%5),"thanks"),Lu(void 0,650),La(_.selectedMoney??[]),Pu(),lp(),An()}ne!=="payment"&&(G.visible=!1),["change","success"].includes(ne)||Ta(),!["change"].includes(ne)&&Be&&us(!1),ne==="finished"&&(ls({active:!1}),Hi(),Pr("calm"),us(!1),G.visible=!1,Ko(),Go(),Me.delete("bag-handover"),Fe.visible=!1),ba(_),Fn(),wt()}function mp(){wt()}function ku(_){const I=zt.getBoundingClientRect();Iu.set((_.clientX-I.left)/I.width*2-1,-((_.clientY-I.top)/I.height)*2+1),Ar.setFromCamera(Iu,Zt),lt.updateMatrixWorld(!0)}function jo(_){if(!g||f)return null;if(ku(_),ne==="payment"&&G.visible&&Ar.intersectObject(G,!0).length)return{action:"payment"};if(ne==="drawer"&&be&&Ar.intersectObject(Bi,!1).length)return{action:"drawer"};if(ne!=="scan")return null;const I=[...We.values()].filter(W=>W.group.visible&&!Pe.has(W.lineId)).map(W=>W.group),y=Ar.intersectObjects(I,!0)[0];let D=y==null?void 0:y.object;for(;D&&D.userData.lineId===void 0;)D=D.parent;return D?{action:"scan",lineId:D.userData.lineId}:null}function Da(_){if(et===_)return;const I=We.get(et);I&&!Me.has(`item:${et}`)&&I.group.scale.setScalar(1),et=_,!ae&&We.has(_)&&We.get(_).group.scale.setScalar(1.04),wt()}function gp(_){var y;const I=jo(_);F=I?{...I,x:_.clientX,y:_.clientY,dragging:!1}:null,(F==null?void 0:F.action)==="scan"&&((y=zt.setPointerCapture)==null||y.call(zt,_.pointerId))}function _p(_){if((F==null?void 0:F.action)==="scan"&&ne==="scan"&&(Math.hypot(_.clientX-F.x,_.clientY-F.y)>8&&(F.dragging=!0),F.dragging)){ku(_);const y=We.get(F.lineId);y&&Ar.ray.intersectPlane(ip,$o)&&(y.group.position.set(Qi.clamp($o.x,-2.9,1.1),1.085,Qi.clamp($o.z,-.5,.6)),qn.material.opacity=y.group.position.distanceTo(Wr)<.43?.9:.28,wt());return}const I=jo(_);Da((I==null?void 0:I.lineId)??null),zt.style.cursor=I?"pointer":"default"}function vp(_){var y;const I=F;if(F=null,!!I){if((y=zt.releasePointerCapture)==null||y.call(zt,_.pointerId),qn.material.opacity=0,I.action==="scan"&&I.dragging){const D=We.get(I.lineId);(D==null?void 0:D.group.position.distanceTo(Wr))<.43?t==null||t(I.lineId):D&&Ea(`item:${I.lineId}`,D.group,D.home,270)}else if(Math.hypot(_.clientX-I.x,_.clientY-I.y)<10){const D=jo(_);(D==null?void 0:D.action)==="payment"&&I.action==="payment"&&(a==null||a()),(D==null?void 0:D.action)==="drawer"&&I.action==="drawer"&&(o==null||o()),(D==null?void 0:D.action)==="scan"&&D.lineId===I.lineId&&(t==null||t(I.lineId))}wt()}}function yp(){if(F!=null&&F.lineId){const _=We.get(F.lineId);_&&!Pe.has(_.lineId)&&_.group.position.copy(_.home)}F=null,qn.material.opacity=0,wt()}function xp(){F||Da(null)}function Mp(_){_.preventDefault(),f=!0,ls({active:!1}),Hi("complete"),En(),m&&cancelAnimationFrame(m),m=0,zt.dataset.ready="false",s==null||s(new Error("The 3D view paused. Cashier controls still work while it reconnects.")),ne==="unload"&&queueMicrotask(Ca)}function Sp(){if(h)return;f=!1,Me.clear();const _=ie,I=[...Pe],y=ce,D=ne,W=De,pe=$,V=ue.get(y%5),Q=V==null?void 0:V.greetingStatus,le=V==null?void 0:V.thanksStatus,_e=Y?performance.now()-Y:0,de=V==null?void 0:V.group.position.clone(),Se=V==null?void 0:V.group.rotation.clone(),ke=V==null?void 0:V.group.visible,Qe=te===ie&&B!=="none";_&&Pa(_,I,y,D==="unload",!1,!1),V&&(V.greetingStatus=Q==="playing"?"complete":Q,V.thanksStatus=le==="playing"?"complete":le),ne=D,Pr(W,!0),Aa(pe,!0),ne==="payment"&&Bu(),ne==="change"&&La((ee==null?void 0:ee.selectedMoney)??[]),us(ne==="change"),ne==="success"&&Qe&&(te=_,Y=performance.now()-_e,V!=null&&V.arm&&V.arm.quaternion.copy(V.armRest).multiply(new it().setFromAxisAngle(new w(1,0,0),-1.15)),V!=null&&V.hand&&V.hand.quaternion.copy(V.handRest).multiply(new it().setFromAxisAngle(new w(1,0,0),1.15)),Ra(),Dt(),La((ee==null?void 0:ee.selectedMoney)??[]),Pu(!0),V&&de&&(V.group.position.copy(de),V.group.rotation.copy(Se),V.group.visible=ke&&_e<3400),!(V!=null&&V.group.visible)||_e>=3400?(B="departed",Ae="departed",we&&(j="departed")):Uu(Math.max(0,1550-_e),Math.max(1,3400-Math.max(1550,_e)))),Ls.needsUpdate=!0,cs(),zt.dataset.ready=String(g),g&&!v&&(n==null||n({recovered:!0,...Jo()})),Fn()}function zu(_){var I;if(ae=_.matches,En(),ae){for(const y of Me.values())y.update(1),(I=y.complete)==null||I.call(y);Me.clear(),ne==="unload"&&queueMicrotask(Ca),Xo(),Da(null)}ve&&zi(ue.get(ce%5),ae?.45:Yo(performance.now())),wt(),Fn()}function Vi(_){lt.updateMatrixWorld(!0);const I=new Un().setFromObject(_).getCenter(new w).project(Zt),y=zt.getBoundingClientRect();return{screenX:y.left+(I.x+1)*y.width/2,screenY:y.top+(1-I.y)*y.height/2}}function Gi(_){_.updateWorldMatrix(!0,!0);const I=new Un().setFromObject(_);return{min:I.min.toArray(),max:I.max.toArray()}}function bp(){if(!be||!L)return null;lt.updateMatrixWorld(!0);const _=zt.getBoundingClientRect(),I=[[-.38,.17,.12],[-.38,.46,-.1],[-.3,.1,.28],[0,.1,.29],[.3,.24,.15]];let y=null;for(const D of I){const W=L.localToWorld(new w(...D)).project(Zt),pe=_.left+(W.x+1)*_.width/2,V=_.top+(1-W.y)*_.height/2,Q=pe>=_.left&&pe<=_.right&&V>=_.top&&V<=_.bottom&&document.elementFromPoint(pe,V)===zt,le={screenX:pe,screenY:V,blockedByOverlay:!Q};if(y??(y=le),Q)return le}return y}function Tp(){c&&L.traverse(_=>{if(!_.isMesh)return;for(let y=_;y;y=y.parent)if(y===b)return;const I=y=>{const D=US[y.name];if(!D)return y;if(!$e.has(y)){const W=y.clone();W.color.set(D),W.roughness=y.name.includes("spring steel")?.48:.78,W.metalness=y.name.includes("spring steel")?.22:.03,$e.set(y,W),He.add(y)}return $e.get(y)};_.material=Array.isArray(_.material)?_.material.map(I):I(_.material)})}function Jo(){var V,Q,le,_e,de,Se,ke,Qe,Gt,yt,mt,Nt,Rt,Pn,In,Bn,xi,Xi,Ir;const _=Vt.visible&&(()=>{for(let Ve=Vt.parent;Ve;Ve=Ve.parent)if(!Ve.visible)return!1;return!0})(),I=he.visible&&(()=>{for(let Ve=he.parent;Ve;Ve=Ve.parent)if(!Ve.visible)return!1;return!0})(),y=ue.get(ce%5),D=Fe.visible&&(()=>{for(let Ve=Fe.parent;Ve;Ve=Ve.parent)if(!Ve.visible)return!1;return!0})(),W=y?Gc.clone().sub(y.group.position).setY(0).normalize():new w,pe=(y==null?void 0:y.group.getWorldDirection(new w))??new w(0,0,1);return{status:h?"disposed":f?"context-lost":v?"degraded":g?"ready":"loading",loaded:g,sceneId:e,phase:ne,patienceMood:De,viewMode:"first-person",cameraType:Zt.type,cameraPosition:Zt.position.toArray(),theme:{id:l.theme,lighting:c?"soft-golden":"daylight",lcdBackground:c?"#fff7e8":"#122624",registerPalette:Object.fromEntries([...$e].map(([Ve,Qt])=>[Ve.name,`#${Qt.color.getHexString()}`])),cashTrayPalette:[Je,Ke].map(Ve=>`#${Ve.color.getHexString()}`)},triangles:d.info.render.triangles,drawCalls:d.info.render.calls,geometries:d.info.memory.geometries,textures:d.info.memory.textures,renderedFrames:E,renderLoopActive:!!m&&!h&&!f&&!document.hidden,modelSources:l.sources.map(yo),productModels:[...oe.keys()],humanModels:c?0:ue.size,customerModels:ue.size,customerKinds:[...l.customerKinds],currentCustomerKind:l.customerKinds[ce%5],conveyorVisible:ki.visible,greetingAnimation:{status:((V=ue.get(ce%5))==null?void 0:V.greetingStatus)??"none",active:((Q=ue.get(ce%5))==null?void 0:Q.greetingStatus)==="playing"},thankYouAnimation:{status:((le=ue.get(ce%5))==null?void 0:le.thanksStatus)??"none",active:((_e=ue.get(ce%5))==null?void 0:_e.thanksStatus)==="playing"},register:{loaded:!!(L&&O&&be),modelSource:yo(l.sources[3]),position:(L==null?void 0:L.position.toArray())??null,displayLines:[...Mt],displayRevision:U,receiptVisible:!!(M!=null&&M.visible||_)},receipt:{status:B,holder:H,visible:!!(M!=null&&M.visible||_),orderId:(te==null?void 0:te.id)??null,attachedToHand:Vt.parent===((de=ue.get(ce%5))==null?void 0:de.hand),handLocalPosition:Vt.parent===((Se=ue.get(ce%5))==null?void 0:Se.hand)?Vt.position.toArray():null,worldBounds:_?Gi(Vt):M!=null&&M.visible?Gi(M):null,..._?Vi(Vt):M!=null&&M.visible?Vi(M):{}},takeawayBag:{status:Ae,holder:Fe.parent===(y==null?void 0:y.hand)?"customer":Ae==="handover"?"cashier":"counter",visible:D,attachedToHand:Fe.parent===(y==null?void 0:y.hand),itemCount:Ye.size,lineIds:[...Ye.keys()],productIds:[...Ye.values()],worldBounds:D?Gi(Fe):null,...D?Vi(Fe):{}},departure:{active:Me.has(`depart:${ce%5}`),walking:xe,position:(y==null?void 0:y.group.position.toArray())??null,facingDirection:pe.toArray(),travelDirection:W.toArray(),forwardAlignment:W.lengthSq()?pe.dot(W):1},wrongChangeReaction:{direction:se.direction,status:se.status,active:Me.has("wrong-change")},changeHandover:{status:j,holder:j==="none"?null:he.parent===(y==null?void 0:y.freeHand)?"customer":"cashier",visible:I,attachedToHand:he.parent===(y==null?void 0:y.freeHand),orderId:(we==null?void 0:we.id)??null,handLocalPosition:he.parent===(y==null?void 0:y.freeHand)?he.position.toArray():null,count:Xe.reduce((Ve,Qt)=>Ve+Qt.count,0),denominations:Xe.map(({cents:Ve,count:Qt,representativeCount:ui})=>({cents:Ve,count:Qt,representativeCount:ui})),worldBounds:I?Gi(he):null,...I?Vi(he):{}},emotion:{mood:$,kind:l.customerKinds[ce%5],expressionStyle:c?HS[ce%5]:"human-brows",mouthCurvature:((ke=y==null?void 0:y.expression)==null?void 0:ke.smile)??0,mouthOpenness:((Qe=y==null?void 0:y.expression)==null?void 0:Qe.mouthOpenness)??0,facialPose:((Gt=y==null?void 0:y.expression)==null?void 0:Gt.facialPose)??"emotion",eyebrowAngles:((yt=y==null?void 0:y.expression)==null?void 0:yt.brows.map(Ve=>Ve.rotation.z))??[],eyeClosure:((mt=y==null?void 0:y.expression)==null?void 0:mt.currentEyeClosure)??0,headQuaternion:((Nt=y==null?void 0:y.head)==null?void 0:Nt.quaternion.toArray())??null,earQuaternions:(y==null?void 0:y.ears.map(Ve=>Ve.object.quaternion.toArray()))??[],bodyScales:(y==null?void 0:y.bodyParts.map(Ve=>Ve.scale.toArray()))??[],leftArmQuaternion:((Rt=y==null?void 0:y.freeArm)==null?void 0:Rt.quaternion.toArray())??null},speech:{active:ve,character:l.customerKinds[ce%5],mouthOpenness:((Pn=y==null?void 0:y.expression)==null?void 0:Pn.mouthOpenness)??0,boundaryCount:at},reaction:{kind:Re.kind,status:Re.status,active:Me.has("customer-reaction"),particleCount:K.filter(Ve=>Ve.visible).length,symbolKinds:[...Re.symbolKinds]},customerMotion:{enabled:!!ws(),active:Me.has("customers-idle"),scheduled:cn!==null,bursts:ai,actorIndices:[...os],poses:[...ue.values()].filter(Ve=>Ve.group.visible).map(Ve=>{var Qt,ui,Rn,Ds;return{index:Ve.index,rigPosition:Ve.rig.position.toArray(),headQuaternion:((Qt=Ve.head)==null?void 0:Qt.quaternion.toArray())??null,freeArmQuaternion:((ui=Ve.freeArm)==null?void 0:ui.quaternion.toArray())??null,bodyScale:((Rn=Ve.bodyParts[0])==null?void 0:Rn.scale.toArray())??null,rightHandWorld:((Ds=Ve.hand)==null?void 0:Ds.getWorldPosition(new w).toArray())??null}})},queueCount:[...ue.values()].filter(Ve=>Ve.group.visible&&Ve.index!==ce%5).length,customerCount:[...ue.values()].filter(Ve=>Ve.group.visible).length,availableDrawerDenominations:[...Ft],missingDrawerDenominations:[...P],drawerStock:Xn.map(({cents:Ve})=>({cents:Ve,triangles:re.get(Ve)??0,fullTriangleCount:X.get(Ve)??0,visible:!!(b!=null&&b.visible&&Ft.includes(Ve))})),patienceGesture:{active:Me.has(`patience:${ce%5}`),leftArmQuaternion:((Bn=(In=ue.get(ce%5))==null?void 0:In.freeArm)==null?void 0:Bn.quaternion.toArray())??null,leftForearmQuaternion:((Xi=(xi=ue.get(ce%5))==null?void 0:xi.freeForearm)==null?void 0:Xi.quaternion.toArray())??null},unloading:Ee,drawerOpen:Be,drawerOpenDistance:rt,drawerTravel:be&&Tt?be.position.z-Tt.z:0,drawerContentsVisible:(b==null?void 0:b.visible)??!1,drawerTarget:bp(),reducedMotion:ae,activeAnimations:Me.size,offeredMoney:G.visible?{amountCents:ie==null?void 0:ie.paidCents,...Vi(G),attachedToHand:G.parent===((Ir=ue.get(ce%5))==null?void 0:Ir.hand),handLocalPosition:G.position.toArray(),worldPosition:G.getWorldPosition(new w).toArray()}:null,selectedChange:{surface:"cashier-tray",trayBounds:Gi(Le),count:Te.reduce((Ve,Qt)=>Ve+Qt.count,0),totalCents:Te.reduce((Ve,Qt)=>Ve+Qt.totalCents,0),groups:Te.map(({group:Ve,...Qt})=>({...Qt,countLabelVisible:!1,worldBounds:Gi(Ve),...Vi(Ve)}))},scanner:Vi(qn),items:[...We.values()].map(({lineId:Ve,productId:Qt,group:ui,visual:Rn,hit:Ds})=>({lineId:Ve,productId:Qt,visible:ui.visible,scanned:Pe.has(Ve),worldBounds:Gi(Rn),hitBounds:Gi(Ds),...Vi(ui)}))}}const Hu=new ResizeObserver(cs);Hu.observe(i),window.addEventListener("resize",cs),document.addEventListener("visibilitychange",Nu);const Vu={pointerdown:gp,pointermove:_p,pointerup:vp,pointercancel:yp,pointerleave:xp,webglcontextlost:Mp,webglcontextrestored:Sp};for(const[_,I]of Object.entries(Vu))zt.addEventListener(_,I);Ne.addEventListener("change",zu),cs();function Ep(){if(h)return;ls({active:!1}),Hi(),h=!0,En(),clearTimeout(qe),clearTimeout(J),J=null,m&&cancelAnimationFrame(m),m=0,Me.clear(),Hu.disconnect(),window.removeEventListener("resize",cs),document.removeEventListener("visibilitychange",Nu);for(const[y,D]of Object.entries(Vu))zt.removeEventListener(y,D);Ne.removeEventListener("change",zu),Ou();const _=Ah(lt);for(const y of[R,x])Ah(y,_);const I=[...ht.values(),...[...pn.values()].flatMap(y=>[y.face,y.edge])];for(const y of I)y.map&&!_.has(y.map)&&(_.add(y.map),y.map.dispose()),_.has(y)||(_.add(y),y.dispose());for(const y of He){for(const D of Object.values(y))D!=null&&D.isTexture&&!_.has(D)&&(_.add(D),D.dispose());_.has(y)||(_.add(y),y.dispose())}for(const y of[gn,Tr,...[...pn.values()].map(D=>D.geometry),zo,Sa,Ls])_.has(y)||y.dispose();d.dispose(),zt.remove()}const Ap=new QM,Wi=await Promise.allSettled(l.sources.map(_=>Ap.loadAsync(yo(_))));if(Wi[0].status==="fulfilled"&&(T=Wi[0].value.scene,T.name=`blender_${e}_interior`,lt.add(T)),Wi[1].status==="fulfilled"){x=Wi[1].value.scene;for(let _=0;_<5;_++){const I=x.getObjectByName(`customer_${_}`);if(!I)continue;const y=I.clone(!0);y.position.set(0,0,0);const D=new Xt;D.name=`customer_actor_${_}`,D.add(y),D.visible=!1;const W=D.getObjectByName(`customer_${_}_arm_right`),pe=D.getObjectByName(`customer_${_}_hand_right`),V=D.getObjectByName(`customer_${_}_arm_left`),Q=D.getObjectByName(`customer_${_}_forearm_left`),le=D.getObjectByName(`customer_${_}_hand_left`),_e=D.getObjectByName(`customer_${_}_head`),de=y.children.filter(Qe=>Qe.name===`customer_${_}_body`||Qe.name.startsWith(`customer_${_}_body_`)),Se=["left","right"].map(Qe=>D.getObjectByName(`customer_${_}_ear_${Qe}`)).filter(Boolean).map(Qe=>({object:Qe,rest:Qe.quaternion.clone(),neutral:Qe.quaternion.clone()})),ke={index:_,group:D,rig:y,arm:W,hand:pe,freeArm:V,freeForearm:Q,freeHand:le,head:_e,ears:Se,bodyParts:de,bodyRestScales:de.map(Qe=>({object:Qe,scale:Qe.scale.clone()})),headNeutral:(_e==null?void 0:_e.quaternion.clone())??new it,rigRestPosition:y.position.clone(),headRest:(_e==null?void 0:_e.quaternion.clone())??new it,greetingStatus:"none",thanksStatus:"none",armRest:(W==null?void 0:W.quaternion.clone())??new it,handRest:(pe==null?void 0:pe.quaternion.clone())??new it,freeArmRest:(V==null?void 0:V.quaternion.clone())??new it,freeForearmRest:(Q==null?void 0:Q.quaternion.clone())??new it,freeHandRest:(le==null?void 0:le.quaternion.clone())??new it};ke.expression=ap(ke),qo(ke,"happy"),ue.set(_,ke),Ps.add(D)}}if(Wi[2].status==="fulfilled"){R=Wi[2].value.scene;for(const _ of l.products){const I=R.getObjectByName(`product_${_}`);I&&oe.set(_,I)}}Wi[3].status==="fulfilled"&&(C=Wi[3].value.scene,L=C.getObjectByName("register_root"),L&&(L.position.copy(Hc),lt.add(C),be=L.getObjectByName("cash_drawer"),Tt=(be==null?void 0:be.position.clone())??null,Number.isFinite(be==null?void 0:be.userData.open_distance)&&be.userData.open_distance>0&&(rt=be.userData.open_distance),b=L.getObjectByName("cash_drawer_contents"),b&&(b.visible=!1,hp()),Tp(),O=L.getObjectByName("pos_display_surface"),O==null||O.traverse(_=>{if(_.isMesh){for(const I of Array.isArray(_.material)?_.material:[_.material])He.add(I);_.material=Sa,_.castShadow=!1,_.receiveShadow=!1}}),M=L.getObjectByName("receipt_paper"),M&&(N=M.position.clone(),M.visible=!1),L.add(Bi),Bi.position.set(0,.34,.03)));for(const _ of[T,x,R,Ps])_==null||_.traverse(I=>{if(I.isMesh){I.castShadow=!0,I.receiveShadow=!0;for(const y of Array.isArray(I.material)?I.material:[I.material])"roughness"in y&&(y.roughness=Math.max(y.roughness,.38))}});return C==null||C.traverse(_=>{_.isMesh&&(_.castShadow=_!==Bi&&_.material!==Sa,_.receiveShadow=_!==Bi&&_.material!==Sa)}),g=!!(T&&L&&O&&be&&ue.size===5&&oe.size===l.products.length),v=!g,ki.visible=l.hasBelt&&!!T,zt.dataset.ready=String(g),cs(),g?n==null||n(Jo()):s==null||s(new Error("Some 3D checkout models could not load. Cashier controls still work.")),{setState:pp,setOrder:dp,setScanned:Fu,setPatience:Pr,setEmotion:Aa,setSpeech:ls,playReaction:Lu,reactToChange:wa,celebrate:mp,resize:cs,dispose:Ep,info:Jo}}const an={sun:'<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="7" fill="currentColor"/><path d="M20 3v5m0 24v5M3 20h5m24 0h5M8 8l4 4m16 16 4 4M8 32l4-4M28 12l4-4" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',bear:'<svg viewBox="0 0 48 48" aria-hidden="true"><g stroke="#734a34" stroke-width="2.2"><circle cx="11" cy="12" r="8" fill="#cf9966"/><circle cx="37" cy="12" r="8" fill="#cf9966"/><ellipse cx="24" cy="27" rx="21" ry="18" fill="#dfb27c"/></g><ellipse cx="24" cy="32" rx="10" ry="8" fill="#fff0d9"/><ellipse cx="16" cy="25" rx="2.2" ry="3" fill="#57372b"/><ellipse cx="32" cy="25" rx="2.2" ry="3" fill="#57372b"/><ellipse cx="24" cy="30" rx="3.5" ry="2.5" fill="#57372b"/><path d="M24 32v3m-4 0q4 4 8 0" fill="none" stroke="#57372b" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="9" cy="31" rx="4" ry="2.5" fill="#e89582"/><ellipse cx="39" cy="31" rx="4" ry="2.5" fill="#e89582"/></svg>',sound:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m11 5-5 4H3v6h3l5 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" stroke-linecap="round"/></svg>',music:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 17V5l11-2v12M9 9l11-2" stroke-linejoin="round"/><ellipse cx="6" cy="18" rx="3" ry="2.5"/><ellipse cx="17" cy="16" rx="3" ry="2.5"/></svg>',gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 3-1 3-3 1-2 5 2 5 3 1 1 3h6l1-3 3-1 2-5-2-5-3-1-1-3H9Z"/><circle cx="12" cy="12" r="3"/></svg>',cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 3h3l3 13h11l3-10H6M9 20h1m7 0h1" stroke-linecap="round" stroke-linejoin="round"/></svg>',arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-5-5 5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>',check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 12 4 4L19 6" stroke-linecap="round" stroke-linejoin="round"/></svg>'},ye=i=>document.getElementById(i),Yt=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);function XS(){try{return JSON.parse(localStorage.getItem("sunny-market-v1"))||{}}catch{return{}}}const si=XS();let q=Jl(Kl.some(i=>i.id===si.levelId)?si.levelId:"starter",Math.random,"restaurant"),ti=si.sound!==!1,Ss=si.music!==!1,Xl=0,Oi=si.patience!==!1,pi=Wh(),Jt=null,As=Ph.some(i=>i.durationMs===si.shiftDurationMs)?si.shiftDurationMs:ql;const Eu=Object.fromEntries(Object.entries(si.bestScores||{}).filter(([,i])=>Number.isSafeInteger(i)&&i>=0));let Co=!1;const Gf=()=>`${q.sceneId}:${q.levelId}:${As}:${Oi?"timed":"relaxed"}`,Po=()=>Eu[Gf()]||0;let Io=Number.isInteger(si.stamps)&&si.stamps>=0?si.stamps:0,Jn="",tt,Ci,xo=!1,Wf=!1,Lo=!1,wh=null,Mo="";function _a(){try{localStorage.setItem("sunny-market-v1",JSON.stringify({levelId:q.levelId,sceneId:q.sceneId,sound:ti,music:Ss,stamps:Io,patience:Oi,shiftDurationMs:As,bestScores:Eu}))}catch{}}const $S={unload:["Welcome your customer","Their takeaway order is arriving on the counter."],scan:["Check the food order","Check each food item to pack it into the takeaway bag."],total:["Add up the prices","Enter the total on your cash register."],payment:["Take the payment","Take the customer’s money. Then open your register."],drawer:["Open your cash register","Press OPEN to find the notes and coins for their change."],change:["Count out the change","Choose notes and coins, then hand them back."],success:["Another happy customer","Give them their takeaway bag, receipt, and change."],finished:["Time’s up!","Your score is in. Play again to beat your best!"]},ea=()=>$c[0].name,$l=()=>$S[q.phase],Xf=()=>q.order.changeCents===0?"bag and receipt":"bag, receipt, and change";ye("app").innerHTML=`<main class="cashier-app">
  <div id="world" class="world" aria-label="First-person restaurant counter. Check food to pack it into a takeaway bag and take the customer’s money. Equivalent buttons are available on your register."><div id="world-loading" class="world-loading">${an.sun}<strong>Opening checkout 01…</strong><span>Warming up the kitchen</span></div></div>
  <div class="world-shade" aria-hidden="true"></div>
  <header class="hud"><a class="brand" href="#" aria-label="Sunny Bites game settings">${an.bear}<span id="scene-brand">sunny bites<small>TAKEAWAY CASHIER</small></span></a><div class="shift-status" id="progress"></div><div class="hud-tools"><span class="lane-tag"><i></i> LANE 01 OPEN</span><button class="icon-button" id="music" aria-label="Turn music off" title="Music">${an.music}</button><button class="icon-button" id="sound" aria-label="Turn sound off">${an.sound}</button><button class="icon-button" id="settings-open" aria-label="Open game settings">${an.gear}</button></div></header>
  <section class="mission" aria-label="Current task"><span class="mission-kicker">YOUR NEXT STEP</span><h1 id="objective-title"></h1><p id="objective-copy"></p><div class="mission-steps" id="steps"></div></section>
  <div class="customer-note" id="customer"></div>
  <div class="view-label"><span class="live-dot"></span> CASHIER VIEW <span id="scene-status">Loading your restaurant</span></div>
  <section id="pos-register" class="register" aria-label="Cash register"><div class="monitor-housing"><span class="bezel-screw screw-tl" aria-hidden="true"></span><span class="bezel-screw screw-tr" aria-hidden="true"></span><div class="register-bezel"><span class="register-brand">SUNNY <span>POINT OF SALE</span></span><div class="register-led"></div><span class="register-id">T-01</span></div><div class="register-screen"><div class="register-screen-header"><span id="terminal-status">READY</span>${Yh("register-patience")}<span class="register-currency">AUD · TRAINING TILL</span></div><div id="register-content" class="register-content"></div><div id="register-action" class="register-action" hidden></div></div><div class="monitor-chin" aria-hidden="true"><span>TOUCH TERMINAL</span><i>⏻</i></div></div>${Rm()}</section>
  <div id="announcer" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div><div id="patience-announcer" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div>
  <dialog id="settings" class="settings-dialog" aria-labelledby="settings-title"><form method="dialog"><button class="dialog-close" aria-label="Close settings">×</button></form><div class="eyebrow">MAKE YOURSELF AT HOME</div><h2 id="settings-title">Your cashier shift</h2><p>Pack each checked food item, take payment, and hand over the bag, receipt, and change. Serve as many customers as you can before the shift timer ends.</p><fieldset><legend>Learning level</legend><div id="level-options"></div></fieldset><fieldset class="shift-length-setting"><legend>Shift time</legend><select id="shift-duration" aria-label="Shift time">${Ph.map(i=>`<option value="${i.durationMs}">${i.label}</option>`).join("")}</select><p>An endless queue. Beat your best score before the buzzer!</p></fieldset><label class="patience-setting"><input type="checkbox" id="patience-enabled" checked/><span><strong>Customer patience</strong><small>Race the clock for more points. Turn off for patient customers: +50 points each. The shift time limit still applies.</small></span></label><section class="scoring-rules" aria-label="Service scoring rules"><h3>Serve quickly. Count carefully.</h3><dl><dt>More than half the time left</dt><dd>+100 pts</dd><dt>More than a fifth left</dt><dd>+60 pts</dd><dt>Before the timer reaches zero</dt><dd>+20 pts</dd><dt>After time runs out</dt><dd>−25 pts</dd></dl><p>Points apply once you finish a correct sale before the shift timer ends. Scores can go below zero. A fresh shift starts at 0.</p></section><div class="settings-note"><span>🇦🇺</span><div><strong>Australian dollars</strong><br>Play money · Timers pause in settings and hidden tabs<br>Music starts when you play. Use ♫ to switch it on or off.<br>Character voices are AI-generated with Kokoro.</div></div><button class="primary-button" id="apply-level">Start a fresh shift ${an.arrow}</button><p class="saved-note" id="saved-stamps"></p></dialog>
</main>`;function $f(i){const e=ye("music");e.classList.toggle("muted",!i.enabled),e.setAttribute("aria-pressed",String(i.enabled)),e.setAttribute("aria-label",i.enabled?"Turn music off":"Turn music on"),e.title=i.error?"Music unavailable on this device":i.enabled?"Music on · tap to mute":"Music off · tap to play",e.dataset.playing=String(!!i.playing)}const da=Bp({enabled:Ss,onStateChange:$f}),gi=Pp({isEnabled:()=>Ss,isPaused:()=>document.hidden||ye("settings").open});function Do(i){var e,t,n,s;(t=(e=i.target).closest)!=null&&t.call(e,"#music")||da.unlock(),gi.unlock(),!Lo&&!((s=(n=i.target).closest)!=null&&s.call(n,"#music, #sound, #settings-open, .brand, #settings"))&&(Lo=!0,queueMicrotask(()=>Es()))}document.addEventListener("pointerdown",Do);document.addEventListener("keydown",Do);$f(da.info());const On=Em({getState:()=>q,getView:()=>tt,isEnabled:()=>Oi,onMoodChange:i=>{var t;Jf(),(t=tt==null?void 0:tt.setEmotion)==null||t.call(tt,as()),gi.play(as()),Es();const e={restless:"is getting restless.",impatient:"is getting impatient.",exhausted:"has run out of patience. This checkout will cost 25 points. You can still finish and earn points back on the next customer."};e[i]&&(ye("patience-announcer").textContent=`${q.order.customer.name} ${e[i]}`)}}),Di=fm({isEnabled:()=>ti&&!document.hidden&&!ye("settings").open,onStateChange:i=>{var e;return(e=tt==null?void 0:tt.setSpeech)==null?void 0:e.call(tt,{active:i.speechActive,boundary:i.speechBoundary,character:i.character,mood:i.mood})}}),Fi=pm({getState:()=>q,isPaused:()=>document.hidden||ye("settings").open,onAdvance:()=>xn.info().expired?ko():un(Hh(q),"next"),onUpdate:Yf}),xn=wp({durationMs:As,getState:()=>q,isPaused:()=>document.hidden||ye("settings").open,onUpdate:qf,onExpire:()=>{q.phase==="success"?(Yf(),So("Time’s up! Finishing this customer’s handover.")):ko()}});function as(){return q.phase==="success"?(Jt==null?void 0:Jt.tier)==="late"?"tired":["close","steady"].includes(Jt==null?void 0:Jt.tier)?"relieved":"happy":Oi&&["scan","total","payment","drawer","change"].includes(q.phase)?On.info().mood==="calm"?"happy":On.info().mood:"happy"}function Au(){var i;return nr({phase:q.phase,kind:q.order.customer.kind,mood:Oi?On.info().mood:"calm",paidCents:q.order.paidCents,emotion:as(),delivered:Fi.info().handoverDelivered,changeCents:q.order.changeCents,changeDirection:(i=q.feedback)==null?void 0:i.changeDirection})}function Es({force:i=!1,changeDirection:e=null}={}){var o;if(q.order!==wh&&(wh=q.order,Mo="",Di.cancel()),q.phase==="finished"||(!Lo||!ti||document.hidden||ye("settings").open)&&!e||q.phase==="success"&&!Fi.info().handoverDelivered)return;const t=as(),n=["unload","scan"].includes(q.phase)?"welcome":["drawer","change"].includes(q.phase)?"change":q.phase,s=e||(q.phase==="change"?(o=q.feedback)==null?void 0:o.changeDirection:null),r=`${n}:${t}:${s||"dialogue"}`;if(!i&&Mo===r)return;Mo=r;const a={character:q.order.customer.kind,mood:t,kind:q.phase==="success"?"thanks":n};s?Di.play(s,a):Di.speak(Au(),a)}function qf(i=xn.info()){const e=ye("shift-clock");if(!e)return;const t=i.remainingSeconds;e.querySelector("strong").textContent=`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`,e.querySelector("small").textContent=i.expired?"TIME’S UP":i.paused?"PAUSED":"SHIFT TIME",e.dataset.urgent=String(t<=30&&!i.expired),e.setAttribute("aria-label",`${i.paused?"Paused. ":""}${t} seconds left in your shift`)}function ko(){q.phase!=="finished"&&(Co=pi.points>Po(),Eu[Gf()]=Math.max(Po(),pi.points),_a(),un(nm(q),"finish"),gi.play("shift-end"))}function Yf(i=Fi.info()){const e=ye("checkout-status");if(e){const s=Xf(),r={printing:`Preparing your ${s}…`,"handing-over":`Giving ${s} to ${q.order.customer.name}…`,departing:xn.info().expired?"Everything delivered. Finishing your shift…":"Handover complete. The next customer is coming…"};e.textContent=i.paused?"Checkout paused. We’ll continue when you return.":r[i.stage]||"",e.dataset.stage=i.stage}const t=ye("pos-register").querySelector("[data-action=next]");t&&(t.disabled=!i.handoverDelivered,t.innerHTML=`${xn.info().expired?"See my score":"Next customer"} ${an.arrow}`);const n=ye("printed-receipt");if(n&&n.classList.toggle("receipt-given",i.receiptDelivered||q.phase==="finished"),q.phase==="success"){const s=ye("customer").querySelector("[data-customer-speech]");s&&(s.textContent=Au()),i.handoverDelivered&&Es()}}function Kf(){Fi.pauseChanged(),xn.pauseChanged(),document.hidden&&(Di.cancel(),gi.cancel())}document.addEventListener("visibilitychange",Kf);ye("settings").addEventListener("close",()=>{Fi.pauseChanged(),xn.pauseChanged(),Es()});function Ms(i){if(ti)try{Ci||(Ci=new(window.AudioContext||window.webkitAudioContext)),Ci.resume(),(i==="success"?[523.25,659.25,783.99]:i==="scan"?[1100,1450]:i==="drawer"?[190,280]:i==="too-little"?[330,440]:i==="too-much"?[440,330]:[580]).forEach((t,n)=>{const s=Ci.createOscillator(),r=Ci.createGain();s.type=i==="drawer"?"triangle":"sine",s.frequency.value=t;const a=Ci.currentTime+n*.1;r.gain.setValueAtTime(0,a),r.gain.linearRampToValueAtTime(.06,a+.01),r.gain.exponentialRampToValueAtTime(.001,a+.14),s.connect(r),r.connect(Ci.destination),s.start(a),s.stop(a+.16)})}catch{}}function So(i){ye("announcer").textContent=i}function tr(){const i=q.feedback;if(!i||i.type!=="try")return"";if(q.phase==="change"&&["too-little","too-much"].includes(i.changeDirection)){const e=i.changeDirection==="too-little";return`<div class="feedback try change-feedback" data-direction="${i.changeDirection}" role="status"><span class="change-feedback-symbol" aria-hidden="true">${e?"+":"−"}</span><div><strong>${e?"Too little change":"Too much change"}</strong><span class="customer-verdict"><b>${Yt(q.order.customer.name)}:</b> “${Yt(cr(i.changeDirection))}”</span></div></div>`}return`<div class="feedback ${i.type}" role="status">${Yt(i.text)}</div>`}function No(){const i=new Map;for(const e of q.order.items){const t=`${e.productId}:${e.priceCents}`;i.has(t)||i.set(t,{...e,quantity:0,lineIds:[]}),i.get(t).quantity++,i.get(t).lineIds.push(e.lineId)}return[...i.values()]}function jf(i,e=""){return`<img class="food-picture ${e}" src="./assets/food-icons/${Yt(i.productId)}.png" alt="" width="48" height="48" draggable="false"/>`}function Rh(i,e=!1){return`<span class="food-receipt-art ${e?"checked":""}" aria-hidden="true">${jf(i)}${e?"<i>✓</i>":""}</span>`}function Ch({compact:i=!1}={}){const e=["payment","drawer","change","success","finished"].includes(q.phase),n=q.phase==="scan"?No().map(s=>{const r=s.lineIds.filter(l=>q.scanned.includes(l)).length,a=r===s.quantity,o=s.lineIds.find(l=>!q.scanned.includes(l))??s.lineIds.at(-1);return`<button class="receipt-item receipt-product-group receipt-scan-group ${a?"is-scanned":""}" data-product="${Yt(s.productId)}" data-quantity="${s.quantity}" data-unit-price="${s.priceCents}" data-packed="${r}" data-scan-group="${Yt(`${s.productId}:${s.priceCents}`)}" data-scan="${Yt(o)}" aria-label="Check ${Yt(s.name)}, ${r} of ${s.quantity} packed, ${Ot(s.priceCents)} each" ${a?"disabled":""}>${Rh(s,a)}<span class="product-description">${Yt(s.name)}<small class="packing-progress">${a?"Packed ✓":`${r}/${s.quantity} packed`}</small></span><strong class="product-equation">${s.quantity} × ${Ot(s.priceCents)}</strong></button>`}).join(""):No().map(s=>`<div class="receipt-item receipt-product-group is-scanned" data-product="${Yt(s.productId)}" data-quantity="${s.quantity}" data-unit-price="${s.priceCents}">${Rh(s,!0)}<span class="product-description">${Yt(s.name)}<small>${Ot(s.priceCents)} each</small></span><strong class="product-equation">${s.quantity} × ${Ot(s.priceCents)}</strong></div>`).join("");return`<div class="receipt ${i?"compact":""}"><div class="receipt-head"><span>ITEM</span><span>QUANTITY × PRICE EACH</span></div><div class="receipt-items">${n}</div><div class="receipt-total"><span>${e?"TOTAL":"TOTAL TO CALCULATE"}</span><strong>${e?Ot(q.order.totalCents):"$ —.—"}</strong></div></div>`}function qS(){ye("progress").innerHTML=`<span class="shift-clock" id="shift-clock" role="timer"><small>SHIFT TIME</small><strong></strong></span><span class="shift-score" id="shift-score" data-negative="${pi.points<0}" aria-label="Shift score: ${pi.points} points"><span aria-hidden="true">★</span><strong>${Xh(pi.points)}</strong><small>PTS</small></span><span class="shift-best"><small>BEST</small><b>${Po()}</b></span><span class="customer-counter">${an.cart}<strong>${q.phase==="finished"?`${q.completed} served`:`Customer ${q.round+1}`}</strong></span>`,qf()}function Jf(){var c;const i=q.order.customer,e=Au(),t=On.info().mood,n=q.phase==="change"?(c=q.feedback)==null?void 0:c.changeDirection:null,s=["unload","scan","total"].includes(q.phase)&&t==="calm",r=s?`<div class="customer-order-pictures" aria-label="Customer’s order">${No().map(u=>`<span class="order-picture" aria-label="${u.quantity} ${Yt(u.name)}">${jf(u)}<b aria-hidden="true">×${u.quantity}</b></span>`).join("")}</div>`:"";ye("customer").classList.toggle("pictured-order",s);const a=as(),o={happy:"☺",restless:"◷",impatient:"☁",exhausted:"☁",relieved:"♡",tired:"☂"},l={happy:q.phase==="success"?"Delighted!":"Happy to wait",restless:"Getting restless",impatient:"Losing patience",exhausted:"Very impatient",relieved:"Relieved",tired:"Tired of waiting"};ye("customer").dataset.emotion=a,ye("customer").innerHTML=`<span class="speech-name">${Yt(i.name)} <span>${q.phase==="success"?"CUSTOMER SERVED":"AT YOUR CHECKOUT"}</span></span><span class="customer-emotion"><i aria-hidden="true">${o[a]}</i>${l[a]}</span>${r}<p data-customer-speech class="${s?"order-caption":""}">${Yt(e)}</p>${Tm()}`,ye("customer").classList.toggle("payment-speech",q.phase==="payment"),n?ye("customer").dataset.changeDirection=n:delete ye("customer").dataset.changeDirection}function ha(){var c,u,d;const i=document.activeElement,e=["data-money","data-remove-value","data-remove","data-action","data-scan-group","data-scan"].find(h=>i==null?void 0:i.hasAttribute(h)),t=e?i.getAttribute(e):null,n=(i==null?void 0:i.id)==="total-input"?{start:i.selectionStart,end:i.selectionEnd,direction:i.selectionDirection}:null;ye("app").dataset.phase=q.phase,ye("app").dataset.scene=q.sceneId,ye("scene-brand").innerHTML=`${ea().toLowerCase()}<small>TAKEAWAY CASHIER</small>`,document.querySelector(".brand > svg").outerHTML=an.bear,document.querySelector(".brand").setAttribute("aria-label",`${ea()} game settings`),ye("world").setAttribute("aria-label","First-person restaurant counter. Click takeaway food to pack it into a bag, or take the animal customer’s money. Equivalent controls are available on your register."),document.title=`${ea()} · Cashier game`,qS(),Jf(),ye("objective-title").textContent=$l()[0],ye("objective-copy").textContent=xo&&["unload","scan","payment","drawer"].includes(q.phase)?"Use the item rows on your register to keep playing.":$l()[1],q.phase==="success"&&(Jt==null?void 0:Jt.tier)==="late"&&(ye("objective-title").textContent="Customer served"),q.phase==="change"&&Uo(q).length&&(ye("objective-title").textContent="Find another combination",ye("objective-copy").textContent="Some slots are empty. Use the notes and coins you have to make the exact change."),q.phase==="total"&&No().some(h=>h.quantity>1)&&(ye("objective-title").textContent="Multiply, then add",ye("objective-copy").textContent="Multiply each price by its quantity. Add the groups to find the bill.");const s=["unload","scan"].includes(q.phase)?0:q.phase==="total"?1:q.phase==="payment"?2:q.phase==="drawer"?3:4;ye("steps").innerHTML=["Scan","Total","Cash","Open","Change"].map((h,f)=>`<span class="${f===s?"active":f<s?"done":""}"><i>${f<s?"✓":f+1}</i>${h}</span>`).join(""),ye("terminal-status").textContent={unload:"CUSTOMER ARRIVING",scan:"SCANNER READY",total:"ENTER BILL TOTAL",payment:"AWAITING PAYMENT",drawer:"PAYMENT RECEIVED · DRAWER CLOSED",change:"CASH DRAWER OPEN",success:"TRANSACTION COMPLETE",finished:"SHIFT COMPLETE"}[q.phase],ye("drawer-open").disabled=q.phase!=="drawer",ye("drawer-open").dataset.open=String(q.phase==="change"),ye("drawer-open").setAttribute("aria-label",q.phase==="drawer"?"Open cash drawer using the register button":q.phase==="change"?"Cash drawer is open":"Cash drawer is closed"),ye("drawer-base-label").textContent=q.phase==="drawer"?"PRESS TO OPEN CASH DRAWER":q.phase==="change"?"CASH DRAWER OPEN":"CASH DRAWER LOCKED";let r="",a="";q.phase==="unload"?r=`<div class="task-heading"><span class="eyebrow">NEXT IN LINE</span><h2>Welcome, ${Yt(q.order.customer.name)}.</h2><p>${q.order.items.length} takeaway items are arriving on the counter.</p></div><div class="unload-display">${an.cart}<span>Getting your order ready…</span><div class="unload-indicator"><i></i><i></i><i></i></div></div>${tr()}<button class="secondary-button" data-action="unload">Start scanning ${an.arrow}</button>`:q.phase==="scan"?r=`<div class="task-heading compact-heading"><h2>Check each food item</h2><span class="scan-count">${q.scanned.length}/${q.order.items.length}</span></div>${Ch()}<div class="scanner-status"><span class="scan-led"></span>${q.scanned.length?"Item checked and packed. Ready for the next one.":"Click a food item to pack it into the bag."}</div>${tr()}`:q.phase==="total"?(r=`<div class="task-heading compact-heading"><h2>What’s the total?</h2></div>${Ch({compact:!0})}`,a=`<div class="calculator total-entry"><label for="total-input">ENTER THE AMOUNT THE CUSTOMER OWES</label><div class="total-entry-controls"><div class="money-input"><span>$</span><input id="total-input" type="text" inputmode="decimal" autocomplete="off" maxlength="8" aria-label="Total amount in dollars" placeholder="0.00" value="${Yt(Jn)}"/></div><button class="primary-button" data-action="total">Check my total ${an.arrow}</button></div>${tr()}</div>`):q.phase==="payment"?r=`<div class="task-heading"><span class="eyebrow">ACCEPT THE CUSTOMER’S CASH</span><h2>Take the payment</h2><p>${Yt(q.order.customer.name)} is handing you money.</p></div><div class="payment-bill"><span>Bill total</span><strong>${Ot(q.order.totalCents)}</strong></div><button class="offered-note" data-action="accept" aria-label="Take ${Ot(q.order.paidCents)} payment"><span>AUSTRALIAN DOLLARS</span><strong>${Ot(q.order.paidCents)}</strong><small>PLAY MONEY · CLICK TO TAKE</small></button>${tr()}<button class="primary-button" data-action="accept">Take ${Ot(q.order.paidCents)} ${an.arrow}</button><p class="payment-help">You can also click the money in their hand.</p>`:q.phase==="drawer"?r=`<div class="task-heading"><span class="eyebrow">CUSTOMER’S MONEY RECEIVED ✓</span><h2>Open the cash register</h2><p>Find the exact change inside your drawer.</p></div><div class="payment-summary"><div><span>BILL TOTAL</span><strong>${Ot(q.order.totalCents)}</strong></div><div><span>CASH RECEIVED ✓</span><strong>${Ot(q.order.paidCents)}</strong></div></div><div class="drawer-instruction"><span aria-hidden="true">↓</span><p>Press OPEN to release the drawer below.<br>Count the notes and coins inside.</p></div>${tr()}<button class="primary-button open-drawer-button" data-action="open-drawer">Open cash drawer ${an.arrow}</button><p class="payment-help">Then choose notes and coins to make the right change.</p>`:q.phase==="change"?r=`<div class="task-heading compact-heading"><h2>Count their change</h2></div><div class="payment-summary"><div><span>BILL TOTAL</span><strong>${Ot(q.order.totalCents)}</strong></div><div><span>CASH RECEIVED ✓</span><strong>${Ot(q.order.paidCents)}</strong></div></div><div class="change-prompt">${Ot(q.order.paidCents)} − ${Ot(q.order.totalCents)} = <span>?</span></div><p class="count-change-instruction">Count the notes and coins in your tray. Give the change when you’re ready.</p>${tr()}`:q.phase==="success"?r=`<div class="success-panel"><span class="success-check">${an.check}</span><span class="eyebrow">TRANSACTION COMPLETE</span><h2>${(Jt==null?void 0:Jt.tier)==="late"?"Change checked!":"Right on the money!"}</h2><p>Handing ${Yt(q.order.customer.name)} their ${Xf()}.</p>${ym(Jt)}<p class="checkout-status" id="checkout-status" role="status"></p><button class="primary-button" data-action="next" disabled>Next customer ${an.arrow}</button><small class="checkout-auto-note">The queue moves automatically after everything is delivered.</small></div>`:r=`<div class="success-panel"><span class="finish-stars">${Co?"★ ★ ★":"★"}</span><span class="eyebrow">${Co?"NEW PERSONAL BEST":"SHIFT COMPLETE"}</span><h2>Time’s up!</h2><p>${q.completed} ${q.completed===1?"customer":"customers"} served in ${As/6e4} minutes.</p>${xm(pi)}<p class="shift-record">Best score: <strong>${Po()} points</strong></p><button class="primary-button" data-action="restart">Play again ${an.arrow}</button><button class="text-button" data-action="levels">Change level or time</button></div>`,ye("register-content").innerHTML=r,ye("register-content").dataset.phase=q.phase;const o=q.phase==="change"?ye("register-content").querySelector(".feedback"):null,l=(o==null?void 0:o.outerHTML)||"";if(o==null||o.remove(),ye("register-action").innerHTML=a,ye("register-action").hidden=!a,ye("register-action").dataset.phase=q.phase,q.phase==="success"&&(ye("register-action").append(ye("register-content").querySelector("[data-action=next]"),ye("register-content").querySelector(".checkout-auto-note")),ye("register-action").hidden=!1),Dm(q,Wf,l,(c=q.feedback)==null?void 0:c.changeDirection),n&&q.phase==="total"){const h=ye("total-input");h.focus({preventScroll:!0}),h.setSelectionRange(n.start,n.end,n.direction)}if(e){const h=[...ye("pos-register").querySelectorAll(`[${e}]`)].find(f=>f.getAttribute(e)===t);h&&!h.disabled?h.focus({preventScroll:!0}):e==="data-remove-value"?(u=ye("change-preview").querySelector("[data-remove-value], [data-action=change]"))==null||u.focus({preventScroll:!0}):e==="data-scan-group"&&((d=ye("pos-register").querySelector("[data-scan]:not(:disabled), #total-input"))==null||d.focus({preventScroll:!0}))}On.render(!0),Fi.paint(!0),ye("sound").classList.toggle("muted",!ti),ye("sound").setAttribute("aria-label",ti?"Turn sound off":"Turn sound on"),ye("sound").setAttribute("aria-pressed",String(ti)),ye("sound").title="Kokoro character voices and sound effects"}function un(i,e){var s,r,a,o,l,c;if(!["restart","finish"].includes(e)){if(xn.tick(),q.phase==="finished")return;if(xn.info().expired){e==="next"&&q.phase==="success"&&ko();return}}const t=q;if(i===t)return;On.tick(),e==="restart"?(pi=Wh(),Jt=null,Co=!1,xn.reset(As),gi.cancel()):i.order!==t.order&&(Jt=null);const n=i.phase==="success"&&t.phase!=="success";if(n&&(Jt=Gh(On.info(),Oi),pi=_m(pi,`${i.levelId}:${i.round}:${i.order.id}`,Jt)),Wf=t.phase==="drawer"&&i.phase==="change",q=i,q.phase!==t.phase&&(Jn=""),n?(Io++,_a(),Ms(Jt.delta<0?"too-much":"success")):e==="scan"&&q.scanned.length>t.scanned.length?Ms("scan"):e==="open-drawer"?Ms("drawer"):(e==="accept"||e==="money")&&Ms("key"),(q.order!==t.order||q.phase!==t.phase&&["success","finished"].includes(q.phase))&&Di.cancel(),(q.phase!=="change"||!((s=q.feedback)!=null&&s.changeDirection))&&((r=tt==null?void 0:tt.reactToChange)==null||r.call(tt,null)),Fi.sync(t,q),xn.sync(t,q),t.sceneId!==q.sceneId?ep():tt==null||tt.setState(q),On.sync(t,q),(a=tt==null?void 0:tt.setEmotion)==null||a.call(tt,as()),ha(),So(((o=q.feedback)==null?void 0:o.text)||$l()[1]),(n||t.phase==="unload"&&q.phase==="scan")&&gi.play(as()),n&&(Mm(),So(`${q.order.customer.name} served. ${Jt.label}: ${Ql(Jt.delta)} points. Shift score: ${pi.points} points.`)),e==="change"&&q.phase==="change"&&((l=q.feedback)!=null&&l.changeDirection)?(wm(q.feedback.changeDirection),Es({force:!0,changeDirection:q.feedback.changeDirection}),(c=tt==null?void 0:tt.reactToChange)==null||c.call(tt,q.feedback.changeDirection),So(`${q.order.customer.name} says: ${cr(q.feedback.changeDirection)}`)):Es(),q.phase!==t.phase&&(matchMedia("(max-width: 700px)").matches&&(q.phase==="change"?ye("change-preview"):["unload","scan"].includes(q.phase)?document.querySelector(".cashier-app"):document.querySelector(".register")).scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"}),!["unload","scan"].includes(q.phase))){const u=ye("pos-register").querySelector("#total-input, #register-content .primary-button, #register-action .primary-button, #change-preview .primary-button");u&&e!=="scan"&&!u.disabled&&u.focus({preventScroll:!0})}}function Zf(i){un(Kp(q,i),"scan")}function Qf(){un(jp(q),"accept")}function wu(){un(Jp(q),"open-drawer")}function Ru(){On.tick(),xn.tick(),Di.cancel(),gi.cancel(),ye("shift-duration").value=String(As),ye("patience-enabled").checked=Oi,ye("level-options").innerHTML=Kl.map((i,e)=>`<label class="level-option"><input type="radio" name="level" value="${i.id}" ${q.levelId===i.id?"checked":""}/><span class="level-symbol">${e+1}</span><span><strong>${Yt(i.name)}</strong><small>${Yt(i.description)}</small><span class="level-drawer-detail">${["Full drawer · All 11 money types","Random drawer · 2–3 types missing each customer","Random drawer · 4–5 types missing each customer"][e]}</span></span></label>`).join(""),ye("saved-stamps").textContent=`${Io} cashier ${Io===1?"stamp":"stamps"} earned on this device.`,ye("settings").showModal(),On.pauseChanged(),Fi.pauseChanged(),xn.pauseChanged()}ye("pos-register").addEventListener("input",i=>{i.target.id==="total-input"&&(Jn=i.target.value)});ye("pos-register").addEventListener("keydown",i=>{i.target.id==="total-input"&&i.key==="Enter"&&q.phase==="total"&&(i.preventDefault(),un(zh(q,Jn),"total"))});ye("pos-register").addEventListener("click",i=>{const e=i.target.closest("button");if(!e||e.disabled)return;if(e.dataset.scan){Zf(e.dataset.scan);return}if(e.dataset.key!==void 0){if(q.phase!=="total")return;const n=e.dataset.key;Jn=n==="⌫"?Jn.slice(0,-1):Jn.length<8?Jn+n:Jn,ye("total-input").value=Jn,Ms("key");return}if(e.dataset.money){un(Zp(q,Number(e.dataset.money)),"money");return}if(e.dataset.remove!==void 0){un(Qp(q,Number(e.dataset.remove)),"remove");return}const t=e.dataset.action;t==="unload"&&un(qc(q),"unload"),t==="total"&&un(zh(q,Jn),"total"),t==="accept"&&Qf(),t==="open-drawer"&&wu(),t==="change"&&un(tm(q),"change"),t==="clear"&&un(em(q),"clear"),t==="next"&&(xn.info().expired?ko():un(Hh(q),"next")),t==="restart"&&un(Jl(q.levelId,Math.random,q.sceneId),"restart"),t==="levels"&&Ru()});ye("drawer-open").addEventListener("click",wu);ye("sound").addEventListener("click",()=>{ti=!ti,ti?(Lo=!0,Mo=""):Di.cancel(),_a(),ha(),ti&&(Ms("key"),Es())});ye("music").addEventListener("click",()=>{Ss=!Ss,da.setEnabled(Ss),Ss?(da.unlock(),gi.unlock()):gi.cancel(),_a()});ye("settings-open").addEventListener("click",Ru);ye("apply-level").addEventListener("click",()=>{const i=ye("settings").querySelector("input[name=level]:checked").value;Oi=ye("patience-enabled").checked,As=Number(ye("shift-duration").value),un(Jl(i,Math.random,"restaurant"),"restart"),_a(),ye("settings").close(),On.pauseChanged(),xn.pauseChanged()});document.querySelector(".brand").addEventListener("click",i=>{i.preventDefault(),Ru()});ye("settings").addEventListener("click",i=>{if(i.target===ye("settings")){const e=ye("settings").getBoundingClientRect();(i.clientX<e.left||i.clientX>e.right||i.clientY<e.top||i.clientY>e.bottom)&&ye("settings").close()}});ha();async function ep(){var a,o,l;const i=++Xl,e=q.sceneId;tt==null||tt.dispose(),tt=void 0,xo=!1;const t=document.createElement("div");t.className="scene-mount";const n=document.createElement("div");n.id="world-loading",n.className="world-loading",n.innerHTML=`${an.sun}<strong>Opening ${Yt(ea())}…</strong><span>Warming up the kitchen</span>`,ye("world").replaceChildren(t,n),ye("world").classList.remove("scene-unavailable"),ye("scene-status").textContent=`Loading ${ea()}`;const s=()=>i===Xl&&e===q.sceneId,r=c=>{s()&&(xo=!0,n.remove(),ye("world").classList.add("scene-unavailable"),ye("scene-status").textContent="3D unavailable · register controls still work",console.warn("Cashier view:",c),q.phase==="unload"?un(qc(q),"unload"):ha())};try{const c=await WS(t,{sceneId:e,onScan:d=>{s()&&Zf(d)},onUnloadComplete:()=>{s()&&un(qc(q),"unload")},onAcceptPayment:()=>{s()&&Qf()},onOpenDrawer:()=>{s()&&wu()},onReady:()=>{s()&&(xo=!1,ye("world").classList.remove("scene-unavailable"),n.remove(),ye("scene-status").textContent="Fresh food. Friendly faces.",ha())},onError:r});if(!s()){c.dispose();return}tt=c,tt.setState(q),(a=tt.setPatience)==null||a.call(tt,Oi?On.info().mood:"calm"),(o=tt.setEmotion)==null||o.call(tt,as());const u=Di.info();(l=tt.setSpeech)==null||l.call(tt,{active:u.speechActive,boundary:u.speechBoundary,character:u.character,mood:u.mood})}catch(c){r(c)}}ep();window.addEventListener("pagehide",()=>{Xl++,On.dispose(),Fi.dispose(),xn.dispose(),Di.dispose(),gi.dispose(),tt==null||tt.dispose(),da.dispose(),document.removeEventListener("visibilitychange",Kf),document.removeEventListener("pointerdown",Do),document.removeEventListener("keydown",Do),Ci==null||Ci.close()},{once:!0});
