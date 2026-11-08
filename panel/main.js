"use strict";(()=>{var R="openchamber.sdk";var ht="data-oc-scrolling",Ft=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [${ht}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${ht}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${ht}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${ht}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function zt(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",r=>{let i=r.target===e?t:r.target;if(!(i instanceof Element))return;i.hasAttribute("data-oc-scrolling")||i.setAttribute("data-oc-scrolling","");let c=o.get(i);c!==void 0&&clearTimeout(c),o.set(i,setTimeout(()=>{o.delete(i),i.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Xr=`(${zt.toString()})(document);`;var un=/^[a-z][a-z0-9-]{0,39}$/;var ln=e=>Object(e)===e&&!Array.isArray(e),Kt=(e,t)=>Object.keys(e).every(o=>t.includes(o)),dn=e=>String(e)===e&&e.length>=1&&e.length<=60,pn=e=>String(e)===e&&e.length>=1&&e.length<=80,fn=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let o of e){if(!ln(o)||!un.test(o.id)||!dn(o.label)||o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1||t.has(o.id))return!1;if(t.add(o.id),o.kind==="button"){if(!Kt(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!Kt(o,["kind","id","label","value","options","disabled"])||!pn(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let r=new Set;for(let i of o.options){if(!ln(i)||!Kt(i,["value","label"])||!pn(i.value)||!dn(i.label)||r.has(i.value))return!1;r.add(i.value)}if(!r.has(o.value))return!1}return!0};var En=["{id}","{segment}","{segments+}"];var Ei=new Set(En);var _n=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var mi=new Set(_n);var jt=e=>"bytes"in e?e.bytes.byteLength:e.content.length,mn=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==t.bytes[o])return!1;return!0};var Sn=/^[A-Za-z0-9_-]{1,80}$/;var Tn=["left","right","top","bottom"];var gn=(e,t=0,o={remaining:16e3})=>{if(--o.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of r)if(!gn(i,t+1,o))return!1;return!0},Wt=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Wt);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Wt)}return String(e)===e||Number.isFinite(e)},qt=e=>{try{return String(e.id)!==e.id||!Sn.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Tn.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!gn(e.data)||!Wt(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var Zt=2e3;var kn=["file","directory","other","missing"],Qt=e=>!!(e&&"sessionId"in e),Yt=e=>!!(e&&"sent"in e&&!("sessionId"in e));var xn=/^[0-9a-f]{7,64}$/i,eo=e=>xn.test(e),kt=500,xt=32e3,bn=16e3,An=128,On=200,Rn=2e3,yn=16e3,vn=80,In=200,wn=16e3;var Cn=2e3;var to=2e4,bt=1024,At=2e6;var Ot=64e3,Rt=8e3,oo=4e3;var no=96e4,Br=60*6e4;var Un=999,Mn=1e4,st=500,Nn=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Ln=["stopped","starting","ready","failed"],Fr=new Set(Nn),Pn=e=>Fr.has(e),Dn=e=>e&&Pn(e)?e:"HOST_REJECTED",We=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(We):Object(e)===e?Object.values(e).every(We):!1,Gn=e=>We(e)&&JSON.stringify(e).length<=wn,hn=e=>e?.trim().slice(0,In)??"",qe=e=>{let t=e.id.trim().slice(0,An),o=e.title.trim().slice(0,On),r=e.url.trim().slice(0,Rn),i=e.text?.trim().slice(0,yn),c=e.author?.trim().slice(0,vn),d=e.kind==="pull"?"pull":"issue",p={providerId:e.providerId.trim(),id:t,title:o||t,url:r,kind:d};if(i&&(p.text=i),c&&(p.author=c),d==="pull"){let m=hn(e.branches?.head),b=hn(e.branches?.base);m&&b&&(p.branches={head:m,base:b})}return Gn(e.data)&&(p.data=e.data),p},ro=e=>{let t=qe(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},so=e=>{let t={text:e.text.trim().slice(0,bn)};return e.send&&(t.send=!0),t},io=e=>e===null||!Number.isFinite(e)?null:Math.min(Un,Math.max(0,Math.round(e))),ao=e=>Number.isFinite(e)?Math.min(Mn,Math.max(0,Math.ceil(e))):0;var Je=e=>e.length>0&&e.length<=bt&&!e.includes("\0")&&!e.includes("\\");var yt=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Cn?!1:!e.split("/").some(o=>o==="."||o===".."),zr=new Set(Ln),co=e=>!!(e&&"status"in e&&zr.has(String(e.status))&&!("body"in e)),vt=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),lo=e=>!!(e&&"content"in e&&String(e.content)===e.content),po=e=>!!(e&&"written"in e&&e.written===!0),uo=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),Kr=new Set(kn),fo=e=>!!(e&&"kind"in e&&"size"in e&&Kr.has(String(e.kind))&&Number.isFinite(e.size)),Eo=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),jr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Wr=e=>Object(e)===e?e:null,Jt=e=>String(e)===e&&e.length>0,qr=e=>{if(!Jt(e.id))return null;if(e.ok===!0){let t={channel:R,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&Jt(e.error)?{channel:R,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:Dn(Jt(e.code)?e.code:void 0)}:null},_o=e=>{let t=Wr(e);return!t||t.channel!==R||t.v!==1?null:t.type==="result"?qr(t):!jr.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var Hn=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Jr=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",h=class extends Error{code;constructor(t,o){super(o),this.name="HostRequestError",this.code=t}},Vn=()=>Promise.reject(new h("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),It=()=>Promise.reject(new h("BAD_PATH",`File path must be 1 to ${bt} characters without NUL or backslash.`)),wt=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new h("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},x=e=>(e.value+=1,`oc-${e.value}`),ho=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new h("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??(n=>n===t.parent),r=e.requestTimeoutMs??to,i=new Set,c=new Set,d=new Set,p=new Set,m=new Set,b=new Set,C=new Set,O=new Set,N=new Set,X=new Set,j=new Set,k=new Set,U=[],I=null,ee=null,se=new Set,Ne=new Set,Ie=null,we=null,je=!1,ge=new Map,he=new Map,ke=new Map,ie=!1,u={value:0},f=null,xe=null,nt=!1,rt=!1,Jo=null,Zo=n=>n?{sessionId:n.id,phase:n.busy?"started":"completed"}:null,ae=n=>{t.parent.postMessage(n,"*")},Qo=()=>{ie||t.parent===t||k.size===0||f?.features?.lateGenerateResults!==!0||ae({channel:R,v:1,type:"generate-late-listen"})},G=(n,a)=>{for(let T of n)try{T(a)}catch(g){console.error(g)}},Yo=n=>{if(!(n instanceof MessageEvent)||!o(n.source))return;let a=_o(n.data);if(!a)return;if(a.type==="workspace"){let g=he.get(a.payload.subscriptionId);g&&G([g],a.payload.snapshot);return}if(a.type==="shells"){let g=ke.get(a.payload.subscriptionId);g&&G([g],a.payload.snapshot);return}if(a.type==="ready"){f=a.payload,xe=Zo(a.payload.session),G(i,a.payload),G(c,a.payload.directory),G(d,a.payload.session),xe&&G(p,xe),G(m,a.payload.connection),G(b,a.payload.settings),G(C,a.payload.item),a.payload.block&&G(O,a.payload.block),Qo();return}if(a.type==="service-event"){G(N,a.payload);return}if(a.type==="generate-late"){k.size===0?U.push(a.payload):G(k,a.payload);return}if(a.type==="directory"){f&&(f={...f,directory:a.payload.directory}),G(c,a.payload.directory);return}if(a.type==="session"){f&&(f={...f,session:a.payload.session}),a.payload.session?xe?.sessionId!==a.payload.session.id&&(xe=Zo(a.payload.session)):xe=null,G(d,a.payload.session);return}if(a.type==="session-lifecycle"){xe=a.payload,G(p,a.payload);return}if(a.type==="connection"){f&&(f={...f,connection:a.payload.connection}),G(m,a.payload.connection);return}if(a.type==="settings"){f&&(f={...f,settings:a.payload.settings}),G(b,a.payload.settings);return}if(a.type==="item"){f&&(f={...f,item:a.payload.item}),G(C,a.payload.item);return}if(a.type==="status-control-event"){G(X,a.payload);return}if(a.type==="popover-closed"){G(j,a.payload);return}if(a.type==="action"){let g=M=>{ie||ae({channel:R,v:1,type:"action-result",id:a.id,payload:M})},L=ee;if(!L){g({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>L(a.payload)).then(()=>g({ok:!0}),M=>{let z=(M instanceof Error?M.message:String(M)).trim();g({ok:!1,error:(z||"Action failed.").slice(0,st)})});return}if(a.type==="file-open"){let g=a.payload;if(we&&mn(we,g))return;we=g,G(se,a.payload);return}if(a.type==="file-saved"){G(Ne,a.payload.version);return}if(a.type==="file-snapshot"){let g=z=>{ie||ae({channel:R,v:1,type:"file-snapshot-result",id:a.id,payload:z})},L=z=>g({error:(z.trim()||"Could not read the edited file.").slice(0,st)}),M=Ie;if(!M){L("This extension does not edit files.");return}Promise.resolve().then(()=>M(a.payload.purpose)).then(z=>{if(jt(z)>2e7){L(`The file is over ${2e7} ${"bytes"in z?"bytes":"characters"}.`);return}if(z.version.length>256){L(`The snapshot version is over ${256} characters.`);return}g({snapshot:"bytes"in z?{bytes:z.bytes,version:z.version}:{content:z.content,version:z.version}})},z=>L(z instanceof Error?z.message:String(z)));return}if(a.type==="resolve"){let g=M=>{ae({channel:R,v:1,type:"resolve-result",id:a.id,payload:M})},L=I;if(!L){g({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>L(a.payload)).then(M=>g({item:M?qe(M):null}),M=>{let z=(M instanceof Error?M.message:String(M)).trim();g({error:(z||"Command failed.").slice(0,st)})});return}let T=ge.get(a.id);if(T){if(clearTimeout(T.timer),ge.delete(a.id),a.ok){T.resolve(a.payload);return}T.reject(new h(a.code,a.error))}};t.addEventListener("message",Yo),ae({channel:R,v:1,type:"hello"});let Q=(n,a=r)=>ie||t.parent===t?Promise.reject(new h("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((T,g)=>{let L=setTimeout(()=>{ge.delete(n.id),g(new h("HOST_TIMEOUT","Host did not answer in time."))},a);ge.set(n.id,{resolve:T,reject:g,timer:L}),ae(n)}),$=n=>Q(n).then(()=>{}),F={channel:R,v:1},Xt=n=>{!ie&&t.parent!==t&&ae(n)},en=()=>Xt({...F,type:"file-save"}),tn=n=>{!Hn(n)||!Jr(n)||(n.preventDefault(),en())},on=n=>{!Hn(n)||n.key!=="Escape"||f?.surface!=="popover"||!f.popover||(n.preventDefault(),an(f.popover.id,"escape").catch(()=>{}))},St=()=>{let n=f?.surface==="popover"?f.popover:void 0;if(!n)return;let a=nt||rt;Jo!==a&&(Jo=a,cn(n.id,a).catch(()=>{}))},Tt=()=>{f?.surface!=="popover"||nt||(nt=!0,St())},nn=n=>{f?.surface!=="popover"||n.relatedTarget!==null||!nt||(nt=!1,St())},rn=()=>{f?.surface!=="popover"||rt||(rt=!0,St())},sn=()=>{f?.surface!=="popover"||!rt||(rt=!1,St())},_e=(n,a=1024)=>{if(!n.trim()||n.length>a)throw new h("HOST_REJECTED",`Identity must contain 1 to ${a} characters.`)},$t=async n=>{n.kind!=="projects"&&_e(n.projectId);let a=await Q({...F,type:"workspace-read",id:x(u),payload:n});if(!a||!("kind"in a)||!("state"in a)||a.kind!==n.kind)throw new h("HOST_REJECTED","Host did not return workspace data.");return a},Bt=async(n,a)=>{n.kind!=="projects"&&_e(n.projectId);let T=x(u);he.set(T,a);try{await $({...F,type:"workspace-subscribe",id:x(u),payload:{subscriptionId:T,query:n}})}catch(g){throw he.delete(T),ie||ae({...F,type:"workspace-unsubscribe",id:x(u),payload:{subscriptionId:T}}),g}return()=>{!he.delete(T)||ie||ae({...F,type:"workspace-unsubscribe",id:x(u),payload:{subscriptionId:T}})}},Vr=async(n,a)=>{n.kind==="session"&&_e(n.sessionId),n.kind==="project"&&_e(n.projectId);let T=x(u);ke.set(T,a);try{await $({...F,type:"shells-subscribe",id:x(u),payload:{subscriptionId:T,scope:n}})}catch(g){throw ke.delete(T),ie||ae({...F,type:"shells-unsubscribe",id:x(u),payload:{subscriptionId:T}}),g}return()=>{!ke.delete(T)||ie||ae({...F,type:"shells-unsubscribe",id:x(u),payload:{subscriptionId:T}})}},gt=async n=>{if("key"in n&&(n.key.length===0||n.key.length>128))throw new h("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(n.op==="set"&&!We(n.value))throw new h("HOST_REJECTED","Storage values must be JSON.");if(n.op==="set"&&new TextEncoder().encode(JSON.stringify(n.value)).length>65536)throw new h("HOST_REJECTED","Storage value exceeds 64 KiB.");if(n.scope==="device"&&f?.features?.deviceStorage!==!0)throw new h("UNSUPPORTED","This host does not support device storage.");let a=await Q({...F,type:"storage",id:x(u),payload:n});if(!a||!("storage"in a)||a.op!==n.op)throw new h("HOST_REJECTED","Host did not return storage data.");return a},an=(n,a)=>f?.features?.popovers!==!0&&!(f?.surface==="popover"&&f.popover?.id===n)?Promise.reject(new h("UNSUPPORTED","This host does not support popovers.")):$({...F,type:"popover-close",id:x(u),payload:a?{id:n,reason:a}:{id:n}}),cn=(n,a)=>f?.features?.popovers!==!0&&!(f?.surface==="popover"&&f.popover?.id===n)?Promise.reject(new h("UNSUPPORTED","This host does not support popovers.")):$({...F,type:"popover-anchor",id:x(u),payload:{id:n,active:a}});return t.addEventListener("keydown",on,!0),t.addEventListener("pointerover",Tt),t.addEventListener("pointermove",Tt),t.addEventListener("pointerout",nn),t.addEventListener("focus",rn),t.addEventListener("blur",sn),{onAction:n=>(ee=n,()=>{ee===n&&(ee=null)}),listProjects:async()=>{let n=await $t({kind:"projects"});if(n.kind!=="projects")throw new h("HOST_REJECTED","Expected projects.");return n},listWorktrees:async n=>{let a=await $t({kind:"worktrees",projectId:n});if(a.kind!=="worktrees")throw new h("HOST_REJECTED","Expected worktrees.");return a},listSessions:async n=>{let a=await $t({kind:"sessions",projectId:n});if(a.kind!=="sessions")throw new h("HOST_REJECTED","Expected sessions.");return a},onProjects:n=>Bt({kind:"projects"},a=>{a.kind==="projects"&&n(a)}),onWorktrees:(n,a)=>Bt({kind:"worktrees",projectId:n},T=>{T.kind==="worktrees"&&a(T)}),onSessions:(n,a)=>Bt({kind:"sessions",projectId:n},T=>{T.kind==="sessions"&&a(T)}),onRunningShells:(n,a)=>Vr(n,a),readShellOutput:async(n,a)=>{_e(n,128);let T=a?.cursor;if(T!==void 0&&(!Number.isInteger(T)||T<0))throw new h("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let g=a?.tailBytes;if(g!==void 0&&(!Number.isInteger(g)||g<1||g>65536))throw new h("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let M=await Q({...F,type:"shell-output",id:x(u),payload:{shellId:n,cursor:T,tailBytes:g}});if(!M||typeof M.output!="string"||!Number.isFinite(M.cursor))throw new h("HOST_REJECTED","Host did not return shell output.");return M},stopShell:async n=>{if(_e(n,128),(await Q({...F,type:"shell-stop",id:x(u),payload:{shellId:n}}))?.stopped!==!0)throw new h("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async n=>{_e(n),await $({...F,type:"open-session",id:x(u),payload:{sessionId:n}})},storage:{get:async(n,a)=>{let T=wt(a),g={op:"get",key:n};T&&(g.scope=T);let L=await gt(g);return L.op==="get"&&L.found?L.value:void 0},set:async(n,a,T)=>{let g=wt(T),L={op:"set",key:n,value:a};g&&(L.scope=g),await gt(L)},delete:async(n,a)=>{let T=wt(a),g={op:"delete",key:n};T&&(g.scope=T),await gt(g)},keys:async n=>{let a=wt(n),T={op:"keys"};a&&(T.scope=a);let g=await gt(T);if(g.op!=="keys")throw new h("HOST_REJECTED","Expected storage keys.");return g.keys}},onReady:n=>(i.add(n),f&&n(f),()=>{i.delete(n)}),onDirectory:n=>(c.add(n),f&&n(f.directory),()=>{c.delete(n)}),onSession:n=>(d.add(n),f&&n(f.session),()=>{d.delete(n)}),onSessionLifecycle:n=>(p.add(n),xe&&n(xe),()=>{p.delete(n)}),onConnection:n=>(m.add(n),f&&n(f.connection),()=>{m.delete(n)}),onSettings:n=>(b.add(n),f&&n(f.settings),()=>{b.delete(n)}),onItem:n=>(C.add(n),f&&n(f.item),()=>{C.delete(n)}),onBlock:n=>(O.add(n),f?.block&&n(f.block),()=>{O.delete(n)}),onServiceEvent:n=>(N.add(n),()=>{N.delete(n)}),onStatusControl:n=>(X.add(n),()=>{X.delete(n)}),onPopoverClosed:n=>(j.add(n),()=>{j.delete(n)}),setStatusControls:n=>f?.features?.statusControls!==!0?Promise.reject(new h("UNSUPPORTED","This host does not support status controls.")):fn(n)?$({...F,type:"status-controls",id:x(u),payload:{controls:n}}):Promise.reject(new h("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:n=>f?.features?.popovers!==!0?Promise.reject(new h("UNSUPPORTED","This host does not support popovers.")):qt(n)?$({...F,type:"popover-open",id:x(u),payload:n}):Promise.reject(new h("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:an,setPopoverAnchorActive:cn,onResolve:n=>(I=n,()=>{I===n&&(I=null)}),toast:n=>{let a=n.message.trim();return!a||a.length>kt?Promise.reject(new h("HOST_REJECTED",`Toast message must contain 1 to ${kt} characters.`)):n.copy&&n.copy!==!0&&(!n.copy.text.length||n.copy.text.length>xt)?Promise.reject(new h("HOST_REJECTED",`Toast copy text must contain 1 to ${xt} characters.`)):$({channel:R,v:1,type:"toast",id:x(u),payload:{...n,message:a}})},openUrl:n=>$({channel:R,v:1,type:"open-url",id:x(u),payload:{url:n}}),openCommit:n=>eo(n)?$({channel:R,v:1,type:"open-commit",id:x(u),payload:{sha:n}}):Promise.reject(new h("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:n=>$({channel:R,v:1,type:"block-answer",id:x(u),payload:{text:n.trim().slice(0,Zt)}}),openSurface:n=>$({channel:R,v:1,type:"open-surface",id:x(u),payload:{surfaceId:n}}),writeClipboard:n=>$({channel:R,v:1,type:"clipboard-write",id:x(u),payload:{text:n}}),compose:n=>$({channel:R,v:1,type:"compose",id:x(u),payload:n}),attach:n=>$({channel:R,v:1,type:"attach",id:x(u),payload:qe(n)}),startSession:async n=>{n.projectId!==void 0&&_e(n.projectId);let a=n.worktree;a&&a!==!0&&(a.kind==="existing"?_e(a.directory):(a.name!==void 0&&_e(a.name,200),a.baseBranch!==void 0&&_e(a.baseBranch,200)));let T=await Q({channel:R,v:1,type:"start-session",id:x(u),payload:ro(n)},e.requestTimeoutMs??18e4);if(!Qt(T))throw new h("HOST_REJECTED","Host did not return a session.");return T},prompt:n=>Q({channel:R,v:1,type:"prompt",id:x(u),payload:so(n)}).then(a=>{if(!Yt(a))throw new h("HOST_REJECTED","Host did not return a prompt result.");return a}),sessionLink:n=>$({channel:R,v:1,type:"session-link",id:x(u),payload:qe(n)}),close:()=>$({channel:R,v:1,type:"close",id:x(u)}),oauthStart:()=>$({channel:R,v:1,type:"oauth-start",id:x(u)}),oauthDisconnect:()=>$({channel:R,v:1,type:"oauth-disconnect",id:x(u)}),request:n=>(yt(n.path)?Q({channel:R,v:1,type:"request",id:x(u),payload:n}):Vn()).then(a=>{if(!vt(a))throw new h("HOST_REJECTED","Host request result was empty.");return a}),serviceRequest:n=>(yt(n.path)?Q({channel:R,v:1,type:"service-request",id:x(u),payload:n}):Vn()).then(a=>{if(!vt(a))throw new h("HOST_REJECTED","Host service request result was empty.");return a}),serviceStatus:()=>Q({channel:R,v:1,type:"service-status",id:x(u)}).then(n=>{if(!co(n))throw new h("HOST_REJECTED","Host did not return service status.");return n}),readFile:n=>(Je(n)?Q({channel:R,v:1,type:"file-read",id:x(u),payload:{path:n}}):It()).then(a=>{if(!lo(a))throw new h("HOST_REJECTED","Host did not return file content.");return a}),writeFile:(n,a)=>Je(n)?a.length>At?Promise.reject(new h("FILE_TOO_LARGE",`Content is over ${At} characters.`)):Q({channel:R,v:1,type:"file-write",id:x(u),payload:{path:n,content:a}}).then(T=>{if(!po(T))throw new h("HOST_REJECTED","Host did not confirm the write.");return T}):It(),listDir:n=>(Je(n)?Q({channel:R,v:1,type:"file-list",id:x(u),payload:{path:n}}):It()).then(a=>{if(!uo(a))throw new h("HOST_REJECTED","Host did not return directory entries.");return a}),stat:n=>(Je(n)?Q({channel:R,v:1,type:"file-stat",id:x(u),payload:{path:n}}):It()).then(a=>{if(!fo(a))throw new h("HOST_REJECTED","Host did not return file status.");return a}),generate:n=>{let a=n.prompt.trim(),T=n.system?.trim();if(a.length===0||a.length>Ot)return Promise.reject(new h("HOST_REJECTED",`Prompt must be 1 to ${Ot} characters.`));if(T!==void 0&&(T.length===0||T.length>Rt))return Promise.reject(new h("HOST_REJECTED",`System prompt must be 1 to ${Rt} characters.`));let g=n.maxOutputTokens===void 0?void 0:Math.min(oo,Math.max(1,Math.floor(n.maxOutputTokens)));if(g!==void 0&&!Number.isFinite(g))return Promise.reject(new h("HOST_REJECTED","maxOutputTokens must be a number."));let L={prompt:a};return T!==void 0&&(L.system=T),g!==void 0&&(L.maxOutputTokens=g),Q({channel:R,v:1,type:"generate",id:x(u),payload:L},e.requestTimeoutMs??no).then(M=>{if(!Eo(M))throw new h("HOST_REJECTED","Host did not return generated text.");return M})},onLateGenerateResult:n=>{k.add(n);for(let a of U.splice(0))G([n],a);return Qo(),()=>{k.delete(n)}},setBadge:n=>$({channel:R,v:1,type:"badge",id:x(u),payload:{count:io(n)}}),setHeight:n=>$({channel:R,v:1,type:"resize",id:x(u),payload:{height:ao(n)}}),onFileOpen:n=>(se.add(n),je||(je=!0,t.addEventListener("keydown",tn,!0)),we&&n(we),()=>{se.delete(n)}),onFileSnapshot:n=>(Ie=n,()=>{Ie===n&&(Ie=null)}),onFileSaved:n=>(Ne.add(n),()=>{Ne.delete(n)}),reportFileChange:n=>Xt({...F,type:"file-change",payload:{dirty:n.dirty,edited:n.edited}}),requestFileSave:en,reportFileUnsupported:()=>Xt({...F,type:"file-unsupported"}),dispose:()=>{for(let n of he.keys())ae({...F,type:"workspace-unsubscribe",id:x(u),payload:{subscriptionId:n}});he.clear();for(let n of ke.keys())ae({...F,type:"shells-unsubscribe",id:x(u),payload:{subscriptionId:n}});ke.clear(),ie=!0,I=null,ee=null,Ie=null,se.clear(),Ne.clear(),je&&t.removeEventListener("keydown",tn,!0),t.removeEventListener("message",Yo),t.removeEventListener("keydown",on,!0),t.removeEventListener("pointerover",Tt),t.removeEventListener("pointermove",Tt),t.removeEventListener("pointerout",nn),t.removeEventListener("focus",rn),t.removeEventListener("blur",sn);for(let n of ge.values())clearTimeout(n.timer),n.reject(new h("HOST_UNAVAILABLE","Host client was disposed."));ge.clear(),i.clear(),c.clear(),d.clear(),p.clear(),m.clear(),b.clear(),C.clear(),O.clear(),N.clear(),X.clear(),j.clear(),k.clear(),U.length=0}}};var Bn=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Ci=new Set(Bn);var Zr=10*6e4;var Qr=10*6e4;var Yr=10*6e4;var es=10*6e4;var Fn=["none","agent","user"];var Mi=new Set(Fn);var ts=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],os=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],zn=(e,t)=>{t.style.colorScheme=e.mode;for(let[o,r]of ts)t.style.setProperty(o,e.tokens[r]);for(let[o,r,i]of os){let c=e.tokens[i]??"";t.style.setProperty(o,c),t.style.setProperty(r,c)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},ko=(e,t)=>{zn(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var ns={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},P=(e,t)=>`var(--${e}, var(--oc-${ns[e]}, ${t}))`,Ae=P("surface-background","transparent"),Ut=P("surface-elevated","transparent"),Ze=P("surface-elevated-foreground","inherit"),ce=P("surface-foreground","inherit"),H=P("surface-muted-foreground","gray"),rs=P("surface-muted","transparent"),Le=P("interactive-border","currentColor"),te=P("interactive-hover","transparent"),Pe=P("interactive-active","transparent"),xo=P("interactive-selection","transparent"),bo=P("interactive-selection-foreground","inherit"),be=P("primary","currentColor"),Ao=P("primary-text","inherit"),Oo=P("error-text","inherit"),ss=P("font-sans","inherit"),Ro=P("font-mono","monospace"),qn=P("radius","9px"),yo=`calc(${qn} - 2px)`,Kn=`calc(${qn} - 4px)`,V=(e,t,o="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${o})`,jn=`background-image: linear-gradient(${te}, ${te});`,vo=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,Io="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Wn="box-shadow: var(--oc-sdk-lit);",wo=`inset 0 0.5px 0 0 ${V(ce,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,is=`
:root {
  --oc-sdk-edge: ${V(ce,16)};
  --oc-sdk-field-bg: ${Ut};
  --oc-sdk-raised-bg: ${Ae};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${V(ce,14)};
  --oc-sdk-field-bg: ${V(Ae,50,Ut)};
  --oc-sdk-raised-bg: ${Ut};
  --oc-sdk-field-lift: ${wo};
  --oc-sdk-raised-lift: ${wo};
  --oc-sdk-lit: ${wo};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Ct=e=>{let t=P(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${P(`${e}-text`,"inherit")}; }`},as=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: 2px; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,Jn=`${is}
.oc-sdk { color: ${ce}; font-family: ${ss}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${jn} }
.oc-sdk-mono { font-family: ${Ro}; }
.oc-sdk-muted { color: ${H}; }
${Ct("success")}${Ct("warning")}${Ct("error")}${Ct("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${be}; --oc-sdk-tone-text: ${Ao}; }

.oc-sdk-btn { border-radius: ${yo}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Kn}; }
.oc-sdk-btn[data-variant="default"] { color: ${Ao}; background: ${V(be,10,Ae)}; border-color: ${V(be,12)}; ${Wn} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${V(be,16,Ae)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${V(be,22,Ae)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${rs}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${te}, ${te}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Pe}, ${Pe}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Ze}; ${Io} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${te}, ${te}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Pe}, ${Pe}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${te}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Pe}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${P("status-error","red")}; color: ${Oo}; background: ${V("var(--oc-sdk-tone)",7,Ae)}; border-color: ${V("var(--oc-sdk-tone)",12)}; ${Wn} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${V("var(--oc-sdk-tone)",9,Ae)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${V("var(--oc-sdk-tone)",11,Ae)}; box-shadow: none; }

.oc-sdk-field-note { color: ${H}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Oo}; }
.oc-sdk-input { border-radius: ${yo}; background: var(--oc-sdk-field-bg); color: ${Ze}; ${vo("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${H}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${te}, ${te}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${vo(V(ce,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${vo(P("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Ro}; }

.oc-sdk-search-icon { color: ${H}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${be}; }
.oc-sdk-search-clear { border-radius: ${Kn}; color: ${H}; }
.oc-sdk-search-clear:hover { background: ${te}; color: ${ce}; }

.oc-sdk-trigger { border-radius: ${yo}; background: var(--oc-sdk-raised-bg); color: ${Ze}; ${Io} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${te}, ${te}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Pe}, ${Pe}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${H}; }
.oc-sdk-trigger-chevron { color: ${H}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Ze}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ut}; background-clip: padding-box; color: ${Ze}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${te}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${xo}; color: ${bo}; }
.oc-sdk-option-check { color: ${ce}; }
.oc-sdk-option[data-destructive="true"] { color: ${Oo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${V(P("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${H}; }
.oc-sdk-popup-empty { color: ${H}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Le}; border-radius: 4px; color: ${ce}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${V(ce,60,Le)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Le}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Ae}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${be}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${jn} }
.oc-sdk-check-desc { color: ${H}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${V(ce,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${H}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${ce}; }
.oc-sdk-tab[aria-selected="true"] { color: ${bo}; background: ${xo}; border-color: ${Le}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Ze}; background: var(--oc-sdk-raised-bg); ${Io} }
.oc-sdk-tab-count { color: ${H}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${V(ce,6)}; color: ${H}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${V("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${te}; }
.oc-sdk-row[aria-selected="true"] { background: ${xo}; color: ${bo}; }
.oc-sdk-row-lead { font-family: ${Ro}; color: ${H}; }
.oc-sdk-row-sub { color: ${H}; }
.oc-sdk-row-meta { color: ${H}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${H}; }

.oc-sdk-empty-body { color: ${H}; }

.oc-sdk-spinner { color: ${H}; }
.oc-sdk-spinner-ring { border-color: ${Le}; border-top-color: ${be}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${V("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${H}; }

.oc-sdk-separator { color: ${H}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${V(Le,40)}; }

.oc-sdk-progress-label { color: ${H}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${V(ce,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${be}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${P("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${P("success-text","inherit")}; }

.oc-sdk-text a { color: ${Ao}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${V(Le,60)}; }
`,W=`
${Ft}
${as}
${Jn}`;var Zn="oc-sdk-ui-style",Qe=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},q=e=>{let t=document.getElementById(Zn);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}zt(document);let o=document.createElement("style");o.id=Zn,o.textContent=e,document.head.appendChild(o)},w=(e,t)=>{let o=document.createElement(e);return t&&(o.className=t),o},Se=e=>{let t=w("button",e);return t.type="button",t},le=(e,t)=>{let o=t??"";e.textContent!==o&&(e.textContent=o)},De=(e,t,o)=>{o==null||o===""?e.removeAttribute(t):e.getAttribute(t)!==o&&e.setAttribute(t,o)},Qn=(e,t)=>{let o=r=>{r.target instanceof Node&&e.contains(r.target)||t()};return document.addEventListener("pointerdown",o,!0),()=>{document.removeEventListener("pointerdown",o,!0)}};var cs=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Ce=(e,t)=>{q(W);let o=t,r=Se("oc-sdk oc-sdk-btn"),i=cs(),c=document.createElement("span");r.append(c),e.append(r);let d=()=>{r.dataset.variant=o.variant??"default",r.dataset.size=o.size??"default",r.disabled=!!o.disabled||!!o.loading,r.dataset.loading=o.loading?"true":"false",r.setAttribute("aria-busy",o.loading?"true":"false"),o.loading&&i.parentNode!==r?r.prepend(i):!o.loading&&i.parentNode===r&&i.remove(),le(c,o.label)},p=()=>{o.disabled||o.loading||o.onClick()};return r.addEventListener("click",p),d(),{update:m=>{o={...o,...m},d()},dispose:()=>{r.removeEventListener("click",p),r.remove()}}};var Yn="http://www.w3.org/2000/svg",ls={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ge=(e,t,o)=>{let r=document.createElementNS(Yn,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),o&&r.setAttribute("class",o);let i=document.createElementNS(Yn,"path");return i.setAttribute("d",ls[e]),r.append(i),r};var He=(e,t="vertical")=>{let[o,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===o||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},Ye=(e,t,o)=>{let r=e.filter(m=>!m.disabled);if(r.length===0)return null;let i=r[0],c=r[r.length-1];if(o==="first"||!i||!c)return i?.id??null;if(o==="last")return c.id;let d=r.findIndex(m=>m.id===t);return d===-1?o==="next"?i.id:c.id:r[Math.min(r.length-1,Math.max(0,d+(o==="next"?1:-1)))]?.id??null};var er=(e,t)=>`${e}-${t??""}`,Co=(e,t,o,r)=>{let i=Se("oc-sdk-option");i.id=er(e,o.id),i.setAttribute("role",t),i.tabIndex=-1,i.disabled=!!o.disabled,t==="option"&&i.setAttribute("aria-selected",o.selected?"true":"false"),i.dataset.destructive=o.destructive?"true":"false";let c=w("span","oc-sdk-option-label");if(c.textContent=o.label,i.append(c),o.hint){let d=w("span","oc-sdk-option-hint");d.textContent=o.hint,i.append(d)}if(t==="option"){i.dataset.mark="check";let d=w("span","oc-sdk-option-check");d.append(Ge("check",14)),i.append(d)}return i.addEventListener("pointerenter",r.hover),i.addEventListener("click",r.pick),i},Uo=(e,t,o,r)=>{let i=er(o,r);for(let c of Array.from(e.children))c instanceof HTMLElement&&c.classList.contains("oc-sdk-option")&&(c.dataset.active=c.id===i?"true":"false");De(t,"aria-activedescendant",r?i:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var ds=(e,t)=>{let o=t.getBoundingClientRect();e.style.minWidth=`${Math.round(o.width)}px`,e.style.left=`${Math.round(o.left)}px`,e.style.top=`${Math.round(o.bottom+4)}px`;let r=e.offsetHeight,i=window.innerHeight-o.bottom-8;r>i&&o.top-8>i&&(e.style.top=`${Math.max(8,Math.round(o.top-4-r))}px`);let c=o.left+e.offsetWidth-window.innerWidth+8;c>0&&(e.style.left=`${Math.max(8,Math.round(o.left-c))}px`)},Mo=(e,t,o,r)=>{e.append(o),ds(o,t);let i=Qn(e,r),c=()=>{r()},d=p=>{p.target instanceof Node&&o.contains(p.target)||r()};return window.addEventListener("resize",c),window.addEventListener("scroll",d,!0),()=>{i(),window.removeEventListener("resize",c),window.removeEventListener("scroll",d,!0),o.remove()}};var tr=(e,t)=>{let o=t.trim().toLowerCase();return o?e.filter(r=>r.label.toLowerCase().includes(o)||r.id.toLowerCase().includes(o)):[...e]},ps=0,No=(e,t)=>{q(W);let o=t,r=`oc-sdk-select-${ps+=1}`,i=w("div","oc-sdk oc-sdk-select"),c=w("span","oc-sdk-field-label");c.id=`${r}-label`;let d=Se("oc-sdk-trigger");d.setAttribute("aria-haspopup","listbox"),d.setAttribute("aria-labelledby",c.id);let p=w("span","oc-sdk-trigger-value");d.append(p,Ge("chevron",14,"oc-sdk-trigger-chevron")),i.append(c,d),e.append(i);let m="",b=null,C=null,O=w("div","oc-sdk oc-sdk-popup"),N=w("div","oc-sdk-popup-search"),X=w("input","oc-sdk-input");X.type="text",X.autocomplete="off",N.append(X);let j=w("div");j.setAttribute("role","listbox"),j.tabIndex=-1,O.append(j);let k=()=>tr(o.options,o.searchable?m:""),U=()=>o.searchable?X:j,I=u=>{b=u,Uo(j,U(),r,u)},ee=()=>{Qe(j);let u=k();if(u.length===0){let f=w("div","oc-sdk-popup-empty");f.textContent="No matches",j.append(f)}for(let f of u)j.append(Co(r,"option",{...f,selected:f.id===o.value},{hover:()=>I(f.id),pick:()=>Ie(f.id)}));I(u.some(f=>f.id===b)?b:u[0]?.id??null)},se=()=>{let u=C;C=null,u?.(),m="",X.value="",d.setAttribute("aria-expanded","false")},Ne=()=>{C||o.disabled||(b=o.value,X.placeholder=o.searchPlaceholder??"Search",o.searchable?O.prepend(N):N.remove(),ee(),C=Mo(i,d,O,se),d.setAttribute("aria-expanded","true"),U().focus())},Ie=u=>{se(),d.focus(),u!==o.value&&o.onChange(u)},we=()=>{C?se():Ne()},je=u=>{!C&&He(u)&&(u.preventDefault(),Ne())},ge=u=>{let f=He(u);f?(u.preventDefault(),I(Ye(k(),b,f))):u.key==="Enter"?(u.preventDefault(),b&&Ie(b)):u.key==="Escape"?(u.preventDefault(),se(),d.focus()):o.searchable&&u.target!==X&&u.key.length===1&&!u.ctrlKey&&!u.metaKey&&X.focus()},he=()=>{m=X.value,ee()},ke=u=>{C&&!(u.relatedTarget instanceof Node&&i.contains(u.relatedTarget))&&se()},ie=()=>{le(c,o.label),c.hidden=!o.label;let u=o.options.find(f=>f.id===o.value);le(p,u?.label??o.placeholder??"Select"),p.dataset.empty=u?"false":"true",d.disabled=!!o.disabled,C&&ee()};return d.addEventListener("click",we),d.addEventListener("keydown",je),O.addEventListener("keydown",ge),X.addEventListener("input",he),i.addEventListener("focusout",ke),ie(),{update:u=>{o={...o,...u},ie()},dispose:()=>{se(),d.removeEventListener("click",we),d.removeEventListener("keydown",je),O.removeEventListener("keydown",ge),X.removeEventListener("input",he),i.removeEventListener("focusout",ke),i.remove()}}};var fs=/^[a-z0-9][a-z0-9-]{0,63}$/,Es=new Set(["all","new"]),oe=class extends Error{constructor(t){super(t),this.name="GroupFileError"}},_s=[{id:"macos-ui",name:"macOS UI",skillIds:["appkit-interop","swiftui-patterns","window-management","liquid-glass","view-refactor"]},{id:"macos-build",name:"macOS \u6784\u5EFA",skillIds:["build-run-debug","test-triage","swiftpm-macos","signing-entitlements","packaging-notarization","telemetry"]},{id:"reverse",name:"\u9006\u5411\u5DE5\u7A0B",skillIds:["reverse-engineering-unpacking","kuna-decompiler","reverse-engineer-anything"]},{id:"cloudflare",name:"Cloudflare",skillIds:["cloudflare","workers-best-practices","wrangler"]},{id:"video",name:"\u89C6\u9891",skillIds:["yichen-jianying-edit"]},{id:"browser",name:"\u6D4F\u89C8\u5668",skillIds:["browser-skill"]}],ms=()=>_s.map(e=>({...e,skillIds:[...e.skillIds]})),Mt=e=>{let t=new Set(e.map(i=>i.id)),o=new Set(e.map(i=>i.name.trim().toLowerCase())),r=ms().filter(i=>{let c=i.name.toLowerCase();return t.has(i.id)||o.has(c)?!1:(t.add(i.id),o.add(c),!0)});return{groups:[...e,...r],added:r}},or=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new oe("\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E");let t=e;if(t.version!==1)throw new oe("\u5206\u7EC4\u914D\u7F6E\u7248\u672C\u4E0D\u53D7\u652F\u6301");if(!Array.isArray(t.groups))throw new oe("\u5206\u7EC4\u5217\u8868\u683C\u5F0F\u4E0D\u6B63\u786E");if(t.groups.length>50)throw new oe("\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 50 \u4E2A");let o=[],r=new Set,i=new Set;for(let[c,d]of t.groups.entries()){if(!d||typeof d!="object"||Array.isArray(d))throw new oe(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E`);let p=d;if(typeof p.id!="string"||!fs.test(p.id)||Es.has(p.id))throw new oe(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548`);if(r.has(p.id))throw new oe(`\u5206\u7EC4 ID \u91CD\u590D\uFF1A${p.id}`);let m=typeof p.name=="string"?p.name.trim():"";if(!m||m.length>40||/[\u0000-\u001f\u007f]/.test(m))throw new oe(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-40 \u4E2A\u5B57\u7B26`);let b=m.toLowerCase();if(i.has(b))throw new oe(`\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A${m}`);if(!Array.isArray(p.skillIds))throw new oe(`\u5206\u7EC4\u300C${m}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E`);if(p.skillIds.length>200)throw new oe(`\u5206\u7EC4\u300C${m}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 200 \u4E2A`);let C=[],O=new Set;for(let N of p.skillIds){if(typeof N!="string"||!N||N.length>128)throw new oe(`\u5206\u7EC4\u300C${m}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID`);O.has(N)||(O.add(N),C.push(N))}r.add(p.id),i.add(b),o.push({id:p.id,name:m,skillIds:C})}return{version:1,groups:o}};var Lo=["\u4F60\u662F\u6280\u672F\u6587\u6863\u7FFB\u8BD1\u3002\u628A\u8F93\u5165\u7684\u6280\u80FD\u540D\u79F0\u548C\u63CF\u8FF0\u7FFB\u8BD1\u6210\u7B80\u4F53\u4E2D\u6587\u3002","\u4FDD\u7559\u6280\u80FD ID\u3001\u547D\u4EE4\u3001\u6587\u4EF6\u8DEF\u5F84\u3001\u4EE3\u7801\u3001\u4EA7\u54C1\u540D\u548C\u6280\u672F\u4E13\u6709\u540D\u8BCD\uFF0C\u4E0D\u8981\u7FFB\u8BD1\u4EE3\u7801\u5757\u3002","\u4E0D\u8981\u6DFB\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown\u3002",'\u53EA\u8F93\u51FA JSON\uFF1A{"items":[{"id":"\u539F\u6837 ID","nameZh":"\u4E2D\u6587\u540D\u79F0","descriptionZh":"\u4E2D\u6587\u63CF\u8FF0"}]}'].join(""),nr=e=>JSON.stringify(e.map(t=>({id:t.id,name:t.name,description:t.description}))),Po=e=>{let t=e.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"").trim(),o=t.indexOf("{"),r=t.lastIndexOf("}");if(o<0||r<=o)return[];t=t.slice(o,r+1);let i;try{i=JSON.parse(t)}catch{return[]}let c=i&&typeof i=="object"?i:null,d=Array.isArray(i)?i:Array.isArray(c?.items)?c.items:[],p=[];for(let m of d){if(!m||typeof m!="object")continue;let b=m;typeof b.id!="string"||!b.id||typeof b.nameZh!="string"||!b.nameZh.trim()||typeof b.descriptionZh=="string"&&p.push({id:b.id.slice(0,128),nameZh:b.nameZh.trim().slice(0,300),descriptionZh:b.descriptionZh.trim().slice(0,8e3)})}return p};var rr=`:root {
  --sk-bg: var(--surface-background, var(--oc-bg, transparent));
  --sk-fg: var(--oc-fg);
  --sk-muted: var(--oc-muted);
  --sk-border: var(--oc-border);
  --sk-primary: var(--oc-primary);
  --sk-primary-fg: var(--oc-primary-fg, #fff);
  --sk-warning: var(--oc-warning);
  --sk-error: var(--oc-error);
  --sk-success: var(--oc-success);
  --sk-info: var(--oc-info);
  --ext-bg: var(--sk-bg);
}

.sk {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--sk-fg);
  font-size: 13px;
  line-height: 1.5;
}
.sk-header {
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px 10px;
  border-bottom: 1px solid var(--sk-border);
}
.sk-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 12px;
}
.sk-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}
.sk-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.sk-summary {
  margin: 0;
  color: var(--sk-fg);
  font-size: 12px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-summary-secondary {
  margin-top: -4px;
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-body {
  min-height: 0;
  flex: 1;
  overflow: auto;
  padding: 12px 16px 24px;
  scrollbar-gutter: stable;
}
.sk-notice-root:empty {
  display: none;
}
.sk-notice {
  margin: 0 0 12px;
  padding: 10px 12px;
  border-radius: var(--oc-radius, 6px);
  background: color-mix(in srgb, var(--sk-info) 7%, var(--sk-bg));
  color: var(--oc-info-text);
  font-size: 12px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-notice[data-tone="success"] {
  background: color-mix(in srgb, var(--sk-success) 7%, var(--sk-bg));
  color: var(--oc-success-text);
}
.sk-notice[data-tone="warning"] {
  background: color-mix(in srgb, var(--sk-warning) 8%, var(--sk-bg));
  color: var(--oc-warning-text);
}
.sk-notice[data-tone="error"] {
  background: color-mix(in srgb, var(--sk-error) 7%, var(--sk-bg));
  color: var(--oc-error-text);
}
.sk-notice-actions,
.sk-conflict-actions,
.sk-mini-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.sk-notice-actions {
  margin-top: 8px;
}
.sk-inline-button {
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
  background: transparent;
  color: var(--sk-fg);
  padding: 3px 8px;
  font-size: 11px;
  line-height: 1.5;
  cursor: pointer;
}
.sk-inline-button:hover:not(:disabled) {
  background: color-mix(in srgb, var(--sk-fg) 6%, transparent);
}
.sk-inline-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.sk-inline-primary {
  background: var(--sk-primary);
  border-color: var(--sk-primary);
  color: var(--sk-primary-fg);
}
.sk-inline-primary:hover:not(:disabled) {
  background: var(--sk-primary);
  filter: brightness(1.05);
}
.sk-conflicts {
  margin: 0 0 12px;
  padding: 12px;
  border: 1px solid color-mix(in srgb, var(--sk-warning) 35%, var(--sk-border));
  border-radius: var(--oc-radius, 6px);
  background: color-mix(in srgb, var(--sk-warning) 5%, transparent);
}
.sk-section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px 12px;
}
.sk-section-title {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}
.sk-section-count {
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-conflict-list {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  display: grid;
  gap: 10px;
}
.sk-conflict-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 12px;
  padding-left: 10px;
  border-left: 2px solid var(--sk-border);
}
.sk-conflict-item[data-tone="error"] {
  border-left-color: var(--sk-error);
}
.sk-conflict-item[data-tone="warning"] {
  border-left-color: var(--sk-warning);
}
.sk-conflict-copy {
  min-width: 0;
  flex: 1 1 260px;
}
.sk-conflict-copy strong {
  display: block;
  font-size: 12px;
  font-weight: 600;
}
.sk-conflict-message {
  margin: 2px 0 0;
  color: var(--sk-muted);
  font-size: 11px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-path {
  display: flex;
  gap: 4px;
  margin: 4px 0 0;
  min-width: 0;
  font-size: 10px;
  line-height: 1.5;
  color: var(--sk-muted);
  overflow-wrap: anywhere;
}
.sk-path-label {
  flex: none;
}
.sk-path code {
  min-width: 0;
  font-family: var(--oc-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  overflow-wrap: anywhere;
}
.sk-warning-details {
  margin-top: 8px;
}
.sk-warning-details summary {
  cursor: pointer;
  color: var(--sk-muted);
  font-size: 11px;
}

.sk-translation-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px 10px;
  margin-top: 2px;
}
.sk-segment {
  display: inline-flex;
  align-items: stretch;
  border: 1px solid var(--sk-border);
  border-radius: 7px;
  overflow: hidden;
  background: transparent;
}
.sk-segment-button {
  border: 0;
  border-left: 1px solid var(--sk-border);
  background: transparent;
  color: var(--sk-muted);
  padding: 3px 10px;
  min-height: 26px;
  font-size: 11px;
  line-height: 1.5;
  cursor: pointer;
}
.sk-segment-button:first-child {
  border-left: 0;
}
.sk-segment-button[aria-pressed="true"] {
  background: color-mix(in srgb, var(--sk-primary) 12%, transparent);
  color: var(--sk-fg);
}
.sk-segment-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.sk-translation-status {
  color: var(--sk-muted);
  font-size: 11px;
  line-height: 1.5;
}
.sk-groups {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0;
}
.sk-groups-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 2px 0 6px;
}
.sk-groups-edit {
  flex: none;
  align-self: flex-start;
  border-color: var(--sk-border);
  white-space: nowrap;
}
.sk-groups-edit:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.sk-group-select {
  display: none;
  flex: 1;
  min-width: 0;
}
.sk-groups-note:empty {
  display: none;
}
.sk-groups-note .sk-notice {
  margin-bottom: 8px;
}
.sk-chip {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--sk-muted);
  padding: 2px 7px;
  font-size: 11px;
  line-height: 1.5;
  cursor: pointer;
}
.sk-chip:hover {
  color: var(--sk-fg);
}
.sk-chip[aria-pressed="true"] {
  color: var(--sk-fg);
  border-color: var(--sk-border);
  background: color-mix(in srgb, var(--sk-fg) 5%, transparent);
}
.sk-groupbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px 12px;
  padding: 7px 0;
  border-top: 1px solid var(--sk-border);
  border-bottom: 1px solid var(--sk-border);
  margin-bottom: 8px;
}.sk-groupbar-text {
  min-width: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px 8px;
}
.sk-groupbar-text strong {
  font-size: 13px;
  font-weight: 600;
  overflow-wrap: anywhere;
}
.sk-group-state {
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-group-warning {
  flex-basis: 100%;
  margin: 0;
  color: var(--oc-warning-text);
  font-size: 11px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-groupbar-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.sk-group-editor-root:empty {
  display: none;
}
.sk-group-editor {
  margin: 2px 0 10px;
  padding: 10px;
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
  background: color-mix(in srgb, var(--sk-fg) 3%, transparent);
}
.sk-group-editor .sk-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}
.sk-group-editor .sk-section-title {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
}
.sk-field {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin: 0 0 8px;
}
.sk-field-label {
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-input {
  width: 100%;
  min-height: 28px;
  padding: 3px 7px;
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
  background: var(--sk-bg);
  color: var(--sk-fg);
  font: inherit;
  font-size: 12px;
}
.sk-input:disabled {
  opacity: 0.55;
}
.sk-members {
  min-width: 0;
  margin: 0 0 8px;
  padding: 6px 8px 8px;
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
}
.sk-members legend {
  padding: 0 4px;
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-members-tools {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-bottom: 2px;
}
.sk-member-list {
  display: grid;
  gap: 1px;
  max-height: 220px;
  overflow: auto;
}
.sk-check {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;
  padding: 2px 0;
  cursor: pointer;
}
.sk-check input {
  flex: none;
  margin: 3px 0 0;
  accent-color: var(--sk-primary);
}
.sk-check-copy {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.sk-check-name {
  font-size: 12px;
  line-height: 1.4;
  overflow-wrap: anywhere;
}
.sk-check-id {
  color: var(--sk-muted);
  font-size: 10px;
  line-height: 1.4;
  overflow-wrap: anywhere;
}
.sk-missing {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
}
.sk-missing-label {
  color: var(--oc-warning-text);
  font-size: 11px;
}
.sk-missing-chip {
  border: 1px dashed var(--sk-border);
  border-radius: 999px;
  background: transparent;
  color: var(--oc-warning-text);
  padding: 1px 6px;
  font-size: 10px;
  line-height: 1.5;
  cursor: pointer;
}
.sk-missing-chip:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.sk-editor-error {
  margin: 0 0 8px;
  color: var(--oc-error-text);
  font-size: 11px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-editor-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 6px;
}
.sk-editor-confirm {
  margin-top: 8px;
  padding: 8px;
  border-radius: var(--oc-radius, 6px);
  background: color-mix(in srgb, var(--sk-warning) 8%, transparent);
}
.sk-editor-confirm p {
  margin: 0 0 6px;
  color: var(--oc-warning-text);
  font-size: 11px;
  line-height: 1.5;
}
.sk-editor-hint {
  margin: 8px 0 0;
  color: var(--sk-muted);
  font-size: 10px;
  line-height: 1.5;
}
.sk-step {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 1px solid var(--sk-border);
  border-radius: 50%;
  color: var(--sk-muted);
  font-size: 10px;
  line-height: 1;
}
.sk-original-name {
  color: var(--sk-muted);
  font-size: 10px;
  overflow-wrap: anywhere;
}
.sk-segment-button:focus-visible,
.sk-chip:focus-visible,
.sk-input:focus-visible,
.sk-missing-chip:focus-visible {
  outline: 2px solid var(--oc-focus);
  outline-offset: 2px;
}

.sk-search {
  width: 100%;
  min-height: 32px;
  margin: 0 0 4px;
  padding: 4px 8px;
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
  background: transparent;
  color: var(--sk-fg);
  font-size: 12px;
}
.sk-search::placeholder {
  color: var(--sk-muted);
}
.sk-list {
  display: block;
}
.sk-skill {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--sk-border);
}
.sk-skill-main {
  min-width: 0;
}
.sk-skill-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.sk-name {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-badge {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  padding: 1px 6px;
  border: 1px solid var(--sk-border);
  border-radius: 999px;
  color: var(--sk-muted);
  font-size: 10px;
  line-height: 1.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sk-badge[data-tone="success"] {
  border-color: color-mix(in srgb, var(--sk-success) 30%, var(--sk-border));
  background: color-mix(in srgb, var(--sk-success) 8%, transparent);
  color: var(--oc-success-text);
}
.sk-badge[data-tone="warning"] {
  border-color: color-mix(in srgb, var(--sk-warning) 35%, var(--sk-border));
  background: color-mix(in srgb, var(--sk-warning) 8%, transparent);
  color: var(--oc-warning-text);
}
.sk-badge[data-tone="error"] {
  border-color: color-mix(in srgb, var(--sk-error) 35%, var(--sk-border));
  background: color-mix(in srgb, var(--sk-error) 8%, transparent);
  color: var(--oc-error-text);
}
.sk-badge[data-tone="info"] {
  border-color: color-mix(in srgb, var(--sk-info) 30%, var(--sk-border));
  color: var(--oc-info-text);
}
.sk-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 6px;
  margin-top: 4px;
}
.sk-id {
  color: var(--sk-muted);
  font-family: var(--oc-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 10px;
  overflow-wrap: anywhere;
}
.sk-desc {
  margin: 6px 0 0;
  color: var(--sk-muted);
  font-size: 12px;
  line-height: 1.5;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.sk-warn {
  margin: 6px 0 0;
  color: var(--oc-warning-text);
  font-size: 11px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-skill-action {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 5px;
  min-width: 72px;
}
.sk-action-note {
  color: var(--sk-muted);
  font-size: 10px;
  line-height: 1.4;
  white-space: nowrap;
}
.sk-switch {
  position: relative;
  flex: none;
  width: 34px;
  height: 20px;
  padding: 0;
  border: 1px solid var(--sk-border);
  border-radius: 999px;
  background: color-mix(in srgb, var(--sk-fg) 8%, transparent);
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.sk-switch .sk-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--sk-muted);
  transition: transform 0.15s ease, background 0.15s ease;
}
.sk-switch[aria-checked="true"] {
  background: var(--sk-primary);
  border-color: var(--sk-primary);
}
.sk-switch[aria-checked="true"] .sk-thumb {
  transform: translateX(14px);
  background: var(--sk-primary-fg);
}
.sk-switch:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.sk-empty {
  padding: 28px 2px;
}
.sk-empty h2 {
  margin: 0 0 5px;
  font-size: 13px;
  font-weight: 600;
}
.sk-empty p {
  margin: 0;
  max-width: 42em;
  color: var(--sk-muted);
  font-size: 12px;
}
.sk-footer {
  margin-top: 18px;
  padding-top: 12px;
  border-top: 1px solid var(--sk-border);
  color: var(--sk-muted);
  font-size: 11px;
  line-height: 1.6;
}
.sk-footer p {
  margin: 0 0 4px;
}
.sk-footer p:last-child {
  margin-bottom: 0;
}
.sk-inline-button:focus-visible,
.sk-switch:focus-visible,
.sk-search:focus-visible {
  outline: 2px solid var(--oc-focus);
  outline-offset: 2px;
}@media (max-width: 380px) {
  .sk-header,
  .sk-body {
    padding-left: 12px;
    padding-right: 12px;
  }
  .sk-skill {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .sk-skill-action {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    min-width: 0;
  }
  .sk-action-note {
    order: 2;
  }
  .sk-actions {
    width: 100%;
  }
  .sk-conflict-item {
    flex-direction: column;
  }
  .sk-translation-row {
    align-items: flex-start;
  }
  .sk-translation-status {
    flex-basis: 100%;
  }
  .sk-groupbar-actions {
    width: 100%;
  }
  .sk-groups {
    display: none;
  }
  .sk-group-select {
    display: block;
  }
  .sk-group-select .oc-sdk-select {
    gap: 0;
  }
  .sk-group-select .oc-sdk-trigger {
    width: 100%;
    height: 28px;
    border: 1px solid var(--sk-border);
    border-radius: var(--oc-radius, 6px);
    background: transparent;
    color: var(--sk-fg);
    font-size: 12px;
  }
  .sk-group-select .oc-sdk-trigger:hover,
  .sk-group-select .oc-sdk-trigger[aria-expanded="true"] {
    background-color: color-mix(in srgb, var(--sk-fg) 5%, transparent);
    background-image: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .sk-switch,
  .sk-switch .sk-thumb {
    transition: none;
  }
}
`;var sr=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
:root {
  --ext-bg: var(--surface-background, var(--oc-bg, transparent));
  --ext-space-1: 4px;
  --ext-space-2: 8px;
  --ext-space-3: 12px;
  --ext-space-4: 16px;
  --ext-space-6: 24px;
  --ext-text-small: 11px;
  --ext-text-body: 13px;
  --ext-text-title: 14px;
}
* { box-sizing: border-box; }
html, body { margin: 0; height: 100%; background: var(--ext-bg); }
body { overflow: hidden; }
#root { height: 100%; }
[hidden] { display: none !important; }
button, input, textarea, select { font: inherit; }
.ext { color: var(--oc-fg); font-family: var(--oc-font); font-size: var(--ext-text-body); line-height: 1.5; }
.ext button:focus-visible, .ext [tabindex]:focus-visible { outline: 2px solid var(--oc-focus); outline-offset: 2px; }
.ext-actions { display: flex; align-items: center; flex-wrap: wrap; gap: var(--ext-space-2); }
.ext-muted { color: var(--oc-muted); font-size: var(--ext-text-small); }
.ext-notice { margin: 0; padding: 10px 12px; border-radius: var(--oc-radius, 6px); font-size: 12px; overflow-wrap: anywhere; background: color-mix(in srgb, var(--oc-info) 7%, var(--ext-bg)); color: var(--oc-info-text); }
.ext-notice[data-tone="success"] { background: color-mix(in srgb, var(--oc-success) 7%, var(--ext-bg)); color: var(--oc-success-text); }
.ext-notice[data-tone="warning"] { background: color-mix(in srgb, var(--oc-warning) 8%, var(--ext-bg)); color: var(--oc-warning-text); }
.ext-notice[data-tone="error"] { background: color-mix(in srgb, var(--oc-error) 7%, var(--ext-bg)); color: var(--oc-error-text); }
.ext .oc-sdk-btn[data-size="sm"], .ext .oc-sdk-tab { font-size: 12px; }
.ext .oc-sdk-field-note { font-size: var(--ext-text-small); }
@media (prefers-reduced-motion: reduce) {
  .ext *, .ext *::before, .ext *::after { animation: none !important; transition: none !important; }
}
`;var ir=()=>typeof navigator<"u"&&navigator.language?navigator.language:"en",ar=e=>(e??"").toLowerCase().startsWith("zh")?"zh":"en",gs=(e,t)=>t?e.replace(/\{(\w+)\}/g,(o,r)=>Object.prototype.hasOwnProperty.call(t,r)?String(t[r]):o):e;var cr=(e,t=ir())=>{let o=t||"en",r=ar(o);return{t:(c,d)=>gs(r==="zh"?c:e[c]??c,d),get language(){return r},get locale(){return o},setLocale(c){let d=c||ir(),p=ar(d);return o=d,p===r?!1:(r=p,!0)}}},Do=e=>{document.documentElement.lang=e.language==="zh"?"zh-CN":"en"};var lr={\u6280\u80FD\u5F00\u5173:"Skills",\u91CD\u65B0\u626B\u63CF:"Rescan",\u5168\u90E8\u542F\u7528:"Enable all",\u5168\u90E8\u5173\u95ED:"Disable all",\u6280\u80FD\u8BF4\u660E\u8BED\u8A00:"Skill description language",\u7FFB\u8BD1:"Translate",\u539F\u6587:"Original",\u7F16\u8F91\u5206\u7EC4:"Edit groups",\u5173\u95ED\u7F16\u8F91:"Close editor","\u641C\u7D22\u540D\u79F0\u6216 ID":"Search name or ID",\u641C\u7D22\u6280\u80FD:"Search skills","\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002":"Manages ~/.config/opencode/skills. Disabling renames a skill entry to .disabled; OpenCode no longer loads it and the model cannot see it.","\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002":"Shows only file skills in this directory. Enable all before disabling or uninstalling the extension; rescan after skills change.",\u5168\u90E8:"All",\u5206\u7EC4\u7B5B\u9009:"Filter by group",\u51B2\u7A81:"Conflict",\u6DF7\u5408:"Mixed",\u5173\u95ED:"Disabled",\u5F00\u542F:"Enabled",\u5165\u53E3\u548C\u505C\u7528\u6587\u4EF6\u540C\u65F6\u5B58\u5728:"Both entry and disabled file exist","\u540C ID \u591A\u4E2A\u5165\u53E3":"Multiple entries for one ID","frontmatter \u65E0\u6CD5\u89E3\u6790":"Frontmatter could not be parsed",\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A:"Entry file is empty",\u5165\u53E3\u65E0\u6CD5\u8BFB\u53D6:"Entry cannot be read",\u4EC5\u624B\u52A8\u8C03\u7528:"Manual invocation only","\u6CA1\u6709 description":"No description",\u542F\u7528\u5165\u53E3:"Active entry",\u505C\u7528\u5165\u53E3:"Disabled entry",\u5165\u53E3:"Entry",\u4FDD\u7559\u542F\u7528:"Keep enabled",\u4FDD\u7559\u5173\u95ED:"Keep disabled",\u51B2\u7A81\u68C0\u67E5:"Conflict check","{blocking} \u9879\u9700\u8981\u5904\u7406 \xB7 {warnings} \u9879\u63D0\u793A":"To resolve: {blocking} \xB7 Warnings: {warnings}","\u63D0\u793A\uFF08{count}\uFF09":"Warnings ({count})","\u4EC5\u542F\u7528\u300C{name}\u300D\uFF1A\u5C06\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002":'Enable only "{name}": other skills disabled: {count}.',\u786E\u8BA4:"Confirm",\u53D6\u6D88:"Cancel","\u5C06\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002":"Skills to enable: {count}.","\u5C06\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002":"Skills to disable: {count}.",\u786E\u8BA4\u542F\u7528:"Confirm enable",\u786E\u8BA4\u5173\u95ED:"Confirm disable","\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026":"Reading skills\u2026","\u5C1A\u672A\u8BFB\u53D6\u6280\u80FD\u3002":"Skills not read yet.","\u5173\u95ED\u5165\u53E3\u6587\u6863\u540E\uFF0COpenCode \u4E0D\u4F1A\u518D\u53D1\u73B0\u8BE5\u6280\u80FD\u3002":"After disabling an entry document, OpenCode no longer discovers that skill.","\u6A21\u578B\u53EF\u89C1 {advertised} / \u5171 {total} \u4E2A \xB7 \u7EA6 {tokens} tokens/\u6B65":"Model sees {advertised} of {total} \xB7 about {tokens} tokens/step","{count} \u4E2A\u5DF2\u5173\u95ED":"Disabled: {count}","{count} \u9879\u963B\u585E\u51B2\u7A81":"Blocking conflicts: {count}",\u65E0\u963B\u585E\u51B2\u7A81:"No blocking conflicts","{count} \u9879\u63D0\u793A":"Warnings: {count}",\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6:"Skill directory cannot be read","{parts}\u3002\u4F30\u7B97\u4E0D\u542B\u5185\u7F6E\u548C\u9879\u76EE\u6280\u80FD\u3002":"{parts}. Estimates exclude built-in and project skills.","\u7FFB\u8BD1 {done}/{total}\u2026":"Translating {done}/{total}\u2026","{translated}/{total} \u5DF2\u7FFB\u8BD1":"{translated}/{total} translated","\u70B9\u201C\u7FFB\u8BD1\u201D\u751F\u6210\u4E2D\u6587":'Click "Translate" to generate Chinese',"{count} \u4E2A\u6709\u4E2D\u6587":"Chinese available: {count}",\u65E0\u6280\u80FD:"No skills",\u6709\u51B2\u7A81:"Has conflicts",\u5168\u5F00:"All on",\u5168\u5173:"All off",\u90E8\u5206:"Partial","\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}":"Cannot read group configuration: {error}",\u91CD\u65B0\u8BFB\u53D6:"Reload","\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002\u70B9\u300C\u7F16\u8F91\u5206\u7EC4\u300D\u65B0\u5EFA\uFF0C\u6216\u5728\u7F16\u8F91\u5668\u91CC\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4\u3002":'No groups yet. Click "Edit groups" to create one, or import example groups in the editor.',"\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0\u3002":"Enter a group name.","\u5206\u7EC4\u540D\u79F0\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A\u5B57\u7B26\u3002":"Group names cannot exceed {count} characters.","\u5DF2\u7ECF\u6709\u540D\u4E3A\u300C{name}\u300D\u7684\u5206\u7EC4\u3002":'A group named "{name}" already exists.',"\u5206\u7EC4\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u6210\u5458\u3002":"A group needs at least one member.","\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C{name}\u300D\u3002":'Group "{name}" saved.',"\u5DF2\u5220\u9664\u5206\u7EC4\u3002":"Group deleted.","\u793A\u4F8B\u5206\u7EC4\u7684\u540D\u79F0\u6216 ID \u90FD\u5DF2\u5B58\u5728\uFF0C\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u5206\u7EC4\u3002":"Every example group name or ID already exists; nothing to import.","\u5DF2\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\u3002":"Example groups imported: {count}.",\u9009\u62E9\u5206\u7EC4:"Choose a group",\u65B0\u5EFA\u5206\u7EC4:"New group",\u540D\u79F0:"Name","\u4F8B\u5982\uFF1A\u65E5\u5E38\u5F00\u53D1":"e.g. Daily development","\u6210\u5458\uFF08{count}\uFF09":"Members ({count})",\u5168\u9009:"Select all",\u6E05\u7A7A:"Clear","\u76EE\u5F55\u4E2D\u7F3A\u5931\uFF1A":"Missing from the directory:",\u4ECE\u5206\u7EC4\u79FB\u9664\u8FD9\u4E2A\u7F3A\u5931\u6210\u5458:"Remove this missing member from the group",\u5220\u9664\u5206\u7EC4:"Delete group",\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4:"Import example groups",\u4FDD\u5B58\u66F4\u6539:"Save changes","\u5220\u9664\u5206\u7EC4\u300C{name}\u300D\uFF1F\u6280\u80FD\u672C\u8EAB\u4E0D\u4F1A\u88AB\u5220\u9664\u3002":'Delete group "{name}"? The skills themselves are not deleted.',\u672A\u547D\u540D:"Unnamed",\u786E\u8BA4\u5220\u9664:"Confirm delete","\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\uFF1F\u5DF2\u6709\u540C\u540D\u6216\u540C ID \u7684\u5206\u7EC4\u4F1A\u8DF3\u8FC7\uFF0C\u5F53\u524D\u5206\u7EC4\u4E0D\u4F1A\u88AB\u8986\u76D6\u3002":"Import example groups: {count}? Groups with the same name or ID are skipped; the current group is not overwritten.",\u786E\u8BA4\u5BFC\u5165:"Confirm import","\u5206\u7EC4\u53EA\u5F71\u54CD\u9762\u677F\u7B5B\u9009\u548C\u6279\u91CF\u5F00\u5173\uFF0C\u4E0D\u6539\u53D8\u6280\u80FD\uFF1B\u6210\u5458\u987A\u5E8F\u51B3\u5B9A\u7EC4\u5185\u6B65\u9AA4\u53F7\uFF0C\u4FDD\u5B58\u540E\u5199\u5165 groups.json\u3002":"Groups only affect panel filtering and bulk toggles; they do not change skills. Member order sets step numbers and is saved to groups.json.","\u5168\u90E8 {count}":"All {count}","\u6B63\u5728\u8BFB\u53D6\u5206\u7EC4\u2026":"Reading groups\u2026","\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u4FEE\u590D\u6587\u4EF6\u540E\u91CD\u65B0\u8BFB\u53D6":"Cannot read the group configuration. Repair the file and reload.",\u6280\u80FD\u5217\u8868\u5C1A\u672A\u8BFB\u53D6:"Skills not read yet","{count} \u4E2A \xB7 {state}":"{state} \xB7 {count}","\u7F3A\u5931\uFF1A{names}":"Missing: {names}",\u542F\u7528\u6574\u7EC4:"Enable group",\u5173\u95ED\u6574\u7EC4:"Disable group",\u4EC5\u542F\u7528\u672C\u7EC4:"Enable only this group","\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u5148\u5904\u7406\u540E\u518D\u4EC5\u542F\u7528\u672C\u7EC4":"The group has missing skills. Resolve them before enabling only this group.","\u5DF2\u542F\u7528\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002":'Skills enabled in "{name}": {count}.',"\u5DF2\u5173\u95ED\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002":'Skills disabled in "{name}": {count}.',"\u5DF2\u542F\u7528\u300C{name}\u300D":'Enabled "{name}"',"\u5DF2\u5173\u95ED\u300C{name}\u300D":'Disabled "{name}"',"\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u672A\u6267\u884C\u3002":"The group has missing skills; nothing was run.","\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D\uFF0C\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002":'Enabled only "{name}"; other skills disabled: {count}.',"\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D":'Enabled only "{name}"',\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6:"Directory cannot be read",\u5148\u5904\u7406\u51B2\u7A81:"Resolve conflicts first",\u5904\u7406\u51B2\u7A81:"Resolve conflict",\u90E8\u5206\u5165\u53E3\u5173\u95ED:"Some entries disabled",\u6A21\u578B\u53EF\u89C1:"Visible to the model",\u6A21\u578B\u4E0D\u53EF\u89C1:"Not visible to the model",\u5165\u53E3\u5DF2\u5173\u95ED:"Entry disabled","\u7B2C {step} \u6B65":"Step {step}","\u65E0 description\uFF0C\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002":"No description; the model will not select it automatically.",\u6CA1\u6709\u53D1\u73B0\u6280\u80FD:"No skills found",\u8FD9\u4E2A\u5206\u7EC4\u6CA1\u6709\u53EF\u7528\u6280\u80FD:"This group has no available skills",\u6CA1\u6709\u5339\u914D\u7684\u6280\u80FD:"No matching skills","\u68C0\u67E5 ~/.config/opencode/skills \u662F\u5426\u5B58\u5728\uFF0C\u6216\u91CD\u65B0\u626B\u63CF\u3002":"Check that ~/.config/opencode/skills exists, or rescan.","\u68C0\u67E5\u5206\u7EC4\u91CC\u7684\u6280\u80FD\u662F\u5426\u88AB\u79FB\u9664\u3002":"Check whether the skills in this group were removed.","\u6362\u4E00\u4E2A\u641C\u7D22\u8BCD\u3002":"Try a different search term.","\u8BFB\u53D6\u4E2D\u2026":"Reading\u2026","\u5DF2\u542F\u7528 {name}\u3002":"Enabled {name}.","\u5DF2\u5173\u95ED {name}\uFF1BOpenCode \u4E0B\u4E00\u6B21\u626B\u63CF\u540E\u4E0D\u518D\u53D1\u73B0\u5B83\u3002":"Disabled {name}; OpenCode will no longer discover it after the next scan.","\u5DF2\u542F\u7528 {name}":"Enabled {name}","\u5DF2\u5173\u95ED {name}":"Disabled {name}","\u5DF2\u4FDD\u7559\u542F\u7528\u5165\u53E3{suffix}\u3002":"Kept the enabled entry{suffix}.","\u5DF2\u4FDD\u7559\u5173\u95ED\u5165\u53E3{suffix}\u3002":"Kept the disabled entry{suffix}.","\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A {path}":"; the old disabled file was backed up to {path}",\u5165\u53E3\u51B2\u7A81\u5DF2\u5904\u7406:"Entry conflict resolved","\u5DF2\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002":"Skills enabled: {count}.","\u5DF2\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002":"Skills disabled: {count}.","\u4E2D\u6587\u8BF4\u660E\u5DF2\u662F\u6700\u65B0\u3002":"Chinese descriptions are up to date.","\u7FFB\u8BD1\u5B8C\u6210\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}":"Translation finished, but saving the cache failed: {error}","\u4E0A\u6B21\u672A\u5B8C\u6210\u7684\u7FFB\u8BD1\u5DF2\u8865\u5168\u3002":"The previous unfinished translation was completed.","\u7FFB\u8BD1\u5DF2\u8865\u5168\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}":"Translation was completed, but saving the cache failed: {error}","\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\uFF0C{failed} \u4E2A\u5931\u8D25\uFF1B\u53EF\u518D\u70B9\u201C\u7FFB\u8BD1\u201D\u91CD\u8BD5\u3002":'Translated: {done}; failed: {failed}. Click "Translate" to retry.',"\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\u3002":"Translated skills: {done}.","\u670D\u52A1\u8FD4\u56DE\u7684\u6280\u80FD\u76EE\u5F55\u4FE1\u606F\u4E0D\u6B63\u786E\u3002":"The service returned invalid skill directory information.","\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002":"The service returned data in an unexpected format.","\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002":"The translation cache format is invalid.","\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u6570\u636E\uFF0C\u8BF7\u91CD\u8BD5\u3002":"The service returned unrecognized data. Try again.","\u8BF7\u6C42\u5931\u8D25\uFF08{status}\uFF09":"Request failed ({status})","\u8BF7\u5728\u8BBE\u7F6E \u2192 \u6269\u5C55\u4E2D\u5141\u8BB8\u201C\u6280\u80FD\u5F00\u5173\u201D\u8FD0\u884C\u672C\u5730\u670D\u52A1\u3002":'Allow "Skills" to run its local service in Settings \u2192 Extensions.',"\u672C\u5730\u670D\u52A1\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6269\u5C55\u540E\u91CD\u8BD5\u3002":"The local service is not ready. Reload the extension and try again.","\u6280\u80FD\u5F00\u5173\u6269\u5C55\u5DF2\u505C\u7528\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u542F\u7528\u3002":"The Skills extension is disabled. Enable it in extension settings.","\u672C\u5730\u670D\u52A1\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5\u3002":"The local service timed out. Try again.","\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u5141\u8BB8\u201C\u6A21\u578B\u8C03\u7528\u201D\u6743\u9650\uFF0C\u6216\u91CD\u65B0\u5B89\u88C5\u6269\u5C55\u3002":"Allow the model capability in extension settings, or reinstall the extension.","\u5F53\u524D\u5BBF\u4E3B\u6216\u6A21\u578B\u4E0D\u652F\u6301\u7FFB\u8BD1\u8BF7\u6C42\u3002":"The current host or model does not support translation requests.","\u65E0\u6CD5\u8FDE\u63A5\u672C\u5730\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u6269\u5C55\u6388\u6743\u3002":"Cannot connect to the local service. Check extension permissions.","\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002":"The operation failed. Try again.","\u672C\u5730\u670D\u52A1\u7248\u672C\u8FC7\u65E7\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u7981\u7528\u518D\u542F\u7528\u201C\u6280\u80FD\u5F00\u5173\u201D\u3002":'The local service is too old. Disable and re-enable "Skills" in extension settings.',"\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}\uFF08{path}\uFF09":"Cannot read the skill directory: {error} ({path})",\u63D0\u4EA4\u5185\u5BB9\u8FC7\u5927:"The submitted content is too large.","\u8BF7\u6C42\u4E2D\u65AD\uFF0C\u8BF7\u91CD\u8BD5":"The request was interrupted. Try again.","\u8BF7\u6C42\u5185\u5BB9\u5FC5\u987B\u662F\u6709\u6548\u7684 JSON \u5BF9\u8C61":"The request body must be a valid JSON object.","\u7F3A\u5C11 {key}":"Missing {key}.","{key} \u957F\u5EA6\u8D85\u51FA\u9650\u5236":"{key} exceeds the length limit.","{key} \u5FC5\u987B\u662F\u5E03\u5C14\u503C":"{key} must be a boolean.","{key} \u5FC5\u987B\u662F\u6280\u80FD ID \u6570\u7EC4":"{key} must be an array of skill IDs.","{key} \u6761\u76EE\u8FC7\u591A":"Too many {key} entries.","keep \u5FC5\u987B\u662F enabled \u6216 disabled":"keep must be enabled or disabled.","\u672C\u5730\u670D\u52A1\u5904\u7406\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5":"The local service failed to process the request. Try again.","\u65E0\u6CD5\u8BFB\u53D6\u5206\u7EC4\u914D\u7F6E\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u6743\u9650\u3002":"Could not read the group configuration. Check file permissions.","\u5206\u7EC4\u914D\u7F6E\u6587\u4EF6\u635F\u574F\uFF1B\u539F\u6587\u4EF6\u672A\u4FEE\u6539\uFF08~/.config/openchamber/skills-manager/groups.json\uFF09\u3002":"The group configuration is malformed; the original file was not changed (~/.config/openchamber/skills-manager/groups.json).","\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002":"The group configuration format is invalid.","\u4FDD\u5B58\u5206\u7EC4\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u76EE\u5F55\u6743\u9650\u3002":"Could not save the group configuration. Check directory permissions.",\u6743\u9650\u4E0D\u8DB3:"Permission denied",\u8DEF\u5F84\u4E0D\u5B58\u5728:"Path does not exist",\u4E0D\u662F\u76EE\u5F55:"Not a directory",\u662F\u76EE\u5F55:"Is a directory",\u6587\u4EF6\u7CFB\u7EDF\u9519\u8BEF:"File system error","\u5165\u53E3\u6587\u4EF6\u8D85\u8FC7 2 MB":"The entry file exceeds 2 MB","\u505C\u7528\u5165\u53E3\u8D85\u8FC7 2 MB":"The disabled entry exceeds 2 MB",\u65E0\u6CD5\u8BFB\u53D6\u5165\u53E3\u6587\u4EF6:"Could not read the entry file","\u65E0\u6CD5\u8BFB\u53D6 {directory}\uFF1A{reason}":"Could not read {directory}: {reason}","\u540C\u4E00\u76EE\u5F55\u540C\u65F6\u5B58\u5728\u542F\u7528\u548C\u505C\u7528\u5165\u53E3\uFF0C\u9700\u8981\u5148\u9009\u62E9\u4FDD\u7559\u54EA\u4E00\u4E2A\u3002":"Both an enabled and a disabled entry exist in the same directory. Choose which one to keep first.","\u65E0\u6CD5\u8BFB\u53D6\u5165\u53E3\uFF1A{reason}":"Could not read the entry: {reason}","frontmatter \u672A\u95ED\u5408\uFF0COpenCode \u53EF\u80FD\u8DF3\u8FC7\u6B64\u6280\u80FD\uFF1B\u5165\u53E3\u5F00\u5173\u4ECD\u53EF\u7528\u3002":"The frontmatter is not closed; OpenCode may skip this skill, but the entry switch still works.","\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A\uFF0COpenCode \u4E0D\u4F1A\u52A0\u8F7D\u5B83\u3002":"The entry file is empty; OpenCode will not load it.","\u65E0\uFF08\u5165\u53E3\u4E0D\u53EF\u52A0\u8F7D\uFF09":"None (entry cannot be loaded)","\u540C ID \u6709 {count} \u4E2A\u5165\u53E3\uFF1B\u751F\u6548\u5165\u53E3\uFF1A{winner}\u3002":"There are {count} entries with this ID; the effective entry is {winner}.","\u5165\u53E3\u5DF2\u542F\u7528\uFF0C\u4F46\u6807\u8BB0\u4E3A\u4EC5\u624B\u52A8\u8C03\u7528\uFF1B\u6A21\u578B\u770B\u4E0D\u5230\u5B83\u3002":"The entry is enabled but marked for manual invocation only; the model cannot see it.","\u5165\u53E3\u5DF2\u542F\u7528\uFF0C\u4F46\u6CA1\u6709 description\uFF1B\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002":"The entry is enabled but has no description; the model will not select it automatically.","\u76EE\u6807\u5165\u53E3\u5DF2\u5B58\u5728\uFF1A{path}":"The target entry already exists: {path}","\u5165\u53E3\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\uFF1A{path}":"The entry changed. Rescan: {path}","\u68C0\u67E5\u5165\u53E3\u5931\u8D25\uFF1A{reason}":"Could not inspect the entry: {reason}","\u6539\u540D\u540E\u6821\u9A8C\u5931\u8D25\uFF1A{path}":"Verification failed after renaming: {path}","\u6539\u540D\u5931\u8D25\uFF1A{reason}":"Rename failed: {reason}","\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{reason}":"Could not read the skill directory: {reason}",\u672A\u77E5\u5165\u53E3:"Unknown entry","\u6CA1\u6709\u627E\u5230\u6280\u80FD {id}":"Skill {id} was not found.","\u6280\u80FD {id} \u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\u3002":"Skill {id} has unresolved entry conflicts.","\u65E0\u6CD5\u8BC6\u522B\u505C\u7528\u5165\u53E3\uFF1A{path}":"Could not identify the disabled entry: {path}","\u540C\u4E00\u4E2A\u6280\u80FD\u4E0D\u80FD\u540C\u65F6\u542F\u7528\u548C\u5173\u95ED\u3002":"A skill cannot be enabled and disabled at the same time.","\u4E00\u6B21\u5904\u7406\u7684\u6280\u80FD\u8FC7\u591A\u3002":"Too many skills in one operation.","\u8FD8\u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\uFF0C\u4E0D\u80FD\u6279\u91CF\u64CD\u4F5C\u3002":"Unresolved entry conflicts remain; bulk operations are blocked.","\u6CA1\u6709\u627E\u5230\u8FD9\u4E2A\u5165\u53E3\u51B2\u7A81\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\u3002":"This entry conflict was not found. Rescan.","\u65E0\u6CD5\u8BFB\u53D6\u7FFB\u8BD1\u7F13\u5B58\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u6743\u9650\u3002":"Could not read the translation cache. Check file permissions.","\u7FFB\u8BD1\u7F13\u5B58\u6587\u4EF6\u635F\u574F\uFF1B\u539F\u6587\u4EF6\u672A\u4FEE\u6539\u3002":"The translation cache is malformed; the original file was not changed.","\u7FFB\u8BD1\u7F13\u5B58\u6761\u76EE\u8FC7\u591A\u3002":"The translation cache has too many entries.","\u4FDD\u5B58\u7FFB\u8BD1\u7F13\u5B58\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u76EE\u5F55\u6743\u9650\u3002":"Could not save the translation cache. Check directory permissions.",\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E:"The group configuration format is invalid.",\u5206\u7EC4\u914D\u7F6E\u7248\u672C\u4E0D\u53D7\u652F\u6301:"The group configuration version is not supported.",\u5206\u7EC4\u5217\u8868\u683C\u5F0F\u4E0D\u6B63\u786E:"The group list format is invalid.","\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A":"At most {count} groups are allowed.","\u7B2C {index} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E":"Group {index} has an invalid format.","\u7B2C {index} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548":"Group {index} has an invalid ID.","\u5206\u7EC4 ID \u91CD\u590D\uFF1A{id}":"Duplicate group ID: {id}","\u7B2C {index} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-{max} \u4E2A\u5B57\u7B26":"Group {index} names must be 1\u2013{max} characters.","\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A{name}":"Duplicate group name: {name}","\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E":'The members of group "{name}" have an invalid format.',"\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A":'Group "{name}" cannot have more than {count} members.',"\u5206\u7EC4\u300C{name}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID":'Group "{name}" contains an invalid skill ID.'},et=cr(lr),{t:hs}=et,ks=[{pattern:/^缺少 (.+)$/,template:"\u7F3A\u5C11 {key}",values:e=>({key:e[1]})},{pattern:/^(.+) 长度超出限制$/,template:"{key} \u957F\u5EA6\u8D85\u51FA\u9650\u5236",values:e=>({key:e[1]})},{pattern:/^(.+) 必须是布尔值$/,template:"{key} \u5FC5\u987B\u662F\u5E03\u5C14\u503C",values:e=>({key:e[1]})},{pattern:/^(.+) 必须是技能 ID 数组$/,template:"{key} \u5FC5\u987B\u662F\u6280\u80FD ID \u6570\u7EC4",values:e=>({key:e[1]})},{pattern:/^(.+) 条目过多$/,template:"{key} \u6761\u76EE\u8FC7\u591A",values:e=>({key:e[1]})},{pattern:/^无法读取 (.+)：(.+)$/,template:"\u65E0\u6CD5\u8BFB\u53D6 {directory}\uFF1A{reason}",values:e=>({directory:e[1],reason:e[2]})},{pattern:/^无法读取入口：(.+)$/,template:"\u65E0\u6CD5\u8BFB\u53D6\u5165\u53E3\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^同 ID 有 (\d+) 个入口；生效入口：(.+)。$/,template:"\u540C ID \u6709 {count} \u4E2A\u5165\u53E3\uFF1B\u751F\u6548\u5165\u53E3\uFF1A{winner}\u3002",values:e=>({count:e[1],winner:e[2]})},{pattern:/^目标入口已存在：(.+)$/,template:"\u76EE\u6807\u5165\u53E3\u5DF2\u5B58\u5728\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^入口已变化，请重新扫描：(.+)$/,template:"\u5165\u53E3\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^检查入口失败：(.+)$/,template:"\u68C0\u67E5\u5165\u53E3\u5931\u8D25\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^改名后校验失败：(.+)$/,template:"\u6539\u540D\u540E\u6821\u9A8C\u5931\u8D25\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^改名失败：(.+)$/,template:"\u6539\u540D\u5931\u8D25\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^技能目录无法读取：(.+)$/,template:"\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^没有找到技能 (.+)$/,template:"\u6CA1\u6709\u627E\u5230\u6280\u80FD {id}",values:e=>({id:e[1]})},{pattern:/^技能 (.+) 有未解决的入口冲突。$/,template:"\u6280\u80FD {id} \u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\u3002",values:e=>({id:e[1]})},{pattern:/^无法识别停用入口：(.+)$/,template:"\u65E0\u6CD5\u8BC6\u522B\u505C\u7528\u5165\u53E3\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^分组不能超过 (\d+) 个$/,template:"\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A",values:e=>({count:e[1]})},{pattern:/^第 (\d+) 个分组格式不正确$/,template:"\u7B2C {index} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E",values:e=>({index:e[1]})},{pattern:/^第 (\d+) 个分组的 ID 无效$/,template:"\u7B2C {index} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548",values:e=>({index:e[1]})},{pattern:/^分组 ID 重复：(.+)$/,template:"\u5206\u7EC4 ID \u91CD\u590D\uFF1A{id}",values:e=>({id:e[1]})},{pattern:/^第 (\d+) 个分组名称需为 1-(\d+) 个字符$/,template:"\u7B2C {index} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-{max} \u4E2A\u5B57\u7B26",values:e=>({index:e[1],max:e[2]})},{pattern:/^分组名称重复：(.+)$/,template:"\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A{name}",values:e=>({name:e[1]})},{pattern:/^分组「(.+)」的成员格式不正确$/,template:"\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E",values:e=>({name:e[1]})},{pattern:/^分组「(.+)」的成员不能超过 (\d+) 个$/,template:"\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A",values:e=>({name:e[1],count:e[2]})},{pattern:/^分组「(.+)」含无效的技能 ID$/,template:"\u5206\u7EC4\u300C{name}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID",values:e=>({name:e[1]})}],Oe=(e,t=hs)=>{if(e==null||!/[\u4e00-\u9fff]/.test(e))return e??null;if(Object.prototype.hasOwnProperty.call(lr,e))return t(e);for(let o of ks){let r=e.match(o.pattern);if(r){let i=o.values(r),c=Object.fromEntries(Object.entries(i).map(([d,p])=>[d,Oe(p,t)??p]));return t(o.template,c)}}return e};var{t:s}=et,Te=ho({requestTimeoutMs:3e4}),gr=document.querySelector("#root");if(!gr)throw new Error("Missing #root");var hr=document.createElement("style");hr.textContent=sr+rr;document.head.append(hr);var l=(e,t="",o)=>{let r=document.createElement(e);return r.className=t,o!==void 0&&(r.textContent=o),r},fe=class extends Error{code;conflicts;constructor(t,o,r){super(t),this.name="ServiceError",this.code=o,this.conflicts=r}},xs=e=>e==="enabled"||e==="disabled"||e==="mixed"||e==="conflict",bs=e=>e==="both"||e==="duplicate"||e==="invalid"||e==="empty"||e==="read-error"||e==="manual"||e==="no-description",it=(e,t="")=>typeof e=="string"?e:t,dr=e=>typeof e=="string"&&e.length>0?e:null,Pt=e=>e===!0,kr=e=>typeof e=="number"&&Number.isFinite(e)?e:0,pr=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],Wo=e=>{if(!e||typeof e!="object")return null;let t=e;return!bs(t.kind)||typeof t.skillId!="string"?null:{kind:t.kind,skillId:t.skillId,message:it(t.message,s("\u51B2\u7A81")),activePath:dr(t.activePath),disabledPath:dr(t.disabledPath),blocking:Pt(t.blocking)}},As=e=>{if(!e||typeof e!="object")return null;let t=e;return typeof t.id!="string"||!t.id||!xs(t.state)?null:{id:t.id,name:it(t.name,t.id),description:it(t.description),state:t.state,advertised:Pt(t.advertised),autoInvokeOff:Pt(t.autoInvokeOff),activePaths:pr(t.activePaths),disabledPaths:pr(t.disabledPaths),conflicts:Array.isArray(t.conflicts)?t.conflicts.map(Wo).filter(o=>o!==null):[],warnings:Array.isArray(t.warnings)?t.warnings.filter(o=>typeof o=="string"):[],estimatedTokens:kr(t.estimatedTokens),contentHash:it(t.contentHash)}},Os=e=>{if(!e||typeof e!="object")throw new fe(s("\u670D\u52A1\u8FD4\u56DE\u7684\u6280\u80FD\u76EE\u5F55\u4FE1\u606F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let t=e;return{path:it(t.path),exists:Pt(t.exists),error:typeof t.error=="string"?t.error:null}},Ke=e=>{if(!e||typeof e!="object")throw new fe(s("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let t=e;if(!Array.isArray(t.skills))throw new fe(s("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let o=t.skills.map(As).filter(d=>d!==null),r=Array.isArray(t.conflicts)?t.conflicts.map(Wo).filter(d=>d!==null):o.flatMap(d=>d.conflicts),i=r.filter(d=>d.blocking).length,c={total:o.length,advertised:o.filter(d=>d.advertised).length,disabled:o.filter(d=>d.state==="disabled").length,blockingConflicts:i,warnings:r.length-i,estimatedTokens:o.reduce((d,p)=>d+p.estimatedTokens,0)};return{skills:o,conflicts:r,summary:c,root:Os(t.root),scannedAt:kr(t.scannedAt)}},Rs=()=>({version:1,locale:"zh-CN",entries:{}}),xr=e=>{if(!e||typeof e!="object")throw new fe(s("\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let t=e;if(t.version!==1||t.locale!=="zh-CN"||!t.entries||typeof t.entries!="object"||Array.isArray(t.entries))throw new fe(s("\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let o={};for(let[r,i]of Object.entries(t.entries)){if(!i||typeof i!="object")continue;let c=i;typeof c.hash!="string"||typeof c.nameZh!="string"||typeof c.descriptionZh!="string"||typeof c.updatedAt!="number"||(o[r]={hash:c.hash,nameZh:c.nameZh.trim(),descriptionZh:c.descriptionZh.trim(),updatedAt:c.updatedAt})}return{version:1,locale:"zh-CN",entries:o}},Ht=e=>{try{return or(e).groups}catch(t){throw new fe(t instanceof Error?Oe(t.message)??t.message:s("\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[])}},pe=async(e,t,o)=>{let r=await Te.serviceRequest({method:e,path:t,...o===void 0?{}:{body:JSON.stringify(o)}}),i;try{i=JSON.parse(r.body)}catch{throw new fe(s("\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u6570\u636E\uFF0C\u8BF7\u91CD\u8BD5\u3002"),"parse",[])}if(r.status>=400){let c=i&&typeof i=="object"?i:{},d=typeof c.error=="string"?Oe(c.error)??c.error:s("\u8BF7\u6C42\u5931\u8D25\uFF08{status}\uFF09",{status:r.status}),p=typeof c.code=="string"?c.code:null,m=Array.isArray(c.conflicts)?c.conflicts.map(Wo).filter(b=>b!==null):[];throw new fe(d,p,m)}return i},Z=e=>e instanceof h?e.code==="NO_SERVICE"?s("\u8BF7\u5728\u8BBE\u7F6E \u2192 \u6269\u5C55\u4E2D\u5141\u8BB8\u201C\u6280\u80FD\u5F00\u5173\u201D\u8FD0\u884C\u672C\u5730\u670D\u52A1\u3002"):e.code==="SERVICE_FAILED"?s("\u672C\u5730\u670D\u52A1\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6269\u5C55\u540E\u91CD\u8BD5\u3002"):e.code==="DISABLED"?s("\u6280\u80FD\u5F00\u5173\u6269\u5C55\u5DF2\u505C\u7528\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u542F\u7528\u3002"):e.code==="HOST_TIMEOUT"?s("\u672C\u5730\u670D\u52A1\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5\u3002"):e.code==="NOT_GRANTED"?s("\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u5141\u8BB8\u201C\u6A21\u578B\u8C03\u7528\u201D\u6743\u9650\uFF0C\u6216\u91CD\u65B0\u5B89\u88C5\u6269\u5C55\u3002"):e.code==="UNSUPPORTED"?s("\u5F53\u524D\u5BBF\u4E3B\u6216\u6A21\u578B\u4E0D\u652F\u6301\u7FFB\u8BD1\u8BF7\u6C42\u3002"):s("\u65E0\u6CD5\u8FDE\u63A5\u672C\u5730\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u6269\u5C55\u6388\u6743\u3002"):e instanceof fe?Oe(e.message)??e.message:Oe(e instanceof Error?e.message:null)??s("\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"),ys=e=>e instanceof fe&&e.code==="not-found"?s("\u672C\u5730\u670D\u52A1\u7248\u672C\u8FC7\u65E7\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u7981\u7528\u518D\u542F\u7528\u201C\u6280\u80FD\u5F00\u5173\u201D\u3002"):Z(e),ft=l("main","ext sk");ft.setAttribute("aria-label",s("\u6280\u80FD\u5F00\u5173"));var br=l("header","sk-header"),Ar=l("div","sk-title-row"),Or=l("h1","sk-title",s("\u6280\u80FD\u5F00\u5173")),Vt=l("div","sk-actions"),vs=Ce(Vt,{label:s("\u91CD\u65B0\u626B\u63CF"),variant:"outline",size:"sm",onClick:()=>{jo(!0),Gt()}}),Rr=Ce(Vt,{label:s("\u5168\u90E8\u542F\u7528"),variant:"outline",size:"sm",onClick:()=>Hr(!0)}),yr=Ce(Vt,{label:s("\u5168\u90E8\u5173\u95ED"),variant:"outline",size:"sm",onClick:()=>Hr(!1)});Ar.append(Or,Vt);var $o=l("p","sk-summary"),Bo=l("p","sk-summary sk-summary-secondary"),vr=l("div","sk-translation-row"),Et=l("div","sk-segment");Et.setAttribute("role","group");Et.setAttribute("aria-label",s("\u6280\u80FD\u8BF4\u660E\u8BED\u8A00"));var Xe=l("button","sk-segment-button",s("\u7FFB\u8BD1"));Xe.type="button";Xe.setAttribute("aria-pressed","false");var ot=l("button","sk-segment-button",s("\u539F\u6587"));ot.type="button";ot.setAttribute("aria-pressed","true");Et.append(Xe,ot);var at=l("span","sk-translation-status");at.setAttribute("aria-live","polite");vr.append(Et,at);br.append(Ar,$o,Bo,vr);var Ir=l("div","sk-body"),de=l("div","sk-notice-root");de.setAttribute("aria-live","polite");var Nt=l("div","sk-groups-note"),wr=l("div","sk-groups-row"),ct=l("div","sk-groups"),qo=l("div","sk-group-select"),me=l("button","sk-chip sk-groups-edit",s("\u7F16\u8F91\u5206\u7EC4"));me.type="button";me.setAttribute("aria-pressed","false");me.addEventListener("click",()=>{v?Lr():$s()});wr.append(ct,qo,me);var tt=l("div","sk-group-editor-root"),Fo=l("div"),pt=l("div"),Me=l("input","sk-search");Me.type="search";Me.placeholder=s("\u641C\u7D22\u540D\u79F0\u6216 ID");Me.setAttribute("aria-label",s("\u641C\u7D22\u6280\u80FD"));Me.addEventListener("input",()=>{zo=Me.value.trim().toLowerCase(),Pr()});var lt=l("div","sk-list");lt.setAttribute("role","list");var Cr=l("footer","sk-footer"),Ur=l("p","",s("\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002")),Mr=l("p","",s("\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002"));Cr.append(Ur,Mr);Ir.append(de,Nt,wr,tt,Fo,pt,Me,lt,Cr);ft.append(br,Ir);gr.append(ft);var _=null,$e=Rs(),Re="original",ut=!1,Ve=!1,Dt={done:0,total:0},Y=null,dt=[],ne=!1,Ue=null,A=null,S=null,ue=null,re=null,K=null,D=[],Ee=null,ye=!0,v=null,J=null,Be=!1,Fe=!1,zo="",ur=!1,Is=No(qo,{value:"all",options:[{id:"all",label:s("\u5168\u90E8")}],onChange:e=>{K=e==="all"?null:e,E()}}),Lt=qo.querySelector(".oc-sdk-trigger");Lt&&(Lt.setAttribute("aria-label",s("\u5206\u7EC4\u7B5B\u9009")),Lt.removeAttribute("aria-labelledby"));var ve=()=>!!_?.root.error,ws=e=>e.state==="conflict"?"error":e.state==="mixed"?"warning":e.state==="disabled"?"info":e.advertised?"success":"warning",Cs=e=>e.state==="conflict"?s("\u51B2\u7A81"):e.state==="mixed"?s("\u6DF7\u5408"):e.state==="disabled"?s("\u5173\u95ED"):s("\u5F00\u542F"),Us=(e,t="neutral")=>{let o=l("span","sk-badge",e);return o.dataset.tone=t,o},Ms=e=>{switch(e){case"both":return s("\u5165\u53E3\u548C\u505C\u7528\u6587\u4EF6\u540C\u65F6\u5B58\u5728");case"duplicate":return s("\u540C ID \u591A\u4E2A\u5165\u53E3");case"invalid":return s("frontmatter \u65E0\u6CD5\u89E3\u6790");case"empty":return s("\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A");case"read-error":return s("\u5165\u53E3\u65E0\u6CD5\u8BFB\u53D6");case"manual":return s("\u4EC5\u624B\u52A8\u8C03\u7528");case"no-description":return s("\u6CA1\u6709 description");default:return s("\u51B2\u7A81")}},Go=(e,t)=>{if(!t)return null;let o=l("p","sk-path");return o.append(l("span","sk-path-label",`${e}\uFF1A`),l("code","",t)),o},B=(e,t,o=!1,r=!1)=>{let i=l("button",o?"sk-inline-button sk-inline-primary":"sk-inline-button",e);return i.type="button",i.disabled=!!S||r,i.addEventListener("click",t),i},fr=e=>{let t=l("li","sk-conflict-item");t.dataset.tone=e.blocking?"error":"warning";let o=l("div","sk-conflict-copy");if(o.append(l("strong","",Ms(e.kind)),l("p","sk-conflict-message",Oe(e.message)??e.message)),e.kind==="both"?(o.append(Go(s("\u542F\u7528\u5165\u53E3"),e.activePath)??l("span")),o.append(Go(s("\u505C\u7528\u5165\u53E3"),e.disabledPath)??l("span"))):(e.activePath??e.disabledPath)&&o.append(Go(s("\u5165\u53E3"),e.activePath??e.disabledPath)??l("span")),t.append(o),e.kind==="both"&&e.activePath){let r=l("div","sk-conflict-actions");r.append(B(s("\u4FDD\u7559\u542F\u7528"),()=>void Sr(e,"enabled"),!1,ve()),B(s("\u4FDD\u7559\u5173\u95ED"),()=>void Sr(e,"disabled"),!1,ve())),t.append(r)}return t},Ns=()=>{if(pt.replaceChildren(),!_)return;let t=[..._.root.error?[{kind:"read-error",skillId:"",message:s("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}\uFF08{path}\uFF09",{error:Oe(_.root.error)??_.root.error,path:_.root.path}),activePath:null,disabledPath:null,blocking:!0}]:[],..._.conflicts],o=t.filter(d=>d.blocking),r=t.filter(d=>!d.blocking);if(o.length===0&&r.length===0)return;let i=l("section","sk-conflicts");i.setAttribute("aria-label",s("\u51B2\u7A81\u68C0\u67E5"));let c=l("div","sk-section-head");if(c.append(l("h2","sk-section-title",s("\u51B2\u7A81\u68C0\u67E5")),l("span","sk-section-count",s("{blocking} \u9879\u9700\u8981\u5904\u7406 \xB7 {warnings} \u9879\u63D0\u793A",{blocking:o.length,warnings:r.length}))),i.append(c),o.length>0){let d=l("ul","sk-conflict-list");for(let p of o)d.append(fr(p));i.append(d)}if(r.length>0){let d=l("details","sk-warning-details");d.append(l("summary","",s("\u63D0\u793A\uFF08{count}\uFF09",{count:r.length})));let p=l("ul","sk-conflict-list");for(let m of r)p.append(fr(m));d.append(p),i.append(d)}pt.append(i)},Ls=()=>{if(de.replaceChildren(),re){let e=re,t=new Set(e.skillIds),o=_?_.skills.filter(c=>!t.has(c.id)).length:0,r=l("div","sk-notice",s("\u4EC5\u542F\u7528\u300C{name}\u300D\uFF1A\u5C06\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:o}));r.dataset.tone="warning",r.setAttribute("role","status");let i=l("div","sk-notice-actions");i.append(B(s("\u786E\u8BA4"),()=>void Qs(),!0),B(s("\u53D6\u6D88"),()=>{re=null,E()})),r.append(i),de.append(r);return}if(ue!==null){let e=_?_.skills.filter(r=>(ue?r.disabledPaths.length:r.activePaths.length)>0).length:0,t=l("div","sk-notice",ue?s("\u5C06\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002",{count:e}):s("\u5C06\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002",{count:e}));t.dataset.tone="warning",t.setAttribute("role","status");let o=l("div","sk-notice-actions");o.append(B(s(ue?"\u786E\u8BA4\u542F\u7528":"\u786E\u8BA4\u5173\u95ED"),()=>void ri(),!0),B(s("\u53D6\u6D88"),()=>{ue=null,E()})),t.append(o),de.append(t);return}if(A){let e=l("div","sk-notice",A.text);if(e.dataset.tone=A.tone,e.setAttribute("role",A.tone==="error"?"alert":"status"),A.actions?.length){let t=l("div","sk-notice-actions");for(let o of A.actions)t.append(B(o.label,o.onClick,o.primary));e.append(t)}de.append(e);return}if(Ue){let e=l("div","sk-notice",Ue);e.dataset.tone="error",e.setAttribute("role","alert"),de.append(e);return}if(Y){let e=l("div","sk-notice",Y);e.dataset.tone="error",e.setAttribute("role","alert"),de.append(e);return}if(ne&&!_){let e=l("div","sk-notice",s("\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026"));e.dataset.tone="info",e.setAttribute("role","status"),de.append(e)}},Ps=()=>{if(!_){$o.textContent=s(ne?"\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026":"\u5C1A\u672A\u8BFB\u53D6\u6280\u80FD\u3002"),Bo.textContent=s("\u5173\u95ED\u5165\u53E3\u6587\u6863\u540E\uFF0COpenCode \u4E0D\u4F1A\u518D\u53D1\u73B0\u8BE5\u6280\u80FD\u3002");return}$o.textContent=s("\u6A21\u578B\u53EF\u89C1 {advertised} / \u5171 {total} \u4E2A \xB7 \u7EA6 {tokens} tokens/\u6B65",{advertised:_.summary.advertised,total:_.summary.total,tokens:_.summary.estimatedTokens.toLocaleString(et.locale)});let e=[s("{count} \u4E2A\u5DF2\u5173\u95ED",{count:_.summary.disabled})];_.summary.blockingConflicts>0?e.push(s("{count} \u9879\u963B\u585E\u51B2\u7A81",{count:_.summary.blockingConflicts})):e.push(s("\u65E0\u963B\u585E\u51B2\u7A81")),_.summary.warnings>0&&e.push(s("{count} \u9879\u63D0\u793A",{count:_.summary.warnings})),_.root.error&&e.push(s("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6")),Bo.textContent=s("{parts}\u3002\u4F30\u7B97\u4E0D\u542B\u5185\u7F6E\u548C\u9879\u76EE\u6280\u80FD\u3002",{parts:e.join(" \xB7 ")})},_t=e=>{let t=$e.entries[e.id];return t&&t.hash===e.contentHash?t:null},Ds=()=>_?.skills.filter(e=>_t(e)).length??0,Gs=e=>Re!=="translated"?e.name:_t(e)?.nameZh||e.name;var Hs=()=>{Xe.setAttribute("aria-pressed",Re==="translated"?"true":"false"),ot.setAttribute("aria-pressed",Re==="original"?"true":"false"),Xe.disabled=Ve;let e=_?.skills.length??0,t=Ds();Ve?at.textContent=s("\u7FFB\u8BD1 {done}/{total}\u2026",{done:Dt.done,total:Dt.total}):Re==="translated"?at.textContent=t?s("{translated}/{total} \u5DF2\u7FFB\u8BD1",{translated:t,total:e}):s("\u70B9\u201C\u7FFB\u8BD1\u201D\u751F\u6210\u4E2D\u6587"):at.textContent=t?s("{count} \u4E2A\u6709\u4E2D\u6587",{count:t}):""},ze=e=>e.skillIds.filter(t=>_?.skills.some(o=>o.id===t)),Nr=e=>{let t=ze(e).map(r=>_?.skills.find(i=>i.id===r)).filter(r=>!!r);if(t.length===0)return s("\u65E0\u6280\u80FD");if(t.some(r=>r.state==="conflict"))return s("\u6709\u51B2\u7A81");let o=t.filter(r=>r.state==="enabled").length;return o===t.length?s("\u5168\u5F00"):s(o===0?"\u5168\u5173":"\u90E8\u5206")},Er=e=>{Array.from(ct.querySelectorAll("[data-group]")).find(o=>o.dataset.group===e)?.focus()},Vs=()=>`custom-${globalThis.crypto?.randomUUID?.().slice(0,8)??Math.random().toString(36).slice(2,10)}`,Xs=()=>{if(Nt.replaceChildren(),Ee){let e=l("div","sk-notice",s("\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}",{error:Ee}));e.dataset.tone="error",e.setAttribute("role","alert");let t=l("div","sk-notice-actions");t.append(B(s("\u91CD\u65B0\u8BFB\u53D6"),()=>void Gt(),!1,ye)),e.append(t),Nt.append(e);return}ye||D.length>0||!_||ve()||Nt.append(l("div","sk-notice",s("\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002\u70B9\u300C\u7F16\u8F91\u5206\u7EC4\u300D\u65B0\u5EFA\uFF0C\u6216\u5728\u7F16\u8F91\u5668\u91CC\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4\u3002")))},Ko=e=>{v={id:e?.id??null,name:e?.name??"",members:e?[...e.skillIds]:[]},J=null,Be=!1,Fe=!1,E();let t=tt.querySelector(".sk-group-name");t?.focus(),t?.select()},$s=()=>{if(Ee||ye||!_||ve())return;let e=D.find(t=>t.id===K)??D[0]??null;Ko(e),tt.scrollIntoView({block:"nearest"})},Lr=()=>{S||(v=null,J=null,Be=!1,Fe=!1,E(),me.focus())},Bs=e=>{if(e==="new"){Ko(null);return}let t=D.find(o=>o.id===e);t&&Ko(t)},Ho=()=>{tt.querySelector(".sk-group-name")?.focus()},_r=async()=>{let e=v;if(!e||S||Ee)return;let t=e.name.trim();if(!t){J=s("\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0\u3002"),E(),Ho();return}if(t.length>40){J=s("\u5206\u7EC4\u540D\u79F0\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A\u5B57\u7B26\u3002",{count:40}),E(),Ho();return}if(D.some(c=>c.id!==e.id&&c.name.trim().toLowerCase()===t.toLowerCase())){J=s("\u5DF2\u7ECF\u6709\u540D\u4E3A\u300C{name}\u300D\u7684\u5206\u7EC4\u3002",{name:t}),E(),Ho();return}if(e.members.length===0){J=s("\u5206\u7EC4\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u6210\u5458\u3002"),E();return}let o=e.id??Vs(),r={id:o,name:t,skillIds:[...e.members]},i=e.id?D.map(c=>c.id===e.id?r:c):[...D,r];S="groups",J=null,E();try{D=Ht(await pe("POST","/groups",{version:1,groups:i})),Ee=null,K=o,re=null;let c=D.find(d=>d.id===o)??null;v=c?{id:c.id,name:c.name,members:[...c.skillIds]}:null,A={text:s("\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C{name}\u300D\u3002",{name:t}),tone:"success"},Te.toast({kind:"success",message:s("\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C{name}\u300D\u3002",{name:t})}).catch(()=>{})}catch(c){J=Z(c)}finally{S=null,E()}},Fs=()=>{!v?.id||S||(Be=!0,Fe=!1,E())},zs=async()=>{if(!v?.id||S)return;let e=v.id,t=D.filter(o=>o.id!==e);S="groups",Be=!1,J=null,E();try{D=Ht(await pe("POST","/groups",{version:1,groups:t})),Ee=null,re?.id===e&&(re=null),K===e&&(K=null);let o=D.find(r=>r.id===K)??D[0]??null;K=o?.id??null,v=o?{id:o.id,name:o.name,members:[...o.skillIds]}:null,A={text:s("\u5DF2\u5220\u9664\u5206\u7EC4\u3002"),tone:"success"}}catch(o){J=Z(o)}finally{S=null,E()}},Ks=()=>{if(!(S||ye||Ee)){if(Mt(D).added.length===0){A={text:s("\u793A\u4F8B\u5206\u7EC4\u7684\u540D\u79F0\u6216 ID \u90FD\u5DF2\u5B58\u5728\uFF0C\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u5206\u7EC4\u3002"),tone:"info"},E();return}Fe=!0,Be=!1,E()}},js=async()=>{if(S)return;let{groups:e,added:t}=Mt(D);if(Fe=!1,t.length===0){A={text:s("\u793A\u4F8B\u5206\u7EC4\u7684\u540D\u79F0\u6216 ID \u90FD\u5DF2\u5B58\u5728\uFF0C\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u5206\u7EC4\u3002"),tone:"info"},E();return}S="groups",J=null,E();try{D=Ht(await pe("POST","/groups",{version:1,groups:e})),Ee=null,A={text:s("\u5DF2\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\u3002",{count:t.length}),tone:"success"}}catch(o){J=Z(o)}finally{S=null,E()}},Ws=()=>{if(tt.replaceChildren(),!v)return;let e=v,t=l("section","sk-group-editor");t.setAttribute("aria-label",s("\u7F16\u8F91\u5206\u7EC4"));let o=l("div","sk-section-head");o.append(l("h2","sk-section-title",s("\u7F16\u8F91\u5206\u7EC4")),B(s("\u5173\u95ED"),Lr,!1,!!S)),t.append(o);let r=l("label","sk-field");r.append(l("span","sk-field-label",s("\u9009\u62E9\u5206\u7EC4")));let i=l("select","sk-input");i.setAttribute("aria-label",s("\u9009\u62E9\u5206\u7EC4"));let c=l("option","",s("\u65B0\u5EFA\u5206\u7EC4"));c.value="new",i.append(c);for(let k of D){let U=l("option","",`${k.name}\uFF08${k.skillIds.length}\uFF09`);U.value=k.id,i.append(U)}i.value=e.id??"new",i.disabled=!!S,i.addEventListener("change",()=>Bs(i.value)),r.append(i);let d=l("label","sk-field");d.append(l("span","sk-field-label",s("\u540D\u79F0")));let p=l("input","sk-input sk-group-name");p.type="text",p.value=e.name,p.maxLength=40,p.placeholder=s("\u4F8B\u5982\uFF1A\u65E5\u5E38\u5F00\u53D1"),p.autocomplete="off",p.spellcheck=!1,p.disabled=!!S,p.addEventListener("input",()=>{v&&(v.name=p.value,J=null)}),p.addEventListener("keydown",k=>{k.key==="Enter"&&(k.preventDefault(),_r())}),d.append(p),t.append(r,d);let m=l("fieldset","sk-members"),b=l("legend","",s("\u6210\u5458\uFF08{count}\uFF09",{count:e.members.length}));m.append(b);let C=l("div","sk-members-tools");C.append(B(s("\u5168\u9009"),()=>{if(!v)return;let k=_?.skills.map(I=>I.id)??[],U=v.members.filter(I=>!k.includes(I));v.members=[...k,...U],E()},!1,!!S),B(s("\u6E05\u7A7A"),()=>{v&&(v.members=[],E())},!1,!!S)),m.append(C);let O=l("div","sk-member-list");for(let k of _?.skills??[]){let U=l("label","sk-check"),I=l("input");I.type="checkbox",I.checked=e.members.includes(k.id),I.disabled=!!S,I.addEventListener("change",()=>{v&&(I.checked?v.members.includes(k.id)||v.members.push(k.id):v.members=v.members.filter(se=>se!==k.id),b.textContent=s("\u6210\u5458\uFF08{count}\uFF09",{count:v.members.length}),J=null)});let ee=l("span","sk-check-copy");ee.append(l("span","sk-check-name",Gs(k)),l("code","sk-check-id",k.id)),U.append(I,ee),O.append(U)}m.append(O);let N=new Set(_?.skills.map(k=>k.id)??[]),X=e.members.filter(k=>!N.has(k));if(X.length>0){let k=l("div","sk-missing");k.append(l("span","sk-missing-label",s("\u76EE\u5F55\u4E2D\u7F3A\u5931\uFF1A")));for(let U of X){let I=l("button","sk-missing-chip",`${U} \xD7`);I.type="button",I.disabled=!!S,I.title=s("\u4ECE\u5206\u7EC4\u79FB\u9664\u8FD9\u4E2A\u7F3A\u5931\u6210\u5458"),I.addEventListener("click",()=>{v&&(v.members=v.members.filter(ee=>ee!==U),E())}),k.append(I)}m.append(k)}if(t.append(m),J){let k=l("p","sk-editor-error",J);k.setAttribute("role","alert"),t.append(k)}let j=l("div","sk-editor-actions");if(e.id&&j.append(B(s("\u5220\u9664\u5206\u7EC4"),Fs,!1,!!S)),j.append(B(s("\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4"),Ks,!1,!!S),B(e.id?s("\u4FDD\u5B58\u66F4\u6539"):s("\u65B0\u5EFA\u5206\u7EC4"),()=>void _r(),!0,!!S)),t.append(j),Be){let k=l("div","sk-editor-confirm");k.dataset.tone="warning",k.append(l("p","",s("\u5220\u9664\u5206\u7EC4\u300C{name}\u300D\uFF1F\u6280\u80FD\u672C\u8EAB\u4E0D\u4F1A\u88AB\u5220\u9664\u3002",{name:e.name.trim()||s("\u672A\u547D\u540D")})));let U=l("div","sk-actions");U.append(B(s("\u786E\u8BA4\u5220\u9664"),()=>void zs(),!0,!!S),B(s("\u53D6\u6D88"),()=>{Be=!1,E()},!1,!!S)),k.append(U),t.append(k)}if(Fe){let k=Mt(D).added.length,U=l("div","sk-editor-confirm");U.dataset.tone="warning",U.append(l("p","",s("\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\uFF1F\u5DF2\u6709\u540C\u540D\u6216\u540C ID \u7684\u5206\u7EC4\u4F1A\u8DF3\u8FC7\uFF0C\u5F53\u524D\u5206\u7EC4\u4E0D\u4F1A\u88AB\u8986\u76D6\u3002",{count:k})));let I=l("div","sk-actions");I.append(B(s("\u786E\u8BA4\u5BFC\u5165"),()=>void js(),!0,!!S),B(s("\u53D6\u6D88"),()=>{Fe=!1,E()},!1,!!S)),U.append(I),t.append(U)}t.append(l("p","sk-editor-hint",s("\u5206\u7EC4\u53EA\u5F71\u54CD\u9762\u677F\u7B5B\u9009\u548C\u6279\u91CF\u5F00\u5173\uFF0C\u4E0D\u6539\u53D8\u6280\u80FD\uFF1B\u6210\u5458\u987A\u5E8F\u51B3\u5B9A\u7EC4\u5185\u6B65\u9AA4\u53F7\uFF0C\u4FDD\u5B58\u540E\u5199\u5165 groups.json\u3002"))),tt.append(t)},qs=()=>{ct.replaceChildren();let e=_?.skills.length??0,t=l("button","sk-chip",s("\u5168\u90E8 {count}",{count:e}));t.type="button",t.dataset.group="all",t.setAttribute("aria-pressed",K===null?"true":"false"),t.addEventListener("click",()=>{K=null,E(),Er("all")}),ct.append(t);for(let o of D){let r=ze(o).length,i=l("button","sk-chip",`${o.name} ${r}`);i.type="button",i.dataset.group=o.id,i.setAttribute("aria-pressed",K===o.id?"true":"false"),i.addEventListener("click",()=>{K=o.id,E(),Er(o.id)}),ct.append(i)}me.textContent=s(v?"\u5173\u95ED\u7F16\u8F91":"\u7F16\u8F91\u5206\u7EC4"),me.setAttribute("aria-pressed",v?"true":"false"),me.disabled=ye||!!Ee||!!S||!_||ve(),me.title=ye?s("\u6B63\u5728\u8BFB\u53D6\u5206\u7EC4\u2026"):Ee?s("\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u4FEE\u590D\u6587\u4EF6\u540E\u91CD\u65B0\u8BFB\u53D6"):_?ve()?s("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6"):"":s("\u6280\u80FD\u5217\u8868\u5C1A\u672A\u8BFB\u53D6"),Is.update({value:K??"all",options:[{id:"all",label:s("\u5168\u90E8 {count}",{count:e})},...D.map(o=>({id:o.id,label:`${o.name} ${ze(o).length}`,hint:Nr(o)}))]})},Js=()=>{if(Fo.replaceChildren(),!_||!K)return;let e=_,t=D.find(O=>O.id===K);if(!t)return;let o=ze(t),r=t.skillIds.filter(O=>!o.includes(O)),c=o.map(O=>e.skills.find(N=>N.id===O)).filter(O=>!!O).some(O=>O.state==="conflict"),d=ve()||c||o.length===0,p=l("div","sk-groupbar"),m=l("div","sk-groupbar-text");m.append(l("strong","",t.name),l("span","sk-group-state",s("{count} \u4E2A \xB7 {state}",{count:o.length,state:Nr(t)}))),r.length>0&&m.append(l("p","sk-group-warning",s("\u7F3A\u5931\uFF1A{names}",{names:r.join(", ")})));let b=l("div","sk-groupbar-actions");b.append(B(s("\u542F\u7528\u6574\u7EC4"),()=>void mr(t,!0),!1,d),B(s("\u5173\u95ED\u6574\u7EC4"),()=>void mr(t,!1),!1,d));let C=B(s("\u4EC5\u542F\u7528\u672C\u7EC4"),()=>Zs(t),!1,d||r.length>0);r.length>0&&(C.title=s("\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u5148\u5904\u7406\u540E\u518D\u4EC5\u542F\u7528\u672C\u7EC4")),b.append(C),p.append(m,b),Fo.append(p)},mr=async(e,t)=>{if(!_||S)return;let o=ze(e);if(o.length!==0){S=`group:${e.id}:${t?"on":"off"}`,re=null,ue=null,A=null,E();try{_=Ke(await pe("POST","/skills/batch",{enable:t?o:[],disable:t?[]:o})),A={text:t?s("\u5DF2\u542F\u7528\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:o.length}):s("\u5DF2\u5173\u95ED\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:o.length}),tone:"success"},Te.toast({kind:"success",message:t?s("\u5DF2\u542F\u7528\u300C{name}\u300D",{name:e.name}):s("\u5DF2\u5173\u95ED\u300C{name}\u300D",{name:e.name})}).catch(()=>{})}catch(r){A={text:Z(r),tone:"error"},S=null,E(),mt(!1,!0);return}S=null,E()}},Zs=e=>{if(!_||S)return;let t=ze(e),o=e.skillIds.filter(r=>!t.includes(r));t.length===0||o.length>0||(re=e,ue=null,A=null,E(),de.scrollIntoView({block:"nearest"}),de.querySelector("button")?.focus())},Qs=async()=>{if(!_||S||!re)return;let e=re;re=null;let t=ze(e),o=e.skillIds.filter(c=>!t.includes(c));if(t.length===0||o.length>0){A={text:s("\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u672A\u6267\u884C\u3002"),tone:"error"},E();return}let r=new Set(e.skillIds),i=_.skills.filter(c=>!r.has(c.id)).map(c=>c.id);S=`group-only:${e.id}`,A=null,E();try{_=Ke(await pe("POST","/skills/batch",{enable:t,disable:i})),A={text:s("\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D\uFF0C\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:i.length}),tone:"success"},Te.toast({kind:"success",message:s("\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D",{name:e.name})}).catch(()=>{})}catch(c){A={text:Z(c),tone:"error"},S=null,E(),mt(!1,!0);return}S=null,E()};Xe.addEventListener("click",()=>{ut=!0,Re="translated",E(),ni()});ot.addEventListener("click",()=>{ut=!0,Re="original",E()});var Ys=e=>{let t=l("div","sk-skill-action"),o=l("span","sk-action-note"),r=ve();if(e.state==="conflict"){o.textContent=s(r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5148\u5904\u7406\u51B2\u7A81");let d=l("button","sk-inline-button",s("\u5904\u7406\u51B2\u7A81"));return d.type="button",d.disabled=!!S||r,d.addEventListener("click",()=>{pt.scrollIntoView({block:"nearest"}),pt.querySelector("button")?.focus()}),t.append(o,d),t}if(e.state==="mixed"){o.textContent=s(r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u90E8\u5206\u5165\u53E3\u5173\u95ED");let d=l("div","sk-mini-actions"),p=l("button","sk-inline-button",s("\u5168\u90E8\u542F\u7528"));p.type="button",p.disabled=!!S||r,p.addEventListener("click",()=>void Vo(e,!0));let m=l("button","sk-inline-button",s("\u5168\u90E8\u5173\u95ED"));return m.type="button",m.disabled=!!S||r,m.addEventListener("click",()=>void Vo(e,!1)),d.append(p,m),t.append(o,d),t}let i=e.state==="enabled",c=l("button","sk-switch");return c.type="button",c.setAttribute("role","switch"),c.setAttribute("aria-checked",i?"true":"false"),c.setAttribute("aria-label",`${s(i?"\u5173\u95ED":"\u5F00\u542F")} ${e.name}`),c.dataset.skillId=e.id,c.disabled=!!S||r,c.append(l("span","sk-thumb")),c.addEventListener("click",()=>{c.disabled||Vo(e,!i)}),i?o.textContent=r?s("\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6"):e.advertised?s("\u6A21\u578B\u53EF\u89C1"):s("\u6A21\u578B\u4E0D\u53EF\u89C1"):o.textContent=s(r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5165\u53E3\u5DF2\u5173\u95ED"),t.append(o,c),t},ei=(e,t=0)=>{let o=l("article","sk-skill");o.dataset.state=e.state,o.setAttribute("role","listitem");let r=l("div","sk-skill-main"),i=l("div","sk-skill-head");if(t>0){let m=l("span","sk-step",String(t));m.title=s("\u7B2C {step} \u6B65",{step:t}),m.setAttribute("aria-label",s("\u7B2C {step} \u6B65",{step:t})),i.append(m)}let c=Re==="translated"?_t(e):null;i.append(l("strong","sk-name",c?.nameZh||e.name),Us(Cs(e),ws(e)));let d=l("div","sk-meta");c&&d.append(l("span","sk-original-name",e.name)),d.append(l("code","sk-id",e.id));let p=l("p","sk-desc",c?.descriptionZh||e.description||s("\u65E0 description\uFF0C\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002"));if(r.append(i,d,p),e.warnings.length>0){let m=l("p","sk-warn",e.warnings.slice(0,2).map(b=>Oe(b)??b).join(" \xB7 "));r.append(m)}return o.append(r,Ys(e)),o},Pr=()=>{if(lt.replaceChildren(),!_)return;let e=K?D.find(r=>r.id===K):null,o=(e?e.skillIds.map(r=>_?.skills.find(i=>i.id===r)).filter(r=>!!r):_.skills).filter(r=>{if(!zo)return!0;let i=_t(r);return[r.id,r.name,r.description,i?.nameZh??"",i?.descriptionZh??"",...r.warnings].join(" ").toLowerCase().includes(zo)});if(o.length===0){let r=l("div","sk-empty");r.append(l("h2","",_.skills.length===0?s("\u6CA1\u6709\u53D1\u73B0\u6280\u80FD"):s(e?"\u8FD9\u4E2A\u5206\u7EC4\u6CA1\u6709\u53EF\u7528\u6280\u80FD":"\u6CA1\u6709\u5339\u914D\u7684\u6280\u80FD")),l("p","",_.skills.length===0?s("\u68C0\u67E5 ~/.config/opencode/skills \u662F\u5426\u5B58\u5728\uFF0C\u6216\u91CD\u65B0\u626B\u63CF\u3002"):s(e?"\u68C0\u67E5\u5206\u7EC4\u91CC\u7684\u6280\u80FD\u662F\u5426\u88AB\u79FB\u9664\u3002":"\u6362\u4E00\u4E2A\u641C\u7D22\u8BCD\u3002"))),lt.append(r);return}for(let r of o){let i=e&&e.skillIds.length>1?e.skillIds.indexOf(r.id)+1:0;lt.append(ei(r,i))}},E=()=>{ft.setAttribute("aria-busy",ne?"true":"false"),Ps(),Hs(),Ls(),Xs(),qs(),Ws(),Js(),Ns(),Pr(),vs.update({label:s(ne?"\u8BFB\u53D6\u4E2D\u2026":"\u91CD\u65B0\u626B\u63CF"),loading:ne,disabled:ne||!!S});let e=ve();Rr.update({disabled:ne||!!S||!_||e}),yr.update({disabled:ne||!!S||!_||e})},ti=e=>{Array.from(document.querySelectorAll("[data-skill-id]")).find(o=>o.dataset.skillId===e)?.focus()},mt=async(e=!1,t=!1)=>{if(!ne){ne=!0,t||(Ue=null),e&&E();try{_=Ke(await pe("GET","/skills")),Ue=null}catch(o){t||(Ue=Z(o))}finally{ne=!1,E()}}},Dr=async()=>{try{$e=xr(await pe("POST","/translations",$e)),Y=null}catch(e){Y=Z(e)}},oi=e=>{let t=new Map;try{let o=JSON.parse(e);if(!Array.isArray(o))return t;for(let r of o){if(!r||typeof r!="object")continue;let i=r;typeof i.id=="string"&&typeof i.name=="string"&&typeof i.description=="string"&&t.set(i.id,{name:i.name,description:i.description})}}catch{}return t},Gr=async e=>{if(e.request.system!==Lo)return;if(!e.ok){Ve||(Y=e.error,A={text:e.error,tone:"error"},E());return}if(!_){dt.length<8&&dt.push(e);return}let t=oi(e.request.prompt),o=Po(e.result.text),r=!1;for(let i of o){let c=_.skills.find(p=>p.id===i.id);if(!c)continue;let d=t.get(c.id);d&&(d.name!==c.name||d.description!==c.description)||($e.entries[c.id]={hash:c.contentHash,nameZh:i.nameZh,descriptionZh:i.descriptionZh,updatedAt:Date.now()},r=!0)}r&&(ut||(Re="translated",ut=!0),await Dr(),Ve||(A=Y?{text:s("\u7FFB\u8BD1\u5DF2\u8865\u5168\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}",{error:Y}),tone:"warning"}:{text:s("\u4E0A\u6B21\u672A\u5B8C\u6210\u7684\u7FFB\u8BD1\u5DF2\u8865\u5168\u3002"),tone:"success"}),E())},ni=async()=>{if(!_||Ve)return;let e=_.skills.filter(i=>!_t(i));if(e.length===0){A={text:s("\u4E2D\u6587\u8BF4\u660E\u5DF2\u662F\u6700\u65B0\u3002"),tone:"success"},E();return}Ve=!0,Y=null,Dt={done:0,total:e.length},A=null,E();let t=0,o=0,r=!1;try{for(let i=0;i<e.length;i+=4){let c=e.slice(i,i+4),d=c;for(let p=0;p<2&&d.length>0;p+=1){let m=await Te.generate({prompt:nr(d.map(O=>({id:O.id,name:O.name,description:O.description}))),system:Lo,maxOutputTokens:2048}),b=Po(m.text),C=new Set;for(let O of b){let N=d.find(X=>X.id===O.id);N&&($e.entries[N.id]={hash:N.contentHash,nameZh:O.nameZh,descriptionZh:O.descriptionZh,updatedAt:Date.now()},C.add(N.id))}d=d.filter(O=>!C.has(O.id))}o+=d.length,t+=c.length-d.length,Dt={done:t,total:e.length},await Dr(),E()}}catch(i){r=!0,Y=Z(i),A={text:Y,tone:"error"}}finally{Ve=!1,r||(Y?A={text:s("\u7FFB\u8BD1\u5B8C\u6210\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}",{error:Y}),tone:"warning"}:o>0?A={text:s("\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\uFF0C{failed} \u4E2A\u5931\u8D25\uFF1B\u53EF\u518D\u70B9\u201C\u7FFB\u8BD1\u201D\u91CD\u8BD5\u3002",{done:t,failed:o}),tone:"warning"}:A={text:s("\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\u3002",{done:t}),tone:"success"}),E()}},Gt=async(e=!1)=>{if(!(ye&&!e||v)){ye=!0,E();try{D=Ht(await pe("GET","/groups")),Ee=null,K&&!D.some(t=>t.id===K)&&(K=null)}catch(t){Ee=ys(t)}finally{ye=!1,E()}}},jo=async(e=!1)=>{if(ne)return;ne=!0,e&&E();let[t,o]=await Promise.allSettled([pe("GET","/skills"),pe("GET","/translations")]);if(t.status==="fulfilled")try{_=Ke(t.value),Ue=null}catch(r){Ue=Z(r)}else Ue=Z(t.reason);if(o.status==="fulfilled")try{$e=xr(o.value),Y=null,!ut&&Object.keys($e.entries).length>0&&(Re="translated")}catch(r){Y=Z(r)}else Y=Z(o.reason);if(ne=!1,E(),_&&dt.length>0){let r=dt;dt=[];for(let i of r)Gr(i)}},Vo=async(e,t)=>{if(!S){S=`toggle:${e.id}`,ue=null,re=null,A=null,E();try{_=Ke(await pe("POST","/skills/toggle",{id:e.id,enabled:t})),A={text:t?s("\u5DF2\u542F\u7528 {name}\u3002",{name:e.name}):s("\u5DF2\u5173\u95ED {name}\uFF1BOpenCode \u4E0B\u4E00\u6B21\u626B\u63CF\u540E\u4E0D\u518D\u53D1\u73B0\u5B83\u3002",{name:e.name}),tone:"success"},Te.toast({kind:"success",message:t?s("\u5DF2\u542F\u7528 {name}",{name:e.name}):s("\u5DF2\u5173\u95ED {name}",{name:e.name})}).catch(()=>{})}catch(o){A={text:Z(o),tone:"error"},S=null,E(),mt(!1,!0);return}S=null,E(),ti(e.id)}},Sr=async(e,t)=>{if(S)return;let o=e.activePath??e.disabledPath;if(o){S=`resolve:${o}`,A=null,E();try{let r=await pe("POST","/skills/resolve",{path:o,keep:t}),i=r&&typeof r=="object"&&typeof r.backupPath=="string"?r.backupPath:null;_=Ke(r),A={text:t==="enabled"?s("\u5DF2\u4FDD\u7559\u542F\u7528\u5165\u53E3{suffix}\u3002",{suffix:i?s("\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A {path}",{path:i}):""}):s("\u5DF2\u4FDD\u7559\u5173\u95ED\u5165\u53E3{suffix}\u3002",{suffix:i?s("\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A {path}",{path:i}):""}),tone:"success"},Te.toast({kind:"success",message:s("\u5165\u53E3\u51B2\u7A81\u5DF2\u5904\u7406")}).catch(()=>{})}catch(r){A={text:Z(r),tone:"error"},S=null,E(),mt(!1,!0);return}S=null,E()}},Hr=e=>{!_||S||(ue=e,re=null,A=null,E(),de.scrollIntoView({block:"nearest"}),de.querySelector("button")?.focus())},ri=async()=>{if(ue===null||S)return;let e=ue;ue=null,re=null,S="bulk",A=null,E();try{let t=await pe("POST","/skills/bulk",{enabled:e}),o=t&&typeof t=="object"&&Array.isArray(t.changed)?t.changed.filter(r=>typeof r=="string"):[];_=Ke(t),A={text:e?s("\u5DF2\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002",{count:o.length}):s("\u5DF2\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002",{count:o.length}),tone:"success"},Te.toast({kind:"success",message:e?s("\u5DF2\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002",{count:o.length}):s("\u5DF2\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002",{count:o.length})}).catch(()=>{})}catch(t){A={text:Z(t),tone:"error"},S=null,E(),mt(!1,!0);return}S=null,E()},Tr=()=>{ft.setAttribute("aria-label",s("\u6280\u80FD\u5F00\u5173")),Or.textContent=s("\u6280\u80FD\u5F00\u5173"),Et.setAttribute("aria-label",s("\u6280\u80FD\u8BF4\u660E\u8BED\u8A00")),Xe.textContent=s("\u7FFB\u8BD1"),ot.textContent=s("\u539F\u6587"),Rr.update({label:s("\u5168\u90E8\u542F\u7528")}),yr.update({label:s("\u5168\u90E8\u5173\u95ED")}),Me.placeholder=s("\u641C\u7D22\u540D\u79F0\u6216 ID"),Me.setAttribute("aria-label",s("\u641C\u7D22\u6280\u80FD")),Ur.textContent=s("\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002"),Mr.textContent=s("\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002"),Lt?.setAttribute("aria-label",s("\u5206\u7EC4\u7B5B\u9009")),me.textContent=s(v?"\u5173\u95ED\u7F16\u8F91":"\u7F16\u8F91\u5206\u7EC4"),me.setAttribute("aria-pressed",v?"true":"false"),E()};Te.onLateGenerateResult(e=>{Gr(e)});Te.onReady(e=>{ko(e,document.documentElement);let t=et.setLocale(e.locale);if(Do(et),document.title=s("\u6280\u80FD\u5F00\u5173"),ur){if(!t){E();return}A=null,J=null,Tr(),jo(!0),Gt(!0);return}ur=!0,t&&Tr(),jo(!0),Gt(!0)});document.title=s("\u6280\u80FD\u5F00\u5173");E();})();
