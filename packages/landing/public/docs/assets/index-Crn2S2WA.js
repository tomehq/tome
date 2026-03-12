(function(){const j=document.createElement("link").relList;if(j&&j.supports&&j.supports("modulepreload"))return;for(const D of document.querySelectorAll('link[rel="modulepreload"]'))f(D);new MutationObserver(D=>{for(const R of D)if(R.type==="childList")for(const H of R.addedNodes)H.tagName==="LINK"&&H.rel==="modulepreload"&&f(H)}).observe(document,{childList:!0,subtree:!0});function S(D){const R={};return D.integrity&&(R.integrity=D.integrity),D.referrerPolicy&&(R.referrerPolicy=D.referrerPolicy),D.crossOrigin==="use-credentials"?R.credentials="include":D.crossOrigin==="anonymous"?R.credentials="omit":R.credentials="same-origin",R}function f(D){if(D.ep)return;D.ep=!0;const R=S(D);fetch(D.href,R)}})();function cp(h){return h&&h.__esModule&&Object.prototype.hasOwnProperty.call(h,"default")?h.default:h}var Dc={exports:{}},Xl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ud;function sp(){if(Ud)return Xl;Ud=1;var h=Symbol.for("react.transitional.element"),j=Symbol.for("react.fragment");function S(f,D,R){var H=null;if(R!==void 0&&(H=""+R),D.key!==void 0&&(H=""+D.key),"key"in D){R={};for(var N in D)N!=="key"&&(R[N]=D[N])}else R=D;return D=R.ref,{$$typeof:h,type:f,key:H,ref:D!==void 0?D:null,props:R}}return Xl.Fragment=j,Xl.jsx=S,Xl.jsxs=S,Xl}var qd;function rp(){return qd||(qd=1,Dc.exports=sp()),Dc.exports}var s=rp(),jc={exports:{}},F={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hd;function fp(){if(Hd)return F;Hd=1;var h=Symbol.for("react.transitional.element"),j=Symbol.for("react.portal"),S=Symbol.for("react.fragment"),f=Symbol.for("react.strict_mode"),D=Symbol.for("react.profiler"),R=Symbol.for("react.consumer"),H=Symbol.for("react.context"),N=Symbol.for("react.forward_ref"),M=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),C=Symbol.for("react.lazy"),O=Symbol.for("react.activity"),V=Symbol.iterator;function le(d){return d===null||typeof d!="object"?null:(d=V&&d[V]||d["@@iterator"],typeof d=="function"?d:null)}var ze={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ce=Object.assign,pe={};function G(d,z,q){this.props=d,this.context=z,this.refs=pe,this.updater=q||ze}G.prototype.isReactComponent={},G.prototype.setState=function(d,z){if(typeof d!="object"&&typeof d!="function"&&d!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,d,z,"setState")},G.prototype.forceUpdate=function(d){this.updater.enqueueForceUpdate(this,d,"forceUpdate")};function me(){}me.prototype=G.prototype;function se(d,z,q){this.props=d,this.context=z,this.refs=pe,this.updater=q||ze}var I=se.prototype=new me;I.constructor=se,ce(I,G.prototype),I.isPureReactComponent=!0;var De=Array.isArray;function Ce(){}var B={H:null,A:null,T:null,S:null},Ge=Object.prototype.hasOwnProperty;function Oe(d,z,q){var w=q.ref;return{$$typeof:h,type:d,key:z,ref:w!==void 0?w:null,props:q}}function Ut(d,z){return Oe(d.type,z,d.props)}function ft(d){return typeof d=="object"&&d!==null&&d.$$typeof===h}function Re(d){var z={"=":"=0",":":"=2"};return"$"+d.replace(/[=:]/g,function(q){return z[q]})}var Xt=/\/+/g;function Tt(d,z){return typeof d=="object"&&d!==null&&d.key!=null?Re(""+d.key):z.toString(36)}function dt(d){switch(d.status){case"fulfilled":return d.value;case"rejected":throw d.reason;default:switch(typeof d.status=="string"?d.then(Ce,Ce):(d.status="pending",d.then(function(z){d.status==="pending"&&(d.status="fulfilled",d.value=z)},function(z){d.status==="pending"&&(d.status="rejected",d.reason=z)})),d.status){case"fulfilled":return d.value;case"rejected":throw d.reason}}throw d}function T(d,z,q,w,J){var Z=typeof d;(Z==="undefined"||Z==="boolean")&&(d=null);var ue=!1;if(d===null)ue=!0;else switch(Z){case"bigint":case"string":case"number":ue=!0;break;case"object":switch(d.$$typeof){case h:case j:ue=!0;break;case C:return ue=d._init,T(ue(d._payload),z,q,w,J)}}if(ue)return J=J(d),ue=w===""?"."+Tt(d,0):w,De(J)?(q="",ue!=null&&(q=ue.replace(Xt,"$&/")+"/"),T(J,z,q,"",function(Bn){return Bn})):J!=null&&(ft(J)&&(J=Ut(J,q+(J.key==null||d&&d.key===J.key?"":(""+J.key).replace(Xt,"$&/")+"/")+ue)),z.push(J)),1;ue=0;var Xe=w===""?".":w+":";if(De(d))for(var be=0;be<d.length;be++)w=d[be],Z=Xe+Tt(w,be),ue+=T(w,z,q,Z,J);else if(be=le(d),typeof be=="function")for(d=be.call(d),be=0;!(w=d.next()).done;)w=w.value,Z=Xe+Tt(w,be++),ue+=T(w,z,q,Z,J);else if(Z==="object"){if(typeof d.then=="function")return T(dt(d),z,q,w,J);throw z=String(d),Error("Objects are not valid as a React child (found: "+(z==="[object Object]"?"object with keys {"+Object.keys(d).join(", ")+"}":z)+"). If you meant to render a collection of children, use an array instead.")}return ue}function U(d,z,q){if(d==null)return d;var w=[],J=0;return T(d,w,"","",function(Z){return z.call(q,Z,J++)}),w}function k(d){if(d._status===-1){var z=d._result;z=z(),z.then(function(q){(d._status===0||d._status===-1)&&(d._status=1,d._result=q)},function(q){(d._status===0||d._status===-1)&&(d._status=2,d._result=q)}),d._status===-1&&(d._status=0,d._result=z)}if(d._status===1)return d._result.default;throw d._result}var ge=typeof reportError=="function"?reportError:function(d){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof d=="object"&&d!==null&&typeof d.message=="string"?String(d.message):String(d),error:d});if(!window.dispatchEvent(z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",d);return}console.error(d)},re={map:U,forEach:function(d,z,q){U(d,function(){z.apply(this,arguments)},q)},count:function(d){var z=0;return U(d,function(){z++}),z},toArray:function(d){return U(d,function(z){return z})||[]},only:function(d){if(!ft(d))throw Error("React.Children.only expected to receive a single React element child.");return d}};return F.Activity=O,F.Children=re,F.Component=G,F.Fragment=S,F.Profiler=D,F.PureComponent=se,F.StrictMode=f,F.Suspense=M,F.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=B,F.__COMPILER_RUNTIME={__proto__:null,c:function(d){return B.H.useMemoCache(d)}},F.cache=function(d){return function(){return d.apply(null,arguments)}},F.cacheSignal=function(){return null},F.cloneElement=function(d,z,q){if(d==null)throw Error("The argument must be a React element, but you passed "+d+".");var w=ce({},d.props),J=d.key;if(z!=null)for(Z in z.key!==void 0&&(J=""+z.key),z)!Ge.call(z,Z)||Z==="key"||Z==="__self"||Z==="__source"||Z==="ref"&&z.ref===void 0||(w[Z]=z[Z]);var Z=arguments.length-2;if(Z===1)w.children=q;else if(1<Z){for(var ue=Array(Z),Xe=0;Xe<Z;Xe++)ue[Xe]=arguments[Xe+2];w.children=ue}return Oe(d.type,J,w)},F.createContext=function(d){return d={$$typeof:H,_currentValue:d,_currentValue2:d,_threadCount:0,Provider:null,Consumer:null},d.Provider=d,d.Consumer={$$typeof:R,_context:d},d},F.createElement=function(d,z,q){var w,J={},Z=null;if(z!=null)for(w in z.key!==void 0&&(Z=""+z.key),z)Ge.call(z,w)&&w!=="key"&&w!=="__self"&&w!=="__source"&&(J[w]=z[w]);var ue=arguments.length-2;if(ue===1)J.children=q;else if(1<ue){for(var Xe=Array(ue),be=0;be<ue;be++)Xe[be]=arguments[be+2];J.children=Xe}if(d&&d.defaultProps)for(w in ue=d.defaultProps,ue)J[w]===void 0&&(J[w]=ue[w]);return Oe(d,Z,J)},F.createRef=function(){return{current:null}},F.forwardRef=function(d){return{$$typeof:N,render:d}},F.isValidElement=ft,F.lazy=function(d){return{$$typeof:C,_payload:{_status:-1,_result:d},_init:k}},F.memo=function(d,z){return{$$typeof:v,type:d,compare:z===void 0?null:z}},F.startTransition=function(d){var z=B.T,q={};B.T=q;try{var w=d(),J=B.S;J!==null&&J(q,w),typeof w=="object"&&w!==null&&typeof w.then=="function"&&w.then(Ce,ge)}catch(Z){ge(Z)}finally{z!==null&&q.types!==null&&(z.types=q.types),B.T=z}},F.unstable_useCacheRefresh=function(){return B.H.useCacheRefresh()},F.use=function(d){return B.H.use(d)},F.useActionState=function(d,z,q){return B.H.useActionState(d,z,q)},F.useCallback=function(d,z){return B.H.useCallback(d,z)},F.useContext=function(d){return B.H.useContext(d)},F.useDebugValue=function(){},F.useDeferredValue=function(d,z){return B.H.useDeferredValue(d,z)},F.useEffect=function(d,z){return B.H.useEffect(d,z)},F.useEffectEvent=function(d){return B.H.useEffectEvent(d)},F.useId=function(){return B.H.useId()},F.useImperativeHandle=function(d,z,q){return B.H.useImperativeHandle(d,z,q)},F.useInsertionEffect=function(d,z){return B.H.useInsertionEffect(d,z)},F.useLayoutEffect=function(d,z){return B.H.useLayoutEffect(d,z)},F.useMemo=function(d,z){return B.H.useMemo(d,z)},F.useOptimistic=function(d,z){return B.H.useOptimistic(d,z)},F.useReducer=function(d,z,q){return B.H.useReducer(d,z,q)},F.useRef=function(d){return B.H.useRef(d)},F.useState=function(d){return B.H.useState(d)},F.useSyncExternalStore=function(d,z,q){return B.H.useSyncExternalStore(d,z,q)},F.useTransition=function(){return B.H.useTransition()},F.version="19.2.4",F}var Nd;function Nc(){return Nd||(Nd=1,jc.exports=fp()),jc.exports}var X=Nc();const dp=cp(X);var Cc={exports:{}},Ql={},Oc={exports:{}},Rc={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bd;function mp(){return Bd||(Bd=1,(function(h){function j(T,U){var k=T.length;T.push(U);e:for(;0<k;){var ge=k-1>>>1,re=T[ge];if(0<D(re,U))T[ge]=U,T[k]=re,k=ge;else break e}}function S(T){return T.length===0?null:T[0]}function f(T){if(T.length===0)return null;var U=T[0],k=T.pop();if(k!==U){T[0]=k;e:for(var ge=0,re=T.length,d=re>>>1;ge<d;){var z=2*(ge+1)-1,q=T[z],w=z+1,J=T[w];if(0>D(q,k))w<re&&0>D(J,q)?(T[ge]=J,T[w]=k,ge=w):(T[ge]=q,T[z]=k,ge=z);else if(w<re&&0>D(J,k))T[ge]=J,T[w]=k,ge=w;else break e}}return U}function D(T,U){var k=T.sortIndex-U.sortIndex;return k!==0?k:T.id-U.id}if(h.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var R=performance;h.unstable_now=function(){return R.now()}}else{var H=Date,N=H.now();h.unstable_now=function(){return H.now()-N}}var M=[],v=[],C=1,O=null,V=3,le=!1,ze=!1,ce=!1,pe=!1,G=typeof setTimeout=="function"?setTimeout:null,me=typeof clearTimeout=="function"?clearTimeout:null,se=typeof setImmediate<"u"?setImmediate:null;function I(T){for(var U=S(v);U!==null;){if(U.callback===null)f(v);else if(U.startTime<=T)f(v),U.sortIndex=U.expirationTime,j(M,U);else break;U=S(v)}}function De(T){if(ce=!1,I(T),!ze)if(S(M)!==null)ze=!0,Ce||(Ce=!0,Re());else{var U=S(v);U!==null&&dt(De,U.startTime-T)}}var Ce=!1,B=-1,Ge=5,Oe=-1;function Ut(){return pe?!0:!(h.unstable_now()-Oe<Ge)}function ft(){if(pe=!1,Ce){var T=h.unstable_now();Oe=T;var U=!0;try{e:{ze=!1,ce&&(ce=!1,me(B),B=-1),le=!0;var k=V;try{t:{for(I(T),O=S(M);O!==null&&!(O.expirationTime>T&&Ut());){var ge=O.callback;if(typeof ge=="function"){O.callback=null,V=O.priorityLevel;var re=ge(O.expirationTime<=T);if(T=h.unstable_now(),typeof re=="function"){O.callback=re,I(T),U=!0;break t}O===S(M)&&f(M),I(T)}else f(M);O=S(M)}if(O!==null)U=!0;else{var d=S(v);d!==null&&dt(De,d.startTime-T),U=!1}}break e}finally{O=null,V=k,le=!1}U=void 0}}finally{U?Re():Ce=!1}}}var Re;if(typeof se=="function")Re=function(){se(ft)};else if(typeof MessageChannel<"u"){var Xt=new MessageChannel,Tt=Xt.port2;Xt.port1.onmessage=ft,Re=function(){Tt.postMessage(null)}}else Re=function(){G(ft,0)};function dt(T,U){B=G(function(){T(h.unstable_now())},U)}h.unstable_IdlePriority=5,h.unstable_ImmediatePriority=1,h.unstable_LowPriority=4,h.unstable_NormalPriority=3,h.unstable_Profiling=null,h.unstable_UserBlockingPriority=2,h.unstable_cancelCallback=function(T){T.callback=null},h.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ge=0<T?Math.floor(1e3/T):5},h.unstable_getCurrentPriorityLevel=function(){return V},h.unstable_next=function(T){switch(V){case 1:case 2:case 3:var U=3;break;default:U=V}var k=V;V=U;try{return T()}finally{V=k}},h.unstable_requestPaint=function(){pe=!0},h.unstable_runWithPriority=function(T,U){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var k=V;V=T;try{return U()}finally{V=k}},h.unstable_scheduleCallback=function(T,U,k){var ge=h.unstable_now();switch(typeof k=="object"&&k!==null?(k=k.delay,k=typeof k=="number"&&0<k?ge+k:ge):k=ge,T){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=k+re,T={id:C++,callback:U,priorityLevel:T,startTime:k,expirationTime:re,sortIndex:-1},k>ge?(T.sortIndex=k,j(v,T),S(M)===null&&T===S(v)&&(ce?(me(B),B=-1):ce=!0,dt(De,k-ge))):(T.sortIndex=re,j(M,T),ze||le||(ze=!0,Ce||(Ce=!0,Re()))),T},h.unstable_shouldYield=Ut,h.unstable_wrapCallback=function(T){var U=V;return function(){var k=V;V=U;try{return T.apply(this,arguments)}finally{V=k}}}})(Rc)),Rc}var wd;function hp(){return wd||(wd=1,Oc.exports=mp()),Oc.exports}var Uc={exports:{}},tt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ld;function pp(){if(Ld)return tt;Ld=1;var h=Nc();function j(M){var v="https://react.dev/errors/"+M;if(1<arguments.length){v+="?args[]="+encodeURIComponent(arguments[1]);for(var C=2;C<arguments.length;C++)v+="&args[]="+encodeURIComponent(arguments[C])}return"Minified React error #"+M+"; visit "+v+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function S(){}var f={d:{f:S,r:function(){throw Error(j(522))},D:S,C:S,L:S,m:S,X:S,S,M:S},p:0,findDOMNode:null},D=Symbol.for("react.portal");function R(M,v,C){var O=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:D,key:O==null?null:""+O,children:M,containerInfo:v,implementation:C}}var H=h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function N(M,v){if(M==="font")return"";if(typeof v=="string")return v==="use-credentials"?v:""}return tt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=f,tt.createPortal=function(M,v){var C=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!v||v.nodeType!==1&&v.nodeType!==9&&v.nodeType!==11)throw Error(j(299));return R(M,v,null,C)},tt.flushSync=function(M){var v=H.T,C=f.p;try{if(H.T=null,f.p=2,M)return M()}finally{H.T=v,f.p=C,f.d.f()}},tt.preconnect=function(M,v){typeof M=="string"&&(v?(v=v.crossOrigin,v=typeof v=="string"?v==="use-credentials"?v:"":void 0):v=null,f.d.C(M,v))},tt.prefetchDNS=function(M){typeof M=="string"&&f.d.D(M)},tt.preinit=function(M,v){if(typeof M=="string"&&v&&typeof v.as=="string"){var C=v.as,O=N(C,v.crossOrigin),V=typeof v.integrity=="string"?v.integrity:void 0,le=typeof v.fetchPriority=="string"?v.fetchPriority:void 0;C==="style"?f.d.S(M,typeof v.precedence=="string"?v.precedence:void 0,{crossOrigin:O,integrity:V,fetchPriority:le}):C==="script"&&f.d.X(M,{crossOrigin:O,integrity:V,fetchPriority:le,nonce:typeof v.nonce=="string"?v.nonce:void 0})}},tt.preinitModule=function(M,v){if(typeof M=="string")if(typeof v=="object"&&v!==null){if(v.as==null||v.as==="script"){var C=N(v.as,v.crossOrigin);f.d.M(M,{crossOrigin:C,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0})}}else v==null&&f.d.M(M)},tt.preload=function(M,v){if(typeof M=="string"&&typeof v=="object"&&v!==null&&typeof v.as=="string"){var C=v.as,O=N(C,v.crossOrigin);f.d.L(M,C,{crossOrigin:O,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,type:typeof v.type=="string"?v.type:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0,referrerPolicy:typeof v.referrerPolicy=="string"?v.referrerPolicy:void 0,imageSrcSet:typeof v.imageSrcSet=="string"?v.imageSrcSet:void 0,imageSizes:typeof v.imageSizes=="string"?v.imageSizes:void 0,media:typeof v.media=="string"?v.media:void 0})}},tt.preloadModule=function(M,v){if(typeof M=="string")if(v){var C=N(v.as,v.crossOrigin);f.d.m(M,{as:typeof v.as=="string"&&v.as!=="script"?v.as:void 0,crossOrigin:C,integrity:typeof v.integrity=="string"?v.integrity:void 0})}else f.d.m(M)},tt.requestFormReset=function(M){f.d.r(M)},tt.unstable_batchedUpdates=function(M,v){return M(v)},tt.useFormState=function(M,v,C){return H.H.useFormState(M,v,C)},tt.useFormStatus=function(){return H.H.useHostTransitionStatus()},tt.version="19.2.4",tt}var Yd;function gp(){if(Yd)return Uc.exports;Yd=1;function h(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(h)}catch(j){console.error(j)}}return h(),Uc.exports=pp(),Uc.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gd;function yp(){if(Gd)return Ql;Gd=1;var h=hp(),j=Nc(),S=gp();function f(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function D(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function R(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function H(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function N(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function M(e){if(R(e)!==e)throw Error(f(188))}function v(e){var t=e.alternate;if(!t){if(t=R(e),t===null)throw Error(f(188));return t!==e?null:e}for(var n=e,a=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return M(l),e;if(i===a)return M(l),t;i=i.sibling}throw Error(f(188))}if(n.return!==a.return)n=l,a=i;else{for(var u=!1,o=l.child;o;){if(o===n){u=!0,n=l,a=i;break}if(o===a){u=!0,a=l,n=i;break}o=o.sibling}if(!u){for(o=i.child;o;){if(o===n){u=!0,n=i,a=l;break}if(o===a){u=!0,a=i,n=l;break}o=o.sibling}if(!u)throw Error(f(189))}}if(n.alternate!==a)throw Error(f(190))}if(n.tag!==3)throw Error(f(188));return n.stateNode.current===n?e:t}function C(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=C(e),t!==null)return t;e=e.sibling}return null}var O=Object.assign,V=Symbol.for("react.element"),le=Symbol.for("react.transitional.element"),ze=Symbol.for("react.portal"),ce=Symbol.for("react.fragment"),pe=Symbol.for("react.strict_mode"),G=Symbol.for("react.profiler"),me=Symbol.for("react.consumer"),se=Symbol.for("react.context"),I=Symbol.for("react.forward_ref"),De=Symbol.for("react.suspense"),Ce=Symbol.for("react.suspense_list"),B=Symbol.for("react.memo"),Ge=Symbol.for("react.lazy"),Oe=Symbol.for("react.activity"),Ut=Symbol.for("react.memo_cache_sentinel"),ft=Symbol.iterator;function Re(e){return e===null||typeof e!="object"?null:(e=ft&&e[ft]||e["@@iterator"],typeof e=="function"?e:null)}var Xt=Symbol.for("react.client.reference");function Tt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Xt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ce:return"Fragment";case G:return"Profiler";case pe:return"StrictMode";case De:return"Suspense";case Ce:return"SuspenseList";case Oe:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case ze:return"Portal";case se:return e.displayName||"Context";case me:return(e._context.displayName||"Context")+".Consumer";case I:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case B:return t=e.displayName||null,t!==null?t:Tt(e.type)||"Memo";case Ge:t=e._payload,e=e._init;try{return Tt(e(t))}catch{}}return null}var dt=Array.isArray,T=j.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,U=S.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k={pending:!1,data:null,method:null,action:null},ge=[],re=-1;function d(e){return{current:e}}function z(e){0>re||(e.current=ge[re],ge[re]=null,re--)}function q(e,t){re++,ge[re]=e.current,e.current=t}var w=d(null),J=d(null),Z=d(null),ue=d(null);function Xe(e,t){switch(q(Z,t),q(J,e),q(w,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?nd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=nd(t),e=ad(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}z(w),q(w,e)}function be(){z(w),z(J),z(Z)}function Bn(e){e.memoizedState!==null&&q(ue,e);var t=w.current,n=ad(t,e.type);t!==n&&(q(J,e),q(w,n))}function Ja(e){J.current===e&&(z(w),z(J)),ue.current===e&&(z(ue),wl._currentValue=k)}var wn,sn;function Qt(e){if(wn===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);wn=t&&t[1]||"",sn=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+wn+e+sn}var Ln=!1;function Yn(e,t){if(!e||Ln)return"";Ln=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var E=function(){throw Error()};if(Object.defineProperty(E.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(E,[])}catch(b){var y=b}Reflect.construct(e,[],E)}else{try{E.call()}catch(b){y=b}e.call(E.prototype)}}else{try{throw Error()}catch(b){y=b}(E=e())&&typeof E.catch=="function"&&E.catch(function(){})}}catch(b){if(b&&y&&typeof b.stack=="string")return[b.stack,y.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),u=i[0],o=i[1];if(u&&o){var c=u.split(`
`),g=o.split(`
`);for(l=a=0;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;for(;l<g.length&&!g[l].includes("DetermineComponentFrameRoot");)l++;if(a===c.length||l===g.length)for(a=c.length-1,l=g.length-1;1<=a&&0<=l&&c[a]!==g[l];)l--;for(;1<=a&&0<=l;a--,l--)if(c[a]!==g[l]){if(a!==1||l!==1)do if(a--,l--,0>l||c[a]!==g[l]){var x=`
`+c[a].replace(" at new "," at ");return e.displayName&&x.includes("<anonymous>")&&(x=x.replace("<anonymous>",e.displayName)),x}while(1<=a&&0<=l);break}}}finally{Ln=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Qt(n):""}function du(e,t){switch(e.tag){case 26:case 27:case 5:return Qt(e.type);case 16:return Qt("Lazy");case 13:return e.child!==t&&t!==null?Qt("Suspense Fallback"):Qt("Suspense");case 19:return Qt("SuspenseList");case 0:case 15:return Yn(e.type,!1);case 11:return Yn(e.type.render,!1);case 1:return Yn(e.type,!0);case 31:return Qt("Activity");default:return""}}function Gn(e){try{var t="",n=null;do t+=du(e,n),n=e,e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var rn=Object.prototype.hasOwnProperty,Xn=h.unstable_scheduleCallback,Qn=h.unstable_cancelCallback,mu=h.unstable_shouldYield,hu=h.unstable_requestPaint,Ie=h.unstable_now,Vl=h.unstable_getCurrentPriorityLevel,Wa=h.unstable_ImmediatePriority,Fa=h.unstable_UserBlockingPriority,Vn=h.unstable_NormalPriority,Zl=h.unstable_LowPriority,$a=h.unstable_IdlePriority,kl=h.log,Kl=h.unstable_setDisableYieldValue,fn=null,Pe=null;function qt(e){if(typeof kl=="function"&&Kl(e),Pe&&typeof Pe.setStrictMode=="function")try{Pe.setStrictMode(fn,e)}catch{}}var et=Math.clz32?Math.clz32:Fl,Jl=Math.log,Wl=Math.LN2;function Fl(e){return e>>>=0,e===0?32:31-(Jl(e)/Wl|0)|0}var _=256,W=262144,oe=4194304;function Qe(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function at(e,t,n){var a=e.pendingLanes;if(a===0)return 0;var l=0,i=e.suspendedLanes,u=e.pingedLanes;e=e.warmLanes;var o=a&134217727;return o!==0?(a=o&~i,a!==0?l=Qe(a):(u&=o,u!==0?l=Qe(u):n||(n=o&~e,n!==0&&(l=Qe(n))))):(o=a&~i,o!==0?l=Qe(o):u!==0?l=Qe(u):n||(n=a&~e,n!==0&&(l=Qe(n)))),l===0?0:t!==0&&t!==l&&(t&i)===0&&(i=l&-l,n=t&-t,i>=n||i===32&&(n&4194048)!==0)?t:l}function mt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function dn(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function $l(){var e=oe;return oe<<=1,(oe&62914560)===0&&(oe=4194304),e}function pu(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ia(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fd(e,t,n,a,l,i){var u=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,c=e.expirationTimes,g=e.hiddenUpdates;for(n=u&~n;0<n;){var x=31-et(n),E=1<<x;o[x]=0,c[x]=-1;var y=g[x];if(y!==null)for(g[x]=null,x=0;x<y.length;x++){var b=y[x];b!==null&&(b.lane&=-536870913)}n&=~E}a!==0&&Bc(e,a,0),i!==0&&l===0&&e.tag!==0&&(e.suspendedLanes|=i&~(u&~t))}function Bc(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var a=31-et(t);e.entangledLanes|=t,e.entanglements[a]=e.entanglements[a]|1073741824|n&261930}function wc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-et(n),l=1<<a;l&t|e[a]&t&&(e[a]|=t),n&=~l}}function Lc(e,t){var n=t&-t;return n=(n&42)!==0?1:gu(n),(n&(e.suspendedLanes|t))!==0?0:n}function gu(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function yu(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Yc(){var e=U.p;return e!==0?e:(e=window.event,e===void 0?32:_d(e.type))}function Gc(e,t){var n=U.p;try{return U.p=e,t()}finally{U.p=n}}var mn=Math.random().toString(36).slice(2),Ke="__reactFiber$"+mn,lt="__reactProps$"+mn,ca="__reactContainer$"+mn,vu="__reactEvents$"+mn,$d="__reactListeners$"+mn,Id="__reactHandles$"+mn,Xc="__reactResources$"+mn,Pa="__reactMarker$"+mn;function bu(e){delete e[Ke],delete e[lt],delete e[vu],delete e[$d],delete e[Id]}function sa(e){var t=e[Ke];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ca]||n[Ke]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=rd(e);e!==null;){if(n=e[Ke])return n;e=rd(e)}return t}e=n,n=e.parentNode}return null}function ra(e){if(e=e[Ke]||e[ca]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function el(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(f(33))}function fa(e){var t=e[Xc];return t||(t=e[Xc]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ze(e){e[Pa]=!0}var Qc=new Set,Vc={};function Zn(e,t){da(e,t),da(e+"Capture",t)}function da(e,t){for(Vc[e]=t,e=0;e<t.length;e++)Qc.add(t[e])}var Pd=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Zc={},kc={};function em(e){return rn.call(kc,e)?!0:rn.call(Zc,e)?!1:Pd.test(e)?kc[e]=!0:(Zc[e]=!0,!1)}function Il(e,t,n){if(em(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function Pl(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function Vt(e,t,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+a)}}function At(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Kc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function tm(e,t,n){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(u){n=""+u,i.call(this,u)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(u){n=""+u},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function xu(e){if(!e._valueTracker){var t=Kc(e)?"checked":"value";e._valueTracker=tm(e,t,""+e[t])}}function Jc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=Kc(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function ei(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var nm=/[\n"\\]/g;function Et(e){return e.replace(nm,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Su(e,t,n,a,l,i,u,o){e.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?e.type=u:e.removeAttribute("type"),t!=null?u==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+At(t)):e.value!==""+At(t)&&(e.value=""+At(t)):u!=="submit"&&u!=="reset"||e.removeAttribute("value"),t!=null?Tu(e,u,At(t)):n!=null?Tu(e,u,At(n)):a!=null&&e.removeAttribute("value"),l==null&&i!=null&&(e.defaultChecked=!!i),l!=null&&(e.checked=l&&typeof l!="function"&&typeof l!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+At(o):e.removeAttribute("name")}function Wc(e,t,n,a,l,i,u,o){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),t!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||t!=null)){xu(e);return}n=n!=null?""+At(n):"",t=t!=null?""+At(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=o?e.checked:!!a,e.defaultChecked=!!a,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(e.name=u),xu(e)}function Tu(e,t,n){t==="number"&&ei(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function ma(e,t,n,a){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&a&&(e[n].defaultSelected=!0)}else{for(n=""+At(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,a&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Fc(e,t,n){if(t!=null&&(t=""+At(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+At(n):""}function $c(e,t,n,a){if(t==null){if(a!=null){if(n!=null)throw Error(f(92));if(dt(a)){if(1<a.length)throw Error(f(93));a=a[0]}n=a}n==null&&(n=""),t=n}n=At(t),e.defaultValue=n,a=e.textContent,a===n&&a!==""&&a!==null&&(e.value=a),xu(e)}function ha(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var am=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ic(e,t,n){var a=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":a?e.setProperty(t,n):typeof n!="number"||n===0||am.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function Pc(e,t,n){if(t!=null&&typeof t!="object")throw Error(f(62));if(e=e.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var l in t)a=t[l],t.hasOwnProperty(l)&&n[l]!==a&&Ic(e,l,a)}else for(var i in t)t.hasOwnProperty(i)&&Ic(e,i,t[i])}function Au(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var lm=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),im=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ti(e){return im.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Zt(){}var Eu=null;function zu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var pa=null,ga=null;function es(e){var t=ra(e);if(t&&(e=t.stateNode)){var n=e[lt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Su(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Et(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var l=a[lt]||null;if(!l)throw Error(f(90));Su(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(t=0;t<n.length;t++)a=n[t],a.form===e.form&&Jc(a)}break e;case"textarea":Fc(e,n.value,n.defaultValue);break e;case"select":t=n.value,t!=null&&ma(e,!!n.multiple,t,!1)}}}var _u=!1;function ts(e,t,n){if(_u)return e(t,n);_u=!0;try{var a=e(t);return a}finally{if(_u=!1,(pa!==null||ga!==null)&&(Xi(),pa&&(t=pa,e=ga,ga=pa=null,es(t),e)))for(t=0;t<e.length;t++)es(e[t])}}function tl(e,t){var n=e.stateNode;if(n===null)return null;var a=n[lt]||null;if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(f(231,t,typeof n));return n}var kt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Mu=!1;if(kt)try{var nl={};Object.defineProperty(nl,"passive",{get:function(){Mu=!0}}),window.addEventListener("test",nl,nl),window.removeEventListener("test",nl,nl)}catch{Mu=!1}var hn=null,Du=null,ni=null;function ns(){if(ni)return ni;var e,t=Du,n=t.length,a,l="value"in hn?hn.value:hn.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var u=n-e;for(a=1;a<=u&&t[n-a]===l[i-a];a++);return ni=l.slice(e,1<a?1-a:void 0)}function ai(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function li(){return!0}function as(){return!1}function it(e){function t(n,a,l,i,u){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?li:as,this.isPropagationStopped=as,this}return O(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=li)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=li)},persist:function(){},isPersistent:li}),t}var kn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ii=it(kn),al=O({},kn,{view:0,detail:0}),um=it(al),ju,Cu,ll,ui=O({},al,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ru,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ll&&(ll&&e.type==="mousemove"?(ju=e.screenX-ll.screenX,Cu=e.screenY-ll.screenY):Cu=ju=0,ll=e),ju)},movementY:function(e){return"movementY"in e?e.movementY:Cu}}),ls=it(ui),om=O({},ui,{dataTransfer:0}),cm=it(om),sm=O({},al,{relatedTarget:0}),Ou=it(sm),rm=O({},kn,{animationName:0,elapsedTime:0,pseudoElement:0}),fm=it(rm),dm=O({},kn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),mm=it(dm),hm=O({},kn,{data:0}),is=it(hm),pm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ym={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function vm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=ym[e])?!!t[e]:!1}function Ru(){return vm}var bm=O({},al,{key:function(e){if(e.key){var t=pm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ai(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?gm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ru,charCode:function(e){return e.type==="keypress"?ai(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ai(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),xm=it(bm),Sm=O({},ui,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),us=it(Sm),Tm=O({},al,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ru}),Am=it(Tm),Em=O({},kn,{propertyName:0,elapsedTime:0,pseudoElement:0}),zm=it(Em),_m=O({},ui,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Mm=it(_m),Dm=O({},kn,{newState:0,oldState:0}),jm=it(Dm),Cm=[9,13,27,32],Uu=kt&&"CompositionEvent"in window,il=null;kt&&"documentMode"in document&&(il=document.documentMode);var Om=kt&&"TextEvent"in window&&!il,os=kt&&(!Uu||il&&8<il&&11>=il),cs=" ",ss=!1;function rs(e,t){switch(e){case"keyup":return Cm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function fs(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ya=!1;function Rm(e,t){switch(e){case"compositionend":return fs(t);case"keypress":return t.which!==32?null:(ss=!0,cs);case"textInput":return e=t.data,e===cs&&ss?null:e;default:return null}}function Um(e,t){if(ya)return e==="compositionend"||!Uu&&rs(e,t)?(e=ns(),ni=Du=hn=null,ya=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return os&&t.locale!=="ko"?null:t.data;default:return null}}var qm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ds(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!qm[e.type]:t==="textarea"}function ms(e,t,n,a){pa?ga?ga.push(a):ga=[a]:pa=a,t=Wi(t,"onChange"),0<t.length&&(n=new ii("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var ul=null,ol=null;function Hm(e){Ff(e,0)}function oi(e){var t=el(e);if(Jc(t))return e}function hs(e,t){if(e==="change")return t}var ps=!1;if(kt){var qu;if(kt){var Hu="oninput"in document;if(!Hu){var gs=document.createElement("div");gs.setAttribute("oninput","return;"),Hu=typeof gs.oninput=="function"}qu=Hu}else qu=!1;ps=qu&&(!document.documentMode||9<document.documentMode)}function ys(){ul&&(ul.detachEvent("onpropertychange",vs),ol=ul=null)}function vs(e){if(e.propertyName==="value"&&oi(ol)){var t=[];ms(t,ol,e,zu(e)),ts(Hm,t)}}function Nm(e,t,n){e==="focusin"?(ys(),ul=t,ol=n,ul.attachEvent("onpropertychange",vs)):e==="focusout"&&ys()}function Bm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return oi(ol)}function wm(e,t){if(e==="click")return oi(t)}function Lm(e,t){if(e==="input"||e==="change")return oi(t)}function Ym(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ht=typeof Object.is=="function"?Object.is:Ym;function cl(e,t){if(ht(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!rn.call(t,l)||!ht(e[l],t[l]))return!1}return!0}function bs(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function xs(e,t){var n=bs(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=bs(n)}}function Ss(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ss(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ts(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=ei(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ei(e.document)}return t}function Nu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Gm=kt&&"documentMode"in document&&11>=document.documentMode,va=null,Bu=null,sl=null,wu=!1;function As(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;wu||va==null||va!==ei(a)||(a=va,"selectionStart"in a&&Nu(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),sl&&cl(sl,a)||(sl=a,a=Wi(Bu,"onSelect"),0<a.length&&(t=new ii("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=va)))}function Kn(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ba={animationend:Kn("Animation","AnimationEnd"),animationiteration:Kn("Animation","AnimationIteration"),animationstart:Kn("Animation","AnimationStart"),transitionrun:Kn("Transition","TransitionRun"),transitionstart:Kn("Transition","TransitionStart"),transitioncancel:Kn("Transition","TransitionCancel"),transitionend:Kn("Transition","TransitionEnd")},Lu={},Es={};kt&&(Es=document.createElement("div").style,"AnimationEvent"in window||(delete ba.animationend.animation,delete ba.animationiteration.animation,delete ba.animationstart.animation),"TransitionEvent"in window||delete ba.transitionend.transition);function Jn(e){if(Lu[e])return Lu[e];if(!ba[e])return e;var t=ba[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Es)return Lu[e]=t[n];return e}var zs=Jn("animationend"),_s=Jn("animationiteration"),Ms=Jn("animationstart"),Xm=Jn("transitionrun"),Qm=Jn("transitionstart"),Vm=Jn("transitioncancel"),Ds=Jn("transitionend"),js=new Map,Yu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Yu.push("scrollEnd");function Ht(e,t){js.set(e,t),Zn(t,[e])}var ci=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},zt=[],xa=0,Gu=0;function si(){for(var e=xa,t=Gu=xa=0;t<e;){var n=zt[t];zt[t++]=null;var a=zt[t];zt[t++]=null;var l=zt[t];zt[t++]=null;var i=zt[t];if(zt[t++]=null,a!==null&&l!==null){var u=a.pending;u===null?l.next=l:(l.next=u.next,u.next=l),a.pending=l}i!==0&&Cs(n,l,i)}}function ri(e,t,n,a){zt[xa++]=e,zt[xa++]=t,zt[xa++]=n,zt[xa++]=a,Gu|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function Xu(e,t,n,a){return ri(e,t,n,a),fi(e)}function Wn(e,t){return ri(e,null,null,t),fi(e)}function Cs(e,t,n){e.lanes|=n;var a=e.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=e.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(l=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,l&&t!==null&&(l=31-et(n),e=i.hiddenUpdates,a=e[l],a===null?e[l]=[t]:a.push(t),t.lane=n|536870912),i):null}function fi(e){if(50<Ol)throw Ol=0,Io=null,Error(f(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Sa={};function Zm(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function pt(e,t,n,a){return new Zm(e,t,n,a)}function Qu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Kt(e,t){var n=e.alternate;return n===null?(n=pt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Os(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function di(e,t,n,a,l,i){var u=0;if(a=e,typeof e=="function")Qu(e)&&(u=1);else if(typeof e=="string")u=Fh(e,n,w.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Oe:return e=pt(31,n,t,l),e.elementType=Oe,e.lanes=i,e;case ce:return Fn(n.children,l,i,t);case pe:u=8,l|=24;break;case G:return e=pt(12,n,t,l|2),e.elementType=G,e.lanes=i,e;case De:return e=pt(13,n,t,l),e.elementType=De,e.lanes=i,e;case Ce:return e=pt(19,n,t,l),e.elementType=Ce,e.lanes=i,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case se:u=10;break e;case me:u=9;break e;case I:u=11;break e;case B:u=14;break e;case Ge:u=16,a=null;break e}u=29,n=Error(f(130,e===null?"null":typeof e,"")),a=null}return t=pt(u,n,t,l),t.elementType=e,t.type=a,t.lanes=i,t}function Fn(e,t,n,a){return e=pt(7,e,a,t),e.lanes=n,e}function Vu(e,t,n){return e=pt(6,e,null,t),e.lanes=n,e}function Rs(e){var t=pt(18,null,null,0);return t.stateNode=e,t}function Zu(e,t,n){return t=pt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Us=new WeakMap;function _t(e,t){if(typeof e=="object"&&e!==null){var n=Us.get(e);return n!==void 0?n:(t={value:e,source:t,stack:Gn(t)},Us.set(e,t),t)}return{value:e,source:t,stack:Gn(t)}}var Ta=[],Aa=0,mi=null,rl=0,Mt=[],Dt=0,pn=null,wt=1,Lt="";function Jt(e,t){Ta[Aa++]=rl,Ta[Aa++]=mi,mi=e,rl=t}function qs(e,t,n){Mt[Dt++]=wt,Mt[Dt++]=Lt,Mt[Dt++]=pn,pn=e;var a=wt;e=Lt;var l=32-et(a)-1;a&=~(1<<l),n+=1;var i=32-et(t)+l;if(30<i){var u=l-l%5;i=(a&(1<<u)-1).toString(32),a>>=u,l-=u,wt=1<<32-et(t)+l|n<<l|a,Lt=i+e}else wt=1<<i|n<<l|a,Lt=e}function ku(e){e.return!==null&&(Jt(e,1),qs(e,1,0))}function Ku(e){for(;e===mi;)mi=Ta[--Aa],Ta[Aa]=null,rl=Ta[--Aa],Ta[Aa]=null;for(;e===pn;)pn=Mt[--Dt],Mt[Dt]=null,Lt=Mt[--Dt],Mt[Dt]=null,wt=Mt[--Dt],Mt[Dt]=null}function Hs(e,t){Mt[Dt++]=wt,Mt[Dt++]=Lt,Mt[Dt++]=pn,wt=t.id,Lt=t.overflow,pn=e}var Je=null,_e=null,ie=!1,gn=null,jt=!1,Ju=Error(f(519));function yn(e){var t=Error(f(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw fl(_t(t,e)),Ju}function Ns(e){var t=e.stateNode,n=e.type,a=e.memoizedProps;switch(t[Ke]=e,t[lt]=a,n){case"dialog":te("cancel",t),te("close",t);break;case"iframe":case"object":case"embed":te("load",t);break;case"video":case"audio":for(n=0;n<Ul.length;n++)te(Ul[n],t);break;case"source":te("error",t);break;case"img":case"image":case"link":te("error",t),te("load",t);break;case"details":te("toggle",t);break;case"input":te("invalid",t),Wc(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":te("invalid",t);break;case"textarea":te("invalid",t),$c(t,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||a.suppressHydrationWarning===!0||ed(t.textContent,n)?(a.popover!=null&&(te("beforetoggle",t),te("toggle",t)),a.onScroll!=null&&te("scroll",t),a.onScrollEnd!=null&&te("scrollend",t),a.onClick!=null&&(t.onclick=Zt),t=!0):t=!1,t||yn(e,!0)}function Bs(e){for(Je=e.return;Je;)switch(Je.tag){case 5:case 31:case 13:jt=!1;return;case 27:case 3:jt=!0;return;default:Je=Je.return}}function Ea(e){if(e!==Je)return!1;if(!ie)return Bs(e),ie=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||mc(e.type,e.memoizedProps)),n=!n),n&&_e&&yn(e),Bs(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(f(317));_e=sd(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(f(317));_e=sd(e)}else t===27?(t=_e,On(e.type)?(e=vc,vc=null,_e=e):_e=t):_e=Je?Ot(e.stateNode.nextSibling):null;return!0}function $n(){_e=Je=null,ie=!1}function Wu(){var e=gn;return e!==null&&(st===null?st=e:st.push.apply(st,e),gn=null),e}function fl(e){gn===null?gn=[e]:gn.push(e)}var Fu=d(null),In=null,Wt=null;function vn(e,t,n){q(Fu,t._currentValue),t._currentValue=n}function Ft(e){e._currentValue=Fu.current,z(Fu)}function $u(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function Iu(e,t,n,a){var l=e.child;for(l!==null&&(l.return=e);l!==null;){var i=l.dependencies;if(i!==null){var u=l.child;i=i.firstContext;e:for(;i!==null;){var o=i;i=l;for(var c=0;c<t.length;c++)if(o.context===t[c]){i.lanes|=n,o=i.alternate,o!==null&&(o.lanes|=n),$u(i.return,n,e),a||(u=null);break e}i=o.next}}else if(l.tag===18){if(u=l.return,u===null)throw Error(f(341));u.lanes|=n,i=u.alternate,i!==null&&(i.lanes|=n),$u(u,n,e),u=null}else u=l.child;if(u!==null)u.return=l;else for(u=l;u!==null;){if(u===e){u=null;break}if(l=u.sibling,l!==null){l.return=u.return,u=l;break}u=u.return}l=u}}function za(e,t,n,a){e=null;for(var l=t,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var u=l.alternate;if(u===null)throw Error(f(387));if(u=u.memoizedProps,u!==null){var o=l.type;ht(l.pendingProps.value,u.value)||(e!==null?e.push(o):e=[o])}}else if(l===ue.current){if(u=l.alternate,u===null)throw Error(f(387));u.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(e!==null?e.push(wl):e=[wl])}l=l.return}e!==null&&Iu(t,e,n,a),t.flags|=262144}function hi(e){for(e=e.firstContext;e!==null;){if(!ht(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Pn(e){In=e,Wt=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function We(e){return ws(In,e)}function pi(e,t){return In===null&&Pn(e),ws(e,t)}function ws(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Wt===null){if(e===null)throw Error(f(308));Wt=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Wt=Wt.next=t;return n}var km=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,a){e.push(a)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},Km=h.unstable_scheduleCallback,Jm=h.unstable_NormalPriority,Be={$$typeof:se,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Pu(){return{controller:new km,data:new Map,refCount:0}}function dl(e){e.refCount--,e.refCount===0&&Km(Jm,function(){e.controller.abort()})}var ml=null,eo=0,_a=0,Ma=null;function Wm(e,t){if(ml===null){var n=ml=[];eo=0,_a=lc(),Ma={status:"pending",value:void 0,then:function(a){n.push(a)}}}return eo++,t.then(Ls,Ls),t}function Ls(){if(--eo===0&&ml!==null){Ma!==null&&(Ma.status="fulfilled");var e=ml;ml=null,_a=0,Ma=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Fm(e,t){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return e.then(function(){a.status="fulfilled",a.value=t;for(var l=0;l<n.length;l++)(0,n[l])(t)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var Ys=T.S;T.S=function(e,t){Ef=Ie(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&Wm(e,t),Ys!==null&&Ys(e,t)};var ea=d(null);function to(){var e=ea.current;return e!==null?e:Ae.pooledCache}function gi(e,t){t===null?q(ea,ea.current):q(ea,t.pool)}function Gs(){var e=to();return e===null?null:{parent:Be._currentValue,pool:e}}var Da=Error(f(460)),no=Error(f(474)),yi=Error(f(542)),vi={then:function(){}};function Xs(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Qs(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Zt,Zt),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Zs(e),e;default:if(typeof t.status=="string")t.then(Zt,Zt);else{if(e=Ae,e!==null&&100<e.shellSuspendCounter)throw Error(f(482));e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var l=t;l.status="fulfilled",l.value=a}},function(a){if(t.status==="pending"){var l=t;l.status="rejected",l.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Zs(e),e}throw na=t,Da}}function ta(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(na=n,Da):n}}var na=null;function Vs(){if(na===null)throw Error(f(459));var e=na;return na=null,e}function Zs(e){if(e===Da||e===yi)throw Error(f(483))}var ja=null,hl=0;function bi(e){var t=hl;return hl+=1,ja===null&&(ja=[]),Qs(ja,e,t)}function pl(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function xi(e,t){throw t.$$typeof===V?Error(f(525)):(e=Object.prototype.toString.call(t),Error(f(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function ks(e){function t(m,r){if(e){var p=m.deletions;p===null?(m.deletions=[r],m.flags|=16):p.push(r)}}function n(m,r){if(!e)return null;for(;r!==null;)t(m,r),r=r.sibling;return null}function a(m){for(var r=new Map;m!==null;)m.key!==null?r.set(m.key,m):r.set(m.index,m),m=m.sibling;return r}function l(m,r){return m=Kt(m,r),m.index=0,m.sibling=null,m}function i(m,r,p){return m.index=p,e?(p=m.alternate,p!==null?(p=p.index,p<r?(m.flags|=67108866,r):p):(m.flags|=67108866,r)):(m.flags|=1048576,r)}function u(m){return e&&m.alternate===null&&(m.flags|=67108866),m}function o(m,r,p,A){return r===null||r.tag!==6?(r=Vu(p,m.mode,A),r.return=m,r):(r=l(r,p),r.return=m,r)}function c(m,r,p,A){var Q=p.type;return Q===ce?x(m,r,p.props.children,A,p.key):r!==null&&(r.elementType===Q||typeof Q=="object"&&Q!==null&&Q.$$typeof===Ge&&ta(Q)===r.type)?(r=l(r,p.props),pl(r,p),r.return=m,r):(r=di(p.type,p.key,p.props,null,m.mode,A),pl(r,p),r.return=m,r)}function g(m,r,p,A){return r===null||r.tag!==4||r.stateNode.containerInfo!==p.containerInfo||r.stateNode.implementation!==p.implementation?(r=Zu(p,m.mode,A),r.return=m,r):(r=l(r,p.children||[]),r.return=m,r)}function x(m,r,p,A,Q){return r===null||r.tag!==7?(r=Fn(p,m.mode,A,Q),r.return=m,r):(r=l(r,p),r.return=m,r)}function E(m,r,p){if(typeof r=="string"&&r!==""||typeof r=="number"||typeof r=="bigint")return r=Vu(""+r,m.mode,p),r.return=m,r;if(typeof r=="object"&&r!==null){switch(r.$$typeof){case le:return p=di(r.type,r.key,r.props,null,m.mode,p),pl(p,r),p.return=m,p;case ze:return r=Zu(r,m.mode,p),r.return=m,r;case Ge:return r=ta(r),E(m,r,p)}if(dt(r)||Re(r))return r=Fn(r,m.mode,p,null),r.return=m,r;if(typeof r.then=="function")return E(m,bi(r),p);if(r.$$typeof===se)return E(m,pi(m,r),p);xi(m,r)}return null}function y(m,r,p,A){var Q=r!==null?r.key:null;if(typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint")return Q!==null?null:o(m,r,""+p,A);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case le:return p.key===Q?c(m,r,p,A):null;case ze:return p.key===Q?g(m,r,p,A):null;case Ge:return p=ta(p),y(m,r,p,A)}if(dt(p)||Re(p))return Q!==null?null:x(m,r,p,A,null);if(typeof p.then=="function")return y(m,r,bi(p),A);if(p.$$typeof===se)return y(m,r,pi(m,p),A);xi(m,p)}return null}function b(m,r,p,A,Q){if(typeof A=="string"&&A!==""||typeof A=="number"||typeof A=="bigint")return m=m.get(p)||null,o(r,m,""+A,Q);if(typeof A=="object"&&A!==null){switch(A.$$typeof){case le:return m=m.get(A.key===null?p:A.key)||null,c(r,m,A,Q);case ze:return m=m.get(A.key===null?p:A.key)||null,g(r,m,A,Q);case Ge:return A=ta(A),b(m,r,p,A,Q)}if(dt(A)||Re(A))return m=m.get(p)||null,x(r,m,A,Q,null);if(typeof A.then=="function")return b(m,r,p,bi(A),Q);if(A.$$typeof===se)return b(m,r,p,pi(r,A),Q);xi(r,A)}return null}function L(m,r,p,A){for(var Q=null,fe=null,Y=r,P=r=0,ae=null;Y!==null&&P<p.length;P++){Y.index>P?(ae=Y,Y=null):ae=Y.sibling;var de=y(m,Y,p[P],A);if(de===null){Y===null&&(Y=ae);break}e&&Y&&de.alternate===null&&t(m,Y),r=i(de,r,P),fe===null?Q=de:fe.sibling=de,fe=de,Y=ae}if(P===p.length)return n(m,Y),ie&&Jt(m,P),Q;if(Y===null){for(;P<p.length;P++)Y=E(m,p[P],A),Y!==null&&(r=i(Y,r,P),fe===null?Q=Y:fe.sibling=Y,fe=Y);return ie&&Jt(m,P),Q}for(Y=a(Y);P<p.length;P++)ae=b(Y,m,P,p[P],A),ae!==null&&(e&&ae.alternate!==null&&Y.delete(ae.key===null?P:ae.key),r=i(ae,r,P),fe===null?Q=ae:fe.sibling=ae,fe=ae);return e&&Y.forEach(function(Nn){return t(m,Nn)}),ie&&Jt(m,P),Q}function K(m,r,p,A){if(p==null)throw Error(f(151));for(var Q=null,fe=null,Y=r,P=r=0,ae=null,de=p.next();Y!==null&&!de.done;P++,de=p.next()){Y.index>P?(ae=Y,Y=null):ae=Y.sibling;var Nn=y(m,Y,de.value,A);if(Nn===null){Y===null&&(Y=ae);break}e&&Y&&Nn.alternate===null&&t(m,Y),r=i(Nn,r,P),fe===null?Q=Nn:fe.sibling=Nn,fe=Nn,Y=ae}if(de.done)return n(m,Y),ie&&Jt(m,P),Q;if(Y===null){for(;!de.done;P++,de=p.next())de=E(m,de.value,A),de!==null&&(r=i(de,r,P),fe===null?Q=de:fe.sibling=de,fe=de);return ie&&Jt(m,P),Q}for(Y=a(Y);!de.done;P++,de=p.next())de=b(Y,m,P,de.value,A),de!==null&&(e&&de.alternate!==null&&Y.delete(de.key===null?P:de.key),r=i(de,r,P),fe===null?Q=de:fe.sibling=de,fe=de);return e&&Y.forEach(function(op){return t(m,op)}),ie&&Jt(m,P),Q}function Te(m,r,p,A){if(typeof p=="object"&&p!==null&&p.type===ce&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case le:e:{for(var Q=p.key;r!==null;){if(r.key===Q){if(Q=p.type,Q===ce){if(r.tag===7){n(m,r.sibling),A=l(r,p.props.children),A.return=m,m=A;break e}}else if(r.elementType===Q||typeof Q=="object"&&Q!==null&&Q.$$typeof===Ge&&ta(Q)===r.type){n(m,r.sibling),A=l(r,p.props),pl(A,p),A.return=m,m=A;break e}n(m,r);break}else t(m,r);r=r.sibling}p.type===ce?(A=Fn(p.props.children,m.mode,A,p.key),A.return=m,m=A):(A=di(p.type,p.key,p.props,null,m.mode,A),pl(A,p),A.return=m,m=A)}return u(m);case ze:e:{for(Q=p.key;r!==null;){if(r.key===Q)if(r.tag===4&&r.stateNode.containerInfo===p.containerInfo&&r.stateNode.implementation===p.implementation){n(m,r.sibling),A=l(r,p.children||[]),A.return=m,m=A;break e}else{n(m,r);break}else t(m,r);r=r.sibling}A=Zu(p,m.mode,A),A.return=m,m=A}return u(m);case Ge:return p=ta(p),Te(m,r,p,A)}if(dt(p))return L(m,r,p,A);if(Re(p)){if(Q=Re(p),typeof Q!="function")throw Error(f(150));return p=Q.call(p),K(m,r,p,A)}if(typeof p.then=="function")return Te(m,r,bi(p),A);if(p.$$typeof===se)return Te(m,r,pi(m,p),A);xi(m,p)}return typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint"?(p=""+p,r!==null&&r.tag===6?(n(m,r.sibling),A=l(r,p),A.return=m,m=A):(n(m,r),A=Vu(p,m.mode,A),A.return=m,m=A),u(m)):n(m,r)}return function(m,r,p,A){try{hl=0;var Q=Te(m,r,p,A);return ja=null,Q}catch(Y){if(Y===Da||Y===yi)throw Y;var fe=pt(29,Y,null,m.mode);return fe.lanes=A,fe.return=m,fe}finally{}}}var aa=ks(!0),Ks=ks(!1),bn=!1;function ao(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function lo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function xn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Sn(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,(he&2)!==0){var l=a.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),a.pending=t,t=fi(e),Cs(e,null,n),t}return ri(e,a,t,n),fi(e)}function gl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,wc(e,n)}}function io(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var u={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=u:i=i.next=u,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var uo=!1;function yl(){if(uo){var e=Ma;if(e!==null)throw e}}function vl(e,t,n,a){uo=!1;var l=e.updateQueue;bn=!1;var i=l.firstBaseUpdate,u=l.lastBaseUpdate,o=l.shared.pending;if(o!==null){l.shared.pending=null;var c=o,g=c.next;c.next=null,u===null?i=g:u.next=g,u=c;var x=e.alternate;x!==null&&(x=x.updateQueue,o=x.lastBaseUpdate,o!==u&&(o===null?x.firstBaseUpdate=g:o.next=g,x.lastBaseUpdate=c))}if(i!==null){var E=l.baseState;u=0,x=g=c=null,o=i;do{var y=o.lane&-536870913,b=y!==o.lane;if(b?(ne&y)===y:(a&y)===y){y!==0&&y===_a&&(uo=!0),x!==null&&(x=x.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var L=e,K=o;y=t;var Te=n;switch(K.tag){case 1:if(L=K.payload,typeof L=="function"){E=L.call(Te,E,y);break e}E=L;break e;case 3:L.flags=L.flags&-65537|128;case 0:if(L=K.payload,y=typeof L=="function"?L.call(Te,E,y):L,y==null)break e;E=O({},E,y);break e;case 2:bn=!0}}y=o.callback,y!==null&&(e.flags|=64,b&&(e.flags|=8192),b=l.callbacks,b===null?l.callbacks=[y]:b.push(y))}else b={lane:y,tag:o.tag,payload:o.payload,callback:o.callback,next:null},x===null?(g=x=b,c=E):x=x.next=b,u|=y;if(o=o.next,o===null){if(o=l.shared.pending,o===null)break;b=o,o=b.next,b.next=null,l.lastBaseUpdate=b,l.shared.pending=null}}while(!0);x===null&&(c=E),l.baseState=c,l.firstBaseUpdate=g,l.lastBaseUpdate=x,i===null&&(l.shared.lanes=0),_n|=u,e.lanes=u,e.memoizedState=E}}function Js(e,t){if(typeof e!="function")throw Error(f(191,e));e.call(t)}function Ws(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Js(n[e],t)}var Ca=d(null),Si=d(0);function Fs(e,t){e=un,q(Si,e),q(Ca,t),un=e|t.baseLanes}function oo(){q(Si,un),q(Ca,Ca.current)}function co(){un=Si.current,z(Ca),z(Si)}var gt=d(null),Ct=null;function Tn(e){var t=e.alternate;q(He,He.current&1),q(gt,e),Ct===null&&(t===null||Ca.current!==null||t.memoizedState!==null)&&(Ct=e)}function so(e){q(He,He.current),q(gt,e),Ct===null&&(Ct=e)}function $s(e){e.tag===22?(q(He,He.current),q(gt,e),Ct===null&&(Ct=e)):An()}function An(){q(He,He.current),q(gt,gt.current)}function yt(e){z(gt),Ct===e&&(Ct=null),z(He)}var He=d(0);function Ti(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||gc(n)||yc(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var $t=0,$=null,xe=null,we=null,Ai=!1,Oa=!1,la=!1,Ei=0,bl=0,Ra=null,$m=0;function Ue(){throw Error(f(321))}function ro(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ht(e[n],t[n]))return!1;return!0}function fo(e,t,n,a,l,i){return $t=i,$=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,T.H=e===null||e.memoizedState===null?qr:Mo,la=!1,i=n(a,l),la=!1,Oa&&(i=Ps(t,n,a,l)),Is(e),i}function Is(e){T.H=Tl;var t=xe!==null&&xe.next!==null;if($t=0,we=xe=$=null,Ai=!1,bl=0,Ra=null,t)throw Error(f(300));e===null||Le||(e=e.dependencies,e!==null&&hi(e)&&(Le=!0))}function Ps(e,t,n,a){$=e;var l=0;do{if(Oa&&(Ra=null),bl=0,Oa=!1,25<=l)throw Error(f(301));if(l+=1,we=xe=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}T.H=Hr,i=t(n,a)}while(Oa);return i}function Im(){var e=T.H,t=e.useState()[0];return t=typeof t.then=="function"?xl(t):t,e=e.useState()[0],(xe!==null?xe.memoizedState:null)!==e&&($.flags|=1024),t}function mo(){var e=Ei!==0;return Ei=0,e}function ho(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function po(e){if(Ai){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ai=!1}$t=0,we=xe=$=null,Oa=!1,bl=Ei=0,Ra=null}function nt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return we===null?$.memoizedState=we=e:we=we.next=e,we}function Ne(){if(xe===null){var e=$.alternate;e=e!==null?e.memoizedState:null}else e=xe.next;var t=we===null?$.memoizedState:we.next;if(t!==null)we=t,xe=e;else{if(e===null)throw $.alternate===null?Error(f(467)):Error(f(310));xe=e,e={memoizedState:xe.memoizedState,baseState:xe.baseState,baseQueue:xe.baseQueue,queue:xe.queue,next:null},we===null?$.memoizedState=we=e:we=we.next=e}return we}function zi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xl(e){var t=bl;return bl+=1,Ra===null&&(Ra=[]),e=Qs(Ra,e,t),t=$,(we===null?t.memoizedState:we.next)===null&&(t=t.alternate,T.H=t===null||t.memoizedState===null?qr:Mo),e}function _i(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return xl(e);if(e.$$typeof===se)return We(e)}throw Error(f(438,String(e)))}function go(e){var t=null,n=$.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var a=$.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(l){return l.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=zi(),$.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),a=0;a<e;a++)n[a]=Ut;return t.index++,n}function It(e,t){return typeof t=="function"?t(e):t}function Mi(e){var t=Ne();return yo(t,xe,e)}function yo(e,t,n){var a=e.queue;if(a===null)throw Error(f(311));a.lastRenderedReducer=n;var l=e.baseQueue,i=a.pending;if(i!==null){if(l!==null){var u=l.next;l.next=i.next,i.next=u}t.baseQueue=l=i,a.pending=null}if(i=e.baseState,l===null)e.memoizedState=i;else{t=l.next;var o=u=null,c=null,g=t,x=!1;do{var E=g.lane&-536870913;if(E!==g.lane?(ne&E)===E:($t&E)===E){var y=g.revertLane;if(y===0)c!==null&&(c=c.next={lane:0,revertLane:0,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null}),E===_a&&(x=!0);else if(($t&y)===y){g=g.next,y===_a&&(x=!0);continue}else E={lane:0,revertLane:g.revertLane,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},c===null?(o=c=E,u=i):c=c.next=E,$.lanes|=y,_n|=y;E=g.action,la&&n(i,E),i=g.hasEagerState?g.eagerState:n(i,E)}else y={lane:E,revertLane:g.revertLane,gesture:g.gesture,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},c===null?(o=c=y,u=i):c=c.next=y,$.lanes|=E,_n|=E;g=g.next}while(g!==null&&g!==t);if(c===null?u=i:c.next=o,!ht(i,e.memoizedState)&&(Le=!0,x&&(n=Ma,n!==null)))throw n;e.memoizedState=i,e.baseState=u,e.baseQueue=c,a.lastRenderedState=i}return l===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function vo(e){var t=Ne(),n=t.queue;if(n===null)throw Error(f(311));n.lastRenderedReducer=e;var a=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var u=l=l.next;do i=e(i,u.action),u=u.next;while(u!==l);ht(i,t.memoizedState)||(Le=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,a]}function er(e,t,n){var a=$,l=Ne(),i=ie;if(i){if(n===void 0)throw Error(f(407));n=n()}else n=t();var u=!ht((xe||l).memoizedState,n);if(u&&(l.memoizedState=n,Le=!0),l=l.queue,So(ar.bind(null,a,l,e),[e]),l.getSnapshot!==t||u||we!==null&&we.memoizedState.tag&1){if(a.flags|=2048,Ua(9,{destroy:void 0},nr.bind(null,a,l,n,t),null),Ae===null)throw Error(f(349));i||($t&127)!==0||tr(a,t,n)}return n}function tr(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=$.updateQueue,t===null?(t=zi(),$.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function nr(e,t,n,a){t.value=n,t.getSnapshot=a,lr(t)&&ir(e)}function ar(e,t,n){return n(function(){lr(t)&&ir(e)})}function lr(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ht(e,n)}catch{return!0}}function ir(e){var t=Wn(e,2);t!==null&&rt(t,e,2)}function bo(e){var t=nt();if(typeof e=="function"){var n=e;if(e=n(),la){qt(!0);try{n()}finally{qt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:It,lastRenderedState:e},t}function ur(e,t,n,a){return e.baseState=n,yo(e,xe,typeof a=="function"?a:It)}function Pm(e,t,n,a,l){if(Ci(e))throw Error(f(485));if(e=t.action,e!==null){var i={payload:l,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){i.listeners.push(u)}};T.T!==null?n(!0):i.isTransition=!1,a(i),n=t.pending,n===null?(i.next=t.pending=i,or(t,i)):(i.next=n.next,t.pending=n.next=i)}}function or(e,t){var n=t.action,a=t.payload,l=e.state;if(t.isTransition){var i=T.T,u={};T.T=u;try{var o=n(l,a),c=T.S;c!==null&&c(u,o),cr(e,t,o)}catch(g){xo(e,t,g)}finally{i!==null&&u.types!==null&&(i.types=u.types),T.T=i}}else try{i=n(l,a),cr(e,t,i)}catch(g){xo(e,t,g)}}function cr(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){sr(e,t,a)},function(a){return xo(e,t,a)}):sr(e,t,n)}function sr(e,t,n){t.status="fulfilled",t.value=n,rr(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,or(e,n)))}function xo(e,t,n){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=n,rr(t),t=t.next;while(t!==a)}e.action=null}function rr(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function fr(e,t){return t}function dr(e,t){if(ie){var n=Ae.formState;if(n!==null){e:{var a=$;if(ie){if(_e){t:{for(var l=_e,i=jt;l.nodeType!==8;){if(!i){l=null;break t}if(l=Ot(l.nextSibling),l===null){l=null;break t}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){_e=Ot(l.nextSibling),a=l.data==="F!";break e}}yn(a)}a=!1}a&&(t=n[0])}}return n=nt(),n.memoizedState=n.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fr,lastRenderedState:t},n.queue=a,n=Or.bind(null,$,a),a.dispatch=n,a=bo(!1),i=_o.bind(null,$,!1,a.queue),a=nt(),l={state:t,dispatch:null,action:e,pending:null},a.queue=l,n=Pm.bind(null,$,l,i,n),l.dispatch=n,a.memoizedState=e,[t,n,!1]}function mr(e){var t=Ne();return hr(t,xe,e)}function hr(e,t,n){if(t=yo(e,t,fr)[0],e=Mi(It)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=xl(t)}catch(u){throw u===Da?yi:u}else a=t;t=Ne();var l=t.queue,i=l.dispatch;return n!==t.memoizedState&&($.flags|=2048,Ua(9,{destroy:void 0},eh.bind(null,l,n),null)),[a,i,e]}function eh(e,t){e.action=t}function pr(e){var t=Ne(),n=xe;if(n!==null)return hr(t,n,e);Ne(),t=t.memoizedState,n=Ne();var a=n.queue.dispatch;return n.memoizedState=e,[t,a,!1]}function Ua(e,t,n,a){return e={tag:e,create:n,deps:a,inst:t,next:null},t=$.updateQueue,t===null&&(t=zi(),$.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e),e}function gr(){return Ne().memoizedState}function Di(e,t,n,a){var l=nt();$.flags|=e,l.memoizedState=Ua(1|t,{destroy:void 0},n,a===void 0?null:a)}function ji(e,t,n,a){var l=Ne();a=a===void 0?null:a;var i=l.memoizedState.inst;xe!==null&&a!==null&&ro(a,xe.memoizedState.deps)?l.memoizedState=Ua(t,i,n,a):($.flags|=e,l.memoizedState=Ua(1|t,i,n,a))}function yr(e,t){Di(8390656,8,e,t)}function So(e,t){ji(2048,8,e,t)}function th(e){$.flags|=4;var t=$.updateQueue;if(t===null)t=zi(),$.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function vr(e){var t=Ne().memoizedState;return th({ref:t,nextImpl:e}),function(){if((he&2)!==0)throw Error(f(440));return t.impl.apply(void 0,arguments)}}function br(e,t){return ji(4,2,e,t)}function xr(e,t){return ji(4,4,e,t)}function Sr(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Tr(e,t,n){n=n!=null?n.concat([e]):null,ji(4,4,Sr.bind(null,t,e),n)}function To(){}function Ar(e,t){var n=Ne();t=t===void 0?null:t;var a=n.memoizedState;return t!==null&&ro(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function Er(e,t){var n=Ne();t=t===void 0?null:t;var a=n.memoizedState;if(t!==null&&ro(t,a[1]))return a[0];if(a=e(),la){qt(!0);try{e()}finally{qt(!1)}}return n.memoizedState=[a,t],a}function Ao(e,t,n){return n===void 0||($t&1073741824)!==0&&(ne&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=_f(),$.lanes|=e,_n|=e,n)}function zr(e,t,n,a){return ht(n,t)?n:Ca.current!==null?(e=Ao(e,n,a),ht(e,t)||(Le=!0),e):($t&42)===0||($t&1073741824)!==0&&(ne&261930)===0?(Le=!0,e.memoizedState=n):(e=_f(),$.lanes|=e,_n|=e,t)}function _r(e,t,n,a,l){var i=U.p;U.p=i!==0&&8>i?i:8;var u=T.T,o={};T.T=o,_o(e,!1,t,n);try{var c=l(),g=T.S;if(g!==null&&g(o,c),c!==null&&typeof c=="object"&&typeof c.then=="function"){var x=Fm(c,a);Sl(e,t,x,xt(e))}else Sl(e,t,a,xt(e))}catch(E){Sl(e,t,{then:function(){},status:"rejected",reason:E},xt())}finally{U.p=i,u!==null&&o.types!==null&&(u.types=o.types),T.T=u}}function nh(){}function Eo(e,t,n,a){if(e.tag!==5)throw Error(f(476));var l=Mr(e).queue;_r(e,l,t,k,n===null?nh:function(){return Dr(e),n(a)})}function Mr(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:k,baseState:k,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:It,lastRenderedState:k},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:It,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Dr(e){var t=Mr(e);t.next===null&&(t=e.alternate.memoizedState),Sl(e,t.next.queue,{},xt())}function zo(){return We(wl)}function jr(){return Ne().memoizedState}function Cr(){return Ne().memoizedState}function ah(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=xt();e=xn(n);var a=Sn(t,e,n);a!==null&&(rt(a,t,n),gl(a,t,n)),t={cache:Pu()},e.payload=t;return}t=t.return}}function lh(e,t,n){var a=xt();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ci(e)?Rr(t,n):(n=Xu(e,t,n,a),n!==null&&(rt(n,e,a),Ur(n,t,a)))}function Or(e,t,n){var a=xt();Sl(e,t,n,a)}function Sl(e,t,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ci(e))Rr(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var u=t.lastRenderedState,o=i(u,n);if(l.hasEagerState=!0,l.eagerState=o,ht(o,u))return ri(e,t,l,0),Ae===null&&si(),!1}catch{}finally{}if(n=Xu(e,t,l,a),n!==null)return rt(n,e,a),Ur(n,t,a),!0}return!1}function _o(e,t,n,a){if(a={lane:2,revertLane:lc(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Ci(e)){if(t)throw Error(f(479))}else t=Xu(e,n,a,2),t!==null&&rt(t,e,2)}function Ci(e){var t=e.alternate;return e===$||t!==null&&t===$}function Rr(e,t){Oa=Ai=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ur(e,t,n){if((n&4194048)!==0){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,wc(e,n)}}var Tl={readContext:We,use:_i,useCallback:Ue,useContext:Ue,useEffect:Ue,useImperativeHandle:Ue,useLayoutEffect:Ue,useInsertionEffect:Ue,useMemo:Ue,useReducer:Ue,useRef:Ue,useState:Ue,useDebugValue:Ue,useDeferredValue:Ue,useTransition:Ue,useSyncExternalStore:Ue,useId:Ue,useHostTransitionStatus:Ue,useFormState:Ue,useActionState:Ue,useOptimistic:Ue,useMemoCache:Ue,useCacheRefresh:Ue};Tl.useEffectEvent=Ue;var qr={readContext:We,use:_i,useCallback:function(e,t){return nt().memoizedState=[e,t===void 0?null:t],e},useContext:We,useEffect:yr,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Di(4194308,4,Sr.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Di(4194308,4,e,t)},useInsertionEffect:function(e,t){Di(4,2,e,t)},useMemo:function(e,t){var n=nt();t=t===void 0?null:t;var a=e();if(la){qt(!0);try{e()}finally{qt(!1)}}return n.memoizedState=[a,t],a},useReducer:function(e,t,n){var a=nt();if(n!==void 0){var l=n(t);if(la){qt(!0);try{n(t)}finally{qt(!1)}}}else l=t;return a.memoizedState=a.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},a.queue=e,e=e.dispatch=lh.bind(null,$,e),[a.memoizedState,e]},useRef:function(e){var t=nt();return e={current:e},t.memoizedState=e},useState:function(e){e=bo(e);var t=e.queue,n=Or.bind(null,$,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:To,useDeferredValue:function(e,t){var n=nt();return Ao(n,e,t)},useTransition:function(){var e=bo(!1);return e=_r.bind(null,$,e.queue,!0,!1),nt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var a=$,l=nt();if(ie){if(n===void 0)throw Error(f(407));n=n()}else{if(n=t(),Ae===null)throw Error(f(349));(ne&127)!==0||tr(a,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,yr(ar.bind(null,a,i,e),[e]),a.flags|=2048,Ua(9,{destroy:void 0},nr.bind(null,a,i,n,t),null),n},useId:function(){var e=nt(),t=Ae.identifierPrefix;if(ie){var n=Lt,a=wt;n=(a&~(1<<32-et(a)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Ei++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=$m++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:zo,useFormState:dr,useActionState:dr,useOptimistic:function(e){var t=nt();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=_o.bind(null,$,!0,n),n.dispatch=t,[e,t]},useMemoCache:go,useCacheRefresh:function(){return nt().memoizedState=ah.bind(null,$)},useEffectEvent:function(e){var t=nt(),n={impl:e};return t.memoizedState=n,function(){if((he&2)!==0)throw Error(f(440));return n.impl.apply(void 0,arguments)}}},Mo={readContext:We,use:_i,useCallback:Ar,useContext:We,useEffect:So,useImperativeHandle:Tr,useInsertionEffect:br,useLayoutEffect:xr,useMemo:Er,useReducer:Mi,useRef:gr,useState:function(){return Mi(It)},useDebugValue:To,useDeferredValue:function(e,t){var n=Ne();return zr(n,xe.memoizedState,e,t)},useTransition:function(){var e=Mi(It)[0],t=Ne().memoizedState;return[typeof e=="boolean"?e:xl(e),t]},useSyncExternalStore:er,useId:jr,useHostTransitionStatus:zo,useFormState:mr,useActionState:mr,useOptimistic:function(e,t){var n=Ne();return ur(n,xe,e,t)},useMemoCache:go,useCacheRefresh:Cr};Mo.useEffectEvent=vr;var Hr={readContext:We,use:_i,useCallback:Ar,useContext:We,useEffect:So,useImperativeHandle:Tr,useInsertionEffect:br,useLayoutEffect:xr,useMemo:Er,useReducer:vo,useRef:gr,useState:function(){return vo(It)},useDebugValue:To,useDeferredValue:function(e,t){var n=Ne();return xe===null?Ao(n,e,t):zr(n,xe.memoizedState,e,t)},useTransition:function(){var e=vo(It)[0],t=Ne().memoizedState;return[typeof e=="boolean"?e:xl(e),t]},useSyncExternalStore:er,useId:jr,useHostTransitionStatus:zo,useFormState:pr,useActionState:pr,useOptimistic:function(e,t){var n=Ne();return xe!==null?ur(n,xe,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:go,useCacheRefresh:Cr};Hr.useEffectEvent=vr;function Do(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:O({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var jo={enqueueSetState:function(e,t,n){e=e._reactInternals;var a=xt(),l=xn(a);l.payload=t,n!=null&&(l.callback=n),t=Sn(e,l,a),t!==null&&(rt(t,e,a),gl(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=xt(),l=xn(a);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=Sn(e,l,a),t!==null&&(rt(t,e,a),gl(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=xt(),a=xn(n);a.tag=2,t!=null&&(a.callback=t),t=Sn(e,a,n),t!==null&&(rt(t,e,n),gl(t,e,n))}};function Nr(e,t,n,a,l,i,u){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,i,u):t.prototype&&t.prototype.isPureReactComponent?!cl(n,a)||!cl(l,i):!0}function Br(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&jo.enqueueReplaceState(t,t.state,null)}function ia(e,t){var n=t;if("ref"in t){n={};for(var a in t)a!=="ref"&&(n[a]=t[a])}if(e=e.defaultProps){n===t&&(n=O({},n));for(var l in e)n[l]===void 0&&(n[l]=e[l])}return n}function wr(e){ci(e)}function Lr(e){console.error(e)}function Yr(e){ci(e)}function Oi(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function Gr(e,t,n){try{var a=e.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Co(e,t,n){return n=xn(n),n.tag=3,n.payload={element:null},n.callback=function(){Oi(e,t)},n}function Xr(e){return e=xn(e),e.tag=3,e}function Qr(e,t,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;e.payload=function(){return l(i)},e.callback=function(){Gr(t,n,a)}}var u=n.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(e.callback=function(){Gr(t,n,a),typeof l!="function"&&(Mn===null?Mn=new Set([this]):Mn.add(this));var o=a.stack;this.componentDidCatch(a.value,{componentStack:o!==null?o:""})})}function ih(e,t,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=n.alternate,t!==null&&za(t,n,l,!0),n=gt.current,n!==null){switch(n.tag){case 31:case 13:return Ct===null?Qi():n.alternate===null&&qe===0&&(qe=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===vi?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([a]):t.add(a),tc(e,a,l)),!1;case 22:return n.flags|=65536,a===vi?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([a]):n.add(a)),tc(e,a,l)),!1}throw Error(f(435,n.tag))}return tc(e,a,l),Qi(),!1}if(ie)return t=gt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=l,a!==Ju&&(e=Error(f(422),{cause:a}),fl(_t(e,n)))):(a!==Ju&&(t=Error(f(423),{cause:a}),fl(_t(t,n))),e=e.current.alternate,e.flags|=65536,l&=-l,e.lanes|=l,a=_t(a,n),l=Co(e.stateNode,a,l),io(e,l),qe!==4&&(qe=2)),!1;var i=Error(f(520),{cause:a});if(i=_t(i,n),Cl===null?Cl=[i]:Cl.push(i),qe!==4&&(qe=2),t===null)return!0;a=_t(a,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=l&-l,n.lanes|=e,e=Co(n.stateNode,a,e),io(n,e),!1;case 1:if(t=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(Mn===null||!Mn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=Xr(l),Qr(l,e,n,a),io(n,l),!1}n=n.return}while(n!==null);return!1}var Oo=Error(f(461)),Le=!1;function Fe(e,t,n,a){t.child=e===null?Ks(t,null,n,a):aa(t,e.child,n,a)}function Vr(e,t,n,a,l){n=n.render;var i=t.ref;if("ref"in a){var u={};for(var o in a)o!=="ref"&&(u[o]=a[o])}else u=a;return Pn(t),a=fo(e,t,n,u,i,l),o=mo(),e!==null&&!Le?(ho(e,t,l),Pt(e,t,l)):(ie&&o&&ku(t),t.flags|=1,Fe(e,t,a,l),t.child)}function Zr(e,t,n,a,l){if(e===null){var i=n.type;return typeof i=="function"&&!Qu(i)&&i.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=i,kr(e,t,i,a,l)):(e=di(n.type,null,a,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!Lo(e,l)){var u=i.memoizedProps;if(n=n.compare,n=n!==null?n:cl,n(u,a)&&e.ref===t.ref)return Pt(e,t,l)}return t.flags|=1,e=Kt(i,a),e.ref=t.ref,e.return=t,t.child=e}function kr(e,t,n,a,l){if(e!==null){var i=e.memoizedProps;if(cl(i,a)&&e.ref===t.ref)if(Le=!1,t.pendingProps=a=i,Lo(e,l))(e.flags&131072)!==0&&(Le=!0);else return t.lanes=e.lanes,Pt(e,t,l)}return Ro(e,t,n,a,l)}function Kr(e,t,n,a){var l=a.children,i=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((t.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,e!==null){for(a=t.child=e.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,t.child=null;return Jr(e,t,i,n,a)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&gi(t,i!==null?i.cachePool:null),i!==null?Fs(t,i):oo(),$s(t);else return a=t.lanes=536870912,Jr(e,t,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(gi(t,i.cachePool),Fs(t,i),An(),t.memoizedState=null):(e!==null&&gi(t,null),oo(),An());return Fe(e,t,l,n),t.child}function Al(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Jr(e,t,n,a,l){var i=to();return i=i===null?null:{parent:Be._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},e!==null&&gi(t,null),oo(),$s(t),e!==null&&za(e,t,a,!0),t.childLanes=l,null}function Ri(e,t){return t=qi({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Wr(e,t,n){return aa(t,e.child,null,n),e=Ri(t,t.pendingProps),e.flags|=2,yt(t),t.memoizedState=null,e}function uh(e,t,n){var a=t.pendingProps,l=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(ie){if(a.mode==="hidden")return e=Ri(t,a),t.lanes=536870912,Al(null,e);if(so(t),(e=_e)?(e=cd(e,jt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:pn!==null?{id:wt,overflow:Lt}:null,retryLane:536870912,hydrationErrors:null},n=Rs(e),n.return=t,t.child=n,Je=t,_e=null)):e=null,e===null)throw yn(t);return t.lanes=536870912,null}return Ri(t,a)}var i=e.memoizedState;if(i!==null){var u=i.dehydrated;if(so(t),l)if(t.flags&256)t.flags&=-257,t=Wr(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(f(558));else if(Le||za(e,t,n,!1),l=(n&e.childLanes)!==0,Le||l){if(a=Ae,a!==null&&(u=Lc(a,n),u!==0&&u!==i.retryLane))throw i.retryLane=u,Wn(e,u),rt(a,e,u),Oo;Qi(),t=Wr(e,t,n)}else e=i.treeContext,_e=Ot(u.nextSibling),Je=t,ie=!0,gn=null,jt=!1,e!==null&&Hs(t,e),t=Ri(t,a),t.flags|=4096;return t}return e=Kt(e.child,{mode:a.mode,children:a.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Ui(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(f(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Ro(e,t,n,a,l){return Pn(t),n=fo(e,t,n,a,void 0,l),a=mo(),e!==null&&!Le?(ho(e,t,l),Pt(e,t,l)):(ie&&a&&ku(t),t.flags|=1,Fe(e,t,n,l),t.child)}function Fr(e,t,n,a,l,i){return Pn(t),t.updateQueue=null,n=Ps(t,a,n,l),Is(e),a=mo(),e!==null&&!Le?(ho(e,t,i),Pt(e,t,i)):(ie&&a&&ku(t),t.flags|=1,Fe(e,t,n,i),t.child)}function $r(e,t,n,a,l){if(Pn(t),t.stateNode===null){var i=Sa,u=n.contextType;typeof u=="object"&&u!==null&&(i=We(u)),i=new n(a,i),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=jo,t.stateNode=i,i._reactInternals=t,i=t.stateNode,i.props=a,i.state=t.memoizedState,i.refs={},ao(t),u=n.contextType,i.context=typeof u=="object"&&u!==null?We(u):Sa,i.state=t.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(Do(t,n,u,a),i.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(u=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),u!==i.state&&jo.enqueueReplaceState(i,i.state,null),vl(t,a,i,l),yl(),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(e===null){i=t.stateNode;var o=t.memoizedProps,c=ia(n,o);i.props=c;var g=i.context,x=n.contextType;u=Sa,typeof x=="object"&&x!==null&&(u=We(x));var E=n.getDerivedStateFromProps;x=typeof E=="function"||typeof i.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,x||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o||g!==u)&&Br(t,i,a,u),bn=!1;var y=t.memoizedState;i.state=y,vl(t,a,i,l),yl(),g=t.memoizedState,o||y!==g||bn?(typeof E=="function"&&(Do(t,n,E,a),g=t.memoizedState),(c=bn||Nr(t,n,c,a,y,g,u))?(x||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=g),i.props=a,i.state=g,i.context=u,a=c):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,lo(e,t),u=t.memoizedProps,x=ia(n,u),i.props=x,E=t.pendingProps,y=i.context,g=n.contextType,c=Sa,typeof g=="object"&&g!==null&&(c=We(g)),o=n.getDerivedStateFromProps,(g=typeof o=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==E||y!==c)&&Br(t,i,a,c),bn=!1,y=t.memoizedState,i.state=y,vl(t,a,i,l),yl();var b=t.memoizedState;u!==E||y!==b||bn||e!==null&&e.dependencies!==null&&hi(e.dependencies)?(typeof o=="function"&&(Do(t,n,o,a),b=t.memoizedState),(x=bn||Nr(t,n,x,a,y,b,c)||e!==null&&e.dependencies!==null&&hi(e.dependencies))?(g||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,b,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,b,c)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=b),i.props=a,i.state=b,i.context=c,a=x):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),a=!1)}return i=a,Ui(e,t),a=(t.flags&128)!==0,i||a?(i=t.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),t.flags|=1,e!==null&&a?(t.child=aa(t,e.child,null,l),t.child=aa(t,null,n,l)):Fe(e,t,n,l),t.memoizedState=i.state,e=t.child):e=Pt(e,t,l),e}function Ir(e,t,n,a){return $n(),t.flags|=256,Fe(e,t,n,a),t.child}var Uo={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function qo(e){return{baseLanes:e,cachePool:Gs()}}function Ho(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=bt),e}function Pr(e,t,n){var a=t.pendingProps,l=!1,i=(t.flags&128)!==0,u;if((u=i)||(u=e!==null&&e.memoizedState===null?!1:(He.current&2)!==0),u&&(l=!0,t.flags&=-129),u=(t.flags&32)!==0,t.flags&=-33,e===null){if(ie){if(l?Tn(t):An(),(e=_e)?(e=cd(e,jt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:pn!==null?{id:wt,overflow:Lt}:null,retryLane:536870912,hydrationErrors:null},n=Rs(e),n.return=t,t.child=n,Je=t,_e=null)):e=null,e===null)throw yn(t);return yc(e)?t.lanes=32:t.lanes=536870912,null}var o=a.children;return a=a.fallback,l?(An(),l=t.mode,o=qi({mode:"hidden",children:o},l),a=Fn(a,l,n,null),o.return=t,a.return=t,o.sibling=a,t.child=o,a=t.child,a.memoizedState=qo(n),a.childLanes=Ho(e,u,n),t.memoizedState=Uo,Al(null,a)):(Tn(t),No(t,o))}var c=e.memoizedState;if(c!==null&&(o=c.dehydrated,o!==null)){if(i)t.flags&256?(Tn(t),t.flags&=-257,t=Bo(e,t,n)):t.memoizedState!==null?(An(),t.child=e.child,t.flags|=128,t=null):(An(),o=a.fallback,l=t.mode,a=qi({mode:"visible",children:a.children},l),o=Fn(o,l,n,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,aa(t,e.child,null,n),a=t.child,a.memoizedState=qo(n),a.childLanes=Ho(e,u,n),t.memoizedState=Uo,t=Al(null,a));else if(Tn(t),yc(o)){if(u=o.nextSibling&&o.nextSibling.dataset,u)var g=u.dgst;u=g,a=Error(f(419)),a.stack="",a.digest=u,fl({value:a,source:null,stack:null}),t=Bo(e,t,n)}else if(Le||za(e,t,n,!1),u=(n&e.childLanes)!==0,Le||u){if(u=Ae,u!==null&&(a=Lc(u,n),a!==0&&a!==c.retryLane))throw c.retryLane=a,Wn(e,a),rt(u,e,a),Oo;gc(o)||Qi(),t=Bo(e,t,n)}else gc(o)?(t.flags|=192,t.child=e.child,t=null):(e=c.treeContext,_e=Ot(o.nextSibling),Je=t,ie=!0,gn=null,jt=!1,e!==null&&Hs(t,e),t=No(t,a.children),t.flags|=4096);return t}return l?(An(),o=a.fallback,l=t.mode,c=e.child,g=c.sibling,a=Kt(c,{mode:"hidden",children:a.children}),a.subtreeFlags=c.subtreeFlags&65011712,g!==null?o=Kt(g,o):(o=Fn(o,l,n,null),o.flags|=2),o.return=t,a.return=t,a.sibling=o,t.child=a,Al(null,a),a=t.child,o=e.child.memoizedState,o===null?o=qo(n):(l=o.cachePool,l!==null?(c=Be._currentValue,l=l.parent!==c?{parent:c,pool:c}:l):l=Gs(),o={baseLanes:o.baseLanes|n,cachePool:l}),a.memoizedState=o,a.childLanes=Ho(e,u,n),t.memoizedState=Uo,Al(e.child,a)):(Tn(t),n=e.child,e=n.sibling,n=Kt(n,{mode:"visible",children:a.children}),n.return=t,n.sibling=null,e!==null&&(u=t.deletions,u===null?(t.deletions=[e],t.flags|=16):u.push(e)),t.child=n,t.memoizedState=null,n)}function No(e,t){return t=qi({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function qi(e,t){return e=pt(22,e,null,t),e.lanes=0,e}function Bo(e,t,n){return aa(t,e.child,null,n),e=No(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function ef(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),$u(e.return,t,n)}function wo(e,t,n,a,l,i){var u=e.memoizedState;u===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(u.isBackwards=t,u.rendering=null,u.renderingStartTime=0,u.last=a,u.tail=n,u.tailMode=l,u.treeForkCount=i)}function tf(e,t,n){var a=t.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var u=He.current,o=(u&2)!==0;if(o?(u=u&1|2,t.flags|=128):u&=1,q(He,u),Fe(e,t,a,n),a=ie?rl:0,!o&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ef(e,n,t);else if(e.tag===19)ef(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&Ti(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),wo(t,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Ti(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}wo(t,!0,n,null,i,a);break;case"together":wo(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function Pt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),_n|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(za(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(f(153));if(t.child!==null){for(e=t.child,n=Kt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Kt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Lo(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&hi(e)))}function oh(e,t,n){switch(t.tag){case 3:Xe(t,t.stateNode.containerInfo),vn(t,Be,e.memoizedState.cache),$n();break;case 27:case 5:Bn(t);break;case 4:Xe(t,t.stateNode.containerInfo);break;case 10:vn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,so(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(Tn(t),t.flags|=128,null):(n&t.child.childLanes)!==0?Pr(e,t,n):(Tn(t),e=Pt(e,t,n),e!==null?e.sibling:null);Tn(t);break;case 19:var l=(e.flags&128)!==0;if(a=(n&t.childLanes)!==0,a||(za(e,t,n,!1),a=(n&t.childLanes)!==0),l){if(a)return tf(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),q(He,He.current),a)break;return null;case 22:return t.lanes=0,Kr(e,t,n,t.pendingProps);case 24:vn(t,Be,e.memoizedState.cache)}return Pt(e,t,n)}function nf(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Le=!0;else{if(!Lo(e,n)&&(t.flags&128)===0)return Le=!1,oh(e,t,n);Le=(e.flags&131072)!==0}else Le=!1,ie&&(t.flags&1048576)!==0&&qs(t,rl,t.index);switch(t.lanes=0,t.tag){case 16:e:{var a=t.pendingProps;if(e=ta(t.elementType),t.type=e,typeof e=="function")Qu(e)?(a=ia(e,a),t.tag=1,t=$r(null,t,e,a,n)):(t.tag=0,t=Ro(null,t,e,a,n));else{if(e!=null){var l=e.$$typeof;if(l===I){t.tag=11,t=Vr(null,t,e,a,n);break e}else if(l===B){t.tag=14,t=Zr(null,t,e,a,n);break e}}throw t=Tt(e)||e,Error(f(306,t,""))}}return t;case 0:return Ro(e,t,t.type,t.pendingProps,n);case 1:return a=t.type,l=ia(a,t.pendingProps),$r(e,t,a,l,n);case 3:e:{if(Xe(t,t.stateNode.containerInfo),e===null)throw Error(f(387));a=t.pendingProps;var i=t.memoizedState;l=i.element,lo(e,t),vl(t,a,null,n);var u=t.memoizedState;if(a=u.cache,vn(t,Be,a),a!==i.cache&&Iu(t,[Be],n,!0),yl(),a=u.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:u.cache},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){t=Ir(e,t,a,n);break e}else if(a!==l){l=_t(Error(f(424)),t),fl(l),t=Ir(e,t,a,n);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(_e=Ot(e.firstChild),Je=t,ie=!0,gn=null,jt=!0,n=Ks(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if($n(),a===l){t=Pt(e,t,n);break e}Fe(e,t,a,n)}t=t.child}return t;case 26:return Ui(e,t),e===null?(n=hd(t.type,null,t.pendingProps,null))?t.memoizedState=n:ie||(n=t.type,e=t.pendingProps,a=Fi(Z.current).createElement(n),a[Ke]=t,a[lt]=e,$e(a,n,e),Ze(a),t.stateNode=a):t.memoizedState=hd(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Bn(t),e===null&&ie&&(a=t.stateNode=fd(t.type,t.pendingProps,Z.current),Je=t,jt=!0,l=_e,On(t.type)?(vc=l,_e=Ot(a.firstChild)):_e=l),Fe(e,t,t.pendingProps.children,n),Ui(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ie&&((l=a=_e)&&(a=Bh(a,t.type,t.pendingProps,jt),a!==null?(t.stateNode=a,Je=t,_e=Ot(a.firstChild),jt=!1,l=!0):l=!1),l||yn(t)),Bn(t),l=t.type,i=t.pendingProps,u=e!==null?e.memoizedProps:null,a=i.children,mc(l,i)?a=null:u!==null&&mc(l,u)&&(t.flags|=32),t.memoizedState!==null&&(l=fo(e,t,Im,null,null,n),wl._currentValue=l),Ui(e,t),Fe(e,t,a,n),t.child;case 6:return e===null&&ie&&((e=n=_e)&&(n=wh(n,t.pendingProps,jt),n!==null?(t.stateNode=n,Je=t,_e=null,e=!0):e=!1),e||yn(t)),null;case 13:return Pr(e,t,n);case 4:return Xe(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=aa(t,null,a,n):Fe(e,t,a,n),t.child;case 11:return Vr(e,t,t.type,t.pendingProps,n);case 7:return Fe(e,t,t.pendingProps,n),t.child;case 8:return Fe(e,t,t.pendingProps.children,n),t.child;case 12:return Fe(e,t,t.pendingProps.children,n),t.child;case 10:return a=t.pendingProps,vn(t,t.type,a.value),Fe(e,t,a.children,n),t.child;case 9:return l=t.type._context,a=t.pendingProps.children,Pn(t),l=We(l),a=a(l),t.flags|=1,Fe(e,t,a,n),t.child;case 14:return Zr(e,t,t.type,t.pendingProps,n);case 15:return kr(e,t,t.type,t.pendingProps,n);case 19:return tf(e,t,n);case 31:return uh(e,t,n);case 22:return Kr(e,t,n,t.pendingProps);case 24:return Pn(t),a=We(Be),e===null?(l=to(),l===null&&(l=Ae,i=Pu(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),t.memoizedState={parent:a,cache:l},ao(t),vn(t,Be,l)):((e.lanes&n)!==0&&(lo(e,t),vl(t,null,null,n),yl()),l=e.memoizedState,i=t.memoizedState,l.parent!==a?(l={parent:a,cache:a},t.memoizedState=l,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=l),vn(t,Be,a)):(a=i.cache,vn(t,Be,a),a!==l.cache&&Iu(t,[Be],n,!0))),Fe(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(f(156,t.tag))}function en(e){e.flags|=4}function Yo(e,t,n,a,l){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(l&335544128)===l)if(e.stateNode.complete)e.flags|=8192;else if(Cf())e.flags|=8192;else throw na=vi,no}else e.flags&=-16777217}function af(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!bd(t))if(Cf())e.flags|=8192;else throw na=vi,no}function Hi(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?$l():536870912,e.lanes|=t,Ba|=t)}function El(e,t){if(!ie)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function Me(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function ch(e,t,n){var a=t.pendingProps;switch(Ku(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Me(t),null;case 1:return Me(t),null;case 3:return n=t.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Ft(Be),be(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ea(t)?en(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Wu())),Me(t),null;case 26:var l=t.type,i=t.memoizedState;return e===null?(en(t),i!==null?(Me(t),af(t,i)):(Me(t),Yo(t,l,null,a,n))):i?i!==e.memoizedState?(en(t),Me(t),af(t,i)):(Me(t),t.flags&=-16777217):(e=e.memoizedProps,e!==a&&en(t),Me(t),Yo(t,l,e,a,n)),null;case 27:if(Ja(t),n=Z.current,l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&en(t);else{if(!a){if(t.stateNode===null)throw Error(f(166));return Me(t),null}e=w.current,Ea(t)?Ns(t):(e=fd(l,a,n),t.stateNode=e,en(t))}return Me(t),null;case 5:if(Ja(t),l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&en(t);else{if(!a){if(t.stateNode===null)throw Error(f(166));return Me(t),null}if(i=w.current,Ea(t))Ns(t);else{var u=Fi(Z.current);switch(i){case 1:i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=u.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?u.createElement("select",{is:a.is}):u.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?u.createElement(l,{is:a.is}):u.createElement(l)}}i[Ke]=t,i[lt]=a;e:for(u=t.child;u!==null;){if(u.tag===5||u.tag===6)i.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===t)break e;for(;u.sibling===null;){if(u.return===null||u.return===t)break e;u=u.return}u.sibling.return=u.return,u=u.sibling}t.stateNode=i;e:switch($e(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}a&&en(t)}}return Me(t),Yo(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==a&&en(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(f(166));if(e=Z.current,Ea(t)){if(e=t.stateNode,n=t.memoizedProps,a=null,l=Je,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}e[Ke]=t,e=!!(e.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||ed(e.nodeValue,n)),e||yn(t,!0)}else e=Fi(e).createTextNode(a),e[Ke]=t,t.stateNode=e}return Me(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(a=Ea(t),n!==null){if(e===null){if(!a)throw Error(f(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(f(557));e[Ke]=t}else $n(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Me(t),e=!1}else n=Wu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(yt(t),t):(yt(t),null);if((t.flags&128)!==0)throw Error(f(558))}return Me(t),null;case 13:if(a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(l=Ea(t),a!==null&&a.dehydrated!==null){if(e===null){if(!l)throw Error(f(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(f(317));l[Ke]=t}else $n(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Me(t),l=!1}else l=Wu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),l=!0;if(!l)return t.flags&256?(yt(t),t):(yt(t),null)}return yt(t),(t.flags&128)!==0?(t.lanes=n,t):(n=a!==null,e=e!==null&&e.memoizedState!==null,n&&(a=t.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Hi(t,t.updateQueue),Me(t),null);case 4:return be(),e===null&&cc(t.stateNode.containerInfo),Me(t),null;case 10:return Ft(t.type),Me(t),null;case 19:if(z(He),a=t.memoizedState,a===null)return Me(t),null;if(l=(t.flags&128)!==0,i=a.rendering,i===null)if(l)El(a,!1);else{if(qe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=Ti(e),i!==null){for(t.flags|=128,El(a,!1),e=i.updateQueue,t.updateQueue=e,Hi(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Os(n,e),n=n.sibling;return q(He,He.current&1|2),ie&&Jt(t,a.treeForkCount),t.child}e=e.sibling}a.tail!==null&&Ie()>Yi&&(t.flags|=128,l=!0,El(a,!1),t.lanes=4194304)}else{if(!l)if(e=Ti(i),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,Hi(t,e),El(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!ie)return Me(t),null}else 2*Ie()-a.renderingStartTime>Yi&&n!==536870912&&(t.flags|=128,l=!0,El(a,!1),t.lanes=4194304);a.isBackwards?(i.sibling=t.child,t.child=i):(e=a.last,e!==null?e.sibling=i:t.child=i,a.last=i)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=Ie(),e.sibling=null,n=He.current,q(He,l?n&1|2:n&1),ie&&Jt(t,a.treeForkCount),e):(Me(t),null);case 22:case 23:return yt(t),co(),a=t.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?(n&536870912)!==0&&(t.flags&128)===0&&(Me(t),t.subtreeFlags&6&&(t.flags|=8192)):Me(t),n=t.updateQueue,n!==null&&Hi(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==n&&(t.flags|=2048),e!==null&&z(ea),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Ft(Be),Me(t),null;case 25:return null;case 30:return null}throw Error(f(156,t.tag))}function sh(e,t){switch(Ku(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ft(Be),be(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ja(t),null;case 31:if(t.memoizedState!==null){if(yt(t),t.alternate===null)throw Error(f(340));$n()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(yt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(f(340));$n()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return z(He),null;case 4:return be(),null;case 10:return Ft(t.type),null;case 22:case 23:return yt(t),co(),e!==null&&z(ea),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ft(Be),null;case 25:return null;default:return null}}function lf(e,t){switch(Ku(t),t.tag){case 3:Ft(Be),be();break;case 26:case 27:case 5:Ja(t);break;case 4:be();break;case 31:t.memoizedState!==null&&yt(t);break;case 13:yt(t);break;case 19:z(He);break;case 10:Ft(t.type);break;case 22:case 23:yt(t),co(),e!==null&&z(ea);break;case 24:Ft(Be)}}function zl(e,t){try{var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&e)===e){a=void 0;var i=n.create,u=n.inst;a=i(),u.destroy=a}n=n.next}while(n!==l)}}catch(o){ve(t,t.return,o)}}function En(e,t,n){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&e)===e){var u=a.inst,o=u.destroy;if(o!==void 0){u.destroy=void 0,l=t;var c=n,g=o;try{g()}catch(x){ve(l,c,x)}}}a=a.next}while(a!==i)}}catch(x){ve(t,t.return,x)}}function uf(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ws(t,n)}catch(a){ve(e,e.return,a)}}}function of(e,t,n){n.props=ia(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(a){ve(e,t,a)}}function _l(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof n=="function"?e.refCleanup=n(a):n.current=a}}catch(l){ve(e,t,l)}}function Yt(e,t){var n=e.ref,a=e.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){ve(e,t,l)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){ve(e,t,l)}else n.current=null}function cf(e){var t=e.type,n=e.memoizedProps,a=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break e;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){ve(e,e.return,l)}}function Go(e,t,n){try{var a=e.stateNode;Oh(a,e.type,n,t),a[lt]=t}catch(l){ve(e,e.return,l)}}function sf(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&On(e.type)||e.tag===4}function Xo(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||sf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&On(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Qo(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Zt));else if(a!==4&&(a===27&&On(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Qo(e,t,n),e=e.sibling;e!==null;)Qo(e,t,n),e=e.sibling}function Ni(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(a===27&&On(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Ni(e,t,n),e=e.sibling;e!==null;)Ni(e,t,n),e=e.sibling}function rf(e){var t=e.stateNode,n=e.memoizedProps;try{for(var a=e.type,l=t.attributes;l.length;)t.removeAttributeNode(l[0]);$e(t,a,n),t[Ke]=e,t[lt]=n}catch(i){ve(e,e.return,i)}}var tn=!1,Ye=!1,Vo=!1,ff=typeof WeakSet=="function"?WeakSet:Set,ke=null;function rh(e,t){if(e=e.containerInfo,fc=au,e=Ts(e),Nu(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var u=0,o=-1,c=-1,g=0,x=0,E=e,y=null;t:for(;;){for(var b;E!==n||l!==0&&E.nodeType!==3||(o=u+l),E!==i||a!==0&&E.nodeType!==3||(c=u+a),E.nodeType===3&&(u+=E.nodeValue.length),(b=E.firstChild)!==null;)y=E,E=b;for(;;){if(E===e)break t;if(y===n&&++g===l&&(o=u),y===i&&++x===a&&(c=u),(b=E.nextSibling)!==null)break;E=y,y=E.parentNode}E=b}n=o===-1||c===-1?null:{start:o,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(dc={focusedElem:e,selectionRange:n},au=!1,ke=t;ke!==null;)if(t=ke,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ke=e;else for(;ke!==null;){switch(t=ke,i=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)l=e[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&i!==null){e=void 0,n=t,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var L=ia(n.type,l);e=a.getSnapshotBeforeUpdate(L,i),a.__reactInternalSnapshotBeforeUpdate=e}catch(K){ve(n,n.return,K)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)pc(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":pc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(f(163))}if(e=t.sibling,e!==null){e.return=t.return,ke=e;break}ke=t.return}}function df(e,t,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:an(e,n),a&4&&zl(5,n);break;case 1:if(an(e,n),a&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(u){ve(n,n.return,u)}else{var l=ia(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(l,t,e.__reactInternalSnapshotBeforeUpdate)}catch(u){ve(n,n.return,u)}}a&64&&uf(n),a&512&&_l(n,n.return);break;case 3:if(an(e,n),a&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ws(e,t)}catch(u){ve(n,n.return,u)}}break;case 27:t===null&&a&4&&rf(n);case 26:case 5:an(e,n),t===null&&a&4&&cf(n),a&512&&_l(n,n.return);break;case 12:an(e,n);break;case 31:an(e,n),a&4&&pf(e,n);break;case 13:an(e,n),a&4&&gf(e,n),a&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=bh.bind(null,n),Lh(e,n))));break;case 22:if(a=n.memoizedState!==null||tn,!a){t=t!==null&&t.memoizedState!==null||Ye,l=tn;var i=Ye;tn=a,(Ye=t)&&!i?ln(e,n,(n.subtreeFlags&8772)!==0):an(e,n),tn=l,Ye=i}break;case 30:break;default:an(e,n)}}function mf(e){var t=e.alternate;t!==null&&(e.alternate=null,mf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&bu(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var je=null,ut=!1;function nn(e,t,n){for(n=n.child;n!==null;)hf(e,t,n),n=n.sibling}function hf(e,t,n){if(Pe&&typeof Pe.onCommitFiberUnmount=="function")try{Pe.onCommitFiberUnmount(fn,n)}catch{}switch(n.tag){case 26:Ye||Yt(n,t),nn(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Ye||Yt(n,t);var a=je,l=ut;On(n.type)&&(je=n.stateNode,ut=!1),nn(e,t,n),Hl(n.stateNode),je=a,ut=l;break;case 5:Ye||Yt(n,t);case 6:if(a=je,l=ut,je=null,nn(e,t,n),je=a,ut=l,je!==null)if(ut)try{(je.nodeType===9?je.body:je.nodeName==="HTML"?je.ownerDocument.body:je).removeChild(n.stateNode)}catch(i){ve(n,t,i)}else try{je.removeChild(n.stateNode)}catch(i){ve(n,t,i)}break;case 18:je!==null&&(ut?(e=je,ud(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),Za(e)):ud(je,n.stateNode));break;case 4:a=je,l=ut,je=n.stateNode.containerInfo,ut=!0,nn(e,t,n),je=a,ut=l;break;case 0:case 11:case 14:case 15:En(2,n,t),Ye||En(4,n,t),nn(e,t,n);break;case 1:Ye||(Yt(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"&&of(n,t,a)),nn(e,t,n);break;case 21:nn(e,t,n);break;case 22:Ye=(a=Ye)||n.memoizedState!==null,nn(e,t,n),Ye=a;break;default:nn(e,t,n)}}function pf(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Za(e)}catch(n){ve(t,t.return,n)}}}function gf(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Za(e)}catch(n){ve(t,t.return,n)}}function fh(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ff),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ff),t;default:throw Error(f(435,e.tag))}}function Bi(e,t){var n=fh(e);t.forEach(function(a){if(!n.has(a)){n.add(a);var l=xh.bind(null,e,a);a.then(l,l)}})}function ot(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=e,u=t,o=u;e:for(;o!==null;){switch(o.tag){case 27:if(On(o.type)){je=o.stateNode,ut=!1;break e}break;case 5:je=o.stateNode,ut=!1;break e;case 3:case 4:je=o.stateNode.containerInfo,ut=!0;break e}o=o.return}if(je===null)throw Error(f(160));hf(i,u,l),je=null,ut=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)yf(t,e),t=t.sibling}var Nt=null;function yf(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:ot(t,e),ct(e),a&4&&(En(3,e,e.return),zl(3,e),En(5,e,e.return));break;case 1:ot(t,e),ct(e),a&512&&(Ye||n===null||Yt(n,n.return)),a&64&&tn&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=Nt;if(ot(t,e),ct(e),a&512&&(Ye||n===null||Yt(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=e.memoizedState,n===null)if(a===null)if(e.stateNode===null){e:{a=e.type,n=e.memoizedProps,l=l.ownerDocument||l;t:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[Pa]||i[Ke]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),$e(i,a,n),i[Ke]=e,Ze(i),a=i;break e;case"link":var u=yd("link","href",l).get(a+(n.href||""));if(u){for(var o=0;o<u.length;o++)if(i=u[o],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){u.splice(o,1);break t}}i=l.createElement(a),$e(i,a,n),l.head.appendChild(i);break;case"meta":if(u=yd("meta","content",l).get(a+(n.content||""))){for(o=0;o<u.length;o++)if(i=u[o],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){u.splice(o,1);break t}}i=l.createElement(a),$e(i,a,n),l.head.appendChild(i);break;default:throw Error(f(468,a))}i[Ke]=e,Ze(i),a=i}e.stateNode=a}else vd(l,e.type,e.stateNode);else e.stateNode=gd(l,a,e.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?vd(l,e.type,e.stateNode):gd(l,a,e.memoizedProps)):a===null&&e.stateNode!==null&&Go(e,e.memoizedProps,n.memoizedProps)}break;case 27:ot(t,e),ct(e),a&512&&(Ye||n===null||Yt(n,n.return)),n!==null&&a&4&&Go(e,e.memoizedProps,n.memoizedProps);break;case 5:if(ot(t,e),ct(e),a&512&&(Ye||n===null||Yt(n,n.return)),e.flags&32){l=e.stateNode;try{ha(l,"")}catch(L){ve(e,e.return,L)}}a&4&&e.stateNode!=null&&(l=e.memoizedProps,Go(e,l,n!==null?n.memoizedProps:l)),a&1024&&(Vo=!0);break;case 6:if(ot(t,e),ct(e),a&4){if(e.stateNode===null)throw Error(f(162));a=e.memoizedProps,n=e.stateNode;try{n.nodeValue=a}catch(L){ve(e,e.return,L)}}break;case 3:if(Pi=null,l=Nt,Nt=$i(t.containerInfo),ot(t,e),Nt=l,ct(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{Za(t.containerInfo)}catch(L){ve(e,e.return,L)}Vo&&(Vo=!1,vf(e));break;case 4:a=Nt,Nt=$i(e.stateNode.containerInfo),ot(t,e),ct(e),Nt=a;break;case 12:ot(t,e),ct(e);break;case 31:ot(t,e),ct(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Bi(e,a)));break;case 13:ot(t,e),ct(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Li=Ie()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Bi(e,a)));break;case 22:l=e.memoizedState!==null;var c=n!==null&&n.memoizedState!==null,g=tn,x=Ye;if(tn=g||l,Ye=x||c,ot(t,e),Ye=x,tn=g,ct(e),a&8192)e:for(t=e.stateNode,t._visibility=l?t._visibility&-2:t._visibility|1,l&&(n===null||c||tn||Ye||ua(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){c=n=t;try{if(i=c.stateNode,l)u=i.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{o=c.stateNode;var E=c.memoizedProps.style,y=E!=null&&E.hasOwnProperty("display")?E.display:null;o.style.display=y==null||typeof y=="boolean"?"":(""+y).trim()}}catch(L){ve(c,c.return,L)}}}else if(t.tag===6){if(n===null){c=t;try{c.stateNode.nodeValue=l?"":c.memoizedProps}catch(L){ve(c,c.return,L)}}}else if(t.tag===18){if(n===null){c=t;try{var b=c.stateNode;l?od(b,!0):od(c.stateNode,!1)}catch(L){ve(c,c.return,L)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=e.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Bi(e,n))));break;case 19:ot(t,e),ct(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Bi(e,a)));break;case 30:break;case 21:break;default:ot(t,e),ct(e)}}function ct(e){var t=e.flags;if(t&2){try{for(var n,a=e.return;a!==null;){if(sf(a)){n=a;break}a=a.return}if(n==null)throw Error(f(160));switch(n.tag){case 27:var l=n.stateNode,i=Xo(e);Ni(e,i,l);break;case 5:var u=n.stateNode;n.flags&32&&(ha(u,""),n.flags&=-33);var o=Xo(e);Ni(e,o,u);break;case 3:case 4:var c=n.stateNode.containerInfo,g=Xo(e);Qo(e,g,c);break;default:throw Error(f(161))}}catch(x){ve(e,e.return,x)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function vf(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;vf(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function an(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)df(e,t.alternate,t),t=t.sibling}function ua(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:En(4,t,t.return),ua(t);break;case 1:Yt(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&of(t,t.return,n),ua(t);break;case 27:Hl(t.stateNode);case 26:case 5:Yt(t,t.return),ua(t);break;case 22:t.memoizedState===null&&ua(t);break;case 30:ua(t);break;default:ua(t)}e=e.sibling}}function ln(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,l=e,i=t,u=i.flags;switch(i.tag){case 0:case 11:case 15:ln(l,i,n),zl(4,i);break;case 1:if(ln(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(g){ve(a,a.return,g)}if(a=i,l=a.updateQueue,l!==null){var o=a.stateNode;try{var c=l.shared.hiddenCallbacks;if(c!==null)for(l.shared.hiddenCallbacks=null,l=0;l<c.length;l++)Js(c[l],o)}catch(g){ve(a,a.return,g)}}n&&u&64&&uf(i),_l(i,i.return);break;case 27:rf(i);case 26:case 5:ln(l,i,n),n&&a===null&&u&4&&cf(i),_l(i,i.return);break;case 12:ln(l,i,n);break;case 31:ln(l,i,n),n&&u&4&&pf(l,i);break;case 13:ln(l,i,n),n&&u&4&&gf(l,i);break;case 22:i.memoizedState===null&&ln(l,i,n),_l(i,i.return);break;case 30:break;default:ln(l,i,n)}t=t.sibling}}function Zo(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&dl(n))}function ko(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&dl(e))}function Bt(e,t,n,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)bf(e,t,n,a),t=t.sibling}function bf(e,t,n,a){var l=t.flags;switch(t.tag){case 0:case 11:case 15:Bt(e,t,n,a),l&2048&&zl(9,t);break;case 1:Bt(e,t,n,a);break;case 3:Bt(e,t,n,a),l&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&dl(e)));break;case 12:if(l&2048){Bt(e,t,n,a),e=t.stateNode;try{var i=t.memoizedProps,u=i.id,o=i.onPostCommit;typeof o=="function"&&o(u,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(c){ve(t,t.return,c)}}else Bt(e,t,n,a);break;case 31:Bt(e,t,n,a);break;case 13:Bt(e,t,n,a);break;case 23:break;case 22:i=t.stateNode,u=t.alternate,t.memoizedState!==null?i._visibility&2?Bt(e,t,n,a):Ml(e,t):i._visibility&2?Bt(e,t,n,a):(i._visibility|=2,qa(e,t,n,a,(t.subtreeFlags&10256)!==0||!1)),l&2048&&Zo(u,t);break;case 24:Bt(e,t,n,a),l&2048&&ko(t.alternate,t);break;default:Bt(e,t,n,a)}}function qa(e,t,n,a,l){for(l=l&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var i=e,u=t,o=n,c=a,g=u.flags;switch(u.tag){case 0:case 11:case 15:qa(i,u,o,c,l),zl(8,u);break;case 23:break;case 22:var x=u.stateNode;u.memoizedState!==null?x._visibility&2?qa(i,u,o,c,l):Ml(i,u):(x._visibility|=2,qa(i,u,o,c,l)),l&&g&2048&&Zo(u.alternate,u);break;case 24:qa(i,u,o,c,l),l&&g&2048&&ko(u.alternate,u);break;default:qa(i,u,o,c,l)}t=t.sibling}}function Ml(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,a=t,l=a.flags;switch(a.tag){case 22:Ml(n,a),l&2048&&Zo(a.alternate,a);break;case 24:Ml(n,a),l&2048&&ko(a.alternate,a);break;default:Ml(n,a)}t=t.sibling}}var Dl=8192;function Ha(e,t,n){if(e.subtreeFlags&Dl)for(e=e.child;e!==null;)xf(e,t,n),e=e.sibling}function xf(e,t,n){switch(e.tag){case 26:Ha(e,t,n),e.flags&Dl&&e.memoizedState!==null&&$h(n,Nt,e.memoizedState,e.memoizedProps);break;case 5:Ha(e,t,n);break;case 3:case 4:var a=Nt;Nt=$i(e.stateNode.containerInfo),Ha(e,t,n),Nt=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=Dl,Dl=16777216,Ha(e,t,n),Dl=a):Ha(e,t,n));break;default:Ha(e,t,n)}}function Sf(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function jl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];ke=a,Af(a,e)}Sf(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Tf(e),e=e.sibling}function Tf(e){switch(e.tag){case 0:case 11:case 15:jl(e),e.flags&2048&&En(9,e,e.return);break;case 3:jl(e);break;case 12:jl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,wi(e)):jl(e);break;default:jl(e)}}function wi(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];ke=a,Af(a,e)}Sf(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:En(8,t,t.return),wi(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,wi(t));break;default:wi(t)}e=e.sibling}}function Af(e,t){for(;ke!==null;){var n=ke;switch(n.tag){case 0:case 11:case 15:En(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:dl(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,ke=a;else e:for(n=e;ke!==null;){a=ke;var l=a.sibling,i=a.return;if(mf(a),a===n){ke=null;break e}if(l!==null){l.return=i,ke=l;break e}ke=i}}}var dh={getCacheForType:function(e){var t=We(Be),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return We(Be).controller.signal}},mh=typeof WeakMap=="function"?WeakMap:Map,he=0,Ae=null,ee=null,ne=0,ye=0,vt=null,zn=!1,Na=!1,Ko=!1,un=0,qe=0,_n=0,oa=0,Jo=0,bt=0,Ba=0,Cl=null,st=null,Wo=!1,Li=0,Ef=0,Yi=1/0,Gi=null,Mn=null,Ve=0,Dn=null,wa=null,on=0,Fo=0,$o=null,zf=null,Ol=0,Io=null;function xt(){return(he&2)!==0&&ne!==0?ne&-ne:T.T!==null?lc():Yc()}function _f(){if(bt===0)if((ne&536870912)===0||ie){var e=W;W<<=1,(W&3932160)===0&&(W=262144),bt=e}else bt=536870912;return e=gt.current,e!==null&&(e.flags|=32),bt}function rt(e,t,n){(e===Ae&&(ye===2||ye===9)||e.cancelPendingCommit!==null)&&(La(e,0),jn(e,ne,bt,!1)),Ia(e,n),((he&2)===0||e!==Ae)&&(e===Ae&&((he&2)===0&&(oa|=n),qe===4&&jn(e,ne,bt,!1)),Gt(e))}function Mf(e,t,n){if((he&6)!==0)throw Error(f(327));var a=!n&&(t&127)===0&&(t&e.expiredLanes)===0||mt(e,t),l=a?gh(e,t):ec(e,t,!0),i=a;do{if(l===0){Na&&!a&&jn(e,t,0,!1);break}else{if(n=e.current.alternate,i&&!hh(n)){l=ec(e,t,!1),i=!1;continue}if(l===2){if(i=t,e.errorRecoveryDisabledLanes&i)var u=0;else u=e.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){t=u;e:{var o=e;l=Cl;var c=o.current.memoizedState.isDehydrated;if(c&&(La(o,u).flags|=256),u=ec(o,u,!1),u!==2){if(Ko&&!c){o.errorRecoveryDisabledLanes|=i,oa|=i,l=4;break e}i=st,st=l,i!==null&&(st===null?st=i:st.push.apply(st,i))}l=u}if(i=!1,l!==2)continue}}if(l===1){La(e,0),jn(e,t,0,!0);break}e:{switch(a=e,i=l,i){case 0:case 1:throw Error(f(345));case 4:if((t&4194048)!==t)break;case 6:jn(a,t,bt,!zn);break e;case 2:st=null;break;case 3:case 5:break;default:throw Error(f(329))}if((t&62914560)===t&&(l=Li+300-Ie(),10<l)){if(jn(a,t,bt,!zn),at(a,0,!0)!==0)break e;on=t,a.timeoutHandle=ld(Df.bind(null,a,n,st,Gi,Wo,t,bt,oa,Ba,zn,i,"Throttled",-0,0),l);break e}Df(a,n,st,Gi,Wo,t,bt,oa,Ba,zn,i,null,-0,0)}}break}while(!0);Gt(e)}function Df(e,t,n,a,l,i,u,o,c,g,x,E,y,b){if(e.timeoutHandle=-1,E=t.subtreeFlags,E&8192||(E&16785408)===16785408){E={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Zt},xf(t,i,E);var L=(i&62914560)===i?Li-Ie():(i&4194048)===i?Ef-Ie():0;if(L=Ih(E,L),L!==null){on=i,e.cancelPendingCommit=L(Nf.bind(null,e,t,i,n,a,l,u,o,c,x,E,null,y,b)),jn(e,i,u,!g);return}}Nf(e,t,i,n,a,l,u,o,c)}function hh(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!ht(i(),l))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function jn(e,t,n,a){t&=~Jo,t&=~oa,e.suspendedLanes|=t,e.pingedLanes&=~t,a&&(e.warmLanes|=t),a=e.expirationTimes;for(var l=t;0<l;){var i=31-et(l),u=1<<i;a[i]=-1,l&=~u}n!==0&&Bc(e,n,t)}function Xi(){return(he&6)===0?(Rl(0),!1):!0}function Po(){if(ee!==null){if(ye===0)var e=ee.return;else e=ee,Wt=In=null,po(e),ja=null,hl=0,e=ee;for(;e!==null;)lf(e.alternate,e),e=e.return;ee=null}}function La(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qh(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),on=0,Po(),Ae=e,ee=n=Kt(e.current,null),ne=t,ye=0,vt=null,zn=!1,Na=mt(e,t),Ko=!1,Ba=bt=Jo=oa=_n=qe=0,st=Cl=null,Wo=!1,(t&8)!==0&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var l=31-et(a),i=1<<l;t|=e[l],a&=~i}return un=t,si(),n}function jf(e,t){$=null,T.H=Tl,t===Da||t===yi?(t=Vs(),ye=3):t===no?(t=Vs(),ye=4):ye=t===Oo?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,vt=t,ee===null&&(qe=1,Oi(e,_t(t,e.current)))}function Cf(){var e=gt.current;return e===null?!0:(ne&4194048)===ne?Ct===null:(ne&62914560)===ne||(ne&536870912)!==0?e===Ct:!1}function Of(){var e=T.H;return T.H=Tl,e===null?Tl:e}function Rf(){var e=T.A;return T.A=dh,e}function Qi(){qe=4,zn||(ne&4194048)!==ne&&gt.current!==null||(Na=!0),(_n&134217727)===0&&(oa&134217727)===0||Ae===null||jn(Ae,ne,bt,!1)}function ec(e,t,n){var a=he;he|=2;var l=Of(),i=Rf();(Ae!==e||ne!==t)&&(Gi=null,La(e,t)),t=!1;var u=qe;e:do try{if(ye!==0&&ee!==null){var o=ee,c=vt;switch(ye){case 8:Po(),u=6;break e;case 3:case 2:case 9:case 6:gt.current===null&&(t=!0);var g=ye;if(ye=0,vt=null,Ya(e,o,c,g),n&&Na){u=0;break e}break;default:g=ye,ye=0,vt=null,Ya(e,o,c,g)}}ph(),u=qe;break}catch(x){jf(e,x)}while(!0);return t&&e.shellSuspendCounter++,Wt=In=null,he=a,T.H=l,T.A=i,ee===null&&(Ae=null,ne=0,si()),u}function ph(){for(;ee!==null;)Uf(ee)}function gh(e,t){var n=he;he|=2;var a=Of(),l=Rf();Ae!==e||ne!==t?(Gi=null,Yi=Ie()+500,La(e,t)):Na=mt(e,t);e:do try{if(ye!==0&&ee!==null){t=ee;var i=vt;t:switch(ye){case 1:ye=0,vt=null,Ya(e,t,i,1);break;case 2:case 9:if(Xs(i)){ye=0,vt=null,qf(t);break}t=function(){ye!==2&&ye!==9||Ae!==e||(ye=7),Gt(e)},i.then(t,t);break e;case 3:ye=7;break e;case 4:ye=5;break e;case 7:Xs(i)?(ye=0,vt=null,qf(t)):(ye=0,vt=null,Ya(e,t,i,7));break;case 5:var u=null;switch(ee.tag){case 26:u=ee.memoizedState;case 5:case 27:var o=ee;if(u?bd(u):o.stateNode.complete){ye=0,vt=null;var c=o.sibling;if(c!==null)ee=c;else{var g=o.return;g!==null?(ee=g,Vi(g)):ee=null}break t}}ye=0,vt=null,Ya(e,t,i,5);break;case 6:ye=0,vt=null,Ya(e,t,i,6);break;case 8:Po(),qe=6;break e;default:throw Error(f(462))}}yh();break}catch(x){jf(e,x)}while(!0);return Wt=In=null,T.H=a,T.A=l,he=n,ee!==null?0:(Ae=null,ne=0,si(),qe)}function yh(){for(;ee!==null&&!mu();)Uf(ee)}function Uf(e){var t=nf(e.alternate,e,un);e.memoizedProps=e.pendingProps,t===null?Vi(e):ee=t}function qf(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Fr(n,t,t.pendingProps,t.type,void 0,ne);break;case 11:t=Fr(n,t,t.pendingProps,t.type.render,t.ref,ne);break;case 5:po(t);default:lf(n,t),t=ee=Os(t,un),t=nf(n,t,un)}e.memoizedProps=e.pendingProps,t===null?Vi(e):ee=t}function Ya(e,t,n,a){Wt=In=null,po(t),ja=null,hl=0;var l=t.return;try{if(ih(e,l,t,n,ne)){qe=1,Oi(e,_t(n,e.current)),ee=null;return}}catch(i){if(l!==null)throw ee=l,i;qe=1,Oi(e,_t(n,e.current)),ee=null;return}t.flags&32768?(ie||a===1?e=!0:Na||(ne&536870912)!==0?e=!1:(zn=e=!0,(a===2||a===9||a===3||a===6)&&(a=gt.current,a!==null&&a.tag===13&&(a.flags|=16384))),Hf(t,e)):Vi(t)}function Vi(e){var t=e;do{if((t.flags&32768)!==0){Hf(t,zn);return}e=t.return;var n=ch(t.alternate,t,un);if(n!==null){ee=n;return}if(t=t.sibling,t!==null){ee=t;return}ee=t=e}while(t!==null);qe===0&&(qe=5)}function Hf(e,t){do{var n=sh(e.alternate,e);if(n!==null){n.flags&=32767,ee=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){ee=e;return}ee=e=n}while(e!==null);qe=6,ee=null}function Nf(e,t,n,a,l,i,u,o,c){e.cancelPendingCommit=null;do Zi();while(Ve!==0);if((he&6)!==0)throw Error(f(327));if(t!==null){if(t===e.current)throw Error(f(177));if(i=t.lanes|t.childLanes,i|=Gu,Fd(e,n,i,u,o,c),e===Ae&&(ee=Ae=null,ne=0),wa=t,Dn=e,on=n,Fo=i,$o=l,zf=a,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Sh(Vn,function(){return Gf(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||a){a=T.T,T.T=null,l=U.p,U.p=2,u=he,he|=4;try{rh(e,t,n)}finally{he=u,U.p=l,T.T=a}}Ve=1,Bf(),wf(),Lf()}}function Bf(){if(Ve===1){Ve=0;var e=Dn,t=wa,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=T.T,T.T=null;var a=U.p;U.p=2;var l=he;he|=4;try{yf(t,e);var i=dc,u=Ts(e.containerInfo),o=i.focusedElem,c=i.selectionRange;if(u!==o&&o&&o.ownerDocument&&Ss(o.ownerDocument.documentElement,o)){if(c!==null&&Nu(o)){var g=c.start,x=c.end;if(x===void 0&&(x=g),"selectionStart"in o)o.selectionStart=g,o.selectionEnd=Math.min(x,o.value.length);else{var E=o.ownerDocument||document,y=E&&E.defaultView||window;if(y.getSelection){var b=y.getSelection(),L=o.textContent.length,K=Math.min(c.start,L),Te=c.end===void 0?K:Math.min(c.end,L);!b.extend&&K>Te&&(u=Te,Te=K,K=u);var m=xs(o,K),r=xs(o,Te);if(m&&r&&(b.rangeCount!==1||b.anchorNode!==m.node||b.anchorOffset!==m.offset||b.focusNode!==r.node||b.focusOffset!==r.offset)){var p=E.createRange();p.setStart(m.node,m.offset),b.removeAllRanges(),K>Te?(b.addRange(p),b.extend(r.node,r.offset)):(p.setEnd(r.node,r.offset),b.addRange(p))}}}}for(E=[],b=o;b=b.parentNode;)b.nodeType===1&&E.push({element:b,left:b.scrollLeft,top:b.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<E.length;o++){var A=E[o];A.element.scrollLeft=A.left,A.element.scrollTop=A.top}}au=!!fc,dc=fc=null}finally{he=l,U.p=a,T.T=n}}e.current=t,Ve=2}}function wf(){if(Ve===2){Ve=0;var e=Dn,t=wa,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=T.T,T.T=null;var a=U.p;U.p=2;var l=he;he|=4;try{df(e,t.alternate,t)}finally{he=l,U.p=a,T.T=n}}Ve=3}}function Lf(){if(Ve===4||Ve===3){Ve=0,hu();var e=Dn,t=wa,n=on,a=zf;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Ve=5:(Ve=0,wa=Dn=null,Yf(e,e.pendingLanes));var l=e.pendingLanes;if(l===0&&(Mn=null),yu(n),t=t.stateNode,Pe&&typeof Pe.onCommitFiberRoot=="function")try{Pe.onCommitFiberRoot(fn,t,void 0,(t.current.flags&128)===128)}catch{}if(a!==null){t=T.T,l=U.p,U.p=2,T.T=null;try{for(var i=e.onRecoverableError,u=0;u<a.length;u++){var o=a[u];i(o.value,{componentStack:o.stack})}}finally{T.T=t,U.p=l}}(on&3)!==0&&Zi(),Gt(e),l=e.pendingLanes,(n&261930)!==0&&(l&42)!==0?e===Io?Ol++:(Ol=0,Io=e):Ol=0,Rl(0)}}function Yf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,dl(t)))}function Zi(){return Bf(),wf(),Lf(),Gf()}function Gf(){if(Ve!==5)return!1;var e=Dn,t=Fo;Fo=0;var n=yu(on),a=T.T,l=U.p;try{U.p=32>n?32:n,T.T=null,n=$o,$o=null;var i=Dn,u=on;if(Ve=0,wa=Dn=null,on=0,(he&6)!==0)throw Error(f(331));var o=he;if(he|=4,Tf(i.current),bf(i,i.current,u,n),he=o,Rl(0,!1),Pe&&typeof Pe.onPostCommitFiberRoot=="function")try{Pe.onPostCommitFiberRoot(fn,i)}catch{}return!0}finally{U.p=l,T.T=a,Yf(e,t)}}function Xf(e,t,n){t=_t(n,t),t=Co(e.stateNode,t,2),e=Sn(e,t,2),e!==null&&(Ia(e,2),Gt(e))}function ve(e,t,n){if(e.tag===3)Xf(e,e,n);else for(;t!==null;){if(t.tag===3){Xf(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(Mn===null||!Mn.has(a))){e=_t(n,e),n=Xr(2),a=Sn(t,n,2),a!==null&&(Qr(n,a,t,e),Ia(a,2),Gt(a));break}}t=t.return}}function tc(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new mh;var l=new Set;a.set(t,l)}else l=a.get(t),l===void 0&&(l=new Set,a.set(t,l));l.has(n)||(Ko=!0,l.add(n),e=vh.bind(null,e,t,n),t.then(e,e))}function vh(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Ae===e&&(ne&n)===n&&(qe===4||qe===3&&(ne&62914560)===ne&&300>Ie()-Li?(he&2)===0&&La(e,0):Jo|=n,Ba===ne&&(Ba=0)),Gt(e)}function Qf(e,t){t===0&&(t=$l()),e=Wn(e,t),e!==null&&(Ia(e,t),Gt(e))}function bh(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Qf(e,n)}function xh(e,t){var n=0;switch(e.tag){case 31:case 13:var a=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(f(314))}a!==null&&a.delete(t),Qf(e,n)}function Sh(e,t){return Xn(e,t)}var ki=null,Ga=null,nc=!1,Ki=!1,ac=!1,Cn=0;function Gt(e){e!==Ga&&e.next===null&&(Ga===null?ki=Ga=e:Ga=Ga.next=e),Ki=!0,nc||(nc=!0,Ah())}function Rl(e,t){if(!ac&&Ki){ac=!0;do for(var n=!1,a=ki;a!==null;){if(e!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var u=a.suspendedLanes,o=a.pingedLanes;i=(1<<31-et(42|e)+1)-1,i&=l&~(u&~o),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Kf(a,i))}else i=ne,i=at(a,a===Ae?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||mt(a,i)||(n=!0,Kf(a,i));a=a.next}while(n);ac=!1}}function Th(){Vf()}function Vf(){Ki=nc=!1;var e=0;Cn!==0&&Uh()&&(e=Cn);for(var t=Ie(),n=null,a=ki;a!==null;){var l=a.next,i=Zf(a,t);i===0?(a.next=null,n===null?ki=l:n.next=l,l===null&&(Ga=n)):(n=a,(e!==0||(i&3)!==0)&&(Ki=!0)),a=l}Ve!==0&&Ve!==5||Rl(e),Cn!==0&&(Cn=0)}function Zf(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var u=31-et(i),o=1<<u,c=l[u];c===-1?((o&n)===0||(o&a)!==0)&&(l[u]=dn(o,t)):c<=t&&(e.expiredLanes|=o),i&=~o}if(t=Ae,n=ne,n=at(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,n===0||e===t&&(ye===2||ye===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&Qn(a),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||mt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(a!==null&&Qn(a),yu(n)){case 2:case 8:n=Fa;break;case 32:n=Vn;break;case 268435456:n=$a;break;default:n=Vn}return a=kf.bind(null,e),n=Xn(n,a),e.callbackPriority=t,e.callbackNode=n,t}return a!==null&&a!==null&&Qn(a),e.callbackPriority=2,e.callbackNode=null,2}function kf(e,t){if(Ve!==0&&Ve!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Zi()&&e.callbackNode!==n)return null;var a=ne;return a=at(e,e===Ae?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(Mf(e,a,t),Zf(e,Ie()),e.callbackNode!=null&&e.callbackNode===n?kf.bind(null,e):null)}function Kf(e,t){if(Zi())return null;Mf(e,t,!0)}function Ah(){Hh(function(){(he&6)!==0?Xn(Wa,Th):Vf()})}function lc(){if(Cn===0){var e=_a;e===0&&(e=_,_<<=1,(_&261888)===0&&(_=256)),Cn=e}return Cn}function Jf(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ti(""+e)}function Wf(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function Eh(e,t,n,a,l){if(t==="submit"&&n&&n.stateNode===l){var i=Jf((l[lt]||null).action),u=a.submitter;u&&(t=(t=u[lt]||null)?Jf(t.formAction):u.getAttribute("formAction"),t!==null&&(i=t,u=null));var o=new ii("action","action",null,a,l);e.push({event:o,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(Cn!==0){var c=u?Wf(l,u):new FormData(l);Eo(n,{pending:!0,data:c,method:l.method,action:i},null,c)}}else typeof i=="function"&&(o.preventDefault(),c=u?Wf(l,u):new FormData(l),Eo(n,{pending:!0,data:c,method:l.method,action:i},i,c))},currentTarget:l}]})}}for(var ic=0;ic<Yu.length;ic++){var uc=Yu[ic],zh=uc.toLowerCase(),_h=uc[0].toUpperCase()+uc.slice(1);Ht(zh,"on"+_h)}Ht(zs,"onAnimationEnd"),Ht(_s,"onAnimationIteration"),Ht(Ms,"onAnimationStart"),Ht("dblclick","onDoubleClick"),Ht("focusin","onFocus"),Ht("focusout","onBlur"),Ht(Xm,"onTransitionRun"),Ht(Qm,"onTransitionStart"),Ht(Vm,"onTransitionCancel"),Ht(Ds,"onTransitionEnd"),da("onMouseEnter",["mouseout","mouseover"]),da("onMouseLeave",["mouseout","mouseover"]),da("onPointerEnter",["pointerout","pointerover"]),da("onPointerLeave",["pointerout","pointerover"]),Zn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Zn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Zn("onBeforeInput",["compositionend","keypress","textInput","paste"]),Zn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Zn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Zn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ul="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Mh=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ul));function Ff(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],l=a.event;a=a.listeners;e:{var i=void 0;if(t)for(var u=a.length-1;0<=u;u--){var o=a[u],c=o.instance,g=o.currentTarget;if(o=o.listener,c!==i&&l.isPropagationStopped())break e;i=o,l.currentTarget=g;try{i(l)}catch(x){ci(x)}l.currentTarget=null,i=c}else for(u=0;u<a.length;u++){if(o=a[u],c=o.instance,g=o.currentTarget,o=o.listener,c!==i&&l.isPropagationStopped())break e;i=o,l.currentTarget=g;try{i(l)}catch(x){ci(x)}l.currentTarget=null,i=c}}}}function te(e,t){var n=t[vu];n===void 0&&(n=t[vu]=new Set);var a=e+"__bubble";n.has(a)||($f(t,e,2,!1),n.add(a))}function oc(e,t,n){var a=0;t&&(a|=4),$f(n,e,a,t)}var Ji="_reactListening"+Math.random().toString(36).slice(2);function cc(e){if(!e[Ji]){e[Ji]=!0,Qc.forEach(function(n){n!=="selectionchange"&&(Mh.has(n)||oc(n,!1,e),oc(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ji]||(t[Ji]=!0,oc("selectionchange",!1,t))}}function $f(e,t,n,a){switch(_d(t)){case 2:var l=tp;break;case 8:l=np;break;default:l=Ac}n=l.bind(null,t,n,e),l=void 0,!Mu||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),a?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function sc(e,t,n,a,l){var i=a;if((t&1)===0&&(t&2)===0&&a!==null)e:for(;;){if(a===null)return;var u=a.tag;if(u===3||u===4){var o=a.stateNode.containerInfo;if(o===l)break;if(u===4)for(u=a.return;u!==null;){var c=u.tag;if((c===3||c===4)&&u.stateNode.containerInfo===l)return;u=u.return}for(;o!==null;){if(u=sa(o),u===null)return;if(c=u.tag,c===5||c===6||c===26||c===27){a=i=u;continue e}o=o.parentNode}}a=a.return}ts(function(){var g=i,x=zu(n),E=[];e:{var y=js.get(e);if(y!==void 0){var b=ii,L=e;switch(e){case"keypress":if(ai(n)===0)break e;case"keydown":case"keyup":b=xm;break;case"focusin":L="focus",b=Ou;break;case"focusout":L="blur",b=Ou;break;case"beforeblur":case"afterblur":b=Ou;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":b=ls;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":b=cm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":b=Am;break;case zs:case _s:case Ms:b=fm;break;case Ds:b=zm;break;case"scroll":case"scrollend":b=um;break;case"wheel":b=Mm;break;case"copy":case"cut":case"paste":b=mm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":b=us;break;case"toggle":case"beforetoggle":b=jm}var K=(t&4)!==0,Te=!K&&(e==="scroll"||e==="scrollend"),m=K?y!==null?y+"Capture":null:y;K=[];for(var r=g,p;r!==null;){var A=r;if(p=A.stateNode,A=A.tag,A!==5&&A!==26&&A!==27||p===null||m===null||(A=tl(r,m),A!=null&&K.push(ql(r,A,p))),Te)break;r=r.return}0<K.length&&(y=new b(y,L,null,n,x),E.push({event:y,listeners:K}))}}if((t&7)===0){e:{if(y=e==="mouseover"||e==="pointerover",b=e==="mouseout"||e==="pointerout",y&&n!==Eu&&(L=n.relatedTarget||n.fromElement)&&(sa(L)||L[ca]))break e;if((b||y)&&(y=x.window===x?x:(y=x.ownerDocument)?y.defaultView||y.parentWindow:window,b?(L=n.relatedTarget||n.toElement,b=g,L=L?sa(L):null,L!==null&&(Te=R(L),K=L.tag,L!==Te||K!==5&&K!==27&&K!==6)&&(L=null)):(b=null,L=g),b!==L)){if(K=ls,A="onMouseLeave",m="onMouseEnter",r="mouse",(e==="pointerout"||e==="pointerover")&&(K=us,A="onPointerLeave",m="onPointerEnter",r="pointer"),Te=b==null?y:el(b),p=L==null?y:el(L),y=new K(A,r+"leave",b,n,x),y.target=Te,y.relatedTarget=p,A=null,sa(x)===g&&(K=new K(m,r+"enter",L,n,x),K.target=p,K.relatedTarget=Te,A=K),Te=A,b&&L)t:{for(K=Dh,m=b,r=L,p=0,A=m;A;A=K(A))p++;A=0;for(var Q=r;Q;Q=K(Q))A++;for(;0<p-A;)m=K(m),p--;for(;0<A-p;)r=K(r),A--;for(;p--;){if(m===r||r!==null&&m===r.alternate){K=m;break t}m=K(m),r=K(r)}K=null}else K=null;b!==null&&If(E,y,b,K,!1),L!==null&&Te!==null&&If(E,Te,L,K,!0)}}e:{if(y=g?el(g):window,b=y.nodeName&&y.nodeName.toLowerCase(),b==="select"||b==="input"&&y.type==="file")var fe=hs;else if(ds(y))if(ps)fe=Lm;else{fe=Bm;var Y=Nm}else b=y.nodeName,!b||b.toLowerCase()!=="input"||y.type!=="checkbox"&&y.type!=="radio"?g&&Au(g.elementType)&&(fe=hs):fe=wm;if(fe&&(fe=fe(e,g))){ms(E,fe,n,x);break e}Y&&Y(e,y,g),e==="focusout"&&g&&y.type==="number"&&g.memoizedProps.value!=null&&Tu(y,"number",y.value)}switch(Y=g?el(g):window,e){case"focusin":(ds(Y)||Y.contentEditable==="true")&&(va=Y,Bu=g,sl=null);break;case"focusout":sl=Bu=va=null;break;case"mousedown":wu=!0;break;case"contextmenu":case"mouseup":case"dragend":wu=!1,As(E,n,x);break;case"selectionchange":if(Gm)break;case"keydown":case"keyup":As(E,n,x)}var P;if(Uu)e:{switch(e){case"compositionstart":var ae="onCompositionStart";break e;case"compositionend":ae="onCompositionEnd";break e;case"compositionupdate":ae="onCompositionUpdate";break e}ae=void 0}else ya?rs(e,n)&&(ae="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(ae="onCompositionStart");ae&&(os&&n.locale!=="ko"&&(ya||ae!=="onCompositionStart"?ae==="onCompositionEnd"&&ya&&(P=ns()):(hn=x,Du="value"in hn?hn.value:hn.textContent,ya=!0)),Y=Wi(g,ae),0<Y.length&&(ae=new is(ae,e,null,n,x),E.push({event:ae,listeners:Y}),P?ae.data=P:(P=fs(n),P!==null&&(ae.data=P)))),(P=Om?Rm(e,n):Um(e,n))&&(ae=Wi(g,"onBeforeInput"),0<ae.length&&(Y=new is("onBeforeInput","beforeinput",null,n,x),E.push({event:Y,listeners:ae}),Y.data=P)),Eh(E,e,g,n,x)}Ff(E,t)})}function ql(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Wi(e,t){for(var n=t+"Capture",a=[];e!==null;){var l=e,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=tl(e,n),l!=null&&a.unshift(ql(e,l,i)),l=tl(e,t),l!=null&&a.push(ql(e,l,i))),e.tag===3)return a;e=e.return}return[]}function Dh(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function If(e,t,n,a,l){for(var i=t._reactName,u=[];n!==null&&n!==a;){var o=n,c=o.alternate,g=o.stateNode;if(o=o.tag,c!==null&&c===a)break;o!==5&&o!==26&&o!==27||g===null||(c=g,l?(g=tl(n,i),g!=null&&u.unshift(ql(n,g,c))):l||(g=tl(n,i),g!=null&&u.push(ql(n,g,c)))),n=n.return}u.length!==0&&e.push({event:t,listeners:u})}var jh=/\r\n?/g,Ch=/\u0000|\uFFFD/g;function Pf(e){return(typeof e=="string"?e:""+e).replace(jh,`
`).replace(Ch,"")}function ed(e,t){return t=Pf(t),Pf(e)===t}function Se(e,t,n,a,l,i){switch(n){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||ha(e,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&ha(e,""+a);break;case"className":Pl(e,"class",a);break;case"tabIndex":Pl(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Pl(e,n,a);break;case"style":Pc(e,a,i);break;case"data":if(t!=="object"){Pl(e,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=ti(""+a),e.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(t!=="input"&&Se(e,t,"name",l.name,l,null),Se(e,t,"formEncType",l.formEncType,l,null),Se(e,t,"formMethod",l.formMethod,l,null),Se(e,t,"formTarget",l.formTarget,l,null)):(Se(e,t,"encType",l.encType,l,null),Se(e,t,"method",l.method,l,null),Se(e,t,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=ti(""+a),e.setAttribute(n,a);break;case"onClick":a!=null&&(e.onclick=Zt);break;case"onScroll":a!=null&&te("scroll",e);break;case"onScrollEnd":a!=null&&te("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(f(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(f(60));e.innerHTML=n}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}n=ti(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""+a):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":a===!0?e.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,a):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(n,a):e.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(n):e.setAttribute(n,a);break;case"popover":te("beforetoggle",e),te("toggle",e),Il(e,"popover",a);break;case"xlinkActuate":Vt(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Vt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Vt(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Vt(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Vt(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Vt(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Vt(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Vt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Vt(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Il(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=lm.get(n)||n,Il(e,n,a))}}function rc(e,t,n,a,l,i){switch(n){case"style":Pc(e,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(f(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(f(60));e.innerHTML=n}}break;case"children":typeof a=="string"?ha(e,a):(typeof a=="number"||typeof a=="bigint")&&ha(e,""+a);break;case"onScroll":a!=null&&te("scroll",e);break;case"onScrollEnd":a!=null&&te("scrollend",e);break;case"onClick":a!=null&&(e.onclick=Zt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Vc.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),t=n.slice(2,l?n.length-7:void 0),i=e[lt]||null,i=i!=null?i[n]:null,typeof i=="function"&&e.removeEventListener(t,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,a,l);break e}n in e?e[n]=a:a===!0?e.setAttribute(n,""):Il(e,n,a)}}}function $e(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":te("error",e),te("load",e);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(f(137,t));default:Se(e,t,i,u,n,null)}}l&&Se(e,t,"srcSet",n.srcSet,n,null),a&&Se(e,t,"src",n.src,n,null);return;case"input":te("invalid",e);var o=i=u=l=null,c=null,g=null;for(a in n)if(n.hasOwnProperty(a)){var x=n[a];if(x!=null)switch(a){case"name":l=x;break;case"type":u=x;break;case"checked":c=x;break;case"defaultChecked":g=x;break;case"value":i=x;break;case"defaultValue":o=x;break;case"children":case"dangerouslySetInnerHTML":if(x!=null)throw Error(f(137,t));break;default:Se(e,t,a,x,n,null)}}Wc(e,i,o,c,g,u,l,!1);return;case"select":te("invalid",e),a=u=i=null;for(l in n)if(n.hasOwnProperty(l)&&(o=n[l],o!=null))switch(l){case"value":i=o;break;case"defaultValue":u=o;break;case"multiple":a=o;default:Se(e,t,l,o,n,null)}t=i,n=u,e.multiple=!!a,t!=null?ma(e,!!a,t,!1):n!=null&&ma(e,!!a,n,!0);return;case"textarea":te("invalid",e),i=l=a=null;for(u in n)if(n.hasOwnProperty(u)&&(o=n[u],o!=null))switch(u){case"value":a=o;break;case"defaultValue":l=o;break;case"children":i=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(f(91));break;default:Se(e,t,u,o,n,null)}$c(e,a,l,i);return;case"option":for(c in n)if(n.hasOwnProperty(c)&&(a=n[c],a!=null))switch(c){case"selected":e.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:Se(e,t,c,a,n,null)}return;case"dialog":te("beforetoggle",e),te("toggle",e),te("cancel",e),te("close",e);break;case"iframe":case"object":te("load",e);break;case"video":case"audio":for(a=0;a<Ul.length;a++)te(Ul[a],e);break;case"image":te("error",e),te("load",e);break;case"details":te("toggle",e);break;case"embed":case"source":case"link":te("error",e),te("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(g in n)if(n.hasOwnProperty(g)&&(a=n[g],a!=null))switch(g){case"children":case"dangerouslySetInnerHTML":throw Error(f(137,t));default:Se(e,t,g,a,n,null)}return;default:if(Au(t)){for(x in n)n.hasOwnProperty(x)&&(a=n[x],a!==void 0&&rc(e,t,x,a,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(a=n[o],a!=null&&Se(e,t,o,a,n,null))}function Oh(e,t,n,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,u=null,o=null,c=null,g=null,x=null;for(b in n){var E=n[b];if(n.hasOwnProperty(b)&&E!=null)switch(b){case"checked":break;case"value":break;case"defaultValue":c=E;default:a.hasOwnProperty(b)||Se(e,t,b,null,a,E)}}for(var y in a){var b=a[y];if(E=n[y],a.hasOwnProperty(y)&&(b!=null||E!=null))switch(y){case"type":i=b;break;case"name":l=b;break;case"checked":g=b;break;case"defaultChecked":x=b;break;case"value":u=b;break;case"defaultValue":o=b;break;case"children":case"dangerouslySetInnerHTML":if(b!=null)throw Error(f(137,t));break;default:b!==E&&Se(e,t,y,b,a,E)}}Su(e,u,o,c,g,x,i,l);return;case"select":b=u=o=y=null;for(i in n)if(c=n[i],n.hasOwnProperty(i)&&c!=null)switch(i){case"value":break;case"multiple":b=c;default:a.hasOwnProperty(i)||Se(e,t,i,null,a,c)}for(l in a)if(i=a[l],c=n[l],a.hasOwnProperty(l)&&(i!=null||c!=null))switch(l){case"value":y=i;break;case"defaultValue":o=i;break;case"multiple":u=i;default:i!==c&&Se(e,t,l,i,a,c)}t=o,n=u,a=b,y!=null?ma(e,!!n,y,!1):!!a!=!!n&&(t!=null?ma(e,!!n,t,!0):ma(e,!!n,n?[]:"",!1));return;case"textarea":b=y=null;for(o in n)if(l=n[o],n.hasOwnProperty(o)&&l!=null&&!a.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:Se(e,t,o,null,a,l)}for(u in a)if(l=a[u],i=n[u],a.hasOwnProperty(u)&&(l!=null||i!=null))switch(u){case"value":y=l;break;case"defaultValue":b=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(f(91));break;default:l!==i&&Se(e,t,u,l,a,i)}Fc(e,y,b);return;case"option":for(var L in n)if(y=n[L],n.hasOwnProperty(L)&&y!=null&&!a.hasOwnProperty(L))switch(L){case"selected":e.selected=!1;break;default:Se(e,t,L,null,a,y)}for(c in a)if(y=a[c],b=n[c],a.hasOwnProperty(c)&&y!==b&&(y!=null||b!=null))switch(c){case"selected":e.selected=y&&typeof y!="function"&&typeof y!="symbol";break;default:Se(e,t,c,y,a,b)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var K in n)y=n[K],n.hasOwnProperty(K)&&y!=null&&!a.hasOwnProperty(K)&&Se(e,t,K,null,a,y);for(g in a)if(y=a[g],b=n[g],a.hasOwnProperty(g)&&y!==b&&(y!=null||b!=null))switch(g){case"children":case"dangerouslySetInnerHTML":if(y!=null)throw Error(f(137,t));break;default:Se(e,t,g,y,a,b)}return;default:if(Au(t)){for(var Te in n)y=n[Te],n.hasOwnProperty(Te)&&y!==void 0&&!a.hasOwnProperty(Te)&&rc(e,t,Te,void 0,a,y);for(x in a)y=a[x],b=n[x],!a.hasOwnProperty(x)||y===b||y===void 0&&b===void 0||rc(e,t,x,y,a,b);return}}for(var m in n)y=n[m],n.hasOwnProperty(m)&&y!=null&&!a.hasOwnProperty(m)&&Se(e,t,m,null,a,y);for(E in a)y=a[E],b=n[E],!a.hasOwnProperty(E)||y===b||y==null&&b==null||Se(e,t,E,y,a,b)}function td(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Rh(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,u=l.initiatorType,o=l.duration;if(i&&o&&td(u)){for(u=0,o=l.responseEnd,a+=1;a<n.length;a++){var c=n[a],g=c.startTime;if(g>o)break;var x=c.transferSize,E=c.initiatorType;x&&td(E)&&(c=c.responseEnd,u+=x*(c<o?1:(o-g)/(c-g)))}if(--a,t+=8*(i+u)/(l.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var fc=null,dc=null;function Fi(e){return e.nodeType===9?e:e.ownerDocument}function nd(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function ad(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function mc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var hc=null;function Uh(){var e=window.event;return e&&e.type==="popstate"?e===hc?!1:(hc=e,!0):(hc=null,!1)}var ld=typeof setTimeout=="function"?setTimeout:void 0,qh=typeof clearTimeout=="function"?clearTimeout:void 0,id=typeof Promise=="function"?Promise:void 0,Hh=typeof queueMicrotask=="function"?queueMicrotask:typeof id<"u"?function(e){return id.resolve(null).then(e).catch(Nh)}:ld;function Nh(e){setTimeout(function(){throw e})}function On(e){return e==="head"}function ud(e,t){var n=t,a=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){e.removeChild(l),Za(t);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")Hl(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,Hl(n);for(var i=n.firstChild;i;){var u=i.nextSibling,o=i.nodeName;i[Pa]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=u}}else n==="body"&&Hl(e.ownerDocument.body);n=l}while(n);Za(t)}function od(e,t){var n=e;e=0;do{var a=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=a}while(n)}function pc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":pc(n),bu(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function Bh(e,t,n,a){for(;e.nodeType===1;){var l=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[Pa])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==l.rel||e.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||e.getAttribute("title")!==(l.title==null?null:l.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(l.src==null?null:l.src)||e.getAttribute("type")!==(l.type==null?null:l.type)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=Ot(e.nextSibling),e===null)break}return null}function wh(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Ot(e.nextSibling),e===null))return null;return e}function cd(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Ot(e.nextSibling),e===null))return null;return e}function gc(e){return e.data==="$?"||e.data==="$~"}function yc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Lh(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var a=function(){t(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function Ot(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var vc=null;function sd(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Ot(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function rd(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function fd(e,t,n){switch(t=Fi(n),e){case"html":if(e=t.documentElement,!e)throw Error(f(452));return e;case"head":if(e=t.head,!e)throw Error(f(453));return e;case"body":if(e=t.body,!e)throw Error(f(454));return e;default:throw Error(f(451))}}function Hl(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);bu(e)}var Rt=new Map,dd=new Set;function $i(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var cn=U.d;U.d={f:Yh,r:Gh,D:Xh,C:Qh,L:Vh,m:Zh,X:Kh,S:kh,M:Jh};function Yh(){var e=cn.f(),t=Xi();return e||t}function Gh(e){var t=ra(e);t!==null&&t.tag===5&&t.type==="form"?Dr(t):cn.r(e)}var Xa=typeof document>"u"?null:document;function md(e,t,n){var a=Xa;if(a&&typeof t=="string"&&t){var l=Et(t);l='link[rel="'+e+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),dd.has(l)||(dd.add(l),e={rel:e,crossOrigin:n,href:t},a.querySelector(l)===null&&(t=a.createElement("link"),$e(t,"link",e),Ze(t),a.head.appendChild(t)))}}function Xh(e){cn.D(e),md("dns-prefetch",e,null)}function Qh(e,t){cn.C(e,t),md("preconnect",e,t)}function Vh(e,t,n){cn.L(e,t,n);var a=Xa;if(a&&e&&t){var l='link[rel="preload"][as="'+Et(t)+'"]';t==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+Et(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+Et(n.imageSizes)+'"]')):l+='[href="'+Et(e)+'"]';var i=l;switch(t){case"style":i=Qa(e);break;case"script":i=Va(e)}Rt.has(i)||(e=O({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Rt.set(i,e),a.querySelector(l)!==null||t==="style"&&a.querySelector(Nl(i))||t==="script"&&a.querySelector(Bl(i))||(t=a.createElement("link"),$e(t,"link",e),Ze(t),a.head.appendChild(t)))}}function Zh(e,t){cn.m(e,t);var n=Xa;if(n&&e){var a=t&&typeof t.as=="string"?t.as:"script",l='link[rel="modulepreload"][as="'+Et(a)+'"][href="'+Et(e)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Va(e)}if(!Rt.has(i)&&(e=O({rel:"modulepreload",href:e},t),Rt.set(i,e),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Bl(i)))return}a=n.createElement("link"),$e(a,"link",e),Ze(a),n.head.appendChild(a)}}}function kh(e,t,n){cn.S(e,t,n);var a=Xa;if(a&&e){var l=fa(a).hoistableStyles,i=Qa(e);t=t||"default";var u=l.get(i);if(!u){var o={loading:0,preload:null};if(u=a.querySelector(Nl(i)))o.loading=5;else{e=O({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Rt.get(i))&&bc(e,n);var c=u=a.createElement("link");Ze(c),$e(c,"link",e),c._p=new Promise(function(g,x){c.onload=g,c.onerror=x}),c.addEventListener("load",function(){o.loading|=1}),c.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Ii(u,t,a)}u={type:"stylesheet",instance:u,count:1,state:o},l.set(i,u)}}}function Kh(e,t){cn.X(e,t);var n=Xa;if(n&&e){var a=fa(n).hoistableScripts,l=Va(e),i=a.get(l);i||(i=n.querySelector(Bl(l)),i||(e=O({src:e,async:!0},t),(t=Rt.get(l))&&xc(e,t),i=n.createElement("script"),Ze(i),$e(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Jh(e,t){cn.M(e,t);var n=Xa;if(n&&e){var a=fa(n).hoistableScripts,l=Va(e),i=a.get(l);i||(i=n.querySelector(Bl(l)),i||(e=O({src:e,async:!0,type:"module"},t),(t=Rt.get(l))&&xc(e,t),i=n.createElement("script"),Ze(i),$e(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function hd(e,t,n,a){var l=(l=Z.current)?$i(l):null;if(!l)throw Error(f(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=Qa(n.href),n=fa(l).hoistableStyles,a=n.get(t),a||(a={type:"style",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Qa(n.href);var i=fa(l).hoistableStyles,u=i.get(e);if(u||(l=l.ownerDocument||l,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,u),(i=l.querySelector(Nl(e)))&&!i._p&&(u.instance=i,u.state.loading=5),Rt.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Rt.set(e,n),i||Wh(l,e,n,u.state))),t&&a===null)throw Error(f(528,""));return u}if(t&&a!==null)throw Error(f(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Va(n),n=fa(l).hoistableScripts,a=n.get(t),a||(a={type:"script",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(f(444,e))}}function Qa(e){return'href="'+Et(e)+'"'}function Nl(e){return'link[rel="stylesheet"]['+e+"]"}function pd(e){return O({},e,{"data-precedence":e.precedence,precedence:null})}function Wh(e,t,n,a){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=e.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),$e(t,"link",n),Ze(t),e.head.appendChild(t))}function Va(e){return'[src="'+Et(e)+'"]'}function Bl(e){return"script[async]"+e}function gd(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var a=e.querySelector('style[data-href~="'+Et(n.href)+'"]');if(a)return t.instance=a,Ze(a),a;var l=O({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),Ze(a),$e(a,"style",l),Ii(a,n.precedence,e),t.instance=a;case"stylesheet":l=Qa(n.href);var i=e.querySelector(Nl(l));if(i)return t.state.loading|=4,t.instance=i,Ze(i),i;a=pd(n),(l=Rt.get(l))&&bc(a,l),i=(e.ownerDocument||e).createElement("link"),Ze(i);var u=i;return u._p=new Promise(function(o,c){u.onload=o,u.onerror=c}),$e(i,"link",a),t.state.loading|=4,Ii(i,n.precedence,e),t.instance=i;case"script":return i=Va(n.src),(l=e.querySelector(Bl(i)))?(t.instance=l,Ze(l),l):(a=n,(l=Rt.get(i))&&(a=O({},n),xc(a,l)),e=e.ownerDocument||e,l=e.createElement("script"),Ze(l),$e(l,"link",a),e.head.appendChild(l),t.instance=l);case"void":return null;default:throw Error(f(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(a=t.instance,t.state.loading|=4,Ii(a,n.precedence,e));return t.instance}function Ii(e,t,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,u=0;u<a.length;u++){var o=a[u];if(o.dataset.precedence===t)i=o;else if(i!==l)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function bc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function xc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Pi=null;function yd(e,t,n){if(Pi===null){var a=new Map,l=Pi=new Map;l.set(n,a)}else l=Pi,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(e))return a;for(a.set(e,null),n=n.getElementsByTagName(e),l=0;l<n.length;l++){var i=n[l];if(!(i[Pa]||i[Ke]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var u=i.getAttribute(t)||"";u=e+u;var o=a.get(u);o?o.push(i):a.set(u,[i])}}return a}function vd(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function Fh(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function bd(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function $h(e,t,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=Qa(a.href),i=t.querySelector(Nl(l));if(i){t=i._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=eu.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=i,Ze(i);return}i=t.ownerDocument||t,a=pd(a),(l=Rt.get(l))&&bc(a,l),i=i.createElement("link"),Ze(i);var u=i;u._p=new Promise(function(o,c){u.onload=o,u.onerror=c}),$e(i,"link",a),n.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=eu.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var Sc=0;function Ih(e,t){return e.stylesheets&&e.count===0&&nu(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var a=setTimeout(function(){if(e.stylesheets&&nu(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+t);0<e.imgBytes&&Sc===0&&(Sc=62500*Rh());var l=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&nu(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>Sc?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function eu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)nu(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var tu=null;function nu(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,tu=new Map,t.forEach(Ph,e),tu=null,eu.call(e))}function Ph(e,t){if(!(t.state.loading&4)){var n=tu.get(e);if(n)var a=n.get(null);else{n=new Map,tu.set(e,n);for(var l=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var u=l[i];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(n.set(u.dataset.precedence,u),a=u)}a&&n.set(null,a)}l=t.instance,u=l.getAttribute("data-precedence"),i=n.get(u)||a,i===a&&n.set(null,l),n.set(u,l),this.count++,a=eu.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(l,e.firstChild)),t.state.loading|=4}}var wl={$$typeof:se,Provider:null,Consumer:null,_currentValue:k,_currentValue2:k,_threadCount:0};function ep(e,t,n,a,l,i,u,o,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=pu(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pu(0),this.hiddenUpdates=pu(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function xd(e,t,n,a,l,i,u,o,c,g,x,E){return e=new ep(e,t,n,u,c,g,x,E,o),t=1,i===!0&&(t|=24),i=pt(3,null,null,t),e.current=i,i.stateNode=e,t=Pu(),t.refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:t},ao(i),e}function Sd(e){return e?(e=Sa,e):Sa}function Td(e,t,n,a,l,i){l=Sd(l),a.context===null?a.context=l:a.pendingContext=l,a=xn(t),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=Sn(e,a,t),n!==null&&(rt(n,e,t),gl(n,e,t))}function Ad(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Tc(e,t){Ad(e,t),(e=e.alternate)&&Ad(e,t)}function Ed(e){if(e.tag===13||e.tag===31){var t=Wn(e,67108864);t!==null&&rt(t,e,67108864),Tc(e,67108864)}}function zd(e){if(e.tag===13||e.tag===31){var t=xt();t=gu(t);var n=Wn(e,t);n!==null&&rt(n,e,t),Tc(e,t)}}var au=!0;function tp(e,t,n,a){var l=T.T;T.T=null;var i=U.p;try{U.p=2,Ac(e,t,n,a)}finally{U.p=i,T.T=l}}function np(e,t,n,a){var l=T.T;T.T=null;var i=U.p;try{U.p=8,Ac(e,t,n,a)}finally{U.p=i,T.T=l}}function Ac(e,t,n,a){if(au){var l=Ec(a);if(l===null)sc(e,t,a,lu,n),Md(e,a);else if(lp(l,e,t,n,a))a.stopPropagation();else if(Md(e,a),t&4&&-1<ap.indexOf(e)){for(;l!==null;){var i=ra(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var u=Qe(i.pendingLanes);if(u!==0){var o=i;for(o.pendingLanes|=2,o.entangledLanes|=2;u;){var c=1<<31-et(u);o.entanglements[1]|=c,u&=~c}Gt(i),(he&6)===0&&(Yi=Ie()+500,Rl(0))}}break;case 31:case 13:o=Wn(i,2),o!==null&&rt(o,i,2),Xi(),Tc(i,2)}if(i=Ec(a),i===null&&sc(e,t,a,lu,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else sc(e,t,a,null,n)}}function Ec(e){return e=zu(e),zc(e)}var lu=null;function zc(e){if(lu=null,e=sa(e),e!==null){var t=R(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=H(t),e!==null)return e;e=null}else if(n===31){if(e=N(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return lu=e,null}function _d(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Vl()){case Wa:return 2;case Fa:return 8;case Vn:case Zl:return 32;case $a:return 268435456;default:return 32}default:return 32}}var _c=!1,Rn=null,Un=null,qn=null,Ll=new Map,Yl=new Map,Hn=[],ap="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Md(e,t){switch(e){case"focusin":case"focusout":Rn=null;break;case"dragenter":case"dragleave":Un=null;break;case"mouseover":case"mouseout":qn=null;break;case"pointerover":case"pointerout":Ll.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Yl.delete(t.pointerId)}}function Gl(e,t,n,a,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},t!==null&&(t=ra(t),t!==null&&Ed(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function lp(e,t,n,a,l){switch(t){case"focusin":return Rn=Gl(Rn,e,t,n,a,l),!0;case"dragenter":return Un=Gl(Un,e,t,n,a,l),!0;case"mouseover":return qn=Gl(qn,e,t,n,a,l),!0;case"pointerover":var i=l.pointerId;return Ll.set(i,Gl(Ll.get(i)||null,e,t,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,Yl.set(i,Gl(Yl.get(i)||null,e,t,n,a,l)),!0}return!1}function Dd(e){var t=sa(e.target);if(t!==null){var n=R(t);if(n!==null){if(t=n.tag,t===13){if(t=H(n),t!==null){e.blockedOn=t,Gc(e.priority,function(){zd(n)});return}}else if(t===31){if(t=N(n),t!==null){e.blockedOn=t,Gc(e.priority,function(){zd(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function iu(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ec(e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);Eu=a,n.target.dispatchEvent(a),Eu=null}else return t=ra(n),t!==null&&Ed(t),e.blockedOn=n,!1;t.shift()}return!0}function jd(e,t,n){iu(e)&&n.delete(t)}function ip(){_c=!1,Rn!==null&&iu(Rn)&&(Rn=null),Un!==null&&iu(Un)&&(Un=null),qn!==null&&iu(qn)&&(qn=null),Ll.forEach(jd),Yl.forEach(jd)}function uu(e,t){e.blockedOn===t&&(e.blockedOn=null,_c||(_c=!0,h.unstable_scheduleCallback(h.unstable_NormalPriority,ip)))}var ou=null;function Cd(e){ou!==e&&(ou=e,h.unstable_scheduleCallback(h.unstable_NormalPriority,function(){ou===e&&(ou=null);for(var t=0;t<e.length;t+=3){var n=e[t],a=e[t+1],l=e[t+2];if(typeof a!="function"){if(zc(a||n)===null)continue;break}var i=ra(n);i!==null&&(e.splice(t,3),t-=3,Eo(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function Za(e){function t(c){return uu(c,e)}Rn!==null&&uu(Rn,e),Un!==null&&uu(Un,e),qn!==null&&uu(qn,e),Ll.forEach(t),Yl.forEach(t);for(var n=0;n<Hn.length;n++){var a=Hn[n];a.blockedOn===e&&(a.blockedOn=null)}for(;0<Hn.length&&(n=Hn[0],n.blockedOn===null);)Dd(n),n.blockedOn===null&&Hn.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],u=l[lt]||null;if(typeof i=="function")u||Cd(n);else if(u){var o=null;if(i&&i.hasAttribute("formAction")){if(l=i,u=i[lt]||null)o=u.formAction;else if(zc(l)!==null)continue}else o=u.action;typeof o=="function"?n[a+1]=o:(n.splice(a,3),a-=3),Cd(n)}}}function Od(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(u){return l=u})},focusReset:"manual",scroll:"manual"})}function t(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),l!==null&&(l(),l=null)}}}function Mc(e){this._internalRoot=e}cu.prototype.render=Mc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(f(409));var n=t.current,a=xt();Td(n,a,e,t,null,null)},cu.prototype.unmount=Mc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Td(e.current,2,null,e,null,null),Xi(),t[ca]=null}};function cu(e){this._internalRoot=e}cu.prototype.unstable_scheduleHydration=function(e){if(e){var t=Yc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Hn.length&&t!==0&&t<Hn[n].priority;n++);Hn.splice(n,0,e),n===0&&Dd(e)}};var Rd=j.version;if(Rd!=="19.2.4")throw Error(f(527,Rd,"19.2.4"));U.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(f(188)):(e=Object.keys(e).join(","),Error(f(268,e)));return e=v(t),e=e!==null?C(e):null,e=e===null?null:e.stateNode,e};var up={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:T,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var su=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!su.isDisabled&&su.supportsFiber)try{fn=su.inject(up),Pe=su}catch{}}return Ql.createRoot=function(e,t){if(!D(e))throw Error(f(299));var n=!1,a="",l=wr,i=Lr,u=Yr;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(u=t.onRecoverableError)),t=xd(e,1,!1,null,null,n,a,null,l,i,u,Od),e[ca]=t.current,cc(e),new Mc(t)},Ql.hydrateRoot=function(e,t,n){if(!D(e))throw Error(f(299));var a=!1,l="",i=wr,u=Lr,o=Yr,c=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(c=n.formState)),t=xd(e,1,!0,t,n??null,a,l,c,i,u,o,Od),t.context=Sd(null),n=t.current,a=xt(),a=gu(a),l=xn(a),l.callback=null,Sn(n,l,a),n=a,t.current.lanes=n,Ia(t,n),Gt(t),e[ca]=t.current,cc(e),new cu(t)},Ql.version="19.2.4",Ql}var Xd;function vp(){if(Xd)return Cc.exports;Xd=1;function h(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(h)}catch(j){console.error(j)}}return h(),Cc.exports=yp(),Cc.exports}var bp=vp();const xp="modulepreload",Sp=function(h){return"/docs/"+h},Qd={},Ee=function(j,S,f){let D=Promise.resolve();if(S&&S.length>0){let H=function(v){return Promise.all(v.map(C=>Promise.resolve(C).then(O=>({status:"fulfilled",value:O}),O=>({status:"rejected",reason:O}))))};document.getElementsByTagName("link");const N=document.querySelector("meta[property=csp-nonce]"),M=(N==null?void 0:N.nonce)||(N==null?void 0:N.getAttribute("nonce"));D=H(S.map(v=>{if(v=Sp(v),v in Qd)return;Qd[v]=!0;const C=v.endsWith(".css"),O=C?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${v}"]${O}`))return;const V=document.createElement("link");if(V.rel=C?"stylesheet":xp,C||(V.as="script"),V.crossOrigin="",V.href=v,M&&V.setAttribute("nonce",M),document.head.appendChild(V),C)return new Promise((le,ze)=>{V.addEventListener("load",le),V.addEventListener("error",()=>ze(new Error(`Unable to preload CSS for ${v}`)))})}))}function R(H){const N=new Event("vite:preloadError",{cancelable:!0});if(N.payload=H,window.dispatchEvent(N),!N.defaultPrevented)throw H}return D.then(H=>{for(const N of H||[])N.status==="rejected"&&R(N.reason);return j().catch(R)})},ru={amber:{dark:{bg:"#09090b",sf:"#111114",sfH:"#18181c",bd:"#1e1e24",tx:"#e4e4e7",tx2:"#a1a1aa",txM:"#919199",ac:"#e8a845",acD:"rgba(232,168,69,0.12)",acT:"#fbbf24",cdBg:"#0c0c0f",cdTx:"#c4c4cc",sbBg:"#0c0c0e",hdBg:"rgba(9,9,11,0.85)"},light:{bg:"#fafaf9",sf:"#ffffff",sfH:"#f5f5f4",bd:"#e7e5e4",tx:"#1c1917",tx2:"#57534e",txM:"#706b66",ac:"#96640a",acD:"rgba(150,100,10,0.08)",acT:"#7a5208",cdBg:"#f5f3f0",cdTx:"#2c2520",sbBg:"#f5f5f3",hdBg:"rgba(250,250,249,0.85)"},fonts:{heading:"Instrument Serif",body:"DM Sans",code:"JetBrains Mono"}},editorial:{dark:{bg:"#080c1f",sf:"#0e1333",sfH:"#141940",bd:"#1a2050",tx:"#e8e6f0",tx2:"#b5b1c8",txM:"#9490ae",ac:"#ff6b4a",acD:"rgba(255,107,74,0.1)",acT:"#ff8a70",cdBg:"#0a0e27",cdTx:"#b8b4cc",sbBg:"#0a0e27",hdBg:"rgba(8,12,31,0.9)"},light:{bg:"#f6f4f0",sf:"#ffffff",sfH:"#eeece6",bd:"#ddd9d0",tx:"#1a1716",tx2:"#4a443e",txM:"#706960",ac:"#b83d22",acD:"rgba(184,61,34,0.07)",acT:"#9c3019",cdBg:"#edeae4",cdTx:"#3a3530",sbBg:"#f0ede8",hdBg:"rgba(246,244,240,0.92)"},fonts:{heading:"Cormorant Garamond",body:"Bricolage Grotesque",code:"Fira Code"}}},Tp=()=>s.jsx("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:s.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),Ap=()=>s.jsx("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:s.jsx("path",{d:"M18 6L6 18M6 6l12 12"})}),Ep=()=>s.jsx("svg",{width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:s.jsx("path",{d:"M22 2L11 13M22 2l-7 20-4-9-9-4z"})});function Jd(h){let j="You are a helpful documentation assistant. Answer questions accurately based on the documentation provided below. If the answer isn't in the documentation, say so clearly. Keep answers concise and reference specific sections when possible.";if(h){const S=h.length>1e5?h.slice(0,1e5)+`

[Documentation truncated...]`:h;j+=`

Documentation:
${S}`}return j}async function zp(h,j,S,f){var H,N,M;const D=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j}`},body:JSON.stringify({model:S,messages:[{role:"system",content:Jd(f)},...h.map(v=>({role:v.role,content:v.content}))]})});if(!D.ok){const v=await D.text();throw new Error(`OpenAI API error (${D.status}): ${v}`)}return((M=(N=(H=(await D.json()).choices)==null?void 0:H[0])==null?void 0:N.message)==null?void 0:M.content)||"No response."}async function _p(h,j,S,f){var H,N;const D=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":j,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:S,max_tokens:1024,system:Jd(f),messages:h.map(M=>({role:M.role,content:M.content}))})});if(!D.ok){const M=await D.text();throw new Error(`Anthropic API error (${D.status}): ${M}`)}return((N=(H=(await D.json()).content)==null?void 0:H[0])==null?void 0:N.text)||"No response."}function Mp(h){return h==="openai"?"gpt-4o-mini":"claude-sonnet-4-20250514"}function Dp({provider:h,model:j,apiKey:S,context:f}){const[D,R]=X.useState(!1),[H,N]=X.useState([]),[M,v]=X.useState(""),[C,O]=X.useState(!1),[V,le]=X.useState(null),ze=X.useRef(null),ce=X.useRef(null),pe=S||(typeof window<"u"?window.__TOME_AI_API_KEY__:void 0),G=j||Mp(h);X.useEffect(()=>{var I;(I=ze.current)==null||I.scrollIntoView({behavior:"smooth"})},[H]),X.useEffect(()=>{D&&setTimeout(()=>{var I;return(I=ce.current)==null?void 0:I.focus()},100)},[D]);const me=X.useCallback(async()=>{const I=M.trim();if(!I||C||!pe)return;const De={role:"user",content:I},Ce=[...H,De];N(Ce),v(""),O(!0),le(null);try{let B;h==="openai"?B=await zp(Ce,pe,G,f):B=await _p(Ce,pe,G,f),N(Ge=>[...Ge,{role:"assistant",content:B}])}catch(B){le(B instanceof Error?B.message:"Failed to get response")}finally{O(!1)}},[M,C,H,h,pe,G,f]),se=X.useCallback(I=>{I.key==="Enter"&&!I.shiftKey&&(I.preventDefault(),me())},[me]);return D?s.jsxs("div",{"data-testid":"ai-chat-panel",style:{position:"fixed",bottom:24,right:24,zIndex:900,width:380,maxWidth:"calc(100vw - 48px)",height:520,maxHeight:"calc(100vh - 48px)",background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,boxShadow:"0 16px 64px rgba(0,0,0,0.3)",display:"flex",flexDirection:"column",overflow:"hidden",fontFamily:"var(--font-body)"},children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderBottom:"1px solid var(--bd)",flexShrink:0},children:[s.jsx("span",{style:{fontSize:14,fontWeight:600,color:"var(--tx)"},children:"Ask AI"}),s.jsx("button",{"data-testid":"ai-chat-close",onClick:()=>R(!1),"aria-label":"Close AI chat",style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex",padding:4},children:s.jsx(Ap,{})})]}),s.jsxs("div",{style:{flex:1,overflow:"auto",padding:"12px 16px"},children:[!pe&&s.jsxs("div",{"data-testid":"ai-chat-no-key",style:{textAlign:"center",color:"var(--txM)",fontSize:13,padding:"24px 8px",lineHeight:1.6},children:[s.jsx("p",{style:{marginBottom:8,fontWeight:500,color:"var(--tx)"},children:"AI not configured"}),s.jsxs("p",{style:{marginBottom:8},children:["To enable AI chat, set the ",s.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"apiKeyEnv"})," in ",s.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"tome.config.js"})," and provide the environment variable at build time."]}),s.jsxs("p",{style:{fontSize:11.5,color:"var(--txM)"},children:["Example: ",s.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"TOME_AI_KEY=sk-... tome build"})]})]}),H.map((I,De)=>s.jsx("div",{"data-testid":`ai-chat-message-${I.role}`,style:{marginBottom:12,display:"flex",justifyContent:I.role==="user"?"flex-end":"flex-start"},children:s.jsx("div",{style:{maxWidth:"85%",padding:"8px 12px",borderRadius:10,fontSize:13,lineHeight:1.55,whiteSpace:"pre-wrap",wordBreak:"break-word",background:I.role==="user"?"var(--ac)":"var(--cdBg)",color:I.role==="user"?"#fff":"var(--tx)"},children:I.content})},De)),C&&s.jsx("div",{"data-testid":"ai-chat-loading",style:{display:"flex",justifyContent:"flex-start",marginBottom:12},children:s.jsx("div",{style:{padding:"8px 12px",borderRadius:10,fontSize:13,background:"var(--cdBg)",color:"var(--txM)"},children:"Thinking..."})}),V&&s.jsx("div",{"data-testid":"ai-chat-error",style:{padding:"8px 12px",borderRadius:8,fontSize:12,background:"rgba(220,50,50,0.1)",color:"#d44",marginBottom:12},children:V}),s.jsx("div",{ref:ze})]}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderTop:"1px solid var(--bd)",flexShrink:0},children:[s.jsx("input",{ref:ce,"data-testid":"ai-chat-input",value:M,onChange:I=>v(I.target.value),onKeyDown:se,placeholder:pe?"Ask a question...":"API key required",disabled:!pe,style:{flex:1,background:"var(--cdBg)",border:"1px solid var(--bd)",borderRadius:8,padding:"8px 12px",color:"var(--tx)",fontSize:13,fontFamily:"var(--font-body)",outline:"none"}}),s.jsx("button",{"data-testid":"ai-chat-send",onClick:me,disabled:!pe||!M.trim()||C,"aria-label":"Send message",style:{width:34,height:34,borderRadius:8,background:pe&&M.trim()?"var(--ac)":"var(--cdBg)",color:pe&&M.trim()?"#fff":"var(--txM)",border:"none",cursor:pe&&M.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:s.jsx(Ep,{})})]})]}):s.jsx("button",{"data-testid":"ai-chat-button",onClick:()=>R(!0),"aria-label":"Open AI chat",style:{position:"fixed",bottom:24,right:24,zIndex:900,width:48,height:48,borderRadius:"50%",background:"var(--ac)",color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(0,0,0,0.25)",transition:"transform 0.15s"},children:s.jsx(Tp,{})})}function jp(h){const j=/^#([0-9a-f]{6})$/i.exec(h.trim());if(!j)return null;const S=parseInt(j[1],16);return[S>>16&255,S>>8&255,S&255]}function Cp(h,j){const S=jp(h);if(!S)return null;const[f,D,R]=S,H=`rgba(${f},${D},${R},${j?.12:.08})`,N=j?1.15:.85,M=Math.min(255,Math.round(f*N)),v=Math.min(255,Math.round(D*N)),C=Math.min(255,Math.round(R*N)),O=`rgb(${M},${v},${C})`;return{ac:h,acD:H,acT:O}}const St=({d:h,size:j=16})=>s.jsx("svg",{width:j,height:j,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:s.jsx("path",{d:h})}),Wd=()=>s.jsx(St,{d:"M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3"}),Vd=()=>s.jsx(St,{d:"M9 18l6-6-6-6",size:14}),qc=()=>s.jsx(St,{d:"M6 9l6 6 6-6",size:14}),Op=()=>s.jsx(St,{d:"M3 12h18M3 6h18M3 18h18",size:20}),Rp=()=>s.jsx(St,{d:"M18 6L6 18M6 6l12 12",size:18}),Up=()=>s.jsx(St,{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"}),qp=()=>s.jsx(St,{d:"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-4a1 1 0 0 1 1-1v-1a1 1 0 0 1-2 0v1a1 1 0 0 1 1 1Zm0 16a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1Zm18-1h-1a1 1 0 0 1 0 2h1a1 1 0 0 1 0-2ZM6.34 6.34a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41Zm12.73-2.12-.71.71a1 1 0 0 1-1.41-1.41l.71-.71a1 1 0 1 1 1.41 1.41ZM6.34 17.66l-.71.71a1 1 0 0 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 1.41Zm12.73 2.12-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1-1.41 1.41Z"}),Hp=()=>s.jsx(St,{d:"M19 12H5M12 19l-7-7 7-7",size:14}),Np=()=>s.jsx(St,{d:"M5 12h14M12 5l7 7-7 7",size:14}),Bp=()=>s.jsx(St,{d:"M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",size:13});function wp(h){const j=new Date(h),f=new Date().getTime()-j.getTime();if(isNaN(f))return"";const D=Math.floor(f/1e3),R=Math.floor(D/60),H=Math.floor(R/60),N=Math.floor(H/24),M=Math.floor(N/30),v=Math.floor(N/365);return D<60?"just now":R<60?`${R} minute${R===1?"":"s"} ago`:H<24?`${H} hour${H===1?"":"s"} ago`:N<30?`${N} day${N===1?"":"s"} ago`:M<12?`${M} month${M===1?"":"s"} ago`:v>=1?`${v} year${v===1?"":"s"} ago`:j.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}let ka=null;const Lp="/_pagefind/pagefind.js";async function Yp(){if(ka)return ka;try{return ka=await import(Lp),await ka.init(),ka}catch{return null}}let fu=null;function Gp(){return fu||(fu=Ee(()=>import("./index-UlrXhIXk.js"),[]).catch(()=>null),fu)}function Xp({appId:h,apiKey:j,indexName:S,onNavigate:f,onClose:D}){const[R,H]=X.useState(null),[N,M]=X.useState(!1);X.useEffect(()=>{Gp().then(C=>{C&&C.DocSearch?H(()=>C.DocSearch):C&&C.default?H(()=>C.default):M(!0)})},[]);const v=X.useCallback(C=>{try{return new URL(C,"http://localhost").pathname.replace(/^\//,"").replace(/\/index\.html$/,"").replace(/\.html$/,"")||"index"}catch{return"index"}},[]);return N?s.jsx("div",{onClick:D,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"12vh"},children:s.jsx("div",{onClick:C=>C.stopPropagation(),style:{background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,width:"100%",maxWidth:520,boxShadow:"0 24px 80px rgba(0,0,0,0.4)",padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"Algolia DocSearch is not available. Install @docsearch/react to enable it."})}):R?s.jsx("div",{"data-testid":"algolia-search-modal",children:s.jsx(R,{appId:h,apiKey:j,indexName:S,navigator:{navigate({itemUrl:C}){const O=v(C);f(O)}},hitComponent:({hit:C,children:O})=>s.jsx("a",{href:C.url,onClick:V=>{V.preventDefault();const le=v(C.url);f(le)},children:O})})}):s.jsx("div",{onClick:D,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"12vh"},children:s.jsx("div",{style:{background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,width:"100%",maxWidth:520,boxShadow:"0 24px 80px rgba(0,0,0,0.4)",padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"Loading search..."})})}const Qp=()=>s.jsx(St,{d:"M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",size:14}),Vp=()=>s.jsx(St,{d:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z",size:14}),Zp=()=>s.jsx(St,{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3",size:11}),kp={Added:"#22c55e",Changed:"#3b82f6",Deprecated:"#f59e0b",Removed:"#ef4444",Fixed:"#8b5cf6",Security:"#f97316"};function Kp({entries:h}){const[j,S]=X.useState(h.length<=5),f=j?h:h.slice(0,5);return s.jsxs("div",{"data-testid":"changelog-timeline",style:{position:"relative"},children:[s.jsx("div",{style:{position:"absolute",left:15,top:8,bottom:8,width:2,background:"var(--bd)"}}),f.map((D,R)=>s.jsxs("div",{"data-testid":`changelog-entry-${D.version}`,style:{position:"relative",paddingLeft:44,paddingBottom:R<f.length-1?32:0},children:[s.jsx("div",{style:{position:"absolute",left:8,top:6,width:16,height:16,borderRadius:"50%",background:D.version==="Unreleased"?"var(--txM)":"var(--ac)",border:"3px solid var(--bg, #1a1a1a)"}}),s.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:12,marginBottom:12},children:[s.jsx("span",{style:{fontSize:18,fontWeight:700,color:"var(--tx)",fontFamily:"var(--font-heading, inherit)"},children:D.url?s.jsx("a",{href:D.url,target:"_blank",rel:"noopener noreferrer",style:{color:"inherit",textDecoration:"none"},children:D.version}):D.version}),D.date&&s.jsx("span",{style:{fontSize:13,color:"var(--txM)",fontFamily:"var(--font-code, monospace)"},children:D.date})]}),D.sections.map(H=>{const N=kp[H.type]||"#6b7280";return s.jsxs("div",{style:{marginBottom:16},children:[s.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,marginBottom:8},children:[s.jsx("span",{style:{display:"inline-block",width:8,height:8,borderRadius:"50%",background:N}}),s.jsx("span",{style:{fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em",color:N,fontFamily:"var(--font-code, monospace)"},children:H.type})]}),s.jsx("ul",{style:{margin:0,paddingLeft:18,listStyleType:"disc",color:"var(--tx2)"},children:H.items.map((M,v)=>s.jsx("li",{style:{fontSize:14,lineHeight:1.7,color:"var(--tx2)",marginBottom:2},children:M},v))})]},H.type)})]},D.version)),!j&&h.length>5&&s.jsx("div",{style:{textAlign:"center",marginTop:24},children:s.jsxs("button",{"data-testid":"changelog-show-more",onClick:()=>S(!0),style:{background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"8px 20px",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body, inherit)",cursor:"pointer"},children:["Show all ",h.length," releases"]})})]})}function Jp({config:h,navigation:j,currentPageId:S,pageHtml:f,pageComponent:D,mdxComponents:R,pageTitle:H,pageDescription:N,headings:M,tocEnabled:v=!0,editUrl:C,lastUpdated:O,changelogEntries:V,onNavigate:le,allPages:ze,versioning:ce,currentVersion:pe,i18n:G,currentLocale:me,docContext:se}){var Vl,Wa,Fa,Vn,Zl,$a,kl,Kl,fn,Pe,qt,et,Jl,Wl,Fl;const I=((Vl=h.theme)==null?void 0:Vl.mode)||"auto",[De,Ce]=X.useState(()=>{var _;return I==="dark"?!0:I==="light"?!1:((_=window.matchMedia)==null?void 0:_.call(window,"(prefers-color-scheme: dark)").matches)??!0}),[B,Ge]=X.useState(()=>typeof window<"u"&&window.innerWidth<768),[Oe,Ut]=X.useState(()=>typeof window<"u"&&window.innerWidth>=768),[ft,Re]=X.useState(!1),[Xt,Tt]=X.useState(!1),[dt,T]=X.useState(!1),U=ce&&pe&&pe!==ce.current,[k,ge]=X.useState(j.map(_=>_.section)),re=X.useRef(null),[d,z]=X.useState(()=>typeof window<"u"&&window.innerWidth>1100),q=((Wa=h.theme)==null?void 0:Wa.preset)||"amber",w=((Fa=ru[q])==null?void 0:Fa[De?"dark":"light"])||ru.amber.dark,J=(Vn=h.theme)!=null&&Vn.accent?Cp(h.theme.accent,De):null,Z=J?{...w,...J}:w,ue=((Zl=ru[q])==null?void 0:Zl.fonts)||ru.amber.fonts,Xe={heading:((kl=($a=h.theme)==null?void 0:$a.fonts)==null?void 0:kl.heading)||ue.heading,body:((fn=(Kl=h.theme)==null?void 0:Kl.fonts)==null?void 0:fn.body)||ue.body,code:((qt=(Pe=h.theme)==null?void 0:Pe.fonts)==null?void 0:qt.code)||ue.code};X.useEffect(()=>{if(I!=="auto")return;const _=window.matchMedia("(prefers-color-scheme: dark)"),W=oe=>Ce(oe.matches);return _.addEventListener("change",W),()=>_.removeEventListener("change",W)},[I]),X.useEffect(()=>{document.documentElement.classList.toggle("dark",De)},[De]),X.useEffect(()=>{const _=()=>{const W=window.innerWidth;z(W>1100),Ge(W<768)};return _(),window.addEventListener("resize",_),()=>window.removeEventListener("resize",_)},[]),X.useEffect(()=>{if(B&&Oe)return document.body.style.overflow="hidden",()=>{document.body.style.overflow=""}},[B,Oe]),X.useEffect(()=>{var _;(_=re.current)==null||_.scrollTo(0,0)},[S]);const be=h.toc,Bn=(be==null?void 0:be.depth)??3,wn=(be==null?void 0:be.enabled)!==!1&&v,sn=M.filter(_=>_.depth<=Bn),[Qt,Ln]=X.useState("");X.useEffect(()=>{if(!wn||sn.length<2)return;const _=re.current;if(!_)return;const W=setTimeout(()=>{const oe=[];for(const at of sn){const mt=_.querySelector(`#${CSS.escape(at.id)}`);mt&&oe.push(mt)}if(oe.length===0)return;const Qe=new IntersectionObserver(at=>{const mt=at.filter(dn=>dn.isIntersecting).sort((dn,$l)=>dn.boundingClientRect.top-$l.boundingClientRect.top);mt.length>0&&Ln(mt[0].target.id)},{root:_,rootMargin:"0px 0px -80% 0px",threshold:0});for(const at of oe)Qe.observe(at);Yn.current=Qe},100);return()=>{var oe;clearTimeout(W),(oe=Yn.current)==null||oe.disconnect(),Yn.current=null}},[S,wn,sn.map(_=>_.id).join(",")]);const Yn=X.useRef(null);X.useEffect(()=>{Ln("")},[S]);const du=X.useCallback((_,W)=>{_.preventDefault();const oe=re.current;if(!oe)return;const Qe=oe.querySelector(`#${CSS.escape(W)}`);Qe&&(Qe.scrollIntoView({behavior:"smooth",block:"start"}),Ln(W))},[]);X.useEffect(()=>{const _=W=>{(W.metaKey||W.ctrlKey)&&W.key==="k"&&(W.preventDefault(),Re(!0)),W.key==="Escape"&&Re(!1)};return window.addEventListener("keydown",_),()=>window.removeEventListener("keydown",_)},[]);const Gn=j.flatMap(_=>_.pages),rn=Gn.findIndex(_=>_.id===S),Xn=rn>0?Gn[rn-1]:null,Qn=rn<Gn.length-1?Gn[rn+1]:null,mu=_=>ge(W=>W.includes(_)?W.filter(oe=>oe!==_):[...W,_]),hu={"--bg":Z.bg,"--sf":Z.sf,"--sfH":Z.sfH,"--bd":Z.bd,"--tx":Z.tx,"--tx2":Z.tx2,"--txM":Z.txM,"--ac":Z.ac,"--acD":Z.acD,"--acT":Z.acT,"--cdBg":Z.cdBg,"--cdTx":Z.cdTx,"--sbBg":Z.sbBg,"--hdBg":Z.hdBg,"--font-heading":`"${Xe.heading}", serif`,"--font-body":`"${Xe.body}", sans-serif`,"--font-code":`"${Xe.code}", monospace`},Ie=D;return s.jsxs("div",{className:"tome-grain",style:{...hu,color:"var(--tx)",background:"var(--bg)",fontFamily:"var(--font-body)",minHeight:"100vh"},children:[ft&&((et=h.search)==null?void 0:et.provider)==="algolia"&&h.search.appId&&h.search.apiKey&&h.search.indexName?s.jsx(Xp,{appId:h.search.appId,apiKey:h.search.apiKey,indexName:h.search.indexName,onNavigate:_=>{le(_),Re(!1)},onClose:()=>Re(!1)}):ft?s.jsx(Wp,{allPages:ze,onNavigate:_=>{le(_),Re(!1)},onClose:()=>Re(!1),mobile:B}):null,s.jsxs("div",{style:{display:"flex",height:"100vh"},children:[B&&Oe&&s.jsx("div",{onClick:()=>Ut(!1),style:{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.4)",backdropFilter:"blur(2px)"}}),s.jsxs("aside",{style:{width:Oe?270:0,minWidth:Oe?270:0,background:"var(--sbBg)",borderRight:"1px solid var(--bd)",display:"flex",flexDirection:"column",transition:"width .2s, min-width .2s",overflow:"hidden",...B?{position:"fixed",top:0,left:0,bottom:0,zIndex:201}:{}},children:[s.jsxs("a",{href:"/",style:{padding:"18px 20px",display:"flex",alignItems:"baseline",gap:6,borderBottom:"1px solid var(--bd)",textDecoration:"none",color:"inherit"},children:[s.jsx("span",{style:{fontFamily:"var(--font-heading)",fontSize:22,fontWeight:700,fontStyle:"italic"},children:h.name}),s.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:"var(--ac)",display:"inline-block"}})]}),s.jsx("div",{style:{padding:"12px 14px"},children:s.jsxs("button",{onClick:()=>{Re(!0),B&&Ut(!1)},style:{display:"flex",alignItems:"center",gap:8,width:"100%",background:"var(--cdBg)",border:"1px solid var(--bd)",borderRadius:2,padding:"8px 12px",cursor:"pointer",color:"var(--txM)",fontSize:12.5,fontFamily:"var(--font-body)"},children:[s.jsx(Wd,{}),s.jsx("span",{style:{flex:1,textAlign:"left"},children:"Search..."}),s.jsx("kbd",{style:{fontFamily:"var(--font-code)",fontSize:9,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"2px 6px"},children:"⌘K"})]})}),s.jsx("nav",{style:{flex:1,overflow:"auto",padding:"4px 10px 20px"},children:j.map(_=>s.jsxs("div",{style:{marginBottom:8},children:[s.jsxs("button",{onClick:()=>mu(_.section),style:{display:"flex",alignItems:"center",gap:6,width:"100%",background:"none",border:"none",padding:"8px 10px",cursor:"pointer",borderRadius:2,color:"var(--txM)",fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",fontFamily:"var(--font-code)"},children:[k.includes(_.section)?s.jsx(qc,{}):s.jsx(Vd,{}),_.section]}),k.includes(_.section)&&s.jsx("div",{style:{marginLeft:8,borderLeft:"1px solid var(--bd)",paddingLeft:0},children:_.pages.map(W=>{const oe=S===W.id;return s.jsx("button",{onClick:()=>{le(W.id),B&&Ut(!1)},style:{display:"flex",alignItems:"center",gap:10,width:"100%",textAlign:"left",background:"none",border:"none",borderRadius:0,borderLeft:oe?"2px solid var(--ac)":"2px solid transparent",padding:"7px 14px",cursor:"pointer",color:oe?"var(--ac)":"var(--tx2)",fontSize:13,fontWeight:oe?500:400,fontFamily:"var(--font-body)",transition:"all .12s"},children:W.title},W.id)})})]},_.section))}),s.jsxs("div",{style:{padding:"12px 16px",borderTop:"1px solid var(--bd)",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[I==="auto"?s.jsx("button",{"aria-label":De?"Switch to light mode":"Switch to dark mode",onClick:()=>Ce(_=>!_),style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex"},children:De?s.jsx(qp,{}):s.jsx(Up,{})}):s.jsx("div",{}),s.jsxs("span",{style:{fontSize:11,color:"var(--txM)",letterSpacing:.2},children:["Built with ","♡"," by Tome"]}),s.jsx("span",{style:{fontFamily:"var(--font-code)",fontSize:10,color:"var(--txM)"},children:"v0.2.6"})]})]}),s.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"},children:[s.jsxs("header",{style:{display:"flex",alignItems:"center",gap:B?8:12,padding:B?"8px 12px":"10px 24px",borderBottom:"1px solid var(--bd)",background:"var(--hdBg)",backdropFilter:"blur(12px)"},children:[s.jsx("button",{"aria-label":Oe?"Close sidebar":"Open sidebar",onClick:()=>Ut(!Oe),style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex"},children:Oe?s.jsx(Rp,{}):s.jsx(Op,{})}),B?s.jsx("span",{style:{fontSize:13,color:"var(--ac)",fontFamily:"var(--font-code)",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:((Jl=j.flatMap(_=>_.pages).find(_=>_.id===S))==null?void 0:Jl.title)||""}):s.jsx("div",{style:{display:"flex",alignItems:"center",gap:8,fontFamily:"var(--font-code)",fontSize:11,color:"var(--txM)",letterSpacing:".03em",flex:1},children:j.map(_=>{const W=_.pages.find(oe=>oe.id===S);return W?s.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[s.jsx("span",{children:_.section}),s.jsx(Vd,{}),s.jsx("span",{style:{color:"var(--ac)"},children:W.title})]},_.section):null})}),h.topNav&&h.topNav.length>0&&!B&&s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[h.topNav.map(_=>{const W=_.href.startsWith("http")||!_.href.startsWith("#");return s.jsxs("a",{href:_.href,...W?{target:"_blank",rel:"noopener noreferrer"}:{},style:{display:"flex",alignItems:"center",gap:4,color:"var(--txM)",textDecoration:"none",fontSize:12,fontFamily:"var(--font-body)",fontWeight:500,transition:"color .15s"},onMouseOver:oe=>oe.currentTarget.style.color="var(--ac)",onMouseOut:oe=>oe.currentTarget.style.color="var(--txM)",children:[_.label,W&&s.jsx(Zp,{})]},_.label)}),s.jsx("span",{style:{width:1,height:16,background:"var(--bd)"}})]}),ce&&s.jsxs("div",{style:{position:"relative"},children:[s.jsxs("button",{"data-testid":"version-switcher",onClick:()=>Tt(_=>!_),style:{display:"flex",alignItems:"center",gap:6,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"5px 10px",cursor:"pointer",color:"var(--tx2)",fontSize:12,fontFamily:"var(--font-code)"},children:[s.jsx(Qp,{}),pe||ce.current,s.jsx(qc,{})]}),Xt&&s.jsx("div",{"data-testid":"version-dropdown",style:{position:"absolute",top:"100%",right:0,marginTop:4,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",overflow:"hidden",zIndex:100,minWidth:120},children:ce.versions.map(_=>s.jsxs("button",{onClick:()=>{Tt(!1);const W=_===ce.current?"/":`/${_}`;window.location.href=W},style:{display:"block",width:"100%",textAlign:"left",background:_===(pe||ce.current)?"var(--acD)":"none",border:"none",padding:"8px 14px",cursor:"pointer",color:_===(pe||ce.current)?"var(--ac)":"var(--tx2)",fontSize:12,fontFamily:"var(--font-code)",fontWeight:_===ce.current?600:400},children:[_,_===ce.current?" (latest)":""]},_))})]}),G&&G.locales.length>1&&s.jsxs("div",{style:{position:"relative"},children:[s.jsxs("button",{"data-testid":"language-switcher",onClick:()=>T(_=>!_),style:{display:"flex",alignItems:"center",gap:6,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"5px 10px",cursor:"pointer",color:"var(--tx2)",fontSize:12,fontFamily:"var(--font-body)"},children:[s.jsx(Vp,{}),((Wl=G.localeNames)==null?void 0:Wl[me||G.defaultLocale])||me||G.defaultLocale,s.jsx(qc,{})]}),dt&&s.jsx("div",{"data-testid":"language-dropdown",style:{position:"absolute",top:"100%",right:0,marginTop:4,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",overflow:"hidden",zIndex:100,minWidth:120},children:G.locales.map(_=>{var dn;const W=_===(me||G.defaultLocale),oe=((dn=G.localeNames)==null?void 0:dn[_])||_,Qe=me||G.defaultLocale;let at=S;Qe!==G.defaultLocale&&S.startsWith(`${Qe}/`)&&(at=S.slice(Qe.length+1));const mt=_===G.defaultLocale?at:`${_}/${at}`;return s.jsx("button",{onClick:()=>{T(!1),le(mt)},style:{display:"block",width:"100%",textAlign:"left",background:W?"var(--acD)":"none",border:"none",padding:"8px 14px",cursor:"pointer",color:W?"var(--ac)":"var(--tx2)",fontSize:12,fontFamily:"var(--font-body)",fontWeight:W?600:400},children:oe},_)})})]})]}),U&&s.jsxs("div",{"data-testid":"old-version-banner",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"var(--acD)",borderBottom:"1px solid var(--bd)",padding:"8px 24px",fontSize:13,color:"var(--tx2)"},children:[s.jsxs("span",{children:["You're viewing docs for ",pe,"."]}),s.jsx("button",{onClick:()=>{window.location.href="/"},style:{background:"none",border:"none",color:"var(--ac)",cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"var(--font-body)",textDecoration:"underline"},children:"Switch to latest."})]}),s.jsxs("div",{ref:re,style:{flex:1,overflow:"auto",display:"flex"},children:[s.jsxs("main",{style:{flex:1,maxWidth:B?"100%":760,padding:B?"24px 16px 60px":"40px 48px 80px",margin:"0 auto",minWidth:0},children:[s.jsx("h1",{style:{fontFamily:"var(--font-heading)",fontSize:B?26:38,fontWeight:400,fontStyle:"italic",lineHeight:1.15,marginBottom:8},children:H}),N&&s.jsx("p",{style:{fontSize:16,color:"var(--tx2)",lineHeight:1.6,marginBottom:32},children:N}),s.jsx("div",{style:{borderTop:"1px solid var(--bd)",paddingTop:28},children:V&&V.length>0?s.jsx(Kp,{entries:V}):Ie?s.jsx("div",{className:"tome-content",children:s.jsx(Ie,{components:R||{}})}):s.jsx("div",{className:"tome-content",dangerouslySetInnerHTML:{__html:(f||"").replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/,"")}})}),(C||O)&&s.jsxs("div",{style:{marginTop:40,display:"flex",flexDirection:B?"column":"row",alignItems:B?"flex-start":"center",justifyContent:"space-between",gap:B?8:16},children:[C&&s.jsx("div",{"data-testid":"edit-page-link",children:s.jsxs("a",{href:C,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:6,color:"var(--txM)",textDecoration:"none",fontSize:13,fontFamily:"var(--font-body)",transition:"color .15s"},onMouseOver:_=>_.currentTarget.style.color="var(--ac)",onMouseOut:_=>_.currentTarget.style.color="var(--txM)",children:[s.jsx(Bp,{})," Edit this page on GitHub"]})}),O&&s.jsxs("div",{"data-testid":"last-updated",style:{fontSize:12,color:"var(--txM)",fontFamily:"var(--font-body)"},children:["Last updated ",wp(O)]})]}),s.jsxs("div",{style:{display:"flex",flexDirection:B?"column":"row",justifyContent:"space-between",marginTop:C||O?16:48,paddingTop:24,borderTop:"1px solid var(--bd)",gap:B?12:16},children:[Xn?s.jsxs("button",{onClick:()=>le(Xn.id),style:{display:"flex",alignItems:"center",gap:8,background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"10px 16px",cursor:"pointer",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body)",transition:"border-color .15s, color .15s"},children:[s.jsx(Hp,{})," ",Xn.title]}):s.jsx("div",{}),Qn?s.jsxs("button",{onClick:()=>le(Qn.id),style:{display:"flex",alignItems:"center",gap:8,background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"10px 16px",cursor:"pointer",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body)",transition:"border-color .15s, color .15s"},children:[Qn.title," ",s.jsx(Np,{})]}):s.jsx("div",{})]})]}),wn&&sn.length>=2&&d&&s.jsxs("aside",{"data-testid":"toc-sidebar",style:{width:200,padding:"40px 16px 40px 0",position:"sticky",top:0,alignSelf:"flex-start",flexShrink:0},children:[s.jsx("div",{style:{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",color:"var(--txM)",marginBottom:12,fontFamily:"var(--font-code)"},children:"On this page"}),s.jsx("nav",{"aria-label":"Table of contents",style:{borderLeft:"1px solid var(--bd)",paddingLeft:0},children:sn.map((_,W)=>{const oe=Qt===_.id;return s.jsx("a",{href:`#${_.id}`,onClick:Qe=>du(Qe,_.id),"data-testid":`toc-link-${_.id}`,style:{display:"block",fontSize:12,color:oe?"var(--ac)":"var(--txM)",fontWeight:oe?500:400,textDecoration:"none",padding:"4px 12px",paddingLeft:12+(_.depth-2)*12,lineHeight:1.4,transition:"color .15s, font-weight .15s",borderLeft:oe?"2px solid var(--ac)":"2px solid transparent",marginLeft:-1},children:_.text},W)})})]})]})]})]}),((Fl=h.ai)==null?void 0:Fl.enabled)&&s.jsx(Dp,{provider:h.ai.provider||"anthropic",model:h.ai.model,apiKey:typeof __TOME_AI_API_KEY__<"u"&&__TOME_AI_API_KEY__?__TOME_AI_API_KEY__:void 0,context:(se==null?void 0:se.map(_=>`## ${_.title}
${_.content}`).join(`

