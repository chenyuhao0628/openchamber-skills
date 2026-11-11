"use strict";(()=>{var M="openchamber.sdk";var xt="data-oc-scrolling",oo=`
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
:hover, [${xt}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${xt}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${xt}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${xt}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function no(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",n=>{let r=n.target===e?t:n.target;if(!(r instanceof Element))return;r.hasAttribute("data-oc-scrolling")||r.setAttribute("data-oc-scrolling","");let l=o.get(r);l!==void 0&&clearTimeout(l),o.set(r,setTimeout(()=>{o.delete(r),r.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var bs=`(${no.toString()})(document);`;var Pn=/^[a-z][a-z0-9-]{0,39}$/;var Un=e=>Object(e)===e&&!Array.isArray(e),ro=(e,t)=>Object.keys(e).every(o=>t.includes(o)),Nn=e=>String(e)===e&&e.length>=1&&e.length<=60,Ln=e=>String(e)===e&&e.length>=1&&e.length<=80,Dn=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let o of e){if(!Un(o)||!Pn.test(o.id)||!Nn(o.label)||o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1||t.has(o.id))return!1;if(t.add(o.id),o.kind==="button"){if(!ro(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!ro(o,["kind","id","label","value","options","disabled"])||!Ln(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let n=new Set;for(let r of o.options){if(!Un(r)||!ro(r,["value","label"])||!Ln(r.value)||!Nn(r.label)||n.has(r.value))return!1;n.add(r.value)}if(!n.has(o.value))return!1}return!0};var Gn=["{id}","{segment}","{segments+}"];var ea=new Set(Gn);var Hn=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var oa=new Set(Hn);var so=e=>"bytes"in e?e.bytes.byteLength:e.content.length,Vn=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==t.bytes[o])return!1;return!0};var Xn=/^[A-Za-z0-9_-]{1,80}$/;var $n=["left","right","top","bottom"];var Bn=(e,t=0,o={remaining:16e3})=>{if(--o.remaining<0||t>=32)return!1;if(e===null)return!0;let n=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let r of n)if(!Bn(r,t+1,o))return!1;return!0},io=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(io);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(io)}return String(e)===e||Number.isFinite(e)},ao=e=>{try{return String(e.id)!==e.id||!Xn.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!$n.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Bn(e.data)||!io(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var co=2e3;var zn=["file","directory","other","missing"],po=e=>!!(e&&"sessionId"in e),uo=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Kn=/^[0-9a-f]{7,64}$/i,fo=e=>Kn.test(e),At=500,Ot=32e3,jn=16e3,Wn=128,qn=200,Jn=2e3,Zn=16e3,Qn=80,Yn=200,er=16e3;var tr=2e3;var Eo=2e4,yt=1024,Rt=2e6;var vt=64e3,It=8e3,mo=4e3;var _o=96e4,As=60*6e4;var or=999,nr=1e4,it=500,rr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],sr=["stopped","starting","ready","failed"],Os=new Set(rr),ir=e=>Os.has(e),ar=e=>e&&ir(e)?e:"HOST_REJECTED",Qe=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(Qe):Object(e)===e?Object.values(e).every(Qe):!1,lr=e=>Qe(e)&&JSON.stringify(e).length<=er,Fn=e=>e?.trim().slice(0,Yn)??"",Ye=e=>{let t=e.id.trim().slice(0,Wn),o=e.title.trim().slice(0,qn),n=e.url.trim().slice(0,Jn),r=e.text?.trim().slice(0,Zn),l=e.author?.trim().slice(0,Qn),c=e.kind==="pull"?"pull":"issue",p={providerId:e.providerId.trim(),id:t,title:o||t,url:n,kind:c};if(r&&(p.text=r),l&&(p.author=l),c==="pull"){let E=Fn(e.branches?.head),f=Fn(e.branches?.base);E&&f&&(p.branches={head:E,base:f})}return lr(e.data)&&(p.data=e.data),p},go=e=>{let t=Ye(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},So=e=>{let t={text:e.text.trim().slice(0,jn)};return e.send&&(t.send=!0),t},ho=e=>e===null||!Number.isFinite(e)?null:Math.min(or,Math.max(0,Math.round(e))),To=e=>Number.isFinite(e)?Math.min(nr,Math.max(0,Math.ceil(e))):0;var et=e=>e.length>0&&e.length<=yt&&!e.includes("\0")&&!e.includes("\\");var wt=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>tr?!1:!e.split("/").some(o=>o==="."||o===".."),ys=new Set(sr),ko=e=>!!(e&&"status"in e&&ys.has(String(e.status))&&!("body"in e)),Ct=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),bo=e=>!!(e&&"content"in e&&String(e.content)===e.content),xo=e=>!!(e&&"written"in e&&e.written===!0),Ao=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),Rs=new Set(zn),Oo=e=>!!(e&&"kind"in e&&"size"in e&&Rs.has(String(e.kind))&&Number.isFinite(e.size)),yo=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),vs=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Is=e=>Object(e)===e?e:null,lo=e=>String(e)===e&&e.length>0,ws=e=>{if(!lo(e.id))return null;if(e.ok===!0){let t={channel:M,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&lo(e.error)?{channel:M,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:ar(lo(e.code)?e.code:void 0)}:null},Ro=e=>{let t=Is(e);return!t||t.channel!==M||t.v!==1?null:t.type==="result"?ws(t):!vs.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var cr=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Cs=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",b=class extends Error{code;constructor(t,o){super(o),this.name="HostRequestError",this.code=t}},dr=()=>Promise.reject(new b("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Mt=()=>Promise.reject(new b("BAD_PATH",`File path must be 1 to ${yt} characters without NUL or backslash.`)),Ut=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new b("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},v=e=>(e.value+=1,`oc-${e.value}`),Mo=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new b("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??(i=>i===t.parent),n=e.requestTimeoutMs??Eo,r=new Set,l=new Set,c=new Set,p=new Set,E=new Set,f=new Set,A=new Set,h=new Set,O=new Set,L=new Set,W=new Set,se=new Set,ge=[],w=null,te=null,le=new Set,R=new Set,N=null,C=null,X=!1,Y=new Map,q=new Map,ue=new Map,ie=!1,u={value:0},m=null,ne=null,be=!1,Ue=!1,kn=null,bn=i=>i?{sessionId:i.id,phase:i.busy?"started":"completed"}:null,Se=i=>{t.parent.postMessage(i,"*")},xn=()=>{ie||t.parent===t||se.size===0||m?.features?.lateGenerateResults!==!0||Se({channel:M,v:1,type:"generate-late-listen"})},V=(i,a)=>{for(let T of i)try{T(a)}catch(k){console.error(k)}},An=i=>{if(!(i instanceof MessageEvent)||!o(i.source))return;let a=Ro(i.data);if(!a)return;if(a.type==="workspace"){let k=q.get(a.payload.subscriptionId);k&&V([k],a.payload.snapshot);return}if(a.type==="shells"){let k=ue.get(a.payload.subscriptionId);k&&V([k],a.payload.snapshot);return}if(a.type==="ready"){m=a.payload,ne=bn(a.payload.session),V(r,a.payload),V(l,a.payload.directory),V(c,a.payload.session),ne&&V(p,ne),V(E,a.payload.connection),V(f,a.payload.settings),V(A,a.payload.item),a.payload.block&&V(h,a.payload.block),xn();return}if(a.type==="service-event"){V(O,a.payload);return}if(a.type==="generate-late"){se.size===0?ge.push(a.payload):V(se,a.payload);return}if(a.type==="directory"){m&&(m={...m,directory:a.payload.directory}),V(l,a.payload.directory);return}if(a.type==="session"){m&&(m={...m,session:a.payload.session}),a.payload.session?ne?.sessionId!==a.payload.session.id&&(ne=bn(a.payload.session)):ne=null,V(c,a.payload.session);return}if(a.type==="session-lifecycle"){ne=a.payload,V(p,a.payload);return}if(a.type==="connection"){m&&(m={...m,connection:a.payload.connection}),V(E,a.payload.connection);return}if(a.type==="settings"){m&&(m={...m,settings:a.payload.settings}),V(f,a.payload.settings);return}if(a.type==="item"){m&&(m={...m,item:a.payload.item}),V(A,a.payload.item);return}if(a.type==="status-control-event"){V(L,a.payload);return}if(a.type==="popover-closed"){V(W,a.payload);return}if(a.type==="action"){let k=P=>{ie||Se({channel:M,v:1,type:"action-result",id:a.id,payload:P})},D=te;if(!D){k({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>D(a.payload)).then(()=>k({ok:!0}),P=>{let Z=(P instanceof Error?P.message:String(P)).trim();k({ok:!1,error:(Z||"Action failed.").slice(0,it)})});return}if(a.type==="file-open"){let k=a.payload;if(C&&Vn(C,k))return;C=k,V(le,a.payload);return}if(a.type==="file-saved"){V(R,a.payload.version);return}if(a.type==="file-snapshot"){let k=Z=>{ie||Se({channel:M,v:1,type:"file-snapshot-result",id:a.id,payload:Z})},D=Z=>k({error:(Z.trim()||"Could not read the edited file.").slice(0,it)}),P=N;if(!P){D("This extension does not edit files.");return}Promise.resolve().then(()=>P(a.payload.purpose)).then(Z=>{if(so(Z)>2e7){D(`The file is over ${2e7} ${"bytes"in Z?"bytes":"characters"}.`);return}if(Z.version.length>256){D(`The snapshot version is over ${256} characters.`);return}k({snapshot:"bytes"in Z?{bytes:Z.bytes,version:Z.version}:{content:Z.content,version:Z.version}})},Z=>D(Z instanceof Error?Z.message:String(Z)));return}if(a.type==="resolve"){let k=P=>{Se({channel:M,v:1,type:"resolve-result",id:a.id,payload:P})},D=w;if(!D){k({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>D(a.payload)).then(P=>k({item:P?Ye(P):null}),P=>{let Z=(P instanceof Error?P.message:String(P)).trim();k({error:(Z||"Command failed.").slice(0,it)})});return}let T=Y.get(a.id);if(T){if(clearTimeout(T.timer),Y.delete(a.id),a.ok){T.resolve(a.payload);return}T.reject(new b(a.code,a.error))}};t.addEventListener("message",An),Se({channel:M,v:1,type:"hello"});let ce=(i,a=n)=>ie||t.parent===t?Promise.reject(new b("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((T,k)=>{let D=setTimeout(()=>{Y.delete(i.id),k(new b("HOST_TIMEOUT","Host did not answer in time."))},a);Y.set(i.id,{resolve:T,reject:k,timer:D}),Se(i)}),z=i=>ce(i).then(()=>{}),J={channel:M,v:1},Yt=i=>{!ie&&t.parent!==t&&Se(i)},On=()=>Yt({...J,type:"file-save"}),yn=i=>{!cr(i)||!Cs(i)||(i.preventDefault(),On())},Rn=i=>{!cr(i)||i.key!=="Escape"||m?.surface!=="popover"||!m.popover||(i.preventDefault(),Cn(m.popover.id,"escape").catch(()=>{}))},Tt=()=>{let i=m?.surface==="popover"?m.popover:void 0;if(!i)return;let a=be||Ue;kn!==a&&(kn=a,Mn(i.id,a).catch(()=>{}))},kt=()=>{m?.surface!=="popover"||be||(be=!0,Tt())},vn=i=>{m?.surface!=="popover"||i.relatedTarget!==null||!be||(be=!1,Tt())},In=()=>{m?.surface!=="popover"||Ue||(Ue=!0,Tt())},wn=()=>{m?.surface!=="popover"||!Ue||(Ue=!1,Tt())},Re=(i,a=1024)=>{if(!i.trim()||i.length>a)throw new b("HOST_REJECTED",`Identity must contain 1 to ${a} characters.`)},eo=async i=>{i.kind!=="projects"&&Re(i.projectId);let a=await ce({...J,type:"workspace-read",id:v(u),payload:i});if(!a||!("kind"in a)||!("state"in a)||a.kind!==i.kind)throw new b("HOST_REJECTED","Host did not return workspace data.");return a},to=async(i,a)=>{i.kind!=="projects"&&Re(i.projectId);let T=v(u);q.set(T,a);try{await z({...J,type:"workspace-subscribe",id:v(u),payload:{subscriptionId:T,query:i}})}catch(k){throw q.delete(T),ie||Se({...J,type:"workspace-unsubscribe",id:v(u),payload:{subscriptionId:T}}),k}return()=>{!q.delete(T)||ie||Se({...J,type:"workspace-unsubscribe",id:v(u),payload:{subscriptionId:T}})}},ks=async(i,a)=>{i.kind==="session"&&Re(i.sessionId),i.kind==="project"&&Re(i.projectId);let T=v(u);ue.set(T,a);try{await z({...J,type:"shells-subscribe",id:v(u),payload:{subscriptionId:T,scope:i}})}catch(k){throw ue.delete(T),ie||Se({...J,type:"shells-unsubscribe",id:v(u),payload:{subscriptionId:T}}),k}return()=>{!ue.delete(T)||ie||Se({...J,type:"shells-unsubscribe",id:v(u),payload:{subscriptionId:T}})}},bt=async i=>{if("key"in i&&(i.key.length===0||i.key.length>128))throw new b("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(i.op==="set"&&!Qe(i.value))throw new b("HOST_REJECTED","Storage values must be JSON.");if(i.op==="set"&&new TextEncoder().encode(JSON.stringify(i.value)).length>65536)throw new b("HOST_REJECTED","Storage value exceeds 64 KiB.");if(i.scope==="device"&&m?.features?.deviceStorage!==!0)throw new b("UNSUPPORTED","This host does not support device storage.");let a=await ce({...J,type:"storage",id:v(u),payload:i});if(!a||!("storage"in a)||a.op!==i.op)throw new b("HOST_REJECTED","Host did not return storage data.");return a},Cn=(i,a)=>m?.features?.popovers!==!0&&!(m?.surface==="popover"&&m.popover?.id===i)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):z({...J,type:"popover-close",id:v(u),payload:a?{id:i,reason:a}:{id:i}}),Mn=(i,a)=>m?.features?.popovers!==!0&&!(m?.surface==="popover"&&m.popover?.id===i)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):z({...J,type:"popover-anchor",id:v(u),payload:{id:i,active:a}});return t.addEventListener("keydown",Rn,!0),t.addEventListener("pointerover",kt),t.addEventListener("pointermove",kt),t.addEventListener("pointerout",vn),t.addEventListener("focus",In),t.addEventListener("blur",wn),{onAction:i=>(te=i,()=>{te===i&&(te=null)}),listProjects:async()=>{let i=await eo({kind:"projects"});if(i.kind!=="projects")throw new b("HOST_REJECTED","Expected projects.");return i},listWorktrees:async i=>{let a=await eo({kind:"worktrees",projectId:i});if(a.kind!=="worktrees")throw new b("HOST_REJECTED","Expected worktrees.");return a},listSessions:async i=>{let a=await eo({kind:"sessions",projectId:i});if(a.kind!=="sessions")throw new b("HOST_REJECTED","Expected sessions.");return a},onProjects:i=>to({kind:"projects"},a=>{a.kind==="projects"&&i(a)}),onWorktrees:(i,a)=>to({kind:"worktrees",projectId:i},T=>{T.kind==="worktrees"&&a(T)}),onSessions:(i,a)=>to({kind:"sessions",projectId:i},T=>{T.kind==="sessions"&&a(T)}),onRunningShells:(i,a)=>ks(i,a),readShellOutput:async(i,a)=>{Re(i,128);let T=a?.cursor;if(T!==void 0&&(!Number.isInteger(T)||T<0))throw new b("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let k=a?.tailBytes;if(k!==void 0&&(!Number.isInteger(k)||k<1||k>65536))throw new b("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let P=await ce({...J,type:"shell-output",id:v(u),payload:{shellId:i,cursor:T,tailBytes:k}});if(!P||typeof P.output!="string"||!Number.isFinite(P.cursor))throw new b("HOST_REJECTED","Host did not return shell output.");return P},stopShell:async i=>{if(Re(i,128),(await ce({...J,type:"shell-stop",id:v(u),payload:{shellId:i}}))?.stopped!==!0)throw new b("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async i=>{Re(i),await z({...J,type:"open-session",id:v(u),payload:{sessionId:i}})},storage:{get:async(i,a)=>{let T=Ut(a),k={op:"get",key:i};T&&(k.scope=T);let D=await bt(k);return D.op==="get"&&D.found?D.value:void 0},set:async(i,a,T)=>{let k=Ut(T),D={op:"set",key:i,value:a};k&&(D.scope=k),await bt(D)},delete:async(i,a)=>{let T=Ut(a),k={op:"delete",key:i};T&&(k.scope=T),await bt(k)},keys:async i=>{let a=Ut(i),T={op:"keys"};a&&(T.scope=a);let k=await bt(T);if(k.op!=="keys")throw new b("HOST_REJECTED","Expected storage keys.");return k.keys}},onReady:i=>(r.add(i),m&&i(m),()=>{r.delete(i)}),onDirectory:i=>(l.add(i),m&&i(m.directory),()=>{l.delete(i)}),onSession:i=>(c.add(i),m&&i(m.session),()=>{c.delete(i)}),onSessionLifecycle:i=>(p.add(i),ne&&i(ne),()=>{p.delete(i)}),onConnection:i=>(E.add(i),m&&i(m.connection),()=>{E.delete(i)}),onSettings:i=>(f.add(i),m&&i(m.settings),()=>{f.delete(i)}),onItem:i=>(A.add(i),m&&i(m.item),()=>{A.delete(i)}),onBlock:i=>(h.add(i),m?.block&&i(m.block),()=>{h.delete(i)}),onServiceEvent:i=>(O.add(i),()=>{O.delete(i)}),onStatusControl:i=>(L.add(i),()=>{L.delete(i)}),onPopoverClosed:i=>(W.add(i),()=>{W.delete(i)}),setStatusControls:i=>m?.features?.statusControls!==!0?Promise.reject(new b("UNSUPPORTED","This host does not support status controls.")):Dn(i)?z({...J,type:"status-controls",id:v(u),payload:{controls:i}}):Promise.reject(new b("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:i=>m?.features?.popovers!==!0?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):ao(i)?z({...J,type:"popover-open",id:v(u),payload:i}):Promise.reject(new b("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:Cn,setPopoverAnchorActive:Mn,onResolve:i=>(w=i,()=>{w===i&&(w=null)}),toast:i=>{let a=i.message.trim();return!a||a.length>At?Promise.reject(new b("HOST_REJECTED",`Toast message must contain 1 to ${At} characters.`)):i.copy&&i.copy!==!0&&(!i.copy.text.length||i.copy.text.length>Ot)?Promise.reject(new b("HOST_REJECTED",`Toast copy text must contain 1 to ${Ot} characters.`)):z({channel:M,v:1,type:"toast",id:v(u),payload:{...i,message:a}})},openUrl:i=>z({channel:M,v:1,type:"open-url",id:v(u),payload:{url:i}}),openCommit:i=>fo(i)?z({channel:M,v:1,type:"open-commit",id:v(u),payload:{sha:i}}):Promise.reject(new b("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:i=>z({channel:M,v:1,type:"block-answer",id:v(u),payload:{text:i.trim().slice(0,co)}}),openSurface:i=>z({channel:M,v:1,type:"open-surface",id:v(u),payload:{surfaceId:i}}),writeClipboard:i=>z({channel:M,v:1,type:"clipboard-write",id:v(u),payload:{text:i}}),compose:i=>z({channel:M,v:1,type:"compose",id:v(u),payload:i}),attach:i=>z({channel:M,v:1,type:"attach",id:v(u),payload:Ye(i)}),startSession:async i=>{i.projectId!==void 0&&Re(i.projectId);let a=i.worktree;a&&a!==!0&&(a.kind==="existing"?Re(a.directory):(a.name!==void 0&&Re(a.name,200),a.baseBranch!==void 0&&Re(a.baseBranch,200)));let T=await ce({channel:M,v:1,type:"start-session",id:v(u),payload:go(i)},e.requestTimeoutMs??18e4);if(!po(T))throw new b("HOST_REJECTED","Host did not return a session.");return T},prompt:i=>ce({channel:M,v:1,type:"prompt",id:v(u),payload:So(i)}).then(a=>{if(!uo(a))throw new b("HOST_REJECTED","Host did not return a prompt result.");return a}),sessionLink:i=>z({channel:M,v:1,type:"session-link",id:v(u),payload:Ye(i)}),close:()=>z({channel:M,v:1,type:"close",id:v(u)}),oauthStart:()=>z({channel:M,v:1,type:"oauth-start",id:v(u)}),oauthDisconnect:()=>z({channel:M,v:1,type:"oauth-disconnect",id:v(u)}),request:i=>(wt(i.path)?ce({channel:M,v:1,type:"request",id:v(u),payload:i}):dr()).then(a=>{if(!Ct(a))throw new b("HOST_REJECTED","Host request result was empty.");return a}),serviceRequest:i=>(wt(i.path)?ce({channel:M,v:1,type:"service-request",id:v(u),payload:i}):dr()).then(a=>{if(!Ct(a))throw new b("HOST_REJECTED","Host service request result was empty.");return a}),serviceStatus:()=>ce({channel:M,v:1,type:"service-status",id:v(u)}).then(i=>{if(!ko(i))throw new b("HOST_REJECTED","Host did not return service status.");return i}),readFile:i=>(et(i)?ce({channel:M,v:1,type:"file-read",id:v(u),payload:{path:i}}):Mt()).then(a=>{if(!bo(a))throw new b("HOST_REJECTED","Host did not return file content.");return a}),writeFile:(i,a)=>et(i)?a.length>Rt?Promise.reject(new b("FILE_TOO_LARGE",`Content is over ${Rt} characters.`)):ce({channel:M,v:1,type:"file-write",id:v(u),payload:{path:i,content:a}}).then(T=>{if(!xo(T))throw new b("HOST_REJECTED","Host did not confirm the write.");return T}):Mt(),listDir:i=>(et(i)?ce({channel:M,v:1,type:"file-list",id:v(u),payload:{path:i}}):Mt()).then(a=>{if(!Ao(a))throw new b("HOST_REJECTED","Host did not return directory entries.");return a}),stat:i=>(et(i)?ce({channel:M,v:1,type:"file-stat",id:v(u),payload:{path:i}}):Mt()).then(a=>{if(!Oo(a))throw new b("HOST_REJECTED","Host did not return file status.");return a}),generate:i=>{let a=i.prompt.trim(),T=i.system?.trim();if(a.length===0||a.length>vt)return Promise.reject(new b("HOST_REJECTED",`Prompt must be 1 to ${vt} characters.`));if(T!==void 0&&(T.length===0||T.length>It))return Promise.reject(new b("HOST_REJECTED",`System prompt must be 1 to ${It} characters.`));let k=i.maxOutputTokens===void 0?void 0:Math.min(mo,Math.max(1,Math.floor(i.maxOutputTokens)));if(k!==void 0&&!Number.isFinite(k))return Promise.reject(new b("HOST_REJECTED","maxOutputTokens must be a number."));let D={prompt:a};return T!==void 0&&(D.system=T),k!==void 0&&(D.maxOutputTokens=k),ce({channel:M,v:1,type:"generate",id:v(u),payload:D},e.requestTimeoutMs??_o).then(P=>{if(!yo(P))throw new b("HOST_REJECTED","Host did not return generated text.");return P})},onLateGenerateResult:i=>{se.add(i);for(let a of ge.splice(0))V([i],a);return xn(),()=>{se.delete(i)}},setBadge:i=>z({channel:M,v:1,type:"badge",id:v(u),payload:{count:ho(i)}}),setHeight:i=>z({channel:M,v:1,type:"resize",id:v(u),payload:{height:To(i)}}),onFileOpen:i=>(le.add(i),X||(X=!0,t.addEventListener("keydown",yn,!0)),C&&i(C),()=>{le.delete(i)}),onFileSnapshot:i=>(N=i,()=>{N===i&&(N=null)}),onFileSaved:i=>(R.add(i),()=>{R.delete(i)}),reportFileChange:i=>Yt({...J,type:"file-change",payload:{dirty:i.dirty,edited:i.edited}}),requestFileSave:On,reportFileUnsupported:()=>Yt({...J,type:"file-unsupported"}),dispose:()=>{for(let i of q.keys())Se({...J,type:"workspace-unsubscribe",id:v(u),payload:{subscriptionId:i}});q.clear();for(let i of ue.keys())Se({...J,type:"shells-unsubscribe",id:v(u),payload:{subscriptionId:i}});ue.clear(),ie=!0,w=null,te=null,N=null,le.clear(),R.clear(),X&&t.removeEventListener("keydown",yn,!0),t.removeEventListener("message",An),t.removeEventListener("keydown",Rn,!0),t.removeEventListener("pointerover",kt),t.removeEventListener("pointermove",kt),t.removeEventListener("pointerout",vn),t.removeEventListener("focus",In),t.removeEventListener("blur",wn);for(let i of Y.values())clearTimeout(i.timer),i.reject(new b("HOST_UNAVAILABLE","Host client was disposed."));Y.clear(),r.clear(),l.clear(),c.clear(),p.clear(),E.clear(),f.clear(),A.clear(),h.clear(),O.clear(),L.clear(),W.clear(),se.clear(),ge.length=0}}};var fr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var ga=new Set(fr);var Ms=10*6e4;var Us=10*6e4;var Ns=10*6e4;var Ls=10*6e4;var Er=["none","agent","user"];var ha=new Set(Er);var Ps=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Ds=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],mr=(e,t)=>{t.style.colorScheme=e.mode;for(let[o,n]of Ps)t.style.setProperty(o,e.tokens[n]);for(let[o,n,r]of Ds){let l=e.tokens[r]??"";t.style.setProperty(o,l),t.style.setProperty(n,l)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Uo=(e,t)=>{mr(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var Gs={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},G=(e,t)=>`var(--${e}, var(--oc-${Gs[e]}, ${t}))`,Le=G("surface-background","transparent"),Lt=G("surface-elevated","transparent"),tt=G("surface-elevated-foreground","inherit"),he=G("surface-foreground","inherit"),$=G("surface-muted-foreground","gray"),Hs=G("surface-muted","transparent"),je=G("interactive-border","currentColor"),fe=G("interactive-hover","transparent"),We=G("interactive-active","transparent"),No=G("interactive-selection","transparent"),Lo=G("interactive-selection-foreground","inherit"),Ne=G("primary","currentColor"),Po=G("primary-text","inherit"),Do=G("error-text","inherit"),Vs=G("font-sans","inherit"),Go=G("font-mono","monospace"),hr=G("radius","9px"),Ho=`calc(${hr} - 2px)`,_r=`calc(${hr} - 4px)`,B=(e,t,o="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${o})`,gr=`background-image: linear-gradient(${fe}, ${fe});`,Vo=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,Xo="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Sr="box-shadow: var(--oc-sdk-lit);",$o=`inset 0 0.5px 0 0 ${B(he,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Xs=`
:root {
  --oc-sdk-edge: ${B(he,16)};
  --oc-sdk-field-bg: ${Lt};
  --oc-sdk-raised-bg: ${Le};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${B(he,14)};
  --oc-sdk-field-bg: ${B(Le,50,Lt)};
  --oc-sdk-raised-bg: ${Lt};
  --oc-sdk-field-lift: ${$o};
  --oc-sdk-raised-lift: ${$o};
  --oc-sdk-lit: ${$o};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Nt=e=>{let t=G(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${G(`${e}-text`,"inherit")}; }`},$s=`
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
`,Tr=`${Xs}
.oc-sdk { color: ${he}; font-family: ${Vs}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${gr} }
.oc-sdk-mono { font-family: ${Go}; }
.oc-sdk-muted { color: ${$}; }
${Nt("success")}${Nt("warning")}${Nt("error")}${Nt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Ne}; --oc-sdk-tone-text: ${Po}; }

.oc-sdk-btn { border-radius: ${Ho}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${_r}; }
.oc-sdk-btn[data-variant="default"] { color: ${Po}; background: ${B(Ne,10,Le)}; border-color: ${B(Ne,12)}; ${Sr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${B(Ne,16,Le)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${B(Ne,22,Le)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Hs}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${fe}, ${fe}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${We}, ${We}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${tt}; ${Xo} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${fe}, ${fe}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${We}, ${We}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${fe}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${We}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${G("status-error","red")}; color: ${Do}; background: ${B("var(--oc-sdk-tone)",7,Le)}; border-color: ${B("var(--oc-sdk-tone)",12)}; ${Sr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${B("var(--oc-sdk-tone)",9,Le)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${B("var(--oc-sdk-tone)",11,Le)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Do}; }
.oc-sdk-input { border-radius: ${Ho}; background: var(--oc-sdk-field-bg); color: ${tt}; ${Vo("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${fe}, ${fe}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Vo(B(he,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Vo(G("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Go}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Ne}; }
.oc-sdk-search-clear { border-radius: ${_r}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${fe}; color: ${he}; }

.oc-sdk-trigger { border-radius: ${Ho}; background: var(--oc-sdk-raised-bg); color: ${tt}; ${Xo} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${fe}, ${fe}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${We}, ${We}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${tt}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Lt}; background-clip: padding-box; color: ${tt}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${fe}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${No}; color: ${Lo}; }
.oc-sdk-option-check { color: ${he}; }
.oc-sdk-option[data-destructive="true"] { color: ${Do}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${B(G("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${je}; border-radius: 4px; color: ${he}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${B(he,60,je)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${je}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Le}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Ne}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${gr} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${B(he,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${he}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Lo}; background: ${No}; border-color: ${je}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${tt}; background: var(--oc-sdk-raised-bg); ${Xo} }
.oc-sdk-tab-count { color: ${$}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${B(he,6)}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${B("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${fe}; }
.oc-sdk-row[aria-selected="true"] { background: ${No}; color: ${Lo}; }
.oc-sdk-row-lead { font-family: ${Go}; color: ${$}; }
.oc-sdk-row-sub { color: ${$}; }
.oc-sdk-row-meta { color: ${$}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${$}; }

.oc-sdk-empty-body { color: ${$}; }

.oc-sdk-spinner { color: ${$}; }
.oc-sdk-spinner-ring { border-color: ${je}; border-top-color: ${Ne}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${B("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${$}; }

.oc-sdk-separator { color: ${$}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${B(je,40)}; }

.oc-sdk-progress-label { color: ${$}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${B(he,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Ne}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${G("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${G("success-text","inherit")}; }

.oc-sdk-text a { color: ${Po}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${B(je,60)}; }
`,K=`
${oo}
${$s}
${Tr}`;var kr="oc-sdk-ui-style",Be=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},j=e=>{let t=document.getElementById(kr);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}no(document);let o=document.createElement("style");o.id=kr,o.textContent=e,document.head.appendChild(o)},I=(e,t)=>{let o=document.createElement(e);return t&&(o.className=t),o},xe=e=>{let t=I("button",e);return t.type="button",t},de=(e,t)=>{let o=t??"";e.textContent!==o&&(e.textContent=o)},Ie=(e,t,o)=>{o==null||o===""?e.removeAttribute(t):e.getAttribute(t)!==o&&e.setAttribute(t,o)},br=(e,t)=>{let o=n=>{n.target instanceof Node&&e.contains(n.target)||t()};return document.addEventListener("pointerdown",o,!0),()=>{document.removeEventListener("pointerdown",o,!0)}};var Bs=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},we=(e,t)=>{j(K);let o=t,n=xe("oc-sdk oc-sdk-btn"),r=Bs(),l=document.createElement("span");n.append(l),e.append(n);let c=()=>{n.dataset.variant=o.variant??"default",n.dataset.size=o.size??"default",n.disabled=!!o.disabled||!!o.loading,n.dataset.loading=o.loading?"true":"false",n.setAttribute("aria-busy",o.loading?"true":"false"),o.loading&&r.parentNode!==n?n.prepend(r):!o.loading&&r.parentNode===n&&r.remove(),de(l,o.label)},p=()=>{o.disabled||o.loading||o.onClick()};return n.addEventListener("click",p),c(),{update:E=>{o={...o,...E},c()},dispose:()=>{n.removeEventListener("click",p),n.remove()}}};var xr="http://www.w3.org/2000/svg",Fs={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ce=(e,t,o)=>{let n=document.createElementNS(xr,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("width",String(t)),n.setAttribute("height",String(t)),n.setAttribute("aria-hidden","true"),n.setAttribute("fill","currentColor"),o&&n.setAttribute("class",o);let r=document.createElementNS(xr,"path");return r.setAttribute("d",Fs[e]),n.append(r),n};var Bo=(e,t)=>{j(K);let o=t,n=I("div","oc-sdk oc-sdk-search"),r=I("input","oc-sdk-input");r.type="text",r.spellcheck=!1,r.autocomplete="off",r.setAttribute("role","searchbox");let l=xe("oc-sdk-search-clear");l.append(Ce("close",14)),l.tabIndex=-1,n.append(Ce("search",16,"oc-sdk-search-icon"),r,l),e.append(n);let c=()=>{let A=o.placeholder??"Search";Ie(r,"placeholder",A),r.setAttribute("aria-label",o.label??A),l.setAttribute("aria-label","Clear search"),r.value!==o.value&&(r.value=o.value),n.dataset.active=o.value.trim()===""?"false":"true"},p=()=>{o.value!==""&&o.onChange(""),r.focus()},E=()=>{o.onChange(r.value)},f=A=>{A.key==="Escape"&&r.value!==""&&(A.preventDefault(),p())};return r.addEventListener("input",E),r.addEventListener("keydown",f),l.addEventListener("click",p),c(),o.autofocus&&r.focus(),{update:A=>{o={...o,...A},c()},dispose:()=>{r.removeEventListener("input",E),r.removeEventListener("keydown",f),l.removeEventListener("click",p),n.remove()}}};var Pe=(e,t="vertical")=>{let[o,n]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===o||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===n||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},Fe=(e,t,o)=>{let n=e.filter(E=>!E.disabled);if(n.length===0)return null;let r=n[0],l=n[n.length-1];if(o==="first"||!r||!l)return r?.id??null;if(o==="last")return l.id;let c=n.findIndex(E=>E.id===t);return c===-1?o==="next"?r.id:l.id:n[Math.min(n.length-1,Math.max(0,c+(o==="next"?1:-1)))]?.id??null};var Ar=(e,t)=>`${e}-${t??""}`,Pt=(e,t,o,n)=>{let r=xe("oc-sdk-option");r.id=Ar(e,o.id),r.setAttribute("role",t),r.tabIndex=-1,r.disabled=!!o.disabled,t==="option"&&r.setAttribute("aria-selected",o.selected?"true":"false"),r.dataset.destructive=o.destructive?"true":"false";let l=I("span","oc-sdk-option-label");if(l.textContent=o.label,r.append(l),o.hint){let c=I("span","oc-sdk-option-hint");c.textContent=o.hint,r.append(c)}if(t==="option"){r.dataset.mark="check";let c=I("span","oc-sdk-option-check");c.append(Ce("check",14)),r.append(c)}return r.addEventListener("pointerenter",n.hover),r.addEventListener("click",n.pick),r},Dt=(e,t,o,n)=>{let r=Ar(o,n);for(let l of Array.from(e.children))l instanceof HTMLElement&&l.classList.contains("oc-sdk-option")&&(l.dataset.active=l.id===r?"true":"false");Ie(t,"aria-activedescendant",n?r:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var zs=(e,t)=>{let o=t.getBoundingClientRect();e.style.minWidth=`${Math.round(o.width)}px`,e.style.left=`${Math.round(o.left)}px`,e.style.top=`${Math.round(o.bottom+4)}px`;let n=e.offsetHeight,r=window.innerHeight-o.bottom-8;n>r&&o.top-8>r&&(e.style.top=`${Math.max(8,Math.round(o.top-4-n))}px`);let l=o.left+e.offsetWidth-window.innerWidth+8;l>0&&(e.style.left=`${Math.max(8,Math.round(o.left-l))}px`)},Gt=(e,t,o,n)=>{e.append(o),zs(o,t);let r=br(e,n),l=()=>{n()},c=p=>{p.target instanceof Node&&o.contains(p.target)||n()};return window.addEventListener("resize",l),window.addEventListener("scroll",c,!0),()=>{r(),window.removeEventListener("resize",l),window.removeEventListener("scroll",c,!0),o.remove()}};var Or=(e,t)=>{let o=t.trim().toLowerCase();return o?e.filter(n=>n.label.toLowerCase().includes(o)||n.id.toLowerCase().includes(o)):[...e]},Ks=0,at=(e,t)=>{j(K);let o=t,n=`oc-sdk-select-${Ks+=1}`,r=I("div","oc-sdk oc-sdk-select"),l=I("span","oc-sdk-field-label");l.id=`${n}-label`;let c=xe("oc-sdk-trigger");c.setAttribute("aria-haspopup","listbox"),c.setAttribute("aria-labelledby",l.id);let p=I("span","oc-sdk-trigger-value");c.append(p,Ce("chevron",14,"oc-sdk-trigger-chevron")),r.append(l,c),e.append(r);let E="",f=null,A=null,h=I("div","oc-sdk oc-sdk-popup"),O=I("div","oc-sdk-popup-search"),L=I("input","oc-sdk-input");L.type="text",L.autocomplete="off",O.append(L);let W=I("div");W.setAttribute("role","listbox"),W.tabIndex=-1,h.append(W);let se=()=>Or(o.options,o.searchable?E:""),ge=()=>o.searchable?L:W,w=u=>{f=u,Dt(W,ge(),n,u)},te=()=>{Be(W);let u=se();if(u.length===0){let m=I("div","oc-sdk-popup-empty");m.textContent="No matches",W.append(m)}for(let m of u)W.append(Pt(n,"option",{...m,selected:m.id===o.value},{hover:()=>w(m.id),pick:()=>N(m.id)}));w(u.some(m=>m.id===f)?f:u[0]?.id??null)},le=()=>{let u=A;A=null,u?.(),E="",L.value="",c.setAttribute("aria-expanded","false")},R=()=>{A||o.disabled||(f=o.value,L.placeholder=o.searchPlaceholder??"Search",o.searchable?h.prepend(O):O.remove(),te(),A=Gt(r,c,h,le),c.setAttribute("aria-expanded","true"),ge().focus())},N=u=>{le(),c.focus(),u!==o.value&&o.onChange(u)},C=()=>{A?le():R()},X=u=>{!A&&Pe(u)&&(u.preventDefault(),R())},Y=u=>{let m=Pe(u);m?(u.preventDefault(),w(Fe(se(),f,m))):u.key==="Enter"?(u.preventDefault(),f&&N(f)):u.key==="Escape"?(u.preventDefault(),le(),c.focus()):o.searchable&&u.target!==L&&u.key.length===1&&!u.ctrlKey&&!u.metaKey&&L.focus()},q=()=>{E=L.value,te()},ue=u=>{A&&!(u.relatedTarget instanceof Node&&r.contains(u.relatedTarget))&&le()},ie=()=>{de(l,o.label),l.hidden=!o.label;let u=o.options.find(m=>m.id===o.value);de(p,u?.label??o.placeholder??"Select"),p.dataset.empty=u?"false":"true",c.disabled=!!o.disabled,A&&te()};return c.addEventListener("click",C),c.addEventListener("keydown",X),h.addEventListener("keydown",Y),L.addEventListener("input",q),r.addEventListener("focusout",ue),ie(),{update:u=>{o={...o,...u},ie()},dispose:()=>{le(),c.removeEventListener("click",C),c.removeEventListener("keydown",X),h.removeEventListener("keydown",Y),L.removeEventListener("input",q),r.removeEventListener("focusout",ue),r.remove()}}};var Fo=(e,t)=>{j(K);let o=t,n=I("div","oc-sdk oc-sdk-tabs");n.setAttribute("role","tablist"),e.append(n);let r=()=>{Be(n),n.dataset.track=o.trackBackground?"true":"false";for(let c of o.items){let p=xe("oc-sdk-tab");p.setAttribute("role","tab");let E=c.id===o.activeId;p.setAttribute("aria-selected",E?"true":"false"),p.tabIndex=E?0:-1,p.dataset.id=c.id;let f=I("span");if(f.textContent=c.label,p.append(f),c.count!==void 0){let A=I("span","oc-sdk-tab-count");A.textContent=String(c.count),p.append(A)}p.addEventListener("click",()=>{c.id!==o.activeId&&o.onChange(c.id)}),n.append(p)}},l=c=>{let p=Pe(c,"horizontal");if(!p)return;let E=Fe(o.items,o.activeId,p);if(E&&E!==o.activeId){c.preventDefault(),o.onChange(E);let f=n.querySelector(`[data-id="${CSS.escape(E)}"]`);f instanceof HTMLElement&&f.focus()}};return n.addEventListener("keydown",l),r(),{update:c=>{o={...o,...c},r()},dispose:()=>{n.removeEventListener("keydown",l),n.remove()}}};var zo=(e,t)=>{Ie(e,"data-tone",t&&t!=="neutral"?t:null)};var js=e=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,Ko=(e,t)=>{j(K);let o=t,n=I("div","oc-sdk oc-sdk-progress"),r=I("div","oc-sdk-progress-label"),l=I("span"),c=I("span","oc-sdk-progress-value"),p=I("span"),E=Ce("check",14);c.append(E,p),r.append(l,c);let f=I("div","oc-sdk-progress-track");f.setAttribute("role","progressbar"),f.setAttribute("aria-valuemin","0"),f.setAttribute("aria-valuemax","100");let A=I("div","oc-sdk-progress-fill");f.append(A),n.append(r,f),e.append(n);let h=()=>{let O=js(o.value);zo(A,o.tone),A.style.transform=`scaleX(${O/100})`,f.setAttribute("aria-valuenow",String(O)),o.label?f.setAttribute("aria-label",o.label):f.removeAttribute("aria-label"),de(l,o.label),de(p,`${O}%`);let L=O===100&&(!o.tone||o.tone==="neutral");Ie(n,"data-done",L?"true":null),E.style.display=L?"":"none",r.hidden=!o.label};return h(),{update:O=>{o={...o,...O},h()},dispose:()=>{n.remove()}}};var yr=e=>e.filter(t=>!("separator"in t)),Ws=0,jo=(e,t)=>{j(K);let o=t,n=`oc-sdk-menu-${Ws+=1}`,r=I("div","oc-sdk oc-sdk-menu");e.append(r);let l=I("div","oc-sdk oc-sdk-popup");l.setAttribute("role","menu"),l.tabIndex=-1;let c=null,p=null,E=we(r,{label:o.label,variant:o.variant,size:o.size,onClick:()=>{c?O():L()}}),f=r.querySelector("button");f?.setAttribute("aria-haspopup","menu");let A=w=>{p=w,Dt(l,l,n,w)},h=()=>{Be(l);for(let w of o.items){if("separator"in w){let te=I("div","oc-sdk-separator");te.dataset.labeled="false",l.append(te);continue}l.append(Pt(n,"menuitem",w,{hover:()=>A(w.id),pick:()=>W(w.id)}))}A(yr(o.items).some(w=>w.id===p)?p:null)},O=()=>{let w=c;c=null,w?.(),p=null,f?.setAttribute("aria-expanded","false")},L=()=>{c||!f||(h(),c=Gt(r,f,l,O),f.setAttribute("aria-expanded","true"),l.focus())},W=w=>{O(),f?.focus(),o.onSelect(w)},se=w=>{let te=Pe(w);te?(w.preventDefault(),A(Fe(yr(o.items),p,te))):w.key==="Enter"||w.key===" "?(w.preventDefault(),p&&W(p)):w.key==="Escape"&&(w.preventDefault(),O(),f?.focus())},ge=w=>{c&&!(w.relatedTarget instanceof Node&&r.contains(w.relatedTarget))&&O()};return l.addEventListener("keydown",se),r.addEventListener("focusout",ge),{update:w=>{o={...o,...w},E.update({label:o.label,variant:o.variant,size:o.size}),c&&h()},dispose:()=>{O(),l.removeEventListener("keydown",se),r.removeEventListener("focusout",ge),E.dispose(),r.remove()}}};var qs=/^[a-z0-9][a-z0-9-]{0,63}$/,Js=new Set(["all","new"]),Ee=class extends Error{constructor(t){super(t),this.name="GroupFileError"}},Zs=[{id:"macos-ui",name:"macOS UI",skillIds:["appkit-interop","swiftui-patterns","window-management","liquid-glass","view-refactor"]},{id:"macos-build",name:"macOS \u6784\u5EFA",skillIds:["build-run-debug","test-triage","swiftpm-macos","signing-entitlements","packaging-notarization","telemetry"]},{id:"reverse",name:"\u9006\u5411\u5DE5\u7A0B",skillIds:["reverse-engineering-unpacking","kuna-decompiler","reverse-engineer-anything"]},{id:"cloudflare",name:"Cloudflare",skillIds:["cloudflare","workers-best-practices","wrangler"]},{id:"video",name:"\u89C6\u9891",skillIds:["yichen-jianying-edit"]},{id:"browser",name:"\u6D4F\u89C8\u5668",skillIds:["browser-skill"]}],Qs=()=>Zs.map(e=>({...e,skillIds:[...e.skillIds]})),Ht=e=>{let t=new Set(e.map(r=>r.id)),o=new Set(e.map(r=>r.name.trim().toLowerCase())),n=Qs().filter(r=>{let l=r.name.toLowerCase();return t.has(r.id)||o.has(l)?!1:(t.add(r.id),o.add(l),!0)});return{groups:[...e,...n],added:n}},Wo=(e,t,o)=>{let n=t+o;if(t<0||t>=e.length||n<0||n>=e.length)return[...e];let r=[...e],[l]=r.splice(t,1);return r.splice(n,0,l),r},Rr=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Ee("\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E");let t=e;if(t.version!==1)throw new Ee("\u5206\u7EC4\u914D\u7F6E\u7248\u672C\u4E0D\u53D7\u652F\u6301");if(!Array.isArray(t.groups))throw new Ee("\u5206\u7EC4\u5217\u8868\u683C\u5F0F\u4E0D\u6B63\u786E");if(t.groups.length>50)throw new Ee("\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 50 \u4E2A");let o=[],n=new Set,r=new Set;for(let[l,c]of t.groups.entries()){if(!c||typeof c!="object"||Array.isArray(c))throw new Ee(`\u7B2C ${l+1} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E`);let p=c;if(typeof p.id!="string"||!qs.test(p.id)||Js.has(p.id))throw new Ee(`\u7B2C ${l+1} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548`);if(n.has(p.id))throw new Ee(`\u5206\u7EC4 ID \u91CD\u590D\uFF1A${p.id}`);let E=typeof p.name=="string"?p.name.trim():"";if(!E||E.length>40||/[\u0000-\u001f\u007f]/.test(E))throw new Ee(`\u7B2C ${l+1} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-40 \u4E2A\u5B57\u7B26`);let f=E.toLowerCase();if(r.has(f))throw new Ee(`\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A${E}`);if(!Array.isArray(p.skillIds))throw new Ee(`\u5206\u7EC4\u300C${E}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E`);if(p.skillIds.length>200)throw new Ee(`\u5206\u7EC4\u300C${E}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 200 \u4E2A`);let A=[],h=new Set;for(let O of p.skillIds){if(typeof O!="string"||!O||O.length>128)throw new Ee(`\u5206\u7EC4\u300C${E}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID`);h.has(O)||(h.add(O),A.push(O))}n.add(p.id),r.add(f),o.push({id:p.id,name:E,skillIds:A})}return{version:1,groups:o}};var Ys=e=>e.state==="conflict"||e.state==="mixed"||e.conflicts.length>0||e.warnings.length>0||e.state==="enabled"&&!e.advertised,ei=(e,t)=>{switch(t){case"enabled":return e.state==="enabled";case"disabled":return e.state==="disabled";case"attention":return Ys(e);case"all":default:return!0}},qo=(e,t,o)=>{let n=t.trim().toLowerCase();return n?[e.id,e.name,e.description,o?.nameZh??"",o?.descriptionZh??"",...e.warnings].join(" ").toLowerCase().includes(n):!0},vr=(e,t)=>{let o=e.filter(n=>ei(n,t.stateFilter)&&qo(n,t.query,t.getTranslation?.(n)));return t.sortMode==="tokens"?[...o].sort((n,r)=>r.estimatedTokens!==n.estimatedTokens?r.estimatedTokens-n.estimatedTokens:n.name.localeCompare(r.name,void 0,{sensitivity:"base"})||n.id.localeCompare(r.id)):o};var Vt=["\u4F60\u662F\u6280\u672F\u6587\u6863\u7FFB\u8BD1\u3002\u628A\u8F93\u5165\u7684\u6280\u80FD\u540D\u79F0\u548C\u63CF\u8FF0\u7FFB\u8BD1\u6210\u7B80\u4F53\u4E2D\u6587\u3002","\u4FDD\u7559\u6280\u80FD ID\u3001\u547D\u4EE4\u3001\u6587\u4EF6\u8DEF\u5F84\u3001\u4EE3\u7801\u3001\u4EA7\u54C1\u540D\u548C\u6280\u672F\u4E13\u6709\u540D\u8BCD\uFF0C\u4E0D\u8981\u7FFB\u8BD1\u4EE3\u7801\u5757\u3002","\u4E0D\u8981\u6DFB\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown\u3002",'\u53EA\u8F93\u51FA JSON\uFF1A{"items":[{"id":"\u539F\u6837 ID","nameZh":"\u4E2D\u6587\u540D\u79F0","descriptionZh":"\u4E2D\u6587\u63CF\u8FF0"}]}'].join(""),Jo=e=>JSON.stringify(e.map(t=>({id:t.id,name:t.name,description:t.description}))),Xt=e=>{let t=e.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"").trim(),o=t.indexOf("{"),n=t.lastIndexOf("}");if(o<0||n<=o)return[];t=t.slice(o,n+1);let r;try{r=JSON.parse(t)}catch{return[]}let l=r&&typeof r=="object"?r:null,c=Array.isArray(r)?r:Array.isArray(l?.items)?l.items:[],p=[];for(let E of c){if(!E||typeof E!="object")continue;let f=E;typeof f.id!="string"||!f.id||typeof f.nameZh!="string"||!f.nameZh.trim()||typeof f.descriptionZh=="string"&&p.push({id:f.id.slice(0,128),nameZh:f.nameZh.trim().slice(0,300),descriptionZh:f.descriptionZh.trim().slice(0,8e3)})}return p};function Ir(e=document){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",n=>{let r=n.target===e?t:n.target;if(!(r instanceof Element))return;r.hasAttribute("data-oc-scrolling")||r.setAttribute("data-oc-scrolling","");let l=o.get(r);l!==void 0&&clearTimeout(l),o.set(r,setTimeout(()=>{o.delete(r),r.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var wr=`:root {
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
.sk-translation-controls {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  min-width: 0;
}
.sk-translation-tabs .oc-sdk-tabs {
  min-width: 0;
}
.sk-translation-progress {
  flex: 1 1 160px;
  min-width: 140px;
}
.sk-translation-progress:empty {
  display: none;
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
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 6px;
}
.sk-member-filter {
  flex: 1 1 140px;
  min-width: 0;
  min-height: 26px;
  padding: 2px 7px;
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
  background: var(--sk-bg);
  color: var(--sk-fg);
  font: inherit;
  font-size: 11px;
}
.sk-member-filter::placeholder {
  color: var(--sk-muted);
}
.sk-member-list {
  display: grid;
  gap: 1px;
  max-height: 196px;
  overflow: auto;
}
.sk-member-empty {
  margin: 6px 0;
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-order-box {
  margin-top: 8px;
  padding-top: 7px;
  border-top: 1px dashed var(--sk-border);
}
.sk-order-box:empty {
  display: none;
}
.sk-order-title {
  margin: 0 0 5px;
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-order-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 4px;
  max-height: 160px;
  overflow: auto;
}
.sk-order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 3px 6px;
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
  background: var(--sk-bg);
}
.sk-order-label {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
}
.sk-order-name {
  min-width: 0;
  font-size: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sk-order-actions {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 3px;
}
.sk-order-btn {
  border: 1px solid var(--sk-border);
  border-radius: 5px;
  background: transparent;
  color: var(--sk-muted);
  min-width: 22px;
  height: 20px;
  padding: 0 4px;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}
.sk-order-btn:hover:not(:disabled) {
  color: var(--sk-fg);
  background: color-mix(in srgb, var(--sk-fg) 6%, transparent);
}
.sk-order-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
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
.sk-chip:focus-visible,
.sk-input:focus-visible,
.sk-member-filter:focus-visible,
.sk-order-btn:focus-visible,
.sk-desc-toggle:focus-visible,
.sk-missing-chip:focus-visible {
  outline: 2px solid var(--oc-focus);
  outline-offset: 2px;
}

.sk-toolbar {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0 0 6px;
}
.sk-search-slot {
  flex: 1 1 180px;
  min-width: 0;
}
.sk-toolbar-selects {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}
.sk-filter-slot,
.sk-sort-slot {
  min-width: 0;
}
.sk-filter-slot .oc-sdk-select,
.sk-sort-slot .oc-sdk-select {
  gap: 0;
}
.sk-filter-slot .oc-sdk-trigger,
.sk-sort-slot .oc-sdk-trigger {
  width: 100%;
  height: 30px;
  font-size: 11px;
}
.sk-list {
  display: block;
}
.sk-skill {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  padding: 13px 0;
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
  gap: 4px 8px;
  margin-top: 4px;
}
.sk-id {
  color: var(--sk-muted);
  font-family: var(--oc-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 10px;
  overflow-wrap: anywhere;
}
.sk-token {
  color: var(--sk-muted);
  font-family: var(--oc-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
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
.sk-desc.is-expanded {
  display: block;
  -webkit-line-clamp: unset;
  overflow: visible;
  white-space: pre-wrap;
}
.sk-desc-toggle {
  margin-top: 3px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--sk-muted);
  font: inherit;
  font-size: 11px;
  line-height: 1.4;
  cursor: pointer;
}
.sk-desc-toggle:hover {
  color: var(--sk-fg);
  text-decoration: underline;
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  min-width: 0;
}
.sk-action-top {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.sk-menu-slot .oc-sdk-btn {
  min-width: 24px;
  padding-inline: 5px;
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
.sk-empty-actions {
  margin-top: 10px;
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
.sk-switch:focus-visible {
  outline: 2px solid var(--oc-focus);
  outline-offset: 2px;
}

/* Default compact layout for narrow panels; progressively enhance via @media and @container */
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

@media (min-width: 400px) {
  .sk-skill {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px 16px;
  }
  .sk-skill-action {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    min-width: 82px;
  }
  .sk-groups {
    display: flex;
  }
  .sk-group-select {
    display: none;
  }
}

@media (min-width: 520px) {
  .sk-toolbar {
    flex-direction: row;
    align-items: center;
  }
  .sk-toolbar-selects {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }
  .sk-filter-slot .oc-sdk-trigger,
  .sk-sort-slot .oc-sdk-trigger {
    width: auto;
    min-width: 116px;
  }
}

@supports (container-type: inline-size) {
  @media (min-width: 400px) {
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
    .sk-groups {
      display: none;
    }
    .sk-group-select {
      display: block;
    }
  }
  @media (min-width: 520px) {
    .sk-toolbar {
      flex-direction: column;
      align-items: stretch;
    }
    .sk-toolbar-selects {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .sk-filter-slot .oc-sdk-trigger,
    .sk-sort-slot .oc-sdk-trigger {
      width: 100%;
    }
  }

  @container (min-width: 390px) {
    .sk-skill {
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 12px 16px;
    }
    .sk-skill-action {
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      min-width: 82px;
    }
    .sk-groups {
      display: flex;
    }
    .sk-group-select {
      display: none;
    }
  }

  @container (min-width: 500px) {
    .sk-toolbar {
      flex-direction: row;
      align-items: center;
    }
    .sk-toolbar-selects {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
    }
    .sk-filter-slot .oc-sdk-trigger,
    .sk-sort-slot .oc-sdk-trigger {
      width: auto;
      min-width: 116px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .sk-switch,
  .sk-switch .sk-thumb {
    transition: none;
  }
}
`;var Cr=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
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
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
}
* {
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
html, body { margin: 0; height: 100%; background: var(--ext-bg); }
body { overflow: hidden; }
#root { height: 100%; }
[hidden] { display: none !important; }
button, input, textarea, select { font: inherit; }
.ext {
  color: var(--oc-fg);
  font-family: var(--oc-font);
  font-size: var(--ext-text-body);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
.ext-container { container-type: inline-size; }
.ext :where(a, button, input, select, textarea, summary, [tabindex]):focus-visible {
  outline: 2px solid var(--oc-focus, CanvasText);
  outline-offset: 2px;
}
.ext button:not(:disabled) {
  transition: background-color 140ms ease-out, border-color 140ms ease-out, color 140ms ease-out, opacity 140ms ease-out, scale 120ms ease-out;
}
.ext button:not(:disabled):active { scale: 0.985; }
.ext-actions { display: flex; align-items: center; flex-wrap: wrap; gap: var(--ext-space-2); }
.ext-muted { color: var(--oc-muted); font-size: var(--ext-text-small); }
.ext-notice {
  margin: 0;
  padding: 10px 12px;
  border-radius: var(--oc-radius, 6px);
  border: 1px solid color-mix(in srgb, var(--oc-info) 20%, transparent);
  font-size: 12px;
  line-height: 1.5;
  overflow-wrap: anywhere;
  background: color-mix(in srgb, var(--oc-info) 7%, var(--ext-bg));
  color: var(--oc-info-text);
}
.ext-notice[data-tone="success"] {
  border-color: color-mix(in srgb, var(--oc-success) 22%, transparent);
  background: color-mix(in srgb, var(--oc-success) 7%, var(--ext-bg));
  color: var(--oc-success-text);
}
.ext-notice[data-tone="warning"] {
  border-color: color-mix(in srgb, var(--oc-warning) 24%, transparent);
  background: color-mix(in srgb, var(--oc-warning) 8%, var(--ext-bg));
  color: var(--oc-warning-text);
}
.ext-notice[data-tone="error"] {
  border-color: color-mix(in srgb, var(--oc-error) 22%, transparent);
  background: color-mix(in srgb, var(--oc-error) 7%, var(--ext-bg));
  color: var(--oc-error-text);
}
.ext .oc-sdk-btn[data-size="sm"], .ext .oc-sdk-tab { font-size: 12px; }
.ext .oc-sdk-field-note { font-size: var(--ext-text-small); }
@media (prefers-reduced-motion: reduce) {
  .ext *, .ext *::before, .ext *::after { animation: none !important; transition: none !important; }
  .ext button:not(:disabled):active { scale: none; }
}
`;var Mr=()=>typeof navigator<"u"&&navigator.language?navigator.language:"en",Ur=e=>(e??"").toLowerCase().startsWith("zh")?"zh":"en",ni=(e,t)=>t?e.replace(/\{(\w+)\}/g,(o,n)=>Object.prototype.hasOwnProperty.call(t,n)?String(t[n]):o):e;var Nr=(e,t=Mr())=>{let o=t||"en",n=Ur(o);return{t:(l,c)=>ni(n==="zh"?l:e[l]??l,c),get language(){return n},get locale(){return o},setLocale(l){let c=l||Mr(),p=Ur(c);return o=c,p===n?!1:(n=p,!0)}}},Zo=e=>{document.documentElement.lang=e.language==="zh"?"zh-CN":"en"};var Lr={\u6280\u80FD\u5F00\u5173:"Skills",\u91CD\u65B0\u626B\u63CF:"Rescan",\u5168\u90E8\u542F\u7528:"Enable all",\u5168\u90E8\u5173\u95ED:"Disable all",\u6280\u80FD\u8BF4\u660E\u8BED\u8A00:"Skill description language",\u7FFB\u8BD1:"Translate",\u4E2D\u6587\u8BD1\u6587:"Chinese",\u7FFB\u8BD1\u672A\u8BD1\u9879:"Translate missing",\u8865\u5145\u7FFB\u8BD1:"Translate missing",\u539F\u6587:"Original",\u7F16\u8F91\u5206\u7EC4:"Edit groups",\u5173\u95ED\u7F16\u8F91:"Close editor","\u641C\u7D22\u540D\u79F0\u6216 ID":"Search name or ID","\u641C\u7D22\u540D\u79F0\u3001\u63CF\u8FF0\u6216 ID\uFF08\u6309 / \u805A\u7126\uFF09":"Search name, description, or ID (press / to focus)",\u641C\u7D22\u6280\u80FD:"Search skills",\u72B6\u6001\u7B5B\u9009:"Filter by status",\u5168\u90E8\u72B6\u6001:"All states",\u5DF2\u542F\u7528:"Enabled",\u5DF2\u5173\u95ED:"Disabled",\u51B2\u7A81\u4E0E\u63D0\u793A:"Needs attention",\u6392\u5E8F\u65B9\u5F0F:"Sort order",\u9ED8\u8BA4\u987A\u5E8F:"Default order","Token \u964D\u5E8F":"Tokens (high to low)",\u91CD\u7F6E\u7B5B\u9009:"Reset filters","\u6362\u4E00\u4E2A\u641C\u7D22\u8BCD\u6216\u8C03\u6574\u72B6\u6001\u7B5B\u9009\u6761\u4EF6\u3002":"Try another search term or change the status filter.","~{tokens} tok":"~{tokens} tok",\u5C55\u5F00\u8BF4\u660E:"Show more",\u6536\u8D77\u8BF4\u660E:"Show less",\u66F4\u591A\u64CD\u4F5C:"More actions",\u590D\u5236\u5165\u53E3\u8DEF\u5F84:"Copy entry path","\u590D\u5236\u6280\u80FD ID":"Copy skill ID",\u5355\u72EC\u91CD\u8BD1\u6B64\u9879:"Retranslate this skill","\u5DF2\u590D\u5236\u5165\u53E3\u8DEF\u5F84\u3002":"Copied entry path.","\u5DF2\u590D\u5236\u6280\u80FD ID\u3002":"Copied skill ID.","\u6B63\u5728\u91CD\u8BD1\u300C{name}\u300D\u2026":'Retranslating "{name}"\u2026',"\u5DF2\u66F4\u65B0\u300C{name}\u300D\u7684\u4E2D\u6587\u8BD1\u6587\u3002":'Updated Chinese translation for "{name}".',"\u672A\u80FD\u89E3\u6790\u300C{name}\u300D\u7684\u7FFB\u8BD1\u7ED3\u679C\uFF0C\u8BF7\u91CD\u8BD5\u3002":'Could not parse translation for "{name}". Try again.',"\u7B5B\u9009\u6210\u5458\u540D\u79F0\u6216 ID":"Filter member name or ID",\u6CA1\u6709\u5339\u914D\u7684\u6210\u5458:"No matching members","\u5DF2\u9009\u6B65\u9AA4\u987A\u5E8F\uFF08{count}\uFF09":"Step order ({count})","\u4E0A\u79FB\u300C{name}\u300D":'Move "{name}" up',"\u4E0B\u79FB\u300C{name}\u300D":'Move "{name}" down',"\u79FB\u9664\u300C{name}\u300D":'Remove "{name}"',"\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002":"Manages ~/.config/opencode/skills. Disabling renames a skill entry to .disabled; OpenCode no longer loads it and the model cannot see it.","\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002":"Shows only file skills in this directory. Enable all before disabling or uninstalling the extension; rescan after skills change.",\u5168\u90E8:"All",\u5206\u7EC4\u7B5B\u9009:"Filter by group",\u51B2\u7A81:"Conflict",\u6DF7\u5408:"Mixed",\u5173\u95ED:"Disabled",\u5F00\u542F:"Enabled",\u5165\u53E3\u548C\u505C\u7528\u6587\u4EF6\u540C\u65F6\u5B58\u5728:"Both entry and disabled file exist","\u540C ID \u591A\u4E2A\u5165\u53E3":"Multiple entries for one ID","frontmatter \u65E0\u6CD5\u89E3\u6790":"Frontmatter could not be parsed",\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A:"Entry file is empty",\u5165\u53E3\u65E0\u6CD5\u8BFB\u53D6:"Entry cannot be read",\u4EC5\u624B\u52A8\u8C03\u7528:"Manual invocation only","\u6CA1\u6709 description":"No description",\u542F\u7528\u5165\u53E3:"Active entry",\u505C\u7528\u5165\u53E3:"Disabled entry",\u5165\u53E3:"Entry",\u4FDD\u7559\u542F\u7528:"Keep enabled",\u4FDD\u7559\u5173\u95ED:"Keep disabled",\u51B2\u7A81\u68C0\u67E5:"Conflict check","{blocking} \u9879\u9700\u8981\u5904\u7406 \xB7 {warnings} \u9879\u63D0\u793A":"To resolve: {blocking} \xB7 Warnings: {warnings}","\u63D0\u793A\uFF08{count}\uFF09":"Warnings ({count})","\u4EC5\u542F\u7528\u300C{name}\u300D\uFF1A\u5C06\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002":'Enable only "{name}": other skills disabled: {count}.',\u786E\u8BA4:"Confirm",\u53D6\u6D88:"Cancel","\u5C06\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002":"Skills to enable: {count}.","\u5C06\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002":"Skills to disable: {count}.",\u786E\u8BA4\u542F\u7528:"Confirm enable",\u786E\u8BA4\u5173\u95ED:"Confirm disable","\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026":"Reading skills\u2026","\u5C1A\u672A\u8BFB\u53D6\u6280\u80FD\u3002":"Skills not read yet.","\u5173\u95ED\u5165\u53E3\u6587\u6863\u540E\uFF0COpenCode \u4E0D\u4F1A\u518D\u53D1\u73B0\u8BE5\u6280\u80FD\u3002":"After disabling an entry document, OpenCode no longer discovers that skill.","\u6A21\u578B\u53EF\u89C1 {advertised} / \u5171 {total} \u4E2A \xB7 \u7EA6 {tokens} tokens/\u6B65":"Model sees {advertised} of {total} \xB7 about {tokens} tokens/step","{count} \u4E2A\u5DF2\u5173\u95ED":"Disabled: {count}","{count} \u9879\u963B\u585E\u51B2\u7A81":"Blocking conflicts: {count}",\u65E0\u963B\u585E\u51B2\u7A81:"No blocking conflicts","{count} \u9879\u63D0\u793A":"Warnings: {count}",\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6:"Skill directory cannot be read","{parts}\u3002\u4F30\u7B97\u4E0D\u542B\u5185\u7F6E\u548C\u9879\u76EE\u6280\u80FD\u3002":"{parts}. Estimates exclude built-in and project skills.","\u7FFB\u8BD1 {done}/{total}\u2026":"Translating {done}/{total}\u2026","{translated}/{total} \u5DF2\u7FFB\u8BD1":"{translated}/{total} translated","\u70B9\u201C\u7FFB\u8BD1\u201D\u751F\u6210\u4E2D\u6587":'Click "Translate" to generate Chinese',"{count} \u4E2A\u6709\u4E2D\u6587":"Chinese available: {count}",\u65E0\u6280\u80FD:"No skills",\u6709\u51B2\u7A81:"Has conflicts",\u5168\u5F00:"All on",\u5168\u5173:"All off",\u90E8\u5206:"Partial","\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}":"Cannot read group configuration: {error}",\u91CD\u65B0\u8BFB\u53D6:"Reload","\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002\u70B9\u300C\u7F16\u8F91\u5206\u7EC4\u300D\u65B0\u5EFA\uFF0C\u6216\u5728\u7F16\u8F91\u5668\u91CC\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4\u3002":'No groups yet. Click "Edit groups" to create one, or import example groups in the editor.',"\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0\u3002":"Enter a group name.","\u5206\u7EC4\u540D\u79F0\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A\u5B57\u7B26\u3002":"Group names cannot exceed {count} characters.","\u5DF2\u7ECF\u6709\u540D\u4E3A\u300C{name}\u300D\u7684\u5206\u7EC4\u3002":'A group named "{name}" already exists.',"\u5206\u7EC4\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u6210\u5458\u3002":"A group needs at least one member.","\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C{name}\u300D\u3002":'Group "{name}" saved.',"\u5DF2\u5220\u9664\u5206\u7EC4\u3002":"Group deleted.","\u793A\u4F8B\u5206\u7EC4\u7684\u540D\u79F0\u6216 ID \u90FD\u5DF2\u5B58\u5728\uFF0C\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u5206\u7EC4\u3002":"Every example group name or ID already exists; nothing to import.","\u5DF2\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\u3002":"Example groups imported: {count}.",\u9009\u62E9\u5206\u7EC4:"Choose a group",\u65B0\u5EFA\u5206\u7EC4:"New group",\u540D\u79F0:"Name","\u4F8B\u5982\uFF1A\u65E5\u5E38\u5F00\u53D1":"e.g. Daily development","\u6210\u5458\uFF08{count}\uFF09":"Members ({count})",\u5168\u9009:"Select all",\u6E05\u7A7A:"Clear","\u76EE\u5F55\u4E2D\u7F3A\u5931\uFF1A":"Missing from the directory:",\u4ECE\u5206\u7EC4\u79FB\u9664\u8FD9\u4E2A\u7F3A\u5931\u6210\u5458:"Remove this missing member from the group",\u5220\u9664\u5206\u7EC4:"Delete group",\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4:"Import example groups",\u4FDD\u5B58\u66F4\u6539:"Save changes","\u5220\u9664\u5206\u7EC4\u300C{name}\u300D\uFF1F\u6280\u80FD\u672C\u8EAB\u4E0D\u4F1A\u88AB\u5220\u9664\u3002":'Delete group "{name}"? The skills themselves are not deleted.',\u672A\u547D\u540D:"Unnamed",\u786E\u8BA4\u5220\u9664:"Confirm delete","\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\uFF1F\u5DF2\u6709\u540C\u540D\u6216\u540C ID \u7684\u5206\u7EC4\u4F1A\u8DF3\u8FC7\uFF0C\u5F53\u524D\u5206\u7EC4\u4E0D\u4F1A\u88AB\u8986\u76D6\u3002":"Import example groups: {count}? Groups with the same name or ID are skipped; the current group is not overwritten.",\u786E\u8BA4\u5BFC\u5165:"Confirm import","\u5206\u7EC4\u53EA\u5F71\u54CD\u9762\u677F\u7B5B\u9009\u548C\u6279\u91CF\u5F00\u5173\uFF0C\u4E0D\u6539\u53D8\u6280\u80FD\uFF1B\u6210\u5458\u987A\u5E8F\u51B3\u5B9A\u7EC4\u5185\u6B65\u9AA4\u53F7\uFF0C\u4FDD\u5B58\u540E\u5199\u5165 groups.json\u3002":"Groups only affect panel filtering and bulk toggles; they do not change skills. Member order sets step numbers and is saved to groups.json.","\u5168\u90E8 {count}":"All {count}","\u6B63\u5728\u8BFB\u53D6\u5206\u7EC4\u2026":"Reading groups\u2026","\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u4FEE\u590D\u6587\u4EF6\u540E\u91CD\u65B0\u8BFB\u53D6":"Cannot read the group configuration. Repair the file and reload.",\u6280\u80FD\u5217\u8868\u5C1A\u672A\u8BFB\u53D6:"Skills not read yet","{count} \u4E2A \xB7 {state}":"{state} \xB7 {count}","\u7F3A\u5931\uFF1A{names}":"Missing: {names}",\u542F\u7528\u6574\u7EC4:"Enable group",\u5173\u95ED\u6574\u7EC4:"Disable group",\u4EC5\u542F\u7528\u672C\u7EC4:"Enable only this group","\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u5148\u5904\u7406\u540E\u518D\u4EC5\u542F\u7528\u672C\u7EC4":"The group has missing skills. Resolve them before enabling only this group.","\u5DF2\u542F\u7528\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002":'Skills enabled in "{name}": {count}.',"\u5DF2\u5173\u95ED\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002":'Skills disabled in "{name}": {count}.',"\u5DF2\u542F\u7528\u300C{name}\u300D":'Enabled "{name}"',"\u5DF2\u5173\u95ED\u300C{name}\u300D":'Disabled "{name}"',"\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u672A\u6267\u884C\u3002":"The group has missing skills; nothing was run.","\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D\uFF0C\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002":'Enabled only "{name}"; other skills disabled: {count}.',"\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D":'Enabled only "{name}"',\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6:"Directory cannot be read",\u5148\u5904\u7406\u51B2\u7A81:"Resolve conflicts first",\u5904\u7406\u51B2\u7A81:"Resolve conflict",\u90E8\u5206\u5165\u53E3\u5173\u95ED:"Some entries disabled",\u6A21\u578B\u53EF\u89C1:"Visible to the model",\u6A21\u578B\u4E0D\u53EF\u89C1:"Not visible to the model",\u5165\u53E3\u5DF2\u5173\u95ED:"Entry disabled","\u7B2C {step} \u6B65":"Step {step}","\u65E0 description\uFF0C\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002":"No description; the model will not select it automatically.",\u6CA1\u6709\u53D1\u73B0\u6280\u80FD:"No skills found",\u8FD9\u4E2A\u5206\u7EC4\u6CA1\u6709\u53EF\u7528\u6280\u80FD:"This group has no available skills",\u6CA1\u6709\u5339\u914D\u7684\u6280\u80FD:"No matching skills","\u68C0\u67E5 ~/.config/opencode/skills \u662F\u5426\u5B58\u5728\uFF0C\u6216\u91CD\u65B0\u626B\u63CF\u3002":"Check that ~/.config/opencode/skills exists, or rescan.","\u68C0\u67E5\u5206\u7EC4\u91CC\u7684\u6280\u80FD\u662F\u5426\u88AB\u79FB\u9664\u3002":"Check whether the skills in this group were removed.","\u6362\u4E00\u4E2A\u641C\u7D22\u8BCD\u3002":"Try a different search term.","\u8BFB\u53D6\u4E2D\u2026":"Reading\u2026","\u5DF2\u542F\u7528 {name}\u3002":"Enabled {name}.","\u5DF2\u5173\u95ED {name}\uFF1BOpenCode \u4E0B\u4E00\u6B21\u626B\u63CF\u540E\u4E0D\u518D\u53D1\u73B0\u5B83\u3002":"Disabled {name}; OpenCode will no longer discover it after the next scan.","\u5DF2\u542F\u7528 {name}":"Enabled {name}","\u5DF2\u5173\u95ED {name}":"Disabled {name}","\u5DF2\u4FDD\u7559\u542F\u7528\u5165\u53E3{suffix}\u3002":"Kept the enabled entry{suffix}.","\u5DF2\u4FDD\u7559\u5173\u95ED\u5165\u53E3{suffix}\u3002":"Kept the disabled entry{suffix}.","\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A {path}":"; the old disabled file was backed up to {path}",\u5165\u53E3\u51B2\u7A81\u5DF2\u5904\u7406:"Entry conflict resolved","\u5DF2\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002":"Skills enabled: {count}.","\u5DF2\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002":"Skills disabled: {count}.","\u4E2D\u6587\u8BF4\u660E\u5DF2\u662F\u6700\u65B0\u3002":"Chinese descriptions are up to date.","\u7FFB\u8BD1\u5B8C\u6210\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}":"Translation finished, but saving the cache failed: {error}","\u4E0A\u6B21\u672A\u5B8C\u6210\u7684\u7FFB\u8BD1\u5DF2\u8865\u5168\u3002":"The previous unfinished translation was completed.","\u7FFB\u8BD1\u5DF2\u8865\u5168\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}":"Translation was completed, but saving the cache failed: {error}","\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\uFF0C{failed} \u4E2A\u5931\u8D25\uFF1B\u53EF\u518D\u70B9\u201C\u7FFB\u8BD1\u201D\u91CD\u8BD5\u3002":'Translated: {done}; failed: {failed}. Click "Translate" to retry.',"\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\u3002":"Translated skills: {done}.","\u670D\u52A1\u8FD4\u56DE\u7684\u6280\u80FD\u76EE\u5F55\u4FE1\u606F\u4E0D\u6B63\u786E\u3002":"The service returned invalid skill directory information.","\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002":"The service returned data in an unexpected format.","\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002":"The translation cache format is invalid.","\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u6570\u636E\uFF0C\u8BF7\u91CD\u8BD5\u3002":"The service returned unrecognized data. Try again.","\u8BF7\u6C42\u5931\u8D25\uFF08{status}\uFF09":"Request failed ({status})","\u8BF7\u5728\u8BBE\u7F6E \u2192 \u6269\u5C55\u4E2D\u5141\u8BB8\u201C\u6280\u80FD\u5F00\u5173\u201D\u8FD0\u884C\u672C\u5730\u670D\u52A1\u3002":'Allow "Skills" to run its local service in Settings \u2192 Extensions.',"\u672C\u5730\u670D\u52A1\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6269\u5C55\u540E\u91CD\u8BD5\u3002":"The local service is not ready. Reload the extension and try again.","\u6280\u80FD\u5F00\u5173\u6269\u5C55\u5DF2\u505C\u7528\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u542F\u7528\u3002":"The Skills extension is disabled. Enable it in extension settings.","\u672C\u5730\u670D\u52A1\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5\u3002":"The local service timed out. Try again.","\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u5141\u8BB8\u201C\u6A21\u578B\u8C03\u7528\u201D\u6743\u9650\uFF0C\u6216\u91CD\u65B0\u5B89\u88C5\u6269\u5C55\u3002":"Allow the model capability in extension settings, or reinstall the extension.","\u5F53\u524D\u5BBF\u4E3B\u6216\u6A21\u578B\u4E0D\u652F\u6301\u7FFB\u8BD1\u8BF7\u6C42\u3002":"The current host or model does not support translation requests.","\u65E0\u6CD5\u8FDE\u63A5\u672C\u5730\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u6269\u5C55\u6388\u6743\u3002":"Cannot connect to the local service. Check extension permissions.","\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002":"The operation failed. Try again.","\u672C\u5730\u670D\u52A1\u7248\u672C\u8FC7\u65E7\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u7981\u7528\u518D\u542F\u7528\u201C\u6280\u80FD\u5F00\u5173\u201D\u3002":'The local service is too old. Disable and re-enable "Skills" in extension settings.',"\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}\uFF08{path}\uFF09":"Cannot read the skill directory: {error} ({path})",\u63D0\u4EA4\u5185\u5BB9\u8FC7\u5927:"The submitted content is too large.","\u8BF7\u6C42\u4E2D\u65AD\uFF0C\u8BF7\u91CD\u8BD5":"The request was interrupted. Try again.","\u8BF7\u6C42\u5185\u5BB9\u5FC5\u987B\u662F\u6709\u6548\u7684 JSON \u5BF9\u8C61":"The request body must be a valid JSON object.","\u7F3A\u5C11 {key}":"Missing {key}.","{key} \u957F\u5EA6\u8D85\u51FA\u9650\u5236":"{key} exceeds the length limit.","{key} \u5FC5\u987B\u662F\u5E03\u5C14\u503C":"{key} must be a boolean.","{key} \u5FC5\u987B\u662F\u6280\u80FD ID \u6570\u7EC4":"{key} must be an array of skill IDs.","{key} \u6761\u76EE\u8FC7\u591A":"Too many {key} entries.","keep \u5FC5\u987B\u662F enabled \u6216 disabled":"keep must be enabled or disabled.","\u672C\u5730\u670D\u52A1\u5904\u7406\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5":"The local service failed to process the request. Try again.","\u65E0\u6CD5\u8BFB\u53D6\u5206\u7EC4\u914D\u7F6E\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u6743\u9650\u3002":"Could not read the group configuration. Check file permissions.","\u5206\u7EC4\u914D\u7F6E\u6587\u4EF6\u635F\u574F\uFF1B\u539F\u6587\u4EF6\u672A\u4FEE\u6539\uFF08~/.config/openchamber/skills-manager/groups.json\uFF09\u3002":"The group configuration is malformed; the original file was not changed (~/.config/openchamber/skills-manager/groups.json).","\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002":"The group configuration format is invalid.","\u4FDD\u5B58\u5206\u7EC4\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u76EE\u5F55\u6743\u9650\u3002":"Could not save the group configuration. Check directory permissions.",\u6743\u9650\u4E0D\u8DB3:"Permission denied",\u8DEF\u5F84\u4E0D\u5B58\u5728:"Path does not exist",\u4E0D\u662F\u76EE\u5F55:"Not a directory",\u662F\u76EE\u5F55:"Is a directory",\u6587\u4EF6\u7CFB\u7EDF\u9519\u8BEF:"File system error","\u5165\u53E3\u6587\u4EF6\u8D85\u8FC7 2 MB":"The entry file exceeds 2 MB","\u505C\u7528\u5165\u53E3\u8D85\u8FC7 2 MB":"The disabled entry exceeds 2 MB",\u65E0\u6CD5\u8BFB\u53D6\u5165\u53E3\u6587\u4EF6:"Could not read the entry file","\u65E0\u6CD5\u8BFB\u53D6 {directory}\uFF1A{reason}":"Could not read {directory}: {reason}","\u540C\u4E00\u76EE\u5F55\u540C\u65F6\u5B58\u5728\u542F\u7528\u548C\u505C\u7528\u5165\u53E3\uFF0C\u9700\u8981\u5148\u9009\u62E9\u4FDD\u7559\u54EA\u4E00\u4E2A\u3002":"Both an enabled and a disabled entry exist in the same directory. Choose which one to keep first.","\u65E0\u6CD5\u8BFB\u53D6\u5165\u53E3\uFF1A{reason}":"Could not read the entry: {reason}","frontmatter \u672A\u95ED\u5408\uFF0COpenCode \u53EF\u80FD\u8DF3\u8FC7\u6B64\u6280\u80FD\uFF1B\u5165\u53E3\u5F00\u5173\u4ECD\u53EF\u7528\u3002":"The frontmatter is not closed; OpenCode may skip this skill, but the entry switch still works.","\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A\uFF0COpenCode \u4E0D\u4F1A\u52A0\u8F7D\u5B83\u3002":"The entry file is empty; OpenCode will not load it.","\u65E0\uFF08\u5165\u53E3\u4E0D\u53EF\u52A0\u8F7D\uFF09":"None (entry cannot be loaded)","\u540C ID \u6709 {count} \u4E2A\u5165\u53E3\uFF1B\u751F\u6548\u5165\u53E3\uFF1A{winner}\u3002":"There are {count} entries with this ID; the effective entry is {winner}.","\u5165\u53E3\u5DF2\u542F\u7528\uFF0C\u4F46\u6807\u8BB0\u4E3A\u4EC5\u624B\u52A8\u8C03\u7528\uFF1B\u6A21\u578B\u770B\u4E0D\u5230\u5B83\u3002":"The entry is enabled but marked for manual invocation only; the model cannot see it.","\u5165\u53E3\u5DF2\u542F\u7528\uFF0C\u4F46\u6CA1\u6709 description\uFF1B\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002":"The entry is enabled but has no description; the model will not select it automatically.","\u76EE\u6807\u5165\u53E3\u5DF2\u5B58\u5728\uFF1A{path}":"The target entry already exists: {path}","\u5165\u53E3\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\uFF1A{path}":"The entry changed. Rescan: {path}","\u68C0\u67E5\u5165\u53E3\u5931\u8D25\uFF1A{reason}":"Could not inspect the entry: {reason}","\u6539\u540D\u540E\u6821\u9A8C\u5931\u8D25\uFF1A{path}":"Verification failed after renaming: {path}","\u6539\u540D\u5931\u8D25\uFF1A{reason}":"Rename failed: {reason}","\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{reason}":"Could not read the skill directory: {reason}",\u672A\u77E5\u5165\u53E3:"Unknown entry","\u6CA1\u6709\u627E\u5230\u6280\u80FD {id}":"Skill {id} was not found.","\u6280\u80FD {id} \u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\u3002":"Skill {id} has unresolved entry conflicts.","\u65E0\u6CD5\u8BC6\u522B\u505C\u7528\u5165\u53E3\uFF1A{path}":"Could not identify the disabled entry: {path}","\u540C\u4E00\u4E2A\u6280\u80FD\u4E0D\u80FD\u540C\u65F6\u542F\u7528\u548C\u5173\u95ED\u3002":"A skill cannot be enabled and disabled at the same time.","\u4E00\u6B21\u5904\u7406\u7684\u6280\u80FD\u8FC7\u591A\u3002":"Too many skills in one operation.","\u8FD8\u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\uFF0C\u4E0D\u80FD\u6279\u91CF\u64CD\u4F5C\u3002":"Unresolved entry conflicts remain; bulk operations are blocked.","\u6CA1\u6709\u627E\u5230\u8FD9\u4E2A\u5165\u53E3\u51B2\u7A81\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\u3002":"This entry conflict was not found. Rescan.","\u65E0\u6CD5\u8BFB\u53D6\u7FFB\u8BD1\u7F13\u5B58\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u6743\u9650\u3002":"Could not read the translation cache. Check file permissions.","\u7FFB\u8BD1\u7F13\u5B58\u6587\u4EF6\u635F\u574F\uFF1B\u539F\u6587\u4EF6\u672A\u4FEE\u6539\u3002":"The translation cache is malformed; the original file was not changed.","\u7FFB\u8BD1\u7F13\u5B58\u6761\u76EE\u8FC7\u591A\u3002":"The translation cache has too many entries.","\u4FDD\u5B58\u7FFB\u8BD1\u7F13\u5B58\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u76EE\u5F55\u6743\u9650\u3002":"Could not save the translation cache. Check directory permissions.",\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E:"The group configuration format is invalid.",\u5206\u7EC4\u914D\u7F6E\u7248\u672C\u4E0D\u53D7\u652F\u6301:"The group configuration version is not supported.",\u5206\u7EC4\u5217\u8868\u683C\u5F0F\u4E0D\u6B63\u786E:"The group list format is invalid.","\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A":"At most {count} groups are allowed.","\u7B2C {index} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E":"Group {index} has an invalid format.","\u7B2C {index} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548":"Group {index} has an invalid ID.","\u5206\u7EC4 ID \u91CD\u590D\uFF1A{id}":"Duplicate group ID: {id}","\u7B2C {index} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-{max} \u4E2A\u5B57\u7B26":"Group {index} names must be 1\u2013{max} characters.","\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A{name}":"Duplicate group name: {name}","\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E":'The members of group "{name}" have an invalid format.',"\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A":'Group "{name}" cannot have more than {count} members.',"\u5206\u7EC4\u300C{name}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID":'Group "{name}" contains an invalid skill ID.'},qe=Nr(Lr),{t:ri}=qe,si=[{pattern:/^缺少 (.+)$/,template:"\u7F3A\u5C11 {key}",values:e=>({key:e[1]})},{pattern:/^(.+) 长度超出限制$/,template:"{key} \u957F\u5EA6\u8D85\u51FA\u9650\u5236",values:e=>({key:e[1]})},{pattern:/^(.+) 必须是布尔值$/,template:"{key} \u5FC5\u987B\u662F\u5E03\u5C14\u503C",values:e=>({key:e[1]})},{pattern:/^(.+) 必须是技能 ID 数组$/,template:"{key} \u5FC5\u987B\u662F\u6280\u80FD ID \u6570\u7EC4",values:e=>({key:e[1]})},{pattern:/^(.+) 条目过多$/,template:"{key} \u6761\u76EE\u8FC7\u591A",values:e=>({key:e[1]})},{pattern:/^无法读取 (.+)：(.+)$/,template:"\u65E0\u6CD5\u8BFB\u53D6 {directory}\uFF1A{reason}",values:e=>({directory:e[1],reason:e[2]})},{pattern:/^无法读取入口：(.+)$/,template:"\u65E0\u6CD5\u8BFB\u53D6\u5165\u53E3\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^同 ID 有 (\d+) 个入口；生效入口：(.+)。$/,template:"\u540C ID \u6709 {count} \u4E2A\u5165\u53E3\uFF1B\u751F\u6548\u5165\u53E3\uFF1A{winner}\u3002",values:e=>({count:e[1],winner:e[2]})},{pattern:/^目标入口已存在：(.+)$/,template:"\u76EE\u6807\u5165\u53E3\u5DF2\u5B58\u5728\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^入口已变化，请重新扫描：(.+)$/,template:"\u5165\u53E3\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^检查入口失败：(.+)$/,template:"\u68C0\u67E5\u5165\u53E3\u5931\u8D25\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^改名后校验失败：(.+)$/,template:"\u6539\u540D\u540E\u6821\u9A8C\u5931\u8D25\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^改名失败：(.+)$/,template:"\u6539\u540D\u5931\u8D25\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^技能目录无法读取：(.+)$/,template:"\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^没有找到技能 (.+)$/,template:"\u6CA1\u6709\u627E\u5230\u6280\u80FD {id}",values:e=>({id:e[1]})},{pattern:/^技能 (.+) 有未解决的入口冲突。$/,template:"\u6280\u80FD {id} \u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\u3002",values:e=>({id:e[1]})},{pattern:/^无法识别停用入口：(.+)$/,template:"\u65E0\u6CD5\u8BC6\u522B\u505C\u7528\u5165\u53E3\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^分组不能超过 (\d+) 个$/,template:"\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A",values:e=>({count:e[1]})},{pattern:/^第 (\d+) 个分组格式不正确$/,template:"\u7B2C {index} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E",values:e=>({index:e[1]})},{pattern:/^第 (\d+) 个分组的 ID 无效$/,template:"\u7B2C {index} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548",values:e=>({index:e[1]})},{pattern:/^分组 ID 重复：(.+)$/,template:"\u5206\u7EC4 ID \u91CD\u590D\uFF1A{id}",values:e=>({id:e[1]})},{pattern:/^第 (\d+) 个分组名称需为 1-(\d+) 个字符$/,template:"\u7B2C {index} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-{max} \u4E2A\u5B57\u7B26",values:e=>({index:e[1],max:e[2]})},{pattern:/^分组名称重复：(.+)$/,template:"\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A{name}",values:e=>({name:e[1]})},{pattern:/^分组「(.+)」的成员格式不正确$/,template:"\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E",values:e=>({name:e[1]})},{pattern:/^分组「(.+)」的成员不能超过 (\d+) 个$/,template:"\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A",values:e=>({name:e[1],count:e[2]})},{pattern:/^分组「(.+)」含无效的技能 ID$/,template:"\u5206\u7EC4\u300C{name}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID",values:e=>({name:e[1]})}],De=(e,t=ri)=>{if(e==null||!/[\u4e00-\u9fff]/.test(e))return e??null;if(Object.prototype.hasOwnProperty.call(Lr,e))return t(e);for(let o of si){let n=e.match(o.pattern);if(n){let r=o.values(n),l=Object.fromEntries(Object.entries(r).map(([c,p])=>[c,De(p,t)??p]));return t(o.template,l)}}return e};var{t:s}=qe,pe=Mo({requestTimeoutMs:3e4}),Wr=document.querySelector("#root");if(!Wr)throw new Error("Missing #root");Ir(document);var qr=document.createElement("style");qr.textContent=Cr+wr;document.head.append(qr);var d=(e,t="",o)=>{let n=document.createElement(e);return n.className=t,o!==void 0&&(n.textContent=o),n},Oe=class extends Error{code;conflicts;constructor(t,o,n){super(t),this.name="ServiceError",this.code=o,this.conflicts=n}},ii=e=>e==="enabled"||e==="disabled"||e==="mixed"||e==="conflict",ai=e=>e==="both"||e==="duplicate"||e==="invalid"||e==="empty"||e==="read-error"||e==="manual"||e==="no-description",lt=(e,t="")=>typeof e=="string"?e:t,Pr=e=>typeof e=="string"&&e.length>0?e:null,jt=e=>e===!0,Jr=e=>typeof e=="number"&&Number.isFinite(e)?e:0,Dr=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],dn=e=>{if(!e||typeof e!="object")return null;let t=e;return!ai(t.kind)||typeof t.skillId!="string"?null:{kind:t.kind,skillId:t.skillId,message:lt(t.message,s("\u51B2\u7A81")),activePath:Pr(t.activePath),disabledPath:Pr(t.disabledPath),blocking:jt(t.blocking)}},li=e=>{if(!e||typeof e!="object")return null;let t=e;return typeof t.id!="string"||!t.id||!ii(t.state)?null:{id:t.id,name:lt(t.name,t.id),description:lt(t.description),state:t.state,advertised:jt(t.advertised),autoInvokeOff:jt(t.autoInvokeOff),activePaths:Dr(t.activePaths),disabledPaths:Dr(t.disabledPaths),conflicts:Array.isArray(t.conflicts)?t.conflicts.map(dn).filter(o=>o!==null):[],warnings:Array.isArray(t.warnings)?t.warnings.filter(o=>typeof o=="string"):[],estimatedTokens:Jr(t.estimatedTokens),contentHash:lt(t.contentHash)}},ci=e=>{if(!e||typeof e!="object")throw new Oe(s("\u670D\u52A1\u8FD4\u56DE\u7684\u6280\u80FD\u76EE\u5F55\u4FE1\u606F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let t=e;return{path:lt(t.path),exists:jt(t.exists),error:typeof t.error=="string"?t.error:null}},Ze=e=>{if(!e||typeof e!="object")throw new Oe(s("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let t=e;if(!Array.isArray(t.skills))throw new Oe(s("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let o=t.skills.map(li).filter(c=>c!==null),n=Array.isArray(t.conflicts)?t.conflicts.map(dn).filter(c=>c!==null):o.flatMap(c=>c.conflicts),r=n.filter(c=>c.blocking).length,l={total:o.length,advertised:o.filter(c=>c.advertised).length,disabled:o.filter(c=>c.state==="disabled").length,blockingConflicts:r,warnings:n.length-r,estimatedTokens:o.reduce((c,p)=>c+p.estimatedTokens,0)};return{skills:o,conflicts:n,summary:l,root:ci(t.root),scannedAt:Jr(t.scannedAt)}},di=()=>({version:1,locale:"zh-CN",entries:{}}),Zr=e=>{if(!e||typeof e!="object")throw new Oe(s("\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let t=e;if(t.version!==1||t.locale!=="zh-CN"||!t.entries||typeof t.entries!="object"||Array.isArray(t.entries))throw new Oe(s("\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let o={};for(let[n,r]of Object.entries(t.entries)){if(!r||typeof r!="object")continue;let l=r;typeof l.hash!="string"||typeof l.nameZh!="string"||typeof l.descriptionZh!="string"||typeof l.updatedAt!="number"||(o[n]={hash:l.hash,nameZh:l.nameZh.trim(),descriptionZh:l.descriptionZh.trim(),updatedAt:l.updatedAt})}return{version:1,locale:"zh-CN",entries:o}},qt=e=>{try{return Rr(e).groups}catch(t){throw new Oe(t instanceof Error?De(t.message)??t.message:s("\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[])}},ke=async(e,t,o)=>{let n=await pe.serviceRequest({method:e,path:t,...o===void 0?{}:{body:JSON.stringify(o)}}),r;try{r=JSON.parse(n.body)}catch{throw new Oe(s("\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u6570\u636E\uFF0C\u8BF7\u91CD\u8BD5\u3002"),"parse",[])}if(n.status>=400){let l=r&&typeof r=="object"?r:{},c=typeof l.error=="string"?De(l.error)??l.error:s("\u8BF7\u6C42\u5931\u8D25\uFF08{status}\uFF09",{status:n.status}),p=typeof l.code=="string"?l.code:null,E=Array.isArray(l.conflicts)?l.conflicts.map(dn).filter(f=>f!==null):[];throw new Oe(c,p,E)}return r},oe=e=>e instanceof b?e.code==="NO_SERVICE"?s("\u8BF7\u5728\u8BBE\u7F6E \u2192 \u6269\u5C55\u4E2D\u5141\u8BB8\u201C\u6280\u80FD\u5F00\u5173\u201D\u8FD0\u884C\u672C\u5730\u670D\u52A1\u3002"):e.code==="SERVICE_FAILED"?s("\u672C\u5730\u670D\u52A1\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6269\u5C55\u540E\u91CD\u8BD5\u3002"):e.code==="DISABLED"?s("\u6280\u80FD\u5F00\u5173\u6269\u5C55\u5DF2\u505C\u7528\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u542F\u7528\u3002"):e.code==="HOST_TIMEOUT"?s("\u672C\u5730\u670D\u52A1\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5\u3002"):e.code==="NOT_GRANTED"?s("\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u5141\u8BB8\u201C\u6A21\u578B\u8C03\u7528\u201D\u6743\u9650\uFF0C\u6216\u91CD\u65B0\u5B89\u88C5\u6269\u5C55\u3002"):e.code==="UNSUPPORTED"?s("\u5F53\u524D\u5BBF\u4E3B\u6216\u6A21\u578B\u4E0D\u652F\u6301\u7FFB\u8BD1\u8BF7\u6C42\u3002"):s("\u65E0\u6CD5\u8FDE\u63A5\u672C\u5730\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u6269\u5C55\u6388\u6743\u3002"):e instanceof Oe?De(e.message)??e.message:De(e instanceof Error?e.message:null)??s("\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"),pi=e=>e instanceof Oe&&e.code==="not-found"?s("\u672C\u5730\u670D\u52A1\u7248\u672C\u8FC7\u65E7\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u7981\u7528\u518D\u542F\u7528\u201C\u6280\u80FD\u5F00\u5173\u201D\u3002"):oe(e),gt=d("main","ext ext-container sk");gt.setAttribute("aria-label",s("\u6280\u80FD\u5F00\u5173"));var Qr=d("header","sk-header"),Yr=d("div","sk-title-row"),es=d("h1","sk-title",s("\u6280\u80FD\u5F00\u5173")),Jt=d("div","sk-actions"),ui=we(Jt,{label:s("\u91CD\u65B0\u626B\u63CF"),variant:"outline",size:"sm",onClick:()=>{cn(!0),Wt()}}),ts=we(Jt,{label:s("\u5168\u90E8\u542F\u7528"),variant:"outline",size:"sm",onClick:()=>Ts(!0)}),os=we(Jt,{label:s("\u5168\u90E8\u5173\u95ED"),variant:"outline",size:"sm",onClick:()=>Ts(!1)});Yr.append(es,Jt);var nn=d("p","sk-summary"),rn=d("p","sk-summary sk-summary-secondary"),ns=d("div","sk-translation-row"),rs=d("div","sk-translation-controls"),Zt=d("div","sk-translation-tabs");Zt.setAttribute("aria-label",s("\u6280\u80FD\u8BF4\u660E\u8BED\u8A00"));var pn=d("div");rs.append(Zt,pn);var sn=d("div","sk-translation-progress"),ct=d("span","sk-translation-status");ct.setAttribute("aria-live","polite");ns.append(rs,sn,ct);Qr.append(Yr,nn,rn,ns);var ss=d("div","sk-body"),Te=d("div","sk-notice-root");Te.setAttribute("aria-live","polite");var Bt=d("div","sk-groups-note"),is=d("div","sk-groups-row"),dt=d("div","sk-groups"),un=d("div","sk-group-select"),ve=d("button","sk-chip sk-groups-edit",s("\u7F16\u8F91\u5206\u7EC4"));ve.type="button";ve.setAttribute("aria-pressed","false");ve.addEventListener("click",()=>{x?hn():yi()});is.append(dt,un,ve);var nt=d("div","sk-group-editor-root"),an=d("div"),Et=d("div"),as=d("div","sk-toolbar"),fn=d("div","sk-search-slot"),ls=d("div","sk-toolbar-selects"),En=d("div","sk-filter-slot"),mn=d("div","sk-sort-slot");ls.append(En,mn);as.append(fn,ls);var pt=d("div","sk-list");pt.setAttribute("role","list");var cs=d("footer","sk-footer"),ds=d("p","",s("\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002")),ps=d("p","",s("\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002"));cs.append(ds,ps);ss.append(Te,Bt,is,nt,an,Et,as,pt,cs);gt.append(Qr,ss);Wr.append(gt);var _=null,Ke=di(),Me="original",rt=!1,Ae=!1,Ge={done:0,total:0},ot=null,Q=null,ut=[],me=!1,ze=null,y=null,g=null,_e=null,ae=null,ee=null,H=[],ye=null,He=!0,x=null,re=null,Ve=!1,Xe=!1,ft="",mt="",_t="all",Qt="default",$t=new Set,Gr,Hr=!1,_n=()=>[{id:"all",label:s("\u5168\u90E8\u72B6\u6001")},{id:"enabled",label:s("\u5DF2\u542F\u7528")},{id:"disabled",label:s("\u5DF2\u5173\u95ED")},{id:"attention",label:s("\u51B2\u7A81\u4E0E\u63D0\u793A")}],gn=()=>[{id:"default",label:s("\u9ED8\u8BA4\u987A\u5E8F")},{id:"tokens",label:s("Token \u964D\u5E8F")}],fi=Fo(Zt,{items:[{id:"original",label:s("\u539F\u6587")},{id:"translated",label:s("\u4E2D\u6587\u8BD1\u6587")}],activeId:"original",trackBackground:!0,onChange:e=>{rt=!0,Me=e==="translated"?"translated":"original",S(),Me==="translated"&&hs()}}),Ei=we(pn,{label:s("\u8865\u5145\u7FFB\u8BD1"),variant:"outline",size:"sm",onClick:()=>{rt=!0,Me="translated",S(),hs()}}),us=Bo(fn,{value:"",placeholder:s("\u641C\u7D22\u540D\u79F0\u3001\u63CF\u8FF0\u6216 ID\uFF08\u6309 / \u805A\u7126\uFF09"),onChange:e=>{mt=e,St()}}),fs=()=>fn.querySelector("input"),Sn=()=>{let e=fs();e&&e.setAttribute("aria-label",s("\u641C\u7D22\u6280\u80FD"))};Sn();var Es=at(En,{value:"all",options:_n(),onChange:e=>{_t=e==="enabled"||e==="disabled"||e==="attention"?e:"all",St()}}),Ft=En.querySelector(".oc-sdk-trigger");Ft&&(Ft.setAttribute("aria-label",s("\u72B6\u6001\u7B5B\u9009")),Ft.removeAttribute("aria-labelledby"));var ms=at(mn,{value:"default",options:gn(),onChange:e=>{Qt=e==="tokens"?"tokens":"default",St()}}),zt=mn.querySelector(".oc-sdk-trigger");zt&&(zt.setAttribute("aria-label",s("\u6392\u5E8F\u65B9\u5F0F")),zt.removeAttribute("aria-labelledby"));var mi=at(un,{value:"all",options:[{id:"all",label:s("\u5168\u90E8")}],onChange:e=>{ee=e==="all"?null:e,S()}}),Kt=un.querySelector(".oc-sdk-trigger");Kt&&(Kt.setAttribute("aria-label",s("\u5206\u7EC4\u7B5B\u9009")),Kt.removeAttribute("aria-labelledby"));document.addEventListener("keydown",e=>{if(!e.defaultPrevented){if(e.key==="/"&&!e.metaKey&&!e.ctrlKey&&!e.altKey){let t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable))return;let o=fs();o&&(e.preventDefault(),o.focus(),o.select());return}if(e.key==="Escape"){if(ae||_e!==null){e.preventDefault(),ae=null,_e=null,S();return}x&&!g&&(e.preventDefault(),Ve||Xe?(Ve=!1,Xe=!1,S()):hn())}}});var $e=()=>!!_?.root.error,_i=e=>e.state==="conflict"?"error":e.state==="mixed"?"warning":e.state==="disabled"?"info":e.advertised?"success":"warning",gi=e=>e.state==="conflict"?s("\u51B2\u7A81"):e.state==="mixed"?s("\u6DF7\u5408"):e.state==="disabled"?s("\u5173\u95ED"):s("\u5F00\u542F"),Si=(e,t="neutral")=>{let o=d("span","sk-badge",e);return o.dataset.tone=t,o},hi=e=>{switch(e){case"both":return s("\u5165\u53E3\u548C\u505C\u7528\u6587\u4EF6\u540C\u65F6\u5B58\u5728");case"duplicate":return s("\u540C ID \u591A\u4E2A\u5165\u53E3");case"invalid":return s("frontmatter \u65E0\u6CD5\u89E3\u6790");case"empty":return s("\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A");case"read-error":return s("\u5165\u53E3\u65E0\u6CD5\u8BFB\u53D6");case"manual":return s("\u4EC5\u624B\u52A8\u8C03\u7528");case"no-description":return s("\u6CA1\u6709 description");default:return s("\u51B2\u7A81")}},Qo=(e,t)=>{if(!t)return null;let o=d("p","sk-path");return o.append(d("span","sk-path-label",`${e}\uFF1A`),d("code","",t)),o},F=(e,t,o=!1,n=!1)=>{let r=d("button",o?"sk-inline-button sk-inline-primary":"sk-inline-button",e);return r.type="button",r.disabled=!!g||n,r.addEventListener("click",t),r},Vr=e=>{let t=d("li","sk-conflict-item");t.dataset.tone=e.blocking?"error":"warning";let o=d("div","sk-conflict-copy");if(o.append(d("strong","",hi(e.kind)),d("p","sk-conflict-message",De(e.message)??e.message)),e.kind==="both"?(o.append(Qo(s("\u542F\u7528\u5165\u53E3"),e.activePath)??d("span")),o.append(Qo(s("\u505C\u7528\u5165\u53E3"),e.disabledPath)??d("span"))):(e.activePath??e.disabledPath)&&o.append(Qo(s("\u5165\u53E3"),e.activePath??e.disabledPath)??d("span")),t.append(o),e.kind==="both"&&e.activePath){let n=d("div","sk-conflict-actions");n.append(F(s("\u4FDD\u7559\u542F\u7528"),()=>void Kr(e,"enabled"),!1,$e()),F(s("\u4FDD\u7559\u5173\u95ED"),()=>void Kr(e,"disabled"),!1,$e())),t.append(n)}return t},Ti=()=>{if(Et.replaceChildren(),!_)return;let t=[..._.root.error?[{kind:"read-error",skillId:"",message:s("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}\uFF08{path}\uFF09",{error:De(_.root.error)??_.root.error,path:_.root.path}),activePath:null,disabledPath:null,blocking:!0}]:[],..._.conflicts],o=t.filter(c=>c.blocking),n=t.filter(c=>!c.blocking);if(o.length===0&&n.length===0)return;let r=d("section","sk-conflicts");r.setAttribute("aria-label",s("\u51B2\u7A81\u68C0\u67E5"));let l=d("div","sk-section-head");if(l.append(d("h2","sk-section-title",s("\u51B2\u7A81\u68C0\u67E5")),d("span","sk-section-count",s("{blocking} \u9879\u9700\u8981\u5904\u7406 \xB7 {warnings} \u9879\u63D0\u793A",{blocking:o.length,warnings:n.length}))),r.append(l),o.length>0){let c=d("ul","sk-conflict-list");for(let p of o)c.append(Vr(p));r.append(c)}if(n.length>0){let c=d("details","sk-warning-details");c.append(d("summary","",s("\u63D0\u793A\uFF08{count}\uFF09",{count:n.length})));let p=d("ul","sk-conflict-list");for(let E of n)p.append(Vr(E));c.append(p),r.append(c)}Et.append(r)},_s=()=>{if(Te.replaceChildren(),ae){let e=ae,t=new Set(e.skillIds),o=_?_.skills.filter(l=>!t.has(l.id)).length:0,n=d("div","sk-notice",s("\u4EC5\u542F\u7528\u300C{name}\u300D\uFF1A\u5C06\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:o}));n.dataset.tone="warning",n.setAttribute("role","status");let r=d("div","sk-notice-actions");r.append(F(s("\u786E\u8BA4"),()=>void Pi(),!0),F(s("\u53D6\u6D88"),()=>{ae=null,S()})),n.append(r),Te.append(n);return}if(_e!==null){let e=_?_.skills.filter(n=>(_e?n.disabledPaths.length:n.activePaths.length)>0).length:0,t=d("div","sk-notice",_e?s("\u5C06\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002",{count:e}):s("\u5C06\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002",{count:e}));t.dataset.tone="warning",t.setAttribute("role","status");let o=d("div","sk-notice-actions");o.append(F(s(_e?"\u786E\u8BA4\u542F\u7528":"\u786E\u8BA4\u5173\u95ED"),()=>void Fi(),!0),F(s("\u53D6\u6D88"),()=>{_e=null,S()})),t.append(o),Te.append(t);return}if(y){let e=d("div","sk-notice",y.text);if(e.dataset.tone=y.tone,e.setAttribute("role",y.tone==="error"?"alert":"status"),y.actions?.length){let t=d("div","sk-notice-actions");for(let o of y.actions)t.append(F(o.label,o.onClick,o.primary));e.append(t)}Te.append(e);return}if(ze){let e=d("div","sk-notice",ze);e.dataset.tone="error",e.setAttribute("role","alert"),Te.append(e);return}if(Q){let e=d("div","sk-notice",Q);e.dataset.tone="error",e.setAttribute("role","alert"),Te.append(e);return}if(me&&!_){let e=d("div","sk-notice",s("\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026"));e.dataset.tone="info",e.setAttribute("role","status"),Te.append(e)}},ki=()=>{if(!_){nn.textContent=s(me?"\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026":"\u5C1A\u672A\u8BFB\u53D6\u6280\u80FD\u3002"),rn.textContent=s("\u5173\u95ED\u5165\u53E3\u6587\u6863\u540E\uFF0COpenCode \u4E0D\u4F1A\u518D\u53D1\u73B0\u8BE5\u6280\u80FD\u3002");return}nn.textContent=s("\u6A21\u578B\u53EF\u89C1 {advertised} / \u5171 {total} \u4E2A \xB7 \u7EA6 {tokens} tokens/\u6B65",{advertised:_.summary.advertised,total:_.summary.total,tokens:_.summary.estimatedTokens.toLocaleString(qe.locale)});let e=[s("{count} \u4E2A\u5DF2\u5173\u95ED",{count:_.summary.disabled})];_.summary.blockingConflicts>0?e.push(s("{count} \u9879\u963B\u585E\u51B2\u7A81",{count:_.summary.blockingConflicts})):e.push(s("\u65E0\u963B\u585E\u51B2\u7A81")),_.summary.warnings>0&&e.push(s("{count} \u9879\u63D0\u793A",{count:_.summary.warnings})),_.root.error&&e.push(s("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6")),rn.textContent=s("{parts}\u3002\u4F30\u7B97\u4E0D\u542B\u5185\u7F6E\u548C\u9879\u76EE\u6280\u80FD\u3002",{parts:e.join(" \xB7 ")})},st=e=>{let t=Ke.entries[e.id];return t&&t.hash===e.contentHash?t:null},bi=()=>_?.skills.filter(e=>st(e)).length??0,Xr=e=>Me!=="translated"?e.name:st(e)?.nameZh||e.name;var xi=()=>{fi.update({activeId:Me,items:[{id:"original",label:s("\u539F\u6587")},{id:"translated",label:s("\u4E2D\u6587\u8BD1\u6587")}]});let e=_?.skills.length??0,t=bi(),o=Math.max(0,e-t);if(pn.hidden=o===0||Ae||!_,Ei.update({label:t>0?s("\u8865\u5145\u7FFB\u8BD1"):s("\u7FFB\u8BD1\u672A\u8BD1\u9879"),disabled:Ae||!!g||!_}),Ae){let n=Ge.total>0?Math.round(Ge.done/Ge.total*100):0;ot?ot.update({value:n,tone:"primary"}):ot=Ko(sn,{value:n,tone:"primary"}),ct.textContent=s("\u7FFB\u8BD1 {done}/{total}\u2026",{done:Ge.done,total:Ge.total})}else ot&&(ot.dispose(),ot=null,sn.replaceChildren()),Me==="translated"?ct.textContent=t?s("{translated}/{total} \u5DF2\u7FFB\u8BD1",{translated:t,total:e}):s("\u70B9\u201C\u7FFB\u8BD1\u201D\u751F\u6210\u4E2D\u6587"):ct.textContent=t?s("{count} \u4E2A\u6709\u4E2D\u6587",{count:t}):""},Je=e=>e.skillIds.filter(t=>_?.skills.some(o=>o.id===t)),gs=e=>{let t=Je(e).map(n=>_?.skills.find(r=>r.id===n)).filter(n=>!!n);if(t.length===0)return s("\u65E0\u6280\u80FD");if(t.some(n=>n.state==="conflict"))return s("\u6709\u51B2\u7A81");let o=t.filter(n=>n.state==="enabled").length;return o===t.length?s("\u5168\u5F00"):s(o===0?"\u5168\u5173":"\u90E8\u5206")},$r=e=>{Array.from(dt.querySelectorAll("[data-group]")).find(o=>o.dataset.group===e)?.focus()},Ai=()=>`custom-${globalThis.crypto?.randomUUID?.().slice(0,8)??Math.random().toString(36).slice(2,10)}`,Oi=()=>{if(Bt.replaceChildren(),ye){let e=d("div","sk-notice",s("\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}",{error:ye}));e.dataset.tone="error",e.setAttribute("role","alert");let t=d("div","sk-notice-actions");t.append(F(s("\u91CD\u65B0\u8BFB\u53D6"),()=>void Wt(),!1,He)),e.append(t),Bt.append(e);return}He||H.length>0||!_||$e()||Bt.append(d("div","sk-notice",s("\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002\u70B9\u300C\u7F16\u8F91\u5206\u7EC4\u300D\u65B0\u5EFA\uFF0C\u6216\u5728\u7F16\u8F91\u5668\u91CC\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4\u3002")))},ln=e=>{x={id:e?.id??null,name:e?.name??"",members:e?[...e.skillIds]:[]},ft="",re=null,Ve=!1,Xe=!1,S();let t=nt.querySelector(".sk-group-name");t?.focus(),t?.select()},yi=()=>{if(ye||He||!_||$e())return;let e=H.find(t=>t.id===ee)??H[0]??null;ln(e),nt.scrollIntoView({block:"nearest"})},hn=()=>{g||(x=null,ft="",re=null,Ve=!1,Xe=!1,S(),ve.focus())},Ri=e=>{if(e==="new"){ln(null);return}let t=H.find(o=>o.id===e);t&&ln(t)},Yo=()=>{nt.querySelector(".sk-group-name")?.focus()},Br=async()=>{let e=x;if(!e||g||ye)return;let t=e.name.trim();if(!t){re=s("\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0\u3002"),S(),Yo();return}if(t.length>40){re=s("\u5206\u7EC4\u540D\u79F0\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A\u5B57\u7B26\u3002",{count:40}),S(),Yo();return}if(H.some(l=>l.id!==e.id&&l.name.trim().toLowerCase()===t.toLowerCase())){re=s("\u5DF2\u7ECF\u6709\u540D\u4E3A\u300C{name}\u300D\u7684\u5206\u7EC4\u3002",{name:t}),S(),Yo();return}if(e.members.length===0){re=s("\u5206\u7EC4\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u6210\u5458\u3002"),S();return}let o=e.id??Ai(),n={id:o,name:t,skillIds:[...e.members]},r=e.id?H.map(l=>l.id===e.id?n:l):[...H,n];g="groups",re=null,S();try{H=qt(await ke("POST","/groups",{version:1,groups:r})),ye=null,ee=o,ae=null;let l=H.find(c=>c.id===o)??null;x=l?{id:l.id,name:l.name,members:[...l.skillIds]}:null,y={text:s("\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C{name}\u300D\u3002",{name:t}),tone:"success"},pe.toast({kind:"success",message:s("\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C{name}\u300D\u3002",{name:t})}).catch(()=>{})}catch(l){re=oe(l)}finally{g=null,S()}},vi=()=>{!x?.id||g||(Ve=!0,Xe=!1,S())},Ii=async()=>{if(!x?.id||g)return;let e=x.id,t=H.filter(o=>o.id!==e);g="groups",Ve=!1,re=null,S();try{H=qt(await ke("POST","/groups",{version:1,groups:t})),ye=null,ae?.id===e&&(ae=null),ee===e&&(ee=null);let o=H.find(n=>n.id===ee)??H[0]??null;ee=o?.id??null,x=o?{id:o.id,name:o.name,members:[...o.skillIds]}:null,y={text:s("\u5DF2\u5220\u9664\u5206\u7EC4\u3002"),tone:"success"}}catch(o){re=oe(o)}finally{g=null,S()}},wi=()=>{if(!(g||He||ye)){if(Ht(H).added.length===0){y={text:s("\u793A\u4F8B\u5206\u7EC4\u7684\u540D\u79F0\u6216 ID \u90FD\u5DF2\u5B58\u5728\uFF0C\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u5206\u7EC4\u3002"),tone:"info"},S();return}Xe=!0,Ve=!1,S()}},Ci=async()=>{if(g)return;let{groups:e,added:t}=Ht(H);if(Xe=!1,t.length===0){y={text:s("\u793A\u4F8B\u5206\u7EC4\u7684\u540D\u79F0\u6216 ID \u90FD\u5DF2\u5B58\u5728\uFF0C\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u5206\u7EC4\u3002"),tone:"info"},S();return}g="groups",re=null,S();try{H=qt(await ke("POST","/groups",{version:1,groups:e})),ye=null,y={text:s("\u5DF2\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\u3002",{count:t.length}),tone:"success"}}catch(o){re=oe(o)}finally{g=null,S()}},Mi=()=>{if(nt.replaceChildren(),!x)return;let e=x,t=d("section","sk-group-editor");t.setAttribute("aria-label",s("\u7F16\u8F91\u5206\u7EC4"));let o=d("div","sk-section-head");o.append(d("h2","sk-section-title",s("\u7F16\u8F91\u5206\u7EC4")),F(s("\u5173\u95ED"),hn,!1,!!g)),t.append(o);let n=d("label","sk-field");n.append(d("span","sk-field-label",s("\u9009\u62E9\u5206\u7EC4")));let r=d("select","sk-input");r.setAttribute("aria-label",s("\u9009\u62E9\u5206\u7EC4"));let l=d("option","",s("\u65B0\u5EFA\u5206\u7EC4"));l.value="new",r.append(l);for(let R of H){let N=d("option","",`${R.name}\uFF08${R.skillIds.length}\uFF09`);N.value=R.id,r.append(N)}r.value=e.id??"new",r.disabled=!!g,r.addEventListener("change",()=>Ri(r.value)),n.append(r);let c=d("label","sk-field");c.append(d("span","sk-field-label",s("\u540D\u79F0")));let p=d("input","sk-input sk-group-name");p.type="text",p.value=e.name,p.maxLength=40,p.placeholder=s("\u4F8B\u5982\uFF1A\u65E5\u5E38\u5F00\u53D1"),p.autocomplete="off",p.spellcheck=!1,p.disabled=!!g,p.addEventListener("input",()=>{x&&(x.name=p.value,re=null)}),p.addEventListener("keydown",R=>{R.key==="Enter"&&(R.preventDefault(),!(R.isComposing||R.keyCode===229)&&Br())}),c.append(p),t.append(n,c);let E=d("fieldset","sk-members"),f=d("legend","",s("\u6210\u5458\uFF08{count}\uFF09",{count:e.members.length}));E.append(f);let A=d("div","sk-members-tools"),h=d("input","sk-member-filter");h.type="search",h.value=ft,h.placeholder=s("\u7B5B\u9009\u6210\u5458\u540D\u79F0\u6216 ID"),h.setAttribute("aria-label",s("\u7B5B\u9009\u6210\u5458\u540D\u79F0\u6216 ID")),h.disabled=!!g,A.append(h,F(s("\u5168\u9009"),()=>{if(!x)return;let R=_?.skills.map(C=>C.id)??[],N=x.members.filter(C=>!R.includes(C));x.members=[...R,...N],S()},!1,!!g),F(s("\u6E05\u7A7A"),()=>{x&&(x.members=[],S())},!1,!!g)),E.append(A);let O=d("div","sk-member-list"),L=d("div","sk-order-box"),W=R=>{x&&(f.textContent=s("\u6210\u5458\uFF08{count}\uFF09",{count:x.members.length}),se(),ge(R))},se=()=>{if(O.replaceChildren(),!x)return;let N=(_?.skills??[]).filter(C=>qo(C,ft,st(C)));if(N.length===0){O.append(d("p","sk-member-empty",s("\u6CA1\u6709\u5339\u914D\u7684\u6210\u5458")));return}for(let C of N){let X=d("label","sk-check"),Y=d("input");Y.type="checkbox",Y.checked=x.members.includes(C.id),Y.disabled=!!g,Y.addEventListener("change",()=>{x&&(Y.checked?x.members.includes(C.id)||x.members.push(C.id):x.members=x.members.filter(ue=>ue!==C.id),re=null,f.textContent=s("\u6210\u5458\uFF08{count}\uFF09",{count:x.members.length}),ge())});let q=d("span","sk-check-copy");q.append(d("span","sk-check-name",Xr(C)),d("code","sk-check-id",C.id)),X.append(Y,q),O.append(X)}},ge=R=>{if(L.replaceChildren(),!x||x.members.length===0)return;L.append(d("p","sk-order-title",s("\u5DF2\u9009\u6B65\u9AA4\u987A\u5E8F\uFF08{count}\uFF09",{count:x.members.length})));let N=d("ol","sk-order-list");for(let[C,X]of x.members.entries()){let Y=_?.skills.find(Ue=>Ue.id===X)??null,q=Y?Xr(Y):X,ue=d("li","sk-order-item"),ie=d("span","sk-order-label");ie.append(d("span","sk-step",String(C+1)),d("span","sk-order-name",q));let u=d("span","sk-order-actions"),m=d("button","sk-order-btn","\u2191");m.type="button",m.disabled=!!g||C===0,m.dataset.orderFocus=`up:${X}`,m.title=s("\u4E0A\u79FB\u300C{name}\u300D",{name:q}),m.setAttribute("aria-label",s("\u4E0A\u79FB\u300C{name}\u300D",{name:q})),m.addEventListener("click",()=>{x&&(x.members=Wo(x.members,C,-1),W(`up:${X}`))});let ne=d("button","sk-order-btn","\u2193");ne.type="button",ne.disabled=!!g||C===x.members.length-1,ne.dataset.orderFocus=`down:${X}`,ne.title=s("\u4E0B\u79FB\u300C{name}\u300D",{name:q}),ne.setAttribute("aria-label",s("\u4E0B\u79FB\u300C{name}\u300D",{name:q})),ne.addEventListener("click",()=>{x&&(x.members=Wo(x.members,C,1),W(`down:${X}`))});let be=d("button","sk-order-btn","\xD7");be.type="button",be.disabled=!!g,be.title=s("\u79FB\u9664\u300C{name}\u300D",{name:q}),be.setAttribute("aria-label",s("\u79FB\u9664\u300C{name}\u300D",{name:q})),be.addEventListener("click",()=>{x&&(x.members=x.members.filter(Ue=>Ue!==X),W())}),u.append(m,ne,be),ue.append(ie,u),N.append(ue)}L.append(N),R&&Array.from(L.querySelectorAll("[data-order-focus]")).find(X=>X.dataset.orderFocus===R&&!X.disabled)?.focus()};h.addEventListener("input",()=>{ft=h.value,se()}),se(),ge(),E.append(O,L);let w=new Set(_?.skills.map(R=>R.id)??[]),te=e.members.filter(R=>!w.has(R));if(te.length>0){let R=d("div","sk-missing");R.append(d("span","sk-missing-label",s("\u76EE\u5F55\u4E2D\u7F3A\u5931\uFF1A")));for(let N of te){let C=d("button","sk-missing-chip",`${N} \xD7`);C.type="button",C.disabled=!!g,C.title=s("\u4ECE\u5206\u7EC4\u79FB\u9664\u8FD9\u4E2A\u7F3A\u5931\u6210\u5458"),C.addEventListener("click",()=>{x&&(x.members=x.members.filter(X=>X!==N),S())}),R.append(C)}E.append(R)}if(t.append(E),re){let R=d("p","sk-editor-error",re);R.setAttribute("role","alert"),t.append(R)}let le=d("div","sk-editor-actions");if(e.id&&le.append(F(s("\u5220\u9664\u5206\u7EC4"),vi,!1,!!g)),le.append(F(s("\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4"),wi,!1,!!g),F(e.id?s("\u4FDD\u5B58\u66F4\u6539"):s("\u65B0\u5EFA\u5206\u7EC4"),()=>void Br(),!0,!!g)),t.append(le),Ve){let R=d("div","sk-editor-confirm");R.dataset.tone="warning",R.append(d("p","",s("\u5220\u9664\u5206\u7EC4\u300C{name}\u300D\uFF1F\u6280\u80FD\u672C\u8EAB\u4E0D\u4F1A\u88AB\u5220\u9664\u3002",{name:e.name.trim()||s("\u672A\u547D\u540D")})));let N=d("div","sk-actions");N.append(F(s("\u786E\u8BA4\u5220\u9664"),()=>void Ii(),!0,!!g),F(s("\u53D6\u6D88"),()=>{Ve=!1,S()},!1,!!g)),R.append(N),t.append(R)}if(Xe){let R=Ht(H).added.length,N=d("div","sk-editor-confirm");N.dataset.tone="warning",N.append(d("p","",s("\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\uFF1F\u5DF2\u6709\u540C\u540D\u6216\u540C ID \u7684\u5206\u7EC4\u4F1A\u8DF3\u8FC7\uFF0C\u5F53\u524D\u5206\u7EC4\u4E0D\u4F1A\u88AB\u8986\u76D6\u3002",{count:R})));let C=d("div","sk-actions");C.append(F(s("\u786E\u8BA4\u5BFC\u5165"),()=>void Ci(),!0,!!g),F(s("\u53D6\u6D88"),()=>{Xe=!1,S()},!1,!!g)),N.append(C),t.append(N)}t.append(d("p","sk-editor-hint",s("\u5206\u7EC4\u53EA\u5F71\u54CD\u9762\u677F\u7B5B\u9009\u548C\u6279\u91CF\u5F00\u5173\uFF0C\u4E0D\u6539\u53D8\u6280\u80FD\uFF1B\u6210\u5458\u987A\u5E8F\u51B3\u5B9A\u7EC4\u5185\u6B65\u9AA4\u53F7\uFF0C\u4FDD\u5B58\u540E\u5199\u5165 groups.json\u3002"))),nt.append(t)},Ui=()=>{dt.replaceChildren();let e=_?.skills.length??0,t=d("button","sk-chip",s("\u5168\u90E8 {count}",{count:e}));t.type="button",t.dataset.group="all",t.setAttribute("aria-pressed",ee===null?"true":"false"),t.addEventListener("click",()=>{ee=null,S(),$r("all")}),dt.append(t);for(let o of H){let n=Je(o).length,r=d("button","sk-chip",`${o.name} ${n}`);r.type="button",r.dataset.group=o.id,r.setAttribute("aria-pressed",ee===o.id?"true":"false"),r.addEventListener("click",()=>{ee=o.id,S(),$r(o.id)}),dt.append(r)}ve.textContent=s(x?"\u5173\u95ED\u7F16\u8F91":"\u7F16\u8F91\u5206\u7EC4"),ve.setAttribute("aria-pressed",x?"true":"false"),ve.disabled=He||!!ye||!!g||!_||$e(),ve.title=He?s("\u6B63\u5728\u8BFB\u53D6\u5206\u7EC4\u2026"):ye?s("\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u4FEE\u590D\u6587\u4EF6\u540E\u91CD\u65B0\u8BFB\u53D6"):_?$e()?s("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6"):"":s("\u6280\u80FD\u5217\u8868\u5C1A\u672A\u8BFB\u53D6"),mi.update({value:ee??"all",options:[{id:"all",label:s("\u5168\u90E8 {count}",{count:e})},...H.map(o=>({id:o.id,label:`${o.name} ${Je(o).length}`,hint:gs(o)}))]})},Ni=()=>{if(an.replaceChildren(),!_||!ee)return;let e=_,t=H.find(h=>h.id===ee);if(!t)return;let o=Je(t),n=t.skillIds.filter(h=>!o.includes(h)),l=o.map(h=>e.skills.find(O=>O.id===h)).filter(h=>!!h).some(h=>h.state==="conflict"),c=$e()||l||o.length===0,p=d("div","sk-groupbar"),E=d("div","sk-groupbar-text");E.append(d("strong","",t.name),d("span","sk-group-state",s("{count} \u4E2A \xB7 {state}",{count:o.length,state:gs(t)}))),n.length>0&&E.append(d("p","sk-group-warning",s("\u7F3A\u5931\uFF1A{names}",{names:n.join(", ")})));let f=d("div","sk-groupbar-actions");f.append(F(s("\u542F\u7528\u6574\u7EC4"),()=>void Fr(t,!0),!1,c),F(s("\u5173\u95ED\u6574\u7EC4"),()=>void Fr(t,!1),!1,c));let A=F(s("\u4EC5\u542F\u7528\u672C\u7EC4"),()=>Li(t),!1,c||n.length>0);n.length>0&&(A.title=s("\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u5148\u5904\u7406\u540E\u518D\u4EC5\u542F\u7528\u672C\u7EC4")),f.append(A),p.append(E,f),an.append(p)},Fr=async(e,t)=>{if(!_||g)return;let o=Je(e);if(o.length!==0){g=`group:${e.id}:${t?"on":"off"}`,ae=null,_e=null,y=null,S();try{_=Ze(await ke("POST","/skills/batch",{enable:t?o:[],disable:t?[]:o})),y={text:t?s("\u5DF2\u542F\u7528\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:o.length}):s("\u5DF2\u5173\u95ED\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:o.length}),tone:"success"},pe.toast({kind:"success",message:t?s("\u5DF2\u542F\u7528\u300C{name}\u300D",{name:e.name}):s("\u5DF2\u5173\u95ED\u300C{name}\u300D",{name:e.name})}).catch(()=>{})}catch(n){y={text:oe(n),tone:"error"},g=null,S(),ht(!1,!0);return}g=null,S()}},Li=e=>{if(!_||g)return;let t=Je(e),o=e.skillIds.filter(n=>!t.includes(n));t.length===0||o.length>0||(ae=e,_e=null,y=null,S(),Te.scrollIntoView({block:"nearest"}),Te.querySelector("button")?.focus())},Pi=async()=>{if(!_||g||!ae)return;let e=ae;ae=null;let t=Je(e),o=e.skillIds.filter(l=>!t.includes(l));if(t.length===0||o.length>0){y={text:s("\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u672A\u6267\u884C\u3002"),tone:"error"},S();return}let n=new Set(e.skillIds),r=_.skills.filter(l=>!n.has(l.id)).map(l=>l.id);g=`group-only:${e.id}`,y=null,S();try{_=Ze(await ke("POST","/skills/batch",{enable:t,disable:r})),y={text:s("\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D\uFF0C\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:r.length}),tone:"success"},pe.toast({kind:"success",message:s("\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D",{name:e.name})}).catch(()=>{})}catch(l){y={text:oe(l),tone:"error"},g=null,S(),ht(!1,!0);return}g=null,S()},zr=async(e,t)=>{try{await pe.writeClipboard(e),pe.toast({kind:"success",message:t}).catch(()=>{})}catch(o){y={text:oe(o),tone:"error"},_s()}},en=(e,t)=>{let o=d("span","sk-menu-slot"),n=t.activePaths[0]??t.disabledPaths[0]??null;jo(o,{label:"\u22EF",variant:"ghost",size:"sm",items:[{id:"copy-path",label:s("\u590D\u5236\u5165\u53E3\u8DEF\u5F84"),disabled:!n},{id:"copy-id",label:s("\u590D\u5236\u6280\u80FD ID")},{separator:!0},{id:"retranslate",label:s("\u5355\u72EC\u91CD\u8BD1\u6B64\u9879"),disabled:Ae||!!g}],onSelect:l=>{l==="copy-path"&&n?zr(n,s("\u5DF2\u590D\u5236\u5165\u53E3\u8DEF\u5F84\u3002")):l==="copy-id"?zr(t.id,s("\u5DF2\u590D\u5236\u6280\u80FD ID\u3002")):l==="retranslate"&&Bi(t)}});let r=o.querySelector(".oc-sdk-btn");r&&(r.setAttribute("aria-label",`${s("\u66F4\u591A\u64CD\u4F5C")} ${t.name}`),r.title=s("\u66F4\u591A\u64CD\u4F5C")),e.append(o)},Di=e=>{let t=d("div","sk-skill-action"),o=d("span","sk-action-note"),n=d("div","sk-action-top"),r=$e();if(e.state==="conflict"){o.textContent=s(r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5148\u5904\u7406\u51B2\u7A81");let p=d("button","sk-inline-button",s("\u5904\u7406\u51B2\u7A81"));return p.type="button",p.disabled=!!g||r,p.addEventListener("click",()=>{Et.scrollIntoView({block:"nearest"}),Et.querySelector("button")?.focus()}),n.append(p),en(n,e),t.append(o,n),t}if(e.state==="mixed"){o.textContent=s(r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u90E8\u5206\u5165\u53E3\u5173\u95ED");let p=d("div","sk-mini-actions"),E=d("button","sk-inline-button",s("\u5168\u90E8\u542F\u7528"));E.type="button",E.disabled=!!g||r,E.addEventListener("click",()=>void tn(e,!0));let f=d("button","sk-inline-button",s("\u5168\u90E8\u5173\u95ED"));return f.type="button",f.disabled=!!g||r,f.addEventListener("click",()=>void tn(e,!1)),p.append(E,f),en(p,e),t.append(o,p),t}let l=e.state==="enabled",c=d("button","sk-switch");return c.type="button",c.setAttribute("role","switch"),c.setAttribute("aria-checked",l?"true":"false"),c.setAttribute("aria-label",`${s(l?"\u5173\u95ED":"\u5F00\u542F")} ${e.name}`),c.dataset.skillId=e.id,c.disabled=!!g||r,c.append(d("span","sk-thumb")),c.addEventListener("click",()=>{c.disabled||tn(e,!l)}),l?o.textContent=r?s("\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6"):e.advertised?s("\u6A21\u578B\u53EF\u89C1"):s("\u6A21\u578B\u4E0D\u53EF\u89C1"):o.textContent=s(r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5165\u53E3\u5DF2\u5173\u95ED"),n.append(c),en(n,e),t.append(o,n),t},Gi=(e,t=0)=>{let o=d("article","sk-skill");o.dataset.state=e.state,o.setAttribute("role","listitem");let n=d("div","sk-skill-main"),r=d("div","sk-skill-head");if(t>0){let h=d("span","sk-step",String(t));h.title=s("\u7B2C {step} \u6B65",{step:t}),h.setAttribute("aria-label",s("\u7B2C {step} \u6B65",{step:t})),r.append(h)}let l=Me==="translated"?st(e):null;r.append(d("strong","sk-name",l?.nameZh||e.name),Si(gi(e),_i(e)));let c=d("div","sk-meta");l&&c.append(d("span","sk-original-name",e.name)),c.append(d("code","sk-id",e.id)),e.estimatedTokens>0&&c.append(d("span","sk-token",s("~{tokens} tok",{tokens:e.estimatedTokens.toLocaleString(qe.locale)})));let p=l?.descriptionZh||e.description,E=p||s("\u65E0 description\uFF0C\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002"),f=d("p","sk-desc",E),A=$t.has(e.id);if(A&&f.classList.add("is-expanded"),n.append(r,c,f),p.length>88||p.includes(`
`)){let h=d("button","sk-desc-toggle",s(A?"\u6536\u8D77\u8BF4\u660E":"\u5C55\u5F00\u8BF4\u660E"));h.type="button",h.setAttribute("aria-expanded",A?"true":"false"),h.addEventListener("click",()=>{let O=!$t.has(e.id);O?$t.add(e.id):$t.delete(e.id),f.classList.toggle("is-expanded",O),h.textContent=s(O?"\u6536\u8D77\u8BF4\u660E":"\u5C55\u5F00\u8BF4\u660E"),h.setAttribute("aria-expanded",O?"true":"false")}),n.append(h)}if(e.warnings.length>0){let h=d("p","sk-warn",e.warnings.slice(0,2).map(O=>De(O)??O).join(" \xB7 "));n.append(h)}return o.append(n,Di(e)),o},Hi=()=>{mt="",_t="all",Qt="default",us.update({value:"",placeholder:s("\u641C\u7D22\u540D\u79F0\u3001\u63CF\u8FF0\u6216 ID\uFF08\u6309 / \u805A\u7126\uFF09")}),Sn(),Es.update({value:"all",options:_n()}),ms.update({value:"default",options:gn()}),St()},St=()=>{if(pt.replaceChildren(),!_)return;let e=ee?H.find(n=>n.id===ee):null,t=e?e.skillIds.map(n=>_?.skills.find(r=>r.id===n)).filter(n=>!!n):_.skills,o=vr(t,{query:mt,stateFilter:_t,sortMode:Qt,getTranslation:st});if(o.length===0){let n=mt.trim().length>0||_t!=="all",r=d("div","sk-empty");if(r.append(d("h2","",_.skills.length===0?s("\u6CA1\u6709\u53D1\u73B0\u6280\u80FD"):e&&t.length===0?s("\u8FD9\u4E2A\u5206\u7EC4\u6CA1\u6709\u53EF\u7528\u6280\u80FD"):s("\u6CA1\u6709\u5339\u914D\u7684\u6280\u80FD")),d("p","",_.skills.length===0?s("\u68C0\u67E5 ~/.config/opencode/skills \u662F\u5426\u5B58\u5728\uFF0C\u6216\u91CD\u65B0\u626B\u63CF\u3002"):e&&t.length===0?s("\u68C0\u67E5\u5206\u7EC4\u91CC\u7684\u6280\u80FD\u662F\u5426\u88AB\u79FB\u9664\u3002"):s("\u6362\u4E00\u4E2A\u641C\u7D22\u8BCD\u6216\u8C03\u6574\u72B6\u6001\u7B5B\u9009\u6761\u4EF6\u3002"))),_.skills.length>0&&n){let l=d("div","sk-empty-actions");l.append(F(s("\u91CD\u7F6E\u7B5B\u9009"),Hi)),r.append(l)}pt.append(r);return}for(let n of o){let r=e&&e.skillIds.length>1?e.skillIds.indexOf(n.id)+1:0;pt.append(Gi(n,r))}},Vi=()=>{let e=_?_.root.error?1:_.summary.blockingConflicts>0?_.summary.blockingConflicts:null:null;e!==Gr&&(Gr=e,pe.setBadge(e).catch(()=>{}))},S=()=>{gt.setAttribute("aria-busy",me?"true":"false"),Vi(),ki(),xi(),_s(),Oi(),Ui(),Mi(),Ni(),Ti(),St(),ui.update({label:s(me?"\u8BFB\u53D6\u4E2D\u2026":"\u91CD\u65B0\u626B\u63CF"),loading:me,disabled:me||!!g});let e=$e();ts.update({disabled:me||!!g||!_||e}),os.update({disabled:me||!!g||!_||e})},Xi=e=>{Array.from(document.querySelectorAll("[data-skill-id]")).find(o=>o.dataset.skillId===e)?.focus()},ht=async(e=!1,t=!1)=>{if(!me){me=!0,t||(ze=null),e&&S();try{_=Ze(await ke("GET","/skills")),ze=null}catch(o){t||(ze=oe(o))}finally{me=!1,S()}}},Tn=async()=>{try{Ke=Zr(await ke("POST","/translations",Ke)),Q=null}catch(e){Q=oe(e)}},$i=e=>{let t=new Map;try{let o=JSON.parse(e);if(!Array.isArray(o))return t;for(let n of o){if(!n||typeof n!="object")continue;let r=n;typeof r.id=="string"&&typeof r.name=="string"&&typeof r.description=="string"&&t.set(r.id,{name:r.name,description:r.description})}}catch{}return t},Ss=async e=>{if(e.request.system!==Vt)return;if(!e.ok){Ae||(Q=e.error,y={text:e.error,tone:"error"},S());return}if(!_){ut.length<8&&ut.push(e);return}let t=$i(e.request.prompt),o=Xt(e.result.text),n=!1;for(let r of o){let l=_.skills.find(p=>p.id===r.id);if(!l)continue;let c=t.get(l.id);c&&(c.name!==l.name||c.description!==l.description)||(Ke.entries[l.id]={hash:l.contentHash,nameZh:r.nameZh,descriptionZh:r.descriptionZh,updatedAt:Date.now()},n=!0)}n&&(rt||(Me="translated",rt=!0),await Tn(),Ae||(y=Q?{text:s("\u7FFB\u8BD1\u5DF2\u8865\u5168\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}",{error:Q}),tone:"warning"}:{text:s("\u4E0A\u6B21\u672A\u5B8C\u6210\u7684\u7FFB\u8BD1\u5DF2\u8865\u5168\u3002"),tone:"success"}),S())},hs=async()=>{if(!_||Ae)return;let e=_.skills.filter(r=>!st(r));if(e.length===0){y={text:s("\u4E2D\u6587\u8BF4\u660E\u5DF2\u662F\u6700\u65B0\u3002"),tone:"success"},S();return}Ae=!0,Q=null,Ge={done:0,total:e.length},y=null,S();let t=0,o=0,n=!1;try{for(let r=0;r<e.length;r+=4){let l=e.slice(r,r+4),c=l;for(let p=0;p<2&&c.length>0;p+=1){let E=await pe.generate({prompt:Jo(c.map(h=>({id:h.id,name:h.name,description:h.description}))),system:Vt,maxOutputTokens:2048}),f=Xt(E.text),A=new Set;for(let h of f){let O=c.find(L=>L.id===h.id);O&&(Ke.entries[O.id]={hash:O.contentHash,nameZh:h.nameZh,descriptionZh:h.descriptionZh,updatedAt:Date.now()},A.add(O.id))}c=c.filter(h=>!A.has(h.id))}o+=c.length,t+=l.length-c.length,Ge={done:t,total:e.length},await Tn(),S()}}catch(r){n=!0,Q=oe(r),y={text:Q,tone:"error"}}finally{Ae=!1,n||(Q?y={text:s("\u7FFB\u8BD1\u5B8C\u6210\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}",{error:Q}),tone:"warning"}:o>0?y={text:s("\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\uFF0C{failed} \u4E2A\u5931\u8D25\uFF1B\u53EF\u518D\u70B9\u201C\u7FFB\u8BD1\u201D\u91CD\u8BD5\u3002",{done:t,failed:o}),tone:"warning"}:y={text:s("\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\u3002",{done:t}),tone:"success"}),S()}},Bi=async e=>{if(!(!_||Ae||g)){Ae=!0,Q=null,Ge={done:0,total:1},y={text:s("\u6B63\u5728\u91CD\u8BD1\u300C{name}\u300D\u2026",{name:e.name}),tone:"info"},S();try{let t=await pe.generate({prompt:Jo([{id:e.id,name:e.name,description:e.description}]),system:Vt,maxOutputTokens:1024}),o=Xt(t.text),n=o.find(r=>r.id===e.id)??(o.length===1?o[0]:null);if(!n)y={text:s("\u672A\u80FD\u89E3\u6790\u300C{name}\u300D\u7684\u7FFB\u8BD1\u7ED3\u679C\uFF0C\u8BF7\u91CD\u8BD5\u3002",{name:e.name}),tone:"warning"};else if(Ke.entries[e.id]={hash:e.contentHash,nameZh:n.nameZh,descriptionZh:n.descriptionZh,updatedAt:Date.now()},Me="translated",rt=!0,await Tn(),Q)y={text:s("\u7FFB\u8BD1\u5B8C\u6210\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}",{error:Q}),tone:"warning"};else{let r=s("\u5DF2\u66F4\u65B0\u300C{name}\u300D\u7684\u4E2D\u6587\u8BD1\u6587\u3002",{name:e.name});y={text:r,tone:"success"},pe.toast({kind:"success",message:r}).catch(()=>{})}}catch(t){Q=oe(t),y={text:Q,tone:"error"}}finally{Ae=!1,Ge={done:1,total:1},S()}}},Wt=async(e=!1)=>{if(!(He&&!e||x)){He=!0,S();try{H=qt(await ke("GET","/groups")),ye=null,ee&&!H.some(t=>t.id===ee)&&(ee=null)}catch(t){ye=pi(t)}finally{He=!1,S()}}},cn=async(e=!1)=>{if(me)return;me=!0,e&&S();let[t,o]=await Promise.allSettled([ke("GET","/skills"),ke("GET","/translations")]);if(t.status==="fulfilled")try{_=Ze(t.value),ze=null}catch(n){ze=oe(n)}else ze=oe(t.reason);if(o.status==="fulfilled")try{Ke=Zr(o.value),Q=null,!rt&&Object.keys(Ke.entries).length>0&&(Me="translated")}catch(n){Q=oe(n)}else Q=oe(o.reason);if(me=!1,S(),_&&ut.length>0){let n=ut;ut=[];for(let r of n)Ss(r)}},tn=async(e,t)=>{if(!g){g=`toggle:${e.id}`,_e=null,ae=null,y=null,S();try{_=Ze(await ke("POST","/skills/toggle",{id:e.id,enabled:t})),y={text:t?s("\u5DF2\u542F\u7528 {name}\u3002",{name:e.name}):s("\u5DF2\u5173\u95ED {name}\uFF1BOpenCode \u4E0B\u4E00\u6B21\u626B\u63CF\u540E\u4E0D\u518D\u53D1\u73B0\u5B83\u3002",{name:e.name}),tone:"success"},pe.toast({kind:"success",message:t?s("\u5DF2\u542F\u7528 {name}",{name:e.name}):s("\u5DF2\u5173\u95ED {name}",{name:e.name})}).catch(()=>{})}catch(o){y={text:oe(o),tone:"error"},g=null,S(),ht(!1,!0);return}g=null,S(),Xi(e.id)}},Kr=async(e,t)=>{if(g)return;let o=e.activePath??e.disabledPath;if(o){g=`resolve:${o}`,y=null,S();try{let n=await ke("POST","/skills/resolve",{path:o,keep:t}),r=n&&typeof n=="object"&&typeof n.backupPath=="string"?n.backupPath:null;_=Ze(n),y={text:t==="enabled"?s("\u5DF2\u4FDD\u7559\u542F\u7528\u5165\u53E3{suffix}\u3002",{suffix:r?s("\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A {path}",{path:r}):""}):s("\u5DF2\u4FDD\u7559\u5173\u95ED\u5165\u53E3{suffix}\u3002",{suffix:r?s("\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A {path}",{path:r}):""}),tone:"success"},pe.toast({kind:"success",message:s("\u5165\u53E3\u51B2\u7A81\u5DF2\u5904\u7406")}).catch(()=>{})}catch(n){y={text:oe(n),tone:"error"},g=null,S(),ht(!1,!0);return}g=null,S()}},Ts=e=>{!_||g||(_e=e,ae=null,y=null,S(),Te.scrollIntoView({block:"nearest"}),Te.querySelector("button")?.focus())},Fi=async()=>{if(_e===null||g)return;let e=_e;_e=null,ae=null,g="bulk",y=null,S();try{let t=await ke("POST","/skills/bulk",{enabled:e}),o=t&&typeof t=="object"&&Array.isArray(t.changed)?t.changed.filter(n=>typeof n=="string"):[];_=Ze(t),y={text:e?s("\u5DF2\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002",{count:o.length}):s("\u5DF2\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002",{count:o.length}),tone:"success"},pe.toast({kind:"success",message:e?s("\u5DF2\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002",{count:o.length}):s("\u5DF2\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002",{count:o.length})}).catch(()=>{})}catch(t){y={text:oe(t),tone:"error"},g=null,S(),ht(!1,!0);return}g=null,S()},jr=()=>{gt.setAttribute("aria-label",s("\u6280\u80FD\u5F00\u5173")),es.textContent=s("\u6280\u80FD\u5F00\u5173"),Zt.setAttribute("aria-label",s("\u6280\u80FD\u8BF4\u660E\u8BED\u8A00")),ts.update({label:s("\u5168\u90E8\u542F\u7528")}),os.update({label:s("\u5168\u90E8\u5173\u95ED")}),us.update({value:mt,placeholder:s("\u641C\u7D22\u540D\u79F0\u3001\u63CF\u8FF0\u6216 ID\uFF08\u6309 / \u805A\u7126\uFF09")}),Sn(),Es.update({value:_t,options:_n()}),Ft?.setAttribute("aria-label",s("\u72B6\u6001\u7B5B\u9009")),ms.update({value:Qt,options:gn()}),zt?.setAttribute("aria-label",s("\u6392\u5E8F\u65B9\u5F0F")),ds.textContent=s("\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002"),ps.textContent=s("\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002"),Kt?.setAttribute("aria-label",s("\u5206\u7EC4\u7B5B\u9009")),ve.textContent=s(x?"\u5173\u95ED\u7F16\u8F91":"\u7F16\u8F91\u5206\u7EC4"),ve.setAttribute("aria-pressed",x?"true":"false"),S()};pe.onLateGenerateResult(e=>{Ss(e)});pe.onReady(e=>{Uo(e,document.documentElement);let t=qe.setLocale(e.locale);if(Zo(qe),document.title=s("\u6280\u80FD\u5F00\u5173"),Hr){if(!t){S();return}y=null,re=null,jr(),cn(!0),Wt(!0);return}Hr=!0,t&&jr(),cn(!0),Wt(!0)});document.title=s("\u6280\u80FD\u5F00\u5173");S();})();
