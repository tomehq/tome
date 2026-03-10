(function(){const O=document.createElement("link").relList;if(O&&O.supports&&O.supports("modulepreload"))return;for(const R of document.querySelectorAll('link[rel="modulepreload"]'))f(R);new MutationObserver(R=>{for(const H of R)if(H.type==="childList")for(const w of H.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&f(w)}).observe(document,{childList:!0,subtree:!0});function z(R){const H={};return R.integrity&&(H.integrity=R.integrity),R.referrerPolicy&&(H.referrerPolicy=R.referrerPolicy),R.crossOrigin==="use-credentials"?H.credentials="include":R.crossOrigin==="anonymous"?H.credentials="omit":H.credentials="same-origin",H}function f(R){if(R.ep)return;R.ep=!0;const H=z(R);fetch(R.href,H)}})();function up(b){return b&&b.__esModule&&Object.prototype.hasOwnProperty.call(b,"default")?b.default:b}var xc={exports:{}},Bl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _d;function op(){if(_d)return Bl;_d=1;var b=Symbol.for("react.transitional.element"),O=Symbol.for("react.fragment");function z(f,R,H){var w=null;if(H!==void 0&&(w=""+H),R.key!==void 0&&(w=""+R.key),"key"in R){H={};for(var G in R)G!=="key"&&(H[G]=R[G])}else H=R;return R=H.ref,{$$typeof:b,type:f,key:w,ref:R!==void 0?R:null,props:H}}return Bl.Fragment=O,Bl.jsx=z,Bl.jsxs=z,Bl}var Md;function cp(){return Md||(Md=1,xc.exports=op()),xc.exports}var m=cp(),Tc={exports:{}},J={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dd;function sp(){if(Dd)return J;Dd=1;var b=Symbol.for("react.transitional.element"),O=Symbol.for("react.portal"),z=Symbol.for("react.fragment"),f=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),H=Symbol.for("react.consumer"),w=Symbol.for("react.context"),G=Symbol.for("react.forward_ref"),_=Symbol.for("react.suspense"),y=Symbol.for("react.memo"),U=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),X=Symbol.iterator;function le(r){return r===null||typeof r!="object"?null:(r=X&&r[X]||r["@@iterator"],typeof r=="function"?r:null)}var be={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_e=Object.assign,L={};function ie(r,A,C){this.props=r,this.context=A,this.refs=L,this.updater=C||be}ie.prototype.isReactComponent={},ie.prototype.setState=function(r,A){if(typeof r!="object"&&typeof r!="function"&&r!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,r,A,"setState")},ie.prototype.forceUpdate=function(r){this.updater.enqueueForceUpdate(this,r,"forceUpdate")};function Te(){}Te.prototype=ie.prototype;function Ae(r,A,C){this.props=r,this.context=A,this.refs=L,this.updater=C||be}var P=Ae.prototype=new Te;P.constructor=Ae,_e(P,ie.prototype),P.isPureReactComponent=!0;var Le=Array.isArray;function de(){}var k={H:null,A:null,T:null,S:null},Ce=Object.prototype.hasOwnProperty;function pt(r,A,C){var q=C.ref;return{$$typeof:b,type:r,key:A,ref:q!==void 0?q:null,props:C}}function Bt(r,A){return pt(r.type,A,r.props)}function gt(r){return typeof r=="object"&&r!==null&&r.$$typeof===b}function Xe(r){var A={"=":"=0",":":"=2"};return"$"+r.replace(/[=:]/g,function(C){return A[C]})}var Lt=/\/+/g;function yt(r,A){return typeof r=="object"&&r!==null&&r.key!=null?Xe(""+r.key):A.toString(36)}function it(r){switch(r.status){case"fulfilled":return r.value;case"rejected":throw r.reason;default:switch(typeof r.status=="string"?r.then(de,de):(r.status="pending",r.then(function(A){r.status==="pending"&&(r.status="fulfilled",r.value=A)},function(A){r.status==="pending"&&(r.status="rejected",r.reason=A)})),r.status){case"fulfilled":return r.value;case"rejected":throw r.reason}}throw r}function x(r,A,C,q,K){var $=typeof r;($==="undefined"||$==="boolean")&&(r=null);var oe=!1;if(r===null)oe=!0;else switch($){case"bigint":case"string":case"number":oe=!0;break;case"object":switch(r.$$typeof){case b:case O:oe=!0;break;case U:return oe=r._init,x(oe(r._payload),A,C,q,K)}}if(oe)return K=K(r),oe=q===""?"."+yt(r,0):q,Le(K)?(C="",oe!=null&&(C=oe.replace(Lt,"$&/")+"/"),x(K,A,C,"",function(an){return an})):K!=null&&(gt(K)&&(K=Bt(K,C+(K.key==null||r&&r.key===K.key?"":(""+K.key).replace(Lt,"$&/")+"/")+oe)),A.push(K)),1;oe=0;var Qe=q===""?".":q+":";if(Le(r))for(var Me=0;Me<r.length;Me++)q=r[Me],$=Qe+yt(q,Me),oe+=x(q,A,C,$,K);else if(Me=le(r),typeof Me=="function")for(r=Me.call(r),Me=0;!(q=r.next()).done;)q=q.value,$=Qe+yt(q,Me++),oe+=x(q,A,C,$,K);else if($==="object"){if(typeof r.then=="function")return x(it(r),A,C,q,K);throw A=String(r),Error("Objects are not valid as a React child (found: "+(A==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":A)+"). If you meant to render a collection of children, use an array instead.")}return oe}function j(r,A,C){if(r==null)return r;var q=[],K=0;return x(r,q,"","",function($){return A.call(C,$,K++)}),q}function Q(r){if(r._status===-1){var A=r._result;A=A(),A.then(function(C){(r._status===0||r._status===-1)&&(r._status=1,r._result=C)},function(C){(r._status===0||r._status===-1)&&(r._status=2,r._result=C)}),r._status===-1&&(r._status=0,r._result=A)}if(r._status===1)return r._result.default;throw r._result}var re=typeof reportError=="function"?reportError:function(r){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var A=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof r=="object"&&r!==null&&typeof r.message=="string"?String(r.message):String(r),error:r});if(!window.dispatchEvent(A))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",r);return}console.error(r)},W={map:j,forEach:function(r,A,C){j(r,function(){A.apply(this,arguments)},C)},count:function(r){var A=0;return j(r,function(){A++}),A},toArray:function(r){return j(r,function(A){return A})||[]},only:function(r){if(!gt(r))throw Error("React.Children.only expected to receive a single React element child.");return r}};return J.Activity=D,J.Children=W,J.Component=ie,J.Fragment=z,J.Profiler=R,J.PureComponent=Ae,J.StrictMode=f,J.Suspense=_,J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=k,J.__COMPILER_RUNTIME={__proto__:null,c:function(r){return k.H.useMemoCache(r)}},J.cache=function(r){return function(){return r.apply(null,arguments)}},J.cacheSignal=function(){return null},J.cloneElement=function(r,A,C){if(r==null)throw Error("The argument must be a React element, but you passed "+r+".");var q=_e({},r.props),K=r.key;if(A!=null)for($ in A.key!==void 0&&(K=""+A.key),A)!Ce.call(A,$)||$==="key"||$==="__self"||$==="__source"||$==="ref"&&A.ref===void 0||(q[$]=A[$]);var $=arguments.length-2;if($===1)q.children=C;else if(1<$){for(var oe=Array($),Qe=0;Qe<$;Qe++)oe[Qe]=arguments[Qe+2];q.children=oe}return pt(r.type,K,q)},J.createContext=function(r){return r={$$typeof:w,_currentValue:r,_currentValue2:r,_threadCount:0,Provider:null,Consumer:null},r.Provider=r,r.Consumer={$$typeof:H,_context:r},r},J.createElement=function(r,A,C){var q,K={},$=null;if(A!=null)for(q in A.key!==void 0&&($=""+A.key),A)Ce.call(A,q)&&q!=="key"&&q!=="__self"&&q!=="__source"&&(K[q]=A[q]);var oe=arguments.length-2;if(oe===1)K.children=C;else if(1<oe){for(var Qe=Array(oe),Me=0;Me<oe;Me++)Qe[Me]=arguments[Me+2];K.children=Qe}if(r&&r.defaultProps)for(q in oe=r.defaultProps,oe)K[q]===void 0&&(K[q]=oe[q]);return pt(r,$,K)},J.createRef=function(){return{current:null}},J.forwardRef=function(r){return{$$typeof:G,render:r}},J.isValidElement=gt,J.lazy=function(r){return{$$typeof:U,_payload:{_status:-1,_result:r},_init:Q}},J.memo=function(r,A){return{$$typeof:y,type:r,compare:A===void 0?null:A}},J.startTransition=function(r){var A=k.T,C={};k.T=C;try{var q=r(),K=k.S;K!==null&&K(C,q),typeof q=="object"&&q!==null&&typeof q.then=="function"&&q.then(de,re)}catch($){re($)}finally{A!==null&&C.types!==null&&(A.types=C.types),k.T=A}},J.unstable_useCacheRefresh=function(){return k.H.useCacheRefresh()},J.use=function(r){return k.H.use(r)},J.useActionState=function(r,A,C){return k.H.useActionState(r,A,C)},J.useCallback=function(r,A){return k.H.useCallback(r,A)},J.useContext=function(r){return k.H.useContext(r)},J.useDebugValue=function(){},J.useDeferredValue=function(r,A){return k.H.useDeferredValue(r,A)},J.useEffect=function(r,A){return k.H.useEffect(r,A)},J.useEffectEvent=function(r){return k.H.useEffectEvent(r)},J.useId=function(){return k.H.useId()},J.useImperativeHandle=function(r,A,C){return k.H.useImperativeHandle(r,A,C)},J.useInsertionEffect=function(r,A){return k.H.useInsertionEffect(r,A)},J.useLayoutEffect=function(r,A){return k.H.useLayoutEffect(r,A)},J.useMemo=function(r,A){return k.H.useMemo(r,A)},J.useOptimistic=function(r,A){return k.H.useOptimistic(r,A)},J.useReducer=function(r,A,C){return k.H.useReducer(r,A,C)},J.useRef=function(r){return k.H.useRef(r)},J.useState=function(r){return k.H.useState(r)},J.useSyncExternalStore=function(r,A,C){return k.H.useSyncExternalStore(r,A,C)},J.useTransition=function(){return k.H.useTransition()},J.version="19.2.4",J}var Cd;function Dc(){return Cd||(Cd=1,Tc.exports=sp()),Tc.exports}var Z=Dc();const rp=up(Z);var Ac={exports:{}},Ll={},Ec={exports:{}},zc={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Od;function fp(){return Od||(Od=1,(function(b){function O(x,j){var Q=x.length;x.push(j);e:for(;0<Q;){var re=Q-1>>>1,W=x[re];if(0<R(W,j))x[re]=j,x[Q]=W,Q=re;else break e}}function z(x){return x.length===0?null:x[0]}function f(x){if(x.length===0)return null;var j=x[0],Q=x.pop();if(Q!==j){x[0]=Q;e:for(var re=0,W=x.length,r=W>>>1;re<r;){var A=2*(re+1)-1,C=x[A],q=A+1,K=x[q];if(0>R(C,Q))q<W&&0>R(K,C)?(x[re]=K,x[q]=Q,re=q):(x[re]=C,x[A]=Q,re=A);else if(q<W&&0>R(K,Q))x[re]=K,x[q]=Q,re=q;else break e}}return j}function R(x,j){var Q=x.sortIndex-j.sortIndex;return Q!==0?Q:x.id-j.id}if(b.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var H=performance;b.unstable_now=function(){return H.now()}}else{var w=Date,G=w.now();b.unstable_now=function(){return w.now()-G}}var _=[],y=[],U=1,D=null,X=3,le=!1,be=!1,_e=!1,L=!1,ie=typeof setTimeout=="function"?setTimeout:null,Te=typeof clearTimeout=="function"?clearTimeout:null,Ae=typeof setImmediate<"u"?setImmediate:null;function P(x){for(var j=z(y);j!==null;){if(j.callback===null)f(y);else if(j.startTime<=x)f(y),j.sortIndex=j.expirationTime,O(_,j);else break;j=z(y)}}function Le(x){if(_e=!1,P(x),!be)if(z(_)!==null)be=!0,de||(de=!0,Xe());else{var j=z(y);j!==null&&it(Le,j.startTime-x)}}var de=!1,k=-1,Ce=5,pt=-1;function Bt(){return L?!0:!(b.unstable_now()-pt<Ce)}function gt(){if(L=!1,de){var x=b.unstable_now();pt=x;var j=!0;try{e:{be=!1,_e&&(_e=!1,Te(k),k=-1),le=!0;var Q=X;try{t:{for(P(x),D=z(_);D!==null&&!(D.expirationTime>x&&Bt());){var re=D.callback;if(typeof re=="function"){D.callback=null,X=D.priorityLevel;var W=re(D.expirationTime<=x);if(x=b.unstable_now(),typeof W=="function"){D.callback=W,P(x),j=!0;break t}D===z(_)&&f(_),P(x)}else f(_);D=z(_)}if(D!==null)j=!0;else{var r=z(y);r!==null&&it(Le,r.startTime-x),j=!1}}break e}finally{D=null,X=Q,le=!1}j=void 0}}finally{j?Xe():de=!1}}}var Xe;if(typeof Ae=="function")Xe=function(){Ae(gt)};else if(typeof MessageChannel<"u"){var Lt=new MessageChannel,yt=Lt.port2;Lt.port1.onmessage=gt,Xe=function(){yt.postMessage(null)}}else Xe=function(){ie(gt,0)};function it(x,j){k=ie(function(){x(b.unstable_now())},j)}b.unstable_IdlePriority=5,b.unstable_ImmediatePriority=1,b.unstable_LowPriority=4,b.unstable_NormalPriority=3,b.unstable_Profiling=null,b.unstable_UserBlockingPriority=2,b.unstable_cancelCallback=function(x){x.callback=null},b.unstable_forceFrameRate=function(x){0>x||125<x?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ce=0<x?Math.floor(1e3/x):5},b.unstable_getCurrentPriorityLevel=function(){return X},b.unstable_next=function(x){switch(X){case 1:case 2:case 3:var j=3;break;default:j=X}var Q=X;X=j;try{return x()}finally{X=Q}},b.unstable_requestPaint=function(){L=!0},b.unstable_runWithPriority=function(x,j){switch(x){case 1:case 2:case 3:case 4:case 5:break;default:x=3}var Q=X;X=x;try{return j()}finally{X=Q}},b.unstable_scheduleCallback=function(x,j,Q){var re=b.unstable_now();switch(typeof Q=="object"&&Q!==null?(Q=Q.delay,Q=typeof Q=="number"&&0<Q?re+Q:re):Q=re,x){case 1:var W=-1;break;case 2:W=250;break;case 5:W=1073741823;break;case 4:W=1e4;break;default:W=5e3}return W=Q+W,x={id:U++,callback:j,priorityLevel:x,startTime:Q,expirationTime:W,sortIndex:-1},Q>re?(x.sortIndex=Q,O(y,x),z(_)===null&&x===z(y)&&(_e?(Te(k),k=-1):_e=!0,it(Le,Q-re))):(x.sortIndex=W,O(_,x),be||le||(be=!0,de||(de=!0,Xe()))),x},b.unstable_shouldYield=Bt,b.unstable_wrapCallback=function(x){var j=X;return function(){var Q=X;X=j;try{return x.apply(this,arguments)}finally{X=Q}}}})(zc)),zc}var jd;function dp(){return jd||(jd=1,Ec.exports=fp()),Ec.exports}var _c={exports:{}},We={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rd;function mp(){if(Rd)return We;Rd=1;var b=Dc();function O(_){var y="https://react.dev/errors/"+_;if(1<arguments.length){y+="?args[]="+encodeURIComponent(arguments[1]);for(var U=2;U<arguments.length;U++)y+="&args[]="+encodeURIComponent(arguments[U])}return"Minified React error #"+_+"; visit "+y+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function z(){}var f={d:{f:z,r:function(){throw Error(O(522))},D:z,C:z,L:z,m:z,X:z,S:z,M:z},p:0,findDOMNode:null},R=Symbol.for("react.portal");function H(_,y,U){var D=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:R,key:D==null?null:""+D,children:_,containerInfo:y,implementation:U}}var w=b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function G(_,y){if(_==="font")return"";if(typeof y=="string")return y==="use-credentials"?y:""}return We.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=f,We.createPortal=function(_,y){var U=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!y||y.nodeType!==1&&y.nodeType!==9&&y.nodeType!==11)throw Error(O(299));return H(_,y,null,U)},We.flushSync=function(_){var y=w.T,U=f.p;try{if(w.T=null,f.p=2,_)return _()}finally{w.T=y,f.p=U,f.d.f()}},We.preconnect=function(_,y){typeof _=="string"&&(y?(y=y.crossOrigin,y=typeof y=="string"?y==="use-credentials"?y:"":void 0):y=null,f.d.C(_,y))},We.prefetchDNS=function(_){typeof _=="string"&&f.d.D(_)},We.preinit=function(_,y){if(typeof _=="string"&&y&&typeof y.as=="string"){var U=y.as,D=G(U,y.crossOrigin),X=typeof y.integrity=="string"?y.integrity:void 0,le=typeof y.fetchPriority=="string"?y.fetchPriority:void 0;U==="style"?f.d.S(_,typeof y.precedence=="string"?y.precedence:void 0,{crossOrigin:D,integrity:X,fetchPriority:le}):U==="script"&&f.d.X(_,{crossOrigin:D,integrity:X,fetchPriority:le,nonce:typeof y.nonce=="string"?y.nonce:void 0})}},We.preinitModule=function(_,y){if(typeof _=="string")if(typeof y=="object"&&y!==null){if(y.as==null||y.as==="script"){var U=G(y.as,y.crossOrigin);f.d.M(_,{crossOrigin:U,integrity:typeof y.integrity=="string"?y.integrity:void 0,nonce:typeof y.nonce=="string"?y.nonce:void 0})}}else y==null&&f.d.M(_)},We.preload=function(_,y){if(typeof _=="string"&&typeof y=="object"&&y!==null&&typeof y.as=="string"){var U=y.as,D=G(U,y.crossOrigin);f.d.L(_,U,{crossOrigin:D,integrity:typeof y.integrity=="string"?y.integrity:void 0,nonce:typeof y.nonce=="string"?y.nonce:void 0,type:typeof y.type=="string"?y.type:void 0,fetchPriority:typeof y.fetchPriority=="string"?y.fetchPriority:void 0,referrerPolicy:typeof y.referrerPolicy=="string"?y.referrerPolicy:void 0,imageSrcSet:typeof y.imageSrcSet=="string"?y.imageSrcSet:void 0,imageSizes:typeof y.imageSizes=="string"?y.imageSizes:void 0,media:typeof y.media=="string"?y.media:void 0})}},We.preloadModule=function(_,y){if(typeof _=="string")if(y){var U=G(y.as,y.crossOrigin);f.d.m(_,{as:typeof y.as=="string"&&y.as!=="script"?y.as:void 0,crossOrigin:U,integrity:typeof y.integrity=="string"?y.integrity:void 0})}else f.d.m(_)},We.requestFormReset=function(_){f.d.r(_)},We.unstable_batchedUpdates=function(_,y){return _(y)},We.useFormState=function(_,y,U){return w.H.useFormState(_,y,U)},We.useFormStatus=function(){return w.H.useHostTransitionStatus()},We.version="19.2.4",We}var Ud;function hp(){if(Ud)return _c.exports;Ud=1;function b(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(b)}catch(O){console.error(O)}}return b(),_c.exports=mp(),_c.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qd;function pp(){if(qd)return Ll;qd=1;var b=dp(),O=Dc(),z=hp();function f(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function R(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function H(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function w(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function G(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function _(e){if(H(e)!==e)throw Error(f(188))}function y(e){var t=e.alternate;if(!t){if(t=H(e),t===null)throw Error(f(188));return t!==e?null:e}for(var n=e,a=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return _(l),e;if(i===a)return _(l),t;i=i.sibling}throw Error(f(188))}if(n.return!==a.return)n=l,a=i;else{for(var u=!1,o=l.child;o;){if(o===n){u=!0,n=l,a=i;break}if(o===a){u=!0,a=l,n=i;break}o=o.sibling}if(!u){for(o=i.child;o;){if(o===n){u=!0,n=i,a=l;break}if(o===a){u=!0,a=i,n=l;break}o=o.sibling}if(!u)throw Error(f(189))}}if(n.alternate!==a)throw Error(f(190))}if(n.tag!==3)throw Error(f(188));return n.stateNode.current===n?e:t}function U(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=U(e),t!==null)return t;e=e.sibling}return null}var D=Object.assign,X=Symbol.for("react.element"),le=Symbol.for("react.transitional.element"),be=Symbol.for("react.portal"),_e=Symbol.for("react.fragment"),L=Symbol.for("react.strict_mode"),ie=Symbol.for("react.profiler"),Te=Symbol.for("react.consumer"),Ae=Symbol.for("react.context"),P=Symbol.for("react.forward_ref"),Le=Symbol.for("react.suspense"),de=Symbol.for("react.suspense_list"),k=Symbol.for("react.memo"),Ce=Symbol.for("react.lazy"),pt=Symbol.for("react.activity"),Bt=Symbol.for("react.memo_cache_sentinel"),gt=Symbol.iterator;function Xe(e){return e===null||typeof e!="object"?null:(e=gt&&e[gt]||e["@@iterator"],typeof e=="function"?e:null)}var Lt=Symbol.for("react.client.reference");function yt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Lt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case _e:return"Fragment";case ie:return"Profiler";case L:return"StrictMode";case Le:return"Suspense";case de:return"SuspenseList";case pt:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case be:return"Portal";case Ae:return e.displayName||"Context";case Te:return(e._context.displayName||"Context")+".Consumer";case P:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case k:return t=e.displayName||null,t!==null?t:yt(e.type)||"Memo";case Ce:t=e._payload,e=e._init;try{return yt(e(t))}catch{}}return null}var it=Array.isArray,x=O.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=z.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Q={pending:!1,data:null,method:null,action:null},re=[],W=-1;function r(e){return{current:e}}function A(e){0>W||(e.current=re[W],re[W]=null,W--)}function C(e,t){W++,re[W]=e.current,e.current=t}var q=r(null),K=r(null),$=r(null),oe=r(null);function Qe(e,t){switch(C($,t),C(K,e),C(q,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Wf(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Wf(t),e=Ff(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}A(q),C(q,e)}function Me(){A(q),A(K),A($)}function an(e){e.memoizedState!==null&&C(oe,e);var t=q.current,n=Ff(t,e.type);t!==n&&(C(K,e),C(q,n))}function jn(e){K.current===e&&(A(q),A(K)),oe.current===e&&(A(oe),Ul._currentValue=Q)}var Fn,Xa;function Rt(e){if(Fn===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Fn=t&&t[1]||"",Xa=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Fn+e+Xa}var $n=!1;function In(e,t){if(!e||$n)return"";$n=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var E=function(){throw Error()};if(Object.defineProperty(E.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(E,[])}catch(v){var g=v}Reflect.construct(e,[],E)}else{try{E.call()}catch(v){g=v}e.call(E.prototype)}}else{try{throw Error()}catch(v){g=v}(E=e())&&typeof E.catch=="function"&&E.catch(function(){})}}catch(v){if(v&&g&&typeof v.stack=="string")return[v.stack,g.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),u=i[0],o=i[1];if(u&&o){var c=u.split(`
`),p=o.split(`
`);for(l=a=0;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;for(;l<p.length&&!p[l].includes("DetermineComponentFrameRoot");)l++;if(a===c.length||l===p.length)for(a=c.length-1,l=p.length-1;1<=a&&0<=l&&c[a]!==p[l];)l--;for(;1<=a&&0<=l;a--,l--)if(c[a]!==p[l]){if(a!==1||l!==1)do if(a--,l--,0>l||c[a]!==p[l]){var S=`
`+c[a].replace(" at new "," at ");return e.displayName&&S.includes("<anonymous>")&&(S=S.replace("<anonymous>",e.displayName)),S}while(1<=a&&0<=l);break}}}finally{$n=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Rt(n):""}function Yl(e,t){switch(e.tag){case 26:case 27:case 5:return Rt(e.type);case 16:return Rt("Lazy");case 13:return e.child!==t&&t!==null?Rt("Suspense Fallback"):Rt("Suspense");case 19:return Rt("SuspenseList");case 0:case 15:return In(e.type,!1);case 11:return In(e.type.render,!1);case 1:return In(e.type,!0);case 31:return Rt("Activity");default:return""}}function Qa(e){try{var t="",n=null;do t+=Yl(e,n),n=e,e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var Pn=Object.prototype.hasOwnProperty,ea=b.unstable_scheduleCallback,ta=b.unstable_cancelCallback,Gl=b.unstable_shouldYield,Xl=b.unstable_requestPaint,M=b.unstable_now,me=b.unstable_getCurrentPriorityLevel,$e=b.unstable_ImmediatePriority,na=b.unstable_UserBlockingPriority,ln=b.unstable_NormalPriority,ou=b.unstable_LowPriority,Va=b.unstable_IdlePriority,Xd=b.log,Qd=b.unstable_setDisableYieldValue,Za=null,ut=null;function un(e){if(typeof Xd=="function"&&Qd(e),ut&&typeof ut.setStrictMode=="function")try{ut.setStrictMode(Za,e)}catch{}}var ot=Math.clz32?Math.clz32:Kd,Vd=Math.log,Zd=Math.LN2;function Kd(e){return e>>>=0,e===0?32:31-(Vd(e)/Zd|0)|0}var Ql=256,Vl=262144,Zl=4194304;function Rn(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Kl(e,t,n){var a=e.pendingLanes;if(a===0)return 0;var l=0,i=e.suspendedLanes,u=e.pingedLanes;e=e.warmLanes;var o=a&134217727;return o!==0?(a=o&~i,a!==0?l=Rn(a):(u&=o,u!==0?l=Rn(u):n||(n=o&~e,n!==0&&(l=Rn(n))))):(o=a&~i,o!==0?l=Rn(o):u!==0?l=Rn(u):n||(n=a&~e,n!==0&&(l=Rn(n)))),l===0?0:t!==0&&t!==l&&(t&i)===0&&(i=l&-l,n=t&-t,i>=n||i===32&&(n&4194048)!==0)?t:l}function Ka(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function kd(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Cc(){var e=Zl;return Zl<<=1,(Zl&62914560)===0&&(Zl=4194304),e}function cu(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ka(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Jd(e,t,n,a,l,i){var u=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,c=e.expirationTimes,p=e.hiddenUpdates;for(n=u&~n;0<n;){var S=31-ot(n),E=1<<S;o[S]=0,c[S]=-1;var g=p[S];if(g!==null)for(p[S]=null,S=0;S<g.length;S++){var v=g[S];v!==null&&(v.lane&=-536870913)}n&=~E}a!==0&&Oc(e,a,0),i!==0&&l===0&&e.tag!==0&&(e.suspendedLanes|=i&~(u&~t))}function Oc(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var a=31-ot(t);e.entangledLanes|=t,e.entanglements[a]=e.entanglements[a]|1073741824|n&261930}function jc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-ot(n),l=1<<a;l&t|e[a]&t&&(e[a]|=t),n&=~l}}function Rc(e,t){var n=t&-t;return n=(n&42)!==0?1:su(n),(n&(e.suspendedLanes|t))!==0?0:n}function su(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ru(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Uc(){var e=j.p;return e!==0?e:(e=window.event,e===void 0?32:bd(e.type))}function qc(e,t){var n=j.p;try{return j.p=e,t()}finally{j.p=n}}var on=Math.random().toString(36).slice(2),Ve="__reactFiber$"+on,Ie="__reactProps$"+on,aa="__reactContainer$"+on,fu="__reactEvents$"+on,Wd="__reactListeners$"+on,Fd="__reactHandles$"+on,Hc="__reactResources$"+on,Ja="__reactMarker$"+on;function du(e){delete e[Ve],delete e[Ie],delete e[fu],delete e[Wd],delete e[Fd]}function la(e){var t=e[Ve];if(t)return t;for(var n=e.parentNode;n;){if(t=n[aa]||n[Ve]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=ad(e);e!==null;){if(n=e[Ve])return n;e=ad(e)}return t}e=n,n=e.parentNode}return null}function ia(e){if(e=e[Ve]||e[aa]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Wa(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(f(33))}function ua(e){var t=e[Hc];return t||(t=e[Hc]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ye(e){e[Ja]=!0}var Nc=new Set,Bc={};function Un(e,t){oa(e,t),oa(e+"Capture",t)}function oa(e,t){for(Bc[e]=t,e=0;e<t.length;e++)Nc.add(t[e])}var $d=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Lc={},wc={};function Id(e){return Pn.call(wc,e)?!0:Pn.call(Lc,e)?!1:$d.test(e)?wc[e]=!0:(Lc[e]=!0,!1)}function kl(e,t,n){if(Id(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function Jl(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function wt(e,t,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+a)}}function vt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Yc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Pd(e,t,n){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(u){n=""+u,i.call(this,u)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(u){n=""+u},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function mu(e){if(!e._valueTracker){var t=Yc(e)?"checked":"value";e._valueTracker=Pd(e,t,""+e[t])}}function Gc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=Yc(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function Wl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var em=/[\n"\\]/g;function bt(e){return e.replace(em,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function hu(e,t,n,a,l,i,u,o){e.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?e.type=u:e.removeAttribute("type"),t!=null?u==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+vt(t)):e.value!==""+vt(t)&&(e.value=""+vt(t)):u!=="submit"&&u!=="reset"||e.removeAttribute("value"),t!=null?pu(e,u,vt(t)):n!=null?pu(e,u,vt(n)):a!=null&&e.removeAttribute("value"),l==null&&i!=null&&(e.defaultChecked=!!i),l!=null&&(e.checked=l&&typeof l!="function"&&typeof l!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+vt(o):e.removeAttribute("name")}function Xc(e,t,n,a,l,i,u,o){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),t!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||t!=null)){mu(e);return}n=n!=null?""+vt(n):"",t=t!=null?""+vt(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=o?e.checked:!!a,e.defaultChecked=!!a,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(e.name=u),mu(e)}function pu(e,t,n){t==="number"&&Wl(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function ca(e,t,n,a){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&a&&(e[n].defaultSelected=!0)}else{for(n=""+vt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,a&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Qc(e,t,n){if(t!=null&&(t=""+vt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+vt(n):""}function Vc(e,t,n,a){if(t==null){if(a!=null){if(n!=null)throw Error(f(92));if(it(a)){if(1<a.length)throw Error(f(93));a=a[0]}n=a}n==null&&(n=""),t=n}n=vt(t),e.defaultValue=n,a=e.textContent,a===n&&a!==""&&a!==null&&(e.value=a),mu(e)}function sa(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var tm=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Zc(e,t,n){var a=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":a?e.setProperty(t,n):typeof n!="number"||n===0||tm.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function Kc(e,t,n){if(t!=null&&typeof t!="object")throw Error(f(62));if(e=e.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var l in t)a=t[l],t.hasOwnProperty(l)&&n[l]!==a&&Zc(e,l,a)}else for(var i in t)t.hasOwnProperty(i)&&Zc(e,i,t[i])}function gu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var nm=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),am=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Fl(e){return am.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Yt(){}var yu=null;function vu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ra=null,fa=null;function kc(e){var t=ia(e);if(t&&(e=t.stateNode)){var n=e[Ie]||null;e:switch(e=t.stateNode,t.type){case"input":if(hu(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+bt(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var l=a[Ie]||null;if(!l)throw Error(f(90));hu(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(t=0;t<n.length;t++)a=n[t],a.form===e.form&&Gc(a)}break e;case"textarea":Qc(e,n.value,n.defaultValue);break e;case"select":t=n.value,t!=null&&ca(e,!!n.multiple,t,!1)}}}var bu=!1;function Jc(e,t,n){if(bu)return e(t,n);bu=!0;try{var a=e(t);return a}finally{if(bu=!1,(ra!==null||fa!==null)&&(Bi(),ra&&(t=ra,e=fa,fa=ra=null,kc(t),e)))for(t=0;t<e.length;t++)kc(e[t])}}function Fa(e,t){var n=e.stateNode;if(n===null)return null;var a=n[Ie]||null;if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(f(231,t,typeof n));return n}var Gt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Su=!1;if(Gt)try{var $a={};Object.defineProperty($a,"passive",{get:function(){Su=!0}}),window.addEventListener("test",$a,$a),window.removeEventListener("test",$a,$a)}catch{Su=!1}var cn=null,xu=null,$l=null;function Wc(){if($l)return $l;var e,t=xu,n=t.length,a,l="value"in cn?cn.value:cn.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var u=n-e;for(a=1;a<=u&&t[n-a]===l[i-a];a++);return $l=l.slice(e,1<a?1-a:void 0)}function Il(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Pl(){return!0}function Fc(){return!1}function Pe(e){function t(n,a,l,i,u){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Pl:Fc,this.isPropagationStopped=Fc,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Pl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Pl)},persist:function(){},isPersistent:Pl}),t}var qn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ei=Pe(qn),Ia=D({},qn,{view:0,detail:0}),lm=Pe(Ia),Tu,Au,Pa,ti=D({},Ia,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Pa&&(Pa&&e.type==="mousemove"?(Tu=e.screenX-Pa.screenX,Au=e.screenY-Pa.screenY):Au=Tu=0,Pa=e),Tu)},movementY:function(e){return"movementY"in e?e.movementY:Au}}),$c=Pe(ti),im=D({},ti,{dataTransfer:0}),um=Pe(im),om=D({},Ia,{relatedTarget:0}),Eu=Pe(om),cm=D({},qn,{animationName:0,elapsedTime:0,pseudoElement:0}),sm=Pe(cm),rm=D({},qn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),fm=Pe(rm),dm=D({},qn,{data:0}),Ic=Pe(dm),mm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},hm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},pm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=pm[e])?!!t[e]:!1}function zu(){return gm}var ym=D({},Ia,{key:function(e){if(e.key){var t=mm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Il(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?hm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zu,charCode:function(e){return e.type==="keypress"?Il(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Il(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),vm=Pe(ym),bm=D({},ti,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Pc=Pe(bm),Sm=D({},Ia,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zu}),xm=Pe(Sm),Tm=D({},qn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Am=Pe(Tm),Em=D({},ti,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),zm=Pe(Em),_m=D({},qn,{newState:0,oldState:0}),Mm=Pe(_m),Dm=[9,13,27,32],_u=Gt&&"CompositionEvent"in window,el=null;Gt&&"documentMode"in document&&(el=document.documentMode);var Cm=Gt&&"TextEvent"in window&&!el,es=Gt&&(!_u||el&&8<el&&11>=el),ts=" ",ns=!1;function as(e,t){switch(e){case"keyup":return Dm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ls(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var da=!1;function Om(e,t){switch(e){case"compositionend":return ls(t);case"keypress":return t.which!==32?null:(ns=!0,ts);case"textInput":return e=t.data,e===ts&&ns?null:e;default:return null}}function jm(e,t){if(da)return e==="compositionend"||!_u&&as(e,t)?(e=Wc(),$l=xu=cn=null,da=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return es&&t.locale!=="ko"?null:t.data;default:return null}}var Rm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function is(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Rm[e.type]:t==="textarea"}function us(e,t,n,a){ra?fa?fa.push(a):fa=[a]:ra=a,t=Vi(t,"onChange"),0<t.length&&(n=new ei("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var tl=null,nl=null;function Um(e){Qf(e,0)}function ni(e){var t=Wa(e);if(Gc(t))return e}function os(e,t){if(e==="change")return t}var cs=!1;if(Gt){var Mu;if(Gt){var Du="oninput"in document;if(!Du){var ss=document.createElement("div");ss.setAttribute("oninput","return;"),Du=typeof ss.oninput=="function"}Mu=Du}else Mu=!1;cs=Mu&&(!document.documentMode||9<document.documentMode)}function rs(){tl&&(tl.detachEvent("onpropertychange",fs),nl=tl=null)}function fs(e){if(e.propertyName==="value"&&ni(nl)){var t=[];us(t,nl,e,vu(e)),Jc(Um,t)}}function qm(e,t,n){e==="focusin"?(rs(),tl=t,nl=n,tl.attachEvent("onpropertychange",fs)):e==="focusout"&&rs()}function Hm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ni(nl)}function Nm(e,t){if(e==="click")return ni(t)}function Bm(e,t){if(e==="input"||e==="change")return ni(t)}function Lm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ct=typeof Object.is=="function"?Object.is:Lm;function al(e,t){if(ct(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!Pn.call(t,l)||!ct(e[l],t[l]))return!1}return!0}function ds(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ms(e,t){var n=ds(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ds(n)}}function hs(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?hs(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ps(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Wl(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Wl(e.document)}return t}function Cu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var wm=Gt&&"documentMode"in document&&11>=document.documentMode,ma=null,Ou=null,ll=null,ju=!1;function gs(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ju||ma==null||ma!==Wl(a)||(a=ma,"selectionStart"in a&&Cu(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),ll&&al(ll,a)||(ll=a,a=Vi(Ou,"onSelect"),0<a.length&&(t=new ei("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=ma)))}function Hn(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ha={animationend:Hn("Animation","AnimationEnd"),animationiteration:Hn("Animation","AnimationIteration"),animationstart:Hn("Animation","AnimationStart"),transitionrun:Hn("Transition","TransitionRun"),transitionstart:Hn("Transition","TransitionStart"),transitioncancel:Hn("Transition","TransitionCancel"),transitionend:Hn("Transition","TransitionEnd")},Ru={},ys={};Gt&&(ys=document.createElement("div").style,"AnimationEvent"in window||(delete ha.animationend.animation,delete ha.animationiteration.animation,delete ha.animationstart.animation),"TransitionEvent"in window||delete ha.transitionend.transition);function Nn(e){if(Ru[e])return Ru[e];if(!ha[e])return e;var t=ha[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ys)return Ru[e]=t[n];return e}var vs=Nn("animationend"),bs=Nn("animationiteration"),Ss=Nn("animationstart"),Ym=Nn("transitionrun"),Gm=Nn("transitionstart"),Xm=Nn("transitioncancel"),xs=Nn("transitionend"),Ts=new Map,Uu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Uu.push("scrollEnd");function Dt(e,t){Ts.set(e,t),Un(t,[e])}var ai=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},St=[],pa=0,qu=0;function li(){for(var e=pa,t=qu=pa=0;t<e;){var n=St[t];St[t++]=null;var a=St[t];St[t++]=null;var l=St[t];St[t++]=null;var i=St[t];if(St[t++]=null,a!==null&&l!==null){var u=a.pending;u===null?l.next=l:(l.next=u.next,u.next=l),a.pending=l}i!==0&&As(n,l,i)}}function ii(e,t,n,a){St[pa++]=e,St[pa++]=t,St[pa++]=n,St[pa++]=a,qu|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function Hu(e,t,n,a){return ii(e,t,n,a),ui(e)}function Bn(e,t){return ii(e,null,null,t),ui(e)}function As(e,t,n){e.lanes|=n;var a=e.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=e.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(l=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,l&&t!==null&&(l=31-ot(n),e=i.hiddenUpdates,a=e[l],a===null?e[l]=[t]:a.push(t),t.lane=n|536870912),i):null}function ui(e){if(50<_l)throw _l=0,Zo=null,Error(f(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ga={};function Qm(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function st(e,t,n,a){return new Qm(e,t,n,a)}function Nu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Xt(e,t){var n=e.alternate;return n===null?(n=st(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Es(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function oi(e,t,n,a,l,i){var u=0;if(a=e,typeof e=="function")Nu(e)&&(u=1);else if(typeof e=="string")u=Jh(e,n,q.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case pt:return e=st(31,n,t,l),e.elementType=pt,e.lanes=i,e;case _e:return Ln(n.children,l,i,t);case L:u=8,l|=24;break;case ie:return e=st(12,n,t,l|2),e.elementType=ie,e.lanes=i,e;case Le:return e=st(13,n,t,l),e.elementType=Le,e.lanes=i,e;case de:return e=st(19,n,t,l),e.elementType=de,e.lanes=i,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ae:u=10;break e;case Te:u=9;break e;case P:u=11;break e;case k:u=14;break e;case Ce:u=16,a=null;break e}u=29,n=Error(f(130,e===null?"null":typeof e,"")),a=null}return t=st(u,n,t,l),t.elementType=e,t.type=a,t.lanes=i,t}function Ln(e,t,n,a){return e=st(7,e,a,t),e.lanes=n,e}function Bu(e,t,n){return e=st(6,e,null,t),e.lanes=n,e}function zs(e){var t=st(18,null,null,0);return t.stateNode=e,t}function Lu(e,t,n){return t=st(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var _s=new WeakMap;function xt(e,t){if(typeof e=="object"&&e!==null){var n=_s.get(e);return n!==void 0?n:(t={value:e,source:t,stack:Qa(t)},_s.set(e,t),t)}return{value:e,source:t,stack:Qa(t)}}var ya=[],va=0,ci=null,il=0,Tt=[],At=0,sn=null,Ut=1,qt="";function Qt(e,t){ya[va++]=il,ya[va++]=ci,ci=e,il=t}function Ms(e,t,n){Tt[At++]=Ut,Tt[At++]=qt,Tt[At++]=sn,sn=e;var a=Ut;e=qt;var l=32-ot(a)-1;a&=~(1<<l),n+=1;var i=32-ot(t)+l;if(30<i){var u=l-l%5;i=(a&(1<<u)-1).toString(32),a>>=u,l-=u,Ut=1<<32-ot(t)+l|n<<l|a,qt=i+e}else Ut=1<<i|n<<l|a,qt=e}function wu(e){e.return!==null&&(Qt(e,1),Ms(e,1,0))}function Yu(e){for(;e===ci;)ci=ya[--va],ya[va]=null,il=ya[--va],ya[va]=null;for(;e===sn;)sn=Tt[--At],Tt[At]=null,qt=Tt[--At],Tt[At]=null,Ut=Tt[--At],Tt[At]=null}function Ds(e,t){Tt[At++]=Ut,Tt[At++]=qt,Tt[At++]=sn,Ut=t.id,qt=t.overflow,sn=e}var Ze=null,Ee=null,ue=!1,rn=null,Et=!1,Gu=Error(f(519));function fn(e){var t=Error(f(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ul(xt(t,e)),Gu}function Cs(e){var t=e.stateNode,n=e.type,a=e.memoizedProps;switch(t[Ve]=e,t[Ie]=a,n){case"dialog":te("cancel",t),te("close",t);break;case"iframe":case"object":case"embed":te("load",t);break;case"video":case"audio":for(n=0;n<Dl.length;n++)te(Dl[n],t);break;case"source":te("error",t);break;case"img":case"image":case"link":te("error",t),te("load",t);break;case"details":te("toggle",t);break;case"input":te("invalid",t),Xc(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":te("invalid",t);break;case"textarea":te("invalid",t),Vc(t,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||a.suppressHydrationWarning===!0||kf(t.textContent,n)?(a.popover!=null&&(te("beforetoggle",t),te("toggle",t)),a.onScroll!=null&&te("scroll",t),a.onScrollEnd!=null&&te("scrollend",t),a.onClick!=null&&(t.onclick=Yt),t=!0):t=!1,t||fn(e,!0)}function Os(e){for(Ze=e.return;Ze;)switch(Ze.tag){case 5:case 31:case 13:Et=!1;return;case 27:case 3:Et=!0;return;default:Ze=Ze.return}}function ba(e){if(e!==Ze)return!1;if(!ue)return Os(e),ue=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||uc(e.type,e.memoizedProps)),n=!n),n&&Ee&&fn(e),Os(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(f(317));Ee=nd(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(f(317));Ee=nd(e)}else t===27?(t=Ee,zn(e.type)?(e=fc,fc=null,Ee=e):Ee=t):Ee=Ze?_t(e.stateNode.nextSibling):null;return!0}function wn(){Ee=Ze=null,ue=!1}function Xu(){var e=rn;return e!==null&&(at===null?at=e:at.push.apply(at,e),rn=null),e}function ul(e){rn===null?rn=[e]:rn.push(e)}var Qu=r(null),Yn=null,Vt=null;function dn(e,t,n){C(Qu,t._currentValue),t._currentValue=n}function Zt(e){e._currentValue=Qu.current,A(Qu)}function Vu(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function Zu(e,t,n,a){var l=e.child;for(l!==null&&(l.return=e);l!==null;){var i=l.dependencies;if(i!==null){var u=l.child;i=i.firstContext;e:for(;i!==null;){var o=i;i=l;for(var c=0;c<t.length;c++)if(o.context===t[c]){i.lanes|=n,o=i.alternate,o!==null&&(o.lanes|=n),Vu(i.return,n,e),a||(u=null);break e}i=o.next}}else if(l.tag===18){if(u=l.return,u===null)throw Error(f(341));u.lanes|=n,i=u.alternate,i!==null&&(i.lanes|=n),Vu(u,n,e),u=null}else u=l.child;if(u!==null)u.return=l;else for(u=l;u!==null;){if(u===e){u=null;break}if(l=u.sibling,l!==null){l.return=u.return,u=l;break}u=u.return}l=u}}function Sa(e,t,n,a){e=null;for(var l=t,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var u=l.alternate;if(u===null)throw Error(f(387));if(u=u.memoizedProps,u!==null){var o=l.type;ct(l.pendingProps.value,u.value)||(e!==null?e.push(o):e=[o])}}else if(l===oe.current){if(u=l.alternate,u===null)throw Error(f(387));u.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(e!==null?e.push(Ul):e=[Ul])}l=l.return}e!==null&&Zu(t,e,n,a),t.flags|=262144}function si(e){for(e=e.firstContext;e!==null;){if(!ct(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Gn(e){Yn=e,Vt=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ke(e){return js(Yn,e)}function ri(e,t){return Yn===null&&Gn(e),js(e,t)}function js(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Vt===null){if(e===null)throw Error(f(308));Vt=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Vt=Vt.next=t;return n}var Vm=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,a){e.push(a)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},Zm=b.unstable_scheduleCallback,Km=b.unstable_NormalPriority,qe={$$typeof:Ae,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ku(){return{controller:new Vm,data:new Map,refCount:0}}function ol(e){e.refCount--,e.refCount===0&&Zm(Km,function(){e.controller.abort()})}var cl=null,ku=0,xa=0,Ta=null;function km(e,t){if(cl===null){var n=cl=[];ku=0,xa=$o(),Ta={status:"pending",value:void 0,then:function(a){n.push(a)}}}return ku++,t.then(Rs,Rs),t}function Rs(){if(--ku===0&&cl!==null){Ta!==null&&(Ta.status="fulfilled");var e=cl;cl=null,xa=0,Ta=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Jm(e,t){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return e.then(function(){a.status="fulfilled",a.value=t;for(var l=0;l<n.length;l++)(0,n[l])(t)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var Us=x.S;x.S=function(e,t){yf=M(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&km(e,t),Us!==null&&Us(e,t)};var Xn=r(null);function Ju(){var e=Xn.current;return e!==null?e:Se.pooledCache}function fi(e,t){t===null?C(Xn,Xn.current):C(Xn,t.pool)}function qs(){var e=Ju();return e===null?null:{parent:qe._currentValue,pool:e}}var Aa=Error(f(460)),Wu=Error(f(474)),di=Error(f(542)),mi={then:function(){}};function Hs(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Ns(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Yt,Yt),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Ls(e),e;default:if(typeof t.status=="string")t.then(Yt,Yt);else{if(e=Se,e!==null&&100<e.shellSuspendCounter)throw Error(f(482));e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var l=t;l.status="fulfilled",l.value=a}},function(a){if(t.status==="pending"){var l=t;l.status="rejected",l.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Ls(e),e}throw Vn=t,Aa}}function Qn(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Vn=n,Aa):n}}var Vn=null;function Bs(){if(Vn===null)throw Error(f(459));var e=Vn;return Vn=null,e}function Ls(e){if(e===Aa||e===di)throw Error(f(483))}var Ea=null,sl=0;function hi(e){var t=sl;return sl+=1,Ea===null&&(Ea=[]),Ns(Ea,e,t)}function rl(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function pi(e,t){throw t.$$typeof===X?Error(f(525)):(e=Object.prototype.toString.call(t),Error(f(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function ws(e){function t(d,s){if(e){var h=d.deletions;h===null?(d.deletions=[s],d.flags|=16):h.push(s)}}function n(d,s){if(!e)return null;for(;s!==null;)t(d,s),s=s.sibling;return null}function a(d){for(var s=new Map;d!==null;)d.key!==null?s.set(d.key,d):s.set(d.index,d),d=d.sibling;return s}function l(d,s){return d=Xt(d,s),d.index=0,d.sibling=null,d}function i(d,s,h){return d.index=h,e?(h=d.alternate,h!==null?(h=h.index,h<s?(d.flags|=67108866,s):h):(d.flags|=67108866,s)):(d.flags|=1048576,s)}function u(d){return e&&d.alternate===null&&(d.flags|=67108866),d}function o(d,s,h,T){return s===null||s.tag!==6?(s=Bu(h,d.mode,T),s.return=d,s):(s=l(s,h),s.return=d,s)}function c(d,s,h,T){var Y=h.type;return Y===_e?S(d,s,h.props.children,T,h.key):s!==null&&(s.elementType===Y||typeof Y=="object"&&Y!==null&&Y.$$typeof===Ce&&Qn(Y)===s.type)?(s=l(s,h.props),rl(s,h),s.return=d,s):(s=oi(h.type,h.key,h.props,null,d.mode,T),rl(s,h),s.return=d,s)}function p(d,s,h,T){return s===null||s.tag!==4||s.stateNode.containerInfo!==h.containerInfo||s.stateNode.implementation!==h.implementation?(s=Lu(h,d.mode,T),s.return=d,s):(s=l(s,h.children||[]),s.return=d,s)}function S(d,s,h,T,Y){return s===null||s.tag!==7?(s=Ln(h,d.mode,T,Y),s.return=d,s):(s=l(s,h),s.return=d,s)}function E(d,s,h){if(typeof s=="string"&&s!==""||typeof s=="number"||typeof s=="bigint")return s=Bu(""+s,d.mode,h),s.return=d,s;if(typeof s=="object"&&s!==null){switch(s.$$typeof){case le:return h=oi(s.type,s.key,s.props,null,d.mode,h),rl(h,s),h.return=d,h;case be:return s=Lu(s,d.mode,h),s.return=d,s;case Ce:return s=Qn(s),E(d,s,h)}if(it(s)||Xe(s))return s=Ln(s,d.mode,h,null),s.return=d,s;if(typeof s.then=="function")return E(d,hi(s),h);if(s.$$typeof===Ae)return E(d,ri(d,s),h);pi(d,s)}return null}function g(d,s,h,T){var Y=s!==null?s.key:null;if(typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint")return Y!==null?null:o(d,s,""+h,T);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case le:return h.key===Y?c(d,s,h,T):null;case be:return h.key===Y?p(d,s,h,T):null;case Ce:return h=Qn(h),g(d,s,h,T)}if(it(h)||Xe(h))return Y!==null?null:S(d,s,h,T,null);if(typeof h.then=="function")return g(d,s,hi(h),T);if(h.$$typeof===Ae)return g(d,s,ri(d,h),T);pi(d,h)}return null}function v(d,s,h,T,Y){if(typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint")return d=d.get(h)||null,o(s,d,""+T,Y);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case le:return d=d.get(T.key===null?h:T.key)||null,c(s,d,T,Y);case be:return d=d.get(T.key===null?h:T.key)||null,p(s,d,T,Y);case Ce:return T=Qn(T),v(d,s,h,T,Y)}if(it(T)||Xe(T))return d=d.get(h)||null,S(s,d,T,Y,null);if(typeof T.then=="function")return v(d,s,h,hi(T),Y);if(T.$$typeof===Ae)return v(d,s,h,ri(s,T),Y);pi(s,T)}return null}function N(d,s,h,T){for(var Y=null,ce=null,B=s,I=s=0,ae=null;B!==null&&I<h.length;I++){B.index>I?(ae=B,B=null):ae=B.sibling;var se=g(d,B,h[I],T);if(se===null){B===null&&(B=ae);break}e&&B&&se.alternate===null&&t(d,B),s=i(se,s,I),ce===null?Y=se:ce.sibling=se,ce=se,B=ae}if(I===h.length)return n(d,B),ue&&Qt(d,I),Y;if(B===null){for(;I<h.length;I++)B=E(d,h[I],T),B!==null&&(s=i(B,s,I),ce===null?Y=B:ce.sibling=B,ce=B);return ue&&Qt(d,I),Y}for(B=a(B);I<h.length;I++)ae=v(B,d,I,h[I],T),ae!==null&&(e&&ae.alternate!==null&&B.delete(ae.key===null?I:ae.key),s=i(ae,s,I),ce===null?Y=ae:ce.sibling=ae,ce=ae);return e&&B.forEach(function(On){return t(d,On)}),ue&&Qt(d,I),Y}function V(d,s,h,T){if(h==null)throw Error(f(151));for(var Y=null,ce=null,B=s,I=s=0,ae=null,se=h.next();B!==null&&!se.done;I++,se=h.next()){B.index>I?(ae=B,B=null):ae=B.sibling;var On=g(d,B,se.value,T);if(On===null){B===null&&(B=ae);break}e&&B&&On.alternate===null&&t(d,B),s=i(On,s,I),ce===null?Y=On:ce.sibling=On,ce=On,B=ae}if(se.done)return n(d,B),ue&&Qt(d,I),Y;if(B===null){for(;!se.done;I++,se=h.next())se=E(d,se.value,T),se!==null&&(s=i(se,s,I),ce===null?Y=se:ce.sibling=se,ce=se);return ue&&Qt(d,I),Y}for(B=a(B);!se.done;I++,se=h.next())se=v(B,d,I,se.value,T),se!==null&&(e&&se.alternate!==null&&B.delete(se.key===null?I:se.key),s=i(se,s,I),ce===null?Y=se:ce.sibling=se,ce=se);return e&&B.forEach(function(ip){return t(d,ip)}),ue&&Qt(d,I),Y}function ve(d,s,h,T){if(typeof h=="object"&&h!==null&&h.type===_e&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case le:e:{for(var Y=h.key;s!==null;){if(s.key===Y){if(Y=h.type,Y===_e){if(s.tag===7){n(d,s.sibling),T=l(s,h.props.children),T.return=d,d=T;break e}}else if(s.elementType===Y||typeof Y=="object"&&Y!==null&&Y.$$typeof===Ce&&Qn(Y)===s.type){n(d,s.sibling),T=l(s,h.props),rl(T,h),T.return=d,d=T;break e}n(d,s);break}else t(d,s);s=s.sibling}h.type===_e?(T=Ln(h.props.children,d.mode,T,h.key),T.return=d,d=T):(T=oi(h.type,h.key,h.props,null,d.mode,T),rl(T,h),T.return=d,d=T)}return u(d);case be:e:{for(Y=h.key;s!==null;){if(s.key===Y)if(s.tag===4&&s.stateNode.containerInfo===h.containerInfo&&s.stateNode.implementation===h.implementation){n(d,s.sibling),T=l(s,h.children||[]),T.return=d,d=T;break e}else{n(d,s);break}else t(d,s);s=s.sibling}T=Lu(h,d.mode,T),T.return=d,d=T}return u(d);case Ce:return h=Qn(h),ve(d,s,h,T)}if(it(h))return N(d,s,h,T);if(Xe(h)){if(Y=Xe(h),typeof Y!="function")throw Error(f(150));return h=Y.call(h),V(d,s,h,T)}if(typeof h.then=="function")return ve(d,s,hi(h),T);if(h.$$typeof===Ae)return ve(d,s,ri(d,h),T);pi(d,h)}return typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint"?(h=""+h,s!==null&&s.tag===6?(n(d,s.sibling),T=l(s,h),T.return=d,d=T):(n(d,s),T=Bu(h,d.mode,T),T.return=d,d=T),u(d)):n(d,s)}return function(d,s,h,T){try{sl=0;var Y=ve(d,s,h,T);return Ea=null,Y}catch(B){if(B===Aa||B===di)throw B;var ce=st(29,B,null,d.mode);return ce.lanes=T,ce.return=d,ce}finally{}}}var Zn=ws(!0),Ys=ws(!1),mn=!1;function Fu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function $u(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function hn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function pn(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,(fe&2)!==0){var l=a.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),a.pending=t,t=ui(e),As(e,null,n),t}return ii(e,a,t,n),ui(e)}function fl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,jc(e,n)}}function Iu(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var u={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=u:i=i.next=u,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Pu=!1;function dl(){if(Pu){var e=Ta;if(e!==null)throw e}}function ml(e,t,n,a){Pu=!1;var l=e.updateQueue;mn=!1;var i=l.firstBaseUpdate,u=l.lastBaseUpdate,o=l.shared.pending;if(o!==null){l.shared.pending=null;var c=o,p=c.next;c.next=null,u===null?i=p:u.next=p,u=c;var S=e.alternate;S!==null&&(S=S.updateQueue,o=S.lastBaseUpdate,o!==u&&(o===null?S.firstBaseUpdate=p:o.next=p,S.lastBaseUpdate=c))}if(i!==null){var E=l.baseState;u=0,S=p=c=null,o=i;do{var g=o.lane&-536870913,v=g!==o.lane;if(v?(ne&g)===g:(a&g)===g){g!==0&&g===xa&&(Pu=!0),S!==null&&(S=S.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var N=e,V=o;g=t;var ve=n;switch(V.tag){case 1:if(N=V.payload,typeof N=="function"){E=N.call(ve,E,g);break e}E=N;break e;case 3:N.flags=N.flags&-65537|128;case 0:if(N=V.payload,g=typeof N=="function"?N.call(ve,E,g):N,g==null)break e;E=D({},E,g);break e;case 2:mn=!0}}g=o.callback,g!==null&&(e.flags|=64,v&&(e.flags|=8192),v=l.callbacks,v===null?l.callbacks=[g]:v.push(g))}else v={lane:g,tag:o.tag,payload:o.payload,callback:o.callback,next:null},S===null?(p=S=v,c=E):S=S.next=v,u|=g;if(o=o.next,o===null){if(o=l.shared.pending,o===null)break;v=o,o=v.next,v.next=null,l.lastBaseUpdate=v,l.shared.pending=null}}while(!0);S===null&&(c=E),l.baseState=c,l.firstBaseUpdate=p,l.lastBaseUpdate=S,i===null&&(l.shared.lanes=0),Sn|=u,e.lanes=u,e.memoizedState=E}}function Gs(e,t){if(typeof e!="function")throw Error(f(191,e));e.call(t)}function Xs(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Gs(n[e],t)}var za=r(null),gi=r(0);function Qs(e,t){e=en,C(gi,e),C(za,t),en=e|t.baseLanes}function eo(){C(gi,en),C(za,za.current)}function to(){en=gi.current,A(za),A(gi)}var rt=r(null),zt=null;function gn(e){var t=e.alternate;C(Re,Re.current&1),C(rt,e),zt===null&&(t===null||za.current!==null||t.memoizedState!==null)&&(zt=e)}function no(e){C(Re,Re.current),C(rt,e),zt===null&&(zt=e)}function Vs(e){e.tag===22?(C(Re,Re.current),C(rt,e),zt===null&&(zt=e)):yn()}function yn(){C(Re,Re.current),C(rt,rt.current)}function ft(e){A(rt),zt===e&&(zt=null),A(Re)}var Re=r(0);function yi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||sc(n)||rc(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Kt=0,F=null,ge=null,He=null,vi=!1,_a=!1,Kn=!1,bi=0,hl=0,Ma=null,Wm=0;function Oe(){throw Error(f(321))}function ao(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ct(e[n],t[n]))return!1;return!0}function lo(e,t,n,a,l,i){return Kt=i,F=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,x.H=e===null||e.memoizedState===null?Mr:So,Kn=!1,i=n(a,l),Kn=!1,_a&&(i=Ks(t,n,a,l)),Zs(e),i}function Zs(e){x.H=yl;var t=ge!==null&&ge.next!==null;if(Kt=0,He=ge=F=null,vi=!1,hl=0,Ma=null,t)throw Error(f(300));e===null||Ne||(e=e.dependencies,e!==null&&si(e)&&(Ne=!0))}function Ks(e,t,n,a){F=e;var l=0;do{if(_a&&(Ma=null),hl=0,_a=!1,25<=l)throw Error(f(301));if(l+=1,He=ge=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}x.H=Dr,i=t(n,a)}while(_a);return i}function Fm(){var e=x.H,t=e.useState()[0];return t=typeof t.then=="function"?pl(t):t,e=e.useState()[0],(ge!==null?ge.memoizedState:null)!==e&&(F.flags|=1024),t}function io(){var e=bi!==0;return bi=0,e}function uo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function oo(e){if(vi){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}vi=!1}Kt=0,He=ge=F=null,_a=!1,hl=bi=0,Ma=null}function Fe(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return He===null?F.memoizedState=He=e:He=He.next=e,He}function Ue(){if(ge===null){var e=F.alternate;e=e!==null?e.memoizedState:null}else e=ge.next;var t=He===null?F.memoizedState:He.next;if(t!==null)He=t,ge=e;else{if(e===null)throw F.alternate===null?Error(f(467)):Error(f(310));ge=e,e={memoizedState:ge.memoizedState,baseState:ge.baseState,baseQueue:ge.baseQueue,queue:ge.queue,next:null},He===null?F.memoizedState=He=e:He=He.next=e}return He}function Si(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function pl(e){var t=hl;return hl+=1,Ma===null&&(Ma=[]),e=Ns(Ma,e,t),t=F,(He===null?t.memoizedState:He.next)===null&&(t=t.alternate,x.H=t===null||t.memoizedState===null?Mr:So),e}function xi(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return pl(e);if(e.$$typeof===Ae)return Ke(e)}throw Error(f(438,String(e)))}function co(e){var t=null,n=F.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var a=F.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(l){return l.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Si(),F.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),a=0;a<e;a++)n[a]=Bt;return t.index++,n}function kt(e,t){return typeof t=="function"?t(e):t}function Ti(e){var t=Ue();return so(t,ge,e)}function so(e,t,n){var a=e.queue;if(a===null)throw Error(f(311));a.lastRenderedReducer=n;var l=e.baseQueue,i=a.pending;if(i!==null){if(l!==null){var u=l.next;l.next=i.next,i.next=u}t.baseQueue=l=i,a.pending=null}if(i=e.baseState,l===null)e.memoizedState=i;else{t=l.next;var o=u=null,c=null,p=t,S=!1;do{var E=p.lane&-536870913;if(E!==p.lane?(ne&E)===E:(Kt&E)===E){var g=p.revertLane;if(g===0)c!==null&&(c=c.next={lane:0,revertLane:0,gesture:null,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),E===xa&&(S=!0);else if((Kt&g)===g){p=p.next,g===xa&&(S=!0);continue}else E={lane:0,revertLane:p.revertLane,gesture:null,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null},c===null?(o=c=E,u=i):c=c.next=E,F.lanes|=g,Sn|=g;E=p.action,Kn&&n(i,E),i=p.hasEagerState?p.eagerState:n(i,E)}else g={lane:E,revertLane:p.revertLane,gesture:p.gesture,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null},c===null?(o=c=g,u=i):c=c.next=g,F.lanes|=E,Sn|=E;p=p.next}while(p!==null&&p!==t);if(c===null?u=i:c.next=o,!ct(i,e.memoizedState)&&(Ne=!0,S&&(n=Ta,n!==null)))throw n;e.memoizedState=i,e.baseState=u,e.baseQueue=c,a.lastRenderedState=i}return l===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function ro(e){var t=Ue(),n=t.queue;if(n===null)throw Error(f(311));n.lastRenderedReducer=e;var a=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var u=l=l.next;do i=e(i,u.action),u=u.next;while(u!==l);ct(i,t.memoizedState)||(Ne=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,a]}function ks(e,t,n){var a=F,l=Ue(),i=ue;if(i){if(n===void 0)throw Error(f(407));n=n()}else n=t();var u=!ct((ge||l).memoizedState,n);if(u&&(l.memoizedState=n,Ne=!0),l=l.queue,ho(Fs.bind(null,a,l,e),[e]),l.getSnapshot!==t||u||He!==null&&He.memoizedState.tag&1){if(a.flags|=2048,Da(9,{destroy:void 0},Ws.bind(null,a,l,n,t),null),Se===null)throw Error(f(349));i||(Kt&127)!==0||Js(a,t,n)}return n}function Js(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=F.updateQueue,t===null?(t=Si(),F.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ws(e,t,n,a){t.value=n,t.getSnapshot=a,$s(t)&&Is(e)}function Fs(e,t,n){return n(function(){$s(t)&&Is(e)})}function $s(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ct(e,n)}catch{return!0}}function Is(e){var t=Bn(e,2);t!==null&&lt(t,e,2)}function fo(e){var t=Fe();if(typeof e=="function"){var n=e;if(e=n(),Kn){un(!0);try{n()}finally{un(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:kt,lastRenderedState:e},t}function Ps(e,t,n,a){return e.baseState=n,so(e,ge,typeof a=="function"?a:kt)}function $m(e,t,n,a,l){if(zi(e))throw Error(f(485));if(e=t.action,e!==null){var i={payload:l,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){i.listeners.push(u)}};x.T!==null?n(!0):i.isTransition=!1,a(i),n=t.pending,n===null?(i.next=t.pending=i,er(t,i)):(i.next=n.next,t.pending=n.next=i)}}function er(e,t){var n=t.action,a=t.payload,l=e.state;if(t.isTransition){var i=x.T,u={};x.T=u;try{var o=n(l,a),c=x.S;c!==null&&c(u,o),tr(e,t,o)}catch(p){mo(e,t,p)}finally{i!==null&&u.types!==null&&(i.types=u.types),x.T=i}}else try{i=n(l,a),tr(e,t,i)}catch(p){mo(e,t,p)}}function tr(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){nr(e,t,a)},function(a){return mo(e,t,a)}):nr(e,t,n)}function nr(e,t,n){t.status="fulfilled",t.value=n,ar(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,er(e,n)))}function mo(e,t,n){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=n,ar(t),t=t.next;while(t!==a)}e.action=null}function ar(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function lr(e,t){return t}function ir(e,t){if(ue){var n=Se.formState;if(n!==null){e:{var a=F;if(ue){if(Ee){t:{for(var l=Ee,i=Et;l.nodeType!==8;){if(!i){l=null;break t}if(l=_t(l.nextSibling),l===null){l=null;break t}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){Ee=_t(l.nextSibling),a=l.data==="F!";break e}}fn(a)}a=!1}a&&(t=n[0])}}return n=Fe(),n.memoizedState=n.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:lr,lastRenderedState:t},n.queue=a,n=Er.bind(null,F,a),a.dispatch=n,a=fo(!1),i=bo.bind(null,F,!1,a.queue),a=Fe(),l={state:t,dispatch:null,action:e,pending:null},a.queue=l,n=$m.bind(null,F,l,i,n),l.dispatch=n,a.memoizedState=e,[t,n,!1]}function ur(e){var t=Ue();return or(t,ge,e)}function or(e,t,n){if(t=so(e,t,lr)[0],e=Ti(kt)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=pl(t)}catch(u){throw u===Aa?di:u}else a=t;t=Ue();var l=t.queue,i=l.dispatch;return n!==t.memoizedState&&(F.flags|=2048,Da(9,{destroy:void 0},Im.bind(null,l,n),null)),[a,i,e]}function Im(e,t){e.action=t}function cr(e){var t=Ue(),n=ge;if(n!==null)return or(t,n,e);Ue(),t=t.memoizedState,n=Ue();var a=n.queue.dispatch;return n.memoizedState=e,[t,a,!1]}function Da(e,t,n,a){return e={tag:e,create:n,deps:a,inst:t,next:null},t=F.updateQueue,t===null&&(t=Si(),F.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e),e}function sr(){return Ue().memoizedState}function Ai(e,t,n,a){var l=Fe();F.flags|=e,l.memoizedState=Da(1|t,{destroy:void 0},n,a===void 0?null:a)}function Ei(e,t,n,a){var l=Ue();a=a===void 0?null:a;var i=l.memoizedState.inst;ge!==null&&a!==null&&ao(a,ge.memoizedState.deps)?l.memoizedState=Da(t,i,n,a):(F.flags|=e,l.memoizedState=Da(1|t,i,n,a))}function rr(e,t){Ai(8390656,8,e,t)}function ho(e,t){Ei(2048,8,e,t)}function Pm(e){F.flags|=4;var t=F.updateQueue;if(t===null)t=Si(),F.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function fr(e){var t=Ue().memoizedState;return Pm({ref:t,nextImpl:e}),function(){if((fe&2)!==0)throw Error(f(440));return t.impl.apply(void 0,arguments)}}function dr(e,t){return Ei(4,2,e,t)}function mr(e,t){return Ei(4,4,e,t)}function hr(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function pr(e,t,n){n=n!=null?n.concat([e]):null,Ei(4,4,hr.bind(null,t,e),n)}function po(){}function gr(e,t){var n=Ue();t=t===void 0?null:t;var a=n.memoizedState;return t!==null&&ao(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function yr(e,t){var n=Ue();t=t===void 0?null:t;var a=n.memoizedState;if(t!==null&&ao(t,a[1]))return a[0];if(a=e(),Kn){un(!0);try{e()}finally{un(!1)}}return n.memoizedState=[a,t],a}function go(e,t,n){return n===void 0||(Kt&1073741824)!==0&&(ne&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=bf(),F.lanes|=e,Sn|=e,n)}function vr(e,t,n,a){return ct(n,t)?n:za.current!==null?(e=go(e,n,a),ct(e,t)||(Ne=!0),e):(Kt&42)===0||(Kt&1073741824)!==0&&(ne&261930)===0?(Ne=!0,e.memoizedState=n):(e=bf(),F.lanes|=e,Sn|=e,t)}function br(e,t,n,a,l){var i=j.p;j.p=i!==0&&8>i?i:8;var u=x.T,o={};x.T=o,bo(e,!1,t,n);try{var c=l(),p=x.S;if(p!==null&&p(o,c),c!==null&&typeof c=="object"&&typeof c.then=="function"){var S=Jm(c,a);gl(e,t,S,ht(e))}else gl(e,t,a,ht(e))}catch(E){gl(e,t,{then:function(){},status:"rejected",reason:E},ht())}finally{j.p=i,u!==null&&o.types!==null&&(u.types=o.types),x.T=u}}function eh(){}function yo(e,t,n,a){if(e.tag!==5)throw Error(f(476));var l=Sr(e).queue;br(e,l,t,Q,n===null?eh:function(){return xr(e),n(a)})}function Sr(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Q,baseState:Q,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:kt,lastRenderedState:Q},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:kt,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function xr(e){var t=Sr(e);t.next===null&&(t=e.alternate.memoizedState),gl(e,t.next.queue,{},ht())}function vo(){return Ke(Ul)}function Tr(){return Ue().memoizedState}function Ar(){return Ue().memoizedState}function th(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=ht();e=hn(n);var a=pn(t,e,n);a!==null&&(lt(a,t,n),fl(a,t,n)),t={cache:Ku()},e.payload=t;return}t=t.return}}function nh(e,t,n){var a=ht();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},zi(e)?zr(t,n):(n=Hu(e,t,n,a),n!==null&&(lt(n,e,a),_r(n,t,a)))}function Er(e,t,n){var a=ht();gl(e,t,n,a)}function gl(e,t,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(zi(e))zr(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var u=t.lastRenderedState,o=i(u,n);if(l.hasEagerState=!0,l.eagerState=o,ct(o,u))return ii(e,t,l,0),Se===null&&li(),!1}catch{}finally{}if(n=Hu(e,t,l,a),n!==null)return lt(n,e,a),_r(n,t,a),!0}return!1}function bo(e,t,n,a){if(a={lane:2,revertLane:$o(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},zi(e)){if(t)throw Error(f(479))}else t=Hu(e,n,a,2),t!==null&&lt(t,e,2)}function zi(e){var t=e.alternate;return e===F||t!==null&&t===F}function zr(e,t){_a=vi=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function _r(e,t,n){if((n&4194048)!==0){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,jc(e,n)}}var yl={readContext:Ke,use:xi,useCallback:Oe,useContext:Oe,useEffect:Oe,useImperativeHandle:Oe,useLayoutEffect:Oe,useInsertionEffect:Oe,useMemo:Oe,useReducer:Oe,useRef:Oe,useState:Oe,useDebugValue:Oe,useDeferredValue:Oe,useTransition:Oe,useSyncExternalStore:Oe,useId:Oe,useHostTransitionStatus:Oe,useFormState:Oe,useActionState:Oe,useOptimistic:Oe,useMemoCache:Oe,useCacheRefresh:Oe};yl.useEffectEvent=Oe;var Mr={readContext:Ke,use:xi,useCallback:function(e,t){return Fe().memoizedState=[e,t===void 0?null:t],e},useContext:Ke,useEffect:rr,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Ai(4194308,4,hr.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ai(4194308,4,e,t)},useInsertionEffect:function(e,t){Ai(4,2,e,t)},useMemo:function(e,t){var n=Fe();t=t===void 0?null:t;var a=e();if(Kn){un(!0);try{e()}finally{un(!1)}}return n.memoizedState=[a,t],a},useReducer:function(e,t,n){var a=Fe();if(n!==void 0){var l=n(t);if(Kn){un(!0);try{n(t)}finally{un(!1)}}}else l=t;return a.memoizedState=a.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},a.queue=e,e=e.dispatch=nh.bind(null,F,e),[a.memoizedState,e]},useRef:function(e){var t=Fe();return e={current:e},t.memoizedState=e},useState:function(e){e=fo(e);var t=e.queue,n=Er.bind(null,F,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:po,useDeferredValue:function(e,t){var n=Fe();return go(n,e,t)},useTransition:function(){var e=fo(!1);return e=br.bind(null,F,e.queue,!0,!1),Fe().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var a=F,l=Fe();if(ue){if(n===void 0)throw Error(f(407));n=n()}else{if(n=t(),Se===null)throw Error(f(349));(ne&127)!==0||Js(a,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,rr(Fs.bind(null,a,i,e),[e]),a.flags|=2048,Da(9,{destroy:void 0},Ws.bind(null,a,i,n,t),null),n},useId:function(){var e=Fe(),t=Se.identifierPrefix;if(ue){var n=qt,a=Ut;n=(a&~(1<<32-ot(a)-1)).toString(32)+n,t="_"+t+"R_"+n,n=bi++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=Wm++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:vo,useFormState:ir,useActionState:ir,useOptimistic:function(e){var t=Fe();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=bo.bind(null,F,!0,n),n.dispatch=t,[e,t]},useMemoCache:co,useCacheRefresh:function(){return Fe().memoizedState=th.bind(null,F)},useEffectEvent:function(e){var t=Fe(),n={impl:e};return t.memoizedState=n,function(){if((fe&2)!==0)throw Error(f(440));return n.impl.apply(void 0,arguments)}}},So={readContext:Ke,use:xi,useCallback:gr,useContext:Ke,useEffect:ho,useImperativeHandle:pr,useInsertionEffect:dr,useLayoutEffect:mr,useMemo:yr,useReducer:Ti,useRef:sr,useState:function(){return Ti(kt)},useDebugValue:po,useDeferredValue:function(e,t){var n=Ue();return vr(n,ge.memoizedState,e,t)},useTransition:function(){var e=Ti(kt)[0],t=Ue().memoizedState;return[typeof e=="boolean"?e:pl(e),t]},useSyncExternalStore:ks,useId:Tr,useHostTransitionStatus:vo,useFormState:ur,useActionState:ur,useOptimistic:function(e,t){var n=Ue();return Ps(n,ge,e,t)},useMemoCache:co,useCacheRefresh:Ar};So.useEffectEvent=fr;var Dr={readContext:Ke,use:xi,useCallback:gr,useContext:Ke,useEffect:ho,useImperativeHandle:pr,useInsertionEffect:dr,useLayoutEffect:mr,useMemo:yr,useReducer:ro,useRef:sr,useState:function(){return ro(kt)},useDebugValue:po,useDeferredValue:function(e,t){var n=Ue();return ge===null?go(n,e,t):vr(n,ge.memoizedState,e,t)},useTransition:function(){var e=ro(kt)[0],t=Ue().memoizedState;return[typeof e=="boolean"?e:pl(e),t]},useSyncExternalStore:ks,useId:Tr,useHostTransitionStatus:vo,useFormState:cr,useActionState:cr,useOptimistic:function(e,t){var n=Ue();return ge!==null?Ps(n,ge,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:co,useCacheRefresh:Ar};Dr.useEffectEvent=fr;function xo(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var To={enqueueSetState:function(e,t,n){e=e._reactInternals;var a=ht(),l=hn(a);l.payload=t,n!=null&&(l.callback=n),t=pn(e,l,a),t!==null&&(lt(t,e,a),fl(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=ht(),l=hn(a);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=pn(e,l,a),t!==null&&(lt(t,e,a),fl(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ht(),a=hn(n);a.tag=2,t!=null&&(a.callback=t),t=pn(e,a,n),t!==null&&(lt(t,e,n),fl(t,e,n))}};function Cr(e,t,n,a,l,i,u){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,i,u):t.prototype&&t.prototype.isPureReactComponent?!al(n,a)||!al(l,i):!0}function Or(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&To.enqueueReplaceState(t,t.state,null)}function kn(e,t){var n=t;if("ref"in t){n={};for(var a in t)a!=="ref"&&(n[a]=t[a])}if(e=e.defaultProps){n===t&&(n=D({},n));for(var l in e)n[l]===void 0&&(n[l]=e[l])}return n}function jr(e){ai(e)}function Rr(e){console.error(e)}function Ur(e){ai(e)}function _i(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function qr(e,t,n){try{var a=e.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Ao(e,t,n){return n=hn(n),n.tag=3,n.payload={element:null},n.callback=function(){_i(e,t)},n}function Hr(e){return e=hn(e),e.tag=3,e}function Nr(e,t,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;e.payload=function(){return l(i)},e.callback=function(){qr(t,n,a)}}var u=n.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(e.callback=function(){qr(t,n,a),typeof l!="function"&&(xn===null?xn=new Set([this]):xn.add(this));var o=a.stack;this.componentDidCatch(a.value,{componentStack:o!==null?o:""})})}function ah(e,t,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=n.alternate,t!==null&&Sa(t,n,l,!0),n=rt.current,n!==null){switch(n.tag){case 31:case 13:return zt===null?Li():n.alternate===null&&je===0&&(je=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===mi?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([a]):t.add(a),Jo(e,a,l)),!1;case 22:return n.flags|=65536,a===mi?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([a]):n.add(a)),Jo(e,a,l)),!1}throw Error(f(435,n.tag))}return Jo(e,a,l),Li(),!1}if(ue)return t=rt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=l,a!==Gu&&(e=Error(f(422),{cause:a}),ul(xt(e,n)))):(a!==Gu&&(t=Error(f(423),{cause:a}),ul(xt(t,n))),e=e.current.alternate,e.flags|=65536,l&=-l,e.lanes|=l,a=xt(a,n),l=Ao(e.stateNode,a,l),Iu(e,l),je!==4&&(je=2)),!1;var i=Error(f(520),{cause:a});if(i=xt(i,n),zl===null?zl=[i]:zl.push(i),je!==4&&(je=2),t===null)return!0;a=xt(a,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=l&-l,n.lanes|=e,e=Ao(n.stateNode,a,e),Iu(n,e),!1;case 1:if(t=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(xn===null||!xn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=Hr(l),Nr(l,e,n,a),Iu(n,l),!1}n=n.return}while(n!==null);return!1}var Eo=Error(f(461)),Ne=!1;function ke(e,t,n,a){t.child=e===null?Ys(t,null,n,a):Zn(t,e.child,n,a)}function Br(e,t,n,a,l){n=n.render;var i=t.ref;if("ref"in a){var u={};for(var o in a)o!=="ref"&&(u[o]=a[o])}else u=a;return Gn(t),a=lo(e,t,n,u,i,l),o=io(),e!==null&&!Ne?(uo(e,t,l),Jt(e,t,l)):(ue&&o&&wu(t),t.flags|=1,ke(e,t,a,l),t.child)}function Lr(e,t,n,a,l){if(e===null){var i=n.type;return typeof i=="function"&&!Nu(i)&&i.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=i,wr(e,t,i,a,l)):(e=oi(n.type,null,a,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!Ro(e,l)){var u=i.memoizedProps;if(n=n.compare,n=n!==null?n:al,n(u,a)&&e.ref===t.ref)return Jt(e,t,l)}return t.flags|=1,e=Xt(i,a),e.ref=t.ref,e.return=t,t.child=e}function wr(e,t,n,a,l){if(e!==null){var i=e.memoizedProps;if(al(i,a)&&e.ref===t.ref)if(Ne=!1,t.pendingProps=a=i,Ro(e,l))(e.flags&131072)!==0&&(Ne=!0);else return t.lanes=e.lanes,Jt(e,t,l)}return zo(e,t,n,a,l)}function Yr(e,t,n,a){var l=a.children,i=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((t.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,e!==null){for(a=t.child=e.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,t.child=null;return Gr(e,t,i,n,a)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&fi(t,i!==null?i.cachePool:null),i!==null?Qs(t,i):eo(),Vs(t);else return a=t.lanes=536870912,Gr(e,t,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(fi(t,i.cachePool),Qs(t,i),yn(),t.memoizedState=null):(e!==null&&fi(t,null),eo(),yn());return ke(e,t,l,n),t.child}function vl(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Gr(e,t,n,a,l){var i=Ju();return i=i===null?null:{parent:qe._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},e!==null&&fi(t,null),eo(),Vs(t),e!==null&&Sa(e,t,a,!0),t.childLanes=l,null}function Mi(e,t){return t=Ci({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Xr(e,t,n){return Zn(t,e.child,null,n),e=Mi(t,t.pendingProps),e.flags|=2,ft(t),t.memoizedState=null,e}function lh(e,t,n){var a=t.pendingProps,l=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(ue){if(a.mode==="hidden")return e=Mi(t,a),t.lanes=536870912,vl(null,e);if(no(t),(e=Ee)?(e=td(e,Et),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:sn!==null?{id:Ut,overflow:qt}:null,retryLane:536870912,hydrationErrors:null},n=zs(e),n.return=t,t.child=n,Ze=t,Ee=null)):e=null,e===null)throw fn(t);return t.lanes=536870912,null}return Mi(t,a)}var i=e.memoizedState;if(i!==null){var u=i.dehydrated;if(no(t),l)if(t.flags&256)t.flags&=-257,t=Xr(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(f(558));else if(Ne||Sa(e,t,n,!1),l=(n&e.childLanes)!==0,Ne||l){if(a=Se,a!==null&&(u=Rc(a,n),u!==0&&u!==i.retryLane))throw i.retryLane=u,Bn(e,u),lt(a,e,u),Eo;Li(),t=Xr(e,t,n)}else e=i.treeContext,Ee=_t(u.nextSibling),Ze=t,ue=!0,rn=null,Et=!1,e!==null&&Ds(t,e),t=Mi(t,a),t.flags|=4096;return t}return e=Xt(e.child,{mode:a.mode,children:a.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Di(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(f(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function zo(e,t,n,a,l){return Gn(t),n=lo(e,t,n,a,void 0,l),a=io(),e!==null&&!Ne?(uo(e,t,l),Jt(e,t,l)):(ue&&a&&wu(t),t.flags|=1,ke(e,t,n,l),t.child)}function Qr(e,t,n,a,l,i){return Gn(t),t.updateQueue=null,n=Ks(t,a,n,l),Zs(e),a=io(),e!==null&&!Ne?(uo(e,t,i),Jt(e,t,i)):(ue&&a&&wu(t),t.flags|=1,ke(e,t,n,i),t.child)}function Vr(e,t,n,a,l){if(Gn(t),t.stateNode===null){var i=ga,u=n.contextType;typeof u=="object"&&u!==null&&(i=Ke(u)),i=new n(a,i),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=To,t.stateNode=i,i._reactInternals=t,i=t.stateNode,i.props=a,i.state=t.memoizedState,i.refs={},Fu(t),u=n.contextType,i.context=typeof u=="object"&&u!==null?Ke(u):ga,i.state=t.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(xo(t,n,u,a),i.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(u=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),u!==i.state&&To.enqueueReplaceState(i,i.state,null),ml(t,a,i,l),dl(),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(e===null){i=t.stateNode;var o=t.memoizedProps,c=kn(n,o);i.props=c;var p=i.context,S=n.contextType;u=ga,typeof S=="object"&&S!==null&&(u=Ke(S));var E=n.getDerivedStateFromProps;S=typeof E=="function"||typeof i.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,S||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o||p!==u)&&Or(t,i,a,u),mn=!1;var g=t.memoizedState;i.state=g,ml(t,a,i,l),dl(),p=t.memoizedState,o||g!==p||mn?(typeof E=="function"&&(xo(t,n,E,a),p=t.memoizedState),(c=mn||Cr(t,n,c,a,g,p,u))?(S||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=p),i.props=a,i.state=p,i.context=u,a=c):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,$u(e,t),u=t.memoizedProps,S=kn(n,u),i.props=S,E=t.pendingProps,g=i.context,p=n.contextType,c=ga,typeof p=="object"&&p!==null&&(c=Ke(p)),o=n.getDerivedStateFromProps,(p=typeof o=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==E||g!==c)&&Or(t,i,a,c),mn=!1,g=t.memoizedState,i.state=g,ml(t,a,i,l),dl();var v=t.memoizedState;u!==E||g!==v||mn||e!==null&&e.dependencies!==null&&si(e.dependencies)?(typeof o=="function"&&(xo(t,n,o,a),v=t.memoizedState),(S=mn||Cr(t,n,S,a,g,v,c)||e!==null&&e.dependencies!==null&&si(e.dependencies))?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,v,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,v,c)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=v),i.props=a,i.state=v,i.context=c,a=S):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),a=!1)}return i=a,Di(e,t),a=(t.flags&128)!==0,i||a?(i=t.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),t.flags|=1,e!==null&&a?(t.child=Zn(t,e.child,null,l),t.child=Zn(t,null,n,l)):ke(e,t,n,l),t.memoizedState=i.state,e=t.child):e=Jt(e,t,l),e}function Zr(e,t,n,a){return wn(),t.flags|=256,ke(e,t,n,a),t.child}var _o={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Mo(e){return{baseLanes:e,cachePool:qs()}}function Do(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=mt),e}function Kr(e,t,n){var a=t.pendingProps,l=!1,i=(t.flags&128)!==0,u;if((u=i)||(u=e!==null&&e.memoizedState===null?!1:(Re.current&2)!==0),u&&(l=!0,t.flags&=-129),u=(t.flags&32)!==0,t.flags&=-33,e===null){if(ue){if(l?gn(t):yn(),(e=Ee)?(e=td(e,Et),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:sn!==null?{id:Ut,overflow:qt}:null,retryLane:536870912,hydrationErrors:null},n=zs(e),n.return=t,t.child=n,Ze=t,Ee=null)):e=null,e===null)throw fn(t);return rc(e)?t.lanes=32:t.lanes=536870912,null}var o=a.children;return a=a.fallback,l?(yn(),l=t.mode,o=Ci({mode:"hidden",children:o},l),a=Ln(a,l,n,null),o.return=t,a.return=t,o.sibling=a,t.child=o,a=t.child,a.memoizedState=Mo(n),a.childLanes=Do(e,u,n),t.memoizedState=_o,vl(null,a)):(gn(t),Co(t,o))}var c=e.memoizedState;if(c!==null&&(o=c.dehydrated,o!==null)){if(i)t.flags&256?(gn(t),t.flags&=-257,t=Oo(e,t,n)):t.memoizedState!==null?(yn(),t.child=e.child,t.flags|=128,t=null):(yn(),o=a.fallback,l=t.mode,a=Ci({mode:"visible",children:a.children},l),o=Ln(o,l,n,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,Zn(t,e.child,null,n),a=t.child,a.memoizedState=Mo(n),a.childLanes=Do(e,u,n),t.memoizedState=_o,t=vl(null,a));else if(gn(t),rc(o)){if(u=o.nextSibling&&o.nextSibling.dataset,u)var p=u.dgst;u=p,a=Error(f(419)),a.stack="",a.digest=u,ul({value:a,source:null,stack:null}),t=Oo(e,t,n)}else if(Ne||Sa(e,t,n,!1),u=(n&e.childLanes)!==0,Ne||u){if(u=Se,u!==null&&(a=Rc(u,n),a!==0&&a!==c.retryLane))throw c.retryLane=a,Bn(e,a),lt(u,e,a),Eo;sc(o)||Li(),t=Oo(e,t,n)}else sc(o)?(t.flags|=192,t.child=e.child,t=null):(e=c.treeContext,Ee=_t(o.nextSibling),Ze=t,ue=!0,rn=null,Et=!1,e!==null&&Ds(t,e),t=Co(t,a.children),t.flags|=4096);return t}return l?(yn(),o=a.fallback,l=t.mode,c=e.child,p=c.sibling,a=Xt(c,{mode:"hidden",children:a.children}),a.subtreeFlags=c.subtreeFlags&65011712,p!==null?o=Xt(p,o):(o=Ln(o,l,n,null),o.flags|=2),o.return=t,a.return=t,a.sibling=o,t.child=a,vl(null,a),a=t.child,o=e.child.memoizedState,o===null?o=Mo(n):(l=o.cachePool,l!==null?(c=qe._currentValue,l=l.parent!==c?{parent:c,pool:c}:l):l=qs(),o={baseLanes:o.baseLanes|n,cachePool:l}),a.memoizedState=o,a.childLanes=Do(e,u,n),t.memoizedState=_o,vl(e.child,a)):(gn(t),n=e.child,e=n.sibling,n=Xt(n,{mode:"visible",children:a.children}),n.return=t,n.sibling=null,e!==null&&(u=t.deletions,u===null?(t.deletions=[e],t.flags|=16):u.push(e)),t.child=n,t.memoizedState=null,n)}function Co(e,t){return t=Ci({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Ci(e,t){return e=st(22,e,null,t),e.lanes=0,e}function Oo(e,t,n){return Zn(t,e.child,null,n),e=Co(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function kr(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),Vu(e.return,t,n)}function jo(e,t,n,a,l,i){var u=e.memoizedState;u===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(u.isBackwards=t,u.rendering=null,u.renderingStartTime=0,u.last=a,u.tail=n,u.tailMode=l,u.treeForkCount=i)}function Jr(e,t,n){var a=t.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var u=Re.current,o=(u&2)!==0;if(o?(u=u&1|2,t.flags|=128):u&=1,C(Re,u),ke(e,t,a,n),a=ue?il:0,!o&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&kr(e,n,t);else if(e.tag===19)kr(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&yi(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),jo(t,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&yi(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}jo(t,!0,n,null,i,a);break;case"together":jo(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function Jt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Sn|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Sa(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(f(153));if(t.child!==null){for(e=t.child,n=Xt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Xt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Ro(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&si(e)))}function ih(e,t,n){switch(t.tag){case 3:Qe(t,t.stateNode.containerInfo),dn(t,qe,e.memoizedState.cache),wn();break;case 27:case 5:an(t);break;case 4:Qe(t,t.stateNode.containerInfo);break;case 10:dn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,no(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(gn(t),t.flags|=128,null):(n&t.child.childLanes)!==0?Kr(e,t,n):(gn(t),e=Jt(e,t,n),e!==null?e.sibling:null);gn(t);break;case 19:var l=(e.flags&128)!==0;if(a=(n&t.childLanes)!==0,a||(Sa(e,t,n,!1),a=(n&t.childLanes)!==0),l){if(a)return Jr(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),C(Re,Re.current),a)break;return null;case 22:return t.lanes=0,Yr(e,t,n,t.pendingProps);case 24:dn(t,qe,e.memoizedState.cache)}return Jt(e,t,n)}function Wr(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Ne=!0;else{if(!Ro(e,n)&&(t.flags&128)===0)return Ne=!1,ih(e,t,n);Ne=(e.flags&131072)!==0}else Ne=!1,ue&&(t.flags&1048576)!==0&&Ms(t,il,t.index);switch(t.lanes=0,t.tag){case 16:e:{var a=t.pendingProps;if(e=Qn(t.elementType),t.type=e,typeof e=="function")Nu(e)?(a=kn(e,a),t.tag=1,t=Vr(null,t,e,a,n)):(t.tag=0,t=zo(null,t,e,a,n));else{if(e!=null){var l=e.$$typeof;if(l===P){t.tag=11,t=Br(null,t,e,a,n);break e}else if(l===k){t.tag=14,t=Lr(null,t,e,a,n);break e}}throw t=yt(e)||e,Error(f(306,t,""))}}return t;case 0:return zo(e,t,t.type,t.pendingProps,n);case 1:return a=t.type,l=kn(a,t.pendingProps),Vr(e,t,a,l,n);case 3:e:{if(Qe(t,t.stateNode.containerInfo),e===null)throw Error(f(387));a=t.pendingProps;var i=t.memoizedState;l=i.element,$u(e,t),ml(t,a,null,n);var u=t.memoizedState;if(a=u.cache,dn(t,qe,a),a!==i.cache&&Zu(t,[qe],n,!0),dl(),a=u.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:u.cache},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){t=Zr(e,t,a,n);break e}else if(a!==l){l=xt(Error(f(424)),t),ul(l),t=Zr(e,t,a,n);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ee=_t(e.firstChild),Ze=t,ue=!0,rn=null,Et=!0,n=Ys(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(wn(),a===l){t=Jt(e,t,n);break e}ke(e,t,a,n)}t=t.child}return t;case 26:return Di(e,t),e===null?(n=od(t.type,null,t.pendingProps,null))?t.memoizedState=n:ue||(n=t.type,e=t.pendingProps,a=Zi($.current).createElement(n),a[Ve]=t,a[Ie]=e,Je(a,n,e),Ye(a),t.stateNode=a):t.memoizedState=od(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return an(t),e===null&&ue&&(a=t.stateNode=ld(t.type,t.pendingProps,$.current),Ze=t,Et=!0,l=Ee,zn(t.type)?(fc=l,Ee=_t(a.firstChild)):Ee=l),ke(e,t,t.pendingProps.children,n),Di(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ue&&((l=a=Ee)&&(a=Hh(a,t.type,t.pendingProps,Et),a!==null?(t.stateNode=a,Ze=t,Ee=_t(a.firstChild),Et=!1,l=!0):l=!1),l||fn(t)),an(t),l=t.type,i=t.pendingProps,u=e!==null?e.memoizedProps:null,a=i.children,uc(l,i)?a=null:u!==null&&uc(l,u)&&(t.flags|=32),t.memoizedState!==null&&(l=lo(e,t,Fm,null,null,n),Ul._currentValue=l),Di(e,t),ke(e,t,a,n),t.child;case 6:return e===null&&ue&&((e=n=Ee)&&(n=Nh(n,t.pendingProps,Et),n!==null?(t.stateNode=n,Ze=t,Ee=null,e=!0):e=!1),e||fn(t)),null;case 13:return Kr(e,t,n);case 4:return Qe(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=Zn(t,null,a,n):ke(e,t,a,n),t.child;case 11:return Br(e,t,t.type,t.pendingProps,n);case 7:return ke(e,t,t.pendingProps,n),t.child;case 8:return ke(e,t,t.pendingProps.children,n),t.child;case 12:return ke(e,t,t.pendingProps.children,n),t.child;case 10:return a=t.pendingProps,dn(t,t.type,a.value),ke(e,t,a.children,n),t.child;case 9:return l=t.type._context,a=t.pendingProps.children,Gn(t),l=Ke(l),a=a(l),t.flags|=1,ke(e,t,a,n),t.child;case 14:return Lr(e,t,t.type,t.pendingProps,n);case 15:return wr(e,t,t.type,t.pendingProps,n);case 19:return Jr(e,t,n);case 31:return lh(e,t,n);case 22:return Yr(e,t,n,t.pendingProps);case 24:return Gn(t),a=Ke(qe),e===null?(l=Ju(),l===null&&(l=Se,i=Ku(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),t.memoizedState={parent:a,cache:l},Fu(t),dn(t,qe,l)):((e.lanes&n)!==0&&($u(e,t),ml(t,null,null,n),dl()),l=e.memoizedState,i=t.memoizedState,l.parent!==a?(l={parent:a,cache:a},t.memoizedState=l,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=l),dn(t,qe,a)):(a=i.cache,dn(t,qe,a),a!==l.cache&&Zu(t,[qe],n,!0))),ke(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(f(156,t.tag))}function Wt(e){e.flags|=4}function Uo(e,t,n,a,l){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(l&335544128)===l)if(e.stateNode.complete)e.flags|=8192;else if(Af())e.flags|=8192;else throw Vn=mi,Wu}else e.flags&=-16777217}function Fr(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!dd(t))if(Af())e.flags|=8192;else throw Vn=mi,Wu}function Oi(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Cc():536870912,e.lanes|=t,Ra|=t)}function bl(e,t){if(!ue)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function ze(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function uh(e,t,n){var a=t.pendingProps;switch(Yu(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ze(t),null;case 1:return ze(t),null;case 3:return n=t.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Zt(qe),Me(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(ba(t)?Wt(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Xu())),ze(t),null;case 26:var l=t.type,i=t.memoizedState;return e===null?(Wt(t),i!==null?(ze(t),Fr(t,i)):(ze(t),Uo(t,l,null,a,n))):i?i!==e.memoizedState?(Wt(t),ze(t),Fr(t,i)):(ze(t),t.flags&=-16777217):(e=e.memoizedProps,e!==a&&Wt(t),ze(t),Uo(t,l,e,a,n)),null;case 27:if(jn(t),n=$.current,l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&Wt(t);else{if(!a){if(t.stateNode===null)throw Error(f(166));return ze(t),null}e=q.current,ba(t)?Cs(t):(e=ld(l,a,n),t.stateNode=e,Wt(t))}return ze(t),null;case 5:if(jn(t),l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&Wt(t);else{if(!a){if(t.stateNode===null)throw Error(f(166));return ze(t),null}if(i=q.current,ba(t))Cs(t);else{var u=Zi($.current);switch(i){case 1:i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=u.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?u.createElement("select",{is:a.is}):u.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?u.createElement(l,{is:a.is}):u.createElement(l)}}i[Ve]=t,i[Ie]=a;e:for(u=t.child;u!==null;){if(u.tag===5||u.tag===6)i.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===t)break e;for(;u.sibling===null;){if(u.return===null||u.return===t)break e;u=u.return}u.sibling.return=u.return,u=u.sibling}t.stateNode=i;e:switch(Je(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}a&&Wt(t)}}return ze(t),Uo(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==a&&Wt(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(f(166));if(e=$.current,ba(t)){if(e=t.stateNode,n=t.memoizedProps,a=null,l=Ze,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}e[Ve]=t,e=!!(e.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||kf(e.nodeValue,n)),e||fn(t,!0)}else e=Zi(e).createTextNode(a),e[Ve]=t,t.stateNode=e}return ze(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(a=ba(t),n!==null){if(e===null){if(!a)throw Error(f(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(f(557));e[Ve]=t}else wn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ze(t),e=!1}else n=Xu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(ft(t),t):(ft(t),null);if((t.flags&128)!==0)throw Error(f(558))}return ze(t),null;case 13:if(a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(l=ba(t),a!==null&&a.dehydrated!==null){if(e===null){if(!l)throw Error(f(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(f(317));l[Ve]=t}else wn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ze(t),l=!1}else l=Xu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),l=!0;if(!l)return t.flags&256?(ft(t),t):(ft(t),null)}return ft(t),(t.flags&128)!==0?(t.lanes=n,t):(n=a!==null,e=e!==null&&e.memoizedState!==null,n&&(a=t.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Oi(t,t.updateQueue),ze(t),null);case 4:return Me(),e===null&&tc(t.stateNode.containerInfo),ze(t),null;case 10:return Zt(t.type),ze(t),null;case 19:if(A(Re),a=t.memoizedState,a===null)return ze(t),null;if(l=(t.flags&128)!==0,i=a.rendering,i===null)if(l)bl(a,!1);else{if(je!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=yi(e),i!==null){for(t.flags|=128,bl(a,!1),e=i.updateQueue,t.updateQueue=e,Oi(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Es(n,e),n=n.sibling;return C(Re,Re.current&1|2),ue&&Qt(t,a.treeForkCount),t.child}e=e.sibling}a.tail!==null&&M()>Hi&&(t.flags|=128,l=!0,bl(a,!1),t.lanes=4194304)}else{if(!l)if(e=yi(i),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,Oi(t,e),bl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!ue)return ze(t),null}else 2*M()-a.renderingStartTime>Hi&&n!==536870912&&(t.flags|=128,l=!0,bl(a,!1),t.lanes=4194304);a.isBackwards?(i.sibling=t.child,t.child=i):(e=a.last,e!==null?e.sibling=i:t.child=i,a.last=i)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=M(),e.sibling=null,n=Re.current,C(Re,l?n&1|2:n&1),ue&&Qt(t,a.treeForkCount),e):(ze(t),null);case 22:case 23:return ft(t),to(),a=t.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?(n&536870912)!==0&&(t.flags&128)===0&&(ze(t),t.subtreeFlags&6&&(t.flags|=8192)):ze(t),n=t.updateQueue,n!==null&&Oi(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==n&&(t.flags|=2048),e!==null&&A(Xn),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Zt(qe),ze(t),null;case 25:return null;case 30:return null}throw Error(f(156,t.tag))}function oh(e,t){switch(Yu(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Zt(qe),Me(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return jn(t),null;case 31:if(t.memoizedState!==null){if(ft(t),t.alternate===null)throw Error(f(340));wn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ft(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(f(340));wn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return A(Re),null;case 4:return Me(),null;case 10:return Zt(t.type),null;case 22:case 23:return ft(t),to(),e!==null&&A(Xn),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Zt(qe),null;case 25:return null;default:return null}}function $r(e,t){switch(Yu(t),t.tag){case 3:Zt(qe),Me();break;case 26:case 27:case 5:jn(t);break;case 4:Me();break;case 31:t.memoizedState!==null&&ft(t);break;case 13:ft(t);break;case 19:A(Re);break;case 10:Zt(t.type);break;case 22:case 23:ft(t),to(),e!==null&&A(Xn);break;case 24:Zt(qe)}}function Sl(e,t){try{var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&e)===e){a=void 0;var i=n.create,u=n.inst;a=i(),u.destroy=a}n=n.next}while(n!==l)}}catch(o){pe(t,t.return,o)}}function vn(e,t,n){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&e)===e){var u=a.inst,o=u.destroy;if(o!==void 0){u.destroy=void 0,l=t;var c=n,p=o;try{p()}catch(S){pe(l,c,S)}}}a=a.next}while(a!==i)}}catch(S){pe(t,t.return,S)}}function Ir(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Xs(t,n)}catch(a){pe(e,e.return,a)}}}function Pr(e,t,n){n.props=kn(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(a){pe(e,t,a)}}function xl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof n=="function"?e.refCleanup=n(a):n.current=a}}catch(l){pe(e,t,l)}}function Ht(e,t){var n=e.ref,a=e.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){pe(e,t,l)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){pe(e,t,l)}else n.current=null}function ef(e){var t=e.type,n=e.memoizedProps,a=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break e;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){pe(e,e.return,l)}}function qo(e,t,n){try{var a=e.stateNode;Ch(a,e.type,n,t),a[Ie]=t}catch(l){pe(e,e.return,l)}}function tf(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&zn(e.type)||e.tag===4}function Ho(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||tf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&zn(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function No(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Yt));else if(a!==4&&(a===27&&zn(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(No(e,t,n),e=e.sibling;e!==null;)No(e,t,n),e=e.sibling}function ji(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(a===27&&zn(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(ji(e,t,n),e=e.sibling;e!==null;)ji(e,t,n),e=e.sibling}function nf(e){var t=e.stateNode,n=e.memoizedProps;try{for(var a=e.type,l=t.attributes;l.length;)t.removeAttributeNode(l[0]);Je(t,a,n),t[Ve]=e,t[Ie]=n}catch(i){pe(e,e.return,i)}}var Ft=!1,Be=!1,Bo=!1,af=typeof WeakSet=="function"?WeakSet:Set,Ge=null;function ch(e,t){if(e=e.containerInfo,lc=Ii,e=ps(e),Cu(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var u=0,o=-1,c=-1,p=0,S=0,E=e,g=null;t:for(;;){for(var v;E!==n||l!==0&&E.nodeType!==3||(o=u+l),E!==i||a!==0&&E.nodeType!==3||(c=u+a),E.nodeType===3&&(u+=E.nodeValue.length),(v=E.firstChild)!==null;)g=E,E=v;for(;;){if(E===e)break t;if(g===n&&++p===l&&(o=u),g===i&&++S===a&&(c=u),(v=E.nextSibling)!==null)break;E=g,g=E.parentNode}E=v}n=o===-1||c===-1?null:{start:o,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(ic={focusedElem:e,selectionRange:n},Ii=!1,Ge=t;Ge!==null;)if(t=Ge,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Ge=e;else for(;Ge!==null;){switch(t=Ge,i=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)l=e[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&i!==null){e=void 0,n=t,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var N=kn(n.type,l);e=a.getSnapshotBeforeUpdate(N,i),a.__reactInternalSnapshotBeforeUpdate=e}catch(V){pe(n,n.return,V)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)cc(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":cc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(f(163))}if(e=t.sibling,e!==null){e.return=t.return,Ge=e;break}Ge=t.return}}function lf(e,t,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:It(e,n),a&4&&Sl(5,n);break;case 1:if(It(e,n),a&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(u){pe(n,n.return,u)}else{var l=kn(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(l,t,e.__reactInternalSnapshotBeforeUpdate)}catch(u){pe(n,n.return,u)}}a&64&&Ir(n),a&512&&xl(n,n.return);break;case 3:if(It(e,n),a&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Xs(e,t)}catch(u){pe(n,n.return,u)}}break;case 27:t===null&&a&4&&nf(n);case 26:case 5:It(e,n),t===null&&a&4&&ef(n),a&512&&xl(n,n.return);break;case 12:It(e,n);break;case 31:It(e,n),a&4&&cf(e,n);break;case 13:It(e,n),a&4&&sf(e,n),a&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=yh.bind(null,n),Bh(e,n))));break;case 22:if(a=n.memoizedState!==null||Ft,!a){t=t!==null&&t.memoizedState!==null||Be,l=Ft;var i=Be;Ft=a,(Be=t)&&!i?Pt(e,n,(n.subtreeFlags&8772)!==0):It(e,n),Ft=l,Be=i}break;case 30:break;default:It(e,n)}}function uf(e){var t=e.alternate;t!==null&&(e.alternate=null,uf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&du(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var De=null,et=!1;function $t(e,t,n){for(n=n.child;n!==null;)of(e,t,n),n=n.sibling}function of(e,t,n){if(ut&&typeof ut.onCommitFiberUnmount=="function")try{ut.onCommitFiberUnmount(Za,n)}catch{}switch(n.tag){case 26:Be||Ht(n,t),$t(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Be||Ht(n,t);var a=De,l=et;zn(n.type)&&(De=n.stateNode,et=!1),$t(e,t,n),Ol(n.stateNode),De=a,et=l;break;case 5:Be||Ht(n,t);case 6:if(a=De,l=et,De=null,$t(e,t,n),De=a,et=l,De!==null)if(et)try{(De.nodeType===9?De.body:De.nodeName==="HTML"?De.ownerDocument.body:De).removeChild(n.stateNode)}catch(i){pe(n,t,i)}else try{De.removeChild(n.stateNode)}catch(i){pe(n,t,i)}break;case 18:De!==null&&(et?(e=De,Pf(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),Ya(e)):Pf(De,n.stateNode));break;case 4:a=De,l=et,De=n.stateNode.containerInfo,et=!0,$t(e,t,n),De=a,et=l;break;case 0:case 11:case 14:case 15:vn(2,n,t),Be||vn(4,n,t),$t(e,t,n);break;case 1:Be||(Ht(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Pr(n,t,a)),$t(e,t,n);break;case 21:$t(e,t,n);break;case 22:Be=(a=Be)||n.memoizedState!==null,$t(e,t,n),Be=a;break;default:$t(e,t,n)}}function cf(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Ya(e)}catch(n){pe(t,t.return,n)}}}function sf(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Ya(e)}catch(n){pe(t,t.return,n)}}function sh(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new af),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new af),t;default:throw Error(f(435,e.tag))}}function Ri(e,t){var n=sh(e);t.forEach(function(a){if(!n.has(a)){n.add(a);var l=vh.bind(null,e,a);a.then(l,l)}})}function tt(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=e,u=t,o=u;e:for(;o!==null;){switch(o.tag){case 27:if(zn(o.type)){De=o.stateNode,et=!1;break e}break;case 5:De=o.stateNode,et=!1;break e;case 3:case 4:De=o.stateNode.containerInfo,et=!0;break e}o=o.return}if(De===null)throw Error(f(160));of(i,u,l),De=null,et=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)rf(t,e),t=t.sibling}var Ct=null;function rf(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:tt(t,e),nt(e),a&4&&(vn(3,e,e.return),Sl(3,e),vn(5,e,e.return));break;case 1:tt(t,e),nt(e),a&512&&(Be||n===null||Ht(n,n.return)),a&64&&Ft&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=Ct;if(tt(t,e),nt(e),a&512&&(Be||n===null||Ht(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=e.memoizedState,n===null)if(a===null)if(e.stateNode===null){e:{a=e.type,n=e.memoizedProps,l=l.ownerDocument||l;t:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[Ja]||i[Ve]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),Je(i,a,n),i[Ve]=e,Ye(i),a=i;break e;case"link":var u=rd("link","href",l).get(a+(n.href||""));if(u){for(var o=0;o<u.length;o++)if(i=u[o],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){u.splice(o,1);break t}}i=l.createElement(a),Je(i,a,n),l.head.appendChild(i);break;case"meta":if(u=rd("meta","content",l).get(a+(n.content||""))){for(o=0;o<u.length;o++)if(i=u[o],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){u.splice(o,1);break t}}i=l.createElement(a),Je(i,a,n),l.head.appendChild(i);break;default:throw Error(f(468,a))}i[Ve]=e,Ye(i),a=i}e.stateNode=a}else fd(l,e.type,e.stateNode);else e.stateNode=sd(l,a,e.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?fd(l,e.type,e.stateNode):sd(l,a,e.memoizedProps)):a===null&&e.stateNode!==null&&qo(e,e.memoizedProps,n.memoizedProps)}break;case 27:tt(t,e),nt(e),a&512&&(Be||n===null||Ht(n,n.return)),n!==null&&a&4&&qo(e,e.memoizedProps,n.memoizedProps);break;case 5:if(tt(t,e),nt(e),a&512&&(Be||n===null||Ht(n,n.return)),e.flags&32){l=e.stateNode;try{sa(l,"")}catch(N){pe(e,e.return,N)}}a&4&&e.stateNode!=null&&(l=e.memoizedProps,qo(e,l,n!==null?n.memoizedProps:l)),a&1024&&(Bo=!0);break;case 6:if(tt(t,e),nt(e),a&4){if(e.stateNode===null)throw Error(f(162));a=e.memoizedProps,n=e.stateNode;try{n.nodeValue=a}catch(N){pe(e,e.return,N)}}break;case 3:if(Ji=null,l=Ct,Ct=Ki(t.containerInfo),tt(t,e),Ct=l,nt(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{Ya(t.containerInfo)}catch(N){pe(e,e.return,N)}Bo&&(Bo=!1,ff(e));break;case 4:a=Ct,Ct=Ki(e.stateNode.containerInfo),tt(t,e),nt(e),Ct=a;break;case 12:tt(t,e),nt(e);break;case 31:tt(t,e),nt(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Ri(e,a)));break;case 13:tt(t,e),nt(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(qi=M()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Ri(e,a)));break;case 22:l=e.memoizedState!==null;var c=n!==null&&n.memoizedState!==null,p=Ft,S=Be;if(Ft=p||l,Be=S||c,tt(t,e),Be=S,Ft=p,nt(e),a&8192)e:for(t=e.stateNode,t._visibility=l?t._visibility&-2:t._visibility|1,l&&(n===null||c||Ft||Be||Jn(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){c=n=t;try{if(i=c.stateNode,l)u=i.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{o=c.stateNode;var E=c.memoizedProps.style,g=E!=null&&E.hasOwnProperty("display")?E.display:null;o.style.display=g==null||typeof g=="boolean"?"":(""+g).trim()}}catch(N){pe(c,c.return,N)}}}else if(t.tag===6){if(n===null){c=t;try{c.stateNode.nodeValue=l?"":c.memoizedProps}catch(N){pe(c,c.return,N)}}}else if(t.tag===18){if(n===null){c=t;try{var v=c.stateNode;l?ed(v,!0):ed(c.stateNode,!1)}catch(N){pe(c,c.return,N)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=e.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Ri(e,n))));break;case 19:tt(t,e),nt(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Ri(e,a)));break;case 30:break;case 21:break;default:tt(t,e),nt(e)}}function nt(e){var t=e.flags;if(t&2){try{for(var n,a=e.return;a!==null;){if(tf(a)){n=a;break}a=a.return}if(n==null)throw Error(f(160));switch(n.tag){case 27:var l=n.stateNode,i=Ho(e);ji(e,i,l);break;case 5:var u=n.stateNode;n.flags&32&&(sa(u,""),n.flags&=-33);var o=Ho(e);ji(e,o,u);break;case 3:case 4:var c=n.stateNode.containerInfo,p=Ho(e);No(e,p,c);break;default:throw Error(f(161))}}catch(S){pe(e,e.return,S)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ff(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;ff(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function It(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)lf(e,t.alternate,t),t=t.sibling}function Jn(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:vn(4,t,t.return),Jn(t);break;case 1:Ht(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&Pr(t,t.return,n),Jn(t);break;case 27:Ol(t.stateNode);case 26:case 5:Ht(t,t.return),Jn(t);break;case 22:t.memoizedState===null&&Jn(t);break;case 30:Jn(t);break;default:Jn(t)}e=e.sibling}}function Pt(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,l=e,i=t,u=i.flags;switch(i.tag){case 0:case 11:case 15:Pt(l,i,n),Sl(4,i);break;case 1:if(Pt(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(p){pe(a,a.return,p)}if(a=i,l=a.updateQueue,l!==null){var o=a.stateNode;try{var c=l.shared.hiddenCallbacks;if(c!==null)for(l.shared.hiddenCallbacks=null,l=0;l<c.length;l++)Gs(c[l],o)}catch(p){pe(a,a.return,p)}}n&&u&64&&Ir(i),xl(i,i.return);break;case 27:nf(i);case 26:case 5:Pt(l,i,n),n&&a===null&&u&4&&ef(i),xl(i,i.return);break;case 12:Pt(l,i,n);break;case 31:Pt(l,i,n),n&&u&4&&cf(l,i);break;case 13:Pt(l,i,n),n&&u&4&&sf(l,i);break;case 22:i.memoizedState===null&&Pt(l,i,n),xl(i,i.return);break;case 30:break;default:Pt(l,i,n)}t=t.sibling}}function Lo(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ol(n))}function wo(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ol(e))}function Ot(e,t,n,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)df(e,t,n,a),t=t.sibling}function df(e,t,n,a){var l=t.flags;switch(t.tag){case 0:case 11:case 15:Ot(e,t,n,a),l&2048&&Sl(9,t);break;case 1:Ot(e,t,n,a);break;case 3:Ot(e,t,n,a),l&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ol(e)));break;case 12:if(l&2048){Ot(e,t,n,a),e=t.stateNode;try{var i=t.memoizedProps,u=i.id,o=i.onPostCommit;typeof o=="function"&&o(u,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(c){pe(t,t.return,c)}}else Ot(e,t,n,a);break;case 31:Ot(e,t,n,a);break;case 13:Ot(e,t,n,a);break;case 23:break;case 22:i=t.stateNode,u=t.alternate,t.memoizedState!==null?i._visibility&2?Ot(e,t,n,a):Tl(e,t):i._visibility&2?Ot(e,t,n,a):(i._visibility|=2,Ca(e,t,n,a,(t.subtreeFlags&10256)!==0||!1)),l&2048&&Lo(u,t);break;case 24:Ot(e,t,n,a),l&2048&&wo(t.alternate,t);break;default:Ot(e,t,n,a)}}function Ca(e,t,n,a,l){for(l=l&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var i=e,u=t,o=n,c=a,p=u.flags;switch(u.tag){case 0:case 11:case 15:Ca(i,u,o,c,l),Sl(8,u);break;case 23:break;case 22:var S=u.stateNode;u.memoizedState!==null?S._visibility&2?Ca(i,u,o,c,l):Tl(i,u):(S._visibility|=2,Ca(i,u,o,c,l)),l&&p&2048&&Lo(u.alternate,u);break;case 24:Ca(i,u,o,c,l),l&&p&2048&&wo(u.alternate,u);break;default:Ca(i,u,o,c,l)}t=t.sibling}}function Tl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,a=t,l=a.flags;switch(a.tag){case 22:Tl(n,a),l&2048&&Lo(a.alternate,a);break;case 24:Tl(n,a),l&2048&&wo(a.alternate,a);break;default:Tl(n,a)}t=t.sibling}}var Al=8192;function Oa(e,t,n){if(e.subtreeFlags&Al)for(e=e.child;e!==null;)mf(e,t,n),e=e.sibling}function mf(e,t,n){switch(e.tag){case 26:Oa(e,t,n),e.flags&Al&&e.memoizedState!==null&&Wh(n,Ct,e.memoizedState,e.memoizedProps);break;case 5:Oa(e,t,n);break;case 3:case 4:var a=Ct;Ct=Ki(e.stateNode.containerInfo),Oa(e,t,n),Ct=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=Al,Al=16777216,Oa(e,t,n),Al=a):Oa(e,t,n));break;default:Oa(e,t,n)}}function hf(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function El(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];Ge=a,gf(a,e)}hf(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)pf(e),e=e.sibling}function pf(e){switch(e.tag){case 0:case 11:case 15:El(e),e.flags&2048&&vn(9,e,e.return);break;case 3:El(e);break;case 12:El(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ui(e)):El(e);break;default:El(e)}}function Ui(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];Ge=a,gf(a,e)}hf(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:vn(8,t,t.return),Ui(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ui(t));break;default:Ui(t)}e=e.sibling}}function gf(e,t){for(;Ge!==null;){var n=Ge;switch(n.tag){case 0:case 11:case 15:vn(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:ol(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Ge=a;else e:for(n=e;Ge!==null;){a=Ge;var l=a.sibling,i=a.return;if(uf(a),a===n){Ge=null;break e}if(l!==null){l.return=i,Ge=l;break e}Ge=i}}}var rh={getCacheForType:function(e){var t=Ke(qe),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ke(qe).controller.signal}},fh=typeof WeakMap=="function"?WeakMap:Map,fe=0,Se=null,ee=null,ne=0,he=0,dt=null,bn=!1,ja=!1,Yo=!1,en=0,je=0,Sn=0,Wn=0,Go=0,mt=0,Ra=0,zl=null,at=null,Xo=!1,qi=0,yf=0,Hi=1/0,Ni=null,xn=null,we=0,Tn=null,Ua=null,tn=0,Qo=0,Vo=null,vf=null,_l=0,Zo=null;function ht(){return(fe&2)!==0&&ne!==0?ne&-ne:x.T!==null?$o():Uc()}function bf(){if(mt===0)if((ne&536870912)===0||ue){var e=Vl;Vl<<=1,(Vl&3932160)===0&&(Vl=262144),mt=e}else mt=536870912;return e=rt.current,e!==null&&(e.flags|=32),mt}function lt(e,t,n){(e===Se&&(he===2||he===9)||e.cancelPendingCommit!==null)&&(qa(e,0),An(e,ne,mt,!1)),ka(e,n),((fe&2)===0||e!==Se)&&(e===Se&&((fe&2)===0&&(Wn|=n),je===4&&An(e,ne,mt,!1)),Nt(e))}function Sf(e,t,n){if((fe&6)!==0)throw Error(f(327));var a=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Ka(e,t),l=a?hh(e,t):ko(e,t,!0),i=a;do{if(l===0){ja&&!a&&An(e,t,0,!1);break}else{if(n=e.current.alternate,i&&!dh(n)){l=ko(e,t,!1),i=!1;continue}if(l===2){if(i=t,e.errorRecoveryDisabledLanes&i)var u=0;else u=e.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){t=u;e:{var o=e;l=zl;var c=o.current.memoizedState.isDehydrated;if(c&&(qa(o,u).flags|=256),u=ko(o,u,!1),u!==2){if(Yo&&!c){o.errorRecoveryDisabledLanes|=i,Wn|=i,l=4;break e}i=at,at=l,i!==null&&(at===null?at=i:at.push.apply(at,i))}l=u}if(i=!1,l!==2)continue}}if(l===1){qa(e,0),An(e,t,0,!0);break}e:{switch(a=e,i=l,i){case 0:case 1:throw Error(f(345));case 4:if((t&4194048)!==t)break;case 6:An(a,t,mt,!bn);break e;case 2:at=null;break;case 3:case 5:break;default:throw Error(f(329))}if((t&62914560)===t&&(l=qi+300-M(),10<l)){if(An(a,t,mt,!bn),Kl(a,0,!0)!==0)break e;tn=t,a.timeoutHandle=$f(xf.bind(null,a,n,at,Ni,Xo,t,mt,Wn,Ra,bn,i,"Throttled",-0,0),l);break e}xf(a,n,at,Ni,Xo,t,mt,Wn,Ra,bn,i,null,-0,0)}}break}while(!0);Nt(e)}function xf(e,t,n,a,l,i,u,o,c,p,S,E,g,v){if(e.timeoutHandle=-1,E=t.subtreeFlags,E&8192||(E&16785408)===16785408){E={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Yt},mf(t,i,E);var N=(i&62914560)===i?qi-M():(i&4194048)===i?yf-M():0;if(N=Fh(E,N),N!==null){tn=i,e.cancelPendingCommit=N(Cf.bind(null,e,t,i,n,a,l,u,o,c,S,E,null,g,v)),An(e,i,u,!p);return}}Cf(e,t,i,n,a,l,u,o,c)}function dh(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!ct(i(),l))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function An(e,t,n,a){t&=~Go,t&=~Wn,e.suspendedLanes|=t,e.pingedLanes&=~t,a&&(e.warmLanes|=t),a=e.expirationTimes;for(var l=t;0<l;){var i=31-ot(l),u=1<<i;a[i]=-1,l&=~u}n!==0&&Oc(e,n,t)}function Bi(){return(fe&6)===0?(Ml(0),!1):!0}function Ko(){if(ee!==null){if(he===0)var e=ee.return;else e=ee,Vt=Yn=null,oo(e),Ea=null,sl=0,e=ee;for(;e!==null;)$r(e.alternate,e),e=e.return;ee=null}}function qa(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,Rh(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),tn=0,Ko(),Se=e,ee=n=Xt(e.current,null),ne=t,he=0,dt=null,bn=!1,ja=Ka(e,t),Yo=!1,Ra=mt=Go=Wn=Sn=je=0,at=zl=null,Xo=!1,(t&8)!==0&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var l=31-ot(a),i=1<<l;t|=e[l],a&=~i}return en=t,li(),n}function Tf(e,t){F=null,x.H=yl,t===Aa||t===di?(t=Bs(),he=3):t===Wu?(t=Bs(),he=4):he=t===Eo?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,dt=t,ee===null&&(je=1,_i(e,xt(t,e.current)))}function Af(){var e=rt.current;return e===null?!0:(ne&4194048)===ne?zt===null:(ne&62914560)===ne||(ne&536870912)!==0?e===zt:!1}function Ef(){var e=x.H;return x.H=yl,e===null?yl:e}function zf(){var e=x.A;return x.A=rh,e}function Li(){je=4,bn||(ne&4194048)!==ne&&rt.current!==null||(ja=!0),(Sn&134217727)===0&&(Wn&134217727)===0||Se===null||An(Se,ne,mt,!1)}function ko(e,t,n){var a=fe;fe|=2;var l=Ef(),i=zf();(Se!==e||ne!==t)&&(Ni=null,qa(e,t)),t=!1;var u=je;e:do try{if(he!==0&&ee!==null){var o=ee,c=dt;switch(he){case 8:Ko(),u=6;break e;case 3:case 2:case 9:case 6:rt.current===null&&(t=!0);var p=he;if(he=0,dt=null,Ha(e,o,c,p),n&&ja){u=0;break e}break;default:p=he,he=0,dt=null,Ha(e,o,c,p)}}mh(),u=je;break}catch(S){Tf(e,S)}while(!0);return t&&e.shellSuspendCounter++,Vt=Yn=null,fe=a,x.H=l,x.A=i,ee===null&&(Se=null,ne=0,li()),u}function mh(){for(;ee!==null;)_f(ee)}function hh(e,t){var n=fe;fe|=2;var a=Ef(),l=zf();Se!==e||ne!==t?(Ni=null,Hi=M()+500,qa(e,t)):ja=Ka(e,t);e:do try{if(he!==0&&ee!==null){t=ee;var i=dt;t:switch(he){case 1:he=0,dt=null,Ha(e,t,i,1);break;case 2:case 9:if(Hs(i)){he=0,dt=null,Mf(t);break}t=function(){he!==2&&he!==9||Se!==e||(he=7),Nt(e)},i.then(t,t);break e;case 3:he=7;break e;case 4:he=5;break e;case 7:Hs(i)?(he=0,dt=null,Mf(t)):(he=0,dt=null,Ha(e,t,i,7));break;case 5:var u=null;switch(ee.tag){case 26:u=ee.memoizedState;case 5:case 27:var o=ee;if(u?dd(u):o.stateNode.complete){he=0,dt=null;var c=o.sibling;if(c!==null)ee=c;else{var p=o.return;p!==null?(ee=p,wi(p)):ee=null}break t}}he=0,dt=null,Ha(e,t,i,5);break;case 6:he=0,dt=null,Ha(e,t,i,6);break;case 8:Ko(),je=6;break e;default:throw Error(f(462))}}ph();break}catch(S){Tf(e,S)}while(!0);return Vt=Yn=null,x.H=a,x.A=l,fe=n,ee!==null?0:(Se=null,ne=0,li(),je)}function ph(){for(;ee!==null&&!Gl();)_f(ee)}function _f(e){var t=Wr(e.alternate,e,en);e.memoizedProps=e.pendingProps,t===null?wi(e):ee=t}function Mf(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Qr(n,t,t.pendingProps,t.type,void 0,ne);break;case 11:t=Qr(n,t,t.pendingProps,t.type.render,t.ref,ne);break;case 5:oo(t);default:$r(n,t),t=ee=Es(t,en),t=Wr(n,t,en)}e.memoizedProps=e.pendingProps,t===null?wi(e):ee=t}function Ha(e,t,n,a){Vt=Yn=null,oo(t),Ea=null,sl=0;var l=t.return;try{if(ah(e,l,t,n,ne)){je=1,_i(e,xt(n,e.current)),ee=null;return}}catch(i){if(l!==null)throw ee=l,i;je=1,_i(e,xt(n,e.current)),ee=null;return}t.flags&32768?(ue||a===1?e=!0:ja||(ne&536870912)!==0?e=!1:(bn=e=!0,(a===2||a===9||a===3||a===6)&&(a=rt.current,a!==null&&a.tag===13&&(a.flags|=16384))),Df(t,e)):wi(t)}function wi(e){var t=e;do{if((t.flags&32768)!==0){Df(t,bn);return}e=t.return;var n=uh(t.alternate,t,en);if(n!==null){ee=n;return}if(t=t.sibling,t!==null){ee=t;return}ee=t=e}while(t!==null);je===0&&(je=5)}function Df(e,t){do{var n=oh(e.alternate,e);if(n!==null){n.flags&=32767,ee=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){ee=e;return}ee=e=n}while(e!==null);je=6,ee=null}function Cf(e,t,n,a,l,i,u,o,c){e.cancelPendingCommit=null;do Yi();while(we!==0);if((fe&6)!==0)throw Error(f(327));if(t!==null){if(t===e.current)throw Error(f(177));if(i=t.lanes|t.childLanes,i|=qu,Jd(e,n,i,u,o,c),e===Se&&(ee=Se=null,ne=0),Ua=t,Tn=e,tn=n,Qo=i,Vo=l,vf=a,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,bh(ln,function(){return qf(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||a){a=x.T,x.T=null,l=j.p,j.p=2,u=fe,fe|=4;try{ch(e,t,n)}finally{fe=u,j.p=l,x.T=a}}we=1,Of(),jf(),Rf()}}function Of(){if(we===1){we=0;var e=Tn,t=Ua,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=x.T,x.T=null;var a=j.p;j.p=2;var l=fe;fe|=4;try{rf(t,e);var i=ic,u=ps(e.containerInfo),o=i.focusedElem,c=i.selectionRange;if(u!==o&&o&&o.ownerDocument&&hs(o.ownerDocument.documentElement,o)){if(c!==null&&Cu(o)){var p=c.start,S=c.end;if(S===void 0&&(S=p),"selectionStart"in o)o.selectionStart=p,o.selectionEnd=Math.min(S,o.value.length);else{var E=o.ownerDocument||document,g=E&&E.defaultView||window;if(g.getSelection){var v=g.getSelection(),N=o.textContent.length,V=Math.min(c.start,N),ve=c.end===void 0?V:Math.min(c.end,N);!v.extend&&V>ve&&(u=ve,ve=V,V=u);var d=ms(o,V),s=ms(o,ve);if(d&&s&&(v.rangeCount!==1||v.anchorNode!==d.node||v.anchorOffset!==d.offset||v.focusNode!==s.node||v.focusOffset!==s.offset)){var h=E.createRange();h.setStart(d.node,d.offset),v.removeAllRanges(),V>ve?(v.addRange(h),v.extend(s.node,s.offset)):(h.setEnd(s.node,s.offset),v.addRange(h))}}}}for(E=[],v=o;v=v.parentNode;)v.nodeType===1&&E.push({element:v,left:v.scrollLeft,top:v.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<E.length;o++){var T=E[o];T.element.scrollLeft=T.left,T.element.scrollTop=T.top}}Ii=!!lc,ic=lc=null}finally{fe=l,j.p=a,x.T=n}}e.current=t,we=2}}function jf(){if(we===2){we=0;var e=Tn,t=Ua,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=x.T,x.T=null;var a=j.p;j.p=2;var l=fe;fe|=4;try{lf(e,t.alternate,t)}finally{fe=l,j.p=a,x.T=n}}we=3}}function Rf(){if(we===4||we===3){we=0,Xl();var e=Tn,t=Ua,n=tn,a=vf;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?we=5:(we=0,Ua=Tn=null,Uf(e,e.pendingLanes));var l=e.pendingLanes;if(l===0&&(xn=null),ru(n),t=t.stateNode,ut&&typeof ut.onCommitFiberRoot=="function")try{ut.onCommitFiberRoot(Za,t,void 0,(t.current.flags&128)===128)}catch{}if(a!==null){t=x.T,l=j.p,j.p=2,x.T=null;try{for(var i=e.onRecoverableError,u=0;u<a.length;u++){var o=a[u];i(o.value,{componentStack:o.stack})}}finally{x.T=t,j.p=l}}(tn&3)!==0&&Yi(),Nt(e),l=e.pendingLanes,(n&261930)!==0&&(l&42)!==0?e===Zo?_l++:(_l=0,Zo=e):_l=0,Ml(0)}}function Uf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ol(t)))}function Yi(){return Of(),jf(),Rf(),qf()}function qf(){if(we!==5)return!1;var e=Tn,t=Qo;Qo=0;var n=ru(tn),a=x.T,l=j.p;try{j.p=32>n?32:n,x.T=null,n=Vo,Vo=null;var i=Tn,u=tn;if(we=0,Ua=Tn=null,tn=0,(fe&6)!==0)throw Error(f(331));var o=fe;if(fe|=4,pf(i.current),df(i,i.current,u,n),fe=o,Ml(0,!1),ut&&typeof ut.onPostCommitFiberRoot=="function")try{ut.onPostCommitFiberRoot(Za,i)}catch{}return!0}finally{j.p=l,x.T=a,Uf(e,t)}}function Hf(e,t,n){t=xt(n,t),t=Ao(e.stateNode,t,2),e=pn(e,t,2),e!==null&&(ka(e,2),Nt(e))}function pe(e,t,n){if(e.tag===3)Hf(e,e,n);else for(;t!==null;){if(t.tag===3){Hf(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(xn===null||!xn.has(a))){e=xt(n,e),n=Hr(2),a=pn(t,n,2),a!==null&&(Nr(n,a,t,e),ka(a,2),Nt(a));break}}t=t.return}}function Jo(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new fh;var l=new Set;a.set(t,l)}else l=a.get(t),l===void 0&&(l=new Set,a.set(t,l));l.has(n)||(Yo=!0,l.add(n),e=gh.bind(null,e,t,n),t.then(e,e))}function gh(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Se===e&&(ne&n)===n&&(je===4||je===3&&(ne&62914560)===ne&&300>M()-qi?(fe&2)===0&&qa(e,0):Go|=n,Ra===ne&&(Ra=0)),Nt(e)}function Nf(e,t){t===0&&(t=Cc()),e=Bn(e,t),e!==null&&(ka(e,t),Nt(e))}function yh(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Nf(e,n)}function vh(e,t){var n=0;switch(e.tag){case 31:case 13:var a=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(f(314))}a!==null&&a.delete(t),Nf(e,n)}function bh(e,t){return ea(e,t)}var Gi=null,Na=null,Wo=!1,Xi=!1,Fo=!1,En=0;function Nt(e){e!==Na&&e.next===null&&(Na===null?Gi=Na=e:Na=Na.next=e),Xi=!0,Wo||(Wo=!0,xh())}function Ml(e,t){if(!Fo&&Xi){Fo=!0;do for(var n=!1,a=Gi;a!==null;){if(e!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var u=a.suspendedLanes,o=a.pingedLanes;i=(1<<31-ot(42|e)+1)-1,i&=l&~(u&~o),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Yf(a,i))}else i=ne,i=Kl(a,a===Se?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||Ka(a,i)||(n=!0,Yf(a,i));a=a.next}while(n);Fo=!1}}function Sh(){Bf()}function Bf(){Xi=Wo=!1;var e=0;En!==0&&jh()&&(e=En);for(var t=M(),n=null,a=Gi;a!==null;){var l=a.next,i=Lf(a,t);i===0?(a.next=null,n===null?Gi=l:n.next=l,l===null&&(Na=n)):(n=a,(e!==0||(i&3)!==0)&&(Xi=!0)),a=l}we!==0&&we!==5||Ml(e),En!==0&&(En=0)}function Lf(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var u=31-ot(i),o=1<<u,c=l[u];c===-1?((o&n)===0||(o&a)!==0)&&(l[u]=kd(o,t)):c<=t&&(e.expiredLanes|=o),i&=~o}if(t=Se,n=ne,n=Kl(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,n===0||e===t&&(he===2||he===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&ta(a),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||Ka(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(a!==null&&ta(a),ru(n)){case 2:case 8:n=na;break;case 32:n=ln;break;case 268435456:n=Va;break;default:n=ln}return a=wf.bind(null,e),n=ea(n,a),e.callbackPriority=t,e.callbackNode=n,t}return a!==null&&a!==null&&ta(a),e.callbackPriority=2,e.callbackNode=null,2}function wf(e,t){if(we!==0&&we!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Yi()&&e.callbackNode!==n)return null;var a=ne;return a=Kl(e,e===Se?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(Sf(e,a,t),Lf(e,M()),e.callbackNode!=null&&e.callbackNode===n?wf.bind(null,e):null)}function Yf(e,t){if(Yi())return null;Sf(e,t,!0)}function xh(){Uh(function(){(fe&6)!==0?ea($e,Sh):Bf()})}function $o(){if(En===0){var e=xa;e===0&&(e=Ql,Ql<<=1,(Ql&261888)===0&&(Ql=256)),En=e}return En}function Gf(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Fl(""+e)}function Xf(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function Th(e,t,n,a,l){if(t==="submit"&&n&&n.stateNode===l){var i=Gf((l[Ie]||null).action),u=a.submitter;u&&(t=(t=u[Ie]||null)?Gf(t.formAction):u.getAttribute("formAction"),t!==null&&(i=t,u=null));var o=new ei("action","action",null,a,l);e.push({event:o,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(En!==0){var c=u?Xf(l,u):new FormData(l);yo(n,{pending:!0,data:c,method:l.method,action:i},null,c)}}else typeof i=="function"&&(o.preventDefault(),c=u?Xf(l,u):new FormData(l),yo(n,{pending:!0,data:c,method:l.method,action:i},i,c))},currentTarget:l}]})}}for(var Io=0;Io<Uu.length;Io++){var Po=Uu[Io],Ah=Po.toLowerCase(),Eh=Po[0].toUpperCase()+Po.slice(1);Dt(Ah,"on"+Eh)}Dt(vs,"onAnimationEnd"),Dt(bs,"onAnimationIteration"),Dt(Ss,"onAnimationStart"),Dt("dblclick","onDoubleClick"),Dt("focusin","onFocus"),Dt("focusout","onBlur"),Dt(Ym,"onTransitionRun"),Dt(Gm,"onTransitionStart"),Dt(Xm,"onTransitionCancel"),Dt(xs,"onTransitionEnd"),oa("onMouseEnter",["mouseout","mouseover"]),oa("onMouseLeave",["mouseout","mouseover"]),oa("onPointerEnter",["pointerout","pointerover"]),oa("onPointerLeave",["pointerout","pointerover"]),Un("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Un("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Un("onBeforeInput",["compositionend","keypress","textInput","paste"]),Un("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Un("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Un("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Dl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),zh=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Dl));function Qf(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],l=a.event;a=a.listeners;e:{var i=void 0;if(t)for(var u=a.length-1;0<=u;u--){var o=a[u],c=o.instance,p=o.currentTarget;if(o=o.listener,c!==i&&l.isPropagationStopped())break e;i=o,l.currentTarget=p;try{i(l)}catch(S){ai(S)}l.currentTarget=null,i=c}else for(u=0;u<a.length;u++){if(o=a[u],c=o.instance,p=o.currentTarget,o=o.listener,c!==i&&l.isPropagationStopped())break e;i=o,l.currentTarget=p;try{i(l)}catch(S){ai(S)}l.currentTarget=null,i=c}}}}function te(e,t){var n=t[fu];n===void 0&&(n=t[fu]=new Set);var a=e+"__bubble";n.has(a)||(Vf(t,e,2,!1),n.add(a))}function ec(e,t,n){var a=0;t&&(a|=4),Vf(n,e,a,t)}var Qi="_reactListening"+Math.random().toString(36).slice(2);function tc(e){if(!e[Qi]){e[Qi]=!0,Nc.forEach(function(n){n!=="selectionchange"&&(zh.has(n)||ec(n,!1,e),ec(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Qi]||(t[Qi]=!0,ec("selectionchange",!1,t))}}function Vf(e,t,n,a){switch(bd(t)){case 2:var l=Ph;break;case 8:l=ep;break;default:l=gc}n=l.bind(null,t,n,e),l=void 0,!Su||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),a?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function nc(e,t,n,a,l){var i=a;if((t&1)===0&&(t&2)===0&&a!==null)e:for(;;){if(a===null)return;var u=a.tag;if(u===3||u===4){var o=a.stateNode.containerInfo;if(o===l)break;if(u===4)for(u=a.return;u!==null;){var c=u.tag;if((c===3||c===4)&&u.stateNode.containerInfo===l)return;u=u.return}for(;o!==null;){if(u=la(o),u===null)return;if(c=u.tag,c===5||c===6||c===26||c===27){a=i=u;continue e}o=o.parentNode}}a=a.return}Jc(function(){var p=i,S=vu(n),E=[];e:{var g=Ts.get(e);if(g!==void 0){var v=ei,N=e;switch(e){case"keypress":if(Il(n)===0)break e;case"keydown":case"keyup":v=vm;break;case"focusin":N="focus",v=Eu;break;case"focusout":N="blur",v=Eu;break;case"beforeblur":case"afterblur":v=Eu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=$c;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=um;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=xm;break;case vs:case bs:case Ss:v=sm;break;case xs:v=Am;break;case"scroll":case"scrollend":v=lm;break;case"wheel":v=zm;break;case"copy":case"cut":case"paste":v=fm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Pc;break;case"toggle":case"beforetoggle":v=Mm}var V=(t&4)!==0,ve=!V&&(e==="scroll"||e==="scrollend"),d=V?g!==null?g+"Capture":null:g;V=[];for(var s=p,h;s!==null;){var T=s;if(h=T.stateNode,T=T.tag,T!==5&&T!==26&&T!==27||h===null||d===null||(T=Fa(s,d),T!=null&&V.push(Cl(s,T,h))),ve)break;s=s.return}0<V.length&&(g=new v(g,N,null,n,S),E.push({event:g,listeners:V}))}}if((t&7)===0){e:{if(g=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",g&&n!==yu&&(N=n.relatedTarget||n.fromElement)&&(la(N)||N[aa]))break e;if((v||g)&&(g=S.window===S?S:(g=S.ownerDocument)?g.defaultView||g.parentWindow:window,v?(N=n.relatedTarget||n.toElement,v=p,N=N?la(N):null,N!==null&&(ve=H(N),V=N.tag,N!==ve||V!==5&&V!==27&&V!==6)&&(N=null)):(v=null,N=p),v!==N)){if(V=$c,T="onMouseLeave",d="onMouseEnter",s="mouse",(e==="pointerout"||e==="pointerover")&&(V=Pc,T="onPointerLeave",d="onPointerEnter",s="pointer"),ve=v==null?g:Wa(v),h=N==null?g:Wa(N),g=new V(T,s+"leave",v,n,S),g.target=ve,g.relatedTarget=h,T=null,la(S)===p&&(V=new V(d,s+"enter",N,n,S),V.target=h,V.relatedTarget=ve,T=V),ve=T,v&&N)t:{for(V=_h,d=v,s=N,h=0,T=d;T;T=V(T))h++;T=0;for(var Y=s;Y;Y=V(Y))T++;for(;0<h-T;)d=V(d),h--;for(;0<T-h;)s=V(s),T--;for(;h--;){if(d===s||s!==null&&d===s.alternate){V=d;break t}d=V(d),s=V(s)}V=null}else V=null;v!==null&&Zf(E,g,v,V,!1),N!==null&&ve!==null&&Zf(E,ve,N,V,!0)}}e:{if(g=p?Wa(p):window,v=g.nodeName&&g.nodeName.toLowerCase(),v==="select"||v==="input"&&g.type==="file")var ce=os;else if(is(g))if(cs)ce=Bm;else{ce=Hm;var B=qm}else v=g.nodeName,!v||v.toLowerCase()!=="input"||g.type!=="checkbox"&&g.type!=="radio"?p&&gu(p.elementType)&&(ce=os):ce=Nm;if(ce&&(ce=ce(e,p))){us(E,ce,n,S);break e}B&&B(e,g,p),e==="focusout"&&p&&g.type==="number"&&p.memoizedProps.value!=null&&pu(g,"number",g.value)}switch(B=p?Wa(p):window,e){case"focusin":(is(B)||B.contentEditable==="true")&&(ma=B,Ou=p,ll=null);break;case"focusout":ll=Ou=ma=null;break;case"mousedown":ju=!0;break;case"contextmenu":case"mouseup":case"dragend":ju=!1,gs(E,n,S);break;case"selectionchange":if(wm)break;case"keydown":case"keyup":gs(E,n,S)}var I;if(_u)e:{switch(e){case"compositionstart":var ae="onCompositionStart";break e;case"compositionend":ae="onCompositionEnd";break e;case"compositionupdate":ae="onCompositionUpdate";break e}ae=void 0}else da?as(e,n)&&(ae="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(ae="onCompositionStart");ae&&(es&&n.locale!=="ko"&&(da||ae!=="onCompositionStart"?ae==="onCompositionEnd"&&da&&(I=Wc()):(cn=S,xu="value"in cn?cn.value:cn.textContent,da=!0)),B=Vi(p,ae),0<B.length&&(ae=new Ic(ae,e,null,n,S),E.push({event:ae,listeners:B}),I?ae.data=I:(I=ls(n),I!==null&&(ae.data=I)))),(I=Cm?Om(e,n):jm(e,n))&&(ae=Vi(p,"onBeforeInput"),0<ae.length&&(B=new Ic("onBeforeInput","beforeinput",null,n,S),E.push({event:B,listeners:ae}),B.data=I)),Th(E,e,p,n,S)}Qf(E,t)})}function Cl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Vi(e,t){for(var n=t+"Capture",a=[];e!==null;){var l=e,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=Fa(e,n),l!=null&&a.unshift(Cl(e,l,i)),l=Fa(e,t),l!=null&&a.push(Cl(e,l,i))),e.tag===3)return a;e=e.return}return[]}function _h(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Zf(e,t,n,a,l){for(var i=t._reactName,u=[];n!==null&&n!==a;){var o=n,c=o.alternate,p=o.stateNode;if(o=o.tag,c!==null&&c===a)break;o!==5&&o!==26&&o!==27||p===null||(c=p,l?(p=Fa(n,i),p!=null&&u.unshift(Cl(n,p,c))):l||(p=Fa(n,i),p!=null&&u.push(Cl(n,p,c)))),n=n.return}u.length!==0&&e.push({event:t,listeners:u})}var Mh=/\r\n?/g,Dh=/\u0000|\uFFFD/g;function Kf(e){return(typeof e=="string"?e:""+e).replace(Mh,`
`).replace(Dh,"")}function kf(e,t){return t=Kf(t),Kf(e)===t}function ye(e,t,n,a,l,i){switch(n){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||sa(e,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&sa(e,""+a);break;case"className":Jl(e,"class",a);break;case"tabIndex":Jl(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Jl(e,n,a);break;case"style":Kc(e,a,i);break;case"data":if(t!=="object"){Jl(e,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=Fl(""+a),e.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(t!=="input"&&ye(e,t,"name",l.name,l,null),ye(e,t,"formEncType",l.formEncType,l,null),ye(e,t,"formMethod",l.formMethod,l,null),ye(e,t,"formTarget",l.formTarget,l,null)):(ye(e,t,"encType",l.encType,l,null),ye(e,t,"method",l.method,l,null),ye(e,t,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=Fl(""+a),e.setAttribute(n,a);break;case"onClick":a!=null&&(e.onclick=Yt);break;case"onScroll":a!=null&&te("scroll",e);break;case"onScrollEnd":a!=null&&te("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(f(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(f(60));e.innerHTML=n}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}n=Fl(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""+a):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":a===!0?e.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,a):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(n,a):e.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(n):e.setAttribute(n,a);break;case"popover":te("beforetoggle",e),te("toggle",e),kl(e,"popover",a);break;case"xlinkActuate":wt(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":wt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":wt(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":wt(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":wt(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":wt(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":wt(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":wt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":wt(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":kl(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=nm.get(n)||n,kl(e,n,a))}}function ac(e,t,n,a,l,i){switch(n){case"style":Kc(e,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(f(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(f(60));e.innerHTML=n}}break;case"children":typeof a=="string"?sa(e,a):(typeof a=="number"||typeof a=="bigint")&&sa(e,""+a);break;case"onScroll":a!=null&&te("scroll",e);break;case"onScrollEnd":a!=null&&te("scrollend",e);break;case"onClick":a!=null&&(e.onclick=Yt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Bc.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),t=n.slice(2,l?n.length-7:void 0),i=e[Ie]||null,i=i!=null?i[n]:null,typeof i=="function"&&e.removeEventListener(t,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,a,l);break e}n in e?e[n]=a:a===!0?e.setAttribute(n,""):kl(e,n,a)}}}function Je(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":te("error",e),te("load",e);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(f(137,t));default:ye(e,t,i,u,n,null)}}l&&ye(e,t,"srcSet",n.srcSet,n,null),a&&ye(e,t,"src",n.src,n,null);return;case"input":te("invalid",e);var o=i=u=l=null,c=null,p=null;for(a in n)if(n.hasOwnProperty(a)){var S=n[a];if(S!=null)switch(a){case"name":l=S;break;case"type":u=S;break;case"checked":c=S;break;case"defaultChecked":p=S;break;case"value":i=S;break;case"defaultValue":o=S;break;case"children":case"dangerouslySetInnerHTML":if(S!=null)throw Error(f(137,t));break;default:ye(e,t,a,S,n,null)}}Xc(e,i,o,c,p,u,l,!1);return;case"select":te("invalid",e),a=u=i=null;for(l in n)if(n.hasOwnProperty(l)&&(o=n[l],o!=null))switch(l){case"value":i=o;break;case"defaultValue":u=o;break;case"multiple":a=o;default:ye(e,t,l,o,n,null)}t=i,n=u,e.multiple=!!a,t!=null?ca(e,!!a,t,!1):n!=null&&ca(e,!!a,n,!0);return;case"textarea":te("invalid",e),i=l=a=null;for(u in n)if(n.hasOwnProperty(u)&&(o=n[u],o!=null))switch(u){case"value":a=o;break;case"defaultValue":l=o;break;case"children":i=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(f(91));break;default:ye(e,t,u,o,n,null)}Vc(e,a,l,i);return;case"option":for(c in n)if(n.hasOwnProperty(c)&&(a=n[c],a!=null))switch(c){case"selected":e.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:ye(e,t,c,a,n,null)}return;case"dialog":te("beforetoggle",e),te("toggle",e),te("cancel",e),te("close",e);break;case"iframe":case"object":te("load",e);break;case"video":case"audio":for(a=0;a<Dl.length;a++)te(Dl[a],e);break;case"image":te("error",e),te("load",e);break;case"details":te("toggle",e);break;case"embed":case"source":case"link":te("error",e),te("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(p in n)if(n.hasOwnProperty(p)&&(a=n[p],a!=null))switch(p){case"children":case"dangerouslySetInnerHTML":throw Error(f(137,t));default:ye(e,t,p,a,n,null)}return;default:if(gu(t)){for(S in n)n.hasOwnProperty(S)&&(a=n[S],a!==void 0&&ac(e,t,S,a,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(a=n[o],a!=null&&ye(e,t,o,a,n,null))}function Ch(e,t,n,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,u=null,o=null,c=null,p=null,S=null;for(v in n){var E=n[v];if(n.hasOwnProperty(v)&&E!=null)switch(v){case"checked":break;case"value":break;case"defaultValue":c=E;default:a.hasOwnProperty(v)||ye(e,t,v,null,a,E)}}for(var g in a){var v=a[g];if(E=n[g],a.hasOwnProperty(g)&&(v!=null||E!=null))switch(g){case"type":i=v;break;case"name":l=v;break;case"checked":p=v;break;case"defaultChecked":S=v;break;case"value":u=v;break;case"defaultValue":o=v;break;case"children":case"dangerouslySetInnerHTML":if(v!=null)throw Error(f(137,t));break;default:v!==E&&ye(e,t,g,v,a,E)}}hu(e,u,o,c,p,S,i,l);return;case"select":v=u=o=g=null;for(i in n)if(c=n[i],n.hasOwnProperty(i)&&c!=null)switch(i){case"value":break;case"multiple":v=c;default:a.hasOwnProperty(i)||ye(e,t,i,null,a,c)}for(l in a)if(i=a[l],c=n[l],a.hasOwnProperty(l)&&(i!=null||c!=null))switch(l){case"value":g=i;break;case"defaultValue":o=i;break;case"multiple":u=i;default:i!==c&&ye(e,t,l,i,a,c)}t=o,n=u,a=v,g!=null?ca(e,!!n,g,!1):!!a!=!!n&&(t!=null?ca(e,!!n,t,!0):ca(e,!!n,n?[]:"",!1));return;case"textarea":v=g=null;for(o in n)if(l=n[o],n.hasOwnProperty(o)&&l!=null&&!a.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:ye(e,t,o,null,a,l)}for(u in a)if(l=a[u],i=n[u],a.hasOwnProperty(u)&&(l!=null||i!=null))switch(u){case"value":g=l;break;case"defaultValue":v=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(f(91));break;default:l!==i&&ye(e,t,u,l,a,i)}Qc(e,g,v);return;case"option":for(var N in n)if(g=n[N],n.hasOwnProperty(N)&&g!=null&&!a.hasOwnProperty(N))switch(N){case"selected":e.selected=!1;break;default:ye(e,t,N,null,a,g)}for(c in a)if(g=a[c],v=n[c],a.hasOwnProperty(c)&&g!==v&&(g!=null||v!=null))switch(c){case"selected":e.selected=g&&typeof g!="function"&&typeof g!="symbol";break;default:ye(e,t,c,g,a,v)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var V in n)g=n[V],n.hasOwnProperty(V)&&g!=null&&!a.hasOwnProperty(V)&&ye(e,t,V,null,a,g);for(p in a)if(g=a[p],v=n[p],a.hasOwnProperty(p)&&g!==v&&(g!=null||v!=null))switch(p){case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(f(137,t));break;default:ye(e,t,p,g,a,v)}return;default:if(gu(t)){for(var ve in n)g=n[ve],n.hasOwnProperty(ve)&&g!==void 0&&!a.hasOwnProperty(ve)&&ac(e,t,ve,void 0,a,g);for(S in a)g=a[S],v=n[S],!a.hasOwnProperty(S)||g===v||g===void 0&&v===void 0||ac(e,t,S,g,a,v);return}}for(var d in n)g=n[d],n.hasOwnProperty(d)&&g!=null&&!a.hasOwnProperty(d)&&ye(e,t,d,null,a,g);for(E in a)g=a[E],v=n[E],!a.hasOwnProperty(E)||g===v||g==null&&v==null||ye(e,t,E,g,a,v)}function Jf(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Oh(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,u=l.initiatorType,o=l.duration;if(i&&o&&Jf(u)){for(u=0,o=l.responseEnd,a+=1;a<n.length;a++){var c=n[a],p=c.startTime;if(p>o)break;var S=c.transferSize,E=c.initiatorType;S&&Jf(E)&&(c=c.responseEnd,u+=S*(c<o?1:(o-p)/(c-p)))}if(--a,t+=8*(i+u)/(l.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var lc=null,ic=null;function Zi(e){return e.nodeType===9?e:e.ownerDocument}function Wf(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Ff(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function uc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var oc=null;function jh(){var e=window.event;return e&&e.type==="popstate"?e===oc?!1:(oc=e,!0):(oc=null,!1)}var $f=typeof setTimeout=="function"?setTimeout:void 0,Rh=typeof clearTimeout=="function"?clearTimeout:void 0,If=typeof Promise=="function"?Promise:void 0,Uh=typeof queueMicrotask=="function"?queueMicrotask:typeof If<"u"?function(e){return If.resolve(null).then(e).catch(qh)}:$f;function qh(e){setTimeout(function(){throw e})}function zn(e){return e==="head"}function Pf(e,t){var n=t,a=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){e.removeChild(l),Ya(t);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")Ol(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,Ol(n);for(var i=n.firstChild;i;){var u=i.nextSibling,o=i.nodeName;i[Ja]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=u}}else n==="body"&&Ol(e.ownerDocument.body);n=l}while(n);Ya(t)}function ed(e,t){var n=e;e=0;do{var a=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=a}while(n)}function cc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":cc(n),du(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function Hh(e,t,n,a){for(;e.nodeType===1;){var l=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[Ja])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==l.rel||e.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||e.getAttribute("title")!==(l.title==null?null:l.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(l.src==null?null:l.src)||e.getAttribute("type")!==(l.type==null?null:l.type)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=_t(e.nextSibling),e===null)break}return null}function Nh(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=_t(e.nextSibling),e===null))return null;return e}function td(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=_t(e.nextSibling),e===null))return null;return e}function sc(e){return e.data==="$?"||e.data==="$~"}function rc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Bh(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var a=function(){t(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function _t(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var fc=null;function nd(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return _t(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function ad(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function ld(e,t,n){switch(t=Zi(n),e){case"html":if(e=t.documentElement,!e)throw Error(f(452));return e;case"head":if(e=t.head,!e)throw Error(f(453));return e;case"body":if(e=t.body,!e)throw Error(f(454));return e;default:throw Error(f(451))}}function Ol(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);du(e)}var Mt=new Map,id=new Set;function Ki(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var nn=j.d;j.d={f:Lh,r:wh,D:Yh,C:Gh,L:Xh,m:Qh,X:Zh,S:Vh,M:Kh};function Lh(){var e=nn.f(),t=Bi();return e||t}function wh(e){var t=ia(e);t!==null&&t.tag===5&&t.type==="form"?xr(t):nn.r(e)}var Ba=typeof document>"u"?null:document;function ud(e,t,n){var a=Ba;if(a&&typeof t=="string"&&t){var l=bt(t);l='link[rel="'+e+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),id.has(l)||(id.add(l),e={rel:e,crossOrigin:n,href:t},a.querySelector(l)===null&&(t=a.createElement("link"),Je(t,"link",e),Ye(t),a.head.appendChild(t)))}}function Yh(e){nn.D(e),ud("dns-prefetch",e,null)}function Gh(e,t){nn.C(e,t),ud("preconnect",e,t)}function Xh(e,t,n){nn.L(e,t,n);var a=Ba;if(a&&e&&t){var l='link[rel="preload"][as="'+bt(t)+'"]';t==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+bt(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+bt(n.imageSizes)+'"]')):l+='[href="'+bt(e)+'"]';var i=l;switch(t){case"style":i=La(e);break;case"script":i=wa(e)}Mt.has(i)||(e=D({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Mt.set(i,e),a.querySelector(l)!==null||t==="style"&&a.querySelector(jl(i))||t==="script"&&a.querySelector(Rl(i))||(t=a.createElement("link"),Je(t,"link",e),Ye(t),a.head.appendChild(t)))}}function Qh(e,t){nn.m(e,t);var n=Ba;if(n&&e){var a=t&&typeof t.as=="string"?t.as:"script",l='link[rel="modulepreload"][as="'+bt(a)+'"][href="'+bt(e)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=wa(e)}if(!Mt.has(i)&&(e=D({rel:"modulepreload",href:e},t),Mt.set(i,e),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Rl(i)))return}a=n.createElement("link"),Je(a,"link",e),Ye(a),n.head.appendChild(a)}}}function Vh(e,t,n){nn.S(e,t,n);var a=Ba;if(a&&e){var l=ua(a).hoistableStyles,i=La(e);t=t||"default";var u=l.get(i);if(!u){var o={loading:0,preload:null};if(u=a.querySelector(jl(i)))o.loading=5;else{e=D({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Mt.get(i))&&dc(e,n);var c=u=a.createElement("link");Ye(c),Je(c,"link",e),c._p=new Promise(function(p,S){c.onload=p,c.onerror=S}),c.addEventListener("load",function(){o.loading|=1}),c.addEventListener("error",function(){o.loading|=2}),o.loading|=4,ki(u,t,a)}u={type:"stylesheet",instance:u,count:1,state:o},l.set(i,u)}}}function Zh(e,t){nn.X(e,t);var n=Ba;if(n&&e){var a=ua(n).hoistableScripts,l=wa(e),i=a.get(l);i||(i=n.querySelector(Rl(l)),i||(e=D({src:e,async:!0},t),(t=Mt.get(l))&&mc(e,t),i=n.createElement("script"),Ye(i),Je(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Kh(e,t){nn.M(e,t);var n=Ba;if(n&&e){var a=ua(n).hoistableScripts,l=wa(e),i=a.get(l);i||(i=n.querySelector(Rl(l)),i||(e=D({src:e,async:!0,type:"module"},t),(t=Mt.get(l))&&mc(e,t),i=n.createElement("script"),Ye(i),Je(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function od(e,t,n,a){var l=(l=$.current)?Ki(l):null;if(!l)throw Error(f(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=La(n.href),n=ua(l).hoistableStyles,a=n.get(t),a||(a={type:"style",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=La(n.href);var i=ua(l).hoistableStyles,u=i.get(e);if(u||(l=l.ownerDocument||l,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,u),(i=l.querySelector(jl(e)))&&!i._p&&(u.instance=i,u.state.loading=5),Mt.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Mt.set(e,n),i||kh(l,e,n,u.state))),t&&a===null)throw Error(f(528,""));return u}if(t&&a!==null)throw Error(f(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=wa(n),n=ua(l).hoistableScripts,a=n.get(t),a||(a={type:"script",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(f(444,e))}}function La(e){return'href="'+bt(e)+'"'}function jl(e){return'link[rel="stylesheet"]['+e+"]"}function cd(e){return D({},e,{"data-precedence":e.precedence,precedence:null})}function kh(e,t,n,a){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=e.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),Je(t,"link",n),Ye(t),e.head.appendChild(t))}function wa(e){return'[src="'+bt(e)+'"]'}function Rl(e){return"script[async]"+e}function sd(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var a=e.querySelector('style[data-href~="'+bt(n.href)+'"]');if(a)return t.instance=a,Ye(a),a;var l=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),Ye(a),Je(a,"style",l),ki(a,n.precedence,e),t.instance=a;case"stylesheet":l=La(n.href);var i=e.querySelector(jl(l));if(i)return t.state.loading|=4,t.instance=i,Ye(i),i;a=cd(n),(l=Mt.get(l))&&dc(a,l),i=(e.ownerDocument||e).createElement("link"),Ye(i);var u=i;return u._p=new Promise(function(o,c){u.onload=o,u.onerror=c}),Je(i,"link",a),t.state.loading|=4,ki(i,n.precedence,e),t.instance=i;case"script":return i=wa(n.src),(l=e.querySelector(Rl(i)))?(t.instance=l,Ye(l),l):(a=n,(l=Mt.get(i))&&(a=D({},n),mc(a,l)),e=e.ownerDocument||e,l=e.createElement("script"),Ye(l),Je(l,"link",a),e.head.appendChild(l),t.instance=l);case"void":return null;default:throw Error(f(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(a=t.instance,t.state.loading|=4,ki(a,n.precedence,e));return t.instance}function ki(e,t,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,u=0;u<a.length;u++){var o=a[u];if(o.dataset.precedence===t)i=o;else if(i!==l)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function dc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function mc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Ji=null;function rd(e,t,n){if(Ji===null){var a=new Map,l=Ji=new Map;l.set(n,a)}else l=Ji,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(e))return a;for(a.set(e,null),n=n.getElementsByTagName(e),l=0;l<n.length;l++){var i=n[l];if(!(i[Ja]||i[Ve]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var u=i.getAttribute(t)||"";u=e+u;var o=a.get(u);o?o.push(i):a.set(u,[i])}}return a}function fd(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function Jh(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function dd(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Wh(e,t,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=La(a.href),i=t.querySelector(jl(l));if(i){t=i._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Wi.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=i,Ye(i);return}i=t.ownerDocument||t,a=cd(a),(l=Mt.get(l))&&dc(a,l),i=i.createElement("link"),Ye(i);var u=i;u._p=new Promise(function(o,c){u.onload=o,u.onerror=c}),Je(i,"link",a),n.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=Wi.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var hc=0;function Fh(e,t){return e.stylesheets&&e.count===0&&$i(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var a=setTimeout(function(){if(e.stylesheets&&$i(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+t);0<e.imgBytes&&hc===0&&(hc=62500*Oh());var l=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&$i(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>hc?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function Wi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)$i(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Fi=null;function $i(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Fi=new Map,t.forEach($h,e),Fi=null,Wi.call(e))}function $h(e,t){if(!(t.state.loading&4)){var n=Fi.get(e);if(n)var a=n.get(null);else{n=new Map,Fi.set(e,n);for(var l=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var u=l[i];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(n.set(u.dataset.precedence,u),a=u)}a&&n.set(null,a)}l=t.instance,u=l.getAttribute("data-precedence"),i=n.get(u)||a,i===a&&n.set(null,l),n.set(u,l),this.count++,a=Wi.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(l,e.firstChild)),t.state.loading|=4}}var Ul={$$typeof:Ae,Provider:null,Consumer:null,_currentValue:Q,_currentValue2:Q,_threadCount:0};function Ih(e,t,n,a,l,i,u,o,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=cu(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=cu(0),this.hiddenUpdates=cu(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function md(e,t,n,a,l,i,u,o,c,p,S,E){return e=new Ih(e,t,n,u,c,p,S,E,o),t=1,i===!0&&(t|=24),i=st(3,null,null,t),e.current=i,i.stateNode=e,t=Ku(),t.refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:t},Fu(i),e}function hd(e){return e?(e=ga,e):ga}function pd(e,t,n,a,l,i){l=hd(l),a.context===null?a.context=l:a.pendingContext=l,a=hn(t),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=pn(e,a,t),n!==null&&(lt(n,e,t),fl(n,e,t))}function gd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function pc(e,t){gd(e,t),(e=e.alternate)&&gd(e,t)}function yd(e){if(e.tag===13||e.tag===31){var t=Bn(e,67108864);t!==null&&lt(t,e,67108864),pc(e,67108864)}}function vd(e){if(e.tag===13||e.tag===31){var t=ht();t=su(t);var n=Bn(e,t);n!==null&&lt(n,e,t),pc(e,t)}}var Ii=!0;function Ph(e,t,n,a){var l=x.T;x.T=null;var i=j.p;try{j.p=2,gc(e,t,n,a)}finally{j.p=i,x.T=l}}function ep(e,t,n,a){var l=x.T;x.T=null;var i=j.p;try{j.p=8,gc(e,t,n,a)}finally{j.p=i,x.T=l}}function gc(e,t,n,a){if(Ii){var l=yc(a);if(l===null)nc(e,t,a,Pi,n),Sd(e,a);else if(np(l,e,t,n,a))a.stopPropagation();else if(Sd(e,a),t&4&&-1<tp.indexOf(e)){for(;l!==null;){var i=ia(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var u=Rn(i.pendingLanes);if(u!==0){var o=i;for(o.pendingLanes|=2,o.entangledLanes|=2;u;){var c=1<<31-ot(u);o.entanglements[1]|=c,u&=~c}Nt(i),(fe&6)===0&&(Hi=M()+500,Ml(0))}}break;case 31:case 13:o=Bn(i,2),o!==null&&lt(o,i,2),Bi(),pc(i,2)}if(i=yc(a),i===null&&nc(e,t,a,Pi,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else nc(e,t,a,null,n)}}function yc(e){return e=vu(e),vc(e)}var Pi=null;function vc(e){if(Pi=null,e=la(e),e!==null){var t=H(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=w(t),e!==null)return e;e=null}else if(n===31){if(e=G(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Pi=e,null}function bd(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(me()){case $e:return 2;case na:return 8;case ln:case ou:return 32;case Va:return 268435456;default:return 32}default:return 32}}var bc=!1,_n=null,Mn=null,Dn=null,ql=new Map,Hl=new Map,Cn=[],tp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Sd(e,t){switch(e){case"focusin":case"focusout":_n=null;break;case"dragenter":case"dragleave":Mn=null;break;case"mouseover":case"mouseout":Dn=null;break;case"pointerover":case"pointerout":ql.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Hl.delete(t.pointerId)}}function Nl(e,t,n,a,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},t!==null&&(t=ia(t),t!==null&&yd(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function np(e,t,n,a,l){switch(t){case"focusin":return _n=Nl(_n,e,t,n,a,l),!0;case"dragenter":return Mn=Nl(Mn,e,t,n,a,l),!0;case"mouseover":return Dn=Nl(Dn,e,t,n,a,l),!0;case"pointerover":var i=l.pointerId;return ql.set(i,Nl(ql.get(i)||null,e,t,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,Hl.set(i,Nl(Hl.get(i)||null,e,t,n,a,l)),!0}return!1}function xd(e){var t=la(e.target);if(t!==null){var n=H(t);if(n!==null){if(t=n.tag,t===13){if(t=w(n),t!==null){e.blockedOn=t,qc(e.priority,function(){vd(n)});return}}else if(t===31){if(t=G(n),t!==null){e.blockedOn=t,qc(e.priority,function(){vd(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function eu(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=yc(e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);yu=a,n.target.dispatchEvent(a),yu=null}else return t=ia(n),t!==null&&yd(t),e.blockedOn=n,!1;t.shift()}return!0}function Td(e,t,n){eu(e)&&n.delete(t)}function ap(){bc=!1,_n!==null&&eu(_n)&&(_n=null),Mn!==null&&eu(Mn)&&(Mn=null),Dn!==null&&eu(Dn)&&(Dn=null),ql.forEach(Td),Hl.forEach(Td)}function tu(e,t){e.blockedOn===t&&(e.blockedOn=null,bc||(bc=!0,b.unstable_scheduleCallback(b.unstable_NormalPriority,ap)))}var nu=null;function Ad(e){nu!==e&&(nu=e,b.unstable_scheduleCallback(b.unstable_NormalPriority,function(){nu===e&&(nu=null);for(var t=0;t<e.length;t+=3){var n=e[t],a=e[t+1],l=e[t+2];if(typeof a!="function"){if(vc(a||n)===null)continue;break}var i=ia(n);i!==null&&(e.splice(t,3),t-=3,yo(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function Ya(e){function t(c){return tu(c,e)}_n!==null&&tu(_n,e),Mn!==null&&tu(Mn,e),Dn!==null&&tu(Dn,e),ql.forEach(t),Hl.forEach(t);for(var n=0;n<Cn.length;n++){var a=Cn[n];a.blockedOn===e&&(a.blockedOn=null)}for(;0<Cn.length&&(n=Cn[0],n.blockedOn===null);)xd(n),n.blockedOn===null&&Cn.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],u=l[Ie]||null;if(typeof i=="function")u||Ad(n);else if(u){var o=null;if(i&&i.hasAttribute("formAction")){if(l=i,u=i[Ie]||null)o=u.formAction;else if(vc(l)!==null)continue}else o=u.action;typeof o=="function"?n[a+1]=o:(n.splice(a,3),a-=3),Ad(n)}}}function Ed(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(u){return l=u})},focusReset:"manual",scroll:"manual"})}function t(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),l!==null&&(l(),l=null)}}}function Sc(e){this._internalRoot=e}au.prototype.render=Sc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(f(409));var n=t.current,a=ht();pd(n,a,e,t,null,null)},au.prototype.unmount=Sc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;pd(e.current,2,null,e,null,null),Bi(),t[aa]=null}};function au(e){this._internalRoot=e}au.prototype.unstable_scheduleHydration=function(e){if(e){var t=Uc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Cn.length&&t!==0&&t<Cn[n].priority;n++);Cn.splice(n,0,e),n===0&&xd(e)}};var zd=O.version;if(zd!=="19.2.4")throw Error(f(527,zd,"19.2.4"));j.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(f(188)):(e=Object.keys(e).join(","),Error(f(268,e)));return e=y(t),e=e!==null?U(e):null,e=e===null?null:e.stateNode,e};var lp={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:x,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var lu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!lu.isDisabled&&lu.supportsFiber)try{Za=lu.inject(lp),ut=lu}catch{}}return Ll.createRoot=function(e,t){if(!R(e))throw Error(f(299));var n=!1,a="",l=jr,i=Rr,u=Ur;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(u=t.onRecoverableError)),t=md(e,1,!1,null,null,n,a,null,l,i,u,Ed),e[aa]=t.current,tc(e),new Sc(t)},Ll.hydrateRoot=function(e,t,n){if(!R(e))throw Error(f(299));var a=!1,l="",i=jr,u=Rr,o=Ur,c=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(c=n.formState)),t=md(e,1,!0,t,n??null,a,l,c,i,u,o,Ed),t.context=hd(null),n=t.current,a=ht(),a=su(a),l=hn(a),l.callback=null,pn(n,l,a),n=a,t.current.lanes=n,ka(t,n),Nt(t),e[aa]=t.current,tc(e),new au(t)},Ll.version="19.2.4",Ll}var Hd;function gp(){if(Hd)return Ac.exports;Hd=1;function b(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(b)}catch(O){console.error(O)}}return b(),Ac.exports=pp(),Ac.exports}var yp=gp();const vp="modulepreload",bp=function(b){return"/docs/"+b},Nd={},xe=function(O,z,f){let R=Promise.resolve();if(z&&z.length>0){let w=function(y){return Promise.all(y.map(U=>Promise.resolve(U).then(D=>({status:"fulfilled",value:D}),D=>({status:"rejected",reason:D}))))};document.getElementsByTagName("link");const G=document.querySelector("meta[property=csp-nonce]"),_=(G==null?void 0:G.nonce)||(G==null?void 0:G.getAttribute("nonce"));R=w(z.map(y=>{if(y=bp(y),y in Nd)return;Nd[y]=!0;const U=y.endsWith(".css"),D=U?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${D}`))return;const X=document.createElement("link");if(X.rel=U?"stylesheet":vp,U||(X.as="script"),X.crossOrigin="",X.href=y,_&&X.setAttribute("nonce",_),document.head.appendChild(X),U)return new Promise((le,be)=>{X.addEventListener("load",le),X.addEventListener("error",()=>be(new Error(`Unable to preload CSS for ${y}`)))})}))}function H(w){const G=new Event("vite:preloadError",{cancelable:!0});if(G.payload=w,window.dispatchEvent(G),!G.defaultPrevented)throw w}return R.then(w=>{for(const G of w||[])G.status==="rejected"&&H(G.reason);return O().catch(H)})},iu={amber:{dark:{bg:"#09090b",sf:"#111114",sfH:"#18181c",bd:"#1e1e24",tx:"#e4e4e7",tx2:"#a1a1aa",txM:"#919199",ac:"#e8a845",acD:"rgba(232,168,69,0.12)",acT:"#fbbf24",cdBg:"#0c0c0f",cdTx:"#c4c4cc",sbBg:"#0c0c0e",hdBg:"rgba(9,9,11,0.85)"},light:{bg:"#fafaf9",sf:"#ffffff",sfH:"#f5f5f4",bd:"#e7e5e4",tx:"#1c1917",tx2:"#57534e",txM:"#706b66",ac:"#96640a",acD:"rgba(150,100,10,0.08)",acT:"#7a5208",cdBg:"#f5f3f0",cdTx:"#2c2520",sbBg:"#f5f5f3",hdBg:"rgba(250,250,249,0.85)"},fonts:{heading:"Instrument Serif",body:"DM Sans",code:"JetBrains Mono"}},editorial:{dark:{bg:"#080c1f",sf:"#0e1333",sfH:"#141940",bd:"#1a2050",tx:"#e8e6f0",tx2:"#b5b1c8",txM:"#9490ae",ac:"#ff6b4a",acD:"rgba(255,107,74,0.1)",acT:"#ff8a70",cdBg:"#0a0e27",cdTx:"#b8b4cc",sbBg:"#0a0e27",hdBg:"rgba(8,12,31,0.9)"},light:{bg:"#f6f4f0",sf:"#ffffff",sfH:"#eeece6",bd:"#ddd9d0",tx:"#1a1716",tx2:"#4a443e",txM:"#706960",ac:"#b83d22",acD:"rgba(184,61,34,0.07)",acT:"#9c3019",cdBg:"#edeae4",cdTx:"#3a3530",sbBg:"#f0ede8",hdBg:"rgba(246,244,240,0.92)"},fonts:{heading:"Cormorant Garamond",body:"Bricolage Grotesque",code:"Fira Code"}}},Sp=()=>m.jsx("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:m.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),xp=()=>m.jsx("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:m.jsx("path",{d:"M18 6L6 18M6 6l12 12"})}),Tp=()=>m.jsx("svg",{width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:m.jsx("path",{d:"M22 2L11 13M22 2l-7 20-4-9-9-4z"})});function Yd(b){let O="You are a helpful documentation assistant. Answer questions accurately based on the documentation provided below. If the answer isn't in the documentation, say so clearly. Keep answers concise and reference specific sections when possible.";if(b){const z=b.length>1e5?b.slice(0,1e5)+`

[Documentation truncated...]`:b;O+=`

Documentation:
${z}`}return O}async function Ap(b,O,z,f){var w,G,_;const R=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${O}`},body:JSON.stringify({model:z,messages:[{role:"system",content:Yd(f)},...b.map(y=>({role:y.role,content:y.content}))]})});if(!R.ok){const y=await R.text();throw new Error(`OpenAI API error (${R.status}): ${y}`)}return((_=(G=(w=(await R.json()).choices)==null?void 0:w[0])==null?void 0:G.message)==null?void 0:_.content)||"No response."}async function Ep(b,O,z,f){var w,G;const R=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":O,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:z,max_tokens:1024,system:Yd(f),messages:b.map(_=>({role:_.role,content:_.content}))})});if(!R.ok){const _=await R.text();throw new Error(`Anthropic API error (${R.status}): ${_}`)}return((G=(w=(await R.json()).content)==null?void 0:w[0])==null?void 0:G.text)||"No response."}function zp(b){return b==="openai"?"gpt-4o-mini":"claude-sonnet-4-20250514"}function _p({provider:b,model:O,apiKey:z,context:f}){const[R,H]=Z.useState(!1),[w,G]=Z.useState([]),[_,y]=Z.useState(""),[U,D]=Z.useState(!1),[X,le]=Z.useState(null),be=Z.useRef(null),_e=Z.useRef(null),L=z||(typeof window<"u"?window.__TOME_AI_KEY__:void 0),ie=O||zp(b);Z.useEffect(()=>{var P;(P=be.current)==null||P.scrollIntoView({behavior:"smooth"})},[w]),Z.useEffect(()=>{R&&setTimeout(()=>{var P;return(P=_e.current)==null?void 0:P.focus()},100)},[R]);const Te=Z.useCallback(async()=>{const P=_.trim();if(!P||U||!L)return;const Le={role:"user",content:P},de=[...w,Le];G(de),y(""),D(!0),le(null);try{let k;b==="openai"?k=await Ap(de,L,ie,f):k=await Ep(de,L,ie,f),G(Ce=>[...Ce,{role:"assistant",content:k}])}catch(k){le(k instanceof Error?k.message:"Failed to get response")}finally{D(!1)}},[_,U,w,b,L,ie,f]),Ae=Z.useCallback(P=>{P.key==="Enter"&&!P.shiftKey&&(P.preventDefault(),Te())},[Te]);return R?m.jsxs("div",{"data-testid":"ai-chat-panel",style:{position:"fixed",bottom:24,right:24,zIndex:900,width:380,maxWidth:"calc(100vw - 48px)",height:520,maxHeight:"calc(100vh - 48px)",background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,boxShadow:"0 16px 64px rgba(0,0,0,0.3)",display:"flex",flexDirection:"column",overflow:"hidden",fontFamily:"var(--font-body)"},children:[m.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderBottom:"1px solid var(--bd)",flexShrink:0},children:[m.jsx("span",{style:{fontSize:14,fontWeight:600,color:"var(--tx)"},children:"Ask AI"}),m.jsx("button",{"data-testid":"ai-chat-close",onClick:()=>H(!1),"aria-label":"Close AI chat",style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex",padding:4},children:m.jsx(xp,{})})]}),m.jsxs("div",{style:{flex:1,overflow:"auto",padding:"12px 16px"},children:[!L&&m.jsxs("div",{"data-testid":"ai-chat-no-key",style:{textAlign:"center",color:"var(--txM)",fontSize:13,padding:"24px 8px",lineHeight:1.6},children:[m.jsx("p",{style:{marginBottom:8,fontWeight:500,color:"var(--tx)"},children:"AI not configured"}),m.jsxs("p",{style:{marginBottom:8},children:["To enable AI chat, set the ",m.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"apiKeyEnv"})," in ",m.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"tome.config.js"})," and provide the environment variable at build time."]}),m.jsxs("p",{style:{fontSize:11.5,color:"var(--txM)"},children:["Example: ",m.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"TOME_AI_KEY=sk-... tome build"})]})]}),w.map((P,Le)=>m.jsx("div",{"data-testid":`ai-chat-message-${P.role}`,style:{marginBottom:12,display:"flex",justifyContent:P.role==="user"?"flex-end":"flex-start"},children:m.jsx("div",{style:{maxWidth:"85%",padding:"8px 12px",borderRadius:10,fontSize:13,lineHeight:1.55,whiteSpace:"pre-wrap",wordBreak:"break-word",background:P.role==="user"?"var(--ac)":"var(--cdBg)",color:P.role==="user"?"#fff":"var(--tx)"},children:P.content})},Le)),U&&m.jsx("div",{"data-testid":"ai-chat-loading",style:{display:"flex",justifyContent:"flex-start",marginBottom:12},children:m.jsx("div",{style:{padding:"8px 12px",borderRadius:10,fontSize:13,background:"var(--cdBg)",color:"var(--txM)"},children:"Thinking..."})}),X&&m.jsx("div",{"data-testid":"ai-chat-error",style:{padding:"8px 12px",borderRadius:8,fontSize:12,background:"rgba(220,50,50,0.1)",color:"#d44",marginBottom:12},children:X}),m.jsx("div",{ref:be})]}),m.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderTop:"1px solid var(--bd)",flexShrink:0},children:[m.jsx("input",{ref:_e,"data-testid":"ai-chat-input",value:_,onChange:P=>y(P.target.value),onKeyDown:Ae,placeholder:L?"Ask a question...":"API key required",disabled:!L,style:{flex:1,background:"var(--cdBg)",border:"1px solid var(--bd)",borderRadius:8,padding:"8px 12px",color:"var(--tx)",fontSize:13,fontFamily:"var(--font-body)",outline:"none"}}),m.jsx("button",{"data-testid":"ai-chat-send",onClick:Te,disabled:!L||!_.trim()||U,"aria-label":"Send message",style:{width:34,height:34,borderRadius:8,background:L&&_.trim()?"var(--ac)":"var(--cdBg)",color:L&&_.trim()?"#fff":"var(--txM)",border:"none",cursor:L&&_.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:m.jsx(Tp,{})})]})]}):m.jsx("button",{"data-testid":"ai-chat-button",onClick:()=>H(!0),"aria-label":"Open AI chat",style:{position:"fixed",bottom:24,right:24,zIndex:900,width:48,height:48,borderRadius:"50%",background:"var(--ac)",color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(0,0,0,0.25)",transition:"transform 0.15s"},children:m.jsx(Sp,{})})}function Mp(b){const O=/^#([0-9a-f]{6})$/i.exec(b.trim());if(!O)return null;const z=parseInt(O[1],16);return[z>>16&255,z>>8&255,z&255]}function Dp(b,O){const z=Mp(b);if(!z)return null;const[f,R,H]=z,w=`rgba(${f},${R},${H},${O?.12:.08})`,G=O?1.15:.85,_=Math.min(255,Math.round(f*G)),y=Math.min(255,Math.round(R*G)),U=Math.min(255,Math.round(H*G)),D=`rgb(${_},${y},${U})`;return{ac:b,acD:w,acT:D}}const jt=({d:b,size:O=16})=>m.jsx("svg",{width:O,height:O,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:m.jsx("path",{d:b})}),Gd=()=>m.jsx(jt,{d:"M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3"}),Bd=()=>m.jsx(jt,{d:"M9 18l6-6-6-6",size:14}),Mc=()=>m.jsx(jt,{d:"M6 9l6 6 6-6",size:14}),Cp=()=>m.jsx(jt,{d:"M3 12h18M3 6h18M3 18h18",size:20}),Op=()=>m.jsx(jt,{d:"M18 6L6 18M6 6l12 12",size:18}),jp=()=>m.jsx(jt,{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"}),Rp=()=>m.jsx(jt,{d:"M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"}),Up=()=>m.jsx(jt,{d:"M19 12H5M12 19l-7-7 7-7",size:14}),qp=()=>m.jsx(jt,{d:"M5 12h14M12 5l7 7-7 7",size:14});let Ga=null;const Hp="/_pagefind/pagefind.js";async function Np(){if(Ga)return Ga;try{return Ga=await import(Hp),await Ga.init(),Ga}catch{return null}}let uu=null;function Bp(){return uu||(uu=xe(()=>import("./index-Cm9Y2rNs.js"),[]).catch(()=>null),uu)}function Lp({appId:b,apiKey:O,indexName:z,onNavigate:f,onClose:R}){const[H,w]=Z.useState(null),[G,_]=Z.useState(!1);Z.useEffect(()=>{Bp().then(U=>{U&&U.DocSearch?w(()=>U.DocSearch):U&&U.default?w(()=>U.default):_(!0)})},[]);const y=Z.useCallback(U=>{try{return new URL(U,"http://localhost").pathname.replace(/^\//,"").replace(/\/index\.html$/,"").replace(/\.html$/,"")||"index"}catch{return"index"}},[]);return G?m.jsx("div",{onClick:R,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"12vh"},children:m.jsx("div",{onClick:U=>U.stopPropagation(),style:{background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,width:"100%",maxWidth:520,boxShadow:"0 24px 80px rgba(0,0,0,0.4)",padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"Algolia DocSearch is not available. Install @docsearch/react to enable it."})}):H?m.jsx("div",{"data-testid":"algolia-search-modal",children:m.jsx(H,{appId:b,apiKey:O,indexName:z,navigator:{navigate({itemUrl:U}){const D=y(U);f(D)}},hitComponent:({hit:U,children:D})=>m.jsx("a",{href:U.url,onClick:X=>{X.preventDefault();const le=y(U.url);f(le)},children:D})})}):m.jsx("div",{onClick:R,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"12vh"},children:m.jsx("div",{style:{background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,width:"100%",maxWidth:520,boxShadow:"0 24px 80px rgba(0,0,0,0.4)",padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"Loading search..."})})}const wp=()=>m.jsx(jt,{d:"M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",size:14}),Yp=()=>m.jsx(jt,{d:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z",size:14});function Gp({config:b,navigation:O,currentPageId:z,pageHtml:f,pageComponent:R,mdxComponents:H,pageTitle:w,pageDescription:G,headings:_,onNavigate:y,allPages:U,versioning:D,currentVersion:X,i18n:le,currentLocale:be,docContext:_e}){var an,jn,Fn,Xa,Rt,$n,In,Yl,Qa,Pn,ea,ta,Gl,Xl;const L=((an=b.theme)==null?void 0:an.mode)||"auto",[ie,Te]=Z.useState(()=>{var M;return L==="dark"?!0:L==="light"?!1:((M=window.matchMedia)==null?void 0:M.call(window,"(prefers-color-scheme: dark)").matches)??!0}),[Ae,P]=Z.useState(!0),[Le,de]=Z.useState(!1),[k,Ce]=Z.useState(!1),[pt,Bt]=Z.useState(!1),gt=D&&X&&X!==D.current,[Xe,Lt]=Z.useState(O.map(M=>M.section)),yt=Z.useRef(null),[it,x]=Z.useState(!0),j=((jn=b.theme)==null?void 0:jn.preset)||"amber",Q=((Fn=iu[j])==null?void 0:Fn[ie?"dark":"light"])||iu.amber.dark,re=(Xa=b.theme)!=null&&Xa.accent?Dp(b.theme.accent,ie):null,W=re?{...Q,...re}:Q,r=((Rt=iu[j])==null?void 0:Rt.fonts)||iu.amber.fonts,A={heading:((In=($n=b.theme)==null?void 0:$n.fonts)==null?void 0:In.heading)||r.heading,body:((Qa=(Yl=b.theme)==null?void 0:Yl.fonts)==null?void 0:Qa.body)||r.body,code:((ea=(Pn=b.theme)==null?void 0:Pn.fonts)==null?void 0:ea.code)||r.code};Z.useEffect(()=>{if(L!=="auto")return;const M=window.matchMedia("(prefers-color-scheme: dark)"),me=$e=>Te($e.matches);return M.addEventListener("change",me),()=>M.removeEventListener("change",me)},[L]),Z.useEffect(()=>{const M=()=>x(window.innerWidth>1100);return M(),window.addEventListener("resize",M),()=>window.removeEventListener("resize",M)},[]),Z.useEffect(()=>{var M;(M=yt.current)==null||M.scrollTo(0,0)},[z]),Z.useEffect(()=>{const M=me=>{(me.metaKey||me.ctrlKey)&&me.key==="k"&&(me.preventDefault(),de(!0)),me.key==="Escape"&&de(!1)};return window.addEventListener("keydown",M),()=>window.removeEventListener("keydown",M)},[]);const C=O.flatMap(M=>M.pages),q=C.findIndex(M=>M.id===z),K=q>0?C[q-1]:null,$=q<C.length-1?C[q+1]:null,oe=M=>Lt(me=>me.includes(M)?me.filter($e=>$e!==M):[...me,M]),Qe={"--bg":W.bg,"--sf":W.sf,"--sfH":W.sfH,"--bd":W.bd,"--tx":W.tx,"--tx2":W.tx2,"--txM":W.txM,"--ac":W.ac,"--acD":W.acD,"--acT":W.acT,"--cdBg":W.cdBg,"--cdTx":W.cdTx,"--sbBg":W.sbBg,"--hdBg":W.hdBg,"--font-heading":`"${A.heading}", serif`,"--font-body":`"${A.body}", sans-serif`,"--font-code":`"${A.code}", monospace`},Me=R;return m.jsxs("div",{className:"tome-grain",style:{...Qe,color:"var(--tx)",background:"var(--bg)",fontFamily:"var(--font-body)",minHeight:"100vh"},children:[Le&&((ta=b.search)==null?void 0:ta.provider)==="algolia"&&b.search.appId&&b.search.apiKey&&b.search.indexName?m.jsx(Lp,{appId:b.search.appId,apiKey:b.search.apiKey,indexName:b.search.indexName,onNavigate:M=>{y(M),de(!1)},onClose:()=>de(!1)}):Le?m.jsx(Xp,{allPages:U,onNavigate:M=>{y(M),de(!1)},onClose:()=>de(!1)}):null,m.jsxs("div",{style:{display:"flex",height:"100vh"},children:[m.jsxs("aside",{style:{width:Ae?270:0,minWidth:Ae?270:0,background:"var(--sbBg)",borderRight:"1px solid var(--bd)",display:"flex",flexDirection:"column",transition:"width .2s, min-width .2s",overflow:"hidden"},children:[m.jsxs("div",{style:{padding:"18px 20px",display:"flex",alignItems:"baseline",gap:6,borderBottom:"1px solid var(--bd)"},children:[m.jsx("span",{style:{fontFamily:"var(--font-heading)",fontSize:22,fontWeight:700,fontStyle:"italic"},children:b.name}),m.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:"var(--ac)",display:"inline-block"}})]}),m.jsx("div",{style:{padding:"12px 14px"},children:m.jsxs("button",{onClick:()=>de(!0),style:{display:"flex",alignItems:"center",gap:8,width:"100%",background:"var(--cdBg)",border:"1px solid var(--bd)",borderRadius:2,padding:"8px 12px",cursor:"pointer",color:"var(--txM)",fontSize:12.5,fontFamily:"var(--font-body)"},children:[m.jsx(Gd,{}),m.jsx("span",{style:{flex:1,textAlign:"left"},children:"Search..."}),m.jsx("kbd",{style:{fontFamily:"var(--font-code)",fontSize:9,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"2px 6px"},children:"⌘K"})]})}),m.jsx("nav",{style:{flex:1,overflow:"auto",padding:"4px 10px 20px"},children:O.map(M=>m.jsxs("div",{style:{marginBottom:8},children:[m.jsxs("button",{onClick:()=>oe(M.section),style:{display:"flex",alignItems:"center",gap:6,width:"100%",background:"none",border:"none",padding:"8px 10px",cursor:"pointer",borderRadius:2,color:"var(--txM)",fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",fontFamily:"var(--font-code)"},children:[Xe.includes(M.section)?m.jsx(Mc,{}):m.jsx(Bd,{}),M.section]}),Xe.includes(M.section)&&m.jsx("div",{style:{marginLeft:8,borderLeft:"1px solid var(--bd)",paddingLeft:0},children:M.pages.map(me=>{const $e=z===me.id;return m.jsx("button",{onClick:()=>y(me.id),style:{display:"flex",alignItems:"center",gap:10,width:"100%",textAlign:"left",background:"none",border:"none",borderRadius:0,borderLeft:$e?"2px solid var(--ac)":"2px solid transparent",padding:"7px 14px",cursor:"pointer",color:$e?"var(--ac)":"var(--tx2)",fontSize:13,fontWeight:$e?500:400,fontFamily:"var(--font-body)",transition:"all .12s"},children:me.title},me.id)})})]},M.section))}),m.jsxs("div",{style:{padding:"12px 16px",borderTop:"1px solid var(--bd)",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[L==="auto"?m.jsx("button",{onClick:()=>Te(M=>!M),style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex"},children:ie?m.jsx(Rp,{}):m.jsx(jp,{})}):m.jsx("div",{}),m.jsx("span",{style:{fontFamily:"var(--font-code)",fontSize:10,color:"var(--txM)"},children:"v0.1.0"})]})]}),m.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"},children:[m.jsxs("header",{style:{display:"flex",alignItems:"center",gap:12,padding:"10px 24px",borderBottom:"1px solid var(--bd)",background:"var(--hdBg)",backdropFilter:"blur(12px)"},children:[m.jsx("button",{onClick:()=>P(!Ae),style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex"},children:Ae?m.jsx(Op,{}):m.jsx(Cp,{})}),m.jsx("div",{style:{display:"flex",alignItems:"center",gap:8,fontFamily:"var(--font-code)",fontSize:11,color:"var(--txM)",letterSpacing:".03em",flex:1},children:O.map(M=>{const me=M.pages.find($e=>$e.id===z);return me?m.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[m.jsx("span",{children:M.section}),m.jsx(Bd,{}),m.jsx("span",{style:{color:"var(--ac)"},children:me.title})]},M.section):null})}),D&&m.jsxs("div",{style:{position:"relative"},children:[m.jsxs("button",{"data-testid":"version-switcher",onClick:()=>Ce(M=>!M),style:{display:"flex",alignItems:"center",gap:6,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"5px 10px",cursor:"pointer",color:"var(--tx2)",fontSize:12,fontFamily:"var(--font-code)"},children:[m.jsx(wp,{}),X||D.current,m.jsx(Mc,{})]}),k&&m.jsx("div",{"data-testid":"version-dropdown",style:{position:"absolute",top:"100%",right:0,marginTop:4,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",overflow:"hidden",zIndex:100,minWidth:120},children:D.versions.map(M=>m.jsxs("button",{onClick:()=>{Ce(!1);const me=M===D.current?"/":`/${M}`;window.location.href=me},style:{display:"block",width:"100%",textAlign:"left",background:M===(X||D.current)?"var(--acD)":"none",border:"none",padding:"8px 14px",cursor:"pointer",color:M===(X||D.current)?"var(--ac)":"var(--tx2)",fontSize:12,fontFamily:"var(--font-code)",fontWeight:M===D.current?600:400},children:[M,M===D.current?" (latest)":""]},M))})]}),le&&le.locales.length>1&&m.jsxs("div",{style:{position:"relative"},children:[m.jsxs("button",{"data-testid":"language-switcher",onClick:()=>Bt(M=>!M),style:{display:"flex",alignItems:"center",gap:6,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"5px 10px",cursor:"pointer",color:"var(--tx2)",fontSize:12,fontFamily:"var(--font-body)"},children:[m.jsx(Yp,{}),((Gl=le.localeNames)==null?void 0:Gl[be||le.defaultLocale])||be||le.defaultLocale,m.jsx(Mc,{})]}),pt&&m.jsx("div",{"data-testid":"language-dropdown",style:{position:"absolute",top:"100%",right:0,marginTop:4,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",overflow:"hidden",zIndex:100,minWidth:120},children:le.locales.map(M=>{var Va;const me=M===(be||le.defaultLocale),$e=((Va=le.localeNames)==null?void 0:Va[M])||M,na=be||le.defaultLocale;let ln=z;na!==le.defaultLocale&&z.startsWith(`${na}/`)&&(ln=z.slice(na.length+1));const ou=M===le.defaultLocale?ln:`${M}/${ln}`;return m.jsx("button",{onClick:()=>{Bt(!1),y(ou)},style:{display:"block",width:"100%",textAlign:"left",background:me?"var(--acD)":"none",border:"none",padding:"8px 14px",cursor:"pointer",color:me?"var(--ac)":"var(--tx2)",fontSize:12,fontFamily:"var(--font-body)",fontWeight:me?600:400},children:$e},M)})})]})]}),gt&&m.jsxs("div",{"data-testid":"old-version-banner",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"var(--acD)",borderBottom:"1px solid var(--bd)",padding:"8px 24px",fontSize:13,color:"var(--tx2)"},children:[m.jsxs("span",{children:["You're viewing docs for ",X,"."]}),m.jsx("button",{onClick:()=>{window.location.href="/"},style:{background:"none",border:"none",color:"var(--ac)",cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"var(--font-body)",textDecoration:"underline"},children:"Switch to latest."})]}),m.jsxs("div",{ref:yt,style:{flex:1,overflow:"auto",display:"flex"},children:[m.jsxs("main",{style:{flex:1,maxWidth:760,padding:"40px 48px 80px",margin:"0 auto"},children:[m.jsx("h1",{style:{fontFamily:"var(--font-heading)",fontSize:38,fontWeight:400,fontStyle:"italic",lineHeight:1.15,marginBottom:8},children:w}),G&&m.jsx("p",{style:{fontSize:16,color:"var(--tx2)",lineHeight:1.6,marginBottom:32},children:G}),m.jsx("div",{style:{borderTop:"1px solid var(--bd)",paddingTop:28},children:Me?m.jsx("div",{className:"tome-content",children:m.jsx(Me,{components:H||{}})}):m.jsx("div",{className:"tome-content",dangerouslySetInnerHTML:{__html:f||""}})}),m.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:48,paddingTop:24,borderTop:"1px solid var(--bd)",gap:16},children:[K?m.jsxs("button",{onClick:()=>y(K.id),style:{display:"flex",alignItems:"center",gap:8,background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"10px 16px",cursor:"pointer",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body)",transition:"border-color .15s, color .15s"},children:[m.jsx(Up,{})," ",K.title]}):m.jsx("div",{}),$?m.jsxs("button",{onClick:()=>y($.id),style:{display:"flex",alignItems:"center",gap:8,background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"10px 16px",cursor:"pointer",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body)",transition:"border-color .15s, color .15s"},children:[$.title," ",m.jsx(qp,{})]}):m.jsx("div",{})]})]}),_.length>0&&it&&m.jsxs("aside",{style:{width:200,padding:"40px 16px 40px 0",position:"sticky",top:0,alignSelf:"flex-start",flexShrink:0},children:[m.jsx("div",{style:{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",color:"var(--txM)",marginBottom:12,fontFamily:"var(--font-code)"},children:"On this page"}),m.jsx("div",{style:{borderLeft:"1px solid var(--bd)",paddingLeft:0},children:_.map((M,me)=>m.jsx("a",{href:`#${M.id}`,style:{display:"block",fontSize:12,color:"var(--txM)",textDecoration:"none",padding:"4px 12px",paddingLeft:12+(M.depth-2)*12,lineHeight:1.4,transition:"color .12s"},children:M.text},me))})]})]})]})]}),((Xl=b.ai)==null?void 0:Xl.enabled)&&m.jsx(_p,{provider:b.ai.provider||"anthropic",model:b.ai.model,apiKey:typeof __TOME_AI_API_KEY__<"u"&&__TOME_AI_API_KEY__?__TOME_AI_API_KEY__:void 0,context:(_e==null?void 0:_e.map(M=>`## ${M.title}
${M.content}`).join(`

`))??U.map(M=>`- ${M.title}${M.description?": "+M.description:""}`).join(`
`)})]})}function Xp({allPages:b,onNavigate:O,onClose:z}){const[f,R]=Z.useState(""),[H,w]=Z.useState([]),[G,_]=Z.useState(0),[y,U]=Z.useState(null),D=Z.useRef(null),X=Z.useRef(void 0);Z.useEffect(()=>{Np().then(L=>U(!!L)),setTimeout(()=>{var L;return(L=D.current)==null?void 0:L.focus()},50)},[]);const le=Z.useCallback(L=>{if(!L.trim())return[];const ie=L.toLowerCase();return b.filter(Te=>Te.title.toLowerCase().includes(ie)||(Te.description||"").toLowerCase().includes(ie)).slice(0,8).map(Te=>({id:Te.id,title:Te.title,excerpt:Te.description}))},[b]),be=Z.useCallback(async L=>{var Te;if(!L.trim()){w([]),_(0);return}const ie=Ga;if(ie)try{const Ae=await ie.search(L),P=[];for(const Le of Ae.results.slice(0,8)){const de=await Le.data(),Ce=(de.url||"").replace(/^\//,"").replace(/\/index\.html$/,"").replace(/\.html$/,"")||"index";P.push({id:Ce,title:((Te=de.meta)==null?void 0:Te.title)||Ce,excerpt:de.excerpt||void 0})}w(P),_(0);return}catch{}w(le(L)),_(0)},[le]);Z.useEffect(()=>(X.current&&clearTimeout(X.current),X.current=setTimeout(()=>be(f),120),()=>{X.current&&clearTimeout(X.current)}),[f,be]);const _e=Z.useCallback(L=>{L.key==="ArrowDown"?(L.preventDefault(),_(ie=>Math.min(ie+1,H.length-1))):L.key==="ArrowUp"?(L.preventDefault(),_(ie=>Math.max(ie-1,0))):L.key==="Enter"&&H.length>0&&(L.preventDefault(),O(H[G].id))},[H,G,O]);return m.jsx("div",{onClick:z,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"12vh"},children:m.jsxs("div",{onClick:L=>L.stopPropagation(),style:{background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,width:"100%",maxWidth:520,boxShadow:"0 24px 80px rgba(0,0,0,0.4)",overflow:"hidden"},children:[m.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--bd)"},children:[m.jsx(Gd,{}),m.jsx("input",{ref:D,value:f,onChange:L=>R(L.target.value),onKeyDown:_e,placeholder:"Search documentation...",style:{flex:1,background:"none",border:"none",outline:"none",color:"var(--tx)",fontSize:15,fontFamily:"var(--font-body)"}}),m.jsx("kbd",{style:{fontFamily:"var(--font-code)",fontSize:10,color:"var(--txM)",background:"var(--cdBg)",padding:"2px 6px",borderRadius:2,border:"1px solid var(--bd)"},children:"ESC"})]}),H.length>0&&m.jsx("div",{style:{padding:6,maxHeight:360,overflow:"auto"},children:H.map((L,ie)=>m.jsxs("button",{onClick:()=>O(L.id),style:{display:"block",width:"100%",textAlign:"left",background:ie===G?"var(--acD)":"none",border:"none",borderRadius:2,padding:"10px 14px",cursor:"pointer",color:"var(--tx)",fontFamily:"var(--font-body)"},onMouseEnter:()=>_(ie),children:[m.jsx("div",{style:{fontWeight:500,fontSize:14,marginBottom:2},children:L.title}),L.excerpt&&m.jsx("div",{style:{fontSize:12,color:"var(--txM)",lineHeight:1.3},dangerouslySetInnerHTML:{__html:L.excerpt}})]},L.id+ie))}),f&&!H.length&&m.jsx("div",{style:{padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"No results found"}),y===!1&&f&&H.length>0&&m.jsx("div",{style:{padding:"6px 18px 10px",fontSize:11,color:"var(--txM)",textAlign:"center"},children:"Showing title matches. Build your site for full-text search."})]})})}const Qp={name:"Tome",basePath:"/docs/",theme:{preset:"editorial",mode:"auto"},navigation:[{group:"Getting Started",pages:["index","quickstart","installation","project-structure"]},{group:"Core Concepts",pages:["configuration","pages-routing","components","theming"]},{group:"API Reference",pages:["api-overview","api-endpoints","api-auth"]},{group:"Advanced",pages:["guides/search","guides/versioning","concepts/architecture"]},{group:"CLI",pages:["cli"]}],search:{provider:"local"}},wl=[{id:"api-auth",urlPath:"/api-auth",frontmatter:{title:"Authentication",description:"Configure API authentication for the interactive playground — Bearer tokens, API keys, and custom headers.",icon:"lock",hidden:!1},isMdx:!1},{id:"api-endpoints",urlPath:"/api-endpoints",frontmatter:{title:"Endpoints",description:"How Tome renders API endpoints from your OpenAPI spec — methods, parameters, schemas, and the interactive playground.",icon:"globe",hidden:!1},isMdx:!1},{id:"api-overview",urlPath:"/api-overview",frontmatter:{title:"Overview",description:"Generate interactive API documentation from OpenAPI specs with Tome.",icon:"code",hidden:!1},isMdx:!1},{id:"cli",urlPath:"/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1},isMdx:!1},{id:"components",urlPath:"/components",frontmatter:{title:"Components",description:"Built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.",icon:"puzzle",hidden:!1},isMdx:!1},{id:"concepts/architecture",urlPath:"/concepts/architecture",frontmatter:{title:"Architecture",description:"How Tome works internally — the Vite plugin, virtual modules, build pipeline, and theme system.",hidden:!1},isMdx:!1},{id:"concepts/file-routing",urlPath:"/concepts/file-routing",frontmatter:{title:"File-System Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",hidden:!1},isMdx:!1},{id:"configuration",urlPath:"/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1},isMdx:!1},{id:"guides/api-reference",urlPath:"/guides/api-reference",frontmatter:{title:"API Reference Setup",description:"How to generate an interactive API reference from an OpenAPI specification in Tome.",icon:"code",hidden:!1},isMdx:!1},{id:"guides/configuration",urlPath:"/guides/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1},isMdx:!1},{id:"guides/custom-theme",urlPath:"/guides/custom-theme",frontmatter:{title:"Custom Theme",description:"How to customize your Tome site's appearance — presets, accent colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1},isMdx:!1},{id:"guides/search",urlPath:"/guides/search",frontmatter:{title:"Search",description:"How to set up search in your Tome documentation site — built-in Pagefind and optional Algolia DocSearch.",icon:"search",hidden:!1},isMdx:!1},{id:"guides/versioning",urlPath:"/guides/versioning",frontmatter:{title:"Multi-Version Docs",description:"How to maintain multiple versions of your documentation with Tome's built-in versioning system.",icon:"layers",hidden:!1},isMdx:!1},{id:"index",urlPath:"/",frontmatter:{title:"Introduction",description:"Tome is an open-source documentation platform for Markdown and MDX. Beautiful docs without the $250/month price tag.",hidden:!1},isMdx:!1},{id:"installation",urlPath:"/installation",frontmatter:{title:"Installation",description:"System requirements and detailed installation instructions for Tome.",icon:"download",hidden:!1},isMdx:!1},{id:"pages-routing",urlPath:"/pages-routing",frontmatter:{title:"Pages & Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",icon:"map",hidden:!1},isMdx:!1},{id:"project-structure",urlPath:"/project-structure",frontmatter:{title:"Project Structure",description:"How a Tome documentation project is organized — pages, config, entry point, and build output.",icon:"folder",hidden:!1},isMdx:!1},{id:"quickstart",urlPath:"/quickstart",frontmatter:{title:"Quickstart",description:"Get a Tome documentation site running in under a minute.",icon:"zap",hidden:!1},isMdx:!1},{id:"reference/cli",urlPath:"/reference/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1},isMdx:!1},{id:"reference/components",urlPath:"/reference/components",frontmatter:{title:"Components",description:"Reference for all built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.",icon:"puzzle",hidden:!1},isMdx:!1},{id:"reference/config",urlPath:"/reference/config",frontmatter:{title:"Config Reference",description:"Complete reference for every field in tome.config.js — types, defaults, and descriptions.",icon:"file-text",hidden:!1},isMdx:!1},{id:"reference/frontmatter",urlPath:"/reference/frontmatter",frontmatter:{title:"Frontmatter",description:"Reference for all YAML frontmatter fields supported in Tome documentation pages.",icon:"file-text",hidden:!1},isMdx:!1},{id:"reference/theme-presets",urlPath:"/reference/theme-presets",frontmatter:{title:"Theme Presets",description:"Detailed reference for Tome's built-in theme presets — color tokens, CSS variables, and font stacks.",icon:"swatches",hidden:!1},isMdx:!1},{id:"theming",urlPath:"/theming",frontmatter:{title:"Theming",description:"Customize the look of your Tome site — presets, colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1},isMdx:!1},{id:"tutorials/deploy-to-cloud",urlPath:"/tutorials/deploy-to-cloud",frontmatter:{title:"Deploy to Tome Cloud",description:"Publish your documentation site to Tome Cloud with a single command. Includes custom domain setup.",icon:"cloud",hidden:!1},isMdx:!1},{id:"tutorials/first-site",urlPath:"/tutorials/first-site",frontmatter:{title:"Create Your First Site",description:"A step-by-step tutorial that walks you through creating a documentation site with Tome, from installation to running the dev server.",icon:"rocket",hidden:!1},isMdx:!1}],Vp=[{section:"Getting Started",pages:[{title:"Introduction",id:"index",urlPath:"/"},{title:"Quickstart",id:"quickstart",urlPath:"/quickstart",icon:"zap"},{title:"Installation",id:"installation",urlPath:"/installation",icon:"download"},{title:"Project Structure",id:"project-structure",urlPath:"/project-structure",icon:"folder"}]},{section:"Core Concepts",pages:[{title:"Configuration",id:"configuration",urlPath:"/configuration",icon:"gear"},{title:"Pages & Routing",id:"pages-routing",urlPath:"/pages-routing",icon:"map"},{title:"Components",id:"components",urlPath:"/components",icon:"puzzle"},{title:"Theming",id:"theming",urlPath:"/theming",icon:"palette"}]},{section:"API Reference",pages:[{title:"Overview",id:"api-overview",urlPath:"/api-overview",icon:"code"},{title:"Endpoints",id:"api-endpoints",urlPath:"/api-endpoints",icon:"globe"},{title:"Authentication",id:"api-auth",urlPath:"/api-auth",icon:"lock"}]},{section:"Advanced",pages:[{title:"Search",id:"guides/search",urlPath:"/guides/search",icon:"search"},{title:"Multi-Version Docs",id:"guides/versioning",urlPath:"/guides/versioning",icon:"layers"},{title:"Architecture",id:"concepts/architecture",urlPath:"/concepts/architecture"}]},{section:"CLI",pages:[{title:"CLI Reference",id:"cli",urlPath:"/cli",icon:"terminal"}]}],Zp={"api-auth":()=>xe(()=>import("./api-auth-CN-9ZEL-.js"),[]),"api-endpoints":()=>xe(()=>import("./api-endpoints-DPSf7Tu3.js"),[]),"api-overview":()=>xe(()=>import("./api-overview-B2Loq8w_.js"),[]),cli:()=>xe(()=>import("./cli-CYDtjALJ.js"),[]),components:()=>xe(()=>import("./components-Oe5RRNu5.js"),[]),"concepts/architecture":()=>xe(()=>import("./architecture-c_T2Gx5K.js"),[]),"concepts/file-routing":()=>xe(()=>import("./file-routing-COH3yjIC.js"),[]),configuration:()=>xe(()=>import("./configuration-CN_8iVpG.js"),[]),"guides/api-reference":()=>xe(()=>import("./api-reference-BwzDE6jO.js"),[]),"guides/configuration":()=>xe(()=>import("./configuration-CXT4MoQf.js"),[]),"guides/custom-theme":()=>xe(()=>import("./custom-theme-U8LJAJgJ.js"),[]),"guides/search":()=>xe(()=>import("./search-D_oBF7Ms.js"),[]),"guides/versioning":()=>xe(()=>import("./versioning-CJXKG5DX.js"),[]),index:()=>xe(()=>import("./index-CkElSs7Q.js"),[]),installation:()=>xe(()=>import("./installation-C9Iww18I.js"),[]),"pages-routing":()=>xe(()=>import("./pages-routing-Du8Mpl5c.js"),[]),"project-structure":()=>xe(()=>import("./project-structure-Cbs10ybK.js"),[]),quickstart:()=>xe(()=>import("./quickstart-DSlp0o6N.js"),[]),"reference/cli":()=>xe(()=>import("./cli-Du_MG92M.js"),[]),"reference/components":()=>xe(()=>import("./components-Z-AzkasS.js"),[]),"reference/config":()=>xe(()=>import("./config-fEj7X2oX.js"),[]),"reference/frontmatter":()=>xe(()=>import("./frontmatter-D_p_cW8t.js"),[]),"reference/theme-presets":()=>xe(()=>import("./theme-presets-CeJwDMBn.js"),[]),theming:()=>xe(()=>import("./theming-BljnEGkg.js"),[]),"tutorials/deploy-to-cloud":()=>xe(()=>import("./deploy-to-cloud-iKyl4X-B.js"),[]),"tutorials/first-site":()=>xe(()=>import("./first-site-Cb9AGZzy.js"),[])};function Kp(b){const O=Zp[b];return O?O():Promise.resolve({default:null})}const kp=[{id:"api-auth",title:"Authentication",content:`
# Authentication

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
# Endpoints

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
# API Reference

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
# CLI reference

The \`tome\` CLI is the primary interface for creating, developing, building, and deploying documentation sites.

## Installation

\`\`\`bash
npm install -D @tome/cli
# or globally
npm install -g @tome/cli
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
# Components

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
  <Tab>npm install @tome/cli</Tab>
  <Tab>pnpm add @tome/cli</Tab>
  <Tab>yarn add @tome/cli</Tab>
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
    Run \`npx @tome/cli init my-docs\`
  </Step>
  <Step title="Start dev server">
    Run \`npm run dev\`
  </Step>
</Steps>
\`\`\`
`},{id:"concepts/architecture",title:"Architecture",content:`
# Architecture

Tome is built on Vite and React. Understanding the architecture helps when debugging build issues or building advanced customizations.

## Overview

A Tome site is a Vite application with a custom plugin that handles page discovery, routing, and content processing. The theme package provides the React UI shell.

\`\`\`text
tome.config.js  →  Vite Plugin  →  Virtual Modules  →  Theme Shell  →  Static Site
\`\`\`

## Vite plugin

The core of Tome is \`vite-plugin-tome\` in \`@tome/core\`. It has three responsibilities:

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

The theme package (\`@tome/theme\`) provides the React shell:

- **Shell component** — Header, sidebar, content area, footer
- **Preset system** — Color tokens and CSS variables per preset
- **Search integration** — Pagefind or Algolia, loaded dynamically
- **AI chat** — Optional floating widget

The entry point (\`.tome/entry.tsx\`) bootstraps the shell by importing \`@tome/theme/entry\`.

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
| \`@tome/cli\` | CLI commands (init, dev, build, deploy) |
| \`@tome/core\` | Config, routing, Vite plugin, markdown processing |
| \`@tome/theme\` | Shell UI, presets, search, AI chat |
| \`@tome/components\` | MDX components (Callout, Tabs, Card, etc.) |
`},{id:"concepts/file-routing",title:"File-System Routing",content:"\n# File-system routing\n\nEvery `.md` or `.mdx` file in the `pages/` directory becomes a page. The file path determines the URL.\n\n## Basic routing\n\n| File path | URL |\n|-----------|-----|\n| `pages/index.md` | `/` |\n| `pages/quickstart.md` | `/quickstart` |\n| `pages/guides/deployment.md` | `/guides/deployment` |\n| `pages/api/endpoints.md` | `/api/endpoints` |\n| `pages/api/index.md` | `/api` |\n\n**Rules:**\n\n- `index.md` serves at the directory's root path\n- File extensions are stripped from the URL\n- Directory nesting maps directly to URL segments\n\n## Page IDs\n\nEach page has an ID derived from its path relative to `pages/`:\n\n| File | Page ID |\n|------|---------|\n| `pages/index.md` | `index` |\n| `pages/quickstart.md` | `quickstart` |\n| `pages/guides/deployment.md` | `guides/deployment` |\n\nPage IDs are used in `navigation` config to control sidebar order.\n\n## Navigation vs. routing\n\nAll pages in `pages/` are routable regardless of whether they appear in `navigation`. Navigation only controls the sidebar.\n\nPages can be hidden from the sidebar using `hidden: true` in frontmatter while remaining accessible at their URL.\n\n## i18n routing\n\nWhen multiple locales are configured, organize pages by locale subdirectory:\n\n```text\npages/\n├── en/            # Default locale\n│   ├── index.md\n│   └── quickstart.md\n├── es/            # Spanish\n│   ├── index.md\n│   └── quickstart.md\n```\n\n| File | URL |\n|------|-----|\n| `pages/en/index.md` | `/` (default — no prefix) |\n| `pages/es/index.md` | `/es/` |\n| `pages/es/quickstart.md` | `/es/quickstart` |\n\nThe default locale serves at the root without a prefix. When `fallback: true` and a page doesn't exist in a non-default locale, the default version is used.\n\n## Versioned routing\n\nWhen versioning is configured:\n\n```text\npages/\n├── current/       # Latest version\n│   ├── index.md\n│   └── api.md\n├── v1.0/\n│   ├── index.md\n│   └── api.md\n```\n\n| File | URL |\n|------|-----|\n| `pages/current/index.md` | `/` |\n| `pages/v1.0/index.md` | `/v1.0/` |\n| `pages/v1.0/api.md` | `/v1.0/api` |\n\nThe `current` directory serves at the root. Older versions are prefixed.\n\n## File discovery\n\nTome discovers pages by scanning `pages/` for `**/*.{md,mdx}` files. Discovery runs at startup and again whenever files are added, removed, or renamed during development.\n"},{id:"configuration",title:"Configuration",content:`
# Configuration

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
# API reference setup

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
# Configuration

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
# Custom theme

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
# Search

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
# Multi-version docs

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
npx @tome/cli init my-docs
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
# Installation

Tome requires Node.js and works with npm, pnpm, or yarn.

## Prerequisites

| Requirement | Minimum |
|-------------|---------|
| Node.js | 18.0 or higher |
| Package manager | npm, pnpm, or yarn |

## Create a new project

The fastest way to start is with the CLI:

\`\`\`bash
npx @tome/cli init my-docs
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
npm install @tome/cli @tome/theme react react-dom
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
import "@tome/theme/entry";
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
`},{id:"pages-routing",title:"Pages & Routing",content:"\n# Pages & Routing\n\nEvery `.md` or `.mdx` file in the `pages/` directory becomes a page. The file path determines the URL.\n\n## Basic routing\n\n| File path | URL |\n|-----------|-----|\n| `pages/index.md` | `/` |\n| `pages/quickstart.md` | `/quickstart` |\n| `pages/guides/deployment.md` | `/guides/deployment` |\n| `pages/api/endpoints.md` | `/api/endpoints` |\n| `pages/api/index.md` | `/api` |\n\n**Rules:**\n\n- `index.md` serves at the directory's root path\n- File extensions are stripped from the URL\n- Directory nesting maps directly to URL segments\n- Both `.md` and `.mdx` files are supported\n\n## Page IDs\n\nEach page has an ID derived from its path relative to `pages/`:\n\n| File | Page ID |\n|------|---------|\n| `pages/index.md` | `index` |\n| `pages/quickstart.md` | `quickstart` |\n| `pages/guides/deployment.md` | `guides/deployment` |\n\nPage IDs are used in `navigation` config to control sidebar order.\n\n## Navigation vs. routing\n\nAll pages in `pages/` are routable regardless of whether they appear in `navigation`. Navigation only controls the sidebar.\n\nPages can be hidden from the sidebar using `hidden: true` in frontmatter while remaining accessible at their URL.\n\n## Frontmatter\n\nEvery page can include YAML frontmatter at the top of the file:\n\n```markdown\n---\ntitle: My Page\ndescription: A brief description for SEO and navigation.\nicon: book\nsidebarTitle: Short Title\nhidden: false\ntags: [guide, setup]\n---\n\n# My Page\n\nContent starts here.\n```\n\n| Field | Type | Description |\n|-------|------|-------------|\n| `title` | string | Page title (falls back to first `#` heading) |\n| `description` | string | Description for metadata and navigation |\n| `icon` | string | Icon identifier shown in the sidebar |\n| `sidebarTitle` | string | Override title shown in the sidebar |\n| `hidden` | boolean | Hide page from sidebar (still accessible via URL) |\n| `tags` | string[] | Tags for categorization and search |\n\n## i18n routing\n\nWhen multiple locales are configured, organize pages by locale subdirectory:\n\n```text\npages/\n├── en/            # Default locale\n│   ├── index.md\n│   └── quickstart.md\n├── es/            # Spanish\n│   ├── index.md\n│   └── quickstart.md\n```\n\n| File | URL |\n|------|-----|\n| `pages/en/index.md` | `/` (default — no prefix) |\n| `pages/es/index.md` | `/es/` |\n| `pages/es/quickstart.md` | `/es/quickstart` |\n\nThe default locale serves at the root without a prefix. When `fallback: true` and a page doesn't exist in a non-default locale, the default version is used.\n\n## Versioned routing\n\nWhen versioning is configured:\n\n```text\npages/\n├── current/       # Latest version\n│   ├── index.md\n│   └── api.md\n├── v1.0/\n│   ├── index.md\n│   └── api.md\n```\n\n| File | URL |\n|------|-----|\n| `pages/current/index.md` | `/` |\n| `pages/v1.0/index.md` | `/v1.0/` |\n| `pages/v1.0/api.md` | `/v1.0/api` |\n\nThe `current` directory serves at the root. Older versions are prefixed with their version string.\n\n## File discovery\n\nTome discovers pages by scanning `pages/` for `**/*.{md,mdx}` files. Discovery runs at startup and again whenever files are added, removed, or renamed during development. Changes to existing files trigger a hot reload.\n"},{id:"project-structure",title:"Project Structure",content:`
# Project Structure

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
import "@tome/theme/entry";
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
# Quickstart

Get a working documentation site in three commands.

## Create a new project

\`\`\`bash
npx @tome/cli init my-docs
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
# CLI reference

The \`tome\` CLI is the primary interface for creating, developing, building, and deploying documentation sites.

## Installation

\`\`\`bash
npm install -D @tome/cli
# or globally
npm install -g @tome/cli
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
`},{id:"reference/components",title:"Components",content:`
# Components

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
  <div>npm install @tome/cli</div>
  <div>yarn add @tome/cli</div>
  <div>pnpm add @tome/cli</div>
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
`},{id:"reference/config",title:"Config Reference",content:'\n# Config reference\n\nThe config file (`tome.config.js`, `.mjs`, or `.ts`) is validated at startup. Invalid values produce clear error messages with the field path and expected type.\n\n## Top-level fields\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `name` | `string` | `"My Docs"` | Site name shown in the header and browser tab |\n| `logo` | `string` | — | Path to logo image, relative to `public/` |\n| `favicon` | `string` | — | Path to favicon, relative to `public/` |\n| `baseUrl` | `string` | — | Full URL where the site is hosted (for analytics, canonical links) |\n| `basePath` | `string` | — | URL subpath prefix (e.g., `"/docs/"`) — sets Vite\'s `base` option |\n| `theme` | `ThemeConfig` | `{}` | Theme configuration (see below) |\n| `navigation` | `NavigationGroup[]` | `[]` | Sidebar navigation structure |\n| `topNav` | `TopNavItem[]` | — | Header navigation links |\n| `search` | `SearchConfig` | `{ provider: "local" }` | Search provider configuration |\n| `api` | `ApiConfig` | — | OpenAPI spec and playground settings |\n| `ai` | `AiConfig` | — | AI chat widget configuration |\n| `mcp` | `McpConfig` | `{ enabled: true }` | MCP server manifest generation |\n| `i18n` | `I18nConfig` | — | Internationalization settings |\n| `versioning` | `VersioningConfig` | — | Multi-version documentation |\n| `analytics` | `AnalyticsConfig` | — | Analytics provider settings |\n\n## ThemeConfig\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `preset` | `"amber" \\| "editorial"` | `"amber"` | Base theme preset |\n| `accent` | `string` | — | Custom accent color (hex, e.g., `"#ff6b4a"`) |\n| `mode` | `"light" \\| "dark" \\| "auto"` | `"auto"` | Color mode |\n| `fonts.heading` | `string` | — | Heading font family |\n| `fonts.body` | `s'}],Ld={info:{color:"#3b82f6",label:"INFO"},warning:{color:"#f59e0b",label:"WARNING"},tip:{color:"var(--ac, #a78bfa)",label:"TIP"},danger:{color:"#ef4444",label:"DANGER"}};function Jp({type:b="info",title:O,children:z}){const f=Ld[b]||Ld.info;return m.jsxs("div",{style:{borderLeft:`3px solid ${f.color}`,background:`${f.color}11`,borderRadius:"0 2px 2px 0",padding:"14px 18px",marginBottom:20},children:[O?m.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4},children:[m.jsx("span",{style:{fontWeight:700,fontSize:10,letterSpacing:".08em",color:f.color,fontFamily:"var(--font-code, monospace)"},children:f.label}),m.jsx("span",{style:{fontWeight:600,fontSize:13,color:f.color},children:O})]}):m.jsx("div",{style:{marginBottom:4},children:m.jsx("span",{style:{fontWeight:700,fontSize:10,letterSpacing:".08em",color:f.color,fontFamily:"var(--font-code, monospace)"},children:f.label})}),m.jsx("div",{style:{fontSize:14,lineHeight:1.65,color:"var(--tx2)"},children:z})]})}function Wp({items:b,children:O}){const[z,f]=Z.useState(0);return m.jsxs("div",{style:{marginBottom:20},children:[m.jsx("div",{style:{display:"flex",gap:0,borderBottom:"1px solid var(--bd)"},children:b.map((R,H)=>m.jsx("button",{onClick:()=>f(H),style:{padding:"8px 16px",background:"none",border:"none",borderBottom:z===H?"2px solid var(--ac)":"2px solid transparent",color:z===H?"var(--ac)":"var(--txM)",fontWeight:z===H?600:400,fontSize:13,cursor:"pointer",fontFamily:"inherit"},children:R},H))}),m.jsx("div",{style:{padding:"16px 0"},children:O[z]})]})}function Fp({title:b,icon:O,href:z,children:f}){const R=m.jsxs("div",{style:{border:"1px solid var(--bd)",borderRadius:2,padding:"20px",transition:"border-color 0.15s",cursor:z?"pointer":"default"},children:[O&&m.jsx("span",{style:{fontSize:24,marginBottom:8,display:"block"},children:O}),m.jsx("div",{style:{fontWeight:600,fontSize:14,marginBottom:4},children:b}),f&&m.jsx("div",{style:{fontSize:13,color:"var(--txM)",lineHeight:1.5},children:f})]});return z?m.jsx("a",{href:z,style:{textDecoration:"none",color:"inherit"},children:R}):R}function $p({cols:b=2,children:O}){return m.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${b}, 1fr)`,gap:12,marginBottom:20},children:O})}function Ip({children:b}){return m.jsx("div",{style:{paddingLeft:24,borderLeft:"2px solid var(--bd)",marginBottom:20},children:rp.Children.map(b,(O,z)=>m.jsxs("div",{style:{position:"relative",paddingBottom:20},children:[m.jsx("div",{style:{position:"absolute",left:-33,top:0,width:20,height:20,borderRadius:"50%",background:"var(--ac)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700},children:z+1}),m.jsx("div",{style:{paddingLeft:8},children:O})]}))})}function Pp({title:b,children:O}){const[z,f]=Z.useState(!1);return m.jsxs("div",{style:{border:"1px solid var(--bd)",borderRadius:2,marginBottom:8,overflow:"hidden"},children:[m.jsxs("button",{onClick:()=>f(!z),style:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"12px 16px",background:"var(--sf)",border:"none",cursor:"pointer",fontWeight:500,fontSize:14,color:"var(--tx)",fontFamily:"inherit"},children:[b,m.jsx("span",{style:{transform:z?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"},children:"▾"})]}),z&&m.jsx("div",{style:{padding:"12px 16px",borderTop:"1px solid var(--bd)",fontSize:14,color:"var(--tx2)",lineHeight:1.65},children:O})]})}const eg={Callout:Jp,Tabs:Wp,Card:Fp,CardGroup:$p,Steps:Ip,Accordion:Pp},tg=`
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Fira+Code:wght@400;500;600&display=swap');

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
  html.dark .shiki .shiki-light { display: none; }
  html.light .shiki .shiki-dark { display: none; }
`;async function ng(b){try{const O=wl.find(f=>f.id===b),z=await Kp(b);return O!=null&&O.isMdx&&z.meta?{isMdx:!0,component:z.default,frontmatter:z.meta.frontmatter,headings:z.meta.headings}:z.default?{isMdx:!1,...z.default}:null}catch(O){return console.error(`Failed to load page: ${b}`,O),null}}function ag(){const[b,O]=Z.useState(()=>{var y;const _=window.location.hash.slice(1);return _&&wl.some(U=>U.id===_)?_:((y=wl[0])==null?void 0:y.id)||"index"}),[z,f]=Z.useState(null),[R,H]=Z.useState(!0),w=Z.useCallback(async _=>{H(!0),O(_),window.location.hash=_;const y=await ng(_);f(y),H(!1)},[]);Z.useEffect(()=>{w(b)},[]),Z.useEffect(()=>{const _=()=>{const y=window.location.hash.slice(1);y&&y!==b&&wl.some(U=>U.id===y)&&w(y)};return window.addEventListener("hashchange",_),()=>window.removeEventListener("hashchange",_)},[b,w]);const G=wl.map(_=>({id:_.id,title:_.frontmatter.title,description:_.frontmatter.description}));return m.jsxs(m.Fragment,{children:[m.jsx("style",{children:tg}),m.jsx(Gp,{config:Qp,navigation:Vp,currentPageId:b,pageHtml:z!=null&&z.isMdx?void 0:R?"<p>Loading...</p>":(z==null?void 0:z.html)||"<p>Page not found</p>",pageComponent:z!=null&&z.isMdx?z.component:void 0,mdxComponents:eg,pageTitle:(z==null?void 0:z.frontmatter.title)||(R?"Loading...":"Not Found"),pageDescription:z==null?void 0:z.frontmatter.description,headings:(z==null?void 0:z.headings)||[],onNavigate:w,allPages:G,docContext:kp})]})}const wd=document.getElementById("tome-root");wd&&yp.createRoot(wd).render(m.jsx(ag,{}));export{Z as a,rp as e,hp as r};
