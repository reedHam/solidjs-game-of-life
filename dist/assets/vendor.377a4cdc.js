const _={},we=(e,t)=>e===t,C=Symbol("solid-proxy"),M={equals:we};let ie=ue;const P={},E=1,R=2,le={owned:null,cleanups:null,context:null,owner:null};var d=null;let j=null,a=null,m=null,g=null,A=null,J=0;function I(e,t){const n=a,s=d,i=e.length===0?le:{owned:null,cleanups:null,context:null,owner:t||s};d=i,a=null;try{return v(()=>e(()=>ee(i)),!0)}finally{a=n,d=s}}function oe(e,t){t=t?Object.assign({},M,t):M;const n={value:e,observers:null,observerSlots:null,pending:P,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.pending!==P?n.pending:n.value)),Z(n,i));return[ce.bind(n),s]}function V(e,t,n){const s=z(e,t,!1,E);k(s)}function je(e,t,n){ie=xe;const s=z(e,t,!1,E);s.user=!0,A?A.push(s):queueMicrotask(()=>k(s))}function X(e,t,n){n=n?Object.assign({},M,n):M;const s=z(e,t,!0,0);return s.pending=P,s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,k(s),ce.bind(s)}function re(e){if(m)return e();let t;const n=m=[];try{t=e()}finally{m=null}return v(()=>{for(let s=0;s<n.length;s+=1){const i=n[s];if(i.pending!==P){const l=i.pending;i.pending=P,Z(i,l)}}},!1),t}function H(e){let t,n=a;return a=null,t=e(),a=n,t}function be(e){return d===null||(d.cleanups===null?d.cleanups=[e]:d.cleanups.push(e)),e}function fe(){return a}function ce(){const e=j;if(this.sources&&(this.state||e)){const t=g;g=null,this.state===E||e?k(this):U(this),g=t}if(a){const t=this.observers?this.observers.length:0;a.sources?(a.sources.push(this),a.sourceSlots.push(t)):(a.sources=[this],a.sourceSlots=[t]),this.observers?(this.observers.push(a),this.observerSlots.push(a.sources.length-1)):(this.observers=[a],this.observerSlots=[a.sources.length-1])}return this.value}function Z(e,t,n){if(m)return e.pending===P&&m.push(e),e.pending=t,t;if(e.comparator&&e.comparator(e.value,t))return t;let s=!1;return e.value=t,e.observers&&e.observers.length&&v(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i];s&&j.disposed.has(l),(s&&!l.tState||!s&&!l.state)&&(l.pure?g.push(l):A.push(l),l.observers&&ae(l)),s||(l.state=E)}if(g.length>1e6)throw g=[],new Error},!1),t}function k(e){if(!e.fn)return;ee(e);const t=d,n=a,s=J;a=d=e,Ae(e,e.value,s),a=n,d=t}function Ae(e,t,n){let s;try{s=e.fn(t)}catch(i){he(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?Z(e,s):e.value=s,e.updatedAt=n)}function z(e,t,n,s=E,i){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:d,context:null,pure:n};return d===null||d!==le&&(d.owned?d.owned.push(l):d.owned=[l]),l}function D(e){const t=j;if(e.state===0||t)return;if(e.state===R||t)return U(e);if(e.suspense&&H(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<J);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===E||t)k(e);else if(e.state===R||t){const i=g;g=null,U(e,n[0]),g=i}}function v(e,t){if(g)return e();let n=!1;t||(g=[]),A?n=!0:A=[],J++;try{return e()}catch(s){he(s)}finally{Se(n)}}function Se(e){g&&(ue(g),g=null),!e&&(A.length?re(()=>{ie(A),A=null}):A=null)}function ue(e){for(let t=0;t<e.length;t++)D(e[t])}function xe(e){let t,n=0;for(t=0;t<e.length;t++){const i=e[t];i.user?e[n++]=i:D(i)}const s=e.length;for(t=0;t<n;t++)D(e[t]);for(t=s;t<e.length;t++)D(e[t])}function U(e,t){const n=j;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===E||n?i!==t&&D(i):(i.state===R||n)&&U(i,t))}}function ae(e){const t=j;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=R,s.pure?g.push(s):A.push(s),s.observers&&ae(s))}}function ee(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const l=i.pop(),o=n.observerSlots.pop();s<i.length&&(l.sourceSlots[o]=s,i[s]=l,n.observerSlots[s]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)ee(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function he(e){throw e}const Ee=Symbol("fallback");function te(e){for(let t=0;t<e.length;t++)e[t]()}function Oe(e,t,n={}){let s=[],i=[],l=[],o=0,r=t.length>1?[]:null;return be(()=>te(l)),()=>{let c=e()||[],u,f;return H(()=>{let h=c.length,y,x,T,L,B,w,b,S,O;if(h===0)o!==0&&(te(l),l=[],s=[],i=[],o=0,r&&(r=[])),n.fallback&&(s=[Ee],i[0]=I(ye=>(l[0]=ye,n.fallback())),o=1);else if(o===0){for(i=new Array(h),f=0;f<h;f++)s[f]=c[f],i[f]=I(p);o=h}else{for(T=new Array(h),L=new Array(h),r&&(B=new Array(h)),w=0,b=Math.min(o,h);w<b&&s[w]===c[w];w++);for(b=o-1,S=h-1;b>=w&&S>=w&&s[b]===c[S];b--,S--)T[S]=i[b],L[S]=l[b],r&&(B[S]=r[b]);for(y=new Map,x=new Array(S+1),f=S;f>=w;f--)O=c[f],u=y.get(O),x[f]=u===void 0?-1:u,y.set(O,f);for(u=w;u<=b;u++)O=s[u],f=y.get(O),f!==void 0&&f!==-1?(T[f]=i[u],L[f]=l[u],r&&(B[f]=r[u]),f=x[f],y.set(O,f)):l[u]();for(f=w;f<h;f++)f in T?(i[f]=T[f],l[f]=L[f],r&&(r[f]=B[f],r[f](f))):i[f]=I(p);i=i.slice(0,o=h),s=c.slice(0)}return i});function p(h){if(l[f]=h,r){const[y,x]=oe(f);return r[f]=x,t(c[f],y)}return t(c[f])}}}function ke(e,t){return H(()=>e(t))}function Le(e){const t="fallback"in e&&{fallback:()=>e.fallback};return X(Oe(()=>e.each,e.children,t||void 0))}function Be(e){let t=!1;const n=X(()=>e.when,void 0,{equals:(s,i)=>t?s===i:!s==!i});return X(()=>{const s=n();if(s){const i=e.children;return(t=typeof i=="function"&&i.length>0)?H(()=>i(s)):i}return e.fallback})}function Ne(e,t,n){let s=n.length,i=t.length,l=s,o=0,r=0,c=t[i-1].nextSibling,u=null;for(;o<i||r<l;){if(t[o]===n[r]){o++,r++;continue}for(;t[i-1]===n[l-1];)i--,l--;if(i===o){const f=l<s?r?n[r-1].nextSibling:n[l-r]:c;for(;r<l;)e.insertBefore(n[r++],f)}else if(l===r)for(;o<i;)(!u||!u.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[l-1]&&n[r]===t[i-1]){const f=t[--i].nextSibling;e.insertBefore(n[r++],t[o++].nextSibling),e.insertBefore(n[--l],f),t[i]=n[l]}else{if(!u){u=new Map;let p=r;for(;p<l;)u.set(n[p],p++)}const f=u.get(t[o]);if(f!=null)if(r<f&&f<l){let p=o,h=1,y;for(;++p<i&&p<l&&!((y=u.get(t[p]))==null||y!==f+h);)h++;if(h>f-r){const x=t[o];for(;r<f;)e.insertBefore(n[r++],x)}else e.replaceChild(n[r++],t[o++])}else o++;else t[o++].remove()}}}const ne="_$DX_DELEGATE";function Ie(e,t,n){let s;return I(i=>{s=i,t===document?e():Ce(t,e(),t.firstChild?null:void 0,n)}),()=>{s(),t.textContent=""}}function Me(e,t,n){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return n&&(i=i.firstChild),i}function Re(e,t=window.document){const n=t[ne]||(t[ne]=new Set);for(let s=0,i=e.length;s<i;s++){const l=e[s];n.has(l)||(n.add(l),t.addEventListener(l,Pe))}}function Ue(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Fe(e,t,n={}){const s=e.style;if(t==null||typeof t=="string")return s.cssText=t;typeof n=="string"&&(n={});let i,l;for(l in n)t[l]==null&&s.removeProperty(l),delete n[l];for(l in t)i=t[l],i!==n[l]&&(s.setProperty(l,i),n[l]=i);return n}function Ce(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return F(e,t,s,n);V(i=>F(e,t(),i,n),s)}function Pe(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n!==null;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s(i,e):s(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function F(e,t,n,s,i){for(_.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(_.context)return n;if(l==="number"&&(t=t.toString()),o){let r=n[0];r&&r.nodeType===3?r.data=t:r=document.createTextNode(t),n=N(e,n,s,r)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean"){if(_.context)return n;n=N(e,n,s)}else{if(l==="function")return V(()=>{let r=t();for(;typeof r=="function";)r=r();n=F(e,r,n,s)}),()=>n;if(Array.isArray(t)){const r=[];if(Q(r,t,i))return V(()=>n=F(e,r,n,s,!0)),()=>n;if(_.context){for(let c=0;c<r.length;c++)if(r[c].parentNode)return n=r}if(r.length===0){if(n=N(e,n,s),o)return n}else Array.isArray(n)?n.length===0?se(e,r,s):Ne(e,n,r):(n&&N(e),se(e,r));n=r}else if(t instanceof Node){if(_.context&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=N(e,n,s,t);N(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function Q(e,t,n){let s=!1;for(let i=0,l=t.length;i<l;i++){let o=t[i],r;if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))s=Q(e,o)||s;else if((r=typeof o)=="string")e.push(document.createTextNode(o));else if(r==="function")if(n){for(;typeof o=="function";)o=o();s=Q(e,Array.isArray(o)?o:[o])||s}else e.push(o),s=!0;else e.push(document.createTextNode(o.toString()))}return s}function se(e,t,n){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function N(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const r=t[o];if(i!==r){const c=r.parentNode===e;!l&&!o?c?e.replaceChild(i,r):e.insertBefore(i,n):c&&r.remove()}else l=!0}}else e.insertBefore(i,n);return[i]}const de=Symbol("store-raw"),K=Symbol("store-node"),Te=Symbol("store-name");function ge(e,t){let n=e[C];if(!n){Object.defineProperty(e,C,{value:n=new Proxy(e,me)});const s=Object.keys(e),i=Object.getOwnPropertyDescriptors(e);for(let l=0,o=s.length;l<o;l++){const r=s[l];if(i[r].get){const c=i[r].get.bind(n);Object.defineProperty(e,r,{get:c})}}}return n}function q(e){return e!=null&&typeof e=="object"&&(e[C]||!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function G(e,t=new Set){let n,s,i,l;if(n=e!=null&&e[de])return n;if(!q(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let o=0,r=e.length;o<r;o++)i=e[o],(s=G(i,t))!==i&&(e[o]=s)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const o=Object.keys(e),r=Object.getOwnPropertyDescriptors(e);for(let c=0,u=o.length;c<u;c++)l=o[c],!r[l].get&&(i=e[l],(s=G(i,t))!==i&&(e[l]=s))}return e}function W(e){let t=e[K];return t||Object.defineProperty(e,K,{value:t={}}),t}function _e(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===C||t===K||t===Te||(delete n.value,delete n.writable,n.get=()=>e[C][t]),n}function $e(e){if(fe()){const t=W(e);(t._||(t._=Y()))()}return Reflect.ownKeys(e)}function Y(){const[e,t]=oe(void 0,{equals:!1,internal:!0});return e.$=t,e}const me={get(e,t,n){if(t===de)return e;if(t===C)return n;const s=e[t];if(t===K||t==="__proto__")return s;const i=q(s);if(fe()&&(typeof s!="function"||e.hasOwnProperty(t))){let l,o;i&&(l=W(s))&&(o=l._||(l._=Y()),o()),l=W(e),o=l[t]||(l[t]=Y()),o()}return i?ge(s):s},set(){return!0},deleteProperty(){return!0},ownKeys:$e,getOwnPropertyDescriptor:_e};function pe(e,t,n){if(e[t]===n)return;const s=Array.isArray(e),i=e.length,l=n===void 0,o=s||l===t in e;l?delete e[t]:e[t]=n;let r=W(e),c;(c=r[t])&&c.$(),s&&e.length!==i&&(c=r.length)&&c.$(),o&&(c=r._)&&c.$()}function De(e,t){const n=Object.keys(t);for(let s=0;s<n.length;s+=1){const i=n[s];pe(e,i,t[i])}}function $(e,t,n=[]){let s,i=e;if(t.length>1){s=t.shift();const o=typeof s,r=Array.isArray(e);if(Array.isArray(s)){for(let c=0;c<s.length;c++)$(e,[s[c]].concat(t),n);return}else if(r&&o==="function"){for(let c=0;c<e.length;c++)s(e[c],c)&&$(e,[c].concat(t),n);return}else if(r&&o==="object"){const{from:c=0,to:u=e.length-1,by:f=1}=s;for(let p=c;p<=u;p+=f)$(e,[p].concat(t),n);return}else if(t.length>1){$(e[s],t,[s].concat(n));return}i=e[s],n=[s].concat(n)}let l=t[0];typeof l=="function"&&(l=l(i,n),l===i)||s===void 0&&l==null||(l=G(l),s===void 0||q(i)&&q(l)&&!Array.isArray(l)?De(i,l):pe(e,s,l))}function Ke(e,t){const n=G(e||{}),s=ge(n);function i(...l){re(()=>$(n,l))}return[s,i]}export{Le as F,Be as S,je as a,ke as b,Ke as c,Re as d,V as e,Ue as f,Ce as i,be as o,Ie as r,Fe as s,Me as t};