`))??ze.map(_=>`- ${_.title}${_.description?": "+_.description:""}`).join(`
`)})]})}function Wp({allPages:h,onNavigate:j,onClose:S,mobile:f}){const[D,R]=X.useState(""),[H,N]=X.useState([]),[M,v]=X.useState(0),[C,O]=X.useState(null),V=X.useRef(null),le=X.useRef(void 0);X.useEffect(()=>{Yp().then(G=>O(!!G)),setTimeout(()=>{var G;return(G=V.current)==null?void 0:G.focus()},50)},[]);const ze=X.useCallback(G=>{if(!G.trim())return[];const me=G.toLowerCase();return h.filter(se=>se.title.toLowerCase().includes(me)||(se.description||"").toLowerCase().includes(me)).slice(0,8).map(se=>({id:se.id,title:se.title,excerpt:se.description}))},[h]),ce=X.useCallback(async G=>{var se;if(!G.trim()){N([]),v(0);return}const me=ka;if(me)try{const I=await me.search(G),De=[];for(const Ce of I.results.slice(0,8)){const B=await Ce.data(),Oe=(B.url||"").replace(/^\//,"").replace(/\/index\.html$/,"").replace(/\.html$/,"")||"index";De.push({id:Oe,title:((se=B.meta)==null?void 0:se.title)||Oe,excerpt:B.excerpt||void 0})}N(De),v(0);return}catch{}N(ze(G)),v(0)},[ze]);X.useEffect(()=>(le.current&&clearTimeout(le.current),le.current=setTimeout(()=>ce(D),120),()=>{le.current&&clearTimeout(le.current)}),[D,ce]);const pe=X.useCallback(G=>{G.key==="ArrowDown"?(G.preventDefault(),v(me=>Math.min(me+1,H.length-1))):G.key==="ArrowUp"?(G.preventDefault(),v(me=>Math.max(me-1,0))):G.key==="Enter"&&H.length>0&&(G.preventDefault(),j(H[M].id))},[H,M,j]);return s.jsx("div",{onClick:S,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:f?"stretch":"flex-start",justifyContent:"center",paddingTop:f?0:"12vh"},children:s.jsxs("div",{onClick:G=>G.stopPropagation(),style:{background:"var(--sf)",border:f?"none":"1px solid var(--bd)",borderRadius:f?0:2,width:"100%",maxWidth:f?"100%":520,boxShadow:f?"none":"0 24px 80px rgba(0,0,0,0.4)",overflow:"hidden",display:"flex",flexDirection:"column",...f?{height:"100%"}:{}},children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--bd)"},children:[s.jsx(Wd,{}),s.jsx("input",{ref:V,value:D,onChange:G=>R(G.target.value),onKeyDown:pe,placeholder:"Search documentation...",style:{flex:1,background:"none",border:"none",outline:"none",color:"var(--tx)",fontSize:15,fontFamily:"var(--font-body)"}}),s.jsx("kbd",{style:{fontFamily:"var(--font-code)",fontSize:10,color:"var(--txM)",background:"var(--cdBg)",padding:"2px 6px",borderRadius:2,border:"1px solid var(--bd)"},children:"ESC"})]}),H.length>0&&s.jsx("div",{style:{padding:6,maxHeight:f?"none":360,overflow:"auto",flex:f?1:void 0},children:H.map((G,me)=>s.jsxs("button",{onClick:()=>j(G.id),style:{display:"block",width:"100%",textAlign:"left",background:me===M?"var(--acD)":"none",border:"none",borderRadius:2,padding:"10px 14px",cursor:"pointer",color:"var(--tx)",fontFamily:"var(--font-body)"},onMouseEnter:()=>v(me),children:[s.jsx("div",{style:{fontWeight:500,fontSize:14,marginBottom:2},children:G.title}),G.excerpt&&s.jsx("div",{style:{fontSize:12,color:"var(--txM)",lineHeight:1.3},dangerouslySetInnerHTML:{__html:G.excerpt}})]},G.id+me))}),D&&!H.length&&s.jsx("div",{style:{padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"No results found"}),C===!1&&D&&H.length>0&&s.jsx("div",{style:{padding:"6px 18px 10px",fontSize:11,color:"var(--txM)",textAlign:"center"},children:"Showing title matches. Build your site for full-text search."})]})})}const Hc={name:"Tome",basePath:"/docs/",theme:{preset:"editorial",mode:"auto"},navigation:[{group:"Getting Started",pages:["index","quickstart","installation","project-structure"]},{group:"Core Concepts",pages:["configuration","pages-routing","components","theming"]},{group:"API Reference",pages:["api-overview","api-endpoints","api-auth"]},{group:"Advanced",pages:["guides/search","guides/versioning","concepts/architecture"]},{group:"CLI",pages:["cli"]}],search:{provider:"local"},toc:{enabled:!0,depth:3},strictLinks:!1,lastUpdated:!0,topNav:[{label:"Home",href:"/"},{label:"Dashboard",href:"/dashboard"}]},Ka=[{id:"api-auth",filePath:"api-auth.md",urlPath:"/api-auth",frontmatter:{title:"Authentication",description:"Configure API authentication for the interactive playground — Bearer tokens, API keys, and custom headers.",icon:"lock",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"api-endpoints",filePath:"api-endpoints.md",urlPath:"/api-endpoints",frontmatter:{title:"Endpoints",description:"How Tome renders API endpoints from your OpenAPI spec — methods, parameters, schemas, and the interactive playground.",icon:"globe",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"api-overview",filePath:"api-overview.md",urlPath:"/api-overview",frontmatter:{title:"Overview",description:"Generate interactive API documentation from OpenAPI specs with Tome.",icon:"code",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"cli",filePath:"cli.md",urlPath:"/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"components",filePath:"components.md",urlPath:"/components",frontmatter:{title:"Components",description:"Built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.",icon:"puzzle",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"concepts/architecture",filePath:"concepts/architecture.md",urlPath:"/concepts/architecture",frontmatter:{title:"Architecture",description:"How Tome works internally — the Vite plugin, virtual modules, build pipeline, and theme system.",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"concepts/file-routing",filePath:"concepts/file-routing.md",urlPath:"/concepts/file-routing",frontmatter:{title:"File-System Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"configuration",filePath:"configuration.md",urlPath:"/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"guides/api-reference",filePath:"guides/api-reference.md",urlPath:"/guides/api-reference",frontmatter:{title:"API Reference Setup",description:"How to generate an interactive API reference from an OpenAPI specification in Tome.",icon:"code",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"guides/configuration",filePath:"guides/configuration.md",urlPath:"/guides/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"guides/custom-theme",filePath:"guides/custom-theme.md",urlPath:"/guides/custom-theme",frontmatter:{title:"Custom Theme",description:"How to customize your Tome site's appearance — presets, accent colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"guides/search",filePath:"guides/search.md",urlPath:"/guides/search",frontmatter:{title:"Search",description:"How to set up search in your Tome documentation site — built-in Pagefind and optional Algolia DocSearch.",icon:"search",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"guides/versioning",filePath:"guides/versioning.md",urlPath:"/guides/versioning",frontmatter:{title:"Multi-Version Docs",description:"How to maintain multiple versions of your documentation with Tome's built-in versioning system.",icon:"layers",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"index",filePath:"index.md",urlPath:"/",frontmatter:{title:"Introduction",description:"Tome is an open-source documentation platform for Markdown and MDX. Beautiful docs without the $250/month price tag.",hidden:!1},isMdx:!1,lastUpdated:"2026-03-10T20:29:35-04:00"},{id:"installation",filePath:"installation.md",urlPath:"/installation",frontmatter:{title:"Installation",description:"System requirements and detailed installation instructions for Tome.",icon:"download",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"pages-routing",filePath:"pages-routing.md",urlPath:"/pages-routing",frontmatter:{title:"Pages & Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",icon:"map",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"project-structure",filePath:"project-structure.md",urlPath:"/project-structure",frontmatter:{title:"Project Structure",description:"How a Tome documentation project is organized — pages, config, entry point, and build output.",icon:"folder",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"quickstart",filePath:"quickstart.md",urlPath:"/quickstart",frontmatter:{title:"Quickstart",description:"Get a Tome documentation site running in under a minute.",icon:"zap",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"reference/cli",filePath:"reference/cli.md",urlPath:"/reference/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T13:40:20-04:00"},{id:"reference/components",filePath:"reference/components.md",urlPath:"/reference/components",frontmatter:{title:"Components",description:"Reference for all built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.",icon:"puzzle",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"reference/config",filePath:"reference/config.md",urlPath:"/reference/config",frontmatter:{title:"Config Reference",description:"Complete reference for every field in tome.config.js — types, defaults, and descriptions.",icon:"file-text",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"reference/frontmatter",filePath:"reference/frontmatter.md",urlPath:"/reference/frontmatter",frontmatter:{title:"Frontmatter",description:"Reference for all YAML frontmatter fields supported in Tome documentation pages.",icon:"file-text",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"reference/theme-presets",filePath:"reference/theme-presets.md",urlPath:"/reference/theme-presets",frontmatter:{title:"Theme Presets",description:"Detailed reference for Tome's built-in theme presets — color tokens, CSS variables, and font stacks.",icon:"swatches",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"theming",filePath:"theming.md",urlPath:"/theming",frontmatter:{title:"Theming",description:"Customize the look of your Tome site — presets, colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"},{id:"tutorials/deploy-to-cloud",filePath:"tutorials/deploy-to-cloud.md",urlPath:"/tutorials/deploy-to-cloud",frontmatter:{title:"Deploy to Tome Cloud",description:"Publish your documentation site to Tome Cloud with a single command. Includes custom domain setup.",icon:"cloud",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T13:40:20-04:00"},{id:"tutorials/first-site",filePath:"tutorials/first-site.md",urlPath:"/tutorials/first-site",frontmatter:{title:"Create Your First Site",description:"A step-by-step tutorial that walks you through creating a documentation site with Tome, from installation to running the dev server.",icon:"rocket",hidden:!1},isMdx:!1,lastUpdated:"2026-03-11T00:38:44-04:00"}],Fp=[{section:"Getting Started",pages:[{title:"Introduction",id:"index",urlPath:"/"},{title:"Quickstart",id:"quickstart",urlPath:"/quickstart",icon:"zap"},{title:"Installation",id:"installation",urlPath:"/installation",icon:"download"},{title:"Project Structure",id:"project-structure",urlPath:"/project-structure",icon:"folder"}]},{section:"Core Concepts",pages:[{title:"Configuration",id:"configuration",urlPath:"/configuration",icon:"gear"},{title:"Pages & Routing",id:"pages-routing",urlPath:"/pages-routing",icon:"map"},{title:"Components",id:"components",urlPath:"/components",icon:"puzzle"},{title:"Theming",id:"theming",urlPath:"/theming",icon:"palette"}]},{section:"API Reference",pages:[{title:"Overview",id:"api-overview",urlPath:"/api-overview",icon:"code"},{title:"Endpoints",id:"api-endpoints",urlPath:"/api-endpoints",icon:"globe"},{title:"Authentication",id:"api-auth",urlPath:"/api-auth",icon:"lock"}]},{section:"Advanced",pages:[{title:"Search",id:"guides/search",urlPath:"/guides/search",icon:"search"},{title:"Multi-Version Docs",id:"guides/versioning",urlPath:"/guides/versioning",icon:"layers"},{title:"Architecture",id:"concepts/architecture",urlPath:"/concepts/architecture"}]},{section:"CLI",pages:[{title:"CLI Reference",id:"cli",urlPath:"/cli",icon:"terminal"}]}],$p={"api-auth":()=>Ee(()=>import("./api-auth-iquypsJv.js"),[]),"api-endpoints":()=>Ee(()=>import("./api-endpoints-g3zD2Jzx.js"),[]),"api-overview":()=>Ee(()=>import("./api-overview-BppOPRNS.js"),[]),cli:()=>Ee(()=>import("./cli-Dp-POWJ4.js"),[]),components:()=>Ee(()=>import("./components-CRdpR1id.js"),[]),"concepts/architecture":()=>Ee(()=>import("./architecture-CtsvaR8y.js"),[]),"concepts/file-routing":()=>Ee(()=>import("./file-routing-CweRi1rb.js"),[]),configuration:()=>Ee(()=>import("./configuration-B3sMc8MF.js"),[]),"guides/api-reference":()=>Ee(()=>import("./api-reference-B97X_dIz.js"),[]),"guides/configuration":()=>Ee(()=>import("./configuration-Br9dBdZs.js"),[]),"guides/custom-theme":()=>Ee(()=>import("./custom-theme-C01Coe39.js"),[]),"guides/search":()=>Ee(()=>import("./search-G5_8Ofls.js"),[]),"guides/versioning":()=>Ee(()=>import("./versioning-C021AZ2p.js"),[]),index:()=>Ee(()=>import("./index-BNNn9igC.js"),[]),installation:()=>Ee(()=>import("./installation-s6uC7Eih.js"),[]),"pages-routing":()=>Ee(()=>import("./pages-routing-AtkGVzBQ.js"),[]),"project-structure":()=>Ee(()=>import("./project-structure-CSuYv1wC.js"),[]),quickstart:()=>Ee(()=>import("./quickstart-C5w7YpAz.js"),[]),"reference/cli":()=>Ee(()=>import("./cli-DHXW4gfw.js"),[]),"reference/components":()=>Ee(()=>import("./components-DgzCMmWu.js"),[]),"reference/config":()=>Ee(()=>import("./config-zDarjfAU.js"),[]),"reference/frontmatter":()=>Ee(()=>import("./frontmatter-T0RnHfcv.js"),[]),"reference/theme-presets":()=>Ee(()=>import("./theme-presets-B-Ez_Wsn.js"),[]),theming:()=>Ee(()=>import("./theming-BLhsk6un.js"),[]),"tutorials/deploy-to-cloud":()=>Ee(()=>import("./deploy-to-cloud-Df6P2YWO.js"),[]),"tutorials/first-site":()=>Ee(()=>import("./first-site-CVCwzQR7.js"),[])};function Ip(h){const j=$p[h];return j?j():Promise.resolve({default:null})}const Pp=[{id:"api-auth",title:"Authentication",content:`
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
`},{id:"reference/config",title:"Config Reference",content:'\nThe config file (`tome.config.js`, `.mjs`, or `.ts`) is validated at startup. Invalid values produce clear error messages with the field path and expected type.\n\n## Top-level fields\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `name` | `string` | `"My Docs"` | Site name shown in the header and browser tab |\n| `logo` | `string` | — | Path to logo image, relative to `public/` |\n| `favicon` | `string` | — | Path to favicon, relative to `public/` |\n| `baseUrl` | `string` | — | Full URL where the site is hosted (for analytics, canonical links) |\n| `basePath` | `string` | — | URL subpath prefix (e.g., `"/docs/"`) — sets Vite\'s `base` option |\n| `theme` | `ThemeConfig` | `{}` | Theme configuration (see below) |\n| `navigation` | `NavigationGroup[]` | `[]` | Sidebar navigation structure |\n| `topNav` | `TopNavItem[]'}],eg={Added:"#22c55e",Changed:"#3b82f6",Deprecated:"#f59e0b",Removed:"#ef4444",Fixed:"#8b5cf6",Security:"#f97316"};function Zd(h){return eg[h]||"#6b7280"}function tg({entries:h,initialLimit:j}){const[S,f]=X.useState(!j),D=S?h:h.slice(0,j||h.length);return h.length===0?s.jsx("div",{"data-testid":"changelog-empty",style:{padding:"40px 0",textAlign:"center",color:"var(--txM)",fontSize:14},children:"No changelog entries found."}):s.jsxs("div",{"data-testid":"changelog-timeline",style:{position:"relative"},children:[s.jsx("div",{style:{position:"absolute",left:15,top:8,bottom:8,width:2,background:"var(--bd)"}}),D.map((R,H)=>s.jsxs("div",{"data-testid":`changelog-entry-${R.version}`,style:{position:"relative",paddingLeft:44,paddingBottom:H<D.length-1?32:0},children:[s.jsx("div",{style:{position:"absolute",left:8,top:6,width:16,height:16,borderRadius:"50%",background:R.version==="Unreleased"?"var(--txM)":"var(--ac)",border:"3px solid var(--bg, #1a1a1a)"}}),s.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:12,marginBottom:12},children:[s.jsx("span",{style:{fontSize:18,fontWeight:700,color:"var(--tx)",fontFamily:"var(--font-heading, inherit)"},children:R.url?s.jsx("a",{href:R.url,target:"_blank",rel:"noopener noreferrer",style:{color:"inherit",textDecoration:"none"},children:R.version}):R.version}),R.date&&s.jsx("span",{style:{fontSize:13,color:"var(--txM)",fontFamily:"var(--font-code, monospace)"},children:R.date})]}),R.sections.map(N=>s.jsxs("div",{style:{marginBottom:16},children:[s.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,marginBottom:8},children:[s.jsx("span",{style:{display:"inline-block",width:8,height:8,borderRadius:"50%",background:Zd(N.type)}}),s.jsx("span",{style:{fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em",color:Zd(N.type),fontFamily:"var(--font-code, monospace)"},children:N.type})]}),s.jsx("ul",{style:{margin:0,paddingLeft:18,listStyleType:"disc",color:"var(--tx2)"},children:N.items.map((M,v)=>s.jsx("li",{style:{fontSize:14,lineHeight:1.7,color:"var(--tx2)",marginBottom:2},children:M},v))})]},N.type))]},R.version)),!S&&h.length>(j||0)&&s.jsx("div",{style:{textAlign:"center",marginTop:24},children:s.jsxs("button",{"data-testid":"changelog-show-more",onClick:()=>f(!0),style:{background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"8px 20px",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body, inherit)",cursor:"pointer",transition:"border-color .15s, color .15s"},children:["Show all ",h.length," releases"]})})]})}const kd={info:{color:"#3b82f6",label:"INFO"},warning:{color:"#f59e0b",label:"WARNING"},tip:{color:"var(--ac, #a78bfa)",label:"TIP"},danger:{color:"#ef4444",label:"DANGER"}};function ng({type:h="info",title:j,children:S}){const f=kd[h]||kd.info;return s.jsxs("div",{style:{borderLeft:`3px solid ${f.color}`,background:`${f.color}11`,borderRadius:"0 2px 2px 0",padding:"14px 18px",marginBottom:20},children:[j?s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4},children:[s.jsx("span",{style:{fontWeight:700,fontSize:10,letterSpacing:".08em",color:f.color,fontFamily:"var(--font-code, monospace)"},children:f.label}),s.jsx("span",{style:{fontWeight:600,fontSize:13,color:f.color},children:j})]}):s.jsx("div",{style:{marginBottom:4},children:s.jsx("span",{style:{fontWeight:700,fontSize:10,letterSpacing:".08em",color:f.color,fontFamily:"var(--font-code, monospace)"},children:f.label})}),s.jsx("div",{style:{fontSize:14,lineHeight:1.65,color:"var(--tx2)"},children:S})]})}function ag({items:h,children:j}){const[S,f]=X.useState(0);return s.jsxs("div",{style:{marginBottom:20},children:[s.jsx("div",{style:{display:"flex",gap:0,borderBottom:"1px solid var(--bd)"},children:h.map((D,R)=>s.jsx("button",{onClick:()=>f(R),style:{padding:"8px 16px",background:"none",border:"none",borderBottom:S===R?"2px solid var(--ac)":"2px solid transparent",color:S===R?"var(--ac)":"var(--txM)",fontWeight:S===R?600:400,fontSize:13,cursor:"pointer",fontFamily:"inherit"},children:D},R))}),s.jsx("div",{style:{padding:"16px 0"},children:j[S]})]})}function lg({title:h,icon:j,href:S,children:f}){const D=s.jsxs("div",{style:{border:"1px solid var(--bd)",borderRadius:2,padding:"20px",transition:"border-color 0.15s",cursor:S?"pointer":"default"},children:[j&&s.jsx("span",{style:{fontSize:24,marginBottom:8,display:"block"},children:j}),s.jsx("div",{style:{fontWeight:600,fontSize:14,marginBottom:4},children:h}),f&&s.jsx("div",{style:{fontSize:13,color:"var(--txM)",lineHeight:1.5},children:f})]});return S?s.jsx("a",{href:S,style:{textDecoration:"none",color:"inherit"},children:D}):D}function ig({cols:h=2,children:j}){return s.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${h}, 1fr)`,gap:12,marginBottom:20},children:j})}function ug({children:h}){return s.jsx("div",{style:{paddingLeft:24,borderLeft:"2px solid var(--bd)",marginBottom:20},children:dp.Children.map(h,(j,S)=>s.jsxs("div",{style:{position:"relative",paddingBottom:20},children:[s.jsx("div",{style:{position:"absolute",left:-33,top:0,width:20,height:20,borderRadius:"50%",background:"var(--ac)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700},children:S+1}),s.jsx("div",{style:{paddingLeft:8},children:j})]}))})}function og({title:h,children:j}){const[S,f]=X.useState(!1);return s.jsxs("div",{style:{border:"1px solid var(--bd)",borderRadius:2,marginBottom:8,overflow:"hidden"},children:[s.jsxs("button",{onClick:()=>f(!S),style:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"12px 16px",background:"var(--sf)",border:"none",cursor:"pointer",fontWeight:500,fontSize:14,color:"var(--tx)",fontFamily:"inherit"},children:[h,s.jsx("span",{style:{transform:S?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"},children:"▾"})]}),S&&s.jsx("div",{style:{padding:"12px 16px",borderTop:"1px solid var(--bd)",fontSize:14,color:"var(--tx2)",lineHeight:1.65},children:j})]})}const cg={Callout:ng,Tabs:ag,Card:lg,CardGroup:ig,Steps:ug,Accordion:og,ChangelogTimeline:tg},sg=`
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

  /* Mobile responsive content */
  @media (max-width: 767px) {
    .tome-content h2 { font-size: 1.2em; margin-top: 1.5em; }
    .tome-content h3 { font-size: 1.05em; }
    .tome-content pre code { font-size: 12px; padding: 0.8em 1em; }
    .tome-content table { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .tome-content blockquote { margin: 0.8em 0; }
  }

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

  /* Light mode: darken low-contrast github-light tokens for WCAG AA on --cdBg backgrounds */
  html:not(.dark) .shiki span[style*="color:#6A737D"] { color: #57606a !important; }
  html:not(.dark) .shiki span[style*="color:#E36209"] { color: #b35405 !important; }
  html:not(.dark) .shiki span[style*="color:#6F42C1"] { color: #5a32a3 !important; }
  html:not(.dark) .shiki span[style*="color:#22863A"] { color: #1a6e2e !important; }
  html:not(.dark) .shiki span[style*="color:#D73A49"] { color: #b62324 !important; }
  html:not(.dark) .shiki span[style*="color:#005CC5"] { color: #0349b4 !important; }
`;async function rg(h){try{const j=Ka.find(f=>f.id===h),S=await Ip(h);return j!=null&&j.isMdx&&S.meta?{isMdx:!0,component:S.default,frontmatter:S.meta.frontmatter,headings:S.meta.headings}:S.default?S.isChangelog&&S.changelogEntries?{isMdx:!1,...S.default,changelogEntries:S.changelogEntries}:{isMdx:!1,...S.default}:null}catch(j){return console.error(`Failed to load page: ${h}`,j),null}}function fg(){const[h,j]=X.useState(()=>{var O;const C=window.location.hash.slice(1);return C&&Ka.some(V=>V.id===C)?C:((O=Ka[0])==null?void 0:O.id)||"index"}),[S,f]=X.useState(null),[D,R]=X.useState(!0),H=X.useCallback(async C=>{R(!0),j(C),window.location.hash=C;const O=await rg(C);f(O),R(!1)},[]);X.useEffect(()=>{H(h)},[]),X.useEffect(()=>{const C=()=>{const O=window.location.hash.slice(1);O&&O!==h&&Ka.some(V=>V.id===O)&&H(O)};return window.addEventListener("hashchange",C),()=>window.removeEventListener("hashchange",C)},[h,H]);const N=Ka.map(C=>({id:C.id,title:C.frontmatter.title,description:C.frontmatter.description})),M=Ka.find(C=>C.id===h);let v;if(Hc.editLink&&(M!=null&&M.filePath)){const{repo:C,branch:O="main",dir:V=""}=Hc.editLink,le=V?`${V.replace(/\/$/,"")}/`:"";v=`https://github.com/${C}/edit/${O}/${le}${M.filePath}`}return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:sg}),s.jsx(Jp,{config:Hc,navigation:Fp,currentPageId:h,pageHtml:S!=null&&S.isMdx?void 0:D?"<p>Loading...</p>":(S==null?void 0:S.html)||"<p>Page not found</p>",pageComponent:S!=null&&S.isMdx?S.component:void 0,mdxComponents:cg,pageTitle:(S==null?void 0:S.frontmatter.title)||(D?"Loading...":"Not Found"),pageDescription:S==null?void 0:S.frontmatter.description,headings:(S==null?void 0:S.headings)||[],tocEnabled:(S==null?void 0:S.frontmatter.toc)!==!1,editUrl:v,lastUpdated:M==null?void 0:M.lastUpdated,changelogEntries:S!=null&&S.isMdx||S==null?void 0:S.changelogEntries,onNavigate:H,allPages:N,docContext:Pp})]})}const Kd=document.getElementById("tome-root");Kd&&bp.createRoot(Kd).render(s.jsx(fg,{}));export{X as a,dp as e,gp as r};
