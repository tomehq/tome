(function(){const j=document.createElement("link").relList;if(j&&j.supports&&j.supports("modulepreload"))return;for(const D of document.querySelectorAll('link[rel="modulepreload"]'))d(D);new MutationObserver(D=>{for(const R of D)if(R.type==="childList")for(const B of R.addedNodes)B.tagName==="LINK"&&B.rel==="modulepreload"&&d(B)}).observe(document,{childList:!0,subtree:!0});function T(D){const R={};return D.integrity&&(R.integrity=D.integrity),D.referrerPolicy&&(R.referrerPolicy=D.referrerPolicy),D.crossOrigin==="use-credentials"?R.credentials="include":D.crossOrigin==="anonymous"?R.credentials="omit":R.credentials="same-origin",R}function d(D){if(D.ep)return;D.ep=!0;const R=T(D);fetch(D.href,R)}})();function cp(h){return h&&h.__esModule&&Object.prototype.hasOwnProperty.call(h,"default")?h.default:h}var _c={exports:{}},Zl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rd;function sp(){if(Rd)return Zl;Rd=1;var h=Symbol.for("react.transitional.element"),j=Symbol.for("react.fragment");function T(d,D,R){var B=null;if(R!==void 0&&(B=""+R),D.key!==void 0&&(B=""+D.key),"key"in D){R={};for(var N in D)N!=="key"&&(R[N]=D[N])}else R=D;return D=R.ref,{$$typeof:h,type:d,key:B,ref:D!==void 0?D:null,props:R}}return Zl.Fragment=j,Zl.jsx=T,Zl.jsxs=T,Zl}var Ud;function rp(){return Ud||(Ud=1,_c.exports=sp()),_c.exports}var s=rp(),Mc={exports:{}},J={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qd;function fp(){if(qd)return J;qd=1;var h=Symbol.for("react.transitional.element"),j=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),d=Symbol.for("react.strict_mode"),D=Symbol.for("react.profiler"),R=Symbol.for("react.consumer"),B=Symbol.for("react.context"),N=Symbol.for("react.forward_ref"),_=Symbol.for("react.suspense"),b=Symbol.for("react.memo"),C=Symbol.for("react.lazy"),O=Symbol.for("react.activity"),G=Symbol.iterator;function oe(f){return f===null||typeof f!="object"?null:(f=G&&f[G]||f["@@iterator"],typeof f=="function"?f:null)}var Ae={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},re=Object.assign,Y={};function W(f,z,H){this.props=f,this.context=z,this.refs=Y,this.updater=H||Ae}W.prototype.isReactComponent={},W.prototype.setState=function(f,z){if(typeof f!="object"&&typeof f!="function"&&f!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,f,z,"setState")},W.prototype.forceUpdate=function(f){this.updater.enqueueForceUpdate(this,f,"forceUpdate")};function xe(){}xe.prototype=W.prototype;function Me(f,z,H){this.props=f,this.context=z,this.refs=Y,this.updater=H||Ae}var F=Me.prototype=new xe;F.constructor=Me,re(F,W.prototype),F.isPureReactComponent=!0;var je=Array.isArray;function Ee(){}var k={H:null,A:null,T:null,S:null},Ue=Object.prototype.hasOwnProperty;function dt(f,z,H){var U=H.ref;return{$$typeof:h,type:f,key:z,ref:U!==void 0?U:null,props:H}}function nt(f,z){return dt(f.type,z,f.props)}function Tt(f){return typeof f=="object"&&f!==null&&f.$$typeof===h}function Qe(f){var z={"=":"=0",":":"=2"};return"$"+f.replace(/[=:]/g,function(H){return z[H]})}var Zt=/\/+/g;function At(f,z){return typeof f=="object"&&f!==null&&f.key!=null?Qe(""+f.key):z.toString(36)}function mt(f){switch(f.status){case"fulfilled":return f.value;case"rejected":throw f.reason;default:switch(typeof f.status=="string"?f.then(Ee,Ee):(f.status="pending",f.then(function(z){f.status==="pending"&&(f.status="fulfilled",f.value=z)},function(z){f.status==="pending"&&(f.status="rejected",f.reason=z)})),f.status){case"fulfilled":return f.value;case"rejected":throw f.reason}}throw f}function S(f,z,H,U,K){var I=typeof f;(I==="undefined"||I==="boolean")&&(f=null);var te=!1;if(f===null)te=!0;else switch(I){case"bigint":case"string":case"number":te=!0;break;case"object":switch(f.$$typeof){case h:case j:te=!0;break;case C:return te=f._init,S(te(f._payload),z,H,U,K)}}if(te)return K=K(f),te=U===""?"."+At(f,0):U,je(K)?(H="",te!=null&&(H=te.replace(Zt,"$&/")+"/"),S(K,z,H,"",function(kt){return kt})):K!=null&&(Tt(K)&&(K=nt(K,H+(K.key==null||f&&f.key===K.key?"":(""+K.key).replace(Zt,"$&/")+"/")+te)),z.push(K)),1;te=0;var Ve=U===""?".":U+":";if(je(f))for(var Ce=0;Ce<f.length;Ce++)U=f[Ce],I=Ve+At(U,Ce),te+=S(U,z,H,I,K);else if(Ce=oe(f),typeof Ce=="function")for(f=Ce.call(f),Ce=0;!(U=f.next()).done;)U=U.value,I=Ve+At(U,Ce++),te+=S(U,z,H,I,K);else if(I==="object"){if(typeof f.then=="function")return S(mt(f),z,H,U,K);throw z=String(f),Error("Objects are not valid as a React child (found: "+(z==="[object Object]"?"object with keys {"+Object.keys(f).join(", ")+"}":z)+"). If you meant to render a collection of children, use an array instead.")}return te}function q(f,z,H){if(f==null)return f;var U=[],K=0;return S(f,U,"","",function(I){return z.call(H,I,K++)}),U}function V(f){if(f._status===-1){var z=f._result;z=z(),z.then(function(H){(f._status===0||f._status===-1)&&(f._status=1,f._result=H)},function(H){(f._status===0||f._status===-1)&&(f._status=2,f._result=H)}),f._status===-1&&(f._status=0,f._result=z)}if(f._status===1)return f._result.default;throw f._result}var me=typeof reportError=="function"?reportError:function(f){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof f=="object"&&f!==null&&typeof f.message=="string"?String(f.message):String(f),error:f});if(!window.dispatchEvent(z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",f);return}console.error(f)},he={map:q,forEach:function(f,z,H){q(f,function(){z.apply(this,arguments)},H)},count:function(f){var z=0;return q(f,function(){z++}),z},toArray:function(f){return q(f,function(z){return z})||[]},only:function(f){if(!Tt(f))throw Error("React.Children.only expected to receive a single React element child.");return f}};return J.Activity=O,J.Children=he,J.Component=W,J.Fragment=T,J.Profiler=D,J.PureComponent=Me,J.StrictMode=d,J.Suspense=_,J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=k,J.__COMPILER_RUNTIME={__proto__:null,c:function(f){return k.H.useMemoCache(f)}},J.cache=function(f){return function(){return f.apply(null,arguments)}},J.cacheSignal=function(){return null},J.cloneElement=function(f,z,H){if(f==null)throw Error("The argument must be a React element, but you passed "+f+".");var U=re({},f.props),K=f.key;if(z!=null)for(I in z.key!==void 0&&(K=""+z.key),z)!Ue.call(z,I)||I==="key"||I==="__self"||I==="__source"||I==="ref"&&z.ref===void 0||(U[I]=z[I]);var I=arguments.length-2;if(I===1)U.children=H;else if(1<I){for(var te=Array(I),Ve=0;Ve<I;Ve++)te[Ve]=arguments[Ve+2];U.children=te}return dt(f.type,K,U)},J.createContext=function(f){return f={$$typeof:B,_currentValue:f,_currentValue2:f,_threadCount:0,Provider:null,Consumer:null},f.Provider=f,f.Consumer={$$typeof:R,_context:f},f},J.createElement=function(f,z,H){var U,K={},I=null;if(z!=null)for(U in z.key!==void 0&&(I=""+z.key),z)Ue.call(z,U)&&U!=="key"&&U!=="__self"&&U!=="__source"&&(K[U]=z[U]);var te=arguments.length-2;if(te===1)K.children=H;else if(1<te){for(var Ve=Array(te),Ce=0;Ce<te;Ce++)Ve[Ce]=arguments[Ce+2];K.children=Ve}if(f&&f.defaultProps)for(U in te=f.defaultProps,te)K[U]===void 0&&(K[U]=te[U]);return dt(f,I,K)},J.createRef=function(){return{current:null}},J.forwardRef=function(f){return{$$typeof:N,render:f}},J.isValidElement=Tt,J.lazy=function(f){return{$$typeof:C,_payload:{_status:-1,_result:f},_init:V}},J.memo=function(f,z){return{$$typeof:b,type:f,compare:z===void 0?null:z}},J.startTransition=function(f){var z=k.T,H={};k.T=H;try{var U=f(),K=k.S;K!==null&&K(H,U),typeof U=="object"&&U!==null&&typeof U.then=="function"&&U.then(Ee,me)}catch(I){me(I)}finally{z!==null&&H.types!==null&&(z.types=H.types),k.T=z}},J.unstable_useCacheRefresh=function(){return k.H.useCacheRefresh()},J.use=function(f){return k.H.use(f)},J.useActionState=function(f,z,H){return k.H.useActionState(f,z,H)},J.useCallback=function(f,z){return k.H.useCallback(f,z)},J.useContext=function(f){return k.H.useContext(f)},J.useDebugValue=function(){},J.useDeferredValue=function(f,z){return k.H.useDeferredValue(f,z)},J.useEffect=function(f,z){return k.H.useEffect(f,z)},J.useEffectEvent=function(f){return k.H.useEffectEvent(f)},J.useId=function(){return k.H.useId()},J.useImperativeHandle=function(f,z,H){return k.H.useImperativeHandle(f,z,H)},J.useInsertionEffect=function(f,z){return k.H.useInsertionEffect(f,z)},J.useLayoutEffect=function(f,z){return k.H.useLayoutEffect(f,z)},J.useMemo=function(f,z){return k.H.useMemo(f,z)},J.useOptimistic=function(f,z){return k.H.useOptimistic(f,z)},J.useReducer=function(f,z,H){return k.H.useReducer(f,z,H)},J.useRef=function(f){return k.H.useRef(f)},J.useState=function(f){return k.H.useState(f)},J.useSyncExternalStore=function(f,z,H){return k.H.useSyncExternalStore(f,z,H)},J.useTransition=function(){return k.H.useTransition()},J.version="19.2.4",J}var Hd;function qc(){return Hd||(Hd=1,Mc.exports=fp()),Mc.exports}var Q=qc();const dp=cp(Q);var Dc={exports:{}},kl={},jc={exports:{}},Cc={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Nd;function mp(){return Nd||(Nd=1,(function(h){function j(S,q){var V=S.length;S.push(q);e:for(;0<V;){var me=V-1>>>1,he=S[me];if(0<D(he,q))S[me]=q,S[V]=he,V=me;else break e}}function T(S){return S.length===0?null:S[0]}function d(S){if(S.length===0)return null;var q=S[0],V=S.pop();if(V!==q){S[0]=V;e:for(var me=0,he=S.length,f=he>>>1;me<f;){var z=2*(me+1)-1,H=S[z],U=z+1,K=S[U];if(0>D(H,V))U<he&&0>D(K,H)?(S[me]=K,S[U]=V,me=U):(S[me]=H,S[z]=V,me=z);else if(U<he&&0>D(K,V))S[me]=K,S[U]=V,me=U;else break e}}return q}function D(S,q){var V=S.sortIndex-q.sortIndex;return V!==0?V:S.id-q.id}if(h.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var R=performance;h.unstable_now=function(){return R.now()}}else{var B=Date,N=B.now();h.unstable_now=function(){return B.now()-N}}var _=[],b=[],C=1,O=null,G=3,oe=!1,Ae=!1,re=!1,Y=!1,W=typeof setTimeout=="function"?setTimeout:null,xe=typeof clearTimeout=="function"?clearTimeout:null,Me=typeof setImmediate<"u"?setImmediate:null;function F(S){for(var q=T(b);q!==null;){if(q.callback===null)d(b);else if(q.startTime<=S)d(b),q.sortIndex=q.expirationTime,j(_,q);else break;q=T(b)}}function je(S){if(re=!1,F(S),!Ae)if(T(_)!==null)Ae=!0,Ee||(Ee=!0,Qe());else{var q=T(b);q!==null&&mt(je,q.startTime-S)}}var Ee=!1,k=-1,Ue=5,dt=-1;function nt(){return Y?!0:!(h.unstable_now()-dt<Ue)}function Tt(){if(Y=!1,Ee){var S=h.unstable_now();dt=S;var q=!0;try{e:{Ae=!1,re&&(re=!1,xe(k),k=-1),oe=!0;var V=G;try{t:{for(F(S),O=T(_);O!==null&&!(O.expirationTime>S&&nt());){var me=O.callback;if(typeof me=="function"){O.callback=null,G=O.priorityLevel;var he=me(O.expirationTime<=S);if(S=h.unstable_now(),typeof he=="function"){O.callback=he,F(S),q=!0;break t}O===T(_)&&d(_),F(S)}else d(_);O=T(_)}if(O!==null)q=!0;else{var f=T(b);f!==null&&mt(je,f.startTime-S),q=!1}}break e}finally{O=null,G=V,oe=!1}q=void 0}}finally{q?Qe():Ee=!1}}}var Qe;if(typeof Me=="function")Qe=function(){Me(Tt)};else if(typeof MessageChannel<"u"){var Zt=new MessageChannel,At=Zt.port2;Zt.port1.onmessage=Tt,Qe=function(){At.postMessage(null)}}else Qe=function(){W(Tt,0)};function mt(S,q){k=W(function(){S(h.unstable_now())},q)}h.unstable_IdlePriority=5,h.unstable_ImmediatePriority=1,h.unstable_LowPriority=4,h.unstable_NormalPriority=3,h.unstable_Profiling=null,h.unstable_UserBlockingPriority=2,h.unstable_cancelCallback=function(S){S.callback=null},h.unstable_forceFrameRate=function(S){0>S||125<S?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ue=0<S?Math.floor(1e3/S):5},h.unstable_getCurrentPriorityLevel=function(){return G},h.unstable_next=function(S){switch(G){case 1:case 2:case 3:var q=3;break;default:q=G}var V=G;G=q;try{return S()}finally{G=V}},h.unstable_requestPaint=function(){Y=!0},h.unstable_runWithPriority=function(S,q){switch(S){case 1:case 2:case 3:case 4:case 5:break;default:S=3}var V=G;G=S;try{return q()}finally{G=V}},h.unstable_scheduleCallback=function(S,q,V){var me=h.unstable_now();switch(typeof V=="object"&&V!==null?(V=V.delay,V=typeof V=="number"&&0<V?me+V:me):V=me,S){case 1:var he=-1;break;case 2:he=250;break;case 5:he=1073741823;break;case 4:he=1e4;break;default:he=5e3}return he=V+he,S={id:C++,callback:q,priorityLevel:S,startTime:V,expirationTime:he,sortIndex:-1},V>me?(S.sortIndex=V,j(b,S),T(_)===null&&S===T(b)&&(re?(xe(k),k=-1):re=!0,mt(je,V-me))):(S.sortIndex=he,j(_,S),Ae||oe||(Ae=!0,Ee||(Ee=!0,Qe()))),S},h.unstable_shouldYield=nt,h.unstable_wrapCallback=function(S){var q=G;return function(){var V=G;G=q;try{return S.apply(this,arguments)}finally{G=V}}}})(Cc)),Cc}var Bd;function hp(){return Bd||(Bd=1,jc.exports=mp()),jc.exports}var Oc={exports:{}},et={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wd;function pp(){if(wd)return et;wd=1;var h=qc();function j(_){var b="https://react.dev/errors/"+_;if(1<arguments.length){b+="?args[]="+encodeURIComponent(arguments[1]);for(var C=2;C<arguments.length;C++)b+="&args[]="+encodeURIComponent(arguments[C])}return"Minified React error #"+_+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function T(){}var d={d:{f:T,r:function(){throw Error(j(522))},D:T,C:T,L:T,m:T,X:T,S:T,M:T},p:0,findDOMNode:null},D=Symbol.for("react.portal");function R(_,b,C){var O=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:D,key:O==null?null:""+O,children:_,containerInfo:b,implementation:C}}var B=h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function N(_,b){if(_==="font")return"";if(typeof b=="string")return b==="use-credentials"?b:""}return et.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=d,et.createPortal=function(_,b){var C=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!b||b.nodeType!==1&&b.nodeType!==9&&b.nodeType!==11)throw Error(j(299));return R(_,b,null,C)},et.flushSync=function(_){var b=B.T,C=d.p;try{if(B.T=null,d.p=2,_)return _()}finally{B.T=b,d.p=C,d.d.f()}},et.preconnect=function(_,b){typeof _=="string"&&(b?(b=b.crossOrigin,b=typeof b=="string"?b==="use-credentials"?b:"":void 0):b=null,d.d.C(_,b))},et.prefetchDNS=function(_){typeof _=="string"&&d.d.D(_)},et.preinit=function(_,b){if(typeof _=="string"&&b&&typeof b.as=="string"){var C=b.as,O=N(C,b.crossOrigin),G=typeof b.integrity=="string"?b.integrity:void 0,oe=typeof b.fetchPriority=="string"?b.fetchPriority:void 0;C==="style"?d.d.S(_,typeof b.precedence=="string"?b.precedence:void 0,{crossOrigin:O,integrity:G,fetchPriority:oe}):C==="script"&&d.d.X(_,{crossOrigin:O,integrity:G,fetchPriority:oe,nonce:typeof b.nonce=="string"?b.nonce:void 0})}},et.preinitModule=function(_,b){if(typeof _=="string")if(typeof b=="object"&&b!==null){if(b.as==null||b.as==="script"){var C=N(b.as,b.crossOrigin);d.d.M(_,{crossOrigin:C,integrity:typeof b.integrity=="string"?b.integrity:void 0,nonce:typeof b.nonce=="string"?b.nonce:void 0})}}else b==null&&d.d.M(_)},et.preload=function(_,b){if(typeof _=="string"&&typeof b=="object"&&b!==null&&typeof b.as=="string"){var C=b.as,O=N(C,b.crossOrigin);d.d.L(_,C,{crossOrigin:O,integrity:typeof b.integrity=="string"?b.integrity:void 0,nonce:typeof b.nonce=="string"?b.nonce:void 0,type:typeof b.type=="string"?b.type:void 0,fetchPriority:typeof b.fetchPriority=="string"?b.fetchPriority:void 0,referrerPolicy:typeof b.referrerPolicy=="string"?b.referrerPolicy:void 0,imageSrcSet:typeof b.imageSrcSet=="string"?b.imageSrcSet:void 0,imageSizes:typeof b.imageSizes=="string"?b.imageSizes:void 0,media:typeof b.media=="string"?b.media:void 0})}},et.preloadModule=function(_,b){if(typeof _=="string")if(b){var C=N(b.as,b.crossOrigin);d.d.m(_,{as:typeof b.as=="string"&&b.as!=="script"?b.as:void 0,crossOrigin:C,integrity:typeof b.integrity=="string"?b.integrity:void 0})}else d.d.m(_)},et.requestFormReset=function(_){d.d.r(_)},et.unstable_batchedUpdates=function(_,b){return _(b)},et.useFormState=function(_,b,C){return B.H.useFormState(_,b,C)},et.useFormStatus=function(){return B.H.useHostTransitionStatus()},et.version="19.2.4",et}var Ld;function gp(){if(Ld)return Oc.exports;Ld=1;function h(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(h)}catch(j){console.error(j)}}return h(),Oc.exports=pp(),Oc.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yd;function vp(){if(Yd)return kl;Yd=1;var h=hp(),j=qc(),T=gp();function d(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function D(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function R(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function B(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function N(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function _(e){if(R(e)!==e)throw Error(d(188))}function b(e){var t=e.alternate;if(!t){if(t=R(e),t===null)throw Error(d(188));return t!==e?null:e}for(var n=e,a=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return _(l),e;if(i===a)return _(l),t;i=i.sibling}throw Error(d(188))}if(n.return!==a.return)n=l,a=i;else{for(var u=!1,o=l.child;o;){if(o===n){u=!0,n=l,a=i;break}if(o===a){u=!0,a=l,n=i;break}o=o.sibling}if(!u){for(o=i.child;o;){if(o===n){u=!0,n=i,a=l;break}if(o===a){u=!0,a=i,n=l;break}o=o.sibling}if(!u)throw Error(d(189))}}if(n.alternate!==a)throw Error(d(190))}if(n.tag!==3)throw Error(d(188));return n.stateNode.current===n?e:t}function C(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=C(e),t!==null)return t;e=e.sibling}return null}var O=Object.assign,G=Symbol.for("react.element"),oe=Symbol.for("react.transitional.element"),Ae=Symbol.for("react.portal"),re=Symbol.for("react.fragment"),Y=Symbol.for("react.strict_mode"),W=Symbol.for("react.profiler"),xe=Symbol.for("react.consumer"),Me=Symbol.for("react.context"),F=Symbol.for("react.forward_ref"),je=Symbol.for("react.suspense"),Ee=Symbol.for("react.suspense_list"),k=Symbol.for("react.memo"),Ue=Symbol.for("react.lazy"),dt=Symbol.for("react.activity"),nt=Symbol.for("react.memo_cache_sentinel"),Tt=Symbol.iterator;function Qe(e){return e===null||typeof e!="object"?null:(e=Tt&&e[Tt]||e["@@iterator"],typeof e=="function"?e:null)}var Zt=Symbol.for("react.client.reference");function At(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Zt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case re:return"Fragment";case W:return"Profiler";case Y:return"StrictMode";case je:return"Suspense";case Ee:return"SuspenseList";case dt:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Ae:return"Portal";case Me:return e.displayName||"Context";case xe:return(e._context.displayName||"Context")+".Consumer";case F:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case k:return t=e.displayName||null,t!==null?t:At(e.type)||"Memo";case Ue:t=e._payload,e=e._init;try{return At(e(t))}catch{}}return null}var mt=Array.isArray,S=j.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,q=T.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V={pending:!1,data:null,method:null,action:null},me=[],he=-1;function f(e){return{current:e}}function z(e){0>he||(e.current=me[he],me[he]=null,he--)}function H(e,t){he++,me[he]=e.current,e.current=t}var U=f(null),K=f(null),I=f(null),te=f(null);function Ve(e,t){switch(H(I,t),H(K,e),H(U,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?td(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=td(t),e=nd(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}z(U),H(U,e)}function Ce(){z(U),z(K),z(I)}function kt(e){e.memoizedState!==null&&H(te,e);var t=U.current,n=nd(t,e.type);t!==n&&(H(K,e),H(U,n))}function Yt(e){K.current===e&&(z(U),z(K)),te.current===e&&(z(te),Gl._currentValue=V)}var Ka,aa;function Ht(e){if(Ka===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ka=t&&t[1]||"",aa=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ka+e+aa}var Ja=!1;function dn(e,t){if(!e||Ja)return"";Ja=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var E=function(){throw Error()};if(Object.defineProperty(E.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(E,[])}catch(y){var v=y}Reflect.construct(e,[],E)}else{try{E.call()}catch(y){v=y}e.call(E.prototype)}}else{try{throw Error()}catch(y){v=y}(E=e())&&typeof E.catch=="function"&&E.catch(function(){})}}catch(y){if(y&&v&&typeof y.stack=="string")return[y.stack,v.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),u=i[0],o=i[1];if(u&&o){var c=u.split(`
`),g=o.split(`
`);for(l=a=0;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;for(;l<g.length&&!g[l].includes("DetermineComponentFrameRoot");)l++;if(a===c.length||l===g.length)for(a=c.length-1,l=g.length-1;1<=a&&0<=l&&c[a]!==g[l];)l--;for(;1<=a&&0<=l;a--,l--)if(c[a]!==g[l]){if(a!==1||l!==1)do if(a--,l--,0>l||c[a]!==g[l]){var x=`
`+c[a].replace(" at new "," at ");return e.displayName&&x.includes("<anonymous>")&&(x=x.replace("<anonymous>",e.displayName)),x}while(1<=a&&0<=l);break}}}finally{Ja=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Ht(n):""}function la(e,t){switch(e.tag){case 26:case 27:case 5:return Ht(e.type);case 16:return Ht("Lazy");case 13:return e.child!==t&&t!==null?Ht("Suspense Fallback"):Ht("Suspense");case 19:return Ht("SuspenseList");case 0:case 15:return dn(e.type,!1);case 11:return dn(e.type.render,!1);case 1:return dn(e.type,!0);case 31:return Ht("Activity");default:return""}}function ia(e){try{var t="",n=null;do t+=la(e,n),n=e,e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var wn=Object.prototype.hasOwnProperty,Wa=h.unstable_scheduleCallback,Fa=h.unstable_cancelCallback,Kl=h.unstable_shouldYield,Jl=h.unstable_requestPaint,Fe=h.unstable_now,Wl=h.unstable_getCurrentPriorityLevel,$a=h.unstable_ImmediatePriority,Ia=h.unstable_UserBlockingPriority,Ln=h.unstable_NormalPriority,Fl=h.unstable_LowPriority,Pa=h.unstable_IdlePriority,$l=h.log,Il=h.unstable_setDisableYieldValue,mn=null,$e=null;function Nt(e){if(typeof $l=="function"&&Il(e),$e&&typeof $e.setStrictMode=="function")try{$e.setStrictMode(mn,e)}catch{}}var Ie=Math.clz32?Math.clz32:fe,M=Math.log,ee=Math.LN2;function fe(e){return e>>>=0,e===0?32:31-(M(e)/ee|0)|0}var Pe=256,at=262144,Et=4194304;function lt(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ua(e,t,n){var a=e.pendingLanes;if(a===0)return 0;var l=0,i=e.suspendedLanes,u=e.pingedLanes;e=e.warmLanes;var o=a&134217727;return o!==0?(a=o&~i,a!==0?l=lt(a):(u&=o,u!==0?l=lt(u):n||(n=o&~e,n!==0&&(l=lt(n))))):(o=a&~i,o!==0?l=lt(o):u!==0?l=lt(u):n||(n=a&~e,n!==0&&(l=lt(n)))),l===0?0:t!==0&&t!==l&&(t&i)===0&&(i=l&-l,n=t&-t,i>=n||i===32&&(n&4194048)!==0)?t:l}function el(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Wd(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Hc(){var e=Et;return Et<<=1,(Et&62914560)===0&&(Et=4194304),e}function mu(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function tl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fd(e,t,n,a,l,i){var u=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,c=e.expirationTimes,g=e.hiddenUpdates;for(n=u&~n;0<n;){var x=31-Ie(n),E=1<<x;o[x]=0,c[x]=-1;var v=g[x];if(v!==null)for(g[x]=null,x=0;x<v.length;x++){var y=v[x];y!==null&&(y.lane&=-536870913)}n&=~E}a!==0&&Nc(e,a,0),i!==0&&l===0&&e.tag!==0&&(e.suspendedLanes|=i&~(u&~t))}function Nc(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var a=31-Ie(t);e.entangledLanes|=t,e.entanglements[a]=e.entanglements[a]|1073741824|n&261930}function Bc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-Ie(n),l=1<<a;l&t|e[a]&t&&(e[a]|=t),n&=~l}}function wc(e,t){var n=t&-t;return n=(n&42)!==0?1:hu(n),(n&(e.suspendedLanes|t))!==0?0:n}function hu(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function pu(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Lc(){var e=q.p;return e!==0?e:(e=window.event,e===void 0?32:zd(e.type))}function Yc(e,t){var n=q.p;try{return q.p=e,t()}finally{q.p=n}}var hn=Math.random().toString(36).slice(2),Ze="__reactFiber$"+hn,it="__reactProps$"+hn,oa="__reactContainer$"+hn,gu="__reactEvents$"+hn,$d="__reactListeners$"+hn,Id="__reactHandles$"+hn,Gc="__reactResources$"+hn,nl="__reactMarker$"+hn;function vu(e){delete e[Ze],delete e[it],delete e[gu],delete e[$d],delete e[Id]}function ca(e){var t=e[Ze];if(t)return t;for(var n=e.parentNode;n;){if(t=n[oa]||n[Ze]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=sd(e);e!==null;){if(n=e[Ze])return n;e=sd(e)}return t}e=n,n=e.parentNode}return null}function sa(e){if(e=e[Ze]||e[oa]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function al(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(d(33))}function ra(e){var t=e[Gc];return t||(t=e[Gc]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ge(e){e[nl]=!0}var Xc=new Set,Qc={};function Yn(e,t){fa(e,t),fa(e+"Capture",t)}function fa(e,t){for(Qc[e]=t,e=0;e<t.length;e++)Xc.add(t[e])}var Pd=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Vc={},Zc={};function em(e){return wn.call(Zc,e)?!0:wn.call(Vc,e)?!1:Pd.test(e)?Zc[e]=!0:(Vc[e]=!0,!1)}function Pl(e,t,n){if(em(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function ei(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function Kt(e,t,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+a)}}function zt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function kc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function tm(e,t,n){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(u){n=""+u,i.call(this,u)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(u){n=""+u},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function yu(e){if(!e._valueTracker){var t=kc(e)?"checked":"value";e._valueTracker=tm(e,t,""+e[t])}}function Kc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=kc(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function ti(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var nm=/[\n"\\]/g;function _t(e){return e.replace(nm,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function bu(e,t,n,a,l,i,u,o){e.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?e.type=u:e.removeAttribute("type"),t!=null?u==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+zt(t)):e.value!==""+zt(t)&&(e.value=""+zt(t)):u!=="submit"&&u!=="reset"||e.removeAttribute("value"),t!=null?xu(e,u,zt(t)):n!=null?xu(e,u,zt(n)):a!=null&&e.removeAttribute("value"),l==null&&i!=null&&(e.defaultChecked=!!i),l!=null&&(e.checked=l&&typeof l!="function"&&typeof l!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+zt(o):e.removeAttribute("name")}function Jc(e,t,n,a,l,i,u,o){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),t!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||t!=null)){yu(e);return}n=n!=null?""+zt(n):"",t=t!=null?""+zt(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=o?e.checked:!!a,e.defaultChecked=!!a,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(e.name=u),yu(e)}function xu(e,t,n){t==="number"&&ti(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function da(e,t,n,a){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&a&&(e[n].defaultSelected=!0)}else{for(n=""+zt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,a&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Wc(e,t,n){if(t!=null&&(t=""+zt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+zt(n):""}function Fc(e,t,n,a){if(t==null){if(a!=null){if(n!=null)throw Error(d(92));if(mt(a)){if(1<a.length)throw Error(d(93));a=a[0]}n=a}n==null&&(n=""),t=n}n=zt(t),e.defaultValue=n,a=e.textContent,a===n&&a!==""&&a!==null&&(e.value=a),yu(e)}function ma(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var am=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function $c(e,t,n){var a=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":a?e.setProperty(t,n):typeof n!="number"||n===0||am.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function Ic(e,t,n){if(t!=null&&typeof t!="object")throw Error(d(62));if(e=e.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var l in t)a=t[l],t.hasOwnProperty(l)&&n[l]!==a&&$c(e,l,a)}else for(var i in t)t.hasOwnProperty(i)&&$c(e,i,t[i])}function Su(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var lm=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),im=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ni(e){return im.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Jt(){}var Tu=null;function Au(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ha=null,pa=null;function Pc(e){var t=sa(e);if(t&&(e=t.stateNode)){var n=e[it]||null;e:switch(e=t.stateNode,t.type){case"input":if(bu(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+_t(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var l=a[it]||null;if(!l)throw Error(d(90));bu(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(t=0;t<n.length;t++)a=n[t],a.form===e.form&&Kc(a)}break e;case"textarea":Wc(e,n.value,n.defaultValue);break e;case"select":t=n.value,t!=null&&da(e,!!n.multiple,t,!1)}}}var Eu=!1;function es(e,t,n){if(Eu)return e(t,n);Eu=!0;try{var a=e(t);return a}finally{if(Eu=!1,(ha!==null||pa!==null)&&(Qi(),ha&&(t=ha,e=pa,pa=ha=null,Pc(t),e)))for(t=0;t<e.length;t++)Pc(e[t])}}function ll(e,t){var n=e.stateNode;if(n===null)return null;var a=n[it]||null;if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(d(231,t,typeof n));return n}var Wt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),zu=!1;if(Wt)try{var il={};Object.defineProperty(il,"passive",{get:function(){zu=!0}}),window.addEventListener("test",il,il),window.removeEventListener("test",il,il)}catch{zu=!1}var pn=null,_u=null,ai=null;function ts(){if(ai)return ai;var e,t=_u,n=t.length,a,l="value"in pn?pn.value:pn.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var u=n-e;for(a=1;a<=u&&t[n-a]===l[i-a];a++);return ai=l.slice(e,1<a?1-a:void 0)}function li(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ii(){return!0}function ns(){return!1}function ut(e){function t(n,a,l,i,u){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?ii:ns,this.isPropagationStopped=ns,this}return O(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ii)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ii)},persist:function(){},isPersistent:ii}),t}var Gn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ui=ut(Gn),ul=O({},Gn,{view:0,detail:0}),um=ut(ul),Mu,Du,ol,oi=O({},ul,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Cu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ol&&(ol&&e.type==="mousemove"?(Mu=e.screenX-ol.screenX,Du=e.screenY-ol.screenY):Du=Mu=0,ol=e),Mu)},movementY:function(e){return"movementY"in e?e.movementY:Du}}),as=ut(oi),om=O({},oi,{dataTransfer:0}),cm=ut(om),sm=O({},ul,{relatedTarget:0}),ju=ut(sm),rm=O({},Gn,{animationName:0,elapsedTime:0,pseudoElement:0}),fm=ut(rm),dm=O({},Gn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),mm=ut(dm),hm=O({},Gn,{data:0}),ls=ut(hm),pm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},vm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ym(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=vm[e])?!!t[e]:!1}function Cu(){return ym}var bm=O({},ul,{key:function(e){if(e.key){var t=pm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=li(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?gm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Cu,charCode:function(e){return e.type==="keypress"?li(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?li(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),xm=ut(bm),Sm=O({},oi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),is=ut(Sm),Tm=O({},ul,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Cu}),Am=ut(Tm),Em=O({},Gn,{propertyName:0,elapsedTime:0,pseudoElement:0}),zm=ut(Em),_m=O({},oi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Mm=ut(_m),Dm=O({},Gn,{newState:0,oldState:0}),jm=ut(Dm),Cm=[9,13,27,32],Ou=Wt&&"CompositionEvent"in window,cl=null;Wt&&"documentMode"in document&&(cl=document.documentMode);var Om=Wt&&"TextEvent"in window&&!cl,us=Wt&&(!Ou||cl&&8<cl&&11>=cl),os=" ",cs=!1;function ss(e,t){switch(e){case"keyup":return Cm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function rs(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ga=!1;function Rm(e,t){switch(e){case"compositionend":return rs(t);case"keypress":return t.which!==32?null:(cs=!0,os);case"textInput":return e=t.data,e===os&&cs?null:e;default:return null}}function Um(e,t){if(ga)return e==="compositionend"||!Ou&&ss(e,t)?(e=ts(),ai=_u=pn=null,ga=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return us&&t.locale!=="ko"?null:t.data;default:return null}}var qm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function fs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!qm[e.type]:t==="textarea"}function ds(e,t,n,a){ha?pa?pa.push(a):pa=[a]:ha=a,t=Fi(t,"onChange"),0<t.length&&(n=new ui("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var sl=null,rl=null;function Hm(e){Wf(e,0)}function ci(e){var t=al(e);if(Kc(t))return e}function ms(e,t){if(e==="change")return t}var hs=!1;if(Wt){var Ru;if(Wt){var Uu="oninput"in document;if(!Uu){var ps=document.createElement("div");ps.setAttribute("oninput","return;"),Uu=typeof ps.oninput=="function"}Ru=Uu}else Ru=!1;hs=Ru&&(!document.documentMode||9<document.documentMode)}function gs(){sl&&(sl.detachEvent("onpropertychange",vs),rl=sl=null)}function vs(e){if(e.propertyName==="value"&&ci(rl)){var t=[];ds(t,rl,e,Au(e)),es(Hm,t)}}function Nm(e,t,n){e==="focusin"?(gs(),sl=t,rl=n,sl.attachEvent("onpropertychange",vs)):e==="focusout"&&gs()}function Bm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ci(rl)}function wm(e,t){if(e==="click")return ci(t)}function Lm(e,t){if(e==="input"||e==="change")return ci(t)}function Ym(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ht=typeof Object.is=="function"?Object.is:Ym;function fl(e,t){if(ht(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!wn.call(t,l)||!ht(e[l],t[l]))return!1}return!0}function ys(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function bs(e,t){var n=ys(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ys(n)}}function xs(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?xs(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ss(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=ti(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ti(e.document)}return t}function qu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Gm=Wt&&"documentMode"in document&&11>=document.documentMode,va=null,Hu=null,dl=null,Nu=!1;function Ts(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Nu||va==null||va!==ti(a)||(a=va,"selectionStart"in a&&qu(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),dl&&fl(dl,a)||(dl=a,a=Fi(Hu,"onSelect"),0<a.length&&(t=new ui("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=va)))}function Xn(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ya={animationend:Xn("Animation","AnimationEnd"),animationiteration:Xn("Animation","AnimationIteration"),animationstart:Xn("Animation","AnimationStart"),transitionrun:Xn("Transition","TransitionRun"),transitionstart:Xn("Transition","TransitionStart"),transitioncancel:Xn("Transition","TransitionCancel"),transitionend:Xn("Transition","TransitionEnd")},Bu={},As={};Wt&&(As=document.createElement("div").style,"AnimationEvent"in window||(delete ya.animationend.animation,delete ya.animationiteration.animation,delete ya.animationstart.animation),"TransitionEvent"in window||delete ya.transitionend.transition);function Qn(e){if(Bu[e])return Bu[e];if(!ya[e])return e;var t=ya[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in As)return Bu[e]=t[n];return e}var Es=Qn("animationend"),zs=Qn("animationiteration"),_s=Qn("animationstart"),Xm=Qn("transitionrun"),Qm=Qn("transitionstart"),Vm=Qn("transitioncancel"),Ms=Qn("transitionend"),Ds=new Map,wu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");wu.push("scrollEnd");function Bt(e,t){Ds.set(e,t),Yn(t,[e])}var si=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Mt=[],ba=0,Lu=0;function ri(){for(var e=ba,t=Lu=ba=0;t<e;){var n=Mt[t];Mt[t++]=null;var a=Mt[t];Mt[t++]=null;var l=Mt[t];Mt[t++]=null;var i=Mt[t];if(Mt[t++]=null,a!==null&&l!==null){var u=a.pending;u===null?l.next=l:(l.next=u.next,u.next=l),a.pending=l}i!==0&&js(n,l,i)}}function fi(e,t,n,a){Mt[ba++]=e,Mt[ba++]=t,Mt[ba++]=n,Mt[ba++]=a,Lu|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function Yu(e,t,n,a){return fi(e,t,n,a),di(e)}function Vn(e,t){return fi(e,null,null,t),di(e)}function js(e,t,n){e.lanes|=n;var a=e.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=e.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(l=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,l&&t!==null&&(l=31-Ie(n),e=i.hiddenUpdates,a=e[l],a===null?e[l]=[t]:a.push(t),t.lane=n|536870912),i):null}function di(e){if(50<ql)throw ql=0,Fo=null,Error(d(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var xa={};function Zm(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function pt(e,t,n,a){return new Zm(e,t,n,a)}function Gu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ft(e,t){var n=e.alternate;return n===null?(n=pt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Cs(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function mi(e,t,n,a,l,i){var u=0;if(a=e,typeof e=="function")Gu(e)&&(u=1);else if(typeof e=="string")u=Fh(e,n,U.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case dt:return e=pt(31,n,t,l),e.elementType=dt,e.lanes=i,e;case re:return Zn(n.children,l,i,t);case Y:u=8,l|=24;break;case W:return e=pt(12,n,t,l|2),e.elementType=W,e.lanes=i,e;case je:return e=pt(13,n,t,l),e.elementType=je,e.lanes=i,e;case Ee:return e=pt(19,n,t,l),e.elementType=Ee,e.lanes=i,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Me:u=10;break e;case xe:u=9;break e;case F:u=11;break e;case k:u=14;break e;case Ue:u=16,a=null;break e}u=29,n=Error(d(130,e===null?"null":typeof e,"")),a=null}return t=pt(u,n,t,l),t.elementType=e,t.type=a,t.lanes=i,t}function Zn(e,t,n,a){return e=pt(7,e,a,t),e.lanes=n,e}function Xu(e,t,n){return e=pt(6,e,null,t),e.lanes=n,e}function Os(e){var t=pt(18,null,null,0);return t.stateNode=e,t}function Qu(e,t,n){return t=pt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Rs=new WeakMap;function Dt(e,t){if(typeof e=="object"&&e!==null){var n=Rs.get(e);return n!==void 0?n:(t={value:e,source:t,stack:ia(t)},Rs.set(e,t),t)}return{value:e,source:t,stack:ia(t)}}var Sa=[],Ta=0,hi=null,ml=0,jt=[],Ct=0,gn=null,Gt=1,Xt="";function $t(e,t){Sa[Ta++]=ml,Sa[Ta++]=hi,hi=e,ml=t}function Us(e,t,n){jt[Ct++]=Gt,jt[Ct++]=Xt,jt[Ct++]=gn,gn=e;var a=Gt;e=Xt;var l=32-Ie(a)-1;a&=~(1<<l),n+=1;var i=32-Ie(t)+l;if(30<i){var u=l-l%5;i=(a&(1<<u)-1).toString(32),a>>=u,l-=u,Gt=1<<32-Ie(t)+l|n<<l|a,Xt=i+e}else Gt=1<<i|n<<l|a,Xt=e}function Vu(e){e.return!==null&&($t(e,1),Us(e,1,0))}function Zu(e){for(;e===hi;)hi=Sa[--Ta],Sa[Ta]=null,ml=Sa[--Ta],Sa[Ta]=null;for(;e===gn;)gn=jt[--Ct],jt[Ct]=null,Xt=jt[--Ct],jt[Ct]=null,Gt=jt[--Ct],jt[Ct]=null}function qs(e,t){jt[Ct++]=Gt,jt[Ct++]=Xt,jt[Ct++]=gn,Gt=t.id,Xt=t.overflow,gn=e}var ke=null,ze=null,ue=!1,vn=null,Ot=!1,ku=Error(d(519));function yn(e){var t=Error(d(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw hl(Dt(t,e)),ku}function Hs(e){var t=e.stateNode,n=e.type,a=e.memoizedProps;switch(t[Ze]=e,t[it]=a,n){case"dialog":ae("cancel",t),ae("close",t);break;case"iframe":case"object":case"embed":ae("load",t);break;case"video":case"audio":for(n=0;n<Nl.length;n++)ae(Nl[n],t);break;case"source":ae("error",t);break;case"img":case"image":case"link":ae("error",t),ae("load",t);break;case"details":ae("toggle",t);break;case"input":ae("invalid",t),Jc(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":ae("invalid",t);break;case"textarea":ae("invalid",t),Fc(t,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||a.suppressHydrationWarning===!0||Pf(t.textContent,n)?(a.popover!=null&&(ae("beforetoggle",t),ae("toggle",t)),a.onScroll!=null&&ae("scroll",t),a.onScrollEnd!=null&&ae("scrollend",t),a.onClick!=null&&(t.onclick=Jt),t=!0):t=!1,t||yn(e,!0)}function Ns(e){for(ke=e.return;ke;)switch(ke.tag){case 5:case 31:case 13:Ot=!1;return;case 27:case 3:Ot=!0;return;default:ke=ke.return}}function Aa(e){if(e!==ke)return!1;if(!ue)return Ns(e),ue=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||fc(e.type,e.memoizedProps)),n=!n),n&&ze&&yn(e),Ns(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(d(317));ze=cd(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(d(317));ze=cd(e)}else t===27?(t=ze,Rn(e.type)?(e=gc,gc=null,ze=e):ze=t):ze=ke?Ut(e.stateNode.nextSibling):null;return!0}function kn(){ze=ke=null,ue=!1}function Ku(){var e=vn;return e!==null&&(rt===null?rt=e:rt.push.apply(rt,e),vn=null),e}function hl(e){vn===null?vn=[e]:vn.push(e)}var Ju=f(null),Kn=null,It=null;function bn(e,t,n){H(Ju,t._currentValue),t._currentValue=n}function Pt(e){e._currentValue=Ju.current,z(Ju)}function Wu(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function Fu(e,t,n,a){var l=e.child;for(l!==null&&(l.return=e);l!==null;){var i=l.dependencies;if(i!==null){var u=l.child;i=i.firstContext;e:for(;i!==null;){var o=i;i=l;for(var c=0;c<t.length;c++)if(o.context===t[c]){i.lanes|=n,o=i.alternate,o!==null&&(o.lanes|=n),Wu(i.return,n,e),a||(u=null);break e}i=o.next}}else if(l.tag===18){if(u=l.return,u===null)throw Error(d(341));u.lanes|=n,i=u.alternate,i!==null&&(i.lanes|=n),Wu(u,n,e),u=null}else u=l.child;if(u!==null)u.return=l;else for(u=l;u!==null;){if(u===e){u=null;break}if(l=u.sibling,l!==null){l.return=u.return,u=l;break}u=u.return}l=u}}function Ea(e,t,n,a){e=null;for(var l=t,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var u=l.alternate;if(u===null)throw Error(d(387));if(u=u.memoizedProps,u!==null){var o=l.type;ht(l.pendingProps.value,u.value)||(e!==null?e.push(o):e=[o])}}else if(l===te.current){if(u=l.alternate,u===null)throw Error(d(387));u.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(e!==null?e.push(Gl):e=[Gl])}l=l.return}e!==null&&Fu(t,e,n,a),t.flags|=262144}function pi(e){for(e=e.firstContext;e!==null;){if(!ht(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Jn(e){Kn=e,It=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ke(e){return Bs(Kn,e)}function gi(e,t){return Kn===null&&Jn(e),Bs(e,t)}function Bs(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},It===null){if(e===null)throw Error(d(308));It=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else It=It.next=t;return n}var km=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,a){e.push(a)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},Km=h.unstable_scheduleCallback,Jm=h.unstable_NormalPriority,Ne={$$typeof:Me,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function $u(){return{controller:new km,data:new Map,refCount:0}}function pl(e){e.refCount--,e.refCount===0&&Km(Jm,function(){e.controller.abort()})}var gl=null,Iu=0,za=0,_a=null;function Wm(e,t){if(gl===null){var n=gl=[];Iu=0,za=nc(),_a={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Iu++,t.then(ws,ws),t}function ws(){if(--Iu===0&&gl!==null){_a!==null&&(_a.status="fulfilled");var e=gl;gl=null,za=0,_a=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Fm(e,t){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return e.then(function(){a.status="fulfilled",a.value=t;for(var l=0;l<n.length;l++)(0,n[l])(t)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var Ls=S.S;S.S=function(e,t){Af=Fe(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&Wm(e,t),Ls!==null&&Ls(e,t)};var Wn=f(null);function Pu(){var e=Wn.current;return e!==null?e:Se.pooledCache}function vi(e,t){t===null?H(Wn,Wn.current):H(Wn,t.pool)}function Ys(){var e=Pu();return e===null?null:{parent:Ne._currentValue,pool:e}}var Ma=Error(d(460)),eo=Error(d(474)),yi=Error(d(542)),bi={then:function(){}};function Gs(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Xs(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Jt,Jt),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Vs(e),e;default:if(typeof t.status=="string")t.then(Jt,Jt);else{if(e=Se,e!==null&&100<e.shellSuspendCounter)throw Error(d(482));e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var l=t;l.status="fulfilled",l.value=a}},function(a){if(t.status==="pending"){var l=t;l.status="rejected",l.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Vs(e),e}throw $n=t,Ma}}function Fn(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?($n=n,Ma):n}}var $n=null;function Qs(){if($n===null)throw Error(d(459));var e=$n;return $n=null,e}function Vs(e){if(e===Ma||e===yi)throw Error(d(483))}var Da=null,vl=0;function xi(e){var t=vl;return vl+=1,Da===null&&(Da=[]),Xs(Da,e,t)}function yl(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Si(e,t){throw t.$$typeof===G?Error(d(525)):(e=Object.prototype.toString.call(t),Error(d(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Zs(e){function t(m,r){if(e){var p=m.deletions;p===null?(m.deletions=[r],m.flags|=16):p.push(r)}}function n(m,r){if(!e)return null;for(;r!==null;)t(m,r),r=r.sibling;return null}function a(m){for(var r=new Map;m!==null;)m.key!==null?r.set(m.key,m):r.set(m.index,m),m=m.sibling;return r}function l(m,r){return m=Ft(m,r),m.index=0,m.sibling=null,m}function i(m,r,p){return m.index=p,e?(p=m.alternate,p!==null?(p=p.index,p<r?(m.flags|=67108866,r):p):(m.flags|=67108866,r)):(m.flags|=1048576,r)}function u(m){return e&&m.alternate===null&&(m.flags|=67108866),m}function o(m,r,p,A){return r===null||r.tag!==6?(r=Xu(p,m.mode,A),r.return=m,r):(r=l(r,p),r.return=m,r)}function c(m,r,p,A){var X=p.type;return X===re?x(m,r,p.props.children,A,p.key):r!==null&&(r.elementType===X||typeof X=="object"&&X!==null&&X.$$typeof===Ue&&Fn(X)===r.type)?(r=l(r,p.props),yl(r,p),r.return=m,r):(r=mi(p.type,p.key,p.props,null,m.mode,A),yl(r,p),r.return=m,r)}function g(m,r,p,A){return r===null||r.tag!==4||r.stateNode.containerInfo!==p.containerInfo||r.stateNode.implementation!==p.implementation?(r=Qu(p,m.mode,A),r.return=m,r):(r=l(r,p.children||[]),r.return=m,r)}function x(m,r,p,A,X){return r===null||r.tag!==7?(r=Zn(p,m.mode,A,X),r.return=m,r):(r=l(r,p),r.return=m,r)}function E(m,r,p){if(typeof r=="string"&&r!==""||typeof r=="number"||typeof r=="bigint")return r=Xu(""+r,m.mode,p),r.return=m,r;if(typeof r=="object"&&r!==null){switch(r.$$typeof){case oe:return p=mi(r.type,r.key,r.props,null,m.mode,p),yl(p,r),p.return=m,p;case Ae:return r=Qu(r,m.mode,p),r.return=m,r;case Ue:return r=Fn(r),E(m,r,p)}if(mt(r)||Qe(r))return r=Zn(r,m.mode,p,null),r.return=m,r;if(typeof r.then=="function")return E(m,xi(r),p);if(r.$$typeof===Me)return E(m,gi(m,r),p);Si(m,r)}return null}function v(m,r,p,A){var X=r!==null?r.key:null;if(typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint")return X!==null?null:o(m,r,""+p,A);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case oe:return p.key===X?c(m,r,p,A):null;case Ae:return p.key===X?g(m,r,p,A):null;case Ue:return p=Fn(p),v(m,r,p,A)}if(mt(p)||Qe(p))return X!==null?null:x(m,r,p,A,null);if(typeof p.then=="function")return v(m,r,xi(p),A);if(p.$$typeof===Me)return v(m,r,gi(m,p),A);Si(m,p)}return null}function y(m,r,p,A,X){if(typeof A=="string"&&A!==""||typeof A=="number"||typeof A=="bigint")return m=m.get(p)||null,o(r,m,""+A,X);if(typeof A=="object"&&A!==null){switch(A.$$typeof){case oe:return m=m.get(A.key===null?p:A.key)||null,c(r,m,A,X);case Ae:return m=m.get(A.key===null?p:A.key)||null,g(r,m,A,X);case Ue:return A=Fn(A),y(m,r,p,A,X)}if(mt(A)||Qe(A))return m=m.get(p)||null,x(r,m,A,X,null);if(typeof A.then=="function")return y(m,r,p,xi(A),X);if(A.$$typeof===Me)return y(m,r,p,gi(r,A),X);Si(r,A)}return null}function w(m,r,p,A){for(var X=null,ce=null,L=r,P=r=0,ie=null;L!==null&&P<p.length;P++){L.index>P?(ie=L,L=null):ie=L.sibling;var se=v(m,L,p[P],A);if(se===null){L===null&&(L=ie);break}e&&L&&se.alternate===null&&t(m,L),r=i(se,r,P),ce===null?X=se:ce.sibling=se,ce=se,L=ie}if(P===p.length)return n(m,L),ue&&$t(m,P),X;if(L===null){for(;P<p.length;P++)L=E(m,p[P],A),L!==null&&(r=i(L,r,P),ce===null?X=L:ce.sibling=L,ce=L);return ue&&$t(m,P),X}for(L=a(L);P<p.length;P++)ie=y(L,m,P,p[P],A),ie!==null&&(e&&ie.alternate!==null&&L.delete(ie.key===null?P:ie.key),r=i(ie,r,P),ce===null?X=ie:ce.sibling=ie,ce=ie);return e&&L.forEach(function(Bn){return t(m,Bn)}),ue&&$t(m,P),X}function Z(m,r,p,A){if(p==null)throw Error(d(151));for(var X=null,ce=null,L=r,P=r=0,ie=null,se=p.next();L!==null&&!se.done;P++,se=p.next()){L.index>P?(ie=L,L=null):ie=L.sibling;var Bn=v(m,L,se.value,A);if(Bn===null){L===null&&(L=ie);break}e&&L&&Bn.alternate===null&&t(m,L),r=i(Bn,r,P),ce===null?X=Bn:ce.sibling=Bn,ce=Bn,L=ie}if(se.done)return n(m,L),ue&&$t(m,P),X;if(L===null){for(;!se.done;P++,se=p.next())se=E(m,se.value,A),se!==null&&(r=i(se,r,P),ce===null?X=se:ce.sibling=se,ce=se);return ue&&$t(m,P),X}for(L=a(L);!se.done;P++,se=p.next())se=y(L,m,P,se.value,A),se!==null&&(e&&se.alternate!==null&&L.delete(se.key===null?P:se.key),r=i(se,r,P),ce===null?X=se:ce.sibling=se,ce=se);return e&&L.forEach(function(op){return t(m,op)}),ue&&$t(m,P),X}function be(m,r,p,A){if(typeof p=="object"&&p!==null&&p.type===re&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case oe:e:{for(var X=p.key;r!==null;){if(r.key===X){if(X=p.type,X===re){if(r.tag===7){n(m,r.sibling),A=l(r,p.props.children),A.return=m,m=A;break e}}else if(r.elementType===X||typeof X=="object"&&X!==null&&X.$$typeof===Ue&&Fn(X)===r.type){n(m,r.sibling),A=l(r,p.props),yl(A,p),A.return=m,m=A;break e}n(m,r);break}else t(m,r);r=r.sibling}p.type===re?(A=Zn(p.props.children,m.mode,A,p.key),A.return=m,m=A):(A=mi(p.type,p.key,p.props,null,m.mode,A),yl(A,p),A.return=m,m=A)}return u(m);case Ae:e:{for(X=p.key;r!==null;){if(r.key===X)if(r.tag===4&&r.stateNode.containerInfo===p.containerInfo&&r.stateNode.implementation===p.implementation){n(m,r.sibling),A=l(r,p.children||[]),A.return=m,m=A;break e}else{n(m,r);break}else t(m,r);r=r.sibling}A=Qu(p,m.mode,A),A.return=m,m=A}return u(m);case Ue:return p=Fn(p),be(m,r,p,A)}if(mt(p))return w(m,r,p,A);if(Qe(p)){if(X=Qe(p),typeof X!="function")throw Error(d(150));return p=X.call(p),Z(m,r,p,A)}if(typeof p.then=="function")return be(m,r,xi(p),A);if(p.$$typeof===Me)return be(m,r,gi(m,p),A);Si(m,p)}return typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint"?(p=""+p,r!==null&&r.tag===6?(n(m,r.sibling),A=l(r,p),A.return=m,m=A):(n(m,r),A=Xu(p,m.mode,A),A.return=m,m=A),u(m)):n(m,r)}return function(m,r,p,A){try{vl=0;var X=be(m,r,p,A);return Da=null,X}catch(L){if(L===Ma||L===yi)throw L;var ce=pt(29,L,null,m.mode);return ce.lanes=A,ce.return=m,ce}finally{}}}var In=Zs(!0),ks=Zs(!1),xn=!1;function to(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function no(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Sn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Tn(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,(de&2)!==0){var l=a.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),a.pending=t,t=di(e),js(e,null,n),t}return fi(e,a,t,n),di(e)}function bl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,Bc(e,n)}}function ao(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var u={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=u:i=i.next=u,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var lo=!1;function xl(){if(lo){var e=_a;if(e!==null)throw e}}function Sl(e,t,n,a){lo=!1;var l=e.updateQueue;xn=!1;var i=l.firstBaseUpdate,u=l.lastBaseUpdate,o=l.shared.pending;if(o!==null){l.shared.pending=null;var c=o,g=c.next;c.next=null,u===null?i=g:u.next=g,u=c;var x=e.alternate;x!==null&&(x=x.updateQueue,o=x.lastBaseUpdate,o!==u&&(o===null?x.firstBaseUpdate=g:o.next=g,x.lastBaseUpdate=c))}if(i!==null){var E=l.baseState;u=0,x=g=c=null,o=i;do{var v=o.lane&-536870913,y=v!==o.lane;if(y?(le&v)===v:(a&v)===v){v!==0&&v===za&&(lo=!0),x!==null&&(x=x.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var w=e,Z=o;v=t;var be=n;switch(Z.tag){case 1:if(w=Z.payload,typeof w=="function"){E=w.call(be,E,v);break e}E=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=Z.payload,v=typeof w=="function"?w.call(be,E,v):w,v==null)break e;E=O({},E,v);break e;case 2:xn=!0}}v=o.callback,v!==null&&(e.flags|=64,y&&(e.flags|=8192),y=l.callbacks,y===null?l.callbacks=[v]:y.push(v))}else y={lane:v,tag:o.tag,payload:o.payload,callback:o.callback,next:null},x===null?(g=x=y,c=E):x=x.next=y,u|=v;if(o=o.next,o===null){if(o=l.shared.pending,o===null)break;y=o,o=y.next,y.next=null,l.lastBaseUpdate=y,l.shared.pending=null}}while(!0);x===null&&(c=E),l.baseState=c,l.firstBaseUpdate=g,l.lastBaseUpdate=x,i===null&&(l.shared.lanes=0),Mn|=u,e.lanes=u,e.memoizedState=E}}function Ks(e,t){if(typeof e!="function")throw Error(d(191,e));e.call(t)}function Js(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ks(n[e],t)}var ja=f(null),Ti=f(0);function Ws(e,t){e=sn,H(Ti,e),H(ja,t),sn=e|t.baseLanes}function io(){H(Ti,sn),H(ja,ja.current)}function uo(){sn=Ti.current,z(ja),z(Ti)}var gt=f(null),Rt=null;function An(e){var t=e.alternate;H(qe,qe.current&1),H(gt,e),Rt===null&&(t===null||ja.current!==null||t.memoizedState!==null)&&(Rt=e)}function oo(e){H(qe,qe.current),H(gt,e),Rt===null&&(Rt=e)}function Fs(e){e.tag===22?(H(qe,qe.current),H(gt,e),Rt===null&&(Rt=e)):En()}function En(){H(qe,qe.current),H(gt,gt.current)}function vt(e){z(gt),Rt===e&&(Rt=null),z(qe)}var qe=f(0);function Ai(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||hc(n)||pc(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var en=0,$=null,ve=null,Be=null,Ei=!1,Ca=!1,Pn=!1,zi=0,Tl=0,Oa=null,$m=0;function Oe(){throw Error(d(321))}function co(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ht(e[n],t[n]))return!1;return!0}function so(e,t,n,a,l,i){return en=i,$=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,S.H=e===null||e.memoizedState===null?Ur:zo,Pn=!1,i=n(a,l),Pn=!1,Ca&&(i=Is(t,n,a,l)),$s(e),i}function $s(e){S.H=zl;var t=ve!==null&&ve.next!==null;if(en=0,Be=ve=$=null,Ei=!1,Tl=0,Oa=null,t)throw Error(d(300));e===null||we||(e=e.dependencies,e!==null&&pi(e)&&(we=!0))}function Is(e,t,n,a){$=e;var l=0;do{if(Ca&&(Oa=null),Tl=0,Ca=!1,25<=l)throw Error(d(301));if(l+=1,Be=ve=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}S.H=qr,i=t(n,a)}while(Ca);return i}function Im(){var e=S.H,t=e.useState()[0];return t=typeof t.then=="function"?Al(t):t,e=e.useState()[0],(ve!==null?ve.memoizedState:null)!==e&&($.flags|=1024),t}function ro(){var e=zi!==0;return zi=0,e}function fo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function mo(e){if(Ei){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ei=!1}en=0,Be=ve=$=null,Ca=!1,Tl=zi=0,Oa=null}function tt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Be===null?$.memoizedState=Be=e:Be=Be.next=e,Be}function He(){if(ve===null){var e=$.alternate;e=e!==null?e.memoizedState:null}else e=ve.next;var t=Be===null?$.memoizedState:Be.next;if(t!==null)Be=t,ve=e;else{if(e===null)throw $.alternate===null?Error(d(467)):Error(d(310));ve=e,e={memoizedState:ve.memoizedState,baseState:ve.baseState,baseQueue:ve.baseQueue,queue:ve.queue,next:null},Be===null?$.memoizedState=Be=e:Be=Be.next=e}return Be}function _i(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Al(e){var t=Tl;return Tl+=1,Oa===null&&(Oa=[]),e=Xs(Oa,e,t),t=$,(Be===null?t.memoizedState:Be.next)===null&&(t=t.alternate,S.H=t===null||t.memoizedState===null?Ur:zo),e}function Mi(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Al(e);if(e.$$typeof===Me)return Ke(e)}throw Error(d(438,String(e)))}function ho(e){var t=null,n=$.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var a=$.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(l){return l.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=_i(),$.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),a=0;a<e;a++)n[a]=nt;return t.index++,n}function tn(e,t){return typeof t=="function"?t(e):t}function Di(e){var t=He();return po(t,ve,e)}function po(e,t,n){var a=e.queue;if(a===null)throw Error(d(311));a.lastRenderedReducer=n;var l=e.baseQueue,i=a.pending;if(i!==null){if(l!==null){var u=l.next;l.next=i.next,i.next=u}t.baseQueue=l=i,a.pending=null}if(i=e.baseState,l===null)e.memoizedState=i;else{t=l.next;var o=u=null,c=null,g=t,x=!1;do{var E=g.lane&-536870913;if(E!==g.lane?(le&E)===E:(en&E)===E){var v=g.revertLane;if(v===0)c!==null&&(c=c.next={lane:0,revertLane:0,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null}),E===za&&(x=!0);else if((en&v)===v){g=g.next,v===za&&(x=!0);continue}else E={lane:0,revertLane:g.revertLane,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},c===null?(o=c=E,u=i):c=c.next=E,$.lanes|=v,Mn|=v;E=g.action,Pn&&n(i,E),i=g.hasEagerState?g.eagerState:n(i,E)}else v={lane:E,revertLane:g.revertLane,gesture:g.gesture,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},c===null?(o=c=v,u=i):c=c.next=v,$.lanes|=E,Mn|=E;g=g.next}while(g!==null&&g!==t);if(c===null?u=i:c.next=o,!ht(i,e.memoizedState)&&(we=!0,x&&(n=_a,n!==null)))throw n;e.memoizedState=i,e.baseState=u,e.baseQueue=c,a.lastRenderedState=i}return l===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function go(e){var t=He(),n=t.queue;if(n===null)throw Error(d(311));n.lastRenderedReducer=e;var a=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var u=l=l.next;do i=e(i,u.action),u=u.next;while(u!==l);ht(i,t.memoizedState)||(we=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,a]}function Ps(e,t,n){var a=$,l=He(),i=ue;if(i){if(n===void 0)throw Error(d(407));n=n()}else n=t();var u=!ht((ve||l).memoizedState,n);if(u&&(l.memoizedState=n,we=!0),l=l.queue,bo(nr.bind(null,a,l,e),[e]),l.getSnapshot!==t||u||Be!==null&&Be.memoizedState.tag&1){if(a.flags|=2048,Ra(9,{destroy:void 0},tr.bind(null,a,l,n,t),null),Se===null)throw Error(d(349));i||(en&127)!==0||er(a,t,n)}return n}function er(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=$.updateQueue,t===null?(t=_i(),$.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function tr(e,t,n,a){t.value=n,t.getSnapshot=a,ar(t)&&lr(e)}function nr(e,t,n){return n(function(){ar(t)&&lr(e)})}function ar(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ht(e,n)}catch{return!0}}function lr(e){var t=Vn(e,2);t!==null&&ft(t,e,2)}function vo(e){var t=tt();if(typeof e=="function"){var n=e;if(e=n(),Pn){Nt(!0);try{n()}finally{Nt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:tn,lastRenderedState:e},t}function ir(e,t,n,a){return e.baseState=n,po(e,ve,typeof a=="function"?a:tn)}function Pm(e,t,n,a,l){if(Oi(e))throw Error(d(485));if(e=t.action,e!==null){var i={payload:l,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){i.listeners.push(u)}};S.T!==null?n(!0):i.isTransition=!1,a(i),n=t.pending,n===null?(i.next=t.pending=i,ur(t,i)):(i.next=n.next,t.pending=n.next=i)}}function ur(e,t){var n=t.action,a=t.payload,l=e.state;if(t.isTransition){var i=S.T,u={};S.T=u;try{var o=n(l,a),c=S.S;c!==null&&c(u,o),or(e,t,o)}catch(g){yo(e,t,g)}finally{i!==null&&u.types!==null&&(i.types=u.types),S.T=i}}else try{i=n(l,a),or(e,t,i)}catch(g){yo(e,t,g)}}function or(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){cr(e,t,a)},function(a){return yo(e,t,a)}):cr(e,t,n)}function cr(e,t,n){t.status="fulfilled",t.value=n,sr(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,ur(e,n)))}function yo(e,t,n){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=n,sr(t),t=t.next;while(t!==a)}e.action=null}function sr(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function rr(e,t){return t}function fr(e,t){if(ue){var n=Se.formState;if(n!==null){e:{var a=$;if(ue){if(ze){t:{for(var l=ze,i=Ot;l.nodeType!==8;){if(!i){l=null;break t}if(l=Ut(l.nextSibling),l===null){l=null;break t}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){ze=Ut(l.nextSibling),a=l.data==="F!";break e}}yn(a)}a=!1}a&&(t=n[0])}}return n=tt(),n.memoizedState=n.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:rr,lastRenderedState:t},n.queue=a,n=Cr.bind(null,$,a),a.dispatch=n,a=vo(!1),i=Eo.bind(null,$,!1,a.queue),a=tt(),l={state:t,dispatch:null,action:e,pending:null},a.queue=l,n=Pm.bind(null,$,l,i,n),l.dispatch=n,a.memoizedState=e,[t,n,!1]}function dr(e){var t=He();return mr(t,ve,e)}function mr(e,t,n){if(t=po(e,t,rr)[0],e=Di(tn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=Al(t)}catch(u){throw u===Ma?yi:u}else a=t;t=He();var l=t.queue,i=l.dispatch;return n!==t.memoizedState&&($.flags|=2048,Ra(9,{destroy:void 0},eh.bind(null,l,n),null)),[a,i,e]}function eh(e,t){e.action=t}function hr(e){var t=He(),n=ve;if(n!==null)return mr(t,n,e);He(),t=t.memoizedState,n=He();var a=n.queue.dispatch;return n.memoizedState=e,[t,a,!1]}function Ra(e,t,n,a){return e={tag:e,create:n,deps:a,inst:t,next:null},t=$.updateQueue,t===null&&(t=_i(),$.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e),e}function pr(){return He().memoizedState}function ji(e,t,n,a){var l=tt();$.flags|=e,l.memoizedState=Ra(1|t,{destroy:void 0},n,a===void 0?null:a)}function Ci(e,t,n,a){var l=He();a=a===void 0?null:a;var i=l.memoizedState.inst;ve!==null&&a!==null&&co(a,ve.memoizedState.deps)?l.memoizedState=Ra(t,i,n,a):($.flags|=e,l.memoizedState=Ra(1|t,i,n,a))}function gr(e,t){ji(8390656,8,e,t)}function bo(e,t){Ci(2048,8,e,t)}function th(e){$.flags|=4;var t=$.updateQueue;if(t===null)t=_i(),$.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function vr(e){var t=He().memoizedState;return th({ref:t,nextImpl:e}),function(){if((de&2)!==0)throw Error(d(440));return t.impl.apply(void 0,arguments)}}function yr(e,t){return Ci(4,2,e,t)}function br(e,t){return Ci(4,4,e,t)}function xr(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Sr(e,t,n){n=n!=null?n.concat([e]):null,Ci(4,4,xr.bind(null,t,e),n)}function xo(){}function Tr(e,t){var n=He();t=t===void 0?null:t;var a=n.memoizedState;return t!==null&&co(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function Ar(e,t){var n=He();t=t===void 0?null:t;var a=n.memoizedState;if(t!==null&&co(t,a[1]))return a[0];if(a=e(),Pn){Nt(!0);try{e()}finally{Nt(!1)}}return n.memoizedState=[a,t],a}function So(e,t,n){return n===void 0||(en&1073741824)!==0&&(le&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=zf(),$.lanes|=e,Mn|=e,n)}function Er(e,t,n,a){return ht(n,t)?n:ja.current!==null?(e=So(e,n,a),ht(e,t)||(we=!0),e):(en&42)===0||(en&1073741824)!==0&&(le&261930)===0?(we=!0,e.memoizedState=n):(e=zf(),$.lanes|=e,Mn|=e,t)}function zr(e,t,n,a,l){var i=q.p;q.p=i!==0&&8>i?i:8;var u=S.T,o={};S.T=o,Eo(e,!1,t,n);try{var c=l(),g=S.S;if(g!==null&&g(o,c),c!==null&&typeof c=="object"&&typeof c.then=="function"){var x=Fm(c,a);El(e,t,x,xt(e))}else El(e,t,a,xt(e))}catch(E){El(e,t,{then:function(){},status:"rejected",reason:E},xt())}finally{q.p=i,u!==null&&o.types!==null&&(u.types=o.types),S.T=u}}function nh(){}function To(e,t,n,a){if(e.tag!==5)throw Error(d(476));var l=_r(e).queue;zr(e,l,t,V,n===null?nh:function(){return Mr(e),n(a)})}function _r(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:V,baseState:V,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:tn,lastRenderedState:V},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:tn,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Mr(e){var t=_r(e);t.next===null&&(t=e.alternate.memoizedState),El(e,t.next.queue,{},xt())}function Ao(){return Ke(Gl)}function Dr(){return He().memoizedState}function jr(){return He().memoizedState}function ah(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=xt();e=Sn(n);var a=Tn(t,e,n);a!==null&&(ft(a,t,n),bl(a,t,n)),t={cache:$u()},e.payload=t;return}t=t.return}}function lh(e,t,n){var a=xt();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Oi(e)?Or(t,n):(n=Yu(e,t,n,a),n!==null&&(ft(n,e,a),Rr(n,t,a)))}function Cr(e,t,n){var a=xt();El(e,t,n,a)}function El(e,t,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Oi(e))Or(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var u=t.lastRenderedState,o=i(u,n);if(l.hasEagerState=!0,l.eagerState=o,ht(o,u))return fi(e,t,l,0),Se===null&&ri(),!1}catch{}finally{}if(n=Yu(e,t,l,a),n!==null)return ft(n,e,a),Rr(n,t,a),!0}return!1}function Eo(e,t,n,a){if(a={lane:2,revertLane:nc(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Oi(e)){if(t)throw Error(d(479))}else t=Yu(e,n,a,2),t!==null&&ft(t,e,2)}function Oi(e){var t=e.alternate;return e===$||t!==null&&t===$}function Or(e,t){Ca=Ei=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Rr(e,t,n){if((n&4194048)!==0){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,Bc(e,n)}}var zl={readContext:Ke,use:Mi,useCallback:Oe,useContext:Oe,useEffect:Oe,useImperativeHandle:Oe,useLayoutEffect:Oe,useInsertionEffect:Oe,useMemo:Oe,useReducer:Oe,useRef:Oe,useState:Oe,useDebugValue:Oe,useDeferredValue:Oe,useTransition:Oe,useSyncExternalStore:Oe,useId:Oe,useHostTransitionStatus:Oe,useFormState:Oe,useActionState:Oe,useOptimistic:Oe,useMemoCache:Oe,useCacheRefresh:Oe};zl.useEffectEvent=Oe;var Ur={readContext:Ke,use:Mi,useCallback:function(e,t){return tt().memoizedState=[e,t===void 0?null:t],e},useContext:Ke,useEffect:gr,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,ji(4194308,4,xr.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ji(4194308,4,e,t)},useInsertionEffect:function(e,t){ji(4,2,e,t)},useMemo:function(e,t){var n=tt();t=t===void 0?null:t;var a=e();if(Pn){Nt(!0);try{e()}finally{Nt(!1)}}return n.memoizedState=[a,t],a},useReducer:function(e,t,n){var a=tt();if(n!==void 0){var l=n(t);if(Pn){Nt(!0);try{n(t)}finally{Nt(!1)}}}else l=t;return a.memoizedState=a.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},a.queue=e,e=e.dispatch=lh.bind(null,$,e),[a.memoizedState,e]},useRef:function(e){var t=tt();return e={current:e},t.memoizedState=e},useState:function(e){e=vo(e);var t=e.queue,n=Cr.bind(null,$,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:xo,useDeferredValue:function(e,t){var n=tt();return So(n,e,t)},useTransition:function(){var e=vo(!1);return e=zr.bind(null,$,e.queue,!0,!1),tt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var a=$,l=tt();if(ue){if(n===void 0)throw Error(d(407));n=n()}else{if(n=t(),Se===null)throw Error(d(349));(le&127)!==0||er(a,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,gr(nr.bind(null,a,i,e),[e]),a.flags|=2048,Ra(9,{destroy:void 0},tr.bind(null,a,i,n,t),null),n},useId:function(){var e=tt(),t=Se.identifierPrefix;if(ue){var n=Xt,a=Gt;n=(a&~(1<<32-Ie(a)-1)).toString(32)+n,t="_"+t+"R_"+n,n=zi++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=$m++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Ao,useFormState:fr,useActionState:fr,useOptimistic:function(e){var t=tt();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Eo.bind(null,$,!0,n),n.dispatch=t,[e,t]},useMemoCache:ho,useCacheRefresh:function(){return tt().memoizedState=ah.bind(null,$)},useEffectEvent:function(e){var t=tt(),n={impl:e};return t.memoizedState=n,function(){if((de&2)!==0)throw Error(d(440));return n.impl.apply(void 0,arguments)}}},zo={readContext:Ke,use:Mi,useCallback:Tr,useContext:Ke,useEffect:bo,useImperativeHandle:Sr,useInsertionEffect:yr,useLayoutEffect:br,useMemo:Ar,useReducer:Di,useRef:pr,useState:function(){return Di(tn)},useDebugValue:xo,useDeferredValue:function(e,t){var n=He();return Er(n,ve.memoizedState,e,t)},useTransition:function(){var e=Di(tn)[0],t=He().memoizedState;return[typeof e=="boolean"?e:Al(e),t]},useSyncExternalStore:Ps,useId:Dr,useHostTransitionStatus:Ao,useFormState:dr,useActionState:dr,useOptimistic:function(e,t){var n=He();return ir(n,ve,e,t)},useMemoCache:ho,useCacheRefresh:jr};zo.useEffectEvent=vr;var qr={readContext:Ke,use:Mi,useCallback:Tr,useContext:Ke,useEffect:bo,useImperativeHandle:Sr,useInsertionEffect:yr,useLayoutEffect:br,useMemo:Ar,useReducer:go,useRef:pr,useState:function(){return go(tn)},useDebugValue:xo,useDeferredValue:function(e,t){var n=He();return ve===null?So(n,e,t):Er(n,ve.memoizedState,e,t)},useTransition:function(){var e=go(tn)[0],t=He().memoizedState;return[typeof e=="boolean"?e:Al(e),t]},useSyncExternalStore:Ps,useId:Dr,useHostTransitionStatus:Ao,useFormState:hr,useActionState:hr,useOptimistic:function(e,t){var n=He();return ve!==null?ir(n,ve,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:ho,useCacheRefresh:jr};qr.useEffectEvent=vr;function _o(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:O({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Mo={enqueueSetState:function(e,t,n){e=e._reactInternals;var a=xt(),l=Sn(a);l.payload=t,n!=null&&(l.callback=n),t=Tn(e,l,a),t!==null&&(ft(t,e,a),bl(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=xt(),l=Sn(a);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=Tn(e,l,a),t!==null&&(ft(t,e,a),bl(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=xt(),a=Sn(n);a.tag=2,t!=null&&(a.callback=t),t=Tn(e,a,n),t!==null&&(ft(t,e,n),bl(t,e,n))}};function Hr(e,t,n,a,l,i,u){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,i,u):t.prototype&&t.prototype.isPureReactComponent?!fl(n,a)||!fl(l,i):!0}function Nr(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&Mo.enqueueReplaceState(t,t.state,null)}function ea(e,t){var n=t;if("ref"in t){n={};for(var a in t)a!=="ref"&&(n[a]=t[a])}if(e=e.defaultProps){n===t&&(n=O({},n));for(var l in e)n[l]===void 0&&(n[l]=e[l])}return n}function Br(e){si(e)}function wr(e){console.error(e)}function Lr(e){si(e)}function Ri(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function Yr(e,t,n){try{var a=e.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Do(e,t,n){return n=Sn(n),n.tag=3,n.payload={element:null},n.callback=function(){Ri(e,t)},n}function Gr(e){return e=Sn(e),e.tag=3,e}function Xr(e,t,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;e.payload=function(){return l(i)},e.callback=function(){Yr(t,n,a)}}var u=n.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(e.callback=function(){Yr(t,n,a),typeof l!="function"&&(Dn===null?Dn=new Set([this]):Dn.add(this));var o=a.stack;this.componentDidCatch(a.value,{componentStack:o!==null?o:""})})}function ih(e,t,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=n.alternate,t!==null&&Ea(t,n,l,!0),n=gt.current,n!==null){switch(n.tag){case 31:case 13:return Rt===null?Vi():n.alternate===null&&Re===0&&(Re=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===bi?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([a]):t.add(a),Po(e,a,l)),!1;case 22:return n.flags|=65536,a===bi?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([a]):n.add(a)),Po(e,a,l)),!1}throw Error(d(435,n.tag))}return Po(e,a,l),Vi(),!1}if(ue)return t=gt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=l,a!==ku&&(e=Error(d(422),{cause:a}),hl(Dt(e,n)))):(a!==ku&&(t=Error(d(423),{cause:a}),hl(Dt(t,n))),e=e.current.alternate,e.flags|=65536,l&=-l,e.lanes|=l,a=Dt(a,n),l=Do(e.stateNode,a,l),ao(e,l),Re!==4&&(Re=2)),!1;var i=Error(d(520),{cause:a});if(i=Dt(i,n),Ul===null?Ul=[i]:Ul.push(i),Re!==4&&(Re=2),t===null)return!0;a=Dt(a,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=l&-l,n.lanes|=e,e=Do(n.stateNode,a,e),ao(n,e),!1;case 1:if(t=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(Dn===null||!Dn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=Gr(l),Xr(l,e,n,a),ao(n,l),!1}n=n.return}while(n!==null);return!1}var jo=Error(d(461)),we=!1;function Je(e,t,n,a){t.child=e===null?ks(t,null,n,a):In(t,e.child,n,a)}function Qr(e,t,n,a,l){n=n.render;var i=t.ref;if("ref"in a){var u={};for(var o in a)o!=="ref"&&(u[o]=a[o])}else u=a;return Jn(t),a=so(e,t,n,u,i,l),o=ro(),e!==null&&!we?(fo(e,t,l),nn(e,t,l)):(ue&&o&&Vu(t),t.flags|=1,Je(e,t,a,l),t.child)}function Vr(e,t,n,a,l){if(e===null){var i=n.type;return typeof i=="function"&&!Gu(i)&&i.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=i,Zr(e,t,i,a,l)):(e=mi(n.type,null,a,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!Bo(e,l)){var u=i.memoizedProps;if(n=n.compare,n=n!==null?n:fl,n(u,a)&&e.ref===t.ref)return nn(e,t,l)}return t.flags|=1,e=Ft(i,a),e.ref=t.ref,e.return=t,t.child=e}function Zr(e,t,n,a,l){if(e!==null){var i=e.memoizedProps;if(fl(i,a)&&e.ref===t.ref)if(we=!1,t.pendingProps=a=i,Bo(e,l))(e.flags&131072)!==0&&(we=!0);else return t.lanes=e.lanes,nn(e,t,l)}return Co(e,t,n,a,l)}function kr(e,t,n,a){var l=a.children,i=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((t.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,e!==null){for(a=t.child=e.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,t.child=null;return Kr(e,t,i,n,a)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&vi(t,i!==null?i.cachePool:null),i!==null?Ws(t,i):io(),Fs(t);else return a=t.lanes=536870912,Kr(e,t,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(vi(t,i.cachePool),Ws(t,i),En(),t.memoizedState=null):(e!==null&&vi(t,null),io(),En());return Je(e,t,l,n),t.child}function _l(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Kr(e,t,n,a,l){var i=Pu();return i=i===null?null:{parent:Ne._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},e!==null&&vi(t,null),io(),Fs(t),e!==null&&Ea(e,t,a,!0),t.childLanes=l,null}function Ui(e,t){return t=Hi({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Jr(e,t,n){return In(t,e.child,null,n),e=Ui(t,t.pendingProps),e.flags|=2,vt(t),t.memoizedState=null,e}function uh(e,t,n){var a=t.pendingProps,l=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(ue){if(a.mode==="hidden")return e=Ui(t,a),t.lanes=536870912,_l(null,e);if(oo(t),(e=ze)?(e=od(e,Ot),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:gn!==null?{id:Gt,overflow:Xt}:null,retryLane:536870912,hydrationErrors:null},n=Os(e),n.return=t,t.child=n,ke=t,ze=null)):e=null,e===null)throw yn(t);return t.lanes=536870912,null}return Ui(t,a)}var i=e.memoizedState;if(i!==null){var u=i.dehydrated;if(oo(t),l)if(t.flags&256)t.flags&=-257,t=Jr(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(d(558));else if(we||Ea(e,t,n,!1),l=(n&e.childLanes)!==0,we||l){if(a=Se,a!==null&&(u=wc(a,n),u!==0&&u!==i.retryLane))throw i.retryLane=u,Vn(e,u),ft(a,e,u),jo;Vi(),t=Jr(e,t,n)}else e=i.treeContext,ze=Ut(u.nextSibling),ke=t,ue=!0,vn=null,Ot=!1,e!==null&&qs(t,e),t=Ui(t,a),t.flags|=4096;return t}return e=Ft(e.child,{mode:a.mode,children:a.children}),e.ref=t.ref,t.child=e,e.return=t,e}function qi(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(d(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Co(e,t,n,a,l){return Jn(t),n=so(e,t,n,a,void 0,l),a=ro(),e!==null&&!we?(fo(e,t,l),nn(e,t,l)):(ue&&a&&Vu(t),t.flags|=1,Je(e,t,n,l),t.child)}function Wr(e,t,n,a,l,i){return Jn(t),t.updateQueue=null,n=Is(t,a,n,l),$s(e),a=ro(),e!==null&&!we?(fo(e,t,i),nn(e,t,i)):(ue&&a&&Vu(t),t.flags|=1,Je(e,t,n,i),t.child)}function Fr(e,t,n,a,l){if(Jn(t),t.stateNode===null){var i=xa,u=n.contextType;typeof u=="object"&&u!==null&&(i=Ke(u)),i=new n(a,i),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Mo,t.stateNode=i,i._reactInternals=t,i=t.stateNode,i.props=a,i.state=t.memoizedState,i.refs={},to(t),u=n.contextType,i.context=typeof u=="object"&&u!==null?Ke(u):xa,i.state=t.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(_o(t,n,u,a),i.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(u=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),u!==i.state&&Mo.enqueueReplaceState(i,i.state,null),Sl(t,a,i,l),xl(),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(e===null){i=t.stateNode;var o=t.memoizedProps,c=ea(n,o);i.props=c;var g=i.context,x=n.contextType;u=xa,typeof x=="object"&&x!==null&&(u=Ke(x));var E=n.getDerivedStateFromProps;x=typeof E=="function"||typeof i.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,x||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o||g!==u)&&Nr(t,i,a,u),xn=!1;var v=t.memoizedState;i.state=v,Sl(t,a,i,l),xl(),g=t.memoizedState,o||v!==g||xn?(typeof E=="function"&&(_o(t,n,E,a),g=t.memoizedState),(c=xn||Hr(t,n,c,a,v,g,u))?(x||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=g),i.props=a,i.state=g,i.context=u,a=c):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,no(e,t),u=t.memoizedProps,x=ea(n,u),i.props=x,E=t.pendingProps,v=i.context,g=n.contextType,c=xa,typeof g=="object"&&g!==null&&(c=Ke(g)),o=n.getDerivedStateFromProps,(g=typeof o=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==E||v!==c)&&Nr(t,i,a,c),xn=!1,v=t.memoizedState,i.state=v,Sl(t,a,i,l),xl();var y=t.memoizedState;u!==E||v!==y||xn||e!==null&&e.dependencies!==null&&pi(e.dependencies)?(typeof o=="function"&&(_o(t,n,o,a),y=t.memoizedState),(x=xn||Hr(t,n,x,a,v,y,c)||e!==null&&e.dependencies!==null&&pi(e.dependencies))?(g||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,y,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,y,c)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=y),i.props=a,i.state=y,i.context=c,a=x):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),a=!1)}return i=a,qi(e,t),a=(t.flags&128)!==0,i||a?(i=t.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),t.flags|=1,e!==null&&a?(t.child=In(t,e.child,null,l),t.child=In(t,null,n,l)):Je(e,t,n,l),t.memoizedState=i.state,e=t.child):e=nn(e,t,l),e}function $r(e,t,n,a){return kn(),t.flags|=256,Je(e,t,n,a),t.child}var Oo={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ro(e){return{baseLanes:e,cachePool:Ys()}}function Uo(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=bt),e}function Ir(e,t,n){var a=t.pendingProps,l=!1,i=(t.flags&128)!==0,u;if((u=i)||(u=e!==null&&e.memoizedState===null?!1:(qe.current&2)!==0),u&&(l=!0,t.flags&=-129),u=(t.flags&32)!==0,t.flags&=-33,e===null){if(ue){if(l?An(t):En(),(e=ze)?(e=od(e,Ot),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:gn!==null?{id:Gt,overflow:Xt}:null,retryLane:536870912,hydrationErrors:null},n=Os(e),n.return=t,t.child=n,ke=t,ze=null)):e=null,e===null)throw yn(t);return pc(e)?t.lanes=32:t.lanes=536870912,null}var o=a.children;return a=a.fallback,l?(En(),l=t.mode,o=Hi({mode:"hidden",children:o},l),a=Zn(a,l,n,null),o.return=t,a.return=t,o.sibling=a,t.child=o,a=t.child,a.memoizedState=Ro(n),a.childLanes=Uo(e,u,n),t.memoizedState=Oo,_l(null,a)):(An(t),qo(t,o))}var c=e.memoizedState;if(c!==null&&(o=c.dehydrated,o!==null)){if(i)t.flags&256?(An(t),t.flags&=-257,t=Ho(e,t,n)):t.memoizedState!==null?(En(),t.child=e.child,t.flags|=128,t=null):(En(),o=a.fallback,l=t.mode,a=Hi({mode:"visible",children:a.children},l),o=Zn(o,l,n,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,In(t,e.child,null,n),a=t.child,a.memoizedState=Ro(n),a.childLanes=Uo(e,u,n),t.memoizedState=Oo,t=_l(null,a));else if(An(t),pc(o)){if(u=o.nextSibling&&o.nextSibling.dataset,u)var g=u.dgst;u=g,a=Error(d(419)),a.stack="",a.digest=u,hl({value:a,source:null,stack:null}),t=Ho(e,t,n)}else if(we||Ea(e,t,n,!1),u=(n&e.childLanes)!==0,we||u){if(u=Se,u!==null&&(a=wc(u,n),a!==0&&a!==c.retryLane))throw c.retryLane=a,Vn(e,a),ft(u,e,a),jo;hc(o)||Vi(),t=Ho(e,t,n)}else hc(o)?(t.flags|=192,t.child=e.child,t=null):(e=c.treeContext,ze=Ut(o.nextSibling),ke=t,ue=!0,vn=null,Ot=!1,e!==null&&qs(t,e),t=qo(t,a.children),t.flags|=4096);return t}return l?(En(),o=a.fallback,l=t.mode,c=e.child,g=c.sibling,a=Ft(c,{mode:"hidden",children:a.children}),a.subtreeFlags=c.subtreeFlags&65011712,g!==null?o=Ft(g,o):(o=Zn(o,l,n,null),o.flags|=2),o.return=t,a.return=t,a.sibling=o,t.child=a,_l(null,a),a=t.child,o=e.child.memoizedState,o===null?o=Ro(n):(l=o.cachePool,l!==null?(c=Ne._currentValue,l=l.parent!==c?{parent:c,pool:c}:l):l=Ys(),o={baseLanes:o.baseLanes|n,cachePool:l}),a.memoizedState=o,a.childLanes=Uo(e,u,n),t.memoizedState=Oo,_l(e.child,a)):(An(t),n=e.child,e=n.sibling,n=Ft(n,{mode:"visible",children:a.children}),n.return=t,n.sibling=null,e!==null&&(u=t.deletions,u===null?(t.deletions=[e],t.flags|=16):u.push(e)),t.child=n,t.memoizedState=null,n)}function qo(e,t){return t=Hi({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Hi(e,t){return e=pt(22,e,null,t),e.lanes=0,e}function Ho(e,t,n){return In(t,e.child,null,n),e=qo(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Pr(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),Wu(e.return,t,n)}function No(e,t,n,a,l,i){var u=e.memoizedState;u===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(u.isBackwards=t,u.rendering=null,u.renderingStartTime=0,u.last=a,u.tail=n,u.tailMode=l,u.treeForkCount=i)}function ef(e,t,n){var a=t.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var u=qe.current,o=(u&2)!==0;if(o?(u=u&1|2,t.flags|=128):u&=1,H(qe,u),Je(e,t,a,n),a=ue?ml:0,!o&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Pr(e,n,t);else if(e.tag===19)Pr(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&Ai(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),No(t,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Ai(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}No(t,!0,n,null,i,a);break;case"together":No(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function nn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Mn|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Ea(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(d(153));if(t.child!==null){for(e=t.child,n=Ft(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ft(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Bo(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&pi(e)))}function oh(e,t,n){switch(t.tag){case 3:Ve(t,t.stateNode.containerInfo),bn(t,Ne,e.memoizedState.cache),kn();break;case 27:case 5:kt(t);break;case 4:Ve(t,t.stateNode.containerInfo);break;case 10:bn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,oo(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(An(t),t.flags|=128,null):(n&t.child.childLanes)!==0?Ir(e,t,n):(An(t),e=nn(e,t,n),e!==null?e.sibling:null);An(t);break;case 19:var l=(e.flags&128)!==0;if(a=(n&t.childLanes)!==0,a||(Ea(e,t,n,!1),a=(n&t.childLanes)!==0),l){if(a)return ef(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),H(qe,qe.current),a)break;return null;case 22:return t.lanes=0,kr(e,t,n,t.pendingProps);case 24:bn(t,Ne,e.memoizedState.cache)}return nn(e,t,n)}function tf(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)we=!0;else{if(!Bo(e,n)&&(t.flags&128)===0)return we=!1,oh(e,t,n);we=(e.flags&131072)!==0}else we=!1,ue&&(t.flags&1048576)!==0&&Us(t,ml,t.index);switch(t.lanes=0,t.tag){case 16:e:{var a=t.pendingProps;if(e=Fn(t.elementType),t.type=e,typeof e=="function")Gu(e)?(a=ea(e,a),t.tag=1,t=Fr(null,t,e,a,n)):(t.tag=0,t=Co(null,t,e,a,n));else{if(e!=null){var l=e.$$typeof;if(l===F){t.tag=11,t=Qr(null,t,e,a,n);break e}else if(l===k){t.tag=14,t=Vr(null,t,e,a,n);break e}}throw t=At(e)||e,Error(d(306,t,""))}}return t;case 0:return Co(e,t,t.type,t.pendingProps,n);case 1:return a=t.type,l=ea(a,t.pendingProps),Fr(e,t,a,l,n);case 3:e:{if(Ve(t,t.stateNode.containerInfo),e===null)throw Error(d(387));a=t.pendingProps;var i=t.memoizedState;l=i.element,no(e,t),Sl(t,a,null,n);var u=t.memoizedState;if(a=u.cache,bn(t,Ne,a),a!==i.cache&&Fu(t,[Ne],n,!0),xl(),a=u.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:u.cache},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){t=$r(e,t,a,n);break e}else if(a!==l){l=Dt(Error(d(424)),t),hl(l),t=$r(e,t,a,n);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(ze=Ut(e.firstChild),ke=t,ue=!0,vn=null,Ot=!0,n=ks(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(kn(),a===l){t=nn(e,t,n);break e}Je(e,t,a,n)}t=t.child}return t;case 26:return qi(e,t),e===null?(n=md(t.type,null,t.pendingProps,null))?t.memoizedState=n:ue||(n=t.type,e=t.pendingProps,a=$i(I.current).createElement(n),a[Ze]=t,a[it]=e,We(a,n,e),Ge(a),t.stateNode=a):t.memoizedState=md(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return kt(t),e===null&&ue&&(a=t.stateNode=rd(t.type,t.pendingProps,I.current),ke=t,Ot=!0,l=ze,Rn(t.type)?(gc=l,ze=Ut(a.firstChild)):ze=l),Je(e,t,t.pendingProps.children,n),qi(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ue&&((l=a=ze)&&(a=Bh(a,t.type,t.pendingProps,Ot),a!==null?(t.stateNode=a,ke=t,ze=Ut(a.firstChild),Ot=!1,l=!0):l=!1),l||yn(t)),kt(t),l=t.type,i=t.pendingProps,u=e!==null?e.memoizedProps:null,a=i.children,fc(l,i)?a=null:u!==null&&fc(l,u)&&(t.flags|=32),t.memoizedState!==null&&(l=so(e,t,Im,null,null,n),Gl._currentValue=l),qi(e,t),Je(e,t,a,n),t.child;case 6:return e===null&&ue&&((e=n=ze)&&(n=wh(n,t.pendingProps,Ot),n!==null?(t.stateNode=n,ke=t,ze=null,e=!0):e=!1),e||yn(t)),null;case 13:return Ir(e,t,n);case 4:return Ve(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=In(t,null,a,n):Je(e,t,a,n),t.child;case 11:return Qr(e,t,t.type,t.pendingProps,n);case 7:return Je(e,t,t.pendingProps,n),t.child;case 8:return Je(e,t,t.pendingProps.children,n),t.child;case 12:return Je(e,t,t.pendingProps.children,n),t.child;case 10:return a=t.pendingProps,bn(t,t.type,a.value),Je(e,t,a.children,n),t.child;case 9:return l=t.type._context,a=t.pendingProps.children,Jn(t),l=Ke(l),a=a(l),t.flags|=1,Je(e,t,a,n),t.child;case 14:return Vr(e,t,t.type,t.pendingProps,n);case 15:return Zr(e,t,t.type,t.pendingProps,n);case 19:return ef(e,t,n);case 31:return uh(e,t,n);case 22:return kr(e,t,n,t.pendingProps);case 24:return Jn(t),a=Ke(Ne),e===null?(l=Pu(),l===null&&(l=Se,i=$u(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),t.memoizedState={parent:a,cache:l},to(t),bn(t,Ne,l)):((e.lanes&n)!==0&&(no(e,t),Sl(t,null,null,n),xl()),l=e.memoizedState,i=t.memoizedState,l.parent!==a?(l={parent:a,cache:a},t.memoizedState=l,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=l),bn(t,Ne,a)):(a=i.cache,bn(t,Ne,a),a!==l.cache&&Fu(t,[Ne],n,!0))),Je(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(d(156,t.tag))}function an(e){e.flags|=4}function wo(e,t,n,a,l){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(l&335544128)===l)if(e.stateNode.complete)e.flags|=8192;else if(jf())e.flags|=8192;else throw $n=bi,eo}else e.flags&=-16777217}function nf(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!yd(t))if(jf())e.flags|=8192;else throw $n=bi,eo}function Ni(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Hc():536870912,e.lanes|=t,Na|=t)}function Ml(e,t){if(!ue)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function _e(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function ch(e,t,n){var a=t.pendingProps;switch(Zu(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return _e(t),null;case 1:return _e(t),null;case 3:return n=t.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Pt(Ne),Ce(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Aa(t)?an(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Ku())),_e(t),null;case 26:var l=t.type,i=t.memoizedState;return e===null?(an(t),i!==null?(_e(t),nf(t,i)):(_e(t),wo(t,l,null,a,n))):i?i!==e.memoizedState?(an(t),_e(t),nf(t,i)):(_e(t),t.flags&=-16777217):(e=e.memoizedProps,e!==a&&an(t),_e(t),wo(t,l,e,a,n)),null;case 27:if(Yt(t),n=I.current,l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&an(t);else{if(!a){if(t.stateNode===null)throw Error(d(166));return _e(t),null}e=U.current,Aa(t)?Hs(t):(e=rd(l,a,n),t.stateNode=e,an(t))}return _e(t),null;case 5:if(Yt(t),l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&an(t);else{if(!a){if(t.stateNode===null)throw Error(d(166));return _e(t),null}if(i=U.current,Aa(t))Hs(t);else{var u=$i(I.current);switch(i){case 1:i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=u.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?u.createElement("select",{is:a.is}):u.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?u.createElement(l,{is:a.is}):u.createElement(l)}}i[Ze]=t,i[it]=a;e:for(u=t.child;u!==null;){if(u.tag===5||u.tag===6)i.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===t)break e;for(;u.sibling===null;){if(u.return===null||u.return===t)break e;u=u.return}u.sibling.return=u.return,u=u.sibling}t.stateNode=i;e:switch(We(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}a&&an(t)}}return _e(t),wo(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==a&&an(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(d(166));if(e=I.current,Aa(t)){if(e=t.stateNode,n=t.memoizedProps,a=null,l=ke,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}e[Ze]=t,e=!!(e.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||Pf(e.nodeValue,n)),e||yn(t,!0)}else e=$i(e).createTextNode(a),e[Ze]=t,t.stateNode=e}return _e(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(a=Aa(t),n!==null){if(e===null){if(!a)throw Error(d(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(d(557));e[Ze]=t}else kn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;_e(t),e=!1}else n=Ku(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(vt(t),t):(vt(t),null);if((t.flags&128)!==0)throw Error(d(558))}return _e(t),null;case 13:if(a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(l=Aa(t),a!==null&&a.dehydrated!==null){if(e===null){if(!l)throw Error(d(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(d(317));l[Ze]=t}else kn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;_e(t),l=!1}else l=Ku(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),l=!0;if(!l)return t.flags&256?(vt(t),t):(vt(t),null)}return vt(t),(t.flags&128)!==0?(t.lanes=n,t):(n=a!==null,e=e!==null&&e.memoizedState!==null,n&&(a=t.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Ni(t,t.updateQueue),_e(t),null);case 4:return Ce(),e===null&&uc(t.stateNode.containerInfo),_e(t),null;case 10:return Pt(t.type),_e(t),null;case 19:if(z(qe),a=t.memoizedState,a===null)return _e(t),null;if(l=(t.flags&128)!==0,i=a.rendering,i===null)if(l)Ml(a,!1);else{if(Re!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=Ai(e),i!==null){for(t.flags|=128,Ml(a,!1),e=i.updateQueue,t.updateQueue=e,Ni(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Cs(n,e),n=n.sibling;return H(qe,qe.current&1|2),ue&&$t(t,a.treeForkCount),t.child}e=e.sibling}a.tail!==null&&Fe()>Gi&&(t.flags|=128,l=!0,Ml(a,!1),t.lanes=4194304)}else{if(!l)if(e=Ai(i),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,Ni(t,e),Ml(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!ue)return _e(t),null}else 2*Fe()-a.renderingStartTime>Gi&&n!==536870912&&(t.flags|=128,l=!0,Ml(a,!1),t.lanes=4194304);a.isBackwards?(i.sibling=t.child,t.child=i):(e=a.last,e!==null?e.sibling=i:t.child=i,a.last=i)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=Fe(),e.sibling=null,n=qe.current,H(qe,l?n&1|2:n&1),ue&&$t(t,a.treeForkCount),e):(_e(t),null);case 22:case 23:return vt(t),uo(),a=t.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?(n&536870912)!==0&&(t.flags&128)===0&&(_e(t),t.subtreeFlags&6&&(t.flags|=8192)):_e(t),n=t.updateQueue,n!==null&&Ni(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==n&&(t.flags|=2048),e!==null&&z(Wn),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Pt(Ne),_e(t),null;case 25:return null;case 30:return null}throw Error(d(156,t.tag))}function sh(e,t){switch(Zu(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Pt(Ne),Ce(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Yt(t),null;case 31:if(t.memoizedState!==null){if(vt(t),t.alternate===null)throw Error(d(340));kn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(vt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(d(340));kn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return z(qe),null;case 4:return Ce(),null;case 10:return Pt(t.type),null;case 22:case 23:return vt(t),uo(),e!==null&&z(Wn),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Pt(Ne),null;case 25:return null;default:return null}}function af(e,t){switch(Zu(t),t.tag){case 3:Pt(Ne),Ce();break;case 26:case 27:case 5:Yt(t);break;case 4:Ce();break;case 31:t.memoizedState!==null&&vt(t);break;case 13:vt(t);break;case 19:z(qe);break;case 10:Pt(t.type);break;case 22:case 23:vt(t),uo(),e!==null&&z(Wn);break;case 24:Pt(Ne)}}function Dl(e,t){try{var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&e)===e){a=void 0;var i=n.create,u=n.inst;a=i(),u.destroy=a}n=n.next}while(n!==l)}}catch(o){ge(t,t.return,o)}}function zn(e,t,n){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&e)===e){var u=a.inst,o=u.destroy;if(o!==void 0){u.destroy=void 0,l=t;var c=n,g=o;try{g()}catch(x){ge(l,c,x)}}}a=a.next}while(a!==i)}}catch(x){ge(t,t.return,x)}}function lf(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Js(t,n)}catch(a){ge(e,e.return,a)}}}function uf(e,t,n){n.props=ea(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(a){ge(e,t,a)}}function jl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof n=="function"?e.refCleanup=n(a):n.current=a}}catch(l){ge(e,t,l)}}function Qt(e,t){var n=e.ref,a=e.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){ge(e,t,l)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){ge(e,t,l)}else n.current=null}function of(e){var t=e.type,n=e.memoizedProps,a=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break e;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){ge(e,e.return,l)}}function Lo(e,t,n){try{var a=e.stateNode;Oh(a,e.type,n,t),a[it]=t}catch(l){ge(e,e.return,l)}}function cf(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Rn(e.type)||e.tag===4}function Yo(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||cf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Rn(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Go(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Jt));else if(a!==4&&(a===27&&Rn(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Go(e,t,n),e=e.sibling;e!==null;)Go(e,t,n),e=e.sibling}function Bi(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(a===27&&Rn(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Bi(e,t,n),e=e.sibling;e!==null;)Bi(e,t,n),e=e.sibling}function sf(e){var t=e.stateNode,n=e.memoizedProps;try{for(var a=e.type,l=t.attributes;l.length;)t.removeAttributeNode(l[0]);We(t,a,n),t[Ze]=e,t[it]=n}catch(i){ge(e,e.return,i)}}var ln=!1,Le=!1,Xo=!1,rf=typeof WeakSet=="function"?WeakSet:Set,Xe=null;function rh(e,t){if(e=e.containerInfo,sc=lu,e=Ss(e),qu(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var u=0,o=-1,c=-1,g=0,x=0,E=e,v=null;t:for(;;){for(var y;E!==n||l!==0&&E.nodeType!==3||(o=u+l),E!==i||a!==0&&E.nodeType!==3||(c=u+a),E.nodeType===3&&(u+=E.nodeValue.length),(y=E.firstChild)!==null;)v=E,E=y;for(;;){if(E===e)break t;if(v===n&&++g===l&&(o=u),v===i&&++x===a&&(c=u),(y=E.nextSibling)!==null)break;E=v,v=E.parentNode}E=y}n=o===-1||c===-1?null:{start:o,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(rc={focusedElem:e,selectionRange:n},lu=!1,Xe=t;Xe!==null;)if(t=Xe,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Xe=e;else for(;Xe!==null;){switch(t=Xe,i=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)l=e[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&i!==null){e=void 0,n=t,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var w=ea(n.type,l);e=a.getSnapshotBeforeUpdate(w,i),a.__reactInternalSnapshotBeforeUpdate=e}catch(Z){ge(n,n.return,Z)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)mc(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":mc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(d(163))}if(e=t.sibling,e!==null){e.return=t.return,Xe=e;break}Xe=t.return}}function ff(e,t,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:on(e,n),a&4&&Dl(5,n);break;case 1:if(on(e,n),a&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(u){ge(n,n.return,u)}else{var l=ea(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(l,t,e.__reactInternalSnapshotBeforeUpdate)}catch(u){ge(n,n.return,u)}}a&64&&lf(n),a&512&&jl(n,n.return);break;case 3:if(on(e,n),a&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Js(e,t)}catch(u){ge(n,n.return,u)}}break;case 27:t===null&&a&4&&sf(n);case 26:case 5:on(e,n),t===null&&a&4&&of(n),a&512&&jl(n,n.return);break;case 12:on(e,n);break;case 31:on(e,n),a&4&&hf(e,n);break;case 13:on(e,n),a&4&&pf(e,n),a&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=bh.bind(null,n),Lh(e,n))));break;case 22:if(a=n.memoizedState!==null||ln,!a){t=t!==null&&t.memoizedState!==null||Le,l=ln;var i=Le;ln=a,(Le=t)&&!i?cn(e,n,(n.subtreeFlags&8772)!==0):on(e,n),ln=l,Le=i}break;case 30:break;default:on(e,n)}}function df(e){var t=e.alternate;t!==null&&(e.alternate=null,df(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&vu(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var De=null,ot=!1;function un(e,t,n){for(n=n.child;n!==null;)mf(e,t,n),n=n.sibling}function mf(e,t,n){if($e&&typeof $e.onCommitFiberUnmount=="function")try{$e.onCommitFiberUnmount(mn,n)}catch{}switch(n.tag){case 26:Le||Qt(n,t),un(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Le||Qt(n,t);var a=De,l=ot;Rn(n.type)&&(De=n.stateNode,ot=!1),un(e,t,n),wl(n.stateNode),De=a,ot=l;break;case 5:Le||Qt(n,t);case 6:if(a=De,l=ot,De=null,un(e,t,n),De=a,ot=l,De!==null)if(ot)try{(De.nodeType===9?De.body:De.nodeName==="HTML"?De.ownerDocument.body:De).removeChild(n.stateNode)}catch(i){ge(n,t,i)}else try{De.removeChild(n.stateNode)}catch(i){ge(n,t,i)}break;case 18:De!==null&&(ot?(e=De,id(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),Va(e)):id(De,n.stateNode));break;case 4:a=De,l=ot,De=n.stateNode.containerInfo,ot=!0,un(e,t,n),De=a,ot=l;break;case 0:case 11:case 14:case 15:zn(2,n,t),Le||zn(4,n,t),un(e,t,n);break;case 1:Le||(Qt(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"&&uf(n,t,a)),un(e,t,n);break;case 21:un(e,t,n);break;case 22:Le=(a=Le)||n.memoizedState!==null,un(e,t,n),Le=a;break;default:un(e,t,n)}}function hf(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Va(e)}catch(n){ge(t,t.return,n)}}}function pf(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Va(e)}catch(n){ge(t,t.return,n)}}function fh(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new rf),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new rf),t;default:throw Error(d(435,e.tag))}}function wi(e,t){var n=fh(e);t.forEach(function(a){if(!n.has(a)){n.add(a);var l=xh.bind(null,e,a);a.then(l,l)}})}function ct(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=e,u=t,o=u;e:for(;o!==null;){switch(o.tag){case 27:if(Rn(o.type)){De=o.stateNode,ot=!1;break e}break;case 5:De=o.stateNode,ot=!1;break e;case 3:case 4:De=o.stateNode.containerInfo,ot=!0;break e}o=o.return}if(De===null)throw Error(d(160));mf(i,u,l),De=null,ot=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)gf(t,e),t=t.sibling}var wt=null;function gf(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:ct(t,e),st(e),a&4&&(zn(3,e,e.return),Dl(3,e),zn(5,e,e.return));break;case 1:ct(t,e),st(e),a&512&&(Le||n===null||Qt(n,n.return)),a&64&&ln&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=wt;if(ct(t,e),st(e),a&512&&(Le||n===null||Qt(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=e.memoizedState,n===null)if(a===null)if(e.stateNode===null){e:{a=e.type,n=e.memoizedProps,l=l.ownerDocument||l;t:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[nl]||i[Ze]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),We(i,a,n),i[Ze]=e,Ge(i),a=i;break e;case"link":var u=gd("link","href",l).get(a+(n.href||""));if(u){for(var o=0;o<u.length;o++)if(i=u[o],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){u.splice(o,1);break t}}i=l.createElement(a),We(i,a,n),l.head.appendChild(i);break;case"meta":if(u=gd("meta","content",l).get(a+(n.content||""))){for(o=0;o<u.length;o++)if(i=u[o],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){u.splice(o,1);break t}}i=l.createElement(a),We(i,a,n),l.head.appendChild(i);break;default:throw Error(d(468,a))}i[Ze]=e,Ge(i),a=i}e.stateNode=a}else vd(l,e.type,e.stateNode);else e.stateNode=pd(l,a,e.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?vd(l,e.type,e.stateNode):pd(l,a,e.memoizedProps)):a===null&&e.stateNode!==null&&Lo(e,e.memoizedProps,n.memoizedProps)}break;case 27:ct(t,e),st(e),a&512&&(Le||n===null||Qt(n,n.return)),n!==null&&a&4&&Lo(e,e.memoizedProps,n.memoizedProps);break;case 5:if(ct(t,e),st(e),a&512&&(Le||n===null||Qt(n,n.return)),e.flags&32){l=e.stateNode;try{ma(l,"")}catch(w){ge(e,e.return,w)}}a&4&&e.stateNode!=null&&(l=e.memoizedProps,Lo(e,l,n!==null?n.memoizedProps:l)),a&1024&&(Xo=!0);break;case 6:if(ct(t,e),st(e),a&4){if(e.stateNode===null)throw Error(d(162));a=e.memoizedProps,n=e.stateNode;try{n.nodeValue=a}catch(w){ge(e,e.return,w)}}break;case 3:if(eu=null,l=wt,wt=Ii(t.containerInfo),ct(t,e),wt=l,st(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{Va(t.containerInfo)}catch(w){ge(e,e.return,w)}Xo&&(Xo=!1,vf(e));break;case 4:a=wt,wt=Ii(e.stateNode.containerInfo),ct(t,e),st(e),wt=a;break;case 12:ct(t,e),st(e);break;case 31:ct(t,e),st(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,wi(e,a)));break;case 13:ct(t,e),st(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Yi=Fe()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,wi(e,a)));break;case 22:l=e.memoizedState!==null;var c=n!==null&&n.memoizedState!==null,g=ln,x=Le;if(ln=g||l,Le=x||c,ct(t,e),Le=x,ln=g,st(e),a&8192)e:for(t=e.stateNode,t._visibility=l?t._visibility&-2:t._visibility|1,l&&(n===null||c||ln||Le||ta(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){c=n=t;try{if(i=c.stateNode,l)u=i.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{o=c.stateNode;var E=c.memoizedProps.style,v=E!=null&&E.hasOwnProperty("display")?E.display:null;o.style.display=v==null||typeof v=="boolean"?"":(""+v).trim()}}catch(w){ge(c,c.return,w)}}}else if(t.tag===6){if(n===null){c=t;try{c.stateNode.nodeValue=l?"":c.memoizedProps}catch(w){ge(c,c.return,w)}}}else if(t.tag===18){if(n===null){c=t;try{var y=c.stateNode;l?ud(y,!0):ud(c.stateNode,!1)}catch(w){ge(c,c.return,w)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=e.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,wi(e,n))));break;case 19:ct(t,e),st(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,wi(e,a)));break;case 30:break;case 21:break;default:ct(t,e),st(e)}}function st(e){var t=e.flags;if(t&2){try{for(var n,a=e.return;a!==null;){if(cf(a)){n=a;break}a=a.return}if(n==null)throw Error(d(160));switch(n.tag){case 27:var l=n.stateNode,i=Yo(e);Bi(e,i,l);break;case 5:var u=n.stateNode;n.flags&32&&(ma(u,""),n.flags&=-33);var o=Yo(e);Bi(e,o,u);break;case 3:case 4:var c=n.stateNode.containerInfo,g=Yo(e);Go(e,g,c);break;default:throw Error(d(161))}}catch(x){ge(e,e.return,x)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function vf(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;vf(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function on(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)ff(e,t.alternate,t),t=t.sibling}function ta(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:zn(4,t,t.return),ta(t);break;case 1:Qt(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&uf(t,t.return,n),ta(t);break;case 27:wl(t.stateNode);case 26:case 5:Qt(t,t.return),ta(t);break;case 22:t.memoizedState===null&&ta(t);break;case 30:ta(t);break;default:ta(t)}e=e.sibling}}function cn(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,l=e,i=t,u=i.flags;switch(i.tag){case 0:case 11:case 15:cn(l,i,n),Dl(4,i);break;case 1:if(cn(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(g){ge(a,a.return,g)}if(a=i,l=a.updateQueue,l!==null){var o=a.stateNode;try{var c=l.shared.hiddenCallbacks;if(c!==null)for(l.shared.hiddenCallbacks=null,l=0;l<c.length;l++)Ks(c[l],o)}catch(g){ge(a,a.return,g)}}n&&u&64&&lf(i),jl(i,i.return);break;case 27:sf(i);case 26:case 5:cn(l,i,n),n&&a===null&&u&4&&of(i),jl(i,i.return);break;case 12:cn(l,i,n);break;case 31:cn(l,i,n),n&&u&4&&hf(l,i);break;case 13:cn(l,i,n),n&&u&4&&pf(l,i);break;case 22:i.memoizedState===null&&cn(l,i,n),jl(i,i.return);break;case 30:break;default:cn(l,i,n)}t=t.sibling}}function Qo(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&pl(n))}function Vo(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&pl(e))}function Lt(e,t,n,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)yf(e,t,n,a),t=t.sibling}function yf(e,t,n,a){var l=t.flags;switch(t.tag){case 0:case 11:case 15:Lt(e,t,n,a),l&2048&&Dl(9,t);break;case 1:Lt(e,t,n,a);break;case 3:Lt(e,t,n,a),l&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&pl(e)));break;case 12:if(l&2048){Lt(e,t,n,a),e=t.stateNode;try{var i=t.memoizedProps,u=i.id,o=i.onPostCommit;typeof o=="function"&&o(u,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(c){ge(t,t.return,c)}}else Lt(e,t,n,a);break;case 31:Lt(e,t,n,a);break;case 13:Lt(e,t,n,a);break;case 23:break;case 22:i=t.stateNode,u=t.alternate,t.memoizedState!==null?i._visibility&2?Lt(e,t,n,a):Cl(e,t):i._visibility&2?Lt(e,t,n,a):(i._visibility|=2,Ua(e,t,n,a,(t.subtreeFlags&10256)!==0||!1)),l&2048&&Qo(u,t);break;case 24:Lt(e,t,n,a),l&2048&&Vo(t.alternate,t);break;default:Lt(e,t,n,a)}}function Ua(e,t,n,a,l){for(l=l&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var i=e,u=t,o=n,c=a,g=u.flags;switch(u.tag){case 0:case 11:case 15:Ua(i,u,o,c,l),Dl(8,u);break;case 23:break;case 22:var x=u.stateNode;u.memoizedState!==null?x._visibility&2?Ua(i,u,o,c,l):Cl(i,u):(x._visibility|=2,Ua(i,u,o,c,l)),l&&g&2048&&Qo(u.alternate,u);break;case 24:Ua(i,u,o,c,l),l&&g&2048&&Vo(u.alternate,u);break;default:Ua(i,u,o,c,l)}t=t.sibling}}function Cl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,a=t,l=a.flags;switch(a.tag){case 22:Cl(n,a),l&2048&&Qo(a.alternate,a);break;case 24:Cl(n,a),l&2048&&Vo(a.alternate,a);break;default:Cl(n,a)}t=t.sibling}}var Ol=8192;function qa(e,t,n){if(e.subtreeFlags&Ol)for(e=e.child;e!==null;)bf(e,t,n),e=e.sibling}function bf(e,t,n){switch(e.tag){case 26:qa(e,t,n),e.flags&Ol&&e.memoizedState!==null&&$h(n,wt,e.memoizedState,e.memoizedProps);break;case 5:qa(e,t,n);break;case 3:case 4:var a=wt;wt=Ii(e.stateNode.containerInfo),qa(e,t,n),wt=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=Ol,Ol=16777216,qa(e,t,n),Ol=a):qa(e,t,n));break;default:qa(e,t,n)}}function xf(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Rl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];Xe=a,Tf(a,e)}xf(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Sf(e),e=e.sibling}function Sf(e){switch(e.tag){case 0:case 11:case 15:Rl(e),e.flags&2048&&zn(9,e,e.return);break;case 3:Rl(e);break;case 12:Rl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Li(e)):Rl(e);break;default:Rl(e)}}function Li(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];Xe=a,Tf(a,e)}xf(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:zn(8,t,t.return),Li(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Li(t));break;default:Li(t)}e=e.sibling}}function Tf(e,t){for(;Xe!==null;){var n=Xe;switch(n.tag){case 0:case 11:case 15:zn(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:pl(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Xe=a;else e:for(n=e;Xe!==null;){a=Xe;var l=a.sibling,i=a.return;if(df(a),a===n){Xe=null;break e}if(l!==null){l.return=i,Xe=l;break e}Xe=i}}}var dh={getCacheForType:function(e){var t=Ke(Ne),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ke(Ne).controller.signal}},mh=typeof WeakMap=="function"?WeakMap:Map,de=0,Se=null,ne=null,le=0,pe=0,yt=null,_n=!1,Ha=!1,Zo=!1,sn=0,Re=0,Mn=0,na=0,ko=0,bt=0,Na=0,Ul=null,rt=null,Ko=!1,Yi=0,Af=0,Gi=1/0,Xi=null,Dn=null,Ye=0,jn=null,Ba=null,rn=0,Jo=0,Wo=null,Ef=null,ql=0,Fo=null;function xt(){return(de&2)!==0&&le!==0?le&-le:S.T!==null?nc():Lc()}function zf(){if(bt===0)if((le&536870912)===0||ue){var e=at;at<<=1,(at&3932160)===0&&(at=262144),bt=e}else bt=536870912;return e=gt.current,e!==null&&(e.flags|=32),bt}function ft(e,t,n){(e===Se&&(pe===2||pe===9)||e.cancelPendingCommit!==null)&&(wa(e,0),Cn(e,le,bt,!1)),tl(e,n),((de&2)===0||e!==Se)&&(e===Se&&((de&2)===0&&(na|=n),Re===4&&Cn(e,le,bt,!1)),Vt(e))}function _f(e,t,n){if((de&6)!==0)throw Error(d(327));var a=!n&&(t&127)===0&&(t&e.expiredLanes)===0||el(e,t),l=a?gh(e,t):Io(e,t,!0),i=a;do{if(l===0){Ha&&!a&&Cn(e,t,0,!1);break}else{if(n=e.current.alternate,i&&!hh(n)){l=Io(e,t,!1),i=!1;continue}if(l===2){if(i=t,e.errorRecoveryDisabledLanes&i)var u=0;else u=e.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){t=u;e:{var o=e;l=Ul;var c=o.current.memoizedState.isDehydrated;if(c&&(wa(o,u).flags|=256),u=Io(o,u,!1),u!==2){if(Zo&&!c){o.errorRecoveryDisabledLanes|=i,na|=i,l=4;break e}i=rt,rt=l,i!==null&&(rt===null?rt=i:rt.push.apply(rt,i))}l=u}if(i=!1,l!==2)continue}}if(l===1){wa(e,0),Cn(e,t,0,!0);break}e:{switch(a=e,i=l,i){case 0:case 1:throw Error(d(345));case 4:if((t&4194048)!==t)break;case 6:Cn(a,t,bt,!_n);break e;case 2:rt=null;break;case 3:case 5:break;default:throw Error(d(329))}if((t&62914560)===t&&(l=Yi+300-Fe(),10<l)){if(Cn(a,t,bt,!_n),ua(a,0,!0)!==0)break e;rn=t,a.timeoutHandle=ad(Mf.bind(null,a,n,rt,Xi,Ko,t,bt,na,Na,_n,i,"Throttled",-0,0),l);break e}Mf(a,n,rt,Xi,Ko,t,bt,na,Na,_n,i,null,-0,0)}}break}while(!0);Vt(e)}function Mf(e,t,n,a,l,i,u,o,c,g,x,E,v,y){if(e.timeoutHandle=-1,E=t.subtreeFlags,E&8192||(E&16785408)===16785408){E={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Jt},bf(t,i,E);var w=(i&62914560)===i?Yi-Fe():(i&4194048)===i?Af-Fe():0;if(w=Ih(E,w),w!==null){rn=i,e.cancelPendingCommit=w(Hf.bind(null,e,t,i,n,a,l,u,o,c,x,E,null,v,y)),Cn(e,i,u,!g);return}}Hf(e,t,i,n,a,l,u,o,c)}function hh(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!ht(i(),l))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Cn(e,t,n,a){t&=~ko,t&=~na,e.suspendedLanes|=t,e.pingedLanes&=~t,a&&(e.warmLanes|=t),a=e.expirationTimes;for(var l=t;0<l;){var i=31-Ie(l),u=1<<i;a[i]=-1,l&=~u}n!==0&&Nc(e,n,t)}function Qi(){return(de&6)===0?(Hl(0),!1):!0}function $o(){if(ne!==null){if(pe===0)var e=ne.return;else e=ne,It=Kn=null,mo(e),Da=null,vl=0,e=ne;for(;e!==null;)af(e.alternate,e),e=e.return;ne=null}}function wa(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qh(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),rn=0,$o(),Se=e,ne=n=Ft(e.current,null),le=t,pe=0,yt=null,_n=!1,Ha=el(e,t),Zo=!1,Na=bt=ko=na=Mn=Re=0,rt=Ul=null,Ko=!1,(t&8)!==0&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var l=31-Ie(a),i=1<<l;t|=e[l],a&=~i}return sn=t,ri(),n}function Df(e,t){$=null,S.H=zl,t===Ma||t===yi?(t=Qs(),pe=3):t===eo?(t=Qs(),pe=4):pe=t===jo?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,yt=t,ne===null&&(Re=1,Ri(e,Dt(t,e.current)))}function jf(){var e=gt.current;return e===null?!0:(le&4194048)===le?Rt===null:(le&62914560)===le||(le&536870912)!==0?e===Rt:!1}function Cf(){var e=S.H;return S.H=zl,e===null?zl:e}function Of(){var e=S.A;return S.A=dh,e}function Vi(){Re=4,_n||(le&4194048)!==le&&gt.current!==null||(Ha=!0),(Mn&134217727)===0&&(na&134217727)===0||Se===null||Cn(Se,le,bt,!1)}function Io(e,t,n){var a=de;de|=2;var l=Cf(),i=Of();(Se!==e||le!==t)&&(Xi=null,wa(e,t)),t=!1;var u=Re;e:do try{if(pe!==0&&ne!==null){var o=ne,c=yt;switch(pe){case 8:$o(),u=6;break e;case 3:case 2:case 9:case 6:gt.current===null&&(t=!0);var g=pe;if(pe=0,yt=null,La(e,o,c,g),n&&Ha){u=0;break e}break;default:g=pe,pe=0,yt=null,La(e,o,c,g)}}ph(),u=Re;break}catch(x){Df(e,x)}while(!0);return t&&e.shellSuspendCounter++,It=Kn=null,de=a,S.H=l,S.A=i,ne===null&&(Se=null,le=0,ri()),u}function ph(){for(;ne!==null;)Rf(ne)}function gh(e,t){var n=de;de|=2;var a=Cf(),l=Of();Se!==e||le!==t?(Xi=null,Gi=Fe()+500,wa(e,t)):Ha=el(e,t);e:do try{if(pe!==0&&ne!==null){t=ne;var i=yt;t:switch(pe){case 1:pe=0,yt=null,La(e,t,i,1);break;case 2:case 9:if(Gs(i)){pe=0,yt=null,Uf(t);break}t=function(){pe!==2&&pe!==9||Se!==e||(pe=7),Vt(e)},i.then(t,t);break e;case 3:pe=7;break e;case 4:pe=5;break e;case 7:Gs(i)?(pe=0,yt=null,Uf(t)):(pe=0,yt=null,La(e,t,i,7));break;case 5:var u=null;switch(ne.tag){case 26:u=ne.memoizedState;case 5:case 27:var o=ne;if(u?yd(u):o.stateNode.complete){pe=0,yt=null;var c=o.sibling;if(c!==null)ne=c;else{var g=o.return;g!==null?(ne=g,Zi(g)):ne=null}break t}}pe=0,yt=null,La(e,t,i,5);break;case 6:pe=0,yt=null,La(e,t,i,6);break;case 8:$o(),Re=6;break e;default:throw Error(d(462))}}vh();break}catch(x){Df(e,x)}while(!0);return It=Kn=null,S.H=a,S.A=l,de=n,ne!==null?0:(Se=null,le=0,ri(),Re)}function vh(){for(;ne!==null&&!Kl();)Rf(ne)}function Rf(e){var t=tf(e.alternate,e,sn);e.memoizedProps=e.pendingProps,t===null?Zi(e):ne=t}function Uf(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Wr(n,t,t.pendingProps,t.type,void 0,le);break;case 11:t=Wr(n,t,t.pendingProps,t.type.render,t.ref,le);break;case 5:mo(t);default:af(n,t),t=ne=Cs(t,sn),t=tf(n,t,sn)}e.memoizedProps=e.pendingProps,t===null?Zi(e):ne=t}function La(e,t,n,a){It=Kn=null,mo(t),Da=null,vl=0;var l=t.return;try{if(ih(e,l,t,n,le)){Re=1,Ri(e,Dt(n,e.current)),ne=null;return}}catch(i){if(l!==null)throw ne=l,i;Re=1,Ri(e,Dt(n,e.current)),ne=null;return}t.flags&32768?(ue||a===1?e=!0:Ha||(le&536870912)!==0?e=!1:(_n=e=!0,(a===2||a===9||a===3||a===6)&&(a=gt.current,a!==null&&a.tag===13&&(a.flags|=16384))),qf(t,e)):Zi(t)}function Zi(e){var t=e;do{if((t.flags&32768)!==0){qf(t,_n);return}e=t.return;var n=ch(t.alternate,t,sn);if(n!==null){ne=n;return}if(t=t.sibling,t!==null){ne=t;return}ne=t=e}while(t!==null);Re===0&&(Re=5)}function qf(e,t){do{var n=sh(e.alternate,e);if(n!==null){n.flags&=32767,ne=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){ne=e;return}ne=e=n}while(e!==null);Re=6,ne=null}function Hf(e,t,n,a,l,i,u,o,c){e.cancelPendingCommit=null;do ki();while(Ye!==0);if((de&6)!==0)throw Error(d(327));if(t!==null){if(t===e.current)throw Error(d(177));if(i=t.lanes|t.childLanes,i|=Lu,Fd(e,n,i,u,o,c),e===Se&&(ne=Se=null,le=0),Ba=t,jn=e,rn=n,Jo=i,Wo=l,Ef=a,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Sh(Ln,function(){return Yf(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||a){a=S.T,S.T=null,l=q.p,q.p=2,u=de,de|=4;try{rh(e,t,n)}finally{de=u,q.p=l,S.T=a}}Ye=1,Nf(),Bf(),wf()}}function Nf(){if(Ye===1){Ye=0;var e=jn,t=Ba,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=S.T,S.T=null;var a=q.p;q.p=2;var l=de;de|=4;try{gf(t,e);var i=rc,u=Ss(e.containerInfo),o=i.focusedElem,c=i.selectionRange;if(u!==o&&o&&o.ownerDocument&&xs(o.ownerDocument.documentElement,o)){if(c!==null&&qu(o)){var g=c.start,x=c.end;if(x===void 0&&(x=g),"selectionStart"in o)o.selectionStart=g,o.selectionEnd=Math.min(x,o.value.length);else{var E=o.ownerDocument||document,v=E&&E.defaultView||window;if(v.getSelection){var y=v.getSelection(),w=o.textContent.length,Z=Math.min(c.start,w),be=c.end===void 0?Z:Math.min(c.end,w);!y.extend&&Z>be&&(u=be,be=Z,Z=u);var m=bs(o,Z),r=bs(o,be);if(m&&r&&(y.rangeCount!==1||y.anchorNode!==m.node||y.anchorOffset!==m.offset||y.focusNode!==r.node||y.focusOffset!==r.offset)){var p=E.createRange();p.setStart(m.node,m.offset),y.removeAllRanges(),Z>be?(y.addRange(p),y.extend(r.node,r.offset)):(p.setEnd(r.node,r.offset),y.addRange(p))}}}}for(E=[],y=o;y=y.parentNode;)y.nodeType===1&&E.push({element:y,left:y.scrollLeft,top:y.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<E.length;o++){var A=E[o];A.element.scrollLeft=A.left,A.element.scrollTop=A.top}}lu=!!sc,rc=sc=null}finally{de=l,q.p=a,S.T=n}}e.current=t,Ye=2}}function Bf(){if(Ye===2){Ye=0;var e=jn,t=Ba,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=S.T,S.T=null;var a=q.p;q.p=2;var l=de;de|=4;try{ff(e,t.alternate,t)}finally{de=l,q.p=a,S.T=n}}Ye=3}}function wf(){if(Ye===4||Ye===3){Ye=0,Jl();var e=jn,t=Ba,n=rn,a=Ef;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Ye=5:(Ye=0,Ba=jn=null,Lf(e,e.pendingLanes));var l=e.pendingLanes;if(l===0&&(Dn=null),pu(n),t=t.stateNode,$e&&typeof $e.onCommitFiberRoot=="function")try{$e.onCommitFiberRoot(mn,t,void 0,(t.current.flags&128)===128)}catch{}if(a!==null){t=S.T,l=q.p,q.p=2,S.T=null;try{for(var i=e.onRecoverableError,u=0;u<a.length;u++){var o=a[u];i(o.value,{componentStack:o.stack})}}finally{S.T=t,q.p=l}}(rn&3)!==0&&ki(),Vt(e),l=e.pendingLanes,(n&261930)!==0&&(l&42)!==0?e===Fo?ql++:(ql=0,Fo=e):ql=0,Hl(0)}}function Lf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,pl(t)))}function ki(){return Nf(),Bf(),wf(),Yf()}function Yf(){if(Ye!==5)return!1;var e=jn,t=Jo;Jo=0;var n=pu(rn),a=S.T,l=q.p;try{q.p=32>n?32:n,S.T=null,n=Wo,Wo=null;var i=jn,u=rn;if(Ye=0,Ba=jn=null,rn=0,(de&6)!==0)throw Error(d(331));var o=de;if(de|=4,Sf(i.current),yf(i,i.current,u,n),de=o,Hl(0,!1),$e&&typeof $e.onPostCommitFiberRoot=="function")try{$e.onPostCommitFiberRoot(mn,i)}catch{}return!0}finally{q.p=l,S.T=a,Lf(e,t)}}function Gf(e,t,n){t=Dt(n,t),t=Do(e.stateNode,t,2),e=Tn(e,t,2),e!==null&&(tl(e,2),Vt(e))}function ge(e,t,n){if(e.tag===3)Gf(e,e,n);else for(;t!==null;){if(t.tag===3){Gf(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(Dn===null||!Dn.has(a))){e=Dt(n,e),n=Gr(2),a=Tn(t,n,2),a!==null&&(Xr(n,a,t,e),tl(a,2),Vt(a));break}}t=t.return}}function Po(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new mh;var l=new Set;a.set(t,l)}else l=a.get(t),l===void 0&&(l=new Set,a.set(t,l));l.has(n)||(Zo=!0,l.add(n),e=yh.bind(null,e,t,n),t.then(e,e))}function yh(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Se===e&&(le&n)===n&&(Re===4||Re===3&&(le&62914560)===le&&300>Fe()-Yi?(de&2)===0&&wa(e,0):ko|=n,Na===le&&(Na=0)),Vt(e)}function Xf(e,t){t===0&&(t=Hc()),e=Vn(e,t),e!==null&&(tl(e,t),Vt(e))}function bh(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Xf(e,n)}function xh(e,t){var n=0;switch(e.tag){case 31:case 13:var a=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(d(314))}a!==null&&a.delete(t),Xf(e,n)}function Sh(e,t){return Wa(e,t)}var Ki=null,Ya=null,ec=!1,Ji=!1,tc=!1,On=0;function Vt(e){e!==Ya&&e.next===null&&(Ya===null?Ki=Ya=e:Ya=Ya.next=e),Ji=!0,ec||(ec=!0,Ah())}function Hl(e,t){if(!tc&&Ji){tc=!0;do for(var n=!1,a=Ki;a!==null;){if(e!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var u=a.suspendedLanes,o=a.pingedLanes;i=(1<<31-Ie(42|e)+1)-1,i&=l&~(u&~o),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,kf(a,i))}else i=le,i=ua(a,a===Se?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||el(a,i)||(n=!0,kf(a,i));a=a.next}while(n);tc=!1}}function Th(){Qf()}function Qf(){Ji=ec=!1;var e=0;On!==0&&Uh()&&(e=On);for(var t=Fe(),n=null,a=Ki;a!==null;){var l=a.next,i=Vf(a,t);i===0?(a.next=null,n===null?Ki=l:n.next=l,l===null&&(Ya=n)):(n=a,(e!==0||(i&3)!==0)&&(Ji=!0)),a=l}Ye!==0&&Ye!==5||Hl(e),On!==0&&(On=0)}function Vf(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var u=31-Ie(i),o=1<<u,c=l[u];c===-1?((o&n)===0||(o&a)!==0)&&(l[u]=Wd(o,t)):c<=t&&(e.expiredLanes|=o),i&=~o}if(t=Se,n=le,n=ua(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,n===0||e===t&&(pe===2||pe===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&Fa(a),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||el(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(a!==null&&Fa(a),pu(n)){case 2:case 8:n=Ia;break;case 32:n=Ln;break;case 268435456:n=Pa;break;default:n=Ln}return a=Zf.bind(null,e),n=Wa(n,a),e.callbackPriority=t,e.callbackNode=n,t}return a!==null&&a!==null&&Fa(a),e.callbackPriority=2,e.callbackNode=null,2}function Zf(e,t){if(Ye!==0&&Ye!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(ki()&&e.callbackNode!==n)return null;var a=le;return a=ua(e,e===Se?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(_f(e,a,t),Vf(e,Fe()),e.callbackNode!=null&&e.callbackNode===n?Zf.bind(null,e):null)}function kf(e,t){if(ki())return null;_f(e,t,!0)}function Ah(){Hh(function(){(de&6)!==0?Wa($a,Th):Qf()})}function nc(){if(On===0){var e=za;e===0&&(e=Pe,Pe<<=1,(Pe&261888)===0&&(Pe=256)),On=e}return On}function Kf(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ni(""+e)}function Jf(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function Eh(e,t,n,a,l){if(t==="submit"&&n&&n.stateNode===l){var i=Kf((l[it]||null).action),u=a.submitter;u&&(t=(t=u[it]||null)?Kf(t.formAction):u.getAttribute("formAction"),t!==null&&(i=t,u=null));var o=new ui("action","action",null,a,l);e.push({event:o,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(On!==0){var c=u?Jf(l,u):new FormData(l);To(n,{pending:!0,data:c,method:l.method,action:i},null,c)}}else typeof i=="function"&&(o.preventDefault(),c=u?Jf(l,u):new FormData(l),To(n,{pending:!0,data:c,method:l.method,action:i},i,c))},currentTarget:l}]})}}for(var ac=0;ac<wu.length;ac++){var lc=wu[ac],zh=lc.toLowerCase(),_h=lc[0].toUpperCase()+lc.slice(1);Bt(zh,"on"+_h)}Bt(Es,"onAnimationEnd"),Bt(zs,"onAnimationIteration"),Bt(_s,"onAnimationStart"),Bt("dblclick","onDoubleClick"),Bt("focusin","onFocus"),Bt("focusout","onBlur"),Bt(Xm,"onTransitionRun"),Bt(Qm,"onTransitionStart"),Bt(Vm,"onTransitionCancel"),Bt(Ms,"onTransitionEnd"),fa("onMouseEnter",["mouseout","mouseover"]),fa("onMouseLeave",["mouseout","mouseover"]),fa("onPointerEnter",["pointerout","pointerover"]),fa("onPointerLeave",["pointerout","pointerover"]),Yn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Yn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Yn("onBeforeInput",["compositionend","keypress","textInput","paste"]),Yn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Yn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Yn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Nl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Mh=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Nl));function Wf(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],l=a.event;a=a.listeners;e:{var i=void 0;if(t)for(var u=a.length-1;0<=u;u--){var o=a[u],c=o.instance,g=o.currentTarget;if(o=o.listener,c!==i&&l.isPropagationStopped())break e;i=o,l.currentTarget=g;try{i(l)}catch(x){si(x)}l.currentTarget=null,i=c}else for(u=0;u<a.length;u++){if(o=a[u],c=o.instance,g=o.currentTarget,o=o.listener,c!==i&&l.isPropagationStopped())break e;i=o,l.currentTarget=g;try{i(l)}catch(x){si(x)}l.currentTarget=null,i=c}}}}function ae(e,t){var n=t[gu];n===void 0&&(n=t[gu]=new Set);var a=e+"__bubble";n.has(a)||(Ff(t,e,2,!1),n.add(a))}function ic(e,t,n){var a=0;t&&(a|=4),Ff(n,e,a,t)}var Wi="_reactListening"+Math.random().toString(36).slice(2);function uc(e){if(!e[Wi]){e[Wi]=!0,Xc.forEach(function(n){n!=="selectionchange"&&(Mh.has(n)||ic(n,!1,e),ic(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Wi]||(t[Wi]=!0,ic("selectionchange",!1,t))}}function Ff(e,t,n,a){switch(zd(t)){case 2:var l=tp;break;case 8:l=np;break;default:l=Sc}n=l.bind(null,t,n,e),l=void 0,!zu||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),a?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function oc(e,t,n,a,l){var i=a;if((t&1)===0&&(t&2)===0&&a!==null)e:for(;;){if(a===null)return;var u=a.tag;if(u===3||u===4){var o=a.stateNode.containerInfo;if(o===l)break;if(u===4)for(u=a.return;u!==null;){var c=u.tag;if((c===3||c===4)&&u.stateNode.containerInfo===l)return;u=u.return}for(;o!==null;){if(u=ca(o),u===null)return;if(c=u.tag,c===5||c===6||c===26||c===27){a=i=u;continue e}o=o.parentNode}}a=a.return}es(function(){var g=i,x=Au(n),E=[];e:{var v=Ds.get(e);if(v!==void 0){var y=ui,w=e;switch(e){case"keypress":if(li(n)===0)break e;case"keydown":case"keyup":y=xm;break;case"focusin":w="focus",y=ju;break;case"focusout":w="blur",y=ju;break;case"beforeblur":case"afterblur":y=ju;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=as;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=cm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=Am;break;case Es:case zs:case _s:y=fm;break;case Ms:y=zm;break;case"scroll":case"scrollend":y=um;break;case"wheel":y=Mm;break;case"copy":case"cut":case"paste":y=mm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=is;break;case"toggle":case"beforetoggle":y=jm}var Z=(t&4)!==0,be=!Z&&(e==="scroll"||e==="scrollend"),m=Z?v!==null?v+"Capture":null:v;Z=[];for(var r=g,p;r!==null;){var A=r;if(p=A.stateNode,A=A.tag,A!==5&&A!==26&&A!==27||p===null||m===null||(A=ll(r,m),A!=null&&Z.push(Bl(r,A,p))),be)break;r=r.return}0<Z.length&&(v=new y(v,w,null,n,x),E.push({event:v,listeners:Z}))}}if((t&7)===0){e:{if(v=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",v&&n!==Tu&&(w=n.relatedTarget||n.fromElement)&&(ca(w)||w[oa]))break e;if((y||v)&&(v=x.window===x?x:(v=x.ownerDocument)?v.defaultView||v.parentWindow:window,y?(w=n.relatedTarget||n.toElement,y=g,w=w?ca(w):null,w!==null&&(be=R(w),Z=w.tag,w!==be||Z!==5&&Z!==27&&Z!==6)&&(w=null)):(y=null,w=g),y!==w)){if(Z=as,A="onMouseLeave",m="onMouseEnter",r="mouse",(e==="pointerout"||e==="pointerover")&&(Z=is,A="onPointerLeave",m="onPointerEnter",r="pointer"),be=y==null?v:al(y),p=w==null?v:al(w),v=new Z(A,r+"leave",y,n,x),v.target=be,v.relatedTarget=p,A=null,ca(x)===g&&(Z=new Z(m,r+"enter",w,n,x),Z.target=p,Z.relatedTarget=be,A=Z),be=A,y&&w)t:{for(Z=Dh,m=y,r=w,p=0,A=m;A;A=Z(A))p++;A=0;for(var X=r;X;X=Z(X))A++;for(;0<p-A;)m=Z(m),p--;for(;0<A-p;)r=Z(r),A--;for(;p--;){if(m===r||r!==null&&m===r.alternate){Z=m;break t}m=Z(m),r=Z(r)}Z=null}else Z=null;y!==null&&$f(E,v,y,Z,!1),w!==null&&be!==null&&$f(E,be,w,Z,!0)}}e:{if(v=g?al(g):window,y=v.nodeName&&v.nodeName.toLowerCase(),y==="select"||y==="input"&&v.type==="file")var ce=ms;else if(fs(v))if(hs)ce=Lm;else{ce=Bm;var L=Nm}else y=v.nodeName,!y||y.toLowerCase()!=="input"||v.type!=="checkbox"&&v.type!=="radio"?g&&Su(g.elementType)&&(ce=ms):ce=wm;if(ce&&(ce=ce(e,g))){ds(E,ce,n,x);break e}L&&L(e,v,g),e==="focusout"&&g&&v.type==="number"&&g.memoizedProps.value!=null&&xu(v,"number",v.value)}switch(L=g?al(g):window,e){case"focusin":(fs(L)||L.contentEditable==="true")&&(va=L,Hu=g,dl=null);break;case"focusout":dl=Hu=va=null;break;case"mousedown":Nu=!0;break;case"contextmenu":case"mouseup":case"dragend":Nu=!1,Ts(E,n,x);break;case"selectionchange":if(Gm)break;case"keydown":case"keyup":Ts(E,n,x)}var P;if(Ou)e:{switch(e){case"compositionstart":var ie="onCompositionStart";break e;case"compositionend":ie="onCompositionEnd";break e;case"compositionupdate":ie="onCompositionUpdate";break e}ie=void 0}else ga?ss(e,n)&&(ie="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(ie="onCompositionStart");ie&&(us&&n.locale!=="ko"&&(ga||ie!=="onCompositionStart"?ie==="onCompositionEnd"&&ga&&(P=ts()):(pn=x,_u="value"in pn?pn.value:pn.textContent,ga=!0)),L=Fi(g,ie),0<L.length&&(ie=new ls(ie,e,null,n,x),E.push({event:ie,listeners:L}),P?ie.data=P:(P=rs(n),P!==null&&(ie.data=P)))),(P=Om?Rm(e,n):Um(e,n))&&(ie=Fi(g,"onBeforeInput"),0<ie.length&&(L=new ls("onBeforeInput","beforeinput",null,n,x),E.push({event:L,listeners:ie}),L.data=P)),Eh(E,e,g,n,x)}Wf(E,t)})}function Bl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Fi(e,t){for(var n=t+"Capture",a=[];e!==null;){var l=e,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=ll(e,n),l!=null&&a.unshift(Bl(e,l,i)),l=ll(e,t),l!=null&&a.push(Bl(e,l,i))),e.tag===3)return a;e=e.return}return[]}function Dh(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function $f(e,t,n,a,l){for(var i=t._reactName,u=[];n!==null&&n!==a;){var o=n,c=o.alternate,g=o.stateNode;if(o=o.tag,c!==null&&c===a)break;o!==5&&o!==26&&o!==27||g===null||(c=g,l?(g=ll(n,i),g!=null&&u.unshift(Bl(n,g,c))):l||(g=ll(n,i),g!=null&&u.push(Bl(n,g,c)))),n=n.return}u.length!==0&&e.push({event:t,listeners:u})}var jh=/\r\n?/g,Ch=/\u0000|\uFFFD/g;function If(e){return(typeof e=="string"?e:""+e).replace(jh,`
`).replace(Ch,"")}function Pf(e,t){return t=If(t),If(e)===t}function ye(e,t,n,a,l,i){switch(n){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||ma(e,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&ma(e,""+a);break;case"className":ei(e,"class",a);break;case"tabIndex":ei(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":ei(e,n,a);break;case"style":Ic(e,a,i);break;case"data":if(t!=="object"){ei(e,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=ni(""+a),e.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(t!=="input"&&ye(e,t,"name",l.name,l,null),ye(e,t,"formEncType",l.formEncType,l,null),ye(e,t,"formMethod",l.formMethod,l,null),ye(e,t,"formTarget",l.formTarget,l,null)):(ye(e,t,"encType",l.encType,l,null),ye(e,t,"method",l.method,l,null),ye(e,t,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=ni(""+a),e.setAttribute(n,a);break;case"onClick":a!=null&&(e.onclick=Jt);break;case"onScroll":a!=null&&ae("scroll",e);break;case"onScrollEnd":a!=null&&ae("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(d(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(d(60));e.innerHTML=n}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}n=ni(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""+a):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":a===!0?e.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,a):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(n,a):e.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(n):e.setAttribute(n,a);break;case"popover":ae("beforetoggle",e),ae("toggle",e),Pl(e,"popover",a);break;case"xlinkActuate":Kt(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Kt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Kt(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Kt(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Kt(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Kt(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Kt(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Kt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Kt(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Pl(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=lm.get(n)||n,Pl(e,n,a))}}function cc(e,t,n,a,l,i){switch(n){case"style":Ic(e,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(d(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(d(60));e.innerHTML=n}}break;case"children":typeof a=="string"?ma(e,a):(typeof a=="number"||typeof a=="bigint")&&ma(e,""+a);break;case"onScroll":a!=null&&ae("scroll",e);break;case"onScrollEnd":a!=null&&ae("scrollend",e);break;case"onClick":a!=null&&(e.onclick=Jt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Qc.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),t=n.slice(2,l?n.length-7:void 0),i=e[it]||null,i=i!=null?i[n]:null,typeof i=="function"&&e.removeEventListener(t,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,a,l);break e}n in e?e[n]=a:a===!0?e.setAttribute(n,""):Pl(e,n,a)}}}function We(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ae("error",e),ae("load",e);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(d(137,t));default:ye(e,t,i,u,n,null)}}l&&ye(e,t,"srcSet",n.srcSet,n,null),a&&ye(e,t,"src",n.src,n,null);return;case"input":ae("invalid",e);var o=i=u=l=null,c=null,g=null;for(a in n)if(n.hasOwnProperty(a)){var x=n[a];if(x!=null)switch(a){case"name":l=x;break;case"type":u=x;break;case"checked":c=x;break;case"defaultChecked":g=x;break;case"value":i=x;break;case"defaultValue":o=x;break;case"children":case"dangerouslySetInnerHTML":if(x!=null)throw Error(d(137,t));break;default:ye(e,t,a,x,n,null)}}Jc(e,i,o,c,g,u,l,!1);return;case"select":ae("invalid",e),a=u=i=null;for(l in n)if(n.hasOwnProperty(l)&&(o=n[l],o!=null))switch(l){case"value":i=o;break;case"defaultValue":u=o;break;case"multiple":a=o;default:ye(e,t,l,o,n,null)}t=i,n=u,e.multiple=!!a,t!=null?da(e,!!a,t,!1):n!=null&&da(e,!!a,n,!0);return;case"textarea":ae("invalid",e),i=l=a=null;for(u in n)if(n.hasOwnProperty(u)&&(o=n[u],o!=null))switch(u){case"value":a=o;break;case"defaultValue":l=o;break;case"children":i=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(d(91));break;default:ye(e,t,u,o,n,null)}Fc(e,a,l,i);return;case"option":for(c in n)if(n.hasOwnProperty(c)&&(a=n[c],a!=null))switch(c){case"selected":e.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:ye(e,t,c,a,n,null)}return;case"dialog":ae("beforetoggle",e),ae("toggle",e),ae("cancel",e),ae("close",e);break;case"iframe":case"object":ae("load",e);break;case"video":case"audio":for(a=0;a<Nl.length;a++)ae(Nl[a],e);break;case"image":ae("error",e),ae("load",e);break;case"details":ae("toggle",e);break;case"embed":case"source":case"link":ae("error",e),ae("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(g in n)if(n.hasOwnProperty(g)&&(a=n[g],a!=null))switch(g){case"children":case"dangerouslySetInnerHTML":throw Error(d(137,t));default:ye(e,t,g,a,n,null)}return;default:if(Su(t)){for(x in n)n.hasOwnProperty(x)&&(a=n[x],a!==void 0&&cc(e,t,x,a,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(a=n[o],a!=null&&ye(e,t,o,a,n,null))}function Oh(e,t,n,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,u=null,o=null,c=null,g=null,x=null;for(y in n){var E=n[y];if(n.hasOwnProperty(y)&&E!=null)switch(y){case"checked":break;case"value":break;case"defaultValue":c=E;default:a.hasOwnProperty(y)||ye(e,t,y,null,a,E)}}for(var v in a){var y=a[v];if(E=n[v],a.hasOwnProperty(v)&&(y!=null||E!=null))switch(v){case"type":i=y;break;case"name":l=y;break;case"checked":g=y;break;case"defaultChecked":x=y;break;case"value":u=y;break;case"defaultValue":o=y;break;case"children":case"dangerouslySetInnerHTML":if(y!=null)throw Error(d(137,t));break;default:y!==E&&ye(e,t,v,y,a,E)}}bu(e,u,o,c,g,x,i,l);return;case"select":y=u=o=v=null;for(i in n)if(c=n[i],n.hasOwnProperty(i)&&c!=null)switch(i){case"value":break;case"multiple":y=c;default:a.hasOwnProperty(i)||ye(e,t,i,null,a,c)}for(l in a)if(i=a[l],c=n[l],a.hasOwnProperty(l)&&(i!=null||c!=null))switch(l){case"value":v=i;break;case"defaultValue":o=i;break;case"multiple":u=i;default:i!==c&&ye(e,t,l,i,a,c)}t=o,n=u,a=y,v!=null?da(e,!!n,v,!1):!!a!=!!n&&(t!=null?da(e,!!n,t,!0):da(e,!!n,n?[]:"",!1));return;case"textarea":y=v=null;for(o in n)if(l=n[o],n.hasOwnProperty(o)&&l!=null&&!a.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:ye(e,t,o,null,a,l)}for(u in a)if(l=a[u],i=n[u],a.hasOwnProperty(u)&&(l!=null||i!=null))switch(u){case"value":v=l;break;case"defaultValue":y=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(d(91));break;default:l!==i&&ye(e,t,u,l,a,i)}Wc(e,v,y);return;case"option":for(var w in n)if(v=n[w],n.hasOwnProperty(w)&&v!=null&&!a.hasOwnProperty(w))switch(w){case"selected":e.selected=!1;break;default:ye(e,t,w,null,a,v)}for(c in a)if(v=a[c],y=n[c],a.hasOwnProperty(c)&&v!==y&&(v!=null||y!=null))switch(c){case"selected":e.selected=v&&typeof v!="function"&&typeof v!="symbol";break;default:ye(e,t,c,v,a,y)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Z in n)v=n[Z],n.hasOwnProperty(Z)&&v!=null&&!a.hasOwnProperty(Z)&&ye(e,t,Z,null,a,v);for(g in a)if(v=a[g],y=n[g],a.hasOwnProperty(g)&&v!==y&&(v!=null||y!=null))switch(g){case"children":case"dangerouslySetInnerHTML":if(v!=null)throw Error(d(137,t));break;default:ye(e,t,g,v,a,y)}return;default:if(Su(t)){for(var be in n)v=n[be],n.hasOwnProperty(be)&&v!==void 0&&!a.hasOwnProperty(be)&&cc(e,t,be,void 0,a,v);for(x in a)v=a[x],y=n[x],!a.hasOwnProperty(x)||v===y||v===void 0&&y===void 0||cc(e,t,x,v,a,y);return}}for(var m in n)v=n[m],n.hasOwnProperty(m)&&v!=null&&!a.hasOwnProperty(m)&&ye(e,t,m,null,a,v);for(E in a)v=a[E],y=n[E],!a.hasOwnProperty(E)||v===y||v==null&&y==null||ye(e,t,E,v,a,y)}function ed(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Rh(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,u=l.initiatorType,o=l.duration;if(i&&o&&ed(u)){for(u=0,o=l.responseEnd,a+=1;a<n.length;a++){var c=n[a],g=c.startTime;if(g>o)break;var x=c.transferSize,E=c.initiatorType;x&&ed(E)&&(c=c.responseEnd,u+=x*(c<o?1:(o-g)/(c-g)))}if(--a,t+=8*(i+u)/(l.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var sc=null,rc=null;function $i(e){return e.nodeType===9?e:e.ownerDocument}function td(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function nd(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function fc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var dc=null;function Uh(){var e=window.event;return e&&e.type==="popstate"?e===dc?!1:(dc=e,!0):(dc=null,!1)}var ad=typeof setTimeout=="function"?setTimeout:void 0,qh=typeof clearTimeout=="function"?clearTimeout:void 0,ld=typeof Promise=="function"?Promise:void 0,Hh=typeof queueMicrotask=="function"?queueMicrotask:typeof ld<"u"?function(e){return ld.resolve(null).then(e).catch(Nh)}:ad;function Nh(e){setTimeout(function(){throw e})}function Rn(e){return e==="head"}function id(e,t){var n=t,a=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){e.removeChild(l),Va(t);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")wl(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,wl(n);for(var i=n.firstChild;i;){var u=i.nextSibling,o=i.nodeName;i[nl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=u}}else n==="body"&&wl(e.ownerDocument.body);n=l}while(n);Va(t)}function ud(e,t){var n=e;e=0;do{var a=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=a}while(n)}function mc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":mc(n),vu(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function Bh(e,t,n,a){for(;e.nodeType===1;){var l=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[nl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==l.rel||e.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||e.getAttribute("title")!==(l.title==null?null:l.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(l.src==null?null:l.src)||e.getAttribute("type")!==(l.type==null?null:l.type)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=Ut(e.nextSibling),e===null)break}return null}function wh(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Ut(e.nextSibling),e===null))return null;return e}function od(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Ut(e.nextSibling),e===null))return null;return e}function hc(e){return e.data==="$?"||e.data==="$~"}function pc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Lh(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var a=function(){t(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function Ut(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var gc=null;function cd(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Ut(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function sd(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function rd(e,t,n){switch(t=$i(n),e){case"html":if(e=t.documentElement,!e)throw Error(d(452));return e;case"head":if(e=t.head,!e)throw Error(d(453));return e;case"body":if(e=t.body,!e)throw Error(d(454));return e;default:throw Error(d(451))}}function wl(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);vu(e)}var qt=new Map,fd=new Set;function Ii(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var fn=q.d;q.d={f:Yh,r:Gh,D:Xh,C:Qh,L:Vh,m:Zh,X:Kh,S:kh,M:Jh};function Yh(){var e=fn.f(),t=Qi();return e||t}function Gh(e){var t=sa(e);t!==null&&t.tag===5&&t.type==="form"?Mr(t):fn.r(e)}var Ga=typeof document>"u"?null:document;function dd(e,t,n){var a=Ga;if(a&&typeof t=="string"&&t){var l=_t(t);l='link[rel="'+e+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),fd.has(l)||(fd.add(l),e={rel:e,crossOrigin:n,href:t},a.querySelector(l)===null&&(t=a.createElement("link"),We(t,"link",e),Ge(t),a.head.appendChild(t)))}}function Xh(e){fn.D(e),dd("dns-prefetch",e,null)}function Qh(e,t){fn.C(e,t),dd("preconnect",e,t)}function Vh(e,t,n){fn.L(e,t,n);var a=Ga;if(a&&e&&t){var l='link[rel="preload"][as="'+_t(t)+'"]';t==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+_t(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+_t(n.imageSizes)+'"]')):l+='[href="'+_t(e)+'"]';var i=l;switch(t){case"style":i=Xa(e);break;case"script":i=Qa(e)}qt.has(i)||(e=O({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),qt.set(i,e),a.querySelector(l)!==null||t==="style"&&a.querySelector(Ll(i))||t==="script"&&a.querySelector(Yl(i))||(t=a.createElement("link"),We(t,"link",e),Ge(t),a.head.appendChild(t)))}}function Zh(e,t){fn.m(e,t);var n=Ga;if(n&&e){var a=t&&typeof t.as=="string"?t.as:"script",l='link[rel="modulepreload"][as="'+_t(a)+'"][href="'+_t(e)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Qa(e)}if(!qt.has(i)&&(e=O({rel:"modulepreload",href:e},t),qt.set(i,e),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Yl(i)))return}a=n.createElement("link"),We(a,"link",e),Ge(a),n.head.appendChild(a)}}}function kh(e,t,n){fn.S(e,t,n);var a=Ga;if(a&&e){var l=ra(a).hoistableStyles,i=Xa(e);t=t||"default";var u=l.get(i);if(!u){var o={loading:0,preload:null};if(u=a.querySelector(Ll(i)))o.loading=5;else{e=O({rel:"stylesheet",href:e,"data-precedence":t},n),(n=qt.get(i))&&vc(e,n);var c=u=a.createElement("link");Ge(c),We(c,"link",e),c._p=new Promise(function(g,x){c.onload=g,c.onerror=x}),c.addEventListener("load",function(){o.loading|=1}),c.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Pi(u,t,a)}u={type:"stylesheet",instance:u,count:1,state:o},l.set(i,u)}}}function Kh(e,t){fn.X(e,t);var n=Ga;if(n&&e){var a=ra(n).hoistableScripts,l=Qa(e),i=a.get(l);i||(i=n.querySelector(Yl(l)),i||(e=O({src:e,async:!0},t),(t=qt.get(l))&&yc(e,t),i=n.createElement("script"),Ge(i),We(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Jh(e,t){fn.M(e,t);var n=Ga;if(n&&e){var a=ra(n).hoistableScripts,l=Qa(e),i=a.get(l);i||(i=n.querySelector(Yl(l)),i||(e=O({src:e,async:!0,type:"module"},t),(t=qt.get(l))&&yc(e,t),i=n.createElement("script"),Ge(i),We(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function md(e,t,n,a){var l=(l=I.current)?Ii(l):null;if(!l)throw Error(d(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=Xa(n.href),n=ra(l).hoistableStyles,a=n.get(t),a||(a={type:"style",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Xa(n.href);var i=ra(l).hoistableStyles,u=i.get(e);if(u||(l=l.ownerDocument||l,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,u),(i=l.querySelector(Ll(e)))&&!i._p&&(u.instance=i,u.state.loading=5),qt.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},qt.set(e,n),i||Wh(l,e,n,u.state))),t&&a===null)throw Error(d(528,""));return u}if(t&&a!==null)throw Error(d(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Qa(n),n=ra(l).hoistableScripts,a=n.get(t),a||(a={type:"script",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(d(444,e))}}function Xa(e){return'href="'+_t(e)+'"'}function Ll(e){return'link[rel="stylesheet"]['+e+"]"}function hd(e){return O({},e,{"data-precedence":e.precedence,precedence:null})}function Wh(e,t,n,a){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=e.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),We(t,"link",n),Ge(t),e.head.appendChild(t))}function Qa(e){return'[src="'+_t(e)+'"]'}function Yl(e){return"script[async]"+e}function pd(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var a=e.querySelector('style[data-href~="'+_t(n.href)+'"]');if(a)return t.instance=a,Ge(a),a;var l=O({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),Ge(a),We(a,"style",l),Pi(a,n.precedence,e),t.instance=a;case"stylesheet":l=Xa(n.href);var i=e.querySelector(Ll(l));if(i)return t.state.loading|=4,t.instance=i,Ge(i),i;a=hd(n),(l=qt.get(l))&&vc(a,l),i=(e.ownerDocument||e).createElement("link"),Ge(i);var u=i;return u._p=new Promise(function(o,c){u.onload=o,u.onerror=c}),We(i,"link",a),t.state.loading|=4,Pi(i,n.precedence,e),t.instance=i;case"script":return i=Qa(n.src),(l=e.querySelector(Yl(i)))?(t.instance=l,Ge(l),l):(a=n,(l=qt.get(i))&&(a=O({},n),yc(a,l)),e=e.ownerDocument||e,l=e.createElement("script"),Ge(l),We(l,"link",a),e.head.appendChild(l),t.instance=l);case"void":return null;default:throw Error(d(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(a=t.instance,t.state.loading|=4,Pi(a,n.precedence,e));return t.instance}function Pi(e,t,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,u=0;u<a.length;u++){var o=a[u];if(o.dataset.precedence===t)i=o;else if(i!==l)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function vc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function yc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var eu=null;function gd(e,t,n){if(eu===null){var a=new Map,l=eu=new Map;l.set(n,a)}else l=eu,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(e))return a;for(a.set(e,null),n=n.getElementsByTagName(e),l=0;l<n.length;l++){var i=n[l];if(!(i[nl]||i[Ze]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var u=i.getAttribute(t)||"";u=e+u;var o=a.get(u);o?o.push(i):a.set(u,[i])}}return a}function vd(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function Fh(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function yd(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function $h(e,t,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=Xa(a.href),i=t.querySelector(Ll(l));if(i){t=i._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=tu.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=i,Ge(i);return}i=t.ownerDocument||t,a=hd(a),(l=qt.get(l))&&vc(a,l),i=i.createElement("link"),Ge(i);var u=i;u._p=new Promise(function(o,c){u.onload=o,u.onerror=c}),We(i,"link",a),n.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=tu.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var bc=0;function Ih(e,t){return e.stylesheets&&e.count===0&&au(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var a=setTimeout(function(){if(e.stylesheets&&au(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+t);0<e.imgBytes&&bc===0&&(bc=62500*Rh());var l=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&au(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>bc?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function tu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)au(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var nu=null;function au(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,nu=new Map,t.forEach(Ph,e),nu=null,tu.call(e))}function Ph(e,t){if(!(t.state.loading&4)){var n=nu.get(e);if(n)var a=n.get(null);else{n=new Map,nu.set(e,n);for(var l=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var u=l[i];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(n.set(u.dataset.precedence,u),a=u)}a&&n.set(null,a)}l=t.instance,u=l.getAttribute("data-precedence"),i=n.get(u)||a,i===a&&n.set(null,l),n.set(u,l),this.count++,a=tu.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(l,e.firstChild)),t.state.loading|=4}}var Gl={$$typeof:Me,Provider:null,Consumer:null,_currentValue:V,_currentValue2:V,_threadCount:0};function ep(e,t,n,a,l,i,u,o,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=mu(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=mu(0),this.hiddenUpdates=mu(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function bd(e,t,n,a,l,i,u,o,c,g,x,E){return e=new ep(e,t,n,u,c,g,x,E,o),t=1,i===!0&&(t|=24),i=pt(3,null,null,t),e.current=i,i.stateNode=e,t=$u(),t.refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:t},to(i),e}function xd(e){return e?(e=xa,e):xa}function Sd(e,t,n,a,l,i){l=xd(l),a.context===null?a.context=l:a.pendingContext=l,a=Sn(t),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=Tn(e,a,t),n!==null&&(ft(n,e,t),bl(n,e,t))}function Td(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function xc(e,t){Td(e,t),(e=e.alternate)&&Td(e,t)}function Ad(e){if(e.tag===13||e.tag===31){var t=Vn(e,67108864);t!==null&&ft(t,e,67108864),xc(e,67108864)}}function Ed(e){if(e.tag===13||e.tag===31){var t=xt();t=hu(t);var n=Vn(e,t);n!==null&&ft(n,e,t),xc(e,t)}}var lu=!0;function tp(e,t,n,a){var l=S.T;S.T=null;var i=q.p;try{q.p=2,Sc(e,t,n,a)}finally{q.p=i,S.T=l}}function np(e,t,n,a){var l=S.T;S.T=null;var i=q.p;try{q.p=8,Sc(e,t,n,a)}finally{q.p=i,S.T=l}}function Sc(e,t,n,a){if(lu){var l=Tc(a);if(l===null)oc(e,t,a,iu,n),_d(e,a);else if(lp(l,e,t,n,a))a.stopPropagation();else if(_d(e,a),t&4&&-1<ap.indexOf(e)){for(;l!==null;){var i=sa(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var u=lt(i.pendingLanes);if(u!==0){var o=i;for(o.pendingLanes|=2,o.entangledLanes|=2;u;){var c=1<<31-Ie(u);o.entanglements[1]|=c,u&=~c}Vt(i),(de&6)===0&&(Gi=Fe()+500,Hl(0))}}break;case 31:case 13:o=Vn(i,2),o!==null&&ft(o,i,2),Qi(),xc(i,2)}if(i=Tc(a),i===null&&oc(e,t,a,iu,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else oc(e,t,a,null,n)}}function Tc(e){return e=Au(e),Ac(e)}var iu=null;function Ac(e){if(iu=null,e=ca(e),e!==null){var t=R(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=B(t),e!==null)return e;e=null}else if(n===31){if(e=N(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return iu=e,null}function zd(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Wl()){case $a:return 2;case Ia:return 8;case Ln:case Fl:return 32;case Pa:return 268435456;default:return 32}default:return 32}}var Ec=!1,Un=null,qn=null,Hn=null,Xl=new Map,Ql=new Map,Nn=[],ap="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function _d(e,t){switch(e){case"focusin":case"focusout":Un=null;break;case"dragenter":case"dragleave":qn=null;break;case"mouseover":case"mouseout":Hn=null;break;case"pointerover":case"pointerout":Xl.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ql.delete(t.pointerId)}}function Vl(e,t,n,a,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},t!==null&&(t=sa(t),t!==null&&Ad(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function lp(e,t,n,a,l){switch(t){case"focusin":return Un=Vl(Un,e,t,n,a,l),!0;case"dragenter":return qn=Vl(qn,e,t,n,a,l),!0;case"mouseover":return Hn=Vl(Hn,e,t,n,a,l),!0;case"pointerover":var i=l.pointerId;return Xl.set(i,Vl(Xl.get(i)||null,e,t,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,Ql.set(i,Vl(Ql.get(i)||null,e,t,n,a,l)),!0}return!1}function Md(e){var t=ca(e.target);if(t!==null){var n=R(t);if(n!==null){if(t=n.tag,t===13){if(t=B(n),t!==null){e.blockedOn=t,Yc(e.priority,function(){Ed(n)});return}}else if(t===31){if(t=N(n),t!==null){e.blockedOn=t,Yc(e.priority,function(){Ed(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function uu(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Tc(e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);Tu=a,n.target.dispatchEvent(a),Tu=null}else return t=sa(n),t!==null&&Ad(t),e.blockedOn=n,!1;t.shift()}return!0}function Dd(e,t,n){uu(e)&&n.delete(t)}function ip(){Ec=!1,Un!==null&&uu(Un)&&(Un=null),qn!==null&&uu(qn)&&(qn=null),Hn!==null&&uu(Hn)&&(Hn=null),Xl.forEach(Dd),Ql.forEach(Dd)}function ou(e,t){e.blockedOn===t&&(e.blockedOn=null,Ec||(Ec=!0,h.unstable_scheduleCallback(h.unstable_NormalPriority,ip)))}var cu=null;function jd(e){cu!==e&&(cu=e,h.unstable_scheduleCallback(h.unstable_NormalPriority,function(){cu===e&&(cu=null);for(var t=0;t<e.length;t+=3){var n=e[t],a=e[t+1],l=e[t+2];if(typeof a!="function"){if(Ac(a||n)===null)continue;break}var i=sa(n);i!==null&&(e.splice(t,3),t-=3,To(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function Va(e){function t(c){return ou(c,e)}Un!==null&&ou(Un,e),qn!==null&&ou(qn,e),Hn!==null&&ou(Hn,e),Xl.forEach(t),Ql.forEach(t);for(var n=0;n<Nn.length;n++){var a=Nn[n];a.blockedOn===e&&(a.blockedOn=null)}for(;0<Nn.length&&(n=Nn[0],n.blockedOn===null);)Md(n),n.blockedOn===null&&Nn.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],u=l[it]||null;if(typeof i=="function")u||jd(n);else if(u){var o=null;if(i&&i.hasAttribute("formAction")){if(l=i,u=i[it]||null)o=u.formAction;else if(Ac(l)!==null)continue}else o=u.action;typeof o=="function"?n[a+1]=o:(n.splice(a,3),a-=3),jd(n)}}}function Cd(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(u){return l=u})},focusReset:"manual",scroll:"manual"})}function t(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),l!==null&&(l(),l=null)}}}function zc(e){this._internalRoot=e}su.prototype.render=zc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(d(409));var n=t.current,a=xt();Sd(n,a,e,t,null,null)},su.prototype.unmount=zc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Sd(e.current,2,null,e,null,null),Qi(),t[oa]=null}};function su(e){this._internalRoot=e}su.prototype.unstable_scheduleHydration=function(e){if(e){var t=Lc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Nn.length&&t!==0&&t<Nn[n].priority;n++);Nn.splice(n,0,e),n===0&&Md(e)}};var Od=j.version;if(Od!=="19.2.4")throw Error(d(527,Od,"19.2.4"));q.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(d(188)):(e=Object.keys(e).join(","),Error(d(268,e)));return e=b(t),e=e!==null?C(e):null,e=e===null?null:e.stateNode,e};var up={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:S,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ru=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ru.isDisabled&&ru.supportsFiber)try{mn=ru.inject(up),$e=ru}catch{}}return kl.createRoot=function(e,t){if(!D(e))throw Error(d(299));var n=!1,a="",l=Br,i=wr,u=Lr;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(u=t.onRecoverableError)),t=bd(e,1,!1,null,null,n,a,null,l,i,u,Cd),e[oa]=t.current,uc(e),new zc(t)},kl.hydrateRoot=function(e,t,n){if(!D(e))throw Error(d(299));var a=!1,l="",i=Br,u=wr,o=Lr,c=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(c=n.formState)),t=bd(e,1,!0,t,n??null,a,l,c,i,u,o,Cd),t.context=xd(null),n=t.current,a=xt(),a=hu(a),l=Sn(a),l.callback=null,Tn(n,l,a),n=a,t.current.lanes=n,tl(t,n),Vt(t),e[oa]=t.current,uc(e),new su(t)},kl.version="19.2.4",kl}var Gd;function yp(){if(Gd)return Dc.exports;Gd=1;function h(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(h)}catch(j){console.error(j)}}return h(),Dc.exports=vp(),Dc.exports}var bp=yp();const xp="modulepreload",Sp=function(h){return"/docs/"+h},Xd={},Te=function(j,T,d){let D=Promise.resolve();if(T&&T.length>0){let B=function(b){return Promise.all(b.map(C=>Promise.resolve(C).then(O=>({status:"fulfilled",value:O}),O=>({status:"rejected",reason:O}))))};document.getElementsByTagName("link");const N=document.querySelector("meta[property=csp-nonce]"),_=(N==null?void 0:N.nonce)||(N==null?void 0:N.getAttribute("nonce"));D=B(T.map(b=>{if(b=Sp(b),b in Xd)return;Xd[b]=!0;const C=b.endsWith(".css"),O=C?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${b}"]${O}`))return;const G=document.createElement("link");if(G.rel=C?"stylesheet":xp,C||(G.as="script"),G.crossOrigin="",G.href=b,_&&G.setAttribute("nonce",_),document.head.appendChild(G),C)return new Promise((oe,Ae)=>{G.addEventListener("load",oe),G.addEventListener("error",()=>Ae(new Error(`Unable to preload CSS for ${b}`)))})}))}function R(B){const N=new Event("vite:preloadError",{cancelable:!0});if(N.payload=B,window.dispatchEvent(N),!N.defaultPrevented)throw B}return D.then(B=>{for(const N of B||[])N.status==="rejected"&&R(N.reason);return j().catch(R)})},fu={amber:{dark:{bg:"#09090b",sf:"#111114",sfH:"#18181c",bd:"#1e1e24",tx:"#e4e4e7",tx2:"#a1a1aa",txM:"#919199",ac:"#e8a845",acD:"rgba(232,168,69,0.12)",acT:"#fbbf24",cdBg:"#0c0c0f",cdTx:"#c4c4cc",sbBg:"#0c0c0e",hdBg:"rgba(9,9,11,0.85)"},light:{bg:"#fafaf9",sf:"#ffffff",sfH:"#f5f5f4",bd:"#e7e5e4",tx:"#1c1917",tx2:"#57534e",txM:"#706b66",ac:"#96640a",acD:"rgba(150,100,10,0.08)",acT:"#7a5208",cdBg:"#f5f3f0",cdTx:"#2c2520",sbBg:"#f5f5f3",hdBg:"rgba(250,250,249,0.85)"},fonts:{heading:"Instrument Serif",body:"DM Sans",code:"JetBrains Mono"}},editorial:{dark:{bg:"#080c1f",sf:"#0e1333",sfH:"#141940",bd:"#1a2050",tx:"#e8e6f0",tx2:"#b5b1c8",txM:"#9490ae",ac:"#ff6b4a",acD:"rgba(255,107,74,0.1)",acT:"#ff8a70",cdBg:"#0a0e27",cdTx:"#b8b4cc",sbBg:"#0a0e27",hdBg:"rgba(8,12,31,0.9)"},light:{bg:"#f6f4f0",sf:"#ffffff",sfH:"#eeece6",bd:"#ddd9d0",tx:"#1a1716",tx2:"#4a443e",txM:"#706960",ac:"#b83d22",acD:"rgba(184,61,34,0.07)",acT:"#9c3019",cdBg:"#edeae4",cdTx:"#3a3530",sbBg:"#f0ede8",hdBg:"rgba(246,244,240,0.92)"},fonts:{heading:"Cormorant Garamond",body:"Bricolage Grotesque",code:"Fira Code"}}},Tp=()=>s.jsx("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:s.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),Ap=()=>s.jsx("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:s.jsx("path",{d:"M18 6L6 18M6 6l12 12"})}),Ep=()=>s.jsx("svg",{width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:s.jsx("path",{d:"M22 2L11 13M22 2l-7 20-4-9-9-4z"})});function Kd(h){let j="You are a helpful documentation assistant. Answer questions accurately based on the documentation provided below. If the answer isn't in the documentation, say so clearly. Keep answers concise and reference specific sections when possible.";if(h){const T=h.length>1e5?h.slice(0,1e5)+`

[Documentation truncated...]`:h;j+=`

Documentation:
${T}`}return j}async function zp(h,j,T,d){var B,N,_;const D=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j}`},body:JSON.stringify({model:T,messages:[{role:"system",content:Kd(d)},...h.map(b=>({role:b.role,content:b.content}))]})});if(!D.ok){const b=await D.text();throw new Error(`OpenAI API error (${D.status}): ${b}`)}return((_=(N=(B=(await D.json()).choices)==null?void 0:B[0])==null?void 0:N.message)==null?void 0:_.content)||"No response."}async function _p(h,j,T,d){var B,N;const D=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":j,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:T,max_tokens:1024,system:Kd(d),messages:h.map(_=>({role:_.role,content:_.content}))})});if(!D.ok){const _=await D.text();throw new Error(`Anthropic API error (${D.status}): ${_}`)}return((N=(B=(await D.json()).content)==null?void 0:B[0])==null?void 0:N.text)||"No response."}function Mp(h){return h==="openai"?"gpt-4o-mini":"claude-sonnet-4-20250514"}function Dp({provider:h,model:j,apiKey:T,context:d}){const[D,R]=Q.useState(!1),[B,N]=Q.useState([]),[_,b]=Q.useState(""),[C,O]=Q.useState(!1),[G,oe]=Q.useState(null),Ae=Q.useRef(null),re=Q.useRef(null),Y=T||(typeof window<"u"?window.__TOME_AI_API_KEY__:void 0),W=j||Mp(h);Q.useEffect(()=>{var F;(F=Ae.current)==null||F.scrollIntoView({behavior:"smooth"})},[B]),Q.useEffect(()=>{D&&setTimeout(()=>{var F;return(F=re.current)==null?void 0:F.focus()},100)},[D]);const xe=Q.useCallback(async()=>{const F=_.trim();if(!F||C||!Y)return;const je={role:"user",content:F},Ee=[...B,je];N(Ee),b(""),O(!0),oe(null);try{let k;h==="openai"?k=await zp(Ee,Y,W,d):k=await _p(Ee,Y,W,d),N(Ue=>[...Ue,{role:"assistant",content:k}])}catch(k){oe(k instanceof Error?k.message:"Failed to get response")}finally{O(!1)}},[_,C,B,h,Y,W,d]),Me=Q.useCallback(F=>{F.key==="Enter"&&!F.shiftKey&&(F.preventDefault(),xe())},[xe]);return D?s.jsxs("div",{"data-testid":"ai-chat-panel",style:{position:"fixed",bottom:24,right:24,zIndex:900,width:380,maxWidth:"calc(100vw - 48px)",height:520,maxHeight:"calc(100vh - 48px)",background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,boxShadow:"0 16px 64px rgba(0,0,0,0.3)",display:"flex",flexDirection:"column",overflow:"hidden",fontFamily:"var(--font-body)"},children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderBottom:"1px solid var(--bd)",flexShrink:0},children:[s.jsx("span",{style:{fontSize:14,fontWeight:600,color:"var(--tx)"},children:"Ask AI"}),s.jsx("button",{"data-testid":"ai-chat-close",onClick:()=>R(!1),"aria-label":"Close AI chat",style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex",padding:4},children:s.jsx(Ap,{})})]}),s.jsxs("div",{style:{flex:1,overflow:"auto",padding:"12px 16px"},children:[!Y&&s.jsxs("div",{"data-testid":"ai-chat-no-key",style:{textAlign:"center",color:"var(--txM)",fontSize:13,padding:"24px 8px",lineHeight:1.6},children:[s.jsx("p",{style:{marginBottom:8,fontWeight:500,color:"var(--tx)"},children:"AI not configured"}),s.jsxs("p",{style:{marginBottom:8},children:["To enable AI chat, set the ",s.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"apiKeyEnv"})," in ",s.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"tome.config.js"})," and provide the environment variable at build time."]}),s.jsxs("p",{style:{fontSize:11.5,color:"var(--txM)"},children:["Example: ",s.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"TOME_AI_KEY=sk-... tome build"})]})]}),B.map((F,je)=>s.jsx("div",{"data-testid":`ai-chat-message-${F.role}`,style:{marginBottom:12,display:"flex",justifyContent:F.role==="user"?"flex-end":"flex-start"},children:s.jsx("div",{style:{maxWidth:"85%",padding:"8px 12px",borderRadius:10,fontSize:13,lineHeight:1.55,whiteSpace:"pre-wrap",wordBreak:"break-word",background:F.role==="user"?"var(--ac)":"var(--cdBg)",color:F.role==="user"?"#fff":"var(--tx)"},children:F.content})},je)),C&&s.jsx("div",{"data-testid":"ai-chat-loading",style:{display:"flex",justifyContent:"flex-start",marginBottom:12},children:s.jsx("div",{style:{padding:"8px 12px",borderRadius:10,fontSize:13,background:"var(--cdBg)",color:"var(--txM)"},children:"Thinking..."})}),G&&s.jsx("div",{"data-testid":"ai-chat-error",style:{padding:"8px 12px",borderRadius:8,fontSize:12,background:"rgba(220,50,50,0.1)",color:"#d44",marginBottom:12},children:G}),s.jsx("div",{ref:Ae})]}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderTop:"1px solid var(--bd)",flexShrink:0},children:[s.jsx("input",{ref:re,"data-testid":"ai-chat-input",value:_,onChange:F=>b(F.target.value),onKeyDown:Me,placeholder:Y?"Ask a question...":"API key required",disabled:!Y,style:{flex:1,background:"var(--cdBg)",border:"1px solid var(--bd)",borderRadius:8,padding:"8px 12px",color:"var(--tx)",fontSize:13,fontFamily:"var(--font-body)",outline:"none"}}),s.jsx("button",{"data-testid":"ai-chat-send",onClick:xe,disabled:!Y||!_.trim()||C,"aria-label":"Send message",style:{width:34,height:34,borderRadius:8,background:Y&&_.trim()?"var(--ac)":"var(--cdBg)",color:Y&&_.trim()?"#fff":"var(--txM)",border:"none",cursor:Y&&_.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:s.jsx(Ep,{})})]})]}):s.jsx("button",{"data-testid":"ai-chat-button",onClick:()=>R(!0),"aria-label":"Open AI chat",style:{position:"fixed",bottom:24,right:24,zIndex:900,width:48,height:48,borderRadius:"50%",background:"var(--ac)",color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(0,0,0,0.25)",transition:"transform 0.15s"},children:s.jsx(Tp,{})})}function jp(h){const j=/^#([0-9a-f]{6})$/i.exec(h.trim());if(!j)return null;const T=parseInt(j[1],16);return[T>>16&255,T>>8&255,T&255]}function Cp(h,j){const T=jp(h);if(!T)return null;const[d,D,R]=T,B=`rgba(${d},${D},${R},${j?.12:.08})`,N=j?1.15:.85,_=Math.min(255,Math.round(d*N)),b=Math.min(255,Math.round(D*N)),C=Math.min(255,Math.round(R*N)),O=`rgb(${_},${b},${C})`;return{ac:h,acD:B,acT:O}}const St=({d:h,size:j=16})=>s.jsx("svg",{width:j,height:j,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:s.jsx("path",{d:h})}),Jd=()=>s.jsx(St,{d:"M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3"}),Qd=()=>s.jsx(St,{d:"M9 18l6-6-6-6",size:14}),Rc=()=>s.jsx(St,{d:"M6 9l6 6 6-6",size:14}),Op=()=>s.jsx(St,{d:"M3 12h18M3 6h18M3 18h18",size:20}),Rp=()=>s.jsx(St,{d:"M18 6L6 18M6 6l12 12",size:18}),Up=()=>s.jsx(St,{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"}),qp=()=>s.jsx(St,{d:"M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"}),Hp=()=>s.jsx(St,{d:"M19 12H5M12 19l-7-7 7-7",size:14}),Np=()=>s.jsx(St,{d:"M5 12h14M12 5l7 7-7 7",size:14}),Bp=()=>s.jsx(St,{d:"M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",size:13});function wp(h){const j=new Date(h),d=new Date().getTime()-j.getTime();if(isNaN(d))return"";const D=Math.floor(d/1e3),R=Math.floor(D/60),B=Math.floor(R/60),N=Math.floor(B/24),_=Math.floor(N/30),b=Math.floor(N/365);return D<60?"just now":R<60?`${R} minute${R===1?"":"s"} ago`:B<24?`${B} hour${B===1?"":"s"} ago`:N<30?`${N} day${N===1?"":"s"} ago`:_<12?`${_} month${_===1?"":"s"} ago`:b>=1?`${b} year${b===1?"":"s"} ago`:j.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}let Za=null;const Lp="/_pagefind/pagefind.js";async function Yp(){if(Za)return Za;try{return Za=await import(Lp),await Za.init(),Za}catch{return null}}let du=null;function Gp(){return du||(du=Te(()=>import("./index-DOi40jo0.js"),[]).catch(()=>null),du)}function Xp({appId:h,apiKey:j,indexName:T,onNavigate:d,onClose:D}){const[R,B]=Q.useState(null),[N,_]=Q.useState(!1);Q.useEffect(()=>{Gp().then(C=>{C&&C.DocSearch?B(()=>C.DocSearch):C&&C.default?B(()=>C.default):_(!0)})},[]);const b=Q.useCallback(C=>{try{return new URL(C,"http://localhost").pathname.replace(/^\//,"").replace(/\/index\.html$/,"").replace(/\.html$/,"")||"index"}catch{return"index"}},[]);return N?s.jsx("div",{onClick:D,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"12vh"},children:s.jsx("div",{onClick:C=>C.stopPropagation(),style:{background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,width:"100%",maxWidth:520,boxShadow:"0 24px 80px rgba(0,0,0,0.4)",padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"Algolia DocSearch is not available. Install @docsearch/react to enable it."})}):R?s.jsx("div",{"data-testid":"algolia-search-modal",children:s.jsx(R,{appId:h,apiKey:j,indexName:T,navigator:{navigate({itemUrl:C}){const O=b(C);d(O)}},hitComponent:({hit:C,children:O})=>s.jsx("a",{href:C.url,onClick:G=>{G.preventDefault();const oe=b(C.url);d(oe)},children:O})})}):s.jsx("div",{onClick:D,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"12vh"},children:s.jsx("div",{style:{background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,width:"100%",maxWidth:520,boxShadow:"0 24px 80px rgba(0,0,0,0.4)",padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"Loading search..."})})}const Qp=()=>s.jsx(St,{d:"M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",size:14}),Vp=()=>s.jsx(St,{d:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z",size:14}),Zp=()=>s.jsx(St,{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3",size:11}),kp={Added:"#22c55e",Changed:"#3b82f6",Deprecated:"#f59e0b",Removed:"#ef4444",Fixed:"#8b5cf6",Security:"#f97316"};function Kp({entries:h}){const[j,T]=Q.useState(h.length<=5),d=j?h:h.slice(0,5);return s.jsxs("div",{"data-testid":"changelog-timeline",style:{position:"relative"},children:[s.jsx("div",{style:{position:"absolute",left:15,top:8,bottom:8,width:2,background:"var(--bd)"}}),d.map((D,R)=>s.jsxs("div",{"data-testid":`changelog-entry-${D.version}`,style:{position:"relative",paddingLeft:44,paddingBottom:R<d.length-1?32:0},children:[s.jsx("div",{style:{position:"absolute",left:8,top:6,width:16,height:16,borderRadius:"50%",background:D.version==="Unreleased"?"var(--txM)":"var(--ac)",border:"3px solid var(--bg, #1a1a1a)"}}),s.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:12,marginBottom:12},children:[s.jsx("span",{style:{fontSize:18,fontWeight:700,color:"var(--tx)",fontFamily:"var(--font-heading, inherit)"},children:D.url?s.jsx("a",{href:D.url,target:"_blank",rel:"noopener noreferrer",style:{color:"inherit",textDecoration:"none"},children:D.version}):D.version}),D.date&&s.jsx("span",{style:{fontSize:13,color:"var(--txM)",fontFamily:"var(--font-code, monospace)"},children:D.date})]}),D.sections.map(B=>{const N=kp[B.type]||"#6b7280";return s.jsxs("div",{style:{marginBottom:16},children:[s.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,marginBottom:8},children:[s.jsx("span",{style:{display:"inline-block",width:8,height:8,borderRadius:"50%",background:N}}),s.jsx("span",{style:{fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em",color:N,fontFamily:"var(--font-code, monospace)"},children:B.type})]}),s.jsx("ul",{style:{margin:0,paddingLeft:18,listStyleType:"disc",color:"var(--tx2)"},children:B.items.map((_,b)=>s.jsx("li",{style:{fontSize:14,lineHeight:1.7,color:"var(--tx2)",marginBottom:2},children:_},b))})]},B.type)})]},D.version)),!j&&h.length>5&&s.jsx("div",{style:{textAlign:"center",marginTop:24},children:s.jsxs("button",{"data-testid":"changelog-show-more",onClick:()=>T(!0),style:{background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"8px 20px",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body, inherit)",cursor:"pointer"},children:["Show all ",h.length," releases"]})})]})}function Jp({config:h,navigation:j,currentPageId:T,pageHtml:d,pageComponent:D,mdxComponents:R,pageTitle:B,pageDescription:N,headings:_,tocEnabled:b=!0,editUrl:C,lastUpdated:O,changelogEntries:G,onNavigate:oe,allPages:Ae,versioning:re,currentVersion:Y,i18n:W,currentLocale:xe,docContext:Me}){var Jl,Fe,Wl,$a,Ia,Ln,Fl,Pa,$l,Il,mn,$e,Nt,Ie;const F=((Jl=h.theme)==null?void 0:Jl.mode)||"auto",[je,Ee]=Q.useState(()=>{var M;return F==="dark"?!0:F==="light"?!1:((M=window.matchMedia)==null?void 0:M.call(window,"(prefers-color-scheme: dark)").matches)??!0}),[k,Ue]=Q.useState(!0),[dt,nt]=Q.useState(!1),[Tt,Qe]=Q.useState(!1),[Zt,At]=Q.useState(!1),mt=re&&Y&&Y!==re.current,[S,q]=Q.useState(j.map(M=>M.section)),V=Q.useRef(null),[me,he]=Q.useState(!0),f=((Fe=h.theme)==null?void 0:Fe.preset)||"amber",z=((Wl=fu[f])==null?void 0:Wl[je?"dark":"light"])||fu.amber.dark,H=($a=h.theme)!=null&&$a.accent?Cp(h.theme.accent,je):null,U=H?{...z,...H}:z,K=((Ia=fu[f])==null?void 0:Ia.fonts)||fu.amber.fonts,I={heading:((Fl=(Ln=h.theme)==null?void 0:Ln.fonts)==null?void 0:Fl.heading)||K.heading,body:(($l=(Pa=h.theme)==null?void 0:Pa.fonts)==null?void 0:$l.body)||K.body,code:((mn=(Il=h.theme)==null?void 0:Il.fonts)==null?void 0:mn.code)||K.code};Q.useEffect(()=>{if(F!=="auto")return;const M=window.matchMedia("(prefers-color-scheme: dark)"),ee=fe=>Ee(fe.matches);return M.addEventListener("change",ee),()=>M.removeEventListener("change",ee)},[F]),Q.useEffect(()=>{document.documentElement.classList.toggle("dark",je)},[je]),Q.useEffect(()=>{const M=()=>he(window.innerWidth>1100);return M(),window.addEventListener("resize",M),()=>window.removeEventListener("resize",M)},[]),Q.useEffect(()=>{var M;(M=V.current)==null||M.scrollTo(0,0)},[T]);const te=h.toc,Ve=(te==null?void 0:te.depth)??3,kt=(te==null?void 0:te.enabled)!==!1&&b,Yt=_.filter(M=>M.depth<=Ve),[Ka,aa]=Q.useState("");Q.useEffect(()=>{if(!kt||Yt.length<2)return;const M=V.current;if(!M)return;const ee=setTimeout(()=>{const fe=[];for(const at of Yt){const Et=M.querySelector(`#${CSS.escape(at.id)}`);Et&&fe.push(Et)}if(fe.length===0)return;const Pe=new IntersectionObserver(at=>{const Et=at.filter(lt=>lt.isIntersecting).sort((lt,ua)=>lt.boundingClientRect.top-ua.boundingClientRect.top);Et.length>0&&aa(Et[0].target.id)},{root:M,rootMargin:"0px 0px -80% 0px",threshold:0});for(const at of fe)Pe.observe(at);Ht.current=Pe},100);return()=>{var fe;clearTimeout(ee),(fe=Ht.current)==null||fe.disconnect(),Ht.current=null}},[T,kt,Yt.map(M=>M.id).join(",")]);const Ht=Q.useRef(null);Q.useEffect(()=>{aa("")},[T]);const Ja=Q.useCallback((M,ee)=>{M.preventDefault();const fe=V.current;if(!fe)return;const Pe=fe.querySelector(`#${CSS.escape(ee)}`);Pe&&(Pe.scrollIntoView({behavior:"smooth",block:"start"}),aa(ee))},[]);Q.useEffect(()=>{const M=ee=>{(ee.metaKey||ee.ctrlKey)&&ee.key==="k"&&(ee.preventDefault(),nt(!0)),ee.key==="Escape"&&nt(!1)};return window.addEventListener("keydown",M),()=>window.removeEventListener("keydown",M)},[]);const dn=j.flatMap(M=>M.pages),la=dn.findIndex(M=>M.id===T),ia=la>0?dn[la-1]:null,wn=la<dn.length-1?dn[la+1]:null,Wa=M=>q(ee=>ee.includes(M)?ee.filter(fe=>fe!==M):[...ee,M]),Fa={"--bg":U.bg,"--sf":U.sf,"--sfH":U.sfH,"--bd":U.bd,"--tx":U.tx,"--tx2":U.tx2,"--txM":U.txM,"--ac":U.ac,"--acD":U.acD,"--acT":U.acT,"--cdBg":U.cdBg,"--cdTx":U.cdTx,"--sbBg":U.sbBg,"--hdBg":U.hdBg,"--font-heading":`"${I.heading}", serif`,"--font-body":`"${I.body}", sans-serif`,"--font-code":`"${I.code}", monospace`},Kl=D;return s.jsxs("div",{className:"tome-grain",style:{...Fa,color:"var(--tx)",background:"var(--bg)",fontFamily:"var(--font-body)",minHeight:"100vh"},children:[dt&&(($e=h.search)==null?void 0:$e.provider)==="algolia"&&h.search.appId&&h.search.apiKey&&h.search.indexName?s.jsx(Xp,{appId:h.search.appId,apiKey:h.search.apiKey,indexName:h.search.indexName,onNavigate:M=>{oe(M),nt(!1)},onClose:()=>nt(!1)}):dt?s.jsx(Wp,{allPages:Ae,onNavigate:M=>{oe(M),nt(!1)},onClose:()=>nt(!1)}):null,s.jsxs("div",{style:{display:"flex",height:"100vh"},children:[s.jsxs("aside",{style:{width:k?270:0,minWidth:k?270:0,background:"var(--sbBg)",borderRight:"1px solid var(--bd)",display:"flex",flexDirection:"column",transition:"width .2s, min-width .2s",overflow:"hidden"},children:[s.jsxs("a",{href:"/",style:{padding:"18px 20px",display:"flex",alignItems:"baseline",gap:6,borderBottom:"1px solid var(--bd)",textDecoration:"none",color:"inherit"},children:[s.jsx("span",{style:{fontFamily:"var(--font-heading)",fontSize:22,fontWeight:700,fontStyle:"italic"},children:h.name}),s.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:"var(--ac)",display:"inline-block"}})]}),s.jsx("div",{style:{padding:"12px 14px"},children:s.jsxs("button",{onClick:()=>nt(!0),style:{display:"flex",alignItems:"center",gap:8,width:"100%",background:"var(--cdBg)",border:"1px solid var(--bd)",borderRadius:2,padding:"8px 12px",cursor:"pointer",color:"var(--txM)",fontSize:12.5,fontFamily:"var(--font-body)"},children:[s.jsx(Jd,{}),s.jsx("span",{style:{flex:1,textAlign:"left"},children:"Search..."}),s.jsx("kbd",{style:{fontFamily:"var(--font-code)",fontSize:9,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"2px 6px"},children:"⌘K"})]})}),s.jsx("nav",{style:{flex:1,overflow:"auto",padding:"4px 10px 20px"},children:j.map(M=>s.jsxs("div",{style:{marginBottom:8},children:[s.jsxs("button",{onClick:()=>Wa(M.section),style:{display:"flex",alignItems:"center",gap:6,width:"100%",background:"none",border:"none",padding:"8px 10px",cursor:"pointer",borderRadius:2,color:"var(--txM)",fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",fontFamily:"var(--font-code)"},children:[S.includes(M.section)?s.jsx(Rc,{}):s.jsx(Qd,{}),M.section]}),S.includes(M.section)&&s.jsx("div",{style:{marginLeft:8,borderLeft:"1px solid var(--bd)",paddingLeft:0},children:M.pages.map(ee=>{const fe=T===ee.id;return s.jsx("button",{onClick:()=>oe(ee.id),style:{display:"flex",alignItems:"center",gap:10,width:"100%",textAlign:"left",background:"none",border:"none",borderRadius:0,borderLeft:fe?"2px solid var(--ac)":"2px solid transparent",padding:"7px 14px",cursor:"pointer",color:fe?"var(--ac)":"var(--tx2)",fontSize:13,fontWeight:fe?500:400,fontFamily:"var(--font-body)",transition:"all .12s"},children:ee.title},ee.id)})})]},M.section))}),s.jsxs("div",{style:{padding:"12px 16px",borderTop:"1px solid var(--bd)",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[F==="auto"?s.jsx("button",{onClick:()=>Ee(M=>!M),style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex"},children:je?s.jsx(qp,{}):s.jsx(Up,{})}):s.jsx("div",{}),s.jsx("span",{style:{fontFamily:"var(--font-code)",fontSize:10,color:"var(--txM)"},children:"v0.0.0"})]})]}),s.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"},children:[s.jsxs("header",{style:{display:"flex",alignItems:"center",gap:12,padding:"10px 24px",borderBottom:"1px solid var(--bd)",background:"var(--hdBg)",backdropFilter:"blur(12px)"},children:[s.jsx("button",{onClick:()=>Ue(!k),style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex"},children:k?s.jsx(Rp,{}):s.jsx(Op,{})}),s.jsx("div",{style:{display:"flex",alignItems:"center",gap:8,fontFamily:"var(--font-code)",fontSize:11,color:"var(--txM)",letterSpacing:".03em",flex:1},children:j.map(M=>{const ee=M.pages.find(fe=>fe.id===T);return ee?s.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[s.jsx("span",{children:M.section}),s.jsx(Qd,{}),s.jsx("span",{style:{color:"var(--ac)"},children:ee.title})]},M.section):null})}),h.topNav&&h.topNav.length>0&&s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[h.topNav.map(M=>{const ee=M.href.startsWith("http")||!M.href.startsWith("#");return s.jsxs("a",{href:M.href,...ee?{target:"_blank",rel:"noopener noreferrer"}:{},style:{display:"flex",alignItems:"center",gap:4,color:"var(--txM)",textDecoration:"none",fontSize:12,fontFamily:"var(--font-body)",fontWeight:500,transition:"color .15s"},onMouseOver:fe=>fe.currentTarget.style.color="var(--ac)",onMouseOut:fe=>fe.currentTarget.style.color="var(--txM)",children:[M.label,ee&&s.jsx(Zp,{})]},M.label)}),s.jsx("span",{style:{width:1,height:16,background:"var(--bd)"}})]}),re&&s.jsxs("div",{style:{position:"relative"},children:[s.jsxs("button",{"data-testid":"version-switcher",onClick:()=>Qe(M=>!M),style:{display:"flex",alignItems:"center",gap:6,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"5px 10px",cursor:"pointer",color:"var(--tx2)",fontSize:12,fontFamily:"var(--font-code)"},children:[s.jsx(Qp,{}),Y||re.current,s.jsx(Rc,{})]}),Tt&&s.jsx("div",{"data-testid":"version-dropdown",style:{position:"absolute",top:"100%",right:0,marginTop:4,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",overflow:"hidden",zIndex:100,minWidth:120},children:re.versions.map(M=>s.jsxs("button",{onClick:()=>{Qe(!1);const ee=M===re.current?"/":`/${M}`;window.location.href=ee},style:{display:"block",width:"100%",textAlign:"left",background:M===(Y||re.current)?"var(--acD)":"none",border:"none",padding:"8px 14px",cursor:"pointer",color:M===(Y||re.current)?"var(--ac)":"var(--tx2)",fontSize:12,fontFamily:"var(--font-code)",fontWeight:M===re.current?600:400},children:[M,M===re.current?" (latest)":""]},M))})]}),W&&W.locales.length>1&&s.jsxs("div",{style:{position:"relative"},children:[s.jsxs("button",{"data-testid":"language-switcher",onClick:()=>At(M=>!M),style:{display:"flex",alignItems:"center",gap:6,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"5px 10px",cursor:"pointer",color:"var(--tx2)",fontSize:12,fontFamily:"var(--font-body)"},children:[s.jsx(Vp,{}),((Nt=W.localeNames)==null?void 0:Nt[xe||W.defaultLocale])||xe||W.defaultLocale,s.jsx(Rc,{})]}),Zt&&s.jsx("div",{"data-testid":"language-dropdown",style:{position:"absolute",top:"100%",right:0,marginTop:4,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",overflow:"hidden",zIndex:100,minWidth:120},children:W.locales.map(M=>{var lt;const ee=M===(xe||W.defaultLocale),fe=((lt=W.localeNames)==null?void 0:lt[M])||M,Pe=xe||W.defaultLocale;let at=T;Pe!==W.defaultLocale&&T.startsWith(`${Pe}/`)&&(at=T.slice(Pe.length+1));const Et=M===W.defaultLocale?at:`${M}/${at}`;return s.jsx("button",{onClick:()=>{At(!1),oe(Et)},style:{display:"block",width:"100%",textAlign:"left",background:ee?"var(--acD)":"none",border:"none",padding:"8px 14px",cursor:"pointer",color:ee?"var(--ac)":"var(--tx2)",fontSize:12,fontFamily:"var(--font-body)",fontWeight:ee?600:400},children:fe},M)})})]})]}),mt&&s.jsxs("div",{"data-testid":"old-version-banner",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"var(--acD)",borderBottom:"1px solid var(--bd)",padding:"8px 24px",fontSize:13,color:"var(--tx2)"},children:[s.jsxs("span",{children:["You're viewing docs for ",Y,"."]}),s.jsx("button",{onClick:()=>{window.location.href="/"},style:{background:"none",border:"none",color:"var(--ac)",cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"var(--font-body)",textDecoration:"underline"},children:"Switch to latest."})]}),s.jsxs("div",{ref:V,style:{flex:1,overflow:"auto",display:"flex"},children:[s.jsxs("main",{style:{flex:1,maxWidth:760,padding:"40px 48px 80px",margin:"0 auto"},children:[s.jsx("h1",{style:{fontFamily:"var(--font-heading)",fontSize:38,fontWeight:400,fontStyle:"italic",lineHeight:1.15,marginBottom:8},children:B}),N&&s.jsx("p",{style:{fontSize:16,color:"var(--tx2)",lineHeight:1.6,marginBottom:32},children:N}),s.jsx("div",{style:{borderTop:"1px solid var(--bd)",paddingTop:28},children:G&&G.length>0?s.jsx(Kp,{entries:G}):Kl?s.jsx("div",{className:"tome-content",children:s.jsx(Kl,{components:R||{}})}):s.jsx("div",{className:"tome-content",dangerouslySetInnerHTML:{__html:(d||"").replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/,"")}})}),(C||O)&&s.jsxs("div",{style:{marginTop:40,display:"flex",alignItems:"center",justifyContent:"space-between",gap:16},children:[C&&s.jsx("div",{"data-testid":"edit-page-link",children:s.jsxs("a",{href:C,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:6,color:"var(--txM)",textDecoration:"none",fontSize:13,fontFamily:"var(--font-body)",transition:"color .15s"},onMouseOver:M=>M.currentTarget.style.color="var(--ac)",onMouseOut:M=>M.currentTarget.style.color="var(--txM)",children:[s.jsx(Bp,{})," Edit this page on GitHub"]})}),O&&s.jsxs("div",{"data-testid":"last-updated",style:{fontSize:12,color:"var(--txM)",fontFamily:"var(--font-body)"},children:["Last updated ",wp(O)]})]}),s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:C||O?16:48,paddingTop:24,borderTop:"1px solid var(--bd)",gap:16},children:[ia?s.jsxs("button",{onClick:()=>oe(ia.id),style:{display:"flex",alignItems:"center",gap:8,background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"10px 16px",cursor:"pointer",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body)",transition:"border-color .15s, color .15s"},children:[s.jsx(Hp,{})," ",ia.title]}):s.jsx("div",{}),wn?s.jsxs("button",{onClick:()=>oe(wn.id),style:{display:"flex",alignItems:"center",gap:8,background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"10px 16px",cursor:"pointer",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body)",transition:"border-color .15s, color .15s"},children:[wn.title," ",s.jsx(Np,{})]}):s.jsx("div",{})]})]}),kt&&Yt.length>=2&&me&&s.jsxs("aside",{"data-testid":"toc-sidebar",style:{width:200,padding:"40px 16px 40px 0",position:"sticky",top:0,alignSelf:"flex-start",flexShrink:0},children:[s.jsx("div",{style:{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",color:"var(--txM)",marginBottom:12,fontFamily:"var(--font-code)"},children:"On this page"}),s.jsx("nav",{"aria-label":"Table of contents",style:{borderLeft:"1px solid var(--bd)",paddingLeft:0},children:Yt.map((M,ee)=>{const fe=Ka===M.id;return s.jsx("a",{href:`#${M.id}`,onClick:Pe=>Ja(Pe,M.id),"data-testid":`toc-link-${M.id}`,style:{display:"block",fontSize:12,color:fe?"var(--ac)":"var(--txM)",fontWeight:fe?500:400,textDecoration:"none",padding:"4px 12px",paddingLeft:12+(M.depth-2)*12,lineHeight:1.4,transition:"color .15s, font-weight .15s",borderLeft:fe?"2px solid var(--ac)":"2px solid transparent",marginLeft:-1},children:M.text},ee)})})]})]})]})]}),((Ie=h.ai)==null?void 0:Ie.enabled)&&s.jsx(Dp,{provider:h.ai.provider||"anthropic",model:h.ai.model,apiKey:typeof __TOME_AI_API_KEY__<"u"&&__TOME_AI_API_KEY__?__TOME_AI_API_KEY__:void 0,context:(Me==null?void 0:Me.map(M=>`## ${M.title}
${M.content}`).join(`

