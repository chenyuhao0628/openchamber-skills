"use strict";(()=>{var v="openchamber.sdk";var pt="data-oc-scrolling",Gt=`
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
:hover, [${pt}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${pt}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${pt}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${pt}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Pt(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",r=>{let s=r.target===e?t:r.target;if(!(s instanceof Element))return;s.hasAttribute("data-oc-scrolling")||s.setAttribute("data-oc-scrolling","");let c=o.get(s);c!==void 0&&clearTimeout(c),o.set(s,setTimeout(()=>{o.delete(s),s.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var xr=`(${Pt.toString()})(document);`;var Qo=/^[a-z][a-z0-9-]{0,39}$/;var Yo=e=>Object(e)===e&&!Array.isArray(e),Nt=(e,t)=>Object.keys(e).every(o=>t.includes(o)),Zo=e=>String(e)===e&&e.length>=1&&e.length<=60,qo=e=>String(e)===e&&e.length>=1&&e.length<=80,en=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let o of e){if(!Yo(o)||!Qo.test(o.id)||!Zo(o.label)||o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1||t.has(o.id))return!1;if(t.add(o.id),o.kind==="button"){if(!Nt(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!Nt(o,["kind","id","label","value","options","disabled"])||!qo(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let r=new Set;for(let s of o.options){if(!Yo(s)||!Nt(s,["value","label"])||!qo(s.value)||!Zo(s.label)||r.has(s.value))return!1;r.add(s.value)}if(!r.has(o.value))return!1}return!0};var $t=e=>"bytes"in e?e.bytes.byteLength:e.content.length,tn=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==t.bytes[o])return!1;return!0};var on=/^[A-Za-z0-9_-]{1,80}$/;var nn=["left","right","top","bottom"];var rn=(e,t=0,o={remaining:16e3})=>{if(--o.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of r)if(!rn(s,t+1,o))return!1;return!0},Dt=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Dt);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Dt)}return String(e)===e||Number.isFinite(e)},Ht=e=>{try{return String(e.id)!==e.id||!on.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!nn.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!rn(e.data)||!Dt(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var an=["file","directory","other","missing"],Xt=e=>!!(e&&"sessionId"in e),Bt=e=>!!(e&&"sent"in e&&!("sessionId"in e));var cn=/^[0-9a-f]{7,64}$/i,zt=e=>cn.test(e),ut=500,ft=32e3,ln=16e3,dn=128,pn=200,un=2e3,fn=16e3,mn=80,gn=200,kn=16e3;var hn=2e3;var Vt=2e4,mt=1024,gt=2e6;var kt=64e3,ht=8e3,jt=4e3;var Kt=96e4,br=60*6e4;var En=999,xn=1e4,qe=500,bn=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Sn=["stopped","starting","ready","failed"],Sr=new Set(bn),_n=e=>Sr.has(e),Tn=e=>e&&_n(e)?e:"HOST_REJECTED",De=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(De):Object(e)===e?Object.values(e).every(De):!1,yn=e=>De(e)&&JSON.stringify(e).length<=kn,sn=e=>e?.trim().slice(0,gn)??"",He=e=>{let t=e.id.trim().slice(0,dn),o=e.title.trim().slice(0,pn),r=e.url.trim().slice(0,un),s=e.text?.trim().slice(0,fn),c=e.author?.trim().slice(0,mn),l=e.kind==="pull"?"pull":"issue",d={providerId:e.providerId.trim(),id:t,title:o||t,url:r,kind:l};if(s&&(d.text=s),c&&(d.author=c),l==="pull"){let p=sn(e.branches?.head),T=sn(e.branches?.base);p&&T&&(d.branches={head:p,base:T})}return yn(e.data)&&(d.data=e.data),d},Jt=e=>{let t=He(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},Wt=e=>{let t={text:e.text.trim().slice(0,ln)};return e.send&&(t.send=!0),t},Yt=e=>e===null||!Number.isFinite(e)?null:Math.min(En,Math.max(0,Math.round(e))),Zt=e=>Number.isFinite(e)?Math.min(xn,Math.max(0,Math.ceil(e))):0;var Fe=e=>e.length>0&&e.length<=mt&&!e.includes("\0")&&!e.includes("\\");var Et=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>hn?!1:!e.split("/").some(o=>o==="."||o===".."),_r=new Set(Sn),qt=e=>!!(e&&"status"in e&&_r.has(String(e.status))&&!("body"in e)),xt=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Qt=e=>!!(e&&"content"in e&&String(e.content)===e.content),eo=e=>!!(e&&"written"in e&&e.written===!0),to=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),Tr=new Set(an),oo=e=>!!(e&&"kind"in e&&"size"in e&&Tr.has(String(e.kind))&&Number.isFinite(e.size)),no=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),yr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),vr=e=>Object(e)===e?e:null,Ft=e=>String(e)===e&&e.length>0,Ar=e=>{if(!Ft(e.id))return null;if(e.ok===!0){let t={channel:v,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&Ft(e.error)?{channel:v,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:Tn(Ft(e.code)?e.code:void 0)}:null},ro=e=>{let t=vr(e);return!t||t.channel!==v||t.v!==1?null:t.type==="result"?Ar(t):!yr.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var vn=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,wr=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",h=class extends Error{code;constructor(t,o){super(o),this.name="HostRequestError",this.code=t}},An=()=>Promise.reject(new h("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),bt=()=>Promise.reject(new h("BAD_PATH",`File path must be 1 to ${mt} characters without NUL or backslash.`)),St=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new h("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},_=e=>(e.value+=1,`oc-${e.value}`),lo=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new h("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??(n=>n===t.parent),r=e.requestTimeoutMs??Vt,s=new Set,c=new Set,l=new Set,d=new Set,p=new Set,T=new Set,U=new Set,y=new Set,L=new Set,N=new Set,Y=[],S=null,I=null,R=new Set,se=new Set,te=null,we=null,$e=!1,Ee=new Map,xe=new Map,be=new Map,ie=!1,x={value:0},E=null,b=null,B=!1,Ze=!1,$o=null,Do=n=>n?{sessionId:n.id,phase:n.busy?"started":"completed"}:null,ae=n=>{t.parent.postMessage(n,"*")},Ho=()=>{ie||t.parent===t||N.size===0||E?.features?.lateGenerateResults!==!0||ae({channel:v,v:1,type:"generate-late-listen"})},H=(n,i)=>{for(let m of n)try{m(i)}catch(k){console.error(k)}},Fo=n=>{if(!(n instanceof MessageEvent)||!o(n.source))return;let i=ro(n.data);if(!i)return;if(i.type==="workspace"){let k=xe.get(i.payload.subscriptionId);k&&H([k],i.payload.snapshot);return}if(i.type==="shells"){let k=be.get(i.payload.subscriptionId);k&&H([k],i.payload.snapshot);return}if(i.type==="ready"){E=i.payload,b=Do(i.payload.session),H(s,i.payload),H(c,i.payload.directory),H(l,i.payload.session),b&&H(d,b),H(p,i.payload.connection),H(T,i.payload.settings),H(U,i.payload.item),Ho();return}if(i.type==="generate-late"){N.size===0?Y.push(i.payload):H(N,i.payload);return}if(i.type==="directory"){E&&(E={...E,directory:i.payload.directory}),H(c,i.payload.directory);return}if(i.type==="session"){E&&(E={...E,session:i.payload.session}),i.payload.session?b?.sessionId!==i.payload.session.id&&(b=Do(i.payload.session)):b=null,H(l,i.payload.session);return}if(i.type==="session-lifecycle"){b=i.payload,H(d,i.payload);return}if(i.type==="connection"){E&&(E={...E,connection:i.payload.connection}),H(p,i.payload.connection);return}if(i.type==="settings"){E&&(E={...E,settings:i.payload.settings}),H(T,i.payload.settings);return}if(i.type==="item"){E&&(E={...E,item:i.payload.item}),H(U,i.payload.item);return}if(i.type==="status-control-event"){H(y,i.payload);return}if(i.type==="popover-closed"){H(L,i.payload);return}if(i.type==="action"){let k=M=>{ie||ae({channel:v,v:1,type:"action-result",id:i.id,payload:M})},G=I;if(!G){k({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>G(i.payload)).then(()=>k({ok:!0}),M=>{let j=(M instanceof Error?M.message:String(M)).trim();k({ok:!1,error:(j||"Action failed.").slice(0,qe)})});return}if(i.type==="file-open"){let k=i.payload;if(we&&tn(we,k))return;we=k,H(R,i.payload);return}if(i.type==="file-saved"){H(se,i.payload.version);return}if(i.type==="file-snapshot"){let k=j=>{ie||ae({channel:v,v:1,type:"file-snapshot-result",id:i.id,payload:j})},G=j=>k({error:(j.trim()||"Could not read the edited file.").slice(0,qe)}),M=te;if(!M){G("This extension does not edit files.");return}Promise.resolve().then(()=>M(i.payload.purpose)).then(j=>{if($t(j)>2e7){G(`The file is over ${2e7} ${"bytes"in j?"bytes":"characters"}.`);return}if(j.version.length>256){G(`The snapshot version is over ${256} characters.`);return}k({snapshot:"bytes"in j?{bytes:j.bytes,version:j.version}:{content:j.content,version:j.version}})},j=>G(j instanceof Error?j.message:String(j)));return}if(i.type==="resolve"){let k=M=>{ae({channel:v,v:1,type:"resolve-result",id:i.id,payload:M})},G=S;if(!G){k({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>G(i.payload)).then(M=>k({item:M?He(M):null}),M=>{let j=(M instanceof Error?M.message:String(M)).trim();k({error:(j||"Command failed.").slice(0,qe)})});return}let m=Ee.get(i.id);if(m){if(clearTimeout(m.timer),Ee.delete(i.id),i.ok){m.resolve(i.payload);return}m.reject(new h(i.code,i.error))}};t.addEventListener("message",Fo),ae({channel:v,v:1,type:"hello"});let Q=(n,i=r)=>ie||t.parent===t?Promise.reject(new h("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((m,k)=>{let G=setTimeout(()=>{Ee.delete(n.id),k(new h("HOST_TIMEOUT","Host did not answer in time."))},i);Ee.set(n.id,{resolve:m,reject:k,timer:G}),ae(n)}),z=n=>Q(n).then(()=>{}),V={channel:v,v:1},Ut=n=>{!ie&&t.parent!==t&&ae(n)},Xo=()=>Ut({...V,type:"file-save"}),Bo=n=>{!vn(n)||!wr(n)||(n.preventDefault(),Xo())},zo=n=>{!vn(n)||n.key!=="Escape"||E?.surface!=="popover"||!E.popover||(n.preventDefault(),Jo(E.popover.id,"escape").catch(()=>{}))},ct=()=>{let n=E?.surface==="popover"?E.popover:void 0;if(!n)return;let i=B||Ze;$o!==i&&($o=i,Wo(n.id,i).catch(()=>{}))},lt=()=>{E?.surface!=="popover"||B||(B=!0,ct())},Vo=n=>{E?.surface!=="popover"||n.relatedTarget!==null||!B||(B=!1,ct())},jo=()=>{E?.surface!=="popover"||Ze||(Ze=!0,ct())},Ko=()=>{E?.surface!=="popover"||!Ze||(Ze=!1,ct())},ke=(n,i=1024)=>{if(!n.trim()||n.length>i)throw new h("HOST_REJECTED",`Identity must contain 1 to ${i} characters.`)},Mt=async n=>{n.kind!=="projects"&&ke(n.projectId);let i=await Q({...V,type:"workspace-read",id:_(x),payload:n});if(!i||!("kind"in i)||!("state"in i)||i.kind!==n.kind)throw new h("HOST_REJECTED","Host did not return workspace data.");return i},Lt=async(n,i)=>{n.kind!=="projects"&&ke(n.projectId);let m=_(x);xe.set(m,i);try{await z({...V,type:"workspace-subscribe",id:_(x),payload:{subscriptionId:m,query:n}})}catch(k){throw xe.delete(m),ie||ae({...V,type:"workspace-unsubscribe",id:_(x),payload:{subscriptionId:m}}),k}return()=>{!xe.delete(m)||ie||ae({...V,type:"workspace-unsubscribe",id:_(x),payload:{subscriptionId:m}})}},Er=async(n,i)=>{n.kind==="session"&&ke(n.sessionId),n.kind==="project"&&ke(n.projectId);let m=_(x);be.set(m,i);try{await z({...V,type:"shells-subscribe",id:_(x),payload:{subscriptionId:m,scope:n}})}catch(k){throw be.delete(m),ie||ae({...V,type:"shells-unsubscribe",id:_(x),payload:{subscriptionId:m}}),k}return()=>{!be.delete(m)||ie||ae({...V,type:"shells-unsubscribe",id:_(x),payload:{subscriptionId:m}})}},dt=async n=>{if("key"in n&&(n.key.length===0||n.key.length>128))throw new h("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(n.op==="set"&&!De(n.value))throw new h("HOST_REJECTED","Storage values must be JSON.");if(n.op==="set"&&new TextEncoder().encode(JSON.stringify(n.value)).length>65536)throw new h("HOST_REJECTED","Storage value exceeds 64 KiB.");if(n.scope==="device"&&E?.features?.deviceStorage!==!0)throw new h("UNSUPPORTED","This host does not support device storage.");let i=await Q({...V,type:"storage",id:_(x),payload:n});if(!i||!("storage"in i)||i.op!==n.op)throw new h("HOST_REJECTED","Host did not return storage data.");return i},Jo=(n,i)=>E?.features?.popovers!==!0&&!(E?.surface==="popover"&&E.popover?.id===n)?Promise.reject(new h("UNSUPPORTED","This host does not support popovers.")):z({...V,type:"popover-close",id:_(x),payload:i?{id:n,reason:i}:{id:n}}),Wo=(n,i)=>E?.features?.popovers!==!0&&!(E?.surface==="popover"&&E.popover?.id===n)?Promise.reject(new h("UNSUPPORTED","This host does not support popovers.")):z({...V,type:"popover-anchor",id:_(x),payload:{id:n,active:i}});return t.addEventListener("keydown",zo,!0),t.addEventListener("pointerover",lt),t.addEventListener("pointermove",lt),t.addEventListener("pointerout",Vo),t.addEventListener("focus",jo),t.addEventListener("blur",Ko),{onAction:n=>(I=n,()=>{I===n&&(I=null)}),listProjects:async()=>{let n=await Mt({kind:"projects"});if(n.kind!=="projects")throw new h("HOST_REJECTED","Expected projects.");return n},listWorktrees:async n=>{let i=await Mt({kind:"worktrees",projectId:n});if(i.kind!=="worktrees")throw new h("HOST_REJECTED","Expected worktrees.");return i},listSessions:async n=>{let i=await Mt({kind:"sessions",projectId:n});if(i.kind!=="sessions")throw new h("HOST_REJECTED","Expected sessions.");return i},onProjects:n=>Lt({kind:"projects"},i=>{i.kind==="projects"&&n(i)}),onWorktrees:(n,i)=>Lt({kind:"worktrees",projectId:n},m=>{m.kind==="worktrees"&&i(m)}),onSessions:(n,i)=>Lt({kind:"sessions",projectId:n},m=>{m.kind==="sessions"&&i(m)}),onRunningShells:(n,i)=>Er(n,i),readShellOutput:async(n,i)=>{ke(n,128);let m=i?.cursor;if(m!==void 0&&(!Number.isInteger(m)||m<0))throw new h("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let k=i?.tailBytes;if(k!==void 0&&(!Number.isInteger(k)||k<1||k>65536))throw new h("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let M=await Q({...V,type:"shell-output",id:_(x),payload:{shellId:n,cursor:m,tailBytes:k}});if(!M||typeof M.output!="string"||!Number.isFinite(M.cursor))throw new h("HOST_REJECTED","Host did not return shell output.");return M},stopShell:async n=>{if(ke(n,128),(await Q({...V,type:"shell-stop",id:_(x),payload:{shellId:n}}))?.stopped!==!0)throw new h("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async n=>{ke(n),await z({...V,type:"open-session",id:_(x),payload:{sessionId:n}})},storage:{get:async(n,i)=>{let m=St(i),k={op:"get",key:n};m&&(k.scope=m);let G=await dt(k);return G.op==="get"&&G.found?G.value:void 0},set:async(n,i,m)=>{let k=St(m),G={op:"set",key:n,value:i};k&&(G.scope=k),await dt(G)},delete:async(n,i)=>{let m=St(i),k={op:"delete",key:n};m&&(k.scope=m),await dt(k)},keys:async n=>{let i=St(n),m={op:"keys"};i&&(m.scope=i);let k=await dt(m);if(k.op!=="keys")throw new h("HOST_REJECTED","Expected storage keys.");return k.keys}},onReady:n=>(s.add(n),E&&n(E),()=>{s.delete(n)}),onDirectory:n=>(c.add(n),E&&n(E.directory),()=>{c.delete(n)}),onSession:n=>(l.add(n),E&&n(E.session),()=>{l.delete(n)}),onSessionLifecycle:n=>(d.add(n),b&&n(b),()=>{d.delete(n)}),onConnection:n=>(p.add(n),E&&n(E.connection),()=>{p.delete(n)}),onSettings:n=>(T.add(n),E&&n(E.settings),()=>{T.delete(n)}),onItem:n=>(U.add(n),E&&n(E.item),()=>{U.delete(n)}),onStatusControl:n=>(y.add(n),()=>{y.delete(n)}),onPopoverClosed:n=>(L.add(n),()=>{L.delete(n)}),setStatusControls:n=>E?.features?.statusControls!==!0?Promise.reject(new h("UNSUPPORTED","This host does not support status controls.")):en(n)?z({...V,type:"status-controls",id:_(x),payload:{controls:n}}):Promise.reject(new h("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:n=>E?.features?.popovers!==!0?Promise.reject(new h("UNSUPPORTED","This host does not support popovers.")):Ht(n)?z({...V,type:"popover-open",id:_(x),payload:n}):Promise.reject(new h("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:Jo,setPopoverAnchorActive:Wo,onResolve:n=>(S=n,()=>{S===n&&(S=null)}),toast:n=>{let i=n.message.trim();return!i||i.length>ut?Promise.reject(new h("HOST_REJECTED",`Toast message must contain 1 to ${ut} characters.`)):n.copy&&n.copy!==!0&&(!n.copy.text.length||n.copy.text.length>ft)?Promise.reject(new h("HOST_REJECTED",`Toast copy text must contain 1 to ${ft} characters.`)):z({channel:v,v:1,type:"toast",id:_(x),payload:{...n,message:i}})},openUrl:n=>z({channel:v,v:1,type:"open-url",id:_(x),payload:{url:n}}),openCommit:n=>zt(n)?z({channel:v,v:1,type:"open-commit",id:_(x),payload:{sha:n}}):Promise.reject(new h("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:n=>z({channel:v,v:1,type:"open-surface",id:_(x),payload:{surfaceId:n}}),writeClipboard:n=>z({channel:v,v:1,type:"clipboard-write",id:_(x),payload:{text:n}}),compose:n=>z({channel:v,v:1,type:"compose",id:_(x),payload:n}),attach:n=>z({channel:v,v:1,type:"attach",id:_(x),payload:He(n)}),startSession:async n=>{n.projectId!==void 0&&ke(n.projectId);let i=n.worktree;i&&i!==!0&&(i.kind==="existing"?ke(i.directory):(i.name!==void 0&&ke(i.name,200),i.baseBranch!==void 0&&ke(i.baseBranch,200)));let m=await Q({channel:v,v:1,type:"start-session",id:_(x),payload:Jt(n)},e.requestTimeoutMs??18e4);if(!Xt(m))throw new h("HOST_REJECTED","Host did not return a session.");return m},prompt:n=>Q({channel:v,v:1,type:"prompt",id:_(x),payload:Wt(n)}).then(i=>{if(!Bt(i))throw new h("HOST_REJECTED","Host did not return a prompt result.");return i}),sessionLink:n=>z({channel:v,v:1,type:"session-link",id:_(x),payload:He(n)}),close:()=>z({channel:v,v:1,type:"close",id:_(x)}),oauthStart:()=>z({channel:v,v:1,type:"oauth-start",id:_(x)}),oauthDisconnect:()=>z({channel:v,v:1,type:"oauth-disconnect",id:_(x)}),request:n=>(Et(n.path)?Q({channel:v,v:1,type:"request",id:_(x),payload:n}):An()).then(i=>{if(!xt(i))throw new h("HOST_REJECTED","Host request result was empty.");return i}),serviceRequest:n=>(Et(n.path)?Q({channel:v,v:1,type:"service-request",id:_(x),payload:n}):An()).then(i=>{if(!xt(i))throw new h("HOST_REJECTED","Host service request result was empty.");return i}),serviceStatus:()=>Q({channel:v,v:1,type:"service-status",id:_(x)}).then(n=>{if(!qt(n))throw new h("HOST_REJECTED","Host did not return service status.");return n}),readFile:n=>(Fe(n)?Q({channel:v,v:1,type:"file-read",id:_(x),payload:{path:n}}):bt()).then(i=>{if(!Qt(i))throw new h("HOST_REJECTED","Host did not return file content.");return i}),writeFile:(n,i)=>Fe(n)?i.length>gt?Promise.reject(new h("FILE_TOO_LARGE",`Content is over ${gt} characters.`)):Q({channel:v,v:1,type:"file-write",id:_(x),payload:{path:n,content:i}}).then(m=>{if(!eo(m))throw new h("HOST_REJECTED","Host did not confirm the write.");return m}):bt(),listDir:n=>(Fe(n)?Q({channel:v,v:1,type:"file-list",id:_(x),payload:{path:n}}):bt()).then(i=>{if(!to(i))throw new h("HOST_REJECTED","Host did not return directory entries.");return i}),stat:n=>(Fe(n)?Q({channel:v,v:1,type:"file-stat",id:_(x),payload:{path:n}}):bt()).then(i=>{if(!oo(i))throw new h("HOST_REJECTED","Host did not return file status.");return i}),generate:n=>{let i=n.prompt.trim(),m=n.system?.trim();if(i.length===0||i.length>kt)return Promise.reject(new h("HOST_REJECTED",`Prompt must be 1 to ${kt} characters.`));if(m!==void 0&&(m.length===0||m.length>ht))return Promise.reject(new h("HOST_REJECTED",`System prompt must be 1 to ${ht} characters.`));let k=n.maxOutputTokens===void 0?void 0:Math.min(jt,Math.max(1,Math.floor(n.maxOutputTokens)));if(k!==void 0&&!Number.isFinite(k))return Promise.reject(new h("HOST_REJECTED","maxOutputTokens must be a number."));let G={prompt:i};return m!==void 0&&(G.system=m),k!==void 0&&(G.maxOutputTokens=k),Q({channel:v,v:1,type:"generate",id:_(x),payload:G},e.requestTimeoutMs??Kt).then(M=>{if(!no(M))throw new h("HOST_REJECTED","Host did not return generated text.");return M})},onLateGenerateResult:n=>{N.add(n);for(let i of Y.splice(0))H([n],i);return Ho(),()=>{N.delete(n)}},setBadge:n=>z({channel:v,v:1,type:"badge",id:_(x),payload:{count:Yt(n)}}),setHeight:n=>z({channel:v,v:1,type:"resize",id:_(x),payload:{height:Zt(n)}}),onFileOpen:n=>(R.add(n),$e||($e=!0,t.addEventListener("keydown",Bo,!0)),we&&n(we),()=>{R.delete(n)}),onFileSnapshot:n=>(te=n,()=>{te===n&&(te=null)}),onFileSaved:n=>(se.add(n),()=>{se.delete(n)}),reportFileChange:n=>Ut({...V,type:"file-change",payload:{dirty:n.dirty,edited:n.edited}}),requestFileSave:Xo,reportFileUnsupported:()=>Ut({...V,type:"file-unsupported"}),dispose:()=>{for(let n of xe.keys())ae({...V,type:"workspace-unsubscribe",id:_(x),payload:{subscriptionId:n}});xe.clear();for(let n of be.keys())ae({...V,type:"shells-unsubscribe",id:_(x),payload:{subscriptionId:n}});be.clear(),ie=!0,S=null,I=null,te=null,R.clear(),se.clear(),$e&&t.removeEventListener("keydown",Bo,!0),t.removeEventListener("message",Fo),t.removeEventListener("keydown",zo,!0),t.removeEventListener("pointerover",lt),t.removeEventListener("pointermove",lt),t.removeEventListener("pointerout",Vo),t.removeEventListener("focus",jo),t.removeEventListener("blur",Ko);for(let n of Ee.values())clearTimeout(n.timer),n.reject(new h("HOST_UNAVAILABLE","Host client was disposed."));Ee.clear(),s.clear(),c.clear(),l.clear(),d.clear(),p.clear(),T.clear(),U.clear(),y.clear(),L.clear(),N.clear(),Y.length=0}}};var Rn=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var qs=new Set(Rn);var In=["none","agent","user"];var ei=new Set(In);var Or=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Rr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Cn=(e,t)=>{t.style.colorScheme=e.mode;for(let[o,r]of Or)t.style.setProperty(o,e.tokens[r]);for(let[o,r,s]of Rr){let c=e.tokens[s]??"";t.style.setProperty(o,c),t.style.setProperty(r,c)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},po=(e,t)=>{Cn(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var Ir={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},D=(e,t)=>`var(--${e}, var(--oc-${Ir[e]}, ${t}))`,_e=D("surface-background","transparent"),Tt=D("surface-elevated","transparent"),Xe=D("surface-elevated-foreground","inherit"),pe=D("surface-foreground","inherit"),$=D("surface-muted-foreground","gray"),Cr=D("surface-muted","transparent"),Oe=D("interactive-border","currentColor"),ee=D("interactive-hover","transparent"),Ue=D("interactive-active","transparent"),uo=D("interactive-selection","transparent"),fo=D("interactive-selection-foreground","inherit"),Se=D("primary","currentColor"),mo=D("primary-text","inherit"),go=D("error-text","inherit"),Ur=D("font-sans","inherit"),ko=D("font-mono","monospace"),Pn=D("radius","9px"),ho=`calc(${Pn} - 2px)`,Un=`calc(${Pn} - 4px)`,F=(e,t,o="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${o})`,Mn=`background-image: linear-gradient(${ee}, ${ee});`,Eo=e=>`box-shadow: inset 0 0 0 1px ${e}, var(--oc-sdk-field-lift);`,xo="box-shadow: inset 0 0 0 1px var(--oc-sdk-edge), var(--oc-sdk-raised-lift);",Ln="box-shadow: var(--oc-sdk-lit);",Gn=`inset 0 1px 0 0 ${F(pe,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,Mr=`
:root {
  --oc-sdk-edge: ${F(pe,10)};
  --oc-sdk-field-bg: ${Tt};
  --oc-sdk-raised-bg: ${_e};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 0 0 1px rgb(0 0 0 / 0.1), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${F(pe,6)};
  --oc-sdk-field-bg: ${F(_e,50,Tt)};
  --oc-sdk-raised-bg: ${Tt};
  --oc-sdk-field-lift: ${Gn};
  --oc-sdk-raised-lift: ${Gn};
  --oc-sdk-lit: inset 0 1px 0 0 ${F(pe,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 0 0 1px rgb(0 0 0 / 0.36), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,_t=e=>{let t=D(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${D(`${e}-text`,"inherit")}; }`},Lr=`
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
`,Nn=`${Mr}
.oc-sdk { color: ${pe}; font-family: ${Ur}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Mn} }
.oc-sdk-mono { font-family: ${ko}; }
.oc-sdk-muted { color: ${$}; }
${_t("success")}${_t("warning")}${_t("error")}${_t("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Se}; --oc-sdk-tone-text: ${mo}; }

.oc-sdk-btn { border-radius: ${ho}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Un}; }
.oc-sdk-btn[data-variant="default"] { color: ${mo}; background: ${F(Se,10,_e)}; border-color: ${F(Se,12)}; ${Ln} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${F(Se,16,_e)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${F(Se,22,_e)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Cr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${ee}, ${ee}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Ue}, ${Ue}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Xe}; border-color: transparent; ${xo} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${ee}, ${ee}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Ue}, ${Ue}); box-shadow: inset 0 0 0 1px var(--oc-sdk-edge); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${ee}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Ue}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${D("status-error","red")}; color: ${go}; background: ${F("var(--oc-sdk-tone)",7,_e)}; border-color: ${F("var(--oc-sdk-tone)",12)}; ${Ln} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${F("var(--oc-sdk-tone)",9,_e)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${F("var(--oc-sdk-tone)",11,_e)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${go}; }
.oc-sdk-input { border-radius: ${ho}; background: var(--oc-sdk-field-bg); color: ${Xe}; ${Eo("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${ee}, ${ee}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Eo(F(pe,26))} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Eo(D("status-error","red"))} }
.oc-sdk-input[data-mono="true"] { font-family: ${ko}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Se}; }
.oc-sdk-search-clear { border-radius: ${Un}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${ee}; color: ${pe}; }

.oc-sdk-trigger { border-color: transparent; border-radius: ${ho}; background: var(--oc-sdk-raised-bg); color: ${Xe}; ${xo} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${ee}, ${ee}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Ue}, ${Ue}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow, no border. */
.oc-sdk-popup { --surface-foreground: ${Xe}; border-color: transparent; border-radius: 12px; background: ${Tt}; color: ${Xe}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${ee}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${uo}; color: ${fo}; }
.oc-sdk-option-check { color: ${pe}; }
.oc-sdk-option[data-destructive="true"] { color: ${go}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${F(D("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Oe}; border-radius: 4px; color: ${pe}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${F(pe,60,Oe)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Oe}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${_e}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Se}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Mn} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${F(pe,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${pe}; }
.oc-sdk-tab[aria-selected="true"] { color: ${fo}; background: ${uo}; border-color: ${Oe}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Xe}; background: var(--oc-sdk-raised-bg); border-color: transparent; ${xo} }
.oc-sdk-tab-count { color: ${$}; }

.oc-sdk-badge { border-radius: 9999px; background: ${ee}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${F("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${ee}; }
.oc-sdk-row[aria-selected="true"] { background: ${uo}; color: ${fo}; }
.oc-sdk-row-lead { font-family: ${ko}; color: ${$}; }
.oc-sdk-row-sub { color: ${$}; }
.oc-sdk-row-meta { color: ${$}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${$}; }

.oc-sdk-empty-body { color: ${$}; }

.oc-sdk-spinner { color: ${$}; }
.oc-sdk-spinner-ring { border-color: ${Oe}; border-top-color: ${Se}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${F("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${$}; }

.oc-sdk-separator { color: ${$}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${F(Oe,40)}; }

.oc-sdk-progress-label { color: ${$}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${Oe}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Se}); }

.oc-sdk-text a { color: ${mo}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${F(Oe,60)}; }
`,J=`
${Gt}
${Lr}
${Nn}`;var $n="oc-sdk-ui-style",Be=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},W=e=>{let t=document.getElementById($n);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}Pt(document);let o=document.createElement("style");o.id=$n,o.textContent=e,document.head.appendChild(o)},C=(e,t)=>{let o=document.createElement(e);return t&&(o.className=t),o},he=e=>{let t=C("button",e);return t.type="button",t},ce=(e,t)=>{let o=t??"";e.textContent!==o&&(e.textContent=o)},ze=(e,t,o)=>{o==null||o===""?e.removeAttribute(t):e.getAttribute(t)!==o&&e.setAttribute(t,o)},Dn=(e,t)=>{let o=r=>{r.target instanceof Node&&e.contains(r.target)||t()};return document.addEventListener("pointerdown",o,!0),()=>{document.removeEventListener("pointerdown",o,!0)}};var Gr=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Re=(e,t)=>{W(J);let o=t,r=he("oc-sdk oc-sdk-btn"),s=Gr(),c=document.createElement("span");r.append(c),e.append(r);let l=()=>{r.dataset.variant=o.variant??"default",r.dataset.size=o.size??"default",r.disabled=!!o.disabled||!!o.loading,r.dataset.loading=o.loading?"true":"false",r.setAttribute("aria-busy",o.loading?"true":"false"),o.loading&&s.parentNode!==r?r.prepend(s):!o.loading&&s.parentNode===r&&s.remove(),ce(c,o.label)},d=()=>{o.disabled||o.loading||o.onClick()};return r.addEventListener("click",d),l(),{update:p=>{o={...o,...p},l()},dispose:()=>{r.removeEventListener("click",d),r.remove()}}};var Hn="http://www.w3.org/2000/svg",Pr={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ve=(e,t,o)=>{let r=document.createElementNS(Hn,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),o&&r.setAttribute("class",o);let s=document.createElementNS(Hn,"path");return s.setAttribute("d",Pr[e]),r.append(s),r};var Me=(e,t="vertical")=>{let[o,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===o||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},je=(e,t,o)=>{let r=e.filter(p=>!p.disabled);if(r.length===0)return null;let s=r[0],c=r[r.length-1];if(o==="first"||!s||!c)return s?.id??null;if(o==="last")return c.id;let l=r.findIndex(p=>p.id===t);return l===-1?o==="next"?s.id:c.id:r[Math.min(r.length-1,Math.max(0,l+(o==="next"?1:-1)))]?.id??null};var Fn=(e,t)=>`${e}-${t??""}`,bo=(e,t,o,r)=>{let s=he("oc-sdk-option");s.id=Fn(e,o.id),s.setAttribute("role",t),s.tabIndex=-1,s.disabled=!!o.disabled,t==="option"&&s.setAttribute("aria-selected",o.selected?"true":"false"),s.dataset.destructive=o.destructive?"true":"false";let c=C("span","oc-sdk-option-label");if(c.textContent=o.label,s.append(c),o.hint){let l=C("span","oc-sdk-option-hint");l.textContent=o.hint,s.append(l)}if(t==="option"){s.dataset.mark="check";let l=C("span","oc-sdk-option-check");l.append(Ve("check",14)),s.append(l)}return s.addEventListener("pointerenter",r.hover),s.addEventListener("click",r.pick),s},So=(e,t,o,r)=>{let s=Fn(o,r);for(let c of Array.from(e.children))c instanceof HTMLElement&&c.classList.contains("oc-sdk-option")&&(c.dataset.active=c.id===s?"true":"false");ze(t,"aria-activedescendant",r?s:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Nr=(e,t)=>{let o=t.getBoundingClientRect();e.style.minWidth=`${Math.round(o.width)}px`,e.style.left=`${Math.round(o.left)}px`,e.style.top=`${Math.round(o.bottom+4)}px`;let r=e.offsetHeight,s=window.innerHeight-o.bottom-8;r>s&&o.top-8>s&&(e.style.top=`${Math.max(8,Math.round(o.top-4-r))}px`);let c=o.left+e.offsetWidth-window.innerWidth+8;c>0&&(e.style.left=`${Math.max(8,Math.round(o.left-c))}px`)},_o=(e,t,o,r)=>{e.append(o),Nr(o,t);let s=Dn(e,r),c=()=>{r()},l=d=>{d.target instanceof Node&&o.contains(d.target)||r()};return window.addEventListener("resize",c),window.addEventListener("scroll",l,!0),()=>{s(),window.removeEventListener("resize",c),window.removeEventListener("scroll",l,!0),o.remove()}};var Xn=(e,t)=>{let o=t.trim().toLowerCase();return o?e.filter(r=>r.label.toLowerCase().includes(o)||r.id.toLowerCase().includes(o)):[...e]},$r=0,To=(e,t)=>{W(J);let o=t,r=`oc-sdk-select-${$r+=1}`,s=C("div","oc-sdk oc-sdk-select"),c=C("span","oc-sdk-field-label");c.id=`${r}-label`;let l=he("oc-sdk-trigger");l.setAttribute("aria-haspopup","listbox"),l.setAttribute("aria-labelledby",c.id);let d=C("span","oc-sdk-trigger-value");l.append(d,Ve("chevron",14,"oc-sdk-trigger-chevron")),s.append(c,l),e.append(s);let p="",T=null,U=null,y=C("div","oc-sdk oc-sdk-popup"),L=C("div","oc-sdk-popup-search"),N=C("input","oc-sdk-input");N.type="text",N.autocomplete="off",L.append(N);let Y=C("div");Y.setAttribute("role","listbox"),Y.tabIndex=-1,y.append(Y);let S=()=>Xn(o.options,o.searchable?p:""),I=()=>o.searchable?N:Y,R=b=>{T=b,So(Y,I(),r,b)},se=()=>{Be(Y);let b=S();if(b.length===0){let B=C("div","oc-sdk-popup-empty");B.textContent="No matches",Y.append(B)}for(let B of b)Y.append(bo(r,"option",{...B,selected:B.id===o.value},{hover:()=>R(B.id),pick:()=>$e(B.id)}));R(b.some(B=>B.id===T)?T:b[0]?.id??null)},te=()=>{let b=U;U=null,b?.(),p="",N.value="",l.setAttribute("aria-expanded","false")},we=()=>{U||o.disabled||(T=o.value,N.placeholder=o.searchPlaceholder??"Search",o.searchable?y.prepend(L):L.remove(),se(),U=_o(s,l,y,te),l.setAttribute("aria-expanded","true"),I().focus())},$e=b=>{te(),l.focus(),b!==o.value&&o.onChange(b)},Ee=()=>{U?te():we()},xe=b=>{!U&&Me(b)&&(b.preventDefault(),we())},be=b=>{let B=Me(b);B?(b.preventDefault(),R(je(S(),T,B))):b.key==="Enter"?(b.preventDefault(),T&&$e(T)):b.key==="Escape"?(b.preventDefault(),te(),l.focus()):o.searchable&&b.target!==N&&b.key.length===1&&!b.ctrlKey&&!b.metaKey&&N.focus()},ie=()=>{p=N.value,se()},x=b=>{U&&!(b.relatedTarget instanceof Node&&s.contains(b.relatedTarget))&&te()},E=()=>{ce(c,o.label),c.hidden=!o.label;let b=o.options.find(B=>B.id===o.value);ce(d,b?.label??o.placeholder??"Select"),d.dataset.empty=b?"false":"true",l.disabled=!!o.disabled,U&&se()};return l.addEventListener("click",Ee),l.addEventListener("keydown",xe),y.addEventListener("keydown",be),N.addEventListener("input",ie),s.addEventListener("focusout",x),E(),{update:b=>{o={...o,...b},E()},dispose:()=>{te(),l.removeEventListener("click",Ee),l.removeEventListener("keydown",xe),y.removeEventListener("keydown",be),N.removeEventListener("input",ie),s.removeEventListener("focusout",x),s.remove()}}};var Hr=/^[a-z0-9][a-z0-9-]{0,63}$/,Fr=new Set(["all","new"]),oe=class extends Error{constructor(t){super(t),this.name="GroupFileError"}},Xr=[{id:"macos-ui",name:"macOS UI",skillIds:["appkit-interop","swiftui-patterns","window-management","liquid-glass","view-refactor"]},{id:"macos-build",name:"macOS \u6784\u5EFA",skillIds:["build-run-debug","test-triage","swiftpm-macos","signing-entitlements","packaging-notarization","telemetry"]},{id:"reverse",name:"\u9006\u5411\u5DE5\u7A0B",skillIds:["reverse-engineering-unpacking","kuna-decompiler","reverse-engineer-anything"]},{id:"cloudflare",name:"Cloudflare",skillIds:["cloudflare","workers-best-practices","wrangler"]},{id:"video",name:"\u89C6\u9891",skillIds:["yichen-jianying-edit"]},{id:"browser",name:"\u6D4F\u89C8\u5668",skillIds:["browser-skill"]}],Br=()=>Xr.map(e=>({...e,skillIds:[...e.skillIds]})),yt=e=>{let t=new Set(e.map(s=>s.id)),o=new Set(e.map(s=>s.name.trim().toLowerCase())),r=Br().filter(s=>{let c=s.name.toLowerCase();return t.has(s.id)||o.has(c)?!1:(t.add(s.id),o.add(c),!0)});return{groups:[...e,...r],added:r}},Bn=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new oe("\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E");let t=e;if(t.version!==1)throw new oe("\u5206\u7EC4\u914D\u7F6E\u7248\u672C\u4E0D\u53D7\u652F\u6301");if(!Array.isArray(t.groups))throw new oe("\u5206\u7EC4\u5217\u8868\u683C\u5F0F\u4E0D\u6B63\u786E");if(t.groups.length>50)throw new oe("\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 50 \u4E2A");let o=[],r=new Set,s=new Set;for(let[c,l]of t.groups.entries()){if(!l||typeof l!="object"||Array.isArray(l))throw new oe(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E`);let d=l;if(typeof d.id!="string"||!Hr.test(d.id)||Fr.has(d.id))throw new oe(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548`);if(r.has(d.id))throw new oe(`\u5206\u7EC4 ID \u91CD\u590D\uFF1A${d.id}`);let p=typeof d.name=="string"?d.name.trim():"";if(!p||p.length>40||/[\u0000-\u001f\u007f]/.test(p))throw new oe(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-40 \u4E2A\u5B57\u7B26`);let T=p.toLowerCase();if(s.has(T))throw new oe(`\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A${p}`);if(!Array.isArray(d.skillIds))throw new oe(`\u5206\u7EC4\u300C${p}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E`);if(d.skillIds.length>200)throw new oe(`\u5206\u7EC4\u300C${p}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 200 \u4E2A`);let U=[],y=new Set;for(let L of d.skillIds){if(typeof L!="string"||!L||L.length>128)throw new oe(`\u5206\u7EC4\u300C${p}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID`);y.has(L)||(y.add(L),U.push(L))}r.add(d.id),s.add(T),o.push({id:d.id,name:p,skillIds:U})}return{version:1,groups:o}};var zn=["\u4F60\u662F\u6280\u672F\u6587\u6863\u7FFB\u8BD1\u3002\u628A\u8F93\u5165\u7684\u6280\u80FD\u540D\u79F0\u548C\u63CF\u8FF0\u7FFB\u8BD1\u6210\u7B80\u4F53\u4E2D\u6587\u3002","\u4FDD\u7559\u6280\u80FD ID\u3001\u547D\u4EE4\u3001\u6587\u4EF6\u8DEF\u5F84\u3001\u4EE3\u7801\u3001\u4EA7\u54C1\u540D\u548C\u6280\u672F\u4E13\u6709\u540D\u8BCD\uFF0C\u4E0D\u8981\u7FFB\u8BD1\u4EE3\u7801\u5757\u3002","\u4E0D\u8981\u6DFB\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown\u3002",'\u53EA\u8F93\u51FA JSON\uFF1A{"items":[{"id":"\u539F\u6837 ID","nameZh":"\u4E2D\u6587\u540D\u79F0","descriptionZh":"\u4E2D\u6587\u63CF\u8FF0"}]}'].join(""),Vn=e=>JSON.stringify(e.map(t=>({id:t.id,name:t.name,description:t.description}))),jn=e=>{let t=e.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"").trim(),o=t.indexOf("{"),r=t.lastIndexOf("}");if(o<0||r<=o)return[];t=t.slice(o,r+1);let s;try{s=JSON.parse(t)}catch{return[]}let c=s&&typeof s=="object"?s:null,l=Array.isArray(s)?s:Array.isArray(c?.items)?c.items:[],d=[];for(let p of l){if(!p||typeof p!="object")continue;let T=p;typeof T.id!="string"||!T.id||typeof T.nameZh!="string"||!T.nameZh.trim()||typeof T.descriptionZh=="string"&&d.push({id:T.id.slice(0,128),nameZh:T.nameZh.trim().slice(0,300),descriptionZh:T.descriptionZh.trim().slice(0,8e3)})}return d};var Kn=`:root {
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
`;var Jn=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
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
`;var Ae=lo({requestTimeoutMs:3e4}),nr=document.querySelector("#root");if(!nr)throw new Error("Missing #root");var rr=document.createElement("style");rr.textContent=Jn+Kn;document.head.append(rr);var a=(e,t="",o)=>{let r=document.createElement(e);return r.className=t,o!==void 0&&(r.textContent=o),r},me=class extends Error{code;conflicts;constructor(t,o,r){super(t),this.name="ServiceError",this.code=o,this.conflicts=r}},jr=e=>e==="enabled"||e==="disabled"||e==="mixed"||e==="conflict",Kr=e=>e==="both"||e==="duplicate"||e==="invalid"||e==="empty"||e==="read-error"||e==="manual"||e==="no-description",Qe=(e,t="")=>typeof e=="string"?e:t,Wn=e=>typeof e=="string"&&e.length>0?e:null,At=e=>e===!0,sr=e=>typeof e=="number"&&Number.isFinite(e)?e:0,Yn=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],Lo=e=>{if(!e||typeof e!="object")return null;let t=e;return!Kr(t.kind)||typeof t.skillId!="string"?null:{kind:t.kind,skillId:t.skillId,message:Qe(t.message,"\u51B2\u7A81"),activePath:Wn(t.activePath),disabledPath:Wn(t.disabledPath),blocking:At(t.blocking)}},Jr=e=>{if(!e||typeof e!="object")return null;let t=e;return typeof t.id!="string"||!t.id||!jr(t.state)?null:{id:t.id,name:Qe(t.name,t.id),description:Qe(t.description),state:t.state,advertised:At(t.advertised),autoInvokeOff:At(t.autoInvokeOff),activePaths:Yn(t.activePaths),disabledPaths:Yn(t.disabledPaths),conflicts:Array.isArray(t.conflicts)?t.conflicts.map(Lo).filter(o=>o!==null):[],warnings:Array.isArray(t.warnings)?t.warnings.filter(o=>typeof o=="string"):[],estimatedTokens:sr(t.estimatedTokens),contentHash:Qe(t.contentHash)}},Wr=e=>{if(!e||typeof e!="object")throw new me("\u670D\u52A1\u8FD4\u56DE\u7684\u6280\u80FD\u76EE\u5F55\u4FE1\u606F\u4E0D\u6B63\u786E\u3002","parse",[]);let t=e;return{path:Qe(t.path),exists:At(t.exists),error:typeof t.error=="string"?t.error:null}},Ne=e=>{if(!e||typeof e!="object")throw new me("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[]);let t=e;if(!Array.isArray(t.skills))throw new me("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[]);let o=t.skills.map(Jr).filter(l=>l!==null),r=Array.isArray(t.conflicts)?t.conflicts.map(Lo).filter(l=>l!==null):o.flatMap(l=>l.conflicts),s=r.filter(l=>l.blocking).length,c={total:o.length,advertised:o.filter(l=>l.advertised).length,disabled:o.filter(l=>l.state==="disabled").length,blockingConflicts:s,warnings:r.length-s,estimatedTokens:o.reduce((l,d)=>l+d.estimatedTokens,0)};return{skills:o,conflicts:r,summary:c,root:Wr(t.root),scannedAt:sr(t.scannedAt)}},Yr=()=>({version:1,locale:"zh-CN",entries:{}}),ir=e=>{if(!e||typeof e!="object")throw new me("\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[]);let t=e;if(t.version!==1||t.locale!=="zh-CN"||!t.entries||typeof t.entries!="object"||Array.isArray(t.entries))throw new me("\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[]);let o={};for(let[r,s]of Object.entries(t.entries)){if(!s||typeof s!="object")continue;let c=s;typeof c.hash!="string"||typeof c.nameZh!="string"||typeof c.descriptionZh!="string"||typeof c.updatedAt!="number"||(o[r]={hash:c.hash,nameZh:c.nameZh.trim(),descriptionZh:c.descriptionZh.trim(),updatedAt:c.updatedAt})}return{version:1,locale:"zh-CN",entries:o}},Ot=e=>{try{return Bn(e).groups}catch(t){throw new me(t instanceof Error?t.message:"\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002","parse",[])}},de=async(e,t,o)=>{let r=await Ae.serviceRequest({method:e,path:t,...o===void 0?{}:{body:JSON.stringify(o)}}),s;try{s=JSON.parse(r.body)}catch{throw new me("\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u6570\u636E\uFF0C\u8BF7\u91CD\u8BD5\u3002","parse",[])}if(r.status>=400){let c=s&&typeof s=="object"?s:{},l=typeof c.error=="string"?c.error:`\u8BF7\u6C42\u5931\u8D25\uFF08${r.status}\uFF09`,d=typeof c.code=="string"?c.code:null,p=Array.isArray(c.conflicts)?c.conflicts.map(Lo).filter(T=>T!==null):[];throw new me(l,d,p)}return s},q=e=>e instanceof h?e.code==="NO_SERVICE"?"\u8BF7\u5728\u8BBE\u7F6E \u2192 \u6269\u5C55\u4E2D\u5141\u8BB8\u201C\u6280\u80FD\u5F00\u5173\u201D\u8FD0\u884C\u672C\u5730\u670D\u52A1\u3002":e.code==="SERVICE_FAILED"?"\u672C\u5730\u670D\u52A1\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6269\u5C55\u540E\u91CD\u8BD5\u3002":e.code==="DISABLED"?"\u6280\u80FD\u5F00\u5173\u6269\u5C55\u5DF2\u505C\u7528\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u542F\u7528\u3002":e.code==="HOST_TIMEOUT"?"\u672C\u5730\u670D\u52A1\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5\u3002":e.code==="NOT_GRANTED"?"\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u5141\u8BB8\u201C\u6A21\u578B\u8C03\u7528\u201D\u6743\u9650\uFF0C\u6216\u91CD\u65B0\u5B89\u88C5\u6269\u5C55\u3002":e.code==="UNSUPPORTED"?"\u5F53\u524D\u5BBF\u4E3B\u6216\u6A21\u578B\u4E0D\u652F\u6301\u7FFB\u8BD1\u8BF7\u6C42\u3002":"\u65E0\u6CD5\u8FDE\u63A5\u672C\u5730\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u6269\u5C55\u6388\u6743\u3002":e instanceof me||e instanceof Error?e.message:"\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002",Zr=e=>e instanceof me&&e.code==="not-found"?"\u672C\u5730\u670D\u52A1\u7248\u672C\u8FC7\u65E7\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u7981\u7528\u518D\u542F\u7528\u201C\u6280\u80FD\u5F00\u5173\u201D\u3002":q(e),Rt=a("main","ext sk");Rt.setAttribute("aria-label","\u6280\u80FD\u5F00\u5173");var ar=a("header","sk-header"),cr=a("div","sk-title-row"),qr=a("h1","sk-title","\u6280\u80FD\u5F00\u5173"),It=a("div","sk-actions"),Qr=Re(It,{label:"\u91CD\u65B0\u626B\u63CF",variant:"outline",size:"sm",onClick:()=>{kr(!0),No()}}),es=Re(It,{label:"\u5168\u90E8\u542F\u7528",variant:"outline",size:"sm",onClick:()=>hr(!0)}),ts=Re(It,{label:"\u5168\u90E8\u5173\u95ED",variant:"outline",size:"sm",onClick:()=>hr(!1)});cr.append(qr,It);var Ro=a("p","sk-summary"),Io=a("p","sk-summary sk-summary-secondary"),lr=a("div","sk-translation-row"),Ct=a("div","sk-segment");Ct.setAttribute("role","group");Ct.setAttribute("aria-label","\u6280\u80FD\u8BF4\u660E\u8BED\u8A00");var Ke=a("button","sk-segment-button","\u7FFB\u8BD1");Ke.type="button";Ke.setAttribute("aria-pressed","false");var st=a("button","sk-segment-button","\u539F\u6587");st.type="button";st.setAttribute("aria-pressed","true");Ct.append(Ke,st);var et=a("span","sk-translation-status");et.setAttribute("aria-live","polite");lr.append(Ct,et);ar.append(cr,Ro,Io,lr);var dr=a("div","sk-body"),le=a("div","sk-notice-root");le.setAttribute("aria-live","polite");var vt=a("div","sk-groups-note"),pr=a("div","sk-groups-row"),tt=a("div","sk-groups"),Go=a("div","sk-group-select"),Te=a("button","sk-chip sk-groups-edit","\u7F16\u8F91\u5206\u7EC4");Te.type="button";Te.setAttribute("aria-pressed","false");Te.addEventListener("click",()=>{O?mr():gs()});pr.append(tt,Go,Te);var Je=a("div","sk-group-editor-root"),Co=a("div"),rt=a("div"),We=a("input","sk-search");We.type="search";We.placeholder="\u641C\u7D22\u540D\u79F0\u6216 ID";We.setAttribute("aria-label","\u641C\u7D22\u6280\u80FD");We.addEventListener("input",()=>{Uo=We.value.trim().toLowerCase(),gr()});var ot=a("div","sk-list");ot.setAttribute("role","list");var ur=a("footer","sk-footer");ur.append(a("p","","\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002"),a("p","","\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002"));dr.append(le,vt,pr,Je,Co,rt,We,ot,ur);Rt.append(ar,dr);nr.append(Rt);var g=null,Ye=Yr(),Ie="original",Po=!1,nt=!1,wt={done:0,total:0},ue=null,ne=!1,Ce=null,A=null,f=null,fe=null,re=null,K=null,P=[],ge=null,ye=!0,O=null,Z=null,Le=!1,Ge=!1,Uo="",Zn=!1,os=To(Go,{value:"all",options:[{id:"all",label:"\u5168\u90E8"}],onChange:e=>{K=e==="all"?null:e,u()}}),yo=Go.querySelector(".oc-sdk-trigger");yo&&(yo.setAttribute("aria-label","\u5206\u7EC4\u7B5B\u9009"),yo.removeAttribute("aria-labelledby"));var ve=()=>!!g?.root.error,ns=e=>e.state==="conflict"?"error":e.state==="mixed"?"warning":e.state==="disabled"?"info":e.advertised?"success":"warning",rs=e=>e.state==="conflict"?"\u51B2\u7A81":e.state==="mixed"?"\u6DF7\u5408":e.state==="disabled"?"\u5173\u95ED":"\u5F00\u542F",ss=(e,t="neutral")=>{let o=a("span","sk-badge",e);return o.dataset.tone=t,o},is=e=>{switch(e){case"both":return"\u5165\u53E3\u548C\u505C\u7528\u6587\u4EF6\u540C\u65F6\u5B58\u5728";case"duplicate":return"\u540C ID \u591A\u4E2A\u5165\u53E3";case"invalid":return"frontmatter \u65E0\u6CD5\u89E3\u6790";case"empty":return"\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A";case"read-error":return"\u5165\u53E3\u65E0\u6CD5\u8BFB\u53D6";case"manual":return"\u4EC5\u624B\u52A8\u8C03\u7528";case"no-description":return"\u6CA1\u6709 description";default:return"\u51B2\u7A81"}},vo=(e,t)=>{if(!t)return null;let o=a("p","sk-path");return o.append(a("span","sk-path-label",`${e}\uFF1A`),a("code","",t)),o},X=(e,t,o=!1,r=!1)=>{let s=a("button",o?"sk-inline-button sk-inline-primary":"sk-inline-button",e);return s.type="button",s.disabled=!!f||r,s.addEventListener("click",t),s},qn=e=>{let t=a("li","sk-conflict-item");t.dataset.tone=e.blocking?"error":"warning";let o=a("div","sk-conflict-copy");if(o.append(a("strong","",is(e.kind)),a("p","sk-conflict-message",e.message)),e.kind==="both"?(o.append(vo("\u542F\u7528\u5165\u53E3",e.activePath)??a("span")),o.append(vo("\u505C\u7528\u5165\u53E3",e.disabledPath)??a("span"))):(e.activePath??e.disabledPath)&&o.append(vo("\u5165\u53E3",e.activePath??e.disabledPath)??a("span")),t.append(o),e.kind==="both"&&e.activePath){let r=a("div","sk-conflict-actions");r.append(X("\u4FDD\u7559\u542F\u7528",()=>void or(e,"enabled"),!1,ve()),X("\u4FDD\u7559\u5173\u95ED",()=>void or(e,"disabled"),!1,ve())),t.append(r)}return t},as=()=>{if(rt.replaceChildren(),!g)return;let t=[...g.root.error?[{kind:"read-error",skillId:"",message:`\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A${g.root.error}\uFF08${g.root.path}\uFF09`,activePath:null,disabledPath:null,blocking:!0}]:[],...g.conflicts],o=t.filter(l=>l.blocking),r=t.filter(l=>!l.blocking);if(o.length===0&&r.length===0)return;let s=a("section","sk-conflicts");s.setAttribute("aria-label","\u51B2\u7A81\u68C0\u67E5");let c=a("div","sk-section-head");if(c.append(a("h2","sk-section-title","\u51B2\u7A81\u68C0\u67E5"),a("span","sk-section-count",`${o.length} \u9879\u9700\u8981\u5904\u7406 \xB7 ${r.length} \u9879\u63D0\u793A`)),s.append(c),o.length>0){let l=a("ul","sk-conflict-list");for(let d of o)l.append(qn(d));s.append(l)}if(r.length>0){let l=a("details","sk-warning-details");l.append(a("summary","",`\u63D0\u793A\uFF08${r.length}\uFF09`));let d=a("ul","sk-conflict-list");for(let p of r)d.append(qn(p));l.append(d),s.append(l)}rt.append(s)},cs=()=>{if(le.replaceChildren(),re){let e=re,t=new Set(e.skillIds),o=g?g.skills.filter(c=>!t.has(c.id)).length:0,r=a("div","sk-notice",`\u4EC5\u542F\u7528\u300C${e.name}\u300D\uFF1A\u5C06\u5173\u95ED\u5176\u4ED6 ${o} \u4E2A\u6280\u80FD\u3002`);r.dataset.tone="warning",r.setAttribute("role","status");let s=a("div","sk-notice-actions");s.append(X("\u786E\u8BA4",()=>void vs(),!0),X("\u53D6\u6D88",()=>{re=null,u()})),r.append(s),le.append(r);return}if(fe!==null){let e=g?g.skills.filter(r=>(fe?r.disabledPaths.length:r.activePaths.length)>0).length:0,t=a("div","sk-notice",fe?`\u5C06\u542F\u7528 ${e} \u4E2A\u6280\u80FD\u3002`:`\u5C06\u5173\u95ED ${e} \u4E2A\u6280\u80FD\u3002`);t.dataset.tone="warning",t.setAttribute("role","status");let o=a("div","sk-notice-actions");o.append(X(fe?"\u786E\u8BA4\u542F\u7528":"\u786E\u8BA4\u5173\u95ED",()=>void Cs(),!0),X("\u53D6\u6D88",()=>{fe=null,u()})),t.append(o),le.append(t);return}if(A){let e=a("div","sk-notice",A.text);if(e.dataset.tone=A.tone,e.setAttribute("role",A.tone==="error"?"alert":"status"),A.actions?.length){let t=a("div","sk-notice-actions");for(let o of A.actions)t.append(X(o.label,o.onClick,o.primary));e.append(t)}le.append(e);return}if(Ce){let e=a("div","sk-notice",Ce);e.dataset.tone="error",e.setAttribute("role","alert"),le.append(e);return}if(ue){let e=a("div","sk-notice",ue);e.dataset.tone="error",e.setAttribute("role","alert"),le.append(e);return}if(ne&&!g){let e=a("div","sk-notice","\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026");e.dataset.tone="info",e.setAttribute("role","status"),le.append(e)}},ls=()=>{if(!g){Ro.textContent=ne?"\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026":"\u5C1A\u672A\u8BFB\u53D6\u6280\u80FD\u3002",Io.textContent="\u5173\u95ED\u5165\u53E3\u6587\u6863\u540E\uFF0COpenCode \u4E0D\u4F1A\u518D\u53D1\u73B0\u8BE5\u6280\u80FD\u3002";return}Ro.textContent=`\u6A21\u578B\u53EF\u89C1 ${g.summary.advertised} / \u5171 ${g.summary.total} \u4E2A \xB7 \u7EA6 ${g.summary.estimatedTokens.toLocaleString("zh-CN")} tokens/\u6B65`;let e=[`${g.summary.disabled} \u4E2A\u5DF2\u5173\u95ED`];g.summary.blockingConflicts>0?e.push(`${g.summary.blockingConflicts} \u9879\u963B\u585E\u51B2\u7A81`):e.push("\u65E0\u963B\u585E\u51B2\u7A81"),g.summary.warnings>0&&e.push(`${g.summary.warnings} \u9879\u63D0\u793A`),g.root.error&&e.push("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6"),Io.textContent=`${e.join(" \xB7 ")}\u3002\u4F30\u7B97\u4E0D\u542B\u5185\u7F6E\u548C\u9879\u76EE\u6280\u80FD\u3002`},it=e=>{let t=Ye.entries[e.id];return t&&t.hash===e.contentHash?t:null},ds=()=>g?.skills.filter(e=>it(e)).length??0,ps=e=>Ie!=="translated"?e.name:it(e)?.nameZh||e.name;var us=()=>{Ke.setAttribute("aria-pressed",Ie==="translated"?"true":"false"),st.setAttribute("aria-pressed",Ie==="original"?"true":"false"),Ke.disabled=nt;let e=g?.skills.length??0,t=ds();nt?et.textContent=`\u7FFB\u8BD1 ${wt.done}/${wt.total}\u2026`:Ie==="translated"?et.textContent=t?`${t}/${e} \u5DF2\u7FFB\u8BD1`:"\u70B9\u201C\u7FFB\u8BD1\u201D\u751F\u6210\u4E2D\u6587":et.textContent=t?`${t} \u4E2A\u6709\u4E2D\u6587`:""},Pe=e=>e.skillIds.filter(t=>g?.skills.some(o=>o.id===t)),fr=e=>{let t=Pe(e).map(r=>g?.skills.find(s=>s.id===r)).filter(r=>!!r);if(t.length===0)return"\u65E0\u6280\u80FD";if(t.some(r=>r.state==="conflict"))return"\u6709\u51B2\u7A81";let o=t.filter(r=>r.state==="enabled").length;return o===t.length?"\u5168\u5F00":o===0?"\u5168\u5173":"\u90E8\u5206"},Qn=e=>{Array.from(tt.querySelectorAll("[data-group]")).find(o=>o.dataset.group===e)?.focus()},fs=()=>`custom-${globalThis.crypto?.randomUUID?.().slice(0,8)??Math.random().toString(36).slice(2,10)}`,ms=()=>{if(vt.replaceChildren(),ge){let e=a("div","sk-notice",`\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF1A${ge}`);e.dataset.tone="error",e.setAttribute("role","alert");let t=a("div","sk-notice-actions");t.append(X("\u91CD\u65B0\u8BFB\u53D6",()=>void No(),!1,ye)),e.append(t),vt.append(e);return}ye||P.length>0||!g||ve()||vt.append(a("div","sk-notice","\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002\u70B9\u300C\u7F16\u8F91\u5206\u7EC4\u300D\u65B0\u5EFA\uFF0C\u6216\u5728\u7F16\u8F91\u5668\u91CC\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4\u3002"))},Mo=e=>{O={id:e?.id??null,name:e?.name??"",members:e?[...e.skillIds]:[]},Z=null,Le=!1,Ge=!1,u();let t=Je.querySelector(".sk-group-name");t?.focus(),t?.select()},gs=()=>{if(ge||ye||!g||ve())return;let e=P.find(t=>t.id===K)??P[0]??null;Mo(e),Je.scrollIntoView({block:"nearest"})},mr=()=>{f||(O=null,Z=null,Le=!1,Ge=!1,u(),Te.focus())},ks=e=>{if(e==="new"){Mo(null);return}let t=P.find(o=>o.id===e);t&&Mo(t)},Ao=()=>{Je.querySelector(".sk-group-name")?.focus()},er=async()=>{let e=O;if(!e||f||ge)return;let t=e.name.trim();if(!t){Z="\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0\u3002",u(),Ao();return}if(t.length>40){Z=`\u5206\u7EC4\u540D\u79F0\u4E0D\u80FD\u8D85\u8FC7 ${40} \u4E2A\u5B57\u7B26\u3002`,u(),Ao();return}if(P.some(c=>c.id!==e.id&&c.name.trim().toLowerCase()===t.toLowerCase())){Z=`\u5DF2\u7ECF\u6709\u540D\u4E3A\u300C${t}\u300D\u7684\u5206\u7EC4\u3002`,u(),Ao();return}if(e.members.length===0){Z="\u5206\u7EC4\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u6210\u5458\u3002",u();return}let o=e.id??fs(),r={id:o,name:t,skillIds:[...e.members]},s=e.id?P.map(c=>c.id===e.id?r:c):[...P,r];f="groups",Z=null,u();try{P=Ot(await de("POST","/groups",{version:1,groups:s})),ge=null,K=o,re=null;let c=P.find(l=>l.id===o)??null;O=c?{id:c.id,name:c.name,members:[...c.skillIds]}:null,A={text:`\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C${t}\u300D\u3002`,tone:"success"},Ae.toast({kind:"success",message:`\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C${t}\u300D`}).catch(()=>{})}catch(c){Z=q(c)}finally{f=null,u()}},hs=()=>{!O?.id||f||(Le=!0,Ge=!1,u())},Es=async()=>{if(!O?.id||f)return;let e=O.id,t=P.filter(o=>o.id!==e);f="groups",Le=!1,Z=null,u();try{P=Ot(await de("POST","/groups",{version:1,groups:t})),ge=null,re?.id===e&&(re=null),K===e&&(K=null);let o=P.find(r=>r.id===K)??P[0]??null;K=o?.id??null,O=o?{id:o.id,name:o.name,members:[...o.skillIds]}:null,A={text:"\u5DF2\u5220\u9664\u5206\u7EC4\u3002",tone:"success"}}catch(o){Z=q(o)}finally{f=null,u()}},xs=()=>{if(!(f||ye||ge)){if(yt(P).added.length===0){A={text:"\u793A\u4F8B\u5206\u7EC4\u7684\u540D\u79F0\u6216 ID \u90FD\u5DF2\u5B58\u5728\uFF0C\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u5206\u7EC4\u3002",tone:"info"},u();return}Ge=!0,Le=!1,u()}},bs=async()=>{if(f)return;let{groups:e,added:t}=yt(P);if(Ge=!1,t.length===0){A={text:"\u793A\u4F8B\u5206\u7EC4\u7684\u540D\u79F0\u6216 ID \u90FD\u5DF2\u5B58\u5728\uFF0C\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u5206\u7EC4\u3002",tone:"info"},u();return}f="groups",Z=null,u();try{P=Ot(await de("POST","/groups",{version:1,groups:e})),ge=null,A={text:`\u5DF2\u5BFC\u5165 ${t.length} \u4E2A\u793A\u4F8B\u5206\u7EC4\u3002`,tone:"success"}}catch(o){Z=q(o)}finally{f=null,u()}},Ss=()=>{if(Je.replaceChildren(),!O)return;let e=O,t=a("section","sk-group-editor");t.setAttribute("aria-label","\u7F16\u8F91\u5206\u7EC4");let o=a("div","sk-section-head");o.append(a("h2","sk-section-title","\u7F16\u8F91\u5206\u7EC4"),X("\u5173\u95ED",mr,!1,!!f)),t.append(o);let r=a("label","sk-field");r.append(a("span","sk-field-label","\u9009\u62E9\u5206\u7EC4"));let s=a("select","sk-input");s.setAttribute("aria-label","\u9009\u62E9\u5206\u7EC4");let c=a("option","","\u65B0\u5EFA\u5206\u7EC4");c.value="new",s.append(c);for(let S of P){let I=a("option","",`${S.name}\uFF08${S.skillIds.length}\uFF09`);I.value=S.id,s.append(I)}s.value=e.id??"new",s.disabled=!!f,s.addEventListener("change",()=>ks(s.value)),r.append(s);let l=a("label","sk-field");l.append(a("span","sk-field-label","\u540D\u79F0"));let d=a("input","sk-input sk-group-name");d.type="text",d.value=e.name,d.maxLength=40,d.placeholder="\u4F8B\u5982\uFF1A\u65E5\u5E38\u5F00\u53D1",d.autocomplete="off",d.spellcheck=!1,d.disabled=!!f,d.addEventListener("input",()=>{O&&(O.name=d.value,Z=null)}),d.addEventListener("keydown",S=>{S.key==="Enter"&&(S.preventDefault(),er())}),l.append(d),t.append(r,l);let p=a("fieldset","sk-members"),T=a("legend","",`\u6210\u5458\uFF08${e.members.length}\uFF09`);p.append(T);let U=a("div","sk-members-tools");U.append(X("\u5168\u9009",()=>{if(!O)return;let S=g?.skills.map(R=>R.id)??[],I=O.members.filter(R=>!S.includes(R));O.members=[...S,...I],u()},!1,!!f),X("\u6E05\u7A7A",()=>{O&&(O.members=[],u())},!1,!!f)),p.append(U);let y=a("div","sk-member-list");for(let S of g?.skills??[]){let I=a("label","sk-check"),R=a("input");R.type="checkbox",R.checked=e.members.includes(S.id),R.disabled=!!f,R.addEventListener("change",()=>{O&&(R.checked?O.members.includes(S.id)||O.members.push(S.id):O.members=O.members.filter(te=>te!==S.id),T.textContent=`\u6210\u5458\uFF08${O.members.length}\uFF09`,Z=null)});let se=a("span","sk-check-copy");se.append(a("span","sk-check-name",ps(S)),a("code","sk-check-id",S.id)),I.append(R,se),y.append(I)}p.append(y);let L=new Set(g?.skills.map(S=>S.id)??[]),N=e.members.filter(S=>!L.has(S));if(N.length>0){let S=a("div","sk-missing");S.append(a("span","sk-missing-label","\u76EE\u5F55\u4E2D\u7F3A\u5931\uFF1A"));for(let I of N){let R=a("button","sk-missing-chip",`${I} \xD7`);R.type="button",R.disabled=!!f,R.title="\u4ECE\u5206\u7EC4\u79FB\u9664\u8FD9\u4E2A\u7F3A\u5931\u6210\u5458",R.addEventListener("click",()=>{O&&(O.members=O.members.filter(se=>se!==I),u())}),S.append(R)}p.append(S)}if(t.append(p),Z){let S=a("p","sk-editor-error",Z);S.setAttribute("role","alert"),t.append(S)}let Y=a("div","sk-editor-actions");if(e.id&&Y.append(X("\u5220\u9664\u5206\u7EC4",hs,!1,!!f)),Y.append(X("\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4",xs,!1,!!f),X(e.id?"\u4FDD\u5B58\u66F4\u6539":"\u65B0\u5EFA\u5206\u7EC4",()=>void er(),!0,!!f)),t.append(Y),Le){let S=a("div","sk-editor-confirm");S.dataset.tone="warning",S.append(a("p","",`\u5220\u9664\u5206\u7EC4\u300C${e.name.trim()||"\u672A\u547D\u540D"}\u300D\uFF1F\u6280\u80FD\u672C\u8EAB\u4E0D\u4F1A\u88AB\u5220\u9664\u3002`));let I=a("div","sk-actions");I.append(X("\u786E\u8BA4\u5220\u9664",()=>void Es(),!0,!!f),X("\u53D6\u6D88",()=>{Le=!1,u()},!1,!!f)),S.append(I),t.append(S)}if(Ge){let S=yt(P).added.length,I=a("div","sk-editor-confirm");I.dataset.tone="warning",I.append(a("p","",`\u5BFC\u5165 ${S} \u4E2A\u793A\u4F8B\u5206\u7EC4\uFF1F\u5DF2\u6709\u540C\u540D\u6216\u540C ID \u7684\u5206\u7EC4\u4F1A\u8DF3\u8FC7\uFF0C\u5F53\u524D\u5206\u7EC4\u4E0D\u4F1A\u88AB\u8986\u76D6\u3002`));let R=a("div","sk-actions");R.append(X("\u786E\u8BA4\u5BFC\u5165",()=>void bs(),!0,!!f),X("\u53D6\u6D88",()=>{Ge=!1,u()},!1,!!f)),I.append(R),t.append(I)}t.append(a("p","sk-editor-hint","\u5206\u7EC4\u53EA\u5F71\u54CD\u9762\u677F\u7B5B\u9009\u548C\u6279\u91CF\u5F00\u5173\uFF0C\u4E0D\u6539\u53D8\u6280\u80FD\uFF1B\u6210\u5458\u987A\u5E8F\u51B3\u5B9A\u7EC4\u5185\u6B65\u9AA4\u53F7\uFF0C\u4FDD\u5B58\u540E\u5199\u5165 groups.json\u3002")),Je.append(t)},_s=()=>{tt.replaceChildren();let e=g?.skills.length??0,t=a("button","sk-chip",`\u5168\u90E8 ${e}`);t.type="button",t.dataset.group="all",t.setAttribute("aria-pressed",K===null?"true":"false"),t.addEventListener("click",()=>{K=null,u(),Qn("all")}),tt.append(t);for(let o of P){let r=Pe(o).length,s=a("button","sk-chip",`${o.name} ${r}`);s.type="button",s.dataset.group=o.id,s.setAttribute("aria-pressed",K===o.id?"true":"false"),s.addEventListener("click",()=>{K=o.id,u(),Qn(o.id)}),tt.append(s)}Te.textContent=O?"\u5173\u95ED\u7F16\u8F91":"\u7F16\u8F91\u5206\u7EC4",Te.setAttribute("aria-pressed",O?"true":"false"),Te.disabled=ye||!!ge||!!f||!g||ve(),Te.title=ye?"\u6B63\u5728\u8BFB\u53D6\u5206\u7EC4\u2026":ge?"\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u4FEE\u590D\u6587\u4EF6\u540E\u91CD\u65B0\u8BFB\u53D6":g?ve()?"\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"":"\u6280\u80FD\u5217\u8868\u5C1A\u672A\u8BFB\u53D6",os.update({value:K??"all",options:[{id:"all",label:`\u5168\u90E8 ${e}`},...P.map(o=>({id:o.id,label:`${o.name} ${Pe(o).length}`,hint:fr(o)}))]})},Ts=()=>{if(Co.replaceChildren(),!g||!K)return;let e=g,t=P.find(y=>y.id===K);if(!t)return;let o=Pe(t),r=t.skillIds.filter(y=>!o.includes(y)),c=o.map(y=>e.skills.find(L=>L.id===y)).filter(y=>!!y).some(y=>y.state==="conflict"),l=ve()||c||o.length===0,d=a("div","sk-groupbar"),p=a("div","sk-groupbar-text");p.append(a("strong","",t.name),a("span","sk-group-state",`${o.length} \u4E2A \xB7 ${fr(t)}`)),r.length>0&&p.append(a("p","sk-group-warning",`\u7F3A\u5931\uFF1A${r.join("\u3001")}`));let T=a("div","sk-groupbar-actions");T.append(X("\u542F\u7528\u6574\u7EC4",()=>void tr(t,!0),!1,l),X("\u5173\u95ED\u6574\u7EC4",()=>void tr(t,!1),!1,l));let U=X("\u4EC5\u542F\u7528\u672C\u7EC4",()=>ys(t),!1,l||r.length>0);r.length>0&&(U.title="\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u5148\u5904\u7406\u540E\u518D\u4EC5\u542F\u7528\u672C\u7EC4"),T.append(U),d.append(p,T),Co.append(d)},tr=async(e,t)=>{if(!g||f)return;let o=Pe(e);if(o.length!==0){f=`group:${e.id}:${t?"on":"off"}`,re=null,fe=null,A=null,u();try{g=Ne(await de("POST","/skills/batch",{enable:t?o:[],disable:t?[]:o})),A={text:`\u5DF2${t?"\u542F\u7528":"\u5173\u95ED"}\u300C${e.name}\u300D\u7684 ${o.length} \u4E2A\u6280\u80FD\u3002`,tone:"success"},Ae.toast({kind:"success",message:`${t?"\u5DF2\u542F\u7528":"\u5DF2\u5173\u95ED"}\u300C${e.name}\u300D`}).catch(()=>{})}catch(r){A={text:q(r),tone:"error"},f=null,u(),at(!1,!0);return}f=null,u()}},ys=e=>{if(!g||f)return;let t=Pe(e),o=e.skillIds.filter(r=>!t.includes(r));t.length===0||o.length>0||(re=e,fe=null,A=null,u(),le.scrollIntoView({block:"nearest"}),le.querySelector("button")?.focus())},vs=async()=>{if(!g||f||!re)return;let e=re;re=null;let t=Pe(e),o=e.skillIds.filter(c=>!t.includes(c));if(t.length===0||o.length>0){A={text:"\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u672A\u6267\u884C\u3002",tone:"error"},u();return}let r=new Set(e.skillIds),s=g.skills.filter(c=>!r.has(c.id)).map(c=>c.id);f=`group-only:${e.id}`,A=null,u();try{g=Ne(await de("POST","/skills/batch",{enable:t,disable:s})),A={text:`\u5DF2\u4EC5\u542F\u7528\u300C${e.name}\u300D\uFF0C\u5173\u95ED\u5176\u4ED6 ${s.length} \u4E2A\u6280\u80FD\u3002`,tone:"success"},Ae.toast({kind:"success",message:`\u5DF2\u4EC5\u542F\u7528\u300C${e.name}\u300D`}).catch(()=>{})}catch(c){A={text:q(c),tone:"error"},f=null,u(),at(!1,!0);return}f=null,u()};Ke.addEventListener("click",()=>{Po=!0,Ie="translated",u(),Is()});st.addEventListener("click",()=>{Po=!0,Ie="original",u()});var As=e=>{let t=a("div","sk-skill-action"),o=a("span","sk-action-note"),r=ve();if(e.state==="conflict"){o.textContent=r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5148\u5904\u7406\u51B2\u7A81";let l=a("button","sk-inline-button","\u5904\u7406\u51B2\u7A81");return l.type="button",l.disabled=!!f||r,l.addEventListener("click",()=>{rt.scrollIntoView({block:"nearest"}),rt.querySelector("button")?.focus()}),t.append(o,l),t}if(e.state==="mixed"){o.textContent=r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u90E8\u5206\u5165\u53E3\u5173\u95ED";let l=a("div","sk-mini-actions"),d=a("button","sk-inline-button","\u5168\u90E8\u542F\u7528");d.type="button",d.disabled=!!f||r,d.addEventListener("click",()=>void wo(e,!0));let p=a("button","sk-inline-button","\u5168\u90E8\u5173\u95ED");return p.type="button",p.disabled=!!f||r,p.addEventListener("click",()=>void wo(e,!1)),l.append(d,p),t.append(o,l),t}let s=e.state==="enabled",c=a("button","sk-switch");return c.type="button",c.setAttribute("role","switch"),c.setAttribute("aria-checked",s?"true":"false"),c.setAttribute("aria-label",`${s?"\u5173\u95ED":"\u542F\u7528"} ${e.name}`),c.dataset.skillId=e.id,c.disabled=!!f||r,c.append(a("span","sk-thumb")),c.addEventListener("click",()=>{c.disabled||wo(e,!s)}),s?o.textContent=r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":e.advertised?"\u6A21\u578B\u53EF\u89C1":"\u6A21\u578B\u4E0D\u53EF\u89C1":o.textContent=r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5165\u53E3\u5DF2\u5173\u95ED",t.append(o,c),t},ws=(e,t=0)=>{let o=a("article","sk-skill");o.dataset.state=e.state,o.setAttribute("role","listitem");let r=a("div","sk-skill-main"),s=a("div","sk-skill-head");if(t>0){let p=a("span","sk-step",String(t));p.title=`\u7B2C ${t} \u6B65`,p.setAttribute("aria-label",`\u7B2C ${t} \u6B65`),s.append(p)}let c=Ie==="translated"?it(e):null;s.append(a("strong","sk-name",c?.nameZh||e.name),ss(rs(e),ns(e)));let l=a("div","sk-meta");c&&l.append(a("span","sk-original-name",e.name)),l.append(a("code","sk-id",e.id));let d=a("p","sk-desc",c?.descriptionZh||e.description||"\u65E0 description\uFF0C\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002");if(r.append(s,l,d),e.warnings.length>0){let p=a("p","sk-warn",e.warnings.slice(0,2).join(" \xB7 "));r.append(p)}return o.append(r,As(e)),o},gr=()=>{if(ot.replaceChildren(),!g)return;let e=K?P.find(r=>r.id===K):null,o=(e?e.skillIds.map(r=>g?.skills.find(s=>s.id===r)).filter(r=>!!r):g.skills).filter(r=>{if(!Uo)return!0;let s=it(r);return[r.id,r.name,r.description,s?.nameZh??"",s?.descriptionZh??"",...r.warnings].join(" ").toLowerCase().includes(Uo)});if(o.length===0){let r=a("div","sk-empty");r.append(a("h2","",g.skills.length===0?"\u6CA1\u6709\u53D1\u73B0\u6280\u80FD":e?"\u8FD9\u4E2A\u5206\u7EC4\u6CA1\u6709\u53EF\u7528\u6280\u80FD":"\u6CA1\u6709\u5339\u914D\u7684\u6280\u80FD"),a("p","",g.skills.length===0?"\u68C0\u67E5 ~/.config/opencode/skills \u662F\u5426\u5B58\u5728\uFF0C\u6216\u91CD\u65B0\u626B\u63CF\u3002":e?"\u68C0\u67E5\u5206\u7EC4\u91CC\u7684\u6280\u80FD\u662F\u5426\u88AB\u79FB\u9664\u3002":"\u6362\u4E00\u4E2A\u641C\u7D22\u8BCD\u3002")),ot.append(r);return}for(let r of o){let s=e&&e.skillIds.length>1?e.skillIds.indexOf(r.id)+1:0;ot.append(ws(r,s))}},u=()=>{Rt.setAttribute("aria-busy",ne?"true":"false"),ls(),us(),cs(),ms(),_s(),Ss(),Ts(),as(),gr(),Qr.update({label:ne?"\u8BFB\u53D6\u4E2D\u2026":"\u91CD\u65B0\u626B\u63CF",loading:ne,disabled:ne||!!f});let e=ve();es.update({disabled:ne||!!f||!g||e}),ts.update({disabled:ne||!!f||!g||e})},Os=e=>{Array.from(document.querySelectorAll("[data-skill-id]")).find(o=>o.dataset.skillId===e)?.focus()},at=async(e=!1,t=!1)=>{if(!ne){ne=!0,t||(Ce=null),e&&u();try{g=Ne(await de("GET","/skills")),Ce=null}catch(o){t||(Ce=q(o))}finally{ne=!1,u()}}},Rs=async()=>{try{Ye=ir(await de("POST","/translations",Ye)),ue=null}catch(e){ue=q(e)}},Is=async()=>{if(!g||nt)return;let e=g.skills.filter(s=>!it(s));if(e.length===0){A={text:"\u4E2D\u6587\u8BF4\u660E\u5DF2\u662F\u6700\u65B0\u3002",tone:"success"},u();return}nt=!0,ue=null,wt={done:0,total:e.length},A=null,u();let t=0,o=0,r=!1;try{for(let s=0;s<e.length;s+=4){let c=e.slice(s,s+4),l=c;for(let d=0;d<2&&l.length>0;d+=1){let p=await Ae.generate({prompt:Vn(l.map(y=>({id:y.id,name:y.name,description:y.description}))),system:zn,maxOutputTokens:2048}),T=jn(p.text),U=new Set;for(let y of T){let L=l.find(N=>N.id===y.id);L&&(Ye.entries[L.id]={hash:L.contentHash,nameZh:y.nameZh,descriptionZh:y.descriptionZh,updatedAt:Date.now()},U.add(L.id))}l=l.filter(y=>!U.has(y.id))}o+=l.length,t+=c.length-l.length,wt={done:t,total:e.length},await Rs(),u()}}catch(s){r=!0,ue=q(s),A={text:ue,tone:"error"}}finally{nt=!1,r||(ue?A={text:`\u7FFB\u8BD1\u5B8C\u6210\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A${ue}`,tone:"warning"}:o>0?A={text:`\u5DF2\u7FFB\u8BD1 ${t} \u4E2A\u6280\u80FD\uFF0C${o} \u4E2A\u5931\u8D25\uFF1B\u53EF\u518D\u70B9\u201C\u7FFB\u8BD1\u201D\u91CD\u8BD5\u3002`,tone:"warning"}:A={text:`\u5DF2\u7FFB\u8BD1 ${t} \u4E2A\u6280\u80FD\u3002`,tone:"success"}),u()}},No=async(e=!1)=>{if(!(ye&&!e||O)){ye=!0,u();try{P=Ot(await de("GET","/groups")),ge=null,K&&!P.some(t=>t.id===K)&&(K=null)}catch(t){ge=Zr(t)}finally{ye=!1,u()}}},kr=async(e=!1)=>{if(ne)return;ne=!0,e&&u();let[t,o]=await Promise.allSettled([de("GET","/skills"),de("GET","/translations")]);if(t.status==="fulfilled")try{g=Ne(t.value),Ce=null}catch(r){Ce=q(r)}else Ce=q(t.reason);if(o.status==="fulfilled")try{Ye=ir(o.value),ue=null,!Po&&Object.keys(Ye.entries).length>0&&(Ie="translated")}catch(r){ue=q(r)}else ue=q(o.reason);ne=!1,u()},wo=async(e,t)=>{if(!f){f=`toggle:${e.id}`,fe=null,re=null,A=null,u();try{g=Ne(await de("POST","/skills/toggle",{id:e.id,enabled:t})),A={text:t?`\u5DF2\u542F\u7528 ${e.name}\u3002`:`\u5DF2\u5173\u95ED ${e.name}\uFF1BOpenCode \u4E0B\u4E00\u6B21\u626B\u63CF\u540E\u4E0D\u518D\u53D1\u73B0\u5B83\u3002`,tone:"success"},Ae.toast({kind:"success",message:t?`\u5DF2\u542F\u7528 ${e.name}`:`\u5DF2\u5173\u95ED ${e.name}`}).catch(()=>{})}catch(o){A={text:q(o),tone:"error"},f=null,u(),at(!1,!0);return}f=null,u(),Os(e.id)}},or=async(e,t)=>{if(f)return;let o=e.activePath??e.disabledPath;if(o){f=`resolve:${o}`,A=null,u();try{let r=await de("POST","/skills/resolve",{path:o,keep:t}),s=r&&typeof r=="object"&&typeof r.backupPath=="string"?r.backupPath:null;g=Ne(r),A={text:`\u5DF2\u4FDD\u7559${t==="enabled"?"\u542F\u7528":"\u5173\u95ED"}\u5165\u53E3${s?`\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A ${s}`:""}\u3002`,tone:"success"},Ae.toast({kind:"success",message:"\u5165\u53E3\u51B2\u7A81\u5DF2\u5904\u7406"}).catch(()=>{})}catch(r){A={text:q(r),tone:"error"},f=null,u(),at(!1,!0);return}f=null,u()}},hr=e=>{!g||f||(fe=e,re=null,A=null,u(),le.scrollIntoView({block:"nearest"}),le.querySelector("button")?.focus())},Cs=async()=>{if(fe===null||f)return;let e=fe;fe=null,re=null,f="bulk",A=null,u();try{let t=await de("POST","/skills/bulk",{enabled:e}),o=t&&typeof t=="object"&&Array.isArray(t.changed)?t.changed.filter(r=>typeof r=="string"):[];g=Ne(t),A={text:`${e?"\u5DF2\u542F\u7528":"\u5DF2\u5173\u95ED"} ${o.length} \u4E2A\u6280\u80FD\u3002`,tone:"success"},Ae.toast({kind:"success",message:`${e?"\u5DF2\u542F\u7528":"\u5DF2\u5173\u95ED"} ${o.length} \u4E2A\u6280\u80FD`}).catch(()=>{})}catch(t){A={text:q(t),tone:"error"},f=null,u(),at(!1,!0);return}f=null,u()};Ae.onReady(e=>{if(po(e,document.documentElement),document.documentElement.lang=e.locale.startsWith("zh")?e.locale:"zh-CN",Zn){u();return}Zn=!0,kr(!0),No(!0)});u();})();
