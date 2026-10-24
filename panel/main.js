"use strict";(()=>{var S="openchamber.sdk";var st="data-oc-scrolling",Ut=`
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
:hover, [${st}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${st}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${st}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${st}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Mt(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",s=>{let i=s.target===e?t:s.target;if(!(i instanceof Element))return;i.hasAttribute("data-oc-scrolling")||i.setAttribute("data-oc-scrolling","");let c=n.get(i);c!==void 0&&clearTimeout(c),n.set(i,setTimeout(()=>{n.delete(i),i.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var lr=`(${Mt.toString()})(document);`;var Jo=/^[a-z][a-z0-9-]{0,39}$/;var Vo=e=>Object(e)===e&&!Array.isArray(e),Lt=(e,t)=>Object.keys(e).every(n=>t.includes(n)),jo=e=>String(e)===e&&e.length>=1&&e.length<=60,Ko=e=>String(e)===e&&e.length>=1&&e.length<=80,Wo=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!Vo(n)||!Jo.test(n.id)||!jo(n.label)||n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1||t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!Lt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Lt(n,["kind","id","label","value","options","disabled"])||!Ko(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let s=new Set;for(let i of n.options){if(!Vo(i)||!Lt(i,["value","label"])||!Ko(i.value)||!jo(i.label)||s.has(i.value))return!1;s.add(i.value)}if(!s.has(n.value))return!1}return!0};var Gt=e=>"bytes"in e?e.bytes.byteLength:e.content.length,Yo=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var Zo=/^[A-Za-z0-9_-]{1,80}$/;var qo=["left","right","top","bottom"];var Qo=(e,t=0,n={remaining:16e3})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of s)if(!Qo(i,t+1,n))return!1;return!0},Pt=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Pt);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Pt)}return String(e)===e||Number.isFinite(e)},Nt=e=>{try{return String(e.id)!==e.id||!Zo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!qo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Qo(e.data)||!Pt(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var tn=["file","directory","other","missing"],Dt=e=>!!(e&&"sessionId"in e),Ht=e=>!!(e&&"sent"in e&&!("sessionId"in e));var on=/^[0-9a-f]{7,64}$/i,Ft=e=>on.test(e),it=500,at=32e3,nn=16e3,rn=128,sn=200,an=2e3,cn=16e3,ln=80,dn=200,pn=16e3;var un=2e3;var Xt=2e4,ct=1024,lt=2e6;var dt=64e3,pt=8e3,Bt=4e3;var zt=96e4,dr=60*6e4;var fn=999,mn=1e4,je=500,gn=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],kn=["stopped","starting","ready","failed"],pr=new Set(gn),hn=e=>pr.has(e),En=e=>e&&hn(e)?e:"HOST_REJECTED",Le=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(Le):Object(e)===e?Object.values(e).every(Le):!1,xn=e=>Le(e)&&JSON.stringify(e).length<=pn,en=e=>e?.trim().slice(0,dn)??"",Ge=e=>{let t=e.id.trim().slice(0,rn),n=e.title.trim().slice(0,sn),s=e.url.trim().slice(0,an),i=e.text?.trim().slice(0,cn),c=e.author?.trim().slice(0,ln),l=e.kind==="pull"?"pull":"issue",d={providerId:e.providerId.trim(),id:t,title:n||t,url:s,kind:l};if(i&&(d.text=i),c&&(d.author=c),l==="pull"){let g=en(e.branches?.head),v=en(e.branches?.base);g&&v&&(d.branches={head:g,base:v})}return xn(e.data)&&(d.data=e.data),d},Vt=e=>{let t=Ge(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},jt=e=>{let t={text:e.text.trim().slice(0,nn)};return e.send&&(t.send=!0),t},Kt=e=>e===null||!Number.isFinite(e)?null:Math.min(fn,Math.max(0,Math.round(e))),Jt=e=>Number.isFinite(e)?Math.min(mn,Math.max(0,Math.ceil(e))):0;var Pe=e=>e.length>0&&e.length<=ct&&!e.includes("\0")&&!e.includes("\\");var ut=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>un?!1:!e.split("/").some(n=>n==="."||n===".."),ur=new Set(kn),Wt=e=>!!(e&&"status"in e&&ur.has(String(e.status))&&!("body"in e)),ft=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Yt=e=>!!(e&&"content"in e&&String(e.content)===e.content),Zt=e=>!!(e&&"written"in e&&e.written===!0),qt=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),fr=new Set(tn),Qt=e=>!!(e&&"kind"in e&&"size"in e&&fr.has(String(e.kind))&&Number.isFinite(e.size)),eo=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),mr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),gr=e=>Object(e)===e?e:null,$t=e=>String(e)===e&&e.length>0,kr=e=>{if(!$t(e.id))return null;if(e.ok===!0){let t={channel:S,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&$t(e.error)?{channel:S,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:En($t(e.code)?e.code:void 0)}:null},to=e=>{let t=gr(e);return!t||t.channel!==S||t.v!==1?null:t.type==="result"?kr(t):!mr.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var bn=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,hr=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",h=class extends Error{code;constructor(t,n){super(n),this.name="HostRequestError",this.code=t}},_n=()=>Promise.reject(new h("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),mt=()=>Promise.reject(new h("BAD_PATH",`File path must be 1 to ${ct} characters without NUL or backslash.`)),gt=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new h("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},_=e=>(e.value+=1,`oc-${e.value}`),io=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new h("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??(o=>o===t.parent),s=e.requestTimeoutMs??Xt,i=new Set,c=new Set,l=new Set,d=new Set,g=new Set,v=new Set,B=new Set,w=new Set,N=new Set,ce=new Set,ve=[],x=null,I=null,M=new Set,ue=new Set,Ae=null,Be=null,Ot=!1,Ce=new Map,Ue=new Map,Me=new Map,pe=!1,b={value:0},E=null,fe=null,ze=!1,Ve=!1,Mo=null,Lo=o=>o?{sessionId:o.id,phase:o.busy?"started":"completed"}:null,ee=o=>{t.parent.postMessage(o,"*")},Go=()=>{pe||t.parent===t||ce.size===0||E?.features?.lateGenerateResults!==!0||ee({channel:S,v:1,type:"generate-late-listen"})},L=(o,r)=>{for(let u of o)try{u(r)}catch(k){console.error(k)}},Po=o=>{if(!(o instanceof MessageEvent)||!n(o.source))return;let r=to(o.data);if(!r)return;if(r.type==="workspace"){let k=Ue.get(r.payload.subscriptionId);k&&L([k],r.payload.snapshot);return}if(r.type==="shells"){let k=Me.get(r.payload.subscriptionId);k&&L([k],r.payload.snapshot);return}if(r.type==="ready"){E=r.payload,fe=Lo(r.payload.session),L(i,r.payload),L(c,r.payload.directory),L(l,r.payload.session),fe&&L(d,fe),L(g,r.payload.connection),L(v,r.payload.settings),L(B,r.payload.item),Go();return}if(r.type==="generate-late"){ce.size===0?ve.push(r.payload):L(ce,r.payload);return}if(r.type==="directory"){E&&(E={...E,directory:r.payload.directory}),L(c,r.payload.directory);return}if(r.type==="session"){E&&(E={...E,session:r.payload.session}),r.payload.session?fe?.sessionId!==r.payload.session.id&&(fe=Lo(r.payload.session)):fe=null,L(l,r.payload.session);return}if(r.type==="session-lifecycle"){fe=r.payload,L(d,r.payload);return}if(r.type==="connection"){E&&(E={...E,connection:r.payload.connection}),L(g,r.payload.connection);return}if(r.type==="settings"){E&&(E={...E,settings:r.payload.settings}),L(v,r.payload.settings);return}if(r.type==="item"){E&&(E={...E,item:r.payload.item}),L(B,r.payload.item);return}if(r.type==="status-control-event"){L(w,r.payload);return}if(r.type==="popover-closed"){L(N,r.payload);return}if(r.type==="action"){let k=O=>{pe||ee({channel:S,v:1,type:"action-result",id:r.id,payload:O})},R=I;if(!R){k({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>R(r.payload)).then(()=>k({ok:!0}),O=>{let H=(O instanceof Error?O.message:String(O)).trim();k({ok:!1,error:(H||"Action failed.").slice(0,je)})});return}if(r.type==="file-open"){let k=r.payload;if(Be&&Yo(Be,k))return;Be=k,L(M,r.payload);return}if(r.type==="file-saved"){L(ue,r.payload.version);return}if(r.type==="file-snapshot"){let k=H=>{pe||ee({channel:S,v:1,type:"file-snapshot-result",id:r.id,payload:H})},R=H=>k({error:(H.trim()||"Could not read the edited file.").slice(0,je)}),O=Ae;if(!O){R("This extension does not edit files.");return}Promise.resolve().then(()=>O(r.payload.purpose)).then(H=>{if(Gt(H)>2e7){R(`The file is over ${2e7} ${"bytes"in H?"bytes":"characters"}.`);return}if(H.version.length>256){R(`The snapshot version is over ${256} characters.`);return}k({snapshot:"bytes"in H?{bytes:H.bytes,version:H.version}:{content:H.content,version:H.version}})},H=>R(H instanceof Error?H.message:String(H)));return}if(r.type==="resolve"){let k=O=>{ee({channel:S,v:1,type:"resolve-result",id:r.id,payload:O})},R=x;if(!R){k({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>R(r.payload)).then(O=>k({item:O?Ge(O):null}),O=>{let H=(O instanceof Error?O.message:String(O)).trim();k({error:(H||"Command failed.").slice(0,je)})});return}let u=Ce.get(r.id);if(u){if(clearTimeout(u.timer),Ce.delete(r.id),r.ok){u.resolve(r.payload);return}u.reject(new h(r.code,r.error))}};t.addEventListener("message",Po),ee({channel:S,v:1,type:"hello"});let W=(o,r=s)=>pe||t.parent===t?Promise.reject(new h("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((u,k)=>{let R=setTimeout(()=>{Ce.delete(o.id),k(new h("HOST_TIMEOUT","Host did not answer in time."))},r);Ce.set(o.id,{resolve:u,reject:k,timer:R}),ee(o)}),$=o=>W(o).then(()=>{}),D={channel:S,v:1},Rt=o=>{!pe&&t.parent!==t&&ee(o)},No=()=>Rt({...D,type:"file-save"}),$o=o=>{!bn(o)||!hr(o)||(o.preventDefault(),No())},Do=o=>{!bn(o)||o.key!=="Escape"||E?.surface!=="popover"||!E.popover||(o.preventDefault(),Bo(E.popover.id,"escape").catch(()=>{}))},ot=()=>{let o=E?.surface==="popover"?E.popover:void 0;if(!o)return;let r=ze||Ve;Mo!==r&&(Mo=r,zo(o.id,r).catch(()=>{}))},nt=()=>{E?.surface!=="popover"||ze||(ze=!0,ot())},Ho=o=>{E?.surface!=="popover"||o.relatedTarget!==null||!ze||(ze=!1,ot())},Fo=()=>{E?.surface!=="popover"||Ve||(Ve=!0,ot())},Xo=()=>{E?.surface!=="popover"||!Ve||(Ve=!1,ot())},le=(o,r=1024)=>{if(!o.trim()||o.length>r)throw new h("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},It=async o=>{o.kind!=="projects"&&le(o.projectId);let r=await W({...D,type:"workspace-read",id:_(b),payload:o});if(!r||!("kind"in r)||!("state"in r)||r.kind!==o.kind)throw new h("HOST_REJECTED","Host did not return workspace data.");return r},Ct=async(o,r)=>{o.kind!=="projects"&&le(o.projectId);let u=_(b);Ue.set(u,r);try{await $({...D,type:"workspace-subscribe",id:_(b),payload:{subscriptionId:u,query:o}})}catch(k){throw Ue.delete(u),pe||ee({...D,type:"workspace-unsubscribe",id:_(b),payload:{subscriptionId:u}}),k}return()=>{!Ue.delete(u)||pe||ee({...D,type:"workspace-unsubscribe",id:_(b),payload:{subscriptionId:u}})}},cr=async(o,r)=>{o.kind==="session"&&le(o.sessionId),o.kind==="project"&&le(o.projectId);let u=_(b);Me.set(u,r);try{await $({...D,type:"shells-subscribe",id:_(b),payload:{subscriptionId:u,scope:o}})}catch(k){throw Me.delete(u),pe||ee({...D,type:"shells-unsubscribe",id:_(b),payload:{subscriptionId:u}}),k}return()=>{!Me.delete(u)||pe||ee({...D,type:"shells-unsubscribe",id:_(b),payload:{subscriptionId:u}})}},rt=async o=>{if("key"in o&&(o.key.length===0||o.key.length>128))throw new h("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(o.op==="set"&&!Le(o.value))throw new h("HOST_REJECTED","Storage values must be JSON.");if(o.op==="set"&&new TextEncoder().encode(JSON.stringify(o.value)).length>65536)throw new h("HOST_REJECTED","Storage value exceeds 64 KiB.");if(o.scope==="device"&&E?.features?.deviceStorage!==!0)throw new h("UNSUPPORTED","This host does not support device storage.");let r=await W({...D,type:"storage",id:_(b),payload:o});if(!r||!("storage"in r)||r.op!==o.op)throw new h("HOST_REJECTED","Host did not return storage data.");return r},Bo=(o,r)=>E?.features?.popovers!==!0&&!(E?.surface==="popover"&&E.popover?.id===o)?Promise.reject(new h("UNSUPPORTED","This host does not support popovers.")):$({...D,type:"popover-close",id:_(b),payload:r?{id:o,reason:r}:{id:o}}),zo=(o,r)=>E?.features?.popovers!==!0&&!(E?.surface==="popover"&&E.popover?.id===o)?Promise.reject(new h("UNSUPPORTED","This host does not support popovers.")):$({...D,type:"popover-anchor",id:_(b),payload:{id:o,active:r}});return t.addEventListener("keydown",Do,!0),t.addEventListener("pointerover",nt),t.addEventListener("pointermove",nt),t.addEventListener("pointerout",Ho),t.addEventListener("focus",Fo),t.addEventListener("blur",Xo),{onAction:o=>(I=o,()=>{I===o&&(I=null)}),listProjects:async()=>{let o=await It({kind:"projects"});if(o.kind!=="projects")throw new h("HOST_REJECTED","Expected projects.");return o},listWorktrees:async o=>{let r=await It({kind:"worktrees",projectId:o});if(r.kind!=="worktrees")throw new h("HOST_REJECTED","Expected worktrees.");return r},listSessions:async o=>{let r=await It({kind:"sessions",projectId:o});if(r.kind!=="sessions")throw new h("HOST_REJECTED","Expected sessions.");return r},onProjects:o=>Ct({kind:"projects"},r=>{r.kind==="projects"&&o(r)}),onWorktrees:(o,r)=>Ct({kind:"worktrees",projectId:o},u=>{u.kind==="worktrees"&&r(u)}),onSessions:(o,r)=>Ct({kind:"sessions",projectId:o},u=>{u.kind==="sessions"&&r(u)}),onRunningShells:(o,r)=>cr(o,r),readShellOutput:async(o,r)=>{le(o,128);let u=r?.cursor;if(u!==void 0&&(!Number.isInteger(u)||u<0))throw new h("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let k=r?.tailBytes;if(k!==void 0&&(!Number.isInteger(k)||k<1||k>65536))throw new h("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let O=await W({...D,type:"shell-output",id:_(b),payload:{shellId:o,cursor:u,tailBytes:k}});if(!O||typeof O.output!="string"||!Number.isFinite(O.cursor))throw new h("HOST_REJECTED","Host did not return shell output.");return O},stopShell:async o=>{if(le(o,128),(await W({...D,type:"shell-stop",id:_(b),payload:{shellId:o}}))?.stopped!==!0)throw new h("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async o=>{le(o),await $({...D,type:"open-session",id:_(b),payload:{sessionId:o}})},storage:{get:async(o,r)=>{let u=gt(r),k={op:"get",key:o};u&&(k.scope=u);let R=await rt(k);return R.op==="get"&&R.found?R.value:void 0},set:async(o,r,u)=>{let k=gt(u),R={op:"set",key:o,value:r};k&&(R.scope=k),await rt(R)},delete:async(o,r)=>{let u=gt(r),k={op:"delete",key:o};u&&(k.scope=u),await rt(k)},keys:async o=>{let r=gt(o),u={op:"keys"};r&&(u.scope=r);let k=await rt(u);if(k.op!=="keys")throw new h("HOST_REJECTED","Expected storage keys.");return k.keys}},onReady:o=>(i.add(o),E&&o(E),()=>{i.delete(o)}),onDirectory:o=>(c.add(o),E&&o(E.directory),()=>{c.delete(o)}),onSession:o=>(l.add(o),E&&o(E.session),()=>{l.delete(o)}),onSessionLifecycle:o=>(d.add(o),fe&&o(fe),()=>{d.delete(o)}),onConnection:o=>(g.add(o),E&&o(E.connection),()=>{g.delete(o)}),onSettings:o=>(v.add(o),E&&o(E.settings),()=>{v.delete(o)}),onItem:o=>(B.add(o),E&&o(E.item),()=>{B.delete(o)}),onStatusControl:o=>(w.add(o),()=>{w.delete(o)}),onPopoverClosed:o=>(N.add(o),()=>{N.delete(o)}),setStatusControls:o=>E?.features?.statusControls!==!0?Promise.reject(new h("UNSUPPORTED","This host does not support status controls.")):Wo(o)?$({...D,type:"status-controls",id:_(b),payload:{controls:o}}):Promise.reject(new h("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:o=>E?.features?.popovers!==!0?Promise.reject(new h("UNSUPPORTED","This host does not support popovers.")):Nt(o)?$({...D,type:"popover-open",id:_(b),payload:o}):Promise.reject(new h("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:Bo,setPopoverAnchorActive:zo,onResolve:o=>(x=o,()=>{x===o&&(x=null)}),toast:o=>{let r=o.message.trim();return!r||r.length>it?Promise.reject(new h("HOST_REJECTED",`Toast message must contain 1 to ${it} characters.`)):o.copy&&o.copy!==!0&&(!o.copy.text.length||o.copy.text.length>at)?Promise.reject(new h("HOST_REJECTED",`Toast copy text must contain 1 to ${at} characters.`)):$({channel:S,v:1,type:"toast",id:_(b),payload:{...o,message:r}})},openUrl:o=>$({channel:S,v:1,type:"open-url",id:_(b),payload:{url:o}}),openCommit:o=>Ft(o)?$({channel:S,v:1,type:"open-commit",id:_(b),payload:{sha:o}}):Promise.reject(new h("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:o=>$({channel:S,v:1,type:"open-surface",id:_(b),payload:{surfaceId:o}}),writeClipboard:o=>$({channel:S,v:1,type:"clipboard-write",id:_(b),payload:{text:o}}),compose:o=>$({channel:S,v:1,type:"compose",id:_(b),payload:o}),attach:o=>$({channel:S,v:1,type:"attach",id:_(b),payload:Ge(o)}),startSession:async o=>{o.projectId!==void 0&&le(o.projectId);let r=o.worktree;r&&r!==!0&&(r.kind==="existing"?le(r.directory):(r.name!==void 0&&le(r.name,200),r.baseBranch!==void 0&&le(r.baseBranch,200)));let u=await W({channel:S,v:1,type:"start-session",id:_(b),payload:Vt(o)},e.requestTimeoutMs??18e4);if(!Dt(u))throw new h("HOST_REJECTED","Host did not return a session.");return u},prompt:o=>W({channel:S,v:1,type:"prompt",id:_(b),payload:jt(o)}).then(r=>{if(!Ht(r))throw new h("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:o=>$({channel:S,v:1,type:"session-link",id:_(b),payload:Ge(o)}),close:()=>$({channel:S,v:1,type:"close",id:_(b)}),oauthStart:()=>$({channel:S,v:1,type:"oauth-start",id:_(b)}),oauthDisconnect:()=>$({channel:S,v:1,type:"oauth-disconnect",id:_(b)}),request:o=>(ut(o.path)?W({channel:S,v:1,type:"request",id:_(b),payload:o}):_n()).then(r=>{if(!ft(r))throw new h("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:o=>(ut(o.path)?W({channel:S,v:1,type:"service-request",id:_(b),payload:o}):_n()).then(r=>{if(!ft(r))throw new h("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>W({channel:S,v:1,type:"service-status",id:_(b)}).then(o=>{if(!Wt(o))throw new h("HOST_REJECTED","Host did not return service status.");return o}),readFile:o=>(Pe(o)?W({channel:S,v:1,type:"file-read",id:_(b),payload:{path:o}}):mt()).then(r=>{if(!Yt(r))throw new h("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(o,r)=>Pe(o)?r.length>lt?Promise.reject(new h("FILE_TOO_LARGE",`Content is over ${lt} characters.`)):W({channel:S,v:1,type:"file-write",id:_(b),payload:{path:o,content:r}}).then(u=>{if(!Zt(u))throw new h("HOST_REJECTED","Host did not confirm the write.");return u}):mt(),listDir:o=>(Pe(o)?W({channel:S,v:1,type:"file-list",id:_(b),payload:{path:o}}):mt()).then(r=>{if(!qt(r))throw new h("HOST_REJECTED","Host did not return directory entries.");return r}),stat:o=>(Pe(o)?W({channel:S,v:1,type:"file-stat",id:_(b),payload:{path:o}}):mt()).then(r=>{if(!Qt(r))throw new h("HOST_REJECTED","Host did not return file status.");return r}),generate:o=>{let r=o.prompt.trim(),u=o.system?.trim();if(r.length===0||r.length>dt)return Promise.reject(new h("HOST_REJECTED",`Prompt must be 1 to ${dt} characters.`));if(u!==void 0&&(u.length===0||u.length>pt))return Promise.reject(new h("HOST_REJECTED",`System prompt must be 1 to ${pt} characters.`));let k=o.maxOutputTokens===void 0?void 0:Math.min(Bt,Math.max(1,Math.floor(o.maxOutputTokens)));if(k!==void 0&&!Number.isFinite(k))return Promise.reject(new h("HOST_REJECTED","maxOutputTokens must be a number."));let R={prompt:r};return u!==void 0&&(R.system=u),k!==void 0&&(R.maxOutputTokens=k),W({channel:S,v:1,type:"generate",id:_(b),payload:R},e.requestTimeoutMs??zt).then(O=>{if(!eo(O))throw new h("HOST_REJECTED","Host did not return generated text.");return O})},onLateGenerateResult:o=>{ce.add(o);for(let r of ve.splice(0))L([o],r);return Go(),()=>{ce.delete(o)}},setBadge:o=>$({channel:S,v:1,type:"badge",id:_(b),payload:{count:Kt(o)}}),setHeight:o=>$({channel:S,v:1,type:"resize",id:_(b),payload:{height:Jt(o)}}),onFileOpen:o=>(M.add(o),Ot||(Ot=!0,t.addEventListener("keydown",$o,!0)),Be&&o(Be),()=>{M.delete(o)}),onFileSnapshot:o=>(Ae=o,()=>{Ae===o&&(Ae=null)}),onFileSaved:o=>(ue.add(o),()=>{ue.delete(o)}),reportFileChange:o=>Rt({...D,type:"file-change",payload:{dirty:o.dirty,edited:o.edited}}),requestFileSave:No,reportFileUnsupported:()=>Rt({...D,type:"file-unsupported"}),dispose:()=>{for(let o of Ue.keys())ee({...D,type:"workspace-unsubscribe",id:_(b),payload:{subscriptionId:o}});Ue.clear();for(let o of Me.keys())ee({...D,type:"shells-unsubscribe",id:_(b),payload:{subscriptionId:o}});Me.clear(),pe=!0,x=null,I=null,Ae=null,M.clear(),ue.clear(),Ot&&t.removeEventListener("keydown",$o,!0),t.removeEventListener("message",Po),t.removeEventListener("keydown",Do,!0),t.removeEventListener("pointerover",nt),t.removeEventListener("pointermove",nt),t.removeEventListener("pointerout",Ho),t.removeEventListener("focus",Fo),t.removeEventListener("blur",Xo);for(let o of Ce.values())clearTimeout(o.timer),o.reject(new h("HOST_UNAVAILABLE","Host client was disposed."));Ce.clear(),i.clear(),c.clear(),l.clear(),d.clear(),g.clear(),v.clear(),B.clear(),w.clear(),N.clear(),ce.clear(),ve.length=0}}};var yn=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Hs=new Set(yn);var vn=["none","agent","user"];var Xs=new Set(vn);var Er=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],xr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],An=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,s]of Er)t.style.setProperty(n,e.tokens[s]);for(let[n,s,i]of xr){let c=e.tokens[i]??"";t.style.setProperty(n,c),t.style.setProperty(s,c)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},ao=(e,t)=>{An(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var br={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},U=(e,t)=>`var(--${e}, var(--oc-${br[e]}, ${t}))`,ge=U("surface-background","transparent"),ht=U("surface-elevated","transparent"),Ne=U("surface-elevated-foreground","inherit"),ne=U("surface-foreground","inherit"),C=U("surface-muted-foreground","gray"),_r=U("surface-muted","transparent"),Ee=U("interactive-border","currentColor"),Y=U("interactive-hover","transparent"),we=U("interactive-active","transparent"),co=U("interactive-selection","transparent"),lo=U("interactive-selection-foreground","inherit"),me=U("primary","currentColor"),po=U("primary-text","inherit"),uo=U("error-text","inherit"),Sr=U("font-sans","inherit"),fo=U("font-mono","monospace"),Cn=U("radius","9px"),mo=`calc(${Cn} - 2px)`,wn=`calc(${Cn} - 4px)`,G=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,On=`background-image: linear-gradient(${Y}, ${Y});`,go=e=>`box-shadow: inset 0 0 0 1px ${e}, var(--oc-sdk-field-lift);`,ko="box-shadow: inset 0 0 0 1px var(--oc-sdk-edge), var(--oc-sdk-raised-lift);",Rn="box-shadow: var(--oc-sdk-lit);",In=`inset 0 1px 0 0 ${G(ne,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,Tr=`
:root {
  --oc-sdk-edge: ${G(ne,10)};
  --oc-sdk-field-bg: ${ht};
  --oc-sdk-raised-bg: ${ge};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 0 0 1px rgb(0 0 0 / 0.1), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${G(ne,6)};
  --oc-sdk-field-bg: ${G(ge,50,ht)};
  --oc-sdk-raised-bg: ${ht};
  --oc-sdk-field-lift: ${In};
  --oc-sdk-raised-lift: ${In};
  --oc-sdk-lit: inset 0 1px 0 0 ${G(ne,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 0 0 1px rgb(0 0 0 / 0.36), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,kt=e=>{let t=U(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${U(`${e}-text`,"inherit")}; }`},yr=`
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
`,Un=`${Tr}
.oc-sdk { color: ${ne}; font-family: ${Sr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${On} }
.oc-sdk-mono { font-family: ${fo}; }
.oc-sdk-muted { color: ${C}; }
${kt("success")}${kt("warning")}${kt("error")}${kt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${me}; --oc-sdk-tone-text: ${po}; }

.oc-sdk-btn { border-radius: ${mo}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${wn}; }
.oc-sdk-btn[data-variant="default"] { color: ${po}; background: ${G(me,10,ge)}; border-color: ${G(me,12)}; ${Rn} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${G(me,16,ge)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${G(me,22,ge)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${_r}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Y}, ${Y}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${we}, ${we}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Ne}; border-color: transparent; ${ko} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Y}, ${Y}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${we}, ${we}); box-shadow: inset 0 0 0 1px var(--oc-sdk-edge); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Y}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${we}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${U("status-error","red")}; color: ${uo}; background: ${G("var(--oc-sdk-tone)",7,ge)}; border-color: ${G("var(--oc-sdk-tone)",12)}; ${Rn} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${G("var(--oc-sdk-tone)",9,ge)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${G("var(--oc-sdk-tone)",11,ge)}; box-shadow: none; }

.oc-sdk-field-note { color: ${C}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${uo}; }
.oc-sdk-input { border-radius: ${mo}; background: var(--oc-sdk-field-bg); color: ${Ne}; ${go("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${C}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Y}, ${Y}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${go(G(ne,26))} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${go(U("status-error","red"))} }
.oc-sdk-input[data-mono="true"] { font-family: ${fo}; }

.oc-sdk-search-icon { color: ${C}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${me}; }
.oc-sdk-search-clear { border-radius: ${wn}; color: ${C}; }
.oc-sdk-search-clear:hover { background: ${Y}; color: ${ne}; }

.oc-sdk-trigger { border-color: transparent; border-radius: ${mo}; background: var(--oc-sdk-raised-bg); color: ${Ne}; ${ko} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Y}, ${Y}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${we}, ${we}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${C}; }
.oc-sdk-trigger-chevron { color: ${C}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow, no border. */
.oc-sdk-popup { --surface-foreground: ${Ne}; border-color: transparent; border-radius: 12px; background: ${ht}; color: ${Ne}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Y}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${co}; color: ${lo}; }
.oc-sdk-option-check { color: ${ne}; }
.oc-sdk-option[data-destructive="true"] { color: ${uo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${G(U("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${C}; }
.oc-sdk-popup-empty { color: ${C}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ee}; border-radius: 4px; color: ${ne}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${G(ne,60,Ee)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ee}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ge}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${me}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${On} }
.oc-sdk-check-desc { color: ${C}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${G(ne,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${C}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${ne}; }
.oc-sdk-tab[aria-selected="true"] { color: ${lo}; background: ${co}; border-color: ${Ee}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Ne}; background: var(--oc-sdk-raised-bg); border-color: transparent; ${ko} }
.oc-sdk-tab-count { color: ${C}; }

.oc-sdk-badge { border-radius: 9999px; background: ${Y}; color: ${C}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${G("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Y}; }
.oc-sdk-row[aria-selected="true"] { background: ${co}; color: ${lo}; }
.oc-sdk-row-lead { font-family: ${fo}; color: ${C}; }
.oc-sdk-row-sub { color: ${C}; }
.oc-sdk-row-meta { color: ${C}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${C}; }

.oc-sdk-empty-body { color: ${C}; }

.oc-sdk-spinner { color: ${C}; }
.oc-sdk-spinner-ring { border-color: ${Ee}; border-top-color: ${me}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${G("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${C}; }

.oc-sdk-separator { color: ${C}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${G(Ee,40)}; }

.oc-sdk-progress-label { color: ${C}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${Ee}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${me}); }

.oc-sdk-text a { color: ${po}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${G(Ee,60)}; }
`,z=`
${Ut}
${yr}
${Un}`;var Mn="oc-sdk-ui-style";var V=e=>{let t=document.getElementById(Mn);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}Mt(document);let n=document.createElement("style");n.id=Mn,n.textContent=e,document.head.appendChild(n)},j=(e,t)=>{let n=document.createElement(e);return t&&(n.className=t),n},xe=e=>{let t=j("button",e);return t.type="button",t},de=(e,t)=>{let n=t??"";e.textContent!==n&&(e.textContent=n)};var vr=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},be=(e,t)=>{V(z);let n=t,s=xe("oc-sdk oc-sdk-btn"),i=vr(),c=document.createElement("span");s.append(c),e.append(s);let l=()=>{s.dataset.variant=n.variant??"default",s.dataset.size=n.size??"default",s.disabled=!!n.disabled||!!n.loading,s.dataset.loading=n.loading?"true":"false",s.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&i.parentNode!==s?s.prepend(i):!n.loading&&i.parentNode===s&&i.remove(),de(c,n.label)},d=()=>{n.disabled||n.loading||n.onClick()};return s.addEventListener("click",d),l(),{update:g=>{n={...n,...g},l()},dispose:()=>{s.removeEventListener("click",d),s.remove()}}};var Ir=/^[a-z0-9][a-z0-9-]{0,63}$/,Cr=new Set(["all","new"]),q=class extends Error{constructor(t){super(t),this.name="GroupFileError"}},Eo=[{id:"macos-ui",name:"macOS UI",skillIds:["appkit-interop","swiftui-patterns","window-management","liquid-glass","view-refactor"]},{id:"macos-build",name:"macOS \u6784\u5EFA",skillIds:["build-run-debug","test-triage","swiftpm-macos","signing-entitlements","packaging-notarization","telemetry"]},{id:"reverse",name:"\u9006\u5411\u5DE5\u7A0B",skillIds:["reverse-engineering-unpacking","kuna-decompiler","reverse-engineer-anything"]},{id:"cloudflare",name:"Cloudflare",skillIds:["cloudflare","workers-best-practices","wrangler"]},{id:"video",name:"\u89C6\u9891",skillIds:["yichen-jianying-edit"]},{id:"browser",name:"\u6D4F\u89C8\u5668",skillIds:["browser-skill"]}],xo=()=>Eo.map(e=>({...e,skillIds:[...e.skillIds]})),Ln=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new q("\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E");let t=e;if(t.version!==1)throw new q("\u5206\u7EC4\u914D\u7F6E\u7248\u672C\u4E0D\u53D7\u652F\u6301");if(!Array.isArray(t.groups))throw new q("\u5206\u7EC4\u5217\u8868\u683C\u5F0F\u4E0D\u6B63\u786E");if(t.groups.length>50)throw new q("\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 50 \u4E2A");let n=[],s=new Set,i=new Set;for(let[c,l]of t.groups.entries()){if(!l||typeof l!="object"||Array.isArray(l))throw new q(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E`);let d=l;if(typeof d.id!="string"||!Ir.test(d.id)||Cr.has(d.id))throw new q(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548`);if(s.has(d.id))throw new q(`\u5206\u7EC4 ID \u91CD\u590D\uFF1A${d.id}`);let g=typeof d.name=="string"?d.name.trim():"";if(!g||g.length>40||/[\u0000-\u001f\u007f]/.test(g))throw new q(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-40 \u4E2A\u5B57\u7B26`);let v=g.toLowerCase();if(i.has(v))throw new q(`\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A${g}`);if(!Array.isArray(d.skillIds))throw new q(`\u5206\u7EC4\u300C${g}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E`);if(d.skillIds.length>200)throw new q(`\u5206\u7EC4\u300C${g}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 200 \u4E2A`);let B=[],w=new Set;for(let N of d.skillIds){if(typeof N!="string"||!N||N.length>128)throw new q(`\u5206\u7EC4\u300C${g}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID`);w.has(N)||(w.add(N),B.push(N))}s.add(d.id),i.add(v),n.push({id:d.id,name:g,skillIds:B})}return{version:1,groups:n}};var Gn=["\u4F60\u662F\u6280\u672F\u6587\u6863\u7FFB\u8BD1\u3002\u628A\u8F93\u5165\u7684\u6280\u80FD\u540D\u79F0\u548C\u63CF\u8FF0\u7FFB\u8BD1\u6210\u7B80\u4F53\u4E2D\u6587\u3002","\u4FDD\u7559\u6280\u80FD ID\u3001\u547D\u4EE4\u3001\u6587\u4EF6\u8DEF\u5F84\u3001\u4EE3\u7801\u3001\u4EA7\u54C1\u540D\u548C\u6280\u672F\u4E13\u6709\u540D\u8BCD\uFF0C\u4E0D\u8981\u7FFB\u8BD1\u4EE3\u7801\u5757\u3002","\u4E0D\u8981\u6DFB\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown\u3002",'\u53EA\u8F93\u51FA JSON\uFF1A{"items":[{"id":"\u539F\u6837 ID","nameZh":"\u4E2D\u6587\u540D\u79F0","descriptionZh":"\u4E2D\u6587\u63CF\u8FF0"}]}'].join(""),Pn=e=>JSON.stringify(e.map(t=>({id:t.id,name:t.name,description:t.description}))),Nn=e=>{let t=e.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"").trim(),n=t.indexOf("{"),s=t.lastIndexOf("}");if(n<0||s<=n)return[];t=t.slice(n,s+1);let i;try{i=JSON.parse(t)}catch{return[]}let c=i&&typeof i=="object"?i:null,l=Array.isArray(i)?i:Array.isArray(c?.items)?c.items:[],d=[];for(let g of l){if(!g||typeof g!="object")continue;let v=g;typeof v.id!="string"||!v.id||typeof v.nameZh!="string"||!v.nameZh.trim()||typeof v.descriptionZh=="string"&&d.push({id:v.id.slice(0,128),nameZh:v.nameZh.trim().slice(0,300),descriptionZh:v.descriptionZh.trim().slice(0,8e3)})}return d};var $n=`:root {
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
  border-color: var(--sk-border);
  white-space: nowrap;
}
.sk-groups-edit:disabled {
  opacity: 0.45;
  cursor: not-allowed;
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
`;var Dn=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
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
`;var he=io({requestTimeoutMs:3e4}),Jn=document.querySelector("#root");if(!Jn)throw new Error("Missing #root");var Wn=document.createElement("style");Wn.textContent=Dn+$n;document.head.append(Wn);var a=(e,t="",n)=>{let s=document.createElement(e);return s.className=t,n!==void 0&&(s.textContent=n),s},ie=class extends Error{code;conflicts;constructor(t,n,s){super(t),this.name="ServiceError",this.code=n,this.conflicts=s}},Lr=e=>e==="enabled"||e==="disabled"||e==="mixed"||e==="conflict",Gr=e=>e==="both"||e==="duplicate"||e==="invalid"||e==="empty"||e==="read-error"||e==="manual"||e==="no-description",Ke=(e,t="")=>typeof e=="string"?e:t,Hn=e=>typeof e=="string"&&e.length>0?e:null,St=e=>e===!0,Yn=e=>typeof e=="number"&&Number.isFinite(e)?e:0,Fn=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],Io=e=>{if(!e||typeof e!="object")return null;let t=e;return!Gr(t.kind)||typeof t.skillId!="string"?null:{kind:t.kind,skillId:t.skillId,message:Ke(t.message,"\u51B2\u7A81"),activePath:Hn(t.activePath),disabledPath:Hn(t.disabledPath),blocking:St(t.blocking)}},Pr=e=>{if(!e||typeof e!="object")return null;let t=e;return typeof t.id!="string"||!t.id||!Lr(t.state)?null:{id:t.id,name:Ke(t.name,t.id),description:Ke(t.description),state:t.state,advertised:St(t.advertised),autoInvokeOff:St(t.autoInvokeOff),activePaths:Fn(t.activePaths),disabledPaths:Fn(t.disabledPaths),conflicts:Array.isArray(t.conflicts)?t.conflicts.map(Io).filter(n=>n!==null):[],warnings:Array.isArray(t.warnings)?t.warnings.filter(n=>typeof n=="string"):[],estimatedTokens:Yn(t.estimatedTokens),contentHash:Ke(t.contentHash)}},Nr=e=>{if(!e||typeof e!="object")throw new ie("\u670D\u52A1\u8FD4\u56DE\u7684\u6280\u80FD\u76EE\u5F55\u4FE1\u606F\u4E0D\u6B63\u786E\u3002","parse",[]);let t=e;return{path:Ke(t.path),exists:St(t.exists),error:typeof t.error=="string"?t.error:null}},Ie=e=>{if(!e||typeof e!="object")throw new ie("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[]);let t=e;if(!Array.isArray(t.skills))throw new ie("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[]);let n=t.skills.map(Pr).filter(l=>l!==null),s=Array.isArray(t.conflicts)?t.conflicts.map(Io).filter(l=>l!==null):n.flatMap(l=>l.conflicts),i=s.filter(l=>l.blocking).length,c={total:n.length,advertised:n.filter(l=>l.advertised).length,disabled:n.filter(l=>l.state==="disabled").length,blockingConflicts:i,warnings:s.length-i,estimatedTokens:n.reduce((l,d)=>l+d.estimatedTokens,0)};return{skills:n,conflicts:s,summary:c,root:Nr(t.root),scannedAt:Yn(t.scannedAt)}},$r=()=>({version:1,locale:"zh-CN",entries:{}}),Zn=e=>{if(!e||typeof e!="object")throw new ie("\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[]);let t=e;if(t.version!==1||t.locale!=="zh-CN"||!t.entries||typeof t.entries!="object"||Array.isArray(t.entries))throw new ie("\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[]);let n={};for(let[s,i]of Object.entries(t.entries)){if(!i||typeof i!="object")continue;let c=i;typeof c.hash!="string"||typeof c.nameZh!="string"||typeof c.descriptionZh!="string"||typeof c.updatedAt!="number"||(n[s]={hash:c.hash,nameZh:c.nameZh.trim(),descriptionZh:c.descriptionZh.trim(),updatedAt:c.updatedAt})}return{version:1,locale:"zh-CN",entries:n}},yt=e=>{try{return Ln(e).groups}catch(t){throw new ie(t instanceof Error?t.message:"\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[])}},oe=async(e,t,n)=>{let s=await he.serviceRequest({method:e,path:t,...n===void 0?{}:{body:JSON.stringify(n)}}),i;try{i=JSON.parse(s.body)}catch{throw new ie("\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u6570\u636E\uFF0C\u8BF7\u91CD\u8BD5\u3002","parse",[])}if(s.status>=400){let c=i&&typeof i=="object"?i:{},l=typeof c.error=="string"?c.error:`\u8BF7\u6C42\u5931\u8D25\uFF08${s.status}\uFF09`,d=typeof c.code=="string"?c.code:null,g=Array.isArray(c.conflicts)?c.conflicts.map(Io).filter(v=>v!==null):[];throw new ie(l,d,g)}return i},J=e=>e instanceof h?e.code==="NO_SERVICE"?"\u8BF7\u5728\u8BBE\u7F6E \u2192 \u6269\u5C55\u4E2D\u5141\u8BB8\u201C\u6280\u80FD\u5F00\u5173\u201D\u8FD0\u884C\u672C\u5730\u670D\u52A1\u3002":e.code==="SERVICE_FAILED"?"\u672C\u5730\u670D\u52A1\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6269\u5C55\u540E\u91CD\u8BD5\u3002":e.code==="DISABLED"?"\u6280\u80FD\u5F00\u5173\u6269\u5C55\u5DF2\u505C\u7528\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u542F\u7528\u3002":e.code==="HOST_TIMEOUT"?"\u672C\u5730\u670D\u52A1\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5\u3002":e.code==="NOT_GRANTED"?"\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u5141\u8BB8\u201C\u6A21\u578B\u8C03\u7528\u201D\u6743\u9650\uFF0C\u6216\u91CD\u65B0\u5B89\u88C5\u6269\u5C55\u3002":e.code==="UNSUPPORTED"?"\u5F53\u524D\u5BBF\u4E3B\u6216\u6A21\u578B\u4E0D\u652F\u6301\u7FFB\u8BD1\u8BF7\u6C42\u3002":"\u65E0\u6CD5\u8FDE\u63A5\u672C\u5730\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u6269\u5C55\u6388\u6743\u3002":e instanceof ie||e instanceof Error?e.message:"\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002",Dr=e=>e instanceof ie&&e.code==="not-found"?"\u672C\u5730\u670D\u52A1\u7248\u672C\u8FC7\u65E7\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u7981\u7528\u518D\u542F\u7528\u201C\u6280\u80FD\u5F00\u5173\u201D\u3002":J(e),vt=a("main","ext sk");vt.setAttribute("aria-label","\u6280\u80FD\u5F00\u5173");var qn=a("header","sk-header"),Qn=a("div","sk-title-row"),Hr=a("h1","sk-title","\u6280\u80FD\u5F00\u5173"),At=a("div","sk-actions"),Fr=be(At,{label:"\u91CD\u65B0\u626B\u63CF",variant:"outline",size:"sm",onClick:()=>{ir(!0),Uo()}}),Xr=be(At,{label:"\u5168\u90E8\u542F\u7528",variant:"outline",size:"sm",onClick:()=>ar(!0)}),Br=be(At,{label:"\u5168\u90E8\u5173\u95ED",variant:"outline",size:"sm",onClick:()=>ar(!1)});Qn.append(Hr,At);var yo=a("p","sk-summary"),vo=a("p","sk-summary sk-summary-secondary"),er=a("div","sk-translation-row"),wt=a("div","sk-segment");wt.setAttribute("role","group");wt.setAttribute("aria-label","\u6280\u80FD\u8BF4\u660E\u8BED\u8A00");var $e=a("button","sk-segment-button","\u7FFB\u8BD1");$e.type="button";$e.setAttribute("aria-pressed","false");var Qe=a("button","sk-segment-button","\u539F\u6587");Qe.type="button";Qe.setAttribute("aria-pressed","true");wt.append($e,Qe);var Je=a("span","sk-translation-status");Je.setAttribute("aria-live","polite");er.append(wt,Je);qn.append(Qn,yo,vo,er);var tr=a("div","sk-body"),te=a("div","sk-notice-root");te.setAttribute("aria-live","polite");var Ao=a("div","sk-groups-note"),or=a("div","sk-groups-row"),We=a("div","sk-groups"),ke=a("button","sk-chip sk-groups-edit","\u7F16\u8F91\u5206\u7EC4");ke.type="button";ke.setAttribute("aria-pressed","false");ke.addEventListener("click",()=>{A?rr():ns()});or.append(We,ke);var De=a("div","sk-group-editor-root"),wo=a("div"),qe=a("div"),He=a("input","sk-search");He.type="search";He.placeholder="\u641C\u7D22\u540D\u79F0\u6216 ID";He.setAttribute("aria-label","\u641C\u7D22\u6280\u80FD");He.addEventListener("input",()=>{Oo=He.value.trim().toLowerCase(),sr()});var Ye=a("div","sk-list");Ye.setAttribute("role","list");var nr=a("footer","sk-footer");nr.append(a("p","","\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002"),a("p","","\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002"));tr.append(te,Ao,or,De,wo,qe,He,Ye,nr);vt.append(qn,tr);Jn.append(vt);var f=null,Fe=$r(),_e="original",Co=!1,Ze=!1,Tt={done:0,total:0},re=null,Q=!1,Se=null,y=null,p=null,se=null,Z=null,X=null,F=xo(),ae=null,Te=!0,A=null,K=null,Oe=!1,Re=!1,Oo="",Xn=!1,ye=()=>!!f?.root.error,zr=e=>e.state==="conflict"?"error":e.state==="mixed"?"warning":e.state==="disabled"?"info":e.advertised?"success":"warning",Vr=e=>e.state==="conflict"?"\u51B2\u7A81":e.state==="mixed"?"\u6DF7\u5408":e.state==="disabled"?"\u5173\u95ED":"\u5F00\u542F",jr=(e,t="neutral")=>{let n=a("span","sk-badge",e);return n.dataset.tone=t,n},Kr=e=>{switch(e){case"both":return"\u5165\u53E3\u548C\u505C\u7528\u6587\u4EF6\u540C\u65F6\u5B58\u5728";case"duplicate":return"\u540C ID \u591A\u4E2A\u5165\u53E3";case"invalid":return"frontmatter \u65E0\u6CD5\u89E3\u6790";case"empty":return"\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A";case"read-error":return"\u5165\u53E3\u65E0\u6CD5\u8BFB\u53D6";case"manual":return"\u4EC5\u624B\u52A8\u8C03\u7528";case"no-description":return"\u6CA1\u6709 description";default:return"\u51B2\u7A81"}},bo=(e,t)=>{if(!t)return null;let n=a("p","sk-path");return n.append(a("span","sk-path-label",`${e}\uFF1A`),a("code","",t)),n},P=(e,t,n=!1,s=!1)=>{let i=a("button",n?"sk-inline-button sk-inline-primary":"sk-inline-button",e);return i.type="button",i.disabled=!!p||s,i.addEventListener("click",t),i},Bn=e=>{let t=a("li","sk-conflict-item");t.dataset.tone=e.blocking?"error":"warning";let n=a("div","sk-conflict-copy");if(n.append(a("strong","",Kr(e.kind)),a("p","sk-conflict-message",e.message)),e.kind==="both"?(n.append(bo("\u542F\u7528\u5165\u53E3",e.activePath)??a("span")),n.append(bo("\u505C\u7528\u5165\u53E3",e.disabledPath)??a("span"))):(e.activePath??e.disabledPath)&&n.append(bo("\u5165\u53E3",e.activePath??e.disabledPath)??a("span")),t.append(n),e.kind==="both"&&e.activePath){let s=a("div","sk-conflict-actions");s.append(P("\u4FDD\u7559\u542F\u7528",()=>void Kn(e,"enabled"),!1,ye()),P("\u4FDD\u7559\u5173\u95ED",()=>void Kn(e,"disabled"),!1,ye())),t.append(s)}return t},Jr=()=>{if(qe.replaceChildren(),!f)return;let t=[...f.root.error?[{kind:"read-error",skillId:"",message:`\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A${f.root.error}\uFF08${f.root.path}\uFF09`,activePath:null,disabledPath:null,blocking:!0}]:[],...f.conflicts],n=t.filter(l=>l.blocking),s=t.filter(l=>!l.blocking);if(n.length===0&&s.length===0)return;let i=a("section","sk-conflicts");i.setAttribute("aria-label","\u51B2\u7A81\u68C0\u67E5");let c=a("div","sk-section-head");if(c.append(a("h2","sk-section-title","\u51B2\u7A81\u68C0\u67E5"),a("span","sk-section-count",`${n.length} \u9879\u9700\u8981\u5904\u7406 \xB7 ${s.length} \u9879\u63D0\u793A`)),i.append(c),n.length>0){let l=a("ul","sk-conflict-list");for(let d of n)l.append(Bn(d));i.append(l)}if(s.length>0){let l=a("details","sk-warning-details");l.append(a("summary","",`\u63D0\u793A\uFF08${s.length}\uFF09`));let d=a("ul","sk-conflict-list");for(let g of s)d.append(Bn(g));l.append(d),i.append(l)}qe.append(i)},Wr=()=>{if(te.replaceChildren(),Z){let e=Z,t=new Set(e.skillIds),n=f?f.skills.filter(c=>!t.has(c.id)).length:0,s=a("div","sk-notice",`\u4EC5\u542F\u7528\u300C${e.name}\u300D\uFF1A\u5C06\u5173\u95ED\u5176\u4ED6 ${n} \u4E2A\u6280\u80FD\u3002`);s.dataset.tone="warning",s.setAttribute("role","status");let i=a("div","sk-notice-actions");i.append(P("\u786E\u8BA4",()=>void fs(),!0),P("\u53D6\u6D88",()=>{Z=null,m()})),s.append(i),te.append(s);return}if(se!==null){let e=f?f.skills.filter(s=>(se?s.disabledPaths.length:s.activePaths.length)>0).length:0,t=a("div","sk-notice",se?`\u5C06\u542F\u7528 ${e} \u4E2A\u6280\u80FD\u3002`:`\u5C06\u5173\u95ED ${e} \u4E2A\u6280\u80FD\u3002`);t.dataset.tone="warning",t.setAttribute("role","status");let n=a("div","sk-notice-actions");n.append(P(se?"\u786E\u8BA4\u542F\u7528":"\u786E\u8BA4\u5173\u95ED",()=>void xs(),!0),P("\u53D6\u6D88",()=>{se=null,m()})),t.append(n),te.append(t);return}if(y){let e=a("div","sk-notice",y.text);if(e.dataset.tone=y.tone,e.setAttribute("role",y.tone==="error"?"alert":"status"),y.actions?.length){let t=a("div","sk-notice-actions");for(let n of y.actions)t.append(P(n.label,n.onClick,n.primary));e.append(t)}te.append(e);return}if(Se){let e=a("div","sk-notice",Se);e.dataset.tone="error",e.setAttribute("role","alert"),te.append(e);return}if(re){let e=a("div","sk-notice",re);e.dataset.tone="error",e.setAttribute("role","alert"),te.append(e);return}if(Q&&!f){let e=a("div","sk-notice","\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026");e.dataset.tone="info",e.setAttribute("role","status"),te.append(e)}},Yr=()=>{if(!f){yo.textContent=Q?"\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026":"\u5C1A\u672A\u8BFB\u53D6\u6280\u80FD\u3002",vo.textContent="\u5173\u95ED\u5165\u53E3\u6587\u6863\u540E\uFF0COpenCode \u4E0D\u4F1A\u518D\u53D1\u73B0\u8BE5\u6280\u80FD\u3002";return}yo.textContent=`\u6A21\u578B\u53EF\u89C1 ${f.summary.advertised} / \u5171 ${f.summary.total} \u4E2A \xB7 \u7EA6 ${f.summary.estimatedTokens.toLocaleString("zh-CN")} tokens/\u6B65`;let e=[`${f.summary.disabled} \u4E2A\u5DF2\u5173\u95ED`];f.summary.blockingConflicts>0?e.push(`${f.summary.blockingConflicts} \u9879\u963B\u585E\u51B2\u7A81`):e.push("\u65E0\u963B\u585E\u51B2\u7A81"),f.summary.warnings>0&&e.push(`${f.summary.warnings} \u9879\u63D0\u793A`),f.root.error&&e.push("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6"),vo.textContent=`${e.join(" \xB7 ")}\u3002\u4F30\u7B97\u4E0D\u542B\u5185\u7F6E\u548C\u9879\u76EE\u6280\u80FD\u3002`},et=e=>{let t=Fe.entries[e.id];return t&&t.hash===e.contentHash?t:null},Zr=()=>f?.skills.filter(e=>et(e)).length??0,qr=e=>_e!=="translated"?e.name:et(e)?.nameZh||e.name;var Qr=()=>{$e.setAttribute("aria-pressed",_e==="translated"?"true":"false"),Qe.setAttribute("aria-pressed",_e==="original"?"true":"false"),$e.disabled=Ze;let e=f?.skills.length??0,t=Zr();Ze?Je.textContent=`\u7FFB\u8BD1 ${Tt.done}/${Tt.total}\u2026`:_e==="translated"?Je.textContent=t?`${t}/${e} \u5DF2\u7FFB\u8BD1`:"\u70B9\u201C\u7FFB\u8BD1\u201D\u751F\u6210\u4E2D\u6587":Je.textContent=t?`${t} \u4E2A\u6709\u4E2D\u6587`:""},Xe=e=>e.skillIds.filter(t=>f?.skills.some(n=>n.id===t)),es=e=>{let t=Xe(e).map(s=>f?.skills.find(i=>i.id===s)).filter(s=>!!s);if(t.length===0)return"\u65E0\u6280\u80FD";if(t.some(s=>s.state==="conflict"))return"\u6709\u51B2\u7A81";let n=t.filter(s=>s.state==="enabled").length;return n===t.length?"\u5168\u5F00":n===0?"\u5168\u5173":"\u90E8\u5206"},zn=e=>{Array.from(We.querySelectorAll("[data-group]")).find(n=>n.dataset.group===e)?.focus()},ts=()=>`custom-${globalThis.crypto?.randomUUID?.().slice(0,8)??Math.random().toString(36).slice(2,10)}`,os=()=>{if(Ao.replaceChildren(),!ae)return;let e=a("div","sk-notice",`\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF1A${ae}`);e.dataset.tone="error",e.setAttribute("role","alert");let t=a("div","sk-notice-actions");t.append(P("\u91CD\u65B0\u8BFB\u53D6",()=>void Uo(),!1,Te)),e.append(t),Ao.append(e)},Ro=e=>{A={id:e?.id??null,name:e?.name??"",members:e?[...e.skillIds]:[]},K=null,Oe=!1,Re=!1,m();let t=De.querySelector(".sk-group-name");t?.focus(),t?.select()},ns=()=>{if(ae||Te||!f||ye())return;let e=F.find(t=>t.id===X)??F[0]??null;Ro(e),De.scrollIntoView({block:"nearest"})},rr=()=>{p||(A=null,K=null,Oe=!1,Re=!1,m(),ke.focus())},rs=e=>{if(e==="new"){Ro(null);return}let t=F.find(n=>n.id===e);t&&Ro(t)},_o=()=>{De.querySelector(".sk-group-name")?.focus()},Vn=async()=>{let e=A;if(!e||p||ae)return;let t=e.name.trim();if(!t){K="\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0\u3002",m(),_o();return}if(t.length>40){K=`\u5206\u7EC4\u540D\u79F0\u4E0D\u80FD\u8D85\u8FC7 ${40} \u4E2A\u5B57\u7B26\u3002`,m(),_o();return}if(F.some(c=>c.id!==e.id&&c.name.trim().toLowerCase()===t.toLowerCase())){K=`\u5DF2\u7ECF\u6709\u540D\u4E3A\u300C${t}\u300D\u7684\u5206\u7EC4\u3002`,m(),_o();return}if(e.members.length===0){K="\u5206\u7EC4\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u6210\u5458\u3002",m();return}let n=e.id??ts(),s={id:n,name:t,skillIds:[...e.members]},i=e.id?F.map(c=>c.id===e.id?s:c):[...F,s];p="groups",K=null,m();try{F=yt(await oe("POST","/groups",{version:1,groups:i})),ae=null,X=n,Z=null;let c=F.find(l=>l.id===n)??null;A=c?{id:c.id,name:c.name,members:[...c.skillIds]}:null,y={text:`\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C${t}\u300D\u3002`,tone:"success"},he.toast({kind:"success",message:`\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C${t}\u300D`}).catch(()=>{})}catch(c){K=J(c)}finally{p=null,m()}},ss=()=>{!A?.id||p||(Oe=!0,Re=!1,m())},is=async()=>{if(!A?.id||p)return;let e=A.id,t=F.filter(n=>n.id!==e);p="groups",Oe=!1,K=null,m();try{F=yt(await oe("POST","/groups",{version:1,groups:t})),ae=null,Z?.id===e&&(Z=null),X===e&&(X=null);let n=F.find(s=>s.id===X)??F[0]??null;X=n?.id??null,A=n?{id:n.id,name:n.name,members:[...n.skillIds]}:null,y={text:"\u5DF2\u5220\u9664\u5206\u7EC4\u3002",tone:"success"}}catch(n){K=J(n)}finally{p=null,m()}},as=()=>{p||Te||ae||(Re=!0,Oe=!1,m())},cs=async()=>{if(!p){p="groups",Re=!1,K=null,m();try{F=yt(await oe("POST","/groups",{version:1,groups:xo()})),ae=null,X=null,Z=null,A=null,y={text:"\u5DF2\u6062\u590D\u9884\u8BBE\u5206\u7EC4\u3002",tone:"success"}}catch(e){K=J(e)}finally{p=null,m()}}},ls=()=>{if(De.replaceChildren(),!A)return;let e=A,t=a("section","sk-group-editor");t.setAttribute("aria-label","\u7F16\u8F91\u5206\u7EC4");let n=a("div","sk-section-head");n.append(a("h2","sk-section-title","\u7F16\u8F91\u5206\u7EC4"),P("\u5173\u95ED",rr,!1,!!p)),t.append(n);let s=a("label","sk-field");s.append(a("span","sk-field-label","\u9009\u62E9\u5206\u7EC4"));let i=a("select","sk-input");i.setAttribute("aria-label","\u9009\u62E9\u5206\u7EC4");let c=a("option","","\u65B0\u5EFA\u5206\u7EC4");c.value="new",i.append(c);for(let x of F){let I=a("option","",`${x.name}\uFF08${x.skillIds.length}\uFF09`);I.value=x.id,i.append(I)}i.value=e.id??"new",i.disabled=!!p,i.addEventListener("change",()=>rs(i.value)),s.append(i);let l=a("label","sk-field");l.append(a("span","sk-field-label","\u540D\u79F0"));let d=a("input","sk-input sk-group-name");d.type="text",d.value=e.name,d.maxLength=40,d.placeholder="\u4F8B\u5982\uFF1A\u65E5\u5E38\u5F00\u53D1",d.autocomplete="off",d.spellcheck=!1,d.disabled=!!p,d.addEventListener("input",()=>{A&&(A.name=d.value,K=null)}),d.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),Vn())}),l.append(d),t.append(s,l);let g=a("fieldset","sk-members"),v=a("legend","",`\u6210\u5458\uFF08${e.members.length}\uFF09`);g.append(v);let B=a("div","sk-members-tools");B.append(P("\u5168\u9009",()=>{if(!A)return;let x=f?.skills.map(M=>M.id)??[],I=A.members.filter(M=>!x.includes(M));A.members=[...x,...I],m()},!1,!!p),P("\u6E05\u7A7A",()=>{A&&(A.members=[],m())},!1,!!p)),g.append(B);let w=a("div","sk-member-list");for(let x of f?.skills??[]){let I=a("label","sk-check"),M=a("input");M.type="checkbox",M.checked=e.members.includes(x.id),M.disabled=!!p,M.addEventListener("change",()=>{A&&(M.checked?A.members.includes(x.id)||A.members.push(x.id):A.members=A.members.filter(Ae=>Ae!==x.id),v.textContent=`\u6210\u5458\uFF08${A.members.length}\uFF09`,K=null)});let ue=a("span","sk-check-copy");ue.append(a("span","sk-check-name",qr(x)),a("code","sk-check-id",x.id)),I.append(M,ue),w.append(I)}g.append(w);let N=new Set(f?.skills.map(x=>x.id)??[]),ce=e.members.filter(x=>!N.has(x));if(ce.length>0){let x=a("div","sk-missing");x.append(a("span","sk-missing-label","\u76EE\u5F55\u4E2D\u7F3A\u5931\uFF1A"));for(let I of ce){let M=a("button","sk-missing-chip",`${I} \xD7`);M.type="button",M.disabled=!!p,M.title="\u4ECE\u5206\u7EC4\u79FB\u9664\u8FD9\u4E2A\u7F3A\u5931\u6210\u5458",M.addEventListener("click",()=>{A&&(A.members=A.members.filter(ue=>ue!==I),m())}),x.append(M)}g.append(x)}if(t.append(g),K){let x=a("p","sk-editor-error",K);x.setAttribute("role","alert"),t.append(x)}let ve=a("div","sk-editor-actions");if(e.id&&ve.append(P("\u5220\u9664\u5206\u7EC4",ss,!1,!!p)),ve.append(P("\u6062\u590D\u9884\u8BBE",as,!1,!!p),P(e.id?"\u4FDD\u5B58\u66F4\u6539":"\u65B0\u5EFA\u5206\u7EC4",()=>void Vn(),!0,!!p)),t.append(ve),Oe){let x=a("div","sk-editor-confirm");x.dataset.tone="warning",x.append(a("p","",`\u5220\u9664\u5206\u7EC4\u300C${e.name.trim()||"\u672A\u547D\u540D"}\u300D\uFF1F\u6280\u80FD\u672C\u8EAB\u4E0D\u4F1A\u88AB\u5220\u9664\u3002`));let I=a("div","sk-actions");I.append(P("\u786E\u8BA4\u5220\u9664",()=>void is(),!0,!!p),P("\u53D6\u6D88",()=>{Oe=!1,m()},!1,!!p)),x.append(I),t.append(x)}if(Re){let x=a("div","sk-editor-confirm");x.dataset.tone="warning",x.append(a("p","",`\u7528 ${Eo.length} \u4E2A\u9884\u8BBE\u5206\u7EC4\u66FF\u6362\u5F53\u524D ${F.length} \u4E2A\u5206\u7EC4\uFF1F\u5F53\u524D\u5206\u7EC4\u914D\u7F6E\u4F1A\u88AB\u8986\u76D6\u3002`));let I=a("div","sk-actions");I.append(P("\u6062\u590D\u9884\u8BBE",()=>void cs(),!0,!!p),P("\u53D6\u6D88",()=>{Re=!1,m()},!1,!!p)),x.append(I),t.append(x)}t.append(a("p","sk-editor-hint","\u5206\u7EC4\u53EA\u5F71\u54CD\u9762\u677F\u7B5B\u9009\u548C\u6279\u91CF\u5F00\u5173\uFF0C\u4E0D\u6539\u53D8\u6280\u80FD\uFF1B\u6210\u5458\u987A\u5E8F\u51B3\u5B9A\u7EC4\u5185\u6B65\u9AA4\u53F7\uFF0C\u4FDD\u5B58\u540E\u5199\u5165 groups.json\u3002")),De.append(t)},ds=()=>{We.replaceChildren();let e=f?.skills.length??0,t=a("button","sk-chip",`\u5168\u90E8 ${e}`);t.type="button",t.dataset.group="all",t.setAttribute("aria-pressed",X===null?"true":"false"),t.addEventListener("click",()=>{X=null,m(),zn("all")}),We.append(t);for(let n of F){let s=Xe(n).length,i=a("button","sk-chip",`${n.name} ${s}`);i.type="button",i.dataset.group=n.id,i.setAttribute("aria-pressed",X===n.id?"true":"false"),i.addEventListener("click",()=>{X=n.id,m(),zn(n.id)}),We.append(i)}ke.textContent=A?"\u5173\u95ED\u7F16\u8F91":"\u7F16\u8F91\u5206\u7EC4",ke.setAttribute("aria-pressed",A?"true":"false"),ke.disabled=Te||!!ae||!!p||!f||ye(),ke.title=Te?"\u6B63\u5728\u8BFB\u53D6\u5206\u7EC4\u2026":ae?"\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u4FEE\u590D\u6587\u4EF6\u540E\u91CD\u65B0\u8BFB\u53D6":f?ye()?"\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"":"\u6280\u80FD\u5217\u8868\u5C1A\u672A\u8BFB\u53D6"},ps=()=>{if(wo.replaceChildren(),!f||!X)return;let e=f,t=F.find(w=>w.id===X);if(!t)return;let n=Xe(t),s=t.skillIds.filter(w=>!n.includes(w)),c=n.map(w=>e.skills.find(N=>N.id===w)).filter(w=>!!w).some(w=>w.state==="conflict"),l=ye()||c||n.length===0,d=a("div","sk-groupbar"),g=a("div","sk-groupbar-text");g.append(a("strong","",t.name),a("span","sk-group-state",`${n.length} \u4E2A \xB7 ${es(t)}`)),s.length>0&&g.append(a("p","sk-group-warning",`\u7F3A\u5931\uFF1A${s.join("\u3001")}`));let v=a("div","sk-groupbar-actions");v.append(P("\u542F\u7528\u6574\u7EC4",()=>void jn(t,!0),!1,l),P("\u5173\u95ED\u6574\u7EC4",()=>void jn(t,!1),!1,l));let B=P("\u4EC5\u542F\u7528\u672C\u7EC4",()=>us(t),!1,l||s.length>0);s.length>0&&(B.title="\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u5148\u5904\u7406\u540E\u518D\u4EC5\u542F\u7528\u672C\u7EC4"),v.append(B),d.append(g,v),wo.append(d)},jn=async(e,t)=>{if(!f||p)return;let n=Xe(e);if(n.length!==0){p=`group:${e.id}:${t?"on":"off"}`,Z=null,se=null,y=null,m();try{f=Ie(await oe("POST","/skills/batch",{enable:t?n:[],disable:t?[]:n})),y={text:`\u5DF2${t?"\u542F\u7528":"\u5173\u95ED"}\u300C${e.name}\u300D\u7684 ${n.length} \u4E2A\u6280\u80FD\u3002`,tone:"success"},he.toast({kind:"success",message:`${t?"\u5DF2\u542F\u7528":"\u5DF2\u5173\u95ED"}\u300C${e.name}\u300D`}).catch(()=>{})}catch(s){y={text:J(s),tone:"error"},p=null,m(),tt(!1,!0);return}p=null,m()}},us=e=>{if(!f||p)return;let t=Xe(e),n=e.skillIds.filter(s=>!t.includes(s));t.length===0||n.length>0||(Z=e,se=null,y=null,m(),te.scrollIntoView({block:"nearest"}),te.querySelector("button")?.focus())},fs=async()=>{if(!f||p||!Z)return;let e=Z;Z=null;let t=Xe(e),n=e.skillIds.filter(c=>!t.includes(c));if(t.length===0||n.length>0){y={text:"\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u672A\u6267\u884C\u3002",tone:"error"},m();return}let s=new Set(e.skillIds),i=f.skills.filter(c=>!s.has(c.id)).map(c=>c.id);p=`group-only:${e.id}`,y=null,m();try{f=Ie(await oe("POST","/skills/batch",{enable:t,disable:i})),y={text:`\u5DF2\u4EC5\u542F\u7528\u300C${e.name}\u300D\uFF0C\u5173\u95ED\u5176\u4ED6 ${i.length} \u4E2A\u6280\u80FD\u3002`,tone:"success"},he.toast({kind:"success",message:`\u5DF2\u4EC5\u542F\u7528\u300C${e.name}\u300D`}).catch(()=>{})}catch(c){y={text:J(c),tone:"error"},p=null,m(),tt(!1,!0);return}p=null,m()};$e.addEventListener("click",()=>{Co=!0,_e="translated",m(),Es()});Qe.addEventListener("click",()=>{Co=!0,_e="original",m()});var ms=e=>{let t=a("div","sk-skill-action"),n=a("span","sk-action-note"),s=ye();if(e.state==="conflict"){n.textContent=s?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5148\u5904\u7406\u51B2\u7A81";let l=a("button","sk-inline-button","\u5904\u7406\u51B2\u7A81");return l.type="button",l.disabled=!!p||s,l.addEventListener("click",()=>{qe.scrollIntoView({block:"nearest"}),qe.querySelector("button")?.focus()}),t.append(n,l),t}if(e.state==="mixed"){n.textContent=s?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u90E8\u5206\u5165\u53E3\u5173\u95ED";let l=a("div","sk-mini-actions"),d=a("button","sk-inline-button","\u5168\u90E8\u542F\u7528");d.type="button",d.disabled=!!p||s,d.addEventListener("click",()=>void So(e,!0));let g=a("button","sk-inline-button","\u5168\u90E8\u5173\u95ED");return g.type="button",g.disabled=!!p||s,g.addEventListener("click",()=>void So(e,!1)),l.append(d,g),t.append(n,l),t}let i=e.state==="enabled",c=a("button","sk-switch");return c.type="button",c.setAttribute("role","switch"),c.setAttribute("aria-checked",i?"true":"false"),c.setAttribute("aria-label",`${i?"\u5173\u95ED":"\u542F\u7528"} ${e.name}`),c.dataset.skillId=e.id,c.disabled=!!p||s,c.append(a("span","sk-thumb")),c.addEventListener("click",()=>{c.disabled||So(e,!i)}),i?n.textContent=s?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":e.advertised?"\u6A21\u578B\u53EF\u89C1":"\u6A21\u578B\u4E0D\u53EF\u89C1":n.textContent=s?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5165\u53E3\u5DF2\u5173\u95ED",t.append(n,c),t},gs=(e,t=0)=>{let n=a("article","sk-skill");n.dataset.state=e.state,n.setAttribute("role","listitem");let s=a("div","sk-skill-main"),i=a("div","sk-skill-head");if(t>0){let g=a("span","sk-step",String(t));g.title=`\u7B2C ${t} \u6B65`,g.setAttribute("aria-label",`\u7B2C ${t} \u6B65`),i.append(g)}let c=_e==="translated"?et(e):null;i.append(a("strong","sk-name",c?.nameZh||e.name),jr(Vr(e),zr(e)));let l=a("div","sk-meta");c&&l.append(a("span","sk-original-name",e.name)),l.append(a("code","sk-id",e.id));let d=a("p","sk-desc",c?.descriptionZh||e.description||"\u65E0 description\uFF0C\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002");if(s.append(i,l,d),e.warnings.length>0){let g=a("p","sk-warn",e.warnings.slice(0,2).join(" \xB7 "));s.append(g)}return n.append(s,ms(e)),n},sr=()=>{if(Ye.replaceChildren(),!f)return;let e=X?F.find(s=>s.id===X):null,n=(e?e.skillIds.map(s=>f?.skills.find(i=>i.id===s)).filter(s=>!!s):f.skills).filter(s=>{if(!Oo)return!0;let i=et(s);return[s.id,s.name,s.description,i?.nameZh??"",i?.descriptionZh??"",...s.warnings].join(" ").toLowerCase().includes(Oo)});if(n.length===0){let s=a("div","sk-empty");s.append(a("h2","",f.skills.length===0?"\u6CA1\u6709\u53D1\u73B0\u6280\u80FD":e?"\u8FD9\u4E2A\u5206\u7EC4\u6CA1\u6709\u53EF\u7528\u6280\u80FD":"\u6CA1\u6709\u5339\u914D\u7684\u6280\u80FD"),a("p","",f.skills.length===0?"\u68C0\u67E5 ~/.config/opencode/skills \u662F\u5426\u5B58\u5728\uFF0C\u6216\u91CD\u65B0\u626B\u63CF\u3002":e?"\u68C0\u67E5\u5206\u7EC4\u91CC\u7684\u6280\u80FD\u662F\u5426\u88AB\u79FB\u9664\u3002":"\u6362\u4E00\u4E2A\u641C\u7D22\u8BCD\u3002")),Ye.append(s);return}for(let s of n){let i=e&&e.skillIds.length>1?e.skillIds.indexOf(s.id)+1:0;Ye.append(gs(s,i))}},m=()=>{vt.setAttribute("aria-busy",Q?"true":"false"),Yr(),Qr(),Wr(),os(),ds(),ls(),ps(),Jr(),sr(),Fr.update({label:Q?"\u8BFB\u53D6\u4E2D\u2026":"\u91CD\u65B0\u626B\u63CF",loading:Q,disabled:Q||!!p});let e=ye();Xr.update({disabled:Q||!!p||!f||e}),Br.update({disabled:Q||!!p||!f||e})},ks=e=>{Array.from(document.querySelectorAll("[data-skill-id]")).find(n=>n.dataset.skillId===e)?.focus()},tt=async(e=!1,t=!1)=>{if(!Q){Q=!0,t||(Se=null),e&&m();try{f=Ie(await oe("GET","/skills")),Se=null}catch(n){t||(Se=J(n))}finally{Q=!1,m()}}},hs=async()=>{try{Fe=Zn(await oe("POST","/translations",Fe)),re=null}catch(e){re=J(e)}},Es=async()=>{if(!f||Ze)return;let e=f.skills.filter(i=>!et(i));if(e.length===0){y={text:"\u4E2D\u6587\u8BF4\u660E\u5DF2\u662F\u6700\u65B0\u3002",tone:"success"},m();return}Ze=!0,re=null,Tt={done:0,total:e.length},y=null,m();let t=0,n=0,s=!1;try{for(let i=0;i<e.length;i+=4){let c=e.slice(i,i+4),l=c;for(let d=0;d<2&&l.length>0;d+=1){let g=await he.generate({prompt:Pn(l.map(w=>({id:w.id,name:w.name,description:w.description}))),system:Gn,maxOutputTokens:2048}),v=Nn(g.text),B=new Set;for(let w of v){let N=l.find(ce=>ce.id===w.id);N&&(Fe.entries[N.id]={hash:N.contentHash,nameZh:w.nameZh,descriptionZh:w.descriptionZh,updatedAt:Date.now()},B.add(N.id))}l=l.filter(w=>!B.has(w.id))}n+=l.length,t+=c.length-l.length,Tt={done:t,total:e.length},await hs(),m()}}catch(i){s=!0,re=J(i),y={text:re,tone:"error"}}finally{Ze=!1,s||(re?y={text:`\u7FFB\u8BD1\u5B8C\u6210\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A${re}`,tone:"warning"}:n>0?y={text:`\u5DF2\u7FFB\u8BD1 ${t} \u4E2A\u6280\u80FD\uFF0C${n} \u4E2A\u5931\u8D25\uFF1B\u53EF\u518D\u70B9\u201C\u7FFB\u8BD1\u201D\u91CD\u8BD5\u3002`,tone:"warning"}:y={text:`\u5DF2\u7FFB\u8BD1 ${t} \u4E2A\u6280\u80FD\u3002`,tone:"success"}),m()}},Uo=async(e=!1)=>{if(!(Te&&!e||A)){Te=!0,m();try{F=yt(await oe("GET","/groups")),ae=null,X&&!F.some(t=>t.id===X)&&(X=null)}catch(t){ae=Dr(t)}finally{Te=!1,m()}}},ir=async(e=!1)=>{if(Q)return;Q=!0,e&&m();let[t,n]=await Promise.allSettled([oe("GET","/skills"),oe("GET","/translations")]);if(t.status==="fulfilled")try{f=Ie(t.value),Se=null}catch(s){Se=J(s)}else Se=J(t.reason);if(n.status==="fulfilled")try{Fe=Zn(n.value),re=null,!Co&&Object.keys(Fe.entries).length>0&&(_e="translated")}catch(s){re=J(s)}else re=J(n.reason);Q=!1,m()},So=async(e,t)=>{if(!p){p=`toggle:${e.id}`,se=null,Z=null,y=null,m();try{f=Ie(await oe("POST","/skills/toggle",{id:e.id,enabled:t})),y={text:t?`\u5DF2\u542F\u7528 ${e.name}\u3002`:`\u5DF2\u5173\u95ED ${e.name}\uFF1BOpenCode \u4E0B\u4E00\u6B21\u626B\u63CF\u540E\u4E0D\u518D\u53D1\u73B0\u5B83\u3002`,tone:"success"},he.toast({kind:"success",message:t?`\u5DF2\u542F\u7528 ${e.name}`:`\u5DF2\u5173\u95ED ${e.name}`}).catch(()=>{})}catch(n){y={text:J(n),tone:"error"},p=null,m(),tt(!1,!0);return}p=null,m(),ks(e.id)}},Kn=async(e,t)=>{if(p)return;let n=e.activePath??e.disabledPath;if(n){p=`resolve:${n}`,y=null,m();try{let s=await oe("POST","/skills/resolve",{path:n,keep:t}),i=s&&typeof s=="object"&&typeof s.backupPath=="string"?s.backupPath:null;f=Ie(s),y={text:`\u5DF2\u4FDD\u7559${t==="enabled"?"\u542F\u7528":"\u5173\u95ED"}\u5165\u53E3${i?`\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A ${i}`:""}\u3002`,tone:"success"},he.toast({kind:"success",message:"\u5165\u53E3\u51B2\u7A81\u5DF2\u5904\u7406"}).catch(()=>{})}catch(s){y={text:J(s),tone:"error"},p=null,m(),tt(!1,!0);return}p=null,m()}},ar=e=>{!f||p||(se=e,Z=null,y=null,m(),te.scrollIntoView({block:"nearest"}),te.querySelector("button")?.focus())},xs=async()=>{if(se===null||p)return;let e=se;se=null,Z=null,p="bulk",y=null,m();try{let t=await oe("POST","/skills/bulk",{enabled:e}),n=t&&typeof t=="object"&&Array.isArray(t.changed)?t.changed.filter(s=>typeof s=="string"):[];f=Ie(t),y={text:`${e?"\u5DF2\u542F\u7528":"\u5DF2\u5173\u95ED"} ${n.length} \u4E2A\u6280\u80FD\u3002`,tone:"success"},he.toast({kind:"success",message:`${e?"\u5DF2\u542F\u7528":"\u5DF2\u5173\u95ED"} ${n.length} \u4E2A\u6280\u80FD`}).catch(()=>{})}catch(t){y={text:J(t),tone:"error"},p=null,m(),tt(!1,!0);return}p=null,m()};he.onReady(e=>{if(ao(e,document.documentElement),document.documentElement.lang=e.locale.startsWith("zh")?e.locale:"zh-CN",Xn){m();return}Xn=!0,ir(!0),Uo(!0)});m();})();