`))??Ae.map(M=>`- ${M.title}${M.description?": "+M.description:""}`).join(`
`)})]})}function Wp({allPages:h,onNavigate:j,onClose:T}){const[d,D]=Q.useState(""),[R,B]=Q.useState([]),[N,_]=Q.useState(0),[b,C]=Q.useState(null),O=Q.useRef(null),G=Q.useRef(void 0);Q.useEffect(()=>{Yp().then(Y=>C(!!Y)),setTimeout(()=>{var Y;return(Y=O.current)==null?void 0:Y.focus()},50)},[]);const oe=Q.useCallback(Y=>{if(!Y.trim())return[];const W=Y.toLowerCase();return h.filter(xe=>xe.title.toLowerCase().includes(W)||(xe.description||"").toLowerCase().includes(W)).slice(0,8).map(xe=>({id:xe.id,title:xe.title,excerpt:xe.description}))},[h]),Ae=Q.useCallback(async Y=>{var xe;if(!Y.trim()){B([]),_(0);return}const W=Za;if(W)try{const Me=await W.search(Y),F=[];for(const je of Me.results.slice(0,8)){const Ee=await je.data(),Ue=(Ee.url||"").replace(/^\//,"").replace(/\/index\.html$/,"").replace(/\.html$/,"")||"index";F.push({id:Ue,title:((xe=Ee.meta)==null?void 0:xe.title)||Ue,excerpt:Ee.excerpt||void 0})}B(F),_(0);return}catch{}B(oe(Y)),_(0)},[oe]);Q.useEffect(()=>(G.current&&clearTimeout(G.current),G.current=setTimeout(()=>Ae(d),120),()=>{G.current&&clearTimeout(G.current)}),[d,Ae]);const re=Q.useCallback(Y=>{Y.key==="ArrowDown"?(Y.preventDefault(),_(W=>Math.min(W+1,R.length-1))):Y.key==="ArrowUp"?(Y.preventDefault(),_(W=>Math.max(W-1,0))):Y.key==="Enter"&&R.length>0&&(Y.preventDefault(),j(R[N].id))},[R,N,j]);return s.jsx("div",{onClick:T,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"12vh"},children:s.jsxs("div",{onClick:Y=>Y.stopPropagation(),style:{background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,width:"100%",maxWidth:520,boxShadow:"0 24px 80px rgba(0,0,0,0.4)",overflow:"hidden"},children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--bd)"},children:[s.jsx(Jd,{}),s.jsx("input",{ref:O,value:d,onChange:Y=>D(Y.target.value),onKeyDown:re,placeholder:"Search documentation...",style:{flex:1,background:"none",border:"none",outline:"none",color:"var(--tx)",fontSize:15,fontFamily:"var(--font-body)"}}),s.jsx("kbd",{style:{fontFamily:"var(--font-code)",fontSize:10,color:"var(--txM)",background:"var(--cdBg)",padding:"2px 6px",borderRadius:2,border:"1px solid var(--bd)"},children:"ESC"})]}),R.length>0&&s.jsx("div",{style:{padding:6,maxHeight:360,overflow:"auto"},children:R.map((Y,W)=>s.jsxs("button",{onClick:()=>j(Y.id),style:{display:"block",width:"100%",textAlign:"left",background:W===N?"var(--acD)":"none",border:"none",borderRadius:2,padding:"10px 14px",cursor:"pointer",color:"var(--tx)",fontFamily:"var(--font-body)"},onMouseEnter:()=>_(W),children:[s.jsx("div",{style:{fontWeight:500,fontSize:14,marginBottom:2},children:Y.title}),Y.excerpt&&s.jsx("div",{style:{fontSize:12,color:"var(--txM)",lineHeight:1.3},dangerouslySetInnerHTML:{__html:Y.excerpt}})]},Y.id+W))}),d&&!R.length&&s.jsx("div",{style:{padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"No results found"}),b===!1&&d&&R.length>0&&s.jsx("div",{style:{padding:"6px 18px 10px",fontSize:11,color:"var(--txM)",textAlign:"center"},children:"Showing title matches. Build your site for full-text search."})]})})}const Uc={name:"Tome",basePath:"/docs/",theme:{preset:"editorial",mode:"auto"},navigation:[{group:"Getting Started",pages:["index","quickstart","installation","project-structure"]},{group:"Core Concepts",pages:["configuration","pages-routing","components","theming"]},{group:"API Reference",pages:["api-overview","api-endpoints","api-auth"]},{group:"Advanced",pages:["guides/search","guides/versioning","concepts/architecture"]},{group:"CLI",pages:["cli"]}],search:{provider:"local"},toc:{enabled:!0,depth:3},strictLinks:!1,lastUpdated:!0,topNav:[{label:"Home",href:"/"},{label:"Dashboard",href:"/dashboard"}]},ka=[{id:"api-auth",filePath:"api-auth.md",urlPath:"/api-auth",frontmatter:{title:"Authentication",description:"Configure API authentication for the interactive playground — Bearer tokens, API keys, and custom headers.",icon:"lock",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"api-endpoints",filePath:"api-endpoints.md",urlPath:"/api-endpoints",frontmatter:{title:"Endpoints",description:"How Tome renders API endpoints from your OpenAPI spec — methods, parameters, schemas, and the interactive playground.",icon:"globe",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"api-overview",filePath:"api-overview.md",urlPath:"/api-overview",frontmatter:{title:"Overview",description:"Generate interactive API documentation from OpenAPI specs with Tome.",icon:"code",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"cli",filePath:"cli.md",urlPath:"/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"components",filePath:"components.md",urlPath:"/components",frontmatter:{title:"Components",description:"Built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.",icon:"puzzle",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"concepts/architecture",filePath:"concepts/architecture.md",urlPath:"/concepts/architecture",frontmatter:{title:"Architecture",description:"How Tome works internally — the Vite plugin, virtual modules, build pipeline, and theme system.",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"concepts/file-routing",filePath:"concepts/file-routing.md",urlPath:"/concepts/file-routing",frontmatter:{title:"File-System Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"configuration",filePath:"configuration.md",urlPath:"/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"guides/api-reference",filePath:"guides/api-reference.md",urlPath:"/guides/api-reference",frontmatter:{title:"API Reference Setup",description:"How to generate an interactive API reference from an OpenAPI specification in Tome.",icon:"code",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"guides/configuration",filePath:"guides/configuration.md",urlPath:"/guides/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"guides/custom-theme",filePath:"guides/custom-theme.md",urlPath:"/guides/custom-theme",frontmatter:{title:"Custom Theme",description:"How to customize your Tome site's appearance — presets, accent colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"guides/search",filePath:"guides/search.md",urlPath:"/guides/search",frontmatter:{title:"Search",description:"How to set up search in your Tome documentation site — built-in Pagefind and optional Algolia DocSearch.",icon:"search",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"guides/versioning",filePath:"guides/versioning.md",urlPath:"/guides/versioning",frontmatter:{title:"Multi-Version Docs",description:"How to maintain multiple versions of your documentation with Tome's built-in versioning system.",icon:"layers",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"index",filePath:"index.md",urlPath:"/",frontmatter:{title:"Introduction",description:"Tome is an open-source documentation platform for Markdown and MDX. Beautiful docs without the $250/month price tag.",hidden:!1},isMdx:!1,lastUpdated:"2026-03-10T20:29:35-04:00"},{id:"installation",filePath:"installation.md",urlPath:"/installation",frontmatter:{title:"Installation",description:"System requirements and detailed installation instructions for Tome.",icon:"download",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"pages-routing",filePath:"pages-routing.md",urlPath:"/pages-routing",frontmatter:{title:"Pages & Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",icon:"map",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"project-structure",filePath:"project-structure.md",urlPath:"/project-structure",frontmatter:{title:"Project Structure",description:"How a Tome documentation project is organized — pages, config, entry point, and build output.",icon:"folder",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"quickstart",filePath:"quickstart.md",urlPath:"/quickstart",frontmatter:{title:"Quickstart",description:"Get a Tome documentation site running in under a minute.",icon:"zap",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"reference/cli",filePath:"reference/cli.md",urlPath:"/reference/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T13:40:20-04:00"},{id:"reference/components",filePath:"reference/components.md",urlPath:"/reference/components",frontmatter:{title:"Components",description:"Reference for all built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.",icon:"puzzle",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"reference/config",filePath:"reference/config.md",urlPath:"/reference/config",frontmatter:{title:"Config Reference",description:"Complete reference for every field in tome.config.js — types, defaults, and descriptions.",icon:"file-text",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"reference/frontmatter",filePath:"reference/frontmatter.md",urlPath:"/reference/frontmatter",frontmatter:{title:"Frontmatter",description:"Reference for all YAML frontmatter fields supported in Tome documentation pages.",icon:"file-text",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"reference/theme-presets",filePath:"reference/theme-presets.md",urlPath:"/reference/theme-presets",frontmatter:{title:"Theme Presets",description:"Detailed reference for Tome's built-in theme presets — color tokens, CSS variables, and font stacks.",icon:"swatches",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"theming",filePath:"theming.md",urlPath:"/theming",frontmatter:{title:"Theming",description:"Customize the look of your Tome site — presets, colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"tutorials/deploy-to-cloud",filePath:"tutorials/deploy-to-cloud.md",urlPath:"/tutorials/deploy-to-cloud",frontmatter:{title:"Deploy to Tome Cloud",description:"Publish your documentation site to Tome Cloud with a single command. Includes custom domain setup.",icon:"cloud",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T13:40:20-04:00"},{id:"tutorials/first-site",filePath:"tutorials/first-site.md",urlPath:"/tutorials/first-site",frontmatter:{title:"Create Your First Site",description:"A step-by-step tutorial that walks you through creating a documentation site with Tome, from installation to running the dev server.",icon:"rocket",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"}],Fp=[{section:"Getting Started",pages:[{title:"Introduction",id:"index",urlPath:"/"},{title:"Quickstart",id:"quickstart",urlPath:"/quickstart",icon:"zap"},{title:"Installation",id:"installation",urlPath:"/installation",icon:"download"},{title:"Project Structure",id:"project-structure",urlPath:"/project-structure",icon:"folder"}]},{section:"Core Concepts",pages:[{title:"Configuration",id:"configuration",urlPath:"/configuration",icon:"gear"},{title:"Pages & Routing",id:"pages-routing",urlPath:"/pages-routing",icon:"map"},{title:"Components",id:"components",urlPath:"/components",icon:"puzzle"},{title:"Theming",id:"theming",urlPath:"/theming",icon:"palette"}]},{section:"API Reference",pages:[{title:"Overview",id:"api-overview",urlPath:"/api-overview",icon:"code"},{title:"Endpoints",id:"api-endpoints",urlPath:"/api-endpoints",icon:"globe"},{title:"Authentication",id:"api-auth",urlPath:"/api-auth",icon:"lock"}]},{section:"Advanced",pages:[{title:"Search",id:"guides/search",urlPath:"/guides/search",icon:"search"},{title:"Multi-Version Docs",id:"guides/versioning",urlPath:"/guides/versioning",icon:"layers"},{title:"Architecture",id:"concepts/architecture",urlPath:"/concepts/architecture"}]},{section:"CLI",pages:[{title:"CLI Reference",id:"cli",urlPath:"/cli",icon:"terminal"}]}],$p={"api-auth":()=>Te(()=>import("./api-auth-iquypsJv.js"),[]),"api-endpoints":()=>Te(()=>import("./api-endpoints-g3zD2Jzx.js"),[]),"api-overview":()=>Te(()=>import("./api-overview-BppOPRNS.js"),[]),cli:()=>Te(()=>import("./cli-Dp-POWJ4.js"),[]),components:()=>Te(()=>import("./components-CRdpR1id.js"),[]),"concepts/architecture":()=>Te(()=>import("./architecture-CtsvaR8y.js"),[]),"concepts/file-routing":()=>Te(()=>import("./file-routing-CweRi1rb.js"),[]),configuration:()=>Te(()=>import("./configuration-B3sMc8MF.js"),[]),"guides/api-reference":()=>Te(()=>import("./api-reference-B97X_dIz.js"),[]),"guides/configuration":()=>Te(()=>import("./configuration-Br9dBdZs.js"),[]),"guides/custom-theme":()=>Te(()=>import("./custom-theme-C01Coe39.js"),[]),"guides/search":()=>Te(()=>import("./search-G5_8Ofls.js"),[]),"guides/versioning":()=>Te(()=>import("./versioning-C021AZ2p.js"),[]),index:()=>Te(()=>import("./index-BNNn9igC.js"),[]),installation:()=>Te(()=>import("./installation-s6uC7Eih.js"),[]),"pages-routing":()=>Te(()=>import("./pages-routing-AtkGVzBQ.js"),[]),"project-structure":()=>Te(()=>import("./project-structure-CSuYv1wC.js"),[]),quickstart:()=>Te(()=>import("./quickstart-C5w7YpAz.js"),[]),"reference/cli":()=>Te(()=>import("./cli-DHXW4gfw.js"),[]),"reference/components":()=>Te(()=>import("./components-DgzCMmWu.js"),[]),"reference/config":()=>Te(()=>import("./config-zDarjfAU.js"),[]),"reference/frontmatter":()=>Te(()=>import("./frontmatter-T0RnHfcv.js"),[]),"reference/theme-presets":()=>Te(()=>import("./theme-presets-B-Ez_Wsn.js"),[]),theming:()=>Te(()=>import("./theming-BLhsk6un.js"),[]),"tutorials/deploy-to-cloud":()=>Te(()=>import("./deploy-to-cloud-Df6P2YWO.js"),[]),"tutorials/first-site":()=>Te(()=>import("./first-site-CVCwzQR7.js"),[])};function Ip(h){const j=$p[h];return j?j():Promise.resolve({default:null})}const Pp=[{id:"api-auth",title:"Authentication",content:`
The API playground supports several authentication methods. Users can enter credentials that are included in test requests.

