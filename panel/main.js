"use strict";(()=>{var x="openchamber.sdk";var Ke="data-oc-scrolling",St=`
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
:hover, [${Ke}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${Ke}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${Ke}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${Ke}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Tt(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let r=new WeakMap;e.addEventListener("scroll",s=>{let i=s.target===e?t:s.target;if(!(i instanceof Element))return;i.hasAttribute("data-oc-scrolling")||i.setAttribute("data-oc-scrolling","");let c=r.get(i);c!==void 0&&clearTimeout(c),r.set(i,setTimeout(()=>{r.delete(i),i.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Fr=`(${Tt.toString()})(document);`;var Io=/^[a-z][a-z0-9-]{0,39}$/;var Oo=e=>Object(e)===e&&!Array.isArray(e),yt=(e,t)=>Object.keys(e).every(r=>t.includes(r)),Ro=e=>String(e)===e&&e.length>=1&&e.length<=60,Co=e=>String(e)===e&&e.length>=1&&e.length<=80,Uo=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let r of e){if(!Oo(r)||!Io.test(r.id)||!Ro(r.label)||r.disabled!==void 0&&r.disabled!==!0&&r.disabled!==!1||t.has(r.id))return!1;if(t.add(r.id),r.kind==="button"){if(!yt(r,["kind","id","label","disabled"]))return!1;continue}if(r.kind!=="select"||!yt(r,["kind","id","label","value","options","disabled"])||!Co(r.value)||!Array.isArray(r.options)||r.options.length<1||r.options.length>16)return!1;let s=new Set;for(let i of r.options){if(!Oo(i)||!yt(i,["value","label"])||!Co(i.value)||!Ro(i.label)||s.has(i.value))return!1;s.add(i.value)}if(!s.has(r.value))return!1}return!0};var At=e=>"bytes"in e?e.bytes.byteLength:e.content.length,Mo=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let r=0;r<e.bytes.byteLength;r+=1)if(e.bytes[r]!==t.bytes[r])return!1;return!0};var Lo=/^[A-Za-z0-9_-]{1,80}$/;var Go=["left","right","top","bottom"];var Po=(e,t=0,r={remaining:16e3})=>{if(--r.remaining<0||t>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of s)if(!Po(i,t+1,r))return!1;return!0},vt=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(vt);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(vt)}return String(e)===e||Number.isFinite(e)},wt=e=>{try{return String(e.id)!==e.id||!Lo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Go.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Po(e.data)||!vt(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var $o=["file","directory","other","missing"],Rt=e=>!!(e&&"sessionId"in e),Ct=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Ho=/^[0-9a-f]{7,64}$/i,It=e=>Ho.test(e),Je=500,We=32e3,Do=16e3,Fo=128,Xo=200,Bo=2e3,zo=16e3,Vo=80,jo=200,Ko=16e3;var Jo=2e3;var Ut=2e4,Ye=1024,Ze=2e6;var qe=64e3,Qe=8e3,Mt=4e3;var Lt=96e4,Xr=60*6e4;var Wo=999,Yo=1e4,Ue=500,Zo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],qo=["stopped","starting","ready","failed"],Br=new Set(Zo),Qo=e=>Br.has(e),er=e=>e&&Qo(e)?e:"HOST_REJECTED",ke=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(ke):Object(e)===e?Object.values(e).every(ke):!1,tr=e=>ke(e)&&JSON.stringify(e).length<=Ko,No=e=>e?.trim().slice(0,jo)??"",xe=e=>{let t=e.id.trim().slice(0,Fo),r=e.title.trim().slice(0,Xo),s=e.url.trim().slice(0,Bo),i=e.text?.trim().slice(0,zo),c=e.author?.trim().slice(0,Vo),l=e.kind==="pull"?"pull":"issue",g={providerId:e.providerId.trim(),id:t,title:r||t,url:s,kind:l};if(i&&(g.text=i),c&&(g.author=c),l==="pull"){let k=No(e.branches?.head),y=No(e.branches?.base);k&&y&&(g.branches={head:k,base:y})}return tr(e.data)&&(g.data=e.data),g},Gt=e=>{let t=xe(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},Pt=e=>{let t={text:e.text.trim().slice(0,Do)};return e.send&&(t.send=!0),t},Nt=e=>e===null||!Number.isFinite(e)?null:Math.min(Wo,Math.max(0,Math.round(e))),$t=e=>Number.isFinite(e)?Math.min(Yo,Math.max(0,Math.ceil(e))):0;var be=e=>e.length>0&&e.length<=Ye&&!e.includes("\0")&&!e.includes("\\");var et=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Jo?!1:!e.split("/").some(r=>r==="."||r===".."),zr=new Set(qo),Ht=e=>!!(e&&"status"in e&&zr.has(String(e.status))&&!("body"in e)),tt=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Dt=e=>!!(e&&"content"in e&&String(e.content)===e.content),Ft=e=>!!(e&&"written"in e&&e.written===!0),Xt=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),Vr=new Set($o),Bt=e=>!!(e&&"kind"in e&&"size"in e&&Vr.has(String(e.kind))&&Number.isFinite(e.size)),zt=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),jr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Kr=e=>Object(e)===e?e:null,Ot=e=>String(e)===e&&e.length>0,Jr=e=>{if(!Ot(e.id))return null;if(e.ok===!0){let t={channel:x,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&Ot(e.error)?{channel:x,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:er(Ot(e.code)?e.code:void 0)}:null},Vt=e=>{let t=Kr(e);return!t||t.channel!==x||t.v!==1?null:t.type==="result"?Jr(t):!jr.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var or=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Wr=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",u=class extends Error{code;constructor(t,r){super(r),this.name="HostRequestError",this.code=t}},rr=()=>Promise.reject(new u("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),ot=()=>Promise.reject(new u("BAD_PATH",`File path must be 1 to ${Ye} characters without NUL or backslash.`)),rt=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new u("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},h=e=>(e.value+=1,`oc-${e.value}`),Yt=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new u("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let r=e.acceptSource??(o=>o===t.parent),s=e.requestTimeoutMs??Ut,i=new Set,c=new Set,l=new Set,g=new Set,k=new Set,y=new Set,K=new Set,v=new Set,J=new Set,se=new Set,gt=[],ve=null,we=null,Xe=new Set,Be=new Set,Oe=null,Re=null,kt=!1,Ee=new Map,he=new Map,ge=new Map,q=!1,E={value:0},m=null,te=null,Ce=!1,Ie=!1,ho=null,go=o=>o?{sessionId:o.id,phase:o.busy?"started":"completed"}:null,F=o=>{t.parent.postMessage(o,"*")},ko=()=>{q||t.parent===t||se.size===0||m?.features?.lateGenerateResults!==!0||F({channel:x,v:1,type:"generate-late-listen"})},C=(o,n)=>{for(let d of o)try{d(n)}catch(p){console.error(p)}},xo=o=>{if(!(o instanceof MessageEvent)||!r(o.source))return;let n=Vt(o.data);if(!n)return;if(n.type==="workspace"){let p=he.get(n.payload.subscriptionId);p&&C([p],n.payload.snapshot);return}if(n.type==="shells"){let p=ge.get(n.payload.subscriptionId);p&&C([p],n.payload.snapshot);return}if(n.type==="ready"){m=n.payload,te=go(n.payload.session),C(i,n.payload),C(c,n.payload.directory),C(l,n.payload.session),te&&C(g,te),C(k,n.payload.connection),C(y,n.payload.settings),C(K,n.payload.item),ko();return}if(n.type==="generate-late"){se.size===0?gt.push(n.payload):C(se,n.payload);return}if(n.type==="directory"){m&&(m={...m,directory:n.payload.directory}),C(c,n.payload.directory);return}if(n.type==="session"){m&&(m={...m,session:n.payload.session}),n.payload.session?te?.sessionId!==n.payload.session.id&&(te=go(n.payload.session)):te=null,C(l,n.payload.session);return}if(n.type==="session-lifecycle"){te=n.payload,C(g,n.payload);return}if(n.type==="connection"){m&&(m={...m,connection:n.payload.connection}),C(k,n.payload.connection);return}if(n.type==="settings"){m&&(m={...m,settings:n.payload.settings}),C(y,n.payload.settings);return}if(n.type==="item"){m&&(m={...m,item:n.payload.item}),C(K,n.payload.item);return}if(n.type==="status-control-event"){C(v,n.payload);return}if(n.type==="popover-closed"){C(J,n.payload);return}if(n.type==="action"){let p=A=>{q||F({channel:x,v:1,type:"action-result",id:n.id,payload:A})},w=we;if(!w){p({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>w(n.payload)).then(()=>p({ok:!0}),A=>{let L=(A instanceof Error?A.message:String(A)).trim();p({ok:!1,error:(L||"Action failed.").slice(0,Ue)})});return}if(n.type==="file-open"){let p=n.payload;if(Re&&Mo(Re,p))return;Re=p,C(Xe,n.payload);return}if(n.type==="file-saved"){C(Be,n.payload.version);return}if(n.type==="file-snapshot"){let p=L=>{q||F({channel:x,v:1,type:"file-snapshot-result",id:n.id,payload:L})},w=L=>p({error:(L.trim()||"Could not read the edited file.").slice(0,Ue)}),A=Oe;if(!A){w("This extension does not edit files.");return}Promise.resolve().then(()=>A(n.payload.purpose)).then(L=>{if(At(L)>2e7){w(`The file is over ${2e7} ${"bytes"in L?"bytes":"characters"}.`);return}if(L.version.length>256){w(`The snapshot version is over ${256} characters.`);return}p({snapshot:"bytes"in L?{bytes:L.bytes,version:L.version}:{content:L.content,version:L.version}})},L=>w(L instanceof Error?L.message:String(L)));return}if(n.type==="resolve"){let p=A=>{F({channel:x,v:1,type:"resolve-result",id:n.id,payload:A})},w=ve;if(!w){p({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>w(n.payload)).then(A=>p({item:A?xe(A):null}),A=>{let L=(A instanceof Error?A.message:String(A)).trim();p({error:(L||"Command failed.").slice(0,Ue)})});return}let d=Ee.get(n.id);if(d){if(clearTimeout(d.timer),Ee.delete(n.id),n.ok){d.resolve(n.payload);return}d.reject(new u(n.code,n.error))}};t.addEventListener("message",xo),F({channel:x,v:1,type:"hello"});let $=(o,n=s)=>q||t.parent===t?Promise.reject(new u("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((d,p)=>{let w=setTimeout(()=>{Ee.delete(o.id),p(new u("HOST_TIMEOUT","Host did not answer in time."))},n);Ee.set(o.id,{resolve:d,reject:p,timer:w}),F(o)}),U=o=>$(o).then(()=>{}),M={channel:x,v:1},xt=o=>{!q&&t.parent!==t&&F(o)},bo=()=>xt({...M,type:"file-save"}),_o=o=>{!or(o)||!Wr(o)||(o.preventDefault(),bo())},So=o=>{!or(o)||o.key!=="Escape"||m?.surface!=="popover"||!m.popover||(o.preventDefault(),vo(m.popover.id,"escape").catch(()=>{}))},ze=()=>{let o=m?.surface==="popover"?m.popover:void 0;if(!o)return;let n=Ce||Ie;ho!==n&&(ho=n,wo(o.id,n).catch(()=>{}))},Ve=()=>{m?.surface!=="popover"||Ce||(Ce=!0,ze())},To=o=>{m?.surface!=="popover"||o.relatedTarget!==null||!Ce||(Ce=!1,ze())},yo=()=>{m?.surface!=="popover"||Ie||(Ie=!0,ze())},Ao=()=>{m?.surface!=="popover"||!Ie||(Ie=!1,ze())},W=(o,n=1024)=>{if(!o.trim()||o.length>n)throw new u("HOST_REJECTED",`Identity must contain 1 to ${n} characters.`)},bt=async o=>{o.kind!=="projects"&&W(o.projectId);let n=await $({...M,type:"workspace-read",id:h(E),payload:o});if(!n||!("kind"in n)||!("state"in n)||n.kind!==o.kind)throw new u("HOST_REJECTED","Host did not return workspace data.");return n},_t=async(o,n)=>{o.kind!=="projects"&&W(o.projectId);let d=h(E);he.set(d,n);try{await U({...M,type:"workspace-subscribe",id:h(E),payload:{subscriptionId:d,query:o}})}catch(p){throw he.delete(d),q||F({...M,type:"workspace-unsubscribe",id:h(E),payload:{subscriptionId:d}}),p}return()=>{!he.delete(d)||q||F({...M,type:"workspace-unsubscribe",id:h(E),payload:{subscriptionId:d}})}},Dr=async(o,n)=>{o.kind==="session"&&W(o.sessionId),o.kind==="project"&&W(o.projectId);let d=h(E);ge.set(d,n);try{await U({...M,type:"shells-subscribe",id:h(E),payload:{subscriptionId:d,scope:o}})}catch(p){throw ge.delete(d),q||F({...M,type:"shells-unsubscribe",id:h(E),payload:{subscriptionId:d}}),p}return()=>{!ge.delete(d)||q||F({...M,type:"shells-unsubscribe",id:h(E),payload:{subscriptionId:d}})}},je=async o=>{if("key"in o&&(o.key.length===0||o.key.length>128))throw new u("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(o.op==="set"&&!ke(o.value))throw new u("HOST_REJECTED","Storage values must be JSON.");if(o.op==="set"&&new TextEncoder().encode(JSON.stringify(o.value)).length>65536)throw new u("HOST_REJECTED","Storage value exceeds 64 KiB.");if(o.scope==="device"&&m?.features?.deviceStorage!==!0)throw new u("UNSUPPORTED","This host does not support device storage.");let n=await $({...M,type:"storage",id:h(E),payload:o});if(!n||!("storage"in n)||n.op!==o.op)throw new u("HOST_REJECTED","Host did not return storage data.");return n},vo=(o,n)=>m?.features?.popovers!==!0&&!(m?.surface==="popover"&&m.popover?.id===o)?Promise.reject(new u("UNSUPPORTED","This host does not support popovers.")):U({...M,type:"popover-close",id:h(E),payload:n?{id:o,reason:n}:{id:o}}),wo=(o,n)=>m?.features?.popovers!==!0&&!(m?.surface==="popover"&&m.popover?.id===o)?Promise.reject(new u("UNSUPPORTED","This host does not support popovers.")):U({...M,type:"popover-anchor",id:h(E),payload:{id:o,active:n}});return t.addEventListener("keydown",So,!0),t.addEventListener("pointerover",Ve),t.addEventListener("pointermove",Ve),t.addEventListener("pointerout",To),t.addEventListener("focus",yo),t.addEventListener("blur",Ao),{onAction:o=>(we=o,()=>{we===o&&(we=null)}),listProjects:async()=>{let o=await bt({kind:"projects"});if(o.kind!=="projects")throw new u("HOST_REJECTED","Expected projects.");return o},listWorktrees:async o=>{let n=await bt({kind:"worktrees",projectId:o});if(n.kind!=="worktrees")throw new u("HOST_REJECTED","Expected worktrees.");return n},listSessions:async o=>{let n=await bt({kind:"sessions",projectId:o});if(n.kind!=="sessions")throw new u("HOST_REJECTED","Expected sessions.");return n},onProjects:o=>_t({kind:"projects"},n=>{n.kind==="projects"&&o(n)}),onWorktrees:(o,n)=>_t({kind:"worktrees",projectId:o},d=>{d.kind==="worktrees"&&n(d)}),onSessions:(o,n)=>_t({kind:"sessions",projectId:o},d=>{d.kind==="sessions"&&n(d)}),onRunningShells:(o,n)=>Dr(o,n),readShellOutput:async(o,n)=>{W(o,128);let d=n?.cursor;if(d!==void 0&&(!Number.isInteger(d)||d<0))throw new u("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let p=n?.tailBytes;if(p!==void 0&&(!Number.isInteger(p)||p<1||p>65536))throw new u("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let A=await $({...M,type:"shell-output",id:h(E),payload:{shellId:o,cursor:d,tailBytes:p}});if(!A||typeof A.output!="string"||!Number.isFinite(A.cursor))throw new u("HOST_REJECTED","Host did not return shell output.");return A},stopShell:async o=>{if(W(o,128),(await $({...M,type:"shell-stop",id:h(E),payload:{shellId:o}}))?.stopped!==!0)throw new u("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async o=>{W(o),await U({...M,type:"open-session",id:h(E),payload:{sessionId:o}})},storage:{get:async(o,n)=>{let d=rt(n),p={op:"get",key:o};d&&(p.scope=d);let w=await je(p);return w.op==="get"&&w.found?w.value:void 0},set:async(o,n,d)=>{let p=rt(d),w={op:"set",key:o,value:n};p&&(w.scope=p),await je(w)},delete:async(o,n)=>{let d=rt(n),p={op:"delete",key:o};d&&(p.scope=d),await je(p)},keys:async o=>{let n=rt(o),d={op:"keys"};n&&(d.scope=n);let p=await je(d);if(p.op!=="keys")throw new u("HOST_REJECTED","Expected storage keys.");return p.keys}},onReady:o=>(i.add(o),m&&o(m),()=>{i.delete(o)}),onDirectory:o=>(c.add(o),m&&o(m.directory),()=>{c.delete(o)}),onSession:o=>(l.add(o),m&&o(m.session),()=>{l.delete(o)}),onSessionLifecycle:o=>(g.add(o),te&&o(te),()=>{g.delete(o)}),onConnection:o=>(k.add(o),m&&o(m.connection),()=>{k.delete(o)}),onSettings:o=>(y.add(o),m&&o(m.settings),()=>{y.delete(o)}),onItem:o=>(K.add(o),m&&o(m.item),()=>{K.delete(o)}),onStatusControl:o=>(v.add(o),()=>{v.delete(o)}),onPopoverClosed:o=>(J.add(o),()=>{J.delete(o)}),setStatusControls:o=>m?.features?.statusControls!==!0?Promise.reject(new u("UNSUPPORTED","This host does not support status controls.")):Uo(o)?U({...M,type:"status-controls",id:h(E),payload:{controls:o}}):Promise.reject(new u("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:o=>m?.features?.popovers!==!0?Promise.reject(new u("UNSUPPORTED","This host does not support popovers.")):wt(o)?U({...M,type:"popover-open",id:h(E),payload:o}):Promise.reject(new u("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:vo,setPopoverAnchorActive:wo,onResolve:o=>(ve=o,()=>{ve===o&&(ve=null)}),toast:o=>{let n=o.message.trim();return!n||n.length>Je?Promise.reject(new u("HOST_REJECTED",`Toast message must contain 1 to ${Je} characters.`)):o.copy&&o.copy!==!0&&(!o.copy.text.length||o.copy.text.length>We)?Promise.reject(new u("HOST_REJECTED",`Toast copy text must contain 1 to ${We} characters.`)):U({channel:x,v:1,type:"toast",id:h(E),payload:{...o,message:n}})},openUrl:o=>U({channel:x,v:1,type:"open-url",id:h(E),payload:{url:o}}),openCommit:o=>It(o)?U({channel:x,v:1,type:"open-commit",id:h(E),payload:{sha:o}}):Promise.reject(new u("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:o=>U({channel:x,v:1,type:"open-surface",id:h(E),payload:{surfaceId:o}}),writeClipboard:o=>U({channel:x,v:1,type:"clipboard-write",id:h(E),payload:{text:o}}),compose:o=>U({channel:x,v:1,type:"compose",id:h(E),payload:o}),attach:o=>U({channel:x,v:1,type:"attach",id:h(E),payload:xe(o)}),startSession:async o=>{o.projectId!==void 0&&W(o.projectId);let n=o.worktree;n&&n!==!0&&(n.kind==="existing"?W(n.directory):(n.name!==void 0&&W(n.name,200),n.baseBranch!==void 0&&W(n.baseBranch,200)));let d=await $({channel:x,v:1,type:"start-session",id:h(E),payload:Gt(o)},e.requestTimeoutMs??18e4);if(!Rt(d))throw new u("HOST_REJECTED","Host did not return a session.");return d},prompt:o=>$({channel:x,v:1,type:"prompt",id:h(E),payload:Pt(o)}).then(n=>{if(!Ct(n))throw new u("HOST_REJECTED","Host did not return a prompt result.");return n}),sessionLink:o=>U({channel:x,v:1,type:"session-link",id:h(E),payload:xe(o)}),close:()=>U({channel:x,v:1,type:"close",id:h(E)}),oauthStart:()=>U({channel:x,v:1,type:"oauth-start",id:h(E)}),oauthDisconnect:()=>U({channel:x,v:1,type:"oauth-disconnect",id:h(E)}),request:o=>(et(o.path)?$({channel:x,v:1,type:"request",id:h(E),payload:o}):rr()).then(n=>{if(!tt(n))throw new u("HOST_REJECTED","Host request result was empty.");return n}),serviceRequest:o=>(et(o.path)?$({channel:x,v:1,type:"service-request",id:h(E),payload:o}):rr()).then(n=>{if(!tt(n))throw new u("HOST_REJECTED","Host service request result was empty.");return n}),serviceStatus:()=>$({channel:x,v:1,type:"service-status",id:h(E)}).then(o=>{if(!Ht(o))throw new u("HOST_REJECTED","Host did not return service status.");return o}),readFile:o=>(be(o)?$({channel:x,v:1,type:"file-read",id:h(E),payload:{path:o}}):ot()).then(n=>{if(!Dt(n))throw new u("HOST_REJECTED","Host did not return file content.");return n}),writeFile:(o,n)=>be(o)?n.length>Ze?Promise.reject(new u("FILE_TOO_LARGE",`Content is over ${Ze} characters.`)):$({channel:x,v:1,type:"file-write",id:h(E),payload:{path:o,content:n}}).then(d=>{if(!Ft(d))throw new u("HOST_REJECTED","Host did not confirm the write.");return d}):ot(),listDir:o=>(be(o)?$({channel:x,v:1,type:"file-list",id:h(E),payload:{path:o}}):ot()).then(n=>{if(!Xt(n))throw new u("HOST_REJECTED","Host did not return directory entries.");return n}),stat:o=>(be(o)?$({channel:x,v:1,type:"file-stat",id:h(E),payload:{path:o}}):ot()).then(n=>{if(!Bt(n))throw new u("HOST_REJECTED","Host did not return file status.");return n}),generate:o=>{let n=o.prompt.trim(),d=o.system?.trim();if(n.length===0||n.length>qe)return Promise.reject(new u("HOST_REJECTED",`Prompt must be 1 to ${qe} characters.`));if(d!==void 0&&(d.length===0||d.length>Qe))return Promise.reject(new u("HOST_REJECTED",`System prompt must be 1 to ${Qe} characters.`));let p=o.maxOutputTokens===void 0?void 0:Math.min(Mt,Math.max(1,Math.floor(o.maxOutputTokens)));if(p!==void 0&&!Number.isFinite(p))return Promise.reject(new u("HOST_REJECTED","maxOutputTokens must be a number."));let w={prompt:n};return d!==void 0&&(w.system=d),p!==void 0&&(w.maxOutputTokens=p),$({channel:x,v:1,type:"generate",id:h(E),payload:w},e.requestTimeoutMs??Lt).then(A=>{if(!zt(A))throw new u("HOST_REJECTED","Host did not return generated text.");return A})},onLateGenerateResult:o=>{se.add(o);for(let n of gt.splice(0))C([o],n);return ko(),()=>{se.delete(o)}},setBadge:o=>U({channel:x,v:1,type:"badge",id:h(E),payload:{count:Nt(o)}}),setHeight:o=>U({channel:x,v:1,type:"resize",id:h(E),payload:{height:$t(o)}}),onFileOpen:o=>(Xe.add(o),kt||(kt=!0,t.addEventListener("keydown",_o,!0)),Re&&o(Re),()=>{Xe.delete(o)}),onFileSnapshot:o=>(Oe=o,()=>{Oe===o&&(Oe=null)}),onFileSaved:o=>(Be.add(o),()=>{Be.delete(o)}),reportFileChange:o=>xt({...M,type:"file-change",payload:{dirty:o.dirty,edited:o.edited}}),requestFileSave:bo,reportFileUnsupported:()=>xt({...M,type:"file-unsupported"}),dispose:()=>{for(let o of he.keys())F({...M,type:"workspace-unsubscribe",id:h(E),payload:{subscriptionId:o}});he.clear();for(let o of ge.keys())F({...M,type:"shells-unsubscribe",id:h(E),payload:{subscriptionId:o}});ge.clear(),q=!0,ve=null,we=null,Oe=null,Xe.clear(),Be.clear(),kt&&t.removeEventListener("keydown",_o,!0),t.removeEventListener("message",xo),t.removeEventListener("keydown",So,!0),t.removeEventListener("pointerover",Ve),t.removeEventListener("pointermove",Ve),t.removeEventListener("pointerout",To),t.removeEventListener("focus",yo),t.removeEventListener("blur",Ao);for(let o of Ee.values())clearTimeout(o.timer),o.reject(new u("HOST_UNAVAILABLE","Host client was disposed."));Ee.clear(),i.clear(),c.clear(),l.clear(),g.clear(),k.clear(),y.clear(),K.clear(),v.clear(),J.clear(),se.clear(),gt.length=0}}};var ir=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var is=new Set(ir);var ar=["none","agent","user"];var cs=new Set(ar);var Yr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Zr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],cr=(e,t)=>{t.style.colorScheme=e.mode;for(let[r,s]of Yr)t.style.setProperty(r,e.tokens[s]);for(let[r,s,i]of Zr){let c=e.tokens[i]??"";t.style.setProperty(r,c),t.style.setProperty(s,c)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Zt=(e,t)=>{cr(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var qr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},R=(e,t)=>`var(--${e}, var(--oc-${qr[e]}, ${t}))`,re=R("surface-background","transparent"),st=R("surface-elevated","transparent"),_e=R("surface-elevated-foreground","inherit"),B=R("surface-foreground","inherit"),O=R("surface-muted-foreground","gray"),Qr=R("surface-muted","transparent"),ie=R("interactive-border","currentColor"),H=R("interactive-hover","transparent"),ue=R("interactive-active","transparent"),qt=R("interactive-selection","transparent"),Qt=R("interactive-selection-foreground","inherit"),oe=R("primary","currentColor"),eo=R("primary-text","inherit"),to=R("error-text","inherit"),en=R("font-sans","inherit"),oo=R("font-mono","monospace"),fr=R("radius","9px"),ro=`calc(${fr} - 2px)`,lr=`calc(${fr} - 4px)`,I=(e,t,r="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${r})`,dr=`background-image: linear-gradient(${H}, ${H});`,no=e=>`box-shadow: inset 0 0 0 1px ${e}, var(--oc-sdk-field-lift);`,so="box-shadow: inset 0 0 0 1px var(--oc-sdk-edge), var(--oc-sdk-raised-lift);",pr="box-shadow: var(--oc-sdk-lit);",ur=`inset 0 1px 0 0 ${I(B,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,tn=`
:root {
  --oc-sdk-edge: ${I(B,10)};
  --oc-sdk-field-bg: ${st};
  --oc-sdk-raised-bg: ${re};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 0 0 1px rgb(0 0 0 / 0.1), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${I(B,6)};
  --oc-sdk-field-bg: ${I(re,50,st)};
  --oc-sdk-raised-bg: ${st};
  --oc-sdk-field-lift: ${ur};
  --oc-sdk-raised-lift: ${ur};
  --oc-sdk-lit: inset 0 1px 0 0 ${I(B,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 0 0 1px rgb(0 0 0 / 0.36), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,nt=e=>{let t=R(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${R(`${e}-text`,"inherit")}; }`},on=`
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

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,mr=`${tn}
.oc-sdk { color: ${B}; font-family: ${en}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${dr} }
.oc-sdk-mono { font-family: ${oo}; }
.oc-sdk-muted { color: ${O}; }
${nt("success")}${nt("warning")}${nt("error")}${nt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${oe}; --oc-sdk-tone-text: ${eo}; }

.oc-sdk-btn { border-radius: ${ro}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${lr}; }
.oc-sdk-btn[data-variant="default"] { color: ${eo}; background: ${I(oe,10,re)}; border-color: ${I(oe,12)}; ${pr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${I(oe,16,re)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${I(oe,22,re)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Qr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ue}, ${ue}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${_e}; border-color: transparent; ${so} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ue}, ${ue}); box-shadow: inset 0 0 0 1px var(--oc-sdk-edge); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${H}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ue}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${R("status-error","red")}; color: ${to}; background: ${I("var(--oc-sdk-tone)",7,re)}; border-color: ${I("var(--oc-sdk-tone)",12)}; ${pr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${I("var(--oc-sdk-tone)",9,re)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${I("var(--oc-sdk-tone)",11,re)}; box-shadow: none; }

.oc-sdk-field-note { color: ${O}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${to}; }
.oc-sdk-input { border-radius: ${ro}; background: var(--oc-sdk-field-bg); color: ${_e}; ${no("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${O}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${no(I(B,26))} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${no(R("status-error","red"))} }
.oc-sdk-input[data-mono="true"] { font-family: ${oo}; }

.oc-sdk-search-icon { color: ${O}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${oe}; }
.oc-sdk-search-clear { border-radius: ${lr}; color: ${O}; }
.oc-sdk-search-clear:hover { background: ${H}; color: ${B}; }

.oc-sdk-trigger { border-color: transparent; border-radius: ${ro}; background: var(--oc-sdk-raised-bg); color: ${_e}; ${so} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ue}, ${ue}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${O}; }
.oc-sdk-trigger-chevron { color: ${O}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow, no border. */
.oc-sdk-popup { --surface-foreground: ${_e}; border-color: transparent; border-radius: 12px; background: ${st}; color: ${_e}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${H}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${qt}; color: ${Qt}; }
.oc-sdk-option-check { color: ${B}; }
.oc-sdk-option[data-destructive="true"] { color: ${to}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${I(R("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${O}; }
.oc-sdk-popup-empty { color: ${O}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${ie}; border-radius: 4px; color: ${B}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${I(B,60,ie)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${ie}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${re}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${oe}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${dr} }
.oc-sdk-check-desc { color: ${O}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${I(B,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${O}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${B}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Qt}; background: ${qt}; border-color: ${ie}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${_e}; background: var(--oc-sdk-raised-bg); border-color: transparent; ${so} }
.oc-sdk-tab-count { color: ${O}; }

.oc-sdk-badge { border-radius: 9999px; background: ${H}; color: ${O}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${I("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${H}; }
.oc-sdk-row[aria-selected="true"] { background: ${qt}; color: ${Qt}; }
.oc-sdk-row-lead { font-family: ${oo}; color: ${O}; }
.oc-sdk-row-sub { color: ${O}; }
.oc-sdk-row-meta { color: ${O}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${O}; }

.oc-sdk-empty-body { color: ${O}; }

.oc-sdk-spinner { color: ${O}; }
.oc-sdk-spinner-ring { border-color: ${ie}; border-top-color: ${oe}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${I("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${O}; }

.oc-sdk-separator { color: ${O}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${I(ie,40)}; }

.oc-sdk-progress-label { color: ${O}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${ie}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${oe}); }

.oc-sdk-text a { color: ${eo}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${I(ie,60)}; }
`,G=`
${St}
${on}
${mr}`;var Er="oc-sdk-ui-style";var P=e=>{let t=document.getElementById(Er);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}Tt(document);let r=document.createElement("style");r.id=Er,r.textContent=e,document.head.appendChild(r)},N=(e,t)=>{let r=document.createElement(e);return t&&(r.className=t),r},ae=e=>{let t=N("button",e);return t.type="button",t},Y=(e,t)=>{let r=t??"";e.textContent!==r&&(e.textContent=r)};var rn=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},ce=(e,t)=>{P(G);let r=t,s=ae("oc-sdk oc-sdk-btn"),i=rn(),c=document.createElement("span");s.append(c),e.append(s);let l=()=>{s.dataset.variant=r.variant??"default",s.dataset.size=r.size??"default",s.disabled=!!r.disabled||!!r.loading,s.dataset.loading=r.loading?"true":"false",s.setAttribute("aria-busy",r.loading?"true":"false"),r.loading&&i.parentNode!==s?s.prepend(i):!r.loading&&i.parentNode===s&&i.remove(),Y(c,r.label)},g=()=>{r.disabled||r.loading||r.onClick()};return s.addEventListener("click",g),l(),{update:k=>{r={...r,...k},l()},dispose:()=>{s.removeEventListener("click",g),s.remove()}}};var dt=[{id:"macos-ui",name:"macOS UI",skillIds:["appkit-interop","swiftui-patterns","window-management","liquid-glass","view-refactor"]},{id:"macos-build",name:"macOS \u6784\u5EFA",skillIds:["build-run-debug","test-triage","swiftpm-macos","signing-entitlements","packaging-notarization","telemetry"]},{id:"reverse",name:"\u9006\u5411\u5DE5\u7A0B",skillIds:["reverse-engineering-unpacking","kuna-decompiler","reverse-engineer-anything"]},{id:"cloudflare",name:"Cloudflare",skillIds:["cloudflare","workers-best-practices","wrangler"]},{id:"video",name:"\u89C6\u9891",skillIds:["yichen-jianying-edit"]},{id:"browser",name:"\u6D4F\u89C8\u5668",skillIds:["browser-skill"]}];var hr=["\u4F60\u662F\u6280\u672F\u6587\u6863\u7FFB\u8BD1\u3002\u628A\u8F93\u5165\u7684\u6280\u80FD\u540D\u79F0\u548C\u63CF\u8FF0\u7FFB\u8BD1\u6210\u7B80\u4F53\u4E2D\u6587\u3002","\u4FDD\u7559\u6280\u80FD ID\u3001\u547D\u4EE4\u3001\u6587\u4EF6\u8DEF\u5F84\u3001\u4EE3\u7801\u3001\u4EA7\u54C1\u540D\u548C\u6280\u672F\u4E13\u6709\u540D\u8BCD\uFF0C\u4E0D\u8981\u7FFB\u8BD1\u4EE3\u7801\u5757\u3002","\u4E0D\u8981\u6DFB\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown\u3002",'\u53EA\u8F93\u51FA JSON\uFF1A{"items":[{"id":"\u539F\u6837 ID","nameZh":"\u4E2D\u6587\u540D\u79F0","descriptionZh":"\u4E2D\u6587\u63CF\u8FF0"}]}'].join(""),gr=e=>JSON.stringify(e.map(t=>({id:t.id,name:t.name,description:t.description}))),kr=e=>{let t=e.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"").trim(),r=t.indexOf("{"),s=t.lastIndexOf("}");if(r<0||s<=r)return[];t=t.slice(r,s+1);let i;try{i=JSON.parse(t)}catch{return[]}let c=i&&typeof i=="object"?i:null,l=Array.isArray(i)?i:Array.isArray(c?.items)?c.items:[],g=[];for(let k of l){if(!k||typeof k!="object")continue;let y=k;typeof y.id!="string"||!y.id||typeof y.nameZh!="string"||!y.nameZh.trim()||typeof y.descriptionZh=="string"&&g.push({id:y.id.slice(0,128),nameZh:y.nameZh.trim().slice(0,300),descriptionZh:y.descriptionZh.trim().slice(0,8e3)})}return g};var xr=`:root {
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
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  margin: 2px 0 6px;
}
.sk-chip {
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
}
.sk-groupbar-text {
  min-width: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px 8px;
}
.sk-groupbar-text strong {
  font-size: 13px;
  font-weight: 600;
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
.sk-chip:focus-visible {
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
}
@media (max-width: 380px) {
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
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: none;
  }
  .sk-groups::-webkit-scrollbar {
    display: none;
  }
  .sk-chip {
    flex: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .sk-switch,
  .sk-switch .sk-thumb {
    transition: none;
  }
}
`;var br=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
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
`;var pe=Yt({requestTimeoutMs:3e4}),Or=document.querySelector("#root");if(!Or)throw new Error("Missing #root");var Rr=document.createElement("style");Rr.textContent=br+xr;document.head.append(Rr);var a=(e,t="",r)=>{let s=document.createElement(e);return s.className=t,r!==void 0&&(s.textContent=r),s},ee=class extends Error{code;conflicts;constructor(t,r,s){super(t),this.name="ServiceError",this.code=r,this.conflicts=s}},pn=e=>e==="enabled"||e==="disabled"||e==="mixed"||e==="conflict",un=e=>e==="both"||e==="duplicate"||e==="invalid"||e==="empty"||e==="read-error"||e==="manual"||e==="no-description",Me=(e,t="")=>typeof e=="string"?e:t,_r=e=>typeof e=="string"&&e.length>0?e:null,pt=e=>e===!0,Cr=e=>typeof e=="number"&&Number.isFinite(e)?e:0,Sr=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],mo=e=>{if(!e||typeof e!="object")return null;let t=e;return!un(t.kind)||typeof t.skillId!="string"?null:{kind:t.kind,skillId:t.skillId,message:Me(t.message,"\u51B2\u7A81"),activePath:_r(t.activePath),disabledPath:_r(t.disabledPath),blocking:pt(t.blocking)}},fn=e=>{if(!e||typeof e!="object")return null;let t=e;return typeof t.id!="string"||!t.id||!pn(t.state)?null:{id:t.id,name:Me(t.name,t.id),description:Me(t.description),state:t.state,advertised:pt(t.advertised),autoInvokeOff:pt(t.autoInvokeOff),activePaths:Sr(t.activePaths),disabledPaths:Sr(t.disabledPaths),conflicts:Array.isArray(t.conflicts)?t.conflicts.map(mo).filter(r=>r!==null):[],warnings:Array.isArray(t.warnings)?t.warnings.filter(r=>typeof r=="string"):[],estimatedTokens:Cr(t.estimatedTokens),contentHash:Me(t.contentHash)}},mn=e=>{if(!e||typeof e!="object")throw new ee("\u670D\u52A1\u8FD4\u56DE\u7684\u6280\u80FD\u76EE\u5F55\u4FE1\u606F\u4E0D\u6B63\u786E\u3002","parse",[]);let t=e;return{path:Me(t.path),exists:pt(t.exists),error:typeof t.error=="string"?t.error:null}},me=e=>{if(!e||typeof e!="object")throw new ee("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[]);let t=e;if(!Array.isArray(t.skills))throw new ee("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[]);let r=t.skills.map(fn).filter(l=>l!==null),s=Array.isArray(t.conflicts)?t.conflicts.map(mo).filter(l=>l!==null):r.flatMap(l=>l.conflicts),i=s.filter(l=>l.blocking).length,c={total:r.length,advertised:r.filter(l=>l.advertised).length,disabled:r.filter(l=>l.state==="disabled").length,blockingConflicts:i,warnings:s.length-i,estimatedTokens:r.reduce((l,g)=>l+g.estimatedTokens,0)};return{skills:r,conflicts:s,summary:c,root:mn(t.root),scannedAt:Cr(t.scannedAt)}},En=()=>({version:1,locale:"zh-CN",entries:{}}),Ir=e=>{if(!e||typeof e!="object")throw new ee("\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[]);let t=e;if(t.version!==1||t.locale!=="zh-CN"||!t.entries||typeof t.entries!="object"||Array.isArray(t.entries))throw new ee("\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[]);let r={};for(let[s,i]of Object.entries(t.entries)){if(!i||typeof i!="object")continue;let c=i;typeof c.hash!="string"||typeof c.nameZh!="string"||typeof c.descriptionZh!="string"||typeof c.updatedAt!="number"||(r[s]={hash:c.hash,nameZh:c.nameZh.trim(),descriptionZh:c.descriptionZh.trim(),updatedAt:c.updatedAt})}return{version:1,locale:"zh-CN",entries:r}},ne=async(e,t,r)=>{let s=await pe.serviceRequest({method:e,path:t,...r===void 0?{}:{body:JSON.stringify(r)}}),i;try{i=JSON.parse(s.body)}catch{throw new ee("\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u6570\u636E\uFF0C\u8BF7\u91CD\u8BD5\u3002","parse",[])}if(s.status>=400){let c=i&&typeof i=="object"?i:{},l=typeof c.error=="string"?c.error:`\u8BF7\u6C42\u5931\u8D25\uFF08${s.status}\uFF09`,g=typeof c.code=="string"?c.code:null,k=Array.isArray(c.conflicts)?c.conflicts.map(mo).filter(y=>y!==null):[];throw new ee(l,g,k)}return i},j=e=>e instanceof u?e.code==="NO_SERVICE"?"\u8BF7\u5728\u8BBE\u7F6E \u2192 \u6269\u5C55\u4E2D\u5141\u8BB8\u201C\u6280\u80FD\u5F00\u5173\u201D\u8FD0\u884C\u672C\u5730\u670D\u52A1\u3002":e.code==="SERVICE_FAILED"?"\u672C\u5730\u670D\u52A1\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6269\u5C55\u540E\u91CD\u8BD5\u3002":e.code==="DISABLED"?"\u6280\u80FD\u5F00\u5173\u6269\u5C55\u5DF2\u505C\u7528\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u542F\u7528\u3002":e.code==="HOST_TIMEOUT"?"\u672C\u5730\u670D\u52A1\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5\u3002":e.code==="NOT_GRANTED"?"\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u5141\u8BB8\u201C\u6A21\u578B\u8C03\u7528\u201D\u6743\u9650\uFF0C\u6216\u91CD\u65B0\u5B89\u88C5\u6269\u5C55\u3002":e.code==="UNSUPPORTED"?"\u5F53\u524D\u5BBF\u4E3B\u6216\u6A21\u578B\u4E0D\u652F\u6301\u7FFB\u8BD1\u8BF7\u6C42\u3002":"\u65E0\u6CD5\u8FDE\u63A5\u672C\u5730\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u6269\u5C55\u6388\u6743\u3002":e instanceof ee||e instanceof Error?e.message:"\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002",ft=a("main","ext sk");ft.setAttribute("aria-label","\u6280\u80FD\u5F00\u5173");var Ur=a("header","sk-header"),Mr=a("div","sk-title-row"),hn=a("h1","sk-title","\u6280\u80FD\u5F00\u5173"),mt=a("div","sk-actions"),gn=ce(mt,{label:"\u91CD\u65B0\u626B\u63CF",variant:"outline",size:"sm",onClick:()=>void $r(!0)}),kn=ce(mt,{label:"\u5168\u90E8\u542F\u7528",variant:"outline",size:"sm",onClick:()=>Hr(!0)}),xn=ce(mt,{label:"\u5168\u90E8\u5173\u95ED",variant:"outline",size:"sm",onClick:()=>Hr(!1)});Mr.append(hn,mt);var lo=a("p","sk-summary"),po=a("p","sk-summary sk-summary-secondary"),Lr=a("div","sk-translation-row"),Et=a("div","sk-segment");Et.setAttribute("role","group");Et.setAttribute("aria-label","\u6280\u80FD\u8BF4\u660E\u8BED\u8A00");var Se=a("button","sk-segment-button","\u7FFB\u8BD1");Se.type="button";Se.setAttribute("aria-pressed","false");var De=a("button","sk-segment-button","\u539F\u6587");De.type="button";De.setAttribute("aria-pressed","true");Et.append(Se,De);var Le=a("span","sk-translation-status");Le.setAttribute("aria-live","polite");Lr.append(Et,Le);Ur.append(Mr,lo,po,Lr);var Gr=a("div","sk-body"),X=a("div","sk-notice-root");X.setAttribute("aria-live","polite");var Ge=a("div","sk-groups"),uo=a("div"),$e=a("div"),Te=a("input","sk-search");Te.type="search";Te.placeholder="\u641C\u7D22\u540D\u79F0\u6216 ID";Te.setAttribute("aria-label","\u641C\u7D22\u6280\u80FD");Te.addEventListener("input",()=>{fo=Te.value.trim().toLowerCase(),Nr()});var Pe=a("div","sk-list");Pe.setAttribute("role","list");var Pr=a("footer","sk-footer");Pr.append(a("p","","\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002"),a("p","","\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002"));Gr.append(X,Ge,uo,$e,Te,Pe,Pr);ft.append(Ur,Gr);Or.append(ft);var f=null,ye=En(),fe="original",Eo=!1,Ne=!1,ut={done:0,total:0},z=null,D=!1,de=null,S=null,T=null,V=null,Z=null,le=null,fo="",Tr=!1,He=()=>!!f?.root.error,bn=e=>e.state==="conflict"?"error":e.state==="mixed"?"warning":e.state==="disabled"?"info":e.advertised?"success":"warning",_n=e=>e.state==="conflict"?"\u51B2\u7A81":e.state==="mixed"?"\u6DF7\u5408":e.state==="disabled"?"\u5173\u95ED":"\u5F00\u542F",Sn=(e,t="neutral")=>{let r=a("span","sk-badge",e);return r.dataset.tone=t,r},Tn=e=>{switch(e){case"both":return"\u5165\u53E3\u548C\u505C\u7528\u6587\u4EF6\u540C\u65F6\u5B58\u5728";case"duplicate":return"\u540C ID \u591A\u4E2A\u5165\u53E3";case"invalid":return"frontmatter \u65E0\u6CD5\u89E3\u6790";case"empty":return"\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A";case"read-error":return"\u5165\u53E3\u65E0\u6CD5\u8BFB\u53D6";case"manual":return"\u4EC5\u624B\u52A8\u8C03\u7528";case"no-description":return"\u6CA1\u6709 description";default:return"\u51B2\u7A81"}},ao=(e,t)=>{if(!t)return null;let r=a("p","sk-path");return r.append(a("span","sk-path-label",`${e}\uFF1A`),a("code","",t)),r},Q=(e,t,r=!1,s=!1)=>{let i=a("button",r?"sk-inline-button sk-inline-primary":"sk-inline-button",e);return i.type="button",i.disabled=!!T||s,i.addEventListener("click",t),i},yr=e=>{let t=a("li","sk-conflict-item");t.dataset.tone=e.blocking?"error":"warning";let r=a("div","sk-conflict-copy");if(r.append(a("strong","",Tn(e.kind)),a("p","sk-conflict-message",e.message)),e.kind==="both"?(r.append(ao("\u542F\u7528\u5165\u53E3",e.activePath)??a("span")),r.append(ao("\u505C\u7528\u5165\u53E3",e.disabledPath)??a("span"))):(e.activePath??e.disabledPath)&&r.append(ao("\u5165\u53E3",e.activePath??e.disabledPath)??a("span")),t.append(r),e.kind==="both"&&e.activePath){let s=a("div","sk-conflict-actions");s.append(Q("\u4FDD\u7559\u542F\u7528",()=>void wr(e,"enabled"),!1,He()),Q("\u4FDD\u7559\u5173\u95ED",()=>void wr(e,"disabled"),!1,He())),t.append(s)}return t},yn=()=>{if($e.replaceChildren(),!f)return;let t=[...f.root.error?[{kind:"read-error",skillId:"",message:`\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A${f.root.error}\uFF08${f.root.path}\uFF09`,activePath:null,disabledPath:null,blocking:!0}]:[],...f.conflicts],r=t.filter(l=>l.blocking),s=t.filter(l=>!l.blocking);if(r.length===0&&s.length===0)return;let i=a("section","sk-conflicts");i.setAttribute("aria-label","\u51B2\u7A81\u68C0\u67E5");let c=a("div","sk-section-head");if(c.append(a("h2","sk-section-title","\u51B2\u7A81\u68C0\u67E5"),a("span","sk-section-count",`${r.length} \u9879\u9700\u8981\u5904\u7406 \xB7 ${s.length} \u9879\u63D0\u793A`)),i.append(c),r.length>0){let l=a("ul","sk-conflict-list");for(let g of r)l.append(yr(g));i.append(l)}if(s.length>0){let l=a("details","sk-warning-details");l.append(a("summary","",`\u63D0\u793A\uFF08${s.length}\uFF09`));let g=a("ul","sk-conflict-list");for(let k of s)g.append(yr(k));l.append(g),i.append(l)}$e.append(i)},An=()=>{if(X.replaceChildren(),Z){let e=Z,t=new Set(e.skillIds),r=f?f.skills.filter(c=>!t.has(c.id)).length:0,s=a("div","sk-notice",`\u4EC5\u542F\u7528\u300C${e.name}\u300D\uFF1A\u5C06\u5173\u95ED\u5176\u4ED6 ${r} \u4E2A\u6280\u80FD\u3002`);s.dataset.tone="warning",s.setAttribute("role","status");let i=a("div","sk-notice-actions");i.append(Q("\u786E\u8BA4",()=>void Mn(),!0),Q("\u53D6\u6D88",()=>{Z=null,_()})),s.append(i),X.append(s);return}if(V!==null){let e=f?f.skills.filter(s=>(V?s.disabledPaths.length:s.activePaths.length)>0).length:0,t=a("div","sk-notice",V?`\u5C06\u542F\u7528 ${e} \u4E2A\u6280\u80FD\u3002`:`\u5C06\u5173\u95ED ${e} \u4E2A\u6280\u80FD\u3002`);t.dataset.tone="warning",t.setAttribute("role","status");let r=a("div","sk-notice-actions");r.append(Q(V?"\u786E\u8BA4\u542F\u7528":"\u786E\u8BA4\u5173\u95ED",()=>void Hn(),!0),Q("\u53D6\u6D88",()=>{V=null,_()})),t.append(r),X.append(t);return}if(S){let e=a("div","sk-notice",S.text);if(e.dataset.tone=S.tone,e.setAttribute("role",S.tone==="error"?"alert":"status"),S.actions?.length){let t=a("div","sk-notice-actions");for(let r of S.actions)t.append(Q(r.label,r.onClick,r.primary));e.append(t)}X.append(e);return}if(de){let e=a("div","sk-notice",de);e.dataset.tone="error",e.setAttribute("role","alert"),X.append(e);return}if(z){let e=a("div","sk-notice",z);e.dataset.tone="error",e.setAttribute("role","alert"),X.append(e);return}if(D&&!f){let e=a("div","sk-notice","\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026");e.dataset.tone="info",e.setAttribute("role","status"),X.append(e)}},vn=()=>{if(!f){lo.textContent=D?"\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026":"\u5C1A\u672A\u8BFB\u53D6\u6280\u80FD\u3002",po.textContent="\u5173\u95ED\u5165\u53E3\u6587\u6863\u540E\uFF0COpenCode \u4E0D\u4F1A\u518D\u53D1\u73B0\u8BE5\u6280\u80FD\u3002";return}lo.textContent=`\u6A21\u578B\u53EF\u89C1 ${f.summary.advertised} / \u5171 ${f.summary.total} \u4E2A \xB7 \u7EA6 ${f.summary.estimatedTokens.toLocaleString("zh-CN")} tokens/\u6B65`;let e=[`${f.summary.disabled} \u4E2A\u5DF2\u5173\u95ED`];f.summary.blockingConflicts>0?e.push(`${f.summary.blockingConflicts} \u9879\u963B\u585E\u51B2\u7A81`):e.push("\u65E0\u963B\u585E\u51B2\u7A81"),f.summary.warnings>0&&e.push(`${f.summary.warnings} \u9879\u63D0\u793A`),f.root.error&&e.push("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6"),po.textContent=`${e.join(" \xB7 ")}\u3002\u4F30\u7B97\u4E0D\u542B\u5185\u7F6E\u548C\u9879\u76EE\u6280\u80FD\u3002`},ht=e=>{let t=ye.entries[e.id];return t&&t.hash===e.contentHash?t:null},wn=()=>f?.skills.filter(e=>ht(e)).length??0;var On=()=>{Se.setAttribute("aria-pressed",fe==="translated"?"true":"false"),De.setAttribute("aria-pressed",fe==="original"?"true":"false"),Se.disabled=Ne;let e=f?.skills.length??0,t=wn();Ne?Le.textContent=`\u7FFB\u8BD1 ${ut.done}/${ut.total}\u2026`:fe==="translated"?Le.textContent=t?`${t}/${e} \u5DF2\u7FFB\u8BD1`:"\u70B9\u201C\u7FFB\u8BD1\u201D\u751F\u6210\u4E2D\u6587":Le.textContent=t?`${t} \u4E2A\u6709\u4E2D\u6587`:""},Ae=e=>e.skillIds.filter(t=>f?.skills.some(r=>r.id===t)),Rn=e=>{let t=Ae(e).map(s=>f?.skills.find(i=>i.id===s)).filter(s=>!!s);if(t.length===0)return"\u65E0\u6280\u80FD";if(t.some(s=>s.state==="conflict"))return"\u6709\u51B2\u7A81";let r=t.filter(s=>s.state==="enabled").length;return r===t.length?"\u5168\u5F00":r===0?"\u5168\u5173":"\u90E8\u5206"},Ar=e=>{Array.from(Ge.querySelectorAll("[data-group]")).find(r=>r.dataset.group===e)?.focus()},Cn=()=>{Ge.replaceChildren();let e=f?.skills.length??0,t=a("button","sk-chip",`\u5168\u90E8 ${e}`);t.type="button",t.dataset.group="all",t.setAttribute("aria-pressed",le===null?"true":"false"),t.addEventListener("click",()=>{le=null,_(),Ar("all")}),Ge.append(t);for(let r of dt){let s=Ae(r).length,i=a("button","sk-chip",`${r.name} ${s}`);i.type="button",i.dataset.group=r.id,i.setAttribute("aria-pressed",le===r.id?"true":"false"),i.addEventListener("click",()=>{le=r.id,_(),Ar(r.id)}),Ge.append(i)}},In=()=>{if(uo.replaceChildren(),!f||!le)return;let e=f,t=dt.find(v=>v.id===le);if(!t)return;let r=Ae(t),s=t.skillIds.filter(v=>!r.includes(v)),c=r.map(v=>e.skills.find(J=>J.id===v)).filter(v=>!!v).some(v=>v.state==="conflict"),l=He()||c||r.length===0,g=a("div","sk-groupbar"),k=a("div","sk-groupbar-text");k.append(a("strong","",t.name),a("span","sk-group-state",`${r.length} \u4E2A \xB7 ${Rn(t)}`)),s.length>0&&k.append(a("p","sk-group-warning",`\u7F3A\u5931\uFF1A${s.join("\u3001")}`));let y=a("div","sk-groupbar-actions");y.append(Q("\u542F\u7528\u6574\u7EC4",()=>void vr(t,!0),!1,l),Q("\u5173\u95ED\u6574\u7EC4",()=>void vr(t,!1),!1,l));let K=Q("\u4EC5\u542F\u7528\u672C\u7EC4",()=>Un(t),!1,l||s.length>0);s.length>0&&(K.title="\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u5148\u5904\u7406\u540E\u518D\u4EC5\u542F\u7528\u672C\u7EC4"),y.append(K),g.append(k,y),uo.append(g)},vr=async(e,t)=>{if(!f||T)return;let r=Ae(e);if(r.length!==0){T=`group:${e.id}:${t?"on":"off"}`,Z=null,V=null,S=null,_();try{f=me(await ne("POST","/skills/batch",{enable:t?r:[],disable:t?[]:r})),S={text:`\u5DF2${t?"\u542F\u7528":"\u5173\u95ED"}\u300C${e.name}\u300D\u7684 ${r.length} \u4E2A\u6280\u80FD\u3002`,tone:"success"},pe.toast({kind:"success",message:`${t?"\u5DF2\u542F\u7528":"\u5DF2\u5173\u95ED"}\u300C${e.name}\u300D`}).catch(()=>{})}catch(s){S={text:j(s),tone:"error"},T=null,_(),Fe(!1,!0);return}T=null,_()}},Un=e=>{if(!f||T)return;let t=Ae(e),r=e.skillIds.filter(s=>!t.includes(s));t.length===0||r.length>0||(Z=e,V=null,S=null,_(),X.scrollIntoView({block:"nearest"}),X.querySelector("button")?.focus())},Mn=async()=>{if(!f||T||!Z)return;let e=Z;Z=null;let t=Ae(e),r=e.skillIds.filter(c=>!t.includes(c));if(t.length===0||r.length>0){S={text:"\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u672A\u6267\u884C\u3002",tone:"error"},_();return}let s=new Set(e.skillIds),i=f.skills.filter(c=>!s.has(c.id)).map(c=>c.id);T=`group-only:${e.id}`,S=null,_();try{f=me(await ne("POST","/skills/batch",{enable:t,disable:i})),S={text:`\u5DF2\u4EC5\u542F\u7528\u300C${e.name}\u300D\uFF0C\u5173\u95ED\u5176\u4ED6 ${i.length} \u4E2A\u6280\u80FD\u3002`,tone:"success"},pe.toast({kind:"success",message:`\u5DF2\u4EC5\u542F\u7528\u300C${e.name}\u300D`}).catch(()=>{})}catch(c){S={text:j(c),tone:"error"},T=null,_(),Fe(!1,!0);return}T=null,_()};Se.addEventListener("click",()=>{Eo=!0,fe="translated",_(),$n()});De.addEventListener("click",()=>{Eo=!0,fe="original",_()});var Ln=e=>{let t=a("div","sk-skill-action"),r=a("span","sk-action-note"),s=He();if(e.state==="conflict"){r.textContent=s?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5148\u5904\u7406\u51B2\u7A81";let l=a("button","sk-inline-button","\u5904\u7406\u51B2\u7A81");return l.type="button",l.disabled=!!T||s,l.addEventListener("click",()=>{$e.scrollIntoView({block:"nearest"}),$e.querySelector("button")?.focus()}),t.append(r,l),t}if(e.state==="mixed"){r.textContent=s?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u90E8\u5206\u5165\u53E3\u5173\u95ED";let l=a("div","sk-mini-actions"),g=a("button","sk-inline-button","\u5168\u90E8\u542F\u7528");g.type="button",g.disabled=!!T||s,g.addEventListener("click",()=>void co(e,!0));let k=a("button","sk-inline-button","\u5168\u90E8\u5173\u95ED");return k.type="button",k.disabled=!!T||s,k.addEventListener("click",()=>void co(e,!1)),l.append(g,k),t.append(r,l),t}let i=e.state==="enabled",c=a("button","sk-switch");return c.type="button",c.setAttribute("role","switch"),c.setAttribute("aria-checked",i?"true":"false"),c.setAttribute("aria-label",`${i?"\u5173\u95ED":"\u542F\u7528"} ${e.name}`),c.dataset.skillId=e.id,c.disabled=!!T||s,c.append(a("span","sk-thumb")),c.addEventListener("click",()=>{c.disabled||co(e,!i)}),i?r.textContent=s?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":e.advertised?"\u6A21\u578B\u53EF\u89C1":"\u6A21\u578B\u4E0D\u53EF\u89C1":r.textContent=s?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5165\u53E3\u5DF2\u5173\u95ED",t.append(r,c),t},Gn=(e,t=0)=>{let r=a("article","sk-skill");r.dataset.state=e.state,r.setAttribute("role","listitem");let s=a("div","sk-skill-main"),i=a("div","sk-skill-head");if(t>0){let k=a("span","sk-step",String(t));k.title=`\u7B2C ${t} \u6B65`,k.setAttribute("aria-label",`\u7B2C ${t} \u6B65`),i.append(k)}let c=fe==="translated"?ht(e):null;i.append(a("strong","sk-name",c?.nameZh||e.name),Sn(_n(e),bn(e)));let l=a("div","sk-meta");c&&l.append(a("span","sk-original-name",e.name)),l.append(a("code","sk-id",e.id));let g=a("p","sk-desc",c?.descriptionZh||e.description||"\u65E0 description\uFF0C\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002");if(s.append(i,l,g),e.warnings.length>0){let k=a("p","sk-warn",e.warnings.slice(0,2).join(" \xB7 "));s.append(k)}return r.append(s,Ln(e)),r},Nr=()=>{if(Pe.replaceChildren(),!f)return;let e=le?dt.find(s=>s.id===le):null,r=(e?e.skillIds.map(s=>f?.skills.find(i=>i.id===s)).filter(s=>!!s):f.skills).filter(s=>{if(!fo)return!0;let i=ht(s);return[s.id,s.name,s.description,i?.nameZh??"",i?.descriptionZh??"",...s.warnings].join(" ").toLowerCase().includes(fo)});if(r.length===0){let s=a("div","sk-empty");s.append(a("h2","",f.skills.length===0?"\u6CA1\u6709\u53D1\u73B0\u6280\u80FD":e?"\u8FD9\u4E2A\u5206\u7EC4\u6CA1\u6709\u53EF\u7528\u6280\u80FD":"\u6CA1\u6709\u5339\u914D\u7684\u6280\u80FD"),a("p","",f.skills.length===0?"\u68C0\u67E5 ~/.config/opencode/skills \u662F\u5426\u5B58\u5728\uFF0C\u6216\u91CD\u65B0\u626B\u63CF\u3002":e?"\u68C0\u67E5\u5206\u7EC4\u91CC\u7684\u6280\u80FD\u662F\u5426\u88AB\u79FB\u9664\u3002":"\u6362\u4E00\u4E2A\u641C\u7D22\u8BCD\u3002")),Pe.append(s);return}for(let s of r){let i=e&&e.skillIds.length>1?e.skillIds.indexOf(s.id)+1:0;Pe.append(Gn(s,i))}},_=()=>{ft.setAttribute("aria-busy",D?"true":"false"),vn(),On(),An(),Cn(),In(),yn(),Nr(),gn.update({label:D?"\u8BFB\u53D6\u4E2D\u2026":"\u91CD\u65B0\u626B\u63CF",loading:D,disabled:D||!!T});let e=He();kn.update({disabled:D||!!T||!f||e}),xn.update({disabled:D||!!T||!f||e})},Pn=e=>{Array.from(document.querySelectorAll("[data-skill-id]")).find(r=>r.dataset.skillId===e)?.focus()},Fe=async(e=!1,t=!1)=>{if(!D){D=!0,t||(de=null),e&&_();try{f=me(await ne("GET","/skills")),de=null}catch(r){t||(de=j(r))}finally{D=!1,_()}}},Nn=async()=>{try{ye=Ir(await ne("POST","/translations",ye)),z=null}catch(e){z=j(e)}},$n=async()=>{if(!f||Ne)return;let e=f.skills.filter(i=>!ht(i));if(e.length===0){S={text:"\u4E2D\u6587\u8BF4\u660E\u5DF2\u662F\u6700\u65B0\u3002",tone:"success"},_();return}Ne=!0,z=null,ut={done:0,total:e.length},S=null,_();let t=0,r=0,s=!1;try{for(let i=0;i<e.length;i+=4){let c=e.slice(i,i+4),l=c;for(let g=0;g<2&&l.length>0;g+=1){let k=await pe.generate({prompt:gr(l.map(v=>({id:v.id,name:v.name,description:v.description}))),system:hr,maxOutputTokens:2048}),y=kr(k.text),K=new Set;for(let v of y){let J=l.find(se=>se.id===v.id);J&&(ye.entries[J.id]={hash:J.contentHash,nameZh:v.nameZh,descriptionZh:v.descriptionZh,updatedAt:Date.now()},K.add(J.id))}l=l.filter(v=>!K.has(v.id))}r+=l.length,t+=c.length-l.length,ut={done:t,total:e.length},await Nn(),_()}}catch(i){s=!0,z=j(i),S={text:z,tone:"error"}}finally{Ne=!1,s||(z?S={text:`\u7FFB\u8BD1\u5B8C\u6210\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A${z}`,tone:"warning"}:r>0?S={text:`\u5DF2\u7FFB\u8BD1 ${t} \u4E2A\u6280\u80FD\uFF0C${r} \u4E2A\u5931\u8D25\uFF1B\u53EF\u518D\u70B9\u201C\u7FFB\u8BD1\u201D\u91CD\u8BD5\u3002`,tone:"warning"}:S={text:`\u5DF2\u7FFB\u8BD1 ${t} \u4E2A\u6280\u80FD\u3002`,tone:"success"}),_()}},$r=async(e=!1)=>{if(D)return;D=!0,e&&_();let[t,r]=await Promise.allSettled([ne("GET","/skills"),ne("GET","/translations")]);if(t.status==="fulfilled")try{f=me(t.value),de=null}catch(s){de=j(s)}else de=j(t.reason);if(r.status==="fulfilled")try{ye=Ir(r.value),z=null,!Eo&&Object.keys(ye.entries).length>0&&(fe="translated")}catch(s){z=j(s)}else z=j(r.reason);D=!1,_()},co=async(e,t)=>{if(!T){T=`toggle:${e.id}`,V=null,Z=null,S=null,_();try{f=me(await ne("POST","/skills/toggle",{id:e.id,enabled:t})),S={text:t?`\u5DF2\u542F\u7528 ${e.name}\u3002`:`\u5DF2\u5173\u95ED ${e.name}\uFF1BOpenCode \u4E0B\u4E00\u6B21\u626B\u63CF\u540E\u4E0D\u518D\u53D1\u73B0\u5B83\u3002`,tone:"success"},pe.toast({kind:"success",message:t?`\u5DF2\u542F\u7528 ${e.name}`:`\u5DF2\u5173\u95ED ${e.name}`}).catch(()=>{})}catch(r){S={text:j(r),tone:"error"},T=null,_(),Fe(!1,!0);return}T=null,_(),Pn(e.id)}},wr=async(e,t)=>{if(T)return;let r=e.activePath??e.disabledPath;if(r){T=`resolve:${r}`,S=null,_();try{let s=await ne("POST","/skills/resolve",{path:r,keep:t}),i=s&&typeof s=="object"&&typeof s.backupPath=="string"?s.backupPath:null;f=me(s),S={text:`\u5DF2\u4FDD\u7559${t==="enabled"?"\u542F\u7528":"\u5173\u95ED"}\u5165\u53E3${i?`\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A ${i}`:""}\u3002`,tone:"success"},pe.toast({kind:"success",message:"\u5165\u53E3\u51B2\u7A81\u5DF2\u5904\u7406"}).catch(()=>{})}catch(s){S={text:j(s),tone:"error"},T=null,_(),Fe(!1,!0);return}T=null,_()}},Hr=e=>{!f||T||(V=e,Z=null,S=null,_(),X.scrollIntoView({block:"nearest"}),X.querySelector("button")?.focus())},Hn=async()=>{if(V===null||T)return;let e=V;V=null,Z=null,T="bulk",S=null,_();try{let t=await ne("POST","/skills/bulk",{enabled:e}),r=t&&typeof t=="object"&&Array.isArray(t.changed)?t.changed.filter(s=>typeof s=="string"):[];f=me(t),S={text:`${e?"\u5DF2\u542F\u7528":"\u5DF2\u5173\u95ED"} ${r.length} \u4E2A\u6280\u80FD\u3002`,tone:"success"},pe.toast({kind:"success",message:`${e?"\u5DF2\u542F\u7528":"\u5DF2\u5173\u95ED"} ${r.length} \u4E2A\u6280\u80FD`}).catch(()=>{})}catch(t){S={text:j(t),tone:"error"},T=null,_(),Fe(!1,!0);return}T=null,_()};pe.onReady(e=>{if(Zt(e,document.documentElement),document.documentElement.lang=e.locale.startsWith("zh")?e.locale:"zh-CN",Tr){_();return}Tr=!0,$r(!0)});_();})();
