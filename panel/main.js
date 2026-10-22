"use strict";(()=>{var _="openchamber.sdk";var Ue="data-oc-scrolling",at=`
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
:hover, [${Ue}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${Ue}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${Ue}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${Ue}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function ct(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",s=>{let i=s.target===e?o:s.target;if(!(i instanceof Element))return;i.hasAttribute("data-oc-scrolling")||i.setAttribute("data-oc-scrolling","");let f=n.get(i);f!==void 0&&clearTimeout(f),n.set(i,setTimeout(()=>{n.delete(i),i.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var _r=`(${ct.toString()})(document);`;var Eo=/^[a-z][a-z0-9-]{0,39}$/;var po=e=>Object(e)===e&&!Array.isArray(e),dt=(e,o)=>Object.keys(e).every(n=>o.includes(n)),uo=e=>String(e)===e&&e.length>=1&&e.length<=60,fo=e=>String(e)===e&&e.length>=1&&e.length<=80,mo=e=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!po(n)||!Eo.test(n.id)||!uo(n.label)||n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1||o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!dt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!dt(n,["kind","id","label","value","options","disabled"])||!fo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let s=new Set;for(let i of n.options){if(!po(i)||!dt(i,["value","label"])||!fo(i.value)||!uo(i.label)||s.has(i.value))return!1;s.add(i.value)}if(!s.has(n.value))return!1}return!0};var lt=e=>"bytes"in e?e.bytes.byteLength:e.content.length,_o=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var ho=/^[A-Za-z0-9_-]{1,80}$/;var xo=["left","right","top","bottom"];var ko=(e,o=0,n={remaining:16e3})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of s)if(!ko(i,o+1,n))return!1;return!0},pt=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(o=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(pt);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(pt)}return String(e)===e||Number.isFinite(e)},ut=e=>{try{return String(e.id)!==e.id||!ho.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!xo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!ko(e.data)||!pt(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var So=["file","directory","other","missing"],Et=e=>!!(e&&"sessionId"in e),mt=e=>!!(e&&"sent"in e&&!("sessionId"in e));var To=/^[0-9a-f]{7,64}$/i,_t=e=>To.test(e),Ie=500,Me=32e3,go=16e3,Ao=128,yo=200,vo=2e3,wo=16e3,Oo=80,Ro=200,Co=16e3;var Uo=2e3;var ht=2e4,Le=1024,Ge=2e6;var Ne=64e3,Pe=8e3,xt=4e3;var kt=96e4,hr=60*6e4;var Io=999,Mo=1e4,he=500,Lo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Go=["stopped","starting","ready","failed"],xr=new Set(Lo),No=e=>xr.has(e),Po=e=>e&&No(e)?e:"HOST_REJECTED",se=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(se):Object(e)===e?Object.values(e).every(se):!1,Ho=e=>se(e)&&JSON.stringify(e).length<=Co,bo=e=>e?.trim().slice(0,Ro)??"",ie=e=>{let o=e.id.trim().slice(0,Ao),n=e.title.trim().slice(0,yo),s=e.url.trim().slice(0,vo),i=e.text?.trim().slice(0,wo),f=e.author?.trim().slice(0,Oo),p=e.kind==="pull"?"pull":"issue",k={providerId:e.providerId.trim(),id:o,title:n||o,url:s,kind:p};if(i&&(k.text=i),f&&(k.author=f),p==="pull"){let C=bo(e.branches?.head),B=bo(e.branches?.base);C&&B&&(k.branches={head:C,base:B})}return Ho(e.data)&&(k.data=e.data),k},bt=e=>{let o=ie(e);return e.projectId&&(o.projectId=e.projectId),e.navigation&&(o.navigation=e.navigation),e.worktree&&(o.worktree=e.worktree),o},St=e=>{let o={text:e.text.trim().slice(0,go)};return e.send&&(o.send=!0),o},Tt=e=>e===null||!Number.isFinite(e)?null:Math.min(Io,Math.max(0,Math.round(e))),gt=e=>Number.isFinite(e)?Math.min(Mo,Math.max(0,Math.ceil(e))):0;var ae=e=>e.length>0&&e.length<=Le&&!e.includes("\0")&&!e.includes("\\");var He=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Uo?!1:!e.split("/").some(n=>n==="."||n===".."),kr=new Set(Go),At=e=>!!(e&&"status"in e&&kr.has(String(e.status))&&!("body"in e)),De=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),yt=e=>!!(e&&"content"in e&&String(e.content)===e.content),vt=e=>!!(e&&"written"in e&&e.written===!0),wt=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),br=new Set(So),Ot=e=>!!(e&&"kind"in e&&"size"in e&&br.has(String(e.kind))&&Number.isFinite(e.size)),Rt=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Sr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Tr=e=>Object(e)===e?e:null,ft=e=>String(e)===e&&e.length>0,gr=e=>{if(!ft(e.id))return null;if(e.ok===!0){let o={channel:_,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(o.payload=e.payload),o}return e.ok===!1&&ft(e.error)?{channel:_,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:Po(ft(e.code)?e.code:void 0)}:null},Ct=e=>{let o=Tr(e);return!o||o.channel!==_||o.v!==1?null:o.type==="result"?gr(o):!Sr.has(String(o.type))||Object(o.payload)!==o.payload?null:o};var Do=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Ar=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",l=class extends Error{code;constructor(o,n){super(n),this.name="HostRequestError",this.code=o}},$o=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),$e=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Le} characters without NUL or backslash.`)),Fe=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},m=e=>(e.value+=1,`oc-${e.value}`),Gt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??(t=>t===o.parent),s=e.requestTimeoutMs??ht,i=new Set,f=new Set,p=new Set,k=new Set,C=new Set,B=new Set,le=new Set,Ae=new Set,ye=new Set,te=new Set,ot=[],pe=null,ue=null,ve=new Set,we=new Set,fe=null,Ee=null,rt=!1,oe=new Map,re=new Map,ne=new Map,V=!1,E={value:0},u=null,j=null,me=!1,_e=!1,Qt=null,Zt=t=>t?{sessionId:t.id,phase:t.busy?"started":"completed"}:null,H=t=>{o.parent.postMessage(t,"*")},eo=()=>{V||o.parent===o||te.size===0||u?.features?.lateGenerateResults!==!0||H({channel:_,v:1,type:"generate-late-listen"})},A=(t,r)=>{for(let c of t)try{c(r)}catch(d){console.error(d)}},to=t=>{if(!(t instanceof MessageEvent)||!n(t.source))return;let r=Ct(t.data);if(!r)return;if(r.type==="workspace"){let d=re.get(r.payload.subscriptionId);d&&A([d],r.payload.snapshot);return}if(r.type==="shells"){let d=ne.get(r.payload.subscriptionId);d&&A([d],r.payload.snapshot);return}if(r.type==="ready"){u=r.payload,j=Zt(r.payload.session),A(i,r.payload),A(f,r.payload.directory),A(p,r.payload.session),j&&A(k,j),A(C,r.payload.connection),A(B,r.payload.settings),A(le,r.payload.item),eo();return}if(r.type==="generate-late"){te.size===0?ot.push(r.payload):A(te,r.payload);return}if(r.type==="directory"){u&&(u={...u,directory:r.payload.directory}),A(f,r.payload.directory);return}if(r.type==="session"){u&&(u={...u,session:r.payload.session}),r.payload.session?j?.sessionId!==r.payload.session.id&&(j=Zt(r.payload.session)):j=null,A(p,r.payload.session);return}if(r.type==="session-lifecycle"){j=r.payload,A(k,r.payload);return}if(r.type==="connection"){u&&(u={...u,connection:r.payload.connection}),A(C,r.payload.connection);return}if(r.type==="settings"){u&&(u={...u,settings:r.payload.settings}),A(B,r.payload.settings);return}if(r.type==="item"){u&&(u={...u,item:r.payload.item}),A(le,r.payload.item);return}if(r.type==="status-control-event"){A(Ae,r.payload);return}if(r.type==="popover-closed"){A(ye,r.payload);return}if(r.type==="action"){let d=b=>{V||H({channel:_,v:1,type:"action-result",id:r.id,payload:b})},S=ue;if(!S){d({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>S(r.payload)).then(()=>d({ok:!0}),b=>{let R=(b instanceof Error?b.message:String(b)).trim();d({ok:!1,error:(R||"Action failed.").slice(0,he)})});return}if(r.type==="file-open"){let d=r.payload;if(Ee&&_o(Ee,d))return;Ee=d,A(ve,r.payload);return}if(r.type==="file-saved"){A(we,r.payload.version);return}if(r.type==="file-snapshot"){let d=R=>{V||H({channel:_,v:1,type:"file-snapshot-result",id:r.id,payload:R})},S=R=>d({error:(R.trim()||"Could not read the edited file.").slice(0,he)}),b=fe;if(!b){S("This extension does not edit files.");return}Promise.resolve().then(()=>b(r.payload.purpose)).then(R=>{if(lt(R)>2e7){S(`The file is over ${2e7} ${"bytes"in R?"bytes":"characters"}.`);return}if(R.version.length>256){S(`The snapshot version is over ${256} characters.`);return}d({snapshot:"bytes"in R?{bytes:R.bytes,version:R.version}:{content:R.content,version:R.version}})},R=>S(R instanceof Error?R.message:String(R)));return}if(r.type==="resolve"){let d=b=>{H({channel:_,v:1,type:"resolve-result",id:r.id,payload:b})},S=pe;if(!S){d({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>S(r.payload)).then(b=>d({item:b?ie(b):null}),b=>{let R=(b instanceof Error?b.message:String(b)).trim();d({error:(R||"Command failed.").slice(0,he)})});return}let c=oe.get(r.id);if(c){if(clearTimeout(c.timer),oe.delete(r.id),r.ok){c.resolve(r.payload);return}c.reject(new l(r.code,r.error))}};o.addEventListener("message",to),H({channel:_,v:1,type:"hello"});let G=(t,r=s)=>V||o.parent===o?Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((c,d)=>{let S=setTimeout(()=>{oe.delete(t.id),d(new l("HOST_TIMEOUT","Host did not answer in time."))},r);oe.set(t.id,{resolve:c,reject:d,timer:S}),H(t)}),w=t=>G(t).then(()=>{}),O={channel:_,v:1},nt=t=>{!V&&o.parent!==o&&H(t)},oo=()=>nt({...O,type:"file-save"}),ro=t=>{!Do(t)||!Ar(t)||(t.preventDefault(),oo())},no=t=>{!Do(t)||t.key!=="Escape"||u?.surface!=="popover"||!u.popover||(t.preventDefault(),co(u.popover.id,"escape").catch(()=>{}))},Oe=()=>{let t=u?.surface==="popover"?u.popover:void 0;if(!t)return;let r=me||_e;Qt!==r&&(Qt=r,lo(t.id,r).catch(()=>{}))},Re=()=>{u?.surface!=="popover"||me||(me=!0,Oe())},so=t=>{u?.surface!=="popover"||t.relatedTarget!==null||!me||(me=!1,Oe())},io=()=>{u?.surface!=="popover"||_e||(_e=!0,Oe())},ao=()=>{u?.surface!=="popover"||!_e||(_e=!1,Oe())},$=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new l("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},st=async t=>{t.kind!=="projects"&&$(t.projectId);let r=await G({...O,type:"workspace-read",id:m(E),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return r},it=async(t,r)=>{t.kind!=="projects"&&$(t.projectId);let c=m(E);re.set(c,r);try{await w({...O,type:"workspace-subscribe",id:m(E),payload:{subscriptionId:c,query:t}})}catch(d){throw re.delete(c),V||H({...O,type:"workspace-unsubscribe",id:m(E),payload:{subscriptionId:c}}),d}return()=>{!re.delete(c)||V||H({...O,type:"workspace-unsubscribe",id:m(E),payload:{subscriptionId:c}})}},mr=async(t,r)=>{t.kind==="session"&&$(t.sessionId),t.kind==="project"&&$(t.projectId);let c=m(E);ne.set(c,r);try{await w({...O,type:"shells-subscribe",id:m(E),payload:{subscriptionId:c,scope:t}})}catch(d){throw ne.delete(c),V||H({...O,type:"shells-unsubscribe",id:m(E),payload:{subscriptionId:c}}),d}return()=>{!ne.delete(c)||V||H({...O,type:"shells-unsubscribe",id:m(E),payload:{subscriptionId:c}})}},Ce=async t=>{if("key"in t&&(t.key.length===0||t.key.length>128))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!se(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>65536)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&u?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let r=await G({...O,type:"storage",id:m(E),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return r},co=(t,r)=>u?.features?.popovers!==!0&&!(u?.surface==="popover"&&u.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):w({...O,type:"popover-close",id:m(E),payload:r?{id:t,reason:r}:{id:t}}),lo=(t,r)=>u?.features?.popovers!==!0&&!(u?.surface==="popover"&&u.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):w({...O,type:"popover-anchor",id:m(E),payload:{id:t,active:r}});return o.addEventListener("keydown",no,!0),o.addEventListener("pointerover",Re),o.addEventListener("pointermove",Re),o.addEventListener("pointerout",so),o.addEventListener("focus",io),o.addEventListener("blur",ao),{onAction:t=>(ue=t,()=>{ue===t&&(ue=null)}),listProjects:async()=>{let t=await st({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async t=>{let r=await st({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return r},listSessions:async t=>{let r=await st({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return r},onProjects:t=>it({kind:"projects"},r=>{r.kind==="projects"&&t(r)}),onWorktrees:(t,r)=>it({kind:"worktrees",projectId:t},c=>{c.kind==="worktrees"&&r(c)}),onSessions:(t,r)=>it({kind:"sessions",projectId:t},c=>{c.kind==="sessions"&&r(c)}),onRunningShells:(t,r)=>mr(t,r),readShellOutput:async(t,r)=>{$(t,128);let c=r?.cursor;if(c!==void 0&&(!Number.isInteger(c)||c<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let d=r?.tailBytes;if(d!==void 0&&(!Number.isInteger(d)||d<1||d>65536))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let b=await G({...O,type:"shell-output",id:m(E),payload:{shellId:t,cursor:c,tailBytes:d}});if(!b||typeof b.output!="string"||!Number.isFinite(b.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return b},stopShell:async t=>{if($(t,128),(await G({...O,type:"shell-stop",id:m(E),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async t=>{$(t),await w({...O,type:"open-session",id:m(E),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let c=Fe(r),d={op:"get",key:t};c&&(d.scope=c);let S=await Ce(d);return S.op==="get"&&S.found?S.value:void 0},set:async(t,r,c)=>{let d=Fe(c),S={op:"set",key:t,value:r};d&&(S.scope=d),await Ce(S)},delete:async(t,r)=>{let c=Fe(r),d={op:"delete",key:t};c&&(d.scope=c),await Ce(d)},keys:async t=>{let r=Fe(t),c={op:"keys"};r&&(c.scope=r);let d=await Ce(c);if(d.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return d.keys}},onReady:t=>(i.add(t),u&&t(u),()=>{i.delete(t)}),onDirectory:t=>(f.add(t),u&&t(u.directory),()=>{f.delete(t)}),onSession:t=>(p.add(t),u&&t(u.session),()=>{p.delete(t)}),onSessionLifecycle:t=>(k.add(t),j&&t(j),()=>{k.delete(t)}),onConnection:t=>(C.add(t),u&&t(u.connection),()=>{C.delete(t)}),onSettings:t=>(B.add(t),u&&t(u.settings),()=>{B.delete(t)}),onItem:t=>(le.add(t),u&&t(u.item),()=>{le.delete(t)}),onStatusControl:t=>(Ae.add(t),()=>{Ae.delete(t)}),onPopoverClosed:t=>(ye.add(t),()=>{ye.delete(t)}),setStatusControls:t=>u?.features?.statusControls!==!0?Promise.reject(new l("UNSUPPORTED","This host does not support status controls.")):mo(t)?w({...O,type:"status-controls",id:m(E),payload:{controls:t}}):Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:t=>u?.features?.popovers!==!0?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):ut(t)?w({...O,type:"popover-open",id:m(E),payload:t}):Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:co,setPopoverAnchorActive:lo,onResolve:t=>(pe=t,()=>{pe===t&&(pe=null)}),toast:t=>{let r=t.message.trim();return!r||r.length>Ie?Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${Ie} characters.`)):t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Me)?Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${Me} characters.`)):w({channel:_,v:1,type:"toast",id:m(E),payload:{...t,message:r}})},openUrl:t=>w({channel:_,v:1,type:"open-url",id:m(E),payload:{url:t}}),openCommit:t=>_t(t)?w({channel:_,v:1,type:"open-commit",id:m(E),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:t=>w({channel:_,v:1,type:"open-surface",id:m(E),payload:{surfaceId:t}}),writeClipboard:t=>w({channel:_,v:1,type:"clipboard-write",id:m(E),payload:{text:t}}),compose:t=>w({channel:_,v:1,type:"compose",id:m(E),payload:t}),attach:t=>w({channel:_,v:1,type:"attach",id:m(E),payload:ie(t)}),startSession:async t=>{t.projectId!==void 0&&$(t.projectId);let r=t.worktree;r&&r!==!0&&(r.kind==="existing"?$(r.directory):(r.name!==void 0&&$(r.name,200),r.baseBranch!==void 0&&$(r.baseBranch,200)));let c=await G({channel:_,v:1,type:"start-session",id:m(E),payload:bt(t)},e.requestTimeoutMs??18e4);if(!Et(c))throw new l("HOST_REJECTED","Host did not return a session.");return c},prompt:t=>G({channel:_,v:1,type:"prompt",id:m(E),payload:St(t)}).then(r=>{if(!mt(r))throw new l("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:t=>w({channel:_,v:1,type:"session-link",id:m(E),payload:ie(t)}),close:()=>w({channel:_,v:1,type:"close",id:m(E)}),oauthStart:()=>w({channel:_,v:1,type:"oauth-start",id:m(E)}),oauthDisconnect:()=>w({channel:_,v:1,type:"oauth-disconnect",id:m(E)}),request:t=>(He(t.path)?G({channel:_,v:1,type:"request",id:m(E),payload:t}):$o()).then(r=>{if(!De(r))throw new l("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:t=>(He(t.path)?G({channel:_,v:1,type:"service-request",id:m(E),payload:t}):$o()).then(r=>{if(!De(r))throw new l("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>G({channel:_,v:1,type:"service-status",id:m(E)}).then(t=>{if(!At(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:t=>(ae(t)?G({channel:_,v:1,type:"file-read",id:m(E),payload:{path:t}}):$e()).then(r=>{if(!yt(r))throw new l("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>ae(t)?r.length>Ge?Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Ge} characters.`)):G({channel:_,v:1,type:"file-write",id:m(E),payload:{path:t,content:r}}).then(c=>{if(!vt(c))throw new l("HOST_REJECTED","Host did not confirm the write.");return c}):$e(),listDir:t=>(ae(t)?G({channel:_,v:1,type:"file-list",id:m(E),payload:{path:t}}):$e()).then(r=>{if(!wt(r))throw new l("HOST_REJECTED","Host did not return directory entries.");return r}),stat:t=>(ae(t)?G({channel:_,v:1,type:"file-stat",id:m(E),payload:{path:t}}):$e()).then(r=>{if(!Ot(r))throw new l("HOST_REJECTED","Host did not return file status.");return r}),generate:t=>{let r=t.prompt.trim(),c=t.system?.trim();if(r.length===0||r.length>Ne)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Ne} characters.`));if(c!==void 0&&(c.length===0||c.length>Pe))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${Pe} characters.`));let d=t.maxOutputTokens===void 0?void 0:Math.min(xt,Math.max(1,Math.floor(t.maxOutputTokens)));if(d!==void 0&&!Number.isFinite(d))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let S={prompt:r};return c!==void 0&&(S.system=c),d!==void 0&&(S.maxOutputTokens=d),G({channel:_,v:1,type:"generate",id:m(E),payload:S},e.requestTimeoutMs??kt).then(b=>{if(!Rt(b))throw new l("HOST_REJECTED","Host did not return generated text.");return b})},onLateGenerateResult:t=>{te.add(t);for(let r of ot.splice(0))A([t],r);return eo(),()=>{te.delete(t)}},setBadge:t=>w({channel:_,v:1,type:"badge",id:m(E),payload:{count:Tt(t)}}),setHeight:t=>w({channel:_,v:1,type:"resize",id:m(E),payload:{height:gt(t)}}),onFileOpen:t=>(ve.add(t),rt||(rt=!0,o.addEventListener("keydown",ro,!0)),Ee&&t(Ee),()=>{ve.delete(t)}),onFileSnapshot:t=>(fe=t,()=>{fe===t&&(fe=null)}),onFileSaved:t=>(we.add(t),()=>{we.delete(t)}),reportFileChange:t=>nt({...O,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:oo,reportFileUnsupported:()=>nt({...O,type:"file-unsupported"}),dispose:()=>{for(let t of re.keys())H({...O,type:"workspace-unsubscribe",id:m(E),payload:{subscriptionId:t}});re.clear();for(let t of ne.keys())H({...O,type:"shells-unsubscribe",id:m(E),payload:{subscriptionId:t}});ne.clear(),V=!0,pe=null,ue=null,fe=null,ve.clear(),we.clear(),rt&&o.removeEventListener("keydown",ro,!0),o.removeEventListener("message",to),o.removeEventListener("keydown",no,!0),o.removeEventListener("pointerover",Re),o.removeEventListener("pointermove",Re),o.removeEventListener("pointerout",so),o.removeEventListener("focus",io),o.removeEventListener("blur",ao);for(let t of oe.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));oe.clear(),i.clear(),f.clear(),p.clear(),k.clear(),C.clear(),B.clear(),le.clear(),Ae.clear(),ye.clear(),te.clear(),ot.length=0}}};var Bo=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var yn=new Set(Bo);var Vo=["none","agent","user"];var wn=new Set(Vo);var yr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],vr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],zo=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,s]of yr)o.style.setProperty(n,e.tokens[s]);for(let[n,s,i]of vr){let f=e.tokens[i]??"";o.style.setProperty(n,f),o.style.setProperty(s,f)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Nt=(e,o)=>{zo(e.theme,o),o.dataset&&(o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode)};var wr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},g=(e,o)=>`var(--${e}, var(--oc-${wr[e]}, ${o}))`,W=g("surface-background","transparent"),Be=g("surface-elevated","transparent"),ce=g("surface-elevated-foreground","inherit"),D=g("surface-foreground","inherit"),T=g("surface-muted-foreground","gray"),Or=g("surface-muted","transparent"),Y=g("interactive-border","currentColor"),N=g("interactive-hover","transparent"),ee=g("interactive-active","transparent"),Pt=g("interactive-selection","transparent"),Ht=g("interactive-selection-foreground","inherit"),K=g("primary","currentColor"),Dt=g("primary-text","inherit"),$t=g("error-text","inherit"),Rr=g("font-sans","inherit"),Ft=g("font-mono","monospace"),Yo=g("radius","9px"),Xt=`calc(${Yo} - 2px)`,jo=`calc(${Yo} - 4px)`,y=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,Ko=`background-image: linear-gradient(${N}, ${N});`,Bt=e=>`box-shadow: inset 0 0 0 1px ${e}, var(--oc-sdk-field-lift);`,Vt="box-shadow: inset 0 0 0 1px var(--oc-sdk-edge), var(--oc-sdk-raised-lift);",Wo="box-shadow: var(--oc-sdk-lit);",Jo=`inset 0 1px 0 0 ${y(D,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,Cr=`
:root {
  --oc-sdk-edge: ${y(D,10)};
  --oc-sdk-field-bg: ${Be};
  --oc-sdk-raised-bg: ${W};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 0 0 1px rgb(0 0 0 / 0.1), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${y(D,6)};
  --oc-sdk-field-bg: ${y(W,50,Be)};
  --oc-sdk-raised-bg: ${Be};
  --oc-sdk-field-lift: ${Jo};
  --oc-sdk-raised-lift: ${Jo};
  --oc-sdk-lit: inset 0 1px 0 0 ${y(D,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 0 0 1px rgb(0 0 0 / 0.36), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,Xe=e=>{let o=g(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${g(`${e}-text`,"inherit")}; }`},Ur=`
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
`,qo=`${Cr}
.oc-sdk { color: ${D}; font-family: ${Rr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Ko} }
.oc-sdk-mono { font-family: ${Ft}; }
.oc-sdk-muted { color: ${T}; }
${Xe("success")}${Xe("warning")}${Xe("error")}${Xe("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${K}; --oc-sdk-tone-text: ${Dt}; }

.oc-sdk-btn { border-radius: ${Xt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${jo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Dt}; background: ${y(K,10,W)}; border-color: ${y(K,12)}; ${Wo} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${y(K,16,W)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${y(K,22,W)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Or}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ee}, ${ee}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${ce}; border-color: transparent; ${Vt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ee}, ${ee}); box-shadow: inset 0 0 0 1px var(--oc-sdk-edge); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${N}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ee}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${g("status-error","red")}; color: ${$t}; background: ${y("var(--oc-sdk-tone)",7,W)}; border-color: ${y("var(--oc-sdk-tone)",12)}; ${Wo} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${y("var(--oc-sdk-tone)",9,W)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${y("var(--oc-sdk-tone)",11,W)}; box-shadow: none; }

.oc-sdk-field-note { color: ${T}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${$t}; }
.oc-sdk-input { border-radius: ${Xt}; background: var(--oc-sdk-field-bg); color: ${ce}; ${Bt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${T}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Bt(y(D,26))} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Bt(g("status-error","red"))} }
.oc-sdk-input[data-mono="true"] { font-family: ${Ft}; }

.oc-sdk-search-icon { color: ${T}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${K}; }
.oc-sdk-search-clear { border-radius: ${jo}; color: ${T}; }
.oc-sdk-search-clear:hover { background: ${N}; color: ${D}; }

.oc-sdk-trigger { border-color: transparent; border-radius: ${Xt}; background: var(--oc-sdk-raised-bg); color: ${ce}; ${Vt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ee}, ${ee}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${T}; }
.oc-sdk-trigger-chevron { color: ${T}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow, no border. */
.oc-sdk-popup { --surface-foreground: ${ce}; border-color: transparent; border-radius: 12px; background: ${Be}; color: ${ce}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${N}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Pt}; color: ${Ht}; }
.oc-sdk-option-check { color: ${D}; }
.oc-sdk-option[data-destructive="true"] { color: ${$t}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${y(g("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${T}; }
.oc-sdk-popup-empty { color: ${T}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Y}; border-radius: 4px; color: ${D}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${y(D,60,Y)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Y}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${W}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${K}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Ko} }
.oc-sdk-check-desc { color: ${T}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${y(D,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${T}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${D}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ht}; background: ${Pt}; border-color: ${Y}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${ce}; background: var(--oc-sdk-raised-bg); border-color: transparent; ${Vt} }
.oc-sdk-tab-count { color: ${T}; }

.oc-sdk-badge { border-radius: 9999px; background: ${N}; color: ${T}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${y("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${N}; }
.oc-sdk-row[aria-selected="true"] { background: ${Pt}; color: ${Ht}; }
.oc-sdk-row-lead { font-family: ${Ft}; color: ${T}; }
.oc-sdk-row-sub { color: ${T}; }
.oc-sdk-row-meta { color: ${T}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${T}; }

.oc-sdk-empty-body { color: ${T}; }

.oc-sdk-spinner { color: ${T}; }
.oc-sdk-spinner-ring { border-color: ${Y}; border-top-color: ${K}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${y("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${T}; }

.oc-sdk-separator { color: ${T}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${y(Y,40)}; }

.oc-sdk-progress-label { color: ${T}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${Y}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${K}); }

.oc-sdk-text a { color: ${Dt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${y(Y,60)}; }
`,U=`
${at}
${Ur}
${qo}`;var Qo="oc-sdk-ui-style";var I=e=>{let o=document.getElementById(Qo);if(o instanceof HTMLStyleElement){o.textContent!==e&&(o.textContent=e);return}ct(document);let n=document.createElement("style");n.id=Qo,n.textContent=e,document.head.appendChild(n)},M=(e,o)=>{let n=document.createElement(e);return o&&(n.className=o),n},q=e=>{let o=M("button",e);return o.type="button",o},F=(e,o)=>{let n=o??"";e.textContent!==n&&(e.textContent=n)};var Ir=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Q=(e,o)=>{I(U);let n=o,s=q("oc-sdk oc-sdk-btn"),i=Ir(),f=document.createElement("span");s.append(f),e.append(s);let p=()=>{s.dataset.variant=n.variant??"default",s.dataset.size=n.size??"default",s.disabled=!!n.disabled||!!n.loading,s.dataset.loading=n.loading?"true":"false",s.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&i.parentNode!==s?s.prepend(i):!n.loading&&i.parentNode===s&&i.remove(),F(f,n.label)},k=()=>{n.disabled||n.loading||n.onClick()};return s.addEventListener("click",k),p(),{update:C=>{n={...n,...C},p()},dispose:()=>{s.removeEventListener("click",k),s.remove()}}};var Zo=`:root {
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
}
@media (prefers-reduced-motion: reduce) {
  .sk-switch,
  .sk-switch .sk-thumb {
    transition: none;
  }
}
`;var er=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
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
`;var Te=Gt({requestTimeoutMs:3e4}),ir=document.querySelector("#root");if(!ir)throw new Error("Missing #root");var ar=document.createElement("style");ar.textContent=er+Zo;document.head.append(ar);var a=(e,o="",n)=>{let s=document.createElement(e);return s.className=o,n!==void 0&&(s.textContent=n),s},Z=class extends Error{code;conflicts;constructor(o,n,s){super(o),this.name="ServiceError",this.code=n,this.conflicts=s}},Dr=e=>e==="enabled"||e==="disabled"||e==="mixed"||e==="conflict",$r=e=>e==="both"||e==="duplicate"||e==="invalid"||e==="empty"||e==="read-error"||e==="manual"||e==="no-description",We=(e,o="")=>typeof e=="string"?e:o,tr=e=>typeof e=="string"&&e.length>0?e:null,Je=e=>e===!0,cr=e=>typeof e=="number"&&Number.isFinite(e)?e:0,or=e=>Array.isArray(e)?e.filter(o=>typeof o=="string"):[],qt=e=>{if(!e||typeof e!="object")return null;let o=e;return!$r(o.kind)||typeof o.skillId!="string"?null:{kind:o.kind,skillId:o.skillId,message:We(o.message,"\u51B2\u7A81"),activePath:tr(o.activePath),disabledPath:tr(o.disabledPath),blocking:Je(o.blocking)}},Fr=e=>{if(!e||typeof e!="object")return null;let o=e;return typeof o.id!="string"||!o.id||!Dr(o.state)?null:{id:o.id,name:We(o.name,o.id),description:We(o.description),state:o.state,advertised:Je(o.advertised),autoInvokeOff:Je(o.autoInvokeOff),activePaths:or(o.activePaths),disabledPaths:or(o.disabledPaths),conflicts:Array.isArray(o.conflicts)?o.conflicts.map(qt).filter(n=>n!==null):[],warnings:Array.isArray(o.warnings)?o.warnings.filter(n=>typeof n=="string"):[],estimatedTokens:cr(o.estimatedTokens)}},Xr=e=>{if(!e||typeof e!="object")throw new Z("\u670D\u52A1\u8FD4\u56DE\u7684\u6280\u80FD\u76EE\u5F55\u4FE1\u606F\u4E0D\u6B63\u786E\u3002","parse",[]);let o=e;return{path:We(o.path),exists:Je(o.exists),error:typeof o.error=="string"?o.error:null}},qe=e=>{if(!e||typeof e!="object")throw new Z("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[]);let o=e;if(!Array.isArray(o.skills))throw new Z("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[]);let n=o.skills.map(Fr).filter(p=>p!==null),s=Array.isArray(o.conflicts)?o.conflicts.map(qt).filter(p=>p!==null):n.flatMap(p=>p.conflicts),i=s.filter(p=>p.blocking).length,f={total:n.length,advertised:n.filter(p=>p.advertised).length,disabled:n.filter(p=>p.state==="disabled").length,blockingConflicts:i,warnings:s.length-i,estimatedTokens:n.reduce((p,k)=>p+k.estimatedTokens,0)};return{skills:n,conflicts:s,summary:f,root:Xr(o.root),scannedAt:cr(o.scannedAt)}},Qe=async(e,o,n)=>{let s=await Te.serviceRequest({method:e,path:o,...n===void 0?{}:{body:JSON.stringify(n)}}),i;try{i=JSON.parse(s.body)}catch{throw new Z("\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u6570\u636E\uFF0C\u8BF7\u91CD\u8BD5\u3002","parse",[])}if(s.status>=400){let f=i&&typeof i=="object"?i:{},p=typeof f.error=="string"?f.error:`\u8BF7\u6C42\u5931\u8D25\uFF08${s.status}\uFF09`,k=typeof f.code=="string"?f.code:null,C=Array.isArray(f.conflicts)?f.conflicts.map(qt).filter(B=>B!==null):[];throw new Z(p,k,C)}return i},Ze=e=>e instanceof l?e.code==="NO_SERVICE"?"\u8BF7\u5728\u8BBE\u7F6E \u2192 \u6269\u5C55\u4E2D\u5141\u8BB8\u201C\u6280\u80FD\u5F00\u5173\u201D\u8FD0\u884C\u672C\u5730\u670D\u52A1\u3002":e.code==="SERVICE_FAILED"?"\u672C\u5730\u670D\u52A1\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6269\u5C55\u540E\u91CD\u8BD5\u3002":e.code==="DISABLED"?"\u6280\u80FD\u5F00\u5173\u6269\u5C55\u5DF2\u505C\u7528\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u542F\u7528\u3002":e.code==="HOST_TIMEOUT"?"\u672C\u5730\u670D\u52A1\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5\u3002":"\u65E0\u6CD5\u8FDE\u63A5\u672C\u5730\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u6269\u5C55\u6388\u6743\u3002":e instanceof Z||e instanceof Error?e.message:"\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002",et=a("main","ext sk");et.setAttribute("aria-label","\u6280\u80FD\u5F00\u5173");var dr=a("header","sk-header"),lr=a("div","sk-title-row"),Br=a("h1","sk-title","\u6280\u80FD\u5F00\u5173"),tt=a("div","sk-actions"),Vr=Q(tt,{label:"\u91CD\u65B0\u626B\u63CF",variant:"outline",size:"sm",onClick:()=>void ge(!0)}),zr=Q(tt,{label:"\u5168\u90E8\u542F\u7528",variant:"outline",size:"sm",onClick:()=>Er(!0)}),jr=Q(tt,{label:"\u5168\u90E8\u5173\u95ED",variant:"outline",size:"sm",onClick:()=>Er(!1)});lr.append(Br,tt);var Wt=a("p","sk-summary"),Jt=a("p","sk-summary sk-summary-secondary");dr.append(lr,Wt,Jt);var pr=a("div","sk-body"),J=a("div","sk-notice-root");J.setAttribute("aria-live","polite");var Se=a("div"),de=a("input","sk-search");de.type="search";de.placeholder="\u641C\u7D22\u540D\u79F0\u6216 ID";de.setAttribute("aria-label","\u641C\u7D22\u6280\u80FD");de.addEventListener("input",()=>{Yt=de.value.trim().toLowerCase(),fr()});var xe=a("div","sk-list");xe.setAttribute("role","list");var ur=a("footer","sk-footer");ur.append(a("p","","\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002"),a("p","","\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002"));pr.append(J,Se,de,xe,ur);et.append(dr,pr);ir.append(et);var x=null,X=!1,ke=null,L=null,v=null,z=null,Yt="",rr=!1,Ye=()=>!!x?.root.error,Kr=e=>e.state==="conflict"?"error":e.state==="mixed"?"warning":e.state==="disabled"?"info":e.advertised?"success":"warning",Wr=e=>e.state==="conflict"?"\u51B2\u7A81":e.state==="mixed"?"\u6DF7\u5408":e.state==="disabled"?"\u5173\u95ED":"\u5F00\u542F",Jr=(e,o="neutral")=>{let n=a("span","sk-badge",e);return n.dataset.tone=o,n},Yr=e=>{switch(e){case"both":return"\u5165\u53E3\u548C\u505C\u7528\u6587\u4EF6\u540C\u65F6\u5B58\u5728";case"duplicate":return"\u540C ID \u591A\u4E2A\u5165\u53E3";case"invalid":return"frontmatter \u65E0\u6CD5\u89E3\u6790";case"empty":return"\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A";case"read-error":return"\u5165\u53E3\u65E0\u6CD5\u8BFB\u53D6";case"manual":return"\u4EC5\u624B\u52A8\u8C03\u7528";case"no-description":return"\u6CA1\u6709 description";default:return"\u51B2\u7A81"}},jt=(e,o)=>{if(!o)return null;let n=a("p","sk-path");return n.append(a("span","sk-path-label",`${e}\uFF1A`),a("code","",o)),n},be=(e,o,n=!1,s=!1)=>{let i=a("button",n?"sk-inline-button sk-inline-primary":"sk-inline-button",e);return i.type="button",i.disabled=!!v||s,i.addEventListener("click",o),i},nr=e=>{let o=a("li","sk-conflict-item");o.dataset.tone=e.blocking?"error":"warning";let n=a("div","sk-conflict-copy");if(n.append(a("strong","",Yr(e.kind)),a("p","sk-conflict-message",e.message)),e.kind==="both"?(n.append(jt("\u542F\u7528\u5165\u53E3",e.activePath)??a("span")),n.append(jt("\u505C\u7528\u5165\u53E3",e.disabledPath)??a("span"))):(e.activePath??e.disabledPath)&&n.append(jt("\u5165\u53E3",e.activePath??e.disabledPath)??a("span")),o.append(n),e.kind==="both"&&e.activePath){let s=a("div","sk-conflict-actions");s.append(be("\u4FDD\u7559\u542F\u7528",()=>void sr(e,"enabled"),!1,Ye()),be("\u4FDD\u7559\u5173\u95ED",()=>void sr(e,"disabled"),!1,Ye())),o.append(s)}return o},qr=()=>{if(Se.replaceChildren(),!x)return;let o=[...x.root.error?[{kind:"read-error",skillId:"",message:`\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A${x.root.error}\uFF08${x.root.path}\uFF09`,activePath:null,disabledPath:null,blocking:!0}]:[],...x.conflicts],n=o.filter(p=>p.blocking),s=o.filter(p=>!p.blocking);if(n.length===0&&s.length===0)return;let i=a("section","sk-conflicts");i.setAttribute("aria-label","\u51B2\u7A81\u68C0\u67E5");let f=a("div","sk-section-head");if(f.append(a("h2","sk-section-title","\u51B2\u7A81\u68C0\u67E5"),a("span","sk-section-count",`${n.length} \u9879\u9700\u8981\u5904\u7406 \xB7 ${s.length} \u9879\u63D0\u793A`)),i.append(f),n.length>0){let p=a("ul","sk-conflict-list");for(let k of n)p.append(nr(k));i.append(p)}if(s.length>0){let p=a("details","sk-warning-details");p.append(a("summary","",`\u63D0\u793A\uFF08${s.length}\uFF09`));let k=a("ul","sk-conflict-list");for(let C of s)k.append(nr(C));p.append(k),i.append(p)}Se.append(i)},Qr=()=>{if(J.replaceChildren(),z!==null){let e=x?x.skills.filter(s=>(z?s.disabledPaths.length:s.activePaths.length)>0).length:0,o=a("div","sk-notice",z?`\u5C06\u542F\u7528 ${e} \u4E2A\u6280\u80FD\u3002`:`\u5C06\u5173\u95ED ${e} \u4E2A\u6280\u80FD\u3002`);o.dataset.tone="warning",o.setAttribute("role","status");let n=a("div","sk-notice-actions");n.append(be(z?"\u786E\u8BA4\u542F\u7528":"\u786E\u8BA4\u5173\u95ED",()=>void rn(),!0),be("\u53D6\u6D88",()=>{z=null,P()})),o.append(n),J.append(o);return}if(L){let e=a("div","sk-notice",L.text);if(e.dataset.tone=L.tone,e.setAttribute("role",L.tone==="error"?"alert":"status"),L.actions?.length){let o=a("div","sk-notice-actions");for(let n of L.actions)o.append(be(n.label,n.onClick,n.primary));e.append(o)}J.append(e);return}if(ke){let e=a("div","sk-notice",ke);e.dataset.tone="error",e.setAttribute("role","alert"),J.append(e);return}if(X&&!x){let e=a("div","sk-notice","\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026");e.dataset.tone="info",e.setAttribute("role","status"),J.append(e)}},Zr=()=>{if(!x){Wt.textContent=X?"\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026":"\u5C1A\u672A\u8BFB\u53D6\u6280\u80FD\u3002",Jt.textContent="\u5173\u95ED\u5165\u53E3\u6587\u6863\u540E\uFF0COpenCode \u4E0D\u4F1A\u518D\u53D1\u73B0\u8BE5\u6280\u80FD\u3002";return}Wt.textContent=`\u6A21\u578B\u53EF\u89C1 ${x.summary.advertised} / \u5171 ${x.summary.total} \u4E2A \xB7 \u7EA6 ${x.summary.estimatedTokens.toLocaleString("zh-CN")} tokens/\u6B65`;let e=[`${x.summary.disabled} \u4E2A\u5DF2\u5173\u95ED`];x.summary.blockingConflicts>0?e.push(`${x.summary.blockingConflicts} \u9879\u963B\u585E\u51B2\u7A81`):e.push("\u65E0\u963B\u585E\u51B2\u7A81"),x.summary.warnings>0&&e.push(`${x.summary.warnings} \u9879\u63D0\u793A`),x.root.error&&e.push("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6"),Jt.textContent=`${e.join(" \xB7 ")}\u3002\u4F30\u7B97\u4E0D\u542B\u5185\u7F6E\u548C\u9879\u76EE\u6280\u80FD\u3002`},en=e=>{let o=a("div","sk-skill-action"),n=a("span","sk-action-note"),s=Ye();if(e.state==="conflict"){n.textContent=s?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5148\u5904\u7406\u51B2\u7A81";let p=a("button","sk-inline-button","\u5904\u7406\u51B2\u7A81");return p.type="button",p.disabled=!!v||s,p.addEventListener("click",()=>{Se.scrollIntoView({block:"nearest"}),Se.querySelector("button")?.focus()}),o.append(n,p),o}if(e.state==="mixed"){n.textContent=s?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u90E8\u5206\u5165\u53E3\u5173\u95ED";let p=a("div","sk-mini-actions"),k=a("button","sk-inline-button","\u5168\u90E8\u542F\u7528");k.type="button",k.disabled=!!v||s,k.addEventListener("click",()=>void Kt(e,!0));let C=a("button","sk-inline-button","\u5168\u90E8\u5173\u95ED");return C.type="button",C.disabled=!!v||s,C.addEventListener("click",()=>void Kt(e,!1)),p.append(k,C),o.append(n,p),o}let i=e.state==="enabled",f=a("button","sk-switch");return f.type="button",f.setAttribute("role","switch"),f.setAttribute("aria-checked",i?"true":"false"),f.setAttribute("aria-label",`${i?"\u5173\u95ED":"\u542F\u7528"} ${e.name}`),f.dataset.skillId=e.id,f.disabled=!!v||s,f.append(a("span","sk-thumb")),f.addEventListener("click",()=>{f.disabled||Kt(e,!i)}),i?n.textContent=s?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":e.advertised?"\u6A21\u578B\u53EF\u89C1":"\u6A21\u578B\u4E0D\u53EF\u89C1":n.textContent=s?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5165\u53E3\u5DF2\u5173\u95ED",o.append(n,f),o},tn=e=>{let o=a("article","sk-skill");o.dataset.state=e.state,o.setAttribute("role","listitem");let n=a("div","sk-skill-main"),s=a("div","sk-skill-head");s.append(a("strong","sk-name",e.name),Jr(Wr(e),Kr(e)));let i=a("div","sk-meta");i.append(a("code","sk-id",e.id));let f=a("p","sk-desc",e.description||"\u65E0 description\uFF0C\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002");if(n.append(s,i,f),e.warnings.length>0){let p=a("p","sk-warn",e.warnings.slice(0,2).join(" \xB7 "));n.append(p)}return o.append(n,en(e)),o},fr=()=>{if(xe.replaceChildren(),!x)return;let e=x.skills.filter(o=>Yt?[o.id,o.name,o.description,...o.warnings].join(" ").toLowerCase().includes(Yt):!0);if(e.length===0){let o=a("div","sk-empty");o.append(a("h2","",x.skills.length===0?"\u6CA1\u6709\u53D1\u73B0\u6280\u80FD":"\u6CA1\u6709\u5339\u914D\u7684\u6280\u80FD"),a("p","",x.skills.length===0?"\u68C0\u67E5 ~/.config/opencode/skills \u662F\u5426\u5B58\u5728\uFF0C\u6216\u91CD\u65B0\u626B\u63CF\u3002":"\u6362\u4E00\u4E2A\u641C\u7D22\u8BCD\u3002")),xe.append(o);return}for(let o of e)xe.append(tn(o))},P=()=>{et.setAttribute("aria-busy",X?"true":"false"),Zr(),Qr(),qr(),fr(),Vr.update({label:X?"\u8BFB\u53D6\u4E2D\u2026":"\u91CD\u65B0\u626B\u63CF",loading:X,disabled:X||!!v});let e=Ye();zr.update({disabled:X||!!v||!x||e}),jr.update({disabled:X||!!v||!x||e})},on=e=>{Array.from(document.querySelectorAll("[data-skill-id]")).find(n=>n.dataset.skillId===e)?.focus()},ge=async(e=!1,o=!1)=>{if(!X){X=!0,o||(ke=null),e&&P();try{x=qe(await Qe("GET","/skills")),ke=null}catch(n){o||(ke=Ze(n))}finally{X=!1,P()}}},Kt=async(e,o)=>{if(!v){v=`toggle:${e.id}`,z=null,L=null,P();try{x=qe(await Qe("POST","/skills/toggle",{id:e.id,enabled:o})),L={text:o?`\u5DF2\u542F\u7528 ${e.name}\u3002`:`\u5DF2\u5173\u95ED ${e.name}\uFF1BOpenCode \u4E0B\u4E00\u6B21\u626B\u63CF\u540E\u4E0D\u518D\u53D1\u73B0\u5B83\u3002`,tone:"success"},Te.toast({kind:"success",message:o?`\u5DF2\u542F\u7528 ${e.name}`:`\u5DF2\u5173\u95ED ${e.name}`}).catch(()=>{})}catch(n){L={text:Ze(n),tone:"error"},v=null,P(),ge(!1,!0);return}v=null,P(),on(e.id)}},sr=async(e,o)=>{if(v)return;let n=e.activePath??e.disabledPath;if(n){v=`resolve:${n}`,L=null,P();try{let s=await Qe("POST","/skills/resolve",{path:n,keep:o}),i=s&&typeof s=="object"&&typeof s.backupPath=="string"?s.backupPath:null;x=qe(s),L={text:`\u5DF2\u4FDD\u7559${o==="enabled"?"\u542F\u7528":"\u5173\u95ED"}\u5165\u53E3${i?`\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A ${i}`:""}\u3002`,tone:"success"},Te.toast({kind:"success",message:"\u5165\u53E3\u51B2\u7A81\u5DF2\u5904\u7406"}).catch(()=>{})}catch(s){L={text:Ze(s),tone:"error"},v=null,P(),ge(!1,!0);return}v=null,P()}},Er=e=>{!x||v||(z=e,L=null,P(),J.scrollIntoView({block:"nearest"}),J.querySelector("button")?.focus())},rn=async()=>{if(z===null||v)return;let e=z;z=null,v="bulk",L=null,P();try{let o=await Qe("POST","/skills/bulk",{enabled:e}),n=o&&typeof o=="object"&&Array.isArray(o.changed)?o.changed.filter(s=>typeof s=="string"):[];x=qe(o),L={text:`${e?"\u5DF2\u542F\u7528":"\u5DF2\u5173\u95ED"} ${n.length} \u4E2A\u6280\u80FD\u3002`,tone:"success"},Te.toast({kind:"success",message:`${e?"\u5DF2\u542F\u7528":"\u5DF2\u5173\u95ED"} ${n.length} \u4E2A\u6280\u80FD`}).catch(()=>{})}catch(o){L={text:Ze(o),tone:"error"},v=null,P(),ge(!1,!0);return}v=null,P()};Te.onReady(e=>{if(Nt(e,document.documentElement),document.documentElement.lang=e.locale.startsWith("zh")?e.locale:"zh-CN",rr){P();return}rr=!0,ge(!0)});P();})();