## Configuration

Add auth settings to your API config:

\`\`\`javascript
export default {
  api: {
    spec: "./openapi.yaml",
    playground: {
      enabled: true,
      auth: {
        type: "bearer",  // "bearer", "apiKey", or "basic"
      },
    },
  },
};
\`\`\`

## Bearer token

The most common pattern for modern APIs. A token input appears in the playground header:

\`\`\`javascript
auth: {
  type: "bearer",
}
\`\`\`

Requests include the header:
\`\`\`
Authorization: Bearer <user-entered-token>
\`\`\`

## API key

For APIs that use key-based authentication:

\`\`\`javascript
auth: {
  type: "apiKey",
  name: "X-API-Key",     // Header name
  in: "header",          // "header" or "query"
}
\`\`\`

When \`in\` is \`"query"\`, the key is appended as a URL parameter instead.

## Basic auth

For username/password authentication:

\`\`\`javascript
auth: {
  type: "basic",
}
\`\`\`

The playground shows username and password fields. The value is sent as a Base64-encoded \`Authorization: Basic\` header.

## OpenAPI security schemes

If your OpenAPI spec defines security schemes, Tome reads them automatically:

\`\`\`yaml
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
\`\`\`

When security schemes are defined in the spec, Tome uses them instead of the manual config. You don't need to configure \`auth\` separately.

## Security notes

- Credentials entered in the playground are stored only in browser memory for the current session
- Credentials are never sent to Tome's servers — requests go directly from the browser to your API
- CORS must be enabled on your API server for playground requests to work
- For production APIs, consider providing a sandbox environment URL through the \`baseUrl\` config
`},{id:"api-endpoints",title:"Endpoints",content:`
Tome renders each API operation from your OpenAPI spec as a structured endpoint section with method badges, parameter tables, request/response schemas, and an optional interactive playground.

## Endpoint layout

Each endpoint displays:

1. **Method badge** — Color-coded (GET, POST, PUT, DELETE, PATCH)
2. **Path** — The endpoint URL with path parameters highlighted
3. **Description** — From the operation's \`summary\` and \`description\` fields
4. **Parameters** — Path, query, and header parameters in a table
5. **Request body** — Schema rendered with types and descriptions
6. **Responses** — Status codes with response schemas

## Tag grouping

Endpoints are organized by their OpenAPI tags. Each tag becomes a section heading:

\`\`\`yaml
paths:
  /users:
    get:
      tags: [Users]
      summary: List all users
  /users/{id}:
    get:
      tags: [Users]
      summary: Get user by ID
  /projects:
    get:
      tags: [Projects]
      summary: List projects
\`\`\`

This generates two groups: "Users" with two endpoints and "Projects" with one.

## Parameter rendering

Parameters are rendered in a table with type information:

| Name | Type | In | Required | Description |
|------|------|----|----------|-------------|
| \`id\` | string | path | yes | The user ID |
| \`limit\` | integer | query | no | Max results (default: 20) |
| \`offset\` | integer | query | no | Pagination offset |

## Schema display

Request and response schemas are rendered recursively. Nested objects show their properties with types:

\`\`\`
UserResponse {
  id: string          — Unique identifier
  name: string        — Display name
  email: string       — Email address
  created_at: string  — ISO 8601 timestamp
  settings: {
    theme: string     — "light" or "dark"
    locale: string    — Language code
  }
}
\`\`\`

Arrays, enums, and \`oneOf\`/\`anyOf\` unions are all supported.

## Interactive playground

When \`playground.enabled\` is true in your config, each endpoint gets a "Try it" section where users can:

- Fill in path and query parameters
- Edit the request body as JSON
- Set authentication headers
- Send the request and view the response

\`\`\`javascript
api: {
  spec: "./openapi.yaml",
  playground: {
    enabled: true,
    baseUrl: "https://api.example.com",  // Override base URL
  },
},
\`\`\`

The playground uses \`fetch\` directly from the browser. CORS must be enabled on your API for cross-origin requests.
`},{id:"api-overview",title:"Overview",content:`
Tome generates a complete API reference from an OpenAPI 3.x specification. Point it at a spec file and get rendered endpoint documentation with an interactive playground — no manual writing required.

## Setup

Add the \`api\` section to your \`tome.config.js\`:

\`\`\`javascript
export default {
  name: "My API Docs",
  api: {
    spec: "./openapi.yaml",   // Path to your OpenAPI spec
    playground: {
      enabled: true,          // Enable interactive playground
    },
  },
};
\`\`\`

Tome parses the spec at build time and generates:

- Endpoint listing organized by tags
- Request/response schema documentation
- Parameter tables with types and descriptions
- An interactive playground for testing endpoints

## Supported formats

| Format | Extension |
|--------|-----------|
| OpenAPI 3.0 | \`.json\`, \`.yaml\`, \`.yml\` |
| OpenAPI 3.1 | \`.json\`, \`.yaml\`, \`.yml\` |

Swagger 2.x specs are not directly supported. Convert them first using tools like \`swagger2openapi\`.

## What gets generated

From a single spec file, Tome creates:

- **Endpoint pages** — Each operation (GET, POST, PUT, DELETE) gets its own section with method, path, description, and parameters.
- **Schema documentation** — Request bodies and response objects are rendered with type information.
- **Tag grouping** — Operations are organized by their OpenAPI tags.
- **Try it** — The playground lets users send real requests with custom parameters and see responses.

## Spec organization

For the best results, make sure your OpenAPI spec includes:

- Descriptive \`summary\` and \`description\` fields on each operation
- Tags to group related endpoints
- Schema definitions with \`description\` fields
- Example values for parameters and request bodies

## Next steps

- **[Endpoints](#api-endpoints)** for details on how endpoints are rendered
- **[Authentication](#api-auth)** for configuring auth in the playground
`},{id:"cli",title:"CLI Reference",content:`
The \`tome\` CLI is the primary interface for creating, developing, building, and deploying documentation sites.

## Installation

\`\`\`bash
npm install -D @tomehq/cli
# or globally
npm install -g @tomehq/cli
\`\`\`

## Commands

### \`tome init [name]\`

Create a new Tome documentation project.

\`\`\`bash
tome init my-docs
\`\`\`

| Argument | Default | Description |
|----------|---------|-------------|
| \`name\` | \`my-docs\` | Project directory name |

| Flag | Default | Description |
|------|---------|-------------|
| \`-t, --template <name>\` | \`default\` | Starter template |

Creates \`tome.config.js\`, \`package.json\`, \`index.html\`, \`.tome/entry.tsx\`, starter pages in \`pages/\`, and \`public/\` and \`styles/\` directories.

---

### \`tome dev\`

Start the development server with hot reloading.

\`\`\`bash
tome dev
tome dev -p 4000
tome dev --host
\`\`\`

| Flag | Default | Description |
|------|---------|-------------|
| \`-p, --port <number>\` | \`3000\` | Server port |
| \`--host\` | \`false\` | Expose to network (bind \`0.0.0.0\`) |

Watches \`pages/\` for file changes and reloads automatically. Config changes trigger a full reload.

---

### \`tome build\`

Build the documentation site for production.

\`\`\`bash
tome build
tome build -o dist
\`\`\`

| Flag | Default | Description |
|------|---------|-------------|
| \`-o, --outDir <dir>\` | \`out\` | Output directory |

Produces a static site and runs Pagefind to build the search index.

---

### \`tome deploy\`

Deploy the site to Tome Cloud. Requires \`tome login\` first.

\`\`\`bash
tome deploy
\`\`\`

Builds, collects output files, and uploads using hash-based deduplication.

---

### \`tome login\`

Authenticate with Tome Cloud.

\`\`\`bash
tome login
\`\`\`

Prompts for email and sends a magic link. Stores the API token locally.

---

### \`tome domains:add <domain>\`

Add a custom domain. Returns DNS records to configure.

\`\`\`bash
tome domains:add docs.example.com
\`\`\`

### \`tome domains:verify <domain>\`

Verify DNS configuration for a custom domain.

\`\`\`bash
tome domains:verify docs.example.com
\`\`\`

### \`tome domains:list\`

List all custom domains for the current project.

### \`tome domains:remove <domain>\`

Remove a custom domain.

---

### \`tome algolia:init\`

Initialize an Algolia DocSearch index. Prompts for credentials and creates a crawler configuration.

---

### \`tome mcp\`

Start the MCP (Model Context Protocol) stdio server for AI tool integration. Exposes documentation content as MCP resources and tools.
`},{id:"components",title:"Components",content:`
Tome includes a set of built-in components available in any \`.mdx\` file. No imports needed — they're injected automatically.

## Callout

Highlight important information with a styled callout:

\`\`\`mdx
<Callout title="Important">
  This is critical information that users should not miss.
</Callout>
\`\`\`

Callouts support a \`type\` prop for different styles:

| Type | Use case |
|------|----------|
| \`info\` | General information (default) |
| \`warning\` | Cautions and potential issues |
| \`error\` | Critical warnings and breaking changes |
| \`tip\` | Helpful suggestions and best practices |

\`\`\`mdx
<Callout type="warning" title="Deprecation Notice">
  This API endpoint will be removed in v3.0.
</Callout>
\`\`\`

## Tabs

Present content variants — useful for multiple languages or platform-specific instructions:

\`\`\`mdx
<Tabs items={["npm", "pnpm", "yarn"]}>
  <Tab>npm install @tomehq/cli</Tab>
  <Tab>pnpm add @tomehq/cli</Tab>
  <Tab>yarn add @tomehq/cli</Tab>
</Tabs>
\`\`\`

The active tab persists across page navigations within the same session.

## Card

Link to related pages or external resources:

\`\`\`mdx
<Card title="Quickstart" href="#quickstart">
  Get up and running in under a minute.
</Card>
\`\`\`

### Card group

Arrange cards in a responsive grid:

\`\`\`mdx
<CardGroup cols={3}>
  <Card title="Setup">Step 1</Card>
  <Card title="Configure">Step 2</Card>
  <Card title="Deploy">Step 3</Card>
</CardGroup>
\`\`\`

The \`cols\` prop accepts \`2\`, \`3\`, or \`4\`. Defaults to \`2\`.

## Steps

Ordered procedural instructions with visual step indicators:

\`\`\`mdx
<Steps>
  <Step title="Install dependencies">
    Run \`npm install\` in your project directory.
  </Step>
  <Step title="Configure">
    Edit \`tome.config.js\` with your settings.
  </Step>
  <Step title="Deploy">
    Run \`tome deploy\` to publish your site.
  </Step>
</Steps>
\`\`\`

## Accordion

Collapsible content sections for FAQs or optional details:

\`\`\`mdx
<Accordion title="How do I deploy?">
  Run \`npx tome deploy\` from your project directory. See the deployment guide for details.
</Accordion>
\`\`\`

Multiple accordions stack vertically. Only one opens at a time by default.

## Using components

Components are only available in \`.mdx\` files. If your file uses the \`.md\` extension, rename it to \`.mdx\` to enable component support.

\`\`\`
pages/
├── index.md          # Standard Markdown only
├── quickstart.mdx    # Markdown + components
\`\`\`

No import statements are needed. Tome injects all built-in components automatically:

\`\`\`mdx
---
title: Getting Started
---

# Getting Started

<Callout type="tip" title="Prerequisites">
  Make sure you have Node.js 18+ installed.
</Callout>

<Steps>
  <Step title="Create project">
    Run \`npx @tomehq/cli init my-docs\`
  </Step>
  <Step title="Start dev server">
    Run \`npm run dev\`
  </Step>
</Steps>
\`\`\`
`},{id:"concepts/architecture",title:"Architecture",content:`
Tome is built on Vite and React. Understanding the architecture helps when debugging build issues or building advanced customizations.

## Overview

A Tome site is a Vite application with a custom plugin that handles page discovery, routing, and content processing. The theme package provides the React UI shell.

\`\`\`text
tome.config.js  →  Vite Plugin  →  Virtual Modules  →  Theme Shell  →  Static Site
\`\`\`

## Vite plugin

The core of Tome is \`vite-plugin-tome\` in \`@tomehq/core\`. It has three responsibilities:

**1. Page discovery** — On startup, the plugin scans \`pages/\` for \`.md\` and \`.mdx\` files, extracts frontmatter, and builds a route table. It watches for file changes during development and triggers hot reloads.

**2. Virtual modules** — The plugin exposes content through Vite's virtual module system:

| Module | Contents |
|--------|----------|
| \`virtual:tome/config\` | The resolved config as JSON |
| \`virtual:tome/routes\` | Route table with IDs, URLs, and frontmatter |
| \`virtual:tome/page/:id\` | Processed page content |
| \`virtual:tome/api\` | Parsed OpenAPI manifest |
| \`virtual:tome/analytics\` | Analytics provider settings |

**3. Build-time generation** — During builds, the plugin injects analytics scripts and generates the \`mcp.json\` manifest.

## Theme system

The theme package (\`@tomehq/theme\`) provides the React shell:

- **Shell component** — Header, sidebar, content area, footer
- **Preset system** — Color tokens and CSS variables per preset
- **Search integration** — Pagefind or Algolia, loaded dynamically
- **AI chat** — Optional floating widget

The entry point (\`.tome/entry.tsx\`) bootstraps the shell by importing \`@tomehq/theme/entry\`.

## Content pipeline

### Markdown (\`.md\`)

1. Frontmatter extracted via \`gray-matter\`
2. Markdown processed to HTML (syntax highlighting, GFM tables, headings)
3. HTML + headings + frontmatter served as virtual module

### MDX (\`.mdx\`)

1. Frontmatter and headings extracted from raw source
2. File passed to \`@mdx-js/rollup\` for JSX compilation
3. Virtual module re-exports the compiled React component + metadata

## Build output

\`\`\`text
out/
├── index.html           # SPA entry
├── assets/
│   ├── index-[hash].js  # Application bundle
│   └── index-[hash].css # Styles
├── _pagefind/           # Search index
├── mcp.json             # MCP manifest
└── 404.html             # Error page
\`\`\`

The output is a single-page application. Search is fully static.

## Package structure

| Package | Purpose |
|---------|---------|
| \`@tomehq/cli\` | CLI commands (init, dev, build, deploy) |
| \`@tomehq/core\` | Config, routing, Vite plugin, markdown processing |
| \`@tomehq/theme\` | Shell UI, presets, search, AI chat |
| \`@tomehq/components\` | MDX components (Callout, Tabs, Card, etc.) |
`},{id:"concepts/file-routing",title:"File-System Routing",content:"\nEvery `.md` or `.mdx` file in the `pages/` directory becomes a page. The file path determines the URL.\n\n## Basic routing\n\n| File path | URL |\n|-----------|-----|\n| `pages/index.md` | `/` |\n| `pages/quickstart.md` | `/quickstart` |\n| `pages/guides/deployment.md` | `/guides/deployment` |\n| `pages/api/endpoints.md` | `/api/endpoints` |\n| `pages/api/index.md` | `/api` |\n\n**Rules:**\n\n- `index.md` serves at the directory's root path\n- File extensions are stripped from the URL\n- Directory nesting maps directly to URL segments\n\n## Page IDs\n\nEach page has an ID derived from its path relative to `pages/`:\n\n| File | Page ID |\n|------|---------|\n| `pages/index.md` | `index` |\n| `pages/quickstart.md` | `quickstart` |\n| `pages/guides/deployment.md` | `guides/deployment` |\n\nPage IDs are used in `navigation` config to control sidebar order.\n\n## Navigation vs. routing\n\nAll pages in `pages/` are routable regardless of whether they appear in `navigation`. Navigation only controls the sidebar.\n\nPages can be hidden from the sidebar using `hidden: true` in frontmatter while remaining accessible at their URL.\n\n## i18n routing\n\nWhen multiple locales are configured, organize pages by locale subdirectory:\n\n```text\npages/\n├── en/            # Default locale\n│   ├── index.md\n│   └── quickstart.md\n├── es/            # Spanish\n│   ├── index.md\n│   └── quickstart.md\n```\n\n| File | URL |\n|------|-----|\n| `pages/en/index.md` | `/` (default — no prefix) |\n| `pages/es/index.md` | `/es/` |\n| `pages/es/quickstart.md` | `/es/quickstart` |\n\nThe default locale serves at the root without a prefix. When `fallback: true` and a page doesn't exist in a non-default locale, the default version is used.\n\n## Versioned routing\n\nWhen versioning is configured:\n\n```text\npages/\n├── current/       # Latest version\n│   ├── index.md\n│   └── api.md\n├── v1.0/\n│   ├── index.md\n│   └── api.md\n```\n\n| File | URL |\n|------|-----|\n| `pages/current/index.md` | `/` |\n| `pages/v1.0/index.md` | `/v1.0/` |\n| `pages/v1.0/api.md` | `/v1.0/api` |\n\nThe `current` directory serves at the root. Older versions are prefixed.\n\n## File discovery\n\nTome discovers pages by scanning `pages/` for `**/*.{md,mdx}` files. Discovery runs at startup and again whenever files are added, removed, or renamed during development.\n"},{id:"configuration",title:"Configuration",content:`
All site configuration lives in \`tome.config.js\` (or \`.mjs\` / \`.ts\`) at your project root. Tome validates the config with Zod and provides clear error messages if anything is wrong.

## Minimal config

\`\`\`javascript
export default {
  name: "My Docs",
};
\`\`\`

This is all you need. Tome uses sensible defaults for everything else.

## Site metadata

\`\`\`javascript
export default {
  name: "My Docs",
  logo: "/logo.svg",        // Path relative to public/
  favicon: "/favicon.ico",  // Path relative to public/
  baseUrl: "https://docs.example.com",
};
\`\`\`

\`baseUrl\` is used for generating canonical URLs and analytics endpoints. It should be the full URL where your site is hosted.

## Navigation

The \`navigation\` array defines your sidebar structure. Each group has a label and a list of page IDs (filenames without extensions):

\`\`\`javascript
navigation: [
  {
    group: "Getting Started",
    pages: ["index", "quickstart"],
  },
  {
    group: "API",
    pages: ["api/authentication", "api/endpoints", "api/errors"],
  },
],
\`\`\`

Pages not listed in navigation still exist at their URL — they're just hidden from the sidebar.

### Nested groups

Groups can be nested for complex documentation structures:

\`\`\`javascript
navigation: [
  {
    group: "SDK",
    pages: [
      "sdk/overview",
      {
        group: "Languages",
        pages: ["sdk/javascript", "sdk/python", "sdk/go"],
      },
    ],
  },
],
\`\`\`

## Top navigation

Add links to the header bar:

\`\`\`javascript
topNav: [
  { label: "Blog", href: "https://blog.example.com" },
  { label: "Changelog", href: "/changelog" },
],
\`\`\`

## Theme

\`\`\`javascript
theme: {
  preset: "editorial",   // "amber" or "editorial"
  accent: "#ff6b4a",     // Custom accent color (hex)
  mode: "auto",          // "light", "dark", or "auto"
  fonts: {
    heading: "Playfair Display",
    body: "Source Sans Pro",
    code: "Fira Code",
  },
},
\`\`\`

See **[Theming](#theming)** for full customization details.

## Base path

If your docs are served under a subpath (e.g., \`example.com/docs/\`), set \`basePath\`:

\`\`\`javascript
basePath: "/docs/",
\`\`\`

This configures Vite's \`base\` option so all asset paths resolve correctly.

## Search

Pagefind is enabled by default with no configuration. To use Algolia DocSearch instead:

\`\`\`javascript
search: {
  provider: "algolia",
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_SEARCH_KEY",
  indexName: "your-index",
},
\`\`\`

## Full example

\`\`\`javascript
export default {
  name: "Acme Docs",
  logo: "/acme-logo.svg",
  favicon: "/favicon.ico",
  baseUrl: "https://docs.acme.com",
  theme: {
    preset: "editorial",
    accent: "#2563eb",
    mode: "auto",
  },
  navigation: [
    { group: "Overview", pages: ["index", "quickstart"] },
    { group: "Guides", pages: ["guides/auth", "guides/deploy"] },
    { group: "API", pages: ["api/rest", "api/webhooks"] },
  ],
  topNav: [
    { label: "Changelog", href: "/changelog" },
  ],
  search: { provider: "local" },
};
\`\`\`
`},{id:"guides/api-reference",title:"API Reference Setup",content:`
Tome can generate a full API reference from an OpenAPI 3.x specification. The reference includes endpoint documentation, request/response schemas, and an interactive playground for testing endpoints.

## 1. Add your OpenAPI spec

Place your OpenAPI spec file (JSON or YAML) in your project:

\`\`\`text
my-docs/
├── openapi.yaml      # Your API spec
├── tome.config.js
└── pages/
\`\`\`

## 2. Configure Tome

Add the \`api\` section to your config:

\`\`\`javascript
export default {
  name: "My API Docs",
  api: {
    spec: "./openapi.yaml",
    playground: true,
    baseUrl: "https://api.example.com",
    auth: {
      type: "bearer",
      header: "Authorization",
    },
  },
};
\`\`\`

### Options

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| \`spec\` | string | — | Path to your OpenAPI spec file (required) |
| \`playground\` | boolean | \`true\` | Enable the interactive API playground |
| \`baseUrl\` | string | — | Base URL for playground requests |
| \`auth.type\` | string | — | Auth type: \`"bearer"\`, \`"apiKey"\`, or \`"oauth2"\` |
| \`auth.header\` | string | — | Header name for the auth token |

## 3. View the reference

Start the dev server and navigate to \`/api\`. Tome parses the spec and renders:

- **Endpoint groups** organized by OpenAPI tags
- **Request parameters** with types, descriptions, and required markers
- **Response schemas** with expandable nested objects
- **Code examples** for \`curl\`, JavaScript, and Python

## 4. Interactive playground

When \`playground: true\`, each endpoint includes a "Try It" panel where users can:

- Set path parameters and query strings
- Edit the request body with JSON validation
- Add authentication headers
- Send requests and view formatted responses

The playground sends requests directly from the browser, so CORS must be configured on your API server.

## Supported spec formats

Tome supports OpenAPI 3.0 and 3.1 specifications in JSON or YAML format. Swagger 2.x specs are not supported — convert them with tools like \`swagger2openapi\`.
`},{id:"guides/configuration",title:"Configuration",content:`
All site configuration lives in \`tome.config.js\` (or \`.mjs\` / \`.ts\`) at your project root. Tome validates the config with Zod and provides clear error messages if anything is wrong.

## Minimal config

\`\`\`javascript
export default {
  name: "My Docs",
};
\`\`\`

This is all you need. Tome uses sensible defaults for everything else.

## Site metadata

\`\`\`javascript
export default {
  name: "My Docs",
  logo: "/logo.svg",        // Path relative to public/
  favicon: "/favicon.ico",  // Path relative to public/
  baseUrl: "https://docs.example.com",
};
\`\`\`

\`baseUrl\` is used for generating canonical URLs and analytics endpoints. It should be the full URL where your site is hosted.

## Navigation

The \`navigation\` array defines your sidebar structure. Each group has a label and a list of page IDs (filenames without extensions):

\`\`\`javascript
navigation: [
  {
    group: "Getting Started",
    pages: ["index", "quickstart"],
  },
  {
    group: "API",
    pages: ["api/authentication", "api/endpoints", "api/errors"],
  },
],
\`\`\`

Pages not listed in navigation still exist at their URL — they're just hidden from the sidebar.

### Nested groups

Groups can be nested for complex documentation structures:

\`\`\`javascript
navigation: [
  {
    group: "SDK",
    pages: [
      "sdk/overview",
      {
        group: "Languages",
        pages: ["sdk/javascript", "sdk/python", "sdk/go"],
      },
    ],
  },
],
\`\`\`

## Top navigation

Add links to the header bar:

\`\`\`javascript
topNav: [
  { label: "Blog", href: "https://blog.example.com" },
  { label: "GitHub", href: "https://github.com/example/docs" },
],
\`\`\`

## Theme

See the [Custom theme guide](/docs/guides/custom-theme) for full details.

\`\`\`javascript
theme: {
  preset: "editorial",   // "amber" or "editorial"
  accent: "#ff6b4a",     // Custom accent color (hex)
  mode: "auto",          // "light", "dark", or "auto"
  fonts: {
    heading: "Playfair Display",
    body: "Source Sans Pro",
    code: "Fira Code",
  },
},
\`\`\`

## Base path

If your docs are served under a subpath (e.g., \`example.com/docs/\`), set \`basePath\`:

\`\`\`javascript
basePath: "/docs/",
\`\`\`

This configures Vite's \`base\` option so all asset paths resolve correctly.

## Full example

\`\`\`javascript
export default {
  name: "Acme Docs",
  logo: "/acme-logo.svg",
  favicon: "/favicon.ico",
  baseUrl: "https://docs.acme.com",
  theme: {
    preset: "editorial",
    accent: "#2563eb",
    mode: "auto",
  },
  navigation: [
    { group: "Overview", pages: ["index", "quickstart"] },
    { group: "Guides", pages: ["guides/auth", "guides/deploy"] },
    { group: "API", pages: ["api/rest", "api/webhooks"] },
  ],
  topNav: [
    { label: "GitHub", href: "https://github.com/acme/docs" },
  ],
  search: { provider: "local" },
};
\`\`\`

See the [Config reference](/docs/reference/config) for every available field.
`},{id:"guides/custom-theme",title:"Custom Theme",content:`
Tome ships with two theme presets and extensive customization options. Every visual aspect — colors, fonts, spacing — can be adjusted through configuration or CSS variables.

## Presets

Choose between two built-in presets:

### Amber (default)

A warm, approachable aesthetic with golden accent tones. Good for developer documentation and technical guides.

\`\`\`javascript
theme: {
  preset: "amber",
}
\`\`\`

### Editorial

A refined, high-contrast aesthetic inspired by Swiss poster design and literary magazines. Features serif headings and a more dramatic visual presence.

\`\`\`javascript
theme: {
  preset: "editorial",
}
\`\`\`

See [Theme presets reference](/docs/reference/theme-presets) for the exact color values.

## Accent color

Override the preset's accent color with any hex value:

\`\`\`javascript
theme: {
  preset: "amber",
  accent: "#2563eb",  // Blue accent instead of amber
}
\`\`\`

Tome derives tint and dim variants automatically from your accent color.

## Color mode

Control dark/light mode behavior:

| Value | Behavior |
|-------|----------|
| \`"auto"\` | Follows system preference (default) |
| \`"light"\` | Always light mode |
| \`"dark"\` | Always dark mode |

Users can toggle the mode using the theme switch in the header.

## Custom fonts

Override any font family. Make sure to add the appropriate \`<link>\` tag to \`index.html\` if using custom Google Fonts.

\`\`\`javascript
theme: {
  fonts: {
    heading: "Playfair Display",
    body: "Source Sans Pro",
    code: "Fira Code",
  },
}
\`\`\`

## CSS variables

For fine-grained control, override CSS variables in a custom stylesheet. The key variables are:

| Variable | Description |
|----------|-------------|
| \`--ac\` | Accent color |
| \`--acD\` | Accent dark variant |
| \`--acT\` | Accent tint |
| \`--bg\` | Page background |
| \`--sf\` | Surface (cards, sidebar) |
| \`--sfH\` | Surface hover state |
| \`--bd\` | Border color |
| \`--tx\` | Primary text |
| \`--tx2\` | Secondary text |
| \`--txM\` | Muted text |

See the [Theme presets reference](/docs/reference/theme-presets) for the complete variable list with values per preset.

## Border radius

Adjust the global border radius:

\`\`\`javascript
theme: {
  radius: "4px",   // Sharper corners
  radius: "12px",  // Rounder corners
}
\`\`\`
`},{id:"guides/search",title:"Search",content:`
Tome includes search out of the box. No configuration is needed for the default experience — Pagefind indexes your site at build time and provides fast, client-side search with zero external dependencies.

## Built-in search (Pagefind)

Pagefind is the default search provider. It runs automatically during \`tome build\`:

1. Tome builds your static site to \`out/\`
2. Pagefind indexes all HTML pages
3. The search index is placed in \`out/_pagefind/\`
4. The search UI loads the index on demand (< 1KB initial JS)

No configuration required. Search is available on every page via the header search bar or the \`Ctrl+K\` / \`Cmd+K\` keyboard shortcut.

\`\`\`javascript
// Default — can be omitted entirely
search: {
  provider: "local",
}
\`\`\`

## Algolia DocSearch

For larger documentation sites, you can use Algolia DocSearch as an alternative:

\`\`\`javascript
search: {
  provider: "algolia",
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_SEARCH_API_KEY",
  indexName: "your-index-name",
}
\`\`\`

### Initialize the Algolia index

Tome includes a helper command to set up your Algolia index:

\`\`\`bash
npx tome algolia:init
\`\`\`

This creates a crawler configuration optimized for Tome's HTML structure.

### When to use Algolia

| Feature | Pagefind | Algolia |
|---------|----------|---------|
| Setup | Zero config | Requires account |
| Cost | Free | Free tier available |
| Index size | Unlimited | 10K records free |
| Typo tolerance | Basic | Advanced |
| Analytics | No | Yes |
| Real-time indexing | At build time | Crawler-based |

For most documentation sites, Pagefind is sufficient. Consider Algolia if you need search analytics, advanced typo tolerance, or real-time indexing.
`},{id:"guides/versioning",title:"Multi-Version Docs",content:`
Tome supports maintaining multiple versions of your documentation side by side. This is useful for libraries and APIs that need to document breaking changes across major versions.

## Directory structure

Organize your pages by version using subdirectories:

\`\`\`text
pages/
├── current/          # Latest version
│   ├── index.md
│   ├── quickstart.md
│   └── api.md
├── v1.0/             # Previous version
│   ├── index.md
│   ├── quickstart.md
│   └── api.md
└── v0.9/             # Older version
    ├── index.md
    └── api.md
\`\`\`

## Configuration

Add the \`versioning\` section to your config:

\`\`\`javascript
export default {
  name: "My Docs",
  versioning: {
    current: "v2.0",
    versions: ["v2.0", "v1.0", "v0.9"],
  },
};
\`\`\`

| Field | Type | Description |
|-------|------|-------------|
| \`current\` | string | The label for the current (latest) version |
| \`versions\` | string[] | All available versions, newest first |

## URL mapping

| Directory | URL |
|-----------|-----|
| \`pages/current/index.md\` | \`/\` |
| \`pages/current/api.md\` | \`/api\` |
| \`pages/v1.0/index.md\` | \`/v1.0/\` |
| \`pages/v1.0/api.md\` | \`/v1.0/api\` |

The \`current\` directory always serves at the root — no version prefix. Older versions are prefixed with their version string.

## Version switcher

When versioning is configured, Tome automatically adds a version dropdown to the header. Users can switch between versions, and the URL updates to reflect the selected version.

If the current page exists in the target version, the user stays on that page. Otherwise, they're redirected to the version's index page.

## Best practices

- Keep the \`current\` directory as your working copy
- Copy \`current\` to a versioned directory (e.g., \`v2.0\`) when you cut a release
- Remove pages from old versions that no longer apply rather than leaving stale content
- Use the same page IDs across versions so the version switcher can navigate between them
`},{id:"index",title:"Introduction",content:`
# Tome

Welcome to Tome — beautiful documentation, zero vendor lock-in.

---

Tome is an open-source documentation platform built for developers who believe great docs shouldn't cost $250/month. Write in Markdown or MDX, deploy anywhere, and own your content forever.

## What is Tome?

Tome transforms your Markdown and MDX files into stunning, fully-searchable documentation sites. It handles navigation, theming, API references, code highlighting, and versioning — all from a simple folder of \`.md\` and \`.mdx\` files.

> **OPEN SOURCE FOREVER**
>
> Tome is MIT licensed. No vendor lock-in, no surprise pricing changes, no feature gates. Your docs are yours.

## Why Tome?

Documentation platforms have become unreasonably expensive. Most charge hundreds per month for features that should be table stakes. Want custom domains? Pay more. Need versioning? Upgrade your plan. Multiple projects? That'll be $250/month — per project.

We built Tome because we thought that was absurd. Every developer and team deserves polished, professional documentation without paying a premium for basic functionality. Tome gives you everything you need for free when self-hosted, or at a fraction of the cost on our cloud.

\`\`\`bash
# Get started in 30 seconds
npx @tomehq/cli init my-docs
cd my-docs && npm install && npm run dev
\`\`\`

## Features

- **Markdown and MDX** — Write docs in \`.md\` or use \`.mdx\` for interactive components like tabs, callouts, and code playgrounds.
- **File-system routing** — Drop files into \`pages/\` and they become pages. No router config, no manifest files.
- **Built-in components** — Callouts, tabs, cards, steps, accordions, and API playgrounds work out of the box.
- **Two theme presets** — Ship with a warm amber aesthetic or an editorial brutalist look. Both support dark mode.
- **Search included** — Pagefind indexes your site at build time. No external service required.
- **API reference** — Point Tome at an OpenAPI spec and get a rendered reference with an interactive playground.
- **Versioning** — Maintain multiple documentation versions side by side with a version switcher.
- **i18n** — Serve docs in multiple languages with locale-based routing.
- **Deploy anywhere** — Static output works on Vercel, Netlify, Cloudflare Pages, or Tome Cloud.

## Learn more

- **[Quickstart](#quickstart)** — Get a docs site running in under a minute.
- **[Installation](#installation)** — Detailed setup instructions and prerequisites.
- **[Configuration](#configuration)** — Customize your site name, navigation, theme, and more.
- **[CLI Reference](#cli)** — Every command and flag available in the \`tome\` CLI.
`},{id:"installation",title:"Installation",content:`
Tome requires Node.js and works with npm, pnpm, or yarn.

## Prerequisites

| Requirement | Minimum |
|-------------|---------|
| Node.js | 18.0 or higher |
| Package manager | npm, pnpm, or yarn |

## Create a new project

The fastest way to start is with the CLI:

\`\`\`bash
npx @tomehq/cli init my-docs
\`\`\`

This creates a new directory with everything you need:

\`\`\`
my-docs/
├── pages/
│   ├── index.md
│   ├── quickstart.md
│   └── components.mdx
├── .tome/
│   └── entry.tsx
├── tome.config.js
├── index.html
├── package.json
└── .gitignore
\`\`\`

## Install dependencies

\`\`\`bash
cd my-docs
npm install
\`\`\`

Or with pnpm / yarn:

\`\`\`bash
pnpm install
# or
yarn install
\`\`\`

## Start the dev server

\`\`\`bash
npm run dev
\`\`\`

The dev server starts at \`http://localhost:3000\` with hot reload enabled. Changes to any \`.md\` or \`.mdx\` file in \`pages/\` trigger an instant refresh. Config changes in \`tome.config.js\` trigger a full reload.

## Add to an existing project

If you already have a project and want to add Tome documentation:

\`\`\`bash
npm install @tomehq/cli @tomehq/theme react react-dom
\`\`\`

Create the required files:

**\`tome.config.js\`**
\`\`\`javascript
export default {
  name: "My Project Docs",
  navigation: [
    { group: "Docs", pages: ["index"] },
  ],
};
\`\`\`

**\`pages/index.md\`**
\`\`\`markdown
---
title: Introduction
---

# Welcome

Your documentation starts here.
\`\`\`

**\`index.html\`**
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Docs</title>
</head>
<body>
  <div id="tome-root"></div>
  <script type="module" src=".tome/entry.tsx"><\/script>
</body>
</html>
\`\`\`

**\`.tome/entry.tsx\`**
\`\`\`tsx
import "@tomehq/theme/entry";
\`\`\`

Add scripts to \`package.json\`:

\`\`\`json
{
  "scripts": {
    "dev": "tome dev",
    "build": "tome build"
  }
}
\`\`\`

## Next steps

- **[Project Structure](#project-structure)** to understand how files are organized
- **[Configuration](#configuration)** to customize your site
`},{id:"pages-routing",title:"Pages & Routing",content:"\nEvery `.md` or `.mdx` file in the `pages/` directory becomes a page. The file path determines the URL.\n\n## Basic routing\n\n| File path | URL |\n|-----------|-----|\n| `pages/index.md` | `/` |\n| `pages/quickstart.md` | `/quickstart` |\n| `pages/guides/deployment.md` | `/guides/deployment` |\n| `pages/api/endpoints.md` | `/api/endpoints` |\n| `pages/api/index.md` | `/api` |\n\n**Rules:**\n\n- `index.md` serves at the directory's root path\n- File extensions are stripped from the URL\n- Directory nesting maps directly to URL segments\n- Both `.md` and `.mdx` files are supported\n\n## Page IDs\n\nEach page has an ID derived from its path relative to `pages/`:\n\n| File | Page ID |\n|------|---------|\n| `pages/index.md` | `index` |\n| `pages/quickstart.md` | `quickstart` |\n| `pages/guides/deployment.md` | `guides/deployment` |\n\nPage IDs are used in `navigation` config to control sidebar order.\n\n## Navigation vs. routing\n\nAll pages in `pages/` are routable regardless of whether they appear in `navigation`. Navigation only controls the sidebar.\n\nPages can be hidden from the sidebar using `hidden: true` in frontmatter while remaining accessible at their URL.\n\n## Frontmatter\n\nEvery page can include YAML frontmatter at the top of the file:\n\n```markdown\n---\ntitle: My Page\ndescription: A brief description for SEO and navigation.\nicon: book\nsidebarTitle: Short Title\nhidden: false\ntags: [guide, setup]\n---\n\n# My Page\n\nContent starts here.\n```\n\n| Field | Type | Description |\n|-------|------|-------------|\n| `title` | string | Page title (falls back to first `#` heading) |\n| `description` | string | Description for metadata and navigation |\n| `icon` | string | Icon identifier shown in the sidebar |\n| `sidebarTitle` | string | Override title shown in the sidebar |\n| `hidden` | boolean | Hide page from sidebar (still accessible via URL) |\n| `tags` | string[] | Tags for categorization and search |\n\n## i18n routing\n\nWhen multiple locales are configured, organize pages by locale subdirectory:\n\n```text\npages/\n├── en/            # Default locale\n│   ├── index.md\n│   └── quickstart.md\n├── es/            # Spanish\n│   ├── index.md\n│   └── quickstart.md\n```\n\n| File | URL |\n|------|-----|\n| `pages/en/index.md` | `/` (default — no prefix) |\n| `pages/es/index.md` | `/es/` |\n| `pages/es/quickstart.md` | `/es/quickstart` |\n\nThe default locale serves at the root without a prefix. When `fallback: true` and a page doesn't exist in a non-default locale, the default version is used.\n\n## Versioned routing\n\nWhen versioning is configured:\n\n```text\npages/\n├── current/       # Latest version\n│   ├── index.md\n│   └── api.md\n├── v1.0/\n│   ├── index.md\n│   └── api.md\n```\n\n| File | URL |\n|------|-----|\n| `pages/current/index.md` | `/` |\n| `pages/v1.0/index.md` | `/v1.0/` |\n| `pages/v1.0/api.md` | `/v1.0/api` |\n\nThe `current` directory serves at the root. Older versions are prefixed with their version string.\n\n## File discovery\n\nTome discovers pages by scanning `pages/` for `**/*.{md,mdx}` files. Discovery runs at startup and again whenever files are added, removed, or renamed during development. Changes to existing files trigger a hot reload.\n"},{id:"project-structure",title:"Project Structure",content:`
Every Tome project follows the same layout. Understanding it helps you customize and extend your docs.

## Directory layout

\`\`\`
my-docs/
├── pages/                  # Your documentation content
│   ├── index.md            # Home page (/)
│   ├── quickstart.md       # /quickstart
│   ├── guides/
│   │   ├── setup.md        # /guides/setup
│   │   └── deploy.md       # /guides/deploy
│   └── api/
│       └── endpoints.mdx   # /api/endpoints (with components)
├── .tome/
│   └── entry.tsx           # App entry point
├── tome.config.js          # Site configuration
├── index.html              # HTML shell
├── package.json            # Dependencies and scripts
└── out/                    # Build output (after \`tome build\`)
\`\`\`

## Key files

### \`pages/\` directory

All your documentation lives here. Every \`.md\` and \`.mdx\` file becomes a page. The directory structure maps directly to URL paths:

| File path | Page ID | URL path |
|-----------|---------|----------|
| \`pages/index.md\` | \`index\` | \`/\` |
| \`pages/quickstart.md\` | \`quickstart\` | \`/quickstart\` |
| \`pages/guides/setup.md\` | \`guides/setup\` | \`/guides/setup\` |

Files named \`index.md\` in subdirectories resolve to the directory path. For example, \`pages/guides/index.md\` maps to \`/guides\`.

### \`tome.config.js\`

The central configuration file. Controls your site name, sidebar navigation, theme, search, and more:

\`\`\`javascript
export default {
  name: "My Docs",
  theme: { preset: "amber", mode: "auto" },
  navigation: [
    { group: "Getting Started", pages: ["index", "quickstart"] },
    { group: "Guides", pages: ["guides/setup", "guides/deploy"] },
  ],
};
\`\`\`

See **[Configuration](#configuration)** for the full schema.

### \`.tome/entry.tsx\`

The application entry point. For most projects, this is a single import:

\`\`\`tsx
import "@tomehq/theme/entry";
\`\`\`

This boots the Tome shell — the sidebar, search, theme switcher, and content renderer. You generally don't need to modify this file.

### \`index.html\`

The HTML shell that loads your documentation app. Contains the \`<div id="tome-root">\` mount point and the script tag for the entry file.

### \`out/\` directory

Generated by \`tome build\`. Contains the static site output ready for deployment — HTML, JavaScript bundles, and a search index. This directory is gitignored by default.

## Markdown vs MDX

Tome supports both file types:

- **\`.md\` files** — Standard Markdown with frontmatter. Processed at build time into HTML. Good for most documentation pages.
- **\`.mdx\` files** — Markdown with JSX support. You can import and use React components like \`<Callout>\`, \`<Tabs>\`, and \`<Steps>\` directly in your content.

Both file types support the same frontmatter fields and appear identically in the sidebar.

## Next steps

- **[Pages & Routing](#pages-routing)** for details on how files map to URLs
- **[Components](#components)** for using interactive elements in \`.mdx\` files
- **[Configuration](#configuration)** for the full config schema
`},{id:"quickstart",title:"Quickstart",content:`
Get a working documentation site in three commands.

## Create a new project

\`\`\`bash
npx @tomehq/cli init my-docs
\`\`\`

This scaffolds a complete documentation project with starter pages, configuration, and build scripts.

## Install and run

\`\`\`bash
cd my-docs
npm install
npm run dev
\`\`\`

Open \`http://localhost:3000\`. You should see your documentation site with a sidebar, search, and starter content.

## Edit your first page

Open \`pages/index.md\` in your editor. Change the title and save — the browser reloads automatically.

\`\`\`markdown
---
title: My Project
description: Documentation for my project.
---

# My Project

Welcome to the docs.
\`\`\`

Every \`.md\` or \`.mdx\` file in \`pages/\` becomes a page on your site. Subdirectories create nested routes:

| File | URL |
|------|-----|
| \`pages/index.md\` | \`/\` |
| \`pages/quickstart.md\` | \`/quickstart\` |
| \`pages/guides/setup.md\` | \`/guides/setup\` |

## Add navigation

Open \`tome.config.js\` and define your sidebar:

\`\`\`javascript
export default {
  name: "My Project",
  navigation: [
    {
      group: "Getting Started",
      pages: ["index", "quickstart"],
    },
    {
      group: "Guides",
      pages: ["guides/setup"],
    },
  ],
};
\`\`\`

## Build for production

\`\`\`bash
npm run build
\`\`\`

This outputs a static site to \`out/\` ready to deploy to any hosting provider — Vercel, Netlify, Cloudflare Pages, or Tome Cloud.

## Next steps

- **[Installation](#installation)** for detailed setup and prerequisites
- **[Configuration](#configuration)** to customize your site
- **[Components](#components)** to use tabs, callouts, and other interactive elements
`},{id:"reference/cli",title:"CLI Reference",content:`
The \`tome\` CLI is the primary interface for creating, developing, building, and deploying documentation sites.

## Installation

\`\`\`bash
npm install -D @tomehq/cli
# or globally
npm install -g @tomehq/cli
\`\`\`

## Commands

### \`tome init [name]\`

Create a new Tome documentation project.

\`\`\`bash
tome init my-docs
\`\`\`

| Argument | Default | Description |
|----------|---------|-------------|
| \`name\` | \`my-docs\` | Project directory name |

| Flag | Default | Description |
|------|---------|-------------|
| \`-t, --template <name>\` | \`default\` | Starter template |

Creates \`tome.config.js\`, \`package.json\`, \`index.html\`, \`.tome/entry.tsx\`, starter pages in \`pages/\`, and \`public/\` and \`styles/\` directories.

---

### \`tome dev\`

Start the development server with hot reloading.

\`\`\`bash
tome dev
tome dev -p 4000
tome dev --host
\`\`\`

| Flag | Default | Description |
|------|---------|-------------|
| \`-p, --port <number>\` | \`3000\` | Server port |
| \`--host\` | \`false\` | Expose to network (bind \`0.0.0.0\`) |

Watches \`pages/\` for file changes and reloads automatically. Config changes trigger a full reload.

---

### \`tome build\`

Build the documentation site for production.

\`\`\`bash
tome build
tome build -o dist
\`\`\`

| Flag | Default | Description |
|------|---------|-------------|
| \`-o, --outDir <dir>\` | \`out\` | Output directory |

Produces a static site and runs Pagefind to build the search index.

---

### \`tome deploy\`

Deploy the site to Tome Cloud. Requires \`tome login\` first.

\`\`\`bash
tome deploy
tome deploy --preview --branch feature/auth
\`\`\`

| Flag | Default | Description |
|------|---------|-------------|
| \`--preview\` | \`false\` | Deploy as a preview (branch-based URL) |
| \`--branch <name>\` | auto-detect | Git branch name for preview |
| \`--expires <days>\` | \`7\` | Preview expiry in days |

Builds, collects output files, and uploads using hash-based deduplication. With \`--preview\`, deploys to a branch-specific URL (e.g., \`feature-auth.preview.my-docs.tome.center\`) and injects a preview banner.

---

### \`tome lint\`

Lint documentation content for common issues.

\`\`\`bash
tome lint
tome lint --strict
tome lint --banned-words "simply,obviously"
\`\`\`

| Flag | Default | Description |
|------|---------|-------------|
| \`--max-paragraph <n>\` | \`300\` | Max words per paragraph |
| \`--no-heading-increment\` | — | Disable heading increment check |
| \`--no-image-alt\` | — | Disable missing alt text check |
| \`--no-single-h1\` | — | Disable single H1 check |
| \`--no-empty-links\` | — | Disable empty link check |
| \`--banned-words <words>\` | — | Comma-separated list of banned words |
| \`--strict\` | \`false\` | Treat warnings as errors |

Checks all pages for heading hierarchy issues, missing image alt text, overly long paragraphs, duplicate H1 tags, empty links, and banned words.

---

### \`tome login\`

Authenticate with Tome Cloud.

\`\`\`bash
tome login
\`\`\`

Prompts for email and sends a magic link. Stores the API token locally.

---

### \`tome domains:add <domain>\`

Add a custom domain. Returns DNS records to configure.

\`\`\`bash
tome domains:add docs.example.com
\`\`\`

### \`tome domains:verify <domain>\`

Verify DNS configuration for a custom domain.

\`\`\`bash
tome domains:verify docs.example.com
\`\`\`

### \`tome domains:list\`

List all custom domains for the current project.

### \`tome domains:remove <domain>\`

Remove a custom domain.

---

### \`tome algolia:init\`

Initialize an Algolia DocSearch index. Prompts for credentials and creates a crawler configuration.

---

### \`tome mcp\`

Start the MCP (Model Context Protocol) stdio server for AI tool integration. Exposes documentation content as MCP resources and tools.
`},{id:"reference/components",title:"Components",content:`
Tome includes built-in components available in any \`.mdx\` file without imports.

## Callout

Draw attention to important information.

\`\`\`mdx
<Callout type="info" title="Note">
  This is an informational callout.
</Callout>
\`\`\`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`type\` | \`"info" \\| "tip" \\| "warning" \\| "danger"\` | \`"info"\` | Visual style and icon |
| \`title\` | \`string\` | — | Optional heading text |

Types: \`info\` (blue), \`tip\` (green), \`warning\` (amber), \`danger\` (red).

---

## Tabs

Present content variants — useful for multiple languages or platform-specific instructions.

\`\`\`mdx
<Tabs items={["npm", "yarn", "pnpm"]}>
  <div>npm install @tomehq/cli</div>
  <div>yarn add @tomehq/cli</div>
  <div>pnpm add @tomehq/cli</div>
</Tabs>
\`\`\`

| Prop | Type | Description |
|------|------|-------------|
| \`items\` | \`string[]\` | Tab labels (required) |

Each child \`<div>\` maps to a tab in order.

---

## Card

A linked or static content card.

\`\`\`mdx
<Card title="Getting Started" icon="rocket" href="/quickstart">
  Set up your first project in minutes.
</Card>
\`\`\`

| Prop | Type | Description |
|------|------|-------------|
| \`title\` | \`string\` | Card heading (required) |
| \`icon\` | \`string\` | Emoji or icon name |
| \`href\` | \`string\` | Link URL (makes the card clickable) |

---

## CardGroup

Arranges cards in a responsive grid.

\`\`\`mdx
<CardGroup cols={3}>
  <Card title="Install">Step 1</Card>
  <Card title="Configure">Step 2</Card>
  <Card title="Deploy">Step 3</Card>
</CardGroup>
\`\`\`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`cols\` | \`number\` | \`2\` | Number of columns |

---

## Steps

Sequential instructions with numbered indicators.

\`\`\`mdx
<Steps>
  <div>
    **Create a project**
    Run \`tome init my-docs\`.
  </div>
  <div>
    **Install dependencies**
    Run \`npm install\`.
  </div>
</Steps>
\`\`\`

Each child \`<div>\` becomes a numbered step. Use bold text on the first line for the step title.

---

## Accordion

Collapsible content sections for FAQs or optional details.

\`\`\`mdx
<Accordion title="How do I deploy?">
  Run \`tome build\` then upload the \`out/\` directory.
</Accordion>
\`\`\`

| Prop | Type | Description |
|------|------|-------------|
| \`title\` | \`string\` | Clickable header text (required) |

---

## API components

When an OpenAPI spec is configured, additional components are auto-generated:

- **ApiEndpoint** — Renders an API endpoint with parameters and responses
- **ApiPlayground** — Interactive request builder
- **ApiResponse** — Formatted response viewer

See the [API reference guide](/docs/guides/api-reference) for setup.

---

## \`.md\` vs \`.mdx\`

Components are only available in \`.mdx\` files. Rename \`.md\` to \`.mdx\` to use them — no other changes needed.
`},{id:"reference/config",title:"Config Reference",content:'\nThe config file (`tome.config.js`, `.mjs`, or `.ts`) is validated at startup. Invalid values produce clear error messages with the field path and expected type.\n\n## Top-level fields\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `name` | `string` | `"My Docs"` | Site name shown in the header and browser tab |\n| `logo` | `string` | — | Path to logo image, relative to `public/` |\n| `favicon` | `string` | — | Path to favicon, relative to `public/` |\n| `baseUrl` | `string` | — | Full URL where the site is hosted (for analytics, canonical links) |\n| `basePath` | `string` | — | URL subpath prefix (e.g., `"/docs/"`) — sets Vite\'s `base` option |\n| `theme` | `ThemeConfig` | `{}` | Theme configuration (see below) |\n| `navigation` | `NavigationGroup[]` | `[]` | Sidebar navigation structure |\n| `topNav` | `TopNavItem[]'}],eg={Added:"#22c55e",Changed:"#3b82f6",Deprecated:"#f59e0b",Removed:"#ef4444",Fixed:"#8b5cf6",Security:"#f97316"};function Vd(h){return eg[h]||"#6b7280"}function tg({entries:h,initialLimit:j}){const[T,d]=Q.useState(!j),D=T?h:h.slice(0,j||h.length);return h.length===0?s.jsx("div",{"data-testid":"changelog-empty",style:{padding:"40px 0",textAlign:"center",color:"var(--txM)",fontSize:14},children:"No changelog entries found."}):s.jsxs("div",{"data-testid":"changelog-timeline",style:{position:"relative"},children:[s.jsx("div",{style:{position:"absolute",left:15,top:8,bottom:8,width:2,background:"var(--bd)"}}),D.map((R,B)=>s.jsxs("div",{"data-testid":`changelog-entry-${R.version}`,style:{position:"relative",paddingLeft:44,paddingBottom:B<D.length-1?32:0},children:[s.jsx("div",{style:{position:"absolute",left:8,top:6,width:16,height:16,borderRadius:"50%",background:R.version==="Unreleased"?"var(--txM)":"var(--ac)",border:"3px solid var(--bg, #1a1a1a)"}}),s.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:12,marginBottom:12},children:[s.jsx("span",{style:{fontSize:18,fontWeight:700,color:"var(--tx)",fontFamily:"var(--font-heading, inherit)"},children:R.url?s.jsx("a",{href:R.url,target:"_blank",rel:"noopener noreferrer",style:{color:"inherit",textDecoration:"none"},children:R.version}):R.version}),R.date&&s.jsx("span",{style:{fontSize:13,color:"var(--txM)",fontFamily:"var(--font-code, monospace)"},children:R.date})]}),R.sections.map(N=>s.jsxs("div",{style:{marginBottom:16},children:[s.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,marginBottom:8},children:[s.jsx("span",{style:{display:"inline-block",width:8,height:8,borderRadius:"50%",background:Vd(N.type)}}),s.jsx("span",{style:{fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em",color:Vd(N.type),fontFamily:"var(--font-code, monospace)"},children:N.type})]}),s.jsx("ul",{style:{margin:0,paddingLeft:18,listStyleType:"disc",color:"var(--tx2)"},children:N.items.map((_,b)=>s.jsx("li",{style:{fontSize:14,lineHeight:1.7,color:"var(--tx2)",marginBottom:2},children:_},b))})]},N.type))]},R.version)),!T&&h.length>(j||0)&&s.jsx("div",{style:{textAlign:"center",marginTop:24},children:s.jsxs("button",{"data-testid":"changelog-show-more",onClick:()=>d(!0),style:{background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"8px 20px",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body, inherit)",cursor:"pointer",transition:"border-color .15s, color .15s"},children:["Show all ",h.length," releases"]})})]})}const Zd={info:{color:"#3b82f6",label:"INFO"},warning:{color:"#f59e0b",label:"WARNING"},tip:{color:"var(--ac, #a78bfa)",label:"TIP"},danger:{color:"#ef4444",label:"DANGER"}};function ng({type:h="info",title:j,children:T}){const d=Zd[h]||Zd.info;return s.jsxs("div",{style:{borderLeft:`3px solid ${d.color}`,background:`${d.color}11`,borderRadius:"0 2px 2px 0",padding:"14px 18px",marginBottom:20},children:[j?s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4},children:[s.jsx("span",{style:{fontWeight:700,fontSize:10,letterSpacing:".08em",color:d.color,fontFamily:"var(--font-code, monospace)"},children:d.label}),s.jsx("span",{style:{fontWeight:600,fontSize:13,color:d.color},children:j})]}):s.jsx("div",{style:{marginBottom:4},children:s.jsx("span",{style:{fontWeight:700,fontSize:10,letterSpacing:".08em",color:d.color,fontFamily:"var(--font-code, monospace)"},children:d.label})}),s.jsx("div",{style:{fontSize:14,lineHeight:1.65,color:"var(--tx2)"},children:T})]})}function ag({items:h,children:j}){const[T,d]=Q.useState(0);return s.jsxs("div",{style:{marginBottom:20},children:[s.jsx("div",{style:{display:"flex",gap:0,borderBottom:"1px solid var(--bd)"},children:h.map((D,R)=>s.jsx("button",{onClick:()=>d(R),style:{padding:"8px 16px",background:"none",border:"none",borderBottom:T===R?"2px solid var(--ac)":"2px solid transparent",color:T===R?"var(--ac)":"var(--txM)",fontWeight:T===R?600:400,fontSize:13,cursor:"pointer",fontFamily:"inherit"},children:D},R))}),s.jsx("div",{style:{padding:"16px 0"},children:j[T]})]})}function lg({title:h,icon:j,href:T,children:d}){const D=s.jsxs("div",{style:{border:"1px solid var(--bd)",borderRadius:2,padding:"20px",transition:"border-color 0.15s",cursor:T?"pointer":"default"},children:[j&&s.jsx("span",{style:{fontSize:24,marginBottom:8,display:"block"},children:j}),s.jsx("div",{style:{fontWeight:600,fontSize:14,marginBottom:4},children:h}),d&&s.jsx("div",{style:{fontSize:13,color:"var(--txM)",lineHeight:1.5},children:d})]});return T?s.jsx("a",{href:T,style:{textDecoration:"none",color:"inherit"},children:D}):D}function ig({cols:h=2,children:j}){return s.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${h}, 1fr)`,gap:12,marginBottom:20},children:j})}function ug({children:h}){return s.jsx("div",{style:{paddingLeft:24,borderLeft:"2px solid var(--bd)",marginBottom:20},children:dp.Children.map(h,(j,T)=>s.jsxs("div",{style:{position:"relative",paddingBottom:20},children:[s.jsx("div",{style:{position:"absolute",left:-33,top:0,width:20,height:20,borderRadius:"50%",background:"var(--ac)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700},children:T+1}),s.jsx("div",{style:{paddingLeft:8},children:j})]}))})}function og({title:h,children:j}){const[T,d]=Q.useState(!1);return s.jsxs("div",{style:{border:"1px solid var(--bd)",borderRadius:2,marginBottom:8,overflow:"hidden"},children:[s.jsxs("button",{onClick:()=>d(!T),style:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"12px 16px",background:"var(--sf)",border:"none",cursor:"pointer",fontWeight:500,fontSize:14,color:"var(--tx)",fontFamily:"inherit"},children:[h,s.jsx("span",{style:{transform:T?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"},children:"▾"})]}),T&&s.jsx("div",{style:{padding:"12px 16px",borderTop:"1px solid var(--bd)",fontSize:14,color:"var(--tx2)",lineHeight:1.65},children:j})]})}const cg={Callout:ng,Tabs:ag,Card:lg,CardGroup:ig,Steps:ug,Accordion:og,ChangelogTimeline:tg},sg=`
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Fira+Code:wght@400;500;600&display=swap');

  .tome-content h1 { display: none; }
  .tome-content h2 { font-family: var(--font-body); font-size: 1.35em; font-weight: 600; margin-top: 2em; margin-bottom: 0.5em; display: flex; align-items: center; gap: 10px; letter-spacing: 0.01em; }
  .tome-content h2::before { content: "#"; font-family: var(--font-heading); font-size: 1.2em; font-weight: 300; font-style: italic; color: var(--ac); opacity: 0.5; }
  .tome-content h3 { font-family: var(--font-body); font-size: 1.15em; font-weight: 600; margin-top: 1.5em; margin-bottom: 0.5em; }
  .tome-content h4 { font-family: var(--font-body); font-size: 1.05em; font-weight: 600; margin-top: 1.2em; margin-bottom: 0.5em; }
  .tome-content p { color: var(--tx2); line-height: 1.8; margin-bottom: 1em; font-size: 14.5px; }
  .tome-content a { color: var(--ac); text-decoration: none; }
  .tome-content a:hover { text-decoration: underline; }
  .tome-content .heading-anchor { display: none; }
  .tome-content ul, .tome-content ol { color: var(--tx2); padding-left: 1.5em; margin-bottom: 1em; }
  .tome-content li { margin-bottom: 0.3em; line-height: 1.7; }
  .tome-content code { font-family: var(--font-code); font-size: 0.88em; background: var(--cdBg); padding: 0.15em 0.4em; border-radius: 2px; color: var(--ac); }
  .tome-content pre { margin-bottom: 1.2em; border-radius: 2px; overflow-x: auto; border: 1px solid var(--bd); }
  .tome-content pre code { background: none; padding: 1em 1.2em; display: block; font-size: 12.5px; line-height: 1.7; color: var(--cdTx); }
  .tome-content blockquote { border-left: 3px solid var(--ac); padding: 0.5em 1em; margin: 1em 0; background: var(--acD); border-radius: 0 2px 2px 0; }
  .tome-content blockquote p { color: var(--tx2); margin: 0; }
  .tome-content table { width: 100%; border-collapse: collapse; margin-bottom: 1em; }
  .tome-content th, .tome-content td { padding: 0.5em 0.8em; border: 1px solid var(--bd); text-align: left; font-size: 0.9em; }
  .tome-content th { background: var(--sf); font-weight: 600; }
  .tome-content img { max-width: 100%; border-radius: 2px; }
  .tome-content hr { border: none; border-top: 1px solid var(--bd); margin: 2em 0; }

  /* Selection style */
  ::selection { background: var(--acD); color: var(--ac); }

  /* Scrollbar style */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--bd); border-radius: 10px; }

  /* Grain overlay */
  .tome-grain::before {
    content: ""; position: fixed; inset: 0; z-index: 9999; pointer-events: none;
    opacity: .35;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-repeat: repeat; background-size: 256px;
  }

  /* Shiki dual-theme support */
  .shiki { background: var(--cdBg) !important; }

  /* Dark mode: switch Shiki tokens from light-theme inline colors to --shiki-dark CSS vars */
  html.dark .shiki,
  html.dark .shiki span {
    color: var(--shiki-dark) !important;
  }

  /* Brighten dim comment tokens (github-dark #6A737D is too low-contrast on dark backgrounds) */
  html.dark .shiki span[style*="--shiki-dark:#6A737D"] {
    --shiki-dark: #a0aab5 !important;
  }
