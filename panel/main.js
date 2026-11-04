"use strict";(()=>{var w="openchamber.sdk";var ht="data-oc-scrolling",$t=`
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
`;function Ft(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",r=>{let i=r.target===e?t:r.target;if(!(i instanceof Element))return;i.hasAttribute("data-oc-scrolling")||i.setAttribute("data-oc-scrolling","");let c=o.get(i);c!==void 0&&clearTimeout(c),o.set(i,setTimeout(()=>{o.delete(i),i.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Mr=`(${Ft.toString()})(document);`;var rn=/^[a-z][a-z0-9-]{0,39}$/;var tn=e=>Object(e)===e&&!Array.isArray(e),Xt=(e,t)=>Object.keys(e).every(o=>t.includes(o)),on=e=>String(e)===e&&e.length>=1&&e.length<=60,nn=e=>String(e)===e&&e.length>=1&&e.length<=80,sn=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let o of e){if(!tn(o)||!rn.test(o.id)||!on(o.label)||o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1||t.has(o.id))return!1;if(t.add(o.id),o.kind==="button"){if(!Xt(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!Xt(o,["kind","id","label","value","options","disabled"])||!nn(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let r=new Set;for(let i of o.options){if(!tn(i)||!Xt(i,["value","label"])||!nn(i.value)||!on(i.label)||r.has(i.value))return!1;r.add(i.value)}if(!r.has(o.value))return!1}return!0};var Bt=e=>"bytes"in e?e.bytes.byteLength:e.content.length,an=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==t.bytes[o])return!1;return!0};var cn=/^[A-Za-z0-9_-]{1,80}$/;var ln=["left","right","top","bottom"];var dn=(e,t=0,o={remaining:16e3})=>{if(--o.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of r)if(!dn(i,t+1,o))return!1;return!0},zt=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(zt);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(zt)}return String(e)===e||Number.isFinite(e)},Vt=e=>{try{return String(e.id)!==e.id||!cn.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ln.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!dn(e.data)||!zt(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var un=["file","directory","other","missing"],Kt=e=>!!(e&&"sessionId"in e),Wt=e=>!!(e&&"sent"in e&&!("sessionId"in e));var fn=/^[0-9a-f]{7,64}$/i,Jt=e=>fn.test(e),kt=500,bt=32e3,mn=16e3,gn=128,hn=200,kn=2e3,bn=16e3,xn=80,En=200,Sn=16e3;var Tn=2e3;var Yt=2e4,xt=1024,Et=2e6;var St=64e3,Tt=8e3,Zt=4e3;var qt=96e4,Lr=60*6e4;var _n=999,yn=1e4,ot=500,vn=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],An=["stopped","starting","ready","failed"],Gr=new Set(vn),wn=e=>Gr.has(e),On=e=>e&&wn(e)?e:"HOST_REJECTED",Be=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(Be):Object(e)===e?Object.values(e).every(Be):!1,Rn=e=>Be(e)&&JSON.stringify(e).length<=Sn,pn=e=>e?.trim().slice(0,En)??"",ze=e=>{let t=e.id.trim().slice(0,gn),o=e.title.trim().slice(0,hn),r=e.url.trim().slice(0,kn),i=e.text?.trim().slice(0,bn),c=e.author?.trim().slice(0,xn),d=e.kind==="pull"?"pull":"issue",p={providerId:e.providerId.trim(),id:t,title:o||t,url:r,kind:d};if(i&&(p.text=i),c&&(p.author=c),d==="pull"){let u=pn(e.branches?.head),_=pn(e.branches?.base);u&&_&&(p.branches={head:u,base:_})}return Rn(e.data)&&(p.data=e.data),p},Qt=e=>{let t=ze(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},eo=e=>{let t={text:e.text.trim().slice(0,mn)};return e.send&&(t.send=!0),t},to=e=>e===null||!Number.isFinite(e)?null:Math.min(_n,Math.max(0,Math.round(e))),oo=e=>Number.isFinite(e)?Math.min(yn,Math.max(0,Math.ceil(e))):0;var Ve=e=>e.length>0&&e.length<=xt&&!e.includes("\0")&&!e.includes("\\");var _t=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Tn?!1:!e.split("/").some(o=>o==="."||o===".."),Pr=new Set(An),no=e=>!!(e&&"status"in e&&Pr.has(String(e.status))&&!("body"in e)),yt=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),ro=e=>!!(e&&"content"in e&&String(e.content)===e.content),so=e=>!!(e&&"written"in e&&e.written===!0),io=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),Nr=new Set(un),ao=e=>!!(e&&"kind"in e&&"size"in e&&Nr.has(String(e.kind))&&Number.isFinite(e.size)),co=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Dr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Hr=e=>Object(e)===e?e:null,jt=e=>String(e)===e&&e.length>0,$r=e=>{if(!jt(e.id))return null;if(e.ok===!0){let t={channel:w,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&jt(e.error)?{channel:w,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:On(jt(e.code)?e.code:void 0)}:null},lo=e=>{let t=Hr(e);return!t||t.channel!==w||t.v!==1?null:t.type==="result"?$r(t):!Dr.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var In=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Fr=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",b=class extends Error{code;constructor(t,o){super(o),this.name="HostRequestError",this.code=t}},Cn=()=>Promise.reject(new b("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),vt=()=>Promise.reject(new b("BAD_PATH",`File path must be 1 to ${xt} characters without NUL or backslash.`)),At=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new b("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},y=e=>(e.value+=1,`oc-${e.value}`),go=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new b("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??(n=>n===t.parent),r=e.requestTimeoutMs??Yt,i=new Set,c=new Set,d=new Set,p=new Set,u=new Set,_=new Set,M=new Set,v=new Set,G=new Set,D=new Set,q=[],T=null,C=null,I=new Set,ie=new Set,oe=null,Re=null,Xe=!1,Ee=new Map,Se=new Map,Te=new Map,ae=!1,E={value:0},x=null,S=null,z=!1,tt=!1,Bo=null,zo=n=>n?{sessionId:n.id,phase:n.busy?"started":"completed"}:null,ce=n=>{t.parent.postMessage(n,"*")},Vo=()=>{ae||t.parent===t||D.size===0||x?.features?.lateGenerateResults!==!0||ce({channel:w,v:1,type:"generate-late-listen"})},F=(n,a)=>{for(let h of n)try{h(a)}catch(k){console.error(k)}},jo=n=>{if(!(n instanceof MessageEvent)||!o(n.source))return;let a=lo(n.data);if(!a)return;if(a.type==="workspace"){let k=Se.get(a.payload.subscriptionId);k&&F([k],a.payload.snapshot);return}if(a.type==="shells"){let k=Te.get(a.payload.subscriptionId);k&&F([k],a.payload.snapshot);return}if(a.type==="ready"){x=a.payload,S=zo(a.payload.session),F(i,a.payload),F(c,a.payload.directory),F(d,a.payload.session),S&&F(p,S),F(u,a.payload.connection),F(_,a.payload.settings),F(M,a.payload.item),Vo();return}if(a.type==="generate-late"){D.size===0?q.push(a.payload):F(D,a.payload);return}if(a.type==="directory"){x&&(x={...x,directory:a.payload.directory}),F(c,a.payload.directory);return}if(a.type==="session"){x&&(x={...x,session:a.payload.session}),a.payload.session?S?.sessionId!==a.payload.session.id&&(S=zo(a.payload.session)):S=null,F(d,a.payload.session);return}if(a.type==="session-lifecycle"){S=a.payload,F(p,a.payload);return}if(a.type==="connection"){x&&(x={...x,connection:a.payload.connection}),F(u,a.payload.connection);return}if(a.type==="settings"){x&&(x={...x,settings:a.payload.settings}),F(_,a.payload.settings);return}if(a.type==="item"){x&&(x={...x,item:a.payload.item}),F(M,a.payload.item);return}if(a.type==="status-control-event"){F(v,a.payload);return}if(a.type==="popover-closed"){F(G,a.payload);return}if(a.type==="action"){let k=L=>{ae||ce({channel:w,v:1,type:"action-result",id:a.id,payload:L})},P=C;if(!P){k({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>P(a.payload)).then(()=>k({ok:!0}),L=>{let K=(L instanceof Error?L.message:String(L)).trim();k({ok:!1,error:(K||"Action failed.").slice(0,ot)})});return}if(a.type==="file-open"){let k=a.payload;if(Re&&an(Re,k))return;Re=k,F(I,a.payload);return}if(a.type==="file-saved"){F(ie,a.payload.version);return}if(a.type==="file-snapshot"){let k=K=>{ae||ce({channel:w,v:1,type:"file-snapshot-result",id:a.id,payload:K})},P=K=>k({error:(K.trim()||"Could not read the edited file.").slice(0,ot)}),L=oe;if(!L){P("This extension does not edit files.");return}Promise.resolve().then(()=>L(a.payload.purpose)).then(K=>{if(Bt(K)>2e7){P(`The file is over ${2e7} ${"bytes"in K?"bytes":"characters"}.`);return}if(K.version.length>256){P(`The snapshot version is over ${256} characters.`);return}k({snapshot:"bytes"in K?{bytes:K.bytes,version:K.version}:{content:K.content,version:K.version}})},K=>P(K instanceof Error?K.message:String(K)));return}if(a.type==="resolve"){let k=L=>{ce({channel:w,v:1,type:"resolve-result",id:a.id,payload:L})},P=T;if(!P){k({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>P(a.payload)).then(L=>k({item:L?ze(L):null}),L=>{let K=(L instanceof Error?L.message:String(L)).trim();k({error:(K||"Command failed.").slice(0,ot)})});return}let h=Ee.get(a.id);if(h){if(clearTimeout(h.timer),Ee.delete(a.id),a.ok){h.resolve(a.payload);return}h.reject(new b(a.code,a.error))}};t.addEventListener("message",jo),ce({channel:w,v:1,type:"hello"});let ee=(n,a=r)=>ae||t.parent===t?Promise.reject(new b("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((h,k)=>{let P=setTimeout(()=>{Ee.delete(n.id),k(new b("HOST_TIMEOUT","Host did not answer in time."))},a);Ee.set(n.id,{resolve:h,reject:k,timer:P}),ce(n)}),V=n=>ee(n).then(()=>{}),j={channel:w,v:1},Nt=n=>{!ae&&t.parent!==t&&ce(n)},Ko=()=>Nt({...j,type:"file-save"}),Wo=n=>{!In(n)||!Fr(n)||(n.preventDefault(),Ko())},Jo=n=>{!In(n)||n.key!=="Escape"||x?.surface!=="popover"||!x.popover||(n.preventDefault(),Qo(x.popover.id,"escape").catch(()=>{}))},ft=()=>{let n=x?.surface==="popover"?x.popover:void 0;if(!n)return;let a=z||tt;Bo!==a&&(Bo=a,en(n.id,a).catch(()=>{}))},mt=()=>{x?.surface!=="popover"||z||(z=!0,ft())},Yo=n=>{x?.surface!=="popover"||n.relatedTarget!==null||!z||(z=!1,ft())},Zo=()=>{x?.surface!=="popover"||tt||(tt=!0,ft())},qo=()=>{x?.surface!=="popover"||!tt||(tt=!1,ft())},ke=(n,a=1024)=>{if(!n.trim()||n.length>a)throw new b("HOST_REJECTED",`Identity must contain 1 to ${a} characters.`)},Dt=async n=>{n.kind!=="projects"&&ke(n.projectId);let a=await ee({...j,type:"workspace-read",id:y(E),payload:n});if(!a||!("kind"in a)||!("state"in a)||a.kind!==n.kind)throw new b("HOST_REJECTED","Host did not return workspace data.");return a},Ht=async(n,a)=>{n.kind!=="projects"&&ke(n.projectId);let h=y(E);Se.set(h,a);try{await V({...j,type:"workspace-subscribe",id:y(E),payload:{subscriptionId:h,query:n}})}catch(k){throw Se.delete(h),ae||ce({...j,type:"workspace-unsubscribe",id:y(E),payload:{subscriptionId:h}}),k}return()=>{!Se.delete(h)||ae||ce({...j,type:"workspace-unsubscribe",id:y(E),payload:{subscriptionId:h}})}},Ur=async(n,a)=>{n.kind==="session"&&ke(n.sessionId),n.kind==="project"&&ke(n.projectId);let h=y(E);Te.set(h,a);try{await V({...j,type:"shells-subscribe",id:y(E),payload:{subscriptionId:h,scope:n}})}catch(k){throw Te.delete(h),ae||ce({...j,type:"shells-unsubscribe",id:y(E),payload:{subscriptionId:h}}),k}return()=>{!Te.delete(h)||ae||ce({...j,type:"shells-unsubscribe",id:y(E),payload:{subscriptionId:h}})}},gt=async n=>{if("key"in n&&(n.key.length===0||n.key.length>128))throw new b("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(n.op==="set"&&!Be(n.value))throw new b("HOST_REJECTED","Storage values must be JSON.");if(n.op==="set"&&new TextEncoder().encode(JSON.stringify(n.value)).length>65536)throw new b("HOST_REJECTED","Storage value exceeds 64 KiB.");if(n.scope==="device"&&x?.features?.deviceStorage!==!0)throw new b("UNSUPPORTED","This host does not support device storage.");let a=await ee({...j,type:"storage",id:y(E),payload:n});if(!a||!("storage"in a)||a.op!==n.op)throw new b("HOST_REJECTED","Host did not return storage data.");return a},Qo=(n,a)=>x?.features?.popovers!==!0&&!(x?.surface==="popover"&&x.popover?.id===n)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):V({...j,type:"popover-close",id:y(E),payload:a?{id:n,reason:a}:{id:n}}),en=(n,a)=>x?.features?.popovers!==!0&&!(x?.surface==="popover"&&x.popover?.id===n)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):V({...j,type:"popover-anchor",id:y(E),payload:{id:n,active:a}});return t.addEventListener("keydown",Jo,!0),t.addEventListener("pointerover",mt),t.addEventListener("pointermove",mt),t.addEventListener("pointerout",Yo),t.addEventListener("focus",Zo),t.addEventListener("blur",qo),{onAction:n=>(C=n,()=>{C===n&&(C=null)}),listProjects:async()=>{let n=await Dt({kind:"projects"});if(n.kind!=="projects")throw new b("HOST_REJECTED","Expected projects.");return n},listWorktrees:async n=>{let a=await Dt({kind:"worktrees",projectId:n});if(a.kind!=="worktrees")throw new b("HOST_REJECTED","Expected worktrees.");return a},listSessions:async n=>{let a=await Dt({kind:"sessions",projectId:n});if(a.kind!=="sessions")throw new b("HOST_REJECTED","Expected sessions.");return a},onProjects:n=>Ht({kind:"projects"},a=>{a.kind==="projects"&&n(a)}),onWorktrees:(n,a)=>Ht({kind:"worktrees",projectId:n},h=>{h.kind==="worktrees"&&a(h)}),onSessions:(n,a)=>Ht({kind:"sessions",projectId:n},h=>{h.kind==="sessions"&&a(h)}),onRunningShells:(n,a)=>Ur(n,a),readShellOutput:async(n,a)=>{ke(n,128);let h=a?.cursor;if(h!==void 0&&(!Number.isInteger(h)||h<0))throw new b("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let k=a?.tailBytes;if(k!==void 0&&(!Number.isInteger(k)||k<1||k>65536))throw new b("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let L=await ee({...j,type:"shell-output",id:y(E),payload:{shellId:n,cursor:h,tailBytes:k}});if(!L||typeof L.output!="string"||!Number.isFinite(L.cursor))throw new b("HOST_REJECTED","Host did not return shell output.");return L},stopShell:async n=>{if(ke(n,128),(await ee({...j,type:"shell-stop",id:y(E),payload:{shellId:n}}))?.stopped!==!0)throw new b("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async n=>{ke(n),await V({...j,type:"open-session",id:y(E),payload:{sessionId:n}})},storage:{get:async(n,a)=>{let h=At(a),k={op:"get",key:n};h&&(k.scope=h);let P=await gt(k);return P.op==="get"&&P.found?P.value:void 0},set:async(n,a,h)=>{let k=At(h),P={op:"set",key:n,value:a};k&&(P.scope=k),await gt(P)},delete:async(n,a)=>{let h=At(a),k={op:"delete",key:n};h&&(k.scope=h),await gt(k)},keys:async n=>{let a=At(n),h={op:"keys"};a&&(h.scope=a);let k=await gt(h);if(k.op!=="keys")throw new b("HOST_REJECTED","Expected storage keys.");return k.keys}},onReady:n=>(i.add(n),x&&n(x),()=>{i.delete(n)}),onDirectory:n=>(c.add(n),x&&n(x.directory),()=>{c.delete(n)}),onSession:n=>(d.add(n),x&&n(x.session),()=>{d.delete(n)}),onSessionLifecycle:n=>(p.add(n),S&&n(S),()=>{p.delete(n)}),onConnection:n=>(u.add(n),x&&n(x.connection),()=>{u.delete(n)}),onSettings:n=>(_.add(n),x&&n(x.settings),()=>{_.delete(n)}),onItem:n=>(M.add(n),x&&n(x.item),()=>{M.delete(n)}),onStatusControl:n=>(v.add(n),()=>{v.delete(n)}),onPopoverClosed:n=>(G.add(n),()=>{G.delete(n)}),setStatusControls:n=>x?.features?.statusControls!==!0?Promise.reject(new b("UNSUPPORTED","This host does not support status controls.")):sn(n)?V({...j,type:"status-controls",id:y(E),payload:{controls:n}}):Promise.reject(new b("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:n=>x?.features?.popovers!==!0?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):Vt(n)?V({...j,type:"popover-open",id:y(E),payload:n}):Promise.reject(new b("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:Qo,setPopoverAnchorActive:en,onResolve:n=>(T=n,()=>{T===n&&(T=null)}),toast:n=>{let a=n.message.trim();return!a||a.length>kt?Promise.reject(new b("HOST_REJECTED",`Toast message must contain 1 to ${kt} characters.`)):n.copy&&n.copy!==!0&&(!n.copy.text.length||n.copy.text.length>bt)?Promise.reject(new b("HOST_REJECTED",`Toast copy text must contain 1 to ${bt} characters.`)):V({channel:w,v:1,type:"toast",id:y(E),payload:{...n,message:a}})},openUrl:n=>V({channel:w,v:1,type:"open-url",id:y(E),payload:{url:n}}),openCommit:n=>Jt(n)?V({channel:w,v:1,type:"open-commit",id:y(E),payload:{sha:n}}):Promise.reject(new b("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:n=>V({channel:w,v:1,type:"open-surface",id:y(E),payload:{surfaceId:n}}),writeClipboard:n=>V({channel:w,v:1,type:"clipboard-write",id:y(E),payload:{text:n}}),compose:n=>V({channel:w,v:1,type:"compose",id:y(E),payload:n}),attach:n=>V({channel:w,v:1,type:"attach",id:y(E),payload:ze(n)}),startSession:async n=>{n.projectId!==void 0&&ke(n.projectId);let a=n.worktree;a&&a!==!0&&(a.kind==="existing"?ke(a.directory):(a.name!==void 0&&ke(a.name,200),a.baseBranch!==void 0&&ke(a.baseBranch,200)));let h=await ee({channel:w,v:1,type:"start-session",id:y(E),payload:Qt(n)},e.requestTimeoutMs??18e4);if(!Kt(h))throw new b("HOST_REJECTED","Host did not return a session.");return h},prompt:n=>ee({channel:w,v:1,type:"prompt",id:y(E),payload:eo(n)}).then(a=>{if(!Wt(a))throw new b("HOST_REJECTED","Host did not return a prompt result.");return a}),sessionLink:n=>V({channel:w,v:1,type:"session-link",id:y(E),payload:ze(n)}),close:()=>V({channel:w,v:1,type:"close",id:y(E)}),oauthStart:()=>V({channel:w,v:1,type:"oauth-start",id:y(E)}),oauthDisconnect:()=>V({channel:w,v:1,type:"oauth-disconnect",id:y(E)}),request:n=>(_t(n.path)?ee({channel:w,v:1,type:"request",id:y(E),payload:n}):Cn()).then(a=>{if(!yt(a))throw new b("HOST_REJECTED","Host request result was empty.");return a}),serviceRequest:n=>(_t(n.path)?ee({channel:w,v:1,type:"service-request",id:y(E),payload:n}):Cn()).then(a=>{if(!yt(a))throw new b("HOST_REJECTED","Host service request result was empty.");return a}),serviceStatus:()=>ee({channel:w,v:1,type:"service-status",id:y(E)}).then(n=>{if(!no(n))throw new b("HOST_REJECTED","Host did not return service status.");return n}),readFile:n=>(Ve(n)?ee({channel:w,v:1,type:"file-read",id:y(E),payload:{path:n}}):vt()).then(a=>{if(!ro(a))throw new b("HOST_REJECTED","Host did not return file content.");return a}),writeFile:(n,a)=>Ve(n)?a.length>Et?Promise.reject(new b("FILE_TOO_LARGE",`Content is over ${Et} characters.`)):ee({channel:w,v:1,type:"file-write",id:y(E),payload:{path:n,content:a}}).then(h=>{if(!so(h))throw new b("HOST_REJECTED","Host did not confirm the write.");return h}):vt(),listDir:n=>(Ve(n)?ee({channel:w,v:1,type:"file-list",id:y(E),payload:{path:n}}):vt()).then(a=>{if(!io(a))throw new b("HOST_REJECTED","Host did not return directory entries.");return a}),stat:n=>(Ve(n)?ee({channel:w,v:1,type:"file-stat",id:y(E),payload:{path:n}}):vt()).then(a=>{if(!ao(a))throw new b("HOST_REJECTED","Host did not return file status.");return a}),generate:n=>{let a=n.prompt.trim(),h=n.system?.trim();if(a.length===0||a.length>St)return Promise.reject(new b("HOST_REJECTED",`Prompt must be 1 to ${St} characters.`));if(h!==void 0&&(h.length===0||h.length>Tt))return Promise.reject(new b("HOST_REJECTED",`System prompt must be 1 to ${Tt} characters.`));let k=n.maxOutputTokens===void 0?void 0:Math.min(Zt,Math.max(1,Math.floor(n.maxOutputTokens)));if(k!==void 0&&!Number.isFinite(k))return Promise.reject(new b("HOST_REJECTED","maxOutputTokens must be a number."));let P={prompt:a};return h!==void 0&&(P.system=h),k!==void 0&&(P.maxOutputTokens=k),ee({channel:w,v:1,type:"generate",id:y(E),payload:P},e.requestTimeoutMs??qt).then(L=>{if(!co(L))throw new b("HOST_REJECTED","Host did not return generated text.");return L})},onLateGenerateResult:n=>{D.add(n);for(let a of q.splice(0))F([n],a);return Vo(),()=>{D.delete(n)}},setBadge:n=>V({channel:w,v:1,type:"badge",id:y(E),payload:{count:to(n)}}),setHeight:n=>V({channel:w,v:1,type:"resize",id:y(E),payload:{height:oo(n)}}),onFileOpen:n=>(I.add(n),Xe||(Xe=!0,t.addEventListener("keydown",Wo,!0)),Re&&n(Re),()=>{I.delete(n)}),onFileSnapshot:n=>(oe=n,()=>{oe===n&&(oe=null)}),onFileSaved:n=>(ie.add(n),()=>{ie.delete(n)}),reportFileChange:n=>Nt({...j,type:"file-change",payload:{dirty:n.dirty,edited:n.edited}}),requestFileSave:Ko,reportFileUnsupported:()=>Nt({...j,type:"file-unsupported"}),dispose:()=>{for(let n of Se.keys())ce({...j,type:"workspace-unsubscribe",id:y(E),payload:{subscriptionId:n}});Se.clear();for(let n of Te.keys())ce({...j,type:"shells-unsubscribe",id:y(E),payload:{subscriptionId:n}});Te.clear(),ae=!0,T=null,C=null,oe=null,I.clear(),ie.clear(),Xe&&t.removeEventListener("keydown",Wo,!0),t.removeEventListener("message",jo),t.removeEventListener("keydown",Jo,!0),t.removeEventListener("pointerover",mt),t.removeEventListener("pointermove",mt),t.removeEventListener("pointerout",Yo),t.removeEventListener("focus",Zo),t.removeEventListener("blur",qo);for(let n of Ee.values())clearTimeout(n.timer),n.reject(new b("HOST_UNAVAILABLE","Host client was disposed."));Ee.clear(),i.clear(),c.clear(),d.clear(),p.clear(),u.clear(),_.clear(),M.clear(),v.clear(),G.clear(),D.clear(),q.length=0}}};var Ln=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var ui=new Set(Ln);var Gn=["none","agent","user"];var mi=new Set(Gn);var Xr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Br=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Pn=(e,t)=>{t.style.colorScheme=e.mode;for(let[o,r]of Xr)t.style.setProperty(o,e.tokens[r]);for(let[o,r,i]of Br){let c=e.tokens[i]??"";t.style.setProperty(o,c),t.style.setProperty(r,c)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},ho=(e,t)=>{Pn(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var zr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},$=(e,t)=>`var(--${e}, var(--oc-${zr[e]}, ${t}))`,ye=$("surface-background","transparent"),Ot=$("surface-elevated","transparent"),je=$("surface-elevated-foreground","inherit"),ue=$("surface-foreground","inherit"),H=$("surface-muted-foreground","gray"),Vr=$("surface-muted","transparent"),Ie=$("interactive-border","currentColor"),te=$("interactive-hover","transparent"),Ge=$("interactive-active","transparent"),ko=$("interactive-selection","transparent"),bo=$("interactive-selection-foreground","inherit"),_e=$("primary","currentColor"),xo=$("primary-text","inherit"),Eo=$("error-text","inherit"),jr=$("font-sans","inherit"),So=$("font-mono","monospace"),Fn=$("radius","9px"),To=`calc(${Fn} - 2px)`,Nn=`calc(${Fn} - 4px)`,X=(e,t,o="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${o})`,Dn=`background-image: linear-gradient(${te}, ${te});`,_o=e=>`box-shadow: inset 0 0 0 1px ${e}, var(--oc-sdk-field-lift);`,yo="box-shadow: inset 0 0 0 1px var(--oc-sdk-edge), var(--oc-sdk-raised-lift);",Hn="box-shadow: var(--oc-sdk-lit);",$n=`inset 0 1px 0 0 ${X(ue,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,Kr=`
:root {
  --oc-sdk-edge: ${X(ue,10)};
  --oc-sdk-field-bg: ${Ot};
  --oc-sdk-raised-bg: ${ye};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 0 0 1px rgb(0 0 0 / 0.1), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${X(ue,6)};
  --oc-sdk-field-bg: ${X(ye,50,Ot)};
  --oc-sdk-raised-bg: ${Ot};
  --oc-sdk-field-lift: ${$n};
  --oc-sdk-raised-lift: ${$n};
  --oc-sdk-lit: inset 0 1px 0 0 ${X(ue,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 0 0 1px rgb(0 0 0 / 0.36), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,wt=e=>{let t=$(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${$(`${e}-text`,"inherit")}; }`},Wr=`
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
`,Xn=`${Kr}
.oc-sdk { color: ${ue}; font-family: ${jr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Dn} }
.oc-sdk-mono { font-family: ${So}; }
.oc-sdk-muted { color: ${H}; }
${wt("success")}${wt("warning")}${wt("error")}${wt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${_e}; --oc-sdk-tone-text: ${xo}; }

.oc-sdk-btn { border-radius: ${To}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Nn}; }
.oc-sdk-btn[data-variant="default"] { color: ${xo}; background: ${X(_e,10,ye)}; border-color: ${X(_e,12)}; ${Hn} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${X(_e,16,ye)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${X(_e,22,ye)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Vr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${te}, ${te}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Ge}, ${Ge}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${je}; border-color: transparent; ${yo} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${te}, ${te}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Ge}, ${Ge}); box-shadow: inset 0 0 0 1px var(--oc-sdk-edge); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${te}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Ge}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${$("status-error","red")}; color: ${Eo}; background: ${X("var(--oc-sdk-tone)",7,ye)}; border-color: ${X("var(--oc-sdk-tone)",12)}; ${Hn} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${X("var(--oc-sdk-tone)",9,ye)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${X("var(--oc-sdk-tone)",11,ye)}; box-shadow: none; }

.oc-sdk-field-note { color: ${H}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Eo}; }
.oc-sdk-input { border-radius: ${To}; background: var(--oc-sdk-field-bg); color: ${je}; ${_o("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${H}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${te}, ${te}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${_o(X(ue,26))} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${_o($("status-error","red"))} }
.oc-sdk-input[data-mono="true"] { font-family: ${So}; }

.oc-sdk-search-icon { color: ${H}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${_e}; }
.oc-sdk-search-clear { border-radius: ${Nn}; color: ${H}; }
.oc-sdk-search-clear:hover { background: ${te}; color: ${ue}; }

.oc-sdk-trigger { border-color: transparent; border-radius: ${To}; background: var(--oc-sdk-raised-bg); color: ${je}; ${yo} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${te}, ${te}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Ge}, ${Ge}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${H}; }
.oc-sdk-trigger-chevron { color: ${H}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow, no border. */
.oc-sdk-popup { --surface-foreground: ${je}; border-color: transparent; border-radius: 12px; background: ${Ot}; color: ${je}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${te}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${ko}; color: ${bo}; }
.oc-sdk-option-check { color: ${ue}; }
.oc-sdk-option[data-destructive="true"] { color: ${Eo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${X($("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${H}; }
.oc-sdk-popup-empty { color: ${H}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ie}; border-radius: 4px; color: ${ue}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${X(ue,60,Ie)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ie}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ye}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${_e}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Dn} }
.oc-sdk-check-desc { color: ${H}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${X(ue,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${H}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${ue}; }
.oc-sdk-tab[aria-selected="true"] { color: ${bo}; background: ${ko}; border-color: ${Ie}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${je}; background: var(--oc-sdk-raised-bg); border-color: transparent; ${yo} }
.oc-sdk-tab-count { color: ${H}; }

.oc-sdk-badge { border-radius: 9999px; background: ${te}; color: ${H}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${X("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${te}; }
.oc-sdk-row[aria-selected="true"] { background: ${ko}; color: ${bo}; }
.oc-sdk-row-lead { font-family: ${So}; color: ${H}; }
.oc-sdk-row-sub { color: ${H}; }
.oc-sdk-row-meta { color: ${H}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${H}; }

.oc-sdk-empty-body { color: ${H}; }

.oc-sdk-spinner { color: ${H}; }
.oc-sdk-spinner-ring { border-color: ${Ie}; border-top-color: ${_e}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${X("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${H}; }

.oc-sdk-separator { color: ${H}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${X(Ie,40)}; }

.oc-sdk-progress-label { color: ${H}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${Ie}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${_e}); }

.oc-sdk-text a { color: ${xo}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${X(Ie,60)}; }
`,J=`
${$t}
${Wr}
${Xn}`;var Bn="oc-sdk-ui-style",Ke=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},Y=e=>{let t=document.getElementById(Bn);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}Ft(document);let o=document.createElement("style");o.id=Bn,o.textContent=e,document.head.appendChild(o)},U=(e,t)=>{let o=document.createElement(e);return t&&(o.className=t),o},xe=e=>{let t=U("button",e);return t.type="button",t},le=(e,t)=>{let o=t??"";e.textContent!==o&&(e.textContent=o)},We=(e,t,o)=>{o==null||o===""?e.removeAttribute(t):e.getAttribute(t)!==o&&e.setAttribute(t,o)},zn=(e,t)=>{let o=r=>{r.target instanceof Node&&e.contains(r.target)||t()};return document.addEventListener("pointerdown",o,!0),()=>{document.removeEventListener("pointerdown",o,!0)}};var Jr=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Ce=(e,t)=>{Y(J);let o=t,r=xe("oc-sdk oc-sdk-btn"),i=Jr(),c=document.createElement("span");r.append(c),e.append(r);let d=()=>{r.dataset.variant=o.variant??"default",r.dataset.size=o.size??"default",r.disabled=!!o.disabled||!!o.loading,r.dataset.loading=o.loading?"true":"false",r.setAttribute("aria-busy",o.loading?"true":"false"),o.loading&&i.parentNode!==r?r.prepend(i):!o.loading&&i.parentNode===r&&i.remove(),le(c,o.label)},p=()=>{o.disabled||o.loading||o.onClick()};return r.addEventListener("click",p),d(),{update:u=>{o={...o,...u},d()},dispose:()=>{r.removeEventListener("click",p),r.remove()}}};var Vn="http://www.w3.org/2000/svg",Yr={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Je=(e,t,o)=>{let r=document.createElementNS(Vn,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),o&&r.setAttribute("class",o);let i=document.createElementNS(Vn,"path");return i.setAttribute("d",Yr[e]),r.append(i),r};var Pe=(e,t="vertical")=>{let[o,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===o||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},Ye=(e,t,o)=>{let r=e.filter(u=>!u.disabled);if(r.length===0)return null;let i=r[0],c=r[r.length-1];if(o==="first"||!i||!c)return i?.id??null;if(o==="last")return c.id;let d=r.findIndex(u=>u.id===t);return d===-1?o==="next"?i.id:c.id:r[Math.min(r.length-1,Math.max(0,d+(o==="next"?1:-1)))]?.id??null};var jn=(e,t)=>`${e}-${t??""}`,vo=(e,t,o,r)=>{let i=xe("oc-sdk-option");i.id=jn(e,o.id),i.setAttribute("role",t),i.tabIndex=-1,i.disabled=!!o.disabled,t==="option"&&i.setAttribute("aria-selected",o.selected?"true":"false"),i.dataset.destructive=o.destructive?"true":"false";let c=U("span","oc-sdk-option-label");if(c.textContent=o.label,i.append(c),o.hint){let d=U("span","oc-sdk-option-hint");d.textContent=o.hint,i.append(d)}if(t==="option"){i.dataset.mark="check";let d=U("span","oc-sdk-option-check");d.append(Je("check",14)),i.append(d)}return i.addEventListener("pointerenter",r.hover),i.addEventListener("click",r.pick),i},Ao=(e,t,o,r)=>{let i=jn(o,r);for(let c of Array.from(e.children))c instanceof HTMLElement&&c.classList.contains("oc-sdk-option")&&(c.dataset.active=c.id===i?"true":"false");We(t,"aria-activedescendant",r?i:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Zr=(e,t)=>{let o=t.getBoundingClientRect();e.style.minWidth=`${Math.round(o.width)}px`,e.style.left=`${Math.round(o.left)}px`,e.style.top=`${Math.round(o.bottom+4)}px`;let r=e.offsetHeight,i=window.innerHeight-o.bottom-8;r>i&&o.top-8>i&&(e.style.top=`${Math.max(8,Math.round(o.top-4-r))}px`);let c=o.left+e.offsetWidth-window.innerWidth+8;c>0&&(e.style.left=`${Math.max(8,Math.round(o.left-c))}px`)},wo=(e,t,o,r)=>{e.append(o),Zr(o,t);let i=zn(e,r),c=()=>{r()},d=p=>{p.target instanceof Node&&o.contains(p.target)||r()};return window.addEventListener("resize",c),window.addEventListener("scroll",d,!0),()=>{i(),window.removeEventListener("resize",c),window.removeEventListener("scroll",d,!0),o.remove()}};var Kn=(e,t)=>{let o=t.trim().toLowerCase();return o?e.filter(r=>r.label.toLowerCase().includes(o)||r.id.toLowerCase().includes(o)):[...e]},qr=0,Oo=(e,t)=>{Y(J);let o=t,r=`oc-sdk-select-${qr+=1}`,i=U("div","oc-sdk oc-sdk-select"),c=U("span","oc-sdk-field-label");c.id=`${r}-label`;let d=xe("oc-sdk-trigger");d.setAttribute("aria-haspopup","listbox"),d.setAttribute("aria-labelledby",c.id);let p=U("span","oc-sdk-trigger-value");d.append(p,Je("chevron",14,"oc-sdk-trigger-chevron")),i.append(c,d),e.append(i);let u="",_=null,M=null,v=U("div","oc-sdk oc-sdk-popup"),G=U("div","oc-sdk-popup-search"),D=U("input","oc-sdk-input");D.type="text",D.autocomplete="off",G.append(D);let q=U("div");q.setAttribute("role","listbox"),q.tabIndex=-1,v.append(q);let T=()=>Kn(o.options,o.searchable?u:""),C=()=>o.searchable?D:q,I=S=>{_=S,Ao(q,C(),r,S)},ie=()=>{Ke(q);let S=T();if(S.length===0){let z=U("div","oc-sdk-popup-empty");z.textContent="No matches",q.append(z)}for(let z of S)q.append(vo(r,"option",{...z,selected:z.id===o.value},{hover:()=>I(z.id),pick:()=>Xe(z.id)}));I(S.some(z=>z.id===_)?_:S[0]?.id??null)},oe=()=>{let S=M;M=null,S?.(),u="",D.value="",d.setAttribute("aria-expanded","false")},Re=()=>{M||o.disabled||(_=o.value,D.placeholder=o.searchPlaceholder??"Search",o.searchable?v.prepend(G):G.remove(),ie(),M=wo(i,d,v,oe),d.setAttribute("aria-expanded","true"),C().focus())},Xe=S=>{oe(),d.focus(),S!==o.value&&o.onChange(S)},Ee=()=>{M?oe():Re()},Se=S=>{!M&&Pe(S)&&(S.preventDefault(),Re())},Te=S=>{let z=Pe(S);z?(S.preventDefault(),I(Ye(T(),_,z))):S.key==="Enter"?(S.preventDefault(),_&&Xe(_)):S.key==="Escape"?(S.preventDefault(),oe(),d.focus()):o.searchable&&S.target!==D&&S.key.length===1&&!S.ctrlKey&&!S.metaKey&&D.focus()},ae=()=>{u=D.value,ie()},E=S=>{M&&!(S.relatedTarget instanceof Node&&i.contains(S.relatedTarget))&&oe()},x=()=>{le(c,o.label),c.hidden=!o.label;let S=o.options.find(z=>z.id===o.value);le(p,S?.label??o.placeholder??"Select"),p.dataset.empty=S?"false":"true",d.disabled=!!o.disabled,M&&ie()};return d.addEventListener("click",Ee),d.addEventListener("keydown",Se),v.addEventListener("keydown",Te),D.addEventListener("input",ae),i.addEventListener("focusout",E),x(),{update:S=>{o={...o,...S},x()},dispose:()=>{oe(),d.removeEventListener("click",Ee),d.removeEventListener("keydown",Se),v.removeEventListener("keydown",Te),D.removeEventListener("input",ae),i.removeEventListener("focusout",E),i.remove()}}};var es=/^[a-z0-9][a-z0-9-]{0,63}$/,ts=new Set(["all","new"]),ne=class extends Error{constructor(t){super(t),this.name="GroupFileError"}},os=[{id:"macos-ui",name:"macOS UI",skillIds:["appkit-interop","swiftui-patterns","window-management","liquid-glass","view-refactor"]},{id:"macos-build",name:"macOS \u6784\u5EFA",skillIds:["build-run-debug","test-triage","swiftpm-macos","signing-entitlements","packaging-notarization","telemetry"]},{id:"reverse",name:"\u9006\u5411\u5DE5\u7A0B",skillIds:["reverse-engineering-unpacking","kuna-decompiler","reverse-engineer-anything"]},{id:"cloudflare",name:"Cloudflare",skillIds:["cloudflare","workers-best-practices","wrangler"]},{id:"video",name:"\u89C6\u9891",skillIds:["yichen-jianying-edit"]},{id:"browser",name:"\u6D4F\u89C8\u5668",skillIds:["browser-skill"]}],ns=()=>os.map(e=>({...e,skillIds:[...e.skillIds]})),Rt=e=>{let t=new Set(e.map(i=>i.id)),o=new Set(e.map(i=>i.name.trim().toLowerCase())),r=ns().filter(i=>{let c=i.name.toLowerCase();return t.has(i.id)||o.has(c)?!1:(t.add(i.id),o.add(c),!0)});return{groups:[...e,...r],added:r}},Wn=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new ne("\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E");let t=e;if(t.version!==1)throw new ne("\u5206\u7EC4\u914D\u7F6E\u7248\u672C\u4E0D\u53D7\u652F\u6301");if(!Array.isArray(t.groups))throw new ne("\u5206\u7EC4\u5217\u8868\u683C\u5F0F\u4E0D\u6B63\u786E");if(t.groups.length>50)throw new ne("\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 50 \u4E2A");let o=[],r=new Set,i=new Set;for(let[c,d]of t.groups.entries()){if(!d||typeof d!="object"||Array.isArray(d))throw new ne(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E`);let p=d;if(typeof p.id!="string"||!es.test(p.id)||ts.has(p.id))throw new ne(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548`);if(r.has(p.id))throw new ne(`\u5206\u7EC4 ID \u91CD\u590D\uFF1A${p.id}`);let u=typeof p.name=="string"?p.name.trim():"";if(!u||u.length>40||/[\u0000-\u001f\u007f]/.test(u))throw new ne(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-40 \u4E2A\u5B57\u7B26`);let _=u.toLowerCase();if(i.has(_))throw new ne(`\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A${u}`);if(!Array.isArray(p.skillIds))throw new ne(`\u5206\u7EC4\u300C${u}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E`);if(p.skillIds.length>200)throw new ne(`\u5206\u7EC4\u300C${u}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 200 \u4E2A`);let M=[],v=new Set;for(let G of p.skillIds){if(typeof G!="string"||!G||G.length>128)throw new ne(`\u5206\u7EC4\u300C${u}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID`);v.has(G)||(v.add(G),M.push(G))}r.add(p.id),i.add(_),o.push({id:p.id,name:u,skillIds:M})}return{version:1,groups:o}};var Jn=["\u4F60\u662F\u6280\u672F\u6587\u6863\u7FFB\u8BD1\u3002\u628A\u8F93\u5165\u7684\u6280\u80FD\u540D\u79F0\u548C\u63CF\u8FF0\u7FFB\u8BD1\u6210\u7B80\u4F53\u4E2D\u6587\u3002","\u4FDD\u7559\u6280\u80FD ID\u3001\u547D\u4EE4\u3001\u6587\u4EF6\u8DEF\u5F84\u3001\u4EE3\u7801\u3001\u4EA7\u54C1\u540D\u548C\u6280\u672F\u4E13\u6709\u540D\u8BCD\uFF0C\u4E0D\u8981\u7FFB\u8BD1\u4EE3\u7801\u5757\u3002","\u4E0D\u8981\u6DFB\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown\u3002",'\u53EA\u8F93\u51FA JSON\uFF1A{"items":[{"id":"\u539F\u6837 ID","nameZh":"\u4E2D\u6587\u540D\u79F0","descriptionZh":"\u4E2D\u6587\u63CF\u8FF0"}]}'].join(""),Yn=e=>JSON.stringify(e.map(t=>({id:t.id,name:t.name,description:t.description}))),Zn=e=>{let t=e.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"").trim(),o=t.indexOf("{"),r=t.lastIndexOf("}");if(o<0||r<=o)return[];t=t.slice(o,r+1);let i;try{i=JSON.parse(t)}catch{return[]}let c=i&&typeof i=="object"?i:null,d=Array.isArray(i)?i:Array.isArray(c?.items)?c.items:[],p=[];for(let u of d){if(!u||typeof u!="object")continue;let _=u;typeof _.id!="string"||!_.id||typeof _.nameZh!="string"||!_.nameZh.trim()||typeof _.descriptionZh=="string"&&p.push({id:_.id.slice(0,128),nameZh:_.nameZh.trim().slice(0,300),descriptionZh:_.descriptionZh.trim().slice(0,8e3)})}return p};var qn=`:root {
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
`;var Qn=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
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
`;var er=()=>typeof navigator<"u"&&navigator.language?navigator.language:"en",tr=e=>(e??"").toLowerCase().startsWith("zh")?"zh":"en",is=(e,t)=>t?e.replace(/\{(\w+)\}/g,(o,r)=>Object.prototype.hasOwnProperty.call(t,r)?String(t[r]):o):e;var or=(e,t=er())=>{let o=t||"en",r=tr(o);return{t:(c,d)=>is(r==="zh"?c:e[c]??c,d),get language(){return r},get locale(){return o},setLocale(c){let d=c||er(),p=tr(d);return o=d,p===r?!1:(r=p,!0)}}},Ro=e=>{document.documentElement.lang=e.language==="zh"?"zh-CN":"en"};var nr={\u6280\u80FD\u5F00\u5173:"Skills",\u91CD\u65B0\u626B\u63CF:"Rescan",\u5168\u90E8\u542F\u7528:"Enable all",\u5168\u90E8\u5173\u95ED:"Disable all",\u6280\u80FD\u8BF4\u660E\u8BED\u8A00:"Skill description language",\u7FFB\u8BD1:"Translate",\u539F\u6587:"Original",\u7F16\u8F91\u5206\u7EC4:"Edit groups",\u5173\u95ED\u7F16\u8F91:"Close editor","\u641C\u7D22\u540D\u79F0\u6216 ID":"Search name or ID",\u641C\u7D22\u6280\u80FD:"Search skills","\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002":"Manages ~/.config/opencode/skills. Disabling renames a skill entry to .disabled; OpenCode no longer loads it and the model cannot see it.","\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002":"Shows only file skills in this directory. Enable all before disabling or uninstalling the extension; rescan after skills change.",\u5168\u90E8:"All",\u5206\u7EC4\u7B5B\u9009:"Filter by group",\u51B2\u7A81:"Conflict",\u6DF7\u5408:"Mixed",\u5173\u95ED:"Disabled",\u5F00\u542F:"Enabled",\u5165\u53E3\u548C\u505C\u7528\u6587\u4EF6\u540C\u65F6\u5B58\u5728:"Both entry and disabled file exist","\u540C ID \u591A\u4E2A\u5165\u53E3":"Multiple entries for one ID","frontmatter \u65E0\u6CD5\u89E3\u6790":"Frontmatter could not be parsed",\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A:"Entry file is empty",\u5165\u53E3\u65E0\u6CD5\u8BFB\u53D6:"Entry cannot be read",\u4EC5\u624B\u52A8\u8C03\u7528:"Manual invocation only","\u6CA1\u6709 description":"No description",\u542F\u7528\u5165\u53E3:"Active entry",\u505C\u7528\u5165\u53E3:"Disabled entry",\u5165\u53E3:"Entry",\u4FDD\u7559\u542F\u7528:"Keep enabled",\u4FDD\u7559\u5173\u95ED:"Keep disabled",\u51B2\u7A81\u68C0\u67E5:"Conflict check","{blocking} \u9879\u9700\u8981\u5904\u7406 \xB7 {warnings} \u9879\u63D0\u793A":"To resolve: {blocking} \xB7 Warnings: {warnings}","\u63D0\u793A\uFF08{count}\uFF09":"Warnings ({count})","\u4EC5\u542F\u7528\u300C{name}\u300D\uFF1A\u5C06\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002":'Enable only "{name}": other skills disabled: {count}.',\u786E\u8BA4:"Confirm",\u53D6\u6D88:"Cancel","\u5C06\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002":"Skills to enable: {count}.","\u5C06\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002":"Skills to disable: {count}.",\u786E\u8BA4\u542F\u7528:"Confirm enable",\u786E\u8BA4\u5173\u95ED:"Confirm disable","\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026":"Reading skills\u2026","\u5C1A\u672A\u8BFB\u53D6\u6280\u80FD\u3002":"Skills not read yet.","\u5173\u95ED\u5165\u53E3\u6587\u6863\u540E\uFF0COpenCode \u4E0D\u4F1A\u518D\u53D1\u73B0\u8BE5\u6280\u80FD\u3002":"After disabling an entry document, OpenCode no longer discovers that skill.","\u6A21\u578B\u53EF\u89C1 {advertised} / \u5171 {total} \u4E2A \xB7 \u7EA6 {tokens} tokens/\u6B65":"Model sees {advertised} of {total} \xB7 about {tokens} tokens/step","{count} \u4E2A\u5DF2\u5173\u95ED":"Disabled: {count}","{count} \u9879\u963B\u585E\u51B2\u7A81":"Blocking conflicts: {count}",\u65E0\u963B\u585E\u51B2\u7A81:"No blocking conflicts","{count} \u9879\u63D0\u793A":"Warnings: {count}",\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6:"Skill directory cannot be read","{parts}\u3002\u4F30\u7B97\u4E0D\u542B\u5185\u7F6E\u548C\u9879\u76EE\u6280\u80FD\u3002":"{parts}. Estimates exclude built-in and project skills.","\u7FFB\u8BD1 {done}/{total}\u2026":"Translating {done}/{total}\u2026","{translated}/{total} \u5DF2\u7FFB\u8BD1":"{translated}/{total} translated","\u70B9\u201C\u7FFB\u8BD1\u201D\u751F\u6210\u4E2D\u6587":'Click "Translate" to generate Chinese',"{count} \u4E2A\u6709\u4E2D\u6587":"Chinese available: {count}",\u65E0\u6280\u80FD:"No skills",\u6709\u51B2\u7A81:"Has conflicts",\u5168\u5F00:"All on",\u5168\u5173:"All off",\u90E8\u5206:"Partial","\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}":"Cannot read group configuration: {error}",\u91CD\u65B0\u8BFB\u53D6:"Reload","\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002\u70B9\u300C\u7F16\u8F91\u5206\u7EC4\u300D\u65B0\u5EFA\uFF0C\u6216\u5728\u7F16\u8F91\u5668\u91CC\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4\u3002":'No groups yet. Click "Edit groups" to create one, or import example groups in the editor.',"\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0\u3002":"Enter a group name.","\u5206\u7EC4\u540D\u79F0\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A\u5B57\u7B26\u3002":"Group names cannot exceed {count} characters.","\u5DF2\u7ECF\u6709\u540D\u4E3A\u300C{name}\u300D\u7684\u5206\u7EC4\u3002":'A group named "{name}" already exists.',"\u5206\u7EC4\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u6210\u5458\u3002":"A group needs at least one member.","\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C{name}\u300D\u3002":'Group "{name}" saved.',"\u5DF2\u5220\u9664\u5206\u7EC4\u3002":"Group deleted.","\u793A\u4F8B\u5206\u7EC4\u7684\u540D\u79F0\u6216 ID \u90FD\u5DF2\u5B58\u5728\uFF0C\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u5206\u7EC4\u3002":"Every example group name or ID already exists; nothing to import.","\u5DF2\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\u3002":"Example groups imported: {count}.",\u9009\u62E9\u5206\u7EC4:"Choose a group",\u65B0\u5EFA\u5206\u7EC4:"New group",\u540D\u79F0:"Name","\u4F8B\u5982\uFF1A\u65E5\u5E38\u5F00\u53D1":"e.g. Daily development","\u6210\u5458\uFF08{count}\uFF09":"Members ({count})",\u5168\u9009:"Select all",\u6E05\u7A7A:"Clear","\u76EE\u5F55\u4E2D\u7F3A\u5931\uFF1A":"Missing from the directory:",\u4ECE\u5206\u7EC4\u79FB\u9664\u8FD9\u4E2A\u7F3A\u5931\u6210\u5458:"Remove this missing member from the group",\u5220\u9664\u5206\u7EC4:"Delete group",\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4:"Import example groups",\u4FDD\u5B58\u66F4\u6539:"Save changes","\u5220\u9664\u5206\u7EC4\u300C{name}\u300D\uFF1F\u6280\u80FD\u672C\u8EAB\u4E0D\u4F1A\u88AB\u5220\u9664\u3002":'Delete group "{name}"? The skills themselves are not deleted.',\u672A\u547D\u540D:"Unnamed",\u786E\u8BA4\u5220\u9664:"Confirm delete","\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\uFF1F\u5DF2\u6709\u540C\u540D\u6216\u540C ID \u7684\u5206\u7EC4\u4F1A\u8DF3\u8FC7\uFF0C\u5F53\u524D\u5206\u7EC4\u4E0D\u4F1A\u88AB\u8986\u76D6\u3002":"Import example groups: {count}? Groups with the same name or ID are skipped; the current group is not overwritten.",\u786E\u8BA4\u5BFC\u5165:"Confirm import","\u5206\u7EC4\u53EA\u5F71\u54CD\u9762\u677F\u7B5B\u9009\u548C\u6279\u91CF\u5F00\u5173\uFF0C\u4E0D\u6539\u53D8\u6280\u80FD\uFF1B\u6210\u5458\u987A\u5E8F\u51B3\u5B9A\u7EC4\u5185\u6B65\u9AA4\u53F7\uFF0C\u4FDD\u5B58\u540E\u5199\u5165 groups.json\u3002":"Groups only affect panel filtering and bulk toggles; they do not change skills. Member order sets step numbers and is saved to groups.json.","\u5168\u90E8 {count}":"All {count}","\u6B63\u5728\u8BFB\u53D6\u5206\u7EC4\u2026":"Reading groups\u2026","\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u4FEE\u590D\u6587\u4EF6\u540E\u91CD\u65B0\u8BFB\u53D6":"Cannot read the group configuration. Repair the file and reload.",\u6280\u80FD\u5217\u8868\u5C1A\u672A\u8BFB\u53D6:"Skills not read yet","{count} \u4E2A \xB7 {state}":"{state} \xB7 {count}","\u7F3A\u5931\uFF1A{names}":"Missing: {names}",\u542F\u7528\u6574\u7EC4:"Enable group",\u5173\u95ED\u6574\u7EC4:"Disable group",\u4EC5\u542F\u7528\u672C\u7EC4:"Enable only this group","\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u5148\u5904\u7406\u540E\u518D\u4EC5\u542F\u7528\u672C\u7EC4":"The group has missing skills. Resolve them before enabling only this group.","\u5DF2\u542F\u7528\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002":'Skills enabled in "{name}": {count}.',"\u5DF2\u5173\u95ED\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002":'Skills disabled in "{name}": {count}.',"\u5DF2\u542F\u7528\u300C{name}\u300D":'Enabled "{name}"',"\u5DF2\u5173\u95ED\u300C{name}\u300D":'Disabled "{name}"',"\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u672A\u6267\u884C\u3002":"The group has missing skills; nothing was run.","\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D\uFF0C\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002":'Enabled only "{name}"; other skills disabled: {count}.',"\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D":'Enabled only "{name}"',\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6:"Directory cannot be read",\u5148\u5904\u7406\u51B2\u7A81:"Resolve conflicts first",\u5904\u7406\u51B2\u7A81:"Resolve conflict",\u90E8\u5206\u5165\u53E3\u5173\u95ED:"Some entries disabled",\u6A21\u578B\u53EF\u89C1:"Visible to the model",\u6A21\u578B\u4E0D\u53EF\u89C1:"Not visible to the model",\u5165\u53E3\u5DF2\u5173\u95ED:"Entry disabled","\u7B2C {step} \u6B65":"Step {step}","\u65E0 description\uFF0C\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002":"No description; the model will not select it automatically.",\u6CA1\u6709\u53D1\u73B0\u6280\u80FD:"No skills found",\u8FD9\u4E2A\u5206\u7EC4\u6CA1\u6709\u53EF\u7528\u6280\u80FD:"This group has no available skills",\u6CA1\u6709\u5339\u914D\u7684\u6280\u80FD:"No matching skills","\u68C0\u67E5 ~/.config/opencode/skills \u662F\u5426\u5B58\u5728\uFF0C\u6216\u91CD\u65B0\u626B\u63CF\u3002":"Check that ~/.config/opencode/skills exists, or rescan.","\u68C0\u67E5\u5206\u7EC4\u91CC\u7684\u6280\u80FD\u662F\u5426\u88AB\u79FB\u9664\u3002":"Check whether the skills in this group were removed.","\u6362\u4E00\u4E2A\u641C\u7D22\u8BCD\u3002":"Try a different search term.","\u8BFB\u53D6\u4E2D\u2026":"Reading\u2026","\u5DF2\u542F\u7528 {name}\u3002":"Enabled {name}.","\u5DF2\u5173\u95ED {name}\uFF1BOpenCode \u4E0B\u4E00\u6B21\u626B\u63CF\u540E\u4E0D\u518D\u53D1\u73B0\u5B83\u3002":"Disabled {name}; OpenCode will no longer discover it after the next scan.","\u5DF2\u542F\u7528 {name}":"Enabled {name}","\u5DF2\u5173\u95ED {name}":"Disabled {name}","\u5DF2\u4FDD\u7559\u542F\u7528\u5165\u53E3{suffix}\u3002":"Kept the enabled entry{suffix}.","\u5DF2\u4FDD\u7559\u5173\u95ED\u5165\u53E3{suffix}\u3002":"Kept the disabled entry{suffix}.","\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A {path}":"; the old disabled file was backed up to {path}",\u5165\u53E3\u51B2\u7A81\u5DF2\u5904\u7406:"Entry conflict resolved","\u5DF2\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002":"Skills enabled: {count}.","\u5DF2\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002":"Skills disabled: {count}.","\u4E2D\u6587\u8BF4\u660E\u5DF2\u662F\u6700\u65B0\u3002":"Chinese descriptions are up to date.","\u7FFB\u8BD1\u5B8C\u6210\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}":"Translation finished, but saving the cache failed: {error}","\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\uFF0C{failed} \u4E2A\u5931\u8D25\uFF1B\u53EF\u518D\u70B9\u201C\u7FFB\u8BD1\u201D\u91CD\u8BD5\u3002":'Translated: {done}; failed: {failed}. Click "Translate" to retry.',"\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\u3002":"Translated skills: {done}.","\u670D\u52A1\u8FD4\u56DE\u7684\u6280\u80FD\u76EE\u5F55\u4FE1\u606F\u4E0D\u6B63\u786E\u3002":"The service returned invalid skill directory information.","\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002":"The service returned data in an unexpected format.","\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002":"The translation cache format is invalid.","\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u6570\u636E\uFF0C\u8BF7\u91CD\u8BD5\u3002":"The service returned unrecognized data. Try again.","\u8BF7\u6C42\u5931\u8D25\uFF08{status}\uFF09":"Request failed ({status})","\u8BF7\u5728\u8BBE\u7F6E \u2192 \u6269\u5C55\u4E2D\u5141\u8BB8\u201C\u6280\u80FD\u5F00\u5173\u201D\u8FD0\u884C\u672C\u5730\u670D\u52A1\u3002":'Allow "Skills" to run its local service in Settings \u2192 Extensions.',"\u672C\u5730\u670D\u52A1\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6269\u5C55\u540E\u91CD\u8BD5\u3002":"The local service is not ready. Reload the extension and try again.","\u6280\u80FD\u5F00\u5173\u6269\u5C55\u5DF2\u505C\u7528\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u542F\u7528\u3002":"The Skills extension is disabled. Enable it in extension settings.","\u672C\u5730\u670D\u52A1\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5\u3002":"The local service timed out. Try again.","\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u5141\u8BB8\u201C\u6A21\u578B\u8C03\u7528\u201D\u6743\u9650\uFF0C\u6216\u91CD\u65B0\u5B89\u88C5\u6269\u5C55\u3002":"Allow the model capability in extension settings, or reinstall the extension.","\u5F53\u524D\u5BBF\u4E3B\u6216\u6A21\u578B\u4E0D\u652F\u6301\u7FFB\u8BD1\u8BF7\u6C42\u3002":"The current host or model does not support translation requests.","\u65E0\u6CD5\u8FDE\u63A5\u672C\u5730\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u6269\u5C55\u6388\u6743\u3002":"Cannot connect to the local service. Check extension permissions.","\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002":"The operation failed. Try again.","\u672C\u5730\u670D\u52A1\u7248\u672C\u8FC7\u65E7\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u7981\u7528\u518D\u542F\u7528\u201C\u6280\u80FD\u5F00\u5173\u201D\u3002":'The local service is too old. Disable and re-enable "Skills" in extension settings.',"\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}\uFF08{path}\uFF09":"Cannot read the skill directory: {error} ({path})",\u63D0\u4EA4\u5185\u5BB9\u8FC7\u5927:"The submitted content is too large.","\u8BF7\u6C42\u4E2D\u65AD\uFF0C\u8BF7\u91CD\u8BD5":"The request was interrupted. Try again.","\u8BF7\u6C42\u5185\u5BB9\u5FC5\u987B\u662F\u6709\u6548\u7684 JSON \u5BF9\u8C61":"The request body must be a valid JSON object.","\u7F3A\u5C11 {key}":"Missing {key}.","{key} \u957F\u5EA6\u8D85\u51FA\u9650\u5236":"{key} exceeds the length limit.","{key} \u5FC5\u987B\u662F\u5E03\u5C14\u503C":"{key} must be a boolean.","{key} \u5FC5\u987B\u662F\u6280\u80FD ID \u6570\u7EC4":"{key} must be an array of skill IDs.","{key} \u6761\u76EE\u8FC7\u591A":"Too many {key} entries.","keep \u5FC5\u987B\u662F enabled \u6216 disabled":"keep must be enabled or disabled.","\u672C\u5730\u670D\u52A1\u5904\u7406\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5":"The local service failed to process the request. Try again.","\u65E0\u6CD5\u8BFB\u53D6\u5206\u7EC4\u914D\u7F6E\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u6743\u9650\u3002":"Could not read the group configuration. Check file permissions.","\u5206\u7EC4\u914D\u7F6E\u6587\u4EF6\u635F\u574F\uFF1B\u539F\u6587\u4EF6\u672A\u4FEE\u6539\uFF08~/.config/openchamber/skills-manager/groups.json\uFF09\u3002":"The group configuration is malformed; the original file was not changed (~/.config/openchamber/skills-manager/groups.json).","\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002":"The group configuration format is invalid.","\u4FDD\u5B58\u5206\u7EC4\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u76EE\u5F55\u6743\u9650\u3002":"Could not save the group configuration. Check directory permissions.",\u6743\u9650\u4E0D\u8DB3:"Permission denied",\u8DEF\u5F84\u4E0D\u5B58\u5728:"Path does not exist",\u4E0D\u662F\u76EE\u5F55:"Not a directory",\u662F\u76EE\u5F55:"Is a directory",\u6587\u4EF6\u7CFB\u7EDF\u9519\u8BEF:"File system error","\u5165\u53E3\u6587\u4EF6\u8D85\u8FC7 2 MB":"The entry file exceeds 2 MB","\u505C\u7528\u5165\u53E3\u8D85\u8FC7 2 MB":"The disabled entry exceeds 2 MB",\u65E0\u6CD5\u8BFB\u53D6\u5165\u53E3\u6587\u4EF6:"Could not read the entry file","\u65E0\u6CD5\u8BFB\u53D6 {directory}\uFF1A{reason}":"Could not read {directory}: {reason}","\u540C\u4E00\u76EE\u5F55\u540C\u65F6\u5B58\u5728\u542F\u7528\u548C\u505C\u7528\u5165\u53E3\uFF0C\u9700\u8981\u5148\u9009\u62E9\u4FDD\u7559\u54EA\u4E00\u4E2A\u3002":"Both an enabled and a disabled entry exist in the same directory. Choose which one to keep first.","\u65E0\u6CD5\u8BFB\u53D6\u5165\u53E3\uFF1A{reason}":"Could not read the entry: {reason}","frontmatter \u672A\u95ED\u5408\uFF0COpenCode \u53EF\u80FD\u8DF3\u8FC7\u6B64\u6280\u80FD\uFF1B\u5165\u53E3\u5F00\u5173\u4ECD\u53EF\u7528\u3002":"The frontmatter is not closed; OpenCode may skip this skill, but the entry switch still works.","\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A\uFF0COpenCode \u4E0D\u4F1A\u52A0\u8F7D\u5B83\u3002":"The entry file is empty; OpenCode will not load it.","\u65E0\uFF08\u5165\u53E3\u4E0D\u53EF\u52A0\u8F7D\uFF09":"None (entry cannot be loaded)","\u540C ID \u6709 {count} \u4E2A\u5165\u53E3\uFF1B\u751F\u6548\u5165\u53E3\uFF1A{winner}\u3002":"There are {count} entries with this ID; the effective entry is {winner}.","\u5165\u53E3\u5DF2\u542F\u7528\uFF0C\u4F46\u6807\u8BB0\u4E3A\u4EC5\u624B\u52A8\u8C03\u7528\uFF1B\u6A21\u578B\u770B\u4E0D\u5230\u5B83\u3002":"The entry is enabled but marked for manual invocation only; the model cannot see it.","\u5165\u53E3\u5DF2\u542F\u7528\uFF0C\u4F46\u6CA1\u6709 description\uFF1B\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002":"The entry is enabled but has no description; the model will not select it automatically.","\u76EE\u6807\u5165\u53E3\u5DF2\u5B58\u5728\uFF1A{path}":"The target entry already exists: {path}","\u5165\u53E3\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\uFF1A{path}":"The entry changed. Rescan: {path}","\u68C0\u67E5\u5165\u53E3\u5931\u8D25\uFF1A{reason}":"Could not inspect the entry: {reason}","\u6539\u540D\u540E\u6821\u9A8C\u5931\u8D25\uFF1A{path}":"Verification failed after renaming: {path}","\u6539\u540D\u5931\u8D25\uFF1A{reason}":"Rename failed: {reason}","\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{reason}":"Could not read the skill directory: {reason}",\u672A\u77E5\u5165\u53E3:"Unknown entry","\u6CA1\u6709\u627E\u5230\u6280\u80FD {id}":"Skill {id} was not found.","\u6280\u80FD {id} \u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\u3002":"Skill {id} has unresolved entry conflicts.","\u65E0\u6CD5\u8BC6\u522B\u505C\u7528\u5165\u53E3\uFF1A{path}":"Could not identify the disabled entry: {path}","\u540C\u4E00\u4E2A\u6280\u80FD\u4E0D\u80FD\u540C\u65F6\u542F\u7528\u548C\u5173\u95ED\u3002":"A skill cannot be enabled and disabled at the same time.","\u4E00\u6B21\u5904\u7406\u7684\u6280\u80FD\u8FC7\u591A\u3002":"Too many skills in one operation.","\u8FD8\u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\uFF0C\u4E0D\u80FD\u6279\u91CF\u64CD\u4F5C\u3002":"Unresolved entry conflicts remain; bulk operations are blocked.","\u6CA1\u6709\u627E\u5230\u8FD9\u4E2A\u5165\u53E3\u51B2\u7A81\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\u3002":"This entry conflict was not found. Rescan.","\u65E0\u6CD5\u8BFB\u53D6\u7FFB\u8BD1\u7F13\u5B58\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u6743\u9650\u3002":"Could not read the translation cache. Check file permissions.","\u7FFB\u8BD1\u7F13\u5B58\u6587\u4EF6\u635F\u574F\uFF1B\u539F\u6587\u4EF6\u672A\u4FEE\u6539\u3002":"The translation cache is malformed; the original file was not changed.","\u7FFB\u8BD1\u7F13\u5B58\u6761\u76EE\u8FC7\u591A\u3002":"The translation cache has too many entries.","\u4FDD\u5B58\u7FFB\u8BD1\u7F13\u5B58\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u76EE\u5F55\u6743\u9650\u3002":"Could not save the translation cache. Check directory permissions.",\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E:"The group configuration format is invalid.",\u5206\u7EC4\u914D\u7F6E\u7248\u672C\u4E0D\u53D7\u652F\u6301:"The group configuration version is not supported.",\u5206\u7EC4\u5217\u8868\u683C\u5F0F\u4E0D\u6B63\u786E:"The group list format is invalid.","\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A":"At most {count} groups are allowed.","\u7B2C {index} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E":"Group {index} has an invalid format.","\u7B2C {index} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548":"Group {index} has an invalid ID.","\u5206\u7EC4 ID \u91CD\u590D\uFF1A{id}":"Duplicate group ID: {id}","\u7B2C {index} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-{max} \u4E2A\u5B57\u7B26":"Group {index} names must be 1\u2013{max} characters.","\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A{name}":"Duplicate group name: {name}","\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E":'The members of group "{name}" have an invalid format.',"\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A":'Group "{name}" cannot have more than {count} members.',"\u5206\u7EC4\u300C{name}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID":'Group "{name}" contains an invalid skill ID.'},Ze=or(nr),{t:as}=Ze,cs=[{pattern:/^缺少 (.+)$/,template:"\u7F3A\u5C11 {key}",values:e=>({key:e[1]})},{pattern:/^(.+) 长度超出限制$/,template:"{key} \u957F\u5EA6\u8D85\u51FA\u9650\u5236",values:e=>({key:e[1]})},{pattern:/^(.+) 必须是布尔值$/,template:"{key} \u5FC5\u987B\u662F\u5E03\u5C14\u503C",values:e=>({key:e[1]})},{pattern:/^(.+) 必须是技能 ID 数组$/,template:"{key} \u5FC5\u987B\u662F\u6280\u80FD ID \u6570\u7EC4",values:e=>({key:e[1]})},{pattern:/^(.+) 条目过多$/,template:"{key} \u6761\u76EE\u8FC7\u591A",values:e=>({key:e[1]})},{pattern:/^无法读取 (.+)：(.+)$/,template:"\u65E0\u6CD5\u8BFB\u53D6 {directory}\uFF1A{reason}",values:e=>({directory:e[1],reason:e[2]})},{pattern:/^无法读取入口：(.+)$/,template:"\u65E0\u6CD5\u8BFB\u53D6\u5165\u53E3\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^同 ID 有 (\d+) 个入口；生效入口：(.+)。$/,template:"\u540C ID \u6709 {count} \u4E2A\u5165\u53E3\uFF1B\u751F\u6548\u5165\u53E3\uFF1A{winner}\u3002",values:e=>({count:e[1],winner:e[2]})},{pattern:/^目标入口已存在：(.+)$/,template:"\u76EE\u6807\u5165\u53E3\u5DF2\u5B58\u5728\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^入口已变化，请重新扫描：(.+)$/,template:"\u5165\u53E3\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^检查入口失败：(.+)$/,template:"\u68C0\u67E5\u5165\u53E3\u5931\u8D25\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^改名后校验失败：(.+)$/,template:"\u6539\u540D\u540E\u6821\u9A8C\u5931\u8D25\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^改名失败：(.+)$/,template:"\u6539\u540D\u5931\u8D25\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^技能目录无法读取：(.+)$/,template:"\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^没有找到技能 (.+)$/,template:"\u6CA1\u6709\u627E\u5230\u6280\u80FD {id}",values:e=>({id:e[1]})},{pattern:/^技能 (.+) 有未解决的入口冲突。$/,template:"\u6280\u80FD {id} \u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\u3002",values:e=>({id:e[1]})},{pattern:/^无法识别停用入口：(.+)$/,template:"\u65E0\u6CD5\u8BC6\u522B\u505C\u7528\u5165\u53E3\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^分组不能超过 (\d+) 个$/,template:"\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A",values:e=>({count:e[1]})},{pattern:/^第 (\d+) 个分组格式不正确$/,template:"\u7B2C {index} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E",values:e=>({index:e[1]})},{pattern:/^第 (\d+) 个分组的 ID 无效$/,template:"\u7B2C {index} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548",values:e=>({index:e[1]})},{pattern:/^分组 ID 重复：(.+)$/,template:"\u5206\u7EC4 ID \u91CD\u590D\uFF1A{id}",values:e=>({id:e[1]})},{pattern:/^第 (\d+) 个分组名称需为 1-(\d+) 个字符$/,template:"\u7B2C {index} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-{max} \u4E2A\u5B57\u7B26",values:e=>({index:e[1],max:e[2]})},{pattern:/^分组名称重复：(.+)$/,template:"\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A{name}",values:e=>({name:e[1]})},{pattern:/^分组「(.+)」的成员格式不正确$/,template:"\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E",values:e=>({name:e[1]})},{pattern:/^分组「(.+)」的成员不能超过 (\d+) 个$/,template:"\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A",values:e=>({name:e[1],count:e[2]})},{pattern:/^分组「(.+)」含无效的技能 ID$/,template:"\u5206\u7EC4\u300C{name}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID",values:e=>({name:e[1]})}],ve=(e,t=as)=>{if(e==null||!/[\u4e00-\u9fff]/.test(e))return e??null;if(Object.prototype.hasOwnProperty.call(nr,e))return t(e);for(let o of cs){let r=e.match(o.pattern);if(r){let i=o.values(r),c=Object.fromEntries(Object.entries(i).map(([d,p])=>[d,ve(p,t)??p]));return t(o.template,c)}}return e};var{t:s}=Ze,Oe=go({requestTimeoutMs:3e4}),fr=document.querySelector("#root");if(!fr)throw new Error("Missing #root");var mr=document.createElement("style");mr.textContent=Qn+qn;document.head.append(mr);var l=(e,t="",o)=>{let r=document.createElement(e);return r.className=t,o!==void 0&&(r.textContent=o),r},ge=class extends Error{code;conflicts;constructor(t,o,r){super(t),this.name="ServiceError",this.code=o,this.conflicts=r}},ls=e=>e==="enabled"||e==="disabled"||e==="mixed"||e==="conflict",ds=e=>e==="both"||e==="duplicate"||e==="invalid"||e==="empty"||e==="read-error"||e==="manual"||e==="no-description",nt=(e,t="")=>typeof e=="string"?e:t,rr=e=>typeof e=="string"&&e.length>0?e:null,Ut=e=>e===!0,gr=e=>typeof e=="number"&&Number.isFinite(e)?e:0,sr=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],$o=e=>{if(!e||typeof e!="object")return null;let t=e;return!ds(t.kind)||typeof t.skillId!="string"?null:{kind:t.kind,skillId:t.skillId,message:nt(t.message,s("\u51B2\u7A81")),activePath:rr(t.activePath),disabledPath:rr(t.disabledPath),blocking:Ut(t.blocking)}},ps=e=>{if(!e||typeof e!="object")return null;let t=e;return typeof t.id!="string"||!t.id||!ls(t.state)?null:{id:t.id,name:nt(t.name,t.id),description:nt(t.description),state:t.state,advertised:Ut(t.advertised),autoInvokeOff:Ut(t.autoInvokeOff),activePaths:sr(t.activePaths),disabledPaths:sr(t.disabledPaths),conflicts:Array.isArray(t.conflicts)?t.conflicts.map($o).filter(o=>o!==null):[],warnings:Array.isArray(t.warnings)?t.warnings.filter(o=>typeof o=="string"):[],estimatedTokens:gr(t.estimatedTokens),contentHash:nt(t.contentHash)}},us=e=>{if(!e||typeof e!="object")throw new ge(s("\u670D\u52A1\u8FD4\u56DE\u7684\u6280\u80FD\u76EE\u5F55\u4FE1\u606F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let t=e;return{path:nt(t.path),exists:Ut(t.exists),error:typeof t.error=="string"?t.error:null}},Fe=e=>{if(!e||typeof e!="object")throw new ge(s("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let t=e;if(!Array.isArray(t.skills))throw new ge(s("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let o=t.skills.map(ps).filter(d=>d!==null),r=Array.isArray(t.conflicts)?t.conflicts.map($o).filter(d=>d!==null):o.flatMap(d=>d.conflicts),i=r.filter(d=>d.blocking).length,c={total:o.length,advertised:o.filter(d=>d.advertised).length,disabled:o.filter(d=>d.state==="disabled").length,blockingConflicts:i,warnings:r.length-i,estimatedTokens:o.reduce((d,p)=>d+p.estimatedTokens,0)};return{skills:o,conflicts:r,summary:c,root:us(t.root),scannedAt:gr(t.scannedAt)}},fs=()=>({version:1,locale:"zh-CN",entries:{}}),hr=e=>{if(!e||typeof e!="object")throw new ge(s("\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let t=e;if(t.version!==1||t.locale!=="zh-CN"||!t.entries||typeof t.entries!="object"||Array.isArray(t.entries))throw new ge(s("\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let o={};for(let[r,i]of Object.entries(t.entries)){if(!i||typeof i!="object")continue;let c=i;typeof c.hash!="string"||typeof c.nameZh!="string"||typeof c.descriptionZh!="string"||typeof c.updatedAt!="number"||(o[r]={hash:c.hash,nameZh:c.nameZh.trim(),descriptionZh:c.descriptionZh.trim(),updatedAt:c.updatedAt})}return{version:1,locale:"zh-CN",entries:o}},Gt=e=>{try{return Wn(e).groups}catch(t){throw new ge(t instanceof Error?ve(t.message)??t.message:s("\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[])}},pe=async(e,t,o)=>{let r=await Oe.serviceRequest({method:e,path:t,...o===void 0?{}:{body:JSON.stringify(o)}}),i;try{i=JSON.parse(r.body)}catch{throw new ge(s("\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u6570\u636E\uFF0C\u8BF7\u91CD\u8BD5\u3002"),"parse",[])}if(r.status>=400){let c=i&&typeof i=="object"?i:{},d=typeof c.error=="string"?ve(c.error)??c.error:s("\u8BF7\u6C42\u5931\u8D25\uFF08{status}\uFF09",{status:r.status}),p=typeof c.code=="string"?c.code:null,u=Array.isArray(c.conflicts)?c.conflicts.map($o).filter(_=>_!==null):[];throw new ge(d,p,u)}return i},Q=e=>e instanceof b?e.code==="NO_SERVICE"?s("\u8BF7\u5728\u8BBE\u7F6E \u2192 \u6269\u5C55\u4E2D\u5141\u8BB8\u201C\u6280\u80FD\u5F00\u5173\u201D\u8FD0\u884C\u672C\u5730\u670D\u52A1\u3002"):e.code==="SERVICE_FAILED"?s("\u672C\u5730\u670D\u52A1\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6269\u5C55\u540E\u91CD\u8BD5\u3002"):e.code==="DISABLED"?s("\u6280\u80FD\u5F00\u5173\u6269\u5C55\u5DF2\u505C\u7528\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u542F\u7528\u3002"):e.code==="HOST_TIMEOUT"?s("\u672C\u5730\u670D\u52A1\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5\u3002"):e.code==="NOT_GRANTED"?s("\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u5141\u8BB8\u201C\u6A21\u578B\u8C03\u7528\u201D\u6743\u9650\uFF0C\u6216\u91CD\u65B0\u5B89\u88C5\u6269\u5C55\u3002"):e.code==="UNSUPPORTED"?s("\u5F53\u524D\u5BBF\u4E3B\u6216\u6A21\u578B\u4E0D\u652F\u6301\u7FFB\u8BD1\u8BF7\u6C42\u3002"):s("\u65E0\u6CD5\u8FDE\u63A5\u672C\u5730\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u6269\u5C55\u6388\u6743\u3002"):e instanceof ge?ve(e.message)??e.message:ve(e instanceof Error?e.message:null)??s("\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"),ms=e=>e instanceof ge&&e.code==="not-found"?s("\u672C\u5730\u670D\u52A1\u7248\u672C\u8FC7\u65E7\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u7981\u7528\u518D\u542F\u7528\u201C\u6280\u80FD\u5F00\u5173\u201D\u3002"):Q(e),lt=l("main","ext sk");lt.setAttribute("aria-label",s("\u6280\u80FD\u5F00\u5173"));var kr=l("header","sk-header"),br=l("div","sk-title-row"),xr=l("h1","sk-title",s("\u6280\u80FD\u5F00\u5173")),Pt=l("div","sk-actions"),gs=Ce(Pt,{label:s("\u91CD\u65B0\u626B\u63CF"),variant:"outline",size:"sm",onClick:()=>{Ho(!0),Lt()}}),Er=Ce(Pt,{label:s("\u5168\u90E8\u542F\u7528"),variant:"outline",size:"sm",onClick:()=>Cr(!0)}),Sr=Ce(Pt,{label:s("\u5168\u90E8\u5173\u95ED"),variant:"outline",size:"sm",onClick:()=>Cr(!1)});br.append(xr,Pt);var Lo=l("p","sk-summary"),Go=l("p","sk-summary sk-summary-secondary"),Tr=l("div","sk-translation-row"),dt=l("div","sk-segment");dt.setAttribute("role","group");dt.setAttribute("aria-label",s("\u6280\u80FD\u8BF4\u660E\u8BED\u8A00"));var Ne=l("button","sk-segment-button",s("\u7FFB\u8BD1"));Ne.type="button";Ne.setAttribute("aria-pressed","false");var et=l("button","sk-segment-button",s("\u539F\u6587"));et.type="button";et.setAttribute("aria-pressed","true");dt.append(Ne,et);var rt=l("span","sk-translation-status");rt.setAttribute("aria-live","polite");Tr.append(dt,rt);kr.append(br,Lo,Go,Tr);var _r=l("div","sk-body"),de=l("div","sk-notice-root");de.setAttribute("aria-live","polite");var It=l("div","sk-groups-note"),yr=l("div","sk-groups-row"),st=l("div","sk-groups"),Fo=l("div","sk-group-select"),be=l("button","sk-chip sk-groups-edit",s("\u7F16\u8F91\u5206\u7EC4"));be.type="button";be.setAttribute("aria-pressed","false");be.addEventListener("click",()=>{R?Rr():Rs()});yr.append(st,Fo,be);var qe=l("div","sk-group-editor-root"),Po=l("div"),ct=l("div"),Le=l("input","sk-search");Le.type="search";Le.placeholder=s("\u641C\u7D22\u540D\u79F0\u6216 ID");Le.setAttribute("aria-label",s("\u641C\u7D22\u6280\u80FD"));Le.addEventListener("input",()=>{No=Le.value.trim().toLowerCase(),Ir()});var it=l("div","sk-list");it.setAttribute("role","list");var vr=l("footer","sk-footer"),Ar=l("p","",s("\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002")),wr=l("p","",s("\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002"));vr.append(Ar,wr);_r.append(de,It,yr,qe,Po,ct,Le,it,vr);lt.append(kr,_r);fr.append(lt);var g=null,Qe=fs(),Ue="original",Xo=!1,at=!1,Mt={done:0,total:0},fe=null,re=!1,Me=null,A=null,m=null,me=null,se=null,W=null,N=[],he=null,Ae=!0,R=null,Z=null,De=!1,He=!1,No="",ir=!1,hs=Oo(Fo,{value:"all",options:[{id:"all",label:s("\u5168\u90E8")}],onChange:e=>{W=e==="all"?null:e,f()}}),Ct=Fo.querySelector(".oc-sdk-trigger");Ct&&(Ct.setAttribute("aria-label",s("\u5206\u7EC4\u7B5B\u9009")),Ct.removeAttribute("aria-labelledby"));var we=()=>!!g?.root.error,ks=e=>e.state==="conflict"?"error":e.state==="mixed"?"warning":e.state==="disabled"?"info":e.advertised?"success":"warning",bs=e=>e.state==="conflict"?s("\u51B2\u7A81"):e.state==="mixed"?s("\u6DF7\u5408"):e.state==="disabled"?s("\u5173\u95ED"):s("\u5F00\u542F"),xs=(e,t="neutral")=>{let o=l("span","sk-badge",e);return o.dataset.tone=t,o},Es=e=>{switch(e){case"both":return s("\u5165\u53E3\u548C\u505C\u7528\u6587\u4EF6\u540C\u65F6\u5B58\u5728");case"duplicate":return s("\u540C ID \u591A\u4E2A\u5165\u53E3");case"invalid":return s("frontmatter \u65E0\u6CD5\u89E3\u6790");case"empty":return s("\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A");case"read-error":return s("\u5165\u53E3\u65E0\u6CD5\u8BFB\u53D6");case"manual":return s("\u4EC5\u624B\u52A8\u8C03\u7528");case"no-description":return s("\u6CA1\u6709 description");default:return s("\u51B2\u7A81")}},Io=(e,t)=>{if(!t)return null;let o=l("p","sk-path");return o.append(l("span","sk-path-label",`${e}\uFF1A`),l("code","",t)),o},B=(e,t,o=!1,r=!1)=>{let i=l("button",o?"sk-inline-button sk-inline-primary":"sk-inline-button",e);return i.type="button",i.disabled=!!m||r,i.addEventListener("click",t),i},ar=e=>{let t=l("li","sk-conflict-item");t.dataset.tone=e.blocking?"error":"warning";let o=l("div","sk-conflict-copy");if(o.append(l("strong","",Es(e.kind)),l("p","sk-conflict-message",ve(e.message)??e.message)),e.kind==="both"?(o.append(Io(s("\u542F\u7528\u5165\u53E3"),e.activePath)??l("span")),o.append(Io(s("\u505C\u7528\u5165\u53E3"),e.disabledPath)??l("span"))):(e.activePath??e.disabledPath)&&o.append(Io(s("\u5165\u53E3"),e.activePath??e.disabledPath)??l("span")),t.append(o),e.kind==="both"&&e.activePath){let r=l("div","sk-conflict-actions");r.append(B(s("\u4FDD\u7559\u542F\u7528"),()=>void pr(e,"enabled"),!1,we()),B(s("\u4FDD\u7559\u5173\u95ED"),()=>void pr(e,"disabled"),!1,we())),t.append(r)}return t},Ss=()=>{if(ct.replaceChildren(),!g)return;let t=[...g.root.error?[{kind:"read-error",skillId:"",message:s("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}\uFF08{path}\uFF09",{error:ve(g.root.error)??g.root.error,path:g.root.path}),activePath:null,disabledPath:null,blocking:!0}]:[],...g.conflicts],o=t.filter(d=>d.blocking),r=t.filter(d=>!d.blocking);if(o.length===0&&r.length===0)return;let i=l("section","sk-conflicts");i.setAttribute("aria-label",s("\u51B2\u7A81\u68C0\u67E5"));let c=l("div","sk-section-head");if(c.append(l("h2","sk-section-title",s("\u51B2\u7A81\u68C0\u67E5")),l("span","sk-section-count",s("{blocking} \u9879\u9700\u8981\u5904\u7406 \xB7 {warnings} \u9879\u63D0\u793A",{blocking:o.length,warnings:r.length}))),i.append(c),o.length>0){let d=l("ul","sk-conflict-list");for(let p of o)d.append(ar(p));i.append(d)}if(r.length>0){let d=l("details","sk-warning-details");d.append(l("summary","",s("\u63D0\u793A\uFF08{count}\uFF09",{count:r.length})));let p=l("ul","sk-conflict-list");for(let u of r)p.append(ar(u));d.append(p),i.append(d)}ct.append(i)},Ts=()=>{if(de.replaceChildren(),se){let e=se,t=new Set(e.skillIds),o=g?g.skills.filter(c=>!t.has(c.id)).length:0,r=l("div","sk-notice",s("\u4EC5\u542F\u7528\u300C{name}\u300D\uFF1A\u5C06\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:o}));r.dataset.tone="warning",r.setAttribute("role","status");let i=l("div","sk-notice-actions");i.append(B(s("\u786E\u8BA4"),()=>void Hs(),!0),B(s("\u53D6\u6D88"),()=>{se=null,f()})),r.append(i),de.append(r);return}if(me!==null){let e=g?g.skills.filter(r=>(me?r.disabledPaths.length:r.activePaths.length)>0).length:0,t=l("div","sk-notice",me?s("\u5C06\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002",{count:e}):s("\u5C06\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002",{count:e}));t.dataset.tone="warning",t.setAttribute("role","status");let o=l("div","sk-notice-actions");o.append(B(s(me?"\u786E\u8BA4\u542F\u7528":"\u786E\u8BA4\u5173\u95ED"),()=>void Vs(),!0),B(s("\u53D6\u6D88"),()=>{me=null,f()})),t.append(o),de.append(t);return}if(A){let e=l("div","sk-notice",A.text);if(e.dataset.tone=A.tone,e.setAttribute("role",A.tone==="error"?"alert":"status"),A.actions?.length){let t=l("div","sk-notice-actions");for(let o of A.actions)t.append(B(o.label,o.onClick,o.primary));e.append(t)}de.append(e);return}if(Me){let e=l("div","sk-notice",Me);e.dataset.tone="error",e.setAttribute("role","alert"),de.append(e);return}if(fe){let e=l("div","sk-notice",fe);e.dataset.tone="error",e.setAttribute("role","alert"),de.append(e);return}if(re&&!g){let e=l("div","sk-notice",s("\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026"));e.dataset.tone="info",e.setAttribute("role","status"),de.append(e)}},_s=()=>{if(!g){Lo.textContent=s(re?"\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026":"\u5C1A\u672A\u8BFB\u53D6\u6280\u80FD\u3002"),Go.textContent=s("\u5173\u95ED\u5165\u53E3\u6587\u6863\u540E\uFF0COpenCode \u4E0D\u4F1A\u518D\u53D1\u73B0\u8BE5\u6280\u80FD\u3002");return}Lo.textContent=s("\u6A21\u578B\u53EF\u89C1 {advertised} / \u5171 {total} \u4E2A \xB7 \u7EA6 {tokens} tokens/\u6B65",{advertised:g.summary.advertised,total:g.summary.total,tokens:g.summary.estimatedTokens.toLocaleString(Ze.locale)});let e=[s("{count} \u4E2A\u5DF2\u5173\u95ED",{count:g.summary.disabled})];g.summary.blockingConflicts>0?e.push(s("{count} \u9879\u963B\u585E\u51B2\u7A81",{count:g.summary.blockingConflicts})):e.push(s("\u65E0\u963B\u585E\u51B2\u7A81")),g.summary.warnings>0&&e.push(s("{count} \u9879\u63D0\u793A",{count:g.summary.warnings})),g.root.error&&e.push(s("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6")),Go.textContent=s("{parts}\u3002\u4F30\u7B97\u4E0D\u542B\u5185\u7F6E\u548C\u9879\u76EE\u6280\u80FD\u3002",{parts:e.join(" \xB7 ")})},pt=e=>{let t=Qe.entries[e.id];return t&&t.hash===e.contentHash?t:null},ys=()=>g?.skills.filter(e=>pt(e)).length??0,vs=e=>Ue!=="translated"?e.name:pt(e)?.nameZh||e.name;var As=()=>{Ne.setAttribute("aria-pressed",Ue==="translated"?"true":"false"),et.setAttribute("aria-pressed",Ue==="original"?"true":"false"),Ne.disabled=at;let e=g?.skills.length??0,t=ys();at?rt.textContent=s("\u7FFB\u8BD1 {done}/{total}\u2026",{done:Mt.done,total:Mt.total}):Ue==="translated"?rt.textContent=t?s("{translated}/{total} \u5DF2\u7FFB\u8BD1",{translated:t,total:e}):s("\u70B9\u201C\u7FFB\u8BD1\u201D\u751F\u6210\u4E2D\u6587"):rt.textContent=t?s("{count} \u4E2A\u6709\u4E2D\u6587",{count:t}):""},$e=e=>e.skillIds.filter(t=>g?.skills.some(o=>o.id===t)),Or=e=>{let t=$e(e).map(r=>g?.skills.find(i=>i.id===r)).filter(r=>!!r);if(t.length===0)return s("\u65E0\u6280\u80FD");if(t.some(r=>r.state==="conflict"))return s("\u6709\u51B2\u7A81");let o=t.filter(r=>r.state==="enabled").length;return o===t.length?s("\u5168\u5F00"):s(o===0?"\u5168\u5173":"\u90E8\u5206")},cr=e=>{Array.from(st.querySelectorAll("[data-group]")).find(o=>o.dataset.group===e)?.focus()},ws=()=>`custom-${globalThis.crypto?.randomUUID?.().slice(0,8)??Math.random().toString(36).slice(2,10)}`,Os=()=>{if(It.replaceChildren(),he){let e=l("div","sk-notice",s("\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}",{error:he}));e.dataset.tone="error",e.setAttribute("role","alert");let t=l("div","sk-notice-actions");t.append(B(s("\u91CD\u65B0\u8BFB\u53D6"),()=>void Lt(),!1,Ae)),e.append(t),It.append(e);return}Ae||N.length>0||!g||we()||It.append(l("div","sk-notice",s("\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002\u70B9\u300C\u7F16\u8F91\u5206\u7EC4\u300D\u65B0\u5EFA\uFF0C\u6216\u5728\u7F16\u8F91\u5668\u91CC\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4\u3002")))},Do=e=>{R={id:e?.id??null,name:e?.name??"",members:e?[...e.skillIds]:[]},Z=null,De=!1,He=!1,f();let t=qe.querySelector(".sk-group-name");t?.focus(),t?.select()},Rs=()=>{if(he||Ae||!g||we())return;let e=N.find(t=>t.id===W)??N[0]??null;Do(e),qe.scrollIntoView({block:"nearest"})},Rr=()=>{m||(R=null,Z=null,De=!1,He=!1,f(),be.focus())},Is=e=>{if(e==="new"){Do(null);return}let t=N.find(o=>o.id===e);t&&Do(t)},Co=()=>{qe.querySelector(".sk-group-name")?.focus()},lr=async()=>{let e=R;if(!e||m||he)return;let t=e.name.trim();if(!t){Z=s("\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0\u3002"),f(),Co();return}if(t.length>40){Z=s("\u5206\u7EC4\u540D\u79F0\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A\u5B57\u7B26\u3002",{count:40}),f(),Co();return}if(N.some(c=>c.id!==e.id&&c.name.trim().toLowerCase()===t.toLowerCase())){Z=s("\u5DF2\u7ECF\u6709\u540D\u4E3A\u300C{name}\u300D\u7684\u5206\u7EC4\u3002",{name:t}),f(),Co();return}if(e.members.length===0){Z=s("\u5206\u7EC4\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u6210\u5458\u3002"),f();return}let o=e.id??ws(),r={id:o,name:t,skillIds:[...e.members]},i=e.id?N.map(c=>c.id===e.id?r:c):[...N,r];m="groups",Z=null,f();try{N=Gt(await pe("POST","/groups",{version:1,groups:i})),he=null,W=o,se=null;let c=N.find(d=>d.id===o)??null;R=c?{id:c.id,name:c.name,members:[...c.skillIds]}:null,A={text:s("\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C{name}\u300D\u3002",{name:t}),tone:"success"},Oe.toast({kind:"success",message:s("\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C{name}\u300D\u3002",{name:t})}).catch(()=>{})}catch(c){Z=Q(c)}finally{m=null,f()}},Cs=()=>{!R?.id||m||(De=!0,He=!1,f())},Us=async()=>{if(!R?.id||m)return;let e=R.id,t=N.filter(o=>o.id!==e);m="groups",De=!1,Z=null,f();try{N=Gt(await pe("POST","/groups",{version:1,groups:t})),he=null,se?.id===e&&(se=null),W===e&&(W=null);let o=N.find(r=>r.id===W)??N[0]??null;W=o?.id??null,R=o?{id:o.id,name:o.name,members:[...o.skillIds]}:null,A={text:s("\u5DF2\u5220\u9664\u5206\u7EC4\u3002"),tone:"success"}}catch(o){Z=Q(o)}finally{m=null,f()}},Ms=()=>{if(!(m||Ae||he)){if(Rt(N).added.length===0){A={text:s("\u793A\u4F8B\u5206\u7EC4\u7684\u540D\u79F0\u6216 ID \u90FD\u5DF2\u5B58\u5728\uFF0C\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u5206\u7EC4\u3002"),tone:"info"},f();return}He=!0,De=!1,f()}},Ls=async()=>{if(m)return;let{groups:e,added:t}=Rt(N);if(He=!1,t.length===0){A={text:s("\u793A\u4F8B\u5206\u7EC4\u7684\u540D\u79F0\u6216 ID \u90FD\u5DF2\u5B58\u5728\uFF0C\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u5206\u7EC4\u3002"),tone:"info"},f();return}m="groups",Z=null,f();try{N=Gt(await pe("POST","/groups",{version:1,groups:e})),he=null,A={text:s("\u5DF2\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\u3002",{count:t.length}),tone:"success"}}catch(o){Z=Q(o)}finally{m=null,f()}},Gs=()=>{if(qe.replaceChildren(),!R)return;let e=R,t=l("section","sk-group-editor");t.setAttribute("aria-label",s("\u7F16\u8F91\u5206\u7EC4"));let o=l("div","sk-section-head");o.append(l("h2","sk-section-title",s("\u7F16\u8F91\u5206\u7EC4")),B(s("\u5173\u95ED"),Rr,!1,!!m)),t.append(o);let r=l("label","sk-field");r.append(l("span","sk-field-label",s("\u9009\u62E9\u5206\u7EC4")));let i=l("select","sk-input");i.setAttribute("aria-label",s("\u9009\u62E9\u5206\u7EC4"));let c=l("option","",s("\u65B0\u5EFA\u5206\u7EC4"));c.value="new",i.append(c);for(let T of N){let C=l("option","",`${T.name}\uFF08${T.skillIds.length}\uFF09`);C.value=T.id,i.append(C)}i.value=e.id??"new",i.disabled=!!m,i.addEventListener("change",()=>Is(i.value)),r.append(i);let d=l("label","sk-field");d.append(l("span","sk-field-label",s("\u540D\u79F0")));let p=l("input","sk-input sk-group-name");p.type="text",p.value=e.name,p.maxLength=40,p.placeholder=s("\u4F8B\u5982\uFF1A\u65E5\u5E38\u5F00\u53D1"),p.autocomplete="off",p.spellcheck=!1,p.disabled=!!m,p.addEventListener("input",()=>{R&&(R.name=p.value,Z=null)}),p.addEventListener("keydown",T=>{T.key==="Enter"&&(T.preventDefault(),lr())}),d.append(p),t.append(r,d);let u=l("fieldset","sk-members"),_=l("legend","",s("\u6210\u5458\uFF08{count}\uFF09",{count:e.members.length}));u.append(_);let M=l("div","sk-members-tools");M.append(B(s("\u5168\u9009"),()=>{if(!R)return;let T=g?.skills.map(I=>I.id)??[],C=R.members.filter(I=>!T.includes(I));R.members=[...T,...C],f()},!1,!!m),B(s("\u6E05\u7A7A"),()=>{R&&(R.members=[],f())},!1,!!m)),u.append(M);let v=l("div","sk-member-list");for(let T of g?.skills??[]){let C=l("label","sk-check"),I=l("input");I.type="checkbox",I.checked=e.members.includes(T.id),I.disabled=!!m,I.addEventListener("change",()=>{R&&(I.checked?R.members.includes(T.id)||R.members.push(T.id):R.members=R.members.filter(oe=>oe!==T.id),_.textContent=s("\u6210\u5458\uFF08{count}\uFF09",{count:R.members.length}),Z=null)});let ie=l("span","sk-check-copy");ie.append(l("span","sk-check-name",vs(T)),l("code","sk-check-id",T.id)),C.append(I,ie),v.append(C)}u.append(v);let G=new Set(g?.skills.map(T=>T.id)??[]),D=e.members.filter(T=>!G.has(T));if(D.length>0){let T=l("div","sk-missing");T.append(l("span","sk-missing-label",s("\u76EE\u5F55\u4E2D\u7F3A\u5931\uFF1A")));for(let C of D){let I=l("button","sk-missing-chip",`${C} \xD7`);I.type="button",I.disabled=!!m,I.title=s("\u4ECE\u5206\u7EC4\u79FB\u9664\u8FD9\u4E2A\u7F3A\u5931\u6210\u5458"),I.addEventListener("click",()=>{R&&(R.members=R.members.filter(ie=>ie!==C),f())}),T.append(I)}u.append(T)}if(t.append(u),Z){let T=l("p","sk-editor-error",Z);T.setAttribute("role","alert"),t.append(T)}let q=l("div","sk-editor-actions");if(e.id&&q.append(B(s("\u5220\u9664\u5206\u7EC4"),Cs,!1,!!m)),q.append(B(s("\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4"),Ms,!1,!!m),B(e.id?s("\u4FDD\u5B58\u66F4\u6539"):s("\u65B0\u5EFA\u5206\u7EC4"),()=>void lr(),!0,!!m)),t.append(q),De){let T=l("div","sk-editor-confirm");T.dataset.tone="warning",T.append(l("p","",s("\u5220\u9664\u5206\u7EC4\u300C{name}\u300D\uFF1F\u6280\u80FD\u672C\u8EAB\u4E0D\u4F1A\u88AB\u5220\u9664\u3002",{name:e.name.trim()||s("\u672A\u547D\u540D")})));let C=l("div","sk-actions");C.append(B(s("\u786E\u8BA4\u5220\u9664"),()=>void Us(),!0,!!m),B(s("\u53D6\u6D88"),()=>{De=!1,f()},!1,!!m)),T.append(C),t.append(T)}if(He){let T=Rt(N).added.length,C=l("div","sk-editor-confirm");C.dataset.tone="warning",C.append(l("p","",s("\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\uFF1F\u5DF2\u6709\u540C\u540D\u6216\u540C ID \u7684\u5206\u7EC4\u4F1A\u8DF3\u8FC7\uFF0C\u5F53\u524D\u5206\u7EC4\u4E0D\u4F1A\u88AB\u8986\u76D6\u3002",{count:T})));let I=l("div","sk-actions");I.append(B(s("\u786E\u8BA4\u5BFC\u5165"),()=>void Ls(),!0,!!m),B(s("\u53D6\u6D88"),()=>{He=!1,f()},!1,!!m)),C.append(I),t.append(C)}t.append(l("p","sk-editor-hint",s("\u5206\u7EC4\u53EA\u5F71\u54CD\u9762\u677F\u7B5B\u9009\u548C\u6279\u91CF\u5F00\u5173\uFF0C\u4E0D\u6539\u53D8\u6280\u80FD\uFF1B\u6210\u5458\u987A\u5E8F\u51B3\u5B9A\u7EC4\u5185\u6B65\u9AA4\u53F7\uFF0C\u4FDD\u5B58\u540E\u5199\u5165 groups.json\u3002"))),qe.append(t)},Ps=()=>{st.replaceChildren();let e=g?.skills.length??0,t=l("button","sk-chip",s("\u5168\u90E8 {count}",{count:e}));t.type="button",t.dataset.group="all",t.setAttribute("aria-pressed",W===null?"true":"false"),t.addEventListener("click",()=>{W=null,f(),cr("all")}),st.append(t);for(let o of N){let r=$e(o).length,i=l("button","sk-chip",`${o.name} ${r}`);i.type="button",i.dataset.group=o.id,i.setAttribute("aria-pressed",W===o.id?"true":"false"),i.addEventListener("click",()=>{W=o.id,f(),cr(o.id)}),st.append(i)}be.textContent=s(R?"\u5173\u95ED\u7F16\u8F91":"\u7F16\u8F91\u5206\u7EC4"),be.setAttribute("aria-pressed",R?"true":"false"),be.disabled=Ae||!!he||!!m||!g||we(),be.title=Ae?s("\u6B63\u5728\u8BFB\u53D6\u5206\u7EC4\u2026"):he?s("\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u4FEE\u590D\u6587\u4EF6\u540E\u91CD\u65B0\u8BFB\u53D6"):g?we()?s("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6"):"":s("\u6280\u80FD\u5217\u8868\u5C1A\u672A\u8BFB\u53D6"),hs.update({value:W??"all",options:[{id:"all",label:s("\u5168\u90E8 {count}",{count:e})},...N.map(o=>({id:o.id,label:`${o.name} ${$e(o).length}`,hint:Or(o)}))]})},Ns=()=>{if(Po.replaceChildren(),!g||!W)return;let e=g,t=N.find(v=>v.id===W);if(!t)return;let o=$e(t),r=t.skillIds.filter(v=>!o.includes(v)),c=o.map(v=>e.skills.find(G=>G.id===v)).filter(v=>!!v).some(v=>v.state==="conflict"),d=we()||c||o.length===0,p=l("div","sk-groupbar"),u=l("div","sk-groupbar-text");u.append(l("strong","",t.name),l("span","sk-group-state",s("{count} \u4E2A \xB7 {state}",{count:o.length,state:Or(t)}))),r.length>0&&u.append(l("p","sk-group-warning",s("\u7F3A\u5931\uFF1A{names}",{names:r.join(", ")})));let _=l("div","sk-groupbar-actions");_.append(B(s("\u542F\u7528\u6574\u7EC4"),()=>void dr(t,!0),!1,d),B(s("\u5173\u95ED\u6574\u7EC4"),()=>void dr(t,!1),!1,d));let M=B(s("\u4EC5\u542F\u7528\u672C\u7EC4"),()=>Ds(t),!1,d||r.length>0);r.length>0&&(M.title=s("\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u5148\u5904\u7406\u540E\u518D\u4EC5\u542F\u7528\u672C\u7EC4")),_.append(M),p.append(u,_),Po.append(p)},dr=async(e,t)=>{if(!g||m)return;let o=$e(e);if(o.length!==0){m=`group:${e.id}:${t?"on":"off"}`,se=null,me=null,A=null,f();try{g=Fe(await pe("POST","/skills/batch",{enable:t?o:[],disable:t?[]:o})),A={text:t?s("\u5DF2\u542F\u7528\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:o.length}):s("\u5DF2\u5173\u95ED\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:o.length}),tone:"success"},Oe.toast({kind:"success",message:t?s("\u5DF2\u542F\u7528\u300C{name}\u300D",{name:e.name}):s("\u5DF2\u5173\u95ED\u300C{name}\u300D",{name:e.name})}).catch(()=>{})}catch(r){A={text:Q(r),tone:"error"},m=null,f(),ut(!1,!0);return}m=null,f()}},Ds=e=>{if(!g||m)return;let t=$e(e),o=e.skillIds.filter(r=>!t.includes(r));t.length===0||o.length>0||(se=e,me=null,A=null,f(),de.scrollIntoView({block:"nearest"}),de.querySelector("button")?.focus())},Hs=async()=>{if(!g||m||!se)return;let e=se;se=null;let t=$e(e),o=e.skillIds.filter(c=>!t.includes(c));if(t.length===0||o.length>0){A={text:s("\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u672A\u6267\u884C\u3002"),tone:"error"},f();return}let r=new Set(e.skillIds),i=g.skills.filter(c=>!r.has(c.id)).map(c=>c.id);m=`group-only:${e.id}`,A=null,f();try{g=Fe(await pe("POST","/skills/batch",{enable:t,disable:i})),A={text:s("\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D\uFF0C\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:i.length}),tone:"success"},Oe.toast({kind:"success",message:s("\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D",{name:e.name})}).catch(()=>{})}catch(c){A={text:Q(c),tone:"error"},m=null,f(),ut(!1,!0);return}m=null,f()};Ne.addEventListener("click",()=>{Xo=!0,Ue="translated",f(),zs()});et.addEventListener("click",()=>{Xo=!0,Ue="original",f()});var $s=e=>{let t=l("div","sk-skill-action"),o=l("span","sk-action-note"),r=we();if(e.state==="conflict"){o.textContent=s(r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5148\u5904\u7406\u51B2\u7A81");let d=l("button","sk-inline-button",s("\u5904\u7406\u51B2\u7A81"));return d.type="button",d.disabled=!!m||r,d.addEventListener("click",()=>{ct.scrollIntoView({block:"nearest"}),ct.querySelector("button")?.focus()}),t.append(o,d),t}if(e.state==="mixed"){o.textContent=s(r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u90E8\u5206\u5165\u53E3\u5173\u95ED");let d=l("div","sk-mini-actions"),p=l("button","sk-inline-button",s("\u5168\u90E8\u542F\u7528"));p.type="button",p.disabled=!!m||r,p.addEventListener("click",()=>void Uo(e,!0));let u=l("button","sk-inline-button",s("\u5168\u90E8\u5173\u95ED"));return u.type="button",u.disabled=!!m||r,u.addEventListener("click",()=>void Uo(e,!1)),d.append(p,u),t.append(o,d),t}let i=e.state==="enabled",c=l("button","sk-switch");return c.type="button",c.setAttribute("role","switch"),c.setAttribute("aria-checked",i?"true":"false"),c.setAttribute("aria-label",`${s(i?"\u5173\u95ED":"\u5F00\u542F")} ${e.name}`),c.dataset.skillId=e.id,c.disabled=!!m||r,c.append(l("span","sk-thumb")),c.addEventListener("click",()=>{c.disabled||Uo(e,!i)}),i?o.textContent=r?s("\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6"):e.advertised?s("\u6A21\u578B\u53EF\u89C1"):s("\u6A21\u578B\u4E0D\u53EF\u89C1"):o.textContent=s(r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5165\u53E3\u5DF2\u5173\u95ED"),t.append(o,c),t},Fs=(e,t=0)=>{let o=l("article","sk-skill");o.dataset.state=e.state,o.setAttribute("role","listitem");let r=l("div","sk-skill-main"),i=l("div","sk-skill-head");if(t>0){let u=l("span","sk-step",String(t));u.title=s("\u7B2C {step} \u6B65",{step:t}),u.setAttribute("aria-label",s("\u7B2C {step} \u6B65",{step:t})),i.append(u)}let c=Ue==="translated"?pt(e):null;i.append(l("strong","sk-name",c?.nameZh||e.name),xs(bs(e),ks(e)));let d=l("div","sk-meta");c&&d.append(l("span","sk-original-name",e.name)),d.append(l("code","sk-id",e.id));let p=l("p","sk-desc",c?.descriptionZh||e.description||s("\u65E0 description\uFF0C\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002"));if(r.append(i,d,p),e.warnings.length>0){let u=l("p","sk-warn",e.warnings.slice(0,2).map(_=>ve(_)??_).join(" \xB7 "));r.append(u)}return o.append(r,$s(e)),o},Ir=()=>{if(it.replaceChildren(),!g)return;let e=W?N.find(r=>r.id===W):null,o=(e?e.skillIds.map(r=>g?.skills.find(i=>i.id===r)).filter(r=>!!r):g.skills).filter(r=>{if(!No)return!0;let i=pt(r);return[r.id,r.name,r.description,i?.nameZh??"",i?.descriptionZh??"",...r.warnings].join(" ").toLowerCase().includes(No)});if(o.length===0){let r=l("div","sk-empty");r.append(l("h2","",g.skills.length===0?s("\u6CA1\u6709\u53D1\u73B0\u6280\u80FD"):s(e?"\u8FD9\u4E2A\u5206\u7EC4\u6CA1\u6709\u53EF\u7528\u6280\u80FD":"\u6CA1\u6709\u5339\u914D\u7684\u6280\u80FD")),l("p","",g.skills.length===0?s("\u68C0\u67E5 ~/.config/opencode/skills \u662F\u5426\u5B58\u5728\uFF0C\u6216\u91CD\u65B0\u626B\u63CF\u3002"):s(e?"\u68C0\u67E5\u5206\u7EC4\u91CC\u7684\u6280\u80FD\u662F\u5426\u88AB\u79FB\u9664\u3002":"\u6362\u4E00\u4E2A\u641C\u7D22\u8BCD\u3002"))),it.append(r);return}for(let r of o){let i=e&&e.skillIds.length>1?e.skillIds.indexOf(r.id)+1:0;it.append(Fs(r,i))}},f=()=>{lt.setAttribute("aria-busy",re?"true":"false"),_s(),As(),Ts(),Os(),Ps(),Gs(),Ns(),Ss(),Ir(),gs.update({label:s(re?"\u8BFB\u53D6\u4E2D\u2026":"\u91CD\u65B0\u626B\u63CF"),loading:re,disabled:re||!!m});let e=we();Er.update({disabled:re||!!m||!g||e}),Sr.update({disabled:re||!!m||!g||e})},Xs=e=>{Array.from(document.querySelectorAll("[data-skill-id]")).find(o=>o.dataset.skillId===e)?.focus()},ut=async(e=!1,t=!1)=>{if(!re){re=!0,t||(Me=null),e&&f();try{g=Fe(await pe("GET","/skills")),Me=null}catch(o){t||(Me=Q(o))}finally{re=!1,f()}}},Bs=async()=>{try{Qe=hr(await pe("POST","/translations",Qe)),fe=null}catch(e){fe=Q(e)}},zs=async()=>{if(!g||at)return;let e=g.skills.filter(i=>!pt(i));if(e.length===0){A={text:s("\u4E2D\u6587\u8BF4\u660E\u5DF2\u662F\u6700\u65B0\u3002"),tone:"success"},f();return}at=!0,fe=null,Mt={done:0,total:e.length},A=null,f();let t=0,o=0,r=!1;try{for(let i=0;i<e.length;i+=4){let c=e.slice(i,i+4),d=c;for(let p=0;p<2&&d.length>0;p+=1){let u=await Oe.generate({prompt:Yn(d.map(v=>({id:v.id,name:v.name,description:v.description}))),system:Jn,maxOutputTokens:2048}),_=Zn(u.text),M=new Set;for(let v of _){let G=d.find(D=>D.id===v.id);G&&(Qe.entries[G.id]={hash:G.contentHash,nameZh:v.nameZh,descriptionZh:v.descriptionZh,updatedAt:Date.now()},M.add(G.id))}d=d.filter(v=>!M.has(v.id))}o+=d.length,t+=c.length-d.length,Mt={done:t,total:e.length},await Bs(),f()}}catch(i){r=!0,fe=Q(i),A={text:fe,tone:"error"}}finally{at=!1,r||(fe?A={text:s("\u7FFB\u8BD1\u5B8C\u6210\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}",{error:fe}),tone:"warning"}:o>0?A={text:s("\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\uFF0C{failed} \u4E2A\u5931\u8D25\uFF1B\u53EF\u518D\u70B9\u201C\u7FFB\u8BD1\u201D\u91CD\u8BD5\u3002",{done:t,failed:o}),tone:"warning"}:A={text:s("\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\u3002",{done:t}),tone:"success"}),f()}},Lt=async(e=!1)=>{if(!(Ae&&!e||R)){Ae=!0,f();try{N=Gt(await pe("GET","/groups")),he=null,W&&!N.some(t=>t.id===W)&&(W=null)}catch(t){he=ms(t)}finally{Ae=!1,f()}}},Ho=async(e=!1)=>{if(re)return;re=!0,e&&f();let[t,o]=await Promise.allSettled([pe("GET","/skills"),pe("GET","/translations")]);if(t.status==="fulfilled")try{g=Fe(t.value),Me=null}catch(r){Me=Q(r)}else Me=Q(t.reason);if(o.status==="fulfilled")try{Qe=hr(o.value),fe=null,!Xo&&Object.keys(Qe.entries).length>0&&(Ue="translated")}catch(r){fe=Q(r)}else fe=Q(o.reason);re=!1,f()},Uo=async(e,t)=>{if(!m){m=`toggle:${e.id}`,me=null,se=null,A=null,f();try{g=Fe(await pe("POST","/skills/toggle",{id:e.id,enabled:t})),A={text:t?s("\u5DF2\u542F\u7528 {name}\u3002",{name:e.name}):s("\u5DF2\u5173\u95ED {name}\uFF1BOpenCode \u4E0B\u4E00\u6B21\u626B\u63CF\u540E\u4E0D\u518D\u53D1\u73B0\u5B83\u3002",{name:e.name}),tone:"success"},Oe.toast({kind:"success",message:t?s("\u5DF2\u542F\u7528 {name}",{name:e.name}):s("\u5DF2\u5173\u95ED {name}",{name:e.name})}).catch(()=>{})}catch(o){A={text:Q(o),tone:"error"},m=null,f(),ut(!1,!0);return}m=null,f(),Xs(e.id)}},pr=async(e,t)=>{if(m)return;let o=e.activePath??e.disabledPath;if(o){m=`resolve:${o}`,A=null,f();try{let r=await pe("POST","/skills/resolve",{path:o,keep:t}),i=r&&typeof r=="object"&&typeof r.backupPath=="string"?r.backupPath:null;g=Fe(r),A={text:t==="enabled"?s("\u5DF2\u4FDD\u7559\u542F\u7528\u5165\u53E3{suffix}\u3002",{suffix:i?s("\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A {path}",{path:i}):""}):s("\u5DF2\u4FDD\u7559\u5173\u95ED\u5165\u53E3{suffix}\u3002",{suffix:i?s("\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A {path}",{path:i}):""}),tone:"success"},Oe.toast({kind:"success",message:s("\u5165\u53E3\u51B2\u7A81\u5DF2\u5904\u7406")}).catch(()=>{})}catch(r){A={text:Q(r),tone:"error"},m=null,f(),ut(!1,!0);return}m=null,f()}},Cr=e=>{!g||m||(me=e,se=null,A=null,f(),de.scrollIntoView({block:"nearest"}),de.querySelector("button")?.focus())},Vs=async()=>{if(me===null||m)return;let e=me;me=null,se=null,m="bulk",A=null,f();try{let t=await pe("POST","/skills/bulk",{enabled:e}),o=t&&typeof t=="object"&&Array.isArray(t.changed)?t.changed.filter(r=>typeof r=="string"):[];g=Fe(t),A={text:e?s("\u5DF2\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002",{count:o.length}):s("\u5DF2\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002",{count:o.length}),tone:"success"},Oe.toast({kind:"success",message:e?s("\u5DF2\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002",{count:o.length}):s("\u5DF2\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002",{count:o.length})}).catch(()=>{})}catch(t){A={text:Q(t),tone:"error"},m=null,f(),ut(!1,!0);return}m=null,f()},ur=()=>{lt.setAttribute("aria-label",s("\u6280\u80FD\u5F00\u5173")),xr.textContent=s("\u6280\u80FD\u5F00\u5173"),dt.setAttribute("aria-label",s("\u6280\u80FD\u8BF4\u660E\u8BED\u8A00")),Ne.textContent=s("\u7FFB\u8BD1"),et.textContent=s("\u539F\u6587"),Er.update({label:s("\u5168\u90E8\u542F\u7528")}),Sr.update({label:s("\u5168\u90E8\u5173\u95ED")}),Le.placeholder=s("\u641C\u7D22\u540D\u79F0\u6216 ID"),Le.setAttribute("aria-label",s("\u641C\u7D22\u6280\u80FD")),Ar.textContent=s("\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002"),wr.textContent=s("\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002"),Ct?.setAttribute("aria-label",s("\u5206\u7EC4\u7B5B\u9009")),be.textContent=s(R?"\u5173\u95ED\u7F16\u8F91":"\u7F16\u8F91\u5206\u7EC4"),be.setAttribute("aria-pressed",R?"true":"false"),f()};Oe.onReady(e=>{ho(e,document.documentElement);let t=Ze.setLocale(e.locale);if(Ro(Ze),document.title=s("\u6280\u80FD\u5F00\u5173"),ir){if(!t){f();return}A=null,Z=null,ur(),Ho(!0),Lt(!0);return}ir=!0,t&&ur(),Ho(!0),Lt(!0)});document.title=s("\u6280\u80FD\u5F00\u5173");f();})();
