(function(){const z=document.createElement("link").relList;if(z&&z.supports&&z.supports("modulepreload"))return;for(const E of document.querySelectorAll('link[rel="modulepreload"]'))s(E);new MutationObserver(E=>{for(const O of E)if(O.type==="childList")for(const R of O.addedNodes)R.tagName==="LINK"&&R.rel==="modulepreload"&&s(R)}).observe(document,{childList:!0,subtree:!0});function y(E){const O={};return E.integrity&&(O.integrity=E.integrity),E.referrerPolicy&&(O.referrerPolicy=E.referrerPolicy),E.crossOrigin==="use-credentials"?O.credentials="include":E.crossOrigin==="anonymous"?O.credentials="omit":O.credentials="same-origin",O}function s(E){if(E.ep)return;E.ep=!0;const O=y(E);fetch(E.href,O)}})();function pp(d){return d&&d.__esModule&&Object.prototype.hasOwnProperty.call(d,"default")?d.default:d}var qr={exports:{}},$l={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qf;function gp(){if(qf)return $l;qf=1;var d=Symbol.for("react.transitional.element"),z=Symbol.for("react.fragment");function y(s,E,O){var R=null;if(O!==void 0&&(R=""+O),E.key!==void 0&&(R=""+E.key),"key"in E){O={};for(var U in E)U!=="key"&&(O[U]=E[U])}else O=E;return E=O.ref,{$$typeof:d,type:s,key:R,ref:E!==void 0?E:null,props:O}}return $l.Fragment=z,$l.jsx=y,$l.jsxs=y,$l}var Hf;function vp(){return Hf||(Hf=1,qr.exports=gp()),qr.exports}var r=vp(),Hr={exports:{}},ee={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lf;function yp(){if(Lf)return ee;Lf=1;var d=Symbol.for("react.transitional.element"),z=Symbol.for("react.portal"),y=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),E=Symbol.for("react.profiler"),O=Symbol.for("react.consumer"),R=Symbol.for("react.context"),U=Symbol.for("react.forward_ref"),D=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),X=Symbol.for("react.lazy"),C=Symbol.for("react.activity"),I=Symbol.iterator;function $(m){return m===null||typeof m!="object"?null:(m=I&&m[I]||m["@@iterator"],typeof m=="function"?m:null)}var V={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},H=Object.assign,ue={};function L(m,j,B){this.props=m,this.context=j,this.refs=ue,this.updater=B||V}L.prototype.isReactComponent={},L.prototype.setState=function(m,j){if(typeof m!="object"&&typeof m!="function"&&m!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,m,j,"setState")},L.prototype.forceUpdate=function(m){this.updater.enqueueForceUpdate(this,m,"forceUpdate")};function ie(){}ie.prototype=L.prototype;function re(m,j,B){this.props=m,this.context=j,this.refs=ue,this.updater=B||V}var J=re.prototype=new ie;J.constructor=re,H(J,L.prototype),J.isPureReactComponent=!0;var Se=Array.isArray;function ge(){}var K={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function lt(m,j,B){var k=B.ref;return{$$typeof:d,type:m,key:j,ref:k!==void 0?k:null,props:B}}function it(m,j){return lt(m.type,j,m.props)}function ot(m){return typeof m=="object"&&m!==null&&m.$$typeof===d}function We(m){var j={"=":"=0",":":"=2"};return"$"+m.replace(/[=:]/g,function(B){return j[B]})}var ut=/\/+/g;function Bt(m,j){return typeof m=="object"&&m!==null&&m.key!=null?We(""+m.key):j.toString(36)}function ct(m){switch(m.status){case"fulfilled":return m.value;case"rejected":throw m.reason;default:switch(typeof m.status=="string"?m.then(ge,ge):(m.status="pending",m.then(function(j){m.status==="pending"&&(m.status="fulfilled",m.value=j)},function(j){m.status==="pending"&&(m.status="rejected",m.reason=j)})),m.status){case"fulfilled":return m.value;case"rejected":throw m.reason}}throw m}function A(m,j,B,k,P){var oe=typeof m;(oe==="undefined"||oe==="boolean")&&(m=null);var ce=!1;if(m===null)ce=!0;else switch(oe){case"bigint":case"string":case"number":ce=!0;break;case"object":switch(m.$$typeof){case d:case z:ce=!0;break;case X:return ce=m._init,A(ce(m._payload),j,B,k,P)}}if(ce)return P=P(m),ce=k===""?"."+Bt(m,0):k,Se(P)?(B="",ce!=null&&(B=ce.replace(ut,"$&/")+"/"),A(P,j,B,"",function(Nn){return Nn})):P!=null&&(ot(P)&&(P=it(P,B+(P.key==null||m&&m.key===P.key?"":(""+P.key).replace(ut,"$&/")+"/")+ce)),j.push(P)),1;ce=0;var Qe=k===""?".":k+":";if(Se(m))for(var we=0;we<m.length;we++)k=m[we],oe=Qe+Bt(k,we),ce+=A(k,j,B,oe,P);else if(we=$(m),typeof we=="function")for(m=we.call(m),we=0;!(k=m.next()).done;)k=k.value,oe=Qe+Bt(k,we++),ce+=A(k,j,B,oe,P);else if(oe==="object"){if(typeof m.then=="function")return A(ct(m),j,B,k,P);throw j=String(m),Error("Objects are not valid as a React child (found: "+(j==="[object Object]"?"object with keys {"+Object.keys(m).join(", ")+"}":j)+"). If you meant to render a collection of children, use an array instead.")}return ce}function w(m,j,B){if(m==null)return m;var k=[],P=0;return A(m,k,"","",function(oe){return j.call(B,oe,P++)}),k}function F(m){if(m._status===-1){var j=m._result;j=j(),j.then(function(B){(m._status===0||m._status===-1)&&(m._status=1,m._result=B)},function(B){(m._status===0||m._status===-1)&&(m._status=2,m._result=B)}),m._status===-1&&(m._status=0,m._result=j)}if(m._status===1)return m._result.default;throw m._result}var ve=typeof reportError=="function"?reportError:function(m){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var j=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof m=="object"&&m!==null&&typeof m.message=="string"?String(m.message):String(m),error:m});if(!window.dispatchEvent(j))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",m);return}console.error(m)},Te={map:w,forEach:function(m,j,B){w(m,function(){j.apply(this,arguments)},B)},count:function(m){var j=0;return w(m,function(){j++}),j},toArray:function(m){return w(m,function(j){return j})||[]},only:function(m){if(!ot(m))throw Error("React.Children.only expected to receive a single React element child.");return m}};return ee.Activity=C,ee.Children=Te,ee.Component=L,ee.Fragment=y,ee.Profiler=E,ee.PureComponent=re,ee.StrictMode=s,ee.Suspense=D,ee.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=K,ee.__COMPILER_RUNTIME={__proto__:null,c:function(m){return K.H.useMemoCache(m)}},ee.cache=function(m){return function(){return m.apply(null,arguments)}},ee.cacheSignal=function(){return null},ee.cloneElement=function(m,j,B){if(m==null)throw Error("The argument must be a React element, but you passed "+m+".");var k=H({},m.props),P=m.key;if(j!=null)for(oe in j.key!==void 0&&(P=""+j.key),j)!te.call(j,oe)||oe==="key"||oe==="__self"||oe==="__source"||oe==="ref"&&j.ref===void 0||(k[oe]=j[oe]);var oe=arguments.length-2;if(oe===1)k.children=B;else if(1<oe){for(var ce=Array(oe),Qe=0;Qe<oe;Qe++)ce[Qe]=arguments[Qe+2];k.children=ce}return lt(m.type,P,k)},ee.createContext=function(m){return m={$$typeof:R,_currentValue:m,_currentValue2:m,_threadCount:0,Provider:null,Consumer:null},m.Provider=m,m.Consumer={$$typeof:O,_context:m},m},ee.createElement=function(m,j,B){var k,P={},oe=null;if(j!=null)for(k in j.key!==void 0&&(oe=""+j.key),j)te.call(j,k)&&k!=="key"&&k!=="__self"&&k!=="__source"&&(P[k]=j[k]);var ce=arguments.length-2;if(ce===1)P.children=B;else if(1<ce){for(var Qe=Array(ce),we=0;we<ce;we++)Qe[we]=arguments[we+2];P.children=Qe}if(m&&m.defaultProps)for(k in ce=m.defaultProps,ce)P[k]===void 0&&(P[k]=ce[k]);return lt(m,oe,P)},ee.createRef=function(){return{current:null}},ee.forwardRef=function(m){return{$$typeof:U,render:m}},ee.isValidElement=ot,ee.lazy=function(m){return{$$typeof:X,_payload:{_status:-1,_result:m},_init:F}},ee.memo=function(m,j){return{$$typeof:x,type:m,compare:j===void 0?null:j}},ee.startTransition=function(m){var j=K.T,B={};K.T=B;try{var k=m(),P=K.S;P!==null&&P(B,k),typeof k=="object"&&k!==null&&typeof k.then=="function"&&k.then(ge,ve)}catch(oe){ve(oe)}finally{j!==null&&B.types!==null&&(j.types=B.types),K.T=j}},ee.unstable_useCacheRefresh=function(){return K.H.useCacheRefresh()},ee.use=function(m){return K.H.use(m)},ee.useActionState=function(m,j,B){return K.H.useActionState(m,j,B)},ee.useCallback=function(m,j){return K.H.useCallback(m,j)},ee.useContext=function(m){return K.H.useContext(m)},ee.useDebugValue=function(){},ee.useDeferredValue=function(m,j){return K.H.useDeferredValue(m,j)},ee.useEffect=function(m,j){return K.H.useEffect(m,j)},ee.useEffectEvent=function(m){return K.H.useEffectEvent(m)},ee.useId=function(){return K.H.useId()},ee.useImperativeHandle=function(m,j,B){return K.H.useImperativeHandle(m,j,B)},ee.useInsertionEffect=function(m,j){return K.H.useInsertionEffect(m,j)},ee.useLayoutEffect=function(m,j){return K.H.useLayoutEffect(m,j)},ee.useMemo=function(m,j){return K.H.useMemo(m,j)},ee.useOptimistic=function(m,j){return K.H.useOptimistic(m,j)},ee.useReducer=function(m,j,B){return K.H.useReducer(m,j,B)},ee.useRef=function(m){return K.H.useRef(m)},ee.useState=function(m){return K.H.useState(m)},ee.useSyncExternalStore=function(m,j,B){return K.H.useSyncExternalStore(m,j,B)},ee.useTransition=function(){return K.H.useTransition()},ee.version="19.2.4",ee}var Nf;function Vr(){return Nf||(Nf=1,Hr.exports=yp()),Hr.exports}var q=Vr();const bp=pp(q);var Lr={exports:{}},Pl={},Nr={exports:{}},kr={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kf;function xp(){return kf||(kf=1,(function(d){function z(A,w){var F=A.length;A.push(w);e:for(;0<F;){var ve=F-1>>>1,Te=A[ve];if(0<E(Te,w))A[ve]=w,A[F]=Te,F=ve;else break e}}function y(A){return A.length===0?null:A[0]}function s(A){if(A.length===0)return null;var w=A[0],F=A.pop();if(F!==w){A[0]=F;e:for(var ve=0,Te=A.length,m=Te>>>1;ve<m;){var j=2*(ve+1)-1,B=A[j],k=j+1,P=A[k];if(0>E(B,F))k<Te&&0>E(P,B)?(A[ve]=P,A[k]=F,ve=k):(A[ve]=B,A[j]=F,ve=j);else if(k<Te&&0>E(P,F))A[ve]=P,A[k]=F,ve=k;else break e}}return w}function E(A,w){var F=A.sortIndex-w.sortIndex;return F!==0?F:A.id-w.id}if(d.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var O=performance;d.unstable_now=function(){return O.now()}}else{var R=Date,U=R.now();d.unstable_now=function(){return R.now()-U}}var D=[],x=[],X=1,C=null,I=3,$=!1,V=!1,H=!1,ue=!1,L=typeof setTimeout=="function"?setTimeout:null,ie=typeof clearTimeout=="function"?clearTimeout:null,re=typeof setImmediate<"u"?setImmediate:null;function J(A){for(var w=y(x);w!==null;){if(w.callback===null)s(x);else if(w.startTime<=A)s(x),w.sortIndex=w.expirationTime,z(D,w);else break;w=y(x)}}function Se(A){if(H=!1,J(A),!V)if(y(D)!==null)V=!0,ge||(ge=!0,We());else{var w=y(x);w!==null&&ct(Se,w.startTime-A)}}var ge=!1,K=-1,te=5,lt=-1;function it(){return ue?!0:!(d.unstable_now()-lt<te)}function ot(){if(ue=!1,ge){var A=d.unstable_now();lt=A;var w=!0;try{e:{V=!1,H&&(H=!1,ie(K),K=-1),$=!0;var F=I;try{t:{for(J(A),C=y(D);C!==null&&!(C.expirationTime>A&&it());){var ve=C.callback;if(typeof ve=="function"){C.callback=null,I=C.priorityLevel;var Te=ve(C.expirationTime<=A);if(A=d.unstable_now(),typeof Te=="function"){C.callback=Te,J(A),w=!0;break t}C===y(D)&&s(D),J(A)}else s(D);C=y(D)}if(C!==null)w=!0;else{var m=y(x);m!==null&&ct(Se,m.startTime-A),w=!1}}break e}finally{C=null,I=F,$=!1}w=void 0}}finally{w?We():ge=!1}}}var We;if(typeof re=="function")We=function(){re(ot)};else if(typeof MessageChannel<"u"){var ut=new MessageChannel,Bt=ut.port2;ut.port1.onmessage=ot,We=function(){Bt.postMessage(null)}}else We=function(){L(ot,0)};function ct(A,w){K=L(function(){A(d.unstable_now())},w)}d.unstable_IdlePriority=5,d.unstable_ImmediatePriority=1,d.unstable_LowPriority=4,d.unstable_NormalPriority=3,d.unstable_Profiling=null,d.unstable_UserBlockingPriority=2,d.unstable_cancelCallback=function(A){A.callback=null},d.unstable_forceFrameRate=function(A){0>A||125<A?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):te=0<A?Math.floor(1e3/A):5},d.unstable_getCurrentPriorityLevel=function(){return I},d.unstable_next=function(A){switch(I){case 1:case 2:case 3:var w=3;break;default:w=I}var F=I;I=w;try{return A()}finally{I=F}},d.unstable_requestPaint=function(){ue=!0},d.unstable_runWithPriority=function(A,w){switch(A){case 1:case 2:case 3:case 4:case 5:break;default:A=3}var F=I;I=A;try{return w()}finally{I=F}},d.unstable_scheduleCallback=function(A,w,F){var ve=d.unstable_now();switch(typeof F=="object"&&F!==null?(F=F.delay,F=typeof F=="number"&&0<F?ve+F:ve):F=ve,A){case 1:var Te=-1;break;case 2:Te=250;break;case 5:Te=1073741823;break;case 4:Te=1e4;break;default:Te=5e3}return Te=F+Te,A={id:X++,callback:w,priorityLevel:A,startTime:F,expirationTime:Te,sortIndex:-1},F>ve?(A.sortIndex=F,z(x,A),y(D)===null&&A===y(x)&&(H?(ie(K),K=-1):H=!0,ct(Se,F-ve))):(A.sortIndex=Te,z(D,A),V||$||(V=!0,ge||(ge=!0,We()))),A},d.unstable_shouldYield=it,d.unstable_wrapCallback=function(A){var w=I;return function(){var F=I;I=w;try{return A.apply(this,arguments)}finally{I=F}}}})(kr)),kr}var Gf;function Sp(){return Gf||(Gf=1,Nr.exports=xp()),Nr.exports}var Gr={exports:{}},at={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yf;function Tp(){if(Yf)return at;Yf=1;var d=Vr();function z(D){var x="https://react.dev/errors/"+D;if(1<arguments.length){x+="?args[]="+encodeURIComponent(arguments[1]);for(var X=2;X<arguments.length;X++)x+="&args[]="+encodeURIComponent(arguments[X])}return"Minified React error #"+D+"; visit "+x+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function y(){}var s={d:{f:y,r:function(){throw Error(z(522))},D:y,C:y,L:y,m:y,X:y,S:y,M:y},p:0,findDOMNode:null},E=Symbol.for("react.portal");function O(D,x,X){var C=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:E,key:C==null?null:""+C,children:D,containerInfo:x,implementation:X}}var R=d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function U(D,x){if(D==="font")return"";if(typeof x=="string")return x==="use-credentials"?x:""}return at.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,at.createPortal=function(D,x){var X=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!x||x.nodeType!==1&&x.nodeType!==9&&x.nodeType!==11)throw Error(z(299));return O(D,x,null,X)},at.flushSync=function(D){var x=R.T,X=s.p;try{if(R.T=null,s.p=2,D)return D()}finally{R.T=x,s.p=X,s.d.f()}},at.preconnect=function(D,x){typeof D=="string"&&(x?(x=x.crossOrigin,x=typeof x=="string"?x==="use-credentials"?x:"":void 0):x=null,s.d.C(D,x))},at.prefetchDNS=function(D){typeof D=="string"&&s.d.D(D)},at.preinit=function(D,x){if(typeof D=="string"&&x&&typeof x.as=="string"){var X=x.as,C=U(X,x.crossOrigin),I=typeof x.integrity=="string"?x.integrity:void 0,$=typeof x.fetchPriority=="string"?x.fetchPriority:void 0;X==="style"?s.d.S(D,typeof x.precedence=="string"?x.precedence:void 0,{crossOrigin:C,integrity:I,fetchPriority:$}):X==="script"&&s.d.X(D,{crossOrigin:C,integrity:I,fetchPriority:$,nonce:typeof x.nonce=="string"?x.nonce:void 0})}},at.preinitModule=function(D,x){if(typeof D=="string")if(typeof x=="object"&&x!==null){if(x.as==null||x.as==="script"){var X=U(x.as,x.crossOrigin);s.d.M(D,{crossOrigin:X,integrity:typeof x.integrity=="string"?x.integrity:void 0,nonce:typeof x.nonce=="string"?x.nonce:void 0})}}else x==null&&s.d.M(D)},at.preload=function(D,x){if(typeof D=="string"&&typeof x=="object"&&x!==null&&typeof x.as=="string"){var X=x.as,C=U(X,x.crossOrigin);s.d.L(D,X,{crossOrigin:C,integrity:typeof x.integrity=="string"?x.integrity:void 0,nonce:typeof x.nonce=="string"?x.nonce:void 0,type:typeof x.type=="string"?x.type:void 0,fetchPriority:typeof x.fetchPriority=="string"?x.fetchPriority:void 0,referrerPolicy:typeof x.referrerPolicy=="string"?x.referrerPolicy:void 0,imageSrcSet:typeof x.imageSrcSet=="string"?x.imageSrcSet:void 0,imageSizes:typeof x.imageSizes=="string"?x.imageSizes:void 0,media:typeof x.media=="string"?x.media:void 0})}},at.preloadModule=function(D,x){if(typeof D=="string")if(x){var X=U(x.as,x.crossOrigin);s.d.m(D,{as:typeof x.as=="string"&&x.as!=="script"?x.as:void 0,crossOrigin:X,integrity:typeof x.integrity=="string"?x.integrity:void 0})}else s.d.m(D)},at.requestFormReset=function(D){s.d.r(D)},at.unstable_batchedUpdates=function(D,x){return D(x)},at.useFormState=function(D,x,X){return R.H.useFormState(D,x,X)},at.useFormStatus=function(){return R.H.useHostTransitionStatus()},at.version="19.2.4",at}var Vf;function Ap(){if(Vf)return Gr.exports;Vf=1;function d(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(d)}catch(z){console.error(z)}}return d(),Gr.exports=Tp(),Gr.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xf;function Ep(){if(Xf)return Pl;Xf=1;var d=Sp(),z=Vr(),y=Ap();function s(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function E(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function O(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function R(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function U(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function D(e){if(O(e)!==e)throw Error(s(188))}function x(e){var t=e.alternate;if(!t){if(t=O(e),t===null)throw Error(s(188));return t!==e?null:e}for(var n=e,a=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return D(l),e;if(i===a)return D(l),t;i=i.sibling}throw Error(s(188))}if(n.return!==a.return)n=l,a=i;else{for(var o=!1,u=l.child;u;){if(u===n){o=!0,n=l,a=i;break}if(u===a){o=!0,a=l,n=i;break}u=u.sibling}if(!o){for(u=i.child;u;){if(u===n){o=!0,n=i,a=l;break}if(u===a){o=!0,a=i,n=l;break}u=u.sibling}if(!o)throw Error(s(189))}}if(n.alternate!==a)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?e:t}function X(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=X(e),t!==null)return t;e=e.sibling}return null}var C=Object.assign,I=Symbol.for("react.element"),$=Symbol.for("react.transitional.element"),V=Symbol.for("react.portal"),H=Symbol.for("react.fragment"),ue=Symbol.for("react.strict_mode"),L=Symbol.for("react.profiler"),ie=Symbol.for("react.consumer"),re=Symbol.for("react.context"),J=Symbol.for("react.forward_ref"),Se=Symbol.for("react.suspense"),ge=Symbol.for("react.suspense_list"),K=Symbol.for("react.memo"),te=Symbol.for("react.lazy"),lt=Symbol.for("react.activity"),it=Symbol.for("react.memo_cache_sentinel"),ot=Symbol.iterator;function We(e){return e===null||typeof e!="object"?null:(e=ot&&e[ot]||e["@@iterator"],typeof e=="function"?e:null)}var ut=Symbol.for("react.client.reference");function Bt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ut?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case H:return"Fragment";case L:return"Profiler";case ue:return"StrictMode";case Se:return"Suspense";case ge:return"SuspenseList";case lt:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case V:return"Portal";case re:return e.displayName||"Context";case ie:return(e._context.displayName||"Context")+".Consumer";case J:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case K:return t=e.displayName||null,t!==null?t:Bt(e.type)||"Memo";case te:t=e._payload,e=e._init;try{return Bt(e(t))}catch{}}return null}var ct=Array.isArray,A=z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,w=y.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F={pending:!1,data:null,method:null,action:null},ve=[],Te=-1;function m(e){return{current:e}}function j(e){0>Te||(e.current=ve[Te],ve[Te]=null,Te--)}function B(e,t){Te++,ve[Te]=e.current,e.current=t}var k=m(null),P=m(null),oe=m(null),ce=m(null);function Qe(e,t){switch(B(oe,t),B(P,e),B(k,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?lf(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=lf(t),e=of(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}j(k),B(k,e)}function we(){j(k),j(P),j(oe)}function Nn(e){e.memoizedState!==null&&B(ce,e);var t=k.current,n=of(t,e.type);t!==n&&(B(P,e),B(k,n))}function fa(e){P.current===e&&(j(k),j(P)),ce.current===e&&(j(ce),Jl._currentValue=F)}var ma,el;function Nt(e){if(ma===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ma=t&&t[1]||"",el=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ma+e+el}var Ke=!1;function kn(e,t){if(!e||Ke)return"";Ke=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var M=function(){throw Error()};if(Object.defineProperty(M.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(M,[])}catch(S){var v=S}Reflect.construct(e,[],M)}else{try{M.call()}catch(S){v=S}e.call(M.prototype)}}else{try{throw Error()}catch(S){v=S}(M=e())&&typeof M.catch=="function"&&M.catch(function(){})}}catch(S){if(S&&v&&typeof S.stack=="string")return[S.stack,v.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),o=i[0],u=i[1];if(o&&u){var c=o.split(`
`),g=u.split(`
`);for(l=a=0;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;for(;l<g.length&&!g[l].includes("DetermineComponentFrameRoot");)l++;if(a===c.length||l===g.length)for(a=c.length-1,l=g.length-1;1<=a&&0<=l&&c[a]!==g[l];)l--;for(;1<=a&&0<=l;a--,l--)if(c[a]!==g[l]){if(a!==1||l!==1)do if(a--,l--,0>l||c[a]!==g[l]){var T=`
`+c[a].replace(" at new "," at ");return e.displayName&&T.includes("<anonymous>")&&(T=T.replace("<anonymous>",e.displayName)),T}while(1<=a&&0<=l);break}}}finally{Ke=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Nt(n):""}function tl(e,t){switch(e.tag){case 26:case 27:case 5:return Nt(e.type);case 16:return Nt("Lazy");case 13:return e.child!==t&&t!==null?Nt("Suspense Fallback"):Nt("Suspense");case 19:return Nt("SuspenseList");case 0:case 15:return kn(e.type,!1);case 11:return kn(e.type.render,!1);case 1:return kn(e.type,!0);case 31:return Nt("Activity");default:return""}}function Qt(e){try{var t="",n=null;do t+=tl(e,n),n=e,e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var nl=Object.prototype.hasOwnProperty,ei=d.unstable_scheduleCallback,Gn=d.unstable_cancelCallback,Yn=d.unstable_shouldYield,Eo=d.unstable_requestPaint,Ie=d.unstable_now,al=d.unstable_getCurrentPriorityLevel,ti=d.unstable_ImmediatePriority,Vn=d.unstable_UserBlockingPriority,Zt=d.unstable_NormalPriority,ll=d.unstable_LowPriority,ha=d.unstable_IdlePriority,_o=d.log,Mo=d.unstable_setDisableYieldValue,fn=null,qe=null;function Et(e){if(typeof _o=="function"&&Mo(e),qe&&typeof qe.setStrictMode=="function")try{qe.setStrictMode(fn,e)}catch{}}var nt=Math.clz32?Math.clz32:li,ni=Math.log,ai=Math.LN2;function li(e){return e>>>=0,e===0?32:31-(ni(e)/ai|0)|0}var Xn=256,Qn=262144,Zn=4194304;function kt(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Kn(e,t,n){var a=e.pendingLanes;if(a===0)return 0;var l=0,i=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var u=a&134217727;return u!==0?(a=u&~i,a!==0?l=kt(a):(o&=u,o!==0?l=kt(o):n||(n=u&~e,n!==0&&(l=kt(n))))):(u=a&~i,u!==0?l=kt(u):o!==0?l=kt(o):n||(n=a&~e,n!==0&&(l=kt(n)))),l===0?0:t!==0&&t!==l&&(t&i)===0&&(i=l&-l,n=t&-t,i>=n||i===32&&(n&4194048)!==0)?t:l}function mn(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function ii(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function il(){var e=Zn;return Zn<<=1,(Zn&62914560)===0&&(Zn=4194304),e}function pa(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function hn(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function oi(e,t,n,a,l,i){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var u=e.entanglements,c=e.expirationTimes,g=e.hiddenUpdates;for(n=o&~n;0<n;){var T=31-nt(n),M=1<<T;u[T]=0,c[T]=-1;var v=g[T];if(v!==null)for(g[T]=null,T=0;T<v.length;T++){var S=v[T];S!==null&&(S.lane&=-536870913)}n&=~M}a!==0&&ol(e,a,0),i!==0&&l===0&&e.tag!==0&&(e.suspendedLanes|=i&~(o&~t))}function ol(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var a=31-nt(t);e.entangledLanes|=t,e.entanglements[a]=e.entanglements[a]|1073741824|n&261930}function ul(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-nt(n),l=1<<a;l&t|e[a]&t&&(e[a]|=t),n&=~l}}function rl(e,t){var n=t&-t;return n=(n&42)!==0?1:b(n),(n&(e.suspendedLanes|t))!==0?0:n}function b(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function G(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ne(){var e=w.p;return e!==0?e:(e=window.event,e===void 0?32:Df(e.type))}function Ae(e,t){var n=w.p;try{return w.p=e,t()}finally{w.p=n}}var Ee=Math.random().toString(36).slice(2),pe="__reactFiber$"+Ee,Ce="__reactProps$"+Ee,pn="__reactContainer$"+Ee,zo="__reactEvents$"+Ee,lm="__reactListeners$"+Ee,im="__reactHandles$"+Ee,Qr="__reactResources$"+Ee,cl="__reactMarker$"+Ee;function jo(e){delete e[pe],delete e[Ce],delete e[zo],delete e[lm],delete e[im]}function ga(e){var t=e[pe];if(t)return t;for(var n=e.parentNode;n;){if(t=n[pn]||n[pe]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=mf(e);e!==null;){if(n=e[pe])return n;e=mf(e)}return t}e=n,n=e.parentNode}return null}function va(e){if(e=e[pe]||e[pn]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function sl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(s(33))}function ya(e){var t=e[Qr];return t||(t=e[Qr]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Je(e){e[cl]=!0}var Zr=new Set,Kr={};function Jn(e,t){ba(e,t),ba(e+"Capture",t)}function ba(e,t){for(Kr[e]=t,e=0;e<t.length;e++)Zr.add(t[e])}var om=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Jr={},Fr={};function um(e){return nl.call(Fr,e)?!0:nl.call(Jr,e)?!1:om.test(e)?Fr[e]=!0:(Jr[e]=!0,!1)}function ui(e,t,n){if(um(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function ri(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function Kt(e,t,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+a)}}function _t(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Wr(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function rm(e,t,n){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(o){n=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(o){n=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Do(e){if(!e._valueTracker){var t=Wr(e)?"checked":"value";e._valueTracker=rm(e,t,""+e[t])}}function Ir(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=Wr(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function ci(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var cm=/[\n"\\]/g;function Mt(e){return e.replace(cm,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Co(e,t,n,a,l,i,o,u){e.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.type=o:e.removeAttribute("type"),t!=null?o==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+_t(t)):e.value!==""+_t(t)&&(e.value=""+_t(t)):o!=="submit"&&o!=="reset"||e.removeAttribute("value"),t!=null?Oo(e,o,_t(t)):n!=null?Oo(e,o,_t(n)):a!=null&&e.removeAttribute("value"),l==null&&i!=null&&(e.defaultChecked=!!i),l!=null&&(e.checked=l&&typeof l!="function"&&typeof l!="symbol"),u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?e.name=""+_t(u):e.removeAttribute("name")}function $r(e,t,n,a,l,i,o,u){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),t!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||t!=null)){Do(e);return}n=n!=null?""+_t(n):"",t=t!=null?""+_t(t):n,u||t===e.value||(e.value=t),e.defaultValue=t}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=u?e.checked:!!a,e.defaultChecked=!!a,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(e.name=o),Do(e)}function Oo(e,t,n){t==="number"&&ci(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function xa(e,t,n,a){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&a&&(e[n].defaultSelected=!0)}else{for(n=""+_t(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,a&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Pr(e,t,n){if(t!=null&&(t=""+_t(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+_t(n):""}function ec(e,t,n,a){if(t==null){if(a!=null){if(n!=null)throw Error(s(92));if(ct(a)){if(1<a.length)throw Error(s(93));a=a[0]}n=a}n==null&&(n=""),t=n}n=_t(t),e.defaultValue=n,a=e.textContent,a===n&&a!==""&&a!==null&&(e.value=a),Do(e)}function Sa(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var sm=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function tc(e,t,n){var a=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":a?e.setProperty(t,n):typeof n!="number"||n===0||sm.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function nc(e,t,n){if(t!=null&&typeof t!="object")throw Error(s(62));if(e=e.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var l in t)a=t[l],t.hasOwnProperty(l)&&n[l]!==a&&tc(e,l,a)}else for(var i in t)t.hasOwnProperty(i)&&tc(e,i,t[i])}function Ro(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var dm=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),fm=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function si(e){return fm.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Jt(){}var Uo=null;function wo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ta=null,Aa=null;function ac(e){var t=va(e);if(t&&(e=t.stateNode)){var n=e[Ce]||null;e:switch(e=t.stateNode,t.type){case"input":if(Co(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Mt(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var l=a[Ce]||null;if(!l)throw Error(s(90));Co(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(t=0;t<n.length;t++)a=n[t],a.form===e.form&&Ir(a)}break e;case"textarea":Pr(e,n.value,n.defaultValue);break e;case"select":t=n.value,t!=null&&xa(e,!!n.multiple,t,!1)}}}var Bo=!1;function lc(e,t,n){if(Bo)return e(t,n);Bo=!0;try{var a=e(t);return a}finally{if(Bo=!1,(Ta!==null||Aa!==null)&&(Ii(),Ta&&(t=Ta,e=Aa,Aa=Ta=null,ac(t),e)))for(t=0;t<e.length;t++)ac(e[t])}}function dl(e,t){var n=e.stateNode;if(n===null)return null;var a=n[Ce]||null;if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(s(231,t,typeof n));return n}var Ft=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),qo=!1;if(Ft)try{var fl={};Object.defineProperty(fl,"passive",{get:function(){qo=!0}}),window.addEventListener("test",fl,fl),window.removeEventListener("test",fl,fl)}catch{qo=!1}var gn=null,Ho=null,di=null;function ic(){if(di)return di;var e,t=Ho,n=t.length,a,l="value"in gn?gn.value:gn.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var o=n-e;for(a=1;a<=o&&t[n-a]===l[i-a];a++);return di=l.slice(e,1<a?1-a:void 0)}function fi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function mi(){return!0}function oc(){return!1}function st(e){function t(n,a,l,i,o){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(n=e[u],this[u]=n?n(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?mi:oc,this.isPropagationStopped=oc,this}return C(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=mi)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=mi)},persist:function(){},isPersistent:mi}),t}var Fn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},hi=st(Fn),ml=C({},Fn,{view:0,detail:0}),mm=st(ml),Lo,No,hl,pi=C({},ml,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Go,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==hl&&(hl&&e.type==="mousemove"?(Lo=e.screenX-hl.screenX,No=e.screenY-hl.screenY):No=Lo=0,hl=e),Lo)},movementY:function(e){return"movementY"in e?e.movementY:No}}),uc=st(pi),hm=C({},pi,{dataTransfer:0}),pm=st(hm),gm=C({},ml,{relatedTarget:0}),ko=st(gm),vm=C({},Fn,{animationName:0,elapsedTime:0,pseudoElement:0}),ym=st(vm),bm=C({},Fn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),xm=st(bm),Sm=C({},Fn,{data:0}),rc=st(Sm),Tm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Am={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Em={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function _m(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Em[e])?!!t[e]:!1}function Go(){return _m}var Mm=C({},ml,{key:function(e){if(e.key){var t=Tm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=fi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Am[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Go,charCode:function(e){return e.type==="keypress"?fi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?fi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),zm=st(Mm),jm=C({},pi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),cc=st(jm),Dm=C({},ml,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Go}),Cm=st(Dm),Om=C({},Fn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Rm=st(Om),Um=C({},pi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),wm=st(Um),Bm=C({},Fn,{newState:0,oldState:0}),qm=st(Bm),Hm=[9,13,27,32],Yo=Ft&&"CompositionEvent"in window,pl=null;Ft&&"documentMode"in document&&(pl=document.documentMode);var Lm=Ft&&"TextEvent"in window&&!pl,sc=Ft&&(!Yo||pl&&8<pl&&11>=pl),dc=" ",fc=!1;function mc(e,t){switch(e){case"keyup":return Hm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function hc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ea=!1;function Nm(e,t){switch(e){case"compositionend":return hc(t);case"keypress":return t.which!==32?null:(fc=!0,dc);case"textInput":return e=t.data,e===dc&&fc?null:e;default:return null}}function km(e,t){if(Ea)return e==="compositionend"||!Yo&&mc(e,t)?(e=ic(),di=Ho=gn=null,Ea=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return sc&&t.locale!=="ko"?null:t.data;default:return null}}var Gm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function pc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Gm[e.type]:t==="textarea"}function gc(e,t,n,a){Ta?Aa?Aa.push(a):Aa=[a]:Ta=a,t=lo(t,"onChange"),0<t.length&&(n=new hi("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var gl=null,vl=null;function Ym(e){$d(e,0)}function gi(e){var t=sl(e);if(Ir(t))return e}function vc(e,t){if(e==="change")return t}var yc=!1;if(Ft){var Vo;if(Ft){var Xo="oninput"in document;if(!Xo){var bc=document.createElement("div");bc.setAttribute("oninput","return;"),Xo=typeof bc.oninput=="function"}Vo=Xo}else Vo=!1;yc=Vo&&(!document.documentMode||9<document.documentMode)}function xc(){gl&&(gl.detachEvent("onpropertychange",Sc),vl=gl=null)}function Sc(e){if(e.propertyName==="value"&&gi(vl)){var t=[];gc(t,vl,e,wo(e)),lc(Ym,t)}}function Vm(e,t,n){e==="focusin"?(xc(),gl=t,vl=n,gl.attachEvent("onpropertychange",Sc)):e==="focusout"&&xc()}function Xm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return gi(vl)}function Qm(e,t){if(e==="click")return gi(t)}function Zm(e,t){if(e==="input"||e==="change")return gi(t)}function Km(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var gt=typeof Object.is=="function"?Object.is:Km;function yl(e,t){if(gt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!nl.call(t,l)||!gt(e[l],t[l]))return!1}return!0}function Tc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ac(e,t){var n=Tc(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Tc(n)}}function Ec(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ec(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function _c(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=ci(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ci(e.document)}return t}function Qo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Jm=Ft&&"documentMode"in document&&11>=document.documentMode,_a=null,Zo=null,bl=null,Ko=!1;function Mc(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ko||_a==null||_a!==ci(a)||(a=_a,"selectionStart"in a&&Qo(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),bl&&yl(bl,a)||(bl=a,a=lo(Zo,"onSelect"),0<a.length&&(t=new hi("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=_a)))}function Wn(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Ma={animationend:Wn("Animation","AnimationEnd"),animationiteration:Wn("Animation","AnimationIteration"),animationstart:Wn("Animation","AnimationStart"),transitionrun:Wn("Transition","TransitionRun"),transitionstart:Wn("Transition","TransitionStart"),transitioncancel:Wn("Transition","TransitionCancel"),transitionend:Wn("Transition","TransitionEnd")},Jo={},zc={};Ft&&(zc=document.createElement("div").style,"AnimationEvent"in window||(delete Ma.animationend.animation,delete Ma.animationiteration.animation,delete Ma.animationstart.animation),"TransitionEvent"in window||delete Ma.transitionend.transition);function In(e){if(Jo[e])return Jo[e];if(!Ma[e])return e;var t=Ma[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in zc)return Jo[e]=t[n];return e}var jc=In("animationend"),Dc=In("animationiteration"),Cc=In("animationstart"),Fm=In("transitionrun"),Wm=In("transitionstart"),Im=In("transitioncancel"),Oc=In("transitionend"),Rc=new Map,Fo="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Fo.push("scrollEnd");function qt(e,t){Rc.set(e,t),Jn(t,[e])}var vi=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},zt=[],za=0,Wo=0;function yi(){for(var e=za,t=Wo=za=0;t<e;){var n=zt[t];zt[t++]=null;var a=zt[t];zt[t++]=null;var l=zt[t];zt[t++]=null;var i=zt[t];if(zt[t++]=null,a!==null&&l!==null){var o=a.pending;o===null?l.next=l:(l.next=o.next,o.next=l),a.pending=l}i!==0&&Uc(n,l,i)}}function bi(e,t,n,a){zt[za++]=e,zt[za++]=t,zt[za++]=n,zt[za++]=a,Wo|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function Io(e,t,n,a){return bi(e,t,n,a),xi(e)}function $n(e,t){return bi(e,null,null,t),xi(e)}function Uc(e,t,n){e.lanes|=n;var a=e.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=e.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(l=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,l&&t!==null&&(l=31-nt(n),e=i.hiddenUpdates,a=e[l],a===null?e[l]=[t]:a.push(t),t.lane=n|536870912),i):null}function xi(e){if(50<Gl)throw Gl=0,or=null,Error(s(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ja={};function $m(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function vt(e,t,n,a){return new $m(e,t,n,a)}function $o(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Wt(e,t){var n=e.alternate;return n===null?(n=vt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function wc(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Si(e,t,n,a,l,i){var o=0;if(a=e,typeof e=="function")$o(e)&&(o=1);else if(typeof e=="string")o=ap(e,n,k.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case lt:return e=vt(31,n,t,l),e.elementType=lt,e.lanes=i,e;case H:return Pn(n.children,l,i,t);case ue:o=8,l|=24;break;case L:return e=vt(12,n,t,l|2),e.elementType=L,e.lanes=i,e;case Se:return e=vt(13,n,t,l),e.elementType=Se,e.lanes=i,e;case ge:return e=vt(19,n,t,l),e.elementType=ge,e.lanes=i,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case re:o=10;break e;case ie:o=9;break e;case J:o=11;break e;case K:o=14;break e;case te:o=16,a=null;break e}o=29,n=Error(s(130,e===null?"null":typeof e,"")),a=null}return t=vt(o,n,t,l),t.elementType=e,t.type=a,t.lanes=i,t}function Pn(e,t,n,a){return e=vt(7,e,a,t),e.lanes=n,e}function Po(e,t,n){return e=vt(6,e,null,t),e.lanes=n,e}function Bc(e){var t=vt(18,null,null,0);return t.stateNode=e,t}function eu(e,t,n){return t=vt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var qc=new WeakMap;function jt(e,t){if(typeof e=="object"&&e!==null){var n=qc.get(e);return n!==void 0?n:(t={value:e,source:t,stack:Qt(t)},qc.set(e,t),t)}return{value:e,source:t,stack:Qt(t)}}var Da=[],Ca=0,Ti=null,xl=0,Dt=[],Ct=0,vn=null,Gt=1,Yt="";function It(e,t){Da[Ca++]=xl,Da[Ca++]=Ti,Ti=e,xl=t}function Hc(e,t,n){Dt[Ct++]=Gt,Dt[Ct++]=Yt,Dt[Ct++]=vn,vn=e;var a=Gt;e=Yt;var l=32-nt(a)-1;a&=~(1<<l),n+=1;var i=32-nt(t)+l;if(30<i){var o=l-l%5;i=(a&(1<<o)-1).toString(32),a>>=o,l-=o,Gt=1<<32-nt(t)+l|n<<l|a,Yt=i+e}else Gt=1<<i|n<<l|a,Yt=e}function tu(e){e.return!==null&&(It(e,1),Hc(e,1,0))}function nu(e){for(;e===Ti;)Ti=Da[--Ca],Da[Ca]=null,xl=Da[--Ca],Da[Ca]=null;for(;e===vn;)vn=Dt[--Ct],Dt[Ct]=null,Yt=Dt[--Ct],Dt[Ct]=null,Gt=Dt[--Ct],Dt[Ct]=null}function Lc(e,t){Dt[Ct++]=Gt,Dt[Ct++]=Yt,Dt[Ct++]=vn,Gt=t.id,Yt=t.overflow,vn=e}var $e=null,Re=null,he=!1,yn=null,Ot=!1,au=Error(s(519));function bn(e){var t=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Sl(jt(t,e)),au}function Nc(e){var t=e.stateNode,n=e.type,a=e.memoizedProps;switch(t[pe]=e,t[Ce]=a,n){case"dialog":de("cancel",t),de("close",t);break;case"iframe":case"object":case"embed":de("load",t);break;case"video":case"audio":for(n=0;n<Vl.length;n++)de(Vl[n],t);break;case"source":de("error",t);break;case"img":case"image":case"link":de("error",t),de("load",t);break;case"details":de("toggle",t);break;case"input":de("invalid",t),$r(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":de("invalid",t);break;case"textarea":de("invalid",t),ec(t,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||a.suppressHydrationWarning===!0||nf(t.textContent,n)?(a.popover!=null&&(de("beforetoggle",t),de("toggle",t)),a.onScroll!=null&&de("scroll",t),a.onScrollEnd!=null&&de("scrollend",t),a.onClick!=null&&(t.onclick=Jt),t=!0):t=!1,t||bn(e,!0)}function kc(e){for($e=e.return;$e;)switch($e.tag){case 5:case 31:case 13:Ot=!1;return;case 27:case 3:Ot=!0;return;default:$e=$e.return}}function Oa(e){if(e!==$e)return!1;if(!he)return kc(e),he=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Sr(e.type,e.memoizedProps)),n=!n),n&&Re&&bn(e),kc(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Re=ff(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Re=ff(e)}else t===27?(t=Re,Un(e.type)?(e=Mr,Mr=null,Re=e):Re=t):Re=$e?Ut(e.stateNode.nextSibling):null;return!0}function ea(){Re=$e=null,he=!1}function lu(){var e=yn;return e!==null&&(ht===null?ht=e:ht.push.apply(ht,e),yn=null),e}function Sl(e){yn===null?yn=[e]:yn.push(e)}var iu=m(null),ta=null,$t=null;function xn(e,t,n){B(iu,t._currentValue),t._currentValue=n}function Pt(e){e._currentValue=iu.current,j(iu)}function ou(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function uu(e,t,n,a){var l=e.child;for(l!==null&&(l.return=e);l!==null;){var i=l.dependencies;if(i!==null){var o=l.child;i=i.firstContext;e:for(;i!==null;){var u=i;i=l;for(var c=0;c<t.length;c++)if(u.context===t[c]){i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),ou(i.return,n,e),a||(o=null);break e}i=u.next}}else if(l.tag===18){if(o=l.return,o===null)throw Error(s(341));o.lanes|=n,i=o.alternate,i!==null&&(i.lanes|=n),ou(o,n,e),o=null}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===e){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}}function Ra(e,t,n,a){e=null;for(var l=t,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var o=l.alternate;if(o===null)throw Error(s(387));if(o=o.memoizedProps,o!==null){var u=l.type;gt(l.pendingProps.value,o.value)||(e!==null?e.push(u):e=[u])}}else if(l===ce.current){if(o=l.alternate,o===null)throw Error(s(387));o.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(e!==null?e.push(Jl):e=[Jl])}l=l.return}e!==null&&uu(t,e,n,a),t.flags|=262144}function Ai(e){for(e=e.firstContext;e!==null;){if(!gt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function na(e){ta=e,$t=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Pe(e){return Gc(ta,e)}function Ei(e,t){return ta===null&&na(e),Gc(e,t)}function Gc(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},$t===null){if(e===null)throw Error(s(308));$t=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else $t=$t.next=t;return n}var Pm=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,a){e.push(a)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},eh=d.unstable_scheduleCallback,th=d.unstable_NormalPriority,Ge={$$typeof:re,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ru(){return{controller:new Pm,data:new Map,refCount:0}}function Tl(e){e.refCount--,e.refCount===0&&eh(th,function(){e.controller.abort()})}var Al=null,cu=0,Ua=0,wa=null;function nh(e,t){if(Al===null){var n=Al=[];cu=0,Ua=fr(),wa={status:"pending",value:void 0,then:function(a){n.push(a)}}}return cu++,t.then(Yc,Yc),t}function Yc(){if(--cu===0&&Al!==null){wa!==null&&(wa.status="fulfilled");var e=Al;Al=null,Ua=0,wa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ah(e,t){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return e.then(function(){a.status="fulfilled",a.value=t;for(var l=0;l<n.length;l++)(0,n[l])(t)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var Vc=A.S;A.S=function(e,t){Md=Ie(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&nh(e,t),Vc!==null&&Vc(e,t)};var aa=m(null);function su(){var e=aa.current;return e!==null?e:Oe.pooledCache}function _i(e,t){t===null?B(aa,aa.current):B(aa,t.pool)}function Xc(){var e=su();return e===null?null:{parent:Ge._currentValue,pool:e}}var Ba=Error(s(460)),du=Error(s(474)),Mi=Error(s(542)),zi={then:function(){}};function Qc(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Zc(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Jt,Jt),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Jc(e),e;default:if(typeof t.status=="string")t.then(Jt,Jt);else{if(e=Oe,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var l=t;l.status="fulfilled",l.value=a}},function(a){if(t.status==="pending"){var l=t;l.status="rejected",l.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Jc(e),e}throw ia=t,Ba}}function la(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(ia=n,Ba):n}}var ia=null;function Kc(){if(ia===null)throw Error(s(459));var e=ia;return ia=null,e}function Jc(e){if(e===Ba||e===Mi)throw Error(s(483))}var qa=null,El=0;function ji(e){var t=El;return El+=1,qa===null&&(qa=[]),Zc(qa,e,t)}function _l(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Di(e,t){throw t.$$typeof===I?Error(s(525)):(e=Object.prototype.toString.call(t),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Fc(e){function t(h,f){if(e){var p=h.deletions;p===null?(h.deletions=[f],h.flags|=16):p.push(f)}}function n(h,f){if(!e)return null;for(;f!==null;)t(h,f),f=f.sibling;return null}function a(h){for(var f=new Map;h!==null;)h.key!==null?f.set(h.key,h):f.set(h.index,h),h=h.sibling;return f}function l(h,f){return h=Wt(h,f),h.index=0,h.sibling=null,h}function i(h,f,p){return h.index=p,e?(p=h.alternate,p!==null?(p=p.index,p<f?(h.flags|=67108866,f):p):(h.flags|=67108866,f)):(h.flags|=1048576,f)}function o(h){return e&&h.alternate===null&&(h.flags|=67108866),h}function u(h,f,p,_){return f===null||f.tag!==6?(f=Po(p,h.mode,_),f.return=h,f):(f=l(f,p),f.return=h,f)}function c(h,f,p,_){var Q=p.type;return Q===H?T(h,f,p.props.children,_,p.key):f!==null&&(f.elementType===Q||typeof Q=="object"&&Q!==null&&Q.$$typeof===te&&la(Q)===f.type)?(f=l(f,p.props),_l(f,p),f.return=h,f):(f=Si(p.type,p.key,p.props,null,h.mode,_),_l(f,p),f.return=h,f)}function g(h,f,p,_){return f===null||f.tag!==4||f.stateNode.containerInfo!==p.containerInfo||f.stateNode.implementation!==p.implementation?(f=eu(p,h.mode,_),f.return=h,f):(f=l(f,p.children||[]),f.return=h,f)}function T(h,f,p,_,Q){return f===null||f.tag!==7?(f=Pn(p,h.mode,_,Q),f.return=h,f):(f=l(f,p),f.return=h,f)}function M(h,f,p){if(typeof f=="string"&&f!==""||typeof f=="number"||typeof f=="bigint")return f=Po(""+f,h.mode,p),f.return=h,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case $:return p=Si(f.type,f.key,f.props,null,h.mode,p),_l(p,f),p.return=h,p;case V:return f=eu(f,h.mode,p),f.return=h,f;case te:return f=la(f),M(h,f,p)}if(ct(f)||We(f))return f=Pn(f,h.mode,p,null),f.return=h,f;if(typeof f.then=="function")return M(h,ji(f),p);if(f.$$typeof===re)return M(h,Ei(h,f),p);Di(h,f)}return null}function v(h,f,p,_){var Q=f!==null?f.key:null;if(typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint")return Q!==null?null:u(h,f,""+p,_);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case $:return p.key===Q?c(h,f,p,_):null;case V:return p.key===Q?g(h,f,p,_):null;case te:return p=la(p),v(h,f,p,_)}if(ct(p)||We(p))return Q!==null?null:T(h,f,p,_,null);if(typeof p.then=="function")return v(h,f,ji(p),_);if(p.$$typeof===re)return v(h,f,Ei(h,p),_);Di(h,p)}return null}function S(h,f,p,_,Q){if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return h=h.get(p)||null,u(f,h,""+_,Q);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case $:return h=h.get(_.key===null?p:_.key)||null,c(f,h,_,Q);case V:return h=h.get(_.key===null?p:_.key)||null,g(f,h,_,Q);case te:return _=la(_),S(h,f,p,_,Q)}if(ct(_)||We(_))return h=h.get(p)||null,T(f,h,_,Q,null);if(typeof _.then=="function")return S(h,f,p,ji(_),Q);if(_.$$typeof===re)return S(h,f,p,Ei(f,_),Q);Di(f,_)}return null}function N(h,f,p,_){for(var Q=null,ye=null,Y=f,le=f=0,me=null;Y!==null&&le<p.length;le++){Y.index>le?(me=Y,Y=null):me=Y.sibling;var be=v(h,Y,p[le],_);if(be===null){Y===null&&(Y=me);break}e&&Y&&be.alternate===null&&t(h,Y),f=i(be,f,le),ye===null?Q=be:ye.sibling=be,ye=be,Y=me}if(le===p.length)return n(h,Y),he&&It(h,le),Q;if(Y===null){for(;le<p.length;le++)Y=M(h,p[le],_),Y!==null&&(f=i(Y,f,le),ye===null?Q=Y:ye.sibling=Y,ye=Y);return he&&It(h,le),Q}for(Y=a(Y);le<p.length;le++)me=S(Y,h,le,p[le],_),me!==null&&(e&&me.alternate!==null&&Y.delete(me.key===null?le:me.key),f=i(me,f,le),ye===null?Q=me:ye.sibling=me,ye=me);return e&&Y.forEach(function(Ln){return t(h,Ln)}),he&&It(h,le),Q}function W(h,f,p,_){if(p==null)throw Error(s(151));for(var Q=null,ye=null,Y=f,le=f=0,me=null,be=p.next();Y!==null&&!be.done;le++,be=p.next()){Y.index>le?(me=Y,Y=null):me=Y.sibling;var Ln=v(h,Y,be.value,_);if(Ln===null){Y===null&&(Y=me);break}e&&Y&&Ln.alternate===null&&t(h,Y),f=i(Ln,f,le),ye===null?Q=Ln:ye.sibling=Ln,ye=Ln,Y=me}if(be.done)return n(h,Y),he&&It(h,le),Q;if(Y===null){for(;!be.done;le++,be=p.next())be=M(h,be.value,_),be!==null&&(f=i(be,f,le),ye===null?Q=be:ye.sibling=be,ye=be);return he&&It(h,le),Q}for(Y=a(Y);!be.done;le++,be=p.next())be=S(Y,h,le,be.value,_),be!==null&&(e&&be.alternate!==null&&Y.delete(be.key===null?le:be.key),f=i(be,f,le),ye===null?Q=be:ye.sibling=be,ye=be);return e&&Y.forEach(function(hp){return t(h,hp)}),he&&It(h,le),Q}function De(h,f,p,_){if(typeof p=="object"&&p!==null&&p.type===H&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case $:e:{for(var Q=p.key;f!==null;){if(f.key===Q){if(Q=p.type,Q===H){if(f.tag===7){n(h,f.sibling),_=l(f,p.props.children),_.return=h,h=_;break e}}else if(f.elementType===Q||typeof Q=="object"&&Q!==null&&Q.$$typeof===te&&la(Q)===f.type){n(h,f.sibling),_=l(f,p.props),_l(_,p),_.return=h,h=_;break e}n(h,f);break}else t(h,f);f=f.sibling}p.type===H?(_=Pn(p.props.children,h.mode,_,p.key),_.return=h,h=_):(_=Si(p.type,p.key,p.props,null,h.mode,_),_l(_,p),_.return=h,h=_)}return o(h);case V:e:{for(Q=p.key;f!==null;){if(f.key===Q)if(f.tag===4&&f.stateNode.containerInfo===p.containerInfo&&f.stateNode.implementation===p.implementation){n(h,f.sibling),_=l(f,p.children||[]),_.return=h,h=_;break e}else{n(h,f);break}else t(h,f);f=f.sibling}_=eu(p,h.mode,_),_.return=h,h=_}return o(h);case te:return p=la(p),De(h,f,p,_)}if(ct(p))return N(h,f,p,_);if(We(p)){if(Q=We(p),typeof Q!="function")throw Error(s(150));return p=Q.call(p),W(h,f,p,_)}if(typeof p.then=="function")return De(h,f,ji(p),_);if(p.$$typeof===re)return De(h,f,Ei(h,p),_);Di(h,p)}return typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint"?(p=""+p,f!==null&&f.tag===6?(n(h,f.sibling),_=l(f,p),_.return=h,h=_):(n(h,f),_=Po(p,h.mode,_),_.return=h,h=_),o(h)):n(h,f)}return function(h,f,p,_){try{El=0;var Q=De(h,f,p,_);return qa=null,Q}catch(Y){if(Y===Ba||Y===Mi)throw Y;var ye=vt(29,Y,null,h.mode);return ye.lanes=_,ye.return=h,ye}finally{}}}var oa=Fc(!0),Wc=Fc(!1),Sn=!1;function fu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function mu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Tn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function An(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,(xe&2)!==0){var l=a.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),a.pending=t,t=xi(e),Uc(e,null,n),t}return bi(e,a,t,n),xi(e)}function Ml(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,ul(e,n)}}function hu(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var pu=!1;function zl(){if(pu){var e=wa;if(e!==null)throw e}}function jl(e,t,n,a){pu=!1;var l=e.updateQueue;Sn=!1;var i=l.firstBaseUpdate,o=l.lastBaseUpdate,u=l.shared.pending;if(u!==null){l.shared.pending=null;var c=u,g=c.next;c.next=null,o===null?i=g:o.next=g,o=c;var T=e.alternate;T!==null&&(T=T.updateQueue,u=T.lastBaseUpdate,u!==o&&(u===null?T.firstBaseUpdate=g:u.next=g,T.lastBaseUpdate=c))}if(i!==null){var M=l.baseState;o=0,T=g=c=null,u=i;do{var v=u.lane&-536870913,S=v!==u.lane;if(S?(fe&v)===v:(a&v)===v){v!==0&&v===Ua&&(pu=!0),T!==null&&(T=T.next={lane:0,tag:u.tag,payload:u.payload,callback:null,next:null});e:{var N=e,W=u;v=t;var De=n;switch(W.tag){case 1:if(N=W.payload,typeof N=="function"){M=N.call(De,M,v);break e}M=N;break e;case 3:N.flags=N.flags&-65537|128;case 0:if(N=W.payload,v=typeof N=="function"?N.call(De,M,v):N,v==null)break e;M=C({},M,v);break e;case 2:Sn=!0}}v=u.callback,v!==null&&(e.flags|=64,S&&(e.flags|=8192),S=l.callbacks,S===null?l.callbacks=[v]:S.push(v))}else S={lane:v,tag:u.tag,payload:u.payload,callback:u.callback,next:null},T===null?(g=T=S,c=M):T=T.next=S,o|=v;if(u=u.next,u===null){if(u=l.shared.pending,u===null)break;S=u,u=S.next,S.next=null,l.lastBaseUpdate=S,l.shared.pending=null}}while(!0);T===null&&(c=M),l.baseState=c,l.firstBaseUpdate=g,l.lastBaseUpdate=T,i===null&&(l.shared.lanes=0),jn|=o,e.lanes=o,e.memoizedState=M}}function Ic(e,t){if(typeof e!="function")throw Error(s(191,e));e.call(t)}function $c(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ic(n[e],t)}var Ha=m(null),Ci=m(0);function Pc(e,t){e=cn,B(Ci,e),B(Ha,t),cn=e|t.baseLanes}function gu(){B(Ci,cn),B(Ha,Ha.current)}function vu(){cn=Ci.current,j(Ha),j(Ci)}var yt=m(null),Rt=null;function En(e){var t=e.alternate;B(Ne,Ne.current&1),B(yt,e),Rt===null&&(t===null||Ha.current!==null||t.memoizedState!==null)&&(Rt=e)}function yu(e){B(Ne,Ne.current),B(yt,e),Rt===null&&(Rt=e)}function es(e){e.tag===22?(B(Ne,Ne.current),B(yt,e),Rt===null&&(Rt=e)):_n()}function _n(){B(Ne,Ne.current),B(yt,yt.current)}function bt(e){j(yt),Rt===e&&(Rt=null),j(Ne)}var Ne=m(0);function Oi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Er(n)||_r(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var en=0,ae=null,ze=null,Ye=null,Ri=!1,La=!1,ua=!1,Ui=0,Dl=0,Na=null,lh=0;function He(){throw Error(s(321))}function bu(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!gt(e[n],t[n]))return!1;return!0}function xu(e,t,n,a,l,i){return en=i,ae=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,A.H=e===null||e.memoizedState===null?Hs:Bu,ua=!1,i=n(a,l),ua=!1,La&&(i=ns(t,n,a,l)),ts(e),i}function ts(e){A.H=Rl;var t=ze!==null&&ze.next!==null;if(en=0,Ye=ze=ae=null,Ri=!1,Dl=0,Na=null,t)throw Error(s(300));e===null||Ve||(e=e.dependencies,e!==null&&Ai(e)&&(Ve=!0))}function ns(e,t,n,a){ae=e;var l=0;do{if(La&&(Na=null),Dl=0,La=!1,25<=l)throw Error(s(301));if(l+=1,Ye=ze=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}A.H=Ls,i=t(n,a)}while(La);return i}function ih(){var e=A.H,t=e.useState()[0];return t=typeof t.then=="function"?Cl(t):t,e=e.useState()[0],(ze!==null?ze.memoizedState:null)!==e&&(ae.flags|=1024),t}function Su(){var e=Ui!==0;return Ui=0,e}function Tu(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Au(e){if(Ri){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ri=!1}en=0,Ye=ze=ae=null,La=!1,Dl=Ui=0,Na=null}function rt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ye===null?ae.memoizedState=Ye=e:Ye=Ye.next=e,Ye}function ke(){if(ze===null){var e=ae.alternate;e=e!==null?e.memoizedState:null}else e=ze.next;var t=Ye===null?ae.memoizedState:Ye.next;if(t!==null)Ye=t,ze=e;else{if(e===null)throw ae.alternate===null?Error(s(467)):Error(s(310));ze=e,e={memoizedState:ze.memoizedState,baseState:ze.baseState,baseQueue:ze.baseQueue,queue:ze.queue,next:null},Ye===null?ae.memoizedState=Ye=e:Ye=Ye.next=e}return Ye}function wi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Cl(e){var t=Dl;return Dl+=1,Na===null&&(Na=[]),e=Zc(Na,e,t),t=ae,(Ye===null?t.memoizedState:Ye.next)===null&&(t=t.alternate,A.H=t===null||t.memoizedState===null?Hs:Bu),e}function Bi(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Cl(e);if(e.$$typeof===re)return Pe(e)}throw Error(s(438,String(e)))}function Eu(e){var t=null,n=ae.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var a=ae.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(l){return l.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=wi(),ae.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),a=0;a<e;a++)n[a]=it;return t.index++,n}function tn(e,t){return typeof t=="function"?t(e):t}function qi(e){var t=ke();return _u(t,ze,e)}function _u(e,t,n){var a=e.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=n;var l=e.baseQueue,i=a.pending;if(i!==null){if(l!==null){var o=l.next;l.next=i.next,i.next=o}t.baseQueue=l=i,a.pending=null}if(i=e.baseState,l===null)e.memoizedState=i;else{t=l.next;var u=o=null,c=null,g=t,T=!1;do{var M=g.lane&-536870913;if(M!==g.lane?(fe&M)===M:(en&M)===M){var v=g.revertLane;if(v===0)c!==null&&(c=c.next={lane:0,revertLane:0,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null}),M===Ua&&(T=!0);else if((en&v)===v){g=g.next,v===Ua&&(T=!0);continue}else M={lane:0,revertLane:g.revertLane,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},c===null?(u=c=M,o=i):c=c.next=M,ae.lanes|=v,jn|=v;M=g.action,ua&&n(i,M),i=g.hasEagerState?g.eagerState:n(i,M)}else v={lane:M,revertLane:g.revertLane,gesture:g.gesture,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},c===null?(u=c=v,o=i):c=c.next=v,ae.lanes|=M,jn|=M;g=g.next}while(g!==null&&g!==t);if(c===null?o=i:c.next=u,!gt(i,e.memoizedState)&&(Ve=!0,T&&(n=wa,n!==null)))throw n;e.memoizedState=i,e.baseState=o,e.baseQueue=c,a.lastRenderedState=i}return l===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function Mu(e){var t=ke(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var a=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var o=l=l.next;do i=e(i,o.action),o=o.next;while(o!==l);gt(i,t.memoizedState)||(Ve=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,a]}function as(e,t,n){var a=ae,l=ke(),i=he;if(i){if(n===void 0)throw Error(s(407));n=n()}else n=t();var o=!gt((ze||l).memoizedState,n);if(o&&(l.memoizedState=n,Ve=!0),l=l.queue,Du(os.bind(null,a,l,e),[e]),l.getSnapshot!==t||o||Ye!==null&&Ye.memoizedState.tag&1){if(a.flags|=2048,ka(9,{destroy:void 0},is.bind(null,a,l,n,t),null),Oe===null)throw Error(s(349));i||(en&127)!==0||ls(a,t,n)}return n}function ls(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ae.updateQueue,t===null?(t=wi(),ae.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function is(e,t,n,a){t.value=n,t.getSnapshot=a,us(t)&&rs(e)}function os(e,t,n){return n(function(){us(t)&&rs(e)})}function us(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!gt(e,n)}catch{return!0}}function rs(e){var t=$n(e,2);t!==null&&pt(t,e,2)}function zu(e){var t=rt();if(typeof e=="function"){var n=e;if(e=n(),ua){Et(!0);try{n()}finally{Et(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:tn,lastRenderedState:e},t}function cs(e,t,n,a){return e.baseState=n,_u(e,ze,typeof a=="function"?a:tn)}function oh(e,t,n,a,l){if(Ni(e))throw Error(s(485));if(e=t.action,e!==null){var i={payload:l,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){i.listeners.push(o)}};A.T!==null?n(!0):i.isTransition=!1,a(i),n=t.pending,n===null?(i.next=t.pending=i,ss(t,i)):(i.next=n.next,t.pending=n.next=i)}}function ss(e,t){var n=t.action,a=t.payload,l=e.state;if(t.isTransition){var i=A.T,o={};A.T=o;try{var u=n(l,a),c=A.S;c!==null&&c(o,u),ds(e,t,u)}catch(g){ju(e,t,g)}finally{i!==null&&o.types!==null&&(i.types=o.types),A.T=i}}else try{i=n(l,a),ds(e,t,i)}catch(g){ju(e,t,g)}}function ds(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){fs(e,t,a)},function(a){return ju(e,t,a)}):fs(e,t,n)}function fs(e,t,n){t.status="fulfilled",t.value=n,ms(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,ss(e,n)))}function ju(e,t,n){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=n,ms(t),t=t.next;while(t!==a)}e.action=null}function ms(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function hs(e,t){return t}function ps(e,t){if(he){var n=Oe.formState;if(n!==null){e:{var a=ae;if(he){if(Re){t:{for(var l=Re,i=Ot;l.nodeType!==8;){if(!i){l=null;break t}if(l=Ut(l.nextSibling),l===null){l=null;break t}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){Re=Ut(l.nextSibling),a=l.data==="F!";break e}}bn(a)}a=!1}a&&(t=n[0])}}return n=rt(),n.memoizedState=n.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:hs,lastRenderedState:t},n.queue=a,n=ws.bind(null,ae,a),a.dispatch=n,a=zu(!1),i=wu.bind(null,ae,!1,a.queue),a=rt(),l={state:t,dispatch:null,action:e,pending:null},a.queue=l,n=oh.bind(null,ae,l,i,n),l.dispatch=n,a.memoizedState=e,[t,n,!1]}function gs(e){var t=ke();return vs(t,ze,e)}function vs(e,t,n){if(t=_u(e,t,hs)[0],e=qi(tn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=Cl(t)}catch(o){throw o===Ba?Mi:o}else a=t;t=ke();var l=t.queue,i=l.dispatch;return n!==t.memoizedState&&(ae.flags|=2048,ka(9,{destroy:void 0},uh.bind(null,l,n),null)),[a,i,e]}function uh(e,t){e.action=t}function ys(e){var t=ke(),n=ze;if(n!==null)return vs(t,n,e);ke(),t=t.memoizedState,n=ke();var a=n.queue.dispatch;return n.memoizedState=e,[t,a,!1]}function ka(e,t,n,a){return e={tag:e,create:n,deps:a,inst:t,next:null},t=ae.updateQueue,t===null&&(t=wi(),ae.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e),e}function bs(){return ke().memoizedState}function Hi(e,t,n,a){var l=rt();ae.flags|=e,l.memoizedState=ka(1|t,{destroy:void 0},n,a===void 0?null:a)}function Li(e,t,n,a){var l=ke();a=a===void 0?null:a;var i=l.memoizedState.inst;ze!==null&&a!==null&&bu(a,ze.memoizedState.deps)?l.memoizedState=ka(t,i,n,a):(ae.flags|=e,l.memoizedState=ka(1|t,i,n,a))}function xs(e,t){Hi(8390656,8,e,t)}function Du(e,t){Li(2048,8,e,t)}function rh(e){ae.flags|=4;var t=ae.updateQueue;if(t===null)t=wi(),ae.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Ss(e){var t=ke().memoizedState;return rh({ref:t,nextImpl:e}),function(){if((xe&2)!==0)throw Error(s(440));return t.impl.apply(void 0,arguments)}}function Ts(e,t){return Li(4,2,e,t)}function As(e,t){return Li(4,4,e,t)}function Es(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function _s(e,t,n){n=n!=null?n.concat([e]):null,Li(4,4,Es.bind(null,t,e),n)}function Cu(){}function Ms(e,t){var n=ke();t=t===void 0?null:t;var a=n.memoizedState;return t!==null&&bu(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function zs(e,t){var n=ke();t=t===void 0?null:t;var a=n.memoizedState;if(t!==null&&bu(t,a[1]))return a[0];if(a=e(),ua){Et(!0);try{e()}finally{Et(!1)}}return n.memoizedState=[a,t],a}function Ou(e,t,n){return n===void 0||(en&1073741824)!==0&&(fe&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=jd(),ae.lanes|=e,jn|=e,n)}function js(e,t,n,a){return gt(n,t)?n:Ha.current!==null?(e=Ou(e,n,a),gt(e,t)||(Ve=!0),e):(en&42)===0||(en&1073741824)!==0&&(fe&261930)===0?(Ve=!0,e.memoizedState=n):(e=jd(),ae.lanes|=e,jn|=e,t)}function Ds(e,t,n,a,l){var i=w.p;w.p=i!==0&&8>i?i:8;var o=A.T,u={};A.T=u,wu(e,!1,t,n);try{var c=l(),g=A.S;if(g!==null&&g(u,c),c!==null&&typeof c=="object"&&typeof c.then=="function"){var T=ah(c,a);Ol(e,t,T,Tt(e))}else Ol(e,t,a,Tt(e))}catch(M){Ol(e,t,{then:function(){},status:"rejected",reason:M},Tt())}finally{w.p=i,o!==null&&u.types!==null&&(o.types=u.types),A.T=o}}function ch(){}function Ru(e,t,n,a){if(e.tag!==5)throw Error(s(476));var l=Cs(e).queue;Ds(e,l,t,F,n===null?ch:function(){return Os(e),n(a)})}function Cs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:F,baseState:F,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:tn,lastRenderedState:F},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:tn,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Os(e){var t=Cs(e);t.next===null&&(t=e.alternate.memoizedState),Ol(e,t.next.queue,{},Tt())}function Uu(){return Pe(Jl)}function Rs(){return ke().memoizedState}function Us(){return ke().memoizedState}function sh(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Tt();e=Tn(n);var a=An(t,e,n);a!==null&&(pt(a,t,n),Ml(a,t,n)),t={cache:ru()},e.payload=t;return}t=t.return}}function dh(e,t,n){var a=Tt();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ni(e)?Bs(t,n):(n=Io(e,t,n,a),n!==null&&(pt(n,e,a),qs(n,t,a)))}function ws(e,t,n){var a=Tt();Ol(e,t,n,a)}function Ol(e,t,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ni(e))Bs(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,u=i(o,n);if(l.hasEagerState=!0,l.eagerState=u,gt(u,o))return bi(e,t,l,0),Oe===null&&yi(),!1}catch{}finally{}if(n=Io(e,t,l,a),n!==null)return pt(n,e,a),qs(n,t,a),!0}return!1}function wu(e,t,n,a){if(a={lane:2,revertLane:fr(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Ni(e)){if(t)throw Error(s(479))}else t=Io(e,n,a,2),t!==null&&pt(t,e,2)}function Ni(e){var t=e.alternate;return e===ae||t!==null&&t===ae}function Bs(e,t){La=Ri=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function qs(e,t,n){if((n&4194048)!==0){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,ul(e,n)}}var Rl={readContext:Pe,use:Bi,useCallback:He,useContext:He,useEffect:He,useImperativeHandle:He,useLayoutEffect:He,useInsertionEffect:He,useMemo:He,useReducer:He,useRef:He,useState:He,useDebugValue:He,useDeferredValue:He,useTransition:He,useSyncExternalStore:He,useId:He,useHostTransitionStatus:He,useFormState:He,useActionState:He,useOptimistic:He,useMemoCache:He,useCacheRefresh:He};Rl.useEffectEvent=He;var Hs={readContext:Pe,use:Bi,useCallback:function(e,t){return rt().memoizedState=[e,t===void 0?null:t],e},useContext:Pe,useEffect:xs,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Hi(4194308,4,Es.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Hi(4194308,4,e,t)},useInsertionEffect:function(e,t){Hi(4,2,e,t)},useMemo:function(e,t){var n=rt();t=t===void 0?null:t;var a=e();if(ua){Et(!0);try{e()}finally{Et(!1)}}return n.memoizedState=[a,t],a},useReducer:function(e,t,n){var a=rt();if(n!==void 0){var l=n(t);if(ua){Et(!0);try{n(t)}finally{Et(!1)}}}else l=t;return a.memoizedState=a.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},a.queue=e,e=e.dispatch=dh.bind(null,ae,e),[a.memoizedState,e]},useRef:function(e){var t=rt();return e={current:e},t.memoizedState=e},useState:function(e){e=zu(e);var t=e.queue,n=ws.bind(null,ae,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Cu,useDeferredValue:function(e,t){var n=rt();return Ou(n,e,t)},useTransition:function(){var e=zu(!1);return e=Ds.bind(null,ae,e.queue,!0,!1),rt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var a=ae,l=rt();if(he){if(n===void 0)throw Error(s(407));n=n()}else{if(n=t(),Oe===null)throw Error(s(349));(fe&127)!==0||ls(a,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,xs(os.bind(null,a,i,e),[e]),a.flags|=2048,ka(9,{destroy:void 0},is.bind(null,a,i,n,t),null),n},useId:function(){var e=rt(),t=Oe.identifierPrefix;if(he){var n=Yt,a=Gt;n=(a&~(1<<32-nt(a)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Ui++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=lh++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Uu,useFormState:ps,useActionState:ps,useOptimistic:function(e){var t=rt();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=wu.bind(null,ae,!0,n),n.dispatch=t,[e,t]},useMemoCache:Eu,useCacheRefresh:function(){return rt().memoizedState=sh.bind(null,ae)},useEffectEvent:function(e){var t=rt(),n={impl:e};return t.memoizedState=n,function(){if((xe&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}},Bu={readContext:Pe,use:Bi,useCallback:Ms,useContext:Pe,useEffect:Du,useImperativeHandle:_s,useInsertionEffect:Ts,useLayoutEffect:As,useMemo:zs,useReducer:qi,useRef:bs,useState:function(){return qi(tn)},useDebugValue:Cu,useDeferredValue:function(e,t){var n=ke();return js(n,ze.memoizedState,e,t)},useTransition:function(){var e=qi(tn)[0],t=ke().memoizedState;return[typeof e=="boolean"?e:Cl(e),t]},useSyncExternalStore:as,useId:Rs,useHostTransitionStatus:Uu,useFormState:gs,useActionState:gs,useOptimistic:function(e,t){var n=ke();return cs(n,ze,e,t)},useMemoCache:Eu,useCacheRefresh:Us};Bu.useEffectEvent=Ss;var Ls={readContext:Pe,use:Bi,useCallback:Ms,useContext:Pe,useEffect:Du,useImperativeHandle:_s,useInsertionEffect:Ts,useLayoutEffect:As,useMemo:zs,useReducer:Mu,useRef:bs,useState:function(){return Mu(tn)},useDebugValue:Cu,useDeferredValue:function(e,t){var n=ke();return ze===null?Ou(n,e,t):js(n,ze.memoizedState,e,t)},useTransition:function(){var e=Mu(tn)[0],t=ke().memoizedState;return[typeof e=="boolean"?e:Cl(e),t]},useSyncExternalStore:as,useId:Rs,useHostTransitionStatus:Uu,useFormState:ys,useActionState:ys,useOptimistic:function(e,t){var n=ke();return ze!==null?cs(n,ze,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:Eu,useCacheRefresh:Us};Ls.useEffectEvent=Ss;function qu(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:C({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Hu={enqueueSetState:function(e,t,n){e=e._reactInternals;var a=Tt(),l=Tn(a);l.payload=t,n!=null&&(l.callback=n),t=An(e,l,a),t!==null&&(pt(t,e,a),Ml(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=Tt(),l=Tn(a);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=An(e,l,a),t!==null&&(pt(t,e,a),Ml(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Tt(),a=Tn(n);a.tag=2,t!=null&&(a.callback=t),t=An(e,a,n),t!==null&&(pt(t,e,n),Ml(t,e,n))}};function Ns(e,t,n,a,l,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,i,o):t.prototype&&t.prototype.isPureReactComponent?!yl(n,a)||!yl(l,i):!0}function ks(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&Hu.enqueueReplaceState(t,t.state,null)}function ra(e,t){var n=t;if("ref"in t){n={};for(var a in t)a!=="ref"&&(n[a]=t[a])}if(e=e.defaultProps){n===t&&(n=C({},n));for(var l in e)n[l]===void 0&&(n[l]=e[l])}return n}function Gs(e){vi(e)}function Ys(e){console.error(e)}function Vs(e){vi(e)}function ki(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function Xs(e,t,n){try{var a=e.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Lu(e,t,n){return n=Tn(n),n.tag=3,n.payload={element:null},n.callback=function(){ki(e,t)},n}function Qs(e){return e=Tn(e),e.tag=3,e}function Zs(e,t,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;e.payload=function(){return l(i)},e.callback=function(){Xs(t,n,a)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(e.callback=function(){Xs(t,n,a),typeof l!="function"&&(Dn===null?Dn=new Set([this]):Dn.add(this));var u=a.stack;this.componentDidCatch(a.value,{componentStack:u!==null?u:""})})}function fh(e,t,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=n.alternate,t!==null&&Ra(t,n,l,!0),n=yt.current,n!==null){switch(n.tag){case 31:case 13:return Rt===null?$i():n.alternate===null&&Le===0&&(Le=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===zi?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([a]):t.add(a),cr(e,a,l)),!1;case 22:return n.flags|=65536,a===zi?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([a]):n.add(a)),cr(e,a,l)),!1}throw Error(s(435,n.tag))}return cr(e,a,l),$i(),!1}if(he)return t=yt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=l,a!==au&&(e=Error(s(422),{cause:a}),Sl(jt(e,n)))):(a!==au&&(t=Error(s(423),{cause:a}),Sl(jt(t,n))),e=e.current.alternate,e.flags|=65536,l&=-l,e.lanes|=l,a=jt(a,n),l=Lu(e.stateNode,a,l),hu(e,l),Le!==4&&(Le=2)),!1;var i=Error(s(520),{cause:a});if(i=jt(i,n),kl===null?kl=[i]:kl.push(i),Le!==4&&(Le=2),t===null)return!0;a=jt(a,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=l&-l,n.lanes|=e,e=Lu(n.stateNode,a,e),hu(n,e),!1;case 1:if(t=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(Dn===null||!Dn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=Qs(l),Zs(l,e,n,a),hu(n,l),!1}n=n.return}while(n!==null);return!1}var Nu=Error(s(461)),Ve=!1;function et(e,t,n,a){t.child=e===null?Wc(t,null,n,a):oa(t,e.child,n,a)}function Ks(e,t,n,a,l){n=n.render;var i=t.ref;if("ref"in a){var o={};for(var u in a)u!=="ref"&&(o[u]=a[u])}else o=a;return na(t),a=xu(e,t,n,o,i,l),u=Su(),e!==null&&!Ve?(Tu(e,t,l),nn(e,t,l)):(he&&u&&tu(t),t.flags|=1,et(e,t,a,l),t.child)}function Js(e,t,n,a,l){if(e===null){var i=n.type;return typeof i=="function"&&!$o(i)&&i.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=i,Fs(e,t,i,a,l)):(e=Si(n.type,null,a,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!Ku(e,l)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:yl,n(o,a)&&e.ref===t.ref)return nn(e,t,l)}return t.flags|=1,e=Wt(i,a),e.ref=t.ref,e.return=t,t.child=e}function Fs(e,t,n,a,l){if(e!==null){var i=e.memoizedProps;if(yl(i,a)&&e.ref===t.ref)if(Ve=!1,t.pendingProps=a=i,Ku(e,l))(e.flags&131072)!==0&&(Ve=!0);else return t.lanes=e.lanes,nn(e,t,l)}return ku(e,t,n,a,l)}function Ws(e,t,n,a){var l=a.children,i=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((t.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,e!==null){for(a=t.child=e.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,t.child=null;return Is(e,t,i,n,a)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&_i(t,i!==null?i.cachePool:null),i!==null?Pc(t,i):gu(),es(t);else return a=t.lanes=536870912,Is(e,t,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(_i(t,i.cachePool),Pc(t,i),_n(),t.memoizedState=null):(e!==null&&_i(t,null),gu(),_n());return et(e,t,l,n),t.child}function Ul(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Is(e,t,n,a,l){var i=su();return i=i===null?null:{parent:Ge._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},e!==null&&_i(t,null),gu(),es(t),e!==null&&Ra(e,t,a,!0),t.childLanes=l,null}function Gi(e,t){return t=Vi({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function $s(e,t,n){return oa(t,e.child,null,n),e=Gi(t,t.pendingProps),e.flags|=2,bt(t),t.memoizedState=null,e}function mh(e,t,n){var a=t.pendingProps,l=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(he){if(a.mode==="hidden")return e=Gi(t,a),t.lanes=536870912,Ul(null,e);if(yu(t),(e=Re)?(e=df(e,Ot),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:vn!==null?{id:Gt,overflow:Yt}:null,retryLane:536870912,hydrationErrors:null},n=Bc(e),n.return=t,t.child=n,$e=t,Re=null)):e=null,e===null)throw bn(t);return t.lanes=536870912,null}return Gi(t,a)}var i=e.memoizedState;if(i!==null){var o=i.dehydrated;if(yu(t),l)if(t.flags&256)t.flags&=-257,t=$s(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(s(558));else if(Ve||Ra(e,t,n,!1),l=(n&e.childLanes)!==0,Ve||l){if(a=Oe,a!==null&&(o=rl(a,n),o!==0&&o!==i.retryLane))throw i.retryLane=o,$n(e,o),pt(a,e,o),Nu;$i(),t=$s(e,t,n)}else e=i.treeContext,Re=Ut(o.nextSibling),$e=t,he=!0,yn=null,Ot=!1,e!==null&&Lc(t,e),t=Gi(t,a),t.flags|=4096;return t}return e=Wt(e.child,{mode:a.mode,children:a.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Yi(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(s(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function ku(e,t,n,a,l){return na(t),n=xu(e,t,n,a,void 0,l),a=Su(),e!==null&&!Ve?(Tu(e,t,l),nn(e,t,l)):(he&&a&&tu(t),t.flags|=1,et(e,t,n,l),t.child)}function Ps(e,t,n,a,l,i){return na(t),t.updateQueue=null,n=ns(t,a,n,l),ts(e),a=Su(),e!==null&&!Ve?(Tu(e,t,i),nn(e,t,i)):(he&&a&&tu(t),t.flags|=1,et(e,t,n,i),t.child)}function ed(e,t,n,a,l){if(na(t),t.stateNode===null){var i=ja,o=n.contextType;typeof o=="object"&&o!==null&&(i=Pe(o)),i=new n(a,i),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Hu,t.stateNode=i,i._reactInternals=t,i=t.stateNode,i.props=a,i.state=t.memoizedState,i.refs={},fu(t),o=n.contextType,i.context=typeof o=="object"&&o!==null?Pe(o):ja,i.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o=="function"&&(qu(t,n,o,a),i.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(o=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),o!==i.state&&Hu.enqueueReplaceState(i,i.state,null),jl(t,a,i,l),zl(),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(e===null){i=t.stateNode;var u=t.memoizedProps,c=ra(n,u);i.props=c;var g=i.context,T=n.contextType;o=ja,typeof T=="object"&&T!==null&&(o=Pe(T));var M=n.getDerivedStateFromProps;T=typeof M=="function"||typeof i.getSnapshotBeforeUpdate=="function",u=t.pendingProps!==u,T||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u||g!==o)&&ks(t,i,a,o),Sn=!1;var v=t.memoizedState;i.state=v,jl(t,a,i,l),zl(),g=t.memoizedState,u||v!==g||Sn?(typeof M=="function"&&(qu(t,n,M,a),g=t.memoizedState),(c=Sn||Ns(t,n,c,a,v,g,o))?(T||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=g),i.props=a,i.state=g,i.context=o,a=c):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,mu(e,t),o=t.memoizedProps,T=ra(n,o),i.props=T,M=t.pendingProps,v=i.context,g=n.contextType,c=ja,typeof g=="object"&&g!==null&&(c=Pe(g)),u=n.getDerivedStateFromProps,(g=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o!==M||v!==c)&&ks(t,i,a,c),Sn=!1,v=t.memoizedState,i.state=v,jl(t,a,i,l),zl();var S=t.memoizedState;o!==M||v!==S||Sn||e!==null&&e.dependencies!==null&&Ai(e.dependencies)?(typeof u=="function"&&(qu(t,n,u,a),S=t.memoizedState),(T=Sn||Ns(t,n,T,a,v,S,c)||e!==null&&e.dependencies!==null&&Ai(e.dependencies))?(g||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,S,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,S,c)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||o===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=S),i.props=a,i.state=S,i.context=c,a=T):(typeof i.componentDidUpdate!="function"||o===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),a=!1)}return i=a,Yi(e,t),a=(t.flags&128)!==0,i||a?(i=t.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),t.flags|=1,e!==null&&a?(t.child=oa(t,e.child,null,l),t.child=oa(t,null,n,l)):et(e,t,n,l),t.memoizedState=i.state,e=t.child):e=nn(e,t,l),e}function td(e,t,n,a){return ea(),t.flags|=256,et(e,t,n,a),t.child}var Gu={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Yu(e){return{baseLanes:e,cachePool:Xc()}}function Vu(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=St),e}function nd(e,t,n){var a=t.pendingProps,l=!1,i=(t.flags&128)!==0,o;if((o=i)||(o=e!==null&&e.memoizedState===null?!1:(Ne.current&2)!==0),o&&(l=!0,t.flags&=-129),o=(t.flags&32)!==0,t.flags&=-33,e===null){if(he){if(l?En(t):_n(),(e=Re)?(e=df(e,Ot),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:vn!==null?{id:Gt,overflow:Yt}:null,retryLane:536870912,hydrationErrors:null},n=Bc(e),n.return=t,t.child=n,$e=t,Re=null)):e=null,e===null)throw bn(t);return _r(e)?t.lanes=32:t.lanes=536870912,null}var u=a.children;return a=a.fallback,l?(_n(),l=t.mode,u=Vi({mode:"hidden",children:u},l),a=Pn(a,l,n,null),u.return=t,a.return=t,u.sibling=a,t.child=u,a=t.child,a.memoizedState=Yu(n),a.childLanes=Vu(e,o,n),t.memoizedState=Gu,Ul(null,a)):(En(t),Xu(t,u))}var c=e.memoizedState;if(c!==null&&(u=c.dehydrated,u!==null)){if(i)t.flags&256?(En(t),t.flags&=-257,t=Qu(e,t,n)):t.memoizedState!==null?(_n(),t.child=e.child,t.flags|=128,t=null):(_n(),u=a.fallback,l=t.mode,a=Vi({mode:"visible",children:a.children},l),u=Pn(u,l,n,null),u.flags|=2,a.return=t,u.return=t,a.sibling=u,t.child=a,oa(t,e.child,null,n),a=t.child,a.memoizedState=Yu(n),a.childLanes=Vu(e,o,n),t.memoizedState=Gu,t=Ul(null,a));else if(En(t),_r(u)){if(o=u.nextSibling&&u.nextSibling.dataset,o)var g=o.dgst;o=g,a=Error(s(419)),a.stack="",a.digest=o,Sl({value:a,source:null,stack:null}),t=Qu(e,t,n)}else if(Ve||Ra(e,t,n,!1),o=(n&e.childLanes)!==0,Ve||o){if(o=Oe,o!==null&&(a=rl(o,n),a!==0&&a!==c.retryLane))throw c.retryLane=a,$n(e,a),pt(o,e,a),Nu;Er(u)||$i(),t=Qu(e,t,n)}else Er(u)?(t.flags|=192,t.child=e.child,t=null):(e=c.treeContext,Re=Ut(u.nextSibling),$e=t,he=!0,yn=null,Ot=!1,e!==null&&Lc(t,e),t=Xu(t,a.children),t.flags|=4096);return t}return l?(_n(),u=a.fallback,l=t.mode,c=e.child,g=c.sibling,a=Wt(c,{mode:"hidden",children:a.children}),a.subtreeFlags=c.subtreeFlags&65011712,g!==null?u=Wt(g,u):(u=Pn(u,l,n,null),u.flags|=2),u.return=t,a.return=t,a.sibling=u,t.child=a,Ul(null,a),a=t.child,u=e.child.memoizedState,u===null?u=Yu(n):(l=u.cachePool,l!==null?(c=Ge._currentValue,l=l.parent!==c?{parent:c,pool:c}:l):l=Xc(),u={baseLanes:u.baseLanes|n,cachePool:l}),a.memoizedState=u,a.childLanes=Vu(e,o,n),t.memoizedState=Gu,Ul(e.child,a)):(En(t),n=e.child,e=n.sibling,n=Wt(n,{mode:"visible",children:a.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Xu(e,t){return t=Vi({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Vi(e,t){return e=vt(22,e,null,t),e.lanes=0,e}function Qu(e,t,n){return oa(t,e.child,null,n),e=Xu(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function ad(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),ou(e.return,t,n)}function Zu(e,t,n,a,l,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=a,o.tail=n,o.tailMode=l,o.treeForkCount=i)}function ld(e,t,n){var a=t.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var o=Ne.current,u=(o&2)!==0;if(u?(o=o&1|2,t.flags|=128):o&=1,B(Ne,o),et(e,t,a,n),a=he?xl:0,!u&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ad(e,n,t);else if(e.tag===19)ad(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&Oi(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Zu(t,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Oi(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Zu(t,!0,n,null,i,a);break;case"together":Zu(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function nn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),jn|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Ra(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(s(153));if(t.child!==null){for(e=t.child,n=Wt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Wt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Ku(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Ai(e)))}function hh(e,t,n){switch(t.tag){case 3:Qe(t,t.stateNode.containerInfo),xn(t,Ge,e.memoizedState.cache),ea();break;case 27:case 5:Nn(t);break;case 4:Qe(t,t.stateNode.containerInfo);break;case 10:xn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,yu(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(En(t),t.flags|=128,null):(n&t.child.childLanes)!==0?nd(e,t,n):(En(t),e=nn(e,t,n),e!==null?e.sibling:null);En(t);break;case 19:var l=(e.flags&128)!==0;if(a=(n&t.childLanes)!==0,a||(Ra(e,t,n,!1),a=(n&t.childLanes)!==0),l){if(a)return ld(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),B(Ne,Ne.current),a)break;return null;case 22:return t.lanes=0,Ws(e,t,n,t.pendingProps);case 24:xn(t,Ge,e.memoizedState.cache)}return nn(e,t,n)}function id(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Ve=!0;else{if(!Ku(e,n)&&(t.flags&128)===0)return Ve=!1,hh(e,t,n);Ve=(e.flags&131072)!==0}else Ve=!1,he&&(t.flags&1048576)!==0&&Hc(t,xl,t.index);switch(t.lanes=0,t.tag){case 16:e:{var a=t.pendingProps;if(e=la(t.elementType),t.type=e,typeof e=="function")$o(e)?(a=ra(e,a),t.tag=1,t=ed(null,t,e,a,n)):(t.tag=0,t=ku(null,t,e,a,n));else{if(e!=null){var l=e.$$typeof;if(l===J){t.tag=11,t=Ks(null,t,e,a,n);break e}else if(l===K){t.tag=14,t=Js(null,t,e,a,n);break e}}throw t=Bt(e)||e,Error(s(306,t,""))}}return t;case 0:return ku(e,t,t.type,t.pendingProps,n);case 1:return a=t.type,l=ra(a,t.pendingProps),ed(e,t,a,l,n);case 3:e:{if(Qe(t,t.stateNode.containerInfo),e===null)throw Error(s(387));a=t.pendingProps;var i=t.memoizedState;l=i.element,mu(e,t),jl(t,a,null,n);var o=t.memoizedState;if(a=o.cache,xn(t,Ge,a),a!==i.cache&&uu(t,[Ge],n,!0),zl(),a=o.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){t=td(e,t,a,n);break e}else if(a!==l){l=jt(Error(s(424)),t),Sl(l),t=td(e,t,a,n);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Re=Ut(e.firstChild),$e=t,he=!0,yn=null,Ot=!0,n=Wc(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(ea(),a===l){t=nn(e,t,n);break e}et(e,t,a,n)}t=t.child}return t;case 26:return Yi(e,t),e===null?(n=vf(t.type,null,t.pendingProps,null))?t.memoizedState=n:he||(n=t.type,e=t.pendingProps,a=io(oe.current).createElement(n),a[pe]=t,a[Ce]=e,tt(a,n,e),Je(a),t.stateNode=a):t.memoizedState=vf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Nn(t),e===null&&he&&(a=t.stateNode=hf(t.type,t.pendingProps,oe.current),$e=t,Ot=!0,l=Re,Un(t.type)?(Mr=l,Re=Ut(a.firstChild)):Re=l),et(e,t,t.pendingProps.children,n),Yi(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&he&&((l=a=Re)&&(a=Xh(a,t.type,t.pendingProps,Ot),a!==null?(t.stateNode=a,$e=t,Re=Ut(a.firstChild),Ot=!1,l=!0):l=!1),l||bn(t)),Nn(t),l=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,a=i.children,Sr(l,i)?a=null:o!==null&&Sr(l,o)&&(t.flags|=32),t.memoizedState!==null&&(l=xu(e,t,ih,null,null,n),Jl._currentValue=l),Yi(e,t),et(e,t,a,n),t.child;case 6:return e===null&&he&&((e=n=Re)&&(n=Qh(n,t.pendingProps,Ot),n!==null?(t.stateNode=n,$e=t,Re=null,e=!0):e=!1),e||bn(t)),null;case 13:return nd(e,t,n);case 4:return Qe(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=oa(t,null,a,n):et(e,t,a,n),t.child;case 11:return Ks(e,t,t.type,t.pendingProps,n);case 7:return et(e,t,t.pendingProps,n),t.child;case 8:return et(e,t,t.pendingProps.children,n),t.child;case 12:return et(e,t,t.pendingProps.children,n),t.child;case 10:return a=t.pendingProps,xn(t,t.type,a.value),et(e,t,a.children,n),t.child;case 9:return l=t.type._context,a=t.pendingProps.children,na(t),l=Pe(l),a=a(l),t.flags|=1,et(e,t,a,n),t.child;case 14:return Js(e,t,t.type,t.pendingProps,n);case 15:return Fs(e,t,t.type,t.pendingProps,n);case 19:return ld(e,t,n);case 31:return mh(e,t,n);case 22:return Ws(e,t,n,t.pendingProps);case 24:return na(t),a=Pe(Ge),e===null?(l=su(),l===null&&(l=Oe,i=ru(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),t.memoizedState={parent:a,cache:l},fu(t),xn(t,Ge,l)):((e.lanes&n)!==0&&(mu(e,t),jl(t,null,null,n),zl()),l=e.memoizedState,i=t.memoizedState,l.parent!==a?(l={parent:a,cache:a},t.memoizedState=l,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=l),xn(t,Ge,a)):(a=i.cache,xn(t,Ge,a),a!==l.cache&&uu(t,[Ge],n,!0))),et(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(s(156,t.tag))}function an(e){e.flags|=4}function Ju(e,t,n,a,l){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(l&335544128)===l)if(e.stateNode.complete)e.flags|=8192;else if(Rd())e.flags|=8192;else throw ia=zi,du}else e.flags&=-16777217}function od(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Tf(t))if(Rd())e.flags|=8192;else throw ia=zi,du}function Xi(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?il():536870912,e.lanes|=t,Xa|=t)}function wl(e,t){if(!he)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function Ue(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function ph(e,t,n){var a=t.pendingProps;switch(nu(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ue(t),null;case 1:return Ue(t),null;case 3:return n=t.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Pt(Ge),we(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Oa(t)?an(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,lu())),Ue(t),null;case 26:var l=t.type,i=t.memoizedState;return e===null?(an(t),i!==null?(Ue(t),od(t,i)):(Ue(t),Ju(t,l,null,a,n))):i?i!==e.memoizedState?(an(t),Ue(t),od(t,i)):(Ue(t),t.flags&=-16777217):(e=e.memoizedProps,e!==a&&an(t),Ue(t),Ju(t,l,e,a,n)),null;case 27:if(fa(t),n=oe.current,l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&an(t);else{if(!a){if(t.stateNode===null)throw Error(s(166));return Ue(t),null}e=k.current,Oa(t)?Nc(t):(e=hf(l,a,n),t.stateNode=e,an(t))}return Ue(t),null;case 5:if(fa(t),l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&an(t);else{if(!a){if(t.stateNode===null)throw Error(s(166));return Ue(t),null}if(i=k.current,Oa(t))Nc(t);else{var o=io(oe.current);switch(i){case 1:i=o.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=o.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=o.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=o.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=o.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?o.createElement("select",{is:a.is}):o.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?o.createElement(l,{is:a.is}):o.createElement(l)}}i[pe]=t,i[Ce]=a;e:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)i.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break e;for(;o.sibling===null;){if(o.return===null||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=i;e:switch(tt(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}a&&an(t)}}return Ue(t),Ju(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==a&&an(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(s(166));if(e=oe.current,Oa(t)){if(e=t.stateNode,n=t.memoizedProps,a=null,l=$e,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}e[pe]=t,e=!!(e.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||nf(e.nodeValue,n)),e||bn(t,!0)}else e=io(e).createTextNode(a),e[pe]=t,t.stateNode=e}return Ue(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(a=Oa(t),n!==null){if(e===null){if(!a)throw Error(s(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[pe]=t}else ea(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ue(t),e=!1}else n=lu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(bt(t),t):(bt(t),null);if((t.flags&128)!==0)throw Error(s(558))}return Ue(t),null;case 13:if(a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(l=Oa(t),a!==null&&a.dehydrated!==null){if(e===null){if(!l)throw Error(s(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(s(317));l[pe]=t}else ea(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ue(t),l=!1}else l=lu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),l=!0;if(!l)return t.flags&256?(bt(t),t):(bt(t),null)}return bt(t),(t.flags&128)!==0?(t.lanes=n,t):(n=a!==null,e=e!==null&&e.memoizedState!==null,n&&(a=t.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Xi(t,t.updateQueue),Ue(t),null);case 4:return we(),e===null&&gr(t.stateNode.containerInfo),Ue(t),null;case 10:return Pt(t.type),Ue(t),null;case 19:if(j(Ne),a=t.memoizedState,a===null)return Ue(t),null;if(l=(t.flags&128)!==0,i=a.rendering,i===null)if(l)wl(a,!1);else{if(Le!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=Oi(e),i!==null){for(t.flags|=128,wl(a,!1),e=i.updateQueue,t.updateQueue=e,Xi(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)wc(n,e),n=n.sibling;return B(Ne,Ne.current&1|2),he&&It(t,a.treeForkCount),t.child}e=e.sibling}a.tail!==null&&Ie()>Fi&&(t.flags|=128,l=!0,wl(a,!1),t.lanes=4194304)}else{if(!l)if(e=Oi(i),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,Xi(t,e),wl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!he)return Ue(t),null}else 2*Ie()-a.renderingStartTime>Fi&&n!==536870912&&(t.flags|=128,l=!0,wl(a,!1),t.lanes=4194304);a.isBackwards?(i.sibling=t.child,t.child=i):(e=a.last,e!==null?e.sibling=i:t.child=i,a.last=i)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=Ie(),e.sibling=null,n=Ne.current,B(Ne,l?n&1|2:n&1),he&&It(t,a.treeForkCount),e):(Ue(t),null);case 22:case 23:return bt(t),vu(),a=t.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?(n&536870912)!==0&&(t.flags&128)===0&&(Ue(t),t.subtreeFlags&6&&(t.flags|=8192)):Ue(t),n=t.updateQueue,n!==null&&Xi(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==n&&(t.flags|=2048),e!==null&&j(aa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Pt(Ge),Ue(t),null;case 25:return null;case 30:return null}throw Error(s(156,t.tag))}function gh(e,t){switch(nu(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Pt(Ge),we(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return fa(t),null;case 31:if(t.memoizedState!==null){if(bt(t),t.alternate===null)throw Error(s(340));ea()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(bt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(s(340));ea()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return j(Ne),null;case 4:return we(),null;case 10:return Pt(t.type),null;case 22:case 23:return bt(t),vu(),e!==null&&j(aa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Pt(Ge),null;case 25:return null;default:return null}}function ud(e,t){switch(nu(t),t.tag){case 3:Pt(Ge),we();break;case 26:case 27:case 5:fa(t);break;case 4:we();break;case 31:t.memoizedState!==null&&bt(t);break;case 13:bt(t);break;case 19:j(Ne);break;case 10:Pt(t.type);break;case 22:case 23:bt(t),vu(),e!==null&&j(aa);break;case 24:Pt(Ge)}}function Bl(e,t){try{var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&e)===e){a=void 0;var i=n.create,o=n.inst;a=i(),o.destroy=a}n=n.next}while(n!==l)}}catch(u){Me(t,t.return,u)}}function Mn(e,t,n){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&e)===e){var o=a.inst,u=o.destroy;if(u!==void 0){o.destroy=void 0,l=t;var c=n,g=u;try{g()}catch(T){Me(l,c,T)}}}a=a.next}while(a!==i)}}catch(T){Me(t,t.return,T)}}function rd(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{$c(t,n)}catch(a){Me(e,e.return,a)}}}function cd(e,t,n){n.props=ra(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(a){Me(e,t,a)}}function ql(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof n=="function"?e.refCleanup=n(a):n.current=a}}catch(l){Me(e,t,l)}}function Vt(e,t){var n=e.ref,a=e.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){Me(e,t,l)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){Me(e,t,l)}else n.current=null}function sd(e){var t=e.type,n=e.memoizedProps,a=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break e;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){Me(e,e.return,l)}}function Fu(e,t,n){try{var a=e.stateNode;Lh(a,e.type,n,t),a[Ce]=t}catch(l){Me(e,e.return,l)}}function dd(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Un(e.type)||e.tag===4}function Wu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||dd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Un(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Iu(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Jt));else if(a!==4&&(a===27&&Un(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Iu(e,t,n),e=e.sibling;e!==null;)Iu(e,t,n),e=e.sibling}function Qi(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(a===27&&Un(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Qi(e,t,n),e=e.sibling;e!==null;)Qi(e,t,n),e=e.sibling}function fd(e){var t=e.stateNode,n=e.memoizedProps;try{for(var a=e.type,l=t.attributes;l.length;)t.removeAttributeNode(l[0]);tt(t,a,n),t[pe]=e,t[Ce]=n}catch(i){Me(e,e.return,i)}}var ln=!1,Xe=!1,$u=!1,md=typeof WeakSet=="function"?WeakSet:Set,Fe=null;function vh(e,t){if(e=e.containerInfo,br=mo,e=_c(e),Qo(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,u=-1,c=-1,g=0,T=0,M=e,v=null;t:for(;;){for(var S;M!==n||l!==0&&M.nodeType!==3||(u=o+l),M!==i||a!==0&&M.nodeType!==3||(c=o+a),M.nodeType===3&&(o+=M.nodeValue.length),(S=M.firstChild)!==null;)v=M,M=S;for(;;){if(M===e)break t;if(v===n&&++g===l&&(u=o),v===i&&++T===a&&(c=o),(S=M.nextSibling)!==null)break;M=v,v=M.parentNode}M=S}n=u===-1||c===-1?null:{start:u,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(xr={focusedElem:e,selectionRange:n},mo=!1,Fe=t;Fe!==null;)if(t=Fe,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Fe=e;else for(;Fe!==null;){switch(t=Fe,i=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)l=e[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&i!==null){e=void 0,n=t,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var N=ra(n.type,l);e=a.getSnapshotBeforeUpdate(N,i),a.__reactInternalSnapshotBeforeUpdate=e}catch(W){Me(n,n.return,W)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)Ar(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Ar(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=t.sibling,e!==null){e.return=t.return,Fe=e;break}Fe=t.return}}function hd(e,t,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:un(e,n),a&4&&Bl(5,n);break;case 1:if(un(e,n),a&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(o){Me(n,n.return,o)}else{var l=ra(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(l,t,e.__reactInternalSnapshotBeforeUpdate)}catch(o){Me(n,n.return,o)}}a&64&&rd(n),a&512&&ql(n,n.return);break;case 3:if(un(e,n),a&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{$c(e,t)}catch(o){Me(n,n.return,o)}}break;case 27:t===null&&a&4&&fd(n);case 26:case 5:un(e,n),t===null&&a&4&&sd(n),a&512&&ql(n,n.return);break;case 12:un(e,n);break;case 31:un(e,n),a&4&&vd(e,n);break;case 13:un(e,n),a&4&&yd(e,n),a&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Mh.bind(null,n),Zh(e,n))));break;case 22:if(a=n.memoizedState!==null||ln,!a){t=t!==null&&t.memoizedState!==null||Xe,l=ln;var i=Xe;ln=a,(Xe=t)&&!i?rn(e,n,(n.subtreeFlags&8772)!==0):un(e,n),ln=l,Xe=i}break;case 30:break;default:un(e,n)}}function pd(e){var t=e.alternate;t!==null&&(e.alternate=null,pd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&jo(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Be=null,dt=!1;function on(e,t,n){for(n=n.child;n!==null;)gd(e,t,n),n=n.sibling}function gd(e,t,n){if(qe&&typeof qe.onCommitFiberUnmount=="function")try{qe.onCommitFiberUnmount(fn,n)}catch{}switch(n.tag){case 26:Xe||Vt(n,t),on(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Xe||Vt(n,t);var a=Be,l=dt;Un(n.type)&&(Be=n.stateNode,dt=!1),on(e,t,n),Ql(n.stateNode),Be=a,dt=l;break;case 5:Xe||Vt(n,t);case 6:if(a=Be,l=dt,Be=null,on(e,t,n),Be=a,dt=l,Be!==null)if(dt)try{(Be.nodeType===9?Be.body:Be.nodeName==="HTML"?Be.ownerDocument.body:Be).removeChild(n.stateNode)}catch(i){Me(n,t,i)}else try{Be.removeChild(n.stateNode)}catch(i){Me(n,t,i)}break;case 18:Be!==null&&(dt?(e=Be,cf(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),$a(e)):cf(Be,n.stateNode));break;case 4:a=Be,l=dt,Be=n.stateNode.containerInfo,dt=!0,on(e,t,n),Be=a,dt=l;break;case 0:case 11:case 14:case 15:Mn(2,n,t),Xe||Mn(4,n,t),on(e,t,n);break;case 1:Xe||(Vt(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"&&cd(n,t,a)),on(e,t,n);break;case 21:on(e,t,n);break;case 22:Xe=(a=Xe)||n.memoizedState!==null,on(e,t,n),Xe=a;break;default:on(e,t,n)}}function vd(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{$a(e)}catch(n){Me(t,t.return,n)}}}function yd(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{$a(e)}catch(n){Me(t,t.return,n)}}function yh(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new md),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new md),t;default:throw Error(s(435,e.tag))}}function Zi(e,t){var n=yh(e);t.forEach(function(a){if(!n.has(a)){n.add(a);var l=zh.bind(null,e,a);a.then(l,l)}})}function ft(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=e,o=t,u=o;e:for(;u!==null;){switch(u.tag){case 27:if(Un(u.type)){Be=u.stateNode,dt=!1;break e}break;case 5:Be=u.stateNode,dt=!1;break e;case 3:case 4:Be=u.stateNode.containerInfo,dt=!0;break e}u=u.return}if(Be===null)throw Error(s(160));gd(i,o,l),Be=null,dt=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)bd(t,e),t=t.sibling}var Ht=null;function bd(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:ft(t,e),mt(e),a&4&&(Mn(3,e,e.return),Bl(3,e),Mn(5,e,e.return));break;case 1:ft(t,e),mt(e),a&512&&(Xe||n===null||Vt(n,n.return)),a&64&&ln&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=Ht;if(ft(t,e),mt(e),a&512&&(Xe||n===null||Vt(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=e.memoizedState,n===null)if(a===null)if(e.stateNode===null){e:{a=e.type,n=e.memoizedProps,l=l.ownerDocument||l;t:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[cl]||i[pe]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),tt(i,a,n),i[pe]=e,Je(i),a=i;break e;case"link":var o=xf("link","href",l).get(a+(n.href||""));if(o){for(var u=0;u<o.length;u++)if(i=o[u],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(u,1);break t}}i=l.createElement(a),tt(i,a,n),l.head.appendChild(i);break;case"meta":if(o=xf("meta","content",l).get(a+(n.content||""))){for(u=0;u<o.length;u++)if(i=o[u],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){o.splice(u,1);break t}}i=l.createElement(a),tt(i,a,n),l.head.appendChild(i);break;default:throw Error(s(468,a))}i[pe]=e,Je(i),a=i}e.stateNode=a}else Sf(l,e.type,e.stateNode);else e.stateNode=bf(l,a,e.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?Sf(l,e.type,e.stateNode):bf(l,a,e.memoizedProps)):a===null&&e.stateNode!==null&&Fu(e,e.memoizedProps,n.memoizedProps)}break;case 27:ft(t,e),mt(e),a&512&&(Xe||n===null||Vt(n,n.return)),n!==null&&a&4&&Fu(e,e.memoizedProps,n.memoizedProps);break;case 5:if(ft(t,e),mt(e),a&512&&(Xe||n===null||Vt(n,n.return)),e.flags&32){l=e.stateNode;try{Sa(l,"")}catch(N){Me(e,e.return,N)}}a&4&&e.stateNode!=null&&(l=e.memoizedProps,Fu(e,l,n!==null?n.memoizedProps:l)),a&1024&&($u=!0);break;case 6:if(ft(t,e),mt(e),a&4){if(e.stateNode===null)throw Error(s(162));a=e.memoizedProps,n=e.stateNode;try{n.nodeValue=a}catch(N){Me(e,e.return,N)}}break;case 3:if(ro=null,l=Ht,Ht=oo(t.containerInfo),ft(t,e),Ht=l,mt(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{$a(t.containerInfo)}catch(N){Me(e,e.return,N)}$u&&($u=!1,xd(e));break;case 4:a=Ht,Ht=oo(e.stateNode.containerInfo),ft(t,e),mt(e),Ht=a;break;case 12:ft(t,e),mt(e);break;case 31:ft(t,e),mt(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Zi(e,a)));break;case 13:ft(t,e),mt(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Ji=Ie()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Zi(e,a)));break;case 22:l=e.memoizedState!==null;var c=n!==null&&n.memoizedState!==null,g=ln,T=Xe;if(ln=g||l,Xe=T||c,ft(t,e),Xe=T,ln=g,mt(e),a&8192)e:for(t=e.stateNode,t._visibility=l?t._visibility&-2:t._visibility|1,l&&(n===null||c||ln||Xe||ca(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){c=n=t;try{if(i=c.stateNode,l)o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none";else{u=c.stateNode;var M=c.memoizedProps.style,v=M!=null&&M.hasOwnProperty("display")?M.display:null;u.style.display=v==null||typeof v=="boolean"?"":(""+v).trim()}}catch(N){Me(c,c.return,N)}}}else if(t.tag===6){if(n===null){c=t;try{c.stateNode.nodeValue=l?"":c.memoizedProps}catch(N){Me(c,c.return,N)}}}else if(t.tag===18){if(n===null){c=t;try{var S=c.stateNode;l?sf(S,!0):sf(c.stateNode,!1)}catch(N){Me(c,c.return,N)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=e.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Zi(e,n))));break;case 19:ft(t,e),mt(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Zi(e,a)));break;case 30:break;case 21:break;default:ft(t,e),mt(e)}}function mt(e){var t=e.flags;if(t&2){try{for(var n,a=e.return;a!==null;){if(dd(a)){n=a;break}a=a.return}if(n==null)throw Error(s(160));switch(n.tag){case 27:var l=n.stateNode,i=Wu(e);Qi(e,i,l);break;case 5:var o=n.stateNode;n.flags&32&&(Sa(o,""),n.flags&=-33);var u=Wu(e);Qi(e,u,o);break;case 3:case 4:var c=n.stateNode.containerInfo,g=Wu(e);Iu(e,g,c);break;default:throw Error(s(161))}}catch(T){Me(e,e.return,T)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function xd(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;xd(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function un(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)hd(e,t.alternate,t),t=t.sibling}function ca(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Mn(4,t,t.return),ca(t);break;case 1:Vt(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&cd(t,t.return,n),ca(t);break;case 27:Ql(t.stateNode);case 26:case 5:Vt(t,t.return),ca(t);break;case 22:t.memoizedState===null&&ca(t);break;case 30:ca(t);break;default:ca(t)}e=e.sibling}}function rn(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,l=e,i=t,o=i.flags;switch(i.tag){case 0:case 11:case 15:rn(l,i,n),Bl(4,i);break;case 1:if(rn(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(g){Me(a,a.return,g)}if(a=i,l=a.updateQueue,l!==null){var u=a.stateNode;try{var c=l.shared.hiddenCallbacks;if(c!==null)for(l.shared.hiddenCallbacks=null,l=0;l<c.length;l++)Ic(c[l],u)}catch(g){Me(a,a.return,g)}}n&&o&64&&rd(i),ql(i,i.return);break;case 27:fd(i);case 26:case 5:rn(l,i,n),n&&a===null&&o&4&&sd(i),ql(i,i.return);break;case 12:rn(l,i,n);break;case 31:rn(l,i,n),n&&o&4&&vd(l,i);break;case 13:rn(l,i,n),n&&o&4&&yd(l,i);break;case 22:i.memoizedState===null&&rn(l,i,n),ql(i,i.return);break;case 30:break;default:rn(l,i,n)}t=t.sibling}}function Pu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Tl(n))}function er(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Tl(e))}function Lt(e,t,n,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Sd(e,t,n,a),t=t.sibling}function Sd(e,t,n,a){var l=t.flags;switch(t.tag){case 0:case 11:case 15:Lt(e,t,n,a),l&2048&&Bl(9,t);break;case 1:Lt(e,t,n,a);break;case 3:Lt(e,t,n,a),l&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Tl(e)));break;case 12:if(l&2048){Lt(e,t,n,a),e=t.stateNode;try{var i=t.memoizedProps,o=i.id,u=i.onPostCommit;typeof u=="function"&&u(o,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(c){Me(t,t.return,c)}}else Lt(e,t,n,a);break;case 31:Lt(e,t,n,a);break;case 13:Lt(e,t,n,a);break;case 23:break;case 22:i=t.stateNode,o=t.alternate,t.memoizedState!==null?i._visibility&2?Lt(e,t,n,a):Hl(e,t):i._visibility&2?Lt(e,t,n,a):(i._visibility|=2,Ga(e,t,n,a,(t.subtreeFlags&10256)!==0||!1)),l&2048&&Pu(o,t);break;case 24:Lt(e,t,n,a),l&2048&&er(t.alternate,t);break;default:Lt(e,t,n,a)}}function Ga(e,t,n,a,l){for(l=l&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var i=e,o=t,u=n,c=a,g=o.flags;switch(o.tag){case 0:case 11:case 15:Ga(i,o,u,c,l),Bl(8,o);break;case 23:break;case 22:var T=o.stateNode;o.memoizedState!==null?T._visibility&2?Ga(i,o,u,c,l):Hl(i,o):(T._visibility|=2,Ga(i,o,u,c,l)),l&&g&2048&&Pu(o.alternate,o);break;case 24:Ga(i,o,u,c,l),l&&g&2048&&er(o.alternate,o);break;default:Ga(i,o,u,c,l)}t=t.sibling}}function Hl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,a=t,l=a.flags;switch(a.tag){case 22:Hl(n,a),l&2048&&Pu(a.alternate,a);break;case 24:Hl(n,a),l&2048&&er(a.alternate,a);break;default:Hl(n,a)}t=t.sibling}}var Ll=8192;function Ya(e,t,n){if(e.subtreeFlags&Ll)for(e=e.child;e!==null;)Td(e,t,n),e=e.sibling}function Td(e,t,n){switch(e.tag){case 26:Ya(e,t,n),e.flags&Ll&&e.memoizedState!==null&&lp(n,Ht,e.memoizedState,e.memoizedProps);break;case 5:Ya(e,t,n);break;case 3:case 4:var a=Ht;Ht=oo(e.stateNode.containerInfo),Ya(e,t,n),Ht=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=Ll,Ll=16777216,Ya(e,t,n),Ll=a):Ya(e,t,n));break;default:Ya(e,t,n)}}function Ad(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Nl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];Fe=a,_d(a,e)}Ad(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ed(e),e=e.sibling}function Ed(e){switch(e.tag){case 0:case 11:case 15:Nl(e),e.flags&2048&&Mn(9,e,e.return);break;case 3:Nl(e);break;case 12:Nl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ki(e)):Nl(e);break;default:Nl(e)}}function Ki(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];Fe=a,_d(a,e)}Ad(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Mn(8,t,t.return),Ki(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ki(t));break;default:Ki(t)}e=e.sibling}}function _d(e,t){for(;Fe!==null;){var n=Fe;switch(n.tag){case 0:case 11:case 15:Mn(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:Tl(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Fe=a;else e:for(n=e;Fe!==null;){a=Fe;var l=a.sibling,i=a.return;if(pd(a),a===n){Fe=null;break e}if(l!==null){l.return=i,Fe=l;break e}Fe=i}}}var bh={getCacheForType:function(e){var t=Pe(Ge),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Pe(Ge).controller.signal}},xh=typeof WeakMap=="function"?WeakMap:Map,xe=0,Oe=null,se=null,fe=0,_e=0,xt=null,zn=!1,Va=!1,tr=!1,cn=0,Le=0,jn=0,sa=0,nr=0,St=0,Xa=0,kl=null,ht=null,ar=!1,Ji=0,Md=0,Fi=1/0,Wi=null,Dn=null,Ze=0,Cn=null,Qa=null,sn=0,lr=0,ir=null,zd=null,Gl=0,or=null;function Tt(){return(xe&2)!==0&&fe!==0?fe&-fe:A.T!==null?fr():ne()}function jd(){if(St===0)if((fe&536870912)===0||he){var e=Qn;Qn<<=1,(Qn&3932160)===0&&(Qn=262144),St=e}else St=536870912;return e=yt.current,e!==null&&(e.flags|=32),St}function pt(e,t,n){(e===Oe&&(_e===2||_e===9)||e.cancelPendingCommit!==null)&&(Za(e,0),On(e,fe,St,!1)),hn(e,n),((xe&2)===0||e!==Oe)&&(e===Oe&&((xe&2)===0&&(sa|=n),Le===4&&On(e,fe,St,!1)),Xt(e))}function Dd(e,t,n){if((xe&6)!==0)throw Error(s(327));var a=!n&&(t&127)===0&&(t&e.expiredLanes)===0||mn(e,t),l=a?Ah(e,t):rr(e,t,!0),i=a;do{if(l===0){Va&&!a&&On(e,t,0,!1);break}else{if(n=e.current.alternate,i&&!Sh(n)){l=rr(e,t,!1),i=!1;continue}if(l===2){if(i=t,e.errorRecoveryDisabledLanes&i)var o=0;else o=e.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){t=o;e:{var u=e;l=kl;var c=u.current.memoizedState.isDehydrated;if(c&&(Za(u,o).flags|=256),o=rr(u,o,!1),o!==2){if(tr&&!c){u.errorRecoveryDisabledLanes|=i,sa|=i,l=4;break e}i=ht,ht=l,i!==null&&(ht===null?ht=i:ht.push.apply(ht,i))}l=o}if(i=!1,l!==2)continue}}if(l===1){Za(e,0),On(e,t,0,!0);break}e:{switch(a=e,i=l,i){case 0:case 1:throw Error(s(345));case 4:if((t&4194048)!==t)break;case 6:On(a,t,St,!zn);break e;case 2:ht=null;break;case 3:case 5:break;default:throw Error(s(329))}if((t&62914560)===t&&(l=Ji+300-Ie(),10<l)){if(On(a,t,St,!zn),Kn(a,0,!0)!==0)break e;sn=t,a.timeoutHandle=uf(Cd.bind(null,a,n,ht,Wi,ar,t,St,sa,Xa,zn,i,"Throttled",-0,0),l);break e}Cd(a,n,ht,Wi,ar,t,St,sa,Xa,zn,i,null,-0,0)}}break}while(!0);Xt(e)}function Cd(e,t,n,a,l,i,o,u,c,g,T,M,v,S){if(e.timeoutHandle=-1,M=t.subtreeFlags,M&8192||(M&16785408)===16785408){M={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Jt},Td(t,i,M);var N=(i&62914560)===i?Ji-Ie():(i&4194048)===i?Md-Ie():0;if(N=ip(M,N),N!==null){sn=i,e.cancelPendingCommit=N(Ld.bind(null,e,t,i,n,a,l,o,u,c,T,M,null,v,S)),On(e,i,o,!g);return}}Ld(e,t,i,n,a,l,o,u,c)}function Sh(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!gt(i(),l))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function On(e,t,n,a){t&=~nr,t&=~sa,e.suspendedLanes|=t,e.pingedLanes&=~t,a&&(e.warmLanes|=t),a=e.expirationTimes;for(var l=t;0<l;){var i=31-nt(l),o=1<<i;a[i]=-1,l&=~o}n!==0&&ol(e,n,t)}function Ii(){return(xe&6)===0?(Yl(0),!1):!0}function ur(){if(se!==null){if(_e===0)var e=se.return;else e=se,$t=ta=null,Au(e),qa=null,El=0,e=se;for(;e!==null;)ud(e.alternate,e),e=e.return;se=null}}function Za(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,Gh(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),sn=0,ur(),Oe=e,se=n=Wt(e.current,null),fe=t,_e=0,xt=null,zn=!1,Va=mn(e,t),tr=!1,Xa=St=nr=sa=jn=Le=0,ht=kl=null,ar=!1,(t&8)!==0&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var l=31-nt(a),i=1<<l;t|=e[l],a&=~i}return cn=t,yi(),n}function Od(e,t){ae=null,A.H=Rl,t===Ba||t===Mi?(t=Kc(),_e=3):t===du?(t=Kc(),_e=4):_e=t===Nu?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,xt=t,se===null&&(Le=1,ki(e,jt(t,e.current)))}function Rd(){var e=yt.current;return e===null?!0:(fe&4194048)===fe?Rt===null:(fe&62914560)===fe||(fe&536870912)!==0?e===Rt:!1}function Ud(){var e=A.H;return A.H=Rl,e===null?Rl:e}function wd(){var e=A.A;return A.A=bh,e}function $i(){Le=4,zn||(fe&4194048)!==fe&&yt.current!==null||(Va=!0),(jn&134217727)===0&&(sa&134217727)===0||Oe===null||On(Oe,fe,St,!1)}function rr(e,t,n){var a=xe;xe|=2;var l=Ud(),i=wd();(Oe!==e||fe!==t)&&(Wi=null,Za(e,t)),t=!1;var o=Le;e:do try{if(_e!==0&&se!==null){var u=se,c=xt;switch(_e){case 8:ur(),o=6;break e;case 3:case 2:case 9:case 6:yt.current===null&&(t=!0);var g=_e;if(_e=0,xt=null,Ka(e,u,c,g),n&&Va){o=0;break e}break;default:g=_e,_e=0,xt=null,Ka(e,u,c,g)}}Th(),o=Le;break}catch(T){Od(e,T)}while(!0);return t&&e.shellSuspendCounter++,$t=ta=null,xe=a,A.H=l,A.A=i,se===null&&(Oe=null,fe=0,yi()),o}function Th(){for(;se!==null;)Bd(se)}function Ah(e,t){var n=xe;xe|=2;var a=Ud(),l=wd();Oe!==e||fe!==t?(Wi=null,Fi=Ie()+500,Za(e,t)):Va=mn(e,t);e:do try{if(_e!==0&&se!==null){t=se;var i=xt;t:switch(_e){case 1:_e=0,xt=null,Ka(e,t,i,1);break;case 2:case 9:if(Qc(i)){_e=0,xt=null,qd(t);break}t=function(){_e!==2&&_e!==9||Oe!==e||(_e=7),Xt(e)},i.then(t,t);break e;case 3:_e=7;break e;case 4:_e=5;break e;case 7:Qc(i)?(_e=0,xt=null,qd(t)):(_e=0,xt=null,Ka(e,t,i,7));break;case 5:var o=null;switch(se.tag){case 26:o=se.memoizedState;case 5:case 27:var u=se;if(o?Tf(o):u.stateNode.complete){_e=0,xt=null;var c=u.sibling;if(c!==null)se=c;else{var g=u.return;g!==null?(se=g,Pi(g)):se=null}break t}}_e=0,xt=null,Ka(e,t,i,5);break;case 6:_e=0,xt=null,Ka(e,t,i,6);break;case 8:ur(),Le=6;break e;default:throw Error(s(462))}}Eh();break}catch(T){Od(e,T)}while(!0);return $t=ta=null,A.H=a,A.A=l,xe=n,se!==null?0:(Oe=null,fe=0,yi(),Le)}function Eh(){for(;se!==null&&!Yn();)Bd(se)}function Bd(e){var t=id(e.alternate,e,cn);e.memoizedProps=e.pendingProps,t===null?Pi(e):se=t}function qd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Ps(n,t,t.pendingProps,t.type,void 0,fe);break;case 11:t=Ps(n,t,t.pendingProps,t.type.render,t.ref,fe);break;case 5:Au(t);default:ud(n,t),t=se=wc(t,cn),t=id(n,t,cn)}e.memoizedProps=e.pendingProps,t===null?Pi(e):se=t}function Ka(e,t,n,a){$t=ta=null,Au(t),qa=null,El=0;var l=t.return;try{if(fh(e,l,t,n,fe)){Le=1,ki(e,jt(n,e.current)),se=null;return}}catch(i){if(l!==null)throw se=l,i;Le=1,ki(e,jt(n,e.current)),se=null;return}t.flags&32768?(he||a===1?e=!0:Va||(fe&536870912)!==0?e=!1:(zn=e=!0,(a===2||a===9||a===3||a===6)&&(a=yt.current,a!==null&&a.tag===13&&(a.flags|=16384))),Hd(t,e)):Pi(t)}function Pi(e){var t=e;do{if((t.flags&32768)!==0){Hd(t,zn);return}e=t.return;var n=ph(t.alternate,t,cn);if(n!==null){se=n;return}if(t=t.sibling,t!==null){se=t;return}se=t=e}while(t!==null);Le===0&&(Le=5)}function Hd(e,t){do{var n=gh(e.alternate,e);if(n!==null){n.flags&=32767,se=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){se=e;return}se=e=n}while(e!==null);Le=6,se=null}function Ld(e,t,n,a,l,i,o,u,c){e.cancelPendingCommit=null;do eo();while(Ze!==0);if((xe&6)!==0)throw Error(s(327));if(t!==null){if(t===e.current)throw Error(s(177));if(i=t.lanes|t.childLanes,i|=Wo,oi(e,n,i,o,u,c),e===Oe&&(se=Oe=null,fe=0),Qa=t,Cn=e,sn=n,lr=i,ir=l,zd=a,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,jh(Zt,function(){return Vd(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||a){a=A.T,A.T=null,l=w.p,w.p=2,o=xe,xe|=4;try{vh(e,t,n)}finally{xe=o,w.p=l,A.T=a}}Ze=1,Nd(),kd(),Gd()}}function Nd(){if(Ze===1){Ze=0;var e=Cn,t=Qa,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=A.T,A.T=null;var a=w.p;w.p=2;var l=xe;xe|=4;try{bd(t,e);var i=xr,o=_c(e.containerInfo),u=i.focusedElem,c=i.selectionRange;if(o!==u&&u&&u.ownerDocument&&Ec(u.ownerDocument.documentElement,u)){if(c!==null&&Qo(u)){var g=c.start,T=c.end;if(T===void 0&&(T=g),"selectionStart"in u)u.selectionStart=g,u.selectionEnd=Math.min(T,u.value.length);else{var M=u.ownerDocument||document,v=M&&M.defaultView||window;if(v.getSelection){var S=v.getSelection(),N=u.textContent.length,W=Math.min(c.start,N),De=c.end===void 0?W:Math.min(c.end,N);!S.extend&&W>De&&(o=De,De=W,W=o);var h=Ac(u,W),f=Ac(u,De);if(h&&f&&(S.rangeCount!==1||S.anchorNode!==h.node||S.anchorOffset!==h.offset||S.focusNode!==f.node||S.focusOffset!==f.offset)){var p=M.createRange();p.setStart(h.node,h.offset),S.removeAllRanges(),W>De?(S.addRange(p),S.extend(f.node,f.offset)):(p.setEnd(f.node,f.offset),S.addRange(p))}}}}for(M=[],S=u;S=S.parentNode;)S.nodeType===1&&M.push({element:S,left:S.scrollLeft,top:S.scrollTop});for(typeof u.focus=="function"&&u.focus(),u=0;u<M.length;u++){var _=M[u];_.element.scrollLeft=_.left,_.element.scrollTop=_.top}}mo=!!br,xr=br=null}finally{xe=l,w.p=a,A.T=n}}e.current=t,Ze=2}}function kd(){if(Ze===2){Ze=0;var e=Cn,t=Qa,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=A.T,A.T=null;var a=w.p;w.p=2;var l=xe;xe|=4;try{hd(e,t.alternate,t)}finally{xe=l,w.p=a,A.T=n}}Ze=3}}function Gd(){if(Ze===4||Ze===3){Ze=0,Eo();var e=Cn,t=Qa,n=sn,a=zd;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Ze=5:(Ze=0,Qa=Cn=null,Yd(e,e.pendingLanes));var l=e.pendingLanes;if(l===0&&(Dn=null),G(n),t=t.stateNode,qe&&typeof qe.onCommitFiberRoot=="function")try{qe.onCommitFiberRoot(fn,t,void 0,(t.current.flags&128)===128)}catch{}if(a!==null){t=A.T,l=w.p,w.p=2,A.T=null;try{for(var i=e.onRecoverableError,o=0;o<a.length;o++){var u=a[o];i(u.value,{componentStack:u.stack})}}finally{A.T=t,w.p=l}}(sn&3)!==0&&eo(),Xt(e),l=e.pendingLanes,(n&261930)!==0&&(l&42)!==0?e===or?Gl++:(Gl=0,or=e):Gl=0,Yl(0)}}function Yd(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Tl(t)))}function eo(){return Nd(),kd(),Gd(),Vd()}function Vd(){if(Ze!==5)return!1;var e=Cn,t=lr;lr=0;var n=G(sn),a=A.T,l=w.p;try{w.p=32>n?32:n,A.T=null,n=ir,ir=null;var i=Cn,o=sn;if(Ze=0,Qa=Cn=null,sn=0,(xe&6)!==0)throw Error(s(331));var u=xe;if(xe|=4,Ed(i.current),Sd(i,i.current,o,n),xe=u,Yl(0,!1),qe&&typeof qe.onPostCommitFiberRoot=="function")try{qe.onPostCommitFiberRoot(fn,i)}catch{}return!0}finally{w.p=l,A.T=a,Yd(e,t)}}function Xd(e,t,n){t=jt(n,t),t=Lu(e.stateNode,t,2),e=An(e,t,2),e!==null&&(hn(e,2),Xt(e))}function Me(e,t,n){if(e.tag===3)Xd(e,e,n);else for(;t!==null;){if(t.tag===3){Xd(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(Dn===null||!Dn.has(a))){e=jt(n,e),n=Qs(2),a=An(t,n,2),a!==null&&(Zs(n,a,t,e),hn(a,2),Xt(a));break}}t=t.return}}function cr(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new xh;var l=new Set;a.set(t,l)}else l=a.get(t),l===void 0&&(l=new Set,a.set(t,l));l.has(n)||(tr=!0,l.add(n),e=_h.bind(null,e,t,n),t.then(e,e))}function _h(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Oe===e&&(fe&n)===n&&(Le===4||Le===3&&(fe&62914560)===fe&&300>Ie()-Ji?(xe&2)===0&&Za(e,0):nr|=n,Xa===fe&&(Xa=0)),Xt(e)}function Qd(e,t){t===0&&(t=il()),e=$n(e,t),e!==null&&(hn(e,t),Xt(e))}function Mh(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Qd(e,n)}function zh(e,t){var n=0;switch(e.tag){case 31:case 13:var a=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(s(314))}a!==null&&a.delete(t),Qd(e,n)}function jh(e,t){return ei(e,t)}var to=null,Ja=null,sr=!1,no=!1,dr=!1,Rn=0;function Xt(e){e!==Ja&&e.next===null&&(Ja===null?to=Ja=e:Ja=Ja.next=e),no=!0,sr||(sr=!0,Ch())}function Yl(e,t){if(!dr&&no){dr=!0;do for(var n=!1,a=to;a!==null;){if(e!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var o=a.suspendedLanes,u=a.pingedLanes;i=(1<<31-nt(42|e)+1)-1,i&=l&~(o&~u),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Fd(a,i))}else i=fe,i=Kn(a,a===Oe?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||mn(a,i)||(n=!0,Fd(a,i));a=a.next}while(n);dr=!1}}function Dh(){Zd()}function Zd(){no=sr=!1;var e=0;Rn!==0&&kh()&&(e=Rn);for(var t=Ie(),n=null,a=to;a!==null;){var l=a.next,i=Kd(a,t);i===0?(a.next=null,n===null?to=l:n.next=l,l===null&&(Ja=n)):(n=a,(e!==0||(i&3)!==0)&&(no=!0)),a=l}Ze!==0&&Ze!==5||Yl(e),Rn!==0&&(Rn=0)}function Kd(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var o=31-nt(i),u=1<<o,c=l[o];c===-1?((u&n)===0||(u&a)!==0)&&(l[o]=ii(u,t)):c<=t&&(e.expiredLanes|=u),i&=~u}if(t=Oe,n=fe,n=Kn(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,n===0||e===t&&(_e===2||_e===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&Gn(a),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||mn(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(a!==null&&Gn(a),G(n)){case 2:case 8:n=Vn;break;case 32:n=Zt;break;case 268435456:n=ha;break;default:n=Zt}return a=Jd.bind(null,e),n=ei(n,a),e.callbackPriority=t,e.callbackNode=n,t}return a!==null&&a!==null&&Gn(a),e.callbackPriority=2,e.callbackNode=null,2}function Jd(e,t){if(Ze!==0&&Ze!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(eo()&&e.callbackNode!==n)return null;var a=fe;return a=Kn(e,e===Oe?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(Dd(e,a,t),Kd(e,Ie()),e.callbackNode!=null&&e.callbackNode===n?Jd.bind(null,e):null)}function Fd(e,t){if(eo())return null;Dd(e,t,!0)}function Ch(){Yh(function(){(xe&6)!==0?ei(ti,Dh):Zd()})}function fr(){if(Rn===0){var e=Ua;e===0&&(e=Xn,Xn<<=1,(Xn&261888)===0&&(Xn=256)),Rn=e}return Rn}function Wd(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:si(""+e)}function Id(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function Oh(e,t,n,a,l){if(t==="submit"&&n&&n.stateNode===l){var i=Wd((l[Ce]||null).action),o=a.submitter;o&&(t=(t=o[Ce]||null)?Wd(t.formAction):o.getAttribute("formAction"),t!==null&&(i=t,o=null));var u=new hi("action","action",null,a,l);e.push({event:u,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(Rn!==0){var c=o?Id(l,o):new FormData(l);Ru(n,{pending:!0,data:c,method:l.method,action:i},null,c)}}else typeof i=="function"&&(u.preventDefault(),c=o?Id(l,o):new FormData(l),Ru(n,{pending:!0,data:c,method:l.method,action:i},i,c))},currentTarget:l}]})}}for(var mr=0;mr<Fo.length;mr++){var hr=Fo[mr],Rh=hr.toLowerCase(),Uh=hr[0].toUpperCase()+hr.slice(1);qt(Rh,"on"+Uh)}qt(jc,"onAnimationEnd"),qt(Dc,"onAnimationIteration"),qt(Cc,"onAnimationStart"),qt("dblclick","onDoubleClick"),qt("focusin","onFocus"),qt("focusout","onBlur"),qt(Fm,"onTransitionRun"),qt(Wm,"onTransitionStart"),qt(Im,"onTransitionCancel"),qt(Oc,"onTransitionEnd"),ba("onMouseEnter",["mouseout","mouseover"]),ba("onMouseLeave",["mouseout","mouseover"]),ba("onPointerEnter",["pointerout","pointerover"]),ba("onPointerLeave",["pointerout","pointerover"]),Jn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Jn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Jn("onBeforeInput",["compositionend","keypress","textInput","paste"]),Jn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Jn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Jn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Vl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),wh=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Vl));function $d(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],l=a.event;a=a.listeners;e:{var i=void 0;if(t)for(var o=a.length-1;0<=o;o--){var u=a[o],c=u.instance,g=u.currentTarget;if(u=u.listener,c!==i&&l.isPropagationStopped())break e;i=u,l.currentTarget=g;try{i(l)}catch(T){vi(T)}l.currentTarget=null,i=c}else for(o=0;o<a.length;o++){if(u=a[o],c=u.instance,g=u.currentTarget,u=u.listener,c!==i&&l.isPropagationStopped())break e;i=u,l.currentTarget=g;try{i(l)}catch(T){vi(T)}l.currentTarget=null,i=c}}}}function de(e,t){var n=t[zo];n===void 0&&(n=t[zo]=new Set);var a=e+"__bubble";n.has(a)||(Pd(t,e,2,!1),n.add(a))}function pr(e,t,n){var a=0;t&&(a|=4),Pd(n,e,a,t)}var ao="_reactListening"+Math.random().toString(36).slice(2);function gr(e){if(!e[ao]){e[ao]=!0,Zr.forEach(function(n){n!=="selectionchange"&&(wh.has(n)||pr(n,!1,e),pr(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ao]||(t[ao]=!0,pr("selectionchange",!1,t))}}function Pd(e,t,n,a){switch(Df(t)){case 2:var l=rp;break;case 8:l=cp;break;default:l=Or}n=l.bind(null,t,n,e),l=void 0,!qo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),a?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function vr(e,t,n,a,l){var i=a;if((t&1)===0&&(t&2)===0&&a!==null)e:for(;;){if(a===null)return;var o=a.tag;if(o===3||o===4){var u=a.stateNode.containerInfo;if(u===l)break;if(o===4)for(o=a.return;o!==null;){var c=o.tag;if((c===3||c===4)&&o.stateNode.containerInfo===l)return;o=o.return}for(;u!==null;){if(o=ga(u),o===null)return;if(c=o.tag,c===5||c===6||c===26||c===27){a=i=o;continue e}u=u.parentNode}}a=a.return}lc(function(){var g=i,T=wo(n),M=[];e:{var v=Rc.get(e);if(v!==void 0){var S=hi,N=e;switch(e){case"keypress":if(fi(n)===0)break e;case"keydown":case"keyup":S=zm;break;case"focusin":N="focus",S=ko;break;case"focusout":N="blur",S=ko;break;case"beforeblur":case"afterblur":S=ko;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":S=uc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":S=pm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":S=Cm;break;case jc:case Dc:case Cc:S=ym;break;case Oc:S=Rm;break;case"scroll":case"scrollend":S=mm;break;case"wheel":S=wm;break;case"copy":case"cut":case"paste":S=xm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":S=cc;break;case"toggle":case"beforetoggle":S=qm}var W=(t&4)!==0,De=!W&&(e==="scroll"||e==="scrollend"),h=W?v!==null?v+"Capture":null:v;W=[];for(var f=g,p;f!==null;){var _=f;if(p=_.stateNode,_=_.tag,_!==5&&_!==26&&_!==27||p===null||h===null||(_=dl(f,h),_!=null&&W.push(Xl(f,_,p))),De)break;f=f.return}0<W.length&&(v=new S(v,N,null,n,T),M.push({event:v,listeners:W}))}}if((t&7)===0){e:{if(v=e==="mouseover"||e==="pointerover",S=e==="mouseout"||e==="pointerout",v&&n!==Uo&&(N=n.relatedTarget||n.fromElement)&&(ga(N)||N[pn]))break e;if((S||v)&&(v=T.window===T?T:(v=T.ownerDocument)?v.defaultView||v.parentWindow:window,S?(N=n.relatedTarget||n.toElement,S=g,N=N?ga(N):null,N!==null&&(De=O(N),W=N.tag,N!==De||W!==5&&W!==27&&W!==6)&&(N=null)):(S=null,N=g),S!==N)){if(W=uc,_="onMouseLeave",h="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(W=cc,_="onPointerLeave",h="onPointerEnter",f="pointer"),De=S==null?v:sl(S),p=N==null?v:sl(N),v=new W(_,f+"leave",S,n,T),v.target=De,v.relatedTarget=p,_=null,ga(T)===g&&(W=new W(h,f+"enter",N,n,T),W.target=p,W.relatedTarget=De,_=W),De=_,S&&N)t:{for(W=Bh,h=S,f=N,p=0,_=h;_;_=W(_))p++;_=0;for(var Q=f;Q;Q=W(Q))_++;for(;0<p-_;)h=W(h),p--;for(;0<_-p;)f=W(f),_--;for(;p--;){if(h===f||f!==null&&h===f.alternate){W=h;break t}h=W(h),f=W(f)}W=null}else W=null;S!==null&&ef(M,v,S,W,!1),N!==null&&De!==null&&ef(M,De,N,W,!0)}}e:{if(v=g?sl(g):window,S=v.nodeName&&v.nodeName.toLowerCase(),S==="select"||S==="input"&&v.type==="file")var ye=vc;else if(pc(v))if(yc)ye=Zm;else{ye=Xm;var Y=Vm}else S=v.nodeName,!S||S.toLowerCase()!=="input"||v.type!=="checkbox"&&v.type!=="radio"?g&&Ro(g.elementType)&&(ye=vc):ye=Qm;if(ye&&(ye=ye(e,g))){gc(M,ye,n,T);break e}Y&&Y(e,v,g),e==="focusout"&&g&&v.type==="number"&&g.memoizedProps.value!=null&&Oo(v,"number",v.value)}switch(Y=g?sl(g):window,e){case"focusin":(pc(Y)||Y.contentEditable==="true")&&(_a=Y,Zo=g,bl=null);break;case"focusout":bl=Zo=_a=null;break;case"mousedown":Ko=!0;break;case"contextmenu":case"mouseup":case"dragend":Ko=!1,Mc(M,n,T);break;case"selectionchange":if(Jm)break;case"keydown":case"keyup":Mc(M,n,T)}var le;if(Yo)e:{switch(e){case"compositionstart":var me="onCompositionStart";break e;case"compositionend":me="onCompositionEnd";break e;case"compositionupdate":me="onCompositionUpdate";break e}me=void 0}else Ea?mc(e,n)&&(me="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(me="onCompositionStart");me&&(sc&&n.locale!=="ko"&&(Ea||me!=="onCompositionStart"?me==="onCompositionEnd"&&Ea&&(le=ic()):(gn=T,Ho="value"in gn?gn.value:gn.textContent,Ea=!0)),Y=lo(g,me),0<Y.length&&(me=new rc(me,e,null,n,T),M.push({event:me,listeners:Y}),le?me.data=le:(le=hc(n),le!==null&&(me.data=le)))),(le=Lm?Nm(e,n):km(e,n))&&(me=lo(g,"onBeforeInput"),0<me.length&&(Y=new rc("onBeforeInput","beforeinput",null,n,T),M.push({event:Y,listeners:me}),Y.data=le)),Oh(M,e,g,n,T)}$d(M,t)})}function Xl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function lo(e,t){for(var n=t+"Capture",a=[];e!==null;){var l=e,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=dl(e,n),l!=null&&a.unshift(Xl(e,l,i)),l=dl(e,t),l!=null&&a.push(Xl(e,l,i))),e.tag===3)return a;e=e.return}return[]}function Bh(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function ef(e,t,n,a,l){for(var i=t._reactName,o=[];n!==null&&n!==a;){var u=n,c=u.alternate,g=u.stateNode;if(u=u.tag,c!==null&&c===a)break;u!==5&&u!==26&&u!==27||g===null||(c=g,l?(g=dl(n,i),g!=null&&o.unshift(Xl(n,g,c))):l||(g=dl(n,i),g!=null&&o.push(Xl(n,g,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var qh=/\r\n?/g,Hh=/\u0000|\uFFFD/g;function tf(e){return(typeof e=="string"?e:""+e).replace(qh,`
`).replace(Hh,"")}function nf(e,t){return t=tf(t),tf(e)===t}function je(e,t,n,a,l,i){switch(n){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||Sa(e,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&Sa(e,""+a);break;case"className":ri(e,"class",a);break;case"tabIndex":ri(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":ri(e,n,a);break;case"style":nc(e,a,i);break;case"data":if(t!=="object"){ri(e,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=si(""+a),e.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(t!=="input"&&je(e,t,"name",l.name,l,null),je(e,t,"formEncType",l.formEncType,l,null),je(e,t,"formMethod",l.formMethod,l,null),je(e,t,"formTarget",l.formTarget,l,null)):(je(e,t,"encType",l.encType,l,null),je(e,t,"method",l.method,l,null),je(e,t,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=si(""+a),e.setAttribute(n,a);break;case"onClick":a!=null&&(e.onclick=Jt);break;case"onScroll":a!=null&&de("scroll",e);break;case"onScrollEnd":a!=null&&de("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(s(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(s(60));e.innerHTML=n}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}n=si(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""+a):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":a===!0?e.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,a):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(n,a):e.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(n):e.setAttribute(n,a);break;case"popover":de("beforetoggle",e),de("toggle",e),ui(e,"popover",a);break;case"xlinkActuate":Kt(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Kt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Kt(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Kt(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Kt(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Kt(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Kt(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Kt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Kt(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":ui(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=dm.get(n)||n,ui(e,n,a))}}function yr(e,t,n,a,l,i){switch(n){case"style":nc(e,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(s(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(s(60));e.innerHTML=n}}break;case"children":typeof a=="string"?Sa(e,a):(typeof a=="number"||typeof a=="bigint")&&Sa(e,""+a);break;case"onScroll":a!=null&&de("scroll",e);break;case"onScrollEnd":a!=null&&de("scrollend",e);break;case"onClick":a!=null&&(e.onclick=Jt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Kr.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),t=n.slice(2,l?n.length-7:void 0),i=e[Ce]||null,i=i!=null?i[n]:null,typeof i=="function"&&e.removeEventListener(t,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,a,l);break e}n in e?e[n]=a:a===!0?e.setAttribute(n,""):ui(e,n,a)}}}function tt(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":de("error",e),de("load",e);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var o=n[i];if(o!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,t));default:je(e,t,i,o,n,null)}}l&&je(e,t,"srcSet",n.srcSet,n,null),a&&je(e,t,"src",n.src,n,null);return;case"input":de("invalid",e);var u=i=o=l=null,c=null,g=null;for(a in n)if(n.hasOwnProperty(a)){var T=n[a];if(T!=null)switch(a){case"name":l=T;break;case"type":o=T;break;case"checked":c=T;break;case"defaultChecked":g=T;break;case"value":i=T;break;case"defaultValue":u=T;break;case"children":case"dangerouslySetInnerHTML":if(T!=null)throw Error(s(137,t));break;default:je(e,t,a,T,n,null)}}$r(e,i,u,c,g,o,l,!1);return;case"select":de("invalid",e),a=o=i=null;for(l in n)if(n.hasOwnProperty(l)&&(u=n[l],u!=null))switch(l){case"value":i=u;break;case"defaultValue":o=u;break;case"multiple":a=u;default:je(e,t,l,u,n,null)}t=i,n=o,e.multiple=!!a,t!=null?xa(e,!!a,t,!1):n!=null&&xa(e,!!a,n,!0);return;case"textarea":de("invalid",e),i=l=a=null;for(o in n)if(n.hasOwnProperty(o)&&(u=n[o],u!=null))switch(o){case"value":a=u;break;case"defaultValue":l=u;break;case"children":i=u;break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:je(e,t,o,u,n,null)}ec(e,a,l,i);return;case"option":for(c in n)if(n.hasOwnProperty(c)&&(a=n[c],a!=null))switch(c){case"selected":e.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:je(e,t,c,a,n,null)}return;case"dialog":de("beforetoggle",e),de("toggle",e),de("cancel",e),de("close",e);break;case"iframe":case"object":de("load",e);break;case"video":case"audio":for(a=0;a<Vl.length;a++)de(Vl[a],e);break;case"image":de("error",e),de("load",e);break;case"details":de("toggle",e);break;case"embed":case"source":case"link":de("error",e),de("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(g in n)if(n.hasOwnProperty(g)&&(a=n[g],a!=null))switch(g){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,t));default:je(e,t,g,a,n,null)}return;default:if(Ro(t)){for(T in n)n.hasOwnProperty(T)&&(a=n[T],a!==void 0&&yr(e,t,T,a,n,void 0));return}}for(u in n)n.hasOwnProperty(u)&&(a=n[u],a!=null&&je(e,t,u,a,n,null))}function Lh(e,t,n,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,o=null,u=null,c=null,g=null,T=null;for(S in n){var M=n[S];if(n.hasOwnProperty(S)&&M!=null)switch(S){case"checked":break;case"value":break;case"defaultValue":c=M;default:a.hasOwnProperty(S)||je(e,t,S,null,a,M)}}for(var v in a){var S=a[v];if(M=n[v],a.hasOwnProperty(v)&&(S!=null||M!=null))switch(v){case"type":i=S;break;case"name":l=S;break;case"checked":g=S;break;case"defaultChecked":T=S;break;case"value":o=S;break;case"defaultValue":u=S;break;case"children":case"dangerouslySetInnerHTML":if(S!=null)throw Error(s(137,t));break;default:S!==M&&je(e,t,v,S,a,M)}}Co(e,o,u,c,g,T,i,l);return;case"select":S=o=u=v=null;for(i in n)if(c=n[i],n.hasOwnProperty(i)&&c!=null)switch(i){case"value":break;case"multiple":S=c;default:a.hasOwnProperty(i)||je(e,t,i,null,a,c)}for(l in a)if(i=a[l],c=n[l],a.hasOwnProperty(l)&&(i!=null||c!=null))switch(l){case"value":v=i;break;case"defaultValue":u=i;break;case"multiple":o=i;default:i!==c&&je(e,t,l,i,a,c)}t=u,n=o,a=S,v!=null?xa(e,!!n,v,!1):!!a!=!!n&&(t!=null?xa(e,!!n,t,!0):xa(e,!!n,n?[]:"",!1));return;case"textarea":S=v=null;for(u in n)if(l=n[u],n.hasOwnProperty(u)&&l!=null&&!a.hasOwnProperty(u))switch(u){case"value":break;case"children":break;default:je(e,t,u,null,a,l)}for(o in a)if(l=a[o],i=n[o],a.hasOwnProperty(o)&&(l!=null||i!=null))switch(o){case"value":v=l;break;case"defaultValue":S=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(s(91));break;default:l!==i&&je(e,t,o,l,a,i)}Pr(e,v,S);return;case"option":for(var N in n)if(v=n[N],n.hasOwnProperty(N)&&v!=null&&!a.hasOwnProperty(N))switch(N){case"selected":e.selected=!1;break;default:je(e,t,N,null,a,v)}for(c in a)if(v=a[c],S=n[c],a.hasOwnProperty(c)&&v!==S&&(v!=null||S!=null))switch(c){case"selected":e.selected=v&&typeof v!="function"&&typeof v!="symbol";break;default:je(e,t,c,v,a,S)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var W in n)v=n[W],n.hasOwnProperty(W)&&v!=null&&!a.hasOwnProperty(W)&&je(e,t,W,null,a,v);for(g in a)if(v=a[g],S=n[g],a.hasOwnProperty(g)&&v!==S&&(v!=null||S!=null))switch(g){case"children":case"dangerouslySetInnerHTML":if(v!=null)throw Error(s(137,t));break;default:je(e,t,g,v,a,S)}return;default:if(Ro(t)){for(var De in n)v=n[De],n.hasOwnProperty(De)&&v!==void 0&&!a.hasOwnProperty(De)&&yr(e,t,De,void 0,a,v);for(T in a)v=a[T],S=n[T],!a.hasOwnProperty(T)||v===S||v===void 0&&S===void 0||yr(e,t,T,v,a,S);return}}for(var h in n)v=n[h],n.hasOwnProperty(h)&&v!=null&&!a.hasOwnProperty(h)&&je(e,t,h,null,a,v);for(M in a)v=a[M],S=n[M],!a.hasOwnProperty(M)||v===S||v==null&&S==null||je(e,t,M,v,a,S)}function af(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Nh(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,o=l.initiatorType,u=l.duration;if(i&&u&&af(o)){for(o=0,u=l.responseEnd,a+=1;a<n.length;a++){var c=n[a],g=c.startTime;if(g>u)break;var T=c.transferSize,M=c.initiatorType;T&&af(M)&&(c=c.responseEnd,o+=T*(c<u?1:(u-g)/(c-g)))}if(--a,t+=8*(i+o)/(l.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var br=null,xr=null;function io(e){return e.nodeType===9?e:e.ownerDocument}function lf(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function of(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Sr(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Tr=null;function kh(){var e=window.event;return e&&e.type==="popstate"?e===Tr?!1:(Tr=e,!0):(Tr=null,!1)}var uf=typeof setTimeout=="function"?setTimeout:void 0,Gh=typeof clearTimeout=="function"?clearTimeout:void 0,rf=typeof Promise=="function"?Promise:void 0,Yh=typeof queueMicrotask=="function"?queueMicrotask:typeof rf<"u"?function(e){return rf.resolve(null).then(e).catch(Vh)}:uf;function Vh(e){setTimeout(function(){throw e})}function Un(e){return e==="head"}function cf(e,t){var n=t,a=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){e.removeChild(l),$a(t);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")Ql(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,Ql(n);for(var i=n.firstChild;i;){var o=i.nextSibling,u=i.nodeName;i[cl]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=o}}else n==="body"&&Ql(e.ownerDocument.body);n=l}while(n);$a(t)}function sf(e,t){var n=e;e=0;do{var a=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=a}while(n)}function Ar(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Ar(n),jo(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function Xh(e,t,n,a){for(;e.nodeType===1;){var l=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[cl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==l.rel||e.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||e.getAttribute("title")!==(l.title==null?null:l.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(l.src==null?null:l.src)||e.getAttribute("type")!==(l.type==null?null:l.type)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=Ut(e.nextSibling),e===null)break}return null}function Qh(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Ut(e.nextSibling),e===null))return null;return e}function df(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Ut(e.nextSibling),e===null))return null;return e}function Er(e){return e.data==="$?"||e.data==="$~"}function _r(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Zh(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var a=function(){t(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function Ut(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Mr=null;function ff(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Ut(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function mf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function hf(e,t,n){switch(t=io(n),e){case"html":if(e=t.documentElement,!e)throw Error(s(452));return e;case"head":if(e=t.head,!e)throw Error(s(453));return e;case"body":if(e=t.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function Ql(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);jo(e)}var wt=new Map,pf=new Set;function oo(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var dn=w.d;w.d={f:Kh,r:Jh,D:Fh,C:Wh,L:Ih,m:$h,X:ep,S:Ph,M:tp};function Kh(){var e=dn.f(),t=Ii();return e||t}function Jh(e){var t=va(e);t!==null&&t.tag===5&&t.type==="form"?Os(t):dn.r(e)}var Fa=typeof document>"u"?null:document;function gf(e,t,n){var a=Fa;if(a&&typeof t=="string"&&t){var l=Mt(t);l='link[rel="'+e+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),pf.has(l)||(pf.add(l),e={rel:e,crossOrigin:n,href:t},a.querySelector(l)===null&&(t=a.createElement("link"),tt(t,"link",e),Je(t),a.head.appendChild(t)))}}function Fh(e){dn.D(e),gf("dns-prefetch",e,null)}function Wh(e,t){dn.C(e,t),gf("preconnect",e,t)}function Ih(e,t,n){dn.L(e,t,n);var a=Fa;if(a&&e&&t){var l='link[rel="preload"][as="'+Mt(t)+'"]';t==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+Mt(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+Mt(n.imageSizes)+'"]')):l+='[href="'+Mt(e)+'"]';var i=l;switch(t){case"style":i=Wa(e);break;case"script":i=Ia(e)}wt.has(i)||(e=C({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),wt.set(i,e),a.querySelector(l)!==null||t==="style"&&a.querySelector(Zl(i))||t==="script"&&a.querySelector(Kl(i))||(t=a.createElement("link"),tt(t,"link",e),Je(t),a.head.appendChild(t)))}}function $h(e,t){dn.m(e,t);var n=Fa;if(n&&e){var a=t&&typeof t.as=="string"?t.as:"script",l='link[rel="modulepreload"][as="'+Mt(a)+'"][href="'+Mt(e)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Ia(e)}if(!wt.has(i)&&(e=C({rel:"modulepreload",href:e},t),wt.set(i,e),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Kl(i)))return}a=n.createElement("link"),tt(a,"link",e),Je(a),n.head.appendChild(a)}}}function Ph(e,t,n){dn.S(e,t,n);var a=Fa;if(a&&e){var l=ya(a).hoistableStyles,i=Wa(e);t=t||"default";var o=l.get(i);if(!o){var u={loading:0,preload:null};if(o=a.querySelector(Zl(i)))u.loading=5;else{e=C({rel:"stylesheet",href:e,"data-precedence":t},n),(n=wt.get(i))&&zr(e,n);var c=o=a.createElement("link");Je(c),tt(c,"link",e),c._p=new Promise(function(g,T){c.onload=g,c.onerror=T}),c.addEventListener("load",function(){u.loading|=1}),c.addEventListener("error",function(){u.loading|=2}),u.loading|=4,uo(o,t,a)}o={type:"stylesheet",instance:o,count:1,state:u},l.set(i,o)}}}function ep(e,t){dn.X(e,t);var n=Fa;if(n&&e){var a=ya(n).hoistableScripts,l=Ia(e),i=a.get(l);i||(i=n.querySelector(Kl(l)),i||(e=C({src:e,async:!0},t),(t=wt.get(l))&&jr(e,t),i=n.createElement("script"),Je(i),tt(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function tp(e,t){dn.M(e,t);var n=Fa;if(n&&e){var a=ya(n).hoistableScripts,l=Ia(e),i=a.get(l);i||(i=n.querySelector(Kl(l)),i||(e=C({src:e,async:!0,type:"module"},t),(t=wt.get(l))&&jr(e,t),i=n.createElement("script"),Je(i),tt(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function vf(e,t,n,a){var l=(l=oe.current)?oo(l):null;if(!l)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=Wa(n.href),n=ya(l).hoistableStyles,a=n.get(t),a||(a={type:"style",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Wa(n.href);var i=ya(l).hoistableStyles,o=i.get(e);if(o||(l=l.ownerDocument||l,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,o),(i=l.querySelector(Zl(e)))&&!i._p&&(o.instance=i,o.state.loading=5),wt.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},wt.set(e,n),i||np(l,e,n,o.state))),t&&a===null)throw Error(s(528,""));return o}if(t&&a!==null)throw Error(s(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Ia(n),n=ya(l).hoistableScripts,a=n.get(t),a||(a={type:"script",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function Wa(e){return'href="'+Mt(e)+'"'}function Zl(e){return'link[rel="stylesheet"]['+e+"]"}function yf(e){return C({},e,{"data-precedence":e.precedence,precedence:null})}function np(e,t,n,a){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=e.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),tt(t,"link",n),Je(t),e.head.appendChild(t))}function Ia(e){return'[src="'+Mt(e)+'"]'}function Kl(e){return"script[async]"+e}function bf(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var a=e.querySelector('style[data-href~="'+Mt(n.href)+'"]');if(a)return t.instance=a,Je(a),a;var l=C({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),Je(a),tt(a,"style",l),uo(a,n.precedence,e),t.instance=a;case"stylesheet":l=Wa(n.href);var i=e.querySelector(Zl(l));if(i)return t.state.loading|=4,t.instance=i,Je(i),i;a=yf(n),(l=wt.get(l))&&zr(a,l),i=(e.ownerDocument||e).createElement("link"),Je(i);var o=i;return o._p=new Promise(function(u,c){o.onload=u,o.onerror=c}),tt(i,"link",a),t.state.loading|=4,uo(i,n.precedence,e),t.instance=i;case"script":return i=Ia(n.src),(l=e.querySelector(Kl(i)))?(t.instance=l,Je(l),l):(a=n,(l=wt.get(i))&&(a=C({},n),jr(a,l)),e=e.ownerDocument||e,l=e.createElement("script"),Je(l),tt(l,"link",a),e.head.appendChild(l),t.instance=l);case"void":return null;default:throw Error(s(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(a=t.instance,t.state.loading|=4,uo(a,n.precedence,e));return t.instance}function uo(e,t,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,o=0;o<a.length;o++){var u=a[o];if(u.dataset.precedence===t)i=u;else if(i!==l)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function zr(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function jr(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var ro=null;function xf(e,t,n){if(ro===null){var a=new Map,l=ro=new Map;l.set(n,a)}else l=ro,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(e))return a;for(a.set(e,null),n=n.getElementsByTagName(e),l=0;l<n.length;l++){var i=n[l];if(!(i[cl]||i[pe]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var o=i.getAttribute(t)||"";o=e+o;var u=a.get(o);u?u.push(i):a.set(o,[i])}}return a}function Sf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function ap(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Tf(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function lp(e,t,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=Wa(a.href),i=t.querySelector(Zl(l));if(i){t=i._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=co.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=i,Je(i);return}i=t.ownerDocument||t,a=yf(a),(l=wt.get(l))&&zr(a,l),i=i.createElement("link"),Je(i);var o=i;o._p=new Promise(function(u,c){o.onload=u,o.onerror=c}),tt(i,"link",a),n.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=co.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var Dr=0;function ip(e,t){return e.stylesheets&&e.count===0&&fo(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var a=setTimeout(function(){if(e.stylesheets&&fo(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+t);0<e.imgBytes&&Dr===0&&(Dr=62500*Nh());var l=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&fo(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>Dr?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function co(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)fo(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var so=null;function fo(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,so=new Map,t.forEach(op,e),so=null,co.call(e))}function op(e,t){if(!(t.state.loading&4)){var n=so.get(e);if(n)var a=n.get(null);else{n=new Map,so.set(e,n);for(var l=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var o=l[i];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(n.set(o.dataset.precedence,o),a=o)}a&&n.set(null,a)}l=t.instance,o=l.getAttribute("data-precedence"),i=n.get(o)||a,i===a&&n.set(null,l),n.set(o,l),this.count++,a=co.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(l,e.firstChild)),t.state.loading|=4}}var Jl={$$typeof:re,Provider:null,Consumer:null,_currentValue:F,_currentValue2:F,_threadCount:0};function up(e,t,n,a,l,i,o,u,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=pa(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pa(0),this.hiddenUpdates=pa(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function Af(e,t,n,a,l,i,o,u,c,g,T,M){return e=new up(e,t,n,o,c,g,T,M,u),t=1,i===!0&&(t|=24),i=vt(3,null,null,t),e.current=i,i.stateNode=e,t=ru(),t.refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:t},fu(i),e}function Ef(e){return e?(e=ja,e):ja}function _f(e,t,n,a,l,i){l=Ef(l),a.context===null?a.context=l:a.pendingContext=l,a=Tn(t),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=An(e,a,t),n!==null&&(pt(n,e,t),Ml(n,e,t))}function Mf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Cr(e,t){Mf(e,t),(e=e.alternate)&&Mf(e,t)}function zf(e){if(e.tag===13||e.tag===31){var t=$n(e,67108864);t!==null&&pt(t,e,67108864),Cr(e,67108864)}}function jf(e){if(e.tag===13||e.tag===31){var t=Tt();t=b(t);var n=$n(e,t);n!==null&&pt(n,e,t),Cr(e,t)}}var mo=!0;function rp(e,t,n,a){var l=A.T;A.T=null;var i=w.p;try{w.p=2,Or(e,t,n,a)}finally{w.p=i,A.T=l}}function cp(e,t,n,a){var l=A.T;A.T=null;var i=w.p;try{w.p=8,Or(e,t,n,a)}finally{w.p=i,A.T=l}}function Or(e,t,n,a){if(mo){var l=Rr(a);if(l===null)vr(e,t,a,ho,n),Cf(e,a);else if(dp(l,e,t,n,a))a.stopPropagation();else if(Cf(e,a),t&4&&-1<sp.indexOf(e)){for(;l!==null;){var i=va(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var o=kt(i.pendingLanes);if(o!==0){var u=i;for(u.pendingLanes|=2,u.entangledLanes|=2;o;){var c=1<<31-nt(o);u.entanglements[1]|=c,o&=~c}Xt(i),(xe&6)===0&&(Fi=Ie()+500,Yl(0))}}break;case 31:case 13:u=$n(i,2),u!==null&&pt(u,i,2),Ii(),Cr(i,2)}if(i=Rr(a),i===null&&vr(e,t,a,ho,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else vr(e,t,a,null,n)}}function Rr(e){return e=wo(e),Ur(e)}var ho=null;function Ur(e){if(ho=null,e=ga(e),e!==null){var t=O(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=R(t),e!==null)return e;e=null}else if(n===31){if(e=U(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return ho=e,null}function Df(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(al()){case ti:return 2;case Vn:return 8;case Zt:case ll:return 32;case ha:return 268435456;default:return 32}default:return 32}}var wr=!1,wn=null,Bn=null,qn=null,Fl=new Map,Wl=new Map,Hn=[],sp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Cf(e,t){switch(e){case"focusin":case"focusout":wn=null;break;case"dragenter":case"dragleave":Bn=null;break;case"mouseover":case"mouseout":qn=null;break;case"pointerover":case"pointerout":Fl.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Wl.delete(t.pointerId)}}function Il(e,t,n,a,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},t!==null&&(t=va(t),t!==null&&zf(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function dp(e,t,n,a,l){switch(t){case"focusin":return wn=Il(wn,e,t,n,a,l),!0;case"dragenter":return Bn=Il(Bn,e,t,n,a,l),!0;case"mouseover":return qn=Il(qn,e,t,n,a,l),!0;case"pointerover":var i=l.pointerId;return Fl.set(i,Il(Fl.get(i)||null,e,t,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,Wl.set(i,Il(Wl.get(i)||null,e,t,n,a,l)),!0}return!1}function Of(e){var t=ga(e.target);if(t!==null){var n=O(t);if(n!==null){if(t=n.tag,t===13){if(t=R(n),t!==null){e.blockedOn=t,Ae(e.priority,function(){jf(n)});return}}else if(t===31){if(t=U(n),t!==null){e.blockedOn=t,Ae(e.priority,function(){jf(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function po(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Rr(e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);Uo=a,n.target.dispatchEvent(a),Uo=null}else return t=va(n),t!==null&&zf(t),e.blockedOn=n,!1;t.shift()}return!0}function Rf(e,t,n){po(e)&&n.delete(t)}function fp(){wr=!1,wn!==null&&po(wn)&&(wn=null),Bn!==null&&po(Bn)&&(Bn=null),qn!==null&&po(qn)&&(qn=null),Fl.forEach(Rf),Wl.forEach(Rf)}function go(e,t){e.blockedOn===t&&(e.blockedOn=null,wr||(wr=!0,d.unstable_scheduleCallback(d.unstable_NormalPriority,fp)))}var vo=null;function Uf(e){vo!==e&&(vo=e,d.unstable_scheduleCallback(d.unstable_NormalPriority,function(){vo===e&&(vo=null);for(var t=0;t<e.length;t+=3){var n=e[t],a=e[t+1],l=e[t+2];if(typeof a!="function"){if(Ur(a||n)===null)continue;break}var i=va(n);i!==null&&(e.splice(t,3),t-=3,Ru(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function $a(e){function t(c){return go(c,e)}wn!==null&&go(wn,e),Bn!==null&&go(Bn,e),qn!==null&&go(qn,e),Fl.forEach(t),Wl.forEach(t);for(var n=0;n<Hn.length;n++){var a=Hn[n];a.blockedOn===e&&(a.blockedOn=null)}for(;0<Hn.length&&(n=Hn[0],n.blockedOn===null);)Of(n),n.blockedOn===null&&Hn.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],o=l[Ce]||null;if(typeof i=="function")o||Uf(n);else if(o){var u=null;if(i&&i.hasAttribute("formAction")){if(l=i,o=i[Ce]||null)u=o.formAction;else if(Ur(l)!==null)continue}else u=o.action;typeof u=="function"?n[a+1]=u:(n.splice(a,3),a-=3),Uf(n)}}}function wf(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(o){return l=o})},focusReset:"manual",scroll:"manual"})}function t(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),l!==null&&(l(),l=null)}}}function Br(e){this._internalRoot=e}yo.prototype.render=Br.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(s(409));var n=t.current,a=Tt();_f(n,a,e,t,null,null)},yo.prototype.unmount=Br.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;_f(e.current,2,null,e,null,null),Ii(),t[pn]=null}};function yo(e){this._internalRoot=e}yo.prototype.unstable_scheduleHydration=function(e){if(e){var t=ne();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Hn.length&&t!==0&&t<Hn[n].priority;n++);Hn.splice(n,0,e),n===0&&Of(e)}};var Bf=z.version;if(Bf!=="19.2.4")throw Error(s(527,Bf,"19.2.4"));w.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=x(t),e=e!==null?X(e):null,e=e===null?null:e.stateNode,e};var mp={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:A,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var bo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!bo.isDisabled&&bo.supportsFiber)try{fn=bo.inject(mp),qe=bo}catch{}}return Pl.createRoot=function(e,t){if(!E(e))throw Error(s(299));var n=!1,a="",l=Gs,i=Ys,o=Vs;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Af(e,1,!1,null,null,n,a,null,l,i,o,wf),e[pn]=t.current,gr(e),new Br(t)},Pl.hydrateRoot=function(e,t,n){if(!E(e))throw Error(s(299));var a=!1,l="",i=Gs,o=Ys,u=Vs,c=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(o=n.onCaughtError),n.onRecoverableError!==void 0&&(u=n.onRecoverableError),n.formState!==void 0&&(c=n.formState)),t=Af(e,1,!0,t,n??null,a,l,c,i,o,u,wf),t.context=Ef(null),n=t.current,a=Tt(),a=b(a),l=Tn(a),l.callback=null,An(n,l,a),n=a,t.current.lanes=n,hn(t,n),Xt(t),e[pn]=t.current,gr(e),new yo(t)},Pl.version="19.2.4",Pl}var Qf;function _p(){if(Qf)return Lr.exports;Qf=1;function d(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(d)}catch(z){console.error(z)}}return d(),Lr.exports=Ep(),Lr.exports}var Mp=_p();const zp="modulepreload",jp=function(d){return"/docs/"+d},Zf={},Z=function(z,y,s){let E=Promise.resolve();if(y&&y.length>0){let R=function(x){return Promise.all(x.map(X=>Promise.resolve(X).then(C=>({status:"fulfilled",value:C}),C=>({status:"rejected",reason:C}))))};document.getElementsByTagName("link");const U=document.querySelector("meta[property=csp-nonce]"),D=(U==null?void 0:U.nonce)||(U==null?void 0:U.getAttribute("nonce"));E=R(y.map(x=>{if(x=jp(x),x in Zf)return;Zf[x]=!0;const X=x.endsWith(".css"),C=X?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${C}`))return;const I=document.createElement("link");if(I.rel=X?"stylesheet":zp,X||(I.as="script"),I.crossOrigin="",I.href=x,D&&I.setAttribute("nonce",D),document.head.appendChild(I),X)return new Promise(($,V)=>{I.addEventListener("load",$),I.addEventListener("error",()=>V(new Error(`Unable to preload CSS for ${x}`)))})}))}function O(R){const U=new Event("vite:preloadError",{cancelable:!0});if(U.payload=R,window.dispatchEvent(U),!U.defaultPrevented)throw R}return E.then(R=>{for(const U of R||[])U.status==="rejected"&&O(U.reason);return z().catch(O)})},xo={amber:{dark:{bg:"#09090b",sf:"#111114",sfH:"#18181c",bd:"#1e1e24",tx:"#e4e4e7",tx2:"#a1a1aa",txM:"#919199",ac:"#e8a845",acD:"rgba(232,168,69,0.12)",acT:"#fbbf24",cdBg:"#0c0c0f",cdTx:"#c4c4cc",sbBg:"#0c0c0e",hdBg:"rgba(9,9,11,0.85)"},light:{bg:"#fafaf9",sf:"#ffffff",sfH:"#f5f5f4",bd:"#e7e5e4",tx:"#1c1917",tx2:"#57534e",txM:"#706b66",ac:"#96640a",acD:"rgba(150,100,10,0.08)",acT:"#7a5208",cdBg:"#f5f3f0",cdTx:"#2c2520",sbBg:"#f5f5f3",hdBg:"rgba(250,250,249,0.85)"},fonts:{heading:"Instrument Serif",body:"DM Sans",code:"JetBrains Mono"}},editorial:{dark:{bg:"#080c1f",sf:"#0e1333",sfH:"#141940",bd:"#1a2050",tx:"#e8e6f0",tx2:"#b5b1c8",txM:"#9490ae",ac:"#ff6b4a",acD:"rgba(255,107,74,0.1)",acT:"#ff8a70",cdBg:"#0a0e27",cdTx:"#b8b4cc",sbBg:"#0a0e27",hdBg:"rgba(8,12,31,0.9)"},light:{bg:"#f6f4f0",sf:"#ffffff",sfH:"#eeece6",bd:"#ddd9d0",tx:"#1a1716",tx2:"#4a443e",txM:"#706960",ac:"#b83d22",acD:"rgba(184,61,34,0.07)",acT:"#9c3019",cdBg:"#edeae4",cdTx:"#3a3530",sbBg:"#f0ede8",hdBg:"rgba(246,244,240,0.92)"},fonts:{heading:"Cormorant Garamond",body:"Bricolage Grotesque",code:"Fira Code"}}},Dp=()=>r.jsx("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:r.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),Cp=()=>r.jsx("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:r.jsx("path",{d:"M18 6L6 18M6 6l12 12"})}),Op=()=>r.jsx("svg",{width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:r.jsx("path",{d:"M22 2L11 13M22 2l-7 20-4-9-9-4z"})});function tm(d){let z="You are a helpful documentation assistant. Answer questions accurately based on the documentation provided below. If the answer isn't in the documentation, say so clearly. Keep answers concise and reference specific sections when possible.";if(d){const y=d.length>1e5?d.slice(0,1e5)+`

[Documentation truncated...]`:d;z+=`

Documentation:
${y}`}return z}async function Rp(d,z,y,s){var R,U,D;const E=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${z}`},body:JSON.stringify({model:y,messages:[{role:"system",content:tm(s)},...d.map(x=>({role:x.role,content:x.content}))]})});if(!E.ok){const x=await E.text();throw new Error(`OpenAI API error (${E.status}): ${x}`)}return((D=(U=(R=(await E.json()).choices)==null?void 0:R[0])==null?void 0:U.message)==null?void 0:D.content)||"No response."}async function Up(d,z,y,s){var R,U;const E=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":z,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:y,max_tokens:1024,system:tm(s),messages:d.map(D=>({role:D.role,content:D.content}))})});if(!E.ok){const D=await E.text();throw new Error(`Anthropic API error (${E.status}): ${D}`)}return((U=(R=(await E.json()).content)==null?void 0:R[0])==null?void 0:U.text)||"No response."}function wp(d){return d==="openai"?"gpt-4o-mini":"claude-sonnet-4-20250514"}function Bp({provider:d,model:z,apiKey:y,context:s}){const[E,O]=q.useState(!1),[R,U]=q.useState([]),[D,x]=q.useState(""),[X,C]=q.useState(!1),[I,$]=q.useState(null),V=q.useRef(null),H=q.useRef(null),ue=y||(typeof window<"u"?window.__TOME_AI_API_KEY__:void 0),L=z||wp(d);q.useEffect(()=>{var J;(J=V.current)==null||J.scrollIntoView({behavior:"smooth"})},[R]),q.useEffect(()=>{E&&setTimeout(()=>{var J;return(J=H.current)==null?void 0:J.focus()},100)},[E]);const ie=q.useCallback(async()=>{const J=D.trim();if(!J||X||!ue)return;const Se={role:"user",content:J},ge=[...R,Se];U(ge),x(""),C(!0),$(null);try{let K;d==="openai"?K=await Rp(ge,ue,L,s):K=await Up(ge,ue,L,s),U(te=>[...te,{role:"assistant",content:K}])}catch(K){$(K instanceof Error?K.message:"Failed to get response")}finally{C(!1)}},[D,X,R,d,ue,L,s]),re=q.useCallback(J=>{J.key==="Enter"&&!J.shiftKey&&(J.preventDefault(),ie())},[ie]);return E?r.jsxs("div",{"data-testid":"ai-chat-panel",style:{position:"fixed",bottom:24,right:24,zIndex:900,width:380,maxWidth:"calc(100vw - 48px)",height:520,maxHeight:"calc(100vh - 48px)",background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,boxShadow:"0 16px 64px rgba(0,0,0,0.3)",display:"flex",flexDirection:"column",overflow:"hidden",fontFamily:"var(--font-body)"},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderBottom:"1px solid var(--bd)",flexShrink:0},children:[r.jsx("span",{style:{fontSize:14,fontWeight:600,color:"var(--tx)"},children:"Ask AI"}),r.jsx("button",{"data-testid":"ai-chat-close",onClick:()=>O(!1),"aria-label":"Close AI chat",style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex",padding:4},children:r.jsx(Cp,{})})]}),r.jsxs("div",{style:{flex:1,overflow:"auto",padding:"12px 16px"},children:[!ue&&r.jsxs("div",{"data-testid":"ai-chat-no-key",style:{textAlign:"center",color:"var(--txM)",fontSize:13,padding:"24px 8px",lineHeight:1.6},children:[r.jsx("p",{style:{marginBottom:8,fontWeight:500,color:"var(--tx)"},children:"AI not configured"}),r.jsxs("p",{style:{marginBottom:8},children:["To enable AI chat, set the ",r.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"apiKeyEnv"})," in ",r.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"tome.config.js"})," and provide the environment variable at build time."]}),r.jsxs("p",{style:{fontSize:11.5,color:"var(--txM)"},children:["Example: ",r.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"TOME_AI_KEY=sk-... tome build"})]})]}),R.map((J,Se)=>r.jsx("div",{"data-testid":`ai-chat-message-${J.role}`,style:{marginBottom:12,display:"flex",justifyContent:J.role==="user"?"flex-end":"flex-start"},children:r.jsx("div",{style:{maxWidth:"85%",padding:"8px 12px",borderRadius:10,fontSize:13,lineHeight:1.55,whiteSpace:"pre-wrap",wordBreak:"break-word",background:J.role==="user"?"var(--ac)":"var(--cdBg)",color:J.role==="user"?"#fff":"var(--tx)"},children:J.content})},Se)),X&&r.jsx("div",{"data-testid":"ai-chat-loading",style:{display:"flex",justifyContent:"flex-start",marginBottom:12},children:r.jsx("div",{style:{padding:"8px 12px",borderRadius:10,fontSize:13,background:"var(--cdBg)",color:"var(--txM)"},children:"Thinking..."})}),I&&r.jsx("div",{"data-testid":"ai-chat-error",style:{padding:"8px 12px",borderRadius:8,fontSize:12,background:"rgba(220,50,50,0.1)",color:"#d44",marginBottom:12},children:I}),r.jsx("div",{ref:V})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderTop:"1px solid var(--bd)",flexShrink:0},children:[r.jsx("input",{ref:H,"data-testid":"ai-chat-input",value:D,onChange:J=>x(J.target.value),onKeyDown:re,placeholder:ue?"Ask a question...":"API key required",disabled:!ue,style:{flex:1,background:"var(--cdBg)",border:"1px solid var(--bd)",borderRadius:8,padding:"8px 12px",color:"var(--tx)",fontSize:13,fontFamily:"var(--font-body)",outline:"none"}}),r.jsx("button",{"data-testid":"ai-chat-send",onClick:ie,disabled:!ue||!D.trim()||X,"aria-label":"Send message",style:{width:34,height:34,borderRadius:8,background:ue&&D.trim()?"var(--ac)":"var(--cdBg)",color:ue&&D.trim()?"#fff":"var(--txM)",border:"none",cursor:ue&&D.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:r.jsx(Op,{})})]})]}):r.jsx("button",{"data-testid":"ai-chat-button",onClick:()=>O(!0),"aria-label":"Open AI chat",style:{position:"fixed",bottom:24,right:24,zIndex:900,width:48,height:48,borderRadius:"50%",background:"var(--ac)",color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(0,0,0,0.25)",transition:"transform 0.15s"},children:r.jsx(Dp,{})})}function qp(d){const z=/^#([0-9a-f]{6})$/i.exec(d.trim());if(!z)return null;const y=parseInt(z[1],16);return[y>>16&255,y>>8&255,y&255]}function Hp(d,z){const y=qp(d);if(!y)return null;const[s,E,O]=y,R=`rgba(${s},${E},${O},${z?.12:.08})`,U=z?1.15:.85,D=Math.min(255,Math.round(s*U)),x=Math.min(255,Math.round(E*U)),X=Math.min(255,Math.round(O*U)),C=`rgb(${D},${x},${X})`;return{ac:d,acD:R,acT:C}}const At=({d,size:z=16})=>r.jsx("svg",{width:z,height:z,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:r.jsx("path",{d})}),nm=()=>r.jsx(At,{d:"M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3"}),Kf=()=>r.jsx(At,{d:"M9 18l6-6-6-6",size:14}),Yr=()=>r.jsx(At,{d:"M6 9l6 6 6-6",size:14}),Lp=()=>r.jsx(At,{d:"M3 12h18M3 6h18M3 18h18",size:20}),Np=()=>r.jsx(At,{d:"M18 6L6 18M6 6l12 12",size:18}),Jf=()=>r.jsx(At,{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"}),Ff=()=>r.jsx(At,{d:"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-4a1 1 0 0 1 1-1v-1a1 1 0 0 1-2 0v1a1 1 0 0 1 1 1Zm0 16a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1Zm18-1h-1a1 1 0 0 1 0 2h1a1 1 0 0 1 0-2ZM6.34 6.34a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41Zm12.73-2.12-.71.71a1 1 0 0 1-1.41-1.41l.71-.71a1 1 0 1 1 1.41 1.41ZM6.34 17.66l-.71.71a1 1 0 0 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 1.41Zm12.73 2.12-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1-1.41 1.41Z"}),kp=()=>r.jsx(At,{d:"M19 12H5M12 19l-7-7 7-7",size:14}),Gp=()=>r.jsx(At,{d:"M5 12h14M12 5l7 7-7 7",size:14}),Yp=()=>r.jsx(At,{d:"M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",size:13});function Vp(d){const z=new Date(d),s=new Date().getTime()-z.getTime();if(isNaN(s))return"";const E=Math.floor(s/1e3),O=Math.floor(E/60),R=Math.floor(O/60),U=Math.floor(R/24),D=Math.floor(U/30),x=Math.floor(U/365);return E<60?"just now":O<60?`${O} minute${O===1?"":"s"} ago`:R<24?`${R} hour${R===1?"":"s"} ago`:U<30?`${U} day${U===1?"":"s"} ago`:D<12?`${D} month${D===1?"":"s"} ago`:x>=1?`${x} year${x===1?"":"s"} ago`:z.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}let Pa=null;const Xp="/_pagefind/pagefind.js";async function Qp(){if(Pa)return Pa;try{return Pa=await import(Xp),await Pa.init(),Pa}catch{return null}}let So=null;function Zp(){return So||(So=Z(()=>import("./index-hPVXE3l0.js"),[]).catch(()=>null),So)}function Kp({appId:d,apiKey:z,indexName:y,onNavigate:s,onClose:E,basePath:O=""}){const[R,U]=q.useState(null),[D,x]=q.useState(!1);q.useEffect(()=>{Zp().then(C=>{C&&C.DocSearch?U(()=>C.DocSearch):C&&C.default?U(()=>C.default):x(!0)})},[]);const X=q.useCallback(C=>{try{let $=new URL(C,"http://localhost").pathname;if(O){const V=O.replace(/\/$/,"");$.startsWith(V)&&($=$.slice(V.length))}return $.replace(/^\//,"").replace(/\/index\.html$/,"").replace(/\.html$/,"")||"index"}catch{return"index"}},[O]);return D?r.jsx("div",{onClick:E,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"12vh"},children:r.jsx("div",{onClick:C=>C.stopPropagation(),style:{background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,width:"100%",maxWidth:520,boxShadow:"0 24px 80px rgba(0,0,0,0.4)",padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"Algolia DocSearch is not available. Install @docsearch/react to enable it."})}):R?r.jsx("div",{"data-testid":"algolia-search-modal",children:r.jsx(R,{appId:d,apiKey:z,indexName:y,navigator:{navigate({itemUrl:C}){const I=X(C);s(I)}},hitComponent:({hit:C,children:I})=>r.jsx("a",{href:C.url,onClick:$=>{$.preventDefault();const V=X(C.url);s(V)},children:I})})}):r.jsx("div",{onClick:E,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"12vh"},children:r.jsx("div",{style:{background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,width:"100%",maxWidth:520,boxShadow:"0 24px 80px rgba(0,0,0,0.4)",padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"Loading search..."})})}const Jp=()=>r.jsx(At,{d:"M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",size:14}),Fp=()=>r.jsx(At,{d:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z",size:14}),Wp=()=>r.jsx(At,{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3",size:11}),Ip={Added:"#22c55e",Changed:"#3b82f6",Deprecated:"#f59e0b",Removed:"#ef4444",Fixed:"#8b5cf6",Security:"#f97316"};function $p({entries:d}){const[z,y]=q.useState(d.length<=5),s=z?d:d.slice(0,5);return r.jsxs("div",{"data-testid":"changelog-timeline",style:{position:"relative"},children:[r.jsx("div",{style:{position:"absolute",left:15,top:8,bottom:8,width:2,background:"var(--bd)"}}),s.map((E,O)=>r.jsxs("div",{"data-testid":`changelog-entry-${E.version}`,style:{position:"relative",paddingLeft:44,paddingBottom:O<s.length-1?32:0},children:[r.jsx("div",{style:{position:"absolute",left:8,top:6,width:16,height:16,borderRadius:"50%",background:E.version==="Unreleased"?"var(--txM)":"var(--ac)",border:"3px solid var(--bg, #1a1a1a)"}}),r.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:12,marginBottom:12},children:[r.jsx("span",{style:{fontSize:18,fontWeight:700,color:"var(--tx)",fontFamily:"var(--font-heading, inherit)"},children:E.url?r.jsx("a",{href:E.url,target:"_blank",rel:"noopener noreferrer",style:{color:"inherit",textDecoration:"none"},children:E.version}):E.version}),E.date&&r.jsx("span",{style:{fontSize:13,color:"var(--txM)",fontFamily:"var(--font-code, monospace)"},children:E.date})]}),E.sections.map(R=>{const U=Ip[R.type]||"#6b7280";return r.jsxs("div",{style:{marginBottom:16},children:[r.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,marginBottom:8},children:[r.jsx("span",{style:{display:"inline-block",width:8,height:8,borderRadius:"50%",background:U}}),r.jsx("span",{style:{fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em",color:U,fontFamily:"var(--font-code, monospace)"},children:R.type})]}),r.jsx("ul",{style:{margin:0,paddingLeft:18,listStyleType:"disc",color:"var(--tx2)"},children:R.items.map((D,x)=>r.jsx("li",{style:{fontSize:14,lineHeight:1.7,color:"var(--tx2)",marginBottom:2},children:D},x))})]},R.type)})]},E.version)),!z&&d.length>5&&r.jsx("div",{style:{textAlign:"center",marginTop:24},children:r.jsxs("button",{"data-testid":"changelog-show-more",onClick:()=>y(!0),style:{background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"8px 20px",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body, inherit)",cursor:"pointer"},children:["Show all ",d.length," releases"]})})]})}function Pp({config:d,navigation:z,currentPageId:y,pageHtml:s,pageComponent:E,mdxComponents:O,pageTitle:R,pageDescription:U,headings:D,tocEnabled:x=!0,editUrl:X,lastUpdated:C,changelogEntries:I,onNavigate:$,allPages:V,versioning:H,currentVersion:ue,i18n:L,currentLocale:ie,docContext:re,basePath:J=""}){var nt,ni,ai,li,Xn,Qn,Zn,kt,Kn,mn,ii,il,pa,hn,oi,ol,ul,rl;const Se=((nt=d.theme)==null?void 0:nt.mode)||"auto",[ge,K]=q.useState(()=>{var b;return Se==="dark"?!0:Se==="light"?!1:((b=window.matchMedia)==null?void 0:b.call(window,"(prefers-color-scheme: dark)").matches)??!0}),[te,lt]=q.useState(()=>typeof window<"u"&&window.innerWidth<768),[it,ot]=q.useState(()=>typeof window<"u"&&window.innerWidth>=768),[We,ut]=q.useState(!1),[Bt,ct]=q.useState(!1),[A,w]=q.useState(!1),[F,ve]=q.useState(null),[Te,m]=q.useState({}),[j,B]=q.useState(()=>{var b;if(!((b=d.banner)!=null&&b.text))return!0;try{const G=Array.from(d.banner.text).reduce((ne,Ae)=>(ne<<5)-ne+Ae.charCodeAt(0)|0,0).toString(36);return localStorage.getItem("tome-banner-dismissed")===G}catch{return!1}}),k=H&&ue&&ue!==H.current,[P,oe]=q.useState(z.map(b=>b.section)),ce=q.useRef(null),Qe=q.useRef(null),we=q.useRef(""),[Nn,fa]=q.useState(()=>typeof window<"u"&&window.innerWidth>1100),ma=((ni=d.theme)==null?void 0:ni.preset)||"amber",el=((ai=xo[ma])==null?void 0:ai[ge?"dark":"light"])||xo.amber.dark,Nt=(li=d.theme)!=null&&li.accent?Hp(d.theme.accent,ge):null,Ke=Nt?{...el,...Nt}:el,kn=((Xn=xo[ma])==null?void 0:Xn.fonts)||xo.amber.fonts,tl={heading:((Zn=(Qn=d.theme)==null?void 0:Qn.fonts)==null?void 0:Zn.heading)||kn.heading,body:((Kn=(kt=d.theme)==null?void 0:kt.fonts)==null?void 0:Kn.body)||kn.body,code:((ii=(mn=d.theme)==null?void 0:mn.fonts)==null?void 0:ii.code)||kn.code};q.useEffect(()=>{if(Se!=="auto")return;const b=window.matchMedia("(prefers-color-scheme: dark)"),G=ne=>K(ne.matches);return b.addEventListener("change",G),()=>b.removeEventListener("change",G)},[Se]),q.useEffect(()=>{document.documentElement.classList.toggle("dark",ge)},[ge]),q.useEffect(()=>{const b=()=>{const G=window.innerWidth;fa(G>1100),lt(G<768)};return b(),window.addEventListener("resize",b),()=>window.removeEventListener("resize",b)},[]),q.useEffect(()=>{if(te&&it)return document.body.style.overflow="hidden",()=>{document.body.style.overflow=""}},[te,it]),q.useEffect(()=>{var b;(b=ce.current)==null||b.scrollTo(0,0)},[y]),q.useEffect(()=>{const b=ce.current;if(!b)return;const G=ne=>{const Ae=ne.target;Ae.tagName==="IMG"&&Ae.closest(".tome-content")&&ve(Ae.src)};return b.addEventListener("click",G),()=>b.removeEventListener("click",G)},[]),q.useEffect(()=>{const b=ce.current;if(!b)return;const G=ne=>{const Ae=ne.target.closest("a");if(!Ae)return;const Ee=Ae.getAttribute("href");if(!Ee||Ee.startsWith("http://")||Ee.startsWith("https://")||Ee.startsWith("mailto:")||Ee.startsWith("tel:")||Ee.startsWith("//")||Ee.startsWith("#"))return;ne.preventDefault();let pe=Ee.replace(/^\.\//,"").replace(/^\//,"").replace(/\.mdx?$/,"").replace(/\/$/,"");if(J){const Ce=J.replace(/^\//,"").replace(/\/$/,"");Ce&&pe.startsWith(Ce+"/")?pe=pe.slice(Ce.length+1):Ce&&pe===Ce&&(pe="index")}pe||(pe="index"),$(pe)};return b.addEventListener("click",G),()=>b.removeEventListener("click",G)},[$,J]),q.useEffect(()=>{if(!F)return;const b=G=>{G.key==="Escape"&&ve(null)};return window.addEventListener("keydown",b),()=>window.removeEventListener("keydown",b)},[F]);const Qt=d.toc,nl=(Qt==null?void 0:Qt.depth)??3,Gn=(Qt==null?void 0:Qt.enabled)!==!1&&x,Yn=D.filter(b=>b.depth<=nl),[Eo,Ie]=q.useState("");q.useEffect(()=>{if(!Gn||Yn.length<2)return;const b=ce.current;if(!b)return;const G=setTimeout(()=>{const ne=[];for(const Ee of Yn){const pe=b.querySelector(`#${CSS.escape(Ee.id)}`);pe&&ne.push(pe)}if(ne.length===0)return;const Ae=new IntersectionObserver(Ee=>{const pe=Ee.filter(Ce=>Ce.isIntersecting).sort((Ce,pn)=>Ce.boundingClientRect.top-pn.boundingClientRect.top);pe.length>0&&Ie(pe[0].target.id)},{root:b,rootMargin:"0px 0px -80% 0px",threshold:0});for(const Ee of ne)Ae.observe(Ee);al.current=Ae},100);return()=>{var ne;clearTimeout(G),(ne=al.current)==null||ne.disconnect(),al.current=null}},[y,Gn,Yn.map(b=>b.id).join(",")]);const al=q.useRef(null);q.useEffect(()=>{Ie("")},[y]),q.useEffect(()=>{if(!Qe.current||!s)return;const b=s.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/,"");b!==we.current&&(Qe.current.innerHTML=b,we.current=b)},[s]);const ti=q.useCallback((b,G)=>{b.preventDefault();const ne=ce.current;if(!ne)return;const Ae=ne.querySelector(`#${CSS.escape(G)}`);Ae&&(Ae.scrollIntoView({behavior:"smooth",block:"start"}),Ie(G))},[]);q.useEffect(()=>{const b=G=>{(G.metaKey||G.ctrlKey)&&G.key==="k"&&(G.preventDefault(),ut(!0)),G.key==="Escape"&&ut(!1)};return window.addEventListener("keydown",b),()=>window.removeEventListener("keydown",b)},[]);const Vn=z.flatMap(b=>b.pages),Zt=Vn.findIndex(b=>b.id===y),ll=Zt>0?Vn[Zt-1]:null,ha=Zt<Vn.length-1?Vn[Zt+1]:null,_o=b=>oe(G=>G.includes(b)?G.filter(ne=>ne!==b):[...G,b]),Mo={"--bg":Ke.bg,"--sf":Ke.sf,"--sfH":Ke.sfH,"--bd":Ke.bd,"--tx":Ke.tx,"--tx2":Ke.tx2,"--txM":Ke.txM,"--ac":Ke.ac,"--acD":Ke.acD,"--acT":Ke.acT,"--cdBg":Ke.cdBg,"--cdTx":Ke.cdTx,"--sbBg":Ke.sbBg,"--hdBg":Ke.hdBg,"--font-heading":`"${tl.heading}", serif`,"--font-body":`"${tl.body}", sans-serif`,"--font-code":`"${tl.code}", monospace`},fn=E,qe=(il=d.banner)==null?void 0:il.link,Et=qe?qe.startsWith("#")||J&&qe.startsWith(J+"/"):!1;return r.jsxs("div",{className:"tome-grain",style:{...Mo,color:"var(--tx)",background:"var(--bg)",fontFamily:"var(--font-body)",minHeight:"100vh",overflow:"hidden"},children:[((pa=d.banner)==null?void 0:pa.text)&&!j&&r.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:12,background:"var(--ac)",color:"#fff",padding:"8px 16px",fontSize:13,fontFamily:"var(--font-body)",fontWeight:500,textAlign:"center",width:"100%",boxSizing:"border-box"},children:[d.banner.link?r.jsx("a",{href:Et&&qe.startsWith("#")?J+"/"+qe.slice(1):qe,...Et?{}:{target:"_blank",rel:"noopener noreferrer"},style:{color:"#fff",textDecoration:"underline"},onClick:Et?b=>{b.preventDefault();const G=J.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),ne=qe.startsWith("#")?qe.slice(1):qe.replace(new RegExp("^"+G+"/?"),"");$(ne||"index")}:void 0,children:d.banner.text}):r.jsx("span",{children:d.banner.text}),d.banner.dismissible!==!1&&r.jsx("button",{onClick:()=>{B(!0);try{const b=Array.from(d.banner.text).reduce((G,ne)=>(G<<5)-G+ne.charCodeAt(0)|0,0).toString(36);localStorage.setItem("tome-banner-dismissed",b)}catch{}},"aria-label":"Dismiss banner",style:{background:"none",border:"none",color:"#fff",cursor:"pointer",fontSize:16,lineHeight:1,padding:0,opacity:.8},children:"×"})]}),We&&((hn=d.search)==null?void 0:hn.provider)==="algolia"&&d.search.appId&&d.search.apiKey&&d.search.indexName?r.jsx(Kp,{appId:d.search.appId,apiKey:d.search.apiKey,indexName:d.search.indexName,onNavigate:b=>{$(b),ut(!1)},onClose:()=>ut(!1),basePath:J}):We?r.jsx(eg,{allPages:V,onNavigate:b=>{$(b),ut(!1)},onClose:()=>ut(!1),mobile:te}):null,r.jsxs("div",{style:{display:"flex",flex:1,height:(oi=d.banner)!=null&&oi.text&&!j?"calc(100vh - 32px)":"100vh"},children:[te&&it&&r.jsx("div",{onClick:()=>ot(!1),style:{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.4)",backdropFilter:"blur(2px)"}}),r.jsxs("aside",{style:{width:it?270:0,minWidth:it?270:0,background:"var(--sbBg)",borderRight:"1px solid var(--bd)",display:"flex",flexDirection:"column",transition:"width .2s, min-width .2s",overflow:"hidden",...te?{position:"fixed",top:0,left:0,bottom:0,zIndex:201}:{}},children:[r.jsxs("a",{href:"/",style:{padding:"18px 20px",display:"flex",alignItems:"baseline",gap:6,borderBottom:"1px solid var(--bd)",textDecoration:"none",color:"inherit"},children:[r.jsx("span",{style:{fontFamily:"var(--font-heading)",fontSize:22,fontWeight:700,fontStyle:"italic"},children:d.name}),r.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:"var(--ac)",display:"inline-block"}})]}),r.jsx("div",{style:{padding:"12px 14px"},children:r.jsxs("button",{onClick:()=>{ut(!0),te&&ot(!1)},style:{display:"flex",alignItems:"center",gap:8,width:"100%",background:"var(--cdBg)",border:"1px solid var(--bd)",borderRadius:2,padding:"8px 12px",cursor:"pointer",color:"var(--txM)",fontSize:12.5,fontFamily:"var(--font-body)"},children:[r.jsx(nm,{}),r.jsx("span",{style:{flex:1,textAlign:"left"},children:"Search..."}),r.jsx("kbd",{style:{fontFamily:"var(--font-code)",fontSize:9,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"2px 6px"},children:"⌘K"})]})}),r.jsx("nav",{style:{flex:1,overflow:"auto",padding:"4px 10px 20px"},children:z.map(b=>r.jsxs("div",{style:{marginBottom:8},children:[r.jsxs("button",{onClick:()=>_o(b.section),style:{display:"flex",alignItems:"center",gap:6,width:"100%",background:"none",border:"none",padding:"8px 10px",cursor:"pointer",borderRadius:2,color:"var(--txM)",fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",fontFamily:"var(--font-code)"},children:[P.includes(b.section)?r.jsx(Yr,{}):r.jsx(Kf,{}),b.section]}),P.includes(b.section)&&r.jsx("div",{style:{marginLeft:8,borderLeft:"1px solid var(--bd)",paddingLeft:0},children:b.pages.map(G=>{const ne=y===G.id;return r.jsx("button",{onClick:()=>{$(G.id),te&&ot(!1)},style:{display:"flex",alignItems:"center",gap:10,width:"100%",textAlign:"left",background:"none",border:"none",borderRadius:0,borderLeft:ne?"2px solid var(--ac)":"2px solid transparent",padding:"7px 14px",cursor:"pointer",color:ne?"var(--ac)":"var(--tx2)",fontSize:13,fontWeight:ne?500:400,fontFamily:"var(--font-body)",transition:"all .12s"},children:G.title},G.id)})})]},b.section))}),H&&te&&r.jsx("div",{style:{padding:"8px 16px",borderTop:"1px solid var(--bd)",display:"flex",gap:6},children:H.versions.map(b=>r.jsxs("button",{onClick:()=>{const G=b===H.current?"index":`${b}/index`;$(G)},style:{flex:1,padding:"6px 0",textAlign:"center",background:b===(ue||H.current)?"var(--acD)":"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,cursor:"pointer",color:b===(ue||H.current)?"var(--ac)":"var(--tx2)",fontSize:12,fontFamily:"var(--font-code)",fontWeight:b===H.current?600:400},children:[b,b===H.current?" (latest)":""]},b))}),r.jsxs("div",{style:{padding:"12px 16px",borderTop:"1px solid var(--bd)",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[Se==="auto"?r.jsx("button",{"aria-label":ge?"Switch to light mode":"Switch to dark mode",onClick:()=>K(b=>!b),style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex"},children:ge?r.jsx(Ff,{}):r.jsx(Jf,{})}):r.jsx("div",{}),r.jsxs("span",{style:{fontSize:11,color:"var(--txM)",letterSpacing:.2},children:["Built with ","♡"," by Tome"]}),r.jsx("span",{style:{fontFamily:"var(--font-code)",fontSize:10,color:"var(--txM)"},children:"v0.2.8"})]})]}),r.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"},children:[r.jsxs("header",{style:{display:"flex",alignItems:"center",gap:te?8:12,padding:te?"8px 12px":"10px 24px",borderBottom:"1px solid var(--bd)",background:"var(--hdBg)",backdropFilter:"blur(12px)",maxWidth:"100vw",overflow:"visible",position:"relative",zIndex:200},children:[r.jsx("button",{"aria-label":it?"Close sidebar":"Open sidebar",onClick:()=>ot(!it),style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex"},children:it?r.jsx(Np,{}):r.jsx(Lp,{})}),te?r.jsx("span",{style:{fontSize:13,color:"var(--ac)",fontFamily:"var(--font-code)",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:((ol=z.flatMap(b=>b.pages).find(b=>b.id===y))==null?void 0:ol.title)||""}):r.jsx("div",{style:{display:"flex",alignItems:"center",gap:8,fontFamily:"var(--font-code)",fontSize:11,color:"var(--txM)",letterSpacing:".03em",flex:1},children:z.map(b=>{const G=b.pages.find(ne=>ne.id===y);return G?r.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[r.jsx("span",{children:b.section}),r.jsx(Kf,{}),r.jsx("span",{style:{color:"var(--ac)"},children:G.title})]},b.section):null})}),d.topNav&&d.topNav.length>0&&!te&&r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[d.topNav.map(b=>{const G=b.href.startsWith("#")||J&&b.href.startsWith(J+"/"),ne=!G;return r.jsxs("a",{href:G&&b.href.startsWith("#")?J+"/"+b.href.slice(1):b.href,...ne?{target:"_blank",rel:"noopener noreferrer"}:{},onClick:G?Ae=>{Ae.preventDefault();const Ee=b.href.startsWith("#")?b.href.slice(1):b.href.replace(new RegExp("^"+J.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"/?"),"");$(Ee)}:void 0,style:{display:"flex",alignItems:"center",gap:4,color:"var(--txM)",textDecoration:"none",fontSize:12,fontFamily:"var(--font-body)",fontWeight:500,transition:"color .15s"},onMouseOver:Ae=>Ae.currentTarget.style.color="var(--ac)",onMouseOut:Ae=>Ae.currentTarget.style.color="var(--txM)",children:[b.label,ne&&r.jsx(Wp,{})]},b.label)}),r.jsx("span",{style:{width:1,height:16,background:"var(--bd)"}})]}),te&&Se==="auto"&&r.jsx("button",{"aria-label":ge?"Switch to light mode":"Switch to dark mode",onClick:()=>K(b=>!b),style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex",flexShrink:0},children:ge?r.jsx(Ff,{}):r.jsx(Jf,{})}),H&&!te&&r.jsxs("div",{style:{position:"relative"},children:[r.jsxs("button",{"data-testid":"version-switcher",onClick:()=>ct(b=>!b),style:{display:"flex",alignItems:"center",gap:6,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"5px 10px",cursor:"pointer",color:"var(--tx2)",fontSize:12,fontFamily:"var(--font-code)"},children:[r.jsx(Jp,{}),ue||H.current,r.jsx(Yr,{})]}),Bt&&r.jsx("div",{"data-testid":"version-dropdown",style:{position:"absolute",top:"100%",right:0,marginTop:4,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",overflow:"hidden",zIndex:100,minWidth:120},children:H.versions.map(b=>r.jsxs("button",{onClick:()=>{ct(!1);const G=b===H.current?"index":`${b}/index`;$(G)},style:{display:"block",width:"100%",textAlign:"left",background:b===(ue||H.current)?"var(--acD)":"none",border:"none",padding:"8px 14px",cursor:"pointer",color:b===(ue||H.current)?"var(--ac)":"var(--tx2)",fontSize:12,fontFamily:"var(--font-code)",fontWeight:b===H.current?600:400},children:[b,b===H.current?" (latest)":""]},b))})]}),L&&L.locales.length>1&&!te&&r.jsxs("div",{style:{position:"relative"},children:[r.jsxs("button",{"data-testid":"language-switcher",onClick:()=>w(b=>!b),style:{display:"flex",alignItems:"center",gap:6,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"5px 10px",cursor:"pointer",color:"var(--tx2)",fontSize:12,fontFamily:"var(--font-body)"},children:[r.jsx(Fp,{}),((ul=L.localeNames)==null?void 0:ul[ie||L.defaultLocale])||ie||L.defaultLocale,r.jsx(Yr,{})]}),A&&r.jsx("div",{"data-testid":"language-dropdown",style:{position:"absolute",top:"100%",right:0,marginTop:4,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",overflow:"hidden",zIndex:100,minWidth:120},children:L.locales.map(b=>{var Ce;const G=b===(ie||L.defaultLocale),ne=((Ce=L.localeNames)==null?void 0:Ce[b])||b,Ae=ie||L.defaultLocale;let Ee=y;Ae!==L.defaultLocale&&y.startsWith(`${Ae}/`)&&(Ee=y.slice(Ae.length+1));const pe=b===L.defaultLocale?Ee:`${b}/${Ee}`;return r.jsx("button",{onClick:()=>{w(!1),$(pe)},style:{display:"block",width:"100%",textAlign:"left",background:G?"var(--acD)":"none",border:"none",padding:"8px 14px",cursor:"pointer",color:G?"var(--ac)":"var(--tx2)",fontSize:12,fontFamily:"var(--font-body)",fontWeight:G?600:400},children:ne},b)})})]})]}),k&&r.jsxs("div",{"data-testid":"old-version-banner",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"var(--acD)",borderBottom:"1px solid var(--bd)",padding:"8px 24px",fontSize:13,color:"var(--tx2)"},children:[r.jsxs("span",{children:["You're viewing docs for ",ue,"."]}),r.jsx("button",{onClick:()=>{$("index")},style:{background:"none",border:"none",color:"var(--ac)",cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"var(--font-body)",textDecoration:"underline"},children:"Switch to latest."})]}),r.jsxs("div",{ref:ce,style:{flex:1,overflow:"auto",display:"flex"},children:[r.jsxs("main",{style:{flex:1,maxWidth:te?"100%":760,padding:te?"24px 16px 60px":"40px 48px 80px",margin:"0 auto",minWidth:0},children:[r.jsx("h1",{style:{fontFamily:"var(--font-heading)",fontSize:te?26:38,fontWeight:400,fontStyle:"italic",lineHeight:1.15,marginBottom:8},children:R}),U&&r.jsx("p",{style:{fontSize:16,color:"var(--tx2)",lineHeight:1.6,marginBottom:32},children:U}),r.jsx("div",{style:{borderTop:"1px solid var(--bd)",paddingTop:28},children:I&&I.length>0?r.jsx($p,{entries:I}):fn?r.jsx("div",{className:"tome-content",children:r.jsx(fn,{components:O||{}})}):r.jsx("div",{className:"tome-content",ref:Qe})}),(X||C)&&r.jsxs("div",{style:{marginTop:40,display:"flex",flexDirection:te?"column":"row",alignItems:te?"flex-start":"center",justifyContent:"space-between",gap:te?8:16},children:[X&&r.jsx("div",{"data-testid":"edit-page-link",children:r.jsxs("a",{href:X,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:6,color:"var(--txM)",textDecoration:"none",fontSize:13,fontFamily:"var(--font-body)",transition:"color .15s"},onMouseOver:b=>b.currentTarget.style.color="var(--ac)",onMouseOut:b=>b.currentTarget.style.color="var(--txM)",children:[r.jsx(Yp,{})," Edit this page on GitHub"]})}),C&&r.jsxs("div",{"data-testid":"last-updated",style:{fontSize:12,color:"var(--txM)",fontFamily:"var(--font-body)"},children:["Last updated ",Vp(C)]})]}),r.jsx("div",{style:{display:"flex",alignItems:"center",gap:12,marginTop:24,padding:"12px 0"},children:Te[y]?r.jsx("span",{style:{fontSize:13,color:"var(--txM)",fontFamily:"var(--font-body)"},children:"Thanks for your feedback!"}):r.jsxs(r.Fragment,{children:[r.jsx("span",{style:{fontSize:13,color:"var(--txM)",fontFamily:"var(--font-body)"},children:"Was this helpful?"}),r.jsx("button",{onClick:()=>{m(b=>({...b,[y]:!0}));try{localStorage.setItem(`tome-feedback-${y}`,"up")}catch{}},style:{background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"4px 10px",cursor:"pointer",fontSize:13,color:"var(--txM)",transition:"border-color .15s"},children:"👍"}),r.jsx("button",{onClick:()=>{m(b=>({...b,[y]:!0}));try{localStorage.setItem(`tome-feedback-${y}`,"down")}catch{}},style:{background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"4px 10px",cursor:"pointer",fontSize:13,color:"var(--txM)",transition:"border-color .15s"},children:"👎"})]})}),r.jsxs("div",{style:{display:"flex",flexDirection:te?"column":"row",justifyContent:"space-between",marginTop:16,paddingTop:24,borderTop:"1px solid var(--bd)",gap:te?12:16},children:[ll?r.jsxs("button",{onClick:()=>$(ll.id),style:{display:"flex",alignItems:"center",gap:8,background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"10px 16px",cursor:"pointer",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body)",transition:"border-color .15s, color .15s"},children:[r.jsx(kp,{})," ",ll.title]}):r.jsx("div",{}),ha?r.jsxs("button",{onClick:()=>$(ha.id),style:{display:"flex",alignItems:"center",gap:8,background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"10px 16px",cursor:"pointer",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body)",transition:"border-color .15s, color .15s"},children:[ha.title," ",r.jsx(Gp,{})]}):r.jsx("div",{})]})]}),Gn&&Yn.length>=2&&Nn&&r.jsxs("aside",{"data-testid":"toc-sidebar",style:{width:200,padding:"40px 16px 40px 0",position:"sticky",top:0,alignSelf:"flex-start",flexShrink:0},children:[r.jsx("div",{style:{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",color:"var(--txM)",marginBottom:12,fontFamily:"var(--font-code)"},children:"On this page"}),r.jsx("nav",{"aria-label":"Table of contents",style:{borderLeft:"1px solid var(--bd)",paddingLeft:0},children:Yn.map((b,G)=>{const ne=Eo===b.id;return r.jsx("a",{href:`#${b.id}`,onClick:Ae=>ti(Ae,b.id),"data-testid":`toc-link-${b.id}`,style:{display:"block",fontSize:12,color:ne?"var(--ac)":"var(--txM)",fontWeight:ne?500:400,textDecoration:"none",padding:"4px 12px",paddingLeft:12+(b.depth-2)*12,lineHeight:1.4,transition:"color .15s, font-weight .15s",borderLeft:ne?"2px solid var(--ac)":"2px solid transparent",marginLeft:-1},children:b.text},G)})})]})]})]})]}),((rl=d.ai)==null?void 0:rl.enabled)&&r.jsx(Bp,{provider:d.ai.provider||"anthropic",model:d.ai.model,apiKey:typeof __TOME_AI_API_KEY__<"u"&&__TOME_AI_API_KEY__?__TOME_AI_API_KEY__:void 0,context:(re==null?void 0:re.map(b=>`## ${b.title}
${b.content}`).join(`

`))??V.map(b=>`- ${b.title}${b.description?": "+b.description:""}`).join(`
`)}),F&&r.jsx("div",{onClick:()=>ve(null),style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.7)",backdropFilter:"blur(8px)",cursor:"zoom-out"},children:r.jsx("img",{src:F,alt:"",style:{maxWidth:"90vw",maxHeight:"90vh",objectFit:"contain",borderRadius:4,boxShadow:"0 16px 64px rgba(0,0,0,0.4)"}})})]})}function eg({allPages:d,onNavigate:z,onClose:y,mobile:s}){const[E,O]=q.useState(""),[R,U]=q.useState([]),[D,x]=q.useState(0),[X,C]=q.useState(null),I=q.useRef(null),$=q.useRef(void 0);q.useEffect(()=>{Qp().then(L=>C(!!L)),setTimeout(()=>{var L;return(L=I.current)==null?void 0:L.focus()},50)},[]);const V=q.useCallback(L=>{if(!L.trim())return[];const ie=L.toLowerCase();return d.filter(re=>re.title.toLowerCase().includes(ie)||(re.description||"").toLowerCase().includes(ie)).slice(0,8).map(re=>({id:re.id,title:re.title,excerpt:re.description}))},[d]),H=q.useCallback(async L=>{var re;if(!L.trim()){U([]),x(0);return}const ie=Pa;if(ie)try{const J=await ie.search(L),Se=[];for(const ge of J.results.slice(0,8)){const K=await ge.data(),lt=(K.url||"").replace(/^\//,"").replace(/\/index\.html$/,"").replace(/\.html$/,"")||"index";Se.push({id:lt,title:((re=K.meta)==null?void 0:re.title)||lt,excerpt:K.excerpt||void 0})}U(Se),x(0);return}catch{}U(V(L)),x(0)},[V]);q.useEffect(()=>($.current&&clearTimeout($.current),$.current=setTimeout(()=>H(E),120),()=>{$.current&&clearTimeout($.current)}),[E,H]);const ue=q.useCallback(L=>{L.key==="ArrowDown"?(L.preventDefault(),x(ie=>Math.min(ie+1,R.length-1))):L.key==="ArrowUp"?(L.preventDefault(),x(ie=>Math.max(ie-1,0))):L.key==="Enter"&&R.length>0&&(L.preventDefault(),z(R[D].id))},[R,D,z]);return r.jsx("div",{onClick:y,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:s?"stretch":"flex-start",justifyContent:"center",paddingTop:s?0:"12vh"},children:r.jsxs("div",{onClick:L=>L.stopPropagation(),style:{background:"var(--sf)",border:s?"none":"1px solid var(--bd)",borderRadius:s?0:2,width:"100%",maxWidth:s?"100%":520,boxShadow:s?"none":"0 24px 80px rgba(0,0,0,0.4)",overflow:"hidden",display:"flex",flexDirection:"column",...s?{height:"100%"}:{}},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--bd)"},children:[r.jsx(nm,{}),r.jsx("input",{ref:I,value:E,onChange:L=>O(L.target.value),onKeyDown:ue,placeholder:"Search documentation...",style:{flex:1,background:"none",border:"none",outline:"none",color:"var(--tx)",fontSize:15,fontFamily:"var(--font-body)"}}),r.jsx("kbd",{style:{fontFamily:"var(--font-code)",fontSize:10,color:"var(--txM)",background:"var(--cdBg)",padding:"2px 6px",borderRadius:2,border:"1px solid var(--bd)"},children:"ESC"})]}),R.length>0&&r.jsx("div",{style:{padding:6,maxHeight:s?"none":360,overflow:"auto",flex:s?1:void 0},children:R.map((L,ie)=>r.jsxs("button",{onClick:()=>z(L.id),style:{display:"block",width:"100%",textAlign:"left",background:ie===D?"var(--acD)":"none",border:"none",borderRadius:2,padding:"10px 14px",cursor:"pointer",color:"var(--tx)",fontFamily:"var(--font-body)"},onMouseEnter:()=>x(ie),children:[r.jsx("div",{style:{fontWeight:500,fontSize:14,marginBottom:2},children:L.title}),L.excerpt&&r.jsx("div",{style:{fontSize:12,color:"var(--txM)",lineHeight:1.3},dangerouslySetInnerHTML:{__html:L.excerpt}})]},L.id+ie))}),E&&!R.length&&r.jsx("div",{style:{padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"No results found"}),X===!1&&E&&R.length>0&&r.jsx("div",{style:{padding:"6px 18px 10px",fontSize:11,color:"var(--txM)",textAlign:"center"},children:"Showing title matches. Build your site for full-text search."})]})})}function am(d,z,y){let s=d;z&&s.startsWith(z)&&(s=s.slice(z.length));const E=s.replace(/^\//,"").replace(/\/index\.html$/,"").replace(/\.html$/,"").replace(/\/$/,"")||"index";return y.find(R=>R.id===E)?E:null}function tg(d,z,y){const s=y.find(E=>E.id===d);return s?z+s.urlPath:z+"/"+d}function ng(d,z){if(!d||!z)return;const{repo:y,branch:s="main",dir:E=""}=d,O=E?`${E.replace(/\/$/,"")}/`:"";return`https://github.com/${y}/edit/${s}/${O}${z}`}function ag(d,z,y,s,E){var U;const O=E(d,s,y);if(O)return O;const R=z.startsWith("#")?z.slice(1):z;return R&&y.some(D=>D.id===R)?R:((U=y[0])==null?void 0:U.id)||"index"}async function lg(d,z,y){try{const s=z.find(O=>O.id===d),E=await y(d);return s!=null&&s.isMdx&&E.meta?{isMdx:!0,component:E.default,frontmatter:E.meta.frontmatter,headings:E.meta.headings}:E.default?E.isChangelog&&E.changelogEntries?{isMdx:!1,...E.default,changelogEntries:E.changelogEntries}:{isMdx:!1,...E.default}:null}catch(s){return console.error(`Failed to load page: ${d}`,s),null}}function ig(d,z){return(d==null?void 0:d.version)||((z==null?void 0:z.current)??void 0)}const To={name:"Tome",basePath:"/docs/",theme:{preset:"editorial",mode:"auto"},navigation:[{group:"Getting Started",pages:["index","quickstart","installation","project-structure"]},{group:"Core Concepts",pages:["configuration","pages-routing","components","theming"]},{group:"API Reference",pages:["api-overview","api-endpoints","api-auth"]},{group:"Guides",pages:["guides/search","guides/versioning","guides/migration","guides/redirects","guides/configuration","guides/custom-theme","guides/api-reference"]},{group:"Tutorials",pages:["tutorials/first-site","tutorials/deploy-to-cloud"]},{group:"Reference",pages:["reference/cli","reference/components","reference/config","reference/frontmatter","reference/theme-presets"]},{group:"Concepts",pages:["concepts/architecture","concepts/file-routing"]},{group:"CLI",pages:["cli"]}],search:{provider:"local"},versioning:{current:"v2",versions:["v2","v1"]},toc:{enabled:!0,depth:3},banner:{text:"New in v2 — GitBook & Mintlify migration, CI/CD auto-deploy, redirects, and MDX sandbox security!",link:"/docs/guides/migration",dismissible:!0},math:!1,strictLinks:!1,lastUpdated:!0,topNav:[{label:"Home",href:"/"},{label:"Dashboard",href:"/dashboard"}],redirects:[]},da=[{id:"api-auth",filePath:"v2/api-auth.md",urlPath:"/api-auth",frontmatter:{title:"Authentication",description:"Configure API authentication for the interactive playground — Bearer tokens, API keys, and custom headers.",icon:"lock",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"api-endpoints",filePath:"v2/api-endpoints.md",urlPath:"/api-endpoints",frontmatter:{title:"Endpoints",description:"How Tome renders API endpoints from your OpenAPI spec — methods, parameters, schemas, and the interactive playground.",icon:"globe",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"api-overview",filePath:"v2/api-overview.md",urlPath:"/api-overview",frontmatter:{title:"Overview",description:"Generate interactive API documentation from OpenAPI specs with Tome.",icon:"code",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"cli",filePath:"v2/cli.md",urlPath:"/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"components",filePath:"v2/components.mdx",urlPath:"/components",frontmatter:{title:"Components",description:"Built-in MDX components — Callout, Tabs, Card, Steps, Accordion, PackageManager, TypeTable, FileTree, and more.",icon:"puzzle",hidden:!1},isMdx:!0,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"concepts/architecture",filePath:"v2/concepts/architecture.md",urlPath:"/concepts/architecture",frontmatter:{title:"Architecture",description:"How Tome works internally — the Vite plugin, virtual modules, build pipeline, and theme system.",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"concepts/file-routing",filePath:"v2/concepts/file-routing.md",urlPath:"/concepts/file-routing",frontmatter:{title:"File-System Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"configuration",filePath:"v2/configuration.md",urlPath:"/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"guides/api-reference",filePath:"v2/guides/api-reference.md",urlPath:"/guides/api-reference",frontmatter:{title:"API Reference Setup",description:"How to generate an interactive API reference from an OpenAPI specification in Tome.",icon:"code",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"guides/configuration",filePath:"v2/guides/configuration.md",urlPath:"/guides/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"guides/custom-theme",filePath:"v2/guides/custom-theme.md",urlPath:"/guides/custom-theme",frontmatter:{title:"Custom Theme",description:"How to customize your Tome site's appearance — presets, accent colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"guides/migration",filePath:"v2/guides/migration.md",urlPath:"/guides/migration",frontmatter:{title:"Migrate from GitBook or Mintlify",description:"Move your existing documentation to Tome with a single command. Covers content conversion, navigation, redirects, and assets.",icon:"arrow-right-arrow-left",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"guides/redirects",filePath:"v2/guides/redirects.md",urlPath:"/guides/redirects",frontmatter:{title:"Redirects",description:"Set up URL redirects to preserve links when pages move. Supports config-level and per-page frontmatter redirects.",icon:"arrow-turn-right",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"guides/search",filePath:"v2/guides/search.md",urlPath:"/guides/search",frontmatter:{title:"Search",description:"How to set up search in your Tome documentation site — built-in Pagefind and optional Algolia DocSearch.",icon:"search",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"guides/versioning",filePath:"v2/guides/versioning.md",urlPath:"/guides/versioning",frontmatter:{title:"Multi-Version Docs",description:"How to maintain multiple versions of your documentation with Tome's built-in versioning system.",icon:"layers",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"index",filePath:"v2/index.md",urlPath:"/",frontmatter:{title:"Introduction",description:"Tome is an open-source documentation platform for Markdown and MDX. Beautiful docs without the $250/month price tag.",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"installation",filePath:"v2/installation.mdx",urlPath:"/installation",frontmatter:{title:"Installation",description:"System requirements and detailed installation instructions for Tome.",icon:"download",hidden:!1},isMdx:!0,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"pages-routing",filePath:"v2/pages-routing.md",urlPath:"/pages-routing",frontmatter:{title:"Pages & Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",icon:"map",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"project-structure",filePath:"v2/project-structure.mdx",urlPath:"/project-structure",frontmatter:{title:"Project Structure",description:"How a Tome documentation project is organized — pages, config, entry point, and build output.",icon:"folder",hidden:!1},isMdx:!0,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"quickstart",filePath:"v2/quickstart.md",urlPath:"/quickstart",frontmatter:{title:"Quickstart",description:"Get a Tome documentation site running in under a minute.",icon:"zap",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"reference/cli",filePath:"v2/reference/cli.md",urlPath:"/reference/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"reference/components",filePath:"v2/reference/components.md",urlPath:"/reference/components",frontmatter:{title:"Components",description:"Reference for all built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.",icon:"puzzle",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"reference/config",filePath:"v2/reference/config.md",urlPath:"/reference/config",frontmatter:{title:"Config Reference",description:"Complete reference for every field in tome.config.js — types, defaults, and descriptions.",icon:"file-text",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"reference/frontmatter",filePath:"v2/reference/frontmatter.md",urlPath:"/reference/frontmatter",frontmatter:{title:"Frontmatter",description:"Reference for all YAML frontmatter fields supported in Tome documentation pages.",icon:"file-text",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"reference/theme-presets",filePath:"v2/reference/theme-presets.md",urlPath:"/reference/theme-presets",frontmatter:{title:"Theme Presets",description:"Detailed reference for Tome's built-in theme presets — color tokens, CSS variables, and font stacks.",icon:"swatches",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"theming",filePath:"v2/theming.md",urlPath:"/theming",frontmatter:{title:"Theming",description:"Customize the look of your Tome site — presets, colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"tutorials/deploy-to-cloud",filePath:"v2/tutorials/deploy-to-cloud.md",urlPath:"/tutorials/deploy-to-cloud",frontmatter:{title:"Deploy to Tome Cloud",description:"Publish your documentation site to Tome Cloud with a single command. Includes custom domain setup.",icon:"cloud",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"tutorials/first-site",filePath:"v2/tutorials/first-site.md",urlPath:"/tutorials/first-site",frontmatter:{title:"Create Your First Site",description:"A step-by-step tutorial that walks you through creating a documentation site with Tome, from installation to running the dev server.",icon:"rocket",hidden:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/api-auth",filePath:"v1/api-auth.md",urlPath:"/v1/api-auth",frontmatter:{title:"Authentication",description:"Configure API authentication for the interactive playground — Bearer tokens, API keys, and custom headers.",icon:"lock",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/api-endpoints",filePath:"v1/api-endpoints.md",urlPath:"/v1/api-endpoints",frontmatter:{title:"Endpoints",description:"How Tome renders API endpoints from your OpenAPI spec — methods, parameters, schemas, and the interactive playground.",icon:"globe",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/api-overview",filePath:"v1/api-overview.md",urlPath:"/v1/api-overview",frontmatter:{title:"Overview",description:"Generate interactive API documentation from OpenAPI specs with Tome.",icon:"code",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/cli",filePath:"v1/cli.md",urlPath:"/v1/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/components",filePath:"v1/components.mdx",urlPath:"/v1/components",frontmatter:{title:"Components",description:"Built-in MDX components — Callout, Tabs, Card, Steps, Accordion, PackageManager, TypeTable, FileTree, and more.",icon:"puzzle",hidden:!1},isMdx:!0,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/concepts/architecture",filePath:"v1/concepts/architecture.md",urlPath:"/v1/concepts/architecture",frontmatter:{title:"Architecture",description:"How Tome works internally — the Vite plugin, virtual modules, build pipeline, and theme system.",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/concepts/file-routing",filePath:"v1/concepts/file-routing.md",urlPath:"/v1/concepts/file-routing",frontmatter:{title:"File-System Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/configuration",filePath:"v1/configuration.md",urlPath:"/v1/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/guides/api-reference",filePath:"v1/guides/api-reference.md",urlPath:"/v1/guides/api-reference",frontmatter:{title:"API Reference Setup",description:"How to generate an interactive API reference from an OpenAPI specification in Tome.",icon:"code",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/guides/configuration",filePath:"v1/guides/configuration.md",urlPath:"/v1/guides/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/guides/custom-theme",filePath:"v1/guides/custom-theme.md",urlPath:"/v1/guides/custom-theme",frontmatter:{title:"Custom Theme",description:"How to customize your Tome site's appearance — presets, accent colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/guides/search",filePath:"v1/guides/search.md",urlPath:"/v1/guides/search",frontmatter:{title:"Search",description:"How to set up search in your Tome documentation site — built-in Pagefind and optional Algolia DocSearch.",icon:"search",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/guides/versioning",filePath:"v1/guides/versioning.md",urlPath:"/v1/guides/versioning",frontmatter:{title:"Multi-Version Docs",description:"How to maintain multiple versions of your documentation with Tome's built-in versioning system.",icon:"layers",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/index",filePath:"v1/index.md",urlPath:"/v1",frontmatter:{title:"Introduction",description:"Tome is an open-source documentation platform for Markdown and MDX. Beautiful docs without the $250/month price tag.",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/installation",filePath:"v1/installation.mdx",urlPath:"/v1/installation",frontmatter:{title:"Installation",description:"System requirements and detailed installation instructions for Tome.",icon:"download",hidden:!1},isMdx:!0,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/pages-routing",filePath:"v1/pages-routing.md",urlPath:"/v1/pages-routing",frontmatter:{title:"Pages & Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",icon:"map",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/project-structure",filePath:"v1/project-structure.mdx",urlPath:"/v1/project-structure",frontmatter:{title:"Project Structure",description:"How a Tome documentation project is organized — pages, config, entry point, and build output.",icon:"folder",hidden:!1},isMdx:!0,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/quickstart",filePath:"v1/quickstart.md",urlPath:"/v1/quickstart",frontmatter:{title:"Quickstart",description:"Get a Tome documentation site running in under a minute.",icon:"zap",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/reference/cli",filePath:"v1/reference/cli.md",urlPath:"/v1/reference/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/reference/components",filePath:"v1/reference/components.md",urlPath:"/v1/reference/components",frontmatter:{title:"Components",description:"Reference for all built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.",icon:"puzzle",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/reference/config",filePath:"v1/reference/config.md",urlPath:"/v1/reference/config",frontmatter:{title:"Config Reference",description:"Complete reference for every field in tome.config.js — types, defaults, and descriptions.",icon:"file-text",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/reference/frontmatter",filePath:"v1/reference/frontmatter.md",urlPath:"/v1/reference/frontmatter",frontmatter:{title:"Frontmatter",description:"Reference for all YAML frontmatter fields supported in Tome documentation pages.",icon:"file-text",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/reference/theme-presets",filePath:"v1/reference/theme-presets.md",urlPath:"/v1/reference/theme-presets",frontmatter:{title:"Theme Presets",description:"Detailed reference for Tome's built-in theme presets — color tokens, CSS variables, and font stacks.",icon:"swatches",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/theming",filePath:"v1/theming.md",urlPath:"/v1/theming",frontmatter:{title:"Theming",description:"Customize the look of your Tome site — presets, colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/tutorials/deploy-to-cloud",filePath:"v1/tutorials/deploy-to-cloud.md",urlPath:"/v1/tutorials/deploy-to-cloud",frontmatter:{title:"Deploy to Tome Cloud",description:"Publish your documentation site to Tome Cloud with a single command. Includes custom domain setup.",icon:"cloud",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/tutorials/first-site",filePath:"v1/tutorials/first-site.md",urlPath:"/v1/tutorials/first-site",frontmatter:{title:"Create Your First Site",description:"A step-by-step tutorial that walks you through creating a documentation site with Tome, from installation to running the dev server.",icon:"rocket",hidden:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"}],og=[{section:"Getting Started",pages:[{title:"Introduction",id:"index",urlPath:"/"},{title:"Quickstart",id:"quickstart",urlPath:"/quickstart",icon:"zap"},{title:"Installation",id:"installation",urlPath:"/installation",icon:"download"},{title:"Project Structure",id:"project-structure",urlPath:"/project-structure",icon:"folder"}]},{section:"Core Concepts",pages:[{title:"Configuration",id:"configuration",urlPath:"/configuration",icon:"gear"},{title:"Pages & Routing",id:"pages-routing",urlPath:"/pages-routing",icon:"map"},{title:"Components",id:"components",urlPath:"/components",icon:"puzzle"},{title:"Theming",id:"theming",urlPath:"/theming",icon:"palette"}]},{section:"API Reference",pages:[{title:"Overview",id:"api-overview",urlPath:"/api-overview",icon:"code"},{title:"Endpoints",id:"api-endpoints",urlPath:"/api-endpoints",icon:"globe"},{title:"Authentication",id:"api-auth",urlPath:"/api-auth",icon:"lock"}]},{section:"Guides",pages:[{title:"Search",id:"guides/search",urlPath:"/guides/search",icon:"search"},{title:"Multi-Version Docs",id:"guides/versioning",urlPath:"/guides/versioning",icon:"layers"},{title:"Migrate from GitBook or Mintlify",id:"guides/migration",urlPath:"/guides/migration",icon:"arrow-right-arrow-left"},{title:"Redirects",id:"guides/redirects",urlPath:"/guides/redirects",icon:"arrow-turn-right"},{title:"Configuration",id:"guides/configuration",urlPath:"/guides/configuration",icon:"gear"},{title:"Custom Theme",id:"guides/custom-theme",urlPath:"/guides/custom-theme",icon:"palette"},{title:"API Reference Setup",id:"guides/api-reference",urlPath:"/guides/api-reference",icon:"code"}]},{section:"Tutorials",pages:[{title:"Create Your First Site",id:"tutorials/first-site",urlPath:"/tutorials/first-site",icon:"rocket"},{title:"Deploy to Tome Cloud",id:"tutorials/deploy-to-cloud",urlPath:"/tutorials/deploy-to-cloud",icon:"cloud"}]},{section:"Reference",pages:[{title:"CLI Reference",id:"reference/cli",urlPath:"/reference/cli",icon:"terminal"},{title:"Components",id:"reference/components",urlPath:"/reference/components",icon:"puzzle"},{title:"Config Reference",id:"reference/config",urlPath:"/reference/config",icon:"file-text"},{title:"Frontmatter",id:"reference/frontmatter",urlPath:"/reference/frontmatter",icon:"file-text"},{title:"Theme Presets",id:"reference/theme-presets",urlPath:"/reference/theme-presets",icon:"swatches"}]},{section:"Concepts",pages:[{title:"Architecture",id:"concepts/architecture",urlPath:"/concepts/architecture"},{title:"File-System Routing",id:"concepts/file-routing",urlPath:"/concepts/file-routing"}]},{section:"CLI",pages:[{title:"CLI Reference",id:"cli",urlPath:"/cli",icon:"terminal"}]}],Wf={current:"v2",versions:["v2","v1"]},ug={"api-auth":()=>Z(()=>import("./api-auth-sCeqhK3R.js"),[]),"api-endpoints":()=>Z(()=>import("./api-endpoints-ByeHyibp.js"),[]),"api-overview":()=>Z(()=>import("./api-overview-DsGiJq0x.js"),[]),cli:()=>Z(()=>import("./cli-DAHcyilF.js"),[]),components:()=>Z(()=>import("./components-1EPz7JiE.js"),[]),"concepts/architecture":()=>Z(()=>import("./architecture-DiYK7wa7.js"),[]),"concepts/file-routing":()=>Z(()=>import("./file-routing-L0FaiB3v.js"),[]),configuration:()=>Z(()=>import("./configuration-DN_U06DK.js"),[]),"guides/api-reference":()=>Z(()=>import("./api-reference-BL6ZKxZQ.js"),[]),"guides/configuration":()=>Z(()=>import("./configuration-CDxLn-wI.js"),[]),"guides/custom-theme":()=>Z(()=>import("./custom-theme-BZTvqJ1A.js"),[]),"guides/migration":()=>Z(()=>import("./migration-NtrMLKbA.js"),[]),"guides/redirects":()=>Z(()=>import("./redirects-CPdbdrn-.js"),[]),"guides/search":()=>Z(()=>import("./search-MvtzkGlX.js"),[]),"guides/versioning":()=>Z(()=>import("./versioning-BdP1w4e9.js"),[]),index:()=>Z(()=>import("./index-CyPo-ONP.js"),[]),installation:()=>Z(()=>import("./installation-DpaSDoJn.js"),[]),"pages-routing":()=>Z(()=>import("./pages-routing-2uNk0jC9.js"),[]),"project-structure":()=>Z(()=>import("./project-structure-BNiBA79Z.js"),[]),quickstart:()=>Z(()=>import("./quickstart-C03HVEh4.js"),[]),"reference/cli":()=>Z(()=>import("./cli-CZ8Q2pX-.js"),[]),"reference/components":()=>Z(()=>import("./components-BWCOftN3.js"),[]),"reference/config":()=>Z(()=>import("./config-0CDPnSm6.js"),[]),"reference/frontmatter":()=>Z(()=>import("./frontmatter-CogzEbP6.js"),[]),"reference/theme-presets":()=>Z(()=>import("./theme-presets-jwKo5EqU.js"),[]),theming:()=>Z(()=>import("./theming-dWmsD78a.js"),[]),"tutorials/deploy-to-cloud":()=>Z(()=>import("./deploy-to-cloud-edeahBFn.js"),[]),"tutorials/first-site":()=>Z(()=>import("./first-site-bBofY0Mm.js"),[]),"v1/api-auth":()=>Z(()=>import("./api-auth-t2b8T-f1.js"),[]),"v1/api-endpoints":()=>Z(()=>import("./api-endpoints-B1q9IN2-.js"),[]),"v1/api-overview":()=>Z(()=>import("./api-overview-CXxLI4dR.js"),[]),"v1/cli":()=>Z(()=>import("./cli-D6Uki160.js"),[]),"v1/components":()=>Z(()=>import("./components-Do819mF_.js"),[]),"v1/concepts/architecture":()=>Z(()=>import("./architecture-BQEG3TtN.js"),[]),"v1/concepts/file-routing":()=>Z(()=>import("./file-routing-DiPpSTPO.js"),[]),"v1/configuration":()=>Z(()=>import("./configuration-DuZ-1z1Y.js"),[]),"v1/guides/api-reference":()=>Z(()=>import("./api-reference-T2wEonqq.js"),[]),"v1/guides/configuration":()=>Z(()=>import("./configuration-D3hn9h1k.js"),[]),"v1/guides/custom-theme":()=>Z(()=>import("./custom-theme-DfF5XPao.js"),[]),"v1/guides/search":()=>Z(()=>import("./search-BuqyGEih.js"),[]),"v1/guides/versioning":()=>Z(()=>import("./versioning-9AxwlmZw.js"),[]),"v1/index":()=>Z(()=>import("./index-BKgMPWFf.js"),[]),"v1/installation":()=>Z(()=>import("./installation-CAhlHxxB.js"),[]),"v1/pages-routing":()=>Z(()=>import("./pages-routing-Dfz85xz1.js"),[]),"v1/project-structure":()=>Z(()=>import("./project-structure-BGR84wyW.js"),[]),"v1/quickstart":()=>Z(()=>import("./quickstart-kKfIhoV_.js"),[]),"v1/reference/cli":()=>Z(()=>import("./cli-DDMt0IAz.js"),[]),"v1/reference/components":()=>Z(()=>import("./components-Dq8P34C-.js"),[]),"v1/reference/config":()=>Z(()=>import("./config-3VlTY7EY.js"),[]),"v1/reference/frontmatter":()=>Z(()=>import("./frontmatter-DkeIzZjN.js"),[]),"v1/reference/theme-presets":()=>Z(()=>import("./theme-presets-D8pm5u_u.js"),[]),"v1/theming":()=>Z(()=>import("./theming-Bm6lpaoS.js"),[]),"v1/tutorials/deploy-to-cloud":()=>Z(()=>import("./deploy-to-cloud-vgr5fPc6.js"),[]),"v1/tutorials/first-site":()=>Z(()=>import("./first-site-2B2XLUaq.js"),[])};function rg(d){const z=ug[d];return z?z():Promise.resolve({default:null})}const cg=[{id:"api-auth",title:"Authentication",content:`
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

## PackageManager

Display install commands across all package managers with automatic translation:

<PackageManager command="install @tomehq/cli" />

Pass any npm command string and Tome translates it for yarn, pnpm, and bun:

\`\`\`mdx
<PackageManager command="install @tomehq/cli" />
\`\`\`

It works with dev dependencies too:

<PackageManager command="install -D vitest" />

\`\`\`mdx
<PackageManager command="install -D vitest" />
\`\`\`

## TypeTable

Document TypeScript interfaces and prop types with a structured table:

<TypeTable
  name="TomeConfig"
  fields={[
    { name: "name", type: "string", required: true, description: "Your documentation site name" },
    { name: "theme", type: "ThemeConfig", required: false, default: '{ preset: "amber" }', description: "Theme and appearance settings" },
    { name: "navigation", type: "NavGroup[]", required: true, description: "Sidebar navigation structure" },
    { name: "math", type: "boolean", required: false, default: "false", description: "Enable KaTeX math rendering" },
    { name: "banner", type: "BannerConfig", required: false, description: "Top-of-page announcement banner" },
  ]}
/>

\`\`\`mdx
<TypeTable
  name="TomeConfig"
  fields={[
    { name: "name", type: "string", required: true, description: "Site name" },
    { name: "theme", type: "ThemeConfig", default: '{ preset: "amber" }', description: "Theme settings" },
    { name: "math", type: "boolean", default: "false", description: "Enable KaTeX" },
  ]}
/>
\`\`\`

## FileTree

Visualize directory structures with collapsible folders:

<FileTree>
  <FileTree.Folder name="pages" defaultOpen>
    <FileTree.File name="index.md" />
    <FileTree.File name="quickstart.mdx" />
    <FileTree.Folder name="guides">
      <FileTree.File name="setup.md" />
      <FileTree.File name="deploy.md" />
    </FileTree.Folder>
  </FileTree.Folder>
  <FileTree.Folder name=".tome">
    <FileTree.File name="entry.tsx" />
  </FileTree.Folder>
  <FileTree.File name="tome.config.js" />
  <FileTree.File name="package.json" />
</FileTree>

\`\`\`mdx
<FileTree>
  <FileTree.Folder name="pages" defaultOpen>
    <FileTree.File name="index.md" />
    <FileTree.File name="quickstart.mdx" />
    <FileTree.Folder name="guides">
      <FileTree.File name="setup.md" />
      <FileTree.File name="deploy.md" />
    </FileTree.Folder>
  </FileTree.Folder>
  <FileTree.File name="tome.config.js" />
</FileTree>
\`\`\`

Click any folder to expand or collapse it. Use \`defaultOpen\` to start a folder in the expanded state.

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
  Make sure you have Node.js 20+ installed.
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

\`\`\`mermaid
flowchart LR
    A["tome.config.js"] --> B["Vite Plugin"]
    B --> C["Virtual Modules"]
    C --> D["Theme Shell"]
    D --> E["Static Site"]
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

\`\`\`mermaid
flowchart TD
    A["pages/*.md"] --> B["gray-matter"]
    B --> C["Frontmatter"]
    B --> D["Markdown body"]
    D --> E["remark + rehype"]
    E --> F["Shiki highlighting"]
    F --> G["DOMPurify sanitize"]
    G --> H["HTML + headings"]

    I["pages/*.mdx"] --> J["Extract frontmatter"]
    J --> K["@mdx-js/rollup"]
    K --> L["React component"]
\`\`\`

### Markdown (\`.md\`)

1. Frontmatter extracted via \`gray-matter\`
2. Markdown processed through remark (GFM, math) and rehype (slugs, autolink headings)
3. Code blocks highlighted with Shiki (mermaid blocks converted to client-side placeholders)
4. HTML sanitized with DOMPurify, headings extracted for table of contents
5. HTML + headings + frontmatter served as virtual module

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
├── llms.txt             # AI-readable page index
├── llms-full.txt        # Full page content for LLMs
└── 404.html             # Error page
\`\`\`

The output is a single-page application. Search is fully static. The \`llms.txt\` and \`llms-full.txt\` files are auto-generated at build time to make your documentation discoverable by AI tools and language models.

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

## Banner

Display an announcement banner at the top of every page:

\`\`\`javascript
banner: {
  text: "v2.0 is now available!",
  link: "/changelog",         // Optional — makes the text a link
  dismissible: true,          // Default: true — shows a close button
},
\`\`\`

When a user dismisses the banner, it stays hidden until you change the text. Updating the \`text\` value automatically shows the banner again for all users.

## Math rendering

Enable LaTeX math support with KaTeX:

\`\`\`javascript
math: true,
\`\`\`

Once enabled, you can use inline math with \`$E = mc^2$\` and display math with \`$$\` blocks in your Markdown pages. Requires \`remark-math\`, \`rehype-katex\`, and \`katex\` as peer dependencies:

\`\`\`bash
npm install remark-math rehype-katex katex
\`\`\`

## Mermaid diagrams

Mermaid diagrams work out of the box with no configuration. Use a \`mermaid\` code fence in any \`.md\` or \`.mdx\` file:

\`\`\`\`markdown
\`\`\`mermaid
flowchart LR
    A["Start"] --> B["Process"]
    B --> C["End"]
\`\`\`
\`\`\`\`

Diagrams are rendered client-side and automatically adapt to your site's light/dark theme.

## AI discoverability

Tome automatically generates two files at build time to make your docs accessible to AI tools:

- **\`llms.txt\`** — A page index with titles, descriptions, and URLs
- **\`llms-full.txt\`** — Full raw Markdown content of all non-hidden pages

These are always generated — no configuration needed. Hidden pages (with \`hidden: true\` in frontmatter) are excluded.

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
  banner: {
    text: "v2.0 is now available!",
    link: "/changelog",
    dismissible: true,
  },
  math: true,
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

## Banner

Show an announcement at the top of every page:

\`\`\`javascript
banner: {
  text: "We just launched v2.0!",
  link: "/changelog",       // Optional — wraps text in a link
  dismissible: true,        // Default true — shows close button
},
\`\`\`

The banner uses your accent color as its background. When a user dismisses it, a hash of the text is saved to localStorage. Change the text to show the banner again for all users.

## Math / KaTeX

Enable LaTeX math rendering with:

\`\`\`javascript
math: true,
\`\`\`

Then install the peer dependencies:

\`\`\`bash
npm install remark-math rehype-katex katex
\`\`\`

Use \`$...$\` for inline math and \`$$...$$\` for display blocks in your Markdown pages.

## Mermaid diagrams

Mermaid diagrams require no configuration. Use a \`mermaid\` code fence in any page:

\`\`\`\`markdown
\`\`\`mermaid
flowchart LR
    A["Input"] --> B["Process"] --> C["Output"]
\`\`\`
\`\`\`\`

Mermaid is loaded from a CDN on demand — no install needed. Diagrams adapt to your light/dark theme automatically.

## AI discoverability (llms.txt)

At build time, Tome automatically generates:

- **\`llms.txt\`** — Page index with titles, descriptions, and URLs
- **\`llms-full.txt\`** — Complete Markdown content of every non-hidden page

No configuration needed. Hidden pages (frontmatter \`hidden: true\`) are excluded. These files help AI assistants and language models understand your documentation.

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
`},{id:"guides/migration",title:"Migrate from GitBook or Mintlify",content:'\nTome provides automated migration from GitBook and Mintlify. The CLI handles navigation restructuring, component syntax conversion, redirect mapping, and asset copying.\n\n## Migrate from GitBook\n\n```bash\nnpx tome migrate gitbook ./path-to-gitbook-project\n```\n\n### What gets converted\n\n| GitBook | Tome |\n|---------|------|\n| `SUMMARY.md` navigation | `tome.config.js` navigation array |\n| `.gitbook.yaml` config | `tome.config.js` settings |\n| `{% hint style="info" %}` | `<Callout type="info">` |\n| `{% hint style="warning" %}` | `<Callout type="warning">` |\n| `{% hint style="danger" %}` | `<Callout type="danger">` |\n| `{% hint style="success" %}` | `<Callout type="tip">` |\n| `{% tabs %}` / `{% tab %}` | `<Tabs>` / `<Tab>` |\n| `{% code title="file.js" %}` | Fenced code block with title |\n| `{% embed url="..." %}` | Plain markdown link |\n| `.gitbook.yaml` redirects | `tome.config.js` redirects |\n| Images / assets | Copied to `public/` |\n\n### Options\n\n```bash\n# Output to a specific directory\nnpx tome migrate gitbook ./gitbook-docs --out ./my-new-docs\n\n# Preview without writing files\nnpx tome migrate gitbook ./gitbook-docs --dry-run\n```\n\n### How it works\n\n1. Reads `SUMMARY.md` for navigation structure and `.gitbook.yaml` for project settings\n2. Walks all Markdown files and converts GitBook-specific syntax to Tome MDX components\n3. Files containing converted JSX components are renamed from `.md` to `.mdx`\n4. Copies static assets (images, `.gitbook/assets/`) to `public/`\n5. Generates `tome.config.js` with navigation, redirects, and project name\n6. Reports a summary of pages converted, redirects created, and any warnings\n\n---\n\n## Migrate from Mintlify\n\n```bash\nnpx tome migrate mintlify ./path-to-mintlify-project\n```\n\n### What gets converted\n\n| Mintlify | Tome |\n|----------|------|\n| `mint.json` navigation | `tome.config.js` navigation array |\n| `mint.json` colors | `tome.config.js` theme accent |\n| `mint.json` logo / favicon | `tome.config.js` logo / favicon |\n| `mint.json` topbar links | `tome.config.js` topNav |\n| `mint.json` redirects | `tome.config.js` redirects |\n| `mint.json` openapi | `tome.config.js` api.spec |\n| `<Note>` / `<Info>` | `<Callout type="info">` |\n| `<Warning>` | `<Callout type="warning">` |\n| `<Tip>` / `<Check>` | `<Callout type="tip">` |\n| `<CodeGroup>` | `<Tabs>` wrapper |\n| `<AccordionGroup>` | Removed (individual `<Accordion>` kept) |\n| `<Frame>` | Removed (content preserved) |\n| `<Snippet file="..." />` | Inlined file content |\n\nComponents that are already compatible (`<Card>`, `<CardGroup>`, `<Steps>`, `<Tabs>`, `<Accordion>`) are kept as-is.\n\n### Options\n\n```bash\n# Output to a specific directory\nnpx tome migrate mintlify ./mintlify-docs --out ./my-new-docs\n\n# Preview without writing files\nnpx tome migrate mintlify ./mintlify-docs --dry-run\n```\n\n---\n\n## After migration\n\n### Review redirects\n\nBoth migration tools automatically extract redirects from the source project and add them to `tome.config.js`. Check the generated config to verify redirect paths are correct:\n\n```js\nexport default defineConfig({\n  redirects: [\n    { from: "/old-page", to: "/new-page" },\n  ],\n});\n```\n\nSee the [Redirects guide](/docs/guides/redirects) for more on how redirects work.\n\n### Start the dev server\n\n```bash\ncd my-new-docs\nnpm install\nnpm run dev\n```\n\nOpen [localhost:3000](http://localhost:3000) and review the converted pages. Some manual adjustments may be needed for complex custom components or layouts that don\'t have a direct Tome equivalent.\n\n### Deploy\n\nOnce everything looks good, deploy to Tome Cloud:\n\n```bash\nnpx tome login\nnpx tome deploy\n```\n\nOr push to your git repository — if you scaffold with `tome init`, a GitHub Actions workflow is included that deploys automatically on push to `main`.\n'},{id:"guides/redirects",title:"Redirects",content:`
Tome supports URL redirects at two levels: global config and per-page frontmatter. Redirects return a 301 (permanent) status in development and generate static redirect files for production builds.

## Config-level redirects

Add a \`redirects\` array to \`tome.config.js\`:

\`\`\`js
import { defineConfig } from "@tomehq/core";

export default defineConfig({
  name: "My Docs",
  redirects: [
    { from: "/old-page", to: "/new-page" },
    { from: "/docs/setup", to: "/docs/getting-started" },
    { from: "/api", to: "/docs/reference/api" },
  ],
});
\`\`\`

Each entry needs a \`from\` path (the old URL) and a \`to\` path (the new URL).

## Frontmatter redirects

Add \`redirect_from\` to a page's frontmatter to redirect old URLs to that page:

\`\`\`md
---
title: Getting Started
redirect_from:
  - /docs/setup
  - /docs/installation
  - /quickstart
---

Welcome to the getting started guide.
\`\`\`

Any request to \`/docs/setup\`, \`/docs/installation\`, or \`/quickstart\` will redirect to this page.

## How redirects work

### Development

The dev server intercepts requests and returns a \`301 Moved Permanently\` response for any matched redirect path. Both config-level and frontmatter redirects are active during development.

### Production builds

During \`tome build\`, Tome emits two types of redirect outputs to ensure compatibility across hosting platforms:

1. **\`_redirects\` file** — A Netlify/Vercel-compatible redirects file in the build output root. Each line maps a source path to a destination with a 301 status code.

2. **Meta-refresh HTML files** — For each redirect source path, Tome generates a small HTML file with a \`<meta http-equiv="refresh">\` tag. This ensures redirects work on any static hosting platform, including S3 and GitHub Pages.

## Migration redirects

When migrating from GitBook or Mintlify, the migration tools automatically extract redirects from the source project configuration and add them to your \`tome.config.js\`. See the [Migration guide](/docs/guides/migration) for details.
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
Tome requires Node.js and works with npm, pnpm, yarn, or bun.

## Prerequisites

| Requirement | Minimum |
|-------------|---------|
| Node.js | 20.0 or higher |
| Package manager | npm, pnpm, yarn, or bun |

## Create a new project

The fastest way to start is with the CLI:

\`\`\`bash
npx @tomehq/cli init my-docs
\`\`\`

This creates a new directory with everything you need:

<FileTree>
  <FileTree.Folder name="my-docs" defaultOpen>
    <FileTree.Folder name="pages" defaultOpen>
      <FileTree.File name="index.md" />
      <FileTree.File name="quickstart.md" />
      <FileTree.File name="components.mdx" />
    </FileTree.Folder>
    <FileTree.Folder name=".tome">
      <FileTree.File name="entry.tsx" />
    </FileTree.Folder>
    <FileTree.File name="tome.config.js" />
    <FileTree.File name="index.html" />
    <FileTree.File name="package.json" />
    <FileTree.File name=".gitignore" />
  </FileTree.Folder>
</FileTree>

## Install dependencies

<PackageManager command="install" />

## Start the dev server

\`\`\`bash
npm run dev
\`\`\`

The dev server starts at \`http://localhost:3000\` with hot reload enabled. Changes to any \`.md\` or \`.mdx\` file in \`pages/\` trigger an instant refresh. Config changes in \`tome.config.js\` trigger a full reload.

## Add to an existing project

If you already have a project and want to add Tome documentation:

<PackageManager command="install @tomehq/cli @tomehq/theme react react-dom" />

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
`},{id:"pages-routing",title:"Pages & Routing",content:"\nEvery `.md` or `.mdx` file in the `pages/` directory becomes a page. The file path determines the URL.\n\n## Basic routing\n\n| File path | URL |\n|-----------|-----|\n| `pages/index.md` | `/` |\n| `pages/quickstart.md` | `/quickstart` |\n| `pages/guides/deployment.md` | `/guides/deployment` |\n| `pages/api/endpoints.md` | `/api/endpoints` |\n| `pages/api/index.md` | `/api` |\n\n**Rules:**\n\n- `index.md` serves at the directory's root path\n- File extensions are stripped from the URL\n- Directory nesting maps directly to URL segments\n- Both `.md` and `.mdx` files are supported\n\n## Page IDs\n\nEach page has an ID derived from its path relative to `pages/`:\n\n| File | Page ID |\n|------|---------|\n| `pages/index.md` | `index` |\n| `pages/quickstart.md` | `quickstart` |\n| `pages/guides/deployment.md` | `guides/deployment` |\n\nPage IDs are used in `navigation` config to control sidebar order.\n\n## Navigation vs. routing\n\nAll pages in `pages/` are routable regardless of whether they appear in `navigation`. Navigation only controls the sidebar.\n\nPages can be hidden from the sidebar using `hidden: true` in frontmatter while remaining accessible at their URL.\n\n## Frontmatter\n\nEvery page can include YAML frontmatter at the top of the file:\n\n```markdown\n---\ntitle: My Page\ndescription: A brief description for SEO and navigation.\nicon: book\nsidebarTitle: Short Title\nhidden: false\ntags: [guide, setup]\n---\n\n# My Page\n\nContent starts here.\n```\n\n| Field | Type | Description |\n|-------|------|-------------|\n| `title` | string | Page title (falls back to first `#` heading) |\n| `description` | string | Description for metadata and navigation |\n| `icon` | string | Icon identifier shown in the sidebar |\n| `sidebarTitle` | string | Override title shown in the sidebar |\n| `hidden` | boolean | Hide page from sidebar (still accessible via URL) |\n| `tags` | string[] | Tags for categorization and search |\n\n## i18n routing\n\nWhen multiple locales are configured, organize pages by locale subdirectory:\n\n```text\npages/\n├── en/            # Default locale\n│   ├── index.md\n│   └── quickstart.md\n├── es/            # Spanish\n│   ├── index.md\n│   └── quickstart.md\n```\n\n| File | URL |\n|------|-----|\n| `pages/en/index.md` | `/` (default — no prefix) |\n| `pages/es/index.md` | `/es/` |\n| `pages/es/quickstart.md` | `/es/quickstart` |\n\nThe default locale serves at the root without a prefix. When `fallback: true` and a page doesn't exist in a non-default locale, the default version is used.\n\n## Versioned routing\n\nWhen versioning is configured:\n\n```text\npages/\n├── current/       # Latest version\n│   ├── index.md\n│   └── api.md\n├── v1.0/"}],sg={Added:"#22c55e",Changed:"#3b82f6",Deprecated:"#f59e0b",Removed:"#ef4444",Fixed:"#8b5cf6",Security:"#f97316"};function If(d){return sg[d]||"#6b7280"}function dg({entries:d,initialLimit:z}){const[y,s]=q.useState(!z),E=y?d:d.slice(0,z||d.length);return d.length===0?r.jsx("div",{"data-testid":"changelog-empty",style:{padding:"40px 0",textAlign:"center",color:"var(--txM)",fontSize:14},children:"No changelog entries found."}):r.jsxs("div",{"data-testid":"changelog-timeline",style:{position:"relative"},children:[r.jsx("div",{style:{position:"absolute",left:15,top:8,bottom:8,width:2,background:"var(--bd)"}}),E.map((O,R)=>r.jsxs("div",{"data-testid":`changelog-entry-${O.version}`,style:{position:"relative",paddingLeft:44,paddingBottom:R<E.length-1?32:0},children:[r.jsx("div",{style:{position:"absolute",left:8,top:6,width:16,height:16,borderRadius:"50%",background:O.version==="Unreleased"?"var(--txM)":"var(--ac)",border:"3px solid var(--bg, #1a1a1a)"}}),r.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:12,marginBottom:12},children:[r.jsx("span",{style:{fontSize:18,fontWeight:700,color:"var(--tx)",fontFamily:"var(--font-heading, inherit)"},children:O.url?r.jsx("a",{href:O.url,target:"_blank",rel:"noopener noreferrer",style:{color:"inherit",textDecoration:"none"},children:O.version}):O.version}),O.date&&r.jsx("span",{style:{fontSize:13,color:"var(--txM)",fontFamily:"var(--font-code, monospace)"},children:O.date})]}),O.sections.map(U=>r.jsxs("div",{style:{marginBottom:16},children:[r.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,marginBottom:8},children:[r.jsx("span",{style:{display:"inline-block",width:8,height:8,borderRadius:"50%",background:If(U.type)}}),r.jsx("span",{style:{fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em",color:If(U.type),fontFamily:"var(--font-code, monospace)"},children:U.type})]}),r.jsx("ul",{style:{margin:0,paddingLeft:18,listStyleType:"disc",color:"var(--tx2)"},children:U.items.map((D,x)=>r.jsx("li",{style:{fontSize:14,lineHeight:1.7,color:"var(--tx2)",marginBottom:2},children:D},x))})]},U.type))]},O.version)),!y&&d.length>(z||0)&&r.jsx("div",{style:{textAlign:"center",marginTop:24},children:r.jsxs("button",{"data-testid":"changelog-show-more",onClick:()=>s(!0),style:{background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"8px 20px",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body, inherit)",cursor:"pointer",transition:"border-color .15s, color .15s"},children:["Show all ",d.length," releases"]})})]})}const $f={info:{color:"#3b82f6",label:"INFO"},warning:{color:"#f59e0b",label:"WARNING"},tip:{color:"var(--ac, #a78bfa)",label:"TIP"},danger:{color:"#ef4444",label:"DANGER"}};function fg({type:d="info",title:z,children:y}){const s=$f[d]||$f.info;return r.jsxs("div",{style:{borderLeft:`3px solid ${s.color}`,background:`${s.color}11`,borderRadius:"0 2px 2px 0",padding:"14px 18px",marginBottom:20},children:[z?r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4},children:[r.jsx("span",{style:{fontWeight:700,fontSize:10,letterSpacing:".08em",color:s.color,fontFamily:"var(--font-code, monospace)"},children:s.label}),r.jsx("span",{style:{fontWeight:600,fontSize:13,color:s.color},children:z})]}):r.jsx("div",{style:{marginBottom:4},children:r.jsx("span",{style:{fontWeight:700,fontSize:10,letterSpacing:".08em",color:s.color,fontFamily:"var(--font-code, monospace)"},children:s.label})}),r.jsx("div",{style:{fontSize:14,lineHeight:1.65,color:"var(--tx2)"},children:y})]})}function mg({items:d,children:z}){const[y,s]=q.useState(0);return r.jsxs("div",{style:{marginBottom:20},children:[r.jsx("div",{style:{display:"flex",gap:0,borderBottom:"1px solid var(--bd)"},children:d.map((E,O)=>r.jsx("button",{onClick:()=>s(O),style:{padding:"8px 16px",background:"none",border:"none",borderBottom:y===O?"2px solid var(--ac)":"2px solid transparent",color:y===O?"var(--ac)":"var(--txM)",fontWeight:y===O?600:400,fontSize:13,cursor:"pointer",fontFamily:"inherit"},children:E},O))}),r.jsx("div",{style:{padding:"16px 0"},children:z[y]})]})}function hg({title:d,icon:z,href:y,children:s}){const E=r.jsxs("div",{style:{border:"1px solid var(--bd)",borderRadius:2,padding:"20px",transition:"border-color 0.15s",cursor:y?"pointer":"default"},children:[z&&r.jsx("span",{style:{fontSize:24,marginBottom:8,display:"block"},children:z}),r.jsx("div",{style:{fontWeight:600,fontSize:14,marginBottom:4},children:d}),s&&r.jsx("div",{style:{fontSize:13,color:"var(--txM)",lineHeight:1.5},children:s})]});return y?r.jsx("a",{href:y,style:{textDecoration:"none",color:"inherit"},children:E}):E}function pg({cols:d=2,children:z}){return r.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${d}, 1fr)`,gap:12,marginBottom:20},children:z})}function gg({children:d}){return r.jsx("div",{style:{paddingLeft:24,borderLeft:"2px solid var(--bd)",marginBottom:20},children:bp.Children.map(d,(z,y)=>r.jsxs("div",{style:{position:"relative",paddingBottom:20},children:[r.jsx("div",{style:{position:"absolute",left:-33,top:0,width:20,height:20,borderRadius:"50%",background:"var(--ac)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700},children:y+1}),r.jsx("div",{style:{paddingLeft:8},children:z})]}))})}function vg({title:d,children:z}){const[y,s]=q.useState(!1);return r.jsxs("div",{style:{border:"1px solid var(--bd)",borderRadius:2,marginBottom:8,overflow:"hidden"},children:[r.jsxs("button",{onClick:()=>s(!y),style:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"12px 16px",background:"var(--sf)",border:"none",cursor:"pointer",fontWeight:500,fontSize:14,color:"var(--tx)",fontFamily:"inherit"},children:[d,r.jsx("span",{style:{transform:y?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"},children:"▾"})]}),y&&r.jsx("div",{style:{padding:"12px 16px",borderTop:"1px solid var(--bd)",fontSize:14,color:"var(--tx2)",lineHeight:1.65},children:z})]})}const yg={install:{npm:"npm install",yarn:"yarn add",pnpm:"pnpm add",bun:"bun add"},"install -D":{npm:"npm install -D",yarn:"yarn add -D",pnpm:"pnpm add -D",bun:"bun add -d"},uninstall:{npm:"npm uninstall",yarn:"yarn remove",pnpm:"pnpm remove",bun:"bun remove"},run:{npm:"npm run",yarn:"yarn",pnpm:"pnpm",bun:"bun run"},exec:{npm:"npx",yarn:"yarn dlx",pnpm:"pnpm dlx",bun:"bunx"},init:{npm:"npm init",yarn:"yarn init",pnpm:"pnpm init",bun:"bun init"},create:{npm:"npm create",yarn:"yarn create",pnpm:"pnpm create",bun:"bun create"}};function bg(d,z){for(const[y,s]of Object.entries(yg))if(d.startsWith(y+" ")||d===y){const E=d.slice(y.length);return(s[z]||y)+E}return`${z} ${d}`}function xg({command:d}){const[z,y]=q.useState(0),[s,E]=q.useState(!1),O=["npm","yarn","pnpm","bun"],R=bg(d,O[z]);return r.jsxs("div",{style:{border:"1px solid var(--bd)",borderRadius:2,marginBottom:16,overflow:"hidden"},children:[r.jsx("div",{style:{display:"flex",borderBottom:"1px solid var(--bd)",background:"var(--sf)",overflowX:"auto"},children:O.map((U,D)=>r.jsx("button",{onClick:()=>{y(D),E(!1)},style:{padding:"8px 14px",background:"none",border:"none",cursor:"pointer",fontSize:12,fontFamily:"var(--font-code)",fontWeight:D===z?600:400,color:D===z?"var(--ac)":"var(--txM)",borderBottom:D===z?"2px solid var(--ac)":"2px solid transparent",whiteSpace:"nowrap"},children:U},U))}),r.jsxs("div",{style:{display:"flex",alignItems:"center",padding:"10px 14px",background:"var(--cdBg)",gap:8},children:[r.jsx("code",{style:{flex:1,fontFamily:"var(--font-code)",fontSize:13,color:"var(--cdTx)",whiteSpace:"pre",overflowX:"auto"},children:R}),r.jsx("button",{onClick:()=>{var U;(U=navigator.clipboard)==null||U.writeText(R),E(!0),setTimeout(()=>E(!1),2e3)},style:{background:"none",border:"none",cursor:"pointer",color:"var(--txM)",fontSize:12,fontFamily:"var(--font-code)",flexShrink:0},children:s?"✓":"Copy"})]})]})}function Sg({name:d,fields:z}){return r.jsxs("div",{style:{marginBottom:16},children:[d&&r.jsx("h4",{style:{fontFamily:"var(--font-code)",fontSize:15,marginBottom:8,color:"var(--tx)"},children:d}),r.jsx("div",{style:{overflowX:"auto",WebkitOverflowScrolling:"touch"},children:r.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13,fontFamily:"var(--font-body)"},children:[r.jsx("thead",{children:r.jsx("tr",{style:{borderBottom:"2px solid var(--bd)"},children:["Property","Type","Required","Default","Description"].map(y=>r.jsx("th",{style:{textAlign:"left",padding:"8px 10px",color:"var(--txM)",fontWeight:600,fontSize:11,textTransform:"uppercase",letterSpacing:".05em",whiteSpace:"nowrap"},children:y},y))})}),r.jsx("tbody",{children:z.map(y=>r.jsxs("tr",{style:{borderBottom:"1px solid var(--bd)"},children:[r.jsx("td",{style:{padding:"8px 10px",fontFamily:"var(--font-code)",fontWeight:500,color:"var(--tx)"},children:y.name}),r.jsx("td",{style:{padding:"8px 10px",fontFamily:"var(--font-code)",fontSize:12,color:"var(--ac)"},children:y.type}),r.jsx("td",{style:{padding:"8px 10px"},children:y.required&&r.jsx("span",{style:{fontSize:10,fontWeight:600,color:"#e04040",background:"rgba(224,64,64,0.1)",padding:"2px 6px",borderRadius:2},children:"required"})}),r.jsx("td",{style:{padding:"8px 10px",fontFamily:"var(--font-code)",fontSize:12,color:"var(--txM)"},children:y.default||"—"}),r.jsx("td",{style:{padding:"8px 10px",color:"var(--tx2)"},children:y.description||""})]},y.name))})]})})]})}function Tg({name:d}){return r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,padding:"3px 0",fontFamily:"var(--font-code)",fontSize:13,color:"var(--tx2)"},children:[r.jsx("span",{style:{opacity:.6},children:"📄"})," ",d]})}function Ag({name:d,defaultOpen:z,children:y}){const[s,E]=q.useState(z??!1);return r.jsxs("div",{children:[r.jsxs("button",{onClick:()=>E(!s),style:{display:"flex",alignItems:"center",gap:6,padding:"3px 0",background:"none",border:"none",cursor:"pointer",fontFamily:"var(--font-code)",fontSize:13,color:"var(--tx)",fontWeight:500},children:[r.jsx("span",{children:s?"📂":"📁"})," ",d]}),s&&r.jsx("div",{style:{paddingLeft:18,borderLeft:"1px solid var(--bd)",marginLeft:8},children:y})]})}function Xr({children:d}){return r.jsx("div",{style:{border:"1px solid var(--bd)",borderRadius:2,padding:"12px 16px",background:"var(--cdBg)",marginBottom:16},children:d})}Xr.File=Tg;Xr.Folder=Ag;const Eg={Callout:fg,Tabs:mg,Card:hg,CardGroup:pg,Steps:gg,Accordion:vg,ChangelogTimeline:dg,PackageManager:xg,TypeTable:Sg,FileTree:Xr},_g=`
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
  .tome-content img { max-width: 100%; border-radius: 2px; cursor: zoom-in; }
  .tome-content hr { border: none; border-top: 1px solid var(--bd); margin: 2em 0; }
  .tome-mermaid { margin: 1.2em 0; text-align: center; overflow-x: auto; }
  .tome-mermaid svg { max-width: 100%; height: auto; overflow: visible; }
  .tome-mermaid svg .nodeLabel { overflow: visible; white-space: nowrap; }
  /* Ensure mermaid text meets WCAG AA contrast in light mode */
  /* Mermaid v11 uses foreignObject with inline-styled spans — !important needed */
  html:not(.dark) .tome-mermaid svg .nodeLabel,
  html:not(.dark) .tome-mermaid svg .nodeLabel span,
  html:not(.dark) .tome-mermaid svg .nodeLabel div,
  html:not(.dark) .tome-mermaid svg foreignObject div,
  html:not(.dark) .tome-mermaid svg foreignObject span { color: #1a1a1a !important; }
  html:not(.dark) .tome-mermaid svg .edgeLabel,
  html:not(.dark) .tome-mermaid svg .edgeLabel span { color: #333 !important; }
  html:not(.dark) .tome-mermaid svg text { fill: #1a1a1a !important; }
  html:not(.dark) .tome-mermaid svg .node rect,
  html:not(.dark) .tome-mermaid svg .node polygon { stroke: #555 !important; }
  /* Dark mode: force bright text in mermaid nodes for readability */
  html.dark .tome-mermaid svg .nodeLabel,
  html.dark .tome-mermaid svg .nodeLabel span,
  html.dark .tome-mermaid svg .nodeLabel div,
  html.dark .tome-mermaid svg foreignObject div,
  html.dark .tome-mermaid svg foreignObject span { color: #f0f0f0 !important; }
  html.dark .tome-mermaid svg .edgeLabel,
  html.dark .tome-mermaid svg .edgeLabel span { color: #ddd !important; }
  html.dark .tome-mermaid svg text { fill: #f0f0f0 !important; }

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
`,Ao=(To.basePath||"/").replace(/\/$/,"");function Mg(d){return am(d,Ao,da)}function Pf(d){return tg(d,Ao,da)}function zg(){const[d,z]=q.useState(()=>ag(window.location.pathname,window.location.hash,da,Ao,am)),[y,s]=q.useState(null),[E,O]=q.useState(!0),R=q.useCallback(async(V,H)=>{O(!0),z(V);const ue=Pf(V);H!=null&&H.replace?window.history.replaceState(null,"",ue):window.history.pushState(null,"",ue);const L=await lg(V,da,rg);if(s(L),O(!1),!(H!=null&&H.skipScroll)){const ie=window.location.hash.slice(1);ie?requestAnimationFrame(()=>{const re=document.getElementById(ie);re&&re.scrollIntoView({behavior:"smooth",block:"start"})}):window.scrollTo(0,0)}},[]);q.useEffect(()=>{const V=window.location.hash.slice(1);if(V&&da.some(H=>H.id===V)){const H=Pf(V);window.history.replaceState(null,"",H),R(V,{replace:!0})}else R(d,{replace:!0,skipScroll:!0})},[]),q.useEffect(()=>{const V=()=>{const H=Mg(window.location.pathname);H&&H!==d&&R(H,{replace:!0,skipScroll:!0})};return window.addEventListener("popstate",V),()=>window.removeEventListener("popstate",V)},[d,R]);const U=q.useRef(null),[D,x]=q.useState(()=>typeof document<"u"&&document.documentElement.classList.contains("dark")?"dark":"light");q.useEffect(()=>{const V=new MutationObserver(()=>{const H=document.documentElement.classList.contains("dark");x(H?"dark":"light")});return V.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),()=>V.disconnect()},[]),q.useEffect(()=>{const V=document.querySelectorAll(".tome-mermaid[data-mermaid]");if(V.length===0)return;let H=!1;const ue="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";return(async()=>{try{U.current||(U.current=(await import(ue)).default);const L=U.current;if(H)return;const ie=D==="dark",re=getComputedStyle(document.documentElement).getPropertyValue("--font-body").trim()||"sans-serif";L.initialize({startOnLoad:!1,theme:ie?"dark":"default",fontFamily:re,flowchart:{padding:15,nodeSpacing:30,rankSpacing:40}});for(let J=0;J<V.length;J++){const Se=V[J],ge=Se.getAttribute("data-mermaid");if(ge)try{const K=atob(ge),{svg:te}=await L.render(`tome-mermaid-${J}-${Date.now()}`,K);H||(Se.innerHTML=te)}catch(K){console.warn("[tome] Mermaid render failed:",K),Se.textContent="Diagram rendering failed",Se.style.cssText="padding:16px;color:var(--txM);font-size:13px;border:1px dashed var(--bd);border-radius:2px;text-align:center;"}}}catch(L){console.warn("[tome] Failed to load mermaid from CDN:",L),V.forEach(ie=>{ie.textContent="Failed to load diagram renderer",ie.style.cssText="padding:16px;color:var(--txM);font-size:13px;border:1px dashed var(--bd);border-radius:2px;text-align:center;"})}})(),()=>{H=!0}},[y,E,D]);const X=da.map(V=>({id:V.id,title:V.frontmatter.title,description:V.frontmatter.description})),C=da.find(V=>V.id===d),I=ig(C,Wf),$=ng(To.editLink,C==null?void 0:C.filePath);return q.useEffect(()=>{if(!To.math)return;const V="tome-katex-css";if(document.getElementById(V))return;const H=document.createElement("link");H.id=V,H.rel="stylesheet",H.href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css",H.crossOrigin="anonymous",document.head.appendChild(H)},[]),r.jsxs(r.Fragment,{children:[r.jsx("style",{children:_g}),r.jsx(Pp,{config:To,navigation:og,currentPageId:d,pageHtml:y!=null&&y.isMdx?void 0:E?"<p>Loading...</p>":(y==null?void 0:y.html)||"<p>Page not found</p>",pageComponent:y!=null&&y.isMdx?y.component:void 0,mdxComponents:Eg,pageTitle:(y==null?void 0:y.frontmatter.title)||(E?"Loading...":"Not Found"),pageDescription:y==null?void 0:y.frontmatter.description,headings:(y==null?void 0:y.headings)||[],tocEnabled:(y==null?void 0:y.frontmatter.toc)!==!1,editUrl:$,lastUpdated:C==null?void 0:C.lastUpdated,changelogEntries:y!=null&&y.isMdx||y==null?void 0:y.changelogEntries,onNavigate:R,allPages:X,docContext:cg,versioning:Wf||void 0,currentVersion:I,basePath:Ao})]})}const em=document.getElementById("tome-root");em&&Mp.createRoot(em).render(r.jsx(zg,{}));export{q as a,bp as e,r as j,Ap as r};