`;async function rg(h){try{const j=ka.find(d=>d.id===h),T=await Ip(h);return j!=null&&j.isMdx&&T.meta?{isMdx:!0,component:T.default,frontmatter:T.meta.frontmatter,headings:T.meta.headings}:T.default?T.isChangelog&&T.changelogEntries?{isMdx:!1,...T.default,changelogEntries:T.changelogEntries}:{isMdx:!1,...T.default}:null}catch(j){return console.error(`Failed to load page: ${h}`,j),null}}function fg(){const[h,j]=Q.useState(()=>{var O;const C=window.location.hash.slice(1);return C&&ka.some(G=>G.id===C)?C:((O=ka[0])==null?void 0:O.id)||"index"}),[T,d]=Q.useState(null),[D,R]=Q.useState(!0),B=Q.useCallback(async C=>{R(!0),j(C),window.location.hash=C;const O=await rg(C);d(O),R(!1)},[]);Q.useEffect(()=>{B(h)},[]),Q.useEffect(()=>{const C=()=>{const O=window.location.hash.slice(1);O&&O!==h&&ka.some(G=>G.id===O)&&B(O)};return window.addEventListener("hashchange",C),()=>window.removeEventListener("hashchange",C)},[h,B]);const N=ka.map(C=>({id:C.id,title:C.frontmatter.title,description:C.frontmatter.description})),_=ka.find(C=>C.id===h);let b;if(Uc.editLink&&(_!=null&&_.filePath)){const{repo:C,branch:O="main",dir:G=""}=Uc.editLink,oe=G?`${G.replace(/\/$/,"")}/`:"";b=`https://github.com/${C}/edit/${O}/${oe}${_.filePath}`}return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:sg}),s.jsx(Jp,{config:Uc,navigation:Fp,currentPageId:h,pageHtml:T!=null&&T.isMdx?void 0:D?"<p>Loading...</p>":(T==null?void 0:T.html)||"<p>Page not found</p>",pageComponent:T!=null&&T.isMdx?T.component:void 0,mdxComponents:cg,pageTitle:(T==null?void 0:T.frontmatter.title)||(D?"Loading...":"Not Found"),pageDescription:T==null?void 0:T.frontmatter.description,headings:(T==null?void 0:T.headings)||[],tocEnabled:(T==null?void 0:T.frontmatter.toc)!==!1,editUrl:b,lastUpdated:_==null?void 0:_.lastUpdated,changelogEntries:T!=null&&T.isMdx||T==null?void 0:T.changelogEntries,onNavigate:B,allPages:N,docContext:Pp})]})}const kd=document.getElementById("tome-root");kd&&bp.createRoot(kd).render(s.jsx(fg,{}));export{Q as a,dp as e,gp as r};
